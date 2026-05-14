import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Vignette } from "../components/Vignette";

const CAPABILITIES = [
  { text: "Understand context", color: "#4285F4" },
  { text: "Generate images", color: "#EA4335" },
  { text: "Write & code", color: "#FBBC05" },
  { text: "Reason & plan", color: "#34A853" },
];

export const Scene3_Gemini: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 20, 340, 360], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gemini logo build
  const logoSpring = spring({ frame: frame - 15, fps, config: { damping: 80, stiffness: 18 } });

  // Gradient wave animation
  const waveOffset = frame * 2;

  // Neural network nodes
  const nodeReveal = interpolate(frame, [30, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Capabilities
  const cap1 = spring({ frame: frame - 80, fps, config: { damping: 80, stiffness: 15 } });
  const cap2 = spring({ frame: frame - 110, fps, config: { damping: 80, stiffness: 15 } });
  const cap3 = spring({ frame: frame - 140, fps, config: { damping: 80, stiffness: 15 } });
  const cap4 = spring({ frame: frame - 170, fps, config: { damping: 80, stiffness: 15 } });
  const caps = [cap1, cap2, cap3, cap4];

  // Pulse
  const pulse = Math.sin(frame * 0.08) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        background: "#000",
        opacity: sceneOpacity,
      }}
    >
      {/* Multicolor gradient background */}
      <AbsoluteFill>
        <svg width="1920" height="1080" style={{ position: "absolute" }}>
          <defs>
            <radialGradient id="g1" cx="30%" cy="40%">
              <stop offset="0%" stopColor="#4285F4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2" cx="70%" cy="60%">
              <stop offset="0%" stopColor="#EA4335" stopOpacity="0.25" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3" cx="50%" cy="20%">
              <stop offset="0%" stopColor="#FBBC05" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g4" cx="50%" cy="80%">
              <stop offset="0%" stopColor="#34A853" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#g1)" />
          <rect width="1920" height="1080" fill="url(#g2)" />
          <rect width="1920" height="1080" fill="url(#g3)" />
          <rect width="1920" height="1080" fill="url(#g4)" />
        </svg>
      </AbsoluteFill>

      {/* Neural network lines */}
      <AbsoluteFill style={{ opacity: nodeReveal * 0.4 }}>
        <svg width="1920" height="1080">
          {Array.from({ length: 16 }).map((_, i) => {
            const x1 = 200 + (i % 4) * 380;
            const y1 = 200 + Math.floor(i / 4) * 220;
            const x2 = 200 + ((i + 1) % 4) * 380;
            const y2 = 200 + Math.floor((i + 1) / 4) * 220;
            const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={colors[i % 4]} strokeWidth={1} strokeOpacity={0.5}
                strokeDasharray="8 4"
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>

        {/* Gemini star icon */}
        <div style={{
          marginBottom: 32,
          transform: `scale(${0.5 + logoSpring * 0.5})`,
          opacity: logoSpring,
        }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="33%" stopColor="#EA4335" />
                <stop offset="66%" stopColor="#FBBC05" />
                <stop offset="100%" stopColor="#34A853" />
              </linearGradient>
            </defs>
            {/* 4-pointed star */}
            <path
              d="M60 5 C60 5 65 55 115 60 C65 65 60 115 60 115 C60 115 55 65 5 60 C55 55 60 5 60 5Z"
              fill="url(#gemGrad)"
              style={{ filter: `drop-shadow(0 0 ${20 + pulse * 15}px rgba(66,133,244,0.8))` }}
            />
          </svg>
        </div>

        {/* Gemini wordmark */}
        <div style={{
          fontFamily: "sans-serif",
          fontSize: 96,
          fontWeight: 300,
          letterSpacing: "0.12em",
          paddingLeft: "0.12em",
          transform: `scale(${0.7 + logoSpring * 0.3}) translateY(${(1 - logoSpring) * 20}px)`,
          opacity: logoSpring,
          filter: `blur(${(1 - logoSpring) * 8}px)`,
          background: "linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Gemini
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 22,
          color: "rgba(255,255,255,0.55)",
          fontFamily: "sans-serif",
          fontWeight: 300,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          paddingLeft: "0.35em",
          marginTop: 16,
          opacity: logoSpring,
          marginBottom: 64,
        }}>
          Google's most capable AI
        </div>

        {/* Divider */}
        <div style={{
          width: interpolate(frame, [60, 110], [0, 400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          marginBottom: 40,
        }} />

        {/* Capabilities grid */}
        <div style={{ display: "flex", gap: 24 }}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={i}
              style={{
                padding: "16px 32px",
                background: `${cap.color}18`,
                border: `1px solid ${cap.color}55`,
                borderRadius: 40,
                transform: `translateY(${(1 - caps[i]) * 30}px)`,
                opacity: caps[i],
                boxShadow: `0 0 30px ${cap.color}33`,
              }}
            >
              <span style={{
                fontSize: 18,
                color: cap.color,
                fontFamily: "sans-serif",
                fontWeight: 400,
                letterSpacing: "0.04em",
              }}>
                {cap.text}
              </span>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};
