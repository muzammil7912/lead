import React from 'react'
import { Link } from 'react-router-dom';

function NavigationPill({ items, currentItem, onCurrentItem , showCount}) {
  return (items.map((item, index) => {
        return (
          <li
            className="nav-item"
            key={index}
          >
            {item?.icon}
            <Link
              to={""}
              className={ item.label === currentItem ? "nav-link active" : "nav-link"}
              onClick={(e) => {
                e.preventDefault();
                onCurrentItem(item.label);
              }}
            >
              {item.label}
              {showCount  &&
                <span style={style}>{item.count}</span>
              }
            </Link>
          </li>
        );
      })
      
  )
}
const style = {
    transform: "translateX(10px)"
}
export default NavigationPill