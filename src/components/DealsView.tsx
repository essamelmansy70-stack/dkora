import React, { useState } from "react";
import { Tag, Clock, ExternalLink, Copy, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Deal, Currency } from "../types";

interface DealsViewProps {
  deals: Deal[];
  currency: Currency;
  isDarkMode: boolean;
}

export const DealsView: React.FC<DealsViewProps> = ({ deals, currency, isDarkMode }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const getPrice = (baseEgp: number) => {
    if (currency === "USD") return `$${Math.round(baseEgp / 50)}`;
    if (currency === "SAR") return `${Math.round(baseEgp / 13)} ر.س`;
    return `${baseEgp.toLocaleString()} ج.م`;
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="space-y-8 my-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-bold px-3 py-1 rounded-full">
          <Tag className="w-3.5 h-3.5" />
          أقوى العروض والخصومات اليومية
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          أكواد خصم وتخفيضات المتاجر الكبرى
        </h1>
        <p className="text-slate-500 text-sm">
          تحديث مستمر لأحدث خصومات العُدد والأدوات والديكور على أمازون وجوميا ونون.
        </p>
      </div>

      {/* Deals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className={`rounded-3xl border overflow-hidden p-6 space-y-4 flex flex-col justify-between transition-all hover:shadow-2xl ${
              isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900 shadow-md"
            }`}
          >
            <div className="space-y-3">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img src={deal.image} alt={deal.productTitle} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-rose-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg">
                  خصم {deal.discountPercent}%
                </span>
                <span className="absolute bottom-3 left-3 bg-slate-950/80 text-amber-400 font-bold text-xs px-2.5 py-1 rounded-lg uppercase">
                  {deal.store}
                </span>
              </div>

              <h3 className="font-extrabold text-base leading-snug line-clamp-2">
                {deal.productTitle}
              </h3>

              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-lg font-mono">{getPrice(deal.dealPrice)}</span>
                  <span className="text-slate-500 line-through text-xs font-mono">{getPrice(deal.originalPrice)}</span>
                </div>
                <span className="text-amber-500 text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {deal.expiresIn}
                </span>
              </div>

              {/* Coupon Box */}
              {deal.couponCode && (
                <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 text-xs ${
                  isDarkMode ? "bg-slate-950 border-amber-500/30" : "bg-amber-50 border-amber-300"
                }`}>
                  <div>
                    <span className={`text-[10px] block ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      كود الخصم الحصري:
                    </span>
                    <strong className="font-mono text-amber-600 dark:text-amber-400 font-extrabold text-sm">{deal.couponCode}</strong>
                  </div>
                  <button
                    onClick={() => handleCopyCode(deal.couponCode!)}
                    className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold flex items-center gap-1 text-[11px] transition-colors shadow-sm"
                  >
                    {copiedCode === deal.couponCode ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الكود</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all text-center mt-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>انتقل للعرض واشترِ الآن</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
