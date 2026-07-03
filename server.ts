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
