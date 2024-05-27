import React,{useState} from 'react'

function Role({obj}) {
   
  return (
   <>
    <option value={obj.id}>{obj.name}</option>
      {obj.childrens && Object.values(obj.childrens).map((child,index) => (
         <Role key={index} obj={child} />
          ))}
          </>

  )
}

export default Role