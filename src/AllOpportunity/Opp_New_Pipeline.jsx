import { useState, useEffect, useContext, useRef } from "react";
import usePost from "../customHooks/usePost";
import { Form, Formik } from "formik";
import FormControl from "../components/form/FormControl";
import { Translation } from "../components/Translation";
import File from "../components/form/File";
import { FaSearch } from "react-icons/fa";
import SubmitButton from "../components/SubmitButton";
import config from "../services/config.json";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { getTokenSession } from "../utils/common";
import { Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { MainHeadingContext } from "../context/MainHeadingContext";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import $, { data } from "jquery";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const submitbutton = {
  class: "btn btn-primary",
  text: "Store Opportunity",
};

function CreatePipline() {
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { addHeading } = useContext(MainHeadingContext);
  const navigate = useNavigate();
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [DropdownData, setDropdownData] = useState([]);
  const [StatusDropdownData, setStatusDropdownData] = useState([]);
  const [OppStageList, setOppStageList] = useState([]);
  const [onChangValue, setOnChangValue] = useState("");
  const [resPipeStage, apiMethodPipeStage] = usePost();
  const [resPipeStageOverView, apiMethodPipeStageOverView] = usePost();
  const ownerRef = useRef(null);
  const [res, apiMethod] = usePost();
  const [Img, setImg] = useState();
  const [resTag, apiMethodTag] = usePost();
  const [arrlen, setarrlen] = useState();
  const [selected, setSelected] = useState([]);
  const [tagoption, setTagOption] = useState([]);
  const [resowner, apiMethodowner] = usePost();
  const [resowner2, apiMethodowner2] = usePost();
  const [resowner3, apiMethodowner3] = usePost();
  const [resowner4, apiMethodowner4] = usePost();
  const [listOpen, setListOpen] = useState(false);
  const [listOpen2, setListOpen2] = useState(false);
  const [listOpen4, setListOpen4] = useState(false);
  const [searchval, setSearchval] = useState(
    `${permissions?.uname} (${permissions?.role_name})`
  );
  const [searchval2, setSearchval2] = useState(
    `${permissions?.uname} (${permissions?.role_name})`
  );
  const [searchval23, setSearchval23] = useState(``);
  const [content, setContent] = useState("");
  const ownerRef2 = useRef(null);
  const inputElement = useRef();
  const inputElement2 = useRef();
  const inputElement3 = useRef();
  const [ownerhidden, setOwnerhidden] = useState(`${permissions?.id}`);
  const [ownerhidden2, setOwnerhidden2] = useState(`${permissions?.id}`);
  const [ownerhidden3, setOwnerhidden3] = useState([]);
  const [contact_change, setContact_change] = useState([]);
  const [overViewField, setOverViewData] = useState("");
  const [stageValue, setStageValue] = useState("");
  const [contactValue, setContactValue] = useState("");

  const Initialvalues = {
    opp_title: "",
    opp_value: "",
    opp_assign: ownerhidden2,
    opp_pipeline: onChangValue,
    opp_stage: "",
    opp_owner: "",
    opp_status: "",
    opp_forcast: "",
    tags: "",
    avatarURL: "",
    submit: "create_lead",
  };
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
    customField.append("mode", "opportunities");
    customField.append("mdType", "Opportunity");
    customField.append("queryType", "add");
    apiMethodPipeStageOverView("postCustomFieldsOpportunity", customField);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const Req_data = [
    "opp_title",
    "opp_value",
    "opp_pipeline",
    "opp_status",
    "opp_forcast",
    "opp_stage",
  ];
  const rerDataLabels = [
    { label: "Opportunity Title", name: "opp_title" },
    { label: "Opportunity Value", name: "opp_value" },
    { label: "Pipeline", name: "opp_pipeline" },
    { label: "Status", name: "opp_status" },
    { label: "Forecast CloseDate", name: "opp_forcast" },
    { label: "Opportunity Stage", name: "opp_stage" },
  ];

  useEffect(() => {
    addHeading(`Create Opportunity`);
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    // define a separate function to fetch and update dropdown data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiEndPoint}getAllViewOpportunityPiplines`
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
          `${config.apiEndPoint}getAllViewOpportunityStatus`
        );
        setStatusDropdownData(response.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    // call the fetchData function only once on mount
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    setOnChangValue(e.target.value);
    let pipeStageData = new FormData();
    pipeStageData.append("general", "view_pipeline_stages");
    pipeStageData.append("gtRs", e.target.value);
    pipeStageData.append("layout", "list");
    apiMethodPipeStage("postAllViewOpportunityPiplinesStages", pipeStageData);
    console.log(e.target.value);
  };

  useEffect(() => {
    if (resPipeStage.data) {
      if (resPipeStage.data.status == "422") {
        setOppStageList([]);
      } else {
        setOppStageList(resPipeStage.data);
      }
    }
  }, [resPipeStage.data]);
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const handleList2 = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval2);
    apiMethodowner2("postSpecifiesUsers", formdataOwner);
    setListOpen2(!listOpen2);
  };
  const [contactSelected, setcontactSelected] = useState(false);
  function handlecontact() {
    // let map = ownerhidden3;
    // console.log(map)
    // let inputElement = document.querySelectorAll(".inputcontact:checked");
    // for (let index = 0; index < inputElement.length; index++) {
    //   map.push(inputElement[index].value);
    console.log(ownerhidden3);
    // }
    // const myArray = new Set(map);
    setOwnerhidden3(contact_change);
    let formdataOwner = new FormData();
    // console.log([...myArray])
    formdataOwner.append("ids[]", contact_change?.join(","));
    apiMethodowner4("postViewSelectedContact", formdataOwner);
    // setcontactSelected(true)
    // setListOpen4(false)
  }
  const handlecontactCheckbox = (e) => {
    setContact_change(e);
    // if (e.target.checked === false) {
    //   setOwnerhidden3(ownerhidden3.filter((item) => item !== e.target.value))
    // }
  };
  const handlecontactDelete = (item) => {
    setContactValue(contactValue.filter((ite) => ite !== item));
    setOwnerhidden3(ownerhidden3.filter(previous=>previous!=item.id))
    console.log(ownerhidden3,item);
  };
  const handleListnew = (a) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearchPros");
    formdataOwner.append("query", a);

    apiMethodowner3("postContactSearch", formdataOwner);
    setListOpen4(!listOpen4);
  };
  const handleClick = (item) => {
    setSearchval(`${item.uname + ` (${item.role_name})`}`);
    setOwnerhidden(item.id);
    setListOpen(false);
  };
  const handleClick2 = (item) => {
    setSearchval2(`${item.uname + ` (${item.role_name})`}`);
    setOwnerhidden2(item.id);
    setListOpen2(false);
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

  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunity_opp_title == "true"
  ) {
  } else {
    Req_data.splice(Req_data.indexOf("opp_title"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Opportunity Title"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunity_opp_value == "true"
  ) {
  } else {
    Req_data.splice(Req_data.indexOf("opp_value"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Opportunity Value"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunity_opp_status == "true"
  ) {
  } else {
    Req_data.splice(Req_data.indexOf("opp_status"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Status"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunity_opp_forcastedate ==
      "true"
  ) {
  } else {
    Req_data.splice(Req_data.indexOf("opp_forcast"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Forecast CloseDate"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunity_pipeline == "true"
  ) {
  } else {
    Req_data.splice(Req_data.indexOf("opp_pipeline"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Pipeline"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunity_opp_stage == "true"
  ) {
  } else {
    Req_data.splice(Req_data.indexOf("opp_stage"), 1);
    rerDataLabels.splice(rerDataLabels.indexOf("Opportunity Stage"), 1);
  }
  const handleToggle = (e) => {
    console.log(e);
    e.preventDefault();
    $(e.target).closest(".card").toggleClass("card-collapsed");
  };

  const handleSubmit = (values) => {
    if (Img == undefined) {
      values.avatarURL = "";
    } else {
      values.avatarURL = Img;
    }
    values.opp_assign = ownerhidden2;
    values.opp_pipeline = onChangValue;
    values.opp_owner = ownerhidden;
    values.tags = selected;
    values.opp_contact = ownerhidden3;
    values.opp_stage = stageValue;
    let opp_valuestring = values.opp_value.toString();
    values.opp_value = opp_valuestring;
    // console.log("values data ", values)
    const missingValues = [];
    Req_data.filter((val, label) => {
      if (values[val]?.trim() === "" || values[val] === undefined) {
        missingValues.push(rerDataLabels[label].label);
      }
    });
    if (missingValues.length === 0 && values.opp_contact.length !== 0) {
      let formdata = new FormData();
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      formdata.append("opp_desc", content);
      apiMethod("postCreateOpportunity", formdata);
      // navigate(`/${config.ddemoss}opp_pipelines`)
    } else {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: `Missing fields: ${missingValues.join(", ")}${
          values.opp_contact?.length != 0 ? "" : ",Contact"
        }`,
        icon: "error",
        dangerMode: true,
      });
    }
  };
  useEffect(() => {
    if (res.data) {
      if (res.data && !res.isLoading) {
        toast.success(res.data.message);
        navigate(`/${config.ddemoss}opportunities/${onChangValue}/Grid`);
      }
    }
  }, [res.data]);
  useEffect(() => {
    if (resowner4.data) {
      setContactValue(resowner4.data);
      const newArray = [];
      for (let i = 0; i < resowner4.data.length; i++) {
        newArray.push(resowner4.data[i].id);
      }
      setOwnerhidden3(newArray);
    }
  }, [resowner4.data]);
  useEffect(() => {
    if (resPipeStageOverView.data) {
      setOverViewData(resPipeStageOverView.data);
    }
  }, [resPipeStageOverView.data]);

  return (
    <div className="container-fluid">
      <Formik initialValues={Initialvalues} onSubmit={handleSubmit}>
        <Form name="myForm">
          <div className="row clearfix">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header borderblue">
                  <h3 className="card-title">
                    {Translation(translations, "New Opportunity")}
                  </h3>
                  <div className="card-options">
                    <Link
                      onClick={(e) => handleToggle(e)}
                      className="card-options-collapse"
                    >
                      <i className={`fe fe - chevron - down`} />
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row fv-plugins-icon-container">
                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_opp_title === "true" ? (
                        <FormControl
                          className="form-control my-1"
                          required={true}
                          label={Translation(translations, "Opportunity Title")}
                          name="opp_title"
                          control="input"
                          placeholder={Translation(
                            translations,
                            "Opportunity Title"
                          )}
                        />
                      ) : (
                        ""
                      )}
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_opp_value === "true" ? (
                        <FormControl
                          className="form-control my-1"
                          required={true}
                          min={0}
                          step="any"
                          type={"number"}
                          label={Translation(translations, "Opportunity Value")}
                          name="opp_value"
                          control="input"
                          placeholder={Translation(
                            translations,
                            "Opportunity Value"
                          )}
                        />
                      ) : (
                        ""
                      )}
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_assignto === "true" ? (
                        <div className="col-md-12 mt-3">
                          <label className="form-label">
                            {Translation(translations, "Assign to")}
                          </label>
                          <div ref={ownerRef2} className="searchDropDown">
                            <input
                              type="text"
                              className="form-control"
                              ref={inputElement2}
                              value={searchval2}
                              onChange={(e) => setSearchval2(e.target.value)}
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
                            } `}
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
                                          } `
                                        )}
                                      </li>
                                    );
                                  })
                                ) : (
                                  <li>
                                    {Translation(
                                      translations,
                                      `${resowner2.data.message} `
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
                    </div>

                    <div className="col-md-6">
                      <div className="col-md-12">
                        <File
                          label={Translation(translations, "Feature Image")}
                          value={Img}
                          onUpload={setImg}
                          name={"img"}
                        />
                      </div>
                    </div>
                    <div className="col-12 mt-4"></div>
                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_pipeline === "true" ? (
                        <FormControl
                          className="form-control my-1"
                          selectList={DropdownData}
                          firstSelect={"--select--"}
                          label={Translation(translations, `${"Pipeline"} `)}
                          name="Pipeline"
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
                      leadPermission?.opportunities?.fields
                        ?.opportunity_opp_stage === "true" ? (
                        <FormControl
                          className="form-control my-1"
                          selectList={OppStageList}
                          firstSelect={"--select--"}
                          label={Translation(
                            translations,
                            `${"Opportunity Stage"} `
                          )}
                          name="opp_stage"
                          custom_label_name="name"
                          customer_value_name="id"
                          onChange={(e) => handleStage(e)}
                          value={stageValue}
                          control="select_custom_options"
                          required={true}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {leadPermission?.super_admin ||
                    leadPermission?.opportunities?.fields
                      ?.opportunity_assignto === "true" ? (
                      <div className="col-md-6 mt-3">
                        <label className="form-label">
                          {Translation(translations, "Opportunity Owner")}
                        </label>
                        <div ref={ownerRef} className="searchDropDown">
                          <input
                            type="text"
                            className="form-control"
                            ref={inputElement}
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
                          className={`dropDownCustom ${listOpen && "active"} `}
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
                                        } `
                                      )}
                                    </li>
                                  );
                                })
                              ) : (
                                <li>
                                  {Translation(
                                    translations,
                                    `${resowner.data.message} `
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

                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_opp_status === "true" ? (
                        <FormControl
                          className="form-control"
                          firstSelect={"--select--"}
                          required={true}
                          label={Translation(translations, "Status")}
                          name="opp_status"
                          selectList={StatusDropdownData}
                          custom_label_name="status_name"
                          customer_value_name="status_id"
                          control="select_custom_options"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-12">
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_opp_description === "true" ? (
                        <div className="form-group my-2">
                          <label className="form-label">Description</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={handleEditorChange}
                          />
                        </div>
                      ) : (
                        // <FormControl
                        //   className="form-control my-1"
                        //   label={Translation(translations, "Opportunity Description")}
                        //   name="OpportunityDescription"
                        //   control="textarea"
                        //   placeholder={Translation(translations, "Opportunity Description")}
                        // />
                        ""
                      )}
                    </div>
                    <div className="col-md-6 my-2">
                      <label className="form-label mb-3">
                        {Translation(translations, "Contact")}
                        <span style={{ color: "red" }}> *</span>
                      </label>
                      <Select
                        mode="multiple"
                        filterOption={(input, option) =>
                          (option?.children ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onSearch={(v) => {
                          handleListnew(v);
                        }}
                        onChange={(v1, v2) => {
                          handlecontactCheckbox(v1);
                        }}
                        style={{ width: "100%", height: 30 }}
                        placeholder={"Search follower name"}
                      >
                        {resowner3.data &&
                          resowner3.data.length &&
                          resowner3.data.map(({ fname, id, lname, email }) => (
                            <Select.Option value={id} key={id}>
                              {fname + " " + lname}
                            </Select.Option>
                          ))}
                      </Select>
                      <button
                        type="button"
                        className="btn btn-primary mt-3 mb-2"
                        style={{ marginLeft: "auto", display: "" }}
                        onClick={handlecontact}
                      >
                        Done Selection
                      </button>
                      {/* <div ref={ownerRef2} className="searchDropDown">
                        <input
                          type="text"
                          className="form-control"
                          ref={inputElement3}
                          value={searchval23}
                          placeholder="Type & Search"
                          onChange={(e) => setSearchval23(e.target.value)}
                        />
                        <button
                          className="nav-link clickButton"
                          type="button"
                          id="dropdownMenuButton"
                          onClick={() => handleListnew(searchval23)}
                        >
                          <FaSearch />
                        </button>
                      </div> */}
                      {/* <div className={`dropDownCustom ${listOpen4 && "active"} `}>
                        {resowner3.data && (
                          <div>
                            <ul className="list">
                              {resowner3.isLoading ? (
                                ""
                              ) : !resowner3.data.message ? (
                                resowner3.data.map((item, index) => {
                                  return (
                                    <li
                                      key={index}
                                    >
                                      <label key={item.id}>
                                        <input
                                          type="checkbox"
                                          className="inputcontact"
                                          name="inputcontact"
                                          value={item.id}
                                          defaultChecked={ownerhidden3.includes(item.id)}
                                          onChange={(e) => handlecontactCheckbox(e)}
                                        />&nbsp;&nbsp;
                                        {`${item.fname} ` + `${item.lname} ` + " " + " " + `(${item.email})`}
                                      </label>
                                    </li>
                                  );
                                })
                              ) : (
                                <li>
                                  {Translation(
                                    translations,
                                    `${resowner3.data.message} `
                                  )}
                                </li>
                              )}


                            </ul>
                          </div>
                        )}
                        <button type="button" className="btn btn-primary m-2"
                          style={{ marginLeft: "auto", display: "block" }} onClick={handlecontact}>Done Selection</button>
                      </div> */}
                      {
                        <>
                          {contactSelected && (
                            <div className="c2_own">
                              <div
                                style={{ marginTop: "10px" }}
                                className={`text - ${
                                  contactValue.length > 0 ? "green" : "red"
                                } gr1`}
                              >
                                {" "}
                                You have selected {contactValue.length}{" "}
                                contact(s).{" "}
                              </div>
                            </div>
                          )}

                          {
                            <div className="c2_own_2">
                              <ul className="right_chat list-unstyled p-0 right_chat_vl">
                            {  resowner4.isLoading ?(
                  <span className="span_loader">
                    <i className="fa fa-pulse fa-spinner"></i>
                  </span>
                ):Array.isArray(contactValue) &&
                                  contactValue.map((item, index) => {
                                  
                                    return (
                                      <li key={index} className="online mb-2">
                                        <Link
                                          className="cc_cls"
                                          onClick={() =>
                                            handlecontactDelete(item)
                                          }
                                        >
                                          <i className="fa-solid fa-xmark"></i>
                                        </Link>
                                        <div className="media">
                                          <img
                                            className="media-object"
                                            src={
                                              item.avatar &&
                                              item.avatar.includes("http")
                                                ? item.avatar
                                                : `${config.baseurl2}${item.avatar} `
                                            }
                                            alt=""
                                          />
                                          <div className="media-body">
                                            <span className="name">
                                              {item.fullname}
                                            </span>
                                            <span className="message">
                                              {item.email}
                                            </span>
                                            <span className="badge badge-outline status"></span>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          }
                        </>
                      }
                    </div>

                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_opp_forcastedate === "true" ? (
                        <FormControl
                          className="form-control my-1"
                          required={true}
                          label={Translation(
                            translations,
                            "Forecast Close Date"
                          )}
                          name="opp_forcast"
                          control="input"
                          type="date"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-md-6">
                      {leadPermission?.super_admin ||
                      leadPermission?.opportunities?.fields
                        ?.opportunity_opp_tags === "true" ? (
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
                            {overViewField?.all_fields &&
                              Object.keys(overViewField?.all_fields).map(
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
                                                      let labelName = `opportunity_${label.replaceAll(
                                                        " ",
                                                        "_"
                                                      )}`;
                                                      if (
                                                        field_required == "yes"
                                                      ) {
                                                        if (
                                                          leadPermission?.super_admin ||
                                                          leadPermission
                                                            ?.opportunities
                                                            ?.fields[
                                                            labelName
                                                          ] === "true"
                                                        ) {
                                                          if (
                                                            !Req_data.includes(
                                                              label
                                                            )
                                                          ) {
                                                            Req_data.push(
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
                                                                  ?.opportunities
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
                                                                  ?.opportunities
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
                                                                  ?.opportunities
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
                                                                  ?.opportunities
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
                                                            } else if (type == "text") {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.opportunities
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
                                                            } 
                                                            else if ( type == "date") {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.opportunities
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
                                                            else if ( type == "number") {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.opportunities
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
                                                            else if ( type == "time") {
                                                              if (
                                                                leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.opportunities
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
            <SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePipline;
