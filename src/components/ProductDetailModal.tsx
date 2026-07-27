import React, { useState } from "react";
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
  ThumbsUp
} from "lucide-react";
import { Product, Currency, UserReview } from "../types";
import { REVIEWS_SAMPLE } from "../data/mockData";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: Currency;
  onOpenSchema: (product: Product) => void;
  onCompareSelect: (product: Product) => void;
  isDarkMode: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  onOpenSchema,
  onCompareSelect,
  isDarkMode,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [activeTab, setActiveTab] = useState<"review" | "specs" | "offers" | "reviews">("review");

  // User reviews state
  const [reviewsList, setReviewsList] = useState<UserReview[]>(
    REVIEWS_SAMPLE.filter((r) => r.productId === product.id)
  );
  const [newReviewerName, setNewReviewerName] = useState("");
  const [newReviewerRole, setNewReviewerRole] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewSubmittedMsg, setReviewSubmittedMsg] = useState(false);

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
        <div className="p-4 sm:p-6 border-b border-slate-800/80 flex items-center justify-between gap-4 bg-slate-950 text-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>الرئيسية</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-amber-400 font-bold">{product.brandName}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-200 line-clamp-1">{product.titleAr}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenSchema(product)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="عرض Schema.org JSON-LD الموجه لمحركات البحث"
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline">SEO Schema Data</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Content */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-8">
          {/* Top Hero Product Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery Section */}
            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-72 sm:h-80 shadow-xl relative">
                <img
                  src={activeImage}
                  alt={product.titleAr}
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
                      alt="Thumbnail"
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                        activeImage === img ? "border-amber-500 scale-105" : "border-slate-800 opacity-60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Main Product Info & Best Offers */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
                  {product.brandName} • موديل {product.modelNumber}
                </span>
                <div className="flex items-center text-amber-400 text-xs font-bold gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating} ({product.reviewCount} تقييم مستخدم)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black leading-tight text-slate-900 dark:text-white">
                {product.titleAr}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {product.summary}
              </p>

              {/* Target Audience Box */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm">
                <strong className="text-amber-500 block font-bold mb-1">
                  🎯 لمن يناسب هذا المنتج بالضبط؟
                </strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {product.targetAudience}
                </p>
              </div>

              {/* Live Affiliate Price Buy Bar */}
              <div className="p-4 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" />
                    شراء الموديل الأصلي بأفضل سعر متاح:
                  </span>
                  <span className="text-[10px] text-slate-400">تحديث لحظي لروابط الشراء</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {product.amazonUrl && (
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex flex-col items-center justify-center transition-all shadow-md text-center"
                    >
                      <span className="flex items-center gap-1">
                        شراء من أمازون <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-mono font-extrabold mt-0.5">
                        {getPrice(product.priceAmazon)}
                      </span>
                    </a>
                  )}

                  {product.jumiaUrl && (
                    <a
                      href={product.jumiaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex flex-col items-center justify-center transition-all shadow-md text-center"
                    >
                      <span className="flex items-center gap-1">
                        شراء من جوميا <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-mono font-extrabold mt-0.5">
                        {getPrice(product.priceJumia)}
                      </span>
                    </a>
                  )}

                  {product.noonUrl && (
                    <a
                      href={product.noonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-xs flex flex-col items-center justify-center transition-all shadow-md text-center"
                    >
                      <span className="flex items-center gap-1">
                        شراء من نون <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-mono font-extrabold mt-0.5">
                        {getPrice(product.priceNoon)}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b border-slate-800 gap-2 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab("review")}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === "review"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              المراجعة والتقييم المفصل
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === "specs"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              جدول المواصفات الفنية
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === "reviews"
                  ? "border-amber-500 text-amber-500"
                  : "border-transparent text-slate-400 hover:text-slate-200"
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
                  <h3 className="font-extrabold text-emerald-400 text-base mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    أبرز المميزات التي أثبتتها التجربة
                  </h3>
                  <ul className="space-y-2 text-slate-200">
                    {product.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm">
                  <h3 className="font-extrabold text-rose-400 text-base mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-400" />
                    أبرز العيوب والسلبيات بكل شفافية
                  </h3>
                  <ul className="space-y-2 text-slate-200">
                    {product.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">✗</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Editor Deep Verdict */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="text-lg font-extrabold text-amber-400 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  رأي المحرر الفني الشامل
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {product.fullReviewText}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SPECS TABLE */}
          {activeTab === "specs" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-400">جدول المواصفات التقنية الدقيقة</h3>
              <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
                <table className="w-full text-right text-xs sm:text-sm">
                  <tbody>
                    {product.specs.map((s, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-slate-800/60 ${
                          idx % 2 === 0 ? "bg-slate-900/60" : "bg-slate-950"
                        }`}
                      >
                        <td className="p-3.5 font-bold text-slate-400 w-1/3 border-l border-slate-800/60">
                          {s.label}
                        </td>
                        <td className="p-3.5 font-semibold text-slate-100">{s.value}</td>
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
                  <p className="text-slate-400 text-sm italic">لا توجد تقييمات مضافة بعد من المستخدمين.</p>
                ) : (
                  reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200">{rev.userName}</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                            {rev.userRole}
                          </span>
                        </div>
                        <span className="text-slate-500 text-xs">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-700"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Review Form */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  أضف تجريتك وتقييمك لهذا المنتج
                </h4>

                {reviewSubmittedMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
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
                      className="w-full px-3 py-2 rounded-xl border bg-slate-900 border-slate-800 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="وظيفتك (مثال: فني كهرباء، مهندس موقع)"
                      value={newReviewerRole}
                      onChange={(e) => setNewReviewerRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border bg-slate-900 border-slate-800 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">التقييم بالنجوم:</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold focus:outline-none"
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
                    className="w-full px-3 py-2 rounded-xl border bg-slate-900 border-slate-800 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all"
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
