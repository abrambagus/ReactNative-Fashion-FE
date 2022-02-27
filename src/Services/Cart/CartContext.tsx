import axios from "axios";
import React, { createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.18.8:8000/api";

export const CartContext = createContext<any>({});

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const addToCart = async (data: any) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return await axios
        .post(`${BASE_URL}/cart`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          return "Success";
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
