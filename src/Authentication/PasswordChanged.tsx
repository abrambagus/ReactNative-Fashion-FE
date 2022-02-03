import React from "react";
import {
  Container,
  Box,
  Text,
  Button,
  RoundedIconButton,
  RoundedIcon,
} from "../components";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../components/Naviagtion";

const PasswordChanged = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "PasswordChanged">) => {
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
            backgroundColor="white"
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
        Your password was successfully changed
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Close this window and login again.
      </Text>

      <Box alignItems="center" marginTop="m">
        <Button
          variant="primary"
          onPress={() => navigation.navigate("Login")}
          label="Login again"
        />
      </Box>
    </Container>
  );
};

export default PasswordChanged;
