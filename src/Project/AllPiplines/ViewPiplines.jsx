import React, { useState, useContext, useEffect } from "react";
import { Translation } from "../../components/Translation";
import useFetch from "../../customHooks/useFetch";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import Loader from "../../components/common/Loading";
import { Link, useParams } from "react-router-dom";
import usePost from "../../customHooks/usePost";
import FormControl from "../../components/form/FormControl";
import Skeleton from "react-loading-skeleton";
import { AiOutlinePlus } from "react-icons/ai";
import { Monthss } from "../../components/Month";
import { FaSearch } from "react-icons/fa";
import File from "../../components/form/File";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { StringConvert } from "../components/StringConvert";
import $ from "jquery";


const ViewPiplines = ({ translation }) => {
  const { id } = useParams();
  const [res, apiMethod] = usePost()
  const [leadCard, setLeadCard] = useState(true);
  const [tagCard, setTagCard] = useState(true);
  const [locationCard, setLocationCard] = useState(true);
  const [correlationCard, setCorrelationCard] = useState(true);
  const [followerCard, setFollowerCard] = useState(true);
  const { addHeading } = useContext(MainHeadingContext);
  const [datas, setDatas] = useState("");
  const [assetsFile, setAssetsFile] = useState("");
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [followers, setfollowers] = useState([])
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [justifyActive4, setJustifyActive4] = useState("tab1");
  const [resowner, apiMethodowner] = usePost();
  const [assettab, setAssettab] = useState("tab1");
  const [image2, setImage2] = useState("tab1");
  const [showFile, setshowFile] = useState(true)
  const [showMedia, setshowMedia] = useState(false)
  const private_notes = ["private_note"];
  const NoData = 'No Data'


  const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZone3 = timeZone2.split("/")
  const {
    data: viewPipline,
    loading,
    error,
  } = useFetch({ setDatas }, `getEditOpportunity/${id}`);
  useEffect(() => {
    if (viewPipline) {
      addHeading(`Opportunity - ${resowner.data.filter(vals=>vals.id==viewPipline.opportunity_data.assigned_to)[0]?.uname}`);
      setAssetsFile(viewPipline.Assets_File);
      setEditLeadFeild(viewPipline.all_fields);
    }
  }, [viewPipline]);
  const handleFollower = () => {
    setfollowers(datas.lead_followers)
  }

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
  }
  const handleToggle = (e) => {
    e.preventDefault();
    $(e.target).closest(".card").toggleClass("card-collapsed");
  }
  const getName = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", ' ');
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  }
  useEffect(getName, [])
  useEffect(handleFollower, [datas.lead_followers])
  return (
    <div className="section-body mt-3">
      {datas && <div className="editLeadForm">
        <div className="container-fluid">
          <form action="#" name="myForm">
            <div className="row clearfix">
              <div className="col-lg-4 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          {Translation(translation, "Assigned to:")}
                        </label>
                        {Translation(
                          translation,`${resowner.data.filter(vals=>vals.id===datas.opportunity_data.assigned_to)[0]?.uname}
                          (${resowner.data.filter(vals=>vals.id===datas.opportunity_data.assigned_to)[0]?.role_name})`
                        )}{" "}
                      </div>
                      <div className="col-sm-12 mb-3 ">
                        <label className="form-label">
                          {Translation(translation, "Opportunity Owner:")}
                        </label>
                        {Translation(
                          translation,
                          `${resowner.data.filter(vals=>vals.id===datas.opportunity_data.opportunity_owner)[0]?.uname}
                          (${resowner.data.filter(vals=>vals.id===datas.opportunity_data.opportunity_owner)[0]?.role_name})`
                        )}{" "}
                      </div>
                      <hr />
                    </div>

                  </div>
                </div>
                <div className="card leadCards">
                  <div className="card-header">
                    <h3 className="card-title">
                      {Translation(translation, "Lead Info")}
                    </h3>
                    <div className="card-options">
                      <button
                        onClick={() => setLeadCard(!leadCard)}
                        className="btn card-options-collapse"
                        data-toggle="card-collapse"
                        aria-controls="example-collapse-text"
                      >
                        <i
                          className={`fe ${leadCard ? "fe-chevron-up" : " fe-chevron-down"
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                  {leadCard ? (
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {Translation(translation, "Opportunity Title")}
                            </label>
                            {Translation(translation, `${datas.opportunity_data.opportunity_title}`)}{" "}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {Translation(translation, "Opportunity Value")}
                            </label>
                            {Translation(translation, `${datas.opportunity_data.opportunity_value}`)}{" "}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {Translation(translation, "Opportunity Stage")}
                            </label>
                            <p className="mb-0">
                              {Translation(translation, `${datas.opportunity_data.opportunity_stage}`)}
                            </p>{" "}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {Translation(translation, "Lost Reason")}
                            </label>
                            <p className="mb-0">
                              {Translation(translation, `${datas.opportunity_data.opportunity_lost_reason}`)}
                            </p>{" "}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {Translation(translation, "Status")}
                            </label>
                            {datas.opportunity_data.opportunity_status}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {Translation(translation, "Forecast Close Date")}
                            </label>
                            {Translation(translation, `${datas.opportunity_data.forecasted_close_date}`)}{" "}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              {Translation(translation, "Description")}
                            </label>
                            {datas.opportunity_data.opportunity_description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card leadCards">
                  <div className="card-header">
                    <h3 className="card-title">
                      {Translation(translation, "Tags")}
                    </h3>
                    <div className="card-options">
                      <a
                        style={{ color: "#000" }}
                        onClick={() => setTagCard(!tagCard)}
                        aria-controls="example-collapse-text"
                        href="#"
                        className="btn card-options-collapse"
                        data-toggle="card-collapse"
                      >
                        <i
                          className={`fe ${tagCard ? "fe-chevron-up" : " fe-chevron-down"}`}
                        />
                      </a>
                    </div>
                  </div>
                  {tagCard ? (
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            {datas.opportunity_data.tags}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card leadCards">
                  <div className="card-header">
                    <h3 className="card-title">
                      {Translation(translation, "Contacts")}
                    </h3>
                    <div className="card-options">
                      <a
                        style={{ marginRight: "12px" }}
                        onClick={() => setCorrelationCard(!correlationCard)}
                        href="#"
                        className=" card-options-collapse"
                        data-toggle="card-collapse"
                      >
                        <i
                          className={`fe ${correlationCard
                            ? "fe-chevron-up"
                            : " fe-chevron-down"
                            }`}
                        />
                      </a>
                    </div>
                  </div>
                  {correlationCard ? (
                    <div className="card-body p-2">
                      <ul className="right_chat list-unstyled p-0">
                        {datas.contact && datas.contact.map((item, index) => {
                          return (
                            <li key={index} className="online mb-2">
                              <a href="correlation?id=110">
                                <div className="media">
                                  <img
                                    className="media-object "
                                    src="./media/avatar1.jpg"
                                    alt=""
                                  />
                                  <div className="media-body">
                                    <span className="name">
                                      {Translation(translation, item.email)}
                                    </span>
                                    <span className="message">
                                      {Translation(translation, item.fname)}
                                    </span>
                                    <span className="badge badge-outline status" />
                                  </div>
                                </div>
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="card leadCards">
                  <div className="card-header">
                    <h3 className="card-title">
                      {Translation(translation, "Followers")}
                    </h3>
                    <div className="card-options">
                      <a
                        style={{ marginRight: "12px" }}
                        onClick={() => setFollowerCard(!followerCard)}
                        href="#"
                        className="card-options-collapse"
                        data-toggle="card-collapse"
                      >
                        <i
                          className={`fe ${followerCard ? "fe-chevron-up" : " fe-chevron-down"
                            }`}
                        />
                      </a>
                    </div>
                  </div>
                  {followerCard ? (
                    <div className="card-body p-2">
                      <div>
                        <div className="chips">
                          {(datas.opportunity_followers && !datas.opportunity_followers.message) && datas.opportunity_followers.map((item, index) => {
                            return (
                              item.uname &&
                              <div key={index} className="chip">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage: 'url("./media/https://www.gravatar.com/avatar/5cbe1a13df3a66ad15c2c6cc06212c2f?s=160")',
                                  }}
                                />
                                <div className="d-flex align-item-center">
                                  <span>
                                    {Translation(translation, item.uname)}
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
                  ) : null}
                </div>
              </div>
              <div className="col-xl-8 col-lg-8">
                <MDBTabs justify className="mb-2" id="pills-tab">
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab1")}
                      active={justifyActive === "tab1"}
                    >
                      {Translation(translation, "OverView")}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab2")}
                      active={justifyActive === "tab2"}
                    >
                      {Translation(translation, "Follow Ups")}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab3")}
                      active={justifyActive === "tab3"}
                    >
                      {Translation(translation, "Conversation")}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab4")}
                      active={justifyActive === "tab4"}
                    >
                      {Translation(translation, "Assets")}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab5")}
                      active={justifyActive === "tab5"}
                    >
                      {Translation(translation, "Dashboard")}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab6")}
                      active={justifyActive === "tab6"}
                    >
                      {Translation(translation, "Admin")}
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                  <MDBTabsPane show={justifyActive === "tab1"}>
                    {(datas.all_fields.length && !datas.all_fields.message) ? (
                      <div className="innerNav">
                        <MDBTabs
                          justify
                          className="nav d-flex nav-tabs page-header-tab"
                        >
                          {Object.keys(datas.all_fields).map((item, index) => {
                            return (
                              <MDBTabsItem key={index}>
                                <MDBTabsLink
                                  onClick={() =>
                                    handleJustifyClick2(`tab2${index}`)
                                  }
                                  active={justifyActive2 == `tab2${index}`}
                                >
                                  {item}
                                </MDBTabsLink>
                              </MDBTabsItem>
                            );
                          })}
                        </MDBTabs>
                        <MDBTabsContent>
                          {Object.keys(datas.all_fields).map(function (item, i) {
                            return (
                              <MDBTabsPane
                                key={i}
                                show={justifyActive2 == `tab2${i}`}
                              >
                                <div className="card">
                                  <div className="card-body">
                                    {Object.keys(datas.all_fields[item]).map((item1, index) => {
                                      return (
                                        <div key={index}>
                                          <h3 className="card-title mb-3">
                                            {Translation(translation, item1.replace(/_/g, ' '))}
                                          </h3>
                                          {Object.keys(datas.all_fields[item][item1]).map((item2, index2) => {
                                            return (
                                              datas.all_fields[item][item1][item2].value &&
                                              <div key={index2} className="col-md-6">
                                                <div className="form-group">
                                                  <label className="form-label">
                                                    {Translation(translation, datas.all_fields[item][item1][item2]?.label)}
                                                  </label>
                                                  {Translation(translation, datas.all_fields[item][item1][item2]?.value)}
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              </MDBTabsPane>
                            );
                          })}
                        </MDBTabsContent>
                      </div>
                    ): 'No Data'}
                  </MDBTabsPane>
                  <MDBTabsPane show={justifyActive === "tab2"}>
                    <div className="innerNav">
                      <MDBTabs
                        justify
                        className="nav d-flex nav-tabs page-header-tab"
                      >
                        <MDBTabsItem style={{ width: 200 }}>
                          <MDBTabsLink
                            onClick={() => handleJustifyClick5('tab1')}
                            active={justifyActive4 === 'tab1'}
                          >
                            Follow Ups
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClick5('tab2')}
                            active={justifyActive4 === 'tab2'}
                          >
                            Meeting
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClick5('tab3')}
                            active={justifyActive4 === 'tab3'}
                          >
                            Project
                          </MDBTabsLink>
                        </MDBTabsItem>
                      </MDBTabs>
                      <MDBTabsContent>
                        <MDBTabsPane
                          show={justifyActive4 === 'tab1'}
                        >
                          <div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Calendars")}
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
                                <p>Calendars</p>
                              </div>
                            </div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Actions")}
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
                                <p>Actions</p>
                              </div>
                            </div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Risks")}
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
                                <p>Risks</p>
                              </div>
                            </div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Decisions")}
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
                                <p>Decisions</p>
                              </div>
                            </div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Issues")}
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
                                <p>Issues</p>
                              </div>
                            </div>
                          </div>
                        </MDBTabsPane>
                        <MDBTabsPane
                          show={justifyActive4 === 'tab2'}
                        >
                          <h1>Meetings</h1>
                        </MDBTabsPane>
                        <MDBTabsPane
                          show={justifyActive4 === 'tab3'}
                        >
                          <h1>Projects</h1>
                        </MDBTabsPane>
                      </MDBTabsContent>
                    </div>
                  </MDBTabsPane>
                  <MDBTabsPane show={justifyActive === "tab3"}>
                    {Translation(translation, "Conversation")}
                  </MDBTabsPane>
                  <MDBTabsPane show={justifyActive === "tab4"}>
                    <MDBTabs justify className="mb-2 fitContent">
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => handleJustifyClick3("tab1")}
                          active={assettab === "tab1"}
                        >
                          {Translation(translation, "File")}
                        </MDBTabsLink>
                      </MDBTabsItem>
                      <MDBTabsItem>
                        <MDBTabsLink
                          onClick={() => handleJustifyClick3("tab2")}
                          active={assettab === "tab2"}
                        >
                          {Translation(translation, "Note")}
                        </MDBTabsLink>
                      </MDBTabsItem>
                    </MDBTabs>
                    <MDBTabsContent>
                      <MDBTabsPane show={assettab === "tab1"}>
                        <div className="card">
                          <div className="card-header">
                            <h3 className="card-title">
                              {Translation(translation, "Files")}
                            </h3>
                            <div className="card-options">
                              <a
                                href="#"
                                className="card-options-fullscreen"
                                data-toggle="card-fullscreen"
                              >
                                <i className="fe fe-maximize" />
                              </a>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="">
                              <ul className="nav nav-tabs b-none p-0 m-0 gap-2">
                                <li className="">
                                  <a
                                    className=" btn btn-outline-secondary alfollow"
                                    id="allfile-tab"
                                    data-toggle="tab"
                                    href="#allfile"
                                    onClick={() => { setshowFile(true); setshowMedia(false) }}
                                  >
                                    {Translation(translation, " All File")}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className=" btn btn-outline-secondary alfollow"
                                    id="media-tab"
                                    data-toggle="tab"
                                    href="#media"
                                    onClick={() => { setshowFile(false); setshowMedia(true) }}
                                  >
                                    {Translation(translation, " Media")}
                                  </a>
                                </li>
                              </ul>
                              {
                                showFile &&
                                <div className="tab-content taskboard my-2">
                                  <div
                                    className="tab-pane fade active show"
                                    id="allfile"
                                    role="tabpanel"
                                  >
                                    <div className="table-responsive">
                                      <table style={{ border: 'none' }} className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0">
                                        <thead>
                                          <tr>
                                            <th>
                                              {Translation(translation, " Name")}
                                            </th>
                                            <th className="width100">
                                              {Translation(translation, " Share With  ")}
                                            </th>
                                            <th className="text-cente">
                                              {" "}
                                              {Translation(translation, " Owner ")}
                                            </th>
                                            <th className="text-cente">
                                              {Translation(translation, " Last Update  ")}
                                            </th>
                                            <th className="text-center">
                                              {Translation(translation, " File Size  ")}
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {(datas.assets_files && !datas.assets_files.message) && datas.assets_files.map((item, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>
                                                  <span className="folder-name">
                                                    <i className="fa fa-file-excel-o text-success"></i>
                                                    <a
                                                      className="ml-3"
                                                      href={item.file_value}
                                                      download={item.file_name}
                                                    >
                                                      {Translation(translation, `${item.file_name}`)}
                                                    </a>
                                                  </span>
                                                </td>
                                                <td>
                                                  {Translation(translation, `${item.file_name}`)}
                                                </td>
                                                <td className="width100">
                                                  <span>
                                                    {" "}
                                                    {Translation(translation, `${item.file_owner}`)}{" "}
                                                  </span>
                                                </td>
                                                <td className="width100">
                                                  <span>
                                                    {" "}
                                                    {Monthss(item.file_updated_date)}{" "}
                                                    {Translation(translation, "23, 2023")}{" "}
                                                  </span>
                                                </td>
                                                <td className="width100 text-center">
                                                  <span className="size">
                                                    {Translation(translation, `${item.file_size}`)}{" "}
                                                  </span>
                                                </td>
                                              </tr>
                                            )
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              }
                              {
                                showMedia &&
                                <div className="row">
                                    {(datas.assets_files && !datas.assets_files.message) ? datas.assets_files.map((item, index) => {
                                      return (
                                        <div key={index} className="col-lg-6">
                                        <div  className="card card__media p-3">
                                          <a href='#media' className="mb-0">
                                            <img
                                              src={item.file_value}
                                              alt=""
                                              className="rounded lazy"
                                              loading="lazy"
                                            />
                                          </a>
                                          <div className="d-flex align-items-center px-2 mt-3">
                                            <img
                                              className="avatar avatar-md mr-3"
                                              src={item.file_value}
                                              alt=""
                                            />
                                            <div className="mt-2">
                                              <div>{item.file_owner}</div>
                                              <small className="d-block text-muted">2 day(s) ago ago</small>
                                            </div>
                                          </div>
                                          <hr />
                                          <div className="d-flex align-items-center justify-content-between px-2">
                                            <b>Latitude: {item.m_latitude}</b>
                                            <b>Longitude: {item.m_longitude}</b>
                                          </div>
                                        </div>
                                  </div>
                                      )
                                    }) : NoData}
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </MDBTabsPane>
                      <MDBTabsPane show={assettab === "tab2"}>
                      </MDBTabsPane>
                    </MDBTabsContent>
                  </MDBTabsPane>
                  <MDBTabsPane show={justifyActive === "tab5"}>
                    {Translation(translation, "Dashboard")}
                  </MDBTabsPane>
                  <MDBTabsPane show={justifyActive === "tab6"}>
                    <div className="innerNav">
                      <MDBTabs
                        justify
                        className="nav d-flex nav-tabs page-header-tab"
                      >
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClick4(`tab1`)}
                            active={justifyActive3 === 'tab1'}
                          >
                            Overview
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() =>
                              handleJustifyClick4(`tab2`)
                            }
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
                                      <div className="h5 mb-0">Opportunity  Stage Dates</div>
                                      <table className="table table-bordered mt-2">
                                        <thead>
                                          <tr>
                                            <th>Stage Name</th>
                                            <th>Assigned On</th>
                                            <th>No of Days</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {(datas.adminOverview && !datas.adminOverview.message) && Object.keys(datas.adminOverview?.opportunityStageDates).map((item, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>{datas.adminOverview?.opportunityStageDates[item].name}</td>
                                                <td>{datas.adminOverview?.opportunityStageDates[item].assign_on}</td>
                                                <td>{datas.adminOverview?.opportunityStageDates[item].days}</td>
                                              </tr>
                                            )
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </li>
                                {(datas.adminOverview && !datas.adminOverview.message) && Object.keys(datas.adminOverview).map((item, index) => {
                                  return (
                                    item !== 'opportunityStageDates' && 
                                    <li key={index} className='mb-4'>
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          <div className="h5 mb-0">{item}</div>
                                          <span className="small text-muted">{datas.adminOverview[item]}</span>
                                        </div>
                                      </div>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </div>
                        </MDBTabsPane>
                        <MDBTabsPane show={justifyActive3 === "tab2"}>
                          <div className="card">
                            <div className="card-body">
                              {datas.timeLine && datas.timeLine.map((item, index) => {
                                return (
                                  <div key={index} className="timeline_item ">
                                    <img
                                      className="tl_avatar"
                                      src={item.avatar}
                                      alt=""
                                    />
                                    <span>
                                      <a >
                                        {Translation(translation, `${item.f_name} ${item.l_name} `)}
                                      </a>
                                      {`(${item.email})`}
                                      <small className="float-right text-right">
                                        {item.activity_date_time}
                                      </small>
                                    </span>
                                    <div className="msg">
                                      <div>
                                        {Translation(translation, StringConvert(item.activity_value))}
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
                  </MDBTabsPane>
                </MDBTabsContent>
              </div>
            </div>
          </form>
        </div>
      </div >}
    </div >
  );
};

export default ViewPiplines;
