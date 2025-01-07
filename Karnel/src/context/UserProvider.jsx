import React, { createContext, useContext, useState, useEffect } from 'react'; // Thêm React vào import
import axios from 'axios';


//tao context chia se du lieu
const UserContext=createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    const value = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
      throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}