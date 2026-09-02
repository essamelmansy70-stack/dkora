import React, { useState, useEffect, useRef } from "react";
import { 
  Gamepad2, 
  Search, 
  Maximize2, 
  RotateCcw, 
  X, 
  Sparkles, 
  Heart, 
  Star, 
  Flame, 
  Smartphone, 
  Tv, 
  Volume2, 
  VolumeX, 
  Info,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon
} from "lucide-react";
import { GAMES_DATA } from "./data/games";
import { Game, GameMonetizeGame } from "./types";
import NativeSnake from "./components/NativeSnake";
import NativeBrickBreaker from "./components/NativeBrickBreaker";
import NativePacman from "./components/NativePacman";
import { translations } from "./translations";
import Fuse from "fuse.js";

const CATEGORIES = [
  { id: "all", nameAr: "🎮 الكل", nameEn: "🎮 All" },
  { id: "intelligence", nameAr: "🧠 ذكاء", nameEn: "🧠 Brain" },
  { id: "classic", nameAr: "👾 كلاسيك", nameEn: "👾 Classic" },
  { id: "puzzles", nameAr: "🧩 ألغاز", nameEn: "🧩 Puzzles" },
  { id: "casual", nameAr: "🎈 خفيفة", nameEn: "🎈 Casual" }
];

export default function App() {
  const [lang, setLang] = useState<"ar" | "en">(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search || window.location.hash.split("?")[1] || "");
      const queryLang = urlParams.get("lang");
      if (queryLang === "ar" || queryLang === "en") return queryLang;
      
      const stored = localStorage.getItem("poki_lang") as "ar" | "en";
      if (stored === "ar" || stored === "en") return stored;
    } catch {}
    return "ar";
  });
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      return (localStorage.getItem("poki_theme") as "dark" | "light") || "dark";
    } catch {
      return "dark";
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeTab, setActiveTab] = useState<"poki" | "gamemonetize">("poki");
  const [gamemonetizeGames, setGamemonetizeGames] = useState<GameMonetizeGame[]>([]);
  const [gmLoading, setGmLoading] = useState(false);
  const [gmError, setGmError] = useState<string | null>(null);
  const [selectedGMGame, setSelectedGMGame] = useState<GameMonetizeGame | null>(null);
  const [autoSelectGMIndex, setAutoSelectGMIndex] = useState<number | null>(null);
  const [activeLegalPage, setActiveLegalPage] = useState<"privacy" | "terms" | "disclaimer" | null>(null);
  const [showSitemapModal, setShowSitemapModal] = useState(false);
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("poki_favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Store language preference changes
  useEffect(() => {
    try {
      localStorage.setItem("poki_lang", lang);
    } catch {}
  }, [lang]);

  // Helper to update the browser URL pathname based on active states - unified clean English URLs for optimal SEO
  const updatePath = (
    currentLang: "ar" | "en", 
    game: Game | null, 
    gmGame: GameMonetizeGame | null,
    tab: "poki" | "gamemonetize",
    legal: "privacy" | "terms" | "disclaimer" | null,
    category: string,
    favsOnly: boolean,
    sitemap: boolean
  ) => {
    let newPath = "/";
    let query = `?lang=${currentLang}`;

    if (legal === "privacy") {
      newPath = "/privacy-policy";
    } else if (legal === "terms") {
      newPath = "/terms-of-use";
    } else if (legal === "disclaimer") {
      newPath = "/disclaimer";
    } else if (sitemap) {
      newPath = "/sitemap";
    } else if (gmGame) {
      const idx = gamemonetizeGames.findIndex(g => g.title === gmGame.title);
      newPath = `/game-gm-${idx !== -1 ? idx : 0}`;
    } else if (game) {
      newPath = `/game-${game.id}`;
    } else if (favsOnly) {
      newPath = "/favorites";
    } else if (tab === "gamemonetize") {
      newPath = "/gamemonetize-games";
    } else if (category !== "all") {
      newPath = `/category-${category}`;
    }

    const fullTarget = newPath + query;
    if (window.location.pathname !== newPath || window.location.search !== query) {
      window.history.pushState(null, "", fullTarget);
    }
  };

  // Listen to path changes and update app states accordingly (supporting clean English-only pathnames)
  useEffect(() => {
    // Redirect old hashes for clean transition
    if (window.location.hash) {
      const hash = decodeURIComponent(window.location.hash);
      let targetPath = "/?lang=ar";
      const activeLang = (hash.includes("lang=en") || hash.includes("en")) ? "en" : "ar";
      
      if (hash.includes("privacy") || hash.includes("سياسة")) {
        targetPath = `/privacy-policy?lang=${activeLang}`;
      } else if (hash.includes("terms") || hash.includes("شروط")) {
        targetPath = `/terms-of-use?lang=${activeLang}`;
      } else if (hash.includes("disclaimer") || hash.includes("إخلاء")) {
        targetPath = `/disclaimer?lang=${activeLang}`;
      } else if (hash.includes("sitemap") || hash.includes("خريطة")) {
        targetPath = `/sitemap?lang=${activeLang}`;
      } else if (hash.includes("favorites") || hash.includes("المفضلة")) {
        targetPath = `/favorites?lang=${activeLang}`;
      } else if (hash.includes("تصنيف-") || hash.includes("category-")) {
        const cat = hash.includes("تصنيف-") ? hash.split("تصنيف-")[1] : hash.split("category-")[1];
        targetPath = `/category-${cat}?lang=${activeLang}`;
      } else if (hash.includes("لعبة-") || hash.includes("game-")) {
        const game = hash.includes("لعبة-") ? hash.split("لعبة-")[1] : hash.split("game-")[1];
        targetPath = `/game-${game}?lang=${activeLang}`;
      }
      window.history.replaceState(null, "", targetPath);
    }

    const handleLocationChange = () => {
      const path = decodeURIComponent(window.location.pathname);
      const search = window.location.search || "";
      
      // Parse active language
      let activeLang: "ar" | "en" = "ar";
      if (search.indexOf("lang=en") !== -1) {
        activeLang = "en";
      } else if (search.indexOf("lang=ar") !== -1) {
        activeLang = "ar";
      } else {
        try {
          const saved = localStorage.getItem("poki_lang");
          if (saved === "en" || saved === "ar") {
            activeLang = saved;
          } else {
            activeLang = !!(navigator.language && navigator.language.startsWith("en")) ? "en" : "ar";
          }
        } catch (e) {}
      }
      setLang(activeLang);
      
      // If client accessed legacy Arabic URL path directly, redirect seamlessly to the English URL path
      if (
        path.includes("سياسة-الخصوصية") || 
        path.includes("شروط-الاستخدام") || 
        path.includes("إخلاء-المسؤولية") || 
        path.includes("خريطة-الموقع") || 
        path.includes("المفضلة") || 
        path.includes("تصنيف-") || 
        path.includes("لعبة-")
      ) {
        let redirectPath = "/";
        if (path.includes("سياسة-الخصوصية")) redirectPath = "/privacy-policy";
        else if (path.includes("شروط-الاستخدام")) redirectPath = "/terms-of-use";
        else if (path.includes("إخلاء-المسؤولية")) redirectPath = "/disclaimer";
        else if (path.includes("خريطة-الموقع")) redirectPath = "/sitemap";
        else if (path.includes("المفضلة")) redirectPath = "/favorites";
        else if (path.includes("تصنيف-")) {
          const catId = path.split("تصنيف-")[1];
          redirectPath = `/category-${catId}`;
        } else if (path.includes("لعبة-")) {
          const gameId = path.split("لعبة-")[1];
          redirectPath = `/game-${gameId}`;
        }
        window.history.replaceState(null, "", redirectPath + `?lang=${activeLang}`);
        return;
      }
      
      // Match clean English-only paths
      if (
        path.includes("privacy-policy") || 
        path.includes("terms-of-use") || 
        path.includes("disclaimer") || 
        path.includes("sitemap") || 
        path.includes("favorites") || 
        path.includes("category-") || 
        path.includes("gamemonetize-games") ||
        path.includes("game-gm-") ||
        path.includes("game-")
      ) {
        if (path.includes("privacy-policy")) {
          setActiveLegalPage("privacy");
          setSelectedGame(null);
          setSelectedGMGame(null);
          setShowFavoritesOnly(false);
          setShowSitemapModal(false);
        } else if (path.includes("terms-of-use")) {
          setActiveLegalPage("terms");
          setSelectedGame(null);
          setSelectedGMGame(null);
          setShowFavoritesOnly(false);
          setShowSitemapModal(false);
        } else if (path.includes("disclaimer")) {
          setActiveLegalPage("disclaimer");
          setSelectedGame(null);
          setSelectedGMGame(null);
          setShowFavoritesOnly(false);
          setShowSitemapModal(false);
        } else if (path.includes("sitemap")) {
          setActiveLegalPage(null);
          setSelectedGame(null);
          setSelectedGMGame(null);
          setShowFavoritesOnly(false);
          setShowSitemapModal(true);
        } else if (path.includes("favorites")) {
          setActiveLegalPage(null);
          setSelectedGame(null);
          setSelectedGMGame(null);
          setShowFavoritesOnly(true);
          setActiveCategory("all");
          setShowSitemapModal(false);
        } else if (path.includes("category-")) {
          const catId = path.split("category-")[1];
          setActiveLegalPage(null);
          setSelectedGame(null);
          setSelectedGMGame(null);
          setShowFavoritesOnly(false);
          setActiveCategory(catId);
          setShowSitemapModal(false);
        } else if (path.includes("gamemonetize-games")) {
          setActiveTab("gamemonetize");
          setSelectedGMGame(null);
          setSelectedGame(null);
          setActiveLegalPage(null);
          setShowFavoritesOnly(false);
          setShowSitemapModal(false);
        } else if (path.includes("game-gm-")) {
          const gmIndexStr = path.split("game-gm-")[1];
          const gmIndex = parseInt(gmIndexStr, 10);
          setActiveTab("gamemonetize");
          setSelectedGame(null);
          setActiveLegalPage(null);
          setShowFavoritesOnly(false);
          setShowSitemapModal(false);
          setAutoSelectGMIndex(gmIndex);
        } else if (path.includes("game-")) {
          const gameId = path.split("game-")[1];
          const found = GAMES_DATA.find((g) => g.id === gameId);
          if (found) {
            setSelectedGame(found);
            setSelectedGMGame(null);
            setActiveLegalPage(null);
            setShowFavoritesOnly(false);
            setShowSitemapModal(false);
          }
        }
      } else {
        // Default to home page "/", ensuring active query parameter lang is enforced
        setActiveLegalPage(null);
        setSelectedGame(null);
        setSelectedGMGame(null);
        setActiveTab("poki");
        setShowFavoritesOnly(false);
        setActiveCategory("all");
        setShowSitemapModal(false);
        
        const targetSearch = `?lang=${activeLang}`;
        if (window.location.search !== targetSearch) {
          window.history.replaceState(null, "", "/" + targetSearch);
        }
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);


  // Fetch GameMonetize feed on mount or when we have an autoSelectGMIndex waiting
  useEffect(() => {
    fetchGMGames();
  }, [autoSelectGMIndex]);

  // Handle auto-selecting deep-linked GameMonetize game when the feed finishes loading
  useEffect(() => {
    if (autoSelectGMIndex !== null && gamemonetizeGames.length > 0) {
      const targetGame = gamemonetizeGames[autoSelectGMIndex];
      if (targetGame) {
        setSelectedGMGame(targetGame);
      }
      setAutoSelectGMIndex(null);
    }
  }, [autoSelectGMIndex, gamemonetizeGames]);

  const fetchGMGames = async () => {
    if (gamemonetizeGames.length > 0) return;
    setGmLoading(true);
    setGmError(null);
    try {
      const res = await fetch("/api/gamemonetize");
      if (!res.ok) throw new Error("Failed to fetch games feed");
      const data = await res.json();
      if (Array.isArray(data)) {
        setGamemonetizeGames(data);
      } else if (data && typeof data === "object" && Array.isArray(data.games)) {
        setGamemonetizeGames(data.games);
      } else {
        setGamemonetizeGames([]);
      }
    } catch (err: any) {
      console.error("fetchGMGames error:", err);
      setGmError(err.message || "Could not retrieve games list");
    } finally {
      setGmLoading(false);
    }
  };

  // Update pathname when states change
  useEffect(() => {
    updatePath(lang, selectedGame, selectedGMGame, activeTab, activeLegalPage, activeCategory, showFavoritesOnly, showSitemapModal);
  }, [lang, selectedGame, selectedGMGame, activeTab, activeLegalPage, activeCategory, showFavoritesOnly, showSitemapModal]);

  // Dynamically update document title and description meta tags for maximum SEO visibility
  useEffect(() => {
    let title = "";
    let desc = "";

    if (lang === "ar") {
      if (activeLegalPage === "privacy") {
        title = "سياسة الخصوصية وسرية البيانات - ديكورا العاب اونلاين فرى | Dkora";
        desc = "سياسة الخصوصية وسرية البيانات لمنصة ديكورا العاب اونلاين فرى. نلتزم بحماية خصوصيتك وضمان لعب آمن لجميع اللاعبين.";
      } else if (activeLegalPage === "terms") {
        title = "شروط واتفاقية الاستخدام - ديكورا العاب اونلاين فرى | Dkora";
        desc = "شروط واتفاقية الاستخدام للعب النظيف على منصة ديكورا العاب اونلاين فرى.";
      } else if (activeLegalPage === "disclaimer") {
        title = "إخلاء المسؤولية وحقوق الملكية - ديكورا العاب اونلاين فرى | Dkora";
        desc = "بيان إخلاء المسؤولية وحماية حقوق الملكية الفكرية لمنصة ديكورا العاب اونلاين فرى.";
      } else if (showSitemapModal) {
        title = "خريطة الموقع والألعاب - ديكورا العاب اونلاين فرى | Dkora";
        desc = "خريطة الموقع لجميع ألعاب ديكورا العاب اونلاين فرى والصفحات القانونية لسهولة الوصول والفهرسة السريعة.";
      } else if (selectedGMGame) {
        const gameTitle = selectedGMGame.title;
        title = `العب لعبة ${gameTitle} اون لاين - ديكورا العاب اونلاين فرى | Dkora`;
        desc = selectedGMGame.description || `العب لعبة ${gameTitle} مجاناً وبدون تحميل على منصة ديكورا العاب اونلاين فرى - ألعاب متصفح سريعة وممتعة بالكامل.`;
      } else if (selectedGame) {
        const gameTitle = selectedGame.titleAr;
        title = `العب لعبة ${gameTitle} اون لاين - ديكورا العاب اونلاين فرى | Dkora`;
        desc = `العب لعبة ${gameTitle} مجاناً وبدون تحميل على منصة ديكورا العاب اونلاين فرى - ألعاب متصفح سريعة وممتعة بالكامل.`;
      } else if (showFavoritesOnly) {
        title = "ألعابي المفضلة - ديكورا العاب اونلاين فرى | Dkora";
        desc = "استعرض قائمة ألعابك المفضلة التي قمت بحفظها للوصول إليها بسرعة وبدون تحميل على ديكورا العاب اونلاين فرى.";
      } else if (activeCategory !== "all") {
        const catObj = CATEGORIES.find(c => c.id === activeCategory);
        const catName = catObj ? catObj.nameAr : "";
        title = `العاب ${catName} مجانية - ديكورا العاب اونلاين فرى | Dkora`;
        desc = `استمتع بأفضل العاب ${catName} اونلاين فري ومجانية بالكامل مباشرة على ديكورا العاب اونلاين فرى بدون تحميل.`;
      } else {
        title = "ديكورا العاب اونلاين فرى | Dkora";
        desc = "ديكورا العاب اونلاين فرى - استمتع بأقوى وأحدث الألعاب المجانية مباشرة بدون تحميل! العب ألعاب متصفح، ألعاب ذكاء، ألغاز، وألعاب ثلاثية الأبعاد خفيفة مجاناً وبسرعة فائقة.";
      }
    } else {
      if (activeLegalPage === "privacy") {
        title = "Privacy Policy - Dkora Free Online Games | Dkora";
        desc = "Privacy and Safe Gameplay Policy for Dkora Free Online Games.";
      } else if (activeLegalPage === "terms") {
        title = "Terms of Use - Dkora Free Online Games | Dkora";
        desc = "Terms of use and fair gameplay agreement for Dkora Free Online Games.";
      } else if (activeLegalPage === "disclaimer") {
        title = "Disclaimer - Dkora Free Online Games | Dkora";
        desc = "Copyright and general disclaimer details for Dkora Free Online Games.";
      } else if (showSitemapModal) {
        title = "Sitemap Directory - Dkora Free Online Games | Dkora";
        desc = "Complete sitemap directory index of all games and legal pages on Dkora Free Online Games.";
      } else if (selectedGMGame) {
        const gameTitle = selectedGMGame.title;
        title = `Play ${gameTitle} Online - Dkora Free Online Games | Dkora`;
        desc = selectedGMGame.description || `Play ${gameTitle} online for free with no downloads on Dkora - The premier destination for free online games.`;
      } else if (selectedGame) {
        const gameTitle = selectedGame.titleEn;
        title = `Play ${gameTitle} Online - Dkora Free Online Games | Dkora`;
        desc = `Play ${gameTitle} online for free with no downloads on Dkora - The premier destination for free online games.`;
      } else if (showFavoritesOnly) {
        title = "My Favorite Games - Dkora Free Online Games | Dkora";
        desc = "View and play your saved favorite arcade and puzzle games on Dkora.";
      } else if (activeCategory !== "all") {
        const catObj = CATEGORIES.find(c => c.id === activeCategory);
        const catName = catObj ? catObj.nameEn : "";
        title = `${catName} Games - Dkora Free Online Games | Dkora`;
        desc = `Play the best free online ${catName} games with zero downloads or popups on Dkora Free Online Games.`;
      } else {
        title = "Dkora Free Online Games | Dkora";
        desc = "Dkora Free Online Games - Play the best arcade, puzzle, and neon action games with zero downloads or popups.";
      }
    }

    // Set page title
    document.title = title;

    // Dynamically update description meta tags
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", desc);
    }
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute("content", desc);
    }
    
    // Dynamically update og/twitter titles too
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", title);
    }
  }, [lang, selectedGame, activeLegalPage]);

  // Synchronize theme with local storage
  useEffect(() => {
    try {
      localStorage.setItem("poki_theme", theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);
  
  const modalIframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  // Synchronize favorites with local storage
  useEffect(() => {
    try {
      localStorage.setItem("poki_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Handle HTML Fullscreen API
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Web Audio synth for UI click/hover sound
  const playUISound = (type: "hover" | "click" | "favorite") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "hover") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.08); // G5
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "favorite") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.12); // B5
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (e) {
      // Ignored safely
    }
  };

  // Toggle Favorite
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playUISound("favorite");
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Select a random game (Surprise Me feature)
  const handleSurpriseMe = () => {
    playUISound("click");
    const randomIndex = Math.floor(Math.random() * GAMES_DATA.length);
    setSelectedGame(GAMES_DATA[randomIndex]);
  };

  // Fullscreen trigger
  const toggleFullscreen = () => {
    playUISound("click");
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Memoize Fuse.js search instance for ultra-fast matching
  const fuse = React.useMemo(() => {
    return new Fuse(GAMES_DATA, {
      keys: [
        { name: "titleAr", weight: 0.5 },
        { name: "titleEn", weight: 0.5 },
        { name: "categoryAr", weight: 0.2 },
        { name: "categoryEn", weight: 0.2 },
        { name: "descriptionAr", weight: 0.1 },
        { name: "descriptionEn", weight: 0.1 }
      ],
      threshold: 0.45, // A perfect balance allowing slight typos, missing letters, and phonetic inputs
      includeScore: true
    });
  }, []);

  // Filter games based on category, fuzzy search (with typo tolerance), and favorites
  const filteredGames = React.useMemo(() => {
    let gamesList = GAMES_DATA;

    if (searchQuery.trim() !== "") {
      const results = fuse.search(searchQuery);
      gamesList = results.map((res) => res.item);
    }

    return gamesList.filter((game) => {
      const matchesCategory = activeCategory === "all" || game.category === activeCategory;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(game.id);
      return matchesCategory && matchesFavorites;
    });
  }, [searchQuery, activeCategory, showFavoritesOnly, favorites, fuse]);

  // Filter GameMonetize games based on search queries and category matches
  const filteredGMGames = React.useMemo(() => {
    let list = gamemonetizeGames;
    
    // Fuzzy/Text filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(g => 
        g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.description && g.description.toLowerCase().includes(q))
      );
    }
    
    // Category mapping filter
    if (activeCategory !== "all") {
      list = list.filter(g => {
        const cat = g.category.toLowerCase();
        if (activeCategory === "cars") return cat.includes("car") || cat.includes("racing") || cat.includes("drive") || cat.includes("moto");
        if (activeCategory === "intelligence" || activeCategory === "puzzles") return cat.includes("puzzle") || cat.includes("brain") || cat.includes("quiz") || cat.includes("logic");
        if (activeCategory === "action") return cat.includes("action") || cat.includes("shoot") || cat.includes("fight") || cat.includes("battle");
        if (activeCategory === "classic") return cat.includes("classic") || cat.includes("retro") || cat.includes("arcade");
        if (activeCategory === "casual") return cat.includes("casual") || cat.includes("fun") || cat.includes("girls") || cat.includes("clicker");
        return true;
      });
    }

    return list;
  }, [gamemonetizeGames, searchQuery, activeCategory]);

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-purple-600 selection:text-white overflow-x-hidden antialiased transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0d0e1b] text-slate-100" : "bg-[#f4f5f9] text-slate-800"
    }`}>
      
      {/* Dynamic Grid Neon Background Accent */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-[-300px] left-[10%] w-[600px] h-[600px] rounded-full blur-[150px] transition-opacity duration-300 ${
          theme === "dark" ? "bg-indigo-600/10" : "bg-indigo-600/5"
        }`} />
        <div className={`absolute top-[-200px] right-[10%] w-[500px] h-[500px] rounded-full blur-[140px] transition-opacity duration-300 ${
          theme === "dark" ? "bg-purple-600/10" : "bg-purple-600/5"
        }`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>

      {/* Main Header / Top navigation bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl transition-all duration-300 ${
        theme === "dark" 
          ? "bg-[#0d0e1b]/95 border-purple-500/10" 
          : "bg-white/95 border-purple-100 shadow-purple-900/5"
      }`}>
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => { playUISound("click"); setActiveCategory("all"); setShowFavoritesOnly(false); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30 transform group-hover:scale-105 group-hover:rotate-3 transition duration-300">
              <Gamepad2 className="w-6 h-6 text-white fill-white/10" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                {lang === "ar" ? "ديكورا العاب" : "Dkora Games"}
              </span>
              <span className={`text-[10px] block font-extrabold tracking-widest uppercase ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}>
                {lang === "ar" ? "ألعاب متصفح مجانية" : "Free Web Games"}
              </span>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => { playUISound("click"); setTheme(theme === "dark" ? "light" : "dark"); }}
              className={`p-2 border rounded-xl text-xs font-bold shadow-md cursor-pointer ${
                theme === "dark" ? "bg-slate-800/80 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-600" />}
            </button>
            <button
              onClick={() => { playUISound("click"); setLang(lang === "ar" ? "en" : "ar"); }}
              className={`px-3 py-1.5 border rounded-xl text-xs font-bold shadow-md cursor-pointer ${
                theme === "dark" ? "bg-slate-800/80 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="relative w-full max-w-lg">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === "ar" ? "ابحث عن لعبة أو تصنيف..." : "Search games, categories..."}
            className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all duration-300 shadow-inner ${
              theme === "dark"
                ? "bg-slate-900/90 border-purple-500/20 focus:border-purple-500 text-white placeholder-slate-500 focus:ring-purple-500/20"
                : "bg-white border-purple-300/40 focus:border-purple-500 text-slate-800 placeholder-slate-400 focus:ring-purple-500/10 shadow-sm"
            }`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggler Button */}
          <button
            onClick={() => { playUISound("click"); setTheme(theme === "dark" ? "light" : "dark"); }}
            className={`p-3 border rounded-xl transition cursor-pointer shadow-md ${
              theme === "dark" 
                ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white" 
                : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
            }`}
            title={lang === "ar" ? "تبديل المظهر" : "Toggle Theme"}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400 fill-amber-400/10" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600 fill-purple-600/10" />
            )}
          </button>

          {/* Sound Synthesizer toggle */}
          <button
            onClick={() => { setSoundEnabled(!soundEnabled); playUISound("click"); }}
            className={`p-3 border rounded-xl transition cursor-pointer shadow-md ${
              theme === "dark" 
                ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white" 
                : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-950"
            }`}
            title={lang === "ar" ? "تأثيرات الصوت" : "UI Audio"}
          >
            {soundEnabled ? (
              <Volume2 className={`w-5 h-5 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => { playUISound("click"); setLang(lang === "ar" ? "en" : "ar"); }}
            className={`px-4 py-2.5 border rounded-xl text-sm font-black transition duration-200 cursor-pointer shadow-md ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 hover:from-purple-600/30 hover:to-indigo-600/30 border-purple-500/20 hover:border-purple-500/40 text-purple-300"
                : "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border-purple-200 hover:border-purple-300 text-purple-700"
            }`}
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </header>

      {/* Main Hero & Quick Categories Navbar */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-8 z-10 relative">
        
        {/* Playful Banner */}
        <div className={`border rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl transition-all duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-900/30 via-indigo-950/40 to-slate-900/30 border-purple-500/10"
            : "bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-pink-500/10 border-purple-200/50"
        }`}>
          <div className="space-y-3 w-full text-center md:text-left rtl:md:text-right">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-1 ${
              theme === "dark"
                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                : "bg-amber-500/15 border-amber-500/30 text-amber-700"
            }`}>
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>{lang === "ar" ? "ألعاب متصفح ممتعة 100%" : "100% Fun Web Games"}</span>
            </div>
            <h2 className={`text-2xl md:text-4xl font-black leading-tight transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              {lang === "ar" ? "عالم كامل من الألعاب بنقرة واحدة!" : "Your Ultimate Playground is One Click Away!"}
            </h2>
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}>
              {lang === "ar" 
                ? "العب أفضل العاب اونلاين فري، ألعاب المتصفح والأركيد مجاناً دون أي نوافذ منبثقة أو حاجة للتحميل، مع ألعاب حصرية مدمجة خصيصاً لك."
                : "Explore highly optimized HTML5 arcade and puzzle games directly on your device. Zero installs, instant load times, unlimited fun."}
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 py-2 border-b transition-colors duration-300 ${
          theme === "dark" ? "border-slate-800" : "border-slate-200"
        }`}>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { playUISound("click"); setActiveCategory(cat.id); setShowFavoritesOnly(false); }}
                className={`px-4.5 py-2.5 rounded-2xl text-xs md:text-sm font-black transition duration-200 cursor-pointer ${
                  activeCategory === cat.id && !showFavoritesOnly
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

          <div className={`text-xs font-bold transition-colors duration-300 ${
            theme === "dark" ? "text-slate-500" : "text-slate-400"
          }`}>
            {lang === "ar" 
              ? `تم العثور على ${filteredGames.length + filteredGMGames.length} لعبة` 
              : `Found ${filteredGames.length + filteredGMGames.length} games`}
          </div>
        </div>

        {/* Symmetrical Grid of Games */}
        {filteredGames.length === 0 && filteredGMGames.length === 0 ? (
          /* Empty State if absolutely nothing matches */
          <div className={`text-center py-16 rounded-3xl border space-y-4 max-w-lg mx-auto transition-all duration-300 ${
            theme === "dark" ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-lg"
          }`}>
            <span className="text-5xl">🔍</span>
            <h3 className={`text-xl font-black transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-slate-800"
            }`}>
              {lang === "ar" ? "عذراً، لم نجد أي نتائج" : "No Games Found"}
            </h3>
            <p className={`text-sm max-w-sm mx-auto transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}>
              {lang === "ar"
                ? "تأكد من كتابة اسم اللعبة بشكل صحيح أو غير الفئة النشطة لإظهار المزيد من الألعاب الممتعة."
                : "Try adjusting your search keywords or switch the active category to explore more titles."}
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); setShowFavoritesOnly(false); }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              {lang === "ar" ? "عرض جميع الألعاب" : "Show All Games"}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* 1. Curated/PokiBox Section */}
            {filteredGames.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b pb-3 border-purple-500/10">
                  <Gamepad2 className="w-5.5 h-5.5 text-purple-500" />
                  <h2 className="text-lg md:text-xl font-black tracking-tight">
                    {lang === "ar" ? "ألعاب دكورا الحصرية" : "Exclusive Dkora Games"}
                  </h2>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    theme === "dark" ? "bg-purple-500/15 text-purple-400" : "bg-purple-100 text-purple-700"
                  }`}>
                    {filteredGames.length}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredGames.map((game) => {
                    const isFav = favorites.includes(game.id);
                    return (
                      <div
                        key={game.id}
                        onClick={() => { playUISound("click"); setSelectedGame(game); }}
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer border hover:border-purple-500/50 shadow-md hover:shadow-2xl flex flex-col justify-end aspect-[1.4] w-full transition-all duration-300 ${
                          theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
                        <img
                          src={lang === "ar" ? (game.imageAr || game.image) : (game.imageEn || game.image)}
                          alt={lang === "ar" ? game.titleAr : game.titleEn}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition duration-500 ease-out z-0"
                        />
                        <div className="absolute top-3 left-3 z-20 flex gap-1.5 items-center">
                          <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md text-[10px] text-amber-400 font-extrabold px-2 py-1 rounded-full border border-white/10">
                            <Star className="w-3 h-3 fill-current text-amber-400" />
                            <span>{game.rating}</span>
                          </span>
                          {game.isNative && (
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow">
                              {lang === "ar" ? "مدمجة" : "NATIVE"}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => toggleFavorite(game.id, e)}
                          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-pink-500 active:scale-90 transition duration-150 cursor-pointer"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? "fill-current text-pink-500" : ""}`} />
                        </button>
                        <div className="p-4 z-20 space-y-1 transform group-hover:translate-y-[-2px] transition duration-300">
                          <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider block">
                            {lang === "ar" ? game.categoryAr : game.categoryEn}
                          </span>
                          <h3 className="text-sm md:text-base font-black text-white leading-tight line-clamp-1">
                            {lang === "ar" ? game.titleAr : game.titleEn}
                          </h3>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 opacity-0 group-hover:opacity-100 transition duration-300">
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-orange-500 fill-current" />
                              <span>{game.plays} {lang === "ar" ? "لاعب" : "plays"}</span>
                            </span>
                            <span className="text-amber-400 font-bold flex items-center gap-0.5">
                              {lang === "ar" ? "العب الآن" : "Play Now"} 
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. GameMonetize Section */}
            {!showFavoritesOnly && (
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2.5 border-b pb-3 border-purple-500/10">
                  <Sparkles className="w-5.5 h-5.5 text-amber-500 fill-amber-500/10" />
                  <h2 className="text-lg md:text-xl font-black tracking-tight">
                    {lang === "ar" ? "مكتبة الألعاب الحية" : "Live Arcade Games"}
                  </h2>
                  {!gmLoading && !gmError && filteredGMGames.length > 0 && (
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      theme === "dark" ? "bg-amber-500/15 text-amber-400" : "bg-amber-100 text-amber-700"
                    }`}>
                      {filteredGMGames.length}
                    </span>
                  )}
                </div>

                {gmLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
                    <p className="text-sm font-black text-purple-400 animate-pulse">
                      {lang === "ar" ? "جاري تحميل ألعاب إضافية ممتعة..." : "Loading premium live games..."}
                    </p>
                  </div>
                ) : gmError ? (
                  <div className="text-center py-12 space-y-4 max-w-md mx-auto">
                    <span className="text-4xl">⚠️</span>
                    <p className="text-sm text-red-400 font-bold">{gmError}</p>
                    <button
                      onClick={() => { setGamemonetizeGames([]); fetchGMGames(); }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
                    >
                      {lang === "ar" ? "إعادة المحاولة" : "Try Again"}
                    </button>
                  </div>
                ) : filteredGMGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredGMGames.map((game, idx) => (
                      <div
                        key={idx}
                        onClick={() => { playUISound("click"); setSelectedGMGame(game); }}
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer border hover:border-purple-500/50 shadow-md hover:shadow-2xl flex flex-col justify-end aspect-[1.3] w-full transition-all duration-300 ${
                          theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent z-10" />
                        <img
                          src={game.thumb}
                          alt={game.title}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition duration-500 ease-out z-0"
                        />
                        <div className="absolute top-3 left-3 z-20 flex gap-1.5 items-center">
                          <span className="bg-black/70 backdrop-blur-md text-[9px] text-purple-400 font-black px-2 py-1 rounded-full uppercase tracking-wider border border-white/10">
                            {game.category}
                          </span>
                        </div>
                        <div className="p-4 z-20 space-y-1 transform group-hover:translate-y-[-2px] transition duration-300">
                          <h3 className="text-sm md:text-base font-black text-white leading-tight line-clamp-1">
                            {game.title}
                          </h3>
                          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 opacity-0 group-hover:opacity-100 transition duration-300">
                            <span className="text-amber-400 font-bold flex items-center gap-0.5">
                              {lang === "ar" ? "العب الآن" : "Play Now"} 
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-12 rounded-3xl border space-y-3 max-w-md mx-auto transition-all duration-300 ${
                    theme === "dark" ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <span className="text-3xl">🔍</span>
                    <h3 className={`text-base font-black transition-colors duration-300 ${
                      theme === "dark" ? "text-white" : "text-slate-800"
                    }`}>
                      {lang === "ar" ? "لا ألعاب متوفرة في هذا القسم حالياً" : "No live games in this category"}
                    </h3>
                    <p className={`text-xs max-w-xs mx-auto transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {lang === "ar"
                        ? "اختر تصنيفاً آخر أو أعد تعيين التصفية لمشاهدة كافة الألعاب الحية."
                        : "Try selecting a different category or reset searches to browse all premium games."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Feature stats strip */}
        <section className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t transition-colors duration-300 ${
          theme === "dark" ? "border-slate-800" : "border-slate-200"
        }`}>
          <div className={`p-6 rounded-3xl border flex items-center gap-4 transition-all duration-300 ${
            theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors duration-300 ${
              theme === "dark" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-purple-500/5 text-purple-600 border-purple-500/10"
            }`}>
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-sm font-black transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}>{lang === "ar" ? "للهواتف والكمبيوتر" : "Fully Responsive"}</h4>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{lang === "ar" ? "العب بسلاسة على كافة الشاشات" : "Optimized for mobile & desk"}</p>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border flex items-center gap-4 transition-all duration-300 ${
            theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors duration-300 ${
              theme === "dark" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-500/5 text-amber-600 border-amber-500/10"
            }`}>
              <Star className="w-6 h-6 fill-current text-amber-400" />
            </div>
            <div>
              <h4 className={`text-sm font-black transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}>{lang === "ar" ? "ألعاب خالية من الإعلانات" : "Ad-Free & Clean"}</h4>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{lang === "ar" ? "لا إعلانات منبثقة مزعجة" : "Pure gameplay immersion"}</p>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border flex items-center gap-4 transition-all duration-300 ${
            theme === "dark" ? "bg-slate-900/40 border-slate-800/80" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors duration-300 ${
              theme === "dark" ? "bg-pink-500/10 text-pink-400 border-pink-500/20" : "bg-pink-500/5 text-pink-600 border-pink-500/10"
            }`}>
              <Heart className="w-6 h-6 fill-current text-pink-500" />
            </div>
            <div>
              <h4 className={`text-sm font-black transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-slate-800"
              }`}>{lang === "ar" ? "مفضلاتك مخزنة" : "Persistent Favorites"}</h4>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>{lang === "ar" ? "ألعابك محفوظة ومتاحة دائماً" : "Your preferences are cached"}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <footer className={`border-t mt-16 px-4 md:px-8 py-8 text-center text-slate-500 space-y-4 transition-all duration-300 ${
        theme === "dark" ? "bg-[#0b0c15] border-slate-800" : "bg-slate-100 border-slate-200"
      }`}>
        <div className="max-w-xl mx-auto space-y-2">
          <span className={`text-sm font-black transition-colors duration-300 ${
            theme === "dark" ? "text-slate-300" : "text-slate-700"
          }`}>
            🕹️ {translations[lang].footer.about} - {lang === "ar" ? "العاب اونلاين فري" : "Free Online Games"}
          </span>
          <p className={`text-xs leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-slate-400" : "text-slate-600"
          }`}>
            {translations[lang].footer.aboutText}
          </p>
        </div>

        {/* Interactive Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold pt-2 select-none">
          <button
            onClick={() => { playUISound("click"); setActiveLegalPage("privacy"); }}
            className={`transition-colors duration-200 cursor-pointer hover:underline ${
              theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
            }`}
          >
            {translations[lang].footer.privacy}
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => { playUISound("click"); setActiveLegalPage("terms"); }}
            className={`transition-colors duration-200 cursor-pointer hover:underline ${
              theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
            }`}
          >
            {translations[lang].footer.terms}
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => { playUISound("click"); setActiveLegalPage("disclaimer"); }}
            className={`transition-colors duration-200 cursor-pointer hover:underline ${
              theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
            }`}
          >
            {translations[lang].footer.disclaimer}
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => { playUISound("click"); setShowSitemapModal(true); }}
            className={`transition-colors duration-200 cursor-pointer hover:underline ${
              theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-500"
            }`}
          >
            {translations[lang].sitemap.title}
          </button>
        </div>

        <div className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold pt-2">
          &copy; 2026 Dkora Games. All Rights Reserved.
        </div>
      </footer>

      {/* Interactive Legal Policy Modal */}
      {activeLegalPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-2xl rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border relative max-h-[85vh] overflow-y-auto transition-all duration-300 ${
            theme === "dark" ? "bg-[#0d0e1b] border-purple-500/20 text-white" : "bg-white border-purple-100 text-slate-800"
          }`}>
            <button
              onClick={() => { playUISound("click"); setActiveLegalPage(null); }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-500/10 transition cursor-pointer"
              title={lang === "ar" ? "إغلاق" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-right rtl:text-right ltr:text-left">
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}>
                {lang === "ar" ? "الوثائق القانونية لشبكة ديكورا" : "Dkora Games Legal Documentation"}
              </span>
              <h2 className="text-xl md:text-2xl font-black leading-tight">
                {activeLegalPage === "privacy" 
                  ? translations[lang].legal.privacyTitle 
                  : activeLegalPage === "terms" 
                    ? translations[lang].legal.termsTitle 
                    : translations[lang].legal.disclaimerTitle
                }
              </h2>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-right rtl:text-right ltr:text-left">
              {(activeLegalPage === "privacy" 
                ? translations[lang].legal.privacyContent 
                : activeLegalPage === "terms" 
                  ? translations[lang].legal.termsContent 
                  : translations[lang].legal.disclaimerContent
              ).map((paragraph, index) => (
                <p 
                  key={index} 
                  className={theme === "dark" ? "text-slate-300" : "text-slate-600"}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => { playUISound("click"); setActiveLegalPage(null); }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-3 rounded-xl text-sm transition cursor-pointer"
              >
                {lang === "ar" ? "فهمت وموافق" : "I understand & agree"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive visual Sitemap Modal */}
      {showSitemapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className={`w-full max-w-3xl rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl border relative max-h-[85vh] overflow-y-auto transition-all duration-300 ${
            theme === "dark" ? "bg-[#0d0e1b] border-purple-500/20 text-white" : "bg-white border-purple-100 text-slate-800"
          }`}>
            <button
              onClick={() => { playUISound("click"); setShowSitemapModal(false); }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-500/10 transition cursor-pointer"
              title={lang === "ar" ? "إغلاق" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-right rtl:text-right ltr:text-left">
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}>
                {translations[lang].sitemap.subtitle}
              </span>
              <h2 className="text-xl md:text-2xl font-black leading-tight">
                {translations[lang].sitemap.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-right rtl:text-right ltr:text-left">
              {/* Static links card */}
              <div className={`p-5 rounded-2xl border ${
                theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <h3 className="text-sm font-black text-purple-400 mb-3 uppercase tracking-wider">
                  {translations[lang].sitemap.staticPages}
                </h3>
                <ul className="space-y-3 text-xs">
                  <li>
                    <a 
                      href="/"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("ar"); setSelectedGame(null); setActiveLegalPage(null); setShowSitemapModal(false); }}
                      className="hover:underline text-purple-400 block font-bold"
                    >
                      🎮 ديكورا - العاب اونلاين فرى (العربية)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("en"); setSelectedGame(null); setActiveLegalPage(null); setShowSitemapModal(false); }}
                      className="hover:underline text-purple-400 block font-bold"
                    >
                      🎮 Dkora - Free Online Games (English)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/favorites"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("ar"); setSelectedGame(null); setActiveLegalPage(null); setShowFavoritesOnly(true); setShowSitemapModal(false); }}
                      className="hover:underline text-purple-400/80 block"
                    >
                      ⭐ ألعابي المفضلة (العربية)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/favorites"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("en"); setSelectedGame(null); setActiveLegalPage(null); setShowFavoritesOnly(true); setShowSitemapModal(false); }}
                      className="hover:underline text-purple-400/80 block"
                    >
                      ⭐ My Favorite Games (English)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/sitemap"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("ar"); setSelectedGame(null); setActiveLegalPage(null); setShowSitemapModal(true); }}
                      className="hover:underline text-purple-400/80 block"
                    >
                      🗺️ خريطة الموقع (العربية)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/sitemap"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("en"); setSelectedGame(null); setActiveLegalPage(null); setShowSitemapModal(true); }}
                      className="hover:underline text-purple-400/80 block"
                    >
                      🗺️ Sitemap Index (English)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/privacy-policy"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("ar"); setActiveLegalPage("privacy"); setShowSitemapModal(false); }}
                      className="hover:underline text-slate-400 block"
                    >
                      🔒 {translations.ar.footer.privacy} (العربية)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/privacy-policy"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("en"); setActiveLegalPage("privacy"); setShowSitemapModal(false); }}
                      className="hover:underline text-slate-400 block"
                    >
                      🔒 {translations.en.footer.privacy} (English)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/terms-of-use"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("ar"); setActiveLegalPage("terms"); setShowSitemapModal(false); }}
                      className="hover:underline text-slate-400 block"
                    >
                      📜 {translations.ar.footer.terms} (العربية)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/terms-of-use"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("en"); setActiveLegalPage("terms"); setShowSitemapModal(false); }}
                      className="hover:underline text-slate-400 block"
                    >
                      📜 {translations.en.footer.terms} (English)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/disclaimer"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("ar"); setActiveLegalPage("disclaimer"); setShowSitemapModal(false); }}
                      className="hover:underline text-slate-400 block"
                    >
                      ⚠️ {translations.ar.footer.disclaimer} (العربية)
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/disclaimer"
                      onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("en"); setActiveLegalPage("disclaimer"); setShowSitemapModal(false); }}
                      className="hover:underline text-slate-400 block"
                    >
                      ⚠️ {translations.en.footer.disclaimer} (English)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Dynamic game links card */}
              <div className={`p-5 rounded-2xl border ${
                theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
              }`}>
                <h3 className="text-sm font-black text-purple-400 mb-3 uppercase tracking-wider">
                  {translations[lang].sitemap.dynamicSignals}
                </h3>
                <ul className="space-y-4 text-xs">
                  {GAMES_DATA.map(g => (
                    <li key={g.id} className="space-y-1 pb-2 border-b border-slate-800/20 last:border-0">
                      <span className="font-bold text-slate-400 block">{g.emoji} {lang === "ar" ? g.titleAr : g.titleEn}</span>
                      <div className="flex flex-col gap-1 text-[10px]">
                        <a 
                          href={`/game-${g.id}?lang=ar`}
                          onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("ar"); setSelectedGame(g); setShowSitemapModal(false); }}
                          className="hover:underline text-purple-400"
                        >
                          العربية: {`/game-${g.id}?lang=ar`}
                        </a>
                        <a 
                          href={`/game-${g.id}`}
                          onClick={(e) => { e.preventDefault(); playUISound("click"); setLang("en"); setSelectedGame(g); setShowSitemapModal(false); }}
                          className="hover:underline text-purple-400"
                        >
                          English: {`/game-${g.id}`}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[10px] text-center text-slate-500 pt-2 border-t border-slate-800/10">
              {translations[lang].sitemap.allRights}
            </div>
          </div>
        </div>
      )}

      {/* Immersive Fullscreen Game Player Modal */}
      {selectedGame && (
        <div 
          ref={playerContainerRef}
          className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-fade-in"
        >
          {/* Controller Top Bar */}
          <div className={`border-b px-4 py-3 flex items-center justify-between gap-4 select-none transition-all duration-300 ${
            theme === "dark" 
              ? "bg-[#0d0e1b] border-purple-500/10 text-white" 
              : "bg-white border-purple-100 text-slate-800 shadow-md"
          }`}>
            
            {/* Game info branding */}
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl">{selectedGame.emoji}</span>
              <div>
                <h3 className={`text-sm md:text-base font-black leading-tight transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-slate-800"
                }`}>
                  {lang === "ar" ? selectedGame.titleAr : selectedGame.titleEn}
                </h3>
                <span className={`text-[10px] block font-extrabold uppercase tracking-wider ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}>
                  {lang === "ar" ? selectedGame.categoryAr : selectedGame.categoryEn}
                </span>
              </div>
            </div>

            {/* Middle Action Controls */}
            <div className="flex items-center gap-2">
              {/* Reset/Reload Game Button */}
              <button
                onClick={() => {
                  playUISound("click");
                  if (selectedGame.isNative) {
                    // Quick state trigger via state re-assignment
                    const temp = selectedGame;
                    setSelectedGame(null);
                    setTimeout(() => setSelectedGame(temp), 50);
                  } else if (modalIframeRef.current) {
                    modalIframeRef.current.src = modalIframeRef.current.src;
                  }
                }}
                className={`p-2.5 border rounded-xl transition cursor-pointer ${
                  theme === "dark"
                    ? "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900"
                }`}
                title={lang === "ar" ? "إعادة تشغيل اللعبة" : "Reload Game"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className={`p-2.5 border rounded-xl transition cursor-pointer ${
                  theme === "dark"
                    ? "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900"
                } ${isFullscreen ? "text-purple-400 border-purple-500/30" : ""}`}
                title={lang === "ar" ? "شاشة كاملة" : "Fullscreen"}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Favorite Button inside Player */}
              <button
                onClick={(e) => toggleFavorite(selectedGame.id, e)}
                className={`p-2.5 border rounded-xl transition cursor-pointer ${
                  theme === "dark"
                    ? "bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-pink-500"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-pink-600"
                }`}
                title={lang === "ar" ? "أضف للمفضلة" : "Favorite"}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(selectedGame.id) ? "fill-current text-pink-500" : ""}`} />
              </button>
            </div>

            {/* Exit Close Button */}
            <button
              onClick={() => { playUISound("click"); setSelectedGame(null); }}
              className="p-2 bg-red-600/20 hover:bg-red-600 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded-xl transition duration-150 cursor-pointer"
              title={lang === "ar" ? "إغلاق اللعبة" : "Close Player"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Playing Area */}
          <div className={`flex-1 flex flex-col md:flex-row relative ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
            
            {/* Primary Game Stage */}
            <div className="flex-1 flex items-center justify-center p-4">
              {selectedGame.isNative ? (
                // Renders custom offline gameplay component
                <div className="w-full max-w-2xl">
                  {selectedGame.id === "neon-snake" ? (
                    <NativeSnake lang={lang} />
                  ) : selectedGame.id === "cheese-pacman" ? (
                    <NativePacman lang={lang} />
                  ) : (
                    <NativeBrickBreaker lang={lang} />
                  )}
                </div>
              ) : (
                // Renders high-fidelity unblocked online HTML5 iframe
                <div className="w-full h-full max-w-5xl rounded-2xl overflow-hidden border border-slate-800/60 bg-black/40 shadow-2xl relative">
                  <iframe
                    ref={modalIframeRef}
                    src={selectedGame.embedUrl}
                    title={selectedGame.titleEn}
                    className="w-full h-full border-none block bg-transparent"
                    allowFullScreen
                    allow="autoplay; gamepad; fullscreen"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              )}
            </div>

            {/* Side-panel Game description instructions (collapsible on mobile screens) */}
            <div className={`hidden lg:flex w-80 border-l p-6 flex-col justify-between select-none transition-all duration-300 ${
              theme === "dark" 
                ? "bg-[#0d0e1b] border-purple-500/10 text-slate-100" 
                : "bg-white border-purple-100 text-slate-850"
            }`}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}>
                    {lang === "ar" ? "تفاصيل وإرشادات" : "Instructions & Specs"}
                  </span>
                  <h4 className={`text-lg font-black transition-colors duration-300 ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}>
                    {lang === "ar" ? selectedGame.titleAr : selectedGame.titleEn}
                  </h4>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="flex items-center gap-0.5 text-xs text-amber-400 font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                      {selectedGame.rating}
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                      {selectedGame.plays} {lang === "ar" ? "زيارة" : "plays"}
                    </span>
                  </div>
                </div>

                <div className={`p-4 border rounded-2xl space-y-2.5 transition-all duration-300 ${
                  theme === "dark" ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className={`flex items-center gap-2 text-xs font-bold ${
                    theme === "dark" ? "text-white" : "text-slate-800"
                  }`}>
                    <Info className={`w-4 h-4 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                    <span>{lang === "ar" ? "كيفية اللعب:" : "How to play:"}</span>
                  </div>
                  <p className={`text-xs leading-relaxed text-justify transition-colors duration-300 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {lang === "ar" ? selectedGame.descriptionAr : selectedGame.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Bottom watermark / rating button */}
              <div className={`pt-4 border-t text-center ${theme === "dark" ? "border-slate-800/80" : "border-slate-200"}`}>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                  {lang === "ar" ? "استمتع باللعب مع ديكورا العاب اونلاين" : "Powered by Dkora Games Portal"}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Immersive GameMonetize Game Player Modal / Game View Page */}
      {selectedGMGame && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col animate-fade-in overflow-y-auto ${
            theme === "dark" ? "bg-[#080914] text-white" : "bg-[#f8f9fc] text-slate-800"
          }`}
        >
          {/* Controller Top Bar */}
          <div className={`sticky top-0 z-10 border-b px-4 py-3.5 flex items-center justify-between gap-4 select-none backdrop-blur-md shadow-md transition-all duration-300 ${
            theme === "dark" 
              ? "bg-[#0d0e1b]/95 border-purple-500/10 text-white" 
              : "bg-white/95 border-purple-100 text-slate-800"
          }`}>
            {/* Game info branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-500/20 shadow-md">
                <img src={selectedGMGame.thumb} alt={selectedGMGame.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-black leading-tight font-sans">
                  {selectedGMGame.title}
                </h3>
                <span className={`text-[10px] block font-extrabold uppercase tracking-wider font-sans ${
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }`}>
                  {selectedGMGame.category}
                </span>
              </div>
            </div>

            {/* Middle Action Controls */}
            <div className="flex items-center gap-2">
              {/* Back to games list */}
              <button
                onClick={() => { playUISound("click"); setSelectedGMGame(null); }}
                className={`flex items-center gap-1 px-4 py-2 border rounded-xl text-xs font-black transition cursor-pointer font-sans ${
                  theme === "dark"
                    ? "bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white"
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === "ar" ? "العودة للرئيسية" : "Back to Catalog"}</span>
              </button>
            </div>

            {/* Exit Close Button */}
            <button
              onClick={() => { playUISound("click"); setSelectedGMGame(null); }}
              className="p-2 bg-red-600/20 hover:bg-red-600 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded-xl transition duration-150 cursor-pointer"
              title={lang === "ar" ? "إغلاق اللعبة" : "Close Player"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Symmetrical Layout Stage with Interactive Ads around it */}
          <div className="flex-1 flex flex-col py-6 px-4 md:px-8 space-y-8 max-w-7xl w-full mx-auto">
            
            {/* Center Stage Arena */}
            <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-6">
              
              {/* Left Skyscraper Mock Ad Box (Visible on Desktop Screen sizes >= 1280px) */}
              <div className={`hidden xl:flex w-[160px] border rounded-2xl p-4 flex-col justify-between items-center text-center select-none shadow-md transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-[#0d0e1b]/60 border-purple-500/10 text-slate-400" 
                  : "bg-slate-50 border-purple-100 text-slate-600"
              }`}>
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-400 font-sans">إعلان ممول</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse mx-auto"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md">
                    <Gamepad2 className="w-6 h-6 animate-bounce" />
                  </div>
                  <p className="text-xs font-black leading-tight font-sans">
                    {lang === "ar" ? "أفضل ألعاب المتصفح بدون تحميل!" : "Play Top Web Games Instantly!"}
                  </p>
                  <p className="text-[10px] text-slate-500 font-sans">
                    {lang === "ar" ? "سريعة وآمنة 100%" : "100% Free & Fast"}
                  </p>
                </div>
                
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-2 rounded-xl text-[10px] uppercase tracking-wider transition font-sans">
                  {lang === "ar" ? "العب الآن" : "Play Now"}
                </button>
              </div>

              {/* Central Gameplay Area */}
              <div className="flex-1 flex flex-col items-center w-full">
                
                {/* Horizontal Tablet/Mobile Mock Ad (Hidden on xl desktop) */}
                <div className={`xl:hidden w-full max-w-3xl h-[80px] sm:h-[90px] border rounded-2xl p-3 flex items-center justify-between gap-4 mb-4 select-none shadow-sm transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-[#0d0e1b]/60 border-purple-500/10 text-slate-400"
                    : "bg-slate-50 border-purple-100 text-slate-600"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-purple-400 block font-sans">ADVERTISEMENT | إعلان</span>
                      <p className="text-xs font-black leading-tight text-slate-450 font-sans">
                        {lang === "ar" ? "اضغط هنا لاستكشاف ألعاب الألغاز المميزة!" : "Unleash extreme puzzles & adventure!"}
                      </p>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black px-4 py-2 rounded-xl text-[10px] uppercase transition shadow-md whitespace-nowrap font-sans">
                    {lang === "ar" ? "ابدأ اللعب" : "Start Now"}
                  </button>
                </div>

                {/* Primary Game frame container */}
                <div className="w-full aspect-video max-w-4xl rounded-3xl overflow-hidden border border-purple-500/20 bg-black/60 shadow-2xl relative">
                  <iframe
                    src={selectedGMGame.url}
                    title={selectedGMGame.title}
                    className="w-full h-full border-none block bg-black"
                    allowFullScreen
                    allow="autoplay; gamepad; fullscreen"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              </div>

              {/* Right Skyscraper Mock Ad Box (Visible on Desktop Screen sizes >= 1280px) */}
              <div className={`hidden xl:flex w-[160px] border rounded-2xl p-4 flex-col justify-between items-center text-center select-none shadow-md transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-[#0d0e1b]/60 border-purple-500/10 text-slate-400" 
                  : "bg-slate-50 border-purple-100 text-slate-600"
              }`}>
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-purple-400 font-sans">رعاة المنصة</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse mx-auto"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-xs font-black leading-tight font-sans">
                    {lang === "ar" ? "ألعاب ذكاء وتحدي خارقة!" : "Play Mindblowing Brain Quizzes!"}
                  </p>
                  <p className="text-[10px] text-slate-500 font-sans">
                    {lang === "ar" ? "ألعاب آمنة 100%" : "No Installs Required"}
                  </p>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-2 rounded-xl text-[10px] uppercase tracking-wider transition font-sans">
                  {lang === "ar" ? "اكتشف الآن" : "Explore"}
                </button>
              </div>

            </div>

            {/* Game Info, Instructions & Specifications */}
            <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800/20">
              
              {/* Instructions and specs */}
              <div className="md:col-span-2 space-y-6">
                
                {/* How to Play Card */}
                <div className={`p-6 border rounded-3xl space-y-4 transition-all duration-300 ${
                  theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <div className="flex items-center gap-2 text-sm font-black text-purple-400">
                    <Info className="w-4.5 h-4.5" />
                    <span>{lang === "ar" ? "طريقة اللعب وإرشادات التحكم:" : "How to Play & Controls:"}</span>
                  </div>
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
                    theme === "dark" ? "text-slate-300" : "text-slate-600"
                  }`}>
                    {selectedGMGame.instructions || (lang === "ar" 
                      ? "استخدم الفأرة أو شاشة اللمس للتحكم في عناصر اللعبة واتباع التعليمات التي تظهر على الشاشة لبدء اللعب والاستمتاع باللعبة الحية مباشرة."
                      : "Use your mouse or touchscreen to control the gameplay. Follow the in-game tutorials and have extreme fun playing instantly.")}
                  </p>
                </div>

                {/* Description Card */}
                <div className={`p-6 border rounded-3xl space-y-4 transition-all duration-300 ${
                  theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h4 className="text-sm font-black text-purple-400 uppercase tracking-wider">
                    {lang === "ar" ? "تفاصيل ووصف اللعبة:" : "Game Description:"}
                  </h4>
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap text-justify transition-colors duration-300 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {selectedGMGame.description || (lang === "ar"
                      ? "استمتع بلعب هذه اللعبة الممتازة مباشرة على متصفحك مجاناً وبدون الحاجة إلى تحميل أي ملفات إضافية."
                      : "Play this premium high-quality online game immediately in your web browser for free with no downloading required.")}
                  </p>
                </div>

              </div>

              {/* Dynamic Game Specifications Sidebar */}
              <div className="space-y-6">
                
                {/* Meta details card */}
                <div className={`p-6 border rounded-3xl space-y-4 transition-all duration-300 ${
                  theme === "dark" ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h4 className="text-sm font-black text-purple-400 uppercase tracking-wider font-sans">
                    {lang === "ar" ? "مواصفات اللعبة" : "Game Specs"}
                  </h4>
                  
                  <div className="space-y-3.5 text-xs font-bold font-sans">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-850/10">
                      <span className="text-slate-500">{lang === "ar" ? "التصنيف الرئيسي" : "Category"}</span>
                      <span className="text-slate-300">{selectedGMGame.category}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-850/10">
                      <span className="text-slate-500">{lang === "ar" ? "حجم العرض المقترح" : "Resolution"}</span>
                      <span className="text-slate-300">{selectedGMGame.width || "800"}x{selectedGMGame.height || "600"} px</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-slate-850/10">
                      <span className="text-slate-500">{lang === "ar" ? "ألعاب مدمجة بواسطة" : "Powered by"}</span>
                      <span className="text-purple-400">GameMonetize</span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-slate-500">{lang === "ar" ? "حالة اللعب" : "Status"}</span>
                      <span className="text-green-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        {lang === "ar" ? "متصلة / نشطة" : "Active / Live"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clean Watermark Branding */}
                <div className="text-center space-y-2 select-none py-2 font-sans">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">
                    {lang === "ar" ? "بوابة ألعاب ديكورا اون لاين فرى" : "Dkora Games Web Portal"}
                  </span>
                  <span className="text-[9px] text-slate-600 block">
                    {lang === "ar" ? "ألعاب متصفح مجانية متكاملة 100%" : "100% Free HTML5 Gaming Center"}
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom Section: Related GameMonetize Games */}
            <div className="space-y-4 pt-6 border-t border-slate-800/10">
              <h3 className="text-base font-black text-white uppercase tracking-wider font-sans">
                {lang === "ar" ? "ألعاب ذات صلة قد تعجبك" : "Related Games You Might Like"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gamemonetizeGames
                  .filter(g => g.title !== selectedGMGame.title)
                  .slice(0, 4)
                  .map((rel, idx) => (
                    <div
                      key={idx}
                      onClick={() => { playUISound("click"); setSelectedGMGame(rel); }}
                      className="group relative aspect-[1.4] rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-purple-500/30 shadow-md transition duration-300"
                    >
                      <img src={rel.thumb} alt={rel.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                      <div className="absolute bottom-2 left-2 right-2 z-20">
                        <span className="text-[10px] text-white font-black line-clamp-1 font-sans">{rel.title}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
