import { AbsoluteFill, Sequence, Html5Audio, staticFile } from "remotion";
import { Scene1_Intro } from "../scenes/Scene1_Intro";
import { Scene2_Search } from "../scenes/Scene2_Search";
import { Scene3_Gemini } from "../scenes/Scene3_Gemini";
import { Scene4_Ecosystem } from "../scenes/Scene4_Ecosystem";
import { Scene5_Statement } from "../scenes/Scene5_Statement";
import { Scene6_CTA } from "../scenes/Scene6_CTA";
import { Grain } from "../components/Grain";

// Scene timing (30fps) — fast-cut cinematic pacing
// Scene 1:  0s–4s    frames 0–120     Logo reveal
// Scene 2:  4s–12s   frames 120–360   Search experience
// Scene 3:  12s–21s  frames 360–630   Gemini AI
// Scene 4:  21s–29s  frames 630–870   Ecosystem orbit
// Scene 5:  29s–38s  frames 870–1140  Power statements
// Scene 6:  38s–45s  frames 1140–1350 CTA
// Total: 45 seconds

export const GoogleAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>

      {/* ── BACKGROUND MUSIC ──────────────────────────────────────────────── */}
      {/* Drop bg_music.mp3 into public/audio/ and uncomment to activate */}
      {/* <Sequence from={0}><Html5Audio src={staticFile("audio/bg_music.mp3")} volume={0.28} /></Sequence> */}

      {/* ── SFX — SCENE TRANSITIONS ───────────────────────────────────────── */}
      <Sequence from={0}    durationInFrames={60}><Html5Audio src={staticFile("audio/sfx_logo.mp3")}         volume={0.70} /></Sequence>
      <Sequence from={112}  durationInFrames={30}><Html5Audio src={staticFile("audio/sfx_swipe1.mp3")}       volume={0.60} /></Sequence>
      <Sequence from={352}  durationInFrames={30}><Html5Audio src={staticFile("audio/sfx_swipe2.mp3")}       volume={0.60} /></Sequence>
      <Sequence from={360}  durationInFrames={90}><Html5Audio src={staticFile("audio/sfx_riser_gemini.wav")} volume={0.45} /></Sequence>
      <Sequence from={622}  durationInFrames={30}><Html5Audio src={staticFile("audio/sfx_swipe3.mp3")}       volume={0.60} /></Sequence>
      <Sequence from={862}  durationInFrames={30}><Html5Audio src={staticFile("audio/sfx_swipe4.mp3")}       volume={0.60} /></Sequence>
      <Sequence from={1132} durationInFrames={60}><Html5Audio src={staticFile("audio/sfx_hit_cta.wav")}      volume={0.55} /></Sequence>

      {/* ── VOICEOVERS (George — ElevenLabs, British male) ────────────────── */}
      <Sequence from={0}    durationInFrames={120}><Html5Audio src={staticFile("audio/vo1.mp3")} volume={0.95} /></Sequence>
      <Sequence from={120}  durationInFrames={240}><Html5Audio src={staticFile("audio/vo2.mp3")} volume={0.95} /></Sequence>
      <Sequence from={360}  durationInFrames={270}><Html5Audio src={staticFile("audio/vo3.mp3")} volume={0.95} /></Sequence>
      <Sequence from={630}  durationInFrames={240}><Html5Audio src={staticFile("audio/vo4.mp3")} volume={0.95} /></Sequence>
      <Sequence from={870}  durationInFrames={270}><Html5Audio src={staticFile("audio/vo5.mp3")} volume={0.95} /></Sequence>
      <Sequence from={1140} durationInFrames={210}><Html5Audio src={staticFile("audio/vo6.mp3")} volume={0.95} /></Sequence>

      {/* ── SCENES ────────────────────────────────────────────────────────── */}
      <Sequence from={0}    durationInFrames={120}><Scene1_Intro /></Sequence>
      <Sequence from={120}  durationInFrames={240}><Scene2_Search /></Sequence>
      <Sequence from={360}  durationInFrames={270}><Scene3_Gemini /></Sequence>
      <Sequence from={630}  durationInFrames={240}><Scene4_Ecosystem /></Sequence>
      <Sequence from={870}  durationInFrames={270}><Scene5_Statement /></Sequence>
      <Sequence from={1140} durationInFrames={210}><Scene6_CTA /></Sequence>

      <Grain opacity={0.14} />
    </AbsoluteFill>
  );
};
