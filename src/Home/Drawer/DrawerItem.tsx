import React, { useContext } from "react";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { Theme } from "../../components/Theme";
import { Box, RoundedIcon, Text, useTheme } from "../../components";
import { HomeRoutes } from "../../components/Navigation";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { AuthContext } from "../../Services";

interface BaseDrawerItem {
  icon: keyof typeof Icon.glyphMap;
  label: string;
  color: keyof Theme["colors"];
}

interface ScreenDrawerItem extends BaseDrawerItem {
  screen: keyof HomeRoutes;
}

interface OnPressDrawerItem extends BaseDrawerItem {
  onPress: (navigation: ReturnType<typeof useNavigation>) => void;
}

export type DrawerItemProps = ScreenDrawerItem | OnPressDrawerItem;

const DrawerItem = ({ icon, label, color, ...props }: DrawerItemProps) => {
  const { logout } = useContext(AuthContext);
  const theme = useTheme();
  const navigation =
    useNavigation<DrawerNavigationProp<HomeRoutes, "OutfitIdeas">>();

  const onLogout = (props: any) => {
    logout();
    props.onPress(navigation);
  };

  return (
    <RectButton
      onPress={() =>
        "screen" in props ? navigation.navigate(props.screen) : onLogout(props)
      }
      style={{ borderRadius: theme.borderRadii.m }}
    >
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon
          name={icon}
          size={36}
          backgroundColor={color}
          color="background"
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
