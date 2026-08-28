import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NativeBrickBreakerProps {
  lang: "ar" | "en";
}

export default function NativeBrickBreaker({ lang }: NativeBrickBreakerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  // React state for HUD
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [bricksLeft, setBricksLeft] = useState(48);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);

  // Overlay screen state
  const [overlay, setOverlay] = useState({
    show: false,
    title: "",
    text: "",
    isVictory: false,
  });

  // Mutable Game Refs for animation frame safety
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const levelRef = useRef(1);
  const gameRunningRef = useRef(true);
  const ballVelocityRef = useRef(new THREE.Vector3(5.5, 0, -10)); // Faster initial speed
  const paddleScaleRef = useRef(1.0);
  const magnetActiveRef = useRef(false);
  const ballStuckRef = useRef(false);
  const stuckOffsetRef = useRef(0);

  const ballStart = new THREE.Vector3(0, 0, 6.8);

  // Synthesize game sound effects using Web Audio API (Low latency, highly performant)
  const playSound = (type: "paddle" | "brick" | "steel" | "wall" | "gameover" | "win" | "lose" | "powerup") => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "paddle") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === "brick") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "steel") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(330, ctx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "wall") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "lose") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "powerup") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "gameover") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.55);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === "win") {
        osc.type = "sine";
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start();
        osc.stop(now + 0.4);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    // --- GAME CONSTANTS ---
    const arenaWidth = 16;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const basePaddleWidth = isMobile ? 5.2 : 4.2;
    const paddleDepth = 0.8;
    const ballRadius = 0.42;

    const brickWidth = 1.7;
    const brickHeight = 0.65;
    const brickDepth = 0.7;

    const colors = [
      0xff1744, // Red
      0xff7b00, // Orange
      0xffd500, // Yellow
      0x39ff14, // Green
      0x00e5ff, // Cyan
      0x9d00ff  // Purple
    ];

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02030b);

    const initialWidth = canvasContainer.clientWidth || 600;
    const initialHeight = canvasContainer.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(
      55,
      initialWidth / initialHeight,
      0.1,
      1000
    );
    // Dynamic camera placement for perfect look
    camera.position.set(0, 19, 30);
    camera.lookAt(0, 0, -1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // Performance boost for mobile GPU rendering
      powerPreference: "high-performance"
    });
    // Cap pixel ratio to 1.1 instead of 1.5/2.0 to resolve mobile slowness completely
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.1));
    renderer.setSize(initialWidth, initialHeight);
    canvasContainer.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    // --- ARENA ---
    const floorGeometry = new THREE.PlaneGeometry(34, 48);
    const floorMaterial = new THREE.MeshPhongMaterial({
      color: 0x020612,
      shininess: 30
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    scene.add(floor);

    const grid = new THREE.GridHelper(34, 34, 0x00aaff, 0x051a3a);
    grid.position.y = -0.96;
    scene.add(grid);

    // --- WALLS ---
    const walls: THREE.Mesh[] = [];
    function createWall(x: number, z: number, vertical = true) {
      const geo = vertical
        ? new THREE.BoxGeometry(0.25, 1, 20)
        : new THREE.BoxGeometry(16, 0.25, 0.25);

      const mat = new THREE.MeshPhongMaterial({
        color: 0x00eaff,
        emissive: 0x00eaff,
        emissiveIntensity: 1.5,
        shininess: 60
      });

      const wall = new THREE.Mesh(geo, mat);
      wall.position.set(x, 0, z);
      scene.add(wall);
      walls.push(wall);
      return wall;
    }

    createWall(-arenaWidth / 2, 0, true);
    createWall(arenaWidth / 2, 0, true);
    createWall(0, -10, false);

    // --- PADDLE ---
    const paddleGeo = new THREE.BoxGeometry(basePaddleWidth, 0.45, paddleDepth);
    const paddleMat = new THREE.MeshPhongMaterial({
      color: 0xff00cc,
      emissive: 0xff00cc,
      emissiveIntensity: 1.5,
      shininess: 60
    });
    const paddle = new THREE.Mesh(paddleGeo, paddleMat);
    paddle.position.set(0, 0, 8);
    scene.add(paddle);

    // --- BALL ---
    const ballGeo = new THREE.SphereGeometry(ballRadius, 16, 16); // optimized vertex count
    const ballMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x00eaff,
      emissiveIntensity: 3,
      shininess: 80
    });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    scene.add(ball);

    // --- BRICKS & LEVEL GENERATION ---
    const bricks: THREE.Mesh[] = [];

    function generateBricksForLevel(levelNum: number) {
      // Clear old bricks
      bricks.forEach((b) => scene.remove(b));
      bricks.length = 0;

      // Layout and grid size scale up as levels advance
      const rowsCount = levelNum <= 2 ? 4 : levelNum <= 4 ? 5 : 6;
      const colsCount = 8;

      for (let r = 0; r < rowsCount; r++) {
        for (let c = 0; c < colsCount; c++) {
          let isSteel = false;
          let hp = 1;

          // Level difficulty patterns
          if (levelNum === 2) {
            // Row 1 alternating steel bricks (takes 2 hits)
            if (r === 1 && c % 2 === 0) {
              isSteel = true;
              hp = 2;
            }
          } else if (levelNum === 3) {
            // Row 2 is fully steel (takes 2 hits) or alternating 3-hits
            if (r === 2) {
              isSteel = true;
              hp = 2;
            } else if (r === 0 && c % 3 === 0) {
              isSteel = true;
              hp = 3;
            }
          } else if (levelNum === 4) {
            // Border columns are steel (creates challenging frames)
            if (c === 0 || c === colsCount - 1 || r === 1) {
              isSteel = true;
              hp = 3;
            }
          } else if (levelNum >= 5) {
            // Level 5: Epic dense formation with heavy alternating steel bricks
            if ((r + c) % 2 === 0) {
              isSteel = true;
              hp = 3; // takes 3 hits
            } else if (r === 0 || r === 4) {
              isSteel = true;
              hp = 2;
            }
          }

          const color = isSteel ? 0x8fa1b3 : colors[r % colors.length];
          const geo = new THREE.BoxGeometry(brickWidth, brickHeight, brickDepth);
          
          const mat = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: isSteel ? 0.4 : 1.3,
            shininess: isSteel ? 80 : 30
          });

          const brick = new THREE.Mesh(geo, mat);
          brick.position.x = (c - (colsCount - 1) / 2) * 1.85;
          brick.position.y = 0;
          brick.position.z = -7.2 + r * 0.98;

          brick.userData = {
            alive: true,
            isSteel,
            hp,
            maxHp: hp,
            row: r,
            col: c,
            color
          };

          scene.add(brick);
          bricks.push(brick);
        }
      }
      setBricksLeft(bricks.length);
    }

    generateBricksForLevel(levelRef.current);

    // --- SHARED GEOMETRIES & MATERIALS FOR OPTIMAL PERFORMANCE ---
    const powerUpGeo = new THREE.OctahedronGeometry(0.35, 0);
    const powerUpMaterials = {
      expand: new THREE.MeshPhongMaterial({
        color: 0x00ffcc,
        emissive: 0x00ffcc,
        emissiveIntensity: 1.5,
        shininess: 40
      }),
      magnet: new THREE.MeshPhongMaterial({
        color: 0xffcc00,
        emissive: 0xffcc00,
        emissiveIntensity: 1.5,
        shininess: 40
      })
    };

    const particleGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const particleMaterialsCache: { [color: number]: THREE.MeshBasicMaterial } = {};
    function getParticleMaterial(color: number) {
      if (!particleMaterialsCache[color]) {
        particleMaterialsCache[color] = new THREE.MeshBasicMaterial({ color });
      }
      return particleMaterialsCache[color];
    }

    const flashGeo = new THREE.SphereGeometry(0.15, 8, 8);

    // --- POWER-UPS ENGINE ---
    interface PowerUp {
      mesh: THREE.Mesh;
      type: "expand" | "magnet";
      velocity: number;
    }
    const fallingPowerUps: PowerUp[] = [];

    function spawnPowerUp(position: THREE.Vector3) {
      // 25% chance to spawn a power-up
      if (Math.random() > 0.25) return;

      const type = Math.random() > 0.5 ? "expand" : "magnet";
      const mesh = new THREE.Mesh(powerUpGeo, powerUpMaterials[type]);
      mesh.position.copy(position);
      scene.add(mesh);

      fallingPowerUps.push({
        mesh,
        type,
        velocity: 6 // Speed of falling
      });
    }

    function updatePowerUps(dt: number) {
      const px = paddle.position.x;
      const pz = paddle.position.z;
      const currentPaddleWidth = basePaddleWidth * paddleScaleRef.current;

      for (let i = fallingPowerUps.length - 1; i >= 0; i--) {
        const p = fallingPowerUps[i];
        p.mesh.position.z += p.velocity * dt;
        p.mesh.rotation.y += 3 * dt;
        p.mesh.rotation.x += 1.5 * dt;

        // Catch check
        if (
          Math.abs(p.mesh.position.z - pz) < 0.6 &&
          Math.abs(p.mesh.position.x - px) < currentPaddleWidth / 2 + 0.4
        ) {
          // Catch!
          triggerPowerUp(p.type);
          scene.remove(p.mesh);
          fallingPowerUps.splice(i, 1);
          continue;
        }

        // Out of bounds
        if (p.mesh.position.z > 12) {
          scene.remove(p.mesh);
          fallingPowerUps.splice(i, 1);
        }
      }
    }

    let powerUpTimer: any = null;

    function triggerPowerUp(type: "expand" | "magnet") {
      playSound("powerup");
      if (powerUpTimer) clearTimeout(powerUpTimer);

      if (type === "expand") {
        setActivePowerUp(lang === "ar" ? "توسيع المضرب 🚀" : "Paddle Expanded 🚀");
        paddleScaleRef.current = 1.6;
        paddle.scale.set(1.6, 1.0, 1.0);

        powerUpTimer = setTimeout(() => {
          paddleScaleRef.current = 1.0;
          paddle.scale.set(1.0, 1.0, 1.0);
          setActivePowerUp(null);
        }, 12000); // 12 seconds
      } else if (type === "magnet") {
        setActivePowerUp(lang === "ar" ? "مغناطيس فعال 🧲" : "Magnet Active 🧲");
        magnetActiveRef.current = true;

        powerUpTimer = setTimeout(() => {
          magnetActiveRef.current = false;
          ballStuckRef.current = false;
          setActivePowerUp(null);
        }, 12000); // 12 seconds
      }
    }

    // --- EXPLOSIONS & PARTICLES ---
    interface Particle {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      life: number;
    }
    const particles: Particle[] = [];

    function triggerExplosion(position: THREE.Vector3, color: number) {
      const mat = getParticleMaterial(color);
      for (let i = 0; i < 14; i++) {
        const p = new THREE.Mesh(particleGeo, mat);
        p.position.copy(position);

        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 8
        );

        scene.add(p);
        particles.push({ mesh: p, velocity, life: 1.0 });
      }
    }

    function updateParticles(dt: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.addScaledVector(p.velocity, dt);
        p.velocity.y -= 5 * dt;
        p.life -= dt;
        p.mesh.scale.multiplyScalar(0.96);

        if (p.life <= 0) {
          scene.remove(p.mesh);
          particles.splice(i, 1);
        }
      }
    }

    // --- HIT FLASH ---
    interface Flash {
      mesh: THREE.Mesh;
      life: number;
    }
    const flashes: Flash[] = [];

    function triggerHitFlash(position: THREE.Vector3) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1
      });
      const flash = new THREE.Mesh(flashGeo, mat);
      flash.position.copy(position);
      scene.add(flash);
      flashes.push({ mesh: flash, life: 0.35 });
    }

    function updateFlashes(dt: number) {
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.life -= dt;
        f.mesh.scale.multiplyScalar(1.12);
        (f.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, f.life / 0.35);

        if (f.life <= 0) {
          scene.remove(f.mesh);
          (f.mesh.material as THREE.Material).dispose();
          flashes.splice(i, 1);
        }
      }
    }

    // --- COLLISION LOGIC ---
    function checkPaddleCollision() {
      const px = paddle.position.x;
      const pz = paddle.position.z;

      const bx = ball.position.x;
      const bz = ball.position.z;

      const currentPaddleWidth = basePaddleWidth * paddleScaleRef.current;

      if (
        ballVelocityRef.current.z > 0 &&
        bz + ballRadius >= pz - paddleDepth / 2 &&
        bz - ballRadius <= pz + paddleDepth / 2 &&
        bx >= px - currentPaddleWidth / 2 - ballRadius &&
        bx <= px + currentPaddleWidth / 2 + ballRadius
      ) {
        ball.position.z = pz - paddleDepth / 2 - ballRadius;

        if (magnetActiveRef.current) {
          // Stick to paddle
          ballStuckRef.current = true;
          stuckOffsetRef.current = bx - px;
          playSound("paddle");
          return;
        }

        const hit = (bx - px) / (currentPaddleWidth / 2);
        ballVelocityRef.current.x = hit * 8.5;
        ballVelocityRef.current.z = -Math.abs(ballVelocityRef.current.z);

        // Gentle speed multiplier
        ballVelocityRef.current.multiplyScalar(1.02);

        triggerHitFlash(ball.position);
        playSound("paddle");
      }
    }

    function checkWallCollision() {
      const left = -arenaWidth / 2 + ballRadius;
      const right = arenaWidth / 2 - ballRadius;

      if (ball.position.x <= left) {
        ball.position.x = left;
        ballVelocityRef.current.x = Math.abs(ballVelocityRef.current.x);
        triggerHitFlash(ball.position);
        playSound("wall");
      }

      if (ball.position.x >= right) {
        ball.position.x = right;
        ballVelocityRef.current.x = -Math.abs(ballVelocityRef.current.x);
        triggerHitFlash(ball.position);
        playSound("wall");
      }

      const top = -10 + ballRadius;

      if (ball.position.z <= top) {
        ball.position.z = top;
        ballVelocityRef.current.z = Math.abs(ballVelocityRef.current.z);
        triggerHitFlash(ball.position);
        playSound("wall");
      }

      // Lose life if falling past bottom
      if (ball.position.z > 10) {
        loseLife();
      }
    }

    function checkBrickCollision() {
      for (const brick of bricks) {
        if (!brick.userData.alive) continue;

        const dx = Math.abs(ball.position.x - brick.position.x);
        const dz = Math.abs(ball.position.z - brick.position.z);

        if (
          dx <= brickWidth / 2 + ballRadius &&
          dz <= brickDepth / 2 + ballRadius
        ) {
          // Check steel health points
          brick.userData.hp--;

          if (brick.userData.isSteel && brick.userData.hp > 0) {
            // Steel hit but not broken
            playSound("steel");
            triggerHitFlash(ball.position);

            // Change emissive color to show damage (glow more red/orange)
            const damagePercent = 1 - (brick.userData.hp / brick.userData.maxHp);
            const damagedColor = new THREE.Color(0xff1744).lerp(new THREE.Color(0x8fa1b3), 1 - damagePercent);
            (brick.material as THREE.MeshPhongMaterial).color.copy(damagedColor);
            (brick.material as THREE.MeshPhongMaterial).emissive.setHex(0xff3300);
            (brick.material as THREE.MeshPhongMaterial).emissiveIntensity = 1.0 * damagePercent;
          } else {
            // Destroy normal/broken brick
            brick.userData.alive = false;
            scoreRef.current += brick.userData.isSteel ? 30 : 10;
            setScore(scoreRef.current);

            triggerExplosion(brick.position, brick.userData.color);
            scene.remove(brick);
            playSound("brick");

            // Drop power up chance
            spawnPowerUp(brick.position);

            const remaining = bricks.filter((b) => b.userData.alive).length;
            setBricksLeft(remaining);

            if (bricks.every((b) => !b.userData.alive)) {
              advanceLevel();
            }
          }

          // Dynamic bounce reflection
          const overlapX = brickWidth / 2 + ballRadius - dx;
          const overlapZ = brickDepth / 2 + ballRadius - dz;

          if (overlapX < overlapZ) {
            ballVelocityRef.current.x *= -1;
          } else {
            ballVelocityRef.current.z *= -1;
          }

          triggerHitFlash(ball.position);
          break;
        }
      }
    }

    function advanceLevel() {
      if (levelRef.current < 5) {
        levelRef.current++;
        setCurrentLevel(levelRef.current);
        playSound("win");
        resetBall();
        generateBricksForLevel(levelRef.current);
      } else {
        winGame();
      }
    }

    function resetBall() {
      ball.position.copy(ballStart);
      ballStuckRef.current = false;
      const direction = Math.random() > 0.5 ? 1 : -1;
      
      // Snappy, fast physics: Speed scales up by 15% in each level starting from a faster base!
      const speedMultiplier = 1 + (levelRef.current - 1) * 0.15;
      const vx = 7.5 * direction * speedMultiplier;
      const vz = -14.5 * speedMultiplier;
      
      ballVelocityRef.current.set(vx, 0, vz);
    }

    function loseLife() {
      livesRef.current--;
      setLives(livesRef.current);
      playSound("lose");

      if (livesRef.current <= 0) {
        gameOver();
      } else {
        resetBall();
      }
    }

    function gameOver() {
      gameRunningRef.current = false;
      playSound("gameover");
      setOverlay({
        show: true,
        title: lang === "ar" ? "💥 انتهت اللعبة" : "💥 GAME OVER",
        text: lang === "ar"
          ? `لقد نفدت جميع المحاولات.<br>المستوى: <b>${levelRef.current}</b> | نتيجتك النهائية: <b>${scoreRef.current}</b>`
          : `All attempts exhausted.<br>Level: <b>${levelRef.current}</b> | Final Score: <b>${scoreRef.current}</b>`,
        isVictory: false
      });
    }

    function winGame() {
      gameRunningRef.current = false;
      playSound("win");
      setOverlay({
        show: true,
        title: lang === "ar" ? "🏆 فوز رائع وبطل اللعبة!" : "🏆 ULTIMATE CHAMPION!",
        text: lang === "ar"
          ? `لقد هزمت جميع المستويات المتقدمة!<br>النتيجة النهائية: <b>${scoreRef.current}</b>`
          : `You crushed all difficulty levels!<br>Final Score: <b>${scoreRef.current}</b>`,
        isVictory: true
      });
    }

    // --- USER CONTROLS ---
    let targetPaddleX = 0;
    const keys = { left: false, right: false };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keys.left = true;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keys.right = true;
      }
      // Release magnet ball with Space or Enter
      if ((e.key === " " || e.key === "Enter") && ballStuckRef.current) {
        ballStuckRef.current = false;
        const speedMultiplier = 1 + (levelRef.current - 1) * 0.15;
        ballVelocityRef.current.z = -14.5 * speedMultiplier;
        ballVelocityRef.current.x = (Math.random() - 0.5) * 8.5 * speedMultiplier;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keys.left = false;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keys.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Unified Pointer Controls (Covers both touch swipe and mouse move reliably)
    const onPointerMove = (e: PointerEvent) => {
      // Prevent browser from scrolling or dragging the page while playing the game
      if (e.cancelable) {
        e.preventDefault();
      }

      const rect = renderer.domElement.getBoundingClientRect();
      const normalized = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetPaddleX = normalized * (arenaWidth / 2 - (basePaddleWidth * paddleScaleRef.current) / 2);
    };

    // Auto release stuck ball if user taps or clicks screen
    const onPointerDown = (e: PointerEvent) => {
      if (ballStuckRef.current) {
        ballStuckRef.current = false;
        const speedMultiplier = 1 + (levelRef.current - 1) * 0.15;
        ballVelocityRef.current.z = -14.5 * speedMultiplier;
        ballVelocityRef.current.x = (Math.random() - 0.5) * 8.5 * speedMultiplier;
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove, { passive: false });
    renderer.domElement.addEventListener("pointerdown", onPointerDown, { passive: false });

    // Dynamic global exposed callback inside ref for react button re-renders
    const handleRestartGame = () => {
      levelRef.current = 1;
      setCurrentLevel(1);
      generateBricksForLevel(1);
      resetBall();
      
      scoreRef.current = 0;
      livesRef.current = 3;
      paddleScaleRef.current = 1.0;
      paddle.scale.set(1.0, 1.0, 1.0);
      magnetActiveRef.current = false;
      ballStuckRef.current = false;

      setScore(0);
      setLives(3);
      setActivePowerUp(null);
      setOverlay({ show: false, title: "", text: "", isVictory: false });
      gameRunningRef.current = true;
    };

    (canvasContainer as any)._restartGame = handleRestartGame;

    // --- GAME RENDERING/ANIMATION LOOP WITH FIXED TIMESTEP ---
    let animationId: number;
    let lastTime = performance.now();
    let accumulator = 0;
    const fixedTimeStep = 1 / 60; // Consistent 60Hz physics ticks

    const updatePhysics = (dt: number) => {
      if (!gameRunningRef.current) return;

      // Paddle movement
      if (keys.left) {
        targetPaddleX -= 12 * dt;
      }
      if (keys.right) {
        targetPaddleX += 12 * dt;
      }

      const limit = arenaWidth / 2 - (basePaddleWidth * paddleScaleRef.current) / 2;
      targetPaddleX = THREE.MathUtils.clamp(targetPaddleX, -limit, limit);

      // Smooth Lerp
      paddle.position.x = THREE.MathUtils.lerp(
        paddle.position.x,
        targetPaddleX,
        0.4
      );

      // Stuck ball logic
      if (ballStuckRef.current) {
        ball.position.x = paddle.position.x + stuckOffsetRef.current;
        ball.position.z = paddle.position.z - paddleDepth / 2 - ballRadius;
      } else {
        // Ball movement
        ball.position.x += ballVelocityRef.current.x * dt;
        ball.position.z += ballVelocityRef.current.z * dt;

        checkWallCollision();

        if (gameRunningRef.current) {
          checkPaddleCollision();
          checkBrickCollision();
        }

        // Physics rotation effect
        ball.rotation.x += ballVelocityRef.current.z * dt;
        ball.rotation.z += ballVelocityRef.current.x * dt;
      }

      // Keep dynamic power ups falling
      updatePowerUps(dt);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const now = performance.now();
      let frameTime = (now - lastTime) / 1000;
      lastTime = now;

      // Prevent "spiral of death" in case of major lag spikes
      if (frameTime > 0.25) {
        frameTime = 0.25;
      }

      accumulator += frameTime;

      // Execute as many fixed steps as needed to catch up
      while (accumulator >= fixedTimeStep) {
        updatePhysics(fixedTimeStep);
        accumulator -= fixedTimeStep;
      }

      // Render visual-only effects (particles and hit flashes) relative to frame time
      const renderDt = Math.min(frameTime, 0.03);
      updateParticles(renderDt);
      updateFlashes(renderDt);

      renderer.render(scene, camera);
    };

    animate();

    // --- AUTO RESIZE OBSERVER ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });

    resizeObserver.observe(canvasContainer);

    // --- CLEANUP SCENE OBJECTS ---
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (powerUpTimer) clearTimeout(powerUpTimer);
      
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [lang]);

  const triggerRestart = () => {
    const canvasContainer = canvasContainerRef.current;
    if (canvasContainer && (canvasContainer as any)._restartGame) {
      (canvasContainer as any)._restartGame();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[78vh] sm:h-[580px] md:h-[680px] max-w-5xl mx-auto bg-[#02030b] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20 touch-none select-none"
    >
      {/* 3D WebGL Canvas Viewport */}
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Modern HUD Display panel */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none z-10 gap-2">
        
        {/* Score & Level badge */}
        <div className="px-2.5 py-1.5 md:px-4 md:py-2.5 border border-cyan-400 rounded-xl bg-slate-950/80 backdrop-blur-md shadow-md text-center min-w-[70px] md:min-w-[110px]">
          <span className="block text-cyan-300 text-[9px] md:text-xs font-semibold mb-0.5">
            {lang === "ar" ? "المستوى" : "LEVEL"} {currentLevel}
          </span>
          <strong className="text-white text-sm md:text-lg font-black tracking-wide drop-shadow-[0_0_8px_#00eaff]">
            {score}
          </strong>
        </div>

        {/* Lives Display */}
        <div className="px-2.5 py-1.5 md:px-4 md:py-2.5 border border-cyan-400 rounded-xl bg-slate-950/80 backdrop-blur-md shadow-md text-center min-w-[80px] md:min-w-[120px]">
          <span className="block text-cyan-300 text-[9px] md:text-xs font-semibold mb-0.5">
            {lang === "ar" ? "المحاولات" : "LIVES"}
          </span>
          <strong className="text-white text-xs md:text-sm tracking-wider">
            {"❤️".repeat(lives) + "🖤".repeat(Math.max(0, 3 - lives))}
          </strong>
        </div>

        {/* Remaining Bricks badge */}
        <div className="px-2.5 py-1.5 md:px-4 md:py-2.5 border border-cyan-400 rounded-xl bg-slate-950/80 backdrop-blur-md shadow-md text-center min-w-[70px] md:min-w-[110px]">
          <span className="block text-cyan-300 text-[9px] md:text-xs font-semibold mb-0.5">
            {lang === "ar" ? "المتبقي" : "BRICKS"}
          </span>
          <strong className="text-white text-sm md:text-lg font-black drop-shadow-[0_0_8px_#00eaff]">
            {bricksLeft}
          </strong>
        </div>
      </div>

      {/* Floating active power up tracker alert */}
      {activePowerUp && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/80 text-cyan-200 text-xs font-bold shadow-md shadow-cyan-500/10 pointer-events-none z-15 animate-bounce">
          {activePowerUp}
        </div>
      )}

      {/* Steer instruction widget */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10 text-[9px] md:text-xs text-cyan-300 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-cyan-500/10 text-center shadow-lg w-[90%] sm:w-auto">
        {lang === "ar"
          ? "⬅️ ➡️ الأسهم | 🖱️ حرك الماوس | 📱 اسحب للمس | [المسافة] لإطلاق المغناطيس"
          : "⬅️ ➡️ Arrows | 🖱️ Mouse | 📱 Swipe Touch | [Space] to shoot magnet ball"}
      </div>

      {/* Modal overlays for Win / Loss game over */}
      {overlay.show && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-20">
          <div className="w-full max-w-sm text-center p-6 md:p-8 border border-cyan-400 rounded-3xl bg-slate-950/95 shadow-2xl shadow-cyan-500/20">
            <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-white drop-shadow-[0_0_12px_#00eaff]">
              {overlay.title}
            </h1>
            <p
              className="text-cyan-100 text-xs md:text-sm leading-relaxed mb-5"
              dangerouslySetInnerHTML={{ __html: overlay.text }}
            />
            <button
              onClick={triggerRestart}
              className="w-full px-6 py-3 bg-[#06152b] hover:bg-[#09294a] text-cyan-100 font-bold border border-cyan-400 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md shadow-cyan-500/10"
            >
              {lang === "ar" ? "🔄 إعادة اللعب" : "🔄 Play Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
