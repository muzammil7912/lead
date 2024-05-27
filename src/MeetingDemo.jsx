import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import usePost from "../customHooks/usePost";
import { MainHeadingContext } from "../context/MainHeadingContext";
import useWebSocket from "react-use-websocket";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import File from "../components/form/File";
import { Select } from "antd";
import { Form, Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import Submodal from "./EditSubmodal";
import {
  FaBars, FaRegCircle, FaPlay, FaLevelDownAlt,
  FaRegCopy,
  FaPen,
  FaTrash,
  FaLock,
  FaChevronUp,
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
import moment from 'moment';
import { handleFullScreen } from "../components/AllCustomFuntion";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDrag, useDrop } from 'react-dnd';
import { getTokenSession } from "../utils/common";



function Meeting() {

  const ws = useRef(null);
  const [viewAgenda, setViewagenda] = useState('')
  const [notes, setNotes] = useState('')
  const [meeting, setMeeting] = useState('');
  const [risKdata, setRiskData] = useState('');
  const [riskId, setRiskId] = useState('')
  const [allData, setAllData] = useState('')
  const [decNotes, setdecNotes] = useState('')
  const [timeline, setTimeline] = useState('')
  const [overview, setOverView] = useState('')
  const [timelineShow, setTimelineShow] = useState(false)
  const { id } = useParams();
  const { data: allMeetingData, loading33, error33 } = useFetch({ setAllData }, `getEditViewMeeting/${id}`);
  const [tagVal, setTagVal] = useState("");
  const [tagCretVal, setCreTval] = useState("");
  const [restagPostSend, apiMethodtagPostSend] = usePost();
  const [resCreateAgenda, apiMethodCreateAgenda] = usePost();
  const [restagDelete, apiMethodtagDelate] = usePost();
  const [agendaValue, setAgendaValue] = useState('')
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [img33, setimg33] = useState("")
  const [img332, setimg332] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [agendanumVal, setAgendanumVal] = useState('')
  const [suggested, setSuggested] = useState('')
  const [suggestednum, setSuggestedNum] = useState('')
  const [editorvalue, seteditorvalue] = useState('')
  const [decValue, setdECvalue] = useState('')
  const [actionInput, setActioninput] = useState('')
  const [viewAgenda2, setViewagenda2] = useState('')
  const [voted, setVoted] = useState('')
  const [notVoted, setnotVoted] = useState('')
  const { permissions } = useContext(MainAuthPermissionsContext);
  const API_URL = "https://77em4-8080.sse.codesandbox.io";
  const UPLOAD_ENDPOINT = "upload_files";
  const [states, setStates] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stateSuggested, seTsuggested] = useState('')
  const [agendaViewapi, apiMethodAgendaViewAPI] = usePost()
  const [agendaViewMove, apiMethodagendaViewMove] = usePost()
  const [suggestedAgendaViewapi, apiMethodsuggestedAgendaViewap] = usePost()
  const [notesApi, apiMethodeNotesApi] = usePost()
  const [noteDecApi, apiMethodNotesDec] = usePost()
  const [riskViewApi, apiMethodRiskView] = usePost()
  const [dragAndDrop, apiMethodDragandDrop] = usePost()
  const [attendenceView, setAttendence] = useState('')
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };

  const handleShowModal = () => setShowModal(true);
  const transmitMessage = () => {
    let tagdata = new FormData();
    tagdata.append("meeting_id", id);
    tagdata.append("tags", tagCretVal);
    tagdata.append("uMeet1", 'typeTag');
    tagdata.append("typeTag", 'typeNoteuTag');
    apiMethodtagPostSend("postCreateTagsMeetings", tagdata);
  };
  // useEffect(() => {
  //   if (restagPostSend.data && !restagPostSend.isLoading) {
  //     sendJsonMessage(tagVal);
  //     let tagdata = new FormData();
  //     apiMethodGet("postAllViewTags", tagdata);
  //   }
  // }, [restagPostSend.data]);

  const handletagDelete = (item) => {
    let tagdeval = new FormData();
    tagdeval.append("meeting_id", id);
    tagdeval.append("mode", 'meeting_rem');
    tagdeval.append("tags", item);
    apiMethodtagDelate("postDeletedTagsMeetings", tagdeval);
    setTagVal(tagVal.filter(ite => ite != item))
  }
  useEffect(() => {
    if (restagDelete.data && !restagDelete.isLoading) {
      sendJsonMessage(tagVal);
      toast.success("success");
    }
  }, [restagDelete.data]);
  function handlePost(event) {
    // axios.get(`${config.apiEndPoint}getViewTagsMeetings/${id}`)
    //   .then((response => {
    //     setTagVal(response.data.value)
    //   })).catch((error => {
    //     console.log('error', error)
    //   }))
    console.log("Received message from server:", event);
  }
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
    if (agendaValue == '') {
      swal({
        text: 'Please fill Agenda',
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      })
    } else if (agendanumVal == '') {
      swal({
        text: 'Please fill time',
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      })
    }
    else {
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
  useEffect(() => {
    if (resCreateAgenda.data && !resCreateAgenda.isLoading) {
      let tagdata = new FormData();
      // apiMethodGet(`getEditViewMeeting/${id}`, tagdata);
      sendJsonMessage(allData);
    }
  }, [resCreateAgenda.data]);
  const addSubagenda = (item) => {
    let addData = new FormData()
    addData.append('item_id', item.db_id)
    addData.append('meeting_id', id)
    addData.append('item_user', permissions?.id)
    addData.append('uMeet24', 'typeAgendaSubApped')
    addData.append('typeAgendaSubApped', 'typeAgendaSubApped')
    apiMethodAgendaViewAPI('postAddSubAgenda', addData)
  }
  const addSubsubagenda = (item) => {
    let addData = new FormData()
    addData.append('item_id', item.db_id)
    addData.append('meeting_id', id)
    addData.append('item_user', permissions?.id)
    addData.append('uMeet24', 'typeAgendaSubApped')
    addData.append('typeAgendaSubApped', 'typeAgendaSubApped')
    apiMethodAgendaViewAPI('postAddSubAgenda', addData)
  }
  const addSubagenda2 = (item) => {
    let addData = new FormData()
    addData.append('item_id', item.db_id)
    addData.append('meeting_id', id)
    addData.append('item_user', permissions?.id)
    addData.append('uMeet24', 'typeAgendaSubApped')
    addData.append('typeAgendaSubApped', 'typeAgendaSubApped')
    apiMethodsuggestedAgendaViewap('postAddSubAgenda', addData)
  }
  const addSubsubagenda2 = (item) => {
    let addData = new FormData()
    addData.append('item_id', item.db_id)
    addData.append('meeting_id', id)
    addData.append('item_user', permissions?.id)
    addData.append('uMeet24', 'typeAgendaSubApped')
    addData.append('typeAgendaSubApped', 'typeAgendaSubApped')
    apiMethodsuggestedAgendaViewap('postAddSubAgenda', addData)
  }
  const createSuggestedAgenda = () => {

    if (suggested == '') {
      swal({
        text: 'Please fill Agenda',
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      })
    } else if (suggestednum == '') {
      swal({
        text: 'Please fill time',
        icon: "error",
        buttons: ["Close", true],
        dangerMode: true,
      })
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
        })
      }
    }
  };
  function handleInputChange(event) {
    setAgendaValue(event.target.value);
  }
  const createNotes = () => {
    let tagdata = new FormData();
    console.log(editorvalue)
    tagdata.append("privacy", 'false');
    tagdata.append("note", editorvalue);
    tagdata.append("meeting_id", id);
    tagdata.append("uMeet", 'typeNote');
    tagdata.append("typeNote", 'typeNoteuMeet');
    apiMethodeNotesApi("postCreateNotes", tagdata);
  }
  const updatesNotes = () => {
    let tagdata = new FormData();
    tagdata.append("privacy", 'false');
    tagdata.append("note", decValue);
    tagdata.append("meeting_id", id);
    tagdata.append("uDec", 'typeDec');
    tagdata.append("typeDec", 'typeDecuMeet');
    apiMethodNotesDec("postDescription", tagdata);
    swal({
      text: 'Note has been added',

    })
  }
  const deleteAgenda = (item) => {
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
        apiMethodAgendaViewAPI("postDeletedAgenda", delData);
      }
    })

  }
  const deleteAgenda2 = (item) => {
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
        apiMethodsuggestedAgendaViewap("postDeletedAgenda", delData);
      }
    })

  }
  const moveDown = (item) => {
    let moveData = new FormData()
    moveData.append('item_id', item.db_id)
    moveData.append('meeting_id', id)
    moveData.append('item_user', permissions?.id)
    moveData.append('uMeet31', 'typeAgendaMovetoDwn')
    moveData.append('typeAgendaMovetoDwn', 'typeAgendaMovetoDwn')
    apiMethodagendaViewMove('postMovetoDwnAgenda', moveData)
  }
  const moveUp = (item) => {
    let moveData = new FormData()
    moveData.append('item_id', item.db_id)
    moveData.append('meeting_id', id)
    moveData.append('item_user', permissions?.id)
    moveData.append('uMeet32', 'typeAgendaMovetoUp')
    moveData.append('typeAgendaMovetoUp', 'typeAgendaMovetoUp')
    apiMethodagendaViewMove('postMovetoUpSuggestedTopics', moveData)
  }
  const copyAgenda = (item) => {
    console.log(item)
    let copy = new FormData()
    copy.append('item_id', item.db_id)
    copy.append('meeting_id', id)
    copy.append('item_user', permissions?.id)
    copy.append('uMeet22', 'typeAgendaCopy')
    copy.append('typeAgendaCopy', 'typeAgendaCopy')
    apiMethodAgendaViewAPI('postDuplicateAgenda', copy)
  }
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    "ws://192.168.18.69:8080",
    {
      onOpen: () => console.log("WebSocket connection opened."),
      onClose: () => console.log("WebSocket connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event) => handlePost(event.data),
    })


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
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const formatTime = (time) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };


  useEffect(() => {
    if (allMeetingData) {
      setAllData(allMeetingData?.all_attendees)
      console.log(allMeetingData?.all_attendees)
      setViewagenda(allMeetingData?.meeting_agenda)
      setViewagenda2(allMeetingData?.meeting_agenda_topics)
      setNotes(allMeetingData?.notes)
      setdecNotes(allMeetingData?.description)
      setTagVal(allMeetingData?.all_tags)
      setnotVoted(allMeetingData?.not_voted_followups)
      setVoted(allMeetingData?.voted_followups)
      setOverView(allMeetingData?.overview)
      setTimeline(allMeetingData?.timeLine)
    }
  }, [allMeetingData])
  useEffect(() => {
    if (agendaViewMove.data || agendaViewapi.data || states) {
      axios.get(`${config.apiEndPoint}getViewAgenda/${id}`)
        .then(response => {
          setViewagenda(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [agendaViewMove.data, agendaViewapi.data, states])
  useEffect(() => {
    if (agendaViewMove.data || suggestedAgendaViewapi.data || stateSuggested) {
      axios.get(`${config.apiEndPoint}getViewSuggestedTopics/${id}`)
        .then(response => {
          setViewagenda2(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [agendaViewMove.data, suggestedAgendaViewapi.data, stateSuggested])

  useEffect(() => {
    if (notesApi.data) {
      axios.get(`${config.apiEndPoint}getAllViewNotes/${id}`)
        .then((response => {
          setNotes(response.data)
        })).catch((error => {
          console.log('error', error)
        }))
    }
  }, [notesApi.data])
  useEffect(() => {
    if (noteDecApi.data) {
      axios.get(`${config.apiEndPoint}getAllViewDescription/${id}`)
        .then((response => {
          setdecNotes(response.data)
        })).catch((error => {
          console.log('error', error)
        }))
    }
  }, [noteDecApi.data])

  useEffect(() => {
    if (risKdata) {
      let tagdata = new FormData();
      tagdata.append("meeting_id", id);
      tagdata.append("followup_id", riskId);
      apiMethodRiskView("postViewRisksIssues", tagdata);
    }
  }, [risKdata])
  useEffect(() => {
    if (riskViewApi.data) {
      setnotVoted(riskViewApi.data)
    }
  }, [riskViewApi.data])

  useEffect(() => {
    if (meeting) {
      axios.get(`${config.apiEndPoint}getviewDecisions/${id}`)
        .then((response => {
          setVoted(response.data)
        })).catch((error => {
          console.log('error', error)
        }))
    }
  }, [meeting])
  useEffect(() => {
    if (attendenceView) {
      axios.get(`${config.apiEndPoint}getAllAttendeesByMeeting/${id}`)
        .then((response => {
          setAllData(response.data)
        })).catch((error => {
          console.log('error', error)
        }))
    }
  }, [attendenceView])
  const onDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };
  const onDrop = (e, index) => {
    // if(e.target.parentNode.parentNode.parentNode.id === 'box-1'){
      
    // }
    const dragIndex = e.dataTransfer.getData('index');
    const newList = [...viewAgenda];
    const [removedItem] = newList.splice(dragIndex, 1);
    newList.splice(index, 0, removedItem);
    setViewagenda(newList);
    let count = 1
    let form = new FormData()
    {
      viewAgenda.map((item) => {
        console.log(item)
        form.append(`sort_items[${item.db_id}]`, count);
        count++
      })
    }
    form.append('meeting_id', id);
    form.append('uMeet21', 'typeAgendaSort');
    form.append('typeAgendaSort', 'typeAgendaSort');
    apiMethodDragandDrop('postDragAndDropAgenda', form)
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop2 = (e, index) => {
    const dragIndex = e.dataTransfer.getData('index');
    const newList = [...viewAgenda2];
    const [removedItem] = newList.splice(dragIndex, 1);
    newList.splice(index, 0, removedItem);
    setViewagenda2(newList);
    let count = 1
    let form = new FormData()
    {
      viewAgenda2.map((item) => {
        form.append(`sort_items[${item.db_id}]`, count);
        count++
      })
    }
    form.append('meeting_id', id);
    form.append('uMeet21', 'typeAgendaSort');
    form.append('typeAgendaSort', 'typeAgendaSort');
    apiMethodDragandDrop('postDragAndDropAgenda', form)
  };
  return (
    <div className="MeetingPage">
      <div className="container-fluid">
        <Formik>
          <Form name="myform">
            <Modal
              show={openModal}
              onHide={() => setOpenModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Upload Image
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="show-grid">
                <File
                  label=""
                  value={img332}
                  onUpload={setImage2}
                  name={"media-ava"}
                />
              </Modal.Body>
              <Modal.Footer>
                <button onClick={() => setOpenModal(false)} type="button" className="btn btn-default box_shadow">Close</button>
              </Modal.Footer>


            </Modal>
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
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
                    <button
                      type="button"
                      className="btn btn-success ml-2 d-flex"
                      id="timer"
                    >
                      Scheduled  {formatTime(seconds)}
                    </button>
                    <div className="card-options align-item-center">
                      <button type="button" className="btn btn-secondary">
                        <i className="fa fa-comments"></i>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary ml-2"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-list text-muted"></i> Minutes Meeting
                      </button>
                      <div className="dropdown-menu">
                        <Link to={"#"} className="dropdown-item"></Link>
                      </div>
                      <div className="item-action dropdown ml-2">
                        <Dropdown className="item-action dropdown ml-2">
                          <div className='none'>
                            <Dropdown.Toggle className="">
                              <i style={{ "color": '#000', }} className="fe fe-more-vertical"></i>
                            </Dropdown.Toggle>
                          </div>
                          <Dropdown.Menu>
                            <Dropdown.Divider />
                            <Dropdown.Item><i className="dropdown-icon fa fa-share-alt"></i> Edit Metting</Dropdown.Item>
                            <Dropdown.Item><i className="dropdown-icon fa fa-cloud-download"></i> Finish Meeting</Dropdown.Item>
                            <hr />
                            <Dropdown.Item><i className="dropdown-icon fa fa-copy"></i> Manage Attendees</Dropdown.Item>
                            <Dropdown.Item><i className="dropdown-icon fa fa-folder"></i> Duplicate Meeting</Dropdown.Item>
                            <Dropdown.Item><i className="dropdown-icon fa fa-edit"></i> Copy Meeting Link</Dropdown.Item>
                            <Dropdown.Item><i className="dropdown-icon fa fa-edit"></i> Cancel Meeting</Dropdown.Item>
                            <Dropdown.Item><i className="dropdown-icon fa fa-trash"></i> Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        </div>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i> Edit
                            Meeting
                          </Link>
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i> Edit
                            Meeting
                          </Link>
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i> Edit
                            Meeting
                          </Link>
                          <Link to={"#"} className="dropdown-item">
                            <i className="dropdown-icon fa fa-share-alt"></i> Edit
                            Meeting
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="card box_shadow card-collapsed">
                  <div className="card-status bg-blue"></div>

                  <div className="card-header">
                    <h3 className="card-title"><i className="fa fa-users text-muted"></i> Overview<small>Meeting Details</small></h3>
                    <div class="card-options">
                      <a onClick={handleToggle} class="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i class="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} class="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i class="fe fe-maximize"></i></a>
                    </div>
                  </div>
                  <div className="card-body justify-content-center">
                    <ul className="nav nav-tabs page-header-tab">
                      <li className="nav-item"><Link className="nav-link active show" data-toggle="tab" >General</Link></li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane active show" id="General">
                        <div className="card box_shadow">
                          <div className="card-body">
                            <h3 className="card-title mb-3">Summary</h3>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">Main Objective </label>																												<textarea class="form-control" name="Main_Objective" data-title="Main Objective" placeholder="" rows="10" ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="text-right mt-3 mb-0"> <button type="button" class="btn btn-primary btn-sm mdetl box_shadow" id="true">Update Details</button> </div>													</div>
                  </div>

                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-list text-muted"></i> Agenda
                      <small>Meeting Plan</small>
                    </h3>
                    <div class="card-options">
                      <button
                        type="button"
                        className="btn btn-icon btn-primary btn-success"
                      >
                        <i className="fe fe-bell"></i>
                      </button>
                      <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i className="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i class="fe fe-maximize"></i></a>
                      <a ><i class="fa fa-plus" data-toggle="tooltip" data-placement="right" title="" data-original-title="Upload New"></i></a>
                      <div className="">
                        <Dropdown>
                          <div className='none'>
                            <Dropdown.Toggle className="dropDown_li_Style">
                              <i style={{ "color": '#000' }} className="fe fe-more-vertical"></i>
                            </Dropdown.Toggle>
                          </div>
                          <Dropdown.Menu>
                            <Dropdown.Item><i class="dropdown-icon fa fa-eye"></i> View Details</Dropdown.Item>
                            <Dropdown.Item><i class="dropdown-icon fa fa-share-alt"></i> Share</Dropdown.Item>
                            <Dropdown.Item><i class="dropdown-icon fa fa-cloud-download"></i> Download</Dropdown.Item>
                            <hr />
                            <Dropdown.Item><i class="dropdown-icon fa fa-copy"></i> Copy to</Dropdown.Item>
                            <Dropdown.Item><i class="dropdown-icon fa fa-folder"></i> Move to</Dropdown.Item>
                            <Dropdown.Item><i className="dropdown-icon fa fa-edit"></i> Rename</Dropdown.Item>
                            <Dropdown.Item><i className="dropdown-icon fa fa-trash"></i> Delete</Dropdown.Item>
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
                    <div>
                      {Array.isArray(viewAgenda) && viewAgenda.map((item, index) => (
                        <div
                          id="box-1"
                          key={index}
                          draggable
                          onDragStart={(e) => onDragStart(e, index)}
                          onDrop={(e) => onDrop(e, index)}
                          onDragOver={onDragOver} className="relative">
                          <ul  id="box-1" className="agenda1appendBox list">
                            <li  id="box-1" className="mb-2 agenda1appendBoxp">
                              <div  id="box-1" className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                <div  id="box-1" className="agenda1appendBox__left d-flex align-item-center">
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
                                    <li onClick={() => addSubagenda(item)} className="agenda1appendBox_sub">
                                      <i className="fa fa-list-ul"></i>
                                    </li>
                                    <li onClick={() => moveDown(item)} className="agenda1appendBox_suggested">
                                      <FaLevelDownAlt />
                                    </li>
                                    <li onClick={() => copyAgenda(item)} className="agenda1appendBox_duplicate">
                                      <FaRegCopy />
                                    </li>
                                    <li onClick={handleShowModal} className="agenda1appendBox_edit">
                                      <ExampleModal
                                        item={item}
                                        setStates={setStates}
                                        agenda={'agenda'}
                                      />
                                    </li>
                                    <li onClick={() => deleteAgenda(item)} className="agenda1appendBox__delete">
                                      <FaTrash />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </li>
                            {Array.isArray(item.sub_items) && item.sub_items.map((item) => (
                              <div className="agenda1appendBoxpsubdiv">
                                <ul className="list sortable ui-sortable">
                                  <li className="agenda1appendBoxp my-2" data-order="96" data-item="item">
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
                                              <div className="agenda1appendBox_time">NaN:00</div>
                                            )}
                                          </li>
                                          <li class="agenda1appendBox_stop"><i class="fa-solid fa-play"></i></li>
                                          <li onClick={() => addSubsubagenda(item)} class="agenda1appendBox_sub sub__loop"><i class="fa fa-list-ul"></i></li>
                                          <li onClick={() => copyAgenda(item)} class="agenda1appendBox_duplicate"> <FaRegCopy /></li>
                                          <li onClick={handleShowModal} class="agenda1appendBox_edit">
                                            <ExampleModal
                                              item={item}
                                              setStates={setStates}
                                              agenda={'agenda'}
                                            />
                                          </li>
                                          <li onClick={() => deleteAgenda(item)} class="agenda1appendBox__delete"><i class="fa-solid fa-trash"></i></li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div class="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ">
                                      <ul class="list sortable ui-sortable">
                                      </ul>
                                    </div>
                                  </li>
                                  {Array.isArray(item.sub_items) && item.sub_items.map((item) => (
                                    <div className="agenda1appendBoxpsubdiv">
                                      <ul className="list sortable">
                                        <li className="agenda1appendBoxp my-2" data-order="19" data-item="item">
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
                                                    <div className="agenda1appendBox_time">NaN:00</div>
                                                  )}</li>
                                                <li class="agenda1appendBox_stop">
                                                  <i class="fa-solid fa-play"></i>
                                                </li>
                                                <li onClick={() => copyAgenda(item)} class="agenda1appendBox_duplicate">
                                                  <FaRegCopy />
                                                </li>
                                                <li onClick={handleShowModal} class="agenda1appendBox_edit">
                                                  <ExampleModal
                                                    item={item}
                                                    setStates={setStates}
                                                    agenda={'agenda'}
                                                  />
                                                </li>
                                                <li className="agenda1appendBox__delete">
                                                  <i onClick={() => deleteAgenda(item)} className="fa-solid fa-trash"></i>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ"></div>
                                        </li>
                                      </ul>
                                    </div>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </ul>
                        </div>

                      ))}
                    </div>
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
                    <div>
                      {Array.isArray(viewAgenda2) && viewAgenda2.map((item, index) => (
                        <div>
                          <div
                            key={index}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDrop={(e) => onDrop2(e, index)}
                            onDragOver={onDragOver}
                            className="relative">
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
                                      <li onClick={() => addSubagenda2(item)} className="agenda1appendBox_sub">
                                        <i className="fa fa-list-ul"></i>
                                      </li>
                                      <li className="agenda1appendBox_suggested">
                                        <i onClick={() => moveUp(item)} class="fa-solid fa-turn-up"></i>
                                      </li>
                                      <li onClick={handleShowModal} className="agenda1appendBox_edit">
                                        <ExampleModal
                                          item={item}
                                          seTsuggested={seTsuggested}
                                          agenda={'suggested'}
                                        />
                                      </li>
                                      <li onClick={() => deleteAgenda2(item)} className="agenda1appendBox__delete">
                                        <FaTrash />
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </li>
                              {Array.isArray(item.sub_items) && item.sub_items.map((item) => (
                                <div class="agenda1appendBoxpsubdiv">
                                  <ul class="list sortable ui-sortable">
                                    <li class="agenda1appendBoxp my-2" data-order="96" data-item="item">
                                      <div class="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                        <div class="agenda1appendBox__left d-flex align-item-center">
                                          <div class="agenda1appendBox_drag ui-sortable-handle">
                                            <i class="fa-solid fa-bars"></i>
                                          </div>
                                          <div class="agenda1appendBox_i">
                                            <i class="fa-regular fa-circle"></i>
                                          </div>
                                          <div class="agenda1appendBox_txt">
                                            <h6 class="m-0">{item.item_title}</h6>
                                          </div>
                                        </div>
                                        <div class="agenda1appendBox__right">
                                          <ul class="list d-flex align-item-center">
                                            <li>
                                              {typeof +item.item_timer === "number" ? (
                                                <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                              ) : (
                                                <div className="agenda1appendBox_time">NaN:00</div>
                                              )}
                                            </li>
                                            <li class="agenda1appendBox_stop"><i class="fa-solid fa-play"></i></li>
                                            <li onClick={() => addSubsubagenda2(item)} class="agenda1appendBox_sub sub__loop"><i class="fa fa-list-ul"></i></li>
                                            <li onClick={handleShowModal} class="agenda1appendBox_edit">
                                              <ExampleModal
                                                item={item}
                                                agenda={'suggested'}
                                                seTsuggested={seTsuggested}
                                              />
                                            </li>
                                            <li onClick={() => deleteAgenda2(item)} class="agenda1appendBox__delete"><i class="fa-solid fa-trash"></i></li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ">
                                        <ul class="list sortable ui-sortable">
                                        </ul>
                                      </div>
                                    </li>
                                    {Array.isArray(item.sub_items) && item.sub_items.map((item) => (
                                      <div class="agenda1appendBoxpsubdiv">
                                        <ul class="list sortable">
                                          <li class="agenda1appendBoxp my-2" data-order="19" data-item="item">
                                            <div class="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
                                              <div class="agenda1appendBox__left d-flex align-item-center">
                                                <div class="agenda1appendBox_drag ui-sortable-handle">
                                                  <i class="fa-solid fa-bars"></i>
                                                </div>
                                                <div class="agenda1appendBox_i">
                                                  <i class="fa-regular fa-circle"></i>
                                                </div>
                                                <div class="agenda1appendBox_txt">
                                                  <h6 class="m-0">{item.item_title}</h6>
                                                </div>
                                              </div>

                                              <div class="agenda1appendBox__right">
                                                <ul class="list d-flex align-item-center">
                                                  <li>
                                                    {typeof +item.item_timer === "number" ? (
                                                      <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
                                                    ) : (
                                                      <div className="agenda1appendBox_time">NaN:00</div>
                                                    )}</li>
                                                  <li class="agenda1appendBox_stop">
                                                    <i class="fa-solid fa-play"></i>
                                                  </li>
                                                  <li onClick={handleShowModal} class="agenda1appendBox_edit">
                                                    <ExampleModal
                                                      item={item}
                                                      setStates={setStates}
                                                      agenda={'suggested'}
                                                      seTsuggested={seTsuggested}

                                                    />
                                                  </li>
                                                  <li class="agenda1appendBox__delete">
                                                    <i onClick={() => deleteAgenda2(item)} class="fa-solid fa-trash"></i>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                            <div class="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ"></div>
                                          </li>
                                        </ul>
                                      </div>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-sticky-note text-muted"></i> Notes{" "}
                      <small>Notes About the Meeting</small>
                    </h3>
                    <div class="card-options">
                      <button type="button" class="btn btn-icon"><i class="fe fe-lock"></i></button>
                      <a onClick={handleToggle} class="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i class="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} class="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i class="fe fe-maximize"></i></a>
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
                          {Array.isArray(notes) && notes.map((item) => {
                            const noteDate = moment(item.note_date);
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
                            return (
                              <li>
                                <div className="avatar_img">
                                  <img className="rounded img-fluid" src={item.avatar} alt="" />
                                </div>
                                <div className="comment_body">
                                  <h6 className="">
                                    {`${item.f_name} ${item.l_name}`}
                                    <small className="float-right"
                                      title={noteDate.format(' ')}
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
                            )
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
                      <i className="fa fa-calendar-check-o text-muted"></i> Actions
                    </h3>
                    <div className="card-options">
                      <button type="button" className="btn btn-icon btn-primary"><i className="fe fe-lock"></i></button>
                      <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i className="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i className="fe fe-maximize"></i></a>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row clearfix agenda1append">
                      <div class="col-lg-1 col-md-2">
                        <div class="form-group">
                          <button type="button" class="btn btn-secondary dropdown-toggle actionButton" data-toggle="dropdown" aria-expanded="false">
                            <i class="fe fe-calendar"></i>
                          </button>
                          {/* <div class="dropdown-menu">
                        <div class="inline-datepicker"></div>
                      </div> */}
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
                            placeholder='Select'
                            style={{
                              width: "100%",
                            }}
                            // onChange={handleChange}
                            options={[
                              {
                                "value": "Lead",
                                "label": 'Lead'
                              },
                              {
                                "value": "Prospect",
                                "label": 'Prospect'
                              },
                              {
                                "value": "Signature",
                                "label": 'Signature'
                              },
                              {
                                "value": "Opportunity",
                                "label": 'Opportunity'
                              },
                              {
                                "value": "Actions",
                                "label": 'Actions'
                              },
                              {
                                "value": "Follow Up",
                                "label": 'Follow Up'
                              },
                              {
                                "value": "Client",
                                "label": 'Client'
                              }
                            ]}
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2">
                        <div className="form-group">
                          <Select
                            placeholder='Select'
                            style={{
                              width: "100%",
                            }}
                            // onChange={handleChange}
                            options={[
                              {
                                "value": "Lead",
                                "label": 'Lead'
                              },
                              {
                                "value": "Prospect",
                                "label": 'Prospect'
                              },
                              {
                                "value": "Signature",
                                "label": 'Signature'
                              },
                              {
                                "value": "Opportunity",
                                "label": 'Opportunity'
                              },
                              {
                                "value": "Actions",
                                "label": 'Actions'
                              },
                              {
                                "value": "Follow Up",
                                "label": 'Follow Up'
                              },
                              {
                                "value": "Client",
                                "label": 'Client'
                              }
                            ]}
                          />
                        </div>
                      </div>
                      <div className="col-lg-1 col-md-2" > <img className="avatar" src="" /></div>
                      <div className="col-lg-1 col-md-2">
                        <button
                          type="button"
                          className="btn btn-icon btn-primary btn-success agenda1appendbtnadd"
                        >
                          <i className="fe fe-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i class="fa fa-film text-muted"></i> Media
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
                </div>
                {Array.isArray(notVoted) && notVoted.map((item) => { return (<Card setRiskData={setRiskData} setRiskId={setRiskId} item={item} selectClass={'col-lg-3 col-md-3'} inputClass={'col-lg-8 col-md-4'} />) })}
                <div className="card box_shadow card-collapsed">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title"><i className="fa fa-user-secrect text-muted"></i> Admin <small>Admin &amp; Timeline</small></h3>
                    <div class="card-options">
                      <a onClick={handleToggle} class="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i class="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} class="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i class="fe fe-maximize"></i></a>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="nav nav-tabs page-header-tab">
                      <li className="nav-item">
                        <Link onClick={() => setTimelineShow(false)} className={`nav-link ${timelineShow ? '' : 'show active'}`} data-toggle="tab" >Overview</Link>
                      </li>
                      <li onClick={() => setTimelineShow(true)} className="nav-item"><Link className={`nav-link ${timelineShow ? 'show active' : ''}`} data-toggle="tab" >Timeline</Link></li>
                    </ul>
                    {timelineShow === false ? <div className="col-md-12">
                      <div className="tab-content">
                        <div className="tab-pane show active" id="admin_overview">
                          <ul className="list-unstyled">
                            <li>
                              <div class="row align-items-center">
                                <div class="col-auto">
                                  <div class="h5 mb-0">Created Date</div>
                                  <span className="small text-muted">{overview?.created_date}</span>
                                </div>
                              </div>
                            </li>
                            <li class="mt-4">
                              <div class="row align-items-center">
                                <div class="col-auto">
                                  <div class="h5 mb-0">Updated Date</div>
                                  <span class="small text-muted">{overview?.updated_date}</span>
                                </div>
                              </div>
                            </li>
                            <li class="mt-4">
                              <div class="row align-items-center">
                                <div class="col-auto">
                                  <div class="h5 mb-0">Event Stage Dates </div>
                                  <table class="table table-bordered mt-2">
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
                    </div> : <div className="tab-pane" id="lead_timeline">
                      {timeline && Array.isArray(timeline) && timeline.map((item) => {
                        return (
                          <div className="timeline_item ">
                            <div>{item.f_name}</div>
                            <span><a href="javascript:void(0);"> {item.f_name} {item.l_name} </a> ({item.email}) <small className="float-right text-right"> {item.activity_date_time}</small></span>
                            <div className="msg">
                              <div><p className="mb-0" dangerouslySetInnerHTML={{
                                __html: item.activity_value,
                              }}></p></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>}

                  </div>
                </div>
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      Description
                    </h3>
                    <div class="card-options">
                      <a onClick={handleToggle} class="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i class="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} class="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i class="fe fe-maximize"></i></a>
                    </div>
                  </div>
                  <div className="card-body">
                    {decNotes === null || decNotes === undefined ?
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
                      :
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
                        data={decNotes}
                      />
                    }

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
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <Attendees
                  setAttendence={setAttendence}
                  users={allData}
                />
                <Tag
                  del={handletagDelete}
                  savMess={() => transmitMessage()} tagdatas={tagVal} tagvl={tagVal} tagvlUpd={setCreTval}
                />
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i class="fa fa-comments text-muted"></i> Conversations
                    </h3>
                    <div class="card-options">
                      <a onClick={handleToggle} class="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i class="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} class="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i class="fe fe-maximize"></i></a>
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
                      <i class="fa fa-folder text-muted"></i> Files
                      <small>Upload file</small>
                    </h3>
                    <div className="card-options align-item-center">
                      <button type="button" className="btn btn-icon btn-primary"><i className="fe fe-lock"></i></button>
                      <button type="button" className="btn btn-icon" id="false" data-toggle="tooltip" title="" aria-describedby="ui-id-148"><i className="fe fe-upload"></i></button>
                      <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i className="fe fe-chevron-down"></i>
                      </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i className="fe fe-maximize"></i></a>
                    </div>
                  </div>
                  <div className="card-body">
                    <File
                      label=""
                      value={img33}
                      onUpload={setImage}
                      name={"ava"}
                    />

                  </div>
                </div>
                {voted && Object.keys(voted).map((item) => {
                  return (
                    <SidebarDynamic
                      setMeeting={setMeeting}
                      icon={voted[item].pipeline_icon}
                      title={voted[item].pipeline_title}
                      count={voted[item].count_label}
                      item={voted[item]}
                      voted={voted[item].in_votes}
                      notvoted={voted[item].voted_followup_items}
                    />
                  )
                })}
              </div>
            </div>
          </Form>
        </Formik >
      </div >
    </div >
  );
}

export default Meeting;
