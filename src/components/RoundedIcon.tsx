import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Box, Text, Theme } from "./Theme";

interface RoundedIconProps {
  name: keyof typeof Icon.glyphMap;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
}: RoundedIconProps) => {
  const iconSize = size * 0.7;

  return (
    <Box
      height={size}
      width={size}
      justifyContent="center"
      alignItems="center"
      style={{ borderRadius: size / 2 }}
      {...{ backgroundColor }}
    >
      <Text style={{ width: iconSize, height: iconSize }} {...{ color }}>
        <Icon
          color="white"
          size={iconSize}
          style={{ textAlign: "center" }}
          {...{ name }}
        />
      </Text>
    </Box>
  );
};

export default RoundedIcon;
