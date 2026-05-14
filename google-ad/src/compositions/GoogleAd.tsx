import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { Scene1_Intro } from "../scenes/Scene1_Intro";
import { Scene2_Search } from "../scenes/Scene2_Search";
import { Scene3_Gemini } from "../scenes/Scene3_Gemini";
import { Scene4_Ecosystem } from "../scenes/Scene4_Ecosystem";
import { Scene5_Statement } from "../scenes/Scene5_Statement";
import { Scene6_CTA } from "../scenes/Scene6_CTA";
import { Grain } from "../components/Grain";

// Scene timing (30fps)
// Scene 1:  0s–6s    frames 0–180
// Scene 2:  6s–16s   frames 180–480
// Scene 3:  16s–28s  frames 480–840
// Scene 4:  28s–40s  frames 840–1200
// Scene 5:  40s–52s  frames 1200–1560
// Scene 6:  52s–60s  frames 1560–1800

export const GoogleAd: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={0} durationInFrames={180}>
        <Scene1_Intro />
      </Sequence>
      <Sequence from={180} durationInFrames={300}>
        <Scene2_Search />
      </Sequence>
      <Sequence from={480} durationInFrames={360}>
        <Scene3_Gemini />
      </Sequence>
      <Sequence from={840} durationInFrames={360}>
        <Scene4_Ecosystem />
      </Sequence>
      <Sequence from={1200} durationInFrames={360}>
        <Scene5_Statement />
      </Sequence>
      <Sequence from={1560} durationInFrames={240}>
        <Scene6_CTA />
      </Sequence>

      {/* Global film grain overlay */}
      <Grain opacity={0.14} />
    </AbsoluteFill>
  );
};
