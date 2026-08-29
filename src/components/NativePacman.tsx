import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Flame, Sparkles, Zap, Clock } from "lucide-react";

interface NativePacmanProps {
  lang: "ar" | "en";
}

// Tile Map types:
// 1 = Wall
// 2 = Small Cheese (Dot)
// 3 = Big Cheddar (Power Pellet)
// 0 = Empty Path
// 5 = Mouse Spawn
// 6 = Cat House Spawn

const MAZE_STAGE_1 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,3,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,3,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,5,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const MAZE_STAGE_2 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,3,2,2,2,2,1,2,2,1,2,2,1,2,2,2,2,3,1],
  [1,2,1,1,1,2,1,2,1,1,1,2,1,2,1,1,1,2,1],
  [1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1],
  [1,2,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,2,1],
  [1,2,2,2,1,0,0,1,2,1,2,1,0,0,1,2,2,2,1],
  [1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1],
  [0,0,1,2,2,2,2,2,2,0,2,2,2,2,2,2,1,0,0],
  [1,1,1,2,1,1,2,1,1,0,1,1,2,1,1,2,1,1,1],
  [0,0,0,2,1,1,2,1,0,0,0,1,2,1,1,2,0,0,0],
  [1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1],
  [0,0,1,2,2,2,2,2,2,5,2,2,2,2,2,2,1,0,0],
  [1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1],
  [1,2,2,2,2,2,1,2,2,1,2,2,1,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,2,1,1,1,2,1,2,1,1,1,2,1],
  [1,3,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,3,1],
  [1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const MAZE_STAGE_3 = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,3,1,2,2,2,2,2,1,1,1,2,2,2,2,2,1,3,1],
  [1,2,1,2,1,1,1,2,1,1,1,2,1,1,1,2,1,2,1],
  [1,2,2,2,1,1,1,2,2,2,2,2,1,1,1,2,2,2,1],
  [1,1,1,2,2,2,2,2,1,1,1,2,2,2,2,2,1,1,1],
  [1,1,1,1,1,2,1,2,1,1,1,2,1,2,1,1,1,1,1],
  [1,2,2,2,1,2,1,2,2,1,2,2,1,2,1,2,2,2,1],
  [1,2,1,2,1,2,1,1,2,1,2,1,1,2,1,2,1,2,1],
  [1,2,1,2,2,2,2,2,2,5,2,2,2,2,2,2,1,2,1],
  [1,2,1,1,1,2,1,1,1,0,1,1,1,2,1,1,1,2,1],
  [1,2,1,2,2,2,2,1,1,0,1,1,2,2,2,2,1,2,1],
  [1,2,1,2,1,1,2,1,1,0,1,1,2,1,1,2,1,2,1],
  [1,2,2,2,1,1,2,2,2,2,2,2,2,1,1,2,2,2,1],
  [1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1],
  [1,1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1,1,1],
  [1,3,1,1,1,2,1,1,2,1,2,1,1,2,1,1,1,3,1],
  [1,2,2,2,2,2,1,1,2,1,2,1,1,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

interface Character {
  x: number; // grid position
  y: number;
  subX: number; // precise pixel fraction (0 to 1)
  subY: number;
  dirX: number;
  dirY: number;
  nextDirX: number;
  nextDirY: number;
  speed: number;
}

interface Ghost {
  x: number;
  y: number;
  subX: number;
  subY: number;
  dirX: number;
  dirY: number;
  speed: number;
  color: string;
  name: string;
  emoji: string;
  isFrightened: boolean;
  isEaten: boolean;
}

export default function NativePacman({ lang }: NativePacmanProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game metrics:
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("poki_pacman_highscore") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [levelClear, setLevelClear] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(120); // progressive stage timer limit
  
  // Power pellet states:
  const [frightenedTime, setFrightenedTime] = useState(0); // in seconds
  
  // Map dimensions
  const rows = 19;
  const cols = 19;
  const tileSize = 28; // individual tile width/height (wider lanes)
  
  // Dynamic current level grid
  const currentGridRef = useRef<number[][]>([]);
  const animationFrameId = useRef<number | null>(null);
  
  // Player mouse state
  const mouseRef = useRef<Character>({
    x: 9,
    y: 15,
    subX: 0,
    subY: 0,
    dirX: 0,
    dirY: 0,
    nextDirX: 0,
    nextDirY: 0,
    speed: 0.15 // tile fraction per frame (relaxed, precise, and comfortable)
  });

  // Ghosts state
  const ghostsRef = useRef<Ghost[]>([
    { x: 9, y: 8, subX: 0, subY: 0, dirX: 1, dirY: 0, speed: 0.11, color: "#ef4444", name: "Blinky", emoji: "🐱", isFrightened: false, isEaten: false },
    { x: 9, y: 9, subX: 0, subY: 0, dirX: -1, dirY: 0, speed: 0.11, color: "#ec4899", name: "Pinky", emoji: "🦁", isFrightened: false, isEaten: false },
    { x: 8, y: 9, subX: 0, subY: 0, dirX: 0, dirY: -1, speed: 0.09, color: "#06b6d4", name: "Inky", emoji: "🐯", isFrightened: false, isEaten: false },
    { x: 10, y: 9, subX: 0, subY: 0, dirX: 0, dirY: 1, speed: 0.09, color: "#f97316", name: "Clyde", emoji: "🦊", isFrightened: false, isEaten: false }
  ]);

  // Audio synthesizer via Web Audio API
  const playSound = (type: "chomp" | "power" | "eat_ghost" | "death" | "clear") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === "chomp") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "power") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.15);
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "eat_ghost") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === "death") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.15);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === "clear") {
        // Play a short celebratory chime arpeggio
        const playNote = (freq: number, start: number, duration: number) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sine";
          o.frequency.setValueAtTime(freq, ctx.currentTime + start);
          g.gain.setValueAtTime(0.08, ctx.currentTime + start);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(ctx.currentTime + start);
          o.stop(ctx.currentTime + start + duration);
        };
        playNote(523.25, 0, 0.15); // C5
        playNote(659.25, 0.15, 0.15); // E5
        playNote(783.99, 0.3, 0.15); // G5
        playNote(1046.50, 0.45, 0.3); // C6
      }
    } catch (err) {
      console.warn("Web Audio Synthesis failed", err);
    }
  };

  const getLevelDetails = (lvl: number) => {
    if (lang === "ar") {
      if (lvl === 1) {
        return {
          title: "المرحلة الأولى: حديقة القطط الهادئة",
          desc: "القطط بطيئة ومسترخية. لديك وقت طويل (120 ثانية) و 8 ثوانٍ كاملة من القوة الخارقة لافتراسها!",
          bg: "border-blue-500/20 bg-blue-500/5 text-blue-400"
        };
      }
      if (lvl === 2) {
        return {
          title: "المرحلة الثانية: مصنع الجبن الغامض",
          desc: "انتبه! تزداد سرعة القطط وتتحرك بذكاء أكبر. وقت الفوز تقلّص إلى 95 ثانية، وقوة الجبن الخارقة تمنحك 6.5 ثانية فقط!",
          bg: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
        };
      }
      if (lvl === 3) {
        return {
          title: "المرحلة الثالثة: قلعة القطط الغاضبة",
          desc: "تحدي الأركيد الحقيقي! القطط سريعة ومصممة على مطاردتك. وقت الفوز تقلّص إلى 75 ثانية وقوة التهام الأعداء تدوم 5 ثوانٍ فقط!",
          bg: "border-purple-500/20 bg-purple-500/5 text-purple-400"
        };
      }
      return {
        title: `المرحلة ${lvl}: الغرفة المغلقة الفائقة`,
        desc: "صعوبة خارقة وقصوى! القطط سريعة جداً وذكية للغاية. وقت الفوز ضيق جداً (60 ثانية) وقوة التهام الأعداء تدوم 3 ثوانٍ فقط لتتحداك!",
        bg: "border-red-500/20 bg-red-500/5 text-red-400"
      };
    } else {
      if (lvl === 1) {
        return {
          title: "Stage 1: Serene Cats Garden",
          desc: "Cats are relaxed and slow. You have a generous 120 seconds limit and 8 full seconds of power-up to defeat them!",
          bg: "border-blue-500/20 bg-blue-500/5 text-blue-400"
        };
      }
      if (lvl === 2) {
        return {
          title: "Stage 2: Mystery Cheese Factory",
          desc: "Watch out! Cats speed up with smarter tactics. Time limit is down to 95 seconds and power-ups last 6.5s!",
          bg: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
        };
      }
      if (lvl === 3) {
        return {
          title: "Stage 3: Angry Cats Castle",
          desc: "Real arcade challenge! Speedy cats. Win time limit is down to 75 seconds and power-ups last 5s!",
          bg: "border-purple-500/20 bg-purple-500/5 text-purple-400"
        };
      }
      return {
        title: `Stage ${lvl}: The Ultimate Chamber`,
        desc: "Insane difficulty! Ghosts are extremely rapid. Win time is strictly limited to 60 seconds and power-ups last 3s!",
        bg: "border-red-500/20 bg-red-500/5 text-red-400"
      };
    }
  };

  // Get map layout for active level
  const getMazeLayout = (lvl: number): number[][] => {
    let base;
    if (lvl === 1) base = MAZE_STAGE_1;
    else if (lvl === 2) base = MAZE_STAGE_2;
    else base = MAZE_STAGE_3;
    // Deep clone array to avoid referencing state
    return JSON.parse(JSON.stringify(base));
  };

  const initGame = (lvl: number, isRestart = false) => {
    currentGridRef.current = getMazeLayout(lvl);
    
    // Position player safely based on the lvl map
    mouseRef.current = {
      x: 9,
      y: 15,
      subX: 0,
      subY: 0,
      dirX: 0,
      dirY: 0,
      nextDirX: 0,
      nextDirY: 0,
      speed: 0.14 + lvl * 0.012 // Balanced relaxed speed progression
    };

    // Respawn ghosts inside house: Ghost speed scales up with each stage level
    ghostsRef.current = [
      { x: 9, y: 8, subX: 0, subY: 0, dirX: 1, dirY: 0, speed: 0.09 + lvl * 0.015, color: "#ef4444", name: "Blinky", emoji: "🐱", isFrightened: false, isEaten: false },
      { x: 9, y: 9, subX: 0, subY: 0, dirX: -1, dirY: 0, speed: 0.09 + lvl * 0.015, color: "#ec4899", name: "Pinky", emoji: "🦁", isFrightened: false, isEaten: false },
      { x: 8, y: 9, subX: 0, subY: 0, dirX: 0, dirY: -1, speed: 0.07 + lvl * 0.015, color: "#06b6d4", name: "Inky", emoji: "🐯", isFrightened: false, isEaten: false },
      { x: 10, y: 9, subX: 0, subY: 0, dirX: 0, dirY: 1, speed: 0.07 + lvl * 0.015, color: "#f97316", name: "Clyde", emoji: "🦊", isFrightened: false, isEaten: false }
    ];

    // Progressive Time Limit decreases with each new stage: Level 1 (120s), Level 2 (95s), Level 3 (75s), Level 4+ (60s)
    const timeForLevel = Math.max(60, 120 - (lvl - 1) * 25);
    setTimeRemaining(timeForLevel);

    setFrightenedTime(0);
    setLevelClear(false);
    if (isRestart) {
      setScore(0);
      setLevel(1);
      setLives(3);
      setGameOver(false);
    }
  };

  const handleStart = () => {
    initGame(1, true);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    initGame(1, true);
    setIsPlaying(true);
  };

  // Keyboard controls helper
  const handleDirectionInput = (dx: number, dy: number) => {
    if (!isPlaying || gameOver || levelClear) return;
    mouseRef.current.nextDirX = dx;
    mouseRef.current.nextDirY = dy;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          handleDirectionInput(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          handleDirectionInput(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          handleDirectionInput(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          handleDirectionInput(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver, levelClear]);

  // Touch swipe controls for mobile screens directly on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent scrolling the page while swiping on the game board
      if (isPlaying && !gameOver && !levelClear) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isPlaying || gameOver || levelClear) return;
      if (e.changedTouches.length === 1) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        const threshold = 25; // Responsive swipe distance in pixels
        if (Math.max(absX, absY) > threshold) {
          if (absX > absY) {
            // Horizontal swipe
            if (dx > 0) {
              handleDirectionInput(1, 0); // Right
            } else {
              handleDirectionInput(-1, 0); // Left
            }
          } else {
            // Vertical swipe
            if (dy > 0) {
              handleDirectionInput(0, 1); // Down
            } else {
              handleDirectionInput(0, -1); // Up
            }
          }
        }
      }
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPlaying, gameOver, levelClear]);

  // Power pellet scared mode timer tick
  useEffect(() => {
    if (frightenedTime > 0 && isPlaying && !gameOver && !levelClear) {
      const timer = setInterval(() => {
        setFrightenedTime((prev) => {
          if (prev <= 1) {
            // Restore ghosts to normal behavior
            ghostsRef.current.forEach((g) => {
              g.isFrightened = false;
              g.isEaten = false;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [frightenedTime, isPlaying, gameOver, levelClear]);

  // Stage Win Time Countdown Timer Tick
  useEffect(() => {
    if (isPlaying && !gameOver && !levelClear) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time Out! Player loses a life
            playSound("death");
            setLives((l) => {
              const nextLives = l - 1;
              if (nextLives <= 0) {
                setGameOver(true);
                setIsPlaying(false);
              } else {
                // Reset characters safely
                const mouse = mouseRef.current;
                mouse.x = 9;
                mouse.y = 15;
                mouse.subX = 0;
                mouse.subY = 0;
                mouse.dirX = 0;
                mouse.dirY = 0;
                mouse.nextDirX = 0;
                mouse.nextDirY = 0;
                
                ghostsRef.current.forEach((g, i) => {
                  g.x = 9;
                  g.y = (i === 0) ? 8 : 9;
                  g.subX = 0;
                  g.subY = 0;
                  g.dirX = (i % 2 === 0) ? 1 : -1;
                  g.dirY = 0;
                  g.isFrightened = false;
                  g.isEaten = false;
                  g.speed = (g.name === "Blinky" || g.name === "Pinky") 
                    ? 0.09 + level * 0.015 
                    : 0.07 + level * 0.015;
                });
              }
              return nextLives;
            });
            // Reset timer limit for current stage as a grace period
            return Math.max(60, 120 - (level - 1) * 25);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, gameOver, levelClear, level]);

  // Main game logic loop and frame drawing
  useEffect(() => {
    if (!isPlaying || gameOver || levelClear) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isWall = (x: number, y: number): boolean => {
      // Allow wrap-around corridors
      if (x < 0 || x >= cols) return false;
      if (y < 0 || y >= rows) return false;
      return currentGridRef.current[y]?.[x] === 1;
    };

    const countCheeseRemaining = (): number => {
      let count = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tile = currentGridRef.current[r]?.[c];
          if (tile === 2 || tile === 3) count++;
        }
      }
      return count;
    };

    const updatePhysics = () => {
      const mouse = mouseRef.current;

      // 1. Update player subpixel movement fraction
      if (mouse.dirX !== 0 || mouse.dirY !== 0) {
        mouse.subX += mouse.dirX * mouse.speed;
        mouse.subY += mouse.dirY * mouse.speed;
      }

      // Check if mouse reached or surpassed a grid center boundary
      if (Math.abs(mouse.subX) >= 1 || Math.abs(mouse.subY) >= 1) {
        mouse.x += Math.sign(mouse.subX);
        mouse.y += Math.sign(mouse.subY);
        mouse.subX = 0;
        mouse.subY = 0;

        // Wrap around corridors on the left/right boundaries
        if (mouse.x < 0) mouse.x = cols - 1;
        if (mouse.x >= cols) mouse.x = 0;

        // Eat Cheddar Cheese dot
        const currentTile = currentGridRef.current[mouse.y]?.[mouse.x];
        if (currentTile === 2) {
          currentGridRef.current[mouse.y][mouse.x] = 0;
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              try { localStorage.setItem("poki_pacman_highscore", String(nextScore)); } catch(e){}
            }
            return nextScore;
          });
          playSound("chomp");
        } else if (currentTile === 3) {
          // Power Pellet
          currentGridRef.current[mouse.y][mouse.x] = 0;
          setScore((s) => {
            const nextScore = s + 50;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              try { localStorage.setItem("poki_pacman_highscore", String(nextScore)); } catch(e){}
            }
            return nextScore;
          });
          playSound("power");
          const activeFrightenedTime = Math.max(3, 8 - (level - 1) * 1.5);
          setFrightenedTime(activeFrightenedTime);
          ghostsRef.current.forEach((g) => {
            if (!g.isEaten) g.isFrightened = true;
          });
        }

        // Stop mouse from sliding into a wall if no keys are pressed
        if (isWall(mouse.x + mouse.dirX, mouse.y + mouse.dirY)) {
          mouse.dirX = 0;
          mouse.dirY = 0;
        }

        // Check if level is fully cleared
        if (countCheeseRemaining() === 0) {
          playSound("clear");
          setLevelClear(true);
          setTimeout(() => {
            setLevel((l) => {
              const nextLevel = l + 1;
              initGame(nextLevel, false);
              return nextLevel;
            });
          }, 2000);
          return;
        }
      }

      // 2. Responsive Controls: Instant Reversal & Smart Corner Snapping
      if (mouse.nextDirX !== 0 || mouse.nextDirY !== 0) {
        // A. Instant Reversal (always allowed):
        const isReversingHorizontally = mouse.nextDirX !== 0 && mouse.nextDirX === -mouse.dirX;
        const isReversingVertically = mouse.nextDirY !== 0 && mouse.nextDirY === -mouse.dirY;

        if (isReversingHorizontally) {
          mouse.dirX = mouse.nextDirX;
          mouse.subX = -mouse.subX;
        } else if (isReversingVertically) {
          mouse.dirY = mouse.nextDirY;
          mouse.subY = -mouse.subY;
        } else {
          // B. Smart Corner Snapping (Pre-turning perpendicular alleys when close to grid center):
          const isTurningVertically = mouse.nextDirY !== 0 && mouse.dirX !== 0;
          const isTurningHorizontally = mouse.nextDirX !== 0 && mouse.dirY !== 0;

          if (isTurningVertically && Math.abs(mouse.subX) < 0.45) {
            if (!isWall(mouse.x, mouse.y + mouse.nextDirY)) {
              mouse.subX = 0; // Snap cleanly to the lane center line
              mouse.dirX = 0;
              mouse.dirY = mouse.nextDirY;
            }
          } else if (isTurningHorizontally && Math.abs(mouse.subY) < 0.45) {
            if (!isWall(mouse.x + mouse.nextDirX, mouse.y)) {
              mouse.subY = 0; // Snap cleanly to the lane center line
              mouse.dirY = 0;
              mouse.dirX = mouse.nextDirX;
            }
          }
        }
      }

      // Standard grid-aligned turning fall-back
      if (mouse.subX === 0 && mouse.subY === 0) {
        if (mouse.nextDirX !== 0 || mouse.nextDirY !== 0) {
          if (!isWall(mouse.x + mouse.nextDirX, mouse.y + mouse.nextDirY)) {
            mouse.dirX = mouse.nextDirX;
            mouse.dirY = mouse.nextDirY;
          }
        }
      }

      // 3. Move and update ghosts pathing
      const ghosts = ghostsRef.current;
      ghosts.forEach((ghost) => {
        if (ghost.isEaten) {
          // Head back to spawn point quickly
          const targetX = 9;
          const targetY = 9;
          if (ghost.x === targetX && ghost.y === targetY) {
            ghost.isEaten = false;
            ghost.isFrightened = false;
            ghost.speed = (ghost.name === "Blinky" || ghost.name === "Pinky") 
              ? 0.09 + level * 0.015 
              : 0.07 + level * 0.015;
          } else {
            // Straight-line target pathing
            const dx = Math.sign(targetX - ghost.x);
            const dy = Math.sign(targetY - ghost.y);
            ghost.x += dx;
            ghost.y += dy;
          }
          return;
        }

        ghost.subX += ghost.dirX * ghost.speed;
        ghost.subY += ghost.dirY * ghost.speed;

        if (Math.abs(ghost.subX) >= 1 || Math.abs(ghost.subY) >= 1) {
          ghost.x += Math.sign(ghost.subX);
          ghost.y += Math.sign(ghost.subY);
          ghost.subX = 0;
          ghost.subY = 0;

          // Wrap-around paths
          if (ghost.x < 0) ghost.x = cols - 1;
          if (ghost.x >= cols) ghost.x = 0;

          // Decide next turn at junction intersections
          const possibleDirs: {x: number, y: number}[] = [];
          const dirs = [{x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 1, y: 0}];
          
          dirs.forEach((d) => {
            // Cannot immediately reverse direction in standard state
            if (d.x === -ghost.dirX && d.y === -ghost.dirY) return;
            if (!isWall(ghost.x + d.x, ghost.y + d.y)) {
              possibleDirs.push(d);
            }
          });

          // Fallback if no paths (allows immediate reversal)
          if (possibleDirs.length === 0) {
            possibleDirs.push({ x: -ghost.dirX, y: -ghost.dirY });
          }

          // Choose smart AI tracking based on frightened status
          if (ghost.isFrightened) {
            // Frightened state: Choose completely random valid intersection path
            const chosen = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
            ghost.dirX = chosen.x;
            ghost.dirY = chosen.y;
          } else {
            // Chase state: Target player with distance estimation (minimizing Manhattan distance)
            let bestDir = possibleDirs[0];
            let minDistance = Infinity;

            possibleDirs.forEach((pd) => {
              const nextX = ghost.x + pd.x;
              const nextY = ghost.y + pd.y;
              // Manhattan distance to hungry mouse
              const dist = Math.abs(nextX - mouse.x) + Math.abs(nextY - mouse.y);
              if (dist < minDistance) {
                minDistance = dist;
                bestDir = pd;
              }
            });

            if (bestDir) {
              ghost.dirX = bestDir.x;
              ghost.dirY = bestDir.y;
            }
          }
        }

        // 4. Check real-time bounding collisions with mouse
        const playerCenterX = mouse.x + mouse.subX;
        const playerCenterY = mouse.y + mouse.subY;
        const ghostCenterX = ghost.x + ghost.subX;
        const ghostCenterY = ghost.y + ghost.subY;

        // Distance buffer
        const distSq = Math.pow(playerCenterX - ghostCenterX, 2) + Math.pow(playerCenterY - ghostCenterY, 2);
        if (distSq < 0.36) { // Less than 0.6 cells distance triggers collision
          if (ghost.isFrightened) {
            // Mouse eats cat!
            playSound("eat_ghost");
            ghost.isEaten = true;
            ghost.isFrightened = false;
            ghost.speed = 0.20; // High speed retreat
            setScore((s) => s + 200);
          } else if (!ghost.isEaten) {
            // Mouse dies!
            playSound("death");
            setLives((l) => {
              const nextLives = l - 1;
              if (nextLives <= 0) {
                setGameOver(true);
                setIsPlaying(false);
              } else {
                // Quick reset round
                mouse.x = 9;
                mouse.y = 15;
                mouse.subX = 0;
                mouse.subY = 0;
                mouse.dirX = 0;
                mouse.dirY = 0;
                mouse.nextDirX = 0;
                mouse.nextDirY = 0;
                
                ghosts.forEach((g, i) => {
                  g.x = 9;
                  g.y = (i === 0) ? 8 : 9;
                  g.subX = 0;
                  g.subY = 0;
                  g.dirX = (i % 2 === 0) ? 1 : -1;
                  g.dirY = 0;
                  g.isFrightened = false;
                  g.isEaten = false;
                });
              }
              return nextLives;
            });
          }
        }
      });
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Define themed neon color scheme based on level
      let neonWallColor = "#3b82f6"; // Blue
      let shadowColor = "rgba(59, 130, 246, 0.4)";
      if (level === 2) {
        neonWallColor = "#10b981"; // Emerald green
        shadowColor = "rgba(16, 185, 129, 0.4)";
      } else if (level >= 3) {
        neonWallColor = "#8b5cf6"; // Violet
        shadowColor = "rgba(139, 92, 246, 0.4)";
      }

      // Draw Walls & Cheese pellets
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const tile = currentGridRef.current[r]?.[c];
          const x = c * tileSize;
          const y = r * tileSize;

          if (tile === 1) {
            // Draw smooth high-tech neon glow walls
            ctx.fillStyle = "#0f111a";
            ctx.fillRect(x, y, tileSize, tileSize);
            
            ctx.strokeStyle = neonWallColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
            
            // Render an elegant inner tile stroke for a clean neon visual style without costly shadow computation
            ctx.strokeStyle = shadowColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 5, y + 5, tileSize - 10, tileSize - 10);
          } else if (tile === 2) {
            // Draw glowing golden cheese pellets
            ctx.fillStyle = "#fbbf24";
            ctx.beginPath();
            ctx.arc(x + tileSize/2, y + tileSize/2, 3.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (tile === 3) {
            // Draw pulsing large cheddar super power cheeses
            const pulse = 1 + Math.sin(Date.now() / 120) * 0.15;
            ctx.fillStyle = "#f59e0b";
            
            ctx.beginPath();
            // Draw cheese triangle wedge
            const cx = x + tileSize/2;
            const cy = y + tileSize/2;
            const rSize = 7.5 * pulse;
            ctx.moveTo(cx, cy - rSize);
            ctx.lineTo(cx + rSize, cy + rSize);
            ctx.lineTo(cx - rSize, cy + rSize);
            ctx.closePath();
            ctx.fill();
          }
        }
      }

      // Draw Player Mouse
      const mouse = mouseRef.current;
      const px = (mouse.x + mouse.subX) * tileSize + tileSize/2;
      const py = (mouse.y + mouse.subY) * tileSize + tileSize/2;

      ctx.save();
      ctx.translate(px, py);

      // Rotate mouse direction
      let angle = 0;
      if (mouse.dirX === 1) angle = 0;
      else if (mouse.dirX === -1) angle = Math.PI;
      else if (mouse.dirY === 1) angle = Math.PI / 2;
      else if (mouse.dirY === -1) angle = -Math.PI / 2;
      ctx.rotate(angle);

      // Mouth animation speed factor
      const mouthAngle = 0.25 + Math.sin(Date.now() / 80) * 0.25;

      // Draw Mouse Face
      ctx.fillStyle = "#fbbf24"; // Bright yellow
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.arc(0, 0, tileSize/2 - 1, mouthAngle, Math.PI * 2 - mouthAngle);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Mouse Eye
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(1.5, -4.5, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Draw Ghosts (Cats)
      const ghosts = ghostsRef.current;
      ghosts.forEach((ghost) => {
        const gx = (ghost.x + ghost.subX) * tileSize;
        const gy = (ghost.y + ghost.subY) * tileSize;

        ctx.save();
        ctx.translate(gx + tileSize/2, gy + tileSize/2);

        if (ghost.isEaten) {
          // Draw just glowing blue outline eyes
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(-4, -2, 3, 0, Math.PI * 2);
          ctx.arc(4, -2, 3, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Determine custom skin tone
          let bodyColor = ghost.color;
          if (ghost.isFrightened) {
            // Flash color when scared state is expiring
            bodyColor = (frightenedTime < 3.5 && Math.floor(Date.now() / 200) % 2 === 0) ? "#ffffff" : "#1e40af";
          }

          // Cat body design
          ctx.fillStyle = bodyColor;
          ctx.beginPath();
          // Cat Head Arc
          ctx.arc(0, -1, tileSize/2 - 2, Math.PI, 0, false);
          // Cat Ears
          ctx.lineTo(tileSize/2 - 2, tileSize/2 - 2);
          ctx.lineTo(tileSize/3, tileSize/5);
          ctx.lineTo(-tileSize/3, tileSize/5);
          ctx.lineTo(-tileSize/2 + 2, tileSize/2 - 2);
          ctx.closePath();
          ctx.fill();

          // Cat Eyes
          ctx.fillStyle = ghost.isFrightened ? "#f59e0b" : "#ffffff";
          ctx.beginPath();
          ctx.arc(-4, -3, 3, 0, Math.PI * 2);
          ctx.arc(4, -3, 3, 0, Math.PI * 2);
          ctx.fill();

          // Eyeballs look in movement direction
          ctx.fillStyle = ghost.isFrightened ? "#ef4444" : "#1e3a8a";
          ctx.beginPath();
          const eyeLookX = ghost.dirX * 1.5;
          const eyeLookY = ghost.dirY * 1.5;
          ctx.arc(-4 + eyeLookX, -3 + eyeLookY, 1.5, 0, Math.PI * 2);
          ctx.arc(4 + eyeLookX, -3 + eyeLookY, 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Cute cat whiskers
          ctx.strokeStyle = ghost.isFrightened ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          // left whiskers
          ctx.moveTo(-2, 1); ctx.lineTo(-8, 0);
          ctx.moveTo(-2, 2); ctx.lineTo(-9, 3);
          // right whiskers
          ctx.moveTo(2, 1); ctx.lineTo(8, 0);
          ctx.moveTo(2, 2); ctx.lineTo(9, 3);
          ctx.stroke();
        }

        ctx.restore();
      });
    };

    const mainGameTick = () => {
      updatePhysics();
      drawGrid();
      animationFrameId.current = requestAnimationFrame(mainGameTick);
    };

    // Initialize animation frame
    animationFrameId.current = requestAnimationFrame(mainGameTick);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, gameOver, levelClear, frightenedTime, level]);

  return (
    <div className="w-full flex flex-col items-center select-none space-y-4">
      {/* Upper Status Indicators Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-4 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-md">
        
        {/* Active level metrics */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              {lang === "ar" ? "المرحلة" : "STAGE"}
            </span>
            <span className="text-lg font-black text-purple-400 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-current text-purple-500 animate-pulse" />
              {level}
            </span>
          </div>
          
          <div className="h-8 w-px bg-slate-800" />

          {/* Current Score */}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              {lang === "ar" ? "النقاط" : "SCORE"}
            </span>
            <span className="text-lg font-black text-emerald-400">{score}</span>
          </div>
          
          <div className="h-8 w-px bg-slate-800" />

          {/* Persistent High Score */}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              {lang === "ar" ? "أعلى نتيجة" : "HIGH SCORE"}
            </span>
            <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1 pt-0.5">
              <Trophy className="w-3.5 h-3.5 fill-current" />
              {highScore}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          {/* Progressive Level Time Limit */}
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              {lang === "ar" ? "الوقت المتبقي" : "TIME LIMIT"}
            </span>
            <span className={`text-xs font-extrabold flex items-center gap-1 pt-0.5 ${timeRemaining <= 15 ? "text-red-500 animate-pulse" : "text-cyan-400"}`}>
              <Clock className="w-3.5 h-3.5 fill-none" />
              {timeRemaining}ث
            </span>
          </div>
        </div>

        {/* Lives counter */}
        <div className="flex items-center gap-2">
          {frightenedTime > 0 && (
            <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-full border border-indigo-500/20 animate-pulse">
              <Zap className="w-3 h-3 fill-current" />
              <span>{lang === "ar" ? `قوة خارقة: ${frightenedTime}ث` : `POWER-UP: ${frightenedTime}S`}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <span 
                key={idx} 
                className={`text-lg transition-all duration-300 ${
                  idx < lives ? "grayscale-0 scale-100" : "grayscale opacity-25 scale-75"
                }`}
              >
                🐭
              </span>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main interactive playing stage canvas */}
      <div className="relative w-full max-w-[532px] aspect-square rounded-3xl overflow-hidden border border-slate-800 bg-[#070913] flex items-center justify-center shadow-2xl">
        
        <canvas
          ref={canvasRef}
          width={532}
          height={532}
          className="block w-full h-full max-w-full"
        />

        {/* Start Game Splash overlay screen */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-between p-5 text-center animate-fade-in overflow-y-auto">
            {/* Retro Game Cover Image */}
            <div className="w-full max-w-[340px] aspect-[16/9] rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-500/10 relative group">
              <img 
                src="/src/assets/images/game_cover_cheese_pacman_1787963454078.jpg" 
                alt="لعبه اكل الجبنه pac-man games free play online game" 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                <span className="text-[9px] bg-purple-600/90 text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                  Arcade Live
                </span>
                <span className="text-[9px] bg-amber-500/90 text-slate-950 font-black px-2 py-0.5 rounded-md">
                  60 FPS
                </span>
              </div>
            </div>

            <div className="space-y-2 max-w-sm">
              <h3 className="text-xl font-black text-white flex items-center justify-center gap-1.5">
                <span className="text-xl">🧀</span>
                {lang === "ar" ? "لعبه اكل الجبنه | Pac-Man" : "Cheese Chomp | Pac-Man Games"}
                <span className="text-xl">🐭</span>
              </h3>
              
              {/* Requested Keyword SEO Badge */}
              <div className="inline-block bg-slate-900 border border-slate-800 text-[10px] text-purple-400 font-medium px-3 py-1.5 rounded-xl max-w-[310px] mx-auto leading-relaxed shadow-inner">
                <span className="text-amber-400 font-bold">{lang === "ar" ? "العنوان: " : "Title: "}</span>
                "لعبه اكل الجبنه pac-man games free play online game"
              </div>

              <p className="text-[11px] text-slate-400 max-w-[320px] mx-auto leading-relaxed">
                {lang === "ar" 
                  ? "العب لعبه اكل الجبنه pac-man games free play online game مجاناً وبدون تحميل على المتصفح. ساعد الفأر السريع في التهام قطع الجبن والهروب من القطط الذكية." 
                  : "Play the best Pac-Man games free online. Help the speedy mouse devour cheese pellets and escape sneaky cats."}
              </p>
            </div>

            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black px-10 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 text-xs hover:scale-105 active:scale-95 transition w-full max-w-[280px]"
            >
              <Play className="w-4 h-4 fill-current animate-pulse" />
              <span>{lang === "ar" ? "ابدأ المغامرة الآن" : "Start Adventure"}</span>
            </button>
          </div>
        )}

        {/* Game Over Screen overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-6 text-center space-y-5 animate-fade-in">
            <span className="text-5xl">💀</span>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-red-500 uppercase tracking-wider">
                {lang === "ar" ? "انتهت اللعبة" : "GAME OVER"}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === "ar" 
                  ? `أحسنت صنعاً! نقاطك الإجمالية هي: ${score}` 
                  : `Terrific run! You scored: ${score} points`}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="bg-purple-600 hover:bg-purple-700 text-white font-black px-6 py-3 rounded-xl flex items-center gap-2 text-xs hover:scale-105 active:scale-95 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === "ar" ? "العب مرة أخرى" : "Try Again"}</span>
            </button>
          </div>
        )}

        {/* Level Clear Stage Celebration overlay */}
        {levelClear && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
            <span className="text-5xl animate-spin">🏆</span>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Sparkles className="w-5 h-5 fill-current animate-pulse text-emerald-400" />
                {lang === "ar" ? "تم تخطي المرحلة!" : "STAGE CLEARED!"}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === "ar" 
                  ? `الاستعداد للانتقال إلى المرحلة التالية: ${level + 1}` 
                  : `Preparing Stage: ${level + 1}`}
              </p>
            </div>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-loading-bar" style={{ width: "100%" }} />
            </div>
          </div>
        )}
      </div>

      {/* On-Screen Mobile Touch pad directions */}
      <div className="w-full max-w-[280px] grid grid-cols-3 gap-2 p-2">
        <div />
        <button
          onClick={() => handleDirectionInput(0, -1)}
          className="bg-slate-800 hover:bg-slate-700 active:bg-purple-600 text-slate-300 active:text-white p-4 rounded-2xl flex items-center justify-center transition border border-slate-700 active:border-purple-500 shadow-md font-extrabold cursor-pointer text-lg"
          title="Up"
        >
          ▲
        </button>
        <div />

        <button
          onClick={() => handleDirectionInput(-1, 0)}
          className="bg-slate-800 hover:bg-slate-700 active:bg-purple-600 text-slate-300 active:text-white p-4 rounded-2xl flex items-center justify-center transition border border-slate-700 active:border-purple-500 shadow-md font-extrabold cursor-pointer text-lg"
          title="Left"
        >
          ◀
        </button>
        <div className="bg-slate-900/60 rounded-2xl flex items-center justify-center border border-slate-800/80 text-xs font-black text-slate-500">
          🎮
        </div>
        <button
          onClick={() => handleDirectionInput(1, 0)}
          className="bg-slate-800 hover:bg-slate-700 active:bg-purple-600 text-slate-300 active:text-white p-4 rounded-2xl flex items-center justify-center transition border border-slate-700 active:border-purple-500 shadow-md font-extrabold cursor-pointer text-lg"
          title="Right"
        >
          ▶
        </button>

        <div />
        <button
          onClick={() => handleDirectionInput(0, 1)}
          className="bg-slate-800 hover:bg-slate-700 active:bg-purple-600 text-slate-300 active:text-white p-4 rounded-2xl flex items-center justify-center transition border border-slate-700 active:border-purple-500 shadow-md font-extrabold cursor-pointer text-lg"
          title="Down"
        >
          ▼
        </button>
        <div />
      </div>

      {/* Progressive Level Stage Status Details Card */}
      {isPlaying && (
        <div className={`w-full max-w-[420px] p-4 rounded-2xl border ${getLevelDetails(level).bg} text-center space-y-1.5 backdrop-blur-md animate-fade-in`}>
          <div className="font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Flame className="w-4 h-4 fill-current animate-pulse text-amber-400" />
            {getLevelDetails(level).title}
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed max-w-sm mx-auto">
            {getLevelDetails(level).desc}
          </p>
        </div>
      )}
    </div>
  );
}
