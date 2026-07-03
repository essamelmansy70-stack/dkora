import React from "react";
import { Star, Flame, Eye, ShoppingCart, Percent } from "lucide-react";
import { Product, Language } from "../types";

interface ProductCardProps {
  key?: any;
  product: Product;
  lang: Language;
  onOpenDetails: (product: Product) => void;
  onTriggerAffiliate: (product: Product) => void;
  playSynthSound: (freq: number, type?: any, duration?: number, delay?: number) => void;
}

export default function ProductCard({
  product,
  lang,
  onOpenDetails,
  onTriggerAffiliate,
  playSynthSound,
}: ProductCardProps) {
  const isAr = lang === "ar";

  const calculateDiscountPercent = () => {
    return Math.round(((product.originalPrice - product.priceAmazon) / product.originalPrice) * 100);
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSynthSound(500, "triangle", 0.08);
    onOpenDetails(product);
  };

  const handleAffiliateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSynthSound(587.33, "sine", 0.1);
    onTriggerAffiliate(product);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col justify-between bg-[#080d0a] border border-emerald-950/80 hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer text-white"
      dir={isAr ? "rtl" : "ltr"}
    >
      
      {/* Upper Badges & Image Frame */}
      <div className="relative w-full aspect-square bg-[#0c130f] overflow-hidden">
        
        {/* Hot Deal / Best Seller badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[9px] font-black text-slate-950 bg-lime-400 rounded-md tracking-wider flex items-center gap-1 shadow-md">
              <span>★</span>
              <span>{isAr ? "الأكثر مبيعاً" : "Best Seller"}</span>
            </span>
          )}
          {product.isHotDeal && (
            <span className="px-2.5 py-1 text-[9px] font-black text-white bg-amber-600 rounded-md tracking-wider flex items-center gap-1 shadow-md animate-pulse">
              <Flame className="w-3 h-3 text-white fill-white" />
              <span>{isAr ? "صفقة ساخنة" : "Hot Deal"}</span>
            </span>
          )}
        </div>

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 text-[10px] font-extrabold text-white bg-rose-600/95 border border-rose-500/30 rounded-md flex items-center gap-0.5 shadow-md font-mono">
            <Percent className="w-2.5 h-2.5" />
            <span>{calculateDiscountPercent()}% {isAr ? "خصم" : "Off"}</span>
          </span>
        </div>

        {/* Product Image with Hover Zoom */}
        <img
          src={product.image}
          alt={isAr ? product.titleAr : product.titleEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover overlay with Specs button */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-300">
          <button
            onClick={handleDetailsClick}
            className="p-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full font-black text-xs shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-950" />
            <span>{isAr ? "تفاصيل سريعة" : "View Specs"}</span>
          </button>
        </div>

        {/* Top-level subtle brand anchor tag (Amazon Affiliate notice) */}
        <span className="absolute bottom-2 right-2 text-[8px] font-black text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-900 font-mono tracking-widest uppercase">
          {isAr ? "عبر أمازون" : "Via Amazon"}
        </span>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-black text-amber-400 font-mono">{product.rating}</span>
            <span className="text-[10px] text-slate-500 font-bold font-mono">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="text-xs sm:text-sm font-black text-white hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            {isAr ? product.titleAr : product.titleEn}
          </h3>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-sm sm:text-base font-black text-emerald-400 font-mono">
              {product.priceAmazon} {isAr ? "ريال" : "SAR"}
            </span>
            <span className="text-xs text-slate-500 font-bold line-through font-mono">
              {product.originalPrice} {isAr ? "ريال" : "SAR"}
            </span>
          </div>
        </div>

        {/* Button Controls */}
        <div className="mt-4 pt-4 border-t border-emerald-950/40 grid grid-cols-1 gap-2">
          <button
            onClick={handleAffiliateClick}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-[11px] rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
            <span>{isAr ? "تحقق من السعر على أمازون" : "Check Price on Amazon"}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
