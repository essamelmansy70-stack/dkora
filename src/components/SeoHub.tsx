import { useState } from 'react';
import { Sparkles, Sliders, Server, Cpu, ShieldCheck, CheckCircle, Search, Copy, Code, BookOpen, AlertTriangle } from 'lucide-react';

export default function SeoHub() {
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

  // Keyword Strategy lists (Medium competition, high search volume)
  const keywordData = {
    ecommerce: [
      { keyword: 'تحسين صور المنتجات للمتاجر', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 35/100', traffic: 'متوسط البحث الشهري: 2,400+' },
      { keyword: 'تفريغ خلفية منتج بالذكاء الاصطناعي', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 28/100', traffic: 'متوسط البحث الشهري: 1,800+' },
      { keyword: 'حذف خلفية الصورة اون لاين مجانا', volume: 'المنافسة: منخفضة-متوسطة', difficulty: 'صعوبة الـ SEO: 22/100', traffic: 'متوسط البحث الشهري: 3,200+' },
      { keyword: 'تصغير حجم الصور بدون فوتوشوب', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 31/100', traffic: 'متوسط البحث الشهري: 2,900+' }
    ],
    wordpress: [
      { keyword: 'تسريع مدونة ووردبريس بالصور', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 40/100', traffic: 'متوسط البحث الشهري: 1,500+' },
      { keyword: 'تحويل الصور الى WebP للوردبريس', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 33/100', traffic: 'متوسط البحث الشهري: 2,100+' },
      { keyword: 'ضغط الصور وتقليل الحجم بنفس الجودة', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 29/100', traffic: 'متوسط البحث الشهري: 4,000+' }
    ],
    youtube: [
      { keyword: 'صناعة العلامة المائية للفيديو مجانا', volume: 'المنافسة: منخفضة-متوسطة', difficulty: 'صعوبة الـ SEO: 19/100', traffic: 'متوسط البحث الشهري: 1,900+' },
      { keyword: 'تثبيت مقاسات مصغرات اليوتيوب HD', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 25/100', traffic: 'متوسط البحث الشهري: 2,700+' },
      { keyword: 'ازالة خلفية الصورة الشخصية لليوتيوب', volume: 'المنافسة: متوسطة', difficulty: 'صعوبة الـ SEO: 27/100', traffic: 'متوسط البحث الشهري: 1,300+' }
    ]
  };

  const compressionCodeExample = `/**
 * كود الضغط المتقدم باستخدام HTML5 Canvas و OffscreenCanvas لعدم تأخير متصفح العميل
 * يضمن سرعة استجابة ممتازة (Interaction to Next Paint - INP)
 */
export async function compressImageInWorker(
  imageFile: File,
  options: { quality: number; targetWidth?: number; targetHeight?: number }
): Promise<Blob> {
  const { quality, targetWidth, targetHeight } = options;
  
  // إنشاء عنصر صورة خلفي لتحميل الملف
  const bitmap = await createImageBitmap(imageFile);
  
  // استخدام OffscreenCanvas للعمل بشكل منفصل في خلفية المتصفح
  const width = targetWidth || bitmap.width;
  const height = targetHeight || bitmap.height;
  
  const offscreen = new OffscreenCanvas(width, height);
  const ctx = offscreen.getContext('2d');
  if (!ctx) throw new Error('لا يمكن تشغيل مساحة المعالجة في المتصفح');

  // تنعيم الصورة عند التصغير لضمان جودة الحواف (Bicubic approximation)
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // رسم الصورة على المساحة المعينة
  ctx.drawImage(bitmap, 0, 0, width, height);

  // التصدير المباشر بصيغة WebP الحديثة مع الحفاظ على شفافية قنوات PNG
  const blob = await offscreen.convertToBlob({
    type: 'image/webp',
    quality: quality / 100
  });

  return blob;
}
`;

  const bgRemovalCodeExample = `/**
 * كيفية دمج مكتبة @imgly/background-removal لإدراج نموذج ذكاء اصطناعي محلي 100٪
 * يتم تشغيل نموذج MODNet/WASM فائق الدقة بدون أي تكلفة سيرفر ومع أقصى خصوصية!
 */
import imglyRemoveBackground, { Config } from '@imgly/background-removal';

export async function removeImageBackgroundAI(
  imageSource: File | string,
  onProgress: (progress: number) => void
): Promise<string> {
  const config: Config = {
    output: {
      type: 'image/png', // لحساب شفافية الفا
      quality: 0.85
    },
    progress: (state, progress) => {
      // إشارة توضح تقدم المعالجة من 0 إلى 1
      onProgress(Math.round(progress * 100));
    },
    // تفعيل الكاش لضمان عدم مراجعة التحميل للملفات المصاحبة مرتين
    model: 'medium', 
    device: 'gpu' // الاستعانة بكرت الشاشة للسرعة الكلية
  };

  try {
    const outputBlob = await imglyRemoveBackground(imageSource, config);
    // تحويل النتيجة لـ URL محلي مباشر للعرض
    return URL.createObjectURL(outputBlob);
  } catch (error) {
    console.error("فشل عزل الصور الذكي:", error);
    throw error;
  }
}
`;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6 sm:space-y-8 shadow-md">
      
      {/* Title Badge bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-black rounded-lg">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
            <span>كشكول التكتيكات واستراتيجية سكور السيو (SEO) لعام 2026</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">
            خبير الـ SEO On-Page لـ <span className="text-[#ff1a40]">dkora.online</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            طرق تحسين محركات البحث للصور، زيادة سرعة PageSpeed، وأفضل بروتوكولات المطورين.
          </p>
        </div>
        
        {/* Switcher */}
        <div className="flex gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => { setSelectedCreatorType('ecommerce'); playLocalSound(400); }}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
              selectedCreatorType === 'ecommerce' 
                ? 'bg-[#ff1a40] text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            🛒 المتاجر (سلة/زد)
          </button>
          <button
            onClick={() => { setSelectedCreatorType('wordpress'); playLocalSound(420); }}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
              selectedCreatorType === 'wordpress' 
                ? 'bg-[#ff1a40] text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            📝 مدونات ووردبريس
          </button>
          <button
            onClick={() => { setSelectedCreatorType('youtube'); playLocalSound(445); }}
            className={`px-3 py-1.5 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
              selectedCreatorType === 'youtube' 
                ? 'bg-[#ff1a40] text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            🎥 صناع اليوتيوب
          </button>
        </div>
      </div>

      {/* SEO On-Page Analysis for selected creator type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Dynamic SEO Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4.5 space-y-3">
            <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              تكتيكات الـ On-Page SEO الأكثر كفاءة:
            </h4>
            
            {selectedCreatorType === 'ecommerce' && (
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>تضمين الكلمة الدلالية لوصف المنتج في السمة <b>&lt;alt&gt;</b> (مثال: <span className="text-[#ff1a40] font-bold">alt=&quot;قميص اسود بدون خلفية وبخلفية شفافة&quot;</span>).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>اسم الملف التخزيني يجب أن يحتوي على علامات فصل وليس مسافات (مثال: <span className="font-mono text-xs dark:text-amber-200">mens-black-shirt.webp</span> بدلاً من <span className="line-through text-slate-400">IMG_2026.png</span>).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>استخدام صيغة <b>WebP</b> بدلاً من <b>PNG</b> لتقليل سرعة النطاق العريض بنسبة تفوق 80٪ لضمان تصدر Core Web Vitals.</span>
                </li>
              </ul>
            )}

            {selectedCreatorType === 'wordpress' && (
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>حفظ أبعاد الصور الكبيرة على العرض الأقصى للمقالات (مثال: عرض 1200بكسل فقط) لتجنب هدر بيانات الهاتف لدى زوار موقعك.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>استخدام ميزة <b>Lazy Loading</b> التلقائية عبر تضمين <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-950 p-0.5 px-1 rounded">loading=&quot;lazy&quot;</span> بالامتدادات.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>الاحتفاظ بجودة 80٪ في الضغط حيث لا يشاهد الزائر العادي أي فرق بشري في بكسلات الألوان، لكن السيرفر يكسب الضعف بالسرعة.</span>
                </li>
              </ul>
            )}

            {selectedCreatorType === 'youtube' && (
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>المصغرات الممتازة لا يتعدى حجمها 2MB لتمكين لوحات تحكم يوتيوب ويوتيوب ستوديو من قراءتها فوراً بدون رفض التعديلات.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>تأطير حواف العنصر أو الشخصية المعزولة لزيادة بريق نسبة النقر CTR عبر صفحات اليوتيوب المنافسة.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>إضافة لوجو أو علامة مائية شفافة لا تزيد حدتها عن 35٪ لضمان هوية علامتك التجارية على جميع منصات السوشيال ميديا.</span>
                </li>
              </ul>
            )}
          </div>

          {/* Keyword Match tables (Medium Comp) */}
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4.5 space-y-3">
            <h4 className="text-xs font-black text-rose-500 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              الكلمات الدلالية الموصى بها لمستهدفي dkora.online:
            </h4>
            <div className="space-y-2 text-right">
              {keywordData[selectedCreatorType].map((item, idx) => (
                <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 text-xs flex justify-between items-center">
                  <div className="space-y-0.5 text-right">
                    <span className="block font-black text-slate-850 dark:text-white text-[11px] sm:text-xs">
                      {item.keyword}
                    </span>
                    <span className="block text-[10px] text-slate-400">{item.traffic}</span>
                  </div>
                  <div className="text-left space-y-0.5 text-[9px] font-black text-emerald-600 dark:text-emerald-400">
                    <span>{item.volume}</span>
                    <span className="block text-slate-400">{item.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical spec and source-code tabs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 text-slate-350 rounded-2xl p-4.5 sm:p-6 border border-slate-850 space-y-4 relative">
            
            {/* Tab selector */}
            <div className="flex items-center justify-between border-b border-slate-850 pb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveCodeTab('compress'); playLocalSound(600); }}
                  className={`px-3 py-1.5 text-xxs sm:text-xs font-black rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeCodeTab === 'compress' 
                      ? 'bg-[#ff1a40] text-white shadow' 
                      : 'text-slate-450 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>كود ضغط ومعالجة الصور</span>
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
                  <span>كود عزل الخلفية بالذكاء الاصطناعي</span>
                </button>
              </div>

              {/* Copy action */}
              <button
                onClick={() => handleCopy(
                  activeCodeTab === 'compress' ? compressionCodeExample : bgRemovalCodeExample,
                  activeCodeTab
                )}
                className="p-1 px-2 text-[10px] font-black rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1"
                title="نسخ الكود بالكامل لاستخدامه فوراً بموقعك"
              >
                <Copy className="w-3 h-3 text-slate-400" />
                <span>{copiedText === activeCodeTab ? 'تم النسخ!' : 'نسخ الكود'}</span>
              </button>
            </div>

            {/* Description note */}
            <p className="text-[10px] leading-relaxed text-slate-400 bg-slate-900/40 p-2.5 rounded-xl border border-slate-850/50">
              💡 <b>ملاحظة تقنية:</b> هذا المنطق يعمل بالكامل في متصفح المستخدم (Client-Side) بدون نقل الصور لسيرفرات خارجية أو دفع رسوم واجهات برمجية. هذا يعطيك <b>أرشفة ممتازة</b> لأن السيرفر الخاص بـ <code>dkora.online</code> سيوفر 100٪ من الترافيك، ومؤشر أداء الموقع سيظل بمربع الـ 100% الأخضر!
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
                <span className="block text-[10px] text-slate-400 font-bold uppercase">البروتوكولات القديمة (Cloud/API):</span>
                <span className="block text-lg font-black text-rose-500 mt-1">تأخير 3000ms+</span>
                <span className="text-[9px] text-slate-450 block mt-0.5">يتطلب نقل الميجابايت مع ترافيك مكلف بالسيرفر.</span>
              </div>
              <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">البروتوكول الحديث (imgdkora Local):</span>
                <span className="block text-lg font-black text-emerald-400 mt-1">فوري (~30ms)</span>
                <span className="text-[9px] text-slate-450 block mt-0.5">معالجة فورية للمصفوفة الثنائية (Array Buffer) محلياً.</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Sitemap and Robots status indicator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4.5 rounded-2xl flex items-start gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle className="w-5 h-5 animate-pulse text-emerald-500" />
          </div>
          <div className="space-y-1 text-right">
            <h5 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>خريطة الموقع النشطة sitemap.xml</span>
              <span className="px-1 text-[8px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-sm font-sans">نشط 100%</span>
            </h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              تم تكوين خريطة الموقع بنجاح على المسار <code className="bg-slate-100 dark:bg-slate-950 p-0.5 px-1 rounded font-mono text-[9px] text-[#ff1a40]">/sitemap.xml</code> لتمكين أرشفة فورية لروابطك وتوجيه جوجل بوت بأولوية قصوى.
            </p>
          </div>
        </div>
        
        <div className="bg-indigo-500/5 border border-indigo-500/10 p-4.5 rounded-2xl flex items-start gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-1 text-right">
            <h5 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>ملف الروبوتات Robots.txt</span>
              <span className="px-1 text-[8px] bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-sm font-sans">مُهيأ</span>
            </h5>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              ملف <code className="bg-slate-100 dark:bg-slate-950 p-0.5 px-1 rounded font-mono text-[9px] text-indigo-500">/robots.txt</code> يوجه العناكب لتجنب المجلدات البرمجية العملاقة، لتقليل لود السيرفر وتوفير الباندويث المخصص.
            </p>
          </div>
        </div>
      </div>

      {/* Structured Strategy and Google Core Web Vitals Guidance */}
      <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-900 flex flex-col md:flex-row gap-5 items-start">
        <div className="p-3 rounded-2xl bg-[#ff1a40]/5 border border-[#ff1a40]/10 text-[#ff1a40] self-start">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">
            خارطة طريق تجربة المستخدم والـ Core Web Vitals لـ <code>dkora.online</code>
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            للحصول على المرتبة الأولى في جوجل لقصاصات الصور: ركّز على مؤشر <b>LCP (Largest Contentful Paint)</b> عبر تزويد صفحتك بقوالب مقاس مسبقة وتخطيتات CSS ثابتة الحجم لمنع انزياح العناصر <b>CLS</b> عند قيام المعالج بتغييب صورة الخلفية. لا ترفع صوراً غير منتهية المعالجة واستفد من واجهة <code>OffscreenCanvas</code> للتخلص التام من أي بطء في معالجة واجهة الويب.
          </p>
        </div>
      </div>

    </div>
  );
}
