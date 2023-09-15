const BASE_MOUTH_SHAPES_PATH = "src/assets/mouth shapes/";

const getMouthImage = (mouthShape: string) => {
  return `${BASE_MOUTH_SHAPES_PATH}${mouthShape}.svg`;
};

const Mouth = ({ shape }) => {
  const imagePath = getMouthImage(shape());
  console.warn("shape", shape);
  console.warn("imagePath", imagePath);
  return (
    <div>
      Mouth: {shape()}
      <br></br>
      Image:
      <img src={getMouthImage(shape())}></img>
    </div>
  );
};

export default Mouth;
