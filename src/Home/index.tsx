import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OutfitIdeas from "./OutfitIdeas/OutfitIdeas";
import { HomeRoutes } from "../components/Naviagtion";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
  </Drawer.Navigator>
);
