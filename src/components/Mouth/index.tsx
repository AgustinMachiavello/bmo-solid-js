import { JSX, mergeProps } from "solid-js";

import { MOUTH_SHAPES } from "../../utils/mouth-service";

interface MouthProps {
  shape: string;
}

const BASE_MOUTH_SHAPES_PATH = "src/assets/mouth shapes/";

const getMouthImage = (mouthShape: string) => {
  return `${BASE_MOUTH_SHAPES_PATH}${mouthShape}.png`;
};

const Mouth = (props: MouthProps): JSX.Element => {
  return <img style={{ width: "100%" }} src={getMouthImage(props.shape)}></img>;
};

export default Mouth;
