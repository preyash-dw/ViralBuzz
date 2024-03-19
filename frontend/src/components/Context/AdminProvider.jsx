import React,{useState} from 'react';

export const AdminContext = React.createContext();
export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
  
    return (
      <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
        {children}
      </AdminContext.Provider>
    );
  };
  