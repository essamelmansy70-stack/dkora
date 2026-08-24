export interface NewsArticle {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
  category: string;
  authorAr: string;
  authorEn: string;
  image?: string;
}

export interface CalendarEvent {
  id: string;
  time: string;
  currency: string;
  eventAr: string;
  eventEn: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  actual: string;
  forecast: string;
  previous: string;
}

export const initialNewsArticles: NewsArticle[] = [
  {
    id: "news-gold-risk-management",
    titleAr: "دليل الاحتراف: اداره مخاطر فوركس الذهب لعام 2026 وحماية رأس المال",
    titleEn: "Professional Guide: Forex Gold Risk Management in 2026",
    excerptAr: "نظرة عميقة ومفصلة حول أسرار اداره مخاطر فوركس الذهب لحماية محفظتك من تذبذبات الذهب العنيفة باستخدام أهم الصيغ الحسابية والاستراتيجيات الاحترافية لعام 2026.",
    excerptEn: "A comprehensive deep-dive into Forex Gold Risk Management strategies to preserve your capital from high gold price fluctuations.",
    contentAr: `يعتبر الذهب (XAUUSD) بمثابة المغناطيس الأكبر لجميع المتداولين في أسواق المال والعملات الأجنبية. فهو الملاذ الآمن الأكثر شهرة وقوة عبر التاريخ، ولكنه في الوقت نفسه يمثل ساحة تداول شديدة التقلب والخطورة. هنا تبرز الأهمية القصوى لمفهوم اداره مخاطر فوركس الذهب كعنصر حاسم يفصل بين المتداول المحترف والناجح وبين المتداول الهاوي الذي قد يفقد كامل حسابه في حركة سعرية واحدة مفاجئة. في هذا المقال المتكامل والحديث لعام 2026، سنشرح بالتفصيل الممل كيف تبني نظاماً دفاعياً فولاذياً لحماية محفظتك الاستثمارية أثناء تداول الذهب.

طبيعة تحركات الذهب ولماذا يختلف عن العملات؟
للبدء في فهم قواعد اداره مخاطر فوركس الذهب، يجب أولاً إدراك الفروقات الجوهرية بين حركة المعادن الثمينة وحركة العملات التقليدية. يتميز الذهب بـ:
1. الحساسية الجيوسياسية والاقتصادية الفائقة: أي تصريح من الاحتياطي الفيدرالي، أو تصاعد في التوترات العالمية، قد يدفع أسعار الذهب للتحرك بمئات النقاط في دقائق معدودة.
2. الانزلاق السعري وفجوات السوق: يميل الذهب لفتح فجوات سعرية حادة مع بداية التداولات الأسبوعية أو خلال الأخبار الاقتصادية العنيفة.
3. معدل السيولة العالي وتأثير خوارزميات التداول السريع: تتحكم الصناديق الكبرى والذكاء الاصطناعي بنسبة كبيرة من السيولة، مما يسبب حركات تصحيحية كاسحة وسريعة.

الركائز الأساسية لـ اداره مخاطر فوركس الذهب:

أولاً: قاعدة الـ 1% لحماية رأس المال
تعتبر قاعدة الـ 1% بمثابة قانون البقاء الأول في أسواق المال. تنص هذه القاعدة ببساطة على ألا تتجاوز أقصى خسارة محتملة لك في الصفقة الواحدة أكثر من 1% إلى 2% من إجمالي حجم رأس مالك الفعلي. إذا كان حساب تداولك يحتوي على 10,000 دولار، فإن أقصى خسارة مقبولة في صفقة الذهب الواحدة هي 100 دولار فقط. الالتزام الصارم بهذا القانون يضمن لك الاستمرار في السوق حتى لو واجهت سلسلة متتالية من الصفقات الخاسرة.

ثانياً: حساب حجم اللوت (Lot Sizing) بدقة بالغة
تداول الذهب يتطلب دقة مضاعفة في حساب حجم العقد. نظراً لأن قيمة النقطة الواحدة في الذهب تختلف بشكل جذري عن أزواج العملات مثل اليورو دولار، فإن فتح عقد عشوائي دون حساب هو انتحار مالي.
لحساب حجم اللوت الأنسب لصفقتك تذكر المعادلة التالية:
حجم اللوت = (المبلغ المالي المعرض للمخاطرة بالدولار) / (عدد نقاط الوقف × قيمة النقطة للوت القياسي).
باستخدام حاسبة إدارة المخاطر المدمجة في منصة ديكوراFX، يمكنك إدخال حجم حسابك، والنسبة المئوية للمخاطرة، ومستوى الستوب لوز، لتقوم الحاسبة فوراً بتوليد اللوت الأنسب لك لحماية حسابك من التسييل والالتزام بقواعد اداره مخاطر فوركس الذهب.

ثالثاً: وضع أمر وقف الخسارة (Stop Loss) كقرار غير قابل للنقاش
يعتقد بعض المتداولين الهواة أن بإمكانهم مراقبة السوق وإغلاق الصفقات يدوياً، وهو خطأ فادح يؤدي غالباً إلى تسييل الحساب خلال التحركات السريعة للذهب. في سياق اداره مخاطر فوركس الذهب، يجب أن يكون أمر وقف الخسارة محدداً وموضوعاً في المنصة قبل تفعيل الصفقة نفسها.
- ابحث عن مستويات الدعم والمقاومة الفنية القوية لوضع الستوب خلفها بمسافة كافية.
- تجنب وضع الستوب لوز قريباً جداً لمنع ضربه نتيجة للتذبذبات العشوائية السعرية وتوسيع الاسبريد أثناء الأخبار.
- لا تقم أبداً بتحريك الستوب لوز لزيادة الخسارة طمعاً في عودة السعر، بل تقبل الخسارة كجزء طبيعي من اللعبة.

رابعاً: الرافعة المالية - الوحش الصامت
تعتبر الرافعة المالية سلاحاً ذا حدين؛ فهي تتيح لك التداول بأحجام ضخمة بمبلغ صغير، لكنها في تداولات الذهب تمثل مكمن الخطر الأكبر. استخدام رافعة مالية مفرطة مع أصل عالي التقلب مثل الذهب يؤدي لتقليص الهامش المتاح بشكل لحظي. ننصح دائماً بتقنين الرافعة المالية بحدود (1:100) كحد أقصى للتحكم بالتعرض الإجمالي للسوق ونجاح خطط اداره مخاطر فوركس الذهب.

علم نفس التداول والتحكم بالعواطف في إدارة مخاطر الذهب
لا يمكن الحديث عن اداره مخاطر فوركس الذهب دون التطرق للجانب النفسي. الطمع والخوف هما العدوان الأكبر للمتداول.
- الخوف من فوات الفرصة: يدفعك لدخول صفقات الذهب بأسعار غير مناسبة وبلوت مرتفع دون تخطيط.
- الرغبة في الانتقام من السوق: بعد صفقة خاسرة، قد يندفع المتداول لمضاعفة اللوت لاستعادة خسائره، مما يضاعف الكارثة.
الالتزام بخطة تداول مكتوبة ومحددة سلفاً هو الحل الوحيد للتغلب على هذه المشاعر العشوائية وضمان تطبيق قواعد اداره مخاطر فوركس الذهب بنجاح.

خلاصة واستراتيجية عملية مقترحة لعام 2026:
لتحقيق أرباح مستدامة عبر تداول الذهب في عام 2026، ننصحك بالخطوات التالية:
1. لا تدخل أي صفقة ذهب دون تحديد مسبق لنقاط الدخول والخروج والهدف والستوب.
2. استخدم حاسبة إدارة المخاطر في ديكوراFX لتحديد اللوت بدقة متناهية.
3. وزع استثماراتك ولا تركز كامل رأس مالك في تداولات الذهب فقط.
4. واصل التعلم الفني ومتابعة التقارير الفنية والأخبار الاقتصادية اللحظية التي نقدمها لك مجاناً.
تذكر دائماً أن البقاء والاستمرارية في سوق الفوركس هي الهدف الأسمى، والوسيلة الوحيدة لتحقيق ذلك هي الانضباط التام وتطبيق مبادئ اداره مخاطر فوركس الذهب باحترافية وسهولة تامة لضمان الأمان والنمو المستمر لمحفظتك المالية.`,
    contentEn: `Gold (XAUUSD) acts as a powerful magnet for traders in financial markets. Known as a supreme safe haven throughout history, it also behaves as an extremely volatile and high-risk trading asset. This is why Forex Gold Risk Management is the ultimate shield separating professional traders from emotional amateurs. In this comprehensive 2026 guide, we outline the solid rules of preserving your equity while riding gold market waves.

Understanding Gold Volatility (XAUUSD):
To establish a rigid system of Forex Gold Risk Management, you must analyze why gold operates differently from traditional currencies:
- High Geopolitical Sensitivity: Federal Reserve decisions and global events push gold prices hundreds of pips in a matter of seconds.
- Market Gaps & Slippages: Gold has a higher tendency to create price gaps during weekly openings and major data releases.
- Heavy Institutional Algorithm Action: Modern institutional AI systems control gold liquidity, making correction trends deeper.

Core Principles of Forex Gold Risk Management:

1. The 1% Asset Allocation Rule
Never risk more than 1% to 2% of your total account balance on a single gold trade. If your account holds $10,000, your maximum allowed loss per trade must be strictly capped at $100. This ensures longevity under difficult market cycles.

2. Precision Position Sizing (Lot Computation)
Do not open trades randomly. Computing the correct lot size is crucial because gold pip value calculations differ significantly from currency pairs. Use our live interactive risk sizing calculator on DkoraFX to automatically obtain the exact lot size according to your preferred risk criteria.

3. Uncompromised Stop Loss Strategy
Always set a physical Stop Loss order directly in the platform before opening the trade. Never move your stop loss further away to accommodate losses, and avoid putting stops too tight to prevent execution from random spreads.

Summary and Best Practices for 2026:
To secure profitable yields in 2026 gold trading:
- Pre-plan your entry, target, and stop loss.
- Always run calculations using the DkoraFX Risk Calculator.
- Keep your emotions in check, avoiding FOMO and revenge trading.
- Remember, survival is the main goal, and proper Forex Gold Risk Management is the only path to it.`,
    date: "2026-08-23T19:00:00Z",
    category: "commodities",
    authorAr: "عصام المنسي - كبير محللي السلع",
    authorEn: "Essam El-Mansy - Senior Analyst",
    image: "/gold_forex_risk_management_1787538156014.jpg"
  },
  {
    id: "news-1",
    titleAr: "الذهب يستعد لاختبار القمة التاريخية مع زيادة الطلب على الملاذ الآمن",
    titleEn: "Gold Prepares to Retest All-Time Highs on Strong Safe-Haven Inflow",
    excerptAr: "واصلت أسعار الذهب مكاسبها الفنية للأسبوع الثالث على التوالي مستهدفة مستويات الـ 2500 دولار وسط توترات جيوسياسية وخفض الفائدة المتوقع.",
    excerptEn: "Gold prices extended visual gains for the third consecutive week targeting $2,500 psychological levels amid geopolitical tension and rate cut bets.",
    contentAr: "تشير المؤشرات الفنية والشموع اليابانية على الإطار اليومي إلى استمرار الزخم الشرائي القوي لزوج الذهب مقابل الدولار (XAUUSD). مع اختراق مستويات المقاومة الحرجة عند 2450 دولار، يتوقع المحللون الفنيون إعادة اختبار القمة التاريخية بالقرب من 2485 ومن ثم مواصلة الزحف نحو حاجز 2500 دولار الفني الهام. مستويات الدعم الحالية عند 2410 تعتبر صمام أمان لاستمرار هذا الاتجاه الصاعد.",
    contentEn: "Daily technical indicators and candlestick structures reflect extremely strong buy momentum for Gold (XAUUSD). Following a clear breakout of the critical resistance level at $2,450, experts expect retests of the $2,485 historic ceiling and further rallying toward the key psychological level of $2,500. Support at $2,410 remains a strong validation for the bullish trend.",
    date: "2026-08-20T08:00:00Z",
    category: "commodities",
    authorAr: "عصام المنسي - كبير محللي السلع",
    authorEn: "Essam El-Mansy - Senior Analyst",
    image: "/gold_forex_risk_management_1787538156014.jpg"
  },
  {
    id: "news-2",
    titleAr: "مؤشر الدولار الأمريكي يواجه ضغوطاً فنية صعبة قبل تقرير التضخم الأمريكي",
    titleEn: "US Dollar Index Faces Heavy Technical Pressure Ahead of Inflation Report",
    excerptAr: "استقر مؤشر الدولار DXY عند مستويات 103.50 وسط حالة من الترقب والحذر بين أوساط المتداولين، مع بقاء هيكل الأسعار في الاتجاه الهابط.",
    excerptEn: "The US Dollar index (DXY) flattened near 103.50 support under defensive structures, as traders position ahead of the upcoming key CPI report.",
    contentAr: "يقع مؤشر الدولار حالياً في قناة هابطة ضيقة على الفاصل الزمني للأربع ساعات. بقاء المؤشر أسفل مستويات 104.20 يؤكد استمرار سيطرة البائعين على المدى المتوسط. تترقب الأسواق بحذر شديد قراءة مؤشر أسعار المستهلكين (CPI) الأمريكي للحصول على إشارات قاطعة حول حجم وتوقيت خفض أسعار الفائدة القادم من قبل الاحتياطي الفيدرالي.",
    contentEn: "The US Dollar index (DXY) currently resides in a narrow bearish channel on the 4H charts. Keeping prices below 104.20 registers strong seller domination on medium-term charts. Markets anticipate the upcoming US Consumer Price Index (CPI) to provide clear guidance regarding the upcoming Federal Reserve interest rate policy.",
    date: "2026-08-20T06:15:00Z",
    category: "forex",
    authorAr: "ديكورا للتحليل المالي",
    authorEn: "Dkora Financial Research",
    image: ""
  },
  {
    id: "news-3",
    titleAr: "اليورو دولار يتداول في نطاق ضيق مع ترقب تصريحات المركزي الأوروبي",
    titleEn: "EUR/USD range-bound ahead of ECB policy panel comments",
    excerptAr: "حافظ زوج اليورو دولار على تداولاته الإيجابية أعلى مستوى الدعم الأساسي 1.0850 بانتظار تصريحات كريستين لاغارد الهامة.",
    excerptEn: "The EUR/USD major pair defended positive structures above the 1.0850 baseline support while waiting for key speeches by Christine Lagarde.",
    contentAr: "يتحرك الزوج في نطاق عرضي مائل للصعود الطفيف. نجاح الثيران في الحفاظ على الإغلاق اليومي أعلى مستويات 1.0880 يفتح المجال أمام صعود قوي يستهدف حاجز 1.0960 الفني. بينما يمثل كسر الدعم عند 1.0820 تهديداً للسيناريو الصاعد.",
    contentEn: "The major currency pair fluctuated in a horizontal pattern with mild bullish tendencies. Bulls successfully holding the daily close above 1.0880 opens paths for further tests near 1.0960. Conversely, breaking below 1.0820 invalidates this bullish momentum.",
    date: "2026-08-19T14:30:00Z",
    category: "forex",
    authorAr: "فريق تحليل ديكوراFX",
    authorEn: "DkoraFX Research Team",
    image: ""
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-1",
    time: "15:30",
    currency: "USD",
    eventAr: "معدلات الشكاوى من البطالة الأمريكية",
    eventEn: "US Initial Jobless Claims",
    impact: "MEDIUM",
    actual: "220K",
    forecast: "223K",
    previous: "225K"
  },
  {
    id: "cal-2",
    time: "17:00",
    currency: "USD",
    eventAr: "مبيعات المنازل القائمة (شهرياً)",
    eventEn: "US Existing Home Sales (MoM)",
    impact: "LOW",
    actual: "1.3%",
    forecast: "1.0%",
    previous: "-0.5%"
  },
  {
    id: "cal-3",
    time: "02:50",
    currency: "JPY",
    eventAr: "مؤشر أسعار المستهلكين الأساسي في طوكيو (سنوياً)",
    eventEn: "Tokyo Core CPI (YoY)",
    impact: "HIGH",
    actual: "2.2%",
    forecast: "2.1%",
    previous: "1.9%"
  },
  {
    id: "cal-4",
    time: "11:30",
    currency: "GBP",
    eventAr: "مؤشر مديري المشتريات الخدمي (PMI)",
    eventEn: "UK Services PMI",
    impact: "HIGH",
    actual: "52.4",
    forecast: "52.0",
    previous: "51.8"
  },
  {
    id: "cal-5",
    time: "14:45",
    currency: "EUR",
    eventAr: "قرار الفائدة الصادر عن البنك المركزي الأوروبي",
    eventEn: "ECB Interest Rate Decision",
    impact: "HIGH",
    actual: "3.75%",
    forecast: "3.75%",
    previous: "4.00%"
  },
  {
    id: "cal-6",
    time: "16:00",
    currency: "CAD",
    eventAr: "مبيعات التجزئة الأساسية (شهرياً)",
    eventEn: "Canadian Core Retail Sales (MoM)",
    impact: "MEDIUM",
    actual: "-0.2%",
    forecast: "0.1%",
    previous: "0.3%"
  }
];
