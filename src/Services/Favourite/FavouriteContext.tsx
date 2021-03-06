import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../Authentication/AuthContext";

export const FavouriteContext = createContext<any>({});

interface FavouriteContextProviderProps {
  children: ReactNode;
}

export const FavouriteContextProvider = ({
  children,
}: FavouriteContextProviderProps) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    (async () => await getFavourites())();
  }, []);

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
