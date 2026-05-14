import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Vignette } from "../components/Vignette";

const QUERY = "How far is the moon?";
const RESULTS = [
  { title: "Distance to the Moon — 384,400 km", source: "NASA · Space Science" },
  { title: "Moon Distance Calculator — Real-Time", source: "timeanddate.com" },
  { title: "Why the Moon's Distance Changes", source: "National Geographic" },
];

export const Scene2_Search: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 20, 280, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Search bar entrance — snappy
  const barSpring = spring({ frame: frame - 5, fps, config: { damping: 18, stiffness: 200 } });

  // Typing animation — faster
  const charsVisible = Math.floor(
    interpolate(frame, [15, 55], [0, QUERY.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    })
  );

  // Results cascade — snappy, tighter delays
  const result1 = spring({ frame: frame - 65, fps, config: { damping: 18, stiffness: 180 } });
  const result2 = spring({ frame: frame - 78, fps, config: { damping: 18, stiffness: 180 } });
  const result3 = spring({ frame: frame - 91, fps, config: { damping: 18, stiffness: 180 } });
  const resultSprings = [result1, result2, result3];

  // Featured card — snappy
  const featuredScale = spring({ frame: frame - 60, fps, config: { damping: 18, stiffness: 180 } });

  // Cursor blink
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 40% 40%, #0d1b3e 0%, #000510 100%)",
        opacity: sceneOpacity,
      }}
    >
      {/* Grid lines */}
      <AbsoluteFill style={{ opacity: 0.06 }}>
        <svg width="1920" height="1080">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 96} y1={0} x2={i * 96} y2={1080} stroke="#4285F4" strokeWidth={1} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 90} x2={1920} y2={i * 90} stroke="#4285F4" strokeWidth={1} />
          ))}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>

        {/* Google logo small */}
        <div style={{
          display: "flex",
          gap: 0,
          marginBottom: 48,
          opacity: barSpring,
          transform: `translateY(${(1 - barSpring) * -20}px)`,
        }}>
          {[
            { char: "G", color: "#4285F4" },
            { char: "o", color: "#EA4335" },
            { char: "o", color: "#FBBC05" },
            { char: "g", color: "#4285F4" },
            { char: "l", color: "#34A853" },
            { char: "e", color: "#EA4335" },
          ].map((l, i) => (
            <span key={i} style={{ fontSize: 52, fontWeight: 400, color: l.color, fontFamily: "sans-serif", lineHeight: 1 }}>
              {l.char}
            </span>
          ))}
        </div>

        {/* Search bar */}
        <div
          style={{
            width: 900,
            height: 78,
            borderRadius: 39,
            background: "rgba(255,255,255,0.06)",
            border: "1.5px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 36,
            paddingRight: 36,
            gap: 16,
            transform: `scale(${0.8 + barSpring * 0.2}) translateY(${(1 - barSpring) * 30}px)`,
            boxShadow: "0 8px 60px rgba(66,133,244,0.25), 0 0 0 1px rgba(66,133,244,0.15)",
            opacity: barSpring,
          }}
        >
          {/* Search icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="10" cy="10" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            <path d="M15.5 15.5L21 21" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Typed text */}
          <span style={{
            flex: 1,
            fontSize: 28,
            color: "rgba(255,255,255,0.92)",
            fontFamily: "sans-serif",
            fontWeight: 300,
            letterSpacing: 0.5,
          }}>
            {QUERY.slice(0, charsVisible)}
            {charsVisible < QUERY.length && cursorVisible && (
              <span style={{ borderRight: "2px solid rgba(255,255,255,0.7)", marginLeft: 2, animation: "none" }}>&nbsp;</span>
            )}
          </span>

          {/* Voice icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 1C10.3 1 9 2.3 9 4V12C9 13.7 10.3 15 12 15C13.7 15 15 13.7 15 12V4C15 2.3 13.7 1 12 1Z" fill="rgba(234,67,53,0.8)" />
            <path d="M19 10V12C19 15.9 15.9 19 12 19C8.1 19 5 15.9 5 12V10" stroke="rgba(66,133,244,0.7)" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="12" y2="23" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          </svg>
        </div>

        {/* AI Featured Answer Card */}
        <div style={{
          width: 900,
          marginTop: 24,
          background: "linear-gradient(135deg, rgba(66,133,244,0.12) 0%, rgba(52,168,83,0.08) 100%)",
          border: "1px solid rgba(66,133,244,0.3)",
          borderRadius: 20,
          padding: "28px 36px",
          transform: `scale(${0.9 + featuredScale * 0.1}) translateY(${(1 - featuredScale) * 20}px)`,
          opacity: featuredScale,
          boxShadow: "0 4px 40px rgba(66,133,244,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)",
            }} />
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif", letterSpacing: "0.1em" }}>GOOGLE AI</span>
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.9)", fontFamily: "sans-serif", fontWeight: 300, lineHeight: 1.6 }}>
            The Moon is approximately <strong style={{ color: "#FBBC05" }}>384,400 km</strong> from Earth on average.
            This distance varies between 356,500 km (perigee) and 406,700 km (apogee).
          </div>
        </div>

        {/* Search results */}
        <div style={{ width: 900, marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {RESULTS.map((r, i) => (
            <div
              key={i}
              style={{
                padding: "18px 24px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                transform: `translateX(${(1 - resultSprings[i]) * -40}px)`,
                opacity: resultSprings[i],
              }}
            >
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif", marginBottom: 4 }}>{r.source}</div>
              <div style={{ fontSize: 18, color: "#8AB4F8", fontFamily: "sans-serif", fontWeight: 400 }}>{r.title}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};
