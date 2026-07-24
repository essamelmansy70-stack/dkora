import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const htmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf-8');
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    const cssFile = files.find(f => f.endsWith('.css') && f.startsWith('index-'));
    if (cssFile) {
      const cssPath = path.join(assetsDir, cssFile);
      const cssContent = fs.readFileSync(cssPath, 'utf-8');
      
      // Replace external CSS link tag with inlined style tag to completely eliminate render-blocking CSS
      html = html.replace(
        /<link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/gi,
        `<style>${cssContent}</style>`
      );
      
      fs.writeFileSync(htmlPath, html, 'utf-8');
      console.log(`[Inline CSS] Successfully inlined ${cssFile} (${(cssContent.length / 1024).toFixed(1)} KB) into dist/index.html`);
    }
  }
}
