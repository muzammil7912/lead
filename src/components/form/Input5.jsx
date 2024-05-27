import React, { useState } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import styled from "styled-components";

const InputCustom = styled.input`
  border-color: ${(props) => props.error && "#d91111"}!important;
`;

function Input5({ name, required, label, defaultValue, ...rest }) {
    const { errors } = useFormikContext();
    const [field] = useField(name);
    return (
        <>
            <div className="form-group form-control-edited my-2">
                {label && <label htmlFor={name}>{required ? <b>{label}<span style={{ color: 'red' }}> *</span></b> : <b>{label}</b>}</label>}
                <div className="Column-input">
                    <InputCustom name={name} id={name}  {...rest}  {...field} />
                    <div className="input-group-append my-1">
                        <span className="input-group-text input-group-text_new " id="basic-addon2"><strong>px</strong></span>
                    </div>
                </div>
            </div>
            {required && <div className='my-1'>
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

export default Input5;