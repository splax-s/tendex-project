import * as React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

const SVGComponent = (props) => (
    <Svg
    width={209}
    height={217}
    viewBox="0 0 209 207"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x="11" width="198" height="206" rx="22" fill="#F5F5F5" fill-opacity="0.51"/>
<Rect y="11" width="198" height="206" rx="22" fill="#F5F5F5"/>
<Rect x="84" y="41" width="104" height="25" rx="12.5" fill="#F0CEA0"/>
<Rect x="84" y="79" width="86" height="25" rx="12.5" fill="#F3A712"/>
<Rect x="82" y="117" width="77" height="25" rx="12.5" fill="#F0CEA0"/>
<Path d="M64 45L40.6442 66L29 55.5" stroke="#49536E" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M64 85L40.6442 106L29 95.5" stroke="#49536E" stroke-opacity="0.5" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M64 123L40.6442 144L29 133.5" stroke="#49536E" stroke-opacity="0.1" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<Circle cx="168.5" cy="193.5" r="7.5" fill="#EDEDED"/>
<Circle cx="144.5" cy="193.5" r="7.5" fill="#EDEDED"/>
<Circle cx="120.5" cy="193.5" r="7.5" fill="#EDEDED"/>

  </Svg>
  );

  export default SVGComponent;
