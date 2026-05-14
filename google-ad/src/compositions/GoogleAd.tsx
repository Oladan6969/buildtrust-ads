import { AbsoluteFill, Sequence, useCurrentFrame, Audio, staticFile } from "remotion";
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
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#000" }}>

      {/* ── BACKGROUND MUSIC ──────────────────────────────────────────────── */}
      {/* Drop bg_music.mp3 into public/audio/ to activate */}
      {/* <Audio src={staticFile("audio/bg_music.mp3")} volume={0.28} /> */}

      {/* ── SFX — SCENE TRANSITIONS ───────────────────────────────────────── */}
      {/* Scene 1 logo pop — frame 0 */}
      <Audio src={staticFile("audio/sfx_logo.mp3")} startFrom={0} volume={0.7} />
      {/* Swipe into Scene 2 — frame 112 (just before cut at 120) */}
      <Audio src={staticFile("audio/sfx_swipe1.mp3")} startFrom={112} volume={0.6} />
      {/* Fast whoosh into Scene 3 — frame 352 */}
      <Audio src={staticFile("audio/sfx_swipe2.mp3")} startFrom={352} volume={0.6} />
      {/* Corporate riser on Gemini reveal — frame 360 */}
      <Audio src={staticFile("audio/sfx_riser_gemini.wav")} startFrom={360} volume={0.45} />
      {/* Deep whoosh into Scene 4 — frame 622 */}
      <Audio src={staticFile("audio/sfx_swipe3.mp3")} startFrom={622} volume={0.6} />
      {/* Flash swoosh into Scene 5 — frame 862 */}
      <Audio src={staticFile("audio/sfx_swipe4.mp3")} startFrom={862} volume={0.6} />
      {/* Cinematic hit into CTA — frame 1132 */}
      <Audio src={staticFile("audio/sfx_hit_cta.wav")} startFrom={1132} volume={0.55} />

      {/* ── VOICEOVERS ────────────────────────────────────────────────────── */}
      {/* Generate these 6 clips via ElevenLabs — see voiceover_script.txt   */}
      {/* Scene 1 (0s–4s):   "Google. The world, organized."                */}
      {/* <Audio src={staticFile("audio/vo1.mp3")} startFrom={0}    volume={0.95} /> */}
      {/* Scene 2 (4s–12s):  "Search anything. Instant answers, powered by AI." */}
      {/* <Audio src={staticFile("audio/vo2.mp3")} startFrom={120}  volume={0.95} /> */}
      {/* Scene 3 (12s–21s): "Meet Gemini. Google's most capable AI — it understands, creates, and reasons like never before." */}
      {/* <Audio src={staticFile("audio/vo3.mp3")} startFrom={360}  volume={0.95} /> */}
      {/* Scene 4 (21s–29s): "One ecosystem. Every tool you need — connected." */}
      {/* <Audio src={staticFile("audio/vo4.mp3")} startFrom={630}  volume={0.95} /> */}
      {/* Scene 5 (29s–38s): "Search everything. Discover anything. Create the future." */}
      {/* <Audio src={staticFile("audio/vo5.mp3")} startFrom={870}  volume={0.95} /> */}
      {/* Scene 6 (38s–45s): "Try Google Gemini. Start at gemini.google.com." */}
      {/* <Audio src={staticFile("audio/vo6.mp3")} startFrom={1140} volume={0.95} /> */}

      <Sequence from={0} durationInFrames={120}>
        <Scene1_Intro />
      </Sequence>
      <Sequence from={120} durationInFrames={240}>
        <Scene2_Search />
      </Sequence>
      <Sequence from={360} durationInFrames={270}>
        <Scene3_Gemini />
      </Sequence>
      <Sequence from={630} durationInFrames={240}>
        <Scene4_Ecosystem />
      </Sequence>
      <Sequence from={870} durationInFrames={270}>
        <Scene5_Statement />
      </Sequence>
      <Sequence from={1140} durationInFrames={210}>
        <Scene6_CTA />
      </Sequence>

      <Grain opacity={0.14} />
    </AbsoluteFill>
  );
};
