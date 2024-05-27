import React from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

const InputCustom = styled.input`
  border-color: ${(props) => props.error && "#d91111"}!important;
`;

function Input6({ name, required, label, ...rest }) {
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="row w-100 p-0 m-0 align-items-center">
      {label && <label className="col-sm-3 " htmlFor={name}>{required ? <b>{label}<span style={{ color: 'red' }}>*</span></b> : <b>{label}</b>}</label>}
      {label ?
        <div className="col-sm-8 m-0 p-0">
          <InputCustom className="w-100" id={name}  {...field} {...rest} />
        </div>
        :
        <div className="col-sm-12 m-0 p-0">
          <InputCustom className="w-100" id={name}  {...field} {...rest} />
        </div>
      }

    </div>
  );
}

export default Input6;