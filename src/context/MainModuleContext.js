import React, { useState } from "react";
export const MainModuleContext = React.createContext();

const MainModuleContextProvider = ({ children }) => {
  const [moduleCard, setModuleCard] = useState("");
  const addModuleCard = (newValue) => {
    setModuleCard(newValue);
  };
  return (
    <MainModuleContext.Provider value={{ moduleCard, addModuleCard }}>
      {children}
    </MainModuleContext.Provider>
  );
};

export default MainModuleContextProvider;
