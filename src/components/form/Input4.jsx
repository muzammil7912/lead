import React from 'react'
import {  useField } from "formik";
function Input4({name,defaultd,  ...rest }) {
    const [field] = useField(name);
  return (
    <input  type="checkbox"   name={name} className={`lead_ovw`} value="true" defaultChecked={defaultd && defaultd == "true" ? true : false} {...field} {...rest} />
  )
}

export default Input4