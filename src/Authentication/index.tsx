import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding, { assets as onBoaringAssets } from "./Onboarding";
import Welcome, { assets as WelcomeAssets } from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";
import PasswordChanged from "./PasswordChanged";
import ForgotPassword from "./ForgotPassword";
import { AuthenticationRoutes } from "../components/Navigation";
export const assets = [...onBoaringAssets, ...WelcomeAssets];

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

export const AuthenticationNavigator = () => {
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
    </AuthenticationStack.Navigator>
  );
};
