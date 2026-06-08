import { Sparkles, Moon, Sun, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  handleToggleTheme: () => void;
}

export default function Header({
  theme,
  soundEnabled,
  setSoundEnabled,
  handleToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-900 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        
        {/* Right: Logo and branding matching the qrytube screenshot */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff1a40] to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 transform hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
                img<span className="text-[#ff1a40]">dkora</span> <span className="text-xs text-slate-400 font-normal">v2.1</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-[9px] font-bold rounded-md">
                معالجة احترافية 📸
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none mt-1">
              أداة صناعة وضغط ومسح خلفيات الصور مجاناً لصناع المحتوى
            </p>
          </div>
        </div>

        {/* Left: Interactive controls (English tag, sound toggle, theme switch) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mock English tag just like the qrytube reference image */}
          <button 
            onClick={() => alert("التطبيق يدعم اللغة العربية حالياً وسيتوفر بالإنجليزية قريباً!")}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-350 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer font-bold"
          >
            <span>English</span>
            <span className="text-[10px] opacity-60">文A</span>
          </button>

          {/* Sound cue button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-350 transition-all cursor-pointer focus:outline-none"
            title={soundEnabled ? "كتم المؤثرات الصوتية" : "تفعيل المؤثرات الصوتية"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme button switcher */}
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all cursor-pointer focus:outline-none"
            title="تبديل الوضع الليلي أو العادي"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}
