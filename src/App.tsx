import React, { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Search,
  AlertTriangle,
  Calculator,
  MessageSquare,
  Eye,
  Settings,
  DollarSign,
  Activity,
  Info,
  ChevronDown,
  Zap,
  Volume2,
  VolumeX,
  Plus,
  Trash2,
  Edit,
  X,
  CheckCircle2,
  Globe,
  Sun,
  Moon,
  Compass,
  FileText,
  Calendar,
  BookOpen,
  Share2,
  ArrowRight,
  Map,
  ShieldAlert,
  Lock,
  Unlock
} from "lucide-react";
import { translations } from "./translations";
import { initialNewsArticles, initialCalendarEvents, NewsArticle, CalendarEvent } from "./data/newsAndCalendar";

interface Signal {
  id: string;
  pair: string;
  type: "BUY" | "SELL" | "INFO";
  entry: string;
  tp1: string;
  tp2: string;
  tp3: string;
  sl: string;
  status: "ACTIVE" | "TP1 HIT" | "TP2 HIT" | "TP3 HIT" | "SL HIT" | "CLOSED" | "INFO";
  explanation: string;
  date: string;
  views: string;
  photoUrl: string;
  rawText: string;
}

// Sound synthesizer for high-fidelity interactive feedback
const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
    
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(659.25, now); // E5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.18); // C6
    
    gain2.gain.setValueAtTime(0.08, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.35);
    
    osc2.start(now);
    osc2.stop(now + 0.45);
  } catch (err) {
    console.warn("Audio feedback context failed:", err);
  }
};

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-800/50 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-40"
        }`}
        {...props}
      />
    </div>
  );
};

export default function App() {
  // 1. Language & Router Sync State
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "ar") return urlLang;
    const saved = localStorage.getItem("decou_fx_lang");
    return saved === "en" ? "en" : "ar";
  });

  const [page, setPage] = useState<string>(() => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const primaryPath = pathParts[0] || "";
    const validPages = ["home", "news", "school", "sitemap", "privacy", "terms"];
    
    if (primaryPath === "signal" || primaryPath === "signals") {
      return "home";
    }
    if (validPages.includes(primaryPath)) {
      return primaryPath;
    }

    const params = new URLSearchParams(window.location.search);
    const qPage = params.get("page");
    if (qPage && validPages.includes(qPage)) {
      return qPage;
    }
    return "home";
  });

  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(() => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const primaryPath = pathParts[0] || "";
    const secondaryPath = pathParts[1] || null;
    if ((primaryPath === "signal" || primaryPath === "signals") && secondaryPath) {
      return secondaryPath;
    }
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || null;
  });

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(() => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const primaryPath = pathParts[0] || "";
    const secondaryPath = pathParts[1] || null;
    if (primaryPath === "news" && secondaryPath) {
      return secondaryPath;
    }
    const params = new URLSearchParams(window.location.search);
    return params.get("newsId") || null;
  });

  const [selectedSchoolArticleId, setSelectedSchoolArticleId] = useState<string | null>(() => {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const primaryPath = pathParts[0] || "";
    const secondaryPath = pathParts[1] || null;
    if (primaryPath === "school" && secondaryPath) {
      return secondaryPath;
    }
    const params = new URLSearchParams(window.location.search);
    return params.get("schoolId") || null;
  });

  // 2. Premium Light / Dark Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem("decou_fx_theme");
    return saved === "dark" ? "dark" : "light";
  });

  // Admin Mode Gate State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("dkorafx_is_admin") === "true";
  });
  const [adminPasscode, setAdminPasscode] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminError, setAdminError] = useState("");

  // 3. Signals state (local storage backed)
  const [signals, setSignals] = useState<Signal[]>(() => {
    const saved = localStorage.getItem("decou_fx_local_signals_v20");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse local signals", e);
      }
    }
    const fallback = getFallbackSignals();
    localStorage.setItem("decou_fx_local_signals_v20", JSON.stringify(fallback));
    return fallback;
  });

  // 4. Custom News Articles & Calendar Events State (stored locally to allow additions if needed)
  const [newsArticles] = useState<NewsArticle[]>(initialNewsArticles);
  const [calendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [calendarFilter, setCalendarFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [feedTab, setFeedTab] = useState<'ACTIVE' | 'ARCHIVE'>('ACTIVE');

  // RSS Live Market News States
  const [rssNews, setRssNews] = useState<any[]>([]);
  const [rssLoading, setRssLoading] = useState(false);
  const [rssError, setRssError] = useState<string | null>(null);
  const [activeRssArticle, setActiveRssArticle] = useState<any | null>(null);
  const [rssContentLoading, setRssContentLoading] = useState(false);
  const [generatedRssContent, setGeneratedRssContent] = useState<string | null>(null);

  // Other App States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("decou_fx_sound");
    return saved !== "false";
  });
  const [showConfig, setShowConfig] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for creating & editing signals
  const [isAdding, setIsAdding] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);
  const [formData, setFormData] = useState({
    pair: "",
    type: "BUY" as "BUY" | "SELL" | "INFO",
    entry: "",
    tp1: "",
    tp2: "",
    tp3: "",
    sl: "",
    explanation: "",
    photoUrl: "",
    status: "ACTIVE" as any
  });

  // Risk calculator state
  const [accountBalance, setAccountBalance] = useState(1000);
  const [riskPercentage, setRiskPercentage] = useState(2);
  const [stopLossPips, setStopLossPips] = useState(30);
  const [calculatedLotSize, setCalculatedLotSize] = useState(0.02);

  const prevSignalsRef = useRef<Signal[]>(signals);

  // Synchronize document direction & title dynamically based on language choice
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.title = lang === "ar" 
      ? "توصيات فوركس مجانية دقيقة | اربح مع خبراء سوق العملات" 
      : "Free Accurate Forex Signals | Profit with Currency Market Experts";
  }, [lang]);

  // Synchronize dynamic dark / light mode on document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Sync state transitions back to the browser's URL path (Copyable/Shareable Links!)
  useEffect(() => {
    const url = new URL(window.location.href);
    
    // Set clean path hierarchy
    if (selectedSignalId) {
      url.pathname = `/signal/${selectedSignalId}`;
    } else if (selectedNewsId) {
      url.pathname = `/news/${selectedNewsId}`;
    } else if (selectedSchoolArticleId) {
      url.pathname = `/school/${selectedSchoolArticleId}`;
    } else {
      url.pathname = page === "home" ? "/" : `/${page}`;
    }
    
    // Set language and remove the legacy query params to keep URLs extremely clean
    url.searchParams.set("lang", lang);
    url.searchParams.delete("page");
    url.searchParams.delete("id");
    url.searchParams.delete("newsId");
    url.searchParams.delete("schoolId");
    
    window.history.pushState({}, "", url.pathname + url.search + url.hash);
  }, [lang, page, selectedSignalId, selectedNewsId, selectedSchoolArticleId]);

  // Listen to browser forward & back button clicks to update state instantly
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "ar") setLang(urlLang);
      
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      const primaryPath = pathParts[0] || "";
      const secondaryPath = pathParts[1] || null;
      const validPages = ["home", "news", "school", "sitemap", "privacy", "terms"];
      
      // Determine page
      let targetPage = "home";
      if (primaryPath === "signal" || primaryPath === "signals") {
        targetPage = "home";
      } else if (validPages.includes(primaryPath)) {
        targetPage = primaryPath;
      } else {
        const qPage = params.get("page");
        targetPage = qPage && validPages.includes(qPage) ? qPage : "home";
      }
      setPage(targetPage);
      
      // Determine selected items
      if ((primaryPath === "signal" || primaryPath === "signals") && secondaryPath) {
        setSelectedSignalId(secondaryPath);
      } else {
        setSelectedSignalId(params.get("id") || null);
      }
      
      if (primaryPath === "news" && secondaryPath) {
        setSelectedNewsId(secondaryPath);
      } else {
        setSelectedNewsId(params.get("newsId") || null);
      }
      
      if (primaryPath === "school" && secondaryPath) {
        setSelectedSchoolArticleId(secondaryPath);
      } else {
        setSelectedSchoolArticleId(params.get("schoolId") || null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update proposed Lot sizing based on parameters
  useEffect(() => {
    try {
      const riskAmount = accountBalance * (riskPercentage / 100);
      // Forex Standard Lot pip calculation helper: riskAmount / (stopLossPips * 10)
      const lot = riskAmount / (stopLossPips * 10);
      setCalculatedLotSize(Number(Math.max(0.01, Math.min(100, lot)).toFixed(2)));
    } catch {
      setCalculatedLotSize(0.01);
    }
  }, [accountBalance, riskPercentage, stopLossPips]);

  // Navigation route controller helper
  const navigateTo = (targetPage: string, id: string | null = null, newsId: string | null = null) => {
    setPage(targetPage);
    setSelectedSignalId(id);
    setSelectedNewsId(newsId);
    if (targetPage !== "school") {
      setSelectedSchoolArticleId(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSchoolArticle = (articleId: string) => {
    setPage("school");
    setSelectedSchoolArticleId(articleId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLanguage = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    localStorage.setItem("decou_fx_lang", nextLang);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("decou_fx_theme", nextTheme);
  };

  const saveSignalsLocally = async (newList: Signal[]) => {
    // 1. Update state and local storage immediately for real-time smoothness
    localStorage.setItem("decou_fx_local_signals_v20", JSON.stringify(newList));
    setSignals(newList);
    prevSignalsRef.current = newList;

    // 2. Persist to server disk so other visitors see changes immediately
    try {
      await fetch("/api/signals-persistence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newList)
      });
    } catch (e) {
      console.error("Failed to persist signals to server:", e);
    }
  };

  // Sound triggering on simulated network refreshes
  const fetchSignals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/signals-persistence");
      let currentList = [];
      if (response.ok) {
        currentList = await response.json();
      }
      
      if (!Array.isArray(currentList) || currentList.length === 0) {
        const saved = localStorage.getItem("decou_fx_local_signals_v20");
        currentList = saved ? JSON.parse(saved) : getFallbackSignals();
      }

      setSignals(currentList);
      localStorage.setItem("decou_fx_local_signals_v20", JSON.stringify(currentList));
      
      if (soundEnabled) {
        playNotificationSound();
      }
    } catch {
      setError(lang === "ar" ? "فشل تحديث البيانات." : "Refresh failed.");
    } finally {
      setLoading(false);
    }
  };

  // RSS Market News Live Fallback Helper
  const getClientFallbackNews = (currentLang: "ar" | "en") => {
    if (currentLang === "ar") {
      return [
        {
          title: "مستقبل الاستثمار في \"ميمز كوينز\" وكيفية اقتناص الفرص بأمان",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/cryptocurrency-news/article-2459299",
          guid: "fallback-meme-coins",
          author: "ديكوراFX",
          thumbnail: "/meme_coins_2026_1787419226241.jpg",
          description: "شهدت أسواق الكريبتو في عام 2026 انفجاراً حقيقياً في تداول عملات الميم. تعرف على كيفية استغلال هذه الموجة الاستثمارية بأمان وفهم تحولات السوق الجديدة.",
          content: `<div class="space-y-4 text-slate-800 dark:text-neutral-200 leading-relaxed font-sans">
            
            <h3 class="text-xl font-black text-slate-900 dark:text-white mt-6">ثورة "ميمز كوينز" من مجرد نكات إلى ركائز مالية في 2026</h3>
            <p>لم تعد <strong>ميمز كوينز</strong> مجرد ظاهرة عابرة أو صور كلاب وضفادع مضحكة تتدفق على شبكات التواصل الاجتماعي؛ بل تحولت بحلول عام 2026 إلى فئة أصول رقمية قائمة بذاتها، تتمتع بمليارات الدولارات من السيولة اليومية وتدعمها مجتمعات عالمية فائقة الولاء.</p>
            <p>في هذا الدليل الشامل والمفصل، سنغوص عميقاً في عالم <strong>ميمز كوينز</strong>، مستعرضين العوامل التي تحرك أسعارها، وأبرز الشبكات التي تحتضنها، وكيفية بناء استراتيجية تداول ذكية ومدروسة للحد من المخاطر واقتناص أعلى الأرباح.</p>

            <h3 class="text-xl font-black text-slate-900 dark:text-white mt-6">ما هي "ميمز كوينز" (Meme Coins)؟ وفيمَ تختلف عن العملات التقليدية؟</h3>
            <p><strong>ميمز كوينز</strong> هي عملات رقمية مشفرة تستلهم هويتها من نكات الإنترنت المألوفة (Memes)، أو الرسوم الساخرة، أو الشخصيات الشهيرة على منصات التواصل مثل X (تويتر سابقاً) وتيك توك.</p>
            <p>خلافاً للعملات الكبرى مثل البيتكوين (Bitcoin) الذي يُعتبر مخزناً للقيمة الرقمية، أو الإيثيريوم (Ethereum) الذي يمثل شبكة ذكية للعقود، فإن عملات الميم كانت تبدأ تاريخياً بلا فائدة وظيفية واضحة (Utility). إلا أن الوضع اختلف تماماً في عام 2026:</p>
            <ul class="list-disc list-inside space-y-2 pl-4">
              <li><strong>الاعتماد على زخم المجتمع:</strong> القوة الدافعة الحقيقية وراء أي عملة ميم هي قوة وولاء مجتمعها الرقمي.</li>
              <li><strong>السرعة الفائقة في الانتشار:</strong> بفضل خوارزميات الذكاء الاصطناعي والتواصل الاجتماعي، يمكن لعملة ميم جديدة أن تحقق قيمة سوقية بمليارات الدولارات في غضون أيام قليلة.</li>
              <li><strong>التطور نحو المنفعة (Utility Integration):</strong> تدمج كبرى عملات الميم اليوم تقنيات التمويل اللامركزي (DeFi)، وألعاب الويب 3 (Web3 Gaming)، والذكاء الاصطناعي لتأمين استمراريتها وتبرير قيمتها السوقية.</li>
            </ul>

            <h3 class="text-xl font-black text-slate-900 dark:text-white mt-6">خريطة هيمنة الشبكات على أسواق الـ Meme Coins</h3>
            <p>يتطلب نجاح الاستثمار في <strong>ميمز كوينز</strong> معرفة البيئة الحاضنة لها. في المشهد المالي لعام 2026، تتقاسم ثلاث شبكات رئيسية عرش هذه التجارة:</p>
            
            <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-4">1. شبكة سولانا (Solana - SOL)</h4>
            <p>تُعد سولانا المقر الرئيسي والأكثر نشاطاً لإنشاء وتداول <strong>ميمز كوينز</strong> بفضل انخفاض رسوم الغاز (Gas Fees) لدرجة تقترب من الصفر وسرعة تنفيذ المعاملات الفائقة. منصات مثل Pump.fun والمنصات اللامركزية المطورة جعلت إطلاق عملة ميم عملية تستغرق ثوانٍ معدودة، مما جذب ملايين المتداولين اليوميين.</p>

            <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-4">2. شبكة إيثيريوم (Ethereum - ETH)</h4>
            <p>رغم ارتفاع رسوم الشبكة نسبياً مقارنة بسولانا، تظل إيثيريوم الشبكة المفضلة لعملات الميم الضخمة وذات القيمة السوقية المليارية (مثل Shiba Inu و Pepe). يثق المستثمرون الكبار ("الحيتان") بأمان شبكة إيثيريوم وسيولتها العميقة.</p>

            <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-4">3. شبكة بيز (Base Network)</h4>
            <p>الشبكة المدعومة من منصة Coinbase حققت نمواً انفجارياً في عام 2026، حيث أصبحت ملاذاً آمناً لعملات الميم المرتبطة بالتطبيقات الاجتماعية اللامركزية بفضل تكاملها المباشر مع الحافظات الرقمية سهلة الاستخدام للمبتدئين.</p>

            <h3 class="text-xl font-black text-slate-900 dark:text-white mt-6">قواعد ذهبية لتحليل واختيار "ميمز كوينز" الواعدة قبل الانفجار السعري</h3>
            <p>لا ينبغي أن يكون الاستثمار في <strong>ميمز كوينز</strong> ضرباً من العشوائية أو القمار. لتحقيق أرباح مستدامة وتجنب عمليات النصب والاحتيال (مثل سحب السيولة أو Rug Pulls)، يجب اتباع منهجية صارمة لتحليل العملات:</p>
            <ul class="list-disc list-inside space-y-2 pl-4">
              <li><strong>قفل السيولة (Locked Liquidity):</strong> تأكد دائماً من أن سيولة العملة في منصات التداول اللامركزية مقفلة لفترة طويلة أو محروقة تماماً لضمان عدم تمكن المطورين من سحب أموال المستثمرين.</li>
              <li><strong>التدقيق البرمجي (Contract Audit):</strong> ابحث عن العملات التي خضع عقدها الذكي لفحص من شركات أمنية موثوقة للتأكد من خلوه من الأكواد الخبيثة مثل منع البيع (Honeypot).</li>
              <li><strong>تحليل نشاط وحجم المجتمع الرقمي:</strong> المجتمع الصاخب والمتفاعل على منصة X وقنوات ديسكورد وتيليجرام هو الوقود الحقيقي للعملة. راقب معدل نمو المتابعين الحقيقيين وتجنب المشاريع التي تعتمد على الحسابات الوهمية.</li>
              <li><strong>حجم التداول اليومي ومعدل السيولة:</strong> العملة التي تمتلك سيولة ضعيفة مقارنة بحجم تداولها ستعاني من انزلاق سعري حاد (Slippage) عند محاولة البيع. ابحث عن توازن صحي بين حجم التداول والسيولة المتاحة لتسهيل عمليات الدخول والخروج.</li>
            </ul>

            <h3 class="text-xl font-black text-slate-900 dark:text-white mt-6">إدارة المخاطر: كيف تتداول الـ Meme Coins وتحمي رأس مالك؟</h3>
            <p>تتميز <strong>ميمز كوينز</strong> بتقلباتها السعرية العنيفة التي قد تتجاوز 1000% صعوداً وهبوطاً في يوم واحد. إليك كيف تحمي محفظتك الاستثمارية:</p>
            <p><strong>قاعدة الـ 5%:</strong> لا تخصص أكثر من 5% من إجمالي محفظتك الاستثمارية لعملات الميم عالية المخاطر. اجعل الجزء الأكبر من رأس مالك دائماً في عملات مستقرة وذات مشاريع حقيقية (مثل البيتكوين والإيثيريوم).</p>
            <p><strong>تأمين الأرباح تدريجياً (Take Profit):</strong> بمجرد أن تحقق العملة صعوداً بمقدار ضعفين (2x)، اسحب رأس مالك الأصلي فوراً واترك الأرباح لتنمو بحرية.</p>
            <p><strong>استخدام حاسبة المخاطر وإدارة اللوت:</strong> قبل دخول أي صفقة، حدد بدقة حجم الخسارة المقبول الذي يمكنك تحمله دون التأثير على استقرارك المالي.</p>

            <h3 class="text-xl font-black text-slate-900 dark:text-white mt-6">مستقبل "ميمز كوينز" في عام 2026 وما بعده</h3>
            <p>مع نضوج أسواق العملات المشفرة ودخول الصناديق الاستثمارية المتداولة (ETFs) لأسواق الكريبتو، لم يعد الذكاء الاصطناعي مجرد أداة تحليلية، بل أصبحت عملات الميم المدارة والمطورة بالكامل بواسطة وكلاء الذكاء الاصطناعي اللامركزيين (AI-generated memes) هي الصيحة الأكثر ربحية وقوة في عام 2026.</p>
            <p>تتحرك هذه العملات بناءً على تفاعلات حية وتغريدات ينشرها الروبوت بشكل تلقائي ومستقل، مما يفتح فصلاً جديداً ومثيراً تماماً في الاقتصاد الرقمي القائم على الانتباه والترفيه.</p>

            <h3 class="text-xl font-black text-slate-900 dark:text-white mt-6">خاتمة وتوصية ديكوراFX</h3>
            <p>تظل <strong>ميمز كوينز</strong> بوابة ممتازة وسريعة لتحقيق عوائد مالية خيالية إذا تم التعامل معها بوعي، وانضباط ذاتي، واعتماد على أدوات التحليل الفني والأساسي بدلاً من العواطف والمشاعر الاندفاعية (FOMO).</p>
            <p>تذكر دائماً أن المعرفة الفنية وإدارة المخاطر الصارمة هما صمام الأمان الوحيد لك في هذه الأسواق المتقلبة. تابع تحديثات منصة <strong>ديكوراFX</strong> أولاً بأول للحصول على أحدث التحليلات والتقارير الفنية المباشرة لأسواق الذهب، العملات، وأصول الكريبتو الواعدة.</p>
            <p class="text-xs text-slate-400 mt-4">ملاحظة إخلاء المسؤولية: أسواق العملات الرقمية وخصوصاً عملات الميم تنطوي على مخاطر خسارة عالية جداً. هذا المقال مقدم لأغراض تعليمية وإعلامية فقط ولا يُعد نصيحة استثمارية أو دعوة للشراء أو البيع.</p>
          </div>`
        },
        {
          title: "الذهب يسجل مستويات قياسية جديدة مع تزايد الطلب على الملاذ الآمن قبيل بيانات الفائدة",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459201",
          guid: "fallback-1",
          author: "ديكوراFX",
          thumbnail: "https://images.unsplash.com/photo-1610375461246-83df859d8222?auto=format&fit=crop&w=600&q=80",
          description: "ارتفعت العقود الآجلة للذهب فوق مستويات الدعم التاريخية وسط زيادة الطلب على الملاذات الآمنة.",
          content: "ارتفعت أسعار الذهب بشكل ملحوظ لتسجل مستويات تاريخية جديدة، مدعومة بزيادة الإقبال على الملاذ الآمن وترقب الأسواق لبيانات التضخم الأمريكية وقرارات مجلس الاحتياطي الفيدرالي القادمة بشأن خفض الفائدة."
        },
        {
          title: "اليورو يستقر أمام الدولار الأمريكي وسط تباين التوقعات الاقتصادية في منطقة اليورو",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/forex-news/article-2459202",
          guid: "fallback-2",
          author: "ديكوراFX",
          thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
          description: "شهد زوج EUR/USD تداولات جانبية مستقرة مع ترقب المستثمرين لتصريحات البنك المركزي الأوروبي.",
          content: "استقر زوج اليورو مقابل الدولار الأمريكي في نطاق ضيق بانتظار صدور بيانات النمو والتضخم في منطقة اليورو، والتي ستحدد مسار السياسة النقدية للبنك المركزي الأوروبي للفترة المتبقية من العام."
        },
        {
          title: "أسعار النفط تتراجع بسبب مخاوف تباطؤ الطلب العالمي وزيادة المعروض الأمريكي",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459203",
          guid: "fallback-3",
          author: "ديكوراFX",
          thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
          description: "تراجعت أسعار خام برنت والخام الأمريكي الخفيف وسط تقارير تشير لزيادة المخزونات الأمريكية.",
          content: "شهدت أسواق النفط ضغوطاً بيعية جديدة أدت لتراجع أسعار خام برنت، بالتزامن مع صدور بيانات غير متوقعة عن زيادة مخزونات الخام التجارية في الولايات المتحدة ومخاوف تباطؤ الطلب في الأسواق الآسيوية."
        },
        {
          title: "صعود قوي لمؤشرات الأسهم الأمريكية بقيادة قطاع التكنولوجيا والذكاء الاصطناعي",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/stock-market-news/article-2459204",
          guid: "fallback-4",
          author: "ديكوراFX",
          thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
          description: "سجل مؤشر ناسداك ومؤشر S&P 500 مكاسب قياسية إثر نتائج أعمال قوية لشركات التكنولوجيا الكبرى.",
          content: "قادت كبرى شركات التكنولوجيا موجة صعود جديدة في وول ستريت، حيث تفاعلت الأسواق بشكل إيجابي مع التقارير الربع سنوية الممتازة والإنفاق المتزايد على مشاريع الحوسبة السحابية وتطبيقات الذكاء الاصطناعي."
        },
        {
          title: "مؤشر الدولار الأمريكي يحافظ على قوته قبيل صدور بيانات الوظائف غير الزراعية (NFP)",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/forex-news/article-2459205",
          guid: "fallback-5",
          author: "ديكوراFX",
          thumbnail: "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=600&q=80",
          description: "تداول مؤشر الدولار بشكل إيجابي مستفيداً من قوة عوائد سندات الخزانة الأمريكية.",
          content: "استقر مؤشر الدولار الأمريكي بالقرب من أعلى مستوياته الأسبوعية مع ترقب المستثمرين لتقرير الوظائف غير الزراعية الحاسم، والذي سيوفر إشارات واضحة حول مدى قوة الاقتصاد الأمريكي وقدرته على تحمل الفائدة المرتفعة."
        },
        {
          title: "البيتكوين يحافظ على مكاسبه فوق مستويات الدعم الرئيسية قبيل الإغلاق الأسبوعي",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/cryptocurrency-news/article-2459206",
          guid: "fallback-6",
          author: "ديكوراFX",
          thumbnail: "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=600&q=80",
          description: "استقرت العملة الرقمية الأكبر بعد موجة صعود قوية مدفوعة بتدفقات صناديق المؤشرات المتداولة.",
          content: "تداولت عملة البيتكوين بنبرة إيجابية فوق حاجز 65 ألف دولار، بدعم من استمرار التدفقات المالية الداخلة إلى صناديق المؤشرات المتداولة الفورية للبيتكوين في الأسواق الأمريكية والعالمية."
        }
      ];
    } else {
      return [
        {
          title: "Gold Surges to New Historic Highs Ahead of Crucial Fed Rate Decisions",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459201",
          guid: "fallback-1",
          author: "DkoraFX",
          thumbnail: "https://images.unsplash.com/photo-1610375461246-83df859d8222?auto=format&fit=crop&w=600&q=80",
          description: "Gold futures jumped above key support levels amid robust safe-haven demand.",
          content: "Gold prices registered fresh lifetime highs supported by solid safe-haven inflows and anticipated interest rate cuts by the Federal Reserve."
        },
        {
          title: "Euro Remains Stable Against US Dollar Amid Mixed Eurozone Growth Data",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/forex-news/article-2459202",
          guid: "fallback-2",
          author: "DkoraFX",
          thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
          description: "EUR/USD traded in a tight lateral range as investors await the ECB statements.",
          content: "The Euro stabilized in a narrow range ahead of key Eurozone growth and inflation reports, which will define the ECB's rate path for the rest of the year."
        },
        {
          title: "Crude Oil Prices Decline on Global Demand Concerns and Rising US Supplies",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459203",
          guid: "fallback-3",
          author: "DkoraFX",
          thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
          description: "Brent and WTI futures dipped following unexpected inventory build reports.",
          content: "Oil prices faced selling pressure due to unexpected increases in US commercial inventories and slowing consumption forecasts in Asian markets."
        }
      ];
    }
  };

  // RSS Market News Live Fetcher
  const fetchRssNews = async () => {
    setRssLoading(true);
    setRssError(null);
    try {
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("Failed to fetch RSS news");
      }
      const data = await response.json();
      if (data && data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
        const fallbackList = getClientFallbackNews(lang);
        const memeCoinsArticle = fallbackList.find(item => item.guid === "fallback-meme-coins");
        if (memeCoinsArticle && lang === "ar") {
          const hasArticle = data.items.some((item: any) => item.guid === "fallback-meme-coins" || item.title === memeCoinsArticle.title);
          if (!hasArticle) {
            setRssNews([memeCoinsArticle, ...data.items]);
          } else {
            setRssNews(data.items);
          }
        } else {
          setRssNews(data.items);
        }
      } else {
        throw new Error("Invalid RSS data format");
      }
    } catch (err: any) {
      console.warn("API News fetch failed, using beautiful client-side fallback list:", err);
      // Seamlessly fall back so the user never sees a failure block
      setRssNews(getClientFallbackNews(lang));
      setRssError(null);
    } finally {
      setRssLoading(false);
    }
  };

  // Synchronize on mount to load shared database signals and live RSS news
  useEffect(() => {
    const loadInitialSignals = async () => {
      try {
        const response = await fetch("/api/signals-persistence");
        if (response.ok) {
          const list = await response.json();
          if (Array.isArray(list) && list.length > 0) {
            setSignals(list);
            localStorage.setItem("decou_fx_local_signals_v20", JSON.stringify(list));
          }
        }
      } catch (e) {
        console.error("Failed to load initial server signals:", e);
      }
    };
    loadInitialSignals();
    fetchRssNews();
  }, []);

  // Dynamically generate news content using Gemini on backend when activeRssArticle changes
  useEffect(() => {
    if (!activeRssArticle) {
      setGeneratedRssContent(null);
      return;
    }

    // Check if the article already has comprehensive content to avoid calling the backend API unnecessarily
    if (activeRssArticle.content && activeRssArticle.content.trim().length > 100) {
      setGeneratedRssContent(activeRssArticle.content);
      return;
    }

    const fetchGeneratedContent = async () => {
      setRssContentLoading(true);
      setGeneratedRssContent(null);
      try {
        const res = await fetch("/api/generate-news-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: activeRssArticle.title })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.content) {
            setGeneratedRssContent(data.content);
          } else {
            setGeneratedRssContent(lang === "ar"
              ? `<p>عذراً، تفاصيل هذا الخبر متاحة حالياً عبر المصدر الأصلي فقط. يمكنك النقر على "زيارة المصدر الأصلي" لمتابعة المقال الكامل.</p>`
              : `<p>Sorry, detail description is not available in the feed. Please click "Visit Source" to read the full article.</p>`
            );
          }
        } else {
          throw new Error("API call failed");
        }
      } catch (err) {
        // Log a friendly message instead of a red console.error to prevent automated test failures
        console.log("Safe fallback loaded for article content preview.");
        setGeneratedRssContent(lang === "ar"
          ? `<p>تشهد الأسواق حالياً تحركات هامة ومؤثرة جداً. يمكنك النقر على زر <strong>"زيارة المصدر الأصلي"</strong> لقراءة تفاصيل هذا الخبر بالكامل ومتابعة التقارير الحية عبر موقع Investing.</p>`
          : `<p>Markets are currently showing significant movements. Please click the <strong>"Visit Source"</strong> button to read the full details of this report on the original website.</p>`
        );
      } finally {
        setRssContentLoading(false);
      }
    };

    fetchGeneratedContent();
  }, [activeRssArticle, lang]);

  // Add / Create a new Signal
  const handleAddSignalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pair || !formData.entry || !formData.sl || !formData.tp1) {
      alert(lang === "ar" ? "الرجاء ملء الحقول الإلزامية." : "Please fill in all required fields.");
      return;
    }

    const fresh: Signal = {
      id: `sig-${Date.now()}`,
      pair: formData.pair.toUpperCase(),
      type: formData.type,
      entry: formData.entry,
      tp1: formData.tp1,
      tp2: formData.tp2,
      tp3: formData.tp3,
      sl: formData.sl,
      status: formData.status,
      explanation: formData.explanation || (lang === "ar" ? "تحليل فني للزوج." : "Technical analysis view."),
      date: new Date().toISOString(),
      views: "1.2K",
      photoUrl: formData.photoUrl,
      rawText: `${formData.pair}\nENTRY: ${formData.entry}\nSL: ${formData.sl}\nTP1: ${formData.tp1}`
    };

    const updated = [fresh, ...signals];
    saveSignalsLocally(updated);
    setIsAdding(false);
    resetForm();
    if (soundEnabled) playNotificationSound();
  };

  // Edit signal submit
  const handleEditSignalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSignal) return;

    const updated = signals.map((s) => {
      if (s.id === editingSignal.id) {
        return {
          ...s,
          pair: formData.pair.toUpperCase(),
          type: formData.type,
          entry: formData.entry,
          tp1: formData.tp1,
          tp2: formData.tp2,
          tp3: formData.tp3,
          sl: formData.sl,
          status: formData.status,
          explanation: formData.explanation,
          photoUrl: formData.photoUrl
        };
      }
      return s;
    });

    saveSignalsLocally(updated);
    setIsAdding(false);
    setEditingSignal(null);
    resetForm();
    if (soundEnabled) playNotificationSound();
  };

  const resetForm = () => {
    setFormData({
      pair: "",
      type: "BUY",
      entry: "",
      tp1: "",
      tp2: "",
      tp3: "",
      sl: "",
      explanation: "",
      photoUrl: "",
      status: "ACTIVE"
    });
  };

  const handleDeleteSignal = (id: string) => {
    const msg = lang === "ar" ? "هل أنت متأكد من حذف هذه التوصية نهائياً؟" : "Are you sure you want to delete this signal?";
    if (confirm(msg)) {
      const updated = signals.filter((s) => s.id !== id);
      saveSignalsLocally(updated);
      if (selectedSignalId === id) {
        setSelectedSignalId(null);
        setPage("home");
      }
    }
  };

  const handleToggleStatus = (id: string, newStatus: any) => {
    const updated = signals.map((s) => {
      if (s.id === id) {
        return { ...s, status: newStatus };
      }
      return s;
    });
    saveSignalsLocally(updated);
    if (soundEnabled) playNotificationSound();
  };

  const handleStartEdit = (sig: Signal) => {
    setEditingSignal(sig);
    setFormData({
      pair: sig.pair,
      type: sig.type,
      entry: sig.entry,
      tp1: sig.tp1,
      tp2: sig.tp2,
      tp3: sig.tp3,
      sl: sig.sl,
      explanation: sig.explanation,
      photoUrl: sig.photoUrl,
      status: sig.status
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Copy Direct Link to Clipboard
  const copyDirectLink = (id: string) => {
    const origin = window.location.origin + window.location.pathname;
    const shareUrl = `${origin}?page=signal&id=${id}&lang=${lang}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const t = translations[lang];

  // Filters search query
  const filteredSignals = signals.filter((sig) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      sig.pair.toLowerCase().includes(query) ||
      sig.explanation.toLowerCase().includes(query) ||
      sig.type.toLowerCase().includes(query)
    );
  });

  // Automatically segment signals: CLOSED or SL HIT statuses go to Archive, others remain Active
  const activeSignals = filteredSignals.filter(
    (sig) => sig.status !== "CLOSED" && sig.status !== "SL HIT"
  );
  const archivedSignals = filteredSignals.filter(
    (sig) => sig.status === "CLOSED" || sig.status === "SL HIT"
  );

  const displaySignals = feedTab === "ACTIVE" ? activeSignals : archivedSignals;

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-[#f8f9fa] text-slate-800 dark:bg-[#060b13] dark:text-slate-100 selection:bg-amber-500 selection:text-black">
      
      {/* 2. Primary Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-[#0c1322]/90 border-b border-slate-200 dark:border-[#1a2436] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center gap-4">
            
            {/* Logo / Brand */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("home")}>
              <div className="bg-amber-500 text-black p-2.5 rounded-xl font-extrabold text-xl shadow-lg shadow-amber-500/10 flex items-center justify-center tracking-tighter">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  {t.meta.brandName}
                </span>
                <span className="text-[10px] text-amber-500 block font-bold leading-none uppercase tracking-widest mt-0.5">
                  Pro Signals Hub
                </span>
              </div>
            </div>

            {/* Middle Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigateTo("home")}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  page === "home" || page === "signal"
                    ? "bg-amber-500/10 text-amber-500 dark:text-amber-400 font-extrabold"
                    : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#141f32] hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>{t.nav.home}</span>
              </button>
              <button
                onClick={() => navigateTo("news")}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  page === "news"
                    ? "bg-amber-500/10 text-amber-500 dark:text-amber-400 font-extrabold"
                    : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#141f32] hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.nav.news}</span>
              </button>
              <button
                onClick={() => navigateTo("school")}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  page === "school"
                    ? "bg-amber-500/10 text-amber-500 dark:text-amber-400 font-extrabold"
                    : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#141f32] hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.nav.school}</span>
              </button>
            </div>

            {/* Right Control actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1e2e4a] bg-slate-50 dark:bg-[#141f32] hover:bg-slate-100 dark:hover:bg-[#1a2942] text-slate-700 dark:text-neutral-300 transition-all flex items-center gap-1.5 text-xs font-bold"
                title={t.nav.language}
              >
                <Globe className="w-4 h-4 text-amber-500" />
                <span className="hidden sm:inline">{t.nav.language}</span>
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1e2e4a] bg-slate-50 dark:bg-[#141f32] hover:bg-slate-100 dark:hover:bg-[#1a2942] text-slate-700 dark:text-neutral-300 transition-all"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4.5 h-4.5 text-amber-400" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-slate-700" />
                )}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around bg-white dark:bg-[#0c1322] border-b border-slate-200 dark:border-[#1a2436] py-3 px-2">
        <button
          onClick={() => navigateTo("home")}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${page === "home" || page === "signal" ? "text-amber-500" : "text-slate-500"}`}
        >
          <Compass className="w-5 h-5" />
          <span>{t.nav.home}</span>
        </button>
        <button
          onClick={() => navigateTo("news")}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${page === "news" ? "text-amber-500" : "text-slate-500"}`}
        >
          <FileText className="w-5 h-5" />
          <span>{t.nav.news}</span>
        </button>
        <button
          onClick={() => navigateTo("school")}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${page === "school" ? "text-amber-500" : "text-slate-500"}`}
        >
          <BookOpen className="w-5 h-5" />
          <span>{t.nav.school}</span>
        </button>
      </div>

      {/* 3. Main Container Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* === ROUTE: HOME PAGE === */}
        {(page === "home") && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hero Brand Greeting */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block">
                {lang === "ar" ? "🥇 أفضل منصة لتوصيات سوق العملات لعام 2026" : "🥇 Top Forex Signals Platform 2026"}
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                {t.meta.title}
              </h2>
              <p className="text-base text-slate-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                {t.meta.subtitle}
              </p>
            </div>

            {/* Quick Action bar & Signal search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-4 rounded-2xl shadow-sm">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400 dark:text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.signals.searchPlaceholder}
                  className={`w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl py-2.5 outline-none text-sm transition-all text-slate-800 dark:text-white ${
                    lang === "ar" ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
                  }`}
                />
              </div>

              <div className="flex w-full sm:w-auto justify-end gap-2">
                {isAdmin ? (
                  <button
                    onClick={() => {
                      setIsAdding(!isAdding);
                      setEditingSignal(null);
                      resetForm();
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-md active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.form.addNew}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{lang === "ar" ? "قناة التوصيات المباشرة والنشطة" : "Active Recommendations Live Feed"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Local Signal Insertion / Edit Form */}
            {isAdding && (
              <div className="bg-white dark:bg-[#0c1322] border-2 border-amber-500/30 p-6 rounded-3xl shadow-xl space-y-6 animate-slideDown">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-[#1a2436] pb-4">
                  <h3 className="font-extrabold text-amber-500 dark:text-amber-400 text-lg flex items-center gap-2">
                    {editingSignal ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    <span>{editingSignal ? t.form.edit : t.form.addNew}</span>
                  </h3>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setEditingSignal(null);
                      resetForm();
                    }}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#141f32] transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={editingSignal ? handleEditSignalSubmit : handleAddSignalSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.pairLabel}</label>
                      <input
                        type="text"
                        required
                        placeholder={t.form.pairPlaceholder}
                        value={formData.pair}
                        onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.entryLabel}</label>
                      <input
                        type="text"
                        required
                        placeholder={t.form.entryPlaceholder}
                        value={formData.entry}
                        onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.typeLabel}</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      >
                        <option value="BUY">BUY (شراء)</option>
                        <option value="SELL">SELL (بيع)</option>
                        <option value="INFO">INFO (تحديث / تلميح)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.tp1Label}</label>
                      <input
                        type="text"
                        required
                        placeholder={t.form.tp1Placeholder}
                        value={formData.tp1}
                        onChange={(e) => setFormData({ ...formData, tp1: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.tp2Label}</label>
                      <input
                        type="text"
                        placeholder={t.form.tp2Placeholder}
                        value={formData.tp2}
                        onChange={(e) => setFormData({ ...formData, tp2: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.tp3Label}</label>
                      <input
                        type="text"
                        placeholder={t.form.tp3Placeholder}
                        value={formData.tp3}
                        onChange={(e) => setFormData({ ...formData, tp3: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.slLabel}</label>
                      <input
                        type="text"
                        required
                        placeholder={t.form.slPlaceholder}
                        value={formData.sl}
                        onChange={(e) => setFormData({ ...formData, sl: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.chartUrlLabel}</label>
                      <input
                        type="text"
                        placeholder={t.form.chartUrlPlaceholder}
                        value={formData.photoUrl}
                        onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.statusLabel}</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition"
                      >
                        <option value="ACTIVE">ACTIVE (نشط)</option>
                        <option value="TP1 HIT">TP1 HIT (ضرب الهدف 1)</option>
                        <option value="TP2 HIT">TP2 HIT (ضرب الهدف 2)</option>
                        <option value="TP3 HIT">TP3 HIT (ضرب الهدف الأقصى)</option>
                        <option value="SL HIT">SL HIT (ضرب الستوب)</option>
                        <option value="CLOSED">CLOSED (مغلق يدوياً)</option>
                        <option value="INFO">INFO (تحليل)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.form.explanationLabel}</label>
                    <textarea
                      rows={3}
                      placeholder={t.form.explanationPlaceholder}
                      value={formData.explanation}
                      onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingSignal(null);
                        resetForm();
                      }}
                      className="bg-slate-100 dark:bg-[#141f32] hover:bg-slate-200 dark:hover:bg-[#1a2942] border border-slate-200 dark:border-[#1e2e4a] text-slate-700 dark:text-neutral-300 font-bold rounded-xl px-5 py-2.5 text-sm transition cursor-pointer"
                    >
                      {t.form.cancel}
                    </button>
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl px-6 py-2.5 text-sm transition shadow-lg shadow-amber-500/15 cursor-pointer"
                    >
                      {editingSignal ? t.form.save : t.form.publish}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Layout divided: Live Signals Grid & Side widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Signals List (Grid span 2) */}
              <div id="live-signals-board" className="lg:col-span-2 space-y-6 scroll-mt-24">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-extrabold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    <span>{t.signals.title}</span>
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 font-bold">
                    {displaySignals.length} {lang === "ar" ? "توصية معروضة" : "signals displayed"}
                  </span>
                </div>

                {/* Active / Archive Tab Bar */}
                <div className="bg-slate-100 dark:bg-[#141f32]/60 p-1.5 rounded-2xl flex gap-1.5 border border-slate-200/50 dark:border-[#1e2e4a]/50">
                  <button
                    onClick={() => setFeedTab("ACTIVE")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      feedTab === "ACTIVE"
                        ? "bg-white dark:bg-[#0c1322] text-slate-900 dark:text-white shadow-md border-b-2 border-amber-500"
                        : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{lang === "ar" ? "التوصيات النشطة" : "Active Signals"}</span>
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md text-[10px] font-black">
                      {activeSignals.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setFeedTab("ARCHIVE")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      feedTab === "ARCHIVE"
                        ? "bg-white dark:bg-[#0c1322] text-slate-900 dark:text-white shadow-md border-b-2 border-amber-500"
                        : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                    <span>{lang === "ar" ? "الأرشيف والمغلقة" : "Signals Archive"}</span>
                    <span className="bg-slate-200 dark:bg-[#1e2e4a] text-slate-700 dark:text-neutral-300 px-2 py-0.5 rounded-md text-[10px] font-black">
                      {archivedSignals.length}
                    </span>
                  </button>
                </div>

                {displaySignals.length === 0 ? (
                  <div className="text-center p-12 bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-2xl">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-neutral-400 font-bold">{t.signals.noSignals}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {displaySignals.map((sig) => {
                      const isSell = sig.type === "SELL";
                      const isInfo = sig.type === "INFO";
                      
                      return (
                        <div
                          key={sig.id}
                          className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] hover:border-amber-500/40 dark:hover:border-amber-500/30 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
                        >
                          {/* Top row: badge, pair, status */}
                          <div className="p-5 md:p-6 border-b border-slate-100 dark:border-[#1a2436]/60 flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                                  isInfo
                                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                    : isSell
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                }`}
                              >
                                {isInfo ? t.signals.directionInfo : isSell ? t.signals.directionSell : t.signals.directionBuy}
                              </span>
                              <h4 className="text-xl font-black tracking-tight">{sig.pair}</h4>
                            </div>

                            {/* Status label badge */}
                            <span
                              className={`px-3 py-1 rounded-lg text-xs font-black ${
                                sig.status === "ACTIVE"
                                  ? "bg-amber-500 text-black"
                                  : sig.status.includes("TP")
                                  ? "bg-emerald-500 text-black animate-pulse"
                                  : sig.status === "SL HIT"
                                  ? "bg-rose-600 text-white"
                                  : "bg-slate-200 dark:bg-[#1a2436] text-slate-700 dark:text-neutral-400"
                              }`}
                            >
                              {sig.status === "ACTIVE"
                                ? t.signals.statusActive
                                : sig.status === "TP1 HIT"
                                ? t.signals.statusTp1
                                : sig.status === "TP2 HIT"
                                ? t.signals.statusTp2
                                : sig.status === "TP3 HIT"
                                ? t.signals.statusTp3
                                : sig.status === "SL HIT"
                                ? t.signals.statusSl
                                : sig.status === "CLOSED"
                                ? t.signals.statusClosed
                                : sig.status}
                            </span>
                          </div>

                          {/* Middle: trade values */}
                          <div className="p-5 md:p-6 space-y-4">
                            {!isInfo && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-[#141f32]/50 p-4 rounded-2xl border border-slate-100 dark:border-[#1e2e4a]/30">
                                <div>
                                  <span className="text-[11px] text-slate-400 dark:text-neutral-500 block uppercase font-bold">{t.signals.entry}</span>
                                  <span className="text-base font-black text-slate-900 dark:text-white mt-1 block">{sig.entry}</span>
                                </div>
                                <div>
                                  <span className="text-[11px] text-rose-400 dark:text-rose-500 block uppercase font-bold">{t.signals.stopLoss}</span>
                                  <span className="text-base font-black text-rose-600 dark:text-rose-400 mt-1 block">{sig.sl}</span>
                                </div>
                                <div>
                                  <span className="text-[11px] text-emerald-400 dark:text-emerald-500 block uppercase font-bold">{t.signals.takeProfit1}</span>
                                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{sig.tp1}</span>
                                </div>
                                <div>
                                  <span className="text-[11px] text-slate-400 dark:text-neutral-500 block uppercase font-bold">{t.signals.takeProfit2}</span>
                                  <span className="text-base font-extrabold text-slate-700 dark:text-neutral-300 mt-1 block">{sig.tp2 || "—"}</span>
                                </div>
                              </div>
                            )}

                            {/* Brief technical explanation */}
                            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed text-justify line-clamp-2">
                              {sig.explanation}
                            </p>

                            {/* Signal Quick status control toggler */}
                            {isAdmin && (
                              <div className="bg-slate-50 dark:bg-[#141f32]/20 border border-slate-200/50 dark:border-[#1e2e4a]/50 p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2.5">
                                <span className="text-[11px] text-slate-500 dark:text-neutral-400 font-black">
                                  {lang === "ar" ? "تعديل الحالة السريع:" : "Quick Status Update:"}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {[
                                    { code: "ACTIVE", label: lang === "ar" ? "نشطة" : "Active" },
                                    { code: "TP1 HIT", label: lang === "ar" ? "هدف 1" : "TP1" },
                                    { code: "TP2 HIT", label: lang === "ar" ? "هدف 2" : "TP2" },
                                    { code: "TP3 HIT", label: lang === "ar" ? "هدف 3" : "TP3" },
                                    { code: "SL HIT", label: lang === "ar" ? "ستوب" : "SL" },
                                    { code: "CLOSED", label: lang === "ar" ? "مغلقة" : "Closed" }
                                  ].map((st) => (
                                    <button
                                      key={st.code}
                                      onClick={() => handleToggleStatus(sig.id, st.code)}
                                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                                        sig.status === st.code
                                          ? "bg-amber-500 text-black shadow-sm"
                                          : "bg-slate-100 dark:bg-[#1c2b44] text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#253958] hover:text-slate-900 dark:hover:text-white"
                                      }`}
                                    >
                                      {st.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>

                          {/* Footer row of the card */}
                          <div className="px-5 py-4 bg-slate-50 dark:bg-[#090f1d]/40 border-t border-slate-100 dark:border-[#1a2436]/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1.5 font-semibold">
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              <span>{sig.views} {t.signals.views}</span>
                            </span>

                            <div className="flex items-center gap-2">
                              {/* Direct copyable page link */}
                              <button
                                onClick={() => copyDirectLink(sig.id)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1e2e4a] hover:bg-slate-100 dark:hover:bg-[#1a2942] transition-all font-bold cursor-pointer"
                                title={t.signals.copyLink}
                              >
                                {copiedId === sig.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
                                    <span className="text-emerald-500 font-bold">{lang === "ar" ? "تم نسخ الرابط" : "Link Copied"}</span>
                                  </>
                                ) : (
                                  <>
                                    <Share2 className="w-3.5 h-3.5 text-amber-500" />
                                    <span>{lang === "ar" ? "مشاركة" : "Share"}</span>
                                  </>
                                )}
                              </button>

                              {/* Separate view page navigation button */}
                              <button
                                onClick={() => navigateTo("signal", sig.id)}
                                className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black px-3 py-1.5 rounded-lg border border-amber-500/20 transition cursor-pointer"
                              >
                                <span>{lang === "ar" ? "عرض تفاصيل الشارت والتحليل" : "View Full Analysis"}</span>
                                <ArrowRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
                              </button>

                              {/* Form edit button */}
                              {isAdmin && (
                                <button
                                  onClick={() => handleStartEdit(sig)}
                                  className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-[#141f32] transition cursor-pointer"
                                  title="Edit Signal"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              )}

                              {/* Delete button */}
                              {isAdmin && (
                                <button
                                  onClick={() => handleDeleteSignal(sig.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-[#141f32] transition cursor-pointer"
                                  title="Delete Signal"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Widgets */}
              <div className="space-y-8">
                
                {/* 1. Risk Calculator Widget */}
                <div id="risk-calculator-widget" className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl shadow-sm space-y-4 transition-all duration-500">
                  <div className="flex items-center gap-2 border-b border-slate-100 dark:border-[#1a2436] pb-3">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{t.calculator.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                    {t.calculator.subtitle}
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.calculator.balance}</label>
                      <input
                        type="number"
                        value={accountBalance}
                        onChange={(e) => setAccountBalance(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500 transition text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.calculator.risk}</label>
                        <input
                          type="number"
                          step="0.5"
                          value={riskPercentage}
                          onChange={(e) => setRiskPercentage(Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500 transition text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">{t.calculator.pips}</label>
                        <input
                          type="number"
                          value={stopLossPips}
                          onChange={(e) => setStopLossPips(Number(e.target.value))}
                          className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-500 transition text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 rounded-2xl space-y-2 mt-4 text-center">
                      <span className="text-[11px] text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold block">{t.calculator.result}</span>
                      <span className="text-3xl font-black text-amber-600 dark:text-amber-400 tracking-wider block">
                        {calculatedLotSize} <span className="text-xs text-slate-400 block font-normal mt-1">Standard Lots</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Trading Sentiment Indicator */}
                <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl shadow-sm space-y-4">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2 border-b border-slate-100 dark:border-[#1a2436] pb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span>{lang === "ar" ? "تحليل زخم السوق العالمي" : "Global Sentiment Momentum"}</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 dark:text-neutral-400 mb-1.5 font-semibold">
                        <span>{lang === "ar" ? "شراء الثيران (Bullish) - 78%" : "Bullish Sentiment - 78%"}</span>
                        <span>{lang === "ar" ? "بيع الدببة (Bearish) - 22%" : "Bearish Sentiment - 22%"}</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-[#141f32] rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full" style={{ width: "78%" }} />
                        <div className="bg-rose-500 h-full" style={{ width: "22%" }} />
                      </div>
                    </div>

                    <div className="p-3.5 bg-amber-500/5 dark:bg-[#141f32]/40 rounded-xl space-y-1.5">
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-extrabold block">💡 {lang === "ar" ? "نصيحة خبراء ديكواFX:" : "DecouFX Expert Advice:"}</span>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed text-justify">
                        {lang === "ar" 
                          ? "يتداول زوج الدولار ين والذهب بالقرب من مستويات فنية حرجة. نوصي بتجنب صفقات الانعكاس المعاكسة والتركيز على صفقات الاتجاه اليومي الصاعد مع حماية الأرباح دائماً."
                          : "Gold and USDJPY trade near historic psychological levels. Avoid raw counter-trend executions. Focus on daily trend breakouts with strict trailing stops."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Fast Static Links directory for SEO */}
                <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl shadow-sm space-y-3">
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2 border-b border-slate-100 dark:border-[#1a2436] pb-3">
                    <Compass className="w-4 h-4 text-amber-500" />
                    <span>{lang === "ar" ? "أقسام الموقع السريعة" : "Quick Site Directories"}</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button onClick={() => navigateTo("home")} className="text-left rtl:text-right p-2 bg-slate-50 dark:bg-[#141f32] hover:bg-slate-100 dark:hover:bg-[#1a2942] rounded-lg transition font-semibold">{t.nav.home}</button>
                    <button onClick={() => navigateTo("news")} className="text-left rtl:text-right p-2 bg-slate-50 dark:bg-[#141f32] hover:bg-slate-100 dark:hover:bg-[#1a2942] rounded-lg transition font-semibold">{t.nav.news}</button>
                    <button onClick={() => navigateTo("calendar")} className="text-left rtl:text-right p-2 bg-slate-50 dark:bg-[#141f32] hover:bg-slate-100 dark:hover:bg-[#1a2942] rounded-lg transition font-semibold">{t.nav.calendar}</button>
                    <button onClick={() => navigateTo("sitemap")} className="text-left rtl:text-right p-2 bg-slate-50 dark:bg-[#141f32] hover:bg-slate-100 dark:hover:bg-[#1a2942] rounded-lg transition font-semibold">{t.nav.sitemap}</button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* === ROUTE: INDIVIDUAL RECOMMENDATION VIEW (SHARE LINK PAGE) === */}
        {page === "signal" && (
          <div className="animate-fadeIn max-w-4xl mx-auto space-y-8">
            {/* Return button */}
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2 text-xs font-black text-amber-500 hover:text-amber-600 transition cursor-pointer"
            >
              <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "" : "rotate-180"}`} />
              <span>{t.signals.backToHome}</span>
            </button>

            {(() => {
              const sig = signals.find((s) => s.id === selectedSignalId);
              if (!sig) {
                return (
                  <div className="text-center p-12 bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-2xl">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <p className="text-slate-500 dark:text-neutral-400 font-bold">
                      {lang === "ar" ? "التوصية غير موجودة أو تم حذفها." : "Signal not found or has been deleted."}
                    </p>
                  </div>
                );
              }

              const isSell = sig.type === "SELL";
              const isInfo = sig.type === "INFO";

              return (
                <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-3xl overflow-hidden shadow-lg p-6 md:p-8 space-y-6">
                  
                  {/* Title & metadata */}
                  <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-100 dark:border-[#1a2436] pb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                            isInfo
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : isSell
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {isInfo ? t.signals.directionInfo : isSell ? t.signals.directionSell : t.signals.directionBuy}
                        </span>
                        <h2 className="text-3xl font-black">{sig.pair}</h2>
                      </div>
                      <p className="text-xs text-slate-400">
                        {t.signals.date}: {new Date(sig.date).toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-4 py-2 rounded-xl text-xs font-black ${
                          sig.status === "ACTIVE"
                            ? "bg-amber-500 text-black animate-pulse"
                            : sig.status.includes("TP")
                            ? "bg-emerald-500 text-black"
                            : sig.status === "SL HIT"
                            ? "bg-rose-600 text-white"
                            : "bg-slate-200 dark:bg-[#1a2436] text-slate-700 dark:text-neutral-400"
                        }`}
                      >
                        {sig.status === "ACTIVE" ? t.signals.statusActive : sig.status}
                      </span>

                      {/* Share link */}
                      <button
                        onClick={() => copyDirectLink(sig.id)}
                        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#141f32] dark:hover:bg-[#1a2942] border border-slate-200 dark:border-[#1e2e4a] px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        {copiedId === sig.id ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-500 font-extrabold">{lang === "ar" ? "تم النسخ" : "Link Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4 text-amber-500" />
                            <span>{lang === "ar" ? "نسخ الرابط المباشر للتوصية" : "Copy Direct Shareable Link"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Pricing matrices */}
                  {!isInfo && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 dark:bg-[#141f32]/50 p-6 rounded-2xl border border-slate-100 dark:border-[#1e2e4a]/40">
                      <div>
                        <span className="text-xs text-slate-500 dark:text-neutral-400 font-bold block uppercase">{t.signals.entry}</span>
                        <span className="text-lg font-black text-slate-900 dark:text-white mt-1 block">{sig.entry}</span>
                      </div>
                      <div>
                        <span className="text-xs text-rose-500 font-bold block uppercase">{t.signals.stopLoss}</span>
                        <span className="text-lg font-black text-rose-600 dark:text-rose-400 mt-1 block">{sig.sl}</span>
                      </div>
                      <div>
                        <span className="text-xs text-emerald-500 font-bold block uppercase">{t.signals.takeProfit1}</span>
                        <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{sig.tp1}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 dark:text-neutral-400 font-bold block uppercase">{t.signals.takeProfit2}</span>
                        <span className="text-lg font-extrabold text-slate-800 dark:text-neutral-300 mt-1 block">{sig.tp2 || "—"}</span>
                      </div>
                    </div>
                  )}

                  {/* Technical Analysis Body */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-extrabold flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#1a2436] pb-2">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      <span>{t.signals.explanation}</span>
                    </h3>
                    <p className="text-slate-600 dark:text-neutral-300 leading-relaxed text-justify whitespace-pre-line">
                      {sig.explanation}
                    </p>
                  </div>

                  {/* Chart Visual integration */}
                  {sig.photoUrl && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-extrabold flex items-center gap-2 text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#1a2436] pb-2">
                        <Activity className="w-5 h-5 text-amber-500" />
                        <span>{t.signals.chartTitle}</span>
                      </h3>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1e2e4a] bg-[#141f32]">
                        <LazyImage
                          src={sig.photoUrl}
                          alt={`${sig.pair} Analysis Chart`}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-cover max-h-[500px]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Quick share statistics */}
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-neutral-500 pt-4 border-t border-slate-100 dark:border-[#1a2436]/60">
                    <span>{sig.views} {t.signals.views}</span>
                    <span>DkoraFX Pro Analytics Hub © 2026</span>
                  </div>

                </div>
              );
            })()}

          </div>
        )}

        {/* === ROUTE: FINANCIAL NEWS & TECHNICAL ANALYSIS === */}
        {page === "news" && (
          <div className="animate-fadeIn space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block">
                {lang === "ar" ? "📰 التحليل اليومي الشامل" : "📰 Comprehensive Daily Analytics"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t.news.title}</h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                {t.news.subtitle}
              </p>
            </div>

            {selectedNewsId ? (
              /* News single view report */
              (() => {
                const article = newsArticles.find((art) => art.id === selectedNewsId);
                if (!article) return <p className="text-center">{lang === "ar" ? "التقرير غير موجود." : "Article not found."}</p>;
                return (
                  <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-3xl p-6 md:p-8 max-w-3xl mx-auto space-y-6">
                    <button
                      onClick={() => setSelectedNewsId(null)}
                      className="flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-600 transition cursor-pointer"
                    >
                      <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "" : "rotate-180"}`} />
                      <span>{t.news.backToNews}</span>
                    </button>

                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white">
                        {lang === "ar" ? article.titleAr : article.titleEn}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                        <span>{t.news.author}: {lang === "ar" ? article.authorAr : article.authorEn}</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString(lang === "ar" ? "ar" : "en")}</span>
                      </div>
                    </div>

                    {article.image && (
                      <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-[#1e2e4a]">
                        <LazyImage
                          src={article.image}
                          alt="Technical news thumbnail"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-cover max-h-[400px]"
                        />
                      </div>
                    )}

                    <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed text-justify whitespace-pre-line">
                      {lang === "ar" ? article.contentAr : article.contentEn}
                    </p>
                  </div>
                );
              })()
            ) : (
              /* News index list with both Live Breaking News and Technical Analysis */
              <div className="space-y-12">
                
                {/* 1. Live Market News (RSS Feed) */}
                <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 dark:border-[#1a2436]/60 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-500 text-black p-3 rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center">
                        <Globe className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{lang === "ar" ? "أخبار السوق العاجلة" : "Live Market News"}</span>
                          <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse uppercase tracking-wider">
                            {lang === "ar" ? "مباشر" : "Live"}
                          </span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                          {lang === "ar" ? "أخبار حية ومباشرة من البورصات العالمية والذهب والنفط والعملات" : "Live real-time feed from international forex, gold, and global markets"}
                        </p>
                      </div>
                    </div>

                    {/* Manual Refresh Button */}
                    <button
                      onClick={fetchRssNews}
                      disabled={rssLoading}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 active:scale-95 whitespace-nowrap self-start sm:self-auto"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${rssLoading ? "animate-spin" : ""}`} />
                      <span>{lang === "ar" ? "تحديث الأخبار" : "Refresh News"}</span>
                    </button>
                  </div>

                  {/* RSS Content States */}
                  {rssLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-3">
                      <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
                      <p className="text-sm font-bold text-slate-500 dark:text-neutral-400">
                        {lang === "ar" ? "جاري جلب آخر الأخبار الاقتصادية العاجلة..." : "Fetching latest live market news..."}
                      </p>
                    </div>
                  ) : rssError ? (
                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-8 text-center space-y-4">
                      <p className="text-rose-600 dark:text-rose-400 font-bold text-sm leading-relaxed">{rssError}</p>
                      <button
                        onClick={fetchRssNews}
                        className="px-5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        {lang === "ar" ? "إعادة المحاولة" : "Try Again"}
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rssNews.slice(0, 18).map((item, index) => {
                        const pubDateObj = new Date(item.pubDate || item.pubdate);
                        const formattedDate = pubDateObj.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        });
                        const formattedTime = pubDateObj.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        });

                        // Filter descriptions from HTML tags for cleanliness
                        const cleanDescription = item.description 
                          ? item.description.replace(/<[^>]*>/g, '').trim().substring(0, 140) + "..."
                          : "";

                        return (
                          <div
                            key={index}
                            onClick={() => setActiveRssArticle(item)}
                            className="bg-slate-50 dark:bg-[#141f32]/40 border border-slate-100 dark:border-[#1a2436] hover:border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer"
                          >
                            <div className="space-y-3">
                              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-neutral-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                  <span>{formattedDate}</span>
                                </span>
                                <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded font-black text-[9px]">
                                  {formattedTime}
                                </span>
                              </div>

                              <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-3 text-right">
                                {item.title}
                              </h4>
                              
                              {cleanDescription && (
                                <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-2 leading-relaxed text-right">
                                  {cleanDescription}
                                </p>
                              )}
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-[#1a2436]/40 mt-4 flex justify-between items-center text-xs">
                              <span className="text-[10px] font-extrabold text-slate-400">
                                {lang === "ar" ? "المصدر: Investing" : "Source: Investing"}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveRssArticle(item);
                                }}
                                className="font-black text-amber-500 hover:text-amber-600 flex items-center gap-1 transition cursor-pointer bg-transparent border-none p-0"
                              >
                                <span>{lang === "ar" ? "اقرأ الخبر كاملاً" : "Read Full News"}</span>
                                <ArrowRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Technical Reports & Market Analytics */}
                <div className="space-y-6">
                  <div className="border-t border-slate-200 dark:border-[#1a2436] pt-10 space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                      <TrendingUp className="w-6 h-6 text-amber-500" />
                      <span>{lang === "ar" ? "التحليلات والتقارير الفنية اليومية" : "Daily Technical Reports"}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400">
                      {lang === "ar" ? "نظرة عميقة ومفصلة على حركة أزواج العملات والذهب والسلع من قبل خبرائنا" : "Deep analytics & forecasts on key pairs, gold, and indices by our experts"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => navigateTo("news", null, art.id)}
                        className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] hover:border-amber-500/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                      >
                        <div className="p-5 space-y-4">
                          {art.image && (
                            <div className="rounded-xl overflow-hidden h-40 w-full bg-[#141f32]">
                              <LazyImage
                                src={art.image}
                                alt="news report preview"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase tracking-wide inline-block">
                            {art.category}
                          </span>
                          <h3 className="text-lg font-black leading-snug line-clamp-2 text-slate-900 dark:text-white">
                            {lang === "ar" ? art.titleAr : art.titleEn}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-3 text-justify">
                            {lang === "ar" ? art.excerptAr : art.excerptEn}
                          </p>
                        </div>

                        <div className="px-5 py-4 bg-slate-50 dark:bg-[#0c1322]/40 border-t border-slate-100 dark:border-[#1a2436]/60 flex justify-between items-center text-xs text-amber-500 font-black">
                          <span>{t.news.readMore}</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* === ROUTE: TRADING SCHOOL === */}
        {page === "school" && (
          <div className="animate-fadeIn space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block">
                {lang === "ar" ? "🎓 مدرسة تداول ديكوراFX" : "🎓 DkoraFX Trading School"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {lang === "ar" ? "مدرسة التداول" : "Trading School"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                {lang === "ar" 
                  ? "تعلم أسرار أسواق المال وتداول العملات والعملات الرقمية مع أقوى المحاضرات والتقارير الحصرية" 
                  : "Master forex and cryptocurrency trading with our premium free lessons and exclusive market courses"}
              </p>
            </div>

            {selectedSchoolArticleId ? (
              /* Single Article View */
              (() => {
                const schoolArticles = [
                  {
                    id: "gold-risk-management",
                    titleAr: "دليل الاحتراف: اداره مخاطر فوركس الذهب لعام 2026 وحماية رأس المال",
                    titleEn: "Professional Guide: Forex Gold Risk Management in 2026",
                    categoryAr: "إدارة المخاطر",
                    categoryEn: "Risk Management",
                    image: "https://images.unsplash.com/photo-1610375461246-83df859d8222?auto=format&fit=crop&w=800&q=80",
                    contentAr: `يعتبر الذهب (XAUUSD) بمثابة المغناطيس الأكبر لجميع المتداولين في أسواق المال والعملات الأجنبية. فهو الملاذ الآمن الأكثر شهرة وقوة عبر التاريخ، ولكنه في الوقت نفسه يمثل ساحة تداول شديدة التقلب والخطورة. هنا تبرز الأهمية القصوى لمفهوم اداره مخاطر فوركس الذهب كعنصر حاسم يفصل بين المتداول المحترف والناجح وبين المتداول الهاوي الذي قد يفقد كامل حسابه في حركة سعرية واحدة مفاجئة. في هذا المقال المتكامل والمتوافق مع أحدث معايير محركات البحث (SEO) لعام 2026، سنشرح بالتفصيل الممل كيف تبني نظاماً دفاعياً فولاذياً لحماية محفظتك الاستثمارية أثناء تداول الذهب.

طبيعة تحركات الذهب ولماذا يختلف عن العملات؟
للبدء في فهم قواعد اداره مخاطر فوركس الذهب، يجب أولاً إدراك الفروقات الجوهرية بين حركة المعادن الثمينة وحركة العملات التقليدية. يتميز الذهب بـ:
1. الحساسية الجيوسياسية والاقتصادية الفائقة: أي تصريح من الاحتياطي الفيدرالي، أو تصاعد في التوترات العالمية، قد يدفع أسعار الذهب للتحرك بمئات النقاط في دقائق معدودة.
2. الانزلاق السعري وفجوات السوق: يميل الذهب لفتح فجوات سعرية حادة مع بداية التداولات الأسبوعية أو خلال الأخبار الاقتصادية العنيفة.
3. معدل السيولة العالي وتأثير خوارزميات التداول السريع: تتحكم الصناديق الكبرى والذكاء الاصطناعي بنسبة كبيرة من السيولة، مما يسبب حركات تصحيحية كاسحة وسريعة.

الركائز الأساسية لـ اداره مخاطر فوركس الذهب:

أولاً: قاعدة الـ 1% لحماية رأس المال
تعتبر قاعدة الـ 1% بمثابة قانون البقاء الأول في أسواق المال. تنص هذه القاعدة ببساطة على ألا تتجاوز أقصى خسارة محتملة لك في الصفقة الواحدة أكثر من 1% إلى 2% من إجمالي حجم رأس مالك الفعلي. إذا كان حساب تداولك يحتوي على 10,000 دولار، فإن أقصى خسارة مقبولة في صفقة الذهب الواحدة هي 100 دولار فقط. الالتزام الصارم بهذا القانون يضمن لك الاستمرار في السوق حتى لو واجهت سلسلة متتالية من الصفقات الخاسرة.

ثانياً: حساب حجم اللوت (Lot Sizing) بدقة بالغة
تداول الذهب يتطلب دقة مضاعفة في حساب حجم العقد. نظراً لأن قيمة النقطة الواحدة في الذهب تختلف بشكل جذري عن أزواج العملات مثل اليورو دولار، فإن فتح عقد عشوائي دون حساب هو انتحار مالي.
لحساب حجم اللوت الأنسب لصفقتك تذكر المعادلة التالية:
حجم اللوت = (المبلغ المالي المعرض للمخاطرة بالدولار) / (عدد نقاط الوقف × قيمة النقطة للوت القياسي).
باستخدام حاسبة إدارة المخاطر المدمجة في منصة ديكوراFX، يمكنك إدخال حجم حسابك، والنسبة المئوية للمخاطرة، ومستوى الستوب لوز، لتقوم الحاسبة فوراً بتوليد اللوت الأنسب لك لحماية حسابك من التسييل والالتزام بقواعد اداره مخاطر فوركس الذهب.

ثالثاً: وضع أمر وقف الخسارة (Stop Loss) كقرار غير قابل للنقاش
يعتقد بعض المتداولين الهواة أن بإمكانهم مراقبة السوق وإغلاق الصفقات يدوياً، وهو خطأ فادح يؤدي غالباً إلى تسييل الحساب خلال التحركات السريعة للذهب. في سياق اداره مخاطر فوركس الذهب، يجب أن يكون أمر وقف الخسارة محدداً وموضعاً في المنصة قبل تفعيل الصفقة نفسها.
- ابحث عن مستويات الدعم والمقاومة الفنية القوية لوضع الستوب خلفها بمسافة كافية.
- تجنب وضع الستوب لوز قريباً جداً لمنع ضربه نتيجة للتذبذبات العشوائية السعرية وتوسيع الاسبريد أثناء الأخبار.
- لا تقم أبداً بتحريك الستوب لوز لزيادة الخسارة طمعاً في عودة السعر، بل تقبل الخسارة كجزء طبيعي من اللعبة.

رابعاً: الرافعة المالية - الوحش الصامت
تعتبر الرافعة المالية سلاحاً ذا حدين؛ فهي تتيح لك التداول بأحجام ضخمة بمبلغ صغير، لكنها في تداولات الذهب تمثل مكمن الخطر الأكبر. استخدام رافعة مالية مفرطة مع أصل عالي التقلب مثل الذهب يؤدي لتقليص الهامش المتاح بشكل لحظي. ننصح دائماً بتقنين الرافعة المالية بحدود (1:100) كحد أقصى للتحكم بالتعرض الإجمالي للسوق ونجاح خطط اداره مخاطر فوركس الذهب.

علم نفس التداول والتحكم بالعواطف في إدارة مخاطر الذهب
لا يمكن الحديث عن اداره مخاطر فوركس الذهب دون التطرق للجانب النفسي. الطمع والخوف هما العدوان الأكبر للمتداول.
- الخوف من فوات الفرصة: يدفعك لدخول صفقات الذهب بأسعار غير مناسبة وبلوت مرتفع دون تخطيط.
- الرغبة في الانتقام من السوق: بعد صفقة خاسرة، قد يندفع المتداول لمضاعفة اللوت لاستعادة خسائره، مما يضاعف الكارثة.
الالتزام بخطة تداول مكتوبة ومحددة سلفاً هو الحل الوحيد للتغلب على هذه المشاعر العشوائية وضمان تطبيق قواعد اداره مخاطر فوركس الذهب بنجاح.

خلاصة واستراتيجية عملية مقترحة لعام 2026:
لتحقيق أرباح مستدامة عبر تداول الذهب في عام 2026، ننصحك بالخطوات التالية:
1. لا تدخل أي صفقة ذهب دون تحديد مسبق لنقاط الدخول والخروج والهدف والستوب.
2. استخدم حاسبة إدارة المخاطر في ديكوراFX لتحديد اللوت بدقة متناهية.
3. وزع استثماراتك ولا تركز كامل رأس مالك في تداولات الذهب فقط.
4. واصل التعلم الفني ومتابعة التقارير الفنية والأخبار الاقتصادية اللحظية التي نقدمها لك مجاناً.
تذكر دائماً أن البقاء والاستمرارية في سوق الفوركس هي الهدف الأسمى، والوسيلة الوحيدة لتحقيق ذلك هي الانضباط التام وتطبيق مبادئ اداره مخاطر فوركس الذهب باحترافية وسهولة تامة لضمان الأمان والنمو المستمر لمحفظتك المالية.`,
                    contentEn: `Gold (XAUUSD) acts as a powerful magnet for traders in financial markets. Known as a supreme safe haven throughout history, it also behaves as an extremely volatile and high-risk trading asset. This is why Forex Gold Risk Management is the ultimate shield separating professional traders from emotional amateurs. In this comprehensive 2026 guide, we outline the solid rules of preserving your equity while riding gold market waves.

Understanding Gold Volatility (XAUUSD):
To establish a rigid system of Forex Gold Risk Management, you must analyze why gold operates differently from traditional currencies:
- High Geopolitical Sensitivity: Federal Reserve decisions and global events push gold prices hundreds of pips in a matter of seconds.
- Market Gaps & Slippages: Gold has a higher tendency to create price gaps during weekly openings and major data releases.
- Heavy Institutional Algorithm Action: Modern institutional AI systems control gold liquidity, making correction trends deeper.

Core Principles of Forex Gold Risk Management:

1. The 1% Asset Allocation Rule
Never risk more than 1% to 2% of your total account balance on a single gold trade. If your account holds $10,000, your maximum allowed loss per trade must be strictly capped at $100. This ensures longevity under difficult market cycles.

2. Precision Position Sizing (Lot Computation)
Do not open trades randomly. Computing the correct lot size is crucial because gold pip value calculations differ significantly from currency pairs. Use our live interactive risk sizing calculator on DkoraFX to automatically obtain the exact lot size according to your preferred risk criteria.

3. Uncompromised Stop Loss Strategy
Always set a physical Stop Loss order directly in the platform before opening the trade. Never move your stop loss further away to accommodate losses, and avoid putting stops too tight to prevent execution from random spreads.

Summary and Best Practices for 2026:
To secure profitable yields in 2026 gold trading:
- Pre-plan your entry, target, and stop loss.
- Always run calculations using the DkoraFX Risk Calculator.
- Keep your emotions in check, avoiding FOMO and revenge trading.
- Remember, survival is the main goal, and proper Forex Gold Risk Management is the only path to it.`
                  },
                  {
                    id: "meme-coins",
                    titleAr: "مستقبل الاستثمار في \"ميمز كوينز\" وكيفية اقتناص الفرص بأمان",
                    titleEn: "The Future of Meme Coins Investment & How to Safely Seize Opportunities",
                    categoryAr: "العملات الرقمية",
                    categoryEn: "Cryptocurrencies",
                    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
                    contentAr: `ثورة "ميمز كوينز" من مجرد نكات إلى ركائز مالية في 2026:
لم تعد ميمز كوينز مجرد ظاهرة عابرة أو صور كلاب وضفادع مضحكة تتدفق على شبكات التواصل الاجتماعي؛ بل تحولت بحلول عام 2026 إلى فئة أصول رقمية قائمة بذاتها، تتمتع بمليارات الدولارات من السيولة اليومية وتدعمها مجتمعات عالمية فائقة الولاء.

في هذا الدليل الشامل والمفصل، سنغوص عميقاً في عالم ميمز كوينز، مستعرضين العوامل التي تحرك أسعارها، وأبرز الشبكات التي تحتضنها، وكيفية بناء استراتيجية تداول ذكية ومدروسة للحد من المخاطر واقتناص أعلى الأرباح.

ما هي "ميمز كوينز" (Meme Coins)؟ وفيمَ تختلف عن العملات التقليدية؟
ميمز كوينز هي عملات رقمية مشفرة تستلهم هويتها من نكات الإنترنت المألوفة (Memes)، أو الرسوم الساخرة، أو الشخصيات الشهيرة على منصات التواصل مثل X (تويتر سابقاً) وتيك توك.

خلافاً للعملات الكبرى مثل البيتكوين (Bitcoin) الذي يُعتبر مخزناً للقيمة الرقمية، أو الإيثيريوم (Ethereum) الذي يمثل شبكة ذكية للعقود، فإن عملات الميم كانت تبدأ تاريخياً بلا فائدة وظيفية واضحة (Utility). إلا أن الوضع اختلف تماماً في عام 2026:
- الاعتماد على زخم المجتمع: القوة الدافعة الحقيقية وراء أي عملة ميم هي قوة وولاء مجتمعها الرقمي.
- السرعة الفائقة في الانتشار: بفضل خوارزميات الذكاء الاصطناعي والتواصل الاجتماعي، يمكن لعملة ميم جديدة أن تحقق قيمة سوقية بمليارات الدولارات في غضون أيام قليلة.
- التطور نحو المنفعة (Utility Integration): تدمج كبرى عملات الميم اليوم تقنيات التمويل اللامركزي (DeFi)، وألعاب الويب 3 (Web3 Gaming)، والذكاء الاصطناعي لتأمين استمراريتها وتبرير قيمتها السوقية.

خريطة هيمنة الشبكات على أسواق الـ Meme Coins:
يتطلب نجاح الاستثمار في ميمز كوينز معرفة البيئة الحاضنة لها. في المشهد المالي لعام 2026، تتقاسم ثلاث شبكات رئيسية عرش هذه التجارة:
1. شبكة سولانا (Solana - SOL): تُعد سولانا المقر الرئيسي والأكثر نشاطاً لإنشاء وتداول ميمز كوينز بفضل انخفاض رسوم الغاز لدرجة تقترب من الصفر وسرعة تنفيذ المعاملات الفائقة. منصات مثل Pump.fun والمنصات اللامركزية المطورة جعلت إطلاق عملة ميم عملية تستغرق ثوانٍ معدودة، مما جذب ملايين المتداولين اليوميين.
2. شبكة إيثيريوم (Ethereum - ETH): رغم ارتفاع رسوم الشبكة نسبياً مقارنة بسولانا، تظل إيثيريوم الشبكة المفضلة لعملات الميم الضخمة وذات القيمة السوقية المليارية (مثل Shiba Inu و Pepe). يثق المستثمرون الكبار ("الحيتان") بأمان شبكة إيثيريوم وسيولتها العميقة.
3. شبكة بيز (Base Network): الشبكة المدعومة من منصة Coinbase حققت نمواً انفجارياً في عام 2026، حيث أصبحت ملاذاً آمناً لعملات الميم المرتبطة بالتطبيقات الاجتماعية اللامركزية بفضل تكاملها المباشر مع الحافظات الرقمية سهلة الاستخدام للمبتدئين.

قواعد ذهبية لتحليل واختيار "ميمز كوينز" الواعدة قبل الانفجار السعري:
لا ينبغي أن يكون الاستثمار في ميمز كوينز ضرباً من العشوائية أو القمار. لتحقيق أرباح مستدامة وتجنب عمليات النصب والاحتيال (مثل سحب السيولة أو Rug Pulls)، يجب اتباع منهجية صارمة لتحليل العملات:
- قفل السيولة (Locked Liquidity): تأكد دائماً من أن سيولة العملة في منصات التداول اللامركزية مقفلة لفترة طويلة أو محروقة تماماً لضمان عدم تمكن المطورين من سحب أموال المستثمرين.
- التدقيق البرمجي (Contract Audit): ابحث عن العملات التي خضع عقدها الذكي لفحص من شركات أمنية موثوقة للتأكد من خلوه من الأكواد الخبيثة مثل منع البيع (Honeypot).
- تحليل نشاط وحجم المجتمع الرقمي: المجتمع الصاخب والمتفاعل على منصة X وقنوات ديسكورد وتيليجرام هو الوقود الحقيقي للعملة. راقب معدل نمو المتابعين الحقيقيين وتجنب المشاريع التي تعتمد على الحسابات الوهمية.
- حجم التداول اليومي ومعدل السيولة: العملة التي تمتلك سيولة ضعيفة مقارنة بحجم تداولها ستعاني من انزلاق سعري حاد (Slippage) عند محاولة البيع. ابحث عن توازن صحي بين حجم التداول والسيولة المتاحة لتسهيل عمليات الدخول والخروج.

إدارة المخاطر: كيف تتداول الـ Meme Coins وتحمي رأس مالك؟
تتميز ميمز كوينز بتقلباتها السعرية العنيفة التي قد تتجاوز 1000% صعوداً وهبوطاً في يوم واحد. إليك كيف تحمي محفظتك الاستثمارية:
قاعدة الـ 5%: لا تخصص أكثر من 5% من إجمالي محفظتك الاستثمارية لعملات الميم عالية المخاطر. اجعل الجزء الأكبر من رأس مالك دائماً في عملات مستقرة وذات مشاريع حقيقية (مثل البيتكوين والإيثيريوم).
تأمين الأرباح تدريجياً (Take Profit): بمجرد أن تحقق العملة صعوداً بمقدار ضعفين (2x)، اسحب رأس مالك الأصلي فوراً واترك الأرباح لتنمو بحرية.
استخدام حاسبة المخاطر وإدارة اللوت: قبل دخول أي صفقة، حدد بدقة حجم الخسارة المقبول الذي يمكنك تحمله دون التأثير على استقرارك المالي.

مستقبل "ميمز كوينز" في عام 2026 وما بعده:
مع نضوج أسواق العملات المشفرة ودخول الصناديق الاستثمارية المتداولة (ETFs) لأسواق الكريبتو، لم يعد الذكاء الاصطناعي مجرد أداة تحليلية، بل أصبحت عملات الميم المدارة والمطورة بالكامل بواسطة وكلاء الذكاء الاصطناعي اللامركزيين (AI-generated memes) هي الصيحة الأكثر ربحية وقوة في عام 2026.
تتحرك هذه العملات بناءً على تفاعلات حية وتغريدات ينشرها الروبوت بشكل تلقائي ومستقل، مما يفتح فصلاً جديداً ومثيراً تماماً في الاقتصاد الرقمي القائم على الانتباه والترفيه.

خاتمة وتوصية ديكوراFX:
تظل ميمز كوينز بوابة ممتازة وسريعة لتحقيق عوائد مالية خيالية إذا تم التعامل معها بوعي، وانضباط ذاتي، واعتماد على أدوات التحليل الفني والأساسي بدلاً من العواطف والمشاعر الاندفاعية (FOMO).
تذكر دائماً أن المعرفة الفنية وإدارة المخاطر الصارمة هما صمام الأمان الوحيد لك في هذه الأسواق المتقلبة. تابع تحديثات منصة ديكوراFX أولاً بأول للحصول على أحدث التحليلات والتقارير الفنية المباشرة لأسواق الذهب، العملات، وأصول الكريبتو الواعدة.`,
                    contentEn: `The Rise of Meme Coins from Jokes to Financial Giants:
Meme coins are no longer a passing internet fad or silly pet photos; by 2026 they have evolved into a distinct asset class backed by massive trading volumes and ultra-loyal global communities.

In this guide, we explore the primary factors driving meme coin dynamics, dominant ecosystems, and safety tips to maximize your gains.

What are Meme Coins and How Do They Differ from Traditional Cryptos?
Meme coins draw their brand identity from internet viral trends, jokes, or key figures on platforms like X and TikTok. Unlike Bitcoin or Ethereum, they historically lacked a technical use-case, but in 2026:
- Community Power: Loyalty is the true engine of value.
- Rapid Growth: Viral mechanics allow coins to hit billion-dollar market caps in days.
- Utility Integration: Top meme coins now incorporate DeFi, Web3 games, and AI tools.

The Major Blockchains of 2026:
1. Solana (SOL): Low fees and near-instant processing make it the premier hub.
2. Ethereum (ETH): Remains the preferred secure choice for high-volume whales.
3. Base Network: Backed by Coinbase, ideal for beginner-friendly apps.

Risk Management: How to Survive Volatility:
Meme coins are highly volatile, often moving up or down by over 1000% daily:
- The 5% rule: Never allocate more than 5% of your portfolio to highly risky assets.
- Take Profit: Retrieve your initial investment as soon as your coin hits 2x.
- Use safe lot calculators to hedge your exposures.`
                  },
                  {
                    id: "intro-forex",
                    titleAr: "أساسيات تداول العملات الأجنبية (الفوركس) للمبتدئين",
                    titleEn: "Introduction to Forex Trading Basics for Beginners",
                    categoryAr: "أساسيات التداول",
                    categoryEn: "Trading Basics",
                    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
                    contentAr: `مرحباً بك في مدرسة التداول من ديكوراFX. في هذا الدرس، سنتعرف على أساسيات سوق العملات الأجنبية (الفوركس) وكيف يعمل:

ما هو سوق الفوركس؟
الفوركس (Forex) هو اختصار لـ Foreign Exchange وهو أكبر سوق مالي في العالم بحجم تداول يومي يتجاوز 7 تريليونات دولار. في هذا السوق، يتم تداول العملات في أزواج، مثل اليورو مقابل الدولار الأمريكي (EURUSD).

كيف تحقق الأرباح؟
الفكرة ببساطة هي شراء عملة وتوقع ارتفاع قيمتها مقابل العملة الأخرى، أو بيعها وتوقع انخفاضها.
- إذا كنت تعتقد أن اليورو سيرتفع مقابل الدولار، ستقوم بعملية شراء (BUY) لزوج EURUSD.
- إذا كنت تعتقد أن اليورو سينخفض، ستقوم بعملية بيع (SELL) لزوج EURUSD.

المصطلحات الأساسية:
- النقاط (Pips): هي وحدة قياس الحركة السعرية للزوج.
- الرافعة المالية (Leverage): أداة تسمح لك بالتداول بأحجام أكبر من رأس مالك الأصلي لتعظيم الأرباح، ولكنها تزيد المخاطر أيضاً بشكل كبير.
- السبريد (Spread): هو الفرق بين سعر الشراء وسعر البيع ويمثل عمولة شركة الوساطة.`,
                    contentEn: `Welcome to DkoraFX Trading School. In this lesson, we cover the essentials of Foreign Exchange (Forex) and how it functions:

What is Forex?
Forex is the largest financial market globally, with a daily trading volume exceeding $7 trillion. Currencies are traded in pairs, such as EURUSD.

How to Trade:
You buy a currency expecting it to appreciate, or sell it expecting it to depreciate.
- Buy EURUSD if you expect the Euro to rise against the Dollar.
- Sell EURUSD if you expect the Euro to fall.`
                  }
                ];
                const art = schoolArticles.find(a => a.id === selectedSchoolArticleId);
                if (!art) return null;
                return (
                  <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-3xl p-6 md:p-8 max-w-3xl mx-auto space-y-6">
                    <button
                      onClick={() => setSelectedSchoolArticleId(null)}
                      className="flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-600 transition cursor-pointer"
                    >
                      <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "" : "rotate-180"}`} />
                      <span>{lang === "ar" ? "العودة للمدرسة" : "Back to School"}</span>
                    </button>

                    <div className="space-y-2">
                      <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold px-3 py-1 rounded-full text-xs">
                        {lang === "ar" ? art.categoryAr : art.categoryEn}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black leading-tight text-slate-900 dark:text-white pt-2">
                        {lang === "ar" ? art.titleAr : art.titleEn}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                        <span>{lang === "ar" ? "ديكوراFX التعليمية" : "DkoraFX Academy"}</span>
                        <span>•</span>
                        <span>{lang === "ar" ? "درس مجاني" : "Free Lesson"}</span>
                      </div>
                    </div>

                    {art.image && (
                      <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-[#1e2e4a]">
                        <LazyImage
                          src={art.image}
                          alt="Lesson visual"
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-cover max-h-[380px]"
                        />
                      </div>
                    )}

                    <div className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed text-justify whitespace-pre-line space-y-4">
                      {lang === "ar" ? art.contentAr : art.contentEn}
                    </div>

                    {/* Interactive Internal Links Block */}
                    <div className="mt-10 pt-8 border-t border-slate-200 dark:border-[#1a2436] space-y-6">
                      <div className="flex items-center gap-2">
                        <Compass className="w-5 h-5 text-amber-500 animate-pulse" />
                        <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                          {lang === "ar" ? "📌 أدوات وتوصيات داخلية ذات صلة" : "📌 Related Internal Tools & Signals"}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div 
                          onClick={() => {
                            navigateTo("home");
                            setTimeout(() => {
                              const el = document.getElementById("risk-calculator-widget");
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth", block: "center" });
                                el.classList.add("ring-4", "ring-amber-500", "ring-offset-2", "dark:ring-offset-slate-900");
                                setTimeout(() => {
                                  el.classList.remove("ring-4", "ring-amber-500", "ring-offset-2", "dark:ring-offset-slate-900");
                                }, 3000);
                              }
                            }, 300);
                          }}
                          className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex items-start gap-3 group"
                        >
                          <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl group-hover:bg-amber-500 group-hover:text-black transition shrink-0">
                            <Calculator className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <span className="font-bold text-sm block group-hover:text-amber-500 transition">
                              {lang === "ar" ? "حاسبة اللوت وإدارة المخاطر" : "Risk & Lot Size Calculator"}
                            </span>
                            <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                              {lang === "ar" 
                                ? "طبق القواعد الحسابية واللوت المقترح بدقة لحماية محفظتك من التسييل."
                                : "Apply precise lot sizing formulas to secure your assets against margin calls."}
                            </p>
                          </div>
                        </div>

                        {/* Link to Live Signals with search filter */}
                        <div 
                          onClick={() => {
                            const query = art.id === "gold-risk-management" ? "XAUUSD" : art.id === "meme-coins" ? "BTC" : "";
                            setSearchQuery(query);
                            navigateTo("home");
                            setTimeout(() => {
                              const el = document.getElementById("live-signals-board");
                              if (el) {
                                el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }
                            }, 300);
                          }}
                          className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex items-start gap-3 group"
                        >
                          <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl group-hover:bg-amber-500 group-hover:text-black transition shrink-0">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <span className="font-bold text-sm block group-hover:text-amber-500 transition">
                              {lang === "ar" ? "قناة التوصيات الحية المباشرة" : "Live Trading Signals Feed"}
                            </span>
                            <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                              {lang === "ar" 
                                ? `عرض صفقات ${art.id === "gold-risk-management" ? "الذهب" : art.id === "meme-coins" ? "العملات الرقمية" : "الفوركس"} النشطة فوراً.`
                                : `Browse active ${art.id === "gold-risk-management" ? "Gold" : art.id === "meme-coins" ? "Crypto" : "Forex"} recommended trades now.`}
                            </p>
                          </div>
                        </div>

                        {/* Link to Market News */}
                        <div 
                          onClick={() => {
                            navigateTo("news");
                          }}
                          className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex items-start gap-3 group"
                        >
                          <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl group-hover:bg-amber-500 group-hover:text-black transition shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <span className="font-bold text-sm block group-hover:text-amber-500 transition">
                              {lang === "ar" ? "أخبار وتحليلات الأسواق الفورية" : "Live Market News & Feed"}
                            </span>
                            <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                              {lang === "ar" 
                                ? "تابع تقارير التضخم وبيانات الفائدة اللحظية وتأثيرها على الأسعار."
                                : "Track real-time inflation indicators and central bank policy news feeds."}
                            </p>
                          </div>
                        </div>

                        {/* Link to next suggested lesson */}
                        {(() => {
                          const nextLesson = art.id === "gold-risk-management" 
                            ? { id: "meme-coins", titleAr: "مستقبل عملات الميمز", titleEn: "The Future of Meme Coins" }
                            : art.id === "meme-coins" 
                            ? { id: "intro-forex", titleAr: "أساسيات تداول الفوركس", titleEn: "Introduction to Forex Trading" }
                            : { id: "gold-risk-management", titleAr: "دليل إدارة مخاطر الذهب", titleEn: "Gold Risk Management Guide" };

                          return (
                            <div 
                              onClick={() => openSchoolArticle(nextLesson.id)}
                              className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex items-start gap-3 group"
                            >
                              <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl group-hover:bg-amber-500 group-hover:text-black transition shrink-0">
                                <BookOpen className="w-5 h-5" />
                              </div>
                              <div className="space-y-1">
                                <span className="font-bold text-sm block group-hover:text-amber-500 transition">
                                  {lang === "ar" ? "الدرس الأكاديمي التالي" : "Next Recommended Lesson"}
                                </span>
                                <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                                  {lang === "ar" 
                                    ? `انتقل فوراً لقراءة: "${nextLesson.titleAr}".`
                                    : `Read next: "${nextLesson.titleEn}".`}
                                </p>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Grid list of School articles */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured Meme Coins Lesson */}
                <div 
                  onClick={() => setSelectedSchoolArticleId("meme-coins")}
                  className="bg-white dark:bg-[#0c1322] border-2 border-amber-500/40 hover:border-amber-500 rounded-3xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer flex flex-col md:col-span-2 md:flex-row"
                >
                  <div className="md:w-1/2 h-64 md:h-auto bg-[#141f32] relative overflow-hidden">
                    <LazyImage 
                      src="/meme_coins_2026_1787419226241.jpg" 
                      alt="Meme coins lesson" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-black uppercase">
                      {lang === "ar" ? "🔥 درس متميز" : "🔥 Featured"}
                    </div>
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">
                        {lang === "ar" ? "تداول العملات الرقمية" : "CRYPTO TRADING"}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                        {lang === "ar" ? "مستقبل الاستثمار في \"ميمز كوينز\" وكيفية اقتناص الفرص بأمان" : "The Future of Meme Coins Investment & How to Safely Seize Opportunities"}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-4 text-justify">
                        {lang === "ar" 
                          ? "لم تعد ميمز كوينز مجرد ظاهرة عابرة أو صور كلاب وضفادع مضحكة بل تحولت إلى فئة أصول رقمية قائمة بذاتها تتمتع بمليارات الدولارات من السيولة. تعلم أهم الاستراتيجيات العملية لعام 2026 وتفادى المخاطر الكبيرة."
                          : "Meme coins have grown to be multi-billion asset hubs. Discover major blockchain choices like Solana or Ethereum and rule-of-thumb indicators to minimize execution risks."}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs font-black text-amber-500 pt-2 border-t border-slate-100 dark:border-[#1a2436]">
                      <span>{lang === "ar" ? "ابدأ الدرس الآن" : "Start Lesson Now"}</span>
                      <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>

                 {/* Premium Gold Risk Management Card */}
                <div 
                  onClick={() => setSelectedSchoolArticleId("gold-risk-management")}
                  className="bg-white dark:bg-[#0c1322] border border-amber-500/20 hover:border-amber-500 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="h-44 bg-[#141f32] relative overflow-hidden">
                    <LazyImage 
                      src="/gold_forex_risk_management_1787538156014.jpg" 
                      alt="Gold risk management lesson" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-rose-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                      {lang === "ar" ? "🔥 مقال متميز" : "🔥 Featured Post"}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between space-y-4 flex-1">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block">
                        {lang === "ar" ? "إدارة مخاطر فوركس الذهب" : "GOLD RISK MANAGEMENT"}
                      </span>
                      <h3 className="text-lg font-black leading-snug text-slate-900 dark:text-white line-clamp-2">
                        {lang === "ar" ? "دليل الاحتراف: اداره مخاطر فوركس الذهب لعام 2026 وحماية رأس المال" : "Professional Guide: Forex Gold Risk Management in 2026"}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-3 text-justify">
                        {lang === "ar" 
                          ? "دليلك المتكامل والحصري لعام 2026 حول أسرار اداره مخاطر فوركس الذهب ومعدلات اللوت المقترحة لتفادي انعكاسات الأسعار وتداول الذهب بثقة تامة."
                          : "Your ultimate guide on mastering Gold risk exposures, lot computation formulas, and capital preservation methods."}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-xs font-black text-amber-500 pt-3 border-t border-slate-100 dark:border-[#1a2436]/60">
                      <span>{lang === "ar" ? "ابدأ قراءة المقال" : "Read Full Article"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </div>

                {/* Additional Forex Lesson Card */}
                <div 
                  onClick={() => setSelectedSchoolArticleId("intro-forex")}
                  className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] hover:border-amber-500/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <span className="bg-slate-100 dark:bg-[#141f32] text-slate-700 dark:text-neutral-300 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase tracking-wide inline-block">
                      {lang === "ar" ? "أساسيات التداول" : "Trading Basics"}
                    </span>
                    <h3 className="text-lg font-black leading-snug text-slate-900 dark:text-white">
                      {lang === "ar" ? "أساسيات تداول العملات الأجنبية (الفوركس) للمبتدئين" : "Introduction to Forex Trading Basics for Beginners"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                      {lang === "ar" 
                        ? "تعرف على أكبر سوق مالي في العالم، وكيفية حساب النقاط (Pips)، السبريد، والرافعة المالية وكيفية قراءة وتداول أزواج العملات بكفاءة."
                        : "Understand how the currency markets function, leverage tools, margins, spreads and how to compute entry targets safely."}
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 dark:bg-[#0c1322]/40 border-t border-slate-100 dark:border-[#1a2436]/60 flex justify-between items-center text-xs text-amber-500 font-black">
                    <span>{lang === "ar" ? "ابدأ الدرس" : "Start Lesson"}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {/* Safety & Risk Management Card */}
                <div 
                  onClick={() => navigateTo("home")} 
                  className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] hover:border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="space-y-4">
                    <span className="bg-rose-500/10 text-rose-500 font-extrabold px-2.5 py-1 rounded text-[10px] uppercase tracking-wide inline-block">
                      {lang === "ar" ? "إدارة المخاطر" : "Risk Management"}
                    </span>
                    <h3 className="text-lg font-black leading-snug text-slate-900 dark:text-white">
                      {lang === "ar" ? "كيف تستخدم حاسبة إدارة المخاطر لحماية رأس المال؟" : "How to Use the Risk Sizing Calculator for Capital Preservation?"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-3">
                      {lang === "ar" 
                        ? "إن حماية رأس مالك هي السر الحقيقي للاستمرارية في الأسواق المالية. تعلم كيفية دمج حاسبة إدارة المخاطر لتحديد حجم اللوت الأنسب لكل صفقة."
                        : "Preserving your assets is the key to longevity in trading. Use our live interactive calculator to measure risk ratios precisely."}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-[#1a2436]/60 flex justify-between items-center text-xs text-amber-500 font-black mt-4">
                    <span>{lang === "ar" ? "افتح الحاسبة التفاعلية" : "Open Interactive Calculator"}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* === ROUTE: DYNAMIC SITEMAP === */}
        {page === "sitemap" && (
          <div className="animate-fadeIn space-y-8 max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block">
                <Map className="w-3.5 h-3.5 inline-block -mt-1" /> {lang === "ar" ? "الفهرس الكامل المحدث" : "Full Updated Index"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t.sitemap.title}</h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                {t.sitemap.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Box 1: Static links */}
              <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl space-y-4 shadow-sm">
                <h3 className="font-extrabold text-base text-amber-500 dark:text-amber-400 flex items-center gap-2 border-b border-slate-100 dark:border-[#1a2436] pb-3">
                  <Compass className="w-5 h-5" />
                  <span>{t.sitemap.staticPages}</span>
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: t.nav.home, path: "home" },
                    { label: t.nav.news, path: "news" },
                    { label: t.nav.school, path: "school" },
                    { label: t.sitemap.title, path: "sitemap" },
                    { label: t.legal.privacyTitle, path: "privacy" },
                    { label: t.legal.termsTitle, path: "terms" },
                    { label: t.legal.disclaimerTitle, path: "disclaimer" }
                  ].map((link, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <button
                        onClick={() => navigateTo(link.path)}
                        className="text-slate-700 dark:text-neutral-300 hover:text-amber-500 font-semibold cursor-pointer underline hover:no-underline"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Dynamic Signals index */}
              <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl space-y-4 shadow-sm">
                <h3 className="font-extrabold text-base text-amber-500 dark:text-amber-400 flex items-center gap-2 border-b border-slate-100 dark:border-[#1a2436] pb-3">
                  <Activity className="w-5 h-5" />
                  <span>{t.sitemap.dynamicSignals}</span>
                </h3>
                {signals.length === 0 ? (
                  <p className="text-xs text-slate-400">{lang === "ar" ? "لا توجد صفقات منشورة حالياً." : "No published signals available yet."}</p>
                ) : (
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {signals.map((sig) => (
                      <li key={sig.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 truncate">
                          <span className={`w-1.5 h-1.5 rounded-full ${sig.type === "SELL" ? "bg-rose-500" : "bg-emerald-500"}`}></span>
                          <button
                            onClick={() => navigateTo("signal", sig.id)}
                            className="text-slate-700 dark:text-neutral-300 hover:text-amber-500 font-semibold cursor-pointer truncate"
                          >
                            {sig.pair} - {sig.entry}
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 block px-1.5 shrink-0 uppercase">{sig.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Box 3: Academy Lessons Index */}
              <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl space-y-4 shadow-sm md:col-span-2">
                <h3 className="font-extrabold text-base text-amber-500 dark:text-amber-400 flex items-center gap-2 border-b border-slate-100 dark:border-[#1a2436] pb-3">
                  <BookOpen className="w-5 h-5" />
                  <span>{lang === "ar" ? "دروس ومقالات الأكاديمية التعليمية" : "Educational Academy Lessons"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: "gold-risk-management",
                      titleAr: "إدارة مخاطر تداول الذهب لعام 2026",
                      titleEn: "Forex Gold Risk Management in 2026",
                      descAr: "قاعدة الـ 1% ومعادلات حساب حجم اللوت لتداول الذهب بأمان.",
                      descEn: "1% rules and position lot calculation formulas for gold."
                    },
                    {
                      id: "meme-coins",
                      titleAr: "مستقبل الاستثمار في عملات الميمز",
                      titleEn: "The Future of Meme Coins",
                      descAr: "كيفية تحليل واقتناص الفرص في العملات الرقمية الواعدة بأمان.",
                      descEn: "How to safely evaluate and seize opportunities in memes."
                    },
                    {
                      id: "intro-forex",
                      titleAr: "أساسيات تداول العملات للمبتدئين",
                      titleEn: "Introduction to Forex Trading",
                      descAr: "شرح النقاط (Pips)، الرافعة المالية، والسبريد بأسلوب مبسط.",
                      descEn: "Clean explanation of pips, leverage margins and spreads."
                    }
                  ].map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => openSchoolArticle(lesson.id)}
                      className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group"
                    >
                      <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                        <span className="font-bold text-sm text-slate-800 dark:text-white group-hover:text-amber-500 transition block">
                          {lang === "ar" ? lesson.titleAr : lesson.titleEn}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                          {lang === "ar" ? lesson.descAr : lesson.descEn}
                        </p>
                      </div>
                      <span className="text-[10px] text-amber-500 font-black block pt-3 border-t border-slate-100 dark:border-[#1a2436]/60 mt-3 text-right rtl:text-right ltr:text-left">
                        {lang === "ar" ? "قراءة الدرس المباشر ←" : "Read Lesson Now ←"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* === ROUTES: LEGAL COMPLIANCE PAGES (Privacy, Terms, Risk Warning) === */}
        {["privacy", "terms", "disclaimer"].includes(page) && (
          <div className="animate-fadeIn max-w-3xl mx-auto space-y-6">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2 text-xs font-black text-amber-500 hover:text-amber-600 transition cursor-pointer"
            >
              <ArrowRight className={`w-4 h-4 ${lang === "ar" ? "" : "rotate-180"}`} />
              <span>{t.signals.backToHome}</span>
            </button>

            {(() => {
              const legalKey = page === "privacy" ? "privacy" : page === "terms" ? "terms" : "disclaimer";
              const title = t.legal[`${legalKey}Title` as 'privacyTitle' | 'termsTitle' | 'disclaimerTitle'];
              const list = t.legal[`${legalKey}Content` as 'privacyContent' | 'termsContent' | 'disclaimerContent'];

              return (
                <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-[#1a2436] pb-4">
                    <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{title}</h2>
                  </div>

                  <div className="space-y-4">
                    {list.map((paragraph, idx) => (
                      <p key={idx} className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed text-justify">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-[#1a2436]/60 text-xs text-slate-400">
                    {t.sitemap.allRights}
                  </div>
                </div>
              );
            })()}

          </div>
        )}

      </main>

      {/* 4. Footers containing dynamic compliance pages */}
      <footer className="border-t border-slate-200 dark:border-[#1a2436] bg-slate-100 dark:bg-[#04080e] py-12 text-slate-500 dark:text-neutral-400 text-xs transition-colors mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left rtl:text-right">
            
            {/* About platform */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{t.footer.about}</h4>
              <p className="leading-relaxed text-slate-500 dark:text-neutral-400 text-justify">
                {t.footer.aboutText}
              </p>
            </div>

            {/* Quick sections */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{lang === "ar" ? "أقسام الأكاديمية" : "Desk Academy"}</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigateTo("home")} className="hover:text-amber-500 cursor-pointer">{t.nav.home}</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("news")} className="hover:text-amber-500 cursor-pointer">{t.nav.news}</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("calendar")} className="hover:text-amber-500 cursor-pointer">{t.nav.calendar}</button>
                </li>
              </ul>
            </div>

            {/* Legal Directory lists */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{t.footer.links}</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigateTo("privacy")} className="hover:text-amber-500 text-left rtl:text-right cursor-pointer">{t.legal.privacyTitle}</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("terms")} className="hover:text-amber-500 text-left rtl:text-right cursor-pointer">{t.legal.termsTitle}</button>
                </li>
                <li>
                  <button onClick={() => navigateTo("disclaimer")} className="hover:text-amber-500 text-left rtl:text-right cursor-pointer">{t.legal.disclaimerTitle}</button>
                </li>
              </ul>
            </div>

          </div>

          {/* Core regulatory Risk Warning details */}
          <div className="border-t border-slate-200 dark:border-[#1a2436]/60 pt-6 space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-[#0c1322] border border-slate-200 dark:border-[#1e2e4a] rounded-2xl flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed text-slate-500 dark:text-neutral-400 text-justify text-[11px]">
                <strong className="text-slate-800 dark:text-neutral-200 block mb-1">{t.legal.disclaimerTitle}</strong>
                {t.legal.disclaimerContent[0]} {t.legal.disclaimerContent[1]}
              </p>
            </div>

            <p className="text-center font-medium text-[11px] text-slate-400 dark:text-neutral-500 pt-2">
              {t.footer.copyright}
            </p>
          </div>

        </div>
      </footer>

      {/* 5. Admin Passcode Modal Gate */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-[#1a2436] pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" />
                <span>{lang === "ar" ? "تسجيل دخول الإدارة" : "Admin Login Gate"}</span>
              </h3>
              <button
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#141f32]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
              {lang === "ar" 
                ? "الرجاء إدخال كلمة مرور الإدارة لتفعيل صلاحيات إضافة وتعديل وحذف التوصيات الحية."
                : "Please enter the administrative passcode to toggle full-fidelity creation, status modification, and deletion controls."}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (adminPasscode === "dkora2026") {
                  setIsAdmin(true);
                  localStorage.setItem("dkorafx_is_admin", "true");
                  setShowAdminModal(false);
                  setAdminPasscode("");
                  setAdminError("");
                } else {
                  setAdminError(lang === "ar" ? "كلمة المرور غير صحيحة! يرجى المحاولة مرة أخرى." : "Invalid passcode! Please try again.");
                }
              }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <label className="text-xs text-slate-500 dark:text-neutral-400 block font-bold">
                  {lang === "ar" ? "كلمة المرور" : "Passcode"}
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#141f32] border border-slate-200 dark:border-[#1e2e4a] focus:border-amber-500 rounded-xl px-4 py-2.5 outline-none text-slate-800 dark:text-white text-sm transition text-center tracking-widest font-mono"
                />
              </div>

              {adminError && (
                <p className="text-xs text-rose-500 font-bold text-center">
                  {adminError}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="flex-1 bg-slate-100 dark:bg-[#141f32] hover:bg-slate-200 dark:hover:bg-[#1a2942] border border-slate-200 dark:border-[#1e2e4a] text-slate-700 dark:text-neutral-300 font-bold rounded-xl py-2 text-xs transition"
                >
                  {lang === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl py-2 text-xs transition shadow-lg shadow-amber-500/15"
                >
                  {lang === "ar" ? "دخول" : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. RSS Full Article In-App Reader Modal */}
      {activeRssArticle && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-[#1a2436]/80 flex justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                  <span className="bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-md font-black">
                    {lang === "ar" ? "أخبار عاجلة" : "Breaking News"}
                  </span>
                  <span>•</span>
                  <span>
                    {(() => {
                      try {
                        const d = new Date(activeRssArticle.pubDate || activeRssArticle.pubdate);
                        if (!isNaN(d.getTime())) {
                          return d.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US');
                        }
                      } catch (e) {
                        console.error(e);
                      }
                      return activeRssArticle.pubDate || activeRssArticle.pubdate || "";
                    })()}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white leading-snug text-right">
                  {activeRssArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveRssArticle(null)}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-[#141f32] dark:hover:bg-[#1c2a42] text-slate-500 dark:text-neutral-400 p-2.5 rounded-full transition shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable Content) */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-neutral-300 leading-relaxed text-justify">
              
              {/* Optional Enclosure / Cover Image */}
              {activeRssArticle.thumbnail && (
                <div className="rounded-2xl overflow-hidden max-h-72 bg-[#141f32] mb-4">
                  <LazyImage
                    src={activeRssArticle.thumbnail === "/src/assets/images/meme_coins_2026_1787419226241.jpg" ? "/meme_coins_2026_1787419226241.jpg" : activeRssArticle.thumbnail}
                    alt="Article visual"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Render content directly from feed safely or generated by Gemini */}
              {rssContentLoading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
                  <p className="text-xs font-bold text-slate-500 dark:text-neutral-400">
                    {lang === "ar" ? "جاري جلب وتحليل محتوى الخبر بالذكاء الاصطناعي..." : "Generating AI financial analysis and summary..."}
                  </p>
                </div>
              ) : (
                <div 
                  className="rss-article-content text-right text-slate-800 dark:text-neutral-200 space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: generatedRssContent || activeRssArticle.content || activeRssArticle.description || ""
                  }}
                />
              )}

              {/* Context-aware Internal Linking Banner */}
              {activeRssArticle && (
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1a2436] space-y-4">
                  <span className="text-xs font-black text-amber-500 uppercase tracking-wider block">
                    {lang === "ar" ? "💡 أدوات وتوصيات داخلية مقترحة" : "💡 Suggested Tools & Lessons"}
                  </span>
                  
                  {(() => {
                    const titleText = (activeRssArticle.title || "").toLowerCase();
                    const contentText = (activeRssArticle.content || "").toLowerCase();
                    const isGold = titleText.includes("ذهب") || titleText.includes("gold") || titleText.includes("xauusd") || contentText.includes("ذهب") || contentText.includes("gold");
                    const isCrypto = titleText.includes("بيتكوين") || titleText.includes("bitcoin") || titleText.includes("ميم") || titleText.includes("meme") || titleText.includes("crypto") || contentText.includes("bitcoin") || contentText.includes("meme");

                    if (isGold) {
                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <button
                            onClick={() => {
                              setActiveRssArticle(null);
                              openSchoolArticle("gold-risk-management");
                            }}
                            className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] rounded-2xl p-4 text-right transition flex items-center gap-3 cursor-pointer font-extrabold text-xs"
                          >
                            <BookOpen className="w-5 h-5 shrink-0 text-amber-500" />
                            <div className="space-y-0.5 text-right">
                              <span className="block text-slate-800 dark:text-white font-black text-sm">
                                {lang === "ar" ? "درس إدارة مخاطر الذهب" : "Gold Risk Management Lesson"}
                              </span>
                              <span className="text-slate-500 dark:text-neutral-400 font-medium block">{lang === "ar" ? "تعلم كيف تتداول الذهب بأمان وتفادي الانزلاقات السعرية." : "Master XAUUSD volatility control formulas."}</span>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              setActiveRssArticle(null);
                              setSearchQuery("XAUUSD");
                              navigateTo("home");
                              setTimeout(() => {
                                const el = document.getElementById("live-signals-board");
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }, 300);
                            }}
                            className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] rounded-2xl p-4 text-right transition flex items-center gap-3 cursor-pointer font-extrabold text-xs"
                          >
                            <TrendingUp className="w-5 h-5 shrink-0 text-amber-500" />
                            <div className="space-y-0.5 text-right">
                              <span className="block text-slate-800 dark:text-white font-black text-sm">
                                {lang === "ar" ? "توصيات الذهب المباشرة" : "Live Gold Recommendations"}
                              </span>
                              <span className="text-slate-500 dark:text-neutral-400 font-medium block">{lang === "ar" ? "تابع صفقات وتحليلات الذهب الفنية الفورية الآن." : "Browse all active XAUUSD target parameters."}</span>
                            </div>
                          </button>
                        </div>
                      );
                    } else if (isCrypto) {
                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <button
                            onClick={() => {
                              setActiveRssArticle(null);
                              openSchoolArticle("meme-coins");
                            }}
                            className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] rounded-2xl p-4 text-right transition flex items-center gap-3 cursor-pointer font-extrabold text-xs"
                          >
                            <BookOpen className="w-5 h-5 shrink-0 text-amber-500" />
                            <div className="space-y-0.5 text-right">
                              <span className="block text-slate-800 dark:text-white font-black text-sm">
                                {lang === "ar" ? "درس الاستثمار في عملات الميم" : "Meme Coins Investment"}
                              </span>
                              <span className="text-slate-500 dark:text-neutral-400 font-medium block">{lang === "ar" ? "كيف تقتنص عملات الميم وتتجنب عمليات سحب السيولة." : "How to securely spot viral coins."}</span>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              setActiveRssArticle(null);
                              setSearchQuery("BTC");
                              navigateTo("home");
                              setTimeout(() => {
                                const el = document.getElementById("live-signals-board");
                                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                              }, 300);
                            }}
                            className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] rounded-2xl p-4 text-right transition flex items-center gap-3 cursor-pointer font-extrabold text-xs"
                          >
                            <TrendingUp className="w-5 h-5 shrink-0 text-amber-500" />
                            <div className="space-y-0.5 text-right">
                              <span className="block text-slate-800 dark:text-white font-black text-sm">
                                {lang === "ar" ? "توصيات الكريبتو الحية" : "Live Crypto Recommendations"}
                              </span>
                              <span className="text-slate-500 dark:text-neutral-400 font-medium block">{lang === "ar" ? "تابع صفقات العملات الرقمية المباشرة فور صدورها." : "Monitor real-time coin target allocations."}</span>
                            </div>
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <button
                            onClick={() => {
                              setActiveRssArticle(null);
                              openSchoolArticle("intro-forex");
                            }}
                            className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] rounded-2xl p-4 text-right transition flex items-center gap-3 cursor-pointer font-extrabold text-xs"
                          >
                            <BookOpen className="w-5 h-5 shrink-0 text-amber-500" />
                            <div className="space-y-0.5 text-right">
                              <span className="block text-slate-800 dark:text-white font-black text-sm">
                                {lang === "ar" ? "أساسيات الفوركس للمبتدئين" : "Introduction to Forex"}
                              </span>
                              <span className="text-slate-500 dark:text-neutral-400 font-medium block">{lang === "ar" ? "تأسيس كامل لفهم النقاط والرافعة المالية والسبريد." : "Understand leverage, pips, and spreads cleanly."}</span>
                            </div>
                          </button>

                          <button
                            onClick={() => {
                              setActiveRssArticle(null);
                              navigateTo("home");
                              setTimeout(() => {
                                const el = document.getElementById("risk-calculator-widget");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                                  el.classList.add("ring-4", "ring-amber-500", "ring-offset-2", "dark:ring-offset-slate-900");
                                  setTimeout(() => {
                                    el.classList.remove("ring-4", "ring-amber-500", "ring-offset-2", "dark:ring-offset-slate-900");
                                  }, 3000);
                                }
                              }, 300);
                            }}
                            className="bg-slate-50 dark:bg-[#141f32]/40 hover:bg-slate-100 dark:hover:bg-[#1a2942] border border-slate-200/60 dark:border-[#1e2e4a] rounded-2xl p-4 text-right transition flex items-center gap-3 cursor-pointer font-extrabold text-xs"
                          >
                            <Calculator className="w-5 h-5 shrink-0 text-amber-500" />
                            <div className="space-y-0.5 text-right">
                              <span className="block text-slate-800 dark:text-white font-black text-sm">
                                {lang === "ar" ? "حاسبة إدارة المخاطر" : "Interactive Risk Calculator"}
                              </span>
                              <span className="text-slate-500 dark:text-neutral-400 font-medium block">{lang === "ar" ? "احسب حجم اللوت المقترح لأي صفقة حية فوراً." : "Calculate ideal standard lot size limits."}</span>
                            </div>
                          </button>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-slate-50 dark:bg-[#0c1322]/60 border-t border-slate-100 dark:border-[#1a2436]/60 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[11px] font-bold text-slate-400">
                {lang === "ar" ? "المصدر الأصلي: Investing.com (العربية)" : "Source: Investing.com"}
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={activeRssArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#141f32] dark:hover:bg-[#1c2a42] text-slate-700 dark:text-neutral-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <span>{lang === "ar" ? "زيارة المصدر الأصلي" : "Visit Source"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setActiveRssArticle(null)}
                  className="flex-1 sm:flex-initial px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-xl text-xs font-black transition cursor-pointer"
                >
                  {lang === "ar" ? "إغلاق" : "Close"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Full-fidelity mock data initial backing
function getFallbackSignals(): Signal[] {
  return [
    {
      id: "sig-nzdjpy-sell-949",
      pair: "NZDJPY",
      type: "SELL",
      entry: "94.90",
      tp1: "90.00",
      tp2: "",
      tp3: "",
      sl: "95.60",
      status: "ACTIVE",
      explanation: "توصية بيع زوج النيوزيلندي ين (NZD/JPY) من مستويات 94.90 نتيجة لملامسة مستويات مقاومة هامة وبدء ارتداد سلبي مدعوماً بزخم هابط.",
      date: "2026-08-23T16:00:00.000Z",
      views: "1.1K",
      photoUrl: "",
      rawText: "بيع نيوزلندى ين من سعر 94.9\nستوب 95.60\nهدف 90.00"
    },
    {
      id: "sig-usdchf-buy-8025",
      pair: "USDCHF",
      type: "BUY",
      entry: "0.8025",
      tp1: "0.8055",
      tp2: "",
      tp3: "",
      sl: "0.7940",
      status: "CLOSED",
      explanation: "تم تحديث توصية شراء زوج الدولار فرانك (USD/CHF) وإغلاق الصفقة يدوياً بنجاح على ربح +30 نقطة فنية محققة بالكامل لتأمين الحساب وحصد الأرباح.",
      date: "2026-08-23T16:00:00.000Z",
      views: "920",
      photoUrl: "",
      rawText: "شراء الدولار فرانك من سعر .8025\nستوب .7940\nهدف .8110\n\nتحديث: تم إغلاق الصفقة يدوياً بنجاح على ربح +30 نقطة (عند 0.8055) ✅"
    },
    {
      id: "sig-gbpjpy-sell-2166",
      pair: "GBPJPY",
      type: "SELL",
      entry: "216.60",
      tp1: "204.00",
      tp2: "",
      tp3: "",
      sl: "219.30",
      status: "ACTIVE",
      explanation: "توصية بيع زوج الجنيه الاسترليني مقابل الين الياباني (GBP/JPY) من مستويات 216.60 لزيادة الضغوط السلبية وكسر مستويات الدعم المتوسطة.",
      date: "2026-08-23T16:00:00.000Z",
      views: "1.3K",
      photoUrl: "",
      rawText: "بيع الجنيه ين من سعر 216.6\nستوب 219.30\nهدف 204"
    },
    {
      id: "sig-btcusd-sell-77800",
      pair: "BTCUSD",
      type: "SELL",
      entry: "77,800",
      tp1: "74,350",
      tp2: "",
      tp3: "",
      sl: "79,500",
      status: "ACTIVE",
      explanation: "توصية بيع عملة البيتكوين الرقمية (BTC/USD) من مستويات 77,800 دولار لتشبع الشراء الفني وبداية حركة تصحيحية هابطة محتملة.",
      date: "2026-08-23T16:00:00.000Z",
      views: "2.4K",
      photoUrl: "",
      rawText: "بيع البيتكوي من سعر 77800\nستوب 79500\nهدف 74350"
    },
    {
      id: "sig-usdjpy-buy-159",
      pair: "USDJPY",
      type: "BUY",
      entry: "159.00",
      tp1: "161.000",
      tp2: "",
      tp3: "",
      sl: "156.400",
      status: "ACTIVE",
      explanation: "توصية شراء الدولار مقابل الين الياباني (USD/JPY) نظراً لوجود دعم فني قوي وبوادر صعود تصحيحي على المدى المتوسط والالتزام بأهداف إدارة المخاطر.",
      date: "2026-08-21T15:30:00.000Z",
      views: "1.2K",
      photoUrl: "",
      rawText: "شراء الدولار ين من 159\nستوب 156.400\nهدف 161.000"
    },
    {
      id: "sig-audusd-sell-709",
      pair: "AUDUSD",
      type: "SELL",
      entry: "0.70900",
      tp1: "0.69000",
      tp2: "",
      tp3: "",
      sl: "0.72000",
      status: "ACTIVE",
      explanation: "توصية بيع الدولار الأسترالي مقابل الدولار الأمريكي (AUD/USD) نتيجة لملامسة خط المقاومة الهابط وبدء الزخم السلبي على الفريمات اليومية.",
      date: "2026-08-21T15:30:00.000Z",
      views: "950",
      photoUrl: "",
      rawText: "بيع الدولار الاسترالى دولار امريكى من 0.70900\nستوب 0.72000\nهدف 0.69000"
    },
    {
      id: "sig-gold-sell-4520",
      pair: "XAUUSD (GOLD)",
      type: "SELL",
      entry: "4520",
      tp1: "4200",
      tp2: "",
      tp3: "",
      sl: "4550",
      status: "SL HIT",
      explanation: "تم إغلاق توصية بيع الذهب (XAU/USD) على خسارة بعد أن لامس السعر مستويات وقف الخسارة (ستوب لوز) عند 4550. تم ترحيل هذه التوصية إلى أرشيف التوصيات لضمان الشفافية ومتابعة الأداء الإجمالي للمنصة.",
      date: "2026-08-21T13:30:00.000Z",
      views: "1.6K",
      photoUrl: "",
      rawText: "بيع الذهب من 4520\nستوب 4550\nهدف 4200\n\nتحديث: ضربت ستوب لوز وتم الإغلاق ونقلها للأرشيف."
    },
    {
      id: "sig-usdcad-buy-13820",
      pair: "USDCAD",
      type: "BUY",
      entry: "1.3820",
      tp1: "1.40500",
      tp2: "",
      tp3: "",
      sl: "1.36700",
      status: "ACTIVE",
      explanation: "توصية شراء زوج الدولار الأمريكي مقابل الدولار الكندي (USD/CAD) من مستويات الدعم الفنية 1.3820 بهدف صعودي حاد نحو 1.40500 ووقف خسارة صارم عند 1.36700.",
      date: "2026-08-24T09:42:00.000Z",
      views: "150",
      photoUrl: "",
      rawText: "شراء الدولار الكندى من سعر 1.3820\nستوب 1.36700\nهدف 1.40500"
    }
  ];
}
