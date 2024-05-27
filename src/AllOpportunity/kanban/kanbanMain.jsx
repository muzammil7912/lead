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

const Card = ({ idss, card, stagesOpportunity, delte, refreshkanban, refreshkanbanToke }) => {
  const { translations } = useContext(MainTranslationContexts);
  const [StageOpportunities, setStageOpportunities] = useState([]);
  const ownerRef = useRef(null);
  const [resowner, apiMethodowner] = usePost();
  const [lostapi, apiMethodlostapi] = usePost();
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [res3, apiMethod3] = usePost();
  const [res4, apiMethod4] = usePost();
  const [res5, apiMethod5] = usePost();
  const [open, setOpen] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showEdit2, setShowEdit2] = useState(false);
  const [stageId, setStageId] = useState(0);
  const [opportunityId, setOpportunityId] = useState(0);
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
  const [reason, setReason] = useState("");
  const [assgn, setAssgn] = useState("");
  const [contact, setContact] = useState("");
  const [prevstages, setPrevstage] = useState("");
  const [opportunity_arr, setOpportunity_arr] = useState("")
  const inputElement = useRef();
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const handleClick = (item) => {
    setSearchval(item.uname);
    setOwnerhidden(item.id);
    setListOpen(false);
  };
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const [{ isover }, dropRef] = useDrop({
    accept: "pet",

    drop: (item, monitor) => {
      let items = {
        "stage": card.id,
        "opportunity_id": monitor.getItem().id,
        "prevstage": monitor.getItem().stageid,

      }
      if(((monitor.getItem().opportunity_array.kanban_do_follow === false) || leadPermission.super_admin)) {
      if (items.prevstage !== items.stage){
      setStageId(card.id);
      setOpportunityId(monitor.getItem().id);
      setPrevstage(monitor.getItem().stageid)
      const StageDiv = document.getElementById('stage_id_' + card.id);
      let formdata = new FormData();
      formdata.append("requiredFields", true);
      formdata.append("stage", card.id);
      formdata.append("lead_id", monitor.getItem().id);
      formdata.append("mode", "Opportunity");
      formdata.append("module", "Opportunity");
      formdata.append("gtRs", idss);
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
      setOpportunity_arr("")
      apiMethod("postOpportunitiesRequiredFields", bodyContent);
      if(card.wonlost == "won") {
        setWon(card.wonlost)
        setNames(monitor.getItem().opportunity_array.fullName)
        setOpportunity_arr(monitor.getItem().opportunity_array)
      }
      if (card.wonlost == "lost") {
        setWon(card.wonlost)
        let formData = new FormData();
        formData.append("pipeline_id", idss)
        apiMethodlostapi("postAllOpportunityStagesSettings", formData)
      }

    }
  }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  useEffect(() => {
    if (lostapi.data) {
      setLostdata(lostapi.data);
    }
  }, [lostapi.data])

  const [vala, setVala] = useState("")
  const handlestage = () => {
    let formdata2 = new FormData();
    formdata2.append("gtRs", idss);
    formdata2.append("stage_id", stageId);
    formdata2.append("lead_id", opportunityId);
    formdata2.append("general", "kanban_update_pipeline_stage");
    apiMethod2("postUpdateOpportunityStage", formdata2);
  }
  useEffect(() => {
    if (res.data) {
     
      // Object.keys(res?.data?.required_fields).length > 0  ||
      if ( (won == "won" && opportunity_arr.prospectOwner === true)  || won == "lost" ) {
        if (prevstages != stageId) {
          setShowEdit(true)
          // setVala(res.data.required_fields)

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
  }, [res2]);

  useEffect(() => {
    if (stagesOpportunity && card) {

      if (stagesOpportunity[card.id] && stagesOpportunity[card.id].length > 0) {
        setStageOpportunities(stagesOpportunity[card.id]);

      }
      else {
        setStageOpportunities("")
      }
    }
  }, [stagesOpportunity, card.id]);
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
      console.log(res4.data)
      // navigate(`/${config.ddemoss}${res4.data.redirect}`);
    }
  }, [res4])

  const handleAssigns = (id, name,stageid,opportunity_array) => {
    setOpportunity_arr(opportunity_array)
    setWon(card.wonlost)
    setNames(opportunity_array?.fullName)
    setShowEdit(true)
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
    for (let item in vala) {
      if (vala[item].field_required == true) {

      }
    }
    let formdata2 = new FormData();
    formdata2.append("cf_sr", "req_cf_svr");
    formdata2.append("lead", opportunityId);
    formdata2.append("mode", "Opportunity");
    formdata2.append("pipeline", idss);
    formdata2.append("stage", prevstages);

    let map = []
    for (let item in values) {
      map.push(item)

      formdata2.append(item, values[item]);
    }
    let vv = redd.filter((item) => !map.includes(item))
    let a = vv.join(",")
    if (vv.length > 0) {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: a,
        icon: "error",
        dangerMode: true,
      })


    }
    else if (won == "lost" && reason == "") {
      swal({
        title: "Attention",
        text: "Please add some reason!",
        icon: "error",
        dangerMode: true,
      })

    }
    else {
      handlestage();
      apiMethod3("postOpportunitiesSaveRequiredFields", formdata2);
      if (won == "won" && ass) {
        let formdata3 = new FormData();
        formdata3.append("general", "pipeline_prospect_conv");
        formdata3.append("opportunityId", opportunity_arr.opportunity_id);
     
        apiMethod4("postOpportunityWonStageFields", formdata3)
      }
    }
    ass = false;
  }
  const [iDs, setIDs] = useState("")
  const handleAssignL = (item, name) => {
    setIDs(item)
    setShowEdit2(true)
    axios
      .get(`${config.apiEndPoint}getOpportunitiesWonStageFields/${item}&wonStage`,)
      .then((response) => {
        setSearchval(response.data.assign_user.assigned);
        setOwnerhidden(response.data.assign_user.assigned_to);
      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }

  const handleSubmitAssign = () => {
    let formdata2 = new FormData();
    formdata2.append("uOpportunityType", "assign");
    formdata2.append("uOpportunity", iDs);
    formdata2.append("userOpportunity", ownerhidden);
    formdata2.append("uOpportunityModule", "Opportunity");
    apiMethod5("postOpportunityAssign", formdata2)
    setShowEdit2(false)
  }
  useEffect(() => {
    if (res3.data) {
      refreshkanban(true);
      setShowEdit(false)
    }
  }, [res3.data]);

  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Save & Continue",
  };
  const handleLost = () => {
    if (reason == "") {
    }
    else {
      let formdata2 = new FormData();
      formdata2.append("general", "update_opp_lost_reason");
      formdata2.append("pipeline", idss);
      formdata2.append("reasonDetail", reason);
      formdata2.append("lostreason", `${reason}:${opportunityId}`);
      apiMethod2("postOpportnityLostStage", formdata2);
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
          {(leadPermission?.super_admin || leadPermission?.opportunity_stages?.active_module !== "0") &&
            <Dropdown className="item-action dropdown ml-2">
              <Dropdown.Toggle className="clickButton p-0">
                <i style={{ "color": `${card.font_color}` }} className="fe fe-more-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {(leadPermission?.super_admin || leadPermission?.opportunity_stages?.edit === "1") &&
                  <Link to={`/${config.ddemoss}opportunity_pipelines/${idss}/edit_stage/${card.id}`} className="dropdown-item"  >
                    <i className="dropdown-icon fa fa-edit"></i>Edit
                  </Link>
                }
                {(leadPermission?.super_admin || leadPermission?.opportunity_stages?.delete === "1") &&
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
              <Link to={`/${config.ddemoss}opportunity_pipelines/${idss}/edit_stage/${card.id}`} className="dropdown-item"  >
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
          {StageOpportunities.length ? StageOpportunities.map((val, index) => {
            return (
              <List
                key={index + card.id}
                id={val.opportunity_id}
                name={val.email}
                opportunity_array={val}
                stageid={card.id}
                stagewon={card.wonlost}
                handleConvert={(id, name,stageid,opportunity_array) => handleAssigns(id, name,stageid,opportunity_array)}
                handleAssignOpportunity={(item, name) => handleAssignL(item, name)}

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
               (won == "won") ? names : won == "lost" ? "Reason for Lost Stage" : "Please fill the fields before update"
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
                                    className="form-control my-1"
                                    selectList={body.split(",")}
                                    required={field_required == true && true}
                                    label={Translation(translations, `${key.replaceAll('_', ' ')}`)}
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
                                    label={Translation(translations, `${key.replaceAll('_', ' ')}`)}
                                    name={key}
                                    control="radio3"
                                  />
                                );
                              } else if (type == "textarea") {
                                return (
                                  <FormControl
                                    className={"form-control my-1"}
                                    required={field_required == true && true}
                                    label={Translation(translations, `${key.replaceAll('_', ' ')}`)}
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
                                       label={Translation(translations, `${key.replaceAll('_', ' ')}`)}
                                      name={key}
                                      control="checkbox"
                                    />
                                  </>
                                );
                              } else if (type == "text") {
                                return (
                                  <FormControl className="form-control my-1"
                                    required={field_required == true && true}
                                     label={Translation(translations, `${key.replaceAll('_', ' ')}`)}
                                    name={key}
                                    placeholder={Translation(translations, `${key.replaceAll('_', ' ')}`)}
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
                    (won == "won") ?
                      <>
                        <div className="new-stage-content"><div className="form-group text-center"><p>Convert the Prospect to the Client?</p> 
                        <div className="d-flex gap-1 justify-content-center"> <button  onClick={handleAssign} className="btn btn-primary btn-new">Yes</button> 
                        <button  className="btn btn-default not_now">No</button> </div> </div></div>
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
                                  <option key={index} value={item.reason_id}>{item.reason_description}</option>

                                )
                              })}
                            </select> </div>

                        </>

                        : ""

                  }
                  <hr />
                  {
                    (won == "won") ?
                     ""
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
            <Modal.Title>Assign Opportunity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 mt-3">
              <label className="form-label">
                {Translation(translations, "Opportunity Assign to")}
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
                          <li
                            key={index}
                            onClick={() => handleClick(item)}
                          >
                            {Translation(translations, `${item.uname}`)}
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

          {  <div className="modal-footer mt-3">
              <button type="button" onClick={handleClose} className="btn btn-default not_now">Not Now</button>
              <button type="button" onClick={handleSubmitAssign} className="btn btn-primary btn-opportunityassignst">Assign Opportunity</button>
            </div>}
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default Card;
