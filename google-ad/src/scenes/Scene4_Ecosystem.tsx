import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { Vignette } from "../components/Vignette";

const APPS = [
  { name: "Search", color: "#4285F4", icon: "🔍", angle: -90 },
  { name: "Maps", color: "#34A853", icon: "📍", angle: -30 },
  { name: "YouTube", color: "#EA4335", icon: "▶", angle: 30 },
  { name: "Gmail", color: "#EA4335", icon: "✉", angle: 90 },
  { name: "Drive", color: "#FBBC05", icon: "△", angle: 150 },
  { name: "Photos", color: "#4285F4", icon: "⬡", angle: 210 },
];

export const Scene4_Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 20, 340, 360], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const orbitRadius = 280;
  const orbitSpeed = 0.008;
  const orbitAngle = frame * orbitSpeed;

  const centerSpring = spring({ frame: frame - 10, fps, config: { damping: 60, stiffness: 15 } });
  const pulse = Math.sin(frame * 0.06) * 0.5 + 0.5;

  const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #080d1a 0%, #000 100%)",
        opacity: sceneOpacity,
      }}
    >
      {/* Title */}
      <div style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity: titleOpacity,
      }}>
        <div style={{
          fontSize: 14,
          fontFamily: "sans-serif",
          letterSpacing: "0.5em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          marginBottom: 12,
          paddingLeft: "0.5em",
        }}>
          The Google Ecosystem
        </div>
        <div style={{
          fontSize: 48,
          fontFamily: "sans-serif",
          fontWeight: 300,
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "0.02em",
        }}>
          Everything, connected.
        </div>
      </div>

      {/* Orbit system */}
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Orbit ring */}
        <div style={{
          position: "absolute",
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 40px rgba(66,133,244,0.1) inset",
        }} />

        {/* Second orbit ring */}
        <div style={{
          position: "absolute",
          width: orbitRadius * 2.6,
          height: orbitRadius * 2.6,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.04)",
        }} />

        {/* Center Google orb */}
        <div style={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(66,133,244,0.05) 100%)",
          border: "1.5px solid rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${0.6 + centerSpring * 0.4})`,
          boxShadow: `0 0 ${40 + pulse * 30}px rgba(66,133,244,0.4), 0 0 80px rgba(66,133,244,0.15)`,
        }}>
          <div style={{ display: "flex" }}>
            {[
              { char: "G", color: "#4285F4" },
              { char: "o", color: "#EA4335" },
              { char: "o", color: "#FBBC05" },
              { char: "g", color: "#4285F4" },
              { char: "l", color: "#34A853" },
              { char: "e", color: "#EA4335" },
            ].map((l, i) => (
              <span key={i} style={{ fontSize: 18, fontWeight: 500, color: l.color, fontFamily: "sans-serif" }}>
                {l.char}
              </span>
            ))}
          </div>
        </div>

        {/* Orbiting app icons */}
        {APPS.map((app, i) => {
          const appSpring = spring({ frame: frame - (20 + i * 15), fps, config: { damping: 80, stiffness: 15 } });
          const angle = ((app.angle * Math.PI) / 180) + orbitAngle;
          const x = Math.cos(angle) * orbitRadius;
          const y = Math.sin(angle) * orbitRadius;
          const hoverScale = 1 + Math.sin(frame * 0.05 + i) * 0.04;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                transform: `translate(${x}px, ${y}px) scale(${(0.4 + appSpring * 0.6) * hoverScale})`,
                opacity: appSpring,
              }}
            >
              {/* App icon */}
              <div style={{
                width: 88,
                height: 88,
                borderRadius: 22,
                background: `${app.color}18`,
                border: `1.5px solid ${app.color}55`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: `0 0 30px ${app.color}33, 0 8px 32px rgba(0,0,0,0.4)`,
                backdropFilter: "blur(10px)",
              }}>
                <span style={{ fontSize: 30 }}>{app.icon}</span>
              </div>
              {/* Label */}
              <div style={{
                textAlign: "center",
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "sans-serif",
                marginTop: 8,
                letterSpacing: "0.05em",
              }}>
                {app.name}
              </div>

              {/* Connector line to center */}
              <svg
                style={{ position: "absolute", top: "50%", left: "50%", pointerEvents: "none", overflow: "visible" }}
                width={1} height={1}
              >
                <line
                  x1={0} y1={0}
                  x2={-x} y2={-y}
                  stroke={app.color}
                  strokeWidth={0.8}
                  strokeOpacity={0.2}
                  strokeDasharray="4 6"
                />
              </svg>
            </div>
          );
        })}
      </AbsoluteFill>

      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};
