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
    image: "/1787237745892.png" // using existing high-quality image asset
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
