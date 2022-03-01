import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Box, Header, useTheme, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { aspectRatio } from "../../components/Theme";
import CartContainer from "./CartContainer";
import Item from "./Item";
import Checkout from "./Checkout";
import { CartContext } from "../../Services";

const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

// const defaultItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const theme = useTheme();
  // const [items, setItems] = useState(defaultItems);
  const { getUserCart, deleteCartItem, cart } = useContext(CartContext);

  const onDelete = (id: number) => {
    deleteCartItem(id);
  };

  useEffect(() => {
    (async () => await getUserCart())();
  }, []);

  return (
    <CartContainer CheckoutComponent={Checkout}>
      <Box>
        <Box backgroundColor="primary">
          <Header
            dark
            title="Shopping Cart"
            left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
          />
        </Box>
      </Box>
      <Box flex={1}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 50 * aspectRatio }}
          showsVerticalScrollIndicator={false}
        >
          {cart &&
            cart.map((cartItem: any, index: any) => (
              <Item
                key={index}
                cartItem={cartItem}
                onDelete={() => onDelete(cartItem.id)}
              />
            ))}
        </ScrollView>
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
          }}
        >
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 375 100">
            <Path d={d} fill={theme.colors.primary} />
          </Svg>
          {cart.length === 0 ? null : (
            <Text variant="title2" textAlign="center" color="background">
              {cart.length} Items Added
            </Text>
          )}
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;
