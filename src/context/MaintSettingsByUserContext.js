import React, { useState } from "react";
export const MaintSettingsByUserContext = React.createContext();

const MaintSettingsByUserProvider = ({ children }) => {
  const [systemSetting, setSystemSetting] = useState("");
  const addSystemSetting = (newValue) => {
    setSystemSetting(newValue);
  };
  return (
    <MaintSettingsByUserContext.Provider value={{ systemSetting, addSystemSetting }}>
      {children}
    </MaintSettingsByUserContext.Provider>
  );
};

export default MaintSettingsByUserProvider;
