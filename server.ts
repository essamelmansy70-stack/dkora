import fs from "fs";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import compression from "compression";
import * as cheerio from "cheerio";
import { CATEGORIES, PRODUCTS, ARTICLES, DEALS, BUYING_GUIDES } from "./src/data/mockData";
import { createProductSlug, createProductUrl, findProductByQueryParam } from "./src/utils/seo";

// Load environment variables
dotenv.config();

// Extremely robust path resolver that works under both ESM development and bundled CJS production,
// regardless of the current working directory (CWD) on Cloud Run
const rootDir = typeof __dirname !== "undefined"
  ? (__dirname.endsWith("dist") ? path.join(__dirname, "..") : __dirname)
  : process.cwd();

const ARTICLES_SEO = [
  {
    slug: "smart-door-lock-review-2026",
    titleAr: "مراجعة شاملة: قفل باب ذكي بنظام تحكم وصول وكهربائي HTB | ديكورا Dkora",
    titleEn: "HTB Smart Door Lock Access Control System Review 2026 | Dkora",
    descAr: "مراجعة متعمقة ومستقلة لـ قفل باب ذكي بنظام تحكم وصول وكهربائي HTB بالبصمة والرمز السري والواي فاي، المواصفات الفنية ورابط الشراء المباشر من أمازون.",
    descEn: "Comprehensive in-depth review of the HTB smart door lock access control electric system covering biometric fingerprint, Wi-Fi remote access, pros, cons, and Amazon buy links."
  },
  {
    slug: "bosch-small-angle-grinder-review",
    titleAr: "مراجعة شاملة: صاروخ بوش صغير (Bosch Small Angle Grinder) | ديكورا Dkora",
    titleEn: "Bosch Small Angle Grinder In-Depth Review | Dkora",
    descAr: "تُعتبر شركة بوش (Bosch) واحدة من ألمع العلامات التجارية في الأدوات والعدد. مراجعة شاملة لصاروخ بوش الصغير، التصميم، الأداء، وسائل الأمان، والأسعار.",
    descEn: "Comprehensive review of the Bosch Small Angle Grinder covering design, power, safety features, pros, cons, and Amazon buy links."
  },
  {
    slug: "marwan-attia-al-ahly-player-contract-renewal-2031-profile-2026",
    titleAr: "مروان عطية لاعب الاهلي: كواليس تجديد العقد حتى 2031، تحصين القلعة الحمراء، وتحليل أداء 'رئة' وسط المارد الأحمر | dkora",
    titleEn: "Marwan Attia Al Ahly Player: Contract Renewal to 2031, Salary Upgrade & Midfield Engine Analysis 2026 | dkora",
    descAr: "تقرير صحفي متكامل ومفصل يتجاوز 800 كلمة يغطي كواليس تجديد عقد مروان عطية لاعب الاهلي، تعديل الفئة المالية، تحصينه بعقد طويل الأجل حتى 2031، وتأثيره التكتيكي كأحد أهم أعمدة خط الوسط في الأهلي ومنتخب مصر.",
    descEn: "Comprehensive 800+ word journalistic report covering Marwan Attia's contract extension with Al Ahly, salary upgrade to category one, long-term security, and tactical analysis of his key midfield role for Al Ahly and Egypt."
  },
  {
    slug: "julian-alvarez-barcelona-atletico-madrid-transfer-rumors-profile-2026",
    titleAr: "جوليان ألفاريز: كواليس اهتمام برشلونة، موقف أتلتيكو مدريد، ومستقبل 'العنكبوت' الأرجنتيني | dkora",
    titleEn: "Julián Álvarez: Barcelona Transfer Links, Atlético Madrid Stance & 'El Araña' Career Breakdown 2026 | dkora",
    descAr: "تقرير صحفي متكامل وشامل يتجاوز 800 كلمة يتناول حقيقة أنباء انتقال جوليان ألفاريز (Julián Álvarez) إلى برشلونة، ردود الأفعال داخل الكامب نو، موقفه مع أتلتيكو مدريد، ومسيرة النجم الأرجنتيني الفائز بجميع الألقاب الكروية العالمية.",
    descEn: "In-depth 800+ word journalistic report analyzing Julián Álvarez's transfer rumors linking him with Barcelona, Atlético Madrid's stance, and the complete career journey of 'El Araña'—the World Cup and Champions League winner."
  },
  {
    slug: "crysencio-summerville-origins-al-hilal-transfer-profile-2026",
    titleAr: "اصول كريسينسيو سامرفيل: مسيرة الجناح الهولندي الشاب ورحلته من فاينورد إلى البريميرليغ واهتمام الهلال | dkora",
    titleEn: "Origins of Crysencio Summerville: Career, Surinamese Heritage & Football Journey to Al Hilal Links | dkora",
    descAr: "تقرير شامل ومفصل يتجاوز 800 كلمة يتناول أصول كريسينسيو سامرفيل (Crysencio Summerville)، جذوره السورينامية، نشأته في روتردام، محطاته الكروية مع فاينورد، ليدز يونايتد، ووست هام، وصولاً إلى اهتمام نادي الهلال السعودي بخدماته.",
    descEn: "In-depth 800+ word profile covering the origins of Crysencio Summerville, his Surinamese heritage, birth in Rotterdam, youth days at Feyenoord, Leeds United mastery, West Ham transfer, and links to Al Hilal."
  },
  {
    slug: "learn-football-step-by-step-beginners-guide-2026",
    titleAr: "تعلم كرة القدم للمبتدئين والكبار: الدليل العملي الشامل لإتقان المهارات والأساسيات في عام 2026 | dkora",
    titleEn: "Learn Football for Beginners & Adults: The Ultimate 2026 Practical Mastery & Skills Guide | dkora",
    descAr: "دليل إفرجرين (Evergreen) يتجاوز 900 كلمة يغطي خطوة بخطوة كيفية تعلم كرة القدم من الصفر للمبتدئين والكبار. يغطي التحكم بالكرة، اللمسة الأولى، التمرير، المراوغة، التسديد، واللياقة البدنية.",
    descEn: "An extensive 900+ word evergreen guide detailing step-by-step instructions to learn football from scratch for beginners and adults."
  },
  {
    slug: "football-stars-cleats-turf-review-amazon-egypt",
    titleAr: "مراجعة حذاء ستارز كرة قدم ترتان للجنسين من أمازون مصر: التقييم الشامل والمميزات لعام 2026 | dkora",
    titleEn: "Unisex Turf Football Stars Cleats Review on Amazon Egypt: 2026 In-Depth Analysis | dkora",
    descAr: "مراجعة تفصيلية شاملة تتجاوز 800 كلمة عن حذاء ستارز كرة قدم ترتان للجنسين المتاح على أمازون مصر (B0FNNN4ZTP). نناقش الخامات وثبات النعل الشامل مع رابط الشراء المباشر.",
    descEn: "An in-depth 800+ word review of the unisex turf football stars cleats available on Amazon Egypt (B0FNNN4ZTP). Exploring durability, TF traction, padding, and direct buy link."
  },
  {
    slug: "how-to-find-world-cup-match-ai",
    titleAr: "كيف تكتشف شبيهك الكروي من لاعبي المونديال بدقة بالذكاء الاصطناعي؟ | dkora",
    titleEn: "How to Find Your Exact World Cup Player Match Using Gemini AI | dkora",
    descAr: "دليلك الميداني الشامل المحدث لعام ٢٠٢٦ لاستغراق ذكاء الاستكشاف، ومطابقة السمات التكتيكية مع نجوم المونديال، وتوليد بطاقة مدمجة بالذكاء الاصطناعي بصفة ترويحية آمنة.",
    descEn: "Your comprehensive guide to exploring soccer styles, mapping your athletic skills, and synthesizing a personalized player card using modern secure generative models."
  },
  {
    slug: "modern-soccer-tactics-rating-stars",
    titleAr: "تحليل السمات التكتيكية لمهاجمي وصناع لعب كأس العالم ٢٠٢٦ | dkora",
    titleEn: "Analyzing Modern Tactical Archetypes in the 2026 Soccer Era | dkora",
    descAr: "دراسة معقمة وممتعة حول تطور مراكز المهاجم الوهمي، وصانع اللعب العصري، وكيف نقيم هذه الأرقام رياضياً لمطابقة من يشبهك بدقة بالغة.",
    descEn: "A thorough analytical exploration of the False 9, modern box-to-box creators, and how our quiz metrics map your profile to top international champions."
  },
  {
    slug: "how-to-blend-face-football-jersey",
    titleAr: "دليلك الكامل لدمج ملامح وجهك بقميص منتخبك المفضل بالذكاء الاصطناعي | dkora",
    titleEn: "Step-by-Step Tutorial: Blending Your Face into Your Favorite Jersey | dkora",
    descAr: "كيف تستخدم الأداة بشكل صحيح لالتقاط صور السيلفي وتركيب الملامح على نجوم كأس العالم في خطوة واحدة والحصول على بطاقات جاهزة للنشر الفوري.",
    descEn: "Learn how to use our secure generative face-merging portal safely. Get premium player cards seamlessly blended with your face inside stadium backdrops."
  },
  {
    slug: "ai-predictions-2026-world-cup-champion",
    titleAr: "توقعات الذكاء الاصطناعي لبطل كأس العالم 2026: من يرفع الكأس التاريخية؟ | dkora",
    titleEn: "AI Predictions for the 2026 World Cup Champion: Who Will Lift the Cup? | dkora",
    descAr: "تحليل معمق قائم على محاكاة الحاسوب المتقدمة لأداء المنتخبات وسجلات اللاعبين لتحديد المرشح الأوفر حظاً للفوز بمونديال 2026 التفاعلي.",
    descEn: "In-depth computer simulations tracking squad stats and historic dynamics to estimate the highest probability winner for the legendary 2026 World Cup."
  },
  {
    slug: "arab-teams-2026-world-cup-prospects",
    titleAr: "المنتخبات العربية في مونديال 2026: فرص التأهل والنجوم الصاعدة | dkora",
    titleEn: "Arab National Teams in the 2026 World Cup: Prospects and Rising Stars | dkora",
    descAr: "رؤية فنية وتحليل شامل لفرص المنتخبات العربية المشاركة في نهائيات كأس العالم 2026 وتأثير الحضور الجماهيري والمواهب الشابة الصاعدة.",
    descEn: "A comprehensive tactical review of Arab national squad prospects, tracking their qualifying momentum, legendary fan bases, and rising youngsters."
  },
  {
    slug: "fastest-wingers-2026-world-cup",
    titleAr: "أسرع وأخطر أجنحة مونديال 2026: سرعة خارقة وتكتيك هجومي مرعب | dkora",
    titleEn: "The Fastest and Most Dangerous Wingers of the 2026 World Cup | dkora",
    descAr: "تحليل تكتيكي لأسرع النفاثات الهجومية على أجنحة ملاعب مونديال 2026، من كليان مبابي إلى فينيسيوس جونيور وطريقتهم في اختراق الدفاعات.",
    descEn: "A precise statistics-driven evaluation of the fastest and most clinical attackers occupying the flank positions in the 2026 tournament, featuring Mbappe, Vinicius Jr, and more."
  },
  {
    slug: "tech-evolution-2026-world-cup-stadiums",
    titleAr: "تطور التكنولوجيا الرياضية في مونديال 2026: من التسلل الآلي إلى كرات الاستشعار | dkora",
    titleEn: "Sports Tech Evolution in the 2026 World Cup: Automated Offsides and Smart Balls | dkora",
    descAr: "ثورة تكنولوجية شاملة تشهدها ملاعب مونديال 2026، حيث تكشف رقاقات الاستشعار والذكاء الاصطناعي تفاصيل اللعبة بدقة الميكروثانية.",
    descEn: "A massive technological leap defines the 2026 tournament, featuring embedded microchips, real-time heatmaps, and ultra-high-speed spatial computer vision."
  },
  {
    slug: "messi-ronaldo-last-dance-2026-world-cup",
    titleAr: "كيف يستعد ميسي ورونالدو لرقصتهما الأخيرة في مونديال 2026 العصري؟ | dkora",
    titleEn: "How Messi and Ronaldo Prepare for Their Last Dance in the 2026 World Cup | dkora",
    descAr: "القصة الكاملة للرحلة التدريبية والذهنية للأسطورتين ليو ميسي وكريستيانو رونالدو لتقديم عرضهما التاريخي الأخير في الملاعب الأمريكية المونديالية.",
    descEn: "Explore the physical conditioning, mental focus, and tactical adjustments guiding Leo Messi and Cristiano Ronaldo toward their final historic championship."
  }
];

function getSeoMetaData(req: express.Request, storedProductsList?: any[]) {
  let lang = req.query.lang as string;
  const rawPath = req.path || "";

  let articleSlug = (req.query.article as string) || "";
  let view = (req.query.view as string) || "";
  let productId = ((req.query.product || req.query.p || req.query.slug || req.query.keyword) as string) || "";
  const keywordParam = req.query.keyword as string;

  if (rawPath.startsWith("/article/")) {
    articleSlug = rawPath.replace("/article/", "").trim();
  } else if (rawPath === "/articles") {
    view = "articles";
  } else if (rawPath.startsWith("/product/")) {
    productId = rawPath.replace("/product/", "").trim();
  } else if (rawPath === "/categories") {
    view = "categories";
  } else if (rawPath.startsWith("/category/")) {
    view = "categories";
  } else if (rawPath === "/comparisons") {
    view = "comparisons";
  } else if (rawPath === "/deals") {
    view = "deals";
  } else if (rawPath === "/sitemap") {
    view = "sitemap";
  } else if (rawPath === "/admin") {
    view = "admin";
  } else if (rawPath === "/privacy") {
    view = "privacy";
  } else if (rawPath === "/terms") {
    view = "terms";
  } else if (rawPath === "/about") {
    view = "about";
  } else if (rawPath === "/contact") {
    view = "contact";
  } else if (rawPath === "/disclaimer") {
    view = "disclaimer";
  }

  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.get("host") || "dkora.online";
  const baseUrl = `${protocol}://${host}`;

  if (lang !== "en" && lang !== "ar") {
    lang = "ar";
  }

  let title = "ديكورا Dkora - دليلك الشامل لعدد ولوازم ديكورات احترافية";
  let description = "دليلك الشامل لعدد ولوازم ديكورات احترافية";
  let image = `${baseUrl}/og-image.jpg`;
  let canonicalUrl = `${baseUrl}${req.originalUrl || "/"}`;

  if ((productId || keywordParam) && Array.isArray(storedProductsList)) {
    const p = findProductByQueryParam(storedProductsList, productId, keywordParam);
    if (p) {
      title = `${p.titleAr} - ${p.brandName} (${p.modelNumber || ""}) | مراجعة وسعر ديكورا Dkora`;
      description = `${p.summary || p.titleAr} - تعرف على المواصفات الفنية والتقييم وأسعار الشراء المباشرة على منصة ديكورا.`;
      image = p.mainImage || image;
      canonicalUrl = `${baseUrl}/product/${p.id}-${createProductSlug(p)}`;
    }
  } else if (view === "sitemap") {
    title = "خريطة الموقع التفاعلية (Dynamic XML Sitemap) | ديكورا Dkora";
    description = "تصفح جميع روابط المنتجات والتصنيفات والمقالات المحدثة تلقائياً في دليل ديكورا Dkora.";
    canonicalUrl = `${baseUrl}/sitemap`;
  } else if (view === "categories") {
    title = "تصنيفات العدد والأدوات والديكور | ديكورا Dkora";
    description = "استكشف جميع تصنيفات الشنيور، الصاروخ، العدد اليدوية، وأدوات الديكور مع الأسعار والتقييمات.";
    canonicalUrl = `${baseUrl}/categories`;
  } else if (view === "comparisons") {
    title = "أداة مقارنة العدد والأدوات الفنية جنباً إلى جنب | ديكورا Dkora";
    description = "قارن بين مواصفات وأسعار أفضل ماركات العدد مثل ديوالت، بوش، وماكيتا بسهولة.";
    canonicalUrl = `${baseUrl}/comparisons`;
  } else if (view === "deals") {
    title = "أحدث عروض وكوبونات خصم العدد والأدوات | ديكورا Dkora";
    description = "تصفح أحدث الخصومات وأكواد التخفيض الحصرية للعدد الكهربائية والديكور في مصر والخليج.";
    canonicalUrl = `${baseUrl}/deals`;
  } else if (view === "articles") {
    title = "مدونة ديكورا - دروس الصيانة ودليل اختيار العدد | Dkora";
    description = "مقالات وشروحات فنية من خبراء الصيانة والديكور لمساعدتك في اختيار الأداة المناسبة.";
    canonicalUrl = `${baseUrl}/articles`;
  } else if (view === "privacy") {
    title = "سياسة الخصوصية وسرية البيانات | منصة ديكورا Dkora";
    description = "سياسة الخصوصية وسرية البيانات ومعايير الشفافية الخاصة بمنصة ديكورا ومتطلبات AdSense.";
    canonicalUrl = `${baseUrl}/privacy`;
  } else if (view === "terms") {
    title = "الشروط والأحكام وسياسة الاستخدام | منصة ديكورا Dkora";
    description = "الشروط والأحكام لاتفاقية استخدام منصة ديكورا للعدد والأدوات والتسويق بالعمولة.";
    canonicalUrl = `${baseUrl}/terms`;
  } else if (view === "about") {
    title = "من نحن - عن منصة ديكورا Dkora لدليل العدد والأدوات";
    description = "تعرف على منصة ديكورا، رسالتنا، ومنهجية اختبار وتقييم المعدات والأدوات والعدد الكهربائية.";
    canonicalUrl = `${baseUrl}/about`;
  } else if (view === "contact") {
    title = "اتصل بنا ومعلومات هيئة التحرير | منصة ديكورا Dkora";
    description = "تواصل مع فريق عمل وإدارة منصة ديكورا للاستفسارات والاقتراحات والشراكات الرسمية.";
    canonicalUrl = `${baseUrl}/contact`;
  } else if (view === "disclaimer") {
    title = "إخلاء المسؤولية وإفصاح التسويق بالعمولة | منصة ديكورا Dkora";
    description = "إفصاح التسويق بالعمولة والأمان الفني لتقييمات العدد والأدوات الكهربائية واليدوية على ديكورا.";
    canonicalUrl = `${baseUrl}/disclaimer`;
  } else if (articleSlug) {
    const artSeo = ARTICLES_SEO.find(a => a.slug === articleSlug);
    const artMock = ARTICLES.find(a => a.slug === articleSlug || a.id === articleSlug);
    if (artSeo) {
      title = artSeo.titleAr;
      description = artSeo.descAr;
      canonicalUrl = `${baseUrl}/article/${artSeo.slug}`;
    } else if (artMock) {
      title = `${artMock.title} | ديكورا Dkora`;
      description = artMock.excerpt;
      image = artMock.coverImage || image;
      canonicalUrl = `${baseUrl}/article/${artMock.slug}`;
    }
  }

  const dir = lang === "ar" ? "rtl" : "ltr";
  return { title, description, image, canonicalUrl, lang, dir };
}

function replaceAllSeoMeta(html: string, seo: { title: string; description: string; image?: string; canonicalUrl?: string; lang: string; dir: string }) {
  let modified = html;

  // 1. replace html tag properties
  modified = modified.replace(/<html[^>]*>/gi, `<html lang="${seo.lang}" dir="${seo.dir}">`);

  // 2. replace <title>
  modified = modified.replace(/<title>[^<]*<\/title>/gi, `<title>${seo.title}</title>`);

  // 3. replace meta description
  modified = modified.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${seo.description}" />`);
  modified = modified.replace(/<meta\s+content="[^"]*"\s+name="description"\s*\/?>/gi, `<meta name="description" content="${seo.description}" />`);

  // 4. replace og:title & og:description
  modified = modified.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${seo.title}" />`);
  modified = modified.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${seo.description}" />`);

  // 5. replace or insert og:image
  if (seo.image) {
    if (modified.includes('property="og:image"')) {
      modified = modified.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:image" content="${seo.image}" />`);
    } else {
      modified = modified.replace("</head>", `  <meta property="og:image" content="${seo.image}" />\n</head>`);
    }
  }

  // 6. replace or insert link canonical
  if (seo.canonicalUrl) {
    if (modified.includes('rel="canonical"')) {
      modified = modified.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi, `<link rel="canonical" href="${seo.canonicalUrl}" />`);
    } else {
      modified = modified.replace("</head>", `  <link rel="canonical" href="${seo.canonicalUrl}" />\n</head>`);
    }
  }

  return modified;
}

// Helper to trace and get player info for prompt crafting
const PLAYER_JERSEYS: Record<string, { name: string; team: string; jersey: string }> = {
  messi: { name: "Lionel Messi", team: "Argentina", jersey: "iconic sky blue and white vertical striped shirt" },
  ronaldo: { name: "Cristiano Ronaldo", team: "Portugal", jersey: "red jersey with green accents and his legendary golden number 7 on the chest" },
  mbappe: { name: "Kylian Mbappé", team: "France", jersey: "modern royal navy blue jersey with white and red details" },
  haaland: { name: "Erling Haaland", team: "Norway", jersey: "red home shirt with dark blue details and athletic style" },
  modric: { name: "Luka Modrić", team: "Croatia", jersey: "famous red and white checkered squares soccer jersey" },
  salah: { name: "Mohamed Salah", team: "Egypt", jersey: "red shirt with black/white trim and traditional national team crest" }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS for all origins, static assets, and API requests
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Enable gzip compression to decrease download payloads and improve FCP
  app.use(compression());

  // Serve static files from public directory at root level
  app.use(express.static(path.join(rootDir, "public")));

  // Increase body size limits for base64 image uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Persistence helpers for custom products
  const CUSTOM_PRODUCTS_FILE = path.join(rootDir, "custom_products.json");
  const CUSTOM_SIGNALS_FILE = path.join(rootDir, "custom_signals.json");

  function getStoredSignals() {
    try {
      if (fs.existsSync(CUSTOM_SIGNALS_FILE)) {
        const data = fs.readFileSync(CUSTOM_SIGNALS_FILE, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Error reading custom_signals.json", err);
    }
    return [];
  }

  function saveStoredSignals(signalsList: any[]) {
    try {
      fs.writeFileSync(CUSTOM_SIGNALS_FILE, JSON.stringify(signalsList, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing custom_signals.json", err);
    }
  }

  function getStoredProducts() {
    let customList: any[] = [];
    try {
      if (fs.existsSync(CUSTOM_PRODUCTS_FILE)) {
        const data = fs.readFileSync(CUSTOM_PRODUCTS_FILE, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          customList = parsed;
        }
      }
    } catch (err) {
      console.error("Error reading custom_products.json", err);
    }

    if (customList.length === 0) {
      return PRODUCTS;
    }

    // Merge PRODUCTS with custom_products.json so built-in PRODUCTS are preserved
    // and custom or modified products override or get appended
    const mergedMap = new Map<string, any>();
    PRODUCTS.forEach((p) => {
      if (p && p.id) {
        mergedMap.set(p.id, p);
      }
    });

    customList.forEach((p) => {
      if (p && p.id) {
        mergedMap.set(p.id, p);
      }
    });

    return Array.from(mergedMap.values());
  }

  function saveStoredProducts(productsList: any[]) {
    try {
      fs.writeFileSync(CUSTOM_PRODUCTS_FILE, JSON.stringify(productsList, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing custom_products.json", err);
    }
  }

  // API Endpoint to fetch and parse Telegram public channel signals
  app.get("/api/telegram-signals", async (req, res) => {
    const channelName = (req.query.channel as string) || "nmerfx";
    const telegramUrl = `https://t.me/s/${channelName}?t=${Date.now()}`;

    try {
      console.log(`Fetching telegram channel preview from: ${telegramUrl}`);
      const response = await fetch(telegramUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch Telegram page: ${response.statusText}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const rawMessages: { text: string; date: string; views: string; photoUrl: string }[] = [];

      $(".tgme_widget_message").each((i, el) => {
        const textEl = $(el).find(".tgme_widget_message_text");
        if (textEl.length) {
          const text = textEl.text().trim();
          const date = $(el).find(".tgme_widget_message_date time").attr("datetime") || "";
          const views = $(el).find(".tgme_widget_message_views").text().trim() || "0";
          
          // Try to extract post photo if exists
          const photoEl = $(el).find(".tgme_widget_message_photo_wrap");
          let photoUrl = "";
          if (photoEl.length) {
            const style = photoEl.attr("style") || "";
            const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (match) {
              photoUrl = match[1];
            }
          }

          rawMessages.push({ text, date, views, photoUrl });
        }
      });

      // Keep only the last 15 messages (newest are usually at the bottom of the page in Telegram s/ view)
      // Since s/ view list has oldest first, let's reverse to get newest first
      const newestMessages = rawMessages.reverse().slice(0, 15);

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          console.log("Parsing signals using Gemini AI...");
          const ai = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              },
            },
          });

          const prompt = `You are an expert financial market analyst.
Your task is to analyze these public Telegram channel messages and extract structured trading signals.
Return a clean JSON array representing each message. The JSON schema for each signal in the array MUST be:
{
  "pair": string (the asset name, e.g., "XAUUSD" or "EURUSD" or "BTCUSD" or "US30", in uppercase. If it is general market updates or not a signal, write "MARKET UPDATE"),
  "type": "BUY" | "SELL" | "BUY LIMIT" | "SELL LIMIT" | "BUY STOP" | "SELL STOP" | "INFO",
  "entry": string (entry price or range, e.g., "2410.50" or "N/A"),
  "tp1": string (take profit 1, empty if none),
  "tp2": string (take profit 2, empty if none),
  "tp3": string (take profit 3, empty if none),
  "sl": string (stop loss, empty if none),
  "status": "ACTIVE" | "TP1 HIT" | "TP2 HIT" | "TP3 HIT" | "SL HIT" | "CLOSED" | "INFO" (analyze the text context of this and neighboring messages to decide status. For general market updates/educational text, write "INFO"),
  "explanation": string (very elegant and structured brief description of the signal or the update in Arabic, summarizing any additional instructions or observations from the post)
}

Messages to parse:
${JSON.stringify(newestMessages.map((m, idx) => ({ index: idx, text: m.text })))}

Return ONLY a valid raw JSON array containing exactly the parsed items. Do not wrap in markdown blocks, do not write backticks, do not write any text outside the JSON array.`;

          const geminiResponse = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
            }
          });

          const parsedJsonText = geminiResponse.text?.trim() || "[]";
          const parsedSignals = JSON.parse(parsedJsonText);

          if (Array.isArray(parsedSignals)) {
            const finalSignals = parsedSignals.map((sig: any, idx: number) => {
              const orig = newestMessages[idx] || { text: "", date: "", views: "0", photoUrl: "" };
              // Create stable ID using a clean hash of original text content & date to prevent dynamic ID shifts
              const textHash = orig.text.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "").substring(0, 30);
              const uniqueId = `sig-${textHash}-${orig.date || idx}`;
              return {
                id: uniqueId,
                pair: sig.pair || "MARKET UPDATE",
                type: sig.type || "INFO",
                entry: sig.entry || "N/A",
                tp1: sig.tp1 || "",
                tp2: sig.tp2 || "",
                tp3: sig.tp3 || "",
                sl: sig.sl || "",
                status: sig.status || "INFO",
                explanation: sig.explanation || "",
                date: orig.date,
                views: orig.views,
                photoUrl: orig.photoUrl,
                rawText: orig.text
              };
            });

            return res.json({
              success: true,
              source: "gemini",
              channel: channelName,
              signals: finalSignals
            });
          }
        } catch (geminiError) {
          console.error("Gemini signals parsing failed, falling back to local parsing:", geminiError);
        }
      }

      // Fallback local regex parsing
      console.log("Parsing signals using local fallback engine...");
      const fallbackSignals = newestMessages.map((m, idx) => {
        const text = m.text;
        const upper = text.toUpperCase();
        
        // Find trading pairs
        const pairs = [
          "EURUSD", "GBPUSD", "USDJPY", "USDCAD", "AUDUSD", "NZDUSD", "USDCHF",
          "XAUUSD", "GOLD", "BTCUSD", "ETHUSD", "US30", "NAS100", "GER30", "DE30", "OIL", "USOIL"
        ];
        
        let pair = "";
        for (const p of pairs) {
          if (upper.includes(p)) {
            pair = p;
            if (pair === "GOLD") pair = "XAUUSD (GOLD)";
            break;
          }
        }
        
        if (!pair) {
          const arabicPairsMap: { [key: string]: string } = {
            "الذهب": "XAUUSD (GOLD)",
            "ذهب": "XAUUSD (GOLD)",
            "الدولار ين": "USDJPY",
            "دولار ين": "USDJPY",
            "الين": "USDJPY",
            "الداو": "US30 (Dow Jones)",
            "الداوجونز": "US30 (Dow Jones)",
            "الناسداك": "NAS100 (Nasdaq)",
            "اليورو": "EURUSD",
            "البوند": "GBPUSD"
          };
          for (const key of Object.keys(arabicPairsMap)) {
            if (text.includes(key)) {
              pair = arabicPairsMap[key];
              break;
            }
          }
        }

        if (!pair) {
          const textHash = text.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "").substring(0, 30);
          const uniqueId = `sig-info-${textHash}-${m.date || idx}`;
          return {
            id: uniqueId,
            pair: "تحديث السوق",
            type: "INFO",
            entry: "N/A",
            tp1: "",
            tp2: "",
            tp3: "",
            sl: "",
            status: "INFO",
            explanation: text.substring(0, 180) + (text.length > 180 ? "..." : ""),
            date: m.date,
            views: m.views,
            photoUrl: m.photoUrl,
            rawText: text
          };
        }

        let type = "INFO";
        if (upper.includes("BUY LIMIT")) type = "BUY LIMIT";
        else if (upper.includes("SELL LIMIT")) type = "SELL LIMIT";
        else if (upper.includes("BUY STOP")) type = "BUY STOP";
        else if (upper.includes("SELL STOP")) type = "SELL STOP";
        else if (upper.includes("BUY") || text.includes("شراء") || text.includes("شراء مباشر")) type = "BUY";
        else if (upper.includes("SELL") || text.includes("بيع") || text.includes("بيع مباشر")) type = "SELL";

        let entry = "سعر السوق الحالي";
        const entryRegexes = [
          /(?:entry|at|@|بسعر|دخول|الدخول|من)\s*:?\s*(\d+(?:\.\d+)?)(?:\s*-\s*(\d+(?:\.\d+)?))?/i,
          /(?:BUY|SELL|شراء|بيع)\s+(?:GOLD|XAUUSD|EURUSD|US30)?\s*(?:AT|@|بسعر)?\s*(\d+(?:\.\d+)?)/i
        ];
        for (const regex of entryRegexes) {
          const match = text.match(regex);
          if (match) {
            entry = match[1] + (match[2] ? ` - ${match[2]}` : "");
            break;
          }
        }

        let tp1 = "";
        let tp2 = "";
        let tp3 = "";
        const tp1Match = text.match(/(?:tp1|tp\s*1|target\s*1|الهدف\s*الأول|الهدف\s*1|هدف\s*1|هدف)\s*:?\s*(\d+(?:\.\d+)?)/i);
        if (tp1Match) tp1 = tp1Match[1];
        const tp2Match = text.match(/(?:tp2|tp\s*2|target\s*2|الهدف\s*الثاني|الهدف\s*2|هدف\s*2)\s*:?\s*(\d+(?:\.\d+)?)/i);
        if (tp2Match) tp2 = tp2Match[1];
        const tp3Match = text.match(/(?:tp3|tp\s*3|target\s*3|الهدف\s*الثالث|الهدف\s*3|هدف\s*3)\s*:?\s*(\d+(?:\.\d+)?)/i);
        if (tp3Match) tp3 = tp3Match[1];

        if (!tp1) {
          const genericTpMatches = [...text.matchAll(/(?:tp|target|take profit|الأهداف|الهدف|الهدف الأول|هدف)\s*:?\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d+(?:\.\d+)?))?(?:\s*,\s*(\d+(?:\.\d+)?))?/gi)];
          if (genericTpMatches.length > 0) {
            tp1 = genericTpMatches[0][1] || "";
            tp2 = genericTpMatches[0][2] || "";
            tp3 = genericTpMatches[0][3] || "";
          }
        }

        let sl = "";
        const slMatch = text.match(/(?:sl|stop|stop\s*loss|ستوب|وقف|وقف\s*الخسارة|الستوب)\s*:?\s*(\d+(?:\.\d+)?)/i);
        if (slMatch) sl = slMatch[1];

        let status = "ACTIVE";
        const statusText = text.toLowerCase();
        if (statusText.includes("hit tp1") || statusText.includes("tp1 hit") || text.includes("الهدف الأول ✅")) status = "TP1 HIT";
        else if (statusText.includes("hit tp2") || statusText.includes("tp2 hit") || text.includes("الهدف الثاني ✅")) status = "TP2 HIT";
        else if (statusText.includes("hit tp3") || statusText.includes("tp3 hit") || text.includes("الهدف الثالث ✅")) status = "TP3 HIT";
        else if (statusText.includes("hit sl") || statusText.includes("sl hit") || text.includes("ضرب الستوب") || text.includes("ضرب وقف الخسارة")) status = "SL HIT";
        else if (statusText.includes("closed") || statusText.includes("close now") || text.includes("اغلق") || text.includes("إغلاق")) status = "CLOSED";

         // Create stable ID using a clean hash of original text content & date to prevent dynamic ID shifts
        const textHash = text.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "").substring(0, 30);
        const uniqueId = `sig-${textHash}-${m.date || idx}`;
        return {
          id: uniqueId,
          pair,
          type,
          entry,
          tp1,
          tp2,
          tp3,
          sl,
          status,
          explanation: text.substring(0, 180) + (text.length > 180 ? "..." : ""),
          date: m.date,
          views: m.views,
          photoUrl: m.photoUrl,
          rawText: text
        };
      });

      res.json({
        success: true,
        source: "local-parser",
        channel: channelName,
        signals: fallbackSignals
      });

    } catch (error: any) {
      console.error("Error fetching or parsing Telegram Signals:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to fetch or parse Telegram Signals"
      });
    }
  });

  // API Endpoints for Products
  app.get("/api/products", (req, res) => {
    res.json(getStoredProducts());
  });

  app.post("/api/products", (req, res) => {
    const productsList = req.body;
    if (Array.isArray(productsList)) {
      saveStoredProducts(productsList);
      return res.json({ success: true, count: productsList.length });
    }
    res.status(400).json({ error: "Invalid data format" });
  });

  // API Endpoints for Signals Persistence
  app.get("/api/signals-persistence", (req, res) => {
    res.json(getStoredSignals());
  });

  app.post("/api/signals-persistence", (req, res) => {
    const signalsList = req.body;
    if (Array.isArray(signalsList)) {
      saveStoredSignals(signalsList);
      return res.json({ success: true, count: signalsList.length });
    }
    res.status(400).json({ error: "Invalid signals data format" });
  });

  // Dynamic Robots.txt Route
  app.get(["/robots.txt", "/robots"], (req, res) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.get("host") || "dkora.online";
    const content = `User-agent: *
Allow: /

Sitemap: ${protocol}://${host}/sitemap.xml
`;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(content);
  });

  // Dynamic Sitemap.xml Route - Automatically updates with every request and data change
  app.get(["/sitemap.xml", "/sitemap", "/sitemap_index.xml"], (req, res) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.get("host") || "dkora.online";
    const baseUrl = `${protocol}://${host}`;
    const currentDate = new Date().toISOString().split("T")[0];

    const rawUrls: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [
      { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: "daily", priority: "1.0" },
      { loc: `${baseUrl}/categories`, lastmod: currentDate, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/comparisons`, lastmod: currentDate, changefreq: "weekly", priority: "0.9" },
      { loc: `${baseUrl}/deals`, lastmod: currentDate, changefreq: "daily", priority: "0.9" },
      { loc: `${baseUrl}/articles`, lastmod: currentDate, changefreq: "weekly", priority: "0.8" },
      { loc: `${baseUrl}/sitemap`, lastmod: currentDate, changefreq: "always", priority: "0.7" },
      { loc: `${baseUrl}/privacy`, lastmod: currentDate, changefreq: "monthly", priority: "0.8" },
      { loc: `${baseUrl}/terms`, lastmod: currentDate, changefreq: "monthly", priority: "0.8" },
      { loc: `${baseUrl}/about`, lastmod: currentDate, changefreq: "monthly", priority: "0.85" },
      { loc: `${baseUrl}/contact`, lastmod: currentDate, changefreq: "monthly", priority: "0.85" },
      { loc: `${baseUrl}/disclaimer`, lastmod: currentDate, changefreq: "monthly", priority: "0.8" },

      ...CATEGORIES.map((cat) => ({
        loc: `${baseUrl}/category/${cat.id}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.85",
      })),

      ...getStoredProducts().map((prod: any) => ({
        loc: createProductUrl(prod, baseUrl),
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.80",
      })),

      ...ARTICLES.map((art) => ({
        loc: `${baseUrl}/article/${art.slug}`,
        lastmod: art.date || currentDate,
        changefreq: "monthly",
        priority: "0.75",
      })),

      ...ARTICLES_SEO.map((art) => ({
        loc: `${baseUrl}/article/${art.slug}`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.75",
      })),

      ...DEALS.map((deal) => ({
        loc: `${baseUrl}/deals?deal=${deal.id}`,
        lastmod: currentDate,
        changefreq: "daily",
        priority: "0.80",
      })),

      ...BUYING_GUIDES.map((guide) => ({
        loc: `${baseUrl}/articles?guide=${guide.id}`,
        lastmod: currentDate,
        changefreq: "monthly",
        priority: "0.80",
      })),
    ];

    // Remove duplicates
    const urlMap = new Map<string, { loc: string; lastmod: string; changefreq: string; priority: string }>();
    rawUrls.forEach((item) => {
      if (!urlMap.has(item.loc)) {
        urlMap.set(item.loc, item);
      }
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urlMap.forEach((u) => {
      // Escape & as &amp; to strictly comply with XML standards
      const cleanLoc = u.loc.replace(/&/g, "&amp;");
      xml += `  <url>\n`;
      xml += `    <loc>${cleanLoc}</loc>\n`;
      xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, max-age=360, s-maxage=360");
    res.status(200).send(xml);
  });

  // Always serve static files directly from public directory
  app.use(express.static(path.join(rootDir, "public")));

  // API Route: Combine user base64 photo with their matching players using Gemini
  app.post("/api/match-photo", async (req, res) => {
    try {
      const { userImage, playerId } = req.body;

      if (!userImage) {
        return res.status(400).json({ error: "User image is required" });
      }

      const playerKey = playerId || "messi";
      const info = PLAYER_JERSEYS[playerKey] || PLAYER_JERSEYS.messi;

      // Lazy check and initialization of Gemini API key to prevent startup crashes
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY environment variable is not defined. Falling back to simulated AI blend for demo purposes.");
        // If API key is missing, return fallback simulation (the player's image itself + info)
        return res.json({
          imageUrl: `/${playerKey}.jpg`,
          isSimulated: true,
          message: "API Key missing. Showing high-quality player portrait instead!"
        });
      }

      console.log(`Initiating image generation for player: ${playerKey} using gemini-2.5-flash-image`);
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Strip MimeType prefix if present (e.g., "data:image/jpeg;base64,...")
      let cleanBase64 = userImage;
      let mimeType = "image/jpeg";
      if (userImage.includes(";base64,")) {
        const parts = userImage.split(";base64,");
        mimeType = parts[0].replace("data:", "");
        cleanBase64 = parts[1];
      }

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: cleanBase64,
        },
      };

      const promptText = `This is a photograph of a user. Generate a high-quality, realistic, professional photograph showing this exact user on the left, standing happily and smiling side-by-side next to the legendary football player ${info.name} on the right.
${info.name} must be wearing his ${info.team} national football jersey (${info.jersey}).
They must be standing proud on a lush green championship football pitch at night under bright stadium lighting, looking at the camera.
The output must be a single beautifully synthesized natural photograph, aspect ratio 1:1, centered, sharp details, photorealistic. Output ONLY the resulting combined image.`;

      const textPart = {
        text: promptText,
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts: [imagePart, textPart] },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      let generatedBase64 = "";

      if (response && response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            generatedBase64 = part.inlineData.data;
            break;
          }
        }
      }

      if (generatedBase64) {
        return res.json({
          imageUrl: `data:image/png;base64,${generatedBase64}`,
          isSimulated: false,
        });
      } else {
        // Fallback if no image returned from LLM
        console.warn("Gemini didn't return direct inline image data. Returning player fallback.");
        return res.json({
          imageUrl: `/${playerKey}.jpg`,
          isSimulated: true,
          message: "Gemini response did not contain inline image. Showing high-quality player portrait instead!"
        });
      }

    } catch (error: any) {
      console.error("Error generating match photo via Gemini API:", error);
      return res.status(500).json({ error: error.message || "Failed to generate photo combination" });
    }
  });

  // Serve static files / Vite bundle in Production or mount Vite in Development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware.");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Mount Vite middleware FIRST so asset requests (images, JS, CSS, fonts) are handled cleanly
    app.use(vite.middlewares);

    // Intercept standard page load requests to inject dynamic SEO headers for bots/sharers
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      const cleanPath = req.path;

      // Skip API routes, statics, sitemaps, robots, and direct asset files
      if (
        cleanPath.startsWith("/api") ||
        cleanPath.startsWith("/sitemap") ||
        cleanPath.startsWith("/robots") ||
        cleanPath.startsWith("/@") ||
        cleanPath.startsWith("/src") ||
        cleanPath.startsWith("/node_modules") ||
        cleanPath.startsWith("/assets") ||
        cleanPath.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|map|woff2?|json|ttf|eot|xml|txt)$/i) ||
        req.headers.accept?.includes("application/json")
      ) {
        return next();
      }

      try {
        let html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        html = await vite.transformIndexHtml(url, html);
        const seo = getSeoMetaData(req, getStoredProducts());
        html = replaceAllSeoMeta(html, seo);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    console.log("Starting server in PRODUCTION mode.");
    const distPath = path.join(rootDir, "dist");
    
    // Serve static files with robust Cache-Control headers for high-fidelity caching and performance
    app.use(express.static(distPath, {
      index: false,
      maxAge: "30d",
      setHeaders: (res, filePath) => {
        if (filePath.match(/\.(js|css|woff2?|eot|ttf|otf|json)$/)) {
          // Vite-built hashed assets or web fonts: cache indefinitely (1 year)
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (filePath.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)) {
          // Image assets: cache for 30 days
          res.setHeader("Cache-Control", "public, max-age=2592000");
        }
      }
    }));

    app.use(express.static(path.join(rootDir, "public")));
    
    app.get("*", (req, res, next) => {
      const cleanPath = req.path;
      if (
        cleanPath.startsWith("/api") ||
        cleanPath.startsWith("/sitemap") ||
        cleanPath.startsWith("/robots") ||
        cleanPath.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|map|woff2?|json|ttf|eot|xml|txt)$/i)
      ) {
        return next();
      }

      try {
        let html = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        const seo = getSeoMetaData(req, getStoredProducts());
        html = replaceAllSeoMeta(html, seo);
        
        // Inline index CSS if present to eliminate render-blocking CSS requests completely
        const assetsDir = path.join(distPath, "assets");
        if (fs.existsSync(assetsDir)) {
          const files = fs.readdirSync(assetsDir);
          const cssFile = files.find(f => f.endsWith(".css") && f.startsWith("index-"));
          if (cssFile) {
            const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), "utf-8");
            html = html.replace(
              /<link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/gi,
              `<style>${cssContent}</style>`
            );
          }
        }
        
        res.status(200).set({ 
          "Content-Type": "text/html",
          "Cache-Control": "public, max-age=0, must-revalidate"
        }).end(html);
      } catch (err) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully listening on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
