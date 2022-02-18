import React from "react";
import {
  Box,
  Button,
  Container,
  RoundedIcon,
  RoundedIconButton,
  Text,
} from "../components";
import { AuthNavigationProps } from "../components/Navigation";

const SignUpSuccess = ({
  navigation,
}: AuthNavigationProps<"SignUpSuccess">) => {
  const SIZE = 80;
  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <RoundedIconButton
            name="x"
            size={60}
            color="secondary"
            backgroundColor="background"
            onPress={() => navigation.pop()}
          />
        </Box>
      }
    >
      <Box alignSelf="center">
        <RoundedIcon
          name="check"
          size={SIZE}
          color="primary"
          backgroundColor="primaryLight"
        />
      </Box>
      <Text variant="title1" textAlign="center" marginVertical="l">
        Your account was successfully created
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Close this window and login.
      </Text>

      <Box alignItems="center" marginTop="m">
        <Button
          variant="primary"
          onPress={() => navigation.navigate("Login")}
          label="Login"
        />
      </Box>
    </Container>
  );
};

export default SignUpSuccess;
