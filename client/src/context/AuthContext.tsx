import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../helper/axiosInstance";
import { token } from "../config";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: {children : React.ReactNode}) => {
  const [loading, setLoading] = useState<boolean >(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const isUserLoggedin = async () => {
      try {
        const res = await axiosInstance.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(res.data.success);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    isUserLoggedin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
