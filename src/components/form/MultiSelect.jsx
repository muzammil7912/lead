

function Select({ name,required, value, label,selectedd,selectList,Changes,firstSelect, ...rest }) {

    return (
      <div className="form-group my-2">
        {label && <label htmlFor={name}>{required? <b>{label}<span style={{color:'red'}}>*</span></b>:<b>{label}</b>}</label>}
        <select  {...rest}     style={{"height": "157px"}} multiple={true} name={name} id={name} value={value} >
       {firstSelect &&  <option  hidden>{firstSelect}</option>}
        {selectList && selectList.map((item,index) => {
            return (
                <option  value={item.value}  key={index}   >{item.label}</option>
            )
        })} 
           </select>
      </div>
    );
}

export default Select