import React from "react";
import { Search, Globe, X, Sparkles, Filter, ShoppingBag } from "lucide-react";
import { Category, Language } from "../types";

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export default function Header({
  lang,
  setLang,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  playSynthSound,
  isMuted,
  setIsMuted,
}: HeaderProps) {
  const isAr = lang === "ar";

  const toggleLanguage = () => {
    const nextLang = isAr ? "en" : "ar";
    setLang(nextLang);
    playSynthSound(600, "sine", 0.1);
  };

  const handleCategorySelect = (cat: Category) => {
    setActiveCategory(cat);
    playSynthSound(440 + (cat === "all" ? 0 : cat === "shoes" ? 50 : cat === "apparel" ? 100 : 150), "sine", 0.08);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0f0c]/90 backdrop-blur-md border-b border-emerald-950/40 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-emerald-500 to-emerald-900 rounded-xl shadow-lg shadow-emerald-950/50 group">
              <ShoppingBag className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-[#0a0f0c] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent font-sans">
                Dkora
              </span>
              <span className="text-[9px] font-black text-lime-400 font-mono tracking-widest uppercase -mt-1">
                {isAr ? "للتسويق بالعمولة" : "AFFILIATE STORE"}
              </span>
            </div>
          </div>

          {/* Bilingual Search Box */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <div className={`absolute inset-y-0 ${isAr ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? "ابحث عن حذاء، قميص، معدات رياضية..." : "Search shoes, jerseys, fitness gear..."}
              className={`w-full bg-[#0f1813] border border-emerald-950 hover:border-emerald-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 ${
                isAr ? "pl-10 pr-11 text-right" : "pl-11 pr-10 text-left"
              } text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-300`}
              dir={isAr ? "rtl" : "ltr"}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  playSynthSound(300, "sine", 0.05);
                }}
                className={`absolute inset-y-0 ${isAr ? 'left-3' : 'right-3'} flex items-center text-slate-400 hover:text-white cursor-pointer`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Settings / Controls */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (isMuted) {
                  // Try to initialize audio context or play a short chime
                  try {
                    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    osc.connect(ctx.destination);
                    osc.start();
                    osc.stop(0.1);
                  } catch (e) {}
                }
              }}
              title={isAr ? "كتم/تشغيل المؤثرات الصوتية" : "Mute/Unmute sound effects"}
              className="p-2 rounded-lg bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-900/30 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-xs flex items-center justify-center"
            >
              <span className="font-mono text-[10px] mr-1">
                {isMuted ? "🔇" : "🔊"}
              </span>
              <span className="hidden sm:inline font-bold">
                {isAr ? (isMuted ? "صامت" : "صوت") : (isMuted ? "Muted" : "Sound")}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/40 border border-emerald-900/50 hover:border-emerald-500/40 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer shadow-md"
            >
              <Globe className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden pb-4 pt-1 flex relative">
          <div className={`absolute inset-y-0 ${isAr ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
            <Search className="h-4.5 w-4.5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? "ابحث عن منتجات رياضية..." : "Search sports gear..."}
            className={`w-full bg-[#0f1813] border border-emerald-950 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2 ${
              isAr ? "pl-9 pr-10 text-right" : "pl-10 pr-9 text-left"
            } text-xs text-slate-200 placeholder-slate-500 outline-none transition-all duration-300`}
            dir={isAr ? "rtl" : "ltr"}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                playSynthSound(300, "sine", 0.05);
              }}
              className={`absolute inset-y-0 ${isAr ? 'left-3' : 'right-3'} flex items-center text-slate-400 hover:text-white cursor-pointer`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Categories Bar Row */}
        <div className="border-t border-emerald-950/30 py-3.5 overflow-x-auto scrollbar-none flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0 text-xs text-slate-400 font-bold">
            <Filter className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isAr ? "التصنيفات:" : "Categories:"}</span>
          </div>
          
          <div className="flex items-center gap-2" dir={isAr ? "rtl" : "ltr"}>
            {(["all", "shoes", "apparel", "equipment"] as Category[]).map((cat) => {
              const isActive = activeCategory === cat;
              let label = "";
              switch (cat) {
                case "all":
                  label = isAr ? "الكل" : "All Products";
                  break;
                case "shoes":
                  label = isAr ? "أحذية رياضية" : "Shoes & Sneakers";
                  break;
                case "apparel":
                  label = isAr ? "ملابس وأطقم" : "Apparel & Jerseys";
                  break;
                case "equipment":
                  label = isAr ? "معدات وأجهزة" : "Gear & Gadgets";
                  break;
              }

              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 shadow-md shadow-emerald-950/40 ring-1 ring-lime-400/30"
                      : "bg-[#0b100d] hover:bg-emerald-950/20 text-slate-300 hover:text-white border border-emerald-950/50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>{isAr ? "محدث لعام ٢٠٢٦" : "Updated for 2026"}</span>
          </div>
        </div>

      </div>
    </header>
  );
}
