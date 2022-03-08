import React from "react";
import { Image, Dimensions, TouchableOpacity } from "react-native";
import { Button } from "../components";
import { AuthNavigationProps } from "../components/Navigation";
import { Box, Text, useTheme } from "../components";

const picture = {
  src: require("../../assets/images/5.png"),
  width: 3383,
  height: 5074,
};

export const assets = [picture.src];

const { width } = Dimensions.get("window");

const Welcome = ({ navigation }: AuthNavigationProps<"Welcome">) => {
  const theme = useTheme();

  return (
    <Box flex={1} backgroundColor="background">
      <Box
        flex={1}
        borderBottomRightRadius="xl"
        backgroundColor="background2"
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
          backgroundColor="background2"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        <Box
          backgroundColor="background"
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text variant="button" color="secondary">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
