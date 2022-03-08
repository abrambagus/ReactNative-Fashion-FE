import React from "react";
import { Box, Text } from "../../components";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TransactionProps {
  transaction: any;
  onDelete: () => void;
}

const Transaction = ({ transaction, onDelete }: TransactionProps) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginTop="l"
    >
      <Box>
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          <Box
          // backgroundColor={transaction.color}
          // style={{ width: 10, height: 10, borderRadius: 5 }}
          // marginRight="s"
          />
          <Text variant="title3">{`# ${transaction.id}`}</Text>
        </Box>
        <Text color="info">
          {`$ ${transaction.totalPrice} - ${moment(
            transaction.currentDate
          ).format("MMMM DD, YYYY")}`}
        </Text>
      </Box>
      <Box>
        <TouchableOpacity onPress={() => onDelete()}>
          <Text color="danger" variant="button">
            Delete
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default Transaction;
