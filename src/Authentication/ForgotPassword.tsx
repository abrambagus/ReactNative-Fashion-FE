import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Linking } from "react-native";
import * as Yup from "yup";
import { Box, Button, Container, Text } from "../components";
import Footer from "./components/Footer";
import TextInput from "../components/Form/TextInput";
import { AuthNavigationProps } from "../components/Naviagtion";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({
  navigation,
}: AuthNavigationProps<"ForgotPassword">) => {
  const footer = (
    <Footer
      title="Not working?"
      action="Try another way"
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />
  );

  const { handleSubmit, control } = useForm({
    mode: "all",
    defaultValues: { email: "" },
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = () => navigation.navigate("PasswordChanged");

  return (
    <Container pattern={2} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Forgot Password?
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Enter the email address associated with your account.
      </Text>
      <Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                icon="mail"
                placeholder="Enter your email"
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                touched={isTouched}
                value={value}
                autoCompleteType="email"
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
        </Box>

        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            label="Log into your account"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
