import React from "react";
import { useField, ErrorMessage } from "formik";

function Checkbox2({ name, checkedd, datas, label, ...rest }) {
  const [field] = useField(name);

  return (
    <label className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        {...field}
        {...rest}
        type="checkbox"
        id={`checkbox${field.name}`}
        value="1"
        defaultChecked={checkedd && checkedd == 1 && true} />
      <span className="custom-control-label">{label} </span></label>
  );
}
export default Checkbox2;
