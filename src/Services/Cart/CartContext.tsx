import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Authentication/AuthContext";

export const CartContext = createContext<any>({});

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    (async () => await getUserCart())();
  }, []);

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

  const deleteCartItem = async (cartId: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .delete(`${BASE_URL}/cart/${cartId}`, {
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
    const { cartId, quantity } = body;
    if (token) {
      await axios
        .patch(
          `${BASE_URL}/cart/${cartId}`,
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
