import React, { useState } from "react";
export const MainExportDataContext = React.createContext();

const MainExportDataProvider = ({ children }) => {
  const [exportData, setExportData] = useState("");
  const addExportData = (newValue) => {
    setExportData(newValue);
  };
  return (
    <MainExportDataContext.Provider value={{ exportData, addExportData }}>
      {children}
    </MainExportDataContext.Provider>
  );
};

export default MainExportDataProvider;
