import React from "react";
import {
  Star,
  Award,
  ExternalLink,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import { Product, Currency } from "../types";

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onSelectProduct: (product: Product) => void;
  onCompareSelect?: (product: Product) => void;
  isDarkMode: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onSelectProduct,
  onCompareSelect,
  isDarkMode,
}) => {
  // Convert prices based on currency selection
  const getPrice = (baseEgp: number | undefined) => {
    if (!baseEgp) return null;
    if (currency === "USD") return `$${Math.round(baseEgp / 50)}`;
    if (currency === "SAR") return `${Math.round(baseEgp / 13)} ر.س`;
    return `${baseEgp.toLocaleString()} ج.م`;
  };

  const amazonPriceFormatted = getPrice(product.priceAmazon);
  const jumiaPriceFormatted = getPrice(product.priceJumia);
  const noonPriceFormatted = getPrice(product.priceNoon);

  // Find lowest price store
  const pricesArr = [
    { name: "أمازون", price: product.priceAmazon, url: product.amazonUrl, color: "bg-amber-500" },
    { name: "جوميا", price: product.priceJumia, url: product.jumiaUrl, color: "bg-orange-500" },
    { name: "نون", price: product.priceNoon, url: product.noonUrl, color: "bg-yellow-400" },
  ].filter((p) => p.price && p.price > 0);

  const bestPriceStore = pricesArr.length > 0
    ? pricesArr.reduce((prev, curr) => ((curr.price || 0) < (prev.price || 0) ? curr : prev))
    : null;

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between overflow-hidden group ${
        isDarkMode
          ? "bg-slate-900/90 border-slate-800 text-slate-100 hover:border-amber-500/40"
          : "bg-white border-slate-200 text-slate-900 shadow-md hover:border-amber-500/40"
      }`}
    >
      <div>
        {/* Top Image Banner & Badges */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-950">
          <img
            src={product.mainImage}
            alt={product.titleAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
            {product.isTopPick && (
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-950" />
                <span>الخيار الأول 2026</span>
              </span>
            )}
            {product.isBestValue && (
              <span className="bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>أفضل قيمة مقابل السعر</span>
              </span>
            )}
          </div>

          {/* Editor Score Floating Badge */}
          <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-amber-500/40 text-white px-3 py-1.5 rounded-xl text-xs font-black backdrop-blur-md flex items-center gap-1.5 shadow-lg">
            <span className="text-amber-400 text-sm font-mono">{product.editorScore}</span>
            <span className="text-slate-400 text-[10px]">/ 10 تقييم المحرر</span>
          </div>

          {/* Brand Name */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 text-amber-400 text-xs px-2.5 py-1 rounded-lg border border-slate-700 font-bold">
            {product.brandName}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Title & User Rating */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 fill-current ${
                      i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400 font-mono">
                {product.rating} ({product.reviewCount} تقييم)
              </span>
            </div>

            <h3
              onClick={() => onSelectProduct(product)}
              className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug hover:text-amber-500 cursor-pointer transition-colors"
            >
              {product.titleAr}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">موديل: {product.modelNumber}</p>
          </div>

          {/* Short Summary */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {product.summary}
          </p>

          {/* Who is this for? (لمن يناسب؟) */}
          <div
            className={`p-3 rounded-2xl border text-xs ${
              isDarkMode ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-500/10 border-amber-500/30"
            }`}
          >
            <strong className="text-amber-600 dark:text-amber-500 block mb-0.5 font-bold">
              لمن يناسب هذا المنتج؟
            </strong>
            <p className="text-slate-800 dark:text-slate-300 leading-normal line-clamp-2">
              {product.targetAudience}
            </p>
          </div>

          {/* Quick Pros/Cons Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="space-y-1">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> أهم المزايا:
              </span>
              <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
                • {product.pros[0]}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> العيب الأبرز:
              </span>
              <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
                • {product.cons[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Buy & Price Comparison Footer */}
      <div
        className={`p-5 sm:p-6 border-t space-y-3 ${
          isDarkMode ? "border-slate-800/60 bg-slate-950/40" : "border-slate-200 bg-slate-50"
        }`}
      >
        {/* Price Offers Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
            أفضل سعر حالي:
          </span>

          <div className="flex items-center gap-2">
            {bestPriceStore && (
              <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-black px-2.5 py-0.5 rounded-lg text-xs">
                {bestPriceStore.name}: {getPrice(bestPriceStore.price)}
              </span>
            )}
          </div>
        </div>

        {/* Store Affiliate Direct Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {product.amazonUrl && (
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] flex flex-col items-center justify-center transition-all shadow-md shadow-amber-500/10 text-center"
            >
              <span>أمازون</span>
              <span className="text-[10px] font-mono opacity-90">{amazonPriceFormatted}</span>
            </a>
          )}

          {product.jumiaUrl && (
            <a
              href={product.jumiaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-1 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-[11px] flex flex-col items-center justify-center transition-all shadow-md text-center"
            >
              <span>جوميا</span>
              <span className="text-[10px] font-mono opacity-90">{jumiaPriceFormatted}</span>
            </a>
          )}

          {product.noonUrl && (
            <a
              href={product.noonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-1 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-[11px] flex flex-col items-center justify-center transition-all shadow-md text-center"
            >
              <span>نون</span>
              <span className="text-[10px] font-mono opacity-90">{noonPriceFormatted}</span>
            </a>
          )}
        </div>

        {/* Details & Compare Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelectProduct(product)}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
              isDarkMode
                ? "bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                : "bg-slate-900 hover:bg-slate-800 text-white border-slate-900 shadow-md"
            }`}
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>عرض المراجعة الكاملة والمواصفات</span>
          </button>

          {onCompareSelect && (
            <button
              onClick={() => onCompareSelect(product)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isDarkMode
                  ? "bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 border-slate-700"
                  : "bg-white hover:bg-amber-50 text-slate-700 border-slate-300 shadow-sm"
              }`}
              title="إضافة للمقارنة"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
