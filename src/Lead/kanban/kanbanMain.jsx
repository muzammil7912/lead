import React, { useState, useEffect, useContext, useRef } from "react";
import List from "./ListItems";
import { useDrop } from "react-dnd";
import usePost from "../../customHooks/usePost";
import config from "../../services/config.json";
import Collapse from "react-bootstrap/Collapse";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import FormControl from "../../components/form/FormControl";
import { Translation } from "../../components/Translation";
import { MainTranslationContexts } from "../../context/MainTranslationContexts";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { handleFullScreen } from "../../components/AllCustomFuntion";
import Dropdown from 'react-bootstrap/Dropdown';
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import { getTokenSession } from "../../utils/common";


const Card = ({ card, stagesLead, delte, refreshkanban, refreshkanbanToke }) => {
  const { leadPermission } = useContext(MainLeadPermissionContext);
   const { translations } = useContext(MainTranslationContexts);
  const [StageLeads, setStageLeads] = useState([]);
  const ownerRef = useRef(null);
  const [resowner, apiMethodowner] = usePost();
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [res3, apiMethod3] = usePost();
  const [res4, apiMethod4] = usePost();
  const [res5, apiMethod5] = usePost();
  const [open, setOpen] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showEdit2, setShowEdit2] = useState(false);
  const [stageId, setStageId] = useState(0);
  const [leadId, setLeadId] = useState(0);
  const [names, setNames] = useState("");
  const [won, setWon] = useState(0);
  const [lost, setLost] = useState(0);
  const [ownerhidden, setOwnerhidden] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [searchval, setSearchval] = useState("");
  const [wondata, setWondata] = useState("");
  const [lostdata, setLostdata] = useState("");
  const [wondata2, setWondata2] = useState("");
  const [wondata3, setWondata3] = useState("");
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [assgn, setAssgn] = useState("");
  const [contact, setContact] = useState("");
  const [prevstages, setPrevstage] = useState("");
  const inputElement = useRef();

  const handleClick = (item) => {
    if(item?.lead_follower !== "yes") {
      setSearchval(item.uname);
      setOwnerhidden(item.id);
    } 
    setListOpen(false);
  };
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    formdataOwner.append("uLead", leadId);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const [{ isover }, dropRef] = useDrop({
    accept: "pet",
    drop: (item, monitor) => {
      setListOpen(false)
      let items = {
        "stage": card.id,
        "lead_id": monitor.getItem().id,
        "prevstage": monitor.getItem().stageid,
      }
      if((monitor.getItem().lead_array.kanban_do_follow === false) || leadPermission.super_admin) {
        if (items.prevstage !== items.stage){
        
          setStageId(card.id);
          setLeadId(monitor.getItem().id);
          
          setPrevstage(monitor.getItem().stageid)
          const StageDiv = document.getElementById('stage_id_' + card.id);
          const mode = 'leads';
        const module = 'Lead';
        let formdata = new FormData();
        formdata.append("requiredFields", true);
        formdata.append("stage", card.id);
        formdata.append("lead_id", monitor.getItem().id);
        formdata.append("mode", mode);
        formdata.append("module", module);
        formdata.append("submit", true);
        let bodyContent = formdata;
        
        refreshkanbanToke(items);
        
        setWon("")
        setWondata("")
        setWondata2("")
        setWondata3("")
        setLostdata("")
        setReason("")
        setNames("")
        setAssgn("")
        setContact("")
        setSearchval("")
        setLoading(false)
        apiMethod("postLeadsRequiredFields", bodyContent);
        if (card.wonlost == "won") {
          setLoading(true)
          setWon(card.wonlost)
          setNames(monitor.getItem().lead_array.fullName)
          axios.defaults.headers = {
            "Content-Type": "multipart/form-data",
            authentication: `${getTokenSession()}`,
          };
          axios.get(`${config.apiEndPoint}getLeadsWonStageFields/${monitor.getItem().id}&wonStage`,)
          .then((response) => {
            console.log(response.data.contacts,"jkhjkhjk")
              setWondata(response.data);
              Object.keys(response.data.contacts).map(function (key) {
                if(response.data.contacts[key].already_selected === "selected") {
                  setContact(response.data.contacts[key].id)
                  
                }
                else {
                  console.log(response.data.contacts[key].already_selected,"huiyuiyuiy")
                  
                }
              })
              setWondata2(response.data.contacts);
              setWondata3(response.data.prospect_stages);
              setSearchval(response.data.assign_user.assigned);
              setOwnerhidden(response.data.assign_user.assigned_to);
              setLoading(false)
            })
            .catch((err) => {
              console.log('eerr', err)
            })
          }
          else if (card.wonlost == "lost") {
            setLoading(true)
          setWon(card.wonlost)
          axios
          .get(`${config.apiEndPoint}getAllLeadStagesSettings`,)
          .then((response) => {
            setLostdata(response.data);
            setLoading(false)
          })
          .catch((err) => {
            console.log('eerr', err)
          })
        }
      }
 
      }
 


    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const [vala, setVala] = useState("")
  const handlestage = () => {
    let formdata2 = new FormData();
    formdata2.append("stage_id", stageId);
    formdata2.append("lead_id", leadId);
    formdata2.append("module", "Lead");
    apiMethod2("postUpdateLeadsStage", formdata2);
  }
  useEffect(() => {
    if (res.data) {
      if (Object.keys(res.data.required_fields).length > 0 || won == "won" || won == "lost") {
        if (prevstages != stageId) {
          setShowEdit(true)
          setVala(res.data.required_fields)

        }
      } else {
        if (prevstages != stageId) {
          handlestage()

        }
      }
    }
  }, [res.data]);
  useEffect(() => {
    if (res2.data) {
      setShowEdit(false)
    }
  }, [res2.data]);

  useEffect(() => {
    if (stagesLead && card.id) {
      if (stagesLead[card.id] && stagesLead[card.id].length > 0) {
        setStageLeads(stagesLead[card.id]);

      }
      else {
        setStageLeads("")
      }
    }
  }, [stagesLead, card.id]);
  const handleClose = () => {
    refreshkanban(true);
    setShowEdit(false)
    setShowEdit2(false)
    setVala("")
  }
  const initialValues = {

  }
  let ass = false;

  const navigate = useNavigate();
  useEffect(() => {
    if (res4.data) {
      if(res4.data.redirect === "all_prospects") {
        navigate(`/${config.ddemoss}${res4.data.redirect}/Grid`);
      }
      else {
        navigate(`/${config.ddemoss}${res4.data.redirect}`);
      }
    }
  }, [res4])
  const [assignsData, setAssignsData] = useState()
  const handleAssigns = (item, name,allData) => {
    setListOpen(false)
    setAssignsData(allData)
    setLeadId(allData?.lead_id)
    setWon(card.wonlost)
    setNames(name)
    setShowEdit(true)
    setLoading(true)
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getLeadsWonStageFields/${item}&wonStage`,)
      .then((response) => {
        setWondata(response.data);
        Object.keys(response.data.contacts).map(function (key) {
          if(response.data.contacts[key].already_selected === "selected") {
            setContact(response.data.contacts[key].id)
            
          }
        })
        setWondata2(response.data.contacts);
        setWondata3(response.data.prospect_stages);
        setSearchval(response.data.assign_user.assigned);
        setOwnerhidden(response.data.assign_user.assigned_to);
        setLoading(false)
      })
      .catch((err) => {
        console.log('eerr', err)
      })
  }
  const handleAssign = () => {
    ass = true;
  }
  function handleSubmit(values) {
    let redd = []
    Object.keys(vala).map(function (key, index) {
      if (vala[key].field_required == true) {
        redd.push(key)
      }
    })
    let formdata2 = new FormData();
    formdata2.append("saveRequiredFields", "true");
    formdata2.append("lead_id", leadId);
    formdata2.append("mode", "Lead");

    let map = []
    for (let item in values) {
      map.push(item)
      formdata2.append(item, values[item]);
    }
    let vv = redd.filter((item) => !map.includes(item))
    let a = vv.join(",");
    let b = a.replaceAll("_", " ")
    if (vv.length > 0) {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: b,
        icon: "error",
        dangerMode: true,
      })


    }
    else if (won === "lost" && reason === "") {
      swal({
        title: "Attention",
        text: "Please add some reason!",
        icon: "error",
        dangerMode: true,
      })

    }
    else if (won == "won" && (searchval === "" || assgn === "" || contact === "") && ass) {
      swal({
        title: "Attention",
        text: "All fields required!",
        icon: "error",
        dangerMode: true,
      })

    }
    else {
      handlestage();
      apiMethod3("postLeadsSaveRequiredFields", formdata2);
      if (won == "won" && ass) {
        let formdata3 = new FormData();
        formdata3.append("saveRequiredFields", "true");
        formdata3.append("uLeadType", "assign");
        formdata3.append("userLead", ownerhidden);
        formdata3.append("uLead", leadId);
        formdata3.append("uLeadModule", "Lead");
        formdata3.append("pipeline", "Lead");
        formdata3.append("assignType", "convert");
        formdata3.append("pLead", assgn);
        formdata3.append("cLead", contact);
        formdata3.append("prop", "lead_p");
        apiMethod4("postLeadAssign", formdata3)
      }
    }
    ass = false;
  }
  const [iDs, setIDs] = useState("")
  const handleAssignL = (item, name,allData) => {
    setListOpen(false)
    setAssignsData(allData)
    setLeadId(allData?.lead_id)
    setIDs(item)
    setShowEdit2(true)
    axios
      .get(`${config.apiEndPoint}getLeadsWonStageFields/${item}&wonStage`,)
      .then((response) => {
        setSearchval(response.data.assign_user.assigned);
        Object.keys(response.data.contacts).map(function (key) {
          if(response.data.contacts[key].already_selected === "selected") {
            setContact(response.data.contacts[key].id)
            
          }
        })
        setOwnerhidden(response.data.assign_user.assigned_to);
        setLoading(false)
      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }

  const handleSubmitAssign = () => {
    let formdata2 = new FormData();
    formdata2.append("uLeadType", "assign");
    formdata2.append("uLead", iDs);
    formdata2.append("userLead", ownerhidden);
    formdata2.append("uLeadModule", "Lead");
    apiMethod5("postLeadAssign", formdata2)
    setShowEdit2(false)
  }
  useEffect(() => {
    if (res3.data) {
      refreshkanban(true);
      setShowEdit(false)
    }
  }, [res3]);

  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Save & Continue",
  };
  const handleLost = () => {
    if (reason == "") {
    }
    else {
      let formdata2 = new FormData();
      formdata2.append("reasonDetail", reason);
      formdata2.append("mode", "Lead");
      formdata2.append("lostreason", `${reason}:${leadId}`);
      apiMethod2("postLeadsLostStage", formdata2);
    }
  }
  return (
    <div
      ref={dropRef}
      style={{
        minWidth: `${card?.column_width || "300"}px`,
        maxWidth: `${card?.column_width || "300"}px`,
        minHeight: "300px",
        overflow: "auto",
      }}
      
      className="mx-1 mt-2 card__"
      data_stage_won={card.wonlost === "won" ? "yes" : "no"}
      data_stage_lost={card.wonlost === "lost" ? "yes" : "no"}
      id={`stage_id_${card.id}`}
    >
      <div
        className={`p-2 d-flex justify-content-between align-items-center`}
        style={{
          backgroundColor: card.bg_color,
          color: card.font_color
        }}
      >
        <h3 className="card-title m-0" style={{ color: `${card.font_color}` }}> {card.name}</h3>
        <div className="card-options align-item-center">
          <Link
            style={{ fontSize: "20px", marginRight: "5px", color: `${card.font_color}` }}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className={`droa ${open && "active"}`}
          >
            <i className="fe fe-chevron-up"></i>
          </Link>
          <Link onClick={(e) => handleFullScreen(e)}
            className="m-0 card-options-fullscreen">
            <i style={{ "color": `${card.font_color}` }} className="fe fe-maximize"></i>
          </Link>
          {(leadPermission?.super_admin || leadPermission?.lead_stages?.active_module !== "0") &&
            <Dropdown className="item-action dropdown ml-2">
              <Dropdown.Toggle className="clickButton p-0">
                <i style={{ "color": `${card.font_color}` }} className="fe fe-more-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {(leadPermission?.super_admin || leadPermission?.lead_stages?.edit === "1") &&
                  <Link to={`/${config.ddemoss}edit_leadstage/${card.id}`} className="dropdown-item"  >
                    <i className="dropdown-icon fa fa-edit"></i>Edit
                  </Link>
                }
                {(leadPermission?.super_admin || leadPermission?.lead_stages?.delete === "1") &&
                  <Link onClick={() => delte(card)} className="dropdown-item"  >
                    <i className="dropdown-icon fa fa-trash"></i>Delete
                  </Link>
                }
              </Dropdown.Menu>
            </Dropdown>
          }
          {/* <Dropdown className="item-action dropdown ml-2">
            <Dropdown.Toggle className="clickButton p-0">
              <i style={{ "color": `${card.font_color}` }} className="fe fe-more-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link to={`/${config.ddemoss}edit_leadstage/${card.id}`} className="dropdown-item"  >
                <i className="dropdown-icon fa fa-edit"></i>Edit
              </Link>
              <Link onClick={() => delte(card)} className="dropdown-item"  >
                <i className="dropdown-icon fa fa-trash"></i>Delete
              </Link>
            </Dropdown.Menu>
          </Dropdown> */}

        </div>
      </div>
      <Collapse in={open}>
        <div
          id="example-collapse-text"
          style={{ backgroundColor: "#ffffff", padding: 10 }}
        >
          {StageLeads.length ? StageLeads.map((val, index) => {
            return (
              val?.lead_id &&
              <List
                key={index}
                demo={index + val?.lead_id + card.id}
                id={val?.lead_id}
                name={val.email}
                lead_array={val}
                stageid={card.id}
                stagewon={card.wonlost}
                handleConvert={(item, name,lead_array) => handleAssigns(item, name,lead_array)}
                handleAssignLead={(item, name,lead_array) => handleAssignL(item, name,lead_array)}
              />
            );
          }) : ""}
        </div>
      </Collapse>

      <>
        <Modal show={showEdit} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {
                won == "won" ? names : won == "lost" ? "Reason for Lost Stage" : "Please fill the fields before update"
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form name="myForm">
                  {
                    vala ?
                      Object.keys(vala).map(function (key, index) {
                        const { type, body, field_required } = vala[key];
                        return (
                          <div key={index}>
                            {(() => {
                              if (type == "select") {
                                return (
                                  <FormControl
                                    firstSelect={"Select one"}
                                    className="form-control my-1"
                                    selectList={body.split(",")}
                                    required={field_required == true && true}
                                    label={Translation(translations, `${key.replaceAll(' ', '_')}`)}
                                    name={key}
                                    control="select3"
                                  />
                                );
                              } else if (
                                type == "radio"
                              ) {
                                return (
                                  <FormControl
                                    options={body.split(",")}
                                    required={field_required == true && true}
                                    label={Translation(translations, `${key}`)}
                                    name={key}
                                    control="radio3"
                                  />
                                );
                              } else if (type == "textarea") {
                                return (
                                  <FormControl
                                    className={"form-control my-1"}
                                    required={field_required == true && true}
                                    label={Translation(translations, `${key.replaceAll(' ', '_')}`)}
                                    name={key}
                                    control="textarea3"
                                  />
                                );
                              } else if (
                                type == "checkbox"

                              ) {
                                return (
                                  <>
                                    <FormControl
                                      options={body.split(",")}
                                      required={field_required == true && true}
                                      label={Translation(translations, `${key.replaceAll(' ', '_')}`)}
                                      name={key}
                                      control="checkbox"
                                    />
                                  </>
                                );
                              } else if (type == "text") {
                                return (
                                  <FormControl className="form-control my-1"
                                    required={field_required == true && true}
                                    label={Translation(translations, `${key.replaceAll(' ', '_')}`)}
                                    name={key}
                                    placeholder={Translation(translations, `${key.replaceAll(' ', '_')}`)}
                                    control="input"
                                  />
                                );
                              }
                            })()}
                          </div>
                        );
                      })

                      : ""

                  }
                  {
                    won == "won" ?
                      <>
                        <div className="col-md-12 mt-3">
                          <label className="form-label">
                            {Translation(translations, "if you wants to assign to another user")}
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
                              <ul className="list">
                                {resowner.isLoading ? (
                                  ""
                                ) : !resowner.data.message ? (
                                  resowner.data.map((item, index) => {
                                    return (
                                      item?.lead_follower === "yes" ? 
                                    <li  key={index} onClick={ () => handleClick(item)} >
                                     
                                    <span className="text-red">
                                        {Translation(translations, `${item.uname} (${item.role_name})`)} &nbsp;
                                      </span>
                                      - Lead Follower
                                             </li>
                                    
                                    :
                                    <li   key={index} onClick={ () => handleClick(item)} >  {Translation(translations, `${item.uname} (${item.role_name})`)}</li>
                                  )
                                    })) : (
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
                        <div className="mt-4">
                          <label className="mb-0">Assign Prospect Stage</label>
                          <select id="assgn_pros_stg" value={assgn} onChange={(e) => setAssgn(e.target.value)} className="form-control">
                            <option value="">--Select--</option>

                            {
                              Object.keys(wondata3).map(function (key, i) {
                                return (
                                  <option key={i} value={wondata3[key].id}>{wondata3[key].body}</option>
                                );
                              })}

                          </select>
                        </div>

                        <div className="mt-4 mb-3">
                          <label className="mb-0">Type of Contact</label>
                          {console.log(contact)}
                          <select required="" value={contact} onChange={(e) => setContact(e.target.value)} name="contact_type" className="form-control custom-select">
                            <option value="">--Select--</option>
                            {
                              Object.keys(wondata2).map(function (key, i) {
                                return (
                                  <option key={i} value={wondata2[key].id}>{wondata2[key].type_name}</option>
                                )
                              })}
                          </select>
                        </div>
                      </>
                      :
                      won == "lost" ?

                        <>
                          <div className="stage-content">
                            <div className="form-group">
                              <h6 className="mb-2">Reason for Lost Stage</h6>
                            </div>
                            <select value={reason} className="form-control" onChange={(e) => setReason(e.target.value)} id="reasonDetail">
                              <option value="">--Select Lost Reason--</option>
                              {lostdata.length && lostdata.map((item, index) => {
                                return (
                                  <option value={item.reason_id} key={index}>{item.reason_description}</option>

                                )
                              })}
                            </select> </div>

                        </>

                        : ""

                  }
                  <hr />
                  {
                    won == "won" ?
                      <div className="modal-footer px-0">
                        <button type="submit" value="sumit" onClick={handleAssign} className="btn btn-primary btn-new">Assign &amp; Convert</button>
                        <button type="submit" value="submit" className="btn btn-primary not_now">Not Now</button>
                      </div>
                      : won == "lost" ?
                        <div className="modal-footer">
                          <button type="submit" value="smit" onClick={handleLost} className="btn btn-primary btn-lost">Save</button>
                        </div>

                        : <SubmitButton
                          props={submitbutton}
                          buttonLoading={res2.isLoading}
                        />
                  }



                </Form>
              </Formik>
            </div>
          </Modal.Body>
        </Modal>


        <Modal show={showEdit2} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Lead</Modal.Title>
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
                          item?.lead_follower === "yes" ? 
                          <li  key={index} onClick={ () => handleClick(item)} >
                           
                          <span className="text-red">
                              {Translation(translations, `${item.uname} (${item.role_name})`)} &nbsp;
                            </span>
                            - Lead Follower
                                   </li>
                          
                          :
                          <li   key={index} onClick={ () => handleClick(item)} >  {Translation(translations, `${item.uname} (${item.role_name})`)}</li>
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
              <button type="button" onClick={handleClose} className="btn btn-default not_now">Not Now</button>
              <button type="button" onClick={handleSubmitAssign} className="btn btn-primary btn-leadassignst">Assign Lead</button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Card;
