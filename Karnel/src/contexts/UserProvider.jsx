import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
     
      return {
        ...parsedUser,
        avatar: parsedUser.avatar && !parsedUser.avatar.startsWith('http') 
          ? `http://localhost:5128${parsedUser.avatar}`
          : parsedUser.avatar || "/img/User_icon_2.svg.png"
      };
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};