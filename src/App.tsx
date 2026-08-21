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
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "home";
  });

  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || null;
  });

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("newsId") || null;
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
    const saved = localStorage.getItem("decou_fx_local_signals_v7");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse local signals", e);
      }
    }
    const fallback = getFallbackSignals();
    localStorage.setItem("decou_fx_local_signals_v7", JSON.stringify(fallback));
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

  // Sync state transitions back to the browser's URL query string (Copyable/Shareable Links!)
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    url.searchParams.set("page", page);
    
    if (selectedSignalId) {
      url.searchParams.set("id", selectedSignalId);
    } else {
      url.searchParams.delete("id");
    }

    if (selectedNewsId) {
      url.searchParams.set("newsId", selectedNewsId);
    } else {
      url.searchParams.delete("newsId");
    }

    window.history.pushState({}, "", url.toString());
  }, [lang, page, selectedSignalId, selectedNewsId]);

  // Listen to browser forward & back button clicks to update state instantly
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "ar") setLang(urlLang);
      
      setPage(params.get("page") || "home");
      setSelectedSignalId(params.get("id") || null);
      setSelectedNewsId(params.get("newsId") || null);
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
    localStorage.setItem("decou_fx_local_signals_v2", JSON.stringify(newList));
    localStorage.setItem("decou_fx_local_signals_v7", JSON.stringify(newList));
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
        const saved = localStorage.getItem("decou_fx_local_signals_v2") || localStorage.getItem("decou_fx_local_signals_v7");
        currentList = saved ? JSON.parse(saved) : getFallbackSignals();
      }

      setSignals(currentList);
      localStorage.setItem("decou_fx_local_signals_v2", JSON.stringify(currentList));
      localStorage.setItem("decou_fx_local_signals_v7", JSON.stringify(currentList));
      
      if (soundEnabled) {
        playNotificationSound();
      }
    } catch {
      setError(lang === "ar" ? "فشل تحديث البيانات." : "Refresh failed.");
    } finally {
      setLoading(false);
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
      if (data && data.status === "ok" && Array.isArray(data.items)) {
        setRssNews(data.items);
      } else {
        throw new Error("Invalid RSS data format");
      }
    } catch (err: any) {
      console.error(err);
      setRssError(lang === "ar" ? "فشل تحميل الأخبار الاقتصادية العاجلة" : "Failed to load live economic news");
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
            localStorage.setItem("decou_fx_local_signals_v2", JSON.stringify(list));
            localStorage.setItem("decou_fx_local_signals_v7", JSON.stringify(list));
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
        console.error("Failed to fetch generated news content:", err);
        setGeneratedRssContent(lang === "ar"
          ? `<p>حدث خطأ أثناء تحميل محتوى الخبر بالذكاء الاصطناعي. يمكنك النقر على "زيارة المصدر الأصلي" لقراءة التقرير من موقع Investing.</p>`
          : `<p>An error occurred while loading article content. Please click "Visit Source" to read on the original website.</p>`
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
                onClick={() => navigateTo("calendar")}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  page === "calendar"
                    ? "bg-amber-500/10 text-amber-500 dark:text-amber-400 font-extrabold"
                    : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#141f32] hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.calendar}</span>
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

              {/* Sound toggle */}
              <button
                onClick={() => {
                  const s = !soundEnabled;
                  setSoundEnabled(s);
                  localStorage.setItem("decou_fx_sound", String(s));
                  if (s) playNotificationSound();
                }}
                className={`p-2.5 rounded-xl border transition-all ${
                  soundEnabled
                    ? "border-amber-500/20 bg-amber-500/5 text-amber-500"
                    : "border-slate-200 dark:border-[#1e2e4a] bg-slate-50 dark:bg-[#141f32] text-slate-400"
                }`}
                title="Toggle Sounds"
              >
                {soundEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
              </button>

              {/* Admin Mode Toggle */}
              <button
                onClick={() => {
                  if (isAdmin) {
                    setIsAdmin(false);
                    localStorage.setItem("dkorafx_is_admin", "false");
                  } else {
                    setShowAdminModal(true);
                    setAdminPasscode("");
                    setAdminError("");
                  }
                }}
                className={`p-2.5 rounded-xl border transition-all ${
                  isAdmin 
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10" 
                    : "border-slate-200 dark:border-[#1e2e4a] bg-slate-50 dark:bg-[#141f32] hover:bg-slate-100 dark:hover:bg-[#1a2942] text-slate-700 dark:text-neutral-300"
                }`}
                title={isAdmin ? (lang === "ar" ? "خروج من وضع الإدارة" : "Exit Admin Mode") : (lang === "ar" ? "دخول الإدارة" : "Admin Login")}
              >
                {isAdmin ? <Unlock className="w-4.5 h-4.5 text-emerald-500" /> : <Lock className="w-4.5 h-4.5" />}
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
          onClick={() => navigateTo("calendar")}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${page === "calendar" ? "text-amber-500" : "text-slate-500"}`}
        >
          <Calendar className="w-5 h-5" />
          <span>{t.nav.calendar}</span>
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
              <div className="lg:col-span-2 space-y-6">
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
                <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-6 rounded-3xl shadow-sm space-y-4">
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
                        <img
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
                        <img
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
                              <img
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

        {/* === ROUTE: ECONOMIC CALENDAR === */}
        {page === "calendar" && (
          <div className="animate-fadeIn space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block">
                {lang === "ar" ? "📅 الأجندة الاقتصادية الحية" : "📅 Live Economic Calendar"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t.calendar.title}</h2>
              <p className="text-sm text-slate-500 dark:text-neutral-400 leading-relaxed">
                {t.calendar.subtitle}
              </p>
            </div>

            {/* Calendar filtering controls */}
            <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] p-4 rounded-2xl flex flex-wrap gap-2 items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-neutral-400">{lang === "ar" ? "تصفية حسب الأثر الاقتصادي:" : "Filter by Volatility Impact:"}</span>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as any[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setCalendarFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                      calendarFilter === filter
                        ? "bg-amber-500 text-black font-extrabold"
                        : "bg-slate-50 dark:bg-[#141f32] text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#1a2942]"
                    }`}
                  >
                    {filter === 'ALL' ? (lang === "ar" ? "عرض الكل" : "Show All") : t.calendar[`impact${filter.charAt(0) + filter.slice(1).toLowerCase() as 'High' | 'Medium' | 'Low'}`]}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar list layout */}
            <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-[#1a2436] rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-50 dark:bg-[#141f32]/80 border-b border-slate-100 dark:border-[#1a2436] font-bold">
                    <tr>
                      <th className="px-6 py-4">{t.calendar.time}</th>
                      <th className="px-6 py-4">{t.calendar.currency}</th>
                      <th className="px-6 py-4">{t.calendar.event}</th>
                      <th className="px-6 py-4">{t.calendar.impact}</th>
                      <th className="px-6 py-4">{t.calendar.actual}</th>
                      <th className="px-6 py-4">{t.calendar.forecast}</th>
                      <th className="px-6 py-4">{t.calendar.previous}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1a2436]/60">
                    {calendarEvents
                      .filter((ev) => calendarFilter === "ALL" || ev.impact === calendarFilter)
                      .map((ev) => {
                        const isHigh = ev.impact === "HIGH";
                        const isMed = ev.impact === "MEDIUM";

                        return (
                          <tr key={ev.id} className="hover:bg-slate-50 dark:hover:bg-[#141f32]/40 transition duration-150">
                            <td className="px-6 py-4 font-bold text-slate-400">{ev.time}</td>
                            <td className="px-6 py-4 font-black text-amber-600 dark:text-amber-400">{ev.currency}</td>
                            <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white">
                              {lang === "ar" ? ev.eventAr : ev.eventEn}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                                  isHigh
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                    : isMed
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                }`}
                              >
                                {t.calendar[`impact${ev.impact.charAt(0) + ev.impact.slice(1).toLowerCase() as 'High' | 'Medium' | 'Low'}`]}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{ev.actual || "—"}</td>
                            <td className="px-6 py-4 text-slate-500 dark:text-neutral-400">{ev.forecast || "—"}</td>
                            <td className="px-6 py-4 text-slate-400">{ev.previous || "—"}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

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
                    { label: t.nav.calendar, path: "calendar" },
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
                  <img
                    src={activeRssArticle.thumbnail}
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
      date: new Date().toISOString(),
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
      date: new Date().toISOString(),
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
    }
  ];
}
