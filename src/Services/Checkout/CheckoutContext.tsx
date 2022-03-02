import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.18.8:8000/api";

export const CheckoutContext = createContext<any>({});

interface CheckoutContextProviderProps {
  children: ReactNode;
}

export const CheckoutContextProvider = ({
  children,
}: CheckoutContextProviderProps) => {
  const [transaction, setTransaction] = useState(null);

  const addTransaction = async (data: any) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .post(`${BASE_URL}/transaction`, data, {
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

  return (
    <CheckoutContext.Provider
      value={{
        addTransaction,
        getTransaction,
        transaction,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
