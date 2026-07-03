import React, { useState, useEffect, useRef } from "react";
import { 
  Gamepad2, 
  Trophy, 
  RotateCcw, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Volume2, 
  VolumeX, 
  Flame, 
  Award, 
  Monitor, 
  Grid, 
  Brain, 
  Timer, 
  Heart,
  Sparkles,
  Zap,
  Info,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Check
} from "lucide-react";

import snakeGameCover from "./assets/images/snake_game_cover_1783043783592.jpg";
import tictactoeCover from "./assets/images/tictactoe_cover_1783043800396.jpg";
import memoryGameCover from "./assets/images/memory_game_cover_1783043815120.jpg";
import grammarGameCover from "./assets/images/grammar_game_cover_1783044752880.jpg";

// Game types
type GameType = "snake" | "tictactoe" | "memory" | "grammar";

interface Game {
  id: GameType;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  categoryAr: string;
  categoryEn: string;
  cover: string;
  difficultyAr: string;
  difficultyEn: string;
  highScoreKey: string;
  icon: React.ReactNode;
}

export default function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Game highscores from localStorage
  const [highScores, setHighScores] = useState({
    snake: 0,
    tictactoe: 0,
    memory: 0,
    grammar: 0
  });

  // Load high scores on mount
  useEffect(() => {
    const sScore = localStorage.getItem("high_snake") ? parseInt(localStorage.getItem("high_snake")!) : 0;
    const tScore = localStorage.getItem("high_tictactoe") ? parseInt(localStorage.getItem("high_tictactoe")!) : 0;
    const mScore = localStorage.getItem("high_memory") ? parseInt(localStorage.getItem("high_memory")!) : 0;
    const gScore = localStorage.getItem("high_grammar") ? parseInt(localStorage.getItem("high_grammar")!) : 0;
    setHighScores({ snake: sScore, tictactoe: tScore, memory: mScore, grammar: gScore });
  }, []);

  const updateHighScore = (game: GameType, score: number) => {
    const currentScores = { ...highScores };
    if (score > currentScores[game]) {
      currentScores[game] = score;
      localStorage.setItem(`high_${game}`, score.toString());
      setHighScores(currentScores);
      playSynthSound(600, "sawtooth", 0.3, 0.5); // victory ding
    }
  };

  // Synthesize game sound effects using Web Audio API
  const playSynthSound = (frequency: number, type: OscillatorType = "sine", duration = 0.1, delay = 0) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      // Audio context error or blocked by autoplay
    }
  };

  // Interactive Games Data
  const games: Game[] = [
    {
      id: "snake",
      titleAr: "الأفعى الكلاسيكية النيون",
      titleEn: "Neon Classic Snake",
      descAr: "تحكم في الأفعى المتوهجة، التهم التفاح الرقمي السريع وتفادى الاصطدام بالجدران أو بنفسك لكسر أرقام قياسية جديدة.",
      descEn: "Steer the neon snake, devour fast digital apples, and avoid colliding with the walls or yourself to break new records.",
      categoryAr: "تحدي وسرعة",
      categoryEn: "Action & Skill",
      cover: snakeGameCover,
      difficultyAr: "متوسط",
      difficultyEn: "Medium",
      highScoreKey: "high_snake",
      icon: <Flame className="w-5 h-5 text-emerald-400" />
    },
    {
      id: "tictactoe",
      titleAr: "تحدي إكس أو الذكي",
      titleEn: "Cyber Tic-Tac-Toe AI",
      descAr: "العب اللعبة الكلاسيكية الشهيرة ضد ذكاء اصطناعي ذكي ومستجيب أو تحدى صديقك محلياً على نفس الشاشة.",
      descEn: "Play the legendary classic game against a smart, adaptive AI opponent or challenge your friends locally on the same screen.",
      categoryAr: "ذكاء وتفكير",
      categoryEn: "Strategy & Brain",
      cover: tictactoeCover,
      difficultyAr: "قابل للتعديل",
      difficultyEn: "Adjustable",
      highScoreKey: "high_tictactoe",
      icon: <Grid className="w-5 h-5 text-rose-400" />
    },
    {
      id: "memory",
      titleAr: "تطابق الذاكرة الكونى",
      titleEn: "Cosmic Memory Match",
      descAr: "درب ذاكرتك البصرية وقوة تركيزك عبر البحث عن الكروت المتطابقة في أقل وقت وبأقل عدد من الخطوات الممكنة.",
      descEn: "Train your visual memory and cognitive focus by matching pairs of cosmic card symbols in the shortest time and moves.",
      categoryAr: "ألعاب ذهنية",
      categoryEn: "Memory & Mind",
      cover: memoryGameCover,
      difficultyAr: "سهل إلى متوسط",
      difficultyEn: "Easy to Medium",
      highScoreKey: "high_memory",
      icon: <Brain className="w-5 h-5 text-indigo-400" />
    },
    {
      id: "grammar",
      titleAr: "مختبر النحو العربي الذكي",
      titleEn: "Smart Arabic Grammar Lab",
      descAr: "لعبة ذكاء واختبارات متخصصة لتعليم قواعد النحو العربي للطلاب بأسلوب شيق ومبسط، مع شرح تفصيلي فوري لكل قاعدة ومستويات تدرجية.",
      descEn: "An interactive educational quiz game to learn and master Arabic grammar rules with instant detailed explanations and dynamic progression.",
      categoryAr: "تعليم وذكاء",
      categoryEn: "Education & Brain",
      cover: grammarGameCover,
      difficultyAr: "تفاعلي ومتدرج",
      difficultyEn: "Adaptive",
      highScoreKey: "high_grammar",
      icon: <BookOpen className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#05060f] text-slate-100 selection:bg-rose-600/30 selection:text-white font-sans overflow-x-hidden relative">
      {/* Dynamic Cyberpunk Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Modern High-End Floating Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#05060f]/80 border-b border-slate-900 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-600/20">
              <Gamepad2 className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                {lang === "ar" ? "بوابة ألعاب أركيد" : "ARCADE WEB HUB"}
              </h1>
              <p className="text-[9px] font-black tracking-widest text-rose-500">
                {lang === "ar" ? "ألعاب جيل ٢٠٢٦ المجانية" : "2026 EDITION"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Toggle */}
            <button 
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSynthSound(440, "sine", 0.05);
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              title={lang === "ar" ? "تشغيل/إيقاف الصوت" : "Mute/Unmute Sounds"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => {
                setLang(lang === "ar" ? "en" : "ar");
                playSynthSound(350, "sine", 0.05);
              }}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-rose-600/10 to-indigo-600/10 hover:from-rose-600/20 hover:to-indigo-600/20 border border-rose-500/20 text-xs font-black text-rose-300 hover:text-rose-200 transition-all cursor-pointer"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 space-y-12">
        
        {/* Dynamic Viewport (مساحة عرض الألعاب) - Shows when a game is active */}
        {activeGame ? (
          <div id="game-stage" className="scroll-mt-24 animate-fade-in">
            <div className="bg-gradient-to-b from-[#090b16] to-[#04050a] border-2 border-slate-900 rounded-[32px] overflow-hidden shadow-2xl shadow-rose-950/10 relative">
              
              {/* Retro Monitor Glare Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] via-transparent to-black/20 pointer-events-none z-10" />

              {/* Game Viewport Header */}
              <div className="bg-[#0b0e1b] border-b border-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <h2 className="text-sm sm:text-base font-black text-white">
                      {lang === "ar" ? "مساحة اللعب النشطة" : "Active Play Center"}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-rose-400 font-bold">
                      {lang === "ar" ? "أنت تلعب الآن" : "You are playing"}: {lang === "ar" ? games.find(g => g.id === activeGame)?.titleAr : games.find(g => g.id === activeGame)?.titleEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveGame(null);
                      playSynthSound(220, "sine", 0.15);
                    }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-black border border-rose-500/20 hover:border-transparent transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{lang === "ar" ? "إنهاء اللعب" : "Exit Game"}</span>
                  </button>
                </div>
              </div>

              {/* Embedded Games Core Engine */}
              <div className="p-4 sm:p-8 flex items-center justify-center min-h-[450px]">
                {activeGame === "snake" && (
                  <SnakeGameEngine 
                    lang={lang} 
                    playSynthSound={playSynthSound} 
                    updateHighScore={(score) => updateHighScore("snake", score)}
                    highScore={highScores.snake}
                  />
                )}
                {activeGame === "tictactoe" && (
                  <TicTacToeEngine 
                    lang={lang} 
                    playSynthSound={playSynthSound} 
                    updateHighScore={(score) => updateHighScore("tictactoe", score)}
                    highScore={highScores.tictactoe}
                  />
                )}
                {activeGame === "memory" && (
                  <MemoryGameEngine 
                    lang={lang} 
                    playSynthSound={playSynthSound} 
                    updateHighScore={(score) => updateHighScore("memory", score)}
                    highScore={highScores.memory}
                  />
                )}
                {activeGame === "grammar" && (
                  <GrammarGameEngine 
                    lang={lang} 
                    playSynthSound={playSynthSound} 
                    updateHighScore={(score) => updateHighScore("grammar", score)}
                    highScore={highScores.grammar}
                  />
                )}
              </div>

            </div>
          </div>
        ) : (
          /* Game Center Welcome Screen & Stats if no game active */
          <div className="bg-gradient-to-r from-slate-900/40 via-indigo-950/10 to-slate-900/40 border border-slate-900 p-8 rounded-[32px] text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-rose-500/10 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/10 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-black rounded-xl">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                <span>{lang === "ar" ? "ألعاب ويب مجانية فورية" : "Instant Web Games Arena"}</span>
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {lang === "ar" ? "أبرز مهاراتك وتحدّى أصدقائك الآن" : "Unleash Your Ultimate Gaming Skills"}
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                {lang === "ar" 
                  ? "اختر أي لعبة من الأسفل للبدء الفوري. سيتم تحميل اللعبة تلقائياً في مساحة العرض العلوية المخصصة للألعاب مع حفظ أرقامك القياسية بشكل دائم."
                  : "Pick any of our handcrafted games below to start instantly. The games load directly on the dynamic visual stage and auto-save your highscores locally."}
              </p>

              {/* High Scores summary board */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
                <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-2xl">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{lang === "ar" ? "الأفعى" : "Snake"}</p>
                  <p className="text-base font-black text-emerald-400 mt-1">{highScores.snake} 🍎</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-2xl">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{lang === "ar" ? "إكس أو" : "TicTacToe"}</p>
                  <p className="text-base font-black text-rose-400 mt-1">{highScores.tictactoe} 🏆</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-2xl">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{lang === "ar" ? "الذاكرة" : "Memory"}</p>
                  <p className="text-base font-black text-indigo-400 mt-1">{highScores.memory > 0 ? `${highScores.memory}s` : "0"}</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-2xl">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{lang === "ar" ? "تحدي النحو" : "Grammar"}</p>
                  <p className="text-base font-black text-amber-400 mt-1">{highScores.grammar} ⭐</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Catalog of Games displayed as highly polished Grid Cards */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-rose-500" />
                <span>{lang === "ar" ? "كتالوج الألعاب المتاحة" : "Available Games Catalog"}</span>
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {lang === "ar" ? "ألعاب تفاعلية مصنوعة بدقة عالية" : "High-fidelity handcrafted gaming widgets"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {games.map((game) => (
              <div 
                key={game.id}
                className="bg-[#0b0e1b] border border-slate-900 rounded-[28px] overflow-hidden group hover:border-rose-500/30 hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Game Card Cover Frame */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                  <img 
                    src={game.cover} 
                    alt={lang === "ar" ? game.titleAr : game.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 right-4 px-2.5 py-1 bg-slate-950/95 text-[10px] font-black text-rose-400 border border-slate-800 rounded-lg flex items-center gap-1">
                    {game.icon}
                    <span>{lang === "ar" ? game.categoryAr : game.categoryEn}</span>
                  </span>
                </div>

                {/* Game Card Content details */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-rose-400 transition-colors">
                      {lang === "ar" ? game.titleAr : game.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      {lang === "ar" ? game.descAr : game.descEn}
                    </p>
                  </div>

                  {/* High Scores & Metadata inside the card */}
                  <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <div className="space-y-0.5">
                      <p className="text-slate-500 font-semibold">{lang === "ar" ? "أعلى رقم" : "Highscore"}</p>
                      <p className="text-white font-black text-xs">
                        {game.id === "snake" && `🍎 ${highScores.snake}`}
                        {game.id === "tictactoe" && `🏆 ${highScores.tictactoe} ${lang === "ar" ? "فوز" : "wins"}`}
                        {game.id === "memory" && `⏱️ ${highScores.memory > 0 ? `${highScores.memory}s` : "—"}`}
                      </p>
                    </div>

                    <div className="space-y-0.5 text-left rtl:text-left ltr:text-right">
                      <p className="text-slate-500 font-semibold">{lang === "ar" ? "الصعوبة" : "Difficulty"}</p>
                      <p className="text-rose-400 font-black text-xs">
                        {lang === "ar" ? game.difficultyAr : game.difficultyEn}
                      </p>
                    </div>
                  </div>

                  {/* Play Action Trigger */}
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setActiveGame(game.id);
                        playSynthSound(440, "sine", 0.1);
                        playSynthSound(554, "sine", 0.1, 0.08);
                        playSynthSound(659, "sine", 0.15, 0.16);
                        
                        // Smooth scroll to viewport on click
                        setTimeout(() => {
                          const element = document.getElementById("game-stage");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 100);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-95 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-rose-950/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{lang === "ar" ? "العب الآن مجاناً" : "Play Now Free"}</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Helpful Tips & Platform Specs Accordion */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-[28px] p-6 sm:p-8 space-y-4">
          <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>{lang === "ar" ? "ميزات منصة ألعاب الويب المتطورة" : "Advanced Web Gaming Specs"}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400 font-medium leading-relaxed">
            <div className="space-y-1">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                <span>{lang === "ar" ? "أداء فوري فائق السرعة" : "Zero Download Play"}</span>
              </h4>
              <p>{lang === "ar" ? "تعتمد الألعاب على معايير HTML5 و React المباشرة لتوفر استجابة فورية ونقرة واحدة للبدء دون تضييع باقات الإنترنت." : "No installation needed. Native HTML5 canvas guarantees smooth 60fps play with lightweight assets."}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === "ar" ? "أرقام قياسية محلية" : "Local Records Save"}</span>
              </h4>
              <p>{lang === "ar" ? "تحتفظ اللعبة بأرقامك القياسية وإنجازاتك في التصفح المحلي لجهازك تلقائياً لكي تتمكن من العودة لتحديها لاحقاً." : "Your progress, high scores, and games history are saved dynamically on your browser's localStorage."}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-emerald-500" />
                <span>{lang === "ar" ? "مؤثرات صوتية اصطناعية" : "Retro Synthesized Audio"}</span>
              </h4>
              <p>{lang === "ar" ? "بنينا نظام تشغيل نغمات رقمية كلاسيكية يحاكي أجهزة النينتندو والأركيد القديمة باستخدام مولد تذبذب الصوت الداخلي." : "Generates real-time retro arcade blips, dings, and crash signals using the modular Web Audio API."}</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Branding block */}
      <footer className="border-t border-slate-900 py-8 px-4 text-center text-slate-500 text-xs font-semibold">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>{lang === "ar" ? "© ٢٠٢٦ منصة بوابة ألعاب أركيد ويب. جميع الحقوق محفوظة." : "© 2026 Web Arcade Arena. All rights reserved."}</p>
          <p className="text-[10px] text-slate-600 font-mono">
            {lang === "ar" 
              ? "مبني بدقة فائقة وتوافق كامل لجميع مقاسات الشاشات والهواتف الذكية."
              : "Coded with absolute pixel precision, fully compatible with desktop, mobile, and touch pads."}
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ==========================================
   1. SNAKE GAME INTERACTIVE COMPONENT ENGINE
   ========================================== */
interface SnakeGameProps {
  lang: "ar" | "en";
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
  updateHighScore: (score: number) => void;
  highScore: number;
}

function SnakeGameEngine({ lang, playSynthSound, updateHighScore, highScore }: SnakeGameProps) {
  const GRID_SIZE = 15;
  const INITIAL_SPEED = 140;

  const [snake, setSnake] = useState<[number, number][]>([[7, 7]]);
  const [food, setFood] = useState<[number, number]>([3, 3]);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  // Listen to keyboard arrow and WASD movements
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      const key = e.key;
      e.preventDefault(); // Stop window scrolling

      if ((key === "ArrowUp" || key === "w" || key === "W") && directionRef.current !== "DOWN") {
        setDirection("UP");
        playSynthSound(300, "sine", 0.05);
      } else if ((key === "ArrowDown" || key === "s" || key === "S") && directionRef.current !== "UP") {
        setDirection("DOWN");
        playSynthSound(300, "sine", 0.05);
      } else if ((key === "ArrowLeft" || key === "a" || key === "A") && directionRef.current !== "RIGHT") {
        setDirection("LEFT");
        playSynthSound(300, "sine", 0.05);
      } else if ((key === "ArrowRight" || key === "d" || key === "D") && directionRef.current !== "LEFT") {
        setDirection("RIGHT");
        playSynthSound(300, "sine", 0.05);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver, playSynthSound]);

  // Main game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: [number, number] = [head[0], head[1]];

        switch (direction) {
          case "UP":
            newHead[1] -= 1;
            break;
          case "DOWN":
            newHead[1] += 1;
            break;
          case "LEFT":
            newHead[0] -= 1;
            break;
          case "RIGHT":
            newHead[0] += 1;
            break;
        }

        // Boundary wall collision checking
        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          handleGameOver();
          return prevSnake;
        }

        // Self bite/collision checking
        for (const segment of prevSnake) {
          if (segment[0] === newHead[0] && segment[1] === newHead[1]) {
            handleGameOver();
            return prevSnake;
          }
        }

        const newSnake = [newHead, ...prevSnake];

        // Checking if food eaten
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          playSynthSound(523.25, "triangle", 0.15); // yummy apple sound
          setScore((s) => {
            const nextScore = s + 10;
            updateHighScore(nextScore);
            return nextScore;
          });
          generateFood(newSnake);
          // Gently increase speed
          setSpeed((sp) => Math.max(70, sp - 3));
        } else {
          newSnake.pop(); // Standard move forward
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, direction, food, speed]);

  const generateFood = (currentSnake: [number, number][]) => {
    let newFood: [number, number];
    let attempts = 0;
    while (attempts < 100) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const onSnake = currentSnake.some(s => s[0] === x && s[1] === y);
      if (!onSnake) {
        newFood = [x, y];
        setFood(newFood);
        break;
      }
      attempts++;
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
    playSynthSound(130.81, "sawtooth", 0.4); // game over crash blip
  };

  const restartGame = () => {
    setSnake([[7, 7]]);
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameStarted(true);
    generateFood([[7, 7]]);
    playSynthSound(440, "sine", 0.1);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 flex flex-col items-center">
      
      {/* Game Dashboard Stats */}
      <div className="w-full flex items-center justify-between px-2 text-xs font-bold text-slate-300">
        <div className="flex items-center gap-1">
          <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{lang === "ar" ? "النقاط" : "Score"}: <strong className="text-white text-sm font-black">{score}</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>{lang === "ar" ? "الأعلى" : "Record"}: <strong className="text-white text-sm font-black">{highScore}</strong></span>
        </div>
      </div>

      {/* Snake Interactive Grid Screen */}
      <div className="relative w-full aspect-square max-w-[340px] bg-[#030408] border-2 border-slate-900 rounded-3xl overflow-hidden shadow-inner">
        
        {/* Playable Grid boxes */}
        <div className="grid grid-cols-15 grid-rows-15 h-full w-full p-1 gap-[1px]">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnakeSegment = snake.some((seg) => seg[0] === x && seg[1] === y);
            const isHead = snake[0][0] === x && snake[0][1] === y;
            const isFoodItem = food[0] === x && food[1] === y;

            return (
              <div 
                key={index}
                className={`rounded-[3px] transition-all duration-75 ${
                  isHead 
                    ? "bg-gradient-to-tr from-emerald-400 to-emerald-300 ring-2 ring-emerald-500 shadow-lg shadow-emerald-400/20" 
                    : isSnakeSegment 
                      ? "bg-emerald-500/80" 
                      : isFoodItem 
                        ? "bg-rose-500 animate-pulse ring-2 ring-rose-400 shadow-md shadow-rose-500/30" 
                        : "bg-[#0b0c16]/30"
                }`}
              />
            );
          })}
        </div>

        {/* Overlay Overlays for game lifecycle states */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <h3 className="text-sm sm:text-base font-black text-emerald-400 uppercase tracking-widest">{lang === "ar" ? "جاهز للانطلاق؟" : "Ready to Slither?"}</h3>
            <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
              {lang === "ar" 
                ? "استخدم أزرار الأسهم على شاشتك أو لوحة المفاتيح لتوجيه الأفعى واستهداف الفواكه." 
                : "Use arrows on screen or your keyboard Arrow/WASD keys to steer and munch apples."}
            </p>
            <button
              onClick={restartGame}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              {lang === "ar" ? "ابدأ اللعب الآن" : "Start Game"}
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <h3 className="text-base font-black text-rose-500 uppercase tracking-widest">{lang === "ar" ? "انتهت اللعبة!" : "Game Over"}</h3>
            <div className="space-y-1">
              <p className="text-[11px] text-slate-400">{lang === "ar" ? "مجموع نقاطك المحقق" : "Your final score achieved"}</p>
              <p className="text-2xl font-black text-white">{score} 🍎</p>
            </div>
            <button
              onClick={restartGame}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "إعادة المحاولة" : "Try Again"}</span>
            </button>
          </div>
        )}
      </div>

      {/* On-Screen Arrow D-Pad controls for Mobile and touch screen convenience */}
      <div className="w-full max-w-[180px] space-y-2 pb-2">
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (direction !== "DOWN" && gameStarted && !gameOver) {
                setDirection("UP");
                playSynthSound(300, "sine", 0.05);
              }
            }}
            className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 active:scale-90 text-white flex items-center justify-center text-lg font-black transition-all cursor-pointer shadow"
          >
            ▲
          </button>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={() => {
              if (direction !== "RIGHT" && gameStarted && !gameOver) {
                setDirection("LEFT");
                playSynthSound(300, "sine", 0.05);
              }
            }}
            className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 active:scale-90 text-white flex items-center justify-center text-lg font-black transition-all cursor-pointer shadow"
          >
            ◀
          </button>
          <div className="w-12 h-12 bg-slate-950/40 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-500">
            PAD
          </div>
          <button
            onClick={() => {
              if (direction !== "LEFT" && gameStarted && !gameOver) {
                setDirection("RIGHT");
                playSynthSound(300, "sine", 0.05);
              }
            }}
            className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 active:scale-90 text-white flex items-center justify-center text-lg font-black transition-all cursor-pointer shadow"
          >
            ▶
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (direction !== "UP" && gameStarted && !gameOver) {
                setDirection("DOWN");
                playSynthSound(300, "sine", 0.05);
              }
            }}
            className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 active:scale-90 text-white flex items-center justify-center text-lg font-black transition-all cursor-pointer shadow"
          >
            ▼
          </button>
        </div>
      </div>

    </div>
  );
}

/* ==========================================
   2. TIC-TAC-TOE INTERACTIVE COMPONENT ENGINE
   ========================================== */
interface TicTacToeProps {
  lang: "ar" | "en";
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
  updateHighScore: (score: number) => void;
  highScore: number;
}

function TicTacToeEngine({ lang, playSynthSound, updateHighScore, highScore }: TicTacToeProps) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [vsAI, setVsAI] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null); // "X", "O", "Draw"
  const [winsCount, setWinsCount] = useState<number>(0);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (squares: (string | null)[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(s => s !== null)) {
      return "Draw";
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    playSynthSound(400, "sine", 0.08);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      handleGameEnd(gameWinner);
    } else {
      setIsXNext(!isXNext);
    }
  };

  // AI Logic to automatically make a step
  useEffect(() => {
    if (vsAI && !isXNext && !winner) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, vsAI, winner]);

  const makeAIMove = () => {
    // 1. Try to win
    let move = findBestIndexFor("O");
    // 2. Try to block player
    if (move === -1) move = findBestIndexFor("X");
    // 3. Take center if free
    if (move === -1 && board[4] === null) move = 4;
    // 4. Random move
    if (move === -1) {
      const available = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
      if (available.length > 0) {
        move = available[Math.floor(Math.random() * available.length)];
      }
    }

    if (move !== -1) {
      const newBoard = [...board];
      newBoard[move] = "O";
      setBoard(newBoard);
      playSynthSound(480, "sine", 0.08);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        handleGameEnd(gameWinner);
      } else {
        setIsXNext(true);
      }
    }
  };

  const findBestIndexFor = (player: string) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const vals = [board[a], board[b], board[c]];
      const playerCount = vals.filter(v => v === player).length;
      const nullCount = vals.filter(v => v === null).length;
      if (playerCount === 2 && nullCount === 1) {
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }
    return -1;
  };

  const handleGameEnd = (gameWinner: string) => {
    setWinner(gameWinner);
    if (gameWinner === "X") {
      playSynthSound(587.33, "sine", 0.15);
      playSynthSound(783.99, "sine", 0.3, 0.12);
      setWinsCount(w => {
        const nextWins = w + 1;
        updateHighScore(nextWins);
        return nextWins;
      });
    } else if (gameWinner === "O") {
      playSynthSound(150, "sawtooth", 0.35);
    } else {
      playSynthSound(250, "triangle", 0.25);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
    playSynthSound(440, "sine", 0.1);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 flex flex-col items-center">
      
      {/* Game Mode Selector */}
      <div className="flex bg-slate-950/80 border border-slate-900 rounded-2xl p-1 w-full max-w-[280px]">
        <button
          onClick={() => {
            setVsAI(true);
            setWinsCount(0);
            resetGame();
          }}
          className={`flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
            vsAI 
              ? "bg-rose-600 text-white" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          {lang === "ar" ? "ضد الذكاء الاصطناعي" : "VS Intelligent AI"}
        </button>
        <button
          onClick={() => {
            setVsAI(false);
            setWinsCount(0);
            resetGame();
          }}
          className={`flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
            !vsAI 
              ? "bg-rose-600 text-white" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          {lang === "ar" ? "لاعبين محلي" : "Local 2 Player"}
        </button>
      </div>

      {/* Game Stats */}
      <div className="w-full flex items-center justify-between px-2 text-xs font-bold text-slate-300">
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-rose-400" />
          <span>{lang === "ar" ? "مرات الفوز" : "Total Wins"}: <strong className="text-white text-sm font-black">{winsCount}</strong></span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>{lang === "ar" ? "أعلى رقم" : "Record"}: <strong className="text-white text-sm font-black">{highScore}</strong></span>
        </div>
      </div>

      {/* Interactive Tic-Tac-Toe Grid Screen */}
      <div className="w-full aspect-square max-w-[280px] bg-[#030408] border-2 border-slate-900 rounded-3xl p-3 grid grid-cols-3 grid-rows-3 gap-3 relative overflow-hidden shadow-inner">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            disabled={cell !== null || !!winner || (vsAI && !isXNext)}
            className={`rounded-2xl border flex items-center justify-center transition-all duration-200 cursor-pointer text-2xl sm:text-3xl font-black ${
              cell === "X" 
                ? "bg-rose-600/10 border-rose-500/30 text-rose-500 shadow-inner" 
                : cell === "O" 
                  ? "bg-indigo-600/10 border-indigo-500/30 text-indigo-400 shadow-inner" 
                  : "bg-[#0b0c16]/30 border-slate-900/60 hover:bg-[#0b0c16]/60 hover:border-slate-800"
            }`}
          >
            {cell}
          </button>
        ))}

        {/* Dynamic Game End Announcement Overlay */}
        {winner && (
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
            <h3 className="text-sm font-black text-rose-400 uppercase tracking-wider">
              {winner === "Draw" 
                ? (lang === "ar" ? "تعادل مذهل!" : "It's a Draw!") 
                : (lang === "ar" ? `اللاعب (${winner}) انتصر!` : `Winner: Player (${winner})!`)}
            </h3>
            
            <p className="text-[10px] text-slate-400 max-w-[180px] leading-relaxed">
              {winner === "X" && vsAI && (lang === "ar" ? "رائع! لقد تغلبت على خوارزمية الذكاء الاصطناعي." : "Brilliant! You defeated our core AI engine.")}
              {winner === "O" && vsAI && (lang === "ar" ? "أوه، لا تقلق! الخوارزمية ذكية جداً، حاول مجدداً." : "Oh! The AI outsmarted you, try blocking its vectors.")}
            </p>

            <button
              onClick={resetGame}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "جولة جديدة" : "Next Round"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Current Turn display */}
      {!winner && (
        <p className="text-[11px] text-slate-400 font-bold">
          {lang === "ar" ? "الدور الآن على" : "Current Turn"}: <strong className="text-white">{isXNext ? (lang === "ar" ? "اللاعب X (أنت)" : "Player X (You)") : (vsAI ? (lang === "ar" ? "الذكاء الاصطناعي" : "AI Controller") : (lang === "ar" ? "اللاعب O" : "Player O"))}</strong>
        </p>
      )}

    </div>
  );
}

/* ==========================================
   3. COSMIC MEMORY MATCH COMPONENT ENGINE
   ========================================== */
interface MemoryGameProps {
  lang: "ar" | "en";
  playSynthSound: (freq: number, type?: OscillatorType, duration?: number, delay?: number) => void;
  updateHighScore: (score: number) => void;
  highScore: number;
}

interface CardItem {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MemoryGameEngine({ lang, playSynthSound, updateHighScore, highScore }: MemoryGameProps) {
  const symbols = ["🎮", "🚀", "👾", "👑", "💎", "⚡"];
  
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [victory, setVictory] = useState<boolean>(false);

  // Initialize and shuffle deck
  const initializeDeck = () => {
    const deck = [...symbols, ...symbols]
      .map((sym, idx) => ({
        id: idx,
        symbol: sym,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setSelectedIndices([]);
    setMoves(0);
    setSeconds(0);
    setVictory(false);
    setGameActive(true);
    playSynthSound(440, "sine", 0.1);
  };

  // Stopwatch timer
  useEffect(() => {
    if (!gameActive || victory) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameActive, victory]);

  const handleCardClick = (index: number) => {
    if (!gameActive || cards[index].isFlipped || cards[index].isMatched || selectedIndices.length >= 2) return;

    playSynthSound(350, "sine", 0.05);
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelections = [...selectedIndices, index];
    setSelectedIndices(newSelections);

    if (newSelections.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newSelections;
      
      if (cards[firstIdx].symbol === cards[secondIdx].symbol) {
        // Matched!
        setTimeout(() => {
          playSynthSound(600, "sine", 0.15);
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards(newCards);
          setSelectedIndices([]);

          // Check if all matched
          if (newCards.every(c => c.isMatched)) {
            handleVictory();
          }
        }, 300);
      } else {
        // Mismatch - Flip back over
        setTimeout(() => {
          playSynthSound(200, "sine", 0.15);
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
          setSelectedIndices([]);
        }, 800);
      }
    }
  };

  const handleVictory = () => {
    setVictory(true);
    playSynthSound(523.25, "sine", 0.15);
    playSynthSound(659.25, "sine", 0.15, 0.12);
    playSynthSound(783.99, "sine", 0.3, 0.24);
    
    // Save fastest completion time
    updateHighScore(seconds);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 flex flex-col items-center">
      
      {/* Game Header Metrics */}
      <div className="w-full flex items-center justify-between px-2 text-xs font-bold text-slate-300">
        <div className="flex items-center gap-1.5">
          <Timer className="w-4 h-4 text-indigo-400" />
          <span>{lang === "ar" ? "الوقت" : "Time"}: <strong className="text-white text-sm font-black">{seconds}s</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <RotateCcw className="w-4 h-4 text-amber-500" />
          <span>{lang === "ar" ? "المحاولات" : "Moves"}: <strong className="text-white text-sm font-black">{moves}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-rose-500" />
          <span>{lang === "ar" ? "أسرع وقت" : "Record"}: <strong className="text-white text-sm font-black">{highScore > 0 ? `${highScore}s` : "—"}</strong></span>
        </div>
      </div>

      {/* Grid Canvas Screen */}
      <div className="w-full relative min-h-[280px] bg-[#030408] border-2 border-slate-900 rounded-3xl p-4 flex items-center justify-center">
        {gameActive ? (
          <div className="grid grid-cols-4 gap-3 w-full h-full">
            {cards.map((card, idx) => {
              const showSymbol = card.isFlipped || card.isMatched;
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`aspect-square rounded-2xl flex items-center justify-center font-bold text-2xl transition-all duration-300 cursor-pointer ${
                    showSymbol 
                      ? "bg-indigo-600/20 border border-indigo-500/40 text-white rotate-0" 
                      : "bg-[#0b0c16] border border-slate-900 hover:border-indigo-500/20 text-indigo-400 -rotate-3 hover:scale-105"
                  }`}
                >
                  {showSymbol ? card.symbol : "❓"}
                </button>
              );
            })}
          </div>
        ) : (
          /* Start Overlay state */
          <div className="text-center space-y-4 py-6">
            <Brain className="w-12 h-12 text-indigo-400 mx-auto animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white">{lang === "ar" ? "تحدي الذاكرة الفائقة" : "Cosmic Memory Challenge"}</h3>
              <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                {lang === "ar" ? "ابحث عن الكروت الثنائية المتطابقة بأسرع وقت وأقل خطوات ممكنة لتسجيل رقم قياسي." : "Find all matching card emoji pairs in the shortest time and click moves."}
              </p>
            </div>
            <button
              onClick={initializeDeck}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              {lang === "ar" ? "ابدأ التحدي" : "Start Match"}
            </button>
          </div>
        )}

        {/* Victory Screen */}
        {victory && (
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
            <Trophy className="w-12 h-12 text-amber-500 animate-pulse" />
            <div className="space-y-1">
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest">{lang === "ar" ? "تهانينا! فوز مذهل" : "Outstanding Victory!"}</h3>
              <p className="text-xs text-slate-400">
                {lang === "ar" 
                  ? `أنهيت اللعبة في ${seconds} ثانية بـ ${moves} محاولة.` 
                  : `Matched all cards in ${seconds}s with just ${moves} moves.`}
              </p>
            </div>
            <button
              onClick={initializeDeck}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "تحدي جديد" : "Play Again"}</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

// =========================================================
// SMART ARABIC GRAMMAR ENGINE (لعبة مختبر النحو العربي الذكي)
// =========================================================
interface GrammarQuestion {
  categoryAr: string;
  categoryEn: string;
  questionAr: string;
  questionEn: string;
  optionsAr: string[];
  optionsEn: string[];
  answerIndex: number;
  explanationAr: string;
  explanationEn: string;
  difficulty: "easy" | "medium" | "hard";
}

interface GrammarEngineProps {
  lang: "ar" | "en";
  playSynthSound: (frequency: number, type?: OscillatorType, duration?: number, delay?: number) => void;
  updateHighScore: (score: number) => void;
  highScore: number;
}

const MOTIVATIONAL_SUCCESS_AR = [
  "أحسنت! قواعدك النحوية متينة كالذهب ✨",
  "عبقري! إجابة سديدة وإعراب متقن 🌟",
  "رائع! لغتك العربية فصيحة وممتازة! 👏",
  "أصبت! فطن وذكي في لغة الضاد 💫"
];

const MOTIVATIONAL_SUCCESS_EN = [
  "Excellent! Your grammar skills are solid as gold ✨",
  "Genius! Accurate parsing and superb logic 🌟",
  "Wonderful! Your Arabic language style is eloquent 👏",
  "Spot on! Clever mastery of the Arabic tongue 💫"
];

const MOTIVATIONAL_FAIL_AR = [
  "لا بأس، النحو يحتاج لتأمل وتركيز! 📚",
  "قريباً ستتقنها، اقرأ الشرح النحوي بالأسفل 👇",
  "خطأ بسيط، النحو يُبنى بالفهم والممارسة 💪",
  "حاول مجدداً، التعلم من الخطأ هو سر الذكاء 🧠"
];

const MOTIVATIONAL_FAIL_EN = [
  "No worries, grammar needs a bit of reflection! 📚",
  "You'll master it soon! Read the detailed explanation below 👇",
  "A small slip! Grammar is built on practice and logic 💪",
  "Try again! Learning from mistakes is the secret to mastery 🧠"
];

const GRAMMAR_RULES = [
  {
    titleAr: "المرفوعات من الأسماء",
    titleEn: "Nominative Case (Al-Marfoo'at)",
    contentAr: "الأسماء المرفوعة تشمل: المبتدأ والخبر في الجملة الاسمية، والفاعل ونائب الفاعل في الجملة الفعلية، واسم كان وأخواتها، وخبر إن وأخواتها. وتكون علامة الرفع الأصلية هي الضمة الظاهرة أو المقدرة، والفرعية كالألف للمثنى والواو لجمع المذكر السالم والأسماء الخمسة.",
    contentEn: "Nominative nouns include: Subject (Mubtada') & Predicate (Khabar) in nominal sentences, Subject (Fa'il) & Passive Subject (Na'ib Fa'il) in verbal sentences, Subject of Kana, and Predicate of Ina. The primary marker is Dammah, secondary markers are Alif (dual) and Waw (plural masculine / five nouns).",
    exampleAr: "المعلمُ مخلصٌ - جاءَ الأخوانِ - كانَ الجوُّ بارداً.",
    exampleEn: "The teacher is sincere - The two brothers came - The weather was cold."
  },
  {
    titleAr: "المنصوبات من الأسماء",
    titleEn: "Accusative Case (Al-Mansoobat)",
    contentAr: "الأسماء المنصوبة تشمل: المفاعيل (مفعول به، مفعول مطلق، مفعول لأجله، مفعول فيه/ظرف)، والحال، والتمييز، واسم إن وأخواتها، وخبر كان وأخواتها. وعلامة النصب الأصلية هي الفتحة، والفرعية كالكسرة لجمع المؤنث السالم، والياء للمثنى وجمع المذكر السالم، والألف للأسماء الخمسة.",
    contentEn: "Accusative nouns include: Objects (Direct, Absolute, Purpose, Adverbials), Hal (state/circumstance), Tamyiz (specification), Subject of Ina, and Predicate of Kana. Primary marker is Fathah, secondary markers are Kasrah (fem. plural), Yaa (dual/masc. plural), and Alif (five nouns).",
    exampleAr: "رأيتُ أباكَ - كرمتُ الطالباتِ - انطلقَ القطارُ مسرعاً.",
    exampleEn: "I saw your father - I honored the female students - The train launched quickly."
  },
  {
    titleAr: "النواسخ (كان وإن وأخواتها)",
    titleEn: "Sentence Changers (Nawasikh)",
    contentAr: "أولاً: «كان وأخواتها» أفعال ناقصة ناسخة تدخل على الجملة الاسمية، فترفع المبتدأ ويسمى اسمها وتنصب الخبر ويسمى خبرها. ثانياً: «إن وأخواتها» حروف مشبهة بالفعل، تدخل على الجملة الاسمية فتنصب المبتدأ ويسمى اسمها وترفع الخبر ويسمى خبرها.",
    contentEn: "1) Kana and its sisters are defective verbs that enter nominal sentences: they raise the subject (as its name) and set the predicate in accusative. 2) Ina and its sisters are particles that do the opposite: they set the subject in accusative and raise the predicate.",
    exampleAr: "كان الامتحانُ سهلاً (سهلاً: خبر كان منصوب) | إنَّ المعلمينَ مخلصونَ (المعلمين: اسم إن منصوب بالياء).",
    exampleEn: "The exam was easy (easy = Kana predicate) | Verily the teachers are sincere (teachers = Ina subject)."
  },
  {
    titleAr: "الأفعال الخمسة وإعرابها",
    titleEn: "The Five Verbs (Al-Af'aal Al-Khamsah)",
    contentAr: "هي كل فعل مضارع اتصلت به ألف الاثنين، أو واو الجماعة، أو ياء المخاطبة. تُرفع الأفعال الخمسة بثبوت النون في آخرها، وتُنصب وتُجزم بحذف النون.",
    contentEn: "These are present tense verbs connected with the dual Alif, plural Waw, or feminine second-person Yaa. They are raised by retaining the 'Noon' at the end, and are accusative/jussive by deleting the 'Noon'.",
    exampleAr: "الطلابُ يكتبونَ واجبهم (مرفوع بثبوت النون) | لم يهملوا أعمالهم (مجزوم بحذف النون).",
    exampleEn: "Students write their homework (raised with Noon) | They did not neglect their work (jussive by deleting Noon)."
  }
];

const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    categoryAr: "الجملة الاسمية",
    categoryEn: "The Nominal Sentence",
    questionAr: "«العِلْمُ نُورٌ» - إعراب كلمة «نُورٌ» هو:",
    questionEn: "What is the parsing of 'نُورٌ' in the sentence 'العِلْمُ نُورٌ'?",
    optionsAr: ["خبر مرفوع وعلامة رفعه الضمة", "مبتدأ مؤخر مرفوع بالضمة", "فاعل مرفوع وعلامة رفعه الضمة", "مفعول به منصوب وعلامة نصبه الفتحة"],
    optionsEn: ["Predicate (Khabar) Nominative with Dammah", "Delayed Subject (Mubtada') Nominative", "Subject (Fa'il) Nominative with Dammah", "Direct Object Accusative with Fathah"],
    answerIndex: 0,
    explanationAr: "في الجملة الاسمية، المبتدأ هو الاسم المتحدّث عنه «العلمُ»، والخبر هو الجزء الذي يتمم معنى المبتدأ ويخبرنا بحاله «نورٌ»، لذا تعرب كلمة «نورٌ» خبراً مرفوعاً بالضمة الظاهرة.",
    explanationEn: "In a nominal sentence (Jumla Ismiyya), the subject (Mubtada') is 'العلم', and the predicate (Khabar) is 'نور' because it completes the meaning of the subject. Thus, it is parsed as Predicate Nominative with a Dammah.",
    difficulty: "easy"
  },
  {
    categoryAr: "النواسخ (كان وأخواتها)",
    categoryEn: "Kana and its Sisters",
    questionAr: "«كانَ الامتحانُ سهلاً.» - ما هو عمل فعل «كانَ» في الجملة؟",
    questionEn: "What does the verb 'كان' do in the sentence?",
    optionsAr: ["يرفع المبتدأ وينصب الخبر", "ينصب المبتدأ ويرفع الخبر", "ينصب المبتدأ والخبر معاً", "يجزم الفعل المضارع بالسكون"],
    optionsEn: ["Raises the subject and sets the predicate in accusative", "Sets the subject in accusative and raises the predicate", "Sets both subject and predicate in accusative", "Jussives the present tense verb with Sukoon"],
    answerIndex: 0,
    explanationAr: "«كانَ» وأخواتها هي أفعال ناسخة ناقصة تدخل على الجملة الاسمية، فترفع المبتدأ ويسمى اسمها (الامتحانُ) وتنصب الخبر ويسمى خبرها (سهلاً).",
    explanationEn: "'كان' and its sisters are incomplete-nullifying verbs (Nawasikh) that enter nominal sentences; they raise the subject as its noun (Al-Imtihanu) and place the predicate in accusative (Sahlan).",
    difficulty: "easy"
  },
  {
    categoryAr: "النواسخ (إن وأخواتها)",
    categoryEn: "Ina and its Sisters",
    questionAr: "«إنَّ المعلمينَ مخلصونَ» - علامة نصب اسم «إنَّ» في هذه الجملة هي:",
    questionEn: "What is the accusative marker of Ina's subject 'المعلمين'?",
    optionsAr: ["الياء لأنه جمع مذكر سالم", "الفتحة الظاهرة على آخره", "الكسرة نيابة عن الفتحة", "الألف لأنه من الأسماء الخمسة"],
    optionsEn: ["Yaa because it is a sound masculine plural", "Fathah visible on the end", "Kasrah instead of Fathah", "Alif because it is one of the five nouns"],
    answerIndex: 0,
    explanationAr: "«إنَّ» حرف ناسخ ينصب المبتدأ ويرفع الخبر. واسمها هنا هو «المعلمينَ» وهو جمع مذكر سالم، وجمع المذكر السالم يُنصب وعلامة نصبه الياء.",
    explanationEn: "'إنَّ' is an accusative particle that nullifies. Its subject here is 'المعلمين', which is a sound masculine plural, and the accusative marker for sound masculine plurals is Yaa.",
    difficulty: "medium"
  },
  {
    categoryAr: "الأسماء الخمسة",
    categoryEn: "The Five Nouns",
    questionAr: "«رأيتُ أخاكَ يقرأُ كتاباً.» - كلمة «أخاكَ» منصوبة وعلامة نصبها:",
    questionEn: "What is the accusative marker for the word 'أخاكَ'?",
    optionsAr: ["الألف لأنه من الأسماء الخمسة", "الفتحة الظاهرة على آخره", "الياء لأنه مثنى مذكر", "الفتحة المقدرة منع من ظهورها الثقل"],
    optionsEn: ["Alif because it is one of the Five Nouns", "Fathah visible on its end", "Yaa because it is dual masculine", "Estimated Fathah due to vocal weight"],
    answerIndex: 0,
    explanationAr: "«أخاكَ» مفعول به منصوب وعلامة نصبه الألف لأنه من الأسماء الخمسة وهو مضاف، والكاف ضمير متصل في محل جر مضاف إليه. الأسماء الخمسة تُرفع بالواو وتُنصب بالألف وتُجر بالياء.",
    explanationEn: "'أخاكَ' is a direct object in accusative. Its marker is Alif because it belongs to the Five Nouns, which are raised by Waw, accused by Alif, and genitived by Yaa.",
    difficulty: "medium"
  },
  {
    categoryAr: "الأفعال المضارعة",
    categoryEn: "Present Tense Verbs",
    questionAr: "«لم يلدْ ولم يولدْ» - حالة جزم الفعل المضارع «يلدْ» هي وعلامتها:",
    questionEn: "What is the jussive status and marker for 'يلدْ'?",
    optionsAr: ["مجزوم وعلامة جزمه السكون الظاهر", "مرفوع وعلامة رفعه الضمة المقدرة", "مجزوم وعلامة جزمه حذف حرف العلة", "منصوب وعلامة نصبه الفتحة الظاهرة"],
    optionsEn: ["Jussive with visible Sukoon marker", "Nominative with estimated Dammah", "Jussive by deleting the weak letter", "Accusative with visible Fathah"],
    answerIndex: 0,
    explanationAr: "حرف «لم» هو أداة جزم ونفي وقلب تدخل على الفعل المضارع وتجزمه. وحيث أن الفعل «يلد» صحيح الآخر، فإن علامة جزمه هي السكون الظاهر على آخره.",
    explanationEn: "The particle 'لم' is a jussive/negating particle. Since the verb 'يلد' has a sound ending (not weak), its jussive marker is the visible Sukoon on its end.",
    difficulty: "easy"
  },
  {
    categoryAr: "الفعل المعتل الآخر",
    categoryEn: "Defective/Weak Verbs",
    questionAr: "«يسعى المؤمنُ في فعل الخيرِ» - علامة رفع الفعل «يسعى» هي:",
    questionEn: "What is the nominative marker for the verb 'يسعى'?",
    optionsAr: ["الضمة المقدرة للتعذر", "الضمة الظاهرة على آخره", "ثبوت النون في آخره", "الفتحة المقدرة للثقل"],
    optionsEn: ["Estimated Dammah due to impossibility (Ta'azzur)", "Visible Dammah on the end", "Retention of the Noon at the end", "Estimated Fathah due to weight (Thiqal)"],
    answerIndex: 0,
    explanationAr: "الفعل المضارع «يسعى» معتل الآخر بالألف المفتوح ما قبلها. ويُرفع بالضمة المقدرة على الألف منع من ظهورها التعذر (أي استحالة نطق الحركة على الألف).",
    explanationEn: "The present verb 'يسعى' ends with a weak Alif. It is raised with an estimated Dammah because it is impossible (Ta'azzur) to pronounce a vowel marker on an Alif.",
    difficulty: "hard"
  },
  {
    categoryAr: "جمع المؤنث السالم",
    categoryEn: "Sound Feminine Plural",
    questionAr: "«كرّمَتِ المديرةُ الطالباتِ المتفوقاتِ» - علامة نصب كلمة «الطالباتِ» هي:",
    questionEn: "What is the accusative marker for the word 'الطالباتِ'?",
    optionsAr: ["الكسرة نيابة عن الفتحة", "الفتحة الظاهرة على آخره", "الياء لأنه جمع مذكر", "السكون الظاهر على آخره"],
    optionsEn: ["Kasrah instead of Fathah", "Visible Fathah on the end", "Yaa because it is masculine plural", "Visible Sukoon on the end"],
    answerIndex: 0,
    explanationAr: "كلمة «الطالباتِ» مفعول به منصوب. وحيث أنه جمع مؤنث سالم (ينتهي بألف وتاء زائدتين)، فإن علامة نصبه الفرعية هي الكسرة نيابة عن الفتحة.",
    explanationEn: "'الطالباتِ' is a direct object. Since it is a sound feminine plural, its accusative marker is the sub-marker Kasrah instead of Fathah.",
    difficulty: "medium"
  },
  {
    categoryAr: "الأسماء الموصولة والمثنى",
    categoryEn: "Relative Nouns & Duals",
    questionAr: "«جاءَ اللذانِ نجحا في الاختبار» - كلمة «اللذانِ» فاعل مرفوع وعلامة رفعه:",
    questionEn: "What is the nominative marker for the word 'اللذانِ'?",
    optionsAr: ["الألف لأنه يعرب إعراب المثنى", "الضمة المقدرة على آخره", "ثبوت النون لأنه من الأفعال الخمسة", "مبني على الكسر في محل رفع فاعل"],
    optionsEn: ["Alif because it is parsed as a dual", "Estimated Dammah on the end", "Retention of Noon because of five verbs", "Built on Kasrah in nominative state"],
    answerIndex: 0,
    explanationAr: "الأسماء الموصولة كلها مبنية عدا (اللذان واللتان) فإنهما يُعربان إعراب المثنى؛ يرفعان بالألف وينصبان ويجران بالياء. وهنا فاعل مرفوع وعلامة رفعه الألف.",
    explanationEn: "All relative pronouns in Arabic are static (Mabni) except 'اللذان' and 'اللتان', which behave like duals. They are raised by Alif and accused/genitived by Yaa.",
    difficulty: "hard"
  },
  {
    categoryAr: "أدوات الجزم والنحو",
    categoryEn: "Jussive Particles",
    questionAr: "«لا تنهَ عن خلقٍ وتأتيَ مثله» - علامة جزم الفعل «تنهَ» في الجملة هي:",
    questionEn: "What is the jussive marker for the verb 'تنهَ'?",
    optionsAr: ["حذف حرف العلة من آخره", "السكون الظاهر على آخره", "حذف النون من آخره", "الفتحة الظاهرة على النون"],
    optionsEn: ["Deleting the weak letter at the end", "Visible Sukoon on the end", "Deleting the Noon from the end", "Visible Fathah on the Noon"],
    answerIndex: 0,
    explanationAr: "الفعل المضارع «تنهَ» أصله «تنهى» (معتل الآخر بالألف)، ودخلت عليه «لا» الناهية الجازمة، فتم جزمه وعلامة الجزم هي حذف حرف العلة من آخره، والفتحة على الهاء هي دليل على الألف المحذوفة.",
    explanationEn: "The verb 'تنهَ' is originally 'تنهى' (ending with weak Alif). Since it is preceded by the forbidding 'لا', it is jussived by deleting the weak ending letter.",
    difficulty: "medium"
  },
  {
    categoryAr: "المنادى وأحكامه",
    categoryEn: "The Vocative (Munada)",
    questionAr: "«يا طالبَ العلمِ اجتهدْ» - ما نوع المنادى وحكمه الإعرابي هنا؟",
    questionEn: "What is the type and ruling of the vocative 'طالبَ العلمِ'?",
    optionsAr: ["منادى مضاف حكمه النصب بالفتحة", "منادى شبيه بالمضاف حكمه الرفع", "نكرة مقصودة مبنية في محل نصب", "علم مفرد مبني على الضم"],
    optionsEn: ["An Annexed Vocative (Mudaf) ruled as Accusative", "Similar to Annexed ruled as Nominative", "Intended Indefinite static in accusative position", "Single Proper noun static on Dammah"],
    answerIndex: 0,
    explanationAr: "المنادى هنا هو «طالبَ العلمِ»، وقد جاء مضافاً (طالب) ومضافاً إليه (العلم). والمنادى المضاف حكمه النصب دائماً، لذا «طالبَ» منادى منصوب وعلامة نصبه الفتحة.",
    explanationEn: "The vocative here is 'طالبَ العلمِ', which is structured as Annexed (Mudaf). The annexed vocative is always in the accusative case (Mansoub), hence 'طالبَ' is accused with Fathah.",
    difficulty: "medium"
  },
  {
    categoryAr: "الممنوع من الصرف",
    categoryEn: "Diptotes (Mamnood' min Al-Sarf)",
    questionAr: "«صليتُ في مساجدَ أثريةٍ» - كلمة «مساجدَ» مجرورة بالفتحة لأنها:",
    questionEn: "Why is the word 'مساجدَ' genitived with Fathah?",
    optionsAr: ["ممنوعة من الصرف على صيغة منتهى الجموع", "اسم مجرور وعلامة جره الكسرة المقدرة", "جمع مؤنث سالم ينصب بالفتحة", "ملحقة بالمثنى المرفوع بالألف"],
    optionsEn: ["Diptote because of Ultimate Plural Form (Muntaha Al-Jumoo')", "Genitived with estimated Kasrah", "Sound feminine plural accused with Fathah", "Dual adjunct raised with Alif"],
    answerIndex: 0,
    explanationAr: "كلمة «مساجدَ» على صيغة منتهى الجموع (مفاعل)، وهي ممنوعة من الصرف (التنوين). وتُجر الممنوعات من الصرف بالفتحة نيابة عن الكسرة بشرط ألا تُضاف أو تُعرف بأل.",
    explanationEn: "'مساجدَ' is on the ultimate plural form 'Muntaha Al-Jumoo'' (Mafa'eel). Diptotes are genitived with a Fathah instead of Kasrah as long as they are not defined with 'Al' or annexed.",
    difficulty: "hard"
  },
  {
    categoryAr: "الحال والتمييز",
    categoryEn: "Hal (State/Circumstance)",
    questionAr: "«انطلقَ القطارُ مسرعاً» - إعراب كلمة «مسرعاً» في الجملة هو:",
    questionEn: "What is the parsing of the word 'مسرعاً'?",
    optionsAr: ["حال منصوبة وعلامة نصبها الفتحة", "تمييز منصوب وعلامة نصبه الفتحة", "مفعول به منصوب وعلامة نصبه الفتحة", "مفعول لأجله منصوب وعلامة نصبه الفتحة"],
    optionsEn: ["Hal (State) Accusative with Fathah", "Tamyiz (Specification) Accusative with Fathah", "Direct Object Accusative with Fathah", "Object of Purpose Accusative with Fathah"],
    answerIndex: 0,
    explanationAr: "كلمة «مسرعاً» هي نكرة مشتقة منصوبة جاءت لتبين هيئة الفاعل (القطار) وقت حدوث الفعل، ويصح وقوعها جواباً لسؤال «كيف انطلق القطار؟»، لذا تُعرب حالاً منصوبة.",
    explanationEn: "'مسرعاً' is an indefinite derivative noun in the accusative case that clarifies the state of the subject ('Al-Qitar') at the time of the action, hence parsed as Hal.",
    difficulty: "easy"
  }
];

export function GrammarGameEngine({ lang, playSynthSound, updateHighScore, highScore }: GrammarEngineProps) {
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"quiz" | "rules">("quiz");
  
  // High score tracking for this session
  const [sessionHighScore, setSessionHighScore] = useState<number>(highScore);

  // Stats for review after game over
  const [history, setHistory] = useState<{
    questionText: string;
    selectedText: string;
    correctText: string;
    wasCorrect: boolean;
    explanationText: string;
  }[]>([]);

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setHistory([]);
    setGameActive(true);
    playSynthSound(523.25, "sine", 0.15); // C5
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered || !gameActive) return;
    
    setSelectedIdx(idx);
    setIsAnswered(true);
    
    const question = GRAMMAR_QUESTIONS[currentIdx];
    const correct = idx === question.answerIndex;
    setIsCorrect(correct);
    setShowExplanation(true);

    // Track response history
    setHistory(prev => [...prev, {
      questionText: lang === "ar" ? question.questionAr : question.questionEn,
      selectedText: lang === "ar" ? question.optionsAr[idx] : question.optionsEn[idx],
      correctText: lang === "ar" ? question.optionsAr[question.answerIndex] : question.optionsEn[question.answerIndex],
      wasCorrect: correct,
      explanationText: lang === "ar" ? question.explanationAr : question.explanationEn
    }]);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      // Score calculation
      const bonus = Math.min((newStreak - 1) * 2, 10);
      const points = 10 + bonus;
      const newScore = score + points;
      setScore(newScore);

      // Play success synth sound (uplifting major chord)
      playSynthSound(523.25, "sine", 0.1); // C5
      setTimeout(() => playSynthSound(659.25, "sine", 0.15), 80); // E5
      setTimeout(() => playSynthSound(783.99, "sine", 0.25), 160); // G5
    } else {
      setStreak(0);
      const newLives = lives - 1;
      setLives(newLives);

      // Play fail sound (descending dissonance)
      playSynthSound(300, "sawtooth", 0.2);
      setTimeout(() => playSynthSound(220, "sawtooth", 0.3), 100);
    }
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setIsAnswered(false);
    setShowExplanation(false);

    if (lives <= 0 || currentIdx >= GRAMMAR_QUESTIONS.length - 1) {
      // End game
      setGameActive(false);
      // Save highscore
      if (score > sessionHighScore) {
        setSessionHighScore(score);
        updateHighScore(score);
      }
    } else {
      setCurrentIdx(prev => prev + 1);
      playSynthSound(440, "sine", 0.1); // A4
    }
  };

  const currentQuestion = GRAMMAR_QUESTIONS[currentIdx];
  const totalQuestions = GRAMMAR_QUESTIONS.length;
  const progressPercentage = ((currentIdx + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  // Feedback strings
  const getFeedbackMessage = () => {
    if (isCorrect) {
      const list = lang === "ar" ? MOTIVATIONAL_SUCCESS_AR : MOTIVATIONAL_SUCCESS_EN;
      return list[currentIdx % list.length];
    } else {
      const list = lang === "ar" ? MOTIVATIONAL_FAIL_AR : MOTIVATIONAL_FAIL_EN;
      return list[currentIdx % list.length];
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 flex flex-col">
      
      {/* Mode / Tabs Switcher */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-[#070913] border border-slate-900 rounded-2xl max-w-sm mx-auto">
        <button
          onClick={() => {
            setActiveTab("quiz");
            playSynthSound(400, "sine", 0.05);
          }}
          className={`flex-1 py-2 px-4 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "quiz" 
              ? "bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-md shadow-rose-600/10" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>{lang === "ar" ? "تحدي النحو" : "Grammar Quiz"}</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("rules");
            playSynthSound(400, "sine", 0.05);
          }}
          className={`flex-1 py-2 px-4 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "rules" 
              ? "bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-md shadow-rose-600/10" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lang === "ar" ? "قواعد النحو الذهبية" : "Grammar Rules"}</span>
        </button>
      </div>

      {activeTab === "rules" ? (
        /* Rules Encyclopedia Screen */
        <div className="bg-[#030408] border-2 border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 animate-fade-in w-full">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-black rounded-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "موسوعة القواعد السريعة للطلاب" : "Student's Golden Rules Encyclopedia"}</span>
            </span>
            <h3 className="text-lg font-black text-white">
              {lang === "ar" ? "مختبر دراسة قواعد النحو واللغة" : "Arabic Grammar Fast Handbook"}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {lang === "ar" 
                ? "اقرأ وتأمل في القواعد الأساسية الأربعة لتسهيل حل التحدي وإحراز أعلى النقاط." 
                : "Study these four cornerstone grammar concepts to boost your scores in the active quiz arena."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GRAMMAR_RULES.map((rule, idx) => (
              <div 
                key={idx}
                className="bg-[#0b0c16] border border-slate-900 hover:border-slate-800 p-5 rounded-2xl space-y-3 transition-all text-right"
                dir="rtl"
              >
                <div className="flex items-center gap-2 justify-start">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-black text-white">
                    {lang === "ar" ? rule.titleAr : rule.titleEn}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed text-right">
                  {lang === "ar" ? rule.contentAr : rule.contentEn}
                </p>
                <div className="p-3 bg-[#030408] border border-slate-900 rounded-xl space-y-1">
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{lang === "ar" ? "أمثلة شائعة:" : "Examples:"}</p>
                  <p className="text-xs font-semibold text-emerald-400" dir="rtl">
                    {lang === "ar" ? rule.exampleAr : rule.exampleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setActiveTab("quiz");
                playSynthSound(500, "sine", 0.1);
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
            >
              {lang === "ar" ? "الانتقال إلى اختبار النحو" : "Go to Quiz Mode"}
            </button>
          </div>
        </div>
      ) : (
        /* Active Grammar Quiz Arena */
        <div className="space-y-6 w-full">
          {gameActive ? (
            <div className="space-y-6 animate-fade-in">
              {/* Header metrics */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#030408]/40 border border-slate-900/60 p-4 rounded-2xl text-xs font-bold text-slate-300">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>{lang === "ar" ? "النقاط" : "Score"}: <strong className="text-white text-sm font-black">{score}</strong></span>
                  </div>
                  {streak >= 2 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/20 animate-pulse">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{lang === "ar" ? `متتالي ${streak}` : `Streak ${streak}`}</span>
                    </div>
                  )}
                </div>

                {/* Progress display */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span>{lang === "ar" ? "السؤال" : "Question"}: <strong className="text-white font-black">{currentIdx + 1}/{totalQuestions}</strong></span>
                  <div className="w-24 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Hearts / Lives */}
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, idx) => (
                    <Heart 
                      key={idx} 
                      className={`w-4 h-4 transition-all ${
                        idx < lives ? "text-rose-500 fill-rose-500 scale-100" : "text-slate-800 scale-90"
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* Quiz Canvas Screen */}
              <div className="bg-[#030408] border-2 border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden w-full">
                <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-600/10 text-indigo-400 text-[10px] font-black rounded-bl-xl border-l border-b border-slate-900">
                  {lang === "ar" ? currentQuestion.categoryAr : currentQuestion.categoryEn}
                </div>

                {/* Question panel */}
                <div className="space-y-4 pt-2">
                  <span className="px-2 py-0.5 bg-slate-900 text-slate-400 text-[10px] font-bold rounded">
                    {lang === "ar" ? "سؤال إعرابي متقدم" : "Grammatical parsing task"}
                  </span>
                  
                  {/* Large Stylized Arabic Sentence Box */}
                  <div className="p-4 sm:p-6 bg-[#070913] border border-slate-900 rounded-2xl flex items-center justify-center text-center shadow-inner relative">
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-slate-950 text-[9px] font-black text-rose-500 border border-slate-900 rounded">
                      {lang === "ar" ? "تأمل التشكيل والجملة" : "Focus on diacritics"}
                    </div>
                    <h4 className="text-base sm:text-xl font-extrabold text-white leading-relaxed font-sans tracking-wide">
                      {lang === "ar" ? currentQuestion.questionAr : currentQuestion.questionEn}
                    </h4>
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" dir={lang === "ar" ? "rtl" : "ltr"}>
                  {(lang === "ar" ? currentQuestion.optionsAr : currentQuestion.optionsEn).map((option, idx) => {
                    const isSelected = selectedIdx === idx;
                    const isCorrectAnswer = idx === currentQuestion.answerIndex;
                    
                    let btnStyle = "bg-[#0b0c16] border-slate-900 text-slate-200 hover:border-slate-800 hover:bg-[#0f1020]";
                    if (isAnswered) {
                      if (isCorrectAnswer) {
                        btnStyle = "bg-emerald-600/20 border-emerald-500 text-emerald-300";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-600/20 border-rose-500 text-rose-300";
                      } else {
                        btnStyle = "bg-slate-950/30 border-slate-950 text-slate-500 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(idx)}
                        className={`p-4 text-xs sm:text-sm font-black rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle} text-right`}
                      >
                        <span className="flex-grow">{option}</span>
                        {isAnswered && isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {isAnswered && isSelected && !isCorrectAnswer && <X className="w-4 h-4 text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Pedagogical Explanation Box */}
                {showExplanation && (
                  <div className="p-4 rounded-2xl bg-[#070913] border-l-4 border-indigo-500 space-y-3 animate-fade-in text-right" dir="rtl">
                    <div className="flex items-center gap-2 justify-start">
                      {isCorrect ? (
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] font-black font-mono">✓</span>
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-[10px] font-black font-mono">✗</span>
                      )}
                      <h5 className={`text-xs sm:text-sm font-black ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                        {getFeedbackMessage()}
                      </h5>
                    </div>

                    <div className="text-xs text-slate-400 leading-relaxed space-y-1">
                      <p className="font-bold text-slate-300">{lang === "ar" ? "💡 الشرح القاعدي المفصل:" : "💡 Grammatical Base Rule:"}</p>
                      <p>{lang === "ar" ? currentQuestion.explanationAr : currentQuestion.explanationEn}</p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNext}
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1"
                      >
                        <span>{lang === "ar" ? "السؤال التالي" : "Next Question"}</span>
                        <ChevronLeft className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Welcome / Game Over / Victory Overlay screens */
            <div className="bg-[#030408] border-2 border-slate-900 rounded-3xl p-6 sm:p-8 text-center space-y-6 relative overflow-hidden w-full">
              {history.length > 0 ? (
                /* Game Over or completion state */
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    {lives > 0 ? (
                      <div className="space-y-2">
                        <Award className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          {lang === "ar" ? "تهانينا! فوز وإتقان لغوي تام" : "Superb! Arabic Grammar Mastered"}
                        </h3>
                        <p className="text-xs text-emerald-400 font-bold">
                          {lang === "ar" ? "أنجزت جميع الاختبارات النحوية بنجاح!" : "You have completed all grammar challenges successfully!"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto animate-bounce" />
                        <h3 className="text-lg sm:text-xl font-extrabold text-white">
                          {lang === "ar" ? "انتهت المحاولات! لكن التعلم مستمر" : "Out of Lives! Learning Continues"}
                        </h3>
                        <p className="text-xs text-rose-400 font-bold">
                          {lang === "ar" ? "لقد فقدت جميع قلوب المحاولات النحوية." : "You have exhausted all your active grammar lives."}
                        </p>
                      </div>
                    )}

                    {/* Score summary panel */}
                    <div className="py-4 grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      <div className="bg-[#0b0c16] border border-slate-900 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{lang === "ar" ? "مجموع نقاطك" : "Your Score"}</p>
                        <p className="text-xl font-black text-rose-400 mt-0.5">{score} ⭐</p>
                      </div>
                      <div className="bg-[#0b0c16] border border-slate-900 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{lang === "ar" ? "الرقم القياسي" : "Best Score"}</p>
                        <p className="text-xl font-black text-amber-400 mt-0.5">{sessionHighScore} ⭐</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive review history sheet */}
                  <div className="space-y-3 text-right animate-fade-in" dir="rtl">
                    <h4 className="text-xs font-black text-white px-2 flex items-center gap-1.5 justify-start">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <span>{lang === "ar" ? "كشف مراجعة الأسئلة والإعراب للطلاب" : "Student's Quiz Parsing Review Sheet"}</span>
                    </h4>

                    <div className="max-h-[220px] overflow-y-auto space-y-2.5 p-3 bg-[#070913] border border-slate-900 rounded-2xl scrollbar-thin scrollbar-thumb-slate-800">
                      {history.map((item, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-xl border text-xs space-y-2 text-right ${
                            item.wasCorrect ? "bg-emerald-950/10 border-emerald-900/30" : "bg-rose-950/10 border-rose-900/30"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-black text-slate-200">س{idx + 1}: {item.questionText}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              item.wasCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                            }`}>
                              {item.wasCorrect ? (lang === "ar" ? "صحيح" : "Correct") : (lang === "ar" ? "خطأ" : "Incorrect")}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 text-right">
                            <p>{lang === "ar" ? "إجابتك:" : "Your choice:"} <strong className={item.wasCorrect ? "text-emerald-400" : "text-rose-400"}>{item.selectedText}</strong></p>
                            {!item.wasCorrect && (
                              <p>{lang === "ar" ? "الإعراب الصحيح:" : "Correct parse:"} <strong className="text-emerald-400">{item.correctText}</strong></p>
                            )}
                          </div>

                          <p className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-900 pt-1.5 text-right">
                            <strong>{lang === "ar" ? "القاعدة النحوية:" : "Grammar Base:"}</strong> {item.explanationText}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Play again button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={resetGame}
                      className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{lang === "ar" ? "إعادة التحدي النحوي" : "Restart Grammar Quiz"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("rules");
                        playSynthSound(400, "sine", 0.05);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer"
                    >
                      {lang === "ar" ? "دراسة القواعد الذهبية" : "Review Golden Rules"}
                    </button>
                  </div>
                </div>
              ) : (
                /* Initial state overlay */
                <div className="text-center space-y-4 py-6">
                  <div className="relative inline-block">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-amber-500/20">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-indigo-500 rounded-full flex items-center justify-center text-[8px] font-black text-white animate-ping" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
                      {lang === "ar" ? "مختبر النحو العربي الذكي للطلاب" : "Smart Arabic Grammar Lab"}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      {lang === "ar" 
                        ? "مساحة ذكية تفاعلية لتعلم وإتقان قواعد النحو العربي الأساسية والمتقدمة. أجب بشكل صحيح لتجميع النقاط وحافظ على قلوب محاولاتك لتسجيل رقم قياسي." 
                        : "A highly intuitive arena to practice and master basic and expert Arabic grammar parsing rules. Answer correctly to compound scores, stack streaks, and set highscores."}
                    </p>
                  </div>

                  {/* Quick stats brief */}
                  <div className="bg-[#0b0c16]/50 border border-slate-900 rounded-2xl px-4 py-3 max-w-xs mx-auto text-xs font-bold text-slate-400 flex items-center justify-between gap-2">
                    <span>{lang === "ar" ? "أفضل مجموع نقاط:" : "Best Record score:"}</span>
                    <span className="text-amber-400 font-black">{sessionHighScore} ⭐</span>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={resetGame}
                      className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-lg cursor-pointer"
                    >
                      {lang === "ar" ? "ابدأ التحدي النحوي" : "Begin Quiz Challenge"}
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("rules");
                        playSynthSound(400, "sine", 0.05);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer"
                    >
                      {lang === "ar" ? "دراسة موسوعة القواعد" : "Study Rulebook"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
