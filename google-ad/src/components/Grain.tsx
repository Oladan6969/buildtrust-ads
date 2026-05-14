import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => {
  const frame = useCurrentFrame();
  const seed = frame % 60;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 9999, opacity, mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
