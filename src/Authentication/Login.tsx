import React, { useRef } from "react";
import { Button, Box, Container, Text } from "../components";
import TextInput from "./components/Form/TextInput";
import Checkbox from "./components/Form/Checkbox";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Footer from "./components/Footer";
import { Routes, StackNavigationProps } from "../components/Naviagtion";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = ({ navigation }: StackNavigationProps<Routes, "Login">) => {
  const password = useRef<typeof TextInput>(null);

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  const { handleSubmit, control, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Container {...{ footer }}>
      <Box padding="xl">
        <Text variant="title1" textAlign="center" marginBottom="l">
          Welcome Back
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Use your credentials below and login to your account.
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
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
          <Box flexDirection="row" justifyContent="space-between">
            <Controller
              control={control}
              name="remember"
              rules={{
                required: true,
              }}
              render={({ field: { value } }) => (
                <Checkbox
                  label="Remember me"
                  checked={value}
                  onChange={(v: boolean) => setValue("remember", v)}
                />
              )}
            />

            <Button variant="transparent" onPress={() => true}>
              <Text color="primary">Forgot Password</Text>
            </Button>
          </Box>
          <Box alignItems="center" marginTop="m">
            <Button
              variant="primary"
              onPress={handleSubmit(onSubmit)}
              label="Log into your account"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;