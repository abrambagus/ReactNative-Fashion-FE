import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";
import { useTheme, Text } from "./Theme";

interface ButtonProps {
  variant: "default" | "primary";
  label?: string;
  onPress: () => void;
  style?: RectButtonProperties["style"];
  children?: ReactNode;
  enabled?: any;
  opacity?: number;
}

const Button = ({
  variant,
  label,
  onPress,
  style,
  children,
  enabled,
  opacity,
}: ButtonProps) => {
  const theme = useTheme();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.background2;
  const color =
    variant === "primary" ? theme.colors.background : theme.colors.secondary;

  return (
    <RectButton
      style={[styles.container, style, { backgroundColor, opacity }]}
      {...{ onPress, enabled }}
    >
      {children ? (
        children
      ) : (
        <Text variant="button" style={{ color }}>
          {label}
        </Text>
      )}
    </RectButton>
  );
};

Button.defaultProps = { variant: "default" };

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
});
