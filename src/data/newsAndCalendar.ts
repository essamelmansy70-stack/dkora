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
    id: "guide-baby-runner-online",
    titleAr: "دليل احتراف لعبة جري الأطفال: كيف تحقق أعلى النقاط وتفوز في Baby Runner Game Online",
    titleEn: "Baby Runner Game Online Pro Guide: Ultimate Tips for Achieving High Scores",
    excerptAr: "اكتشف أفضل النصائح والحيل والأساليب لتفادي العقبات الصعبة، وجمع القطع الذهبية الكثيرة، واحتراف لعبة Baby Runner Game الشهيرة بدون تحميل.",
    excerptEn: "Unlock top-tier strategies to dodge tricky blockades, scoop up golden coins, and master the iconic Baby Runner Game online with zero downloads.",
    contentAr: `تعتبر لعبة جري الأطفال (Baby Runner Game) واحدة من أكثر ألعاب الركض اللانهائي متعة وتشويقاً على منصتنا. إذا كنت تبحث عن المتعة وتحدي أرقامك القياسية، فإن هذا الدليل يقدم لك كل ما تحتاجه لتصبح بطلاً محترفاً في لعبة baby runner game online.

1. فهم طريقة اللعب والتحكم:
اللعبة تعتمد على ردود الفعل السريعة والتوقيت المثالي. يركض الطفل الصغير اللطيف تلقائياً إلى الأمام، ومهمتك هي توجيهه لتفادي العقبات المختلفة التي تظهر فجأة على الطريق عن طريق القفز أو الانزلاق السريع.

2. أهم النصائح لزيادة نتيجتك (High Score):
- التركيز على جمع العملات الذهبية: العملات ليست مجرد نقاط إضافية، بل هي وسيلتك الرئيسية لفتح الترقيات والمكافآت داخل اللعبة.
- التنبؤ بالعقبات مسبقاً: لا تنظر فقط إلى مكان الطفل الحالي، بل اجعل نظرك دائماً متقدماً بمقدار خطوة إلى الأمام على الشاشة لتستعد للقفزة التالية مبكراً.
- الاستفادة من عناصر القوة (Power-ups): تظهر عناصر قوة مبعثرة على الطريق مثل المغناطيس لجمع العملات تلقائياً، أو درع الحماية الذي يمنحك فرصة ثانية عند الاصطدام. احرص على التقاطها فوراً!

3. استراتيجيات تخطي العقبات المعقدة:
- القفز المزدوج السريع: بعض الحواجز تكون طويلة جداً وتتطلب قفزاً دقيقاً في آخر لحظة لضمان العبور بسلام.
- الهبوط السريع: إذا قمت بالقفز ورأيت حاجزاً منخفضاً قادماً فوراً، اسحب لأسفل لتجعل الطفل يهبط بسرعة فائقة ويتفادى الارتطام.

استمتع باللعبة الآن مباشرة على منصة ديكورا العاب دون الحاجة لتحميل أو نوافذ منبثقة مزعجة!`,
    contentEn: `The Baby Runner Game is one of the most exciting, fast-paced endless running experiences available on our web arcade. If you want to conquer high scores and run like a champion, this ultimate guide will teach you everything about baby runner game online tactics.

1. Core Gameplay & Controls:
The game is completely built around quick reflexes and impeccable timing. The cute little baby dashes forward automatically, and your job is to guide them through dangerous lanes by jumping or sliding smoothly beneath obstacles.

2. Crucial Tips for High Scores:
- Prioritize Coin Collection: Coins are not just decorations; they accumulate your final multiplier and unlock special power-ups.
- Look Ahead: Instead of focusing directly on the baby's current position, keep your eyes slightly forward on the screen to predict upcoming blockades.
- Grab Power-Ups Immediately: Items like the Coin Magnet or Invincibility Shield offer major boosts and survival buffers. Always prioritize snatching them!

3. Advanced Obstacle Navigation:
- Frame-Perfect Jumps: Some double barriers require jumping at the absolute edge of a platform.
- Fast Descending: If you find yourself mid-air with a low barrier approaching, swipe down to initiate a fast-fall to slide underneath.

Enjoy Baby Runner Game now with zero download requirements on Dkora Games!`,
    date: "2026-09-07T12:00:00Z",
    category: "guides",
    authorAr: "فريق تطوير ألعاب ديكورا",
    authorEn: "Dkora Game Dev Team",
    image: "/bitcoin_analysis_2026_1787623697779.jpg"
  },
  {
    id: "strategy-mine-keeper",
    titleAr: "استراتيجيات لعبة Mine Keeper: دليل حماية مناجم الذهب وبناء الإمبراطورية العميقة",
    titleEn: "Mine Keeper Ultimate Strategy Guide: Defending Gold Mines and Empire Building",
    excerptAr: "كيف تحمي العمال الأقزام، وتجمع الجواهر النادرة، وتتصدى للوحوش المظلمة بكفاءة عالية في لعبة Mine Keeper الأسطورية.",
    excerptEn: "Learn how to safeguard dwarf miners, harvest premium gems, and build an impenetrable defensive grid in Mine Keeper.",
    contentAr: `تأخذك لعبة Mine Keeper في رحلة ملحمية لإدارة وحماية مناجم الذهب والجواهر تحت الأرض. لتحقيق الفوز وصنع إمبراطورية ذهبية ناجحة، اتبع هذه الاستراتيجيات المعتمدة:

1. إدارة الموارد والتعدين الذكي:
الذهب والجواهر هي شريان الحياة لمملكتك. ركز في البداية على ترقية أدوات الحفر والتنقيب لزيادة سرعة جمع المعادن، مما يوفر لك السيولة اللازمة لشراء الدفاعات.

2. بناء شبكة الدفاع والحراس:
تتحرك الوحوش في مسارات محددة لمهاجمة العمال وسرقة حصادك.
- ضع الحراس المدافعين في نقاط الاختناق (Chokepoints) لتوجيه أكبر ضرر ممكن للوحوش المارة.
- وازن بين المدافعين بعيدي المدى (أقواس السهام) والمدافعين ذوي الضرر الجماعي (قاذفات القنابل).

3. أسرار الصمود في الموجات المتقدمة:
- قم بترقية الحراس الحاليين بدلاً من ملء الخريطة بحراس ضعفاء؛ حيث تمنح الترقية قوة هجومية وصحة مضاعفة بكثير.
- استخدم الجواهر النادرة لفتح مهارات خاصة مثل تجميد الوحوش مؤقتاً أو إسقاط نيازك نارية كاسحة عند الطوارئ.

العب Mine Keeper الآن وعش متعة الإثارة والتخطيط الاستراتيجي بالكامل مجاناً وبدون تحميل.`,
    contentEn: `Mine Keeper places you in charge of a subterranean mining empire that must be protected at all costs. To master the depths and shield your precious gold mines, apply these pro strategies:

1. Smart Resource Distribution:
Gold and gems are your currency for survival. Focus early capital on upgrading digging tools to speed up extraction, ensuring you have enough funds for defenses.

2. Implementing Defensive Grids:
Monsters raid the mines in designated waves to eliminate miners.
- Position your guardians at chokepoints to maximize their active firing range.
- Maintain a balance between single-target archers and splash-damage bomb launchers.

3. Survival in Late-Game Waves:
- Upgrade Existing Defenders: A single high-level guardian is far more powerful and space-efficient than multiple low-level units.
- Tactical Abilities: Save your rare gem points to trigger screen-clearing spells, such as freezing blizzards or meteor strikes, during emergency situations.

Master Mine Keeper today and experience strategic browser gaming at its finest on Dkora Games!`,
    date: "2026-09-06T15:30:00Z",
    category: "strategy",
    authorAr: "محلل الألعاب الاستراتيجية",
    authorEn: "Strategic Gaming Specialist",
    image: "/stop_loss_forex_2026_1787612278666.jpg"
  },
  {
    id: "tips-crazy-car-drive",
    titleAr: "نصائح التحكم في لعبة Crazy Car Drive: كيف تتفادى حركة المرور وتكسر الأرقام القياسية",
    titleEn: "Crazy Car Drive Controls & Drifting: How to Dodge Traffic and Beat High Scores",
    excerptAr: "احترف قيادة السيارات فائقة السرعة على الطرق المزدحمة وتجاوز العقبات الصعبة في لعبة Crazy Car Drive الممتعة.",
    excerptEn: "Master fast-paced highway driving, control sudden drifts, and outrun heavy traffic in Crazy Car Drive Road Challenge.",
    contentAr: `لعبة سباق السيارات Crazy Car Drive Road Challenge هي التحدي الحقيقي لعشاق السرعة والمناورات الخطيرة. لتتفادى حوادث الطرق المروعة وتحقق الرقم القياسي، اتبع هذه النصائح الاحترافية:

1. فهم ميكانيكية توجيه السيارة:
السيارة تسير بسرعات جنونية، ومجرد لمسة بسيطة لزر التوجيه قد تسبب انزلاقاً كبيراً. تدرب على النقر الخفيف (Tapping) بدلاً من الضغط المستمر لتغيير الحارات المرورية بسلاسة تامة.

2. استغلال الفجوات المرورية:
- لا تقم بالتبديل العشوائي بين الحارات. راقب حركات الشاحنات والسيارات البطيئة أمامك وحاول التنبؤ بمساراتها المفتوحة.
- حافظ على سرعة ثابتة، واستخدم المكابح (Brakes) فقط عند الضرورة القصوى لتجنب فقدان زخم السرعة.

3. ترقية سيارتك للحصول على أداء أفضل:
اجمع النقاط والجوائز لترقية المحرك، وتماسك الإطارات، والمكابح. تمنحك السيارة المطورة ثباتاً مذهلاً على السرعات العالية وسرعة استجابة فائقة تنقذك من الاصطدامات المفاجئة.

تحدَّ أصدقائك الآن في لعبة Crazy Car Drive على ديكورا العاب واثبت جدارتك كأفضل سائق محترف!`,
    contentEn: `Crazy Car Drive Road Challenge is the ultimate drift and speed test for racing enthusiasts. To avoid catastrophic highway crashes and climb the leaderboards, keep these professional driving tips in mind:

1. Master Micro-Steering:
At extreme speeds, holding down directional buttons causes severe drift and loss of control. Use short, rapid taps to change lanes smoothly and maintain balance.

2. Reading Traffic Flow:
- Never switch lanes impulsively. Watch the patterns of slow-moving trucks and civilian sedans ahead to spot open gaps.
- Maintain Momentum: Only tap the brakes when absolutely cornered, as preserving speed is key to setting new records.

3. Car Customization & Upgrades:
Accumulate cash from successful runs to upgrade your engine, tire grip, and brakes. A well-tuned vehicle offers phenomenal handling and rescues you from sudden near-misses.

Play Crazy Car Drive now and claim your title as the king of the highway on Dkora Games!`,
    date: "2026-09-05T09:15:00Z",
    category: "tips",
    authorAr: "خبير ألعاب المحاكاة والسباقات",
    authorEn: "Racing Games Specialist",
    image: "/gold_forex_risk_management_1787538156014.jpg"
  }
];

export const initialCalendarEvents: CalendarEvent[] = [];
