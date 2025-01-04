import React, { createContext, useContext, useState, useEffect } from 'react'; // Thêm React vào import
//tao context chia se du lieu
const UserContext=createContext();

export function UserProvider({children}) {
        const [user, setUser] = useState(()=>{
            //kiem tra  xem co user hay khong
            const saveUser=localStorage.getItem('user');
            //neu co thi tra ve user
            return saveUser ? JSON.parse(saveUser) : null;
        });
        useEffect(()=>{
          if(user){
            localStorage.setItem('user', JSON.stringify(user));
          }else{
            localStorage.removeItem('user');
          }
            
        }, [user]);
    return (
        <div>
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
            
        </div>
    );
}
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
      throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}