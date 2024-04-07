import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AUthContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <AuthContext.Provider value={{ setUser, user, setUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
