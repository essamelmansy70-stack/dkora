import React from "react";
import { Search, Sparkles, CheckCircle2, ShoppingCart, ShieldAlert, Award, ChevronLeft } from "lucide-react";
import { Product } from "../types";

interface HeroSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  isDarkMode: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  setSearchQuery,
  products,
  onSelectProduct,
  isDarkMode
}) => {
  const trendingTags = [
    "شنيور 20V بطارية",
    "ميزان ليزر 3D أخضر",
    "قفل باب ذكي بالبصمة",
    "صاروخ قطعية بوش 750W",
    "كمبروسر هواء 50 لتر",
    "دهان مقاوم للرطوبة"
  ];

  const matchedProducts = searchQuery.trim().length >= 2
    ? products.filter(
        (p) =>
          p.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.brandName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
          <span>المنصة الأولى المعتمدة لمراجعات العُدد والديكور والمقارنات 2026</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
          اختر عُدتك وأدواتك بثقة{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
            بناءً على تجارب ميدانية حقيقية
          </span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          نختبر العدد الكهربائية واليدوية، أدوات الورش، ومواد الديكور مع تقديم مقارنة أسعار لحظية بين{" "}
          <strong className="text-amber-500">أمازون، جوميا، ونون</strong> لنضمن لك الجودة وأفضل سعر.
        </p>

        {/* Search Input Box with Autocomplete */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="ما الذي تبحث عنه؟ (مثال: أفضل شنيور، ميزان ليزر، قفل ذكي...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pr-12 pl-4 py-4 rounded-2xl text-sm sm:text-base border font-medium shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                isDarkMode
                  ? "bg-slate-900/95 border-slate-700 text-slate-100 placeholder-slate-400"
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
              }`}
            />
            <Search className="w-5 h-5 absolute right-4 text-amber-500 pointer-events-none" />
          </div>

          {/* Search Dropdown Results */}
          {matchedProducts.length > 0 && (
            <div
              className={`absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border shadow-2xl p-2 max-h-80 overflow-y-auto text-right ${
                isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
              }`}
            >
              <div className="text-[11px] font-bold text-slate-400 px-3 py-1 border-b border-slate-800 mb-1">
                نتائج البحث السريع ({matchedProducts.length})
              </div>
              {matchedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    setSearchQuery("");
                  }}
                  className={`p-3 rounded-xl border border-transparent hover:border-amber-500/40 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-amber-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.mainImage}
                      alt={p.titleAr}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                        {p.titleAr}
                      </h4>
                      <p className="text-[11px] text-amber-500 font-semibold">
                        تقييم المحرر: {p.editorScore} / 10 • {p.brandName}
                      </p>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            الأكثر بحثاً:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all hover:border-amber-500 hover:text-amber-500 ${
                isDarkMode
                  ? "bg-slate-900/80 border-slate-800 text-slate-300"
                  : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

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
