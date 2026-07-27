export type Currency = 'EGP' | 'SAR' | 'USD';

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  icon: string; // Lucide icon name
  description: string;
  productCount: number;
  bgGradient: string;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  logoText: string;
  description: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface PriceInfo {
  store: 'amazon' | 'jumia' | 'noon';
  storeNameAr: string;
  price: number;
  currency: Currency;
  url: string;
  inStock: boolean;
  isBestPrice?: boolean;
}

export interface UserReview {
  id: string;
  productId: string;
  userName: string;
  userRole?: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  titleAr: string;
  titleEn: string;
  slug: string;
  categoryId: string;
  brandId: string;
  brandName: string;
  modelNumber: string;
  mainImage: string;
  gallery: string[];
  rating: number; // e.g. 4.8
  reviewCount: number;
  editorScore: number; // out of 10
  priceAmazon?: number;
  priceJumia?: number;
  priceNoon?: number;
  currency: Currency;
  amazonUrl: string;
  jumiaUrl: string;
  noonUrl: string;
  isTopPick?: boolean;
  isBestValue?: boolean;
  isEditorChoice?: boolean;
  pros: string[];
  cons: string[];
  targetAudience: string; // لمن يناسب هذا المنتج؟
  summary: string;
  fullReviewText: string;
  specs: SpecItem[];
  competitorIds?: string[];
  viewsCount: number;
  dateAdded: string;
  tags: string[];
}

export interface ComparisonItem {
  id: string;
  title: string;
  slug: string;
  product1Id: string;
  product2Id: string;
  winnerId: string;
  winnerReason: string;
  summary: string;
  featuresComparison: {
    featureName: string;
    product1Val: string;
    product2Val: string;
    winner: 'p1' | 'p2' | 'tie';
  }[];
  date: string;
}

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  subtitle: string;
  coverImage: string;
  updatedDate: string;
  author: string;
  readTime: string;
  topProductIds: string[];
  introduction: string;
  buyingAdvice: string[];
}

export interface Deal {
  id: string;
  productId: string;
  productTitle: string;
  image: string;
  store: 'amazon' | 'jumia' | 'noon';
  originalPrice: number;
  dealPrice: number;
  currency: Currency;
  discountPercent: number;
  couponCode?: string;
  expiresIn: string;
  url: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
}
