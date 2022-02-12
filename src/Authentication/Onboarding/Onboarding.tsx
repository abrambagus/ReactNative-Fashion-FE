import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AuthNavigationProps } from "../../components/Navigation";
import { Theme } from "../../components/Theme";
import { makeStyles } from "../../components";
import ImageSlider from "./ImageSlider";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfits? Don't worry find the best oufit here",
    picture: {
      src: require("../../../assets/images/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Playfull",
    color: "#BEECC4",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of ourfit ideas",
    picture: {
      src: require("../../../assets/images/2.png"),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: "Excentric",
    color: "#FFE4D9",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individuals & unique style and look amazing everyday",
    picture: {
      src: require("../../../assets/images/3.png"),
      width: 2738,
      height: 3244,
    },
  },
  {
    title: "Funky",
    color: "#FFDDDD",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the best trends in fashion and explore your personality",
    picture: {
      src: require("../../../assets/images/4.png"),
      width: 1757,
      height: 2551,
    },
  },
];

export const assets = slides.map((slide) => slide.picture.src);

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const styles = useStyles();
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);

  const animatedBackgroundColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color)
    );
    return {
      backgroundColor,
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      x.value = e.contentOffset.x;
    },
  });

  const footerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -x.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedBackgroundColor]}>
        {slides.map(({ picture }, index) => {
          return (
            <ImageSlider
              key={index}
              index={index}
              currentIndex={x}
              picture={picture}
            />
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            animatedBackgroundColor,
          ]}
        />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={x} {...{ index, x }} />
            ))}
          </View>
          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: width * slides.length,
                flex: 1,
              },
              footerStyle,
            ]}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome");
                    } else {
                      scroll.current?.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                  {...{ subtitle, description, last }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
}));

export default Onboarding;
