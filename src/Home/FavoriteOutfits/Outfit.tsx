import React, { useState } from "react";
import { BorderlessTap, Box, RoundedIcon } from "../../components";

interface OutfitProps {
  outfit: { id: number; color: string; aspectRatio: number; selected: boolean };
  width: number;
}

const Outfit = ({ outfit, width }: OutfitProps) => {
  const [selected, setSelected] = useState(false);

  const outfitSelected = () => {
    setSelected((prev) => !prev);
    outfit.selected = !outfit.selected;
  };

  return (
    <BorderlessTap onPress={outfitSelected}>
      <Box
        borderRadius="s"
        marginBottom="m"
        alignItems="flex-end"
        padding="m"
        style={{
          backgroundColor: outfit.color,
          width,
          height: width * outfit.aspectRatio,
        }}
      >
        {selected && (
          <RoundedIcon
            name="check"
            backgroundColor="primary"
            color="white"
            size={24}
          />
        )}
      </Box>
    </BorderlessTap>
  );
};

export default Outfit;
