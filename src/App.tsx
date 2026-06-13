import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Trophy,
  Award,
  Share2,
  Download,
  RotateCcw,
  Flame,
  Sparkles,
  Target,
  Shield,
  Star,
  Zap,
  Activity,
  Heart,
  User,
  Globe,
  Mail,
  Lock,
  Copy,
  Check,
  Info,
  X,
  Upload,
  Trash2,
  Loader2
} from "lucide-react";

import { Question, PlayerProfile } from "./types";
import { QUESTION_BANK, PLAYER_PROFILES } from "./data";
import ArticlesPage from "./components/ArticlesPage";
import LegalModals from "./components/LegalModals";
import { translations } from "./translations";

// UI translation dictionary
const uiTranslations = {
  ar: {
    title: "من يشبهك من لاعبي المونديال؟",
    badge: "مستكشف الشخصية الكروية الكبرى",
    tagline: "تحديث ٢٠٢٦ • متجدد كلياً ومجاني للجميع",
    subtitle: "WORLD CUP PLAYER MATCH",
    heroBadge: "الاختبار الرياضي الأكثر شعبية وتحديثاً لعام ٢٠٢٦",
    heroHeadline1: "اكتشف شبيهك من",
    heroHeadline2: "أساطير كأس العالم!",
    heroDesc: "هل أنت العبقري الموهوب الذي لا تتكرر لمساته، أم المحرك القوي ذو الإرادة الحديدية، أم الصاروخ الطموح؟ أجب عن أسئلتنا التكتيكية المبتكرة وحلل شخصيتك الرياضية الآن!",
    card1Title: "متجدد كلياً وذكي",
    card1Desc: "أسئلة عشوائية وسيناريوهات فنية ممتازة في كل محاولة",
    card2Title: "مجاني للجميع دائماً",
    card2Desc: "مفتوح بالكامل وبدون أي اشتراكات أو تكاليف خفية إطلاقاً",
    startBtn: "ابدأ اختبار شخصية الأبطال",
    startNote: "* يقوم محرك اللعبة باختيار ٧ أسئلة عشوائية ممتعة وتوليد النتيجة لضمان تجربة حيوية ومتجددة دائماً!",
    questionLabel: "السؤال",
    ofLabel: "من أصل",
    progressLabel: "مستوى التقدم",
    prevBtn: "السابق",
    attemptLabel: "المحاولة رقم",
    analyzingTitle: "جاري مطابقة بصمتك الرياضية الكروية...",
    analyzingLine1: "توليد نموذج الفروقات والشخصية الرياضية...",
    analyzingLine2: "استخلاص دقة الكفاءة والروح الميدانية...",
    analyzingLine3: "مقارنة جينات الهدافين وصناع اللعب والمهاجمين...",
    analyzingStatus1: "جاري العمل",
    analyzingStatus2: "مكتمل ١٠٠٪",
    analyzingStatus3: "مطابقة نهائية",
    analyzingQuote: "\"قاريء جينات الأبطال يطرق الباب... يحضر نموذج الأسطورة الخاص بك.\"",
    resultBanner: "تحليل الشخصية المونديالية كمل بنجاح! 🏆",
    resultTitle: "اللاعب المونديالي الشبيه بك هو:",
    resultProfileId: "رقم التعريف المونديالي الخاص بك:",
    resultAnalysisTitle: "التحليل النفسي والشخصي لأسلوبك الكروي المعتمد:",
    resultStrengthsTitle: "أبرز نقاط قوتك ومهاراتك الفنية المتطابقة:",
    resultMottoTitle: "شعــارك الأبــدي في الملاعب والحياة:",
    resultStatsTitle: "المؤشرات الرقمية الكبرى لبطاقة أسطورتك الخاصة:",
    statSpeed: "السرعة والانطلاق",
    statDribbble: "المراوغة والتحكم الفني",
    statShooting: "الحس التهديفي والإنهاء",
    statStamina: "اللياقة والتحمل الهيكلي",
    statTeamwork: "اللعب الجماعي والتضحية",
    retakeBtn: "خوض الاختبار مجدداً",
    downloadBtn: "تحميل بطاقة الأسطورة كصورة",
    shareTitle: "شارك نتيجتك الأسطورية وقارنها مع أصدقائك بجروب الكرة:",
    shareWhatsapp: "🟢 شارك عبر واتساب",
    shareX: "⚫ شارك على منصة X",
    shareFacebook: "🔵 شارك على فيسبوك",
    toastImageLoading: "جاري إعداد بطاقة الأسطورة الخاصة بك كصورة عالية الدقة... 📥",
    toastImageSuccess: "تم تنزيل بطاقة أسطورتك بنجاح! 🏆 شاركها مع أصدقائك الآن!",
    toastImageFail: "عذراً! لم نتمكن من تنزيل الصورة تلقائياً بجهازك، يمكنك أخذ لقطة شاشة رائعة ومشاركة نتيجتك!",
    toastShareReady: "تم تجهيز رابط المشاركة بجهازك بنجاح!",
    footerRights: "جميع حقوق اختبار \"من يشبهك من لاعبي المونديال\" محفوظة © لعام ٢٠٢٦ من خلال منصة المونديال.",
    footerMeta: "محرك ألعاب ذكي وآمن بالكامل يعمل محلياً بالكامل بمتصفحك"
  },
  en: {
    title: "Which World Cup Player Are You?",
    badge: "National Soccer Personality Analyst",
    tagline: "2026 Update • Completely Revamped & Free for Everyone",
    subtitle: "WORLD CUP PLAYER MATCH",
    heroBadge: "The Most Popular Football Personality Test of 2026",
    heroHeadline1: "Discover Your Matching",
    heroHeadline2: "World Cup Legends!",
    heroDesc: "Are you the quiet genius whose magical touches redefine football history, the relentless machine of absolute steel will, or the supersonic rocket? Answer our smart tactical questions and explore your sports alter-ego now!",
    card1Title: "Fully Revamped",
    card1Desc: "Completely randomized questions and realistic scenarios on every attempt",
    card2Title: "Free for Everyone",
    card2Desc: "Accessible and open-source forever with zero subscriptions or fees",
    startBtn: "Launch Champion Personality Quiz",
    startNote: "* The game engine chooses 7 random questions dynamically to ensure completely customized and fun results every single time!",
    questionLabel: "Question",
    ofLabel: "of",
    progressLabel: "Progress Level",
    prevBtn: "Previous",
    attemptLabel: "Attempt No.",
    analyzingTitle: "Analyzing your tactical football attributes...",
    analyzingLine1: "Generating customized athletic profile metrics...",
    analyzingLine2: "Extracting psychological sports fidelity...",
    analyzingLine3: "Comparing scoring genes and playmaker structures...",
    analyzingStatus1: "Computing",
    analyzingStatus2: "100% Completed",
    analyzingStatus3: "Final Matching",
    analyzingQuote: "\"The champion genetic analyzer is opening gates... creating your legend card.\"",
    resultBanner: "Football Personality Analysis Successfully Complete! 🏆",
    resultTitle: "Your Matching World Cup Legend is:",
    resultProfileId: "Your Mondial Profile ID:",
    resultAnalysisTitle: "Psychological & Tactical Football Analysis:",
    resultStrengthsTitle: "Your Matching Strengths & Key Technical Traits:",
    resultMottoTitle: "Your Eternal Motto in Field & Life:",
    resultStatsTitle: "Primary Performance Stats on Your Legend Card:",
    statSpeed: "Speed & Acceleration",
    statDribbble: "Dribbling & Ball Handling",
    statShooting: "Clinical Finishing & Goals",
    statStamina: "Stamina & Endurance",
    statTeamwork: "Selfless Group Contribution",
    retakeBtn: "Restart the Personality Quiz",
    downloadBtn: "Download Legend Card as Image",
    shareTitle: "Share your legendary matching card on your football groups:",
    shareWhatsapp: "🟢 Share via WhatsApp",
    shareX: "⚫ Share on X Platform",
    shareFacebook: "🔵 Share on Facebook",
    toastImageLoading: "Preparing your fine-resolution Legend Card download... 📥",
    toastImageSuccess: "Your legend card was downloaded successfully! 🏆 Share it now!",
    toastImageFail: "Apologies, Champ! Automatic download failed on this device. Feel free to snap a screenshot to share with your friends!",
    toastShareReady: "Sharing link successfully activated for your device!",
    footerRights: "Which World Cup Player Are You? All rights reserved © 2026.",
    footerMeta: "FULLY SECURE ON-DEVICE APPLET • FAST RESPONSE MATRIX"
  }
};

export default function App() {
  // Navigation tabs: "quiz" (Home) | "blog" (Articles) | "sitemap" (Sitemap page)
  const [activeTab, setActiveTab] = useState<"quiz" | "blog" | "sitemap" >("quiz");
  
  // Legal modal state
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer' | null>(null);

  // Determine language based on query parameter (?lang=en or ?lang=ar), defaulting to Arabic ('ar')
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeScreen, setActiveScreen] = useState<"start" | "quiz" | "analyzing" | "result">("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [finalPlayer, setFinalPlayer] = useState<PlayerProfile | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<number>(1);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>("");

  // States for user photo and generative AI blending
  const [userUploadedFile, setUserUploadedFile] = useState<string | null>(null);
  const [generatedCombinedImage, setGeneratedCombinedImage] = useState<string | null>(null);
  const [isBlending, setIsBlending] = useState<boolean>(false);
  const [blendStatusText, setBlendStatusText] = useState<string>("");
  const [blendingError, setBlendingError] = useState<string | null>(null);

  const resultCardRef = useRef<HTMLDivElement>(null);

  // Sync language and active tab with URL query parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // 1. Setup Language
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "ar") {
      setLang(urlLang);
    } else {
      // Default to Arabic but update the URL accordingly for neatness of link sharing
      const url = new URL(window.location.href);
      url.searchParams.set("lang", "ar");
      window.history.replaceState({}, "", url.toString());
    }

    // 2. Setup Active tab / view
    const viewParam = params.get("view");
    if (viewParam === "blog") {
      setActiveTab("blog");
    } else if (viewParam === "sitemap") {
      setActiveTab("sitemap");
    } else {
      setActiveTab("quiz");
    }

    // 3. Setup active legal page parameter if present
    const legalParam = params.get("legal");
    if (legalParam === "privacy" || legalParam === "terms" || legalParam === "about" || legalParam === "contact" || legalParam === "disclaimer") {
      setActiveLegalModal(legalParam as any);
    }
  }, []);

  // Update URL parameter and HTML document meta when language changes
  const handleLanguageChange = (newLang: "ar" | "en") => {
    setLang(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.history.pushState({}, "", url.toString());
    playInteractionSound();
  };

  // Switch tab and sync with browser address bar
  const handleTabChange = (tab: "quiz" | "blog" | "sitemap") => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    if (tab === "quiz") {
      url.searchParams.delete("view");
    } else {
      url.searchParams.set("view", tab);
    }
    window.history.pushState({}, "", url.toString());
    playInteractionSound();
  };

  // Device vibration simulation or safety bypass
  const playInteractionSound = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(20);
      } catch (e) {
        // Safe bypass for iframe constraints
      }
    }
  };

  // Initialize Quiz flow (Selecting exactly 7 random questions from the 40-question bank)
  const initializeQuiz = () => {
    playInteractionSound();
    setCurrentIndex(0);
    setUserAnswers({});

    // Fisher-Yates shuffle algorithm on the 40-question bank
    const shuffledPool = [...QUESTION_BANK];
    for (let i = shuffledPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
    }

    // Capture exactly 7 questions
    const selectedQuestions = shuffledPool.slice(0, 7).map((q) => {
      // Shuffle options lists inside each question too for extra volatility and replayability
      const shuffledOptions = [...q.options];
      for (let x = shuffledOptions.length - 1; x > 0; x--) {
        const y = Math.floor(Math.random() * (x + 1));
        [shuffledOptions[x], shuffledOptions[y]] = [shuffledOptions[y], shuffledOptions[x]];
      }
      return { ...q, options: shuffledOptions };
    });

    setQuestions(selectedQuestions);
    setActiveScreen("quiz");
  };

  // Answer selection callback
  const handleAnswerClick = (playerCode: string) => {
    playInteractionSound();

    const currentQuestion = questions[currentIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: playerCode,
    }));

    if (currentIndex < 6) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all 7 questions, transition into analyzing gate
      setActiveScreen("analyzing");
      setTimeout(() => {
        calculateFinalScoreAndDisplay();
      }, 2200);
    }
  };

  // Back button navigator within quiz
  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      playInteractionSound();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Evaluate final matching profile
  const calculateFinalScoreAndDisplay = () => {
    const counts: Record<string, number> = {
      messi: 0,
      ronaldo: 0,
      mbappe: 0,
      haaland: 0,
      modric: 0,
      salah: 0,
    };

    Object.values(userAnswers).forEach((p) => {
      const pStr = p as string;
      if (pStr in counts) {
        counts[pStr] += 1;
      }
    });

    let majorityPlayerCode: keyof typeof counts = "messi";
    let maxCount = -1;

    Object.entries(counts).forEach(([code, count]) => {
      if (count > maxCount) {
        maxCount = count;
        majorityPlayerCode = code as any;
      } else if (count === maxCount) {
        // Random tie breaker
        if (Math.random() > 0.5) {
          majorityPlayerCode = code as any;
        }
      }
    });

    const foundMatch = PLAYER_PROFILES.find((p) => p.id === majorityPlayerCode) || PLAYER_PROFILES[0];
    setFinalPlayer(foundMatch);
    setActiveScreen("result");
  };

  // Reset quiz state to re-evaluate personality traits
  const handleResetQuiz = () => {
    setQuizAttempts((prev) => prev + 1);
    initializeQuiz();
  };

  // Render high-fidelity result card as image download via html2canvas
  const handleDownloadResultImage = async () => {
    playInteractionSound();
    if (!resultCardRef.current || !finalPlayer) return;

    triggerToast(t.toastImageLoading);

    try {
      resultCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const options = {
        useCORS: true,
        backgroundColor: "#04081a", // slate dark card backdrop hex code to render download flawlessly
        scale: 2, // crisp scaling
        logging: false,
      };

      await new Promise((resolve) => setTimeout(resolve, 350));
      const canvas = await html2canvas(resultCardRef.current, options);
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = `mondial-legend-card-${finalPlayer.id}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      triggerToast(t.toastImageSuccess);
    } catch (err: any) {
      console.error("html2canvas error: ", err);
      triggerToast(t.toastImageFail);
    }
  };

  // Triggers the Express backend to blend photos using server-side Gemini API
  const handleGenerateAIBlend = async () => {
    if (!userUploadedFile || !finalPlayer) return;
    setIsBlending(true);
    setBlendingError(null);
    setGeneratedCombinedImage(null);

    const statusesAr = [
      "جاري تحليل ملامح الوجه وتحجيمها...",
      "توليف الزي الرياضي الوطني المتطابق...",
      "رسم الإضاءة والملعب بالذكاء الاصطناعي...",
      "محاكاة الدمج المتكامل للوجهين...",
      "إضفاء اللمسات الرياضية النهائية..."
    ];
    const statusesEn = [
      "Analyzing and scaling facial features...",
      "Tailoring matching national team kit...",
      "Synthesizing stadium background with AI...",
      "Blending user and player portraits...",
      "Finalizing athletic details..."
    ];

    const statusList = lang === "ar" ? statusesAr : statusesEn;
    let statusIdx = 0;
    setBlendStatusText(statusList[0]);

    const statusInterval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statusList.length;
      setBlendStatusText(statusList[statusIdx]);
    }, 2000);

    try {
      const response = await fetch("/api/match-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userImage: userUploadedFile,
          playerId: finalPlayer.id,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to communicate with AI server");
      }

      const data = await response.json();
      if (data.imageUrl) {
        setGeneratedCombinedImage(data.imageUrl);
        triggerToast(lang === "ar" ? "تم توليد صورتك الأسطورية بنجاح! ⚡" : "Legendary AI portrait generated successfully! ⚡");
      } else {
        throw new Error("No image URL returned");
      }
    } catch (err: any) {
      console.error("AI Blend Error:", err);
      setBlendingError(lang === "ar" ? "فشل الاتصال بالذكاء الاصطناعي أو انتهت مهلة الخادم، يرجى المحاولة لاحقاً" : "AI connection failed or server timed out, please try again later.");
      triggerToast(lang === "ar" ? "فشل التوليد بالذكاء الاصطناعي" : "AI Generation failed");
    } finally {
      clearInterval(statusInterval);
      setIsBlending(false);
    }
  };

  // Trigger brief alert notifications
  const triggerToast = (text: string) => {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  // Built-in social hub handlers
  const handleSocialShare = (platform: "whatsapp" | "facebook" | "x") => {
    playInteractionSound();
    if (!finalPlayer) return;

    const nameStr = lang === "ar" ? finalPlayer.nameAr : finalPlayer.nameEn;
    const titleStr = lang === "ar" ? finalPlayer.titleAr : finalPlayer.titleEn;
    const mottoStr = lang === "ar" ? finalPlayer.mottoAr : finalPlayer.mottoEn;

    const shareTitle = lang === "ar"
      ? `⚽ هائل! خضعت لاختبار عمالقة المونديال المتجدد ٢٠٢٦ واكتشفت أنني أشبه الأسطورة: **${nameStr}** (${titleStr})!\n\n🎯 شعاري الكروي المعتمد: "${mottoStr}" \n\n🔥 خض الاختبار أنت أيضاً مجاناً واكتشف شبيهك الكروي من أساطير كأس العالم!`
      : `⚽ Outstanding! I took the 2026 World Cup Player Personality test and matched with the Legend: **${nameStr}** (${titleStr})!\n\n🎯 My Football Motto: "${mottoStr}" \n\n🔥 Take the quiz now for free and discover your legendary football soulmate!`;

    const shareUrl = window.location.href;
    const encodedText = encodeURIComponent(`${shareTitle}\n\n🔗 ${lang === "ar" ? "جرّب الاختبار من هنا:" : "Try the quiz here:"}\n${shareUrl}`);

    let href = "";
    if (platform === "whatsapp") {
      href = `https://api.whatsapp.com/send?text=${encodedText}`;
    } else if (platform === "x") {
      href = `https://twitter.com/intent/tweet?text=${encodedText}`;
    } else if (platform === "facebook") {
      href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }

    try {
      window.open(href, "_blank", "noopener,noreferrer");
    } catch (e) {
      triggerToast(t.toastShareReady);
    }
  };

  const isRtl = lang === "ar";
  const progressPercent = questions.length > 0 ? (currentIndex / 7) * 100 : 0;

  // Build full translations including legal block which is fetched from translations.ts
  const appTranslations = {
    ar: {
      ...uiTranslations.ar,
      legal: translations.ar.legal,
    },
    en: {
      ...uiTranslations.en,
      legal: translations.en.legal,
    }
  };
  const t = appTranslations[lang];

  return (
    <div 
      className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-between font-sans selection:bg-red-600 selection:text-white relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      
      {/* Dynamic Background Stadium Field Lighting with soft Red, White, and Navy glow overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-red-100/40 via-red-50/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-slate-100/55 via-indigo-50/20 to-transparent rounded-full blur-[120px]" />
        
        {/* Pitch grid textures in clean subtle overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* Global Bilingual Header in pristine responsive white banner */}
      <header className="w-full max-w-4xl px-4 py-5 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-200 z-10 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-650 via-red-500 to-white flex items-center justify-center shadow-md shadow-red-500/10 shrink-0">
            <Trophy className="w-5.5 h-5.5 text-white animate-bounce" />
          </div>
          <div className="text-center sm:text-start rtl:sm:text-right ltr:sm:text-left">
            <h1 className="text-sm sm:text-base font-black tracking-tight bg-gradient-to-r from-slate-950 via-red-600 to-slate-950 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Navigation Switchboard & Language toggle */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {activeTab !== "quiz" && (
            <button
              onClick={() => handleTabChange("quiz")}
              className="px-3 py-1.5 rounded-xl text-xs font-black bg-red-650 text-white hover:bg-red-700 transition-all cursor-pointer shadow-sm shadow-red-600/20"
            >
              {lang === "ar" ? "العودة للاختبار" : "Back to Quiz"}
            </button>
          )}

          <button
            id="lang-toggle-btn"
            onClick={() => handleLanguageChange(lang === "ar" ? "en" : "ar")}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-500 hover:bg-slate-100 text-xs text-slate-700 hover:text-slate-950 transition-all font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>{lang === "ar" ? "English 🇬🇧" : "العربية 🇸🇦"}</span>
          </button>
        </div>
      </header>

      {/* Primary Workspace */}
      <main className="w-full max-w-4xl px-4 py-8 flex flex-col justify-center items-center flex-grow z-10">
        
        {/* TAB 1: FOOTBALL PERSONALITY QUIZ FLOW */}
        {activeTab === "quiz" && (
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
            
            {/* SCREEN 1: SPLASH SCREEN (METADATA REVAMPED - NO '40+ QUESTIONS TABS') */}
            {activeScreen === "start" && (
              <div className="w-full text-center space-y-8 animate-fade-in py-4">
                
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-bold shadow-sm">
                    <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                    {t.heroBadge}
                  </div>
                  
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
                    {t.heroHeadline1} <br />
                    <span className="bg-gradient-to-r from-[#03071c] via-red-600 to-red-700 bg-clip-text text-transparent relative drop-shadow-sm">
                      {t.heroHeadline2}
                    </span>
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-semibold">
                    {t.heroDesc}
                  </p>
                </div>

                {/* Info Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-justify">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                    <h4 className="font-extrabold text-red-600 text-xs sm:text-sm">⚡ {t.card1Title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">{t.card1Desc}</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                    <h4 className="font-extrabold text-[#03071c] text-xs sm:text-sm">🛡️ {t.card2Title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-semibold">{t.card2Desc}</p>
                  </div>
                </div>

                {/* Primary Action Trigger */}
                <div className="pt-6">
                  <button
                    id="btn-start-quiz-match"
                    onClick={initializeQuiz}
                    className="group relative px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 outline-none hover:opacity-95 text-white text-base sm:text-lg font-black rounded-2xl shadow-[0_4px_20px_rgba(239,68,68,0.25)] transition-all duration-350 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 mx-auto"
                  >
                    <span>{t.startBtn}</span>
                    <Trophy className="w-5 h-5 text-white transition-transform group-hover:rotate-12" />
                    
                    <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500 to-white opacity-20 blur-sm group-hover:opacity-30 transition-all pointer-events-none" />
                  </button>
                  
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-4 max-w-sm mx-auto leading-relaxed">
                    {t.startNote}
                  </p>
                </div>

              </div>
            )}

            {/* SCREEN 2: ACTIVE TRIVIA/QUIZ EVALUATION */}
            {activeScreen === "quiz" && questions.length > 0 && (
              <div className="w-full space-y-6 animate-fade-in self-center">
                
                {/* Top Stat tracker & dynamic progress slider */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-650">
                    <span>
                      {t.questionLabel} <span className="text-slate-900 font-mono text-base">{currentIndex + 1}</span> {t.ofLabel} <span className="text-slate-800 font-mono">7</span>
                    </span>
                    <span className="px-2.5 py-1 rounded bg-red-50 border border-red-100 text-red-600 font-mono text-xs">
                      {t.progressLabel} {Math.round(((currentIndex + 1) / 7) * 100)}%
                    </span>
                  </div>
                  
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progressPercent || 14}%` }}
                    />
                  </div>
                </div>

                {/* Tactical Question Presentation Panel */}
                <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl min-h-[140px] flex items-center justify-center text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-red-500/10 rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-red-500/10 rounded-bl-3xl" />
                  
                  <h3 className="text-base sm:text-lg font-black text-slate-800 leading-relaxed select-none">
                    {isRtl ? questions[currentIndex].textAr : questions[currentIndex].textEn}
                  </h3>
                </div>

                {/* Render choices mapping list */}
                <div className="space-y-3 pt-1">
                  {questions[currentIndex].options.map((option, idx) => {
                    const optionAlphabet = isRtl ? ["أ", "ب", "ج", "د"] : ["A", "B", "C", "D"];
                    return (
                      <button
                        key={idx}
                        id={`choice-action-${idx}`}
                        onClick={() => handleAnswerClick(option.player)}
                        className="w-full text-start p-4 bg-white border border-slate-200 hover:border-red-500 hover:bg-slate-50 active:bg-slate-100 rounded-2xl cursor-pointer transition-all duration-200 shadow-sm text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-950 flex items-center justify-between group transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-8 h-8 flex-shrink-0 bg-slate-50 border border-slate-200 text-slate-550 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center font-mono transition-colors">
                            {optionAlphabet[idx]}
                          </span>
                          <span className="leading-normal">{isRtl ? option.textAr : option.textEn}</span>
                        </div>
                        
                        <span className="w-2.5 h-2.5 rounded-full border border-slate-350 bg-transparent group-hover:bg-red-500 group-hover:border-red-400 transition-all shrink-0 ml-1" />
                      </button>
                    );
                  })}
                </div>

                {/* Inner back navigation controls */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentIndex === 0}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      currentIndex === 0
                        ? "text-slate-400 border border-slate-100 cursor-not-allowed bg-slate-50/50"
                        : "text-slate-600 border border-slate-200 hover:border-red-500 hover:bg-slate-50 bg-white cursor-pointer"
                    }`}
                  >
                    <span>{t.prevBtn}</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {t.attemptLabel} #{quizAttempts}
                  </span>
                </div>

              </div>
            )}

            {/* SCREEN 3: DYNAMIC ANALYZING SPIN TRANSITION */}
            {activeScreen === "analyzing" && (
              <div className="w-full text-center py-12 space-y-8 animate-fade-in self-center">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-dashed border-red-500 animate-spin" />
                  
                  <div className="absolute w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-lg">
                    <Activity className="w-7 h-7 text-red-500 animate-pulse" />
                  </div>

                  <div className="absolute -inset-4 rounded-full bg-red-500/5 blur-xl animate-ping" />
                </div>

                <div className="space-y-4 max-w-sm mx-auto">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {t.analyzingTitle}
                  </h3>
                  
                  <div className="space-y-2 text-xs text-slate-700 font-medium text-justify">
                    <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                      <span>{t.analyzingLine1}</span>
                      <span className="text-red-500 text-[10px] font-mono font-bold animate-pulse">{t.analyzingStatus1}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                      <span>{t.analyzingLine2}</span>
                      <span className="text-red-500 text-[10px] font-mono font-bold">{t.analyzingStatus2}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                      <span>{t.analyzingLine3}</span>
                      <span className="text-slate-800 text-[10px] font-mono font-bold">{t.analyzingStatus3}</span>
                    </div>
                  </div>

                  <p className="text-xs text-red-500 animate-pulse font-bold pt-2 italic">
                    {t.analyzingQuote}
                  </p>
                </div>
              </div>
            )}

            {/* SCREEN 4: HIGHEST FIDELITY RESULTS SECTION (DARK COLLECTIBLE CARD CONTRAST) */}
            {activeScreen === "result" && finalPlayer && (
              <div className="w-full space-y-8 animate-fade-in self-center">
                
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center justify-center p-2 px-3.5 bg-red-50 border border-red-100 text-red-600 text-xs font-black rounded-full gap-2 font-sans shadow-sm">
                    <Award className="w-3.5 h-3.5 animate-spin text-red-500" />
                    {t.resultBanner}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {t.resultTitle}
                  </h2>
                </div>

                {/* PREMIUM TRADING/COLLECTIBLE ATHLETE CARD (Stays Dark/Golden for perfect download contrast) */}
                <div 
                  ref={resultCardRef}
                  id="card-legend-container"
                  className="w-full overflow-hidden rounded-3xl bg-[#04081a] border border-[#16275c] shadow-2xl relative p-6 sm:p-8 space-y-6 text-white"
                  style={{
                    boxShadow: `0 15px 45px -15px ${finalPlayer.glowColor || "#ef4444"}`,
                  }}
                >
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px]" />
                  
                  <div className="absolute top-5 left-5 opacity-20 pointer-events-none text-right font-mono text-[9px] text-slate-350 tracking-widest hidden sm:block">
                    {t.resultProfileId} #{finalPlayer.id.toUpperCase()}-2026
                  </div>

                  {/* ATHLETE CARD DETAILS */}
                  <div className="relative z-10 space-y-6">
                    
                    {/* Header Information panel */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pb-6 border-b border-slate-800/80 text-center sm:text-start">
                      
                      {/* Glowing Athlete Graphic Avatar Badge with Real Photo */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 overflow-hidden shadow-lg relative flex-shrink-0 border border-slate-700">
                        <img 
                          src={`/${finalPlayer.id}.jpg`} 
                          alt={lang === "ar" ? finalPlayer.nameAr : finalPlayer.nameEn}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute -inset-1 rounded-2xl bg-white opacity-5 animate-pulse pointer-events-none" />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {lang === "ar" ? finalPlayer.nameAr : finalPlayer.nameEn}
                          </h3>
                          {lang === "ar" && (
                            <span className="text-xs font-mono font-bold text-slate-400 hidden sm:inline">
                              ({finalPlayer.nameEn})
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-red-500 bg-red-500/5 px-2.5 py-0.5 rounded border border-red-500/10 inline-block font-sans">
                          {lang === "ar" ? finalPlayer.titleAr : finalPlayer.titleEn}
                        </p>
                      </div>
                    </div>

                    {/* Analytical Evaluation Narrative */}
                    <div className="space-y-2 text-justify">
                      <h4 className="text-xs font-black text-slate-300 tracking-wider flex items-center gap-1.5 uppercase">
                        <User className="w-3.5 h-3.5 text-red-500" />
                        {t.resultAnalysisTitle}
                      </h4>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed bg-[#0b132e]/40 p-4 rounded-2xl border border-[#16275c]/60 font-medium">
                        {lang === "ar" ? finalPlayer.personalityAr : finalPlayer.personalityEn}
                      </p>
                    </div>

                    {/* Athlete Strength Badges List */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-300 tracking-wider flex items-center gap-1.5 uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-red-500" />
                        {t.resultStrengthsTitle}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(lang === "ar" ? finalPlayer.strengthsAr : finalPlayer.strengthsEn).map((str, index) => (
                          <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0b132e] border border-[#16275c] text-xs text-slate-200 text-right rtl:text-right ltr:text-left">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                            <span className="font-semibold leading-snug">{str}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Golden Motto Quote Block */}
                    <div className="p-4 bg-gradient-to-r from-red-950/25 to-[#0b132e]/40 border-l-4 border-red-500 rounded-r-xl space-y-1">
                      <span className="text-[9px] text-red-400 font-extrabold uppercase tracking-wider block">
                        {t.resultMottoTitle}
                      </span>
                      <p className="text-xs sm:text-sm italic font-extrabold text-white">
                        "{lang === "ar" ? finalPlayer.mottoAr : finalPlayer.mottoEn}"
                      </p>
                    </div>

                    {/* Stats Gauges Attributes Section */}
                    <div className="space-y-3 pt-1">
                      <h4 className="text-xs font-black text-slate-300 tracking-wider flex items-center gap-1.5 uppercase">
                        <Target className="w-3.5 h-3.5 text-red-500" />
                        {t.resultStatsTitle}
                      </h4>
                      
                      <div className="space-y-3 bg-[#0b132e]/30 p-4 rounded-2xl border border-[#16275c]">
                        {/* Speed attribute */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-bold">{t.statSpeed}</span>
                            <span className="font-mono font-bold text-red-500 text-sm">{finalPlayer.stats.speed}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#070b1e] rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: `${finalPlayer.stats.speed}%` }} />
                          </div>
                        </div>

                        {/* Dribbling attribute */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-bold">{t.statDribbble}</span>
                            <span className="font-mono font-bold text-white text-sm">{finalPlayer.stats.dribbling}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#070b1e] rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: `${finalPlayer.stats.dribbling}%` }} />
                          </div>
                        </div>

                        {/* Shooting attribute */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-bold">{t.statShooting}</span>
                            <span className="font-mono font-bold text-red-400 text-sm">{finalPlayer.stats.shooting}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#070b1e] rounded-full overflow-hidden">
                            <div className="h-full bg-red-650 rounded-full" style={{ width: `${finalPlayer.stats.shooting}%` }} />
                          </div>
                        </div>

                        {/* Stamina & Teamwork Row */}
                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div>
                            <div className="text-[10px] sm:text-xs text-slate-350 font-black mb-1 block uppercase">{t.statStamina}</div>
                            <div className="flex items-center gap-1.5 text-white font-mono font-black text-xs sm:text-sm">
                              <Activity className="w-3.5 h-3.5 text-red-500" />
                              {finalPlayer.stats.stamina}%
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-xs text-slate-350 font-black mb-1 block uppercase">{t.statTeamwork}</div>
                            <div className="flex items-center gap-1.5 text-white font-mono font-black text-xs sm:text-sm">
                              <Heart className="w-3.5 h-3.5 text-white" />
                              {finalPlayer.stats.teamwork}%
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                {/* ACTION TRIGGERS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Reset Quiz button */}
                  <button
                    onClick={handleResetQuiz}
                    className="px-6 py-4 bg-white border border-slate-200 hover:border-red-500 active:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <RotateCcw className="w-4.5 h-4.5 text-red-500 animate-spin" />
                    <span>{t.retakeBtn}</span>
                  </button>

                  {/* Download image button */}
                  <button
                    onClick={handleDownloadResultImage}
                    className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:opacity-95 text-white text-sm font-black rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
                  >
                    <Download className="w-4.5 h-4.5 text-white" />
                    <span>{t.downloadBtn}</span>
                  </button>

                </div>

                {/* ADVANCED AI PORTRAIT BLEND MODULE */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="space-y-2 border-b border-slate-100 pb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black">
                      <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                      <span>{lang === "ar" ? "ميزة الذكاء الاصطناعي الحصرية ٢٠٢٦" : "Exclusive 2026 AI Feature"}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                      {lang === "ar" ? "توليد صورتك الأسطورية المشتركة" : "Generate Your Legendary AI Portrait"}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed text-start">
                      {lang === "ar" 
                        ? "ارفع صورتك وسيقوم الذكاء الاصطناعي بدمج ملامحك لتظهر في صورة واقعية جنباً إلى جنب مع لاعبك المفضل على أرض الملعب وتحت أضواء الاستاد!"
                        : "Upload your photo, and AI will synthesize your face to appear side-by-side with your matched player under the stadium lights!"
                      }
                    </p>
                  </div>

                  {!userUploadedFile ? (
                    <div className="space-y-4">
                      {/* Drag & Drop Upload field */}
                      <label 
                        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-red-500 bg-slate-50/50 hover:bg-slate-50/80 p-8 rounded-2xl cursor-pointer text-center group transition-all"
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file && file.type.startsWith("image/")) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setUserUploadedFile(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                            playInteractionSound();
                          }
                        }}
                      >
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setUserUploadedFile(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                              playInteractionSound();
                            }
                          }}
                        />
                        <div className="p-4 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-red-500 transition-colors mb-3">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-extrabold text-slate-700 block">
                          {lang === "ar" ? "اضغط هنا لرفع صورتك الشخصية" : "Click here to upload your profile photo"}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          {lang === "ar" ? "أو اسحب وأسقط الصورة هنا مباشرة (JPEG, PNG)" : "or drag and drop your photo here (JPEG, PNG)"}
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        {/* Selected User Photo Preview */}
                        <div className="space-y-2 text-center">
                          <span className="text-xs font-bold text-slate-500 block text-start rtl:text-right">
                            {lang === "ar" ? "صورتك المرفوعة" : "Your Uploaded Photo"}
                          </span>
                          <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center relative">
                            <img 
                              src={userUploadedFile} 
                              alt="Uploaded Preview" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              onClick={() => { setUserUploadedFile(null); setGeneratedCombinedImage(null); playInteractionSound(); }}
                              className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
                              title={lang === "ar" ? "حذف الصورة" : "Remove Photo"}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Player Preview */}
                        <div className="space-y-2 text-center">
                          <span className="text-xs font-bold text-slate-500 block text-start rtl:text-right">
                            {lang === "ar" ? `اللاعب المطابق: ${lang === "ar" ? finalPlayer.nameAr : finalPlayer.nameEn}` : `Matched Legend: ${finalPlayer.nameEn}`}
                          </span>
                          <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                            <img 
                              src={`/${finalPlayer.id}.jpg`} 
                              alt={lang === "ar" ? finalPlayer.nameAr : finalPlayer.nameEn} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              crossOrigin="anonymous"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Blending triggers */}
                      {isBlending ? (
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center space-y-4">
                          <Loader2 className="w-8 h-8 text-red-500 animate-spin mx-auto" />
                          <div className="space-y-1 text-center">
                            <h4 className="text-sm font-black text-slate-800 tracking-tight animate-pulse">
                              {blendStatusText}
                            </h4>
                            <p className="text-[10px] sm:text-xs text-slate-450 italic">
                              {lang === "ar" ? "يقوم الذكاء الاصطناعي بتوليف ودمج الملامح، يرجى الانتظار ثوانٍ..." : "AI is crafting your portrait. Please wait several seconds..."}
                            </p>
                          </div>
                        </div>
                      ) : generatedCombinedImage ? (
                        <div className="space-y-4 text-center">
                          <div className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{lang === "ar" ? "تم التوليد بنجاح!" : "Generated successfully!"}</span>
                          </div>
                          
                          <div id="ai-combined-photo-container" className="max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border border-slate-250 bg-slate-900 shadow-lg">
                            <img 
                              src={generatedCombinedImage} 
                              alt="AI Combined Result" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                            <button
                              onClick={() => {
                                const link = document.createElement("a");
                                link.download = `legendary-ai-${finalPlayer.id}.png`;
                                link.href = generatedCombinedImage;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                triggerToast(lang === "ar" ? "تم تحميل صورتك الأسطورية بنجاح!" : "Legendary photo downloaded successfully!");
                              }}
                              className="px-4 py-3 bg-red-600 text-white rounded-xl text-xs font-black hover:bg-red-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <Download className="w-4 h-4" />
                              <span>{lang === "ar" ? "تحميل الصورة الذكية" : "Download AI Portrait"}</span>
                            </button>

                            <button
                              onClick={() => { setGeneratedCombinedImage(null); setUserUploadedFile(null); playInteractionSound(); }}
                              className="px-4 py-3 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-black hover:bg-slate-200 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <RotateCcw className="w-4 h-4 text-slate-500" />
                              <span>{lang === "ar" ? "توليد صورة أخرى" : "Try Another Photo"}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <button
                            onClick={handleGenerateAIBlend}
                            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-black rounded-2xl transition-all shadow-md active:scale-[0.98] duration-150 cursor-pointer flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-4.5 h-4.5 text-white animate-bounce" />
                            <span>{lang === "ar" ? `دمج صورتي مع الأسطورة ${finalPlayer.nameAr}` : `Merge with Legend ${finalPlayer.nameEn}`}</span>
                          </button>
                          {blendingError && (
                            <p className="text-red-500 text-xs text-center font-bold">{blendingError}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* COMMUNITY SHARE HUB */}
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl text-center space-y-4 shadow-inner">
                  <span className="text-xs font-bold flex items-center justify-center gap-2 text-slate-700">
                    <Share2 className="w-4 h-4 text-red-500" />
                    {t.shareTitle}
                  </span>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => handleSocialShare("whatsapp")}
                      className="px-4 py-2.5 bg-[#25d366]/10 border border-[#25d366]/20 text-[#128c7e] hover:bg-[#25d366]/15 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 shrink-0"
                    >
                      {t.shareWhatsapp}
                    </button>

                    <button
                      onClick={() => handleSocialShare("x")}
                      className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-100 hover:bg-slate-950 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 shrink-0"
                    >
                      {t.shareX}
                    </button>

                    <button
                      onClick={() => handleSocialShare("facebook")}
                      className="px-4 py-2.5 bg-[#1877f2]/10 border border-[#1877f2]/20 text-[#0e5a9c] hover:bg-[#1877f2]/15 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 shrink-0"
                    >
                      {t.shareFacebook}
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 2: ARTICLES BLOG SECTION */}
        {activeTab === "blog" && (
          <div className="w-full animate-fade-in py-2 bg-white">
            <ArticlesPage locale={lang} t={t} />
          </div>
        )}

        {/* TAB 3: VISUAL SITEMAP */}
        {activeTab === "sitemap" && (
          <div className="w-full max-w-3xl space-y-6 animate-fade-in py-4">
            
            <div className="text-center space-y-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-lg shadow-sm">
                <Globe className="w-3.5 h-3.5 animate-pulse text-red-500" />
                <span>{lang === "ar" ? "خريطة الموقع التفاعلية والمؤسسية" : "Interactive & Institutional Sitemap"}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {lang === "ar" ? "خريطة موقع المونديال الشاملة ٢٠٢٦" : "Mondial Comprehensive Sitemap 2026"}
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mx-auto">
                {lang === "ar" 
                  ? "تصفح بنقرة واحدة جميع صفحات، مقالات، وتطبيقات منصة المونديال. مهيأة ومحدثة بالكامل لسرعة الوصول والتوافق مع محركات البحث." 
                  : "Explore with one click all pages, articles, and utilities of the Mondial platform. Fully optimized for instant crawling and SEO speed."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Pages Group */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-650" />
                  {lang === "ar" ? "الصفحات الرئيسية والأدوات" : "Main Core Pages & Tools"}
                </h3>
                
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => { setActiveTab("quiz"); setActiveScreen("start"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center justify-between rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400">01.</span>
                        <span>{lang === "ar" ? "الصفحة الرئيسية (اختبار المونديال)" : "Mondial Personality Quiz (Home)"}</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">dkora.online/</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveTab("blog"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center justify-between rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400">02.</span>
                        <span>{lang === "ar" ? "قسم مقالات السيو وأسرار الويب" : "SEO Articles & Indexation Guides"}</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-850 font-mono font-bold">?view=blog</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveTab("sitemap"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center justify-between rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400">03.</span>
                        <span>{lang === "ar" ? "خريطة الموقع التفاعلية (هذه الصفحة)" : "Interactive Visual Sitemap"}</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-805 font-mono font-bold">?view=sitemap</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal Modals Group */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  {lang === "ar" ? "الصفحات القانونية والسياسات" : "Legal Standards & Policies"}
                </h3>
                
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => { setActiveLegalModal("privacy"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center gap-2 rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="font-mono text-xs text-slate-400">04.</span>
                      <span>{lang === "ar" ? "سياسة الخصوصية وسرية البيانات (AdSense)" : "Privacy Policy & GDPR Compliance"}</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveLegalModal("terms"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center gap-2 rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="font-mono text-xs text-slate-400">05.</span>
                      <span>{lang === "ar" ? "شروط الخدمة واتفاقية بنود الاستخدام" : "Terms of Service Agreement"}</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveLegalModal("about"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center gap-2 rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="font-mono text-xs text-slate-400">06.</span>
                      <span>{lang === "ar" ? "من نحن (هويتنا ورسالة المنصة)" : "About Us & Vision Statement"}</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveLegalModal("contact"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center gap-2 rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="font-mono text-xs text-slate-400">07.</span>
                      <span>{lang === "ar" ? "اتصل بنا وإرسال الاستفسارات" : "Contact Us / Support Inbox"}</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveLegalModal("disclaimer"); playInteractionSound(); }}
                      className="text-slate-700 hover:text-red-500 text-xs sm:text-sm font-bold flex items-center gap-2 rtl:text-right ltr:text-left w-full cursor-pointer hover:translate-x-1 duration-150"
                    >
                      <span className="font-mono text-xs text-slate-400">08.</span>
                      <span>{lang === "ar" ? "إخلاء المسؤولية الفنية واللوجستية" : "Technical Liability Disclaimer"}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sitemap SEO Metadata details */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                📂 {lang === "ar" ? "ملفات الفهرسة المباشرة والبرمجية لعام ٢٠٢٦" : "Official Indexing Files & Robotic XML Maps"}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:border-red-500 transition-colors cursor-pointer"
                >
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="font-bold text-xs text-slate-800 block">sitemap.xml</span>
                    <span className="text-[10px] text-slate-400 block">{lang === "ar" ? "خريطة الموقع الأساسية لمحرك جوجل" : "XML Index Directory for crawl logs"}</span>
                  </div>
                  <span className="text-red-500 text-xs font-bold leading-none shrink-0">🔗 {lang === "ar" ? "فتح الرابط" : "Open URl"}</span>
                </a>

                <a 
                  href="/robots.txt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:border-red-500 transition-colors cursor-pointer"
                >
                  <div className="text-right rtl:text-right ltr:text-left">
                    <span className="font-bold text-xs text-slate-800 block">robots.txt</span>
                    <span className="text-[10px] text-slate-400 block">{lang === "ar" ? "ملف التوجيه وإرشاد عناكب البحث" : "Crawler Directive Guidelines"}</span>
                  </div>
                  <span className="text-red-500 text-xs font-bold leading-none shrink-0">🔗 {lang === "ar" ? "فتح الرابط" : "Open URL"}</span>
                </a>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Styled Notifications Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in w-11/12 max-w-sm">
          <div className="bg-white border border-slate-200 shadow-2xl px-4 py-3 rounded-2xl flex items-center gap-2 text-slate-800 text-xs sm:text-sm text-center justify-center">
            <Sparkles className="w-4 h-4 text-red-550 animate-pulse" />
            <p className="font-bold leading-normal">{toastText}</p>
          </div>
        </div>
      )}

      {/* Styled Footer with Legal and Sitemap navigators */}
      <footer className="w-full max-w-4xl px-4 py-6 border-t border-slate-205 text-center space-y-6 z-10 bg-white/50 backdrop-blur-sm mt-12">
        
        {/* Footnotes links trigger */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-extrabold text-slate-500">
          <button 
            onClick={() => { setActiveLegalModal("privacy"); playInteractionSound(); }}
            className="hover:text-red-500 transition-colors cursor-pointer"
          >
            {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
          </button>
          <span className="text-slate-300 select-none">•</span>
          <button 
            onClick={() => { setActiveLegalModal("terms"); playInteractionSound(); }}
            className="hover:text-red-500 transition-colors cursor-pointer"
          >
            {lang === "ar" ? "شروط الخدمة" : "Terms of Service"}
          </button>
          <span className="text-slate-300 select-none">•</span>
          <button 
            onClick={() => { setActiveLegalModal("about"); playInteractionSound(); }}
            className="hover:text-red-500 transition-colors cursor-pointer"
          >
            {lang === "ar" ? "من نحن" : "About Us"}
          </button>
          <span className="text-slate-300 select-none">•</span>
          <button 
            onClick={() => { setActiveLegalModal("contact"); playInteractionSound(); }}
            className="hover:text-red-500 transition-colors cursor-pointer"
          >
            {lang === "ar" ? "اتصل بنا" : "Contact Us"}
          </button>
          <span className="text-slate-300 select-none">•</span>
          <button 
            onClick={() => { setActiveLegalModal("disclaimer"); playInteractionSound(); }}
            className="hover:text-red-500 transition-colors cursor-pointer"
          >
            {lang === "ar" ? "إخلاء المسؤولية" : "Disclaimer"}
          </button>
          <span className="text-slate-300 select-none">•</span>
          <button 
            onClick={() => { setActiveTab("blog"); playInteractionSound(); }}
            className="hover:text-red-500 transition-colors cursor-pointer text-red-500 animate-pulse font-extrabold"
          >
            {lang === "ar" ? "المقالات" : "Articles"}
          </button>
        </div>

        {/* SEO EXPLANATION PANEL - INJECTED FOR GOOGLE SEARCH INDEXING 2026 */}
        <section className="bg-slate-50 border border-slate-205 p-5 rounded-2xl text-start space-y-3">
          <h4 className="text-xs sm:text-sm font-black text-red-500 uppercase tracking-wider">
            {lang === "ar" ? "حول اختبار شبيهك من لاعبي المونديال المتطور لعام ٢٠٢٦" : "About the Advanced 2026 World Cup Player Match Quiz"}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed text-justify font-sans">
            {lang === "ar" 
              ? "يقوم هذا المحرك المتكامل بتحليل سماتك الفردية ونمط قيادتك وتكتيكك الخاص في كرة القدم لتحديد الأسطورة المونديالية المتطابقة معك تماماً (مثل ميسي، رونالدو، مبابي، هالاند، مودريتش، أو محمد صلاح). بفضل معايير اختبارات الشخصية الرياضية السيكومترية لعام ٢٠٢٦، نقوم بفرز وتحليل البيانات محلياً وبشكل مجاني بالكامل بدون الحاجة لأي اشتراك أو تخزين بيانات خارجية لضمان خصوصيتك الكلية وسرعة استجابة مذهلة."
              : "This specialized engine assesses your personality, tactical sports logic, and on-pitch decision making to locate your precise legendary football matching profile (including Messi, Ronaldo, Mbappe, Haaland, Modric, or Salah). Operating completely client-side in 2026, it ensures absolute privacy with instant, offline evaluation and customizable downloadable cards without storing any personal user parameters."
            }
          </p>
        </section>

        <p className="text-[10px] sm:text-xs text-slate-450 font-semibold font-sans">
          {t.footerRights}
        </p>
        <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase font-extrabold">
          {t.footerMeta}
        </p>
      </footer>

      {/* RENDER DYNAMIC MOUNTABLE LEGAL MODALS (Fully Configured) */}
      <LegalModals 
        isOpen={activeLegalModal} 
        onClose={() => setActiveLegalModal(null)} 
        t={t} 
      />

    </div>
  );
}
