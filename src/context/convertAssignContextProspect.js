import React, { createContext, useState } from "react";

// Create a new context
export const isConvertAssignProspect = React.createContext();

// Create a provider for the context
export const ConvertAssignProspectProvider = (props) => {
    const [convertAssignProspect, settransData] = useState(false);
    const [convertAssignProspectDefault, settransDataDefault] = useState({});
    const setconvertAssignProspect = (newValue) => {
      settransData(newValue);
    };
    const setconvertAssignProspectDefault = (newValue) => {
        settransDataDefault(newValue);
      };
  return (
    <isConvertAssignProspect.Provider value={{ convertAssignProspect, setconvertAssignProspect ,setconvertAssignProspectDefault,convertAssignProspectDefault}}>
      {props.children}
    </isConvertAssignProspect.Provider>
  );
};