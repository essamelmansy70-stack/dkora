export type Category = "all" | "shoes" | "apparel" | "equipment";

export interface Product {
  id: string;
  titleAr: string;
  titleEn: string;
  category: "shoes" | "apparel" | "equipment";
  priceAmazon: number; // Simulated price on Amazon in SAR/USD
  originalPrice: number; // Price before discount
  rating: number; // 4.5 to 5.0
  reviewsCount: number; // Number of ratings
  image: string; // Path to the generated asset image
  descriptionAr: string;
  descriptionEn: string;
  amazonUrl: string; // Simulated affiliate link
  featuresAr: string[];
  featuresEn: string[];
  prosAr: string[];
  prosEn: string[];
  consAr: string[];
  consEn: string[];
  specsAr: { [key: string]: string };
  specsEn: { [key: string]: string };
  couponCode?: string;
  couponDiscount?: string;
  isBestSeller?: boolean;
  isHotDeal?: boolean;
}

export interface Review {
  id: string;
  authorAr: string;
  authorEn: string;
  rating: number;
  dateAr: string;
  dateEn: string;
  commentAr: string;
  commentEn: string;
  verified: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountAr: string;
  discountEn: string;
  expiryAr: string;
  expiryEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export type Language = "ar" | "en";
export type Tab = "main" | "privacy" | "terms" | "disclosure";
