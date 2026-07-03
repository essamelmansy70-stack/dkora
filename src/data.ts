import { Product, Coupon, Review } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    titleAr: "حذاء كرة القدم نيون برو ٢٠٢٦ الاحترافي",
    titleEn: "Neon Pro 2026 Professional Football Boots",
    category: "shoes",
    priceAmazon: 349,
    originalPrice: 489,
    rating: 4.9,
    reviewsCount: 1840,
    image: "/src/assets/images/dkora_boots_1783049834118.jpg",
    descriptionAr: "انطلق بسرعة فائقة وثبات مطلق على أرضية الملعب مع حذاء نيون برو الرياضي المطور كلياً. صُمم هذا الحذاء خصيصاً للمهاجمين وصناع اللعب الذين يتطلعون للتحكم الكامل بالكرة، بفضل هيكله خفيف الوزن والبروز الديناميكية الممتازة التي تمنع الانزلاق حتى على الأسطح الرطبة.",
    descriptionEn: "Sprint with maximum acceleration and unyielding traction on the pitch with the all-new Neon Pro Football Boots. Specially engineered for forwards and playmaker elites looking for total ball control, featuring an ultra-lightweight chassis and dynamic cleats designed for high stability.",
    amazonUrl: "https://www.amazon.com/s?k=soccer+cleats+neon+green&tag=dkora-21",
    featuresAr: [
      "جزء علوي مرن وخفيف الوزن يمنح إحساساً كأنك حافي القدمين.",
      "بروز (ستادز) مصممة لتوزيع مثالي للضغط على باطن القدم.",
      "مقاوم للماء وسهل التنظيف بعد المباريات الممطرة."
    ],
    featuresEn: [
      "Ultra-thin lightweight upper delivers a barefoot touch feel.",
      "Cleat configuration optimized for balanced pressure distribution.",
      "Water-resistant and extremely easy to wipe clean after rainy games."
    ],
    prosAr: [
      "وزن خفيف جداً يزيد من سرعة الركض.",
      "تحكم ممتاز جداً في توجيه الكرة باللمس المباشر.",
      "مظهر نيون جذاب للغاية يلفت الأنظار في الملعب."
    ],
    prosEn: [
      "Extremely lightweight to boost maximum sprint speeds.",
      "Superior ball touch accuracy due to texture grips.",
      "Vibrant high-contrast neon design that stands out in matches."
    ],
    consAr: [
      "قد يكون ضيقاً قليلاً لأصحاب الأقدام العريضة.",
      "مخصص للملاعب العشبية الطبيعية والصناعية فقط."
    ],
    consEn: [
      "Can feel slightly narrow for very wide-footed players.",
      "Best performance restricted to natural/artificial turf only."
    ],
    specsAr: {
      "العلامة التجارية": "دي كورة سبورتس",
      "المادة العلوية": "جلد صناعي مطور تيك-سكين",
      "الوزن": "١٩٥ جرام (مقاس ٤٢)",
      "الأرضيات المناسبة": "العشب الطبيعي (FG) والصناعي (AG)",
      "نظام الإغلاق": "أربطة متماثلة متطورة"
    },
    specsEn: {
      "Brand": "Dkora Sports",
      "Upper Material": "Tech-Skin Engineered Synthetic",
      "Weight": "195 grams (Size 42)",
      "Ground Types": "Firm Ground (FG) & Artificial Grass (AG)",
      "Closure System": "Advanced Symmetric Lacing"
    },
    couponCode: "DKORA10",
    couponDiscount: "10%",
    isBestSeller: true
  },
  {
    id: "prod-2",
    titleAr: "كرة القدم الذكية فيوتشر جولد المعتمدة",
    titleEn: "Future Gold Smart Match Soccer Ball",
    category: "equipment",
    priceAmazon: 189,
    originalPrice: 249,
    rating: 4.8,
    reviewsCount: 1420,
    image: "/src/assets/images/dkora_ball_1783049846103.jpg",
    descriptionAr: "الكرة الرسمية للمباريات الحاسمة! تتميز بتصميم فيوتشر جولد الأيقوني واللحامات الحرارية السلسة لمنع امتصاص المياه تماماً والحفاظ على مسار طيران مثالي في الهواء. ارتق بمستوى تدريبك ومبارياتك مع كرة صلبة ومستقرة تلبي معايير الفيفا للمحترفين.",
    descriptionEn: "The official ball for championship-level matches! Boasts the iconic Future Gold thermal bonding design that prevents water absorption completely while retaining an aerodynamic, stable flight trajectory. Train and play with absolute consistency and durability meeting FIFA pro standards.",
    amazonUrl: "https://www.amazon.com/s?k=match+soccer+ball+gold&tag=dkora-21",
    featuresAr: [
      "هيكل مخيط بالحرارة بدون غرز خارجية لضمان الدقة الكاملة.",
      "ملمس خارجي محكم يمنح استجابة استثنائية عند التسديد والمراوغة.",
      "كيس داخلي يحتفظ بضغط الهواء لأسابيع طويلة دون الحاجة لإعادة النفخ."
    ],
    featuresEn: [
      "Thermally bonded seamless panels guarantee precision spherical shape.",
      "Micro-textured casing delivers premium control during passes and shots.",
      "Butyl bladder locks air pressure for weeks without frequent inflation."
    ],
    prosAr: [
      "طيران هوائي دقيق ومستقر للغاية بدون اهتزاز عشوائي.",
      "مقاومة ممتازة للتآكل على الأسطح الخشنة والصناعية.",
      "لون ذهبي فاخر يسهل تتبعه بالعين تحت كشافات الملعب."
    ],
    prosEn: [
      "Incredibly true and predictable aerodynamic flight in air.",
      "High abrasion-resistant surface on rough and turf pitches.",
      "Premium gold graphic styling, highly visible under stadium floodlights."
    ],
    consAr: [
      "تأتي مفرغة من الهواء في الشحن وتحتاج لمنفاخ.",
      "قد تبدو صلبة في الأيام الأولى قبل تليينها باللعب."
    ],
    consEn: [
      "Shipped deflated, requires ball pump to inflate before use.",
      "Can feel slightly firm on the first few plays before breaking in."
    ],
    specsAr: {
      "المقاس": "مقاس ٥ القياسي للمباريات الرسمية",
      "المادة": "بولي يوريثان حراري فاخر (TPU)",
      "البناء": "ربط حراري سلس بدون خياطة",
      "الاستخدام": "احترافي / ترفيهي",
      "الاعتماد": "متوافقة مع مواصفات الاتحاد الدولي للعبة"
    },
    specsEn: {
      "Size": "Size 5 (Official Match Standard)",
      "Material": "Premium Thermoplastic Polyurethane (TPU)",
      "Construction": "Seamless Thermal Bonding",
      "Usage": "Professional Matches & Advanced Training",
      "Certification": "Built to FIFA Pro Match Performance Parameters"
    },
    isHotDeal: true
  },
  {
    id: "prod-3",
    titleAr: "قميص النادي الرياضي إيميرالد غلو الأصلي",
    titleEn: "Emerald Glow Premium Athletic Jersey",
    category: "apparel",
    priceAmazon: 129,
    originalPrice: 199,
    rating: 4.7,
    reviewsCount: 935,
    image: "/src/assets/images/dkora_jersey_1783049855916.jpg",
    descriptionAr: "حافظ على برودتك وجفافك التام أثناء الركض والتمارين الشاقة مع قميص إيميرالد غلو الرياضي. صُنع القميص من نسيج مايكروفايبر ذكي طارد للعرق وداعم للتهوية النشطة عبر قنوات هوائية جانبية، ليمنحك مظهراً هجوماً أنيقاً ومريحاً للغاية.",
    descriptionEn: "Stay completely cool, fresh, and dry during intense training or pitch match days. Constructed with advanced micro-weave moisture-wicking technology and side mesh vents for maximum airflow, the Emerald Glow Jersey guarantees pro-athlete performance paired with a sleek modern design.",
    amazonUrl: "https://www.amazon.com/s?k=sports+jersey+emerald+green&tag=dkora-21",
    featuresAr: [
      "تقنية طرد العرق الذكية تسرع عملية التبخر بنسبة ٤٠٪.",
      "خياطة مسطحة لمنع حدوث أي احتكاك أو تهيج للجلد أثناء الركض.",
      "ألياف مرنة تتمدد بأربع اتجاهات لحرية حركة كاملة."
    ],
    featuresEn: [
      "Moisture-wicking fabric accelerates sweat evaporation by 40%.",
      "Flatlock seams prevent skin chafing or friction irritation during runs.",
      "Four-way stretch fibers accommodate aggressive multi-angle movements."
    ],
    prosAr: [
      "ملمس ناعم وخفيف كالريشة على الجسم.",
      "تهوية رائعة جداً في المناطق الأكثر عرضة للتعرق.",
      "ثبات مذهل للألوان عند الغسيل المتكرر."
    ],
    prosEn: [
      "Feather-light feel with silk-smooth skin contact.",
      "Exceptional venting in high-perspiration zones.",
      "Brilliant color fastness, does not fade or shrink in machine washes."
    ],
    consAr: [
      "يتطلب غسيلاً بالماء البارد للمحافظة على ألياف التهوية.",
      "المقاسات تميل إلى التصميم الرياضي الضيق (Slim Fit)."
    ],
    consEn: [
      "Requires cold water washing to preserve active micro-vents.",
      "Tailored in an athletic slim-fit, consider sizing up for comfort."
    ],
    specsAr: {
      "المادة": "١٠٠٪ بوليستر معاد تدويره صديق للبيئة",
      "نوع المقاس": "رياضي ضيق (Athletic Slim)",
      "تقنية التهوية": "دراي-فت للتنفس النشط",
      "الوزن": "١٢٠ جرام فقط",
      "العناية بالمنتج": "غسيل آلي بماء بارد، لا تستخدم المبيضات"
    },
    specsEn: {
      "Material": "100% Recycled Eco-Friendly Polyester",
      "Fit Type": "Athletic Slim Fit",
      "Tech Integration": "Dry-Fit Moisture-Wicking Micro-Vents",
      "Weight": "120 grams",
      "Care Instructions": "Machine wash cold, air dry recommended, no bleach"
    },
    isHotDeal: true
  },
  {
    id: "prod-4",
    titleAr: "ساعة دي كورة الرياضية الذكية للياقة البدنية",
    titleEn: "Dkora Active Smart Fitness Watch",
    category: "equipment",
    priceAmazon: 279,
    originalPrice: 399,
    rating: 4.8,
    reviewsCount: 2210,
    image: "/src/assets/images/dkora_watch_1783049867780.jpg",
    descriptionAr: "شريكك المثالي في تتبع التدريب ومعدلات اللياقة. تتميز ساعة دي كورة الذكية بشاشة أموليد (AMOLED) ساطعة لسهولة قراءة مؤشرات الأداء تحت أشعة الشمس المباشرة، مع مستشعرات متطورة لقياس نبضات القلب ونسبة الأكسجين ومستويات طاقة الجسم طوال اليوم.",
    descriptionEn: "Your absolute coaching partner in monitoring training drills and fitness metrics. Equipped with an ultra-bright AMOLED display for crystal-clear readability under sunlight, alongside accurate sensors tracking real-time heart rate, SpO2 blood oxygen, sleep loops, and muscle stress levels.",
    amazonUrl: "https://www.amazon.com/s?k=sports+smartwatch+fitness+tracker&tag=dkora-21",
    featuresAr: [
      "نظام تحديد مواقع مدمج (GPS) دقيق جداً لتتبع مسارات الركض بدون الهاتف.",
      "مقاومة للماء بعمق يصل إلى ٥٠ متراً (5 ATM) لتتبع السباحة والغوص.",
      "بطارية خارقة تدوم حتى ١٠ أيام من الاستخدام المتواصل بالشحنة الواحدة."
    ],
    featuresEn: [
      "Built-in multi-satellite GPS tracks run paths and speeds independently.",
      "Water-resistant rated up to 50 meters (5 ATM) for swimming analytics.",
      "Extraordinary battery life lasting up to 10 active days per single charge."
    ],
    prosAr: [
      "تطبيق هاتف ممتاز يدعم اللغة العربية بشكل كامل وسلس.",
      "قياس دقيق لخطوات المشي، السعرات، وتنبيه الخمول الدائم.",
      "حزام سيليكون ناعم ومرن للغاية ومقاوم للعرق والروائح."
    ],
    prosEn: [
      "Highly responsive companion app with complete multi-language logs.",
      "Accurate step tracking, dynamic calorie counts, and sedentary alarms.",
      "Soft, hypoallergenic breathable silicone strap built for full-day sport wear."
    ],
    consAr: [
      "لا تدعم الرد على المكالمات الهاتفية مباشرة بصوت المتحدث.",
      "شاحن مغناطيسي خاص بها يجب الحفاظ عليه من الضياع."
    ],
    consEn: [
      "Does not support direct speaker phone calls (notifications only).",
      "Requires proprietary magnetic charging dock included in the box."
    ],
    specsAr: {
      "الشاشة": "أموليد ملونة بحجم ١.٤٣ بوصة",
      "البطارية": "٣٢٠ مللي أمبير (تصل لـ ١٤ يوم وضع خمول)",
      "المستشعرات": "نبضات قلب خماسي، مقياس تسارع، جيروسكوب، الأكسجين",
      "الربط": "بلوتوث ٥.٢ متوافق مع آيفون وأندرويد",
      "الوزن": "٣٨ جرام مع الحزام"
    },
    specsEn: {
      "Display": "1.43\" AMOLED High-Definition Touch Screen",
      "Battery Capacity": "320mAh Lithium-Polymer (up to 14 days standby)",
      "Sensor Grid": "5-way Heart Rate sensor, Accelerometer, Gyrometer, SpO2",
      "Connectivity": "Bluetooth 5.2 (iOS & Android Universal Sync)",
      "Weight": "38 grams (including strap)"
    },
    couponCode: "DKORA10",
    couponDiscount: "10%",
    isBestSeller: true
  },
  {
    id: "prod-5",
    titleAr: "حذاء الجري المتطور كلاود رانر الخفيف",
    titleEn: "CloudRunner Active Lightweight Sneaker",
    category: "shoes",
    priceAmazon: 249,
    originalPrice: 349,
    rating: 4.7,
    reviewsCount: 1120,
    image: "/src/assets/images/dkora_shoes_1783049879198.jpg",
    descriptionAr: "اشعر وكأنك تجري فوق السحاب! يتميز حذاء كلاود رانر بنعل أوسط رغوي فائق الامتصاص يوفر تبطيناً استثنائياً وامتصاصاً كاملاً للصدمات لحماية المفاصل والركب من الإجهاد أثناء الجري لمسافات طويلة على الإسفلت والطرق الوعرة.",
    descriptionEn: "Experience the sensation of running on soft clouds! The CloudRunner features a highly advanced plush foam midsole that returns energy dynamically with every stride, protecting your joints and knees from heavy concrete impact while sustaining incredible speed.",
    amazonUrl: "https://www.amazon.com/s?k=running+shoes+lime+green+black&tag=dkora-21",
    featuresAr: [
      "نعل خارجي مطاطي متين مانع للانزلاق وذو عمر افتراضي طويل جداً.",
      "جزء علوي من القماش الشبكي ثلاثي الأبعاد لتهوية مستمرة وحيوية للأقدام.",
      "تصميم مرن يدعم قوس القدم الطبيعي لمنع آلام الكاحل."
    ],
    featuresEn: [
      "Heavy-duty carbon rubber outsole delivers traction and lifetime endurance.",
      "Engineered 3D mesh upper vents out foot heat instantly to prevent moisture.",
      "Integrated arch support shank promotes natural stride alignment."
    ],
    prosAr: [
      "بطانة لينة للغاية تمنح راحة لا تضاهى طوال اليوم.",
      "مناسب جداً للوقوف الطويل والدوام والنوادي الرياضية.",
      "مرونة قصوى في الانثناء والتمدد مع حركة القدم."
    ],
    prosEn: [
      "Incredibly plush cushioning feels outstanding for all-day wear.",
      "Perfect multipurpose choice for gym, long walks, or heavy standing shifts.",
      "Superior flexibility allowing natural range-of-motion flexing."
    ],
    consAr: [
      "القماش الشبكي العلوي قد يسمح بدخول الماء في الأجواء شديدة المطر.",
      "النعل الرغوي يقل ارتفاعه بشكل بسيط بعد سنة من الاستخدام المكثف."
    ],
    consEn: [
      "Open-mesh top is not waterproof; water can enter during heavy downpours.",
      "The plush foam deck might pack down slightly after 12 months of high mileage."
    ],
    specsAr: {
      "النعل الأوسط": "رغوة كلاود تيك الماصة للصدمات",
      "النعل الخارجي": "مطاط كربوني مضاد للاحتكاك",
      "المادة العلوية": "قماش منسوج معالج ثلاثي الأبعاد",
      "الوزن": "٢٤٠ جرام",
      "الانخفاض (Drop)": "٨ ملم لتوزيع الحمل"
    },
    specsEn: {
      "Midsole Deck": "CloudTech Superfoam Responsive Cushioning",
      "Outsole Grip": "Anti-abrasive carbon rubber",
      "Upper Shell": "Eco-Mesh Engineered Fabric Knit",
      "Weight": "240 grams",
      "Heel-to-Toe Drop": "8mm for balanced footbed pressure"
    },
    couponCode: "SOCCER20",
    couponDiscount: "20%"
  },
  {
    id: "prod-6",
    titleAr: "حقيبة الظهر الرياضية التكتيكية المقاومة للماء",
    titleEn: "Tactical Waterproof Gym Sports Backpack",
    category: "apparel",
    priceAmazon: 159,
    originalPrice: 220,
    rating: 4.8,
    reviewsCount: 810,
    image: "/src/assets/images/dkora_backpack_1783049889869.jpg",
    descriptionAr: "الحقيبة الرياضية المتكاملة لحمل جميع معداتك الرياضية بذكاء ونظام. تحتوي على قسم مخصص وجيد التهوية لفصل الأحذية والملابس المتسخة تماماً، مع قماش معزول تكتيكي يمنع تسرب المياه والأمطار لحماية اللابتوب والمستندات بداخلها.",
    descriptionEn: "The ultimate sports gear carry-all for organized athletes. Featuring a dedicated ventilated base compartment to isolate dirty boots or sweaty clothes, crafted from high-density tactical Oxford fabric that completely repels rain to protect your books, laptop, and valuables.",
    amazonUrl: "https://www.amazon.com/s?k=sports+backpack+shoe+compartment&tag=dkora-21",
    featuresAr: [
      "جيب سفلي منفصل للأحذية مع فتحات تهوية لمنع تكون الروائح.",
      "حشوات مبطنة ومريحة جداً للأكتاف والظهر لتخفيف الثقل عند حملها.",
      "أحزمة جانبية قابلة للتعديل لتثبيت مطرة المياه أو منشفة التمرين."
    ],
    featuresEn: [
      "Isolating bottom shoe compartment features metal air grommets for ventilation.",
      "Ergonomic mesh-padded shoulder straps and back deck reduce strain.",
      "Expandable side pockets secure shaker bottles, tripods, or rolled towels."
    ],
    prosAr: [
      "حجم كبير وسعة تخزينية ممتازة (٣٥ لتر) تناسب النادي والسفر.",
      "خامات صلبة وقوية للغاية ومقاومة للتمزق والخدش.",
      "يحتوي على قسم خاص ومبطن للابتوب حتى مقاس ١٥.٦ بوصة."
    ],
    prosEn: [
      "Generous 35L volume capacity makes it ideal for gym, work, or week travels.",
      "Heavy-duty military-grade Oxford canvas resists scrapes and tears.",
      "Features a fully shock-proof padded laptop slot fitting up to 15.6\" devices."
    ],
    consAr: [
      "تبدو كبيرة الحجم على أصحاب البنية الصغيرة.",
      "السحاب الرئيسي قد يكون قاسياً في البداية لضمان العزل المائي."
    ],
    consEn: [
      "Can look slightly bulky on petite-framed individuals.",
      "The heavy water-seal zippers can feel stiff to open initially."
    ],
    specsAr: {
      "السعة": "٣٥ لتر",
      "القماش الخارجي": "أوكسفورد ٩٠٠ دي المقاوم للمياه والتمزق",
      "الجيوب": "٨ جيوب خارجية وداخلية منظمة",
      "الأبعاد": "٤٨ × ٣٢ × ٢٠ سم",
      "فصل الأحذية": "متاح (حتى مقاس ٤٦)"
    },
    specsEn: {
      "Capacity": "35 Liters",
      "Exterior Fabric": "900D Military-grade Waterproof Oxford",
      "Pocket Grid": "8 compartmentalized internal & external sleeves",
      "Dimensions": "48 x 32 x 20 cm",
      "Shoe Isolation": "Yes (fits cleats up to size 46)"
    },
    couponCode: "DKORA10",
    couponDiscount: "10%"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    authorAr: "عمر الحربي",
    authorEn: "Omar Al-Harbi",
    rating: 5,
    dateAr: "٢٤ مايو ٢٠٢٦",
    dateEn: "May 24, 2026",
    commentAr: "الحذاء نيون برو مذهل جداً في الملعب! خفيف جداً ويساعد على التسديد بقوة. أنصح بشدة بمتابعة التخفيضات هنا والشراء من رابط أمازون، وفرت حوالي ٣٠٪ عن السعر المحلي.",
    commentEn: "The Neon Pro boots are spectacular! Extremely light and help with strike power. Highly recommend checking deals here and buying through Amazon, saved about 30% off local store prices.",
    verified: true
  },
  {
    id: "rev-2",
    authorAr: "سارة القحطاني",
    authorEn: "Sarah Al-Qahtani",
    rating: 5,
    dateAr: "١٢ يونيو ٢٠٢٦",
    dateEn: "June 12, 2026",
    commentAr: "اشتريت الكرة كهدية لزوجي وتفاجأ بجودتها الممتازة! دائرية تماماً وطيرانها في الهواء مستقر بدون اهتزاز، الشحن كان سريعاً من أمازون بفضل رابط التوجيه.",
    commentEn: "Bought the match ball as a gift for my husband and he was blown away by the quality! Perfectly round, flies true in the air, shipping was fast via the Amazon redirect.",
    verified: true
  },
  {
    id: "rev-3",
    authorAr: "فيصل الشمري",
    authorEn: "Faisal Al-Shammari",
    rating: 4,
    dateAr: "٢ يوليو ٢٠٢٦",
    dateEn: "July 2, 2026",
    commentAr: "الساعة ذكية وممتازة جداً في تتبع نبضات القلب والخطوات أثناء لعب كرة القدم والجري. ملمس الحزام مريح جداً ومقاوم للعرق والبطارية ممتازة تدوم معي ٩ أيام بسهولة.",
    commentEn: "The smart fitness watch is super helpful for tracking active heart rates and steps during soccer sessions and morning runs. The strap feels high quality and sweat-resistant.",
    verified: true
  }
];

export const COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "DKORA10",
    discountAr: "خصم إضافي ١٠٪",
    discountEn: "Extra 10% Off",
    expiryAr: "٣١ ديسمبر ٢٠٢٦",
    expiryEn: "Dec 31, 2026",
    descriptionAr: "كوبون عام يطبق على قسم المستلزمات والأحذية الرياضية الموصى بها في المتجر.",
    descriptionEn: "Universal promo coupon applicable to recommended sports gear and sneakers."
  },
  {
    id: "coup-2",
    code: "SOCCER20",
    discountAr: "خصم خاص ٢٠٪",
    discountEn: "Special 20% Off",
    expiryAr: "٣٠ سبتمبر ٢٠٢٦",
    expiryEn: "Sep 30, 2026",
    descriptionAr: "خصم حصري ومحدود لفئة تيشيرتات الأندية والأحذية الرياضية المتطورة.",
    descriptionEn: "Exclusive limited-time discount for football apparel and high-end sneakers."
  }
];
