import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Authentication/AuthContext";

export const CheckoutContext = createContext<any>({});

interface CheckoutContextProviderProps {
  children: ReactNode;
}

export const CheckoutContextProvider = ({
  children,
}: CheckoutContextProviderProps) => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    (async () => await getTransaction())();
  }, []);

  const addTransaction = async (data: any) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return await axios
        .post(`${BASE_URL}/transaction`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          await getTransaction();
          console.log(res.data);
          return "Success";
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const getTransaction = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await axios
        .get(`${BASE_URL}/transaction`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTransaction(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const deleteTransaction = async (transactionId: number) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await axios
        .delete(`${BASE_URL}/transaction/${transactionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          await getTransaction();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        addTransaction,
        getTransaction,
        deleteTransaction,
        transaction,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
