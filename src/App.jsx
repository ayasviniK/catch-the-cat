import { useEffect, useRef, useState, useCallback } from "react";
import PixelCat, { CAT_SKINS } from "./PixelCat";
import PixelBedroom from "./PixelBedroom";
import {
  PixelHeart,
  PixelTrophy,
  PixelClock,
  PixelPaw,
  PixelStar,
  PixelCrown,
  PixelSound,
} from "./PixelIcons";
import { sfx } from "./SoundEffects";
import "./App.css";

const TAUNTS = [
  "too slow!",
  "catch me if you can!",
  "skill issue.",
  "I pay no rent. I fear nothing.",
  "your reflexes need therapy.",
  "NOT TODAY!",
  "zoomies activated!",
  "nice try, peasant.",
  "nope nope nope!",
  "you almost had me!",
];

// Difficulty curve: cat gets faster, smaller hitbox, dodges more
function getDifficulty(score) {
  if (score >= 25) return { moveDelay: 40, dodgeChance: 0.75, sizeScale: 0.7, label: "INSANE", color: "#ff0044" };
  if (score >= 18) return { moveDelay: 60, dodgeChance: 0.65, sizeScale: 0.75, label: "HARD", color: "#ff70a6" };
  if (score >= 12) return { moveDelay: 90, dodgeChance: 0.5, sizeScale: 0.82, label: "MEDIUM", color: "#ffd166" };
  if (score >= 6) return { moveDelay: 110, dodgeChance: 0.35, sizeScale: 0.9, label: "WARMING UP", color: "#48cae4" };
  return { moveDelay: 140, dodgeChance: 0.15, sizeScale: 1.0, label: "EASY", color: "#80ed99" };
}

export default function App() {
  const [selectedSkin, setSelectedSkin] = useState("midnight");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return Number(localStorage.getItem("catch_cat_hs") || 0); } catch { return 0; }
  });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [time, setTime] = useState(30);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [catState, setCatState] = useState("sit");
  const [catFacing, setCatFacing] = useState("right");
  const [catSize, setCatSize] = useState(72);
  const [position, setPosition] = useState({ x: 140, y: 190 });
  const [message, setMessage] = useState("tap the cat to catch it. tap when asleep for sneak bonus!");
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem("catch_cat_muted") === "true"; } catch { return false; }
  });
  const [particles, setParticles] = useState([]);
  const [misses, setMisses] = useState(0);
  const [showCombo, setShowCombo] = useState(null); // {x, y, text, color}

  // Hiding mode state
  const [isHiding, setIsHiding] = useState(false);
  const [hidingSpot, setHidingSpot] = useState(null); // 'curtain' | 'desk' | 'bed' | 'bookshelf'

  const areaRef = useRef(null);
  const timerRef = useRef(null);
  const napRef = useRef(null);
  const caughtResetRef = useRef(null);
  const streakTimerRef = useRef(null);
  const autoMoveRef = useRef(null);
  const hidingTimeoutRef = useRef(null);
  const ghostUsedRef = useRef(false);
  const scoreRef = useRef(0); // Ref for auto-move closure

  // Keep scoreRef in sync
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Sync mute
  useEffect(() => {
    sfx.muted = muted;
    try { localStorage.setItem("catch_cat_muted", String(muted)); } catch {}
  }, [muted]);

  // Boundary clamping for top-down floor
  const getFloorBounds = useCallback((customSize) => {
    if (!areaRef.current) return { minX: 10, maxX: 300, minY: 100, maxY: 300 };
    const area = areaRef.current;
    const sz = customSize || catSize;
    const minX = area.clientWidth * 0.04;
    const maxX = Math.max(minX, area.clientWidth * 0.96 - sz);
    const minY = area.clientHeight * 0.38;
    const maxY = Math.max(minY, area.clientHeight * 0.88 - sz);
    return { minX, maxX, minY, maxY };
  }, [catSize]);

  const clampPositionToBounds = useCallback((pos) => {
    if (!areaRef.current) return pos;
    const area = areaRef.current;
    const sz = Math.min(80, Math.max(56, area.clientWidth * 0.17));
    setCatSize(sz);
    const { minX, maxX, minY, maxY } = getFloorBounds(sz);
    return {
      x: Math.min(Math.max(minX, pos.x), maxX),
      y: Math.min(Math.max(minY, pos.y), maxY),
    };
  }, [getFloorBounds]);

  useEffect(() => {
    if (!areaRef.current) return;
    const observer = new ResizeObserver(() => {
      setPosition((prev) => clampPositionToBounds(prev));
    });
    observer.observe(areaRef.current);
    return () => observer.disconnect();
  }, [clampPositionToBounds]);

  // Countdown timer
  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setPlaying(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  // Game over effects
  useEffect(() => {
    if (!finished) return;
    clearInterval(autoMoveRef.current);
    clearTimeout(napRef.current);
    clearTimeout(hidingTimeoutRef.current);
    setIsHiding(false);
    setHidingSpot(null);

    if (score >= 10) {
      sfx.playVictory();
      setCatState("sit");
      setMessage("VICTORY! You caught the cat and beat the game!");
      setParticles(Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 88 + 6,
        y: Math.random() * 85 + 6,
        color: ["#ff70a6", "#ffd166", "#48cae4", "#c5a8ff", "#80ed99"][i % 5],
        delay: Math.random() * 0.7,
      })));
    } else {
      sfx.playGameOver();
      setCatState("sleep");
      setMessage("The cat escaped into the shadows. Better luck next round!");
    }
    if (score > highScore) {
      setHighScore(score);
      try { localStorage.setItem("catch_cat_hs", String(score)); } catch {}
    }
  }, [finished]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(napRef.current);
      clearTimeout(caughtResetRef.current);
      clearTimeout(streakTimerRef.current);
      clearInterval(autoMoveRef.current);
      clearTimeout(hidingTimeoutRef.current);
    };
  }, []);

  // Move cat to a random floor position
  const moveCat = useCallback(() => {
    if (!areaRef.current) return;
    const diff = getDifficulty(scoreRef.current);
    const sz = Math.round(catSize * diff.sizeScale);
    const { minX, maxX, minY, maxY } = getFloorBounds(sz);

    const newX = minX + Math.random() * (maxX - minX);
    const newY = minY + Math.random() * (maxY - minY);

    setPosition((prev) => {
      setCatFacing(newX < prev.x ? "left" : "right");
      return { x: newX, y: newY };
    });
  }, [catSize, getFloorBounds]);

  // Start the Hiding Mini-Game
  const startHidingMode = useCallback((alertMsg) => {
    clearTimeout(napRef.current);
    clearTimeout(hidingTimeoutRef.current);

    const spots = ["bed", "bookshelf", "desk", "curtain"];
    const chosen = spots[Math.floor(Math.random() * spots.length)];

    setIsHiding(true);
    setHidingSpot(chosen);
    sfx.playDash();
    setMessage(alertMsg || "WHERE DID THE CAT GO?! SEARCH THE ROOM TO FIND IT!");

    // Time window to find the hidden cat: 4.5 seconds
    hidingTimeoutRef.current = setTimeout(() => {
      setIsHiding(false);
      setHidingSpot(null);
      sfx.playDash();
      setMessage("TOO SLOW! Cat bolted out of hiding!");
      setCatState("walk");
      moveCat();
    }, 4500);
  }, [moveCat]);

  // Auto-move: cat repositions itself periodically, faster at higher scores
  const startAutoMove = useCallback(() => {
    clearInterval(autoMoveRef.current);

    autoMoveRef.current = setInterval(() => {
      // Don't auto-move if sleeping or hiding
      if (scoreRef.current === 0) return;
      if (Math.random() < 0.4) {
        moveCat();
        sfx.playDash();
      }
    }, 2200);
  }, [moveCat]);

  function startGame() {
    clearInterval(timerRef.current);
    clearTimeout(napRef.current);
    clearTimeout(caughtResetRef.current);
    clearTimeout(streakTimerRef.current);
    clearInterval(autoMoveRef.current);
    clearTimeout(hidingTimeoutRef.current);

    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setMisses(0);
    setTime(30);
    setFinished(false);
    setPlaying(true);
    setIsHiding(false);
    setHidingSpot(null);
    setCatState("walk");
    setParticles([]);
    setShowCombo(null);
    ghostUsedRef.current = false;
    setMessage("30 SECONDS. CATCH 10+ TO WIN. TAP WHEN ASLEEP FOR SNEAK BONUS!");
    scoreRef.current = 0;

    if (areaRef.current) {
      setPosition({
        x: areaRef.current.clientWidth * 0.45,
        y: areaRef.current.clientHeight * 0.62,
      });
    }

    // Start auto-move after a beat
    setTimeout(() => startAutoMove(), 800);
  }

  // Handle missed click on the floor (penalty)
  function handleFloorMiss(e) {
    if (!playing) return;
    // Don't count miss if clicked on the cat button or during overlay
    if (e.target.closest(".cat-button")) return;

    // If cat is hiding, remind the player to search furniture
    if (isHiding) {
      setMessage("THE CAT IS HIDING! TAP THE BED, DESK, BOOKSHELF OR CURTAIN!");
      return;
    }

    setMisses((m) => m + 1);
    setStreak(0);
    sfx.playDash();
    setMessage("MISS! Streak lost. Aim for the cat!");

    // Show miss indicator at click position
    const rect = areaRef.current?.getBoundingClientRect();
    if (rect) {
      setShowCombo({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        text: "MISS",
        color: "#ff0044",
      });
      setTimeout(() => setShowCombo(null), 600);
    }
  }

  // Player clicks on furniture hiding spot
  function handleSpotClick(spot, e) {
    if (!playing || !isHiding) return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const rect = areaRef.current?.getBoundingClientRect();
    const clickX = e?.clientX && rect ? e.clientX - rect.left : 180;
    const clickY = e?.clientY && rect ? e.clientY - rect.top : 150;

    if (spot === hidingSpot) {
      // SUCCESS: Found the cat!
      clearTimeout(hidingTimeoutRef.current);
      setIsHiding(false);
      setHidingSpot(null);
      sfx.playFound();

      const newScore = score + 2;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      setMessage("FOUND YOU! +2 HIDE & SEEK BONUS!");
      setShowCombo({
        x: clickX,
        y: clickY,
        text: "+2 FOUND!",
        color: "#ffd166",
      });
      setTimeout(() => setShowCombo(null), 700);

      // Reappear cat near found spot in surprised caught state
      const spawnCoords = {
        curtain: { x: areaRef.current.clientWidth * 0.68, y: areaRef.current.clientHeight * 0.45 },
        desk: { x: areaRef.current.clientWidth * 0.14, y: areaRef.current.clientHeight * 0.58 },
        bed: { x: areaRef.current.clientWidth * 0.44, y: areaRef.current.clientHeight * 0.65 },
        bookshelf: { x: areaRef.current.clientWidth * 0.74, y: areaRef.current.clientHeight * 0.55 },
      };
      const pos = spawnCoords[spot] || { x: 140, y: 190 };
      setPosition(clampPositionToBounds(pos));

      setCatState("caught");
      clearTimeout(caughtResetRef.current);
      caughtResetRef.current = setTimeout(() => {
        if (playing) {
          setCatState("walk");
          moveCat();
        }
      }, 450);
    } else {
      // WRONG FURNITURE SPOT
      sfx.playRustle();
      setMisses((m) => m + 1);
      setStreak(0);
      setMessage("EMPTY! The cat is not there, check another spot!");
      setShowCombo({
        x: clickX,
        y: clickY,
        text: "EMPTY",
        color: "#ff70a6",
      });
      setTimeout(() => setShowCombo(null), 600);
    }
  }

  // Cheering Ghost Buddy Easter Egg
  function handleGhostClick(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!playing) return;

    if (!ghostUsedRef.current) {
      ghostUsedRef.current = true;
      sfx.playFound();
      setTime((t) => Math.min(t + 2, 35));
      setMessage("GHOST FRIEND CHEERS FOR YOU! +2s BONUS TIME!");

      const rect = areaRef.current?.getBoundingClientRect();
      if (rect) {
        setShowCombo({
          x: rect.width * 0.72,
          y: rect.height * 0.58,
          text: "+2s GHOST!",
          color: "#48cae4",
        });
        setTimeout(() => setShowCombo(null), 700);
      }
    } else {
      sfx.playPurr();
      setMessage("Ghost friend waves its little arms happily!");
    }
  }

  // Cat catch handler (handles active catch & sneak attack when sleeping!)
  function handleCatch(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!playing || isHiding) return;

    const wasSleeping = catState === "sleep";

    if (wasSleeping) {
      // Sneak Attack: Caught the cat while it was sleeping!
      clearTimeout(napRef.current);
      sfx.playPurr();
      sfx.playCatch();

      const newScore = score + 2;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      setMessage("CAUGHT NAPPING! +2 SNEAK ATTACK BONUS!");

      // Floating combo in gold
      setShowCombo({
        x: position.x + catSize / 2,
        y: position.y - 10,
        text: "+2 SNEAK!",
        color: "#ffd166",
      });
      setTimeout(() => setShowCombo(null), 600);

      setCatState("caught");
      clearTimeout(caughtResetRef.current);
      caughtResetRef.current = setTimeout(() => {
        if (playing) {
          setCatState("walk");
          moveCat();
        }
      }, 350);
      return;
    }

    // Normal active catch
    sfx.playCatch();
    const diff = getDifficulty(score);

    setCatState("caught");
    clearTimeout(caughtResetRef.current);
    caughtResetRef.current = setTimeout(() => {
      if (playing) setCatState("walk");
    }, 300);

    const newScore = score + 1;
    const newStreak = streak + 1;
    setScore(newScore);
    setStreak(newStreak);
    if (newStreak > bestStreak) setBestStreak(newStreak);

    // Streak bonus time: every 5-streak adds +2 seconds
    if (newStreak > 0 && newStreak % 5 === 0) {
      setTime((t) => Math.min(t + 2, 35));
      setMessage(`COMBO x${newStreak}! +2s BONUS TIME!`);
    } else if (newStreak >= 3) {
      setMessage(`COMBO x${newStreak}! Keep going!`);
    } else {
      setMessage(TAUNTS[Math.floor(Math.random() * TAUNTS.length)]);
    }

    // Streak decay timer
    clearTimeout(streakTimerRef.current);
    streakTimerRef.current = setTimeout(() => setStreak(0), 2800);

    // Show floating combo at cat position
    const rect = areaRef.current?.getBoundingClientRect();
    if (rect) {
      setShowCombo({
        x: position.x + catSize / 2,
        y: position.y - 10,
        text: newStreak >= 3 ? `x${newStreak}` : `+1`,
        color: newStreak >= 5 ? "#ffd166" : newStreak >= 3 ? "#ff70a6" : "#80ed99",
      });
      setTimeout(() => setShowCombo(null), 500);
    }

    // Dynamic gameplay events:
    // Event A: Nap mechanic every 6 catches (cat sleeps, player can tap it or it bolts into hiding!)
    if (newScore % 6 === 0 && newScore < 30) {
      clearTimeout(napRef.current);
      setCatState("sleep");
      sfx.playNap();
      setMessage("ZZZ... THE CAT FELL ASLEEP! QUICK, TAP FOR SNEAK BONUS!");

      // If player doesn't tap sleeping cat within 2.1 seconds, it wakes up and bolts into hiding!
      napRef.current = setTimeout(() => {
        startHidingMode("WOKE UP & BOLTED INTO HIDING! FIND IT!");
      }, 2100);
    }
    // Event B: Sudden ninja vanishing hide at scores 9, 17, 24
    else if (newScore === 9 || newScore === 17 || newScore === 24) {
      startHidingMode("POOF! THE CAT VANISHED INTO HIDING! FIND IT!");
    } else {
      moveCat();
    }

    // Ramp up auto-move speed as difficulty increases
    const nextDiff = getDifficulty(newScore);
    if (nextDiff.label !== diff.label) {
      setMessage(`DIFFICULTY UP: ${nextDiff.label}!`);
      clearInterval(autoMoveRef.current);
      const interval = nextDiff.label === "INSANE" ? 1400 : nextDiff.label === "HARD" ? 1700 : 2200;
      autoMoveRef.current = setInterval(() => {
        if (Math.random() < 0.45) {
          moveCat();
          sfx.playDash();
        }
      }, interval);
    }
  }

  // Mouse hover dodge at higher difficulty (only when active walking)
  function handlePointerApproach() {
    if (!playing || isHiding || catState !== "walk") return;
    const diff = getDifficulty(score);
    if (Math.random() < diff.dodgeChance) {
      sfx.playDash();
      moveCat();
      setMessage("DODGED!");
    }
  }

  function getRank() {
    if (score >= 25) return { title: "S+ RANK: LEGENDARY", color: "#ffd166" };
    if (score >= 20) return { title: "S RANK: CAT WHISPERER", color: "#ff70a6" };
    if (score >= 15) return { title: "A RANK: MASTER HERDER", color: "#48cae4" };
    if (score >= 10) return { title: "B RANK: QUICK PAWS", color: "#80ed99" };
    if (score >= 5) return { title: "C RANK: DECENT EFFORT", color: "#bca9c7" };
    return { title: "D RANK: THE CAT OWNS YOU", color: "#6b5c7c" };
  }

  const isVictory = finished && score >= 10;
  const rankInfo = getRank();
  const diff = getDifficulty(score);
  const scaledCatSize = Math.round(catSize * diff.sizeScale);
  const accuracy = score + misses > 0 ? Math.round((score / (score + misses)) * 100) : 0;

  return (
    <main className="app-shell">
      {/* Compact Topbar */}
      <header className="topbar">
        <div className="logo">
          <span className="logo-icon"><PixelPaw size={14} color="#180f22" /></span>
          <span>catch the cat</span>
        </div>

        {/* Cat skin selector: inline in topbar */}
        {!playing && !finished && (
          <div className="skin-picker-inline" role="radiogroup" aria-label="Select cat">
            {Object.values(CAT_SKINS).map((skin) => (
              <button
                key={skin.id}
                className={`skin-chip ${selectedSkin === skin.id ? "skin-chip-active" : ""}`}
                onClick={() => setSelectedSkin(skin.id)}
                type="button"
                title={skin.label}
              >
                <div className="chip-cat"><PixelCat skin={skin.id} state="sit" size={22} facing="right" /></div>
              </button>
            ))}
          </div>
        )}

        {/* Live difficulty / hiding indicator during gameplay */}
        {playing && (
          <div
            className={`diff-badge ${isHiding ? "diff-badge-hiding" : ""}`}
            style={{
              borderColor: isHiding ? "#ffd166" : diff.color,
              color: isHiding ? "#ffd166" : diff.color,
            }}
          >
            {isHiding ? "HIDING!" : diff.label}
          </div>
        )}

        <div className="topbar-right">
          <button
            className="sound-btn"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            title={muted ? "Unmute" : "Mute"}
          >
            <PixelSound muted={muted} size={16} color="#c2aecf" />
          </button>
        </div>
      </header>

      {/* Full-screen Game Card */}
      <section className="game-card">
        {/* HUD Stats */}
        <div className="stats">
          <div className="stat-box">
            <span className="stat-label"><PixelPaw size={10} color="#8a7a96" /> SCORE</span>
            <strong>{score.toString().padStart(2, "0")}</strong>
          </div>
          <div className="stat-box">
            <span className="stat-label"><PixelClock size={10} color="#8a7a96" /> TIME</span>
            <strong className={time <= 10 && playing ? "urgent" : ""}>{`0:${String(time).padStart(2, "0")}`}</strong>
          </div>
          <div className="stat-box">
            <span className="stat-label"><PixelTrophy size={10} color="#8a7a96" /> BEST</span>
            <strong>{highScore.toString().padStart(2, "0")}</strong>
          </div>
          <div className="stat-box streak-box">
            <span className="stat-label"><PixelHeart size={10} color="#ff70a6" /> STREAK</span>
            <strong className={streak >= 3 ? "streak-fire" : ""}>{streak > 1 ? `x${streak}` : streak}</strong>
          </div>
          {playing && (
            <div className="stat-box accuracy-box">
              <span className="stat-label">ACC</span>
              <strong>{accuracy}%</strong>
            </div>
          )}
        </div>

        {/* Game Area */}
        <div
          className={`game-area ${isHiding ? "game-area-hiding" : ""}`}
          ref={areaRef}
          onTouchMove={(e) => e.preventDefault()}
          onPointerDown={handleFloorMiss}
        >
          {/* Interactive Bedroom with clickable hiding spots */}
          <PixelBedroom
            hidingSpot={hidingSpot}
            isHiding={isHiding}
            onSpotClick={handleSpotClick}
            catSkin={selectedSkin}
            onGhostClick={handleGhostClick}
          />

          {/* Floating combo / miss text */}
          {showCombo && (
            <div
              className="combo-popup"
              style={{ left: showCombo.x, top: showCombo.y, color: showCombo.color }}
            >
              {showCombo.text}
            </div>
          )}

          {/* Victory particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="victory-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}

          {/* START OVERLAY */}
          {!playing && !finished && (
            <div className="overlay start-overlay">
              <div className="preview-cat-frame">
                <PixelCat skin={selectedSkin} state="sit" size={80} facing="right" />
              </div>
              <h2>CATCH THE CAT</h2>
              <p>Catch the cat as it darts around! Tap it while sleeping for a sneak bonus, and find where it hides when it vanishes behind furniture.</p>
              <div className="goal-badge">
                <PixelTrophy size={14} color="#ffd166" />
                <span>10+ CATCHES IN 30s TO WIN</span>
              </div>
              <button className="primary-button" onClick={startGame} id="start-game-btn">
                START
              </button>
            </div>
          )}

          {/* THE CAT (Shown on floor when not in hiding) */}
          {playing && !isHiding && (
            <button
              className={`cat-button cat-status-${catState}`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${scaledCatSize}px`,
                height: `${scaledCatSize}px`,
              }}
              onPointerDown={handleCatch}
              onMouseEnter={handlePointerApproach}
              aria-label={catState === "sleep" ? "Catch sleeping cat" : "Catch the cat"}
              title={catState === "sleep" ? "Tap to catch sleeping cat!" : "Catch the cat"}
            >
              <PixelCat
                skin={selectedSkin}
                state={catState}
                facing={catFacing}
                size={scaledCatSize}
              />
            </button>
          )}

          {/* RESULT OVERLAY */}
          {finished && (
            <div className={`overlay result-overlay ${isVictory ? "victory-overlay" : "defeat-overlay"}`}>
              <div className="result-cat-frame">
                <PixelCat skin={selectedSkin} state={isVictory ? "caught" : "sleep"} size={80} facing="right" />
              </div>
              <h2>{isVictory ? "VICTORY!" : "THE CAT ESCAPED"}</h2>
              <div className="rank-badge" style={{ borderColor: rankInfo.color, color: rankInfo.color }}>
                {isVictory ? <PixelCrown size={16} color={rankInfo.color} /> : <PixelPaw size={14} color={rankInfo.color} />}
                <span>{rankInfo.title}</span>
              </div>
              <div className="result-stats">
                <div className="rs-item"><span>CATCHES</span><strong>{score}</strong></div>
                <div className="rs-item"><span>MISSES</span><strong>{misses}</strong></div>
                <div className="rs-item"><span>ACCURACY</span><strong>{accuracy}%</strong></div>
                <div className="rs-item"><span>BEST COMBO</span><strong>x{bestStreak}</strong></div>
              </div>
              <button className="primary-button" onClick={startGame} id="play-again-btn">
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Compact Message Bar */}
        <div className="message-bar" aria-live="polite">
          <p>{message}</p>
        </div>
      </section>
    </main>
  );
}