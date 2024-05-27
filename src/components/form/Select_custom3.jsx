import { Field, useField } from 'formik';
import React from 'react'

function Select_Custom_Options3({ name, required, defaultValue, label, selectedd, selectList, Changes, firstSelect, custom_label_name, customer_value_name, ...rest }) {
  const [field] = useField(name);
  return (
    <div className="form-group row">
      <div className='col-sm-3'>
        {label && <label htmlFor={name}>{required ? <b>{label}<span style={{ color: 'red' }}>*</span></b> : <b>{label}</b>}</label>}
      </div>
      <div className={label ? "col-sm-9 p-0 m-0":"col-sm-12 p-0 m-0"}>
        <select onChange={field.onChange}
          onBlur={field.onBlur}
          defaultValue={defaultValue} {...rest} as="Field" name={name} id={name}>
          {firstSelect && <option hidden>{firstSelect}</option>}
          {Array.isArray(selectList) && selectList.map((item, index) => {
            return (
              <option value={item[customer_value_name]} key={index}   >{item[custom_label_name]}</option>
            )
          })}
        </select>
      </div>
    </div>
  );
}

export default Select_Custom_Options3