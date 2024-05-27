import React, { useContext } from "react";
import { Link } from "react-router-dom";
import justcallLogo from '../../dist/webImages/justcall-logo.webp';
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
import config from "../../services/config.json";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
function CardGrid({ stage, validates, hanValidate, lead, viewLink, editLink, lists, deletes }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const handleError = (e) => {
    if (permissions["system-default-avatar-image"]?.setting_value) {
      e.target.src = `${config.baseurl2}${permissions["system-default-avatar-image"]?.setting_value}`

    }
    else {
      e.target.src = `https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160`
    }
  }
  return !lists.message ? (
    lists?.map((items, index) => {
      return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6" key={index}>
          <div className="card">
            <div className="card-body text-center ribbon p-2">
              {leadPermission?.super_admin === true ?
                ""
                : permissions.id == items.lead_assigned_to ?
                  <div className="ribbon-box own-box" title="Assigned Lead (Your Lead)"><i className="fa fa-user"></i></div>
                  :
                  <div className="ribbon-box pink" title={`Assigned Lead  (${items?.uname})`}><i className="fa fa-share"></i></div>
              }
              {
                leadPermission?.super_admin === true ?
                  "" :
                  items.lead_followers &&
                  (items.lead_followers.split(",").includes(permissions.id) && !items.parent_ids.split(",").includes(permissions.id)) &&
                  <div className="ribbon-box ribbon-box-follow indigo" title="Following Lead"><i className="fa fa-users"></i></div>
              }
              <div className="card_img">
                <img className="rounded-circle img-thumbnail w100" onError={handleError}
                  src={items?.avatar && items?.avatar.includes("http") ? items?.avatar : `${config.baseurl2}${items?.avatar}`}
                  alt=""
                />
              </div>
              <div className="card_heading">
                <h6 className="mt-3 mb-0">
                  {(leadPermission?.super_admin || leadPermission[lead]?.view === "1") ?
                    <Link to={`${viewLink}${items?.leadid}`}>{items?.fullname}</Link>
                    : <span>{items?.fullname}</span>}
                </h6>
              </div>
              <span className="emailBox">{items?.email ? items?.email : ""}</span>
              <span className="numberBox">{items?.number ? items?.number : ""}</span>
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
              <div className="mb-1 socialBtn d-flex gap-2 justify-content-center">
                <a href={`mailto:${items?.email}`}>
                  <i className="fa fa-envelope"></i>
                </a>
                <a href={`tel:${items?.number}`}>
                  <i className="fa fa-phone"></i>
                </a>
                <a href={`sms:${items?.mobile_phone}`}>
                  <i className="fa fa-mobile"></i>
                </a>
                <a href={`https://api.whatsapp.com/send?phone=${items?.mobile_phone?.substring(1)}`} target={"_blank"}>
                  <i className="fa fa-whatsapp"></i>
                </a>
                <a
                  href={`https://justcall.io/app/macapp/dialpad_app.php?numbers=&${items?.number};`}
                  target={"_blank"}
                ><img alt="" src={justcallLogo} style={{ width: '15px' }} />
                </a>
              </div>
              <div className="editdetabtn d-flex justify-content-center gap-1">
                {(leadPermission?.super_admin || leadPermission[lead]?.edit === "1")
                  &&
                  (leadPermission?.super_admin || items.parent_ids.split(",").includes(permissions.id)) ?
                  <Link
                    to={`${editLink}${items?.leadid}`}
                    className="btn btn-default btn-sm"
                  >
                    <i className="fa fa-edit"></i> Edit
                  </Link>
                  :
                  ((items.lead_followers) && (items.lead_followers.split(",").includes(permissions.id))) ?
                    "" :
                    <Link
                      to={`${editLink}${items?.leadid}`}
                      className="btn btn-default btn-sm"
                    >
                      <i className="fa fa-edit"></i> Edit
                    </Link>
                }

                {(leadPermission?.super_admin || leadPermission[lead]?.delete === "1") ?
                  <Link
                    className="btn btn-default btn-sm Dlt_leadid"
                    onClick={() => deletes(items)}
                  >
                    <i className="fa fa-trash-o"></i>Delete
                  </Link>
                  : ""
                }

              </div>
              <div className="row text-center mt-4 leadbot">
                <div className="col-6 border-right">
                  <label className="mb-0">{stage && stage} STAGE</label>
                  <h4 className="font-16" style={{ "minHeight": "40px" }}>{items.name} </h4>
                </div>
                <div className="col-6">
                  <label className="mb-0">SCORE NUMBER</label>
                  <h4 className="font-16">{items?.score_number}</h4>
                </div>
              </div>
              {
                validates === "validate" && (
                  <>
                    {(leadPermission?.super_admin || leadPermission[lead]?.fields[`${lead}_validate`] === "1") && (

                      (leadPermission?.super_admin) ?
                        <>
                          <br />
                          <button type="button" onClick={() => hanValidate(items)} className="btn btn-sm btn-block btn-primary btn-valid">
                            Validate
                          </button>
                        </>
                        :
                        ((items.lead_followers) && items.lead_followers.split(",").includes(permissions.id)) ?
                          "" :

                          <>
                            <br />
                            <button type="button" onClick={() => hanValidate(items)} className="btn btn-sm btn-block btn-primary btn-valid">
                              Validate
                            </button>
                          </>

                    )}
                  </>
                )
              }
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div>No Data</div>
  );
}

export default CardGrid;
