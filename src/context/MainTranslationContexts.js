import React, { useState } from "react";
export const MainTranslationContexts = React.createContext();

const MainTranslationsProvider = ({ children }) => {
  const [translations, setTranslations] = useState("");
  const addTranslation = (newValue) => {
    setTranslations(newValue);
  };
  return (
    <MainTranslationContexts.Provider value={{ translations, addTranslation }}>
      {children}
    </MainTranslationContexts.Provider>
  );
};

export default MainTranslationsProvider;
