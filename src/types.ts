export interface Game {
  id: string;
  titleAr: string;
  titleEn: string;
  category: "cars" | "intelligence" | "action" | "puzzles" | "classic" | "casual";
  categoryAr: string;
  categoryEn: string;
  emoji: string;
  image: string;
  imageAr?: string;
  imageEn?: string;
  color: string;
  rating: number;
  plays: string;
  isNative: boolean;
  embedUrl?: string;
  descriptionAr: string;
  descriptionEn: string;
  aspectRatio: "1:1" | "2x1" | "1x2" | "2x2";
}

export interface GameMonetizeGame {
  id?: string;
  title: string;
  description: string;
  instructions: string;
  category: string;
  thumb: string;
  url: string;
  width: string;
  height: string;
  tags?: string;
}

