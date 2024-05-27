import React, { useRef } from "react";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";
import { IoEyeOutline } from "react-icons/io5";
const InputCustom = styled.input`
  border-color: ${(props) => props.error && "#d91111"}!important;
`;

function Password({ name,required, label , ...rest}) {
  const ref = useRef(0);
  let showPassword = false
  const hidePass = (e) =>{
    ref.current.type = "password"
    showPassword = false
  }
  const showPass = (e)=>{
  ref.current.type = "text"
    showPassword = true
  }
  const { errors } = useFormikContext();
  const [field] = useField(name);
  return (
    <div className="form-group my-2">
      {label && <label htmlFor={name}> {required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>}
      <div className="password">
        <InputCustom
          id={name}
          error={errors[name]}
          autoComplete="off"
          ref={ref}
          type="password" 
          {...field}
          {...rest}
        />
        <span>
        <IoEyeOutline color={"#cdcdcd"}  onClick={(e)=> !showPassword ? showPass(e) : hidePass(e)}  />
        </span>
      </div>
    </div>
  );
}

export default Password;
