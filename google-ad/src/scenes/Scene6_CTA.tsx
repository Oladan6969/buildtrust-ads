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

export const Scene6_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 25, 210, 240], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoSpring = spring({ frame: frame - 8, fps, config: { damping: 18, stiffness: 200 } });
  const taglineSpring = spring({ frame: frame - 30, fps, config: { damping: 18, stiffness: 180 } });
  const ctaSpring = spring({ frame: frame - 50, fps, config: { damping: 18, stiffness: 180 } });
  const urlSpring = spring({ frame: frame - 65, fps, config: { damping: 18, stiffness: 180 } });

  const pulse = Math.sin(frame * 0.07) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #060b18 0%, #000 100%)",
        opacity: sceneOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Ambient color orbs */}
      {GOOGLE_COLORS.map((color, i) => {
        const angle = ((i / 4) * Math.PI * 2) + frame * 0.005;
        const radius = 420;
        const x = 960 + Math.cos(angle) * radius;
        const y = 540 + Math.sin(angle) * radius;
        return (
          <div key={i} style={{
            position: "absolute",
            left: x - 150,
            top: y - 150,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
            opacity: 0.5 + pulse * 0.2,
          }} />
        );
      })}

      {/* Google logo large */}
      <div style={{
        display: "flex",
        transform: `scale(${0.7 + logoSpring * 0.3})`,
        opacity: logoSpring,
        filter: `blur(${(1 - logoSpring) * 8}px)`,
        marginBottom: 32,
      }}>
        {[
          { char: "G", color: "#4285F4" },
          { char: "o", color: "#EA4335" },
          { char: "o", color: "#FBBC05" },
          { char: "g", color: "#4285F4" },
          { char: "l", color: "#34A853" },
          { char: "e", color: "#EA4335" },
        ].map((l, i) => (
          <span key={i} style={{
            fontSize: 140,
            fontWeight: 400,
            color: l.color,
            fontFamily: "sans-serif",
            lineHeight: 1,
            letterSpacing: -2,
            textShadow: `0 0 60px ${l.color}77`,
          }}>
            {l.char}
          </span>
        ))}
      </div>

      {/* Divider line */}
      <div style={{
        width: interpolate(frame, [20, 45], [0, 320], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        marginBottom: 32,
      }} />

      {/* Tagline */}
      <div style={{
        fontSize: 36,
        fontFamily: "sans-serif",
        fontWeight: 300,
        color: "rgba(255,255,255,0.65)",
        letterSpacing: "0.08em",
        transform: `translateY(${(1 - taglineSpring) * 20}px)`,
        opacity: taglineSpring,
        marginBottom: 48,
        textAlign: "center",
      }}>
        Organized for the world
      </div>

      {/* CTA Button */}
      <div style={{
        padding: "20px 64px",
        background: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
        borderRadius: 50,
        transform: `scale(${0.85 + ctaSpring * 0.15}) translateY(${(1 - ctaSpring) * 20}px)`,
        opacity: ctaSpring,
        boxShadow: `0 0 ${40 + pulse * 20}px rgba(66,133,244,0.5), 0 8px 40px rgba(0,0,0,0.4)`,
        marginBottom: 28,
      }}>
        <span style={{
          fontSize: 24,
          fontFamily: "sans-serif",
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "0.06em",
        }}>
          Try Google Gemini
        </span>
      </div>

      {/* URL */}
      <div style={{
        fontSize: 18,
        fontFamily: "monospace",
        color: "rgba(255,255,255,0.35)",
        letterSpacing: "0.15em",
        transform: `translateY(${(1 - urlSpring) * 15}px)`,
        opacity: urlSpring,
      }}>
        gemini.google.com
      </div>

      <Vignette strength={0.6} />
    </AbsoluteFill>
  );
};
