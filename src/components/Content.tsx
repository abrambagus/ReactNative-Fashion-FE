import { Dimensions, View, Image, StyleSheet } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "./Theme";

interface ContentProps {
  children: React.ReactNode;
}

const viewBox = {
  width: 375,
  height: 100,
};
const { width } = Dimensions.get("window");
const height = (viewBox.height * width) / viewBox.width;
const d = "M 0 0 H 375 A 50 50 0 0 1 325 50 H 50 A 50 50 0 0 0 0 100";

const Content = ({ children }: ContentProps) => {
  const theme = useTheme();

  return (
    <>
      <View style={styles.background}>
        <Image
          source={require("../../assets/images/patterns/1.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/images/patterns/2.png")}
          style={styles.image}
        />
        <Image
          source={require("../../assets/images/patterns/3.png")}
          style={styles.image}
        />
      </View>
      {children}
      <Svg
        viewBox={[0, 0, viewBox.width, viewBox.height].join(" ")}
        width={width}
        height={height}
      >
        <Path fill={theme.colors.background} d={d} />
      </Svg>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  image: {
    width,
    height: (width * 750) / 1125,
  },
});

export default Content;
