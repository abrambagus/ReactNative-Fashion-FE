import React, { useContext, useEffect, useRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import * as Yup from "yup";
import { Button, Box, Container, Text } from "../components";
import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "./components/Footer";
import { AuthNavigationProps } from "../components/Navigation";
import { CommonActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../Services";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const password = useRef<RNTextInput>(null);
  const { login, errorLogin } = useContext(AuthContext);

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  const { handleSubmit, control, setValue } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    resolver: yupResolver(LoginSchema),
  });

  useEffect(() => {
    (async () => {
      const rememberMeEmail = await AsyncStorage.getItem("remember");
      if (rememberMeEmail) {
        setValue("email", rememberMeEmail);
        setValue("remember", true);
      }
    })();
  }, []);

  const onSubmit = async (data: any) => {
    const userLogin = await login(data);
    if (userLogin) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    }
  };

  return (
    <Container pattern={0} {...{ footer }}>
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
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginVertical="s"
          alignItems="center"
        >
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text variant="button" color="primary">
              Forgot Password
            </Text>
          </TouchableOpacity>
        </Box>
        {errorLogin ? (
          <Box alignItems="center">
            <Text variant="error">{errorLogin}</Text>
          </Box>
        ) : null}
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

export default Login;
