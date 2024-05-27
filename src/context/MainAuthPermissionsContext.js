import React, { useState } from "react";
export const MainAuthPermissionsContext = React.createContext();

const MainAuthPermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState("");
  const addsetPermissions = (newValue) => {
    setPermissions(newValue);
  };
  return (
    <MainAuthPermissionsContext.Provider value={{ permissions, addsetPermissions }}>
      {children}
    </MainAuthPermissionsContext.Provider>
  );
};

export default MainAuthPermissionsProvider;
