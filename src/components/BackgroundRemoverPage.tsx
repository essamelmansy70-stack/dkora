import React, { useState, useEffect, useRef, ChangeEvent, DragEvent, MouseEvent } from 'react';
import { 
  Upload, 
  Download, 
  RotateCcw, 
  Sparkles, 
  Trash2, 
  Undo2, 
  Redo2, 
  Eraser, 
  Paintbrush, 
  Sliders, 
  Eye, 
  Palette, 
  Image as ImageIcon,
  MousePointerClick,
  Check,
  Pipette,
  Layers,
  ZoomIn,
  ZoomOut,
  XSquare,
  RefreshCw,
  Info
} from 'lucide-react';

interface BackgroundRemoverPageProps {
  locale: 'ar' | 'en';
}

const translations = {
  ar: {
    title: "أداة إزالة الخلفية الذكية الاحترافية واليدوية",
    subtitle: "عالج وافصل خلفيات صورك مجاناً وبدقة فائقة وبأمان 100٪ محلياً داخل متصفحك مباشرة دون استهلاك الإنترنت",
    dropzoneTitle: "اسحب صورتك هنا أو اضغط للاختيار والتعديل المباشر",
    dropzoneSubtitle: "يدعم PNG، JPG، JPEG، WebP (بحد أقصى ٣٠ ميجابايت - خصوصيتك محمية بالكامل)",
    toolsHeader: "صندوق الأدوات الاحترافي",
    autoBackdropBtn: "✨ إزالة الخلفية السادة بنقرة واحدة (آلي)",
    autoBackdropDesc: "يقوم بتحليل زوايا الصورة وعزل الخلفيات الموحدة تلقائياً بالذكاء الحركي المحلي.",
    magicWandTitle: "🎯 الممحاة السحرية (تفريغ اللون باللمس)",
    magicWandDesc: "انقر فوق أي لون في الصورة لتطبيقه وإزالته تدريجياً وبشكل متصل بالخلفية.",
    eraserTitle: "🖌️ ممحاة يدوية",
    restoreTitle: "🎨 فرشاة استرجاع الأصلي",
    globalChromaTitle: "🟢 عزل الكروما والألوان عالمياً",
    globalChoking: "تفريغ اللون المحدد من كامل الملف",
    toleranceTitle: "درجة ضبط التسامح اللوني (Tolerance):",
    brushSizeTitle: "حجم فرشاة المسح والاسترجاع:",
    brushHardnessTitle: "قساوة حواف الممحاة:",
    bgPreviewTitle: "تخصيص خلفية المعاينة الجديدة ومطابقتها:",
    bgTransparent: "شفافة بالكامل (فارغة)",
    bgSolidColor: "لون موحد",
    bgCustomImage: "دمج خلفية جديدة (Wallpaper)",
    bgUploadBtn: "رفع صورة خلفية جديدة",
    unsupportedImage: "صيغة الملف غير مدعومة أو الحجم كبير جداً.",
    downloadBtn: "تحميل الصورة مفرغة الخلفية فوراً (PNG)",
    resetBtn: "إعادة تعيين الصورة الأصلية",
    undoBtn: "تراجع",
    redoBtn: "إعادة",
    noImageUploaded: "يرجى اختيار صورة أولاً لبدء عملية التفريغ والإزالة.",
    magicWandCursor: "انقر لتفريغ هذا اللون",
    removeSuccess: "تم تفريغ الخلفية وتصدير الصورة بنجاح! 🚀",
    howToUseTitle: "💡 إرشادات للحصول على أعلى دقة احترافية:",
    step1: "1. للخلفيات السادة (كالبيضاء والرمادية)، اضغط على زر 'الإزالة التلقائية' لتوفير الوقت بالكامل.",
    step2: "2. استخدم الممحاة السحرية (🎯) وانقر بدقة على الأجزاء والألوان الزائدة لإزالتها بشكل سلس ومتصل.",
    step3: "3. يمكنك استخدام الممحاة اليدوية (🖌️) لتنعيم الحواف والتفاصيل الدقيقة بدقة تكبير عالية.",
    step4: "4. إذا قمت بمسح جزء هام بالخطأ، استخدم 'فرشاة استرجاع الأصلي' (🎨) لإعادته فوراً دون فقدان جهارة الصورة."
  },
  en: {
    title: "Professional Smart Background Remover & Mask Editor",
    subtitle: "Remove and edit image backgrounds with pixel-perfect resolution, 100% locally and safely in your browser",
    dropzoneTitle: "Drag your image here or click to select and process local assets",
    dropzoneSubtitle: "Supports PNG, JPG, JPEG, WebP (Max 30MB - Offline and private visual engine)",
    toolsHeader: "Interactive Extraction Toolkit",
    autoBackdropBtn: "✨ One-Click Auto Background Eraser",
    autoBackdropDesc: "Analyzes corners and isolates solid and gradient backgrounds instantaneously via local chroma detection.",
    magicWandTitle: "🎯 Connective Magic Wand (Flood Fill)",
    magicWandDesc: "Click any pixel to automatically trace and erase similar connected colors with custom tolerance accuracy.",
    eraserTitle: "🖌️ Manual Eraser Brush",
    restoreTitle: "🎨 Original Recovery Brush",
    globalChromaTitle: "🟢 Global Chroma Key & Color Picker",
    globalChoking: "Erase selected color globally throughout entire frame",
    toleranceTitle: "Color Tolerance (Sensitivity):",
    brushSizeTitle: "Eraser/Recovery Brush Size:",
    brushHardnessTitle: "Brush Edge Hardness & Softness:",
    bgPreviewTitle: "Customize Compose Canvas Background:",
    bgTransparent: "Fully Transparent Grid",
    bgSolidColor: "Solid Color Layer",
    bgCustomImage: "Composite New Background Image",
    bgUploadBtn: "Upload Custon Background Wallpaper",
    unsupportedImage: "Unsupported format or file size is exceeding constraints.",
    downloadBtn: "Download Cutout Image (Transparent PNG)",
    resetBtn: "Reset Current Progress",
    undoBtn: "Undo Line",
    redoBtn: "Redo Line",
    noImageUploaded: "Please upload an image to begin isolating background elements.",
    magicWandCursor: "Click pixel to erase color range",
    removeSuccess: "Background isolated and PNG file generated safely inside your device! 🚀",
    howToUseTitle: "💡 Operational Guidelines for Pro Results:",
    step1: "1. For solid white, gray, or custom backdrop studio photos, simply use 'One-Click Auto Background Eraser' to save time.",
    step2: "2. Select the Magic Wand (🎯) and touch any leftover color corners to trace and flood-fill them cleanly.",
    step3: "3. Use the Manual Eraser (🖌️) to remove complex textures and trim edges with zoom scaling.",
    step4: "4. If you over-erased details, toggle the Recovery Brush (🎨) to restore original pixels seamlessly."
  }
};

export default function BackgroundRemoverPage({ locale }: BackgroundRemoverPageProps) {
  const t = translations[locale];
  const isRtl = locale === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalImgElement, setOriginalImgElement] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>('isolated-background');
  
  // Interactive Tools selection
  // 'magicWand' = Flood fill erase on click
  // 'eraser' = manual transparency painting
  // 'restore' = repaint original pixels
  // 'colorPicker' = eye dropper selection
  const [activeTool, setActiveTool] = useState<'magicWand' | 'eraser' | 'restore' | 'colorPicker'>('magicWand');
  
  // Custom states for editing sliders
  const [tolerance, setTolerance] = useState<number>(30);
  const [brushSize, setBrushSize] = useState<number>(35);
  const [brushHardness, setBrushHardness] = useState<number>(60);
  const [pickedChromaColor, setPickedChromaColor] = useState<{ r: number; g: number; b: number } | null>(null);

  // Compose Background Layer settings
  const [bgType, setBgType] = useState<'transparent' | 'solid' | 'image'>('transparent');
  const [bgSolidColor, setBgSolidColor] = useState<string>('#ffffff');
  const [bgImageSrc, setBgImageSrc] = useState<string | null>(null);

  // Undo/Redo historical buffer stack to avoid memory exhaustion
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  // UI state feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showBrushIndicator, setShowBrushIndicator] = useState<boolean>(false);
  const [brushPos, setBrushPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Canvas DOM references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bgFileInputRef = useRef<HTMLInputElement | null>(null);

  // Paint state variables
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Show status cues helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Sound cue play helper
  const playSound = (freq = 380, duration = 0.08) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // safe fallback on browser policies
    }
  };

  // Trigger file chooser Dialog
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Open solid background composition uploader
  const handleBgUploadClick = () => {
    bgFileInputRef.current?.click();
  };

  // Drag and drop events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleBgFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgImageSrc(event.target.result as string);
          setBgType('image');
          playSound(550, 0.1);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t.unsupportedImage);
      return;
    }
    
    // Set filenames
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    setFileName(`${nameWithoutExt}-no-bg`);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const dataUrl = e.target.result as string;
        setImageSrc(dataUrl);
        setUndoStack([]);
        setRedoStack([]);
        setPickedChromaColor(null);
        setZoomLevel(1);

        // Load to original HTML Image element to keep pristine pixels
        const img = new Image();
        img.onload = () => {
          setOriginalImgElement(img);
          initializeCanvas(img);
        };
        img.src = dataUrl;
        playSound(440, 0.1);
      }
    };
    reader.readAsDataURL(file);
  };

  // Initialize Canvas layout with original image proportions (max bounding fit inside workspace view width & height)
  const initializeCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // We keep canvas dimensions exactly matching the original image sizes for pristine export quality!
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw the clean state
    ctx.drawImage(img, 0, 0);

    // Save initial state to history stack
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([initialData]);
    setRedoStack([]);
  };

  // Push unique canvas capture to history stack
  const pushToHistory = (customData?: ImageData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const currentCap = customData || ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Save to Undo stack
    setUndoStack(prev => {
      const nextStack = [...prev, currentCap];
      // Bound size to 15 entries to prevent canvas memory bloating crashes on mobile/browsers
      if (nextStack.length > 15) {
        nextStack.shift();
      }
      return nextStack;
    });
    // Clear Redo stack as a new timeline branch is created
    setRedoStack([]);
  };

  // Handle Undo action
  const handleUndo = () => {
    if (undoStack.length <= 1) return; // Must have at least 1 initial frame
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    playSound(300, 0.05);
    const activeState = undoStack[undoStack.length - 1];
    const previousState = undoStack[undoStack.length - 2];

    // Move current state to Redo
    setRedoStack(prev => [activeState, ...prev]);
    // Pop last item from Undo
    setUndoStack(prev => prev.slice(0, prev.length - 1));

    // Restore viewport pixels
    ctx.putImageData(previousState, 0, 0);
  };

  // Handle Redo action
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    playSound(350, 0.05);
    const nextState = redoStack[0];

    // Pop from Redo
    setRedoStack(prev => prev.slice(1));
    // Push to Undo
    setUndoStack(prev => [...prev, nextState]);

    ctx.putImageData(nextState, 0, 0);
  };

  // Clear Canvas entirely
  const handleReset = () => {
    if (!originalImgElement) return;
    if (window.confirm(locale === 'ar' ? "هل تريد التراجع عن جميع التعديلات وإرجاع الصورة لحالتها الأصلية؟" : "Are you sure you want to reset all background removal edits?")) {
      initializeCanvas(originalImgElement);
      setPickedChromaColor(null);
      playSound(250, 0.15);
    }
  };

  const handleUploadAnother = () => {
    setImageSrc(null);
    setOriginalImgElement(null);
    setUndoStack([]);
    setRedoStack([]);
    setBgImageSrc(null);
    setBgType('transparent');
  };

  // Global chroma color keys remover (searches entire image for pixels matching target R,G,B and clears them)
  const erasePickedChromaGlobally = (targetR: number, targetG: number, targetB: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const threshold = tolerance * 2.55; // 0-100 to 0-255

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue; // Skip already erased pixels

      const dist = Math.sqrt(
        (data[i] - targetR) ** 2 +
        (data[i + 1] - targetG) ** 2 +
        (data[i + 2] - targetB) ** 2
      );

      if (dist <= threshold) {
        data[i + 3] = 0; // Alpha transparent
      }
    }

    ctx.putImageData(imgData, 0, 0);
    pushToHistory(imgData);
    playSound(450, 0.12);
  };

  // One-Click Solid Backdrop Eraser (analyzes 4 extreme corners and runs iterative outer-to-inner color removals)
  const performOneClickSolidBackdropRemoval = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Sample the four key corners: (0,0), (w-1, 0), (0, h-1), (w-1, h-1)
    const corners = [
      getPixelIndexColor(data, w, 0, 0),
      getPixelIndexColor(data, w, w - 1, 0),
      getPixelIndexColor(data, w, 0, h - 1),
      getPixelIndexColor(data, w, w - 1, h - 1)
    ].filter(color => color.a > 10); // omit transparent areas

    if (corners.length === 0) return;

    // Use flood fills starting from each of the corners or directly perform an edge-to-inner flood clean.
    // To prevent clipping inner parts of subject when subject contains a matching color,
    // flood-fill starting from all edges (0, y), (w-1, y), (x, 0), (x, h-1) is the absolute industry-standard for smart solid backdrops isolation!
    // Let's implement dynamic Border Flood Fill! It only erases colors continuous with the edges.

    const visited = new Uint8Array(w * h);
    const queue: [number, number][] = [];

    // Initialize queue with all border coordinates
    for (let x = 0; x < w; x++) {
      queue.push([x, 0]);
      queue.push([x, h - 1]);
    }
    for (let y = 1; y < h - 1; y++) {
      queue.push([0, y]);
      queue.push([w - 1, y]);
    }

    // Reference target colors to match against: corners average color
    const avgColor = corners.reduce((acc, c) => ({
      r: acc.r + c.r,
      g: acc.g + c.g,
      b: acc.b + c.b
    }), { r: 0, g: 0, b: 0 });
    avgColor.r = Math.round(avgColor.r / corners.length);
    avgColor.g = Math.round(avgColor.g / corners.length);
    avgColor.b = Math.round(avgColor.b / corners.length);

    const matchTolerance = Math.max(tolerance, 15) * 2.50;

    const isBackgroundLike = (r: number, g: number, b: number, a: number) => {
      if (a < 5) return true;
      const dist = Math.sqrt(
        (r - avgColor.r) ** 2 +
        (g - avgColor.g) ** 2 +
        (b - avgColor.b) ** 2
      );
      return dist <= matchTolerance;
    };

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      if (x < 0 || x >= w || y < 0 || y >= h) continue;

      const idx = y * w + x;
      if (visited[idx]) continue;
      visited[idx] = 1;

      const pIdx = idx * 4;
      if (isBackgroundLike(data[pIdx], data[pIdx + 1], data[pIdx + 2], data[pIdx + 3])) {
        // Clear background
        data[pIdx + 3] = 0;

        // Push neighbors
        if (x + 1 < w && !visited[y * w + (x + 1)]) queue.push([x + 1, y]);
        if (x - 1 >= 0 && !visited[y * w + (x - 1)]) queue.push([x - 1, y]);
        if (y + 1 < h && !visited[(y + 1) * w + x]) queue.push([x, y + 1]);
        if (y - 1 >= 0 && !visited[(y - 1) * w + x]) queue.push([x, y - 1]);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    pushToHistory(imgData);
    playSound(460, 0.18);
    triggerToast(locale === 'ar' ? 'تم عزل الخلفية السادة بذكاء تام!' : 'Solid backdrop isolated successfully!');
  };

  const getPixelIndexColor = (data: Uint8ClampedArray, width: number, x: number, y: number) => {
    const idx = (y * width + x) * 4;
    return {
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2],
      a: data[idx + 3]
    };
  };

  // High performance Queue-based flood fill for local tap "Magic Wand" Tool
  const performMagicWandFloodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Target clicked pixel
    const startIdx = (startY * w + startX) * 4;
    const targetR = data[startIdx];
    const targetG = data[startIdx + 1];
    const targetB = data[startIdx + 2];
    const targetA = data[startIdx + 3];

    // If already transparent, ignore
    if (targetA < 5) return;

    const visited = new Uint8Array(w * h);
    const toleranceDist = tolerance * 2.50; // Map tolerance 0-100 to color span

    // Stack or fast array queue
    const queue: [number, number][] = [[startX, startY]];
    visited[startY * w + startX] = 1;

    const isMatch = (r: number, g: number, b: number, a: number) => {
      if (a < 5 && targetA < 5) return true;
      const d = Math.sqrt(
        (r - targetR) ** 2 +
        (g - targetG) ** 2 +
        (b - targetB) ** 2 +
        (a - targetA) ** 2
      );
      return d <= toleranceDist;
    };

    while (queue.length > 0) {
      const [cx, cy] = queue.pop()!; // Pop provides DFS, which is fast and lightweight in memory
      
      const idx = cy * w + cx;
      const pIdx = idx * 4;

      if (isMatch(data[pIdx], data[pIdx + 1], data[pIdx + 2], data[pIdx + 3])) {
        // Set alpha to 0
        data[pIdx + 3] = 0;

        // Trace standard four cardinal directions
        const dx = [1, -1, 0, 0];
        const dy = [0, 0, 1, -1];

        for (let i = 0; i < 4; i++) {
          const nx = cx + dx[i];
          const ny = cy + dy[i];

          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nIdx = ny * w + nx;
            if (!visited[nIdx]) {
              visited[nIdx] = 1;
              queue.push([nx, ny]);
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    pushToHistory(imgData);
    playSound(420, 0.08);
  };

  // Convert client container pointer to original canvas coordinate metrics correctly accounting for zoom/contain fitting!
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    
    // Scale client coordinate to original canvas pixel space
    // rect width can be scaled due to CSS styles and zoom!
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    return { x, y };
  };

  // Handle click / primary trigger down on canvas
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return; // Only process main left click
    const coords = getCanvasCoords(e);
    if (!coords) return;

    if (activeTool === 'magicWand') {
      performMagicWandFloodFill(coords.x, coords.y);
    } else if (activeTool === 'colorPicker') {
      sampleColorAtPoint(coords.x, coords.y);
    } else if (activeTool === 'eraser' || activeTool === 'restore') {
      isDrawingRef.current = true;
      lastPosRef.current = coords;
      drawBrushStroke(coords.x, coords.y);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    if (!coords) {
      setShowBrushIndicator(false);
      return;
    }

    // Set brush coordinates for visual outline circle over layer
    setBrushPos(coords);
    setShowBrushIndicator(true);

    if (isDrawingRef.current && (activeTool === 'eraser' || activeTool === 'restore')) {
      drawBrushStroke(coords.x, coords.y);
      lastPosRef.current = coords;
    }
  };

  const handleCanvasMouseUpOrLeave = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPosRef.current = null;
      // Paint completed, store state in history
      pushToHistory();
    }
    setShowBrushIndicator(false);
  };

  // Eye dropper sampler tool
  const sampleColorAtPoint = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;

    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    setPickedChromaColor({ r, g, b });
    playSound(400, 0.1);
    setActiveTool('magicWand'); // Auto switch back
  };

  // Paintbrush eraser & restorer stroke renderer
  const drawBrushStroke = (currX: number, currY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImgElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prev = lastPosRef.current || { x: currX, y: currY };

    ctx.save();
    
    // Setting up composition style
    if (activeTool === 'eraser') {
      // Clear path to fully transparent
      ctx.globalCompositeOperation = 'destination-out';
    } else if (activeTool === 'restore') {
      // Draw content back under standard source-over layer, but since we are copying from original image,
      // we utilize custom clipping path on the fly!
      ctx.globalCompositeOperation = 'source-over';
    }

    // Construct the soft feather gradient brush for high precision edge blending
    const radius = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = radius * 2;

    if (brushHardness < 95) {
      // Custom soft brush rendering. We draw a series of overlapping strokes or a gradient
      // To simulate edge softer hardness efficiently inside 2D Canvas context:
      const steps = 6;
      for (let i = steps; i > 0; i--) {
        const factor = i / steps;
        // Map soft stroke segments
        const stepWidth = radius * 2 * (factor + (1 - factor) * (brushHardness / 100));
        ctx.lineWidth = stepWidth;
        // set opacity proportional to brush soft curve
        ctx.globalAlpha = 1 / steps;
        
        ctx.beginPath();
        if (activeTool === 'restore') {
          // Clipping with source buffer to map original image coordinates
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(currX, currY);
          ctx.strokeStyle = '#000000';
          ctx.stroke();
          ctx.clip();
          // Draw original subsegment
          ctx.drawImage(originalImgElement, 0, 0);
          ctx.restore();
        } else {
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(currX, currY);
          ctx.strokeStyle = 'rgba(0,0,0,1)';
          ctx.stroke();
        }
      }
    } else {
      // Sharp crisp hard brush
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(currX, currY);

      if (activeTool === 'restore') {
        ctx.strokeStyle = '#000000';
        // Clip to drawing line
        ctx.save();
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(originalImgElement, 0, 0);
        ctx.restore();
      } else {
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.stroke();
      }
    }

    ctx.restore();
  };

  // Convert the current active isolated canvas with custom backdrop choice and save as transparent/composed full scale PNG file!
  const downloadFinishedImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary composer canvas to bake chosen solid/custom image background if any
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Apply Solid Color backdrop beneath if selected
    if (bgType === 'solid') {
      tempCtx.fillStyle = bgSolidColor;
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    } else if (bgType === 'image' && bgImageSrc) {
      // Compose underlay custom wallpaper stretched/scaled to fill image coordinates
      const bgImg = new Image();
      bgImg.src = bgImageSrc;
      // We process sync if already loaded, to be risk-free we can draw it as image on the fly
      tempCtx.drawImage(bgImg, 0, 0, tempCanvas.width, tempCanvas.height);
    }

    // Overlay our processed isolated element
    tempCtx.drawImage(canvas, 0, 0);

    // Save and download file
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();

    playSound(520, 0.2);
    triggerToast(t.removeSuccess);
  };

  return (
    <div className="w-full px-2 sm:px-4 py-3 sm:py-5 font-sans" id="bg-remover-root">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
        <div className="inline-flex items-center gap-2 bg-[#ff1a40]/10 dark:bg-rose-950/40 text-[#ff1a40] dark:text-rose-400 px-3 py-1 rounded-full text-[11px] sm:text-[12.5px] font-sans font-black tracking-tight mb-2 opacity-95 animate-pulse">
          <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          <span>{locale === 'ar' ? "جديد: معالجة وقص خلفية الصور بالكامل بمتصفحك" : "NEW: Browser-based high-fidelity backdrop isolation"}</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3.5xl font-black text-slate-800 dark:text-white leading-tight tracking-tight mt-1">
          {t.title}
        </h1>
        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-normal max-w-xl mx-auto mt-2 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#ff1a40] text-white font-bold text-[10px] sm:text-xs py-2 px-4 rounded-xl shadow-xl border border-rose-500/35 flex items-center gap-2 animate-fade-in animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Drag-Drop upload region when no image is loaded */}
      {!imageSrc ? (
        <div 
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-12 text-center cursor-pointer transition-all duration-300 max-w-4xl mx-auto ${
            isDragging 
              ? 'border-[#ff1a40] bg-[#ff1a40]/5 dark:bg-rose-950/15 scale-[1.01]' 
              : 'border-slate-300 dark:border-slate-800 hover:border-[#ff1a40] dark:hover:border-rose-900 bg-white dark:bg-slate-950 hover:bg-slate-50/50 dark:hover:bg-slate-900/10'
          }`}
          id="dropzone"
        >
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="bg-[#ff1a40]/5 dark:bg-rose-950/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3.5 text-[#ff1a40]">
            <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-sm sm:text-[15.5px] font-black text-slate-700 dark:text-slate-350">
            {t.dropzoneTitle}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-slate-450 dark:text-slate-500 mt-2">
            {t.dropzoneSubtitle}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 px-3.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium leading-normal border border-slate-200/50 dark:border-slate-850">
            <Info className="w-3.5 h-3.5 text-[#ff1a40] flex-shrink-0" />
            <span>{locale === 'ar' ? "آمن ١٠٠٪ ومحلي بالكامل داخل جهازك ومثالي لمتاجر سلة، زد وشوبيفاي." : "100% Secure, locally on-device. Perfect for e-commerce stores."}</span>
          </div>
        </div>
      ) : (
        /* Isolated workspace */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto items-start">
          
          {/* Tool Control Center */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 lg:col-span-1" id="left-controls">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-2.5">
              <span className="text-[12.5px] font-black text-slate-800 dark:text-white">
                {t.toolsHeader}
              </span>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                ● {locale === 'ar' ? "معالج نشط" : "LIVE PROCESSOR"}
              </span>
            </div>

            {/* Quick clean - Solid Backdrop */}
            <div className="space-y-1.5 pt-1">
              <button 
                onClick={performOneClickSolidBackdropRemoval}
                className="w-full flex items-center justify-center gap-2 bg-[#ff1a40] hover:bg-[#ff1a40]/90 text-white font-black text-[11px] sm:text-[11.5px] py-2.5 px-3 rounded-xl shadow-sm transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.autoBackdropBtn}</span>
              </button>
              <p className="text-[9.5px] text-slate-450 dark:text-slate-500 text-center leading-relaxed">
                {t.autoBackdropDesc}
              </p>
            </div>

            {/* Manual Tools selection tabs */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-900 pt-3">
              {/* Magic Wand flood selector */}
              <button
                onClick={() => {
                  setActiveTool('magicWand');
                  playSound(420, 0.05);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-[11px] sm:text-[11.5px] transition font-bold cursor-pointer ${
                  activeTool === 'magicWand'
                    ? 'border-[#ff1a40] bg-[#ff1a40]/5 text-[#ff1a40]'
                    : 'border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50 text-slate-705 dark:text-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <MousePointerClick className="w-3.5 h-3.5" />
                  <span>{t.magicWandTitle}</span>
                </span>
                <span className="text-[9px] bg-rose-500/15 text-[#ff1a40] px-1.5 py-0.5 rounded font-mono font-black uppercase">WAND</span>
              </button>

              {/* Manual Brush Eraser */}
              <button
                onClick={() => {
                  setActiveTool('eraser');
                  playSound(420, 0.05);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-[11px] sm:text-[11.5px] transition font-bold cursor-pointer ${
                  activeTool === 'eraser'
                    ? 'border-[#ff1a40] bg-[#ff1a40]/5 text-[#ff1a40]'
                    : 'border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50 text-slate-705 dark:text-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Eraser className="w-3.5 h-3.5" />
                  <span>{t.eraserTitle}</span>
                </span>
                <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono font-black uppercase">BRUSH</span>
              </button>

              {/* Manual Brush Restore */}
              <button
                onClick={() => {
                  setActiveTool('restore');
                  playSound(420, 0.05);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-[11px] sm:text-[11.5px] transition font-bold cursor-pointer ${
                  activeTool === 'restore'
                    ? 'border-[#ff1a40] bg-[#ff1a40]/5 text-[#ff1a40]'
                    : 'border-slate-200 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50 text-slate-705 dark:text-slate-300 hover:bg-slate-100/50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Paintbrush className="w-3.5 h-3.5" />
                  <span>{t.restoreTitle}</span>
                </span>
                <span className="text-[9px] bg-teal-500/10 text-teal-600 dark:text-teal-400 px-1.5 py-0.5 rounded font-mono font-black uppercase">RESTORE</span>
              </button>
            </div>

            {/* Slider controls depending on tools */}
            <div className="space-y-3.5 border-t border-slate-100 dark:border-slate-900 pt-3">
              {/* Tolerance adjustment (always visible as is extremely useful for magic wand & chroma keys) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11.5px] font-sans">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{t.toleranceTitle}</span>
                  <span className="text-[#ff1a40] font-mono font-black text-xs">{tolerance}%</span>
                </div>
                <input 
                  type="range"
                  min="3"
                  max="90"
                  value={tolerance}
                  onChange={(e) => setTolerance(parseInt(e.target.value))}
                  className="w-full accent-[#ff1a40] bg-slate-100 dark:bg-slate-900 h-1 rounded-lg cursor-pointer"
                />
              </div>

              {/* Brush Settings display when brush tool is active */}
              {(activeTool === 'eraser' || activeTool === 'restore') && (
                <>
                  {/* Brush Size */}
                  <div className="space-y-1.5 border-t border-slate-105/40 dark:border-slate-900/60 pt-2.5">
                    <div className="flex items-center justify-between text-[11.5px] font-sans">
                      <span className="text-slate-700 dark:text-slate-300 font-bold">{t.brushSizeTitle}</span>
                      <span className="text-[#ff1a40] font-mono font-black text-xs">{brushSize}px</span>
                    </div>
                    <input 
                      type="range"
                      min="5"
                      max="150"
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className="w-full accent-[#ff1a40] bg-slate-100 dark:bg-slate-900 h-1 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Brush Hardness */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11.5px] font-sans">
                      <span className="text-slate-700 dark:text-slate-300 font-bold">{t.brushHardnessTitle}</span>
                      <span className="text-[#ff1a40] font-mono font-black text-xs">{brushHardness}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={brushHardness}
                      onChange={(e) => setBrushHardness(parseInt(e.target.value))}
                      className="w-full accent-[#ff1a40] bg-slate-100 dark:bg-slate-900 h-1 rounded-lg cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Presets and Global color key selector */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-900 pt-3">
              <span className="block text-[11px] font-black text-slate-750 dark:text-slate-300 mb-1.5">
                {t.globalChromaTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => erasePickedChromaGlobally(255, 255, 255)}
                  className="px-2 py-1 text-[9.5px] font-bold rounded bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-250/20 active:scale-95 cursor-pointer"
                >
                  🟢 {locale === 'ar' ? "تفريغ الأبيض" : "Clear White"}
                </button>
                <button 
                  onClick={() => erasePickedChromaGlobally(0, 255, 0)}
                  className="px-2 py-1 text-[9.5px] font-bold rounded bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 active:scale-95 cursor-pointer"
                >
                  🟢 {locale === 'ar' ? "تفريغ الكروما الخضراء" : "Clear Green"}
                </button>
                <button 
                  onClick={() => erasePickedChromaGlobally(0, 0, 0)}
                  className="px-2 py-1 text-[9.5px] font-bold rounded bg-slate-950 text-slate-200 dark:text-white border border-slate-800 active:scale-95 cursor-pointer"
                >
                  🟢 {locale === 'ar' ? "تفريغ الأسود" : "Clear Black"}
                </button>
              </div>

              {/* Eye dropper manual pipette picker */}
              <button
                onClick={() => {
                  setActiveTool('colorPicker');
                  playSound(420, 0.05);
                }}
                className={`w-full flex items-center justify-center gap-1.5 p-2 rounded-xl border text-[10.5px] transition font-bold cursor-pointer mt-1 ${
                  activeTool === 'colorPicker'
                    ? 'border-[#ff1a40] bg-[#ff1a40]/5 text-[#ff1a40]'
                    : 'border-dashed border-slate-300 dark:border-slate-850 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <Pipette className="w-3.5 h-3.5 text-[#ff1a40]" />
                <span>{locale === 'ar' ? "شفاطة سحب لون مخصص من الصورة" : "Pick target color from image"}</span>
              </button>

              {pickedChromaColor && (
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl mt-1 text-[10px] sm:text-[11px] border border-slate-150 dark:border-slate-900">
                  <div 
                    className="w-5 h-5 rounded border border-slate-200" 
                    style={{ backgroundColor: `rgb(${pickedChromaColor.r}, ${pickedChromaColor.g}, ${pickedChromaColor.b})` }}
                  />
                  <div className="flex-1 font-mono text-slate-650 dark:text-slate-350">
                    rgb({pickedChromaColor.r},{pickedChromaColor.g},{pickedChromaColor.b})
                  </div>
                  <button 
                    onClick={() => {
                      erasePickedChromaGlobally(pickedChromaColor.r, pickedChromaColor.g, pickedChromaColor.b);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-1 rounded transition cursor-pointer"
                    title={t.globalChoking}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Compose Backdrops */}
            <div className="space-y-2 border-t border-slate-100 dark:border-slate-900 pt-3">
              <span className="block text-[11px] font-black text-slate-750 dark:text-slate-300 mb-1.5">
                {t.bgPreviewTitle}
              </span>
              
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setBgType('transparent')}
                  className={`py-1.5 text-[9.5px] font-bold rounded border transition-all cursor-pointer ${
                    bgType === 'transparent'
                      ? 'border-[#ff1a40] bg-[#ff1a40]/5 text-[#ff1a40]'
                      : 'border-slate-205 dark:border-slate-9a0 bg-slate-50 text-slate-650 dark:text-slate-400'
                  }`}
                >
                  {locale === 'ar' ? "شفاف" : "Transparent"}
                </button>
                <button
                  onClick={() => setBgType('solid')}
                  className={`py-1.5 text-[9.5px] font-bold rounded border transition-all cursor-pointer ${
                    bgType === 'solid'
                      ? 'border-[#ff1a40] bg-[#ff1a40]/5 text-[#ff1a40]'
                      : 'border-slate-205 dark:border-slate-9a0 bg-slate-50 text-slate-650 dark:text-slate-400'
                  }`}
                >
                  {locale === 'ar' ? "لون مصمت" : "Color"}
                </button>
                <button
                  onClick={handleBgUploadClick}
                  className={`py-1.5 text-[9.5px] font-bold rounded border transition-all cursor-pointer ${
                    bgType === 'image'
                      ? 'border-[#ff1a40] bg-[#ff1a40]/5 text-[#ff1a40]'
                      : 'border-slate-205 dark:border-slate-9a0 bg-slate-50 text-slate-650 dark:text-slate-400'
                  }`}
                >
                  {locale === 'ar' ? "دمج خلفية" : "Composition"}
                </button>
              </div>

              {/* Compose color picker and file choose dialog panel depending on selector */}
              {bgType === 'solid' && (
                <div className="flex items-center gap-1.5 mt-2 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-150 dark:border-slate-900">
                  <Palette className="w-3.5 h-3.5 text-slate-450" />
                  <input 
                    type="color" 
                    value={bgSolidColor}
                    onChange={(e) => setBgSolidColor(e.target.value)}
                    className="w-12 h-6 border-0 p-0 cursor-pointer rounded bg-transparent"
                  />
                  <input 
                    type="text" 
                    value={bgSolidColor}
                    onChange={(e) => setBgSolidColor(e.target.value)}
                    className="flex-1 text-[10px] font-mono text-center bg-transparent border-0 text-slate-700 dark:text-slate-350 focus:ring-0 focus:outline-none"
                  />
                </div>
              )}

              {bgType === 'image' && (
                <div className="space-y-1.5 mt-2">
                  <input 
                    type="file"
                    ref={bgFileInputRef}
                    onChange={handleBgFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {bgImageSrc ? (
                    <div className="relative group max-h-[70px] rounded-lg overflow-hidden border border-slate-200/50">
                      <img src={bgImageSrc} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setBgImageSrc(null)}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded p-0.5 pointer duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <XSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleBgUploadClick}
                      className="w-full text-center py-2 border border-dashed border-slate-300 hover:border-[#ff1a40] text-[9.5px] font-bold rounded-lg text-slate-600 dark:text-slate-400 bg-slate-50 hover:bg-slate-100/50 cursor-pointer"
                    >
                      {t.bgUploadBtn}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-rose-500/5 border border-rose-500/10 dark:border-rose-950/20 rounded-xl p-3 text-[10px] leading-relaxed text-slate-650 dark:text-slate-400">
              <span className="font-bold text-[#ff1a40] block mb-1">ℹ️ {locale === 'ar' ? "تلميح ذكي:" : "Smart Tip:"}</span>
              {locale === 'ar' 
                ? "لإزالة الكتل الكبيرة تفضل باستخدام زر (الإزالة التلقائية)، بينما الممحاة السحرية ممتازة لحذف الفراغات والتجاويف في الثياب والمنتجات."
                : "Automatic isolator performs optimal canvas sweeps. Use the magic wand tool to extract local inner transparency pools within clothing, shadows, or structures."}
            </div>

          </div>

          {/* Interactive Workspace Area */}
          <div className="lg:col-span-3 space-y-4" id="right-workspace">
            {/* Context Header with actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-900 rounded-2xl p-3 sm:px-4 shadow-sm font-sans text-xs">
              
              {/* Back / Reset */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleUploadAnother}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-755 dark:text-slate-300 hover:text-[#ff1a40] border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-xl cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? "اختيار صورة أخرى" : "Process Another File"}</span>
                </button>
                <span className="text-slate-300 dark:text-slate-800 font-normal">|</span>
                <span className="hidden sm:inline text-slate-500 font-mono font-medium max-w-[120px] sm:max-w-[200px] truncate" title={fileName}>
                  {fileName}.png
                </span>
              </div>

              {/* History Undo / Redo */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  disabled={undoStack.length <= 1}
                  className="p-1.5 sm:px-3 sm:py-1.5 flex items-center gap-1 text-[11px] rounded-xl font-bold border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-905 text-slate-700 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title={t.undoBtn}
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.undoBtn}</span>
                </button>
                
                <button
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                  className="p-1.5 sm:px-3 sm:py-1.5 flex items-center gap-1 text-[11px] rounded-xl font-bold border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-905 text-slate-700 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  title={t.redoBtn}
                >
                  <Redo2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.redoBtn}</span>
                </button>

                <span className="text-slate-200 dark:text-slate-850">|</span>

                {/* Reset entire work */}
                <button
                  onClick={handleReset}
                  className="p-1.5 sm:px-3 sm:py-1.5 flex items-center gap-1 text-[11px] font-bold rounded-xl border border-rose-100 dark:border-rose-950 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100/50 cursor-pointer"
                  title={t.resetBtn}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.resetBtn}</span>
                </button>
              </div>

              {/* Zoom controls for high precision editing */}
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.25))}
                  className="p-1.5 border border-slate-200 dark:border-slate-900 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-450 min-w-[40px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button 
                  onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.25))}
                  className="p-1.5 border border-slate-200 dark:border-slate-900 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Interactive Drawing Stage */}
            <div 
              ref={containerRef}
              className="relative w-full rounded-2xl border border-slate-200/60 dark:border-slate-900 bg-slate-100 dark:bg-slate-950 group min-h-[350px] sm:min-h-[500px] flex items-center justify-center overflow-auto shadow-inner select-none"
              style={{
                cursor: activeTool === 'magicWand' 
                          ? 'cell' 
                          : activeTool === 'colorPicker' 
                            ? 'crosshair' 
                            : 'none' // We display custom brush indicator circles!
              }}
              id="drawing-stage-container"
            >
              {/* Backing texture checkerboard overlay for visual transp transparency */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-80"
                style={{
                  backgroundImage: bgType === 'transparent' ? 'radial-gradient(#dfdfdf 20%, transparent 20%), radial-gradient(#dfdfdf 20%, #ffffff 20%)' : 'none',
                  backgroundPosition: '0 0, 10px 10px',
                  backgroundSize: '20px 20px',
                  backgroundColor: bgType === 'solid' ? bgSolidColor : 'transparent'
                }}
              />

              {/* Composition Background wallpaper if selected */}
              {bgType === 'image' && bgImageSrc && (
                <div 
                  className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center transition-all duration-300"
                  style={{ backgroundImage: `url(${bgImageSrc})` }}
                />
              )}

              {/* Cursor preview overlay for manually painting lines */}
              {showBrushIndicator && (activeTool === 'eraser' || activeTool === 'restore') && (
                <div 
                  className="absolute pointer-events-none border-2 border-[#ff1a40] rounded-full z-30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-lg"
                  style={{
                    left: `${(brushPos.x / (canvasRef.current?.width || 1)) * 100}%`,
                    top: `${(brushPos.y / (canvasRef.current?.height || 1)) * 100}%`,
                    width: `${brushSize * 2 * (canvasRef.current?.clientWidth || 1) / (canvasRef.current?.width || 1)}px`,
                    height: `${brushSize * 2 * (canvasRef.current?.clientHeight || 1) / (canvasRef.current?.height || 1)}px`,
                    backgroundColor: activeTool === 'restore' ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)',
                    borderColor: activeTool === 'restore' ? '#22c55e' : '#ff1a40'
                  }}
                />
              )}

              {/* The active drawing canvas containing actual image pixel buffer */}
              <canvas
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUpOrLeave}
                onMouseLeave={handleCanvasMouseUpOrLeave}
                className="rounded-lg shadow-md z-10 max-w-full max-h-[75vh] object-contain transition-transform duration-100 ease-out origin-center"
                style={{
                  transform: `scale(${zoomLevel})`
                }}
              />
            </div>

            {/* Downward Download Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
              {/* Instructions badge */}
              <div className="flex items-center gap-1 py-1.5 text-[10.5px] text-slate-500 font-sans">
                <Info className="w-3.5 h-3.5 text-[#ff1a40]" />
                <span>⭐ {locale === 'ar' ? "تنويه: تتم معالجة وتفريغ كافة البكسلات محلياً لحماية خصوصية بياناتك." : "Notice: Extraction pipeline performs local sweeps to guarantee complete data isolation."}</span>
              </div>

              <button
                onClick={downloadFinishedImage}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-[13px] px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t.downloadBtn}</span>
              </button>
            </div>

            {/* Informational Help Sheet */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-205/30 dark:border-slate-850 rounded-2xl p-4 sm:p-5 font-sans mt-2">
              <h3 className="text-xs sm:text-[13px] font-black text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
                <Sliders className="w-4 h-4 text-[#ff1a40]" />
                <span>{t.howToUseTitle}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-[10.5px] sm:text-[11.5px] leading-relaxed text-slate-655 dark:text-slate-400">
                <p>{t.step1}</p>
                <p>{t.step2}</p>
                <p>{t.step3}</p>
                <p>{t.step4}</p>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
