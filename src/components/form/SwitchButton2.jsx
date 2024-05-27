import React from 'react';
import { useField, ErrorMessage, Field } from "formik";


const SwitchButton2 = ({ name, checkedd,checkeddupdate, datas, label, ...rest }) => {
const handleChange = () => {
    if(checkedd == "on"){
        checkeddupdate("off")
    }
    else {
        checkeddupdate("on")
    }

}
    return (
        <div><div className='d-flex gap-1 align-items-center'>
            <div className="form-group">
                <label className="custom-switch">
                    <input
                        type="checkbox" 
                        className="custom-switch-input"
                        value={"on"}
                        onChange={() => handleChange()}
                        checked={checkedd === "on"}
                        id={`checkbox${name}`}
                        
                    />
                    <span className="custom-switch-indicator custom-switch-indicator_new"></span>
                    <span className="custom-switch-description">{label}</span>
                </label>
            </div>
        </div></div>
    )
}

export default SwitchButton2