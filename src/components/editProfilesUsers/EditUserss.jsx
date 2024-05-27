import React from 'react'
import '../../../src/dist/css/o-switch.css'
import EditProfileUser from './EditProfileUser';
import EditProfileLeads from './EditProfileLeads';
import Navigation from './Navigation';
import { useState } from 'react';
import EditProfileLeadStages from './EditProfileLeadStages';
import EditProfileProspect from './EditProfileProspect';
import EditProfileProspectStages from './EditProfileProspectStages';
import EditProfileOpportunities from './EditProfileOpportunities';
import EditProfileClients from './EditProfileClients';
import EditProfileContact from './EditProfileContact';
import EditProfileFilesMedia from './EditProfileFilesMedia';
import EditProfileTranslation from './EditProfileTranslation';
import EditProfileRoles from './EditProfileRoles';
import EditProfileCustomFields from './EditProfileCustomFields';
import EditProfileMarketing from './EditProfileMarketing';
import EditProfileProject from './EditProfileProject';
import EditProfileCalendar from './EditProfileCalendar';
import EditProfileActions from './EditProfileActions';
import EditProfileFollowUp from './EditProfileFollowUp';
import EditProfileMeetings from './EditProfileMeetings';
import EditProfileCommunications from './EditProfileCommunications';
// my work 
import EditProfileClientStages from './EditProfileClientStages';
import EditProfileOpportunitiesStages from './EditProfileOpportunitiesStages';
import EditProfileProjectStages from './EditProfileProjectStages';
import EditProfileActionsStages from './EditProfileActionsStages';
import EditProfileFollowUpStages from './EditProfileFollowUpStages';
import EditProfileMeetingsStages from './EditProfileMeetingsStages';
import EditProfileProfile from './EditProfileProfile';
import EditProfileReminder from './EditProfileReminder';
import EditProfileOutofOffice from './EditProfileOutofOffice';
import EditProfileEvent from './EditProfileEvent';


function EditUserss({ itemss, useID, reCallAP }) {
    const tabscusrrent = Object.keys(itemss.privileges_menus)[0];
    const [currentItem, setCurrentItem] = useState(itemss.privileges_menus[tabscusrrent].name);
    const itemscom = itemss.privileges
    const practiceProfileRender = {
        "Profile": <EditProfileProfile reCallAPI={reCallAP} data={itemscom?.profile_module} useIDD={useID} />,
        "Users": <EditProfileUser reCallAPI={reCallAP} data={itemscom?.user_module} useIDD={useID} />,
        "Leads": <EditProfileLeads reCallAPI={reCallAP} data={itemscom?.leads} useIDD={useID} />,
        "Lead Stages": <EditProfileLeadStages reCallAPI={reCallAP} data={itemscom?.lead_stages} useIDD={useID} />,
        "Prospect": <EditProfileProspect reCallAPI={reCallAP} data={itemscom?.prospects} useIDD={useID} />,
        "Prospect Stages": <EditProfileProspectStages reCallAPI={reCallAP} data={itemscom?.prospect_stages} useIDD={useID} />,
        "Clients": <EditProfileClients reCallAPI={reCallAP} data={itemscom?.clients} useIDD={useID} />,
        "Client Stages": <EditProfileClientStages reCallAPI={reCallAP} data={itemscom?.client_stages} useIDD={useID} />,
        "Opportunities": <EditProfileOpportunities reCallAPI={reCallAP} data={itemscom?.opportunities} useIDD={useID} />,
        "Opportunity Stages": <EditProfileOpportunitiesStages reCallAPI={reCallAP} data={itemscom?.opportunity_stages} useIDD={useID} />,
        "Contacts": <EditProfileContact reCallAPI={reCallAP} data={itemscom?.contacts} useIDD={useID} />,
        "Communication Templates": <EditProfileCommunications reCallAPI={reCallAP} data={itemscom?.comm_temp_module} useIDD={useID} />,
        "Files & Media": <EditProfileFilesMedia reCallAPI={reCallAP} data={itemscom?.filesnmedia_module} useIDD={useID} />,
        "Translation": <EditProfileTranslation reCallAPI={reCallAP} data={itemscom?.translate_module} useIDD={useID} />,
        "Roles": <EditProfileRoles reCallAPI={reCallAP} data={itemscom?.roles_module} useIDD={useID} />,
        "Custom Fields": <EditProfileCustomFields reCallAPI={reCallAP} data={itemscom?.custom_fields} useIDD={useID} />,
        "Marketing": <EditProfileMarketing reCallAPI={reCallAP} data={itemscom?.marketing} useIDD={useID} />,
        "Projects": <EditProfileProject reCallAPI={reCallAP} data={itemscom?.projects} useIDD={useID} />,
        "Project Stages": <EditProfileProjectStages reCallAPI={reCallAP} data={itemscom?.project_stages} useIDD={useID} />,
        "Calendar": <EditProfileCalendar reCallAPI={reCallAP} data={itemscom?.calendar} useIDD={useID} />,
        "Actions": <EditProfileActions reCallAPI={reCallAP} data={itemscom?.action} useIDD={useID} />,
        "Action Stages": <EditProfileActionsStages reCallAPI={reCallAP} data={itemscom?.action_stages} useIDD={useID} />,
        "Follow Up": <EditProfileFollowUp reCallAPI={reCallAP} data={itemscom?.follow_up} useIDD={useID} />,
        "Follow Up Stages": <EditProfileFollowUpStages reCallAPI={reCallAP} data={itemscom?.follow_up_stages} useIDD={useID} />,
        "Meeting": <EditProfileMeetings reCallAPI={reCallAP} data={itemscom?.meeting} useIDD={useID} />,
        "Meeting Stages": <EditProfileMeetingsStages reCallAPI={reCallAP} data={itemscom?.meeting_stages} useIDD={useID} />,
        "Reminder": <EditProfileReminder reCallAPI={reCallAP} data={itemscom?.reminder} useIDD={useID} />,
        "Out of Office": <EditProfileOutofOffice reCallAPI={reCallAP} data={itemscom?.out_of_office} useIDD={useID} />,
        "Event": <EditProfileEvent reCallAPI={reCallAP} data={itemscom?.event} useIDD={useID} />,
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className="col-md-3 col-sm-12">
                <div className="nav flex-column nav-pills profile-pills">
                    <Navigation items={itemss.privileges_menus}
                        currentItem={currentItem}
                        onCurrentItem={setCurrentItem}
                    />

                </div>
            </div>
            <div className="col-md-9 col-sm-12 ">
                {/* <EditProfileUser/> */}
                {practiceProfileRender[currentItem]}
            </div>

        </div>
    )
}

export default EditUserss;