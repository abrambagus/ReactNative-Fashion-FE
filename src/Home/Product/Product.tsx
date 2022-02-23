import React, { useContext, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Box, Header, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { ProductContext } from "../../Services";
import ProductCard from "./ProductCard";

const Product = ({ navigation }: HomeNavigationProps<"Product">) => {
  const { products, getProduct, isLoadingProduct } = useContext(ProductContext);
  const theme = useTheme();
  useEffect(() => {
    getProduct();
  }, []);

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

      {isLoadingProduct ? (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          marginLeft="activityIndicatorMargin"
        >
          <ActivityIndicator
            size={50}
            animating={true}
            color={theme.colors.primary}
          />
        </Box>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => {
            return (
              <Box flex={1}>
                <ProductCard product={item} />
              </Box>
            );
          }}
          numColumns={1}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </Box>
  );
};

export default Product;
