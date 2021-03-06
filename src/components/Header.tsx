import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather as Icon } from "@expo/vector-icons";
import { Box, Text } from "./Theme";
import RoundedIconButton from "./RoundedIconButton";
import { View } from "react-native";

interface HeaderProps {
  left: {
    icon: keyof typeof Icon.glyphMap;
    onPress: () => void;
  };
  title: string;
  right?: {
    icon: keyof typeof Icon.glyphMap;
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({ left, title, right, dark }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const color = dark ? "background" : "secondary";

  return (
    <Box
      flexDirection="row"
      style={{ marginTop: insets.top }}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
    >
      <RoundedIconButton
        name={left.icon}
        iconRatio={0.4}
        onPress={left.onPress}
        size={44}
        align={"center"}
        {...{ color }}
      />
      <Text variant="header" {...{ color }}>
        {title.toUpperCase()}
      </Text>
      {right ? (
        <RoundedIconButton
          name={right.icon}
          iconRatio={0.4}
          onPress={right.onPress}
          size={44}
          align={"center"}
          {...{ color }}
        />
      ) : (
        <View style={{ width: 44 }} />
      )}
    </Box>
  );
};

Header.defaultProps = { dark: false };

export default Header;
