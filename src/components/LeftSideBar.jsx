import React, { useState, useEffect, useContext,useRef } from "react";
import { Link, } from "react-router-dom";
import { toggleGridbar } from './SidebarToggle';
import { MainCalendarListContext } from "../context/MainCalendarListContext";
import { MainProjectListContext } from "../context/MainProjectListContext";
import { MainActionListContext } from "../context/MainActionListContext";
import { MainFollowupListContext } from "../context/MainFollowupListContext";
import { MainMeetingListContext } from "../context/MainMeetingListContext";
import { MainOpportunitiesListContext } from "../context/MainOpportunitiesListContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { FaUserSecret, FaUserCircle, FaListOl, FaPuzzlePiece, FaRegCalendarAlt, FaUserAlt,FaMoneyBillAlt, FaHandshake,FaFolder} from "react-icons/fa";
import {BsFillBarChartFill,BsFillBookmarkFill} from "react-icons/bs";
import { GrTasks } from "react-icons/gr";
import { CiLock } from "react-icons/ci";
import { Menu } from 'antd';
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };

}




function LeftSideBar() {
  const {  permissions } = useContext( MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { calendarlist } = useContext(MainCalendarListContext);
  const {  projectlist } = useContext(MainProjectListContext);
  const {  Actionlist } = useContext(MainActionListContext);
  const {  Followuplist } = useContext(MainFollowupListContext);
  const { Meetinglist } = useContext(MainMeetingListContext);
  const { opportunitiesList } = useContext(MainOpportunitiesListContext);
  const [openKeys, setOpenKeys] = useState([]);
  const rootSubmenuKeys = ['sub1', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10', 'sub11', 'sub12', 'sub13', 'sub14', 'sub15', 'sub16', 'sub17'];
 

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) == -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) == -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  let calendarListArray = [];
  let opportunitiesListArray = [];
  let projectListArray = [];
  let actionListArray = [];
  let followupListArray = [];
  let meetingListArray = [];
  
  if (calendarlist) {
    for (let index = 0; index < calendarlist.length; index++) {
      calendarListArray.push(getItem(<Link to={`calendar/view/${calendarlist[index].cl_db_did}`}>{calendarlist[index].calendar_name}</Link>, `${calendarlist[index].calendar_name}dy1${index}`))
    }
  } else {
    calendarListArray.push('')
  }
  if (opportunitiesList) {
    for (let index2 = 0; index2 < opportunitiesList.length; index2++) {
      opportunitiesListArray.push(getItem(<Link to={`opportunities/${opportunitiesList[index2].db_id}/Grid`}>{opportunitiesList[index2].pipeline_title}</Link>, `${opportunitiesList[index2].pipeline_title}dy2${index2}`))
    }
  } else {
    opportunitiesListArray.push('')
  }
  if (projectlist) {
    for (let index3 = 0; index3 < projectlist.length; index3++) {
      projectListArray.push(getItem(<Link to={`project/${projectlist[index3].db_id}/Grid`}>{projectlist[index3].pipeline_title}</Link>, `${projectlist[index3].pipeline_title}dy3${index3}`))
    }
  } else {
    projectListArray.push('')
  }
  if (Actionlist) {
    for (let index4 = 0; index4 < Actionlist.length; index4++) {
      actionListArray.push(getItem(<Link to={`action/${Actionlist[index4].db_id}/Grid`}>{Actionlist[index4].pipeline_title}</Link>, `${Actionlist[index4].pipeline_title}dy4${index4}`))
    }
  } else {
    actionListArray.push('')
  }
  if (Followuplist) {
    for (let index5 = 0; index5 < Followuplist.length; index5++) {
      followupListArray.push(getItem(<Link to={`followup/${Followuplist[index5].db_id}/Grid`}>{Followuplist[index5].pipeline_title}</Link>, `${Followuplist[index5].pipeline_title}dy5${index5}`))
    }
  } else {
    followupListArray.push('')
  }
  if (Meetinglist) {
    for (let index6 = 0; index6 < Meetinglist.length; index6++) {
      meetingListArray.push(getItem(<Link to={`meeting/${Meetinglist[index6].db_id}/Grid`}>{Meetinglist[index6].pipeline_title}</Link>, `${Meetinglist[index6].pipeline_title}dy6${index6}`))
    }
  } else {
    meetingListArray.push('')
  }

let  cor = "";
let contact_types = "";
if(leadPermission?.super_admin) {
  cor = getItem('Settings', 'sub2', null,  [getItem(<Link to={`correlationsdb`}>Correlations</Link>, 'l3')]);
  contact_types = getItem(<Link to={`contact_types`}>Type of Contact</Link>, 'co3')
}
// start lead

let leadmain =  ""
let leadcustom = ""
let leadview = ""
if(leadPermission?.super_admin ||  leadPermission?.leads?.view === "1") {
  leadview =   getItem(<Link to={`leads/Grid`}>All Lead</Link>, 'l1')
}
if(leadPermission?.super_admin ||  leadPermission?.leads?.create === "1") {
  leadcustom =   getItem(<Link to={`createlead`}>Create New</Link>, 'l2')
}
if(leadPermission?.super_admin ||  leadPermission?.leads?.active_module === "1") {
  leadmain =  getItem('Lead Management', 'sub1', <FaUserSecret />, [
    leadview,
    leadcustom,
    cor,
  ])
}
// end lead
// start custom feild  
let createcustom = ""
if(leadPermission?.super_admin ||  leadPermission?.custom_fields?.create === "1") {
  createcustom =  getItem(<Link to={`createcustomfield`}>Create New</Link>, 'c2')
}
let coutommian =  ""
if (leadPermission?.super_admin || leadPermission?.custom_fields?.active_module === "1") {
  coutommian =  getItem('Custom Fields', 'sub6', <FaPuzzlePiece />, [
    getItem(<Link to={`customfield`}>All Fields</Link>, 'c1'),
    createcustom,
  ])
}

  const communicationTemplateMenu = leadPermission?.super_admin || 
    (leadPermission?.comm_temp_module?.view === "1" && leadPermission?.comm_temp_module?.active_module === "1") 
      ? getItem('Communication Template', 'ct1', <FaFolder />, [
          getItem(<Link to={"templates"}>Template</Link>, 'ct2'),
          getItem(<Link to={"communication_cats_subcats"}>Categories & Subcategories</Link>, 'ct3'),
        ])
  : null;
  // leadPermission?.filesnmedia_module?.active_module === "1"
  const FilesnMediaMenu = (leadPermission?.super_admin  || leadPermission?.filesnmedia_module?.active_module === "1")
      ? getItem('Files & Media', 'sub15', <FaFolder />, [
        // (leadPermission?.filesnmedia_module?.view === "1") ?
        (leadPermission?.super_admin || leadPermission?.filesnmedia_module?.view === "1") ?
        getItem(<Link to={"files"}>Files</Link>, 'fi1')
        : null,
        (leadPermission?.super_admin || leadPermission?.filesnmedia_module?.view === "1") ?
        getItem(<Link to={"media"}>Media</Link >, 'fi2')
        : null,
          (leadPermission?.super_admin || leadPermission?.filesnmedia_module?.create === "1") ? 
            getItem(<Link to={"upload_media"}>Upload New</Link>, 'fi3')
          : null,
          getItem(<Link to={"categories_subcategories"}>Categories & Subcategories</Link>, 'fi4'),
      ])
  : null;
  const TranslationMenu = leadPermission?.super_admin || 
    (leadPermission?.translate_module?.view === "1" && leadPermission?.translate_module?.active_module === "1") 
      ? getItem('Translation', 'sub14', <i className="fa fa-language"></i>, [
        getItem(<Link to={"Translation"}>Translation</Link>, 'au1455')
      ])
  : null;
  const AuthenticationMenu = leadPermission?.super_admin || 
  (leadPermission?.user_module?.active_module === "1")
      ? getItem('Authentication', 'sub13', <CiLock />, [
          (leadPermission?.super_admin || (leadPermission?.user_module?.view === "1" && leadPermission?.user_module?.active_module === "1")) ? 
            getItem(<Link to={"users"}>All Users</Link>, 'au1')
          : null,
          (leadPermission?.super_admin || (leadPermission?.user_module?.active_module === "1" && leadPermission?.user_module?.create === "1")) ? 
            getItem(<Link to={"register"}>New Register</Link>, 'au2')
          : null,
          leadPermission?.super_admin ? 
            getItem(<Link to={"list_profiles"}>Profiles</Link>, 'au3')
          : null,
          (leadPermission?.super_admin || (leadPermission?.roles_module?.active_module === "1" && leadPermission?.roles_module?.create === "1")) ?
            getItem(<Link to={"roles"}>Roles</Link>, 'au4')
          : null,
          (leadPermission?.super_admin || leadPermission?.user_module?.fields?.usrs_Login_Historys === "on") ? 
            getItem(<Link to={"login_history"}>Login History</Link>, 'au5')
          : null,
          (leadPermission?.super_admin || leadPermission?.user_module?.fields?.usrs_tags === "on") ?
            getItem(<Link to={"tags"}>Tags</Link>, 'au6')
          : null,
          (leadPermission?.super_admin || leadPermission?.user_module?.fields?.usrs_system_settings === "on") ?
            getItem(<Link to={"system_settings"}>System Settings</Link>, 'au7')
          : null,
        ])
  : null;
  const MeetingMenu = leadPermission?.super_admin || 
    (leadPermission?.meeting?.view === "1" && leadPermission?.meeting?.active_module === "1") 
      ? getItem('Meetings', 'sub11', <FaHandshake />, [
          getItem('View Meetings', 'sub23',
            null,
            meetingListArray),
          leadPermission?.super_admin || leadPermission?.meeting?.create === "1" ? 
            getItem(<Link to={"createmeeting"}>Create New</Link>, 'me2')
          : null,
          (leadPermission?.super_admin || (leadPermission?.meeting_stages?.active_module === "1" && leadPermission?.meeting_stages?.active_module === "1")) && getItem(<Link to={'meeting_pipelines'}>Pipelines</Link>, 'me3'),
          leadPermission?.super_admin &&  getItem(<Link to={'meeting_priority'}>Priority</Link>, 'me4'),
        ])
  : null;
  const FollowupMenu = leadPermission?.super_admin || 
    (leadPermission?.follow_up?.view === "1" && leadPermission?.follow_up?.active_module === "1") 
      ? getItem('Follow Ups', 'sub10', <GrTasks />, [
          getItem('View Follow Ups', 'sub22',
            null,
            followupListArray),
          leadPermission?.super_admin || leadPermission?.follow_up?.create === "1" ? 
            getItem(<Link to={"createfollowup"}>Create New</Link>, 'f2')
          : null,
          (leadPermission?.super_admin || (leadPermission?.follow_up_stages?.active_module === "1" && leadPermission?.follow_up_stages?.active_module === "1")) && getItem(<Link to={`followup_pipelines`}>Pipelines</Link>, 'f3'),
          leadPermission?.super_admin &&   getItem(<Link to={`followup_severity`}>Severity</Link>, 'f4'),
        ])
  : null;
  const ActionMenu = leadPermission?.super_admin || 
    (leadPermission?.action?.view === "1" && leadPermission?.action?.active_module === "1") 
      ? getItem('Actions', 'sub9', <BsFillBookmarkFill />, [
          getItem('View Actions', 'sub21',
            null,
            actionListArray),
          leadPermission?.super_admin || leadPermission?.action?.create === "1" ? 
            getItem(<Link to={"createaction"}>Create New</Link>, 'a2')
          : null,
          (leadPermission?.super_admin || (leadPermission?.follow_up_stages?.active_module === "1" && leadPermission?.follow_up_stages?.active_module === "1")) && getItem(<Link to={`action_pipelines`}>Pipelines</Link>, 'a3'),
          leadPermission?.super_admin && getItem(<Link to={`action_priority`}>Priority</Link>, 'a4'),
        ])
  : null;
  const CalendarMenu = leadPermission?.super_admin || 
    (leadPermission?.calendar?.view === "1" && leadPermission?.calendar?.active_module === "1") 
      ? getItem('Calendar Management', 'sub8', <FaRegCalendarAlt />, [
          getItem(<Link to={`calendar`}>Calendars</Link>, 'ca1'),
          getItem('View Calendars', 'sub20',
            null,
            calendarListArray
          ),
          getItem(<Link to={`calendar_events`}>Event</Link>, 'ca3'),
        ])
  : null;
  const MarkettingMenu = leadPermission?.super_admin || 
    (leadPermission?.marketing?.view === "1" && leadPermission?.marketing?.active_module === "1") 
      ? getItem('Marketing Management', 'sub7', <BsFillBarChartFill />, [
          getItem(<Link to={`source`}>Sources</Link>, 'ma1')
        ])
  : null;
  const ProjectManagement = leadPermission?.super_admin || 
    (leadPermission?.projects?.view === "1" && leadPermission?.projects?.active_module === "1") 
      ? getItem('Project Management', 'sub5', <FaListOl />, [
          getItem('Projects', 'sub19',  null, projectListArray),
          leadPermission?.super_admin || leadPermission?.projects?.create === "1" ? 
            getItem(<Link to={"createproject"}>Create New</Link>, 'pr2')
          : null,
         
          (leadPermission?.super_admin || (leadPermission?.project_stages?.active_module === "1" && leadPermission?.project_stages?.active_module === "1")) &&  getItem(<Link to={`project_pipelines`}>Pipelines</Link>, 'pr3'),
          leadPermission?.super_admin && getItem(<Link to={`project_status`}>Status</Link>, 'pr4'),
        ])
  : null;
  const OpportunityManagement = leadPermission?.super_admin || 
    (leadPermission?.opportunities?.view === "1" && leadPermission?.opportunities?.active_module === "1") 
      ? getItem('Opportunity Management', 'sub17', <FaMoneyBillAlt style={{ fontSize: 20 }} />, [
          getItem('Opportunity', 'sub18',
            null,
            opportunitiesListArray),
          getItem(<Link to={`opp_pipelines`}>All Pipelines</Link>, 'o2'),
          leadPermission?.super_admin || leadPermission?.opportunities?.create === "1" ? 
            getItem(<Link to={"createopportunity"}>Create New</Link>, 'o3')
          : null,
          (leadPermission?.super_admin || (leadPermission?.opportunity_stages?.active_module === "1" && leadPermission?.opportunity_stages?.active_module === "1")) && getItem(<Link to={`opportunity_pipelines`}>Pipelines</Link>, 'o4'),
          leadPermission?.super_admin && getItem(<Link to={`opportunity_status`}>Status</Link>, 'o5'),
        ])
  : null;
  const ContactManagement = leadPermission?.super_admin || 
    (leadPermission?.contacts?.view === "1" && leadPermission?.contacts?.active_module === "1") 
      ? getItem('Contact Management', 'sub12', <i className="fa-solid fa-address-card"></i>, [
          getItem(<Link to={`contacts`}>All Contact</Link>, 'cm1'),
          leadPermission?.super_admin || leadPermission?.contacts?.create === "1" ? 
            getItem(<Link to={"create_contact"}>Create Contact</Link>, 'cm2')
          : null,
          contact_types,
        ])
  : null;
  const ClientManagement = leadPermission?.super_admin || 
    (leadPermission?.clients?.view === "1" && leadPermission?.clients?.active_module === "1") 
      ? getItem('Client Management', 'sub4', <FaUserCircle />, [
          getItem(<Link to={`clients/Grid`}>All Client</Link>, 'cl1'),
          leadPermission?.super_admin || leadPermission?.clients?.create === "1" ? 
            getItem(<Link to={"create_client"}>Create New</Link>, 'co2')
          : null,
        ])
  : null;
  const ProspectManagement = leadPermission?.super_admin || 
    (leadPermission?.prospects?.view === "1" && leadPermission?.prospects?.active_module === "1") 
      ? getItem('Prospect Management', 'sub3', <FaUserAlt />, [
        getItem(<Link to={`all_prospects/Grid`}>All Prospect</Link>, 'p1'),
        getItem(<Link to={`pending_prospects`}>Pending Prospect</Link>, 'p2'),
        leadPermission?.super_admin || leadPermission?.prospects?.create === "1" ? 
          getItem(<Link to={"create_prospect"}>Create New</Link>, 'p3')
        : null,
      ])
  : null;
  const automation = getItem('Automation', 'sfdsaasdfub3', <FaUserAlt />, [
    getItem(<Link to={`allautomation`}>Automation</Link>, 'p1423'),
    getItem(<Link to={`sitetracking`}>Site Tracking</Link>, 'p24'),
  ])
  const items = [
    leadmain,
    ProspectManagement,
    ClientManagement,
    ContactManagement,
    OpportunityManagement,
    ProjectManagement,
    coutommian,
    MarkettingMenu,
    CalendarMenu,
    ActionMenu,
    FollowupMenu,
    MeetingMenu,
    AuthenticationMenu,
    TranslationMenu,
    FilesnMediaMenu,
    communicationTemplateMenu,
    automation,
  ];



  return (
    <>
      <div id="left-sidebar" className="sidebar" >
        <h5 className="brand-name">
          {permissions["system-title-system"]?.setting_value}
          <div className="menu_option float-right" onClick={toggleGridbar}>
            <i className="icon-grid font-16"></i>
          </div>
        </h5>
        
        <nav id="left-sidebar-nav" className="sidebar-nav">
          <ul className="metismenu">
             <div
              style={{
                width: 280,
              }}
            >
              {
                items &&
              <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              items={items}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              />
            }
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default LeftSideBar;