import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { Theme } from "../../components/Theme";
import { Box, RoundedIcon, Text, useTheme } from "../../components";
import { HomeRoutes } from "../../components/Naviagtion";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export interface DrawerItemProps {
  icon: keyof typeof Icon.glyphMap;
  color: keyof Theme["colors"];
  screen: keyof HomeRoutes;
  label: string;
}

const DrawerItem = ({ icon, label, screen, color }: DrawerItemProps) => {
  const theme = useTheme();
  const { navigate } =
    useNavigation<DrawerNavigationProp<HomeRoutes, "OutfitIdeas">>();

  return (
    <RectButton
      onPress={() => navigate(screen)}
      style={{ borderRadius: theme.borderRadii.m }}
    >
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon
          name={icon}
          size={36}
          backgroundColor={color}
          color="white"
          iconRatio={0.5}
        />
        <Text variant="button" color="secondary" marginLeft="m">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
