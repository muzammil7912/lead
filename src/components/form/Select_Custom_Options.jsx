import { Field, useField } from 'formik';
import React from 'react'

function Select_Custom_Options({ name, align, required, defaultValue, label, selectedd, selectList, Changes, firstSelect, custom_label_name, customer_value_name, ...rest }) {
  const [field] = useField(name);
  return (
    <div className={`form-group ${align ? align : 'my-2'}`}>
      {label && <label htmlFor={name}>{required ? <b>{label}<span style={{ color: 'red' }}>*</span></b> : <b>{label}</b>}</label>}
      <select onChange={field.onChange}
        onBlur={field.onBlur}
         defaultValue={defaultValue} {...rest}    as="Field" name={name} id={name}>
          {firstSelect &&  <option  hidden>{firstSelect}</option>}
          {Array.isArray(selectList) &&  selectList.map((item,index) => {
            return (
                <option  value={item[customer_value_name]}  key={index}   >{item[custom_label_name] && item[custom_label_name].replace(/_/g, ' ')}</option>
            )
        })} 
           </select>
      </div>
    );
}

export default Select_Custom_Options