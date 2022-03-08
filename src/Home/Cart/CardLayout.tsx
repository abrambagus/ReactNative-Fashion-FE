import React, { ReactNode } from "react";
import { BoxProps } from "@shopify/restyle";
import { Box } from "../../components";
import { Theme } from "../../components/Theme";
import { TouchableOpacity } from "react-native";

export const CARD_HEIGHT = 160;

interface CardLayoutProps {
  onPress: () => void;
  children: ReactNode;
  backgroundColor: BoxProps<Theme>["backgroundColor"];
}

const CardLayout = ({
  onPress,
  children,
  backgroundColor,
}: CardLayoutProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        padding="m"
        width={120}
        height={CARD_HEIGHT}
        marginLeft="m"
        borderRadius="m"
        backgroundColor={backgroundColor}
      >
        {children}
      </Box>
    </TouchableOpacity>
  );
};

export default CardLayout;
