import React, { useState } from "react";
import { SlidersHorizontal, Award, CheckCircle2, XCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { Product, ComparisonItem, Currency } from "../types";

interface ComparisonViewProps {
  products: Product[];
  comparisons: ComparisonItem[];
  currency: Currency;
  isDarkMode: boolean;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  products,
  comparisons,
  currency,
  isDarkMode,
}) => {
  const [selectedP1, setSelectedP1] = useState<string>(products[0]?.id || "");
  const [selectedP2, setSelectedP2] = useState<string>(products[1]?.id || "");

  const p1 = products.find((p) => p.id === selectedP1);
  const p2 = products.find((p) => p.id === selectedP2);

  const getPrice = (baseEgp: number | undefined) => {
    if (!baseEgp) return "غير متاح";
    if (currency === "USD") return `$${Math.round(baseEgp / 50)}`;
    if (currency === "SAR") return `${Math.round(baseEgp / 13)} ر.س`;
    return `${baseEgp.toLocaleString()} ج.م`;
  };

  return (
    <div className="space-y-8 my-8">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          مقارنة رأس برأس (Head to Head)
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          أداة المقارنة المباشرة بين العدد والأدوات
        </h1>
        <p className="text-slate-500 text-sm">
          اختر أي منتجين لمقارنة المواصفات، الأسعار، المميزات، والتقييم النهائي بكل دقة.
        </p>
      </div>

      {/* Selectors Bar */}
      <div
        className={`p-6 rounded-3xl border ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-amber-500 mb-2">المنتج الأول (الجانب الأيمن):</label>
            <select
              value={selectedP1}
              onChange={(e) => setSelectedP1(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.titleAr} ({p.brandName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-500 mb-2">المنتج الثاني (الجانب الأيسر):</label>
            <select
              value={selectedP2}
              onChange={(e) => setSelectedP2(e.target.value)}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.titleAr} ({p.brandName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Table View */}
      {p1 && p2 ? (
        <div
          className={`rounded-3xl border overflow-hidden shadow-2xl ${
            isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
          }`}
        >
          <div className="grid grid-cols-12 border-b border-slate-800 bg-slate-950 text-white p-6 gap-4 text-center">
            <div className="col-span-6 space-y-3">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                المنتج الأول
              </span>
              <img src={p1.mainImage} alt={p1.titleAr} className="w-32 h-32 object-cover rounded-2xl mx-auto border border-slate-800" />
              <h3 className="font-extrabold text-base sm:text-lg text-slate-100">{p1.titleAr}</h3>
              <p className="text-amber-400 font-mono font-bold text-xs">تقييم المحرر: {p1.editorScore} / 10</p>
              <div className="text-xs font-bold bg-slate-900 p-2 rounded-xl text-slate-300">
                أقل سعر: {getPrice(p1.priceAmazon)}
              </div>
            </div>

            <div className="col-span-6 space-y-3 border-r border-slate-800">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full">
                المنتج الثاني
              </span>
              <img src={p2.mainImage} alt={p2.titleAr} className="w-32 h-32 object-cover rounded-2xl mx-auto border border-slate-800" />
              <h3 className="font-extrabold text-base sm:text-lg text-slate-100">{p2.titleAr}</h3>
              <p className="text-amber-400 font-mono font-bold text-xs">تقييم المحرر: {p2.editorScore} / 10</p>
              <div className="text-xs font-bold bg-slate-900 p-2 rounded-xl text-slate-300">
                أقل سعر: {getPrice(p2.priceAmazon)}
              </div>
            </div>
          </div>

          {/* Winner Banner */}
          <div className="p-4 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-orange-500/20 text-center border-b border-slate-800 text-xs sm:text-sm">
            <strong className="text-amber-400 font-extrabold text-base block mb-1">
              🏆 الفائز بتوصية "ديكورا": {p1.editorScore >= p2.editorScore ? p1.titleAr : p2.titleAr}
            </strong>
            <p className="text-slate-300 max-w-2xl mx-auto">
              بناءً على نتائج الاختيارات الميدانية في الورش والعزم والتحمل، نوصي بشراء{" "}
              <span className="text-amber-400 font-bold">
                {p1.editorScore >= p2.editorScore ? p1.brandName : p2.brandName}
              </span>{" "}
              لأدائه المتفوق.
            </p>
          </div>

          {/* Specs comparison rows */}
          <div className="p-6 space-y-6 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="font-bold text-emerald-400 mb-2">مميزات {p1.brandName}:</h4>
                <ul className="space-y-1 text-slate-300">
                  {p1.pros.map((pr, idx) => (
                    <li key={idx}>✓ {pr}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="font-bold text-emerald-400 mb-2">مميزات {p2.brandName}:</h4>
                <ul className="space-y-1 text-slate-300">
                  {p2.pros.map((pr, idx) => (
                    <li key={idx}>✓ {pr}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Buy Links */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <a
                href={p1.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-center text-xs shadow-lg"
              >
                شراء {p1.brandName} من أمازون
              </a>
              <a
                href={p2.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-center text-xs shadow-lg"
              >
                شراء {p2.brandName} من أمازون
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-500">رجاء اختر منتجين لعرض المقارنة الجانبية.</div>
      )}
    </div>
  );
};
