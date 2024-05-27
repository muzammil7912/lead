import React from 'react';
import { useField, ErrorMessage, Field } from "formik";


const SwitchCheck = ({ name, options, datas, MainLabel, ...rest }) => {

    const [field] = useField(name);
    return (
        <div className="form-group">
            <label className="form-label">{MainLabel}</label>
            <div className="form-group">
                {options.map((option, index) => {
                    return (
                        <label className="custom-switch" key={index}>
                            <input
                                type="checkbox"
                                className="custom-switch-input"
                                {...field}
                                {...rest}
                                id={option.label + name}
                                value={option.value}
                                defaultChecked={field.value === option.value || field.value && field.value.includes(option)}
                            />
                            <span className="custom-switch-indicator custom-switch-indicator_new"></span>
                            <span className="custom-switch-description">{option.label}</span>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default SwitchCheck