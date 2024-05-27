import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { Field, useField, useFormikContext } from "formik";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Intl({ name, label, hiddenVal, updatess, datas, ...rest }) {
  return (
    <>
      <div className='form-group relative my-2'>
        {label && <label htmlFor={name}><b>{label}</b></label>}
        <PhoneInput
          inputProps={{
            name: name,
            id: name,
          }}
          onChange={(phone, country) => {
            let num = phone;
            if (num) {
              updatess(num)
            }
          }}
          value={datas}
          country={'us'}
          preferredCountries={['us', 'br', 'pt']} // example of preferred countries
        />
      </div>
    </>
  )
}

export default Intl