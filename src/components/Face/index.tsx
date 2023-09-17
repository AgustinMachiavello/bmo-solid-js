import { createSignal, createEffect, onCleanup, JSX } from "solid-js";

import Mouth from "../Mouth";
import { getMouthShapes, DEFAULT_MOUTH_SHAPE } from "../../utils/mouth-service";

interface FaceProps {
  text: string;
}

const MOUTH_SPEED = 80; // milliseconds

const Face = (props: FaceProps): JSX.Element => {
  // Signals
  const [currentMouthShape, setCurrentMouthShape] =
    createSignal(DEFAULT_MOUTH_SHAPE);
  const [subtitles, setSubtitles] = createSignal("");

  // Data
  const mouthMap = getMouthShapes(props.text);
  let mouthShapeIndex = 0;
  let mouthInterval: number;

  createEffect(() => {
    if (!mouthMap) return;

    mouthInterval = setInterval(() => {
      const shapes = mouthMap.shapes;
      const characters = mouthMap.characters;

      // Update subtitles
      setSubtitles(subtitles() + characters[mouthShapeIndex]);

      // Update mouth shape
      setCurrentMouthShape(shapes[mouthShapeIndex]);

      if (mouthShapeIndex === shapes.length - 1) {
        clearInterval(mouthInterval);
      }

      mouthShapeIndex += 1;
    }, MOUTH_SPEED);
  });

  onCleanup(() => clearInterval(mouthInterval));

  return (
    <div style={{ width: "100%" }}>
      <Mouth shape={currentMouthShape()} />
      Shape: {currentMouthShape()}
      Subtitles:
      <div>{subtitles()}</div>
    </div>
  );
};

export default Face;
