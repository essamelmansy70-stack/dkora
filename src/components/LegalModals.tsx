import { useState } from 'react';
import { X, ShieldAlert, FileText, Lock, Globe, Users, Mail, Scale, Copy, Check, Info } from 'lucide-react';
import { TranslationType } from '../translations';

interface LegalModalsProps {
  isOpen: 'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer' | null;
  onClose: () => void;
  t: TranslationType;
}

export default function LegalModals({ isOpen, onClose, t }: LegalModalsProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("essamelmansy67@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRtl = t.legal.privacyTitle.includes("سياسة");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative space-y-6"
        onClick={(e) => e.stopPropagation()}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Header of Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5 text-[#ff1a40]">
            {isOpen === 'privacy' && <ShieldAlert className="w-5 h-5 shrink-0" />}
            {isOpen === 'terms' && <FileText className="w-5 h-5 shrink-0" />}
            {isOpen === 'about' && <Users className="w-5 h-5 shrink-0" />}
            {isOpen === 'contact' && <Mail className="w-5 h-5 shrink-0" />}
            {isOpen === 'disclaimer' && <Scale className="w-5 h-5 shrink-0" />}
            
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {isOpen === 'privacy' && t.legal.privacyTitle}
              {isOpen === 'terms' && t.legal.termsTitle}
              {isOpen === 'about' && t.legal.aboutTitle}
              {isOpen === 'contact' && t.legal.contactTitle}
              {isOpen === 'disclaimer' && t.legal.disclaimerTitle}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-350 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
          >
            {t.legal.closeBtn}
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content of Modal */}
        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans space-y-5">
          
          {/* PRIVACY POLICY */}
          {isOpen === 'privacy' && (
            <>
              <div className="flex gap-3 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-left rtl:text-right">
                <Lock className="w-10 h-10 shrink-0 text-emerald-500" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold block text-sm mb-1">{t.legal.privacyHeaderBadge}</span>
                  {t.legal.privacyHeaderBadgeDesc}
                </div>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.privacyLabel1}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.privacyDesc1}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.privacyLabel2}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.privacyDesc2}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.privacyLabel3}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.privacyDesc3}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.privacyLabel4}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.privacyDesc4}</p>
              </div>
            </>
          )}

          {/* TERMS OF SERVICE */}
          {isOpen === 'terms' && (
            <>
              <div className="flex gap-3 bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 text-rose-800 dark:text-[#ff3b5c] text-left rtl:text-right">
                <Globe className="w-10 h-10 shrink-0 text-rose-500" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold block text-sm mb-1">{t.legal.termsHeaderBadge}</span>
                  {t.legal.termsHeaderBadgeDesc}
                </div>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.termsLabel1}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.termsDesc1}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.termsLabel2}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.termsDesc2}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.termsLabel3}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.termsDesc3}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-md">{t.legal.termsLabel4}</h4>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">{t.legal.termsDesc4}</p>
              </div>
            </>
          )}

          {/* ABOUT US */}
          {isOpen === 'about' && (
            <>
              <div className="flex gap-3 bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20 text-indigo-800 dark:text-indigo-400 text-left rtl:text-right">
                <Users className="w-10 h-10 shrink-0 text-indigo-500" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold block text-sm mb-1">{t.legal.aboutHeaderBadge}</span>
                  {t.legal.aboutHeaderBadgeDesc}
                </div>
              </div>

              <div className="space-y-4 text-left rtl:text-right mt-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-2.5">
                  <h4 className="font-black text-slate-900 dark:text-white text-sm">
                    {isRtl ? "🌟 ما الذي يميّز هذه البوابة الكروية الذكية؟" : "🌟 What Makes This Football Portal Unique?"}
                  </h4>
                  <ul className="space-y-2 text-[11px] sm:text-xs list-disc list-inside text-slate-600 dark:text-slate-400 font-bold">
                    <li>
                      {isRtl ? "تحليل مهارات دقيق: مبني على أكثر من ٩ جوانب تكتيكية تشمل دقة التسديد، اللياقة، الدفاع، والعمل الجماعي." : "Accurate skills analysis: Built across 9 tactical facets including accuracy, fitness, defense, and teamwork."}
                    </li>
                    <li>
                      {isRtl ? "دمج فوري بالذكاء الاصطناعي: محرك توليدي متطور بالكامل لتركيب الوجه على اللاعب المناسب على الملعب." : "Instant Face Blending: Advanced generative AI to blend your face photo with your matched superstar on the green field."}
                    </li>
                    <li>
                      {isRtl ? "بطاقة إحصائيات للمشاركة: بطاقات مصممة ومصدّرة بجودة فائقة لمشاركتها مع أصدقائك أو فخرك الرياضي." : "Exportable Stats Card: Highly polished custom-styled card outputs ready to download and share on social media."}
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* CONTACT US */}
          {isOpen === 'contact' && (
            <>
              <div className="flex gap-3 bg-teal-500/10 p-4 rounded-2xl border border-teal-500/20 text-teal-800 dark:text-teal-400 text-left rtl:text-right">
                <Mail className="w-10 h-10 shrink-0 text-teal-500" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold block text-sm mb-1">{t.legal.contactHeaderBadge}</span>
                  {t.legal.contactHeaderBadgeDesc}
                </div>
              </div>

              {/* Direct Email Display and Interactive copy button */}
              <div className="mt-6 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl text-center space-y-3.5">
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  {isRtl ? "للتواصل الإداري والفني المعتمد:" : "Professional Administration Inbox:"}
                </span>
                
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <a 
                    href="mailto:essamelmansy67@gmail.com" 
                    className="text-md sm:text-lg font-black text-rose-500 hover:underline hover:text-rose-600 tracking-tight font-mono break-all"
                  >
                    essamelmansy67@gmail.com
                  </a>
                  
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-705 dark:text-slate-300 font-extrabold text-[10px] sm:text-xs rounded-lg transition-all cursor-pointer"
                    aria-label="Copy support email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">{isRtl ? "تم نسخ البريد!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>{isRtl ? "نسخ عنوان البريد" : "Copy E-mail"}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold max-w-md">
                  <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>
                    {isRtl ? "تنبيه: يتم الرد على جميع رسائل المطورين والمعلنين خلال ٢٤ لـ ٤٨ ساعة عمل كحد أقصى." : "Notice: We respond to developers, partners, and queries within 24 to 48 hours."}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* DISCLAIMER */}
          {isOpen === 'disclaimer' && (
            <>
              <div className="flex gap-3 bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 text-amber-800 dark:text-amber-400 text-left rtl:text-right">
                <Scale className="w-10 h-10 shrink-0 text-amber-500" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold block text-sm mb-1">{t.legal.disclaimerHeaderBadge}</span>
                  {t.legal.disclaimerHeaderBadgeDesc}
                </div>
              </div>

              <div className="space-y-4 text-left rtl:text-right mt-4 leading-relaxed font-semibold text-slate-650 dark:text-slate-400 text-xs text-justify">
                <p>
                  {isRtl 
                    ? "١. جميع كود الفرز اللوني الذكي، وضاغط الصور المتقدم، وآليات تفريغ الخلفية المعروضة على dkora.online تعمل بالكامل بمتصفح المستخدم (Client-side) محلياً وبالمجان. نحن لا نضمن دقة الاستخلاص الكاملة لبعض الصور النادرة أو الضعيفة التباين." 
                    : "1. All color extraction, advanced image compactor scripts, and canvas background removal tools hosted on dkora.online run 100% locally in your client's web browser environment for free. We do not guarantee pixel perfection on ancient formats or low contrast photography."}
                </p>
                <p>
                  {isRtl 
                    ? "٢. لا تتحمل منصة imgdkora أو أي من مطوريها أو شركائها أي مسؤولية حقوقية أو قانونية حيال نوعية الصور أو الشعارات التي يرفعها المستخدمون بغرض التعديل والضغط. المستخدم يتحمل مسؤولية الحفاظ على حقوق طبع ونشر الطرف الثالث بمفرده." 
                    : "2. Under no event shall imgdkora, its main developers, or programmatic partners be held liable for the copyright compliance, values, or standards of assets uploaded by users. The individual client is solely responsible for respecting intellectual property rules of third-parties."}
                </p>
                <p>
                  {isRtl 
                    ? "٣. إدخال أو استعمال خدمات الأداة يعد إقراراً منك بالبراءة الكاملة للمشروع وفريقه الإداري من أي التزامات حيال تصرفات أو أعمال ناتجة عن استعمال المخرجات بأنساقها الإباحية أو غير القانونية." 
                    : "3. Using this browser utility affirms your full absolute consensus to indemnify the core administration and support staff from any downstream uses or adaptations with malicious or illegal imagery."}
                </p>
              </div>
            </>
          )}

        </div>

        {/* Footer of Modal */}
        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-850">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            {t.legal.acceptBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

