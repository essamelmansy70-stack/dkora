import { Sparkles, Moon, Sun } from 'lucide-react';
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/70 border-b border-slate-100 dark:border-slate-900 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        
        {/* Logo and branding */}
        <div className="flex flex-row items-center gap-3 py-1">
          {/* Logo container with brand title directly under it */}
          <div className="flex flex-col items-center shrink-0">
            <img 
              src="/logo.png" 
              alt="dkora" 
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-lg shadow-sm select-none animate-fade-in"
              referrerPolicy="no-referrer"
            />
            <span className="text-[10px] sm:text-[11px] font-black tracking-tight text-slate-900 dark:text-white font-sans mt-0.5 select-none">
              d<span className="text-[#ff1a40]">kora</span>
            </span>
          </div>

          {/* Description details aligned side-by-side with the logo */}
          <div className="flex flex-col justify-center min-h-[44px]">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="inline-block px-1.5 py-0.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-[8px] sm:text-[9px] font-bold rounded">
                {t.header.badge}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold">{t.header.logoSuffix}</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-medium leading-snug max-w-[180px] sm:max-w-md">
              {t.header.subtitle}
            </p>
          </div>
        </div>

        {/* Left: Interactive controls */}
        <div className="flex items-center gap-3">
          {/* Real Language Toggle Button */}
          <button 
            onClick={() => {
              const nextLocale = locale === 'ar' ? 'en' : 'ar';
              setLocale(nextLocale);
            }}
            className="flex items-center justify-center gap-1 px-1.5 py-0.5 text-[8px] sm:text-[9px] text-[#ff1a40] dark:text-rose-400 bg-rose-500/10 dark:bg-rose-950/40 hover:bg-rose-500/15 dark:hover:bg-rose-950/60 border border-rose-200/50 dark:border-rose-900/40 rounded-md transition-all cursor-pointer font-bold h-fit w-fit"
            aria-label={locale === 'ar' ? 'تغيير لغة الموقع إلى الإنجليزية' : 'Change website language to Arabic'}
          >
            <span>{t.header.langButton}</span>
            <span className="text-[8px] sm:text-[9px] opacity-75 mr-0.5">文A</span>
          </button>

          {/* Theme button switcher */}
          <button
            onClick={handleToggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all cursor-pointer focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            title={t.header.themeTitle}
            aria-label={t.header.themeTitle}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}

