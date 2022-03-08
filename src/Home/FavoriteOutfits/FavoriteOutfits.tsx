import React, { useContext } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Box, Header, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { FavouriteContext } from "../../Services";
import ProductCard from "../Product/ProductCard";

// const defaultOutfits = [
//   { id: 1, color: "#BFEAF5", aspectRatio: 1, selected: false },
//   { id: 2, color: "#BEECC4", aspectRatio: 200 / 145, selected: false },
//   { id: 3, color: "#FFE4D9", aspectRatio: 180 / 145, selected: false },
//   { id: 4, color: "#FFDDDD", aspectRatio: 180 / 145, selected: false },
//   { id: 5, color: "#BFEAF5", aspectRatio: 1, selected: false },
//   { id: 6, color: "#F3F0EF", aspectRatio: 120 / 145, selected: false },
//   { id: 7, color: "#D5C3BB", aspectRatio: 210 / 145, selected: false },
//   { id: 8, color: "#DEEFC4", aspectRatio: 160 / 145, selected: false },
// ];

const FavoriteOutfits = ({
  navigation,
}: HomeNavigationProps<"FavoriteOutfits">) => {
  const { favourites } = useContext(FavouriteContext);

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Favourite Outfits"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-cart",
          onPress: () => navigation.navigate("Cart"),
        }}
      />
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          renderItem={({ item }) => {
            return (
              <Box flex={1 / 2}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetail", {
                      product: item.product,
                    })
                  }
                >
                  <ProductCard product={item.product} />
                </TouchableOpacity>
              </Box>
            );
          }}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Box position="absolute" top="50%" left="30%">
          <Text variant="error">Favourite Outfits is Empty</Text>
        </Box>
      )}
    </Box>
  );
};

export default FavoriteOutfits;
