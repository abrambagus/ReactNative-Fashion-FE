import React, { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box, useTheme } from "../../../components";
import { Feather as Icon } from "@expo/vector-icons";
import { FieldError } from "react-hook-form";

interface TextInputProps extends RNTextInputProps {
  icon: string;
  touched?: boolean;
  error?: FieldError;
}

const TextInput = forwardRef(
  ({ icon, error, touched, ...props }: TextInputProps, ref) => {
    const theme = useTheme();
    const SIZE = theme.borderRadii.m * 2.5;
    const reColor = !touched ? "text" : error ? "danger" : "primary";
    const color = theme.colors[reColor];

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        height={48}
        borderRadius="s"
        borderColor={reColor}
        borderWidth={StyleSheet.hairlineWidth}
        padding="s"
      >
        <Box padding="s">
          <Icon name={icon} size={16} {...{ color }} />
        </Box>
        <Box flex={1}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={color}
            {...props}
            {...{ ref }}
          />
        </Box>
        {touched && (
          <Box
            height={SIZE}
            width={SIZE}
            borderRadius="m"
            backgroundColor={!error ? "primary" : "danger"}
            justifyContent="center"
            alignItems="center"
            style={{ borderRadius: SIZE / 2 }}
          >
            <Icon
              name={!error ? "check" : "x"}
              color="white"
              size={16}
              style={{ textAlign: "center" }}
            />
          </Box>
        )}
      </Box>
    );
  }
);

export default TextInput;
