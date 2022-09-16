import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SVGComponent = (props) => (
    <Svg
    width={16}
    height={15}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M8 8.25C3.56 8.25 2 10.5 2 12V14.25H14V12C14 10.5 12.44 8.25 8 8.25Z" fill="#DB2B39"/>
<Path d="M8 7.5C9.86396 7.5 11.375 5.98896 11.375 4.125C11.375 2.26104 9.86396 0.75 8 0.75C6.13604 0.75 4.625 2.26104 4.625 4.125C4.625 5.98896 6.13604 7.5 8 7.5Z" fill="#DB2B39"/>

  </Svg>
);

export default SVGComponent;
