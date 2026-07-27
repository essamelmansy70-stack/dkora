import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Wrench,
  Tag,
  BookOpen,
  SlidersHorizontal,
  Check,
  Upload,
  DollarSign,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Product, Category, Deal, Article, Currency } from "../types";

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  deals: Deal[];
  articles: Article[];
  isDarkMode: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  setProducts,
  categories,
  deals,
  articles,
  isDarkMode,
}) => {
  const [adminTab, setAdminTab] = useState<"products" | "add_product" | "stats">("products");

  // Add Product Form State
  const [newTitleAr, setNewTitleAr] = useState("");
  const [newBrandName, setNewBrandName] = useState("DeWalt");
  const [newModel, setNewModel] = useState("DCD-2026");
  const [newCategory, setNewCategory] = useState("cat-electric-tools");
  const [newImage, setNewImage] = useState(
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
  );
  const [newPriceAmazon, setNewPriceAmazon] = useState(5500);
  const [newPriceJumia, setNewPriceJumia] = useState(5650);
  const [newPriceNoon, setNewPriceNoon] = useState(5600);
  const [newSummary, setNewSummary] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newPro, setNewPro] = useState("");
  const [newCon, setNewCon] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleAr.trim()) return;

    const created: Product = {
      id: "p-" + Date.now(),
      titleAr: newTitleAr.trim(),
      titleEn: newTitleAr.trim(),
      slug: newTitleAr.trim().toLowerCase().replace(/\s+/g, "-"),
      categoryId: newCategory,
      brandId: "b-dewalt",
      brandName: newBrandName,
      modelNumber: newModel,
      mainImage: newImage,
      gallery: [newImage],
      rating: 5.0,
      reviewCount: 1,
      editorScore: 9.5,
      priceAmazon: Number(newPriceAmazon),
      priceJumia: Number(newPriceJumia),
      priceNoon: Number(newPriceNoon),
      currency: "EGP",
      amazonUrl: "https://amazon.eg",
      jumiaUrl: "https://jumia.com.eg",
      noonUrl: "https://noon.com",
      isTopPick: true,
      pros: [newPro || "خامات متينة فائقة الجودة"],
      cons: [newCon || "السعر مرتفع نسبيًا"],
      targetAudience: newTarget || "الورش والمحترفون",
      summary: newSummary || "منتج عالي الأداء معتمد من فريق التحرير الفني.",
      fullReviewText: "مراجعة كاملة لهذا المنتج بعد اختباره الفعلي في الورش.",
      specs: [
        { label: "بلد التصنيع", value: "ألمانيا / أمريكا" },
        { label: "الضمان", value: "سنتان ضمان معتمد" }
      ],
      viewsCount: 100,
      dateAdded: new Date().toISOString().split("T")[0],
      tags: ["جديد", "عُدد", "ديكور"]
    };

    setProducts([created, ...products]);
    setSaveSuccess(true);
    setNewTitleAr("");
    setNewSummary("");
    setNewTarget("");
    setTimeout(() => {
      setSaveSuccess(false);
      setAdminTab("products");
    }, 1500);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("هل أنت تأكد من حذف هذا المنتج؟")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 my-8">
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-950 text-white border border-slate-800">
        <div>
          <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full mb-2 inline-block">
            لوحة الإدارة والإشراف - Dkora Admin Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">إدارة منتجات ومراجعات 'ديكورا'</h1>
        </div>

        <button
          onClick={() => setAdminTab("add_product")}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 text-xs font-bold">
        <button
          onClick={() => setAdminTab("products")}
          className={`px-4 py-2 rounded-xl transition-all ${
            adminTab === "products" ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-300"
          }`}
        >
          قائمة المنتجات ({products.length})
        </button>
        <button
          onClick={() => setAdminTab("add_product")}
          className={`px-4 py-2 rounded-xl transition-all ${
            adminTab === "add_product" ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-300"
          }`}
        >
          + إضافة منتج ومراجعة
        </button>
        <button
          onClick={() => setAdminTab("stats")}
          className={`px-4 py-2 rounded-xl transition-all ${
            adminTab === "stats" ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-300"
          }`}
        >
          إحصائيات الأرباح والمشاهدات
        </button>
      </div>

      {/* LIST PRODUCTS TAB */}
      {adminTab === "products" && (
        <div className="rounded-3xl border overflow-hidden bg-slate-950 text-white border-slate-800">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-900 border-b border-slate-800 text-amber-400 font-extrabold">
              <tr>
                <th className="p-3.5">المنتج والموديل</th>
                <th className="p-3.5">العلامة</th>
                <th className="p-3.5">التقييم</th>
                <th className="p-3.5">سعر أمازون</th>
                <th className="p-3.5">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-800/60 hover:bg-slate-900/40">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={p.mainImage} alt={p.titleAr} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                    <div>
                      <span className="font-bold block text-slate-100">{p.titleAr}</span>
                      <span className="text-[10px] text-slate-400">{p.modelNumber}</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-amber-400">{p.brandName}</td>
                  <td className="p-3.5 font-mono text-emerald-400">{p.editorScore} / 10</td>
                  <td className="p-3.5 font-mono">{p.priceAmazon?.toLocaleString()} ج.م</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/40"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD PRODUCT TAB */}
      {adminTab === "add_product" && (
        <form
          onSubmit={handleCreateProduct}
          className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
            isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
          }`}
        >
          <h2 className="text-lg font-black text-amber-500">إضافة مراجعة منتج جديد وقسيمة تسويق بالعمولة</h2>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              تم حفظ المنتج الجديد بنجاح وإضافته للكتالوج!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-400 mb-1">اسم المنتج بالعربية:</label>
              <input
                type="text"
                required
                placeholder="مثال: شنيور هيلتي بوش 800 واط"
                value={newTitleAr}
                onChange={(e) => setNewTitleAr(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-400 mb-1">اسم الشركة / الماركة:</label>
              <input
                type="text"
                required
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-400 mb-1">رقم الموديل:</label>
              <input
                type="text"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-400 mb-1">التصنيف:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white font-bold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameAr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-400 mb-1">سعر أمازون (ج.م):</label>
              <input
                type="number"
                value={newPriceAmazon}
                onChange={(e) => setNewPriceAmazon(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-400 mb-1">سعر جوميا (ج.م):</label>
              <input
                type="number"
                value={newPriceJumia}
                onChange={(e) => setNewPriceJumia(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-400 mb-1">رابط صورة المنتج (URL):</label>
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white"
            />
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-400 mb-1">ملخص المراجعة الفنية:</label>
            <textarea
              rows={2}
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              placeholder="اكتب خلاصة تقييم المحرر الفني..."
              className="w-full p-2.5 rounded-xl border bg-slate-950 border-slate-800 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4" />
            <span>حفظ ونشر المراجعة على الموقع</span>
          </button>
        </form>
      )}

      {/* STATS TAB */}
      {adminTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>إجمالي النقرات على وروابط أمازون</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-black font-mono text-emerald-400">14,290 نقرة</p>
            <p className="text-[10px] text-slate-500">تحويل مباشر للمتاجر الكبرى</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>المراجعات المنشورة</span>
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-black font-mono text-amber-400">{products.length} منتج</p>
            <p className="text-[10px] text-slate-500">في 12 تصنيف رئيسي</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>الأرباح التقديرية هذا الشهر</span>
              <DollarSign className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-3xl font-black font-mono text-orange-400">$1,850</p>
            <p className="text-[10px] text-slate-500">عمولات التسويق بالعمولة (Affiliate)</p>
          </div>
        </div>
      )}
    </div>
  );
};
