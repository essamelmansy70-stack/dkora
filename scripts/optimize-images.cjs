const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting image optimization script...');

function cleanImageBuffer(buf) {
  // Check for JPEG (JFIF / Exif)
  const jfifIdx = buf.indexOf(Buffer.from('JFIF'));
  if (jfifIdx >= 0) {
    return Buffer.concat([Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10]), buf.slice(jfifIdx)]);
  }
  const exifIdx = buf.indexOf(Buffer.from('Exif'));
  if (exifIdx >= 0) {
    return Buffer.concat([Buffer.from([0xFF, 0xD8, 0xFF, 0xE1]), buf.slice(exifIdx - 2)]);
  }
  // Check for PNG
  const pngIdx = buf.indexOf(Buffer.from('PNG'));
  if (pngIdx >= 0) {
    return Buffer.concat([Buffer.from([0x89]), buf.slice(pngIdx)]);
  }
  // Check for WebP / RIFF
  const riffIdx = buf.indexOf(Buffer.from('RIFF'));
  if (riffIdx >= 0) {
    return buf.slice(riffIdx);
  }
  return buf;
}

function processDirectory(dirPath, maxWidth = 900) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath, maxWidth);
      continue;
    }
    
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
    
    // Skip already small or optimized files (< 120KB)
    if (stat.size < 120 * 1024) continue;
    
    try {
      console.log(`Optimizing: ${filePath} (Original size: ${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
      const rawBuf = fs.readFileSync(filePath);
      const cleanedBuf = cleanImageBuffer(rawBuf);
      
      const tmpClean = filePath + '.tmp.jpg';
      fs.writeFileSync(tmpClean, cleanedBuf);
      
      const tmpOpt = filePath + '.opt' + (ext === '.webp' ? '.webp' : '.jpg');
      
      // Use ffmpeg with low priority / fast preset to resize and compress
      try {
        execSync(`ffmpeg -y -i "${tmpClean}" -vf "scale='min(${maxWidth},iw)':-2" -q:v 5 "${tmpOpt}"`, { stdio: 'ignore' });
        
        if (fs.existsSync(tmpOpt)) {
          const optStat = fs.statSync(tmpOpt);
          if (optStat.size > 0 && optStat.size < stat.size) {
            fs.copyFileSync(tmpOpt, filePath);
            console.log(`  -> Successfully compressed to ${(optStat.size / 1024).toFixed(1)} KB`);
          }
          fs.unlinkSync(tmpOpt);
        }
      } catch (err) {
        console.warn(`  Failed ffmpeg for ${filePath}: ${err.message}`);
      }
      
      if (fs.existsSync(tmpClean)) {
        fs.unlinkSync(tmpClean);
      }
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
    }
  }
}

console.log('Optimizing public directory images...');
processDirectory(path.resolve(__dirname, '../public'), 900);

console.log('Optimizing src/assets/images directory...');
processDirectory(path.resolve(__dirname, '../src/assets/images'), 800);

console.log('Image optimization complete!');
