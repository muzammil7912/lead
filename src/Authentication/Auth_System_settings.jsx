import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import allData from "../Data/data";
import { Formik } from "formik";
import { Field, Form } from "formik";
import useFetch from "../customHooks/useFetch";
import FormControl from "../components/form/FormControl";
import usePost from "../customHooks/usePost";
import Loader from "../components/common/Loading";
import File2 from "../components/form/File2";
import axios from "axios";
import config from "../services/config.json";
import { toast } from "react-toastify";
import { getTokenSession } from "../utils/common";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import DropdownLanguage from "../components/form/DropdownLanguage";
import { MainTranslationContext } from '../context/MainTranslationContext';
import Dropdown5 from "../components/form/Dropdown5";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";

function Auth_System_settings() {
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { addsetPermissions } = useContext(MainAuthPermissionsContext)

  useEffect(() => {
    if (leadPermission) {
      addHeading(`System Setting`);
      if ((leadPermission?.user_module?.fields?.usrs_system_settings === "0" || leadPermission?.user_module?.active_module === "0")) {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  const [languages, setLanguages] = useState("");
  const { transData } = useContext(MainTranslationContext);

  const [TimeZone, setTimeZone] = useState();
  const { data: timeZone, loading4 } = useFetch("", "getListTimeZone");
  const [res, apiMethodres] = usePost();
  const [resstid, apiMethodsid] = usePost();

  const navigate = useNavigate();
  const [resop, apiMethodop] = usePost();
  const [pipeline1, setpipeline1] = useState();
  const [image, setimage] = useState("");
  const [image1, setimage1] = useState("");
  const [arryOfValue, setArryOfValue] = useState([]);
  const [image3, setimage3] = useState("");
  const [mpipeline, setmpipeline] = useState();


  const handleSelectChange = (event) => {
    const options = event.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setArryOfValue(values);
  }

  const [id, setid] = useState();
  const [stages1, setstages1] = useState();
  const [proirity1, setpriority1] = useState();
  const [leadsource1, setleadsource1] = useState();
  const [leadMedium1, setleadMedium1] = useState();
  const [pipeid, setpipeid] = useState();
  const [stageval, setstageval] = useState();
  const [favicon, setfavicon] = useState("");
  const [resMedium, apiMethodMedium] = usePost();
  const { data: generalsettingData, loading } = useFetch("", "getAllViewGeneralSystemSettings");

  useEffect(() => {
    const data = generalsettingData
    if (data) {
      if (!data?.message) {
        setimage(`${config.baseurl2}${data["system-avatar-image"]?.setting_value}`)
        setimage1(`${config.baseurl2}${data["system-default-avatar-image"]?.setting_value}`)
        setfavicon(`${config.baseurl2}${data["system-favicon-image"]?.setting_value}`)
        setFileName(data["system-favicon-image"]?.setting_value.split('/').pop())
      }
    }
  }, [generalsettingData]);
  const [fileName, setFileName] = useState("");
  const { data: meetingData, loading2 } = useFetch("", "getAllViewMeetingAppointmentSystemSettings");
  const { data: socialdata, loading3 } = useFetch("", "getAllViewSocialLinksSystemSettings");
  const { data: localdata, loading5 } = useFetch("", "getAllViewLocalizationSystemSettings");
  useEffect(() => {
    if (localdata) {
      if (!localdata?.message) {
        setLanguages(localdata[`system-language`]?.setting_value ? localdata[`system-language`]?.setting_value : "31");
        setTimeZone(localdata[`system-user_timezone`]?.setting_value ?? "America/Nassau");
      }

    }
  }, [localdata]);
  function handleFileInputChange(e) {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile.name);
    setfavicon(selectedFile);
  }
  const { data: contactdata, loading6 } = useFetch("", `getAllViewContactStageSystemSettings`);
  useEffect(() => {
    if (contactdata) {
      !contactdata.message && setArryOfValue(JSON.parse(contactdata?.stage.setting_value));
    }
  }, [contactdata]);




  const handleChange = (value) => {
    setpipeline1(value);
    let formdata = new FormData();
    formdata.append("pipeline_id", value);
    formdata.append("event_type", "meeting");
    apiMethodop("postViewEventsPiplinesStages", formdata);
    setmpipeline(value);
    setstages1('')
  };

  useEffect(() => {
    if (meetingData) {
      if (!meetingData.message) {
        handleChange(meetingData?.meetingAppointment?.['system-mpipeline']?.setting_value);
        setimage3(`${meetingData?.meetingAppointment?.system_mlogo?.setting_value}`);
        setstages1(meetingData?.meetingAppointment?.['system-mstages']?.setting_value);
        setpriority1(meetingData?.meetingAppointment?.['system-mpriority']?.setting_value);
        setleadsource1(meetingData?.meetingAppointment?.['system-mleadsource']?.setting_value);
        setleadMedium1(meetingData?.meetingAppointment?.['system-mleadmedium']?.setting_value);
        let formdata = new FormData();
        formdata.append("id", meetingData?.meetingAppointment?.['system-mleadsource']?.setting_value);
        apiMethodMedium("postMediumByID",formdata)
        setpipeline1(meetingData?.meetingAppointment?.['system-mpipeline']?.setting_value);
      }
    }
  }, [meetingData]);



  useEffect(() => {
    if (pipeid) {
      let formdata = new FormData();
      formdata.append("stage_id", stages1);
      formdata.append("pipeline_id", pipeid);
      formdata.append("event_type", "meeting");
      apiMethodsid("postEditEventsPipelinesStages", formdata);
    }
  }, [pipeid]);

  useEffect(() => {
    if (resstid.data) {
      if (!resstid.data.message) {

        setstageval(resstid.data?.stagesDataa[0]?.id);
      }
    }
  }, [resstid.data]);

  const [justifyActive, setJustifyActive] = useState("tab1");
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const { data: registerdata } = useFetch("", "getAllViewContactStageSettings");

  const handleSubmit = (values) => {
    let formData = new FormData();
    delete values[`system-favicon-image`]
    delete values[`system-default-avatar-image`]
    delete values[`system-avatar-image`]
    for (let item in values) {
      formData.append(`generalsetting[${item}]`, values[item]);
    }
    formData.append("avatar", image);
    formData.append("system_default_avatar", image1);
    formData.append("fav-icon", favicon);
    formData.append("general_settings", "general_settings");
    apiMethodres("postCreateGeneralSettings", formData);
  };

  const handleSubmit2 = (value) => {
    let formData1 = new FormData();
    for (let item in value) {
      formData1.append(`socialsetting[${item}]`, value[item]);
    }
    formData1.append("social_settings", "social_settings");
    apiMethodres("postCreatesocialsetting", formData1);
  };
  const handleSubmit3 = () => {
    let formData2 = new FormData();
    formData2.append(`localization[system-language]`, languages);
    formData2.append(`localization[system-user_timezone]`, TimeZone);
    formData2.append("localization_settings", "localization_settings");
    apiMethodres("postCreatelocalizationsettings", formData2);
  };




  const handleSubmit4 = (e) => {
    e.preventDefault()
    let formData3 = new FormData();
    if (arryOfValue) {
      arryOfValue.map(item => {
        formData3.append(`contact_stage[stage][]`, item);
      })
      formData3.append(`contact_stage_settings`, "contact_stage_settings");
      apiMethodres("postCreateContactStageSettings", formData3);
    }
  };

  const handleSubmit5 = (e) => {
    e.preventDefault()
    let formdata = new FormData();
    formdata.append(`msettings[mpipeline]`, mpipeline);
    formdata.append(`msettings[mstages]`, stages1);
    formdata.append(`msettings[mpriority]`, proirity1);
    formdata.append(`msettings[mleadsource]`, leadsource1);
    formdata.append(`msettings[mleadmedium]`, leadMedium1);
    formdata.append("meeting_settings", "meeting_settings");
    formdata.append("system_mlogo", image3);
    apiMethodres("postCreateMeetingAppointment", formdata);
  };

  useEffect(() => {
    if (res.data) {
      res?.data?.message && toast.success(res?.data?.message);
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios.get(`${config.apiEndPoint}getAuthTokenInfo`)
        .then((response) => {
          addsetPermissions(response.data)
          // setloadingg(false);
        })
        .catch((err) => {
          console.log("eerr", err);
        });
    }
  }, [res.data])

  if (!generalsettingData || !meetingData || !socialdata || !localdata || loading5 || loading6) return <Loader />;
  const options = [];
  meetingData.PipelinesData.map((item) => {
    options.push({
      value: item?.db_id,
      label: item?.pipeline_title,
    });
  });
  const handleChange3 = (e) => {
    setpriority1(e.target.value);
  };
  const handleChange4 = (e) => {
    setleadsource1(e.target.value);
    let formdata = new FormData();
    formdata.append("id", e.target.value);
    apiMethodMedium("postMediumByID",formdata)
  };
  const options1 = [];

  if (resop.data) {
    Array.isArray(resop.data) && resop.data.map((item) => {
      options1.push({
        value: item?.id,
        label: item?.name,
      });
    });
  }

  let initialValues = {}
  if (generalsettingData.message) {

  }
  else {
    for (let index in generalsettingData) {
      initialValues[index] = generalsettingData[index].setting_value;
    }
  }
  let initialValues2 = {};
  if (!socialdata?.message && socialdata) {
    for (let index in socialdata) {
      initialValues2[index] = socialdata[index].setting_value;
    }
  }

  let initialValues3 = {
    "system-user_timezone": `${localdata[`system-user_timezone`]?.setting_value}`,
  };
  let arr =
    Array.isArray(registerdata) &&
    registerdata.map((value, i) => {
      return {
        value: value.id,
        label: value.name,
      };
    });

  return (
    <div className="section-body mt-3 soc_sty">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <MDBTabs justify className="mb-2">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleJustifyClick("tab1")}
                  active={justifyActive === "tab1"} > General   Settings </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleJustifyClick("tab2")}
                  active={justifyActive === "tab2"}
                >
                 Social Links
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleJustifyClick("tab3")}
                  active={justifyActive === "tab3"}
                >
                  Localization
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleJustifyClick("tab4")}
                  active={justifyActive === "tab4"}
                >
                  {/* {Translation(translation, "Contact Stage")} */}Contact
                  Stage
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleJustifyClick("tab5")}
                  active={justifyActive === "tab5"}
                >
                  {/* {Translation(translation, "Meeting Appointment")} */}
                  Meeting Appointment
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </div>
          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === "tab1"}>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="form mt-5">
                  <div className="row">
                    <div className="col-md-6 p-2">
                      <div className="profiMain mb-4">
                        <File2
                          value={image}
                          onUpload={setimage}
                          name={"ava"}
                          brand="System Avatar Image"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 p-2">
                      <div className="profiMain mb-4">
                        <File2
                          brand="Lead & Prospect Default Avatar"
                          value={image1}
                          onUpload={setimage1}
                          name={"ava1"}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="form-group">
                        <label className="form-label">
                          Title of the system
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="system-title-system"
                          placeholder="Title of the system"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="form-label">Favicon</label>
                        <div className="file-input-wrapper newww">


                          <input className="inputfile" type="file" onChange={handleFileInputChange} />
                          {fileName && <label className="b2">
                            {fileName && fileName}

                          </label>}

                        </div>
                      </div>

                    </div>
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Default Address</h3>
                        </div>
                        <div className="card-body">
                          <div className="row clearfix">
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-group">
                                <label>Street Address</label>
                                <Field
                                  required=""
                                  type="text"
                                  className="form-control"
                                  name="system-default-street-address"
                                  placeholder="Street Address"
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-group">
                                <label>City</label>
                                <Field
                                  required=""
                                  type="text"
                                  className="form-control"
                                  name="system-city"
                                  placeholder="City"
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-group">
                                <label>State</label>
                                <div className="">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="system-state"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-group">
                                <label>Country</label>
                                <div className="">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="system-country"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-group">
                                <label>Postal Code</label>
                                <div className="">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="system-postal-code"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mt-3">
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Footer Settings</h3>
                        </div>
                        <div className="card-body">
                          <div className="row clearfix">
                            <div className="mt-1 col-md-12">
                              <h6 className="">Text</h6>
                              <hr className="mt-0" />
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                              <div className="form-group">
                                <label>Footer Text</label>
                                <div className="">
                                  <FormControl
                                    className="form-control"
                                    name="footer-text"
                                    control="textarea"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 col-md-12">
                              <h6 className="">Links</h6>
                              <hr className="mt-0" />
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Link 1 Title</label>
                                <div className="">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="footer-link1-title"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Link 1 URL</label>
                                <div className="">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="footer-link1-url"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Open Link 1 to:</label>
                                <div className="">
                                  <FormControl
                                    className="form-control my-1"
                                    selectList={[
                                      {
                                        label: "Same Page/Tab",
                                        value: "1",
                                      },
                                      {
                                        label: "New Page/Tab",
                                        value: "0",
                                      },
                                    ]}
                                    name="footer-link1-open"
                                    control="select"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Link 1 Status</label>
                                <div className="">
                                  <FormControl
                                    className="form-control my-1"
                                    selectList={allData.registerPage.Status}
                                    name="footer-link1-status"
                                    control="select"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 col-12" />
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Link 2 Title</label>
                                <div className="">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="footer-link2-title"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Link 2 URL</label>
                                <div className="">
                                  <Field
                                    type="text"
                                    className="form-control"
                                    name="footer-link2-url"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Open Link 2 to:</label>
                                <div className="">
                                  <FormControl
                                    className="form-control my-1"
                                    selectList={[
                                      {
                                        label: "Same Page/Tab",
                                        value: "1",
                                      },
                                      {
                                        label: "New Page/Tab",
                                        value: "0",
                                      },
                                    ]}
                                    name="footer-link2-open"
                                    control="select"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="form-group">
                                <label>Link 2 Status</label>
                                <div className="">
                                  <FormControl
                                    className="form-control my-1"
                                    selectList={allData.registerPage.Status}
                                    name="footer-link2-status"
                                    control="select"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary mt-2" type="submit">
                    Update & Save
                  </button>
                </Form>
              </Formik>
            </MDBTabsPane>
            <MDBTabsPane show={justifyActive === "tab2"}>
              <div
                className="tab-pane fade active show"
                id="link_2"
                role="tabpanel"
                aria-labelledby="link_2"
              >
                <ul className="list social__icon my-4">
                  <li>
                    <a className="facebook" target={"_blank"} href={initialValues2["system-facebook"]}>
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a className="instagram" target={"_blank"} href={initialValues2["system-instagram"]}>
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href={initialValues2["system-twitter"]}>
                      <i className="fa-brands fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a className="linkedin" href={initialValues2["system-linkedin"]}>
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a className="youtube" href={initialValues2["system-youtube"]}>
                      <i className="fa-brands fa-youtube" />
                    </a>
                  </li>
                  <li>
                    <a className="tiktok" href={initialValues2["system-tiktok"]}>
                      <i className="fa-brands fa-tiktok" />
                    </a>
                  </li>
                  <li>
                    <a className="telegram" href={initialValues2["system-telegram"]}>
                      <i className="fa-brands fa-telegram" />
                    </a>
                  </li>
                  <li>
                    <a className="snapchat" href={initialValues2["system-snapchat"]}>
                      <i className="fa-brands fa-snapchat" />
                    </a>
                  </li>
                  <li>
                    <a className="discord" href={initialValues2["system-discord"]}>
                      <i className="fa-brands fa-discord" />
                    </a>
                  </li>
                  <li>
                    <a className="pinterest" href={initialValues2["system-pinterest"]}>
                      <i className="fa-brands fa-pinterest-p" />
                    </a>
                  </li>
                  <li>
                    <a className="globe" href={initialValues2["system-website"]}>
                      <i className="fa-solid fa-globe" />
                    </a>
                  </li>
                  <li>
                    <a className="whatsapp" href={initialValues2["system-whatsapp"]}>
                      <i className="fa-brands fa-whatsapp" />
                    </a>
                  </li>
                </ul>
                <Formik initialValues={initialValues2} onSubmit={handleSubmit2}>
                  <Form className="social_icon-form">
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Facebook</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-facebook"
                              tabIndex={16}
                              placeholder="facebook.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Instagram</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-instagram"
                              tabIndex={16}
                              placeholder="instagram.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Twitter</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-twitter"
                              tabIndex={16}
                              placeholder="twitter.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Linkedin</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-linkedin"
                              tabIndex={16}
                              placeholder="linkedin.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Youtube</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-youtube"
                              tabIndex={16}
                              placeholder="youtube.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Tiktok</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-tiktok"
                              tabIndex={16}
                              placeholder="tiktok.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Telegram</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-telegram"
                              tabIndex={16}
                              placeholder="telegram.org/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Snapchat</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-snapchat"
                              tabIndex={16}
                              placeholder="snapchat.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Discord</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-discord"
                              tabIndex={16}
                              placeholder="discord.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Pinterest</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-pinterest"
                              tabIndex={16}
                              placeholder="pinterest.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Zillow</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-zillow"
                              tabIndex={16}
                              placeholder="google.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Realtor</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-realtor"
                              tabIndex={16}
                              placeholder="google.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Website</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-website"
                              tabIndex={16}
                              placeholder="google.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label className="form-label">Whatsapp</label>
                          <div className="social_icon-box">
                            <span>https://</span>
                            <Field
                              type="text"
                              className="form-control"
                              name="system-whatsapp"
                              tabIndex={16}
                              placeholder="web.whatsapp.com/"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      name="social_settings"
                    >
                      Update & Save
                    </button>
                  </Form>
                </Formik>
              </div>
            </MDBTabsPane>
            <MDBTabsPane show={justifyActive === "tab3"}>
              <Formik initialValues={initialValues3} onSubmit={handleSubmit3}>
                <Form className="mt-4">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="form-group">
                        <label className="col-form-label">Language</label>
                       {
                        languages &&
                         <DropdownLanguage
                         list={transData}
                         selectedVal={setLanguages}
                         defaultval={languages}
                         />
                        }
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="form-group">
                        <label className="col-form-label">Time Zone</label>
                        <Dropdown5
                          list={timeZone}
                          changes={(value) => setTimeZone(value)}
                          selected={TimeZone}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    name="localization_settings"
                  >
                    Update & Save
                  </button>
                </Form>
              </Formik>
            </MDBTabsPane>
            <MDBTabsPane show={justifyActive === "tab4"}>
              <div
                className="tab-pane fade active show"
                id="link_4"
                role="tabpanel"
                aria-labelledby="link_4"
              >
                <form className="mt-4">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="form-group">
                        <label className="col-form-label">All Stages</label>
                        {registerdata && (
                          <FormControl
                            className="form-control my-1"
                            selectList={arr}
                            name="stage"
                            control="multiselect"
                            value={arryOfValue}
                            onChange={handleSelectChange}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    name="contact_stage_settings"
                    type="submit"
                    onClick={handleSubmit4}
                  >
                    Update & Save
                  </button>
                </form>
              </div>
            </MDBTabsPane>
            <MDBTabsPane show={justifyActive === "tab5"}>
              <div className="container-fuild">
                <div className="card">
                  <div className="card-header">
                    Meeting Appointments Settings
                  </div>
                  <div className="row clearfix px-3">
                    <div className="col-sm-12 col-md-4 col-lg-4">
                      <File2
                        value={typeof image3 !== "object"
                          ? image3?.includes("http")
                            ? image3
                            : `${config.baseurl2}${image3}`
                          : image3
                        }
                        onUpload={setimage3}
                        name={"ava5"}
                        brand="Booking Logo"
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3 mt-4">
                      <div className="form-group">
                        <label>Meeting Pipeline</label>
                        <Dropdown5
                          list={options}
                          changes={handleChange}
                          selected={pipeline1}
                        />
                      </div>
                      <div className="form-group">
                        <label>Stage</label>
                        <Dropdown5
                          list={options1}
                          changes={(value) => setstages1(value)}
                          selected={stages1}
                        />
                      </div>
                      <div className="form-group">
                        <label>Priority</label>
                        <select
                          className="form-control"
                          name="msettings[mpriority]"
                          id="mpriority"
                          value={proirity1}
                          onChange={handleChange3}
                        >
                          <option value="">--Select--</option>
                          {meetingData?.prioritiesData.map((item, i) => {
                            return (
                              <option key={i} value={item.priority_id}>
                                {item.priority_label}
                              </option>
                            );
                          })}

                        </select>
                      </div>
                      <div className="form-group">
                        <label>Lead Source</label>
                        <select
                          className="form-control"
                          name="msettings[mleadsource]"
                          id="mleadsource"
                          value={leadsource1}
                          onChange={handleChange4}
                        >
                          <option value="">--Select--</option>
                          {meetingData?.get_sourcesData.map((item, i) => {
                            return (
                              <option key={i} value={item.source_id}>
                                {item.source_name}
                              </option>
                            );
                          })}

                        </select>
                      </div>
                      <div className="form-group">
                        <label>Lead Medium</label>
                        <select
                          className="form-control"
                          name="msettings[mleadmedium]"
                          id="mleadmedium"
                          value={leadMedium1}
                          onChange={(e) => setleadMedium1(e.target.value)}
                        >
                          <option value="">--Select--</option>
                          {!resMedium.isLoading && resMedium?.data && resMedium?.data?.map((item, i) => {
                            return (
                              <option key={i} value={item.source_id}>
                                {item.source_name}
                              </option>
                            );
                          })}

                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix mt-5 px-3  ">
                    <div className="col-sm-12 col-md-4 col-lg-3">
                      <div className="form-group">
                        <button
                          className="btn btn-primary"
                          name="meeting_settings"
                          onClick={handleSubmit5}
                        >
                          Update & Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </div>
      </div>
    </div>
  );
}

export default Auth_System_settings;