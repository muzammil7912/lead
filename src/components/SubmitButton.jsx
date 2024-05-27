import React, { useState } from 'react'

function SubmitButton({props,buttonLoading}) {
  return (
    <button  type='submit'disabled={buttonLoading && true} className={props.class}>{buttonLoading ? "Submitting" : props.text}</button>
  )
}

export default SubmitButton;