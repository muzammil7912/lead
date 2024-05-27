import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../services/config.json";
import Dropdown from 'react-bootstrap/Dropdown';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Handle_convert_system_timezone, handleDateTime, handleFullScreen, handleNormalDate, handleSpitTitle, handleToggle } from "../AllCustomFuntion";
import dayjs from "dayjs";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";

function EventCardGrid({ editRemove, link, lists, deletes, event, width }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();
  const handleClick = (e, item, item2, item3) => {
    e.preventDefault()
    localStorage.setItem("parentId", item3 ?? "00")
    localStorage.setItem("ChildId", "00")
    navigate(`${item === "meeting" ? `/${config.ddemoss}meeting/edit/${item2}` : `/${config.ddemoss}calendar/editevent/${item2}`}`);
  }


  return Array.isArray(lists) ? lists.map((item, i) => {
    const months = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };
    let start_date = item?.start_date
    let signDay = "";
    let signMonth = "";
    let signYear = "";
    let dat = item.start_date.split(" ")
    console.log(item)
    return (
      <div key={i} className={width}>
        <div className="card leadCards">
          <div className="card-header">
            <h3 className="card-title">
              <span className="txt">{item?.event_title}</span>
              {/* <span className="txt">{handleSpitTitle(item.event_title)}</span> */}
              <small>{item.name}</small>
            </h3>
            <div className="card-options">
              <span className="tag" style={{ background: `${item.sts_color}` }}>{item.event_status}</span>
              <Link
                onClick={(e) => handleToggle(e)}
                className="card-options-collapse"
              ><i className={`fe fe-chevron-up`} />
              </Link>
              <Link
                onClick={(e) => handleFullScreen(e)}

              ><i className={`fe fe-maximize`} />
              </Link>
              {!editRemove &&

                <Dropdown className="item-action dropdown ml-2">
                  <Dropdown.Toggle className="clickButton p-0">
                    <i style={{ "color": '#000' }} className="fe fe-more-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {(leadPermission?.super_admin || (leadPermission[link]?.view === "1" && leadPermission[link].active_module === "1")) &&
                      < Link to={`/${config.ddemoss}${link === "meeting" ? `meeting/edit/${item?.event_db_id}` : `view/${link}/${item?.event_db_id}`}`} className="dropdown-item"  >
                        <i className="dropdown-icon fa fa-edit"></i>View {event && event}
                      </Link>
                    }
                    {(leadPermission?.super_admin || (leadPermission[link]?.edit === "1" && leadPermission[link].active_module === "1")) &&
                      // <Link to={`/${config.ddemoss}${item.event_type === "meeting" ? (`meeting/edit/${item?.event_db_id}`) : (`calendar/editevent/${item?.event_db_id}/${dat[2] + months[dat[1]] + dat[0]}/00`)}`} className="dropdown-item"  >
                      //   <i className="dropdown-icon fa fa-edit"></i>Edit  {event && event}
                      // </Link>
                      <Link onClick={(e) => handleClick(e, `${item.event_type}`, `${item?.event_db_id}`, `${dat[2] + months[dat[1]] + dat[0]}`)} className="dropdown-item"  >
                        <i className="dropdown-icon fa fa-edit"></i>Edit  {event && event}
                      </Link>
                    }
                    {(leadPermission?.super_admin || (leadPermission[link]?.delete === "1" && leadPermission[link].active_module === "1")) &&
                      <Link onClick={() => deletes(item)} className="dropdown-item"  >
                        <i className="dropdown-icon fa fa-trash"></i>Delete {event && event}
                      </Link>
                    }
                  </Dropdown.Menu>
                </Dropdown>
              }


            </div>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="row _projects_Created">
                <div className="col-5 py-1"><strong>Created:</strong></div>
                <div className="col-7 py-1">{item.date_created}</div>
              </div>
              <div className="row _projects_Creator">
                <div className="col-5 py-1"><strong>Creator:</strong></div>
                <div className="col-7 py-1">--</div>
              </div>
              <div className="row _projects_Owner">
                <div className="col-5 py-1"><strong>Owner:</strong></div>
                <div className="col-7 py-1">{item.project_owner}</div>
              </div>
              <div className="row _projects_Members">
                <div className="col-5 py-1"><strong>Members:</strong></div>
                <div className="col-7 py-1">
                  {Array.isArray(item?.member_ids) && item?.member_ids?.map(innerItem => {
                    return (
                      <React.Fragment key={innerItem?.id}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={innerItem?.id}>
                              {`${innerItem?.f_name}  ${innerItem?.l_name}`}
                            </Tooltip>
                          }
                        >
                          <img
                            className="avatar avatar-sm"
                            src={innerItem?.avatar.includes('http') ? innerItem?.avatar : `${config.baseurl2}${innerItem?.avatar}`}
                            alt="Image"
                            srcSet=""
                          />
                        </OverlayTrigger>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
              <div className="row _projects_Followers">
                <div className="col-5 py-1"><strong>Followers:</strong></div>
                <div className="col-7 py-1">
                  {Array.isArray(item?.follower_ids) && item?.follower_ids?.map(innerItem => {
                    return (
                      <React.Fragment key={innerItem?.id}>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={innerItem?.id}>
                              {`${innerItem?.f_name}  ${innerItem?.l_name}`}
                            </Tooltip>
                          }
                        >
                          <img
                            className="avatar avatar-sm"
                            src={innerItem?.avatar.includes('http') ? innerItem?.avatar : `${config.baseurl2}${innerItem?.avatar}`}
                            alt="Image"
                            srcSet=""
                          />
                        </OverlayTrigger>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
              <div className="row _projects_sd">
                <div className="col-5 py-1"><strong>Start Date:</strong></div>
                {/* <div className="col-7 py-1">{`${item.start_date}   ${dayjs(item?.start_date_time, 'HH:mm:ss')}`}</div> */}
                <div className="col-7 py-1">
                  {/* {console.log(`${item.start_date}   ${item?.start_date_time}`)} */}
                  {<Handle_convert_system_timezone
                    dateAndTime={dayjs(`${item.start_date} ${item?.start_date_time}`).format('YYYY-MM-DD HH:mm:ss')}
                  />}
                </div>
              </div>
              <div className="row _projects_ed">
                <div className="col-5 py-1"><strong>End Date:</strong></div>
                {/* <div className="col-7 py-1">{`${item.end_date}   ${dayjs(item?.end_date_time, 'HH:mm:ss').format('HH:mm')}`}</div> */}
                <div className="col-7 py-1">
                  {<Handle_convert_system_timezone
                    dateAndTime={dayjs(`${item.end_date} ${item?.end_date_time}`).format('YYYY-MM-DD HH:mm:ss')}
                  />}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div >
    )
  })
    : (
      <div>No Data</div>
    );
}

export default EventCardGrid;
