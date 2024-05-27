import React, { useState } from "react";
export const MainHeadingContext = React.createContext();

const MainHeadingProvider = ({ children }) => {
  const [heading, setHeading] = useState("");
  const addHeading = (newValue) => {
    setHeading(newValue);
  };
  return (
    <MainHeadingContext.Provider value={{ heading, addHeading }}>
      {children}
    </MainHeadingContext.Provider>
  );
};

export default MainHeadingProvider;
