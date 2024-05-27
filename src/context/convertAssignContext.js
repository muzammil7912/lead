import React, { createContext, useState } from "react";

// Create a new context
export const isConvertAssign = React.createContext();

// Create a provider for the context
export const ConvertAssignProvider = (props) => {
    const [convertAssign, settransData] = useState(false);
    const [convertAssignDefault, settransDataDefault] = useState({});
    const setconvertAssign = (newValue) => {
      settransData(newValue);
    };
    const setconvertAssignDefault = (newValue) => {
        settransDataDefault(newValue);
      };
  return (
    <isConvertAssign.Provider value={{ convertAssign, setconvertAssign ,setconvertAssignDefault,convertAssignDefault}}>
      {props.children}
    </isConvertAssign.Provider>
  );
};