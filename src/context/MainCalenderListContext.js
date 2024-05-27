import React, { useState } from "react";
export const MainCalenderListContext = React.createContext();

const MainCalenderListProvider = ({ children }) => {
  const [calenderlist, setCalenderlist] = useState("");
  const addCalenderList = (newValue) => {
    setCalenderlist(newValue);
  };
  return (
    <MainCalenderListContext.Provider value={{ calenderlist, addCalenderList }}>
      {children}
    </MainCalenderListContext.Provider>
  );
};

export default MainCalenderListProvider;
