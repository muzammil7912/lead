// import React from "react";

// export default function Projectnew() {
//   return <div>ProjectCreateNew is new</div>;
// }

import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import FormControl from "../components/form/FormControl";
import * as yup from "yup";
import usePost from "../customHooks/usePost";
import allData from "../Data/data";
import File from "../components/form/File";
import SubmitButton from "../components/SubmitButton";
import { TagsInput } from "react-tag-input-component";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../dist/css/style.css";
import { useEffect, useContext } from "react";
import { Translation } from "../components/Translation";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import axios from "axios";
import { getTokenSession } from "../utils/common";
import config from "../services/config.json";
import { Select } from "antd";
import { MainProjectListContext } from "../context/MainProjectListContext";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { handleToggle } from "../components/AllCustomFuntion";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


export const OwnerDropdown = ({ props, translations }) => {
  const clickOutside = (event) => {
    if (
      props.inputValue.length > 0 &&
      props.ownerRef &&
      props.ownerRef.current &&
      props.ownerRef.current.contains(event.target)
    ) {
    } else {
      props.stateFunc();
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <div className="owner-modal">
      <div className="data">
        {props.obj.map((item, index) => {
          return (
            <p key={index} onClick={() => props.func(item)}>
              {Translation(translations, `${item.label}`)}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default function Projectnew1() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("");
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const [res, apiMethod] = usePost();
  const [image, setImage] = useState();
  const [radiolist, setradiolist] = useState(false);
  const [radiolist1, setradiolist1] = useState(false);
  const [radiolist2, setradiolist2] = useState(false);
  const [radiolist3, setradiolist3] = useState(false);
  const [selected, setSelected] = useState([]);
  const inputElement = useRef();
  const [searchval, setSearchval] = useState(
    `${permissions?.uname} (${permissions?.role_name})`
  );
  const [ownerhidden, setOwnerhidden] = useState(`${permissions?.role_id}`);
  const ownerRef = useRef(null);
  const ownerRef3 = useRef(null);
  const ownerRef2 = useRef(null);
  const inputElement2 = useRef();
  const inputElement3 = useRef();
  const [searchval2, setSearchval2] = useState(
    `${permissions?.uname} (${permissions?.role_name})`
  );
  const [searchval3, setSearchval3] = useState("");
  const [listOpen2, setListOpen2] = useState(false);
  const [resowner2, apiMethodowner2] = usePost();
  const [resowner3, apiMethodowner3] = usePost();
  const [rescontact, apiMethodcontact] = usePost();
  const [ownerhidden2, setOwnerhidden2] = useState(`${permissions?.role_id}`);
  const [ownerhidden3, setOwnerhidden3] = useState("");
  const [DropdownData, setDropdownData] = useState([]);
  const [StatusDropdownData, setStatusDropdownData] = useState([]);
  const [StatusDropdownData2, setStatusDropdownData2] = useState([]);
  const [onChangValue, setOnChangValue] = useState(id);
  const [resPipeStage, apiMethodPipeStage] = usePost();
  const [OppStageList, setOppStageList] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  const [listOpen3, setListOpen3] = useState(false);
  const [resowner, apiMethodowner] = usePost();
  const [tagoption, setTagOption] = useState([]);
  const { addprojectlist, projectlist } = useContext(MainProjectListContext);
  const [resTag, apiMethodTag] = usePost();
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [overViewField, setOverViewData] = useState("");
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [resPipeStageOverView, apiMethodPipeStageOverView] = usePost();
  const [stageValue, setStageValue] = useState("");
  const navigate = useNavigate();
  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  }
  useEffect(() => {
    console.log(id);
  }, [id]);
  const [InitialValues, setInitialValues] = useState({
    prj_title: "",
    prj_assign: "",
    prj_pipeline: "",
    avatar: "",
    prj_stage: "",
    prj_owner: "",
    prj_status: "",
    prj_location: "",
    pr_st_date: "",
    pr_ed_date: "",
    tags: "",
    Link_Examples: "",
    s_rlto: "",
    rlto: "",
    submit: "create_project",
  });
  const [content, setContent] = useState("");
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  const rerData = ["prj_title", "prj_pipeline", "prj_stage", "prj_status"];
  const rerDataLabels = [
    { label: "Project Title", name: "prj_title" },
    { label: "Pipeline", name: "prj_pipeline" },
    { label: "Stage", name: "prj_stage" },
    { label: "Status", name: "prj_status" },
  ];
  const items = [
    { label: "Contact" },
    { label: "Opportunity" },
    { label: "User" },
    { label: "Project" },
  ];

  const validationSchema = yup.object({
    fname: yup.string().required("Must Required"),
  });

  console.log(projectlist);

  useEffect(() => {
    if (resPipeStage.data) {
      if (resPipeStage.data.status == "422") {
        setOppStageList([]);
      } else {
        setOppStageList(resPipeStage.data);
      }
    }
  }, [resPipeStage.data]);
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.projects?.fields?.projects_prj_title == "true"
  ) {
  } else {
    rerData.splice(rerData.indexOf("prj_title"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Project Title"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.projects?.fields?.projects_prj_pipeline == "true"
  ) {
  } else {
    rerData.splice(rerData.indexOf("prj_pipeline"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Pipeline"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.projects?.fields?.projects_prj_status == "true"
  ) {
  } else {
    rerData.splice(rerData.indexOf("prj_status"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Status"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.projects?.fields?.projects_prj_stage == "true"
  ) {
  } else {
    rerData.splice(rerData.indexOf("prj_stage"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Stage"), 1);
  }

  const handleOnChange = (e) => {
    setOnChangValue(e.target.value);
    let pipeStageData = new FormData();
    pipeStageData.append("general", "view_pipeline_stages");
    pipeStageData.append("gtRs", e.target.value);
    pipeStageData.append("layout", "list");
    apiMethodPipeStage("postAllViewProjectsPiplinesStages", pipeStageData);
    console.log(e.target.value);
  };
  function radiovalue(v) {
    console.log(selectedOption);
    setListOpen3(false);
    setradiolist(true);
    setOwnerhidden3(v);

    let formdata = new FormData();
    let labelValues = selectedLabel.toLowerCase();

    formdata.append("related", labelValues);
    formdata.append("ids", v);
    formdata.append("event_create", "general_event_view_query");
    apiMethodcontact("postSearchEventsViewModuleRelated", formdata);
  }
  useEffect(() => {
    let pipeStageData = new FormData();
    pipeStageData.append("general", "view_pipeline_stages");
    pipeStageData.append("gtRs", id);
    pipeStageData.append("layout", "list");
    apiMethodPipeStage("postAllViewProjectsPiplinesStages", pipeStageData);
  }, [projectlist]);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    // define a separate function to fetch and update dropdown data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiEndPoint}getAllViewProjectsPiplines`
        );
        setDropdownData(response.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    // call the fetchData function only once on mount
    fetchData();
  }, []);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    // define a separate function to fetch and update dropdown data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiEndPoint}getAllViewProjectsStatus`
        );
        console.log(response.data);
        setStatusDropdownData(response.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    // call the fetchData function only once on mount
    fetchData();
  }, []);
  const handleList2 = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval2);
    apiMethodowner2("postSpecifiesUsers", formdataOwner);
    setListOpen2(!listOpen2);
  };
  const handleList3 = () => {
    let formdataOwner = new FormData();
    let labelValues = selectedLabel.toLowerCase();
    formdataOwner.append("related", labelValues);
    formdataOwner.append("q", searchval3);
    formdataOwner.append("event_create", "general_event_create_query");
    apiMethodowner3("postSearchEventsModuleRelated", formdataOwner);
    setListOpen3(!listOpen3);
  };

  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const handleClick2 = (item) => {
    setSearchval2(`${item.uname + ` (${item.role_name})`}`);
    setOwnerhidden2(item.id);
    setListOpen2(false);
  };
  const handleClick3 = (item) => {
    setSearchval3(item.text);
    setOwnerhidden3(item.value);
    setradiolist(false);
  };
  const handleClick = (item) => {
    setSearchval(`${item.uname + ` (${item.role_name})`}`);
    setOwnerhidden(item.id);
    setListOpen(false);
  };
  const handleLabelChange = (event) => {
    setSelectedLabel(event.target.value);
    let formdataOwner = new FormData();
    let labelValues = event.target.value.toLowerCase();
    formdataOwner.append("related", labelValues);
    formdataOwner.append("q", " ");
    formdataOwner.append("event_create", "general_event_create_query");
    apiMethodowner3("postSearchEventsModuleRelated", formdataOwner);
    setListOpen3(!listOpen3);
  };

  const onSearchFollowerAdd = (v) => {
    const formdata = new FormData();
    formdata.append("search_term", v);
    apiMethodTag("postSearchTags", formdata);
  };
  useEffect(() => {
    if (resTag.data) {
      if (resTag.data && !resTag.isLoading) {
        if (!resTag.data.message) {
          setTagOption(
            resTag.data.map((item) => {
              return {
                value: item,
                item,
              };
            })
          );
        }
      }
    }
  }, [resTag.data]);
  const submitbutton = {
    class: "btn btn-primary m-2",
    text: "Store Lead",
  };
  function handleSubmit(values) {
    if (image == undefined) {
      values.avatar = "";
    } else {
      values.avatar = image;
    }
    values.prj_assign = ownerhidden2;
    values.tags = selected.join();
    values.s_rlto = ownerhidden3;
    values.rlto = selectedLabel;
    values.prj_pipeline = onChangValue;
    values.prj_owner = ownerhidden;
    values.prj_stage = stageValue;
    const missingValues = [];
    rerData.filter((val, label) => {
      if (values[val]?.trim() === "" || values[val] === undefined) {
        missingValues.push(rerDataLabels[label].label);
      }
    });

    if (missingValues.length === 0) {
      let formdata = new FormData();
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      formdata.append("prj_desc", content);
      apiMethod("postCreateProjects", formdata);
      // navigate(`/${config.ddemoss}prospects`);
    } else {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: `Missing fields: ${missingValues.join(", ")}`,
        icon: "error",
        dangerMode: true,
      });
    }
  }
  const handleJustifyClick2 = (value) => {
    if (value == justifyActive2) {
      return;
    }
    setJustifyActive2(value);
  };

  const handleStage = (e) => {
    setStageValue(e.target.value);
    let customField = new FormData();
    customField.append("queryP", onChangValue);
    customField.append("query", e.target.value);
    customField.append("type", "getCustomFields");
    customField.append("mode", "projects");
    customField.append("mdType", "Project");
    customField.append("queryType", "add");
    apiMethodPipeStageOverView("postCustomFieldsProjects", customField);
  };
  useEffect(() => {
    if (resPipeStageOverView.data) {
      setOverViewData(resPipeStageOverView.data);
      console.log(resPipeStageOverView.data);
    }
  }, [resPipeStageOverView.data]);
  useEffect(() => {
    if (res.data) {
      if (res.data && !res.isLoading) {
        toast.success(res.data.message);
        navigate(`/${config.ddemoss}project/${onChangValue}/Grid`);
      }
    }
  }, [res.data]);

  return (
    <div className="container-fluid">
      <Formik
        initialValues={InitialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        // validateOnChange
      >
        <Form name="myForm">
          <div className="row clearfix">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header borderblue">
                  <h3 className="card-title">
                    {Translation(translations, "New Project")}
                  </h3>
                  <div className="card-options">
                    <Link
                      onClick={(e) => handleToggle(e)}
                      className="card-options-collapse"
                    >
                      <i className={`fe fe-chevron-down`} />
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row fv-plugins-icon-container">
                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields?.projects_prj_title ===
                        "true" ? (
                        <FormControl
                          className="form-control my-1"
                          label={Translation(
                            translations,
                            `${"Project Title"}`
                          )}
                          name="prj_title"
                          control="input"
                          required={true}
                          placeholder={Translation(
                            translations,
                            "Project  Title"
                          )}
                        />
                      ) : (
                        ""
                      )}
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields
                        ?.projects_prj_assignto === "true" ? (
                        <div className="col-md-12 mt-3">
                          <label className="form-label">
                            {Translation(translations, "Assign to")}
                          </label>
                          <div ref={ownerRef2} className="searchDropDown">
                            <input
                              type="text"
                              className="form-control"
                              ref={inputElement2}
                              name="prj_assign"
                              value={searchval2}
                              onChange={(e) => setSearchval2(e.target.value)}
                              placeholder={Translation(
                                translations,
                                "Type & Search"
                              )}
                            />
                            <button
                              className="nav-link clickButton"
                              type="button"
                              id="dropdownMenuButton"
                              onClick={() => handleList2()}
                            >
                              <FaSearch />
                            </button>
                          </div>
                          <div
                            className={`dropDownCustom ${
                              listOpen2 && "active"
                            }`}
                          >
                            {resowner2.data && (
                              <ul className="list">
                                {resowner2.isLoading ? (
                                  ""
                                ) : !resowner2.data.message ? (
                                  resowner2.data.map((item, index) => {
                                    return (
                                      <li
                                        key={index}
                                        onClick={() => handleClick2(item)}
                                      >
                                        {Translation(
                                          translations,
                                          `${
                                            item.uname + ` (${item.role_name})`
                                          }`
                                        )}
                                      </li>
                                    );
                                  })
                                ) : (
                                  <li>
                                    {Translation(
                                      translations,
                                      `${resowner2.data.message}`
                                    )}
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                          <input
                            type="hidden"
                            name={"Assignto"}
                            value={ownerhidden2}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields
                        ?.projects_prj_pipeline === "true" ? (
                        <FormControl
                          className="form-control my-1"
                          selectList={DropdownData}
                          firstSelect={"--select--"}
                          label={Translation(translations, `${"Pipeline"}`)}
                          name="prj_pipeline"
                          custom_label_name="pipeline_title"
                          customer_value_name="db_id"
                          control="select_custom_options"
                          onChange={(e) => handleOnChange(e)}
                          value={onChangValue}
                          required={true}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields
                        ?.projects_prj_fileupload === "true" ? (
                        <File
                          label={Translation(translations, "Feature Image")}
                          value={image}
                          onUpload={setImage}
                          name="ava"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields?.projects_prj_stage ===
                        "true" ? (
                        <FormControl
                          className="form-control my-1"
                          selectList={OppStageList}
                          firstSelect={"--select--"}
                          label={Translation(
                            translations,
                            `${"Project Stage"}`
                          )}
                          name="prj_stage"
                          custom_label_name="name"
                          customer_value_name="id"
                          onChange={(e) => handleStage(e)}
                          control="select_custom_options"
                          required={true}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields?.opportunity_assignto ===
                        "true" ? (
                        <div className="col-md-12 mt-3">
                          <label className="form-label">
                            {Translation(translations, "Project Owner")}
                          </label>
                          <div ref={ownerRef} className="searchDropDown">
                            <input
                              type="text"
                              className="form-control"
                              ref={inputElement}
                              name="prj_owner"
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
                          <div
                            className={`dropDownCustom ${listOpen && "active"}`}
                          >
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
                                        {Translation(
                                          translations,
                                          `${
                                            item.uname + ` (${item.role_name})`
                                          }`
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
                          <input
                            type="hidden"
                            name={"owner"}
                            value={ownerhidden}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-6"></div>
                    <div className="col-md-12">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields
                        ?.projects_prj_description === "true" ? (
                          <div className="form-group my-2">
                          <label className="form-label">Description</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={handleEditorChange}
                          />
                        </div>
                          // <FormControl
                        //   className="form-control my-1"
                        //   label={Translation(
                        //     translations,
                        //     `${"Project Description"}`
                        //   )}
                        //   name="prj_desc"
                        //   control="input"
                        // />
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields?.projects_prj_status ===
                        "true" ? (
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--select--"}
                          required={true}
                          label={Translation(translations, "Status")}
                          name="prj_status"
                          selectList={StatusDropdownData}
                          custom_label_name="status_name"
                          customer_value_name="status_id"
                          control="select_custom_options"
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields
                        ?.projects_prj_location === "true" ? (
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"Location"}`)}
                          name="prj_location"
                          control="input"
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="col-md-6 mt-3">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields
                        ?.projects_prj_startdate === "true" ? (
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, "Start Date")}
                            name="pr_st_date"
                            control="input"
                            type="date"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6 mt-3">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields?.projects_prj_enddate ===
                        "true" ? (
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, "End Date")}
                            name="pr_ed_date"
                            control="input"
                            type="date"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="doubelInput col-8 ">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields
                        ?.projects_prj_relatedto === "true" ? (
                        <div className="doubelInput col-8">
                          {leadPermission?.super_admin ||
                          leadPermission?.projects?.fields
                            ?.projects_prj_relatedto === "true" ? (
                            <div className="col-3">
                              <FormControl
                                className="form-control my-1"
                                placeholder={"None"}
                                required={true}
                                label={Translation(translations, "Related to:")}
                                name="rlto"
                                selectList={items}
                                firstSelect={"none"}
                                custom_label_name="label"
                                customer_value_name="label"
                                control="select_custom_options"
                                selectedItem={selectedLabel}
                                onChange={handleLabelChange}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                          leadPermission?.projects?.fields
                            ?.projects_prj_relatedto === "true" ? (
                            <div className="mergediv col-12    ">
                              <div ref={ownerRef3} className="searchDropDown ">
                                <Select
                                  disabled={!selectedLabel}
                                  showSearch
                                  filterOption={(input, option) =>
                                    (option?.children ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  onSearch={(v) => {
                                    handleList3(v);
                                  }}
                                  onChange={(v1, v2) => {
                                    radiovalue(v1);
                                  }}
                                  style={{ width: "100%", height: 30 }}
                                  placeholder={"Search follower name"}
                                >
                                  {resowner3.data &&
                                    resowner3.data.length &&
                                    resowner3.data.map(
                                      ({ value, text, email }) => (
                                        <Select.Option
                                          value={value}
                                          key={value}
                                        >
                                          {text + " (" + email + ")"}
                                        </Select.Option>
                                      )
                                    )}
                                </Select>
                                {/* <button
                            type="button"
                            className="btn btn-primary mt-3 mb-2"
                            style={{ marginLeft: "auto", display: "" }}
                            onClick={radiovalue}
                          >
                            Done Selection
                          </button>
                                <input
                                  type="text"
                                  className="form-control"
                                  ref={inputElement3}
                                  name="s_rlto"
                                  value={searchval3}
                                  onChange={(e) => setSearchval3(e.target.value)}
                                  placeholder={Translation(
                                    translations,
                                    "Type & Search"
                                  )}
                                />
                                <button
                                  className="nav-link clickButton"
                                  type="button"
                                  id="dropdownMenuButton"
                                  onClick={() => handleList3()}
                                >
                                  <FaSearch />
                                </button> */}
                              </div>
                              {/* <div className={`dropDownCustom mylist ulList ${listOpen3 && "active"}`}>
                                {resowner3.data && (
                                  <ul className="list col-12">
                                    {resowner3.isLoading ? (
                                      ""
                                    ) : !resowner3.data.message ? (
                                      resowner3.data.map((item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            onClick={() => handleClick3(item)}
                                          >
                                            <label>
                                              <input value={item.value} type="radio" checked={selectedOption === `${item.value}`} onChange={handleOptionChange} />    &nbsp;    &nbsp;{item.text}
                                            </label>
                                            {item.email && <label> ({item.email})</label>}
                                          </li>
                                        );
                                      })
                                    ) : (
                                      <li>
                                        {Translation(
                                          translations,
                                          `${resowner3.data.message}`
                                        )}
                                      </li>
                                    )}
                                  </ul>
                                )}
                                <button type="button" onClick={radiovalue} className="btn btn-primary m-2" >Done Selection</button>
                              </div> */}
                              <input
                                type="hidden"
                                name={"Assignto"}
                                value={ownerhidden3}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {radiolist && rescontact.data && (
                      <div className="col-md-8 col-sm-12">
                        {" "}
                        <div className="c2_own">
                          <ul className="right_chat list-unstyled p-0 right_chat_vl">
                            <li className="online mb-2">
                              {console.log(rescontact.data)}
                              <a
                                onClick={() => {
                                  setradiolist(false);
                                  setSelectedOption("");
                                  setOwnerhidden3("");
                                }}
                                className="cc_cls"
                                data-row="12"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </a>
                              <div className="media">
                                <img
                                  className="media-object "
                                  src={
                                    rescontact?.data[0].avatar &&
                                    rescontact?.data[0].avatar.includes("http")
                                      ? rescontact?.data[0].avatar
                                      : `${config.baseurl2}${rescontact?.data[0].avatar}`
                                  }
                                />
                                <div className="media-body">
                                  <span className="name">
                                    {rescontact?.data[0].names}{" "}
                                  </span>
                                  <span className="message">
                                    {rescontact?.data[0].mail}
                                  </span>{" "}
                                  {rescontact?.data[0].date && (
                                    <span className="dashsymbol"> | - | </span>
                                  )}{" "}
                                  {rescontact?.data[0].date && (
                                    <span className="message">
                                      {rescontact?.data[0].date}
                                    </span>
                                  )}
                                  <span className="badge badge-outline status"></span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>{" "}
                      </div>
                    )}
                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.projects?.fields?.projects_prj_tags ===
                        "true" ? (
                        <div className="col-md-6">
                          <p>Tags</p>
                          <Select
                            mode="tags"
                            style={{
                              width: "200%",
                            }}
                            onSearch={(v) => {
                              onSearchFollowerAdd(v);
                            }}
                            placeholder="Tags"
                            onChange={(v1, v2) => {
                              console.log(v1);
                              setSelected(v1);
                            }}
                            options={tagoption && tagoption}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header borderblue">
                  <h3 className="card-title">
                    {Translation(translations, "Overview")}
                  </h3>
                  <div className="card-options">
                    <Link
                      onClick={(e) => handleToggle(e)}
                      className="card-options-collapse"
                    >
                      <i className={`fe fe-chevron-down`} />
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div id="section-body" className="section-body">
                    <div className="container-fluid col-12">
                      {overViewField && overViewField ? (
                        <div className="innerNav">
                          <MDBTabs
                            justify
                            className="nav d-flex nav-tabs page-header-tab"
                          >
                            {overViewField.all_fields &&
                              Object.keys(overViewField.all_fields).map(
                                (item, index) => {
                                  return (
                                    <MDBTabsItem key={index}>
                                      <MDBTabsLink
                                        onClick={() =>
                                          handleJustifyClick2(`tab2${index}`)
                                        }
                                        active={
                                          justifyActive2 == `tab2${index}`
                                        }
                                      >
                                        {item.replaceAll("_", " ")}
                                      </MDBTabsLink>
                                    </MDBTabsItem>
                                  );
                                }
                              )}
                          </MDBTabs>
                          <MDBTabsContent>
                            {overViewField?.all_fields &&
                              Object.keys(overViewField?.all_fields).map(
                                function (key, i) {
                                  return (
                                    <MDBTabsPane
                                      key={i}
                                      show={justifyActive2 == `tab2${i}`}
                                    >
                                      <div className="card p-3">
                                        {console.log(overViewField?.all_fields)}
                                        <div className="card-body">
                                          {overViewField?.all_fields &&
                                            Object.keys(
                                              overViewField?.all_fields[key]
                                            ).map(function (key2, ii) {
                                              return (
                                                <div key={ii}>
                                                  <h3 className="my-3">
                                                    {key2.replaceAll("_", " ")}
                                                  </h3>
                                                  {overViewField?.all_fields &&
                                                    Object.keys(
                                                      overViewField?.all_fields[
                                                        key
                                                      ][key2]
                                                    ).map(function (key3, j) {
                                                      const {
                                                        type,
                                                        body,
                                                        field_required,
                                                        label,
                                                      } =
                                                        overViewField
                                                          .all_fields[key][
                                                          key2
                                                        ][key3];
                                                      const objname =
                                                        Object.keys(
                                                          overViewField
                                                            .all_fields[key][
                                                            key2
                                                          ]
                                                        )[j];
                                                      let labelName = `projects_${label.replaceAll(
                                                        " ",
                                                        "_"
                                                      )}`;
                                                      if (
                                                        field_required == "yes"
                                                      ) {
                                                        if (
                                                          leadPermission?.super_admin ||
                                                          leadPermission
                                                            ?.projects?.fields[
                                                            labelName
                                                          ] === "true"
                                                        ) {
                                                          if (
                                                            !rerData.includes(
                                                              label
                                                            )
                                                          ) {
                                                            rerData.push(
                                                              label.replaceAll(
                                                                " ",
                                                                "_"
                                                              )
                                                            );
                                                            rerDataLabels.push({
                                                              label: label,
                                                              name: label.replaceAll(
                                                                " ",
                                                                "_"
                                                              ),
                                                            });
                                                          }
                                                        }
                                                      }
                                                      return (
                                                        <div key={j}>
                                                          {(() => {
                                                            if (
                                                              type == "select"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    className="form-control my-1"
                                                                    selectList={body.split(
                                                                      ","
                                                                    )}
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    control="select3"
                                                                    firstSelect={
                                                                      "--select--"
                                                                    }
                                                                  />
                                                                );
                                                              }
                                                            } else if (
                                                              type == "radio"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    options={body.split(
                                                                      ","
                                                                    )}
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    control="radio3"
                                                                  />
                                                                );
                                                              }
                                                            } else if (
                                                              type == "textarea"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    className={
                                                                      "form-control my-1"
                                                                    }
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    control="textarea3"
                                                                  />
                                                                );
                                                              }
                                                            } else if (
                                                              type == "checkbox"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    options={body.split(
                                                                      ","
                                                                    )}
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    control="checkbox"
                                                                  />
                                                                );
                                                              }
                                                            } else if (
                                                              type == "text"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    className="form-control my-1"
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    placeholder={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    control="input"
                                                                  />
                                                                );
                                                              }
                                                            } else if (
                                                              type == "date"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    className="form-control my-1"
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    placeholder={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    control="input"
                                                                    type="date"
                                                                  />
                                                                );
                                                              }
                                                            }
                                                            else if (
                                                              type == "number"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    className="form-control my-1"
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    placeholder={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    control="input"
                                                                    type="number"
                                                                  />
                                                                );
                                                              }
                                                            }
                                                            else if (
                                                              type == "time"
                                                            ) {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                  labelName
                                                                ] === "true"
                                                              ) {
                                                                return (
                                                                  <FormControl
                                                                    className="form-control my-1"
                                                                    required={
                                                                      field_required ==
                                                                        "yes" &&
                                                                      true
                                                                    }
                                                                    label={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    name={
                                                                      objname
                                                                    }
                                                                    placeholder={Translation(
                                                                      translations,
                                                                      `${label}`
                                                                    )}
                                                                    control="input"
                                                                    type="time"
                                                                  />
                                                                );
                                                              }
                                                            }
                                                          })()}
                                                        </div>
                                                      );
                                                    })}
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </MDBTabsPane>
                                  );
                                }
                              )}
                          </MDBTabsContent>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right col-md-12 mt-4 mb-2">
            <SubmitButton
              className="btn btn-primary m-2"
              props={submitbutton}
              buttonLoading={res.isLoading}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
