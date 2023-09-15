type AlphabetObject = {
  [key: string]: string;
};

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

// Function to generate a Hanna-Barbera-style mouth sequence
const getMouthShapes = (text: string) => {
  const textInUpperCase = text.toLowerCase();
  const sequence = [];

  for (let i = 0; i < textInUpperCase.length; i++) {
    const phoneme = textInUpperCase[i];
    const mouthPosition = LETTER_TO_MOUTH_MAP[phoneme];

    if (mouthPosition) {
      sequence.push(mouthPosition);
    } else {
      // Default to a closed mouth for unknown phonemes
      sequence.push(DEFAULT_MOUTH_SHAPE);
    }
  }

  return sequence;
};

export { getMouthShapes, MOUTH_SHAPES };
