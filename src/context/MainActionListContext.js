import React, { useState } from "react";
export const MainActionListContext = React.createContext();

const MainActionListProvider = ({ children }) => {
  const [Actionlist, setActionlist] = useState("");
  const addActionList = (newValue) => {
    setActionlist(newValue);
  };
  return (
    <MainActionListContext.Provider value={{ Actionlist, addActionList }}>
      {children}
    </MainActionListContext.Provider>
  );
};

export default MainActionListProvider;
