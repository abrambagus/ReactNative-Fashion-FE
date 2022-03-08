import React, { useContext } from "react";
import { Box, Text, useTheme } from "../../components/Theme";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FavouriteContext } from "../../Services";

const ProductCard = ({ product }: any) => {
  const theme = useTheme();
  const { favourites, deleteFavourite, addToFavourite } =
    useContext(FavouriteContext);
  const isFavourite = favourites.find((f: any) => f.product.id === product.id);

  const addFav = async () => {
    await addToFavourite(product.id);
  };

  const removeFav = async () => {
    await deleteFavourite(isFavourite.id);
  };

  return (
    <Box flex={1} padding="s">
      <Card
        style={{ backgroundColor: theme.colors.background2, borderRadius: 5 }}
      >
        <Card.Cover
          style={{ borderRadius: 5 }}
          source={{
            uri: `http://192.168.18.8:8000/api/product-image/${product.image}`,
          }}
        />
        <Box position="absolute" top={10} right={10} zIndex={9}>
          <TouchableOpacity
            onPress={() => (isFavourite ? removeFav() : addFav())}
          >
            <AntDesign
              name={isFavourite ? "heart" : "hearto"}
              size={24}
              color={isFavourite ? "red" : "black"}
            />
          </TouchableOpacity>
        </Box>
        <Box flexDirection="row" padding="m">
          <Box flex={1}>
            <Text variant="title3">{product.name}</Text>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="title3">$ {product.price}</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductCard;
