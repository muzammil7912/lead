import { Field, useField } from 'formik';
import React from 'react'

function Select3({ name,required, label,selectedd,defaultValue,selectList,firstSelect, ...rest }) {
    const [field] = useField(name);
  return (
    <div className="form-group my-2">
    {label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>}
    <select 
     onChange={field.onChange}
     onBlur={field.onBlur}
      defaultValue={defaultValue}
    {...rest}   as="Field" name={name} id={name}  >
   {firstSelect &&  <option  hidden>{firstSelect}</option>}
    {selectList && selectList.map(item => {
        return (

            <option  value={item} key={item} >{item}</option>
        )
    })} 
       </select>
  </div>
  )
}

export default Select3