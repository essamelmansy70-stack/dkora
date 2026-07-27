import React, { useState } from "react";
import { X, Code2, Copy, Check, ShieldCheck, Search } from "lucide-react";
import { Product } from "../types";

interface SeoSchemaModalProps {
  product: Product | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const SeoSchemaModal: React.FC<SeoSchemaModalProps> = ({
  product,
  onClose,
  isDarkMode,
}) => {
  if (!product) return null;

  const [copied, setCopied] = useState(false);

  // Generate Schema.org Product JSON-LD
  const productSchemaJson = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.titleAr,
    "image": [product.mainImage, ...(product.gallery || [])],
    "description": product.summary,
    "sku": product.modelNumber,
    "mpn": product.modelNumber,
    "brand": {
      "@type": "Brand",
      "name": product.brandName
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": product.editorScore,
        "bestRating": "10"
      },
      "author": {
        "@type": "Organization",
        "name": "ديكورا - Dkora"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EGP",
      "lowPrice": product.priceAmazon,
      "highPrice": product.priceJumia || product.priceAmazon,
      "offerCount": "3",
      "offers": [
        {
          "@type": "Offer",
          "url": product.amazonUrl,
          "priceCurrency": "EGP",
          "price": product.priceAmazon,
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Amazon Egypt"
          }
        },
        {
          "@type": "Offer",
          "url": product.jumiaUrl,
          "priceCurrency": "EGP",
          "price": product.priceJumia,
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Jumia"
          }
        }
      ]
    }
  };

  const schemaString = JSON.stringify(productSchemaJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
          isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950 text-white border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm sm:text-base">
              بيانات Schema.org المنظمة (Product & Review Schema)
            </h3>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed">
            هذا الكود منظم وفق إرشادات محرك بحث Google لظهور التقييمات والأسعار مباشرة كـ{" "}
            <strong className="text-amber-400">Rich Snippets</strong> في نتائج البحث الأولى.
          </p>

          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
            <pre>{schemaString}</pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">مفعل تلقائيًا في جميع صفحات منتجات 'ديكورا'</span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ كود JSON-LD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
