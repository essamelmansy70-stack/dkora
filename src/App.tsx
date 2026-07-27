import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSearch } from "./components/HeroSearch";
import { CategoryGrid } from "./components/CategoryGrid";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { ComparisonView } from "./components/ComparisonView";
import { LegalView, LegalPageType } from "./components/LegalView";
import { DealsView } from "./components/DealsView";
import { ArticlesView } from "./components/ArticlesView";
import { AdminDashboard } from "./components/AdminDashboard";
import { SitemapView } from "./components/SitemapView";
import { SeoSchemaModal } from "./components/SeoSchemaModal";
import { FaqSection } from "./components/FaqSection";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";

import {
  CATEGORIES,
  PRODUCTS,
  COMPARISONS,
  BUYING_GUIDES,
  DEALS,
  ARTICLES
} from "./data/mockData";
import { createProductSlug, createProductUrl, findProductByQueryParam } from "./utils/seo";
import { Product, Currency, Article } from "./types";
import { Filter, Sparkles, Award, ShoppingBag, Layers, SearchX } from "lucide-react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState<Currency>("EGP");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(true);

  // Check secret URL param or saved local key on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlView = params.get("view");
      const isAdminQuery = params.has("admin") || params.has("secret") || urlView === "admin";
      const isSavedUnlocked = localStorage.getItem("dkora_admin_unlocked") === "true";

      if (isAdminQuery || isSavedUnlocked) {
        setShowAdminButton(true);
        localStorage.setItem("dkora_admin_unlocked", "true");
        if (urlView === "admin" || params.get("admin") === "true") {
          setActiveView("admin");
          setIsAdmin(true);
        }
      }
    }
  }, []);

  // Dynamic state arrays with Server API & LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dkora_custom_products");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load saved products", e);
        }
      }
    }
    return PRODUCTS;
  });

  // Fetch products from server on mount
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          localStorage.setItem("dkora_custom_products", JSON.stringify(data));
        }
      })
      .catch((err) => console.log("Serving offline or fallback mode:", err));
  }, []);

  // Sync products to Server and LocalStorage when modified
  const handleSetProducts = (action: React.SetStateAction<Product[]>) => {
    setProducts((prev) => {
      const updated = typeof action === "function" ? action(prev) : action;
      if (typeof window !== "undefined") {
        localStorage.setItem("dkora_custom_products", JSON.stringify(updated));
      }
      fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }).catch((err) => console.error("Error syncing to server:", err));
      return updated;
    });
  };

  const [categories] = useState(CATEGORIES);
  const [comparisons] = useState(COMPARISONS);
  const [buyingGuides] = useState(BUYING_GUIDES);
  const [deals] = useState(DEALS);
  const [articles] = useState(ARTICLES);

  // Modals
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [schemaProduct, setSchemaProduct] = useState<Product | null>(null);
  const [editingProductTarget, setEditingProductTarget] = useState<Product | null>(null);

  // Articles state for independent routing
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Parse location pathname & search to set state accordingly
  const syncStateFromUrl = () => {
    if (typeof window === "undefined") return;

    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    // 1. Article Page Route (/article/:slug or ?article=:slug)
    const articleParam = params.get("article");
    if (path.startsWith("/article/") || (articleParam && articleParam !== "all")) {
      const slug = path.startsWith("/article/") ? path.replace("/article/", "").trim() : articleParam;
      const foundArt = articles.find((a) => a.slug === slug || a.id === slug);
      if (foundArt) {
        setSelectedArticle(foundArt);
        setActiveView("articles");
        return;
      }
    }

    // 2. Articles List Route (/articles or ?article=all or ?view=articles)
    if (path === "/articles" || articleParam === "all" || params.get("view") === "articles") {
      setActiveView("articles");
      setSelectedArticle(null);
      return;
    }

    // 3. Product Page Route (/product/:id-slug or ?product=:id)
    const prodParam = params.get("product") || params.get("p") || params.get("slug");
    const keywordParam = params.get("keyword") || params.get("q");
    if (path.startsWith("/product/") || prodParam || keywordParam) {
      const targetId = path.startsWith("/product/") ? path.replace("/product/", "").trim() : prodParam;
      if (targetId || keywordParam) {
        const foundProd = findProductByQueryParam(products, targetId || "", keywordParam || "");
        if (foundProd) {
          setDetailProduct(foundProd);
        }
      }
    } else {
      setDetailProduct(null);
    }

    // 4. View Routes
    if (path === "/categories" || params.get("view") === "categories") {
      setActiveView("categories");
    } else if (path.startsWith("/category/")) {
      const catId = path.replace("/category/", "").trim();
      setSelectedCategory(catId);
      setActiveView("home");
      if (typeof window !== "undefined") {
        setTimeout(() => {
          const el = document.getElementById("products-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (path === "/comparisons" || params.get("view") === "comparisons") {
      setActiveView("comparisons");
    } else if (path === "/deals" || params.get("view") === "deals") {
      setActiveView("deals");
    } else if (path === "/sitemap" || params.get("view") === "sitemap") {
      setActiveView("sitemap");
    } else if (path === "/privacy" || params.get("view") === "privacy") {
      setActiveView("privacy");
    } else if (path === "/terms" || params.get("view") === "terms") {
      setActiveView("terms");
    } else if (path === "/about" || params.get("view") === "about") {
      setActiveView("about");
    } else if (path === "/contact" || params.get("view") === "contact") {
      setActiveView("contact");
    } else if (path === "/disclaimer" || params.get("view") === "disclaimer") {
      setActiveView("disclaimer");
    } else if (path === "/admin" || params.get("view") === "admin") {
      setActiveView("admin");
      setIsAdmin(true);
    } else if (path === "/") {
      if (!params.get("view") && !params.get("product")) {
        setActiveView("home");
      }
    }
  };

  // Sync state on mount & handle browser Back/Forward navigation (popstate)
  useEffect(() => {
    syncStateFromUrl();

    const handlePopState = () => {
      syncStateFromUrl();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [products, articles]);

  // Navigate helper to update browser URL bar cleanly as an independent page
  const navigateToPage = (
    path: string,
    targetView?: string,
    catId?: string | null,
    art?: Article | null,
    prod?: Product | null
  ) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname !== path) {
        window.history.pushState({}, "", path);
      }
    }
    if (targetView !== undefined) setActiveView(targetView);
    if (catId !== undefined) setSelectedCategory(catId);
    if (art !== undefined) setSelectedArticle(art);
    if (prod !== undefined) setDetailProduct(prod);
  };

  // Helper for selecting category, switching to home view, updating URL, and scrolling to products
  const handleCategorySelect = (catId: string | null) => {
    setSelectedCategory(catId);
    setActiveView("home");
    const targetUrl = catId ? `/category/${catId}` : "/";
    if (typeof window !== "undefined") {
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({}, "", targetUrl);
      }
      setTimeout(() => {
        const el = document.getElementById("products-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  };

  // Sync document title and canonical tag
  useEffect(() => {
    if (typeof window === "undefined") return;

    let canonicalEl = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }

    if (detailProduct) {
      document.title = `${detailProduct.titleAr} - ${detailProduct.brandName} | ديكورا Dkora`;
      const expectedUrl = `${window.location.origin}/product/${detailProduct.id}-${createProductSlug(detailProduct)}`;
      canonicalEl.href = expectedUrl;
      if (window.location.pathname !== `/product/${detailProduct.id}-${createProductSlug(detailProduct)}`) {
        window.history.pushState({ product: detailProduct.id }, "", expectedUrl);
      }
    } else if (selectedArticle) {
      document.title = `${selectedArticle.title} | ديكورا Dkora`;
      const expectedUrl = `${window.location.origin}/article/${selectedArticle.slug}`;
      canonicalEl.href = expectedUrl;
      if (window.location.pathname !== `/article/${selectedArticle.slug}`) {
        window.history.pushState({ article: selectedArticle.slug }, "", expectedUrl);
      }
    } else if (activeView === "articles") {
      document.title = "مدونة ديكورا - دروس الصيانة ودليل اختيار العدد | Dkora";
      canonicalEl.href = `${window.location.origin}/articles`;
    } else if (activeView === "categories") {
      document.title = "تصنيفات العدد والأدوات والديكور | ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/categories`;
    } else if (activeView === "comparisons") {
      document.title = "أداة مقارنة العدد والأدوات الفنية جنباً إلى جنب | ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/comparisons`;
    } else if (activeView === "deals") {
      document.title = "أحدث عروض وكوبونات خصم العدد والأدوات | ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/deals`;
    } else if (activeView === "sitemap") {
      document.title = "خريطة الموقع التفاعلية (Dynamic XML Sitemap) | ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/sitemap`;
    } else if (activeView === "privacy") {
      document.title = "سياسة الخصوصية وسرية البيانات | منصة ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/privacy`;
    } else if (activeView === "terms") {
      document.title = "الشروط والأحكام وسياسة الاستخدام | منصة ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/terms`;
    } else if (activeView === "about") {
      document.title = "من نحن - عن منصة ديكورا Dkora لدليل العدد والأدوات";
      canonicalEl.href = `${window.location.origin}/about`;
    } else if (activeView === "contact") {
      document.title = "اتصل بنا ومعلومات هيئة التحرير | منصة ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/contact`;
    } else if (activeView === "disclaimer") {
      document.title = "إخلاء المسؤولية وإفصاح التسويق بالعمولة | منصة ديكورا Dkora";
      canonicalEl.href = `${window.location.origin}/disclaimer`;
    } else {
      document.title = "ديكورا Dkora - دليلك الشامل لعدد ولوازم ديكورات احترافية";
      canonicalEl.href = `${window.location.origin}/`;
    }
  }, [detailProduct, selectedArticle, activeView]);

  const handleEditProduct = (prod: Product) => {
    setEditingProductTarget(prod);
    setActiveView("admin");
  };

  // Sorting and Filtering
  const [sortBy, setSortBy] = useState<"score" | "rating" | "priceAsc" | "priceDesc">("score");

  // Apply body dark class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    // Category Filter
    if (selectedCategory && p.categoryId !== selectedCategory) return false;

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = p.titleAr.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q);
      const matchBrand = p.brandName.toLowerCase().includes(q);
      const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchBrand && !matchTag) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "score") return b.editorScore - a.editorScore;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "priceAsc") return (a.priceAmazon || 0) - (b.priceAmazon || 0);
    if (sortBy === "priceDesc") return (b.priceAmazon || 0) - (a.priceAmazon || 0);
    return 0;
  });

  const selectedCatObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
      dir="rtl"
    >
      {/* Top Main Navigation Header */}
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currency={currency}
        setCurrency={setCurrency}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        showAdminButton={showAdminButton}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: HOME PAGE */}
        {activeView === "home" && (
          <div className="space-y-10">
            {/* Hero Search Box */}
            <HeroSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              products={products}
              onSelectProduct={(prod) => setDetailProduct(prod)}
              isDarkMode={isDarkMode}
            />

            {/* 12 Categories Grid */}
            <CategoryGrid
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              isDarkMode={isDarkMode}
            />

            {/* Main Products Listing Section (Wirecutter Style) */}
            <section id="products-section" className="space-y-6 pt-2 scroll-mt-24">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-500" />
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      {selectedCatObj ? `مراجعات قسم: ${selectedCatObj.nameAr}` : "أحدث المراجعات والتوصيات الميدانية"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    نتائج الاختبارات والتقييمات الفنية مرتبة حسب جودة الأداء والقيمة مقابل السعر
                  </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs font-bold">
                  <Filter className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-400">ترتيب حسب:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold focus:outline-none"
                  >
                    <option value="score">تقييم المحرر (الأعلى أولاً)</option>
                    <option value="rating">تقييم المستخدمين (النجوم)</option>
                    <option value="priceAsc">السعر: من الأقل للأعلى</option>
                    <option value="priceDesc">السعر: من الأعلى للأقل</option>
                  </select>
                </div>
              </div>

              {/* Products Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                  <SearchX className="w-12 h-12 text-slate-600 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-200">لم نجد منتجات تطابق بحثك</h3>
                  <p className="text-slate-400 text-xs">جرب البحث بكلمات أخرى أو اختر تصنيف مختلف.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      currency={currency}
                      onSelectProduct={(prod) => setDetailProduct(prod)}
                      onCompareSelect={() => setActiveView("comparisons")}
                      onEditProduct={handleEditProduct}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Flash Deals View */}
            <DealsView deals={deals} currency={currency} isDarkMode={isDarkMode} />

            {/* Articles Blog View */}
            <ArticlesView articles={articles} isDarkMode={isDarkMode} />

            {/* FAQs Accordion */}
            <FaqSection isDarkMode={isDarkMode} />

            {/* Newsletter Subscription */}
            <Newsletter isDarkMode={isDarkMode} />
          </div>
        )}

        {/* VIEW 2: CATEGORIES ONLY */}
        {activeView === "categories" && (
          <div className="space-y-8">
            <CategoryGrid
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

        {/* VIEW 3: COMPARISONS TOOL */}
        {activeView === "comparisons" && (
          <ComparisonView
            products={products}
            comparisons={comparisons}
            currency={currency}
            isDarkMode={isDarkMode}
          />
        )}

        {/* VIEW 4: DEALS ONLY */}
        {activeView === "deals" && (
          <DealsView deals={deals} currency={currency} isDarkMode={isDarkMode} />
        )}

        {/* VIEW 5: ARTICLES ONLY */}
        {activeView === "articles" && (
          <ArticlesView articles={articles} isDarkMode={isDarkMode} />
        )}

        {/* VIEW 6: ADMIN DASHBOARD */}
        {activeView === "admin" && (
          <AdminDashboard
            products={products}
            setProducts={handleSetProducts}
            categories={categories}
            deals={deals}
            articles={articles}
            isDarkMode={isDarkMode}
            editingProductTarget={editingProductTarget}
            onProductAdded={() => {
              setSelectedCategory(null);
              setSearchQuery("");
              setEditingProductTarget(null);
            }}
          />
        )}

        {/* VIEW 7: DYNAMIC INTERACTIVE SITEMAP */}
        {activeView === "sitemap" && (
          <SitemapView
            products={products}
            onSelectProduct={(prod) => setDetailProduct(prod)}
            onSelectCategory={handleCategorySelect}
            onNavigateToView={(view) => setActiveView(view)}
            isDarkMode={isDarkMode}
          />
        )}

        {/* VIEW 8: LEGAL PAGES (AdSense Compliant) */}
        {["privacy", "terms", "about", "contact", "disclaimer"].includes(activeView) && (
          <LegalView
            page={activeView as LegalPageType}
            onNavigate={(p) => navigateToPage(`/${p}`, p)}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        currency={currency}
        onOpenSchema={(prod) => setSchemaProduct(prod)}
        onCompareSelect={() => setActiveView("comparisons")}
        onEditProduct={handleEditProduct}
        isDarkMode={isDarkMode}
      />

      {/* SEO Schema Inspector Modal */}
      <SeoSchemaModal
        product={schemaProduct}
        onClose={() => setSchemaProduct(null)}
        isDarkMode={isDarkMode}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategorySelect}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        showAdminButton={showAdminButton}
      />
    </div>
  );
}
