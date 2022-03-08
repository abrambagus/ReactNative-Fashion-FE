import React, { useContext, useEffect } from "react";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import Onboarding, { assets as onBoaringAssets } from "./Onboarding";
import Welcome, { assets as WelcomeAssets } from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";
import PasswordChanged from "./PasswordChanged";
import ForgotPassword from "./ForgotPassword";
import { AppRoutes, AuthenticationRoutes } from "../components/Navigation";
import SignUpSuccess from "./SignUpSuccess";
import { AuthContext } from "../Services";
import { CommonActions } from "@react-navigation/native";
export const assets = [...onBoaringAssets, ...WelcomeAssets];

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

export const AuthenticationNavigator = ({
  navigation,
}: StackScreenProps<AppRoutes, "Authentication">) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    }
  }, []);

  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthenticationStack.Screen
        name="PasswordChanged"
        component={PasswordChanged}
      />
      <AuthenticationStack.Screen
        name="SignUpSuccess"
        component={SignUpSuccess}
      />
    </AuthenticationStack.Navigator>
  );
};
