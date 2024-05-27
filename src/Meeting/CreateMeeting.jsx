import { Formik, Form, Field } from "formik";
import AntdDatePicker from "../Calendar/components/AntdDatePicker";
import AntdTimePicker from "../Calendar/components/AntdTimePicker";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import SubmitButton from "../components/SubmitButton";
import usePost from "../customHooks/usePost";
import Loader from "../components/common/Loading";
import FormControl from "../components/form/FormControl";
import CreateCustomEvent from "../Calendar/CreateCustomEvent";
import { Translation } from "../components/Translation";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import SwitchCheck from "../Calendar/components/SwitchCheck";
import SwitchButton from "../Calendar/components/SwitchButton";
import SelectSearch from "../components/form/selectSearch";
import File from "../components/form/File";
import $ from "jquery";
import { Select } from "antd";
import swal from "sweetalert";
import { toast } from "react-toastify";
import useFetch from "../customHooks/useFetch";
import config from "../services/config.json"
import Dropdown5 from "../components/form/Dropdown5";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function CreateAction() {
  const navigate = useNavigate();

  // <----------------- START DEFINE ALL POST METHOD ---------------->

  const [updateMeeting, apiMethodUpdateMeeting] = usePost();
  const [searchRelatedData, apiMethodSearchRelatedData] = usePost();
  const [searchActionData, apiMethodSearchAction] = usePost();
  const [searchPipelineData, apiMethodSearchPipelineData] = usePost();
  const [searchStageData, apiMethodSearchStageData] = usePost();
  const [getCalenderData, apiMethodGetCalenderData] = usePost();

  // <----------------- END DEFINE ALL POST METHOD ---------------->

  // <---------------- START DEFINE ALL FETCH METHOD ----------------->

  const { data: priorityData, loading } = useFetch("", "getAllViewMeetingPriority");
  const { data: timeZone, loading2 } = useFetch("", "getListTimeZone");

  // <---------------- END DEFINE ALL FETCH METHOD ----------------->

  // <--------------- START DEFINE ALL CONNTEXT API ------------------>

  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext)
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);

  // <--------------- END DEFINE ALL CONNTEXT API ------------------>

  // <-------------- START DEFINE ALL USEREF AND USESTATE ------------------>

  const isComponentMounted = useRef(true);
  const [content, setContent] = useState("");
  const [onDate, setOnDate] = useState(dayjs().add(1, 'month'))
  const [allDayEventChecked, setAllDayEventChecked] = useState(false)
  const [occurrences, setOccurrences] = useState(10)
  const [image, setImage] = useState('');
  const [types, setTypes] = useState("1");
  const [repeat, setRepeat] = useState("");
  const [period, setPeriod] = useState(3);
  const [related, setRelated] = useState('');
  const [endTime, setEndTime] = useState('');
  const [calender, setCalender] = useState('');
  const [actioned, setActioned] = useState('');
  const [stagevari, setStagevari] = useState('');
  const [ActionVal, setActionVal] = useState('');
  const [startTime, setStartTime] = useState('');
  const [checked, setChecked] = useState("never");
  const [relatedVal, setRelatedVal] = useState('');
  const [timeDefault, setTimeDefault] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [piplinesvari, setPiplinesvari] = useState('');
  const [relatedtoVal, setRelatedtoVal] = useState("");
  const [submitbuttons, setSubmitbuttons] = useState(false);
  const [hexCodeDefault, sethexCodeDefault] = useState('');
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [customEventDate, setCustomEventDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [showCustomEventDate, setShowCustomEventDate] = useState(dayjs());
  const [showEndDate, setShowEndDate] = useState(dayjs().add(1, 'hour'));
  const [showStartTime, setShowStartTime] = useState(dayjs());
  const [showEndTime, setShowEndTime] = useState(dayjs().add(1, 'hour'));
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

  // <-------------- END DEFINE ALL USEREF AND USESTATE ------------------>

  // <----------------- START DEFINE ALL NORMAL VARIABLE ---------------->

  const date = dayjs();
  let rel = ["contact", "opportunity", "user", "project", "meeting"];
  const list = [
    { label: "System Notification", value: "system_notification" },
    { label: "SMS", value: "sms" },
    { label: "eMail", value: "email" },
  ];
  const submitbutton = {
    class: "btn btn-primary d-block mt-3 ml-auto submit",
    text: "Save Event",
  };
  const timeList = [
    { label: "Minute", value: "minute" },
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
  ];


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
  // <----------------- END DEFINE ALL NORMAL VARIABLE ---------------->

  //  <----------------- START DECLARATION OF ALL POST FUNCTION ------------->

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  useEffect(() => {
    addHeading(`Create  Meeting`)
    if (isComponentMounted.current) {
      let formData = new FormData();
      formData.append("event_type", "meeting");
      apiMethodSearchPipelineData("postAllViewEventsPiplines", formData);
      return () => isComponentMounted.current = false
    }

  }, []);

  useEffect(() => {
    if (searchPipelineData.data) {
      setPiplinesvari(searchPipelineData?.data?.[0]?.db_id)
      handlePiplineStages(searchPipelineData?.data?.[0]?.db_id)
    }
  }, [searchPipelineData.data])

  useEffect(() => {
    if (priorityData && !loading) {
      setTypes(priorityData[0]?.priority_id)
      handleCalenderData(priorityData[0]?.priority_id)
    }
  }, [priorityData])

  const handleCalenderData = (value) => {
    let calenderData = new FormData();
    setTypes(value)
    calenderData.append('event_type', value);
    apiMethodGetCalenderData('postPiplineEventStatus', calenderData)
  }

  useEffect(() => {
    if (getCalenderData?.data) {
      setCalender(getCalenderData?.data?.list_calendars[0]?.cl_db_did)
      sethexCodeDefault(getCalenderData?.data?.list_calendars[0]?.calendar_color)
    }
  }, [getCalenderData.data])

  const handleCalenderValue = (event) => {
    setCalender(event.target.value)
    sethexCodeDefault(getCalenderData?.data?.list_calendars.filter(item => item.cl_db_did === event.target.value)?.[0]?.calendar_color)
  }

  const handleSearchRelated = (v) => {
    const formdata = new FormData();
    formdata.append("q", v);
    formdata.append("related", relatedtoVal);
    formdata.append("event_create", "general_event_create_query");
    apiMethodSearchRelatedData("postSearchEventsModuleRelated", formdata);
  };

  useEffect(() => {
    if (searchRelatedData.data) {
      if (searchRelatedData.data && !searchRelatedData.isLoading) {
        if (!searchRelatedData.data.message) {
          setRelated(
            searchRelatedData.data.map((item) => {
              return {
                value: item.value,
                label: item.text,
              };
            })
          );
        }
      }
    }
  }, [searchRelatedData.data]);

  const handleSearchAction = (v) => {
    const formdata = new FormData();
    formdata.append("q", v);
    formdata.append("event_action_sr", "general_event_srAction_query");
    apiMethodSearchAction("postSearchEventsActionsRelated", formdata);
  };

  useEffect(() => {
    if (searchActionData.data) {
      if (searchActionData.data && !searchActionData.isLoading) {
        if (!searchActionData.data.message) {
          setActioned(
            searchActionData.data.map((item) => {
              return {
                value: item.value,
                label: item.text,
              };
            })
          );
        }
      }
    }
  }, [searchActionData.data]);

  const handlePiplineStages = (value) => {
    setPiplinesvari(value);
    let formData = new FormData();
    formData.append("pipeline_id", value);
    formData.append("event_type", "meeting");
    apiMethodSearchStageData("postViewEventsPiplinesStages", formData);
  };

  useEffect(() => {
    if (searchStageData.data) {
      setStagevari(searchStageData?.data?.[0]?.id)
    }
  }, [searchStageData?.data])

  //  <----------------- END DECLARATION OF ALL POST FUNCTION ----------------->

  //  <------------------ START FUNCTION FOR MAIN UPDATE ------------------------>

  function handleSubmit(values, { resetForm }) {
    if (values["eve_name"] === "") {
      swal({
        title: "Please fill the following feild:",
        text: "Event Title",
        icon: "warning",
        dangerMode: true,
      });
    }
    else {
      const formdata = new FormData();
      for (let item in values) {
        if (item === "eve_google_meet") {
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
      formdata.append('event_type', 'meeting');
      formdata.append('eve_calendar', calender);
      formdata.append('create_event', 'cReaTe_eVENt');
      formdata.append('eve_all_day', allDayEventChecked ? 1 : 0);
      formdata.append('eve_all_day_repeat', CustomEvent.firstValue);
      formdata.append("eve_related_to", relatedtoVal);
      formdata.append("eve_related_to_val", relatedVal);
      formdata.append("eve_depenency_on", ActionVal);
      formdata.append("pipeline", piplinesvari);
      formdata.append("stage", stagevari);
      formdata.append("priority", types);
      formdata.append("eve_time_zone", practiceName);
      formdata.append("eve_color", hexCodeDefault);
      formdata.append("e_featureimg", image);
      formdata.append("custom_test", CustomEvent.secondValue);
      formdata.append("custom_recurrence", CustomEvent.label);
      formdata.append("repeat_days", new Date().getDay());
      formdata.append("monthly_selection", new Date().getDate());
      if (CustomEvent.firstValue === "cust") {
        formdata.append("c_interval", repeat);
        formdata.append("c_period", period === 0 ? 'year' : period === 1 ? 'month' : period === 2 ? 'week' : period === 3 && 'day');
        formdata.append("ends", checked);
        if (checked === 'after') {
          formdata.append("c_times", occurrences);
        } else if (checked === 'on') {
          formdata.append("c_enddate", onDate.format('YYYY-MM-DD'));
        }
      }
      if (!allDayEventChecked) {
        formdata.append('eve_end_time', dayjs(showEndTime).tz(permissions?.usertimezone).format('HH:mm:ss'))
        formdata.append('eve_start_time', dayjs(showStartTime).tz(permissions?.usertimezone).format('HH:mm:ss'))
        formdata.append('eve_end_date', dayjs(showEndDate).tz(permissions?.usertimezone).format('YYYY-MM-DD'))
        formdata.append('eve_start_date', dayjs(showCustomEventDate).tz(permissions?.usertimezone).format('YYYY-MM-DD'))
      }
      else {
        formdata.append('eve_end_date', dayjs(showEndDate).format('YYYY-MM-DD'))
        formdata.append('eve_start_date', dayjs(showCustomEventDate).format('YYYY-MM-DD'))
      }
      apiMethodUpdateMeeting("postCreatePiplineEvent", formdata);
      resetForm();
      setPracticeName("");
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
    if (updateMeeting.data && !updateMeeting.isLoading) {
      setSubmitbuttons(true);
      toast.success(updateMeeting.data.message);
      navigate(`/${config.ddemoss}meeting/${piplinesvari}/Grid`)
    }
  }, [updateMeeting.data]);

  //  <------------------ END FUNCTION FOR MAIN UPDATE ------------------------>

  // <---------- START FUNCTION FOR HANDLE DATE/TIME/TIMEZONE/HEX-CODE ---------->


  const handleChecked = () => {
    setAllDayEventChecked(!allDayEventChecked)
    setShowCustomEventDate(showCustomEventDate)
    setShowEndDate(showEndDate)
    setShowStartTime(showStartTime)
    setShowEndTime(showEndTime)
  }

  const rangeStartDate = dayjs(showCustomEventDate).format('YYYY-MM-DD')
  const rangeEndDate = dayjs(showEndDate).format('YYYY-MM-DD')
  const rangeStartTime = dayjs(showStartTime).format('HH:mm')
  const rangeEndTime = dayjs(showEndTime).format('HH:mm')
  const startRange = `${rangeStartDate} ${rangeStartTime}`
  const endRange = `${rangeEndDate} ${rangeEndTime}`
  let change = dayjs(endRange).diff(startRange, 'minute')


  const handleCustomEventDate = (value) => {
    setShowCustomEventDate(value)
    setShowStartTime(value)
    if (value > dayjs(showEndDate)) {
      setShowEndTime(dayjs(value).add(1, 'hour'))
      setShowEndDate(dayjs(value).add(1, 'hour'))
    }
  }

  const handleEndDate = (value) => {
    setShowEndDate(value)
    setShowEndTime(value)
    if (value < dayjs(showCustomEventDate)) {
      setShowStartTime(dayjs(value).subtract(1, 'hour'))
      setShowCustomEventDate(dayjs(value).subtract(1, 'hour'))
    }
  }
  const handleCustomEventTime = (value) => {
    setShowStartTime(value)
    setShowCustomEventDate(value)
    setShowEndTime(dayjs(value).add(change, 'minute'))
    setShowEndDate(dayjs(value).add(change, 'minute'))
  }

  const handleEndTime = (value) => {
    change = value.diff(showStartTime, 'minute')
    setShowEndTime(value)
    setShowEndDate(value)
    if (value.add(-15, 'minute') < dayjs(showEndTime)) {
      setShowStartTime(dayjs(value).subtract(1, 'hour'))
      setShowCustomEventDate(dayjs(value).subtract(1, 'hour'))
    }
  }
  useEffect(() => {
    if (permissions?.usertimezone) {
      setTimeDefault(permissions?.usertimezone)
      setPracticeName(permissions?.usertimezone)
      handleTimeZone(permissions?.usertimezone)
    }
  }, [permissions?.usertimezone])


  const handleTimeZone = (item) => {
    setPracticeName(item);
  };

  useEffect(() => {
    if (practiceName) {
      const dateInTimezone = dayjs().tz(practiceName);
      setTypes('event')
      setCustomEventDate(dateInTimezone)
      setStartTime(dateInTimezone)
      setEndTime(dateInTimezone.add(1, 'hour'))
      setEndDate(dateInTimezone.add(1, 'hour'))
    }
  }, [practiceName])




  const handleColorChange = (event) => {
    sethexCodeDefault(event.target.value);
  };

  // <---------- END FUNCTION FOR HANDLE DATE/TIME/TIMEZONE/HEX-CODE ---------->

  // <------- START FUNCTION FOR HANDLE NOTIFICATION SECTION ---------> 

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

  // <------- END FUNCTION FOR HANDLE NOTIFICATION SECTION ---------> 

  // <----------- START FUNCTION FOR HANDLE MEMBER SECTION -------------> 

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
    // console.log(item);
    const updatedObject = { ...AllMember[index], membersearch: item };
    const updatedListss = [...AllMember];
    updatedListss[index] = updatedObject;
    setAllMember(updatedListss);
  });

  // <----------- END FUNCTION FOR HANDLE MEMBER SECTION -------------> 

  if (!searchPipelineData || loading || loading2) return <Loader />;

  const initialValues = {
    eve_name: "",
    // eve_calendar: getCalenderData?.data?.list_calendars[0]?.cl_db_did,
    eve_location: "",
    eve_notification_meet: "",
    eve_privacy: "public",
    eve_visibility: "busy",
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
                            leadPermission?.meeting?.fields?.meetings_title ===
                            "true") &&
                          <div className="col-md-5 col-sm-12">
                            <FormControl
                              className="form-control my-1"
                              label={Translation(translations, "Event Title")}
                              name="eve_name"
                              control="input3"
                              placeholder=" Event Title"
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_priority ===
                            "true") &&
                          <div className="col-md-2 col-sm-12">
                            <div className="form-group my-2">
                              <FormControl
                                className="form-control my-1"
                                selectList={priorityData}
                                label={Translation(translations, "Priority")}
                                name="priority"
                                control="select_custom_options"
                                value={types}
                                custom_label_name="priority_label"
                                customer_value_name="priority_id"
                                onChange={(event) => handleCalenderData(event.target.value)}
                              />
                            </div>
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_calendar ===
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
                              onChange={(event) => handleCalenderValue(event)}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_color ===
                            "true") &&
                          <div className="col-md-3 mt-2">
                            <div className="form-group bokable">
                              <label style={{ marginBottom: 12 }} className="form-label">HEX CODE</label>
                              <div className="input-group">
                                <input
                                  defaultValue={hexCodeDefault}
                                  type="text"
                                  className="form-control inputV"
                                />
                                <div className="input-group-append">
                                  <input
                                    type="color"
                                    className="inputColor"
                                    value={hexCodeDefault}
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
                            leadPermission?.meeting?.fields?.meetings_pipeline ===
                            "true") &&
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group my-2">
                              <label htmlFor="pipeline">
                                <b>Pipeline</b>
                              </label>
                              <select
                                className="form-control mt-1"
                                value={piplinesvari}
                                name="pipeline"
                                id="pipeline"
                                onChange={(event) => handlePiplineStages(event.target.value)}
                              >
                                {Array.isArray(searchPipelineData?.data) &&
                                  searchPipelineData.data.map((item, index) => {
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
                            leadPermission?.meeting?.fields?.meetings_stage ===
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
                              selectList={searchStageData.data}
                              onChange={(e) => setStagevari(e.target.value)}
                            />
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_location ===
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
                            leadPermission?.meeting?.fields?.meetings_start_date ===
                            "true") &&
                          <div className="col-md-2 col-sm-6">
                            <div className="form-group my-2  time-picker">
                              <label htmlFor={"date"}><b>Start Date</b></label>
                              <br />
                              <AntdDatePicker
                                defaultVal={showCustomEventDate}
                                onChange={handleCustomEventDate}
                              />
                            </div>
                          </div>
                        }
                        {allDayEventChecked ? '' :
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_start_date_time ===
                            "true") &&
                          <div className="col-md-2 col-sm-6">
                            <div className="form-group my-2 time-picker">
                              <label htmlFor={"date"}><b>Time</b></label>
                              <br />
                              <AntdTimePicker
                                onChange={handleCustomEventTime}
                                value={showStartTime}
                              />
                            </div>
                          </div>}
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_end_date ===
                            "true") &&
                          <div className="col-md-2 col-sm-6">
                            <div className="form-group my-2 time-picker">
                              <label htmlFor={"date"}><b>End Date</b></label>
                              <AntdDatePicker
                                defaultVal={showEndDate}
                                onChange={handleEndDate}
                              />
                            </div>
                          </div>
                        }
                        {allDayEventChecked ? '' :
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_end_date_time ===
                            "true") &&
                          <div className="col-md-2 col-sm-6">
                            <div className="form-group my-2 time-picker">
                              <label htmlFor={"date"}><b>Time</b></label>
                              <br />
                              <AntdTimePicker
                                value={showEndTime}
                                onChange={handleEndTime}
                              />
                            </div>
                          </div>}
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_time_zone ===
                            "true") &&
                          <div className="col-md-4">
                            <div className="form-group my-2">
                              <label>Event TitleT. Zone</label>
                              {
                                timeZone &&
                                <Dropdown5
                                  list={timeZone}
                                  changes={(value) => handleTimeZone(value)}
                                  selected={practiceName}
                                />
                              }

                            </div>
                          </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_related_to ===
                            "true") &&
                          <>
                            <div className="col-md-4 col-sm-4">
                              <FormControl
                                className="form-control my-1"
                                name="eve_related_to"
                                control="select_custom_options"
                                custom_label_name="label"
                                customer_value_name="value"
                                selectList={datass.eve_related_to && datass.eve_related_to}
                                value={relatedtoVal}
                                onChange={(e) => setRelatedtoVal(e.target.value)}
                              />
                            </div>
                            <div className="col-md-8 col-sm-8 calenderselected my-2">
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
                            leadPermission?.meeting?.fields?.meetings_has_dependency ===
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
                            leadPermission?.meeting?.fields?.meetings_all_day ===
                            "true") &&
                          <div className="col-md-3 mt-1">
                            <div className="form-group">
                              <label className="form-label"></label>
                              <div className="form-group">
                                <label className="custom-switch">
                                  <input
                                    type="checkbox"
                                    className="custom-switch-input"
                                    onChange={handleChecked}
                                    checked={allDayEventChecked}
                                  />
                                  <span className="custom-switch-indicator custom-switch-indicator_new"></span>
                                  <span className="custom-switch-description">All Day Event</span>
                                </label>
                              </div>
                            </div>
                            {/* <SwitchCheck
                            options={datass.event}
                            label="All Day Event"
                            MainLabel={""}
                            name={"eve_all_day"}
                          /> */}
                          </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_recursive_event ===
                            "true") &&
                          <div className="col-md-3 mt-1">
                            <div className="form-group">
                              <CreateCustomEvent
                                setCustomEvent={setCustomEvent}
                                setRepeat={setRepeat}
                                setPeriod={setPeriod}
                                setChecked={setChecked}
                                dateData={showCustomEventDate}
                                setOnDate={setOnDate}
                                setOccurrences={setOccurrences}
                              />
                            </div>
                          </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_privacy ===
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
                            leadPermission?.meeting?.fields?.meetings_visibility ===
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
                              leadPermission?.meeting?.fields?.meetings_google_meet ===
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

                          <div className="row align-items-end">
                            {
                              (leadPermission?.super_admin ||
                                leadPermission?.meeting?.fields?.meetings_meeting_platform ===
                                "true") &&
                              <>
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
                              </>
                            }
                          </div>
                        </div>
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.meeting?.fields?.meetings_description ===
                            "true") &&
                          <div className="col-md-12 form-group my-2">
                            <b className="my-2">Description</b>
                            <CKEditor
                              editor={ClassicEditor}
                              data={content}
                              onChange={handleEditorChange}
                              id={'description'}
                            />
                          </div>
                        }
                        <div className="d-flex mt-3 col-lg-12 align-items-start">
                          {
                            (leadPermission?.super_admin ||
                              leadPermission?.meeting?.fields?.meetings_notification ===
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
                              leadPermission?.meeting?.fields?.meetings_feature_image ===
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
                            leadPermission?.meeting?.fields?.meetings_members ===
                            "true") &&
                          <>
                            <h6>
                              <b>Members</b>
                            </h6>
                            <div id="memappe">
                              {AllMember.map((item, index) => {
                                return (
                                  <div className="row m-0 col-12 p-0" key={index}>
                                    <div className="col-md-8 my-1">
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
                                            align={'e'}
                                            className="form-control"
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
                        buttonLoading={updateMeeting.isLoading}
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
