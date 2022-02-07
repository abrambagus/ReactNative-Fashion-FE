import React from "react";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  return (
    <Header
      title="Transaction History"
      left={{ icon: "arrow-left", onPress: () => navigation.openDrawer() }}
      right={{ icon: "share", onPress: () => true }}
    />
  );
};

export default TransactionHistory;
