import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { Box, Text } from "../../../components";
import { Feather as Icon } from "@expo/vector-icons";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const Checkbox = ({ label, onChange, checked }: CheckboxProps) => {
  return (
    <RectButton
      onPress={() => onChange(!checked)}
      style={{ justifyContent: "center" }}
    >
      <Box flexDirection="row">
        <Box
          height={20}
          width={20}
          marginRight="m"
          alignItems="center"
          justifyContent="center"
          borderRadius="s"
          borderWidth={1}
          borderColor="primary"
          backgroundColor={checked ? "primary" : "white"}
        >
          <Icon name="check" color="white" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </RectButton>
  );
};

export default Checkbox;
