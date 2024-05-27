import React from 'react'
import { useField, ErrorMessage } from "formik";


const Checkbox1 = ({ name,checkedd,datas, label, ...rest }) => {

    const [field] = useField(name);


    return (
        <label className="custom-control custom-checkbox">
            <input
                type="checkbox"
                name={name}
                className="custom-control-input"
                value={checkedd}
                id={`checkbox${field.name}`}
                defaultChecked={checkedd == 1 ? true : false} />
            <span className="custom-control-label">{label}</span>
        </label>

    )
}

export default Checkbox1