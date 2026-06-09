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
    aboutTitle: string;
    aboutBtn: string;
    aboutHeaderBadge: string;
    aboutHeaderBadgeDesc: string;
    contactTitle: string;
    contactBtn: string;
    contactHeaderBadge: string;
    contactHeaderBadgeDesc: string;
    disclaimerTitle: string;
    disclaimerBtn: string;
    disclaimerHeaderBadge: string;
    disclaimerHeaderBadgeDesc: string;
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
  svgConverter: {
    title: string;
    subtitle: string;
    metaTitle: string;
    metaDesc: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    dropzoneBtn: string;
    btnConvert: string;
    btnConverting: string;
    originalLabel: string;
    resultLabel: string;
    btnDownload: string;
    controlColors: string;
    controlBlur: string;
    controlPrecision: string;
    controlOmit: string;
    infoTitle: string;
    infoDesc: string;
    infoNote: string;
    unsupportedFile: string;
    sizeLabel: string;
    pathsLabel: string;
  };
}

export const translations: Record<'ar' | 'en', TranslationType> = {
  ar: {
    meta: {
      titleAr: "ضاغط ومصغر الصور الذكي | imgdkora",
      titleEn: "Smart Image Compressor & Resizer | imgdkora",
      descAr: "اضغط حجم الصور وغير مقاساتها وأبعادها محلياً وبأمان 100٪ بدون رفع ملفات خارج المتصفح.",
      descEn: "Compress and resize images locally and securely 100% inside your browser."
    },
    header: {
      logoSuffix: "v2.2",
      badge: "معالجة احترافية 📸",
      subtitle: "أداة ضغط وتصغير حجم الصور مجاناً ومحلياً بأعلى جودة",
      langButton: "English 🇸🇦/🇬🇧",
      muteTitle: "كتم المؤثرات الصوتية",
      unmuteTitle: "تفعيل المؤثرات الصوتية",
      themeTitle: "تبديل الوضع الليلي أو العادي",
    },
    hero: {
      headlinePrefix: "حوّل صورك الرقمية إلى",
      headlineHighlight: "ملفات خفيفة واحترافية.",
      subtitle: "قم بضغط حجم الصورة لنسب مذهلة، وتعديل وتغيير المقاسات والأبعاد بكل سرعة وأمان وخصوصية تامة دون رَفْع أي بايت خارج متصفحك!",
    },
    tabs: {
      compress: "ضغط وتصغير المقاسات",
      background: "ضغط وتصغير المقاسات",
      enhance: "ضغط وتصغير المقاسات",
      watermark: "ضغط وتصغير المقاسات",
    },
    dropzone: {
      title: "اقتطاف صورك وضغطها فوراً محلياً",
      subtitle: "اسحب وأسقط صورتك هنا لبدء معالجتها مجاناً!",
      formats: "يدعم الصيغ القياسية: PNG، JPG، WebP، وغيرها. نحن لا نرفع صورك نهائياً؛ تجري المعالجة بالكامل محلياً داخل متصفحك بشكل سري وآمن تماماً.",
      btn: "تصفح الصور واختيار ملف",
    },
    infoBanner: {
      badge: "أداء وسرعة",
      title: "أداء فوري واستجابة سريعة لجميع أجهزتك",
      desc: "التطبيق يعمل بالكامل محلياً داخل المتصفح لضمان أمان ملفاتك وصورك وحمايتها بالكامل:",
      point1: "يقل زمن انتظار المعالجة للصفر وتتحمل الصورة بلمح البصر.",
      point2: "توفير كامل وصامت لباقة الإنترنت ودون استهلاك ترافيك السيرفر.",
      point3: "التحويل التلقائي لصيغة WebP يضمن معدلات خفض للمساحة تتجاوز 80٪.",
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
      privacyTitle: "سياسة الخصوصية وسرية البيانات والأمان (متوافقة مع AdSense)",
      termsTitle: "شروط الخدمة واتفاقية بنود الاستخدام المعتمدة",
      privacyBtn: "سياسة الخصوصية والأمان",
      termsBtn: "اتفاقية بنود الاستخدام",
      aboutTitle: "من نحن - رسالتنا وهويتنا الرقمية",
      aboutBtn: "من نحن",
      aboutHeaderBadge: "منصة imgdkora لمعالجة وضغط الصور رقمياً",
      aboutHeaderBadgeDesc: "نحن مشروع عربي ريادي ومطور يهدف إلى تقديم أدوات ويب مستقلة ومتطورة لتوفير خيارات ضغط وتعديل قياسات الصور محلياً بالكامل بداخل المتصفح وبسعة أمان ١٠٠٪ حرصاً على حماية ملفات وصور أصحاب المواقع والمدونين وصانعي المحتوى الإعلاني.",
      contactTitle: "اتصل بنا - الدعم التقني والاستفسارات المباشرة",
      contactBtn: "اتصل بنا",
      contactHeaderBadge: "نسعد دائماً بالتواصل الفعّال والإجابة على اقتراحاتكم",
      contactHeaderBadgeDesc: "يتوفر فريقنا التقني للرد السريع على استفساراتكم ومقترحات التعاون بخصوص خدمات وأدوات المنصة، أو الإبلاغ عن ثغرات أو أخطاء، عبر البريد المعتمد للمشروع (essamelmansy67@gmail.com).",
      disclaimerTitle: "إخلاء المسؤولية الفنية والقانونية",
      disclaimerBtn: "إخلاء المسؤولية",
      disclaimerHeaderBadge: "إخلاء مسؤولية فني وحقوقي بخصوص معالجة البكسل",
      disclaimerHeaderBadgeDesc: "يتم توفير خدمات المنصة ومحركات المعالجة الفورية المدمجة في المتصفح كما هي مجاناً ودون أي ضمانات فنية على الأجهزة ذات الموارد الضعيفة أو القديمة أثناء ضغط الصور الضخمة.",
      closeBtn: "إغلاق",
      acceptBtn: "موافق وقبول البنود",
      privacyHeaderBadge: "خصوصية بنسبة ١٠٠٪ ومتوافقة كلياً مع شروط Google AdSense",
      privacyHeaderBadgeDesc: "نحن نضمن حماية خصوصية بياناتك وصورك بالكامل كأولوية قاطعة. جميع عمليات ضغط الصور وعزل الخلفيات وإعادة تحجيم الأبعاد والتحويل لصيغة WebP تتم محلياً بالكامل (Client-Side) داخل متصفحك دون رفعها أو تخزينها أو مشاركتها مع أي جهة خارجية.",
      privacyLabel1: "1. جمع ومعالجة البيانات الشخصية:",
      privacyDesc1: "لا يطلب تطبيق imgdkora ولا يجمع أو يخزن أي بيانات تعريفية شخصية للمستخدمين، أو عناوين بريد، أو أرقام تواصل. الخدمة مخصصة كلياً للاستفادة التقنية المباشرة بدون تسجيل مسبق.",
      privacyLabel2: "2. ملفات تعريف الارتباط وإعلانات الطرف الثالث (Google AdSense Cookies):",
      privacyDesc2: "يستعين موقعنا بشركات إعلان من طرف ثالث (وعلى رأسها Google AdSense) لعرض الإعلانات المخصصة عندما تزور موقعنا. تستخدم هذه الشركات ملفات تعريف ارتباط (مثل DART cookie) لتقديم إعلانات موجهة تهم زوارنا بناءً على تصفحهم لموقعنا ومواقع أخرى على شبكة الإنترنت. يمكنك كزوّار اختيار تعطيل أو مراجعة ممارسات استخدام ملف تعريف الارتباط DART لخدمات إعلانات جوجل عبر مراجعة شبكة الخصوصية الرسمية لإعلانات جوجل ومواقع الطرف الثالث الموثوقة.",
      privacyLabel3: "3. ملفات تعريف الارتباط المحلية (LocalStorage & Session):",
      privacyDesc3: "نحن نستعمل تقنيات تخزين المتصفح المحلية (LocalStorage) لتخزين وتذكر تفضيلات الزائر المباشرة فقط مثل خيارات الوضع الليلي وتفضيل كتم المؤثرات الصوتية لضمان استخدام سلس ومريح وتلقائي في الزيارات المستقبلية.",
      privacyLabel4: "4. التحديثات والالتزام القانوني للسياسة:",
      privacyDesc4: "يتم تحديث بنود سياسة الخصوصية والأمان بشكل دوري لتتماشى وتتطابق مع معايير حماية البيانات العالمية GDPR وقواعد شراكة ناشري جوجل AdSense. استمرارك في استخدام المنصة يعد موافقة صريحة على هذه الضوابط.",
      termsHeaderBadge: "رخصة استخدام مجانية وحرة بالكامل مدى الحياة (CC0 License)",
      termsHeaderBadgeDesc: "يرخص لك استخدام كافة الصور المحسنة والمحولة والصادرة عبر تطبيق imgdkora في كافة المشاريع الشخصية والتجارية، كالمتاجر والمواقع والمدونات، دون أي مسائلة أو شروط مادية أو قيود مالية.",
      termsLabel1: "1. شروط وقواعد الاستخدام:",
      termsDesc1: "باستخدامك لمنصة imgdkora وتعديل صورك عليها، فإنك تقر وتوافق صراحة على كافة البنود وبنود العمل المذكورة هنا دون أي تحفظ قانوني طوعاً.",
      termsLabel2: "2. حدود ومسؤولية البكسل والمحتوى:",
      termsDesc2: "يحظر تماماً استخدام الأداة لمعالجة أو ضغط صور تحمل انتهاكات للقوانين الإنسانية والآداب والتشريعات العامة، أو صور تنتهك الملكية الفكرية لطرف ثالث بشكل غير مرخص. يقع عاتق ومسؤولية قانونية الصور بالكامل على عاتق المستخدم المباشر.",
      termsLabel3: "3. حدود الضمان الفني والمسؤولية:",
      termsDesc3: "معالجة الصور وتفريغ الحواف لونيًا تجري بقوة معالج جهازك (Client-Side). ولذلك تخلي المنصة مسؤوليتها الكاملة عن أي بطء أو تجميد في متصفحك إذا كانت موارد جهازك ضعيفة مقارنة بحجم الملفات المستهدفة.",
      termsLabel4: "4. الدعم التقني والتواصل:",
      termsDesc4: "جميع خدماتنا مجانية ومفتوحة المصدر للمجتمع الرقمي. إذا واجهت أي مشاكل أو رغبت في التعاون، يمكنك دائماً التواصل مع الدعم التقني عبر البريد الإلكتروني المعتمد للمشروع (essamelmansy67@gmail.com).",
      copyright: "imgdkora هو مشروع عربي ريادي مخصص لمعالجة الصور محلياً بالكامل. جميع شاشات وخدمات هذا التطبيق مفتوحة المصدر وقانونية للقبول في جوجل أدسنس ٢٠٢٦."
    },
    svgConverter: {
      title: "محول الصور النقطية إلى متجهات (SVG Vector)",
      subtitle: "حوّل صور PNG و JPG إلى رسومات متجهة SVG عالية الدقة وقابلة للتكبير دون بكسلة مجاناً ومحلياً 100٪",
      metaTitle: "أداة imgdkora | محول الصور النقطية إلى متجهات SVG مجاناً",
      metaDesc: "حوّل صور PNG و JPG إلى ملفات متجهة SVG قابلة للتكبير لا متناهياً ومجاناً بالكامل. أداة آمنة تعمل 100٪ بمتصفحك بدون الحاجة إلى رفع صورك على سيرفر.",
      dropzoneTitle: "اسحب صورتك النقطية هنا أو اضغط للاختيار",
      dropzoneSubtitle: "يدعم PNG، JPG، JPEG، WebP، BMP (بحد أقصى 10MB)",
      dropzoneBtn: "اختر صورة للتحويل",
      btnConvert: "تحويل إلى رسم متجه (SVG)",
      btnConverting: "جاري المعالجة وتتبع المنحنيات...",
      originalLabel: "الصورة الأصلية النقطية (Raster)",
      resultLabel: "الرسم المتجه الناتج (Scalable SVG)",
      btnDownload: "تحميل ملف SVG الناتج",
      controlColors: "عدد الألوان المستهدفة",
      controlBlur: "تنعيم ما قبل التتبع (تقليل الضوضاء)",
      controlPrecision: "دقة تتبع المنحنيات (تنعيم الخطوط)",
      controlOmit: "تجاهل التفاصيل الصغيرة جداً (بكسل)",
      infoTitle: "كيف يعمل محول المتجهات المحلي؟",
      infoDesc: "تستخدم الأداة خوارزمية تتبع متقدمة (Tracing & Vectorization) لفرز الألوان وبناء منحنيات بيزير تفاعلية وتوليد مسارات SVG دقيقة دون إرسال بياناتك لخادم خارجي.",
      infoNote: "ملاحظة: للحصول على أفضل النتائج، يفضل استخدام صور شعارات (Logos)، رسم خطي، أيقونات مسطحة، أو لقطات شاشة نصية واضحة.",
      unsupportedFile: "صيغة الملف غير مدعومة. يرجى اختيار ملف صورة صالح مثل PNG أو JPG.",
      sizeLabel: "الحجم المعالج: ",
      pathsLabel: "عدد مسارات الرسم: "
    }
  },
  en: {
    meta: {
      titleAr: "ضاغط ومصغر الصور الذكي | imgdkora",
      titleEn: "Smart Image Compressor & Resizer | imgdkora",
      descAr: "اضغط حجم الصور وغير مقاساتها وأبعادها محلياً وبأمان 100٪ بدون رفع ملفات خارج المتصفح.",
      descEn: "Compress and resize images locally and securely 100% inside your browser."
    },
    header: {
      logoSuffix: "v2.2",
      badge: "Professional Processing 📸",
      subtitle: "Free tool for secure local image compression and resizing",
      langButton: "العربية 🇸🇦/🇬🇧",
      muteTitle: "Mute Sound Effects",
      unmuteTitle: "Enable Sound Effects",
      themeTitle: "Toggle Dark/Light Mode",
    },
    hero: {
      headlinePrefix: "Convert Your Digital Images into",
      headlineHighlight: "Lightweight Masterpieces.",
      subtitle: "Compress images down to unbelievably small sizes and customize dimensions with 100% absolute privacy. Not a single byte ever leaves your browser!",
    },
    tabs: {
      compress: "Compression & Resizing",
      background: "Compression & Resizing",
      enhance: "Compression & Resizing",
      watermark: "Compression & Resizing",
    },
    dropzone: {
      title: "Import Your Images for Full Local Processing",
      subtitle: "Drag and drop your image file here to start editing for free!",
      formats: "Supports all standard formats: PNG, JPG, WebP, and more. Your files are processed entirely inside your browser cache. Secure, fast, and no server uploads.",
      btn: "Browse Images & Select File",
    },
    infoBanner: {
      badge: "Performance & Quality",
      title: "Why Local Client-Side Compression & Resizing Matters",
      desc: "Modern portals require blazing fast performance. By using local on-device resizing:",
      point1: "Your latency drops to absolute zero since the client computes everything.",
      point2: "Instantly reduce bandwidth usage without losing visible visual fidelity.",
      point3: "Auto WebP generation lowers file sizes up to 80% with ease.",
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
      privacyTitle: "Data Confidentiality, Safety & Privacy Policy (AdSense Compliant)",
      termsTitle: "Terms of Service & Free Use Policy Agreement",
      privacyBtn: "Security & Privacy Policy",
      termsBtn: "Terms Of Service Agreement",
      aboutTitle: "About Us - Our Mission & Vision",
      aboutBtn: "About Us",
      aboutHeaderBadge: "About imgdkora Local Smart Engine",
      aboutHeaderBadgeDesc: "We are an independent web tool platform focused on providing world-class, high-speed, local browser-based image compression and background removal tools with total privacy protection.",
      contactTitle: "Contact Us - Technical Support",
      contactBtn: "Contact Us",
      contactHeaderBadge: "We would love to hear your feedback & inquiries",
      contactHeaderBadgeDesc: "If you have any technical questions, optimization feedback, or bugs to report, please reach out to us at our professional support inbox (essamelmansy67@gmail.com).",
      disclaimerTitle: "Legal Disclaimer & Liability Limits",
      disclaimerBtn: "Disclaimer",
      disclaimerHeaderBadge: "Technical & Legal Limitations of Liability",
      disclaimerHeaderBadgeDesc: "Our on-device client-side services and image extraction frameworks are provided for free as-is, without implicit guarantees on outdated devices or heavy workload operations.",
      closeBtn: "Close Window",
      acceptBtn: "I Understand & Accept",
      privacyHeaderBadge: "100% Secure Local Processing & AdSense Compliant",
      privacyHeaderBadgeDesc: "We guarantee that none of your photos are ever uploaded, processed, or saved on external servers. All operations—including compression, pixel alterations, and watermark compositions—take place directly in your device's browser memory (Client-side).",
      privacyLabel1: "1. Handling of Personal Information:",
      privacyDesc1: "imgdkora does not request, solicit, collect, or store any personal data, analytical profiles, addresses, or user tracking cookies. We are entirely cookie-free for native features.",
      privacyLabel2: "2. Cookies and Google AdSense Advertising Disclosures:",
      privacyDesc2: "We partner with third-party advertising companies such as Google AdSense to serve programmatic ads when you visit our website. These companies may use tracking cookies (such as the DART cookie) to serve ads based on your prior visits to this and other websites across the web. You can opt out of personalized ad tracking by visiting the Google Ads Settings page or tools hosted at aboutads.info.",
      privacyLabel3: "3. Local Storage Browser Cache Usage:",
      privacyDesc3: "We call the LocalStorage API only to securely track static configuration choices (dark mode, sound state) across consecutive sessions for a seamless user experience.",
      privacyLabel4: "4. Policy Adjustments & Compliance Standards:",
      privacyDesc4: "We update our safety policy occasionally to align with modern native sandbox standard upgrades (including GDPR and Google Publisher Policies). Continued use of this app signifies your acceptance.",
      termsHeaderBadge: "Creative Commons Zero License (CC0)",
      termsHeaderBadgeDesc: "You are granted a perpetual, worldwide, non-exclusive license to use any asset generated or processed with imgdkora for both personal and commercial distribution (YouTube, online shops, Facebook Ads, newsletters) with zero fees.",
      termsLabel1: "1. Acceptance of Terms:",
      termsDesc1: "By utilizing the imgdkora platform, you willingly consent to our operational conditions and usage rules described in this document.",
      termsLabel2: "2. Responsibility for Assets:",
      termsDesc2: "It is strictly forbidden to use this tool to formulate, adapt, or process media content that violates local regulations, holds offensive content, or infringes intellectual rights. The client is solely liable for their input file.",
      termsLabel3: "3. Service Provisioning Limit:",
      termsDesc3: "The tool is offered 'as is' without warranty of performance coefficients on ancient or resource-depleted browser environments when converting huge 4K file formats.",
      termsLabel4: "4. Constant Code Advancements:",
      termsDesc4: "Our team operates out of pure passion for open source. We constantly revise our image processing matrices and appreciate any feature feedback or layout ideas via contact support (essamelmansy67@gmail.com).",
      copyright: "imgdkora is a privacy-first open-source web compiler. All core templates and pages are fully prepared and compliant for Google AdSense program acceptance in 2026."
    },
    svgConverter: {
      title: "Raster Image to Vector (SVG) Converter",
      subtitle: "Convert PNG and JPG images to scalable SVG vector graphics without pixelation, fully local & 100% free",
      metaTitle: "imgdkora Tool | Free Online JPG & PNG to SVG Vector Converter",
      metaDesc: "Convert raster images like PNG, JPG, and WebP into high-quality scalable vector graphics SVG. Secure client-side processing, no images ever uploaded to a server.",
      dropzoneTitle: "Drag your raster image here or click to choose",
      dropzoneSubtitle: "Supports PNG, JPG, JPEG, WebP, BMP (Max 10MB)",
      dropzoneBtn: "Select Image to Vectorize",
      btnConvert: "Trace Image to Vector (SVG)",
      btnConverting: "Tracing lines & vectorizing...",
      originalLabel: "Original Raster Image",
      resultLabel: "Generated Vector Result (SVG)",
      btnDownload: "Download Generated SVG File",
      controlColors: "Target Color Count",
      controlBlur: "Pre-processing Noise Filter (Blur)",
      controlPrecision: "Trace Line Smoothing",
      controlOmit: "Omit Speckle Noise (px)",
      infoTitle: "How does the local SVG vectorizer work?",
      infoDesc: "The tool runs a fast and precise client-side tracing. It quantizes image colors, tracks edge boundaries, and synthesizes smooth Bézier curve paths perfectly inside your browser memory.",
      infoNote: "Note: For stellar vectorization results, prefer using clean high-contrast flat logos, monograms, outlines, line drawings, or text captures.",
      unsupportedFile: "Unsupported file format. Please choose a valid image file like PNG or JPG.",
      sizeLabel: "Processed Size: ",
      pathsLabel: "Created Vector Paths: "
    }
  }
};
