import React from "react";
import { Box } from "../../components";
import { palette } from "../../components/Theme";

interface ItemProps {}

const Item = ({}: ItemProps) => {
  return (
    <Box padding="m" flexDirection="row">
      <Box
        style={{ backgroundColor: palette.yellow }}
        width={120}
        height={120}
        borderRadius="m"
      />
    </Box>
  );
};

export default Item;
