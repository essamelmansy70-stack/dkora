import React, { useState, useMemo } from "react";
import { 
  BookOpen, 
  Clock, 
  User, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Gamepad2, 
  Heart, 
  TrendingUp, 
  ChevronRight,
  Flame,
  Star
} from "lucide-react";
import { NewsArticle, initialNewsArticles } from "../data/newsAndCalendar";
import { GAMES_DATA } from "../data/games";
import { NEW_GAMES } from "../data/newGames";
import { Game } from "../types";

interface ArticlesSectionProps {
  lang: "ar" | "en";
  theme: "light" | "dark";
  selectedArticle: NewsArticle | null;
  showArticlesPage: boolean;
  setSelectedArticle: (article: NewsArticle | null) => void;
  setShowArticlesPage: (show: boolean) => void;
  setSelectedGame: (game: any) => void;
  setSelectedGMGame: (game: any) => void;
  playUISound: (sound: string) => void;
}

export default function ArticlesSection({
  lang,
  theme,
  selectedArticle,
  showArticlesPage,
  setSelectedArticle,
  setShowArticlesPage,
  setSelectedGame,
  setSelectedGMGame,
  playUISound
}: ArticlesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Categories definitions for articles
  const categoriesList = [
    { id: "all", nameAr: "⚡ الكل", nameEn: "⚡ All" },
    { id: "guides", nameAr: "📚 أدلة الألعاب", nameEn: "📚 Gaming Guides" },
    { id: "strategy", nameAr: "🧠 استراتيجيات اللعب", nameEn: "🧠 Play Strategies" },
    { id: "tips", nameAr: "💡 نصائح وحيل", nameEn: "💡 Tips & Tricks" }
  ];

  // Map of article category to related games for deep user engagement
  const getRelatedGames = (articleCategory: string) => {
    const relatedList: any[] = [];
    
    // Always include Baby Runner Game as it's the target SEO keyword game
    const babyRunner = NEW_GAMES.find(g => g.title === "Baby Runner Game");
    if (babyRunner) {
      relatedList.push({ ...babyRunner, isGM: true });
    }

    // Include Mine Keeper for commodities (gold/metals theme) or crypto (mining theme)
    const mineKeeper = NEW_GAMES.find(g => g.title === "Mine Keeper");
    if (mineKeeper && (articleCategory === "commodities" || articleCategory === "crypto")) {
      relatedList.push({ ...mineKeeper, isGM: true });
    }

    // Include Crazy Car Drive for Forex/Trading (high speed, risk management theme)
    const crazyCar = NEW_GAMES.find(g => g.title === "Crazy Car Drive Road Challenge");
    if (crazyCar && articleCategory === "forex") {
      relatedList.push({ ...crazyCar, isGM: true });
    }

    // Include Dinosaur Dig for commodities/metals (digging/fossils theme)
    const dinosaurDig = NEW_GAMES.find(g => g.title === "Dinosaur Dig");
    if (dinosaurDig && articleCategory === "commodities") {
      relatedList.push({ ...dinosaurDig, isGM: true });
    }

    // Fill up with high quality native games if list has less than 4 games
    GAMES_DATA.slice(0, 4).forEach(game => {
      if (relatedList.length < 4 && !relatedList.some(g => g.id === game.id)) {
        relatedList.push({ ...game, isGM: false });
      }
    });

    return relatedList.slice(0, 4);
  };

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return initialNewsArticles.filter(art => {
      const matchesCategory = activeCategory === "all" || art.category === activeCategory;
      const title = lang === "ar" ? art.titleAr : art.titleEn;
      const excerpt = lang === "ar" ? art.excerptAr : art.excerptEn;
      const matchesSearch = !query || 
        title.toLowerCase().includes(query) || 
        excerpt.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  // Read Time calculator
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return lang === "ar" ? `${minutes} دقائق قراءة` : `${minutes} min read`;
  };

  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Click handler to open a related game directly
  const handlePlayGame = (game: any) => {
    playUISound("click");
    if (game.isGM) {
      // Find the proper index/object in NEW_GAMES or full live catalog
      setSelectedGMGame(game);
      setSelectedGame(null);
    } else {
      setSelectedGame(game);
      setSelectedGMGame(null);
    }
    // Automatically close articles pages to jump into pure immersive gameplay
    setSelectedArticle(null);
    setShowArticlesPage(false);
  };

  // Article reading page
  if (selectedArticle) {
    const title = lang === "ar" ? selectedArticle.titleAr : selectedArticle.titleEn;
    const author = lang === "ar" ? selectedArticle.authorAr : selectedArticle.authorEn;
    const content = lang === "ar" ? selectedArticle.contentAr : selectedArticle.contentEn;
    const relatedGames = getRelatedGames(selectedArticle.category);

    return (
      <div className="space-y-8 animate-fade-in text-right rtl:text-right ltr:text-left">
        {/* Navigation Back Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-500/10">
          <button
            onClick={() => { playUISound("click"); setSelectedArticle(null); setShowArticlesPage(true); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs md:text-sm font-black transition cursor-pointer ${
              theme === "dark"
                ? "bg-slate-900 hover:bg-slate-800 text-purple-400 hover:text-purple-300 border border-slate-800"
                : "bg-white hover:bg-slate-50 text-purple-600 hover:text-purple-500 border border-slate-200 shadow-sm"
            }`}
          >
            {lang === "ar" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {lang === "ar" ? "العودة للمقالات والأدلة" : "Back to Articles & Guides"}
          </button>

          <span className={`text-xs font-black px-3.5 py-1.5 rounded-full ${
            theme === "dark" ? "bg-purple-500/10 text-purple-400" : "bg-purple-100 text-purple-700"
          }`}>
            {lang === "ar" ? "دليل تعليمي معتمد" : "Verified Guide"}
          </span>
        </div>

        {/* Article Body Container */}
        <article className="max-w-3xl mx-auto space-y-6">
          {/* Metadata Block */}
          <div className="space-y-4">
            <span className={`text-xs font-black tracking-widest uppercase block ${
              theme === "dark" ? "text-purple-400" : "text-purple-600"
            }`}>
              {categoriesList.find(c => c.id === selectedArticle.category)?.[lang === "ar" ? "nameAr" : "nameEn"]}
            </span>

            <h1 className={`text-2xl md:text-4xl font-black leading-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              {title}
            </h1>

            <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-purple-500" />
                <span>{author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>{formatDate(selectedArticle.date)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>{calculateReadTime(content)}</span>
              </span>
            </div>
          </div>

          {/* Featured styled placeholder or banner if image is absent */}
          <div className="w-full aspect-[2.1] rounded-3xl overflow-hidden relative shadow-xl border border-purple-500/10 bg-gradient-to-tr from-purple-900/40 via-indigo-950/20 to-slate-900/40 flex items-center justify-center">
            {selectedArticle.image ? (
              <img
                src={selectedArticle.image}
                alt={title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-103 transition duration-500"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent)" />
                <div className="z-10 text-center space-y-3 p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs font-extrabold tracking-wider uppercase text-purple-400">{lang === "ar" ? "شبكة ديكورا التعليمية" : "Dkora Insights Network"}</p>
                </div>
              </>
            )}
          </div>

          {/* Formatted Text Content */}
          <div className={`text-base leading-relaxed space-y-5 transition-colors duration-300 font-medium ${
            theme === "dark" ? "text-slate-300" : "text-slate-700"
          }`}>
            {content.split("\n\n").map((para, i) => {
              // Format lists or highlights nicely
              if (para.trim().startsWith("- ") || para.trim().startsWith("* ")) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-2 pl-4 pr-4 my-3 text-purple-400 dark:text-purple-300">
                    {para.split("\n").map((item, idx) => (
                      <li key={idx} className="text-slate-700 dark:text-slate-300 font-bold">
                        {item.replace(/^[-*]\s+/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (/^\d+\./.test(para.trim())) {
                return (
                  <div key={i} className={`p-5 rounded-2xl border ${
                    theme === "dark" ? "bg-slate-900/40 border-purple-500/10" : "bg-purple-500/5 border-purple-100"
                  }`}>
                    {para.split("\n").map((line, idx) => (
                      <p key={idx} className={idx === 0 ? "font-black text-purple-600 dark:text-purple-400 text-lg mb-2" : "text-sm text-slate-700 dark:text-slate-300"}>
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }

              if (para.trim().includes("السيناريو") || para.trim().includes("Scenario")) {
                return (
                  <div key={i} className={`p-6 rounded-3xl border-l-4 border-amber-500 shadow-md ${
                    theme === "dark" ? "bg-slate-900/50 border-purple-500/10 text-white" : "bg-amber-500/5 border-amber-200 text-slate-800"
                  }`}>
                    <div className="flex items-center gap-2 mb-2 text-amber-500">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-black text-lg">{lang === "ar" ? "إستراتيجية تداول مقترحة" : "Recommended Trade Strategy"}</span>
                    </div>
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {para}
                    </p>
                  </div>
                );
              }

              return <p key={i} className="whitespace-pre-line">{para}</p>;
            })}
          </div>
        </article>

        {/* 🎮 Related Games Section - CRITICAL USER REQUEST */}
        <section className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 space-y-6 ${
          theme === "dark"
            ? "bg-slate-950/60 border-purple-500/10"
            : "bg-gradient-to-b from-purple-500/5 to-white border-purple-100 shadow-lg shadow-purple-900/5"
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-purple-500/10">
            <div className="flex items-center gap-2.5">
              <Gamepad2 className="w-6 h-6 text-purple-500 animate-bounce" />
              <div>
                <h3 className={`text-lg md:text-xl font-black ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  {lang === "ar" ? "ألعاب ذات صلة بالمقال - العب فوراً" : "Related Games - Play Instantly"}
                </h3>
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  {lang === "ar" ? "استمتع باللعب المجاني السريع وبدون تحميل" : "Zero installs, instant browser gameplay"}
                </p>
              </div>
            </div>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
              theme === "dark" ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-700"
            }`}>
              {lang === "ar" ? "توصية ذكية" : "AI Smart Match"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedGames.map((game: any, idx: number) => {
              const gameTitle = game.title === "Baby Runner Game"
                ? (lang === "ar" ? "Baby Runner Game - لعبة جري الأطفال" : "Baby Runner Game")
                : game.title === "Crazy Car Drive Road Challenge"
                ? (lang === "ar" ? "Crazy Car Drive - سباق السيارات" : "Crazy Car Drive")
                : game.title === "Mine Keeper"
                ? (lang === "ar" ? "Mine Keeper - ماين كيبر" : "Mine Keeper")
                : game.title === "Dinosaur Dig"
                ? (lang === "ar" ? "Dinosaur Dig - حفريات الديناصورات" : "Dinosaur Dig")
                : (lang === "ar" ? game.titleAr : game.titleEn);

              const gameThumb = game.thumb || game.image || "/fallback_game.png";

              return (
                <div
                  key={idx}
                  onClick={() => handlePlayGame(game)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border hover:border-purple-500/50 shadow-md hover:shadow-2xl flex flex-col justify-end aspect-[1.3] w-full transition-all duration-300 ${
                    theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
                  <img
                    src={gameThumb}
                    alt={gameTitle}
                    width="250"
                    height="190"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition duration-500 ease-out z-0"
                  />
                  <div className="absolute top-3 left-3 z-20 flex gap-1.5 items-center">
                    <span className="bg-black/70 backdrop-blur-md text-[9px] text-purple-400 font-black px-2 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      {game.category || "arcade"}
                    </span>
                  </div>
                  <div className="p-4 z-20 space-y-1 transform group-hover:translate-y-[-2px] transition duration-300 text-left rtl:text-right">
                    <h4 className="text-xs md:text-sm font-black text-white leading-tight line-clamp-1">
                      {gameTitle}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-purple-300 pt-1">
                      <span className="flex items-center gap-1 font-bold">
                        <Flame className="w-3 h-3 text-orange-500 fill-current" />
                        <span>{game.plays || "10K+"} {lang === "ar" ? "لاعب" : "plays"}</span>
                      </span>
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        {lang === "ar" ? "العب" : "Play"} 
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // Articles listing dashboard page
  return (
    <div className="space-y-8 animate-fade-in text-right rtl:text-right ltr:text-left">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-1 ${
              theme === "dark"
                ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                : "bg-purple-100 border-purple-200 text-purple-700"
            }`}>
              <Sparkles className="w-3 h-3 text-amber-500 fill-current" />
              <span>{lang === "ar" ? "أسرار وأدلة الألعاب مجانية 100%" : "100% Free Gaming Tips & Guides"}</span>
            </div>
            <h1 className={`text-2xl md:text-4xl font-black tracking-tight ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              {lang === "ar" ? "أدلة الألعاب الاستراتيجية وأسرار الفوز" : "Dkora Gaming Guides & Victory Strategies"}
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}>
              {lang === "ar" 
                ? "تصفح أحدث الاستراتيجيات وأسرار احتراف ألعاب مثل Baby Runner و Mine Keeper و Crazy Car Drive لتصل لأعلى النقاط وتنافس أصدقائك."
                : "Explore masterclass strategy guides, secret shortcuts, and tips to conquer games like Baby Runner, Mine Keeper, and Crazy Car Drive."}
            </p>
          </div>

          <button
            onClick={() => { playUISound("click"); setShowArticlesPage(false); }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-3 rounded-2xl text-xs md:text-sm transition cursor-pointer shadow-lg shadow-purple-600/20"
          >
            {lang === "ar" ? "العودة لتصفح الألعاب" : "Go Back to Games"}
          </button>
        </div>

        {/* Categories Bar & Search Input Row */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-t transition-colors duration-300 ${
          theme === "dark" ? "border-slate-800" : "border-slate-200"
        }`}>
          {/* Article Category filters */}
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { playUISound("click"); setActiveCategory(cat.id); }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/25"
                    : theme === "dark"
                      ? "bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                      : "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200 shadow-sm"
                }`}
              >
                {lang === "ar" ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

          {/* Search bar inside articles page */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute top-1/2 left-3.5 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "ar" ? "ابحث في المقالات والأدلة..." : "Search articles..."}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-2xl text-xs focus:outline-none focus:ring-2 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-900 border-purple-500/20 focus:border-purple-500 text-white placeholder-slate-500 focus:ring-purple-500/20"
                  : "bg-white border-purple-300/40 focus:border-purple-500 text-slate-800 placeholder-slate-400 focus:ring-purple-500/10 shadow-sm"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Grid of Article Cards */}
      {filteredArticles.length === 0 ? (
        <div className={`text-center py-16 rounded-3xl border space-y-4 max-w-md mx-auto ${
          theme === "dark" ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-lg"
        }`}>
          <span className="text-4xl">📚</span>
          <h3 className={`text-lg font-black ${theme === "dark" ? "text-white" : "text-slate-800"}`}>
            {lang === "ar" ? "لم نجد أي مقالات مطابقة" : "No Articles Found"}
          </h3>
          <p className="text-xs text-slate-500">
            {lang === "ar" ? "حاول استخدام كلمات بحث أخرى أو تغيير الفئة." : "Try adjusting your search filters or queries."}
          </p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            {lang === "ar" ? "إعادة الضبط" : "Reset Filters"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => {
            const artTitle = lang === "ar" ? article.titleAr : article.titleEn;
            const artExcerpt = lang === "ar" ? article.excerptAr : article.excerptEn;
            const artAuthor = lang === "ar" ? article.authorAr : article.authorEn;
            
            return (
              <div
                key={article.id}
                onClick={() => { playUISound("click"); setSelectedArticle(article); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`group rounded-3xl overflow-hidden cursor-pointer border hover:border-purple-500/30 shadow-md hover:shadow-2xl flex flex-col justify-between h-full transition-all duration-300 ${
                  theme === "dark" ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <div className="space-y-4 p-5">
                  {/* Article Card Banner Placeholder */}
                  <div className="w-full aspect-[1.8] rounded-2xl overflow-hidden relative border border-purple-500/5 bg-gradient-to-tr from-purple-900/20 via-indigo-950/10 to-slate-900/20 flex items-center justify-center">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={artTitle}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-106 transition duration-500"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(124,58,237,0.1),transparent)" />
                        <BookOpen className="w-10 h-10 text-purple-400 opacity-60 group-hover:scale-110 group-hover:text-purple-300 transition duration-300" />
                      </>
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-black/60 backdrop-blur-md text-[9px] text-purple-400 font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
                        {categoriesList.find(c => c.id === article.category)?.[lang === "ar" ? "nameAr" : "nameEn"]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-left rtl:text-right">
                    <h3 className={`text-base md:text-lg font-black leading-snug group-hover:text-purple-500 transition duration-200 line-clamp-2 ${
                      theme === "dark" ? "text-white" : "text-slate-800"
                    }`}>
                      {artTitle}
                    </h3>
                    <p className={`text-xs md:text-sm line-clamp-3 leading-relaxed ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {artExcerpt}
                    </p>
                  </div>
                </div>

                <div className={`px-5 py-4 border-t flex items-center justify-between text-[10px] font-bold ${
                  theme === "dark" ? "border-slate-800/80 text-slate-400" : "border-slate-100 text-slate-500"
                }`}>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-purple-500" />
                    <span className="line-clamp-1">{artAuthor}</span>
                  </span>
                  <span className="flex items-center gap-1 text-purple-500">
                    <span>{lang === "ar" ? "اقرأ المقال" : "Read Post"}</span>
                    {lang === "ar" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
