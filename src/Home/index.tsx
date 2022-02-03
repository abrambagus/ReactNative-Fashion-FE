import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OutfitIdeas from "./OutfitIdeas/OutfitIdeas";
import { HomeRoutes } from "../components/Naviagtion";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={() => <DrawerContent />}
    screenOptions={{
      drawerStyle: {
        width: DRAWER_WIDTH,
      },
      headerShown: false,
    }}
  >
    <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
  </Drawer.Navigator>
);
