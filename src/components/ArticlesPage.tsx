import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, Search, Copy, Check, Share2, CornerDownLeft } from 'lucide-react';

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
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?q=80&w=600&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop",
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
        { q: "ما هي الصيغ المدعومة لرفع صوري؟", a: "ندعم كافة صيغ الصور الشائعة مثل PNG, JPEG, JPG, WebP وحتى ملفات BMP بجودة ممتازة وسرعة عالية." },
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
  }
];

interface ArticlesPageProps {
  locale: 'ar' | 'en';
  t: any;
}

export default function ArticlesPage({ locale, t }: ArticlesPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredArticles = ARTICLES_DATA.filter((art) => {
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

  return (
    <div className="space-y-8" dir={isRtl ? "rtl" : "ltr"}>
      {selectedArticle ? (
        // RENDER SINGLE ARTICLE DETAIL VIEW
        <article className="bg-[#0b102c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 sm:space-y-8 animate-fade-in text-justify">
          
          {/* Back Action button */}
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-black rounded-xl transition-all cursor-pointer shadow-md shrink-0"
            aria-label="Back to Articles list"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isRtl ? "العودة لقائمة المقالات الكروية" : "Back to Football Articles"}</span>
          </button>

          {/* Article Header */}
          <div className="space-y-3">
            <span className="text-[10px] sm:text-xs font-black text-[#ff1a40] uppercase tracking-widest block">
              {isRtl ? selectedArticle.categoryAr : selectedArticle.categoryEn}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
              {isRtl ? selectedArticle.titleAr : selectedArticle.titleEn}
            </h1>
            
            {/* Meta Tags layout */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-450 border-y border-slate-800/80 py-3 mt-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                <span>{selectedArticle.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-rose-500" />
                <span>{isRtl ? "محلل كروي معتمد" : "Certified Football Editor"}</span>
              </span>
            </div>
          </div>

          {/* Banner Hero photo with smooth borders */}
          <div className="aspect-[2/1] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg">
            <img 
              src={selectedArticle.image} 
              alt={isRtl ? selectedArticle.titleAr : selectedArticle.titleEn}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Table of Content (TOC) Map */}
          <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-3 text-right rtl:text-right ltr:text-left">
            <span className="text-xs font-black text-[#ff1a40] uppercase tracking-wider block">
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
          <div className="space-y-8 text-neutral-200 text-sm leading-relaxed text-justify">
            {(isRtl ? selectedArticle.contentAr.sections : selectedArticle.contentEn.sections).map((sec, sIdx) => (
              <section key={sIdx} className="space-y-3.5">
                <h2 className="text-md sm:text-lg font-black text-white border-b border-rose-500/15 pb-2 leading-snug">
                  {sec.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 leading-relaxed text-justify font-sans">
                  {sec.body}
                </p>

                {/* Optional point system bullets */}
                {sec.points && (
                  <ul className="space-y-2 pl-2 sm:pl-3 rtl:pr-2 rtl:pr-3 text-[11px] sm:text-xs text-slate-350 dark:text-slate-350 list-disc list-inside leading-relaxed text-justify">
                    {sec.points.map((pt, pIdx) => (
                      <li key={pIdx} className="marker:text-rose-550 leading-relaxed hover:text-white transition-colors">
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional specialized alert/tip note */}
                {sec.note && (
                  <div className="p-4 bg-rose-500/10 border-l-4 rtl:border-l-0 rtl:border-r-4 border-rose-500 rounded-r-xl rtl:rounded-l-xl text-slate-300 text-[11px] sm:text-xs font-bold tracking-tight text-right rtl:text-right ltr:text-left bg-rose-500/5">
                    {sec.note}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Dynamic Interactive FAQs block */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-md sm:text-lg font-black text-white flex items-center gap-2">
              <span className="text-[#ff1a40] font-black">؟</span>
              <span>{isRtl ? "الأسئلة الرياضية الشائعة متكررة الاستفسار:" : "Frequently Answered Sports Inquiries:"}</span>
            </h3>
            
            <div className="grid grid-cols-1 gap-4 text-justify">
              {(isRtl ? selectedArticle.contentAr.faqs : selectedArticle.contentEn.faqs).map((faq, fIdx) => (
                <div key={fIdx} className="p-5 bg-slate-950/80 border border-slate-850 rounded-2xl space-y-2">
                  <h4 className="text-xs sm:text-sm font-black text-neutral-100 flex items-start gap-1.5">
                    <span className="text-emerald-500 font-extrabold text-sm shrink-0">Q.</span>
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-950 border border-slate-800 rounded-2xl">
            <div className="text-xs space-y-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
              <span className="font-black block text-white">
                {isRtl ? "المقال متوافق ومحدث تماماً مع خوارزميات ومؤشرات الفخر الرياضي ٢٠٢٦" : "This article is verified and updated for 2026 sports indexes"}
              </span>
              <p className="text-[10px] text-slate-450">
                {isRtl ? "انسخ رابط المقال وشاركه في مدونتك أو موقعك لتمكين القراء من تصفحه ومطابقته فورياً." : "Copy the optimized link to reference this source on your blogs."}
              </p>
            </div>
            
            <button
              onClick={() => handleCopyArticleLink(selectedArticle.slug)}
              className="px-4 py-2 bg-[#ff1a40] hover:bg-rose-600 text-white text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0"
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

        </article>
      ) : (
        // RENDER ARTICLES LIST / GRID DOCK
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-450 text-xs font-black rounded-lg">
                <BookOpen className="w-3.5 h-3.5 animate-pulse text-rose-500" />
                <span>{isRtl ? "المدونة الكروية وأسرار الذكاء الرياضي" : "Football Blog & Sports AI Secrets"}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {isRtl ? "المدونة الكروية: تكتيكات كرة القدم وحقائق كأس العالم" : "Football Blog: Tactics & World Cup Facts"}
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                {isRtl 
                  ? "تعمق في زوايا التحليلات الرياضية، تكتيكات اللعب لنجوم المونديال، وكيفية استخدام الذكاء الاصطناعي لدمج الملامح الشخصية بقميص فريقك المفضل بدقة فائقة." 
                  : "Deep dive into soccer analytics, tactical styles of major World Cup legends, and creative AI portrait face-blending tips."}
              </p>
            </div>

            {/* In-blog search bar input */}
            <div className="relative w-full sm:max-w-xs shrink-0 bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden">
              <input
                id="blog_search_query"
                type="text"
                placeholder={isRtl ? "بحث في مقالات الكرة..." : "Search football guides..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 text-xs font-bold text-white outline-none focus:border-[#ff1a40] transition-colors"
                aria-label={isRtl ? 'بحث في مقالات الكرة' : 'Search in football guides'}
              />
              <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-slate-400" />
            </div>
          </div>

          {/* GRID OF CARDS */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 animate-fade-in">
              {filteredArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => handleSelectArticle(art)}
                  className="bg-[#0b102c] border border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-rose-500 cursor-pointer flex flex-col group h-full"
                >
                  {/* Card Cover image */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950 border-b border-slate-855">
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
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-justify">
                    <div className="space-y-2 text-right rtl:text-right ltr:text-left">
                      <span className="text-[10px] font-extrabold text-[#ff1a40] uppercase tracking-wider block">
                        {isRtl ? art.categoryAr : art.categoryEn}
                      </span>
                      <h3 className="text-sm font-black text-white leading-snug group-hover:text-[#ff1a40] transition-colors duration-250 lines-clamp-2">
                        {isRtl ? art.titleAr : art.titleEn}
                      </h3>
                      <p className="text-xs text-slate-350 line-clamp-3 leading-relaxed font-semibold">
                        {isRtl ? art.descAr : art.descEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-extrabold font-mono">
                      <span>{art.date}</span>
                      <span className="text-rose-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 shrink-0">
                        <span>{isRtl ? "قراءة المقال" : "Read Article"}</span>
                        {isRtl ? "←" : "→"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-[#0b102c]/50 border border-dashed border-slate-800 rounded-3xl">
              <span className="block text-2xl mb-2">🔍</span>
              <p className="text-xs font-bold">{isRtl ? "لم نعثر على أي نتائج مطابقة لبحثك في المقالات" : "No articles found matching your criteria."}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
