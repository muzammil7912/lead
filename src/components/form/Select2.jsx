import { Field, useField } from 'formik';
import React from 'react'

function Select2({ name,required, label,selectList,firstSelect, ...rest }) {
    const [field] = useField(name);
    return (
        <div className="form-group row my-1">
        {label && <label className='col-sm-4 col-form-label' htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>}
        <div className="col-sm-8">
        <Field as="select" id={name}  {...field} {...rest}>
       {firstSelect &&  <option value="">{firstSelect}</option>}
        {selectList && selectList.map((item,index) => {
            return (
                <option value={item.value} key={index}>{item.text}</option>
            )
        })} 
        {

        }
           </Field>
           </div>
      </div>
    );
}

export default Select2