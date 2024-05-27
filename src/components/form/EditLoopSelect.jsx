import React from 'react'
import { Link } from 'react-router-dom';

function EditLoopSelect({ node, handleN }) {
  console.log(node)

  const renderChild = (child) => {
    if (child.childrens) {
      return <EditLoopSelect node={child.childrens} key={child?.id} handleN={handleN} />;
    } else {
      return null;
    }
  };

  return(
    <ul>
      {Object.values(node).map((item, index) => {
        return(
          <li className='sellist' key={index}>
            <Link onClick={(e) => { e.preventDefault(); handleN(e, item) }}>{item?.name}</Link>
            <ul>{renderChild(item)}</ul>
          </li>
        )
      })}
    </ul>
  )
}

export default EditLoopSelect