import React, { useContext } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainTranslationContext } from "../context/MainTranslationContext";
import { toggleSidebar } from './SidebarToggle';
import config from "../services/config.json";
import Dropdown from 'react-bootstrap/Dropdown';
import { MainEditCalenderContext } from "../context/MainEditCalenderContext";
import { FaAlignLeft,FaPlusSquare,FaUserAlt} from "react-icons/fa";
import {  AiOutlineLogout } from "react-icons/ai";
import {  getTranslationimg, removeTokenSession } from "../utils/common";

function Header({data,Change}) {
  const { addcalenderdetails } = useContext(MainEditCalenderContext);
  const navigate = useNavigate();
  let location = useLocation();
  let array = [`/${config.ddemoss}leads/Grid`]
  let array2 = [`lead`,"prospect","client","contact","opp_pipelines","project"]
  const { heading } = useContext(MainHeadingContext);
  const { transData } = useContext(MainTranslationContext);
  const signOut = () => {
    removeTokenSession()
    navigate(`/${config.ddemoss}login`)
  }
 const hanldeTranslate = (item) => {
  Change(item)
 }

  return (
    <div id="page_top" className="section-body sticky-top top_dark">
      <div className="container-fluid">
        <div className="page-header p-0">
          <div className="left">
            <button className="icon clickButton menu_toggle mr-3" onClick={toggleSidebar}>
              <FaAlignLeft  />
            </button>
            <h1  id="page-title" className="page-title">{heading ? heading : "Dashboard"}</h1>
          { array2.includes(location.pathname.split("/")[2]) && location.pathname.includes("view")  && <Link to={`/${config.ddemoss}${location.pathname.split("/")[2]}/edit/${location.pathname.split("/")[4]}`} className="btn btn-default btn-sm bsm headerbtn_ box_shadow"><i className="fa fa-edit"></i> Edit</Link>}
            {
              array.includes(location.pathname) &&
           <>
            <Link  className="btn btn-default btn-sm bsm export_lead headerbtn_"><span className="fas fa-file-export"></span> Export</Link>	
              <Link  className="btn btn-default btn-sm bsm import_lead headerbtn_" ><i className="fas fa-file-import"></i>Import</Link>
            </>
            }
          </div>
          <div className="right">
          <Dropdown className="dropdown d-flex">
                <Dropdown.Toggle
                  className="nav-link clickButton icon d-none d-md-flex btn-default btn-icon ml-2"
                >
                  <FaPlusSquare />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <Link className="dropdown-item" to="createlead">
                    Create Lead
                  </Link>
                  <Link className="dropdown-item" to="create_prospect">
                    Create Prospect
                  </Link>
                  <Link className="dropdown-item" to="create_client">
                    Create Client
                  </Link>
                  <Link className="dropdown-item" to="create_contact">
                    Create Contact
                  </Link>
                  <Link className="dropdown-item" to="createopportunity">
                    Create Opportunities
                  </Link>
                  <Link className="dropdown-item" to="createproject">
                    Create Project
                  </Link>
                  <Link className="dropdown-item" to="createaction">
                    Create Action
                  </Link>
                  <Link className="dropdown-item" to="createfollowup">
                    Create Follow Up
                  </Link>
                  <Link className="dropdown-item" to="createmeeting">
                    Create Meeting
                  </Link>
              </Dropdown.Menu>
            </Dropdown>
            <div className="notification d-flex">
            <Dropdown className="dropdown d-flex">
            <Dropdown.Toggle className="nav-link clickButton icon d-none d-md-flex btn-default btn-icon ml-2"
                >
                  <i className="fa fa-language"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className=" dropdown-menu-right dropdown-menu-arrow">
                  <a className="dropdown-item">
                    <img
                      className="w20 mr-2"
                      src={`${config.baseurl}react_lead/assets/flags/${data.lang_image || getTranslationimg()}`}
                    />
                    <span>{`${data.lang_name || "English"}`}</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  {transData && !transData.message && transData.map((item,index) => {
                    return (
                      <button key={index} className="dropdown-item m-0 w-100" onClick={() => hanldeTranslate(item)}>
                      <img className="w20 mr-2" src={`${config.baseurl}/react_lead/assets/flags/${item.lang_image}`} />
                      {item.lang_name}
                    </button>
                    )
                  })}
                 
                 </Dropdown.Menu>
                </Dropdown>
              <Dropdown className="dropdown d-flex">
                <Dropdown.Toggle
                  className="nav-link icon d-none d-md-flex btn-default btn-icon ml-2"
                  data-toggle="dropdown"
                >
                  <img
                    className="avatar"
                    src={`${config.baseurl}/media/afe44b237c9f88b4a40803f97e66d0eee2751671.jpg`}
                    alt=""
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <Link className="dropdown-item" to={`/${config.ddemoss}profile`}>
                    <FaUserAlt /> Profile
                  </Link>
                  {/* <a className="dropdown-item" >
                    <AiOutlineSetting /> Settings
                  </a> */}
                  {/* <Link to={"/"} className="dropdown-item" >
                    <span className="float-right">
                      <span className="badge badge-primary">6</span>
                    </span>
                    <FaEnvelope />
                    Inbox
                  </Link> */}
                  {/* <Link to={"/"} className="dropdown-item"><FaFacebookMessenger /> Message</Link>
                  <div className="dropdown-divider"></div> */}
                  {/* <Link to={"/"} className="dropdown-item"><FaHandsHelping /> Need help?</Link> */}
                  <button  className="dropdown-item w-100 m-0" onClick={signOut}><AiOutlineLogout /> Sign out </button>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
