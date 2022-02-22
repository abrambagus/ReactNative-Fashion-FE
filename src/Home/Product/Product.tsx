import React from "react";
import { Box, Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

const Product = ({ navigation }: HomeNavigationProps<"Product">) => {
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Product"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-cart",
          onPress: () => navigation.navigate("Cart"),
        }}
      />
    </Box>
  );
};

export default Product;
