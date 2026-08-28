import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface NativeSnakeProps {
  lang: "ar" | "en";
}

export default function NativeSnake({ lang }: NativeSnakeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("poki_snake_highscore") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const snakeRef = useRef<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const directionRef = useRef<{ x: number; y: number }>({ x: 0, y: -1 });
  const foodRef = useRef<{ x: number; y: number }>({ x: 5, y: 5 });
  const gridCount = 20;
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sound Synthesizer using Web Audio API (no external file dependencies)
  const playSound = (type: "eat" | "gameover") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "eat") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "gameover") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.error("Audio Web API error:", e);
    }
  };

  const generateFood = () => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * gridCount),
        y: Math.floor(Math.random() * gridCount),
      };
      // Make sure food doesn't spawn on the snake
      const onSnake = snakeRef.current.some(
        (segment) => segment.x === newFood!.x && segment.y === newFood!.y
      );
      if (!onSnake) break;
    }
    foodRef.current = newFood;
  };

  const resetGame = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    directionRef.current = { x: 0, y: -1 };
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    generateFood();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isPlaying || gameOver) return;
    const currentDir = directionRef.current;
    switch (e.key) {
      case "ArrowUp":
        if (currentDir.y !== 1) directionRef.current = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (currentDir.y !== -1) directionRef.current = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (currentDir.x !== 1) directionRef.current = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (currentDir.x !== -1) directionRef.current = { x: 1, y: 0 };
        break;
    }
  };

  // Keyboard controls listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, gameOver]);

  // Main game loop logic
  useEffect(() => {
    if (!isPlaying || gameOver) {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      return;
    }

    const gameTick = () => {
      const head = { ...snakeRef.current[0] };
      const dir = directionRef.current;
      
      const newHead = {
        x: head.x + dir.x,
        y: head.y + dir.y,
      };

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= gridCount ||
        newHead.y < 0 ||
        newHead.y >= gridCount
      ) {
        setGameOver(true);
        setIsPlaying(false);
        playSound("gameover");
        return;
      }

      // Check collision with self
      const selfCollide = snakeRef.current.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      );
      if (selfCollide) {
        setGameOver(true);
        setIsPlaying(false);
        playSound("gameover");
        return;
      }

      // Add new head
      snakeRef.current.unshift(newHead);

      // Check if food eaten
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        setScore((prev) => {
          const next = prev + 10;
          if (next > highScore) {
            setHighScore(next);
            try {
              localStorage.setItem("poki_snake_highscore", next.toString());
            } catch {}
          }
          return next;
        });
        playSound("eat");
        generateFood();
      } else {
        // Remove tail if didn't eat food
        snakeRef.current.pop();
      }
    };

    gameIntervalRef.current = setInterval(gameTick, 130);

    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, [isPlaying, gameOver, highScore]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const size = canvas.width / gridCount;

      // Clear canvas
      ctx.fillStyle = "#0c1020";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid background subtly
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= gridCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * size, 0);
        ctx.lineTo(i * size, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * size);
        ctx.lineTo(canvas.width, i * size);
        ctx.stroke();
      }

      // Draw glowing neon food
      ctx.fillStyle = "#ff007f";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#ff007f";
      ctx.beginPath();
      const foodX = foodRef.current.x * size + size / 2;
      const foodY = foodRef.current.y * size + size / 2;
      ctx.arc(foodX, foodY, size / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw glowing neon snake
      const snakeSegments = [...snakeRef.current];
      snakeSegments.forEach((segment, idx) => {
        if (idx === 0) {
          ctx.fillStyle = "#00ffcc";
          ctx.shadowColor = "#00ffcc";
          ctx.shadowBlur = 20;
        } else {
          ctx.fillStyle = "#00bfa5";
          ctx.shadowColor = "#00bfa5";
          ctx.shadowBlur = 10;
        }

        ctx.fillRect(
          segment.x * size + 1.5,
          segment.y * size + 1.5,
          size - 3,
          size - 3
        );
      });

      // Reset shadow for next render
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl max-w-lg mx-auto select-none">
      {/* Game Header Stats */}
      <div className="w-full flex justify-between items-center mb-4 px-2">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
            <span className="text-xs text-slate-400 block text-center uppercase tracking-widest font-bold">
              {lang === "ar" ? "النقاط" : "Score"}
            </span>
            <span className="text-lg font-black text-[#00ffcc] block text-center">
              {score}
            </span>
          </div>
          <div className="bg-slate-800 px-4 py-1.5 rounded-full border border-slate-700">
            <span className="text-xs text-slate-400 block text-center uppercase tracking-widest font-bold">
              {lang === "ar" ? "أعلى نتيجة" : "Best"}
            </span>
            <span className="text-lg font-black text-[#ff007f] block text-center">
              {highScore}
            </span>
          </div>
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Screen Game Stage */}
      <div className="relative border-4 border-slate-700 rounded-2xl overflow-hidden shadow-inner bg-[#0c1020]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="max-w-full aspect-square block cursor-pointer"
        />

        {/* Start / Game Over Screens Overlaid */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            {gameOver ? (
              <div className="space-y-4">
                <span className="text-4xl">👾</span>
                <h3 className="text-3xl font-black text-red-500 uppercase tracking-widest">
                  {lang === "ar" ? "انتهت اللعبة!" : "Game Over"}
                </h3>
                <p className="text-sm text-slate-400">
                  {lang === "ar"
                    ? `لقد جمعت ${score} نقطة في هذا الدور`
                    : `You scored ${score} points in this run`}
                </p>
                <button
                  onClick={resetGame}
                  className="mx-auto flex items-center space-x-2 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white font-black px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-200 cursor-pointer text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === "ar" ? "العب مجدداً" : "Play Again"}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <span className="text-5xl animate-bounce block">🐍</span>
                <h3 className="text-3xl font-black text-[#00ffcc] uppercase tracking-widest">
                  {lang === "ar" ? "ثعبان النيون" : "Neon Snake"}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  {lang === "ar"
                    ? "استخدم أسهم الكيبورد أو الأزرار التفاعلية بالأسفل للتوجيه. لا تصطدم بالجدران أو بجسدك!"
                    : "Use Arrow keys or on-screen arrows to steer. Do not crash into the walls or your own tail!"}
                </p>
                <button
                  onClick={resetGame}
                  className="mx-auto flex items-center space-x-2 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-slate-950 font-black px-8 py-3.5 rounded-full shadow-xl transform hover:scale-105 transition duration-200 cursor-pointer text-sm"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{lang === "ar" ? "ابدأ اللعب" : "Start Game"}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* On-Screen Touch Controls (highly responsive for mobile users) */}
      <div className="mt-5 grid grid-cols-3 gap-2 w-48 mx-auto">
        <div></div>
        <button
          onClick={() => {
            if (directionRef.current.y !== 1) directionRef.current = { x: 0, y: -1 };
          }}
          className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-white p-3.5 rounded-xl shadow-md flex items-center justify-center font-bold text-lg cursor-pointer transform active:scale-95 transition"
        >
          ▲
        </button>
        <div></div>
        <button
          onClick={() => {
            if (directionRef.current.x !== 1) directionRef.current = { x: -1, y: 0 };
          }}
          className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-white p-3.5 rounded-xl shadow-md flex items-center justify-center font-bold text-lg cursor-pointer transform active:scale-95 transition"
        >
          ◀
        </button>
        <button
          onClick={() => {
            if (directionRef.current.y !== -1) directionRef.current = { x: 0, y: 1 };
          }}
          className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-white p-3.5 rounded-xl shadow-md flex items-center justify-center font-bold text-lg cursor-pointer transform active:scale-95 transition"
        >
          ▼
        </button>
        <button
          onClick={() => {
            if (directionRef.current.x !== -1) directionRef.current = { x: 1, y: 0 };
          }}
          className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-white p-3.5 rounded-xl shadow-md flex items-center justify-center font-bold text-lg cursor-pointer transform active:scale-95 transition"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
