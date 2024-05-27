import React from 'react'
import { Link } from 'react-router-dom';

function Navigation({ items, currentItem, onCurrentItem}) {
  return ( Object.keys(items).map(
    function (key, i) {
      return (
            <Link
              to={""}
              key={i}
              className={ items[key].name === currentItem ? "nav-link d-flex gap-2 active" : "nav-link d-flex gap-2"}
              onClick={(e) => {
                e.preventDefault();
                onCurrentItem(items[key].name);
              }}
            >
                <i className={`${items[key].icon}`}></i>
              {items[key].name}
            </Link>
        );
      })
      
  )
}
const style = {
    transform: "translateX(10px)"
}
export default Navigation