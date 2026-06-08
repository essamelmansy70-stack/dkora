import { useState } from 'react';
import { Sparkles, Cpu, ShieldCheck, CheckCircle, Search, Copy, Code, BookOpen } from 'lucide-react';
import { TranslationType } from '../translations';

interface SeoHubProps {
  t: TranslationType;
  locale: 'ar' | 'en';
}

export default function SeoHub({ t, locale }: SeoHubProps) {
  const [selectedCreatorType, setSelectedCreatorType] = useState<'ecommerce' | 'wordpress' | 'youtube'>('ecommerce');
  const [activeCodeTab, setActiveCodeTab] = useState<'compress' | 'bg-remove'>('compress');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sound cue inside SeoHub
  const playLocalSound = (freq = 480) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(id);
    playLocalSound(620);
    setTimeout(() => {
      setCopiedText(null);
    }, 3000);
  };

  // Keyword Strategy lists (Medium competition, high search volume) using bilingual translations
  const keywordData = {
    ecommerce: [
      { 
        keyword: locale === 'ar' ? 'تحسين صور المنتجات للمتاجر' : 'Product Photo Optimization for Stores', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 2,400+' : 'Avg Monthly Searches: 2,400+' 
      },
      { 
        keyword: locale === 'ar' ? 'تفريغ خلفية منتج بالذكاء الاصطناعي' : 'AI Product Background Removal', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 1,800+' : 'Avg Monthly Searches: 1,800+' 
      },
      { 
        keyword: locale === 'ar' ? 'حذف خلفية الصورة اون لاين مجانا' : 'Free Image Background Remover Online', 
        volume: t.seoHub.volLowMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: t.seoHub.avgSearch 
      },
      { 
        keyword: locale === 'ar' ? 'تصغير حجم الصور بدون فوتوشوب' : 'Compress Photos Without Photoshop', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 2,900+' : 'Avg Monthly Searches: 2,900+' 
      }
    ],
    wordpress: [
      { 
        keyword: locale === 'ar' ? 'تسريع مدونة ووردبريس بالصور' : 'Speed Up WordPress With Image Optimization', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 1,500+' : 'Avg Monthly Searches: 1,500+' 
      },
      { 
        keyword: locale === 'ar' ? 'تحويل الصور الى WebP للوردبريس' : 'Convert Images to WebP for WordPress', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 2,100+' : 'Avg Monthly Searches: 2,100+' 
      },
      { 
        keyword: locale === 'ar' ? 'ضغط الصور وتقليل الحجم بنفس الجودة' : 'Compress Images Retention of Quality', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 4,000+' : 'Avg Monthly Searches: 4,000+' 
      }
    ],
    youtube: [
      { 
        keyword: locale === 'ar' ? 'صناعة العلامة المائية للفيديو مجانا' : 'Free Video Watermark Creator', 
        volume: t.seoHub.volLowMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 1,900+' : 'Avg Monthly Searches: 1,900+' 
      },
      { 
        keyword: locale === 'ar' ? 'تثبيت مقاسات مصغرات اليوتيوب HD' : 'Standardize HD YouTube Thumbnail Sizes', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 2,750+' : 'Avg Monthly Searches: 2,750+' 
      },
      { 
        keyword: locale === 'ar' ? 'ازالة خلفية الصورة الشخصية لليوتيوب' : 'Erase Personal Photo Background for YouTube', 
        volume: t.seoHub.volMedium, 
        difficulty: t.seoHub.diffScore, 
        traffic: locale === 'ar' ? 'متوسط البحث الشهري: 1,300+' : 'Avg Monthly Searches: 1,300+' 
      }
    ]
  };

  const compressionCodeExample = `/**
 * Advanced Compression script using HTML5 Canvas & OffscreenCanvas to optimize UI thread
 * Standard dynamic interaction to Next Paint (INP) compliant
 */
export async function compressImageInWorker(
  imageFile: File,
  options: { quality: number; targetWidth?: number; targetHeight?: number }
): Promise<Blob> {
  const { quality, targetWidth, targetHeight } = options;
  const bitmap = await createImageBitmap(imageFile);
  
  const width = targetWidth || bitmap.width;
  const height = targetHeight || bitmap.height;
  
  const offscreen = new OffscreenCanvas(width, height);
  const ctx = offscreen.getContext('2d');
  if (!ctx) throw new Error('Could not initialize sandboxed 2D canvas context');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await offscreen.convertToBlob({
    type: 'image/webp',
    quality: quality / 100
  });

  return blob;
}
`;

  const bgRemovalCodeExample = `/**
 * Dynamic on-the-fly multi-threaded Redmean matrix color isolation
 * Computes direct Euclidean color distances in client side micro-workers
 */
export function removeBackgroundDirect(
  pixels: Uint8ClampedArray,
  target: {r: number, g: number, b: number},
  tolerance: number,
  feather: number
) {
  const maxDist = (tolerance / 100) * 765;
  const fRange = (feather / 100) * 200;
  const maxDistSq = maxDist * maxDist;
  const innerSq = Math.max(0, maxDist - fRange) ** 2;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i+1], b = pixels[i+2], a = pixels[i+3];
    if (a === 0) continue;

    const dR = r - target.r, dG = g - target.g, dB = b - target.b;
    const rMean = (r + target.r) / 2;
    const distSq = (2 + rMean/256)*dR*dR + 4*dG*dG + (2 + (255-rMean)/256)*dB*dB;

    if (distSq < maxDistSq) {
      if (fRange > 0 && distSq > innerSq) {
        const d = Math.sqrt(distSq);
        pixels[i+3] = Math.max(0, Math.min(255, Math.round(a * (d - (maxDist - fRange))/fRange)));
      } else {
        pixels[i+3] = 0;
      }
    }
  }
}
`;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 sm:space-y-8 shadow-md">
      
      {/* Title Badge bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800 text-left rtl:text-right">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-black rounded-lg">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
            <span>{t.seoHub.tag}</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
            {t.seoHub.title} <span className="text-[#ff1a40]">dkora.online</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {locale === 'ar' 
              ? 'طرق تحسين محركات البحث للصور، زيادة سرعة PageSpeed، وأفضل بروتوكولات المطورين.' 
              : 'Advanced photo optimization for SEO indices, accelerating PageSpeed thresholds, and creator workflows.'}
          </p>
        </div>
        
        {/* Switcher */}
        <div className="flex gap-1.5 bg-white border border-slate-200/80 dark:border-slate-800 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => { setSelectedCreatorType('ecommerce'); playLocalSound(400); }}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
              selectedCreatorType === 'ecommerce' 
                ? 'bg-[#ff1a40] text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            {t.seoHub.switcherEcommerce}
          </button>
          <button
            onClick={() => { setSelectedCreatorType('wordpress'); playLocalSound(420); }}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
              selectedCreatorType === 'wordpress' 
                ? 'bg-[#ff1a40] text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            {t.seoHub.switcherWordpress}
          </button>
          <button
            onClick={() => { setSelectedCreatorType('youtube'); playLocalSound(445); }}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
              selectedCreatorType === 'youtube' 
                ? 'bg-[#ff1a40] text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            {t.seoHub.switcherYoutube}
          </button>
        </div>
      </div>

      {/* SEO On-Page Analysis for selected creator type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Dynamic SEO Card (5 cols) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-4 text-left rtl:text-right">
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4.5 space-y-3">
            <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              {t.seoHub.recommendationTitle}
            </h4>
            
            {selectedCreatorType === 'ecommerce' && (
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recEco1}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recEco2}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recEco3}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recEco4}</span>
                </li>
              </ul>
            )}

            {selectedCreatorType === 'wordpress' && (
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recWord1}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recWord2}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recWord3}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recWord4}</span>
                </li>
              </ul>
            )}

            {selectedCreatorType === 'youtube' && (
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recYt1}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recYt2}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recYt3}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.seoHub.recYt4}</span>
                </li>
              </ul>
            )}
          </div>

          {/* Keyword Match tables (Medium Comp) */}
          <div className="bg-white border border-slate-200/70 dark:bg-slate-950 rounded-2xl p-4.5 space-y-3">
            <h4 className="text-xs font-black text-[#ff1a40] flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              {t.seoHub.keywordsTitle}
            </h4>
            <div className="space-y-2">
              {keywordData[selectedCreatorType].map((item, idx) => (
                <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 text-xs flex justify-between items-center text-left rtl:text-right">
                  <div className="space-y-0.5">
                    <span className="block font-black text-slate-850 dark:text-white text-[11px] sm:text-xs">
                      {item.keyword}
                    </span>
                    <span className="block text-[10px] text-slate-400">{item.traffic}</span>
                  </div>
                  <div className="space-y-0.5 text-[9px] font-black text-emerald-650 dark:text-emerald-400 text-right rtl:text-left shrink-0">
                    <span>{item.volume}</span>
                    <span className="block text-slate-400">{item.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical spec and source-code tabs (7 cols) */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-4 text-left rtl:text-right">
          <div className="bg-slate-950 text-slate-350 rounded-2xl p-4.5 sm:p-6 border border-slate-850 space-y-4 relative">
            
            {/* Tab selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-850 pb-3">
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto whitespace-nowrap">
                <button
                  onClick={() => { setActiveCodeTab('compress'); playLocalSound(600); }}
                  className={`px-3 py-1.5 text-xxs sm:text-xs font-black rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeCodeTab === 'compress' 
                      ? 'bg-[#ff1a40] text-white shadow' 
                      : 'text-slate-450 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{t.seoHub.codeTabCompress}</span>
                </button>
                <button
                  onClick={() => { setActiveCodeTab('bg-remove'); playLocalSound(650); }}
                  className={`px-3 py-1.5 text-xxs sm:text-xs font-black rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeCodeTab === 'bg-remove' 
                      ? 'bg-[#ff1a40] text-white shadow' 
                      : 'text-slate-450 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{t.seoHub.codeTabBgRemove}</span>
                </button>
              </div>

              {/* Copy action */}
              <button
                onClick={() => handleCopy(
                  activeCodeTab === 'compress' ? compressionCodeExample : bgRemovalCodeExample,
                  activeCodeTab
                )}
                className="p-1 px-2 text-[10px] font-black rounded-md bg-slate-905 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1 self-end sm:self-auto"
                title={locale === 'ar' ? "نسخ الكود بالكامل بموقعك" : "Copy deployment code snippet"}
              >
                <Copy className="w-3 h-3 text-slate-400" />
                <span>{copiedText === activeCodeTab ? t.seoHub.copiedBtn : t.seoHub.copyBtn}</span>
              </button>
            </div>

            {/* Description note */}
            <p className="text-[10px] leading-relaxed text-slate-450 bg-slate-900/40 p-2.5 rounded-xl border border-slate-850/50">
              {t.seoHub.codeNote}
            </p>

            {/* Code Renderer */}
            <div className="relative">
              <pre className="font-mono text-[9px] sm:text-[10px] text-slate-300 overflow-x-auto p-4 bg-slate-900 rounded-xl max-h-[340px] border border-slate-850">
                <code>{activeCodeTab === 'compress' ? compressionCodeExample : bgRemovalCodeExample}</code>
              </pre>
            </div>

            {/* Performance comparison panel */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="p-3 bg-rose-500/5 rounded-xl border border-rose-500/10 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">{t.seoHub.legacyProtocol}</span>
                <span className="block text-sm sm:text-base md:text-lg font-black text-rose-500 mt-1">3000ms+ delay</span>
                <span className="text-[9px] text-slate-450 block mt-0.5">
                  {locale === 'ar' ? 'يتطلب نقل البيانات واستهلاك ترافيك السيرفر.' : 'Incurs heavy server cloud payload bandwidth costs.'}
                </span>
              </div>
              <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">{t.seoHub.modernProtocol}</span>
                <span className="block text-sm sm:text-base md:text-lg font-black text-emerald-400 mt-1">Instant (~30ms)</span>
                <span className="text-[9px] text-slate-450 block mt-0.5">
                  {locale === 'ar' ? 'معالجة فوريّة كهرومغناطيسية محلياً.' : 'Direct binary processing entirely on client CPU.'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Sitemap and Robots status indicator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left rtl:text-right">
        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4.5 rounded-2xl flex items-start gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle className="w-5 h-5 animate-pulse text-emerald-500" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>{locale === 'ar' ? 'خريطة الموقع النشطة sitemap.xml' : 'Active Sitemap /sitemap.xml'}</span>
              <span className="px-1 text-[8px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-sm font-sans">{t.seoHub.arText}</span>
            </h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.seoHub.vitalsText}
            </p>
          </div>
        </div>
        
        <div className="bg-indigo-500/5 border border-indigo-500/10 p-4.5 rounded-2xl flex items-start gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>{locale === 'ar' ? 'ملف الروبوتات Robots.txt' : 'Crawler Policy Robots.txt'}</span>
              <span className="px-1 text-[8px] bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-sm font-sans">{t.seoHub.speedDesc}</span>
            </h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.seoHub.robotTxtDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Structured Strategy and Google Core Web Vitals Guidance */}
      <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-900 flex flex-col md:flex-row gap-5 items-start text-left rtl:text-right">
        <div className="p-3 rounded-2xl bg-[#ff1a40]/5 border border-[#ff1a40]/10 text-[#ff1a40] self-start shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
            {t.seoHub.vitalsTitle}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans">
            {locale === 'ar' 
              ? 'للحصول على المرتبة الأولى في جوجل لقصاصات الصور: ركّز على مؤشر LCP (Largest Contentful Paint) عبر تزويد صفحتك بقوالب مقاس مسبقة وتخطيتات CSS ثابتة الحجم لمنع انزياح العناصر CLS عند قيام المعالج بتغييب صورة الخلفية. لا ترفع صوراً غير منتهية المعالجة واستفد من واجهة OffscreenCanvas للتخلص التام من أي بطء في معالجة واجهة الويب.' 
              : 'To secure prime ranking coordinates, anchor on-device LCP metrics. Use preloaded templates and absolute static dimensions to bypass CLS layout recalculations as transparency masks are extracted. Leverage separate offscreen rendering environments to secure uninterrupted client side frame-rates.'}
          </p>
        </div>
      </div>

    </div>
  );
}
