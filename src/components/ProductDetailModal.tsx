import React, { useState } from "react";
import { X, Star, ThumbsUp, Check, ShieldAlert, Percent, Copy, ShoppingCart, HelpCircle } from "lucide-react";
import { Product, Language } from "../types";

interface ProductDetailModalProps {
  product: Product;
  lang: Language;
  onClose: () => void;
  onTriggerAffiliate: (product: Product) => void;
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
}

export default function ProductDetailModal({
  product,
  lang,
  onClose,
  onTriggerAffiliate,
  playSynthSound,
}: ProductDetailModalProps) {
  const isAr = lang === "ar";
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "reviews">("features");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    playSynthSound(880, "sine", 0.08);
    playSynthSound(1046.5, "sine", 0.15, 0.05);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateDiscountPercent = () => {
    return Math.round(((product.originalPrice - product.priceAmazon) / product.originalPrice) * 100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl bg-[#080d0a] border border-emerald-900/60 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col"
        dir={isAr ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header with Close Button */}
        <div className="flex items-center justify-between p-5 border-b border-emerald-950/40">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[9px] bg-emerald-950 text-emerald-400 font-black rounded border border-emerald-900/50 uppercase">
              {product.category}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              {isAr ? "مراجعة وتحليل السعر" : "Price Analysis & Review"}
            </span>
          </div>
          <button
            onClick={() => {
              playSynthSound(400, "sine", 0.05);
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Main info row: Image & Title/Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Image Frame */}
            <div className="relative aspect-square bg-[#0c130f] border border-emerald-950 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={product.image}
                alt={isAr ? product.titleAr : product.titleEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isBestSeller && (
                  <span className="px-3 py-1 text-[10px] font-black text-slate-950 bg-lime-400 rounded-md tracking-wider shadow-md">
                    ★ {isAr ? "الأكثر مبيعاً" : "Best Seller"}
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="px-2.5 py-1 text-[10px] bg-rose-600 font-black text-white rounded-md flex items-center gap-0.5 shadow-md font-mono">
                  -{calculateDiscountPercent()}% {isAr ? "توفير" : "Saved"}
                </span>
              </div>
            </div>

            {/* General Info & Pricing Section */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-amber-400 font-mono">{product.rating}</span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    {isAr ? `(مراجعة من ${product.reviewsCount} مشترٍ حقيقي)` : `(based on ${product.reviewsCount} buyers)`}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-black text-white leading-snug">
                  {isAr ? product.titleAr : product.titleEn}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-xs text-slate-300 leading-relaxed font-medium">
                  {isAr ? product.descriptionAr : product.descriptionEn}
                </p>

                {/* Pricing Table */}
                <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-950/60 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">{isAr ? "السعر الأصلي:" : "Retail Price:"}</span>
                    <span className="line-through font-mono text-slate-500">{product.originalPrice} {isAr ? "ريال" : "SAR"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-white">{isAr ? "أفضل سعر أفلييت على أمازون:" : "Best Affiliate Price:"}</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      {product.priceAmazon} {isAr ? "ريال" : "SAR"}
                    </span>
                  </div>
                  <p className="text-[10px] text-lime-400 font-bold text-center border-t border-emerald-950/40 pt-1.5 mt-1">
                    {isAr ? "💡 متاح شحن مجاني وضمان استرجاع مرن عبر أمازون" : "💡 Free shipping & flexible returns available on Amazon"}
                  </p>
                </div>

              </div>

              {/* Promo Coupon Widget */}
              {product.couponCode && (
                <div className="p-3.5 bg-[#0f1912] border border-emerald-500/20 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-white">
                        {isAr ? `كوبون: ${product.couponDiscount} خصم إضافي` : `Code: ${product.couponDiscount} Extra Off`}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {isAr ? "انسخ الكوبون وطبقه عند الدفع" : "Apply code at Amazon checkout"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyCoupon(product.couponCode!)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                      copied 
                        ? "bg-emerald-500 text-slate-950" 
                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                    }`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? (isAr ? "نسخ!" : "Copied!") : product.couponCode}</span>
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Pros & Cons Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Pros */}
            <div className="bg-[#09110c] border border-emerald-950/60 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isAr ? "المميزات الإيجابية:" : "Key Advantages:"}</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {(isAr ? product.prosAr : product.prosEn).map((pro, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="bg-[#120a0b] border border-red-950/40 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>{isAr ? "نقاط قد تهمك (العيوب):" : "Points of Consideration:"}</span>
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                {(isAr ? product.consAr : product.consEn).map((con, index) => (
                  <li key={index} className="flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detailed Review / Spec Tabs Navigation */}
          <div className="border-t border-emerald-950/40 pt-4">
            <div className="flex border-b border-emerald-950/30 gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => {
                  setActiveTab("features");
                  playSynthSound(440, "sine", 0.05);
                }}
                className={`pb-2.5 px-4 text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "features"
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isAr ? "المزايا الرئيسية" : "Main Highlights"}
              </button>
              <button
                onClick={() => {
                  setActiveTab("specs");
                  playSynthSound(440, "sine", 0.05);
                }}
                className={`pb-2.5 px-4 text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "specs"
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isAr ? "المواصفات التقنية" : "Technical Specs"}
              </button>
              <button
                onClick={() => {
                  setActiveTab("reviews");
                  playSynthSound(440, "sine", 0.05);
                }}
                className={`pb-2.5 px-4 text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === "reviews"
                    ? "border-b-2 border-emerald-500 text-emerald-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isAr ? "تقييمات المشترين" : "Buyer Reviews"}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4">
              
              {/* 1. Features */}
              {activeTab === "features" && (
                <ul className="space-y-3 text-xs text-slate-300 leading-relaxed font-medium">
                  {(isAr ? product.featuresAr : product.featuresEn).map((feat, index) => (
                    <li key={index} className="flex items-start gap-2 bg-[#09100c]/30 p-2.5 rounded-lg border border-emerald-950/30">
                      <span className="w-5 h-5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* 2. Specs */}
              {activeTab === "specs" && (
                <div className="border border-emerald-950/50 rounded-xl overflow-hidden text-xs">
                  {Object.entries(isAr ? product.specsAr : product.specsEn).map(([key, value], index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-2 p-3 ${
                        index % 2 === 0 ? "bg-[#0c130f]" : "bg-[#080d0a]"
                      } border-b border-emerald-950/30 last:border-0`}
                    >
                      <span className="font-extrabold text-slate-400">{key}</span>
                      <span className="font-bold text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Reviews */}
              {activeTab === "reviews" && (
                <div className="space-y-3.5">
                  {[
                    {
                      id: "rev-1",
                      author: isAr ? "عاصم الشريف" : "Asim Al-Sherif",
                      rating: 5,
                      date: isAr ? "٢٤ مايو ٢٠٢٦" : "May 24, 2026",
                      text: isAr ? "منتج خيالي وتغليف رائع. اشتريته برابط الإحالة من دي كورة والشحن وصلني خلال 3 أيام فقط. شكرا جزيلا!" : "Fabulous product and fast delivery. Highly recommend using Dkora's recommendation."
                    },
                    {
                      id: "rev-2",
                      author: isAr ? "أميرة عبد الرحمن" : "Amira Abdulrahman",
                      rating: 4,
                      date: isAr ? "٨ يونيو ٢٠٢٦" : "June 08, 2026",
                      text: isAr ? "أفضل من المحلات المحلية بكثير، والخصم الإضافي ساعدني في التوفير. مريح ومقاسه متناسق جداً." : "Way better than local physical stores. Saved lots of money using the affiliate price."
                    }
                  ].map((rev) => (
                    <div key={rev.id} className="p-3.5 bg-[#0b100d]/60 border border-emerald-950/60 rounded-xl space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-white">{rev.author}</span>
                        <span className="text-[10px] text-slate-500 font-bold font-mono">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-400" : "text-slate-800"}`} />
                        ))}
                      </div>
                      <p className="text-slate-300 font-medium leading-relaxed">{rev.text}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Modal Footer with Redirection CTA */}
        <div className="p-5 border-t border-emerald-950/40 bg-[#060907] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right" dir={isAr ? "rtl" : "ltr"}>
            <p className="text-[10px] text-slate-500 font-bold">
              {isAr 
                ? "إخلاء مسؤولية: كشريك لأمازون، قد نكسب عمولة صغيرة عند الشراء من الروابط." 
                : "Disclaimer: As an Amazon Associate, we earn from qualifying purchases at no extra cost."}
            </p>
          </div>
          <button
            onClick={() => onTriggerAffiliate(product)}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4 text-slate-950 fill-slate-950" />
            <span>{isAr ? "الذهاب لصفحة العرض على أمازون" : "Go to Offer Page on Amazon"}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
