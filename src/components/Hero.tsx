import React from "react";
import { Sparkles, Trophy, Percent, Star, ArrowRight, ArrowLeft } from "lucide-react";
import { Language } from "../types";

interface HeroProps {
  lang: Language;
  scrollToProducts: () => void;
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
}

export default function Hero({ lang, scrollToProducts, playSynthSound }: HeroProps) {
  const isAr = lang === "ar";

  const handleCTAClick = () => {
    playSynthSound(523.25, "sine", 0.12);
    setTimeout(() => {
      playSynthSound(659.25, "sine", 0.15);
    }, 100);
    scrollToProducts();
  };

  return (
    <div className="relative overflow-hidden bg-[#050806] text-white border-b border-emerald-950/30">
      
      {/* Background Graphic Grid/Stadium lights simulation */}
      <div className="absolute inset-0 z-0 opacity-25">
        <div className="absolute top-[-30%] left-[-20%] w-[80%] h-[120%] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[100%] rounded-full bg-lime-500/5 blur-[100px]" />
        {/* Diagonal stadium-like lines */}
        <svg className="absolute inset-0 w-full h-full text-emerald-950/20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
        
        {/* Hot tag banner */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-black mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {isAr 
              ? "الدليل الذكي للتسويق بالعمولة لأفضل منتجات أمازون ٢٠٢٦" 
              : "Smart 2026 Amazon Affiliate Sports Guide"}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl font-sans">
          {isAr ? (
            <>
              ارتقِ بأدائك الرياضي مع{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-lime-400 to-green-500 bg-clip-text text-transparent">
                أفضل المعدات الموثوقة
              </span>
            </>
          ) : (
            <>
              Elevate Your Match Performance with{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-lime-400 to-green-500 bg-clip-text text-transparent">
                Elite Sports Gear
              </span>
            </>
          )}
        </h1>

        {/* Hero Description */}
        <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-medium">
          {isAr
            ? "بوابتك المخصصة لتوفير عناء البحث عن أرقى الأحذية الرياضية ومستلزمات كرة القدم والجري الحائزة على أعلى تقييمات في أمازون، مع كوبونات ترويجية متجددة وتحديث يومي للأسعار لضمان أفضل صفقة."
            : "Your dedicated curator for premium sneakers, football gear, and smart wearable trackers on Amazon. Highly rated by professional athletes with daily updated affiliate prices and exclusive discounts."}
        </p>

        {/* Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleCTAClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-emerald-950/40 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2"
          >
            <span>{isAr ? "تصفح أقوى العروض الآن" : "Browse Hot Offers Now"}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>

        {/* Key Stats Display Grid */}
        <div className="mt-16 sm:mt-20 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4" dir={isAr ? "rtl" : "ltr"}>
          
          <div className="bg-[#0b120e]/60 border border-emerald-950/60 rounded-2xl p-5 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <p className="text-xl sm:text-2xl font-black font-mono text-white">100%</p>
            <p className="text-[11px] text-slate-400 font-bold mt-1">
              {isAr ? "موصى به من خبراء" : "Athlete Approved"}
            </p>
          </div>

          <div className="bg-[#0b120e]/60 border border-emerald-950/60 rounded-2xl p-5 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-lime-500/10 text-lime-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Percent className="w-5 h-5" />
            </div>
            <p className="text-xl sm:text-2xl font-black font-mono text-lime-400">-{isAr ? "٤٠٪" : "40%"}</p>
            <p className="text-[11px] text-slate-400 font-bold mt-1">
              {isAr ? "متوسط التوفير المالي" : "Average Savings"}
            </p>
          </div>

          <div className="bg-[#0b120e]/60 border border-emerald-950/60 rounded-2xl p-5 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-amber-400/20 text-amber-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black font-mono text-white">4.8★</p>
            <p className="text-[11px] text-slate-400 font-bold mt-1">
              {isAr ? "الحد الأدنى للتقييمات" : "Minimum Rating Filter"}
            </p>
          </div>

          <div className="bg-[#0b120e]/60 border border-emerald-950/60 rounded-2xl p-5 hover:border-emerald-500/30 transition-all group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-sm font-bold">24h</span>
            </div>
            <p className="text-xl sm:text-2xl font-black font-mono text-white">{isAr ? "سريع" : "Live"}</p>
            <p className="text-[11px] text-slate-400 font-bold mt-1">
              {isAr ? "مزامنة دورية للأسعار" : "Real-time Pricing"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
