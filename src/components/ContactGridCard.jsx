import React,{useContext} from 'react'
import { Link } from "react-router-dom";
import { MainAuthPermissionsContext } from '../context/MainAuthPermissionsContext';
import { MainLeadPermissionContext } from '../context/MainLeadPermissionContext';
import config from "../services/config.json";
function ContactGridCard({viewLink,deletes, lists }) {
  const { leadPermission } = useContext(MainLeadPermissionContext);
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
            <div className="all_contactsPage col-xl-3 col-lg-3 col-md-6 col-sm-6" key={index}>
              <div className="card">
                <div className="card-body ribbon">
                    <div className="card-status"></div>
                  <div className="mb-3 pimg">
                  <img  className="rounded-circle img-thumbnail w100" onError={handleError}
                src={items?.avatar && items?.avatar.includes("http") ? items?.avatar : `${config.baseurl2}${items?.avatar}`} 
                alt=""
                />
                  </div>
                  <div className="card_heading">
                    <h6 className="mt-3 mb-0">
                      <Link to={`${viewLink}${items.module ? items.module.toLowerCase()+ `/view/${items.id}` : `user/${items.id}`}`}>{items.module ? items.fullname : `${items.f_name} ${items?.l_name}`}</Link>
                    </h6>
                  </div>
                  <div className="emailBox">
                    <span>{items?.email}</span>
                  </div>
                  <div className="editdetabtn my-3 d-flex justify-content-center gap-1">
              {!items?.urole &&  (leadPermission?.super_admin || !items?.lead_followers ? true :  leadPermission[`${items.module ? items.module.toLowerCase() : "user_module"}`]?.edit === "1" ) ?
              
                 <Link
                 to={`${viewLink}${items.module ? items.module.toLowerCase() : "users"}/edit/${items.id}`}
                 className="btn btn-default btn-sm"
               ><i className="fa fa-edit"></i> Edit
               </Link>
               : ""
                }
               
                {!items?.urole &&  (leadPermission?.super_admin || leadPermission[`${items.module ? items.module.toLowerCase() : "user_module"}`]?.delete === "1") ?
                <Link
                className="btn btn-default btn-sm Dlt_leadid"
                onClick={() => deletes(items)}
              >
                <i className="fa fa-trash-o"></i>Delete
              </Link>
              : ""
                }
                
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

export default ContactGridCard