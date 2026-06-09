import { useState, useEffect, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  Upload, 
  Download, 
  SlidersHorizontal, 
  Info, 
  Sparkles, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Settings,
  Sliders,
  Maximize2
} from 'lucide-react';
import { TranslationType } from '../translations';

interface SvgConverterPageProps {
  locale: 'ar' | 'en';
  t: TranslationType;
}

export default function SvgConverterPage({ locale, t }: SvgConverterPageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image.png');
  const [fileSize, setFileSize] = useState<number>(0);
  
  // Library load state
  const [libLoaded, setLibLoaded] = useState<boolean>(false);
  const [libError, setLibError] = useState<string | null>(null);
  
  // Tracing states & progress
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [svgBlobUrl, setSvgBlobUrl] = useState<string | null>(null);
  const [pathsCount, setPathsCount] = useState<number>(0);
  const [processedSize, setProcessedSize] = useState<string>('0 KB');
  const [executionTime, setExecutionTime] = useState<number>(0);

  // Settings
  const [colorsCount, setColorsCount] = useState<number>(16);
  const [blurRadius, setBlurRadius] = useState<number>(0); // Pre-smoothing blur
  const [precision, setPrecision] = useState<number>(1); // Tracing filter tolerance (qtres)
  const [omitThreshold, setOmitThreshold] = useState<number>(8); // Contours with area under this omitted
  const [strokewidth, setStrokewidth] = useState<number>(1);
  const [useLt80, setUseLt80] = useState<boolean>(true);

  // Drag and drop states
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Sound feedback
  const playSoundEffect = (freq = 500, duration = 0.08) => {
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
    } catch (e) {
      // Ignored gracefully
    }
  };

  // Load ImageTracerJS dynamically
  useEffect(() => {
    const scriptId = 'imagetracerjs-cdn';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const handleLoadSucess = () => {
      if ((window as any).ImageTracer) {
        setLibLoaded(true);
      } else {
        setLibError('ImageTracer object not found after CDN script load.');
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/npm/imagetracerjs@1.2.6/imagetracer_v1.2.6.js';
      script.async = true;
      script.onload = handleLoadSucess;
      script.onerror = () => {
        setLibError(locale === 'ar' 
          ? 'فشل تحميل مكتبة المعالجة المحلية من الشبكة. الرجاء التحقق من اتصال الإنترنت.' 
          : 'Failed to load local tracing engine. Please check your internet connection.');
      };
      document.head.appendChild(script);
    } else {
      if ((window as any).ImageTracer) {
        setLibLoaded(true);
      } else {
        script.addEventListener('load', handleLoadSucess);
      }
    }
  }, [locale]);

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (svgBlobUrl) {
        URL.revokeObjectURL(svgBlobUrl);
      }
    };
  }, [svgBlobUrl]);

  // Helper to read selected image file
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t.svgConverter.unsupportedFile);
      return;
    }

    playSoundEffect(620, 0.1);
    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSrc(e.target.result as string);
        setSvgContent(null);
        if (svgBlobUrl) {
          URL.revokeObjectURL(svgBlobUrl);
          setSvgBlobUrl(null);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Tracing Vectorization execution wrapper
  const handleVectorize = () => {
    if (!imageSrc || !(window as any).ImageTracer) return;

    setIsProcessing(true);
    playSoundEffect(450, 0.12);
    const startTime = performance.now();

    setTimeout(() => {
      try {
        const tracer = (window as any).ImageTracer;
        
        // Fully documented ImageTracer.js parameters
        const tracerOptions = {
          numberofcolors: colorsCount,
          blurradius: blurRadius,
          qtres: precision,
          pathomit: omitThreshold,
          strokewidth: strokewidth,
          lt80: useLt80,
          viewbox: true,
          roundcoords: 1,
          scale: 1,
          mincolorratio: 0.001,
          colorquantcycles: 4
        };

        tracer.imageToSVG(
          imageSrc,
          (svgString: string) => {
            const timeDiff = performance.now() - startTime;
            setExecutionTime(Math.round(timeDiff));
            
            setSvgContent(svgString);

            // Compute metrics and build secure blob preview
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            setSvgBlobUrl(url);

            // Calculate metrics of output SVG size
            const blobSizeKb = (blob.size / 1024).toFixed(1);
            setProcessedSize(`${blobSizeKb} KB`);

            // Estimate SVG path tags count
            const pathMatches = svgString.match(/<path[^>]*>/g);
            setPathsCount(pathMatches ? pathMatches.length : 0);

            setIsProcessing(false);
            playSoundEffect(880, 0.2); // Success tune
          },
          tracerOptions
        );
      } catch (err) {
        console.error('Vectorization error: ', err);
        setIsProcessing(false);
        playSoundEffect(300, 0.3); // Err tone
      }
    }, 100);
  };

  // Size formatter helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Dynamic SEO Tag Synchronizer */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ff1a40]/10 text-[#ff1a40] text-xs font-black rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          {locale === 'ar' ? 'فيكتور ذكي محلي ٢٠٢٦ ⚡' : 'Local Dynamic Vectorizer 2026 ⚡'}
        </span>
        <h1 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight text-slate-900 dark:text-white mb-3">
          {t.svgConverter.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
          {t.svgConverter.subtitle}
        </p>
      </div>

      {libError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl mb-6 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{libError}</span>
        </div>
      )}

      {/* Main Grid: Control column (5 Cols) & Canvas preview column (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start mb-12">
        
        {/* LEFT COLUMN: Controls & Upload Section */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* File input Upload card */}
          <div 
            id="svg-dropzone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative overflow-hidden border-2 border-dashed bg-white dark:bg-slate-950/40 rounded-3xl p-6.5 text-center transition-all ${
              isDragging 
                ? 'border-[#ff1a40] bg-[#ff1a40]/5 scale-[0.995]' 
                : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-xs'
            }`}
          >
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg, image/webp, image/bmp" 
              onChange={onFileInputChange} 
              id="svg-file-picker" 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            />
            <div className="flex flex-col items-center justify-center space-y-4 py-2">
              <div className="w-13 h-13 rounded-2xl bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-900/30 shadow-xs">
                <Upload className="w-6 h-6 text-slate-500 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">
                  {t.svgConverter.dropzoneTitle}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-1">
                  {t.svgConverter.dropzoneSubtitle}
                </p>
              </div>
              <button 
                type="button" 
                className="px-4 py-2 bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-750 text-white text-[11px] font-black rounded-xl cursor-pointer transition-all border-0 shadow-xs"
              >
                {t.svgConverter.dropzoneBtn}
              </button>
            </div>
          </div>

          {/* Tracer Fine tuning slider panel card */}
          {imageSrc && (
            <div className="bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900 p-6 rounded-3xl space-y-5.5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-slate-900/40">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  <SlidersHorizontal className="w-4 h-4 text-[#ff1a40]" />
                  <span>{locale === 'ar' ? 'خيارات توليد المتجهات' : 'Vector Processing Settings'}</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">
                  {fileName.length > 20 ? fileName.substring(0, 17) + '...' : fileName}
                </span>
              </div>

              {/* Target colours count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{t.svgConverter.controlColors}</span>
                  <span className="px-2 py-0.5 bg-rose-500/10 text-[#ff1a40] rounded font-mono font-black">{colorsCount}</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="64" 
                  step="1"
                  value={colorsCount} 
                  onChange={(e) => { setColorsCount(Number(e.target.value)); playSoundEffect(350 + colorsCount*4, 0.04); }} 
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#ff1a40]"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-semibold">
                  <span>2 {locale === 'ar' ? 'ألوان' : 'Colors'}</span>
                  <span>16</span>
                  <span>32</span>
                  <span>64</span>
                </div>
              </div>

              {/* Noise Filter pre-blur */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{t.svgConverter.controlBlur}</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded font-mono font-black">{blurRadius} px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  step="1"
                  value={blurRadius} 
                  onChange={(e) => { setBlurRadius(Number(e.target.value)); playSoundEffect(400 + blurRadius*30, 0.04); }} 
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#ff1a40]"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-semibold">
                  <span>0 ({locale === 'ar' ? 'إيقاف' : 'Off'})</span>
                  <span>2</span>
                  <span>4</span>
                  <span>5 ({locale === 'ar' ? 'أقصى تنعيم' : 'Max Blur'})</span>
                </div>
              </div>

              {/* Angle smoothing tolerance qtres */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{t.svgConverter.controlPrecision}</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded font-mono font-black">{precision}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  step="1"
                  value={precision} 
                  onChange={(e) => { setPrecision(Number(e.target.value)); playSoundEffect(380 + precision*20, 0.04); }} 
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#ff1a40]"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-semibold">
                  <span>1 ({locale === 'ar' ? 'أقصى دقة وتعرج' : 'Sharp / Exact'})</span>
                  <span>2</span>
                  <span>3</span>
                  <span>5 ({locale === 'ar' ? 'خطوط مستقيمة ناعمة' : 'Super Smooth'})</span>
                </div>
              </div>

              {/* Omit speckles under px */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{t.svgConverter.controlOmit}</span>
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded font-mono font-black">{omitThreshold} px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="32" 
                  step="2"
                  value={omitThreshold} 
                  onChange={(e) => { setOmitThreshold(Number(e.target.value)); playSoundEffect(350 + omitThreshold*5, 0.04); }} 
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#ff1a40]"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-semibold">
                  <span>0 ({locale === 'ar' ? 'الكل' : 'All Detail'})</span>
                  <span>8</span>
                  <span>16</span>
                  <span>32 ({locale === 'ar' ? 'تجاهل العيوب الكبيرة' : 'Clean Outline'})</span>
                </div>
              </div>

              {/* StrokeWidth setup and Algorithm Toggle */}
              <div className="grid grid-cols-2 gap-4 pt-2.5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 font-bold">{locale === 'ar' ? 'سمك الخطوط (فيكتور)' : 'Vector Stroke'}</span>
                  <select 
                    value={strokewidth}
                    onChange={(e) => setStrokewidth(Number(e.target.value))}
                    className="p-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300"
                  >
                    <option value="0.1">0.1 ({locale === 'ar' ? 'رفيع جداً' : 'Super Fine'})</option>
                    <option value="1">1 ({locale === 'ar' ? 'افتراضي' : 'Default'})</option>
                    <option value="2">2 ({locale === 'ar' ? 'سميك' : 'Thick'})</option>
                    <option value="4">4 ({locale === 'ar' ? 'عريض جداً' : 'Ultra Wide'})</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 font-bold">{locale === 'ar' ? 'طريقة الرسم' : 'Rendering Rule'}</span>
                  <button 
                    type="button"
                    onClick={() => setUseLt80(!useLt80)}
                    className={`p-1.5 text-xs border rounded-lg font-bold cursor-pointer transition-all ${
                      useLt80 
                        ? 'bg-[#ff1a40]/5 border-[#ff1a40]/20 text-[#ff1a40]' 
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {useLt80 ? 'LT80 (Fast)' : 'Default tracer'}
                  </button>
                </div>
              </div>

              {/* Action Vectorize Trigger Button */}
              <button
                type="button"
                onClick={handleVectorize}
                disabled={isProcessing || !libLoaded}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#ff1a40] hover:bg-[#e00f32] disabled:bg-slate-300 dark:disabled:bg-slate-900/40 text-white font-sans font-black text-xs sm:text-sm rounded-2xl cursor-pointer transition-all border-0 shadow-sm disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>{t.svgConverter.btnConverting}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.svgConverter.btnConvert}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Svg Guide static info bento block */}
          <div className="p-5.5 bg-slate-50 dark:bg-slate-950/25 border border-slate-100/60 dark:border-slate-900/60 rounded-3xl space-y-3.5">
            <h3 className="text-xs sm:text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{t.svgConverter.infoTitle}</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              {t.svgConverter.infoDesc}
            </p>
            <div className="text-[10px] sm:text-[10.5px] p-2.5 bg-rose-500/5 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 font-semibold rounded-xl border border-rose-500/10 dark:border-rose-900/30">
              {t.svgConverter.infoNote}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Studio Comparison Canvas Box */}
        <div className="lg:col-span-7">
          {!imageSrc ? (
            <div className="h-[400px] sm:h-[480px] bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900/80 rounded-3xl flex flex-col items-center justify-center text-slate-400 p-6 shadow-2xs">
              <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-800 animate-bounce mb-3.5" />
              <p className="text-xs sm:text-xs font-black text-slate-500 dark:text-slate-400 text-center max-w-sm leading-relaxed">
                {locale === 'ar' 
                  ? 'يرجى تحميل أو إسقاط صورة نقطية للبدء في تفكيك عناصرها وتتبعها لخطوط فيكتور مرنة.' 
                  : 'Please upload or drop a raster image here to generate scalable bezier curves in vector SVG.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Dual Layout Panel: Original on left/top - Vector on right/bottom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto">
                
                {/* 1. Original Raster Preview Container */}
                <div className="flex flex-col border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-400">{t.svgConverter.originalLabel}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{formatBytes(fileSize)}</span>
                  </div>
                  <div className="relative flex-1 min-h-[250px] sm:min-h-[350px] bg-slate-50/50 dark:bg-slate-910 flex items-center justify-center p-4">
                    <img 
                      src={imageSrc} 
                      alt="Original source raster block" 
                      className="max-w-full max-h-[280px] sm:max-h-[340px] object-contain rounded-lg shadow-2xs" 
                    />
                  </div>
                </div>

                {/* 2. Vector SVG Output Preview Container */}
                <div className="flex flex-col border border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xs">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
                    <span className="text-[10px] font-black text-[#ff1a40] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t.svgConverter.resultLabel}
                    </span>
                    {svgContent && (
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">{processedSize}</span>
                    )}
                  </div>
                  <div className="relative flex-1 min-h-[250px] sm:min-h-[350px] bg-slate-100/30 dark:bg-slate-900/50 flex items-center justify-center p-4">
                    {svgBlobUrl ? (
                      <img 
                        src={svgBlobUrl} 
                        alt="Traced Vector Bezier Output" 
                        className="max-w-full max-h-[280px] sm:max-h-[340px] object-contain" 
                      />
                    ) : (
                      <div className="text-center p-6 text-slate-400 space-y-3">
                        {isProcessing ? (
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-9 h-9 text-[#ff1a40] animate-spin" />
                            <p className="text-[11px] font-black tracking-tight">{t.svgConverter.btnConverting}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Eye className="w-9 h-9 text-slate-300 dark:text-slate-800" />
                            <p className="text-[10px] font-semibold leading-relaxed max-w-xs">{locale === 'ar' ? 'اضغط زر "تحويل" للبدء في تتبع الصورة وبناء المتجهات' : 'Press "Convert" to build the vector SVG path canvas.'}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Dynamic Metrics Badge of processed trace outcome */}
              {svgContent && !isProcessing && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-[11px] font-bold text-slate-700 dark:text-slate-300 flex flex-wrap items-center justify-between gap-3 animate-fade-in shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{locale === 'ar' ? 'اكتمل توليد المتجهات بنجاح في متصفحك!' : 'Vector generation successfully completed!'}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4.5 font-mono text-[10px]">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded">{t.svgConverter.pathsLabel}<strong>{pathsCount}</strong></span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded">{locale === 'ar' ? 'الزمن المستهلك: ' : 'Elapsed: '}<strong>{executionTime}ms</strong></span>
                  </div>
                </div>
              )}

              {/* Downloader Trigger action button */}
              {svgBlobUrl && svgContent && (
                <a
                  href={svgBlobUrl}
                  download={fileName.substring(0, fileName.lastIndexOf('.')) + '_vectorized.svg'}
                  onClick={() => playSoundEffect(950, 0.15)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-black text-xs sm:text-sm rounded-2xl cursor-pointer transition-all border-0 shadow-sm text-center uppercase tracking-wide decoration-0"
                >
                  <Download className="w-4.5 h-4.5" />
                  <span>{t.svgConverter.btnDownload}</span>
                </a>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
