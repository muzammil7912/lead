import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import config from "../../services/config.json";
import { handleDateTime, handleFullScreen, handleNormalDate, handleSpitTitle, handleToggle } from "../AllCustomFuntion";
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";



function CardGrid({ lists, deletes }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  return Array.isArray(lists) ? lists.map((item, i) => {
    return (
      <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
        <div className="card leadCards">
          <div className="card-header">
            <h3 className="card-title">
              <span className="txt">{handleSpitTitle(item.project_title)}</span>

              <small>{item.name}</small>
            </h3>
            <div className="card-options">
              <span className="tag" style={{ background: `${item.status_color}` }}>{item.status_name}</span>
              <Link
                onClick={(e) => handleToggle(e)}
                className="card-options-collapse"
              ><i className={`fe fe-chevron-up`} />
              </Link>
              <Link
                onClick={(e) => handleFullScreen(e)}

              ><i className={`fe fe-maximize`} />
              </Link>
              <Dropdown className="item-action dropdown ml-2">
                <Dropdown.Toggle className="clickButton p-0">
                  <i style={{ "color": '#000' }} className="fe fe-more-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Link to={`/${config.ddemoss}view/project/${item?.prj_id}`} className="dropdown-item"  >
                    <i className="dropdown-icon fa fa-edit"></i>View Project
                  </Link>
                  {
                    (leadPermission?.super_admin || leadPermission?.projects?.edit === "1")
                    &&
                    <Link to={`/${config.ddemoss}edit/project/${item?.prj_id}`} className="dropdown-item"  >
                      <i className="dropdown-icon fa fa-edit"></i>Edit Project
                    </Link>
                  }
                  {
                    (leadPermission?.super_admin || leadPermission?.projects?.delete === "1")
                    &&
                    <Link onClick={() => deletes(item)} className="dropdown-item"  >
                      <i className="dropdown-icon fa fa-trash"></i>Delete Project
                    </Link>

                  }

                </Dropdown.Menu>
              </Dropdown>

            </div>
          </div>

          <div className="card-body">
            <div className="row _projects_Created">
              <div className="col-5 py-1"><strong>Created:</strong></div>
              <div className="col-7 py-1"><small>{handleDateTime(item.created_date)}</small></div>
            </div>
            <div className="row _projects_Creator">
              <div className="col-5 py-1"><strong>Creator:</strong></div>
              <div className="col-7 py-1">{item?.owner_to_name}</div>
            </div>
            <div className="row _projects_Owner">
              <div className="col-5 py-1"><strong>Owner:</strong></div>
              <div className="col-7 py-1">  {
                <img className="avatar avatar-sm" onError={(e) => e.target.src = "https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"} src={item?.owner_to_avatar} title="check 1  check father " />
              }</div>
            </div>
            <div className="row _projects_Members">
              <div className="col-5 py-1"><strong>Members:</strong></div>
              <div className="col-7 py-1">
                <div className="avatar-list avatar-list-stacked" >
                  {item.member_ids.map((itemMember, index2) => {
                    return (
                      <img className="avatar avatar-sm" key={index2} onError={(e) => e.target.src = "https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"} src={itemMember?.avatar} title="check 1  check father " />
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="row _projects_Followers">
              <div className="col-5 py-1"><strong>Followers:</strong></div>
              <div className="col-7 py-1">
                <div className="avatar-list avatar-list-stacked" >
                  {item.follower_ids.map((itemFollowers, index2) => {
                    return (
                      <img className="avatar avatar-sm" key={index2} onError={(e) => e.target.src = "https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"} src={itemFollowers?.avatar} title="check 1  check father " />
                    )
                  })}
                </div></div>
            </div>
            <div className="row _projects_sd">
              <div className="col-5 py-1"><strong>Start Date:</strong></div>
              <div className="col-7 py-1">{handleNormalDate(item.start_date)}</div>
            </div>
            <div className="row _projects_ed">
              <div className="col-5 py-1"><strong>End Date:</strong></div>
              <div className="col-7 py-1">{handleNormalDate(item.end_date)}</div>
            </div>
          </div>
          <div className="card-footer">
            <div className="clearfix">
              <div className="float-left"><strong>{"50%"}</strong></div>
              <div className="float-right"><small className="text-muted">Progress</small></div>
            </div>
            <div className="progress progress-xs">
              <div className="progress-bar bg-red" role="progressbar" style={{ width: `${50}%` }} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }) : "No any associated Project found!"
}

export default CardGrid;
