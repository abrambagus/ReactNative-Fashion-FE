import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Container, Box, Text, Button, CloseButton } from "../components";
import { Routes, StackNavigationProps } from "../components/Naviagtion";

const PasswordChanged = ({
  navigation,
}: StackNavigationProps<Routes, "PasswordChanged">) => {
  const SIZE = 80;

  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <CloseButton onPress={() => navigation.pop()} />
        </Box>
      }
    >
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box
          backgroundColor="primaryLight"
          style={{ height: SIZE, width: SIZE, borderRadius: SIZE / 2 }}
          justifyContent="center"
          alignItems="center"
          marginBottom="xl"
        >
          <Text color="primary" textAlign="center">
            <Icon name="check" size={32} />
          </Text>
        </Box>
        <Text variant="title1" textAlign="center" marginBottom="l">
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
      </Box>
    </Container>
  );
};

export default PasswordChanged;
