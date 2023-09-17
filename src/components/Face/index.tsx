import { createSignal, createEffect, onCleanup, JSX } from "solid-js";
import SamJs from "sam-js";

import Mouth from "../Mouth";
import { MouthMap } from "../../utils/mouth-service";
import { getMouthShapes, DEFAULT_MOUTH_SHAPE } from "../../utils/mouth-service";

interface FaceProps {
  text: string;
}

const MOUTH_SPEED = 80; // milliseconds
const VOICE_SPEED = 70;

const Sam = new SamJs({
  speed: VOICE_SPEED,
  pitch: 60,
  throat: 190,
  mouth: 190,
});

const Face = (props: FaceProps): JSX.Element => {
  // Signals
  // mouth
  const [mouthMap, setMouthMap] = createSignal<MouthMap>({
    shapes: [],
    characters: [],
  });
  const [currentMouthShape, setCurrentMouthShape] =
    createSignal<string>(DEFAULT_MOUTH_SHAPE);
  // sound
  const [isMuted, setIsMuted] = createSignal<boolean>(true);
  const [audioContext, setAudioContext] = createSignal<AudioContext>();
  // ui
  const [subtitles, setSubtitles] = createSignal<string>("");

  // Data
  let mouthShapeIndex = 0;
  let mouthInterval: number;

  // Handlers
  const handleSwitchMuted = () => {
    setAudioContext(new window.AudioContext());
    setIsMuted(!isMuted());
  };

  const stopTalking = () => {
    clearInterval(mouthInterval);
    mouthShapeIndex = 0;
    mouthInterval = 0;
  };

  const startTalking = () => {
    setMouthMap(getMouthShapes(props.text));

    mouthInterval = setInterval(() => {
      const shapes = mouthMap().shapes;
      const characters = mouthMap().characters;

      // Update subtitles
      setSubtitles(subtitles() + characters[mouthShapeIndex]);

      // Update mouth shape
      setCurrentMouthShape(shapes[mouthShapeIndex]);

      if (mouthShapeIndex === shapes?.length - 1) {
        stopTalking();
      } else {
        mouthShapeIndex += 1;
      }
    }, MOUTH_SPEED);

    // Sound
    Sam.speak(props.text);
  };

  // Effects

  // initialize audio context
  createEffect(() => {
    const aContext = audioContext();

    if (aContext) {
      aContext.resume();
    }
  });

  // Cleanup
  onCleanup(() => stopTalking());

  return (
    <div style={{ width: "100%" }}>
      <Mouth shape={currentMouthShape()} />
      <div>
        <button onClick={startTalking}>Start talking</button>
      </div>
      <div>
        Sound:
        {isMuted() ? "off" : "on"}
        <button onClick={handleSwitchMuted}>Switch sound</button>
      </div>
      <div>
        Shape:
        {currentMouthShape()}
      </div>
      <div>
        Subtitles:
        {subtitles()}
      </div>
    </div>
  );
};

export default Face;
