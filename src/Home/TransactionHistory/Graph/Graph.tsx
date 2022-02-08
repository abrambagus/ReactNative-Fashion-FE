import { Dimensions } from "react-native";
import React from "react";
import { Box, useTheme } from "../../../components";
import { Theme } from "../../../components/Theme";
import Underlay, { MARGIN } from "./Underlay";
import { lerp } from "./Scale";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme["colors"];
}

interface GraphProps {
  data: DataPoint[];
}

const Graph = ({ data }: GraphProps) => {
  const theme = useTheme();
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspectRatio;
  const width = canvasWidth - theme.spacing[MARGIN];
  const height = canvasHeight - theme.spacing[MARGIN];

  const values = data.map((p) => p.value);
  const step = width / data.length;
  const dates = data.map((p) => p.date);
  // const minX = Math.min(...dates);
  // const maxX = Math.max(...dates);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  return (
    <Box paddingBottom={MARGIN} paddingLeft={MARGIN} marginTop="xl">
      <Underlay dates={dates} minY={minY} maxY={maxY} step={step} />
      <Box width={width} height={height}>
        {data.map((point, i) => {
          if (point.value === 0) {
            return null;
          }
          return (
            <Box
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={lerp(0, height, point.value / maxY)}
              key={point.date}
            >
              <Box
                position="absolute"
                top={0}
                bottom={0}
                left={theme.spacing.m}
                right={theme.spacing.m}
                backgroundColor={point.color}
                borderTopLeftRadius="m"
                borderTopRightRadius="m"
                opacity={0.1}
              />
              <Box
                position="absolute"
                top={0}
                height={32}
                left={theme.spacing.m}
                right={theme.spacing.m}
                backgroundColor={point.color}
                borderRadius="m"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Graph;
