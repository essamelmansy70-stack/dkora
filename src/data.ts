import { Question, PlayerProfile } from "./types";

export const QUESTION_BANK: Question[] = [
  {
    id: 1,
    textAr: "خطتك المفضلة لإنهاء الهجمة الحاسمة للفريق هي:",
    textEn: "What is your favorite strategy to finish a decisive attack for the team?",
    options: [
      { textAr: "تخطي الدفاع بمهارة فردية وسحر خالص ممتع", textEn: "Bypass defenses with brilliant individual skills and pure football magic", player: "messi" },
      { textAr: "الارتقاء عالياً وضرب كرة رأسية قوية لا تُصد", textEn: "Leaping high to strike a powerful, unstoppable header", player: "ronaldo" },
      { textAr: "الانطلاق بأقصى سرعة واستغلال المساحات الخاوية", textEn: "Sprinting at full speed to exploit open counter-attacking spaces", player: "mbappe" },
      { textAr: "التمركز الذكي في الصندوق ومتابعة الكرة بقوة بدنية", textEn: "Positioning smartly in the box to finish with high physical force", player: "haaland" }
    ]
  },
  {
    id: 2,
    textAr: "كيف تفضل قضاء ليلة ما قبل المباراة النهائية الكبرى؟",
    textEn: "How do you prefer to spend the night before a major final?",
    options: [
      { textAr: "بهدوء تام مع عائلتي وأطفالي في المنزل لتصفية ذهني", textEn: "In complete peace with my family at home to clear my mind", player: "messi" },
      { textAr: "تدريبات إضافية شاقة، نوم مبكر ونظام غذائي دقيق", textEn: "Extra training workout, early sleep, and a strict diet", player: "ronaldo" },
      { textAr: "القضاء الحصري في الألعاب الرقمية ومراجعة الأوراق التكتيكية", textEn: "Relaxing with gaming and reviewing tactical blueprints", player: "modric" },
      { textAr: "الاسترخاء التام وتناول وجبة لذيذة ثم النوم بعمق شديد", textEn: "Total relaxation, enjoying a solid meal, and sleeping deeply", player: "haaland" }
    ]
  },
  {
    id: 3,
    textAr: "عند خسارة فريقك في اللحظات الأخيرة، أول رد فعل لك هو:",
    textEn: "When your team concedes a loss in the final seconds, your first reaction is:",
    options: [
      { textAr: "الحزن الهادئ ومحاولة صنع فرصة أخيرة عبقرية بدقة", textEn: "Silent sadness while trying to engineer one final genius pass", player: "messi" },
      { textAr: "الغضب المشتعل وحث زملائي بصوت عالٍ على مواصلة القتال", textEn: "Fiery anger, loudly urging my teammates to keep on fighting", player: "ronaldo" },
      { textAr: "محاولة استغلال مهارتي لجر الفريق بأكمله نحو الهجوم", textEn: "Using my pace to pull the entire team forward to attack", player: "mbappe" },
      { textAr: "ملازمة الابتسامة ومصافحة الخصم للتجهيز للمواجهة القادمة بذكاء", textEn: "Keeping a polite smile, shaking hands, and preparing for the next match", player: "salah" }
    ]
  },
  {
    id: 4,
    textAr: "لو لم تكن لاعب كرة قدم محترف، ماذا كنت ستختار كمسار بديل؟",
    textEn: "If you weren't a professional footballer, what would be your path?",
    options: [
      { textAr: "مهندس ديكور هادئ أو رسام مبدع تفصيلي", textEn: "A quiet interior designer or a detailed, creative artist", player: "messi" },
      { textAr: "رجل أعمال جاد يمتلك علامات تجارية عالمية فائقة", textEn: "A serious businessman owning premium global luxury brands", player: "ronaldo" },
      { textAr: "قائد تنفيذي أو رائد أعمال في مجالات التقنية المعاصرة", textEn: "A visionary corporate CEO or tech venture entrepreneur", player: "mbappe" },
      { textAr: "مزارع جاد يعيش وسط الطبيعة الجبلية الهادئة", textEn: "A peaceful farmer living in quiet mountainous nature", player: "haaland" }
    ]
  },
  {
    id: 5,
    textAr: "طريقتك المفضلة لتجاوز مدافع صلب في مواجهة 1 ضد 1 هي:",
    textEn: "Your favorite way to bypass a tough defender in a 1v1 duel is:",
    options: [
      { textAr: "تمويه سريع بالجسد وتغيير الاتجاه بلمح البصر", textEn: "A quick body feint and changing direction in a blink of an eye", player: "messi" },
      { textAr: "سلسلة من حركات الدحرجة والمراوغة السريعة المحترفة", textEn: "A series of swift, dazzling stepovers and step-dribbling", player: "ronaldo" },
      { textAr: "دفعة سرعة هائلة تفاجئه وتتركه خلفي متأخراً بأمتار", textEn: "An explosive burst of raw speed, leaving them far behind", player: "mbappe" },
      { textAr: "استخدام قوتي البدنية وكتفي لتجاوزه بقوة ودفع مميز", textEn: "Using physical strength and shoulder-shielding to brush past them", player: "haaland" }
    ]
  },
  {
    id: 6,
    textAr: "كيف تصف علاقتك بالصحافة ووسائل الإعلام العالمية؟",
    textEn: "How do you view your relationship with global sports media?",
    options: [
      { textAr: "خجول ومتحفظ للغاية، أتجنب اللقاءات الطويلة دائماً", textEn: "Shy and reserved, avoiding long conferences and spotlight", player: "messi" },
      { textAr: "واثق للغاية، أعشق التحدي وأرد بقوة على المنتقدين", textEn: "Extremely confident, loving the challenge and answering critics with fire", player: "ronaldo" },
      { textAr: "ذكي ودبلوماسي، أعرف متى أتكلم ومتى ألتزم الصمت التام", textEn: "Very smart and diplomatic, knowing exactly when to speak or keep quiet", player: "mbappe" },
      { textAr: "طريف ومباشر للغاية، إجاباتي قصيرة وعفوية ومضحكة", textEn: "Direct and funny, giving short, spontaneous and humorous replies", player: "haaland" }
    ]
  },
  {
    id: 7,
    textAr: "ما هي الصفة الأبرز التي تظن أنك تمتاز بها في حياتك؟",
    textEn: "What is the defining attribute that guides your lifestyle?",
    options: [
      { textAr: "السحر الفطري والنظرة الشاملة العميقة لكافة الأمور", textEn: "Natural magic and a deep, comprehensive overview of aspects", player: "messi" },
      { textAr: "الإرادة الفولاذية والعمل الشاق الذي لا يتوقف نهائياً", textEn: "Absolute iron will and daily hard work that never halts", player: "ronaldo" },
      { textAr: "الطموح الجارف وعشق تحقيق الريادة والقمم السريعة", textEn: "Towering ambition and a constant drive to occupy the fast lane to glory", player: "mbappe" },
      { textAr: "التواضع اللامتناهي والوفاء الدائم لجذوري وأهلي", textEn: "Unending humility and a profound loyalty to my roots and community", player: "salah" }
    ]
  },
  {
    id: 8,
    textAr: "تسجيل هدف حاسم في الدقيقة 90 يعني لك بالشعور الواضح:",
    textEn: "Conversions of a match-winning goal in the 90th minute brings:",
    options: [
      { textAr: "انتصار للفريق بأكمله وصنع لحظة من السعادة الشاملة", textEn: "Total victory for the whole team and creating collective bliss", player: "messi" },
      { textAr: "برهان متجدد على أنني البطل المنقذ وصاحب الكلمة الكبرى", textEn: "Another solid proof that I am the savior and the supreme hero", player: "ronaldo" },
      { textAr: "بداية لكتابة اسمي عريناً بحروف من الذهب التاريخي", textEn: "A beginning for carving my name in gold across global history books", player: "mbappe" },
      { textAr: "تعبير عن جهود وتكتيك صامت قمت ببلورته بجدارة وهدوء", textEn: "A perfect translation of tactical, selfless efforts designed in quietness", player: "modric" }
    ]
  },
  {
    id: 9,
    textAr: "وجبتك المفضلة لشحن طاقتك قبل الاستحقاقات الرياضية:",
    textEn: "Your preferred meal to power up before sports showdowns:",
    options: [
      { textAr: "بروتين كلاسيكي خفيف ومشروب محلي دافئ", textEn: "Classic light protein and a warm organic beverage", player: "messi" },
      { textAr: "صدر دجاج نقي، أرز أبيض وخضروات مسلوقة بلا أي قطرة دهن", textEn: "Clean chicken breast, white rice, and steamed veggies with zero fat", player: "ronaldo" },
      { textAr: "أكلة تقليدية من موطني تحرك مشاعري وطاقتي بحماس", textEn: "A traditional home country recipe that energizes my absolute heart", player: "salah" },
      { textAr: "شريحة لحم ضخمة غنية بالبروتينات والحديد الطبيعي", textEn: "A massive steak packed with premium proteins and natural power", player: "haaland" }
    ]
  },
  {
    id: 10,
    textAr: "كيف تتعامل مع قرارات التحكيم المثيرة للجدل أو الخاطئة؟",
    textEn: "How do you handle controversial or erroneous referee decisions?",
    options: [
      { textAr: "أتجاهلها تماماً وأركز على تقديم اللعب الساحر الردود", textEn: "Ignore it completely and focus on showcasing clean beautiful magic", player: "messi" },
      { textAr: "أعترض بملامح غاضبة لفرض هيبتي وقوتي في رقعة الملعب", textEn: "Chide visibly to impose structural authority and dominance on the pitch", player: "ronaldo" },
      { textAr: "أبتسم بذكاء وأتحدث بثقة مع حكم الساحة لإيصال فكرتي", textEn: "Smile cleverly and speak confidently with the ref to explain my view", player: "mbappe" },
      { textAr: "أركز على الكرة التالية بلا تضييع ربع ثانية في نقاش عقيم", textEn: "Focus immediately on the next ball without wasting a single second on debates", player: "haaland" }
    ]
  },
  {
    id: 11,
    textAr: "ما هو أسلوبك في قيادة زملائك داخل غرف تبديل الملابس؟",
    textEn: "What is your main style of leading teammates in the dressing room?",
    options: [
      { textAr: "التوجيه الصامت بالقدوة وأخذ زمام المبادرة الميدانية", textEn: "Silent guidance by setting examples and taking match-level charge", player: "messi" },
      { textAr: "الخطابات الحماسية الحارة وتحفيز الجميع بلهب الشغف", textEn: "Delivering hot, fiery motivational speeches to ignite pure passion", player: "ronaldo" },
      { textAr: "الترابط الأخوي الصادق ورسم البسمة لامتصاص التوتر", textEn: "Fostering brotherly bonds and sharing smiles to alleviate pressure", player: "salah" },
      { textAr: "النصائح الفنية الهادئة والحديث المنبثق من عين الخبرة العميقة", textEn: "Distributing calm tactical suggestions emerging from absolute veteran wisdom", player: "modric" }
    ]
  },
  {
    id: 12,
    textAr: "ما هو المكان الذي تفضله وتقصده لقضاء عطلتك السنوية؟",
    textEn: "Where do you prefer to go for your annual holiday?",
    options: [
      { textAr: "شاطئ هادئ ومنعزل برفقة عائلتي المقرّبة فقط", textEn: "A quiet, secluded beach accompanied by my close family members", player: "messi" },
      { textAr: "منتجع خاص فخم مجهز بصالات تدريب لمواصلة الاستعداد", textEn: "A grand private luxury resort loaded with custom gyms to stay fit", player: "ronaldo" },
      { textAr: "عواصم الموضة والترفيه العالمية والأماكن الصاخبة والممتعة", textEn: "Elite fast-paced global fashion capitals and vibrant locations", player: "mbappe" },
      { textAr: "الغابات الجبلية المليئة بالثلوج أو صيد الأسماك بنقاء", textEn: "Mountainous forests with heavy snow or fishing in ultimate clarity", player: "haaland" }
    ]
  },
  {
    id: 13,
    textAr: "حين يطلق الخصوم عبارات مستفزة ضدك في الملعب، كيف تتصرف؟",
    textEn: "When opponents throw verbal provocations at you on the field, what is your stance?",
    options: [
      { textAr: "أحافظ على برودي الكلي وأعاقبهم بمراوغة قاتلة تخرسهم", textEn: "Maintain absolute composure and punish them with a deadly, silencing dribble", player: "messi" },
      { textAr: "تشتعل رغبتي وأرد عليهم بهدف صاروخي واحتفال حماسي بوجههم", textEn: "Passion ignites and I answer with a rocket goal followed by a proud celebration in their face", player: "ronaldo" },
      { textAr: "استخدم سرعتي القصوى لتجاوزهم كالأشباح وأتركهم يعانون خلفي", textEn: "Unleash extreme speed to ghost past them and leave them suffering in the dust", player: "mbappe" },
      { textAr: "أبتسم بوداعة ولا ألقي بالاً، فهدفي أكبر من مجرد مهاترات", textEn: "Offer a polite smile and stay focused, as my targets are far bigger than talk", player: "salah" }
    ]
  },
  {
    id: 14,
    textAr: "ما نوع الحذاء الرياضي الذي تفضل ارتداءه وتمثيله؟",
    textEn: "What kind of football boots do you prefer to wear and showcase?",
    options: [
      { textAr: "حذاء خفيف ومريح يعزز اللمسة والتحكم المطلق بالكرة", textEn: "A super light and comfortable boot enhancing ultimate ball feel and control", player: "messi" },
      { textAr: "حذاء قوي ومندمج بأحدث تقنيات زيادة السرعة والارتقاء الجوي", textEn: "A robust boot integrated with speed-enhancing and high jump tech", player: "ronaldo" },
      { textAr: "حذاء عصري خاطف للأنظار بألوان فسفورية ذكية وحيوية", textEn: "A flashy modern boot styled in vibrant glowing neon colorways", player: "mbappe" },
      { textAr: "حذاء متين ثقيل البنية لضمان تسديدات مدمرة في الشباك", textEn: "A durable piece structured heavily to deliver thundering shots into the net", player: "haaland" }
    ]
  },
  {
    id: 15,
    textAr: "ما هي طريقة احتفالك المفضلة بعد إحراز هدف ساحر؟",
    textEn: "What is your signature celebration after scoring a magical goal?",
    options: [
      { textAr: "الابتسامة الفطرية والإشارة بإصبعي للسماء شكراً وعرفاناً", textEn: "A warm natural smile while pointing fingers skyward in gratitude", player: "messi" },
      { textAr: "القفز عالياً مع الدوران الأسطوري وإطلاق الصرخة الشهيرة SIU", textEn: "Leaping in style with a massive mid-air turn and launching the SIU cry", player: "ronaldo" },
      { textAr: "الوقوف بثقة وشموخ مع ضم الذراعين لمراقبة الجماهير المنتشية", textEn: "Standing tall and proud with crossed arms while watching delighted crowds", player: "mbappe" },
      { textAr: "جلسة اليوغا والتأمل بسلام وسط هتافات المدرجات النارية", textEn: "Taking a yoga pose to reflect in ultimate peace amidst roaring fans", player: "haaland" }
    ]
  },
  {
    id: 16,
    textAr: "ما هي أفضل ميزة تعجبك في صانع ألعاب فريقك لتنسيق الهجمات؟",
    textEn: "What is your favorite trait of a playmaker who assists you?",
    options: [
      { textAr: "التفاهم السريع والتلقائي معي من لمحة عين واحدة وبدون كلام", textEn: "Instantly developing chemistry merely with a glance and zero words", player: "messi" },
      { textAr: "إرسال كرات عرضية دقيقة ومتقنة بالمليمتر في زاوية ارتقائي الأقصى", textEn: "Sending millimeter-perfect crosses straight to my peak jumping zone", player: "ronaldo" },
      { textAr: "تمرير الكرة في المساحات الخالية السحيقة لأجري خلفها بأقصى عزم", textEn: "Slipping passes deep into wide spaces for me to sprint after with full stride", player: "mbappe" },
      { textAr: "إرسال تمريرات ذكية ومخفية تكسر وتدمر جدران دفاع الخصم", textEn: "Carving smart, hidden line-breaking passes that completely dissect defensive layouts", player: "modric" }
    ]
  },
  {
    id: 17,
    textAr: "عندما تشعر بآلام طفيفة أو إجهاد في مواجهة مفصلية حاسمة:",
    textEn: "When feeling minor pain or fatigue during a highly crucial fixture:",
    options: [
      { textAr: "أوازن بين جهدي بالملعب بذكاء وأعتمد على حركتي السحرية", textEn: "Balance my stamina intelligently and rely on flawless movement", player: "messi" },
      { textAr: "أرفض الخروج كلياً وأضغط على نفسي بعزيمة فولاذية لا تهتز", textEn: "Refuse to be substituted, working through it with unbreakable resolve", player: "ronaldo" },
      { textAr: "أستغل كراتي المتبقية بحذر لصنع الفارق وأطلب دعم زملائي", textEn: "Carefully conserve energy for rare bursts and lean on teammates", player: "mbappe" },
      { textAr: "أستمر بالقتال رغبة في صناعة التاريخ متسلحاً بروح صلبة صبورة", textEn: "Keep grinding out of absolute loyalty to my team with patience and courage", player: "modric" }
    ]
  },
  {
    id: 18,
    textAr: "لو تم اختيارك لتنفيذ ركلة جزاء حاسمة بنهائي المونديال بالدقيقة 90:",
    textEn: "If you are selected to take a decisive 90th-minute penalty in a World Cup Final:",
    options: [
      { textAr: "سأتقدم بنبض هادئ، وأسددها بلمسة عبقرية ناعمة تفاجئ الحارس", textEn: "Step up with a calm heart and chip/place it past the goalie elegantly", player: "messi" },
      { textAr: "سأطلب الكره بجرأة فولاذية، وأسددها بصاروخ مدمر في سقف الشبكة", textEn: "Decline fear, demand the ball, and blast a thunderous rocket into the top corner", player: "ronaldo" },
      { textAr: "سأنظر لعين الحارس مباشرة بتحدٍ وأسكنها بثقة بالغة في الشباك", textEn: "Stare directly into the keeper's eyes and slot it with cold-blooded confidence", player: "mbappe" },
      { textAr: "سأضعها بثبات وعقلانية في أقصى الزاوية التي تصعب حيازتها", textEn: "Settle it neatly and strike it safely into the absolute furthest margins of the net", player: "salah" }
    ]
  },
  {
    id: 19,
    textAr: "ما هي الرياضة الأخرى التي تسترعي انتباهك خارج نطاق كرة القدم؟",
    textEn: "What other sport catches your interest outside of football?",
    options: [
      { textAr: "كرة السلة والتحركات المهارية السريعة والتمرير المتقن", textEn: "Basketball with tactical swift steps and brilliant playmaking", player: "messi" },
      { textAr: "الفنون القتالية، السباحة وتدريبات القوة لتعزيز اللياقة المرعبة", textEn: "Martial arts, swimming and heavy weight training to strengthen the body", player: "ronaldo" },
      { textAr: "سباقات الجري والعدو للمسافات القصيرة لقياس حدود السرعة", textEn: "Track athletics and sprinting to explore absolute limits of speed", player: "mbappe" },
      { textAr: "رياضات الدفاع والتحمل الجبلي وسط الطبيعة الاسكندنافية الصعبة", textEn: "Endurance climbing and outdoor survival in Nordic nature setups", player: "haaland" }
    ]
  },
  {
    id: 20,
    textAr: "كيف تفسر نجاحك المستمر وعطائك الممتد أمام ملايين الجماهير؟",
    textEn: "How do you explain your prolonged success in front of millions of fans?",
    options: [
      { textAr: "توفيق من الله عز وجل، وصنع الفرحة لكل محب للكرة الحقيقية", textEn: "Blessings and destiny, while aiming to paint happiness on football fans' faces", player: "messi" },
      { textAr: "التزامي اليومي المهووس، حتى عندما كان الجميع نائماً أو مستسلماً", textEn: "An intense daily obsession and work ethic, especially when others slept", player: "ronaldo" },
      { textAr: "كفاحي الذي لا ينتهي وصبري الصادق لتحدي كافة صعاب البدايات", textEn: "My endless grit and sincere patience in overcoming tough childhood starting blocks", player: "modric" },
      { textAr: "تطوير تفاصيلي باستمرار والسعي لإلهام ومساندة أبناء بلدي وجذوري", textEn: "Constantly refining the details while seeking to inspire and aid kids from my hometown", player: "salah" }
    ]
  },
  {
    id: 21,
    textAr: "كيف تتعامل مع اللعب تحت وطأة الأمطار الغزيرة والأجواء الطينية؟",
    textEn: "How do you approach playing under heavy rain and muddy pitches?",
    options: [
      { textAr: "أطوع مهارتي ومركز جاذبيتي المنخفض للسيطرة التامة على انزلاق الكرة", textEn: "Harness low center of gravity and ball touch to nullify slippy terrains", player: "messi" },
      { textAr: "أراها بيئة مثالية لإبراز قوتي البدنية ونسقي الرياضي الصلب", textEn: "See it as the ultimate playground to flex superior resilience and body armor", player: "ronaldo" },
      { textAr: "استحوذ على الكرات العرضية بقوة بدنية فائقة بلا خوف من الاصطدام", textEn: "Wreck chaos on long balls using physical dominance with zero fear of impact", player: "haaland" },
      { textAr: "أحافظ على هدوء عقلي وتوزيع تمريراتي بدقة وأناقة ملموسة", textEn: "Keep a razor-sharp focus and distribute neat, classy passes with ease", player: "modric" }
    ]
  },
  {
    id: 22,
    textAr: "ما هي الصفة الجوهرية التي تطلبها في لاعب خط الوسط المثالي لدعمك؟",
    textEn: "What key characteristic do you seek in an ideal midfielder supporting you?",
    options: [
      { textAr: "الرؤية العميقة والتحكم الكامل في ريتم وتدفق اللعب دون تسرع", textEn: "Deep vision and total control over match tempo without rushing", player: "modric" },
      { textAr: "السرعة العالية لتسهيل المرتدات السريعة وتحويل الملعب هجوماً", textEn: "Blazing fast speed to facilitate rapid transitions and launch runs", player: "salah" },
      { textAr: "صنع لمحات فنية وتمريرات قصيرة ممتازة تضعني وجهاً لوجه مع الحارس", textEn: "Delivering magical one-touch plays putting me head-to-head with the keeper", player: "messi" },
      { textAr: "العرضيات البعيدة الموجهة برأس حربة حاد يتلقاها بكفاءة مميزة", textEn: "Perfect aerial distributions that match a lethal header with power", player: "ronaldo" }
    ]
  },
  {
    id: 23,
    textAr: "كيف تصف تواضعك عندما تحوز جائزة فردية عظمى كالكرة الذهبية؟",
    textEn: "How do you express humility when receiving a stellar individual trophy like the Ballon d'Or?",
    options: [
      { textAr: "أهديها على الفور لعائلتي وزملائي، فالإنجاز الحقيقي جماعي دائماً", textEn: "Dedicate it instantly to teammates and family; real triumphs are collective", player: "messi" },
      { textAr: "سأسعد بها كثيراً وأبدأ تدريباً فورياً غداً للفوز بالكرة التالية!", textEn: "Rejoice in style, but start training intensely tomorrow to capture the next one", player: "ronaldo" },
      { textAr: "أراها دليلاً على كفاح السنوات الصعبة القاسية الملهمة لصغار السن", textEn: "A testament to years of struggle and resilience that inspire children worldwide", player: "modric" },
      { textAr: "أعتبرها خطوة هامة في مسيرتي لكن فوز فريقي بالدوري هو غايتي القصوى", textEn: "An honorable milestone, but team accomplishments remain my supreme passion", player: "salah" }
    ]
  },
  {
    id: 24,
    textAr: "ما هو دورك المفضّل عند العمل بداخل مجموعة لحل أزمة صعبة؟",
    textEn: "What is your favorite role when collaborating inside a group during a crisis?",
    options: [
      { textAr: "العقل المدبر الصامت الذي يبتكر الحل السحري من ثغرة لا تُرى", textEn: "The silent mastermind engineering the killer solution out of thin air", player: "messi" },
      { textAr: "الملهم القوي الذي يحمس الجميع ويقود المسيرة بحضور مهيب", textEn: "The thunderous motivator driving the group forward with roaring confidence", player: "ronaldo" },
      { textAr: "المكافح الصبور الذي يربط الخيوط ويرتب الأمور بحكمة ونضج تامين", textEn: "The patient puzzle-solver coordinating aspects with stellar maturity", player: "modric" },
      { textAr: "العضو الودود المبادر بابتسامة دافئة لتخفيف حدة الأزمة بحب وإيجابية", textEn: "The friendly element initiating peace with positive vibes to soften tension", player: "salah" }
    ]
  },
  {
    id: 25,
    textAr: "كيف تتغلب على الضغوط النفسية المصاحبة للمباريات الجماهيرية الملتهبة؟",
    textEn: "How do you conquer the heavy pressure of highly heated stadium atmospheres?",
    options: [
      { textAr: "بالهدوء التام والتركيز الداخلي، فالضغط يثير فيّ المتعة الكروية", textEn: "In complete inner stillness, letting intense situations fuel pure focus", player: "messi" },
      { textAr: "أترجم الصياحات لوقود خارق يشعل عضلاتي ويزيد من إصراري وصلابتي", textEn: "Translate the hostile crowd noise into supercharged fuel for my muscles", player: "ronaldo" },
      { textAr: "التفكير العقلاني العميق والهدوء البالغ المستمد من صبري وخبرتي", textEn: "Deploying logical calculations and absolute silence stemming from veteran experience", player: "modric" },
      { textAr: "بالتوكل والأمل والتفكير في إسعاد ملايين المتابعين المنتظرين للفرحة", textEn: "Relying on hope and dreaming of bringing ultimate joy to millions of awaiting fans", player: "salah" }
    ]
  },
  {
    id: 26,
    textAr: "أي الحركات الفنية والألعاب تثير حماسك وشغفك في رقعة العشب؟",
    textEn: "Which football trick or physical movement gives you the most thrill?",
    options: [
      { textAr: "ترويض ساحر للكرة بالصدر يجمد المدافع بذهول تام مكانه", textEn: "A magical chest trap that leaves defenders absolutely frozen in awe", player: "messi" },
      { textAr: "ارتقاء خرافي يتحدى الجاذبية لضرب الكرة من نقطة عالية لا تُطال", textEn: "A mind-blowing, high-altitude header that completely defies gravity", player: "ronaldo" },
      { textAr: "تسديدة يسارية لولبية مقوسة تسكن الزاوية المستحيلة بدقة ماهرة", textEn: "A curved, curling left-footed shot that neatly kisses the top postage corner", player: "salah" },
      { textAr: "تمريرة ساحرة بوجه القدم الخارجي (تريفيلا) الأنيق تخلخل الدفاع", textEn: "A beautiful outside-of-the-boot pass (Trivela) that unlocks layouts", player: "modric" }
    ]
  },
  {
    id: 27,
    textAr: "كيف تصف طبيعة علاقتك بزملائك الجدد في الفريق؟",
    textEn: "How do you build initial chemistry with new squad signings?",
    options: [
      { textAr: "أرحب بهم بلطف وهدوء تام دون فرض نفسي، وأساندهم ميدانياً", textEn: "Welcome them calmly without showing off, supporting them heavily on pasture", player: "messi" },
      { textAr: "أكون لهم بمثابة القائد الموجه العارم بالحماس لإدخال روح البطولة لقلوبهم", textEn: "Serve as an inspiring general, infusing champion instincts straight into their hearts", player: "ronaldo" },
      { textAr: "أتبادل معهم المزاح وأفتح قلبي لهم لنبني جدار وفاء وتفاهم عظيم", textEn: "Joke warmly with them, breaking the ice to launch true friendly bonds of loyalty", player: "salah" },
      { textAr: "أتبادل معهم النصائح التكتيكية العميقة من منطلق الأخ الأكبر الخبير", textEn: "Provide calm, profound tactical guidance as an elder brother in the family", player: "modric" }
    ]
  },
  {
    id: 28,
    textAr: "ما هو حلمك الأكبر الذي يشعل همتك ويدفعك للاستيقاظ بحيوية كل صباح?",
    textEn: "What is the ultimate dream that keeps you motivated to wake up every morning?",
    options: [
      { textAr: "الحفاظ على رونق وسحر الأداء وصناعة متعة كروية فريدة وصادقة", textEn: "Sustaining the sheer joy and magic of football to give authentic pleasure to fans", player: "messi" },
      { textAr: "أن أكون دائماً وأبداً الرقم واحد المنفرد في طليعة تاريخ اللعبة", textEn: "To undeniably remain the ultimate Number One in the historical books of football", player: "ronaldo" },
      { textAr: "تصدير الأمل لبلادي وإثبات أن الطموح والتواضع يصنعان المعجزات", textEn: "Transmitting hope to my country, proving that ambition and modesty rewrite destiny", player: "salah" },
      { textAr: "الاستمتاع بكل تمريرة كروية راقية على العشب ومداعبة المستديرة بنضج", textEn: "Enjoying every clean pass on the grass and treating the ball with elegance", player: "modric" }
    ]
  },
  {
    id: 29,
    textAr: "ما هي طريقتك المثلى لصناعة الرهبة والارتباك في نفوس المدافعين؟",
    textEn: "What is your best weapon to strike fear and panic into opposing defenders?",
    options: [
      { textAr: "الجري الخفيف الماكر ملتصقاً بالكرة كأنها جزء من جسدي الفطري", textEn: "Sneaky gliding with the ball literally glued to my feet as an extension of my body", player: "messi" },
      { textAr: "نظرة حاسمة قوية وجسد رياضي حديدي واثق يفرض السطوة الكافية", textEn: "A sharp, focused stare, paired with exceptional athletic posture imposing authority", player: "ronaldo" },
      { textAr: "انطلاقة مباغتة سريعة وعريضة تجعل المدافع يفقد توازنه بسهولة", textEn: "A rapid, explosive burst down the wing causing defenders to lose self-balance", player: "salah" },
      { textAr: "توقع حركاتهم وقراءة أفكارهم بالذكاء الكروي الفذ قبل التقدم خطوة", textEn: "Anticipating their movements and reading their thoughts ahead with pure football IQ", player: "modric" }
    ]
  },
  {
    id: 30,
    textAr: "حين يواجه فريقك تكتلاً دفاعياً خانقاً بعشرة لاعبين في الصندوق:",
    textEn: "When your team encounters an intense defensive park-the-bus with 10 players in the box:",
    options: [
      { textAr: "الاعتماد على تبادل الكرات الفائق السريع والمراوغة الجسدية الضيقة", textEn: "Relying on hyper-fast tiki-taka and narrow body-shifting dribbling", player: "messi" },
      { textAr: "التوجيه بضرورة العقد الهوائي المتكرر أو إرسال مدافع قذائف بعيد", textEn: "Commanding constant high crosses to make use of dynamic headers or long-range test-fires", player: "ronaldo" },
      { textAr: "استغلال قدرتي على الانفجار الفردي لشق ثغرة أو كسب جزائية بذكاء", textEn: "Harnessing rapid speed transitions to split the wall or win a smart penalty", player: "mbappe" },
      { textAr: "إرسال تمريرات ساقطة قصيرة أو كرات بوجه القدم في نقاط عمياء مفاجئة", textEn: "Slipping precise outside-of-the-foot chips into the defenders' blind spots", player: "modric" }
    ]
  },
  {
    id: 31,
    textAr: "في المواجهات التاريخية الهامة الكلاسيكو أو الديربي الصاخب:",
    textEn: "During grand historical rivalries such as El Clásico or roaring local derbies:",
    options: [
      { textAr: "أحافظ على صمتي وتركيزي الكامل وأدع حذائي يرسم الإجابة الصادمة", textEn: "Keep strict silence and focus, letting my football perform the loud response", player: "messi" },
      { textAr: "أحفز المدرجات بحركات يدي وأطالب مشجعي فريقنا بإطلاق الصافرات الضاغطة", textEn: "Pump up the crowd with hand gestures, demanding our fans roar and pressure", player: "ronaldo" },
      { textAr: "أستغل الأضواء الباهرة الموجهة لي لاستعراض مهاراتي الممتعة وحسم النقاط", textEn: "Leverage the heavy cameras to showcase top moves and decisively conquer the clash", player: "mbappe" },
      { textAr: "أركض في كل تفاصيل الملعب دفاعاً وهجوماً لمساندة رفاقي بلا كلل", textEn: "Sprint across every inch of the pitch, defending and attacking to relieve teammates", player: "modric" }
    ]
  },
  {
    id: 32,
    textAr: "كيف تصف طبيعة استعدادك الفني والذهني للموسم الرياضي الطويل الحارق؟",
    textEn: "How do you prepare mentally and physically for a grueling, long season?",
    options: [
      { textAr: "بالراحة المنزلية الكافية وتغذية المودة مع العائلة واللعب ببساطة فطرية", textEn: "Ample domestic rest, bonding with loved ones, and treating football as basic fun", player: "messi" },
      { textAr: "بروتوكول تدريبي فولاذي دقيق بمنتجعات خاصة مخصصة على مدار 24 ساعة", textEn: "Strict conditioning blueprints in customized elite centers operating 24/7", player: "ronaldo" },
      { textAr: "باتباع برمجيات مدربي الأحمال المختارين بعناية وبمرونة بدنية متقدمة", textEn: "Following physical loads mapped by personal experts to maximize muscle protection", player: "mbappe" },
      { textAr: "بالابتعاد عن السوشيال ميديا وقراءة القرآن الكريم والاسترخاء لصفاء الروح والذهن", textEn: "Staying away from social media, reflecting in spiritual peace, and relaxing", player: "salah" }
    ]
  },
  {
    id: 33,
    textAr: "عندما تقع في الملعب نتيجة احتكاك خشن مباغت وغير مبرر من الخصم:",
    textEn: "When you are brought down by a sudden, harsh and unjustified foul by a rival:",
    options: [
      { textAr: "أقف فوراً بهدوء بليغ، وأنفض الغبار عن ملابسي مستعداً للمضي قدماً", textEn: "Stand up instantly, brush off the dust, and prepare to play without complaining", player: "messi" },
      { textAr: "أطالب الحكم ببطاقة ملونة بهيبة واثقة وأبرهن على صرامة حقي", textEn: "Demand a warning card with intense authority to prove my status is respected", player: "ronaldo" },
      { textAr: "أبتسم بسخرية خفيفة وأتحرك بسرعة مضاعفة في الهجمة التالية لأفضح مدافعهم", textEn: "Smile slightly and trigger double-speed on the next run to shred their defense", player: "mbappe" },
      { textAr: "أتقبل عذر المدافع بروح رياضية وأربت على كتفه بابتسامة متسامحة ملهمة", textEn: "Accept their apology with high sportsmanship, tapping their shoulder with a friendly smile", player: "salah" }
    ]
  },
  {
    id: 34,
    textAr: "كيف تصف أسلوب حياتك وذوقك العام في اختيار مظهرك الخارجي وملابسك؟",
    textEn: "How would you describe your personal lifestyle, fashion, and general taste?",
    options: [
      { textAr: "بسيط للغاية وتلقائي، تيشيرت كلاسيكي أسود وجينز مريح بلا تكلف", textEn: "Very basic and spontaneous; classic black t-shirt and comfortable denim", player: "messi" },
      { textAr: "متأنق للغاية، بذلات مصممة يدوياً وساعات نادرة وطلة رياضية خارقة", textEn: "Extremely sharp; custom handmade suits, rare watches, and superb athletic looks", player: "ronaldo" },
      { textAr: "عصري وجريء، مواكب لأحدث صيحات الموضة الباريسية والألوان المثيرة", textEn: "Bold and trendsetting; matching current Parisian haute-couture and intense colorways", player: "mbappe" },
      { textAr: "مريح وريفي بسيط، تفضيل السراويل الهادئة والملابس العملية الصديقة", textEn: "Quiet, comfortable and humble; preferring friendly, casual and nature-ready outfits", player: "haaland" }
    ]
  },
  {
    id: 35,
    textAr: "عندما تقوم بواجبك الوطني والدفاع عن ألوان منتخب بلادك في كأس العالم:",
    textEn: "When defending your national colors at the grand World Cup tournament:",
    options: [
      { textAr: "أشعر بحمل ثقيل وجميل يحرك في وجداني السحر لإسعاد شعب عانى طويلاً", textEn: "Feel a heavy, beautiful pride driving my pure magic to make historical fans happy", player: "messi" },
      { textAr: "أبث الروح الحماسية القتالية في زملائي لنقاتل للرمق الأخير لرفع العلم عالياً", textEn: "Inject raw fighting spirits into teammates, battling to the final breath for our flag", player: "ronaldo" },
      { textAr: "أسعى لكتابة فصول جديدة من المجد للبلاد وإثبات أن جيلنا هو الأفضل بلا منازع", textEn: "Strive to carve absolute historical glory for my country, proving our generation reigns supreme", player: "mbappe" },
      { textAr: "أشعر بشرف عظيم وأريد تقديم نموذج ملهم للشباب العربي بأن لا شيء مستحيل", textEn: "Feel a supreme honor, aiming to showcase an inspiring path of hope stating nothing is impossible", player: "salah" }
    ]
  },
  {
    id: 36,
    textAr: "ما هو الجانب الذي تركز على تحسينه دوماً في تدريباتك الفردية؟",
    textEn: "What aspect do you constantly seek to improve in your personal training?",
    options: [
      { textAr: "توسيع زوايا الرؤية الميدانية بالبساط واستشعار أماكن الرفاق مسبقاً", textEn: "Expanding spatial awareness on the grass and anticipating teammates' coordinates", player: "messi" },
      { textAr: "تطوير قوة القفزة والارتقاء وسرعة التسديد بكلتا القدمين بلا تفاوت", textEn: "Refining jump altitude, leg explosive metrics, and sharp shooting with either foot", player: "ronaldo" },
      { textAr: "مرونة الانطلاق السريع والقدرة على التحكم في تغيير السرعات المفاجئ", textEn: "Accelerative flexibility and masterful control when gear-shifting my running speeds", player: "mbappe" },
      { textAr: "زيادة الصلابة ومعدل افتكاك الكرات والتحمل البدني الشاق بلا كلل", textEn: "Incurring top shielding, interception efficiency, and grueling physical tolerance limits", player: "modric" }
    ]
  },
  {
    id: 37,
    textAr: "كيف تصف احتكاكك الأول بخصم يتميز بالخشونة والاندفاع الجسدي العنيف؟",
    textEn: "How do you handle a rival defender relying on rough blocks and violent tackles?",
    options: [
      { textAr: "أراوغه بنعومة وخفة لتفادي لمسه الكاحل، وأتركه أرضاً يندمج في الفراغ", textEn: "Outsmart them with elegant touch evasion, leaving them sliding into thin empty air", player: "messi" },
      { textAr: "أواجهه بكتلتي العضلية وأفرض احترامي عليه ليدرك جيداً أنني جدار صلب", textEn: "Brace with clean physical armor, forcing them to notice I am a brick wall", player: "ronaldo" },
      { textAr: "أنطلق بسرعتي الخارقة في المساحة المتروكة خلفه قبل أن يفكر في لمسي", textEn: "Accelerate forward beyond their sector before they can even plan a physical block", player: "mbappe" },
      { textAr: "أحتفظ بهدوء تام وأحافظ على دوران الكرة المتقن وأتركه يرتكب الأخطاء", textEn: "Preserve deep stillness, shield the ball cleanly, and let them pile up referee cautions", player: "modric" }
    ]
  },
  {
    id: 38,
    textAr: "لو عُرض عليك عقد بمبلغ فلكي خيالي للانتقال إلى دوري مغمور وبعيد:",
    textEn: "If offered an astronomical salary to join an obscure, faraway foreign league:",
    options: [
      { textAr: "أفرغ اهتمامي للأجواء الهادئة لتأمين راحة عائلتي ولا مانع من تجربة ممتعة هادئة", textEn: "Prioritize family comfort, enjoying a peaceful soccer experience with zero stressful noise", player: "messi" },
      { textAr: "أعشق خوض التحديات الجديدة وتصدّر عناوين الأنباء وصناعة تاريخ جديد", textEn: "Adore conquering new maps, capturing main headings, and establishing brand new rules", player: "ronaldo" },
      { textAr: "أركز على بناء إرث تاريخي حقيقي في النادي الذي جعل مني نجماً متوجاً", textEn: "Focus on constructing a monumental legacy at the elite club that built my stature", player: "salah" },
      { textAr: "أقيم مشروعي التنافسي أولاً وحساباتي الكروية ومدى تحقيق طموحي الأكبر", textEn: "Evaluate the sports competitive architecture first alongside my personal dream trophies", player: "mbappe" }
    ]
  },
  {
    id: 39,
    textAr: "ما هو العنصر الأكثر إزعاجاً لك بداخل رقعة الملاعب الكروية المعاصرة؟",
    textEn: "What is the most annoying element in modern football today?",
    options: [
      { textAr: "كثرة الصراخ والصراعات الجانبية التي تفسد عفوية اللعب وجمالية الأداء", textEn: "Excessive screaming and side dramas that poison spontaneous play and beautiful football", player: "messi" },
      { textAr: "تراجع مستويات الالتزام والشغف والجهد الصارم لدى جيل اللاعبين الصاعد", textEn: "Declining devotion, work ethics, and rigid self-discipline among younger players", player: "ronaldo" },
      { textAr: "انتشار الشائعات ومحاولات التقليل المستمرة من النجوم الساطعة الكفاحية", textEn: "Spreading synthetic rumors and constant media attempts to play down hardworking stars", player: "salah" },
      { textAr: "المبالغة في الحسابات والأرقام الباردة وإهمال اللمسة الجمالية العبقرية", textEn: "Over-analyzing cold computational figures while neglecting the magical creative touch", player: "modric" }
    ]
  },
  {
    id: 40,
    textAr: "لو تم إنتاج عمل وثائقي سينمائي عظيم يلخص مسيرتك الكروية، فما هو عنوانك الأمثل؟",
    textEn: "If a cinematic documentary is produced summarizing your soccer path, what is the best title?",
    options: [
      { textAr: "الساحر البسيط: كيف صنعت الموهبة النقية والتواضع مسار التاريخ الكروي", textEn: "The Humble Magician: How pure natural talent and modesty rewrote football history", player: "messi" },
      { textAr: "العزيمة الشامخة: قصة البطل الخارق الذي تحدى المستحيل بعرق الجبين والانضباط", textEn: "Unyielding Will: The story of an athlete who conquered limits with sweat and discipline", player: "ronaldo" },
      { textAr: "تاج الشرق الأبي: مسيرة الإصرار والتواضع الملهَم لملايين الصدور الطموحة", textEn: "Crown of the East: A chronicle of resilience and warm inspiration to millions", player: "salah" },
      { textAr: "السمفونية الخالدة: قصة النبض التكتيكي والمايسترو الأنيق الذي قهر الزمن", textEn: "The Eternal Symphony: The tactical heartbeat of a classy maestro who conquered time", player: "modric" }
    ]
  }
];

export const PLAYER_PROFILES: PlayerProfile[] = [
  {
    id: "messi",
    nameAr: "ليونيل ميسي",
    nameEn: "Lionel Messi",
    titleAr: "الساحر العبقري ورمز الموهبة الفطرية الشاملة",
    titleEn: "The Genius Magician & Symbol of Ultimate Natural Talent",
    mottoAr: "دع قدميك تتكلمان، واترك السحر يصنع الواقع.",
    mottoEn: "Let your feet do the talking, and let the magic write reality.",
    avatarColor: "from-sky-500 via-blue-600 to-indigo-800",
    glowColor: "rgba(14, 165, 233, 0.4)",
    icon: "⚽",
    personalityAr: "أنت تجسد الموهبة الفطرية الفذة والهدوء المطلق والعبقرية الهادئة. تماماً مثل ليو ميسي، تفضل دائماً التواضع والابتعاد عن صخب الأضواء المزيفة، تاركاً أفعالك الساحرة وسيرتك العطرة تتحدث بالنيابة عنك في الملعب وخارجه. تمتاز بلمح البصر، وقدرة استثنائية على تذليل أصعب العقبات المعقدة بلمسات بسيطة، ورؤية تفوق الخيال لكل محيطك بحكمة وروية.",
    personalityEn: "You embody natural talent, absolute calm, and quiet genius. Just like Leo Messi, you always prefer humility and steer clear of superficial hype, letting your magic on the field speak for itself. You possess exceptional spatial vision and a unique ability to dissect complex challenges with effortless, simple touches under intense situations.",
    strengthsAr: ["التحكم بالكرة ملتصقة بقدماك", "مركز الجاذبية المنخفض والمرونة", "صناعة اللعب والتمرير الإعجازي", "التواضع والهدوء تحت أصعب الضغوط"],
    strengthsEn: ["Exceptional close control (ball glued to feet)", "Low center of gravity & extreme agility", "Visionary playmaking and line-bending passes", "Humble nature and absolute composure under pressure"],
    stats: { speed: 92, dribbling: 99, shooting: 96, stamina: 85, teamwork: 98 }
  },
  {
    id: "ronaldo",
    nameAr: "كريستيانو رونالدو",
    nameEn: "Cristiano Ronaldo",
    titleAr: "صاروخ ماديرا والوحش البشري ذو الإرادة الحديدية",
    titleEn: "The Madeira Rocket & Human Machine of Steel Will",
    mottoAr: "الوصول للقمة لا يأتي صدفة، بل هو ثمن السعي اليومي دون راحة.",
    mottoEn: "Reaching the top is no accident; it is the prize of restless daily striving.",
    avatarColor: "from-red-650 via-red-800 to-slate-900",
    glowColor: "rgba(220, 38, 38, 0.4)",
    icon: "🔥",
    personalityAr: "أنت الرمز والرمزية للشغف اللامتناهي، والعزيمة المقاتلة التي تلتهم ثلج الصعوبات، والعمل الشاق اليومي الدقيق. تماماً مثل الدون كريستيانو رونالدو، لست مستعداً على الإطلاق للقبول بغير الصدارة والمركز الأول، وثقتك المطلقة بقدراتك وتفانيك تصنع المعجزات وتكسر الأرقام المستحيلة وتثبت دائماً أن التفوق هو قرار تصنعه بعرق الجبين والانضباط الصارم.",
    personalityEn: "You are the ultimate symbol of relentless passion, absolute work ethic, and iron determination. Just like Cristiano Ronaldo, you never accept anything below the absolute first rank. Your unbreakable confidence and supreme self-discipline rewrite limits, breaking impossible records and proving that greatness is earned through daily sweat and loyalty.",
    strengthsAr: ["العقلية الأقوى في تاريخ الرياضة", "الارتقاء الجوي الخرافي والضربات الرأسية", "القوة العضلية والسرعة الانفجارية", "حسم المباريات التاريخية في الثواني الأخيرة"],
    strengthsEn: ["The strongest champion mindset in sports history", "Unbelievable gravity-defying aerial leap and headers", "Elite athletic condition with thundering shooting statistics", "Lethal clutch ability in the dying seconds of big finals"],
    stats: { speed: 94, dribbling: 88, shooting: 98, stamina: 96, teamwork: 82 }
  },
  {
    id: "mbappe",
    nameAr: "كيليان مبابي",
    nameEn: "Kylian Mbappé",
    titleAr: "الصاروخ الطموح وحاصد العروش الكروية العالمية",
    titleEn: "The Explosive Speed Rocket & Crown Collector of Football",
    mottoAr: "الشباب ليس عذراً، الطموح والسرعة قادران على هزيمة العالم.",
    mottoEn: "Youth is no excuse; burning ambition and blazing speed can conquer the world.",
    avatarColor: "from-blue-700 via-indigo-950 to-slate-900",
    glowColor: "rgba(43, 75, 233, 0.4)",
    icon: "⚡",
    personalityAr: "أنت سريع، حاسم، وطموحك الكاسح لا تقف في وجهه أي حدود! تماماً مثل الغزال الفرنسي كيليان مبابي، تعشق الأضواء المسلطة والتحديات القيادية الكبرى في المواعيد المصيرية. تملك ثقة بالذات تخولك حرق المسافات والتلاعب بأكبر المدافعين كالأشباح بفضل تركيزك العالي وسرعتك المدمرة وقدرتك على الحسم وتولي المسؤولية دون تردد.",
    personalityEn: "You are swift, decisive, and guided by a towering ambition that respects zero boundaries! Just like Kylian Mbappé, you thrive under spotlight and love executing leadership roles in high-stakes fixtures. You possess exceptional self-belief, letting you ghost past defenders with explosive velocity and instant finishing prowess.",
    strengthsAr: ["السرعة الفائقة والتحول المدمر", "المرونة التكتيكية داخل البساط", "برودة الأعصاب والجرأة أمام المرمى", "الطموح العالي والتحدي وعشق النهائيات"],
    strengthsEn: ["Supersonic sprints and devastating counter-attack gear", "Stellar technical elasticity down either wing", "Extreme cold-blooded composure when facing the goalkeeper", "High competitive ambition and hunger for historic final accolades"],
    stats: { speed: 99, dribbling: 94, shooting: 92, stamina: 89, teamwork: 84 }
  },
  {
    id: "haaland",
    nameAr: "إيرلينغ هالاند",
    nameEn: "Erling Haaland",
    titleAr: "المدمر النرويجي والآلة التهديفية الكاسحة",
    titleEn: "The Norwegian Destroyer & Unstoppable Goal Machine",
    mottoAr: "بدون تفكير معقد: تمركز جيد، ركز على المرمى، ودمر الشباك.",
    mottoEn: "No overthinking: find position, focus on goal, and destroy the net.",
    avatarColor: "from-amber-400 via-yellow-550 to-blue-900",
    glowColor: "rgba(245, 158, 11, 0.4)",
    icon: "🤖",
    personalityAr: "أنت الآلة الذكية المركزة على تحقيق الأهداف بكفاءة بالغة وقوية ومباشرة. كالإعصار النرويجي المقاتل هالاند، لا تعترف بالفلسفة الزائدة أو التعقيدات، فالحل لديك دائماً مباشر وعملي وصارم. تصب كامل طاقتك في القوة والتحرك الذكي داخل الصندوق وصيد أنصاف الفرص بإبادة تامة لآمال المدافعين، مع الاحتفاظ بروح مرحة عفوية تبهج قلوب رفاقك بصدق.",
    personalityEn: "You are a smart, target-focused machine executing tasks directly, powerfully, and with supreme efficiency. Just like Erling Haaland, you reject unnecessary philosophy—your strategies are direct, physical, and result-oriented. You invest everything in smart placement and converting half-chances, while maintaining a humorous, joyful spirit that bonds deeply with your crew.",
    strengthsAr: ["القوة الجسدية الجبارة والاندفاع الرهيب", "التواجد والتمركز الماكر بداخل الصندوق", "سرعة إنهاء لا ترحم وقذائف يسارية مدمرة", "الروح الطريفة العفوية في الحياة اليومية"],
    strengthsEn: ["Immense physical strength and explosive target drives", "Superb spatial mechanics inside the penalty compound", "Lethal clinical finishing and fierce left-foot strikes", "Spontaneous, lighthearted humor and loyal charisma with friends"],
    stats: { speed: 90, dribbling: 80, shooting: 99, stamina: 91, teamwork: 80 }
  },
  {
    id: "modric",
    nameAr: "لوكا مودريتش",
    nameEn: "Luka Modrić",
    titleAr: "المايسترو الأنيق وعازف السمفونيات الكروية الخالدة",
    titleEn: "The Elegant Maestro & Composer of Eternal football Orchestras",
    mottoAr: "العمر مجرد رقم عابر، بينما النضج الكروي والأناقة خالدين في الوجدان.",
    mottoEn: "Age is merely a passing number; vintage intelligence and aesthetic class are immortal.",
    avatarColor: "from-slate-700 via-emerald-800 to-indigo-950",
    glowColor: "rgba(16, 185, 129, 0.4)",
    icon: "🪄",
    personalityAr: "أنت قائد الاوركسترا الأنيق الهادئ الصبور المحرك لكامل خيوط المجموعة دون جلبة أو استعراض زائف. تماماً مثل لوكا كرواتيا، نشأت وكافحت في ظروف وتحديات شاقة تكللت بنضج أسطوري عظيم. تمتاز بقلب واثق صلب لا يعرف اليأس، وأخلاق رياضية رفيعة المستوى جعلت خصومك ومحبيك يقفون احتراماً لسمو أناقتك وعبقرية لمساتك وجهدك المستديم.",
    personalityEn: "You are the elegant, silent, and highly patient general orchestrating operations with modesty and class. Just like Luka Modrić, you navigated major early-life struggles to blossom into absolute premium wisdom. You possess an unbreakable spirit, fine integrity, and a gorgeous aesthetic style of play that commands respect from rivals and partners alike.",
    strengthsAr: ["رؤية تكتيكية فائقة تمسح كامل العشب", "لمسة بوجه القدم الخارجي (Trivela) سحرية", "المرونة والقدرة العظيمة على حيازة الكرة والتحكم بالنسق", "الصبر التام والمكافحة لتجاوز عقبات الحياة بكبرياء"],
    strengthsEn: ["Supremely scan-ready tactical vision reading landscapes", "The signature magical outside-of-foot pass (Trivela)", "Stellar balance, press-resistance and possession-retention", "Inspiring patience and humble work ethic in life’s uphill battles"],
    stats: { speed: 83, dribbling: 94, shooting: 84, stamina: 96, teamwork: 99 }
  },
  {
    id: "salah",
    nameAr: "محمد صلاح",
    nameEn: "Mohamed Salah",
    titleAr: "الملك المصري وفخر الشرق صاحب الابتسامة الملهمة",
    titleEn: "The Egyptian King & Eastern Pride with the Inspiring Smile",
    mottoAr: "بالثقة اللامتناهية والصبر والوفاء لقيمك، تُخلق القصة الملهمة للأجيال.",
    mottoEn: "With endless self-belief, patience, and staying true to your values, you write icons for generations.",
    avatarColor: "from-emerald-600 via-teal-800 to-slate-950",
    glowColor: "rgba(20, 184, 166, 0.4)",
    icon: "👑",
    personalityAr: "أنت مزيج خارق من التواضع الصادق والسرعة الخاطفة والكفاح الأسطوري الصبور المستمر للارتقاء وتغيير المصير. تماماً مثل فخر العرب والشرق محمد صلاح، تعشق بلادك وفخور بجذورك وعائلتك ومكافح دؤوب لأجل إسعادهم وإشعال الأمل في صدور الصغار. تمتاز بالرغبة والابتسامة الدافئة التي تذيب الصخور والروح النبيلة والمهارة والرشاقة المتجددة في حسم أصعب المواقف المعقدة ببراعة.",
    personalityEn: "You are a stellar blend of sincere humility, lightning-fast transitions, and a gorgeous journey of persistent struggle to elevate your destiny. Just like Mohamed Salah, you are deeply proud of your roots, values, and family, serving as a soaring beacon of hope to millions. Your warm, solid smile melts barriers, and your tactical agility solves the tightest challenges elegantly.",
    strengthsAr: ["الانطلاق السريع الخاطف على الأجنحة بكفاءة", "الإنهاء المتقن المقوس في الزوايا الـ 90 العالية", "الابتسامة والروح الإيجابية الملهمة التي تبعث الأمل", "الوفاء اللامتناهي للبلاد والجذور وخدمة المجتمع بصدق"],
    strengthsEn: ["Fierce accelerative wingspan sprints and drift-ins", "Exquisite curved finessed shots into top postage stamps", "A beautiful positive attitude that spreads inspiration to everyone", "Deep cultural loyalty, charity, and active support for local communities"],
    stats: { speed: 96, dribbling: 93, shooting: 94, stamina: 90, teamwork: 90 }
  }
];
