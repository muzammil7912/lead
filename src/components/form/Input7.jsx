import React from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";

const InputCustom = styled.input`
  border-color: ${(props) => props.error && "#d91111"}!important;
  padding-top: 15px;
  padding-bottom: 15px;
  outline: none !important;
  border: 1px solid gray !important;
`;

function Input7({ name, required, label, ...rest }) {
    const { errors } = useFormikContext();
    const [field] = useField(name);
    return (
        <div className="row mb-5">
            {/* {label && <label className="col-sm-4 col-form-label" htmlFor={name}>{required ? <b>{label}<span style={{ color: 'red' }}>*</span></b> : <b>{label}</b>}</label>}
            <div className="col-sm-8">
                <InputCustom id={name}  {...field} {...rest} />
            </div> */}
            <div className="position-relative">
                <div className="label-header-7">
                    <span>{label && label}</span>
                </div>
                <InputCustom id={name}  {...field} {...rest} />
            </div>
        </div>
    );
}

export default Input7;