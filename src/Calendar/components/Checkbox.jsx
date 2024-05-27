import React from "react";
import { useField, ErrorMessage } from "formik";

function Checkbox({ name, label, values, options,required, ...rest }) {
  const [field] = useField(name);

  return (
    <div className="inputGroup">
      {label && (
        <div className="label">
         { label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}> *</span></b>:<b>{label}</b>}</label>}
        </div>
      )}
      <div className="field">
        {options.map((option,index) => {
          return (
            <div className="d-flex gap-1 align-items-start" key={option}>
             <label className="custom-control custom-checkbox" htmlFor={`${name}${index}`}>
              <input
                {...field}
                {...rest}
                type="checkbox"
                id={`${name}${index}`}
                value={option}
                className={"custom-control-input"}
                defaultChecked={values ? values == "1" : field.value && field.value.includes(option)}
              />
              <span className="custom-control-label">{option}</span></label>
            </div>
          );
        })}

{required &&  <div className='my-1'>
      <ErrorMessage name={name}>
                  {(msg) => (
                    <div style={{ color: "red", whiteSpace: "nowrap" }}>
                      {msg}
                    </div>
                  )}
        </ErrorMessage>
      </div>}
      </div>
    </div>
  );
}
export default Checkbox;
