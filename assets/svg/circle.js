import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const SVGComponent = (props) => (
    <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx="8" cy="8" r="8" fill="#FFEFEF"/>
    </Svg>
);

export default SVGComponent;
