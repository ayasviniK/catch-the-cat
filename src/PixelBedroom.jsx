import React, { useState, useEffect } from "react";
import { CAT_SKINS } from "./PixelCat";

/**
 * PixelBedroom Component recreating Image 2 with top-down 3/4 perspective:
 * - Lavender outer arcade bezel with wooden inner frame
 * - Cream wall with crown molding & dark wood baseboard
 * - Starry night windows (one with draped pink curtain)
 * - Pink cat-shaped wall clock with animated ticking hands
 * - Pastel wall art & wall sconce lamp
 * - Study desk with open laptop and wooden stool
 * - Cozy top-down bed with pink duvet, white pixel hearts, and pink pillow
 * - Two wooden nightstands with tablet, papers, and glowing lavender orb lamp
 * - Tall bookshelf with colorful books and skull knick-knack
 * - Horizontal wooden floorboards with staggered planks
 * - Smartphone on the floor & cute little friendly ghost with blue bow
 * - Interactive furniture hiding spots: curtain, desk, bed, bookshelf
 */
export default function PixelBedroom({
  onGhostClick,
  hidingSpot = null,
  isHiding = false,
  onSpotClick = null,
  catSkin = "midnight",
}) {
  const [clockTick, setClockTick] = useState(0);
  const [ghostWave, setGhostWave] = useState(0);
  const [peekWiggle, setPeekWiggle] = useState(0);

  const catColors = CAT_SKINS[catSkin] || CAT_SKINS.midnight;

  // Clock ticking & ghost idle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setClockTick((prev) => (prev + 1) % 4);
      setGhostWave((prev) => (prev === 0 ? 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clue wiggle animation during hiding
  useEffect(() => {
    if (!isHiding) return;
    const interval = setInterval(() => {
      setPeekWiggle((prev) => (prev === 0 ? 1 : 0));
    }, 360);
    return () => clearInterval(interval);
  }, [isHiding]);

  return (
    <div className="pixel-bedroom-container" aria-hidden="true">
      <svg
        viewBox="0 0 380 320"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        style={{
          display: "block",
          shapeRendering: "crispEdges",
          imageRendering: "pixelated",
          overflow: "hidden",
        }}
      >
        <defs>
          {/* Subtle warm glow from globe lamp */}
          <radialGradient id="orbGlow" cx="260" cy="115" r="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c5a8ff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#ff85a1" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1a0f26" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ================= 1. ROOM WALL (Y: 10 to 118) ================= */}
        {/* Wall background: warm off-white/cream */}
        <rect x="12" y="12" width="356" height="106" fill="#fcf6ee" />

        {/* Crown molding at top of wall */}
        <rect x="12" y="12" width="356" height="5" fill="#7a4d31" />
        <rect x="12" y="17" width="356" height="2" fill="#5c3822" />

        {/* Wall baseboard / molding at bottom of wall */}
        <rect x="12" y="112" width="356" height="6" fill="#7a4d31" />
        <rect x="12" y="116" width="356" height="2" fill="#54321d" />

        {/* Electrical outlet on far left wall */}
        <rect x="16" y="90" width="7" height="11" fill="#ded7ce" />
        <rect x="17" y="92" width="2" height="3" fill="#3a3028" />
        <rect x="20" y="92" width="2" height="3" fill="#3a3028" />
        <rect x="17" y="96" width="2" height="3" fill="#3a3028" />
        <rect x="20" y="96" width="2" height="3" fill="#3a3028" />

        {/* Left Wall Poster (Pastel / Pride flag) */}
        <g className="wall-poster">
          {/* Hanging string & nail */}
          <rect x="36" y="22" width="2" height="3" fill="#7a4d31" />
          <polygon points="37,25 28,30 46,30" fill="none" stroke="#ba9e89" strokeWidth="1" />
          {/* Poster body */}
          <rect x="27" y="30" width="20" height="23" fill="#5c3822" />
          <rect x="28" y="31" width="18" height="21" fill="#fff" />
          <rect x="28" y="31" width="18" height="7" fill="#ff70a6" />
          <rect x="28" y="38" width="18" height="7" fill="#c5a8ff" />
          <rect x="28" y="45" width="18" height="7" fill="#3a86ff" />
        </g>

        {/* Left Window (Starry Night) */}
        <g className="left-window">
          {/* Wood Frame */}
          <rect x="58" y="27" width="38" height="40" fill="#7a4d31" />
          <rect x="61" y="30" width="32" height="34" fill="#382952" />
          {/* Night Sky & Stars */}
          <rect x="67" y="36" width="2" height="2" fill="#ffd166" />
          <rect x="66" y="35" width="4" height="4" fill="#fff" opacity="0.6" />
          <rect x="83" y="35" width="2" height="2" fill="#ffffff" />
          <rect x="85" y="43" width="1" height="1" fill="#ffd166" />
          <rect x="80" y="52" width="3" height="3" fill="#ffffff" />
          <rect x="70" y="54" width="2" height="2" fill="#ffffff" />
          {/* Window pane cross dividers */}
          <rect x="76" y="30" width="2" height="34" fill="#7a4d31" />
          <rect x="61" y="46" width="32" height="2" fill="#7a4d31" />
        </g>

        {/* Wall Sconce Lamp below Left Window */}
        <g className="wall-sconce">
          <rect x="74" y="73" width="6" height="5" fill="#5c3822" />
          {/* Pink pleated shade */}
          <polygon points="70,90 84,90 80,78 74,78" fill="#f8a5c2" />
          <rect x="72" y="80" width="1" height="10" fill="#e07a9b" />
          <rect x="76" y="80" width="1" height="10" fill="#e07a9b" />
          <rect x="80" y="80" width="1" height="10" fill="#e07a9b" />
          {/* Warm bulb glow */}
          <rect x="75" y="90" width="4" height="2" fill="#ffd166" />
        </g>

        {/* Center Wall Clock: Pink Cat-Shaped Clock with Ticking Hands */}
        <g className="cat-clock">
          {/* Cat Ears on Clock */}
          <rect x="146" y="47" width="4" height="4" fill="#f8a5c2" />
          <rect x="147" y="46" width="2" height="2" fill="#f8a5c2" />
          <rect x="168" y="47" width="4" height="4" fill="#f8a5c2" />
          <rect x="169" y="46" width="2" height="2" fill="#f8a5c2" />
          {/* Clock Outer Rim */}
          <rect x="144" y="50" width="30" height="26" fill="#f8a5c2" />
          <rect x="143" y="52" width="32" height="22" fill="#f8a5c2" />
          {/* Clock Face (White) */}
          <rect x="147" y="53" width="24" height="20" fill="#ffffff" />
          {/* Clock numbers / marks */}
          <rect x="158" y="55" width="2" height="1" fill="#7a4d31" />
          <rect x="158" y="70" width="2" height="1" fill="#7a4d31" />
          <rect x="149" y="62" width="1" height="2" fill="#7a4d31" />
          <rect x="168" y="62" width="1" height="2" fill="#7a4d31" />
          {/* Center Pivot & Hands (Ticking!) */}
          <rect x="158" y="62" width="2" height="2" fill="#f8a5c2" />
          {clockTick % 2 === 0 ? (
            <>
              <rect x="158" y="57" width="2" height="6" fill="#5c3822" />
              <rect x="160" y="62" width="5" height="2" fill="#e07a9b" />
            </>
          ) : (
            <>
              <rect x="158" y="57" width="2" height="6" fill="#5c3822" />
              <rect x="154" y="62" width="5" height="2" fill="#e07a9b" />
            </>
          )}
        </g>

        {/* Right Window (with Pink Curtains) - Hiding Spot: 'curtain' */}
        <g
          className={`hiding-spot hiding-curtain ${isHiding ? "searchable-spot" : ""}`}
          onPointerDown={(e) => {
            if (isHiding && onSpotClick) {
              e.preventDefault();
              e.stopPropagation();
              onSpotClick("curtain", e);
            }
          }}
          style={{
            cursor: isHiding ? "pointer" : "default",
            pointerEvents: isHiding ? "all" : "none",
          }}
        >
          {/* Wood Frame */}
          <rect x="248" y="27" width="38" height="40" fill="#7a4d31" />
          <rect x="251" y="30" width="32" height="34" fill="#382952" />
          {/* Night Sky & Stars */}
          <rect x="256" y="35" width="2" height="2" fill="#ffffff" />
          <rect x="257" y="44" width="3" height="3" fill="#ffffff" />
          <rect x="261" y="54" width="2" height="2" fill="#ffd166" />
          {/* Pane divider */}
          <rect x="266" y="30" width="2" height="34" fill="#7a4d31" />
          <rect x="251" y="46" width="32" height="2" fill="#7a4d31" />
          {/* Draped Pink Curtain on right side */}
          <rect x="268" y="27" width="16" height="44" fill="#f8a5c2" />
          <rect x="268" y="70" width="4" height="4" fill="#f8a5c2" />
          <rect x="274" y="70" width="4" height="4" fill="#f8a5c2" />
          <rect x="280" y="70" width="4" height="4" fill="#f8a5c2" />
          {/* Curtain folds */}
          <rect x="272" y="30" width="1" height="38" fill="#e07a9b" />
          <rect x="278" y="30" width="1" height="38" fill="#e07a9b" />

          {/* Peeking cat clue behind curtain */}
          {isHiding && hidingSpot === "curtain" && (
            <g className="curtain-cat-peek" transform={`translate(${273 + (peekWiggle === 1 ? 1 : 0)}, 70)`}>
              {/* Cute peeking tail tip */}
              <rect x="0" y="0" width="4" height="4" fill={catColors.outline} />
              <rect x="1" y="1" width="2" height="3" fill={catColors.fur} />
              <rect x="1" y="3" width="3" height="4" fill={catColors.outline} />
              <rect x="2" y="4" width="2" height="3" fill={catColors.fur} />
            </g>
          )}

          {/* Invisible forgiving touch/click target for curtain */}
          {isHiding && (
            <rect x="246" y="24" width="46" height="56" fill="transparent" />
          )}
        </g>

        {/* ================= 2. WOODEN FLOOR (Y: 118 to 308) ================= */}
        {/* Floor base color */}
        <rect x="12" y="118" width="356" height="190" fill="#cba57e" />

        {/* Horizontal floorboard planks & joints */}
        {[136, 154, 172, 190, 208, 226, 244, 262, 280, 298].map((y) => (
          <g key={y}>
            {/* Plank boundary line */}
            <rect x="12" y={y} width="356" height="2" fill="#845e41" />
            <rect x="12" y={y + 2} width="356" height="1" fill="#e2c29d" opacity="0.6" />
          </g>
        ))}

        {/* Staggered vertical plank joints (Matching Image 2 floorboards) */}
        {/* Row 1 */}
        <rect x="68" y="118" width="2" height="18" fill="#845e41" />
        <rect x="175" y="118" width="2" height="18" fill="#845e41" />
        <rect x="275" y="118" width="2" height="18" fill="#845e41" />
        {/* Row 2 */}
        <rect x="120" y="138" width="2" height="16" fill="#845e41" />
        <rect x="235" y="138" width="2" height="16" fill="#845e41" />
        <rect x="330" y="138" width="2" height="16" fill="#845e41" />
        {/* Row 3 */}
        <rect x="45" y="156" width="2" height="16" fill="#845e41" />
        <rect x="155" y="156" width="2" height="16" fill="#845e41" />
        <rect x="290" y="156" width="2" height="16" fill="#845e41" />
        {/* Row 4 */}
        <rect x="95" y="174" width="2" height="16" fill="#845e41" />
        <rect x="205" y="174" width="2" height="16" fill="#845e41" />
        <rect x="335" y="174" width="2" height="16" fill="#845e41" />
        {/* Row 5 */}
        <rect x="55" y="192" width="2" height="16" fill="#845e41" />
        <rect x="165" y="192" width="2" height="16" fill="#845e41" />
        <rect x="265" y="192" width="2" height="16" fill="#845e41" />
        {/* Row 6 */}
        <rect x="110" y="210" width="2" height="16" fill="#845e41" />
        <rect x="225" y="210" width="2" height="16" fill="#845e41" />
        <rect x="325" y="210" width="2" height="16" fill="#845e41" />
        {/* Row 7 */}
        <rect x="40" y="228" width="2" height="16" fill="#845e41" />
        <rect x="145" y="228" width="2" height="16" fill="#845e41" />
        <rect x="280" y="228" width="2" height="16" fill="#845e41" />
        {/* Row 8 */}
        <rect x="85" y="246" width="2" height="16" fill="#845e41" />
        <rect x="195" y="246" width="2" height="16" fill="#845e41" />
        <rect x="315" y="246" width="2" height="16" fill="#845e41" />
        {/* Row 9 */}
        <rect x="50" y="264" width="2" height="16" fill="#845e41" />
        <rect x="160" y="264" width="2" height="16" fill="#845e41" />
        <rect x="270" y="264" width="2" height="16" fill="#845e41" />
        {/* Row 10 */}
        <rect x="105" y="282" width="2" height="16" fill="#845e41" />
        <rect x="220" y="282" width="2" height="16" fill="#845e41" />
        <rect x="330" y="282" width="2" height="16" fill="#845e41" />

        {/* ================= 3. FURNITURE (Top-down 3/4 layout) ================= */}

        {/* A. LEFT STUDY DESK & LAPTOP - Hiding Spot: 'desk' */}
        <g
          className={`hiding-spot hiding-desk ${isHiding ? "searchable-spot" : ""}`}
          onPointerDown={(e) => {
            if (isHiding && onSpotClick) {
              e.preventDefault();
              e.stopPropagation();
              onSpotClick("desk", e);
            }
          }}
          style={{
            cursor: isHiding ? "pointer" : "default",
            pointerEvents: isHiding ? "all" : "none",
          }}
        >
          {/* Desk shadow */}
          <rect x="22" y="152" width="46" height="5" fill="#886345" opacity="0.35" />
          {/* Desk top */}
          <rect x="20" y="125" width="48" height="24" fill="#a47a54" />
          <rect x="22" y="127" width="44" height="20" fill="#b98d64" />
          <rect x="20" y="147" width="48" height="4" fill="#7a5235" />
          {/* Desk Legs */}
          <rect x="23" y="149" width="4" height="12" fill="#7a5235" />
          <rect x="61" y="149" width="4" height="12" fill="#7a5235" />
          {/* Laptop open on desk */}
          <rect x="33" y="129" width="22" height="13" fill="#2d3142" />
          <rect x="35" y="131" width="18" height="9" fill="#4f5d75" />
          {/* Laptop keyboard base */}
          <rect x="30" y="141" width="28" height="4" fill="#9097a8" />
          <rect x="34" y="142" width="20" height="2" fill="#2d3142" />

          {/* Peeking cat clue under study desk */}
          {isHiding && hidingSpot === "desk" && (
            <g className="desk-cat-peek" transform={`translate(26, ${145 + (peekWiggle === 1 ? -1 : 0)})`}>
              {/* Ears */}
              <rect x="1" y="0" width="3" height="3" fill={catColors.outline} />
              <rect x="2" y="1" width="1" height="1" fill={catColors.earPink} />
              <rect x="8" y="0" width="3" height="3" fill={catColors.outline} />
              <rect x="9" y="1" width="1" height="1" fill={catColors.earPink} />
              {/* Head */}
              <rect x="0" y="2" width="12" height="5" fill={catColors.outline} />
              <rect x="1" y="2" width="10" height="4" fill={catColors.fur} />
              {/* Whiskers */}
              <rect x="-2" y="4" width="3" height="1" fill={catColors.outline} />
              <rect x="11" y="4" width="3" height="1" fill={catColors.outline} />
              {/* Eyes */}
              <rect x="2" y="3" width="2" height="2" fill={catColors.eye} />
              <rect x="3" y="4" width="1" height="1" fill={catColors.pupil} />
              <rect x="8" y="3" width="2" height="2" fill={catColors.eye} />
              <rect x="9" y="4" width="1" height="1" fill={catColors.pupil} />
            </g>
          )}

          {/* Little Wooden Stool in front of desk */}
          <g className="desk-stool">
            <rect x="33" y="156" width="22" height="16" fill="#a47a54" />
            <rect x="35" y="158" width="18" height="12" fill="#b98d64" />
            <rect x="33" y="170" width="22" height="3" fill="#7a5235" />
            <rect x="35" y="172" width="4" height="10" fill="#7a5235" />
            <rect x="49" y="172" width="4" height="10" fill="#7a5235" />
          </g>

          {/* Invisible forgiving touch/click target for desk */}
          {isHiding && (
            <rect x="18" y="122" width="56" height="62" fill="transparent" />
          )}
        </g>

        {/* B. NIGHTSTAND 1 (Left of Bed) */}
        <g className="nightstand-left">
          {/* Nightstand Shadow */}
          <rect x="76" y="157" width="50" height="4" fill="#886345" opacity="0.35" />
          {/* Body */}
          <rect x="76" y="123" width="50" height="34" fill="#8a6142" />
          <rect x="78" y="125" width="46" height="30" fill="#a47a54" />
          {/* Drawers */}
          <rect x="80" y="130" width="42" height="10" fill="#8a6142" />
          <rect x="81" y="131" width="40" height="8" fill="#b98d64" />
          <rect x="97" y="134" width="8" height="2" fill="#543823" />
          <rect x="80" y="143" width="42" height="10" fill="#8a6142" />
          <rect x="81" y="144" width="40" height="8" fill="#b98d64" />
          <rect x="97" y="147" width="8" height="2" fill="#543823" />
          {/* Pink Tablet / Diary on top */}
          <rect x="92" y="124" width="16" height="10" fill="#543823" />
          <rect x="93" y="125" width="14" height="8" fill="#f8a5c2" />
          <rect x="111" y="126" width="2" height="8" fill="#543823" />
        </g>

        {/* C. THE COZY CENTER BED (Top-down 3/4 perspective) - Hiding Spot: 'bed' */}
        <g
          className={`hiding-spot hiding-bed ${isHiding ? "searchable-spot" : ""}`}
          onPointerDown={(e) => {
            if (isHiding && onSpotClick) {
              e.preventDefault();
              e.stopPropagation();
              onSpotClick("bed", e);
            }
          }}
          style={{
            cursor: isHiding ? "pointer" : "default",
            pointerEvents: isHiding ? "all" : "none",
          }}
        >
          {/* Bed Base Shadow */}
          <rect x="136" y="210" width="68" height="8" fill="#6e4f35" opacity="0.4" />
          {/* White Mattress Frame */}
          <rect x="136" y="118" width="68" height="92" fill="#4d3524" />
          <rect x="138" y="120" width="64" height="88" fill="#fdfbf7" />

          {/* Headboard / Pillow */}
          <rect x="140" y="122" width="60" height="22" fill="#ede7dc" />
          {/* Pink Fluffy Pillow */}
          <rect x="150" y="125" width="40" height="16" fill="#f8a5c2" />
          <rect x="152" y="127" width="36" height="12" fill="#fcccd8" />

          {/* Cozy Pink Duvet Blanket with White Hearts */}
          <rect x="134" y="148" width="72" height="58" fill="#3a251a" />
          <rect x="135" y="149" width="70" height="56" fill="#f8a5c2" />
          {/* Blanket border fold */}
          <rect x="135" y="149" width="70" height="4" fill="#e07a9b" />

          {/* Pixel Hearts on Bed Spread (Matching Image 2!) */}
          {/* Heart 1 */}
          <g transform="translate(144, 160)">
            <rect x="2" y="0" width="2" height="1" fill="#fff" />
            <rect x="6" y="0" width="2" height="1" fill="#fff" />
            <rect x="1" y="1" width="8" height="2" fill="#fff" />
            <rect x="2" y="3" width="6" height="1" fill="#fff" />
            <rect x="3" y="4" width="4" height="1" fill="#fff" />
            <rect x="4" y="5" width="2" height="1" fill="#fff" />
          </g>
          {/* Heart 2 */}
          <g transform="translate(180, 160)">
            <rect x="2" y="0" width="2" height="1" fill="#fff" />
            <rect x="6" y="0" width="2" height="1" fill="#fff" />
            <rect x="1" y="1" width="8" height="2" fill="#fff" />
            <rect x="2" y="3" width="6" height="1" fill="#fff" />
            <rect x="3" y="4" width="4" height="1" fill="#fff" />
            <rect x="4" y="5" width="2" height="1" fill="#fff" />
          </g>
          {/* Heart 3 (Center) */}
          <g transform="translate(162, 178)">
            <rect x="2" y="0" width="2" height="1" fill="#fff" />
            <rect x="6" y="0" width="2" height="1" fill="#fff" />
            <rect x="1" y="1" width="8" height="2" fill="#fff" />
            <rect x="2" y="3" width="6" height="1" fill="#fff" />
            <rect x="3" y="4" width="4" height="1" fill="#fff" />
            <rect x="4" y="5" width="2" height="1" fill="#fff" />
          </g>
          {/* Heart 4 */}
          <g transform="translate(144, 192)">
            <rect x="2" y="0" width="2" height="1" fill="#fff" />
            <rect x="6" y="0" width="2" height="1" fill="#fff" />
            <rect x="1" y="1" width="8" height="2" fill="#fff" />
            <rect x="2" y="3" width="6" height="1" fill="#fff" />
            <rect x="3" y="4" width="4" height="1" fill="#fff" />
            <rect x="4" y="5" width="2" height="1" fill="#fff" />
          </g>
          {/* Heart 5 */}
          <g transform="translate(180, 192)">
            <rect x="2" y="0" width="2" height="1" fill="#fff" />
            <rect x="6" y="0" width="2" height="1" fill="#fff" />
            <rect x="1" y="1" width="8" height="2" fill="#fff" />
            <rect x="2" y="3" width="6" height="1" fill="#fff" />
            <rect x="3" y="4" width="4" height="1" fill="#fff" />
            <rect x="4" y="5" width="2" height="1" fill="#fff" />
          </g>

          {/* Cute resting character on bed from Image 2 */}
          <g className="bed-resting-cat" transform="translate(160, 136)">
            {/* Dark grey cat / friend */}
            <rect x="5" y="2" width="10" height="9" fill="#545258" />
            <rect x="4" y="0" width="3" height="3" fill="#545258" />
            <rect x="13" y="0" width="3" height="3" fill="#545258" />
            <rect x="5" y="1" width="1" height="1" fill="#f8a5c2" />
            <rect x="14" y="1" width="1" height="1" fill="#f8a5c2" />
            {/* Eyes */}
            <rect x="7" y="5" width="2" height="2" fill="#141414" />
            <rect x="11" y="5" width="2" height="2" fill="#141414" />
            {/* Cozy pajama shirt */}
            <rect x="4" y="11" width="12" height="13" fill="#c5a8ff" />
            <polygon points="4,11 16,11 18,24 2,24" fill="#c5a8ff" />
            {/* Paws */}
            <rect x="6" y="24" width="3" height="5" fill="#545258" />
            <rect x="11" y="24" width="3" height="5" fill="#545258" />
          </g>

          {/* Peeking cat clue under cozy bed */}
          {isHiding && hidingSpot === "bed" && (
            <g className="bed-cat-peek">
              {/* Cute little paws sticking out under duvet bottom */}
              <g transform="translate(156, 203)">
                <rect x="0" y="0" width="4" height="4" fill={catColors.outline} />
                <rect x="1" y="1" width="2" height="3" fill={catColors.fur} />
                <rect x="8" y="0" width="4" height="4" fill={catColors.outline} />
                <rect x="9" y="1" width="2" height="3" fill={catColors.fur} />
              </g>
              {/* Twitching tail sticking out the side of the bed */}
              <g transform={`translate(204, ${186 + (peekWiggle === 1 ? -2 : 0)})`}>
                <rect x="0" y="3" width="5" height="4" fill={catColors.outline} />
                <rect x="1" y="4" width="3" height="2" fill={catColors.fur} />
                <rect x="3" y="0" width="4" height="4" fill={catColors.outline} />
                <rect x="4" y="1" width="2" height="2" fill={catColors.fur} />
              </g>
            </g>
          )}

          {/* Invisible forgiving touch/click target for bed */}
          {isHiding && (
            <rect x="130" y="115" width="80" height="102" fill="transparent" />
          )}
        </g>

        {/* D. NIGHTSTAND 2 (Right of Bed with Glowing Purple Globe Lamp) */}
        <g className="nightstand-right">
          {/* Shadow */}
          <rect x="214" y="157" width="50" height="4" fill="#886345" opacity="0.35" />
          {/* Body */}
          <rect x="214" y="123" width="50" height="34" fill="#8a6142" />
          <rect x="216" y="125" width="46" height="30" fill="#a47a54" />
          {/* Drawers */}
          <rect x="218" y="130" width="42" height="10" fill="#8a6142" />
          <rect x="219" y="131" width="40" height="8" fill="#b98d64" />
          <rect x="235" y="134" width="8" height="2" fill="#543823" />
          <rect x="218" y="143" width="42" height="10" fill="#8a6142" />
          <rect x="219" y="144" width="40" height="8" fill="#b98d64" />
          <rect x="235" y="147" width="8" height="2" fill="#543823" />
          {/* Glowing Purple Orb Lamp on stand */}
          <g className="orb-lamp">
            <circle cx="245" cy="115" r="30" fill="url(#orbGlow)" />
            {/* Stand Base */}
            <rect x="240" y="121" width="10" height="3" fill="#3a3048" />
            <rect x="244" y="116" width="2" height="5" fill="#6d597a" />
            {/* Purple Glowing Globe */}
            <circle cx="245" cy="110" r="11" fill="#c5a8ff" />
            <circle cx="245" cy="110" r="9" fill="#e2d4fd" />
            <circle cx="243" cy="108" r="3" fill="#ffffff" />
          </g>
          {/* Notebook / Papers on stand */}
          <rect x="220" y="123" width="18" height="7" fill="#fdfbf7" />
          <rect x="220" y="124" width="18" height="2" fill="#c5a8ff" />
        </g>

        {/* E. TALL BOOKSHELF (Far Right Wall) - Hiding Spot: 'bookshelf' */}
        <g
          className={`hiding-spot hiding-bookshelf ${isHiding ? "searchable-spot" : ""}`}
          onPointerDown={(e) => {
            if (isHiding && onSpotClick) {
              e.preventDefault();
              e.stopPropagation();
              onSpotClick("bookshelf", e);
            }
          }}
          style={{
            cursor: isHiding ? "pointer" : "default",
            pointerEvents: isHiding ? "all" : "none",
          }}
        >
          {/* Bookshelf Shadow */}
          <rect x="278" y="157" width="52" height="5" fill="#886345" opacity="0.4" />
          {/* Main Wooden Cabinet */}
          <rect x="278" y="70" width="52" height="90" fill="#543823" />
          <rect x="280" y="72" width="48" height="86" fill="#8a6142" />

          {/* Shelf 1 (Top) */}
          <rect x="282" y="75" width="44" height="24" fill="#6d4c33" />
          {/* Cute skull knick-knack on top of bookshelf */}
          <g className="skull-decor" transform="translate(284, 62)">
            <rect x="2" y="0" width="14" height="12" fill="#fdfbf7" />
            <rect x="4" y="12" width="10" height="3" fill="#fdfbf7" />
            <rect x="5" y="4" width="3" height="4" fill="#3a251a" />
            <rect x="10" y="4" width="3" height="4" fill="#3a251a" />
            <rect x="6" y="13" width="1" height="2" fill="#3a251a" />
            <rect x="9" y="13" width="1" height="2" fill="#3a251a" />
            <rect x="11" y="13" width="1" height="2" fill="#3a251a" />
          </g>

          {/* Shelf 2 (Middle with Colorful Books) */}
          <rect x="282" y="102" width="44" height="20" fill="#6d4c33" />
          {/* Books on shelf */}
          <rect x="284" y="105" width="4" height="15" fill="#f72585" />
          <rect x="288" y="103" width="4" height="17" fill="#4cc9f0" />
          <rect x="292" y="106" width="3" height="14" fill="#ffd166" />
          <rect x="297" y="112" width="12" height="6" fill="#ffd166" />
          <rect x="298" y="108" width="10" height="4" fill="#ffffff" />

          {/* Shelf 3 (Lower shelf) */}
          <rect x="282" y="125" width="44" height="20" fill="#3a2318" />
          <rect x="318" y="128" width="4" height="15" fill="#c5a8ff" />

          {/* Peeking cat clue on bookshelf shelf */}
          {isHiding && hidingSpot === "bookshelf" ? (
            <g className="bookshelf-cat-peek" transform={`translate(286, 126)`}>
              {/* Ears */}
              <rect x="1" y={peekWiggle === 1 ? -1 : 0} width="3" height="3" fill={catColors.outline} />
              <rect x="2" y={peekWiggle === 1 ? 0 : 1} width="1" height="1" fill={catColors.earPink} />
              <rect x="8" y={peekWiggle === 1 ? -1 : 0} width="3" height="3" fill={catColors.outline} />
              <rect x="9" y={peekWiggle === 1 ? 0 : 1} width="1" height="1" fill={catColors.earPink} />
              {/* Head */}
              <rect x="0" y="2" width="12" height="6" fill={catColors.outline} />
              <rect x="1" y="2" width="10" height="5" fill={catColors.fur} />
              {/* Sparkling eyes */}
              <rect x="2" y="3" width="2" height="2" fill={catColors.eye} />
              <rect x="3" y="4" width="1" height="1" fill={catColors.pupil} />
              <rect x="8" y="3" width="2" height="2" fill={catColors.eye} />
              <rect x="9" y="4" width="1" height="1" fill={catColors.pupil} />
              {/* Whiskers */}
              <rect x="-2" y="4" width="2" height="1" fill={catColors.outline} />
              <rect x="12" y="4" width="2" height="1" fill={catColors.outline} />
              {/* Tail hanging down shelf edge */}
              <g transform={`translate(16, ${4 + (peekWiggle === 1 ? 1 : 0)})`}>
                <rect x="0" y="0" width="3" height="6" fill={catColors.outline} />
                <rect x="1" y="1" width="1" height="5" fill={catColors.fur} />
              </g>
            </g>
          ) : (
            <>
              {/* Normal decorative knickknack */}
              <rect x="286" y="132" width="8" height="10" fill="#90a0d9" />
              <rect x="298" y="130" width="10" height="12" fill="#ffd166" />
            </>
          )}

          {/* Bottom Drawer with Handle */}
          <rect x="282" y="147" width="44" height="12" fill="#a47a54" />
          <rect x="298" y="152" width="12" height="2" fill="#543823" />

          {/* Invisible forgiving touch/click target for bookshelf */}
          {isHiding && (
            <rect x="276" y="65" width="56" height="98" fill="transparent" />
          )}
        </g>

        {/* F. FLOOR ACCESSORIES: Smartphone & Cheering Ghost Buddy */}
        {/* Smartphone on the floor */}
        <g className="floor-phone" transform="translate(230, 218)">
          <rect x="0" y="0" width="11" height="18" fill="#2b2d42" />
          <rect x="1" y="1" width="9" height="16" fill="#90a0d9" />
          <rect x="4" y="14" width="3" height="2" fill="#ffffff" />
        </g>

        {/* Cheering Ghost Buddy with Blue Bow (from Image 2!) */}
        <g
          className="ghost-buddy"
          transform={`translate(268, ${180 + (ghostWave === 1 ? -3 : 0)})`}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onGhostClick) onGhostClick(e);
          }}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        >
          {/* Soft floor shadow */}
          <ellipse cx="16" cy="38" rx="14" ry="4" fill="#7a5238" opacity="0.3" />

          {/* Ghost Body (White with pixel outline) */}
          {/* Outline */}
          <rect x="6" y="8" width="20" height="24" fill="#4a3e3d" />
          <rect x="4" y="12" width="24" height="18" fill="#4a3e3d" />
          {/* Fill */}
          <rect x="7" y="9" width="18" height="22" fill="#ffffff" />
          <rect x="5" y="13" width="22" height="16" fill="#ffffff" />

          {/* Bottom ruffled sheet folds */}
          <rect x="5" y="30" width="4" height="4" fill="#ffffff" />
          <rect x="11" y="30" width="4" height="4" fill="#ffffff" />
          <rect x="17" y="30" width="4" height="4" fill="#ffffff" />
          <rect x="23" y="30" width="4" height="4" fill="#ffffff" />

          {/* Cute Little Arms (Waving!) */}
          <rect x="1" y={15 + ghostWave} width="4" height="6" fill="#4a3e3d" />
          <rect x="2" y={16 + ghostWave} width="3" height="4" fill="#ffffff" />

          <rect x="27" y={13 - ghostWave} width="4" height="7" fill="#4a3e3d" />
          <rect x="27" y={14 - ghostWave} width="3" height="5" fill="#ffffff" />

          {/* Cute Eyes (Happy / Curious) */}
          <rect x="11" y="16" width="2" height="4" fill="#4a3e3d" />
          <rect x="19" y="16" width="2" height="4" fill="#4a3e3d" />

          {/* Blue Ribbon Bow on head (Image 2!) */}
          <g className="ghost-bow" transform="translate(11, 4)">
            <rect x="3" y="2" width="4" height="4" fill="#48cae4" />
            <rect x="0" y="0" width="4" height="6" fill="#0077b6" />
            <rect x="6" y="0" width="4" height="6" fill="#0077b6" />
            <rect x="1" y="1" width="2" height="4" fill="#90e0ef" />
            <rect x="7" y="1" width="2" height="4" fill="#90e0ef" />
          </g>
        </g>

        {/* ================= 4. AESTHETIC RETRO ROOM BORDER ================= */}
        {/* Inner room dark border */}
        <rect x="10" y="10" width="360" height="300" fill="none" stroke="#5b3821" strokeWidth="4" />
        {/* Outer lavender pastel bezel */}
        <rect x="0" y="0" width="380" height="320" fill="none" stroke="#bca6e8" strokeWidth="10" rx="14" ry="14" />
      </svg>
    </div>
  );
}
