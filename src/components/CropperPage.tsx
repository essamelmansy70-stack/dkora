import { useState, useEffect, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  Upload, 
  Download, 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  Crop, 
  Sparkles, 
  RefreshCw, 
  FileCode, 
  Trash2, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface CropperPageProps {
  locale: 'ar' | 'en';
}

const cropperTranslations = {
  ar: {
    title: "أداة قص وتعديل أبعاد الصور الاحترافية",
    subtitle: "قص وتصغير أبعاد صورك بدقة بكسل متناهية ومحلياً بالكامل بمتصفحك دون رفعها لأي سيرفر",
    metaTitle: "أداة dkora | قص وتعديل مقاسات وأبعاد الصور مجاناً وبأمان 100٪",
    metaDesc: "أسرع أداة مجانية لقص الصور وتعديل أبعادها لمتجر سلة أو زد أو شوبيفاي مع الحفاظ على دقة الجودة محلياً وآمنة تماماً داخل متصفحك.",
    dropzoneTitle: "اسحب صورتك هنا أو اضغط للاختيار والتعديل",
    dropzoneSubtitle: "يدعم PNG، JPG، JPEG، WebP، BMP (بحد أقصى 30MB - أمانك في جهازك)",
    aspectRatioTitle: "نسبة أبعاد القص (Aspect Ratio)",
    aspectFree: "قص حر",
    aspectSquare: "1:1 مربع (سوشيال/سلة)",
    aspectClassic: "4:3 كلاسيكي",
    aspectWide: "16:9 شاشة عريضة",
    aspectStory: "9:16 ستوري / تيك توك",
    aspectPortrait: "2:3 بورتريه",
    dimensionsTitle: "التحكم في بكسلات منطقة القص والتحميل",
    widthLabel: "العرض (بكسل)",
    heightLabel: "الارتفاع (بكسل)",
    applyDimensions: "تطبيق الأبعاد الحالية على صندوق القص",
    formatLabel: "صيغة وجودة تحميل الملف المقصوص",
    downloadBtn: "تحميل الصورة المقصوصة فوراً",
    resetBtn: "إعادة الضبط",
    rotateLeft: "تدوير لليسار",
    rotateRight: "تدوير لليمين",
    flipH: "عكس أفقي",
    flipV: "عكس رأسي",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    cropSuccess: "تم قص الصورة وتنزيلها بجودة فائقة! 🎉",
    dimensionsNotValid: "رجاءً أدخل أبعاد بكسل صحيحة أكبر من الصفر.",
    integrationHeader: "دمج أداة قص الصور في موقعك أو مدونتك بملف واحد",
    integrationDesc: "بناءً على طلبك، صممنا كود الأداة كاملاً بملف برمجى واحد مستقل كلياً (HTML, CSS, JS) يعمل عبر الـ CDN وبدون حاجة لأي سيرفر خلفي. انسخ الكود أو حمله كملف HTML منفصل لتشغيله أو دمجه في أي موقع فوراً بضغطة زر!",
    copyCodeBtn: "نسخ الكود البرمجي بالكامل",
    downloadHTMLBtn: "تحميل الأداة كملف مستقل (HTML)",
    copiedSuccess: "تم نسخ الكود بنجاح إلى الحافظة! 📋",
    currentCropBox: "بكسلات الصندوق الحالية المتفاعلة"
  },
  en: {
    title: "Professional Image Cropper & Resizer Tool",
    subtitle: "Crop, resize, and fine-tune your images with pixel-perfect accuracy locally in your browser",
    metaTitle: "dkora Tool | Free Online Browser-Based Image Cropper & Aspect Resizer",
    metaDesc: "The fastest free tool to crop and resize your images for Salla, Zid, or Shopify while maintaining crisp resolution, 100% locally and safely in your browser.",
    dropzoneTitle: "Drag your image here or click to select and edit",
    dropzoneSubtitle: "Supports PNG, JPG, JPEG, WebP, BMP (Max 30MB - Your Security is on Your Device)",
    aspectRatioTitle: "Aspect Ratio",
    aspectFree: "Free Crop",
    aspectSquare: "1:1 Square (Social/Commerce)",
    aspectClassic: "4:3 Classic",
    aspectWide: "16:9 Widescreen",
    aspectStory: "9:16 Story / TikTok",
    aspectPortrait: "2:3 Portrait",
    dimensionsTitle: "Crop Layout & Export Pixels",
    widthLabel: "Width (px)",
    heightLabel: "Height (px)",
    applyDimensions: "Apply Scale to Crop Box",
    formatLabel: "Download Format & Export Quality",
    downloadBtn: "Download Cropped Image",
    resetBtn: "Reset Cropper",
    rotateLeft: "Rotate Left",
    rotateRight: "Rotate Right",
    flipH: "Flip Horizontal",
    flipV: "Flip Vertical",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    cropSuccess: "Image cropped and downloaded successfully! 🎉",
    dimensionsNotValid: "Please enter valid pixel dimensions greater than zero.",
    integrationHeader: "Embed Image Cropper on Your Website (Single File)",
    integrationDesc: "As requested, we have packed the entire tool into a single standalone HTML code file (HTML, CSS, JS) powered by official CDNs. Copy the code or download the file to host it on your site or run it offline immediately!",
    copyCodeBtn: "Copy Complete Standalone Code",
    downloadHTMLBtn: "Download Standalone HTML File",
    copiedSuccess: "Code copied to clipboard successfully! 📋",
    currentCropBox: "Active Selection Pixels"
  }
};

export default function CropperPage({ locale }: CropperPageProps) {
  const t = cropperTranslations[locale];
  const isRtl = locale === 'ar';

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('cropped-image');
  const [fileExtension, setFileExtension] = useState<'png' | 'jpeg'>('png');
  const [selectedAspect, setSelectedAspect] = useState<string>('free');

  // Input states for width/height
  const [customWidth, setCustomWidth] = useState<string>('');
  const [customHeight, setCustomHeight] = useState<string>('');
  
  // Active selection box metrics updated during live 'crop' event
  const [activeWidth, setActiveWidth] = useState<number>(0);
  const [activeHeight, setActiveHeight] = useState<number>(0);

  // UI status metrics
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copying, setCopying] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // References
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sound cue helper
  const playSound = (freq = 520, duration = 0.08) => {
    try {
      if (typeof window !== 'undefined' && ('AudioContext' in window || 'webkitAudioContext' in window)) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }
    } catch {
      // Ignored gracefully
    }
  };

  // Toast notifier
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Destroy previous cropper when switching image sources or selected aspects
  const initCropper = () => {
    if (!imageRef.current) return;

    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }

    let aspect = NaN;
    if (selectedAspect === '1/1') aspect = 1;
    else if (selectedAspect === '16/9') aspect = 16 / 9;
    else if (selectedAspect === '4/3') aspect = 4 / 3;
    else if (selectedAspect === '9/16') aspect = 9 / 16;
    else if (selectedAspect === '2/3') aspect = 2 / 3;

    const cropper = new Cropper(imageRef.current, {
      aspectRatio: aspect,
      viewMode: 1, // Keep the crop box within the visual boundaries of the canvas
      dragMode: 'move',
      autoCropArea: 0.8,
      responsive: true,
      restore: false,
      guides: true,
      center: true,
      highlight: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: true,
      crop(event) {
        const { width, height } = event.detail;
        const roundedW = Math.round(width);
        const roundedH = Math.round(height);
        setActiveWidth(roundedW);
        setActiveHeight(roundedH);
        
        // Populate inputs with live cropBox size so the user knows exactly what dimensions are active
        setCustomWidth(roundedW.toString());
        setCustomHeight(roundedH.toString());
      }
    } as any);

    cropperRef.current = cropper;
  };

  // Re-initialize only when selected aspects or image source updates
  useEffect(() => {
    if (imageSrc) {
      initCropper();
    }
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
    };
  }, [imageSrc, selectedAspect]);

  // Handle image upload files
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const dotIdx = file.name.lastIndexOf('.');
      const cleanName = dotIdx !== -1 ? file.name.substring(0, dotIdx) : 'image';
      setFileName(cleanName + '_cropped');
      reader.onload = () => {
        setImageSrc(reader.result as string);
        playSound(450, 0.1);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dropzone file drag listeners
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
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      const dotIdx = file.name.lastIndexOf('.');
      const cleanName = dotIdx !== -1 ? file.name.substring(0, dotIdx) : 'image';
      setFileName(cleanName + '_cropped');
      reader.onload = () => {
        setImageSrc(reader.result as string);
        playSound(450, 0.1);
      };
      reader.readAsDataURL(file);
    }
  };

  // Toolbar Actions
  const handleRotate = (deg: number) => {
    if (cropperRef.current) {
      cropperRef.current.rotate(deg);
      playSound(500, 0.05);
    }
  };

  const handleScaleX = () => {
    if (cropperRef.current) {
      const data = cropperRef.current.getData();
      cropperRef.current.scaleX(-data.scaleX || -1);
      playSound(500, 0.05);
    }
  };

  const handleScaleY = () => {
    if (cropperRef.current) {
      const data = cropperRef.current.getData();
      cropperRef.current.scaleY(-data.scaleY || -1);
      playSound(500, 0.05);
    }
  };

  const handleZoom = (val: number) => {
    if (cropperRef.current) {
      cropperRef.current.zoom(val);
      playSound(480, 0.05);
    }
  };

  const handleReset = () => {
    if (cropperRef.current) {
      cropperRef.current.reset();
      playSound(350, 0.08);
    }
  };

  // Apply custom width/height directly to correct cropbox selection size
  const applyCustomBoxDimensions = () => {
    if (!cropperRef.current) return;
    const w = parseInt(customWidth, 10);
    const h = parseInt(customHeight, 10);
    
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      showToast(t.dimensionsNotValid);
      playSound(280, 0.15);
      return;
    }

    cropperRef.current.setData({
      width: w,
      height: h
    });
    playSound(600, 0.08);
  };

  // Handle Download process
  const downloadCroppedImage = () => {
    if (!cropperRef.current) return;

    const w = parseInt(customWidth, 10);
    const h = parseInt(customHeight, 10);

    // Get the cropped canvas (support custom scale/resolution matching the desired user input dimensions)
    const options: any = {};
    if (!isNaN(w) && w > 0 && !isNaN(h) && h > 0) {
      options.width = w;
      options.height = h;
    }

    const canvas = cropperRef.current.getCroppedCanvas(options);
    if (!canvas) return;

    const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
    const finalQuality = fileExtension === 'jpeg' ? 0.92 : undefined;

    canvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${fileExtension}`;
        link.click();
        playSound(700, 0.12);
        showToast(t.cropSuccess);
      }
    }, mimeType, finalQuality);
  };

  const clearImage = () => {
    setImageSrc(null);
    setFileName('cropped-image');
    setSelectedAspect('free');
    playSound(300, 0.1);
  };

  // The ultimate single file integration source code representing the user's specific single-file integration request!
  const getSingleCodeString = () => {
    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>أداة dkora لقص وتعديل حجم الصور بملف واحد</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Cropper.js CDN Dependency -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Space+Grotesk:wght@400;700&display=swap');
        body { font-family: 'Cairo', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-10 transition-colors duration-300">
    <div class="max-w-5xl mx-auto px-4">
        
        <div class="text-center mb-8">
            <span class="px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-full inline-block mb-3">
                أداة ويب محلية ومستقلة 100٪ 🚀
            </span>
            <h1 class="text-3xl font-black text-rose-600 dark:text-rose-500 mb-2">أداة dkora لقص وتعديل أبعاد الصور</h1>
            <p class="text-xs text-slate-600 dark:text-slate-300">أسرع أداة مجانية لمعالجة كتالوج الصور وتغيير أبعاد القص بكسل-بكسل محلياً بالكامل</p>
        </div>

        <!-- Upload Container -->
        <div id="dropzone" class="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-10 text-center cursor-pointer hover:border-rose-500 hover:bg-rose-50/10 dark:hover:bg-rose-950/10 transition-all duration-300 shadow-xl select-none">
            <input type="file" id="fileInput" accept="image/*" class="hidden">
            <div class="flex flex-col items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-rose-500/10 dark:bg-rose-950/50 flex items-center justify-center text-[#ff1a40] mb-2 shadow-inner">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="text-md font-bold text-slate-800 dark:text-slate-200">اسحب صورتك هنا أو اضغط للاختيار والتعديل</h3>
                <p class="text-xs text-slate-500 dark:text-slate-500">تمتع بالخصوصية الكاملة - صورك تعالج محلياً ولا يتم رفعها لأي سيرفر</p>
            </div>
        </div>

        <!-- Editor Workspace (Hidden till upload happens) -->
        <div id="workspace" class="hidden grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
            <!-- Cropper Canvas Grid (8 Columns) -->
            <div class="lg:col-span-8 space-y-4">
                <div class="bg-black/95 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative h-[450px] flex items-center justify-center">
                    <img id="cropperImage" class="max-w-full max-h-[430px] hidden" alt="Work Arena">
                </div>
                
                <!-- Cropper Micro Tools Toolbar -->
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-3 shadow-md">
                    <button onclick="cropper.rotate(-90)" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg transition-all">↩️ تدوير لليسار</button>
                    <button onclick="cropper.rotate(90)" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg transition-all">↪️ تدوير لليمين</button>
                    <button onclick="flipHorizontal()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg transition-all">↔️ عكس أفقي</button>
                    <button onclick="flipVertical()" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg transition-all">↕️ عكس رأسي</button>
                    <button onclick="cropper.zoom(0.1)" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg transition-all">➕ تكبير</button>
                    <button onclick="cropper.zoom(-0.1)" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg transition-all">➖ تصغير</button>
                    <button onclick="cropper.reset()" class="px-3 py-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-[#ff1a40] hover:text-white dark:hover:bg-rose-900 text-xs font-bold rounded-lg transition-all">🔄 إعادة الضبط</button>
                    <button onclick="clearImage()" class="px-3 py-1.5 bg-slate-100 hover:bg-rose-600 hover:text-white dark:bg-slate-800 dark:hover:bg-rose-900 text-xs font-bold rounded-lg transition-all">🗑️ تغيير الصورة</button>
                </div>
            </div>

            <!-- Settings Sidebar Grid (4 Columns) -->
            <div class="lg:col-span-4 space-y-6">
                <!-- Preset Aspect Ratio Panel -->
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <h3 class="text-sm font-black border-b border-slate-100 dark:border-slate-850 pb-2">🎯 نسبة أبعاد القص (Aspect Ratio)</h3>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <button onclick="setAspect('free')" class="aspect-btn bg-rose-500 text-white font-bold p-2.5 rounded-xl border border-slate-150 transition-all text-center">حر</button>
                        <button onclick="setAspect('1/1')" class="aspect-btn bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold p-2.5 rounded-xl border border-slate-150 transition-all text-center">1:1 مربع</button>
                        <button onclick="setAspect('16/9')" class="aspect-btn bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold p-2.5 rounded-xl border border-slate-150 transition-all text-center">16:9 شاشة عريضة</button>
                        <button onclick="setAspect('4/3')" class="aspect-btn bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold p-2.5 rounded-xl border border-slate-150 transition-all text-center">4:3 كلاسيك</button>
                        <button onclick="setAspect('9/16')" class="aspect-btn bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold p-2.5 rounded-xl border border-slate-150 transition-all text-center">9:16 طولي</button>
                        <button onclick="setAspect('2/3')" class="aspect-btn bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold p-2.5 rounded-xl border border-slate-150 transition-all text-center">2:3 بورتريه</button>
                    </div>
                </div>

                <!-- Custom Scale Inputs Panel -->
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <h3 class="text-sm font-black border-b border-slate-100 dark:border-slate-850 pb-2">⚙️ أبعاد صندوق التصدير (بكسل)</h3>
                    <div class="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <label class="block mb-1 opacity-70">العرض (px)</label>
                            <input type="number" id="inpWidth" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold focus:outline-[#ff1a40]">
                        </div>
                        <div>
                            <label class="block mb-1 opacity-70">الارتفاع (px)</label>
                            <input type="number" id="inpHeight" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 font-bold focus:outline-[#ff1a40]">
                        </div>
                    </div>
                    <button onclick="applyScale()" class="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-black text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition">
                        تطبيق تعديل مقاس منطقة القص
                    </button>
                </div>

                <!-- Extensions Selection and Save Trigger -->
                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <h3 class="text-sm font-black border-b border-slate-100 dark:border-slate-850 pb-2">💾 صيغة الملف والتنزيل</h3>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <button onclick="setExtension('png')" id="btnFormatPng" class="p-2.5 rounded-xl border font-bold text-center border-rose-500 bg-rose-500 text-white transition-all">PNG صيغة</button>
                        <button onclick="setExtension('jpg')" id="btnFormatJpg" class="p-2.5 rounded-xl border font-bold text-center border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-150 dark:hover:bg-slate-700 transition-all">JPEG صيغة</button>
                    </div>

                    <button onclick="downloadImage()" class="w-full bg-[#ff1a40] hover:bg-[#e01032] text-white font-black text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2.5 cursor-pointer shadow-xl transition">
                        💾 تحميل الملف المقصوص فورا
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Core Javascript Code -->
    <script>
        let cropper = null;
        let selectedExt = 'png';
        const fileInput = document.getElementById('fileInput');
        const dropzone = document.getElementById('dropzone');
        const workspace = document.getElementById('workspace');
        const cropperImg = document.getElementById('cropperImage');
        const inpWidth = document.getElementById('inpWidth');
        const inpHeight = document.getElementById('inpHeight');

        // Drag & Drop
        dropzone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => loadFile(e.target.files[0]));
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = '#ff1a40'; });
        dropzone.addEventListener('dragleave', () => dropzone.style.borderColor = '');
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.style.borderColor = '';
            loadFile(e.dataTransfer.files[0]);
        });

        function loadFile(file) {
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                cropperImg.src = evt.target.result;
                cropperImg.classList.remove('hidden');
                dropzone.classList.add('hidden');
                workspace.classList.remove('hidden');
                
                if (cropper) cropper.destroy();

                cropper = new Cropper(cropperImg, {
                    aspectRatio: NaN,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 0.8,
                    crop(e) {
                        inpWidth.value = Math.round(e.detail.width);
                        inpHeight.value = Math.round(e.detail.height);
                    }
                });
            }
            reader.readAsDataURL(file);
        }

        function setAspect(type) {
            if (!cropper) return;
            
            // Highlight aspects UI
            const btns = document.querySelectorAll('.aspect-btn');
            btns.forEach(b => {
                b.classList.remove('bg-rose-500', 'text-white');
                b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'hover:bg-slate-200');
            });
            event.target.classList.add('bg-rose-500', 'text-white');
            event.target.classList.remove('bg-slate-100', 'dark:bg-slate-800');

            let ratio = NaN;
            if (type === '1/1') ratio = 1;
            else if (type === '16/9') ratio = 16 / 9;
            else if (type === '4/3') ratio = 4 / 3;
            else if (type === '9/16') ratio = 9 / 16;
            else if (type === '2/3') ratio = 2 / 3;

            cropper.setAspectRatio(ratio);
        }

        function flipHorizontal() {
            if (!cropper) return;
            const data = cropper.getData();
            cropper.scaleX(-data.scaleX || -1);
        }

        function flipVertical() {
            if (!cropper) return;
            const data = cropper.getData();
            cropper.scaleY(-data.scaleY || -1);
        }

        function applyScale() {
            if (!cropper) return;
            const w = parseInt(inpWidth.value, 10);
            const h = parseInt(inpHeight.value, 10);
            if (!isNaN(w) && w > 0 && !isNaN(h) && h > 0) {
                cropper.setData({ width: w, height: h });
            }
        }

        function setExtension(ext) {
            selectedExt = ext;
            const p = document.getElementById('btnFormatPng');
            const j = document.getElementById('btnFormatJpg');
            if (ext === 'png') {
                p.className = "p-2.5 rounded-xl border font-bold text-center border-rose-500 bg-rose-500 text-white transition-all";
                j.className = "p-2.5 rounded-xl border font-bold text-center border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-150 transition-all";
            } else {
                j.className = "p-2.5 rounded-xl border font-bold text-center border-rose-500 bg-rose-500 text-white transition-all";
                p.className = "p-2.5 rounded-xl border font-bold text-center border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-150 transition-all";
            }
        }

        function downloadImage() {
            if (!cropper) return;
            const w = parseInt(inpWidth.value, 10);
            const h = parseInt(inpHeight.value, 10);
            const opts = {};
            if (!isNaN(w) && w > 0 && !isNaN(h) && h > 0) {
                opts.width = w;
                opts.height = h;
            }
            const canvas = cropper.getCroppedCanvas(opts);
            const type = selectedExt === 'png' ? 'image/png' : 'image/jpeg';
            const quality = selectedExt === 'jpg' ? 0.92 : undefined;
            
            canvas.toBlob((blob) => {
                if (blob) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = "cropped-dkora." + selectedExt;
                    link.click();
                }
            }, type, quality);
        }

        function clearImage() {
            if (cropper) {
                cropper.destroy();
                cropper = null;
            }
            cropperImg.src = '';
            cropperImg.classList.add('hidden');
            workspace.classList.add('hidden');
            dropzone.classList.remove('hidden');
            fileInput.value = '';
        }
    </script>
</body>
</html>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getSingleCodeString());
    playSound(650, 0.08);
    setCopying(true);
    showToast(t.copiedSuccess);
    setTimeout(() => setCopying(false), 2000);
  };

  const downloadHTMLFile = () => {
    const code = getSingleCodeString();
    const blob = new Blob([code], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dkora-image-cropper.html';
    link.click();
    playSound(720, 0.12);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Toast Notice alerts */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 border border-slate-800 text-white text-xs font-bold px-4.5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-slide-up">
          <Check className="w-4 h-4 text-[#ff1a40] animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Splash Bar */}
      <div className="text-center space-y-4 animate-fade-in text-slate-900 dark:text-white relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-[#ff1a40] text-[11px] font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5 animate-spin text-[#ff1a40]" />
          <span>{isRtl ? 'ضاغط ومحرر مستقل - دقة بكسل مثالية' : 'Independent Image Editor - Perfect Pixel Precision'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
          {t.title}
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Drag Drop or active Cropper Arena */}
      {!imageSrc ? (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          id="crop-dropzone"
          className={`bg-white dark:bg-slate-900 border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 shadow-lg select-none group min-h-[300px] flex flex-col items-center justify-center gap-4 ${
            isDragging 
              ? 'border-[#ff1a40] bg-rose-50/10' 
              : 'border-slate-200 dark:border-slate-800 hover:border-[#ff1a40] hover:bg-slate-50 dark:hover:bg-slate-850'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="w-16 h-16 rounded-full bg-rose-500/10 dark:bg-rose-950/50 text-[#ff1a40] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-inner">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mb-1">
              {t.dropzoneTitle}
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-500">
              {t.dropzoneSubtitle}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in relative z-10" id="cropper-arena">
          
          {/* Main Workspace Frame (8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-black/95 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl relative h-[450px] sm:h-[500px] flex items-center justify-center">
              <img 
                ref={imageRef} 
                src={imageSrc} 
                alt="Workspace Crop" 
                className="max-w-full max-h-[440px] sm:max-h-[480px] select-none block" 
              />
            </div>
            
            {/* Interactive crop toolbar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => handleRotate(-90)} 
                  className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-150 dark:border-slate-800"
                  title={t.rotateLeft}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#ff1a40]" />
                  <span className="hidden sm:inline">{t.rotateLeft}</span>
                </button>
                <button 
                  onClick={() => handleRotate(90)} 
                  className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-150 dark:border-slate-800"
                  title={t.rotateRight}
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#ff1a40]" />
                  <span className="hidden sm:inline">{t.rotateRight}</span>
                </button>
                <button 
                  onClick={handleScaleX} 
                  className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-150 dark:border-slate-800"
                  title={t.flipH}
                >
                  <FlipHorizontal className="w-3.5 h-3.5 text-[#ff1a40]" />
                  <span className="hidden sm:inline">{t.flipH}</span>
                </button>
                <button 
                  onClick={handleScaleY} 
                  className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-150 dark:border-slate-800"
                  title={t.flipV}
                >
                  <FlipVertical className="w-3.5 h-3.5 text-[#ff1a40]" />
                  <span className="hidden sm:inline">{t.flipV}</span>
                </button>
                <button 
                  onClick={() => handleZoom(0.12)} 
                  className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-150 dark:border-slate-800"
                  title={t.zoomIn}
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#ff1a40]" />
                  <span className="hidden sm:inline">{t.zoomIn}</span>
                </button>
                <button 
                  onClick={() => handleZoom(-0.12)} 
                  className="p-2 sm:px-3 sm:py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-slate-150 dark:border-slate-800"
                  title={t.zoomOut}
                >
                  <ZoomOut className="w-3.5 h-3.5 text-[#ff1a40]" />
                  <span className="hidden sm:inline">{t.zoomOut}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleReset} 
                  className="px-3.5 py-2 text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-black rounded-lg transition-all cursor-pointer border border-[#ff1a40]/30"
                >
                  {t.resetBtn}
                </button>
                <button 
                  onClick={clearImage} 
                  className="px-3.5 py-2 text-slate-700 hover:text-white hover:bg-rose-600 dark:text-slate-350 bg-slate-100 dark:bg-slate-800 dark:hover:bg-[#ff1a40] text-xs font-black rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                  {isRtl ? 'تغيير الصورة' : 'Change Image'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar controls (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Aspect Ratio Box Preset */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-850">
                <Sliders className="w-4 h-4 text-[#ff1a40]" />
                {t.aspectRatioTitle}
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'free', label: t.aspectFree },
                  { value: '1/1', label: t.aspectSquare },
                  { value: '16/9', label: t.aspectWide },
                  { value: '4/3', label: t.aspectClassic },
                  { value: '9/16', label: t.aspectStory },
                  { value: '2/3', label: t.aspectPortrait }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => { setSelectedAspect(item.value); playSound(480, 0.05); }}
                    className={`p-2.5 text-xxs sm:text-xs font-black rounded-xl border transition-all text-center cursor-pointer ${
                      selectedAspect === item.value
                        ? 'border-[#ff1a40] bg-[#ff1a40] text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Scale Input pixels */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-850">
                <h3 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-2">
                  <Crop className="w-4 h-4 text-[#ff1a40]" />
                  {t.dimensionsTitle}
                </h3>
                <span className="px-1.5 py-0.5 bg-rose-50 dark:bg-rose-950/30 text-[9px] font-bold rounded-md text-rose-600 dark:text-rose-400">
                  {t.currentCropBox}: {activeWidth}×{activeHeight} px
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block mb-1 opacity-75 font-semibold text-slate-700 dark:text-slate-300">{t.widthLabel}</label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-850 dark:text-slate-200 rounded-xl p-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-[#ff1a40] text-center"
                  />
                </div>
                <div>
                  <label className="block mb-1 opacity-75 font-semibold text-slate-700 dark:text-slate-300">{t.heightLabel}</label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-850 dark:text-slate-200 rounded-xl p-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-[#ff1a40] text-center"
                  />
                </div>
              </div>

              <button
                onClick={applyCustomBoxDimensions}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-extrabold text-xxs sm:text-xs rounded-xl border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              >
                {t.applyDimensions}
              </button>
            </div>

            {/* Custom Format Selection and Download trigger */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-850">
                <ImageIcon className="w-4 h-4 text-[#ff1a40]" />
                {t.formatLabel}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => { setFileExtension('png'); playSound(420, 0.05); }}
                  className={`p-2.5 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    fileExtension === 'png'
                      ? 'border-[#ff1a40] bg-rose-500/10 text-[#ff1a40] shadow-sm font-extrabold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  PNG صيغة
                </button>
                <button
                  onClick={() => { setFileExtension('jpeg'); playSound(420, 0.05); }}
                  className={`p-2.5 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                    fileExtension === 'jpeg'
                      ? 'border-[#ff1a40] bg-rose-500/10 text-[#ff1a40] shadow-sm font-extrabold'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  JPEG صيغة
                </button>
              </div>

              <button
                onClick={downloadCroppedImage}
                className="w-full bg-[#ff1a40] hover:bg-[#e01032] text-white font-black text-xs py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2.5 cursor-pointer shadow-xl transition-all hover:scale-[1.01]"
              >
                <Download className="w-4 h-4" />
                {t.downloadBtn}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Integration CDN HTML Single File box (Exactly meeting user request!) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl mt-12 space-y-6 animate-fade-in relative z-10 select-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-850 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2.5">
              <FileCode className="w-5.5 h-5.5 text-[#ff1a40]" />
              {t.integrationHeader}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-350 leading-relaxed md:w-11/12">
              {t.integrationDesc}
            </p>
          </div>
          <button
            onClick={downloadHTMLFile}
            className="px-4.5 py-3.5 bg-[#ff1a40] hover:bg-[#e01032] text-white font-black text-xs rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg transition duration-200 select-none"
          >
            <Download className="w-4 h-4" />
            {t.downloadHTMLBtn}
          </button>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-slate-900 dark:bg-slate-950 border border-slate-950 p-4 h-[250px] overflow-y-auto">
          {/* Absolute floating floating absolute Copy Code Button */}
          <button
            onClick={handleCopyCode}
            className="absolute top-4 right-4 z-25 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold p-2 rounded-xl flex items-center gap-1.5 text-xxs transition cursor-pointer"
          >
            {copying ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
            <span>{copying ? 'Copied' : t.copyCodeBtn}</span>
          </button>

          <pre className="text-left font-mono text-[10.5px] text-teal-400 dark:text-teal-300 leading-relaxed block overflow-x-auto whitespace-pre select-all pr-12 pt-6">
            <code>
              {getSingleCodeString()}
            </code>
          </pre>
        </div>
      </div>

    </div>
  );
}
