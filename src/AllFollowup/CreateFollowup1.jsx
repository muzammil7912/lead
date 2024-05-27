import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainHeadingContext } from "../context/MainHeadingContext";
import SwitchButton from "../Calendar/components/SwitchButton";
import CreateCustomEvent from "../Calendar/CreateCustomEvent";
import SwitchCheck from "../Calendar/components/SwitchCheck";
import SelectSearch from "../components/form/selectSearch";
import FormControl from "../components/form/FormControl";
import { Translation } from "../components/Translation";
import SubmitButton from "../components/SubmitButton";
import Dropdown5 from "../components/form/Dropdown5";
import Loader from "../components/common/Loading";
import useFetch from "../customHooks/useFetch";
import usePost from "../customHooks/usePost";
import timezone from 'dayjs/plugin/timezone';
import { Formik, Form, Field } from "formik";
import File from "../components/form/File";
import { toast } from "react-toastify";
import utc from 'dayjs/plugin/utc';
import config from '../services/config.json'
import { useNavigate } from 'react-router-dom';
import { Select } from "antd";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import dayjs from "dayjs";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";


dayjs.extend(utc);
dayjs.extend(timezone);

export default function CreateFollowUp1() {


  // <--------- START DELARATION OF ALL POST METHOD --------->

  const [mainUpdate, apiMethodMainUpdate] = usePost();
  const [getStageData, apiMethodGetStageData] = usePost();
  const [getActionData, apiMethodGetActionData] = usePost();
  const [getRelatedData, apiMethodGetRelatedData] = usePost();
  const [getCalenderData, apiMetodGetCalenderData] = usePost();
  const [getPipelineData, apiMethodGetPipelineData] = usePost();

  // <--------- END DELARATION OF ALL POST METHOD --------->

  // <--------------- START DEFINE ALL CONNTEXT API ------------------>

  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext)
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);

  // <--------------- END DEFINE ALL CONNTEXT API ------------------>


  // <-------- START DEFINE ALL FETCH METHOD -------------->

  const { data: severityData, loading } = useFetch("", "getAllViewFollowupSeverity");
  const { data: timeZone, loading2 } = useFetch("", "getListTimeZone");

  // <-------- END DEFINE ALL FETCH METHOD -------------->

  // <-------- START DECALRATION ALL USESTATE AND USEREF VARIABLE ------>

  const isComponentMounted = useRef(true);
  const [image, setImage] = useState('');
  const [types, setTypes] = useState('1');
  const navigate = useNavigate();
  const [period, setPeriod] = useState('');
  const [repeat, setRepeat] = useState('');
  const [related, setRelated] = useState('');
  const [endTime, setEndTime] = useState('');
  const [calender, setCalender] = useState('');
  const [actioned, setActioned] = useState('');
  const [startTime, setStartTime] = useState('');
  const [ActionVal, setActionVal] = useState('');
  const [stagevari, setStagevari] = useState('');
  const [checked, setChecked] = useState('never');
  const [relatedVal, setRelatedVal] = useState('');
  const [timeDefault, setTimeDefault] = useState('');
  const [relatedtoVal, setRelatedtoVal] = useState('');
  const [piplinesvari, setPiplinesvari] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [submitbuttons, setSubmitbuttons] = useState(false);
  const [hexCodeDefault, sethexCodeDefault] = useState('#ffffff');
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [customEventDate, setCustomEventDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [NotificationArr, setNotificationArr] = useState([
    {
      id: "1",
      notify_type: "notification",
      notify_interval: "10",
      notify_period: "minutes",
    },
  ]);
  const [AllMember, setAllMember] = useState([
    {
      id: "1",
      membersearch: "",
      ev_members: "guest",
    },
  ]);
  const [CustomEvent, setCustomEvent] = useState({
    firstValue: "",
    secondValue: "",
    label: "",
  });
  const { id } = useParams();

  // <-------- END DECALRATION ALL USESTATE AND USEREF VARIABLE ------>

  // <-------- START DECALRATION ALL NORMAL VARIABLE --------->

  let rel = ["contact", "opportunity", "user", "project", "meeting"];
  // const hexadecimalCodeRegex = 

  const list = [
    { label: "System Notification", value: "system_notification" },
    { label: "SMS", value: "sms" },
    { label: "eMail", value: "email" },
  ];

  const submitbutton = {
    class: "btn btn-primary d-block mt-3 ml-auto submit",
    text: "Save Event",
  };

  const datass = {
    event: [
      {
        label: "All Day Event",
        value: "1",
      },
    ],
    eve_depenency: [
      {
        label: "Has Dependency",
        value: "1",
      },
    ],
    Visibility: [
      {
        label: "Busy",
        value: "busy",
      },
      {
        label: "Free",
        value: "free",
      },
    ],
    priv: [
      {
        label: "Public",
        value: "public",
      },
      {
        label: "Private",
        value: "private",
      },
    ],
    Vote: [
      {
        label: "In Vote",
        value: "In Vote",
      },
      {
        label: "Voted",
        value: "Voted",
      },
    ],
    meet: [
      {
        label: "Enable/Disable Notification",
        value: "1",
      },
    ],
    ev_members: [
      {
        value: "guest",
        label: "Guest",
      },
      {
        value: "member",
        label: "Member",
      },
      {
        value: "follower",
        label: "Follower",
      },
      {
        value: "owner",
        label: "Owner",
      },
    ],
    eve_related_to: [
      {
        value: "",
        label: "Related to:",
      },
      {
        value: "none",
        label: "None",
      },
      {
        value: "contact",
        label: "Contact",
      },
      {
        value: "opportunity",
        label: "Opportunity",
      },
      {
        value: "user",
        label: "User",
      },
      {
        value: "project",
        label: "Project",
      },
      {
        value: "meeting",
        label: "Meeting",
      },
    ],
  };

  const timeList = [
    { label: "Minute", value: "minute" },
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
  ];

  // <-------- END DECALRATION ALL NORMAL VARIABLE --------->

  // <------- START DECLARATION OF ALL POST FUNCTION ----------> 

  useEffect(() => {
    addHeading(`Create Event - Follow Up`)
    if (isComponentMounted.current) {
      let formData = new FormData();
      formData.append("event_type", "follow_up");
      apiMethodGetPipelineData("postAllViewEventsPiplines", formData);
      return () => isComponentMounted.current = false
    }

  }, []);

  useEffect(() => {
    if (severityData) {
      setTypes(severityData?.[0]?.severity_id)
      handleSeverityValue(severityData?.[0]?.severity_id)
    }
  }, [severityData])

  const handleSeverityValue = (value) => {
    setTypes(value)
    let formData = new FormData();
    formData.append('event_type', value)
    apiMetodGetCalenderData('postPiplineEventStatus', formData)
  }

  useEffect(() => {
    if (getCalenderData?.data) {
      setCalender(getCalenderData?.data?.list_calendars?.[0]?.cl_db_did)
      sethexCodeDefault(getCalenderData?.data?.list_calendars?.[0]?.calendar_color)
    }
  }, [getCalenderData?.data])

  const handleCalenderValue = (event) => {
    setCalender(event.target.value)
    sethexCodeDefault(getCalenderData?.data?.list_calendars.filter(item => item.cl_db_did === event.target.value)?.[0]?.calendar_color)
  }

  useEffect(() => {
    if (getPipelineData?.data) {
      setPiplinesvari(getPipelineData?.data?.[0]?.db_id)
      handlePiplineValue(getPipelineData?.data?.[0]?.db_id)
    }
  }, [getPipelineData?.data])

  const handlePiplineValue = (value) => {
    setPiplinesvari(value);
    let formData = new FormData();
    formData.append("pipeline_id", value);
    formData.append("event_type", "follow_up");
    apiMethodGetStageData("postViewEventsPiplinesStages", formData);
  };

  useEffect(() => {
    if (getStageData?.data) {
      setStagevari(getStageData?.data?.[0]?.id)
    }
  }, [getStageData?.data])

  const handleSearchAction = (v) => {
    const formdata = new FormData();
    formdata.append("q", v);
    formdata.append("event_action_sr", "general_event_srAction_query");
    apiMethodGetActionData("postSearchEventsActionsRelated", formdata);
  };

  const handleSearchRelated = (v) => {
    const formdata = new FormData();
    formdata.append("q", v);
    formdata.append("related", relatedtoVal);
    formdata.append("event_create", "general_event_create_query");
    apiMethodGetRelatedData("postSearchEventsModuleRelated", formdata);
  };

  useEffect(() => {
    if (getRelatedData.data) {
      if (getRelatedData.data && !getRelatedData.isLoading) {
        if (!getRelatedData.data.message) {
          setRelated(
            getRelatedData.data.map((item) => {
              return {
                value: item.value,
                label: item.text,
              };
            })
          );
        }
      }
    }
  }, [getRelatedData.data]);

  useEffect(() => {
    if (getActionData.data) {
      if (getActionData.data && !getActionData.isLoading) {
        if (!getActionData.data.message) {
          setActioned(
            getActionData.data.map((item) => {
              return {
                value: item.value,
                label: item.text,
              };
            })
          );
        }
      }
    }
  }, [getActionData.data]);

  // <------- END DECLARATION OF ALL POST FUNCTION ----------> 

  // <------- START FUNCTION HANDLE DATE/TIME/TIMEZONE/HEX-CODE ------>

  const handleCustomEventDate = (event) => {
    let date = event.target.value
    setCustomEventDate(date)
    if (date > endDate) {
      setEndDate(date)
    }
  }

  const handleEndDate = (event) => {
    let date = event.target.value
    setEndDate(date)
    if (date < customEventDate) {
      setCustomEventDate(date)
    }
  }

  const handleTimeZone = (item) => {
    setPracticeName(item);
    const date = dayjs().tz(item ?? "America/New_York");
    const newDate = date.add(1, 'hour');
    const d = new Date(newDate.$d);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const currentTime = hours + ':' + minutes;
    setStartTime(date.format("HH:mm"));
    setEndTime(currentTime)
  };

  useEffect(() => {
    if (permissions['system-user_timezone']) {
      setTimeDefault(permissions['system-user_timezone']?.setting_value)
      setPracticeName(permissions['system-user_timezone']?.setting_value)
      handleTimeZone(permissions['system-user_timezone']?.setting_value)
    }
  }, [permissions['system-user_timezone']])

  const handleColorChange = (event) => {
    sethexCodeDefault(event.target.value);
  };

  const handleHexCode = (event) => {
    // const hexadecimalCodeRegex = /^#([0-9a-fA-F]{6})$/
    // const tridecimalCodeRegex = /^#([0-9a-fA-F]{3})$/
    // if (!hexadecimalCodeRegex.test(event.target.value) || !tridecimalCodeRegex.test(event.target.value)){
    sethexCodeDefault(event.target.value)
    // }
  }

  // <------- END FUNCTION HANDLE DATE/TIME/TIMEZONE/HEX-CODE ------>

  // <------- START FUNCTION FOR MAIN CREATE --------->

  function handleSubmit(values, { resetForm }) {
    if (values["eve_name"] == "") {
      swal({
        title: "Please fill the following feild:",
        text: "Event Title",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      const formdata = new FormData();
      for (let item in values) {
        if (item == "eve_google_meet") {
          values[item] == true
            ? formdata.append(item, "1")
            : formdata.append(item, "0");
        }
        if (item !== "eve_google_meet") {
          formdata.append(item, values[item]);
        }
      }
      NotificationArr.map((item, index) => {
        formdata.append(`notify_type[]`, item.notify_type);
        formdata.append(`notify_interval[]`, item.notify_interval);
        formdata.append(`notify_period[]`, item.notify_period);
      });

      AllMember.map((item, index) => {
        formdata.append(`membersearch[]`, item.membersearch);
        formdata.append(`ev_members[]`, item.ev_members);
      });
      formdata.append('event_type', 'follow_up');
      formdata.append('create_event', 'cReaTe_eVENt');
      formdata.append('eve_start_date', customEventDate);
      formdata.append('eve_end_date', endDate);
      formdata.append('eve_start_time', startTime);
      formdata.append('eve_end_time', endTime);
      formdata.append('eve_all_day_repeat', CustomEvent.firstValue);
      formdata.append("eve_related_to", relatedtoVal);
      formdata.append("eve_related_to_val", relatedVal);
      formdata.append("eve_depenency_on", ActionVal);
      formdata.append("pipeline", piplinesvari);
      formdata.append("stage", stagevari);
      formdata.append("severity", types);
      formdata.append("eve_time_zone", practiceName);
      formdata.append("eve_color", hexCodeDefault);
      formdata.append("e_featureimg", image);
      formdata.append("custom_test", CustomEvent.secondValue);
      formdata.append("custom_recurrence", CustomEvent.label);
      formdata.append("repeat_days", new Date().getDay());
      formdata.append("monthly_selection", new Date().getDate());
      formdata.append("eve_calendar", calender);
      apiMethodMainUpdate("postCreatePiplineEvent", formdata);
      resetForm();
      setTypes("1");
      setNotificationArr([
        {
          id: "1",
          notify_type: "notification",
          notify_interval: "10",
          notify_period: "minutes",
        },
      ]);
      setAllMember([
        {
          id: "1",
          membersearch: "",
          ev_members: "guest",
        },
      ]);
    }
  }

  useEffect(() => {
    if (mainUpdate.data && !mainUpdate.isLoading) {
      setSubmitbuttons(true);
      toast.success(mainUpdate.data.message);
      navigate(`/${config.ddemoss}createfollowup/${piplinesvari}/Grid`);
    }
  }, [mainUpdate.data]);

  // <------- END FUNCTION FOR MAIN CREATE --------->

  // <-- START DECLARATION OF FUNCTION HANDLE NOTIFICATION SECTION -->

  const handleNotificationAdd = useCallback((item) => {
    let adjusteds = NotificationArr.length;
    let adjustedss = parseInt(NotificationArr[adjusteds - 1].id);
    setNotificationArr([
      ...NotificationArr,
      {
        id: `${++adjustedss}`,
        notify_type: "notification",
        notify_interval: "10",
        notify_period: "minutes",
      },
    ]);
  });

  const handleNotificationRemove = useCallback((item) => {
    setNotificationArr();
    setNotificationArr(NotificationArr.filter((ite) => ite.id != item.id));
  });

  const handleNotificationNumber = useCallback((item, index, e) => {
    const updatedObject = { ...NotificationArr[index], notify_interval: e };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  });

  const handleNotificationType = useCallback((item, index, e) => {
    const updatedObject = { ...NotificationArr[index], notify_type: e };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  });

  const handleNotificationPeriod = useCallback((item, index, e) => {
    const updatedObject = { ...NotificationArr[index], notify_period: e };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  });

  // <-- END DECLARATION OF FUNCTION HANDLE NOTIFICATION SECTION -->

  // <-- START DECLARATION OF FUNCTION HANDLE MEMBER SECTION -->

  const handelMemberAdd = useCallback((item) => {
    let adjusteds = AllMember.length;
    let adjustedss = parseInt(AllMember[adjusteds - 1].id);
    setAllMember([
      ...AllMember,
      {
        id: `${++adjustedss}`,
        membersearch: "",
        ev_members: "guest",
      },
    ]);
  });

  const handelMemberRemove = useCallback((item) => {
    setAllMember(AllMember.filter((ite) => ite.id != item.id));
  });

  const handleMemberPeriod = useCallback((item, index, e) => {
    const updatedObject = { ...AllMember[index], ev_members: e };
    const updatedListss = [...AllMember];
    updatedListss[index] = updatedObject;
    setAllMember(updatedListss);
  });

  const handleMemberPeriod2 = useCallback((item, index) => {
    const updatedObject = { ...AllMember[index], membersearch: item };
    const updatedListss = [...AllMember];
    updatedListss[index] = updatedObject;
    setAllMember(updatedListss);
  });

  // <-- END DECLARATION OF FUNCTION HANDLE MEMBER SECTION -->

  if (loading || loading2 || !getPipelineData?.data) return <Loader />;

  const initialValues = {
    eve_name: "",
    eve_location: "",
    eve_all_day: "",
    eve_notification_meet: "",
    eve_privacy: "",
    eve_visibility: "",
    eve_google_meet: "",
    eve_url: "",
    eve_description: "",
    eve_depenency: "",
    eve_meeting_platform: "google_meeting",
  };


  return (
    <div className="CreateAction">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card borderblue">
              <div className="card-header">
                <h3 className="card-title">New Event</h3>
              </div>
              <div className="card-body">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {({ values }) => (
                    <Form name="myForm">
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_title ===
                            "true") &&
                          <div className="col-md-5 col-sm-12">
                            <FormControl
                              className="form-control my-1"
                              label={Translation(
                                translations,
                                `${"Event Title"}`
                              )}
                              name="eve_name"
                              control="input3"
                              placeholder=" Event Title"
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_severity ===
                            "true") &&
                          <div className="col-md-2 col-sm-12">
                            <div className="form-group my-2">
                              <FormControl
                                className="form-control my-1"
                                selectList={severityData}
                                label={Translation(translations, "Severity")}
                                name="severity"
                                control="select_custom_options"
                                value={types}
                                custom_label_name="severity_label"
                                customer_value_name="severity_id"
                                onChange={(event) => handleSeverityValue(event.target.value)}
                              />
                            </div>
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_calendar ===
                            "true") &&
                          <div className="col-md-2">
                            <FormControl
                              className="form-control my-1"
                              selectList={getCalenderData?.data?.list_calendars}
                              label={Translation(translations, "Calendar")}
                              name={"eve_calendar"}
                              control="select_custom_options"
                              custom_label_name="calendar_name"
                              customer_value_name="cl_db_did"
                              value={calender}
                              onChange={event => handleCalenderValue(event)}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_color ===
                            "true") &&
                          <div className="col-md-3 mt-2">
                            <div className="form-group bokable">
                              <label><b>HEX CODE</b></label>
                              <div className="input-group my-1">
                                <input
                                  value={hexCodeDefault}
                                  type="text"
                                  className="form-control"
                                  onChange={event => handleHexCode(event)}
                                />
                                <div className="input-group-append">
                                  <input
                                    type="color"
                                    className="inputColor"
                                    value={hexCodeDefault.length === 7 && hexCodeDefault}
                                    onChange={handleColorChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_pipeline ===
                            "true") &&
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group my-2">
                              <label htmlFor="Pipeline">
                                <b>Pipeline</b>
                              </label>
                              <select
                                className="form-control"
                                value={id}
                                name="pipeline"
                                id="pipeline"
                                onChange={(event) => handlePiplineValue(event.target.value)}
                              >
                                {Array.isArray(getPipelineData?.data) &&
                                  getPipelineData?.data.map((item, index) => {
                                    return (
                                      <option
                                        key={index}
                                        voted={item?.can_be_voted}
                                        value={item?.db_id}
                                      >
                                        {item?.pipeline_title}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_stage ===
                            "true") &&
                          <div className="col-md-4 col-sm-4">
                            <FormControl
                              className="form-control my-1"
                              label={"Stage"}
                              name="stage"
                              control="select_custom_options"
                              custom_label_name="name"
                              customer_value_name="id"
                              value={stagevari}
                              selectList={getStageData.data}
                              onChange={(e) => setStagevari(e.target.value)}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_location ===
                            "true") &&
                          <div className="col-md-4 col-sm-4">
                            <FormControl
                              className="form-control my-1"
                              label={"Location"}
                              name="eve_location"
                              control="input3"
                              placeholder=" Default Location for Appointments"
                            />
                          </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_start_date ===
                            "true") &&
                          <div className="col-md-3 col-sm-12">
                            <div className="form-group my-2">
                              <label htmlFor={"date"}><b>Start Date</b></label>
                              <input
                                className="form-control mt-1"
                                type="date"
                                value={customEventDate}
                                onChange={(event) => handleCustomEventDate(event)}
                              />
                            </div>
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_start_date_time ===
                            "true") &&
                          <div className="col-md-2 col-sm-12">
                            <FormControl
                              className="form-control my-1"
                              label={"Time"}
                              type="time"
                              name="eve_start_time"
                              control="input"
                              value={startTime}
                              onChange={(event) => setStartTime(event.target.value)}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_end_date ===
                            "true") &&
                          <div className="col-md-3 col-sm-12">
                            <div className="form-group my-2">
                              <label htmlFor={"date"}><b>End Date</b></label>
                              <input
                                className="form-control mt-1"
                                type="date"
                                value={endDate}
                                onChange={(event) => handleEndDate(event)}
                              />
                            </div>
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_end_date_time ===
                            "true") &&
                          <div className="col-md-2 col-sm-12">
                            <FormControl
                              className="form-control my-1"
                              label={"Time"}
                              type="time"
                              name="eve_end_time"
                              control="input"
                              value={endTime}
                              onChange={(event) => setEndTime(event.target.value)}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_time_zone ===
                            "true") &&
                          <div className="col-md-2">
                            <div className="form-group">
                              <label>Event Title T. Zone</label>
                              <Dropdown5
                                list={timeZone}
                                changes={(value) => handleTimeZone(value)}
                                selected={practiceName}
                              />
                            </div>
                          </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_related_to ===
                            "true") &&
                          <>
                            <div className="col-md-4 col-sm-4">
                              <FormControl
                                className="form-control my-1"
                                name="eve_related_to"
                                control="select_custom_options"
                                custom_label_name="label"
                                customer_value_name="value"
                                selectList={
                                  datass.eve_related_to && datass.eve_related_to
                                }
                                value={relatedtoVal}
                                onChange={(e) => setRelatedtoVal(e.target.value)}
                              />
                            </div>
                            <div className="col-md-8 col-sm-8 calenderselected">
                              <Select
                                showSearch={true}
                                disabled={!rel.includes(relatedtoVal)}
                                filterOption={false}
                                style={{
                                  width: "100%",
                                }}
                                onSearch={(v) => {
                                  handleSearchRelated(v);
                                }}
                                placeholder="Search for --Module Related to --"
                                onChange={(v1, v2) => {
                                  setRelatedVal(v1);
                                }}
                                options={related}
                              />
                            </div>
                          </>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_related_tofollowups_has_dependency ===
                            "true") &&
                          <>
                            <div className="col-md-4 mt-1">
                              <SwitchCheck
                                options={datass.eve_depenency}
                                label="Has Dependency"
                                MainLabel={""}
                                name={"eve_depenency"}
                              />
                            </div>
                            <div className="col-md-8 col-sm-8 calenderselected">
                              <Select
                                showSearch={true}
                                disabled={values.eve_depenency != "1"}
                                filterOption={false}
                                //   filterOption={(input, option) => {
                                //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                //   }
                                // }
                                style={{
                                  width: "100%",
                                }}
                                onSearch={(v) => {
                                  handleSearchAction(v);
                                }}
                                placeholder="Search for --Actions Related to --"
                                onChange={(v1, v2) => {
                                  setActionVal(v1);
                                }}
                                options={actioned && actioned}
                              />
                            </div>
                          </>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_all_day ===
                            "true") &&
                          <div className="col-md-3 mt-1">
                            <SwitchCheck
                              options={datass.event}
                              label="All Day Event"
                              MainLabel={""}
                              name={"eve_all_day"}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_recursive_event ===
                            "true") &&
                          <div className="col-md-3 mt-1">
                            <div className="form-group">
                              <CreateCustomEvent
                                setCustomEvent={setCustomEvent}
                                setRepeat={setRepeat}
                                setPeriod={setPeriod}
                                setChecked={setChecked}
                                dateData={customEventDate}
                              />
                            </div>
                          </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_privacy ===
                            "true") &&
                          <div className="col-md-2 col-sm-12">
                            <SwitchButton
                              options={datass.priv}
                              label="Public"
                              MainLabel={"Privacy"}
                              name={"eve_privacy"}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_visibility ===
                            "true") &&
                          <div className="col-md-2 col-sm-12">
                            <SwitchButton
                              options={datass.Visibility}
                              label="Visibility"
                              MainLabel={"Visibility"}
                              name={"eve_visibility"}
                            />
                          </div>
                        }
                        <div className="col-md-8 col-sm-12">
                          {
                            (leadPermission?.super_admin ||
                              leadPermission?.follow_up?.fields?.followups_google_meet ===
                              "true") &&
                            <div className="form-group">
                              <label>
                                <b>Create a Google Meet room</b>
                                <span className="text-danger" />
                              </label>
                              <label className="custom-control custom-checkbox">
                                <Field
                                  type="checkbox"
                                  className="custom-control-input"
                                  name="eve_google_meet"
                                />
                                <span className="custom-control-label">
                                  Enable
                                  <br />
                                </span>
                              </label>
                            </div>
                          }
                          {
                            (leadPermission?.super_admin ||
                              leadPermission?.follow_up?.fields?.followups_meeting_platform ===
                              "true") &&
                            <div className="row align-items-end">
                              <div className="col-lg-3">
                                <label>
                                  <b>Meeting Platform</b>
                                </label>
                                <div className="form-group multiselect_div">
                                  <Field
                                    as="select"
                                    id="single-selection"
                                    name="eve_meeting_platform"
                                    className="form-control"
                                  >
                                    <option value="google_meeting">
                                      Google Meeting
                                    </option>
                                  </Field>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <div className="form-group">
                                  <Field
                                    className="form-control"
                                    placeholder="URL"
                                    type="text"
                                    name="eve_url"
                                  />
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_description ===
                            "true") &&
                          <FormControl
                            className="form-control my-1"
                            label={"Description"}
                            name="eve_description"
                            row={20}
                            control="textarea"
                            placeholder="Here can be your description"
                          />
                        }
                        <div className="d-flex mt-3 col-lg-12 align-items-start">
                          {
                            (leadPermission?.super_admin ||
                              leadPermission?.follow_up?.fields?.followups_notification ===
                              "true") &&
                            <div className="col-7 mt-3 p-0 notificationid">
                              <div className="row align-items-end m-0 d-flex align-item-center">
                                <div className="col-md-6 row align-items-end">
                                  <SwitchCheck
                                    options={datass.meet}
                                    MainLabel={""}
                                    name={"eve_notification_meet"}
                                  />
                                </div>
                                <div className="col-12">
                                  <label>
                                    <b>Notification</b>
                                  </label>
                                  {NotificationArr &&
                                    NotificationArr.map((item, index) => {
                                      return (
                                        <div
                                          className="row align-items-center m-0 mt-2 notiBox"
                                          key={index}
                                        >
                                          <div className="col-md-6 row align-items-center">
                                            <div className="col-8">
                                              <FormControl
                                                className="form-control my-1"
                                                selectList={list}
                                                name={`notify_type[]`}
                                                control="select"
                                                value={item.notify_type}
                                                onChange={(e) =>
                                                  handleNotificationType(
                                                    item,
                                                    index,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                            <div className="col-4">
                                              <div className="form-group my-2">
                                                <input
                                                  value={item.notify_interval}
                                                  onChange={(e) =>
                                                    handleNotificationNumber(
                                                      item,
                                                      index,
                                                      e.target.value
                                                    )
                                                  }
                                                  className="form-control my-1"
                                                  name={`notify_interval[]`}
                                                  placeholder="10"
                                                  type="number"
                                                />
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-md-5">
                                            <FormControl
                                              className="form-control my-1"
                                              selectList={timeList}
                                              value={item.notify_period}
                                              name={`notify_period[]`}
                                              control="select"
                                              onChange={(e) =>
                                                handleNotificationPeriod(
                                                  item,
                                                  index,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                          <div className="col-md-1">
                                            {index == 0 && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleNotificationAdd(item)
                                                }
                                                className="btn btn-primary py-2"
                                              >
                                                <i className="fe fe-plus" />{" "}
                                              </button>
                                            )}
                                            {index != 0 && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleNotificationRemove(item)
                                                }
                                                className="btn btn-danger py-2 removenoti"
                                              >
                                                {" "}
                                                <i className="fa fa-times"></i>
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          }
                          {
                            (leadPermission?.super_admin ||
                              leadPermission?.follow_up?.fields?.followups_feature_image ===
                              "true") &&
                            <div className="col-5 p-0 ml-1 mt-2">
                              <div className="card-body p-0">
                                <div>
                                  <File
                                    label={Translation(
                                      translations,
                                      "Feature Image"
                                    )}
                                    value={image}
                                    onUpload={setImage}
                                    name={"ava"}
                                  />
                                </div>
                              </div>
                            </div>
                          }
                        </div>
                        <br />
                        <br />
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.follow_up?.fields?.followups_members ===
                            "true") &&
                          <>
                            <h6>
                              <b>Members</b>
                            </h6>
                            <div id="memappe">
                              {AllMember.map((item, index) => {
                                return (
                                  <div className="row m-0 col-12 p-0" key={index}>
                                    <div className="col-md-8">
                                      <SelectSearch
                                        selected={item.membersearch}
                                        changess={(item) =>
                                          handleMemberPeriod2(item, index)
                                        }
                                      />
                                    </div>
                                    <div className="col-md-4">
                                      <span className="form-group d-flex gap-1">
                                        <div className="col-md-10">
                                          <FormControl
                                            className="form-control my-1"
                                            selectList={datass.ev_members}
                                            name={`notify_period[]`}
                                            control="select"
                                            value={item.ev_members}
                                            onChange={(e) =>
                                              handleMemberPeriod(
                                                item,
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div>
                                          {index === 0 && (
                                            <button
                                              style={{ height: 38 }}
                                              onClick={() => handelMemberAdd(item)}
                                              type="button"
                                              className="btn btn-primary mb-2"
                                              id="addmeme"
                                              data-target="#exampleModal"
                                            >
                                              <i className="fe fe-plus" />
                                            </button>
                                          )}
                                          {index !== 0 && (
                                            <button
                                              style={{ height: 38 }}
                                              onClick={() =>
                                                handelMemberRemove(item)
                                              }
                                              type="button"
                                              className="btn btn-danger mb-2"
                                              id="addmeme"
                                              data-target="#exampleModal"
                                            >
                                              <i className="fa fa-times" />
                                            </button>
                                          )}
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        }
                      </div>
                      <hr />
                      <SubmitButton
                        props={submitbutton}
                        buttonLoading={mainUpdate.isLoading}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
