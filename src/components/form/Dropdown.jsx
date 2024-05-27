import React from "react";
import Select from "react-select";


function Dropdown({ onChange, list, value, ...rest }) {

  return (
    <>
      <Select
        {...rest}
        options={list}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={onChange}
        value={value}



      />
      {/* <input type="hidden" name="user_timezone" defaultValue={value.label} /> */}
    </>
  );
}

export default Dropdown;