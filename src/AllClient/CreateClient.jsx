import { Form, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import FormControl from "../components/form/FormControl";
import usePost from "../customHooks/usePost";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import File from "../components/form/File";
import SubmitButton from "../components/SubmitButton";
import { FaSearch } from "react-icons/fa";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { Translation } from "../components/Translation";
import swal from "sweetalert";
import Loader from "../components/common/Loading";
import useFetch from "../customHooks/useFetch";
import config from '../services/config.json'
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import axios from "axios";
import { getTokenSession } from "../utils/common";
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Dropdown5 from "../components/form/Dropdown5";
import { handleToggle } from "../components/AllCustomFuntion";
import dayjs from "dayjs";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import gravatar from 'gravatar'
import md5 from "md5";
import { EmailStatus } from "../Data/AllData";
import { DatePicker } from "antd";

function CreateClient() {

  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { data: sourceList, loading7, error7, } = useFetch("", "getAllSources");
  const { data: prospect_lead_stage, loading8, error8, } = useFetch("", "getAllClientsNewClients");
  const [stageData, setStageData] = useState([])
  const [resStage, apiMethodStage] = usePost();
  const isComponentMounted = useRef(true);
   useEffect(() => {
    if (isComponentMounted.current) {
      let formdata = new FormData();
  apiMethodStage("postClientsKanbanView",formdata)
    }
    return () => {
      isComponentMounted.current = false;
    };
 
 }, [])
   useEffect(() => {
    if(resStage.data) {
      handleStage2(resStage.data?.all_stages?.[0]?.id)
      setStageData(resStage.data)
    }
 }, [resStage.data])
 
 
  const [resowner, apiMethodowner] = usePost();
  const [res_type_of_contact_list, apiMethod_type_of_contact_list] = usePost();
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [res3, apiMethod3] = usePost();
  const [practiceName, setPracticeName] = useState("");
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [image, setImage] = useState('');
  const [selected, setSelected] = useState([]);
  const inputElement = useRef();
  const [ownerhidden, setOwnerhidden] = useState(`${permissions?.id}`);
  const [listOpen, setListOpen] = useState(false);
  const [searchval, setSearchval] = useState(`${permissions?.uname} (${permissions?.role_name})`);
  const ownerRef = useRef(null);
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [respremetion, apiMethodPremetion] = usePost();
  const [OppStageList, setOppStageList] = useState([]);
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedSource2, setSelectedSource2] = useState("");
  const [defaultCreateDate, setdefaultCreateDate] = useState(dayjs())
  const [createDate, setCreateDate] = useState('');
  const [res4, apiMethod4] = usePost();
  const navigate = useNavigate();
  const { data: timeZone, loading3, error3 } = useFetch("", "getListTimeZone");

  useEffect(() => {
    if (permissions) {
      setPracticeName(permissions[`system-user_timezone`]?.setting_value);
    }
  }, [permissions])
  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.clients?.active_module == "0" || leadPermission?.clients?.create == "0") {
        navigate(`/${config.ddemoss}`);
      }
      // 
    }
  }, [leadPermission]);
  useEffect(() => {
    addHeading(`Create Client`);
    apiMethod_type_of_contact_list("postAllViewTypeContact",
      { type: "Lead,Prospect,Client" })
  }, []);


  const handleJustifyClick2 = (value) => {
    if (value == justifyActive2) {
      return;
    }
    setJustifyActive2(value);
  };
  const [Stage, setStage] = useState("")


  useEffect(() => {
    if (res2.data) {
      setEditLeadFeild(res2.data);
      setJustifyActive2("tab20");
    }
  }, [res2.data]);
  useEffect(() => {
    if (practiceName) {
      const date = dayjs().tz(practiceName);
      const formattedDate = date.format("YYYY-MM-DDTHH:mm");
      setCreateDate(date)
    }
  }, [practiceName])


  const handleCreatedDate = (value) => {
    setdefaultCreateDate(value)
    let initialTime = defaultCreateDate
    let minDiff = value.diff(initialTime, 'minute')
    let updateTime = createDate.add(minDiff ? minDiff : 0, 'minute')
    setCreateDate(updateTime)
  }


  const handleSourceChange = (event) => {

    setSelectedSource(event.target.value);
  };
  const handleSourceChange2 = (event) => {
    console.log(event.target.value);
    setSelectedSource2(event.target.value);
  };
  useEffect(() => {
    if (res4.data) {
      setOppStageList(res4.data);
      Array.isArray(res4.data)
        ? setSelectedSource2("")
        : setSelectedSource2("");
    }
  }, [res4])

  const handleStage2 = (e) => {
    let leads = new FormData();
    setStage(e)
    leads.append("type", "getCustomFields");
    leads.append("mode", "clients");
    leads.append("mdType", "Client");
    leads.append("lead_stage", e);
    apiMethod2("postClientsStageCustomFields", leads);
  };
  useEffect(() => {
    if (res2.data) {
      setJustifyActive2("tab20");
      setEditLeadFeild(res2.data);
    }
  }, [res2.data]);

  const [initialValues, setInitialValues] = useState({
    fname: "",
    lname: "",
    contact_type: "",
    email_status: "",
    mobile_phone: "",
    number: "",
    birthday: "",
    score_number: "",
    address_one: "",
    address_two: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    ip_address: "",
    locale: "",
    sourcepage: "",
    leadsource: "",
    lead_leadmedium: '',
    Business_Unit: "",
    Radio: "",
    TesteDec11: "",
    Medium: "",
    Campaign: "",
    Keyword: "",
    UTM_Source: "",
    UTM_Medium: "",
    UTM_Campaign: "",
    UTM_Term: "",
  });
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
  let reqName = ["fname", "leadsource", "contact_type", "lead_leadmedium"];
  let reqNameObj = [
    {
      label: "First Name",
      name: "fname"
    },
    {
      label: "Email",
      name: "email"
    }, {
      label: "Lead Source",
      name: "leadsource"
    },
    {
      label: "Lead Medium",
      name: "lead_leadmedium",
    },
    {
      label: "Type",
      name: "contact_type"
    },

  ]
  const [img33, setimg33] = useState("")
  const [emails, setEmails] = useState("")
  const [emailse, setEmailse] = useState(false)
  const [tagoption, setTagOption] = useState([])


  const handleEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(e)}?d=404`;

    if (emailRegex.test(e)) {
      const avatarUrl = gravatar.url(e, { s: '200', r: 'pg', d: 'identicon' }, true);
      fetch(gravatarUrl)
        .then(response => {
          if (response.status === 404) {
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
              .then((res) => {
                setEmailse(res.data.aleady_exist);
                if (permissions["system-default-avatar-image"]?.setting_value) {
                  setImage(permissions["system-default-avatar-image"]?.setting_value)
                }
                else {
                  setImage("https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160")
                }

              })
              .catch((err) => {
                console.log("create errr", err);
              });
          } else {
            setImage(`${avatarUrl}`)
          }
        })
        .catch(error => {
          console.error('Error checking Gravatar image:', error);
        });
    }
    else {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
        .then((res) => {
          setEmailse(res.data.aleady_exist);
          if (image === '') {
            if (permissions["system-default-avatar-image"]?.setting_value) {
              setImage(permissions["system-default-avatar-image"]?.setting_value)
            }
            else {
              setImage("https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160")
            }
          }
        })
        .catch((err) => {
          console.log("create errr", err);
        });
    }


    setEmails(e);
  };


  function handleSubmit(values) {
    values.lead_leadmedium = selectedSource2;
    values.leadsource = selectedSource;
    values.create_date = createDate.format('YYYY-MM-DD HH:mm:ss');
    console.log(values)

    let req = reqName.filter((val) => { return (values[val])?.trim() == '' || values[val] == undefined })
    let emptyReq_field_name = []

    if (emails == '') {
      if (leadPermission?.super_admin == true || leadPermission?.clients?.fields?.clients_email == "true") {
        req.push('email')
      }
    }
    reqNameObj.map((val, i) => {
      if (
        req.includes(val.name)
      ) {
        console.log(val.label);
        emptyReq_field_name.push(val.label)
      }
    })
    if (emailse) {
      {
        swal({
          title: "Email already used:",
          text: emails,
          icon: "warning",
          dangerMode: true,
        })

      }



    }
    else if (req.length == 0) {

      let formdata = new FormData();
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      formdata.append("tags[]", selected)
      formdata.append("email", emails)
      formdata.append("time_zone", practiceName || "")
      formdata.append("owner", ownerhidden)
      formdata.append("number", initialValues.number);
      formdata.append("mobile_phone", initialValues.mobile_phone);
      if (typeof (image) === "object") {
        formdata.append("avatar", image);
        formdata.append("avatarURL", "");
      }
      else {
        formdata.append("avatar", "");
        formdata.append("avatarURL", image);
      }
      formdata.append("client_stage", Stage);
      formdata.append("lead_stage", prospect_lead_stage && prospect_lead_stage.CreateProspect.id);
      formdata.append("prospect_stage", prospect_lead_stage && prospect_lead_stage.NewClients.id);
      formdata.append("submit", "create_client");

      let bodyContent = formdata;
      apiMethod("postCreateClient", bodyContent);


    } else {

      let a = emptyReq_field_name.join(", ")
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: a,
        icon: "error",
        dangerMode: true,
      })
    }
  }
  useEffect(() => {
    if (res.data) {
      if (res.data && !res.isLoading) {
        toast.success(res.data.message);
        navigate(`/${config.ddemoss}clients/Grid`);

      }
    }
  }, [res.data])
  const [resTag, apiMethodTag] = usePost();
  const onSearchFollowerAdd = (v) => {
    const formdata = new FormData()
    formdata.append("search_term", v)
    apiMethodTag('postSearchTags', formdata)
  }
  useEffect(() => {
    if (resTag.data) {
      if (resTag.data && !resTag.isLoading) {
        if (!resTag.data.message) {
          setTagOption(resTag.data.map((item) => {
            return {
              value: item,
              item,
            }
          }))
        }
      }
    }
  }, [resTag.data])
  useEffect(() => {
    if (selectedSource) {
      if (leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lead_medium === "true") {
        apiMethod4("postMediumByID", { id: selectedSource });
      }
    }
  }, [selectedSource]);


  const submitbutton = {
    class: "btn btn-primary",
    text: "Store Client",
  };
  if (!timeZone || respremetion.isLoading || !editLeadFeild || resStage.isLoading) return <Loader />

  if (leadPermission?.super_admin == true || leadPermission?.clients?.fields?.clients_fname == "true") {
  }
  else {
    reqName.splice(reqName.indexOf("fname"), 1)
  }
  if (leadPermission?.super_admin == true || leadPermission?.clients?.fields?.clients_lead_source == "true") {
  }
  else {
    reqName.splice(reqName.indexOf("leadsource"), 1)
    reqName.splice(reqName.indexOf("lead_leadmedium"), 1)
  }
  if (leadPermission?.super_admin == true || leadPermission?.clients?.fields?.clients_lead_medium == "true") {
  }
  else {
    reqName.splice(reqName.indexOf("lead_leadmedium"), 1)
  }
  if (leadPermission?.super_admin == true || leadPermission?.clients?.fields?.clients_contact_type == "true") {
  }
  else {
    reqName.splice(reqName.indexOf("contact_type"), 1)
  }


  return (
    <div className="container-fluid">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form name="myForm">
          <div className="row clearfix">
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header borderblue">
                  <h3 className="card-title">
                    {Translation(translations, "New Client")}
                  </h3>
                  <div className="card-options">
                    <Link
                      onClick={(e) => handleToggle(e)}
                      className="card-options-collapse"
                    ><i className={`fe fe-chevron-down`} />
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row fv-plugins-icon-container">
                    <div className="col-md-6">
                      {
                        leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_fname === "true" ?

                          <FormControl
                            className="form-control my-1"
                            required={true}
                            label={Translation(translations, "First Name")}
                            name="fname"
                            control="input"
                            placeholder={Translation(translations, "First Name")}
                          />
                          : ""

                      }
                      {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lname === "true" ?
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, "Last Name")}
                          name="lname"
                          control="input"
                          placeholder={Translation(translations, "Last Name")}
                        /> : ''}
                      {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_contact_type === "true" ?
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--Select--"}
                          selectList={res_type_of_contact_list.data && res_type_of_contact_list.data}
                          required={true}
                          label={Translation(translations, `${"Type"}`)}
                          name="contact_type"
                          control="select_custom_options"
                          custom_label_name="type_name"
                          customer_value_name="db_id"
                        /> : ''}
                    </div>
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_avtar === "true" ?
                      <div className="col-md-6"   >
                        <File
                          label={Translation(translations, "Avatar")}
                          value={image ? typeof (image) !== "object" ? image.includes("http") ? image : `${config.baseurl2}${image}` : image : image}
                          onUpload={setImage}
                          name={"avatar"}
                        />
                      </div> : ''}
                    <div className="col-md-12 my-3"></div>
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_email === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          required={true}
                          label={Translation(translations, `${"E-mail"}`)}
                          name="email"
                          value={emails}
                          control="input"
                          onChange={(e) => handleEmail(e.target.value)}
                          placeholder={Translation(translations, "E-mail")}
                        />
                        {emailse && <div id="email_err" style={{ "color": "red" }}>Email already stored!</div>}
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_email_status === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          selectList={EmailStatus}
                          label={Translation(translations, `${"Email status"}`)}
                          name="email_status"
                          control="select"
                          placeholder={Translation(translations, "E-mail")}
                        />
                      </div> : ''}

                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lead_stage === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          id={"lead_stage"}
                          className="form-control my-1"
                          label={Translation(translations, `${"Lead Stage"}`)}
                          name={"lead_stage"}
                          control="input"
                          value={prospect_lead_stage && prospect_lead_stage.CreateProspect.name}
                          disabled
                        />

                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lead_stage === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          id={"lead_stage"}
                          className="form-control my-1"
                          label={Translation(translations, `${"Prospect Stage"}`)}
                          name={"lead_stage"}
                          control="input"
                          value={prospect_lead_stage && prospect_lead_stage.NewClients.name}
                          disabled
                        />

                      </div> : ''}

                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lead_stage === "true" ?
                      <div className="col-md-6">

                        <FormControl
                          id={"client_stage"}
                          className="form-control my-1"
                          selectList={stageData.all_stages}
                          label={Translation(translations, `${"Client Stage"}`)}
                          name={"client_stage"}
                          control="select_custom_options"
                          value={Stage}
                          custom_label_name="name"
                          customer_value_name="id"
                          onChange={(e) => handleStage2(e.target.value)}
                        />

                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_phone_number === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          updatess={(item) =>
                            setInitialValues({
                              ...initialValues,
                              number: `+${item}`,
                            })
                          }
                          datas={initialValues.number}
                          label={Translation(translations, `${"Phone Number"}`)}
                          name="number"
                          control="intl"
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_mobile_phone === "true" ?
                      <div className="col-md-6 mt-1">
                        <FormControl
                          className="form-control my-1"
                          updatess={(item) =>
                            setInitialValues({
                              ...initialValues,
                              mobile_phone: `+${item}`,
                            })
                          }
                          datas={initialValues.mobile_phone}
                          label={Translation(translations, `${"Mobile Phone"}`)}
                          name="mobile_phone"
                          control="intl"
                        />
                      </div> : ''}
                    {leadPermission?.super_admin ?
                      <div className="col-md-6 mt-3">
                        <label className="form-label">
                          {Translation(translations, "Owner")}
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
                        <input type="hidden" name={"owner"} value={ownerhidden} />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_birthday === "true" ?
                      <div className="col-md-6 mt-3">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, "birthday")}
                          name="birthday"
                          control="input"
                          type="date"
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_tags === "true" ?
                      <div className="col-md-6">
                        <p>{Translation(translations, "Tags")}</p>
                        <Select
                          mode="tags"
                          style={{
                            width: '100%',
                          }}
                          onSearch={
                            (v) => {
                              onSearchFollowerAdd(v);
                            }
                          }
                          placeholder="Tags"
                          onChange={(v1, v2) => {
                            console.log(v1)
                            setSelected(v1)
                          }}
                          options={tagoption && tagoption}
                        />

                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_score_number === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          type={"number"}
                          label={Translation(translations, `${"Score Number"}`)}
                          name="score_number"
                          control="input"
                          min={0}
                          onKeyDown={(e) => {
                            if (e.key === "-" || e.key === "+") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div> : ''}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="border-bottom pb-2 mb-3">
                        {Translation(translations, "Location")}
                      </h5>
                    </div>
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_address1 === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"Address 1"}`)}
                          name="address_one"
                          control="input"
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_address2 === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"Address 2"}`)}
                          name="address_two"
                          control="input"
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_city === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"City"}`)}
                          name="city"
                          control="input"
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_postal_code === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"Postal/ZIP Code"}`)}
                          name="zip"
                          control="input"
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_state === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"State"}`)}
                          name="state"
                          control="input"
                          placeholder={Translation(translations, "State")}
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.clients?.clients_country === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"Country"}`)}
                          name="country"
                          control="input"
                          placeholder={Translation(translations, "Country")}
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_ipaddress === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"IP Address"}`)}
                          name="ip_address"
                          control="input"
                          placeholder={Translation(translations, "IP Address")}
                        />
                      </div> : ''}

                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_time_zone === "true" ?
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            {Translation(translations, "Time Zone")}
                          </label>
                          <Dropdown5
                            list={timeZone}
                            changes={(value) => setPracticeName(value)}
                            selected={practiceName}
                          />
                        </div>
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_locale === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"Locale"}`)}
                          name="locale"
                          control="input"
                          placeholder={Translation(translations, "Locale")}
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_sourcepage === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, `${"Source Page"}`)}
                          name="sourcepage"
                          control="input"
                          placeholder={Translation(translations, "Source Page")}
                        />
                      </div> : ''}
                    {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lead_source === "true" ?
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          selectList={sourceList && sourceList}
                          label={Translation(translations, `${"Lead Source"}`)}
                          name="leadsource"
                          control="select_custom_options"
                          custom_label_name="source_name"
                          customer_value_name="source_id"
                          required={true}
                          firstSelect={"--select--"}
                          value={selectedSource}
                          onChange={handleSourceChange}
                        />
                      </div> : ''}
                    <div className="col-md-6">
                      {leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lead_source === "true" ?
                        leadPermission?.super_admin || leadPermission?.clients?.fields?.clients_lead_medium === "true" ?
                          <div>
                            <FormControl
                              className="form-control my-1"
                              selectList={OppStageList}
                              firstSelect={"--select--"}
                              label={Translation(translations, `${"Lead Medium"}`)}
                              name="lead_leadmedium"
                              required={true}
                              custom_label_name="source_name"
                              customer_value_name="source_id"
                              value={selectedSource2}
                              onChange={handleSourceChange2}
                              control="select_custom_options"

                            />
                          </div>
                          : '' : ""}
                    </div>
                    {/* <div className="col-md-12">
                      <hr />
                    </div> */}
                    <div className="col-md-6 form-group my-1 time-picker1">
                      <b>Create Date</b>
                      <DatePicker
                        style={{ height: 38, marginTop: 12 }}
                        onChange={handleCreatedDate}
                        allowClear={false}
                        value={defaultCreateDate}
                        showTime={{ format: 'HH:mm:A', use12Hours: true }}
                        format={"YYYY/MM/DD  HH:mm A"}
                      />
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
                    ><i className={`fe fe-chevron-down`} />
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div id="section-body" className="section-body">
                    <div className="container-fluid">
                      {console.log(editLeadFeild)}
                      {!res2.isLoading &&
                        !editLeadFeild?.message && editLeadFeild ? (
                        <div className="innerNav">
                          <MDBTabs
                            justify
                            className="nav d-flex nav-tabs page-header-tab"
                          >
                            {Object.keys(editLeadFeild?.all_fields)?.map(
                              (item, index) => {
                                return (
                                  <MDBTabsItem key={index}>
                                    <MDBTabsLink
                                      onClick={() =>
                                        handleJustifyClick2(`tab2${index}`)
                                      }
                                      active={justifyActive2 == `tab2${index}`}
                                    >
                                      {item.replaceAll("_", " ")}
                                    </MDBTabsLink>
                                  </MDBTabsItem>
                                );
                              }
                            )}
                          </MDBTabs>
                          <MDBTabsContent>
                            {Object.keys(editLeadFeild.all_fields).map(
                              function (key, i) {
                                return (
                                  <MDBTabsPane
                                    key={i}
                                    show={justifyActive2 == `tab2${i}`}
                                  >
                                    <div className="card p-3">
                                      <div className="card-body">
                                        {Object.keys(editLeadFeild.all_fields[key]).map(
                                          function (key2, ii) {
                                            return (
                                              <div key={ii} >
                                                <h6 className="my-3">
                                                  {key2.replaceAll("_", " ")}
                                                </h6>
                                                {Object.keys(editLeadFeild.all_fields[key][key2]).map(function (key3, j) {
                                                  const { type, body, field_required, label, } = editLeadFeild.all_fields[key][key2][key3];
                                                  const objname = Object.keys(editLeadFeild.all_fields[key][key2])[j];
                                                  let labelName = `clients_${label.replaceAll(' ', '_')}`
                                                  if (field_required == 'yes') {
                                                    if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === 'true') {

                                                      if (!reqName.includes(label)) {
                                                        reqName.push(label.replaceAll(' ', '_'))
                                                        reqNameObj.push({
                                                          label: label,
                                                          name: label.replaceAll(' ', '_')
                                                        })
                                                      }
                                                    }

                                                  };




                                                  return (
                                                    <div key={j}>
                                                      {(() => {
                                                        if (type == "select") {

                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === 'true') {
                                                            return (
                                                              <FormControl
                                                                className="form-control my-1"
                                                                selectList={body.split(",")}
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations, `${label}`)}
                                                                name={objname}
                                                                control="select3"
                                                                firstSelect={"--select--"}

                                                              />
                                                            );
                                                          }

                                                        } else if (
                                                          type == "radio"
                                                        ) {

                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === 'true') {
                                                            return (
                                                              <FormControl
                                                                options={body.split(",")}
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations, `${label}`)}
                                                                name={objname}
                                                                control="radio3"

                                                              />
                                                            );
                                                          }

                                                        } else if (type == "textarea") {

                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === 'true') {
                                                            return (
                                                              <FormControl
                                                                className={"form-control my-1"}
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations, `${label}`)}
                                                                name={objname}
                                                                control="textarea3"

                                                              />
                                                            );
                                                          }


                                                        } else if (
                                                          type == "checkbox"

                                                        ) {

                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === 'true') {
                                                            return (
                                                              <FormControl
                                                                options={body.split(",")}
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations, `${label}`)}
                                                                name={objname}
                                                                control="checkbox"

                                                              />
                                                            );
                                                          }




                                                        } else if (type == "text") {

                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === 'true') {
                                                            return (
                                                              <FormControl className="form-control my-1"
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations, `${label}`)}
                                                                name={objname}
                                                                placeholder={Translation(translations, `${label}`)}
                                                                control="input"

                                                              />
                                                            );
                                                          }
                                                        }
                                                        else if (type == "date") {
                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === "true") {
                                                            return (
                                                              <FormControl
                                                                className="form-control my-1"
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations,`${label}`)}
                                                                name={objname}
                                                                placeholder={Translation(translations,`${label}`)}
                                                                control="input"
                                                                type={"date"}
                                                              />
                                                            );
                                                          }
                                                        }
                                                        else if (type == "number") {
                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === "true") {
                                                            return (
                                                              <FormControl
                                                                className="form-control my-1"
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations,`${label}`)}
                                                                name={objname}
                                                                placeholder={Translation(translations,`${label}`)}
                                                                control="input"
                                                                type={"number"}
                                                              />
                                                            );
                                                          }
                                                        }
                                                        else if (type == "time") {
                                                          if (leadPermission?.super_admin || leadPermission?.clients?.fields[labelName] === "true") {
                                                            return (
                                                              <FormControl
                                                                className="form-control my-1"
                                                                required={field_required == "yes" && true}
                                                                label={Translation(translations,`${label}`)}
                                                                name={objname}
                                                                placeholder={Translation(translations,`${label}`)}
                                                                control="input"
                                                                type={"time"}
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
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </MDBTabsPane>
                                );
                              }
                            )}
                          </MDBTabsContent>
                        </div>
                      ) : ("")
                      }
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="text-right col-md-12 mt-4 mb-2">
            <SubmitButton
              props={submitbutton}
              buttonLoading={res.isLoading}
            />
          </div>

        </Form>
      </Formik>
    </div>
  );
}

export default CreateClient;