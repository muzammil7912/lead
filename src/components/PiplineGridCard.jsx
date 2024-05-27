import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { MainAuthPermissionsContext } from '../context/MainAuthPermissionsContext';
import { MainLeadPermissionContext } from '../context/MainLeadPermissionContext';
import justcallLogo from '../dist/webImages/justcall-logo.webp';

function PiplineGridCard({viewLink, editLink, lists,deletes }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
    return !lists.message ? (
      lists?.map((items, index) => {
        return (
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6" key={index}>
            <div className="card">
              <div className="card-body text-center ribbon">
                <div className="card_heading">
                  <h6 className="mt-3 mb-0">
                    <Link to={`${viewLink}${items?.op_id}`}>{items?.opportunity_title}</Link>
                  </h6>
                </div>
                <div className="dateBox"><span>Forecast: {items?.forecasted_close_date}</span></div>
                <div className="contactBox"><span>Contact: {items?.opportunity_contact_name}</span></div>
               
                <div className="leadst">
                  <ul className="list">
                    <li>
                      <span>New</span>
                    </li>
                    <li>
                      <div>Simone Sales Team1</div>
                    </li>
                  </ul>
                </div>
                <div className="mb-1 socialBtn">
                <a href={`mailto:${items?.opportunity_contact_email}`}>
                    <i className="fa fa-envelope"></i>
                  </a>
                  &nbsp;
                  <a href={`tel:${items?.opportunity_contact_mobile}`}>
                    <i className="fa fa-phone"></i>
                  </a>
                  &nbsp;
                  <a href={`sms:${items?.opportunity_contact_mobile}`}>
                    <i className="fa fa-mobile"></i>
                  </a>
                  &nbsp;
                  <a href={`https://api.whatsapp.com/send?phone=${items?.opportunity_contact_mobile}`} target={"_blank"}>
                    <i className="fa fa-whatsapp"></i>
                  </a>
                  &nbsp;
                  <a
                     href={`https://justcall.io/app/macapp/dialpad_app.php?numbers=&${items?.opportunity_contact_mobile};`}
                    target={"_blank"}
                  ><img alt="" src={justcallLogo} style={{ width: '15px' }} />
                  </a>
                </div>
                <div className="editdetabtn d-flex justify-content-center gap-1">
                 {
                  (leadPermission?.super_admin ||  leadPermission?.opportunities?.edit === "1")
                  &&
                  (leadPermission?.super_admin) ? 
                  <Link
                     to={`${editLink}${items?.op_id}`}
                     className="btn btn-default btn-sm"
                   >
                     <i className="fa fa-edit"></i> Edit
                   </Link>
                   : 
                    ((items.opportunity_follower) && (items.opportunity_follower.split(",").includes(permissions.id) && items?.parent_status !== "1")) ?
                    "" :  
                     <Link
                     to={`${editLink}${items?.op_id}`}
                     className="btn btn-default btn-sm"
                   >
                     <i className="fa fa-edit"></i> Edit
                   </Link>
                    }
                  {
                    (leadPermission?.super_admin ||  leadPermission?.opportunities?.delete === "1")
                    &&
                    <Link
                    className="btn btn-default btn-sm Dlt_leadid"
                    onClick={() => deletes(items)}
                  >
                    <i className="fa fa-trash-o"></i>Delete
                  </Link>
                  }
                 
                </div>
                <div className="row text-center mt-4 leadbot">
                  <div className="col-6 border-right">
                    <label className="mb-0">VALUE</label>
                    <h4 className="font-16">{items?.opportunity_value} </h4>
                  </div>
                  <div className="col-6">
                    <label className="mb-0">STAGE</label>
                    <h4 className="font-16"> {items?.name}</h4>
                  </div>
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
export default PiplineGridCard