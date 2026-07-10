import React, { useState, useEffect } from "react";
import {
  Trophy,
  Search,
  Heart,
  Star,
  ExternalLink,
  Grid,
  Shirt,
  Footprints,
  Dumbbell,
  X,
  Trash2,
  Compass,
  Info,
  Check,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

import { PRODUCTS_DATA, GUIDES_DATA } from "./data";
import { Product, GuideItem, CategoryFilter } from "./types";

export default function App() {
  // Localization & State managers
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rating" | "reviews">("rating");
  
  // Modal & Drawer views
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeGuide, setActiveGuide] = useState<GuideItem | null>(null);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState<boolean>(false);
  
  // User favorite items (local persistence via localStorage)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("sportzone_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Brief alert notification toaster
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ""
  });

  useEffect(() => {
    try {
      localStorage.setItem("sportzone_wishlist", JSON.stringify(wishlist));
    } catch (err) {
      console.warn("Failed to persist wishlist to localStorage", err);
    }
  }, [wishlist]);

  // Read URL query parameters on mount to support deep-linking for products, guides, and categories
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");
    const guideId = params.get("guide");
    const categoryParam = params.get("category");

    if (productId) {
      const prod = PRODUCTS_DATA.find((p) => p.id === productId);
      if (prod) {
        setActiveProduct(prod);
      }
    }
    if (guideId) {
      const guide = GUIDES_DATA.find((g) => g.id === guideId);
      if (guide) {
        setActiveGuide(guide);
      }
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam as any);
    }

    // Force Arabic and RTL layout directions
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  // Listen to popstate event (browser back/forward buttons) to update active states dynamically
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const productId = params.get("product");
      const guideId = params.get("guide");
      const categoryParam = params.get("category");

      if (productId) {
        const prod = PRODUCTS_DATA.find((p) => p.id === productId);
        setActiveProduct(prod || null);
        setActiveGuide(null);
      } else if (guideId) {
        const guide = GUIDES_DATA.find((g) => g.id === guideId);
        setActiveGuide(guide || null);
        setActiveProduct(null);
      } else {
        setActiveProduct(null);
        setActiveGuide(null);
      }

      if (categoryParam) {
        setSelectedCategory(categoryParam as any);
      } else {
        setSelectedCategory("all");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Dynamic SEO Metadata updates for search engines and social sharing
  useEffect(() => {
    let title = "سبورت زون | متجر المعدات والملابس الرياضية بأفضل الأسعار على أمازون";
    let desc = "تسوق أفضل الأحذية الرياضية، الملابس الأنيقة، ومعدات التدريب واللياقة البدنية عالية الجودة. منتجات موثوقة ومختارة بعناية بروابط مباشرة إلى أمازون.";
    let url = window.location.href;
    let image = "https://images.unsplash.com/photo-1460353581641-37baddff0bc2?auto=format&fit=crop&w=1200&q=80";

    if (activeProduct) {
      title = `${activeProduct.titleAr} | سبورت زون`;
      desc = `${activeProduct.descriptionAr.slice(0, 160)}... مراجعة فنية كاملة ورابط شراء مباشر من أمازون لـ ${activeProduct.titleAr}`;
      if (activeProduct.image) image = activeProduct.image;
    } else if (activeGuide) {
      title = `${activeGuide.titleAr} | دليل الشراء الذكي | سبورت زون`;
      desc = `${activeGuide.excerptAr} - اقرأ إرشاداتنا المجانية والمعدة من قبل خبراء ومدربين رياضيين لتختار بشكل صحيح من أمازون.`;
    } else if (selectedCategory !== "all") {
      if (selectedCategory === "shoes") {
        title = "أحذية جري وملاعب رياضية ممتازة | سبورت زون";
        desc = "تصفح تشكيلة واسعة من الأحذية الرياضية المريحة وأحذية الجري المخصصة للماراثونات والملاعب بأعلى التقييمات على أمازون.";
      } else if (selectedCategory === "apparel") {
        title = "ملابس رياضية وتمرين ممتازة ومضادة للتعرق | سبورت زون";
        desc = "تسوق ملابس رياضية وأطقم تمرين مريحة للرجال والنساء، مصممة من نسيج يسمح بالتهوية ويمتص العرق بكفاءة.";
      } else if (selectedCategory === "equipment") {
        title = "معدات وأدوات اللياقة البدنية والجيم المنزلي | سبورت زون";
        desc = "اكتشف أفضل أجهزة الكارديو، عقلة الباب، وحبال المقاومة لتجهيز صالتك الرياضية المنزلية المتكاملة بأسعار ممتازة.";
      }
    }

    // Update title
    document.title = title;

    // Helper function to update meta tags
    const updateMeta = (selector: string, attrName: string, value: string) => {
      let meta = document.head.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(selector.includes("property") ? "property" : "name", selector.match(/"([^"]+)"/)?.[1] || "");
        document.head.appendChild(meta);
      }
      meta.setAttribute(attrName, value);
    };

    updateMeta('meta[name="description"]', 'content', desc);
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', desc);
    updateMeta('meta[property="og:image"]', 'content', image);
    updateMeta('meta[property="og:url"]', 'content', url);
    updateMeta('meta[property="twitter:title"]', 'content', title);
    updateMeta('meta[property="twitter:description"]', 'content', desc);
    updateMeta('meta[property="twitter:url"]', 'content', url);
  }, [activeProduct, activeGuide, selectedCategory]);

  const openProductPage = (prod: Product) => {
    setActiveProduct(prod);
    setActiveGuide(null);
    window.history.pushState(null, "", `?product=${prod.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openGuidePage = (guide: GuideItem) => {
    setActiveGuide(guide);
    setActiveProduct(null);
    window.history.pushState(null, "", `?guide=${guide.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBackToHome = () => {
    setActiveProduct(null);
    setActiveGuide(null);
    window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToastNotification = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3500);
  };

  const toggleWishlist = (productId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToastNotification(
          lang === "ar" 
            ? "تمت إزالة المنتج من قائمة المفضلة" 
            : "Product removed from favorites"
        );
        return prev.filter((id) => id !== productId);
      } else {
        showToastNotification(
          lang === "ar" 
            ? "تمت إضافة المنتج لقائمة المفضلة! ❤️" 
            : "Added to favorites! ❤️"
        );
        return [...prev, productId];
      }
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToastNotification(
      lang === "ar" 
        ? "تم إفراغ قائمة المفضلة بالكامل" 
        : "Favorites cleared completely"
    );
  };

  const isRtl = lang === "ar";

  // Search and Filtering Pipeline
  const filteredProducts = PRODUCTS_DATA.filter((prod) => {
    const matchesCategory = selectedCategory === "all" || prod.category === selectedCategory;
    
    const matchesTag = selectedTag === "all" || 
      (isRtl ? prod.tagsAr.includes(selectedTag) : prod.tagsEn.includes(selectedTag));
      
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      prod.titleAr.toLowerCase().includes(query) ||
      prod.titleEn.toLowerCase().includes(query) ||
      prod.descriptionAr.toLowerCase().includes(query) ||
      prod.descriptionEn.toLowerCase().includes(query) ||
      prod.tagsAr.some(t => t.toLowerCase().includes(query)) ||
      prod.tagsEn.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesTag && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return b.reviewsCount - a.reviewsCount;
  });

  // Extract all unique tags for the sub-filter pills based on current language
  const availableTags = Array.from(
    new Set(
      PRODUCTS_DATA.filter((p) => selectedCategory === "all" || p.category === selectedCategory)
        .flatMap((p) => (isRtl ? p.tagsAr : p.tagsEn))
    )
  ).slice(0, 8); // Display top 8 relevant tags to keep layout tidy

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-emerald-600 selection:text-white relative overflow-x-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambience Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Main Premium Header */}
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white transform hover:rotate-6 transition-transform duration-300">
              <Trophy className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900 font-sans">
                  {isRtl ? "سبورت زون" : "SportZone"}
                </h1>
                <span className="text-[10px] bg-emerald-50 text-emerald-750 border border-emerald-200 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  {isRtl ? "أمازون أفيليت" : "Amazon Affiliate"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                {isRtl ? "دليلك لأفضل التجهيزات الرياضية بذكاء" : "Your Smart Guide to Premium Sports Gear"}
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none rtl:left-0 rtl:right-auto rtl:pl-3 rtl:pr-0">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder={isRtl ? "ابحث عن حذاء، ملابس، معدات تدريب..." : "Search shoes, apparel, exercise gear..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedTag("all"); // reset tag filter on active search
              }}
              className="block w-full py-2.5 pr-10 pl-4 rtl:pl-10 rtl:pr-4 bg-slate-100/80 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-slate-600 rtl:right-0 rtl:left-auto rtl:pr-3"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Controls Hub */}
          <div className="flex items-center gap-3">
            {/* Wishlist Trigger */}
            <button
              onClick={() => setShowWishlistDrawer(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-700 hover:text-emerald-700 transition-all cursor-pointer shadow-sm bg-white"
              title={isRtl ? "قائمة المنتجات المحفوظة" : "Saved Products List"}
            >
              <Heart className={`w-4.5 h-4.5 ${wishlist.length > 0 ? "fill-red-500 text-red-500 animate-pulse" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </button>


          </div>

        </div>
      </header>

      {/* Amazon Program Affiliation Disclosure Notice */}
      <div className="w-full bg-slate-900 text-slate-300 py-2.5 px-4 text-center text-xxs sm:text-xs z-10 relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-extrabold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isRtl ? "إفصاح رسمي:" : "Official Disclosure:"}
          </span>
          <span>
            {isRtl 
              ? "بصفتنا شركاء ومروجين لموقع أمازون، قد نحصل على عمولة تسويقية بسيطة عند الشراء الفعلي من خلال الروابط المنشورة لدينا، وذلك دون أي تكلفة مادية إضافية عليك نهائياً." 
              : "As an Amazon Associate, we earn a small referral commission from qualifying purchases made through our direct product links, at absolute zero extra cost to you."}
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10 flex-grow">
        {activeProduct ? (
          <article className="animate-fade space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative">
            {/* Top Back Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <button
                onClick={goBackToHome}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs cursor-pointer transition-all"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isRtl ? "العودة إلى المعرض الرئيسي" : "Back to Home"}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs font-bold">{isRtl ? "شارك هذه الصفحة:" : "Share link:"}</span>
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-mono py-1 px-2.5 rounded-lg w-40 sm:w-60 focus:outline-none"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToastNotification(isRtl ? "تم نسخ رابط الصفحة المباشر بنجاح!" : "Direct link copied successfully!");
                  }}
                  className="text-xs font-black text-emerald-600 hover:text-emerald-800"
                >
                  {isRtl ? "نسخ" : "Copy"}
                </button>
              </div>
            </div>

            {/* Product Hero Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image Column */}
              <div className="relative aspect-square w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-inner group">
                <img
                  src={activeProduct.image}
                  alt={isRtl ? activeProduct.titleAr : activeProduct.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                {activeProduct.badgeAr && (
                  <span className="absolute top-4 right-4 z-10 text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-600 text-white shadow-md flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-white" />
                    <span>{isRtl ? activeProduct.badgeAr : activeProduct.badgeEn}</span>
                  </span>
                )}
                {/* Save overlay */}
                <button
                  onClick={() => toggleWishlist(activeProduct.id)}
                  className="absolute top-4 left-4 z-10 p-3 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-slate-400 hover:text-red-500 shadow-md transition-colors cursor-pointer"
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(activeProduct.id) ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>

              {/* Product Info Column */}
              <div className="flex flex-col justify-between space-y-6 text-right rtl:text-right ltr:text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-150 uppercase">
                      {isRtl ? activeProduct.subCategoryAr : activeProduct.subCategoryEn}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {isRtl ? activeProduct.titleAr : activeProduct.titleEn}
                  </h1>

                  {/* Rating summary */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="font-black text-slate-900 text-base">{activeProduct.rating}</span>
                    <span className="text-slate-400 font-semibold">({activeProduct.reviewsCount} {isRtl ? "تقييم حقيقي وموثق" : "authentic reviews"})</span>
                  </div>

                  {/* Best Use */}
                  <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-500/10 space-y-1">
                    <span className="font-extrabold text-emerald-850 text-xs flex items-center gap-1.5">
                      <span>🎯</span>
                      <span>{isRtl ? "الاستخدام المثالي والأداء:" : "Recommended Best Use:"}</span>
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {isRtl ? activeProduct.bestUseAr : activeProduct.bestUseEn}
                    </p>
                  </div>
                </div>

                {/* Main Purchase CTA Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{isRtl ? "تأكيد توافر المخزون" : "Stock Status"}</p>
                      <span className="text-xs text-emerald-600 font-black flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                        {isRtl ? "متوفر حالياً للطلب الفوري" : "In Stock - Order Instantly"}
                      </span>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded-md">
                      Amazon Affiliate
                    </span>
                  </div>

                  <a
                    href={activeProduct.amazonUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all duration-300 transform hover:-translate-y-0.5 group"
                  >
                    <span>{isRtl ? "عرض السعر الحالي والشراء من أمازون" : "Check Price & Buy From Amazon"}</span>
                    <ExternalLink className="w-4.5 h-4.5 transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Deep Description & Specifications Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 text-right rtl:text-right ltr:text-left">
              <div className="space-y-3">
                <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-550 rounded-full" />
                  {isRtl ? "الوصف التفصيلي والتقييم الرياضي:" : "Detailed Product Overview:"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                  {isRtl ? activeProduct.descriptionAr : activeProduct.descriptionEn}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-550 rounded-full" />
                  {isRtl ? "أبرز المواصفات والخصائص المميزة:" : "Key Technical Features:"}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {(isRtl ? activeProduct.featuresAr : activeProduct.featuresEn).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Amazon Compliance dynamic price disclaimer */}
            <div className="bg-amber-50 border border-amber-250 p-5 rounded-2xl space-y-3 text-right rtl:text-right ltr:text-left">
              <div className="flex items-center gap-2 text-amber-850 font-black text-xs sm:text-sm">
                <Info className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{isRtl ? "ملاحظة هامة بخصوص أسعار المنتجات المعروضة" : "Important Pricing & Stock Compliance"}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {isRtl 
                  ? "التزاماً بسياسات وإرشادات شركاء أمازون (Amazon Associates)، نود التنويه بأننا لا نقوم بعرض الأسعار بشكل مباشر على موقعنا. وذلك لأن الأسعار، نسب الخصومات الإضافية، مصاريف التوصيل الجغرافي والجمارك، ومدى توفر المنتج في المخازن تتغير بشكل ديناميكي وفي غضون ثوانٍ قليلة على خوادم أمازون. لمعاينة أدق سعر مع تحديثات التوصيل لبلدك، نوصي دائماً بالضغط على زر الانتقال المباشر للمعاينة الرسمية الآمنة."
                  : "Per Amazon's compliance policy, we do not feature static prices on our app since prices, localized delivery fees, dynamic discounts, and stock status fluctuate in real-time on Amazon's official platform. Please tap the buy button above to view the most current verified details directly on Amazon."}
              </p>
            </div>

            {/* Recommended/Related items in the same category */}
            <div className="pt-8 border-t border-slate-100 space-y-6 text-right rtl:text-right ltr:text-left">
              <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Trophy className="w-4.5 h-4.5 text-emerald-600" />
                {isRtl ? "منتجات مشابهة قد تثير اهتمامك أيضاً:" : "Related Products You Might Like:"}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PRODUCTS_DATA.filter((p) => p.category === activeProduct.category && p.id !== activeProduct.id)
                  .slice(0, 4)
                  .map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => openProductPage(prod)}
                      className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 hover:border-emerald-500 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="aspect-square rounded-lg overflow-hidden bg-white border border-slate-150">
                          <img src={prod.image} alt={prod.titleAr} className="w-full h-full object-cover animate-fade" />
                        </div>
                        <h4 className="text-[11px] font-black text-slate-950 line-clamp-1">
                          {isRtl ? prod.titleAr : prod.titleEn}
                        </h4>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-extrabold block">
                        {isRtl ? "عرض ومقارنة التفاصيل ←" : "View Details ←"}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </article>
        ) : activeGuide ? (
          <article className="animate-fade space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-right rtl:text-right ltr:text-left">
            {/* Top Back Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <button
                onClick={goBackToHome}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs cursor-pointer transition-all"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isRtl ? "العودة إلى المعرض الرئيسي" : "Back to Home"}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs font-bold">{isRtl ? "رابط المقال:" : "Article link:"}</span>
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-mono py-1 px-2.5 rounded-lg w-40 sm:w-60 focus:outline-none"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToastNotification(isRtl ? "تم نسخ رابط المقال بنجاح!" : "Article link copied successfully!");
                  }}
                  className="text-xs font-black text-emerald-600 hover:text-emerald-800"
                >
                  {isRtl ? "نسخ" : "Copy"}
                </button>
              </div>
            </div>

            {/* Guide Header */}
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                {activeGuide.icon === "shoes" ? (
                  <Footprints className="w-6 h-6" />
                ) : (
                  <Dumbbell className="w-6 h-6" />
                )}
              </div>
              
              <h1 className="text-xl sm:text-3xl font-black text-slate-950 leading-tight">
                {isRtl ? activeGuide.titleAr : activeGuide.titleEn}
              </h1>

              <p className="text-xs text-slate-400 font-bold flex items-center gap-2">
                <span>📅 المحدث لعام ٢٠٢٦</span>
                <span>•</span>
                <span>بمراجعة كبار المدربين والمختصين</span>
              </p>
            </div>

            {/* Guide Body Content */}
            <div className="border-t border-slate-100 pt-6">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
                {isRtl ? activeGuide.contentAr : activeGuide.contentEn}
              </p>
            </div>

            {/* Quick affiliate suggestion query block */}
            <div className="bg-emerald-50/30 border border-emerald-500/10 p-6 rounded-2xl space-y-4">
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                {isRtl ? "💡 عروض وتجهيزات مطابقة مباشرة من أمازون:" : "💡 Match Equipment Searches on Amazon:"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isRtl 
                  ? "بناءً على التوصيات الواردة في الدليل الرياضي، يمكنك استعراض أفضل عروض الشراء المتوفرة على أمازون بنقرة واحدة سريعة لمطابقة روتين تمرينك المفضل."
                  : "Based on the recommendations in this sports guide, you can search for and browse corresponding gear and accessories immediately."}
              </p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={activeGuide.icon === "shoes" ? "https://www.amazon.com/s?k=Running+Shoes&tag=sportzoneaff-20" : "https://www.amazon.com/s?k=Resistance+Bands&tag=sportzoneaff-20"}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>{isRtl ? "تصفح أفضل الترشيحات على أمازون" : "Browse Top Recommendations on Amazon"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Recommended products from same category */}
            <div className="pt-8 border-t border-slate-100 space-y-6">
              <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Trophy className="w-4.5 h-4.5 text-emerald-600" />
                {isRtl ? "منتجات ننصح بها ومطابقة لمحتوى المقال:" : "Recommended Gear Related to This Guide:"}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {PRODUCTS_DATA.filter((p) => p.category === activeGuide.icon)
                  .slice(0, 4)
                  .map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => openProductPage(prod)}
                      className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 hover:border-emerald-500 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="aspect-square rounded-lg overflow-hidden bg-white border border-slate-150">
                          <img src={prod.image} alt={prod.titleAr} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-[11px] font-black text-slate-950 line-clamp-1">
                          {isRtl ? prod.titleAr : prod.titleEn}
                        </h4>
                      </div>
                      <span className="text-[9px] text-emerald-600 font-extrabold block">
                        {isRtl ? "معاينة المنتج والتفاصيل ←" : "View Details ←"}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </article>
        ) : (
          <>
            {/* Dynamic Marketing Hero Intro */}
            <section className="mb-10 text-center relative py-12 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=50" 
                  alt="Stadium background" 
                  className="w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
              </div>
              <div className="relative max-w-3xl mx-auto px-4 space-y-4">
                <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-black tracking-wider uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {isRtl ? "مراجعات وتوجيهات شرائية ذكية لعام ٢٠٢٦" : "Smart Purchase Reviews & Guides 2026"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  {isRtl 
                    ? "أفضل الملابس والمعدات الرياضية بضغطة زر واحدة" 
                    : "Top-Tier Premium Athletic Footwear & Gear"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  {isRtl
                    ? "دليل منسق بعناية يجمع لك أفضل المنتجات وأعلاها تقييماً على أمازون. وفر وقتك في البحث واطلع على تفاصيل المنتج والخصائص لتصل لأفضل قرار شراء فوري."
                    : "A carefully curated catalogue highlighting Amazon's highest-rated sports apparel and gear. Skip the endless searching and make informed buying decisions instantly."}
                </p>
              </div>
            </section>

            {/* Categories Tab Selector */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  {isRtl ? "تصفح الفئات الكبرى:" : "Browse Main Categories:"}
                </h3>
                {/* Sorting controls */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-bold hidden sm:inline">{isRtl ? "ترتيب حسب:" : "Sort by:"}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-slate-200 text-[10px] sm:text-xs rounded-lg py-1 px-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="rating">{isRtl ? "الأعلى تقييماً" : "Highest Rated"}</option>
                    <option value="reviews">{isRtl ? "الأكثر مراجعة" : "Most Reviews"}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* All Category Tab */}
                <button
                  onClick={() => { setSelectedCategory("all"); setSelectedTag("all"); }}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10"
                      : "bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-slate-50/50"
                  }`}
                >
                  <div>
                    <p className={`text-[10px] font-bold ${selectedCategory === "all" ? "text-slate-400" : "text-slate-500"}`}>
                      {isRtl ? "شاهد كل شيء" : "View Everything"}
                    </p>
                    <h4 className="text-xs sm:text-sm font-black mt-0.5">{isRtl ? "جميع المنتجات" : "All Products"}</h4>
                  </div>
                  <Grid className={`w-5 h-5 shrink-0 ${selectedCategory === "all" ? "text-emerald-400" : "text-slate-400"}`} />
                </button>

                {/* Shoes Category Tab */}
                <button
                  onClick={() => { setSelectedCategory("shoes"); setSelectedTag("all"); }}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === "shoes"
                      ? "bg-emerald-650 text-white border-emerald-600 shadow-md shadow-emerald-600/10"
                      : "bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-slate-50/50"
                  }`}
                >
                  <div>
                    <p className={`text-[10px] font-bold ${selectedCategory === "shoes" ? "text-emerald-200" : "text-slate-500"}`}>
                      {isRtl ? "أحذية جري وملاعب" : "Athletic Footwear"}
                    </p>
                    <h4 className="text-xs sm:text-sm font-black mt-0.5">{isRtl ? "أحذية رياضية" : "Sports Shoes"}</h4>
                  </div>
                  <Footprints className={`w-5 h-5 shrink-0 ${selectedCategory === "shoes" ? "text-white" : "text-slate-400"}`} />
                </button>

                {/* Apparel Category Tab */}
                <button
                  onClick={() => { setSelectedCategory("apparel"); setSelectedTag("all"); }}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === "apparel"
                      ? "bg-emerald-650 text-white border-emerald-600 shadow-md shadow-emerald-600/10"
                      : "bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-slate-50/50"
                  }`}
                >
                  <div>
                    <p className={`text-[10px] font-bold ${selectedCategory === "apparel" ? "text-emerald-200" : "text-slate-500"}`}>
                      {isRtl ? "مضادة للتعرق ومريحة" : "Active Apparel"}
                    </p>
                    <h4 className="text-xs sm:text-sm font-black mt-0.5">{isRtl ? "ملابس تمرين" : "Sports Apparel"}</h4>
                  </div>
                  <Shirt className={`w-5 h-5 shrink-0 ${selectedCategory === "apparel" ? "text-white" : "text-slate-400"}`} />
                </button>

                {/* Equipment Category Tab */}
                <button
                  onClick={() => { setSelectedCategory("equipment"); setSelectedTag("all"); }}
                  className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === "equipment"
                      ? "bg-emerald-650 text-white border-emerald-600 shadow-md shadow-emerald-600/10"
                      : "bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-slate-50/50"
                  }`}
                >
                  <div>
                    <p className={`text-[10px] font-bold ${selectedCategory === "equipment" ? "text-emerald-200" : "text-slate-500"}`}>
                      {isRtl ? "أدوات كارديو وجيم" : "Fitness Equipment"}
                    </p>
                    <h4 className="text-xs sm:text-sm font-black mt-0.5">{isRtl ? "معدات وأدوات" : "Sports Equipment"}</h4>
                  </div>
                  <Dumbbell className={`w-5 h-5 shrink-0 ${selectedCategory === "equipment" ? "text-white" : "text-slate-400"}`} />
                </button>
              </div>
            </section>

            {/* Tags Sub-Filter Pills */}
            {availableTags.length > 0 && (
              <section className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-[10px] text-slate-500 font-extrabold shrink-0">
                  {isRtl ? "فلاتر سريعة:" : "Quick Tags:"}
                </span>
                <button
                  onClick={() => setSelectedTag("all")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                    selectedTag === "all"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {isRtl ? "الكل" : "All"}
                </button>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all shrink-0 ${
                      selectedTag === tag
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </section>
            )}

            {/* Interactive Products Grid */}
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Grid className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isRtl ? "المنتجات الرياضية المقترحة:" : "Recommended Sports Gear:"}
                  </span>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                    {filteredProducts.length}
                  </span>
                </h3>
                {(searchQuery || selectedCategory !== "all" || selectedTag !== "all") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedTag("all");
                    }}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    {isRtl ? "إعادة تعيين الفلاتر" : "Reset Filters"}
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto space-y-4 shadow-sm">
                  <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-900">
                      {isRtl ? "عذراً! لم نجد أي نتائج مطابقة" : "No matching items found"}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto px-4 leading-relaxed">
                      {isRtl 
                        ? "جرّب تغيير كلمات البحث أو اختر فئة أخرى وتصفح مجموعة المنتجات مجدداً." 
                        : "Try adjusting your search queries or browse a different sport product category."}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedTag("all");
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {isRtl ? "عرض جميع المنتجات" : "View All Products"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((prod) => {
                    const isFavorite = wishlist.includes(prod.id);
                    const badgeText = isRtl ? prod.badgeAr : prod.badgeEn;
                    const subTitleText = isRtl ? prod.subCategoryAr : prod.subCategoryEn;
                    const titleText = isRtl ? prod.titleAr : prod.titleEn;
                    const descriptionText = isRtl ? prod.descriptionAr : prod.descriptionEn;
                    const tags = isRtl ? prod.tagsAr : prod.tagsEn;

                    return (
                      <div
                        key={prod.id}
                        onClick={() => openProductPage(prod)}
                        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                      >
                        {/* Card Media Header */}
                        <div className="relative aspect-square w-full bg-slate-100 overflow-hidden shrink-0">
                          
                          {/* Badge Overlays */}
                          {badgeText && (
                            <span className="absolute top-3 right-3 z-10 text-[9px] font-black px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                              <Trophy className="w-3.5 h-3.5 text-white" />
                              <span>{badgeText}</span>
                            </span>
                          )}

                          {/* Wishlist Button Overlay */}
                          <button
                            onClick={(e) => toggleWishlist(prod.id, e)}
                            className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-slate-400 hover:text-red-500 shadow-sm transition-colors cursor-pointer"
                            title={isRtl ? "حفظ في المفضلة" : "Save to Wishlist"}
                          >
                            <Heart className={`w-4 h-4 transition-all ${isFavorite ? "fill-red-500 text-red-500 scale-110" : ""}`} />
                          </button>

                          {/* Fallback & Image */}
                          <img
                            src={prod.image}
                            alt={titleText}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              // fallback image if unsplash link fails
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80";
                            }}
                          />
                          
                          {/* Dark Overlay view trigger */}
                          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white/95 text-slate-900 font-extrabold text-[10px] px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              <Compass className="w-3.5 h-3.5 text-emerald-600" />
                              {isRtl ? "معاينة التفاصيل" : "Quick View"}
                            </span>
                          </div>
                        </div>

                        {/* Card Content body */}
                        <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            {/* Subtitle */}
                            <p className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-wider">
                              {subTitleText}
                            </p>

                            {/* Ratings */}
                            <div className="flex items-center gap-1 text-[10px]">
                              <div className="flex items-center text-amber-400">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              </div>
                              <span className="font-extrabold text-slate-800">{prod.rating}</span>
                              <span className="text-slate-400 font-medium">({prod.reviewsCount})</span>
                            </div>

                            {/* Main Title */}
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                              {titleText}
                            </h4>

                            {/* Marketing Description */}
                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                              {descriptionText}
                            </p>
                          </div>

                          {/* Tags & Action Row */}
                          <div className="space-y-3 pt-2 border-t border-slate-100">
                            {/* Tags list */}
                            <div className="flex flex-wrap gap-1">
                              {tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* NO STATIC PRICE ACCORDING TO RULE 4. ALWAYS SHOW AFFILIATE CTA */}
                            <div className="pt-1">
                              <a
                                href={prod.amazonUrl}
                                target="_blank"
                                rel="sponsored noopener noreferrer"
                                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-[10px] sm:text-xs text-center flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 group/btn"
                              >
                                <span>{isRtl ? "تحقق من السعر والتفاصيل على أمازون" : "Check Price & Details on Amazon"}</span>
                                <ExternalLink className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5 transition-transform" />
                              </a>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Informative Sports Guides and Recommendations */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 text-[9px] font-black tracking-wider uppercase rounded-full bg-slate-100 text-slate-600 border border-slate-200 mb-2">
                  {isRtl ? "مقالات ودراسات مفيدة" : "Useful Sports Knowledge"}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
                  {isRtl ? "دليلك الذكي للشراء والاختيار الصحيح:" : "Our Guides for Smart Purchasing Selection:"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {isRtl
                    ? "اقرأ إرشاداتنا المجانية والمعدة من قبل مدربين رياضيين لتتعلم كيف تختار المقاسات المثالية وتؤسس صالتك الرياضية المنزلية بأعلى جودة وكفاءة."
                    : "Read our free, trainer-reviewed fitness advice to help you select perfect equipment and find accurate sports sizes without overpaying."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GUIDES_DATA.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => openGuidePage(guide)}
                    className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-500/30 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        {guide.icon === "shoes" ? (
                          <Footprints className="w-4.5 h-4.5" />
                        ) : (
                          <Dumbbell className="w-4.5 h-4.5" />
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {isRtl ? guide.titleAr : guide.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {isRtl ? guide.excerptAr : guide.excerptEn}
                      </p>
                    </div>
                    
                    <div className="pt-3 flex items-center justify-between text-[11px] font-black text-emerald-600">
                      <span>{isRtl ? "اقرأ الدليل بالكامل" : "Read Full Guide"}</span>
                      <div className="flex items-center gap-1">
                        {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* COMPACT FLOATING FOOTER */}
      <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 z-10">
        
        {/* Amazon Program Affiliation Full Legal Notice */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 select-none">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-black text-white">{isRtl ? "سبورت زون" : "SportZone"}</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isRtl
                ? "منصة تسويق مستقلة تعرض ترشيحات ومراجعات ذكية للملابس والمعدات الرياضية المتوفرة على متجر أمازون العالمي، لمساعدتك في بناء نمط حياة صحي ونشيط."
                : "An independent product reviews platform displaying premium recommended sports gear available on Amazon Global, helping you build an active and healthy lifestyle."}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs">{isRtl ? "إخلاء مسؤولية قانونية" : "Legal Disclaimer"}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isRtl
                ? "أمازون وشعار أمازون هي علامات تجارية مسجلة لموقع Amazon.com أو الشركات التابعة له. الأسعار وتوفر المخزون والعروض تدار بشكل حصري من أمازون وتتغير باستمرار، لذا ننصح دائماً بالضغط على زر الفحص للتأكد من الحالة المحدثة في لحظتها."
                : "Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. All product prices, stock availability, and dynamic discounts are exclusively governed by Amazon and are subject to immediate changes."}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs">{isRtl ? "روابط مفيدة" : "Useful Shortcuts"}</h4>
            <ul className="space-y-1 text-[11px] font-bold">
              <li>
                <a 
                  href="https://www.amazon.com/s?k=Sports+Shoes&tag=sportzoneaff-20" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isRtl ? "🛒 تصفح الأحذية الرياضية على أمازون" : "🛒 Browse Sports Shoes on Amazon"}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.amazon.com/s?k=Workout+Apparel&tag=sportzoneaff-20" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isRtl ? "🛒 تصفح ملابس التمرين على أمازون" : "🛒 Browse Workout Apparel on Amazon"}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.amazon.com/s?k=Home+Gym+Equipment&tag=sportzoneaff-20" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  {isRtl ? "🛒 تصفح أدوات الجيم على أمازون" : "🛒 Browse Gym Tools on Amazon"}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="w-full border-t border-slate-800 py-4 px-4 text-center text-[10px] text-slate-500 font-medium">
          <p>
            {isRtl 
              ? "سبورت زون © لعام ٢٠٢٦. جميع الحقوق محفوظة كلياً." 
              : "SportZone © 2026. All rights reserved."}
          </p>
        </div>
      </footer>



      {/* WISHLIST SIDEBAR SAVES DRAWER */}
      {showWishlistDrawer && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex justify-end animate-fade"
          onClick={() => setShowWishlistDrawer(false)}
        >
          <div 
            className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between relative animate-fade-in"
            dir={isRtl ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 text-slate-950 font-black text-sm">
                <Heart className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
                <span>
                  {isRtl ? "المنتجات الرياضية المحفوظة:" : "Saved Sports Gear:"}
                </span>
                <span className="text-xs bg-red-100 text-red-750 px-2 py-0.5 rounded-full font-black">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={() => setShowWishlistDrawer(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer transition-colors"
                title={isRtl ? "إغلاق" : "Close"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Wishlist Items List scroll */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-3">
                  <Heart className="w-10 h-10 text-slate-200 mx-auto" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-slate-800">
                      {isRtl ? "قائمة الحفظ فارغة حالياً" : "Your saved list is empty"}
                    </h5>
                    <p className="text-[10px] text-slate-400 max-w-xs mx-auto px-4">
                      {isRtl 
                        ? "تصفح المنتجات الرياضية المتميزة واضغط على زر القلب لحفظها هنا لمقارنتها لاحقاً." 
                        : "Tap the heart on any product card to save them here for easy reference."}
                    </p>
                  </div>
                </div>
              ) : (
                wishlist.map((id) => {
                  const prod = PRODUCTS_DATA.find((p) => p.id === id);
                  if (!prod) return null;
                  
                  return (
                    <div 
                      key={prod.id}
                      onClick={() => { openProductPage(prod); setShowWishlistDrawer(false); }}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-500/30 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group"
                    >
                      <div className="w-14 h-14 bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                        <img 
                          src={prod.image} 
                          alt={isRtl ? prod.titleAr : prod.titleEn} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow min-w-0 space-y-1 text-right rtl:text-right ltr:text-left">
                        <span className="text-[8px] bg-slate-200 text-slate-750 px-1 rounded uppercase font-extrabold">
                          {isRtl ? prod.subCategoryAr : prod.subCategoryEn}
                        </span>
                        <h5 className="text-[11px] font-black text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                          {isRtl ? prod.titleAr : prod.titleEn}
                        </h5>
                        
                        <div className="flex items-center justify-between text-[9px] pt-1">
                          {/* Rating */}
                          <div className="flex items-center gap-0.5 text-slate-600 font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                            <span>{prod.rating}</span>
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id); }}
                            className="text-red-500 hover:text-red-700 font-bold flex items-center gap-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>{isRtl ? "إزالة" : "Remove"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Wishlist Drawer Footer actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
              {wishlist.length > 0 && (
                <>
                  <a
                    href="https://www.amazon.com/s?k=Sports+and+Outdoors+Equipments&tag=sportzoneaff-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-650 hover:bg-emerald-700 text-white rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5 shadow-sm transition-colors group/all-btn"
                  >
                    <span>{isRtl ? "تسوق المزيد من التجهيزات على أمازون" : "Shop More Gear on Amazon"}</span>
                    <ExternalLink className="w-3.5 h-3.5 transform group-all-btn:translate-x-0.5 rtl:group-all-btn:-translate-x-0.5 transition-transform" />
                  </a>
                  
                  <button
                    onClick={clearWishlist}
                    className="w-full py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-[10px] font-black text-center flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isRtl ? "مسح كل المحفوظات" : "Clear All Favorites"}</span>
                  </button>
                </>
              )}
              
              <button
                onClick={() => setShowWishlistDrawer(false)}
                className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-black text-center cursor-pointer hover:bg-slate-800 transition-colors"
              >
                {isRtl ? "العودة للمتجر" : "Return to Store"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* GLOBAL breve TOAST TOASTER ALERT */}
      {toast.show && (
        <div 
          className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs px-4.5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-800 animate-fade-in"
          style={{ direction: isRtl ? "rtl" : "ltr" }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

    </div>
  );
}
