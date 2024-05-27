import React, { useState, useContext, useEffect } from "react";
import { Translation } from "../../components/Translation";
import useFetch from "../../customHooks/useFetch";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import Loader from "../../components/common/Loading";
import { Link, useParams } from "react-router-dom";
import config from "../../services/config.json";
import img1 from "../../dist/webImages/justcall-logo.webp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import { FaFolder } from "react-icons/fa";
import { StringConvert } from "../../components/StringConvert";
import $ from "jquery";
import Media_image_display from "../../Lead/Media_image_display";
import MeetingCard from "../../components/common/MeetingCard";
import ActionCard from "../../components/common/ActionCard";
import EditLeadCalender from "../../Lead/EditLeadCalender";
import { MainTranslationContexts } from "../../context/MainTranslationContexts";
import { HandleConvertTimeOnlyDate } from "../../components/AllCustomFuntion";

const ViewProject = () => {
    const { translations } = useContext(MainTranslationContexts);
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
    const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let timeZone3 = timeZone2.split("/")
    const {
        data: viewProject,
        loading,
        error,
    } = useFetch('', `getEditProjects/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`);
    const [assetsnotes, setAssetsNotes] = useState("");
    useEffect(() => {
        if (viewProject && !viewProject.message) {
            addHeading(`Project - ${viewProject?.lead_data?.project_title}`);
            setEditLeadFeild(viewProject?.all_fields);
            setAssetsNotes(viewProject?.note);
            setMember(viewProject?.membersData)
            setFollower(viewProject?.followersData)
        }
    }, [viewProject]);

    console.log(viewProject)


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

    if (loading)
        return <Loader />;
    if (viewProject && !viewProject.message) {
        var initialValues = viewProject?.lead_data;
        initialValues = {
            ...initialValues,
            projectsource: viewProject?.lead_data?.lead_projectsource,
        };
        var imgVal = viewProject?.lead_data?.avatar;
    }

    console.log(leadPermission)

    return (
        initialValues && !initialValues.message && viewProject && !viewProject.message && (
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
                                                Project Owner: {viewProject?.lead_data?.owner_to_name}
                                                <br />
                                                Assigned to: {viewProject?.lead_data?.assigned_to_name}
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
                                                translations,
                                                viewProject?.lead_data?.stage_name
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
                                                                leadPermission?.projects?.fields?.projects_prj_title ===
                                                                "true" ||
                                                                leadPermission?.projects?.fields?.projects_prj_title ===
                                                                "-1" ? (
                                                                <h4 className="form-group ">
                                                                    {Translation(
                                                                        translations,
                                                                        `${viewProject?.lead_data?.project_title}`
                                                                    )}{" "}
                                                                </h4>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_description === "true" ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_description === "-1" ? (
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <p className="mb-0">
                                                                        {Translation(
                                                                            translations,
                                                                            `${viewProject?.lead_data?.project_description}`
                                                                        )}
                                                                    </p>{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_stage === "true" ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_stage === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Stage")}
                                                                    </label>
                                                                    {viewProject?.lead_data?.stage_name}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields?.projects_prj_status ===
                                                            "true" ||
                                                            leadPermission?.projects?.fields?.projects_prj_status ===
                                                            "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Status")}
                                                                    </label>
                                                                    {Translation(translations,
                                                                        viewProject?.lead_data?.status_name
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields?.projects_prj_startdate ===
                                                            "true" ||
                                                            leadPermission?.projects?.fields?.projects_prj_startdate ===
                                                            "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Start Date")}
                                                                    </label>
                                                                    {viewProject?.lead_data?.start_date}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_enddate === "true" ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_enddate === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "End Date")}
                                                                    </label>
                                                                    {Translation(
                                                                        translations,
                                                                        `${viewProject?.lead_data?.end_date}`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_location === "true" ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_prj_location === "-1" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Location")}
                                                                    </label>
                                                                    {viewProject?.lead_data?.project_location}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Creator")}
                                                                    </label>
                                                                    {viewProject?.lead_data?.owner_to_name}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_admin_create_date ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Created")}
                                                                    </label>
                                                                    {Translation(
                                                                        translations,
                                                                        `${viewProject?.lead_data?.created_date}`
                                                                    )}{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {leadPermission?.super_admin ||
                                                            leadPermission?.projects?.fields
                                                                ?.projects_admin_updated_date === "true" ? (
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label className="form-label">
                                                                        {Translation(translations, "Updated")}
                                                                    </label>
                                                                    {Translation(
                                                                        translations,
                                                                        `${viewProject?.lead_data?.updated_date}`
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
                                                        {viewProject.all_fields && !viewProject.all_fields.message ? (
                                                            <div className="innerNav">
                                                                <MDBTabsContent>
                                                                    {Object.keys(viewProject.all_fields).map(function (
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
                                                                                            viewProject.all_fields[item]
                                                                                        ).map((item1, index) => {

                                                                                            return (
                                                                                                <div key={index}>
                                                                                                    <h3 className="card-title mb-3">
                                                                                                        {Translation(
                                                                                                            translations,
                                                                                                            item1.replace(/_/g, " ")
                                                                                                        )}
                                                                                                    </h3>
                                                                                                    {Object.keys(viewProject.all_fields[item][item1]).map((item2, index2) => {
                                                                                                        let labelName = `projects_${viewProject.all_fields[item][item1][item2]?.label.replaceAll(' ', '_')}`
                                                                                                        return (
                                                                                                            (leadPermission?.super_admin || leadPermission?.projects?.fields[labelName] === 'true' || leadPermission?.projects?.fields[labelName] === '-1') && viewProject.all_fields[item][item1][item2].value && (
                                                                                                                <div key={index2} className="col-md-6" >
                                                                                                                    <div className="form-group">
                                                                                                                        <label className="form-label">
                                                                                                                            {Translation(translations, viewProject.all_fields[item][item1][item2]?.label)}
                                                                                                                        </label>
                                                                                                                        {Translation(translations, viewProject.all_fields[item][item1][item2]?.value
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

                                <div className="card-body">
                                    {assetsnotes && !assetsnotes.message &&
                                        assetsnotes?.map((item, index) => {
                                            return (
                                                leadPermission?.super_admin ||
                                                    leadPermission?.projects?.fields
                                                        ?.projects_prj_notes === "true" ||
                                                    leadPermission?.projects?.fields
                                                        ?.projects_prj_notes === "-1" ?
                                                    <div className="summernote" key={index}>
                                                        <div className="card blog_single_post">
                                                            <div className="card-body">
                                                                <p dangerouslySetInnerHTML={{
                                                                    __html: item.note_value,
                                                                }}></p>
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
                                    {Array.isArray(viewProject?.project) && viewProject?.project.map((item, i) => {
                                        return (
                                            <div key={i} className="col-md-12 col-lg-12 col-sm-12"> <div className="c2_own"><ul className="right_chat list-unstyled p-0 right_chat_vl">
                                                <li className="online mb-2">
                                                    <Link
                                                        to={

                                                            `/${config.ddemoss
                                                            }view/project/${item.prj_id
                                                            }`
                                                        }
                                                    >
                                                        <a href="#" className="cc_cls" data-row="12"><i className="fa-solid fa-xmark"></i></a>
                                                        <div className="media">
                                                            <img className="media-object " src={item.project_feature_image} alt="" />
                                                            <div className="media-body">
                                                                <span className="name">{item?.project_title} </span>
                                                                <div className="message">{item?.name}</div>
                                                                {item.start_date && <span className="message">{item.start_date}</span>} <span className="dashsymbol"> | - | </span> {item.end_date && <span className="message">{item.end_date}</span>}
                                                                <span className="badge badge-outline status"></span>

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
                                                {viewProject?.lead_data?.tags}
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
                                        {Translation(translations, "Related To Contact")}{" "}
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
                                            leadPermission?.projects?.fields
                                                ?.projects_prj_relatedto === "true" ||
                                            leadPermission?.projects?.fields
                                                ?.projects_prj_relatedto === "-1" ?
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
                                                                {Translation(translations, viewProject?.relatedData?.opportunity_title)}
                                                            </span>
                                                            <span className="badge badge-outline status" />
                                                            <span className="name">
                                                                {Translation(translations, viewProject?.relatedData?.uname)}
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
                                        {Translation(translations, "Members")}{" "}
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
                                                                        {Translation(translations, item?.uname)}
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
                                                                        translations,
                                                                        item?.uname
                                                                    )}
                                                                </span>

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
                            <div className="card">
                                <div className="card-status bg-blue"></div>
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fa fa-users text-muted"></i> Calendar
                                        <small>Detail Over Time { (Array.isArray(viewProject.clanderEventsName)&&(viewProject.clanderEventsName).length>0)? (viewProject.clanderEventsName.filter(eve=>eve.calendar_default==="1")[0])?`( ${( viewProject.clanderEventsName.filter(eve=>eve.calendar_default==="1"))[0].calendar_name} )`:"":""}</small>
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
                                    <EditLeadCalender view={true} module={"project"} idd={id} data={viewProject?.clanderEventsData} />
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
                                        {Array.isArray(viewProject?.assets) && viewProject?.assets?.map(items => {
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
                                </div>
                            </div>
                            <div className="card">
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

                                    {Array.isArray(viewProject?.actionEventsData) &&
                                        <ActionCard
                                            lists={viewProject?.actionEventsData}
                                            actionData={viewProject}
                                            editRemove={true}
                                        />}
                                </div>
                            </div>
                            <div className="card">
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

                                    {Array.isArray(viewProject?.meetingEventsData) &&
                                        <MeetingCard
                                            lists={viewProject?.meetingEventsData}
                                            actionData={viewProject}
                                            editRemove={true}
                                        />}
                                </div>
                            </div>
                            {(leadPermission?.super_admin ||
                                leadPermission?.projects?.fields.projects_admininfo)
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
                                                                            (leadPermission?.super_admin || leadPermission?.projects?.fields[`projects_admin_prjstage_dates`]) &&
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
                                                                                        {viewProject.overView && !viewProject.overView.message &&
                                                                                            Object.keys(viewProject.overView.projects_pipline_stages).map((item, index) => {
                                                                                                return (
                                                                                                    <tr key={index}>
                                                                                                        <td>
                                                                                                            {
                                                                                                                viewProject.overView.projects_pipline_stages[
                                                                                                                    item
                                                                                                                ]?.name
                                                                                                            }
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <HandleConvertTimeOnlyDate
                                                                                                                dateAndTime={
                                                                                                                    viewProject.overView.projects_pipline_stages[
                                                                                                                        item
                                                                                                                    ]?.assign_on
                                                                                                                }
                                                                                                            />
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {
                                                                                                                viewProject.overView.projects_pipline_stages[
                                                                                                                    item
                                                                                                                ]?.days
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
                                                            {viewProject.overView && !viewProject.overView.message &&
                                                                Object.keys(viewProject.overView).map(
                                                                    (item, index) => {
                                                                        console.log(`projects_admin_${item.toLowerCase().replaceAll(" ", "_")}`)
                                                                        return (
                                                                            (leadPermission?.super_admin || leadPermission?.projects?.fields[`projects_admin_${item.toLowerCase().replaceAll(" ", "_")}`]) &&
                                                                            item !== 'projects_pipline_stages' &&
                                                                            <li key={index} className="mb-4">
                                                                                <div className="row align-items-center">
                                                                                    <div className="col-auto">
                                                                                        <div className="h5 mb-0">{item}</div>
                                                                                        <span className="small text-muted">
                                                                                            {viewProject.overView[item]}
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
                                                        {viewProject.timeLine && !viewProject.timeLine.message &&
                                                            viewProject.timeLine.map((item, index) => {
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
                                                                                    translations,
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
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ViewProject;