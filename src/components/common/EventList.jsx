import React from "react";
import { Link } from "react-router-dom";
import { handleNormalDate, handleSpitTitle } from "../AllCustomFuntion";
import config from "../../services/config.json";

function EventList({link, editLink, lists }) {
    return lists && !lists.message ? 
    lists && lists.map((item, i) => {
    return (
      <div key={i} className="col-12">
<div className="card _projects_ box_shadow">
<div className="starBox">
  <Link  className="mail-star"><i className="fa fa-star"style={{ color: `${item.status_color}` }}></i></Link>
</div>
<div className="card-header">
  <h3 className="card-title">
      <Link className="txt" to={`/${config.ddemoss}view/${link}/${item?.event_db_id}`}>{handleSpitTitle(item.event_title)}</Link>                                                           
      <small>{item.name}</small>
  </h3>
</div>
<div className="card-body">
  <div className="row _projects_Members">
      <div className="col-5 py-1"><strong>Members:</strong></div>
      <div className="col-7 py-1">
          <div className="avatar-list avatar-list-stacked">
          {item.member_ids.map((itemMember,index2) => {
                  return (
                       <img className="avatar avatar-sm" key={index2} onError={(e) => e.target.src = "https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"}  src={itemMember?.avatar} title="check 1  check father "/>
                       )
                      })}                                                 </div>
      </div>
  </div>
  <div className="row _projects_Followers">
      <div className="col-5 py-1"><strong>Followers:</strong></div>
      <div className="col-7 py-1">
      <div className="avatar-list avatar-list-stacked" >
                  {item.follower_ids.map((itemFollowers,index2) => {
                  return (
                       <img className="avatar avatar-sm" key={index2} onError={(e) => e.target.src = "https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"}  src={itemFollowers?.avatar} title="check 1  check father "/>
                       )
                      })}
                      </div>
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
      <div className="float-left"><strong>15%</strong></div>
      <div className="float-right"><small className="text-muted">Progress</small></div>
  </div>
  <div className="progress progress-xs box_shadow">
      <div className="progress-bar bg-red" role="progressbar" style={{"width": "15%"}} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>
</div>
</div>
</div>
    )
})
: (
<div>No Data</div>
);
}

export default EventList;
