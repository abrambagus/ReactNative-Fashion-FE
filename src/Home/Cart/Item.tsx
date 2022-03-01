import React, { useContext } from "react";
import { Image } from "react-native";
import { Box, Text, useTheme } from "../../components";
import { CartContext } from "../../Services";
import SwipeableRow from "./SwipeableRow";

interface ItemProps {
  onDelete: () => void;
  cartItem: any;
}

const Item = ({ onDelete, cartItem }: ItemProps) => {
  const { editQuantity } = useContext(CartContext);
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2;

  const addQty = () => {
    const body = {
      idCart: cartItem.id,
      quantity: cartItem.quantity + 1,
    };
    editQuantity(body);
    console.log("ssss");
  };

  const substractQty = () => {
    if (cartItem.quantity > 1) {
      const body = {
        idCart: cartItem.id,
        quantity: cartItem.quantity - 1,
      };
      editQuantity(body);
    }
  };

  return (
    <SwipeableRow
      onDelete={onDelete}
      height={height}
      addQty={addQty}
      substractQty={substractQty}
    >
      <Box padding="m" flexDirection="row">
        <Box
          style={{ backgroundColor: "#BFEAF5" }}
          width={120}
          height={120}
          borderRadius="m"
        >
          <Image
            style={{
              justifyContent: "center",
              width: 120,
              height: 120,
            }}
            source={{
              uri: `http://192.168.18.8:8000/api/product-image/${cartItem.image}`,
            }}
          />
        </Box>
        <Box padding="m" flex={1} justifyContent="center">
          <Text variant="header">Size : {cartItem.size}</Text>
          <Text variant="title3" marginBottom="s">
            {cartItem.name}
          </Text>
          <Text variant="title3" color="primary">
            $ {cartItem.price}
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box
            backgroundColor="secondary"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          >
            <Text variant="header" color="background">
              x {cartItem.quantity}
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;
