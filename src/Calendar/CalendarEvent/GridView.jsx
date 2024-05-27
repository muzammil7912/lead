import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import config from "../../services/config.json";
import Dropdown from 'react-bootstrap/Dropdown';
import { handleClick, handleFullScreen, handleToggle } from '../../components/AllCustomFuntion';
import dayjs from 'dayjs';
function GridView({ dataa, deletes }) {
  const navigate = useNavigate();
  const handleClick = (e,item,item2,item3) => {
    e.preventDefault()
    localStorage.setItem("parentId", item3 ?? "00" )
    localStorage.setItem("ChildId", "00")
    navigate(`${item === "meeting" ? `/${config.ddemoss}meeting/edit/${item2}` : `/${config.ddemoss}calendar/editevent/${item2}`}`);
  }
  return (
    <div className="row clearfix cl-li">
      {Array.isArray(dataa) ?   dataa?.map((item, index) => {
        const months = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"};
        let start_date = item?.start_date
        let signDay = "";
        let signMonth = "";
        let signYear = "";
        let dat = item.start_date.split(" ")
        return (
          <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <div className="card _projects_">
              <div className="card-header">
                <div className="card-title">
                  {item.event_title}
                </div>
                <div className="card-options">
                  <Link onClick={(e) => handleFullScreen(e)}
                    className="card-options-fullscreen">
                    <i className="fe fe-maximize"></i>
                  </Link>
                  <Link
                    onClick={(e) => handleToggle(e)}
                    className="card-options-collapse mx-2"
                  ><i className={`fe fe-chevron-down`} />
                  </Link>
                  <Dropdown className="dropdown d-flex">
                    <Dropdown.Toggle className="clickButton p-0" ><i style={{color: '#1A5089'}} className="fe fe-more-vertical"></i> </Dropdown.Toggle>
                    <Dropdown.Menu >
                    <Link to={`/${config.ddemoss}${item.event_type === "meeting" ? `meeting/edit/${item?.event_db_id}` : `view/event/${item?.event_db_id}`}`} className="dropdown-item"  >
                          <i className="dropdown-icon fa fa-edit"></i>View Event
                        </Link>
                        <Link   onClick={(e) => handleClick(e,`${item.event_type}`,`${item?.event_db_id}`,`${dat[2]+months[dat[1]]+dat[0]}`)} className="dropdown-item"  >
                          <i className="dropdown-icon fa fa-edit"></i>Edit Event
                        </Link>
                       <Link className="dropdown-item" onClick={() => deletes(item)} >   Delete Event  </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="card-body">
                <div className="eventbottom">
                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>OWNER:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.username && item?.username.split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </div>
                  </div>
                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>TYPE:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.event_type && item?.event_type.split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </div>
                  </div>
                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>PIPELINE:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.pipeline_title}
                    </div>
                  </div>
                  <div className="row calendar_eventslistBox">
                    <div className="col-5 py-1 calendar_eventslistBox1">
                      <strong>START DATE:</strong>
                    </div>
                    <div className="col-7 py-1">
                      {item?.start_date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
      :
      <h4>No Data</h4>
      }
    </div>
  )
}

export default GridView