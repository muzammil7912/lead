import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainTranslationContext } from "../context/MainTranslationContext";
import { toggleSidebar } from "./SidebarToggle";
import config from "../services/config.json";
import Dropdown from "react-bootstrap/Dropdown";
import usePost from "../customHooks/usePost";
import Papa from "papaparse";
import Button from "react-bootstrap/Button";
import { Form, Formik, Field } from "formik";
import SubmitButton from "./SubmitButton";
import ConverAssignModal from "../Lead/ConverAssignModal";
import ConverAssignProspectModal from "../AllProspect/ConvertAssignProspectModal";
import { isConvertAssign } from "../context/convertAssignContext";
import { isConvertAssignProspect } from "../context/convertAssignContextProspect";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { FaAlignLeft, FaPlusSquare, FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { getTranslationimg, removeTokenSession } from "../utils/common";
import Modal from "react-bootstrap/Modal";
import { checkboxData } from "../Data/AllData";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainModuleContext } from "../context/MainModuleContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import useFetch from "../customHooks/useFetch";
import swal from "sweetalert";
import ConvertContact_Modal from "../AllContact/ConvertContactModal";
import axios from 'axios';
import { MainExportDataContext } from "../context/MainExportDataContext";
import ImportModal from "./ImportModal";
import { toast } from "react-toastify";

function Header({ data, Change }) {
  const [showConvertModal, setshowConvertModal] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  const { convertAssign } = useContext(isConvertAssign);
  const { convertAssignProspect } = useContext(isConvertAssignProspect);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { translations } = useContext(MainTranslationContexts);
  const { moduleCard } = useContext(MainModuleContext);
  const { exportData } = useContext(MainExportDataContext);
  const [lgShow, setLgShow] = useState(false);
  const [res, apiMethod] = usePost();
  const [res1, apiMethod1] = usePost();
  const [Customexport, setCustomexport] = useState(false);
  const [selectedradio, setselectedradio] = useState();
  const [moduleCards, setModuleCards] = useState();
  const [show, setShow] = useState(false);
  const [ExportHandler, setExportHandler] = useState();
  const [Loading, setLoading] = useState(false);

  const [exportD, setExportD] = useState()

  useEffect(() => {
    if (exportData) {
      let forex = []
      for (let index = 0; index < exportData.for_export.length; index++) {
        forex.push({ "Field": `${exportData.for_export[index]}` });
      }
      setExportD([...forex, ...exportData.fetchColumns])

    }
  }, [exportData])

  const modulee = {
    lead: "lead_data",
    prospect: "prospects_data",
    client: "Client_data",
    opp_pipelines: "opportunity_data",
  };
  const module2 = {
    lead: "lead_followers",
    prospect: "lead_followers",
    client: "lead_followers",
    opp_pipelines: "opportunity_follower",
  };
  useEffect(() => {
    // console.log([location.pathname.split("/")[1]]);
    // console.log(moduleCard[`${modulee[location.pathname.split("/")[1]]}`] [location.pathname.split("/")[1]] === "opp_pipelines" ? [module2[location.pathname.split("/")[1]]] : "")
    if (moduleCard) {
      console.log(moduleCard, "checking");
      console.log(location.pathname, "checking");
      if ([location.pathname.split("/")[1]].includes("opp_pipelines")) {
        if (moduleCard[`${modulee[location.pathname.split("/")[1]]}`]) {
          if (moduleCard[`${modulee[location.pathname.split("/")[1]]}`]) {
            if (
              moduleCard[`${modulee[location.pathname.split("/")[1]]}`][
              module2[location.pathname.split("/")[1]]
              ]
            ) {
              // console.log(
              //   moduleCard[`${modulee[location.pathname.split("/")[1]]}`][
              //   module2[location.pathname.split("/")[1]]
              //   ],
              //   "mzffdzzz"
              // );
              setModuleCards(
                moduleCard[`${modulee[location.pathname.split("/")[1]]}`][
                module2[location.pathname.split("/")[1]]
                ]
              );
            } else {
              setModuleCards("");
            }
          }
        }
      } else {
        if (moduleCard[`${modulee[location.pathname.split("/")[1]]}`]) {
          if (moduleCard[`${modulee[location.pathname.split("/")[1]]}`][0]) {
            if (
              moduleCard[`${modulee[location.pathname.split("/")[1]]}`][0][
              module2[location.pathname.split("/")[1]]
              ]
            ) {
              // console.log(
              //   moduleCard[`${modulee[location.pathname.split("/")[1]]}`][0][
              //   module2[location.pathname.split("/")[1]]
              //   ],
              //   "mzzzz"
              // );
              setModuleCards(
                moduleCard[`${modulee[location.pathname.split("/")[1]]}`][0][
                module2[location.pathname.split("/")[1]]
                ]
              );
            } else {
              setModuleCards("");
            }
          }
        }
      }
    }
  }, [moduleCard, location.pathname]);

  let array = [`/${config.ddemoss}leads/Grid`, `/${config.ddemoss}all_prospects/Grid`, `/${config.ddemoss}clients/Grid`];
  let array2 = [
    `lead`,
    "prospect",
    "client",
    "contact",
    "opp_pipelines",
    "project",
  ];
  const { heading } = useContext(MainHeadingContext);
  const { transData } = useContext(MainTranslationContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const [reslog, apiMethodlog] = usePost();
  const signOut = () => {
    let formData = new FormData();
    apiMethodlog("getLogOut", formData);
   
  };
  useEffect(() => {
 if(reslog.data) {
  if(reslog.data.success === 1) {
    toast.success(reslog.data.message);
    removeTokenSession();
    navigate(`/${config.ddemoss}login`);
  }

 }
  }, [reslog.data])
  
  const hanldeTranslate = (item) => {
    Change(item);
  };
  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Submit",
  };

  const handleOptionChange = (selected) => {
    setselectedradio(selected.target.value);
    if (selected.target.value === "2") {
      setCustomexport(true);
    } else {
      setCustomexport(false);
      setLoading(true)
      var path = location.pathname;
      if (path.includes("leads/Grid")) {
        let formdata = new FormData();
        formdata.append("export_all_data", selected.target.value);
        formdata.append("export_module", "Lead");
        formdata.append("module_field_type", "leads");
        formdata.append("export_data", "Submit");
        apiMethod1("postExportData", formdata);
      }
      else if (path.includes("all_prospects/Grid")) {
        let formdata = new FormData();
        formdata.append("export_all_data", selected.target.value);
        formdata.append("export_module", "Prospect");
        formdata.append("module_field_type", "prospects");
        formdata.append("export_data", "Submit");
        apiMethod1("postExportData", formdata);
      }
      else if (path.includes("clients/Grid")) {
        let formdata = new FormData();
        formdata.append("export_all_data", selected.target.value);
        formdata.append("export_module", "Client");
        formdata.append("module_field_type", "clients");
        formdata.append("export_data", "Submit");
        apiMethod1("postExportData", formdata);
      }
    }
  };

  useEffect(() => {
    if (Array.isArray(res.data)) {
      // setExportHandler(res.data)
      handleExportCsv();

      // console.log(res.data);
    }
  }, [res.data]);


  useEffect(() => {
    if (res1.data) {
      Array.isArray(res1.data) && setExportHandler(res1.data)
      setLoading(false)
    }
  }, [res1.data]);


  const handleExportCsvAll = () => {
    if (Array.isArray(ExportHandler)) {
      // convert API data to CSV
      let csv = Papa.unparse(ExportHandler && ExportHandler);
      // download CSV file
      const downloadLink = document.createElement("a");
      const blob = new Blob(["\ufeff", csv]);
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = "api-data.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setLgShow(false)
      setExportHandler("")
    } else {
      swal({
        title: "Select Item",
        text: `Please select one `,
        icon: "warning",
        dangerMode: true,
      });
    }
  };



  const handleExportCsv = () => {
    if (Array.isArray(res.data)) {
      // convert API data to CSV
      let csv = Papa.unparse(res.data && res.data);
      // download CSV file
      const downloadLink = document.createElement("a");
      const blob = new Blob(["\ufeff", csv]);
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = "api-data.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setCustomexport(false);
      setLoading(false)
      setLgShow(false)
    }
  };
  const initialValues = {

  };

  const HandleSubmit = (values) => {
    const keys = Object.keys(values);
    const lengths = keys.length;
    var path = location.pathname;
    if (lengths > 0) {
      setLoading(true)
      let formdata = new FormData();
      formdata.append("export_all_data", selectedradio);
      for (let item in values) {
        let data = values[item].toString();
        if (selectedradio === "2") {
          if (data == "") {
          } else {
            formdata.append(`fileds[${item}]`, data);
          }
        }
      }
      if (path.includes("leads/Grid")) {
        formdata.append("export_module", "Lead");
        formdata.append("module_field_type", "leads");
      }
      else if (path.includes("all_prospects/Grid")) {
        formdata.append("export_module", "Prospect");
        formdata.append("module_field_type", "prospects");
      }
      else if (path.includes("clients/Grid")) {
        formdata.append("export_module", "Client");
        formdata.append("module_field_type", "clients");
      }
      formdata.append("export_data", "Submit");
      apiMethod("postExportData", formdata);
    } else {
      swal({
        title: "Select Item",
        text: `Please select one `,
        icon: "warning",
        dangerMode: true,

      });
    }
  };


  return (
    <div id="page_top" className="section-body sticky-top">
      {lgShow && <div className="modal-backdrop show" />}

      <div className="container-fluid">
        <div className="page-header p-0">
          <div className="left">
            <button
              className="icon clickButton menu_toggle mr-3"
              onClick={toggleSidebar}
            >
              <FaAlignLeft />
            </button>
            <h1 id="page-title" className="page-title">
              {heading ? heading : "Dashboard"}
            </h1>
            {array2.includes(location.pathname.split("/")[1]) &&
              location.pathname.includes("edit") &&
              location.pathname.includes("lead") &&
              convertAssign && <ConverAssignModal />}
            {array2.includes(location.pathname.split("/")[1]) &&
              (location.pathname.includes("edit") || location.pathname.includes("view")) &&
              location.pathname.includes("contact") &&
              <ConvertContact_Modal />}
            {/* {array2.includes(location.pathname.split("/")[1]) &&
                location.pathname.includes("edit") &&
                location.pathname.includes("prospect") &&
                convertAssignProspect && <ConverAssignProspectModal />} */}
            {array2.includes(location.pathname.split("/")[1]) &&
              location.pathname.includes("view") && (
                <>
                  {leadPermission?.super_admin ? (
                    <>
                      <Link
                        to={`/${config.ddemoss}${location.pathname.split("/")[1]
                          }/edit/${location.pathname.split("/")[4]}`}
                        className="btn btn-default btn-sm bsm headerbtn_ box_shadow"
                      >
                        <i className="fa fa-edit"></i> Edit
                      </Link>
                    </>
                  ) : leadPermission[`${location.pathname.split("/")[1]}s`]
                    ?.edit === "1" &&
                    moduleCards &&
                    moduleCards?.split(",").includes(permissions.id) ? (
                    ""
                  ) : (
                    <>
                      {moduleCards?.split(",").includes(permissions.id) ===
                        false && (
                          <>
                            <Link
                              to={`/${config.ddemoss}${location.pathname.split("/")[1]
                                }/edit/${location.pathname.split("/")[4]}`}
                              className="btn btn-default btn-sm bsm headerbtn_ box_shadow"
                            >
                              {/* {console.log(
                                moduleCards,
                                "kdljdk",
                                moduleCards?.split(",").includes(permissions.id)
                              )} */}
                              <i className="fa fa-edit"></i> Edit
                            </Link>
                          </>
                        )}
                    </>
                  )}
                </>
              )}
            {array.includes(location.pathname) && (
              <>
                {
                  location.pathname.includes("leads/Grid") &&
                  (leadPermission?.super_admin || (leadPermission?.leads?.fields?.leads_export == "true" || leadPermission?.leads?.fields?.leads_export == "1")) && (
                    <Link
                      className="btn btn-default btn-sm bsm export_lead headerbtn_"
                      onClick={() => setLgShow(true)}
                    >
                      <span className="fas fa-file-export"></span> Export
                    </Link>
                  )}
                {
                  location.pathname.includes("all_prospects/Grid")
                  && (leadPermission?.super_admin || (leadPermission?.prospects.fields.prospects_export == "true" || leadPermission?.prospects.fields.prospects_export == "1")) &&
                  <Link
                    className="btn btn-default btn-sm bsm export_lead headerbtn_"
                    onClick={() => setLgShow(true)}
                  >
                    <span className="fas fa-file-export"></span> Export
                  </Link>
                }
                {
                  location.pathname.includes("clients/Grid")
                  && (leadPermission?.super_admin || (leadPermission?.clients.fields.clients_export == "true" || leadPermission?.clients.fields.clients_export == "1")) &&
                  <Link
                    className="btn btn-default btn-sm bsm export_lead headerbtn_"
                    onClick={() => setLgShow(true)}
                  >
                    <span className="fas fa-file-export"></span> Export
                  </Link>
                }

                <Modal
                  size="xl"
                  show={lgShow}
                  onHide={() => {
                    setLgShow(false)
                    setCustomexport(false);
                    setLoading(false)
                    setExportHandler("")
                  }}
                  aria-labelledby="example-modal-sizes-title-lg"
                  className="pes-modal"
                >
                  <Modal.Body>
                    <div className="Parent-header">
                      <div>
                        <h3>Export data</h3>
                      </div>
                      <div
                        className="close_popup atclose"
                        onClick={() => {
                          setLgShow(false)
                          setCustomexport(false);
                          setLoading(false)
                          setExportHandler("")
                        }}
                      >
                        X
                      </div>
                    </div>
                    <div className="cus-body">
                      <label htmlFor="export_all_data" className="cus-label">
                        Export all data
                      </label>
                      <input
                        type="radio"
                        value="1"
                        name="exportdata"
                        id="export_all_data"
                        onChange={handleOptionChange}
                      />
                      <br />
                      <label
                        htmlFor="export_selected_data"
                        className="cus-label"
                      >
                        Export selected data
                      </label>
                      <input
                        type="radio"
                        value="2"
                        name="exportdata"
                        id="export_selected_data"
                        onChange={handleOptionChange}
                      />
                    </div>
                    <div className="container-fluid px-0" id="gridcol">
                      {Loading &&
                        <span className="span_loader">
                          <i className="fa fa-pulse fa-spinner"></i>
                        </span>}
                    </div>
                    {Customexport ? null : (
                      <Modal.Footer>
                        <Button
                          className="btn btn-primary mt-3 ml-auto d-block"
                          variant="secondary"
                          onClick={handleExportCsvAll}
                        >
                          Submit
                        </Button>
                      </Modal.Footer>
                    )}

                    {Customexport && (
                      <Formik
                        initialValues={initialValues}
                        onSubmit={HandleSubmit}
                      >
                        <Form name="myForm">
                          <div className="row">
                            {exportD.map((items, i) => {
                              return (
                                <div className="col-sm-3" key={i}>
                                  <label>
                                    <Field
                                      type="checkbox"
                                      name={
                                        items?.Field
                                          ? (
                                            items?.Field.charAt(
                                              0
                                            ).toUpperCase() +
                                            items?.Field.slice(1)
                                          ).replaceAll("_", " ")
                                          : (
                                            items?.name_slug
                                              .charAt(0)
                                              .toUpperCase() +
                                            items?.name_slug.slice(1)
                                          ).replaceAll("_", " ")
                                      }
                                      value={items?.Field ?? items?.name_slug}
                                    />{" "}
                                    {items?.Field
                                      ? (
                                        items?.Field.charAt(0).toUpperCase() +
                                        items?.Field.slice(1)
                                      ).replaceAll("_", " ")
                                      : (
                                        items?.name_slug
                                          .charAt(0)
                                          .toUpperCase() +
                                        items?.name_slug.slice(1)
                                      ).replaceAll("_", " ")}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          <Modal.Footer></Modal.Footer>
                          <SubmitButton
                            props={submitbutton}
                          // buttonLoading={res.isLoading}
                          />
                        </Form>
                      </Formik>
                    )}
                  </Modal.Body>
                </Modal>
                {
                  (location.pathname.includes("leads/Grid")
                    && (leadPermission?.super_admin || (leadPermission?.leads?.fields?.leads_import == "true" || leadPermission?.leads?.fields?.leads_import == "1")) &&
                    
                      <ImportModal />
                    
                   
                  )
                }
                {
                  location.pathname.includes("all_prospects/Grid")
                  && (leadPermission?.super_admin || (leadPermission?.prospects.fields.prospects_import == "true" || leadPermission?.prospects.fields.prospects_import == "1")) &&
                  <ImportModal />
                }
                {
                  location.pathname.includes("clients/Grid")
                  && (leadPermission?.super_admin || (leadPermission?.clients.fields.clients_import == "true" || leadPermission?.clients.fields.clients_import == "1")) &&
                  <ImportModal />
                }

               
              </>
            )}
          </div>
          <div className="right">
            <Dropdown className="d-flex">
              <Dropdown.Toggle className="nav-link custoncol clickButton icon d-none d-md-flex btn-default btn-icon ml-2">
                <FaPlusSquare />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <Link className="dropdown-item" to="createlead">
                  Create Lead
                </Link>
                <Link className="dropdown-item" to="create_prospect">
                  Create Prospect
                </Link>
                <Link className="dropdown-item" to="create_client">
                  Create Client
                </Link>
                <Link className="dropdown-item" to="create_contact">
                  Create Contact
                </Link>
                <Link className="dropdown-item" to="createopportunity">
                  Create Opportunities
                </Link>
                <Link className="dropdown-item" to="createproject">
                  Create Project
                </Link>
                <Link className="dropdown-item" to="createaction">
                  Create Action
                </Link>
                <Link className="dropdown-item" to="createfollowup">
                  Create Follow Up
                </Link>
                <Link className="dropdown-item" to="createmeeting">
                  Create Meeting
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            <div className="notification d-flex">
              <Dropdown className="dropdown d-flex">
                <Dropdown.Toggle className="nav-link custoncol clickButton icon d-none d-md-flex btn-default btn-icon ml-2">
                  <i className="fa fa-language"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className=" dropdown-menu-right dropdown-menu-arrow">
                  <a className="dropdown-item">
                    <img
                      className="w20 mr-2"
                      src={`${config.baseurl}assets/flags/${data?.lang_image || getTranslationimg()
                        }`}
                    />
                    <span>{`${data?.lang_name || "English"}`}</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  {transData &&
                    !transData?.message &&
                    transData?.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className="dropdown-item m-0 w-100"
                          onClick={() => hanldeTranslate(item)}
                        >
                          <img
                            className="w20 mr-2"
                            src={`${config.baseurl}/assets/flags/${item.lang_image}`}
                          />
                          {item.lang_name}
                        </button>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="dropdown d-flex">
                <Dropdown.Toggle
                  className="nav-link icon d-none d-md-flex btn-default btn-icon ml-2"
                  data-toggle="dropdown"
                >
                  <img
                    className="avatar"
                    src={
                      permissions?.avatar
                        ? permissions?.avatar.includes("http")
                          ? permissions?.avatar
                          : `${config.baseurl2}${permissions?.avatar}`
                        : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"
                    }
                    alt=""
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  {(leadPermission?.super_admin || (leadPermission?.profile_module?.view === '1'))
                    &&
                    <Link
                      className="dropdown-item"
                      to={`/${config.ddemoss}profile`}
                    >
                      <FaUserAlt /> Profile
                    </Link>}
                  {/* <a className="dropdown-item" >
                    <AiOutlineSetting /> Settings
                  </a> */}
                  {/* <Link to={"/"} className="dropdown-item" >
                    <span className="float-right">
                      <span className="badge badge-primary">6</span>
                    </span>
                    <FaEnvelope />
                    Inbox
                  </Link> */}
                  {/* <Link to={"/"} className="dropdown-item"><FaFacebookMessenger /> Message</Link>
                  <div className="dropdown-divider"></div> */}
                  {/* <Link to={"/"} className="dropdown-item"><FaHandsHelping /> Need help?</Link> */}
                  <button className="dropdown-item w-100 m-0" onClick={signOut}>
                    <AiOutlineLogout /> Sign out{" "}
                  </button>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
