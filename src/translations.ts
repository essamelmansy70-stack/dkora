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
      title: "خريطة الموقع الديناميكية (Sitemap)",
      subtitle: "وصول سهل وفهرسة فورية لكافة صفحات منصة ديكوراFX والتوصيات النشطة والسابقة",
      staticPages: "الصفحات والأقسام الثابتة",
      dynamicSignals: "التوصيات والصفقات الفردية المباشرة",
      allRights: "كافة الحقوق محفوظة لمنصة ديكوراFX لعام 2026."
    },
    footer: {
      about: "عن ديكوراFX",
      aboutText: "المنصة العربية الرائدة لتقديم توصيات وتحليلات أسواق المال العالمية والفوركس بدقة متناهية تحت إشراف نخبة من الخبراء والمحللين الفنيين والماليين.",
      links: "روابط قانونية هامة",
      privacy: "سياسة الخصوصية وسرية البيانات",
      terms: "اتفاقية وشروط الاستخدام",
      disclaimer: "إخلاء المسؤولية وتحذير المخاطر",
      copyright: "ديكوراFX © 2026. توصيات فوركس دقيقة وأجندة تفاعلية متقدمة."
    },
    legal: {
      privacyTitle: "سياسة الخصوصية وسرية البيانات",
      termsTitle: "شروط واتفاقية الاستخدام",
      disclaimerTitle: "إخلاء المسؤولية وتحذير المخاطر",
      privacyContent: [
        "نحن في ديكوراFX نلتزم بأعلى معايير الحماية والسرية التامة لبياناتك الشخصية وتفضيلاتك التداولية المتنوعة.",
        "المنصة تعمل بالكامل محلياً وفي بيئة آمنة لحفظ الصفقات والتفضيلات الشخصية للمستخدم في ذاكرة المتصفح دون نقل بيانات لجهات خارجية.",
        "ملفات تعريف الارتباط تُستخدم بشكل أساسي لتحسين تجربة التصفح وتذكر تفضيلاتك مثل اللغة المفضلة ونمط الإضاءة الحالي.",
        "نحن لا نقوم ببيع أو مشاركة أو تداول أي بيانات خاصة بقرائنا أو زوارنا على الإطلاق."
      ],
      termsContent: [
        "باستخدامك لمنصة ديكوراFX، فإنك توافق التوافق التام على شروط الاستخدام المذكورة في هذه الاتفاقية.",
        "التوصيات والمعلومات المنشورة هنا هي لأغراض إرشادية وتثقيفية فقط، ولا يجب اعتبارها بأي شكل من الأشكال نصائح مالية مباشرة للاستثمار.",
        "يتحمل المستخدم المسؤولية الكاملة والمنفردة عن استخدام هذه التوصيات وتطبيقها على حسابات التداول الحقيقية الخاصة به.",
        "يحظر تماماً نسخ أو تداول توصياتنا الحصرية لأغراض تجارية دون إذن كتابي مسبق من الإدارة."
      ],
      disclaimerContent: [
        "تداول العملات الأجنبية (الفوركس) وعقود الفروقات ينطوي على مخاطر عالية جداً بسب الرافعة المالية، وقد يؤدي إلى خسارة رأس المال المستثمر بالكامل.",
        "التحليلات والتوصيات المعروضة في ديكوراFX تعبر عن رؤية فنية لخبراء السوق، ولا تضمن بأي حال من الأحوال أرباحاً مستقبلية مؤكدة.",
        "المنصة وفريق عملها ومحللوها غير مسؤولين عن أي خسائر مادية مباشرة أو غير مباشرة قد يتكبدها المستخدم نتيجة الاعتماد على هذه البيانات.",
        "يرجى دائماً التداول بأموال يمكنك تحمل خسارتها، واستشارة مستشار مالي مستقل قبل اتخاذ قرارات تداول مصيرية."
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
      title: "Dynamic Sitemap Directory",
      subtitle: "Immediate index access to all DkoraFX static pages, interactive sections, and live active/historic signals",
      staticPages: "Static Pages & Sections",
      dynamicSignals: "Live Individual Signals & Trades",
      allRights: "All Rights Reserved for DkoraFX © 2026."
    },
    footer: {
      about: "About DkoraFX",
      aboutText: "The leading Arabic financial platform providing top-tier currency trading signals, market breakdowns, and daily analytics under senior expert supervision.",
      links: "Legal Directory Links",
      privacy: "Privacy & Data Policy",
      terms: "Terms of Use Agreement",
      disclaimer: "Risk Warning Disclaimer",
      copyright: "DkoraFX © 2026. Precise Forex recommendations and interactive calendar."
    },
    legal: {
      privacyTitle: "Privacy & Data Policy",
      termsTitle: "Terms of Use Agreement",
      disclaimerTitle: "Risk Warning Disclaimer",
      privacyContent: [
        "We at DkoraFX respect your absolute privacy and guarantee high confidentiality of your preferences.",
        "This platform runs entirely local-first inside your browser cache. All trading additions, metrics, and risk limits are stored safely on your device.",
        "Cookies are only deployed for standard session persistence, such as keeping your current language and layout mode settings intact.",
        "We never share, trade, or distribute your email or configuration values to any third party."
      ],
      termsContent: [
        "By accessing and using DkoraFX, you agree to comply with all terms and clauses stated in this license.",
        "All recommendations, charts, and values are shared for general awareness and educational contexts, never as solid investing calls.",
        "The end-user assumes total responsibility for any execution made on real or demo trading accounts.",
        "Commercial reproduction, redistribution, or scraping of our intellectual signals is strictly forbidden without written permission."
      ],
      disclaimerContent: [
        "Foreign Exchange (Forex) and CFD trading involve high leverage and bring significant risk of total capital loss.",
        "Technical analysis, trend forecasts, and recommendations on DkoraFX express our analyst perspectives and do not promise definite yields.",
        "DkoraFX, its operators, and affiliates reject any liability for physical losses resulting directly or indirectly from utilizing this web dashboard.",
        "Always trade with capital you can afford to lose, and consult an independent certified financial advisor if needed."
      ]
    }
  }
};
