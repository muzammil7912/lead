import React, { useState } from "react";
export const MainMeetingListContext = React.createContext();

const MainMeetingListProvider = ({ children }) => {
  const [Meetinglist, setMeetinglist] = useState("");
  const addMeetingList = (newValue) => {
    setMeetinglist(newValue);
  };
  return (
    <MainMeetingListContext.Provider value={{ Meetinglist, addMeetingList }}>
      {children}
    </MainMeetingListContext.Provider>
  );
};

export default MainMeetingListProvider;
