import React, { useState } from "react";
export const MainCalenderIdContext = React.createContext();

const MainCalenderIdProvider = ({ children }) => {
  const [calendarId, setCalendarId] = useState({
    parentId : "00",
    ChildId : "00"
  });
  const addCalendarID = (newValue) => {
    setCalendarId(newValue);
  };
  return (
    <MainCalenderIdContext.Provider value={{ calendarId, addCalendarID }}>
      {children}
    </MainCalenderIdContext.Provider>
  );
};

export default MainCalenderIdProvider;
