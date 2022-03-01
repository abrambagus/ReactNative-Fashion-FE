import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Box, Header, useTheme, Text } from "../../components";
import TextInput from "../../components/Form/TextInput";
import { HomeNavigationProps } from "../../components/Navigation";
import { ProductContext } from "../../Services";
import ProductCard from "./ProductCard";

const Product = ({ navigation }: HomeNavigationProps<"Product">) => {
  const { products, getProduct, isLoadingProduct, searchProduct, searchError } =
    useContext(ProductContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const theme = useTheme();
  useEffect(() => {
    (async () => await getProduct())();
  }, []);

  const onSearch = async (keyword: string) => {
    await searchProduct(keyword);
  };

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

      <Box paddingHorizontal="s" paddingTop="s">
        <TextInput
          icon="search"
          placeholder="Search Producy by Name and Description"
          autoCapitalize="none"
          value={searchKeyword}
          onSubmitEditing={() => {
            onSearch(searchKeyword);
          }}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
        />
      </Box>

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
      ) : searchError ? (
        <Box position="absolute" top="50%" left="36%">
          <Text variant="error">{searchError}</Text>
        </Box>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => {
            return (
              <Box flex={1}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetail", { product: item })
                  }
                >
                  <ProductCard product={item} />
                </TouchableOpacity>
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
