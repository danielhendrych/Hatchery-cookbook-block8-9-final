import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
   
    const [isAuthorized, setIsAuthorized] = useState(false);

    const login = () => {
        setIsAuthorized(!isAuthorized);
      };

      
  const value = {
    isAuthorized,
    login,
  };

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;

/* JEDNOTKY CHYBÍ */