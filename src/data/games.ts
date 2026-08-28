import { Game } from "../types";

export const GAMES_DATA: Game[] = [
  {
    id: "brick-breaker",
    titleAr: "لعبة كسر الطوب ثلاثية الأبعاد (Breakout 3D)",
    titleEn: "Breakout 3D Arcade",
    category: "casual",
    categoryAr: "ألعاب خفيفة",
    categoryEn: "Casual",
    emoji: "🧱",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    color: "from-pink-500 to-rose-600",
    rating: 4.9,
    plays: "1.5M",
    isNative: true,
    descriptionAr: "لعبة كسر الطوب الكلاسيكية ثلاثية الأبعاد (Breakout 3D) المذهلة والمصممة بأسلوب النيون مع فيزياء ارتداد واقعية ومؤثرات انفجار جزيئات ملونة ومستويات تحدي ممتعة.",
    descriptionEn: "An immersive 3D Atari Breakout brick breaker game with amazing neon graphics, real-time physics, particle explosions, responsive inputs, and interactive overlays.",
    aspectRatio: "2x1"
  },
  {
    id: "neon-snake",
    titleAr: "ثعبان النيون اللامع",
    titleEn: "Neon Snake Arcade",
    category: "classic",
    categoryAr: "ألعاب كلاسيكية",
    categoryEn: "Classic Arcade",
    emoji: "🐍",
    image: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&w=600&q=80",
    color: "from-emerald-400 to-teal-500",
    rating: 4.8,
    plays: "1.2M",
    isNative: true,
    descriptionAr: "لعبة الثعبان الكلاسيكية بحلة نيون عصرية، تحكم بدقة بالغة واجمع النقاط والجوائز المخفية لتحقيق أعلى نتيجة دون الاصطدام بالجدران أو بذيلك.",
    descriptionEn: "The classic arcade snake game in beautiful neon colors. Steer smoothly, eat glowing food, grow longer, and score the ultimate high score.",
    aspectRatio: "2x2"
  }
];
