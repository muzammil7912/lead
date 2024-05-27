import React, { useState } from "react";
export const MainEditCalenderContext = React.createContext();

const MainEditCalenderProvider = ({ children }) => {
  const [calenderdetails, setCalenderdetails] = useState({
    EventTitle: "",
    EventType: "",
    EventCalendar: "",
    EventCalendar: "",
    HEXCODE: "",
    startdate: "",
    enddate: "",
  });
  const addcalenderdetails = (newValue) => {
    setCalenderdetails(newValue);
  };
  return (
    <MainEditCalenderContext.Provider value={{ calenderdetails, addcalenderdetails }}>
      {children}
    </MainEditCalenderContext.Provider>
  );
};

export default MainEditCalenderProvider;
