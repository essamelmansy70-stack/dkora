import { X, ShieldAlert, FileText, Lock, Globe } from 'lucide-react';

interface LegalModalsProps {
  isOpen: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModals({ isOpen, onClose }: LegalModalsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header of Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-[#ff1a40]">
            {isOpen === 'privacy' ? <ShieldAlert className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {isOpen === 'privacy' ? 'سياسة الخصوصية وسرية البيانات والأمان' : 'شروط الخدمة وبنود الاستخدام'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-350 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
          >
            إغلاق
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content of Modal */}
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans space-y-4 text-right">
          {isOpen === 'privacy' ? (
            <>
              <div className="flex gap-3 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-emerald-800 dark:text-emerald-400">
                <Lock className="w-10 h-10 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-sm mb-1">خصوصية بنسبة ١٠٠٪ (المعالجة في المتصفح فقط)</span>
                  نحن نضمن حماية صورك بالكامل. جميع عمليات ضغط الصور، وعزل الخلفية، وتركيب الشعارات والعلامات المائية تتم <b>محلياً بالكامل داخل متصفح الإنترنت الخاص بك</b> ولا يتم رفعها أو نسخها أو حفظها نهائياً في أي خادم أو سيرفر خارجي.
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">1. جمع البيانات الشخصية:</h4>
                <p className="text-xs">
                  تطبيق <b>imgdkora</b> لا يقوم بطلب أو جمع أي بيانات تعريفية شخصية، أو حسابات تواصل، أو سجلات تتبع للمستعملين. إننا لا نستخدم ملفات تتبع غازية لجمع معلوماتك الخاصة.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">2. معالجة الصور الكثيفة:</h4>
                <p className="text-xs">
                  كافة الحسابات الرياضية المتقدمة للذكاء اللوني وتكثيف البكسل والمسح التسامحي تجري محلياً عبر وحدة المعالجة المركزية (CPU) والرسومية الخاصة بجهازك مباشرة، مما يضمن أعلى سقف من الأمان والسرية الفائقة للمصورين وصانعي المحتوى الإعلاني.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">3. ملفات كوكيز والطرف الثالث:</h4>
                <p className="text-xs">
                  نحن نستخدم كوكيز تخزين محلي (LocalStorage) فقط وحصرياً لحفظ خيارات تفضيلاتك مثل (اختيار الوضع الليلي، تفعيل كتم الصوت) لضمان تجربة مستخدم سلسة في الزيارات القادمة.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">4. تعديلات السياسة:</h4>
                <p className="text-xs">
                  قد يتم تحديث بنود سياسة الخصوصية بشكل دوري لمواكبة تقنيات المتصفحات الحديثة، وسيتم نشر التغييرات الفنية في هذه الصفحة مباشرة.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3 bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 text-rose-800 dark:text-[#ff3b5c]">
                <Globe className="w-10 h-10 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-sm mb-1">تراخيص استخدام حرة مجانية مدى الحياة</span>
                  يرخص لك استخدام الصور الناتجة والمعدلة عبر تطبيق <b>imgdkora</b> في كافة الأغراض الشخصية والتجارية، كاليوتيوب، إنستجرام، فيسبوك، والمتاجر الإلكترونية دون أي التزام أو حقوق قانونية أو عمولات مالية.
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">1. قبول الشروط:</h4>
                <p className="text-xs">
                  باستخدامك لتطبيق <b>imgdkora</b> معالج الصور الرقمي، فإنك توافق طواعية بالكامل على كافة هذه البنود المذكورة هنا دون أي تحفظ قانوني.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">2. قيود الاستعمال والمسؤولية:</h4>
                <p className="text-xs">
                  يمنع استخدام الأداة في إنتاج أو صياغة أو تعديل صور تنتهك القوانين العامة، أو تحتوي على محتويات مضللة، أو تمس بحقوق الملكية الفكرية لطرف آخر. يتحمل المستخدم المسؤولية الكاملة والمنفردة لملفات الصور التي يقوم بمعالجتها محلياً.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">3. إخلاء المسؤولية من الأعطال:</h4>
                <p className="text-xs">
                  يقدم التطبيق ومحركات المعالجة "كما هي" دون أي وساطة أو ضمان عيني لسرعة أداء أجهزة المستخدم الضعيفة أو القديمة أثناء حسابات التفريغ اللوني الضخم للصور ذات الدقة 4K.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">4. تواصل الدعم والتحسينات:</h4>
                <p className="text-xs">
                  نحن نعمل بشغف لتطوير وتحسين سرعة وخوارزميات المعالجة باستمرار، ويسعدنا دائماً تلقي اقتراحاتكم البنّاءة لزيادة فعالية الكود.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer of Modal */}
        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-850">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            موافق وفهمت
          </button>
        </div>
      </div>
    </div>
  );
}
