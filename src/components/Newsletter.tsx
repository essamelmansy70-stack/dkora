import React, { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";

interface NewsletterProps {
  isDarkMode: boolean;
}

export const Newsletter: React.FC<NewsletterProps> = ({ isDarkMode }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section
      className={`my-12 p-8 sm:p-12 rounded-3xl border text-center space-y-6 relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border-slate-800"
          : "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-orange-500/10 border-amber-200"
      }`}
    >
      <div className="max-w-2xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
          <Mail className="w-6 h-6 stroke-[2.5]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          اشترك في النشرة البريدية لـ 'ديكورا'
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
          احصل على أحدث مقارنات العُدد، أكواد الخصم الحصرية لأمازون وجوميا ونون، وأدلة التشطيب الفنية أولاً بأول.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>شكرًا لانضمامك! تم تسجيل بريدك الإلكتروني بنجاح.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              placeholder="اكتب بريدك الإلكتروني..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 px-4 py-3 rounded-2xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-700 text-white placeholder-slate-400"
                  : "bg-white border-amber-300 text-slate-900 placeholder-slate-500 shadow-sm"
              }`}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all"
            >
              اشترك الآن
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
