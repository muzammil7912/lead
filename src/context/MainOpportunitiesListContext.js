import React, { useState } from "react";
export const MainOpportunitiesListContext = React.createContext();

const MainOpportunitiesListProvider = ({ children }) => {
  const [opportunitiesList, setOpportunitiesList] = useState("");
  const addOpportunitiesList = (newValue) => {
    setOpportunitiesList(newValue);
  };
  return (
    <MainOpportunitiesListContext.Provider value={{ opportunitiesList, addOpportunitiesList }}>
      {children}
    </MainOpportunitiesListContext.Provider>
  );
};

export default MainOpportunitiesListProvider;
