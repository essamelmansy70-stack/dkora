import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  Award,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Share2,
  Code2,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Send,
  SlidersHorizontal,
  ThumbsUp,
  Edit2,
  Copy,
  Check,
  Link
} from "lucide-react";
import { Product, Currency, UserReview } from "../types";
import { REVIEWS_SAMPLE } from "../data/mockData";
import { createProductUrl } from "../utils/seo";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: Currency;
  onOpenSchema: (product: Product) => void;
  onCompareSelect: (product: Product) => void;
  isDarkMode: boolean;
  onEditProduct?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  onOpenSchema,
  onCompareSelect,
  isDarkMode,
  onEditProduct,
}) => {
  const [activeImage, setActiveImage] = useState(product ? product.mainImage : "");
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"review" | "specs" | "offers" | "reviews">("review");
  const [reviewsList, setReviewsList] = useState<UserReview[]>(
    product ? REVIEWS_SAMPLE.filter((r) => r.productId === product.id) : []
  );
  const [newReviewerName, setNewReviewerName] = useState("");
  const [newReviewerRole, setNewReviewerRole] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.mainImage);
      setReviewsList(REVIEWS_SAMPLE.filter((r) => r.productId === product.id));
    }
  }, [product]);

  if (!product) return null;

  const canonicalProductUrl = createProductUrl(product);

  const handleCopyProductLink = () => {
    navigator.clipboard.writeText(canonicalProductUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getPrice = (baseEgp: number | undefined) => {
    if (!baseEgp) return "غير متوفر حالياً";
    if (currency === "USD") return `$${Math.round(baseEgp / 50)}`;
    if (currency === "SAR") return `${Math.round(baseEgp / 13)} ر.س`;
    return `${baseEgp.toLocaleString()} ج.م`;
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newComment.trim()) return;

    const newRev: UserReview = {
      id: "rev-" + Date.now(),
      productId: product.id,
      userName: newReviewerName.trim(),
      userRole: newReviewerRole.trim() || "مستخدم موثق",
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      title: "تقييم أداء جديد",
      comment: newComment.trim(),
      helpfulCount: 1,
      verifiedPurchase: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewerName("");
    setNewReviewerRole("");
    setNewComment("");
    setReviewSubmittedMsg(true);
    setTimeout(() => setReviewSubmittedMsg(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col ${
          isDarkMode
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
        dir="rtl"
      >
        {/* Modal Header Bar */}
        <div className={`p-3 sm:p-6 border-b flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 shrink-0 ${
          isDarkMode ? "border-slate-800/80 bg-slate-950 text-white" : "border-slate-200 bg-slate-100 text-slate-900"
        }`}>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-full overflow-hidden">
            <span className="shrink-0">الرئيسية</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-amber-600 dark:text-amber-400 font-bold shrink-0">{product.brandName}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-slate-800 dark:text-slate-200 truncate">{product.titleAr}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onEditProduct && (
              <button
                onClick={() => {
                  onEditProduct(product);
                  onClose();
                }}
                aria-label={`تعديل بيانات وسعر ${product.titleAr}`}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-colors"
                title="تعديل بيانات وسعر هذا المنتج"
              >
                <Edit2 className="w-4 h-4" aria-hidden="true" />
                <span>تعديل المنتج</span>
              </button>
            )}

            <button
              onClick={() => onOpenSchema(product)}
              aria-label="عرض بيانات SEO Schema للمحتوى"
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isDarkMode
                  ? "bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
              }`}
              title="عرض Schema.org JSON-LD الموجه لمحركات البحث"
            >
              <Code2 className="w-4 h-4" aria-hidden="true" />
              <span>SEO Schema</span>
            </button>

            <button
              onClick={onClose}
              aria-label="إغلاق النافذة المنبثقة"
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode
                  ? "bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border-slate-700"
                  : "bg-slate-200 hover:bg-rose-100 text-slate-600 hover:text-rose-600 border-slate-300"
              }`}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6">
          {/* Canonical Direct Indexing Link Banner */}
          <div className={`p-3.5 sm:p-4 rounded-2xl border flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs ${
            isDarkMode ? "bg-slate-900/90 border-amber-500/30 text-slate-200" : "bg-amber-50/80 border-amber-300/80 text-slate-800"
          }`}>
            <div className="flex items-center gap-2 font-bold overflow-hidden min-w-0">
              <Link className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
              <span className="shrink-0 text-amber-600 dark:text-amber-400 font-extrabold">رابط المنتج المخصص للأرشفة (Canonical URL):</span>
              <span className="font-mono text-[11px] truncate text-slate-600 dark:text-slate-300 select-all">{canonicalProductUrl}</span>
            </div>
            <button
              onClick={handleCopyProductLink}
              aria-label="نسخ رابط المنتج المباشر"
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                copiedLink
                  ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                  : "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-sm"
              }`}
              title="نسخ الرابط المباشر للمنتج"
            >
              {copiedLink ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              <span>{copiedLink ? "تم النسخ بنجاح!" : "نسخ الرابط المباشر"}</span>
            </button>
          </div>

          {/* Top Hero Product Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery Section */}
            <div className="lg:col-span-5 space-y-3">
              <div className={`rounded-2xl overflow-hidden border h-72 sm:h-80 shadow-xl relative ${
                isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-slate-50"
              }`}>
                <img
                  src={activeImage}
                  alt={product.titleAr}
                  loading="eager"
                  decoding="async"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-lg">
                  تقييم المحرر {product.editorScore} / 10
                </div>
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`صورة مصغرة رقم ${idx + 1} لـ ${product.titleAr}`}
                      loading="lazy"
                      decoding="async"
                      width={64}
                      height={64}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                        activeImage === img
                          ? "border-amber-500 scale-105"
                          : isDarkMode
                          ? "border-slate-800 opacity-60"
                          : "border-slate-200 opacity-70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Main Product Info & Best Offers */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
                  {product.brandName} • موديل {product.modelNumber}
                </span>
                <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating} ({product.reviewCount} تقييم مستخدم)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black leading-tight text-slate-900 dark:text-white">
                {product.titleAr}
              </h1>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {product.summary}
              </p>

              {/* Target Audience Box */}
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                isDarkMode ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-200"
              }`}>
                <strong className="text-amber-600 dark:text-amber-500 block font-bold mb-1">
                  🎯 لمن يناسب هذا المنتج بالضبط؟
                </strong>
                <p className="text-slate-800 dark:text-slate-300 leading-relaxed">
                  {product.targetAudience}
                </p>
              </div>

              {/* Live Affiliate Price Buy Bar */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDarkMode ? "bg-slate-950 text-white border-slate-800" : "bg-slate-100 text-slate-900 border-slate-200"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" />
                    شراء الموديل الأصلي بأفضل سعر متاح:
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">تحديث لحظي لروابط الشراء</span>
                </div>

                <div>
                  {product.amazonUrl && (
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm flex items-center justify-between transition-all shadow-md text-center"
                    >
                      <span className="flex items-center gap-1.5">
                        شراء الموديل الأصلي من أمازون <ExternalLink className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-mono font-black bg-slate-950/10 px-3 py-1 rounded-lg">
                        {getPrice(product.priceAmazon)}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className={`flex border-b gap-2 text-xs sm:text-sm font-bold ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
            <button
              onClick={() => setActiveTab("review")}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === "review"
                  ? "border-amber-500 text-amber-600 dark:text-amber-500"
                  : isDarkMode
                  ? "border-transparent text-slate-400 hover:text-slate-200"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              المراجعة والتقييم المفصل
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === "specs"
                  ? "border-amber-500 text-amber-600 dark:text-amber-500"
                  : isDarkMode
                  ? "border-transparent text-slate-400 hover:text-slate-200"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              جدول المواصفات الفنية
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === "reviews"
                  ? "border-amber-500 text-amber-600 dark:text-amber-500"
                  : isDarkMode
                  ? "border-transparent text-slate-400 hover:text-slate-200"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              تقييمات المستخدمين ({reviewsList.length})
            </button>
          </div>

          {/* TAB 1: FULL REVIEW TEXT, PROS & CONS */}
          {activeTab === "review" && (
            <div className="space-y-6">
              {/* Pros & Cons Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm">
                  <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-base mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    أبرز المميزات التي أثبتتها التجربة
                  </h3>
                  <ul className={`space-y-2 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                    {product.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm">
                  <h3 className="font-extrabold text-rose-700 dark:text-rose-400 text-base mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    أبرز العيوب والسلبيات بكل شفافية
                  </h3>
                  <ul className={`space-y-2 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                    {product.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-600 dark:text-rose-400 font-bold">✗</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Editor Deep Verdict */}
              <div className={`p-6 rounded-2xl border space-y-3 ${
                isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <h3 className="text-lg font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  رأي المحرر الفني الشامل
                </h3>
                <p className={`text-sm leading-relaxed whitespace-pre-line ${isDarkMode ? "text-slate-300" : "text-slate-800"}`}>
                  {product.fullReviewText}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SPECS TABLE */}
          {activeTab === "specs" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400">جدول المواصفات التقنية الدقيقة</h3>
              <div className={`rounded-2xl border overflow-hidden ${
                isDarkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"
              }`}>
                <table className="w-full text-right text-xs sm:text-sm">
                  <tbody>
                    {product.specs.map((s, idx) => (
                      <tr
                        key={idx}
                        className={`border-b ${
                          isDarkMode
                            ? idx % 2 === 0
                              ? "bg-slate-900/60 border-slate-800/60"
                              : "bg-slate-950 border-slate-800/60"
                            : idx % 2 === 0
                            ? "bg-slate-50 border-slate-100"
                            : "bg-white border-slate-100"
                        }`}
                      >
                        <td className={`p-3.5 font-bold w-1/3 border-l ${
                          isDarkMode ? "text-slate-400 border-slate-800/60" : "text-slate-600 border-slate-100"
                        }`}>
                          {s.label}
                        </td>
                        <td className={`p-3.5 font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: USER REVIEWS & FORM */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Existing Reviews */}
              <div className="space-y-3">
                {reviewsList.length === 0 ? (
                  <p className="text-slate-500 text-sm italic">لا توجد تقييمات مضافة بعد من المستخدمين.</p>
                ) : (
                  reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className={`p-4 rounded-2xl border space-y-2 text-xs sm:text-sm ${
                        isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>{rev.userName}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">
                            {rev.userRole}
                          </span>
                        </div>
                        <span className="text-slate-500 text-xs">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"
                            }`}
                          />
                        ))}
                      </div>

                      <p className={isDarkMode ? "text-slate-300" : "text-slate-800"}>{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Review Form */}
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-sm"
              }`}>
                <h4 className={`font-bold text-sm flex items-center gap-2 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  أضف تجريتك وتقييمك لهذا المنتج
                </h4>

                {reviewSubmittedMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    شكرًا لك! تم إضافة تقييمك بنجاح وسوف يظهر فورًا للمستخدمين.
                  </div>
                )}

                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="اسمك أو لقبك الفني (مثال: أسطى محمود)"
                      value={newReviewerName}
                      onChange={(e) => setNewReviewerName(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="وظيفتك (مثال: فني كهرباء، مهندس موقع)"
                      value={newReviewerRole}
                      onChange={(e) => setNewReviewerRole(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                        isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>التقييم بالنجوم:</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className={`px-3 py-2 rounded-xl border text-amber-600 dark:text-amber-400 text-xs font-bold focus:outline-none ${
                        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-300"
                      }`}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5) ممتاز جداً</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5) جيد جداً</option>
                      <option value={3}>⭐⭐⭐ (3/5) متوسط</option>
                      <option value={2}>⭐⭐ (2/5) به عيوب</option>
                      <option value={1}>⭐ (1/5) لا أنصح به</option>
                    </select>
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="اكتب انطباعك عن أداء المعدة، خامات التصنيع، وقوة التحمل..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                      isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-slate-50 border-slate-300 text-slate-900"
                    }`}
                  />

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر التقييم الميداني</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
