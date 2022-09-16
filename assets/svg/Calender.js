import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SVGComponent = (props) => (
    <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M13.5 3H4.5C2.84315 3 1.5 4.34315 1.5 6V13.5C1.5 15.1569 2.84315 16.5 4.5 16.5H13.5C15.1569 16.5 16.5 15.1569 16.5 13.5V6C16.5 4.34315 15.1569 3 13.5 3Z" stroke="#DB2B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M6 1.5V4.5M12 1.5V4.5M1.5 7.5H16.5" stroke="#DB2B39" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </Svg>
    );

export default SVGComponent;
