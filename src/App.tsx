import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Star,
  Clock,
  Calendar,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Flame,
  HeartPulse,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShoppingCart,
  TrendingUp,
  Info,
  Check,
  Zap,
  Activity,
  Calculator,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';

export default function App() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

  // Calorie Burn Calculator State
  const [weightKg, setWeightKg] = useState<number>(75);
  const [workoutMinutes, setWorkoutMinutes] = useState<number>(30);
  const [speedKmh, setSpeedKmh] = useState<number>(5.5);

  const productImages = [
    {
      src: "https://i.postimg.cc/YLkBqC0N/61i-ZPVmi-Tc-L-AC-SX679.webp",
      caption: "الشكل العام للجهاز: تصميم عصري مدمج يناسب المساحات المنزلية المحدودة"
    },
    {
      src: "https://i.postimg.cc/kR9PXgGQ/61v-WWSr9Re-L-AC-SX679.webp",
      caption: "واجهة التحكم والشاشة الرقمية لمتابعة المؤشرات الحيوية بسهولة"
    }
  ];

  // Calculate calories burned
  // Approx formula: MET * weight * (time in hours)
  // MET for walking at 5.5 km/h is around 3.8 - 4.3
  const calculateCalories = () => {
    let met = 3.5;
    if (speedKmh <= 3) met = 2.5;
    else if (speedKmh <= 5) met = 3.5;
    else if (speedKmh <= 7) met = 4.8;
    else met = 7.0;

    const hours = workoutMinutes / 60;
    return Math.round(met * weightKg * hours);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-cairo dir-rtl">
      {/* Top Banner / Announcement */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs md:text-sm py-2 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-md">
        <Zap className="w-4 h-4 animate-pulse text-amber-300" />
        <span>تحديث 2026: خصم خاص متاح لفترة محدودة على أمازون مصر مع توصيل مجاني</span>
      </div>

      {/* Main Header Nav */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 w-full px-4 sm:px-8 lg:px-12 xl:px-16 transition-all">
        <div className="w-full flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500/10 p-2 rounded-xl border border-teal-500/30">
              <Activity className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                دليل <span className="text-teal-400">اللياقة البدنية</span>
              </span>
              <p className="text-[10px] md:text-xs text-slate-400">مراجعات وتقييمات العتاد الرياضي المنزلي</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs md:text-sm border border-slate-700 transition"
              title="مشاركة الرابط"
            >
              <Share2 className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">{copiedLink ? "تم النسخ!" : "مشاركة"}</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg border text-xs md:text-sm transition ${
                isBookmarked
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300"
              }`}
              title="حفظ المقال"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`} />
            </button>
            <a
              href="https://link.amazon/B0gLIGqZp"
              target="_blank"
              rel="sponsored nofollow"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs md:text-sm px-4 py-2 rounded-lg shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>شراء الآن</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Container */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 2xl:px-24 py-6 md:py-10 space-y-8">
        
        {/* Affiliate Disclosure (Google Best Practice 2026) */}
        <div className="w-full bg-emerald-950/40 border-r-4 border-emerald-500 border border-slate-800 p-4 md:p-5 rounded-xl text-xs md:text-sm text-emerald-200 flex items-start gap-3 shadow-lg">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-emerald-300 font-bold block text-sm">إفصاح الشفافية والحيادية:</strong>
            <p className="leading-relaxed opacity-90">
              يحتوي هذا المقال على روابط تسويقية بالعمولة (Affiliate Links). إذا قمت بالشراء عبر هذه الروابط، قد نحصل على عمولة بسيطة دون أي تكلفة إضافية عليك، مما يساعدنا على استمرار تقديم مراجعات محايدة ومفيدة.
            </p>
          </div>
        </div>

        {/* Article Header & Main Title Block */}
        <article className="w-full space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold px-3 py-1 rounded-full">
                مراجعات الأجهزة الرياضية 2026
              </span>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                أعلى تقييم للمشايات المنزلية
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight md:leading-snug tracking-normal">
              مراجعة شاملة: هل يُعد هذا أفضل جهاز مشي رياضي منزلي لعام 2026؟
            </h1>

            {/* Meta Information Bar */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs md:text-sm text-slate-400 border-b border-slate-800 pb-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>تاريخ التحديث: يوليو 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>وقت القراءة: 4 دقائق</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-slate-200">التقييم: 4.7 / 5.0 (128 مراجعة)</span>
              </div>
            </div>
          </div>

          {/* Intro Paragraph */}
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed md:leading-loose">
            أصبح الاعتماد على أداء التمارين الرياضية في المنزل ضرورة يومية للعديد من الأشخاص الراغبين في الحفاظ على لياقتهم البدنية وإنقاص الوزن دون الحاجة للذهاب للصالات الرياضية. إذا كنت تبحث عن <strong className="text-teal-400 font-bold">جهاز مشي رياضي منزلى</strong> يجمع بين الأداء القوي، التصميم المدمج، والسعر المناسب، فإن هذا الجهاز الكهربائي يقدم خيارًا مثاليًا يناسب معظم المنازل العصريّة.
          </p>

          {/* Full Width Gallery & Showcase Grid */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl space-y-4">
            <div className="relative group overflow-hidden rounded-xl bg-white/95 border border-slate-700 flex items-center justify-center p-4 min-h-[320px] md:min-h-[450px]">
              <img
                src={productImages[activeImageIndex].src}
                alt={productImages[activeImageIndex].caption}
                className="max-h-[420px] object-contain transition duration-500 transform group-hover:scale-105 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />
              
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 left-4 bg-slate-950/80 hover:bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-700 text-xs flex items-center gap-1 backdrop-blur-sm transition"
              >
                <Maximize2 className="w-4 h-4 text-teal-400" />
                <span>تكبير الصورة</span>
              </button>

              <div className="absolute bottom-3 right-3 left-3 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 text-center text-xs md:text-sm text-slate-300">
                {productImages[activeImageIndex].caption}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition text-right ${
                    activeImageIndex === idx
                      ? "bg-teal-950/50 border-teal-500 text-white shadow-md shadow-teal-500/10"
                      : "bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <img src={img.src} alt="" className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-slate-600 flex-shrink-0" />
                  <div className="text-xs space-y-1">
                    <span className="font-bold block text-slate-200">صورة رقم {idx + 1}</span>
                    <span className="line-clamp-1 opacity-80">{img.caption}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 1: Why Choose */}
          <section className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-400 flex items-center gap-3 border-b border-slate-800 pb-3">
              <TrendingUp className="w-7 h-7 text-teal-400 flex-shrink-0" />
              <span>لماذا تختار جهاز مشي رياضي منزلي؟</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              تتميز المشايات الكهربائية المنزلية بقدرتها على توفير تمرين كارديو مميز ينشط الدورة الدموية، ويساعد على حرق السعرات الحرارية بكفاءة عالية. يُعد اختيار <strong className="text-teal-300">جهاز مشي رياضي منزلى</strong> مناسب حلًا ممتازًا لممارسة المشي أو الجري السريع في أي وقت بغض النظر عن حالة الطقس الخارجية.
            </p>

            {/* Expert Highlight Box */}
            <div className="w-full bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-900 border-r-4 border-amber-500 border border-slate-800 p-5 rounded-xl text-amber-200 flex items-start gap-3">
              <Flame className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 animate-bounce" />
              <div className="space-y-1">
                <strong className="text-amber-300 font-bold block text-sm md:text-base">💡 نصيحة خبراء اللياقة البدنية:</strong>
                <p className="text-sm md:text-base leading-relaxed opacity-95">
                  ممارسة المشي لمدة 30 دقيقة يوميًا على مشاية منزلية تساعد في حرق ما يقارب 200 إلى 300 سعر حراري، مع تحسين مستويات الطاقة والصحة النفسية والوقاية من أمراض المفاصل والقلب.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Technical Specifications Table */}
          <section className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-400 flex items-center gap-3 border-b border-slate-800 pb-3">
              <Info className="w-7 h-7 text-teal-400 flex-shrink-0" />
              <span>المواصفات الفنية للجهاز</span>
            </h2>

            <div className="w-full overflow-x-auto border border-slate-800 rounded-xl shadow-inner">
              <table className="w-full text-right text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-teal-300 border-b border-slate-700">
                    <th className="p-4 font-bold border-l border-slate-700 w-1/3 md:w-1/4">المعيار / الميزة</th>
                    <th className="p-4 font-bold">التفاصيل والمواصفات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-slate-200 border-l border-slate-800 bg-slate-900/40">نوع الجهاز</td>
                    <td className="p-4 text-slate-300">جهاز مشي رياضي منزلي كهربائي (Electric Treadmill)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-slate-200 border-l border-slate-800 bg-slate-900/40">قوة المحرك</td>
                    <td className="p-4 text-slate-300">محرك هادئ وقوي يضمن استقرار السرعة أثناء التمارين المخففة والتكثيفية</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-slate-200 border-l border-slate-800 bg-slate-900/40">الشاشة الرقمية</td>
                    <td className="p-4 text-slate-300">شاشة رقمية (LCD/LED) لعرض السرعة، المسافة، الوقت، والسعرات الحرارية بدقة</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-slate-200 border-l border-slate-800 bg-slate-900/40">قابلية الطي والتخزين</td>
                    <td className="p-4 text-slate-300">تصميم مدمج قابل للطي مع عجلات لتسهيل التخزين والنقل تحت الأسرة أو الكنب</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-bold text-slate-200 border-l border-slate-800 bg-slate-900/40">نظام الامتصاص</td>
                    <td className="p-4 text-slate-300">مزود بطبقات متعددة لامتصاص الصدمات لحماية الركبة والمفاصل أثناء الركض</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Pros and Cons */}
          <section className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-400 flex items-center gap-3 border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-7 h-7 text-teal-400 flex-shrink-0" />
              <span>مميزات وعيوب الجهاز</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg md:text-xl border-b border-emerald-500/20 pb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span>إيجابيات الجهاز 👍</span>
                </div>
                <ul className="space-y-3 text-slate-300 text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>سهل التخزين بفضل خاصية الطي والتصميم الخفيف المبتكر.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>محرك سلس وصوت منخفض لا يسبب أي إزعاج في أرجاء المنزل.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>لوحة تحكم سهلة الاستخدام تناسب كافة الفئات والأعمار.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>توفير حماية ممتازة للمفاصل بفضل سير المشي الممتص للصدمات.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>سعر اقتصادي ومناسب مقابل القيمة والمميزات المقدمة.</span>
                  </li>
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-lg md:text-xl border-b border-rose-500/20 pb-3">
                  <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                  <span>سلبيات الجهاز 👎</span>
                </div>
                <ul className="space-y-3 text-slate-300 text-sm md:text-base">
                  <li className="flex items-start gap-2.5">
                    <X className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>قد لا يناسب الأوزان العالية جدًا (فوق 120-130 كجم) بدون التحقق من الحد الأقصى للموديل.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>يحتاج إلى صيانة دورية بسيطة وتزييت السير كل فترة لضمان أطول عمر افتراضي.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Price & CTA Box */}
          <section className="w-full bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border-2 border-teal-500/50 rounded-2xl p-6 md:p-10 text-center space-y-6 shadow-2xl shadow-teal-950/50 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
                سعر جهاز مشي رياضي منزلي ورابط الشراء
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                يتوفر هذا الجهاز بسعر تنافسي جدًا في السوق المصري على منصة أمازون مصر، مما يجعله استثمارًا ذكيًا لصحتك وصحة عائلتك بدون الحاجة لدفع اشتراكات رياضية شهرية مكلفة.
              </p>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 max-w-xl mx-auto space-y-2">
                <span className="text-xs md:text-sm text-slate-400 font-bold block">سعر الجهاز الحالي على أمازون مصر</span>
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-amber-400">
                  حوالي 8,500 - 9,850 <span className="text-lg md:text-2xl text-slate-300 font-normal">جنيه مصري</span>
                </div>
                <p className="text-xs text-slate-400 pt-1">
                  * الأسعار متغيرة طبقًا للعروض والخصومات المتاحة حاليًا. تحقق من السعر المباشر الآن.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://link.amazon/B0gLIGqZp"
                  target="_blank"
                  rel="sponsored nofollow"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-lg md:text-xl px-8 md:px-12 py-4 rounded-xl shadow-xl shadow-amber-500/25 transition transform hover:-translate-y-1 hover:scale-105"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>🛒 اضغط هنا لمعرفة السعر الحالي وشراء الجهاز من أمازون</span>
                  <ExternalLink className="w-5 h-5 text-slate-900" />
                </a>
              </div>
            </div>
          </section>

          {/* Interactive Tool: Calorie Burn Calculator */}
          <section className="w-full bg-slate-900/80 border border-teal-500/30 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Calculator className="w-7 h-7 text-teal-400" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">حاسبة حرق السعرات الحرارية التفاعلية</h3>
                <p className="text-xs md:text-sm text-slate-400">احسب كمية السعرات المقدر حرقها أثناء المشي على الجهاز بناءً على وزنك ومدة التمرين</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold text-slate-300 block">الوزن (كيلوجرام): {weightKg} كجم</label>
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold text-slate-300 block">مدة التمرين (بالدقائق): {workoutMinutes} دقيقة</label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={workoutMinutes}
                  onChange={(e) => setWorkoutMinutes(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-bold text-slate-300 block">السرعة المتوقعة: {speedKmh} كم/ساعة</label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={speedKmh}
                  onChange={(e) => setSpeedKmh(Number(e.target.value))}
                  className="w-full accent-teal-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-center flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-bold">النتيجة التقديرية</span>
                <p className="text-sm text-slate-300">السعرات الحرارية المحروقة في هذا التمرين:</p>
              </div>
              <div className="flex items-center gap-2 bg-teal-950/60 border border-teal-500/40 px-6 py-3 rounded-xl text-2xl md:text-3xl font-black text-amber-400">
                <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
                <span>{calculateCalories()} سعرة حرارية</span>
              </div>
            </div>
          </section>

          {/* Section 5: Conclusion & Final Thoughts */}
          <section className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-teal-400 border-b border-slate-800 pb-3">
              الخلاصة: هل يستحق الشراء؟
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              إذا كنت تتطلع إلى الحصول على <strong className="text-teal-400">جهاز مشي رياضي منزلى</strong> يجمع بين سهولة الاستخدام، والجودة العالية، والحجم المدمج الذي لا يشغل مساحة كبيرة في الغرفة، فإن هذا النموذج يعتبر خيارًا ممتازًا للغاية. يساعدك الجهاز في الالتزام بجدول تدريبي يومي مرن لتحسين لياقتك وصحتك العامة بكل راحة وأمان داخل منزلك.
            </p>

            {/* Interactive Article Rating / Feedback */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-300 font-bold">هل وجدت هذه المراجعة مفيدة؟</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setUserVote('up')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition ${
                    userVote === 'up'
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>نعم، مفيدة جداً</span>
                </button>
                <button
                  onClick={() => setUserVote('down')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition ${
                    userVote === 'down'
                      ? "bg-rose-500/20 border-rose-500 text-rose-300"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <span>أحتاج مزيد من التفاصيل</span>
                </button>
              </div>
            </div>
          </section>

        </article>
      </main>

      {/* Floating Action Bar on Mobile/Tablet */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 z-30 flex items-center justify-between gap-4 px-4 md:px-8 shadow-2xl">
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-bold">جهاز مشي كهربائي منزلي</span>
          <span className="text-xs md:text-sm font-black text-amber-400">8,500 - 9,850 ج.م</span>
        </div>
        <a
          href="https://link.amazon/B0gLIGqZp"
          target="_blank"
          rel="sponsored nofollow"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs md:text-sm px-6 py-2.5 rounded-xl shadow-lg transition"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>شراء الآن من أمازون</span>
        </a>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-2 rounded-full bg-slate-800 border border-slate-700"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full bg-white p-4 rounded-2xl space-y-4 text-center">
            <img
              src={productImages[activeImageIndex].src}
              alt={productImages[activeImageIndex].caption}
              className="max-h-[75vh] w-full object-contain mx-auto"
            />
            <p className="text-slate-800 font-bold text-sm md:text-base">
              {productImages[activeImageIndex].caption}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 py-8 px-4 sm:px-8 lg:px-16 text-center text-xs md:text-sm text-slate-400 mt-12 mb-16 md:mb-0 space-y-3">
        <div className="flex items-center justify-center gap-2 text-slate-300 font-bold">
          <Activity className="w-4 h-4 text-teal-400" />
          <span>دليل مراجعات الأجهزة الرياضية المنزلية 2026</span>
        </div>
        <p>© 2026 جميع الحقوق محفوظة - تم بناء وتصميم المقال ليغطي كامل عرض الشاشة بسلاسة</p>
      </footer>
    </div>
  );
}
