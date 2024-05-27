import React, { useState } from "react";
export const MainProjectListContext = React.createContext();

const MainProjectListProvider = ({ children }) => {
  const [projectlist, setProjectlist] = useState("");
  const addProjectList = (newValue) => {
    setProjectlist(newValue);
  };
  return (
    <MainProjectListContext.Provider value={{ projectlist, addProjectList }}>
      {children}
    </MainProjectListContext.Provider>
  );
};

export default MainProjectListProvider;
