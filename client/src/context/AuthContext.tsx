import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../helper/axiosInstance";
import { token } from "../config";

interface IAuthContext {
  loading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}
export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const isUserLoggedin = async () => {
      try {
        const res = await axiosInstance.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(res.data.success);
        if (res.data.success) {
          setUsername(res.data.user.username);
        }
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
      value={{
        loading,
        isAuthenticated,
        setIsAuthenticated,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
