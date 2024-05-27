import React, { useState, useRef, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { isConvertAssign } from "../context/convertAssignContext";
import usePost from "../customHooks/usePost";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {  useNavigate } from "react-router-dom";
import config from "../services/config.json";
import swal from "sweetalert";
import { Translation } from "../components/Translation";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { getTokenSession } from "../utils/common";
import axios from "axios";
import FormControl from "../components/form/FormControl";
import { Form, Formik } from "formik";
// import { MainTranslationContexts } from "../../context/MainTranslationContexts";
function ConverAssignModal({WOnIDs,showConvertModa2,showConvertModal,id,dropDownMode,showChange}) {
  const { translations } = useContext(MainTranslationContexts);
  const [converted, setconverted] = useState(false)
  const navigate = useNavigate();

  const {
    convertAssign,
    setconvertAssign,
    convertAssignDefault,
    setconvertAssignDefault,
  } = useContext(isConvertAssign);
  const [headerpop, setHeaderpop] = useState(false)
  const [show, setShow] = useState(false);
  const [res_type_of_contact_list, apiMethod_type_of_contact_list] = usePost();
  const [ressubmit, apiMethodSubmit] = usePost();
  const handleClose = () => {
    if(showConvertModa2) {
      showChange(false)
    }
    setHeaderpop(false)
    setShow(false);
    
  }

  const handleShow = () => 
  {
  // showChange && showChange("true") 
  setHeaderpop(true)
    setShow(true);
  }
  let ass = false;
  const initialValues2 = {

  }
  useEffect(()=>{
    console.log(showConvertModal,"Defwef")
if(showConvertModal){
  handleShow()
  
}
  },[showConvertModal])
  const ownerRef = useRef(null);
  const inputElement = useRef();
  const [assgn, setAssgn] = useState("");
  const [stageData, setStageData] = useState(null);
  const [ownerhidden, setOwnerhidden] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [searchval, setSearchval] = useState("");
  const [typeVal, settypeVal] = useState("");
  const [resowner, apiMethodowner] = usePost();
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [res3, apiMethod3] = usePost();
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };

  const handleClick = (item) => {
    setSearchval(item.uname);
    setOwnerhidden(item.id);
    setListOpen(false);
  };


const [vala, setVala] = useState("")
const [vala2, setVala2] = useState("")
  useEffect(() => {
    console.log(showConvertModa2)
    if ((convertAssignDefault && showConvertModa2) || headerpop) {
      let formdata = new FormData();
      formdata.append("requiredFields", true);
      formdata.append("lead_id", convertAssignDefault.editId);
      let stageId =""
      for (let index = 0; index < convertAssignDefault.stageData.list.length; index++) {
       if( convertAssignDefault.stageData.list[index].wonlost === "won")
        stageId = convertAssignDefault.stageData.list[index].id;
        setVala2(convertAssignDefault.stageData.list[index].id)  
      }
      formdata.append("stage", stageId);
      formdata.append("lead_id", convertAssignDefault.editId);
      formdata.append("mode", "leads");
      formdata.append("module", "Lead");
      formdata.append("submit", true);
      let bodyContent = formdata;
      apiMethod("postLeadsRequiredFields", bodyContent);
      apiMethod_type_of_contact_list("postAllViewTypeContact", {
        type: "Lead,Prospect,Client",
      });
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
      .get(`${config.apiEndPoint}getLeadsWonStageFields/${convertAssignDefault.editId}&wonStage`,)
      .then((response) => {
        setStageData(response.data.prospect_stages)
        setSearchval(response.data.assign_user.assigned);
      setOwnerhidden(response.data.assign_user.assigned_to);
      Object.keys(response.data.contacts).map(function (key) {
        if(response.data.contacts[key].already_selected) {
          settypeVal(response.data.contacts[key].id);
        }
      })
      })
    }
  }, [convertAssignDefault,showConvertModa2,headerpop]);

  useEffect(() => {
    if(res.data) {
      setVala(res.data.required_fields)
      handleShow()
    }
  }, [res.data])
  



  const handlestage = () => {
    let formdata2 = new FormData();
    let stageId =""
    for (let index = 0; index < convertAssignDefault.stageData.list.length; index++) {
      if( convertAssignDefault.stageData.list[index].wonlost === "won")
       stageId = convertAssignDefault.stageData.list[index].id;
       
     }
    formdata2.append("stage_id", stageId);
    formdata2.append("lead_id", convertAssignDefault?.editId);
    formdata2.append("module", "Lead");
    if(stageId !== convertAssignDefault?.stageData?.previousStage) {
      apiMethod2("postUpdateLeadsStage", formdata2);
    }
  }

  const handleAssign = () => {
    ass = true;
  }
  const handleSubmit2 = (values) => {
    let redd = []
    Object.keys(vala).map(function (key, index) {
      if (vala[key].field_required == true) {
        redd.push(key)
      }
    })

    let formdata2 = new FormData();
    formdata2.append("saveRequiredFields", "true");
    formdata2.append("lead_id", convertAssignDefault?.editId);
    formdata2.append("mode", "Lead");

    let map = []
    for (let item in values) {
      map.push(item)
      formdata2.append(item, values[item]);
    }
    let vv = redd.filter((item) => !map.includes(item))
    let a = vv.join(",");
    let b = a.replaceAll("_", " ");

    if (vv.length > 0) {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: b,
        icon: "error",
        dangerMode: true,
      })
    }
      else if ((searchval === "" || assgn === "" || typeVal === "") && ass) {
        swal({
          title: "Attention",
          text: "All fields required!",
          icon: "error",
          dangerMode: true,
        })
      }
        else {
          handlestage()
          apiMethod3("postLeadsSaveRequiredFields", formdata2);
          if (ass) {
          let formdata = new FormData();
          formdata.append("saveRequiredFields", "true");
          formdata.append("uLeadType", "assign");
          formdata.append("uLeadModule", "Lead");
          formdata.append("assignType", "convert");
          formdata.append("pipeline", "Lead");
          formdata.append("prop", "lead_p");
          formdata.append("uLead", convertAssignDefault?.editId);
          formdata.append("userLead", ownerhidden);
          formdata.append("pLead", assgn);
          formdata.append("cLead", typeVal);
          apiMethodSubmit("postLeadAssign", formdata);
          }
         
        }
       
   
  };
  useEffect(() => {
    if(res3.data) {
      setShow(false)
      // ass = false;
      // window.location.reload(true);
    } 
  }, [res2.data])
  

  useEffect(() => {
    if (ressubmit.data) {
      if(ressubmit.data.redirect === "all_prospects") {
        navigate(`/${config.ddemoss}${ressubmit.data.redirect}/Grid`);
      }
      else {
        navigate(`/${config.ddemoss}${ressubmit.data.redirect}`);
      }
    }
  }, [ressubmit]);

  return (
    <>
   {showConvertModal!==true &&   <Button
        variant="primary"
        className="btn btn-default btn-sm bsm headerbtn_ box_shadow"
        onClick={handleShow}
      >
        Convert & Assign
      </Button>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign & Convert Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik initialValues={initialValues2} onSubmit={handleSubmit2}>
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
          {convertAssignDefault && (
            <>
              <div className="col-md-12 mt-3">
                <label className="form-label">
                  {Translation(
                    translations,
                    "if you wants to assign to another user"
                  )}
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
                            <li key={index} onClick={() => handleClick(item)}>
                              {Translation(translations, `${item.uname} (${item.role_name})`)}
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
              <div className="mt-4">
                <label className="mb-0">Assign Lead Stage</label>
                <select
                  id="assgn_pros_stg"
                  value={assgn}
                  onChange={(e) => setAssgn(e.target.value)}
                  className="form-control"
                >
                  <option value="">--Select--</option>

                  {Array.isArray(stageData) &&
                    stageData.map(function (key, i) {
                      return (
                        <option key={i} value={key.id}>
                          {key.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="mt-4 mb-3">
                <label className="mb-0">Type of Contact</label>
                <select
                  onChange={(e) => {
                    settypeVal(e.target.value);
                  }}
                  value={typeVal}
                  name="contact_type"
                  className="form-control custom-select"
                >
                  <option value="">--Select--</option>
                  {Array.isArray(res_type_of_contact_list.data) &&
                    res_type_of_contact_list.data.map(function (key, i) {
                      return (
                        <option key={i} value={key.db_id}>
                          {key.type_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </>
          )}
            <div className="modal-footer px-0">
                        <button type="submit" value="sumit" onClick={handleAssign} className="btn btn-primary btn-new">Assign &amp; Convert</button>
                        {
                        // <button type="submit" value="submit" className="btn btn-primary not_now">Not Now</button>
                        }
                      </div>
          </Form>
           </Formik>
        </Modal.Body>
       
      </Modal>
    </>
  );
}

export default ConverAssignModal;
