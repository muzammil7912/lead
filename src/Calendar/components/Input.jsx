function Input({ name,required, label,defaultValue, ...rest }) {
    const { errors } = useFormikContext();
    const [field] = useField(name);
    // error={errors[name]}
    return (
      <>
      <div className="form-group my-2">
   {label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}> *</span></b>:<b>{label}</b>}</label>}
        <InputCustom  id={name}  {...field} {...rest}  value={field.value ? field.value : "" } />
      </div>
      {required &&  <div className='my-1'>
        <ErrorMessage name={name}>
                    {(msg) => (
                      <div style={{ color: "red", whiteSpace: "nowrap" }}>
                        {msg}
                      </div>
                    )}
          </ErrorMessage>
        </div>}
       
        </>
    );
  }
  
  export default Input;