import React, { useState } from "react";
import { Ticket, Percent, Copy, Check, Calendar } from "lucide-react";
import { COUPONS } from "../data";
import { Language } from "../types";

interface CouponSectionProps {
  lang: Language;
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
}

export default function CouponSection({ lang, playSynthSound }: CouponSectionProps) {
  const isAr = lang === "ar";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    playSynthSound(523, "sine", 0.08);
    playSynthSound(659, "sine", 0.08, 0.04);
    playSynthSound(784, "sine", 0.15, 0.08);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-[#060a07] border-y border-emerald-950/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center space-y-2 mb-8" dir={isAr ? "rtl" : "ltr"}>
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-lime-400/15 text-lime-400 text-[10px] font-black rounded-full border border-lime-500/20 uppercase tracking-widest">
            <Ticket className="w-3 h-3 text-lime-400" />
            <span>{isAr ? "مركز القسائم الترويجية" : "Promo Coupon Center"}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white">
            {isAr ? "كوبونات حصرية لتوفير إضافي على أمازون" : "Exclusive Coupons For Extra Amazon Savings"}
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto font-medium leading-relaxed">
            {isAr 
              ? "انسخ الكوبون وطبقه مباشرة في صفحة الدفع بمتجر أمازون للاستفادة من خصم إضافي فوري عند إتمام الطلب."
              : "Copy these active coupons and apply them directly at checkout on Amazon to save on athletic footwear and gear."}
          </p>
        </div>

        {/* Coupon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
          {COUPONS.map((coupon) => {
            const isCopied = copiedId === coupon.id;

            return (
              <div
                key={coupon.id}
                className="relative bg-[#09100c] border border-emerald-950 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-500/30 transition-all group overflow-hidden"
              >
                
                {/* Dotted separator for coupon aesthetic */}
                <div className="hidden sm:block absolute top-0 bottom-0 left-[35%] border-l-2 border-dashed border-emerald-950/50" />

                {/* Left/Main Side of Coupon */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-black">
                      <Percent className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-black text-white">
                      {isAr ? coupon.discountAr : coupon.discountEn}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-bold">
                    {isAr ? coupon.descriptionAr : coupon.descriptionEn}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {isAr ? `تاريخ الانتهاء: ${coupon.expiryAr}` : `Expires: ${coupon.expiryEn}`}
                    </span>
                  </div>
                </div>

                {/* Right / Copy Action Side */}
                <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-end justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-emerald-950/30 sm:pl-4">
                  <div className="text-center sm:text-right">
                    <span className="text-[10px] text-slate-500 font-black block uppercase tracking-wider">
                      {isAr ? "كود التخفيض" : "PROMO CODE"}
                    </span>
                    <span className="text-sm font-black text-lime-400 font-mono tracking-wider block mt-0.5">
                      {coupon.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(coupon.id, coupon.code)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isCopied
                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10"
                        : "bg-[#0b1611] hover:bg-emerald-950/40 text-slate-200 border border-emerald-900/40 hover:border-emerald-500/30"
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isCopied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ الكود" : "Copy Code")}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
