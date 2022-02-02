import React from "react";
import { Image, Dimensions } from "react-native";
import { Button } from "../components";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../components/Naviagtion";
import { Box, Text, useTheme } from "../components";
import { BorderlessButton } from "react-native-gesture-handler";

const picture = {
  src: require("../../assets/images/5.png"),
  width: 3383,
  height: 5074,
};

export const assets = [picture.src];

const { width } = Dimensions.get("window");

const Welcome = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Welcome">) => {
  const theme = useTheme();

  return (
    <Box flex={1} backgroundColor="white">
      <Box
        flex={1}
        borderBottomRightRadius="xl"
        backgroundColor="grey"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Image
          source={picture.src}
          style={{
            width: width - theme.borderRadii.xl,
            height:
              ((width - theme.borderRadii.xl) * picture.height) / picture.width,
            borderBottomRightRadius: 75,
          }}
        />
      </Box>
      <Box flex={1} borderTopLeftRadius="xl">
        <Box
          backgroundColor="grey"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        <Box
          backgroundColor="white"
          borderTopLeftRadius="xl"
          justifyContent="space-evenly"
          alignItems="center"
          padding="xl"
          flex={1}
        >
          <Text variant="title2">Let's get started</Text>
          <Text variant="body" textAlign="center">
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            label="Join us, it's free"
            onPress={() => navigation.navigate("SignUp")}
          />
          <BorderlessButton
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text variant="button" color="secondary">
              Forgot password?
            </Text>
          </BorderlessButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
