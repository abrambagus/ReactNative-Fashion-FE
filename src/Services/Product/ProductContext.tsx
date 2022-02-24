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
  const [searchError, setSearchError] = useState("");
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
        setIsLoadingProduct(false);
      });
  };

  const searchProduct = async (keyword: string) => {
    setIsLoadingProduct(true);
    await axios
      .get(`${BASE_URL}/product/search?keyword=${keyword}`)
      .then((res) => {
        setProducts(res.data);
        setIsLoadingProduct(false);
        setSearchError("");
      })
      .catch((err) => {
        setSearchError(err.response.data.message);
        setIsLoadingProduct(false);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        getProduct,
        searchProduct,
        products,
        errorProduct,
        isLoadingProduct,
        searchError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
