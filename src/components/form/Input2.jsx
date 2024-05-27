import React from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

const InputCustom = styled.input`
  border-color: ${(props) => props.error && "#d91111"}!important;
`;

function Input2({ name,required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="form-group row my-2">
      {label && <label className="col-sm-4 col-form-label" htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>}
      <div className="col-sm-8">
      <InputCustom  id={name}  {...field} {...rest} />
      </div>
    </div>
  );
}

export default Input2;
