import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Vignette } from "../components/Vignette";

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

const DOT_POSITIONS = [
  { x: 960, y: 450, color: "#4285F4", delay: 0 },
  { x: 960, y: 540, color: "#EA4335", delay: 4 },
  { x: 960, y: 540, color: "#FBBC05", delay: 8 },
  { x: 960, y: 450, color: "#34A853", delay: 12 },
];

const LETTERS = [
  { char: "G", color: "#4285F4" },
  { char: "o", color: "#EA4335" },
  { char: "o", color: "#FBBC05" },
  { char: "g", color: "#4285F4" },
  { char: "l", color: "#34A853" },
  { char: "e", color: "#EA4335" },
];

export const Scene1_Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const sceneOpacity = interpolate(frame, [0, 20, 160, 180], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Burst of light at start
  const burstScale = interpolate(frame, [0, 30], [0, 8], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });
  const burstOpacity = interpolate(frame, [0, 15, 60], [0.8, 0.4, 0], {
    extrapolateRight: "clamp",
  });

  // Logo reveal
  const logoProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200, stiffness: 30, mass: 1 },
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [80, 110], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Radial pulse rings
  const ring1 = interpolate(frame, [10, 80], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ring2 = interpolate(frame, [25, 95], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ring3 = interpolate(frame, [40, 110], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #08101f 0%, #000000 100%)",
        opacity: sceneOpacity,
      }}
    >
      {/* Burst flash */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 60%)",
          transform: `scale(${burstScale})`,
          opacity: burstOpacity,
          mixBlendMode: "screen",
        }}
      />

      {/* Pulse rings */}
      {[ring1, ring2, ring3].map((r, i) => (
        <AbsoluteFill key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: 300 + i * 120,
              height: 300 + i * 120,
              borderRadius: "50%",
              border: `1px solid ${GOOGLE_COLORS[i % 4]}`,
              opacity: (1 - r) * 0.4,
              transform: `scale(${0.4 + r * 1.4})`,
            }}
          />
        </AbsoluteFill>
      ))}

      {/* Google wordmark */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transform: `scale(${0.6 + logoProgress * 0.4})`,
            filter: `blur(${(1 - logoProgress) * 12}px)`,
          }}
        >
          {LETTERS.map((l, i) => {
            const letterProgress = interpolate(frame, [20 + i * 6, 50 + i * 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            return (
              <span
                key={i}
                style={{
                  fontFamily: "'Product Sans', 'Google Sans', sans-serif",
                  fontSize: 160,
                  fontWeight: 400,
                  color: l.color,
                  lineHeight: 1,
                  opacity: letterProgress,
                  transform: `translateY(${(1 - letterProgress) * 30}px)`,
                  display: "inline-block",
                  textShadow: `0 0 60px ${l.color}88, 0 0 120px ${l.color}44`,
                  letterSpacing: -4,
                }}
              >
                {l.char}
              </span>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Product Sans', 'Google Sans', sans-serif",
            fontSize: 28,
            fontWeight: 300,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            paddingLeft: "0.5em",
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Organized for the world
        </div>
      </AbsoluteFill>

      {/* Color streaks */}
      {GOOGLE_COLORS.map((color, i) => {
        const streakProgress = interpolate(frame, [8 + i * 5, 50 + i * 5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
        return (
          <AbsoluteFill key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                position: "absolute",
                width: streakProgress * 600,
                height: 2,
                background: `linear-gradient(90deg, ${color}, transparent)`,
                transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                transformOrigin: "left center",
                opacity: (1 - streakProgress) * 0.8 + 0.1,
                boxShadow: `0 0 12px ${color}`,
              }}
            />
          </AbsoluteFill>
        );
      })}

      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};
