import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import RoundIcon, { RoundedIconProps } from "./RoundedIcon";

interface RoundedIconButtonProps extends RoundedIconProps {
  onPress: () => void;
}

const RoundedIconButton = ({ onPress, ...props }: RoundedIconButtonProps) => {
  return (
    <BorderlessButton {...{ onPress }}>
      <RoundIcon {...props} />
    </BorderlessButton>
  );
};

RoundedIconButton.defaultProps = { ...RoundIcon.defaultProps };

export default RoundedIconButton;
