import React from 'react'
import {  useField } from "formik";
function ProfileCheckbox({dataprop,name,datas,updateClick,  ...rest }) {
    const [field] = useField(name);
  return (
    <div className='d-flex gap-1 align-items-center'>
    <div className="tw-toggle">
        <input type="radio"  {...field} {...rest} onClick={(e) => updateClick(e)} value="false" placeholder={field.value}  checked={field.value == "false" ? true : false}    className={`${datas && datas == "false" && "active"}`} />
        <label className="toggle toggle-yes"><i className="fa fa-circle"></i></label>
        <input type="radio"  {...field} {...rest}  value="-1" onClick={(e) => updateClick(e)} placeholder={field.value}  checked={field.value == "-1" ? true : false}  className={`${datas && datas == "-1" && "active"}`} />
        <label className="toggle toggle-yes"><i className="fa fa-circle"></i></label>
        <input type="radio"  {...field} {...rest}  value="true" onClick={(e) => updateClick(e)} placeholder={field.value}  checked={field.value == "true" ? true : false}  className={`${datas && datas == "true" && "active"}`} />
        <label className="toggle toggle-yes"><i className="fa fa-circle"></i></label>
        <span></span>
    </div>
    <span className="flds">{dataprop}</span>
</div>
  )
}

export default ProfileCheckbox