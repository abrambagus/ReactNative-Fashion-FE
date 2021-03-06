import { Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Box, Button, Header, RoundedIcon, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import CheckboxGroup from "../EditProfile/CheckboxGroup";
import { RectButton } from "react-native-gesture-handler";
import { CartContext, FavouriteContext } from "../../Services";
import { AntDesign } from "@expo/vector-icons";

const ProductDetail = ({
  navigation,
  route,
}: HomeNavigationProps<"ProductDetail">) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { favourites, deleteFavourite, addToFavourite } =
    useContext(FavouriteContext);
  const { addProductToCart } = useContext(CartContext);

  let postToCart = {
    productId: product.id,
    quantity: quantity,
    size: product.sizes[0].name,
    image: product.image,
    name: product.name,
    price: product.price,
  };

  const addQty = () => {
    setQuantity((qty) => qty + 1);
  };

  const substractQty = () => {
    if (quantity > 1) {
      setQuantity((qty) => qty - 1);
    } else {
      setQuantity(1);
    }
  };

  const formattedSizes = product.sizes.map(({ name }: any) => {
    return { value: name, label: name };
  });

  const onChangesSize = (size: string) => {
    postToCart.size = size;
  };

  const isFavourite = favourites.find((f: any) => f.product.id === product.id);

  const addFav = async () => {
    await addToFavourite(product.id);
  };

  const removeFav = async () => {
    await deleteFavourite(isFavourite.id);
  };

  const onSubmitCart = async () => {
    const postCart = await addProductToCart(postToCart);
    if (postCart === "Success") {
      Alert.alert("Success", "Item added to cart");
    }
  };
  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Product Detail"
        left={{
          icon: "arrow-left",
          onPress: () => navigation.navigate("Product"),
        }}
        right={{
          icon: "shopping-cart",
          onPress: () => navigation.navigate("Cart"),
        }}
      />
      <Image
        style={{ flex: 0.68 }}
        resizeMode="cover"
        source={{
          uri: `http://192.168.18.8:8000/api/product-image/${product.image}`,
        }}
      />
      <Box position="absolute" top={90} right={20} zIndex={9}>
        <TouchableOpacity
          onPress={() => (isFavourite ? removeFav() : addFav())}
        >
          <AntDesign
            name={isFavourite ? "heart" : "hearto"}
            size={30}
            color={isFavourite ? "red" : "black"}
          />
        </TouchableOpacity>
      </Box>
      <Box padding="m" flex={1}>
        <Box flexDirection="row" marginBottom="m">
          <Box flex={1}>
            <Text variant="title2">{product.name}</Text>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="title2">$ {product.price}</Text>
          </Box>
        </Box>

        <Box flexDirection="row" marginBottom="m">
          <Box flex={1}>
            <Text variant="body">Brand</Text>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="body">{product.brand}</Text>
          </Box>
        </Box>

        <Text variant="body">Sizes avaliable</Text>
        <CheckboxGroup
          options={formattedSizes}
          radio
          defaultSelected={product.sizes[0].name}
          callback={onChangesSize}
        />

        <Box flex={0.5} marginBottom="s">
          <Text variant="body">Seller's description:</Text>
          <Box marginBottom="s" />
          <ScrollView>
            <Text variant="body">{product.description}</Text>
          </ScrollView>
        </Box>

        <Box justifyContent="space-around" alignItems="center" flex={0.2}>
          <Box
            alignSelf="stretch"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Text variant="body">Quantity</Text>
            <Box flexDirection="row" alignItems="center">
              <RectButton onPress={() => substractQty()}>
                <RoundedIcon
                  iconRatio={0.5}
                  name="minus"
                  size={27}
                  color="background"
                  backgroundColor="primary"
                />
              </RectButton>

              <Box paddingHorizontal="s">
                <Text variant="body">{quantity}</Text>
              </Box>

              <RectButton onPress={() => addQty()}>
                <RoundedIcon
                  iconRatio={0.5}
                  name="plus"
                  size={27}
                  color="background"
                  backgroundColor="primary"
                />
              </RectButton>
            </Box>
          </Box>
        </Box>
        <Box justifyContent="center" alignItems="center" marginTop="s">
          <Button variant="primary" onPress={() => onSubmitCart()}>
            <RoundedIcon
              iconRatio={0.5}
              name="shopping-cart"
              size={50}
              color="background"
              backgroundColor="primary"
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
