import { X, ShieldAlert, FileText, Lock, Globe } from 'lucide-react';
import { TranslationType } from '../translations';

interface LegalModalsProps {
  isOpen: 'privacy' | 'terms' | null;
  onClose: () => void;
  t: TranslationType;
}

export default function LegalModals({ isOpen, onClose, t }: LegalModalsProps) {
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
              {isOpen === 'privacy' ? t.legal.privacyTitle : t.legal.termsTitle}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-350 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
          >
            {t.legal.closeBtn}
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content of Modal */}
        <div className="text-sm text-slate-750 dark:text-slate-300 leading-relaxed font-sans space-y-4">
          {isOpen === 'privacy' ? (
            <>
              <div className="flex gap-3 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-left rtl:text-right">
                <Lock className="w-10 h-10 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-sm mb-1">{t.legal.privacyHeaderBadge}</span>
                  {t.legal.privacyHeaderBadgeDesc}
                </div>
              </div>

              <div className="space-y-2 mt-4 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.privacyLabel1}</h4>
                <p className="text-xs">{t.legal.privacyDesc1}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.privacyLabel2}</h4>
                <p className="text-xs">{t.legal.privacyDesc2}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.privacyLabel3}</h4>
                <p className="text-xs">{t.legal.privacyDesc3}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.privacyLabel4}</h4>
                <p className="text-xs">{t.legal.privacyDesc4}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-3 bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 text-rose-800 dark:text-[#ff3b5c] text-left rtl:text-right">
                <Globe className="w-10 h-10 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-sm mb-1">{t.legal.termsHeaderBadge}</span>
                  {t.legal.termsHeaderBadgeDesc}
                </div>
              </div>

              <div className="space-y-2 mt-4 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.termsLabel1}</h4>
                <p className="text-xs">{t.legal.termsDesc1}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.termsLabel2}</h4>
                <p className="text-xs">{t.legal.termsDesc2}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.termsLabel3}</h4>
                <p className="text-xs">{t.legal.termsDesc3}</p>
              </div>

              <div className="space-y-2 text-left rtl:text-right">
                <h4 className="font-bold text-slate-900 dark:text-white text-md">{t.legal.termsLabel4}</h4>
                <p className="text-xs">{t.legal.termsDesc4}</p>
              </div>
            </>
          )}
        </div>

        {/* Footer of Modal */}
        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-850">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-705 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            {t.legal.acceptBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
