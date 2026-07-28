import React from "react";
import { CheckCircle2, ShoppingCart, ShieldAlert, Award } from "lucide-react";
import { Product } from "../types";

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  isDarkMode: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  isDarkMode
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border my-6 p-6 sm:p-12 transition-all ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border-slate-800 shadow-2xl"
          : "bg-gradient-to-br from-amber-500/10 via-white to-orange-500/5 border-slate-200 shadow-xl"
      }`}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute -left-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-sm">
          <Award className="w-4 h-4" />
          <span>منصة مراجعات المنتجات المستقلة ومقارنة المواصفات 2026</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
          مراجعات تفصيلية ومقارنات فنية{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
            لتتخذ قرار الشراء الأنسب بثقة
          </span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          نختبر المنتجات والعدد والأدوات بموضوعية تامة، ونطرح المميزات والعيوب بوضوح مع مقالات مراجعة شاملة ومقارنات مباشرة ومستمرة بين جميع الطرازات.
        </p>

        {/* Trust & Affiliate Features Grid */}
        <div className="pt-6 border-t border-slate-800/50 grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
          <div
            className={`flex items-center gap-3 p-3 rounded-2xl border ${
              isDarkMode
                ? "bg-slate-900/40 border-slate-800/60"
                : "bg-white/80 border-slate-200 shadow-sm"
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className={`text-xs font-bold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                مراجعات حيادية
              </p>
              <p className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                تجارب ميدانية في الورش
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-2xl border ${
              isDarkMode
                ? "bg-slate-900/40 border-slate-800/60"
                : "bg-white/80 border-slate-200 shadow-sm"
            }`}
          >
            <ShoppingCart className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <p className={`text-xs font-bold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                مقارنة الأسعار
              </p>
              <p className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                أمازون، جوميا، ونون
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-2xl border ${
              isDarkMode
                ? "bg-slate-900/40 border-slate-800/60"
                : "bg-white/80 border-slate-200 shadow-sm"
            }`}
          >
            <ShieldAlert className="w-5 h-5 text-orange-500 shrink-0" />
            <div>
              <p className={`text-xs font-bold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                كشف العيوب بوضوح
              </p>
              <p className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                لا نتردد في ذكر السلبيات
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-2xl border ${
              isDarkMode
                ? "bg-slate-900/40 border-slate-800/60"
                : "bg-white/80 border-slate-200 shadow-sm"
            }`}
          >
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <p className={`text-xs font-bold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                معيار Wirecutter
              </p>
              <p className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                دقة متناهية في التقييم
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
