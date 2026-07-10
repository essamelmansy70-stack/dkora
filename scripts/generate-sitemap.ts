import fs from "fs";
import path from "path";
import { PRODUCTS_DATA, GUIDES_DATA } from "../src/data";

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

function generate() {
  const baseUrl = (process.env.SITE_URL || "https://dkora.online").replace(/\/$/, "");
  const today = new Date().toISOString().split("T")[0];

  // 1. Generate sitemap.xml
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Root page
  xml += `  <url>\n`;
  xml += `    <loc>${escapeXml(`${baseUrl}/`)}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Categories
  const categories = ["shoes", "apparel", "equipment"];
  categories.forEach(cat => {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(`${baseUrl}/?category=${cat}`)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic Products
  PRODUCTS_DATA.forEach(prod => {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(`${baseUrl}/?product=${prod.id}`)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic Guides
  GUIDES_DATA.forEach(guide => {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(`${baseUrl}/?guide=${guide.id}`)}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf-8");
  console.log("Statically generated public/sitemap.xml successfully!");

  // 2. Generate robots.txt
  let robots = `User-agent: *\n`;
  robots += `Allow: /\n\n`;
  robots += `Disallow: /node_modules/\n`;
  robots += `Disallow: /dist/\n\n`;
  robots += `Sitemap: ${baseUrl}/sitemap.xml\n`;

  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf-8");
  console.log("Statically generated public/robots.txt successfully!");
}

generate();
