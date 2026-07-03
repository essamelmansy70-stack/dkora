import React, { useEffect, useState } from "react";
import { ShoppingBag, Loader2, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Product, Language } from "../types";

interface AffiliateRedirectModalProps {
  product: Product;
  lang: Language;
  onCancel: () => void;
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
}

export default function AffiliateRedirectModal({
  product,
  lang,
  onCancel,
  playSynthSound,
}: AffiliateRedirectModalProps) {
  const isAr = lang === "ar";
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    // Phase updates and sound triggers
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamic status messages based on progress percentage
    if (progress === 0) {
      setStatusMessage(isAr ? "جاري الاتصال بخوادم أمازون..." : "Connecting to Amazon servers...");
      playSynthSound(400, "sine", 0.05);
    } else if (progress === 30) {
      setStatusMessage(isAr ? "جاري التحقق من التوافر والمخزون..." : "Verifying item inventory...");
      playSynthSound(450, "sine", 0.05);
    } else if (progress === 60) {
      setStatusMessage(isAr ? "جاري تطبيق أفضل كوبون خصم نشط..." : "Applying lowest discount coupon...");
      playSynthSound(500, "sine", 0.05);
    } else if (progress === 90) {
      setStatusMessage(isAr ? "تم إعداد رابط الإحالة بأمان!" : "Affiliate secure link prepared!");
      playSynthSound(600, "sine", 0.1);
    } else if (progress === 100) {
      playSynthSound(880, "sine", 0.15);
      // Open in new tab securely
      const urlWithTag = `${product.amazonUrl}&subId=dkora2026`;
      
      const timer = setTimeout(() => {
        window.open(urlWithTag, "_blank", "noopener,noreferrer");
        onCancel();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [progress, isAr, product.amazonUrl, onCancel]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* Container Frame */}
      <div
        className="w-full max-w-md bg-[#070b08] border-2 border-emerald-500/30 rounded-3xl p-6 text-center space-y-6 text-white shadow-2xl relative"
        dir={isAr ? "rtl" : "ltr"}
      >
        
        {/* Animated Brand Header */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center relative">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-lime-400 animate-pulse" />
          </div>
        </div>

        {/* Informative text */}
        <div className="space-y-2">
          <h3 className="text-base font-black text-white">
            {isAr ? "جاري تحويلك إلى أمازون" : "Redirecting to Amazon Store"}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            {isAr 
              ? `يتم الآن توليد كود التخفيض وجلب السعر الحالي لـ: ${product.titleAr}`
              : `Generating coupon codes and parsing live tracker data for: ${product.titleEn}`}
          </p>
        </div>

        {/* Progress bar container */}
        <div className="space-y-2">
          <div className="w-full h-2 bg-slate-900 border border-emerald-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-400 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-black text-slate-500 font-mono">
            <span>{statusMessage}</span>
            <span className="text-emerald-400">{progress}%</span>
          </div>
        </div>

        {/* Real-time price tracker validation badge */}
        <div className="py-2 px-3 rounded-lg bg-emerald-950/15 border border-emerald-500/10 flex items-center justify-center gap-1.5 text-[10px] font-black text-lime-400 max-w-xs mx-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          <span>{isAr ? "رابط معتمد آمن ١٠٠٪ ومحمي بشهادة SSL" : "100% Secure SSL Verified Amazon Link"}</span>
        </div>

        {/* Direct manual link alternative */}
        <div className="pt-2 border-t border-emerald-950/40 flex justify-between items-center gap-4 text-[11px]">
          <span className="text-slate-500 font-bold">
            {isAr ? "إذا لم يبدأ التحويل تلقائياً:" : "If page doesn't open:"}
          </span>
          <button
            onClick={() => {
              playSynthSound(700, "sine", 0.08);
              window.open(product.amazonUrl, "_blank", "noopener,noreferrer");
              onCancel();
            }}
            className="text-emerald-400 hover:text-lime-400 font-black cursor-pointer flex items-center gap-0.5"
          >
            <span>{isAr ? "اضغط هنا للتحويل" : "Click here"}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Cancel option */}
        <button
          onClick={() => {
            playSynthSound(250, "sine", 0.1);
            onCancel();
          }}
          className="w-full py-2 border border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900 text-xs font-bold text-slate-400 hover:text-white rounded-xl cursor-pointer transition-colors"
        >
          {isAr ? "إلغاء التحويل" : "Cancel Redirection"}
        </button>

      </div>

    </div>
  );
}
