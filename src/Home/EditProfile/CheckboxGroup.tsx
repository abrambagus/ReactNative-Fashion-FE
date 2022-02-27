import React, { useState } from "react";
import { Box, Button, useTheme } from "../../components";

interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  radio?: boolean;
  callback?: any;
}

const CheckboxGroup = ({ options, radio, callback }: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const theme = useTheme();

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map(({ value, label }) => {
        const index = selectedValues.indexOf(value);
        const isSelected = index !== -1;
        return (
          <Button
            key={value}
            variant={isSelected ? "primary" : "default"}
            onPress={() => {
              if (radio) {
                callback && callback(value);
                setSelectedValues([value]);
              } else {
                if (isSelected) {
                  selectedValues.splice(index, 1);
                } else {
                  selectedValues.push(value);
                }
                setSelectedValues([...selectedValues]);
              }
            }}
            label={label}
            style={{
              width: "auto",
              height: "auto",
              padding: 16,
              marginBottom: theme.spacing.m,
              marginRight: theme.spacing.s,
            }}
          />
        );
      })}
    </Box>
  );
};

export default CheckboxGroup;
