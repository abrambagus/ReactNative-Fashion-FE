import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.18.8:8000/api";

export const CartContext = createContext<any>({});

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState([]);

  const addProductToCart = async (data: any) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return await axios
        .post(`${BASE_URL}/cart`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async () => {
          await getUserCart();
          return "Success";
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const getUserCart = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      return await axios
        .get(`${BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setCart(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const deleteCartItem = async (idCart: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .delete(`${BASE_URL}/cart/${idCart}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          await getUserCart();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const editQuantity = async (body: any) => {
    const token = await AsyncStorage.getItem("token");
    const { idCart, quantity } = body;
    if (token) {
      await axios
        .patch(
          `${BASE_URL}/cart/${idCart}`,
          { quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (res) => {
          await getUserCart();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        deleteCartItem,
        editQuantity,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
