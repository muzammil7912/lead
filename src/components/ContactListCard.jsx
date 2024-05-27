import React,{useContext} from 'react'
import { Link } from "react-router-dom";
import { MainAuthPermissionsContext } from '../context/MainAuthPermissionsContext';
import config from "../services/config.json";

function ContactListCard({viewLink,deletes, lists }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const handleError = (e) => {
    if(permissions ["system-default-avatar-image"]?.setting_value) {
      e.target.src = `${config.baseurl2}${permissions ["system-default-avatar-image"]?.setting_value}`

    }
    else {
      e.target.src = `https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160`
    }
  } 
      return Array.isArray(lists) ? (
        lists?.map((items, index) => {
          return (
            <div className=" col-12" key={index}>
              <div className="card">

                <div className="card-body ribbon">
                    <div className="card-status"></div>
                <div className="starBox">
                 <Link  className="mail-star"><i className="fa fa-star" style={{"color":`${items?.type_color ?? "#00A9BD"} `}}></i></Link>
                  </div>
                  <div className="card_img">
                  <img  className="rounded-circle img-thumbnail w100" onError={handleError}
                src={items?.avatar && items?.avatar.includes("http") ? items?.avatar : `${config.baseurl2}${items?.avatar}`} 
                alt="" />
                  </div>
                  <div className="card_heading">
                    <h6 className="mt-3 mb-0">
                    <Link to={`${viewLink}${items?.module?.toLowerCase()}/view/${items?.id}`}>{items?.fullname}</Link>
                    </h6>
                    <span>{items?.number}</span>
                  </div>
                  <div className="emailBox">
                    <span>{items?.email}</span>
                  </div>
                  <div className="leadst">
                    <ul className="list">
                      <li>
                        <span>{items?.fname}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-1 socialBtn">
                  <a to={`tel:${items?.number}`}>
                      <i className="fa fa-phone"></i>
                    </a>
                    &nbsp;
                    <a href={`mailto:${items?.email}`}>
                      <i className="fa fa-envelope"></i>
                    </a>
                   
                    &nbsp;
                    <Link  onClick={() => deletes(items)} >
                      <i className="fa fa-trash"></i>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No Data</div>
      );

}

export default ContactListCard