const CreateCalendar = {
    "type": [
        {
            label: "Event",
            value:"event"
        },
        {
            label: "Meeting",
            value:"meeting"
        },
        {
            label: "Action",
            value:"action"
        },
        {
            label: "Follow Up",
            value:"follow_up"
        },
        {
            label: "Reminder",
            value:"follow_up"
        },
        {
            label: "Out of Office",
            value:"out_of_office"
        },
    ]
    
}
const PrivilegesUser = ["usrs_fname","usrs_lname","usrs_avatar","usrs_username","usrs_main_phone_number","usrs_email","usrs_password","usrs_cpassword","usrs_type","usrs_mobile_number","usrs_role","usrs_profile","usrs_status","usrs_title","usrs_fax","usrs_department","usrs_other_email","usrs_secondary_email","usrs_office_phone","usrs_mobile_phone","usrs_home_phone","usrs_secondary_phone","usrs_signature","usrs_reports_to","usrs_street_address","usrs_city","usrs_state","usrs_country","usrs_postal_code","usrs_language","usrs_timezone","usrs_facebook","usrs_instagram","usrs_twitter","usrs_linkedin","usrs_youtube","usrs_tiktok","usrs_telegram","usrs_snapchat","usrs_discord","usrs_pinterest","usrs_zillow","usrs_realtor","usrs_website","usrs_whatsapp"];
const PrivilegesLead = ["leads_fname",'leads_Persona','leads_Preferred_Bathrooms_Number',"leads_lname","leads_avtar","leads_upload","leads_phone_number","leads_lead_stage","leads_lead_medium","leads_email","leads_email_status","leads_score_number","leads_mobile_phone","leads_contact_owner","leads_birthday","leads_contact_type","leads_created_date","leads_updated_date","leads_tags","leads_file_upload","leads_file_delete","leads_notes","leads_address1","leads_address2","leads_city","leads_sourcepage","leads_postal_code",'leads_state','leads_country','leads_lead_source','leads_ipaddress','leads_time_zone','leads_locale','leads_Qualified_Special','leads_Phone_Status','leads_Mortgage_Status','leads_Quality','leads_Do_not_disturb','leads_Type_of_Contact','leads_Concierge','leads_Business_Unit','leads_Medium','leads_Keyword','leads_UTM_Medium','leads_UTM_Term','leads_gclid','leads_UTM_Content','leads_Campaign','leads_UTM_Source','leads_CTA','leads_UTM_Campaign','leads_Lead_Generation_Partner','leads_Landing_Page','leads_Uzair22','leads_Objections','leads_Opportunity','leads_Uzair','leads_Liquidity','leads_Interests','leads_Mortgage_Value','leads_Uzairfeld','leads_Preferred_Location','leads_Preferred_House_Type','leads_Preferred_Bedroom_Number','leads_Preferred_Property_Features','leads_Gender','leads_Persona_Type','leads_Secondary_Phone_Number','leads_Third_Phone_Number','leads_Fourth_Phone_Number','leads_Fifth_Phone_Number','leads_Budget','leads_Preferred_Location_if_Other','leads_Preferred_Location_if_Other','leads_Preferred_Property_Size_(sqf)','leads_Account/Company_Name_(USA)','leads_Persona','leads_Threat','leads_Secondary_eMail','leads_Third_eMail','leads_Fourth_eMail','leads_Fifth_eMail','leads_Website','leads_Instagram','leads_Linkedin','leads_Type_of_Employer','leads_Employer_Name','leads_Position','leads_Tax_ID_USA','leads_Tax_ID_USA_Type','leads_Tax_ID_Foreign_Type','leads_Facebook','leads_Twitter','leads_Youtube','leads_Job_Title','leads_Employer_Industry','leads_Salary','leads_Tax_ID_Foreign']
const PrivilegesProspect = ['prospects_fname','prospects_Youtube','prospects_lname','prospects_avtar','prospects_upload','prospects_phone_number','prospects_lead_stage','prospects_lead_medium','prospects_email','prospects_score_number','prospects_mobile_phone','prospects_contact_owner','prospects_birthday','prospects_contact_type','prospects_created_date','prospects_updated_date','prospects_tags','prospects_file_upload','prospects_file_delete','prospects_notes','prospects_address1','prospects_address2','prospects_sourcepage','prospects_postal_code','prospects_state','prospects_country','prospects_lead_source','prospects_ipaddress','prospects_time_zone','prospects_locale','prospects_Qualified_Special','prospects_Phone_Status','prospects_Mortgage_Status','prospects_Quality','prospects_Do_not_disturb','prospects_Type_of_Contact','prospects_Concierge','prospects_email_status','prospects_Business_Unit','prospects_Medium','prospects_Keyword','prospects_UTM_Medium','prospects_UTM_Term','prospects_gclid','prospects_UTM_Content','prospects_Campaign','prospects_UTM_Source','prospects_CTA','prospects_UTM_Campaign','prospects_Lead_Generation_Partner','prospects_Landing_Page','prospects_Uzair22','prospects_Objections','prospects_Objections','prospects_Uzair','prospects_Liquidity','prospects_Interests','prospects_Threat','prospects_Mortgage_Value','prospects_Uzairfeld','prospects_Preferred_Location','prospects_Preferred_House_Type','prospects_Preferred_Bedroom_Number','prospects_Preferred_Property_Features','prospects_Gender','prospects_Opportunity','prospects_Persona_Type','prospects_Secondary_Phone_Number','prospects_Third_Phone_Number','prospects_Fourth_Phone_Number','prospects_Fifth_Phone_Number','prospects_Budget','prospects_Preferred_Location_if_Other','prospects_Preferred_Bathrooms_Number','prospects_Preferred_Property_Size_(sqf)','prospects_Account/Company_Name_(USA)','prospects_Persona','prospects_Secondary_eMail','prospects_Third_eMail','prospects_Fourth_eMail','prospects_Fifth_eMail','prospects_Website','prospects_Instagram','prospects_Linkedin','prospects_Type_of_Employer','prospects_Employer_Name','prospects_Position','prospects_Tax_ID_USA','prospects_Tax_ID_USA_Type','prospects_Tax_ID_Foreign_Type','prospects_Facebook','prospects_Twitter','prospects_Job_Title','prospects_Employer_Industry','prospects_Salary','prospects_Tax_ID_Foreign']
const PrivilegesClient = ['clients_fname','clients_lname','clients_avtar','clients_upload','clients_phone_number','clients_lead_stage','clients_lead_medium','clients_email','clients_email_status','clients_score_number','clients_mobile_phone','clients_contact_owner','clients_birthday','clients_contact_type','clients_created_date','clients_updated_date','clients_tags','clients_file_upload','clients_file_delete','clients_notes','clients_address1','clients_address2','clients_sourcepage','clients_postal_code','clients_state','clients_country','clients_lead_source','clients_ipaddress','clients_time_zone','clients_locale','clients_Qualified_Special','clients_Phone_Status','clients_Mortgage_Status','clients_Quality','clients_Do_not_disturb','clients_Type_of_Contact','clients_Concierge','clients_Business_Unit','clients_Medium','clients_Medium','clients_UTM_Medium','clients_UTM_Term','clients_gclid','clients_UTM_Content','clients_Campaign','clients_UTM_Source','clients_CTA','clients_UTM_Campaign','clients_Lead_Generation_Partner','clients_Landing_Page','clients_Uzair22','clients_Objections','clients_Opportunity','clients_Uzair','clients_Liquidity','clients_Interests','clients_Threat','clients_Mortgage_Value','clients_Uzairfeld','clients_Preferred_Location','clients_Preferred_House_Type','clients_Preferred_Bedroom_Number','clients_Preferred_Property_Features','clients_Gender','clients_Persona_Type','clients_Secondary_Phone_Number','clients_Third_Phone_Number','clients_Fourth_Phone_Number','clients_Fifth_Phone_Number','clients_Budget','clients_Preferred_Location_if_Other','clients_Preferred_Bathrooms_Number','clients_Preferred_Property_Size_(sqf)','clients_Account/Company_Name_(USA)','clients_Persona','clients_Secondary_eMail','clients_Third_eMail','clients_Fourth_eMail','clients_Fifth_eMail','clients_Website','clients_Instagram','clients_Linkedin','clients_Type_of_Employer','clients_Employer_Name','clients_Position','clients_Tax_ID_USA','clients_Tax_ID_USA_Type','clients_Tax_ID_Foreign_Type','clients_Facebook','clients_Twitter','clients_Youtube','clients_Job_Title','clients_Employer_Industry','clients_Salary','clients_Tax_ID_Foreign','clients_First_Conversation_Detail','clients_Testing2','clients_Reasons_To_Choose_1st_Stage','clients_2nd_Call_Detail','clients_Video_Link','clients_Uzair320','clients_Do_We_Have_Testimony','clients_Uzair920','clients_Keyword']
const PrivilegesContact = ['contact_fullname','contact_avtar','contact_phone_number','contact_email','contact_created_date','contact_note','contact_convert_contact','contacts_contact_type']
const PrivilegesOpportunities = ['opportunity_opp_title','opportunity_Uzair','opportunity_opp_value','opportunity_assignto','opportunity_pipeline','opportunity_notes','opportunity_opp_stage','opportunity_opp_owner','opportunity_opp_description','opportunity_opp_status','opportunity_opp_file_delete','opportunity_opp_contact','opportunity_opp_forcastedate','opportunity_opp_tags','opportunity_opp_fileupload','opportunity_Teste','opportunity_Muzzamil_Feld','opportunity_Hammad_Field','opportunity_EB5_Visitas','opportunity_Conhecimento','opportunity_Investimento','']
const PrivilegesProjects = ['projects_prj_title','projects_prj_assignto','projects_prj_pipeline','projects_prj_notes','projects_Uzair','projects_prj_stage','projects_prj_description','projects_prj_status','projects_prj_startdate','projects_prj_enddate','projects_prj_location','projects_prj_tags','projects_prj_fileupload','projects_prj_file_delete','projects_prj_relatedto','projects_Teste','projects_Muzzamil_Feld','projects_Hammad_Field','']
const PrivilegesCalander = ['calendar_name','calendar_email','calendar_slug','calendar_privacy','calendar_system_status','calendar_google_meet','calendar_location','calendar_description','calendar_color','calendar_settings']
const PrivilegesAction = ['actions_title','actions_priority','actions_calendar','actions_color','actions_pipeline','actions_stage','actions_location','actions_start_date','actions_start_date_time','actions_end_date','actions_end_date_time','actions_time_zone','actions_related_to','actions_has_dependency','actions_all_day','actions_recursive_event','actions_privacy','actions_visibility','actions_google_meet','actions_meeting_platform','actions_description','actions_notification','actions_feature_image','actions_members','actions_Description']
const PrivilegesReminder = ['reminder_title','reminder_priority','reminder_calendar','reminder_color','reminder_pipeline','reminder_stage','reminder_location','reminder_start_date','reminder_start_date_time','reminder_end_date','reminder_end_date_time','reminder_time_zone','reminder_related_to','reminder_has_dependency','reminder_all_day','reminder_recursive_event','reminder_privacy','actions_visibility','reminder_google_meet','reminder_meeting_platform','reminder_description','reminder_notification','reminder_feature_image','reminder_members','reminder_Description']
const PrivilegesOut_of_Office = ['out_of_office_title','out_of_office_priority','out_of_office_calendar','out_of_office_color','out_of_office_pipeline','out_of_office_stage','out_of_office_location','out_of_office_start_date','out_of_office_start_date_time','out_of_office_end_date','out_of_office_end_date_time','out_of_office_time_zone','out_of_office_related_to','out_of_office_has_dependency','out_of_office_all_day','out_of_office_recursive_event','out_of_office_privacy','out_of_office_visibility','out_of_office_google_meet','out_of_office_meeting_platform','out_of_office_description','out_of_office_notification','out_of_office_feature_image','out_of_office_members','out_of_office_Description']
const PrivilegesEvent = ['event_title','event_priority','event_calendar','event_color','event_pipeline','event_stage','event_location','event_start_date','event_start_date_time','event_end_date','event_end_date_time','event_time_zone','event_related_to','event_has_dependency','event_all_day','event_recursive_event','event_privacy','event_visibility','event_google_meet','event_meeting_platform','event_description','event_notification','event_feature_image','event_members','event_Description']
const PrivilegesFollowup = ['followups_title','followups_severity','followups_calendar','followups_color','followups_pipeline','followups_stage','followups_location','followups_start_date','followups_start_date_time','followups_end_date','followups_end_date_time','followups_time_zone','followups_related_to','followups_has_dependency','followups_all_day','followups_recursive_event','followups_privacy','followups_visibility','followups_google_meet','followups_meeting_platform','followups_description','followups_notification','followups_feature_image','followups_members']
const PrivilegesMetting = ['meetings_title','meetings_priority','meetings_calendar','meetings_color','meetings_pipeline','meetings_stage','meetings_location','meetings_start_date','meetings_start_date_time','meetings_end_date','meetings_end_date_time','meetings_time_zone','meetings_related_to','meetings_has_dependency','meetings_all_day','meetings_recursive_event','meetings_privacy','meetings_visibility','meetings_google_meet','meetings_meeting_platform','meetings_description','meetings_notification','meetings_feature_image','meetings_members'];
const checkboxData = [
    {
      label: "id",
      value: "1",
      name: "id",
    },
    {
      label: "module",
      value: "1",
      name: "module",
    },
    {
      label: "avatar_type",
      value: "1",
      name: "avatar_type",
    }
    ,
    {
      label: "avatar",
      value: "1",
      name: "avatar",
    }
    ,
    {
      label: "fname",
      value: "1",
      name: "fname",
    }
    ,
    {
      label: "lname",
      value: "1",
      name: "lname",
    }
    ,
    {
      label: "fullname",
      value: "1",
      name: "fullname",
    }
    ,
    {
      label: "number",
      value: "1",
      name: "number",
    }
    ,
    {
      label: "lead_stage",
      value: "1",
      name: "lead_stage",
    }
    ,
    {
      label: "prospect_stage",
      value: "1",
      name: "prospect_stage",
    }
    ,
    {
      label: "client_stage",
      value: "1",
      name: "client_stage",
    }
    ,
    {
      label: "lost_stage_reason",
      value: "1",
      name: "lost_stage_reason",
    }
    ,
    {
      label: "lost_prospect_reason",
      value: "1",
      name: "lost_prospect_reason",
    }
    ,
    {
      label: "lost_client_reason",
      value: "1",
      name: "lost_client_reason",
    }
    ,
    {
      label: "email",
      value: "1",
      name: "email",
    }
    ,
    {
      label: "email_status",
      value: "1",
      name: "email_status",
    }
    ,
    {
      label: "score_number",
      value: "1",
      name: "score_number",
    }
    ,
    {
      label: "tags",
      value: "1",
      name: "tags",
    }
    ,
    {
      label: "mobile_phone",
      value: "1",
      name: "mobile_phone",
    }
    ,
    {
      label: "whatsapp_number",
      value: "1",
      name: "whatsapp_number",
    }
    ,
    {
      label: "contact_owner",
      value: "1",
      name: "contact_owner",
    }
    ,
    {
      label: "contact_date",
      value: "1",
      name: "contact_date",
    }
    ,
    {
      label: "birthday",
      value: "1",
      name: "birthday",
    }
    ,
    {
      label: "address_one",
      value: "1",
      name: "address_one",
    }
    ,
    {
      label: "address_two",
      value: "1",
      name: "address_two",
    }
    ,
    {
      label: "city",
      value: "1",
      name: "city",
    }
    ,
    {
      label: "zip",
      value: "1",
      name: "zip",
    }
    ,
    {
      label: "state",
      value: "1",
      name: "state",
    }
    ,
    {
      label: "country",
      value: "1",
      name: "country",
    }
    ,
    {
      label: "ip_address",
      value: "1",
      name: "ip_address",
    }
    ,
    {
      label: "time_zone",
      value: "1",
      name: "time_zone",
    }
    ,
    {
      label: "locale",
      value: "1",
      name: "locale",
    }
    ,
    {
      label: "updated_date",
      value: "1",
      name: "updated_date",
    }
    ,
    {
      label: "created_date",
      value: "1",
      name: "created_date",
    }
    ,
    {
      label: "lead_by",
      value: "1",
      name: "lead_by",
    }
    ,
    {
      label: "lead_assigned_to",
      value: "1",
      name: "lead_assigned_to",
    }
    ,
    {
      label: "lead_followers",
      value: "1",
      name: "lead_followers",
    }
    ,
    {
      label: "lead_sourcepage",
      value: "1",
      name: "lead_sourcepage",
    }
    ,
    {
      label: "lead_leadsource",
      value: "1",
      name: "lead_leadsource",
    }
    ,
    {
      label: "lead_conversion",
      value: "1",
      name: "lead_conversion",
    }
    ,
    {
      label: "conversion_date",
      value: "1",
      name: "conversion_date",
    }
    ,
    {
      label: "conversion_sdr",
      value: "1",
      name: "conversion_sdr",
    }
    ,
    {
      label: "client_conversion_date",
      value: "1",
      name: "client_conversion_date",
    }
    ,
    {
      label: "client_conversion_owner",
      value: "1",
      name: "client_conversion_owner",
    }
    ,
    {
      label: "first_deal_date",
      value: "1",
      name: "first_deal_date",
    }
    ,
    {
      label: "first_sale_date",
      value: "1",
      name: "first_sale_date",
    }
    ,
    {
      label: "unqualified_date",
      value: "1",
      name: "unqualified_date",
    }
    ,
    {
      label: "unqualified_owner",
      value: "1",
      name: "unqualified_owner",
    }
    ,
    {
      label: "validation_date",
      value: "1",
      name: "validation_date",
    }
    ,
    {
      label: "validation_owner",
      value: "1",
      name: "validation_owner",
    }
    ,
    {
      label: "prospect_lost_date",
      value: "1",
      name: "prospect_lost_date",
    }
    ,
    {
      label: "prospect_lost_owner",
      value: "1",
      name: "prospect_lost_owner",
    }
    ,
    {
      label: "type_of_contact",
      value: "1",
      name: "type_of_contact",
    }
  ]
  const EmailStatus =  [
    {
      "label": "Valid",
      "value": "Valid"
    },
    {
      "label": "Unknown",
      "value": "Unknown"
    },
    {
      "label": "Invalid",
      "value": "Invalid"
    },
    {
      "label": "Disposable",
      "value": "Disposable"
    },
    {
      "label": "Catchall",
      "value": "Catchall"
    },
    {
      "label": "Confirmed",
      "value": "Confirmed"
    },
    {
      "label": "Unsubscribe",
      "value": "Unsubscribe"
    },
    {
      "label": "Bounced",
      "value": "Bounced"
    },
    {
      "label": "Spam",
      "value": "Spam"
    },
    {
      "label": "Complained",
      "value": "Complained"
    },
  ];
  const timeZone  = [
    {
      label: "Africa/Abidjan (+00:00)",
      value: "Africa/Abidjan",
      selected: false,
    },
    { label: "Africa/Accra (+00:00)", value: "Africa/Accra", selected: false },
    {
      label: "Africa/Addis_Ababa (+03:00)",
      value: "Africa/Addis_Ababa",
      selected: false,
    },
    {
      label: "Africa/Algiers (+01:00)",
      value: "Africa/Algiers",
      selected: false,
    },
    { label: "Africa/Asmara (+03:00)", value: "Africa/Asmara", selected: false },
    { label: "Africa/Bamako (+00:00)", value: "Africa/Bamako", selected: false },
    { label: "Africa/Bangui (+01:00)", value: "Africa/Bangui", selected: false },
    { label: "Africa/Banjul (+00:00)", value: "Africa/Banjul", selected: false },
    { label: "Africa/Bissau (+00:00)", value: "Africa/Bissau", selected: false },
    {
      label: "Africa/Blantyre (+02:00)",
      value: "Africa/Blantyre",
      selected: false,
    },
    {
      label: "Africa/Brazzaville (+01:00)",
      value: "Africa/Brazzaville",
      selected: false,
    },
    {
      label: "Africa/Bujumbura (+02:00)",
      value: "Africa/Bujumbura",
      selected: false,
    },
    { label: "Africa/Cairo (+02:00)", value: "Africa/Cairo", selected: false },
    {
      label: "Africa/Casablanca (+01:00)",
      value: "Africa/Casablanca",
      selected: false,
    },
    { label: "Africa/Ceuta (+01:00)", value: "Africa/Ceuta", selected: false },
    {
      label: "Africa/Conakry (+00:00)",
      value: "Africa/Conakry",
      selected: false,
    },
    { label: "Africa/Dakar (+00:00)", value: "Africa/Dakar", selected: false },
    {
      label: " Africa/Dar_es_Salaam (+03:00)",
      value: "Africa/Dar_es_Salaam",
      selected: false,
    },
    {
      label: "Africa/Djibouti (+03:00)",
      value: "Africa/Djibouti",
      selected: false,
    },
    { label: "Africa/Douala (+01:00)", value: "Africa/Douala", selected: false },
    {
      label: "Africa/El_Aaiun (+01:00)",
      value: "Africa/El_Aaiun",
      selected: false,
    },
    {
      label: "Africa/Freetown (+00:00)",
      value: "Africa/Freetown",
      selected: false,
    },
    {
      label: "Africa/Gaborone (+02:00)",
      value: "Africa/Gaborone",
      selected: false,
    },
    { label: "Africa/Harare (+02:00)", value: "Africa/Harare", selected: false },
    {
      label: "Africa/Johannesburg (+02:00)",
      value: "Africa/Johannesburg",
      selected: false,
    },
    { label: "Africa/Juba (+02:00)", value: "Africa/Juba", selected: false },
    {
      label: "Africa/Kampala (+03:00)",
      value: "Africa/Kampala",
      selected: false,
    },
    {
      label: "Africa/Khartoum (+02:00)",
      value: "Africa/Khartoum",
      selected: false,
    },
    { label: "Africa/Kigali (+02:00)", value: "Africa/Kigali", selected: false },
    {
      label: "Africa/Kinshasa (+01:00)",
      value: "Africa/Kinshasa",
      selected: false,
    },
    { label: "Africa/Lagos (+01:00)", value: "Africa/Lagos", selected: false },
    {
      label: "Africa/Libreville (+01:00)",
      value: "Africa/Libreville",
      selected: false,
    },
    { label: "Africa/Lome (+00:00)", value: "Africa/Lome", selected: false },
    { label: "Africa/Luanda (+01:00)", value: "Africa/Luanda", selected: false },
    {
      label: "Africa/Lubumbashi (+02:00)",
      value: "Africa/Lubumbashi",
      selected: false,
    },
    { label: "Africa/Lusaka (+02:00)", value: "Africa/Lusaka", selected: false },
    { label: "Africa/Malabo (+01:00)", value: "Africa/Malabo", selected: false },
    { label: "Africa/Maputo (+02:00)", value: "Africa/Maputo", selected: false },
    { label: "Africa/Maseru (+02:00)", value: "Africa/Maseru", selected: false },
    {
      label: "Africa/Mbabane (+02:00)",
      value: "Africa/Mbabane",
      selected: false,
    },
    {
      label: "Africa/Mogadishu (+03:00)",
      value: "Africa/Mogadishu",
      selected: false,
    },
    {
      label: "Africa/Monrovia (+00:00)",
      value: "Africa/Monrovia",
      selected: false,
    },
    {
      label: "Africa/Nairobi (+03:00)",
      value: "Africa/Nairobi",
      selected: false,
    },
    {
      label: "Africa/Ndjamena (+01:00)",
      value: "Africa/Ndjamena",
      selected: false,
    },
    { label: "Africa/Niamey (+01:00)", value: "Africa/Niamey", selected: false },
    {
      label: "Africa/Nouakchott (+00:00)",
      value: "Africa/Nouakchott",
      selected: false,
    },
    {
      label: "Africa/Ouagadougou (+00:00)",
      value: "Africa/Ouagadougou",
      selected: false,
    },
    {
      label: "Africa/Porto-Novo (+01:00)",
      value: "Africa/Porto-Novo",
      selected: false,
    },
    {
      label: "Africa/Sao_Tome (+00:00)",
      value: "Africa/Sao_Tome",
      selected: false,
    },
    {
      label: "Africa/Tripoli (+02:00)",
      value: "Africa/Tripoli",
      selected: false,
    },
    { label: "Africa/Tunis (+01:00)", value: "Africa/Tunis", selected: false },
    {
      label: "Africa/Windhoek (+02:00)",
      value: "Africa/Windhoek",
      selected: false,
    },
    { label: "America/Adak (-10:00)", value: "America/Adak", selected: false },
    {
      label: "America/Anchorage (-09:00)",
      value: "America/Anchorage",
      selected: false,
    },
    {
      label: "America/Anguilla (-04:00)",
      value: "America/Anguilla",
      selected: false,
    },
    {
      label: "America/Antigua (-04:00)",
      value: "America/Antigua",
      selected: false,
    },
    {
      label: "America/Araguaina (-03:00)",
      value: "America/Araguaina",
      selected: false,
    },
    {
      label: "America/Argentina/Buenos_Aires (-03:00)",
      value: "America/Argentina/Buenos_Aires",
      selected: false,
    },
    {
      label: "America/Argentina/Catamarca (-03:00)",
      value: "America/Argentina/Catamarca",
      selected: false,
    },
    {
      label: "America/Argentina/Cordoba (-03:00)",
      value: "America/Argentina/Cordoba",
      selected: false,
    },
    {
      label: "America/Argentina/Jujuy (-03:00)",
      value: "America/Argentina/Jujuy",
      selected: false,
    },
    {
      label: "America/Argentina/La_Rioja (-03:00)",
      value: "America/Argentina/La_Rioja",
      selected: false,
    },
    {
      label: "America/Argentina/Mendoza (-03:00)",
      value: "America/Argentina/Mendoza",
      selected: false,
    },
    {
      label: "America/Argentina/Rio_Gallegos (-03:00)",
      value: "America/Argentina/Rio_Gallegos",
      selected: false,
    },
    {
      label: "America/Argentina/Salta (-03:00)",
      value: "America/Argentina/Salta",
      selected: false,
    },
    {
      label: "America/Argentina/San_Juan (-03:00)",
      value: "America/Argentina/San_Juan",
      selected: false,
    },
    {
      label: "America/Argentina/San_Luis (-03:00)",
      value: "America/Argentina/San_Luis",
      selected: false,
    },
    {
      label: "America/Argentina/Tucuman (-03:00)",
      value: "America/Argentina/Tucuman",
      selected: false,
    },
    {
      label: "America/Argentina/Ushuaia (-03:00)",
      value: "America/Argentina/Ushuaia",
      selected: false,
    },
    { label: "America/Aruba (-04:00)", value: "America/Aruba", selected: false },
    {
      label: "America/Asuncion (-03:00)",
      value: "America/Asuncion",
      selected: false,
    },
    {
      label: "America/Atikokan (-05:00)",
      value: "America/Atikokan",
      selected: false,
    },
    { label: "America/Bahia (-03:00)", value: "America/Bahia", selected: false },
    {
      label: "America/Bahia_Banderas (-06:00)",
      value: "America/Bahia_Banderas",
      selected: false,
    },
    {
      label: "America/Barbados (-04:00)",
      value: "America/Barbados",
      selected: false,
    },
    { label: "America/Belem (-03:00)", value: "America/Belem", selected: false },
    {
      label: "America/Belize (-06:00)",
      value: "America/Belize",
      selected: false,
    },
    {
      label: "America/Blanc-Sablon (-04:00)",
      value: "America/Blanc-Sablon",
      selected: false,
    },
    {
      label: "America/Boa_Vista (-04:00)",
      value: "America/Boa_Vista",
      selected: false,
    },
    {
      label: "America/Bogota (-05:00)",
      value: "America/Bogota",
      selected: false,
    },
    { label: "America/Boise (-07:00)", value: "America/Boise", selected: false },
    {
      label: "America/Cambridge_Bay (-07:00)",
      value: "America/Cambridge_Bay",
      selected: false,
    },
    {
      label: "America/Campo_Grande (-04:00)",
      value: "America/Campo_Grande",
      selected: false,
    },
    {
      label: "America/Cancun (-05:00)",
      value: "America/Cancun",
      selected: false,
    },
    {
      label: "America/Caracas (-04:00)",
      value: "America/Caracas",
      selected: false,
    },
    {
      label: "America/Cayenne (-03:00)",
      value: "America/Cayenne",
      selected: false,
    },
    {
      label: "America/Cayman (-05:00)",
      value: "America/Cayman",
      selected: false,
    },
    {
      label: "America/Chicago (-06:00)",
      value: "America/Chicago",
      selected: false,
    },
    {
      label: "America/Chihuahua (-07:00)",
      value: "America/Chihuahua",
      selected: false,
    },
    {
      label: "America/Costa_Rica (-06:00)",
      value: "America/Costa_Rica",
      selected: false,
    },
    {
      label: "America/Creston (-07:00)",
      value: "America/Creston",
      selected: false,
    },
    {
      label: "America/Cuiaba (-04:00)",
      value: "America/Cuiaba",
      selected: false,
    },
    {
      label: "America/Curacao (-04:00)",
      value: "America/Curacao",
      selected: false,
    },
    {
      label: "America/Danmarkshavn (+00:00)",
      value: "America/Danmarkshavn",
      selected: false,
    },
    {
      label: "America/Dawson (-07:00)",
      value: "America/Dawson",
      selected: false,
    },
    {
      label: "America/Dawson_Creek (-07:00)",
      value: "America/Dawson_Creek",
      selected: false,
    },
    {
      label: "America/Denver (-07:00)",
      value: "America/Denver",
      selected: false,
    },
    {
      label: "America/Detroit (-05:00)",
      value: "America/Detroit",
      selected: false,
    },
    {
      label: "America/Dominica (-04:00)",
      value: "America/Dominica",
      selected: false,
    },
    {
      label: "America/Edmonton (-07:00)",
      value: "America/Edmonton",
      selected: false,
    },
    {
      label: "America/Eirunepe (-05:00)",
      value: "America/Eirunepe",
      selected: false,
    },
    {
      label: "America/El_Salvador (-06:00)",
      value: "America/El_Salvador",
      selected: false,
    },
    {
      label: "America/Fort_Nelson (-07:00)",
      value: "America/Fort_Nelson",
      selected: false,
    },
    {
      label: "America/Fortaleza (-03:00)",
      value: "America/Fortaleza",
      selected: false,
    },
    {
      label: "America/Glace_Bay (-04:00)",
      value: "America/Glace_Bay",
      selected: false,
    },
    {
      label: "America/Goose_Bay (-04:00)",
      value: "America/Goose_Bay",
      selected: false,
    },
    {
      label: "America/Grand_Turk (-05:00)",
      value: "America/Grand_Turk",
      selected: false,
    },
    {
      label: "America/Grenada (-04:00)",
      value: "America/Grenada",
      selected: false,
    },
    {
      label: "America/Guadeloupe (-04:00)",
      value: "America/Guadeloupe",
      selected: false,
    },
    {
      label: "America/Guatemala (-06:00)",
      value: "America/Guatemala",
      selected: false,
    },
    {
      label: "America/Guayaquil (-05:00)",
      value: "America/Guayaquil",
      selected: false,
    },
    {
      label: "America/Guyana (-04:00)",
      value: "America/Guyana",
      selected: false,
    },
    {
      label: "America/Halifax (-04:00)",
      value: "America/Halifax",
      selected: false,
    },
    {
      label: "America/Havana (-05:00)",
      value: "America/Havana",
      selected: false,
    },
    {
      label: "America/Hermosillo (-07:00)",
      value: "America/Hermosillo",
      selected: false,
    },
    {
      label: "America/Indiana/Indianapolis (-05:00)",
      value: "America/Indiana/Indianapolis",
      selected: false,
    },
    {
      label: "America/Indiana/Knox (-06:00)",
      value: "America/Indiana/Knox",
      selected: false,
    },
    {
      label: "America/Indiana/Marengo (-05:00)",
      value: "America/Indiana/Marengo",
      selected: false,
    },
    {
      label: "America/Indiana/Petersburg (-05:00)",
      value: "America/Indiana/Petersburg",
      selected: false,
    },
    {
      label: "America/Indiana/Tell_City (-06:00)",
      value: "America/Indiana/Tell_City",
      selected: false,
    },
    {
      label: "America/Indiana/Vevay (-05:00)",
      value: "America/Indiana/Vevay",
      selected: false,
    },
    {
      label: "America/Indiana/Vincennes (-05:00)",
      value: "America/Indiana/Vincennes",
      selected: false,
    },
    {
      label: "America/Indiana/Winamac (-05:00)",
      value: "America/Indiana/Winamac",
      selected: false,
    },
    {
      label: "America/Inuvik (-07:00)",
      value: "America/Inuvik",
      selected: false,
    },
    {
      label: "America/Iqaluit (-05:00)",
      value: "America/Iqaluit",
      selected: false,
    },
    {
      label: "America/Jamaica (-05:00)",
      value: "America/Jamaica",
      selected: false,
    },
    {
      label: "America/Juneau (-09:00)",
      value: "America/Juneau",
      selected: false,
    },
    {
      label: "America/Kentucky/Louisville (-05:00)",
      value: "America/Kentucky/Louisville",
      selected: false,
    },
    {
      label: "America/Kentucky/Monticello (-05:00)",
      value: "America/Kentucky/Monticello",
      selected: false,
    },
    {
      label: "America/Kralendijk (-04:00)",
      value: "America/Kralendijk",
      selected: false,
    },
    {
      label: "America/La_Paz (-04:00)",
      value: "America/La_Paz",
      selected: false,
    },
    { label: "America/Lima (-05:00)", value: "America/Lima", selected: false },
    {
      label: "America/Los_Angeles (-08:00)",
      value: "America/Los_Angeles",
      selected: false,
    },
    {
      label: "America/Lower_Princes (-04:00) ",
      value: "America/Lower_Princes",
      selected: false,
    },
    {
      label: "America/Maceio (-03:00)",
      value: "America/Maceio",
      selected: false,
    },
    {
      label: "America/Managua (-06:00)",
      value: "America/Managua",
      selected: false,
    },
    {
      label: "America/Manaus (-04:00)",
      value: "America/Manaus",
      selected: false,
    },
    {
      label: "America/Marigot (-04:00)",
      value: "America/Marigot",
      selected: false,
    },
    {
      label: "America/Martinique (-04:00)",
      value: "America/Martinique",
      selected: false,
    },
    {
      label: "America/Matamoros (-06:00)",
      value: "America/Matamoros",
      selected: false,
    },
    {
      label: "America/Mazatlan (-07:00)",
      value: "America/Mazatlan",
      selected: false,
    },
    {
      label: "America/Menominee (-06:00)",
      value: "America/Menominee",
      selected: false,
    },
    {
      label: "America/Merida (-06:00)",
      value: "America/Merida",
      selected: false,
    },
    {
      label: "America/Metlakatla (-09:00)",
      value: "America/Metlakatla",
      selected: false,
    },
    {
      label: "America/Mexico_City (-06:00)",
      value: "America/Mexico_City",
      selected: false,
    },
    {
      label: "America/Miquelon (-03:00)",
      value: "America/Miquelon",
      selected: false,
    },
    {
      label: "America/Moncton (-04:00)",
      value: "America/Moncton",
      selected: false,
    },
    {
      label: "America/Monterrey (-06:00)",
      value: "America/Monterrey",
      selected: false,
    },
    {
      label: "America/Montevideo (-03:00)",
      value: "America/Montevideo",
      selected: false,
    },
    {
      label: "America/Montserrat (-04:00)",
      value: "America/Montserrat",
      selected: false,
    },
    {
      label: "America/Nassau (-05:00)",
      value: "America/Nassau",
      selected: false,
    },
    {
      label: "America/New_York (-05:00)",
      value: "America/New_York",
      selected: true,
    },
    {
      label: "America/Nipigon (-05:00)",
      value: "America/Nipigon",
      selected: false,
    },
    { label: "America/Nome (-09:00)", value: "America/Nome", selected: false },
    {
      label: "America/Noronha (-02:00)",
      value: "America/Noronha",
      selected: false,
    },
    {
      label: "America/North_Dakota/Beulah (-06:00)",
      value: "America/North_Dakota/Beulah",
      selected: false,
    },
    {
      label: "America/North_Dakota/Center (-06:00)",
      value: "America/North_Dakota/Center",
      selected: false,
    },
    {
      label: "America/North_Dakota/New_Salem (-06:00)",
      value: "America/North_Dakota/New_Salem",
      selected: false,
    },
    { label: "America/Nuuk (-03:00)", value: "America/Nuuk", selected: false },
    {
      label: "America/Ojinaga (-07:00)",
      value: "America/Ojinaga",
      selected: false,
    },
    {
      label: "America/Panama (-05:00)",
      value: "America/Panama",
      selected: false,
    },
    {
      label: "America/Pangnirtung (-05:00)",
      value: "America/Pangnirtung",
      selected: false,
    },
    {
      label: "America/Paramaribo (-03:00)",
      value: "America/Paramaribo",
      selected: false,
    },
    {
      label: "America/Phoenix (-07:00)",
      value: "America/Phoenix",
      selected: false,
    },
    {
      label: "America/Port-au-Prince (-05:00)",
      value: "America/Port-au-Prince",
      selected: false,
    },
    {
      label: "America/Port_of_Spain (-04:00)",
      value: "America/Port_of_Spain",
      selected: false,
    },
    {
      label: "America/Porto_Velho (-04:00)",
      value: "America/Porto_Velho",
      selected: false,
    },
    {
      label: "America/Puerto_Rico (-04:00)",
      value: "America/Puerto_Rico",
      selected: false,
    },
    {
      label: "America/Punta_Arenas (-03:00)",
      value: "America/Punta_Arenas",
      selected: false,
    },
    {
      label: "America/Rainy_River (-06:00)",
      value: "America/Rainy_River",
      selected: false,
    },
    {
      label: "America/Rankin_Inlet (-06:00)",
      value: "America/Rankin_Inlet",
      selected: false,
    },
    {
      label: "America/Recife (-03:00)",
      value: "America/Recife",
      selected: false,
    },
    {
      label: "America/Regina (-06:00)",
      value: "America/Regina",
      selected: false,
    },
    {
      label: "America/Resolute (-06:00)",
      value: "America/Resolute",
      selected: false,
    },
    {
      label: "America/Rio_Branco (-05:00)",
      value: "America/Rio_Branco",
      selected: false,
    },
    {
      label: "America/Santarem (-03:00)",
      value: "America/Santarem",
      selected: false,
    },
    {
      label: "America/Santiago (-03:00)",
      value: "America/Santiago",
      selected: false,
    },
    {
      label: "America/Santo_Domingo (-04:00)",
      value: "America/Santo_Domingo",
      selected: false,
    },
    {
      label: "America/Sao_Paulo (-03:00)",
      value: "America/Sao_Paulo",
      selected: false,
    },
    {
      label: "America/Scoresbysund (-01:00)",
      value: "America/Scoresbysund",
      selected: false,
    },
    { label: "America/Sitka (-09:00)", value: "America/Sitka", selected: false },
    {
      label: "America/St_Barthelemy (-04:00)",
      value: "America/St_Barthelemy",
      selected: false,
    },
    {
      label: "America/St_Johns (-03:30)",
      value: "America/St_Johns",
      selected: false,
    },
    {
      label: "America/St_Kitts (-04:00)",
      value: "America/St_Kitts",
      selected: false,
    },
    {
      label: "America/St_Lucia (-04:00)",
      value: "America/St_Lucia",
      selected: false,
    },
    {
      label: "America/St_Thomas (-04:00)",
      value: "America/St_Thomas",
      selected: false,
    },
    {
      label: "America/St_Vincent (-04:00)",
      value: "America/St_Vincent",
      selected: false,
    },
    {
      label: "America/Swift_Current (-06:00)",
      value: "America/Swift_Current",
      selected: false,
    },
    {
      label: "America/Tegucigalpa (-06:00)",
      value: "America/Tegucigalpa",
      selected: false,
    },
    { label: "America/Thule (-04:00)", value: "America/Thule", selected: false },
    {
      label: "America/Thunder_Bay (-05:00)",
      value: "America/Thunder_Bay",
      selected: false,
    },
    {
      label: "America/Tijuana (-08:00)",
      value: "America/Tijuana",
      selected: false,
    },
    {
      label: "America/Toronto (-05:00)",
      value: "America/Toronto",
      selected: false,
    },
    {
      label: "America/Tortola (-04:00)",
      value: "America/Tortola",
      selected: false,
    },
    {
      label: "America/Vancouver (-08:00)",
      value: "America/Vancouver",
      selected: false,
    },
    {
      label: "America/Whitehorse (-07:00)",
      value: "America/Whitehorse",
      selected: false,
    },
    {
      label: "America/Winnipeg (-06:00)",
      value: "America/Winnipeg",
      selected: false,
    },
    {
      label: "America/Yakutat (-09:00)",
      value: "America/Yakutat",
      selected: false,
    },
    {
      label: "America/Yellowknife (-07:00)",
      value: "America/Yellowknife",
      selected: false,
    },
    {
      label: "Antarctica/Casey (+11:00)",
      value: "Antarctica/Casey",
      selected: false,
    },
    {
      label: "Antarctica/Davis (+07:00)",
      value: "Antarctica/Davis",
      selected: false,
    },
    {
      label: "Antarctica/DumontDUrville (+10:00)",
      value: "Antarctica/DumontDUrville",
      selected: false,
    },
    {
      label: "Antarctica/Macquarie (+11:00)",
      value: "Antarctica/Macquarie",
      selected: false,
    },
    {
      label: "Antarctica/Mawson (+05:00)",
      value: "Antarctica/Mawson",
      selected: false,
    },
    {
      label: "Antarctica/McMurdo (+13:00)",
      value: "Antarctica/McMurdo",
      selected: false,
    },
    {
      label: "Antarctica/Palmer (-03:00)",
      value: "Antarctica/Palmer",
      selected: false,
    },
    {
      label: "Antarctica/Rothera (-03:00)",
      value: "Antarctica/Rothera",
      selected: false,
    },
    {
      label: "Antarctica/Syowa (+03:00)",
      value: "Antarctica/Syowa",
      selected: false,
    },
    {
      label: "Antarctica/Troll (+00:00)",
      value: "Antarctica/Troll",
      selected: false,
    },
    {
      label: "Antarctica/Vostok (+06:00)",
      value: "Antarctica/Vostok",
      selected: false,
    },
    {
      label: "Arctic/Longyearbyen (+01:00)",
      value: "Arctic/Longyearbyen",
      selected: false,
    },
    { label: "Asia/Aden (+03:00)", value: "Asia/Aden", selected: false },
    { label: "Asia/Almaty (+06:00)", value: "Asia/Almaty", selected: false },
    { label: "Asia/Amman (+02:00)", value: "Asia/Amman", selected: false },
    { label: "Asia/Anadyr (+12:00)", value: "Asia/Anadyr", selected: false },
    { label: "Asia/Aqtau (+05:00)", value: "Asia/Aqtau", selected: false },
    { label: "Asia/Aqtobe (+05:00)", value: "Asia/Aqtobe", selected: false },
    { label: "Asia/Ashgabat (+05:00)", value: "Asia/Ashgabat", selected: false },
    { label: "Asia/Atyrau (+05:00)", value: "Asia/Atyrau", selected: false },
    { label: "Asia/Baghdad (+03:00)", value: "Asia/Baghdad", selected: false },
    { label: "Asia/Bahrain (+03:00)", value: "Asia/Bahrain", selected: false },
    { label: "Asia/Baku (+04:00)", value: "Asia/Baku", selected: false },
    { label: "Asia/Bangkok (+07:00)", value: "Asia/Bangkok", selected: false },
    { label: "Asia/Barnaul (+07:00)", value: "Asia/Barnaul", selected: false },
    { label: "Asia/Beirut (+02:00)", value: "Asia/Beirut", selected: false },
    { label: "Asia/Bishkek (+06:00)", value: "Asia/Bishkek", selected: false },
    { label: "Asia/Brunei (+08:00)", value: "Asia/Brunei", selected: false },
    { label: "Asia/Chita (+09:00)", value: "Asia/Chita", selected: false },
    {
      label: "Asia/Choibalsan (+08:00)",
      value: "Asia/Choibalsan",
      selected: false,
    },
    { label: "Asia/Colombo (+05:30)", value: "Asia/Colombo", selected: false },
    { label: "Asia/Damascus (+02:00)", value: "Asia/Damascus", selected: false },
    { label: "Asia/Dhaka (+06:00)", value: "Asia/Dhaka", selected: false },
    { label: "Asia/Dili (+09:00)", value: "Asia/Dili", selected: false },
    { label: "Asia/Dubai (+04:00)", value: "Asia/Dubai", selected: false },
    { label: "Asia/Dushanbe (+05:00)", value: "Asia/Dushanbe", selected: false },
    {
      label: "Asia/Famagusta (+02:00)",
      value: "Asia/Famagusta",
      selected: false,
    },
    { label: "Asia/Gaza (+02:00)", value: "Asia/Gaza", selected: false },
    { label: "Asia/Hebron (+02:00)", value: "Asia/Hebron", selected: false },
    {
      label: "Asia/Ho_Chi_Minh (+07:00)",
      value: "Asia/Ho_Chi_Minh",
      selected: false,
    },
    {
      label: "Asia/Hong_Kong (+08:00)",
      value: "Asia/Hong_Kong",
      selected: false,
    },
    { label: "Asia/Hovd (+07:00)", value: "Asia/Hovd", selected: false },
    { label: "Asia/Irkutsk (+08:00)", value: "Asia/Irkutsk", selected: false },
    { label: "Asia/Jakarta (+07:00)", value: "Asia/Jakarta", selected: false },
    { label: "Asia/Jayapura (+09:00)", value: "Asia/Jayapura", selected: false },
    {
      label: "Asia/Jerusalem (+02:00)",
      value: "Asia/Jerusalem",
      selected: false,
    },
    { label: "Asia/Kabul (+04:30)", value: "Asia/Kabul", selected: false },
    {
      label: "Asia/Kamchatka (+12:00)",
      value: "Asia/Kamchatka",
      selected: false,
    },
    { label: "Asia/Karachi (+05:00)", value: "Asia/Karachi", selected: false },
    {
      label: "Asia/Kathmandu (+05:45)",
      value: "Asia/Kathmandu",
      selected: false,
    },
    { label: "Asia/Khandyga (+09:00)", value: "Asia/Khandyga", selected: false },
    { label: "Asia/Kolkata (+05:30)", value: "Asia/Kolkata", selected: false },
    {
      label: "Asia/Krasnoyarsk (+07:00)",
      value: "Asia/Krasnoyarsk",
      selected: false,
    },
    {
      label: "Asia/Kuala_Lumpur (+08:00)",
      value: "Asia/Kuala_Lumpur",
      selected: false,
    },
    { label: "Asia/Kuching (+08:00)", value: "Asia/Kuching", selected: false },
    { label: "Asia/Kuwait (+03:00)", value: "Asia/Kuwait", selected: false },
    { label: "Asia/Macau (+08:00)", value: "Asia/Macau", selected: false },
    { label: "Asia/Magadan (+11:00)", value: "Asia/Magadan", selected: false },
    { label: "Asia/Makassar (+08:00)", value: "Asia/Makassar", selected: false },
    { label: "Asia/Manila (+08:00)", value: "Asia/Manila", selected: false },
    { label: "Asia/Muscat (+04:00)", value: "Asia/Muscat", selected: false },
    { label: "Asia/Nicosia (+02:00)", value: "Asia/Nicosia", selected: false },
    {
      label: "Asia/Novokuznetsk (+07:00)",
      value: "Asia/Novokuznetsk",
      selected: false,
    },
    {
      label: "Asia/Novosibirsk (+07:00)",
      value: "Asia/Novosibirsk",
      selected: false,
    },
    { label: "Asia/Omsk (+06:00)", value: "Asia/Omsk", selected: false },
    { label: "Asia/Oral (+05:00)", value: "Asia/Oral", selected: false },
    {
      label: "Asia/Phnom_Penh (+07:00)",
      value: "Asia/Phnom_Penh",
      selected: false,
    },
    {
      label: "Asia/Pontianak (+07:00)",
      value: "Asia/Pontianak",
      selected: false,
    },
    {
      label: "Asia/Pyongyang (+09:00)",
      value: "Asia/Pyongyang",
      selected: false,
    },
    { label: "Asia/Qatar (+03:00)", value: "Asia/Qatar", selected: false },
    { label: "Asia/Qostanay (+06:00)", value: "Asia/Qostanay", selected: false },
    {
      label: "Asia/Qyzylorda (+05:00)",
      value: "Asia/Qyzylorda",
      selected: false,
    },
    { label: "Asia/Riyadh (+03:00)", value: "Asia/Riyadh", selected: false },
    { label: "Asia/Sakhalin (+11:00)", value: "Asia/Sakhalin", selected: false },
    {
      label: "Asia/Samarkand (+05:00)",
      value: "Asia/Samarkand",
      selected: false,
    },
    { label: "Asia/Seoul (+09:00)", value: "Asia/Seoul", selected: false },
    { label: "Asia/Shanghai (+08:00)", value: "Asia/Shanghai", selected: false },
    {
      label: "Asia/Singapore (+08:00)",
      value: "Asia/Singapore",
      selected: false,
    },
    {
      label: "Asia/Srednekolymsk (+11:00)",
      value: "Asia/Srednekolymsk",
      selected: false,
    },
    { label: "Asia/Taipei (+08:00)", value: "Asia/Taipei", selected: false },
    { label: "Asia/Tashkent (+05:00)", value: "Asia/Tashkent", selected: false },
    { label: "Asia/Tbilisi (+04:00)", value: "Asia/Tbilisi", selected: false },
    { label: "Asia/Tehran (+03:30)", value: "Asia/Tehran", selected: false },
    { label: "Asia/Thimphu (+06:00)", value: "Asia/Thimphu", selected: false },
    { label: "Asia/Tokyo (+09:00)", value: "Asia/Tokyo", selected: false },
    { label: "Asia/Tomsk (+07:00)", value: "Asia/Tomsk", selected: false },
    {
      label: "Asia/Ulaanbaatar (+08:00)",
      value: "Asia/Ulaanbaatar",
      selected: false,
    },
    { label: "Asia/Urumqi (+06:00)", value: "Asia/Urumqi", selected: false },
    { label: "Asia/Ust-Nera (+10:00)", value: "Asia/Ust-Nera", selected: false },
    {
      label: "Asia/Vientiane (+07:00)",
      value: "Asia/Vientiane",
      selected: false,
    },
    {
      label: "Asia/Vladivostok (+10:00)",
      value: "Asia/Vladivostok",
      selected: false,
    },
    { label: "Asia/Yakutsk (+09:00)", value: "Asia/Yakutsk", selected: false },
    { label: "Asia/Yangon (+06:30)", value: "Asia/Yangon", selected: false },
    {
      label: "Asia/Yekaterinburg (+05:00)",
      value: "Asia/Yekaterinburg",
      selected: false,
    },
    { label: "Asia/Yerevan (+04:00)", value: "Asia/Yerevan", selected: false },
    {
      label: "Atlantic/Azores (-01:00)",
      value: "Atlantic/Azores",
      selected: false,
    },
    {
      label: "Atlantic/Bermuda (-04:00)",
      value: "Atlantic/Bermuda",
      selected: false,
    },
    {
      label: "Atlantic/Canary (+00:00)",
      value: "Atlantic/Canary",
      selected: false,
    },
    {
      label: "Atlantic/Cape_Verde (-01:00)",
      value: "Atlantic/Cape_Verde",
      selected: false,
    },
    {
      label: "Atlantic/Faroe (+00:00)",
      value: "Atlantic/Faroe",
      selected: false,
    },
    {
      label: "Atlantic/Madeira (+00:00)",
      value: "Atlantic/Madeira",
      selected: false,
    },
    {
      label: "Atlantic/Reykjavik (+00:00)",
      value: "Atlantic/Reykjavik",
      selected: false,
    },
    {
      label: "Atlantic/South_Georgia (-02:00)",
      value: "Atlantic/South_Georgia",
      selected: false,
    },
    {
      label: "Atlantic/St_Helena (+00:00)",
      value: "Atlantic/St_Helena",
      selected: false,
    },
    {
      label: "Atlantic/Stanley (-03:00)",
      value: "Atlantic/Stanley",
      selected: false,
    },
    {
      label: "Australia/Adelaide (+10:30)",
      value: "Australia/Adelaide",
      selected: false,
    },
    {
      label: "Australia/Brisbane (+10:00)",
      value: "Australia/Brisbane",
      selected: false,
    },
    {
      label: "Australia/Broken_Hill (+10:30)",
      value: "Australia/Broken_Hill",
      selected: false,
    },
    {
      label: "Australia/Darwin (+09:30)",
      value: "Australia/Darwin",
      selected: false,
    },
    {
      label: "Australia/Eucla (+08:45)",
      value: "Australia/Eucla",
      selected: false,
    },
    {
      label: "Australia/Hobart (+11:00)",
      value: "Australia/Hobart",
      selected: false,
    },
    {
      label: "Australia/Lindeman (+10:00)",
      value: "Australia/Lindeman",
      selected: false,
    },
    {
      label: "Australia/Lord_Howe (+11:00)",
      value: "Australia/Lord_Howe",
      selected: false,
    },
    {
      label: "Australia/Melbourne (+11:00)",
      value: "Australia/Melbourne",
      selected: false,
    },
    {
      label: "Australia/Perth (+08:00)",
      value: "Australia/Perth",
      selected: false,
    },
    {
      label: "Australia/Sydney (+11:00)",
      value: "Australia/Sydney",
      selected: false,
    },
    {
      label: "Europe/Amsterdam (+01:00)",
      value: "Europe/Amsterdam",
      selected: false,
    },
    {
      label: "Europe/Andorra (+01:00)",
      value: "Europe/Andorra",
      selected: false,
    },
    {
      label: "Europe/Astrakhan (+04:00)",
      value: "Europe/Astrakhan",
      selected: false,
    },
    { label: "Europe/Athens (+02:00)", value: "Europe/Athens", selected: false },
    {
      label: "Europe/Belgrade (+01:00)",
      value: "Europe/Belgrade",
      selected: false,
    },
    { label: "Europe/Berlin (+01:00)", value: "Europe/Berlin", selected: false },
    {
      label: "Europe/Bratislava (+01:00)",
      value: "Europe/Bratislava",
      selected: false,
    },
    {
      label: "Europe/Brussels (+01:00)",
      value: "Europe/Brussels",
      selected: false,
    },
    {
      label: "Europe/Bucharest (+02:00)",
      value: "Europe/Bucharest",
      selected: false,
    },
    {
      label: "Europe/Budapest (+01:00)",
      value: "Europe/Budapest",
      selected: false,
    },
    {
      label: "Europe/Busingen (+01:00)",
      value: "Europe/Busingen",
      selected: false,
    },
    {
      label: "Europe/Chisinau (+02:00)",
      value: "Europe/Chisinau",
      selected: false,
    },
    {
      label: "Europe/Copenhagen (+01:00)",
      value: "Europe/Copenhagen",
      selected: false,
    },
    { label: "Europe/Dublin (+00:00)", value: "Europe/Dublin", selected: false },
    {
      label: "Europe/Gibraltar (+01:00)",
      value: "Europe/Gibraltar",
      selected: false,
    },
    {
      label: "Europe/Guernsey (+00:00)",
      value: "Europe/Guernsey",
      selected: false,
    },
    {
      label: "Europe/Helsinki (+02:00)",
      value: "Europe/Helsinki",
      selected: false,
    },
    {
      label: "Europe/Isle_of_Man (+00:00)",
      value: "Europe/Isle_of_Man",
      selected: false,
    },
    {
      label: "Europe/Istanbul (+03:00)",
      value: "Europe/Istanbul",
      selected: false,
    },
    { label: "Europe/Jersey (+00:00)", value: "Europe/Jersey", selected: false },
    {
      label: "Europe/Kaliningrad (+02:00)",
      value: "Europe/Kaliningrad",
      selected: false,
    },
    { label: "Europe/Kiev (+02:00)", value: "Europe/Kiev", selected: false },
    { label: "Europe/Kirov (+03:00)", value: "Europe/Kirov", selected: false },
    { label: "Europe/Lisbon (+00:00)", value: "Europe/Lisbon", selected: false },
    {
      label: "Europe/Ljubljana (+01:00)",
      value: "Europe/Ljubljana",
      selected: false,
    },
    { label: "Europe/London (+00:00)", value: "Europe/London", selected: false },
    {
      label: "Europe/Luxembourg (+01:00)",
      value: "Europe/Luxembourg",
      selected: false,
    },
    { label: "Europe/Madrid (+01:00)", value: "Europe/Madrid", selected: false },
    { label: "Europe/Malta (+01:00)", value: "Europe/Malta", selected: false },
    {
      label: "Europe/Mariehamn (+02:00)",
      value: "Europe/Mariehamn",
      selected: false,
    },
    { label: "Europe/Minsk (+03:00)", value: "Europe/Minsk", selected: false },
    { label: "Europe/Monaco (+01:00)", value: "Europe/Monaco", selected: false },
    { label: "Europe/Moscow (+03:00)", value: "Europe/Moscow", selected: false },
    { label: "Europe/Oslo (+01:00)", value: "Europe/Oslo", selected: false },
    { label: "Europe/Paris (+01:00)", value: "Europe/Paris", selected: false },
    {
      label: "Europe/Podgorica (+01:00)",
      value: "Europe/Podgorica",
      selected: false,
    },
    { label: "Europe/Prague (+01:00)", value: "Europe/Prague", selected: false },
    { label: "Europe/Riga (+02:00)", value: "Europe/Riga", selected: false },
    { label: "Europe/Rome (+01:00)", value: "Europe/Rome", selected: false },
    { label: "Europe/Samara (+04:00)", value: "Europe/Samara", selected: false },
    {
      label: "Europe/San_Marino (+01:00)",
      value: "Europe/San_Marino",
      selected: false,
    },
    {
      label: "Europe/Sarajevo (+01:00)",
      value: "Europe/Sarajevo",
      selected: false,
    },
    {
      label: "Europe/Saratov (+04:00)",
      value: "Europe/Saratov",
      selected: false,
    },
    {
      label: "Europe/Simferopol (+03:00)",
      value: "Europe/Simferopol",
      selected: false,
    },
    { label: "Europe/Skopje (+01:00)", value: "Europe/Skopje", selected: false },
    { label: "Europe/Sofia (+02:00)", value: "Europe/Sofia", selected: false },
    {
      label: "Europe/Stockholm (+01:00)",
      value: "Europe/Stockholm",
      selected: false,
    },
    {
      label: "Europe/Tallinn (+02:00)",
      value: "Europe/Tallinn",
      selected: false,
    },
    { label: "Europe/Tirane (+01:00)", value: "Europe/Tirane", selected: false },
    {
      label: "Europe/Ulyanovsk (+04:00)",
      value: "Europe/Ulyanovsk",
      selected: false,
    },
    {
      label: "Europe/Uzhgorod (+02:00)",
      value: "Europe/Uzhgorod",
      selected: false,
    },
    { label: "Europe/Vaduz (+01:00)", value: "Europe/Vaduz", selected: false },
    {
      label: "Europe/Vatican (+01:00)",
      value: "Europe/Vatican",
      selected: false,
    },
    { label: "Europe/Vienna (+01:00)", value: "Europe/Vienna", selected: false },
    {
      label: "Europe/Vilnius (+02:00)",
      value: "Europe/Vilnius",
      selected: false,
    },
    {
      label: "Europe/Volgograd (+03:00)",
      value: "Europe/Volgograd",
      selected: false,
    },
    { label: "Europe/Warsaw (+01:00)", value: "Europe/Warsaw", selected: false },
    { label: "Europe/Zagreb (+01:00)", value: "Europe/Zagreb", selected: false },
    {
      label: "Europe/Zaporozhye (+02:00)",
      value: "Europe/Zaporozhye",
      selected: false,
    },
    { label: "Europe/Zurich (+01:00)", value: "Europe/Zurich", selected: false },
    {
      label: "Indian/Antananarivo (+03:00)",
      value: "Indian/Antananarivo",
      selected: false,
    },
    { label: "Indian/Chagos (+06:00)", value: "Indian/Chagos", selected: false },
    {
      label: "Indian/Christmas (+07:00)",
      value: "Indian/Christmas",
      selected: false,
    },
    { label: "Indian/Cocos (+06:30)", value: "Indian/Cocos", selected: false },
    { label: "Indian/Comoro (+03:00)", value: "Indian/Comoro", selected: false },
    {
      label: "Indian/Kerguelen (+05:00)",
      value: "Indian/Kerguelen",
      selected: false,
    },
    { label: "Indian/Mahe (+04:00)", value: "Indian/Mahe", selected: false },
    {
      label: "Indian/Maldives (+05:00)",
      value: "Indian/Maldives",
      selected: false,
    },
    {
      label: "Indian/Mauritius (+04:00)",
      value: "Indian/Mauritius",
      selected: false,
    },
    {
      label: "Indian/Mayotte (+03:00)",
      value: "Indian/Mayotte",
      selected: false,
    },
    {
      label: "Indian/Reunion (+04:00)",
      value: "Indian/Reunion",
      selected: false,
    },
    { label: "Pacific/Apia (+13:00)", value: "Pacific/Apia", selected: false },
    {
      label: "Pacific/Auckland (+13:00)",
      value: "Pacific/Auckland",
      selected: false,
    },
    {
      label: "Pacific/Bougainville (+11:00)",
      value: "Pacific/Bougainville",
      selected: false,
    },
    {
      label: "Pacific/Chatham (+13:45)",
      value: "Pacific/Chatham",
      selected: false,
    },
    { label: "Pacific/Chuuk (+10:00)", value: "Pacific/Chuuk", selected: false },
    {
      label: "Pacific/Easter (-05:00)",
      value: "Pacific/Easter",
      selected: false,
    },
    { label: "Pacific/Efate (+11:00)", value: "Pacific/Efate", selected: false },
    {
      label: "Pacific/Enderbury (+13:00)",
      value: "Pacific/Enderbury",
      selected: false,
    },
    {
      label: "Pacific/Fakaofo (+13:00)",
      value: "Pacific/Fakaofo",
      selected: false,
    },
    { label: "Pacific/Fiji (+13:00)", value: "Pacific/Fiji", selected: false },
    {
      label: "Pacific/Funafuti (+12:00)",
      value: "Pacific/Funafuti",
      selected: false,
    },
    {
      label: "Pacific/Galapagos (-06:00)",
      value: "Pacific/Galapagos",
      selected: false,
    },
    {
      label: "Pacific/Gambier (-09:00)",
      value: "Pacific/Gambier",
      selected: false,
    },
    {
      label: "Pacific/Guadalcanal (+11:00)",
      value: "Pacific/Guadalcanal",
      selected: false,
    },
    { label: "Pacific/Guam (+10:00)", value: "Pacific/Guam", selected: false },
    {
      label: "Pacific/Honolulu (-10:00)",
      value: "Pacific/Honolulu",
      selected: false,
    },
    {
      label: "Pacific/Kiritimati (+14:00)",
      value: "Pacific/Kiritimati",
      selected: false,
    },
    {
      label: "Pacific/Kosrae (+11:00)",
      value: "Pacific/Kosrae",
      selected: false,
    },
    {
      label: "Pacific/Kwajalein (+12:00)",
      value: "Pacific/Kwajalein",
      selected: false,
    },
    {
      label: "Pacific/Majuro (+12:00)",
      value: "Pacific/Majuro",
      selected: false,
    },
    {
      label: "Pacific/Marquesas (-09:30)",
      value: "Pacific/Marquesas",
      selected: false,
    },
    {
      label: "Pacific/Midway (-11:00)",
      value: "Pacific/Midway",
      selected: false,
    },
    { label: "Pacific/Nauru (+12:00)", value: "Pacific/Nauru", selected: false },
    { label: "Pacific/Niue (-11:00)", value: "Pacific/Niue", selected: false },
    {
      label: "Pacific/Norfolk (+12:00)",
      value: "Pacific/Norfolk",
      selected: false,
    },
    {
      label: "Pacific/Noumea (+11:00)",
      value: "Pacific/Noumea",
      selected: false,
    },
    {
      label: "Pacific/Pago_Pago (-11:00)",
      value: "Pacific/Pago_Pago",
      selected: false,
    },
    { label: "Pacific/Palau (+09:00)", value: "Pacific/Palau", selected: false },
    {
      label: "Pacific/Pitcairn (-08:00)",
      value: "Pacific/Pitcairn",
      selected: false,
    },
    {
      label: "Pacific/Pohnpei (+11:00)",
      value: "Pacific/Pohnpei",
      selected: false,
    },
    {
      label: "Pacific/Port_Moresby (+10:00)",
      value: "Pacific/Port_Moresby",
      selected: false,
    },
    {
      label: "Pacific/Rarotonga (-10:00)",
      value: "Pacific/Rarotonga",
      selected: false,
    },
    {
      label: "Pacific/Saipan (+10:00)",
      value: "Pacific/Saipan",
      selected: false,
    },
    {
      label: "Pacific/Tahiti (-10:00)",
      value: "Pacific/Tahiti",
      selected: false,
    },
    {
      label: "Pacific/Tarawa (+12:00)",
      value: "Pacific/Tarawa",
      selected: false,
    },
    {
      label: "Pacific/Tongatapu (+13:00)",
      value: "Pacific/Tongatapu",
      selected: false,
    },
    { label: "Pacific/Wake (+12:00)", value: "Pacific/Wake", selected: false },
    {
      label: "Pacific/Wallis (+12:00)",
      value: "Pacific/Wallis",
      selected: false,
    },
    { label: "UTC (+00:00)", value: "UTC", selected: false },
  ];

export  {timeZone,CreateCalendar,PrivilegesUser,PrivilegesLead,PrivilegesProspect,PrivilegesClient,PrivilegesContact,PrivilegesOpportunities,PrivilegesProjects,PrivilegesCalander,PrivilegesAction,PrivilegesFollowup,PrivilegesMetting,checkboxData,EmailStatus,PrivilegesReminder,PrivilegesOut_of_Office,PrivilegesEvent} ;