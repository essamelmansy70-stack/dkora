import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
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

const VIRAL_HEADLINES = [
  "المشجع اللي قعد رونالدو دكة في المونديال 🏟️",
  "الوحش اللي حطم صخرة الدفاع وسحب هيبة الخصم ⚔️",
  "صاحب أجمل وأقوى احتفال سيوووو في التاريخ! 🔥",
  "اللي قشر الموزة لميسي في الكامب نو ومشى 🍌⚽",
  "مروض الساحرة المستديرة في حواري المونديال 🌟",
  "المهاجم اللي أرعب حراس كأس العالم بلمسة واحدة! 💀",
  "الكابتن البديل اللي يغير مسار النهائي في الدقيقة 90! ⏱️",
  "جلاد الشباك اللي يسجل بالأذن والكتف وصدره وعينه! 🎯",
  "ممرر الكرات كعب بوجه القدم الخارجي البارع والأنيق 🪄",
  "صاحب أول كوبري مزدوج حطم كاحل أقوى مدافع 🌉",
  "اللي مسح هيبة نجوم الدفاع بمراوغة بلمسة فنية 💨",
  "صانع تيكي تاكا حواري الرياض وجلاد دوري المدارس 🏆",
  "اللي خلى نيمار يسوي إعادة حسابات في طقطقة الكورة 🧠",
  "مزيج من الروح القتالية لراموس وعبقرية ليو ميسي! 🦁",
  "الحارس الطائر اللي يصد ركلات الجزاء بالعين والنية 🧤",
  "صانع الألعاب البارع اللي يعطي أسيست وهو يشرب عصير 🥤",
  "جناح طائر أسرع من سرعة الضوء والصوت على ملعبنا ⚡",
  "جدار برلين البشري اللي يبكي عليه المهاجمين بالملعب 🧱",
  "صخرة الدفاع الصامت اللي يبتسم وهو يسحب الكورة 🗿",
  "اللي يوزع عرضيات بالمليمتر تسبّب صداع لمدرب الخصم 📈",
  "اللي قطع الكورة من ليفاندوفسكي بخيط خياطة وإبرة 🧵",
  "المشجع اللي نزل الملعب وسجل هدف بالخطأ وصنع ريمونتادا 🔄",
  "صاحب التسديدات الصاروخية العابرة للقارات والمدمرة 🚀",
  "مروض الأبطال وصانع الهاتريك الأسرع في دقيقة واحدة! ⏱️",
  "اللي خلى جوارديولا يعتزل التدريب ويسكر الدفاتر 🧠🎮",
  "الكابتن المغناطيسي اللي يسحب الكورة كأنها حديد ومغناطيس 🧲",
  "قاهر حراس المونديال وخبير الإنهاء في تسعينات الزاوية 🥅",
  "المهاجم الهمام اللي يحسب سرعة الجاذبية قبل الارتقاء 🛸",
  "اللي جاب معاه مبخرة للملعب وخرّب تركيز دفاع الخصم 💨🛡️",
  "المشجع اللي جمد ملامح هالاند بمراوغة ونظرة ثقة 😎🔥",
  "صانع النكبات الكروية لمدربي أندية النخبة الأوروبية 💣",
  "المشجع اللي شتت كورة في السماء ونزلت في شباك الخصم! 🌌",
  "صاحب أغلى قدم يسرى تنافس ليو ميسي في العقول 📐",
  "المهاجم الأنيق اللي يحرز هاتريك وهو بيفكر في كبسة الغداء 🍛",
  "المشجع اللي سحب التيشرت من هالاند وما انقطع معاه 🦾",
  "قاهر خطوط الوسط وحامل مفاتيح رتم اللعب الهادئ والقاتل 🗝️",
  "الوحش اللي يراوغ الدفاع من ركنية لركنية بلا تعرق 🏃‍♂️",
  "معلم التيكي تاكا والسامبا البرازيلية الحرة في وسط الملعب 🇧🇷",
  "المشجع اللي صفق للمنافس بالغلط وصنع سلام بالاستاد 🕊️",
  "مروض الكور المستحيلة وصانع الأعاجيب بلمحة عين واحدة ✨",
  "الجناح الطائر اللي يطير بدون طائرة في سماء الملاعب 🪽",
  "المشجع الأكثر حماساً وولاءً وتأثيراً في مدرجاتنا 🗣️📣",
  "مفسر الفكر التكتيكي العالي بلمساته العفوية البسيطة 📖",
  "صاحب اللياقة الحديدية اللي تدور عضلاته كأنه محرك توربيني ⚙️",
  "المشجع الأسطوري اللي هز المدرج بصيحة كروية تهز الجبال 🌋",
  "اللي ركض من المرمى للمرمى عشان ينقذ هجمة مرتدة 🏎️",
  "الأستاذ اللي يدرس المدافعين أصول التمركز بضحكة رايقة 🎓",
  "مروض عمالقة المونديال وصاحب أذكى أسيست مخفي 🃏✨",
  "اللي خلى حارس المونديال يطلب تبديل من شدة الصدمة 🤯🚨",
  "مخرب تكتيك الكاتيناتشو الإيطالي بمراوغة حوارى شعبية 🛡️❌",
  "البطل اللي أنقذ شرف الفريق بإنقاذ كورة من على خط المرمى 🦸‍♂️",
  "الجلاد الرهيب صاحب القدم الفولاذية والضربات الحرة الساحقة ☄️",
  "اللي يراوغ خمسة مدافعين في مساحة علبة كبريت صغيرة 📦✨",
  "المهاجم اللي يستلم الكورة تحت الضغط وكأنه جالس بكافيه ☕🌟",
  "المشجع اللي علم مبابي أصول الجري السريع والتخفي بالبساط 🦊💨",
  "اللي سجل كوبري في كابتن الفريق وخلاه يعتزل دولياً 🪦🚪",
  "القناص اللي يحط الكورة في الثمانية وتمشي بالدوران المطلق 🔄📐",
  "المشجع اللي جاب كاس البطولة من بيتهم عشان يحتفل مع فريقه 🏆🎁",
  "صاحب رمية التماس الطويلة اللي توصل لستاد المدينة المجاورة 🛸",
  "مستكشف الثغرات الدفاعية وحلال العقد الكروية المستحيلة 🕵️‍♂️⚽",
  "المشجع اللي يتوقع التغييرات والتبديلات قبل المدرب بساعة 🔮🏟️"
];

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

  // States for user photo and client-side Soccer Fan Card & Headline Generator
  const [userUploadedFile, setUserUploadedFile] = useState<string | null>(null);
  const [userCroppedImage, setUserCroppedImage] = useState<string | null>(null);
  const [selectedRivalId, setSelectedRivalId] = useState<string>("messi");
  const [viralHeadline, setViralHeadline] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("cyber");
  const [isBlending, setIsBlending] = useState<boolean>(false);
  const [blendStatusText, setBlendStatusText] = useState<string>("");
  const [blendingError, setBlendingError] = useState<string | null>(null);

  const resultCardRef = useRef<HTMLDivElement>(null);
  const fanCardElementRef = useRef<HTMLDivElement>(null);
  const cropperImgRef = useRef<HTMLImageElement | null>(null);
  const cropperInstRef = useRef<Cropper | null>(null);

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
    const articleParam = params.get("article");
    if (viewParam === "blog" || articleParam) {
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

    // Style backups to revert after html2canvas completes
    const backups: any[] = [];

    try {
      resultCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

      // Dynamic style sanitizer to prevent html2canvas oklab/oklch parser crashes in Tailwind v4
      const styleElements = Array.from(document.querySelectorAll("style"));
      for (const styleEl of styleElements) {
        const originalText = styleEl.innerHTML;
        if (originalText.includes("oklch") || originalText.includes("oklab")) {
          const cleaned = originalText
            .replace(/oklch\([^)]+\)/g, "rgb(120, 120, 120)")
            .replace(/oklab\([^)]+\)/g, "rgb(120, 120, 120)");
          styleEl.innerHTML = cleaned;
          backups.push({ type: "style", element: styleEl, content: originalText });
        }
      }

      const linkElements = Array.from(document.querySelectorAll("link[rel='stylesheet']")) as HTMLLinkElement[];
      for (const linkEl of linkElements) {
        try {
          const response = await fetch(linkEl.href);
          if (response.ok) {
            const text = await response.text();
            if (text.includes("oklch") || text.includes("oklab")) {
              const cleanedText = text
                .replace(/oklch\([^)]+\)/g, "rgb(120, 120, 120)")
                .replace(/oklab\([^)]+\)/g, "rgb(120, 120, 120)");
              
              const tempStyle = document.createElement("style");
              tempStyle.setAttribute("data-html2canvas-temp", "true");
              tempStyle.innerHTML = cleanedText;
              document.head.appendChild(tempStyle);

              linkEl.disabled = true;
              backups.push({ type: "link", element: linkEl, tempStyleElement: tempStyle });
            }
          }
        } catch (err) {
          console.warn("Failed to sanitize stylesheet for html2canvas:", linkEl.href, err);
        }
      }

      const options = {
        useCORS: true,
        backgroundColor: "#04081a", // slate dark card backdrop hex code to render download flawlessly
        scale: 2, // crisp scaling
        logging: false,
      };

      await new Promise((resolve) => setTimeout(resolve, 450)); // Ensure style rendering transitions complete
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
    } finally {
      // Revert style changes synchronously to guarantee UI is unaffected
      for (const back of backups) {
        if (back.type === "style") {
          back.element.innerHTML = back.content;
        } else if (back.type === "link") {
          back.element.disabled = false;
          if (back.tempStyleElement && back.tempStyleElement.parentNode) {
            back.tempStyleElement.parentNode.removeChild(back.tempStyleElement);
          }
        }
      }
    }
  };

  // Client-Side Bragging Fan Card & Headline Generator Logic
  const handleRandomizeHeadline = () => {
    playInteractionSound();
    let randomIndex = Math.floor(Math.random() * VIRAL_HEADLINES.length);
    if (VIRAL_HEADLINES[randomIndex] === viralHeadline) {
      randomIndex = (randomIndex + 1) % VIRAL_HEADLINES.length;
    }
    setViralHeadline(VIRAL_HEADLINES[randomIndex]);
    triggerToast(lang === "ar" ? "تم سحب مهارة أسطورية جديدة! 🎲" : "New dynamic player trait drawn! 🎲");
  };

  const startFanCardSimulation = (croppedDataUrl: string) => {
    setUserCroppedImage(croppedDataUrl);
    setIsBlending(true);
    setBlendingError(null);
    
    // Choose initial random title
    const randomIndex = Math.floor(Math.random() * VIRAL_HEADLINES.length);
    setViralHeadline(VIRAL_HEADLINES[randomIndex]);

    const statusesAr = [
      "جاري فحص زاوية نظرتك الأسطورية... 👁️",
      "توليف هيبة المشجع بكسل-بكسل... 🧠",
      "تجهيز كرت التباهي بنمط الذكاء الاصطناعي... 🎨",
      "مطابقة جينات خصمك المونديالي الأسطوري... ⚽",
      "إضفاء الفلاتر النيونية الرياضية... ⚡"
    ];
    const statusesEn = [
      "Assessing legendary visual focus alignment... 👁️",
      "Pixel-synthesizing ultimate backing aura... 🧠",
      "Styling custom championship bragging card... 🎨",
      "Pairing athletic traits with rival icon... ⚽",
      "Injecting high-frequency neon flourishes... ⚡"
    ];

    const statusList = lang === "ar" ? statusesAr : statusesEn;
    let statusIdx = 0;
    setBlendStatusText(statusList[0]);

    const statusInterval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statusList.length;
      setBlendStatusText(statusList[statusIdx]);
    }, 550);

    setTimeout(() => {
      clearInterval(statusInterval);
      setIsBlending(false);
      triggerToast(lang === "ar" ? "تم إنشاء كرت التباهي الخاص بك بنجاح! 🏆" : "Your bragging card successfully printed! 🏆");
    }, 2800);
  };

  const handleGenerateAIBlend = () => {
    if (!cropperInstRef.current) return;
    playInteractionSound();
    
    // Get cropped canvas
    const croppedCanvas = cropperInstRef.current.getCroppedCanvas({
      width: 450,
      height: 450,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high"
    });
    
    if (croppedCanvas) {
      const croppedDataUrl = croppedCanvas.toDataURL("image/png");
      startFanCardSimulation(croppedDataUrl);
    } else {
      triggerToast(lang === "ar" ? "تعذر قص الصورة، حاول مرة أخرى." : "Cropping failed, please try again.");
    }
  };

  const handleDownloadFanCard = async () => {
    playInteractionSound();
    if (!fanCardElementRef.current) return;

    triggerToast(lang === "ar" ? "جاري تجهيز كرت التباهي للتحميل الفوري... 🖼️" : "Preparing high-res bragging card for download... 🖼️");

    const backups: any[] = [];

    try {
      fanCardElementRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

      // Clean oklch / oklab colors for html2canvas to prevent SVG/canvas loading crashes in styling systems
      const styleElements = Array.from(document.querySelectorAll("style"));
      for (const styleEl of styleElements) {
        const originalText = styleEl.innerHTML;
        if (originalText.includes("oklch") || originalText.includes("oklab")) {
          const cleaned = originalText
            .replace(/oklch\([^)]+\)/g, "rgb(120, 120, 120)")
            .replace(/oklab\([^)]+\)/g, "rgb(120, 120, 120)");
          styleEl.innerHTML = cleaned;
          backups.push({ type: "style", element: styleEl, content: originalText });
        }
      }

      const linkElements = Array.from(document.querySelectorAll("link[rel='stylesheet']")) as HTMLLinkElement[];
      for (const linkEl of linkElements) {
        try {
          const response = await fetch(linkEl.href);
          if (response.ok) {
            const text = await response.text();
            if (text.includes("oklch") || text.includes("oklab")) {
              const cleanedText = text
                .replace(/oklch\([^)]+\)/g, "rgb(120, 120, 120)")
                .replace(/oklab\([^)]+\)/g, "rgb(120, 120, 120)");
              
              const tempStyle = document.createElement("style");
              tempStyle.setAttribute("data-html2canvas-temp", "true");
              tempStyle.innerHTML = cleanedText;
              document.head.appendChild(tempStyle);

              linkEl.disabled = true;
              backups.push({ type: "link", element: linkEl, tempStyleElement: tempStyle });
            }
          }
        } catch (err) {
          console.warn("Failed to sanitize stylesheet for html2canvas:", linkEl.href, err);
        }
      }

      const options = {
        useCORS: true,
        backgroundColor: "#020512", // premium absolute dark backdrop
        scale: 2, // crisp high density
        logging: false,
      };

      await new Promise((resolve) => setTimeout(resolve, 450));
      const canvas = await html2canvas(fanCardElementRef.current, options);
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = `soccer-fan-card-${selectedRivalId}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      triggerToast(lang === "ar" ? "تم تحميل كرت التباهي بنجاح! 🥳 شاركه مع أصدقائك!" : "Bragging card downloaded successfully! 🥳 Go share!");
    } catch (err: any) {
      console.error("html2canvas print failure: ", err);
      triggerToast(lang === "ar" ? "عذراً! فشل التحميل التلقائي، التقط لقطة شاشة وشارك كرت التباهي!" : "Automatic download failed on this device, snap a screenshot to share!");
    } finally {
      // Revert style changes to ensure standard UI is unaltered
      for (const back of backups) {
        if (back.type === "style") {
          back.element.innerHTML = back.content;
        } else if (back.type === "link") {
          back.element.disabled = false;
          if (back.tempStyleElement && back.tempStyleElement.parentNode) {
            back.tempStyleElement.parentNode.removeChild(back.tempStyleElement);
          }
        }
      }
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
      <header 
        onClick={() => { handleTabChange("quiz"); playInteractionSound(); }}
        className="w-full max-w-4xl px-4 py-5 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-slate-200 z-10 bg-white/80 backdrop-blur-md cursor-pointer hover:bg-slate-50/50 transition-colors duration-200 group/header"
        title={lang === "ar" ? "اضغط للذهاب لالصفحة الرئيسية" : "Click to go to Home Page"}
      >
        <div 
          className="flex items-center gap-3 select-none group transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-650 via-red-500 to-white flex items-center justify-center shadow-md shadow-red-500/10 shrink-0 transition-transform group-hover:scale-105 group-hover/header:scale-105">
            <Trophy className="w-5.5 h-5.5 text-white animate-bounce" />
          </div>
          <div className="text-center sm:text-start rtl:sm:text-right ltr:sm:text-left">
            <h1 className="text-sm sm:text-base font-black tracking-tight bg-gradient-to-r from-slate-950 via-red-600 to-slate-950 bg-clip-text text-transparent group-hover:text-red-650 transition-colors">
              {t.title}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Navigation Switchboard & Language toggle */}
        <div className="flex flex-wrap items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
          {activeTab !== "quiz" && (
            <button
              onClick={() => { handleTabChange("quiz"); playInteractionSound(); }}
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
                <div className="flex justify-center w-full">
                  
                  {/* Reset Quiz button */}
                  <button
                    onClick={handleResetQuiz}
                    className="w-full max-w-md px-6 py-4 bg-white border border-slate-200 hover:border-red-500 active:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <RotateCcw className="w-4.5 h-4.5 text-red-500 animate-spin" />
                    <span>{t.retakeBtn}</span>
                  </button>

                </div>

                {/* SOCCER FAN CARD & HEADLINE GENERATOR (Fully Client-Side & Interactive) */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="space-y-2 border-b border-slate-100 pb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] sm:text-xs font-black shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span>{lang === "ar" ? "مولد كروت التباهي والألقاب الساخرة" : "Viral Fan Card & Headline Generator"}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                      {lang === "ar" ? "اصنع كرت التباهي الخاص بك مجاناً" : "Create Your Bragging Fan Card Free"}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed text-start">
                      {lang === "ar" 
                        ? "ارفع صورتك لمطابقتها وقصها بدقة واقصص وجهك، ثم اختر لاعبك المنافس المفضل لتوليد لقب رياضي ساخر ومشاركة الكرت بجودة فائقة لقصص إنستغرام وفيسبوك!"
                        : "Upload your photo, crop and align your face, select your rival icon, and generate a viral Arabic headline to download as a story-ready image!"
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
                              setUserCroppedImage(null);
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
                                setUserCroppedImage(null);
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
                  ) : !userCroppedImage ? (
                    /* STEP 2: Cropper layout with Cropper.js controls */
                    <div className="space-y-4">
                      <span className="text-xs font-black text-slate-600 block text-start">
                        {lang === "ar" ? "✂️ اضبط إطار وجهك بشكل صحيح ليتطابق مع الكرت:" : "✂️ Crop and align your face correctly:"}
                      </span>
                      
                      <div className="max-h-[380px] overflow-hidden rounded-2xl bg-slate-950 border border-slate-200 flex items-center justify-center p-2">
                        <img
                          ref={cropperImgRef}
                          src={userUploadedFile}
                          alt="Cropping region"
                          className="max-w-full block"
                          onLoad={() => {
                            if (cropperImgRef.current) {
                              if (cropperInstRef.current) {
                                cropperInstRef.current.destroy();
                              }
                              cropperInstRef.current = new Cropper(cropperImgRef.current, {
                                aspectRatio: 1, // perfect square for athlete profile frames
                                viewMode: 1,
                                dragMode: 'move',
                                autoCropArea: 0.85,
                                background: false,
                                responsive: true,
                                checkOrientation: false,
                              });
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => { cropperInstRef.current?.rotate(-90); playInteractionSound(); }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                          {lang === "ar" ? "↩️ تدوير لليسار" : "↩️ Rotate Left"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { cropperInstRef.current?.rotate(90); playInteractionSound(); }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                          {lang === "ar" ? "↪️ تدوير لليمين" : "↪️ Rotate Right"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { cropperInstRef.current?.zoom(0.15); playInteractionSound(); }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                          {lang === "ar" ? "➕ تقريب" : "➕ Zoom In"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { cropperInstRef.current?.zoom(-0.15); playInteractionSound(); }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                        >
                          {lang === "ar" ? "➖ إبعاد" : "➖ Zoom Out"}
                        </button>
                        <button
                          type="button"
                          onClick={() => { cropperInstRef.current?.reset(); playInteractionSound(); }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-xl text-xs font-bold transition-colors"
                        >
                          {lang === "ar" ? "إعادة ضبط" : "Reset"}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => { setUserUploadedFile(null); setUserCroppedImage(null); playInteractionSound(); }}
                          className="py-3 px-4 bg-slate-105 hover:bg-slate-150 text-slate-600 rounded-xl text-xs font-bold transition-all text-center"
                        >
                          {lang === "ar" ? "إلغاء ورفع صورة أخرى" : "Cancel & upload another"}
                        </button>

                        <button
                          type="button"
                          onClick={handleGenerateAIBlend}
                          className="py-3 px-4 bg-red-600 hover:bg-red-750 text-white rounded-xl text-xs font-black transition-all text-center shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>{lang === "ar" ? "قص الصورة وحفظ" : "Crop & Save Image"}</span>
                        </button>
                      </div>
                    </div>
                  ) : isBlending ? (
                    /* STEP 3: Elegant Processing Tension State */
                    <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl text-center space-y-4">
                      <div className="relative inline-flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                        <span className="absolute text-[10px] font-black text-red-600 animate-pulse">2026</span>
                      </div>
                      
                      <div className="space-y-1 text-center">
                        <h4 className="text-sm font-black text-slate-800 tracking-tight transition-all duration-300">
                          {blendStatusText}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-slate-400 italic">
                          {lang === "ar" ? "نقوم بمطابقة أبعاد وجهك وتوليف اللقب الساخر المناسب..." : "Customizing layout and randomizing viral Arabic monikers..."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* STEP 4: Golden/Dark Bragging Fan Card Interactive Showcase */
                    <div className="space-y-6">
                      
                      {/* Rival Legend Switcher Toolbar */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 block text-start rtl:text-right">
                          {lang === "ar" ? "🏆 اختر لاعبك المنافس لكرت التباهي:" : "🏆 Select Rival Legend for Fan Card:"}
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {PLAYER_PROFILES.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => { setSelectedRivalId(p.id); playInteractionSound(); }}
                              className={`p-2 rounded-xl border transition-all flex flex-col items-center text-center text-xs font-black relative overflow-hidden cursor-pointer ${
                                selectedRivalId === p.id
                                  ? "border-red-500 bg-red-50 text-slate-900 shadow-sm"
                                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-350 hover:bg-slate-100"
                              }`}
                            >
                              <img src={`/${p.id}.jpg`} alt={p.nameEn} className="w-8 h-8 rounded-full object-cover mb-1 shrink-0" referrerPolicy="no-referrer" crossOrigin="anonymous"/>
                              <span className="text-[10px] leading-tight block truncate w-full">{lang === "ar" ? p.nameAr : p.nameEn}</span>
                              {selectedRivalId === p.id && <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-600" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filter Selections */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 block text-start rtl:text-right">
                          {lang === "ar" ? "🎨 اختر التأثير الرياضي المونديالي لصورتك:" : "🎨 Select Custom Color Filter for Your Image:"}
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: "normal", ar: "الأصلي", en: "Original" },
                            { id: "grayscale", ar: "فولاذ مونو", en: "Steel Mono" },
                            { id: "sepia", ar: "ريترو دافئ", en: "Sepia Warm" },
                            { id: "cyber", ar: "نيون سايبر", en: "Cyber Neon" },
                          ].map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => { setActiveFilter(f.id); playInteractionSound(); }}
                              className={`p-2 rounded-xl border text-[10px] sm:text-xs font-extrabold transition-all text-center cursor-pointer ${
                                activeFilter === f.id
                                  ? "border-red-500 bg-red-650 text-white"
                                  : "border-slate-205 bg-slate-50 text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              {lang === "ar" ? f.ar : f.en}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* THE PREMIUM BRAGGING CARD FOR SOCIAL MEDIA DOWNLOAD */}
                      <div className="p-1 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500 via-red-500 to-amber-500 shadow-2xl">
                        <div 
                          ref={fanCardElementRef}
                          id="fan-card-printable"
                          className="w-full bg-[#020512] text-white p-6 sm:p-8 rounded-[2.4rem] relative overflow-hidden flex flex-col justify-between space-y-6 aspect-[4/5] min-h-[460px]"
                        >
                          {/* Tech background elements */}
                          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px]" />
                          <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

                          {/* Card Badge Header */}
                          <div className="text-center z-10">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/70 via-slate-900/40 to-red-950/70 border border-red-500/30 text-red-500 text-[10px] sm:text-xs font-black tracking-widest uppercase">
                              🏆 {lang === "ar" ? "كرت التباهي للمشجعين • ٢٠٢٦" : "FIFA FAN BRAGGING CARD • 2026"} 🏆
                            </span>
                          </div>

                          {/* Side-by-Side Comparison Area */}
                          <div className="flex items-center justify-around z-10 w-full py-2">
                            
                            {/* User Side */}
                            <div className="flex flex-col items-center space-y-2">
                              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.30)] bg-slate-900">
                                <img
                                  src={userCroppedImage}
                                  alt="User Cropped"
                                  className={`w-full h-full object-cover transition-all ${
                                    activeFilter === "grayscale"
                                      ? "grayscale contrast-125 brightness-95"
                                      : activeFilter === "sepia"
                                      ? "sepia contrast-110 saturate-125"
                                      : activeFilter === "cyber"
                                      ? "contrast-150 saturate-[180%] brightness-90 [filter:hue-rotate(200deg)_saturate(250%)]"
                                      : "filter-none"
                                  }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                              </div>
                              <span className="px-2.5 py-1 bg-cyan-950/70 border border-cyan-800/40 text-cyan-400 text-[9px] sm:text-[10px] font-black rounded-lg uppercase">
                                {lang === "ar" ? "المشجع الأسطوري" : "Legendary Fan"}
                              </span>
                            </div>

                            {/* Middle VS Graphic Badge */}
                            <div className="flex flex-col items-center justify-center shrink-0">
                              <span className="w-8 h-8 rounded-full bg-red-600 border border-red-400 flex items-center justify-center font-black text-xs text-white shadow-lg animate-pulse">
                                VS
                              </span>
                            </div>

                            {/* Rival Legend Side */}
                            <div className="flex flex-col items-center space-y-2">
                              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.30)] bg-slate-900">
                                <img
                                  src={`/${selectedRivalId}.jpg`}
                                  alt={PLAYER_PROFILES.find(p => p.id === selectedRivalId)?.nameEn || "Rival"}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                  crossOrigin="anonymous"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                              </div>
                              <span className="px-2.5 py-1 bg-red-950/70 border border-red-800/40 text-red-400 text-[9px] sm:text-[10px] font-black rounded-lg uppercase">
                                {lang === "ar" ? "الأسطورة المنافس" : "Rival Legend"}
                              </span>
                            </div>

                          </div>

                          {/* Massive Viral Center Headline */}
                          <div className="bg-gradient-to-r from-red-950/40 via-slate-900/60 to-red-950/40 p-4 rounded-2xl border border-red-500/20 text-center relative overflow-hidden z-10">
                            <div className="absolute -left-10 top-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
                            <div className="absolute -right-10 top-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                            
                            <span className="text-[10px] text-yellow-450 font-black block tracking-widest mb-1 shadow-sm uppercase">
                              ⚽ {lang === "ar" ? "اللقب الكروي الأسطوري" : "LEGENDARY SOCCER MONIKER"} ⚽
                            </span>
                            <h3 className="text-sm sm:text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-105 leading-relaxed text-center px-1">
                              {viralHeadline}
                            </h3>
                          </div>

                          {/* Card Footer Credentials */}
                          <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-slate-500/60 border-t border-slate-900/60 pt-4 z-10 font-bold">
                            <span>{lang === "ar" ? "معتمد • لجنة مشجعي كرة القدم العالمية" : "VERIFIED • WORLD FOOTBALL FAN UNION"}</span>
                            <span className="font-mono tracking-wider">DKORA.ONLINE</span>
                          </div>

                        </div>
                      </div>

                      {/* Interactive Actions Toolset */}
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={handleRandomizeHeadline}
                            className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer shadow-sm"
                          >
                            <span>🎲 {lang === "ar" ? "تبديل اللقب لتوليد عنوان جديد" : "Draft another dynamic moniker"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => { setUserUploadedFile(null); setUserCroppedImage(null); playInteractionSound(); }}
                            className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 border border-slate-205 cursor-pointer shadow-sm"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{lang === "ar" ? "تغيير صورتك ورفع أخرى" : "Upload another picture"}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleDownloadFanCard}
                          className="w-full py-4 bg-gradient-to-r from-red-650 to-red-500 hover:opacity-95 text-white font-black text-sm rounded-2xl shadow-lg cursor-pointer transform active:scale-[0.99] duration-150 flex items-center justify-center gap-2"
                        >
                          <Download className="w-5 h-5 text-white animate-bounce" />
                          <span>{lang === "ar" ? "تحميل كرت التباهي ومشاركة النتيجة" : "Download Bragging Card & Share"}</span>
                        </button>
                      </div>

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

        <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase font-extrabold pb-2">
          {t.footerMeta}
        </p>

        {/* Footnotes links trigger at the absolute bottom */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-black text-slate-500 border-t border-slate-100 pt-4">
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
          <span className="text-slate-305 select-none">•</span>
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
            className="hover:text-red-550 transition-colors cursor-pointer text-red-600 animate-pulse font-extrabold"
          >
            {lang === "ar" ? "المقالات" : "Articles"}
          </button>
          <span className="text-slate-300 select-none">•</span>
          <button 
            onClick={() => { setActiveTab("sitemap"); playInteractionSound(); }}
            className="hover:text-amber-500 transition-colors cursor-pointer text-amber-600 font-extrabold"
          >
            {lang === "ar" ? "خريطة الموقع" : "Sitemap"}
          </button>
        </div>
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
