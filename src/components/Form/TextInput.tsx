import React, { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { FieldError } from "react-hook-form";
import { Box, useTheme } from "../Theme";
import RoundedIcon from "../RoundedIcon";

interface TextInputProps extends RNTextInputProps {
  icon: keyof typeof Icon.glyphMap;
  touched?: boolean;
  error?: FieldError;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ icon, error, touched, ...props }, ref) => {
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
          <RoundedIcon
            name={!error ? "check" : "x"}
            size={SIZE}
            backgroundColor={!error ? "primary" : "danger"}
            color="white"
          />
        )}
      </Box>
    );
  }
);

export default TextInput;
