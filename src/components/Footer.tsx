import React from "react";
import { Wrench, ShieldCheck, Heart, ExternalLink, Layers, ShoppingBag } from "lucide-react";
import { CATEGORIES } from "../data/mockData";

interface FooterProps {
  onSelectCategory: (id: string | null) => void;
  setActiveView: (view: string) => void;
  isDarkMode: boolean;
  showAdminButton?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, setActiveView, isDarkMode, showAdminButton = false }) => {
  return (
    <footer
      className={`border-t transition-colors ${
        isDarkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-900 border-slate-800 text-slate-300"
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
                <Wrench className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-black text-2xl text-white tracking-tight">ديكورا</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold mr-2">
                  Dkora
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              المنصة العربية المعتمدة الأولى لمراجعات ومقارنات العُدد الكهربائية، الأدوات اليدوية، تجهيزات الورش، ومستلزمات الديكور والتشطيب مع مقارنة أسعار لحظية بين أمازون، جوميا، ونون.
            </p>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <span className="text-amber-400 font-bold block flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> إخلاء مسؤولية التسويق بالعمولة (Affiliate Disclosure):
              </span>
              <p className="text-slate-400 leading-snug">
                موقع 'ديكورا' يتشارك مع برامج التسويق بالعمولة (Amazon Associates, Jumia Affiliate, Noon). قد نحصل على عمولة بسيطة عند الشراء من خلال روابطنا دون أي زيادة في السعر عليك.
              </p>
            </div>
          </div>

          {/* Quick Categories Column 1 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">أقسام العُدد والأدوات</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setActiveView("home");
                    }}
                    className="hover:text-amber-400 transition-colors text-right"
                  >
                    • {cat.nameAr}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Categories Column 2 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">الديكور والحماية</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(6, 12).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setActiveView("home");
                    }}
                    className="hover:text-amber-400 transition-colors text-right"
                  >
                    • {cat.nameAr}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Legal */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">روابط سريعة والأرشفة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView("comparisons")} className="hover:text-amber-400">
                  • أداة المقارنات المباشرة
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView("deals")} className="hover:text-amber-400">
                  • أكواد الخصم والعروض
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView("articles")} className="hover:text-amber-400">
                  • مقالات ودروس الصيانة
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView("sitemap")} className="hover:text-amber-400 flex items-center gap-1">
                  • خريطة الموقع (Sitemap)
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 text-emerald-400 flex items-center gap-1"
                >
                  • ملف sitemap.xml المباشر ↗
                </a>
              </li>
              {showAdminButton && (
                <li>
                  <button onClick={() => setActiveView("admin")} className="hover:text-amber-400">
                    • لوحة التحكم للإدارة
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 موقع ديكورا (Dkora). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>صُنع بشغف هندسي لخدمة الصنايعية والورش في الوطن العربي</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
