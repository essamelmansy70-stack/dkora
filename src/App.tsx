import { useState, useEffect, useRef, FormEvent, MouseEvent, TouchEvent, DragEvent, ChangeEvent } from 'react';
import Header from './components/Header';
import LegalModals from './components/LegalModals';
import { translations } from './translations';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Check, 
  Share2, 
  RotateCcw, 
  Upload, 
  Download, 
  Sliders, 
  Contrast, 
  Type, 
  Info, 
  HelpCircle, 
  Scissors, 
  Eraser, 
  Eye, 
  Pipette, 
  Maximize, 
  CheckCircle2, 
  Layers, 
  Volume2, 
  VolumeX, 
  FileImage, 
  RefreshCw, 
  SlidersHorizontal 
} from 'lucide-react';

// Interfaces for structured state
interface ProcessedMetrics {
  originalSize: number;
  originalWidth: number;
  originalHeight: number;
  compressedSize: number;
  compressedWidth: number;
  compressedHeight: number;
  ratioSaved: number;
}

interface ImageHistoryItem {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  savedSrc: string;
  timestamp: string;
}

export default function App() {
  // Localization state supporting English and Arabic
  const [locale, setLocale] = useState<'ar' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'ar') {
        return urlLang;
      }

      // Automatic browser preference language detection (Arabic for Arabs, English for foreigners)
      const userLanguages = navigator.languages || [];
      const isArabicSpeaker = userLanguages.some(l => l.toLowerCase().startsWith('ar')) || 
                             (navigator.language || (navigator as any).userLanguage || '').toLowerCase().startsWith('ar');
      return isArabicSpeaker ? 'ar' : 'en';
    }
    return 'ar'; // Default fallback
  });

  const t = translations[locale];

  // Synchronize dynamic direction, metadata, title, and query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentLang = params.get('lang');
    if (currentLang !== locale) {
      params.set('lang', locale); // Keep explicit lang parameter in URL for both lang=ar and lang=en dedicated links
      const newSearch = params.toString();
      const newPath = window.location.pathname + (newSearch ? `?${newSearch}` : '');
      window.history.replaceState({}, '', newPath);
    }
    
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = locale === 'ar' ? translations.ar.meta.titleAr : translations.en.meta.titleEn;

    // Dynamically update the meta description tag as well for full SEO compliance!
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', locale === 'ar' ? translations.ar.meta.descAr : translations.en.meta.descEn);
  }, [locale]);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Synchronize theme with document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Core image state
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>('image.png');
  const [originalFileType, setOriginalFileType] = useState<string>('image/png');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(null);
  
  // Undo/Redo/Reset Cache values
  const [historyList, setHistoryList] = useState<ImageHistoryItem[]>([]);

  // Main navigation tabs
  const [activeTab, setActiveTab] = useState<'compress' | 'background' | 'enhance' | 'watermark'>('compress');

  // Tool states: 1. Compression Settings
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/webp');
  const [resizeMode, setResizeMode] = useState<'percent' | 'pixels'>('percent');
  const [resizePercent, setResizePercent] = useState<number>(100);
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [customHeight, setCustomHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [aspectRatioValue, setAspectRatioValue] = useState<number>(1);

  // Tool states: 2. Background Removal Settings
  const [bgColorMode, setBgColorMode] = useState<boolean>(false);
  const [targetColor, setTargetColor] = useState<{r: number, g: number, b: number}>({ r: 255, g: 255, b: 255 });
  const [tolerance, setTolerance] = useState<number>(20);
  const [feather, setFeather] = useState<number>(5);
  const [isEyedropperActive, setIsEyedropperActive] = useState<boolean>(false);
  
  // Manual Eraser states
  const [manualEraserActive, setManualEraserActive] = useState<boolean>(false);
  const [eraserBrushSize, setEraserBrushSize] = useState<number>(25);
  const [eraserMode, setEraserMode] = useState<'erase' | 'restore'>('erase');
  
  // Tool states: 3. Color Enhancements / Adjustments
  const [brightness, setBrightness] = useState<number>(100); // 50 to 150
  const [contrast, setContrast] = useState<number>(100);     // 50 to 150
  const [saturation, setSaturation] = useState<number>(100);   // 0 to 200
  const [blur, setBlur] = useState<number>(0);               // 0 to 10px
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [sepia, setSepia] = useState<boolean>(false);

  // Tool states: 4. Watermark Settings
  const [useWatermark, setUseWatermark] = useState<boolean>(false);
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  const [watermarkText, setWatermarkText] = useState<string>('موسوعة dkora');
  const [watermarkColor, setWatermarkColor] = useState<string>('#ffffff');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(40); // 10 to 100
  const [watermarkSize, setWatermarkSize] = useState<number>(20); // Font size or image scale percentage
  const [watermarkPosition, setWatermarkPosition] = useState<'center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'pattern'>('bottom-left');
  const [logoImageSrc, setLogoImageSrc] = useState<string | null>(null);

  // Studio and Drag & Drop elements
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [compareSplitPercent, setCompareSplitPercent] = useState<number>(50);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Metrics state
  const [metrics, setMetrics] = useState<ProcessedMetrics | null>(null);

  // Canvas and Image DOM References for client processing
  const hiddenOriginalImageRef = useRef<HTMLImageElement | null>(null);
  const eraserMaskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingSplitRef = useRef<boolean>(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Setup sound cues (synthesizer on the fly!)
  const playSound = (freq = 440, duration = 0.08, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignored if sound card is busy
    }
  };

  // Helper Toast Alert
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle Dark Mode
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    playSound(nextTheme === 'dark' ? 350 : 580, 0.12);
  };

  // Dropzone file parser
  const parseSelectedFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('خطأ: يرجى رفع ملف صورة صحيح بصيغة (PNG, JPG, WebP أو SVG).');
      playSound(250, 0.2, 'square');
      return;
    }

    setIsProcessing(true);
    setOriginalFileName(file.name);
    setOriginalFileType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImageSrc(result);
      playSound(520, 0.15);
      
      // Reset manual eraser layer whenever a new image is loaded
      if (eraserMaskCanvasRef.current) {
        const ctx = eraserMaskCanvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, eraserMaskCanvasRef.current.width, eraserMaskCanvasRef.current.height);
        }
      }
    };
    reader.onerror = () => {
      showToast('حدث خطأ أثناء تحميل وقراءة الصورة.');
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      parseSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      parseSelectedFile(e.target.files[0]);
    }
  };

  // Watermark logo loader helper
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImageSrc(event.target?.result as string);
        showToast('تم رفع شعار المائي بنجاح! سيتم وضعه فوق الكومبو المحسن.');
        playSound(600, 0.1);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Listen to original image load to update aspect ratios and sizes
  const handleOriginalImageLoad = () => {
    const img = hiddenOriginalImageRef.current;
    if (!img) return;

    const width = img.naturalWidth;
    const height = img.naturalHeight;
    setCustomWidth(width);
    setCustomHeight(height);
    setAspectRatioValue(width / height);

    // Synchronize size of eraser mask canvas to match the original layout sizes
    if (eraserMaskCanvasRef.current) {
      eraserMaskCanvasRef.current.width = width;
      eraserMaskCanvasRef.current.height = height;
      const ctx = eraserMaskCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, width, height);
      }
    }

    // Trigger initial calculation
    setTimeout(() => {
      triggerReprocess();
    }, 100);
  };

  // Ratio lock resize handlers
  const handleWidthChange = (val: number) => {
    setCustomWidth(val);
    if (lockAspectRatio) {
      setCustomHeight(Math.round(val / aspectRatioValue));
    }
  };

  const handleHeightChange = (val: number) => {
    setCustomHeight(val);
    if (lockAspectRatio) {
      setCustomWidth(Math.round(val * aspectRatioValue));
    }
  };

  // Helper color parsing
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  // Preset size appender
  const applyPresetSize = (w: number, h: number, descriptionSec: string) => {
    setResizeMode('pixels');
    setCustomWidth(w);
    setCustomHeight(h);
    showToast(`تم تطبيق قالب مقاس: ${descriptionSec}`);
    playSound(450, 0.08);
  };

  // Main high-performance image reconstruction pipeline
  const triggerReprocess = () => {
    const imgElement = hiddenOriginalImageRef.current;
    if (!imgElement || !imgElement.complete) return;

    setIsProcessing(true);

    // Configure core canvas sizing
    const renderCanvas = document.createElement('canvas');
    let targetW = imgElement.naturalWidth;
    let targetH = imgElement.naturalHeight;

    if (resizeMode === 'percent') {
      const scale = resizePercent / 100;
      targetW = Math.round(imgElement.naturalWidth * scale);
      targetH = Math.round(imgElement.naturalHeight * scale);
    } else {
      targetW = customWidth || imgElement.naturalWidth;
      targetH = customHeight || imgElement.naturalHeight;
    }

    renderCanvas.width = targetW;
    renderCanvas.height = targetH;

    const ctx = renderCanvas.getContext('2d');
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    // STEP 1: Process and render with hardware-accelerated color filter Adjustments
    ctx.clearRect(0, 0, targetW, targetH);
    
    // Build filter string
    let filterString = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    if (blur > 0) filterString += ` blur(${blur}px)`;
    if (grayscale) filterString += ' grayscale(100%)';
    if (sepia) filterString += ' sepia(100%)';
    
    ctx.filter = filterString;
    ctx.drawImage(imgElement, 0, 0, targetW, targetH);
    ctx.filter = 'none'; // reset to native graphics

    // STEP 2: Background Removal algorithms
    if (bgColorMode) {
      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;
      const { r: tR, g: tG, b: tB } = targetColor;
      
      // Setup parameters for Redmean (human perception model) color distance
      const maxDist = (tolerance / 100) * 765;
      const fRange = (feather / 100) * 200;
      
      const maxDistSq = maxDist * maxDist;
      const innerDist = Math.max(0, maxDist - fRange);
      const innerDistSq = innerDist * innerDist;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a === 0) continue;

        const dR = r - tR;
        const dG = g - tG;
        const dB = b - tB;
        const rMean = (r + tR) / 2;

        // Fast Redmean squared distance calculation - avoids Math.sqrt inside the hot path!
        const rWeight = 2 + rMean / 256;
        const gWeight = 4;
        const bWeight = 2 + (255 - rMean) / 256;
        const distSq = rWeight * dR * dR + gWeight * dG * dG + bWeight * dB * dB;

        if (distSq < maxDistSq) {
          if (fRange > 0 && distSq > innerDistSq) {
            // Smooth transparency transition (feather edge)
            const distance = Math.sqrt(distSq);
            const alphaMul = (distance - innerDist) / fRange;
            data[i + 3] = Math.max(0, Math.min(255, Math.round(a * alphaMul)));
          } else {
            data[i + 3] = 0; // complete knockout
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // STEP 3: Subtractive compositing for manual brush strokes overlay
    if (eraserMaskCanvasRef.current) {
      ctx.save();
      // Enable source-out configuration to punch holes through the canvas
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(eraserMaskCanvasRef.current, 0, 0, targetW, targetH);
      ctx.restore();
    }

    // STEP 4: Add Creative Watermarks (Text or Custom Logo graphic)
    if (useWatermark) {
      ctx.save();
      
      // Set opacity
      ctx.globalAlpha = watermarkOpacity / 100;

      if (watermarkType === 'text') {
        const fontSizeVal = Math.max(16, Math.round((targetW * 0.05) * (watermarkSize / 20)));
        ctx.font = `600 ${fontSizeVal}px Cairo, system-ui, sans-serif`;
        ctx.fillStyle = watermarkColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate location coordinates based on preset selection
        let x = targetW / 2;
        let y = targetH / 2;
        const padding = fontSizeVal * 1.2;

        if (watermarkPosition === 'bottom-left') {
          ctx.textAlign = 'left';
          x = padding;
          y = targetH - padding;
        } else if (watermarkPosition === 'bottom-right') {
          ctx.textAlign = 'right';
          x = targetW - padding;
          y = targetH - padding;
        } else if (watermarkPosition === 'top-left') {
          ctx.textAlign = 'left';
          x = padding;
          y = padding;
        } else if (watermarkPosition === 'top-right') {
          ctx.textAlign = 'right';
          x = targetW - padding;
          y = padding;
        } else if (watermarkPosition === 'pattern') {
          // Repeated slate patterns over grid
          ctx.textAlign = 'center';
          const spacingX = targetW / 3;
          const spacingY = targetH / 3;
          ctx.rotate(-Math.PI / 8);
          for (let gx = -1; gx < 4; gx++) {
            for (let gy = -1; gy < 4; gy++) {
              ctx.fillText(watermarkText, gx * spacingX + spacingX / 2, gy * spacingY + spacingY / 2);
            }
          }
        }

        if (watermarkPosition !== 'pattern') {
          ctx.fillText(watermarkText, x, y);
        }

      } else if (watermarkType === 'image' && logoImageSrc) {
        // Render logo image
        const logoImg = new Image();
        logoImg.onload = () => {
          const lScale = (watermarkSize / 100);
          const logoW = Math.round(targetW * 0.25 * lScale);
          const logoH = Math.round(logoW * (logoImg.naturalHeight / logoImg.naturalWidth));

          let lx = (targetW - logoW) / 2;
          let ly = (targetH - logoH) / 2;
          const offset = 20;

          if (watermarkPosition === 'bottom-left') {
            lx = offset;
            ly = targetH - logoH - offset;
          } else if (watermarkPosition === 'bottom-right') {
            lx = targetW - logoW - offset;
            ly = targetH - logoH - offset;
          } else if (watermarkPosition === 'top-left') {
            lx = offset;
            ly = offset;
          } else if (watermarkPosition === 'top-right') {
            lx = targetW - logoW - offset;
            ly = offset;
          }

          // Composite logo
          ctx.drawImage(logoImg, lx, ly, logoW, logoH);
          ctx.restore();
          
          // Re-generate output blobs
          exportCompressedImage(renderCanvas, targetW, targetH);
        };
        logoImg.src = logoImageSrc;
        return; // Async handler handles end flow
      }
      ctx.restore();
    }

    // Finish synchronous path
    exportCompressedImage(renderCanvas, targetW, targetH);
  };

  // Convert canvas output to configured format and quality blob
  const exportCompressedImage = (canvas: HTMLCanvasElement, targetW: number, targetH: number) => {
    const originalLength = originalImageSrc?.length ? Math.round((originalImageSrc.length * 3) / 4) : 10000;
    const targetMime = format;
    const compressionQuality = quality / 100;

    canvas.toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const processedDataUrl = reader.result as string;
          setProcessedImageSrc(processedDataUrl);
          
          // Calculate high precise ratios
          const finalSize = blob.size;
          const ratioPercent = Math.max(0, Math.round(((originalLength - finalSize) / originalLength) * 100));

          setMetrics({
            originalSize: originalLength,
            originalWidth: hiddenOriginalImageRef.current?.naturalWidth || targetW,
            originalHeight: hiddenOriginalImageRef.current?.naturalHeight || targetH,
            compressedSize: finalSize,
            compressedWidth: targetW,
            compressedHeight: targetH,
            ratioSaved: ratioPercent
          });

          setIsProcessing(false);
        };
        reader.readAsDataURL(blob);
      } else {
        setIsProcessing(false);
      }
    }, targetMime, compressionQuality);
  };

  // Recalculating monitor
  useEffect(() => {
    if (originalImageSrc) {
      triggerReprocess();
    }
  }, [
    quality, 
    format, 
    resizeMode, 
    resizePercent, 
    customWidth, 
    customHeight,
    lockAspectRatio,
    bgColorMode,
    targetColor,
    tolerance,
    feather,
    brightness,
    contrast,
    saturation,
    blur,
    grayscale,
    sepia,
    useWatermark,
    watermarkType,
    watermarkText,
    watermarkColor,
    watermarkOpacity,
    watermarkSize,
    watermarkPosition,
    logoImageSrc
  ]);

  // Handle Eyedropper sampling logic manually on click
  const handleImageCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isEyedropperActive) return;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate fractional click coordinate
    const clickXPercent = (e.clientX - rect.left) / rect.width;
    const clickYPercent = (e.clientY - rect.top) / rect.height;

    // Create secondary temporary memory canvas to read the actual original pixel
    const pixelCanvas = document.createElement('canvas');
    const img = hiddenOriginalImageRef.current;
    if (!img) return;

    pixelCanvas.width = img.naturalWidth;
    pixelCanvas.height = img.naturalHeight;
    const ctx = pixelCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const px = Math.round(clickXPercent * img.naturalWidth);
      const py = Math.round(clickYPercent * img.naturalHeight);
      try {
        const pixel = ctx.getImageData(px, py, 1, 1).data;
        setTargetColor({
          r: pixel[0],
          g: pixel[1],
          b: pixel[2]
        });
        setBgColorMode(true); // turn context filter on immediately
        setIsEyedropperActive(false); // deactivate
        showToast(`تم التقاط اللون المستهدف بنجاح! RGB(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
        playSound(800, 0.1);
      } catch (err) {
        console.error('Failed reading pixel data: ', err);
      }
    }
  };

  // Auto-detect dominant background color from the 4 corners of the image
  const autoDetectBackground = () => {
    const img = hiddenOriginalImageRef.current;
    if (!img || !img.complete) {
      showToast('يرجى اختيار صورة أولاً لتفعيل ميزة الكشف التلقائي.');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(img, 0, 0);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    try {
      // Sample the 4 corners
      const corners = [
        ctx.getImageData(0, 0, 1, 1).data,
        ctx.getImageData(w - 1, 0, 1, 1).data,
        ctx.getImageData(0, h - 1, 1, 1).data,
        ctx.getImageData(w - 1, h - 1, 1, 1).data
      ];

      // Average the corner colors
      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      corners.forEach(p => {
        // Only count pixels that are not fully transparent
        if (p[3] > 10) {
          rSum += p[0];
          gSum += p[1];
          bSum += p[2];
          count++;
        }
      });

      if (count === 0) {
        showToast('فشل الكشف التلقائي: حواف الصورة شفافة بالفعل.');
        return;
      }

      const avgColor = {
        r: Math.round(rSum / count),
        g: Math.round(gSum / count),
        b: Math.round(bSum / count)
      };

      setTargetColor(avgColor);
      setBgColorMode(true);
      setTolerance(32); // Slightly higher balanced tolerance as a default for corner-matching
      setFeather(12);   // Balanced default feathering
      showToast(`المستشعر الذكي كشف الحواف واقتطع لون الخلفية بنجاح: RGB(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`);
      playSound(780, 0.15);
    } catch (err) {
      console.error('Error auto-detecting background:', err);
      // Fallback
      setTargetColor({ r: 255, g: 255, b: 255 });
      setBgColorMode(true);
      showToast('تم تهيئة الإزالة الافتراضية على اللون البيضاء.');
    }
  };

  // Manual brush drawing mechanisms
  const drawManualMask = (clientX: number, clientY: number, isDrawingActive: boolean) => {
    const maskCanvas = eraserMaskCanvasRef.current;
    if (!maskCanvas || !isDrawingActive) return;

    const rect = maskCanvas.getBoundingClientRect();
    // Fractional coordinate translation
    const pxFrac = (clientX - rect.left) / rect.width;
    const pyFrac = (clientY - rect.top) / rect.height;

    const ctx = maskCanvas.getContext('2d');
    if (ctx) {
      ctx.save();
      // Translate coordinates to natural mask pixels
      const x = pxFrac * maskCanvas.width;
      const y = pyFrac * maskCanvas.height;

      // Draw radius circle on mask canvas
      ctx.beginPath();
      // Map scale brush size proportionally to image natural width
      const mappedBrushSize = (eraserBrushSize / rect.width) * maskCanvas.width;
      ctx.arc(x, y, mappedBrushSize, 0, Math.PI * 2);

      if (eraserMode === 'erase') {
        ctx.fillStyle = 'rgba(0,0,0,1)'; 
        ctx.globalCompositeOperation = 'source-over'; // write to black mask
        ctx.fill();
      } else {
        ctx.globalCompositeOperation = 'destination-out'; // clear black mask
        ctx.fill();
      }
      ctx.restore();
      
      // Instantly refresh output pipeline
      triggerReprocess();
    }
  };

  const handleBrushStart = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!manualEraserActive) return;
    drawManualMask(e.clientX, e.clientY, true);
  };

  const handleBrushMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!manualEraserActive) return;
    if (e.buttons === 1) { // Left-click down
      drawManualMask(e.clientX, e.clientY, true);
    }
  };

  const handleTouchDraw = (e: TouchEvent<HTMLCanvasElement>) => {
    if (!manualEraserActive || e.touches.length === 0) return;
    const touch = e.touches[0];
    drawManualMask(touch.clientX, touch.clientY, true);
  };

  // Clear manual edits completely
  const handleResetManualMask = () => {
    const maskCanvas = eraserMaskCanvasRef.current;
    if (maskCanvas) {
      const ctx = maskCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
        triggerReprocess();
        showToast('تم مسح تدوينات فرشاة التفريغ واستعادة الخلفية الأصلية للكامل.');
        playSound(330, 0.15, 'triangle');
      }
    }
  };

  // Quick Preset Colors
  const applyPresetColor = (r: number, g: number, b: number, title: string) => {
    setBgColorMode(true);
    setTargetColor({ r, g, b });
    showToast(`تم تعيين فحص لون: ${title}`);
    playSound(720, 0.08);
  };

  // Save current processed file to history and download
  const handleDownloadImage = () => {
    if (!processedImageSrc) return;

    // Save to local session log
    const indexName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
    const outputExt = format.split('/')[1] || 'webp';
    const outputFilename = `${indexName}_dkora_optimized.${outputExt}`;

    const newHistory: ImageHistoryItem = {
      id: Date.now().toString(),
      name: outputFilename,
      originalSize: metrics?.originalSize || 0,
      compressedSize: metrics?.compressedSize || 0,
      savedSrc: processedImageSrc,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setHistoryList([newHistory, ...historyList]);

    const activeLink = document.createElement('a');
    activeLink.href = processedImageSrc;
    activeLink.download = outputFilename;
    document.body.appendChild(activeLink);
    activeLink.click();
    document.body.removeChild(activeLink);

    playSound(880, 0.22, 'sine');
    showToast(`🔥 تم تحميل الصورة بنجاح وتوفير ${metrics?.ratioSaved}% من الحجم!`);
  };

  // Comparison slider mouse and touch listeners
  const startSplitDrag = (e: MouseEvent) => {
    e.preventDefault();
    isDraggingSplitRef.current = true;
    document.addEventListener('mousemove', handleSplitDragging);
    document.addEventListener('mouseup', stopSplitDrag);
  };

  const handleSplitDragging = (e: globalThis.MouseEvent) => {
    if (!isDraggingSplitRef.current || !previewContainerRef.current) return;
    const rect = previewContainerRef.current.getBoundingClientRect();
    const positionX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (positionX / rect.width) * 100));
    setCompareSplitPercent(percentage);
  };

  const stopSplitDrag = () => {
    isDraggingSplitRef.current = false;
    document.removeEventListener('mousemove', handleSplitDragging);
    document.removeEventListener('mouseup', stopSplitDrag);
  };

  // Helper reset utility
  const handleResetAllControls = () => {
    setQuality(80);
    setFormat('image/webp');
    setResizePercent(100);
    setLockAspectRatio(true);
    setBgColorMode(false);
    setTolerance(20);
    setFeather(5);
    setManualEraserActive(false);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setGrayscale(false);
    setSepia(false);
    setUseWatermark(false);
    showToast('تمت إعادة تعيين الفلاتر وقيم الضغط لقيمها القياسية.');
    playSound(400, 0.2);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans flex flex-col antialiased">
      
      {/* Premium Modular Header with full controls */}
      <Header 
        theme={theme} 
        handleToggleTheme={handleToggleTheme} 
        locale={locale}
        setLocale={setLocale}
        t={t}
      />

      {/* Modern white background that turns cosmic dark-blue in dark mode */}
      <div className="bg-white dark:bg-slate-950 bg-gradient-to-b from-white via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white pt-10 pb-20 px-4 text-center relative overflow-hidden transition-colors duration-200 border-b border-slate-100 dark:border-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,26,64,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,26,64,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.02),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_40%)]" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10 animate-fade-in text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] sm:text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#ff1a40]" />
            <span>{locale === 'ar' ? 'أفضل أداة مجانية لمعالجة وضغط الصور وصناع المحتوى لعام 2026' : 'Ultimate Free Image Optimizer & Processor for Creators in 2026'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-snug">
            {t.hero.headlinePrefix} <br />
            <span className="text-[#ff1a40] drop-shadow-[0_0_15px_rgba(255,26,64,0.15)] dark:drop-shadow-[0_0_15px_rgba(255,26,64,0.3)]">{t.hero.headlineHighlight}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>
      </div>


      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold px-4.5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#ff1a40] animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* hidden raw original image loading controller */}
      {originalImageSrc && (
        <img
          ref={hiddenOriginalImageRef}
          src={originalImageSrc}
          alt="original secret renderer"
          onLoad={handleOriginalImageLoad}
          style={{ display: 'none' }}
        />
      )}

      {/* Center Layout Workspace */}
      {!originalImageSrc ? (
        <div className="max-w-4xl w-full mx-auto px-4 py-12 animate-fade-in space-y-8">
          {/* STEP 1 Block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            {/* Step card header bar */}
            <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4.5 border-b border-slate-150 dark:border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#ff1a40] text-white text-xxs sm:text-xs font-black rounded-lg">
                  STEP 1
                </span>
                <h3 className="text-sm font-black text-slate-800 dark:text-white">
                  الخطوة الأولى: أضف صورتك هنا لبدء المعالجة الذكية
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-200/50 dark:bg-rose-950/40 text-[#ff1a40] flex items-center justify-center font-bold">
                📸
              </div>
            </div>

            {/* Drag drop zone body exactly styled like the reference */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                const inputEl = document.getElementById('main_file_input');
                if (inputEl) inputEl.click();
              }}
              className={`p-10 text-center flex flex-col items-center justify-center transition-all min-h-[360px] cursor-pointer ${
                isDragging
                  ? 'bg-rose-500/10 scale-95'
                  : 'bg-transparent hover:bg-slate-50/40 dark:hover:bg-slate-900/30'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-[#ff1a40] mb-4 shadow-sm animate-bounce">
                <Upload className="w-8 h-8" />
              </div>

              <h4 className="text-md sm:text-lg font-black text-slate-800 dark:text-white leading-snug">
                {t.dropzone.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mt-2.5">
                {t.dropzone.formats}
              </p>

              {/* Browse file button */}
              <label 
                onClick={(e) => e.stopPropagation()}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{t.dropzone.btn}</span>
                <input
                  id="main_file_input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>

              {/* Speed notes */}
              <div className="mt-10 flex gap-4 text-[10px] font-bold text-slate-400 justify-center" onClick={(e) => e.stopPropagation()}>
                <span className="flex items-center gap-1">🛡️ {locale === 'ar' ? 'أمان محلي 100٪' : '100% Local Security'}</span>
                <span>•</span>
                <span className="flex items-center gap-1">⚡ {locale === 'ar' ? 'فوري بدون سيرفر' : 'Instant No Server'}</span>
                <span>•</span>
                <span className="flex items-center gap-1">🗜️ {locale === 'ar' ? 'ضغط WebP فائق' : 'High WebP Compression'}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* LEFT COLUMN: Controls Panel & Tools Toolbar (5 Cols) */}
          <section className="lg:col-span-12 xl:col-span-5 space-y-6">
            
            {/* Step tag indicating STEP 2 for Controls toolbar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="px-2.5 py-0.5 bg-[#ff1a40] text-white text-[10px] font-black rounded-lg">
                  STEP 2
                </span>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between w-full">
                  <span>🎨 {locale === 'ar' ? 'الخطوة الثانية: اضبط التفاصيل والخيارات' : 'Step 2: Adjust Layout & Settings'}</span>
                  <button 
                    onClick={handleResetAllControls}
                    className="text-[10px] text-rose-500 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {locale === 'ar' ? 'إعادة الموازنة للتلقائي' : 'Reset to Default'}
                  </button>
                </h3>
              </div>
            {/* TAB CONTENT 1: Image Compression and Resizing Settings */}
            <div className="space-y-4 pt-1 animate-fade">
                
                {/* File Format Output */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-505 dark:text-slate-350">
                    صيغة التصدير التكتيكية:
                  </label>
                  <p className="text-[10px] text-slate-400">صيغة WebP تناسب المواقع الحديثة وسرعة أرشفة جوجل.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['image/webp', 'image/jpeg', 'image/png'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => { setFormat(type); playSound(640, 0.06); }}
                        className={`py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          format === type 
                            ? 'bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border-emerald-500' 
                            : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500'
                        }`}
                      >
                        {type.split('/')[1].toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compression Level Quality Slider */}
                <div className="space-y-1.5 bg-slate-50/50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-900">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600 dark:text-slate-300">معدل جودة الصورة المضغوطة:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>حجم أصغر (١٠٪)</span>
                    <span>مثالي وموصى به (٧٠٪ - ٨٥٪)</span>
                    <span>بدون ضغط (١٠٠٪)</span>
                  </div>
                </div>

                {/* Resizing Mode Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-606 dark:text-slate-350">أبعاد ومقاس الصورة:</label>
                    <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg">
                      <button
                        onClick={() => setResizeMode('percent')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                          resizeMode === 'percent' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'
                        }`}
                      >
                        نسبة مئوية
                      </button>
                      <button
                        onClick={() => setResizeMode('pixels')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                          resizeMode === 'pixels' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'
                        }`}
                      >
                        بكسل محدد
                      </button>
                    </div>
                  </div>

                  {resizeMode === 'percent' ? (
                    <div className="space-y-2 bg-slate-100/30 dark:bg-slate-955 p-3 rounded-2xl border border-slate-100 dark:border-slate-900/50">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span>نسبة تقليص المقاس:</span>
                        <span className="text-emerald-500">{resizePercent}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={resizePercent}
                        onChange={(e) => setResizePercent(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400">العرض (الافتراضي):</span>
                          <input 
                            type="number"
                            value={customWidth || ''}
                            onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                            className="w-full p-2 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400">الارتفاع (الافتراضي):</span>
                          <input 
                            type="number"
                            value={customHeight || ''}
                            onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                            className="w-full p-2 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={lockAspectRatio}
                          onChange={(e) => setLockAspectRatio(e.target.checked)}
                          className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">حفظ نسبة التناسب وتثبيت الأبعاد تلقائياً</span>
                      </label>
                    </div>
                  )}

                  {/* High Quality Preset Dimensions for Creators */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold text-slate-400">مقاسات سريعة جاهزة لصناع المحتوى:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      <button
                        onClick={() => applyPresetSize(1280, 720, 'مصغرات يوتيوب HD')}
                        className="p-1 px-2 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900 hover:border-emerald-550 transition-all text-right cursor-pointer"
                      >
                        📺 يوتيوب (720p HD)
                      </button>
                      <button
                        onClick={() => applyPresetSize(1080, 1080, 'بوست انستجرام مربع')}
                        className="p-1 px-2 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900 hover:border-emerald-550 transition-all text-right cursor-pointer"
                      >
                        📸 انستجرام مربع (1:1)
                      </button>
                      <button
                        onClick={() => applyPresetSize(1920, 1080, 'غلاف فيسبوك HD')}
                        className="p-1 px-2 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900 hover:border-emerald-550 transition-all text-right cursor-pointer"
                      >
                        👥 بوست فيسبوك HD
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          {/* Sizing Info Cards explaining PageSpeed */}
          <div className="bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/10 rounded-3xl p-5 text-slate-800 dark:text-white space-y-3">
            <h4 className="text-xs font-extrabold text-emerald-650 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              لماذا يؤثر حجم الصورة على الأرشفة وسرعة موقعك المقفل؟
            </h4>
            <p className="text-[11px] text-slate-605 dark:text-slate-300 leading-relaxed font-semibold">
              المواقع الإعلانية والذكية تحتاج سرعة تحميل فائقة لحصد نقاط PageSpeed ممتازة من جوجل. 
              عند تقليص حجم الخلفية وضغط الصورة بطريقة <b>Client-Side</b> هنا:
            </p>
            <ul className="text-[10px] text-slate-505 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>يقل زمن انتظار استجابة السيرفر للصفر.</li>
              <li>توفر عرض الباقة لعملائك ومثالي جداً لأرشفة صور محركات البحث SEO.</li>
              <li>التحويل لـ <b>WebP</b> يضمن معدلات توفير تتجاوز الـ ٧٥٪ مع الحفاظ التام والكامل للعناصر الحادة.</li>
            </ul>
          </div>

        </section>

        {/* RIGHT COLUMN: Studio Canvas Preview Box (7 Cols) */}
        <section className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Active Image loaded and metrics controller */}
          {metrics && originalImageSrc && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-900/60 rounded-3xl p-4.5 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="space-y-0.5 border-l border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold block">الحجم الأصلي للملف:</span>
                <span className="text-xs sm:text-sm font-mono font-black text-slate-700 dark:text-slate-105">
                  {(metrics.originalSize / 1024).toFixed(1)} KB
                </span>
                <span className="text-[9px] block text-slate-400 font-mono">({metrics.originalWidth}x{metrics.originalHeight}px)</span>
              </div>

              <div className="space-y-0.5 border-l border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold block">الملف بعد التحسين:</span>
                <span className="text-xs sm:text-sm font-mono font-black text-emerald-500">
                  {(metrics.compressedSize / 1024).toFixed(1)} KB
                </span>
                <span className="text-[9px] block text-slate-400 font-mono">({metrics.compressedWidth}x{metrics.compressedHeight}px)</span>
              </div>

              <div className="space-y-0.5 border-l border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold block">نسبة التوفير المحسوبة:</span>
                <span className="text-xs sm:text-sm font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {metrics.ratioSaved}% توفير 🔥
                </span>
                <span className="text-[9px] block text-slate-400">تخفيض هائل بمساحة الذاكرة</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold block">صيغة المخرجات الحالية:</span>
                <span className="text-xs sm:text-sm font-black text-indigo-400 uppercase">
                  {format.split('/')[1]} output
                </span>
                <span className="text-[9px] text-slate-400 block">بدون رفع أي شيء لسيرفر</span>
              </div>

            </div>
          )}

          {/* STUDIO PREVIEW VIEW BOX CONTAINER */}
          <div className="flex-grow flex flex-col">
            
            {/* If no image loaded, show big file uploader drag drop zone */}
            {!originalImageSrc ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-grow min-h-[350px] sm:min-h-[480px] border-4 border-dashed rounded-3xl p-6 sm:p-10 text-center flex flex-col items-center justify-center transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-500/10 scale-95'
                    : 'border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-900'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 shadow-sm">
                  <Upload className="w-8 h-8 animate-bounce" />
                </div>
                
                <h3 className="text-md sm:text-lg font-black text-slate-800 dark:text-white leading-snug">
                  اسحب وأسقط صورتك هنا لبدء معالجتها مجاناً!
                </h3>
                <p className="text-xs sm:text-sm text-slate-450 dark:text-slate-400 max-w-md mx-auto leading-relaxed mt-2">
                  يدعم الصيغ القياسية: PNG، JPG، WebP، وغيرها. نحن لا نرفع صورك نهائياً؛ تجري المعالجة وتفريغ الخلفية المعزولة بالكامل محلياً داخل متصفحك بشكل سري وآمن تماماً.
                </p>

                {/* Upload File Button UI */}
                <label className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>تصفح واختيار صورة من جهازك</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </label>

                <div className="mt-8 flex gap-3 text-[10px] font-bold text-slate-400 justify-center">
                  <span className="flex items-center gap-1">🛡️ حماية وخصوصية تامة</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">⚡ حوسبة طرفية سريعة</span>
                </div>
              </div>
            ) : (
              
              /* Studio workspace layout view with original and processed comparison */
              <div className="flex-grow flex flex-col space-y-4">
                
                {/* Visual view controller bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-xs font-bold text-slate-505 dark:text-slate-350">
                      اسم الملف: <code className="bg-slate-100 dark:bg-slate-900 px-1 rounded text-emerald-600">{originalFileName}</code>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setOriginalImageSrc(null);
                        setProcessedImageSrc(null);
                        setMetrics(null);
                        setLogoImageSrc(null);
                        playSound(300, 0.12, 'square');
                      }}
                      className="text-xs text-rose-500 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      مسح وإغلاق الصورة
                    </button>
                  </div>
                </div>

                {/* Main Studio Render Viewport */}
                <div 
                  ref={previewContainerRef}
                  className="relative flex-grow min-h-[350px] bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden"
                  style={{ 
                    backgroundImage: theme === 'dark' 
                      ? 'radial-gradient(#1e293b 1px, transparent 1px)' 
                      : 'radial-gradient(#f1f5f9 1.5px, transparent 1.5px), radial-gradient(#e2e8f0 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                  }}
                >
                  
                  {/* Eyedropper notification mask overlay */}
                  {isEyedropperActive && (
                    <div className="absolute inset-0 z-30 bg-emerald-950/20 pointer-events-none flex items-center justify-center text-center">
                      <div className="bg-slate-900/95 text-white p-3 rounded-2xl border border-slate-700 max-w-xs space-y-1">
                        <Pipette className="w-5 h-5 mx-auto text-emerald-400 animate-bounce" />
                        <span className="block text-xs font-bold">نمط قطارة الألوان نشط!</span>
                        <p className="text-[10px] text-slate-300">اضغط فوق أي بكسل في الصورة لتحديده كخلفية مستقطعة ومزالّة.</p>
                      </div>
                    </div>
                  )}

                  {/* Canvas container representing live modified buffer inputs */}
                  <div className="relative max-w-full max-h-[480px] aspect-video flex items-center justify-center">
                    
                    {/* ORIGINAL LIVE CANVAS - Used to bind eyedropper clicks and manual drawing eraser canvas on top */}
                    <canvas
                      onClick={handleImageCanvasClick}
                      onMouseDown={handleBrushStart}
                      onMouseMove={handleBrushMove}
                      onTouchStart={handleTouchDraw}
                      onTouchMove={handleTouchDraw}
                      ref={eraserMaskCanvasRef}
                      className={`max-w-full max-h-[480px] object-contain cursor-crosshair rounded-xl ${
                        manualEraserActive ? 'ring-2 ring-emerald-500 z-20 opacity-30 shadow-2xl' : ''
                      }`}
                      style={{ 
                        // Show the original loaded image behind our canvas layers
                        backgroundImage: `url(${originalImageSrc})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        // If no manual brush eraser is active, it stays subtle
                        opacity: manualEraserActive ? 0.75 : 0
                      }}
                    />

                    {/* Draggable slider splitting comparison of BEFORE / AFTER */}
                    {!manualEraserActive && !isEyedropperActive && processedImageSrc && (
                      <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
                        
                        {/* BEFORE VIEW (Background / left side) */}
                        <div 
                          className="absolute inset-0 w-full h-full select-none"
                          style={{
                            backgroundImage: `url(${originalImageSrc})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                        />

                        {/* AFTER VIEW (Clipped right side) */}
                        <div 
                          className="absolute inset-0 h-full overflow-hidden select-none"
                          style={{
                            backgroundImage: `url(${processedImageSrc})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: `${compareSplitPercent}%`
                          }}
                        />

                        {/* Interactive drag split line handle */}
                        <div 
                          onMouseDown={startSplitDrag}
                          className="absolute h-full w-1 bg-white hover:bg-emerald-450 cursor-ew-resize flex items-center justify-center active:bg-emerald-600 transition-colors z-30"
                          style={{ left: `${compareSplitPercent}%` }}
                        >
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-550 flex items-center justify-center text-emerald-600 shadow-xl pointer-events-none select-none">
                            <Maximize className="w-4 h-4 rotate-45" />
                          </div>
                          
                          {/* Helper visual badge guides */}
                          <span className="absolute top-2 right-4 bg-slate-900/85 text-white text-[9px] font-black p-1 px-2 rounded backdrop-blur-md whitespace-nowrap">البداية</span>
                          <span className="absolute top-2 left-4 bg-emerald-650/95 text-white text-[9px] font-black p-1 px-2 rounded backdrop-blur-md whitespace-nowrap">المحسن والمعدل</span>
                        </div>

                      </div>
                    )}

                    {/* Loading spinner overlay */}
                    {isProcessing && (
                      <div className="absolute inset-0 z-30 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center">
                        <div className="bg-slate-900 text-white p-4.5 rounded-2xl flex items-center gap-3 border border-slate-700">
                          <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                          <span className="text-xs font-black">جاري المعالجة الحية للثنائيات...</span>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Subtext tips on manual brush */}
                {manualEraserActive && (
                  <div className="bg-amber-500/10 border-r-4 border-amber-500 p-3 rounded-xl text-xs text-amber-800 dark:text-amber-400">
                    💡 <b>تلميح اللمس الحر:</b> اسحب إصبعك أو حرك الماوس بالضغط والتحريك فوق الصورة ليقوم بمسح اللون محلياً من الصورة.
                  </div>
                )}

                {/* Main Download Call To Action block */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadImage}
                    disabled={isProcessing || !processedImageSrc}
                    className="flex-1 py-4.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/15"
                  >
                    <Download className="w-5 h-5" />
                    <span>تحميل الصورة المُحسّنة فورأً مجاناً</span>
                  </button>
                  
                  {/* Copy Link shortcut to copy base64 preview */}
                  <button
                    onClick={() => {
                      if (processedImageSrc) {
                        navigator.clipboard.writeText(processedImageSrc);
                        showToast('تم نسخ كود الصورة المفرغة (Base64) للحافظة!');
                        playSound(620, 0.1);
                      }
                    }}
                    className="p-4 bg-slate-100 hover:bg-slate-205 text-slate-705 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    title="انسخ كود الرابط البرمجي Base64 مباشرة بدون رفع"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>نسخ كود Base64</span>
                  </button>
                </div>

              </div>
            )}

            {/* HISTORY SHEET FOR SAVED OPTIMIZED IMAGES DURING SESSION */}
            {historyList.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-905 rounded-3xl p-5 shadow-xs space-y-3.5 mt-6 animate-slide-up">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-805 pb-2">
                  💾 تاريخ التحسين المنجز (بجلسة العمل الحالية):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {historyList.map((item) => {
                    const savedKb = ((item.originalSize - item.compressedSize) / 1024).toFixed(1);
                    return (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img 
                            src={item.savedSrc} 
                            alt={item.name} 
                            className="w-10 h-10 object-cover rounded-lg border border-slate-300/60 dark:border-slate-800 bg-slate-200/50"
                          />
                          <div className="text-xs space-y-0.5 overflow-hidden">
                            <span className="block font-bold text-slate-800 dark:text-slate-100 truncate">{item.name}</span>
                            <span className="text-[10px] text-emerald-500 block">
                              وفرت <b>{savedKb} KB</b> من الذاكرة ({item.timestamp})
                            </span>
                          </div>
                        </div>

                        <a 
                          href={item.savedSrc} 
                          download={item.name} 
                          className="p-1 px-2.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold rounded-lg text-[10px] hover:bg-emerald-500 hover:text-white transition-all cursor-pointer shrink-0"
                        >
                          تحميل مجدداً
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </section>

      </main>
    )}

      {/* FOOTER NOTIFY AND METRICS ACCENTS */}
      <footer className="border-t border-slate-200/60 dark:border-slate-900 bg-white dark:bg-slate-950 py-8 text-center text-xs text-slate-400 space-y-4 mt-auto">
        <div className="font-sans font-black text-[11px] text-slate-400">
          {locale === 'ar' ? 'مستودع أدوات معالجة الصور ومسح الخلفية بمتصفح العميل ٢٠٢٦ 🚀' : 'Secure In-Browser Image Compressor & Background Remover 2026 🚀'}
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          {t.legal.copyright}
        </p>

        {/* Legal Actions Triggers */}
        <div className="flex items-center justify-center gap-3.5 text-[11px] font-extrabold text-slate-400">
          <button 
            onClick={() => { setLegalModal('privacy'); playSound(550, 0.05); }}
            className="hover:text-rose-500 transition-all cursor-pointer hover:underline"
          >
            {t.legal.privacyBtn}
          </button>
          <span>•</span>
          <button 
            onClick={() => { setLegalModal('terms'); playSound(550, 0.05); }}
            className="hover:text-rose-500 transition-all cursor-pointer hover:underline"
          >
            {t.legal.termsBtn}
          </button>
        </div>
      </footer>

      {/* Render Legal Modals with connected actions */}
      <LegalModals isOpen={legalModal} onClose={() => setLegalModal(null)} t={t} />

    </div>
  );
}
