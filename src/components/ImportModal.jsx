import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useLocation } from "react-router-dom";
import usePost from "../customHooks/usePost";
import { getTokenSession } from "../utils/common";
import { handleFullScreen, handleToggle } from "./AllCustomFuntion";
import config from "../services/config.json";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Translation } from "./Translation";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
function ImportModal() {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  let location = useLocation();
  let modules = { leads: "Lead", all_prospects: "Prospect", clients: "Client" };
  let modules4 = { leads: "leads", all_prospects: "prospects", clients: "clients" };
  let modules2 = {
    leads: "lead_stage",
    all_prospects: "prospect_stage",
    clients: "client_stage",
  };
  let modules3 = {
    leads: "lead",
    all_prospects: "lead,prospect",
    clients: "lead,prospect,client",
  };
  let linkUrl = modules4[location.pathname.split("/")[1]]
  let linkUrl2 = modules2[location.pathname.split("/")[1]]
  let linkUrl3 = modules[location.pathname.split("/")[1]]
  let linkUrl4 = modules3[location.pathname.split("/")[1]]
  const [FeildMain, setFeildMain] = useState({
    [`fname`]: "First Name",
    [`lname`]: "Last Name",
    [`avatar`]: "Avatar",
    [`type_of_contact`]: "Type",
    [`email`]: "E-mail",
    [`email_status`]: "Email status",
    [`number`]: "Phone Number",
    [`mobile_phone`]: "Mobile Phone",
    [`${linkUrl2}`]: `${linkUrl3} Stage`,
    [`lead_assigned_to`]: "Owner",
    [`birthday`]: "Birthday",
    [`tags`]: "Tags",
    [`score_number`]: "Score Number",
    [`address_one`]: "Address 1",
    [`address_two`]: "Address 2",
    [`city`]: "City",
    [`zip`]: "Postal/ZIP Code",
    [`state`]: "State",
    [`country`]: "Country",
    [`ip_address`]: "IP Address",
    [`time_zone`]: "Time Zone",
    [`locale`]: "locale",
    [`sourcepage`]: "Source Page",
    [`lead_leadsource`]: "Lead Source",
    [`lead_leadmedium`]: "Lead Medium",
    [`create_date`]: "Create Date",
  });
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValueDef, setSelectedValueDef] = useState('');
  const [dropVal, setdropVal] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value == 'defualt') {
      axios.get(`${config.apiEndPoint}getAllNameImportTemplate`)
        .then(response => {
          setSelectedValueDef(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };
  const handleChange2 = (event) => {
    setdropVal(event.target.value)
    axios
      .get(
        `${config.apiEndPoint}getAllViewImportTemplate/${event.target.value
        }`
      )
      .then((response) => {
        let a = {}
        Object.keys(initialValues3).forEach(function (key) {
          a[key] = response.data[0].import_data[key]
        });
        console.log(a)
        setInitialValues3(a);

      })
      .catch((err) => {
        console.log("eerr", err);
      });
  };

  useEffect(() => {
    if (leadPermission?.super_admin) {

    }
    else {
      const updatedFeildMain = { ...FeildMain };
      let ACL = leadPermission[`${linkUrl}`]?.fields
      for (const fieldToDelete in ACL) {
        if (ACL.hasOwnProperty(fieldToDelete)) {
          let a = fieldToDelete.replace(`${modules4[location.pathname.split("/")[1]]}_`, "")
          if (ACL[fieldToDelete] !== "true") {
            delete updatedFeildMain[a];
          }
        }
      }
      setFeildMain(updatedFeildMain);

    }
  }, [leadPermission])

  const { translations } = useContext(MainTranslationContexts);
  const [allTab, setAllTab] = useState({
    firstTab: true,

    secondTab: false,

    thirdTab: false,
  });
  const [fileName, setFileName] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [initialValues, setInitialValues] = useState({
    import_file: "",
    hasheader: "0",
    delimeters: ",",
  });
  const [initialValues2, setInitialValues2] = useState({
    duplicate_handled: "1",
  });
  const [availableselected, setAvailableselected] = useState([]);
  const [matchselected, setMatchselected] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);

  const [matchFields, setMatchFields] = useState([]);
  const [res, apiMethod] = usePost();
  const [loading, setLoading] = useState({
    loading1: true,
  });
  const handleSubmitCSVFile = () => {
    setLoading({ ...loading, loading1: false });
    let formdata = new FormData();
    formdata.append("import_file", initialValues.import_file);
    formdata.append("has-header", initialValues["hasheader"]);
    formdata.append("delimeters", initialValues["delimeters"]);
    formdata.append("module", linkUrl3);
    apiMethod("postImportData", formdata);
    setLoading({ ...loading, loading1: true });
  };
  useEffect(() => {
    if (res.data) {

      if (
        res.data.message === "Only CSV files allowed." ||
        res.data.message === "Something went wrong!"
      ) {
        res.data.message && toast.success(res.data.message);
      } else {
        setAllTab((prevState) => ({
          ...prevState,
          firstTab: false,
          secondTab: true,
        }));
        axios.defaults.headers = {
          "Content-Type": "multipart/form-data",
          authentication: `${getTokenSession()}`,
        };
        axios
          .get(
            `${config.apiEndPoint}getAvailableFields/${linkUrl3
            }`
          )
          .then((response) => {
            setAvailableFields(response.data.all_availabe_columns);
            setLoading({ ...loading, loading1: false });
          })
          .catch((err) => {
            console.log("eerr", err);
          });
      }
    }
  }, [res.data]);
  const handleAvaibleFeild = (item) => {
    if (availableselected.includes(item)) {
      setAvailableselected(availableselected.filter((ite) => ite !== item));
    } else {
      setAvailableselected((prevState) => [...prevState, item]);
    }
  };
  const handleMatchFeild = (item) => {
    if (matchselected.includes(item)) {
      setMatchselected(matchselected.filter((ite) => ite !== item));
    } else {
      setMatchselected((prevState) => [...prevState, item]);
    }
  };
  const handleMovetoMatch = () => {
    let ava = availableselected;
    setAvailableFields((prevState) =>
      prevState.filter((item) => !availableselected.includes(item))
    );
    setMatchFields([...matchFields, ...ava]);
    setAvailableselected([]);
  };
  const handleMovetoAvaible = () => {
    let ava = matchselected;
    setMatchFields((prevState) =>
      prevState.filter((item) => !matchselected.includes(item))
    );
    setAvailableFields([...ava, ...availableFields]);
    setMatchselected([]);
  };
  const handleDuplicateCancel = () => {
    setAllTab({
      firstTab: true,

      secondTab: false,

      thirdTab: false,
    });
    setInitialValues({
      import_file: "",
      hasheader: "0",
      delimeters: ",",
    });
    setMatchFields([]);
    setAvailableFields([]);
    setAvailableselected([]);
    setMatchselected([]);
    setShow(false);
  };
  const handleBack = () => {
    setMatchFields([]);
    setAvailableFields([]);
    setAvailableselected([]);
    setMatchselected([]);
    setAllTab({
      firstTab: true,

      secondTab: false,

      thirdTab: false,
    });
  };
  const handleSkip = () => {
    setAllTab((prevState) => ({
      ...prevState,
      secondTab: false,
      thirdTab: true,
    }));
  };
  const [res2, apiMethod2] = usePost();
  const handleSubmitDuplicate = () => {
    let formdata = new FormData();
    formdata.append("duplicate_handled", initialValues2.duplicate_handled);
    formdata.append("fields_to_be_matched", matchFields?.join(","));
    formdata.append("duplicate_handling_id", "1");
    formdata.append("module", linkUrl3);
    // formdata.append("has-header", initialValues["hasheader"]);
    // formdata.append("delimeters", initialValues["delimeters"]);
    apiMethod2("postDuplicateHandling", formdata);
    setAllTab({
      firstTab: false,

      secondTab: false,

      thirdTab: true,
    });
  };
  const [res3, apiMethod3] = usePost();
  const [resCustom, apiMethodCustom] = usePost();
  useEffect(() => {
    if (res2.data || allTab.thirdTab) {
      let formdata = new FormData();
      formdata.append("import_file", initialValues.import_file);
      formdata.append("module", linkUrl3);
      apiMethod3("postImportDataPaginate", formdata);

      let formdata2 = new FormData();
      formdata2.append("type", "allCustomFields");
      formdata2.append("module", `${linkUrl4}`);
      apiMethodCustom("postAllStagesCustomFields", formdata2);
    }
  }, [res2.data, allTab.thirdTab]);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [mappingData, setMappingData] = useState({});
  const [customData, setCustomData] = useState({});
  useEffect(() => {
    if (res3.data) {
      if (!currentPage) {
        setCurrentPage(parseInt(res3.data.current_page));
      }
      setTotalPage(res3.data.total_pages);
      setMappingData(res3.data.data[0]);
    }
  }, [res3.data]);

  const [initialValues4, setInitialValues4] = useState({
    save_template_checkbox: "0",
    saved_template_name: "",
  });
  const [initialValues3, setInitialValues3] = useState();
  useEffect(() => {
    if (FeildMain) {
      setInitialValues3(() => {
        const initialData = {};
        Object.keys(FeildMain).forEach((item) => {
          initialData[item] = "";
        });
        return initialData;
      })
    }
  }, [FeildMain])

  const [updatedFeildMain22, setUpdatedFeildMain22] = useState({})
  const [updatedFeildMain223, setUpdatedFeildMain223] = useState({})
  let reqName = {
    "fname": "First Name",
    "email": "Email",
    "lead_leadsource": "Lead Source",
    "contact_type": "Type",
    "lead_leadmedium": "Lead Medium"
  }
  let rea = {}
  const [re, setRe] = useState({})

  useEffect(() => {
    if (resCustom.data) {
      let updatedFeildMain = {};
      let updatedFeildMain2 = {};
      let a = { ...updatedFeildMain223 }
      Object.keys(resCustom.data.all_fields).forEach((item) => {
        Object.keys(resCustom.data.all_fields[item]).forEach((item2) => {
          Object.keys(resCustom.data.all_fields[item][item2]).forEach(
            (item3) => {
              if (resCustom.data.all_fields[item][item2][item3].field_required === "yes") {
                a[item3] = resCustom.data.all_fields[item][item2][item3].label
              }
              updatedFeildMain2[`${item3}`] = resCustom.data.all_fields[item][item2][item3].label;
            }
          );
        });
      });
      setUpdatedFeildMain223(a)
      rea = a
      setRe({ ...reqName, ...rea })
      console.log(re, "Muvddsazz")
      Object.keys(resCustom.data.all_fields).forEach((item) => {
        Object.keys(resCustom.data.all_fields[item]).forEach((item2) => {
          Object.keys(resCustom.data.all_fields[item][item2]).forEach(
            (item3) => {
              updatedFeildMain[`${item3}`] = "";
            }
          );
        });
      });

      if (leadPermission?.super_admin) {
        setUpdatedFeildMain22(updatedFeildMain2)
        setCustomData(updatedFeildMain);
        setInitialValues3({ ...initialValues3, ...updatedFeildMain });
      }
      else {


        let ACL = leadPermission[`${modules4[location.pathname.split("/")[1]]}`]?.fields;
        for (const fieldToDelete in ACL) {
          if (ACL.hasOwnProperty(fieldToDelete)) {
            if (ACL[fieldToDelete] !== "true") {
              let a = fieldToDelete.replace(`${modules4[location.pathname.split("/")[1]]}_`, "")
              delete updatedFeildMain[a];
              delete updatedFeildMain2[a];
            }
          }
        }
        setUpdatedFeildMain22(updatedFeildMain2)
        setCustomData(updatedFeildMain);
        setInitialValues3({ ...initialValues3, ...updatedFeildMain });
        console.log(FeildMain, "mu")
      }
    }
  }, [resCustom.data]);
  const handlePAgeChange = (item, type) => {
    console.log(parseInt(item) <= totalPage, item);
    if ((parseInt(item) > 0 && parseInt(item) <= totalPage) || (item === '')) {
      setCurrentPage(item === '' ? 1 : parseInt(item));
      let formdata = new FormData();
      formdata.append("page", item === '' ? 1 : parseInt(item));
      formdata.append("import_file", initialValues.import_file);
      formdata.append("module", `${linkUrl3}`);
      apiMethod3("postImportDataPaginate", formdata);
    }
  };
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const handleDrop = (e, item) => {
    const droppedItemId = e.dataTransfer.getData("text/plain");
    console.log(droppedItemId, item);
    setInitialValues3({
      ...initialValues3,
      [item]: initialValues3[item] + `{{${droppedItemId}}}`,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const [toggle2, settoggle2] = useState({
    first: true,
    second: false,
  });
  const handleToggle2 = (e, item) => {
    if (item === "first") {
      settoggle2({
        first: true,
        second: false,
      });
    } else {
      settoggle2({
        first: false,
        second: true,
      });
    }
  };
  const [res4, apiMethod4] = usePost();
  const [res5, apiMethod5] = usePost();
  const handleSubmit = () => {

    if (selectedValueDef == 'Defualt Template') {
      if (initialValues4.saved_template_name == '') {
        swal({
          title: "Template name are empty!",
          icon: "error",
          dangerMode: true,
        })
        return false;
      }
    }


    let formdata2 = {};
    for (let item in initialValues3) {
      formdata2[item] = initialValues3[item]
    }
    let reqFill = []
    let formdata = new FormData();
    for (let item in initialValues3) {
      if (re.hasOwnProperty(item) && initialValues3[item] === "") {
        reqFill.push(re[item])
      }
      formdata.append(item, initialValues3[item]);
    }
    if(reqFill.length === 0) {
      if (selectedValue == 'new') {
        formdata.append("import_file", initialValues.import_file);
        formdata.append("has-header", initialValues["hasheader"]);
        formdata.append("delimeters", initialValues["delimeters"]);
        formdata.append("fields_to_be_matched", matchFields?.join(","));
        formdata.append("duplicate_handled", initialValues2["duplicate_handled"]);
        formdata.append("module", `${linkUrl3}`);
        console.log(initialValues3, linkUrl3)
   
        // apiMethod4("postFieldMappingData", formdata);
        if (initialValues4.save_template_checkbox == 1) {
          let formdata3 = {
            "import_data": formdata2,
            "importTemplate": "importTemplateCreate",
            "module": `${linkUrl3}`,
            "importTemplateCreate": "importTemplateCreate",
            "temp_name": initialValues4.saved_template_name
          };
  
          axios.defaults.headers = {
            "Content-Type": "application/json",
            authentication: `${getTokenSession()}`,
          };
          axios.post(`${config.apiEndPoint}postCreateImportTemplate`, formdata3)
            .then((response) => {
            })
            .catch((err) => {
              console.log('eerr', err)
            })
        }
  
      } else {
        formdata.append("import_file", initialValues.import_file);
        formdata.append("has-header", initialValues["hasheader"]);
        formdata.append("delimeters", initialValues["delimeters"]);
        formdata.append("fields_to_be_matched", matchFields?.join(","));
        formdata.append("duplicate_handled", initialValues2["duplicate_handled"]);
        formdata.append("module", `${linkUrl3}`);
       
        if (initialValues4.save_template_checkbox == 1) {
          let formdata3 = {
            "import_data": formdata2,
            "importTemplate02": "importTemplateUpdate",
            "module": `${linkUrl3}`,
            "importTemplateUpdate": "importTemplateUpdate",
            'id': dropVal,
            "temp_name": initialValues4.saved_template_name
          };
  
          axios.defaults.headers = {
            "Content-Type": "application/json",
            authentication: `${getTokenSession()}`,
          };
          axios.post(`${config.apiEndPoint}postCreateImportTemplate`, formdata3)
            .then((response) => {
            })
            .catch((err) => {
              console.log('eerr', err)
            })
        }
      }
      apiMethod5("postFieldMappingData", formdata);
    }
    else {
      let a = reqFill.join(", ");
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: a,
        icon: "error",
        dangerMode: true,
      });
    }
    






  }
  useEffect(() => {
    if (res4.data) {
      // window.location.reload(true);
    }
  }, [res4.data])

  return (
    <>
      <Link
        onClick={handleShow}
        className="btn btn-default btn-sm bsm import_lead headerbtn_"
      >
        <i className="fas fa-file-import"></i>Import
      </Link>

      <Modal show={show} onHide={handleClose} size="xl">
        <div className="card-header">
          <h4 className="">
            Import {linkUrl3}
          </h4>
          <div className="card-options">
            <Link
              className="card-options-fullscreen"
              data-toggle="card-fullscreen"
              onClick={(e) => handleFullScreen(e)}
              style={{ color: "#000" }}
            >
              <i className="fe fe-maximize"></i>
            </Link>
            <a onClick={handleClose} className="close_popup_ ">
              <i className="fe fe-x" />
            </a>
          </div>
        </div>

        <div className="card-body">
          <div
            id="wizard_horizontal"
            role="application"
            className="wizard clearfix"
          >
            <div className="export-main-tab steps mb-2 clearfix">
              <ul role="tablist" className="p-0 m-0">
                <li
                  role="tab"
                  className={`first current export-tab ${allTab.firstTab === true ? "active" : ""
                    }`}
                >
                  <span className="number">1.</span>
                  Upload CSV File
                </li>
                <li
                  role="tab"
                  className={`second current export-tab ${allTab.secondTab === true ? "active" : ""
                    }`}
                >
                  <span className="number">2.</span>Duplicate Handling
                </li>
                <li
                  role="tab"
                  className={`third current export-tab ${allTab.thirdTab === true ? "active" : ""
                    }`}
                >
                  <span className="number">3.</span>Field Mapping
                </li>
              </ul>
            </div>
            <div className="content clearfix">
              {allTab.firstTab && (
                <section
                  id="wizard_horizontal-p-0"
                  role="tabpanel"
                  className="body current"
                >
                  <h6 className="mb-0 h4 boderbottom">Import from CSV file</h6>
                  <div className="form-group row">
                    <label className="col-sm-5 h5">Select CSV file</label>
                    <div className="col-sm-7">
                      <div className="btn btn-primary btn-file">
                        <i className="fa fa-laptop" />
                        <span className="hidden-xs">
                          Select from My Computer
                        </span>
                        <input
                          type="file"
                          name="import_file"
                          id="import_file"
                          onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            setFileName(selectedFile.name);
                            setInitialValues({
                              ...initialValues,
                              import_file: selectedFile,
                            });
                          }}
                        />
                      </div>
                      <span>&nbsp;&nbsp;{fileName}</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 h5">Has Header</label>
                    <div className="col-sm-7">
                      <label className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                          value="1"
                          name="has-header"
                          checked={
                            initialValues["hasheader"] === "1" ? true : false
                          }
                          onChange={(e) =>
                            setInitialValues({
                              ...initialValues,
                              hasheader:
                                initialValues.hasheader === "1" ? "0" : "1",
                            })
                          }
                        />
                        <span className="custom-control-label" />
                      </label>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-5 h5">Delimiter</label>
                    <div className="col-sm-7">
                      <div className="ggrid">
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            className="custom-control-input"
                            type="radio"
                            name="delimeters-post"
                            id="comma"
                            value=","
                            checked={
                              initialValues["delimeters"] === ","
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              setInitialValues({
                                ...initialValues,
                                delimeters: e.target.value,
                              })
                            }
                          />
                          <span className="custom-control-label">Comma</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            className="custom-control-input"
                            type="radio"
                            name="delimeters-post"
                            id="semicolon"
                            checked={
                              initialValues["delimeters"] === ";"
                                ? true
                                : false
                            }
                            value=";"
                            onChange={(e) =>
                              setInitialValues({
                                ...initialValues,
                                delimeters: e.target.value,
                              })
                            }
                          />
                          <span className="custom-control-label">
                            Semicolon
                          </span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            className="custom-control-input"
                            type="radio"
                            name="delimeters-post"
                            checked={
                              initialValues["delimeters"] === "|"
                                ? true
                                : false
                            }
                            id="pipe"
                            value="|"
                            onChange={(e) =>
                              setInitialValues({
                                ...initialValues,
                                delimeters: e.target.value,
                              })
                            }
                          />
                          <span className="custom-control-label">Pipe</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <input
                            className="custom-control-input"
                            type="radio"
                            name="delimeters-post"
                            checked={
                              initialValues["delimeters"] === "^"
                                ? true
                                : false
                            }
                            id="caret"
                            value="^"
                            onChange={(e) =>
                              setInitialValues({
                                ...initialValues,
                                delimeters: e.target.value,
                              })
                            }
                          />
                          <span className="custom-control-label">Caret</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12 text-right">
                      <input
                        type={"submit"}
                        className="btn btn-primary"
                        value={res.isLoading ? "Submitting" : "Next"}
                        onClick={handleSubmitCSVFile}
                      />
                    </div>
                  </div>
                </section>
              )}
              {allTab.secondTab && (
                <section role="tabpanel" className="duplicate3 body current">
                  {loading.loading1 ? (
                    <span className="span_loader">
                      <i className="fa fa-pulse fa-spinner"></i>
                    </span>
                  ) : (
                    <>
                      <h6 className="mb-0" />
                      <hr />
                      <div className="form-group row">
                        <label className="col-sm-12 col-form-label mb-0">
                          Select how duplicate should be handled
                        </label>
                        <div className="col-sm-12">
                          <select
                            name="duplicate_handled"
                            className="duplicate_handled form-control"
                            value={initialValues2.duplicate_handled}
                            onChange={(e) =>
                              setInitialValues2({
                                ...initialValues2,
                                duplicate_handled: e.target.value,
                              })
                            }
                          >
                            <option value="1">Skip</option>
                            <option value="2">Overwrite</option>
                            <option value="3">Merge</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                          Select the matching fields to find duplicate records
                        </label>
                      </div>
                      <div className="form-group row">
                        <div className="ugrid col-sm-12">
                          <div className="advance_field">
                            <label>Available Fields</label>
                            <div className="advance_field_select form-control drag_and_drop_select">
                              {Array.isArray(availableFields) &&
                                availableFields.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className={
                                        availableselected.includes(item)
                                          ? "active"
                                          : ""
                                      }
                                      onClick={() => handleAvaibleFeild(item)}
                                    >
                                      {item}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="middle_arrow">
                            <div className="text-center mb-1 d-flex justify-content-center">
                              <button
                                type="button"
                                className=" btn btn-default"
                                onClick={handleMovetoMatch}
                              >
                                <i className="fa fa-arrow-right" />
                              </button>
                            </div>
                            <div className="text-center mb-1 d-flex justify-content-center">
                              <button
                                type="button"
                                className=" btn btn-default"
                                onClick={handleMovetoAvaible}
                              >
                                <i className="fa fa-arrow-left" />{" "}
                              </button>
                            </div>
                          </div>
                          <div className="fields_to_be_matched">
                            <label>Fields to be matched on</label>
                            <div className="form-control fields_to_be_matched_select">
                              {Array.isArray(matchFields) &&
                                matchFields.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className={
                                        matchselected.includes(item)
                                          ? "active"
                                          : ""
                                      }
                                      onClick={() => handleMatchFeild(item)}
                                    >
                                      {item}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row">
                        <div className="col-sm-12 text-center mb-3 grps">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={handleBack}
                            >
                              Back
                            </button>
                            <input
                              type="submit"
                              value="Next"
                              className="btn btn-primary"
                              name="duplicate_handling"
                              onClick={handleSubmitDuplicate}
                            />
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={handleSkip}
                            >
                              Skip this step
                            </button>
                            <button
                              onClick={handleDuplicateCancel}
                              type="button"
                              className="btn btn-outline-danger"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </section>
              )}
              {allTab.thirdTab && (
                <section
                  id="wizard_horizontal-p-0"
                  role="tabpanel"
                  className="body current p-0"
                >
                  {res2.isLoading || resCustom.isLoading ? (
                    <span className="span_loader">
                      <i className="fa fa-pulse fa-spinner"></i>
                    </span>
                  ) : (
                    <>
                      <div className="MappingSection row">
                        <div className="MappingSectionLeft col-lg-6">
                          <div
                            className={`card MappingSection1 ${!toggle2.first && "card-collapsed"
                              }`}
                          >
                            <div className="card-status bg-blue"></div>
                            <div className="card-header borderblue">
                              <h3 className="card-title">
                                {Translation(
                                  translations,
                                  `Main ${linkUrl3
                                  }`
                                )}
                              </h3>
                              <div className="card-options">
                                <Link
                                  onClick={(e) => handleToggle2(e, "first")}
                                  className="card-options-collapse"
                                >
                                  <i className={`fe fe-chevron-down`} />
                                </Link>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                {Object.keys(FeildMain).map((item, index) => {
                                  return (
                                    <div className="col-md-6" key={index}>
                                      <div className="form-group my-2">
                                        <label htmlFor={item}>
                                          {FeildMain[item]} {re[item] && <span style={{ "color": "red" }}> *</span>}
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          onDrop={(e) => handleDrop(e, [item])}
                                          onDragOver={handleDragOver}
                                          value={initialValues3[item]}
                                          onChange={(e) =>
                                            setInitialValues3({
                                              ...initialValues3,
                                              [item]: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`card MappingSection1 ${!toggle2.second && "card-collapsed"
                              }`}
                          >
                            <div className="card-status bg-blue"></div>
                            <div className="card-header borderblue">
                              <h3 className="card-title">
                                {Translation(translations, "Overview")}
                              </h3>
                              <div className="card-options">
                                <Link
                                  onClick={(e) => handleToggle2(e, "second")}
                                  className="card-options-collapse"
                                >
                                  <i className={`fe fe-chevron-down`} />
                                </Link>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="row">
                                {customData &&
                                  Object.keys(customData).map((item, index) => {
                                    return (
                                      <div
                                        className="col-md-6"
                                        key={index}
                                      >
                                        <div className="form-group my-2">
                                          <label htmlFor={item}>
                                            {
                                              updatedFeildMain22[item]
                                            }
                                            {re[item] && <span style={{ "color": "red" }}> *</span>}
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            onDrop={(e) =>
                                              handleDrop(e, [item])
                                            }
                                            onDragOver={handleDragOver}
                                            value={initialValues3[item]}
                                            onChange={(e) =>
                                              setInitialValues3({
                                                ...initialValues3,
                                                [item]: e.target.value,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="MappingSectionRight col-lg-6">
                          <div className="MappingSectionRightTop">
                            <div
                              className={`MappingSectionRightTopl ${currentPage === 1 && "disabl"}`}
                              onClick={() =>
                                handlePAgeChange(currentPage - 1, "left")
                              }

                            >
                              <FaChevronLeft />
                            </div>
                            <div className="MappingSectionRightTopc">
                              <input
                                type="number"
                                value={currentPage}
                                onChange={(e) =>
                                  handlePAgeChange(e.target.value, "center")
                                }
                              />
                              &nbsp; of
                              {totalPage}
                            </div>
                            <div
                              className={`MappingSectionRightTopr ${currentPage === totalPage && "disabl"}`}
                              onClick={() =>
                                handlePAgeChange(currentPage + 1, "right")
                              }
                            >
                              <FaChevronRight />
                            </div>
                          </div>
                          <div className="MappingSectionRightBottom">
                            {
                              res3.isLoading ?
                                <span className="span_loader">
                                  <i className="fa fa-pulse fa-spinner"></i>
                                </span>

                                :
                                Object.keys(mappingData).map((item, index) => {
                                  return (
                                    <div
                                      draggable
                                      className="MappingSectionRightBottomB"
                                      onDragStart={(e) =>
                                        handleDragStart(e, item.toString())
                                      }
                                      key={index}
                                    >
                                      <div className="MappingSectionRightBottoml">
                                        {item}
                                      </div>
                                      <div className="MappingSectionRightBottomr">
                                        {mappingData[item]}
                                      </div>
                                    </div>
                                  );
                                })
                            }

                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-3 px-3 marginBottomSelect">
                          <select className="form-control" value={selectedValue} onChange={handleChange} >
                            <option value="">Select an option</option>
                            <option value="new">New Template</option>
                            <option value="defualt">Defualt Template</option>
                          </select>
                        </div>


                        {selectedValue == 'new' &&
                          <div className="col-sm-12 px-3">
                            <input
                              type="checkbox"
                              name="save_template_checkbox"
                              onChange={(e) =>
                                setInitialValues4({
                                  ...initialValues4,
                                  save_template_checkbox:
                                    initialValues4?.save_template_checkbox === "0"
                                      ? "1"
                                      : "0",
                                })
                              }
                              checked={
                                initialValues4.save_template_checkbox === "1"
                              }
                              id="save_template_checkbox"
                              style={{
                                display: "inline-block",
                                marginRight: "9px",
                              }}
                            />
                            <label htmlFor="save_template_checkbox">
                              Save as Custom Mapping &nbsp;
                            </label>
                            <input
                              type="text"
                              name="saved_template_name"
                              onChange={(e) =>
                                setInitialValues4({
                                  ...initialValues4,
                                  saved_template_name: e.target.value,
                                })
                              }
                              value={initialValues4.saved_template_name}
                              placeholder="Template name"
                              className="form-control"
                              style={{ display: "inline-block", width: "auto" }}
                            />
                          </div>
                        }


                        {selectedValue == 'defualt' && <div className="col-sm-12 px-3">
                          <input
                            type="checkbox"
                            name="save_template_checkbox"
                            onChange={(e) =>
                              setInitialValues4({
                                ...initialValues4,
                                save_template_checkbox:
                                  initialValues4?.save_template_checkbox === "0"
                                    ? "1"
                                    : "0",
                              })
                            }
                            checked={
                              initialValues4.save_template_checkbox === "1"
                            }
                            id="save_template_checkbox"
                            style={{
                              display: "inline-block",
                              marginRight: "9px",
                            }}
                          />
                          <label htmlFor="save_template_checkbox">
                            Choose Default Template &nbsp;
                          </label>
                          <div className="col-sm-2">
                            {selectedValueDef &&
                              <select className="form-control" value={dropVal} onChange={handleChange2} >
                                <option value="">Select an option</option>
                                {selectedValueDef && selectedValueDef.map((item, index) => {
                                  return <option key={index} value={item.id}>{item.name}</option>
                                })}
                              </select>
                            }
                          </div>




                        </div>}
                      </div>
                      <div className="col-sm-12 mb-3 text-right">
                        <input
                          type="submit"
                          value={`Import ${linkUrl3}`}
                          name="final_import"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        />
                      </div>
                    </>
                  )}
                </section>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ImportModal;
