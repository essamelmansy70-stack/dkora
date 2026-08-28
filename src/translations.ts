export interface TranslationType {
  meta: {
    title: string;
    brandName: string;
    subtitle: string;
  };
  nav: {
    home: string;
    news: string;
    school: string;
    sitemap: string;
    addSignal: string;
    lightMode: string;
    darkMode: string;
    language: string;
  };
  signals: {
    title: string;
    subtitle: string;
    active: string;
    entry: string;
    stopLoss: string;
    takeProfit1: string;
    takeProfit2: string;
    takeProfit3: string;
    views: string;
    date: string;
    noSignals: string;
    searchPlaceholder: string;
    directionBuy: string;
    directionSell: string;
    directionInfo: string;
    statusActive: string;
    statusTp1: string;
    statusTp2: string;
    statusTp3: string;
    statusSl: string;
    statusClosed: string;
    explanation: string;
    chartTitle: string;
    copyLink: string;
    linkCopied: string;
    backToHome: string;
  };
  form: {
    addNew: string;
    edit: string;
    pairLabel: string;
    pairPlaceholder: string;
    entryLabel: string;
    entryPlaceholder: string;
    typeLabel: string;
    tp1Label: string;
    tp1Placeholder: string;
    tp2Label: string;
    tp2Placeholder: string;
    tp3Label: string;
    tp3Placeholder: string;
    slLabel: string;
    slPlaceholder: string;
    chartUrlLabel: string;
    chartUrlPlaceholder: string;
    statusLabel: string;
    explanationLabel: string;
    explanationPlaceholder: string;
    cancel: string;
    save: string;
    publish: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    balance: string;
    risk: string;
    pips: string;
    result: string;
    calculate: string;
  };
  news: {
    title: string;
    subtitle: string;
    readMore: string;
    backToNews: string;
    author: string;
  };
  calendar: {
    title: string;
    subtitle: string;
    impactHigh: string;
    impactMedium: string;
    impactLow: string;
    actual: string;
    forecast: string;
    previous: string;
    time: string;
    currency: string;
    event: string;
    impact: string;
  };
  sitemap: {
    title: string;
    subtitle: string;
    staticPages: string;
    dynamicSignals: string;
    allRights: string;
  };
  footer: {
    about: string;
    aboutText: string;
    links: string;
    privacy: string;
    terms: string;
    disclaimer: string;
    copyright: string;
  };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    disclaimerTitle: string;
    privacyContent: string[];
    termsContent: string[];
    disclaimerContent: string[];
  };
}

export const translations: Record<'ar' | 'en', TranslationType> = {
  ar: {
    meta: {
      title: "توصيات فوركس مجانية دقيقة | اربح مع خبراء سوق العملات",
      brandName: "ديكوراFX",
      subtitle: "المنصة الأكثر دقة وموثوقية لتداول العملات والذهب بوعي واحترافية"
    },
    nav: {
      home: "التوصيات الحية",
      news: "تحليلات وأخبار",
      school: "مدرسة التداول",
      sitemap: "خريطة الموقع",
      addSignal: "إضافة توصية",
      lightMode: "الوضع النهارى",
      darkMode: "الوضع الليلى",
      language: "English"
    },
    signals: {
      title: "التوصيات الفنية النشطة والسابقة",
      subtitle: "متابعة لحظية وتحديثات مستمرة لفرص السوق بتحديث فوري وتنبيهات صوتية مدمجة",
      active: "توصية نشطة",
      entry: "سعر الدخول",
      stopLoss: "إيقاف الخسارة",
      takeProfit1: "الهدف الأول",
      takeProfit2: "الهدف الثاني",
      takeProfit3: "الهدف الثالث",
      views: "مشاهدة",
      date: "تاريخ النشر",
      noSignals: "لا توجد توصيات مطابقة للبحث حالياً.",
      searchPlaceholder: "ابحث عن زوج العملات (مثال: USDJPY)...",
      directionBuy: "شراء مباشر (BUY)",
      directionSell: "بيع مباشر (SELL)",
      directionInfo: "تحديث السوق (INFO)",
      statusActive: "نشطة ومباشرة",
      statusTp1: "ضرب الهدف الأول",
      statusTp2: "ضرب الهدف الثاني",
      statusTp3: "ضرب الهدف الأقصى",
      statusSl: "ضرب وقف الخسارة",
      statusClosed: "مغلقة يدوياً",
      explanation: "الرؤية والتحليل الفني",
      chartTitle: "الشارت الفني والتوضيحي للفرصة",
      copyLink: "نسخ رابط التوصية",
      linkCopied: "تم نسخ الرابط المباشر للتوصية بنجاح! 📋",
      backToHome: "العودة للتوصيات الرئيسية"
    },
    form: {
      addNew: "إنشاء توصية تداول جديدة",
      edit: "تعديل التوصية الفنية",
      pairLabel: "اسم الأداة الماليّة (الزوج/السلعة) *",
      pairPlaceholder: "مثال: USDJPY أو XAUUSD",
      entryLabel: "سعر الدخول (Entry Price) *",
      entryPlaceholder: "مثال: 157.750",
      typeLabel: "نوع وتوجّه الصفقة *",
      tp1Label: "الهدف الأول (TP1) *",
      tp1Placeholder: "مثال: 161.000",
      tp2Label: "الهدف الثاني (TP2 - اختياري)",
      tp2Placeholder: "مثال: 162.500",
      tp3Label: "الهدف الثالث (TP3 - اختياري)",
      tp3Placeholder: "مثال: 164.000",
      slLabel: "وقف الخسارة (Stop Loss) *",
      slPlaceholder: "مثال: 156.400",
      chartUrlLabel: "رابط شارت التحليل (مثال: /1787237745892.png أو رابط خارجي)",
      chartUrlPlaceholder: "اتركها فارغة لإخفاء صورة الشارت",
      statusLabel: "حالة التوصية الحالية",
      explanationLabel: "الشرح والرؤية الفنية والتحليلية",
      explanationPlaceholder: "اكتب هنا تفاصيل التحليل الفني والفرص المتوقعة لهذا الزوج...",
      cancel: "إلغاء",
      save: "حفظ التعديلات",
      publish: "نشر التوصية فوراً 🚀"
    },
    calculator: {
      title: "حاسبة إدارة المخاطر الآمنة",
      subtitle: "احسب حجم اللوت (Lot Size) المناسب لحجم حسابك ومقدار الستوب لوز لحماية رأس مالك",
      balance: "رأس مال الحساب ($)",
      risk: "نسبة المخاطرة للمحاولة (%)",
      pips: "عدد نقاط الستوب لوز (Pips)",
      result: "حجم اللوت المقترح الآمن:",
      calculate: "احسب اللوت"
    },
    news: {
      title: "غرفة التحليلات وأخبار الأسواق",
      subtitle: "تقارير تقنية يومية، تحليلات فنية مخصصة، ومتابعة فورية للاتجاهات السائدة لأقوى أزواج العملات والذهب",
      readMore: "اقرأ التحليل الكامل",
      backToNews: "العودة لغرفة التحليلات",
      author: "بواسطة خبير تداول"
    },
    calendar: {
      title: "الأجندة الاقتصادية العالمية اليومية",
      subtitle: "متابعة لحظية ومباشرة لأهم الأخبار الاقتصادية والمؤشرات الكلية المؤثرة في حركة سوق العملات الأجنبية",
      impactHigh: "مرتفع جداً 🔥",
      impactMedium: "متوسط ⚡",
      impactLow: "منخفض ❄️",
      actual: "الحالي",
      forecast: "المتوقع",
      previous: "السابق",
      time: "الوقت",
      currency: "العملة",
      event: "الحدث الاقتصادي",
      impact: "التأثير"
    },
    sitemap: {
      title: "خريطة الموقع (Sitemap) - العاب اونلاين فري",
      subtitle: "دليل متكامل للوصول الفوري والفهرسة السريعة لجميع ألعاب بوكي بوكس والمحتوى القانوني",
      staticPages: "الأقسام الرئيسية والصفحات الثابتة",
      dynamicSignals: "مستودع الألعاب المجانية المباشرة",
      allRights: "كافة الحقوق محفوظة لمنصة بوكي بوكس © 2026."
    },
    footer: {
      about: "عن بوكي بوكس",
      aboutText: "منصة الألعاب الأبرز لتقديم العاب اونلاين فري بدون تحميل وألعاب المتصفح بجودة نيون فائقة وتطوير مستمر لمتعة آمنة ومجانية بالكامل لجميع الأعمار.",
      links: "الروابط القانونية",
      privacy: "سياسة الخصوصية والأمان",
      terms: "اتفاقية الاستخدام واللعب الآمن",
      disclaimer: "إخلاء المسؤولية وحقوق الملكية",
      copyright: "بوكي بوكس © 2026. العاب اونلاين فري وألعاب متصفح ممتعة."
    },
    legal: {
      privacyTitle: "سياسة الخصوصية وسرية البيانات والألعاب الآمنة",
      termsTitle: "اتفاقية وشروط الاستخدام واللعب النظيف",
      disclaimerTitle: "إخلاء المسؤولية وحماية حقوق الملكية الفكرية",
      privacyContent: [
        "نحن في بوكي بوكس (PokiBox) نلتزم بخصوصية تامة لزوارنا الكرام وخاصة فئات صغار السن والعائلات، ونتبع سياسات تضمن سلامة تصفحكم للألعاب.",
        "المنصة تعمل بالكامل بدون تجميع بيانات حساسة، ويتم تخزين تفضيلات الألعاب والأرقام القياسية والمفضلات محلياً 100% داخل ذاكرة المتصفح.",
        "نحن نستخدم ملفات تعريف الارتباط الأساسية فقط للاحتفاظ بلغتكم المفضلة ومستوى الصوت ونمط التصميم الداكن أو الفاتح.",
        "بوكي بوكس لا يحتوي على إعلانات منبثقة أو خبيثة، ونضمن بيئة نظيفة وآمنة بالكامل للعب العاب اونلاين فري."
      ],
      termsContent: [
        "باستخدامك لمنصة بوكي بوكس ولعب العاب اونلاين فري المتاحة، فإنك توافق توافقاً تاماً على شروط الاستخدام الموضحة في هذه الصفحة.",
        "جميع الألعاب المقدمة هنا مخصصة للمتعة الشخصية والترفيه البريء، وتعمل مباشرة من المتصفح دون الحاجة لتنزيل أي برمجيات خارجية.",
        "يُحظر تماماً محاولة تخريب أو اختراق أكواد الألعاب الحصرية، أو إعادة نشر ألعابنا على نطاق تجاري دون إذن خطي مسبق.",
        "نحن نبذل قصارى جهدنا لضمان استمرارية تشغيل الألعاب بكفاءة فائقة وسرعة تامة على كافة متصفحات الموبايل والكمبيوتر."
      ],
      disclaimerContent: [
        "جميع الألعاب المعروضة على بوكي بوكس هي إما ألعاب حصرية مدمجة، أو مرخصة ومفتوحة المصدر ومتاحة للمشاركة العامة قانونياً.",
        "إذا كنت تمتلك حقوق ملكية فكرية لأي لعبة معروضة وتعتقد أنها نُشرت دون إذنك، يرجى التواصل معنا فوراً لإزالتها وتصحيح الموقف.",
        "نحن نخلي مسؤوليتنا التامة عن أي أضرار ناتجة عن انقطاع الإنترنت أو مشاكل تقنية خارجة عن إرادتنا أثناء تشغيل الألعاب.",
        "تمتع بتجربة لعب ممتعة وخذ فترات راحة منتظمة أثناء اللعب للحفاظ على سلامة وصحة عينيك وجسدك."
      ]
    }
  },
  en: {
    meta: {
      title: "Free Accurate Forex Signals | Profit with Currency Market Experts",
      brandName: "DkoraFX",
      subtitle: "The most precise and trusted platform for trading currencies and gold with wisdom and professionalism"
    },
    nav: {
      home: "Live Signals",
      news: "News & Analysis",
      school: "Trading School",
      sitemap: "Sitemap",
      addSignal: "Add Signal",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      language: "العربية"
    },
    signals: {
      title: "Live and Historic Technical Signals",
      subtitle: "Instant tracking and constant updates of market opportunities with real-time audio notifications",
      active: "Active Signal",
      entry: "Entry Price",
      stopLoss: "Stop Loss (SL)",
      takeProfit1: "Target 1 (TP1)",
      takeProfit2: "Target 2 (TP2)",
      takeProfit3: "Target 3 (TP3)",
      views: "Views",
      date: "Published Date",
      noSignals: "No signals found matching your search query.",
      searchPlaceholder: "Search pair name (e.g. USDJPY)...",
      directionBuy: "BUY Direct",
      directionSell: "SELL Direct",
      directionInfo: "Market Update (INFO)",
      statusActive: "Active & Live",
      statusTp1: "TP1 Hit 🎯",
      statusTp2: "TP2 Hit 🎯",
      statusTp3: "Max Target Hit 🏆",
      statusSl: "Stop Loss Hit 🛑",
      statusClosed: "Closed Manually",
      explanation: "Technical Vision & Analysis",
      chartTitle: "Technical Chart Visual",
      copyLink: "Copy Signal Link",
      linkCopied: "Signal share link copied to clipboard successfully! 📋",
      backToHome: "Back to Home Signals"
    },
    form: {
      addNew: "Create New Trading Signal",
      edit: "Edit Technical Signal",
      pairLabel: "Financial Instrument (Pair/Commodity) *",
      pairPlaceholder: "e.g., USDJPY or XAUUSD",
      entryLabel: "Entry Price *",
      entryPlaceholder: "e.g., 157.750",
      typeLabel: "Trade Type / Direction *",
      tp1Label: "Take Profit 1 (TP1) *",
      tp1Placeholder: "e.g., 161.000",
      tp2Label: "Take Profit 2 (TP2 - Optional)",
      tp2Placeholder: "e.g., 162.500",
      tp3Label: "Take Profit 3 (TP3 - Optional)",
      tp3Placeholder: "e.g., 164.000",
      slLabel: "Stop Loss (SL) *",
      slPlaceholder: "e.g., 156.400",
      chartUrlLabel: "Chart Image Link (e.g., /1787237745892.png or external link)",
      chartUrlPlaceholder: "Leave blank to hide the chart visual",
      statusLabel: "Current Signal Status",
      explanationLabel: "Technical Vision & Details",
      explanationPlaceholder: "Describe technical reasons and targets for this trade opportunity...",
      cancel: "Cancel",
      save: "Save Changes",
      publish: "Publish Signal Now 🚀"
    },
    calculator: {
      title: "Risk Management Calculator",
      subtitle: "Calculate proper lot sizing depending on your account capital and stop loss size to protect your assets",
      balance: "Account Balance ($)",
      risk: "Risk Percentage per Trade (%)",
      pips: "Stop Loss Distance (Pips)",
      result: "Suggested Safe Lot Size:",
      calculate: "Calculate"
    },
    news: {
      title: "Market Analysis & Financial News Room",
      subtitle: "Daily technical reviews, market breakdowns, and major trends of leading currency pairs and commodities",
      readMore: "Read Full Report",
      backToNews: "Back to News Room",
      author: "By Senior Market Analyst"
    },
    calendar: {
      title: "Daily Global Economic Calendar",
      subtitle: "Live monitoring of primary economic releases, statistics, and macroeconomic indicators driving fx volatility",
      impactHigh: "High Impact 🔥",
      impactMedium: "Medium Impact ⚡",
      impactLow: "Low Impact ❄️",
      actual: "Actual",
      forecast: "Forecast",
      previous: "Previous",
      time: "Time",
      currency: "Currency",
      event: "Economic Release",
      impact: "Impact"
    },
    sitemap: {
      title: "Sitemap Directory - Free Online Games",
      subtitle: "Immediate index access to all PokiBox web games, native overlays, categories, and legal pages for search bot indexing",
      staticPages: "Core Pages & Navigation Sections",
      dynamicSignals: "Free Browser Games Directory",
      allRights: "All Rights Reserved for PokiBox Games © 2026."
    },
    footer: {
      about: "About PokiBox",
      aboutText: "The premier web platform providing free online games with zero downloads or popups. Enjoy optimized responsive arcade and puzzle games in a high fidelity environment.",
      links: "Legal Links",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      disclaimer: "Disclaimer & Copyright",
      copyright: "PokiBox © 2026. High fidelity free browser arcade playgrounds."
    },
    legal: {
      privacyTitle: "Privacy & Safe Gameplay Policy",
      termsTitle: "Terms of Use & Fair Play Agreement",
      disclaimerTitle: "Copyright Disclaimer & Risk Free Play",
      privacyContent: [
        "We at PokiBox respect your absolute privacy and guarantee high confidentiality for all of our players, including families and children.",
        "This platform runs entirely local-first inside your browser cache. All game favorites, ratings, and score rankings are stored safely on your device.",
        "Cookies are only deployed for standard session persistence, such as maintaining your current language, audio settings, and theme choices.",
        "We never track, sell, or distribute any user metrics or email values to third party networks."
      ],
      termsContent: [
        "By accessing and playing on PokiBox, you agree to comply with all terms and clauses stated in this license.",
        "All recommendations, instructions, and gameplay rules are shared for general awareness and entertaining recreation contexts.",
        "Commercial reproduction, cloning, or scraping of our native games is strictly forbidden without written permission.",
        "The end-user assumes responsibility for their browser stability, and we guarantee high uptime and rapid loading on both mobile and desktop."
      ],
      disclaimerContent: [
        "All games featured on PokiBox are legally embeddable, open-source, or custom designed for high fidelity web browser gameplay.",
        "If you are a copyright owner and believe your game is embedded here incorrectly, contact us immediately and we will remove the asset.",
        "PokiBox, its operators, and affiliates reject any liability for connectivity loss resulting from external network conditions.",
        "Always take regular breaks during gameplay to preserve your eye health and physical wellness."
      ]
    }
  }
};
