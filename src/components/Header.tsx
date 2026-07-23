import { Sparkles, Moon, Sun, Globe } from 'lucide-react';
import { TranslationType } from '../translations';

interface HeaderProps {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  handleToggleTheme: () => void;
  locale: 'ar' | 'en';
  setLocale: (val: 'ar' | 'en') => void;
  t: TranslationType;
}

export default function Header({
  theme,
  handleToggleTheme,
  locale,
  setLocale,
  t,
}: Omit<HeaderProps, 'soundEnabled' | 'setSoundEnabled'>) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-[#030712]/90 border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
        
        {/* Logo and branding */}
        <div className="flex items-center gap-3">
          {/* Logo container with sleek glow and fallback error handling */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff1a40] to-[#e11d48] rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-slate-950 rounded-2xl overflow-hidden p-1 flex items-center justify-center border border-slate-800 shadow-md">
              <img 
                src="/logo.png?v=3.0" 
                alt="dkora" 
                className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            </div>
          </div>

          {/* Description details aligned side-by-side with logo */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white font-sans select-none">
                d<span className="text-[#ff1a40]">kora</span>
              </span>
              <span className="px-2 py-0.5 bg-rose-500/10 dark:bg-rose-950/50 text-[#ff1a40] dark:text-rose-400 text-[10px] font-black rounded-full border border-rose-500/20 uppercase tracking-wide">
                {t.header.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight max-w-[200px] sm:max-w-md truncate">
              {t.header.subtitle}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Button */}
          <button 
            onClick={() => {
              const nextLocale = locale === 'ar' ? 'en' : 'ar';
              setLocale(nextLocale);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/60 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label={locale === 'ar' ? 'تغيير لغة الموقع إلى الإنجليزية' : 'Change website language to Arabic'}
          >
            <Globe className="w-3.5 h-3.5 text-[#ff1a40]" />
            <span>{t.header.langButton}</span>
          </button>
        </div>

      </div>
    </header>
  );
}

