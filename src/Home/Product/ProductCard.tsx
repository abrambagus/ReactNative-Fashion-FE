import React from "react";
import { Box, Text, useTheme } from "../../components/Theme";
import { Card } from "react-native-paper";

const ProductCard = ({ product }: any) => {
  const theme = useTheme();

  return (
    <Box flex={1} padding="m">
      <Card
        style={{ backgroundColor: theme.colors.background2, borderRadius: 5 }}
      >
        <Card.Cover
          style={{ borderRadius: 5 }}
          source={{
            uri: `http://192.168.18.8:8000/api/product-image/${product.image}`,
          }}
        />
        <Box flexDirection="row" padding="m">
          <Box flex={1}>
            <Text variant="title3">{product.name}</Text>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="title3">{product.price}</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductCard;
