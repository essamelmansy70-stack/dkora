import fs from "fs";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import compression from "compression";

// Load environment variables
dotenv.config();

import { PRODUCTS_DATA, GUIDES_DATA } from "./src/data";

function getSeoMetaData(req: express.Request) {
  const productParam = req.query.product as string;
  const guideParam = req.query.guide as string;
  const categoryParam = req.query.category as string;

  let title = "سبورت زون | متجر المعدات والملابس الرياضية بأفضل الأسعار على أمازون";
  let description = "تسوق أفضل الأحذية الرياضية، الملابس الأنيقة، ومعدات التدريب واللياقة البدنية عالية الجودة. منتجات موثوقة ومختارة بعناية بروابط مباشرة إلى أمازون.";

  if (categoryParam) {
    if (categoryParam === "shoes") {
      title = "أحذية جري وملاعب رياضية ممتازة | سبورت زون";
      description = "تصفح تشكيلة واسعة من الأحذية الرياضية المريحة وأحذية الجري المخصصة للماراثونات والملاعب بأعلى التقييمات على أمازون.";
    } else if (categoryParam === "apparel") {
      title = "ملابس رياضية وتمرين ممتازة ومضادة للتعرق | سبورت زون";
      description = "تسوق ملابس رياضية وأطقم تمرين مريحة للرجال والنساء، مصممة من نسيج يسمح بالتهوية ويمتص العرق بكفاءة.";
    } else if (categoryParam === "equipment") {
      title = "معدات وأدوات اللياقة البدنية والجيم المنزلي | سبورت زون";
      description = "اكتشف أفضل أجهزة الكارديو، عقلة الباب، وحبال المقاومة لتجهيز صالتك الرياضية المنزلية المتكاملة بأسعار ممتازة.";
    }
  }

  if (productParam) {
    const prod = PRODUCTS_DATA.find(p => p.id === productParam);
    if (prod) {
      title = `${prod.titleAr} | سبورت زون`;
      description = prod.descriptionAr;
    }
  } else if (guideParam) {
    const guide = GUIDES_DATA.find(g => g.id === guideParam);
    if (guide) {
      title = `${guide.titleAr} | سبورت زون`;
      description = guide.excerptAr;
    }
  }

  return { title, description, lang: "ar", dir: "rtl" };
}

function replaceAllSeoMeta(html: string, seo: { title: string, description: string, lang: string, dir: string }) {
  let modified = html;

  // 1. replace html tag properties
  modified = modified.replace(/<html[^>]*>/gi, `<html lang="${seo.lang}" dir="${seo.dir}">`);

  // 2. replace <title>
  modified = modified.replace(/<title>[^<]*<\/title>/gi, `<title>${seo.title}</title>`);

  // 3. replace meta description
  modified = modified.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${seo.description}" />`);
  modified = modified.replace(/<meta\s+content="[^"]*"\s+name="description"\s*\/?>/gi, `<meta name="description" content="${seo.description}" />`);

  // 4. replace og:title
  modified = modified.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${seo.title}" />`);

  // 5. replace og:description
  modified = modified.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${seo.description}" />`);

  // 6. replace twitter:title
  modified = modified.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="twitter:title" content="${seo.title}" />`);

  // 7. replace twitter:description
  modified = modified.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="twitter:description" content="${seo.description}" />`);

  return modified;
}

// Helper to trace and get player info for prompt crafting
const PLAYER_JERSEYS: Record<string, { name: string; team: string; jersey: string }> = {
  messi: { name: "Lionel Messi", team: "Argentina", jersey: "iconic sky blue and white vertical striped shirt" },
  ronaldo: { name: "Cristiano Ronaldo", team: "Portugal", jersey: "red jersey with green accents and his legendary golden number 7 on the chest" },
  mbappe: { name: "Kylian Mbappé", team: "France", jersey: "modern royal navy blue jersey with white and red details" },
  haaland: { name: "Erling Haaland", team: "Norway", jersey: "red home shirt with dark blue details and athletic style" },
  modric: { name: "Luka Modrić", team: "Croatia", jersey: "famous red and white checkered squares soccer jersey" },
  salah: { name: "Mohamed Salah", team: "Egypt", jersey: "red shirt with black/white trim and traditional national team crest" }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust reverse proxies (such as Cloud Run, Cloudflare, etc.) to correctly populate req.hostname and req.protocol
  app.set("trust proxy", true);

  // Helper to escape XML special characters
  function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

  // Helper to resolve the correct base URL based on proxy headers and request context
  function getRequestBaseUrl(req: express.Request): string {
    // 1. If the user configured a custom SITE_URL or SITEMAP_BASE_URL, use it as the absolute source of truth.
    // This resolves any dynamic proxy-header or Cloud Run container routing issues in Google Search Console.
    const customSiteUrl = process.env.SITE_URL || process.env.SITEMAP_BASE_URL;
    if (customSiteUrl) {
      return customSiteUrl.replace(/\/$/, "");
    }

    const protocol = (req.headers["x-forwarded-proto"] as string) || req.protocol || "https";
    let host = (req.headers["x-forwarded-host"] as string) || req.get("host") || "";
    
    // If x-forwarded-host contains comma-separated proxy hosts, pick the first (original client host)
    if (host.includes(",")) {
      host = host.split(",")[0].trim();
    }

    // Fallback if host is completely missing
    if (!host) {
      host = "sportzone-aff.com";
    }

    // In production, remove any internal/external ports from the host header (e.g. example.com:3000 -> example.com)
    if (process.env.NODE_ENV === "production" && host.includes(":")) {
      host = host.split(":")[0];
    }
    
    return `${protocol}://${host}`;
  }

  // Enable gzip compression to decrease download payloads and improve FCP
  app.use(compression());

  // Increase body size limits for base64 image uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API Route: Combine user base64 photo with their matching players using Gemini
  app.post("/api/match-photo", async (req, res) => {
    try {
      const { userImage, playerId } = req.body;

      if (!userImage) {
        return res.status(400).json({ error: "User image is required" });
      }

      const playerKey = playerId || "messi";
      const info = PLAYER_JERSEYS[playerKey] || PLAYER_JERSEYS.messi;

      // Lazy check and initialization of Gemini API key to prevent startup crashes
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY environment variable is not defined. Falling back to simulated AI blend for demo purposes.");
        // If API key is missing, return fallback simulation (the player's image itself + info)
        return res.json({
          imageUrl: `/${playerKey}.jpg`,
          isSimulated: true,
          message: "API Key missing. Showing high-quality player portrait instead!"
        });
      }

      console.log(`Initiating image generation for player: ${playerKey} using gemini-2.5-flash-image`);
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Strip MimeType prefix if present (e.g., "data:image/jpeg;base64,...")
      let cleanBase64 = userImage;
      let mimeType = "image/jpeg";
      if (userImage.includes(";base64,")) {
        const parts = userImage.split(";base64,");
        mimeType = parts[0].replace("data:", "");
        cleanBase64 = parts[1];
      }

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: cleanBase64,
        },
      };

      const promptText = `This is a photograph of a user. Generate a high-quality, realistic, professional photograph showing this exact user on the left, standing happily and smiling side-by-side next to the legendary football player ${info.name} on the right.
${info.name} must be wearing his ${info.team} national football jersey (${info.jersey}).
They must be standing proud on a lush green championship football pitch at night under bright stadium lighting, looking at the camera.
The output must be a single beautifully synthesized natural photograph, aspect ratio 1:1, centered, sharp details, photorealistic. Output ONLY the resulting combined image.`;

      const textPart = {
        text: promptText,
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts: [imagePart, textPart] },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let generatedBase64 = "";

      if (response && response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            generatedBase64 = part.inlineData.data;
            break;
          }
        }
      }

      if (generatedBase64) {
        return res.json({
          imageUrl: `data:image/png;base64,${generatedBase64}`,
          isSimulated: false,
        });
      } else {
        // Fallback if no image returned from LLM
        console.warn("Gemini didn't return direct inline image data. Returning player fallback.");
        return res.json({
          imageUrl: `/${playerKey}.jpg`,
          isSimulated: true,
          message: "Gemini response did not contain inline image. Showing high-quality player portrait instead!"
        });
      }

    } catch (error: any) {
      console.error("Error generating match photo via Gemini API:", error);
      return res.status(500).json({ error: error.message || "Failed to generate photo combination" });
    }
  });

  // Dynamic robots.txt generator
  app.get("/robots.txt", (req, res) => {
    res.header("Content-Type", "text/plain; charset=utf-8");
    const baseUrl = getRequestBaseUrl(req);
    
    let text = `User-agent: *\n`;
    text += `Allow: /\n\n`;
    text += `Disallow: /node_modules/\n`;
    text += `Disallow: /dist/\n\n`;
    text += `Sitemap: ${baseUrl}/sitemap.xml\n`;
    res.status(200).send(text);
  });

  // Dynamic sitemap.xml generator
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml; charset=utf-8");
    
    const baseUrl = getRequestBaseUrl(req);
    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Root page
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(`${baseUrl}/`)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // 2. Categories
    const categories = ["shoes", "apparel", "equipment"];
    categories.forEach(cat => {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${baseUrl}/?category=${cat}`)}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // 3. Dynamic Products
    PRODUCTS_DATA.forEach(prod => {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${baseUrl}/?product=${prod.id}`)}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    // 4. Dynamic Guides
    GUIDES_DATA.forEach(guide => {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(`${baseUrl}/?guide=${guide.id}`)}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    res.status(200).send(xml);
  });

  // Serve static files / Vite bundle in Production or mount Vite in Development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Intercept standard page load requests to inject dynamic SEO headers for bots/sharers
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes, statics, and direct asset files
      if (url.startsWith("/api") || url.includes(".") || req.headers.accept?.includes("application/json")) {
        return next();
      }

      try {
        let html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        html = await vite.transformIndexHtml(url, html);
        const seo = getSeoMetaData(req);
        html = replaceAllSeoMeta(html, seo);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.middlewares(req, res, next);
      }
    });

    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode.");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files with robust Cache-Control headers for high-fidelity caching and performance
    app.use(express.static(distPath, {
      index: false,
      maxAge: "30d",
      setHeaders: (res, filePath) => {
        if (filePath.match(/\.(js|css|woff2?|eot|ttf|otf|json)$/)) {
          // Vite-built hashed assets or web fonts: cache indefinitely (1 year)
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (filePath.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)) {
          // Image assets: cache for 30 days
          res.setHeader("Cache-Control", "public, max-age=2592000");
        }
      }
    }));
    
    app.get("*", (req, res) => {
      try {
        let html = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        const seo = getSeoMetaData(req);
        html = replaceAllSeoMeta(html, seo);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (err) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully listening on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
