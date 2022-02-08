import React from "react";
import { DataPoint } from "./Graph";
import { Box, Text } from "../../components";
import moment from "moment";

interface TransactionProps {
  transaction: DataPoint;
}

const Transaction = ({ transaction }: TransactionProps) => {
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
            backgroundColor={transaction.color}
            style={{ width: 10, height: 10, borderRadius: 5 }}
            marginRight="s"
          />
          <Text variant="title3">{`#${transaction.id}`}</Text>
        </Box>
        <Text color="darkGrey">
          {`$${transaction.value} - ${moment(transaction.date).format(
            "MMMM DD, YYYY"
          )}`}
        </Text>
      </Box>
      <Box>
        <Text color="secondary" variant="button">
          See more
        </Text>
      </Box>
    </Box>
  );
};

export default Transaction;