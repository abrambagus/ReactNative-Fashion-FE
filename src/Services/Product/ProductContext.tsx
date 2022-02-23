import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";

const BASE_URL = "http://192.168.18.8:8000/api";

export const ProductContext = createContext<any>({});

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [products, setProducts] = useState();
  const [errorProduct, setErrorProduct] = useState("");
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const getProduct = async () => {
    setIsLoadingProduct(true);
    await axios
      .get(`${BASE_URL}/product`)
      .then((res) => {
        setProducts(res.data);
        setIsLoadingProduct(false);
        setErrorProduct("");
      })
      .catch((err) => {
        setErrorProduct(err);
      });
  };

  return (
    <ProductContext.Provider
      value={{ getProduct, products, errorProduct, isLoadingProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
