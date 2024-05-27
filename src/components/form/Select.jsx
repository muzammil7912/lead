import React from 'react'
import {  useField } from 'formik';

function Select({ name,required, align, label,selectedd,defaultValue,selectList,Changes,firstSelect, ...rest }) {
    const [field] = useField(name);

    return (
      <div className={`form-group ${align ? align : 'my-2'}`}>
  
        {label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>}
        <select
        onChange={field.onChange}
        onBlur={field.onBlur}
         defaultValue={defaultValue}
         {...rest}    as="Field" name={name} id={name}  >
       {firstSelect &&  <option  hidden>{firstSelect}</option>}
        {Array.isArray(selectList) && selectList.map((item,index) => {
            return (
                <option  value={item.value}  key={index}   >{item.label}</option>
            )
        })} 
           </select>
      </div>
    );
}

export default Select