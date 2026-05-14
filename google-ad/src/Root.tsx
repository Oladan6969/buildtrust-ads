import { Composition } from "remotion";
import { GoogleAd } from "./compositions/GoogleAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="GoogleAd"
      component={GoogleAd}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
