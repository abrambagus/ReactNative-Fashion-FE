import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Box, Text } from "../../components";
import { AuthContext, CartContext, CheckoutContext } from "../../Services";
import AddCard from "./AddCard";
import Card, { CardModel, CardType } from "./Card";
import { CARD_HEIGHT } from "./CardLayout";

const cards: CardModel[] = [
  { id: 0, type: CardType.VISA, last4Digits: "9874", expiration: "05/24" },
  {
    id: 1,
    type: CardType.MASTERCARD,
    last4Digits: "6514",
    expiration: "05/24",
  },
];

interface CheckoutProps {
  minHeight: number;
}

interface LineItemProps {
  label: string;
  value: number;
}

const LineItem = ({ label, value }: LineItemProps) => {
  return (
    <Box flexDirection="row" paddingVertical="s">
      <Box flex={1}>
        <Text color="background" variant="title3">
          {label}
        </Text>
      </Box>
      <Box>
        <Text color="primary" variant="title3">
          $ {value}
        </Text>
      </Box>
    </Box>
  );
};

const Checkout = ({ minHeight }: CheckoutProps) => {
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const { cart, getUserCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { addTransaction } = useContext(CheckoutContext);
  const navigation = useNavigation();

  const getTotalItems = () => {
    let totalItems = 0;
    if (cart.length > 0) {
      cart.forEach((item: any) => {
        totalItems += item.quantity;
      });
      return totalItems;
    } else {
      return 0;
    }
  };

  const getTotalCartValue = () => {
    let totalCartValue = 0;
    if (cart.length > 0) {
      cart.forEach((item: any) => {
        totalCartValue += item.price * item.quantity;
      });
      return totalCartValue;
    } else {
      return 0;
    }
  };

  const deliveryFee = 10;
  const totalOrder = () => {
    if (cart.length > 0) {
      return getTotalCartValue() + deliveryFee;
    } else {
      return 0;
    }
  };

  const order = {
    totalPrice: totalOrder(),
  };

  const onSubmit = async () => {
    const checkoutResult = await addTransaction(order);
    if (checkoutResult === "Success") {
      Alert.alert("Success", "Your order has been placed");
    }
    await getUserCart();
  };

  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight }}>
      <Box flex={1} padding="m">
        <Box height={CARD_HEIGHT}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <AddCard />
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                selected={selectedCard === card.id}
                onSelect={() => setSelectedCard(card.id)}
              />
            ))}
          </ScrollView>
        </Box>
        <Box marginTop="l">
          <Text color="background" variant="title3">
            Delivery Address
          </Text>
          <Box flexDirection="row" opacity={0.5} paddingVertical="m">
            <Box flex={1}>
              <Text color="background">{user?.address}</Text>
            </Box>
            <Box justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile" as never)}
              >
                <Text color="background">Change</Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <LineItem
            label={`Total Items (${getTotalItems()})`}
            value={getTotalCartValue()}
          />
          <LineItem label="Standard Delivery" value={deliveryFee} />
          <LineItem label="Total Payment" value={totalOrder()} />
        </Box>
        <Box
          paddingVertical="m"
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            label={`Press To Pay $ ${totalOrder()}`}
            variant="primary"
            enabled={cart.length > 0 && user.address ? true : false}
            opacity={cart.length > 0 && user.address ? 1 : 0.5}
            onPress={() => onSubmit()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
