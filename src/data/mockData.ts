import {
  Category,
  Brand,
  Product,
  ComparisonItem,
  BuyingGuide,
  Deal,
  Article,
  UserReview
} from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-electric-tools",
    nameAr: "العدد الكهربائية",
    nameEn: "Power Tools",
    slug: "electric-tools",
    icon: "Zap",
    description: "شنيورات بطارية، صوارخ قطعية، مناشير أركت، وروافع كهربائية عالية الاعتمادية.",
    productCount: 42,
    bgGradient: "from-amber-500/20 to-orange-600/10"
  },
  {
    id: "cat-hand-tools",
    nameAr: "العدد اليدوية",
    nameEn: "Hand Tools",
    slug: "hand-tools",
    icon: "Wrench",
    description: "مفاتيح عزم، طقوم لقم، كماشات شاقة، ومطارق احترافية للورش والسيارات.",
    productCount: 38,
    bgGradient: "from-blue-500/20 to-cyan-600/10"
  },
  {
    id: "cat-workshop-equip",
    nameAr: "معدات الورش",
    nameEn: "Workshop Equipment",
    slug: "workshop-equipment",
    icon: "Hammer",
    description: "كمبروسرات هواء، ماكينات لحام إنفرتر، وطاولات عمل ثقيلة للمشروعات الاحترافية.",
    productCount: 29,
    bgGradient: "from-slate-500/20 to-zinc-700/10"
  },
  {
    id: "cat-construction",
    nameAr: "معدات البناء",
    nameEn: "Construction Equipment",
    slug: "construction-equipment",
    icon: "HardHat",
    description: "خلاطات خرسانة، ماكينات قطع السيراميك، وهيلتي تكسير خرسانة شاق.",
    productCount: 24,
    bgGradient: "from-yellow-500/20 to-amber-600/10"
  },
  {
    id: "cat-decor",
    nameAr: "الديكور والتشطيب",
    nameEn: "Decor & Finishing",
    slug: "decor-finishing",
    icon: "Palette",
    description: "بديل الخشب، بديل الرخام، فوم الجدران، وشرائط الإضاءة المخفية العصرية.",
    productCount: 35,
    bgGradient: "from-emerald-500/20 to-teal-600/10"
  },
  {
    id: "cat-lighting",
    nameAr: "الإضاءة والكهرباء",
    nameEn: "Lighting & Electrical",
    slug: "lighting",
    icon: "Lightbulb",
    description: "نجف مودرن، كشافات طوارئ، سبوت لايت ذكي، ومفاتيح كهربائية فاخرة.",
    productCount: 31,
    bgGradient: "from-yellow-400/20 to-orange-500/10"
  },
  {
    id: "cat-doors",
    nameAr: "الأبواب والنوافذ",
    nameEn: "Doors & Windows",
    slug: "doors-windows",
    icon: "DoorClosed",
    description: "أبواب مصفحة ضد السرقة، نوافذ بي في سي عازلة للصوت، ومفصلات هيدروليكية.",
    productCount: 18,
    bgGradient: "from-purple-500/20 to-indigo-600/10"
  },
  {
    id: "cat-locks",
    nameAr: "الأقفال والحماية",
    nameEn: "Locks & Security",
    slug: "locks-security",
    icon: "Lock",
    description: "أقفال أبواب ذكية بالبصمة والواي فاي، أقفال فولاذية شاقة، وأجهزة إنذار.",
    productCount: 22,
    bgGradient: "from-rose-500/20 to-pink-600/10"
  },
  {
    id: "cat-paints",
    nameAr: "الدهانات والمواد",
    nameEn: "Paints & Coating",
    slug: "paints-coating",
    icon: "Paintbrush",
    description: "دهانات مقاومة للرطوبة والعفن، إيبوكسي الأرضيات، وعوازل أسطح احترافية.",
    productCount: 26,
    bgGradient: "from-sky-500/20 to-blue-600/10"
  },
  {
    id: "cat-measuring",
    nameAr: "أدوات القياس",
    nameEn: "Measuring Tools",
    slug: "measuring-tools",
    icon: "Ruler",
    description: "موازين ليزر 3D أخضر، أجهزة قياس المسافات بالليزر، وقدمة ذات ورنية ديجيتال.",
    productCount: 27,
    bgGradient: "from-lime-500/20 to-emerald-600/10"
  },
  {
    id: "cat-garden",
    nameAr: "أدوات الحدائق",
    nameEn: "Garden Tools",
    slug: "garden-tools",
    icon: "Trees",
    description: "جزازات عشب، مضخات غسيل بالضغط العالي، ومقصات أشجار هيدروليكية.",
    productCount: 20,
    bgGradient: "from-emerald-600/20 to-green-700/10"
  },
  {
    id: "cat-automotive",
    nameAr: "أدوات السيارات",
    nameEn: "Automotive Tools",
    slug: "automotive-tools",
    icon: "Car",
    description: "شواحن وبنوك طاقة لبثق البطاريات، كوريك تمساح هيدروليكي، وأجهزة فحص أعطال OBD2.",
    productCount: 25,
    bgGradient: "from-red-500/20 to-orange-600/10"
  }
];

export const BRANDS: Brand[] = [
  { id: "b-bosch", name: "Bosch", country: "ألمانيا", logoText: "BOSCH", description: "الرائد العالمي في حلول العُدد والتقنيات الهندسية." },
  { id: "b-dewalt", name: "DeWalt", country: "أمريكا", logoText: "DEWALT", description: "علامة العُدد الشاقة المفضلة للمقاولين والمشروعات الضخمة." },
  { id: "b-makita", name: "Makita", country: "اليابان", logoText: "MAKITA", description: "الدقة والابتكار الياباني في المحركات والأدوات اللاسلكية." },
  { id: "b-total", name: "Total Tools", country: "الصين", logoText: "TOTAL", description: "أفضل قيمة مقابل السعر للورش والاستخدام المنزلي." },
  { id: "b-ingco", name: "INGCO", country: "الصين", logoText: "INGCO", description: "أدوات احترافية بأسعار منافسة للغاية وانتشار واسع." },
  { id: "b-huepar", name: "Huepar", country: "الصين", logoText: "HUEPAR", description: "المتخصص العالمي الأول في موازين الليزر وأجهزة القياس." },
  { id: "b-yale", name: "Yale", country: "المملكة المتحدة", logoText: "YALE", description: "العلامة الأكثر موثوقية في الأقفال وأنظمة الأمان." }
];

export const PRODUCTS: Product[] = [
  {
    id: "p-dewalt-dcd791d2",
    titleAr: "شنيور بوش/ديوالت 20 فولت كربونات للاسلكي المزدوج Dewalt DCD791D2",
    titleEn: "DeWalt DCD791D2 20V MAX XR Brushless Drill Kit",
    slug: "dewalt-dcd791d2-20v-brushless-drill",
    categoryId: "cat-electric-tools",
    brandId: "b-dewalt",
    brandName: "DeWalt",
    modelNumber: "DCD791D2",
    mainImage: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 342,
    editorScore: 9.8,
    priceAmazon: 8450,
    priceJumia: 8690,
    priceNoon: 8500,
    currency: "EGP",
    amazonUrl: "https://amazon.eg/dp/B0182EEYDE?tag=dkora-21",
    jumiaUrl: "https://jumia.com.eg/dewalt-dcd791d2?aff_id=dkora",
    noonUrl: "https://noon.com/egypt-ar/dewalt-drill-20v?code=dkora",
    isTopPick: true,
    isEditorChoice: true,
    pros: [
      "محرك Brushless بدون فرش كربونية يعطي عمر أطول بـ 57%",
      "إضاءة LED فائقة مع 3 أوضاع سطوع مختلفة لإنارة زوايا العمل الضيقة",
      "وزن خفيف مقارنة بقوة العزم العالية (70 نيوتن متر)",
      "بطاريتان ليتيوم 2.0 أمبير مع شاحن سريع وحقيبة قماشية مقواة"
    ],
    cons: [
      "السعر مرتفع نسبيًا للاستخدام الخفيف المتردد",
      "لا يحتوي على وضع الشاكوش للخرسانة الصلبة (يركز على الحديد والخشب والفك)"
    ],
    targetAudience: "الفنيون المحترفون، أصحاب الورش الاحترافية، وعشاق الأعمال اليدوية المقاولين الذين يبحثون عن اعتمادية قصوى تحرّك المشروعات اليومية.",
    summary: "يعتبر ديوالت DCD791D2 أفضل شنيور بطارية شاق في الأسواق لعام 2026 بفضل محركه الفولاذي المطور وتقنية العزم المزدوجة التي تتيح لك العمل لساعات متواصلة دون سخونة.",
    fullReviewText: "اخضعنا شنيور DeWalt DCD791D2 لاختبارات ميدانية مكثفة شملت ثقب ألواح الخشب الزان بعمق 40 مم وتثبيت مئات البراغي في الهياكل المعدنية. أظهر الشنيور استجابة مذهلة في السرعة الأولى والثانية بفضل صندوق التروس المعدني الكامل. كما تميز بنظام السلاسة الفائقة في الزناد والتحكم بالعزم مع 15 درحة تعديل.",
    specs: [
      { label: "الجهد الكهربائي", value: "20 فولت MAX" },
      { label: "نوع المحرك", value: "Brushless (بدون فحمات)" },
      { label: "أقصى عزم دوران", value: "70 نيوتن.متر" },
      { label: "السرعة بدون حمل", value: "0 - 550 / 0 - 2000 دورة/دقيقة" },
      { label: "ظرف الشنيور", value: "13 مم معدني أوتوماتيك" },
      { label: "سعة البطارية", value: "2.0 أمبير/ساعة (بطاريتان مرفقتان)" },
      { label: "الوزن", value: "1.5 كجم فقط" }
    ],
    competitorIds: ["p-bosch-gsb-180-li"],
    viewsCount: 14200,
    dateAdded: "2026-01-15",
    tags: ["شنيور", "ديوالت", "بطارية", "20V", "أفضل شنيور"]
  },
  {
    id: "p-huepar-s04cg-3d",
    titleAr: "ميزان ليزر 3D أخضر 16 خط Huepar S04CG الديجيتال بالبلوتوث",
    titleEn: "Huepar S04CG 16 Lines 3D Green Floor Laser Level",
    slug: "huepar-s04cg-3d-green-laser-level",
    categoryId: "cat-measuring",
    brandId: "b-huepar",
    brandName: "Huepar",
    modelNumber: "S04CG",
    mainImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 189,
    editorScore: 9.6,
    priceAmazon: 6200,
    priceJumia: 6450,
    priceNoon: 6300,
    currency: "EGP",
    amazonUrl: "https://amazon.eg/dp/B08LGR33X1?tag=dkora-21",
    jumiaUrl: "https://jumia.com.eg/huepar-s04cg?aff_id=dkora",
    noonUrl: "https://noon.com/egypt-ar/huepar-laser-s04cg?code=dkora",
    isTopPick: true,
    isBestValue: true,
    pros: [
      "شاشة LCD تعرض نسبة الشحن وزاوية الميل الحالية بالدرجات",
      "شعاع ليزر أخضر ألماني Osram أسطع بـ 4 أضعاف من الليزر الأحمر",
      "التحكم الكامل عبر تطبيق الهاتف بالبلوتوث أو الريموت كنترول",
      "خط أرضي محاذٍ تمامًا للسيراميك والبورسلين بشعاع متدني جداً"
    ],
    cons: [
      "يحتاج معايرة دقيقة عند السقوط القوي من ارتفاع عالي",
      "الأزرار باللمس قد تحتاج لمنشفة جافة أثناء العمل بغبار المحارة"
    ],
    targetAudience: "مهندسو الديكور والتشطيبات، صناع السيراميك والبورسلين، وفنيو الجبس بورد والألوميتال.",
    summary: "يُعتبر Huepar S04CG الجهاز الثوري الأول المفضل لدى مهندسي الديكور لعام 2026 بفضل شاشة العرض الرقمية وخط البورسلين السفلي الذي يضمن دقة استواء صفر أخطاء.",
    fullReviewText: "يأتي جهاز هيوبار S04CG بـ 4 طارات ليزرية تمنحك 16 خطاً متقاطعاً في جميع الاتجاهات (360 درجة). تم اختباره في الشدات الخشبية وأعمال إستعدال حوائط البورسلين الكبيرة وأظهر دقة قياس تصل إلى ±2 مم لكل 10 متر.",
    specs: [
      { label: "عدد الخطوط", value: "16 خط (4 طارات 360 درجة)" },
      { label: "لون الشعاع", value: "أخضر Osram ألماني عالي السطوع" },
      { label: "دقة الاستواء", value: "±2 مم عند 10 متر" },
      { label: "نطاق الاستواء الذاتي", value: "4 درجات تلقائيًا" },
      { label: "مسافة العمل", value: "25-40 متر (تصل لـ 60 متر مع الملاقط)" },
      { label: "مصدر الطاقة", value: "بطارية ليثيوم قابلة للشحن + شاحن Type-C" },
      { label: "التحكم", value: "تطبيق هاتف + ريموت كنترول + شاشة LCD" }
    ],
    viewsCount: 9800,
    dateAdded: "2026-02-01",
    tags: ["ميزان ليزر", "هيوبار", "أخضر", "تشطيبات", "3D"]
  },
  {
    id: "p-bosch-gws-750",
    titleAr: "صاروخ قطعية وتجليد بوش 4.5 بوصة 750 واط Bosch GWS 750-115",
    titleEn: "Bosch GWS 750-115 Angle Grinder 750W",
    slug: "bosch-gws-750-115-angle-grinder",
    categoryId: "cat-electric-tools",
    brandId: "b-bosch",
    brandName: "Bosch",
    modelNumber: "GWS 750-115",
    mainImage: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 215,
    editorScore: 9.2,
    priceAmazon: 2850,
    priceJumia: 2990,
    priceNoon: 2890,
    currency: "EGP",
    amazonUrl: "https://amazon.eg/dp/B01E2O3K80?tag=dkora-21",
    jumiaUrl: "https://jumia.com.eg/bosch-gws-750?aff_id=dkora",
    noonUrl: "https://noon.com/egypt-ar/bosch-grinder-750w?code=dkora",
    isBestValue: true,
    pros: [
      "مقبض رفيع جداً ومريح للقبضة مع تقليل الاهتزاز أثناء القطع",
      "محرك نحاسي مقوى مقاوم لرايش الحديد وأتربة الرخام",
      "نظام حماية ضد إعادة التشغيل التلقائي بعد انقطاع الكهرباء",
      "تهوية حركية متطورة تمنع ارتفاع درجة الحرارة"
    ],
    cons: [
      "لا يحتوي على منظم سرعات (سرعة واحدة ثابتة 11000 دورة)",
      "المقبض المساعد عادي وليس من نوع Vibration Control"
    ],
    targetAudience: "الحدادون، الفنيون، وورش الصيانة والسباكة التي تحتاج صاروخًا متينًا يدوم لسنوات.",
    summary: "الدبابة الألمانية الشهيرة Bosch GWS 750 تقدم أفضل معادلة قوة وحجم مضغوط لقطع الحديد والسيراميك والرخام دون تلف.",
    fullReviewText: "صاروخ بوش 750 واط هو الاختيار الأكثر مبيعاً في الأسواق العربية. أثبت الجدارة في قطع التيشات والحديد التسليح وتجليد لحامات الصاج دون أن تتراجع سرعة المحرك.",
    specs: [
      { label: "القدرة المقدرة", value: "750 واط" },
      { label: "قطر الأسطوانة", value: "115 مم (4.5 بوصة)" },
      { label: "السرعة بدون حمل", value: "11,000 دورة/دقيقة" },
      { label: "سن مقبض الجلخ", value: "M 14" },
      { label: "الوزن", value: "1.8 كجم" }
    ],
    viewsCount: 11200,
    dateAdded: "2026-01-20",
    tags: ["صاروخ", "بوش", "قطعية", "حدادة", "4.5 بوصة"]
  },
  {
    id: "p-yale-yrm200-smart-lock",
    titleAr: "قفل باب ذكي بالبصمة والواي فاي والكرت Yale YRM200 Smart Lock",
    titleEn: "Yale YRM200 Biometric Smart Digital Door Lock",
    slug: "yale-yrm200-biometric-smart-lock",
    categoryId: "cat-locks",
    brandId: "b-yale",
    brandName: "Yale",
    modelNumber: "YRM200",
    mainImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 96,
    editorScore: 9.7,
    priceAmazon: 12500,
    priceJumia: 12900,
    priceNoon: 12600,
    currency: "EGP",
    amazonUrl: "https://amazon.eg/dp/B09YALE200?tag=dkora-21",
    jumiaUrl: "https://jumia.com.eg/yale-smart-lock?aff_id=dkora",
    noonUrl: "https://noon.com/egypt-ar/yale-yrm200-lock?code=dkora",
    isTopPick: true,
    pros: [
      "5 طرق فتح: بصمة الأصبع، الرقم السري، بطاقة RFID، تطبيق الهاتف، ومفتاح طوارئ",
      "قلب مورتس ثلاثي الألسنة مصنوع من الفولاذ المصلد المقاوم للكسر والقص",
      "إنذار لمحاولات التسلل أو إدخال البصمة الخاطئة عدة مرات",
      "توليد كلمة سر مؤقتة للضيوف والعمال تعمل لمرة واحدة أو لفترة المحددة"
    ],
    cons: [
      "يتطلب فني متخصص للتركيب على الأبواب الخشبية أو المصفحة القديمة",
      "يحتاج بطاريات AA عالية الجودة وتغييرها كل 10 إلى 12 شهرًا"
    ],
    targetAudience: "أصحاب الشقق الحديثة، الفيلات، الشقق الفندقية، والمكاتب الراغبة في حماية قصوى ومظهر عصري.",
    summary: "قفل ييل YRM200 يجمع بين الأمان البريطاني الفولاذي والذكاء الاصطناعي لاستشعار البصمة الحيوية في 0.2 ثانية فقط.",
    fullReviewText: "يعتبر قفل Yale الذكي خيار الحماية الأول منافسة لأحدث أقفال الأبواب الإلكترونية. تم تجربة استجابة حساس البصمة السيراميكي ومقارنته بالرطوبة والغبار، واستطاع الفتح الفوري في كافة الظروف.",
    specs: [
      { label: "وسائل الفتح", value: "بصمة + رمز سر + كارت + تطبيق + مفتاح" },
      { label: "سعة البصمات", value: "100 بصمة أوردة حيوية" },
      { label: "نوع الباب المناسب", value: "أبواب خشبية ومصفحة بسُمك 40-100 مم" },
      { label: "مصدر الطاقة", value: "4 بطاريات قلم AA + منفذ Type-C للطوارئ" },
      { label: "الاتصال", value: "Wi-Fi + Bluetooth عبر تطبيق Yale Access" }
    ],
    viewsCount: 7400,
    dateAdded: "2026-03-01",
    tags: ["قفل ذكي", "بصمة", "ييل", "أمان", "أبواب"]
  },
  {
    id: "p-total-tat10101-compressor",
    titleAr: "كمبروسر هواء توتال 50 لتر 2 حصان سيور Total TAT10101 Air Compressor",
    titleEn: "Total TAT10101 50L 2HP Belt Drive Air Compressor",
    slug: "total-tat10101-50l-air-compressor",
    categoryId: "cat-workshop-equip",
    brandId: "b-total",
    brandName: "Total Tools",
    modelNumber: "TAT10101",
    mainImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 140,
    editorScore: 9.1,
    priceAmazon: 9800,
    priceJumia: 10200,
    priceNoon: 9950,
    currency: "EGP",
    amazonUrl: "https://amazon.eg/dp/B08TOTAL50?tag=dkora-21",
    jumiaUrl: "https://jumia.com.eg/total-air-compressor-50l?aff_id=dkora",
    noonUrl: "https://noon.com/egypt-ar/total-compressor-50l?code=dkora",
    isBestValue: true,
    pros: [
      "خزان فولاذي سعة 50 لتر يستوعب ضغط هواء مستمر لورش الدهان والدباسة",
      "محرك 2 حصان قوي مزود بنظام تبريد بالزيت وعجلتين كبيرتين لنقل أسهل",
      "ساعة قياس ضغط مزدوجة للتحكم بدقة في الخرج",
      "صمام أمان ونظام يفصل التلقائي عند اكتمال الضغط 8 بار"
    ],
    cons: [
      "الصوت مرتفع نسبيًا أثناء الشحن التلقائي (يتطلب مكاناً مخصصاً بالورشة)",
      "يحتاج متابعة مستوى الزيت الدوري وتغييره كل فترة"
    ],
    targetAudience: "ورش النجارة، الدهانات والدوكو، ورش صيانة السيارات، ومحلات التنجيد والتثبيت الهوائي.",
    summary: "كمبروسر توتال 50 لتر يعتبر الاختيار الاقتصادي المتين لأصحاب الورش الراغبين في تشغيل المسدسات والدباسات الهوائية بكفاءة عادية.",
    fullReviewText: "قام فريقنا بتشغيل كمبروسر توتال لمدة 4 ساعات متواصلة في رش دهانات اللاكيه والدوكو، وأظهر استقراراً كبيراً في توفير ضغط هواء ثابت يمنع التسييل أثناء الرش.",
    specs: [
      { label: "سعة الخزان", value: "50 لتر" },
      { label: "قوة المحرك", value: "2.0 حصان (1.5 كيلوواط)" },
      { label: "أقصى ضغط", value: "8 بار (116 PSI)" },
      { label: "معدل تدفق الهواء", value: "198 لتر/دقيقة" },
      { label: "الجهد", value: "220-240 فولت 50 هرتز" }
    ],
    viewsCount: 8100,
    dateAdded: "2026-02-10",
    tags: ["كمبروسر", "توتال", "هواء", "ورش", "دهان"]
  },
  {
    id: "p-jotun-fenomastic-paint",
    titleAr: "دهان جوتن فينومستيك صحي مقاوم للرطوبة والبكتيريا Jotun Fenomastic",
    titleEn: "Jotun Fenomastic Hygiene Anti-Bacterial Interior Paint",
    slug: "jotun-fenomastic-hygiene-interior-paint",
    categoryId: "cat-paints",
    brandId: "b-bosch", // placeholder for paint brand
    brandName: "Jotun",
    modelNumber: "Fenomastic Hygiene",
    mainImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 310,
    editorScore: 9.9,
    priceAmazon: 1850,
    priceJumia: 1900,
    priceNoon: 1870,
    currency: "EGP",
    amazonUrl: "https://amazon.eg/dp/B08JOTUN01?tag=dkora-21",
    jumiaUrl: "https://jumia.com.eg/jotun-fenomastic?aff_id=dkora",
    noonUrl: "https://noon.com/egypt-ar/jotun-paint-hygiene?code=dkora",
    isTopPick: true,
    isEditorChoice: true,
    pros: [
      "قابل للغسيل الشديد وتكرار التنظيف بالماء والصابون دون فقدان اللون أو اللمعان",
      "تقنية مضادة للفطريات والعفن والنعش الحوائطي في المطابخ والحمامات",
      "عديم الرائحة تقريباً وصديق للبيئة مع انبعاثات مركبات عضوية متطايرة شبه معدومة VOC",
      "تغطية فائقة تخفي عيوب المحارة والسيوت مع لمسة حريرية مطفأة راقية"
    ],
    cons: [
      "يحتاج لوجهين أو ثلاثة للحصول على أقصى درجة ثبات للون الحريري",
      "أغلى من الدهانات البلاستيكية التقليدية العادية"
    ],
    targetAudience: "المنازل العصرية، غرف الأطفال، المطابخ، المستشفيات، والمطاعم التي تتطلب نظافة مستمرة وحوائط مقاومة للبقع.",
    summary: "دهان جوتن فينومستيك هو الملك بلا منازع لدهانات الحوائط الداخلية في 2026 بفضل قابليته الغسيل التام ومقاومته للرطوبة والبقع الصعبة.",
    fullReviewText: "تم اختبار جوتن فينومستيك ضد بقع القهوة، الشوكولاتة، وأقلام الألوان. مسحة واحدة بقطعة قماش مبللة أعادت الحائط ناصعاً تماماً دون أي كشط في الطبقة العلوية.",
    specs: [
      { label: "نوع الدهان", value: "أكريليك نقي مائي صحي" },
      { label: "اللمعة", value: "حريري (Silk) / مطفي راقي" },
      { label: "التغطية", value: "10-12 متر مربع / لتر لكل وجه" },
      { label: "الجفاف للوجه الثاني", value: "2 إلى 4 ساعات" },
      { label: "سعة العبوة", value: "9 لتر (جالون) أو 18 لتر" }
    ],
    viewsCount: 13500,
    dateAdded: "2026-01-10",
    tags: ["دهان", "جوتن", "فينومستيك", "مقاوم للرطوبة", "ديكور"]
  }
];

export const COMPARISONS: ComparisonItem[] = [
  {
    id: "comp-dewalt-vs-bosch",
    title: "مقارنة شاملة: شنيور ديوالت DCD791D2 أم بوش GSB 180-LI؟",
    slug: "dewalt-dcd791d2-vs-bosch-gsb-180-li",
    product1Id: "p-dewalt-dcd791d2",
    product2Id: "p-bosch-gws-750", // replacing with compared drill
    winnerId: "p-dewalt-dcd791d2",
    winnerReason: "يتفوق شنيور ديوالت بمحركه الـ Brushless الخالي من الفحمات وعزمه الأقوى (70 نيوتن متر مقابل 54 نيوتن) وإضاءة الـ LED المتطورة.",
    summary: "في هذه المقارنة بين عملاقي العُدد الكهربائية، أثبت ديوالت تفوقه الواضح في التحمل والعمل الشاق المستمر، بينما يبقى بوش خياراً اقتصادياً ممتازاً للورش المتوسطة.",
    featuresComparison: [
      { featureName: "قوة العزم (Torque)", product1Val: "70 نيوتن.متر", product2Val: "54 نيوتن.متر", winner: "p1" },
      { featureName: "نوع المحرك", product1Val: "Brushless (بدون فحمات)", product2Val: "محرك عادي بفرش", winner: "p1" },
      { featureName: "الإضاءة المدمجة", product1Val: "3 أوضاع سطوع LED", product2Val: "إضاءة LED عادية", winner: "p1" },
      { featureName: "القيمة مقابل السعر", product1Val: "جودة احترافية فائقة", product2Val: "سعر اقتصادي منخفض", winner: "p2" },
      { featureName: "الضمان والدعم", product1Val: "3 سنوات ضمان ديوالت", product2Val: "سنة واحدة", winner: "p1" }
    ],
    date: "2026-02-15"
  }
];

export const BUYING_GUIDES: BuyingGuide[] = [
  {
    id: "guide-best-drills-2026",
    title: "دليل الشراء الشامل: أفضل 5 شنيورات بطارية للمحترفين والمنازل لعام 2026",
    slug: "best-cordless-drills-buying-guide-2026",
    categoryId: "cat-electric-tools",
    subtitle: "كيف تختار الشنيور المناسب لاحتياجاتك بدون إهدار المال؟ مقارنة القوة، البطارية، ونوع المحرك.",
    coverImage: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
    updatedDate: "2026-03-10",
    author: "م. أحمد مصطفى - خبير العُدد بالورش",
    readTime: "8 دقائق",
    topProductIds: ["p-dewalt-dcd791d2", "p-bosch-gws-750"],
    introduction: "يعتبر الشنيور اللاسلكي الأداة الأساسية الأولى في أي ورشة أو منزل. مع تطور تقنيات المحركات الكربونية والبطاريات الفولاذية في 2026، أصبح الاختيار يحتاج لمعرفة دقيقة بفروق العزم وسعة البطارية والمحركات الخالية من الفحمات (Brushless).",
    buyingAdvice: [
      "اختر محرك Brushless إذا كنت تستخدم الشنيور يومياً لأكثر من ساعتين لمنع السخونة.",
      "تأكد من وجود بطاريتين في الحقيبة حتى لا يتوقف عملك أثناء شحن البطارية الأولى.",
      "لأعمال الحوائط والخرسانة، ابحث عن شنيور يحتوي على وضع الشاكوش (Hammer Drill).",
      "افحص ظرف الشنيور؛ الظرف المعدني 13 مم هو الأكثر متانة وتماسكاً مع البنط الثقيلة."
    ]
  },
  {
    id: "guide-best-laser-levels-2026",
    title: "أفضل ميزان ليزر 3D أخضر للتشطيبات والسيراميك والجبس بورد",
    slug: "best-green-laser-levels-guide-2026",
    categoryId: "cat-measuring",
    subtitle: "دليل مهندسي الديكور والصنايعية لاختيار ميزان الليزر الدقيق المقاوم للغبار والماء.",
    coverImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    updatedDate: "2026-03-05",
    author: "مهندس الديكور كريم سامي",
    readTime: "6 دقائق",
    topProductIds: ["p-huepar-s04cg-3d"],
    introduction: "تعتمد دقة السيراميك والبورسلين وتركيب الأسقف المعلقة على مدى دقة ميزان الليزر. الشعاع الأخضر أصبح المعيار الذهبي لعام 2026 لسطوعه الشديد حتى في المساحات المفتوحة والشمس.",
    buyingAdvice: [
      "اشترِ ميزان بشعاع أخضر ألماني (Osram) بدلاً من الأحمر لرؤية واضحة بـ 4 أضعاف.",
      "تأكد من وجود خط أرضي سفلي قاطوع إذا كنت تعمل في تركيب سيراميك الأرضيات.",
      "احرص على شراء جهاز بدعم بطاريات ليثيوم قابلة للشحن عبر Type-C لضمان العمل طوال اليوم."
    ]
  }
];

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    productId: "p-dewalt-dcd791d2",
    productTitle: "شنيور ديوالت 20 فولت احترافي + بطاريتين + حقيبة",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
    store: "amazon",
    originalPrice: 9800,
    dealPrice: 8450,
    currency: "EGP",
    discountPercent: 14,
    couponCode: "DKORA10",
    expiresIn: "ينتهي خلال 48 ساعة",
    url: "https://amazon.eg/dp/B0182EEYDE?tag=dkora-21"
  },
  {
    id: "deal-2",
    productId: "p-huepar-s04cg-3d",
    productTitle: "ميزان ليزر 16 خط أخضر Huepar S04CG + شاشة LCD",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    store: "noon",
    originalPrice: 7200,
    dealPrice: 6300,
    currency: "EGP",
    discountPercent: 12,
    couponCode: "DKORANOON",
    expiresIn: "عرض محدد الكمية",
    url: "https://noon.com/egypt-ar/huepar-laser-s04cg?code=dkora"
  },
  {
    id: "deal-3",
    productId: "p-yale-yrm200-smart-lock",
    productTitle: "قفل باب ذكي Yale YRM200 بالبصمة والواي فاي",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    store: "jumia",
    originalPrice: 14500,
    dealPrice: 12500,
    currency: "EGP",
    discountPercent: 13,
    couponCode: "JUMIASECURITY",
    expiresIn: "خصم الجمعة البيضاء",
    url: "https://jumia.com.eg/yale-smart-lock?aff_id=dkora"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-smart-door-lock-review-2026",
    title: "مراجعة شاملة: قفل باب ذكي بنظام تحكم وصول وكهربائي HTB - المواصفات، الطرق والأسعار 2026",
    slug: "smart-door-lock-review-2026",
    category: "الأقفال والحماية",
    readTime: "7 دقائق",
    date: "2026-07-27",
    author: "فريق التحرير الفني - ديكورا Dkora",
    coverImage: "https://i.postimg.cc/5XGp3YbR/image.jpg",
    excerpt: "مراجعة متعمقة ومستقلة لـ قفل باب ذكي بنظام تحكم وصول وكهربائي HTB بالبصمة، الرقم السري، الواي فاي، وتطبيق الموبايل مع المواصفات الفنية ورابط الشراء المباشر عبر أمازون.",
    content: `<div class="article-container space-y-6">
      <p>أصبحت أقفال الأبواب التقليدية والمفاتيح النحاسية شيئاً من الماضي؛ حيث أحدث وجود <strong>قفل باب ذكي بنظام تحكم وصول وكهربائي HTB</strong> متطور ثورة حقيقية في مفهوم الأمان والراحة للمنازل الحديثة، الشقق السكنية، الفنادق، والمكاتب في عام 2026. إذا كنت تبحث عن حماية منزلية قصوى مع الاستغناء التام عن حمل المفاتيح أو القلق من ضياعها، فهذا المقال يقدم لك مراجعة شاملة وتقييماً تفصيلياً لـ <strong>قفل باب ذكي بنظام تحكم وصول وكهربائي HTB</strong> المتاح عبر متجر أمازون.</p>

      <div class="my-6 text-center">
        <a href='https://link.amazon/B0aQFeDdd' target='_blank' rel='nofollow sponsored' class="inline-block hover:opacity-90 transition-opacity">
          <img class="w-full max-w-xl mx-auto rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 object-cover" src='https://i.postimg.cc/5XGp3YbR/image.jpg' alt='قفل باب ذكي بنظام تحكم وصول وكهربائي HTB' referrerpolicy='no-referrer' onError={(e) => { (e.target as HTMLImageElement).src = "https://postimg.cc/5XGp3YbR"; }} />
        </a>
      </div>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">ما هو قفل الباب الذكي ولماذا تحتاجه في 2026؟</h2>
      <p>الـ <strong>قفل باب ذكي</strong> هو جهاز أمان إلكتروني يحل محل مقبض وقفل الباب التقليدي. يتيح لك القفل التحكم الكامل في دخول وخروج الأشخاص إلى منزلك أو مكتبك بمرونة عالية وأمان مشفر. سواء كنت ترغب في فتح الباب بواسطة بصمة أصبعك، أو عن طريق تطبيق الهاتف الذكي أثناء تواجدك خارج المنزل، فإن اقتناء <strong>قفل باب ذكي</strong> يمنحك راحة بال لا مثيل لها.</p>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">1. طرق الفتح المتعددة (5 طرق في قفل واحد)</h2>
      <p>يتميز هذا الـ <strong>قفل باب ذكي</strong> بتوفير 5 وسائل فتح مختلفة لضمان ألا تظل عالقاً خارج المنزل تحت أي ظرف:</p>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li><strong>بصمة الأصبع البيومترية (Fingerprint):</strong> مستشعر بيومتري فائق السرعة يستجيب في أقل من 0.3 ثانية بدقة 99.8%.</li>
        <li><strong>تطبيق الهاتف الذكي (WiFi / Tuya / Smart Life):</strong> فتح وغلق الباب عن بعد عبر الواي فاي ومتابعة سجل الدخول الفوري.</li>
        <li><strong>الرمز السري (Passcode):</strong> لوحة مفاتيح لمسية تدعم خاصية الرمز العشوائي المانع للتلصص (Anti-Peep PIN Code).</li>
        <li><strong>الكروت الذكية (RFID / IC Cards):</strong> كروت مدمجة ومثالية للأطفال وكبار السن لفتح الباب بمجرد التلميس.</li>
        <li><strong>المفتاح الميكانيكي التقليدي:</strong> مفتاحين عاديين مع القفل لحالات الطوارئ القصوى.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">2. الأمان، التشفير، والتنبيهات اللحظية</h2>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li><strong>إنذار السرقة والعبث:</strong> يصدر القفل جرس إنذار مرتفع الصوت مع إرسال إشعار فوري لهاتفك عند محاولة فتح الباب بطريقة خاطئة عدة مرات.</li>
        <li><strong>خاصية القفل الأوتوماتيكي (Auto-Lock):</strong> يغلق الباب تلقائياً بمجرد إغلاقه بعد عدد محدد من الثواني لتجنب نسيان الباب مفتوحاً.</li>
        <li><strong>إعطاء صلاحيات مؤقتة (Temporary Passcode):</strong> إمكانية إنشاء كلمة سر مؤقتة تنتهي بعد وقت محدد للضيوف أو عمال الصيانة.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">3. عمر البطارية ومصدر الطاقة الاضطراري</h2>
      <p>يعمل الـ <strong>قفل باب ذكي</strong> بواسطة 4 بطاريات من نوع AAA، والتي تدوم لفترة تشغيل تصل إلى 10 - 12 شهراً بناءً على معدل الاستخدام اليومي. وفي حالة نفاد البطاريات بالكامل:</p>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li>يحتوي القفل على <strong>منفذ Micro-USB / Type-C خارجي</strong> للطوارئ، مما يمكنك من توصيل باور بانك لتشغيل القفل وفتحه فوراً.</li>
        <li>يُرسل التطبيق إشعارات تحذيرية متكررة قبل أسابيع من نفاد الشحنة كإنذار مبكر لتغيير البطاريات.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">4. الجدول التقني للمواصفات الفنية</h2>
      <div class="overflow-x-auto my-4">
        <table class="w-full text-sm text-right border-collapse border border-slate-300 dark:border-slate-700">
          <thead>
            <tr class="bg-amber-500/20 text-amber-800 dark:text-amber-300">
              <th class="p-3 border border-slate-300 dark:border-slate-700 font-bold">الخاصية</th>
              <th class="p-3 border border-slate-300 dark:border-slate-700 font-bold">المواصفات والتفاصيل</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 border border-slate-300 dark:border-slate-700 font-semibold">اسم المنتج</td>
              <td class="p-3 border border-slate-300 dark:border-slate-700">قفل باب ذكي بالبصمة والرمز والواي فاي (Smart Lock)</td>
            </tr>
            <tr>
              <td class="p-3 border border-slate-300 dark:border-slate-700 font-semibold">مادة التصنيع</td>
              <td class="p-3 border border-slate-300 dark:border-slate-700">سبائك الألومنيوم والفولاذ المقاوم للصدمات والعوامل الجوية</td>
            </tr>
            <tr>
              <td class="p-3 border border-slate-300 dark:border-slate-700 font-semibold">سمك الباب المناسب</td>
              <td class="p-3 border border-slate-300 dark:border-slate-700">من 35 مم إلى 90 مم (مناسب للأبواب الخشبية والحديدية والألوميتال)</td>
            </tr>
            <tr>
              <td class="p-3 border border-slate-300 dark:border-slate-700 font-semibold">سعة المستخدمين</td>
              <td class="p-3 border border-slate-300 dark:border-slate-700">حتى 100 بصمة أصبع + 100 كلمة سر + 100 كارت RFID</td>
            </tr>
            <tr>
              <td class="p-3 border border-slate-300 dark:border-slate-700 font-semibold">الاتصال اللاسلكي</td>
              <td class="p-3 border border-slate-300 dark:border-slate-700">Wi-Fi 2.4GHz / Bluetooth / Tuya Smart / Smart Life App</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">5. المميزات والعيوب الرئيسية</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
          <h3 class="font-bold text-emerald-600 dark:text-emerald-400">الإيجابيات (Pros):</h3>
          <ul class="list-disc list-inside text-xs sm:text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <li>استجابة بصمة فورية ودقيقة جداً.</li>
            <li>تحكم كامل من أي مكان بالكون عبر الواي فاي.</li>
            <li>سهل التركيب والاستبدال للقفل القديم.</li>
            <li>خامات تصنيع قوية وشكل فاخر يعزز مظهر الباب.</li>
          </ul>
        </div>
        <div class="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl space-y-2">
          <h3 class="font-bold text-rose-600 dark:text-rose-400">السلبيات (Cons):</h3>
          <ul class="list-disc list-inside text-xs sm:text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <li>يحتاج بطاريات نوعية ممتازة لمنع التسريب.</li>
            <li>يتطلب شبكة واي فاي 2.4GHz عند الإعداد أول مرة.</li>
          </ul>
        </div>
      </div>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">الخلاصة ورأي فريق التحرير</h2>
      <p>يعتبر هذا الـ <strong>قفل باب ذكي</strong> حلاً مثالياً وعصرياً يجمع بين <strong>الأمان العالي، المتانة، وسهولة الاستخدام</strong>. إذا كنت ترغب في تحويل باب منزلك إلى بوابة ذكية وآمنة تناسب متطلبات عام 2026، فإن شراء هذا القفل يمثل خياراً رائعاً واستثماراً متميزاً في حماية عائلتك وممتلكاتك.</p>

      <p class="font-bold my-3 text-lg">التقييم الشامل: <span class="text-amber-500 font-extrabold">⭐⭐⭐⭐⭐ (4.9 من 5)</span></p>

      <div class="my-8 p-6 text-center bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-4 shadow-xl">
        <h3 class="text-xl font-bold text-amber-600 dark:text-amber-400">احصل على قفل باب ذكي بأفضل سعر على أمازون</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300">يمكنك مراجعة السعر الحالي، الخصومات المتوفرة، وتفاصيل الشحن الفوري عبر الرابط التالي:</p>
        <div>
          <a href="https://link.amazon/B0aQFeDdd" class="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-4 rounded-xl transition-transform transform hover:scale-105 shadow-xl text-base sm:text-lg" target="_blank" rel="nofollow sponsored">
            🛒 اضغط هنا لشراء قفل باب ذكي الآن من أمازون
          </a>
        </div>
        <p class="text-xs text-slate-400 mt-2">
          * إفصاح التسويق بالعمولة (Affiliate Disclosure): بالضغط على رابط الشراء، قد نحصل على عمولة بسيطة من أمازون دون أي تكلفة إضافية عليك.
        </p>
      </div>
    </div>`,
    tags: ["قفل باب ذكي", "أقفال ذكية", "أمازون", "بصمة", "واي فاي", "أمان المنازل", "Smart Lock"]
  },
  {
    id: "art-bosch-small-angle-grinder-review",
    title: "مراجعة شاملة: صاروخ بوش صغير (Bosch Small Angle Grinder)",
    slug: "bosch-small-angle-grinder-review",
    category: "العدد الكهربائية",
    readTime: "6 دقائق",
    date: "2026-03-10",
    author: "فريق التحرير الفني - ديكورا Dkora",
    coverImage: "/bosch_grinder.jpg",
    excerpt: "تُعتبر شركة بوش (Bosch) واحدة من ألمع وأفضل العلامات التجارية العالمية في مجال الأدوات والعدد الكهربائية، وتتمتع أجهزتها بسمعة ممتازة من حيث الاعتمادية، الجودة، والعمر الافتراضي الطويل.",
    content: `<div class="article-container space-y-6">
      <p>تُعتبر شركة <strong>بوش (Bosch)</strong> واحدة من ألمع وأفضل العلامات التجارية العالمية في مجال الأدوات والعدد الكهربائية، وتتمتع أجهزتها بسمعة ممتازة من حيث الاعتمادية، الجودة، والعمر الافتراضي الطويل. إذا كنت تبحث عن <strong>صاروخ بوش صغير</strong> مناسب للأعمال المنزلية أو الورش الاحترافية، فهذه المراجعة ستوضح لك كل ما تحتاج معرفته.</p>

      <div class="my-6 text-center">
        <a href='https://postimg.cc/LqzXq2Gs' target='_blank' rel='noopener noreferrer'><img class="w-full max-w-xl mx-auto rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 object-cover" src='/bosch_grinder.jpg' alt='صاروخ بوش صغير' referrerpolicy='no-referrer' onerror="this.onerror=null;this.src='https://i.postimg.cc/LqzXq2Gs/61Zr-XB5LBk-L-AC-SY300-SX300-QL70-ML2.jpg';" /></a>
      </div>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">1. التصميم والحجم (Design & Ergonomics)</h2>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li><strong>المقاس والأقراص:</strong> يأتي الصاروخ الصغير عادةً متوافقاً مع أقراص بمقاس <strong>4.5 بوصة (115 مم)</strong> أو <strong>5 بوصات (125 مم)</strong>، وهو الحجم المثالي للتحكم الكامل أثناء العمل.</li>
        <li><strong>الوزن وسهولة الاستخدام:</strong> خفيف الوزن وذو هيكل مدمج (Compact Design)، مما يجعله سهل الحمل والعمل به لفترات طويلة دون الشعور بالإجهاد.</li>
        <li><strong>المقبض الجانبي:</strong> يضمن المقبض إمكانية التثبيت بوضعين (يمين/يسار) لتوفير أقصى درجات الثبات والراحة أثناء القطع أو التجليخ.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">2. الأداء والكتلة العضلية (Performance & Power)</h2>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li><strong>قوة المحرك:</strong> يأتي <strong>صاروخ بوش الصغير</strong> بمحركات تتراوح قدرتها غالباً بين <strong>670 واط إلى 900 واط</strong> (بحسب الموديل)، مما يمنحه سرعة دوران عالية (تصل إلى 11,000 دورة في الدقيقة).</li>
        <li><strong>الكفاءة في العمل:</strong> ممتاز لقطع المعادن، السيراميك، الطوب، وإزالة الصدأ أو التجليخ والتشطيب في الأماكن الضيقة التي يصعب الوصول إليها بالتصوارخ الكبيرة.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">3. وسائل الأمان والسلامة (Safety Features)</h2>
      <p>تتميز أجهزة بوش دائماً باهتمامها البالغ بعوامل الأمان:</p>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li><strong>واقي الحماية (Protective Guard):</strong> واقي معدني مقاوم للدوران لمنع تناثر الشرار أو الأجزاء المكسورة تجاه المستخدم.</li>
        <li><strong>مفتاح الأمان (Safety Switch):</strong> يمنع التشغيل المفاجئ للأداة لتجنب الحوادث.</li>
        <li><strong>نظام التبريد المباشر:</strong> يشتمل على فتحات تهوية مصممة خصيصاً لحماية المحرك من الأتربة وتبريده بفعالية عند العمل لفترات طويلة.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">4. مميزات صاروخ بوش الصغير</h2>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li><strong>متانة وجودة تصنيع العالية:</strong> خامات خارجية وقواعد تروس من الألومنيوم المقوى لضمان أطول عمر افتراضي.</li>
        <li><strong>مرونة التحكم:</strong> سهولة تغيير الأقراص بفضل زر قفل المحور (Spindle Lock).</li>
        <li><strong>سهولة التخزين:</strong> لا يشغل مساحة كبيرة في صندوق العدة.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">5. السلبيات أو النقاط الواجب مراعاتها</h2>
      <ul class="list-disc list-inside space-y-2 pr-4">
        <li><strong>غير مخصص للأعمال الثقيلة جداً:</strong> نظراً لكونه <strong>صاروخ بوش صغير</strong>، فهو غير مخصص لقطع الخرسانة السميكة أو الجدران الكبيرة لمسافات طويلة، بل للأعمال المتوسطة والدقيقة.</li>
        <li><strong>السعر:</strong> قد يكون سعره أعلى قليلاً مقارنة بالماركات الاقتصادية الأخرى، لكنه يقدم مقابل ذلك جودة وعمراً أطول بكثير.</li>
      </ul>

      <h2 class="text-xl font-bold text-amber-600 dark:text-amber-400 mt-6 border-b pb-2 border-slate-200 dark:border-slate-800">الخلاصة والتقييم النهائي</h2>
      <p>إذا كنت تبحث عن أداة اعتمادية وقوية تجمع بين <strong>الخفة، الأمان، والأداء الممتاز</strong>، فإن اقتناء <strong>صاروخ بوش صغير</strong> يعد استثماراً ممتازاً للورش والأعمال المنزلية على حد سواء.</p>
      
      <p class="font-bold my-3 text-lg">التقييم العام: <span class="text-amber-500 font-extrabold">⭐⭐⭐⭐⭐ (4.7 من 5)</span></p>

      <div class="my-8 p-6 text-center bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-4">
        <h3 class="text-lg font-bold text-amber-600 dark:text-amber-400">هل تريد الشراء بـ أفضل سعر؟</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300">يمكنك الاطلاع على السعر والخصومات المتاحة حالياً عبر هذا الرابط:</p>
        <div>
          <a href="https://link.amazon/B02lgmCxx" class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg hover:shadow-red-600/30 text-sm sm:text-base" target="_blank" rel="nofollow sponsored">
            شراء صاروخ بوش صغير الآن من أمازون
          </a>
        </div>
      </div>
    </div>`,
    tags: ["بوش", "Bosch", "صاروخ", "صاروخ بوش صغير", "أدوات كهربائية", "أمازون"]
  },
  {
    id: "art-1",
    title: "كيف تختار ماكينة اللحام الإنفرتر المناسبة للورشة المنزلية؟",
    slug: "how-to-choose-inverter-welding-machine",
    category: "معدات الورش",
    readTime: "5 دقائق",
    date: "2026-03-01",
    author: "فريق التحرير الهندي",
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    excerpt: "تعلم أسرار اختيار ماكينات اللحام الإنفرتر الحديثة خفيفة الوزن، والفرق بين تقنية MMA وMIG وحساب أمبير الشغل الحقيقي.",
    content: "ماكينات اللحام الإنفرتر أحدثت ثورة حقيقية في عالم الورش بالمقارنة مع المحولات التقليدية الثقيلة. تتميز بوزنها الخفيف وسحبها المنخفض للكهرباء مع ثبات القوس الكهربائي عند لحام الحديد والصاج...",
    tags: ["لحام", "إنفرتر", "ورشة", "عدد"]
  },
  {
    id: "art-2",
    title: "علاج رطوبة الحوائط وتقشير الدهان قبل النقاشة الجديدة",
    slug: "treat-wall-dampness-and-paint-peeling",
    category: "الدهانات والمواد",
    readTime: "7 دقائق",
    date: "2026-02-24",
    author: "مهندسة التشطيبات مروة زكي",
    coverImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    excerpt: "خطوات هندسية مضمونة لعزل الحوائط من الرطوبة الأرضية والتسريبات واختيار السيلر والعازل الإيبوكسي الصحيح.",
    content: "تعتبر مشكلة تقشير الدهان وظهور النمل الأبيض أو الملح على الجدران من أكبر مشاكل التشطيب. الخطوة الأولى والأساسية هي علاج مصدر التسريب ثم كشط الدهان القديم واستخدام سيلر مائي عازل قبل المحارة أو المعجون...",
    tags: ["رطوبة", "دهانات", "جوتن", "عزل", "ديكور"]
  }
];

export const REVIEWS_SAMPLE: UserReview[] = [
  {
    id: "rev-1",
    productId: "p-dewalt-dcd791d2",
    userName: "الأسطى محمود الجارحي",
    userRole: "صانع أثاث ومقاول ديكور",
    rating: 5,
    date: "2026-03-02",
    title: "أفضل شنيور اشتريته في حياتي المهنية",
    comment: "الشنيور خفيف جداً في الإيد والبطارية بتقعد معايا يومين شغل متواصل في تركيب المطابخ. إضاءة كشاف الليد 3 درجات بتنقذني في شغل الدواليب المظلمة.",
    helpfulCount: 42,
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    productId: "p-huepar-s04cg-3d",
    userName: "مهندس إسلام القاضي",
    userRole: "مهندس مواقع وتأسيس",
    rating: 5,
    date: "2026-02-18",
    title: "دقة متناهية وسهولة في تطبيق البورسلين",
    comment: "الخط السريعي الأخضر واضح جداً حتى في وجود إضاءة الموقع النهارية. شاشة العرض والتحكم بالموبايل بتخليني أظبط الاستواء بنفسي بدون مساعدة.",
    helpfulCount: 29,
    verifiedPurchase: true
  }
];

export const FAQS_DATA = [
  {
    question: "كيف يضمن موقع 'ديكورا' حيادية المراجعات وتوصيات الشراء؟",
    answer: "يقوم فريقنا الهندسي والفني بشراء واختبار الملاحظات والأدوات في ظروف عمل حقيقية داخل الورش والمواقع. نوصي فقط بالمنتجات التي تثبت جدارتها واعتماديتها بغض النظر عن العمولة."
  },
  {
    question: "هل تختلف الأسعار عند الشراء عبر روابط أمازون أو جوميا في موقعكم؟",
    answer: "لا إطلاقاً! تشتري المنتج بنفس السعر الأصلي المعلن في المتاجر (وقد تحصل على خصم إضافي باستخدام كود الخصم الخاص بنا). نحصل فقط على عمولة تسويق بسيطة من المتجر لدعم استمرار مراجعاتنا الميدانية."
  },
  {
    question: "ما الفرق بين المحركات العادية ومحركات Brushless في العدد الكهربائية؟",
    answer: "المحركات الخالية من الفحمات (Brushless) تعتمد على مغناطيس إلكتروني ذكي، مما يلغي الاحتكاك الداخلي، ويقلل حرارة الشنيور، ويوفر في استهلاك البطارية بنسبة تصل إلى 50% مع مضاعفة العمر الافتراضي للجهاز."
  },
  {
    question: "كيف أختار ميزان الليزر المناسب لعملي؟",
    answer: "إذا كان عملك يتركز على السيراميك والبورسلين والأرضيات، فاشترِ ميزان ليزر يحتوي على خط أرضي سفلي (مثل Huepar S04CG). للأسقف المعلقة والكهرباء يكفيك ميزان 3D أو 12 خط بأشعة خضراء عالية السطوع."
  }
];
