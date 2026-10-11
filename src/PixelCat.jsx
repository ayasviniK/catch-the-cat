import React, { useState, useEffect } from "react";

/**
 * PixelCat Component faithfully recreating the iStock Pixel Cat design (Image 1):
 * - Chunky black pixel outline
 * - Cute triangular ears with pink inner pads
 * - Distinct 2-pixel whiskers protruding on each side
 * - Expressive 2-pixel eyes with shine
 * - Upward curving tail
 * - Soft ground shadow
 * - Support for 4 cute cat skins: 'midnight', 'white', 'tabby', 'orange'
 * - States: 'sit' (idle), 'walk' (moving paws), 'sleep' (cozy loaf), 'caught' (surprised jump)
 */

export const CAT_SKINS = {
  midnight: {
    id: "midnight",
    name: "Midnight",
    label: "Midnight Black",
    fur: "#2e2b32",
    furShade: "#222026",
    belly: null,
    stripes: null,
    eye: "#ffb703",
    pupil: "#141414",
    earPink: "#f8a5c2",
    outline: "#141216",
    shadow: "rgba(90, 70, 60, 0.28)",
  },
  white: {
    id: "white",
    name: "Snowball",
    label: "Pure White",
    fur: "#ffffff",
    furShade: "#e6e6ee",
    belly: null,
    stripes: null,
    eye: "#38bdf8",
    pupil: "#0c4a6e",
    earPink: "#f8a5c2",
    outline: "#141216",
    shadow: "rgba(90, 70, 60, 0.28)",
  },
  tabby: {
    id: "tabby",
    name: "Smokey",
    label: "Grey Tabby",
    fur: "#9aa0a6",
    furShade: "#7f858c",
    belly: "#f8a5c2",
    stripes: "#5f6368",
    eye: "#ffffff",
    pupil: "#202124",
    earPink: "#f8a5c2",
    outline: "#141216",
    shadow: "rgba(90, 70, 60, 0.28)",
  },
  orange: {
    id: "orange",
    name: "Marmalade",
    label: "Ginger Tabby",
    fur: "#d97736",
    furShade: "#bd6124",
    belly: "#fde2cc",
    stripes: "#9f4a13",
    eye: "#201c18",
    pupil: "#141216",
    earPink: "#fca5a5",
    outline: "#141216",
    shadow: "rgba(90, 70, 60, 0.28)",
  },
};

export default function PixelCat({
  skin = "midnight",
  state = "walk", // 'sit' | 'walk' | 'sleep' | 'caught'
  facing = "right", // 'left' | 'right'
  size = 72,
}) {
  const [animStep, setAnimStep] = useState(0);
  const [blinking, setBlinking] = useState(false);

  // Walk & tail sway animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 4);
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Occasional cute blink when sitting
  useEffect(() => {
    if (state !== "sit" && state !== "walk") return;
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 3200);
    return () => clearInterval(blinkInterval);
  }, [state]);

  const palette = CAT_SKINS[skin] || CAT_SKINS.midnight;
  const isFlipped = facing === "left";

  // Grid constants (22 cols x 20 rows)
  const P = 1; // 1 pixel unit
  const o = palette.outline;
  const f = palette.fur;
  const fs = palette.furShade;
  const ep = palette.earPink;
  const eye = palette.eye;
  const pup = palette.pupil;
  const bel = palette.belly;
  const str = palette.stripes;

  // Tail bob offset during walk
  const tailDy = state === "walk" && (animStep === 1 || animStep === 3) ? -1 : 0;
  // Paw step offset
  const pawOffset = state === "walk" ? (animStep % 2 === 0 ? 1 : -1) : 0;

  return (
    <div
      className={`cute-pixel-cat cat-state-${state}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        userSelect: "none",
        WebkitUserSelect: "none",
        pointerEvents: "none",
      }}
    >
      {/* Floating Zzz when sleeping */}
      {state === "sleep" && (
        <div className="cat-zzz-float" aria-hidden="true">
          <span className="z-char z-1">z</span>
          <span className="z-char z-2">Z</span>
        </div>
      )}

      {/* Heart burst when caught */}
      {state === "caught" && (
        <div className="cat-caught-hearts" aria-hidden="true">
          <span className="mini-heart h-1">♥</span>
          <span className="mini-heart h-2">✦</span>
          <span className="mini-heart h-3">♥</span>
        </div>
      )}

      <svg
        viewBox="0 0 24 22"
        width="100%"
        height="100%"
        style={{
          transform: isFlipped ? "scaleX(-1)" : "none",
          transformOrigin: "center center",
          transition: "transform 0.12s ease",
          shapeRendering: "crispEdges",
          imageRendering: "pixelated",
          overflow: "visible",
        }}
      >
        {/* ================= SOFT GROUND SHADOW ================= */}
        <ellipse
          cx="10"
          cy="19"
          rx="7.5"
          ry="2"
          fill={palette.shadow}
        />

        {/* ================= SLEEPING STATE ================= */}
        {state === "sleep" ? (
          <g className="cat-sleep-graphics">
            {/* Curled loaf outline */}
            <rect x="4" y="9" width="13" height="9" fill={o} />
            <rect x="3" y="10" width="15" height="7" fill={o} />
            <rect x="5" y="8" width="11" height="2" fill={o} />

            {/* Curled fur body */}
            <rect x="5" y="10" width="11" height="7" fill={f} />
            <rect x="4" y="11" width="13" height="5" fill={f} />
            <rect x="6" y="9" width="9" height="2" fill={f} />

            {/* Belly patch if ginger/tabby */}
            {bel && <rect x="7" y="13" width="5" height="3" fill={bel} />}
            {str && (
              <>
                <rect x="9" y="9" width="1" height="3" fill={str} />
                <rect x="12" y="10" width="1" height="3" fill={str} />
              </>
            )}

            {/* Resting ears */}
            <rect x="5" y="7" width="3" height="2" fill={o} />
            <rect x="6" y="8" width="1" height="1" fill={ep} />
            <rect x="13" y="7" width="3" height="2" fill={o} />
            <rect x="14" y="8" width="1" height="1" fill={ep} />

            {/* Closed sleeping eyes ^ . ^ */}
            <rect x="6" y="12" width="2" height="1" fill={o} />
            <rect x="10" y="12" width="2" height="1" fill={o} />

            {/* Little pink nose */}
            <rect x="8" y="13" width="2" height="1" fill={ep} />

            {/* Whiskers */}
            <rect x="2" y="12" width="2" height="1" fill={o} />
            <rect x="13" y="12" width="2" height="1" fill={o} />

            {/* Curled tail on the right */}
            <rect x="16" y="11" width="3" height="4" fill={o} />
            <rect x="17" y="12" width="1" height="3" fill={fs} />
          </g>
        ) : (
          /* ================= ACTIVE / SITTING / WALKING / CAUGHT ================= */
          <g className="cat-active-graphics" transform={state === "caught" ? "translate(0, -2)" : "translate(0, 0)"}>
            {/* 1. TAIL (Curving upward just like Image 1!) */}
            <g className="cat-tail" transform={`translate(0, ${tailDy})`}>
              {/* Tail Black Outline */}
              <rect x="10" y="13" width="4" height="4" fill={o} />
              <rect x="13" y="11" width="3" height="4" fill={o} />
              <rect x="15" y="9" width="3" height="4" fill={o} />
              <rect x="17" y="8" width="4" height="4" fill={o} />

              {/* Tail Fur Fill */}
              <rect x="11" y="14" width="2" height="2" fill={f} />
              <rect x="13" y="12" width="2" height="2" fill={f} />
              <rect x="15" y="10" width="2" height="2" fill={f} />
              <rect x="17" y="9" width="3" height="2" fill={f} />
              {/* Tail tip highlight / stripes */}
              {str && <rect x="16" y="10" width="1" height="2" fill={str} />}
            </g>

            {/* 2. BODY OUTLINE & FILL (Chunky, cute posture) */}
            {/* Body Outline */}
            <rect x="5" y="10" width="8" height="8" fill={o} />
            <rect x="4" y="11" width="10" height="6" fill={o} />
            <rect x="5" y="17" width="8" height="2" fill={o} />

            {/* Body Fill */}
            <rect x="5" y="11" width="8" height="6" fill={f} />
            <rect x="6" y="10" width="6" height="7" fill={f} />

            {/* Belly Patch (For ginger & tabby) */}
            {bel && (
              <g className="cat-belly">
                <rect x="5" y="13" width="3" height="4" fill={bel} />
                <rect x="6" y="12" width="2" height="1" fill={bel} />
              </g>
            )}

            {/* Body Tabby Stripes */}
            {str && (
              <g className="cat-stripes">
                <rect x="8" y="11" width="1" height="5" fill={str} />
                <rect x="10" y="12" width="1" height="4" fill={str} />
              </g>
            )}

            {/* Paws */}
            {state === "walk" ? (
              // Alternating animated walking paws
              <g className="cat-walking-paws">
                <rect x="5" y={16 + pawOffset} width="2" height="2" fill={f} />
                <rect x="8" y={16 - pawOffset} width="2" height="2" fill={f} />
                <rect x="5" y={17 + pawOffset} width="2" height="1" fill={o} />
                <rect x="8" y={17 - pawOffset} width="2" height="1" fill={o} />
              </g>
            ) : (
              // Solid sitting paws with toes
              <g className="cat-sitting-paws">
                <rect x="5" y="16" width="2" height="1" fill={fs} />
                <rect x="8" y="16" width="2" height="1" fill={fs} />
              </g>
            )}

            {/* 3. HEAD OUTLINE & FILL (Large square with rounded corners) */}
            {/* Head Outline */}
            <rect x="3" y="3" width="11" height="8" fill={o} />
            <rect x="2" y="4" width="13" height="6" fill={o} />

            {/* Head Fill */}
            <rect x="3" y="4" width="11" height="6" fill={f} />
            <rect x="4" y="3" width="9" height="7" fill={f} />

            {/* Head Stripes if tabby/orange */}
            {str && (
              <g className="head-stripes">
                <rect x="8" y="3" width="1" height="3" fill={str} />
                <rect x="6" y="3" width="1" height="2" fill={str} />
                <rect x="10" y="3" width="1" height="2" fill={str} />
              </g>
            )}

            {/* 4. EARS (Triangular, exactly like Image 1) */}
            {/* Left Ear */}
            <rect x="3" y="1" width="3" height="3" fill={o} />
            <rect x="4" y="0" width="2" height="2" fill={o} />
            <rect x="4" y="2" width="2" height="2" fill={ep} />

            {/* Right Ear */}
            <rect x="11" y="1" width="3" height="3" fill={o} />
            <rect x="11" y="0" width="2" height="2" fill={o} />
            <rect x="11" y="2" width="2" height="2" fill={ep} />

            {/* 5. WHISKERS (2 horizontal 2-pixel bars on each side) */}
            {/* Left Whiskers */}
            <rect x="0" y="5" width="3" height="1" fill={o} />
            <rect x="0" y="7" width="3" height="1" fill={o} />

            {/* Right Whiskers */}
            <rect x="14" y="5" width="3" height="1" fill={o} />
            <rect x="14" y="7" width="3" height="1" fill={o} />

            {/* 6. EYES (Exact iStock 2-pixel wide eyes) */}
            {blinking ? (
              // Cute blinking line
              <g className="cat-eyes-blinking">
                <rect x="5" y="6" width="2" height="1" fill={o} />
                <rect x="10" y="6" width="2" height="1" fill={o} />
              </g>
            ) : state === "caught" ? (
              // Big surprised sparkling eyes O_O
              <g className="cat-eyes-caught">
                <rect x="4" y="5" width="3" height="3" fill={eye} />
                <rect x="5" y="6" width="1" height="1" fill={pup} />
                <rect x="4" y="5" width="1" height="1" fill="#fff" />

                <rect x="10" y="5" width="3" height="3" fill={eye} />
                <rect x="11" y="6" width="1" height="1" fill={pup} />
                <rect x="10" y="5" width="1" height="1" fill="#fff" />
              </g>
            ) : (
              // Normal cute eyes from Image 1
              <g className="cat-eyes-normal">
                {/* Left Eye */}
                <rect x="5" y="5" width="2" height="2" fill={eye} />
                <rect x="6" y="6" width="1" height="1" fill={pup} />

                {/* Right Eye */}
                <rect x="10" y="5" width="2" height="2" fill={eye} />
                <rect x="11" y="6" width="1" height="1" fill={pup} />
              </g>
            )}

            {/* 7. TINY NOSE */}
            <rect x="8" y="7" width="1" height="1" fill={ep} />
          </g>
        )}
      </svg>
    </div>
  );
}
