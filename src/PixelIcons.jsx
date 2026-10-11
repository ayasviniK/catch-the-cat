import React from "react";

// Crisp pixel-art SVG icons (no standard emojis)
export function PixelHeart({ size = 20, color = "#ff5fa2" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ shapeRendering: "crispEdges", verticalAlign: "middle" }}
    >
      <rect x="2" y="2" width="4" height="2" fill={color} />
      <rect x="10" y="2" width="4" height="2" fill={color} />
      <rect x="0" y="4" width="8" height="4" fill={color} />
      <rect x="8" y="4" width="8" height="4" fill={color} />
      <rect x="2" y="8" width="12" height="2" fill={color} />
      <rect x="4" y="10" width="8" height="2" fill={color} />
      <rect x="6" y="12" width="4" height="2" fill={color} />
      {/* Highlight */}
      <rect x="2" y="4" width="2" height="2" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export function PixelTrophy({ size = 28, color = "#ffd166" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ shapeRendering: "crispEdges", verticalAlign: "middle" }}
    >
      {/* Cup top */}
      <rect x="3" y="1" width="10" height="2" fill="#ffb703" />
      <rect x="4" y="3" width="8" height="4" fill={color} />
      <rect x="5" y="7" width="6" height="2" fill={color} />
      <rect x="6" y="9" width="4" height="1" fill="#ffb703" />
      {/* Stem */}
      <rect x="7" y="10" width="2" height="3" fill="#fb8500" />
      {/* Base */}
      <rect x="5" y="13" width="6" height="2" fill="#ffb703" />
      <rect x="4" y="14" width="8" height="1" fill="#fb8500" />
      {/* Handles */}
      <rect x="2" y="3" width="2" height="1" fill="#fb8500" />
      <rect x="1" y="4" width="2" height="2" fill="#fb8500" />
      <rect x="2" y="6" width="2" height="1" fill="#fb8500" />
      <rect x="12" y="3" width="2" height="1" fill="#fb8500" />
      <rect x="13" y="4" width="2" height="2" fill="#fb8500" />
      <rect x="12" y="6" width="2" height="1" fill="#fb8500" />
      {/* Star/glint */}
      <rect x="7" y="4" width="2" height="2" fill="#fff" />
    </svg>
  );
}

export function PixelClock({ size = 20, color = "#c5a8ff" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ shapeRendering: "crispEdges", verticalAlign: "middle" }}
    >
      <rect x="5" y="1" width="6" height="1" fill={color} />
      <rect x="3" y="2" width="10" height="1" fill={color} />
      <rect x="2" y="3" width="12" height="10" fill={color} />
      <rect x="3" y="13" width="10" height="1" fill={color} />
      <rect x="5" y="14" width="6" height="1" fill={color} />
      {/* Clock Face Inner */}
      <rect x="4" y="4" width="8" height="8" fill="#1b1226" />
      {/* Hands */}
      <rect x="7" y="5" width="2" height="4" fill="#ffd5e8" />
      <rect x="8" y="7" width="3" height="2" fill="#ffd5e8" />
    </svg>
  );
}

export function PixelPaw({ size = 20, color = "#ff8fbd" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ shapeRendering: "crispEdges", verticalAlign: "middle" }}
    >
      {/* Main pad */}
      <rect x="5" y="8" width="6" height="5" fill={color} />
      <rect x="4" y="9" width="8" height="3" fill={color} />
      {/* Toes */}
      <rect x="2" y="5" width="2" height="3" fill={color} />
      <rect x="5" y="3" width="2" height="3" fill={color} />
      <rect x="9" y="3" width="2" height="3" fill={color} />
      <rect x="12" y="5" width="2" height="3" fill={color} />
    </svg>
  );
}

export function PixelStar({ size = 18, color = "#ffd166" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ shapeRendering: "crispEdges", verticalAlign: "middle" }}
    >
      <rect x="7" y="1" width="2" height="14" fill={color} />
      <rect x="1" y="7" width="14" height="2" fill={color} />
      <rect x="5" y="5" width="6" height="6" fill={color} />
      <rect x="6" y="4" width="4" height="8" fill={color} />
      <rect x="4" y="6" width="8" height="4" fill={color} />
      <rect x="7" y="7" width="2" height="2" fill="#fff" />
    </svg>
  );
}

export function PixelCrown({ size = 24, color = "#ffd166" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ shapeRendering: "crispEdges", verticalAlign: "middle" }}
    >
      {/* Crown base */}
      <rect x="2" y="11" width="12" height="2" fill="#fb8500" />
      <rect x="3" y="10" width="10" height="1" fill={color} />
      {/* Spikes */}
      <rect x="2" y="5" width="2" height="5" fill={color} />
      <rect x="7" y="3" width="2" height="7" fill={color} />
      <rect x="12" y="5" width="2" height="5" fill={color} />
      <rect x="4" y="7" width="3" height="3" fill={color} />
      <rect x="9" y="7" width="3" height="3" fill={color} />
      {/* Jewels */}
      <rect x="2" y="4" width="2" height="1" fill="#ff5fa2" />
      <rect x="7" y="2" width="2" height="1" fill="#48cae4" />
      <rect x="12" y="4" width="2" height="1" fill="#ff5fa2" />
    </svg>
  );
}

export function PixelSound({ muted = false, size = 20, color = "#ffd5e8" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ shapeRendering: "crispEdges", verticalAlign: "middle" }}
    >
      {/* Speaker base */}
      <rect x="2" y="6" width="3" height="4" fill={color} />
      <rect x="5" y="4" width="2" height="8" fill={color} />
      <rect x="7" y="2" width="2" height="12" fill={color} />
      {muted ? (
        // X mark
        <>
          <rect x="11" y="5" width="2" height="2" fill="#ff5fa2" />
          <rect x="13" y="7" width="2" height="2" fill="#ff5fa2" />
          <rect x="11" y="9" width="2" height="2" fill="#ff5fa2" />
          <rect x="13" y="5" width="2" height="2" fill="#ff5fa2" />
          <rect x="11" y="7" width="2" height="2" fill="#ff5fa2" />
        </>
      ) : (
        // Sound waves
        <>
          <rect x="10" y="5" width="1" height="6" fill={color} />
          <rect x="12" y="3" width="1" height="10" fill={color} />
          <rect x="14" y="1" width="1" height="14" fill={color} />
        </>
      )}
    </svg>
  );
}
