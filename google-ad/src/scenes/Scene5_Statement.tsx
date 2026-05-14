import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Vignette } from "../components/Vignette";

const STATEMENTS = [
  { text: "Search", accent: "Everything.", color: "#4285F4", frames: [0, 100] },
  { text: "Discover", accent: "Anything.", color: "#EA4335", frames: [100, 200] },
  { text: "Create", accent: "the Future.", color: "#34A853", frames: [200, 360] },
];

export const Scene5_Statement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 20, 340, 360], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#000",
        opacity: sceneOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {STATEMENTS.map((stmt, i) => {
        const [start, end] = stmt.frames;
        const active = frame >= start && frame < end;
        const localFrame = frame - start;
        const localDuration = end - start;

        const wordOpacity = interpolate(
          localFrame,
          [0, 15, localDuration - 20, localDuration],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const wordY = interpolate(localFrame, [0, 20], [40, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        const accentY = interpolate(localFrame, [12, 32], [40, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        // Color burst
        const burstScale = interpolate(localFrame, [0, 60], [0, 20], {
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.exp),
        });
        const burstOpacity = interpolate(localFrame, [0, 20, 80], [0.5, 0.2, 0], {
          extrapolateRight: "clamp",
        });

        // Particle dots
        const particleReveal = interpolate(localFrame, [10, 50], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        if (!active && frame >= end) return null;
        if (!active && frame < start) return null;

        return (
          <AbsoluteFill key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Color burst */}
            <div style={{
              position: "absolute",
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${stmt.color} 0%, transparent 70%)`,
              transform: `scale(${burstScale})`,
              opacity: burstOpacity,
              mixBlendMode: "screen",
            }} />

            {/* Particles */}
            {Array.from({ length: 12 }).map((_, pi) => {
              const angle = (pi / 12) * Math.PI * 2;
              const dist = 200 + pi * 30;
              const px = Math.cos(angle) * dist * particleReveal;
              const py = Math.sin(angle) * dist * particleReveal;
              return (
                <div key={pi} style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: stmt.color,
                  transform: `translate(${px}px, ${py}px)`,
                  opacity: particleReveal * (1 - particleReveal * 0.5) * 0.8,
                  boxShadow: `0 0 12px ${stmt.color}`,
                }} />
              );
            })}

            {/* Text */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 120,
                fontFamily: "sans-serif",
                fontWeight: 200,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                textShadow: "0 0 80px rgba(255,255,255,0.1)",
              }}>
                {stmt.text}
              </div>
              <div style={{
                fontSize: 120,
                fontFamily: "sans-serif",
                fontWeight: 700,
                color: stmt.color,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                opacity: wordOpacity,
                transform: `translateY(${accentY}px)`,
                textShadow: `0 0 80px ${stmt.color}66`,
                marginTop: 8,
              }}>
                {stmt.accent}
              </div>

              {/* Underline */}
              <div style={{
                height: 3,
                background: stmt.color,
                width: interpolate(localFrame, [20, 60], [0, 500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                margin: "24px auto 0",
                borderRadius: 2,
                boxShadow: `0 0 20px ${stmt.color}`,
                opacity: wordOpacity,
              }} />
            </div>
          </AbsoluteFill>
        );
      })}

      <Vignette strength={0.7} />
    </AbsoluteFill>
  );
};
