import fs from "fs";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import compression from "compression";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use gzip compression
  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", cleared: true });
  });

  // Dynamic Sitemap XML generator
  app.get("/sitemap.xml", (req, res) => {
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const host = req.headers.host || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;
    
    const currentDate = new Date().toISOString().split("T")[0];
    
    const urls = [
      { loc: `${baseUrl}/?lang=ar`, changefreq: "daily", priority: "1.0" },
      { loc: `${baseUrl}/?lang=en`, changefreq: "daily", priority: "1.0" },
      
      { loc: `${baseUrl}/?page=terms&amp;lang=ar`, changefreq: "monthly", priority: "0.5" },
      { loc: `${baseUrl}/?page=terms&amp;lang=en`, changefreq: "monthly", priority: "0.5" },
      { loc: `${baseUrl}/?page=privacy&amp;lang=ar`, changefreq: "monthly", priority: "0.5" },
      { loc: `${baseUrl}/?page=privacy&amp;lang=en`, changefreq: "monthly", priority: "0.5" },
      
      { loc: `${baseUrl}/?lang=ar&amp;game=snake`, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/?lang=en&amp;game=snake`, changefreq: "weekly", priority: "0.8" },

      { loc: `${baseUrl}/?lang=ar&amp;game=tictactoe`, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/?lang=en&amp;game=tictactoe`, changefreq: "weekly", priority: "0.8" },

      { loc: `${baseUrl}/?lang=ar&amp;game=memory`, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/?lang=en&amp;game=memory`, changefreq: "weekly", priority: "0.8" },

      { loc: `${baseUrl}/?lang=ar&amp;game=grammar`, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/?lang=en&amp;game=grammar`, changefreq: "weekly", priority: "0.8" },

      { loc: `${baseUrl}/?lang=ar&amp;game=physics`, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/?lang=en&amp;game=physics`, changefreq: "weekly", priority: "0.8" }
    ];

    const xmlItems = urls.map(item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join("\n");

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(sitemapXml);
  });

  // Serve static files / Vite bundle in Production or mount Vite in Development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api") || url.includes(".") || req.headers.accept?.includes("application/json")) {
        return next();
      }

      try {
        let html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        html = await vite.transformIndexHtml(url, html);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.middlewares(req, res, next);
      }
    });

    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode.");
    const distPath = path.join(process.cwd(), "dist");
    
    app.use(express.static(distPath, {
      index: false,
      maxAge: "30d"
    }));
    
    app.get("*", (req, res) => {
      try {
        let html = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
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
