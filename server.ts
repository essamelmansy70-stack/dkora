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
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second strict timeout for parallel fetches

    try {
      const category = req.query.category;
      
      // We fetch both the default feed and the user's specific requested Driving feed (category 10, format 0) to merge them
      const urlsToFetch: string[] = [];
      if (category) {
        urlsToFetch.push(`https://gamemonetize.com/feed.php?format=1&category=${category}&num=120`);
      } else {
        // User requested Driving Category 10 XML feed
        urlsToFetch.push(`https://gamemonetize.com/feed.php?format=0&category=10&num=50&page=1`);
        // General JSON feed
        urlsToFetch.push(`https://gamemonetize.com/feed.php?format=1&num=120`);
      }

      console.log(`GameMonetize proxy: Fetching XML and JSON feeds:`, urlsToFetch);

      const fetchPromises = urlsToFetch.map(async (url) => {
        try {
          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
              "Accept": "application/json, text/xml, application/xml, */*",
              "Accept-Language": "en-US,en;q=0.9"
            }
          });

          if (!response.ok) {
            console.error(`Failed to fetch sub-feed ${url}:`, response.status);
            return [];
          }

          const text = await response.text();
          const trimmedText = text.trim();
          const parsedGames: any[] = [];

          // Check if it's XML or HTML
          if (trimmedText.startsWith("<") || trimmedText.includes("<?xml") || trimmedText.includes("<rss")) {
            const $ = cheerio.load(text, { xmlMode: true });
            let elements = $("item");
            if (elements.length === 0) {
              elements = $("game");
            }

            elements.each((_, el) => {
              const item = $(el);
              const title = item.find("title").text().trim() || item.find("name").text().trim();
              const description = item.find("description").text().trim();
              const instructions = item.find("instructions").text().trim();
              const categoryVal = item.find("category").text().trim() || "Arcade";
              
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
              const gameUrl = item.find("url").text().trim() || item.find("link").text().trim() || item.find("game_url").text().trim();
              const width = item.find("width").text().trim() || "800";
              const height = item.find("height").text().trim() || "600";

              if (title && gameUrl) {
                parsedGames.push({
                  title,
                  description,
                  instructions,
                  category: categoryVal,
                  thumb,
                  url: gameUrl,
                  width,
                  height
                });
              }
            });
          } else {
            // Parse as standard JSON
            try {
              const data = JSON.parse(trimmedText);
              if (Array.isArray(data)) {
                parsedGames.push(...data);
              } else if (data && typeof data === "object" && Array.isArray(data.games)) {
                parsedGames.push(...data.games);
              }
            } catch (jsonErr) {
              // Regex fallback
              if (trimmedText.includes("<title>") && trimmedText.includes("<url>")) {
                const $ = cheerio.load(text);
                $("item, game").each((_, el) => {
                  const item = $(el);
                  const title = item.find("title").text().trim() || item.find("name").text().trim();
                  const gameUrl = item.find("url").text().trim() || item.find("link").text().trim();
                  if (title && gameUrl) {
                    parsedGames.push({
                      title,
                      description: item.find("description").text().trim(),
                      instructions: item.find("instructions").text().trim(),
                      category: item.find("category").text().trim() || "Arcade",
                      thumb: item.find("thumb").text().trim() || item.find("thumbnail").text().trim(),
                      url: gameUrl,
                      width: item.find("width").text().trim() || "800",
                      height: item.find("height").text().trim() || "600"
                    });
                  }
                });
              }
            }
          }
          return parsedGames;
        } catch (e) {
          console.error(`Error processing feed ${url}:`, e);
          return [];
        }
      });

      const allFeedsResults = await Promise.all(fetchPromises);
      clearTimeout(timeoutId);

      // Deduplicate games by title
      const uniqueGamesMap = new Map<string, any>();
      allFeedsResults.forEach((gameList) => {
        gameList.forEach((g) => {
          if (g && g.title && g.url) {
            uniqueGamesMap.set(g.title.toLowerCase().trim(), g);
          }
        });
      });

      const combinedGames = Array.from(uniqueGamesMap.values());
      console.log(`GameMonetize proxy: Successfully combined and unique-filtered ${combinedGames.length} games.`);
      
      return res.json(combinedGames.slice(0, 150));
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
