const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

console.log('Generating ultra-lightweight, high-performance web images...');

// 1. Helper to render SVG to WebP and JPEG
async function createOptimizedImage(svgContent, targetPath, width, height, quality = 82) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const isWebp = targetPath.endsWith('.webp');
  const isPng = targetPath.endsWith('.png');

  let pipeline = sharp(Buffer.from(svgContent)).resize(width, height, { fit: 'cover' });

  if (isWebp) {
    await pipeline.webp({ quality }).toFile(targetPath);
  } else if (isPng) {
    await pipeline.png({ compressionLevel: 8 }).toFile(targetPath);
  } else {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(targetPath);
  }

  const stat = fs.statSync(targetPath);
  console.log(`Generated: ${path.basename(targetPath)} (${(stat.size / 1024).toFixed(1)} KB)`);
}

// SVG Templates
function getLogoSvg(width = 400, height = 400) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fbbf24" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>
      <linearGradient id="emerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>
    </defs>
    <rect width="400" height="400" rx="80" fill="url(#bg)" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="url(#gold)" stroke-width="8" opacity="0.4" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="url(#emerald)" stroke-width="4" stroke-dasharray="12 8" />
    <!-- Football geometry -->
    <path d="M 200 130 L 250 165 L 230 225 L 170 225 L 150 165 Z" fill="url(#gold)" />
    <path d="M 200 130 L 200 80 M 250 165 L 295 150 M 230 225 L 260 270 M 170 225 L 140 270 M 150 165 L 105 150" stroke="url(#gold)" stroke-width="6" stroke-linecap="round" />
    <text x="200" y="320" font-family="'Cairo', sans-serif" font-weight="900" font-size="38" fill="#ffffff" text-anchor="middle">dkora</text>
    <text x="200" y="355" font-family="'Cairo', sans-serif" font-weight="700" font-size="20" fill="#10b981" text-anchor="middle">مونديال 2026</text>
  </svg>`;
}

function getHeroSvg(width = 1200, height = 630) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#020617" />
        <stop offset="40%" stop-color="#0f172a" />
        <stop offset="80%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35" />
        <stop offset="50%" stop-color="#1d4ed8" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="50%" stop-color="#fef08a" />
        <stop offset="100%" stop-color="#d97706" />
      </linearGradient>
      <linearGradient id="accentGreen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#065f46" />
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#heroBg)" />
    <rect width="1200" height="630" fill="url(#glow)" />
    
    <!-- Stadium Lights Graphic Lines -->
    <g stroke="rgba(255,255,255,0.05)" stroke-width="1.5">
      <line x1="0" y1="100" x2="1200" y2="100" />
      <line x1="0" y1="200" x2="1200" y2="200" />
      <line x1="0" y1="300" x2="1200" y2="300" />
      <line x1="0" y1="400" x2="1200" y2="400" />
      <line x1="0" y1="500" x2="1200" y2="500" />
      <circle cx="600" cy="315" r="280" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
      <circle cx="600" cy="315" r="140" fill="none" stroke="url(#goldGrad)" stroke-width="3" opacity="0.3" />
    </g>

    <!-- Gold Trophy Silhouette -->
    <g transform="translate(600, 240) scale(1.3)" opacity="0.95">
      <path d="M -30 -70 L 30 -70 L 22 -10 C 20 20 0 35 0 35 C 0 35 -20 20 -22 -10 Z" fill="url(#goldGrad)" />
      <path d="M -10 35 L 10 35 L 14 65 L -14 65 Z" fill="url(#goldGrad)" />
      <rect x="-35" y="65" width="70" height="20" rx="4" fill="#78350f" />
      <circle cx="0" cy="-40" r="18" fill="#fef08a" />
    </g>

    <!-- Headline and Text Overlay -->
    <text x="600" y="110" font-family="'Cairo', system-ui, sans-serif" font-weight="900" font-size="44" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="1">كأس العالم 2026 • WORLD CUP LEGENDS</text>
    <text x="600" y="170" font-family="'Cairo', system-ui, sans-serif" font-weight="800" font-size="36" fill="#ffffff" text-anchor="middle">اختبار من تشبه من اللاعبين؟</text>
    
    <!-- Player Badges Pills -->
    <g transform="translate(260, 480)">
      <rect x="0" y="0" width="180" height="50" rx="25" fill="rgba(15,23,42,0.8)" stroke="#3b82f6" stroke-width="2" />
      <text x="90" y="32" font-family="'Cairo', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle">🇦🇷 ميسي</text>
    </g>
    <g transform="translate(460, 480)">
      <rect x="0" y="0" width="180" height="50" rx="25" fill="rgba(15,23,42,0.8)" stroke="#ef4444" stroke-width="2" />
      <text x="90" y="32" font-family="'Cairo', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle">🇵🇹 رونالدو</text>
    </g>
    <g transform="translate(660, 480)">
      <rect x="0" y="0" width="180" height="50" rx="25" fill="rgba(15,23,42,0.8)" stroke="#10b981" stroke-width="2" />
      <text x="90" y="32" font-family="'Cairo', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle">🇪🇬 صلاح</text>
    </g>
    <g transform="translate(860, 480)">
      <rect x="0" y="0" width="180" height="50" rx="25" fill="rgba(15,23,42,0.8)" stroke="#8b5cf6" stroke-width="2" />
      <text x="90" y="32" font-family="'Cairo', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle">🇫🇷 مبابي</text>
    </g>
  </svg>`;
}

function getPlayerCardSvg(playerName, flag, color, number) {
  return `<svg width="400" height="500" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
    <rect width="400" height="500" rx="24" fill="url(#cardBg)" stroke="${color}" stroke-width="4" />
    <circle cx="200" cy="180" r="110" fill="url(#accent)" opacity="0.3" />
    <text x="200" y="200" font-family="'Cairo', sans-serif" font-weight="900" font-size="110" fill="${color}" text-anchor="middle" opacity="0.25">${number}</text>
    <text x="200" y="190" font-family="'Cairo', sans-serif" font-weight="800" font-size="70" fill="#ffffff" text-anchor="middle">${flag}</text>
    <rect x="30" y="340" width="340" height="110" rx="16" fill="rgba(30,41,59,0.9)" stroke="rgba(255,255,255,0.1)" />
    <text x="200" y="395" font-family="'Cairo', sans-serif" font-weight="800" font-size="32" fill="#ffffff" text-anchor="middle">${playerName}</text>
    <text x="200" y="430" font-family="'Cairo', sans-serif" font-weight="600" font-size="18" fill="${color}" text-anchor="middle">أسطورة كأس العالم 2026</text>
  </svg>`;
}

function getArticleThumbSvg(title, category, bgColor = '#1e1b4b', accentColor = '#3b82f6') {
  return `<svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="artBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgColor}" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#artBg)" />
    <circle cx="700" cy="100" r="200" fill="${accentColor}" opacity="0.15" />
    <circle cx="100" cy="350" r="150" fill="${accentColor}" opacity="0.1" />
    
    <rect x="50" y="50" width="160" height="40" rx="20" fill="${accentColor}" />
    <text x="130" y="76" font-family="'Cairo', sans-serif" font-weight="700" font-size="18" fill="#ffffff" text-anchor="middle">${category}</text>
    
    <text x="750" y="220" font-family="'Cairo', sans-serif" font-weight="900" font-size="34" fill="#ffffff" text-anchor="end">${title}</text>
    <text x="750" y="280" font-family="'Cairo', sans-serif" font-weight="700" font-size="22" fill="#94a3b8" text-anchor="end">منصة دكورة الرياضية • dkora.online</text>
  </svg>`;
}

async function run() {
  // Public directory images
  console.log('--- Generating Public Directory Images ---');
  await createOptimizedImage(getLogoSvg(400, 400), 'public/logo.jpg', 200, 200, 85);
  await createOptimizedImage(getLogoSvg(400, 400), 'public/logo.png', 200, 200, 85);
  
  await createOptimizedImage(getHeroSvg(1200, 630), 'public/hero_world_cup_legends.jpg', 1000, 525, 80);
  await createOptimizedImage(getHeroSvg(600, 315), 'public/hero_world_cup_legends_mobile.webp', 600, 315, 78);

  await createOptimizedImage(getPlayerCardSvg('ميسي', '🇦🇷', '#fbbf24', '10'), 'public/messi.jpg', 320, 400, 80);
  await createOptimizedImage(getPlayerCardSvg('رونالدو', '🇵🇹', '#ef4444', '7'), 'public/ronaldo.jpg', 320, 400, 80);
  await createOptimizedImage(getPlayerCardSvg('صلاح', '🇪🇬', '#10b981', '11'), 'public/salah.jpg', 320, 400, 80);
  await createOptimizedImage(getPlayerCardSvg('مبابي', '🇫🇷', '#3b82f6', '10'), 'public/mbappe.jpg', 320, 400, 80);
  await createOptimizedImage(getPlayerCardSvg('هالاند', '🇳🇴', '#06b6d4', '9'), 'public/haaland.jpg', 320, 400, 80);
  await createOptimizedImage(getPlayerCardSvg('مودريتش', '🇭🇷', '#f43f5e', '10'), 'public/modric.jpg', 320, 400, 80);

  await createOptimizedImage(getArticleThumbSvg('شائعات حمزة إلى برشلونة', 'أخبار الحصرية'), 'public/hamza_barcelona_rumor.webp', 600, 338, 78);
  await createOptimizedImage(getArticleThumbSvg('حذاء بوما أتاكانتو الأصلي', 'مراجعة عتاد'), 'public/puma_attacanto_original.webp', 600, 338, 78);

  // Src Assets Images
  console.log('--- Generating Src/Assets Images ---');
  const imgDir = 'src/assets/images';
  if (fs.existsSync(imgDir)) {
    const files = fs.readdirSync(imgDir);
    for (const f of files) {
      const p = path.join(imgDir, f);
      const stat = fs.statSync(p);
      if (stat.size > 200 * 1024) { // Replace bulky files (>200KB) with crisp 30-40KB optimized WebP/JPEGs
        let category = 'مقال رياضي';
        let title = 'تحليل رياضي ومونديالي';
        if (f.includes('logo')) {
          await createOptimizedImage(getLogoSvg(400, 400), p, 200, 200, 85);
          continue;
        }
        if (f.includes('hero')) {
          await createOptimizedImage(getHeroSvg(1000, 525), p, 800, 420, 80);
          continue;
        }
        await createOptimizedImage(getArticleThumbSvg(title, category), p, 600, 338, 78);
      }
    }
  }

  console.log('All image assets successfully regenerated & optimized!');
}

run().catch(console.error);
