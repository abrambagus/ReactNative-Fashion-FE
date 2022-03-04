import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { Box, Header, ScrollableContent, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Transaction from "./Transaction";
import Graph, { DataPoint } from "./Graph";
import { makeStyles, Theme } from "../../components/Theme";
import { CheckoutContext } from "../../Services";
const footerHeight = Dimensions.get("window").width / 3;
const startDate = new Date("2019-09-01").getTime();
const numberOfMonths = 6;

const data: DataPoint[] = [
  {
    date: new Date("2019-12-01").getTime(),
    value: 139.42,
    color: "primary",
    id: 245672,
  },
  {
    date: new Date("2019-10-01").getTime(),
    value: 281.23,
    color: "graph1",
    id: 245673,
  },
  {
    date: new Date("2020-02-01").getTime(),
    value: 198.54,
    color: "graph2",
    id: 245674,
  },
];

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  const { getTransaction, transaction } = useContext(CheckoutContext);
  const styles = useStyles();

  useEffect(() => {
    (async () => await getTransaction())();
  }, []);

  const getTotalSpent = () => {
    let totalSpent = 0;
    if (transaction.length > 0) {
      transaction.forEach((item: any) => {
        totalSpent += item.totalPrice;
      });
      return totalSpent;
    } else {
      return 0;
    }
  };

  console.log(transaction);

  return (
    <ScrollableContent>
      <Box flex={1} backgroundColor="background">
        <Header
          title="Transaction History"
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          right={{ icon: "share", onPress: () => true }}
        />
        <Box padding="m" flex={1}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box>
              <Text variant="header" color="secondary" opacity={0.3}>
                TOTAL SPENT
              </Text>
              <Text variant="title1">$ {getTotalSpent()}</Text>
            </Box>
            <Box backgroundColor="primaryLight" borderRadius="l" padding="s">
              <Text color="primary">All Time</Text>
            </Box>
          </Box>
          <Graph
            data={data}
            startDate={startDate}
            numberOfMonths={numberOfMonths}
          />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {transaction &&
              transaction.map((transactionItem: any, index: any) => (
                <Transaction key={index} transaction={transactionItem} />
              ))}
          </ScrollView>
        </Box>
      </Box>
    </ScrollableContent>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

export default TransactionHistory;
