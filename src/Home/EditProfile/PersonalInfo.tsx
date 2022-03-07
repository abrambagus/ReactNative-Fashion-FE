import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView } from "react-native";
import * as Yup from "yup";
import { Box, Button, Text } from "../../components";
import TextInput from "../../components/Form/TextInput";
import { AuthContext } from "../../Services";

// const genders = [
//   { value: "male", label: "Male" },
//   { value: "female", label: "Female" },
// ];

const PersonalInfoSchema = Yup.object().shape(
  {
    name: Yup.string()
      .notRequired()
      .when("name", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(4, "name Too Short!").max(20, "Too Long!"),
      }),
    password: Yup.string()
      .notRequired()
      .when("password", {
        is: (value: string) => value?.length,
        then: (rule) => rule.min(2, "Password Too Short!").max(50, "Too Long!"),
      }),
    address: Yup.string().notRequired(),
  },
  [
    ["name", "name"],
    ["password", "password"],
  ]
);

const PersonalInfo = () => {
  const { user, updateUser } = useContext(AuthContext);

  const { handleSubmit, control } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      password: "",
      address: "",
    },
    resolver: yupResolver(PersonalInfoSchema),
  });

  const onSubmit = async (data: any) => {
    const { name, password, address } = data;

    let body = {};
    if (name) {
      body = {
        ...body,
        name,
      };
    }
    if (password) {
      body = {
        ...body,
        password,
      };
    }
    if (address) {
      body = {
        ...body,
        address,
      };
    }

    const updateResult = await updateUser(body);
    if (updateResult === "Success") {
      Alert.alert("Success", "Your profile has been updated");
    }
  };

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body" marginBottom="m">
          Account Information
        </Text>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                icon="user"
                placeholder={user?.name}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                touched={isTouched}
                value={value}
                autoCompleteType="name"
                autoCapitalize="none"
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
                icon="lock"
                placeholder="*******"
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                touched={isTouched}
                value={value}
                autoCompleteType="password"
                autoCapitalize="none"
                secureTextEntry
              />
            )}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="address"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                icon="map-pin"
                placeholder={user?.address}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                touched={isTouched}
                value={value}
                autoCompleteType="street-address"
                autoCapitalize="none"
              />
            )}
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            label="Save Changes"
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default PersonalInfo;
