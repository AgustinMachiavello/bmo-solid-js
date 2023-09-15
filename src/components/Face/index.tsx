import { createSignal, createEffect } from "solid-js";

import Mouth from "../Mouth";
import { getMouthShapes } from "../../utils/mouth-service";

const MOUTH_SPEED = 5000; // milliseconds

const Face = ({ text }) => {
  const [currentMouthShape, setCurrentMouthShape] = createSignal();
  const [currentWord, setCurrentWord] = createSignal();

  // Update the current mouth expression every X seconds
  createEffect(() => {
    const mouthShapes = getMouthShapes(text);
    console.warn("mouthShapes", mouthShapes);
    let letterIndex = 0;

    const mouthTimeout = setInterval(() => {
      console.warn("iteration", letterIndex);
      // Update current letter
      setCurrentMouthShape(mouthShapes[letterIndex]);

      // Next letter
      letterIndex += 1;
    }, MOUTH_SPEED);
  });

  return (
    <div>
      Face
      <Mouth shape={currentMouthShape} />
    </div>
  );
};

export default Face;
