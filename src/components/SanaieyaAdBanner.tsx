import React from "react";
import { Wrench, ShieldCheck, MapPin, PhoneCall, ExternalLink, Sparkles, Star } from "lucide-react";

interface SanaieyaAdBannerProps {
  isDarkMode?: boolean;
  variant?: "full" | "compact";
}

export const SanaieyaAdBanner: React.FC<SanaieyaAdBannerProps> = ({
  isDarkMode = true,
  variant = "full",
}) => {
  return (
    <div
      id="sanaieya-egypt-ad-banner"
      className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 p-6 sm:p-8 text-white shadow-2xl transition-all duration-300 hover:border-amber-500/60 my-8"
    >
      {/* Background Decorative Glow Effect */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left/Main Column Content */}
        <div className="space-y-4 text-center lg:text-right max-w-2xl">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-black text-amber-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" aria-hidden="true" />
            <span>إعلان موثوق • دليل صنايعية مصر الرسمي</span>
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
          </div>

          {/* Banner Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
            تبحث عن فني أو صنايعي محترف ومضمون؟
          </h3>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            استعن بـ <strong className="text-amber-400 font-black">«دليل صنايعية مصر»</strong> للوصول المباشر إلى أفضل الفنيين والصنايعية المعتمدين في كافة التخصصات والمحافظات (كهرباء، سباكة، نجارة، دهانات، وتكييف) بدون عمولات أو وسطاء.
          </p>

          {/* Features Badges Grid */}
          <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs font-bold text-slate-200">
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>صنايعية معتمدون وفنيون خِبرة</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 shadow-sm">
              <MapPin className="h-4 w-4 text-rose-400" aria-hidden="true" />
              <span>تغطية كاملة للمحافظات</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 shadow-sm">
              <PhoneCall className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>اتصال مباشر برقم الصنايعي</span>
            </span>
          </div>
        </div>

        {/* Right Call to Action Button & Brand Visual */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 shrink-0 w-full lg:w-auto text-center">
          <a
            href="https://qrytube.com"
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label="الانتقال إلى دليل صنايعية مصر - qrytube.com"
            className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 px-8 py-4 text-base font-black text-slate-950 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-amber-500/30 active:scale-[0.98]"
          >
            <Wrench className="h-5 w-5 text-slate-950 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
            <span className="text-slate-950 font-black">زيارة دليل صنايعية مصر</span>
            <ExternalLink className="h-4 w-4 text-slate-950 group-hover:translate-x-[-2px] transition-transform" aria-hidden="true" />
          </a>

          <span className="text-[11px] font-mono text-slate-400 dir-ltr select-all">
            www.qrytube.com
          </span>
        </div>
      </div>
    </div>
  );
};
