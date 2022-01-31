import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding, { assets as onBoaringAssets } from "./Onboarding";
import Welcome, { assets as WelcomeAssets } from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { Routes } from "../components/Naviagtion";
export const assets = [...onBoaringAssets, ...WelcomeAssets];

const AuthenticationStack = createStackNavigator<Routes>();

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
    </AuthenticationStack.Navigator>
  );
};
