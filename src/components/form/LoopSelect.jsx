import React from 'react'
import { Link } from 'react-router-dom';

function LoopSelect({ node, handleN }) {

  if (node?.childrens) {
    return (
      <li key={node?.id} className='sellist'>
        <Link onClick={(e) => { e.preventDefault(); handleN(e, node) }}>{node?.name}</Link>
        <ul>
          {Object.values(node.childrens).map(child => (
            <LoopSelect node={child} key={child?.id} handleN={handleN} />
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li key={node?.id} className='sellist'>
        <Link onClick={(e) => { e.preventDefault(); handleN(e, node) }}>{node?.name}</Link>
      </li>
    );
  }
}

export default LoopSelect

