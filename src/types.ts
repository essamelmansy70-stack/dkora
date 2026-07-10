export interface Product {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'shoes' | 'apparel' | 'equipment';
  subCategoryAr: string;
  subCategoryEn: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  rating: number;
  reviewsCount: number;
  featuresAr: string[];
  featuresEn: string[];
  amazonUrl: string;
  badgeAr?: string;
  badgeEn?: string;
  tagsAr: string[];
  tagsEn: string[];
  bestUseAr: string;
  bestUseEn: string;
  gallery?: string[];
}

export type CategoryFilter = 'all' | 'shoes' | 'apparel' | 'equipment';

export interface GuideItem {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  icon: string;
  amazonQueryUrl: string;
}
