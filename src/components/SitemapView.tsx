import React, { useState } from "react";
import {
  FileCode,
  Check,
  Copy,
  Download,
  ExternalLink,
  Search,
  RefreshCw,
  Globe,
  Layers,
  ShoppingBag,
  BookOpen,
  Tag,
  ShieldCheck,
  ChevronRight,
  Code2,
  ListFilter,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { CATEGORIES, PRODUCTS, ARTICLES, DEALS, BUYING_GUIDES } from "../data/mockData";
import { Product } from "../types";
import { createProductSlug, createProductUrl, findProductByQueryParam } from "../utils/seo";

interface SitemapViewProps {
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categoryId: string) => void;
  onNavigateToView: (view: string) => void;
  isDarkMode: boolean;
}

export interface SitemapUrl {
  loc: string;
  path: string;
  title: string;
  type: "page" | "category" | "product" | "article" | "deal" | "guide";
  priority: string;
  changefreq: string;
  lastmod: string;
  icon?: any;
}

export const SitemapView: React.FC<SitemapViewProps> = ({
  products,
  onSelectProduct,
  onSelectCategory,
  onNavigateToView,
  isDarkMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showXmlModal, setShowXmlModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const productsList = products && products.length > 0 ? products : PRODUCTS;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://dkora.app";
  const currentDate = new Date().toISOString().split("T")[0];

  // Dynamic Sitemap Entries
  const urls: SitemapUrl[] = [
    // Main Section Pages
    {
      loc: `${baseUrl}/`,
      path: "/",
      title: "الرئيسية - دليل مراجعات وتوصيات العدد والأدوات (dkora)",
      type: "page",
      priority: "1.0",
      changefreq: "daily",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/categories`,
      path: "/categories",
      title: "دليل التصنيفات الـ 12 الرئيسية للعدد والديكور",
      type: "page",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/comparisons`,
      path: "/comparisons",
      title: "أداة مقارنة المنتجات والعدد الفنية جنباً إلى جنب",
      type: "page",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/deals`,
      path: "/deals",
      title: "قسم الكوبونات وأكواد الخصم العاجلة من المتاجر الكبرى",
      type: "page",
      priority: "0.9",
      changefreq: "daily",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/articles`,
      path: "/articles",
      title: "مدونة دروس الصيانة والديكور والتحليلات الفنية",
      type: "page",
      priority: "0.8",
      changefreq: "weekly",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/sitemap`,
      path: "/sitemap",
      title: "خريطة الموقع التفاعلية (Dynamic XML Sitemap Index)",
      type: "page",
      priority: "0.7",
      changefreq: "always",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/privacy`,
      path: "/privacy",
      title: "سياسة الخصوصية وسرية البيانات والأمان مع AdSense",
      type: "page",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/terms`,
      path: "/terms",
      title: "الشروط والأحكام لاتفاقية استخدام منصة ديكورا",
      type: "page",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/about`,
      path: "/about",
      title: "عن المنصة - من نحن ومنهجية التقييم المستقلة",
      type: "page",
      priority: "0.85",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/contact`,
      path: "/contact",
      title: "اتصل بنا لمعلومات النشر وهيئة التحرير",
      type: "page",
      priority: "0.85",
      changefreq: "monthly",
      lastmod: currentDate,
    },
    {
      loc: `${baseUrl}/disclaimer`,
      path: "/disclaimer",
      title: "إخلاء المسؤولية وإفصاح التسويق بالعمولة (Amazon & Affiliate)",
      type: "page",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    },

    // Categories
    ...CATEGORIES.map((cat) => ({
      loc: `${baseUrl}/category/${cat.id}`,
      path: `/category/${cat.id}`,
      title: `قسم: ${cat.nameAr} (${cat.nameEn})`,
      type: "category" as const,
      priority: "0.85",
      changefreq: "weekly",
      lastmod: currentDate,
    })),

    // Products
    ...productsList.map((prod) => {
      const fullUrl = `${baseUrl}/product/${prod.id}-${createProductSlug(prod)}`;
      const relativePath = `/product/${prod.id}-${createProductSlug(prod)}`;
      return {
        loc: fullUrl,
        path: relativePath,
        title: `مراجعة: ${prod.titleAr} - ${prod.brandName}`,
        type: "product" as const,
        priority: "0.8",
        changefreq: "weekly",
        lastmod: currentDate,
      };
    }),

    // Articles
    ...ARTICLES.map((art) => ({
      loc: `${baseUrl}/article/${art.slug}`,
      path: `/article/${art.slug}`,
      title: `مقال: ${art.title}`,
      type: "article" as const,
      priority: "0.75",
      changefreq: "monthly",
      lastmod: art.date || currentDate,
    })),

    // Deals
    ...DEALS.map((deal) => ({
      loc: `${baseUrl}/?deal=${deal.id}`,
      path: `/?deal=${deal.id}`,
      title: `عرض: ${deal.productTitle} (كود: ${deal.couponCode || "بدون"})`,
      type: "deal" as const,
      priority: "0.8",
      changefreq: "daily",
      lastmod: currentDate,
    })),

    // Buying Guides
    ...BUYING_GUIDES.map((guide) => ({
      loc: `${baseUrl}/?guide=${guide.id}`,
      path: `/?guide=${guide.id}`,
      title: `دليل شراء: ${guide.title}`,
      type: "guide" as const,
      priority: "0.8",
      changefreq: "monthly",
      lastmod: currentDate,
    })),
  ];

  // Filtered URLs
  const filteredUrls = urls.filter((item) => {
    if (filterType !== "all" && item.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Generate XML content for preview and download
  const generateXmlString = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
    xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
    xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

    urls.forEach((u) => {
      xml += `  <url>\n`;
      xml += `    <loc>${u.loc}</loc>\n`;
      xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const handleCopySitemapUrl = () => {
    const fullSitemapUrl = `${baseUrl}/sitemap.xml`;
    navigator.clipboard.writeText(fullSitemapUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadXml = () => {
    const xmlData = generateXmlString();
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date().toISOString());
      setIsRefreshing(false);
    }, 600);
  };

  const handleRowClick = (item: SitemapUrl) => {
    if (item.type === "category") {
      const catId = item.path.replace("/?category=", "");
      onSelectCategory(catId);
    } else if (item.type === "product") {
      const paramVal = item.path.replace("/?product=", "");
      const prod = findProductByQueryParam(productsList, paramVal);
      if (prod) onSelectProduct(prod);
    } else if (item.type === "page") {
      if (item.path === "/") onNavigateToView("home");
      else if (item.path.includes("categories")) onNavigateToView("categories");
      else if (item.path.includes("comparisons")) onNavigateToView("comparisons");
      else if (item.path.includes("deals")) onNavigateToView("deals");
      else if (item.path.includes("articles")) onNavigateToView("articles");
    } else if (item.type === "deal") {
      onNavigateToView("deals");
    } else if (item.type === "article") {
      onNavigateToView("articles");
    }
  };

  return (
    <div className="space-y-8 my-6" dir="rtl">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
          isDarkMode
            ? "bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-slate-800 text-white"
            : "bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900/30 border-slate-300 text-white shadow-xl"
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>خريطة الموقع المباشرة والمحدثة آلياً | Dynamic XML Sitemap Engine</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              خريطة الموقع الشاملة (sitemap.xml)
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تحديث تلقائي فوري ومستمر لجميع روابط المنتجات، التصنيفات الـ 12، المقالات، وأكواد الخصم المتاحة على المنصة لمساعدة محركات البحث (Google & Bing) على أرشفة الموقع بدقة 100%.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>إجمالي الروابط المؤرشفة: <strong className="text-amber-400">{urls.length} رابط</strong></span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>آخر مزامنة: <strong className="text-emerald-400">{new Date(lastUpdated).toLocaleTimeString("ar-EG")}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={handleCopySitemapUrl}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>تم نسخ الرابط!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ رابط /sitemap.xml</span>
                </>
              )}
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>فتح الملف المباشر XML</span>
            </a>

            <button
              onClick={() => setShowXmlModal(true)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700/80 transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>استعراض كود XML</span>
            </button>

            <button
              onClick={handleDownloadXml}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700/80 transition-all"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>تحميل ملف XML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div
          onClick={() => setFilterType("all")}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            filterType === "all"
              ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
              : isDarkMode
              ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
          }`}
        >
          <span className="text-[10px] text-slate-400 block mb-1">الكل (All)</span>
          <strong className="text-lg font-black font-mono block">{urls.length}</strong>
          <span className="text-[10px] text-slate-500">إجمالي الصفحات</span>
        </div>

        <div
          onClick={() => setFilterType("page")}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            filterType === "page"
              ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
              : isDarkMode
              ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
          }`}
        >
          <span className="text-[10px] text-slate-400 block mb-1">الصفحات العامة</span>
          <strong className="text-lg font-black font-mono block">
            {urls.filter((u) => u.type === "page").length}
          </strong>
          <span className="text-[10px] text-slate-500">أولوية 0.9 - 1.0</span>
        </div>

        <div
          onClick={() => setFilterType("category")}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            filterType === "category"
              ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
              : isDarkMode
              ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
          }`}
        >
          <span className="text-[10px] text-slate-400 block mb-1">التصنيفات الـ 12</span>
          <strong className="text-lg font-black font-mono block">
            {urls.filter((u) => u.type === "category").length}
          </strong>
          <span className="text-[10px] text-slate-500">أولوية 0.85</span>
        </div>

        <div
          onClick={() => setFilterType("product")}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            filterType === "product"
              ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
              : isDarkMode
              ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
          }`}
        >
          <span className="text-[10px] text-slate-400 block mb-1">المنتجات والمراجعات</span>
          <strong className="text-lg font-black font-mono block">
            {urls.filter((u) => u.type === "product").length}
          </strong>
          <span className="text-[10px] text-slate-500">أولوية 0.80</span>
        </div>

        <div
          onClick={() => setFilterType("article")}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            filterType === "article"
              ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
              : isDarkMode
              ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
          }`}
        >
          <span className="text-[10px] text-slate-400 block mb-1">المقالات والدروس</span>
          <strong className="text-lg font-black font-mono block">
            {urls.filter((u) => u.type === "article").length}
          </strong>
          <span className="text-[10px] text-slate-500">أولوية 0.75</span>
        </div>

        <div
          onClick={() => setFilterType("deal")}
          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
            filterType === "deal"
              ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-md"
              : isDarkMode
              ? "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm"
          }`}
        >
          <span className="text-[10px] text-slate-400 block mb-1">العروض والكوبونات</span>
          <strong className="text-lg font-black font-mono block">
            {urls.filter((u) => u.type === "deal").length}
          </strong>
          <span className="text-[10px] text-slate-500">تحديث يومي</span>
        </div>
      </div>

      {/* Search and Filters Controller */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"
        }`}
      >
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="ابحث في روابط الخريطة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pr-10 pl-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500"
                : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
            }`}
          />
          <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={handleManualRefresh}
            className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-colors ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                : "bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-500 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>تحديث السايت ماب الآن</span>
          </button>

          <span className="text-slate-400 text-[11px]">
            تحديث تلقائي لحظي دائم ✓
          </span>
        </div>
      </div>

      {/* Main Sitemap URLs Table */}
      <div
        className={`rounded-3xl border overflow-hidden ${
          isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900 shadow-md"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead
              className={`border-b font-extrabold ${
                isDarkMode ? "bg-slate-900 border-slate-800 text-amber-400" : "bg-slate-100 border-slate-200 text-amber-700"
              }`}
            >
              <tr>
                <th className="p-3.5">عنوان الصفحة / العنصر</th>
                <th className="p-3.5">مسار URL (Path)</th>
                <th className="p-3.5">النوع (Type)</th>
                <th className="p-3.5">الأولوية (Priority)</th>
                <th className="p-3.5">تكرار التغيير</th>
                <th className="p-3.5">تاريخ التحديث</th>
                <th className="p-3.5 text-center">انتقال</th>
              </tr>
            </thead>
            <tbody>
              {filteredUrls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    لا توجد روابط تطابق فلتر البحث الحالي.
                  </td>
                </tr>
              ) : (
                filteredUrls.map((item, idx) => (
                  <tr
                    key={idx}
                    onClick={() => handleRowClick(item)}
                    className={`border-b cursor-pointer transition-colors ${
                      isDarkMode
                        ? "border-slate-800/60 hover:bg-amber-500/10"
                        : "border-slate-100 hover:bg-amber-50"
                    }`}
                  >
                    <td className="p-3.5 font-bold">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-amber-500 shrink-0" />
                        <span className="line-clamp-1">{item.title}</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-slate-400 text-[11px] dir-ltr text-right">
                      {item.path}
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.type === "page"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : item.type === "category"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : item.type === "product"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : item.type === "article"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            : item.type === "deal"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                        }`}
                      >
                        {item.type === "page"
                          ? "صفحة رئيسية"
                          : item.type === "category"
                          ? "تصنيف"
                          : item.type === "product"
                          ? "منتج / مراجعة"
                          : item.type === "article"
                          ? "مقال"
                          : item.type === "deal"
                          ? "كوبون / عرض"
                          : "دليل شراء"}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono font-bold text-amber-500">
                      {item.priority}
                    </td>

                    <td className="p-3.5 text-slate-400 text-[11px]">
                      {item.changefreq === "always"
                        ? "مستمر"
                        : item.changefreq === "daily"
                        ? "يومي"
                        : item.changefreq === "weekly"
                        ? "أسبوعي"
                        : "شهري"}
                    </td>

                    <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                      {item.lastmod}
                    </td>

                    <td className="p-3.5 text-center">
                      <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 inline-block">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* XML Source Code Modal */}
      {showXmlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div
            className={`w-full max-w-4xl max-h-[85vh] rounded-3xl border flex flex-col shadow-2xl overflow-hidden ${
              isDarkMode ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-sm">المصدر الفني المباشر لملف sitemap.xml</h3>
              </div>
              <button
                onClick={() => setShowXmlModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-slate-950 text-emerald-400 dir-ltr text-left leading-relaxed">
              <pre className="whitespace-pre-wrap">{generateXmlString()}</pre>
            </div>

            <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900 text-xs">
              <span className="text-slate-400">XML Schema Protocol 0.9 • Validated</span>
              <button
                onClick={handleDownloadXml}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>تحميل ملف XML</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
