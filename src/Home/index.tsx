import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OutfitIdeas from "./OutfitIdeas/OutfitIdeas";
import FavoriteOutfits from "./FavoriteOutfits";
import TransactionHistory from "./TransactionHistory";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import Cart from "./Cart";
import Product, { ProductDetail } from "./Product";
import { AppRoutes, HomeRoutes } from "../components/Navigation";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import { AuthContext } from "../Services";
import { useContext, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
export { assets } from "./Drawer";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = ({
  navigation,
}: StackScreenProps<AppRoutes, "Home">) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Authentication" }],
        })
      );
    }
  }, []);

  return (
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
      <Drawer.Screen name="Product" component={Product} />
      <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
      <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="ProductDetail" component={ProductDetail} />
    </Drawer.Navigator>
  );
};
