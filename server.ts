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
import { initialNewsArticles } from "./src/data/newsAndCalendar";

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

  let view = "";
  let subId = "";

  if (rawPath === "/news") {
    view = "news";
  } else if (rawPath.startsWith("/news/")) {
    view = "news";
    subId = rawPath.replace("/news/", "").trim();
  } else if (rawPath === "/school") {
    view = "school";
  } else if (rawPath.startsWith("/school/")) {
    view = "school";
    subId = rawPath.replace("/school/", "").trim();
  } else if (rawPath.startsWith("/signal/")) {
    view = "signal";
    subId = rawPath.replace("/signal/", "").trim();
  } else if (rawPath === "/sitemap") {
    view = "sitemap";
  } else if (rawPath === "/privacy") {
    view = "privacy";
  } else if (rawPath === "/terms") {
    view = "terms";
  }

  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.get("host") || "decoura-fx.online";
  const baseUrl = `${protocol}://${host}`;

  if (lang !== "en" && lang !== "ar") {
    lang = "ar";
  }

  let title = lang === "ar" 
    ? "توصيات فوركس مجانية دقيقة | اربح مع خبراء سوق العملات | ديكوراFX" 
    : "Free Accurate Forex Signals | Profit with Currency Market Experts | DecouFX";
  let description = lang === "ar"
    ? "منصة ديكوراFX تقدم توصيات فوركس حية ومباشرة مجاناً، بالإضافة إلى تحليلات فنية دقيقة ومدرسة متكاملة لتعليم التداول للمبتدئين والمحترفين."
    : "DecouFX platform offers free live accurate Forex signals, professional technical analysis, and a comprehensive trading academy for beginners and advanced traders.";
  let image = `${baseUrl}/forex_basics.jpg`;
  let canonicalUrl = `${baseUrl}${req.originalUrl || "/"}`;

  if (view === "news") {
    if (subId) {
      if (subId === "fallback-meme-coins" || subId === "meme-coins") {
        title = lang === "ar"
          ? "انفجار تداولات عملات الميم في عام 2026: دليل الأمان والربح | ديكوراFX"
          : "The 2026 Meme Coins Explosion: Safety & Profit Guide | DecouFX";
        description = lang === "ar"
          ? "شهدت أسواق الكريبتو انفجاراً حقيقياً في تداول عملات الميم. تعرف على كيفية استغلال هذه موجة الاستثمارية بأمان وفهم تحولات السوق الجديدة."
          : "Crypto markets witnessed a real explosion in meme coins trading. Learn how to safely leverage this investment wave and understand new market shifts.";
        image = `${baseUrl}/meme_coins_2026_1787419226241.jpg`;
      } else if (subId === "news-gold-risk-management") {
        title = lang === "ar"
          ? "دليل الاحتراف: اداره مخاطر فوركس الذهب لعام 2026 وحماية رأس المال | ديكوراFX"
          : "Professional Guide: Forex Gold Risk Management in 2026 | DecouFX";
        description = lang === "ar"
          ? "نظرة عميقة ومفصلة حول أسرار اداره مخاطر فوركس الذهب لحماية محفظتك من تذبذبات الذهب العنيفة باستخدام أهم الاستراتيجيات واللوت لعام 2026."
          : "Ultimate 2026 guide on Forex Gold Risk Management, lot sizing calculations, and drawdown mitigation for professional traders.";
        image = `${baseUrl}/src/assets/images/gold_forex_risk_management_1787538156014.jpg`;
      } else {
        title = lang === "ar"
          ? `تفاصيل المقال والتحليل الفني والأساسي | أخبار ديكوراFX`
          : `Article Details & Market Analysis | DecouFX News`;
        description = lang === "ar"
          ? "تابع التغطية الشاملة والتحليلات الفنية اللحظية الصادرة من محررينا الاقتصاديين لكافة التطورات في الأسواق والعملات والمعادن."
          : "Follow our comprehensive market updates and professional technical analyses on currency pairs, commodities, and digital assets.";
      }
      canonicalUrl = `${baseUrl}/news/${subId}`;
    } else {
      title = lang === "ar"
        ? "أخبار الفوركس العاجلة والتحليلات الفنية اليومية | ديكوراFX"
        : "Breaking Forex News & Daily Technical Analysis | DecouFX";
      description = lang === "ar"
        ? "ابق على اطلاع تام بأحدث التقارير الاقتصادية، أخبار البنوك المركزية، وتحليلات الذهب والنفط والعملات الأجنبية لحظة بلحظة."
        : "Stay updated with the latest economic reports, central bank decisions, and gold, oil, and forex technical analysis in real-time.";
      canonicalUrl = `${baseUrl}/news`;
    }
  } else if (view === "school") {
    if (subId) {
      if (subId === "intro-forex" || subId === "intro_forex") {
        title = lang === "ar"
          ? "درس أساسيات سوق الفوركس للمبتدئين | مدرسة ديكوراFX للتداول"
          : "Forex Trading Basics Lesson for Beginners | DecouFX Academy";
        description = lang === "ar"
          ? "مرحباً بك في الدرس الأول. تعلم ما هو سوق العملات الأجنبية (الفوركس) وكيف يعمل وهيكل التداولات وصناع السوق بطريقة مبسطة."
          : "Welcome to lesson one. Learn what the foreign exchange market is, how it works, and how market makers operate in simple terms.";
        image = `${baseUrl}/forex_basics.jpg`;
      } else if (subId === "meme-coins-2026" || subId === "meme-coins") {
        title = lang === "ar"
          ? "مستقبل الاستثمار في عملات الميم وكيفية اغتنام الفرص بأمان | مدرسة ديكوراFX"
          : "The Future of Meme Coins Investment & How to Seize Opportunities | DecouFX";
        description = lang === "ar"
          ? "درس تعليمي شامل يشرح تحول عملات الميم إلى فئات أصول بمليارات الدولارات وكيفية تداولها وتجنب مخاطر الاحتيال الرقمي."
          : "A comprehensive lesson explaining the evolution of meme coins into multi-billion dollar assets and how to trade them safely while avoiding scams.";
        image = `${baseUrl}/meme_coins_2026_1787419226241.jpg`;
      } else if (subId === "gold-risk-management") {
        title = lang === "ar"
          ? "اداره مخاطر فوركس الذهب لعام 2026 وحماية رأس المال | مدرسة ديكوراFX"
          : "Forex Gold Risk Management 2026 Guide | DecouFX Academy";
        description = lang === "ar"
          ? "الدليل الحصري والشامل للاحتراف في اداره مخاطر فوركس الذهب ومعدلات اللوت المقترحة للحد من الانعكاس السعري وتأمين الحساب."
          : "Ultimate 2026 guide on Forex Gold Risk Management, lot sizing calculations, and drawdown mitigation for professional traders.";
        image = `${baseUrl}/gold_forex_risk_management_1787538156014.jpg`;
      } else {
        title = lang === "ar"
          ? "درس تعليمي مالي متقدم | مدرسة ديكوراFX للتداول"
          : "Advanced Trading Lesson | DecouFX Academy";
        description = lang === "ar"
          ? "دروس وشروحات عملية مبسطة لمساعدتك على احتراف أسواق المال وتحليل الرسوم البيانية وإدارة المخاطر باحترافية."
          : "Practical training lessons and tutorials to help you master financial markets, chart analysis, and professional risk management.";
      }
      canonicalUrl = `${baseUrl}/school/${subId}`;
    } else {
      title = lang === "ar"
        ? "أكاديمية تعليم التداول المجانية للمبتدئين والمحترفين | ديكوراFX"
        : "Free Trading Academy for Beginners & Advanced Traders | DecouFX";
      description = lang === "ar"
        ? "تعلم تداول العملات الأجنبية، المعادن، والمشتقات المالية خطوة بخطوة من خلال مقالات تفاعلية ودروس مبسطة لزيادة مهاراتك الاستثمارية."
        : "Learn to trade forex, commodities, and derivatives step-by-step through interactive lessons and clean tutorials designed to boost your skills.";
      canonicalUrl = `${baseUrl}/school`;
    }
  } else if (view === "signal") {
    title = lang === "ar"
      ? `توصية فوركس حية مباشرة ومفتوحة رقم ${subId} | ديكوراFX`
      : `Live Forex Signal Details #${subId} | DecouFX`;
    description = lang === "ar"
      ? "توصية تداول فوركس نشطة ومحدثة تشمل زوج العملات، اتجاه الصفقة، سعر الدخول المقترح، مستويات أخذ الأرباح ووقف الخسارة بدقة."
      : "Active live Forex signal including the specific currency pair, trade direction, suggested entry price, take profits, and stop loss levels.";
    canonicalUrl = `${baseUrl}/signal/${subId}`;
  } else if (view === "sitemap") {
    title = lang === "ar"
      ? "خريطة الموقع التفاعلية (Dynamic XML Sitemap) | ديكوراFX"
      : "Interactive Sitemap & Dynamic XML Links | DecouFX";
    description = lang === "ar"
      ? "تصفح الفهرس الشامل لروابط مدرسة التداول، التقارير الفنية، والتوصيات الحية في منصة ديكوراFX."
      : "Browse the comprehensive index of trading school lessons, technical reports, and live active signals on DecouFX.";
    canonicalUrl = `${baseUrl}/sitemap`;
  } else if (view === "privacy") {
    title = lang === "ar"
      ? "سياسة الخصوصية وسرية البيانات | منصة ديكوراFX"
      : "Privacy Policy & Data Security Statement | DecouFX";
    description = lang === "ar"
      ? "تعرف على معايير الأمان وحماية خصوصية بيانات زوار منصة ديكوراFX بما يتوافق مع السياسات العالمية."
      : "Learn about the high security standards and privacy rules protecting our users on DecouFX.";
    canonicalUrl = `${baseUrl}/privacy`;
  } else if (view === "terms") {
    title = lang === "ar"
      ? "الشروط والأحكام واتفاقية الاستخدام | ديكوراFX"
      : "Terms of Service & User Agreement | DecouFX";
    description = lang === "ar"
      ? "اتفاقية الاستخدام والشروط المنظمة لخدمات توصيات تداول العملات والمقالات التعليمية على منصة ديكوراFX."
      : "The legal terms of service and conditions governing forex signal distribution and education on DecouFX.";
    canonicalUrl = `${baseUrl}/terms`;
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

  // Server-side RSS proxy endpoint to bypass client-side CORS and AdBlocker restrictions
  app.get("/api/news", async (req, res) => {
    try {
      // Step 1: Try direct fetch and direct server-side parsing (extremely robust, bypasses third-party API limits)
      const rssResponse = await fetch("https://sa.investing.com/rss/news.rss", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        }
      });
      if (rssResponse.ok) {
        const xmlText = await rssResponse.text();
        const items: any[] = [];
        const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/gi);
        if (itemMatches && itemMatches.length > 0) {
          for (const itemXml of itemMatches) {
            const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/i);
            const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
            const authorMatch = itemXml.match(/<author>([\s\S]*?)<\/author>/i);
            const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i);
            const guidMatch = itemXml.match(/<guid(?: [^>]+)?>([\s\S]*?)<\/guid>/i);
            const descriptionMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/i);
            
            // For enclosure / image
            const enclosureMatch = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
            const enclosureUrl = enclosureMatch ? enclosureMatch[1] : "";

            const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').replace(/&lt;!\[CDATA\[([\s\S]*?)\]\]&gt;/gi, '$1').trim() : "";
            const pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
            const author = authorMatch ? authorMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').trim() : "Investing.com";
            const link = linkMatch ? linkMatch[1].trim() : "";
            const guid = guidMatch ? guidMatch[1].trim() : (link || Math.random().toString());
            const description = descriptionMatch ? descriptionMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').trim() : "";

            items.push({
              title,
              pubDate,
              pubdate: pubDate,
              link,
              guid,
              author,
              thumbnail: enclosureUrl,
              enclosure: enclosureUrl ? { link: enclosureUrl, type: "image/jpeg" } : undefined,
              description,
              content: description
            });
          }
          if (items.length > 0) {
            return res.json({
              status: "ok",
              feed: {
                url: "https://sa.investing.com/rss/news.rss",
                title: "كافة الأخبار",
                link: "https://sa.investing.com/",
                author: "",
                description: "",
                image: ""
              },
              items: items
            });
          }
        }
      }

      // Step 2: Try the converter if direct fetch failed
      const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://sa.investing.com/rss/news.rss");
      if (response.ok) {
        const data = await response.json();
        if (data && data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
          return res.json(data);
        }
      }
      throw new Error("Both direct and secondary feeds failed to produce results.");
    } catch (err: any) {
      console.error("Error in /api/news proxy, using offline high-fidelity fallbacks:", err);
      // Premium offline fallback news (20 items to fully satisfy 15+ request in grid)
      const mockItems = [
        {
          title: "تحديث عاجل: ترست يخفض السعر المستهدف لسهم وول مارت ستورز بسبب تراجع المبيعات المقارنة",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/stock-market-news/article-2459201",
          guid: "article-2459201",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPEM5L0UA_1200_L.jpg",
          description: "أعلنت ترست المالية عن تخفيض تقييمها لسهم وول مارت بسبب تباطؤ في المبيعات المقارنة.",
          content: ""
        },
        {
          title: "أسعار الذهب تلامس مستويات قياسية جديدة مع ترقب قرار الفيدرالي الأمريكي بشأن الفائدة",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459202",
          guid: "article-2459202",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/moved_LYNXMPEM450ND_1200_L.jpg",
          description: "ارتفعت العقود الآجلة للذهب وسط زيادة الإقبال على الملاذات الآمنة ترقباً للسياسة النقدية الجديدة.",
          content: ""
        },
        {
          title: "الدولار الأمريكي يستقر قبيل صدور بيانات مؤشر أسعار المستهلكين الأساسي",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/forex-news/article-2459203",
          guid: "article-2459203",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPEM0M17X_1200_L.jpg",
          description: "شهد مؤشر الدولار تداولات جانبية ضيقة بانتظار إشارات حاسمة حول التضخم الأمريكي.",
          content: ""
        },
        {
          title: "النفط يتراجع وسط مخاوف تباطؤ الطلب الصيني وزيادة المخزونات الأمريكية",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459204",
          guid: "article-2459204",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPEM5713J_1200_L.jpg",
          description: "تراجعت أسعار خام برنت وسط مؤشرات سلبية لنمو الاقتصاد الصيني وزيادة إمدادات الطاقة.",
          content: ""
        },
        {
          title: "البيتكوين يحافظ على مكاسبه فوق مستويات الدعم الرئيسية قبيل الإغلاق الأسبوعي",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/cryptocurrency-news/article-2459205",
          guid: "article-2459205",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPEM1P0ZM_1200_L.jpg",
          description: "استقرت العملة الرقمية الأكبر بعد موجة صعود قوية مدفوعة بتدفقات صناديق المؤشرات المتداولة.",
          content: ""
        },
        {
          title: "البنك المركزي الأوروبي يقرر خفض أسعار الفائدة بمقدار 25 نقطة أساس استجابة لتباطؤ التضخم",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/economy-news/article-2459206",
          guid: "article-2459206",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPEM50182_1200_L.jpg",
          description: "قرر البنك المركزي خفض سعر الفائدة الأساسي لدعم استقرار الأسواق بمنطقة اليورو.",
          content: ""
        },
        {
          title: "المؤشرات الأمريكية الرئيسية تفتتح على تباين وسط ترقب نتائج الربع السنوي لكبرى شركات التكنولوجيا",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/stock-market-news/article-2459207",
          guid: "article-2459207",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXNPEC1S0OV_M.jpg",
          description: "سجل مؤشر داو جونز مكاسب طفيفة بينما تراجع مؤشر ناسداك نتيجة لضغوط جني الأرباح.",
          content: ""
        },
        {
          title: "سهم إنفيديا يقود تعافي مؤشر ناسداك بارتفاع قياسي يتجاوز 5% في جلسة اليوم",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/stock-market-news/article-2459208",
          guid: "article-2459208",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPED990I2_M.jpg",
          description: "ارتفع سهم عملاق الرقائق الإلكترونية إنفيديا ليقود صعود قطاع أشباه الموصلات والتكنولوجيا الذكية.",
          content: ""
        },
        {
          title: "الين الياباني يقفز أمام العملات الرئيسية مع تزايد التكهنات برفع الفائدة من بنك اليابان",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/forex-news/article-2459209",
          guid: "article-2459209",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPEB2J0XY_M.jpg",
          description: "حققت العملة اليابانية مكاسب حادة بعد تصريحات قوية من مسؤولي السياسة النقدية في طوكيو.",
          content: ""
        },
        {
          title: "بيانات التضخم البريطانية تأتي أعلى من المتوقع وتدعم صعود الجنيه الإسترليني لقمة 4 أشهر",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/forex-news/article-2459210",
          guid: "article-2459210",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/LYNXMPED0C0KP_M.jpg",
          description: "ارتفع الإسترليني متأثراً بتوقعات إبقاء بنك إنجلترا على أسعار الفائدة مرتفعة لفترة أطول.",
          content: ""
        },
        {
          title: "سهم تسلا يرتفع بـ 4% بعد تقارير عن زيادة مبيعات السيارات الكهربائية في السوق الصينية",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/company-news/article-2459211",
          guid: "article-2459211",
          author: "Investing.com",
          thumbnail: "https://content-media.investing.com/news/Borsa-milan_M_1440048322.jpg",
          description: "تفاعل السهم إيجابياً مع مؤشرات قوية لارتفاع حصة تسلا في أكبر سوق للسيارات الكهربائية بالعالم.",
          content: ""
        },
        {
          title: "تراجع عائدات سندات الخزانة الأمريكية لأجل 10 سنوات لأدنى مستوى في 6 أشهر",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/economy-news/article-2459212",
          guid: "article-2459212",
          author: "Investing.com",
          thumbnail: "",
          description: "أدت توقعات التيسير النقدي القوي إلى هبوط العائد على السندات طويلة الأجل.",
          content: ""
        },
        {
          title: "ارتفاع الطلب على الفضة كأصل ملاذ آمن مع توقعات بتجاوز مستويات 32 دولاراً للأونصة",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459213",
          guid: "article-2459213",
          author: "Investing.com",
          thumbnail: "",
          description: "تشهد الفضة زخماً شرائياً قوياً مدعوماً بزيادة الاستخدامات الصناعية والتحوط الاستثماري.",
          content: ""
        },
        {
          title: "الأسواق المالية تترقب كلمة رئيس الاحتياطي الفيدرالي جيروم باول في ندوة جاكسون هول الاقتصادية",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/economy-news/article-2459214",
          guid: "article-2459214",
          author: "Investing.com",
          thumbnail: "",
          description: "ينتظر المتداولون أي تلميحات حول مسار أسعار الفائدة وحجم التخفيضات المتوقعة هذا العام.",
          content: ""
        },
        {
          title: "انكماش النشاط التصنيعي في منطقة اليورو يثير مخاوف الركود الاقتصادي من جديد",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/economy-news/article-2459215",
          guid: "article-2459215",
          author: "Investing.com",
          thumbnail: "",
          description: "تراجع مؤشر مديري المشتريات التصنيعي في ألمانيا وفرنسا مما يؤكد تواصل تباطؤ النمو بالمنطقة.",
          content: ""
        },
        {
          title: "سوق الأسهم السعودية (تداول) يغلق على ارتفاع مدعوماً بمكاسب قطاعي البنوك والطاقة",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/stock-market-news/article-2459216",
          guid: "article-2459216",
          author: "Investing.com",
          thumbnail: "",
          description: "أنهى مؤشر تاسي تداولاته في المنطقة الخضراء بدعم من صعود النفط وأداء قوي للأسهم القيادية.",
          content: ""
        },
        {
          title: "شركة آبل تكشف عن ميزات الذكاء الاصطناعي الجديدة وتوقعات بنمو قياسي في مبيعات آيفون",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/company-news/article-2459217",
          guid: "article-2459217",
          author: "Investing.com",
          thumbnail: "",
          description: "يتطلع المستثمرون إلى أن يسهم إدماج تقنيات الذكاء الاصطناعي المتقدمة في دعم مبيعات الأجهزة الجديدة.",
          content: ""
        },
        {
          title: "تراجع مخزونات النفط الخام الأمريكية بأكثر من المتوقع يدعم استقرار أسعار الطاقة",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/commodities-news/article-2459218",
          guid: "article-2459218",
          author: "Investing.com",
          thumbnail: "",
          description: "أظهرت بيانات إدارة معلومات الطاقة تراجعاً حاداً في مخزونات الخام مما حد من خسائر أسعار برنت ونايمكس.",
          content: ""
        },
        {
          title: "سهم مايكروسوفت يستقطب استثمارات قياسية بفعل تسارع نمو قطاع الخدمات السحابية Azure",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/company-news/article-2459219",
          guid: "article-2459219",
          author: "Investing.com",
          thumbnail: "",
          description: "أشادت بيوت الخبرة الاستثمارية بالنمو المستمر لعوائد الحوسبة السحابية المرتبطة بتقنيات الذكاء الاصطناعي.",
          content: ""
        },
        {
          title: "ارتفاع مؤشر ثقة المستهلك الأمريكي بأكثر من المتوقع في قراءة أولية تعزز تفاؤل الأسواق",
          pubDate: new Date().toISOString(),
          pubdate: new Date().toISOString(),
          link: "https://sa.investing.com/news/economy-news/article-2459220",
          guid: "article-2459220",
          author: "Investing.com",
          thumbnail: "",
          description: "سجل مؤشر ثقة المستهلك تحسناً ملموساً مدفوعاً باستقرار الأجور وتراجع طفيف في معدلات البطالة.",
          content: ""
        }
      ];
      return res.json({
        status: "ok",
        feed: {
          url: "https://sa.investing.com/rss/news.rss",
          title: "Investing.com - الأخبار الأكثر شعبية",
          link: "https://sa.investing.com",
          author: "",
          description: "الأخبار الأكثر شعبية",
          image: ""
        },
        items: mockItems
      });
    }
  });

  // API Endpoint to generate rich article content from RSS news titles using Gemini
  app.post("/api/generate-news-content", async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          content: `<p>عذراً، تفاصيل هذا الخبر متاحة حالياً عبر المصدر الأصلي فقط. يمكنك النقر على "قراءة الخبر من المصدر الأصلي" لمتابعة المقال الكامل.</p>`
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `أنت خبير اقتصادي ومحلل مالي محترف في أسواق المال والبورصات العالمية والعملات الرقمية والمعادن الثمينة (الذهب والفضة والنفط).
بناءً على عنوان الخبر العاجل التالي:
"${title}"

قم بكتابة تقرير أو مقال مالي تفصيلي وشامل ومقنع ومكتوب بلغة عربية فصحى ممتازة ومبسطة للمتداولين والمستثمرين.
يجب أن يتكون التقرير من 3 إلى 4 فقرات طويلة منسقة، ويشمل ما يلي:
1. مقدمة تشرح وتفصل مضمون عنوان الخبر بدقة.
2. تحليل فني وأساسي مبسط يشمل الأسباب الكامنة وراء هذا التحرك أو الحدث الاقتصادي، والسياق الحالي في الأسواق (مثل تأثير أسعار الفائدة من الفيدرالي الأمريكي، التضخم، أو الطلب العالمي).
3. التوقعات والسيناريوهات المستقبلية للأسعار أو الأصول المرتبطة (مثل الذهب، النفط، العملات الأجنبية الرئيسية، أو العملات الرقمية المعنية)، ونصائح استرشادية للمتداولين لكيفية التعامل مع هذا الحدث.

شروط هامة:
- لا تذكر في بداية المقال "أهلاً بكم" أو "هذا تقرير" أو أي مقدمات تمهيدية. ابدأ مباشرة في صياغة الخبر والتحليل.
- استخدم لغة احترافية تشبه قنوات Bloomberg وReuters وInvesting.
- قم بتنسيق الفقرات باستخدام وسوم HTML البسيطة مثل <p> للفقرات، و <strong> لتغميق الكلمات الهامة أو العناوين الفرعية، ولا تستخدم أي وسوم معقدة أو روابط خارجية.
- تأكد أن كل النصوص باللغة العربية وموجهة لمتداولي منصة "ديكوراFX" (DecouraFX).`;

      // Array of reliable Gemini models to try in sequence in case of 503 high demand or unavailability
      const modelsToTry = [
        "gemini-3.5-flash",
        "gemini-3.6-flash",
        "gemini-3.1-flash-lite"
      ];
      let generatedContent = "";
      let lastError = null;

      for (const modelName of modelsToTry) {
        try {
          console.log(`Attempting content generation with model: ${modelName}`);
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });
          if (response && response.text) {
            let text = response.text;
            // Clean any markdown code blocks or backticks to ensure raw HTML renders beautifully
            text = text.replace(/```html/gi, "").replace(/```/g, "").trim();
            generatedContent = text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed or unavailable:`, err?.message || err);
          lastError = err;
        }
      }

      if (!generatedContent) {
        // Safe, beautiful fallback response if all models are temporarily busy or rate limited
        generatedContent = `
          <p><strong>تنبيه مالي مباشر:</strong> تشهد البورصات والأسواق العالمية في هذه الأوقات تداولات نشطة وزخماً اقتصادياً مكثفاً للغاية.</p>
          <p>هذا الخبر العاجل يؤثر بشكل مباشر على شهية المخاطرة للمستثمرين في الأسواق والعملات الرئيسية والذهب. ننصح زوار ومتداولي منصة <strong>ديكوراFX</strong> بمتابعة الرسوم البيانية والأسعار اللحظية بشكل مباشر على منصتنا لمعرفة التأثير اللحظي لهذا الحدث الهام.</p>
          <p>للاطلاع على التغطية الشاملة للخبر فور صدورها من المحررين وقراءة المقال بالتفاصيل الأصلية، يرجى النقر على زر <strong>"زيارة المصدر الأصلي"</strong> في الأسفل لمتابعة المستجدات كاملة.</p>
        `;
      }

      res.json({ success: true, content: generatedContent });

    } catch (error: any) {
      console.error("Error generating news content:", error);
      res.status(500).json({ error: error.message || "Failed to generate news content" });
    }
  });

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

          const modelsToTry = [
            "gemini-3.5-flash",
            "gemini-3.6-flash",
            "gemini-3.1-flash-lite"
          ];
          let geminiResponse: any = null;
          let lastErr: any = null;

          for (const modelName of modelsToTry) {
            try {
              console.log(`Telegram parsing: attempting with model: ${modelName}`);
              const res = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                  responseMimeType: "application/json",
                }
              });
              if (res && res.text) {
                geminiResponse = res;
                break;
              }
            } catch (err: any) {
              console.warn(`Telegram parsing model ${modelName} failed or unavailable:`, err?.message || err);
              lastErr = err;
            }
          }

          if (!geminiResponse) {
            throw lastErr || new Error("All Gemini models failed to parse telegram signals");
          }

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

    const dynamicNewsUrls = initialNewsArticles.map((art: any) => ({
      loc: `${baseUrl}/news/${art.id}`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.95"
    }));

    const dynamicSchoolUrls = [
      { id: "gold-risk-management", priority: "0.98", changefreq: "daily" },
      { id: "intro-forex", priority: "0.90", changefreq: "weekly" },
      { id: "meme-coins", priority: "0.90", changefreq: "weekly" }
    ].map((sch: any) => ({
      loc: `${baseUrl}/school/${sch.id}`,
      lastmod: currentDate,
      changefreq: sch.changefreq,
      priority: sch.priority
    }));

    const dynamicSeoArticleUrls = ARTICLES_SEO.map((art: any) => ({
      loc: `${baseUrl}/news/${art.slug}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.85"
    }));

    const rawUrls: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [
      { loc: `${baseUrl}/`, lastmod: currentDate, changefreq: "always", priority: "1.0" },
      ...dynamicSchoolUrls,
      ...dynamicNewsUrls,
      ...getStoredSignals().map((sig: any) => ({
        loc: `${baseUrl}/signal/${sig.id}`,
        lastmod: currentDate,
        changefreq: "always",
        priority: "0.90"
      })),
      ...dynamicSeoArticleUrls,
      { loc: `${baseUrl}/news`, lastmod: currentDate, changefreq: "daily", priority: "0.90" },
      { loc: `${baseUrl}/school`, lastmod: currentDate, changefreq: "daily", priority: "0.90" },
      { loc: `${baseUrl}/sitemap`, lastmod: currentDate, changefreq: "always", priority: "0.70" },
      { loc: `${baseUrl}/privacy`, lastmod: currentDate, changefreq: "monthly", priority: "0.50" },
      { loc: `${baseUrl}/terms`, lastmod: currentDate, changefreq: "monthly", priority: "0.50" }
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

      const imageModels = [
        "gemini-3.5-flash",
        "gemini-3.6-flash",
        "gemini-3.1-flash-lite"
      ];
      let response: any = null;
      let lastErr: any = null;

      for (const modelName of imageModels) {
        try {
          console.log(`Football photo generation: attempting with model: ${modelName}`);
          const res = await ai.models.generateContent({
            model: modelName,
            contents: { parts: [imagePart, textPart] },
            config: {
              imageConfig: {
                aspectRatio: "1:1"
              }
            }
          });
          if (res && res.candidates && res.candidates[0]?.content?.parts) {
            response = res;
            break;
          }
        } catch (err: any) {
          console.warn(`Football photo generation with model ${modelName} failed or unavailable:`, err?.message || err);
          lastErr = err;
        }
      }

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
