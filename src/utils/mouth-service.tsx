import SamJS from "sam-js";

import { TextToPhonemes } from "./Mouth/reciter";

type AlphabetObject = {
  [key: string]: string;
};

export interface MouthMap {
  shapes: string[];
  characters: string[];
}

const MOUTH_SHAPES = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E",
  f: "F",
  g: "G",
  h: "H",
  th: "TH",
  i: "I",
};

const DEFAULT_MOUTH_SHAPE = MOUTH_SHAPES.a;

// Define mouth positions for different phonemes or sounds (https://sunewatts.dk/lipsync/lipsync/article_02.php)
const LETTER_TO_MOUTH_MAP: AlphabetObject = {
  a: MOUTH_SHAPES.d,
  b: MOUTH_SHAPES.a,
  c: MOUTH_SHAPES.b,
  d: MOUTH_SHAPES.b,
  e: MOUTH_SHAPES.c,
  f: MOUTH_SHAPES.g,
  g: MOUTH_SHAPES.b,
  h: MOUTH_SHAPES.a,
  i: MOUTH_SHAPES.c,
  j: MOUTH_SHAPES.b,
  k: MOUTH_SHAPES.b,
  l: MOUTH_SHAPES.h,
  m: MOUTH_SHAPES.a,
  n: MOUTH_SHAPES.b,
  o: MOUTH_SHAPES.f,
  p: MOUTH_SHAPES.a,
  q: MOUTH_SHAPES.f,
  r: MOUTH_SHAPES.h,
  s: MOUTH_SHAPES.b,
  t: MOUTH_SHAPES.b,
  u: MOUTH_SHAPES.f,
  v: MOUTH_SHAPES.g,
  w: MOUTH_SHAPES.f,
  x: MOUTH_SHAPES.b,
  y: MOUTH_SHAPES.h,
  z: MOUTH_SHAPES.b,
};

// Sam
const Sam = new SamJS();

// Function to generate a Hanna-Barbera-style mouth sequence
const getMouthShapes = (text: string): MouthMap => {
  const formattedText = TextToPhonemes(text).toLowerCase();
  const shapeSequence = [];
  const characterSequence = [];

  console.warn(formattedText);

  for (let i = 0; i < formattedText.length; i++) {
    const character = formattedText[i];
    const mouthShape = LETTER_TO_MOUTH_MAP[character];

    if (mouthShape) {
      shapeSequence.push(mouthShape);
    } else {
      const shape: string = shapeSequence[i - 1] || DEFAULT_MOUTH_SHAPE;
      // Default to a closed mouth for unknown phonemes
      shapeSequence.push(shape);
    }

    characterSequence.push(character);
  }

  return {
    shapes: shapeSequence,
    characters: characterSequence,
  };
};

export { getMouthShapes, MOUTH_SHAPES, DEFAULT_MOUTH_SHAPE };
