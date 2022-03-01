import React, { ReactNode } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";

import { Box, RoundedIconButton, Text, useTheme } from "../../components";
import { aspectRatio } from "../../components/Theme";

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
  height: number;
  addQty: any;
  substractQty: any;
}

const { width } = Dimensions.get("window");
const finalDestination = width;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipeableRow = ({
  children,
  onDelete,
  height: defaultHeight,
  addQty,
  substractQty,
}: SwipeableRowProps) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const height = useSharedValue(defaultHeight);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: true,
        },
        () => {
          if (dest === finalDestination) {
            height.value = withTiming(0, { duration: 250 }, () => {
              runOnJS(onDelete)();
            });
          }
        }
      );
    },
  });
  const style = useAnimatedStyle(() => ({
    backgroundColor: theme.colors.background,
    transform: [{ translateX: translateX.value }],
  }));
  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));
  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.danger, theme.colors.background]}
          start={[0, 0.5]}
          end={[1, 0.5]}
        />
        <Box
          flex={1}
          justifyContent="space-evenly"
          width={editWidth}
          alignItems="center"
        >
          <Text color="background" variant="title3">
            Remove
          </Text>
        </Box>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, editStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.edit, theme.colors.background]}
          start={[1, 0.5]}
          end={[0.8, 0.5]}
        />
        <Box
          flex={1}
          justifyContent="center"
          width={editWidth}
          alignSelf="flex-end"
          alignItems="center"
        >
          <RoundedIconButton
            onPress={() => addQty()}
            name="plus"
            size={24}
            color="background"
            backgroundColor="primary"
          />
          <Box margin="ss" />
          <RoundedIconButton
            onPress={() => substractQty()}
            name="minus"
            size={24}
            color="background"
            backgroundColor="danger"
          />
        </Box>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
