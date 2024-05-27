// import React,{useState} from 'react'
import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field, useFormikContext } from "formik";
import FormControl from "./components/form/FormControl";

import React, { useState, useEffect, useContext, useRef } from "react";
import { MainActionListContext } from "./context/MainActionListContext";
import { MainAuthPermissionsContext } from "./context/MainAuthPermissionsContext";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
// import Modal from "react-bootstrap/Modal";
import { MainTranslationContexts } from "./context/MainTranslationContexts";
import { Translation } from "./components/Translation";
import { FaSearch } from "react-icons/fa";
import usePost from "./customHooks/usePost";
import config from "./services/config.json";
import { DatePicker } from "antd";
import { toast } from "react-toastify";
import swal from "sweetalert";
import axios from "axios";
import { getTokenSession } from "./utils/common";
dayjs.extend(utc);
dayjs.extend(timezone);


function Automation_addEvent_module({
  children,
  setshow1,
  module_name,
  handle_addEvent_module,
  backgroundColor,
}) {
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  const InitialSameModal = {
    tag_to_add_contact: "",
  };
  const [automation_removeTag_module, setAutomation_removeTag_module] =
    useState(false);

  // //////////////////////
  // const { Id, datasAction, actionData, modules, WebSocketAction } = { ...props };
  const { permissions } = useContext(MainAuthPermissionsContext);
  // console.log(,"muzzz")
  const { addActionList, Actionlist } = useContext(MainActionListContext);
  const { translations } = useContext(MainTranslationContexts);
  const [assigntoImg, setAssigntoImg] = useState(permissions?.avatar);
  const date = dayjs();
  const [dateValue, setDateValue] = useState(date);
  const [ownerhidden, setOwnerhidden] = useState(permissions?.id);
  const [searchval, setSearchval] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [showEdit2, setShowEdit2] = useState(false);
  const [pipelines, setPipelines] = useState(Actionlist.length?Actionlist[0].db_id:"");
  const [priority_list, setPriority_list] = useState([]);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const inputElement = useRef();
  const ownerRef = useRef(null);
  const [resowner, apiMethodowner] = usePost();
  const [createAction, apiMethodCreateAction] = usePost("");
  const [Assgns, setAssgns] = useState({});




useEffect(() => {
  if(automation_removeTag_module){
    axios
      .get(`${config.apiEndPoint}getAllViewActionPriority`)
      .then((res) => {
        setPriority_list(res.data)
        setPriority(res.data.length?res.data[0]?.priority_id:"")
      })
  }


}, [automation_removeTag_module])






  const handleClick = (item) => {
    if (item?.lead_follower !== "yes") {
      setSearchval(item.uname);
      setAssgns({
        id: item.id,
        image: item.avatar,
      });
    }
    setListOpen(false);
  };
  const handleClose = () => {
    setShowEdit2(false);
  };
  const handleSubmitAssign = () => {
    setOwnerhidden(Assgns.id);
    setAssigntoImg(Assgns.image);
    setShowEdit2(false);
  };
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    // formdataOwner.append("uLead", Id);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const handleAssignModalOpen = () => {
    setShowEdit2(true);
  };
  const handleActionSubmit = () => {
  let  formobj={}
    if (title.trim() != "") {
      formobj.title=title
    } else {
      swal({
        title: "Fill required field",
        icon: "error",
      });
      return;
    }
    formobj.event_type= "action"
    formobj.pipeline=pipelines
    formobj.priority=priority
    formobj.event_members=ownerhidden
    formobj.module=module_name
    formobj.create_event="cReaTe_mOduLe_eVENt"
    formobj.eve_start_date=dayjs(dateValue)
    .tz(permissions["system-user_timezone"]?.setting_value)
    .format("DD-MM-YYYY")
    formobj.eve_start_time= dayjs(dateValue)
    .tz(permissions["system-user_timezone"]?.setting_value)
    .format("HH:mm:ss")
    formobj.eve_end_date= dayjs(dateValue)
    .add(1, "hour")
    .tz(permissions["system-user_timezone"]?.setting_value)
    .format("DD-MM-YYYY")
    formobj.eve_end_time= dayjs(dateValue)
    .add(1, "hour")
    .tz(permissions["system-user_timezone"]?.setting_value)
    .format("HH:mm:ss")
   
    handle_addEvent_module(formobj,module_name,backgroundColor);
  };
  const onOk = (value) => {
    setDateValue(value);
  };
  // //////////////////////

  return (
    <>
      <span
        onClick={() => {
          setAutomation_removeTag_module(true);
        }}
      >
        {children}
      </span>
      <Modal
        show={automation_removeTag_module}
        onHide={() => {
          setAutomation_removeTag_module(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Formik
          initialValues={InitialSameModal}
         
        >
          <Form name="myForm">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <h5 className="modal-title">{module_name} add event</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div
                  className=""
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 1fr 1fr 0.5fr ",
                    gap: "0.6rem",
                  }}
                >
                  <div className="">
                    <div className="dropdown">
                      <DatePicker
                        allowClear={false}
                        format="YYYY-MM-DD HH:mm"
                        showTime={{ format: "HH:mm" }}
                        onOk={onOk}
                        value={dateValue}
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        name="example-text-input"
                        placeholder="What do you need to get done?"
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group multiselect_div">
                      <select
                        value={pipelines}
                        onChange={(e) => setPipelines(e.target.value)}
                        id="single-selection"
                        name="single_selection"
                        className="multiselect multiselect-custom form-control"
                      >
                        {
                          Array.isArray(Actionlist) ?
                            Actionlist.map((item) => {
                              return (
                                <option key={item.db_id} value={item.db_id}>{item?.pipeline_title}</option>
                              )
                            })
                            :
                            <option></option>
                        }
                      </select>
                    </div>
                  </div>

                  <div className="">
                    <div className="form-group multiselect_div">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        id="single-selection"
                        name="single_selection"
                        className="multiselect multiselect-custom form-control"
                      >
                        {
                          (Array.isArray(priority_list)&&priority_list.length) ?
                            priority_list.map((item) => {
                              return (
                                <option key={item.priority_id} value={item.priority_id}>{item?.priority_label}</option>
                              )
                            })
                            :
                            <option></option>
                        }
                      </select>
                    </div>
                  </div>

                  <div className="text-center mt-1">
                    <img
                      onClick={handleAssignModalOpen}
                      className="avatar"
                      src={
                        assigntoImg
                          ? assigntoImg.includes("http")
                            ? assigntoImg
                            : `${config.baseurl2}${assigntoImg}`
                          : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"
                      }
                    />
                  </div>

                  {/* <div className="">
                    <button
                      type="button"
                      className="btn btn-icon btn-primary btn-success"
                      onClick={() => {
                        handleActionSubmit();
                      }}
                    >
                      <i className="fe fe-plus"></i>
                    </button>
                  </div> */}
                </div>

                <Modal show={showEdit2} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Assign Action</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="col-md-12 mt-3">
                      <label className="form-label">
                        {Translation(translations, "Lead Assign to")}
                      </label>
                      <div ref={ownerRef} className="searchDropDown">
                        <input
                          type="text"
                          className="form-control"
                          ref={inputElement}
                          name="contact_owner"
                          value={searchval}
                          onChange={(e) => setSearchval(e.target.value)}
                        />
                        <button
                          className="nav-link clickButton"
                          type="button"
                          id="dropdownMenuButton"
                          onClick={() => handleList()}
                        >
                          <FaSearch />
                        </button>
                      </div>
                      <div className={`dropDownCustom ${listOpen && "active"}`}>
                        {resowner.data && (
                          <ul className="list gfdgd">
                            {resowner.isLoading ? (
                              ""
                            ) : !resowner.data.message ? (
                              resowner.data.map((item, index) => {
                                return (
                                  <li
                                    key={index}
                                    onClick={() => handleClick(item)}
                                  >
                                    {" "}
                                    {Translation(
                                      translations,
                                      `${item.uname} (${item.role_name})`
                                    )}
                                  </li>
                                );
                              })
                            ) : (
                              <li>
                                {Translation(
                                  translations,
                                  `${resowner.data.message}`
                                )}
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="modal-footer mt-3">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn btn-default not_now"
                      >
                        Not Now
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmitAssign}
                        className="btn btn-primary btn-leadassignst"
                      >
                        Assign Action
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-end g-2  w-100 mt-3">
                <div>
                  <button
                    onClick={() => {
                      setAutomation_removeTag_module(false);
                    }}
                    className="triggerbtn-back"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>

                <div className="ms-2">
                  <button type="button"  onClick={() => {
                        handleActionSubmit();
                      }} className="btn btn-success px-4">
                    Save
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default Automation_addEvent_module;
