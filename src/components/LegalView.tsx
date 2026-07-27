import React, { useState } from "react";
import { ShieldCheck, FileText, Info, Mail, AlertTriangle, CheckCircle2, ArrowRight, Lock, HelpCircle, Send } from "lucide-react";

export type LegalPageType = "privacy" | "terms" | "about" | "contact" | "disclaimer";

interface LegalViewProps {
  page: LegalPageType;
  onNavigate: (page: LegalPageType) => void;
  isDarkMode: boolean;
}

export const LegalView: React.FC<LegalViewProps> = ({ page, onNavigate, isDarkMode }) => {
  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setFormSubmitted(true);
    }
  };

  const navTabs: { id: LegalPageType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "privacy", label: "سياسة الخصوصية", icon: ShieldCheck },
    { id: "terms", label: "الشروط والأحكام", icon: FileText },
    { id: "about", label: "من نحن", icon: Info },
    { id: "contact", label: "اتصل بنا", icon: Mail },
    { id: "disclaimer", label: "إخلاء المسؤولية", icon: AlertTriangle },
  ];

  const cardBgClass = isDarkMode
    ? "bg-slate-900 border-slate-800 text-slate-100"
    : "bg-white border-slate-200 text-slate-900 shadow-lg";

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-8 px-4 sm:px-6">
      {/* Top Banner & Quick Navigation Tabs */}
      <div className="space-y-4 text-center">
        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold px-4 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          الشفافية والالتزام بمعايير جوجل ناشرين AdSense
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {page === "privacy" && "سياسة الخصوصية وسرية البيانات"}
          {page === "terms" && "الشروط والأحكام وسياسة الاستخدام"}
          {page === "about" && "من نحن - عن منصة ديكورا Dkora"}
          {page === "contact" && "اتصل بنا ومعلومات النشر"}
          {page === "disclaimer" && "إخلاء المسؤولية وإفصاح العمولات"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto">
          تلتزم منصة ديكورا (Dkora.online) بأعلى معايير الشفافية وحماية بيانات الزوار والالتزام الكامل بقوانين النشر وحقوق الملكية الفكرية.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = page === tab.id;
            return (
              <a
                key={tab.id}
                href={`/${tab.id}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    onNavigate(tab.id);
                  }
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all border ${
                  isActive
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md scale-105"
                    : isDarkMode
                    ? "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Legal Content Container */}
      <div className={`p-6 sm:p-10 rounded-3xl border ${cardBgClass} leading-relaxed space-y-8`}>
        {/* ==================== 1. PRIVACY POLICY ==================== */}
        {page === "privacy" && (
          <div className="space-y-6 text-sm sm:text-base">
            <div className="border-b pb-4 border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-amber-500 font-bold">آخر تحديث: 27 يوليو 2026</span>
              <span className="text-xs text-slate-400">الإصدار المعتمد 2.4</span>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                1. مقدمة ونطاق سياسة الخصوصية
              </h2>
              <p>
                في منصة <strong>ديكورا (Dkora.online)</strong>، نعتبر خصوصية زوارنا الكرام ذات أهمية بالغة بالنسبة لنا. توضح هذه الوثيقة أنواع المعلومات الشخصية التي يتم استلامها وجمعها وكيفية استخدامها لحماية حقوق المستخدم وضمان تجربة تصفح آمنة ومريحة تتماشى مع معايير حماية البيانات العالمية (GDPR & CCPA) وبرنامج ناشري إعلانات جوجل AdSense.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                2. ملفات السجل (Log Files)
              </h2>
              <p>
                مثل العديد من المواقع الإلكترونية الأخرى، تشمل منصة ديكورا استخدام ملفات السجل. تشمل المعلومات داخل ملفات السجل: عناوين بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، تاريخ ووقت الزيارة، الصفحات المرجعية/صفحات الخروج، وعدد النقرات لتحليل الاتجاهات وإدارة الموقع ومتابعة حركة المستخدم داخل الموقع وجمع معلومات ديموغرافية. هذه البيانات ليست مرتبطة بأي معلومات تعرّف عن شخصيتك بشكل مباشر.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                3. ملفات تعريف الارتباط (Cookies) والشبكات الإعلانية (Google AdSense)
              </h2>
              <p>
                تستخدم منصة ديكورا ملفات تعريف الارتباط (Cookies) لتخزين المعلومات حول تفضيلات الزوار، ولتسجيل معلومات خاصة بالمستخدم حول الصفحات التي يصل إليها أو يزورها، وتخصيص محتوى صفحة الويب استناداً إلى نوع متصفح الزائر أو معلومات أخرى يرسلها الزائر عبر متصفحه.
              </p>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  ملاحظة هامة حول إعلانات جوجل (Google AdSense & DoubleClick):
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>جوجل كبائع طرف ثالث، يستخدم ملفات تعريف الارتباط لخدمة الإعلانات على موقع ديكورا.</li>
                  <li>يسمح استخدام جوجل لملف تعريف الارتباط DART بنشر الإعلانات للمستخدمين استناداً إلى زيارتهم لموقعنا والمواقع الأخرى على الإنترنت.</li>
                  <li>يمكن للمستخدمين اختيار عدم استخدام ملف تعريف الارتباط DART عن طريق زيارة سياسة الخصوصية الخاصة بشبكة جوجل للإعلانات والمحتوى.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                4. الشركاء الإعلانيين وبرامج التسويق بالعمولة (Affiliate Marketing)
              </h2>
              <p>
                قد يتم استخدام خوادم إعلانية أو شبكات إعلانية لأطراف ثالثة (مثل Google AdSense, Amazon Associates, Jumia, Noon) للتقنيات المستخدمة في الإعلانات والروابط التي تظهر على موقع ديكورا والتي ترسل مباشرة إلى متصفحك. وتحصل هذه الشبكات تلقائياً على عنوان IP الخاص بك عند حدوث ذلك.
              </p>
              <p>
                منصة ديكورا ليس لديها إمكانية الوصول إلى أو التحكم في ملفات تعريف الارتباط هذه التي يستخدمها المعلنون من الأطراف الثالثة.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                5. حماية الأطفال وحقوق حماية البيانات (GDPR)
              </h2>
              <p>
                نحن لا نجمع أي معلومات تعريف شخصية من الأطفال دون سن 13 عاماً. إذا كنت تعتقد أن طفلك قدم مثل هذه المعلومات على موقعنا، فنحن نشجعك بشدة على الاتصال بنا فوراً وسنبذل قصارى جهدنا لإزالة مثل هذه المعلومات فوراً من سجلاتنا.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                6. موافقتك والتواصل معنا
              </h2>
              <p>
                باستخدامك لموقعنا الإلكتروني، فإنك توافق بموجب هذا على سياسة الخصوصية الخاصة بنا وتوافق على شروطها. إذا كنت بحاجة إلى أي مزيد من المعلومات أو لديك أي أسئلة حول سياسة الخصوصية الخاصة بنا، لا تتردد في الاتصال بنا عبر البريد الإلكتروني: <a href="mailto:privacy@dkora.online" className="text-amber-500 underline font-bold">privacy@dkora.online</a>.
              </p>
            </section>
          </div>
        )}

        {/* ==================== 2. TERMS & CONDITIONS ==================== */}
        {page === "terms" && (
          <div className="space-y-6 text-sm sm:text-base">
            <div className="border-b pb-4 border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-amber-500 font-bold">تاريخ السريان: 27 يوليو 2026</span>
              <span className="text-xs text-slate-400">اتفاقية استخدام موقع ديكورا</span>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                1. قبول الشروط
              </h2>
              <p>
                أهلاً بك في موقع <strong>ديكورا (Dkora.online)</strong>. بدخولك وتصفحك لهذا الموقع، فإنك تقر وتوافق على الالتزام بالشروط والأحكام التالية وشروط الاستخدام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام موقعنا.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                2. الملكية الفكرية وحقوق النشر
              </h2>
              <p>
                جميع المحتويات المنشورة على هذا الموقع - بما في ذلك النصوص، المراجعات الفنية، جداول المقارنات، الصور التوضيحية، التصاميم، والشعار - هي ملك حصري لمنصة <strong>ديكورا</strong> ومحمية بموجب قوانين الملكية الفكرية وحقوق النشر الدولية.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li>يُمنع منعاً باتاً نسخ أو إعادة نشر أي مقال أو مراجعة دون إذن كتابي مسبق.</li>
                <li>يُسمح بالاستشهاد القصير مع وضع رابط مباشر واضح يشير إلى الصفحة الأصلية بالموقع.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                3. طبيعة المحتوى والاستخدام المقبول
              </h2>
              <p>
                المعلومات الواردة في هذا الموقع هي لأغراض الإرشاد العام والمعرفة الفنية فقط حول الأدوات والعدد الكهربائية واليدوية وديكورات المنازل. نحرص على تقديم أدق المراجعات والاختبارات، إلا أن القرارات النهائية لشراء الأدوات واستخدامها تقع على مسؤولية المشتري.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                4. التعليقات ومشاركات الزوار
              </h2>
              <p>
                يحق للمستخدمين كتابة آراء وتقييمات للمنتجات والعدد بشرط ألا تحتوي على إساءات أو محتوى ترويجي سبام أو ألفاظ غير لائقة. تحتفظ إدارة ديكورا بحق تعديل أو حذف أي تعليق يخالف السياسات.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                5. تعديل الشروط
              </h2>
              <p>
                يحق لإدارة منصة ديكورا تحديث شروط الاستخدام في أي وقت دون إشعار مسبق. يصبح الاستمرار في استخدام الموقع بعد إدخال التغييرات بمثابة موافقة على الشروط المعدلة.
              </p>
            </section>
          </div>
        )}

        {/* ==================== 3. ABOUT US ==================== */}
        {page === "about" && (
          <div className="space-y-6 text-sm sm:text-base">
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shrink-0 shadow-lg">
                D
              </div>
              <div>
                <h3 className="text-lg font-black text-amber-500">ديكورا Dkora - دليل العدد والأدوات وديكورات المنازل</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  منصة عربية مستقلة مخصصة لاختبار وتقييم ومقارنة المعدات والأدوات الكهربائية واليدوية وديكورات المنازل وفق معايير عالمية.
                </p>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                1. رسالتنا وهدفنا
              </h2>
              <p>
                تأسست منصة <strong>ديكورا (Dkora)</strong> لسد الفجوة في المحتوى العربي المتخصص في مجال العدد والأدوات الصناعية والمنزلية ومعدات الديكور. نهدف إلى تقديم مراجعات محايدة ودقيقة بنسبة 100% تساعد المهندسين، الفنيين، والحرفيين، وكذلك أصحاب المنازل على اختيار الأداة المناسبة لأعمالهم بأفضل قيمة مقابل السعر.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                2. منهجية الاختبار والتقييم (Testing Standards)
              </h2>
              <p>
                نعتمد في ديكورا على منهجية اختبار صارمة تحاكي معايير المنصات العالمية الشهيرة مثل (Wirecutter & Pro Tool Reviews):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-amber-500">⚡ الأداء والتجربة الميدانية</h4>
                  <p className="text-xs text-slate-500">قياس قدرة المحرك، السرعة RPM، وقوة العزم في ظروف العمل الشاقة.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-amber-500">🛡️ الجودة ومتانة التصنيع</h4>
                  <p className="text-xs text-slate-500">تقييم خامات التقفيل، العزل الكهربائي، ونظام التبريد لضمان طول العمر الافتراضي.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-amber-500">✋ الراحة وعوامل الأمان</h4>
                  <p className="text-xs text-slate-500">دراسة تصميم المقبض Ergonomics، الاهتزازات، ومزايا السلامة لحماية المستخدم.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-amber-500">💰 القيمة مقابل السعر والتوافر</h4>
                  <p className="text-xs text-slate-500">مقارنة الأسعار اليومية عبر المتاجر الكبرى وتوفر قطع الغيار والضمان الرسمي.</p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                3. فريق العمل والاستقلالية
              </h2>
              <p>
                يتكون فريق التحرير في ديكورا من مهندسين وفنيين متخصصين في الميكانيكا، الكهرباء، وهندسة الديكور والتصميم الداخلي. نحن لا نتلقى أي أموال مقابل إعطاء تقييمات إيجابية لأي ماركة، وجميع آرائنا صادرة عن تجارب واختبارات حقيقية.
              </p>
            </section>
          </div>
        )}

        {/* ==================== 4. CONTACT US ==================== */}
        {page === "contact" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <Mail className="w-6 h-6 text-amber-500" />
                <h4 className="font-bold text-sm">البريد الإلكتروني المباشر</h4>
                <p className="text-xs text-slate-500">للاستفسارات العامة والملاحظات:</p>
                <a href="mailto:contact@dkora.online" className="text-xs font-mono font-bold text-amber-500 block">
                  contact@dkora.online
                </a>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
                <h4 className="font-bold text-sm">الخصوصية وحقوق النشر</h4>
                <p className="text-xs text-slate-500">لطلبات تعديل البيانات والخصوصية:</p>
                <a href="mailto:privacy@dkora.online" className="text-xs font-mono font-bold text-amber-500 block">
                  privacy@dkora.online
                </a>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <Info className="w-6 h-6 text-amber-500" />
                <h4 className="font-bold text-sm">مقر هيئة التحرير والنشر</h4>
                <p className="text-xs text-slate-500">القاهرة - جمهورية مصر العربية</p>
                <span className="text-xs font-bold text-slate-400 block">منصة ديكورا Dkora.online</span>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                  <Send className="w-5 h-5 text-amber-400" />
                  أرسل رسالة مباشرة لإدارة الموقع
                </h3>
                <p className="text-xs text-slate-400">
                  يسعدنا التواصل معكم والرد على كافة استفساراتكم خلال فترة زمنية من 24 إلى 48 ساعة عمل.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold">تم استلام رسالتك بنجاح!</h4>
                  <p className="text-xs text-slate-300">
                    شكراً لتواصلك مع منصة ديكورا. يقوم فريق الدعم والمراجعة بالاطلاع على رسالتك وسنرد عليك عبر البريد الإلكتروني في أقرب وقت.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setContactMessage("");
                    }}
                    className="text-xs bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl hover:bg-emerald-400"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-xs">
                      <label className="font-bold text-slate-300">الاسم الكامل *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="مثال: أحمد محمود"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="font-bold text-slate-300">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-300">موضوع الرسالة</label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="استفسار، مراجعة أداة، أو اقتراح"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1 text-xs">
                    <label className="font-bold text-slate-300">نص الرسالة *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="اكتب تفاصيل استفسارك هنا..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الرسالة الآن</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ==================== 5. DISCLAIMER & AFFILIATE DISCLOSURE ==================== */}
        {page === "disclaimer" && (
          <div className="space-y-6 text-sm sm:text-base">
            <div className="border-b pb-4 border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono text-amber-500 font-bold">إفصاح الشفافية والعمولات</span>
              <span className="text-xs text-slate-400">تحديث 2026</span>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                1. إفصاح التسويق بالعمولة (Affiliate Disclosure)
              </h2>
              <p>
                تلتزم منصة <strong>ديكورا (Dkora.online)</strong> الشفافية الكاملة مع زوارنا الكرام. يحتوي موقعنا على روابط تسويق بالعمولة لأدوات ومنتجات كهربائية ويدوية عبر متاجر شريكة مثل (Amazon, Jumia, Noon).
              </p>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm space-y-2">
                <p className="font-bold text-amber-500">ماذا يعني هذا بالنسبة لك كزائر؟</p>
                <p>
                  عند النقر على أحد هذه الروابط وإتمام عملية الشراء، قد نحصل على عمولة بسيطة من المجر دون أي تكلفة إضافية عليك على الإطلاق. السعر الذي تدفعه هو نفسه تماماً سواء استخدمت رابطنا أو ذهبت للمتجر مباشرة. يساعدنا هذا الدخل البسيط على تغطية تكاليف تشغيل السيرفرات وإجراء الاختبارات الميدانية المستقلة.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                2. إخلاء مسؤولية السلامة والتشغيل الفني (Safety Disclaimer)
              </h2>
              <p>
                استخدام الأدوات والعدد الكهربائية (مثل الصاروخ، الشنيور، المناشير) ينطوي على مخاطر فيزيائية وكهربائية. جميع المراجعات والنصائح الواردة في موقع ديكورا هي لأغراض تعليمية وإرشادية فقط.
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                <li>يجب على المستخدم دائماً قراءة واتباع كتيب التعليمات (Manual) الخاص بالمصنع قبل تشغيل أي أداة.</li>
                <li>يجب ارتداء معدات الحماية الشخصية (نظارات وقاية، قفازات، كمامة ضد الغبار) أثناء العمل.</li>
                <li>لا تتحمل منصة ديكورا أي مسؤولية عن أضرار أو إصابات ناتجة عن الاستخدام الخاطئ للأدوات.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                3. دقة الأسعار وتوافر المنتجات
              </h2>
              <p>
                تتغير الأسعار والعروض والتوافر على المتاجر الإلكترونية بشكل مستمر. نعمل على تحديث الأسعار والمواصفات دورياً عبر أنظمة جلب البيانات الذكية، إلا أن السعر النهائي وتوافر المخزون المعروض على صفحة البائع المباشر وقت الشراء هو السعر الفعلي المعتمد.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
