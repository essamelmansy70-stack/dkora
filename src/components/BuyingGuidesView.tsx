import React from "react";
import { BookOpen, Calendar, Clock, Award, CheckCircle2, ChevronLeft } from "lucide-react";
import { BuyingGuide, Product, Currency } from "../types";

interface BuyingGuidesViewProps {
  guides: BuyingGuide[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  isDarkMode: boolean;
}

export const BuyingGuidesView: React.FC<BuyingGuidesViewProps> = ({
  guides,
  products,
  onSelectProduct,
  isDarkMode,
}) => {
  return (
    <div className="space-y-8 my-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          أدلة الشراء الشاملة (Wirecutter Standard)
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          أفضل التوصيات والترشيحات لعام 2026
        </h1>
        <p className="text-slate-500 text-sm">
          أدلة شراء متخصصة تلخص لك أفضل المنتجات في كل فئة بعد مئات الساعات من الاختبارات الميدانية.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="space-y-8">
        {guides.map((guide) => {
          const topProds = products.filter((p) => guide.topProductIds.includes(p.id));

          return (
            <article
              key={guide.id}
              className={`rounded-3xl border overflow-hidden p-6 sm:p-8 space-y-6 shadow-xl ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
                  <img src={guide.coverImage} alt={guide.title} className="w-full h-full object-cover" />
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Calendar className="w-3.5 h-3.5" /> تحديث: {guide.updatedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> وقت القراءة: {guide.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {guide.title}
                  </h2>

                  <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {guide.subtitle}
                  </p>

                  <p className={`text-xs sm:text-sm leading-relaxed p-4 rounded-xl border ${
                    isDarkMode ? "bg-slate-950 text-slate-300 border-slate-800" : "bg-slate-50 text-slate-700 border-slate-200"
                  }`}>
                    {guide.introduction}
                  </p>
                </div>
              </div>

              {/* Buying Advice Bullet points */}
              <div className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                isDarkMode ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-200"
              }`}>
                <h3 className="font-extrabold text-amber-600 dark:text-amber-500 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  قواعد ذهبية قبل الشراء في هذه الفئة:
                </h3>
                <ul className={`space-y-1.5 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                  {guide.buyingAdvice.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">♦</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured Pick Products Cards inside guide */}
              {topProds.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className={`font-extrabold text-sm ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>الترشيحات الفائزة في هذا الدليل:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {topProds.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => onSelectProduct(prod)}
                        className={`p-4 rounded-2xl border hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={prod.mainImage} alt={prod.titleAr} className="w-14 h-14 rounded-xl object-cover border border-slate-300 dark:border-slate-800" />
                          <div>
                            <h5 className={`font-bold text-xs sm:text-sm line-clamp-1 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>{prod.titleAr}</h5>
                            <p className="text-amber-600 dark:text-amber-400 text-xs font-mono font-bold mt-0.5">تقييم: {prod.editorScore} / 10</p>
                          </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-amber-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
