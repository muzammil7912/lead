import React, { useState, useContext, useEffect, useRef } from "react";
import { Translation } from "../components/Translation";
import useFetch from "../customHooks/useFetch";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link, useParams } from "react-router-dom";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { GoFileSymlinkDirectory } from "react-icons/go";
import img1 from "../dist/webImages/justcall-logo.webp";
import Loader from "../components/common/Loading";
import Skeleton from "react-loading-skeleton";
import { Monthss } from "../components/Month";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { StringConvert } from "../components/StringConvert";
import {
  handleFullScreen,
  handleToggle,
  Handle_convert_system_timezone,
  HandleConvertTimeOnlyDate,
} from "../components/AllCustomFuntion";
import config from "../services/config.json";
import { CiLock } from "react-icons/ci";
import {
  FaFolder,
  FaHandshake,
  FaMoneyBillAlt,
  FaRegCalendarAlt,
  FaListOl,
} from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdSummarize } from "react-icons/md";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import dayjs from "dayjs";
import { MainModuleContext } from "../context/MainModuleContext";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventCardGrid from "../components/common/EventCardGrid";
import Media_image_display from "../Lead/Media_image_display";
import ActionCard from "../components/common/ActionCard";
import MeetingCard from "../components/common/MeetingCard";
import usePost from "../customHooks/usePost";
import timeGridPlugin from "@fullcalendar/timegrid";
import EditLeadCalender from "../Lead/EditLeadCalender";
const ViewClient = () => {
  const { id } = useParams();
  const { addModuleCard } = useContext(MainModuleContext);
  const { translations } = useContext(MainTranslationContexts);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { addHeading } = useContext(MainHeadingContext);
  const [resMedia, apiMethodMedia] = usePost();
  const [resFile, apiMethodFile] = usePost();
  const [mediaData, setMediaData] = useState("");
  const [assetsnotes, setAssetsNotes] = useState("");
  const [assetFileMedia, setassetFileMedia] = useState(true);
  const [datas, setDatas] = useState("");
  const [assetsFile, setAssetsFile] = useState("");
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [opportunityData, setopportunityData] = useState("");
  const [followers, setfollowers] = useState([]);
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [justifyActive4, setJustifyActive4] = useState("tab1");
  const [actionArr, setactionArr] = useState([
    {
      id: 1,
      DateValue: "",
      FirstValue: "",
      secValue: "",
      thirdValue: "",
    },
  ]);
  const [meetingArr, setmeetingArr] = useState([
    {
      id: 1,
      DateValue: "",
      FirstValue: "",
      secValue: "",
      thirdValue: "",
    },
  ]);
  const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZone3 = timeZone2.split("/")
  const {
    data: viewClient,
    loading,
    error,
  } = useFetch("", `getViewClient/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`);
  /////////////////  Action Card Start////////////////////
  const handleAddActionRow = () => {
    setactionArr([
      ...actionArr,
      {
        id: actionArr.length + 1,
        DateValue: "",
        FirstValue: "",
        secValue: "",
        thirdValue: "",
        deleteBtn: "delete",
      },
    ]);
  };

  const handleRemoveActionRow = (item) => {
    setactionArr(actionArr.filter((val) => val.id !== item.id));
  };

  /////////////////  Action Card End ////////////////////

  ////////////////  Meeting Card Start////////////////////
  const handleAddMeetingRow = () => {
    setmeetingArr([
      ...meetingArr,
      {
        id: meetingArr.length + 1,
        DateValue: "",
        FirstValue: "",
        secValue: "",
        thirdValue: "",
        deleteBtn: "delete",
      },
    ]);
  };

  const handleRemoveMeetingRow = (item) => {
    setmeetingArr(meetingArr.filter((val) => val.id !== item.id));
  };

  const handle_File_more = () => {
    const lendth = assetsFile.data.length;
    const data = assetsFile.data[lendth - 1];
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Client");
    apiMethodFile("postPaginationFilesDataView", formData);
  };

  const handleMoreMediaData = () => {
    const lendth = mediaData.data.length;
    const data = mediaData.data[lendth - 1];
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Client");
    apiMethodMedia("postPaginationMediaDataView", formData);
  };

  useEffect(() => {
    if (resFile.data) {
      let file_arr = resFile.data.data;
      file_arr.shift();
      setAssetsFile({
        ...resFile.data,
        data: [...assetsFile.data, ...file_arr],
      });
      // setAssetsFile()
    }
  }, [resFile.data]);

  useEffect(() => {
    if (resMedia.data) {
      let mediaMoreData = resMedia?.data?.data;
      mediaMoreData.shift();
      setMediaData({
        ...resMedia.data,
        data: [...mediaData?.data, ...mediaMoreData],
      });
    }
  }, [resMedia.data]);

  /////////////////  Meeting Card End ////////////////////

  useEffect(() => {
    if (viewClient && !viewClient.message) {
      setDatas(viewClient);
      setfollowers(viewClient?.lead_followers);
      setAssetsNotes(viewClient?.assetsNotes);
      addModuleCard(viewClient);
    }
  }, [viewClient]);

  useEffect(() => {
    if (viewClient && !viewClient.message) {
      addHeading(`Client - ${viewClient.Client_data[0].fullname}`);
      setAssetsFile(viewClient?.filesData);
      setMediaData(viewClient?.mediaData);
      setEditLeadFeild(viewClient?.all_fields);
      setopportunityData(viewClient?.Opportunity);
    }
  }, [viewClient]);

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
  const handleJustifyClick5 = (value) => {
    if (value == justifyActive4) {
      return;
    }
    setJustifyActive4(value);
  };

  if (viewClient && !viewClient.message) {
    var initialValues = viewClient?.Client_data[0];
    initialValues = {
      ...initialValues,
      clientsource: viewClient?.Client_data[0]?.lead_prospect_source,
    };

    var imgVal = viewClient?.Client_data[0]?.avatar
      ? viewClient?.Client_data[0]?.avatar.includes("http")
        ? viewClient?.Client_data[0]?.avatar
        : `${config.baseurl2}${viewClient?.Client_data[0]?.avatar}`
      : permissions["system-avatar-image"]?.setting_value
        ? `${config.baseurl2}${permissions["system-default-avatar-image"]?.setting_value}`
        : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160";
  }

  if (loading || !datas) return <Loader />;

  return (
    initialValues &&
    datas &&
    !datas.message && (
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
                      <h5 className="m-0">{initialValues.fullname}</h5>

                      <div className="mb-1 socialBtn">
                        <a href={`mailto:${initialValues.email}`}>
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
                        <a
                          href={`https://api.whatsapp.com/send?phone=${initialValues?.number}`}
                        >
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
                        {viewClient && viewClient.Client_data[0].lead_by_name
                          ? viewClient.Client_data[0].lead_by_name +
                          " " +
                          "(" +
                          viewClient.Client_data[0].lead_by_role_name +
                          ")"
                          : ""}
                        <br />
                        Assigned to:{" "}
                        {viewClient &&
                          viewClient.Client_data[0].assigned_to_name
                          ? viewClient.Client_data[0].assigned_to_name +
                          " " +
                          "(" +
                          viewClient.Client_data[0].assigned_to_role_name +
                          ")"
                          : ""}
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
                            `${datas?.lead_stages &&
                            !datas?.lead_stages?.message &&
                            datas?.Client_data[0]?.client_stage_name
                            }`
                          )}
                        </label>{" "}
                      </div>

                      {datas &&
                        `${datas?.lead_stages &&
                        !datas?.lead_stages?.message &&
                        datas?.Client_data[0]?.client_stage_wonlost
                        }` === "lost" && (
                          <div>
                            <label className="form-label">
                              {datas?.Client_data[0]?.client_stage_name} Reason:
                              <br />
                              {datas?.clientsLostStages[0]?.reason_description}
                            </label>
                          </div>
                        )}
                    </div>

                    {datas &&
                      `${datas.lead_stages &&
                      !datas.lead_stages.message &&
                      datas.lead_stages.filter(
                        (item) => item.id == datas.Client_data[0].lead_stage
                      )[0]?.name
                      }` === "Unqualified" && (
                        <div>
                          <label className="form-label">
                            Unqualified Reason:
                            <br />
                            {datas.Client_data[0].lost_stage_reason}
                          </label>
                        </div>
                      )}

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
                                leadPermission?.clients?.fields?.clients_fname ===
                                "true" ||
                                leadPermission?.clients?.fields?.clients_fname ===
                                "-1" ? (
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "First Name")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas?.Client_data[0]?.fname}`
                                  )}{" "}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields?.clients_lname ===
                              "true" ||
                              leadPermission?.clients?.fields?.clients_lname ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Last Name")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas?.Client_data[0]?.lname}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_contact_type === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_contact_type === "-1" ? (
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
                                      `${datas?.Client_data[0]?.type_name}`
                                    )}
                                  </p>{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_phone_number === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_phone_number === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Phone Number")}
                                  </label>
                                  {datas?.Client_data[0]?.number}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_stage === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_stage === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Client Stage")}
                                  </label>
                                  {Translation(
                                    translations,
                                    datas?.Client_data[0]?.client_stage_name
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {datas &&
  `${datas?.lead_stages &&
  !datas?.lead_stages?.message &&
  datas?.Client_data[0]?.client_stage_wonlost
  }` === "lost" && 
  leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_stage === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_stage === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, `${datas?.lead_stages &&
      !datas?.lead_stages?.message &&
      datas?.Client_data[0]?.client_stage_name} Reason`)}
                                  </label>
                                  <div>
      <label className="form-label">
        {datas?.clientsLostStages[0]?.reason_description}
      </label>
    </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields?.clients_email ===
                              "true" ||
                              leadPermission?.clients?.fields?.clients_email ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "E-mail")}
                                  </label>
                                  {datas?.Client_data[0]?.email}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_email_status === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_email_status === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Email status")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas?.Client_data[0]?.email_status}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_score_number === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_score_number === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Score Number")}
                                  </label>
                                  {datas?.Client_data[0]?.score_number}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_mobile_phone === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_mobile_phone === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Mobile Phone")}
                                  </label>
                                  {datas?.Client_data[0]?.mobile_phone}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_birthday === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_birthday === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Birthday")}
                                  </label>
                                  {datas?.Client_data[0]?.birthday}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_created_date === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_created_date === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Created date")}
                                  </label>
                                  {datas?.Client_data[0]?.created_date != "" ? (
                                    <Handle_convert_system_timezone
                                      dateAndTime={
                                        datas?.Client_data[0]?.created_date
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_updated_date === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_updated_date === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Updated date")}
                                  </label>
                                  {datas?.Client_data[0]?.updated_date != "" ? (
                                    <Handle_convert_system_timezone
                                      dateAndTime={
                                        datas?.Client_data[0]?.updated_date
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
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
                        <div className="card-status bg-blue"></div>

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
                              leadPermission?.clients?.fields
                                ?.clients_address1 === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_address1 === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Address 1")}
                                  </label>
                                  {datas?.Client_data[0]?.address_one}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_address2 === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_address2 === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Address 2")}
                                  </label>
                                  {datas?.Client_data[0]?.address_two}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields?.clients_city ===
                              "true" ||
                              leadPermission?.clients?.fields?.clients_city ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "City")}
                                  </label>
                                  {datas?.Client_data[0]?.city}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_postal_code === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_postal_code === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(
                                      translations,
                                      "Postal/ZIP Code"
                                    )}
                                  </label>
                                  {datas?.Client_data[0]?.zip}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields?.clients_state ===
                              "true" ||
                              leadPermission?.clients?.fields?.clients_state ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "State")}
                                  </label>
                                  {datas?.Client_data[0]?.state}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields?.clients_country ===
                              "true" ||
                              leadPermission?.clients?.fields?.clients_country ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Country")}
                                  </label>
                                  {datas?.Client_data[0]?.country}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_ipaddress === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_ipaddress === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "IP Address")}
                                  </label>
                                  {datas?.Client_data[0]?.ip_address}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_time_zone === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_time_zone === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Time Zone")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas?.Client_data[0]?.time_zone}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields?.clients_locale ===
                              "true" ||
                              leadPermission?.clients?.fields?.clients_locale ===
                              "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Locale")}
                                  </label>
                                  {datas?.Client_data[0]?.locale}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_sourcepage === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_sourcepage === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Source Page")}
                                  </label>
                                  {datas?.Client_data[0]?.lead_sourcepage}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_source === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_source === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Lead Source")}
                                  </label>
                                  {datas?.Client_data[0]?.leadsource_name}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_source === "true" ||
                              leadPermission?.clients?.fields
                                ?.clients_lead_source === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Lead Medium")}
                                  </label>
                                  {datas?.Client_data[0]?.leadmedium_name}
                                </div>
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
                                    {item.replace(/_/g, " ")}
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
                                                  {Object.keys(
                                                    datas.all_fields[item][
                                                    item1
                                                    ]
                                                  ).map((item2, index2) => {
                                                    let permissionName = `clients_${datas.all_fields[
                                                      item
                                                    ][item1][
                                                      item2
                                                    ]?.label.replaceAll(
                                                      " ",
                                                      "_"
                                                    )}`;
                                                    // console.log(label)
                                                    return (
                                                      (leadPermission?.super_admin ||
                                                        leadPermission?.clients
                                                          ?.fields[
                                                        permissionName
                                                        ] === "true" ||
                                                        leadPermission?.clients
                                                          ?.fields[
                                                        permissionName
                                                        ] === "-1") &&
                                                      datas.all_fields[item][
                                                        item1
                                                      ][item2].value && (
                                                        <div
                                                          key={index2}
                                                          className="col-md-6"
                                                        >
                                                          <div className="form-group">
                                                            <label className="form-label">
                                                              {Translation(
                                                                translations,
                                                                datas
                                                                  .all_fields[
                                                                  item
                                                                ][item1][item2]
                                                                  ?.label
                                                              )}
                                                            </label>
                                                            {Translation(
                                                              translations,
                                                              datas.all_fields[
                                                                item
                                                              ][item1][item2]
                                                                ?.value
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
                  leadPermission?.clients?.fields?.clients_notes === "true" ||
                  leadPermission?.clients?.fields?.clients_notes === "-1" ? (
                  <div className="card-body">
                    {assetsnotes &&
                      !assetsnotes.message &&
                      assetsnotes?.map((item, index) => {
                        return (
                          <div className="summernote" key={index}>
                            <div className="card blog_single_post">
                              {item.note_privacy === "1" && (
                                <div className="text-left">
                                  {" "}
                                  <span className="tag tag-danger">
                                    Private Note
                                  </span>{" "}
                                </div>
                              )}
                              <div className="card-body">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: item.note_value,
                                  }}
                                ></p>
                              </div>
                              <div className="card-footer p-2">
                                <div className="clearfix">
                                  <div className="float-left">
                                    <strong>
                                      {
                                        <Handle_convert_system_timezone
                                          dateAndTime={item.note_date}
                                        />
                                      }
                                    </strong>
                                  </div>
                                  <div className="float-right">
                                    Posted By{" "}
                                    <small className="text-muted">
                                      {`${item?.f_name}  ${item?.l_name}  ${item?.email}`}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  ""
                )}
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

                <div className="card-body">
                  {Array.isArray(viewClient?.project) &&
                    viewClient?.project.map((item, i) => {
                      return (
                        <div key={i} className=" col-lg-12 col-md-12 col-sm-12">
                          {" "}
                          <div className="c2_own">
                            <ul className="right_chat list-unstyled p-0 right_chat_vl">
                              <li className="online mb-2">
                                <Link
                                  to={`/${config.ddemoss}view/project/${item.prj_id}`}
                                >
                                  <a href="#" className="cc_cls" data-row="12">
                                    <i className="fa-solid fa-xmark"></i>
                                  </a>
                                  <div className="media">
                                    <img
                                      className="media-object "
                                      src={item.project_feature_image}
                                      alt=""
                                    />
                                    <div className="media-body">
                                      <span className="name">
                                        {item?.project_title}{" "}
                                      </span>
                                      <div className="message">
                                        {item?.name}
                                      </div>
                                      {item.start_date && (
                                        <span className="message">
                                          {item.start_date}
                                        </span>
                                      )}{" "}
                                      <span className="dashsymbol">
                                        {" "}
                                        | - |{" "}
                                      </span>{" "}
                                      {item.end_date && (
                                        <span className="message">
                                          {item.end_date}
                                        </span>
                                      )}
                                      <span className="badge badge-outline status"></span>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            </ul>
                          </div>{" "}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="card leadCards ">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <GoFileSymlinkDirectory />{" "}
                    {Translation(translations, "Files")}
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
                <div className="card-body p-2">
                  {!assetsFile ? (
                    <Skeleton count={5} />
                  ) : assetsFile.message != "No Data Found" ? (
                    <div className="table-responsive">
                      <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0 ">
                        {assetFileMedia && (
                          <thead>
                            <tr>
                              <th> </th>
                              <th>{Translation(translations, "Name")}</th>
                              <th>{Translation(translations, "Share With")}</th>
                              <th>{Translation(translations, "Owner")}</th>
                              <th>
                                {Translation(translations, "Last Update")}
                              </th>
                              <th>{Translation(translations, "File Size")}</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {Array.isArray(assetsFile?.data) &&
                            assetsFile?.data?.map((item, index) => {
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
                                      {Monthss(item.file_updated_date)}{" "}
                                      {Translation(translations, "23, 2023")}{" "}
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
                              {Array.isArray(assetsFile?.data) &&
                                assetsFile?.has_more_data && (
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handle_File_more}
                                  >
                                    Load More
                                  </button>
                                )}
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
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">
                    {Translation(translations, "Correlation")}
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
                <div className="card-body p-1 mt-2">
                  <ul className="right_chat list-unstyled p-0">
                    {Array.isArray(datas?.correlations) &&
                      datas?.correlations.map((item, index) => {
                        return (
                          <li key={index} className="online mb-2">
                            <Link
                              to={
                                item.module &&
                                `/${config.ddemoss
                                }${item.module.toLowerCase()}/view/${item.correlation_lead_user
                                }`
                              }
                            >
                              <div className="media">
                                <img
                                  className="media-object "
                                  src={item.avatar}
                                  alt=""
                                />
                                <div className="media-body">
                                  <span className="name">
                                    {Translation(translations, item.corr_title)}
                                  </span>
                                  <span className="message">
                                    {Translation(translations, item.leaduser)}
                                  </span>
                                  <span className="badge badge-outline status" />
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    {Array.isArray(datas?.correlation_lead_user) &&
                      datas?.correlation_lead_user.map((item, index) => {
                        return (
                          <li key={index} className="online mb-2">
                            <Link
                              to={
                                item.module &&
                                `/${config.ddemoss
                                }${item.module.toLowerCase()}/view/${item.lead_id
                                }`
                              }
                            >
                              <div className="media">
                                <img
                                  className="media-object "
                                  src={item.avatar}
                                  alt=""
                                />
                                <div className="media-body">
                                  <span className="name">
                                    {Translation(translations, item.corr_title)}
                                  </span>
                                  <span className="message">
                                    {Translation(translations, item.leaduser)}
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
                        leadPermission?.clients?.fields?.leads_notes === "true" ||
                        leadPermission?.clients?.fields?.leads_notes === "-1" ? (
                        <div className="form-group">
                          {datas.Client_data[0].tags}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
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
                            item?.uname && (
                              <div key={index} className="chip">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage: `url(${item?.avatar.includes(`http`)
                                      ? item?.avatar
                                      : `${config.baseurl2}${item?.avatar}`
                                      })`,
                                  }}
                                />
                                <div className="d-flex align-item-center">
                                  <span>
                                    {Translation(translations, item?.uname)}
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
                  <EditLeadCalender
                    view={true}
                    module={"client"}
                    idd={id}
                    data={datas?.clanderEventsData}
                    dataOpportunities={datas?.Opportunity}
                  />
                </div>
              </div>
              {viewClient.Opportunity && (
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <FaMoneyBillAlt />
                      Opportunities
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
                      {Array.isArray(opportunityData) ? (
                        opportunityData.map((v, i) => {
                          return (
                            <li className="online mb-2" key={i}>
                              <Link
                                to={`/${config.ddemoss}opp_pipelines/view/${v.op_id}`}
                              >
                                <div className="media">
                                  <div className="media-object cust-media-object">
                                    <i className="fa-solid fa-house fa-lg"></i>
                                  </div>

                                  <div className="media-body">
                                    <span className="name">
                                      {v.opportunity_title &&
                                        v.opportunity_title}
                                    </span>
                                    <span className="message">
                                      {v.opportunity_value &&
                                        v.opportunity_value}
                                    </span>
                                    <span className="message">
                                      {" "}
                                      &nbsp; | &nbsp;
                                    </span>
                                    <span className="message">
                                      {v.name && v.name}
                                    </span>
                                    <span className="message">
                                      {" "}
                                      &nbsp; | &nbsp;
                                    </span>
                                    <span className="message">
                                      {v.forecasted_close_date &&
                                        v.forecasted_close_date}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })
                      ) : (
                        <>no data</>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <BsFillBookmarkFill /> Actions <small> </small>
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
                  {Array.isArray(datas?.actionEventsData) && (
                    <ActionCard
                      lists={datas?.actionEventsData}
                      actionData={datas}
                      editRemove={true}
                      datasAction={datas?.Client_data[0]}
                    />
                  )}
                </div>
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <FaHandshake /> Meetings <small> </small>
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
                  {Array.isArray(datas?.meetingEventsData) && (
                    <MeetingCard
                      lists={datas?.meetingEventsData}
                      actionData={datas}
                      editRemove={true}
                      datasMeeting={datas?.Client_data[0]}
                    />
                  )}
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
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {Array.isArray(mediaData?.data) &&
                      mediaData?.data?.map((items) => {
                        return (
                          <div
                            style={{ width: 250, margin: 12 }}
                            className=""
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
                                <img
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    marginRight: "10px",
                                  }}
                                  src={
                                    items?.fileOwnerData[0]?.avatar &&
                                      items?.fileOwnerData[0]?.avatar.includes(
                                        "http"
                                      )
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
                                      `${items?.fileOwnerData[0]?.f_name +
                                      " " +
                                      items?.fileOwnerData[0]?.l_name
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
                        );
                      })}
                  </div>
                  {Array.isArray(mediaData?.data) &&
                    mediaData?.has_more_data && (
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={handleMoreMediaData}
                      >
                        Load More
                      </button>
                    )}
                </div>
              </div>
              {(leadPermission?.super_admin ||
                leadPermission?.clients?.fields?.clients_admininfo ===
                "true") && (
                  <div className="card">
                    <div className="card-status bg-blue"></div>
                    <div className="card-header">
                      <h3 className="card-title">
                        <CiLock /> Admin <small>Admin &amp; Timeline</small>
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
                                    leadPermission?.clients?.fields
                                      .clients_admin_created_date) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Created Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Created Date`
                                            ] != "----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Created Date`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_updated_date) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Updated Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Updated Date`
                                            ] != "----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Updated Date`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}

                                <li className="mt-4">
                                  <div className="row align-items-center">
                                    {(leadPermission?.super_admin ||
                                      leadPermission?.clients?.fields[
                                      `clients_admin_leadstage_dates`
                                      ]) && (
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            Client Stage Dates
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
                                                Object.keys(
                                                  datas.overview?.LeadStageDates
                                                ).map((item, index) => {
                                                  return (
                                                    <tr key={index}>
                                                      <td>
                                                        {
                                                          datas?.overview
                                                            ?.LeadStageDates[item]
                                                            ?.name
                                                        }
                                                      </td>
                                                      <td>
                                                        <HandleConvertTimeOnlyDate
                                                          dateAndTime={
                                                            datas?.overview
                                                              ?.LeadStageDates[item]
                                                              ?.assign_on
                                                          }
                                                        />
                                                      </td>
                                                      <td>
                                                        {
                                                          datas?.overview
                                                            ?.LeadStageDates[item]
                                                            ?.days
                                                        }
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                            </tbody>
                                          </table>
                                        </div>
                                      )}
                                  </div>
                                </li>
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_conversion_date) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Conversion Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Conversion Date`
                                            ] != "----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Conversion Date`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_conversion_sdr) && (
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
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_contacted_date) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Contacted Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Contacted Date`
                                            ] != "----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Contacted Date`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_date_created_for_first_deal) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Date Created for First Deal`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Date Created for First Deal`
                                            ] != "-----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Date Created for First Deal`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_unqualified_date) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Client Lost Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Unqualified Date`
                                            ] != "----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Unqualified Date`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_unqualified_owner) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Client Lost Owner`}
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
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_validation_date) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Validation Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Validation Date`
                                            ] != "----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Validation Date`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_validation_owner) && (
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
                                  )}
                                {/* {datas.overview &&
                                                                (leadPermission?.super_admin ||
                                                                    leadPermission?.clients?.fields
                                                                        .clients_admin_prospect_lost_date) && (
                                                                    <li className="mb-4">
                                                                        <div className="row align-items-center">
                                                                            <div className="col-auto">
                                                                                <div className="h5 mb-0">
                                                                                    {`Prospect Lost Date`}
                                                                                </div>
                                                                                <span className="small text-muted">
                                                                                    {datas.overview.OverView[
                                                                                        `Prospect Lost Date`
                                                                                    ] != "----" ?
                                                                                        dayjs(
                                                                                            datas.overview.OverView[
                                                                                            `Prospect Lost Date`
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
                                                                    leadPermission?.clients?.fields
                                                                        .clients_admin_prospect_lost_owner) && (
                                                                    <li className="mb-4">
                                                                        <div className="row align-items-center">
                                                                            <div className="col-auto">
                                                                                <div className="h5 mb-0">
                                                                                    {`Prospect Lost Owner`}
                                                                                </div>
                                                                                <span className="small text-muted">
                                                                                    {datas.overview.OverView[
                                                                                        `Prospect Lost Owner`
                                                                                    ]
                                                                                    }

                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                )} */}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_client_conversion_date) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Client Conversion Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.overview.OverView[
                                              `Client Conversion Date`
                                            ] != "----" ? (
                                              <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.overview.OverView[
                                                  `Client Conversion Date`
                                                  ]
                                                }
                                              />
                                            ) : (
                                              "----"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.overview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.clients?.fields
                                      .clients_admin_client_conversion_owner) && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Client Conversion Owner`}
                                          </div>
                                          <span className="small text-muted">
                                            {
                                              datas.overview.OverView[
                                              `Client Conversion Owner`
                                              ]
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                              </ul>
                            </div>
                          </div>
                        </MDBTabsPane>
                        <MDBTabsPane show={justifyActive3 === "tab2"}>
                          <div className="card">
                            <div className="card-body">
                              {datas.TimeLine &&
                                !datas.TimeLine.message &&
                                datas.TimeLine.map((item, index) => {
                                  return (
                                    <div key={index} className="timeline_item ">
                                      <img
                                        className="tl_avatar"
                                        src={item.avatar}
                                        alt=""
                                      />
                                      <span>
                                        <a style={{ color: '#00A9BD' }}>
                                          {Translation(
                                            translations,
                                            `${item.f_name} ${item.l_name} `
                                          )}
                                        </a>
                                        {`(${item.email})`}
                                        <small className="float-right text-right">
                                          <Handle_convert_system_timezone
                                            dateAndTime={item.activity_date_time}
                                          />
                                        </small>
                                      </span>
                                      <div className="msg">
                                        <div>
                                          {Translation(
                                            translations,
                                            StringConvert(item.activity_value)
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </MDBTabsPane>
                      </MDBTabsContent>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewClient;
