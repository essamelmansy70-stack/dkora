export interface Option {
  textAr: string;
  textEn: string;
  player: "messi" | "ronaldo" | "mbappe" | "haaland" | "modric" | "salah";
}

export interface Question {
  id: number;
  textAr: string;
  textEn: string;
  options: Option[];
}

export interface PlayerProfile {
  id: "messi" | "ronaldo" | "mbappe" | "haaland" | "modric" | "salah";
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  personalityAr: string;
  personalityEn: string;
  strengthsAr: string[];
  strengthsEn: string[];
  mottoAr: string;
  mottoEn: string;
  avatarColor: string;
  glowColor: string;
  icon: string;
  stats: {
    speed: number;
    dribbling: number;
    shooting: number;
    stamina: number;
    teamwork: number;
  };
}
