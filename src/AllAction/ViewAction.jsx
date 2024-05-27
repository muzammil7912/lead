import React, { useState, useContext, useEffect } from "react";
import { Translation } from "../components/Translation";
import useFetch from "../customHooks/useFetch";
import { MainHeadingContext } from "../context/MainHeadingContext";
import Loader from "../components/common/Loading";
import { Link, useParams } from "react-router-dom";
import img1 from "../dist/webImages/justcall-logo.webp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { StringConvert } from "../components/StringConvert";
import config from "../services/config.json";
import { FaFolder } from "react-icons/fa";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import $ from "jquery";
import ViewProject from "../Project/AllPiplines/ViewProject";
import Media_image_display from "../Lead/Media_image_display";

const ViewAction = ({ translation }) => {
    const { id } = useParams();
    const [member, setMember] = useState('');
    const [follower, setFollower] = useState('');
    const { addHeading } = useContext(MainHeadingContext);
    const [editLeadFeild, setEditLeadFeild] = useState("");
    const [justifyActive, setJustifyActive] = useState("tab1");
    const [justifyActive2, setJustifyActive2] = useState("tab20");
    const [justifyActive3, setJustifyActive3] = useState("tab1");
    const [justifyActive4, setJustifyActive4] = useState("tab1");
    const [assettab, setAssettab] = useState("tab1");
    const { leadPermission } = useContext(MainLeadPermissionContext);
    const { data: viewAction, loading, error } = useFetch('', `getEditViewPiplineEvent/${id}`);
    const [assetsnotes, setAssetsNotes] = useState("");
    useEffect(() => {
        if (viewAction && !viewAction.message) {
            addHeading(`Action - ${viewAction?.event_data?.event_title}`);
            setEditLeadFeild(viewAction?.all_fields);
            setAssetsNotes(viewAction?.assets);
            setMember(viewAction?.members)
            setFollower(viewAction?.followers)
        }
    }, [viewAction]);

    console.log(leadPermission)


    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };
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
    const handleToggle = (e) => {
        e.preventDefault();
        $(e.target).closest(".card").toggleClass("card-collapsed");
    };

    const handleFullScreen = (e) => {
        e.preventDefault();
        $(e.target).closest(".card").toggleClass("card-fullscreen");
    };

    if (loading) return <Loader />;
    if (viewAction && !viewAction.message) {
        var initialValues = viewAction?.event_data;
        initialValues = {
            ...initialValues,
            actionource: viewAction?.event_data?.lead_actionource,
        };
        var imgVal = viewAction?.event_data?.avatar;
    }

    console.log(leadPermission)

    return (
        initialValues && !initialValues.message && viewAction && !viewAction.message && (
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
                                                <a href={`https://api.whatsapp.com/send?phone=${initialValues?.number}`}>
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
                                                Project Owner: {viewAction?.event_data?.owner_to_name}
                                                <br />
                                                Assigned to: {viewAction?.event_data?.assigned_to_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="score">{initialValues?.score_number}</div>
                                    <div className="card-options">
                                        <div>
                                            <label className="form-label">
                                                Stage:
                                                <br />
                                            </label>{" "}
                                            {Translation(
                                                translation,
                                                viewAction?.event_data?.stage_name
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
                                                                leadPermission?.action?.fields?.actions_title ===
                                                                "true" ||
                                                                leadPermission?.action?.fields?.actions_title ===
                                                                "-1" ? (
                                                                <h4 className="form-group ">
                                                                    {Translation(
                                                                        translation,
                                                                        `${viewAction?.event_data?.event_title}`
                                                                    )}{" "}
                                                                </h4>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_description === "true" ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_description === "-1" ? (
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <p className="mb-0">
                                                                        {Translation(
                                                                            translation,
                                                                            `${viewAction?.event_data?.event_description}`
                                                                        )}
                                                                    </p>{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.action?.fields?.actions_start_date ===
                                                            "true" ||
                                                            leadPermission?.action?.fields?.actions_start_date ===
                                                            "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translation, "Start Date")}
                                                                    </label>
                                                                    {viewAction?.event_data?.start_date}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_end_date === "true" ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_end_date === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translation, "End Date")}
                                                                    </label>
                                                                    {Translation(
                                                                        translation,
                                                                        `${viewAction?.event_data?.end_date}`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_location === "true" ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_location === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translation, "Location")}
                                                                    </label>
                                                                    {viewAction?.event_data?.location}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translation, "Creator")}
                                                                    </label>
                                                                    {viewAction?.event_data?.owner_to_name}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_admin_create_date ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translation, "Created")}
                                                                    </label>
                                                                    {Translation(
                                                                        translation,
                                                                        `${viewAction?.event_data?.date_created}`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.action?.fields
                                                                ?.actions_admin_updated_date === "true" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translation, "Updated")}
                                                                    </label>
                                                                    {Translation(
                                                                        translation,
                                                                        `${viewAction?.event_data?.last_updated}`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="card-footer">
                                                        <div className="clearfix">
                                                            <div className="float-left"><strong>{"50%"}</strong></div>
                                                            <div className="float-right"><small className="text-muted">Progress</small></div>
                                                        </div>
                                                        <div className="progress progress-xs">
                                                            <div className="progress-bar bg-red" role="progressbar" style={{ width: `${50}%` }} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
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
                                                        {editLeadFeild && Object.keys(editLeadFeild).map((item, index) => {
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
                                        <div className="section-body">
                                            <div className="container-fuild">
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        {viewAction.all_fields && !viewAction.all_fields.message ? (
                                                            <div className="innerNav">
                                                                <MDBTabsContent>
                                                                    {Object.keys(viewAction.all_fields).map(function (
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
                                                                                            viewAction.all_fields[item]
                                                                                        ).map((item1, index) => {

                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    <h3 className="card-title mb-3">
                                                                                                        {Translation(
                                                                                                            translation,
                                                                                                            item1.replace(/_/g, " ")
                                                                                                        )}
                                                                                                    </h3>
                                                                                                    {Object.keys(viewAction.all_fields[item][item1]).map((item2, index2) => {
                                                                                                        let permission = `actions_${viewAction.all_fields[item][item1][item2]?.label.replaceAll(' ', '_')}`
                                                                                                        return (
                                                                                                            (leadPermission?.super_admin || leadPermission?.action?.fields[permission] === 'true' || leadPermission?.action?.fields[permission] === '-1') && viewAction.all_fields[item][item1][item2].value && (
                                                                                                                <div key={index2} className="col-md-6" >
                                                                                                                    <div className="form-group">
                                                                                                                        <label className="form-label">
                                                                                                                            {Translation(translation, viewAction.all_fields[item][item1][item2]?.label)}
                                                                                                                        </label>
                                                                                                                        {Translation(translation, viewAction.all_fields[item][item1][item2]?.value
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
                                        <i className="fa fa-sticky-note text-muted"></i> Dependency{" "}
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
                                <div className="card-body">
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-status bg-blue"></div>

                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fa fa-sticky-note text-muted"></i> Frequency{" "}
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
                                <div className="card-body">
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

                                <div className="card-body">
                                    {assetsnotes && !assetsnotes.message &&
                                        assetsnotes?.map((item, index) => {
                                            return (
                                                leadPermission?.super_admin ||
                                                    leadPermission?.action?.fields
                                                        ?.action_prj_notes === "true" ||
                                                    leadPermission?.action?.fields
                                                        ?.action_prj_notes === "-1" ?
                                                    <div className="summernote" key={index}>
                                                        <div className="card blog_single_post">
                                                            <div className="card-body">
                                                                <p>{item.note_value}</p>
                                                            </div>
                                                            <div className="card-footer p-2">
                                                                <div className="clearfix">
                                                                    <div className="float-left">
                                                                        <strong>{item.created_time}</strong>
                                                                    </div>
                                                                    <div className="float-right">
                                                                        Posted By{" "}
                                                                        <small className="text-muted">
                                                                            {item.f_name +
                                                                                "" +
                                                                                item.l_name +
                                                                                item.email}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> : ''
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-status bg-blue"></div>

                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fa fa-sticky-note text-muted"></i> Notifications{" "}
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
                                <div className="card-body">
                                </div>
                            </div>
                            {/* <div className="card">
                                <div className="card-status bg-blue"></div>

                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fa fa-users text-muted"></i> action (#)
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

                                <div className="card-body">action List</div>
                            </div> */}
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
                                                {viewAction?.event_data?.tags}
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
                                        {Translation(translation, "Guest")}{" "}
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
                                        {leadPermission?.super_admin ||
                                            leadPermission?.action?.fields
                                                ?.action_prj_relatedto === "true" ||
                                            leadPermission?.action?.fields
                                                ?.action_prj_relatedto === "-1" ?
                                            <li className="online mb-2">
                                                <Link>
                                                    <div className="media">
                                                        <img
                                                            className="media-object "
                                                            src="./media/avatar1.jpg"
                                                            alt=""
                                                        />
                                                        <div className="media-body">
                                                            <span className="name">
                                                                {Translation(translation, viewAction?.relatedData?.opportunity_title)}
                                                            </span>
                                                            <span className="badge badge-outline status" />
                                                            <span className="name">
                                                                {Translation(translation, viewAction?.relatedData?.uname)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li> : ''}
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        {" "}
                                        {Translation(translation, "Members")}{" "}
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
                                        {member && !member.message &&
                                            member.map((item, index) => {
                                                return (
                                                    <li key={index} className="online mb-2">
                                                        <Link>
                                                            <div className="media">
                                                                <img
                                                                    className="media-object "
                                                                    src="./media/avatar1.jpg"
                                                                    alt=""
                                                                />
                                                                <div className="media-body">
                                                                    <span className="name">
                                                                        {Translation(translation, item?.uname)}
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
                                        {Translation(translation, "Followers")}
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
                                            {follower && !follower.message &&
                                                follower.map((item, index) => {
                                                    return (
                                                        <div key={index} className="chip">
                                                            <span
                                                                className="avatar"
                                                                style={{
                                                                    backgroundImage: `url("https://www.gravatar.com/avatar/${item?.avatar}")`,
                                                                }}
                                                            />
                                                            <div className="d-flex align-item-center">
                                                                <span>
                                                                    {Translation(
                                                                        translation,
                                                                        item?.uname
                                                                    )}
                                                                </span>
                                                                <a className="btnunfollow">
                                                                    <i className="fe fe-x" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-6 col-sm-12">
                            {/* <div className="card">
                                <div className="card-status bg-blue"></div>
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fa fa-users text-muted"></i> Calendar
                                        <small>Detail Over Time</small>
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
                                    Here we will have a calendar showing:
                                    <br />
                                    Created Date
                                    <br />
                                    Actives
                                    <br />
                                    Follow Ups
                                    <br />
                                    Meeting
                                    <br />
                                    action Dates
                                    <br />
                                    Date of Opportunity Creation
                                    <br />
                                    Date of Stage Changes
                                    <br />
                                    Date of Forecast Closed Date (opportunities)
                                    <br />
                                </div>
                            </div> */}
                            {/* <div className="card">
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
                            </div> */}
                            {/* <div className="card">
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
                                    <div className="row clearfix">
                                        <div className="col-lg-1 col-md-2">
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fe fe-calendar"></i>
                                                </button>

                                                <div className="dropdown-menu">
                                                    <div className="inline-datepicker"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-5 col-md-6">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="example-text-input"
                                                    placeholder="What do you need to get done?"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group multiselect_div">
                                                <select
                                                    id="single-selection"
                                                    name="single_selection"
                                                    className="multiselect multiselect-custom"
                                                >
                                                    <option value="Call">Call</option>

                                                    <option value="Follow Up">Follow Up</option>

                                                    <option value="Meeting">Meeting</option>

                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group multiselect_div">
                                                <select
                                                    id="single-selection"
                                                    name="single_selection"
                                                    className="multiselect multiselect-custom"
                                                >
                                                    <option value="Low">Low</option>

                                                    <option value="Medium">Medium</option>

                                                    <option value="High">High</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-1 col-md-2">
                                            <img
                                                className="avatar"
                                                src="../react_lead/assets/images/xs/avatar4.jpg"
                                            />
                                        </div>

                                        <div className="col-lg-1 col-md-2">
                                            <button
                                                type="button"
                                                className="btn btn-icon btn-primary btn-success"
                                            >
                                                <i className="fe fe-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="card card-collapse">
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
                                        {Array.isArray(viewAction?.assets_files) && viewAction?.assets_files?.map(items => {
                                            return (
                                                <div
                                                    className="col-sm-6 col-md-6 col-lg-4 card_margin_left"
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
                                                                        translation,
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
                                                                        translation,
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
                                </div>
                            </div>
                            {/* <div className="card">
                                <div className="card-status bg-blue"></div>
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fa fa-calendar-check-o text-muted"></i>{" "}
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
                                    <div className="row clearfix">
                                        <div className="col-lg-1 col-md-2">
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fe fe-calendar"></i>
                                                </button>

                                                <div className="dropdown-menu">
                                                    <div className="inline-datepicker"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-5 col-md-6">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="example-text-input"
                                                    placeholder="What do you need to get done?"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group multiselect_div">
                                                <select
                                                    id="single-selection"
                                                    name="single_selection"
                                                    className="multiselect multiselect-custom"
                                                >
                                                    <option value="Call">Call</option>

                                                    <option value="Follow Up">Follow Up</option>

                                                    <option value="Meeting">Meeting</option>

                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group multiselect_div">
                                                <select
                                                    id="single-selection"
                                                    name="single_selection"
                                                    className="multiselect multiselect-custom"
                                                >
                                                    <option value="Low">Low</option>

                                                    <option value="Medium">Medium</option>

                                                    <option value="High">High</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-1 col-md-2">
                                            <img
                                                className="avatar"
                                                src="../react_lead/assets/images/xs/avatar4.jpg"
                                            />
                                        </div>

                                        <div className="col-lg-1 col-md-2">
                                            <button
                                                type="button"
                                                className="btn btn-icon btn-primary btn-success"
                                            >
                                                <i className="fe fe-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {(leadPermission?.super_admin ||
                                leadPermission?.action?.fields.action_admininfo)
                                &&
                                <div className="card">
                                    <div className="card-status bg-blue"></div>
                                    <div className="card-header">
                                        <h3 className="card-title">
                                            <i className="fa fa-user-secrect text-muted"></i> Admin
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
                                                            <li className="mt-4">
                                                                <div className="row align-items-center">
                                                                    <div className="col-auto">
                                                                        {
                                                                            (leadPermission?.super_admin || leadPermission?.action?.fields[`actions_admin_prjstage_dates`]) &&
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
                                                                                        {viewAction.overView && !viewAction.overView.message &&
                                                                                            viewAction.overView.LeadStageDates.map((item, index) => {
                                                                                                return (
                                                                                                    <tr key={index}>
                                                                                                        <td>
                                                                                                            {item?.name}
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {item?.assign_on}
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {item?.days}
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
                                                            {viewAction.overView && !viewAction.overView.message &&
                                                                Object.keys(viewAction.overView.OverView).map(
                                                                    (item, index) => {
                                                                        return (
                                                                            (leadPermission?.super_admin || leadPermission?.action?.fields[`actions_admin_${item.toLowerCase().replaceAll(" ", "_")}`]) &&
                                                                            item !== 'LeadStageDates' &&
                                                                            <li key={index} className="mb-4">
                                                                                <div className="row align-items-center">
                                                                                    <div className="col-auto">
                                                                                        <div className="h5 mb-0">{item}</div>
                                                                                        <span className="small text-muted">
                                                                                            {viewAction.overView.OverView['Created Date']}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    }
                                                                )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </MDBTabsPane>
                                            <MDBTabsPane show={justifyActive3 === "tab2"}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        {viewAction.timeLine && !viewAction.timeLine.message &&
                                                            viewAction.timeLine.map((item, index) => {
                                                                return (
                                                                    <div key={index} className="timeline_item ">
                                                                        <img
                                                                            className="tl_avatar"
                                                                            src={item.avatar}
                                                                            alt=""
                                                                        />
                                                                        <span>
                                                                            <a>
                                                                                {Translation(
                                                                                    translation,
                                                                                    `${item.f_name} ${item.l_name} `
                                                                                )}
                                                                            </a>
                                                                            {`(${item.email})`}
                                                                            <small className="float-right text-right">
                                                                                {item.activity_date_time}
                                                                            </small>
                                                                        </span>
                                                                        <div className="msg">
                                                                            <div>
                                                                                {Translation(
                                                                                    translation,
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
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ViewAction;