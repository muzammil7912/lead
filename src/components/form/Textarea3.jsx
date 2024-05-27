import React from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

const TextareaCustom = styled.textarea`
  border-color: ${(props) => props.error && "#d91111"}!important;
  border-radius: 1rem !important;
`;

function Textarea3({ name,required,values, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="form-group row my-1">
      {label && (
        <div className="">
          <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>
        </div>
      )}
      <div  className="" >
        <TextareaCustom
          id={name}
          error={errors[name]}
          {...field}
          {...rest}
        >{values && values}</TextareaCustom>
      </div>
    </div>
  );
}

export default Textarea3;