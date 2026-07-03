import React from "react";
import { X, ShieldCheck, FileText, Scale } from "lucide-react";
import { Language, Tab } from "../types";

interface LegalPageModalProps {
  page: Tab;
  lang: Language;
  onClose: () => void;
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
}

export default function LegalPageModal({ page, lang, onClose, playSynthSound }: LegalPageModalProps) {
  const isAr = lang === "ar";

  const renderContent = () => {
    switch (page) {
      case "disclosure":
        return isAr ? (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-950/15 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-black">إخلاء مسؤولية الشراكة والعمولة الإلزامي</span>
            </div>
            <h3 className="text-sm font-black text-white">بيان المشاركة في برنامج التسويق بالعمولة لأمازون</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              موقع <strong>دي كورة (dkora.online)</strong> هو مشارك في برنامج أمازون للتسويق بالعمولة (Amazon Services LLC Associates Program)، وهو برنامج إعلاني مخصص لمساعدة المواقع والناشرين على كسب رسوم وعمولات إعلانية عن طريق الإعلان والربط المباشر بموقع أمازون (Amazon.com) وفروعه الإقليمية والمحلية.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              بصفتنا شركاء لأمازون، فإننا نحصل على عمولة ترويجية رمزية ومحددة من عمليات الشراء المؤهلة التي تتم بعد النقر على الروابط المنشورة في موقعنا. <strong>نود التأكيد على أن هذه العمولة لا تفرض أي تكلفة إضافية عليك كمشترٍ</strong>، بل نتقاضاها بالكامل من أمازون تقديراً لتوجيهك للشراء.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              تساعدنا هذه العمولات في تغطية تكاليف الخوادم، الصيانة، وتجربة المنتجات الرياضية المستمرة لتقديم مراجعات دقيقة ونزيهة خالية من الانحياز لعملائنا في العالم العربي.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-950/15 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-black">Mandatory FTC & Amazon Associates Disclosure</span>
            </div>
            <h3 className="text-sm font-black text-white">Amazon Services LLC Associates Program Statement</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The website <strong>Dkora (dkora.online)</strong> is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for website owners to earn advertising fees and commissions by advertising and linking to Amazon.com and affiliated global marketplaces.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              As an Amazon Associate, we earn qualified affiliate commissions from purchases made through our referral links. <strong>This does NOT add any extra cost or surcharge to your purchase price</strong>. The retail price is exactly the same as what you would pay directly on Amazon.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              These referral fees assist us in maintaining active hosting servers, licensing high-fidelity visual trackers, and reviewing products objectively to provide reliable guides for sports enthusiasts globally.
            </p>
          </div>
        );

      case "privacy":
        return isAr ? (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-950/15 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-emerald-400">
              <FileText className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-black">سياسة الخصوصية واستخدام ملفات الارتباط</span>
            </div>
            <h3 className="text-sm font-black text-white">١. جمع المعلومات واستخدامها</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              نحن في موقع دي كورة نحترم خصوصيتك بالكامل. لا نقوم بجمع أو تخزين أي بيانات شخصية أو معلومات مالية خاصة بك عند تصفح المتجر، حيث أن جميع عمليات الشراء والدفع والفوترة تتم بالكامل وبشكل مشفر وآمن عبر بنية خوادم متجر أمازون الرسمي.
            </p>
            <h3 className="text-sm font-black text-white">٢. ملفات تعريف الارتباط (Cookies)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              عند نقرك على زر "تحقق من السعر على أمازون"، قد تقوم خوادم أمازون بزرع ملف تعريف ارتباط مؤقت (Cookie) آمن لتتبع الإحالة لغايات احتساب عمولتنا الترويجية. هذه الملفات صالحة لمدة ٢٤ ساعة وتنتهي تلقائياً ولا تتسبب في أي مخاطر أمنية على جهازك.
            </p>
            <h3 className="text-sm font-black text-white">٣. الأمان وحماية البيانات</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              موقعنا محمي بالكامل بشهادات أمان SSL مشفرة لضمان تصفح مريح وخالٍ من البرمجيات الضارة. نوصي دائماً بالتأكد من مراجعة سياسة خصوصية أمازون عند التحويل لإتمام الطلب.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-950/15 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-emerald-400">
              <FileText className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-black">Privacy Policy & Cookie Usage</span>
            </div>
            <h3 className="text-sm font-black text-white">1. Data Collection & Safety</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              At Dkora, we prioritize user privacy. We do not gather, store, or process any personal identification data or financial transactions. All payment processing, shopping baskets, and order deliveries are securely processed by Amazon under their global encryption standards.
            </p>
            <h3 className="text-sm font-black text-white">2. Referral Cookie Tracking</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upon clicking "Check Price on Amazon", Amazon's servers may inject a temporary cookie to track your referral. This is used solely to calculate our qualified advertising commission. These safe tracking cookies automatically expire within 24 hours.
            </p>
            <h3 className="text-sm font-black text-white">3. SSL Security Protocols</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our website employs high-grade SSL certificates to encrypt all data streams, preventing unauthorized interception. We advise checking Amazon's standard policy guidelines upon completing your checkout cycle.
            </p>
          </div>
        );

      case "terms":
        return isAr ? (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-950/15 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-emerald-400">
              <Scale className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-black">شروط الخدمة والاستخدام</span>
            </div>
            <h3 className="text-sm font-black text-white">١. دقة أسعار المنتجات وعروضها</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              الأسعار المعروضة في موقع دي كورة هي أسعار تقديرية ومحدثة بشكل دوري. قد تختلف الأسعار أو توافر المخزون عما هو معروض في موقعنا نظراً للتحديثات السريعة والمستمرة لعروض وتخفيضات متجر أمازون. السعر الفعلي المطبق هو السعر المعروض على أمازون وقت الشراء الفعلي.
            </p>
            <h3 className="text-sm font-black text-white">٢. الضمانات وخدمات ما بعد البيع</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              جميع المنتجات، جودتها، كفالتها، توصيلها، وسياسات استرجاعها تقع تحت المسؤولية الكاملة للبائعين وشركة أمازون. لا يتحمل موقع دي كورة أي مسؤولية قانونية أو مدنية ناتجة عن عيوب في التصنيع أو تأخر الشحن.
            </p>
            <h3 className="text-sm font-black text-white">٣. حدود المسؤولية</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              باستخدامك لموقعنا، فإنك تقر وتوافق على أن دورنا ينحصر في الترشيح والتسويق بالعمولة فقط، وأن أي نزاع أو شكوى يجب تقديمها مباشرة لدعم عملاء أمازون.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 bg-emerald-950/15 border border-emerald-500/10 rounded-xl flex items-center gap-2 text-emerald-400">
              <Scale className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-black">Terms of Service & Usage Conditions</span>
            </div>
            <h3 className="text-sm font-black text-white">1. Price Accuracies & Fluctuations</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Product prices and availability featured on Dkora are estimates updated periodically. Real-time changes might happen on Amazon.com before sync. The official final price of any item is determined strictly by Amazon's checkout page at the time of purchase.
            </p>
            <h3 className="text-sm font-black text-white">2. Shipping, Quality, & Warranties</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dkora holds no liability for shipping delays, manufacturer defects, or product returns. All customer care service requests must be submitted directly to Amazon's support helpdesk.
            </p>
            <h3 className="text-sm font-black text-white">3. Acceptable Use Policy</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              By navigating this portal, you accept that Dkora operates strictly as an independent product curator and catalog referrer. Any disputes must resolve directly on Amazon with their respective sellers.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl bg-[#080d0a] border border-emerald-900/40 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-2xl relative"
        dir={isAr ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-950/40">
          <h2 className="text-base sm:text-lg font-black text-white">
            {page === "disclosure" && (isAr ? "إفصاح الشراكة مع أمازون" : "Amazon Partner Disclosure")}
            {page === "privacy" && (isAr ? "سياسة الخصوصية والملفات" : "Privacy & Cookie Policy")}
            {page === "terms" && (isAr ? "شروط الخدمة والمسؤولية" : "Terms of Service")}
          </h2>
          <button
            onClick={() => {
              playSynthSound(350, "sine", 0.05);
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="py-2 overflow-y-auto max-h-[60vh]">{renderContent()}</div>

        {/* Footer */}
        <div className="pt-4 border-t border-emerald-950/40 flex justify-end">
          <button
            onClick={() => {
              playSynthSound(440, "sine", 0.05);
              onClose();
            }}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer"
          >
            {isAr ? "فهمت وموافق" : "I Understand & Accept"}
          </button>
        </div>
      </div>
    </div>
  );
}
