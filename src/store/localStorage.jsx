import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
const [user, setUser] = useState("");
const [redirectRoute, setRedirectRoute] = useState("/");


  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken); 
  };

const isLoggedIn = !!token;

  const userAuthorization = async () => {
    try {
      const response = await fetch("https://result-backend-v1ry.onrender.com/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data:", response);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

const logOutUser = ()=>{
  setToken("")
  localStorage.removeItem("token")
}

  useEffect(() => {
    if (token) {
      userAuthorization();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, logOutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
