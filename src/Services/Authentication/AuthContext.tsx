import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.18.8:8000/api";

export const AuthContext = createContext<any>({});

interface AuthProviderProps {
  children: ReactNode;
}

interface Login {
  email: string;
  password: string;
  remember: boolean;
}

interface SignUp {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [errorLogin, setErrorLogin] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");

  const rememberMeEmail = async (remember: boolean, email?: string) => {
    if (remember && email) {
      await AsyncStorage.setItem("remember", email);
    } else {
      await AsyncStorage.removeItem("remember");
    }
  };

  const login = async (data: Login) => {
    const { email, password, remember } = data;
    if (remember) {
      rememberMeEmail(remember, email);
    } else {
      rememberMeEmail(remember);
    }
    let resUser;
    await axios
      .post(`${BASE_URL}/login`, { email, password })
      .then(async (res) => {
        resUser = res.data.user;
        setUser(resUser);
        await AsyncStorage.setItem("token", res.data.token);
        setErrorLogin("");
      })
      .catch((err) => {
        setErrorLogin(err.response.data.message);
      });
    return resUser;
  };

  const signUp = async (data: SignUp) => {
    let resUser;
    await axios
      .post(`${BASE_URL}/signup`, data)
      .then((res) => {
        resUser = res.data;
        setErrorSignUp("");
      })
      .catch((err) => {
        setErrorSignUp(err.response.data.message);
      });
    return resUser;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token").catch(() =>
      console.log("logout fail")
    );
    setUser(null);
    console.log("logout success");
  };

  return (
    <AuthContext.Provider
      value={{ login, signUp, logout, user, errorLogin, errorSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
