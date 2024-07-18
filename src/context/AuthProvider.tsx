import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  auth: User;
  setAuth: React.Dispatch<React.SetStateAction<User>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<User>(() => {
    const storedToken = localStorage.getItem("token");

    const userString = localStorage.getItem("user");

    if (storedToken && userString) {
      const { email, name } = JSON.parse(userString);
      return { email: email, name: name, token: storedToken };
    }
    return {};
  });

  useEffect(() => {
    if (auth.token) {
      console.log("called");

      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
