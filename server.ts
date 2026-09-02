import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import compression from "compression";
import * as cheerio from "cheerio";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable gzip compression to decrease payload sizes
  app.use(compression());

  // API health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "PokiBox Games Portal" });
  });

  // GameMonetize feed proxy to avoid CORS
  app.get("/api/gamemonetize", async (req, res) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second strict timeout

    try {
      const category = req.query.category || "5";
      const feedUrl = `https://gamemonetize.com/feed.php?format=1&category=${category}&num=100`;
      console.log(`GameMonetize proxy: Fetching XML feed: ${feedUrl}`);

      const response = await fetch(feedUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "application/json, text/xml, application/xml, */*",
          "Accept-Language": "en-US,en;q=0.9"
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch GameMonetize feed: ${response.status}`);
      }

      const text = await response.text();
      const trimmedText = text.trim();

      // Check if it's XML or HTML
      if (trimmedText.startsWith("<") || trimmedText.includes("<?xml") || trimmedText.includes("<rss")) {
        console.log("GameMonetize proxy: Feed returned XML/RSS. Parsing with cheerio...");
        const $ = cheerio.load(text, { xmlMode: true });
        
        // Try to query either RSS item tags or custom game tags
        let elements = $("item");
        if (elements.length === 0) {
          elements = $("game");
        }

        const games: any[] = [];
        elements.each((_, el) => {
          const item = $(el);
          const title = item.find("title").text().trim() || item.find("name").text().trim();
          const description = item.find("description").text().trim();
          const instructions = item.find("instructions").text().trim();
          const category = item.find("category").text().trim() || "Arcade";
          
          // Image / Thumbnail
          let thumb = item.find("thumb").text().trim() || item.find("thumbnail").text().trim();
          if (!thumb) {
            const mediaThumb = item.find("media\\:thumbnail, thumbnail");
            if (mediaThumb.attr("url")) {
              thumb = mediaThumb.attr("url") || "";
            }
          }
          if (!thumb) {
            const enclosure = item.find("enclosure");
            if (enclosure.attr("url") && enclosure.attr("type")?.startsWith("image/")) {
              thumb = enclosure.attr("url") || "";
            }
          }

          // Game frame play URL
          const url = item.find("url").text().trim() || item.find("link").text().trim() || item.find("game_url").text().trim();
          const width = item.find("width").text().trim() || "800";
          const height = item.find("height").text().trim() || "600";

          if (title && url) {
            games.push({
              title,
              description,
              instructions,
              category,
              thumb,
              url,
              width,
              height
            });
          }
        });

        console.log(`GameMonetize proxy: Successfully parsed ${games.length} games from XML.`);
        return res.json(games.slice(0, 120));
      }

      // Try to parse as standard JSON
      try {
        let data = JSON.parse(trimmedText);
        if (Array.isArray(data)) {
          data = data.slice(0, 120);
        } else if (data && typeof data === "object" && Array.isArray(data.games)) {
          data.games = data.games.slice(0, 120);
        }
        return res.json(data);
      } catch (jsonErr) {
        // If JSON parsing fails, let's try regex fallback on XML in case starting tag check was missed
        if (trimmedText.includes("<title>") && trimmedText.includes("<url>")) {
          console.log("GameMonetize proxy: JSON parse failed but tags found. Retrying parse with cheerio...");
          const $ = cheerio.load(text);
          const games: any[] = [];
          $("item, game").each((_, el) => {
            const item = $(el);
            const title = item.find("title").text().trim() || item.find("name").text().trim();
            const url = item.find("url").text().trim() || item.find("link").text().trim();
            if (title && url) {
              games.push({
                title,
                description: item.find("description").text().trim(),
                instructions: item.find("instructions").text().trim(),
                category: item.find("category").text().trim() || "Arcade",
                thumb: item.find("thumb").text().trim() || item.find("thumbnail").text().trim(),
                url,
                width: item.find("width").text().trim() || "800",
                height: item.find("height").text().trim() || "600"
              });
            }
          });
          if (games.length > 0) {
            return res.json(games.slice(0, 120));
          }
        }
        throw jsonErr;
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("GameMonetize proxy fetch error:", error);
      
      // Serve beautiful fallback games so the user never faces an empty screen if GameMonetize is down
      const fallbacks = [
        {
          title: "Super Car Driving Simulator",
          category: "Driving",
          thumb: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&q=80",
          url: "https://gamemonetize.com/feed.php", // default frame
          description: "An extreme driving simulator with stunning controls and high speed cars.",
          instructions: "Use WASD or Arrow Keys to steer the vehicle.",
          width: "800",
          height: "600"
        },
        {
          title: "Cyberpunk Shooter Arena",
          category: "Shooting",
          thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
          url: "https://gamemonetize.com/feed.php",
          description: "Battle in high-fidelity cyber city environments against robots.",
          instructions: "Use Left Click to shoot, WASD to walk around.",
          width: "800",
          height: "600"
        },
        {
          title: "Retro Blocks Puzzle",
          category: "Puzzles",
          thumb: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80",
          url: "https://gamemonetize.com/feed.php",
          description: "A fun and classic tile-matching blocks game to train your intelligence.",
          instructions: "Use Space to rotate, Arrow Keys to move blocks.",
          width: "800",
          height: "600"
        }
      ];
      
      res.json(fallbacks);
    }
  });

  // Serve public static assets
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving of static compiled build
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PokiBox server running on http://localhost:${PORT}`);
  });
}

startServer();
