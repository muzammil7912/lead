import React, { useState } from "react";
export const MainCalendarListContext = React.createContext();

const MainCalendarListProvider = ({ children }) => {
  const [calendarlist, setCalendarlist] = useState("");
  const addCalendarList = (newValue) => {
    setCalendarlist(newValue);
  };
  return (
    <MainCalendarListContext.Provider value={{ calendarlist, addCalendarList }}>
      {children}
    </MainCalendarListContext.Provider>
  );
};

export default MainCalendarListProvider;
