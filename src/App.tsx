import React, { useState, useRef, useEffect } from "react";
import { 
  Trophy, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight, 
  Flame, 
  Info,
  RotateCcw,
  ShoppingBag
} from "lucide-react";
import { Product, Category, Language, Tab } from "./types";
import { PRODUCTS } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import AffiliateRedirectModal from "./components/AffiliateRedirectModal";
import CouponSection from "./components/CouponSection";
import LegalPageModal from "./components/LegalPageModal";

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("dkora_lang");
    return (saved as Language) || "ar";
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [redirectProduct, setRedirectProduct] = useState<Product | null>(null);
  const [legalTab, setLegalTab] = useState<Tab | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem("dkora_muted");
    return saved ? saved === "true" : true;
  });

  const productsRef = useRef<HTMLDivElement>(null);
  const isAr = lang === "ar";

  useEffect(() => {
    localStorage.setItem("dkora_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("dkora_muted", String(isMuted));
  }, [isMuted]);

  // Dynamic sound generator using web audio synthesis API
  const playSynthSound = (freq: number, type: OscillatorType = "sine", duration: number = 0.1, delay: number = 0) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(0.04, ctx.currentTime + delay); // Soft comfortable volume
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      // Safe catch for browser autoplay restrictions or iframe context issues
    }
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    playSynthSound(300, "triangle", 0.1);
  };

  // Live filtering of products depending on search keywords and active categories
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesTitle = 
      product.titleAr.toLowerCase().includes(query) || 
      product.titleEn.toLowerCase().includes(query);
    const matchesDesc = 
      product.descriptionAr.toLowerCase().includes(query) || 
      product.descriptionEn.toLowerCase().includes(query);
    const matchesSpecs = 
      Object.entries(product.specsAr).some(([k, v]) => k.toLowerCase().includes(query) || v.toLowerCase().includes(query)) ||
      Object.entries(product.specsEn).some(([k, v]) => k.toLowerCase().includes(query) || v.toLowerCase().includes(query));

    return matchesCategory && (matchesTitle || matchesDesc || matchesSpecs);
  });

  return (
    <div 
      className="min-h-screen bg-[#040705] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 transition-all duration-300"
      dir={isAr ? "rtl" : "ltr"}
      id="dkora-store-root"
    >
      
      {/* Header component */}
      <Header
        lang={lang}
        setLang={setLang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        playSynthSound={playSynthSound}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Hero section */}
      <Hero
        lang={lang}
        scrollToProducts={scrollToProducts}
        playSynthSound={playSynthSound}
      />

      {/* Interactive Coupon Board */}
      <CouponSection
        lang={lang}
        playSynthSound={playSynthSound}
      />

      {/* Main Grid Section */}
      <main 
        ref={productsRef} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full space-y-10"
      >
        
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-950/40 pb-6">
          <div className="space-y-1.5 text-center md:text-right" dir={isAr ? "rtl" : "ltr"}>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-black justify-center md:justify-start">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? "توصيات ومراجعات الخبراء" : "Expert Handpicked Recommendations"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {isAr ? "أقوى عروض المعدات الرياضية المخفضة" : "Top Discounted Athletic Gear Deals"}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {isAr 
                ? "انقر على أي منتج لاستعراض مراجعة فنية مفصلة، المميزات والعيوب، وخصومات الكوبونات قبل التوجيه."
                : "Click on any product to inspect a full technical analysis, pros/cons list, and copy extra coupons."}
            </p>
          </div>

          {/* Active stats */}
          <div className="flex items-center justify-center gap-3 text-xs font-black text-slate-400 bg-emerald-950/20 px-3 py-1.5 rounded-xl border border-emerald-950/40">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isAr 
                ? `يعرض حالياً: ${filteredProducts.length} من المنتجات` 
                : `Showing: ${filteredProducts.length} premium products`}
            </span>
          </div>
        </div>

        {/* Empty Search/Filter State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-950/20 border border-rose-950 flex items-center justify-center text-rose-500">
              <Info className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-black text-white">
                {isAr ? "عذراً، لم نجد أي تطابق!" : "No Matching Products Found"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {isAr 
                  ? "جرب البحث بكلمات أبسط أو اضغط على زر إعادة التعيين أدناه لعرض جميع المنتجات المتاحة مجدداً."
                  : "Try checking your spelling, clear search terms, or reset the active filter to show all products."}
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isAr ? "إعادة تعيين البحث والتصنيف" : "Reset Filter & Search"}</span>
            </button>
          </div>
        ) : (
          /* Products Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onOpenDetails={(p) => setSelectedProduct(p)}
                onTriggerAffiliate={(p) => setRedirectProduct(p)}
                playSynthSound={playSynthSound}
              />
            ))}
          </div>
        )}

      </main>

      {/* Informative Why Choose Dkora Grid Banner */}
      <section className="bg-slate-950/30 border-t border-emerald-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" dir={isAr ? "rtl" : "ltr"}>
            
            <div className="space-y-2 max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-lg font-black">
                🛡️
              </div>
              <h4 className="text-sm font-black text-white">{isAr ? "روابط شراكة آمنة" : "Secure Referrals"}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr 
                  ? "جميع الروابط مشفرة وتوجهك مباشرة لأمازون لإتمام مشترياتك بأمان وموثوقية كاملة."
                  : "All generated links are secure and direct you securely to official Amazon stores for transactions."}
              </p>
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 text-lime-400 flex items-center justify-center mx-auto text-lg font-black">
                ⚽
              </div>
              <h4 className="text-sm font-black text-white">{isAr ? "اختيارات رياضية دقيقة" : "Expert Sport Selection"}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr 
                  ? "نقوم بتحليل تقييمات المشترين وعيوب السلع لمطابقتها مع أعلى معايير الجودة للاعبي كرة القدم والجري."
                  : "We filter through real buyer feedback and analyze defects to pick elite products for football athletes."}
              </p>
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto text-lg font-black">
                💰
              </div>
              <h4 className="text-sm font-black text-white">{isAr ? "بدون تكاليف مخفية" : "No Extra Cost"}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr 
                  ? "موقعنا مجاني تماماً. العمولة الإعلانية يتم احتسابها وتغطيتها بالكامل من أمازون دون إضافة قرش واحد لسعرك."
                  : "Our portal is completely free to browse. Commissions are paid entirely by Amazon, with zero extra fees."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer view */}
      <footer className="bg-[#050806] border-t border-emerald-950/60 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10" dir={isAr ? "rtl" : "ltr"}>
          
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-3.5 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                  ⚽
                </div>
                <span className="text-base font-extrabold text-white">Dkora</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed max-w-md">
                {isAr 
                  ? "بوابتك العربية الرياضية الرائدة لعام ٢٠٢٦ للحصول على أرقى مستلزمات اللياقة، الأحذية الاحترافية والكرات المطابقة لمعايير الفيفا على أمازون بأسعار مخفضة وتوصيات حقيقية من مدربين معتمدين."
                  : "Your premier Arabic sports portal for 2026, curating elite fitness wear, pro cleats, and soccer balls on Amazon with real discounts and verified buyer reviews."}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white">{isAr ? "التنقل السريع" : "Quick Navigate"}</h4>
              <ul className="space-y-2 text-[11px] font-bold">
                <li>
                  <button 
                    onClick={() => { setActiveCategory("shoes"); scrollToProducts(); playSynthSound(440, "sine", 0.05); }}
                    className="hover:text-emerald-400 cursor-pointer"
                  >
                    {isAr ? "أحذية كرة القدم والجري" : "Cleats & Sneakers"}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveCategory("apparel"); scrollToProducts(); playSynthSound(440, "sine", 0.05); }}
                    className="hover:text-emerald-400 cursor-pointer"
                  >
                    {isAr ? "أطقم وتيشيرتات الأندية" : "Jerseys & Active Apparel"}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveCategory("equipment"); scrollToProducts(); playSynthSound(440, "sine", 0.05); }}
                    className="hover:text-emerald-400 cursor-pointer"
                  >
                    {isAr ? "المعدات والساعات الرياضية" : "Gadgets & Training Gear"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal Policy Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white">{isAr ? "الأحكام والسياسات" : "Legal Policy"}</h4>
              <ul className="space-y-2 text-[11px] font-bold">
                <li>
                  <button
                    onClick={() => { setLegalTab("disclosure"); playSynthSound(500, "sine", 0.08); }}
                    className="hover:text-emerald-400 text-left cursor-pointer text-xs"
                  >
                    {isAr ? "إفصاح برنامج التسويق بالعمولة (Amazon)" : "Amazon Associates Disclosure"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setLegalTab("privacy"); playSynthSound(500, "sine", 0.08); }}
                    className="hover:text-emerald-400 text-left cursor-pointer text-xs"
                  >
                    {isAr ? "سياسة الخصوصية وملفات الكوكيز" : "Privacy & Cookie Policy"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setLegalTab("terms"); playSynthSound(500, "sine", 0.08); }}
                    className="hover:text-emerald-400 text-left cursor-pointer text-xs"
                  >
                    {isAr ? "شروط الخدمة وحدود المسؤولية" : "Terms of Service"}
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Mandatory Amazon Affiliate Disclosure Paragraph */}
          <div className="pt-6 border-t border-emerald-950/40 text-[10px] text-slate-500 leading-relaxed text-center space-y-2">
            <p>
              {isAr 
                ? "إفصاح إلزامي: موقع دي كورة (dkora.online) هو موقع مشارك في برنامج التسويق بالعمولة لأمازون (Amazon Services LLC Associates Program). عند نقرك على زر شراء أي منتج من منصتنا والذهاب لشرائه من متجر أمازون، فإننا نكسب عمولة تسويقية صغيرة ورمزية من قيمة مشترياتك المؤهلة. لا يؤثر ذلك إطلاقاً على سعر المنتج النهائي بالنسبة لك، بل تقتطع العمولة من أرباح أمازون."
                : "Amazon Associates Disclosure: Dkora (dkora.online) is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and global locales. As an Amazon Associate, we earn from qualifying purchases at no extra cost to you."}
            </p>
            <p className="font-mono text-emerald-600 font-bold">
              {isAr ? "دومين معتمد: dkora.online" : "Verified Domain: dkora.online"}
            </p>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-4 border-t border-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
            <span>
              &copy; {new Date().getFullYear()} Dkora Affiliate Store. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </span>
            <span>
              {isAr ? "بوابة التسويق بالعمولة الاحترافية لكرة القدم والرياضة لعام ٢٠٢٦" : "Professional Soccer & Athletic Affiliate Portal - 2026"}
            </span>
          </div>

        </div>
      </footer>

      {/* Render modals conditionally */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          lang={lang}
          onClose={() => setSelectedProduct(null)}
          onTriggerAffiliate={(prod) => {
            setSelectedProduct(null);
            setRedirectProduct(prod);
          }}
          playSynthSound={playSynthSound}
        />
      )}

      {redirectProduct && (
        <AffiliateRedirectModal
          product={redirectProduct}
          lang={lang}
          onCancel={() => setRedirectProduct(null)}
          playSynthSound={playSynthSound}
        />
      )}

      {legalTab && (
        <LegalPageModal
          page={legalTab}
          lang={lang}
          onClose={() => setLegalTab(null)}
          playSynthSound={playSynthSound}
        />
      )}

    </div>
  );
}
