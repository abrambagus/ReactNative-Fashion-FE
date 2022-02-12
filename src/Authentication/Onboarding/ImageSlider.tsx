import {
  ImageRequireSource,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { makeStyles, useTheme } from "../../components";
import { Theme } from "../../components/Theme";

interface ImageSliderProps {
  index: number;
  currentIndex: Animated.SharedValue<number>;
  picture: {
    src: ImageRequireSource;
    width: number;
    height: number;
  };
}

const { width } = Dimensions.get("window");

const ImageSlider = ({ index, currentIndex, picture }: ImageSliderProps) => {
  const theme = useTheme();
  const styles = useStyles();

  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentIndex.value,
      [(index - 0.5) * width, index * width, (index + 0.5) * width],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.underlay, style]} key={index}>
      <Image
        source={picture.src}
        style={[
          {
            width: width - theme.borderRadii.xl,
            height:
              ((width - theme.borderRadii.xl) * picture.height) / picture.width,
          },
        ]}
      />
    </Animated.View>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },
}));

export default ImageSlider;
