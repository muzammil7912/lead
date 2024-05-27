import React, { useState, useRef, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { isConvertAssignProspect } from "../context/convertAssignContextProspect";
import usePost from "../customHooks/usePost";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import config from "../services/config.json";

import { Translation } from "../components/Translation";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
function ConverAssignProspectModal() {
  const { translations } = useContext(MainTranslationContexts);
  const navigate = useNavigate();

  const {
    convertAssignProspect,
    setconvertAssignProspect,
    convertAssignProspectDefault,
    setconvertAssignProspectDefault,
  } = useContext(isConvertAssignProspect);

  const [show, setShow] = useState(false);
  const [res_type_of_contact_list, apiMethod_type_of_contact_list] = usePost();
  const [ressubmit, apiMethodSubmit] = usePost();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ownerRef = useRef(null);
  const inputElement = useRef();
  const [assgn, setAssgn] = useState("");
  const [wondata3, setWondata3] = useState("");
  const [ownerhidden, setOwnerhidden] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [searchval, setSearchval] = useState("");
  const [typeVal, settypeVal] = useState("");
  const [resowner, apiMethodowner] = usePost();
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

  useEffect(() => {
    apiMethod_type_of_contact_list("postAllViewTypeContact", {
      type: "Lead,Prospect,Client",
    });
  }, []);

  useEffect(() => {
    if (convertAssignProspectDefault) {
      setSearchval(convertAssignProspectDefault.assignTo.assignName);
      setOwnerhidden(convertAssignProspectDefault.assignTo.assignId);
      setAssgn(convertAssignProspectDefault.stageData.previousStage);
      settypeVal(convertAssignProspectDefault.type);
    }
  }, [convertAssignProspectDefault]);

  const handleSubmit = () => {
    if (convertAssignProspectDefault) {
      let formdata = new FormData();
      formdata.append("saveRequiredFields", "true");
      formdata.append("uLeadType", "assign");
      formdata.append("uLeadModule", "Prospect");
      formdata.append("assignType", "convert");
      formdata.append("pipeline", "Prospect");
      formdata.append("prop", "lead_p");
      formdata.append("uLead", convertAssignProspectDefault.editId);
      formdata.append("userLead", ownerhidden);
      formdata.append("pLead", assgn);
      formdata.append("cLead", typeVal);
      // apiMethodSubmit("postLeadAssign", formdata);
    }
  };

  useEffect(() => {
    if (ressubmit.data) {
      navigate(`${ressubmit.data.redirect}`);
    }
  }, [ressubmit]);

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-default btn-sm bsm headerbtn_ box_shadow"
        onClick={handleShow}
      >
        Convert & Assign
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign & Convert Prospect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {convertAssignProspectDefault && (
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
                <label className="mb-0">Assign Prospect Stage</label>
                <select
                  id="assgn_pros_stg"
                  value={assgn}
                  onChange={(e) => setAssgn(e.target.value)}
                  className="form-control"
                >
                  <option value="">--Select--</option>

                  { convertAssignProspectDefault&&Array.isArray(convertAssignProspectDefault.stageData.list) &&
                    convertAssignProspectDefault.stageData.list.map(function (key, i) {
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
                  defaultValue={typeVal}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConverAssignProspectModal;
