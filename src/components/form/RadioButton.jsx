import React from "react";
import { ErrorMessage, useField } from "formik";
import { useState } from "react";

function RadioButton({ name, label,required, options, radiobtn, ...rest }) {
  const [field] = useField(name);
  const [defVal , setDefVal ] = useState("")
  return ( 
  <>
  <div className="inputGroup">
      {
      label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}> *</span></b>:<b>{label}</b>}</label>}
      <div className="radios">
        {options.map((option) => {
          return (
            <React.Fragment key={option.value}>
              <div className="radio">
                <input
                  {...field}
                  {...rest}
                  type="radio"
                  id={option.value + "Radio"}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value + "Radio"}>{option.value}</label>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
       {required &&  <div className='my-1'>
       <ErrorMessage name={name}>
                   {(msg) => (
                     <div style={{ color: "red", whiteSpace: "nowrap" }}>
                       {msg}
                     </div>
                   )}
         </ErrorMessage>
         </div>}
         </>
  );
}

export default RadioButton;
