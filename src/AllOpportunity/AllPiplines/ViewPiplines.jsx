import React, { useState, useContext, useEffect, useRef } from "react";
import { Translation } from "../../components/Translation";
import useFetch from "../../customHooks/useFetch";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import { Link, useParams } from "react-router-dom";
import usePost from "../../customHooks/usePost";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import Loader from "../../components/common/Loading";
import config from '../../services/config.json'
import Skeleton from "react-loading-skeleton";
import { Monthss } from "../../components/Month";
import { GoFileSymlinkDirectory } from "react-icons/go";
import { FaHandshake, FaFolder } from "react-icons/fa";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { StringConvert } from "../../components/StringConvert";
import { MainTranslationContexts } from "../../context/MainTranslationContexts";
import { handleFullScreen, handleToggle, Handle_convert_system_timezone, HandleConvertTimeOnlyDate } from "../../components/AllCustomFuntion";
import { MainModuleContext } from "../../context/MainModuleContext";
import Media_image_display from "../../Lead/Media_image_display";
import ActionCard from "../../components/common/ActionCard";
import MeetingCard from "../../components/common/MeetingCard";
import EditLeadCalender from "../../Lead/EditLeadCalender";

const ViewPiplines = () => {
  const { id } = useParams();
  const { addModuleCard } = useContext(MainModuleContext);
  const { translations } = useContext(MainTranslationContexts);
  const [assetFileMedia, setassetFileMedia] = useState(true);
  const [respremetion, apiMethodPremetion] = usePost();
  const [rescreatBy, apiMethodcreatBy] = usePost();
  const [resAssigned, apiMethodAssigned] = usePost();
  const { addPermission, leadPermission } = useContext(MainLeadPermissionContext);
  const [assetsnotes, setAssetsNotes] = useState("");
  const { addHeading } = useContext(MainHeadingContext);
  const [datas, setDatas] = useState("");
  const [assetsFile, setAssetsFile] = useState("");
  const [mediaData, setMediaData] = useState('');
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [creatBy, setCreatBy] = useState("");
  const [assigned, setAssigned] = useState("");
  const [followers, setfollowers] = useState([]);
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [justifyActive4, setJustifyActive4] = useState("tab1");
  const [admintab, setAdmintab] = useState("tab1");
  const [assettab, setAssettab] = useState("tab1");
  const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZone3 = timeZone2.split("/")
  const { data: viewOpportunity, loading, error } = useFetch('', `getViewOpportunity/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`);
  const [resMedia, apiMethodMedia] = usePost();
  const [resFile, apiMethodFile] = usePost();
  useEffect(() => {
    if (viewOpportunity && !viewOpportunity.message) {
      addModuleCard(viewOpportunity)
      setDatas(viewOpportunity)
      setfollowers(viewOpportunity.opportunity_followers)
      setAssetsNotes(viewOpportunity.notes);
      setAssetsFile(viewOpportunity?.filesData);
      setMediaData(viewOpportunity?.mediaData)
    }
  }, [viewOpportunity])


  useEffect(() => {
    if (viewOpportunity && !viewOpportunity.message) {
      addHeading(`Opportunity  - ${viewOpportunity?.opportunity_data?.opportunity_title}`);
      setEditLeadFeild(viewOpportunity?.all_fields);
      let formViewUserName = new FormData();
      let formAssigned = new FormData();
      if (viewOpportunity.opportunity_data?.lead_by) {
        formViewUserName.append("id", `${viewOpportunity?.opportunity_data?.lead_by}`);
        apiMethodcreatBy(`postViewUserName`, formViewUserName);
      }
      if (viewOpportunity?.opportunity_data?.lead_assigned_to) {
        formAssigned.append(
          "id",
          `${viewOpportunity?.opportunity_data?.lead_assigned_to}`
        );
        apiMethodAssigned(`postViewUserName`, formAssigned);
      }
    }
  }, [viewOpportunity]);

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

  const handleJustifyClick2 = (value) => {
    if (value == justifyActive2) {
      return;
    }
    setJustifyActive2(value);
  };
  const handleJustifyClick3 = (value) => {
    if (value == assettab) {
      return;
    }

    setAssettab(value);
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

  useEffect(() => {
    if (rescreatBy.data) {
      setCreatBy(rescreatBy.data);
    }
  }, [rescreatBy.data]);
  useEffect(() => {
    if (resAssigned.data) {
      setAssigned(resAssigned.data);
    }
  }, [resAssigned.data]);
  const handleJustifyClickAdminTab = (value) => {
    if (value == admintab) {
      return;
    }
    setAdmintab(value);
  };

  if (viewOpportunity && !viewOpportunity.message) {
    var initialValues = viewOpportunity.opportunity_data;
    initialValues = {
      ...initialValues,
      opportunitiesource: viewOpportunity.opportunity_data?.lead_prospect_source,
    };
    var imgVal = viewOpportunity.opportunity_data?.avatar;
  }


  if (loading || respremetion.isLoading) return <Loader />;

  return (
    initialValues && datas && !datas.message && (
      <div className="editLeadForm">
        <div className="container-fluid">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="media">
                    {/* <img
                      className="avatar avatar-xxl mr-5"
                      src={imgVal}
                      alt="avatar"
                    /> */}
                    <div className="media-body">
                      <h5 className="m-0">{initialValues.fullname}</h5>

                      {/* <div className="mb-1 socialBtn">
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
                        <a href={`https://api.whatsapp.com/send?phone=${initialValues?.number}`}>
                          <i className="fa fa-whatsapp"></i>
                        </a>{" "}
                        &nbsp;
                        <a
                          href={`https://justcall.io/app/macapp/dialpad_app.php?numbers=${initialValues?.number}`}
                        >
                          <img src={`${img1}`} width={15} />{" "}
                        </a>
                      </div> */}

                      <p>
                        Assigned to: {`${datas?.opportunity_data?.assigned_to_name} (${datas?.opportunity_data?.assigned_to_role_name})`}
                        <br />
                        Opportunity Owner: {`${datas?.opportunity_data?.owner_to_name} (${datas?.opportunity_data?.assigned_to_role_name})`}
                      </p>
                    </div>
                  </div>
                  <div className="score">{datas?.opportunity_data?.opportunity_value}</div>
                  <div className="card-options">
                    <div className="columndd">
                      <div>
                        <label className="form-label">
                          Stage:{" "}
                          {Translation(translations, datas?.opportunity_data?.stage_name)}
                          <br />
                        </label>
                      </div>

                      {datas?.opportunity_data?.wonlost === "lost" && (
                        <div>
                          <label className="form-label">
                            {datas?.opportunity_data?.stage_name}{" "}
                            Reason:
                            <br />
                            {Array.isArray(datas?.lost_stage) && datas?.lost_stage?.[0]?.reason_description}
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
                    <i className="fa fa-users text-muted"></i>
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
                            <div className="col-md-12">
                              {leadPermission?.super_admin ||
                                leadPermission?.opportunities?.fields
                                  ?.opportunity_opp_title === "true" ||
                                leadPermission?.opportunities?.fields
                                  ?.opportunity_opp_title === "-1" ? (
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Opportunity Title")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas.opportunity_data.opportunity_title
                                    }`
                                  )}{" "}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_value === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_value === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Opportunity Value")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas.opportunity_data.opportunity_value}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_stage === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_stage === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(
                                      translations,
                                      "Opportunity Stage"
                                    )}
                                  </label>
                                  <p className="mb-0">
                                    {Translation(
                                      translations,
                                      `${datas.opportunity_data.stage_name}`
                                    )}
                                  </p>{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_stage === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_stage === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Lost Reason")}
                                  </label>
                                  {Translation(translations, datas?.lost_stage?.[0]?.reason_description)}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_status === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_status === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Status")}
                                  </label>
                                  {Translation(
                                    translations, datas.opportunity_data.status_name)}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_forcastedate === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_forcastedate === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Forecast Close Date")}
                                  </label>
                                  {datas.opportunity_data.forecasted_close_date}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_description === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_description === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Description")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas.opportunity_data.opportunity_description}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {/* {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_score_number === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_score_number === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Score Number")}
                                  </label>
                                  {datas.opportunity_data.score_number}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_mobile_phone === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_mobile_phone === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Mobile Phone")}
                                  </label>
                                  {datas.opportunity_data.mobile_phone}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_birthday === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_birthday === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Birthday")}
                                  </label>
                                  {datas.opportunity_data.birthday}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_created_date === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_created_date === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Created date")}
                                  </label>
                                  {datas.opportunity_data.created_date}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_updated_date === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_updated_date === "-1" ? (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Updated date")}
                                  </label>
                                  {datas.opportunity_data.updated_date}
                                </div>
                              </div>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
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
                              leadPermission?.opportunities?.fields
                                ?.opportunities_address1 === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_address1 === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Address 1")}
                                  </label>
                                  {datas.opportunity_data.address_one}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_address2 === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_address2 === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Address 2")}
                                  </label>
                                  {datas.opportunity_data.address_two}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_city === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_city === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "City")}
                                  </label>
                                  {datas.opportunity_data.city}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_postal_code === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_postal_code === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(
                                      translations,
                                      "Postal/ZIP Code"
                                    )}
                                  </label>
                                  {datas.opportunity_data.zip}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_state === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_state === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "State")}
                                  </label>
                                  {datas.opportunity_data.state}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_country === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_country === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Country")}
                                  </label>
                                  {datas.opportunity_data.country}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_ipaddress === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_ipaddress === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "IP Address")}
                                  </label>
                                  {datas.opportunity_data.ip_address}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_time_zone === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_time_zone === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Time Zone")}
                                  </label>
                                  {Translation(
                                    translations,
                                    `${datas.opportunity_data.time_zone}`
                                  )}{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_locale === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_locale === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Locale")}
                                  </label>
                                  {datas.opportunity_data.locale}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_sourcepage === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_sourcepage === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Source Page")}
                                  </label>
                                  {datas.opportunity_data.lead_sourcepage}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_lead_source === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunities_lead_source === "-1" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Lead Source")}
                                  </label>
                                  {datas.opportunity_data.source_name}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div> */}
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
                                    {item.replace(/_/g, ' ')}
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
                                            {Object.keys(datas.all_fields[item]).map((item1, index) => {
                                              return (
                                                <div className="col-md-6" key={index}>
                                                  <h4 className="mb-3">
                                                    {Translation(translations, item1.replace(/_/g, " "))}
                                                  </h4>
                                                  {Object.keys(datas.all_fields[item][item1]).map((item2, index2) => {
                                                    let permissionName = `opportunity_${datas.all_fields[item][item1][item2]?.label.replaceAll(' ', '_')}`
                                                    console.log(permissionName)
                                                    return (
                                                      (leadPermission?.super_admin || leadPermission?.opportunities?.fields[permissionName] === 'true' || leadPermission?.opportunities?.fields[permissionName] === '-1') &&
                                                      datas.all_fields[item][item1][item2].value &&
                                                      (
                                                        <div
                                                          key={index2}
                                                          className="col-md-6"
                                                        >
                                                          <div className="form-group">
                                                            <label className="form-label">
                                                              {Translation(translations, datas.all_fields[item][item1][item2]?.label)}
                                                            </label>

                                                            {Translation(translations, datas.all_fields[item][item1][item2]?.value)}
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
                  leadPermission?.opportunities?.fields
                    ?.opportunity_notes === "true" ||
                  leadPermission?.opportunities?.fields
                    ?.opportunity_notes === "-1" ?
                  <div className="card-body">
                    {Array.isArray(assetsnotes) &&
                      assetsnotes?.map((item, index) => {
                        return (
                          <div className="summernote" key={index}>
                            <div className="card blog_single_post">
                              {item.note_privacy === "1" &&
                                <div className="text-left">
                                  <span className="tag tag-danger">Private Note</span>
                                </div>
                              }
                              <div className="card-body">
                                <p dangerouslySetInnerHTML={{ __html: item.note_value }}></p>
                              </div>
                              <div className="card-footer p-2">
                                <div className="clearfix">
                                  <div className="float-left">
                                    <strong>{<Handle_convert_system_timezone
                                      dateAndTime={item.note_date}
                                    />}</strong>
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
                  </div> : ''}
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-users text-muted"></i> Projects (#)
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
                  {Array.isArray(viewOpportunity?.project) && viewOpportunity?.project.map((item, i) => {
                    return (
                      <div key={i} className="col-md-12 col-sm-12"> <div className="c2_own"><ul className="right_chat list-unstyled p-0 right_chat_vl">
                        <li className="online mb-2">
                          <Link
                            to={`/${config.ddemoss}view/project/${item.prj_id}`}
                          >
                            <a href="#" className="cc_cls" data-row="12">
                              <i className="fa-solid fa-xmark"></i>
                            </a>
                            <div className="media" style={{ display: 'flex', alignItems: 'center' }}>
                              <i style={{ marginRight: 8 }} className={item?.pipeline_icon}></i>
                              <div className="media-body">
                                <span className="name">{item?.project_title} </span>
                                <div className="message">{item?.name}</div>
                                {item.start_date && <span className="message">{item.start_date}</span>}
                                <span className="dashsymbol"> | - | </span>
                                {item.end_date && <span className="message">{item.end_date}</span>}

                              </div>

                            </div>
                          </Link>
                        </li>
                      </ul></div> </div>
                    )
                  })}
                </div>
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
                  {!assetsFile ? (
                    <Skeleton count={5} />
                  ) : assetsFile.message != "No Data Found" ? (
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

                              assetFileMedia ? <tr key={index}>
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
                              </tr> :
                                <tr key={index}>
                                  <td className="card card__media p-3 mx-auto col-lg-9 my-3 border" key={index}>
                                    <a href='#media' className="mb-0">
                                      <img
                                        src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                        alt=""
                                        className="rounded lazy"
                                        loading="lazy"
                                      />
                                    </a>
                                    <div className="d-flex align-items-center px-2 mt-3">
                                      <img
                                        className="avatar avatar-md mr-3"
                                        src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                        alt=""
                                      />
                                      <div className="mt-2">
                                        <div>Super Admin</div>
                                        <small className="d-block text-muted">2 day(s) ago ago</small>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="d-flex align-items-center justify-content-between px-2">
                                      <b>Latitude:0</b>
                                      <b>Longitude:0</b>
                                    </div>
                                  </td>
                                </tr>



                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    " No Data"
                  )}
                </div>
                {(Array.isArray(assetsFile?.data) && assetsFile?.has_more_data) &&
                  <button type="button" className="btn btn-primary" onClick={handle_File_more}>Load More</button>}
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
                      <div className="form-group">
                        {datas.opportunity_data.tags}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    {" "}
                    {Translation(translations, "Contacts")}{" "}
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
                    {datas.contact && !datas.contact.message &&
                      datas.contact.map((item, index) => {
                        return (
                          <li key={index} className="online mb-2">
                            <Link to={item.module && `/${config.ddemoss}${item.module.toLowerCase()}/view/${item.id}`}>
                              <div className="media">
                                <img
                                  className="media-object "
                                  src={item?.avatar?.includes("http") ? item?.avatar : `${config.baseurl2}${item?.avatar} `}
                                  alt=""
                                />
                                <div className="media-body">
                                  <span className="name">
                                    {Translation(translations, item.fname)}
                                  </span>
                                  <span className="message">
                                    {Translation(translations, item.email)}
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
                                        backgroundImage: `url(${item?.avatar.includes(`http`) ? item?.avatar : `${config.baseurl2}${item?.avatar}`})`,
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
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-users text-muted"></i> Calendar
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
                  <EditLeadCalender view={true} dataOpportunities={datas?.opportunity
                  } module={"opportunity"} idd={id} data={datas?.clanderEventsData} />
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
                  <div className="row">
                    {Array.isArray(mediaData?.data) && mediaData?.data?.map(items => {
                      return (
                        <div
                          className="col-sm-5 col-md-5 col-lg-5 card_margin_left"
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
                            {/* <img src={errorImage} alt="" /> */}
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
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-calendar-check-o text-muted"></i>{" "}
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
                  {Array.isArray(datas?.actionEventsData) &&
                    <ActionCard
                      lists={datas?.actionEventsData}
                      actionData={datas}
                      editRemove={true}
                    />}
                </div>
              </div>

              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <FaHandshake />
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
                    />}
                </div>
              </div>
              {
                <div className="card">
                  <div className="card-status bg-blue"></div>
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fa fa-user-secrect text-muted"></i> Admin{" "}
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
                  {(leadPermission?.super_admin ||
                    leadPermission?.opportunities?.fields?.opportunity_admininfo == "true") && <div className="card-body">
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
                              {datas?.adminOverview && !datas?.adminOverview.message && <ul className="list-unstyled">
                                <li className="mt-4">
                                  <div className="row align-items-center">
                                    {(leadPermission?.super_admin || leadPermission?.opportunities?.fields[`opportunity_admin_oppstage_dates`]) &&
                                      <div className="col-auto">
                                        <div className="h5 mb-0">
                                          Opportunity Stage Dates
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
                                            {datas?.adminOverview && !datas.adminOverview.message &&
                                              Object.keys(
                                                datas?.adminOverview?.opportunityStageDates
                                              ).map((item, index) => {
                                                return (
                                                  <tr key={index}>
                                                    <td>
                                                      {
                                                        datas?.adminOverview
                                                          ?.opportunityStageDates[
                                                          item
                                                        ]?.name
                                                      }
                                                    </td>
                                                    <td>
                                                      <HandleConvertTimeOnlyDate
                                                        dateAndTime={
                                                          datas?.adminOverview
                                                            ?.opportunityStageDates[
                                                            item
                                                          ]?.assign_on
                                                        }
                                                      />
                                                    </td>
                                                    <td>
                                                      {
                                                        datas?.adminOverview
                                                          ?.opportunityStageDates[
                                                          item
                                                        ]?.days
                                                      }
                                                    </td>
                                                  </tr>
                                                );
                                              })}
                                          </tbody>
                                        </table>
                                      </div>}
                                  </div>
                                </li>
                                {/* {datas?.adminOverview && !datas?.adminOverview.message &&
                                Object.keys(datas?.adminOverview?.adminOverview).map(
                                  (item, index) => {
                                    return (
                                      item !== 'opportunityStageDates' &&
                                      (leadPermission?.super_admin || leadPermission?.opportunities?.fields[`opportunity_admin_${item.toLowerCase().replaceAll(" ", "_")}`]) &&
                                      <li key={index} className="mb-4">
                                        <div className="row align-items-center">
                                          <div className="col-auto">
                                            <div style={{ textTransform: 'capitalize' }} className="h5 mb-0">{item.replace(/_/g, ' ')}</div>
                                            <span className="small text-muted">
                                              {datas?.adminOverview?.adminOverview[item]}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  }
                                )} */}
                                {datas.adminOverview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.opportunities
                                      ?.fields[
                                    `opportunity_admin_created_date`
                                    ] === "on") && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Created Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.adminOverview?.adminOverview?.created_date != "----"
                                              ? <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.adminOverview?.adminOverview?.created_date
                                                }
                                              />
                                              : "----"}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.adminOverview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.opportunities
                                      ?.fields[
                                    `opportunity_admin_updated_date`
                                    ] === "on") && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Updated Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.adminOverview?.adminOverview?.updated_date != "----"
                                              ? <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.adminOverview?.adminOverview?.updated_date
                                                }
                                              />
                                              : "----"}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.adminOverview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.opportunities
                                      ?.fields[
                                    `opportunity_admin_${datas.adminOverview?.adminOverview?.unqualified_date
                                      ?.replaceAll(
                                        " ",
                                        "_"
                                      )}`
                                    ] === "on") && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Unqualified Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.adminOverview?.adminOverview?.unqualified_date
                                              != "----"
                                              ? <Handle_convert_system_timezone
                                                dateAndTime={
                                                  datas.adminOverview?.adminOverview?.unqualified_date

                                                }
                                              />
                                              : "----"}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                {datas.adminOverview &&
                                  (leadPermission?.super_admin ||
                                    leadPermission?.opportunities
                                      ?.fields[
                                    `opportunity_admin_${datas.adminOverview?.adminOverview?.unqualified_owner?.replaceAll(
                                      " ",
                                      "_"
                                    )}`
                                    ] === "on") && (
                                    <li className="mb-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">
                                            {`Unqualified Date`}
                                          </div>
                                          <span className="small text-muted">
                                            {datas.adminOverview?.adminOverview?.unqualified_owner != "----"
                                              ?
                                              datas.adminOverview?.adminOverview?.unqualified_owner

                                              : "----"}
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                              </ul>}
                            </div>
                          </div>
                        </MDBTabsPane>
                        <MDBTabsPane show={justifyActive3 === "tab2"}>
                          <div className="card">
                            <div className="card-body">
                              {datas.timeLine &&
                                !datas.timeLine.message &&
                                datas.timeLine.map((item, index) => {
                                  return (
                                    <div key={index} className="timeline_item ">
                                      <img
                                        className="tl_avatar"
                                        src={
                                          item?.avatar &&
                                            item?.avatar.includes("http")
                                            ? item?.avatar
                                            : `${config.baseurl2}${item?.avatar} `
                                        }
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
                                          {<Handle_convert_system_timezone
                                            dateAndTime={item.activity_date_time}
                                          />}
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
                    </div>}
                </div>}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewPiplines;
