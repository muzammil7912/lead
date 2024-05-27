import React, { useState } from "react";
export const MainLeadPermissionContext = React.createContext();

const MainLeadPermissionProvider = ({ children }) => {
  const [leadPermission, setLeadPermission] = useState("");
  const addPermission = (newValue) => {
    setLeadPermission(newValue);
  };
  return (
    <MainLeadPermissionContext.Provider value={{ leadPermission, addPermission }}>
      {children}
    </MainLeadPermissionContext.Provider>
  );
};

export default MainLeadPermissionProvider;
