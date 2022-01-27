import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Onboarding,
  Welcome,
  assets as authenticationAssets,
} from "./src/Authentication";
import { LoadAssets, theme } from "./src/components";
import { ThemeProvider } from "@shopify/restyle";
import { Routes } from "./src/components/Naviagtion";

const AuthenticationStack = createStackNavigator<Routes>();

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    </AuthenticationStack.Navigator>
  );
};

const assets = [...authenticationAssets];

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts, assets }}>
        <AuthenticationNavigator />
      </LoadAssets>
    </ThemeProvider>
  );
}
