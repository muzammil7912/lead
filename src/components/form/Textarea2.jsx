import React from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

const TextareaCustom = styled.textarea`
  border-color: ${(props) => props.error && "#d91111"}!important;
  border-radius: 1rem !important;
`;

function Textarea2({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="form-group row my-1">
      {label && (
        <div className="col-sm-4 col-form-label">
          <label htmlFor={name}> {required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>
        </div>
      )}
      <div  className="col-sm-8" >
        <TextareaCustom
          id={name}
          error={errors[name]}
          {...field}
          {...rest}
        />
      </div>
    </div>
  );
}

export default Textarea2;