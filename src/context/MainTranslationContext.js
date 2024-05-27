import React, { useState } from "react";
export const MainTranslationContext = React.createContext();

const MainTranslationProvider = ({ children }) => {
  const [transData, settransData] = useState("");
  const addData = (newValue) => {
    settransData(newValue);
  };
  return (
    <MainTranslationContext.Provider value={{ transData, addData }}>
      {children}
    </MainTranslationContext.Provider>
  );
};

export default MainTranslationProvider;
