import fs from "fs";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const ARTICLES_SEO = [
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

function getSeoMetaData(req: express.Request) {
  let lang = req.query.lang as string;
  const articleSlug = req.query.article as string;
  const view = req.query.view as string;

  if (lang !== "en" && lang !== "ar") {
    lang = "ar";
  }

  let title = "من يشبهك من لاعبي المونديال؟ | اختبار شخصية كرة القدم التفاعلي";
  let description = "اكتشف أي من أساطير كرة القدم العالمية يماثل شخصيتك وأسلوبك الرياضي في الملعب من خلال اختبار تفاعلي فائق وممتع متجدد باستمرار.";

  if (lang === "en") {
    title = "Which World Cup Player Are You? | Interactive Football Personality Quiz";
    description = "Discover your soccer match from world cup legends! A fun, highly-interactive football personality test analyzing your style and skill.";
  }

  if (view === "sitemap") {
    if (lang === "ar") {
      title = "خريطة الموقع المونديالي التفاعلي | dkora";
      description = "تصفح خريطة الموقع الكاملة وجميع الصفحات والمقالات والتحليلات الخاصة بمنصة مونديال كأس العالم ٢٠٢٦.";
    } else {
      title = "Mondial Interactive Sitemap | dkora";
      description = "Explore with one click all pages, articles, and utilities of the Mondial platform. Fully optimized for instant crawling.";
    }
  } else if (view === "blog") {
    if (lang === "ar") {
      title = "المقالات الرياضية والتحليلات التكتيكية | مونديال ٢٠٢٦";
      description = "اقرأ أحدث المقالات الرياضية الترند والتحليلات الكروية وتوقعات الذكاء الاصطناعي لبطل مونديال ٢٠٢٦.";
    } else {
      title = "Sports Articles & Tactical Analytics | Mondial 2026";
      description = "Read the latest trending sports articles, tactical soccer analytics, and AI predictions for the 2026 World Cup.";
    }
  }

  if (articleSlug) {
    const art = ARTICLES_SEO.find(a => a.slug === articleSlug);
    if (art) {
      if (lang === "ar") {
        title = art.titleAr;
        description = art.descAr;
      } else {
        title = art.titleEn;
        description = art.descEn;
      }
    }
  }

  const dir = lang === "ar" ? "rtl" : "ltr";
  return { title, description, lang, dir };
}

function replaceAllSeoMeta(html: string, seo: { title: string, description: string, lang: string, dir: string }) {
  let modified = html;

  // 1. replace html tag properties
  modified = modified.replace(/<html[^>]*>/gi, `<html lang="${seo.lang}" dir="${seo.dir}">`);

  // 2. replace <title>
  modified = modified.replace(/<title>[^<]*<\/title>/gi, `<title>${seo.title}</title>`);

  // 3. replace meta description
  modified = modified.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, `<meta name="description" content="${seo.description}" />`);
  modified = modified.replace(/<meta\s+content="[^"]*"\s+name="description"\s*\/?>/gi, `<meta name="description" content="${seo.description}" />`);

  // 4. replace og:title
  modified = modified.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:title" content="${seo.title}" />`);

  // 5. replace og:description
  modified = modified.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="og:description" content="${seo.description}" />`);

  // 6. replace twitter:title
  modified = modified.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/gi, `<meta property="twitter:title" content="${seo.title}" />`);

  // 7. replace twitter:description
  modified = modified.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/gi, `<meta property="twitter:description" content="${seo.description}" />`);

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

  // Increase body size limits for base64 image uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

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

    // Intercept standard page load requests to inject dynamic SEO headers for bots/sharers
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes, statics, and direct asset files
      if (url.startsWith("/api") || url.includes(".") || req.headers.accept?.includes("application/json")) {
        return next();
      }

      try {
        let html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        html = await vite.transformIndexHtml(url, html);
        const seo = getSeoMetaData(req);
        html = replaceAllSeoMeta(html, seo);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.middlewares(req, res, next);
      }
    });

    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode.");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files without automatically serving the raw index.html automatically
    app.use(express.static(distPath, { index: false }));
    
    app.get("*", (req, res) => {
      try {
        let html = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        const seo = getSeoMetaData(req);
        html = replaceAllSeoMeta(html, seo);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
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
