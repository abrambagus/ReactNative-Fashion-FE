import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.18.8:8000/api";

export const FavouriteContext = createContext<any>({});

interface FavouriteContextProviderProps {
  children: ReactNode;
}

export const FavouriteContextProvider = ({
  children,
}: FavouriteContextProviderProps) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourite = async (productId: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .post(
          `${BASE_URL}/favourite`,
          { productId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(async (res) => {
          await getFavourites();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getFavourites = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .get(`${BASE_URL}/favourite`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFavourites(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const deleteFavourite = async (favId: number) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      await axios
        .delete(`${BASE_URL}/favourite/${favId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          await getFavourites();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <FavouriteContext.Provider
      value={{
        addToFavourite,
        getFavourites,
        deleteFavourite,
        favourites,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
