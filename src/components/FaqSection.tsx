import React, { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck } from "lucide-react";
import { FAQS_DATA } from "../data/mockData";

interface FaqSectionProps {
  isDarkMode: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ isDarkMode }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="my-12 max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
          <HelpCircle className="w-3.5 h-3.5" />
          الأسئلة الشائعة والمعايير (FAQ)
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          كل ما تحتاج معرفته عن مراجعات وتسوق 'ديكورا'
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-right font-extrabold text-sm sm:text-base flex items-center justify-between gap-4 text-slate-900 dark:text-slate-100"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/40 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-950/20">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
