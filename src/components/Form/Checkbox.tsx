import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Box, Text } from "../Theme";
import { TouchableOpacity } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const Checkbox = ({ label, onChange, checked }: CheckboxProps) => {
  return (
    <TouchableOpacity
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
          backgroundColor={checked ? "primary" : "background"}
        >
          <Icon name="check" color="white" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Checkbox;
