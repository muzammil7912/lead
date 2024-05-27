import React, { useState } from "react";
export const MainFollowupListContext = React.createContext();

const MainFollowupListProvider = ({ children }) => {
  const [Followuplist, setFollowuplist] = useState("");
  const addFollowupList = (newValue) => {
    setFollowuplist(newValue);
  };
  return (
    <MainFollowupListContext.Provider value={{ Followuplist, addFollowupList }}>
      {children}
    </MainFollowupListContext.Provider>
  );
};

export default MainFollowupListProvider;
