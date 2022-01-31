import React, { useRef } from "react";
import { Button, Box, Container, Text } from "../components";
import TextInput from "./components/Form/TextInput";
import Checkbox from "./components/Form/Checkbox";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Footer from "./components/Footer";
import { Routes, StackNavigationProps } from "../components/Naviagtion";

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")], "Password don't match")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignUp = ({ navigation }: StackNavigationProps<Routes, "SignUp">) => {
  const password = useRef<typeof TextInput>(null);
  const passwordConfirmation = useRef<typeof TextInput>(null);

  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Container {...{ footer }}>
      <Box padding="xl">
        <Text variant="title1" textAlign="center" marginBottom="l">
          Create account
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Let us know what's your name, email, and your password
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
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => password.current?.focus()}
                />
              )}
            />
          </Box>

          <Box marginBottom="m">
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { isTouched, error },
              }) => (
                <TextInput
                  ref={password}
                  icon="lock"
                  placeholder="Enter your password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={error}
                  touched={isTouched}
                  value={value}
                  secureTextEntry
                  autoCompleteType="password"
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => passwordConfirmation.current?.focus()}
                />
              )}
            />
          </Box>

          <Controller
            control={control}
            name="passwordConfirmation"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                ref={passwordConfirmation}
                icon="lock"
                placeholder="Confirm your password"
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                touched={isTouched}
                value={value}
                secureTextEntry
                autoCompleteType="password"
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />

          <Box alignItems="center" marginTop="m">
            <Button
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              label="Create your account"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
