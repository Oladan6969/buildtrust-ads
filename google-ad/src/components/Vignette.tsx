import { AbsoluteFill } from "remotion";

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.5 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);
