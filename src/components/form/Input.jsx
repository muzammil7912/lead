import React, { useState } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import styled from "styled-components";

const InputCustom = styled.input`
  border-color: ${(props) => props.error && "#d91111"}!important;
`;

function Input({ name,required, label,defaultValue, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <>
    <div className="form-group my-2">
 {label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}> *</span></b>:<b>{label}</b>}</label>}
      <InputCustom name={name} defaultValue={defaultValue&&defaultValue}  id={name} onChange={field.onChange} onBlur={field.onBlur} {...rest}  />
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

export default Input;
