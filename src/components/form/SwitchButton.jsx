import React from 'react';
import { useField, ErrorMessage, Field } from "formik";


const SwitchButton = ({ name, checkedd, datas, label, ...rest }) => {

    const [field] = useField(name);
    return (
        <div><div className='d-flex gap-1 align-items-center'>
            <div className="form-group">
                <label className="custom-switch">
                    <input
                        type="checkbox" 
                        className="custom-switch-input"
                        {...field}
                        {...rest}
                        value={"on"}
                        checked={checkedd && checkedd == "on" || checkedd == "true" && true  || field.value && field.value.includes("on") }
                        id={`checkbox${field.name}`}
                        
                    />
                    <span className="custom-switch-indicator custom-switch-indicator_new"></span>
                    <span className="custom-switch-description">{label}</span>
                </label>
            </div>
        </div></div>
    )
}

export default SwitchButton