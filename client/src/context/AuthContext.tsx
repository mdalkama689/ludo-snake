import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../helper/axiosInstance";
import { token } from "../config";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [playerOne, setPlayerOne] = useState<boolean>(false);
  const [playerTwo, setPlayerTwo] = useState<boolean>(false);

  useEffect(() => {
    const isUserLoggedin = async () => {
      try {
        const res = await axiosInstance.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        setIsAuthenticated(res.data.success);
        if(res.data.success){
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
        playerOne,
        setPlayerOne,
        playerTwo,
        setPlayerTwo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
