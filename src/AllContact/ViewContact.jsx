import React, { useState, useContext, useEffect, useRef } from "react";
import { Translation } from "../components/Translation";
import useFetch from "../customHooks/useFetch";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link, useParams } from "react-router-dom";
import usePost from "../customHooks/usePost";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import img1 from "../dist/webImages/justcall-logo.webp";
import Loader from "../components/common/Loading";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { StringConvert } from "../components/StringConvert";
import config from "../services/config.json";
import {
  handleFullScreen,
  handleToggle,
  Handle_convert_system_timezone,
} from "../components/AllCustomFuntion";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
const ViewContact = () => {
  const { id } = useParams();
  const { translations } = useContext(MainTranslationContexts);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { addHeading } = useContext(MainHeadingContext);
  const [respremetion, apiMethodPremetion] = usePost();
  const [rescreatBy, apiMethodcreatBy] = usePost();
  const [resAssigned, apiMethodAssigned] = usePost();
  const [assetsnotes, setAssetsNotes] = useState("");
  const [datas, setDatas] = useState("");
  const [assetsFile, setAssetsFile] = useState("");
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [creatBy, setCreatBy] = useState("");
  const [assigned, setAssigned] = useState("");
  const [followers, setfollowers] = useState([]);
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [res1, apiMethod1] = usePost();

  const {
    data: viewClient,
    loading,
    error,
  } = useFetch("", `getViewContact/${id}`);
  useEffect(() => {
    if (viewClient && !viewClient.message) {
      setDatas(viewClient);
      setfollowers(viewClient.followers);
      setAssetsNotes(viewClient.noteData);
    }
  }, [viewClient]);

  useEffect(() => {
    if (viewClient && !viewClient.message) {
      let formData = new FormData();
      formData.append("general", "get_contactType_edit");
      formData.append("mode", viewClient.contactData.type_of_contact);
      apiMethod1("postEditTypeContact", formData);
    }
  }, [viewClient]);

  useEffect(() => {
    if (viewClient && !viewClient.message) {
      addHeading(`Contact - ${viewClient.contactData.fullname}`);
      setAssetsFile(viewClient.Assets_File);
      setEditLeadFeild(viewClient.all_fields);
      let formViewUserName = new FormData();
      let formAssigned = new FormData();
      if (viewClient.contactData.lead_by) {
        formViewUserName.append("id", `${viewClient.contactData.lead_by}`);
        apiMethodcreatBy(`postViewUserName`, formViewUserName);
      }
      if (viewClient.contactData.lead_assigned_to) {
        formAssigned.append("id", `${viewClient.contactData.lead_assigned_to}`);
        apiMethodAssigned(`postViewUserName`, formAssigned);
      }
    }
  }, [viewClient]);

  const handleJustifyClick4 = (value) => {
    if (value == justifyActive3) {
      return;
    }
    setJustifyActive3(value);
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

  if (loading || respremetion.isLoading || !res1) return <Loader />;
  if (viewClient && !viewClient.message) {
    var initialValues = viewClient.contactData[0];
    initialValues = {
      ...initialValues,
      contactsource: viewClient.contactData[0]?.lead_prospect_source,
    };
    var imgVal = viewClient?.contactData[0]?.avatar
      ? viewClient?.contactData[0]?.avatar.includes("http")
        ? viewClient?.contactData[0]?.avatar
        : `${config.baseurl2}${viewClient.contactData[0]?.avatar}`
      : permissions["system-avatar-image"]?.setting_value
      ? `${config.baseurl2}${permissions["system-default-avatar-image"]?.setting_value}`
      : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160";
  }
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
                        Contact Created by: {creatBy}
                        <br />
                      </p>
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
                  <h3 className="card-title">Contact Info</h3>
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
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-md-12">
                          {leadPermission?.super_admin ||
                          leadPermission?.contacts?.fields?.contacts_fname ===
                            "true" ||
                          leadPermission?.contacts?.fields?.contacts_fname ===
                            "-1" ? (
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Contact Name")}
                              </label>
                              {Translation(
                                translations,
                                `${datas.contactData.fullname}`
                              )}{" "}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {/* {leadPermission?.super_admin ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_lname === "true" ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_lname === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Last Name")}
                                                                    </label>
                                                                    {Translation(
                                                                        translations,
                                                                        `${datas.contactData.lname}`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )} */}
                        {leadPermission?.super_admin ||
                        leadPermission?.contacts?.fields
                          ?.contacts_phone_number === "true" ||
                        leadPermission?.contacts?.fields
                          ?.contacts_phone_number === "-1" ? (
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Phone Number")}
                              </label>
                              {datas.contactData.number}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {leadPermission?.super_admin ||
                        leadPermission?.contacts?.fields?.contacts_email ===
                          "true" ||
                        leadPermission?.contacts?.fields?.contacts_email ===
                          "-1" ? (
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "E-mail")}
                              </label>
                              {datas.contactData.email}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {leadPermission?.super_admin ||
                        leadPermission?.contacts?.fields
                          ?.contacts_contact_type === "true" ||
                        leadPermission?.contacts?.fields
                          ?.contacts_contact_type === "-1" ? (
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Type of Contact")}
                              </label>
                              <p className="mb-0">
                                {Translation(
                                  translations,
                                  `${res1?.data?.GetData?.type_name}`
                                )}
                              </p>{" "}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* {leadPermission?.super_admin ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_lead_stage === "true" ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_lead_stage === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Lead Stage")}
                                                                    </label>
                                                                    {Translation(
                                                                        translations,
                                                                        `${datas.lead_stages &&
                                                                        !datas.lead_stages.message &&
                                                                        datas.lead_stages.filter(
                                                                            (item) =>
                                                                                item.id ==
                                                                                datas.contactData.lead_stage
                                                                        )[0]?.name
                                                                        }`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )} */}

                        {/* {leadPermission?.super_admin ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_email_status === "true" ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_email_status === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Email status")}
                                                                    </label>
                                                                    {Translation(
                                                                        translations,
                                                                        `${datas.contactData.email_status}`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )} */}
                        {/* {leadPermission?.super_admin ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_score_number === "true" ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_score_number === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Score Number")}
                                                                    </label>
                                                                    {datas.contactData.score_number}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )} */}
                        {/* {leadPermission?.super_admin ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_mobile_phone === "true" ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_mobile_phone === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Mobile Phone")}
                                                                    </label>
                                                                    {datas.contactData.mobile_phone}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )} */}
                        {/* {leadPermission?.super_admin ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_birthday === "true" ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_birthday === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Birthday")}
                                                                    </label>
                                                                    {datas.contactData.birthday}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )} */}
                        {leadPermission?.super_admin ||
                        leadPermission?.contacts?.fields
                          ?.contacts_created_date === "true" ||
                        leadPermission?.contacts?.fields
                          ?.contacts_created_date === "-1" ? (
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Created date")}
                              </label>
                              <Handle_convert_system_timezone
                                dateAndTime={datas.contactData.created_date}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {leadPermission?.super_admin ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_updated_date === "true" ||
                                                            leadPermission?.contacts?.fields
                                                                ?.contacts_updated_date === "-1" ? (
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Updated date")}
                                                                    </label>
                                                                    {datas.contactData.updated_date}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
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
                                    backgroundImage: `url(${
                                      item?.avatar.includes(`http`)
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
              <div className="card">
                <div className="card-status bg-blue"></div>

                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-sticky-note text-muted"></i> Notes{" "}
                    <small>Notes About the Meeting</small>
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

                {leadPermission?.super_admin ||
                leadPermission?.contacts?.fields?.contact_note === "true" ||
                leadPermission?.contacts?.fields?.contact_note === "-1" ? (
                  <div className="card-body">
                    {Array.isArray(assetsnotes) &&
                      assetsnotes?.map((item, index) => {
                        return (
                          <div className="summernote" key={index}>
                            <div className="card blog_single_post">
                              {item.note_privacy === "1" && (
                                <div className="text-left">
                                  <span className="tag tag-danger">
                                    Private Note
                                  </span>
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
                                      {`${item?.f_name} ${item?.l_name}  ${item?.email}`}
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
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="card">
                <div className="card-status bg-blue"></div>
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fa fa-user-secrect text-muted"></i> Activities{" "}
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
                        active={justifyActive3 === `tab1`}
                      >
                        Activities
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBTabs>
                  <MDBTabsContent>
                    <MDBTabsPane show={justifyActive3 === "tab1"}>
                      <div className="card">
                        <div className="card-body">
                          {datas.activityMessage &&
                            !datas.activityMessage.message &&
                            datas.activityMessage.map((item, index) => {
                              return (
                                <div key={index} className="timeline_item ">
                                  <img
                                    className="tl_avatar"
                                    src={item.avatar}
                                    alt=""
                                  />
                                  <span>
                                    <a style={{ color: "#00A9BD" }}>
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
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewContact;
