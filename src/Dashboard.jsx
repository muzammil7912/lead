import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getTokenSession, setTranslation, setTranslationimg } from "./utils/common";
import axios from "axios";
import config from "./services/config.json";
import AdminDashboard from "./AdminDashboard";
import AllProject from "./Project/AllProject";
import AllAction from "./AllAction/AllAction";
import AllFollowUp from "./AllFollowup/AllFollowUp";
import AllMeeting from "./Meeting/AllMeeting";
import AllLead from "./Lead/AllLead";
import AllUsers from "./Authentication/AllUsers";
import AllUsersEdit from "./Authentication/AllUsersEdit";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LeftSideBar from "./components/LeftSideBar";
import LeftSmallNavigation from "./components/LeftSmallNavigation";
import CreateLead from "./Lead/CreateLead";
import CreateProfile from "./Authentication/CreateProfile";
import EditProfile from "./Authentication/EditProfile";
import UserProfile from "./UserProfile";
import Profiles from "./Authentication/Profiles";
import Register from "./Authentication/Register";
import { Signature } from "./Signature";
import Allcustomfield from "./CustomFields/Allcustomfield";
import Createcustomfield from "./CustomFields/Createcustomfield";
import CreateClient from "./AllClient/CreateClient";
import AllProspects from "./AllProspect/AllProspects";
import CommunicationTemplates from "./CommunicationTemplates/CommunicationTemplates";
import CommunicationTemplatesCatsAndSub from "./CommunicationTemplates/CatsAndSubcats";
import CommunicationTemplatesCatsAndSubEdit from "./CommunicationTemplates/CatsAndSubcatsEdit";
import Createcontact from "./AllContact/CreateContact";
import CreatePipeline from "./AllOpportunity/Opp_New_Pipeline";
import AllPendingProspects from "./PendingProspects/AllPendingProspects";
import Settings from "./Settings";
import Source from "./Marketing/Source";
import CreateAction from "./AllAction/CreateAction";
import CreateFollowup from "./AllFollowup/CreateFollowup";
import CreateFollowUp1 from "./AllFollowup/CreateFollowup1";
import CreateMeeting from "./Meeting/CreateMeeting";
import Priority from "./AllAction/Priority";
import MeetingPriority from "./Meeting/MeetingPriority";
import TranslationPage from "./Translation/TranslationPage";
import Media from "./Media/Media";
import AllPiplines from "./AllOpportunity/AllPiplines/AllPiplines";
import Projectnew from "./Project/CreateProject";
import Projectnew1 from "./Project/CreateProject1";
import OpportunityStatus from "./AllOpportunity/OpportunityStatus";
import EditOpportunityStatus from "./AllOpportunity/EditOpportunityStatus";
import ProjectStatus from "./Project/ProjectStatus";
import Severity from "./AllFollowup/Severity";
import EditLead from "./Lead/EditLead";
import Prospect from "./AllProspect/CreateProspect";
import EditProspect from "./AllProspect/EditProspect";
import ViewLead from "./Lead/ViewLead";
import EditClient from "./AllClient/EditClient";
import EditContact from "./AllContact/EditContact";
import ViewProspect from "./AllProspect/ViewProspect";
import ViewClient from "./AllClient/ViewClient";
import ViewContact from "./AllContact/ViewContact";
import Correlations from "./Lead/Correlations";
import Meeting from "./Meeting/Meeting";
import useFetch from "./customHooks/useFetch";
import { useState } from "react";
import Loader from "./components/common/Loading";
import { toast } from "react-toastify";
import EditTranslation from "./Translation/EditTranslation";
import { MainTranslationContext } from "./context/MainTranslationContext";
import { MainTranslationContexts } from "./context/MainTranslationContexts";
import ViewCalendar from "./Calendar/ViewCalendar/ViewCalendar";
import NewEvent from "./Calendar/NewEvent";
import CreateCalendar from "./Calendar/CreateCalendar";
import CalendarMain from "./Calendar/CalendarMain";
import CalendarEvent from "./Calendar/CalendarEvent/CalendarEvent";
import AllClient from "./AllClient/AllClient";
import AllContact from "./AllContact/AllContact";
import Opportunity from "./AllOpportunity/Opportunity";
import Pipelines from "./AllOpportunity/AllPiplines/Pipelines";
import EditPiplines from "./AllOpportunity/AllPiplines/EditPiplines";
import OpportunityStageSetting from "./AllOpportunity/AllPiplines/OpportunityStageSetting";
import EditStage from "./AllOpportunity/AllPiplines/EditStage";
import CreateStage from "./AllOpportunity/AllPiplines/CreateStage";
import ProjectPipelines from "./Project/AllPiplines/Pipelines";
import EditProjectPiplines from "./Project/AllPiplines/EditPiplines";
import EditProjectPipelineStage from "./Project/AllPiplines/EditStage";
import CreateProjectPipelineStage from "./Project/AllPiplines/CreateStage";
import ActionPipelines from "./AllAction/AllPiplines/Pipelines";
import EditActionPiplines from "./AllAction/AllPiplines/EditPiplines";
import EditActionPipelineStage from "./AllAction/AllPiplines/EditStage";
import CreateActionPipelineStage from "./AllAction/AllPiplines/CreateStage";
import FollowupPipelines from "./AllFollowup/AllPiplines/Pipelines";
import EditFollowupPiplines from "./AllFollowup/AllPiplines/EditPiplines";
import EditFollowupPipelineStage from "./AllFollowup/AllPiplines/EditStage";
import CreateFollowupPipelineStage from "./AllFollowup/AllPiplines/CreateStage";
import FollowupPipelineStageSetting from "./AllFollowup/AllPiplines/FollowStageSetting";
import MeetingPipelines from "./Meeting/AllPiplines/Pipelines";
import EditMeetingPiplines from "./Meeting/AllPiplines/EditPiplines";
import EditMeetingPipelineStage from "./Meeting/AllPiplines/EditStage";
import CreateMeetingPipelineStage from "./Meeting/AllPiplines/CreateStage";
import Files from "./Media/Files";
import Upload_media from "./Media/Upload_Media";
import CategoriesSubcategories from "./Media/CategoriesSubcategories";
import CategoriesSubcategoriesEdit from "./Media/CategoriesSubcategoriesEdit";
import Auth_Roles from "./Authentication/Auth_Roles";
import Auth_History from "./Authentication/Auth_History";
import Auth_Tags from "./Authentication/Auth_Tags";
import Auth_System_settings from "./Authentication/Auth_System_settings";
import SettingProspectStage from "./AllProspect/SettingProspectStage";
import SettingClientStage from "./AllClient/SettingClientStage";
import SettingLeadStage from "./Lead/SettingLeadStage";
import EditLeadStage from "./Lead/EditLeadStage";
import EditProspectStage from "./AllProspect/EditProspectStage";
import CreateLeadStage from "./Lead/CreateLeadStage";
import EditMeetingPriority from "./Meeting/EditMeetingPriority";
import EditActionPriority from "./AllAction/EditActionPriority";
import EditFollowupSeverity from "./AllFollowup/EditFollowupSeverity";
import EditProjectsStatus from "./Project/EditProjectsStatus";
import ContactTypes from "./AllContact/ContactTypes";
import CreateProspectStage from "./AllProspect/CreateProspectStage";
import CreateClientStage from "./AllClient/CreateClientStage";
import EditEvent from "./Calendar/EditEvent";
import BookableSchedule from "./Calendar/BookableSchedule";
import EditCustomField from "./CustomFields/EditCustomField";
import { MainLeadPermissionContext } from "./context/MainLeadPermissionContext";
import CreateRole from "./Authentication/CreateRole";
import EditRole from "./Authentication/Auth_RolesEdit";
import EditAllPipelines from "./AllOpportunity/EditAllPipelines";
import EditClientStage from "./AllClient/EditClientStage";
import ViewProject from "./Project/AllPiplines/ViewProject";
import ViewPiplines from "./AllOpportunity/AllPiplines/ViewPiplines";
import ViewAction from "./AllAction/ViewAction";
import StageChange from "./CustomFields/StageChange";
import ProjectsStageSetting from "./Project/AllPiplines/ProjectsStageSetting";
import ActionStageSetting from "./AllAction/AllPiplines/StageSetting";
import MeetingStageSetting from "./Meeting/AllPiplines/MeetingStageSetting";
import { MainAuthPermissionsContext } from "./context/MainAuthPermissionsContext";
import { MaintSettingsByUserContext } from "./context/MaintSettingsByUserContext";
import EditProject from "./Project/AllPiplines/EditProject";
import { MainCalendarListContext } from "./context/MainCalendarListContext";
import { MainProjectListContext } from "./context/MainProjectListContext";
import { MainActionListContext } from "./context/MainActionListContext";
import { MainFollowupListContext } from "./context/MainFollowupListContext";
import { MainMeetingListContext } from "./context/MainMeetingListContext";
import { MainOpportunitiesListContext } from "./context/MainOpportunitiesListContext";
import CreatePipline1 from "./AllOpportunity/Opp_New_Pipeline1";
import EditFollowUp from './AllFollowup/EditFollowUp';
import { Helmet } from 'react-helmet-async';
import MeetingDemos from "./Meeting/MeetingDemos";
import EditPendingProspect from "./PendingProspects/EditPendingProspect";
import Automation from "./Automation";
import Autmationdemo from "./Autmationdemo";
import AllAutomation from "./AllAutomation";
import CreateMeeting1 from './Meeting/CreateMeetings1'
import UserView from "./UserView";
import SiteView from "./SiteTracking/SiteView";
import Privacy from "./Privacy/Privacy";
import Conditions from "./Condition/Conditions";
import CalenderTest from "./CalenderTest";
import EditAutomation from "./EditAutomation";

function Dashboard() {
  const authentication = getTokenSession();
  const navigate = useNavigate();
  useEffect(() => {
    !getTokenSession() && navigate(`/${config.ddemoss}login`);
  }, []);
  const [languageSelected, setlanguageSelected] = useState("")
  const { addData, transData } = useContext(MainTranslationContext);
  const { translations, addTranslation } = useContext(MainTranslationContexts);
  const { addPermission, leadPermission } = useContext(MainLeadPermissionContext);
  const { addsetPermissions, permissions } = useContext(MainAuthPermissionsContext);
  const { addSystemSetting, systemSetting } = useContext(MaintSettingsByUserContext);
  const { addCalendarList } = useContext(MainCalendarListContext);
  const { addProjectList } = useContext(MainProjectListContext);
  const { addActionList } = useContext(MainActionListContext);
  const { addFollowupList } = useContext(MainFollowupListContext);
  const { addMeetingList } = useContext(MainMeetingListContext);
  const { addOpportunitiesList } = useContext(MainOpportunitiesListContext);


  const { data: AllDashBoardData, loading } = useFetch("", `getAllDashBord`);


  const handleTransationChange = (item) => {
    setTranslation(item.lang_id);
    setTranslationimg(item.lang_image);
    axios.defaults.headers = {
      authentication: `${authentication}`,
    };
    axios
      .get(`${config.apiEndPoint}getLangObject/${item.lang_id}`)
      .then((response) => {
        setlanguageSelected(response.data)
        addTranslation(response.data)
      })
      .catch((error) => {
        if (error.response.status === 401)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  };
  useEffect(() => {
    if (AllDashBoardData) {
      const { getAllCalendarsApi, getAllLanguagesApi, getAllViewOpportunityPiplinesApi, getAllViewProjectsPiplinesApi, getAuthSideBarAccessApi, getAuthTokenInfoApi, getLangObjectApi, getSettingsByUser, postAllViewActionPiplinesApi, postAllViewFollow_UpPiplinesApi, postAllViewMeetingPiplinesApi } = AllDashBoardData
      addData(getAllLanguagesApi);
      addTranslation(getLangObjectApi?.object);
      addPermission(getAuthSideBarAccessApi);
      addsetPermissions(getAuthTokenInfoApi);
      addCalendarList(getAllCalendarsApi)
      addProjectList(getAllViewProjectsPiplinesApi)
      addOpportunitiesList(getAllViewOpportunityPiplinesApi)
      addActionList(postAllViewActionPiplinesApi)
      addFollowupList(postAllViewFollow_UpPiplinesApi)
      addMeetingList(postAllViewMeetingPiplinesApi)
      addSystemSetting(getSettingsByUser)
      setlanguageSelected(getLangObjectApi?.data)
    }
  }, [AllDashBoardData])
  if (!systemSetting || !AllDashBoardData || loading || !permissions || !leadPermission || !transData) return <Loader />;

  document.querySelector(`[rel=icon]`) && document.querySelector(`[rel=icon]`).setAttribute("href", `${config.baseurl2}${permissions["system-favicon-image"]?.setting_value}`)
  document.querySelector(`[rel=apple-touch-icon]`) && document.querySelector(`[rel=apple-touch-icon]`).setAttribute("href", `${config.baseurl2}${permissions["system-favicon-image"]?.setting_value}`)
// console.log(env.main)
  return (
    <>
      <div id="main_content">

        <Helmet>
          {/* <link rel="icon" href={`${config.baseurl2}${permissions["system-favicon-image"]?.setting_value}`} /> */}
          {/* <link rel="apple-touch-icon" href={`${config.baseurl2}${permissions["system-favicon-image"]?.setting_value}`} /> */}
        </Helmet>
        <LeftSmallNavigation />
        <LeftSideBar />
        <div className="page">
          <Header data={languageSelected} Change={(item) => handleTransationChange(item)} />
          <div id="section-body" className="section-body mt-3">
            <Routes>
              <Route path={`/*`} element={<AdminDashboard />} />
              <Route path="/leads/:active" element={<AllLead />} />
              <Route path={`/lead/edit/:id`} element={<EditLead />} />
              <Route path={`/createlead`} element={<CreateLead />} />
              <Route path={`/register`} element={<Register />} />
              <Route path={`/customfield`} element={<Allcustomfield />} />
              <Route path={`/createcustomfield`} element={<Createcustomfield />} />
              <Route path={`/project/:id/:active`} element={<AllProject translation={translations} />} />
              <Route path={`/action/:id/:active`} element={<AllAction translation={translations} />} />
              <Route path={`/followup/:id/:active`} element={<AllFollowUp />} />
              <Route
                path={`/meeting/:id/:active`}
                element={<AllMeeting translation={translations} />}
              />
              <Route
                path={`/project_status`}
                element={<ProjectStatus translation={translations} />}
              />
              <Route
                path={`/meetingdemo/edit/:id`}
                element={<MeetingDemos translation={translations} />}
              />
              <Route
                path={`/opportunity_status`}
                element={<OpportunityStatus translation={translations} />}
              />
              <Route
                path={`/opportunity_status/edit/:id`}
                element={<EditOpportunityStatus />}
              />
              <Route
                path={`/users`}
                element={<AllUsers translation={translations} />}
              />
              <Route
                path={`/users/edit/:id`}
                element={<AllUsersEdit translation={translations} />}
              />
              <Route
                path={`/list_profiles`}
                element={<Profiles translation={translations} />}
              />
              <Route path={`/list_profiles/edit/:id`} element={<EditProfile />} />
              <Route path={`roles`} element={<Auth_Roles translation={translations} />} />
              <Route
                path={`roles/CreateRole`}
                element={<CreateRole />}
              />
              <Route
                path={`roles/EditRole/:id`}
                element={<EditRole />}
              />
              <Route
                path={`login_history`}
                element={<Auth_History />}
              />
              <Route
                path={`tags`}
                element={<Auth_Tags />}
              />
              <Route path={`system_settings`} element={<Auth_System_settings />} />
              <Route path={`/user/signature/:id`} element={<Signature />} />
              <Route path={`/create_profile`} element={<CreateProfile translation={translations} />} />
              <Route
                path={`/create_client`}
                element={<CreateClient translation={translations} />}
              />
              <Route path={`/create_lead`} element={<CreateLead translation={translations} />} />
              <Route path={`/contacts`} element={<AllContact translation={translations} />} />
              <Route
                path={`/all_prospects/:active`}
                element={<AllProspects translation={translations} />}
              />
              {/* adding new  route ........................................................... */}
              <Route
                path={`/create_prospectstage`}
                element={<CreateProspectStage translation={translations} />}
              />

              <Route
                path={`/templates`}
                element={<CommunicationTemplates translation={translations} />}
              />
              <Route
                path={`/communication_cats_subcats`}
                element={<CommunicationTemplatesCatsAndSub translation={translations} />}
              />
              <Route
                path={`/communication_cats_edit`}
                element={<CommunicationTemplatesCatsAndSubEdit translation={translations} />}
              />
              <Route path={`/create_contact`} element={<Createcontact translation={translations} />} />
              <Route path={`/createopportunity`} element={<CreatePipeline />} />
              <Route path={`/createopportunity/:id`} element={<CreatePipline1 />} />
              <Route path={`/opportunities/:id/:active`} element={<Opportunity />} />
              <Route path={`/opportunity_pipelines/:pipeline_id/stage_setting`} element={<OpportunityStageSetting translation={translations} />} />
              <Route
                path={`/action_pipelines/:pipeline_id/stage_setting`}
                element={<ActionStageSetting translation={translations} />}
              />
              <Route
                path={`/opportunity_pipelines/:pipeline_id/edit_stage/:id`} element={<EditStage />} />
              <Route
                path={`/opportunity_pipelines/:id/create_stage`}
                element={<CreateStage translation={translations} />}
              />
              <Route path={`/opportunity_pipelines`} element={<Pipelines translation={translations} />} />
              <Route path={`/opportunity_pipelines/edit/:id`} element={<EditPiplines translation={translations} />} />


              <Route
                path={`/action_pipelines/:pipeline_id/edit_stage/:id`}
                element={<EditActionPipelineStage translation={translations} />}
              />
              <Route path={`/opp_pipelines/edit/:id`} element={<EditAllPipelines />}
              />
              <Route path={`/action_pipelines/:id/create_stage`} element={<CreateActionPipelineStage translation={translations} />}
              />
              <Route path={`/action_pipelines`} element={<ActionPipelines translation={translations} />} />
              <Route path={`/action_pipelines/edit/:id`} element={<EditActionPiplines translation={translations} />} />

              <Route
                path={`/followup_pipelines/:pipeline_id/edit_stage/:id`}
                element={<EditFollowupPipelineStage translation={translations} />}
              />
              <Route
                path={`/followup_pipelines/:pipeline_id/stage_setting`}
                element={<FollowupPipelineStageSetting translation={translations} />}
              />

              <Route
                path={`/followup_pipelines/:id/create_stage`}
                element={<CreateFollowupPipelineStage translation={translations} />}
              />
              <Route path={`/followup_pipelines`} element={<FollowupPipelines translation={translations} />} />
              <Route path={`/followup_pipelines/edit/:id`} element={<EditFollowupPiplines translation={translations} />} />

              <Route path={`/meeting_pipelines/:pipeline_id/edit_stage/:id`} element={<EditMeetingPipelineStage />} />
              <Route
                path={`/meeting_pipelines/:id/create_stage/`}
                element={<CreateMeetingPipelineStage translation={translations} />}
              />
              <Route path={`/meeting_pipelines`} element={<MeetingPipelines translation={translations} />} />
              <Route path={`/meeting_pipelines/edit/:id`} element={<EditMeetingPiplines translation={translations} />} />


              <Route path={`/project_pipelines/:pipeline_id/edit_stage/:id`} element={<EditProjectPipelineStage />} />
              <Route
                path={`/meeting_pipelines/:pipeline_id/stage_setting`}
                element={<MeetingStageSetting translation={translations} />} // {0_0} 
              />
              <Route
                path={`/project_pipelines/:id/create_stage`}
                element={<CreateProjectPipelineStage translation={translations} />}
              />
              <Route
                path={`/project_pipelines/:projectid/settings_projectstage`}
                element={<ProjectsStageSetting />}
              />
              <Route path={`/project_pipelines`} element={<ProjectPipelines translation={translations} />} />
              <Route path={`/project_pipelines/edit/:id`} element={<EditProjectPiplines translation={translations} />} />
              <Route
                path={`/correlationsdb`}
                element={<Correlations translation={translations} />}
              />
              <Route
                path={`/pending_prospects`}
                element={<AllPendingProspects translation={translations} />}
              />
              <Route path={`/source`} element={<Source translation={translations} />}
              />
              <Route
                path={`/contact_types`}
                element={<ContactTypes translation={translations} />}
              />
              <Route
                path={`/settings`}
                element={<Settings translation={translations} />}
              />
              <Route
                path={`/clients/:active`}
                element={<AllClient translation={translations} />}
              />
              {/* add new route  */}
              <Route
                path={`/create_clientstage`}
                element={<CreateClientStage translation={translations} />}
              />
              <Route path={`/calendar/view/:id`} element={<ViewCalendar />} />
              <Route
                path={`/createaction`}
                element={<CreateAction translation={translations} />}
              />
              <Route
                path={`/createaction/:id`}
                element={<CreateAction translation={translations} />}
              />
              <Route
                path={`/createfollowup`}
                element={<CreateFollowup translation={translations} />}
              />
              <Route
                path={`/createfollowup/:id`}
                element={<CreateFollowUp1 translation={translations} />}
              />
              <Route
                path={`/createmeeting`}
                element={<CreateMeeting translation={translations} />}
              />
              <Route
                path={`/createmeeting/:id`}
                element={<CreateMeeting1 translation={translations} />}
              />
              <Route
                path={`/calendar/editevent/:id`}
                element={<EditEvent translation={translations} />}
              />
              <Route
                path={`/action_priority`}
                element={<Priority translation={translations} />}
              />
              <Route path={`/meeting_priority`} element={<MeetingPriority />} />
              <Route
                path={`/followup_severity`}
                element={<Severity translation={translations} />}
              />
              <Route
                path={`/Translation`}
                element={<TranslationPage translation={translations} />}
              />
              <Route
                path={`/translation/edit/:id`}
                element={<EditTranslation translation={translations} />}
              />
              <Route path={`/media`} element={<Media translation={translations} />}
              />
              <Route
                path={`/opp_pipelines`}
                element={<AllPiplines translation={translations} />}
              />
              <Route
                path={`/opp_new_create`}
                element={<AllPiplines translation={translations} />}
              />
              <Route
                path={`/createproject`}
                element={<Projectnew translation={translations} />}
              />
              <Route
                path={`/createproject/:id`}
                element={<Projectnew1 translation={translations} />}
              />
              <Route
                path={`/ProjectStatus`}
                element={<ProjectStatus translation={translations} />}
              />
              <Route
                path={`/Severity`}
                element={<Severity translation={translations} />}
              />
              <Route
                path={`/create_prospect`}
                element={<Prospect translation={translations} />}
              />
              <Route path={`/prospect/edit/:id`} element={<EditProspect />} />
              <Route path={`/lead/view/:id`} element={<ViewLead translation={translations} />} />
              <Route
                path={`/create_leadstage`}
                element={<CreateLeadStage translation={translations} />}
              />
              <Route
                path={`/settings_prospectstage`}
                element={<SettingProspectStage translation={translations} />}
              />
              <Route
                path={`/settings_clientstage`}
                element={<SettingClientStage translation={translations} />}
              />
              <Route
                path={`/settings_leadstage`}
                element={<SettingLeadStage translation={translations} />}
              />
              <Route
                path={`/edit_prospectstage/:id`}
                element={<EditProspectStage translation={translations} />}
              />
              <Route path={`/edit_leadstage/:id`} element={<EditLeadStage translation={translations} />} />
              <Route
                path={`/edit_clientstage/:id`}
                element={<EditClientStage />}
              />
              <Route
                path={`/prospect/view/:id`}
                element={<ViewProspect translation={translations} />}
              />
              <Route
                path={`/client/view/:id`}
                element={<ViewClient translation={translations} />}
              />
              <Route path={`/contact/view/:id`} element={<ViewContact />} />
              <Route
                path={`/client/edit/:id`}
                element={<EditClient translation={translations} />}
              />
              <Route
                path={`/contact/edit/:id`}
                element={<EditContact translation={translations} />}
              />
              <Route path={`/meeting/edit/:id`} element={<Meeting/>}
              />
              <Route
                path={`/calendar/create`}
                element={<CreateCalendar translation={translations} />}
              />
              <Route
                path={`/bookable_schedule`}
                element={<BookableSchedule translation={translations} />}
              />
              <Route
                path={`/calendar/new_event`}
                element={<NewEvent translation={translations} />}
              />
              <Route path={`/calendar`} element={<CalendarMain />} />
              <Route path={`/calendar_events`} element={<CalendarEvent />} />
              <Route
                path={`/files`}
                element={<Files />}
              />
              <Route path={`/upload_media`} element={<Upload_media />}
              />
              <Route
                path={`/categories_subcategories`}
                element={<CategoriesSubcategories translation={translations} />}
              />
              <Route
                path={`/media_categories_subcategories_edit`}
                element={<CategoriesSubcategoriesEdit translation={translations} />}
              />
              <Route
                path={`/action_priority/edit/:id`}
                element={<EditActionPriority />}
              />
              <Route path={`/pending/prospect/edit/:id`} element={<EditPendingProspect />} />
              <Route path={`/meeting_priority/edit/:id`} element={<EditMeetingPriority />} />
              <Route path={`/followup_severity/edit/:id`} element={<EditFollowupSeverity />} />
              <Route path={`/projects_status/edit/:id`} element={<EditProjectsStatus />} />
              <Route path={`/custom_field/edit/:id`} element={<EditCustomField />} />
              <Route path={`/profile`} element={<UserProfile />} />
              <Route path="/view/project/:id" element={<ViewProject />} />
              <Route path="/opp_pipelines/view/:id" element={<ViewPiplines />} />
              <Route path="/view/:event/:id" element={<ViewAction />} />
              <Route path="/edit/event/:id" element={<EditFollowUp />} />
              <Route path="/change/stages" element={<StageChange />} />
              <Route path="/edit/project/:id" element={<EditProject />} />
              <Route path={`/allautomation`} element={<AllAutomation />} />
              <Route path={`/automation`} element={<Automation />} />
              <Route path={`/editautomation/edit/:id`} element={<EditAutomation />} />
              <Route path={`/automationdemo`} element={<Autmationdemo />} />
              <Route path={`/sitetracking`} element={<SiteView />} />
              <Route path={`/user/:id`} element={<UserView />} />
              
              <Route path="/calendarGoogleSync/*" element={<CalenderTest />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;