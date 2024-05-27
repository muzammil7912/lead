import { Field } from "formik";
import React, { useState, useEffect } from "react";
import upload from "../../dist/webImages/feather-upload-cloud.png";

function File2({ brand,label, name, onUpload, value ,...rest}) {

  const [imgPath, setImgPath] = useState();
  useEffect(() => {
    if (typeof value === "object") {
      let path = (window.URL || window.webkitURL).createObjectURL(value);
      setImgPath(path);
    } else {
     
      if(value !==undefined)
        if( value.includes("react_lead")){
          setImgPath(value);
        }
        else{
          let path = ``
          setImgPath(path);
        } 
      
      else{
        setImgPath(value);
      }
    }
  }, [value]);

  const handleUpload = (e) => {
    let path = (window.URL || window.webkitURL).createObjectURL( e.target.files[0]);
    setImgPath(path);
    onUpload(e.target.files[0]);
  };

  return (
    
    <div className="inputGroup">
      <label htmlFor="">{label}</label>
      <input
        type="file"
        id={name}
        style={{ display: "none" }}
        name={name}
        onChange={(e) => handleUpload(e)}
      />
      <div className=" file2upload">
        <img src={ imgPath  || upload}   onError={(e) => upload} alt="" />
        <div className="">
        <label htmlFor={name} className="btn btn-upload file2div" >
          <div className="fileinnerdiv">
            <h6 className="m-0">{brand}</h6>
            <div>
          <i className="fa-regular fa-pen-to-square" />
          </div>
          </div>
        </label>
        </div>
      </div>
      
    </div>
  );
}

export default File2;
