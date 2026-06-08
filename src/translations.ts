export interface TranslationType {
  meta: {
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  };
  header: {
    logoSuffix: string;
    badge: string;
    subtitle: string;
    langButton: string;
    muteTitle: string;
    unmuteTitle: string;
    themeTitle: string;
  };
  hero: {
    headlinePrefix: string;
    headlineHighlight: string;
    subtitle: string;
  };
  tabs: {
    compress: string;
    background: string;
    enhance: string;
    watermark: string;
  };
  dropzone: {
    title: string;
    subtitle: string;
    formats: string;
    btn: string;
  };
  infoBanner: {
    badge: string;
    title: string;
    desc: string;
    point1: string;
    point2: string;
    point3: string;
  };
  panels: {
    compressTitle: string;
    formatLabel: string;
    qualityLabel: string;
    resizeLabel: string;
    percentOption: string;
    pixelOption: string;
    scalePercent: string;
    customDimensions: string;
    width: string;
    height: string;
    maintainAspect: string;
    recommendedPreset: string;
    presetLcpDesc: string;
    presetThumbnailDesc: string;
    presetCoverDesc: string;
    presetStoryDesc: string;

    backgroundTitle: string;
    autoDetectBtn: string;
    pipetteBtn: string;
    pickingActive: string;
    pipetteTooltip: string;
    currentColorTag: string;
    clearBgLabel: string;
    clearBgDesc: string;
    tolerance: string;
    feather: string;
    manualEraserTitle: string;
    manualEraserToggle: string;
    brushSize: string;
    brushModeErase: string;
    brushModeRestore: string;
    brushClearBtn: string;

    enhanceTitle: string;
    brightness: string;
    contrast: string;
    saturation: string;
    blur: string;
    grayscale: string;
    sepia: string;
    resetAll: string;

    watermarkTitle: string;
    enableWatermark: string;
    watermarkType: string;
    textOption: string;
    imageOption: string;
    watermarkTextLabel: string;
    watermarkColorLabel: string;
    opacity: string;
    scale: string;
    positionLabel: string;
    posCenter: string;
    posBottomRight: string;
    posBottomLeft: string;
    posTopRight: string;
    posTopLeft: string;
    posPattern: string;
    logoUploadLabel: string;
    logoUploadDesc: string;
  };
  preview: {
    title: string;
    statusActive: string;
    fileName: string;
    originalLabel: string;
    optimizedLabel: string;
    originalBadge: string;
    optimizedBadge: string;
    downloadBtn: string;
    resetAllBtn: string;
    toastDetectionSuccess: string;
    toastDetectionNone: string;
    toastDetectionFallback: string;
    toastEraserCleared: string;
    toastResetSuccess: string;
    eyedropperActiveNotify: string;
  };
  metrics: {
    originalSize: string;
    optimizedSize: string;
    dimensions: string;
    savingRatio: string;
    perfectScoreBadge: string;
    scoreTitle: string;
    scoreDesc: string;
    scoreExcellent: string;
    scoreGood: string;
    scoreSlight: string;
  };
  history: {
    title: string;
    savedText: string;
    downloadAgain: string;
    emptyHistory: string;
  };
  seoHub: {
    tag: string;
    title: string;
    switcherEcommerce: string;
    switcherWordpress: string;
    switcherYoutube: string;
    recommendationTitle: string;
    recEco1: string;
    recEco2: string;
    recEco3: string;
    recEco4: string;
    recWord1: string;
    recWord2: string;
    recWord3: string;
    recWord4: string;
    recYt1: string;
    recYt2: string;
    recYt3: string;
    recYt4: string;
    keywordsTitle: string;
    volMedium: string;
    volLowMedium: string;
    diffScore: string;
    avgSearch: string;
    codeTabCompress: string;
    codeTabBgRemove: string;
    copyBtn: string;
    copiedBtn: string;
    codeNote: string;
    legacyProtocol: string;
    modernProtocol: string;
    vitalsTitle: string;
    vitalsText: string;
    robotTxtTitle: string;
    robotTxtDesc: string;
    arText: string;
    speedTitle: string;
    speedDesc: string;
    activeText: string;
  };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    privacyBtn: string;
    termsBtn: string;
    closeBtn: string;
    acceptBtn: string;
    privacyHeaderBadge: string;
    privacyHeaderBadgeDesc: string;
    privacyLabel1: string;
    privacyDesc1: string;
    privacyLabel2: string;
    privacyDesc2: string;
    privacyLabel3: string;
    privacyDesc3: string;
    privacyLabel4: string;
    privacyDesc4: string;
    termsHeaderBadge: string;
    termsHeaderBadgeDesc: string;
    termsLabel1: string;
    termsDesc1: string;
    termsLabel2: string;
    termsDesc2: string;
    termsLabel3: string;
    termsDesc3: string;
    termsLabel4: string;
    termsDesc4: string;
    copyright: string;
  };
}

export const translations: Record<'ar' | 'en', TranslationType> = {
  ar: {
    meta: {
      titleAr: "ضاغط وعازل خلفية الصور الذكي | imgdkora",
      titleEn: "Smart Image Compressor & Background Remover | imgdkora",
      descAr: "اضغط حجم الصور وعزل الخلفية واصنع علامات مائية مخصصة محلياً وآمناً بنسبة 100٪ بدون رفع ملفات خارج المتصفح.",
      descEn: "Compress images, remove background, and add custom watermark locally and securely 100% inside your browser."
    },
    header: {
      logoSuffix: "v2.2",
      badge: "معالجة احترافية 📸",
      subtitle: "أداة صناعة وضغط ومسح خلفيات الصور مجاناً لصناع المحتوى",
      langButton: "English 🇸🇦/🇬🇧",
      muteTitle: "كتم المؤثرات الصوتية",
      unmuteTitle: "تفعيل المؤثرات الصوتية",
      themeTitle: "تبديل الوضع الليلي أو العادي",
    },
    hero: {
      headlinePrefix: "حوّل صورك الرقمية المعقدة إلى",
      headlineHighlight: "تحفة فنية احترافية.",
      subtitle: "قم بضغط حجم الصورة لنسب خيالية، عزل وتفريغ الألوان الخلفية يدوياً وتلقائياً، وتعديل مستويات السطوع والتشبع بكل أمان وخصوصية تامة دون رَفْع أي بايت خارج متصفحك!",
    },
    tabs: {
      compress: "ضغط وتصغير المقاسات",
      background: "عزل وتفريغ الخلفية",
      enhance: "تحسين وضبط الألوان",
      watermark: "العلامة المائية والشعار",
    },
    dropzone: {
      title: "اقتطاف صورك ومعالجتها فوراً محلياً",
      subtitle: "اسحب وأسقط صورتك هنا لبدء معالجتها مجاناً!",
      formats: "يدعم الصيغ القياسية: PNG، JPG، WebP، وغيرها. نحن لا نرفع صورك نهائياً؛ تجري المعالجة وتفريغ الخلفية المعزولة بالكامل محلياً داخل متصفحك بشكل سري وآمن تماماً.",
      btn: "تصفح الصور واختيار ملف",
    },
    infoBanner: {
      badge: "أداء وسيو",
      title: "لماذا يؤثر حجم وعزل الصور على أرشفة وتصدر موقعك في محركات البحث؟",
      desc: "المواقع الحديثة تتطلب سرعة تحميل فائقة لحصد نقاط PageSpeed ممتازة من جوجل. عندما تستخدم تفريغ وضغط Client-Side محلي هنا:",
      point1: "يقل زمن انتظار استجابة السيرفر للصفر وتتحمل الصورة بلمح البصر.",
      point2: "تكتسب ثقة جوجل بوت (GoogleBot) عبر توفير صور بأبعاد دقيقة وصيغ جيل حديث WebP.",
      point3: "عزل خلفيات المنتجات يرفع معدلات التحويل (Conversion Rate) ومثالي لمتاجر دروبشيبينغ.",
    },
    panels: {
      compressTitle: "إعدادات الضغط وتنسيق البكسل الحديثة:",
      formatLabel: "تنسيق مخرج الملف المستهدف (Format):",
      qualityLabel: "جودة الضغط ونسبة الضغط الصامت:",
      resizeLabel: "أبعاد الصورة والتحجيم:",
      percentOption: "بالنسبة المئوية (%)",
      pixelOption: "بأبعاد البكسل الدقيقة (px)",
      scalePercent: "نسبة قياس العرض والارتفاع المئوي:",
      customDimensions: "تحديد أبعاد مخصصة:",
      width: "العرض",
      height: "الارتفاع",
      maintainAspect: "الحفاظ على النسبة والتناسب التلقائي للأبعاد",
      recommendedPreset: "الأبعاد والتوصيات القياسية للمنصات المشهورة:",
      presetLcpDesc: "لتسريع واجهات المتاجر والـ LCP",
      presetThumbnailDesc: "لمصغرات ومقاطع اليوتيوب HD",
      presetCoverDesc: "صورة خلفية كفر فيسبوك القياسي",
      presetStoryDesc: "مقاس ستوري المتاجر وانستجرام الرأسي",

      backgroundTitle: "استبعاد وتفريغ لون الخلفية المستهدف تلقائياً أو يدوياً:",
      autoDetectBtn: "كشف اللون تلقائياً 🪄",
      pipetteBtn: "اقتطف لوناً يدوياً 🎯",
      pickingActive: "اضغط على الصورة...",
      pipetteTooltip: "انقر هنا ثم اضغط على أي نقطة بالصورة لالتقاط لونها بدقة!",
      currentColorTag: "اللون المستهدف للاستبعاد:",
      clearBgLabel: "قوة التسامح وتعميم العزل اللوني (Tolerance Range):",
      clearBgDesc: "القيم الأكبر تحذف تدرجات الألوان المتقاربة من المستهدف.",
      tolerance: "مستوى التسامح اللوني",
      feather: "حافة الريشة وتنعيم الانقطاع (Feathering)",
      manualEraserTitle: "مميزات التحرير والمسح اليدوي الدقيق بفرشاة التنعيم:",
      manualEraserToggle: "تفعيل أداة المسح وإصلاح وتعديل الحواف يدوياً",
      brushSize: "قطر وحجم وعرض الفرشاة الدائرية:",
      brushModeErase: "وضع مسح بكسل الخلفية 🔴",
      brushModeRestore: "وضع استعادة وإصلاح الأصل 🟢",
      brushClearBtn: "إعادة تعيين واستعادة الخلفية الأصلية بالكامل",

      enhanceTitle: "تعديل حيوية الألوان والسطوع والفلترة الإبداعية:",
      brightness: "مستوى السطوع والإنارة الكلية",
      contrast: "التباين وعزل الظلال الحادة (Contrast)",
      saturation: "تشبع وحيوية ودفء الألوان الأساسية",
      blur: "غبش وتمويه الخلفية والعمق البصري",
      grayscale: "تطبيق التدرج الرمادي التام (Grayscale)",
      sepia: "تحويل الألوان للمظهر الكلاسيكي العتيق (Sepia)",
      resetAll: "تفريغ وتصغير الكل 🔄",

      watermarkTitle: "العلامة المائية المخصصة وتأمين حقوق الملكية الفكرية الكلي:",
      enableWatermark: "تطبيق وتمكين تركيب علامة مائية ذكية على الصورة المعالجة",
      watermarkType: "نوع وهوية الشعار المستعمل كعلامة:",
      textOption: "نص مكتوب مخصص ومحمي",
      imageOption: "صورة شعار أو كود مخصص (PNG/JPG)",
      watermarkTextLabel: "اكتب النص المراد طباعته:",
      watermarkColorLabel: "لون التعبئة الأساسي للنص المكتوب:",
      opacity: "معدل الشفافية والاندماج مع البكسل الأساسي:",
      scale: "مستوى الحجم والتحجيم والأبعاد:",
      positionLabel: "اختر موضع وتوزيع العلامة المائية التلقائية:",
      posCenter: "وسط الصورة",
      posBottomRight: "أسفل اليمين",
      posBottomLeft: "أسفل اليسار",
      posTopRight: "أعلى اليمين",
      posTopLeft: "أعلى اليسار",
      posPattern: "نمط مكرر منتشر (Pattern Overlay)",
      logoUploadLabel: "تحميل صورة شعارك المائي المخصص:",
      logoUploadDesc: "يفضل استخدامه بصيغة PNG شفافة مع خلفية مقطوعة بالكامل للحصول على مظهر احترافي.",
    },
    preview: {
      title: "نافذة معاينة ومقارنة الفروقات المباشرة (Live Studio View):",
      statusActive: "نشط ومعالج",
      fileName: "اسم الملف المعالج",
      originalLabel: "الصورة الأصلية الفنية",
      optimizedLabel: "الصورة المحسنة والمخرجة المعتمدة للثبات",
      originalBadge: "البداية",
      optimizedBadge: "المحسن والمعدل",
      downloadBtn: "حفظ وتحميل الصورة المعالجة ✨",
      resetAllBtn: "تفريغ جميع عناصر التحكم",
      toastDetectionSuccess: "المستشعر الذكي كشف الحواف واقتطع لون الخلفية بنجاح:",
      toastDetectionNone: "فشل الكشف التلقائي: حواف الصورة شفافة بالفعل.",
      toastDetectionFallback: "تم تهيئة الإزالة الافتراضية على اللون البيضاء.",
      toastEraserCleared: "تم مسح تدوينات فرشاة التفريغ واستعادة الخلفية الأصلية للكامل.",
      toastResetSuccess: "تمت إعادة تعيين وتصفير كافّة عناصر التحكم والألوان للإعداد الافتراضي القياسي.",
      eyedropperActiveNotify: "ميزة القطارة مفعّلة! يرجى النقر على أي مكان في الصورة بالأعلى لاقتطاف اللون بدقة واقتطاعه فوراً.",
    },
    metrics: {
      originalSize: "الحجم الأصلي الكلي:",
      optimizedSize: "الحجم المحسن النهائي:",
      dimensions: "أبعاد الصورة النهائية:",
      savingRatio: "نسبة توفير وعزل المساحة المستغلة:",
      perfectScoreBadge: "سرعة البرق ⚡️",
      scoreTitle: "مؤشر سرعة وتوافق جوجل بنسبة 100٪:",
      scoreDesc: "صيغة جيل حديث ومعالجة ممتازة توفر لود السيرفر والباندويث.",
      scoreExcellent: "النتيجة: ممتازة وخارقة (PageSpeed 100/100)",
      scoreGood: "النتيجة: جيدة جداً وسهلة الأرشفة بفارق مناسب",
      scoreSlight: "النتيجة: مقبولة ولكن ينصح برفع معدل الضغط والتحويل لويب بي",
    },
    history: {
      title: "سجل الصور المعدلة محلياً في هذه الجلسة الاستعراضية:",
      savedText: "وفرت مساحة ضخمة بنسبة:",
      downloadAgain: "تحميل مجدداً",
      emptyHistory: "لا توجد صور في سجل التاريخ المباشر حالياً. قم بمعالجة وتحميل صورك لتظهر إحصائياتك هنا تلقائياً.",
    },
    seoHub: {
      tag: "كشكول التكتيكات واستراتيجية سكور السيو (SEO) لعام 2026",
      title: "خبير الـ SEO On-Page لـ",
      switcherEcommerce: "المتاجر الإلكترونية",
      switcherWordpress: "مدونات ووردبريس",
      switcherYoutube: "منشئي محتوى يوتيوب",
      recommendationTitle: "📈 نصائح مخصصة لزيادة تصدر موقعك وأرشفة صورك فوراً:",
      recEco1: "استخدم صور خلفيات بيضاء أو شفافة تماماً لمنتجاتك لتوافق معايير Google Shopping ومتجر سلة.",
      recEco2: "قم بضغط كل صور المنتجات ليكون حجم الملف تحت 80 كيلوبايت لتقليل ارتداد الزوار وزيادة المبيعات.",
      recEco3: "استخدم ميزة Lazy Loading التلقائية عبر تضمين loading=\"lazy\" بالامتدادات.",
      recEco4: "سمِّ الصورة بأسماء المنتجات المستهدفة مثل (iphone-15-pro.webp) بدلاً من الأسماء العشوائية.",
      recWord1: "بروتوكول WebP يضمن ضغط أعلى من JPG بنسبة تزيد عن 75٪ مع الحفاظ التام والكامل للعناصر الحادة.",
      recWord2: "تثبيت أبعاد العرض والارتفاع المسموح بها للقوالب تمنع حدوث تغيرات مفاجئة بتصميم الصفحة (CLS).",
      recWord3: "تأكد من كتابة الكلمة المفتاحية في وسم النص البديل (Alt Text) لمضاعفة الأرشفة في بحث صور جوجل.",
      recWord4: "قم بتفعيل إضافات الكاش والدمج لتقليل استدعاء ملفات التنسيق الكبيرة.",
      recYt1: "مصغرات فيديوهات اليوتيوب بدقة 1280x720 بكسل تضمن ظهوراً فائق الجودة على الهواتف والشاشات الذكية.",
      recYt2: "العلامة المائية المخصصة تمنع سرقة صورك الحصرية من قِبل القنوات الأخرى والصفحات المنافسة.",
      recYt3: "استخدام ألوان ذات كونتراست وتشبع قوي مثل (أصفر، أحمر، أخضر) تزيد من نسبة الفتح للظهور (CTR).",
      recYt4: "التحويل بصيغة JPEG أو PNG بالدقة الكاملة يضمن المحافظة على دقة حدة الكلمات والوجوه.",
      keywordsTitle: "الكلمات الدلالية الموصى بها لمستهدفي dkora.online:",
      volMedium: "المنافسة: متوسطة",
      volLowMedium: "المنافسة: منخفضة-متوسطة",
      diffScore: "صعوبة الـ SEO: 25/100",
      avgSearch: "متوسط البحث الشهري: 2,500+",
      codeTabCompress: "كود الضغط البرمجي (Canvas API)",
      codeTabBgRemove: "كود العزل اللوني الذكي (Web Worker)",
      copyBtn: "نسخ الكود البرمجي",
      copiedBtn: "تم النسخ بنجاح! 📋",
      codeNote: "💡 ملاحظة تقنية: هذا المنطق يعمل بالكامل في متصفح المستخدم (Client-Side) بدون نقل الصور لسيرفرات خارجية أو دفع رسوم واجهات برمجية. هذا يعطيك أرشفة ممتازة لأن السيرفر الخاص بـ dkora.online سيوفر 100٪ من الترافيك، ومؤشر أداء الموقع سيظل بمربع الـ 100% الأخضر!",
      legacyProtocol: "البروتوكول التقليدي القديم (معالجة السيرفر):",
      modernProtocol: "البروتوكول الحديث (imgdkora Local):",
      vitalsTitle: "أداء فائق مع الصفر لود على خادمك الخاص",
      vitalsText: "تم تكوين خريطة الموقع بنجاح على المسار /sitemap.xml لتمكين أرشفة فورية لروابطك وتوجيه جوجل بوت بأولوية قصوى.",
      robotTxtTitle: "التوافق التام لملف Robots.txt القياسي",
      robotTxtDesc: "ملف /robots.txt يوجه العناكب لتجنب المجلدات البرمجية العملاقة، لتقليل لود السيرفر وتوفير الباندويث المخصص.",
      arText: "نشط 100%",
      speedTitle: "سرعة فائقة مصفاة",
      speedDesc: "مُهيأ",
      activeText: "نشط ومهيأ 100%",
    },
    legal: {
      privacyTitle: "سياسة الخصوصية وسرية البيانات والأمان",
      termsTitle: "شروط الخدمة وبنود الاستخدام",
      privacyBtn: "سياسة الخصوصية الأمنية",
      termsBtn: "اتفاقية بنود الخدمة",
      closeBtn: "إغلاق",
      acceptBtn: "موافق وفهمت",
      privacyHeaderBadge: "خصوصية بنسبة ١٠٠٪ (المعالجة في المتصفح فقط)",
      privacyHeaderBadgeDesc: "نحن نضمن حماية صورك بالكامل. جميع عمليات ضغط الصور، وعزل الخلفية، وتركيب الشعارات والعلامات المائية تتم محلياً بالكامل داخل متصفح الإنترنت الخاص بك ولا يتم رفعها أو نسخها أو حفظها نهائياً في أي خادم أو سيرفر خارجي.",
      privacyLabel1: "1. جمع البيانات الشخصية:",
      privacyDesc1: "تطبيق imgdkora لا يقوم بطلب أو جمع أي بيانات تعريفية شخصية، أو حسابات تواصل، أو سجلات تتبع للمستعملين. إننا لا نستخدم ملفات تتبع غازية لجمع معلوماتك الخاصة.",
      privacyLabel2: "2. معالجة الصور الكثيفة:",
      privacyDesc2: "كافة الحسابات الرياضية المتقدمة للذكاء اللوني وتكثيف البكسل والمسح التسامحي تجري محلياً عبر وحدة المعالجة المركزية (CPU) والرسومية الخاصة بجهازك مباشرة، مما يضمن أعلى سقف من الأمان والسرية الفائقة للمصورين وصانعي المحتوى الإعلاني.",
      privacyLabel3: "3. ملفات كوكيز والطرف الثالث:",
      privacyDesc3: "نحن نستخدم كوكيز تخزين محلي (LocalStorage) فقط وحصرياً لحفظ خيارات تفضيلاتك مثل (اختيار الوضع الليلي، تفعيل كتم الصوت) لضمان تجربة مستخدم سلسة في الزيارات القادمة.",
      privacyLabel4: "4. تعديلات السياسة:",
      privacyDesc4: "قد يتم تحديث بنود سياسة الخصوصية بشكل دوري لمواكبة تقنيات المتصفحات الحديثة، وسيتم نشر التغييرات الفنية في هذه الصفحة مباشرة.",
      termsHeaderBadge: "تراخيص استخدام حرة مجانية مدى الحياة",
      termsHeaderBadgeDesc: "يرخص لك استخدام الصور الناتجة والمعدلة عبر تطبيق imgdkora في كافة الأغراض الشخصية والتجارية، كاليوتيوب، إنستجرام، فيسبوك، والمتاجر الإلكترونية دون أي التزام أو حقوق قانونية أو عمولات مالية.",
      termsLabel1: "1. قبول الشروط:",
      termsDesc1: "باستخدامك لتطبيق imgdkora معالج الصور الرقمي، فإنك توافق طواعية بالكامل على كافة هذه البنود المذكورة هنا دون أي تحفظ قانوني.",
      termsLabel2: "2. قيود الاستعمال والمسؤولية:",
      termsDesc2: "يمنع استخدام الأداة في إنتاج أو صياغة أو تعديل صور تنتهك القوانين العامة، أو تحتوي على محتويات مضللة، أو تمس بحقوق الملكية الفكرية لطرف آخر. يتحمل المستخدم المسؤولية الكاملة والمنفردة لملفات الصور التي يقوم بمعالجتها محلياً.",
      termsLabel3: "3. إخلاء المسؤولية من الأعطال:",
      termsDesc3: "يقدم التطبيق ومحركات المعالجة \"كما هي\" دون أي وساطة أو ضمان عيني لسرعة أداء أجهزة المستخدم الضعيفة أو القديمة أثناء حسابات التفريغ اللوني الضخم للصور ذات الدقة 4K.",
      termsLabel4: "4. تواصل الدعم والتحسينات:",
      termsDesc4: "نحن نعمل بشغف لتطوير وتحسين سرعة وخوارزميات المعالجة باستمرار، ويسعدنا دائماً تلقي اقتراحاتكم البنّاءة لزيادة فعالية الكود.",
      copyright: "imgdkora هو مشروع محلي معالج للويب مفتوح المصدر وآمن بالكامل. جميع عمليات المعالجة للصور تتم فورياً محلياً بدون إمكانية التجسس أو المراقبة."
    }
  },
  en: {
    meta: {
      titleAr: "ضاغط وعازل خلفية الصور الذكي | imgdkora",
      titleEn: "Smart Image Compressor & Background Remover | imgdkora",
      descAr: "اضغط حجم الصور وعزل الخلفية واصنع علامات مائية مخصصة محلياً وآمناً بنسبة 100٪ بدون رفع ملفات خارج المتصفح.",
      descEn: "Compress images, remove background, and add custom watermark locally and securely 100% inside your browser."
    },
    header: {
      logoSuffix: "v2.2",
      badge: "Professional Processing 📸",
      subtitle: "Free tool for image compression, background isolation, and watermarking for content creators",
      langButton: "العربية 🇸🇦/🇬🇧",
      muteTitle: "Mute Sound Effects",
      unmuteTitle: "Enable Sound Effects",
      themeTitle: "Toggle Dark/Light Mode",
    },
    hero: {
      headlinePrefix: "Convert Your Complex Digital Images into a",
      headlineHighlight: "Professional Masterpiece.",
      subtitle: "Compress images down to unbelievably small sizes, isolate and erase background colors dynamically or manually, and adjust brightness & saturation levels under 100% absolute privacy. Not a single byte ever leaves your browser!",
    },
    tabs: {
      compress: "Compression & Resizing",
      background: "Background Removal & Isolation",
      enhance: "Color & Adjustment Settings",
      watermark: "Custom Watermark & Logo",
    },
    dropzone: {
      title: "Import Your Images for Full Local Processing",
      subtitle: "Drag and drop your image file here to start editing for free!",
      formats: "Supports all standard formats: PNG, JPG, WebP, and more. Your files are processed entirely inside your browser cache. Secure, fast, and no server uploads.",
      btn: "Browse Images & Select File",
    },
    infoBanner: {
      badge: "SEO & Speed",
      title: "How Image Size & Background Removal Affects Your Google Ranking Acceleration",
      desc: "Modern portals require blazing fast performance to register pristine Core Web Vitals score. By using local on-device resizing:",
      point1: "Your server latency drops to absolute zero since the client computes everything.",
      point2: "Gain immediate search engines priority index with responsive modern WebP formatting.",
      point3: "Removing background clutter can surge user conversion ratios for dropshipping stores.",
    },
    panels: {
      compressTitle: "Advanced Compression & Modern Pixel Output Options:",
      formatLabel: "Target Output File Type (Format):",
      qualityLabel: "Lossless/Lossy Compression Quality Ratio:",
      resizeLabel: "Dimensions and Rescaling Mode:",
      percentOption: "Percentage Ratio (%)",
      pixelOption: "Precise Custom Pixels (px)",
      scalePercent: "Scale Width and Height by Percentage:",
      customDimensions: "Set Specific Pixel Width & Height:",
      width: "Width (W)",
      height: "Height (H)",
      maintainAspect: "Maintain Aspect Ratio and Proportions Automatically",
      recommendedPreset: "Recommended Dimensional Presets for Layouts:",
      presetLcpDesc: "For store banners and blazing LCP speeds",
      presetThumbnailDesc: "HD YouTube Screen Resolution Spec",
      presetCoverDesc: "Standard Facebook Background Banner Scale",
      presetStoryDesc: "Instagram and TikTok Portrait Ratio format",

      backgroundTitle: "Select & Exclude Target Background Colors Instantly:",
      autoDetectBtn: "Auto-detect Background 🪄",
      pipetteBtn: "Pick Color Manually 🎯",
      pickingActive: "Click on Image above...",
      pipetteTooltip: "Click here, then click anywhere on your image above to pick and erase that color!",
      currentColorTag: "Target Exclusion Color:",
      clearBgLabel: "Exclusion Scope Margin (Tolerance Range):",
      clearBgDesc: "Larger values wipe out neighboring color shades relative to the target code.",
      tolerance: "Color Tolerance Level",
      feather: "Smoothing Radius (Feathering Edge)",
      manualEraserTitle: "Precise Brush-Action Manual Eraser Tools:",
      manualEraserToggle: "Enable Brush Toolbar for manual drawing corrections",
      brushSize: "Circular Correction Brush Diameter:",
      brushModeErase: "Alpha Pixel Painting 🔴",
      brushModeRestore: "Restore Source Pixel Backup 🟢",
      brushClearBtn: "Reset Brush Workspace and Restore fully",

      enhanceTitle: "Vibrant Color Editing & Atmospheric Adjustments",
      brightness: "Overall Luminosity and Brightness Level",
      contrast: "Dynamic Range Separation & Contrast Ratio",
      saturation: "Primary Vibrancy and Color Warmth Level",
      blur: "Atmospheric Blur & Background Depth Field",
      grayscale: "Apply Ultra-Modern Monochrome Grayscale",
      sepia: "Infuse Vintage Classic Analog Warmth (Sepia)",
      resetAll: "Reset Controls & Restructure 🔄",

      watermarkTitle: "Watermarking Features & Asset Protection Shield:",
      enableWatermark: "Apply and render a modern dynamic watermark over output image",
      watermarkType: "Watermark Authentication Signature Type:",
      textOption: "Customized Protective Text Element",
      imageOption: "Branded Digital Logo Image (PNG/JPG)",
      watermarkTextLabel: "Enter text message to overlay:",
      watermarkColorLabel: "Fill Color for the text typography:",
      opacity: "Transparency blend level with raw pixels:",
      scale: "Watermark Scale & Sizing Dimension Ratio:",
      positionLabel: "Choose watermark layout coordinates:",
      posCenter: "Center-aligned Overlay",
      posBottomRight: "Bottom-Right Coordinate",
      posBottomLeft: "Bottom-Left Coordinate",
      posTopRight: "Top-Right Coordinate",
      posTopLeft: "Top-Left Coordinate",
      posPattern: "Repeated Watermark Pattern Overlay",
      logoUploadLabel: "Upload Branded Watermark Asset File:",
      logoUploadDesc: "We recommend using a transparent PNG logo with a cleanly cut background for a modern, high-contrast look.",
    },
    preview: {
      title: "Real-time Before/After Viewport (Live Studio View):",
      statusActive: "Active & Processed",
      fileName: "Optimized File Name",
      originalLabel: "Original Asset Viewport",
      optimizedLabel: "Optimized High Fidelity Asset Viewport",
      originalBadge: "Original",
      optimizedBadge: "Optimized & Isolated",
      downloadBtn: "Save and Download Processed Image ✨",
      resetAllBtn: "Reset All Applet Configuration",
      toastDetectionSuccess: "Smart engine successfully detected outer edges around target color:",
      toastDetectionNone: "Auto detection failed: outer boundaries are already transparent.",
      toastDetectionFallback: "Auto detection default initialized to standard White color spectrum.",
      toastEraserCleared: "All brush strokes cleared. Full backdrop restored to its initial state.",
      toastResetSuccess: "All controls, dimensions, and configurations successfully reset to defaults.",
      eyedropperActiveNotify: "Eyedropper tool active! Click on the image preview to pinpoint a color.",
    },
    metrics: {
      originalSize: "Original File Size:",
      optimizedSize: "Optimized Size:",
      dimensions: "Canvas Dimensions:",
      savingRatio: "Frictionless Storage Space Saved:",
      perfectScoreBadge: "Light-speed ⚡️",
      scoreTitle: "Google Core Web Vitals Compatibility index:",
      scoreDesc: "Modern format ensures instant loading speeds and minimum server costs for webmasters.",
      scoreExcellent: "Index Score: Exceptional Performance (PageSpeed 100/100)",
      scoreGood: "Index Score: Good with appropriate loading buffers",
      scoreSlight: "Index Score: Adequate, consider higher compression or converting to WebP",
    },
    history: {
      title: "Local Processed History in this Session:",
      savedText: "Saved a massive bulk space ratio of:",
      downloadAgain: "Download Again",
      emptyHistory: "Historical session is empty. Optimize some images to see your stats automatically computed here.",
    },
    seoHub: {
      tag: "On-Page SEO Tactics & Optimization Playbook for 2026",
      title: "SEO On-Page Specialist for",
      switcherEcommerce: "E-Commerce Stores",
      switcherWordpress: "WordPress Blogs",
      switcherYoutube: "YouTube Creators",
      recommendationTitle: "📈 Personalized optimization cues to boost your index immediately:",
      recEco1: "Use pure white or completely transparent backgrounds so your listings match Google Shopping and Shopify specs.",
      recEco2: "Compress all store assets down to under 80KB to keep user retention high and maximize checkout conversion rates.",
      recEco3: "Always declare the browser's native lazy loading parameter (loading=\"lazy\") on standard product blocks.",
      recEco4: "Rename random camera filenames to target product terms (e.g., store-product-name.webp) before uploading.",
      recWord1: "WebP format compresses 75% smaller than legacy JPGs while preserving sharp pixels on modern retina displays.",
      recWord2: "Explicitly declaring tag width and height ratios eliminates structural layout shifts (CLS) on slow networks.",
      recWord3: "Inject keywords directly inside target alternate tags (Alt Text) to trigger premium indexing in Google Image search.",
      recWord4: "Enable caching integrations and asset combining to reduce multiple HTTP roundtrip penalties.",
      recYt1: "YouTube target resolution of 1280x720 ensures your thumbnail maintains native HD fidelity on smart TVs.",
      recYt2: "Applying a branding watermark protects your creative photography against copycats and automated aggregators.",
      recYt3: "Boosting contrast and primary saturation values on objects triggers higher Click-Through-Rates (CTR).",
      recYt4: "Using high-quality PNG/JPEG retains facial clarity and text accessibility within high-resolution previews.",
      keywordsTitle: "Highly Recommended Targeted Industry Keywords for dkora.online:",
      volMedium: "Competition: Medium",
      volLowMedium: "Competition: Low-Medium",
      diffScore: "SEO Difficulty: 25/100",
      avgSearch: "Avg Monthly Queries: 2,500+",
      codeTabCompress: "Canvas Compression API (Production Scope)",
      codeTabBgRemove: "Alpha Extraction Worker Source (Browser Scope)",
      copyBtn: "Copy Implementation Code",
      copiedBtn: "Copied successfully! 📋",
      codeNote: "💡 Technical Notice: This entire logic executes locally in the user's browser (Client-Side). No external image servers are invoked. This guarantees an excellent LCP score because the core dkora.online server consumes zero bandwidth, maintaining the PageSpeed metric in the green zone!",
      legacyProtocol: "Legacy Traditional Method (Server Overload):",
      modernProtocol: "Modern Local Strategy (imgdkora Local Engine):",
      vitalsTitle: "No Server Cost or Processing Latencies",
      vitalsText: "Sitemap configured successfully on /sitemap.xml path to trigger instant indexing and bot validation with maximum priority.",
      robotTxtTitle: "Robots.txt Standard Compliance Enabled",
      robotTxtDesc: "The /robots.txt file directs crawlers to focus exclusively on public directories, reducing runtime server overhead.",
      arText: "100% Active",
      speedTitle: "Ultra High Performance Mode",
      speedDesc: "Configured",
      activeText: "Clean & Active 100%",
    },
    legal: {
      privacyTitle: "Data Confidentiality, Safety & Privacy Policy",
      termsTitle: "Terms of Service & Free Use Policy",
      privacyBtn: "Security & Privacy Policy",
      termsBtn: "Terms Of Service Agreement",
      closeBtn: "Close Window",
      acceptBtn: "I Understand & Accept",
      privacyHeaderBadge: "100% Secure Local Processing (Privacy Guarantee)",
      privacyHeaderBadgeDesc: "We guarantee that none of your photos are ever uploaded, processed, or saved on external servers. All operations—including compression, pixel alterations, and watermark compositions—take place directly in your device's browser memory.",
      privacyLabel1: "1. Handling of Personal Information:",
      privacyDesc1: "imgdkora does not request, solicit, collect, or store any personal data, analytical profiles, addresses, or user tracking cookies. We are entirely cookie-free for maximum comfort.",
      privacyLabel2: "2. Image Computation Execution:",
      privacyDesc2: "Advanced pixel mathematics, matrix transparency calculation, and canvas redrawing execute on your machine's CPU/GPU. No data stream exists outside your physical client.",
      privacyLabel3: "3. Local Storage Cookie Uses:",
      privacyDesc3: "We call the LocalStorage API only to securely track static configuration choices (dark mode, sound state) across consecutive visits for a seamless user experience.",
      privacyLabel4: "4. Policy Adjustments:",
      privacyDesc4: "We update our safety policy occasionally to align with modern native sandbox standard upgrades. Updates are instantly published to this localized dialog.",
      termsHeaderBadge: "Creative Commons Zero License (CC0)",
      termsHeaderBadgeDesc: "You are granted a perpetual, worldwide, non-exclusive license to use any asset generated or processed with imgdkora for both personal and commercial distribution (YouTube, online shops, Facebook Ads, newsletters) with zero fees.",
      termsLabel1: "1. Acceptance of Terms:",
      termsDesc1: "By utilizing the imgdkora platform, you willingly consent to our operational conditions and usage rules described in this document.",
      termsLabel2: "2. Responsibility for Assets:",
      termsDesc2: "It is strictly forbidden to use this tool to formulate, adapt, or process media content that violates local regulations, holds offensive content, or infringes intellectual rights. The client is solely liable for their input file.",
      termsLabel3: "3. Service Provisioning Limit:",
      termsDesc3: "The tool is offered 'as is' without warranty of performance coefficients on ancient or resource-depleted browser environments when converting huge 4K file formats.",
      termsLabel4: "4. Constant Code Advancements:",
      termsDesc4: "Our team operates out of pure passion for open source. We constantly revise our image processing matrices and appreciate any feature feedback or layout ideas.",
      copyright: "imgdkora is a privacy-first open-source web compiler. All pixel calculations execute on-device to avert security risks or tracking."
    }
  }
};
