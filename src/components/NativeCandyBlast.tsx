import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, AlertCircle, ArrowLeftRight } from "lucide-react";

interface NativeCandyBlastProps {
  lang: "ar" | "en";
}

interface Candy {
  id: string;
  type: string;
  emoji: string;
  color: string;
  isMatched?: boolean;
  isStriped?: "row" | "col" | null;
  isColorBomb?: boolean;
  isNew?: boolean;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  emoji?: string;
}

interface FloatingScore {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

const CANDY_TYPES = [
  { type: "apple", emoji: "🍎", color: "bg-red-500 shadow-red-500/50" },
  { type: "banana", emoji: "🍌", color: "bg-amber-400 shadow-amber-400/50" },
  { type: "grapes", emoji: "🍇", color: "bg-purple-500 shadow-purple-500/50" },
  { type: "melon", emoji: "🍉", color: "bg-emerald-500 shadow-emerald-500/50" },
  { type: "orange", emoji: "🍊", color: "bg-orange-500 shadow-orange-500/50" },
  { type: "blueberry", emoji: "🫐", color: "bg-blue-500 shadow-blue-500/50" }
];

const GRID_SIZE = 8;

export default function NativeCandyBlast({ lang }: NativeCandyBlastProps) {
  const [board, setBoard] = useState<Candy[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("dkora_candy_highscore") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [level, setLevel] = useState(1);
  const [movesLeft, setMovesLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [levelCleared, setLevelCleared] = useState(false);
  const [combo, setCombo] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const [shuffling, setShuffling] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; r: number; c: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent, r: number, c: number) => {
    if (isProcessing || gameOver || levelCleared || shuffling) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      r,
      c
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    // Prevent default mouse/click emulation behavior on mobile to eliminate ghost clicks
    if (e.cancelable) {
      e.preventDefault();
    }

    if (isProcessing || gameOver || levelCleared || shuffling) {
      touchStartRef.current = null;
      return;
    }

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const { r, c } = touchStartRef.current;
    touchStartRef.current = null;

    // Minimum distance of 25px to consider it a swipe
    const threshold = 25;
    if (Math.sqrt(dx * dx + dy * dy) < threshold) {
      // It is a tap, trigger cell selection directly
      handleCellClick(r, c);
      return;
    }

    let targetR = r;
    let targetC = c;

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 0) {
        targetC = c + 1; // Swipe Right
      } else {
        targetC = c - 1; // Swipe Left
      }
    } else {
      // Vertical swipe
      if (dy > 0) {
        targetR = r + 1; // Swipe Down
      } else {
        targetR = r - 1; // Swipe Up
      }
    }

    if (targetR >= 0 && targetR < GRID_SIZE && targetC >= 0 && targetC < GRID_SIZE) {
      swapCells(r, c, targetR, targetC);
    }
  };

  // Targets per level (procedural difficulty scaling)
  const getLevelTarget = (lvl: number) => {
    return 1000 + (lvl - 1) * 800 + Math.floor(Math.pow(lvl, 1.6) * 100);
  };

  const getLevelMoves = (lvl: number) => {
    return Math.max(15, 30 - Math.floor(lvl / 2));
  };

  const targetScore = getLevelTarget(level);

  // Sound Synthesizer via Web Audio API
  const playSound = (type: "swap" | "crush" | "bomb" | "levelUp" | "fail" | "shuffle" | "combo") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "swap") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === "crush") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600 + combo * 50, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800 + combo * 80, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === "combo") {
        osc.type = "sine";
        const baseFreq = 523.25; // C5
        const step = Math.min(8, combo);
        const freq = baseFreq * Math.pow(1.059463, step * 2); // musical scale ramp
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === "bomb") {
        // Dramatic explosive rumble
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
        
        // Add a secondary white noise sizzle for realism
        const noiseOsc = ctx.createOscillator();
        const noiseGain = ctx.createGain();
        noiseOsc.type = "triangle";
        noiseOsc.frequency.setValueAtTime(800, ctx.currentTime);
        noiseOsc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.35);
        noiseOsc.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseGain.gain.setValueAtTime(0.1, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        noiseOsc.start();
        noiseOsc.stop(ctx.currentTime + 0.35);
      } else if (type === "levelUp") {
        // High-pitched winning melody arpeggio
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(f, now + idx * 0.08);
          g.gain.setValueAtTime(0.15, now + idx * 0.08);
          g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);
          o.start(now + idx * 0.08);
          o.stop(now + idx * 0.08 + 0.25);
        });
      } else if (type === "fail") {
        // Descending sad melody
        const now = ctx.currentTime;
        [392.00, 349.23, 311.13, 261.63].forEach((f, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(f, now + idx * 0.12);
          g.gain.setValueAtTime(0.15, now + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.3);
          o.start(now + idx * 0.12);
          o.stop(now + idx * 0.12 + 0.3);
        });
      } else if (type === "shuffle") {
        const now = ctx.currentTime;
        for (let i = 0; i < 5; i++) {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(200 + Math.random() * 400, now + i * 0.05);
          g.gain.setValueAtTime(0.08, now + i * 0.05);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.1);
          o.start(now + i * 0.05);
          o.stop(now + i * 0.05 + 0.1);
        }
      }
    } catch (e) {
      console.warn("Audio Context is blocked or not supported on this platform.", e);
    }
  };

  // Particle explosion trigger
  const triggerExplosion = (row: number, col: number, color: string, count = 6, emoji?: string) => {
    // Relative coordinates based on grid spacing (roughly 12.5% per cell on a full board)
    const x = (col + 0.5) * (100 / GRID_SIZE);
    const y = (row + 0.5) * (100 / GRID_SIZE);
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      newParticles.push({
        id: Math.random().toString(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 4 + Math.random() * 8,
        alpha: 1.0,
        emoji
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Add a floating score pop indicator
  const triggerFloatingScore = (row: number, col: number, text: string, isPremium = false) => {
    const x = (col + 0.5) * (100 / GRID_SIZE);
    const y = (row + 0.5) * (100 / GRID_SIZE);
    const id = Math.random().toString();
    setFloatingScores((prev) => [
      ...prev,
      {
        id,
        x,
        y,
        text,
        color: isPremium ? "text-amber-300 font-extrabold text-sm drop-shadow-lg" : "text-purple-300 font-bold text-xs"
      }
    ]);
    setTimeout(() => {
      setFloatingScores((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  // Particle lifecycle engine
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.4,
            y: p.y + p.vy * 0.4,
            vy: p.vy + 0.05, // gravity effect
            alpha: p.alpha - 0.04
          }))
          .filter((p) => p.alpha > 0)
      );
    }, 25);
    return () => clearInterval(interval);
  }, [particles]);

  // Generate a random candy ensuring it does not immediately form a match-3
  const getRandomCandy = (avoidType1?: string, avoidType2?: string): Candy => {
    let filteredTypes = CANDY_TYPES;
    if (avoidType1) filteredTypes = filteredTypes.filter((t) => t.type !== avoidType1);
    if (avoidType2) filteredTypes = filteredTypes.filter((t) => t.type !== avoidType2);
    
    if (filteredTypes.length === 0) filteredTypes = CANDY_TYPES;
    const t = filteredTypes[Math.floor(Math.random() * filteredTypes.length)];
    return {
      id: Math.random().toString(),
      type: t.type,
      emoji: t.emoji,
      color: t.color,
      isNew: true
    };
  };

  // Initialize board without matches
  const initBoard = () => {
    const newBoard: Candy[][] = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null));

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const avoidRowType = r >= 2 ? newBoard[r - 1][c]?.type : undefined;
        const avoidColType = c >= 2 ? newBoard[r][c - 1]?.type : undefined;
        newBoard[r][c] = getRandomCandy(avoidRowType, avoidColType);
      }
    }
    return newBoard;
  };

  const startNewGame = () => {
    setBoard(initBoard());
    setScore(0);
    setLevel(1);
    setMovesLeft(30);
    setGameOver(false);
    setLevelCleared(false);
    setIsPlaying(true);
    setCombo(1);
    setIsProcessing(false);
    setSelectedCell(null);
    playSound("swap");
  };

  const startNextLevel = () => {
    setLevel((prev) => prev + 1);
    setMovesLeft(getLevelMoves(level + 1));
    setBoard(initBoard());
    setLevelCleared(false);
    setCombo(1);
    setIsProcessing(false);
    setSelectedCell(null);
    playSound("levelUp");
  };

  // Check board for match-3, match-4 (striped), or match-5 (bomb) patterns
  const checkMatches = (currentBoard: Candy[][]): { found: boolean; newBoard: Candy[][] } => {
    const markedBoard: Candy[][] = currentBoard.map((row) => row.map((cell) => ({ ...cell, isMatched: false })));
    let foundMatches = false;

    // 1. Check Horizontal matches
    for (let r = 0; r < GRID_SIZE; r++) {
      let matchCount = 1;
      let matchType = "";
      for (let c = 0; c < GRID_SIZE; c++) {
        const current = markedBoard[r][c];
        const next = c < GRID_SIZE - 1 ? markedBoard[r][c + 1] : null;

        if (next && current && next && current.type === next.type) {
          matchCount++;
          matchType = current.type;
        } else {
          if (matchCount >= 3) {
            foundMatches = true;
            // Mark horizontal sequence
            for (let i = c - matchCount + 1; i <= c; i++) {
              markedBoard[r][i].isMatched = true;
            }
          }
          matchCount = 1;
        }
      }
    }

    // 2. Check Vertical matches
    for (let c = 0; c < GRID_SIZE; c++) {
      let matchCount = 1;
      let matchType = "";
      for (let r = 0; r < GRID_SIZE; r++) {
        const current = markedBoard[r][c];
        const next = r < GRID_SIZE - 1 ? markedBoard[nextRow(r)][c] : null;

        if (next && current && next && current.type === next.type) {
          matchCount++;
          matchType = current.type;
        } else {
          if (matchCount >= 3) {
            foundMatches = true;
            // Mark vertical sequence
            for (let i = r - matchCount + 1; i <= r; i++) {
              markedBoard[i][c].isMatched = true;
            }
          }
          matchCount = 1;
        }
      }
    }

    return { found: foundMatches, newBoard: markedBoard };
  };

  const nextRow = (r: number) => r + 1;

  // Process and clear matches, handle combos, explosions, and powerups
  const processMatches = async (targetBoard: Candy[][], activeCombo = 1): Promise<boolean> => {
    setIsProcessing(true);
    let { found, newBoard } = checkMatches(targetBoard);
    if (!found) {
      setIsProcessing(false);
      setCombo(1);
      return false;
    }

    // High fidelity reward calculations:
    // We check for striped candidates (match-4) and color bombs (match-5)
    // Identify linear sequences to reward player with specials
    let earnedBomb = false;
    let earnedStripedRow = false;
    let earnedStripedCol = false;
    let specialR = -1;
    let specialC = -1;
    let specialCandyType = "";

    // Let's identify the size and shape of matched chunks in rows and columns
    // Check horizontal runs of matches
    for (let r = 0; r < GRID_SIZE; r++) {
      let matchedStreak = 0;
      let centerCol = -1;
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newBoard[r][c]?.isMatched) {
          matchedStreak++;
          if (matchedStreak === 3) centerCol = c - 1;
        } else {
          if (matchedStreak >= 5) {
            earnedBomb = true;
            specialR = r;
            specialC = centerCol !== -1 ? centerCol : c - 2;
            specialCandyType = newBoard[r][specialC]?.type || "apple";
          } else if (matchedStreak === 4) {
            earnedStripedRow = true;
            specialR = r;
            specialC = centerCol !== -1 ? centerCol : c - 2;
            specialCandyType = newBoard[r][specialC]?.type || "apple";
          }
          matchedStreak = 0;
        }
      }
      if (matchedStreak >= 5) {
        earnedBomb = true;
        specialR = r;
        specialC = centerCol !== -1 ? centerCol : GRID_SIZE - 3;
        specialCandyType = newBoard[r][specialC]?.type || "apple";
      } else if (matchedStreak === 4) {
        earnedStripedRow = true;
        specialR = r;
        specialC = centerCol !== -1 ? centerCol : GRID_SIZE - 2;
        specialCandyType = newBoard[r][specialC]?.type || "apple";
      }
    }

    // Check vertical runs of matches
    for (let c = 0; c < GRID_SIZE; c++) {
      let matchedStreak = 0;
      let centerRow = -1;
      for (let r = 0; r < GRID_SIZE; r++) {
        if (newBoard[r][c]?.isMatched) {
          matchedStreak++;
          if (matchedStreak === 3) centerRow = r - 1;
        } else {
          if (matchedStreak >= 5) {
            earnedBomb = true;
            specialR = centerRow !== -1 ? centerRow : r - 2;
            specialC = c;
            specialCandyType = newBoard[specialR][c]?.type || "apple";
          } else if (matchedStreak === 4) {
            earnedStripedCol = true;
            specialR = centerRow !== -1 ? centerRow : r - 2;
            specialC = c;
            specialCandyType = newBoard[specialR][c]?.type || "apple";
          }
          matchedStreak = 0;
        }
      }
      if (matchedStreak >= 5) {
        earnedBomb = true;
        specialR = centerRow !== -1 ? centerRow : GRID_SIZE - 3;
        specialC = c;
        specialCandyType = newBoard[specialR][c]?.type || "apple";
      } else if (matchedStreak === 4) {
        earnedStripedCol = true;
        specialR = centerRow !== -1 ? centerRow : GRID_SIZE - 2;
        specialC = c;
        specialCandyType = newBoard[specialR][c]?.type || "apple";
      }
    }

    // Calculate score for this turn
    let matchCount = 0;
    newBoard.forEach((row) => row.forEach((cell) => {
      if (cell?.isMatched) matchCount++;
    }));

    const ptsEarned = matchCount * 60 * activeCombo;
    setScore((prev) => {
      const s = prev + ptsEarned;
      if (s > highScore) {
        setHighScore(s);
        localStorage.setItem("dkora_candy_highscore", s.toString());
      }
      return s;
    });

    // Play sounds
    if (activeCombo > 1) {
      playSound("combo");
    } else {
      playSound("crush");
    }

    // Visual explosion feedback per matched cell
    newBoard.forEach((row, r) => row.forEach((cell, c) => {
      if (cell?.isMatched) {
        triggerExplosion(r, c, "rgba(255, 255, 255, 0.7)", 5, cell.emoji);
        if (cell.isColorBomb) {
          playSound("bomb");
          triggerExplosion(r, c, "rgba(239, 68, 68, 0.9)", 20, "💥");
        }
      }
    }));

    // Trigger floating text
    const displayComboLabel = activeCombo > 1 ? ` COMBO x${activeCombo}!` : "";
    const randR = Math.floor(Math.random() * 4) + 2;
    const randC = Math.floor(Math.random() * 4) + 2;
    triggerFloatingScore(randR, randC, `+${ptsEarned}${displayComboLabel}`, activeCombo > 1);

    // Apply delays for professional cascading game feeling
    await new Promise((resolve) => setTimeout(resolve, 320));

    // Collapse board: items fall down
    const collapsedBoard = newBoard.map((row) => [...row]);
    
    // Process column by column from bottom to top
    for (let c = 0; c < GRID_SIZE; c++) {
      let writeIdx = GRID_SIZE - 1;
      for (let r = GRID_SIZE - 1; r >= 0; r--) {
        if (!newBoard[r][c]?.isMatched) {
          collapsedBoard[writeIdx][c] = newBoard[r][c];
          writeIdx--;
        }
      }
      // Fill the remaining top spots with new candies
      while (writeIdx >= 0) {
        collapsedBoard[writeIdx][c] = getRandomCandy();
        writeIdx--;
      }
    }

    // Inject Special Candies earned back into the board at the designated explosion center
    if (specialR >= 0 && specialC >= 0) {
      const typeObj = CANDY_TYPES.find((t) => t.type === specialCandyType) || CANDY_TYPES[0];
      if (earnedBomb) {
        collapsedBoard[specialR][specialC] = {
          id: Math.random().toString(),
          type: specialCandyType,
          emoji: "💣",
          color: "bg-radial-gradient border-2 border-amber-300 animate-pulse shadow-xl",
          isColorBomb: true
        };
        triggerFloatingScore(specialR, specialC, "COLOR BOMB!", true);
      } else if (earnedStripedRow || earnedStripedCol) {
        collapsedBoard[specialR][specialC] = {
          id: Math.random().toString(),
          type: specialCandyType,
          emoji: earnedStripedRow ? "↔️" : "↕️",
          color: typeObj.color + " border border-white animate-bounce",
          isStriped: earnedStripedRow ? "row" : "col"
        };
        triggerFloatingScore(specialR, specialC, earnedStripedRow ? "ROW CRUSHER!" : "COLUMN CRUSHER!", true);
      }
    }

    setBoard(collapsedBoard);

    // Chain matches / Cascade effect
    await new Promise((resolve) => setTimeout(resolve, 250));
    setCombo((prev) => prev + 1);
    await processMatches(collapsedBoard, activeCombo + 1);

    return true;
  };

  // Check if player has any legitimate move left on board (shuffling prevention)
  const hasValidMoves = (currentBoard: Candy[][]) => {
    // Temporary swap check utility
    const checkSwapMatch = (r1: number, c1: number, r2: number, c2: number) => {
      const temp = currentBoard.map((row) => [...row]);
      const placeholder = temp[r1][c1];
      temp[r1][c1] = temp[r2][c2];
      temp[r2][c2] = placeholder;

      // Check if swap creates match
      const { found } = checkMatches(temp);
      return found;
    };

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        // Swap Right
        if (c < GRID_SIZE - 1) {
          if (checkSwapMatch(r, c, r, c + 1)) return true;
        }
        // Swap Down
        if (r < GRID_SIZE - 1) {
          if (checkSwapMatch(r, c, r + 1, c)) return true;
        }
      }
    }
    return false;
  };

  // Automatic Shuffle with sound and text notice if board is stuck
  const shuffleBoard = () => {
    setShuffling(true);
    playSound("shuffle");
    setTimeout(() => {
      setBoard(initBoard());
      setShuffling(false);
    }, 1000);
  };

  // Swapping two adjacent cells handler
  const swapCells = async (r1: number, c1: number, r2: number, c2: number) => {
    if (isProcessing || gameOver || levelCleared) return;
    setIsProcessing(true);
    playSound("swap");

    const newBoard = board.map((row) => [...row]);
    const candy1 = newBoard[r1][c1];
    const candy2 = newBoard[r2][c2];

    // Check for Special Color Bomb swaps
    if (candy1?.isColorBomb || candy2?.isColorBomb) {
      playSound("bomb");
      let matchedType = candy1?.isColorBomb ? candy2?.type : candy1?.type;
      
      // Wipe all of that specific candy type!
      const clearedBoard = board.map((row, r) =>
        row.map((cell, c) => {
          if (cell?.type === matchedType || cell?.isColorBomb || (r === r1 && c === c1) || (r === r2 && c === c2)) {
            triggerExplosion(r, c, "rgba(244, 63, 94, 0.85)", 8, cell?.emoji);
            return { ...cell, isMatched: true };
          }
          return cell;
        })
      );
      setBoard(clearedBoard);
      setMovesLeft((prev) => prev - 1);
      await processMatches(clearedBoard, 1);
      return;
    }

    // Normal Match-3 check swap
    newBoard[r1][c1] = candy2;
    newBoard[r2][c2] = candy1;

    let { found, newBoard: checked } = checkMatches(newBoard);

    if (found) {
      setBoard(checked);
      setMovesLeft((prev) => prev - 1);
      await processMatches(checked, 1);
    } else {
      // No match - trigger short visual bounce shake, then swap back
      triggerFloatingScore(r2, c2, lang === "ar" ? "لا تطابق!" : "No Match!", false);
      setBoard(newBoard);
      await new Promise((resolve) => setTimeout(resolve, 200));
      // Reset swap
      const resetBoard = board.map((row) => [...row]);
      resetBoard[r1][c1] = candy1;
      resetBoard[r2][c2] = candy2;
      setBoard(resetBoard);
      setIsProcessing(false);
    }
  };

  // Grid element click handler
  const handleCellClick = (r: number, c: number) => {
    if (isProcessing || gameOver || levelCleared || shuffling) return;

    if (!selectedCell) {
      setSelectedCell({ r, c });
      return;
    }

    const { r: sr, c: sc } = selectedCell;
    const isAdjacent = Math.abs(sr - r) + Math.abs(sc - c) === 1;

    if (isAdjacent) {
      swapCells(sr, sc, r, c);
      setSelectedCell(null);
    } else {
      // Reselect new cell
      setSelectedCell({ r, c });
    }
  };

  // Monitor goals, highscores, and moves remaining
  useEffect(() => {
    if (!isPlaying || gameOver || levelCleared) return;

    if (score >= targetScore) {
      setLevelCleared(true);
      playSound("levelUp");
    } else if (movesLeft <= 0 && score < targetScore && !isProcessing) {
      setGameOver(true);
      playSound("fail");
    }
  }, [score, movesLeft, isPlaying, isProcessing]);

  // Periodic board moves validator (keeps board un-stuck)
  useEffect(() => {
    if (!isPlaying || isProcessing || board.length === 0 || gameOver || levelCleared || shuffling) return;
    if (!hasValidMoves(board)) {
      shuffleBoard();
    }
  }, [board, isProcessing, isPlaying]);

  const progressPercent = Math.min(100, Math.floor((score / targetScore) * 100));

  return (
    <div className="w-full select-none" id="candy-blast-game-container">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-t-2xl border-b border-purple-500/30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍭</span>
          <div>
            <h3 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-lg">
              {lang === "ar" ? "ديكورا كاندي كراش فري" : "Dkora Candy Blast"}
            </h3>
            <span className="text-[10px] text-slate-400 block -mt-1">
              {lang === "ar" ? "العاب اونلاين فري ومجانية بالكامل" : "100% Free HTML5 Game"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-slate-300"
            title={lang === "ar" ? "كتم/تشغيل الصوت" : "Toggle Sound"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={startNewGame}
            className="p-2 rounded-xl bg-slate-800 hover:bg-purple-900/60 transition text-slate-300 flex items-center gap-1 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === "ar" ? "إعادة" : "Reset"}</span>
          </button>
        </div>
      </div>

      {/* Main content body */}
      <div className="bg-slate-950 p-4 rounded-b-2xl border border-purple-500/20 relative overflow-hidden flex flex-col items-center">
        {!isPlaying ? (
          /* Landing start section */
          <div className="py-12 px-6 text-center max-w-sm flex flex-col items-center gap-6">
            <div className="relative">
              <span className="text-7xl block animate-bounce drop-shadow-[0_10px_10px_rgba(244,63,94,0.3)]">🍭</span>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1.5 shadow-lg border border-white animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-black text-slate-100">
                {lang === "ar" ? "انفجار الحلوى اللانهائي" : "Infinite Candy Blast"}
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {lang === "ar" 
                  ? "طابق 3 قطع حلوى أو أكثر لتفجيرها. طابق 4 قطع للحصول على الحلوى المخططة، وطابق 5 للحصول على قنبلة الألوان الفتاكة ومستويات غير محدودة!" 
                  : "Match 3 or more candy blocks to blast. Create striped and color bombs for massive chain reactions across endless level maps."}
              </p>
            </div>

            {highScore > 0 && (
              <div className="flex items-center gap-1.5 px-4 py-1.5 bg-purple-950/40 border border-purple-500/30 rounded-full text-xs text-amber-300">
                <Trophy className="w-3.5 h-3.5" />
                <span>{lang === "ar" ? `أعلى نتيجة: ${highScore}` : `Best Score: ${highScore}`}</span>
              </div>
            )}

            <button
              onClick={startNewGame}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition shadow-lg shadow-purple-500/30 text-center flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{lang === "ar" ? "العب الآن مجاناً" : "Play Free Now"}</span>
            </button>
          </div>
        ) : (
          /* Game playing dynamic interface */
          <div className="w-full flex flex-col gap-4">
            
            {/* Upper Dashboard stats panel */}
            <div className="grid grid-cols-4 gap-2 w-full text-center">
              
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                  {lang === "ar" ? "المستوى" : "Level"}
                </span>
                <span className="text-lg font-black text-purple-400">{level}</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-center relative overflow-hidden">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                  {lang === "ar" ? "الحركات" : "Moves"}
                </span>
                <span className={`text-lg font-black ${movesLeft <= 5 ? "text-red-500 animate-ping absolute right-2 top-2" : ""} ${movesLeft <= 5 ? "text-red-500 animate-pulse" : "text-amber-400"}`}>
                  {movesLeft}
                </span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                  {lang === "ar" ? "النقاط" : "Score"}
                </span>
                <span className="text-lg font-black text-pink-400">{score}</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                  {lang === "ar" ? "المستهدف" : "Target"}
                </span>
                <span className="text-xs font-bold text-indigo-300">{targetScore}</span>
              </div>
            </div>

            {/* Target Progress Bar */}
            <div className="w-full bg-slate-900/80 border border-slate-800 rounded-full h-4 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
              <span className="absolute inset-0 text-[10px] font-bold text-white flex items-center justify-center">
                {progressPercent}% {lang === "ar" ? "من المستهدف" : "of target Completed"}
              </span>
            </div>

            {/* Core Game Match-3 Board */}
            <div className="relative w-full max-w-sm mx-auto aspect-square bg-slate-900/60 p-2 rounded-2xl border border-purple-500/30 shadow-2xl backdrop-blur-sm overflow-hidden">
              
              {/* Shuffling Notification Layer */}
              {shuffling && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-3">
                  <ArrowLeftRight className="w-10 h-10 text-purple-400 animate-spin" />
                  <span className="text-sm font-black text-slate-200">
                    {lang === "ar" ? "جاري إعادة الترتيب..." : "No moves left! Shuffling..."}
                  </span>
                </div>
              )}

              {/* Grid cell renderer */}
              <div className="grid grid-cols-8 gap-1 h-full w-full select-none touch-none">
                {board.map((row, r) =>
                  row.map((candy, c) => {
                    const isSelected = selectedCell && selectedCell.r === r && selectedCell.c === c;
                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        onTouchStart={(e) => handleTouchStart(e, r, c)}
                        onTouchEnd={handleTouchEnd}
                        className={`w-full h-full aspect-square rounded-xl flex items-center justify-center text-2xl transition-all duration-200 relative group select-none touch-none ${
                          candy?.color
                        } ${
                          isSelected ? "scale-110 ring-4 ring-pink-400 z-10" : "hover:scale-[1.05]"
                        } ${
                          candy?.isNew ? "animate-fade-in" : ""
                        }`}
                        id={`candy-cell-${r}-${c}`}
                      >
                        {/* Render Candy Emoji */}
                        <span className="select-none text-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform active:scale-95 duration-75 block">
                          {candy?.emoji}
                        </span>

                        {/* Special Glowing indicators for bomb/striped candies */}
                        {candy?.isColorBomb && (
                          <span className="absolute inset-0 border-2 border-amber-300 rounded-xl animate-pulse bg-amber-500/20" />
                        )}
                        {candy?.isStriped && (
                          <span className={`absolute inset-0 border border-white rounded-xl ${candy.isStriped === "row" ? "bg-purple-500/10 scale-y-75" : "bg-indigo-500/10 scale-x-75"}`} />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Particle Blast Renderer */}
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute pointer-events-none rounded-full flex items-center justify-center"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.emoji ? "transparent" : p.color,
                    opacity: p.alpha,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  {p.emoji && <span className="text-sm">{p.emoji}</span>}
                </div>
              ))}

              {/* Floating score indicator renderer */}
              {floatingScores.map((fs) => (
                <div
                  key={fs.id}
                  className={`absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20 ${fs.color}`}
                  style={{
                    left: `${fs.x}%`,
                    top: `${fs.y - 12}%`,
                    animation: "floatUp 1.2s forwards"
                  }}
                >
                  {fs.text}
                </div>
              ))}
            </div>

            {/* Score Combo Multiplier indicator */}
            {combo > 1 && (
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 text-[10px] font-black text-pink-300 animate-bounce tracking-widest uppercase">
                  ⚡ COMBO MULTIPLIER X{combo}! ⚡
                </span>
              </div>
            )}

            {/* Overlays for GameOver and Success alerts */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 animate-bounce" />
                <h4 className="text-3xl font-black text-slate-100 mt-4">
                  {lang === "ar" ? "انتهت الحركات!" : "Game Over!"}
                </h4>
                <p className="text-xs text-slate-400 mt-2 max-w-xs">
                  {lang === "ar" 
                    ? `لقد نفدت حركاتك المتاحة ولم تتمكن من الوصول لمستهدف النقاط (${targetScore}). حصلت على ${score} نقطة.` 
                    : `You've run out of moves! You scored ${score} points against the level target of ${targetScore}.`}
                </p>
                <button
                  onClick={startNewGame}
                  className="mt-6 px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 text-white transition text-sm"
                >
                  {lang === "ar" ? "حاول مجدداً" : "Retry Now"}
                </button>
              </div>
            )}

            {levelCleared && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center">
                <div className="relative">
                  <Trophy className="w-16 h-16 text-amber-400 animate-pulse" />
                  <div className="absolute -top-2 -right-2 bg-pink-500 rounded-full p-1 border border-white animate-ping">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h4 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mt-4">
                  {lang === "ar" ? "تم تخطي المستوى!" : "Level Complete!"}
                </h4>
                <p className="text-xs text-slate-300 mt-2 max-w-xs">
                  {lang === "ar" 
                    ? `عمل رائع! لقد تخطيت المستهدف بنجاح برصيد ${score} نقطة.` 
                    : `Sensational matching! You completed the goal with ${score} points.`}
                </p>
                <button
                  onClick={startNextLevel}
                  className="mt-6 px-8 py-3.5 rounded-xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white transition text-sm shadow-lg shadow-emerald-500/20"
                >
                  {lang === "ar" ? `الذهاب للمستوى ${level + 1} 🚀` : `Advance to Level ${level + 1} 🚀`}
                </button>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Styled animation keyframes for floating pops */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -150%) scale(1.1);
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
