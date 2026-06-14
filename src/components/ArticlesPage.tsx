import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, Search, Copy, Check, Share2, CornerDownLeft, Sparkles, Award, TrendingUp, Flame } from 'lucide-react';
import ayyoubBouaddiCard from '../assets/images/ayyoub_bouaddi_card_1781406003674.jpg';

interface Article {
  id: string;
  slug: string;
  categoryAr: string;
  categoryEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  keywordsAr: string[];
  keywordsEn: string[];
  image: string;
  date: string;
  readTime: string;
  contentAr: {
    toc: string[];
    sections: {
      title: string;
      body: string;
      points?: string[];
      note?: string;
    }[];
    faqs: { q: string; a: string }[];
  };
  contentEn: {
    toc: string[];
    sections: {
      title: string;
      body: string;
      points?: string[];
      note?: string;
    }[];
    faqs: { q: string; a: string }[];
  };
}

const ARTICLES_DATA: Article[] = [
  {
    id: "art-ayyoub-bouaddi-age",
    slug: "how-old-is-ayyoub-bouaddi",
    categoryAr: "مواهب كرة القدم الصاعدة",
    categoryEn: "Rising Football Talents",
    titleAr: "كم عمر أيوب بوعدي؟ نجم ليل الفرنسي ومستقبله الكروي لعام 2026",
    titleEn: "How Old is Ayyoub Bouaddi? Lille's Rising Prodigy Age & Profile in 2026",
    descAr: "اكتشف عمر أيوب بوعدي الحقيقي، سجله الكروي المبهر مع نادي ليل ومستقبله الدولي بين منتخبي المغرب وفرنسا في تحليل رياضي شامل متوافق مع سيو 2026.",
    descEn: "Discover the exact age of Ayyoub Bouaddi, his outstanding career stats with Lille OSC, and his international future between France and Morocco in a complete 2026 tactical profile.",
    keywordsAr: ["كم عمر ايوب بوعدى", "أيوب بوعدي لاعب ليل", "عمر ايوب بوعدى", "أيوب بوعدي مغربي", "مواهب ليل الفرنسي ٢٠٢٦"],
    keywordsEn: ["how old is ayyoub bouaddi", "ayyoub bouaddi age", "ayyoub bouaddi lille osc", "ayyoub bouaddi profile 2026", "ayyoub bouaddi morocco or france"],
    image: ayyoubBouaddiCard,
    date: "2026-06-13",
    readTime: "5 min read",
    contentAr: {
      toc: [
        "1. كم عمر أيوب بوعدي في عام 2026؟",
        "2. من هو أيوب بوعدي؟ معلومات عامة وموقع اللعب",
        "3. المسيرة الاحترافية الاستثنائية مع نادي ليل (Lille OSC)",
        "4. الصراع الدولي المثير: هل يختار المغرب أم فرنسا؟"
      ],
      sections: [
        {
          title: "1. كم عمر أيوب بوعدي في عام 2026؟",
          body: "ولد النجم الشاب أيوب بوعدي في 2 أكتوبر من عام 2007 في مدينة كريل بفرنسا. وبناءً على ذلك، فإن عمر أيوب بوعدي في عام 2026 هو 18 عاماً (حيث سيتم عامه التاسع عشر في أكتوبر من العام الجاري). يمثل هذا اللاعب الصغير ظاهرة كروية حقيقية، حيث استطاع وهو في هذا السن المبكر حجز مقعد أساسي في خط وسط أحد أعرق الأندية الفرنسية ومنافسة الكبار في دوري أبطال أوروبا والبطولات القارية.",
          points: [
            "تاريخ الولادة: 2 أكتوبر 2007 (Creil, France).",
            "العمر الفعلي في يونيو 2026: 18 سنة وثمانية أشهر.",
            "استحقاق دولي مبكر جداً ومعدلات بدنية خارقة تفوق سنه الحقيقي."
          ]
        },
        {
          title: "2. من هو أيوب بوعدي؟ معلومات عامة وموقع اللعب",
          body: "ينشط أيوب بوعدي كلاعب وسط ملعب متكامل (Central Midfielder / Defensive Midfielder). يتميز اللاعب بطول فاره يبلغ 1.85 مترًا، مما يمنحه تفوقاً في الالتحامات الهوائية وافتكاك الكرات، إلى جانب رؤية فنية ثاقبة وقدرة استثنائية على الخروج بالكرة تحت الضغط العالي ومواجهة منظومات الوسط الصعبة.",
          points: [
            "الارتفاع الفني: 185 سم من القوة والصلابة البدنية.",
            "موقع اللعب: لاعب وسط ارتكاز محوري (بين الرابط والمدمر البنيوي).",
            "الذكاء المكاني والقدرة على التحكم في رتم المباراة بأناقة وهدوء تام."
          ]
        },
        {
          title: "3. المسيرة الاحترافية الاستثنائية مع نادي ليل (Lille OSC)",
          body: "صعد أيوب بوعدي عبر الفئات السنية لنادي ليل الفرنسي وتألق بشكل لافت، حيث جذب انتباه كبار كشافي القارة الأوروبية. لقد شارك في مباريات حاسمة بالدوري الفرنسي ضد باريس سان جيرمان ومارسيليا، وقدم عروضاً تاريخية في دوري أبطال أوروبا والكونفرنس ليغ برهنت على تمتعه بمرونة ذهنية وشجاعة فنية غير تقليدية تصنع الفارق للكرة الحديثة.",
          points: [
            "أصغر لاعب يشارك في بطولة أوروبية رسمية بعمر 16 عاماً ويوم واحد.",
            "معدل تمرير صحيح يتجاوز 90% تحت قيادة تكتيكية حازمة.",
            "متابعة دورية ولصيقة من كبار أندية الدوري الإنجليزي والإسباني لضمه في عام 2026."
          ]
        },
        {
          title: "4. الصراع الدولي المثير: هل يختار المغرب أم فرنسا؟",
          body: "يمتلك النجم الشاب أصولاً مغربية عريقة بجانب جنسيته الفرنسية وبلد المولد. وبينما مثل الفئات السنية للمنتخب الفرنسي (تحت 17 وتحت 20 عاماً)، إلا أن الاتحاد الملكي المغربي لكرة القدم يعمل بجد لإقناع الموهبة اليافعة بالانضمام إلى أسود الأطلس ومجاورة حكيمي ومزراوي في تشكيلة المونديال الأسطورية لعام 2026، مما يجعل اختياره القادم محط أنظار ملايين العشاق بالوطن العربي والشرق الأوسط.",
          note: "الرأي الفني: أياً كان اختيار أيوب بوعدي الدولي، فإن الساحة الرياضية تشهد ولادة مايسترو عبقري سيسيطر على خطوط الوسط العالمية للعقد القادم بالتأكيد!"
        }
      ],
      faqs: [
        {
          q: "ما هو تاريخ ميلاد اللاعب أيوب بوعدي؟",
          a: "ولد أيوب بوعدي في 2 أكتوبر 2007 في مدينة كريل الكائنة في فرنسا."
        },
        {
          q: "ما هو الفريق الحالي للاعب أيوب بوعدي؟",
          a: "يلعب أيوب بوعدي بشكل أساسي لصالح نادي ليل (Lille OSC) في الدوري الفرنسي الممتاز ويرتدي القميص رقم 20."
        },
        {
          q: "هل قرر أيوب بوعدي تمثيل منتخب المغرب رسمياً؟",
          a: "تمثيل أيوب بوعدي الدولي لا يزال معلقاً بين فرنسا والمغرب؛ حيث لعب لمنتخبات فرنسا للشباب، لكن المفاوضات مستمرة لتمثيل منتخب المغرب الأول في المحافل الدولية القادمة."
        }
      ]
    },
    contentEn: {
      toc: [
        "1. How Old is Ayyoub Bouaddi in 2026?",
        "2. Who is Ayyoub Bouaddi? Key Data & Position",
        "3. Historic Rise & Performance with Lille OSC",
        "4. International Tug-of-war: France or Morocco?"
      ],
      sections: [
        {
          title: "1. How Old is Ayyoub Bouaddi in 2026?",
          body: "Born on October 2, 2007, in Creil, France, Ayyoub Bouaddi is officially 18 years old in June 2026. He will celebrate his 19th birthday in October of this year. Despite his exceptionally young age, Bouaddi has established himself as a critical asset in French professional soccer, commanding high-end composure that easily places him among Europe's finest next-generation midfield orchestrators.",
          points: [
            "Birthdate: October 2, 2007 (Creil, France).",
            "Current age as of mid-2026: 18 years, 8 months.",
            "Displays physically mature game-reading parameters far exceeding his actual age."
          ]
        },
        {
          title: "2. Who is Ayyoub Bouaddi? Key Data & Position",
          body: "Standing tall at 1.85m (6 ft 1 in), Ayyoub Bouaddi is a dual-threat box-to-box midfielder who can seamlessly transition into a deep defensive anchor. Known for high spatial vision, ball recovery, and elegant tactical escapes, his athletic profile allows him to dominate high-intensity physical duels under pressure.",
          points: [
            "Height: 185 cm of strong physical balance and reach.",
            "Position: Central / Defensive Midfielder (Regista / Box-to-Box archetype)."
          ]
        },
        {
          title: "3. Historic Rise & Performance with Lille OSC",
          body: "Bouaddi holds the historic milestone of being the youngest player ever to feature in an official UEFA club competition, making his debut on October 5, 2023, at just 16 years and 1 day old. Since then, his progression under Lille’s technical development has been meteoric, proving fundamental against Ligue 1 heavyweights and attracting transfer inquiries from major Premier League and La Liga clubs in the 2026 summer window.",
          points: [
            "Youngest ever debutant in European cup history at 16 years old.",
            "Consistently logs over 90% pass accuracy rates in high-stakes matches.",
            "Closely watched by top European clubs for potential blockbuster transfers in mid-2026."
          ]
        },
        {
          title: "4. International Tug-of-war: France or Morocco?",
          body: "Holding dual French and Moroccan citizenship, Bouaddi's international allegiance remains a thrilling topic. Having represented France up to Under-20 levels, the Royal Moroccan Football Federation is putting significant effort into securing his senior commitment for the national team's prestigious upcoming events, marking him as a future cornerstone for whichever side he chooses.",
          note: "Tactical Prediction: Regardless of the jersey he wears, Ayyoub Bouaddi is primed to be a world-class midfielder dictating the tempo of global football for the next decade."
        }
      ],
      faqs: [
        {
          q: "When was Ayyoub Bouaddi born?",
          a: "Ayyoub Bouaddi was born on October 2, 2007, in Creil, France."
        },
        {
          q: "What team does Ayyoub Bouaddi play for?",
          a: "He plays as a central midfielder for French Ligue 1 side Lille OSC."
        },
        {
          q: "Is Ayyoub Bouaddi going to play for Morocco?",
          a: "While he has played for youth squads of France, Morocco is actively recruiting him for their senior project, and he is yet to make his final official senior debut announcement."
        }
      ]
    }
  },
  {
    id: "art-football-ai-match",
    slug: "how-to-find-world-cup-match-ai",
    categoryAr: "تحليلات الذكاء الاصطناعي الرياضية",
    categoryEn: "AI Sports Analytics",
    titleAr: "كيف تكتشف شبيهك الكروي من لاعبي المونديال بدقة بالذكاء الاصطناعي؟",
    titleEn: "How to Find Your Exact World Cup Player Match Using Gemini AI",
    descAr: "دليلك الميداني الشامل المحدث لعام ٢٠٢٦ لاستغراق ذكاء الاستكشاف، ومطابقة السمات التكتيكية مع نجوم المونديال، وتوليد بطاقة مدمجة بالذكاء الاصطناعي بصفة ترويحية آمنة.",
    descEn: "Your comprehensive guide to exploring soccer styles, mapping your athletic skills, and synthesizing a personalized player card using modern secure generative models.",
    keywordsAr: ["تحليل شبيهك المونديالي", "من يشبهك من لاعبي كرة القدم", "ذكاء اصطناعي كروي", "بطاقة لاعب المونديال ٢٠٢٦", "دمج الوجه بالذكاء الاصطناعي"],
    keywordsEn: ["world cup player matcher", "footballer lookalike ai", "sports personality test", "gemini soccer card builder", "secure facial blender"],
    image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop",
    date: "2026-06-12",
    readTime: "6 min read",
    contentAr: {
      toc: [
        "1. دور التحليل الرقمي في استكشاف الشخصية الكروية لعام ٢٠٢٦",
        "2. كيف تقوم البوابة بمطابقة إجاباتك التكتيكية مع أسلوب ميسي، رونالدو، أو مبابي؟",
        "3. ميزة الدمج الذكي (بورتريه الاستاد): خصوصية صورك الشخصية دون تخزين",
        "4. خطوات عملية للوصول لأدق مطابقة وتوليد بطاقتك الرياضية النادرة"
      ],
      sections: [
        {
          title: "1. دور التحليل الرقمي في استكشاف الشخصية الكروية لعام ٢٠٢٦",
          body: "في المشهد الرياضي الحديث لعام ٢٠٢٦، تجاوز تحليل البيانات مجرد رصد الأهداف ليشمل سلوك اللاعبين على أرضية الملعب وذكائهم التكتيكي. اختبار «شبيهك الكروي» ليس مجرد لعبة ترفيهية، بل هو محرك استدلالي يحلل عقلية اتخاذ القرار، دور اللياقة البدنية، والانضباط الدفاعي لمطابقتك رياضياً مع النجم المونديالي الذي يشترك معك في نفس فلسفة اللعب.",
          points: [
            "الربط العلمي بين الرغبة الهجومية الفردية ومهام صانعي اللعب الكلاسيكية.",
            "مقارنة معدل الإسهام الدفاعي مع محاور الارتكاز الأقوى تاريخياً.",
            "استكشاف الجانب النفسي للرياضي لتحديد مستويات الحركية والتفاعل داخل المستطيل الأخضر."
          ],
          note: "نصيحة تكتيكية: للحصول على أدق نتيجة، قم بالإجابة على الأسئلة بناءً على أسلوبك الحقيقي وموقعك المفضل الذي تبرع به عندما تلعب مع أصدقائك!"
        },
        {
          title: "2. كيف تقوم البوابة بمطابقة إجاباتك التكتيكية مع أسلوب ميسي، رونالدو، أو مبابي؟",
          body: "تقوم خوارزمية البوابة الرياضية باحتساب درجات إجاباتك ضمن محاور موزونة بدقة تشمل المهارة الفردية، السرعة، الالتحام البدني، والدور الجماعي. يتم بعد ذلك قياس المسافة الإحصائية بين سكور أدائك والبيانات الفنية المحدثة لنجوم المونديال لتحديد اللاعب الأكثر شبهاً بك بنسبة مئوية تظهر فخرك الكروي.",
          points: [
            "طراز المهاجم السريع (مثل مبابي وهالاند) يحتاج سكور سرعة واستغلال مساحات مرتفع.",
            "المايسترو المبدع (مثل ميسي ومودريتش) يعتمد على دقة التمرير وصناعة الفرص تحت الضغط.",
            "الصخرة الدفاعية الصلبة (مثل فان دايك) تستلزم معدلات عالية في الالتحام والمواقع الدفاعية."
          ]
        },
        {
          title: "3. ميزة الدمج الذكي (بورتريه الاستاد): خصوصية صورك الشخصية دون تخزين",
          body: "نرفع في بوابتنا شعار الحماية المطلقة للبيانات. عند تفعيل واجهة دمج البورتريه بالذكاء الاصطناعي، يتم التقاط أو رفع صورتك الشخصية وتمريرها بأمان تشفيري فوري لمطابقتها مع اللاعب. لا يتم تخزين الصورة على خوادمنا نهائياً بل يتم تدميرها بمجرد تسليمك كارت اللاعب المشترك المطبوع رقمياً.",
          points: [
            "أمان كامل بنسبة ١٠٠٪ دون استغلال أو تداول لملامحك الفردية.",
            "دمج واقعي للملامح بقميص المنتخب المفضل وتحت الأضواء الغامرة للمعشب الأخضر.",
            "إمكانية تنزيل وتحميل بطاقتك الرياضية فوراً مجاناً بدون إضافات مشوهة للرؤية."
          ]
        },
        {
          title: "4. خطوات عملية للوصول لأدق مطابقة وتوليد بطاقتك الرياضية النادرة",
          body: "للحصول على تصدير فاخر خالٍ من العيوب وحصد بطاقة روعة بنسبة تشابه مذهلة، اتبع التاليات:",
          points: [
            "قم بحل الـ ٩ أسئلة التكتيكية بروح رياضية وصدق تكتيكي.",
            "احرص على رفع صورة شخصية واضحة المعالم، مواجهة للكاميرا، وذات إضاءة جيدة خالية من التعمية.",
            "اضغط على زر الدمج الذكي ودع السحابة التوليدية تركب تفاصيل ملامحك بقميص فريقك.",
            "قم بتحميل كارت المونديال الناتج بجودته الكاملة وشاركه فوراً في قصصك ومجموعات الواتساب مع أصدقائك لمقارنة من منكم يمتلك شبهاً بنجم النخبة الأبرز!"
          ]
        }
      ],
      faqs: [
        {
          q: "هل الاختبار والدمج بالذكاء الاصطناعي مجاني تماماً؟",
          a: "نعم، البوابة تقدم خدمات التحليل وبناء البورتريه المدمج مجاناً ١٠٠٪ وبصورة سريعة لدعم روح المغامرة الكروية لعشاق اللعبة رقمياً."
        },
        {
          q: "كيف تحافظ البوابة على خصوصية صوري؟",
          a: "يتم فك تشفير الصورة المدخلة لحظياً لتهيئتها وعجن الملامح مع اللاعب من خلال نموذج التوليد الآمن، ولا يتم حفظ أي بكسل مع تدمير الملف الأصلي تلقائياً."
        }
      ]
    },
    contentEn: {
      toc: [
        "1. The Crucial Role of Analytics in Spotting Soccer Personas",
        "2. Decoupling the Tactical Mapping Algorithm: Messi, Ronaldo, or Mbappe?",
        "3. Secure Portrait Blending: Your visual privacy is totally secure",
        "4. Practical steps to secure your high-fidelity World Cup Player Card"
      ],
      sections: [
        {
          title: "1. The Crucial Role of Analytics in Spotting Soccer Personas",
          body: "In the modern sports ecosystem of 2026, data mapping has evolved to capture the dynamic essence of a player’s decision-making and strategic thinking. Our player matcher is designed not just for fun but to score your agility, collective spirit, and tactical focus against actual historical football legends.",
          points: [
            "Maps individual offensive desire with standard playmaker blueprints.",
            "Compares defensive contribution stats to historical midfield engines.",
            "Estimates psychological attributes like endurance, speed, and positioning factors."
          ],
          note: "Pro tip: For the most accurate result, answer each question honestly based on how you actually behave when playing with friends!"
        },
        {
          title: "2. Decoupling the Tactical Mapping Algorithm: Messi, Ronaldo, or Mbappe?",
          body: "The engine scores your inputs across balanced channels (technique, pace, grit, and strategy) and maps the statistical distance to World Cup stars to reveal your closest lookalike with precision percentage accuracy.",
          points: [
            "Fast counters and clinical pace require high scores in agility and space utilization.",
            "Playmaking masters (like Messi or Modric) demand precision in tight spots and deep vision.",
            "Defensive giants require solid statistics in physical intercepts, strength, and spatial awareness."
          ]
        },
        {
          title: "3. Secure Portrait Blending: Your visual privacy is totally secure",
          body: "We operate on absolute user privacy protocols. When utilizing our generative AI face and jersey blending tool, your picture is converted on-the-fly and overlaid over the kit. No photos are stored permanently.",
          points: [
            "100% secure process with immediate deletion checkpoints of visual inputs.",
            "Photorealistic merger into national team jersey designs on professional stadium green fields.",
            "High-resolution downloads ready for print or custom social media setups with zero watermarks."
          ]
        },
        {
          title: "4. Practical steps to secure your high-fidelity World Cup Player Card",
          body: "To generate a clean, stunning card and maximize likeness to your favorite superstar, apply these steps:",
          points: [
            "Complete all 9 query points truthfully according to your physical style.",
            "Upload an even-light, forward-looking selfie with zero sunglasses or obstructions.",
            "Trigger the Face-Blending loop and let the secure backend generate your stadium canvas.",
            "Download your output player card and share it on forums or chat groups to start soccer debates!"
          ]
        }
      ],
      faqs: [
        {
          q: "Is this tactical match and AI generation service free of charge?",
          a: "Completely. You can calculate your star match and generate unlimited customized player portraits for free."
        },
        {
          q: "Are my uploaded personal selfies secure on dkora?",
          a: "Absolutely. Images are parsed transiently to process coordinates and generate the merged output, followed by immediate server deletion checkmarks."
        }
      ]
    }
  },
  {
    id: "art-football-tactics-2026",
    slug: "modern-soccer-tactics-rating-stars",
    categoryAr: "تكتيكات كروية وتحليل فني",
    categoryEn: "Tactical Football Analysis",
    titleAr: "تحليل السمات التكتيكية لمهاجمي وصناع لعب كأس العالم ٢٠٢٦",
    titleEn: "Analyzing Modern Tactical Archetypes in the 2026 Soccer Era",
    descAr: "دراسة معقمة وممتعة حول تطور مراكز المهاجم الوهمي، وصانع اللعب العصري، وكيف نقيم هذه الأرقام رياضياً لمطابقة من يشبهك بدقة بالغة.",
    descEn: "A thorough analytical exploration of the False 9, modern box-to-box creators, and how our quiz metrics map your profile to top international champions.",
    keywordsAr: ["تحليل تكتيكات كرة القدم", "المهاجم الوهمي المفقود", "كيف تلعب صانع لعب", "تقييم لاعبي المونديال", "أفكار كروية ٢٠٢٦"],
    keywordsEn: ["soccer positioning formats", "false 9 tactical guide", "modern playmaker traits", "world cup statistics analysis", "football training tips"],
    image: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?q=80&w=800&auto=format&fit=crop",
    date: "2026-06-11",
    readTime: "5 min read",
    contentAr: {
      toc: [
        "1. تطور تكتيكات كرة القدم الحديثة: من الكلاسيكية للذكاء اللامركزي",
        "2. سمات المهاجم الحاسم ضد صانع اللعب الكروي الملهم",
        "3. كيف نحسب معامل الدقة والتحكم لتعيين نجمك الشبيه"
      ],
      sections: [
        {
          title: "1. تطور تكتيكات كرة القدم الحديثة: من الكلاسيكية للذكاء اللامركزي",
          body: "في كرة القدم الحديثة لعام ٢٠٢٦، تداخلت الخطوط التقليدية تماماً. لم يعد المدافع مجرد قاطع للكرات، بل هو خط الوسط الأول لتوزيع اللعب، ولم يعد المهاجم مجرد قناص صندوق بل يتحرك كجناح مهاجم وهمي يخلخل صفوف الخصوم ويصنع المساحات للقادمين من الخلف.",
          points: [
            "نشوء هجين البناء الخلفي بلمح البصر والتحول الفوري من الدفاع للهجوم.",
            "أهمية مرونة المراكز ومشاركة كافة الفريق بالضغط العكسي الخانق.",
            "تثمين الذكاء الموقعي (Spatial Intelligence) كأهم مؤشر أداء فني."
          ]
        },
        {
          title: "2. سمات المهاجم الحاسم ضد صانع اللعب الكروي الملهم",
          body: "بينما يعتمد القناصون أمثال إيرلينغ هالاند وكليان مبابي على اقتناص التفاصيل البسيطة والسرعات الجنونية لإسكان الكرة الشباك، يبرز صانعو اللعب الاستثنائيون أمثال محمد صلاح وكيفن دي بروين بقدرات ممتازة على رؤية الزوايا المخفية وتمرير كرات حريرية تكسر الدفاعات في ثانية واحدة.",
          points: [
            "المهاجم يستلزم برودة أعصاب مطلقة في مواجهة المرمى وسرعة بديهة حركية.",
            "المهندس الفني للفريق يربط الدوائر ويمتلك مهارة المداورة والتحكم المحيطي بالكرة.",
            "الارتداد السريع واللياقة المتفجرة تمثل القاسم المشترك بين كافة أدوار النخبة."
          ]
        },
        {
          title: "3. كيف نحسب معامل الدقة والتحكم لتعيين نجمك الشبيه",
          body: "اختبارنا المونديالي يضع في الحسبان كافة عناصر هذه التركيبة. عندما تختار إجاباتك المفضلة حيال ردة فعلك في لقطة هجومية أو طريقة توجيهك لفريقك، تتراكم البيانات الحيوية لترسم بروفايلك الرياضي بدقة تمكننا من إفراز النجم التكتيكي الأقرب لنمط تفكيرك وجسدك الرياضي.",
          note: "تذكر: لا توجد إجابة صحيحة وخاطئة؛ بل يوجد أسلوب لعب فريد يعبر عن ملامح وعظمة هويتك الكروية!"
        }
      ],
      faqs: [
        { q: "من هم المهاجمون الأكثر تشابهاً مع هالاند في معايير الاختبار؟", a: "يتشابه معه أصحاب النزعة الهجومية المطلقة، معايير التسديد المتفجر، وفلسفة اللعب المباشر دون تعاقدات تكتيكية معقدة." },
        { q: "هل يتأثر الاختبار بتشجيعي لبرشلونة، ريال مدريد، أو الهلال؟", a: "الاختبار يقيس الذكاء الكروي وطريقة اللعب الفعلية لك، وليس مجرد انتمائك الرياضي، لضمان استخلاص نتيجة حقيقية وعميقة." }
      ]
    },
    contentEn: {
      toc: [
        "1. Evolution of Modern Football Formations: Fluid Tactical Frameworks",
        "2. Clinical Finishers vs Creative Playmaking Architects",
        "3. Deciphering player maps in our customized matching algorithms"
      ],
      sections: [
        {
          title: "1. Evolution of Modern Football Formations: Fluid Tactical Frameworks",
          body: "In the 2026 soccer tactical scene, old positional lines have faded. Defending players no longer just block; they act as primary distribution hubs. Similarly, elite forwards move fluidly wide or drop deep, reshaping space dynamics.",
          points: [
            "Rapid vertical transition schemes dominate contemporary playbooks.",
            "High-pressing and counter-pressing defensive architectures require massive stamina.",
            "Spatial awareness is now ranked as the most vital performance metrics."
          ]
        },
        {
          title: "2. Clinical Finishers vs Creative Playmaking Architects",
          body: "While pure killers like Erling Haaland rely on rapid speed bursts and raw physicality to strike, visionaries like Kevin De Bruyne or Leo Messi leverage subtle spaces, changing spatial angles to construct paths that dissect deep defensive lines.",
          points: [
            "Strikers require cold composure in front of the target and split-second reactivity.",
            "Midfield generals connect visual patterns and maintain perfect orbital possession.",
            "A fast transition work-rate remains the baseline demand for modern team captains."
          ]
        },
        {
          title: "3. Deciphering player maps in our customized matching algorithms",
          body: "Our World Cup quiz compiles these attributes dynamically. Setting preferences on high-pressure moments dictates your unique playing style, matching you neatly to the sports idol sharing those same parameters.",
          note: "Remember: There is no wrong answer. Every choice reveals a beautiful facet of your footballing brain!"
        }
      ],
      faqs: [
        { q: "Which playstyle matches closest with Erling Haaland’s profile?", a: "Forwards who prefer explosive direct attacks, high physical threat scores, and finishing clinical chances first-time." },
        { q: "Is the final output influenced by my favorite team affiliation?", a: "No, the calculations are strictly based on tactical performance answers to ensure realistic match compatibility." }
      ]
    }
  },
  {
    id: "art-football-ai-blend",
    slug: "how-to-blend-face-football-jersey",
    categoryAr: "دليل توليد الصور والرياضة",
    categoryEn: "AI Imagery & Creative Sports",
    titleAr: "دليلك الكامل لدمج ملامح وجهك بقميص منتخبك المفضل بالذكاء الاصطناعي",
    titleEn: "Step-by-Step Tutorial: Blending Your Face into Your Favorite Jersey",
    descAr: "كيف تستخدم الأداة بشكل صحيح لالتقاط صور السيلفي وتركيب الملامح على نجوم كأس العالم في خطوة واحدة والحصول على بطاقات جاهزة للنشر الفوري.",
    descEn: "Learn how to use our secure generative face-merging portal safely. Get premium player cards seamlessly blended with your face inside stadium backdrops.",
    keywordsAr: ["دمج الوجه بقميص لاعب", "تصميم كرت لاعب بالملامح واجوه", "الذكاء الاصطناعي المونديالي", "صانع بطاقات اللاعبين", "كيف اركب صورتي مع ميسي"],
    keywordsEn: ["face swap football jersey", "custom soccer card compiler", "avatar creator world cup", "footballer face blender tool", "free soccer generator"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop",
    date: "2026-06-10",
    readTime: "4 min read",
    contentAr: {
      toc: [
        "1. فلسفة الدمج الثنائية بالذكاء الاصطناعي: الملاءمة والجمال البصري",
        "2. شروط الصورة الشخصية الناجحة للحصول على نواتج مذهلة ومتطابقة",
        "3. كيفية تحميل المقاس النهائي وحفظ البطاقة بأعلى دقة سلبكسلية"
      ],
      sections: [
        {
          title: "1. فلسفة الدمج الثنائية بالذكاء الاصطناعي: الملاءمة والجمال البصري",
          body: "تتيح أداتنا توليد وبناء شكل افتراضي يجمع بين ملامحك الطفولية والرجولية وبنية الكابتن الرياضي بقميص فريقه الوطني. يدمج محرك الذكاء الاصطناعي عناصر الإضاءة المسرحية للملعب وظلال الوجوه لتنصهر الملامح بشكل كامل وطبيعي للغاية دون ظهور طبقات أو عيوب تشويه حادة.",
          points: [
            "تطابق ممتاز لتدرجات البشرة واللحية وظلال الرأس.",
            "مراعاة خطوط وميلان الالتفات والملامح ثلاثية الأبعاد.",
            "توفير زاوية رؤية درامية تنافس بطاقات الألعاب التفاعلية الشهيرة الكبرى."
          ]
        },
        {
          title: "2. شروط الصورة الشخصية الناجحة للحصول على نواتج مذهلة ومتطابقة",
          body: "برمجة توليد الوجوه حساسة جداً للتفاصيل البصرية. للحصول على كارت لاعب ممتاز ومبهر يسلب الألباب، احرص على تلبية الشروط الأساسية التالية في صورتك المرفوعة للدمج كلاعب:",
          points: [
            "أن تكون الصورة واضحة الملامح، ملتقطة من زاوية أمامية مباشرة للعين (سيلفي أو بورتريه رسمي).",
            "إضاءة متوازنة تسقط بشكل متساوٍ على الوجه بأكمله لتجنب الظلال الحادة التي تربك المحرك.",
            "تفادي النظارات الشمسية، أو تغطية الرأس بشعر مائل، أو استخدام فلاتر التجميل الثقيلة التي تحجب تفاصيل البشرة والشخصية."
          ]
        },
        {
          title: "3. كيفية تحميل المقاس النهائي وحفظ البطاقة بأعلى دقة سلبكسلية",
          body: "بمجرد توليد صورتك التفاعلية مرتدياً قميص المونديال، يمكنك استخدام محرك التصدير الفوري بالأسفل. يقوم المحرك برسم كامل تفاصيل الكارت (الاسم، البلد، الهجوم، الدفاع، والبورتريه المولد) ثم تجميعها وتجهيزها بملف صورة PNG فائقة النقاوة، لتنقر بلمسة زر واحدة على 'تحميل بطاقة اللاعب' وحفظ ذكريات كأس العالم للأبد.",
          note: "تنبيه خصوصية: تذكر دائماً عائلتنا الرياضية آمنة ١٠٠٪. لا نقوم بالاحتفاظ بملفاك الشخصية، فقم برفع وتوليد ما تشاء من بطاقات ممتعة لك ولجميع رفاقك الكرويين بروح مرح ترويحي كامل!"
        }
      ],
      faqs: [
        { q: "ما هي الصيغ المدعومة لرفع صوري؟", a: "ندعم كافة صيغ الصور الشائعة مثل PNG, JPEG, JPG, WebP وحتى ملفات BMP بجودة ممتاز وسرعة عالية." },
        { q: "هل تحجيم وعمليات الدمج تتطلب وقتاً كبيراً؟", a: "في المعتاد تستغرق السحابة التوليدية الآمنة أقل من ٧ إلى ١٠ ثوانٍ كحد أقصى لإبراز وتقديم النتيجة النهائية لك بحجم ملائم تماماً." }
      ]
    },
    contentEn: {
      toc: [
        "1. The Architectural Aesthetics Behind AI Face Blending",
        "2. Standard Requirements of Input Selfies to secure pristine matches",
        "3. How to export and preserve your custom high-density player sheet"
      ],
      sections: [
        {
          title: "1. The Architectural Aesthetics Behind AI Face Blending",
          body: "Our custom cloud generator computes shadows, stadium environment lighting ratios, and facial orientations to construct a seamless blend between your uploaded face and the target athlete kit, simulating professional portrait photography.",
          points: [
            "Maintains facial mesh vectors and cheekbone contours beautifully.",
            "Accurately distributes field spotlights over facial skin tones.",
            "Renders pristine sports action looks parallel to FIFA or eFootball cards."
          ]
        },
        {
          title: "2. Standard Requirements of Input Selfies to secure pristine matches",
          body: "The AI face-blender requires good pixel visibility. To harvest a perfect match result that looks totally organic, adhere to these simple image rules before submitting:",
          points: [
            "Use a distinct, forward-looking selfie or headshot with high color sharpness.",
            "Ensure stable natural light on your face to eliminate heavy contrast shadows.",
            "Avoid objects like thick frames, large hats, sunglasses, or heavy beauty touch-up filters."
          ]
        },
        {
          title: "3. How to export and preserve your custom high-density player sheet",
          body: "Once your stadium portrait gets compiled, our built-in renderer merges your scores, custom team name, specific rating badges, and your generated avatar block together, serving a downloadable top-tier PNG file with a single button tap.",
          note: "Privacy Promise: All uploaded faces are handled strictly in-transit for generation and immediately purged upon completing the player card rendering process for 100% peace of mind."
        }
      ],
      faqs: [
        { q: "What are the supported image formats for custom uploads?", a: "We support standard platforms including PNG, JPEG, JPG, WebP, and BMP files with no sizing bottlenecks." },
        { q: "How long does the face blending take to generate?", a: "The entire secure generative cycle takes on average 7 to 10 seconds to compile the completed card graphic." }
      ]
    }
  },
  {
    id: "art-ai-predictions-2026",
    slug: "ai-predictions-2026-world-cup-champion",
    categoryAr: "توقعات وبيانات مونديالية",
    categoryEn: "World Cup AI Predictions",
    titleAr: "توقعات الذكاء الاصطناعي لبطل كأس العالم 2026: من يرفع الكأس التاريخية؟",
    titleEn: "AI Predictions for the 2026 World Cup Champion: Who Will Lift the Cup?",
    descAr: "تحليل معمق قائم على محاكاة الحاسوب المتقدمة لأداء المنتخبات وسجلات اللاعبين لتحديد المرشح الأوفر حظاً للفوز بمونديال 2026 التفاعلي.",
    descEn: "In-depth computer simulations tracking squad stats and historic dynamics to estimate the highest probability winner for the legendary 2026 World Cup.",
    keywordsAr: ["بطل كأس العالم 2026", "الذكاء الاصطناعي يتوقع بطل المونديال", "تنبؤات كروية 2026", "محاكاة البطولة الرياضية", "احتمالات الفوز بكأس العالم"],
    keywordsEn: ["world cup 2026 prediction", "ai winner simulations", "football champion projections", "computer model sport tracking", "stadium data analysis"],
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop",
    date: "2026-06-13",
    readTime: "7 min read",
    contentAr: {
      toc: [
        "1. المنهجية الرقمية للتوقعات الحاسوبية لعام 2026",
        "2. الثلاثي الأقوى: فرنسا، الأرجنتين، والبرازيل تحت مجهر الخوارزميات",
        "3. ميزة الحصان الأسود: منتخبات غير متوقعة قد تصنع المفاجأة الكبرى"
      ],
      sections: [
        {
          title: "1. المنهجية الرقمية للتوقعات الحاسوبية لعام 2026",
          body: "تعتمد نماذج الذكاء الاصطناعي الحالية في التنبؤ ببطل المونديال على تحليل مئات الآلاف من المتغيرات مثل الأداء الجماعي في التصفيات، مستويات اللاعبين الفردية مع أنديتهم، نسبة الإصابات، اللياقة البدنية والذهنية، والعمق التكتيكي لكل دكة بدلاء.",
          points: [
            "دراسة مسار القرعة والمواجهات المحتملة في الأدوار الإقصائية.",
            "معدلات تسجيل الأهداف ونظافة الشباك في اللحظات الحرجة.",
            "احتمالات حسم الركلات الترجيحية وتكامل حراس المرمى النخبة."
          ]
        },
        {
          title: "2. الثلاثي الأقوى: فرنسا، الأرجنتين، والبرازيل تحت مجهر الخوارزميات",
          body: "تشهد طليعة التوقعات تقدماً طفيفاً لمنتخب الديوك الفرنسي بفضل وفرة النجوم الشابة وقوة خط الهجوم تليها الأرجنتين برغبة المحافظة على المجد التاريخي، ومن ثم السامبا البرازيلية بقدراتها المهارية الفائقة.",
          points: [
            "فرنسا تحصد نسبة ترجيح تصل إلى 18.5% بفضل التنوع التكتيكي المذهل.",
            "الأرجنتين تتبع بنسبة 16.2% مدفوعة بالروح الجماعية حول القائد الملهم.",
            "البرازيل تحل ثالثاً بنسبة 14.8% مع عودة الصلابة الدفاعية والتنظيم اللامركزي الهجومي."
          ]
        },
        {
          title: "3. ميزة الحصان الأسود: منتخبات غير متوقعة قد تصنع المفاجأة الكبرى",
          body: "الكرة الحديثة لا تعترف بالثوابت المطلقة؛ حيث حددت المحاكاة منتخبات مثل إنجلترا، إسبانيا، والمغرب كحصان أسود مرعب يمتلك كوداً قتالياً قادراً على كسر صخور التوقعات الكبرى والذهاب بعيداً في نهائيات أمريكا الشمالية.",
          note: "الرؤية الرياضية: التوقعات تخدم التحليل الإحصائي، لكن المتعة الحقيقية تكمن في المفاجآت الرائعة التي يشهدها المستطيل الأخضر!"
        }
      ],
      faqs: [
        { q: "أي منتخب عربي يمتلك أعلى نسبة نجاح وفقاً للبيانات؟", a: "المنتخب المغربي يتقدم المنتخبات العربية بفضل التنظيم التكتيكي العالمي والخبرات الاحترافية الهائلة لنجومه." },
        { q: "ما هو مدى دقة نماذج الذكاء الاصطناعي هذه بخصوص مباريات المونديال؟", a: "تتراوح دقة النماذج بين 75% إلى 82% في ترشيح الفائزين بالأدوار المتقدمة، لكن المفاجآت البشرية تظل السحر الأجمل للبطولة." }
      ]
    },
    contentEn: {
      toc: [
        "1. Computing the Probability: Mathematical Models in 2026",
        "2. The Golden Trio: France, Argentina, and Brazil analyzed",
        "3. Dark Horses: Surprise teams capable of breaking all expectations"
      ],
      sections: [
        {
          title: "1. Computing the Probability: Mathematical Models in 2026",
          body: "Contemporary sports architectures leverage millions of localized dataset metrics—including individual clinical stats, squad rotation patterns, defensive endurance, and expected penalty dynamics—to model tournament pathways.",
          points: [
            "Calculates visual bracket flows and head-to-head match simulation parameters.",
            "Evaluates current squad form in top international master-leagues prior to kickoff.",
            "Synthesizes historic team resilience factors inside crucial knockout stages."
          ]
        },
        {
          title: "2. The Golden Trio: France, Argentina, and Brazil analyzed",
          body: "The model crowns France as the narrow favorite due to deep squad flexibility, closely followed by Argentina seeking back-to-back gold, and a rejuvenated fast-acting Brazil.",
          points: [
            "France claims an 18.5% win likelihood backed by deep bench variety.",
            "Argentina holds 16.2% driven by tight group chemistry and leadership.",
            "Brazil logs a solid 14.8% with stable defensive blocks coupled with rapid samba wing attacks."
          ]
        },
        {
          title: "3. Dark Horses: Surprise teams capable of breaking all expectations",
          body: "Soccer contains delightful chaotic factors. Powerhouses like Spain, England, and Morocco possess deep counter-mechanics capable of upending calculated predictions and defining historic milestones.",
          note: "Sports Note: Stats serve analytical setups, but the real thrill is the organic human magic played out on the actual pitch!"
        }
      ],
      faqs: [
        { q: "Which nation holds the highest probability factor?", a: "France captures the highest overall simulations probability, though the field remains extremely tight." },
        { q: "Do these models fully anticipate penalty shootouts?", a: "Yes, they parse historic individual penalty ratios and goalkeeper saves, though human nerve on the day is the ultimate decisive key." }
      ]
    }
  },
  {
    id: "art-arab-teams-2026",
    slug: "arab-teams-2026-world-cup-prospects",
    categoryAr: "الكرة العربية والنخبة",
    categoryEn: "Arab Football Prospects",
    titleAr: "المنتخبات العربية في مونديال 2026: فرص التأهل والنجوم الصاعدة",
    titleEn: "Arab National Teams in the 2026 World Cup: Prospects and Rising Stars",
    descAr: "رؤية فنية وتحليل شامل لفرص المنتخبات العربية المشاركة في نهائيات كأس العالم 2026 وتأثير الحضور الجماهيري والمواهب الشابة الصاعدة.",
    descEn: "A comprehensive tactical review of Arab national squad prospects, tracking their qualifying momentum, legendary fan bases, and rising youngsters.",
    keywordsAr: ["المغرب في كأس العالم 2026", "السعودية مونديال 2026", "المنتخبات العربية في أمريكا", "النجوم العرب لكرة القدم", "فرص العرب في المونديال"],
    keywordsEn: ["arab football teams 2026", "morocco national team", "saudi arabia squad tactics", "arab world cup qualifiers", "football stars arabia"],
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    date: "2026-06-13",
    readTime: "5 min read",
    contentAr: {
      toc: [
        "1. استمرار الإرث الاستثنائي: كيف غيّر إنجاز المغرب نظرة العالم للعرب؟",
        "2. المنتخب السعودي والصلابة الآسيوية في الملاعب الأمريكية والمكسيكية",
        "3. وجوه واعدة: النجوم الشابة الصاعدة التي ستقود الهجوم العربي"
      ],
      sections: [
        {
          title: "1. استمرار الإرث الاستثنائي: كيف غيّر إنجاز المغرب نظرة العالم للعرب؟",
          body: "ترك رفاق حكيمي زلزالاً كروياً ملهماً في النسخة السابقة، مما كسر جدار الخوف والرهبة للمنتخبات العربية والأفريقية. في عام 2026، يدخل أسود الأطلس البطولة بتوقعات مرتفعة بامتلاك تشكيلة ناضجة تجمع بين حيوية الشباب والخبرة الاحترافية المتميزة في كبرى الأندية الأوروبية.",
          points: [
            "وجود خطوط دفاعية وهجومية مترابطة تلعب بأعلى تكتيك عالمي.",
            "شغف جماهيري مغربي وعربي يشعل المدرجات الرياضية بالتشجيع الراقص الرائع.",
            "وفرة الحلول المهارية الفردية لفك التكتلات الدفاعية الصخرية للخصوم."
          ]
        },
        {
          title: "2. المنتخب السعودي والصلابة الآسيوية في الملاعب الأمريكية والمكسيكية",
          body: "يدخل الصقور الخضر البطولة ببرنامج إعدادي صارم وخبرات كروية متراكمة تلعب بدور القيادة والدقة والشغف. يطمح المنتخب لتجاوز دور المجموعات وإعادة ذروة أمجاد مونديال 1994 التاريخي الشهير بلعب يدمج مهارات الاستحواذ والانضباط الدفاعي الشرس.",
          points: [
            "تطوير منظومة اللياقة البدنية والسرعة لمواجهة عمالقة القارة السمراء وأوروبا.",
            "الاستفادة القصوى من خبرة اللعب بجوار كبار نجوم النخبة العالميين في الدوري السعودي.",
            "إيجاد حلول تكتيكية مبتكرة وتثمين دور صانعي الألعاب السريعين بالهجمات المرتدة."
          ]
        },
        {
          title: "3. وجوه واعدة: النجوم الشابة الصاعدة التي ستقود الهجوم العربي",
          body: "أفرزت الدوريات العربية والأوروبية مواهب واعدة تبلغ قمة عطائها الفني والبدني في مونديال 2026، لتسطر حكاية جديدة للشاب العربي الطموح المثابر والمبدع فوق عشب المستطيل الأخضر.",
          note: "كلمة تكتيكية: التلاحم والمساندة الجماهيرية هما الوقود الحقيقي لنجومنا لتحقيق الإنجاز التاريخي الرائع من جديد!"
        }
      ],
      faqs: [
        { q: "ما هي الملاعب التي ستشهد حضور المنتخبات العربية؟", a: "ستوزع مبارياتهم بين كبرى الملاعب الأمريكية المجهزة وبعض الملاعب المكسيكية ذات الصدى والطقس الرياضي الملهم." },
        { q: "هل هناك حضور لمنتخبات عربية أخرى كأحصنة سوداء؟", a: "نعم، تكتمل القوة العربية بمنتخبات تمتلك حظوظاً واعدة وتطوراً هائلاً في خطط البناء والقتالية البدنية." }
      ]
    },
    contentEn: {
      toc: [
        "1. Preserving the Legacy: The impact of Morocco’s historic run",
        "2. Saudi Arabia and Asian resilient execution on North American pitches",
        "3. Young Dynamos: The rising Arab talents leading the frontlines"
      ],
      sections: [
        {
          title: "1. Preserving the Legacy: The impact of Morocco’s historic run",
          body: "Morocco's previous semi-final performance permanently reshaped the global football landscape, shattering previous glass ceilings. In 2026, the Atlas Lions enter with massive confidence, backed by a world-class roster playing in elite European leagues.",
          points: [
            "A seamless blend of aggressive tactical defense and quick transitions.",
            "Generational support from millions of vocal fans across the globe.",
            "Stunning physical parameters built on top-tier athletic stamina."
          ]
        },
        {
          title: "2. Saudi Arabia and Asian resilient execution on North American pitches",
          body: "Saudi Arabia enters the tournament with dynamic tactical setups, looking to duplicate their iconic 1994 qualifying achievements. A roster trained beside international mega-stars in their home league provides massive competitive edges.",
          points: [
            "Rapid tactical pace designed to match European and South American elite teams.",
            "Strong composure under pressure due to playing elite matches weekly.",
            "Highly coordinated midfields specializing in dynamic counter-presses."
          ]
        },
        {
          title: "3. Young Dynamos: The rising Arab talents leading the frontlines",
          body: "As domestic and foreign leagues sprout exceptional young players, these rising stars are poised to make 2026 their custom breakout platform on the world stage.",
          note: "Tactical Insight: Strong collective mental focus and passionate fan support remain the absolute keys for Arab success in this tournament."
        }
      ],
      faqs: [
        { q: "Can Morocco replicate their top 4 finishes in 2026?", a: "With squad depth and enhanced tactical discipline, the Atlas Lions remain highly competitive contenders." },
        { q: "How has playing with elite stars improved Saudi domestic skill?", a: "It has significantly elevated the speed of thought and physical endurance required to excel in high-pressure matchups." }
      ]
    }
  },
  {
    id: "art-fastest-wingers-2026",
    slug: "fastest-wingers-2026-world-cup",
    categoryAr: "أرقام وإحصائيات رياضية",
    categoryEn: "Sports Performance Stats",
    titleAr: "أسرع وأخطر أجنحة مونديال 2026: سرعة خارقة وتكتيك هجومي مرعب",
    titleEn: "The Fastest and Most Dangerous Wingers of the 2026 World Cup",
    descAr: "تحليل تكتيكي لأسرع النفاثات الهجومية على أجنحة ملاعب مونديال 2026، من كليان مبابي إلى فينيسيوس جونيور وطريقتهم في اختراق الدفاعات.",
    descEn: "A precise statistics-driven evaluation of the fastest and most clinical attackers occupying the flank positions in the 2026 tournament, featuring Mbappe, Vinicius Jr, and more.",
    keywordsAr: ["أسرع لاعب في العالم 2026", "أجنحة كأس العالم السريعة", "فينيسيوس جونيور السرعة القصوى", "كليان مبابي اختراق هجومي", "سرعة كرة القدم"],
    keywordsEn: ["fastest football players 2026", "world cup wingers speed", "vinicius junior pace rating", "mbappe sprint speed", "soccer tactical sprints"],
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    date: "2026-06-14",
    readTime: "6 min read",
    contentAr: {
      toc: [
        "١. العصر الرقمي للسرعة الفائقة",
        "٢. فينيسيوس جونيور ومبابي: صراع العروش",
        "٣. الاستراتيجيات الدفاعية المضادة للسرعات"
      ],
      sections: [
        {
          title: "١. العصر الرقمي للسرعة الفائقة",
          body: "في كرة القدم لعام 2026، أصبحت السرعة مقياساً إحصائياً دقيقاً مجهّزاً بأحدث مستشعرات تتبع الحركة التفاعلية، حيث يسجل بعض الأجنحة سرعات خارقة تتعدى ٣٨ كم/س.",
          points: [
            "أهمية التسارع الحركي الخاطف لغزو الدفاعات المتراصة.",
            "مساهمة زوايا الجري الذكية في تجنب السقوط بمصيدة التسلل الصارمة."
          ]
        },
        {
          title: "٢. فينيسيوس جونيور ومبابي: صراع العروش على لقب الأشرس هجومياً",
          body: "يمثل كلاً من كيليان مبابي وفينيسيوس جونيور قمة السرعة الفائقة والمهارة العالية، مع تقارب هائل في الأداء الإحصائي الفعلي لموسم ٢٠٢٦.",
          points: [
            "تسجيل مبابي سرعة عدو قصوى توازي ٣٨ كم في الساعة بالكرة وبدونها.",
            "امتلاك فينيسيوس دقة مخيفة لمعدلات المراوغة والتحرك من السكون بسرعات فائقة."
          ]
        }
      ],
      faqs: [
        { q: "من هو أسرع جناح شاب مرصود لعام ٢٠٢٦؟", a: "تظهر البيانات تطلع المهاجمين الشباب ومسافري المونديال لتخطي حظوظ اللاعبين القدامى بحسابات علمية مميزة." }
      ]
    },
    contentEn: {
      toc: [
        "1. Real-time Digital Acceleration Tracker",
        "2. Battle of Titans: Mbappe and Vinicius Jr",
        "3. Anti-Pace Defensive Frameworks"
      ],
      sections: [
        {
          title: "1. Real-time Digital Acceleration Tracker",
          body: "Modern wingers integrate high-end physical tracks to benchmark exact metrics. In world competitions, speed dominates over heavy structural build.",
          points: [
            "Value of rapid vertical burst to open stubborn defenses.",
            "Smart coordinate running to evade prompt offside systems."
          ]
        },
        {
          title: "2. Battle of Titans: Mbappe and Vinicius Jr",
          body: "Mbappe leverages direct linear strides to cover turf, while Vinicius deploys lateral agility at maximal speed to trigger confusion.",
          points: [
            "Mbappe logs peak horizontal sprints near 38 km/h.",
            "Vinicius holds higher metrics for successful dribbling under intense pressure."
          ]
        }
      ],
      faqs: [
        { q: "Who is the fastest rising winger prospect?", a: "Extensive sports labs track various young stars scoring maximum acceleration times." }
      ]
    }
  }
];

interface ArticlesPageProps {
  locale: 'ar' | 'en';
  t: any;
}

export default function ArticlesPage({ locale, t }: ArticlesPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'tactics' | 'legends'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const isRtl = locale === 'ar';

  useEffect(() => {
    // Read the initial article from URL query parameters on load
    const params = new URLSearchParams(window.location.search);
    const articleSlug = params.get("article");
    if (articleSlug) {
      const matched = ARTICLES_DATA.find((art) => art.slug === articleSlug);
      if (matched) {
        setSelectedArticle(matched);
      }
    }
  }, []);

  useEffect(() => {
    // Scroll page to top when selecting an article
    if (selectedArticle) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  }, [selectedArticle]);

  // Synchronize client-side HTML structure & document metadata (Tab title, content description, search snippet settings)
  useEffect(() => {
    const isRtl = locale === 'ar';
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    let title = "";
    let desc = "";

    if (selectedArticle) {
      title = isRtl ? selectedArticle.titleAr : selectedArticle.titleEn;
      desc = isRtl ? selectedArticle.descAr : selectedArticle.descEn;
    } else {
      if (isRtl) {
        title = "المقالات الرياضية والتحليلات التكتيكية | مونديال ٢٠٢٦";
        desc = "اقرأ أحدث المقالات الرياضية الترند والتحليلات الكروية وتوقعات الذكاء الاصطناعي لبطل مونديال ٢٠٢٦.";
      } else {
        title = "Sports Articles & Tactical Analytics | Mondial 2026";
        desc = "Read the latest trending sports articles, tactical soccer analytics, and AI predictions for the 2026 World Cup.";
      }
    }

    if (title) {
      document.title = title;
    }

    // Dynamic updating of the meta desc element
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', desc);
      document.head.appendChild(metaDesc);
    }

    // Update Open Graph (Facebook/Social sharing card attributes)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    // Update Twitter Cards attributes
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', desc);
  }, [selectedArticle, locale]);

  // Categorization filter helper
  const filteredArticles = ARTICLES_DATA.filter((art) => {
    // 1. Filter by category
    if (activeCategory === 'ai') {
      const isMatch = art.categoryEn.toLowerCase().includes('ai') || art.categoryEn.toLowerCase().includes('tech') || art.categoryEn.toLowerCase().includes('imagery');
      if (!isMatch) return false;
    } else if (activeCategory === 'tactics') {
      const isMatch = art.categoryEn.toLowerCase().includes('tactical') || art.categoryEn.toLowerCase().includes('performance') || art.categoryEn.toLowerCase().includes('stats');
      if (!isMatch) return false;
    } else if (activeCategory === 'legends') {
      const isMatch = art.categoryEn.toLowerCase().includes('prospects') || art.categoryEn.toLowerCase().includes('legends') || art.categoryEn.toLowerCase().includes('arab');
      if (!isMatch) return false;
    }

    // 2. Filter by search query
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const title = isRtl ? art.titleAr : art.titleEn;
    const desc = isRtl ? art.descAr : art.descEn;
    const cat = isRtl ? art.categoryAr : art.categoryEn;
    const kw = isRtl ? art.keywordsAr.join(' ') : art.keywordsEn.join(' ');
    return (
      title.toLowerCase().includes(query) ||
      desc.toLowerCase().includes(query) ||
      cat.toLowerCase().includes(query) ||
      kw.toLowerCase().includes(query)
    );
  });

  const featuredArticle = searchQuery === '' && activeCategory === 'all' && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = featuredArticle ? filteredArticles.filter(art => art.id !== featuredArticle.id) : filteredArticles;

  const handleSelectArticle = (art: Article) => {
    setSelectedArticle(art);
    const url = new URL(window.location.href);
    url.searchParams.set("article", art.slug);
    url.searchParams.set("view", "blog");
    window.history.pushState({}, "", url.toString());
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("article");
    window.history.pushState({}, "", url.toString());
  };

  const handleCopyArticleLink = (slug: string) => {
    const url = `${window.location.origin}${window.location.pathname}?article=${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Safe related articles list
  const getRelatedArticles = (currentId: string) => {
    return ARTICLES_DATA.filter(art => art.id !== currentId).slice(0, 3);
  };

  return (
    <div className="space-y-10" dir={isRtl ? "rtl" : "ltr"}>
      {selectedArticle ? (
        // ========================== RENDER SINGLE ARTICLE DETAIL VIEW ==========================
        <div className="space-y-10 animate-fade-in font-sans">
          
          {/* Magazine Hero Layout */}
          <article className="bg-[#0b1236]/90 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-radial-at-t from-rose-500/5 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Top Toolbar Action Buttons */}
            <div className="p-6 sm:p-8 flex items-center justify-between border-b border-slate-800/60 bg-[#090d29]/45 backdrop-blur-md">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e163d] hover:bg-[#ff1a40] border border-slate-800 hover:border-transparent text-slate-300 hover:text-white text-xs font-black rounded-2xl transition-all duration-300 cursor-pointer shadow-lg shrink-0"
                aria-label="Back to Articles list"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isRtl ? "العودة لقائمة المقالات" : "Back to Articles List"}</span>
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-bold text-slate-400 font-mono">
                  {isRtl ? "مقال معتمد وموثق للعام ٢٠٢٦" : "Verified 2026 Soccer Guide"}
                </span>
              </div>
            </div>

            {/* Article Main Content Sheet */}
            <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
              
              {/* Back to List Link */}
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-450 font-black tracking-wide uppercase transition-colors"
              >
                {isRtl ? "←" : "→"}
                <span>{isRtl ? "العودة لتدوينات الكورة الرياضية" : "Back to Football Articles"}</span>
              </button>

              {/* Article Header */}
              <div className="space-y-3 pb-6 border-b border-slate-800/60">
                <span className="text-[10px] sm:text-xs font-black text-[#ff1a40] uppercase tracking-widest block font-sans">
                  {isRtl ? selectedArticle.categoryAr : selectedArticle.categoryEn}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3.5xl font-black text-white leading-tight">
                  {isRtl ? selectedArticle.titleAr : selectedArticle.titleEn}
                </h1>
                
                {/* Meta Tags layout */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 py-3 mt-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#ff1a40]" />
                    <span>{selectedArticle.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff1a40]" />
                    <span>{selectedArticle.readTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#ff1a40]" />
                    <span>{isRtl ? "محلل كروي معتمد" : "Certified Football Editor"}</span>
                  </span>
                </div>
              </div>

              {/* Banner Hero photo with smooth borders */}
              <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-850 shadow-lg">
                <img 
                  src={selectedArticle.image} 
                  alt={isRtl ? selectedArticle.titleAr : selectedArticle.titleEn}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Table of Content (TOC) Map */}
              <div className="p-5 bg-[#070b24] border border-slate-800/80 rounded-2xl space-y-3 text-right rtl:text-right ltr:text-left">
                <span className="text-xs font-black text-[#ff1a40] uppercase tracking-wider block font-sans">
                  {isRtl ? "محتويات وعناوين الدليل:" : "Table of Contents:"}
                </span>
                <ul className="space-y-2 text-[11px] sm:text-xs font-bold text-slate-400">
                  {(isRtl ? selectedArticle.contentAr.toc : selectedArticle.contentEn.toc).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <CornerDownLeft className="w-3.5 h-3.5 shrink-0 text-[#ff1a40] rotate-180" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Body Layout sections */}
              <div className="space-y-8 text-slate-300 text-sm leading-relaxed text-justify">
                {(isRtl ? selectedArticle.contentAr.sections : selectedArticle.contentEn.sections).map((sec, sIdx) => (
                  <section key={sIdx} className="space-y-3.5">
                    <h2 className="text-base sm:text-lg font-black text-white border-b border-rose-500/15 pb-2 leading-snug">
                      {sec.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {sec.body}
                    </p>

                    {/* Optional point system bullets */}
                    {sec.points && (
                      <ul className="space-y-2 pl-4 rtl:pr-4 text-xs text-slate-400 list-disc list-inside leading-relaxed">
                        {sec.points.map((pt, pIdx) => (
                          <li key={pIdx} className="marker:text-[#ff1a40] leading-relaxed hover:text-white transition-colors">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Optional specialized alert/tip note */}
                    {sec.note && (
                      <div className="p-4 bg-[#ff1a40]/5 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#ff1a40] rounded-r-xl rtl:rounded-l-xl text-slate-300 text-[11px] sm:text-xs font-bold leading-relaxed">
                        {sec.note}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Dynamic Interactive FAQs block */}
              <div className="space-y-4 pt-6 border-t border-slate-800/80">
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <span className="text-[#ff1a40] font-black font-sans">?</span>
                  <span>{isRtl ? "الأسئلة الرياضية الشائعة متكررة الاستفسار" : "Frequently Answered Sports Inquiries"}</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-4 text-justify">
                  {(isRtl ? selectedArticle.contentAr.faqs : selectedArticle.contentEn.faqs).map((faq, fIdx) => (
                    <div key={fIdx} className="p-5 bg-[#070b24]/40 border border-slate-800/60 rounded-2xl space-y-2">
                      <h4 className="text-xs sm:text-sm font-black text-neutral-100 flex items-start gap-1.5">
                        <span className="text-emerald-500 font-extrabold text-sm shrink-0 font-mono">Q.</span>
                        <span>{faq.q}</span>
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-semibold">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social and SEO sharing action box */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#070b24] border border-slate-800 rounded-2xl">
                <div className="text-xs space-y-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
                  <span className="font-black block text-white">
                    {isRtl ? "المقال متوافق ومحدث تماماً مع خوارزميات ومؤشرات كأس العالم ٢٠٢٦" : "This article is verified and updated for 2026 World Cup indexes"}
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {isRtl ? "انسخ رابط المقال وشاركه لتمكين أصدقائك وعشاق الكرة من تصفحه فورياً." : "Copy the optimized link to share this resource with fellow football fans."}
                  </p>
                </div>
                
                <button
                  onClick={() => handleCopyArticleLink(selectedArticle.slug)}
                  className="px-4 py-2 bg-[#ff1a40] hover:bg-rose-600 text-white text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0 font-sans"
                  aria-label="Copy article share link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{isRtl ? "تم نسخ الرابط!" : "Link Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>{isRtl ? "نسخ رابط المقال ومشاركته" : "Copy Article Link"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Related articles grid */}
              <div className="space-y-4 pt-8 border-t border-slate-800/80">
                <h3 className="text-sm font-black text-white uppercase tracking-wider font-sans">
                  {isRtl ? "مقالات مقترحة قد تثير اهتمامك:" : "Recommended Articles For You:"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {getRelatedArticles(selectedArticle.id).map((art) => (
                    <div 
                      key={art.id}
                      onClick={() => handleSelectArticle(art)}
                      className="bg-[#050921]/60 border border-slate-800/80 hover:border-[#ff1a40] p-4 rounded-xl cursor-pointer group transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[9px] font-extrabold text-[#ff1a40] uppercase tracking-wider block font-sans">
                          {isRtl ? art.categoryAr : art.categoryEn}
                        </span>
                        <h4 className="text-xs font-black text-white leading-snug group-hover:text-[#ff1a40] transition-colors line-clamp-2">
                          {isRtl ? art.titleAr : art.titleEn}
                        </h4>
                      </div>
                      <span className="text-[10px] text-[#ff1a40] font-black inline-flex items-center gap-1 font-sans">
                        <span>{isRtl ? "اقرأ الآن" : "Read Now"}</span>
                        <span>{isRtl ? "←" : "→"}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </article>
        </div>
      ) : (
        // ========================== RENDER ARTICLES LIST / GRID DOCK ==========================
        <div className="space-y-8 font-sans">
          
          {/* Header Dashboard section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/60 font-sans">
            <div className="space-y-2.5 text-right rtl:text-right ltr:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-[#ff1a40] text-xs font-black rounded-lg">
                <BookOpen className="w-3.5 h-3.5 animate-pulse" />
                <span>{isRtl ? "موسوعة التحليلات التكتيكية والكروية" : "Football Tactics & Sports Analytics Center"}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isRtl ? "المدونة والتحليلات الفنية" : "Football Insights Portal"}
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed font-semibold">
                {isRtl 
                  ? "تعمق في زوايا الرياضة الأكثر دقة، أسرع أجنحة المونديال، وتوقعات الذكاء الاصطناعي المثبتة لبطولة كأس العالم ٢٠٢٦ بجانب إرشادات تجميع بطاقات اللاعبين." 
                  : "Explore our collection of articles outlining tactical developments, world cup legends, sports performance, and custom player-jersey composite guidelines."}
              </p>
            </div>

            {/* Premium custom in-blog search form bar */}
            <div className="relative w-full md:max-w-xs shrink-0 bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden font-sans">
              <input
                id="blog_search_query"
                type="text"
                placeholder={isRtl ? "ابحث بالكلمات الدلالية والتكتيكية..." : "Search key tactics & players..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-white placeholder-slate-500 outline-none focus:border-[#ff1a40] focus:ring-1 focus:ring-[#ff1a40]/30 transition-all shadow-inner font-sans"
                aria-label={isRtl ? 'بحث في مقالات الكرة' : 'Search in football guides'}
              />
              <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-slate-400" />
            </div>
          </div>

          {/* Luxury Tab Categories Filters */}
          <div className="flex flex-wrap items-center gap-2 pb-2 font-sans">
            <button
              onClick={() => { setActiveCategory('all'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer ${
                activeCategory === 'all' 
                  ? 'bg-[#ff1a40] text-white shadow-lg shadow-rose-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {isRtl ? "الكل" : "All Articles"}
            </button>
            <button
              onClick={() => { setActiveCategory('ai'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'ai' 
                  ? 'bg-[#ff1a40] text-white shadow-lg shadow-rose-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRtl ? "الذكاء الاصطناعي والتقنية" : "AI & Technology"}</span>
            </button>
            <button
              onClick={() => { setActiveCategory('tactics'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'tactics' 
                  ? 'bg-[#ff1a40] text-white shadow-lg shadow-rose-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isRtl ? "التكتيك والتحليل الرقمي" : "Tactics & Data"}</span>
            </button>
            <button
              onClick={() => { setActiveCategory('legends'); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'legends' 
                  ? 'bg-[#ff1a40] text-white shadow-lg shadow-rose-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isRtl ? "الأساطير والكرة العربية" : "Legends & Arab Football"}</span>
            </button>
          </div>

          {/* ======================= HERO STYLED FEATURED ARTICLE ======================= */}
          {featuredArticle && (
            <div 
              onClick={() => handleSelectArticle(featuredArticle)}
              className="bg-gradient-to-br from-[#0c143d] to-[#04081c] border border-slate-800 hover:border-[#ff1a40] rounded-[32px] overflow-hidden shadow-2xl hover:shadow-rose-500/5 transition-all duration-500 cursor-pointer group relative font-sans"
            >
              <div className="absolute inset-0 bg-radial-at-t from-rose-500/5 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0">
                {/* Featured Cover */}
                <div className="lg:col-span-6 relative aspect-video lg:aspect-auto overflow-hidden bg-slate-950 min-h-[300px]">
                  <img 
                    src={featuredArticle.image} 
                    alt={isRtl ? featuredArticle.titleAr : featuredArticle.titleEn}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#04081c] via-transparent to-transparent"></div>
                  
                  {/* Dynamic absolute badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-[#ff1a40] text-white text-[10px] font-black rounded-lg uppercase tracking-wider animate-pulse flex items-center gap-1 font-sans">
                      <Flame className="w-3 h-3 text-white inline fill-white animate-bounce" />
                      <span>{isRtl ? "مقال مميز وشائع" : "FEATURED READ"}</span>
                    </span>
                    <span className="px-2.5 py-1 bg-slate-950/85 text-slate-300 text-[10px] font-black rounded-lg font-mono">
                      {featuredArticle.readTime}
                    </span>
                  </div>
                </div>

                {/* Featured Text Elements */}
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4 text-right rtl:text-right ltr:text-left font-sans">
                    <span className="text-[10px] sm:text-xs font-black text-[#ff1a40] uppercase tracking-widest block font-sans">
                      {isRtl ? featuredArticle.categoryAr : featuredArticle.categoryEn}
                    </span>
                    
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#ff1a40] transition-colors font-sans">
                      {isRtl ? featuredArticle.titleAr : featuredArticle.titleEn}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#b1bcf0] leading-relaxed text-justify line-clamp-4 font-semibold font-sans">
                      {isRtl ? featuredArticle.descAr : featuredArticle.descEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-extrabold font-mono font-sans font-sans">
                    <span className="bg-[#050920] border border-slate-850 px-3 py-1 rounded-lg">{featuredArticle.date}</span>
                    <span className="text-[#ff1a40] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform inline-flex items-center gap-1 bg-rose-500/5 px-3.5 py-1.5 rounded-xl border border-rose-500/10 font-sans">
                      <span>{isRtl ? "قراءة المقال المميز" : "Read Featured Article"}</span>
                      {isRtl ? "←" : "→"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MAIN GRID OF CARDS */}
          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 animate-fade-in font-sans">
              {gridArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => handleSelectArticle(art)}
                  className="bg-[#0b102c] border border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-[#ff1a40] cursor-pointer flex flex-col group h-full"
                >
                  {/* Card Cover image */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-850">
                    <img 
                      src={art.image} 
                      alt={isRtl ? art.titleAr : art.titleEn} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-slate-950/70 text-white text-[10px] font-black rounded-md font-mono backdrop-blur-xs">
                      {art.readTime}
                    </div>
                  </div>

                  {/* Card text content */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-justify font-sans">
                    <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                      <span className="text-[10px] font-extrabold text-[#ff1a40] uppercase tracking-wider block font-sans">
                        {isRtl ? art.categoryAr : art.categoryEn}
                      </span>
                      <h3 className="text-sm font-black text-white leading-snug group-hover:text-[#ff1a40] transition-colors duration-250 line-clamp-2">
                        {isRtl ? art.titleAr : art.titleEn}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-semibold font-sans">
                        {isRtl ? art.descAr : art.descEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-805 flex items-center justify-between text-[11px] text-slate-400 font-extrabold font-mono">
                      <span>{art.date}</span>
                      <span className="text-rose-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0 font-sans">
                        <span>{isRtl ? "قراءة المقال" : "Read Article"}</span>
                        {isRtl ? "←" : "→"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-[#0b102c]/50 border border-dashed border-slate-800 rounded-3xl space-y-2 font-sans">
              <span className="block text-2xl mb-2">🔍</span>
              <p className="text-xs font-bold">{isRtl ? "لم نعثر على أي نتائج مطابقة لبحثك في المقالات" : "No articles found matching your criteria."}</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer font-sans"
              >
                {isRtl ? "إعادة تعيين الفلاتر" : "Reset Filters"}
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
