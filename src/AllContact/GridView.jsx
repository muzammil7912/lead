import React from 'react'
import config from "../services/config.json";
import ContactGridCard from '../components/ContactGridCard';
function GridView({data,deletee}) {
  return (
    <div className="row clearfix">{
    data && <ContactGridCard  deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}`}  lists={data} />}
  </div>
  )
}

export default GridView