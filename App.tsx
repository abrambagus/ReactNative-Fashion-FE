import * as React from "react";
import {
  assets as authenticationAssets,
  AuthenticationNavigator,
} from "./src/Authentication";
import { LoadAssets } from "./src/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator, assets as homeAssets } from "./src/Home";
import { AppRoutes } from "./src/components/Navigation";
import { ThemeProvider } from "./src/components/Theme";
import {
  AuthContextProvider,
  CartContextProvider,
  ProductContextProvider,
  CheckoutContextProvider,
  FavouriteContextProvider,
} from "./src/Services";

const assets = [...authenticationAssets, ...homeAssets];

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  return (
    <ThemeProvider>
      <LoadAssets {...{ fonts, assets }}>
        <AuthContextProvider>
          <ProductContextProvider>
            <FavouriteContextProvider>
              <CartContextProvider>
                <CheckoutContextProvider>
                  <SafeAreaProvider>
                    <AppStack.Navigator screenOptions={{ headerShown: false }}>
                      <AppStack.Screen
                        name="Authentication"
                        component={AuthenticationNavigator}
                      />
                      <AppStack.Screen name="Home" component={HomeNavigator} />
                    </AppStack.Navigator>
                  </SafeAreaProvider>
                </CheckoutContextProvider>
              </CartContextProvider>
            </FavouriteContextProvider>
          </ProductContextProvider>
        </AuthContextProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}
