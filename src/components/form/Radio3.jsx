import React from "react";
import { ErrorMessage, useField } from "formik";

function Radio3({ name, label,required,values, options, radiobtn, ...rest }) {
  const [field] = useField(name);
  return ( 
  <>
  <div className="inputGroup">
      {
      label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}> *</span></b>:<b>{label}</b>}</label>}
      <div className="radios">
        {options.map(option => {
          return (
            <React.Fragment key={option}>
              <div className="radio">
              <label htmlFor={option + name}>
                <input
                  {...field}
                  {...rest}
                  type="radio"
                  id={option + name}
                  value={option}
                  defaultChecked={values ? values ===  option: field.value === option}
                />
               {option}</label>
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

export default Radio3;
