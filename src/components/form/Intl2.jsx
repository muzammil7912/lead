import React from 'react';
import PhoneInput from 'react-phone-input-2';

function Intl2({ name,required, label,hiddenVal,updatess, ...rest }) {
  return (
    <>
    <div className='form-group relative my-2 row'>
      {label && <label className="col-sm-4 col-form-label"><b> {label}</b></label>}
      <div className="col-sm-8">
      <PhoneInput
   inputProps={{
    name:name,
    id: name,
   }}
  onChange={(phone,country) => {
    let num = country.dialCode + phone;
    if(num) {
      updatess(num)
    }
  }}
  country={'us'}
  preferredCountries={['us', 'br', 'pt']} // example of preferred countries
/>
</div>
  </div>
  </>
  )
}

export default Intl2