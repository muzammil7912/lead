import React, { useState, useContext, useEffect, useRef } from "react";
import { Translation } from "../components/Translation";
import { BiConversation } from "react-icons/bi";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTokenSession } from "../utils/common";
import axios from "axios";
import { Monthss } from "../components/Month";
import img1 from "../dist/webImages/justcall-logo.webp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import config from "../services/config.json";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { GoFileSymlinkDirectory } from "react-icons/go";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import { StringConvert } from "../components/StringConvert";
import { handleFullScreen, handleToggle, Handle_convert_system_timezone, HandleConvertTimeOnlyDate } from "../components/AllCustomFuntion";
import { FaFolder, FaHandshake, FaListOl, FaRegCalendarAlt } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { MdSummarize } from "react-icons/md";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import dayjs from "dayjs";
import { MainModuleContext } from "../context/MainModuleContext";
import Loader from "../components/common/Loading";
import Media_image_display from "./Media_image_display";
import ActionCard from "../components/common/ActionCard";
import MeetingCard from "../components/common/MeetingCard";
import usePost from "../customHooks/usePost";

import EditLeadCalender from "./EditLeadCalender";
const ViewLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { translations } = useContext(MainTranslationContexts)
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { addModuleCard } = useContext(MainModuleContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const [datas, setDatas] = useState("");
  const [resMedia, apiMethodMedia] = usePost();
  const [resFile, apiMethodFile] = usePost();
  const manageApi = useRef(true)
  const [assetsFile, setAssetsFile] = useState("");
  const [mediaData, setMediaData] = useState('');
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [followers, setfollowers] = useState([]);
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [assetFileMedia, setassetFileMedia] = useState(true)
  const [assetsnotes, setAssetsNotes] = useState("");
  const [actionArr, setactionArr] = useState([{
    id: 1,
    DateValue: '',
    FirstValue: '',
    secValue: '',
    thirdValue: '',

  }])

  const [meetingArr, setmeetingArr] = useState([{
    id: 1,
    DateValue: '',
    FirstValue: '',
    secValue: '',
    thirdValue: '',

  }])
  const [viewLead, setviewLead] = useState()
  const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZone3 = timeZone2.split("/")
  useEffect(() => {
    if (manageApi.current) {
      setDatas("")
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getViewLead/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`)
        .then((response) => {
          setDatas(response.data);
          setviewLead(response.data);
          addModuleCard(response.data)
          response.data.message && navigate(`/${config.ddemoss}leads/Grid`)


        })
        .catch((err) => {
          console.log("eerr", err);
        });
    }
    return () => manageApi.current = false

  }, [id])

  useEffect(() => {
    if (viewLead && !viewLead.message) {
      addHeading(`Lead - ${viewLead.lead_data[0].fullname}`);
      setAssetsFile(viewLead?.filesData);
      setEditLeadFeild(viewLead?.all_fields);
      setAssetsNotes(viewLead?.assets_notes);
      setMediaData(viewLead?.mediaData)

    }
  }, [viewLead]);




  const handleJustifyClick2 = (value) => {
    if (value == justifyActive2) {
      return;
    }
    setJustifyActive2(value);
  };

  const handleJustifyClick4 = (value) => {
    if (value == justifyActive3) {
      return;
    }
    setJustifyActive3(value);
  };

  useEffect(() => {
    if (datas.lead_followers) {
      setfollowers(datas.lead_followers);
    }
  }, [datas]);

  if (viewLead && !viewLead.message) {
    var initialValues = viewLead.lead_data[0];
    initialValues = {
      ...initialValues,
      leadsource: viewLead.lead_data[0].lead_leadsource,
    };
    var imgVal = viewLead?.lead_data[0]?.avatar ? viewLead?.lead_data[0]?.avatar.includes("http") ? viewLead?.lead_data[0]?.avatar : `${config.baseurl2}${viewLead?.lead_data[0]?.avatar}` : permissions["system-default-avatar-image"]?.setting_value ? `${config.baseurl2}${permissions["system-default-avatar-image"]?.setting_value}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160";
  }
  const handleAddActionRow = () => {
    setactionArr([...actionArr, {

      id: actionArr.length + 1,
      DateValue: '',
      FirstValue: '',
      secValue: '',
      thirdValue: '',
      deleteBtn: "delete"


    }])
  }


  const handle_File_more = () => {
    const lendth = assetsFile.data.length
    const data = assetsFile.data[lendth - 1]
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Lead");
    apiMethodFile("postPaginationFilesDataView", formData);
  }


  const handleMoreMediaData = () => {
    const lendth = mediaData.data.length
    const data = mediaData.data[lendth - 1]
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Lead");
    apiMethodMedia("postPaginationMediaDataView", formData);
  }

  useEffect(() => {
    if (resFile.data) {
      let file_arr = resFile.data.data
      file_arr.shift()
      setAssetsFile(
        {
          ...resFile.data,
          data: [...assetsFile.data, ...file_arr],

        }
      )
      // setAssetsFile()
    }
  }, [resFile.data]);

  useEffect(() => {
    if (resMedia.data) {
      let mediaMoreData = resMedia?.data?.data
      mediaMoreData.shift()
      setMediaData({ ...resMedia.data, data: [...mediaData?.data, ...mediaMoreData] })
    }
  }, [resMedia.data])

  const handleRemoveMeetingRow = (item) => {
    setmeetingArr(meetingArr.filter(val => val.id !== item.id))
  }

  if (!datas) return <Loader />


  return (
    initialValues && !initialValues.message && (
      <div className="editLeadForm">
        <div className="container-fluid">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="media">
                    <img
                      className="avatar avatar-xxl mr-5"
                      src={imgVal}
                      alt="avatar"
                    />
                    <div className="media-body">
                      <h5 className="m-0">{initialValues?.fullname}</h5>

                      <div className=" socialBtn">
                        <a href={`mailto:${initialValues?.email}`}>
                          <i className="fa fa-envelope"></i>
                        </a>{" "}
                        &nbsp;
                        <a href={`tel:${initialValues?.number}`}>
                          <i className="fa fa-phone"></i>
                        </a>{" "}
                        &nbsp;
                        <a href={`sms:${initialValues?.number}`}>
                          <i className="fa fa-mobile"></i>
                        </a>{" "}
                        &nbsp;
                        <a href={`https://api.whatsapp.com/send?phone=${initialValues?.number.substring(1)}`}>
                          <i className="fa fa-whatsapp"></i>
                        </a>{" "}
                        &nbsp;
                        <a
                          href={`https://justcall.io/app/macapp/dialpad_app.php?numbers=${initialValues?.number}`}
                        >
                          <img src={`${img1}`} width={15} />{" "}
                        </a>
                      </div>

                      <p>
                        Created by:{" "}
                        {Translation(
                          translations,
                          `${viewLead?.lead_data[0]?.lead_by_name} (${viewLead?.lead_data[0]?.lead_by_role_name})`
                        )}{" "}
                        <br />
                        Assigned to:{" "}
                        {Translation(
                          translations,
                          `${viewLead?.lead_data[0]?.assigned_to_name} (${viewLead?.lead_data[0]?.assigned_to_role_name})`
                        )}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="score">{initialValues?.score_number}</div>
                  <div className="card-options">
                    <div className="columndd">
                      <div>
                        <label className="form-label ">
                          Stage:{" "}
                          {Translation(
                            translations,
                            `${datas.lead_stages &&
                            !datas.lead_stages.message &&
                            datas.lead_data[0].stage_name
                            }`
                          )}
                        </label>{" "}
                      </div>

                      {viewLead &&
                        `${datas.lead_stages &&
                        !datas.lead_stages.message &&
                        viewLead.lead_data[0].wonlost
                        }` === "lost" && (
                          <div>
                            <label className="form-label">
                              {datas.lead_data[0].stage_name} Reason:
                              <br />
                              {Array.isArray(viewLead.lostStage) &&
                                viewLead.lostStage[0].reason_description}
                            </label>
                          </div>
                        )}
                    </div>
                    <div className="item-action dropdown ml-2">
                      <a data-toggle="dropdown" aria-expanded="false">
                        <i className="fe fe-more-vertical"></i>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item">
                          <i className="dropdown-icon fa fa-share-alt"></i> Edit
                        </a>
                        <Link className="dropdown-item">
                          <i className="dropdown-icon fa fa-cloud-download"></i>{" "}
                          Assign To
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item">
                          <i className="dropdown-icon fa fa-copy"></i>Create
                          Action
                        </Link>
                        <Link className="dropdown-item">
                          <i className="dropdown-icon fa fa-folder"></i>Create
                          Opportunity
                        </Link>
                        <Link className="dropdown-item">
                          <i className="dropdown-icon fa fa-edit"></i>Create
                          Meeting
                        </Link>
                        <Link className="dropdown-item">
                          <i className="dropdown-icon fa fa-trash"></i>Create
                          Project
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card card-collapsed">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <div className="card-title">
                    <MdSummarize />
                    Summary
                    <small>Lead Details</small>
                  </div>
                  <div className="card-options">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      data-toggle="card-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body justify-content-center">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-status bg-blue"></div>
                        <div className="card-header">
                          <h3 className="card-title">Basic Information</h3>
                          <div className="card-options">
                            <Link
                              className="card-options-collapse"
                              onClick={(e) => handleToggle(e)}
                              data-toggle="card-collapse"
                            >
                              <i className="fe fe-chevron-down"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row ">
                            <div className="col-md-6">
                              {leadPermission?.super_admin ||
                                leadPermission?.leads?.fields?.leads_fname ===
                                "true" ||
                                leadPermission?.leads?.fields?.leads_fname ===
                                "-1" ? (
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "First Name")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas.lead_data[0].fname}`
                                  )}{" "}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields?.leads_lname ===
                              "true" ||
                              leadPermission?.leads?.fields?.leads_lname ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Last Name")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas.lead_data[0].lname}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_contact_type === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_contact_type === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(
                                      translations,
                                      "Type of Contact"
                                    )}
                                  </label>
                                  <p className="mb-0">
                                    {Translation(
                                      translations,
                                      `${datas?.lead_data[0]?.type_name}`
                                    )}
                                  </p>{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_phone_number === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_phone_number === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Phone Number")}
                                  </label>
                                  {datas?.lead_data[0]?.number}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields?.leads_lead_stage ===
                              "true" ||
                              leadPermission?.leads?.fields?.leads_lead_stage ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Lead Stage")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas.lead_stages &&
                                    !datas.lead_stages.message &&
                                    datas.lead_stages.filter((item) => item.id ==  datas?.lead_data[0]?.lead_stage)[0]?.name}`
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                                         {
                                         `${datas.lead_stages &&
                                          !datas.lead_stages.message &&
                                          viewLead.lead_data[0].wonlost
                                          }` === "lost" &&
                                         
                                         leadPermission?.super_admin ||
                              leadPermission?.leads?.fields?.leads_lead_stage ===
                              "true" ||
                              leadPermission?.leads?.fields?.leads_lead_stage ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, `${datas.lead_stages &&
                            !datas.lead_stages.message &&
                            datas.lead_data[0].stage_name} Reason`)}
                                  </label>
                                  {Translation(
                                    translations,
                                     (
                                        <div>
                                          <label className="form-label">
                                            {Array.isArray(viewLead.lostStage) &&
                                              viewLead.lostStage[0].reason_description}
                                          </label>
                                        </div>
                                      )
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields?.leads_email ===
                              "true" ||
                              leadPermission?.leads?.fields?.leads_email ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "E-mail")}
                                  </label>
                                  {datas?.lead_data[0]?.email}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_email_status === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_email_status === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Email status")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas?.lead_data[0]?.email_status}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_score_number === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_score_number === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Score Number")}
                                  </label>
                                  {datas?.lead_data[0]?.score_number}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_mobile_phone === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_mobile_phone === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Mobile Phone")}
                                  </label>
                                  {datas?.lead_data[0]?.mobile_phone}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields?.leads_birthday ===
                              "true" ||
                              leadPermission?.leads?.fields?.leads_birthday ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Birthday")}
                                  </label>
                                  {datas?.lead_data[0]?.birthday}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_created_date === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_created_date === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Created date")}
                                  </label>

                                  {datas?.lead_data[0]?.created_date != "" ?
                                    <Handle_convert_system_timezone
                                      dateAndTime={datas?.lead_data[0]?.created_date}
                                    /> : ""
                                  }
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_updated_date === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_updated_date === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Updated date")}
                                  </label>
                                  {datas?.lead_data[0]?.updated_date != "" ?
                                    <Handle_convert_system_timezone
                                      dateAndTime={datas?.lead_data[0]?.updated_date}
                                    /> : ""
                                  }
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card leadCards">
                        <div className="card-header">
                          <h3 className="card-title">
                            {Translation(translations, "Location")}
                          </h3>
                          <div className="card-options">
                            <Link
                              className="card-options-collapse"
                              onClick={(e) => handleToggle(e)}
                              data-toggle="card-collapse"
                            >
                              <i className="fe fe-chevron-down"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_address1 === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_address1 === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Address 1")}
                                </label>
                                {datas?.lead_data[0]?.address_one}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_address2 === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_address2 === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Address 2")}
                                </label>
                                {datas?.lead_data[0]?.address_two}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_city === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_city === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "City")}
                                </label>
                                {datas?.lead_data[0]?.city}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_postal_code === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_postal_code === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Postal/ZIP Code")}
                                </label>
                                {datas?.lead_data[0]?.zip}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_state === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_state === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "State")}
                                </label>
                                {datas?.lead_data[0]?.state}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_country === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_country === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Country")}
                                </label>
                                {datas?.lead_data[0]?.country}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_ipaddress === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_ipaddress === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "IP Address")}
                                </label>
                                {datas?.lead_data[0]?.ip_address}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_time_zone === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_time_zone === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Time Zone")}
                                </label>
                                {Translation(
                                  translations,
                                  `${datas?.lead_data[0]?.time_zone}`
                                )}{" "}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_locale === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_locale === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Locale")}
                                </label>
                                {datas?.lead_data[0]?.locale}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_sourcepage === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_sourcepage === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Source Page")}
                                </label>
                                {datas?.lead_data[0]?.lead_sourcepage}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_lead_source === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_lead_source === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Lead Source")}
                                </label>
                                {datas?.lead_data[0]?.leadsource_name}
                              </div>
                            </div> : ''}
                            {leadPermission?.super_admin ||
                              leadPermission?.leads?.fields
                                ?.leads_lead_medium === "true" ||
                              leadPermission?.leads?.fields
                                ?.leads_lead_medium === "-1" ? <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Lead Medium")}
                                </label>
                                {datas?.lead_data[0]?.leadmedium_name}
                              </div>
                            </div> : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-users text-muted"></i> Overview
                    <small>More Details</small>
                  </h3>
                  <div className="card-options">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card_">
                    <div className="section-body_">
                      <div className="container-fuild">
                        <div className="d-lg-flex justify-content-between">
                          <MDBTabs
                            justify
                            className="py-1 px-4 nav d-flex nav-tabs page-header-tab"
                          >
                            {Object.keys(editLeadFeild).map((item, index) => {
                              return (
                                <MDBTabsItem key={index}>
                                  <MDBTabsLink
                                    onClick={() =>
                                      handleJustifyClick2(`tab2${index}`)
                                    }
                                    active={justifyActive2 === `tab2${index}`}
                                  >
                                    {item.replaceAll('_', ' ')}
                                  </MDBTabsLink>
                                </MDBTabsItem>
                              );
                            })}
                          </MDBTabs>
                        </div>
                      </div>
                    </div>
                    {/* close section-body */}
                    <div className="section-body">
                      <div className="container-fuild">
                        <div className="row clearfix">
                          <div className="col-md-12">
                            {datas.all_fields && !datas.all_fields.message ? (
                              <div className="innerNav">
                                <MDBTabsContent>
                                  {Object.keys(datas.all_fields).map(function (
                                    item,
                                    i
                                  ) {
                                    return (
                                      <MDBTabsPane
                                        key={i}
                                        show={justifyActive2 === `tab2${i}`}
                                      >
                                        <div className="card">
                                          <div className="card-body">
                                            {Object.keys(
                                              datas.all_fields[item]
                                            ).map((item1, index) => {

                                              return (
                                                <div key={index}>
                                                  <h3 className="card-title mb-3">
                                                    {Translation(
                                                      translations,
                                                      item1.replace(/_/g, " ")
                                                    )}
                                                  </h3>
                                                  {Object.keys(datas.all_fields[item][item1]).map((item2, index2) => {
                                                    let labelName = `leads_${datas.all_fields[item][item1][item2]?.label.replaceAll(' ', '_')}`
                                                    return (
                                                      (leadPermission?.super_admin || leadPermission?.leads?.fields[labelName] === 'true' || leadPermission?.leads?.fields[labelName] === '-1') && datas.all_fields[item][item1][item2].value && (
                                                        <div key={index2} className="col-md-6" >
                                                          <div className="form-group">
                                                            <label className="form-label">
                                                              {Translation(translations, datas?.all_fields[item][item1][item2]?.label)}
                                                            </label>
                                                            {Translation(translations, datas?.all_fields[item][item1][item2]?.value
                                                            )}
                                                          </div>
                                                        </div>
                                                      )
                                                    );
                                                  })}
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </MDBTabsPane>
                                    );
                                  })}
                                </MDBTabsContent>
                              </div>
                            ) : (
                              <Skeleton count={5} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-sticky-note text-muted"></i> Notes{" "}
                    <small>Notes About the Meeting</small>
                  </h3>

                  <div className="card-options align-item-center">
                    <button
                      type="button"
                      className="btn btn-icon btn-primary btn-success"
                    >
                      <i className="fe fe-lock"></i>
                    </button>
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>

                {leadPermission?.super_admin ||
                  leadPermission?.leads?.fields?.leads_notes ===
                  "true" ||
                  leadPermission?.leads?.fields?.leads_notes ===
                  "-1" ?
                  <div className="card-body">
                    {assetsnotes.length &&
                      assetsnotes?.map((item, index) => {
                        return (
                          <div className="summernote" key={index}>

                            <div className="card blog_single_post">
                              {item.note_privacy === "1" && <div className="text-left"> <span className="tag tag-danger">Private Note</span> </div>
                              }
                              <div className="card-body">

                                <p dangerouslySetInnerHTML={{ __html: item.note_value }}></p>
                              </div>
                              <div className="card-footer p-2">
                                <div className="clearfix">
                                  <div className="float-left"><strong> <Handle_convert_system_timezone
                                    dateAndTime={item.note_date}
                                  /></strong></div>
                                  <div className="float-right">Posted By <small className="text-muted">{`${item?.f_name}  ${item?.l_name}  ${item?.email}`}</small></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div> : ''}
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <FaListOl /> Projects (#)
                    <small>Working For Them</small>
                  </h3>

                  <div className="card-options align-item-center">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>

                <div className="card-body">Projects List</div>
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <BiConversation /> Conversations

                  </h3>

                  <div className="card-options align-item-center">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>

                <div className="card-body">Web hook to load content in future</div>
              </div>

              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <GoFileSymlinkDirectory /> Files
                    <small>Try to upload file larger than 1 GB</small>
                  </h3>

                  <div className="card-options align-item-center">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row clearfix">
                  </div>
                  {!assetsFile ? (
                    <Skeleton count={5} />
                  ) : assetsFile.message !== "No Data Found" ? (
                    <div className="table-responsive">
                      <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0 ">
                        {assetFileMedia && <thead>
                          <tr>
                            <th> </th>
                            <th>
                              {Translation(translations, "Name")}
                            </th>
                            <th>
                              {Translation(translations, "Share With"
                              )}
                            </th>
                            <th>
                              {Translation(
                                translations,
                                "Owner"
                              )}
                            </th>
                            <th>
                              {Translation(
                                translations,
                                "Last Update"
                              )}
                            </th>
                            <th>
                              {Translation(
                                translations,
                                "File Size"
                              )}
                            </th>
                          </tr>
                        </thead>}
                        <tbody>
                          {Array.isArray(assetsFile?.data) && assetsFile?.data?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="width45">
                                  <i className="fa fa-file-excel-o text-success"></i>
                                </td>
                                <td>
                                  <span className="folder-name">
                                    <a
                                      href={item.file_value}
                                      download={item.file_name}
                                    >
                                      {Translation(
                                        translations,
                                        `${item.file_name}`
                                      )}
                                    </a>
                                  </span>
                                </td>
                                <td>
                                  {Translation(
                                    translations,
                                    `${item.file_name}`
                                  )}
                                </td>
                                <td className="width100">
                                  <span>
                                    {" "}
                                    {Translation(
                                      translations,
                                      `${item.file_owner}`
                                    )}{" "}
                                  </span>
                                </td>
                                <td className="width100">
                                  <span>
                                    {" "}
                                    {Monthss(
                                      item.file_updated_date
                                    )}{" "}
                                    {Translation(
                                      translations,
                                      "23, 2023"
                                    )}{" "}
                                  </span>
                                </td>
                                <td className="width100 text-center">
                                  <span className="size">
                                    {Translation(
                                      translations,
                                      `${item.file_size}`
                                    )}{" "}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                          {
                            <tr>
                              {(Array.isArray(assetsFile?.data) && assetsFile?.has_more_data) &&
                                <button type="button" className="btn btn-primary" onClick={handle_File_more}>Load More</button>}
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    " No Data"
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-tag text-muted"></i> Tags
                    <small> </small>
                  </h3>

                  <div className="card-options align-item-center">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      {leadPermission?.super_admin ||
                        leadPermission?.leads?.fields
                          ?.leads_tags === "true" ||
                        leadPermission?.leads?.fields
                          ?.leads_tags === "-1" ? <div className="form-group">
                        {datas?.lead_data[0]?.tags}
                      </div> : ''}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title" >
                    {Translation(translations, "Correlations")}{" "}
                  </h3>

                  <div className="card-options align-item-center">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body p-2">
                  <ul className="right_chat list-unstyled p-0">
                    {datas.correlations &&
                      datas.correlations.map((item, index) => {
                        return (
                          <li key={index} className="online mb-2">
                            <Link to={item.module && `/${config.ddemoss}${item.module.toLowerCase()}/view/${item.correlation_lead_user}`}>
                              <div className="media">
                                <img
                                  className="media-object "
                                  src={item?.avatar}
                                  alt=""
                                />
                                <div className="media-body">
                                  <span className="name">
                                    {Translation(translations, item?.corr_title)}
                                  </span>
                                  <span className="message">
                                    {Translation(translations, item?.leaduser)}
                                  </span>
                                  <span className="badge badge-outline status" />
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    {datas.correlation_lead_user &&
                      datas.correlation_lead_user.map((item, index) => {
                        return (
                          <li key={index} className="online mb-2">
                            <Link to={item.module && `/${config.ddemoss}${item.module.toLowerCase()}/view/${item.lead_id}`}>
                              <div className="media">
                                <img
                                  className="media-object "
                                  src={item?.avatar}
                                  alt=""
                                />
                                <div className="media-body">
                                  <span className="name">
                                    {Translation(translations, item?.corr_title)}
                                  </span>
                                  <span className="message">
                                    {Translation(translations, item?.leaduser)}
                                  </span>
                                  <span className="badge badge-outline status" />
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">
                    {Translation(translations, "Followers")}
                  </h3>
                  <div className="card-options align-item-center">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body p-2">
                  <div>
                    <div className="chips">
                      {Array.isArray(followers) &&
                        followers.map((item, index) => {
                          return (
                            (
                              <div key={index} className="chip">
                                <span
                                  className="avatar"
                                  style={{ backgroundImage: `url(${item?.avatar.includes(`http`) ? item?.avatar : `${config.baseurl2}${item?.avatar}`})` }}
                                />
                                <div className="d-flex align-item-center">
                                  <span>
                                    {Translation(
                                      translations,
                                      item?.uname
                                    )}
                                  </span>

                                </div>
                              </div>
                            )
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <FaRegCalendarAlt /> Calendar
                    <small>Detail Over Time { (Array.isArray(datas.clanderEventsName)&&(datas.clanderEventsName).length>0)? (datas.clanderEventsName.filter(eve=>eve.calendar_default==="1")[0])?`( ${( datas.clanderEventsName.filter(eve=>eve.calendar_default==="1"))[0].calendar_name} )`:"":""}</small>
                  </h3>

                  <div className="card-options">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <EditLeadCalender view={true} module={"lead"} idd={id} data={datas?.clanderEventsData} />
                </div>
              </div>
              {Array.isArray(datas?.lead_data[0]?.opportunity) && <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-users text-muted"></i> Opportunities
                    <small>Let's do business</small>
                  </h3>

                  <div className="card-options">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body justify-content-center">
                  <ul className="right_chat list-unstyled p-0">
                    <li className="online mb-2">
                      <Link>
                        <div className="media">
                          <div className="media-object cust-media-object">
                            <i className="fa-solid fa-house fa-lg"></i>
                          </div>

                          <div className="media-body">
                            <span className="name">Opp Teste 1</span>
                            <span className="message">1000</span>
                            <span className="message"> &nbsp; | &nbsp;</span>
                            <span className="message">Lost</span>
                            <span className="message"> &nbsp; | &nbsp;</span>
                            <span className="message">12-May-2023</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>}
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <BsFillBookmarkFill />{" "}
                    Actions <small> </small>
                  </h3>

                  <div className="card-options">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    {Array.isArray(datas?.actionEventsData) &&
                      <ActionCard
                        lists={datas?.actionEventsData}
                        actionData={datas}
                        editRemove={true}
                        datasAction={datas?.lead_data[0]}
                      />}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <FaHandshake />{" "}
                    Meetings <small> </small>
                  </h3>

                  <div className="card-options">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  {Array.isArray(datas?.meetingEventsData) &&
                    <MeetingCard
                      lists={datas?.meetingEventsData}
                      actionData={datas}
                      editRemove={true}
                      datasMeeting={datas?.lead_data[0]}
                    />}
                </div>
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <FaFolder />
                    Media <small> </small>
                  </h3>

                  <div className="card-options">
                    <Link
                      className="card-options-collapse"
                      onClick={(e) => handleToggle(e)}
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-down"></i>
                    </Link>
                    <Link
                      className="card-options-fullscreen"
                      onClick={(e) => handleFullScreen(e)}
                      data-toggle="card-fullscreen"
                    >
                      <i className="fe fe-maximize"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {Array.isArray(mediaData?.data) && mediaData?.data?.map(items => {
                      return (
                        <div
                          style={{ width: 250, margin: 12 }}
                          key={items?.db_file_id}
                        >
                          <div className="card card__media p-1 card-custom">
                            <Media_image_display data={items}>
                              <img
                                className="media_image_height"
                                src={
                                  items.file_value &&
                                    items.file_value.includes("http")
                                    ? items.file_value
                                    : `${config.baseurl2}${items.file_value} `
                                }
                                alt=""
                              />
                            </Media_image_display>
                            <div className="d-flex align-items-center px-2 mt-3">
                              <img style={{ width: 50, height: 50, borderRadius: 25, marginRight: "10px" }}
                                src={
                                  items?.fileOwnerData[0]?.avatar &&
                                    items?.fileOwnerData[0]?.avatar.includes("http")
                                    ? items?.fileOwnerData[0]?.avatar
                                    : `${config.baseurl2}${items?.fileOwnerData[0]?.avatar} `
                                }
                                alt=""
                              />
                              <div>
                                <div>
                                  {" "}
                                  {Translation(
                                    translations,
                                    `${items?.fileOwnerData[0]
                                      ?.f_name +
                                    " " +
                                    items?.fileOwnerData[0]
                                      ?.l_name
                                    }`
                                  )}
                                </div>
                                <small className="d-block text-muted">
                                  {Translation(
                                    translations,
                                    `${items?.fileCreatedDate}`
                                  )}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  </div>
                  {
                    (Array.isArray(mediaData?.data) && mediaData?.has_more_data) &&
                    <button type="button" className="btn btn-primary w-100" onClick={handleMoreMediaData}>Load More</button>
                  }
                </div>
              </div>
              {(leadPermission?.super_admin ||
                leadPermission?.leads?.fields.leads_admininfo === "true") &&
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <CiLock /> Admin
                      <small>Admin &amp; Timeline</small>
                    </h3>

                    <div className="card-options">
                      <Link
                        className="card-options-collapse"
                        onClick={(e) => handleToggle(e)}
                        data-toggle="card-collapse"
                      >
                        <i className="fe fe-chevron-down"></i>
                      </Link>
                      <Link
                        className="card-options-fullscreen"
                        onClick={(e) => handleFullScreen(e)}
                        data-toggle="card-fullscreen"
                      >
                        <i className="fe fe-maximize"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <MDBTabs className="page-header-tab">
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => handleJustifyClick4(`tab1`)}
                          active={justifyActive3 === "tab1"}
                        >
                          Overview
                        </MDBTabsLink>
                      </MDBTabsItem>
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => handleJustifyClick4(`tab2`)}
                          active={justifyActive3 === `tab2`}
                        >
                          Timeline
                        </MDBTabsLink>
                      </MDBTabsItem>
                    </MDBTabs>
                    <MDBTabsContent>
                      <MDBTabsPane show={justifyActive3 === "tab1"}>
                        <div className="card">
                          <div className="card-body">
                            <ul className="list-unstyled">
                              {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_created_date) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Created Date`}
                                        </div>
                                        <span className="small text-muted">
                                          {
                                            datas.overview.OverView[`Created Date`] != "----" ?
                                              <Handle_convert_system_timezone dateAndTime={datas.overview.OverView[
                                                `Created Date`
                                              ]} /> : "----"}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                              {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_updated_date) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Updated Date`}
                                        </div>
                                        <span className="small text-muted">
                                          {datas.overview.OverView[
                                            `Updated Date`
                                          ] != "----" ?
                                            <Handle_convert_system_timezone dateAndTime={datas.overview.OverView[
                                              `Updated Date`
                                            ]} /> : "----"
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                              <li className="mt-4">
                                <div className="row align-items-center">
                                  <div className="col-auto">
                                    {
                                      (leadPermission?.super_admin || leadPermission?.leads?.fields[`leads_admin_leadstage_dates`]) &&
                                      <> <div className="h5 mb-0">
                                        Lead Stage Dates
                                      </div>
                                        <table className="table table-bordered mt-2">
                                          <thead>
                                            <tr>
                                              <th>Stage Name</th>
                                              <th>Assigned On</th>
                                              <th>No of Days</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {datas.overview &&
                                              Object.keys(datas.overview.LeadStageDates).map((item, index) => {
                                                return (
                                                  <tr key={index}>
                                                    <td>
                                                      {
                                                        datas.overview.LeadStageDates[
                                                          item
                                                        ].name
                                                      }
                                                    </td>
                                                    <td>
                                                      <HandleConvertTimeOnlyDate
                                                        dateAndTime={
                                                          datas.overview.LeadStageDates[
                                                            item
                                                          ].assign_on
                                                        }
                                                      />
                                                    </td>
                                                    <td>
                                                      {
                                                        datas.overview.LeadStageDates[
                                                          item
                                                        ].days
                                                      }
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                          </tbody>
                                        </table>
                                      </>
                                    }

                                  </div>
                                </div>
                              </li>
                              {/* {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_conversion_date) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Conversion Date`}
                                        </div>
                                        <span className="small text-muted">
                                          {

                                            datas.overview.OverView[
                                              `Conversion Date`
                                            ] != "----" ?
                                              dayjs(
                                                datas.overview.OverView[
                                                `Conversion Date`
                                                ],
                                                "YYYY-MM-DD HH:mm:ss"
                                              ).format(
                                                "DD-MMM-YYYY hh:mm A"
                                              ) : "----"

                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )} */}
                              {/* {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_conversion_sdr) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Conversion SDR`}
                                        </div>
                                        <span className="small text-muted">
                                          {
                                            datas.overview.OverView[
                                            `Conversion SDR`
                                            ]
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )} */}
                              {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_contacted_date) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Contacted Date`}
                                        </div>
                                        <span className="small text-muted">
                                          {

                                            datas.overview.OverView[
                                              `Contacted Date`
                                            ] != "----" ?
                                              <Handle_convert_system_timezone dateAndTime={datas.overview.OverView[
                                                `Contacted Date`
                                              ]} /> : "----"

                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                              {/* {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_dealfirst_date) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Date Created for First Deal`}
                                        </div>
                                        <span className="small text-muted">
                                          {

                                            datas.overview.OverView[
                                              `Date Created for First Deal`
                                            ] != "-----" ?
                                              dayjs(
                                                datas.overview.OverView[
                                                `Date Created for First Deal`
                                                ],
                                                "YYYY-MM-DD HH:mm:ss"
                                              ).format(
                                                "DD-MMM-YYYY hh:mm A"
                                              ) : "----"

                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )} */}
                              {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_unqualified_date) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Unqualified Date`}
                                        </div>
                                        <span className="small text-muted">
                                          {

                                            datas.overview.OverView[
                                              `Unqualified Date`
                                            ] != "----" ?
                                              <Handle_convert_system_timezone dateAndTime={datas.overview.OverView[
                                                `Unqualified Date`
                                              ]} /> : "----"

                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                              {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_unqualified_owner) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Unqualified Owner`}
                                        </div>
                                        <span className="small text-muted">
                                          {
                                            datas.overview.OverView[
                                            `Unqualified Owner`
                                            ]
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                              {/* {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_validation_date) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Validation Date`}
                                        </div>
                                        <span className="small text-muted">
                                          {

                                            datas.overview.OverView[
                                              `Validation Date`
                                            ] != "----" ?
                                              dayjs(
                                                datas.overview.OverView[
                                                `Validation Date`
                                                ],
                                                "YYYY-MM-DD HH:mm:ss"
                                              ).format(
                                                "DD-MMM-YYYY hh:mm A"
                                              ) : "----"

                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )} */}
                              {/* {datas.overview &&
                                (leadPermission?.super_admin ||
                                  leadPermission?.leads?.fields
                                    .leads_admin_validation_owner) && (
                                  <li className="mb-4">
                                    <div className="row align-items-center">
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          {`Validation Owner`}
                                        </div>
                                        <span className="small text-muted">
                                          {
                                            datas.overview.OverView[
                                            `Validation Owner`
                                            ]
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )} */}
                              {/* {datas.overview && !datas.overview.message &&
                                Object.keys(datas?.overView?.OverView).map(
                                  (item, index) => {
                                    return (
                                      (leadPermission?.super_admin || leadPermission?.leads?.fields[`leads_admin_${item.toLowerCase().replaceAll(" ", "_")}`]) &&
                                      <li key={index} className="mb-4">
                                        <div className="row align-items-center">
                                          <div className="col-auto">
                                            <div className="h5 mb-0">{item}</div>
                                            <span className="small text-muted">
                                              {datas?.overView?.OverView[item]}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  }
                                )} */}
                            </ul>
                          </div>
                        </div>
                      </MDBTabsPane>
                      <MDBTabsPane show={justifyActive3 === "tab2"}>
                        <div className="card">
                          <div className="card-body">
                            {Array.isArray(datas.timeLine) &&
                              datas.timeLine.map((item, index) => {
                                return (
                                  <div className="timeline_item " key={index}>
                                    <img className="tl_avatar" src={item?.avatar} alt=""
                                    />
                                    <span>
                                      <a style={{ color: '#00A9BD' }}>
                                        {Translation(translations, `${item?.f_name} ${item?.l_name}`)}
                                      </a>
                                      ({item?.email})
                                      <small className="float-right text-right">

                                        <Handle_convert_system_timezone dateAndTime={item?.activity_date_time} />
                                      </small>
                                    </span>
                                    <div className="msg" key={index}>
                                      <div>
                                        {Translation(
                                          translations,
                                          StringConvert(item?.activity_value)
                                        )}

                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      </MDBTabsPane>
                    </MDBTabsContent>
                  </div>
                </div>

              }

            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewLead;