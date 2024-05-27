import { Field } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { IoAttachOutline } from "react-icons/io5";
import upload from "../../dist/webImages/feather-upload-cloud.png";
import EXIF from 'exif-js';
import exifr from 'exifr';
import piexif from 'piexifjs';

function File({ typeFile, label, name, onUpload, imageObj, value, setLongitude,typeFile_name, setLatitude, ...rest }) {
  const ref = useRef(null)

  const [imgPath, setImgPath] = useState();
  useEffect(() => {
    if (typeof (value) === "object") {
      let path = (window.URL || window.webkitURL).createObjectURL(value);
      setImgPath(path);
    } else {

      if (value !== undefined)
        if (value.includes("http") || value.includes("assets") || value.includes("gravatar")) {
          setImgPath(value);
        }
        else {
          let path = ``
          setImgPath(path);
        }

      else {
        setImgPath(value);
      }
    }
  }, [value]);
  const handleDrop = (e) => {
    e.preventDefault();
    let path = (window.URL || window.webkitURL).createObjectURL(e.dataTransfer.files[0]);
    setImgPath(path);
    const file = e.dataTransfer.files[0];
    onUpload(file);
    ref.current.classList.remove("mystyle")
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    let path = (window.URL || window.webkitURL).createObjectURL(file);
    setImgPath(path);
    onUpload(file);

    const img = new Image();
    img.src = path;
    img.onload = function () {
      EXIF.getData(img, async () => {
        const exifData = EXIF.getAllTags(this);
        const gpsData = exifData.GPSLatitude && exifData.GPSLongitude ? {
          latitude: exifData.GPSLatitude,
          longitude: exifData.GPSLongitude,
        } : null;

        let image = exifr.parse(path)
        let latitudeFirstValue = gpsData?.latitude?.[0]?.numerator / gpsData?.latitude?.[0]?.denominator
        let latitudeSecondValue = gpsData?.latitude?.[1]?.numerator / gpsData?.latitude?.[1]?.denominator
        let latitudeThirdValue = gpsData?.latitude?.[2]?.numerator / gpsData?.latitude?.[2]?.denominator
        let longitudeFirstValue = gpsData?.longitude?.[0]?.numerator / gpsData?.longitude?.[0]?.denominator
        let longitudeSecondValue = gpsData?.longitude?.[1]?.numerator / gpsData?.longitude?.[1]?.denominator
        let longitudeThirdValue = gpsData?.longitude?.[2]?.numerator / gpsData?.longitude?.[2]?.denominator
        const metaData = await image
        const data1 = metaData?.latitude
        const data = metaData?.longitude
        const degree1 = Math.floor(data1);
        const minuteWithFraction1 = (data1 - degree1) * 60;
        const minute1 = Math.floor(minuteWithFraction1);
        const second1 = (minuteWithFraction1 - minute1) * 60;

        const degree = Math.floor(data);
        const minuteWithFraction = (data - degree) * 60;
        const minute = Math.floor(minuteWithFraction);
        const second = (minuteWithFraction - minute) * 60;

        let FinalFirstLatitude = `${isNaN(degree1) ? '' : `${degree1}_`}`
        let FinalSecondLatitude = `${isNaN(minute1) ? '' : `${minute1}_`}`
        let FinalThirdLatitude = `${isNaN(second1) ? '' : `${second1}`}`
        let FinalFirstLongitude = `${isNaN(degree) ? '' : `${degree}_`}`
        let FinalSecondLongitude = `${isNaN(minute) ? '' : `${minute}_`}`
        let FinalThirdLongitude = `${isNaN(second) ? '' : `${second}`}`
        if(setLatitude) {
          setLatitude(`${FinalFirstLatitude}${FinalSecondLatitude}${FinalThirdLatitude}`)
        }
        if(setLatitude) {
          setLongitude(`${FinalFirstLongitude}${FinalSecondLongitude}${FinalThirdLongitude}`)
        }

      });

    };

  };
  function convertToDecimalDegrees(coordinates, direction) {
    const [degrees, minutes, seconds] = coordinates;
    let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

    if (direction === 'S' || direction === 'W') {
      decimalDegrees = -decimalDegrees;
    }

    return decimalDegrees;
  }

  return (

    <div className="inputGroup" onDragOver={(e) => {
      e.preventDefault();
      ref.current.classList.add("mystyle")
    }}
      onDrop={handleDrop}>
      <label htmlFor="">{label}</label>
      <Field
        type="file"
        id={name}
        style={{ display: "none" }}
        name={name}
        onChange={(e) => handleUpload(e)}
        accept={typeFile ? typeFile : ''}
      />
      <div ref={ref} className="pictureUpload">
        {typeFile_name !== 'typeFile' ? <img src={imgPath || upload} alt="" /> :
          <div className="w-100">
            <center><b>{imageObj?.name}</b></center>
            <center>{`${imageObj?.name?'Uploaded':"Upload File"}`}</center>
          </div>}
        <div>
          <label htmlFor={name} className="btn btn-upload">
            <IoAttachOutline color={"#cdcdcd"} />
            <span>upload</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default File;
