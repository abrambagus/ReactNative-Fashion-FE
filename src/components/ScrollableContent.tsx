import { Dimensions } from "react-native";
import React from "react";
import Svg, { ClipPath, Defs, Path, Image } from "react-native-svg";
import { Box, useTheme } from "./Theme";

interface ContentProps {
  children: React.ReactNode;
}

const viewBox = {
  width: 375,
  height: 100,
};
const { width } = Dimensions.get("window");
const height = (viewBox.height * width) / viewBox.width;
const d = "M 0 100 A 50 50 0 0 1 50 50 H 325 A 50 50 0 0 0 375 0 V 100 Z";

const ScrollableContent = ({ children }: ContentProps) => {
  const theme = useTheme();

  return (
    <Box flex={1}>
      {children}
      <Svg
        style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        width={width}
        height={height}
        viewBox={[0, 0, viewBox.width, viewBox.height].join(" ")}
      >
        <Defs>
          <ClipPath id="clip">
            <Path fill={theme.colors.background} d={d} />
          </ClipPath>
        </Defs>
        <Image
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          href={require("../../assets/images/patterns/1.png")}
          clipPath="url(#clip)"
        />
      </Svg>
    </Box>
  );
};

export default ScrollableContent;
