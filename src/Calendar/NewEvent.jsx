import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { MainHeadingContext } from "../context/MainHeadingContext";
import SubmitButton from "../components/SubmitButton";
import usePost from "../customHooks/usePost";
import Loader from "../components/common/Loading";
import FormControl from "../components/form/FormControl";
import CreateCustomEvent from "./CreateCustomEvent";
import { Translation } from "../components/Translation";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import SwitchCheck from "./components/SwitchCheck";
import SwitchButton from "./components/SwitchButton";
import SelectSearch from "../components/form/selectSearch";
import File from "../components/form/File";
import { Select } from "antd";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../services/config.json";
import { MainEditCalenderContext } from "../context/MainEditCalenderContext";
import useFetch from "../customHooks/useFetch";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Dropdown5 from "../components/form/Dropdown5";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import AntdDatePicker from "./components/AntdDatePicker";
import { TimePicker } from 'antd';
import AntdTimePicker from "./components/AntdTimePicker";


dayjs.extend(utc);
dayjs.extend(timezone);

function NewEvent() {

  const [postType, apiMethodPostType] = usePost();
  const [postPipeline, apiMethodPostPipeline] = usePost();
  const [res, apiMethod] = usePost();
  const [resRelated, apiMethodRelated] = usePost();
  const [resAction, apiMethodAction] = usePost();


  const manageDateRef = useRef(true);
  const [allDayEventChecked, setAllDayEventChecked] = useState(false)
  const [stageList, setStageList] = useState('');
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [types, setTypes] = useState('');
  const [Voted, setVoted] = useState('');
  const [period, setPeriod] = useState(3);
  const [repeat, setRepeat] = useState('');
  const [related, setRelated] = useState('');
  const [actioned, setActioned] = useState('');
  const [piplinesList, setPiplinesList] = useState('');
  const [calender, setCalender] = useState('');
  const [seriName, setseriName] = useState('');
  const [severityLabel, setSeverityLabel] = useState('');
  const [stageValue, setStageValue] = useState('');
  const [ActionVal, setActionVal] = useState('');
  const [checked, setChecked] = useState('never');
  const [relatedVal, setRelatedVal] = useState('');
  const [canBeVoted, setCanBeVoted] = useState('');
  const [severityAndPriorityList, setSeverityAndPriorityList] = useState('');
  const [timeDefault, setTimeDefault] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [relatedtoVal, setRelatedtoVal] = useState('');
  const [piplineValue, setPiplineValue] = useState('');
  const [severityAndPriorityValue, setSeverityAndPriorityValue] = useState('');
  const [submitbuttons, setSubmitbuttons] = useState(false);
  const [hexCodeDefault, sethexCodeDefault] = useState('#000000');
  const [showCustomEventDate, setShowCustomEventDate] = useState('');
  const [showEndDate, setShowEndDate] = useState('');
  const [showStartTime, setShowStartTime] = useState('');
  const [showEndTime, setShowEndTime] = useState('');
  const [occurrences, setOccurrences] = useState(10)
  const [onDate, setOnDate] = useState(dayjs().add(1, 'month'))
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


  const { addHeading } = useContext(MainHeadingContext);
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { calenderdetails } = useContext(MainEditCalenderContext);
  const { data: getCalenderData, loadind1 } = useFetch("", `getAllCalendars`);
  const { data: timeZone, loading } = useFetch("", "getListTimeZone");

  console.log(permissions?.usertimezone)
  useEffect(() => addHeading(`New Event`), [])


  useEffect(() => {
    if (calenderdetails, practiceName) {
      const { EventType, startdate, enddate, Starttime, view } = calenderdetails
      console.log(calenderdetails)
      if (manageDateRef.current) {
        const dateInTimezone = dayjs().tz(practiceName);
        const monthDate = `${startdate} ${Starttime}`
        setTypes(EventType !== '' ? EventType : 'event')
        handleType(EventType !== '' ? EventType : 'event')


        if (view === 'dayGridMonth') {
          setShowStartTime(dayjs(`${startdate} ${Starttime}`))
          setShowEndTime(dayjs(`${startdate} ${Starttime}`).add(1, 'hour'))
          setShowCustomEventDate(startdate ? dayjs(monthDate) : dayjs())
          setShowEndDate(startdate ? dayjs(monthDate).add(1, 'hour') : dayjs().add(1, 'hour'))
        }
        else {
          setShowStartTime(startdate ? dayjs(startdate) : dayjs())
          setShowEndTime(enddate ? dayjs(enddate) : dayjs().add(1, 'hour'))
          setShowCustomEventDate(startdate ? dayjs(startdate) : dayjs())
          setShowEndDate(enddate ? dayjs(enddate) : dayjs().add(1, 'hour'))
        }
        return () => manageDateRef.current = false
      }
    }
  }, [practiceName, calenderdetails])


  useEffect(() => {
    if (permissions?.usertimezone) {
      setTimeDefault(permissions?.usertimezone)
      setPracticeName(permissions?.usertimezone)
      handleTimeZone(permissions?.usertimezone)
    }
  }, [permissions?.usertimezone])


  let rel = ["contact", "opportunity", "user", "project", "meeting"];

  const typess = [
    {
      label: "Event",
      value: "event",
    },
    {
      label: "Meeting",
      value: "meeting",
    },
    {
      label: "Action",
      value: "action",
    },
    {
      label: "Follow Up",
      value: "follow_up",
    },
    {
      label: "Reminder",
      value: "reminder",
    },
    {
      label: "Out of Office",
      value: "out_of_office",
    },
  ];

  const list = [
    { label: "System Notification", value: "system_notification" },
    { label: "SMS", value: "sms" },
    { label: "eMail", value: "email" },
  ];

  const submitbutton = {
    class: "btn btn-primary d-block mt-3 ml-auto submit",
    text: "Save Event",
  };


  const handleCalender = (event) => {
    setCalender(event.target.value)
    sethexCodeDefault(getCalenderData.filter((item) => item.cl_db_did === event.target.value)[0].calendar_color)
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  useEffect(() => {
    if (getCalenderData) {
      setCalender(calenderdetails.EventCalendar ? calenderdetails.EventCalendar : getCalenderData[0].cl_db_did)
      sethexCodeDefault(calenderdetails.HEXCODE ? calenderdetails.HEXCODE : getCalenderData[0].calendar_color)
    }
  }, [getCalenderData])

  const handleColorChange = useCallback((event) => {
    const color = event.target.value;
    sethexCodeDefault(color)
  }, []);


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


  let array = ["meeting", "action", "follow_up"];
  let array2 = ["meeting", "action", "follow_up", "reminder", "out_of_office"];


  function handleType(value) {
    setTypes(value);
    let formData = new FormData();
    formData.append("event_type", value);
    apiMethodPostType("postPiplineEventStatus", formData);
    if (value === 'follow_up') setSeverityLabel('Severity')
    else setSeverityLabel('Priority')
  }

  useEffect(() => {
    if (postType?.data) {
      setPiplinesList(postType?.data?.pipelines);
      if (array.includes(types)) {
        setPiplineValue(postType?.data?.pipelines[0]?.db_id)
        setCanBeVoted(postType.data.pipelines[0].can_be_voted);
        handlePiplineValueOnFirstReload(postType?.data?.pipelines[0]?.db_id);
      }
      if (Array.isArray(postType?.data?.priorities)) {
        setSeverityAndPriorityList(postType?.data?.priorities)
        setSeverityAndPriorityValue(postType?.data?.priorities?.[0]?.priority_id)
      }
      else if (Array.isArray(postType?.data?.severities)) {
        setSeverityAndPriorityList(postType?.data?.severities)
        setSeverityAndPriorityValue(postType?.data?.severities?.[0]?.severity_id)
      }
    }
  }, [postType?.data]);


  const handlePiplineValueOnFirstReload = (value) => {
    let formData = new FormData();
    formData.append("event_type", types);
    formData.append("pipeline_id", value);
    apiMethodPostPipeline("postPiplineEventStatus", formData);
  };

  const handlePipelineValue = (event) => {
    setPiplineValue(event.target.value);
    setCanBeVoted(event.target.getAttribute("voted"));
    setCanBeVoted(event.target.options[event.target.selectedIndex].getAttribute("voted"))
    let formData = new FormData();
    formData.append("event_type", types);
    formData.append("pipeline_id", event.target.value);
    apiMethodPostPipeline("postPiplineEventStatus", formData);
  };

  useEffect(() => {
    if (postPipeline?.data) {
      setStageList(postPipeline?.data?.stages)
      setStageValue(postPipeline?.data?.stages[0]?.id)
    }
  }, [postPipeline?.data])


  const handleTimeZone = (item) => {
    setPracticeName(item);
  };


  function handleSubmit(values, { resetForm }) {

    if (values["eve_name"] === "") {
      console.log(period)
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

      if (array2.includes(types)) {
        formdata.append("eve_related_to", relatedtoVal);
        formdata.append("eve_related_to_val", relatedVal);
        formdata.append("eve_depenency", ActionVal);
      }
      if (array.includes(types)) {
        formdata.append("pipeline", piplineValue);
        formdata.append("stage", stageValue);
        if (seriName == "Severities") {
          formdata.append("severity", severityAndPriorityValue);
        } else {
          formdata.append("priority", severityAndPriorityValue);
        }
      }
      if (canBeVoted == "1") {
        formdata.append("invote", Voted);
      }
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
      formdata.append("eve_type", types);
      formdata.append("eve_all_day", allDayEventChecked ? 1 : 0);
      formdata.append("eve_time_zone", practiceName);
      formdata.append("eve_color", hexCodeDefault);
      formdata.append("e_featureimg", image);
      formdata.append("custom_test", CustomEvent.secondValue);
      formdata.append("custom_recurrence", CustomEvent.label);
      formdata.append("repeat_days", new Date().getDay());
      formdata.append("monthly_selection", new Date().getDate());
      formdata.append("eve_description", content);
      // if (CustomEvent.firstValue === 'every_weekday') {
      //   if (!allDayEventChecked) {
      //     formdata.append('eve_end_time', dayjs(showEndTime).tz(permissions?.usertimezone).format('HH:mm:ss'))
      //     formdata.append('eve_start_time', dayjs(showStartTime).tz(permissions?.usertimezone).format('HH:mm:ss'))
      //     if (showCustomEventDate.day() === 6) {
      //       formdata.append('eve_start_date', showCustomEventDate.add(2, 'day').format('YYYY-MM-DD'))
      //       formdata.append('eve_end_date', showCustomEventDate.add(2, 'day').format('YYYY-MM-DD'))
      //     }
      //     else if (showCustomEventDate.day() === 0) {
      //       formdata.append('eve_start_date', showCustomEventDate.add(1, 'day').format('YYYY-MM-DD'))
      //       formdata.append('eve_end_date', showCustomEventDate.add(1, 'day').format('YYYY-MM-DD'))
      //     }
      //   }
      //   else{

      //   }
      // }
      if (!allDayEventChecked) {
        formdata.append('eve_end_time', dayjs(showEndTime).tz(practiceName).format('HH:mm:ss'))
        formdata.append('eve_start_time', dayjs(showStartTime).tz(practiceName).format('HH:mm:ss'))
        formdata.append('eve_end_date', dayjs(showEndDate).tz(practiceName).format('YYYY-MM-DD'))
        formdata.append('eve_start_date', dayjs(showCustomEventDate).tz(practiceName).format('YYYY-MM-DD'))
      }
      else {
        formdata.append('eve_end_date', dayjs(showEndDate).format('YYYY-MM-DD'))
        formdata.append('eve_start_date', dayjs(showCustomEventDate).format('YYYY-MM-DD'))
      }

      formdata.append('eve_calendar', calender)
      formdata.append('eve_all_day_repeat', CustomEvent.firstValue)
      apiMethod("postCreateEvent", formdata);
      resetForm();
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

  const navigate = useNavigate();

  useEffect(() => {
    if (res.data && !res.isLoading) {
      setSubmitbuttons(true);
      setCanBeVoted("");
      // navigate(`/${config.ddemoss}calendar_events`);
      toast.success(res.data.message);
    }
  }, [res.data]);


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
  const handleSearchRelated = (v) => {
    const formdata = new FormData();
    formdata.append("q", v);
    formdata.append("related", relatedtoVal);
    formdata.append("event_create", "general_event_create_query");
    apiMethodRelated("postSearchEventsModuleRelated", formdata);
  };
  useEffect(() => {
    if (resRelated.data) {
      if (resRelated.data && !resRelated.isLoading) {
        if (!resRelated.data.message) {
          setRelated(
            resRelated.data.map((item) => {
              return {
                value: item.value,
                label: item.text,
              };
            })
          );
        }
      }
    }
  }, [resRelated.data]);
  const handleSearchAction = (v) => {
    const formdata = new FormData();
    formdata.append("q", v);
    formdata.append("event_action_sr", "general_event_srAction_query");
    apiMethodAction("postSearchEventsActionsRelated", formdata);
  };
  useEffect(() => {
    if (resAction.data) {
      if (resAction.data && !resAction.isLoading) {
        if (!resAction.data.message) {
          setActioned(
            resAction.data.map((item) => {
              return {
                value: item.value,
                label: item.text,
              };
            })
          );
        }
      }
    }
  }, [resAction.data]);



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
  const handleNotificationRemove = useCallback((item) => {
    setNotificationArr();
    setNotificationArr(NotificationArr.filter((ite) => ite.id != item.id));
  });
  const handelMemberRemove = useCallback((item) => {
    setAllMember(AllMember.filter((ite) => ite.id != item.id));
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

  const initialValues = {
    eve_name: calenderdetails.EventTitle ? calenderdetails.EventTitle : "",
    eve_location: "",
    eve_notification_meet: "",
    eve_privacy: "public",
    eve_visibility: "busy",
    eve_google_meet: "",
    eve_url: "",
    eve_depenency: "",
    eve_meeting_platform: "google_meeting",
  };

  const timeList = [
    { label: "Minute", value: "minute" },
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
  ];

  if (loadind1 || loading) return <Loader />

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
                        <div className="col-md-5 col-sm-12">
                          <FormControl
                            className="form-control my-1"
                            label={"Event Title"}
                            name="eve_name"
                            control="input3"
                            placeholder=" Event Title"
                          />
                        </div>
                        <div className="col-md-2 col-sm-12">
                          <div className="form-group my-2">
                            {
                              <FormControl
                                className="form-control my-1"
                                selectList={typess}
                                label={Translation(translations, `${"Type"}`)}
                                name={"eve_type"}
                                control="select_custom_options"
                                custom_label_name="label"
                                customer_value_name="value"
                                value={types}
                                onChange={event => handleType(event.target.value)}
                              />
                            }
                          </div>
                        </div>
                        <div className="col-md-2">
                          <FormControl
                            className="form-control my-1"
                            selectList={getCalenderData}
                            label={Translation(translations, `${"Calendar"}`)}
                            name={"eve_calendar"}
                            control="select_custom_options"
                            custom_label_name="calendar_name"
                            customer_value_name="cl_db_did"
                            value={calender}
                            onChange={event => handleCalender(event)}
                          />
                        </div>
                        <div className="col-md-3">
                          <div className="form-group bokable  my-2">
                            <label>HEX CODE</label>
                            <div className="input-group my-1">
                              <input
                                value={hexCodeDefault}
                                type="text"
                                className="form-control inputV"
                                onChange={handleColorChange}
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
                          {/* <ColorPicker
                            stateUpdation={sethexCodeDefault}
                            stateValue={hexCodeDefault}
                            calenderData = {calenderdetails.HEXCODE}
                            apiCalenderData = {getCalenderData}
                          /> */}
                        </div>
                      </div>
                      {array.includes(types) && (
                        <div className="row">
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group my-2">
                              <label htmlFor="pipeline">
                                <b>Pipeline</b>
                              </label>
                              <select
                                className="form-control my-1"
                                value={piplineValue}
                                name="pipeline"
                                id="pipeline"
                                onChange={(event) => handlePipelineValue(event)}
                              >
                                {Array.isArray(piplinesList) &&
                                  piplinesList.map((item, index) => {
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
                          <div className="col-md-4 col-sm-4">
                            <FormControl
                              className="form-control my-1"
                              label={"Stage"}
                              name="stage"
                              control="select_custom_options"
                              custom_label_name="name"
                              customer_value_name="id"
                              value={stageValue}
                              selectList={stageList}
                              onChange={(e) => setStageValue(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group my-2">
                              <label>
                                <b>{severityLabel}</b>
                                <span className="text-danger"></span>
                              </label>
                              <select
                                className="form-control my-1"
                                value={severityAndPriorityValue}
                                name={seriName.toLowerCase()}
                                id={seriName.toLowerCase()}
                                onChange={event => setSeverityAndPriorityValue(event.target.value)}
                              >
                                {Array.isArray(severityAndPriorityList) &&
                                  severityAndPriorityList.map((item, index) => {
                                    return (
                                      <option
                                        key={index}
                                        value={item[`${severityLabel.toLowerCase()}_id`]}
                                      >
                                        {item[`${severityLabel.toLowerCase()}_label`]}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </div>
                          {canBeVoted == "1" && (
                            <div className="col-md-4 col-sm-4">
                              <FormControl
                                className="form-control my-1"
                                label={"Vote Status"}
                                name={"invote"}
                                control="select_custom_options"
                                custom_label_name={`label`}
                                customer_value_name={`value`}
                                value={Voted}
                                selectList={datass.Vote && datass.Vote}
                                onChange={(e) => setVoted(e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {array2.includes(types) && (
                        <>
                          <div className="row">
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
                                onChange={(e) => {
                                  setRelatedtoVal(e.target.value);
                                  setRelatedVal('');
                                }
                                }
                              />
                            </div>
                            <div className="col-md-8 col-sm-8 calenderselected">
                              <Select
                                showSearch={true}
                                disabled={!rel.includes(relatedtoVal)}
                                filterOption={false}
                                style={{
                                  width: "100%",
                                  margin: "10px 0"
                                }}
                                onSearch={(v) => {
                                  handleSearchRelated(v);
                                }}
                                placeholder="Search for --Module Related to --"
                                onChange={(v1, v2) => {
                                  setRelatedVal(v1);
                                }}
                                options={related}
                                value={relatedVal}
                              />
                            </div>
                          </div>
                          <div className="row">
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
                                value={ActionVal}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="row">
                        <div className="col-md-4 col-sm-4">
                          <FormControl
                            className="form-control my-1"
                            label={"Location"}
                            name="eve_location"
                            control="input3"
                            placeholder=" Default Location for Appointments"
                          />
                        </div>
                      </div>
                      <div className="row">
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
                        {allDayEventChecked ? '' : <div className="col-md-2 col-sm-6">
                          <div className="form-group my-2 time-picker">
                            <label htmlFor={"date"}><b>Time</b></label>
                            <br />
                            <AntdTimePicker
                              onChange={handleCustomEventTime}
                              value={showStartTime}
                            />
                          </div>
                        </div>}
                        <div className="col-md-2 col-sm-6">
                          <div className="form-group my-2 time-picker">
                            <label htmlFor={"date"}><b>End Date</b></label>
                            <AntdDatePicker
                              defaultVal={showEndDate}
                              onChange={handleEndDate}
                            />
                          </div>
                        </div>
                        {allDayEventChecked ? '' : <div className="col-md-2 col-sm-6">
                          <div className="form-group my-2 time-picker">
                            <label htmlFor={"date"}><b>Time</b></label>
                            <br />
                            <AntdTimePicker
                              value={showEndTime}
                              onChange={handleEndTime}
                            />
                          </div>
                        </div>}
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group my-2">
                            <label>Event TitleT. Zone</label>
                            <Dropdown5
                              list={timeZone}
                              changes={(value) => handleTimeZone(value)}
                              selected={practiceName}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
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
                        <div className="col-md-6 mt-1">
                          <div className="form-group">
                            <CreateCustomEvent
                              setCustomEvent={setCustomEvent}
                              setRepeat={setRepeat}
                              setPeriod={setPeriod}
                              setChecked={setChecked}
                              dateData={showCustomEventDate}
                              setOccurrences={setOccurrences}
                              setOnDate={setOnDate}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-2 col-sm-12">
                          <SwitchButton
                            options={datass.priv}
                            label="Public"
                            MainLabel={"Privacy"}
                            name={"eve_privacy"}
                          />
                        </div>
                        <div className="col-md-2 col-sm-12">
                          <SwitchButton
                            options={datass.Visibility}
                            label="Visibility"
                            MainLabel={"Visibility"}
                            name={"eve_visibility"}
                          />
                        </div>
                        <div className="col-md-8 col-sm-12">
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
                        </div>
                        {/* <FormControl
                          className="form-control my-1"
                          label={"Description"}
                          name="eve_description"
                          row={20}
                          control="textarea"
                          placeholder="Here can be your description"
                        /> */}
                        {/* <div className="col-12 mt-2">
                          <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={handleEditorChange}
                          />
                        </div> */}
                        <div className="col-md-12 form-group my-2">
                          <b className="my-2">Description</b>
                          <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={handleEditorChange}
                            id={'description'}
                          />
                        </div>

                        <div className="d-flex mt-3 col-lg-12 align-items-start">
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
                                              className=" btn btn-danger py-2 removenoti"
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
                        </div>
                        <br />
                        <br />
                        <h6>
                          <b>Members</b>
                        </h6>
                        <div id="memappe">
                          {AllMember.map((item, index) => {
                            return (
                              <div className="row m-0 col-12 p-0" key={index}>
                                <div className="col-md-8 calenderselected calenderselected2 my-2">
                                  <SelectSearch
                                    selected={item.membersearch}
                                    changess={(item) =>
                                      handleMemberPeriod2(item, index)
                                    }
                                  />
                                </div>
                                <div className="col-md-4">
                                  <span className="form-group d-flex m-0 gap-1">
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
                                          className="my-2 btn btn-primary mb-2"
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
                                          className="my-2 btn btn-danger mb-2"
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
                      </div>
                      <hr />
                      <SubmitButton
                        props={submitbutton}
                        buttonLoading={res.isLoading}
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
export default NewEvent;