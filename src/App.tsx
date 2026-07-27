import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroSearch } from "./components/HeroSearch";
import { CategoryGrid } from "./components/CategoryGrid";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { ComparisonView } from "./components/ComparisonView";
import { BuyingGuidesView } from "./components/BuyingGuidesView";
import { DealsView } from "./components/DealsView";
import { ArticlesView } from "./components/ArticlesView";
import { AdminDashboard } from "./components/AdminDashboard";
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
import { Product, Currency } from "./types";
import { Filter, Sparkles, Award, ShoppingBag, Layers, SearchX } from "lucide-react";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState<Currency>("EGP");
  const [isAdmin, setIsAdmin] = useState(false);

  // Dynamic state arrays
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories] = useState(CATEGORIES);
  const [comparisons] = useState(COMPARISONS);
  const [buyingGuides] = useState(BUYING_GUIDES);
  const [deals] = useState(DEALS);
  const [articles] = useState(ARTICLES);

  // Modals
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [schemaProduct, setSchemaProduct] = useState<Product | null>(null);

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
              onSelectCategory={(catId) => setSelectedCategory(catId)}
              isDarkMode={isDarkMode}
            />

            {/* Buying Guides Feature Banner */}
            <BuyingGuidesView
              guides={buyingGuides}
              products={products}
              onSelectProduct={(prod) => setDetailProduct(prod)}
              isDarkMode={isDarkMode}
            />

            {/* Main Products Listing Section (Wirecutter Style) */}
            <section className="space-y-6">
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
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setActiveView("home");
              }}
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
            setProducts={setProducts}
            categories={categories}
            deals={deals}
            articles={articles}
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
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
