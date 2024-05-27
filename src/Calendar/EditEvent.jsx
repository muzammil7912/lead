import { Formik, Form, Field } from "formik";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import dayjs from "dayjs";
import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
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
import useFetch from "../customHooks/useFetch";
import { useParams } from "react-router-dom";
import Dropdown5 from "../components/form/Dropdown5";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import config from "../services/config.json";
import AntdDatePicker from "./components/AntdDatePicker";
import Modal from 'react-bootstrap/Modal';
import Checkbox from "../components/form/Checkbox";
import AntdTimePicker from "./components/AntdTimePicker";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import EditCustomEvent from "./EditCustomEvent";
import { MainCalenderIdContext } from "../context/MainCalenderIdContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";

dayjs.extend(utc);
dayjs.extend(timezone);

function EditEvent() {
  // variable 
  const { calendarId } = useContext(MainCalenderIdContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);

  let rel = ["contact", "opportunity", "user", "project", "meeting"];
  let array = ["meeting", "action", "follow_up"];
  let array2 = ["meeting", "action", "follow_up", "reminder", "out_of_office"];
  const [getEventData, setGetEventData] = useState()
  const [resGet, apiMethodGet] = usePost();
  const { id } = useParams();
  let parentId = localStorage.getItem("parentId")
  let ChildId = localStorage.getItem("ChildId");
  const isComponentMounted = useRef(true);
  useEffect(() => {
    if (isComponentMounted.current) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let formData = new FormData();
      formData.append("id", id);
      formData.append("child_id", ChildId);
      formData.append("parent_id", parentId);
      formData.append("timezone", timeZone);
      apiMethodGet("postInstanceByEvent", formData)
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [])

  useEffect(() => {
    if (resGet.data) {
      setGetEventData(resGet.data)
    }
  }, [resGet.data])


  // context 
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { addHeading } = useContext(MainHeadingContext);
  // getapi
  const { data: timeZone, loading2 } = useFetch("", "getListTimeZone");
  const { data: getCalenderData, loadind1 } = useFetch("", `getAllCalendars`);
  // const { data: getEventData, loading, error } = useFetch("", `getInstanceByEvent/${id}&parent_id=${parent_id}&child_id=${ChildId}`);
  //  postaapi

  const [res, apiMethod] = usePost();
  const [resAction, apiMethodAction] = usePost();
  const [resRelated, apiMethodRelated] = usePost();
  const [postType, apiMethodPostType] = usePost();
  const [postType2, apiMethodPostType2] = usePost();
  const [postPipeline, apiMethodPostPipeline] = usePost();
  const [postPipeline2, apiMethodPostPipeline2] = usePost();

  // state 
  const [childfunc, setChildFunc] = useState(false);
  const [handleFirstOption, setHandleFirstOption] = useState(false)
  const [dateForHandleSubmit, setDateForHandleSubmit] = useState('')
  const [checkTrue, setCheckTrue] = useState(true)
  const [allDayEventChecked, setAllDayEventChecked] = useState(false)
  const [pipelinesSelect, setPipelinesSelect] = useState([])
  const [StageSelect, setStageSelect] = useState([])
  const [occurrences, setOccurrences] = useState(10)
  const [types, setTypes] = useState("");
  const [severityList, setSeverityList] = useState('');
  const [pipelineValue, setPipelineValue] = useState('');
  const [image, setImage] = useState("");
  const [relatedtoVal, setRelatedtoVal] = useState("");
  const [relatedVal, setRelatedVal] = useState("");
  const [ActionVal, setActionVal] = useState("");
  const [related, setRelated] = useState('');
  const [actioned, setActioned] = useState('');
  const [stageValue, setStageValue] = useState('');
  const [severityValue, setSeverityValue] = useState('');
  const [repeat, setRepeat] = useState("");
  const [period, setPeriod] = useState("");
  const [seriName, setseriName] = useState("");
  const [severityLabel, setSeverityLabel] = useState("");
  const [checked, setChecked] = useState("never");
  const [hexCodeDefault, sethexCodeDefault] = useState("");
  const [piplinesvari, setPiplinesvari] = useState("");
  const [Voted, setVoted] = useState("");
  const [canBeVoted, setCanBeVoted] = useState("");
  const [practiceName, setPracticeName] = useState('');
  const [customEventDate, setCustomEventDate] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [defaultCustomDate, setDefaultCustomDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [show, setShow] = useState(false);
  const [calender, setCalender] = useState('');
  const [showCustomEventDate, setShowCustomEventDate] = useState('');
  const [showEndDate, setShowEndDate] = useState('');
  const [showStartTime, setShowStartTime] = useState('');
  const [showEndTime, setShowEndTime] = useState('');
  const [content, setContent] = useState("");
  const [onDate, setOnDate] = useState('')
  const [Module, setModule] = useState();
  const [ACL_Module, SetACL_Module] = useState();
  const [Uploadbtn_handler, setUploadbtn_handler] = useState();
  const [NotificationArr, setNotificationArr] = useState([
    {
      notify_db_id: "1",
      notify_type: "notification",
      notify_interval: "10",
      notify_period: "minutes",
    },
  ]);
  const [AllMember, setAllMember] = useState([
    {
      id: "1",
      membersearch: "",
      ev_members: "",
    },
  ]);
  const [CustomEvent, setCustomEvent] = useState({
    firstValue: "",
    secondValue: "",
    label: "",
  });
  const [StageCheck, setStageCheck] = useState();
  useEffect(() => {

    if (types === "meeting") {
      setStageCheck(leadPermission?.super_admin || leadPermission?.meeting?.fields?.meetings_priority)
    }
    else if (types === "action") {
      setStageCheck(leadPermission?.super_admin || leadPermission?.action?.fields?.actions_priority)
    }
    else if (types === "follow_up") {
      setStageCheck(leadPermission?.super_admin || leadPermission?.follow_up?.fields?.followups_severity)
    }
    else if (types === "event") {
      setStageCheck(leadPermission?.super_admin || leadPermission?.event?.fields?.event_priority)
    }
    else if (types === "reminder") {
      setStageCheck(leadPermission?.super_admin || leadPermission?.reminder?.fields?.reminder_priority)
    }
    else if (types === "out_of_office") {
      setStageCheck(leadPermission?.super_admin || leadPermission?.out_of_office?.fields?.out_of_office_priority)
    }
  }, [types])


  const handleChecked = () => {
    setAllDayEventChecked(!allDayEventChecked)
    setShowCustomEventDate(showCustomEventDate)
    setShowEndDate(showEndDate)
    setShowStartTime(showStartTime)
    setShowEndTime(showEndTime)
  }

  useEffect(() => {
    if (getEventData && !getEventData.message) {
      addHeading("Calendar")
      let eventData = getEventData?.lead_calnedar_events?.[0]
      const formdata = new FormData();
      formdata.append("q", "");
      formdata.append("related", eventData?.related_to);
      formdata.append("event_create", "general_event_create_query");
      apiMethodRelated("postSearchEventsModuleRelated", formdata);
      if (eventData?.all_day_recurrence === '1') {
        const currTime = dayjs().format('HH:mm:ss')
        const ShowStartTime1 = dayjs(`${eventData?.start_date} ${currTime}`)
        const ShowEndTime1 = dayjs(`${eventData?.end_date} ${currTime}`)
        setShowCustomEventDate(ShowStartTime1)
        setShowEndDate(ShowEndTime1.add(1, 'hour'))
        setShowStartTime(ShowStartTime1)
        setShowEndTime(ShowEndTime1.add(1, 'hour'))
        setDateForHandleSubmit(eventData?.start_date)
      }
      else {
        const ShowStartTime1 = dayjs(`${eventData?.start_date} ${eventData?.start_date_time}`, 'YYYY-MM-DD HH:mm:ss')
        const ShowEndTime1 = dayjs(`${eventData?.end_date} ${eventData?.end_date_time}`, 'YYYY-MM-DD HH:mm:ss')
        setShowCustomEventDate(ShowStartTime1)
        setShowEndDate(ShowEndTime1)
        setShowStartTime(ShowStartTime1)
        setShowEndTime(ShowEndTime1)
        setDateForHandleSubmit(eventData?.start_date)
      }
      setPipelineValue(eventData?.event_pipeline)
      setContent(eventData?.event_description)
      setStageValue(eventData?.event_pipeline_stage)
      setTypes(eventData?.event_type);
      sethexCodeDefault(eventData?.color_code ?? "#000000");
      setCanBeVoted(eventData?.event_type);
      setRelatedtoVal(eventData?.related_to);
      setPracticeName(eventData?.time_zone)
      setImage(`${eventData?.event_feature_image}`)
      setSeverityValue(eventData?.priority)
      setRelatedVal(eventData?.related_to_id)
      setActionVal(eventData?.has_dependency_actions)
      setVoted(eventData?.vote_status)
      setDefaultCustomDate(eventData?.event_recurrence_text)
      setCalender(eventData?.event_calendar_id)
      setAllDayEventChecked(eventData?.all_day_recurrence === '1' ? true : false)
      setModule(eventData.event_type)
      setCustomEvent({ ...CustomEvent, firstValue: eventData?.all_day_recurrence_type })
      setNotificationArr(Array.isArray(getEventData?.eventNotification) ? getEventData?.eventNotification.map((item, index) => ({
        notify_db_id: item?.notify_db_id,
        notify_type: item?.event_notification_type,
        notify_interval: item?.event_notification_interval,
        notify_period: item?.event_notification_period
      })) : [{
        notify_db_id: "1",
        notify_type: "notification",
        notify_interval: "10",
        notify_period: "minutes",
      }])
      setAllMember((Array.isArray(getEventData?.event_members) && getEventData?.event_members.length) ? getEventData?.event_members.map((item, index) => ({
        id: item?.id ? item?.id : '1',
        membersearch: item?.id,
        ev_members: item?.type,
      })) : [
        {
          id: "1",
          membersearch: "",
          ev_members: "guests",
        },
      ])
      if (eventData?.event_type === 'follow_up') {
        setSeverityLabel('Severity')
      }
      else {
        setSeverityLabel("Priority")
      }
      let formData = new FormData();
      formData.append("event_type", eventData?.event_type);
      formData.append("pipeline_id", eventData?.event_pipeline);
      apiMethodPostType2("postPiplineEventStatus", formData);
    }
  }, [getEventData]);


  // useEffect(() => {
  //   let eventData = getEventData?.lead_calnedar_events?.[0]
  //   if (eventData?.custom_recurrence_ends_type === 'on') {
  //     if (eventData?.custom_recurrence_ends_type_value === onDate.format('YYYY-MM-DD')) {
  //       setHandleFirstOption(true)
  //     }
  //     else {
  //       setHandleFirstOption(false)
  //     }
  //   }
  //   if (eventData?.custom_recurrence_ends_type !== checked) {
  //     setHandleFirstOption(false)
  //   }
  // }, [onDate, checked])


  useEffect(() => {
    if (postType2?.data) {
      setPipelinesSelect(postType2?.data?.pipelines)
      let formData = new FormData();
      formData.append('event_type', types)
      formData.append('pipeline_id', pipelineValue)
      apiMethodPostPipeline("postPiplineEventStatus", formData);
      if (Array.isArray(postType2?.data?.priorities)) {
        setSeverityList(postType2?.data?.priorities)
      }
      else if (Array.isArray(postType2?.data?.severities)) {
        setSeverityList(postType2?.data?.severities)
      }
    }

  }, [postType2?.data])
  useEffect(() => {
    if (postType?.data) {
      setPipelinesSelect(postType?.data?.pipelines)
      let formData = new FormData();
      formData.append('event_type', types)
      formData.append('pipeline_id', postType?.data?.pipelines?.[0]?.db_id)
      apiMethodPostPipeline("postPiplineEventStatus", formData);
      if (Array.isArray(postType?.data?.priorities)) {
        setSeverityList(postType?.data?.priorities)
        setSeverityValue(postType?.data?.priorities?.[0]?.priority_id)
      }
      else if (Array.isArray(postType?.data?.severities)) {
        setSeverityList(postType?.data?.severities)
        setSeverityValue(postType?.data?.severities?.[0]?.severity_id)
      }
    }

  }, [postType?.data])

  // FUNCTION FOR HANDLE AND POST THE VALUE PIPELINE AND GET THE VALUE OF STAGELIST --->
  function handleTypeValue(item) {
    setModule(item)
    setTypes(item);
    let formData = new FormData();
    formData.append("event_type", item);
    apiMethodPostType("postPiplineEventStatus", formData);
    setCalender(getCalenderData?.[0]?.cl_db_did)
    sethexCodeDefault(getCalenderData?.[0]?.calendar_color)
    if (item === 'follow_up') {
      setSeverityLabel('Severity')
    }
    else {
      setSeverityLabel("Priority");
    }
  }
  const handlePipelineValue = (event) => {
    setPipelineValue(event.target.value);
    setCanBeVoted(event.target.getAttribute("voted"));
    setCanBeVoted(event.target.options[event.target.selectedIndex].getAttribute("voted"));
    let formData = new FormData();
    formData.append("event_type", types);
    formData.append("pipeline_id", event.target.value);
    apiMethodPostPipeline("postPiplineEventStatus", formData);
    setStageValue("")
  };

  // UESEFFECT FOR SET THE VALUE OF STAGE ---->

  useEffect(() => {
    if (postPipeline?.data) {
      setStageSelect(postPipeline?.data?.stages)
      if (stageValue === "") {
        setStageValue(postPipeline?.data?.stages?.[0]?.id)
      }
    }
  }, [postPipeline?.data])



  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleCalender = (event) => {
    setCalender(event.target.value)
    sethexCodeDefault(getCalenderData.filter((item) => item.cl_db_did === event.target.value)[0].calendar_color)
  }

  const list = [
    { label: "System Notification", value: "system_notification" },
    { label: "SMS", value: "sms" },
    { label: "eMail", value: "email" },
  ];

  useEffect(() => {
    if (Module) {
      console.log(Module);
      if (Module == "action") {
        SetACL_Module("actions")
      }
      else if (Module == "follow_up") {
        SetACL_Module("followups")
      }
      else if (Module == "meeting") {
        SetACL_Module("meetings")
      }
      else if (Module == "calendar") {
        SetACL_Module("calendar")
      }
      else if (Module == "event") {
        SetACL_Module("event")
      }
      else if (Module == "reminder") {
        SetACL_Module("reminder")
      }
      else if (Module == "out_of_office") {
        SetACL_Module("out_of_office")
      }
    }

  }, [Module]);

  // useEffect(() => {
  //   if (leadPermission) {
  //     // if (leadPermission?.[Module]?.fields?.[`${ACL_Module}_feature_image`] === "true") {

  //     // }
  //     console.log(leadPermission?.[Module]?.fields?.[`${ACL_Module}_feature_image`]);
  //     setUploadbtn_handler("notshowbtn")
  //   }
  // }, [leadPermission]);







  const handleTimeZone = (item) => {
    setPracticeName(item);
  };


  function handleSubmit(values) {

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
        if (item === "eve_google_meet") {
          values[item] === true
            ? formdata.append(item, "1")
            : formdata.append(item, "0");
        }
        else {
          formdata.append(item, values[item]);
        }
      }
      NotificationArr.map((item, index) => {
        formdata.append(`notify_type[]`, item.notify_type);
        formdata.append(`notify_interval[]`, item.notify_interval);
        formdata.append(`notify_period[]`, item.notify_period);
        formdata.append(`notify_id[]`, item.notify_db_id);
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
        formdata.append("pipeline", pipelineValue);
        formdata.append("stage", stageValue);
        if (seriName == "Severities") {
          formdata.append("severity", severityValue);
        } else {
          formdata.append("priority", severityValue);
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
      formdata.append('child_id', ChildId)
      formdata.append('id', id)
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
      formdata.append("eve_description", content);
      formdata.append('eve_all_day_repeat', CustomEvent.firstValue)
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      formdata.append("timezone", timeZone);
      apiMethod("postUpdateInstance", formdata);
      // resetForm()

    }
  }

  useEffect(() => {
    if (res?.data) {
      toast.success(res?.data?.message)
      window.location.reload(true);
    }
  }, [res?.data])


  const [submitbuttons, setSubmitbuttons] = useState(false);
  useEffect(() => {
    if (res.data && !res.isLoading) {
      setSubmitbuttons(true);
      setCanBeVoted("");
    }
  }, [res.data]);

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
        value: "guests",
        label: "Guest",
      },
      {
        value: "member",
        label: "Member",
      },
      {
        value: "followers",
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
    setRelatedVal("")
    setRelatedtoVal(v.target.value)
    const formdata = new FormData();
    formdata.append("q", "");
    formdata.append("related", v.target.value);
    formdata.append("event_create", "general_event_create_query");
    // formdata.append("event_create", "c6b8fe2e28ef3d8bf1481bf81f2f98d7")
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
    // formdata.append("event_action_sr", "682ef5ba5b2d567191c4c3703f7f1fab")
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

  const handleColorChange = (event) => {
    // colorChangeRef2.current.value = colorChangeRef.current.value;
    sethexCodeDefault(event.target.value);
  };

  const handleNotificationAdd = useCallback((item) => {
    let adjusteds = NotificationArr.length;
    let adjustedss = parseInt(NotificationArr[adjusteds - 1].notify_db_id);
    setNotificationArr([
      ...NotificationArr,
      {
        notify_db_id: `${++adjustedss}`,
        notify_type: "notification",
        notify_interval: "10",
        notify_period: "minutes",
      },
    ]);
  });

  const handelMemberAdd = useCallback((item, index) => {
    let adjusteds = AllMember.length;
    let adjustedss = parseInt(AllMember[adjusteds - 1].id);
    setAllMember([
      ...AllMember,
      {
        id: `${++adjustedss}`,
        membersearch: "",
        ev_members: "guests",
      },
    ]);
  });

  const handleNotificationRemove = useCallback((item) => {
    setNotificationArr();
    setNotificationArr(NotificationArr.filter((ite) => ite.notify_db_id !== item.notify_db_id));
  });

  const handelMemberRemove = useCallback((item) => {
    setAllMember(AllMember.filter((ite) => ite.id !== item.id));
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
  if (!getEventData || loading2 || !timeZone || loadind1 || postType2?.isLoading) return <Loader />;
  let da = getEventData?.lead_calnedar_events?.[0];
  const initialValues = {
    eve_name: da?.event_title,
    eve_calendar: da?.event_calendar_id,
    eve_location: da?.location,
    // eve_all_day: da?.all_day_recurrence,
    eve_notification_meet: da?.enable_notifications,
    eve_privacy: da?.event_privacy,
    eve_visibility: da?.event_visibility,
    eve_google_meet: da?.event_meet_room,
    eve_url: da?.event_meeting_platform_url,
    eve_description: da?.event_description,
    eve_depenency: da?.has_dependency,
    eve_meeting_platform: da?.event_meeting_platform,
    option: 'all_event',
    // eve_all_day_repeat: da?.
  };


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
    setDateForHandleSubmit(value.tz(practiceName).format('YYYY-MM-DD'))
    if (value > dayjs(showEndDate)) {
      setShowEndTime(dayjs(value).add(1, 'hour'))
      setShowEndDate(dayjs(value).add(1, 'hour'))
    }
    setChildFunc(true)
  }

  const handleEndDate = (value) => {
    setShowEndDate(value)
    setShowEndTime(value)
    if (value < dayjs(showCustomEventDate)) {
      setShowStartTime(dayjs(value).subtract(1, 'hour'))
      setShowCustomEventDate(dayjs(value).subtract(1, 'hour'))
    }
    setChildFunc(true)
  }
  const handleCustomEventTime = (value) => {
    setShowStartTime(value)
    setShowCustomEventDate(value)
    setShowEndTime(dayjs(value).add(change, 'minute'))
    setShowEndDate(dayjs(value).add(change, 'minute'))
    setChildFunc(true)
  }

  const handleEndTime = (value) => {
    change = value.diff(showStartTime, 'minute')
    setShowEndTime(value)
    setShowEndDate(value)
    if (value.add(-15, 'minute') < dayjs(showEndTime)) {
      setShowStartTime(dayjs(value).subtract(1, 'hour'))
      setShowCustomEventDate(dayjs(value).subtract(1, 'hour'))
    }
    setChildFunc(true)
  }
  const timeList = [
    { label: "Minute", value: "minute" },
    { label: "Hour", value: "hour" },
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
  ];

  const handleClose = () => setShow(false);
  const handleShow = (event, values) => {
    event.preventDefault()
    if (getEventData?.lead_calnedar_events?.[0]?.all_day_recurrence_type === 'do_not_repeat') {
      handleSubmit(values)
    }
    // else if (handleFirstOption && getEventData?.lead_calnedar_events?.[0]?.start_date === dateForHandleSubmit) {
    //   // handleSubmit(values)
    // }
    else {
      setShow(true)
    }
  };

  return (
    getEventData && !getEventData.message && da && (
      <div className="CreateAction">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card borderblue">
                <div className="card-header">
                  <h3 className="card-title">Edit Event</h3>
                </div>
                <div className="card-body">
                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values }) => (<Form name="myForm">

                      <Modal
                        show={show}
                        onHide={handleClose}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <div className="modal-header d-flex justify-content-between">
                          <div className="left">
                            <h5 className="modal-title" id="askmodalTitle">
                              Edit recurring event
                            </h5>
                          </div>
                        </div>

                        <div className="modal-body">
                          <div className="row">
                            {<div className="col-lg-12" id="this_only_rdBtn">
                              <label className="custom-control custom-radio mgtf">
                                <Field
                                  type="radio"
                                  name="option"
                                  value="this_event"
                                />
                                <div className="custom-control-label">This event</div>
                              </label>
                            </div>}
                            <div className="col-lg-12" id="this_and_following_rdBtn">
                              <label className="custom-control custom-radio mgtf">
                                <Field
                                  type="radio"
                                  name="option"
                                  value="this_and_following"
                                />
                                <div className="custom-control-label">This and following events</div>
                              </label>
                            </div>
                            {getEventData?.lead_calnedar_events?.[0]?.start_date === dateForHandleSubmit ? <div className="col-lg-12" id="all_event_rdBtn">
                              <label className="custom-control custom-radio mgtf">
                                <Field type="radio" name="option" value="all_event" />
                                <div className="custom-control-label">All events</div>
                              </label>
                            </div> : ''}
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button onClick={handleClose} type="button" className="btn btn-secondary" data-dismiss="modal">
                            Close
                          </button>
                          <button type="submit" onClick={() => handleSubmit(values)} className="btn btn-info askRadio_okay">
                            Okay
                          </button>
                        </div>
                      </Modal>
                      {/* <Modal
                        show={false}
                        onHide={handleClose}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <div className="modal-header d-flex justify-content-between">
                          <div className="left">
                            <h5 className="modal-title" id="askmodalTitle">
                              Edit recurring event
                            </h5>
                          </div>
                        </div>

                        <div className="modal-body">
                          <div className="row">
                            <div className="col-lg-12" id="this_only_rdBtn">
                              <label className="custom-control custom-radio mgtf">
                                <Field
                                  type="radio"
                                  name="option"
                                  value="this_event"
                                />
                                <div className="custom-control-label">This event</div>
                              </label>
                            </div>
                            <div className="col-lg-12" id="this_and_following_rdBtn">
                              <label className="custom-control custom-radio mgtf">
                                <Field
                                  type="radio"
                                  name="option"
                                  value="this_and_following"
                                />
                                <div className="custom-control-label">This and following events</div>
                              </label>
                            </div>
                            <div className="col-lg-12" id="all_event_rdBtn">
                              <label className="custom-control custom-radio mgtf">
                                <Field type="radio" name="option" value="all_event" />
                                <div className="custom-control-label">All events</div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button onClick={handleClose} type="button" className="btn btn-secondary" data-dismiss="modal">
                            Close
                          </button>
                          <button type="submit" onClick={() => handleSubmit(values)} className="btn btn-info askRadio_okay">
                            Okay
                          </button>
                        </div>
                      </Modal> */}
                      <div className="row">
                        {/* <div className="col-md-5 col-sm-12">
                          <FormControl
                            className="form-control my-1"
                            label={"Event Title"}
                            name="eve_name"
                            control="input3"
                            placeholder=" Event Title"
                          />
                        </div> */}
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_title`] ===
                            "true") ?
                            <div className="col-md-5 col-sm-12">
                              <FormControl
                                className="form-control my-1"
                                label={"Event Title"}
                                name="eve_name"
                                control="input3"
                                placeholder=" Event Title"
                              />
                            </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_title`] === "-1" &&
                            < div className="col-md-5 col-sm-12">
                              <div className="form-group my-2">
                                <FormControl
                                  className="form-control my-1"
                                  label={"Event Title"}
                                  name="eve_name"
                                  control="input3"
                                  placeholder=" Event Title"
                                  disabled
                                />
                              </div>
                            </div>
                        }
                        <div className="col-md-2 col-sm-12">
                          <div className="form-group my-2">
                            {
                              <FormControl
                                className="form-control my-1"
                                selectList={typess}
                                label={Translation(translations, `${"Type"}`)}
                                name={"eve_type"}
                                control="select"
                                value={types}
                                onChange={event => handleTypeValue(event.target.value)}
                              />
                            }
                          </div>
                        </div>
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_calendar`] ===
                            "true") ?
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
                            </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_calendar`] === "-1" &&
                            <div className="col-md-2">
                              <div className="form-group my-2">
                                <FormControl
                                  className="form-control my-1"
                                  selectList={getCalenderData}
                                  label={Translation(translations, `${"Calendar"}`)}
                                  name={"eve_calendar"}
                                  control="select_custom_options"
                                  custom_label_name="calendar_name"
                                  customer_value_name="cl_db_did"
                                  value={calender}
                                  disabled
                                />
                                {/* <br />
                                {(getCalenderData.filter((CalenderData) => CalenderData.cl_db_did == initialValues.eve_calendar))[0]?.calendar_name} */}
                              </div>
                            </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_color`] ===
                            "true") ?
                            <div className="col-md-3">
                              <div className="form-group bokable my-2">
                                <label className="">HEX CODE</label>
                                <div className="input-group my-1">
                                  <input
                                    value={hexCodeDefault}
                                    type="text"
                                    className="form-control inputV"
                                    name="eve_color"
                                    onChange={event => sethexCodeDefault(event.target.value)}
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
                            </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_color`] === "-1" &&
                            <div className="col-md-2">
                              <div className="form-group my-2">
                                <label className="form-label mb-3">
                                  {Translation(
                                    translations,
                                    "HEX CODE"
                                  )}
                                </label>
                                <input
                                  type="color"
                                  className="inputColor"
                                  value={hexCodeDefault}
                                  disabled
                                />
                              </div>
                            </div>
                        }
                      </div>
                      {
                        array.includes(types) && (
                          <div className="row">
                            {
                              leadPermission?.super_admin ||
                                leadPermission?.[Module]?.fields?.[`${ACL_Module}_pipeline`] ===
                                "true" ?
                                <div className="col-md-4 col-sm-4">
                                  <div className="form-group my-2">
                                    <label htmlFor="pipeline">
                                      <b>Pipeline</b>
                                    </label>
                                    <select
                                      className="form-control"
                                      value={pipelineValue}
                                      name="pipeline"
                                      id="pipeline"
                                      onChange={event => handlePipelineValue(event)}
                                    >
                                      {Array.isArray(pipelinesSelect) &&
                                        pipelinesSelect.map((item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              voted={item.can_be_voted}
                                              value={item.db_id}
                                            >
                                              {item.pipeline_title}
                                            </option>
                                          );
                                        }
                                        )}
                                    </select>
                                  </div>
                                </div> :
                                leadPermission?.[Module]?.fields?.[`${ACL_Module}_pipeline`] === "-1" &&
                                // <div className="col-md-4 col-sm-4">
                                //   <div className="form-group my-2">
                                //     <label htmlFor="pipeline">
                                //       <b>Pipeline</b>
                                //     </label>
                                //     <br />
                                //     {(pipelinesSelect.filter((pipeline) => pipeline.db_id == pipelineValue))[0]?.pipeline_title}
                                //   </div>
                                // </div>
                                <div className="col-md-4 col-sm-4">
                                  <div className="form-group my-2">
                                    <label htmlFor="pipeline">
                                      <b>Pipeline</b>
                                    </label>
                                    <select
                                      className="form-control"
                                      value={pipelineValue}
                                      name="pipeline"
                                      id="pipeline"
                                      disabled
                                    >
                                      {Array.isArray(pipelinesSelect) &&
                                        pipelinesSelect.map((item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              voted={item.can_be_voted}
                                              value={item.db_id}
                                            >
                                              {item.pipeline_title}
                                            </option>
                                          );
                                        }
                                        )}
                                    </select>
                                  </div>
                                </div>
                            }
                            {leadPermission?.super_admin ||
                              leadPermission?.[Module]?.fields?.[`${ACL_Module}_stage`] ===
                              "true" ?
                              <div className="col-md-4 col-sm-4">
                                <FormControl
                                  className="form-control"
                                  label={"Stage"}
                                  name="stage"
                                  control="select_custom_options"
                                  custom_label_name="name"
                                  customer_value_name="id"
                                  value={stageValue}
                                  selectList={StageSelect}
                                  onChange={event => setStageValue(event.target.value)}
                                />
                              </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_stage`] === "-1" &&
                              // <div className="col-md-4 col-sm-4">
                              //   <label className="form-label mb-3">
                              //     {Translation(
                              //       translations,
                              //       "Stage"
                              //     )}
                              //   </label>
                              //   {(StageSelect.filter((StageSelect) => StageSelect.id == stageValue))[0]?.name}
                              // </div>
                              <div className="col-md-4 col-sm-4">
                                <FormControl
                                  className="form-control"
                                  label={"Stage"}
                                  name="stage"
                                  control="select_custom_options"
                                  custom_label_name="name"
                                  customer_value_name="id"
                                  value={stageValue}
                                  selectList={StageSelect}
                                  disabled
                                />
                              </div>
                            }
                            {
                              StageCheck === "true" ?
                                <div className="col-md-4 col-sm-4">
                                  <div className="form-group my-2">
                                    <label>
                                      <b>{severityLabel}</b>
                                      <span className="text-danger"></span>
                                    </label>
                                    <select
                                      className="form-control"
                                      value={severityValue}
                                      name={seriName.toLowerCase()}
                                      id={seriName.toLowerCase()}
                                      onChange={event => setSeverityValue(event.target.value)}
                                    >
                                      {
                                        severityList &&
                                        severityList.map((item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={item[`${severityLabel.toLowerCase()}_id`]}
                                            >
                                              {item[`${severityLabel.toLowerCase()}_label`]}
                                            </option>
                                          );
                                        })
                                      }
                                    </select>
                                  </div>
                                </div> : StageCheck === "-1" &&
                                // < div className="col-md-4 col-sm-4">
                                //   <div className="form-group my-2">
                                //     {(severityList && severityList.filter((severityList) => severityList.priority_id == severityValue))[0]?.priority_label &&
                                //       <>
                                //         <label className="form-label mb-3">
                                //           {Translation(
                                //             translations,
                                //             `${severityLabel}`
                                //           )}
                                //         </label>
                                //         <p>
                                //           {(severityList && severityList.filter((severityList) => severityList.priority_id == severityValue))[0]?.priority_label}
                                //         </p>
                                //       </>
                                //     }
                                //   </div>
                                // </div>
                                <div className="col-md-4 col-sm-4">
                                  <div className="form-group my-2">
                                    <label>
                                      <b>{severityLabel}</b>
                                      <span className="text-danger"></span>
                                    </label>
                                    <select
                                      className="form-control"
                                      value={severityValue}
                                      name={seriName.toLowerCase()}
                                      id={seriName.toLowerCase()}
                                      disabled
                                    >
                                      {
                                        severityList &&
                                        severityList.map((item, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={item[`${severityLabel.toLowerCase()}_id`]}
                                            >
                                              {item[`${severityLabel.toLowerCase()}_label`]}
                                            </option>
                                          );
                                        })
                                      }
                                    </select>
                                  </div>
                                </div>
                            }
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
                          {
                            (leadPermission?.super_admin ||
                              leadPermission?.[Module]?.fields?.[`${ACL_Module}_related_to`] ===
                              "true") ?
                              <div className="row">
                                <div className="col-md-4 col-sm-4">
                                  <FormControl
                                    className="form-control my-1"
                                    name="eve_related_to"
                                    control="select_custom_options"
                                    custom_label_name="label"
                                    customer_value_name="value"
                                    selectList={
                                      datass.eve_related_to &&
                                      datass.eve_related_to
                                    }
                                    value={relatedtoVal}
                                    onChange={(v) => handleSearchRelated(v)}
                                  />
                                </div>
                                <div className="col-md-8 col-sm-8 mt-2 calenderselected">
                                  <Select
                                    showSearch={true}
                                    disabled={!rel.includes(relatedtoVal)}
                                    filterOption={false}
                                    style={{
                                      width: "100%",
                                    }}
                                    // onSearch={(v) => {
                                    //   handleSearchRelated(v);
                                    // }}
                                    placeholder="Search for --Module Related to --"
                                    onChange={(v1, v2) => {
                                      setRelatedVal(v1);
                                    }}
                                    options={related}
                                    value={relatedVal}
                                  />
                                </div>
                              </div>
                              : leadPermission?.[Module]?.fields?.[`${ACL_Module}_related_to`] === "-1" &&
                              // <div className="row">
                              //   <div className="col-md-4 col-sm-4">
                              //     {/* <label className="form-label mb-3">
                              //       {Translation(
                              //         translations,
                              //         `Related To :`
                              //       )}
                              //     </label>
                              //     <p>
                              //       {relatedtoVal}
                              //     </p> */}
                              //     <FormControl
                              //       className="form-control my-1"
                              //       name="eve_related_to"
                              //       control="select_custom_options"
                              //       custom_label_name="label"
                              //       customer_value_name="value"
                              //       selectList={
                              //         datass.eve_related_to &&
                              //         datass.eve_related_to
                              //       }
                              //       value={relatedtoVal}
                              //       disabled
                              //     />
                              //     <Select
                              //       showSearch={true}
                              //       filterOption={false}
                              //       style={{
                              //         width: "100%",
                              //       }}
                              //       // onSearch={(v) => {
                              //       //   handleSearchRelated(v);
                              //       // }}
                              //       placeholder="Search for --Module Related to --"
                              //       options={related}
                              //       value={relatedVal}
                              //       disabled
                              //     />
                              //   </div>
                              //   <div className="col-md-8 col-sm-8 mt-2 calenderselected">
                              //     <p className="mt-4">
                              //       {(related && related.filter((related) => related.value == relatedVal))[0]?.label}
                              //     </p>
                              //   </div>
                              // </div>
                              <div className="row">
                                <div className="col-md-4 col-sm-4">
                                  <FormControl
                                    className="form-control my-1"
                                    name="eve_related_to"
                                    control="select_custom_options"
                                    custom_label_name="label"
                                    customer_value_name="value"
                                    selectList={
                                      datass.eve_related_to &&
                                      datass.eve_related_to
                                    }
                                    value={relatedtoVal}
                                    disabled
                                  />
                                </div>
                                <div className="col-md-8 col-sm-8 mt-2 calenderselected">
                                  <Select
                                    showSearch={true}
                                    filterOption={false}
                                    style={{
                                      width: "100%",
                                    }}
                                    // onSearch={(v) => {
                                    //   handleSearchRelated(v);
                                    // }}
                                    placeholder="Search for --Module Related to --"
                                    disabled
                                    options={related}
                                    value={relatedVal}
                                  />
                                </div>
                              </div>
                          }
                          <div className="row">
                            {
                              (leadPermission?.super_admin ||
                                leadPermission?.[Module]?.fields?.[`${ACL_Module}_has_dependency`] ===
                                "true") ?
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
                                      value={ActionVal}
                                    />
                                  </div>
                                </> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_has_dependency`] === "-1" &&
                                // <div className="col-md-8 col-sm-8 calenderselected">
                                //   <label className="form-label mb-3">
                                //     {Translation(
                                //       translations,
                                //       `Has Dependency :`
                                //     )}
                                //     <span>
                                //       {(actioned && actioned.filter((actioned) => actioned.value == ActionVal))[0]?.text}
                                //     </span>
                                //   </label>
                                // </div>
                                <div className="col-md-8 col-sm-8 calenderselected">
                                  <div className="col-md-4 mt-1">
                                    <SwitchCheck
                                      options={datass.eve_depenency}
                                      label="Has Dependency"
                                      MainLabel={""}
                                      name={"eve_depenency"}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-md-8 col-sm-8 calenderselected">
                                    <Select
                                      showSearch={true}
                                      filterOption={false}
                                      style={{
                                        width: "100%",
                                      }}
                                      placeholder="Search for --Actions Related to --"
                                      disabled
                                      options={actioned && actioned}
                                      value={ActionVal}
                                    />
                                  </div>
                                </div>
                            }
                          </div>
                        </>
                      )}
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_location`] ===
                            "true") ?
                            <div className="col-md-4 col-sm-4">
                              <FormControl
                                className="form-control my-1"
                                label={"Location"}
                                name="eve_location"
                                control="input3"
                                placeholder=" Default Location for Appointments"
                              />
                            </div>
                            : leadPermission?.[Module]?.fields?.[`${ACL_Module}_location`] === "-1" &&
                            <div className="col-md-4 col-sm-4">
                              <FormControl
                                className="form-control my-1"
                                label={"Location"}
                                name="eve_location"
                                control="input3"
                                placeholder=" Default Location for Appointments"
                                disabled
                              />
                            </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_start_date`] ===
                            "true") ?
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2  time-picker">
                                <label htmlFor={"date"}><b>Start Date</b></label>
                                <br />
                                <AntdDatePicker
                                  defaultVal={showCustomEventDate}
                                  onChange={handleCustomEventDate}
                                />
                              </div>
                            </div> :
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_start_date`] === "-1" &&
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2  time-picker">
                                <label htmlFor={"date"}><b>Start Date</b></label>
                                <br />
                                <AntdDatePicker
                                  defaultVal={showCustomEventDate}
                                  disabled={true}
                                />
                                {/* {dayjs(getEventData?.start_date_time).format('DD/MM/YYYY')} */}
                              </div>
                            </div>
                        }
                        {allDayEventChecked ? '' :
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_start_date_time`] ===
                            "true") ?
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2 time-picker">
                                <label htmlFor={"date"}><b>Time</b></label>
                                <br />
                                <AntdTimePicker
                                  onChange={handleCustomEventTime}
                                  value={showStartTime}
                                />
                              </div>
                            </div>
                            : leadPermission?.[Module]?.fields?.[`${ACL_Module}_start_date_time`] === "-1" &&
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2 time-picker">
                                <label htmlFor={"date"}><b>Time</b></label>
                                <br />
                                <AntdTimePicker
                                  disabled={true}
                                  value={showStartTime}
                                />
                              </div>
                            </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_end_date`] ===
                            "true") ?
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2 time-picker">
                                <label htmlFor={"date"}><b>End Date</b></label>
                                <AntdDatePicker
                                  defaultVal={showEndDate}
                                  onChange={handleEndDate}
                                />
                              </div>
                            </div> :
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_end_date`] === "-1" &&
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2 time-picker">
                                <label htmlFor={"date"}><b>End Date</b></label>
                                <br />

                                <AntdDatePicker
                                  defaultVal={showEndDate}
                                  disabled={true}
                                />
                                {/* {dayjs(getEventData?.end_date).format('DD/MM/YYYY')} */}
                              </div>
                            </div>
                        }
                        {allDayEventChecked ? '' :
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_end_date_time`] ===
                            "true") ?
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2 time-picker">
                                <label htmlFor={"date"}><b>Time</b></label>
                                <br />
                                <AntdTimePicker
                                  value={showEndTime}
                                  onChange={handleEndTime}
                                />
                              </div>
                            </div> :
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_end_date_time`] === "-1" &&
                            <div className="col-md-2 col-sm-6">
                              <div className="form-group my-2 time-picker">
                                <label htmlFor={"date"}><b>Time</b></label>
                                <br />
                                <AntdTimePicker
                                  disabled={true}
                                  value={showEndTime}
                                // onChange={handleEndTime}
                                />
                              </div>
                            </div>
                        }
                        {allDayEventChecked ? '' :
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_time_zone`] ===
                            "true") ?
                            <div className="col-md-4">
                              <div className="form-group my-2">
                                <label>Event TitleT. Zone</label>
                                <Dropdown5
                                  list={timeZone}
                                  changes={(value) => handleTimeZone(value)}
                                  selected={practiceName}
                                />
                              </div>
                            </div> :
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_time_zone`] === "-1" &&
                            // <div className="col-md-4">
                            //   <div className="form-group my-2">
                            //     <label>Event TitleT. Zone</label>
                            //     {/* <Dropdown5
                            //       list={timeZone}
                            //       changes={(value) => handleTimeZone(value)}
                            //       selected={practiceName}
                            //     /> */}
                            //     <p className="mt-2">
                            //       {practiceName}
                            //     </p>
                            //   </div>
                            // </div>
                            <div className="col-md-4">
                              <div className="form-group my-2">
                                <label>Event TitleT. Zone</label>
                                <Dropdown5
                                  list={timeZone}
                                  changes={(value) => handleTimeZone(value)}
                                  selected={practiceName}
                                  disabled={true}
                                />
                              </div>
                            </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_all_day`] ===
                            "true") ?
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
                            </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_all_day`] === "-1" &&
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
                                      disabled
                                    />
                                    <span className="custom-switch-indicator custom-switch-indicator_new"></span>
                                    <span className="custom-switch-description">All Day Event</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_recursive_event`] === "true") ?
                            <div className="col-md-6 mt-1">
                              <div className="form-group">
                                <EditCustomEvent
                                  childfunc={childfunc}
                                  setChildFunc={setChildFunc}
                                  setCustomEvent={setCustomEvent}
                                  setRepeat={setRepeat}
                                  setPeriod={setPeriod}
                                  setChecked={setChecked}
                                  checked={checked}
                                  dateData={showCustomEventDate}
                                  defaultCustomValue={defaultCustomDate}
                                  setOccurrences={setOccurrences}
                                  setOnDate={setOnDate}
                                  dataa={da}
                                  timeZone={practiceName}
                                  setCheckTrues={setCheckTrue}
                                  setCheckTruess={checkTrue}
                                />
                              </div>
                            </div> :
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_recursive_event`] === "-1" &&
                            <div className="col-md-6 mt-1">
                              <div className="form-group">
                                <p className="recursive-disable">
                                  {da.event_recurrence_text}
                                </p>
                              </div>
                            </div>
                        }
                      </div>
                      <div className="row">
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_privacy`] === "true") ?
                            <div className="col-md-2 col-sm-12">
                              <SwitchButton
                                options={datass.priv}
                                label="Public"
                                MainLabel={"Privacy"}
                                name={"eve_privacy"}
                              />
                            </div> :
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_privacy`] === "-1" &&
                            <div className="col-md-2 col-sm-12">
                              <SwitchButton
                                options={datass.priv}
                                label="Public"
                                MainLabel={"Privacy"}
                                name={"eve_privacy"}
                                disabled
                              />
                            </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_visibility`] === "true") ?
                            <div className="col-md-2 col-sm-12">
                              <SwitchButton
                                options={datass.Visibility}
                                label="Visibility"
                                MainLabel={"Visibility"}
                                name={"eve_visibility"}
                              />
                            </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_visibility`] === "-1" &&
                            <div className="col-md-2 col-sm-12">
                              <SwitchButton
                                options={datass.Visibility}
                                label="Visibility"
                                MainLabel={"Visibility"}
                                name={"eve_visibility"}
                                disabled
                              />
                            </div>
                        }
                        {
                          (leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_google_meet`] === "true") ?
                            <div className="col-md-8 col-sm-12">
                              <div className="form-group">
                                <label>
                                  <b>Create a Google Meet room</b>
                                  <span className="text-danger" />
                                </label>
                                <Checkbox
                                  options={['Enable']}
                                  name={"eve_google_meet"}
                                  control="checkbox"
                                  values={initialValues.eve_google_meet}
                                />
                              </div>
                            </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_google_meet`] === "-1" &&
                            <div className="col-md-8 col-sm-12">
                              <div className="form-group">
                                <label>
                                  <b>Create a Google Meet room</b>
                                  <span className="text-danger" />
                                </label>
                                <Checkbox
                                  options={['Enable']}
                                  name={"eve_google_meet"}
                                  control="checkbox"
                                  values={initialValues.eve_google_meet}
                                  disabled
                                />
                              </div>
                            </div>
                        }
                        <div className="row align-items-end">
                          {
                            (leadPermission?.super_admin ||
                              leadPermission?.[Module]?.fields?.[`${ACL_Module}_google_meet`] === "true") ?
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
                              :
                              leadPermission?.[Module]?.fields?.[`${ACL_Module}_google_meet`] === "-1" &&
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
                                      disabled
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
                                      disabled
                                    />
                                  </div>
                                </div>
                              </>
                          }
                        </div>
                        {(leadPermission?.super_admin ||
                          leadPermission?.[Module]?.fields?.[`${ACL_Module}_description`] === "true") ?
                          <div className="col-md-12 form-group my-2">
                            <b className="my-2">Description</b>
                            <CKEditor
                              editor={ClassicEditor}
                              data={content}
                              onChange={handleEditorChange}
                              id={'description'}
                            />
                          </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_description`] === "-1" &&
                          <div className="col-md-12 form-group my-2">
                            <b className="my-2">Description</b>
                            <CKEditor
                              editor={ClassicEditor}
                              data={content}
                              onChange={handleEditorChange}
                              id={'description'}
                              disabled
                            />
                          </div>
                        }
                        {/* <FormControl
                          className="form-control my-1"
                          label={"Description"}
                          name="eve_description"
                          row={20}
                          control="textarea"
                          placeholder="Here can be your description"
                        /> */}

                        <div className="d-flex mt-3 col-lg-12 align-items-start">
                          {(leadPermission?.super_admin ||
                            leadPermission?.[Module]?.fields?.[`${ACL_Module}_notification`] === "true") ?
                            <>
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
                                                    min={1}
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
                              <div className="col-5 p-0 ml-1 mt-2">
                                <div className="card-body p-0">
                                  <div>
                                    <File
                                      label={Translation(
                                        translations,
                                        "Feature Image"
                                      )}
                                      value={typeof image === 'object' ? image : image.includes('http') ? image : `${config.baseurl2}${image}`}
                                      onUpload={setImage}
                                      name={"ava"}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                            : leadPermission?.[Module]?.fields?.[`${ACL_Module}_notification`] === "-1" &&
                            <>
                              <div className="col-7 mt-3 p-0 notificationid">
                                <div className="row align-items-end m-0 d-flex align-item-center">
                                  <div className="col-md-6 row align-items-end">
                                    <SwitchCheck
                                      options={datass.meet}
                                      MainLabel={""}
                                      name={"eve_notification_meet"}
                                      disabled
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
                                                  disabled
                                                />
                                              </div>
                                              <div className="col-4">
                                                <div className="form-group my-2">
                                                  <input
                                                    min={1}
                                                    value={item.notify_interval}
                                                    disabled
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
                                                disabled
                                              />
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                              {(leadPermission?.super_admin ||
                                leadPermission?.[Module]?.fields?.[`${ACL_Module}_feature_image`] === "true") ?
                                <div className="col-5 p-0 ml-1 mt-2">
                                  <div className="card-body p-0">
                                    <div>
                                      <File
                                        label={Translation(
                                          translations,
                                          "Feature Image"
                                        )}
                                        value={typeof image === 'object' ? image : image.includes('http') ? image : `${config.baseurl2}${image}`}
                                        onUpload={setImage}
                                        name={"ava"}
                                        uploadbtnACL={Uploadbtn_handler}
                                      />
                                    </div>
                                  </div>
                                </div> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_feature_image`] === "-1" &&
                                <div className="col-5 p-0 ml-1 mt-2">
                                  <div className="card-body p-0">
                                    {
                                      <div>
                                        <File
                                          label={Translation(
                                            translations,
                                            "Feature Image"
                                          )}
                                          value={typeof image === 'object' ? image : image.includes('http') ? image : `${config.baseurl2}${image}`}
                                          // onUpload={setImage}
                                          name={"ava"}
                                        />
                                      </div>}
                                  </div>
                                </div>
                              }
                            </>
                          }
                        </div>
                        <br />
                        <br />

                        {(leadPermission?.super_admin ||
                          leadPermission?.[Module]?.fields?.[`${ACL_Module}_members`] === "true") ?
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
                                        selected={item?.membersearch}
                                        defaultValue={item?.membersearch}
                                        changess={(value) =>
                                          handleMemberPeriod2(value, index)
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
                                            value={item?.ev_members ? item?.ev_members : 'hk'}
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
                                              onClick={() =>
                                                handelMemberAdd(item)
                                              }
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
                          </> : leadPermission?.[Module]?.fields?.[`${ACL_Module}_members`] === "-1" &&
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
                                        selected={item?.membersearch}
                                        defaultValue={item?.membersearch}
                                        changess={(value) =>
                                          handleMemberPeriod2(value, index)

                                        }
                                        disabled={true}
                                      />
                                    </div>
                                    <div className="col-md-4">
                                      <span className="form-group d-flex gap-1">
                                        <div className="col-md-10">
                                          <FormControl
                                            align={'e'}
                                            disabled
                                            className="form-control"
                                            selectList={datass.ev_members}
                                            name={`notify_period[]`}
                                            control="select"
                                            value={item?.ev_members ? item?.ev_members : 'hk'}
                                            onChange={(e) =>
                                              handleMemberPeriod(
                                                item,
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
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
                      {/* <SubmitButton
                        onClick={handleShowModal}
                        props={submitbutton}
                        buttonLoading={res.isLoading}
                      /> */}
                      <button type="buttton" className="btn btn-primary d-block mt-3 ml-auto submit" onClick={(event) => handleShow(event, values)}>Update Event</button>
                    </Form>)}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  );
}
export default EditEvent;