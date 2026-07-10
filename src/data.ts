import { Product, GuideItem } from "./types";

export const PRODUCTS_DATA: Product[] = [
  {
    id: "prod-nike-pegasus",
    titleAr: "حذاء الجري نايكي إير زوم بيجاسوس الاحترافي",
    titleEn: "Nike Air Zoom Pegasus Professional Running Shoes",
    category: "shoes",
    subCategoryAr: "أحذية جري وماراثون",
    subCategoryEn: "Running & Marathon Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "انطلق بأقصى طاقتك مع حذاء الجري الأسطوري من نايكي. يتميز بنظام توجيه ديناميكي للقدم ووسادة غازية متطورة لتأمين هبوط ناعم وارتداد فائق القوة مع كل خطوة على مضمار الجري أو الإسفلت.",
    descriptionEn: "Experience ultimate responsive speed with Nike's legendary runner. Featuring a dynamic midfoot lockdown system and React foam paired with dual Zoom Air units for a springy, cushioned ride.",
    rating: 4.8,
    reviewsCount: 1240,
    featuresAr: [
      "وسائد Zoom Air مزدوجة لامتصاص الصدمات وارتداد مرن للغاية",
      "نسيج شبكي علوي مطور بنظام التهوية الذكية لمنع تعرق القدمين",
      "نعل سفلي مطاطي بتصميم وافل لمنع الانزلاق وتأمين ثبات تام",
      "هيكل خفيف الوزن يقلل الإجهاد أثناء المسافات الطويلة والماراثونات"
    ],
    featuresEn: [
      "Dual Zoom Air units deliver maximum cushioning and energetic response",
      "Engineered mesh upper offers strategic breathability and snug support",
      "Waffle-inspired rubber outsole provides outstanding multi-surface traction",
      "Lightweight build designed to reduce fatigue over long-distance runs"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Nike+Air+Zoom+Pegasus+Running+Shoes&tag=sportzoneaff-20",
    badgeAr: "الأكثر مبيعاً",
    badgeEn: "Best Seller",
    tagsAr: ["نايكي", "حذاء جري", "وسادة هوائية", "خفيف الوزن"],
    tagsEn: ["Nike", "Running", "Air Cushion", "Lightweight"],
    bestUseAr: "مثالي للجري اليومي والمسافات الطويلة والماراثونات الاحترافية.",
    bestUseEn: "Best for daily road running, long-distance training, and professional marathons."
  },
  {
    id: "prod-adidas-ultraboost",
    titleAr: "حذاء أديداس ألترا بوست الرياضي فائق المرونة",
    titleEn: "Adidas Ultraboost Light Premium Athletic Shoes",
    category: "shoes",
    subCategoryAr: "أحذية تدريب ولياقة بدنية",
    subCategoryEn: "Training & Fitness Footwear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "الحذاء الرياضي الأكثر راحة على كوكب الأرض. يتميز بتقنية كبسولات الطاقة الارتدادية الأيقونية من أديداس، مما يمنحك شعوراً فريداً بالطيران والراحة المطلقة طوال اليوم، سواء في الجيم أو أثناء المشي والوقوف الطويل.",
    descriptionEn: "Unleash epic energy with the lightest Ultraboost ever made. Built with revolutionary Light BOOST foam cushioning that return massive energy while providing glove-like snug fit for active daily use.",
    rating: 4.9,
    reviewsCount: 2180,
    featuresAr: [
      "نعل أوسط بتقنية BOOST يضم مئات كبسولات الطاقة لامتصاص كامل للضغط",
      "جزء علوي مرن للغاية من نسيج Primeknit المصنوع من مواد مستدامة",
      "نظام ثبات Linear Energy Push مدمج لمنع التواء الكاحل",
      "نعل سفلي مطاطي من شركة Continental الألمانية لثبات خرافي في الأجواء الرطبة والملساء"
    ],
    featuresEn: [
      "Signature full-length BOOST midsole for peerless shock absorption",
      "Continental™ Rubber outsole provides extraordinary grip in wet and dry conditions",
      "Adaptive Primeknit upper wraps the foot in supportive, seam-free comfort",
      "LEP (Linear Energy Push) system enhances stability and midfoot forefoot responsiveness"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Adidas+Ultraboost+Shoes&tag=sportzoneaff-20",
    badgeAr: "الأعلى تقييماً",
    badgeEn: "Top Rated",
    tagsAr: ["أديداس", "مريح جداً", "كبسولات الطاقة", "تدريب يومي"],
    tagsEn: ["Adidas", "Max Comfort", "Boost Energy", "Gym Training"],
    bestUseAr: "الخيار الأول للوقوف الطويل، تدريبات الصالة الرياضية، والمشي اليومي المريح.",
    bestUseEn: "Excellent for prolonged standing, gym fitness, and high-impact daily walks."
  },
  {
    id: "prod-puma-future",
    titleAr: "حذاء كرة القدم بوما فيوتشر الاحترافي للملاعب العشبية",
    titleEn: "Puma Future Match FG/AG Soccer Cleats",
    category: "shoes",
    subCategoryAr: "أحذية كرة قدم",
    subCategoryEn: "Soccer Cleats",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "أطلق العنان لمهاراتك الفنية ومراوغاتك السريعة على خطى كبار نجوم اللعبة. حذاء بوما فيوتشر مصمم بهيكل ذكي يدعم الكاحل بمرونة تامة ويأتي بنقوش ناتئة تمنحك تحكماً خارقاً بالكرة في جميع الظروف الجوية.",
    descriptionEn: "Re-engineered for game-changers, inspired by Neymar Jr. The adaptive FUZIONFIT360 upper combines engineered dual mesh and stretchy knit to support dynamic playmaking with or without laces.",
    rating: 4.7,
    reviewsCount: 840,
    featuresAr: [
      "تقنية شريط الضغط FUZIONFIT+ الذكية التي تتكيف مع شكل قدمك الفردي",
      "بروزات ثلاثية الأبعاد بارزة ومحسنة في مناطق الاتصال الرئيسية للتحكم بالكرة",
      "نظام نعل سفلي تفاعلي خفيف الوزن ومزود ببروزات مصممة للتسارعات والمناورات الحادة",
      "مناسب للعب على الملاعب العشبية الطبيعية والصناعية بدقة متناهية"
    ],
    featuresEn: [
      "FUZIONFIT+ compression band adapts to your foot for a personalized snug lock",
      "Engineered 3D textures in key contact zones optimize ball grip and control",
      "Dynamic Motion System dual-density outsole improves agility, speed and traction",
      "Versatile FG/AG stud configuration perfect for both firm natural grass and artificial turf"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Puma+Future+Soccer+Cleats&tag=sportzoneaff-20",
    badgeAr: "موصى به للمحترفين",
    badgeEn: "Pro Choice",
    tagsAr: ["بوما", "كرة قدم", "ملاعب عشبية", "تحكم بالكرة"],
    tagsEn: ["Puma", "Football", "Soccer Cleats", "Aura Control"],
    bestUseAr: "مصمم لصناع اللعب والمهاجمين الباحثين عن سرعة تغيير الاتجاه والتحكم بالكرة.",
    bestUseEn: "Engineered specifically for playmakers and strikers demanding fast agility."
  },
  {
    id: "prod-ua-charged",
    titleAr: "حذاء التدريب أندير آرمور تشارجد ممتص الصدمات",
    titleEn: "Under Armour Charged Assert Training Sneakers",
    category: "shoes",
    subCategoryAr: "أحذية تدريب وجيم",
    subCategoryEn: "Gym & Crossfit Sneakers",
    image: "https://images.unsplash.com/photo-1460353581641-37baddff0bc2?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "الصلابة تلتقي بالمرونة. يوفر حذاء أندير آرمور حماية ممتازة للكاحل والركبتين أثناء تمارين رفع الأثقال وتدريبات الكارديو عالية الشدة بفضل رغوة Charged المصبوبة حرارياً.",
    descriptionEn: "This shoe is built to help anyone run and train faster. Lightweight mesh delivers complete breathability, while Charged Cushioning® foam helps guard your joints against heavy impacts.",
    rating: 4.6,
    reviewsCount: 1530,
    featuresAr: [
      "نعل أوسط بتقنية Charged Cushioning يمتص صدمات الارتطام ويحولها لقوة دافعة",
      "نسيج شبكي خفيف الوزن وثلاثي الألوان يوفر تنفساً فائقاً وحماية ضد الاحتكاك",
      "فرش داخلي فاخر من إسفنج EVA ميموري فوم يتشكل حسب باطن القدم",
      "نعل خارجي من المطاط الصلب يغطي مناطق الارتطام العالي لزيادة المتانة والوقاية"
    ],
    featuresEn: [
      "Charged Cushioning® midsole utilizes compression molded foam for ultimate responsiveness",
      "Lightweight mesh upper with 3-color digital print delivers complete dry breathability",
      "Full-length EVA sockliner molds directly to the foot, eliminating slippage",
      "Solid rubber outsole covers high impact zones for greater durability with less weight"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Under+Armour+Charged+Assert+Shoes&tag=sportzoneaff-20",
    badgeAr: "الأفضل لتمارين الجيم",
    badgeEn: "Gym Special",
    tagsAr: ["أندير آرمور", "تمارين الجيم", "امتصاص الصدمات", "رفع أثقال"],
    tagsEn: ["Under Armour", "Crossfit", "Charged Cushion", "Gym Workout"],
    bestUseAr: "الخيار الأمثل لتمارين المقاومة، الجري على السير الكهربائي، وحصص الكارديو والكروس فت.",
    bestUseEn: "Best for indoor treadmill work, resistance lifting, HIIT, and functional training classes."
  },
  {
    id: "prod-ua-dryfit-shirt",
    titleAr: "قميص رياضي ضاغط دراي فيت مضاد للتعرق",
    titleEn: "Dry-Fit Performance Compression Sports Shirt",
    category: "apparel",
    subCategoryAr: "ملابس رياضية علوية",
    subCategoryEn: "Athletic Tops",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "حافظ على جفاف جسدك وحرارته المثالية أثناء أصعب التدريبات. قميص رياضي مصنع من خيوط تكنولوجية تمتص العرق وتنقله إلى الطبقة الخارجية ليتبخر بسرعة قصوى، مع نسيج مرن يبرز الكتلة العضلية ويحميها.",
    descriptionEn: "Elevate your training session with high-wicking technical fabric. This compression shirt pulls sweat away from your skin to the outer fabric layer for lightning-fast evaporation, keeping your muscles warm and dry.",
    rating: 4.7,
    reviewsCount: 3410,
    featuresAr: [
      "تقنية دراي فيت المتقدمة لسحب الرطوبة والتعرق بكفاءة مضاعفة",
      "نسيج رباعي الاتجاهات يمنحك حرية الحركة الكاملة دون أي قيود",
      "خياطة مسطحة ملساء تمنع تهيج الجلد أو احتكاك الأكتاف أثناء التمارين المتكررة",
      "تقنية مقاومة الميكروبات تمنع نمو البكتيريا المسببة لروائح العرق الكريهة"
    ],
    featuresEn: [
      "Advanced Dry-Fit tech wicks moisture away rapidly, keeping you fresh",
      "4-way stretch fabrication allows absolute mobility in any athletic direction",
      "Ergonomic flatlock seams minimize chafing and skin irritation during repetitive motions",
      "Anti-odor technology prevents the growth of odor-causing microbes inside active fibers"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Dry-Fit+Men+Compression+Shirt&tag=sportzoneaff-20",
    badgeAr: "مقاوم للتعرق",
    badgeEn: "Sweat Resistant",
    tagsAr: ["دراي فيت", "تيشيرت رياضي", "مضاد للتعرق", "ملابس ضغط"],
    tagsEn: ["Dry-Fit", "Athletic Shirt", "Wicking Fabric", "Compression"],
    bestUseAr: "مثالي للجيم، تدريبات كمال الأجسام، الجري المفتوح، وكرة القدم كطبقة أساسية.",
    bestUseEn: "Perfect for weightlifting, intensive cardios, outdoor cycling, and as a football base layer."
  },
  {
    id: "prod-adidas-tiro-pants",
    titleAr: "بنطال التدريب أديداس تيرو الرياضي الأيقوني",
    titleEn: "Adidas Tiro Training Pants & Joggers",
    category: "apparel",
    subCategoryAr: "بناطيل وبنطلونات رياضية",
    subCategoryEn: "Athletic Pants & Joggers",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "البنطال الرياضي الأكثر شهرة في ملاعب كرة القدم والصالات الرياضية. يتميز بتصميم مدبب يمنحك مظهراً عصرياً جذاباً، مع سحابات عند الكاحل تتيح لك خلعه وارتداءه بسرعة دون الحاجة لخلع حذائك الرياضي.",
    descriptionEn: "Born on the football pitch, now a streetwear staple. These iconic Tiro pants are made with moisture-absorbing AEROREADY technology to keep you dry, featuring classic tapered fit with convenient ankle zips.",
    rating: 4.8,
    reviewsCount: 4120,
    featuresAr: [
      "تكنولوجيا AEROREADY لامتصاص العرق بكفاءة ممتازة والحفاظ على جفاف البدن",
      "جيوب جانبية مدمجة مزودة بسحابات متينة لحفظ الهاتف والبطاقات بأمان أثناء الحركة",
      "تصميم مدبب عصري يلتف بأناقة حول ربلة الساق دون مضايقة الحركة",
      "مصنع بالكامل من بوليستر معاد تدويره عالي الجودة لحماية البيئة وتقليل الانبعاثات"
    ],
    featuresEn: [
      "Adidas AEROREADY fabric absorbs sweat to keep you feeling cool, dry, and collected",
      "Secure side zipper pockets store your phone, keys, and gym cards during rigorous runs",
      "Sleek tapered leg design hugs calves closely without restricting speed or movement",
      "Made with Primegreen high-performance recycled materials to support global sustainability"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Adidas+Tiro+Training+Pants&tag=sportzoneaff-20",
    badgeAr: "الخيار الأيقوني",
    badgeEn: "Iconic Style",
    tagsAr: ["أديداس", "بنطال تدريب", "تيرو", "جيوب بسحاب"],
    tagsEn: ["Adidas", "Tiro", "Track Pants", "Zip Pockets"],
    bestUseAr: "ممتاز لتدريبات الإحماء، رياضة كرة القدم، الجري، والاستخدام اليومي المريح.",
    bestUseEn: "Best for soccer drills, gym warm-ups, outdoor jogging, and sleek athletic leisurewear."
  },
  {
    id: "prod-nike-pro-shorts",
    titleAr: "شورت ضغط نايكي برو الرياضي الداعم للعضلات",
    titleEn: "Nike Pro Combat Men's Compression Shorts",
    category: "apparel",
    subCategoryAr: "شورتات رياضية وضغط",
    subCategoryEn: "Athletic Shorts & Underwear",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "امض قدماً بثقة مطلقة. يوفر شورت الضغط نايكي برو الدعم اللازم لعضلات الفخذ والمؤخرة، مما يقلل الاهتزاز العضلي والإجهاد، ويحميك من الاصابات والاحتكاك أثناء التدريبات الطويلة وعالية الشدة.",
    descriptionEn: "Locked-in comfort and ultimate performance layer. The Nike Pro Shorts are made with stretchy, durable fabric with Dri-FIT sweat-wicking technology to keep you dry and supported from gym to game day.",
    rating: 4.8,
    reviewsCount: 1980,
    featuresAr: [
      "حزام خصر مرن ومسطح وعريض لتثبيت الشورت بقوة دون ضغط مؤلم على البطن",
      "نسيج داعم وضيق يمنح العضلات شعوراً بالتماسك والنشاط ويقلل الاهتزاز",
      "تهوية مستهدفة مدمجة في المناطق الساخنة لزيادة تدفق الهواء وتبريد الجسم",
      "مادة مقاومة للتآكل وخياطة معززة لضمان استمرارية الاستخدام لسنوات"
    ],
    featuresEn: [
      "Stretchy, high-durability fabric with sweat-wicking technology offers supreme supportive feel",
      "Thick, secure elastic waistband holds shorts firmly in place during explosive squats",
      "Mesh lining insert provides optimized airflow in high-heat zones during cardio sessions",
      "Ergonomic flat seam structure protects thigh skin from painful chafing and rashes"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Nike+Pro+Compression+Shorts&tag=sportzoneaff-20",
    badgeAr: "الأكثر طلباً",
    badgeEn: "Highly Wanted",
    tagsAr: ["نايكي برو", "شورت ضغط", "دعم العضلات", "حماية الجلد"],
    tagsEn: ["Nike Pro", "Compression Shorts", "Muscle Support", "Anti-Chafing"],
    bestUseAr: "يرتدى كطبقة أساسية تحت شورت التدريب لتمارين القرفصاء (السكوات)، الجري، والدراجات الهوائية.",
    bestUseEn: "Essential base layer under workout shorts for deep squats, cycling, running, and heavy leg days."
  },
  {
    id: "prod-leather-football",
    titleAr: "كرة قدم جلدية احترافية معتمدة ومقاومة للماء",
    titleEn: "Professional Thermally Bonded Match Football",
    category: "equipment",
    subCategoryAr: "كرات ومعدات الملاعب",
    subCategoryEn: "Match Soccer Balls",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "اختبر دقة التسديد والاستجابة المثالية كما في ملاعب المونديال. كرة قدم مصنوعة من جلد صناعي متميز وبتقنية اللحام الحراري الخالي من الخياطة، مما يضمن طيراناً مستقراً ومقاوماً للرياح والمياه.",
    descriptionEn: "Play with FIFA-quality performance. This premium match ball is constructed with thermally bonded seamless panels to deliver a predictable flight path, better touch, and near-zero water absorption.",
    rating: 4.8,
    reviewsCount: 620,
    featuresAr: [
      "هيكل خارجي ملحوم حرارياً يلغي الفواصل ويمنع امتصاص مياه الأمطار كلياً",
      "نقوش دقيقة ناتئة على السطح الخارجي تمنح الحراس والمهاجمين ملمساً وتحكماً خرافياً",
      "كيس داخلي من مطاط البوتيل عالي الجودة يحفظ الهواء والضغط لأطول فترة ممكنة",
      "مطابقة تماماً للمواصفات الدولية والقياسات الرسمية لكرة القدم (مقاس 5)"
    ],
    featuresEn: [
      "Thermally bonded seamless surface provides a more predictable trajectory and lower water uptake",
      "Engineered micro-textured casing offers superior grip for clinical passing and accurate shooting",
      "High-grade butyl bladder delivers optimal air retention, keeping the ball pumped longer",
      "Meets professional match specifications, regulation weight, size 5 standard"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Professional+Match+Soccer+Ball+Size+5&tag=sportzoneaff-20",
    badgeAr: "مواصفات عالمية",
    badgeEn: "Match Grade",
    tagsAr: ["كرة قدم", "جلد فاخر", "مقاس 5", "ملحومة حرارياً"],
    tagsEn: ["Football", "Match Ball", "Size 5", "Thermal Bonded"],
    bestUseAr: "مثالية للمباريات الاحترافية، تدريبات الأكاديميات، واللعب على العشب الطبيعي والصناعي.",
    bestUseEn: "Best for league match play, professional club drills, and high-level training pitches."
  },
  {
    id: "prod-sports-water-bottle",
    titleAr: "زجاجة مياه رياضية صحية مع مؤشر شرب زمني",
    titleEn: "Leaking-Proof Sports Water Bottle with Time Marker",
    category: "equipment",
    subCategoryAr: "ملحقات رياضية وإكسسوارات",
    subCategoryEn: "Active Hydration & Shakers",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "لا تنس شرب المياه بعد الآن. زجاجة رياضية مبتكرة ومصنوعة من بلاستيك تريتان الصحي الآمن والخالي من مادة BPA، تتميز بمؤشر زمني يشجعك على استهلاك الكمية الكافية من السوائل طوال ساعات تمرينك وجيوب قفل مانعة للتسريب.",
    descriptionEn: "Stay perfectly hydrated and hit your daily water goals. Crafted with premium eco-friendly BPA-free Tritan copolyester, this smart sports bottle features motivational time markers to track your active water intake.",
    rating: 4.7,
    reviewsCount: 2890,
    featuresAr: [
      "مصنوعة بنسبة 100% من مادة Tritan الصديقة للبيئة والآمنة والخالية من السموم وبقايا البلاستيك",
      "غطاء غبار محكم الإغلاق بنقرة زر واحدة مع قفل أمان يمنع أي تسريب للمياه في حقيبتك",
      "مؤشر زمني وعبارات تشجيعية مطبوعة لمراقبة شرب المياه من الصباح حتى المساء",
      "مزودة بمصفاة مدمجة للفواكه ومكعبات الثلج، وحبل يد مريح للحمل السهل"
    ],
    featuresEn: [
      "Made of 100% BPA-free, toxic-free Tritan plastic to ensure completely clean, odorless taste",
      "One-click pop-up lid with secure lock latch guarantees 100% leakproof sealing in bags",
      "Motivational quotes and clear hourly time markers keep you sipping water all day",
      "Features a removable strainer filter for fruit infuser or ice, and a tough carry strap"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Sports+Water+Bottle+BPA+Free+Tritan&tag=sportzoneaff-20",
    badgeAr: "رفيق التمرين الذكي",
    badgeEn: "Hydration Hero",
    tagsAr: ["زجاجة مياه", "خالي من BPA", "مؤشر شرب", "مانع للتسريب"],
    tagsEn: ["Water Bottle", "BPA-Free", "Tritan", "Leak-Proof"],
    bestUseAr: "مناسبة للجيم، رياضة الجري، ركوب الدراجات، التخييم، والمكتب اليومي.",
    bestUseEn: "Best for gym cup holders, outdoor cycling, hiking trips, and office desk hydration."
  },
  {
    id: "prod-gym-gloves",
    titleAr: "قفازات الجيم ورفع الأثقال مبطنة ومقاومة للانزلاق",
    titleEn: "Breathable Gym Workout Gloves with Wrist Support",
    category: "equipment",
    subCategoryAr: "إكسسوارات صالة الجيم",
    subCategoryEn: "Gym Accessories & Straps",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "احم كفيك من الجلد الميت والتصلب أثناء التدريبات الثقيلة. قفازات رفع الأثقال الفاخرة تتميز ببطانة إسفنجية وكسوة مطاطية تمنحك قبضة فولاذية مانعة للانزلاق على البار، مع شريط معصم عريض يحمي المفصل من الالتواء.",
    descriptionEn: "Say goodbye to calluses and wrist injuries. These full-palm protection workout gloves feature dense foam padding and premium silicone grip to secure your hold on dumbbells and barbells, integrated with adjustable elastic wrist wraps.",
    rating: 4.6,
    reviewsCount: 1470,
    featuresAr: [
      "حماية كاملة لراحة الكف مبطنة بطبقات من السيليكون لزيادة قوة الاحتكاك ومنع الانزلاق",
      "دعامة معصم طويلة مدمجة وقابلة للتعديل بإحكام لحماية مفصل اليد أثناء الدفع الثقيل",
      "مصنعة من قماش شبكي خفيف وسريع التهوية يمنع حرارة كف اليد وتراكم العرق",
      "حلقات سحب ذكية على أطراف الأصابع تتيح لك خلع القفاز بسهولة فائقة بعد التمرين"
    ],
    featuresEn: [
      "Full palm protection with thick foam padding and non-slip silicone pattern",
      "Integrated 18-inch adjustable elastic wrist wrap supports joints during heavy bench presses",
      "Back of the hand is made of high-grade breathable mesh fabric to prevent sweat buildup",
      "Smart pull-tabs on the middle and ring fingers allow effortless glove removal"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Gym+Workout+Gloves+Wrist+Support&tag=sportzoneaff-20",
    badgeAr: "حماية كاملة للكفين",
    badgeEn: "Heavy Grip",
    tagsAr: ["قفازات جيم", "دعم المعصم", "رفع أثقال", "مقاوم للانزلاق"],
    tagsEn: ["Gym Gloves", "Wrist Wrap", "Weightlifting", "Silicone Grip"],
    bestUseAr: "الخيار الذهبي لتمارين العقلة، رفع الأثقال الباربل والدامبل، وتمارين الكاليسثينكس.",
    bestUseEn: "Excellent for pull-ups, barbell deadlifts, heavy dumbell curls, and calisthenics training."
  },
  {
    id: "prod-jump-rope",
    titleAr: "حبل قفز سريع لتمارين الكارديو واللياقة البدنية",
    titleEn: "Speed Jump Rope with Ball Bearings for Cardio Workout",
    category: "equipment",
    subCategoryAr: "أدوات كارديو منزلية",
    subCategoryEn: "Home Cardio Tools",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "احرق السعرات الحرارية بأقصى سرعة وطور رشاقتك المنزلية. حبل قفز عالي السرعة مزود برولمان بلي معدني ذكي يمنع تشابك السلك والتفافه، ومصمم بمقبض مريح مانع للتعرق وقابل لتعديل الطول ليناسب جميع الأطوال.",
    descriptionEn: "Incinerate calories and boost foot speed anywhere. This high-speed jump rope features an advanced 360-degree ball bearing system to guarantee a smooth, tangle-free rotation, complete with adjustable steel cable.",
    rating: 4.7,
    reviewsCount: 3200,
    featuresAr: [
      "رولمان بلي فولاذي مدمج يضمن دوراناً سريعاً وسلساً بزاوية 360 درجة دون تشابك",
      "سلك فولاذي مغلف بمادة PVC المقاومة للتآكل والقطع ليدوم على جميع أنواع الأراضي الصعبة",
      "سهولة التعديل الذاتي للطول من خلال صامولة قفل يدوية لتناسب الكبار والصغار",
      "مقابض إسفنجية خفيفة ومريحة ممتصة لتعرق اليد لمنع الانزلاق والتحكم المريح"
    ],
    featuresEn: [
      "Advanced double ball-bearing system ensures rapid, whisper-quiet 360-degree spin",
      "Tough braided steel wire cable is coated with wear-resistant PVC for longevity on concrete",
      "Fast, tool-free cable adjustments let you resize the length to your height in seconds",
      "Lightweight, anti-slip memory foam handles absorb sweat and reduce palm tension"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Speed+Jump+Rope+with+Ball+Bearings&tag=sportzoneaff-20",
    badgeAr: "مكافح الوزن الزائد",
    badgeEn: "Fat Burner",
    tagsAr: ["حبل قفز", "رولمان بلي", "كارديو منزلي", "حرق دهون"],
    tagsEn: ["Jump Rope", "Ball Bearings", "Cardio Work", "Speed Rope"],
    bestUseAr: "الخيار المثالي لتسخين الملاكمين، تمرين الكروس فت، وحرق السعرات من المنزل.",
    bestUseEn: "Best for boxing warm-ups, CrossFit double-unders, and rapid calorie-burning routines at home."
  },
  {
    id: "prod-resistance-bands",
    titleAr: "مجموعة حبال المقاومة الاحترافية للجيم المنزلي المتكامل",
    titleEn: "Professional 11-Piece Resistance Bands Set for Home Gym",
    category: "equipment",
    subCategoryAr: "أدوات تمرين منزلية",
    subCategoryEn: "Home Resistance Equipment",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80",
    descriptionAr: "اصنع صالة الألعاب الرياضية الخاصة بك في أي مكان. حقيبة تمرين متكاملة تحتوي على 5 أحبال مقاومة من اللاتكس الطبيعي وبألوان مختلفة تمنحك مستويات وزن متفاوتة، كاملة مع مقابض مريحة، وأربطة كاحل، ومرساة للباب.",
    descriptionEn: "Create your own absolute portable home gym. This versatile 11-piece set contains 5 color-coded latex tube resistance bands with progressive tension levels, allowing you to customize resistance and target every muscle group.",
    rating: 4.8,
    reviewsCount: 1850,
    featuresAr: [
      "5 أحبال مقاومة ملونة تمنحك أوزاناً من 10 أرطال إلى 50 رطلاً، بوزن إجمالي 150 رطلاً عند الدمج",
      "مصنوعة من اللاتكس الطبيعي فائق القوة والمقاوم للتمزق والقطع والانكماش",
      "مرساة باب سميكة ومبطنة تتيح لك التثبيت بالباب الآمن دون إحداث أي خدوش بالطلاء",
      "تأتي مع حقيبة تخزين مخملية تسهل حملها معك أثناء السفر والرحلات لتمرين لا ينقطع"
    ],
    featuresEn: [
      "Includes 5 progressive colored tubes offering up to 150 lbs of resistance when combined",
      "Crafted from premium eco-friendly natural latex that is snap-resistant and retains elasticity",
      "Thickly padded door anchor allows secure locking under doors without scratching surfaces",
      "Complete set with cushioned foam handles, neoprene ankle straps, and travel carry bag"
    ],
    amazonUrl: "https://www.amazon.com/s?k=Resistance+Bands+Set+with+Handles+and+Door+Anchor&tag=sportzoneaff-20",
    badgeAr: "جيم منزلي متكامل",
    badgeEn: "Home Gym Special",
    tagsAr: ["أحبال مقاومة", "جيم منزلي", "تمارين منزلية", "لاتكس طبيعي"],
    tagsEn: ["Resistance Bands", "Home Gym", "Full Body Workout", "Natural Latex"],
    bestUseAr: "الحل الذهبي لبناء العضلات، تمرين تمدد اليوجا، العلاج الطبيعي، وشد ترهلات الجسم.",
    bestUseEn: "Best for whole-body muscle toning, physical rehab sessions, pilates stretches, and travel workouts."
  }
];

export const GUIDES_DATA: GuideItem[] = [
  {
    id: "guide-shoes-size",
    titleAr: "كيف تختار مقاس حذائك الرياضي بدقة تمنع آلام المفاصل؟",
    titleEn: "How to Pick the Perfect Sports Shoes Size to Save Your Joints?",
    excerptAr: "دليلك العلمي البسيط لقياس باطن القدم بدقة قبل الشراء عبر الإنترنت واختيار المقاس المناسب لكل نوع رياضة.",
    excerptEn: "Your practical guide to measuring foot dimensions accurately before buying sneakers online for different sports.",
    contentAr: "عند الشراء عبر الإنترنت، تختلف مقاسات العلامات التجارية للأحذية الرياضية بشكل لافت. لا تكتف بالاعتماد على مقاسك المعتاد. لقياس قدمك بدقة:\n\n1. **قم بالقياس مساءً**: تتمدد القدمان طبيعياً بعد الحركة طوال اليوم.\n2. **ارتد جواربك الرياضية**: قم بالقياس وأنت ترتدي الجوارب التي تعتاد اللعب بها.\n3. **اترك مسافة أمان**: يجب أن يكون هناك فراغ يقدر بـ 0.5 سم إلى 1 سم تقريباً بين أطول أصابعك ومقدمة الحذاء للسماح بالتنفس وتجنب الصدمات.\n\nتأكد دائماً من مراجعة جدول مقاسات أمازون المرفق بصفحة الحذاء الرياضي ومطابقته بقياسك بالسنتيمتر لضمان راحة مثالية لمفاصلك وكاحليك.",
    contentEn: "When buying athletic shoes online, fit varies significantly across brands. Never rely blindly on your casual dress shoe size:\n\n1. **Measure in the afternoon**: Your feet expand naturally throughout active day wear.\n2. **Wear your training socks**: Take measurements with active socks on to get real fit dimensions.\n3. **Leave safe toe room**: Always allow roughly 0.5cm to 1cm space between your longest toe and the shoe front to protect your toenails during abrupt stops.\n\nAlways cross-check Amazon's brand sizing charts with your exact centimeter foot length to ensure perfect support and zero blisters.",
    icon: "shoes",
    amazonQueryUrl: "https://www.amazon.com/s?k=Sports+Shoes+Fitting+Accessories&tag=sportzoneaff-20"
  },
  {
    id: "guide-gym-home",
    titleAr: "دليل تجهيز صالة ألعاب رياضية (جيم منزلي) بأقل التكاليف وبأعلى فاعلية",
    titleEn: "How to Build a Budget Home Gym with Maximum Active Efficiency",
    excerptAr: "لا تحتاج لإنفاق آلاف الدولارات لشراء أجهزة ضخمة. اكتشف الأدوات الأساسية التي تصنع بها ناديك الرياضي بالمنزل.",
    excerptEn: "You don't need expensive equipment to build muscle. Discover the key home workout gear to trigger great gains.",
    contentAr: "بناء جيم منزلي بسيط وصحي لا يتطلب مساحات واسعة أو ميزانيات ضخمة. يمكنك محاكاة تمرين كامل للجسم بالاعتماد على الأدوات الذكية التالية:\n\n1. **أحبال المقاومة المطاطية**: توفر مقاومة مستمرة تنافس أوزان الكابلات بالجيم وتصلح لتمرين كافة العضلات.\n2. **حبل القفز السريع**: أفضل أداة لحرق الدهون وتنشيط الدورة الدموية وتوفير تمرين كارديو مكثف بأقل مساحة.\n3. **سجادة يوغا (مات تمرين)**: لتأمين مفاصل الركبتين والظهر أثناء تمارين البطن والضغط وتفادي الآلام الناتجة عن ملامسة الأرض الصلبة.\n\nالاستمرارية والالتزام هما سر النتائج الباهرة، والبدء بأدوات بسيطة يعطيك دافعاً أكبر دون تحمل ديون مالية.",
    contentEn: "Designing a rewarding fitness space at home doesn't require complex commercial gear or deep pockets. You can target all major muscle groups with simple, versatile equipment:\n\n1. **Adjustable Resistance Bands**: Provide progressive tension on eccentric contractions, taking the place of bulky cable machines.\n2. **Speed Cardio Jump Rope**: Inexpensive, high-density calorie burner that elevates cardiovascular health within small indoor layouts.\n3. **Premium Exercise Mat**: Shields your elbows and spine during core work and floor presses from uncomfortable hard tile impacts.\n\nConsistency is the ultimate driver. Starting with space-saving, smart equipment is the safest way to maintain workouts.",
    icon: "equipment",
    amazonQueryUrl: "https://www.amazon.com/s?k=Home+Gym+Fitness+Equipment&tag=sportzoneaff-20"
  }
];
