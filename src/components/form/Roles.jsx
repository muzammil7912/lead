import React, { useState } from 'react'
import { StringConvert } from '../StringConvert'

function Roles({rolesData}) {
    const [buttonToggle, setbuttonToggle] = useState(false);
const handleClick = () => {
    setbuttonToggle(true)
}
  return (
    <div className="form-group form-group useredits  my-2">
    <label className="">Role</label>
    <div className="dropdown div-block" id="organizationbtn">
        <button onClick={handleClick} className="btn btn-default btn-block dropdown-toggle" type="button" id="dropdownMenuButton">--Select--</button>
        <div className={`dropdown-menu ${buttonToggle && "active"}`} id="organization">
    { StringConvert(rolesData)}
        </div>
    </div>
    <input  type="hidden" name="urole"  />
</div>
  )
}

export default Roles