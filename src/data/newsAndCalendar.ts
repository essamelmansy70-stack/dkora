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
    image: "https://img.gamemonetize.com/0vdn4l2vgna7n9wajszk0koxniu6jj1o/512x384.jpg"
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
    image: "https://img.gamemonetize.com/ra1s374djivnm6mmn1y8a3fodcttcwxg/512x384.jpg"
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
    image: "https://img.gamemonetize.com/lr5hsvl3tbnbie5oi73b2prqe59fq1fp/512x384.jpg"
  },
  {
    id: "seo-free-games-2026",
    titleAr: "دليلك الشامل لعام 2026: ثورة العاب مجانية أونلاين بدون تحميل وكيف غيرت مستقبل الترفيه الرقمي",
    titleEn: "The Ultimate 2026 Guide: The Free Games Revolution Online with Zero Downloads",
    excerptAr: "استكشف كيف أصبحت منصات العاب مجانية الخيار الأول لملايين اللاعبين عالمياً في عام 2026، وتعرف على أهم مميزاتها وأفضل الألعاب التي يمكنك الاستمتاع بها فوراً دون استهلاك سعة تخزين هاتفك.",
    excerptEn: "Explore how free online games have become the ultimate choice for millions in 2026. Discover top features and how to play instantly in your browser without wasting device memory.",
    contentAr: `شهد العالم الرقمي في عام 2026 تحولاً استثنائياً في طريقة تفاعل المستخدمين مع محتوى الويب، وبرزت منصات تقديم **العاب مجانية** كواحدة من أكثر الوجهات زيارة وتأثيراً. مع تطور تقنيات المتصفحات ولغات البرمجة المتقدمة مثل HTML5 و WebGL، لم يعد اللاعبون بحاجة إلى انتظار ساعات طويلة لتحميل ملفات الألعاب الكبيرة أو القلق بشأن توافق بطاقات الرسوميات. اليوم، بفضل توفر **العاب مجانية** ذات أداء فائق ومباشر، أصبح بإمكان أي شخص فتح هاتفه الذكي أو حاسوبه الشخصي والبدء في اللعب خلال ثوانٍ معدودة.

في هذا المقال الشامل، سنستعرض بالتفصيل العوامل التي جعلت فئة **العاب مجانية** تهيمن على السوق الرقمي، وكيف تقدم منصة "ديكورا العاب" تجربة لعب فريدة ترتقي إلى تطلعات اللاعب العربي في عام 2026.

---

### لماذا أصبحت الـ العاب مجانية الخيار المفضل للملايين؟

1. **التوفير المالي والوصول غير المحدود:**
الدافع الرئيسي لانتشار هذه الفئة واضح تماماً؛ فهي توفر متعة لا نهائية مجاناً بالكامل. في الماضي، كانت الألعاب الممتازة تتطلب اشتراكات شهرية أو شراء نسخ مادية بأسعار مرتفعة. أما الآن، فيمكنك الدخول إلى كنز حقيقي من الألعاب دون دفع قرش واحد، مما يجعلها خياراً عادلاً ومتاحاً للجميع.

2. **اللعب الفوري وبدون تحميل (Instant Play):**
أكبر ميزة تقدمها منصات **العاب مجانية** أونلاين هي القضاء التام على عوائق التحميل والتثبيت. لا مزيد من الرسائل المزعجة مثل "ذاكرة الهاتف ممتلئة" أو "يرجى الانتظار حتى اكتمال التحديث". بنقرة زر واحدة، يتم تحميل اللعبة محلياً في الذاكرة المؤقتة لمتصفحك لتبدأ المغامرة فوراً.

3. **التوافق التام مع جميع الأجهزة (Cross-Platform):**
سواء كنت تستخدم هاتفاً ذكياً قديماً بنظام أندرويد، أو جهاز آيباد حديث، أو حاسوب مكتب متواضع، فإن الـ **العاب مجانية** المتوفرة عبر المتصفح مصممة لتتكيف تلقائياً مع حجم الشاشة وقدرات المعالجة لديك، مما يوفر تجربة لعب سلسة وثابتة بمعدل إطارات مرتفع.

---

### تصنيفات الـ العاب مجانية الأكثر شعبية على ديكورا

تتميز منصة ديكورا بتقديم مكتبة ضخمة ومتنوعة تلبي رغبات جميع الفئات العمرية والاهتمامات، ومن أبرز هذه الأقسام:

*   **العاب مجانية للأطفال والبنات:**
    تحظى هذه الألعاب باهتمام فائق نظراً للألوان المبهجة والمستويات التفاعلية البسيطة والآمنة التي تنمي مهارات التنسيق البصري والحركي للأطفال. من أفضل الأمثلة على ذلك لعبة **Baby Runner Game** التي تجمع بين الحماس والرسوميات اللطيفة.
*   **العاب مجانية للسباقات والسرعة:**
    لمحبي الأدرينالين والسرعة الفائقة، يقدم قسم سباق السيارات تحديات مذهلة تجعلك تشعر وكأنك خلف عجلة القيادة الحقيقية. يمكنك خوض تحديات جنونية مثل **Crazy Car Drive** والتفحيط على الطرق السريعة المزدحمة بالمرور.
*   **العاب المغامرات والاستراتيجية:**
    إذا كنت تفضل التخطيط والتفكير بعمق وبناء الممالك، يمكنك العثور على ألعاب فريدة مثل **Mine Keeper** حيث تقود جيشاً من الأقزام للتنقيب عن الذهب وحماية منجمك الثمين من هجمات الوحوش الأسطورية.

---

### معايير الأمان والجودة في اختيار العاب مجانية أونلاين

مع كثرة المواقع الإلكترونية التي تعرض ألعاباً مختلفة، تبرز منصة "ديكورا" كبيئة آمنة وموثوقة لعدة أسباب تهم كل مستخدم:

*   **حماية البيانات والخصوصية:** لا تتطلب ألعابنا تنزيل برامج مشبوهة أو ملفات قد تحتوي على فيروسات ضارة بجهازك. كل شيء يعمل داخل إطار المتصفح الآمن والمحمي.
*   **خلو التجربة من النوافذ المنبثقة (No Pop-ups):** نحرص في ديكورا على تقديم تجربة تصفح نظيفة تماماً، بعيداً عن الإعلانات المتطفلة التي تعيق متعة اللعب وتزعج المستخدمين.
*   **تحديث مستمر للمحتوى:** يضيف فريق المطورين لدينا عناوين جديدة دورياً، لنضمن أنك ستجد دائماً أحدث وأقوى الـ **العاب مجانية** بمجرد زيارتك للموقع.

---

### كيف تستمتع بأفضل تجربة لعب في 2026؟

للحصول على أداء خارق وخالٍ من التقطيع أثناء الاستمتاع بـ **العاب مجانية**، نوصي باتباع الخطوات البسيطة التالية:
1.  **استخدام متصفح حديث ومحدث:** مثل جوجل كروم (Google Chrome) أو سفاري (Safari) لضمان الدعم الكامل لتقنيات تسريع الرسوميات البرمجية.
2.  **اتصال مستقر بالإنترنت:** على الرغم من أن الألعاب خفيفة الوزن، إلا أن الاتصال الثابت يضمن عدم حدوث أي انقطاع أثناء تحميل مستويات اللعبة المتقدمة.
3.  **إضافة الموقع للمفضلة:** احفظ رابط منصة ديكورا العاب لتتمكن من الوصول لآلاف الألعاب بلمسة واحدة في أي وقت ومكان.

في الختام، لم تعد الـ **العاب مجانية** مجرد تسلية بسيطة لتمضية الوقت، بل أصبحت صناعة متطورة قائمة على الابتكار والسهولة الفائقة في الوصول. انضم الآن إلى ملايين اللاعبين وعش الإثارة الحقيقية على منصة ديكورا العاب!`,
    contentEn: `The digital landscape in 2026 has witnessed a massive shift in how users interact with online web content, with platforms offering **free games** rising to the top. Thanks to major advancements in browser technology and framework performance like HTML5 and WebGL, players no longer have to wait hours downloading massive files or worrying about GPU configurations. Today, with high-performance **free games** available directly at your fingertips, anyone can open their smartphone or PC and start playing within seconds.

In this masterclass guide, we will dive deep into why browser-based **free games** dominate the gaming industry in 2026 and how Dkora Games delivers a premier, safe, and highly optimized experience tailored to gamers worldwide.

---

### Why Free Games Have Captured the Hearts of Millions

1. **Zero Financial Barriers:**
The main driver is obvious: unlimited entertainment for free. Historically, high-tier games required expensive hardware and costly CD purchases. Today, you can explore a massive catalog of engaging games with zero subscriptions or microtransactions.

2. **Instant Playability (No Storage Clogs):**
The greatest perk of online **free games** is the complete elimination of downloads. Forget about those annoying \"Device Storage Full\" notifications. A single click loads all necessary visual assets directly into your browser's local cache, starting the game instantly.

3. **Complete Cross-Platform Compatibility:**
Whether you are holding an older Android device, a modern iPad, or sitting at a simple workstation PC, our online **free games** scale dynamically to match your device resolution and performance capabilities, ensuring a smooth, lag-free gameplay loop.

---

### Most Popular Free Games Categories on Dkora

Our gaming hub is meticulously curated to cater to all age groups and preferences, featuring:

*   **Free Games for Kids & Girls:**
    Full of bright colors, simple mechanics, and cognitive challenges. Games like **Baby Runner Game** provide an incredibly fun, cute, and safe endless running adventure that builds fast motor coordination.
*   **Racing & Hypercasual Games:**
    For speed lovers and drift junkies, our car racing category brings hyper-realistic, action-packed fun. Master challenging mechanics in titles like **Crazy Car Drive** as you weave through heavy traffic.
*   **Action & Strategic Conquests:**
    If you prefer deeper thinking and resource building, delve into tactical games like **Mine Keeper**, where you lead dwarf armies to mine precious gems while keeping ancient monsters at bay.

---

### Safety and Quality Standards for Browser Gaming

With hundreds of websites showcasing web games, Dkora stands out as a highly reliable and safe platform for several core reasons:

*   **Total Device Security:** Since our games run entirely sandboxed within the browser, you never run the risk of downloading infected software, securing your private documents and data.
*   **Uninterrupted Experience (No Aggressive Ad Popups):** We believe in beautiful design and positive user experiences. Our gaming portal is optimized to eliminate spam and keep your sessions completely clean.
*   **Constantly Evolving Arcade:** Our gaming development team integrates new, exciting, and trending titles every week, ensuring you always find fresh material to master.

Bookmark Dkora Games today to join millions of active players and experience premium browser gaming instantly!`,
    date: "2026-09-08T20:00:00Z",
    category: "guides",
    authorAr: "رئيس قسم السيو وتطوير المحتوى",
    authorEn: "Head of SEO & Content Strategy",
    image: "https://img.gamemonetize.com/dxerm97p0pioazt3zsxhphhtueq3pavf/512x384.jpg"
  }
];

export const initialCalendarEvents: CalendarEvent[] = [];
