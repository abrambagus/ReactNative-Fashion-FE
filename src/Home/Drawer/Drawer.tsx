import {
  CommonActions,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import React, { useContext } from "react";
import { Dimensions, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { Box, Text, Header } from "../../components";
import { useTheme } from "../../components/Theme";
import { AuthContext } from "../../Services";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;
export const assets = [require("../../../assets/images/patterns/drawer.png")];

const items: DrawerItemProps[] = [
  {
    icon: "zap",
    label: "Outfit Ideas",
    screen: "OutfitIdeas",
    color: "primary",
  },
  {
    icon: "box",
    label: "Product",
    screen: "Product",
    color: "drawer5",
  },
  {
    icon: "heart",
    label: "Favorite Outfits",
    screen: "FavoriteOutfits",
    color: "drawer1",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "drawer2",
  },
  {
    icon: "clock",
    label: "Transaction History",
    screen: "TransactionHistory",
    color: "drawer3",
  },
  {
    icon: "settings",
    label: "Notification Settings",
    screen: "Settings",
    color: "drawer4",
  },
  {
    icon: "log-out",
    label: "Logout",
    onPress: async (navigation) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Authentication" }],
        })
      );
    },
    color: "secondary",
  },
];

const Drawer = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="Menu"
            left={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            right={{
              icon: "shopping-cart",
              onPress: () => navigation.navigate("Cart" as never),
            }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="background"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="xl"
        >
          <Box position="absolute" left={DRAWER_WIDTH / 2 - 50} top={-50}>
            <Avatar.Icon
              size={100}
              icon="human"
              color="white"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            />
          </Box>
          <Box marginVertical="m">
            <Text variant="title1" textAlign="center">
              {user?.name}
            </Text>
            <Text variant="body" textAlign="center">
              {user?.email}
            </Text>
          </Box>
          {items.map((item) => (
            <DrawerItem key={item.icon} {...item} />
          ))}
        </Box>
      </Box>
      <Box
        backgroundColor="background"
        width={DRAWER_WIDTH}
        overflow="hidden"
        height={height * 0.61}
      >
        <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;
