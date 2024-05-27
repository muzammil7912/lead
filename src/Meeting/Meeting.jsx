import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  Component,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import usePost from "../customHooks/usePost";
import { MainHeadingContext } from "../context/MainHeadingContext";
import useWebSocket from "react-use-websocket";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import File from "../components/form/File";
import { Select } from "antd";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { Modal, Col, Row } from "react-bootstrap";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { FaSave } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Translation } from "../components/Translation";


import {
  FaBars,
  FaRegCircle,
  FaPlay,
  FaLevelDownAlt,
  FaRegCopy,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Tag from "./Tag";
import Attendees from "./Attendees";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ExampleModal from "./Editmodal";
import axios from "axios";
import config from "../services/config.json";
import swal from "sweetalert";
import useFetch from "../customHooks/useFetch";
import Card from "./DynamicFields";
import SidebarDynamic from "./SidebardynamicField";
import moment from "moment";
import { handleFullScreen } from "../components/AllCustomFuntion";
import Dropdown from "react-bootstrap/Dropdown";
import { getTokenSession } from "../utils/common";
import { FaListOl } from "react-icons/fa";
import Role from "../components/Role";
import FormControl from "../components/form/FormControl";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { List } from "./AgendaDroppable_list.jsx";
import { useDrag, useDrop } from "react-dnd";
import dayjs from "dayjs";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import EditLeadAssetEditModal from "../Lead/EditLeadAssetEditModal";
import Media_image_display from "../Lead/Media_image_display";
import { Monthss } from "../components/Month";
import EditLeadAction from "../Lead/EditLeadAction";
import ActionCard from "../components/common/ActionCard";

function Meeting() {
  const [viewAgenda, setViewagenda] = useState("");
  const { addHeading } = useContext(MainHeadingContext);
  const [notes, setNotes] = useState("");
  const [meeting, setMeeting] = useState("");
  const [risKdata, setRiskData] = useState("");
  const [riskId, setRiskId] = useState("");
  const [allData, setAllData] = useState("");
  const [decNotes, setdecNotes] = useState("");
  const [timeline, setTimeline] = useState("");
  const [overview, setOverView] = useState("");
  const [timelineShow, setTimelineShow] = useState(false);
  const { id } = useParams();
  const {
    data: allMeetingData,
    loading33,
    error33,
  } = useFetch({ setAllData }, `getEditViewMeeting/${id}`);
  const [tagVal, setTagVal] = useState("");
  const [tagCretVal, setCreTval] = useState("");
  const [restagPostSend, apiMethodtagPostSend] = usePost();
  const [res_postDragAndDropAgenda, apiMethod_postDragAndDropAgenda] = usePost();
  const [res_postDragAndDropAgenda2, apiMethod_postDragAndDropAgenda2] = usePost();
  const [agendaValue, setAgendaValue] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [img33, setimg33] = useState("");
  const [img332, setimg332] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [agendanumVal, setAgendanumVal] = useState("");
  const [suggested, setSuggested] = useState("");
  const [suggestednum, setSuggestedNum] = useState("");
  const [editorvalue, seteditorvalue] = useState("");
  const [notes_privacy, setnotes_privacy] = useState(false);
  const [decValue, setdECvalue] = useState("");
  const [actionInput, setActioninput] = useState("");
  const [viewAgenda2, setViewagenda2] = useState("");
  const [voted, setVoted] = useState("");
  const [notVoted, setnotVoted] = useState("");
  const { permissions } = useContext(MainAuthPermissionsContext);
  const API_URL = "https://77em4-8080.sse.codesandbox.io";
  const UPLOAD_ENDPOINT = "upload_files";
  const [states, setStates] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [stateSuggested, seTsuggested] = useState("");
  const [agendaViewapi, apiMethodAgendaViewAPI] = usePost();
  const [agendaViewMove, apiMethodagendaViewMove] = usePost();
  const [suggestedAgendaViewapi, apiMethodsuggestedAgendaViewap] = usePost();
  const [notesApi, apiMethodeNotesApi] = usePost();
  const [noteDecApi, apiMethodNotesDec] = usePost();
  const [riskViewApi, apiMethodRiskView] = usePost();
  const [attendences, setAttendence] = useState("");
  const [Members, setMembers] = useState("");
  const [showState, setShowState] = useState("");
  const [meetingCreateiD, setMeetingCreateId] = useState("");
  const [uploadImage, apiMethodUploadImage] = usePost();
  const [userTime, setUserTime] = useState();
  const [time, setTime] = useState(0);
  const [res_postCreateMeetingMedia, apiMethodpostCreateMeetingMedia] = usePost();
  const [res_postCreateMeetingFiles, apiMethodpostCreateMeetingFiles] = usePost();
  const [resDeleteAsset, apiMethodDeleteAsset] = usePost();


  // updated states for modal 
  const navigate = useNavigate();
  const [titelinput, setTitelinput] = useState("");
  const [subinput, setSubinput] = useState("");
  const [subsubinput, setsubSubinput] = useState("");
  const [rescreate, apiMethodcreate] = usePost();
  const [resUpdate, apiMethodUpdate] = usePost();
  const { translations } = useContext(MainTranslationContexts)
  const [timelineShow2, setTimelineShow2] = useState('1')
  const [editorvalue2, seteditorvalue2] = useState('')
  const [file, setFile] = useState(null);
  const [resDeleteagenda, apiMethodDeleteAgenda] = usePost();
  const [EditModalData, setEditModalData] = useState();
  const [Typeof, setTypeof] = useState();
  const [Mediaitem_list, setMediaitem_list] = useState();
  const [Media_Rerender, setMedia_Rerender] = useState(false);
  const [Fileitem_list, setFileitem_list] = useState();
  const [followerSelectValue, setfollowerSelectValue] = useState(false);
  const [selectedFollower, setselectedFollower] = useState([]);
  const [category_select_list, setCategory_select_list] = useState([]);
  const [category, setcategory] = useState([]);
  const [subCategoryselect, setsubCategoryselect] = useState([]);
  const [subCat_selected, setsubCat_selected] = useState([]);
  const [Action_Pipelines, setAction_Pipelines] = useState([]);
  const [Action_list, setAction_list] = useState([]);
  const [pipeline_id, setpipeline_id] = useState();
  const [Auth_user, setAuth_user] = useState();
  // .................................................................... 


  const {
    data: category_select_list1Media,
    loading11,
    error11,
  } = useFetch("", "getViewCategory");
  const [followerSelectValueMedia, setfollowerSelectValueMedia] = useState([]);
  const [selectedFollowerMedia, setselectedFollowerMedia] = useState("");
  const [selectedFollowerMediaRole, setselectedFollowerMediaRole] = useState("");
  const [categoryMedia, setcategoryMedia] = useState([]);
  const [resPostCategoryMedia, apiMethodPostCategoryMedia] = usePost();
  const [resPostCategory, apiMethodPostCategory] = usePost();
  const [subCategoryselectMedia, setsubCategoryselectMedia] = useState([]);
  const [category_select_listMedia, setCategory_select_listMedia] = useState([]);
  const [subCat_selectedMedia, setsubCat_selectedMedia] = useState([]);
  const [imageMedia, setImageMedia] = useState(false);
  const [resowner, apiMethodowner] = usePost();
  const { data: registerdata } = useFetch("", "getUserRoles");
  const redata = registerdata;
  const follower_select_list = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Custom", value: "Custom" },
    { label: "Role", value: "Role" },
  ];

  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };

  useEffect(() => {
    if (allMeetingData?.meeting)
      addHeading(`Meeting - ${allMeetingData?.meeting?.event_title}`);
  });

  const handleShowModal = (item, type) => {
    // console.log(item);
    setEditModalData(item)
    setShowModal(true)
    setTypeof(type)
  };
  const transmitMessage = () => {
    let tagdata = new FormData();
    tagdata.append("meeting_id", id);
    tagdata.append("tags", tagCretVal);
    tagdata.append("uMeet1", "typeTag");
    tagdata.append("typeTag", "typeNoteuTag");
    apiMethodtagPostSend("postCreateTagsMeetings", tagdata);
  };
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    "wss://dev.thesalesjourney.io/websocket",
    {
      onOpen: () => console.log("WebSocket connection opened."),
      onClose: () => console.log("WebSocket connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event) => handlePost(event.data),
    }
  );

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
        let data = {
          section: "Start Timer",
          user_id: "1",
          meeting_id: id,
          data: formatTime(time),
        };
        sendJsonMessage(data);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (time) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleStart = () => {
    setIsActive(true);
    let data = {
      section: "Start Timer",
      user_id: "1",
      meeting_id: id,
      data: formatTime(time),
    };
    sendJsonMessage(data);
  };

  const handleStop = () => {
    setIsActive(false);
    setTime(time);
    let data = {
      section: "Stop Timer",
      user_id: "1",
      meeting_id: id,
    };
    sendJsonMessage(data);
  };
  useEffect(() => {
    if (allMeetingData) {
      if (allMeetingData.message) {
        navigate(`/`);
      }
    }
  }, [allMeetingData]);
  function handlePost(event) {
    var object = JSON.parse(event);
    console.log("websocket Response", object?.section);
    if (object.section == "tags" && object.meeting_id == id) {
      setTagVal(object?.data);
      timeLine();
    }
    else if (object.section == "Agenda" && object.meeting_id == id) {
      setViewagenda(object?.data);
      timeLine();
    }
    else if (object.section == "sugst_topc" && object.meeting_id == id) {
      setViewagenda2(object?.data);
      timeLine();
    }
    else if (object.section == "Meeting Media" && object.meeting_id == id) {
      setMedia_Rerender(!Media_Rerender)
      timeLine();
    }
    else if (object.section == "Meeting_Media_edit" && object.meeting_id == id) {
      setMedia_Rerender(!Media_Rerender)
      timeLine();
    }
    else if (object.section == "Meeting_Files" && object.meeting_id == id) {
      setMedia_Rerender(!Media_Rerender)
      timeLine();
    }
    else if (object.section == "Meeting_Files_edit" && object.meeting_id == id) {
      setMedia_Rerender(!Media_Rerender)
      timeLine();
    }
    else if (object.section == "Meeting_Files_delete" && object.meeting_id == id) {
      setMedia_Rerender(!Media_Rerender)
      timeLine();
    }
    else if (object.section == "Actions" && object.meeting_id == id) {
      setAction_list(object.data)
      timeLine();
    }
    else if (object.section == "Notes" && object.meeting_id == id) {
      setNotes(object.data);
      timeLine();
    } else if (object.section == "Risks" && object.meeting_id == id) {
      setnotVoted(object.data);
      timeLine();
    } else if (object.section == "Description" && object.meeting_id == id) {
      setdecNotes(object.data);
      timeLine();
    } else if (object.section == "Decisions" && object.meeting_id == id) {
      setVoted(object.data);
      timeLine();
    } else if (object.section == "Attendence" && object.meeting_id == id) {
      const array1 = object?.data?.all_attendees;
      const array2 = object?.data?.member;
      if (Array.isArray(array1) && Array.isArray(array2)) {
        const merragedata = array1.concat(array2)
        setAttendence(merragedata);
      }
      else if (Array.isArray(array2)) {
        setAttendence(array2);
      } else {
        setAttendence(array1);
      }
      timeLine();
      HandleAuth()
    } else if (object.section === "Start Timer" && object.meeting_id === id) {
      setUserTime(object.data);
    } else if (object.section === "Stop Timer" && object.meeting_id === id) {
      toast.error("Meeting Stop");
    }
  }

  useEffect(() => {
    if (agendaViewMove.data || agendaViewapi.data || states) {
      axios
        .get(`${config.apiEndPoint}getViewAgenda/${id}`)
        .then((response) => {
          let data = {
            section: "Agenda",
            user_id: "1",
            meeting_id: id,
            data: response?.data,
          };
          sendJsonMessage(data);
          Array.isArray(response.data) && setViewagenda(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [agendaViewMove.data, agendaViewapi.data, states]);

  useEffect(() => {
    if (agendaViewMove.data || suggestedAgendaViewapi.data || stateSuggested) {
      axios
        .get(`${config.apiEndPoint}getViewSuggestedTopics/${id}`)
        .then((response) => {
          let data = {
            section: "sugst_topc",
            user_id: "1",
            meeting_id: id,
            data: response?.data,
          };
          sendJsonMessage(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [agendaViewMove.data, suggestedAgendaViewapi.data, stateSuggested]);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}getEditViewMeeting/${id}`)
      .then((response) => {
        setMediaitem_list(response?.data?.mediaData)
        setFileitem_list(response?.data?.filesData)
      })
      .catch((err) => {
        console.log("eerr", err);
      });
  }, [Media_Rerender]);

  useEffect(() => {
    if (restagPostSend.data && !restagPostSend.isLoading) {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditViewMeeting/${id}`)
        .then((response) => {
          let data = {
            section: "tags",
            user_id: "1",
            meeting_id: id,
            data: response?.data?.all_tags,
          };
          setMediaitem_list(response?.data?.mediaData)
          sendJsonMessage(data);
          setTagVal(response?.data?.all_tags);
        })
        .catch((err) => {
          console.log("eerr", err);
        });
    }
  }, [restagPostSend.data, Media_Rerender]);
  useEffect(() => {
    if (res_postDragAndDropAgenda.data && !res_postDragAndDropAgenda.data.message) {
      // console.log(res_postDragAndDropAgenda?.data);
      let data = {
        section: "Agenda",
        user_id: "1",
        meeting_id: id,
        data: res_postDragAndDropAgenda?.data,
      };
      sendJsonMessage(data);
    }
  }, [res_postDragAndDropAgenda.data])
  useEffect(() => {
    if (res_postDragAndDropAgenda2.data && !res_postDragAndDropAgenda2.data.message) {
      // console.log(res_postDragAndDropAgenda2?.data);
      let data = {
        section: "sugst_topc",
        user_id: "1",
        meeting_id: id,
        data: res_postDragAndDropAgenda2?.data,
      };
      sendJsonMessage(data);
    }
  }, [res_postDragAndDropAgenda2.data])
  useEffect(() => {
    if (notesApi.data) {
      axios
        .get(`${config.apiEndPoint}getAllViewNotes/${id}`)
        .then((response) => {
          let data = {
            section: "Notes",
            user_id: "1",
            meeting_id: id,
            data: response?.data,
          };
          setNotes(response.data);
          sendJsonMessage(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [notesApi.data]);

  useEffect(() => {
    if (risKdata) {
      let tagdata = new FormData();
      tagdata.append("meeting_id", id);
      tagdata.append("followup_id", riskId);
      apiMethodRiskView("postViewRisksIssues", tagdata);
    }
  }, [risKdata]);
  const handletagDelete = (item) => {
    let tagdeval = new FormData();
    tagdeval.append("meeting_id", id);
    tagdeval.append("mode", "meeting_rem");
    tagdeval.append("tags", item);
    apiMethodtagPostSend("postDeletedTagsMeetings", tagdeval);
  };
  const handleToggle = (e) => {
    e.preventDefault();
    let closestCard = e.target.closest(".card");
    if (closestCard.classList.contains("card-collapsed")) {
      closestCard.classList.remove("card-collapsed");
    } else {
      closestCard.classList.add("card-collapsed");
    }
  };
  const createAgenda = () => {
    if (agendaValue == "") {
      swal({
        text: "Please fill Agenda",
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      });
    } else if (agendanumVal == "") {
      swal({
        text: "Please fill time",
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      });
    } else {
      let tagdata = new FormData();
      tagdata.append("typeAgendaAdd", "typeAgendaAdd");
      tagdata.append("uMeet20", "typeAgendaAdd");
      tagdata.append("item_timer", agendanumVal);
      tagdata.append("item_user", permissions?.id);
      tagdata.append("meeting_id", id);
      tagdata.append("item_title", agendaValue);
      apiMethodAgendaViewAPI("postCreateAgenda", tagdata);
    }
  };

  const addSubagenda = (item) => {
    let addData = new FormData();
    addData.append("item_id", item.db_id);
    addData.append("meeting_id", id);
    addData.append("item_user", permissions?.id);
    addData.append("uMeet24", "typeAgendaSubApped");
    addData.append("typeAgendaSubApped", "typeAgendaSubApped");
    apiMethodAgendaViewAPI("postAddSubAgenda", addData);
  };
  const addSubsubagenda = (item) => {
    let addData = new FormData();
    addData.append("item_id", item.db_id);
    addData.append("meeting_id", id);
    addData.append("item_user", permissions?.id);
    addData.append("uMeet24", "typeAgendaSubApped");
    addData.append("typeAgendaSubApped", "typeAgendaSubApped");
    apiMethodAgendaViewAPI("postAddSubAgenda", addData);
  };
  const addSubagenda2 = (item) => {
    let addData = new FormData();
    addData.append("item_id", item.db_id);
    addData.append("meeting_id", id);
    addData.append("item_user", permissions?.id);
    addData.append("uMeet24", "typeAgendaSubApped");
    addData.append("typeAgendaSubApped", "typeAgendaSubApped");
    apiMethodsuggestedAgendaViewap("postAddSubAgenda", addData);
  };
  const addSubsubagenda2 = (item) => {
    let addData = new FormData();
    addData.append("item_id", item.db_id);
    addData.append("meeting_id", id);
    addData.append("item_user", permissions?.id);
    addData.append("uMeet24", "typeAgendaSubApped");
    addData.append("typeAgendaSubApped", "typeAgendaSubApped");
    apiMethodsuggestedAgendaViewap("postAddSubAgenda", addData);
  };
  const createSuggestedAgenda = () => {
    if (suggested == "") {
      swal({
        text: "Please fill Agenda",
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      });
    } else if (suggestednum == "") {
      swal({
        text: "Please fill time",
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      });
    } else {
      let tagdata = new FormData();
      tagdata.append("typeAgendaAdd", "typeAgendaAddInAct");
      tagdata.append("uMeet30", "typeAgendaAdd");
      tagdata.append("item_timer", suggestednum);
      tagdata.append("item_user", permissions?.id);
      tagdata.append("meeting_id", id);
      tagdata.append("item_title", suggested);
      apiMethodsuggestedAgendaViewap("postCreateSuggestedTopics", tagdata);
      if (suggestedAgendaViewapi.data) {
        swal({
          text: suggestedAgendaViewapi.data.message,
          icon: "success",
          buttons: ["Close", true],
          dangerMode: true,
        });
      }
    }
  };
  function handleInputChange(event) {
    setAgendaValue(event.target.value);
  }

  const createNotes = () => {
    let tagdata = new FormData();
    // console.log(editorvalue);
    if (editorvalue.trim() !== "") {
      tagdata.append("privacy", `${notes_privacy ? "true" : "false"}`);
      //  tagdata.append("note_privacy", `${notes_privacy?"true":"flase"}`);
      tagdata.append("note", editorvalue);
      tagdata.append("meeting_id", id);
      tagdata.append("uMeet", "typeNote");
      tagdata.append("typeNote", "typeNoteuMeet");
      apiMethodeNotesApi("postCreateNotes", tagdata);
      swal({
        text: "Notes Added Successfully",
        dangerMode: false,
        icon: "success",
      });
    } else {
      swal({
        text: "Notes could not be empty!",
        dangerMode: true,
        icon: "warning",
      });
    }
  };
  const updatesNotes = () => {
    let tagdata = new FormData();
    tagdata.append("privacy", "false");
    tagdata.append("note", decValue);
    tagdata.append("meeting_id", id);
    tagdata.append("uDec", "typeDec");
    tagdata.append("typeDec", "typeDecuMeet");
    apiMethodNotesDec("postDescription", tagdata);
    swal({
      text: "Note has been added",
    });
  };
  const deleteAgenda = (item) => {
    swal({
      text: "Are you sure to delete the Agenda?",
      icon: "warning",
      buttons: ["Close", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let delData = new FormData();
        delData.append("item_id", item.db_id);
        delData.append("meeting_id", id);
        delData.append("item_user", permissions?.id);
        delData.append("uMeet23", "typeAgendaRem");
        delData.append("typeAgendaRem", "typeAgendaRem");
        apiMethodAgendaViewAPI("postDeletedAgenda", delData);
      }
    });
  };
  const deleteAgenda2 = (item) => {
    swal({
      text: "Are you sure to delete the Agenda?",
      icon: "warning",
      buttons: ["Close", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let delData = new FormData();
        delData.append("item_id", item.db_id);
        delData.append("meeting_id", id);
        delData.append("item_user", permissions?.id);
        delData.append("uMeet23", "typeAgendaRem");
        delData.append("typeAgendaRem", "typeAgendaRem");
        apiMethodsuggestedAgendaViewap("postDeletedAgenda", delData);
      }
    });
  };
  const moveDown = (item) => {
    let moveData = new FormData();
    moveData.append("item_id", item.db_id);
    moveData.append("meeting_id", id);
    moveData.append("item_user", permissions?.id);
    moveData.append("uMeet31", "typeAgendaMovetoDwn");
    moveData.append("typeAgendaMovetoDwn", "typeAgendaMovetoDwn");
    apiMethodagendaViewMove("postMovetoDwnAgenda", moveData);
  };
  const moveUp = (item) => {
    let moveData = new FormData();
    moveData.append("item_id", item.db_id);
    moveData.append("meeting_id", id);
    moveData.append("item_user", permissions?.id);
    moveData.append("uMeet32", "typeAgendaMovetoUp");
    moveData.append("typeAgendaMovetoUp", "typeAgendaMovetoUp");
    apiMethodagendaViewMove("postMovetoUpSuggestedTopics", moveData);
  };
  const copyAgenda = (item) => {
    // console.log(item);
    let copy = new FormData();
    copy.append("item_id", item.db_id);
    copy.append("meeting_id", id);
    copy.append("item_user", permissions?.id);
    copy.append("uMeet22", "typeAgendaCopy");
    copy.append("typeAgendaCopy", "typeAgendaCopy");
    apiMethodAgendaViewAPI("postDuplicateAgenda", copy);
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${API_URL}/${res.filename}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  useEffect(() => {
    if (allMeetingData) {
      setAllData(allMeetingData);
      setViewagenda(allMeetingData?.meeting_agenda);
      setViewagenda2(allMeetingData?.meeting_agenda_topics);
      setNotes(allMeetingData?.notes);
      setdecNotes(allMeetingData?.description);
      setTagVal(allMeetingData?.all_tags);
      setnotVoted(allMeetingData?.not_voted_followups);
      setVoted(allMeetingData?.voted_followups);
      setOverView(allMeetingData?.overview);
      setTimeline(allMeetingData?.timeLine);
      setpipeline_id(allMeetingData?.eventCalendarID);
      const array1 = allMeetingData?.all_attendees;
      const array2 = allMeetingData?.members;
      if (Array.isArray(array1) && Array.isArray(array2)) {
        const merragedata = array1.concat(array2)
        setAttendence(merragedata);
      }
      else if (Array.isArray(array2)) {
        setAttendence(array2);
      } else {
        setAttendence(array1);
      }
      setMembers(allMeetingData?.members);
      setMeetingCreateId(allMeetingData?.createdUserID);
      setMediaitem_list(allMeetingData?.mediaData)
      setFileitem_list(allMeetingData?.filesData)
      setAction_Pipelines(allMeetingData)
      setAction_list(allMeetingData.actionEventsData)
    }
  }, [allMeetingData]);

  useEffect(() => {
    if (Auth_user) {
      if (Auth_user.message) {
        navigate(`/`);
      }
    }
  }, [Auth_user]);
  useEffect(() => {
    if (noteDecApi.data) {
      axios
        .get(`${config.apiEndPoint}getAllViewDescription/${id}`)
        .then((response) => {
          let data = {
            section: "Description",
            user_id: "1",
            meeting_id: id,
            data: response?.data,
          };
          sendJsonMessage(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [noteDecApi.data]);
  useEffect(() => {
    if (riskViewApi.data) {
      console.log(riskViewApi);
      let data = {
        section: "Risks",
        user_id: "1",
        meeting_id: id,
        data: riskViewApi?.data,
      };
      sendJsonMessage(data);
    }
  }, [riskViewApi.data]);
  useEffect(() => {
    if (meeting) {
      axios
        .get(`${config.apiEndPoint}getviewDecisions/${id}`)
        .then((response) => {
          let data = {
            section: "Decisions",
            user_id: "1",
            meeting_id: id,
            data: response?.data,
          };
          sendJsonMessage(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [meeting]);

  useEffect(() => {
    if (showState) {
      axios
        .get(`${config.apiEndPoint}getAllAttendeesByMeeting/${id}`)
        .then((response) => {
          let data = {
            section: "Attendence",
            user_id: "1",
            meeting_id: id,
            data: response?.data,
          };
          sendJsonMessage(data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [showState]);

  const HandleAuth = () => {
    axios
      .get(`${config.apiEndPoint}getEditViewMeeting/${id}`)
      .then((response) => {
        setAuth_user(response.data)
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  const timeLine = () => {
    axios
      .get(`${config.apiEndPoint}getTimelineMeeting/${id}`)
      .then((response) => {
        setTimeline(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUploadImage = () => {
    if (image) {
      let form = new FormData();
      form.append("file_privacy", true);
      form.append("meeting_id", id);
      form.append("uMeet2", "typeFile");
      form.append("typeFile", "typeFileuMeet");
      form.append("upload_file", image);
      apiMethodUploadImage(`postCreateFilesMeetings`, form);
    }
  };
  const listItems = Array(10)
    .fill(0)
    .map((_, i) => i);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const [items, setItems] = useState(listItems);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(updatedItems);
  };

  const subbbMedia = async (v, v2) => {
    setcategoryMedia(v);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));
    apiMethodPostCategoryMedia("postViewSubCategory", formdata);
  };
  useEffect(() => {
    if (resPostCategoryMedia.data && !resPostCategoryMedia.data.message) {
      let subData = resPostCategoryMedia.data.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setsubCategoryselectMedia(subData);
    } else if (resPostCategoryMedia.data && resPostCategoryMedia.data.message) {
      setsubCategoryselectMedia([]);
    }
  }, [resPostCategoryMedia]);

  let imageFileExtensions = [
    ".png",
    ".jpeg",
    ".jpg",
    ".gif",
    ".bmp",
    ".tiff",
    ".tif",
    ".svg",
    ".raw",
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
  ];
  function handleFileUploadMedia(file) {
    var fileExtension = getFileExtension(file.name);
    if (imageFileExtensions.includes(fileExtension)) {
      setImageMedia(file);
    } else {
      swal({
        title: "Only image and video files are allowed.",
        icon: "warning",
        dangerMode: true,
      });
    }
  }

  function getFileExtension(filename) {
    return "." + filename.split(".").pop();
  }

  const onSearchFollowerMedia = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };

  useEffect(() => {
    if (Array.isArray(category_select_list1Media)) {
      let data = category_select_list1Media.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setCategory_select_listMedia(data);
    }
  }, [category_select_list1Media]);

  useEffect(() => {
    if (Array.isArray(category_select_list1Media)) {
      let data = category_select_list1Media.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setCategory_select_list(data);
    }
  }, [category_select_list1Media]);


  //  updated code for modal ........................................................................................... 

  useEffect(() => {
    if (rescreate.data) {
      if (Typeof === 'agenda') {
        setStates(rescreate.data)
      }
    }
  }, [rescreate.data])
  useEffect(() => {
    if (rescreate.data) {
      if (Typeof === 'sugst_topc') {
        seTsuggested(rescreate.data)
      }
    }
  }, [rescreate.data])
  useEffect(() => {
    if (resDeleteagenda.data) {
      // console.log(resDeleteagenda.data, "asdasdasd");
      setStates(resDeleteagenda.data)
    }
  }, [resDeleteagenda.data])
  // const handleCloseModal = () => setShowModal(false);
  // const handleShowEditModal = () => {
  //     console.log('sss')
  //     setShowModal(true)
  // };
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  function geteditvalues(e) {
    let updatedata = new FormData()
    updatedata.append("item_id", EditModalData.db_id);
    updatedata.append("meeting_id", id);
    updatedata.append("item_user", permissions?.id);
    updatedata.append("item_title", e);
    updatedata.append("uMeet29", 'typeAgendaItemTitle');
    updatedata.append("typeAgendaItemTitle", 'typeAgendaItemTitle');
    apiMethodcreate("postUpdateTitleAgenda", updatedata);
    setTitelinput(e)
  }
  function geteditvalues3(item) {
    if (subinput === '') {
      swal({
        position: "center",
        icon: "error",
        title: "Fields are empty!",
        showConfirmButton: false
      });
    } else {
      let updatedata = new FormData()
      updatedata.append("item_id", item.db_id);
      updatedata.append("meeting_id", id);
      updatedata.append("item_user", permissions?.id);
      updatedata.append("sub_item_title", subinput);
      updatedata.append("uMeet27", 'typeAgendaEditSbItemTitle');
      updatedata.append("typeAgendaEditSbItemTitle", 'typeAgendaEditSbItemTitle');
      apiMethodcreate("postUpdateSubTitleAgenda", updatedata);
      swal({
        position: "center",
        icon: "success",
        title: "Edit Successful",
        showConfirmButton: false
      })
    }
  }
  const handleInputChange2 = (event) => {
    setSubinput(event.target.value);
  }
  const handleInputChange3 = (event) => {
    setsubSubinput(event.target.value);
  }
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${API_URL}/${res.filename}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }
  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }
  const decUpdate = () => {
    let updatedata = new FormData()
    updatedata.append("item_id", EditModalData.db_id);
    updatedata.append("meeting_id", id);
    updatedata.append("item_user", permissions?.id);
    updatedata.append("uMeet26", 'typeAgendaEditDesc');
    updatedata.append("typeAgendaEditDesc", 'typeAgendaEditDesc');
    updatedata.append("item_description", editorvalue2);
    apiMethodUpdate("postUpdateDescriptionAgenda", updatedata);
    setShowModal(false)
  }
  const deleteAgendaModal = (item) => {
    swal({
      text: 'Are you sure to delete the Agenda?',
      icon: "warning",
      buttons: ["Close", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let delData = new FormData();
        delData.append('item_id', item.db_id)
        delData.append('meeting_id', id)
        delData.append('item_user', permissions?.id)
        delData.append('uMeet23', 'typeAgendaRem')
        delData.append('typeAgendaRem', 'typeAgendaRem')
        apiMethodDeleteAgenda("postDeletedAgenda", delData);
      }
    })

  }


  const MediaSubmit = () => {
    if (imageMedia) {
      let formdata = new FormData();
      formdata.append("meeting01", "meetingMeadiaCreate");
      formdata.append("meetingMeadiaCreate", "meetingMeadiaCreate");
      formdata.append("meeting_id", id);
      formdata.append("upload_media", imageMedia);
      formdata.append("media_follw", followerSelectValueMedia);
      if (followerSelectValueMedia == "Role") {
        selectedFollowerMedia.length &&
          selectedFollowerMedia.map((v, i) => {
            formdata.append(`media_followers[${i}]`, v);
          });
      }
      if (followerSelectValueMedia == "Custom") {
        selectedFollowerMedia.length &&
          selectedFollowerMedia.map((v, i) => {
            formdata.append(`md_follw[${i}]`, v);
          });
      }
      categoryMedia.length &&
        categoryMedia.map((v, i) => {
          formdata.append(`media_cat[${i}]`, v);
        });
      subCat_selectedMedia.length &&
        subCat_selectedMedia.map((v, i) => {
          formdata.append(`media_subcat[${i}]`, v);
        });

      let bodyContent = formdata;
      apiMethodpostCreateMeetingMedia("postCreateMeetingMedia", bodyContent);
    } else {
      toast.warning("Fill the fields ")
    }
  }

  const FilesSubmit = () => {
    let formdata = new FormData();
    formdata.append("meeting02", "meetingFilesCreate");
    formdata.append("meetingFilesCreate", "meetingFilesCreate");
    formdata.append("meeting_id", id);
    if (image2) {
      formdata.append("upload_file", image2);
      formdata.append("file_follw", followerSelectValue);
      if (followerSelectValue == "Role") {
        selectedFollower.length &&
          selectedFollower.map((v, i) => {
            formdata.append(`fl_follw[${i}]`, v);
          });
      }
      if (followerSelectValue == "Custom") {
        selectedFollower.length &&
          selectedFollower.map((v, i) => {
            formdata.append(`file_followers[${i}]`, v);
          });
      }
      category.length &&
        category.map((v, i) => {
          formdata.append(`file_cat[${i}]`, v);
        });

      subCat_selected.length &&
        subCat_selected.map((v, i) => {
          formdata.append(`file_subcat[${i}]`, v);
        });

      let bodyContent = formdata;
      apiMethodpostCreateMeetingFiles("postCreateMeetingFiles", bodyContent);
    } else {
      toast.warning("Fill the fields ")
    }
  }

  const deleteAssetFile = (item) => {
    swal({
      text: 'Are you sure to delete the File?',
      icon: "warning",
      buttons: ["Close", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let field = {
          general: "delete_file",
          fieldId: item.db_file_id,
          filelead: item.file_lead,
          filename: item.file_name,
          module: "event_meeting",
          type: "file"
        };
        apiMethodDeleteAsset("postDeleteLeadAssets", field);
        // const updatedFileitemList = Fileitem_list.filter((its) => its.db_file_id !== item.db_file_id);
        // setFileitem_list(updatedFileitemList);
      }
    })
  };

  useEffect(() => {
    if (res_postCreateMeetingMedia?.data) {
      toast.success("Upload Media Successfully");
      setMediaitem_list(res_postCreateMeetingMedia?.data)
      let data = {
        section: "Meeting Media",
        user_id: "1",
        meeting_id: id,
        data: res_postCreateMeetingMedia?.data,
      };
      sendJsonMessage(data);
    }
  }, [res_postCreateMeetingMedia]);

  useEffect(() => {
    if (res_postCreateMeetingFiles?.data) {
      toast.success("Files Created successfully");
      setFileitem_list(res_postCreateMeetingFiles?.data)
      let data = {
        section: "Meeting_Files",
        user_id: "1",
        meeting_id: id,
        data: res_postCreateMeetingFiles?.data,
      };
      sendJsonMessage(data);
    }
  }, [res_postCreateMeetingFiles]);
  useEffect(() => {
    if (resDeleteAsset?.data) {
      // toast.success("Files Created successfully");
      // console.log(resDeleteAsset);
      setFileitem_list(resDeleteAsset?.data)
      let data = {
        section: "Meeting_Files_delete",
        user_id: "1",
        meeting_id: id,
        data: resDeleteAsset?.data,
      };
      sendJsonMessage(data);
    }
  }, [resDeleteAsset]);



  const onSearchFollower = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    formdataOwner.append("uLead", id);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };

  const subbb = async (v, v2) => {
    setcategory(v);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));
    apiMethodPostCategory("postViewSubCategory", formdata);
  };

  useEffect(() => {
    if (resPostCategory.data && !resPostCategory.data.message) {
      let subData = resPostCategory.data.map((val, index) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setsubCategoryselect(subData);
    } else if (resPostCategory.data && resPostCategory.data.message) {
      setsubCategoryselect([]);
    }
  }, [resPostCategory]);

  // ....................................................................................................end  //////////////////////







  const ListItem = ({ text, index, moveListItem, item }) => {
    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
      type: "item",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
      accept: "item",
      drop: (e) => { moveListItem(e.index, index); }
    });

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0.7 : 1;
    return (
      <div className="" ref={dragDropRef} >
        {/* {console.log("ddddd")} */}
        <div className="relative">
          <ul className="agenda1appendBox list">
            <li className="mb-2 agenda1appendBoxp">
              <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                <div className="agenda1appendBox__left d-flex align-item-center">
                  <div className="agenda1appendBox_drag ">
                    <FaBars />
                  </div>
                  <div className="agenda1appendBox_i">
                    <FaRegCircle />
                  </div>
                  <div className="agenda1appendBox_txt">
                    <h6 className="m-0">{item.item_title}</h6>
                  </div>
                </div>
                <div className="agenda1appendBox__right">
                  <ul className="list d-flex align-item-center">
                    <li>
                      {typeof +item.item_timer === "number" ? (
                        <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                      ) : (
                        <div className="agenda1appendBox_time">NaN:00</div>
                      )}
                    </li>
                    <li className="agenda1appendBox_stop">
                      <FaPlay />
                    </li>
                    <li
                      onClick={() => addSubagenda(item)}
                      className="agenda1appendBox_sub"
                    >
                      <i className="fa fa-list-ul"></i>
                    </li>
                    <li
                      onClick={() => moveDown(item)}
                      className="agenda1appendBox_suggested"
                    >
                      <FaLevelDownAlt />
                    </li>
                    <li
                      onClick={() => copyAgenda(item)}
                      className="agenda1appendBox_duplicate"
                    >
                      <FaRegCopy />
                    </li>
                    <li
                      className="agenda1appendBox_edit"
                    >
                      <button
                        onClick={() => handleShowModal(item, "agenda")}
                        type="button"
                        className="icon medit border-0  bg-none "
                      // onClick={() => setShowModal(true)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      {/* <ExampleModal
                        item={item}
                        setStates={setStates}
                        agenda={"agenda"}
                      /> */}
                    </li>
                    <li
                      onClick={() => deleteAgenda(item)}
                      className="agenda1appendBox__delete"
                    >
                      <FaTrash />
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          {Array.isArray(item.sub_items) &&
            item.sub_items.map((item, index) => (
              <div key={index} className="agenda1appendBoxpsubdiv">
                <ul className="list sortable ui-sortable">
                  <li
                    className="agenda1appendBoxp my-2"
                    data-order="96"
                    data-item="item"
                  >
                    <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                      <div className="agenda1appendBox__left d-flex align-item-center">
                        <div className="agenda1appendBox_drag ui-sortable-handle">
                          <i className="fa-solid fa-bars"></i>
                        </div>
                        <div className="agenda1appendBox_i">
                          <i className="fa-regular fa-circle"></i>
                        </div>
                        <div className="agenda1appendBox_txt">
                          <h6 className="m-0">{item.item_title}</h6>
                        </div>
                      </div>
                      <div className="agenda1appendBox__right">
                        <ul className="list d-flex align-item-center">
                          <li>
                            {typeof +item.item_timer === "number" ? (
                              <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                            ) : (
                              <div className="agenda1appendBox_time">
                                NaN:00
                              </div>
                            )}
                          </li>
                          <li className="agenda1appendBox_stop">
                            <i className="fa-solid fa-play"></i>
                          </li>
                          <li
                            onClick={() => addSubsubagenda(item)}
                            className="agenda1appendBox_sub sub__loop"
                          >
                            <i className="fa fa-list-ul"></i>
                          </li>
                          <li
                            onClick={() => copyAgenda(item)}
                            className="agenda1appendBox_duplicate"
                          >
                            {" "}
                            <FaRegCopy />
                          </li>
                          <li
                            onClick={() => handleShowModal(item, "agenda")}
                            className="agenda1appendBox_edit"
                          >
                            <button
                              onClick={() => handleShowModal(item, "agenda")}
                              type="button"
                              className="icon medit border-0  bg-none "
                            // onClick={() => setShowModal(true)}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            {/* <ExampleModal
                              item={item}
                              setStates={setStates}
                              agenda={"agenda"}
                            /> */}
                          </li>
                          <li
                            onClick={() => deleteAgenda(item)}
                            className="agenda1appendBox__delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ">
                      <ul className="list sortable ui-sortable"></ul>
                    </div>
                  </li>
                </ul>
                {Array.isArray(item.sub_items) &&
                  item.sub_items.map((item, index) => (
                    <div key={index} className="agenda1appendBoxpsubdiv">
                      <ul className="list sortable">
                        <li
                          className="agenda1appendBoxp my-2"
                          data-order="19"
                          data-item="item"
                        >
                          <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                            <div className="agenda1appendBox__left d-flex align-item-center">
                              <div className="agenda1appendBox_drag ui-sortable-handle">
                                <i className="fa-solid fa-bars"></i>
                              </div>
                              <div className="agenda1appendBox_i">
                                <i className="fa-regular fa-circle"></i>
                              </div>
                              <div className="agenda1appendBox_txt">
                                <h6 className="m-0">{item.item_title}</h6>
                              </div>
                            </div>

                            <div className="agenda1appendBox__right">
                              <ul className="list d-flex align-item-center">
                                <li>
                                  {typeof +item.item_timer === "number" ? (
                                    <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                  ) : (
                                    <div className="agenda1appendBox_time">
                                      NaN:00
                                    </div>
                                  )}
                                </li>
                                <li className="agenda1appendBox_stop">
                                  <i className="fa-solid fa-play"></i>
                                </li>
                                <li
                                  onClick={() => copyAgenda(item)}
                                  className="agenda1appendBox_duplicate"
                                >
                                  <FaRegCopy />
                                </li>
                                <li
                                  onClick={() => handleShowModal(item, "agenda")}
                                  className="agenda1appendBox_edit"
                                >
                                  <button
                                    onClick={() => handleShowModal(item, "agenda")}
                                    type="button"
                                    className="icon medit border-0  bg-none "
                                  // onClick={() => setShowModal(true)}
                                  >
                                    <i className="fa-solid fa-pen"></i>
                                  </button>
                                  {/* <ExampleModal
                                    item={item}
                                    setStates={setStates}
                                    agenda={"agenda"}
                                  /> */}
                                </li>
                                <li className="agenda1appendBox__delete">
                                  <i
                                    onClick={() => deleteAgenda(item)}
                                    className="fa-solid fa-trash"
                                  ></i>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ"></div>
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  };
  const ListItem2 = ({ text, index, moveListItem, item }) => {
    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
      type: "item",
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
      accept: "item",
      drop: (e) => { moveListItem(e.index, index); }
    });

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0.7 : 1;
    return (
      <div className="" ref={dragDropRef} >
        {/* {console.log("ddddd")} */}
        <div className="relative">
          <ul className="agenda1appendBox list">
            <li className="mb-2 agenda1appendBoxp">
              <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                <div className="agenda1appendBox__left d-flex align-item-center">
                  <div className="agenda1appendBox_drag ">
                    <FaBars />
                  </div>
                  <div className="agenda1appendBox_i">
                    <FaRegCircle />
                  </div>
                  <div className="agenda1appendBox_txt">
                    <h6 className="m-0">{item.item_title}</h6>
                  </div>
                </div>
                <div className="agenda1appendBox__right">
                  <ul className="list d-flex align-item-center">
                    <li>
                      {typeof +item.item_timer === "number" ? (
                        <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                      ) : (
                        <div className="agenda1appendBox_time">NaN:00</div>
                      )}
                    </li>
                    <li className="agenda1appendBox_stop">
                      <FaPlay />
                    </li>
                    <li
                      onClick={() => addSubagenda2(item)}
                      className="agenda1appendBox_sub"
                    >
                      <i className="fa fa-list-ul"></i>
                    </li>
                    <li
                      // onClick={() => moveUp(item)}
                      className="agenda1appendBox_suggested"
                    >
                      <i
                        onClick={() => moveUp(item)}
                        className="fa-solid fa-turn-up"
                      ></i>
                    </li>
                    {/* <li
                      onClick={() => copyAgenda(item)}
                      className="agenda1appendBox_duplicate"
                    >
                      <FaRegCopy />
                    </li> */}
                    <li
                      className="agenda1appendBox_edit"
                    >
                      <button
                        onClick={() => handleShowModal(item, "sugst_topc")}
                        type="button"
                        className="icon medit border-0  bg-none "
                      // onClick={() => setShowModal(true)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      {/* <ExampleModal
                        item={item}
                        setStates={setStates}
                        agenda={"agenda"}
                      /> */}
                    </li>
                    <li
                      onClick={() => deleteAgenda2(item)}
                      className="agenda1appendBox__delete"
                    >
                      <FaTrash />
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          {Array.isArray(item.sub_items) &&
            item.sub_items.map((item, index) => (
              <div key={index} className="agenda1appendBoxpsubdiv">
                <ul className="list sortable ui-sortable">
                  <li
                    className="agenda1appendBoxp my-2"
                    data-order="96"
                    data-item="item"
                  >
                    <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                      <div className="agenda1appendBox__left d-flex align-item-center">
                        <div className="agenda1appendBox_drag ui-sortable-handle">
                          <i className="fa-solid fa-bars"></i>
                        </div>
                        <div className="agenda1appendBox_i">
                          <i className="fa-regular fa-circle"></i>
                        </div>
                        <div className="agenda1appendBox_txt">
                          <h6 className="m-0">{item.item_title}</h6>
                        </div>
                      </div>
                      <div className="agenda1appendBox__right">
                        <ul className="list d-flex align-item-center">
                          <li>
                            {typeof +item.item_timer === "number" ? (
                              <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                            ) : (
                              <div className="agenda1appendBox_time">
                                NaN:00
                              </div>
                            )}
                          </li>
                          <li className="agenda1appendBox_stop">
                            <i className="fa-solid fa-play"></i>
                          </li>
                          <li
                            onClick={() => addSubsubagenda2(item)}
                            className="agenda1appendBox_sub sub__loop"
                          >
                            <i className="fa fa-list-ul"></i>
                          </li>
                          {/* <li
                            onClick={() => copyAgenda(item)}
                            className="agenda1appendBox_duplicate"
                          >
                            {" "}
                            <FaRegCopy />
                          </li> */}
                          <li
                            // onClick={() => handleShowModal(item, "agenda")}
                            className="agenda1appendBox_edit"
                          >
                            <button
                              onClick={() => handleShowModal(item, "sugst_topc")}
                              type="button"
                              className="icon medit border-0  bg-none "
                            // onClick={() => setShowModal(true)}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            {/* <ExampleModal
                              item={item}
                              setStates={setStates}
                              agenda={"agenda"}
                            /> */}
                          </li>
                          <li
                            onClick={() => deleteAgenda2(item)}
                            className="agenda1appendBox__delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ">
                      <ul className="list sortable ui-sortable"></ul>
                    </div>
                  </li>
                </ul>
                {Array.isArray(item.sub_items) &&
                  item.sub_items.map((item, index) => (
                    <div key={index} className="agenda1appendBoxpsubdiv">
                      <ul className="list sortable">
                        <li
                          className="agenda1appendBoxp my-2"
                          data-order="19"
                          data-item="item"
                        >
                          <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                            <div className="agenda1appendBox__left d-flex align-item-center">
                              <div className="agenda1appendBox_drag ui-sortable-handle">
                                <i className="fa-solid fa-bars"></i>
                              </div>
                              <div className="agenda1appendBox_i">
                                <i className="fa-regular fa-circle"></i>
                              </div>
                              <div className="agenda1appendBox_txt">
                                <h6 className="m-0">{item.item_title}</h6>
                              </div>
                            </div>

                            <div className="agenda1appendBox__right">
                              <ul className="list d-flex align-item-center">
                                <li>
                                  {typeof +item.item_timer === "number" ? (
                                    <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                  ) : (
                                    <div className="agenda1appendBox_time">
                                      NaN:00
                                    </div>
                                  )}
                                </li>
                                <li className="agenda1appendBox_stop">
                                  <i className="fa-solid fa-play"></i>
                                </li>
                                {/* <li
                                  onClick={() => copyAgenda(item)}
                                  className="agenda1appendBox_duplicate"
                                >
                                  <FaRegCopy />
                                </li> */}
                                <li
                                  // onClick={() => handleShowModal(item, "agenda")}
                                  className="agenda1appendBox_edit"
                                >
                                  <button
                                    onClick={() => handleShowModal(item, "sugst_topc")}
                                    type="button"
                                    className="icon medit border-0  bg-none "
                                  // onClick={() => setShowModal(true)}
                                  >
                                    <i className="fa-solid fa-pen"></i>
                                  </button>
                                  {/* <ExampleModal
                                    item={item}
                                    setStates={setStates}
                                    agenda={"agenda"}
                                  /> */}
                                </li>
                                <li className="agenda1appendBox__delete">
                                  <i
                                    onClick={() => deleteAgenda2(item)}
                                    className="fa-solid fa-trash"
                                  ></i>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ"></div>
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  };


  const moveViewAgendaListItem = useCallback(
    (dragIndex, hoverIndex) => {
      if (dragIndex !== hoverIndex) {
        const dragItem = viewAgenda[dragIndex];
        const hoverItem = viewAgenda[hoverIndex];

        // Swap places of dragItem and hoverItem in the viewAgenda array
        setViewagenda((viewAgenda) => {
          const updatedviewAgenda = [...viewAgenda];
          updatedviewAgenda[dragIndex] = hoverItem;
          updatedviewAgenda[hoverIndex] = dragItem;
          return updatedviewAgenda;
        });

        const updatedviewAgenda = [...viewAgenda];
        updatedviewAgenda[dragIndex] = hoverItem;
        updatedviewAgenda[hoverIndex] = dragItem;
        const formdata = new FormData()
        formdata.append("meeting_id", id)
        formdata.append("uMeet21", "typeAgendaSort")
        formdata.append("typeAgendaSort", "typeAgendaSort")
        formdata.append("type", "agenda")
        Array.isArray(updatedviewAgenda) && updatedviewAgenda.map((obj, index) => {
          console.log(`sort_item[${obj.db_id}]`, index + 1);
          formdata.append(`sort_items[${obj.db_id}]`, index + 1)
        })
        apiMethod_postDragAndDropAgenda("postDragAndDropAgenda", formdata)



      }
    },
    [viewAgenda]
  );
  const moveViewAgendaListItem2 = useCallback(
    (dragIndex, hoverIndex) => {
      if (dragIndex !== hoverIndex) {
        const dragItem = viewAgenda2[dragIndex];
        const hoverItem = viewAgenda2[hoverIndex];

        // Swap places of dragItem and hoverItem in the viewAgenda array
        setViewagenda2((viewAgenda2) => {
          const updatedviewAgenda = [...viewAgenda2];
          updatedviewAgenda[dragIndex] = hoverItem;
          updatedviewAgenda[hoverIndex] = dragItem;
          return updatedviewAgenda;
        });

        const updatedviewAgenda = [...viewAgenda2];
        updatedviewAgenda[dragIndex] = hoverItem;
        updatedviewAgenda[hoverIndex] = dragItem;
        const formdata = new FormData()
        formdata.append("meeting_id", id)
        formdata.append("uMeet21", "typeAgendaSort")
        formdata.append("typeAgendaSort", "typeAgendaSort")
        formdata.append("type", "sugst_topc")
        Array.isArray(updatedviewAgenda) && updatedviewAgenda.map((obj, index) => {
          console.log(`sort_item[${obj.db_id}]`, index + 1);
          formdata.append(`sort_items[${obj.db_id}]`, index + 1)
        })
        apiMethod_postDragAndDropAgenda2("postDragAndDropAgenda", formdata)
      }
    },
    [viewAgenda2]
  );

  return (
    <div className="MeetingPage">
      <div className="container-fluid">
        <Formik >
          <Form name="myform">
            <Modal show={openModal} onHide={() => setOpenModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Upload Image
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="show-grid">
                <div className="card-body">
                  <div className="card-body p-2">
                    <div className="row clearfix">
                      <div className="col-md-12  mb-2">
                        <File
                          onUpload={handleFileUploadMedia}
                          label="Upload Media"
                          name={"upload_media"}
                          typeFile=".jpg,.jpeg,.png,.gif,.bmp,.tif,.tiff,.mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.mpeg,.mpg,.3gp"
                        />
                      </div>
                      <div className="my-2">
                        <FormControl
                          className="form-control my-1"
                          selectList={follower_select_list}
                          label={"Followers"}
                          name="follower_select2"
                          control="select"
                          firstSelect={"--select--"}
                          onChange={(e) =>
                            setfollowerSelectValueMedia(e.target.value)
                          }
                        ></FormControl>
                      </div>
                      {followerSelectValueMedia == "Custom" && (
                        <div className="my-2">
                          <label>
                            <b>Choose Follower</b>
                          </label>
                          <div className="margin_bottom">
                            <Select
                              mode="multiple"
                              filterOption={true}
                              onSearch={(v) => {
                                onSearchFollowerMedia(v);
                              }}
                              onChange={(v, v2) => {
                                let a = v2.map((item) => {
                                  return item.key;
                                });
                                setselectedFollowerMedia(a);
                              }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={"type follower name"}
                            >
                              {resowner.data &&
                                !resowner.data.message &&
                                resowner.data.map(({ uname, id, text }) => (
                                  <Select.Option value={uname} key={id}>
                                    {uname}
                                  </Select.Option>
                                ))}
                            </Select>
                          </div>
                        </div>
                      )}
                      {followerSelectValueMedia == "Role" && (
                        <div>
                          <select
                            className="form-control"
                            onChange={(e) =>
                              setselectedFollowerMediaRole([e.target.value])
                            }
                          >
                            <option hidden> --select--</option>
                            <Role obj={redata?.CEO} />
                          </select>
                        </div>
                      )}

                      <div className="my-2">
                        <label>
                          <b>Category</b>
                        </label>

                        <Select
                          mode="multiple"
                          onChange={(v, v2) => {
                            subbbMedia(v, v2);
                          }}
                          style={{ width: "100%", height: 40 }}
                          placeholder={"type follower name"}
                          filterOption={(input, option) =>
                            (option?.children ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {category_select_listMedia.length &&
                            category_select_listMedia.map(
                              ({ label, value }) => (
                                <Select.Option value={value} key={value}>
                                  {label}
                                </Select.Option>
                              )
                            )}
                        </Select>
                      </div>

                      <div className="my-2">
                        <label>
                          <b>Sub Category</b>
                        </label>

                        <Select
                          mode="multiple"
                          onChange={(v) => {
                            setsubCat_selectedMedia(v);
                            console.log(v);
                          }}
                          style={{ width: "100%", height: 40 }}
                          placeholder={"sub category"}
                          filterOption={(input, option) =>
                            (option?.children ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {subCategoryselectMedia.length &&
                            subCategoryselectMedia.map(({ label, value }) => (
                              <Select.Option value={value} key={value}>
                                {label}
                              </Select.Option>
                            ))}
                        </Select>
                      </div>
                    </div>
                    {/* {!assetsFile ? (
                        <Skeleton count={5} />
                      ) : assetsFile.message != "No Data Found" ? (
                        <div className="table-responsive">
                          <div className="row row-cards">
                            {assetsFile && Array.isArray(assetsFile) && assetsFile?.map((items, i) => {
                              const noteDate = moment(items.file_created_date);
                              const currentDate = moment();
                              const diffInMinutes = currentDate.diff(noteDate, 'minutes');
                              const diffInHours = currentDate.diff(noteDate, 'hours');
                              const diffInDays = currentDate.diff(noteDate, 'days');
                              const diffInMonths = currentDate.diff(noteDate, 'months');
                              const diffInYears = currentDate.diff(noteDate, 'years');
                              let relativeDate = '';
                              if (diffInMinutes < 60) {
                                relativeDate = `${diffInMinutes} min ago`;
                              } else if (diffInHours < 24) {
                                relativeDate = `${diffInHours} hour ago`;
                              } else if (diffInDays < 30) {
                                relativeDate = `${diffInDays} day ago`;
                              } else if (diffInMonths < 12) {
                                relativeDate = `${diffInMonths} month ago`;
                              } else {
                                relativeDate = `${diffInYears} year ago`;
                              }
                              return items.file_type === 'Media' ? (
                                <div className="col-sm-6 col-lg-5 card_margin_left" key={i}>
                                  <div className="card card__media p-1 card-custom">
                                    <img className="media_image_height" src={items.file_value && items.file_value.includes("http") ? items.file_value : `${config.baseurl2}${items.file_value} `} alt="" />

                                    <div className="d-flex align-items-center px-2 mt-3">
                                      <img style={{ width: 50, height: 50, borderRadius: 25, marginRight: "10px" }}
                                        src={
                                          items?.fileOwnerData[0]?.avatar &&
                                            items?.fileOwnerData[0]?.avatar.includes("http")
                                            ? items?.fileOwnerData[0]?.avatar
                                            : `${config.baseurl2}${items?.fileOwnerData[0]?.avatar} `
                                        }
                                        alt=""
                                      />
                                      <div>
                                        <div> {Translation(translations, 'Super Admin')}</div>
                                        <small className="d-block text-muted">{Translation(translations, `${relativeDate}`)}</small>
                                      </div>
                                      <div className="ml-auto text-muted ">
                                        {leadPermission?.super_admin == "1" || leadPermission?.filesnmedia_module?.edit == "1" ? (

                                          <FiEdit className="editcustom_view" />
                                        ) : null}
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center justify-content-between px-2">
                                      <div><b>{Translation(translations, 'File Size')}:</b><br /> {items.file_size}</div>
                                    </div>
                                  </div>

                                </div>
                              ) : ""
                            })
                            }
                          </div>
                        </div>
                      ) : (
                        " No Data"
                      )} */}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="btn btn-default box_shadow"
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>

            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    {permissions?.id == meetingCreateiD ? (
                      <div>
                        <button
                          disabled={isActive}
                          onClick={handleStart}
                          type="button"
                          className="btn meetingstart btn-success ml-2"
                        >
                          Start Meeting
                        </button>
                        <button
                          disabled={!isActive}
                          onClick={handleStop}
                          type="button"
                          className="btn meetingstop btn-secondary ml-2"
                        >
                          Stop Meeting
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    <button
                      type="button"
                      className="btn btn-success ml-2 d-flex"
                      id="timer"
                    >
                      Scheduled {userTime}
                    </button>
                    <div className="card-options align-item-center">
                      <button type="button" className="btn btn-secondary">
                        <i className="fa fa-comments"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary ml-2"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-list text-muted"></i> Minutes
                        Meeting
                      </button>
                      <div className="dropdown-menu">
                        <Link to={"#"} className="dropdown-item"></Link>
                      </div>
                      <div className="item-action dropdown ml-2">
                        <Dropdown className="item-action dropdown ml-2">
                          <div className="none">
                            <Dropdown.Toggle className="">
                              <i
                                style={{ color: "#000" }}
                                className="fe fe-more-vertical"
                              ></i>
                            </Dropdown.Toggle>
                          </div>
                          <Dropdown.Menu>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                              Edit Metting
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-cloud-download"></i>{" "}
                              Finish Meeting
                            </Dropdown.Item>
                            <hr />
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-copy"></i>{" "}
                              Manage Attendees
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-folder"></i>{" "}
                              Duplicate Meeting
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-edit"></i> Copy
                              Meeting Link
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-edit"></i>{" "}
                              Cancel Meeting
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-trash"></i>{" "}
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        ></div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                            Edit Meeting
                          </Link>
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                            Edit Meeting
                          </Link>
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                            Edit Meeting
                          </Link>
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                            Edit Meeting
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* : ''
            } */}
            <div className="card card-collapsed">
              <div className="card-status bg-blue"></div>
              <div className="card-header">
                <h3 className="card-title">Description</h3>
                <div className="card-options">
                  <a
                    onClick={handleToggle}
                    className="card-options-collapse nxs"
                    data-toggle="card-collapse"
                  >
                    <i className="fe fe-chevron-down"></i>
                  </a>
                  <a
                    onClick={handleFullScreen}
                    className="card-options-fullscreen nxs"
                    data-toggle="card-fullscreen"
                  >
                    <i className="fe fe-maximize"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">
                {decNotes === null || decNotes === undefined ? (
                  <CKEditor
                    config={{
                      extraPlugins: [uploadPlugin],
                    }}
                    editor={ClassicEditor}
                    onReady={(editor) => { }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setdECvalue(data, event, editor);
                    }}
                  />
                ) : (
                  // <CKEditor
                  //   config={{
                  //     extraPlugins: [uploadPlugin],
                  //   }}
                  //   editor={ClassicEditor}
                  //   onReady={(editor) => { }}
                  //   onChange={(event, editor) => {
                  //     const data = editor.getData();
                  //     setdECvalue(data, event, editor);
                  //   }}
                  //   data={decNotes}
                  // />
                  null
                )}

                <div className="text-right mt-2 mb-4">
                  <button
                    onClick={updatesNotes}
                    type="button"
                    className="btn btn-primary btn-sm mnote"
                    id="false"
                  >
                    Update Note
                  </button>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="card box_shadow card-collapsed">
                  <div className="card-status bg-blue"></div>

                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-users text-muted"></i> Overview
                      <small>Meeting Details</small>
                    </h3>
                    <div className="card-options">
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body justify-content-center">
                    <ul className="nav nav-tabs page-header-tab">
                      <li className="nav-item">
                        <Link
                          className="nav-link active show"
                          data-toggle="tab"
                        >
                          General
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane active show" id="General">
                        <div className="card box_shadow">
                          <div className="card-body">
                            <h3 className="card-title mb-3">Summary</h3>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  Main Objective{" "}
                                </label>{" "}
                                <textarea
                                  className="form-control"
                                  name="Main_Objective"
                                  data-title="Main Objective"
                                  placeholder=""
                                  rows="10"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right mt-3 mb-0">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm mdetl box_shadow"
                          id="true"
                        >
                          Update Details
                        </button>{" "}
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-list text-muted"></i> Agenda
                      <small>Meeting Plan</small>
                    </h3>
                    <div className="card-options">
                      <button
                        type="button"
                        className="btn btn-icon btn-primary btn-success"
                      >
                        <i className="fe fe-bell"></i>
                      </button>
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                      <a>
                        <i
                          className="fa fa-plus"
                          data-toggle="tooltip"
                          data-placement="right"
                          title=""
                          data-original-title="Upload New"
                        ></i>
                      </a>
                      <div className="">
                        <Dropdown>
                          <div className="none">
                            <Dropdown.Toggle className="dropDown_li_Style">
                              <i
                                style={{ color: "#000" }}
                                className="fe fe-more-vertical"
                              ></i>
                            </Dropdown.Toggle>
                          </div>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-eye"></i> View
                              Details
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                              Share
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-cloud-download"></i>{" "}
                              Download
                            </Dropdown.Item>
                            <hr />
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-copy"></i> Copy
                              to
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-folder"></i>{" "}
                              Move to
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-edit"></i>{" "}
                              Rename
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <i className="dropdown-icon fa fa-trash"></i>{" "}
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-eye"></i>
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row clearfix agenda1append">
                      <div className="col-lg-9 col-md-8">
                        <div className="form-group">
                          <input
                            onChange={handleInputChange}
                            type="text"
                            className="form-control agenda1appendinputtxt"
                            name="example-text-input"
                            placeholder="What do you want to discuss?"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <input
                            onChange={(e) => setAgendanumVal(e.target.value)}
                            type="number"
                            className="form-control agenda1appendinputmin"
                            name="example-text-input"
                            placeholder="Time"
                          />
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-2">
                        <button
                          onClick={createAgenda}
                          type="button"
                          className="btn btn-icon btn-primary btn-success agenda1appendbtnadd"
                        >
                          <i className="fe fe-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="dargex">
                      <DndProvider backend={HTML5Backend}>
                        {Array.isArray(viewAgenda) &&
                          viewAgenda.map((item, index) => (
                            <ListItem
                              key={item.db_id}
                              index={index}
                              text={item.item_title}
                              moveListItem={moveViewAgendaListItem}
                              item={item}
                            />
                          ))}
                        {/* <List viewAgenda={viewAgenda} setViewagenda={setViewagenda}/> */}
                      </DndProvider>
                    </div>

                    {/* {Array.isArray(viewAgenda) &&
                      viewAgenda.map((item, index) => (
                        <div key={index} className="relative" draggable>
                          <ul className="agenda1appendBox list">
                            <li className="mb-2 agenda1appendBoxp">
                              <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                <div className="agenda1appendBox__left d-flex align-item-center">
                                  <div className="agenda1appendBox_drag ">
                                    <FaBars />
                                  </div>
                                  <div className="agenda1appendBox_i">
                                    <FaRegCircle />
                                  </div>
                                  <div className="agenda1appendBox_txt">
                                    <h6 className="m-0">{item.item_title}</h6>
                                  </div>
                                </div>
                                <div className="agenda1appendBox__right">
                                  <ul className="list d-flex align-item-center">
                                    <li>
                                      {typeof +item.item_timer === "number" ? (
                                        <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                      ) : (
                                        <div className="agenda1appendBox_time">
                                          NaN:00
                                        </div>
                                      )}
                                    </li>
                                    <li className="agenda1appendBox_stop">
                                      <FaPlay />
                                    </li>
                                    <li
                                      onClick={() => addSubagenda(item)}
                                      className="agenda1appendBox_sub"
                                    >
                                      <i className="fa fa-list-ul"></i>
                                    </li>
                                    <li
                                      onClick={() => moveDown(item)}
                                      className="agenda1appendBox_suggested"
                                    >
                                      <FaLevelDownAlt />
                                    </li>
                                    <li
                                      onClick={() => copyAgenda(item)}
                                      className="agenda1appendBox_duplicate"
                                    >
                                      <FaRegCopy />
                                    </li>
                                    <li
                                      onClick={handleShowModal}
                                      className="agenda1appendBox_edit"
                                    >
                                      <ExampleModal
                                        item={item}
                                        setStates={setStates}
                                        agenda={"agenda"}
                                      />
                                    </li>
                                    <li
                                      onClick={() => deleteAgenda(item)}
                                      className="agenda1appendBox__delete"
                                    >
                                      <FaTrash />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                          </ul>
                          {Array.isArray(item.sub_items) &&
                            item.sub_items.map((item, index) => (
                              <div
                                key={index}
                                className="agenda1appendBoxpsubdiv"
                              >
                                <ul className="list sortable ui-sortable">
                                  <li
                                    className="agenda1appendBoxp my-2"
                                    data-order="96"
                                    data-item="item"
                                  >
                                    <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                      <div className="agenda1appendBox__left d-flex align-item-center">
                                        <div className="agenda1appendBox_drag ui-sortable-handle">
                                          <i className="fa-solid fa-bars"></i>
                                        </div>
                                        <div className="agenda1appendBox_i">
                                          <i className="fa-regular fa-circle"></i>
                                        </div>
                                        <div className="agenda1appendBox_txt">
                                          <h6 className="m-0">
                                            {item.item_title}
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="agenda1appendBox__right">
                                        <ul className="list d-flex align-item-center">
                                          <li>
                                            {typeof +item.item_timer ===
                                            "number" ? (
                                              <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                            ) : (
                                              <div className="agenda1appendBox_time">
                                                NaN:00
                                              </div>
                                            )}
                                          </li>
                                          <li className="agenda1appendBox_stop">
                                            <i className="fa-solid fa-play"></i>
                                          </li>
                                          <li
                                            onClick={() =>
                                              addSubsubagenda(item)
                                            }
                                            className="agenda1appendBox_sub sub__loop"
                                          >
                                            <i className="fa fa-list-ul"></i>
                                          </li>
                                          <li
                                            onClick={() => copyAgenda(item)}
                                            className="agenda1appendBox_duplicate"
                                          >
                                            {" "}
                                            <FaRegCopy />
                                          </li>
                                          <li
                                            onClick={handleShowModal}
                                            className="agenda1appendBox_edit"
                                          >
                                            <ExampleModal
                                              item={item}
                                              setStates={setStates}
                                              agenda={"agenda"}
                                            />
                                          </li>
                                          <li
                                            onClick={() => deleteAgenda(item)}
                                            className="agenda1appendBox__delete"
                                          >
                                            <i className="fa-solid fa-trash"></i>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ">
                                      <ul className="list sortable ui-sortable"></ul>
                                    </div>
                                  </li>
                                </ul>
                                {Array.isArray(item.sub_items) &&
                                  item.sub_items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="agenda1appendBoxpsubdiv"
                                    >
                                      <ul className="list sortable">
                                        <li
                                          className="agenda1appendBoxp my-2"
                                          data-order="19"
                                          data-item="item"
                                        >
                                          <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                            <div className="agenda1appendBox__left d-flex align-item-center">
                                              <div className="agenda1appendBox_drag ui-sortable-handle">
                                                <i className="fa-solid fa-bars"></i>
                                              </div>
                                              <div className="agenda1appendBox_i">
                                                <i className="fa-regular fa-circle"></i>
                                              </div>
                                              <div className="agenda1appendBox_txt">
                                                <h6 className="m-0">
                                                  {item.item_title}
                                                </h6>
                                              </div>
                                            </div>

                                            <div className="agenda1appendBox__right">
                                              <ul className="list d-flex align-item-center">
                                                <li>
                                                  {typeof +item.item_timer ===
                                                  "number" ? (
                                                    <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                                  ) : (
                                                    <div className="agenda1appendBox_time">
                                                      NaN:00
                                                    </div>
                                                  )}
                                                </li>
                                                <li className="agenda1appendBox_stop">
                                                  <i className="fa-solid fa-play"></i>
                                                </li>
                                                <li
                                                  onClick={() =>
                                                    copyAgenda(item)
                                                  }
                                                  className="agenda1appendBox_duplicate"
                                                >
                                                  <FaRegCopy />
                                                </li>
                                                <li
                                                  onClick={handleShowModal}
                                                  className="agenda1appendBox_edit"
                                                >
                                                  <ExampleModal
                                                    item={item}
                                                    setStates={setStates}
                                                    agenda={"agenda"}
                                                  />
                                                </li>
                                                <li className="agenda1appendBox__delete">
                                                  <i
                                                    onClick={() =>
                                                      deleteAgenda(item)
                                                    }
                                                    className="fa-solid fa-trash"
                                                  ></i>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ"></div>
                                        </li>
                                      </ul>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </div>
                      ))} */}

                    <div>Suggested Topics</div>
                    <div className="dropdown-divider"></div>
                    <div className="row clearfix agenda2append">
                      <div className="col-lg-9 col-md-8">
                        <div className="form-group">
                          <input
                            onChange={(e) => setSuggested(e.target.value)}
                            type="text"
                            className="form-control agenda1appendinputtxt"
                            name="example-text-input"
                            placeholder="What do you want to discuss?"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <input
                            onChange={(e) => setSuggestedNum(e.target.value)}
                            type="number"
                            className="form-control agenda1appendinputmin"
                            name="example-text-input"
                            placeholder="Time"
                          />
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-2">
                        <button
                          onClick={createSuggestedAgenda}
                          type="button"
                          className="btn btn-icon btn-primary btn-success agenda1appendbtnadd"
                        >
                          <i className="fe fe-plus"></i>
                        </button>
                      </div>
                    </div>
                    {/* updated code ........................................................................................  */}
                    <div className="dargex">
                      <DndProvider backend={HTML5Backend}>
                        {Array.isArray(viewAgenda2) &&
                          viewAgenda2.map((item, index) => (
                            <ListItem2
                              key={item.db_id}
                              index={index}
                              text={item.item_title}
                              moveListItem={moveViewAgendaListItem2}
                              item={item}
                            />
                          ))}
                        {/* <List viewAgenda={viewAgenda} setViewagenda={setViewagenda}/> */}
                      </DndProvider>
                    </div>
                    {/* {Array.isArray(viewAgenda2) &&
                      viewAgenda2.map((item, index) => (
                        <div key={index} className="relative">
                          <ul className="agenda1appendBox list">
                            <li className="mb-2 agenda1appendBoxp">
                              <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                <div className="agenda1appendBox__left d-flex align-item-center">
                                  <div className="agenda1appendBox_drag ">
                                    <FaBars />
                                  </div>
                                  <div className="agenda1appendBox_i">
                                    <FaRegCircle />
                                  </div>
                                  <div className="agenda1appendBox_txt">
                                    <h6 className="m-0">{item.item_title}</h6>
                                  </div>
                                </div>
                                <div className="agenda1appendBox__right">
                                  <ul className="list d-flex align-item-center">
                                    <li>
                                      {typeof +item.item_timer === "number" ? (
                                        <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                      ) : (
                                        <div className="agenda1appendBox_time">
                                          NaN:00
                                        </div>
                                      )}
                                    </li>
                                    <li className="agenda1appendBox_stop">
                                      <FaPlay />
                                    </li>
                                    <li
                                      onClick={() => addSubagenda2(item)}
                                      className="agenda1appendBox_sub"
                                    >
                                      <i className="fa fa-list-ul"></i>
                                    </li>
                                    <li className="agenda1appendBox_suggested">
                                      <i
                                        onClick={() => moveUp(item)}
                                        className="fa-solid fa-turn-up"
                                      ></i>
                                    </li>
                                    <li
                                      className="agenda1appendBox_edit"
                                    >
                                      <button
                                        onClick={() => handleShowModal(item, "suggested")}
                                        type="button"
                                        className="icon medit border-0  bg-none "
                                      onClick={() => setShowModal(true)}
                                      >
                                        <i className="fa-solid fa-pen"></i>
                                      </button>
                                      <ExampleModal
                                        item={item}
                                        seTsuggested={seTsuggested}
                                        agenda={"suggested"}
                                      />
                                    </li>
                                    <li
                                      onClick={() => deleteAgenda2(item)}
                                      className="agenda1appendBox__delete"
                                    >
                                      <FaTrash />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                          </ul>
                          {Array.isArray(item.sub_items) &&
                            item.sub_items.map((item, index) => (
                              <div
                                key={index}
                                className="agenda1appendBoxpsubdiv"
                              >
                                <ul className="list sortable ui-sortable">
                                  <li
                                    className="agenda1appendBoxp my-2"
                                    data-order="96"
                                    data-item="item"
                                  >
                                    <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                      <div className="agenda1appendBox__left d-flex align-item-center">
                                        <div className="agenda1appendBox_drag ui-sortable-handle">
                                          <i className="fa-solid fa-bars"></i>
                                        </div>
                                        <div className="agenda1appendBox_i">
                                          <i className="fa-regular fa-circle"></i>
                                        </div>
                                        <div className="agenda1appendBox_txt">
                                          <h6 className="m-0">
                                            {item.item_title}
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="agenda1appendBox__right">
                                        <ul className="list d-flex align-item-center">
                                          <li>
                                            {typeof +item.item_timer ===
                                              "number" ? (
                                              <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                            ) : (
                                              <div className="agenda1appendBox_time">
                                                NaN:00
                                              </div>
                                            )}
                                          </li>
                                          <li className="agenda1appendBox_stop">
                                            <i className="fa-solid fa-play"></i>
                                          </li>
                                          <li
                                            onClick={() =>
                                              addSubsubagenda2(item)
                                            }
                                            className="agenda1appendBox_sub sub__loop"
                                          >
                                            <i className="fa fa-list-ul"></i>
                                          </li>
                                          <li
                                            className="agenda1appendBox_edit"
                                          >
                                            <button
                                              onClick={() => handleShowModal(item, "suggested")}
                                              type="button"
                                              className="icon medit border-0  bg-none "
                                            // onClick={() => setShowModal(true)}
                                            >
                                              <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <ExampleModal
                                              item={item}
                                              agenda={"suggested"}
                                              seTsuggested={seTsuggested}
                                            />
                                          </li>
                                          <li
                                            onClick={() => deleteAgenda2(item)}
                                            className="agenda1appendBox__delete"
                                          >
                                            <i className="fa-solid fa-trash"></i>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ">
                                      <ul className="list sortable ui-sortable"></ul>
                                    </div>
                                  </li>
                                </ul>
                                {Array.isArray(item.sub_items) &&
                                  item.sub_items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="agenda1appendBoxpsubdiv"
                                    >
                                      <ul className="list sortable">
                                        <li
                                          className="agenda1appendBoxp my-2"
                                          data-order="19"
                                          data-item="item"
                                        >
                                          <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                            <div className="agenda1appendBox__left d-flex align-item-center">
                                              <div className="agenda1appendBox_drag ui-sortable-handle">
                                                <i className="fa-solid fa-bars"></i>
                                              </div>
                                              <div className="agenda1appendBox_i">
                                                <i className="fa-regular fa-circle"></i>
                                              </div>
                                              <div className="agenda1appendBox_txt">
                                                <h6 className="m-0">
                                                  {item.item_title}
                                                </h6>
                                              </div>
                                            </div>

                                            <div className="agenda1appendBox__right">
                                              <ul className="list d-flex align-item-center">
                                                <li>
                                                  {typeof +item.item_timer ===
                                                    "number" ? (
                                                    <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                                  ) : (
                                                    <div className="agenda1appendBox_time">
                                                      NaN:00
                                                    </div>
                                                  )}
                                                </li>
                                                <li className="agenda1appendBox_stop">
                                                  <i className="fa-solid fa-play"></i>
                                                </li>
                                                <li
                                                  className="agenda1appendBox_edit"
                                                >
                                                  <button
                                                    onClick={() => handleShowModal(item, "suggested")}
                                                    type="button"
                                                    className="icon medit border-0  bg-none "
                                                  // onClick={() => setShowModal(true)}
                                                  >
                                                    <i className="fa-solid fa-pen"></i>
                                                  </button>
                                                  <ExampleModal
                                                    item={item}
                                                    setStates={setStates}
                                                    agenda={"suggested"}
                                                    seTsuggested={seTsuggested}
                                                  />
                                                </li>
                                                <li className="agenda1appendBox__delete">
                                                  <i
                                                    onClick={() =>
                                                      deleteAgenda2(item)
                                                    }
                                                    className="fa-solid fa-trash"
                                                  ></i>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ"></div>
                                        </li>
                                      </ul>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </div>
                      ))} */}
                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-sticky-note text-muted"></i> Notes{" "}
                      <small>Notes About the Meeting</small>
                    </h3>
                    <div className="card-options">
                      <button
                        type="button"
                        onClick={() => {
                          setnotes_privacy(!notes_privacy);
                        }}
                        className="btn btn-icon"
                      >
                        {" "}
                        {notes_privacy ? (
                          <HiOutlineLockClosed />
                        ) : (
                          <HiOutlineLockOpen />
                        )}
                      </button>
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <CKEditor
                      config={{
                        extraPlugins: [uploadPlugin],
                      }}
                      editor={ClassicEditor}
                      onReady={(editor) => { }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        seteditorvalue(data, event, editor);
                      }}
                    />
                    <div className="text-right mt-2 mb-4">
                      <button
                        onClick={createNotes}
                        type="button"
                        className="btn btn-primary btn-sm mnote"
                        id="false"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                  <div className="card_meeting_notes" id="card_meeting_notes">
                    <div className="card-body">
                      <div className="meeting_notes">
                        <ul className="recent_comments list-unstyled">
                          {notesApi.isLoading ?

                            <span className="span_loader">
                              <i className="fa fa-pulse fa-spinner"></i>
                            </span>
                            : Array.isArray(notes) &&
                            notes.map((item, index) => {
                              //  console.log(new Date(dayjs.tz(item.note_date,permissions["system-user_timezone"]?.setting_value).tz()))
                              const noteDate = moment((item.note_date));
                              const currentDate = moment();
                              const diffInMinutes = currentDate.diff(
                                noteDate,
                                "minutes"
                              );
                              const diffInHours = currentDate.diff(
                                noteDate,
                                "hours"
                              );
                              const diffInDays = currentDate.diff(
                                noteDate,
                                "days"
                              );
                              const diffInMonths = currentDate.diff(
                                noteDate,
                                "months"
                              );
                              const diffInYears = currentDate.diff(
                                noteDate,
                                "years"
                              );
                              let relativeDate = "";
                              if (diffInMinutes < 60) {
                                relativeDate = `${diffInMinutes} min ago`;
                              } else if (diffInHours < 24) {
                                relativeDate = `${diffInHours} hour ago`;
                              } else if (diffInDays < 30) {
                                relativeDate = `${diffInDays} day ago`;
                              } else if (diffInMonths < 12) {
                                relativeDate = `${diffInMonths} month ago`;
                              } else {
                                relativeDate = `${diffInYears} year ago`;
                              }
                              return (
                                <li key={index}>
                                  <div className="avatar_img">
                                    <img
                                      className="rounded img-fluid"
                                      src={
                                        item?.avatar &&
                                          item?.avatar.includes("http")
                                          ? item?.avatar
                                          : `${config.baseurl2}${item?.avatar} `
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="comment_body">
                                    <h6 className="">
                                      {`${item.f_name} ${item.l_name}`}
                                      {item.note_privacy === "1" && (
                                        <span className="text-left ml-1">
                                          {" "}
                                          <span className="tag tag-danger">
                                            Private Note
                                          </span>{" "}
                                        </span>
                                      )}{" "}
                                      <small
                                        className="float-right"
                                        title={noteDate.format(" ")}
                                      >
                                        {relativeDate}
                                      </small>
                                    </h6>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: item.note_value,
                                      }}
                                    ></p>
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-calendar-check-o text-muted"></i>{" "}
                      Actions
                    </h3>
                    <div className="card-options">
                      <button
                        type="button"
                        className="btn btn-icon btn-primary"
                      >
                        <i className="fe fe-lock"></i>
                      </button>
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">

                    {/* <div className="row clearfix agenda1append">
                      <div className="col-lg-1 col-md-2">
                        <div className="form-group">
                          <button
                            type="button"
                            className="btn btn-secondary dropdown-toggle actionButton"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fe fe-calendar"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6">
                        <div className="form-group">
                          <input
                            onChange={(e) => setActioninput(e.target.value)}
                            type="text"
                            className="form-control agenda1appendinputtxt"
                            name="example-text-input"
                            placeholder="What do you need to get done?"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <Select
                            placeholder="Select"
                            style={{
                              width: "100%",
                            }}
                            // onChange={handleChange}
                            options={[
                              {
                                value: "Lead",
                                label: "Lead",
                              },
                              {
                                value: "Prospect",
                                label: "Prospect",
                              },
                              {
                                value: "Signature",
                                label: "Signature",
                              },
                              {
                                value: "Opportunity",
                                label: "Opportunity",
                              },
                              {
                                value: "Actions",
                                label: "Actions",
                              },
                              {
                                value: "Follow Up",
                                label: "Follow Up",
                              },
                              {
                                value: "Client",
                                label: "Client",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <Select
                            placeholder="Select"
                            style={{
                              width: "100%",
                            }}
                            // onChange={handleChange}
                            options={[
                              {
                                value: "Lead",
                                label: "Lead",
                              },
                              {
                                value: "Prospect",
                                label: "Prospect",
                              },
                              {
                                value: "Signature",
                                label: "Signature",
                              },
                              {
                                value: "Opportunity",
                                label: "Opportunity",
                              },
                              {
                                value: "Actions",
                                label: "Actions",
                              },
                              {
                                value: "Follow Up",
                                label: "Follow Up",
                              },
                              {
                                value: "Client",
                                label: "Client",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-2">
                        {" "}
                        <img className="avatar" src="" />
                      </div>
                      <div className="col-lg-1 col-md-2">
                        <button
                          type="button"
                          className="btn btn-icon btn-primary btn-success agenda1appendbtnadd"
                        >
                          <i className="fe fe-plus"></i>
                        </button>
                      </div>
                    </div> */}
                    <EditLeadAction
                      actionData={Action_Pipelines}
                      Id={id}
                      modules={"meeting"}
                      WebSocketAction={sendJsonMessage}
                    // datasAction={leadData}
                    />
                    <div className="row">
                      {Array.isArray(Action_list) && (
                        <ActionCard
                          lists={Action_list}
                          actionData={Action_Pipelines}
                        // datasAction={leadData}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-film text-muted"></i> Media
                    </h3>
                    <div className="card-options">
                      <button type="button" className="btn btn-icon nxss">
                        <i className="fe fe-lock"></i>
                      </button>
                      <button
                        onClick={MediaSubmit}
                        type="button"
                        className="btn btn-icon nxss"
                        id="false"
                        data-toggle="tooltip"
                      >
                        <i className="fe fe-upload"></i>
                      </button>
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body p-2">
                      {/* updated code ..........................................................\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\///////////////////// */}

                      <div className="card-body">
                        <div className="card-body p-2">
                          <div className="row clearfix">
                            <div className="col-md-12  mb-2">
                              <File
                                onUpload={handleFileUploadMedia}
                                label="Upload Media"
                                name={"upload_media"}
                                typeFile=".jpg,.jpeg,.png,.gif,.bmp,.tif,.tiff,.mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.mpeg,.mpg,.3gp"
                              />
                            </div>
                            <div className="my-2">
                              <FormControl
                                className="form-control my-1"
                                selectList={follower_select_list}
                                label={"Followers"}
                                name="follower_select2"
                                control="select"
                                firstSelect={"--select--"}
                                onChange={(e) =>
                                  setfollowerSelectValueMedia(e.target.value)
                                }
                              ></FormControl>
                            </div>
                            {followerSelectValueMedia == "Custom" && (
                              <div className="my-2">
                                <label>
                                  <b>Choose Follower</b>
                                </label>
                                <div className="margin_bottom">
                                  <Select
                                    mode="multiple"
                                    filterOption={true}
                                    onSearch={(v) => {
                                      onSearchFollowerMedia(v);
                                    }}
                                    onChange={(v, v2) => {
                                      let a = v2.map((item) => {
                                        return item.key;
                                      });
                                      setselectedFollowerMedia(a);
                                    }}
                                    style={{ width: "100%", height: 40 }}
                                    placeholder={"type follower name"}
                                  >
                                    {resowner.data &&
                                      !resowner.data.message &&
                                      resowner.data.map(({ uname, id, text }) => (
                                        <Select.Option value={uname} key={id}>
                                          {uname}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </div>
                              </div>
                            )}
                            {followerSelectValueMedia == "Role" && (
                              <div>
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setselectedFollowerMediaRole([e.target.value])
                                  }
                                >
                                  <option hidden> --select--</option>
                                  <Role obj={redata?.CEO} />
                                </select>
                              </div>
                            )}

                            <div className="my-2">
                              <label>
                                <b>Category</b>
                              </label>

                              <Select
                                mode="multiple"
                                onChange={(v, v2) => {
                                  subbbMedia(v, v2);
                                }}
                                style={{ width: "100%", height: 40 }}
                                placeholder={"type follower name"}
                                filterOption={(input, option) =>
                                  (option?.children ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                              >
                                {category_select_listMedia.length &&
                                  category_select_listMedia.map(
                                    ({ label, value }) => (
                                      <Select.Option value={value} key={value}>
                                        {label}
                                      </Select.Option>
                                    )
                                  )}
                              </Select>
                            </div>

                            <div className="my-2">
                              <label>
                                <b>Sub Category</b>
                              </label>

                              <Select
                                mode="multiple"
                                onChange={(v) => {
                                  setsubCat_selectedMedia(v);
                                  console.log(v);
                                }}
                                style={{ width: "100%", height: 40 }}
                                placeholder={"sub category"}
                                filterOption={(input, option) =>
                                  (option?.children ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                              >
                                {subCategoryselectMedia.length &&
                                  subCategoryselectMedia.map(({ label, value }) => (
                                    <Select.Option value={value} key={value}>
                                      {label}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                          >
                            {Array.isArray(Mediaitem_list?.data) && Mediaitem_list?.data?.map((items, i) => {
                              return (
                                <div
                                  style={{ width: 250, margin: 12 }}
                                  key={i}
                                >
                                  <div className="card card__media p-1 card-custom">
                                    <Media_image_display data={items}>
                                      <img
                                        className="media_image_height"
                                        src={
                                          items?.file_value && items?.file_value.includes("http") ? items?.file_value : `${config.baseurl2}${items?.file_value} `
                                        }
                                        alt=""
                                      />
                                    </Media_image_display>
                                    {/* <img src={errorImage} alt="" /> */}
                                    <div className="d-flex align-items-center px-2 mt-3">
                                      <img
                                        style={{
                                          width: 50,
                                          height: 50,
                                          borderRadius: 25,
                                          marginRight: "10px",
                                        }}
                                        alt=""
                                        src={
                                          items?.fileOwnerData[0]?.avatar && items?.fileOwnerData[0]?.avatar.includes("http") ? items?.fileOwnerData[0]?.avatar : `${config.baseurl2}${items?.fileOwnerData[0]?.avatar} `
                                        }
                                      />
                                      <div>
                                        <div>
                                          {" "}
                                          {Translation(
                                            translations,
                                            `${items?.fileOwnerData[0]
                                              ?.f_name +
                                            " " +
                                            items?.fileOwnerData[0]
                                              ?.l_name
                                            }`
                                          )}
                                        </div>
                                        <small className="d-block text-muted">
                                          {Translation(
                                            translations,
                                            `${items?.fileCreatedDate}`
                                          )}
                                        </small>
                                      </div>
                                      <div className="ml-auto text-muted ">
                                        <EditLeadAssetEditModal
                                          item={items}
                                          follower_select_list={
                                            follower_select_list
                                          }
                                          obj={redata?.CEO}
                                          resowner={resowner}
                                          id={id}
                                          // updateTimeLine={
                                          //   reRenderTimeline
                                          // }
                                          category_data={
                                            category_select_listMedia
                                          }
                                          WebSocket={sendJsonMessage}
                                          updatedData={setMediaitem_list}
                                          file_type={"media"}
                                          module={"event_meeting"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>


                      {/* ..................................///////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */}

                      {/* <div className="row clearfix">
                        <div className="col-md-12  mb-2">
                          <File
                            onUpload={handleFileUploadMedia}
                            label="Upload Media"
                            name={"upload_media"}
                            typeFile=".jpg,.jpeg,.png,.gif,.bmp,.tif,.tiff,.mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.mpeg,.mpg,.3gp"
                          />

                        </div>
                        <div className="my-2">
                          <FormControl
                            className="form-control my-1"
                            selectList={follower_select_list}
                            label={"Followers"}
                            name="follower_select2"
                            control="select"
                            firstSelect={'--select--'}
                            onChange={e => setfollowerSelectValueMedia(e.target.value)}
                          >
                          </FormControl>


                        </div>
                        {followerSelectValueMedia == 'Custom' &&
                          <div className="my-2">
                            <label>
                              <b>Choose Follower</b>
                            </label>
                            <div className="margin_bottom">
                              <Select
                                mode="multiple"
                                filterOption={true}
                                onSearch={(v) => {
                                  onSearchFollowerMedia(v);
                                }}
                                onChange={(v, v2) => {

                                  let a = v2.map((item) => { return item.key })
                                  setselectedFollowerMedia(a)
                                }
                                }
                                style={{ width: '100%', height: 40 }}
                                placeholder={"type follower name"}
                              >
                                {resowner.data &&
                                  !resowner.data.message &&
                                  resowner.data.map(({ uname, id, text }) => (
                                    <Select.Option value={uname} key={id}>
                                      {uname}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </div>
                          </div>
                        }
                        {followerSelectValueMedia == 'Role' &&
                          <div>


                            <select className="form-control"
                              onChange={(e) => setselectedFollowerMediaRole([e.target.value])}
                            >
                              <option hidden> --select--</option>
                              <Role obj={redata?.CEO} />
                            </select>
                          </div>
                        }


                        <div className="my-2">
                          <label><b>Category</b></label>

                          <Select mode="multiple"
                            onChange={(v, v2) => { subbbMedia(v, v2) }}
                            style={{ width: "100%", height: 40 }}
                            placeholder={'type follower name'}
                            filterOption={(input, option) =>
                              (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                          >

                            {category_select_listMedia.length && category_select_listMedia.map(({ label, value }) => (
                              <Select.Option value={value} key={value}>
                                {label}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>


                        <div className="my-2">
                          <label><b>Sub Category</b></label>

                          <Select mode="multiple"
                            onChange={(v) => { setsubCat_selectedMedia(v); console.log(v); }}
                            style={{ width: "100%", height: 40 }}

                            placeholder={'sub category'}
                            filterOption={(input, option) =>
                              (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                          >

                            {subCategoryselectMedia.length && subCategoryselectMedia.map(({ label, value }) => (
                              <Select.Option value={value} key={value}>
                                {label}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>

                      </div> */}
                      {/* {!assetsFile ? (
                        <Skeleton count={5} />
                      ) : assetsFile.message != "No Data Found" ? (
                        <div className="table-responsive">
                          <div className="row row-cards">
                            {assetsFile && Array.isArray(assetsFile) && assetsFile?.map((items, i) => {
                              const noteDate = moment(items.file_created_date);
                              const currentDate = moment();
                              const diffInMinutes = currentDate.diff(noteDate, 'minutes');
                              const diffInHours = currentDate.diff(noteDate, 'hours');
                              const diffInDays = currentDate.diff(noteDate, 'days');
                              const diffInMonths = currentDate.diff(noteDate, 'months');
                              const diffInYears = currentDate.diff(noteDate, 'years');
                              let relativeDate = '';
                              if (diffInMinutes < 60) {
                                relativeDate = `${diffInMinutes} min ago`;
                              } else if (diffInHours < 24) {
                                relativeDate = `${diffInHours} hour ago`;
                              } else if (diffInDays < 30) {
                                relativeDate = `${diffInDays} day ago`;
                              } else if (diffInMonths < 12) {
                                relativeDate = `${diffInMonths} month ago`;
                              } else {
                                relativeDate = `${diffInYears} year ago`;
                              }
                              return items.file_type === 'Media' ? (
                                <div className="col-sm-6 col-lg-5 card_margin_left" key={i}>
                                  <div className="card card__media p-1 card-custom">
                                    <img className="media_image_height" src={items.file_value && items.file_value.includes("http") ? items.file_value : `${config.baseurl2}${items.file_value} `} alt="" />

                                    <div className="d-flex align-items-center px-2 mt-3">
                                      <img style={{ width: 50, height: 50, borderRadius: 25, marginRight: "10px" }}
                                        src={
                                          items?.fileOwnerData[0]?.avatar &&
                                            items?.fileOwnerData[0]?.avatar.includes("http")
                                            ? items?.fileOwnerData[0]?.avatar
                                            : `${config.baseurl2}${items?.fileOwnerData[0]?.avatar} `
                                        }
                                        alt=""
                                      />
                                      <div>
                                        <div> {Translation(translations, 'Super Admin')}</div>
                                        <small className="d-block text-muted">{Translation(translations, `${relativeDate}`)}</small>
                                      </div>
                                      <div className="ml-auto text-muted ">
                                        {leadPermission?.super_admin == "1" || leadPermission?.filesnmedia_module?.edit == "1" ? (

                                          <FiEdit className="editcustom_view" />
                                        ) : null}
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center justify-content-between px-2">
                                      <div><b>{Translation(translations, 'File Size')}:</b><br /> {items.file_size}</div>
                                    </div>
                                  </div>

                                </div>
                              ) : ""
                            })
                            }
                          </div>
                        </div>
                      ) : (
                        " No Data"
                      )} */}
                    </div>
                  </div>
                </div>
                {/* <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-film text-muted"></i> Files
                    </h3>

                    <div className="card-options">
                      <button type="button" className="btn btn-icon nxss"><i className="fe fe-lock"></i></button>
                      <button onClick={() => setOpenModal(true)} type="button" className="btn btn-icon nxss" id="false" data-toggle="tooltip" ><i className="fe fe-upload"></i></button>
                      <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i className="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i className="fe fe-maximize"></i></a>
                    </div>
                  </div>
                  <div className="card-body">
                  </div>
                </div> */}

                {Array.isArray(notVoted) &&
                  notVoted.map((item, index) => {
                    return (
                      <Card
                        key={index}
                        setRiskData={setRiskData}
                        setRiskId={setRiskId}
                        item={item}
                        selectClassName={"col-lg-3 col-md-3"}
                        inputClassName={"col-lg-8 col-md-4"}
                      />
                    );
                  })}
                <div className="card">
                  <div className="card-status bg-blue"></div>

                  <div className="card-header">
                    <h3 className="card-title">
                      <FaListOl /> Projects (#)
                      <small>Working For Them</small>
                    </h3>

                    <div className="card-options align-item-center">
                      <Link
                        className="card-options-collapse"
                        onClick={(e) => handleToggle(e)}
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </Link>
                      <Link
                        className="card-options-fullscreen"
                        onClick={(e) => handleFullScreen(e)}
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </Link>
                    </div>
                  </div>

                  <div className="card-body">
                    {Array.isArray(allData?.project) &&
                      allData?.project.map((item, i) => {
                        return (
                          <div
                            key={i}
                            className=" col-lg-12 col-md-12 col-sm-12"
                          >
                            {" "}
                            <div className="c2_own">
                              <ul className="right_chat list-unstyled p-0 right_chat_vl">
                                <li className="online mb-2">
                                  <Link
                                    to={`/${config.ddemoss}view/project/${item.prj_id}`}
                                  >
                                    <Link className="cc_cls" data-row="12">
                                      <i className="fa-solid fa-xmark"></i>
                                    </Link>
                                    <div className="media">
                                      <img
                                        className="media-object "
                                        src={item.project_feature_image}
                                        alt=""
                                      />
                                      <div className="media-body">
                                        <span className="name">
                                          {item?.project_title}{" "}
                                        </span>
                                        <div className="message">
                                          {item?.name}
                                        </div>
                                        {item.start_date && (
                                          <span className="message">
                                            {item.start_date}
                                          </span>
                                        )}{" "}
                                        <span className="dashsymbol">
                                          {" "}
                                          | - |{" "}
                                        </span>{" "}
                                        {item.end_date && (
                                          <span className="message">
                                            {item.end_date}
                                          </span>
                                        )}
                                        <span className="badge badge-outline status"></span>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              </ul>
                            </div>{" "}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="card box_shadow card-collapsed">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-user-secrect text-muted"></i> Admin{" "}
                      <small>Admin &amp; Timeline</small>
                    </h3>
                    <div className="card-options">
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="nav nav-tabs page-header-tab">
                      <li className="nav-item">
                        <Link
                          onClick={() => setTimelineShow(false)}
                          className={`nav-link ${timelineShow ? "" : "show active"
                            }`}
                          data-toggle="tab"
                        >
                          Overview
                        </Link>
                      </li>
                      <li
                        onClick={() => setTimelineShow(true)}
                        className="nav-item"
                      >
                        <Link
                          className={`nav-link ${timelineShow ? "show active" : ""
                            }`}
                          data-toggle="tab"
                        >
                          Timeline
                        </Link>
                      </li>
                    </ul>
                    {timelineShow === false ? (
                      <div className="col-md-12">
                        <div className="tab-content">
                          <div
                            className="tab-pane show active"
                            id="admin_overview"
                          >
                            <ul className="list-unstyled">
                              <li>
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    <div className="h5 mb-0">Created Date</div>
                                    <span className="small text-muted">
                                      {overview?.created_date}
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <li className="mt-4">
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    <div className="h5 mb-0">Updated Date</div>
                                    <span className="small text-muted">
                                      {overview?.updated_date}
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <li className="mt-4">
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    <div className="h5 mb-0">
                                      Event Stage Dates{" "}
                                    </div>
                                    <table className="table table-bordered mt-2">
                                      <thead>
                                        <tr>
                                          <th>Stage Name</th>
                                          <th>Assigned On</th>
                                          <th>No of Days </th>
                                        </tr>
                                      </thead>
                                    </table>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="tab-pane" id="lead_timeline">
                        {timeline &&
                          Array.isArray(timeline) &&
                          timeline.map((item, index) => {
                            return (
                              <div key={index} className="timeline_item ">
                                <div>{item.f_name}</div>
                                <span>
                                  <a>
                                    {" "}
                                    {item.f_name} {item.l_name}{" "}
                                  </a>{" "}
                                  ({item.email}){" "}
                                  <small className="float-right text-right">
                                    {" "}
                                    {item.activity_date_time}
                                  </small>
                                </span>
                                <div className="msg">
                                  <div>
                                    <p
                                      className="mb-0"
                                      dangerouslySetInnerHTML={{
                                        __html: item.activity_value,
                                      }}
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <Attendees
                  setAttendence={setAttendence}
                  users={attendences}
                  setShowState={setShowState}
                  meetingCreateiD={meetingCreateiD}
                  pipeline_id={pipeline_id}
                />
                <Tag
                  del={handletagDelete}
                  savMess={() => transmitMessage()}
                  tagdatas={tagVal}
                  tagvl={tagVal}
                  tagvlUpd={setCreTval}
                />
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-comments text-muted"></i>{" "}
                      Conversations
                    </h3>
                    <div className="card-options">
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    Web hook to load content in future
                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-folder text-muted"></i> Files
                      <small>Upload file</small>
                    </h3>
                    <div className="card-options align-item-center">
                      <button
                        type="button"
                        className="btn btn-icon btn-primary"
                      >
                        <i className="fe fe-lock"></i>
                      </button>
                      <button
                        // onClick={handleUploadImage}
                        onClick={FilesSubmit}
                        type="button"
                        className="btn btn-icon"
                        id="false"
                        data-toggle="tooltip"
                        title=""
                        aria-describedby="ui-id-148"
                      >
                        <i className="fe fe-upload"></i>
                      </button>
                      <a
                        onClick={handleToggle}
                        className="card-options-collapse nxs"
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </a>
                      <a
                        onClick={handleFullScreen}
                        className="card-options-fullscreen nxs"
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-body">
                    {/* <File
                      label=""
                      value={img33}
                      onUpload={setImage}
                      name={"ava"}
                    /> */}

                    {/* my updated ........................................................  */}
                    <div className="col-md-12 mb-2">
                      <File
                        onUpload={setImage2}
                        label={Translation(translations, "Upload File")}
                        name={"upload_file"}
                        typeFile=".txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.csv,.json,.xml,.html,.htm,.js,.css,.php,.cpp,.c,.java,.py,.rb,.sql,.log"
                        imageObj={image2}
                        typeFile_name={"typeFile"}
                      />
                    </div>
                    <div className="my-2 ">
                      <FormControl
                        className="form-control my-1"
                        selectList={follower_select_list}
                        label={"Followers"}
                        name="follower_select"
                        control="select"
                        firstSelect={"--select--"}
                        onChange={(e) =>
                          setfollowerSelectValue(e.target.value)
                        }
                      />
                    </div>

                    {followerSelectValue == "Custom" && (
                      <div className="margin_bottom">
                        <label>
                          <b>Choose Follower</b>
                        </label>
                        <Select
                          mode="multiple"
                          filterOption={true}
                          onSearch={(v) => {
                            onSearchFollower(v);
                          }}
                          onChange={(v, v2) => {
                            let a = v2.map((item) => {
                              return item.key;
                            });
                            setselectedFollower(a);
                          }}
                          style={{ width: "100%", height: 40 }}
                          placeholder={"type follower name"}
                        >
                          {resowner.data &&
                            !resowner.data.message &&
                            resowner.data.map(({ uname, id, text }) => (
                              <Select.Option value={uname} key={id}>
                                {uname}
                              </Select.Option>
                            ))}
                        </Select>
                      </div>
                    )}
                    {followerSelectValue == "Role" && (
                      <div className="margin_bottom">
                        <select
                          className="form-control"
                          onChange={(e) =>
                            setselectedFollower([e.target.value])
                          }
                        >
                          <option hidden> --select--</option>
                          <Role obj={redata?.CEO} />
                        </select>
                      </div>
                    )}

                    <div className="my-2">
                      <label>
                        <b>Category</b>
                      </label>

                      <Select
                        mode="multiple"
                        onChange={(v, v2) => {
                          subbb(v, v2);
                        }}
                        style={{ width: "100%", height: 40 }}
                        placeholder={"type follower name"}
                        filterOption={(input, option) =>
                          (option?.children ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {category_select_listMedia.length &&
                          category_select_list.map(({ label, value }) => (
                            <Select.Option value={value} key={value}>
                              {label}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>

                    <div className="my-2">
                      <label>
                        <b>Sub Category</b>
                      </label>

                      <Select
                        mode="multiple"
                        onChange={(v) => {
                          setsubCat_selected(v);
                        }}
                        style={{ width: "100%", height: 40 }}
                        placeholder={"sub category"}
                        filterOption={(input, option) =>
                          (option?.children ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      >
                        {subCategoryselect.length &&
                          subCategoryselect.map(({ label, value }) => (
                            <Select.Option value={value} key={value}>
                              {label}
                            </Select.Option>
                          ))}
                      </Select>
                      {Array.isArray(Fileitem_list?.data) && (
                        <div className="table-responsive">
                          <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0">
                            <thead>
                              <tr>
                                <th></th>
                                <th>{Translation(translations, "Name")}</th>
                                <th>
                                  {Translation(translations, "Share With")}
                                </th>
                                <th>
                                  {Translation(translations, "Owner")}
                                </th>
                                <th>
                                  {Translation(translations, "Last Update")}
                                </th>
                                <th>
                                  {Translation(translations, "File Size")}
                                </th>
                                <th>
                                  {Translation(translations, "Action")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(Fileitem_list.data) &&
                                Fileitem_list.data.map((item, index) => {
                                  return (
                                    < tr key={index}>
                                      <td className="width45">
                                        <i className="fa fa-file-excel-o text-success"></i>
                                      </td>
                                      <td>
                                        <span className="folder-name">
                                          <a
                                            href={item.file_value}
                                            download={
                                              item?.file_value?.includes("http")
                                                ? item?.file_value
                                                : `${config.baseurl2}${item?.file_value}`
                                            }
                                          >
                                            {Translation(
                                              translations,
                                              item.file_name
                                            )}
                                          </a>
                                        </span>
                                      </td>
                                      <td>
                                        {Translation(
                                          translations,
                                          item.file_name
                                        )}
                                      </td>
                                      <td className="width100">
                                        <span>
                                          {Translation(
                                            translations,
                                            `${item.fileOwnerData[0].f_name} ${item.fileOwnerData[0].l_name}`
                                          )}
                                        </span>
                                      </td>
                                      <td className="width100">
                                        <span>
                                          {Monthss(item.file_updated_date)}{" "}
                                          {Translation(
                                            translations,
                                            "23, 2023"
                                          )}
                                        </span>
                                      </td>
                                      <td className="width100 text-center">
                                        <span className="size">
                                          {Translation(
                                            translations,
                                            item.file_size
                                          )}
                                        </span>
                                      </td>
                                      <td className="width100">
                                        <span>
                                          <EditLeadAssetEditModal
                                            item={item}
                                            follower_select_list={
                                              follower_select_list
                                            }
                                            obj={redata?.CEO}
                                            resowner={resowner}
                                            id={id}
                                            category_data={category_select_list}
                                            // updateTimeLine={reRenderTimeline}
                                            file_type="file"
                                            module={"event_meeting"}
                                            updatedData={setFileitem_list}
                                            WebSocket={sendJsonMessage}
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              deleteAssetFile(item)
                                            }
                                            className="text-red filedelete border-0 bg-none"
                                          >
                                            <i className="fa fa-trash"></i>
                                          </button>
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {voted &&
                  Object.keys(voted).map((item, index) => {
                    return (
                      <SidebarDynamic
                        key={index}
                        setMeeting={setMeeting}
                        icon={voted[item].pipeline_icon}
                        title={voted[item].pipeline_title}
                        count={voted[item].count_label}
                        item={voted[item]}
                        voted={voted[item].in_votes}
                        notvoted={voted[item].voted_followup_items}
                      />
                    );
                  })}
              </div>
            </div>
          </Form>
        </Formik >
      </div >
      {
        showModal &&
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <label className="modal-labels my_labels">
                  <label>Agenda Title</label>
                  <input
                    defaultValue={EditModalData.item_title}
                    // value={EditModalData.item_title}
                    type="text"
                    className="form-control agenda1appendinputmin"
                    name="example-text-input"
                    placeholder="What do you wand to discuss?"
                    onChange={(event) => {
                      geteditvalues(event.target.value);
                    }}
                  />
                  <div className="my_tabs">
                    <ul className="nav nav-tabs page-header-tab">
                      <li className="nav-item">
                        <Link onClick={() => setTimelineShow2('1')} className={`nav-link ${timelineShow2 === '1' ? 'active' : ''}`} data-toggle="tab">Description</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => setTimelineShow2('2')} className={`nav-link ${timelineShow2 === '2' ? 'active' : ''}`} data-toggle="tab">Sub Items</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={() => setTimelineShow2('3')} className={`nav-link ${timelineShow2 === '3' ? 'active' : ''}`} data-toggle="tab">Files</Link>
                      </li>
                    </ul>

                  </div>
                </label>{" "}
              </Col>
            </Row>
            <Row>
              {timelineShow2 === '1' &&
                <Col xs={12} md={12} lg={12}>
                  <div>
                    <h6>Description</h6>
                    <CKEditor
                      config={{
                        extraPlugins: [uploadPlugin],
                      }}
                      editor={ClassicEditor}
                      onReady={(editor) => { }}
                      onChange={(event, editor) => {
                        const data = editor?.getData();
                        seteditorvalue(data, event, editor);
                      }}
                    />
                  </div>
                </Col>}
              {timelineShow2 === '2' &&
                <Col>
                  <h6>Sub-items (Agenda)</h6>
                  {EditModalData.sub_items && Array.isArray(EditModalData.sub_items) && EditModalData.sub_items.map((item, index) => {
                    return (
                      <div key={index} className="tab-pane fadeIn active" id="agenda_sub_items" aria-expanded="false">
                        <div className="input-group mb-1 _sub_item_agenda_">
                          <input
                            onChange={handleInputChange2}
                            type="text"
                            className="form-control agenda1appendinputtxt"
                            name="example-text-input"
                            defaultValue={item.item_title}
                          />
                          <div className="input-group-append">
                            <button onClick={() => geteditvalues3(item)} type="button" className="btn btn-default sub_item_agenda" data-row="261"><i className="fa fa-save"></i></button>
                            <button onClick={() => deleteAgendaModal(item)} type="button" className="btn btn-red rsub_item_aganda" data-row="261"><i className="fa fa-trash"></i></button>
                          </div>
                        </div>
                        {item.sub_items && Array.isArray(item.sub_items) && item.sub_items.map((item, index) => {
                          return (
                            <div key={index} className="input-group mb-1 _sub_item_agenda_">
                              <input
                                onChange={handleInputChange3}
                                type="text"
                                className="form-control agenda1appendinputtxt sub_item_agenda_ sub_sub_item_agenda_"
                                name="example-text-input"
                                defaultValue={item.item_title}
                              />
                              <div className="input-group-append">
                                <button onClick={() => geteditvalues3(item)} type="button" className="btn btn-default sub_item_agenda" data-row="267"><i className="fa fa-save"></i></button>
                                <button onClick={() => deleteAgendaModal(item)} type="button" className="btn btn-red rsub_item_aganda" data-row="267"><i className="fa fa-trash"></i></button>
                              </div>
                            </div>
                          )
                        })}

                      </div>
                    )
                  })}

                </Col>
              }

              {timelineShow2 === '3' &&
                <Col>
                  <div>
                    <label htmlFor="file-input">Choose file </label>  <input id="file-input" type="file" onChange={handleFileChange} />
                    {file && <p>Selected file: {file.name}</p>}
                  </div>
                </Col>}
            </Row>
          </Modal.Body>

          {timelineShow2 === '1' &&
            <Modal.Footer>
              <Button onClick={decUpdate} variant="primary">
                {" "}
                <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Update Description')}
              </Button>
            </Modal.Footer>}
          {timelineShow2 === '3' &&
            <Modal.Footer>
              <Button onClick={geteditvalues} variant="primary">
                {" "}
                <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Upload Media ')}
              </Button>
            </Modal.Footer>
          }

        </Modal>
      }

    </div >
  );
}

export default Meeting;
