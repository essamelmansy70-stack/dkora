import React from "react";
import { Wrench } from "lucide-react";

interface FooterProps {
  onSelectCategory: (id: string | null) => void;
  setActiveView: (view: string) => void;
  isDarkMode: boolean;
  showAdminButton?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, setActiveView, isDarkMode, showAdminButton = true }) => {
  return (
    <footer
      className={`border-t transition-colors ${
        isDarkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-900 border-slate-800 text-slate-300"
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
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
              المنصة المستقلة المتخصصة حصرياً في تقديم مراجعات المنتجات الشاملة، مقالات التقييم الفني، ومقارنة المواصفات لتوجيه القرارات الشرائية بثقة.
            </p>
          </div>

          {/* Quick Navigation Column */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">أقسام الموقع والمراجعات</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      onSelectCategory(null);
                      setActiveView("home");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-slate-200"
                >
                  • الرئيسية (أحدث مراجعات المنتجات)
                </a>
              </li>
              <li>
                <a
                  href="/articles"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setActiveView("articles");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/articles");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-amber-400"
                >
                  • مقالات المراجعات الشاملة
                </a>
              </li>
              <li>
                <a
                  href="/comparisons"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setActiveView("comparisons");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/comparisons");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-amber-400"
                >
                  • أداة مقارنات المنتجات والمواصفات
                </a>
              </li>
              <li className="pt-1 border-t border-slate-800/80">
                <a
                  href="https://qrytube.com"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="hover:text-amber-300 block font-black text-amber-400 flex items-center gap-1.5"
                >
                  <span>🛠️ دليل صنايعية مصر (qrytube.com)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Pages Column (Positioned cleanly at bottom of pages) */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">الصفحات القانونية والسياسات</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setActiveView("privacy");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/privacy");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-slate-200"
                >
                  • سياسة الخصوصية وسرية البيانات
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setActiveView("terms");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/terms");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-slate-200"
                >
                  • الشروط والأحكام وقواعد الاستخدام
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setActiveView("about");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/about");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-slate-200"
                >
                  • من نحن (عن منصة ديكورا)
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setActiveView("contact");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/contact");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-slate-200"
                >
                  • اتصل بنا وهيئة التحرير
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      setActiveView("disclaimer");
                      if (typeof window !== "undefined") window.history.pushState({}, "", "/disclaimer");
                    }
                  }}
                  className="hover:text-amber-400 block font-bold text-slate-200"
                >
                  • إخلاء المسؤولية ومعايير المراجعة المستقلة
                </a>
              </li>
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
