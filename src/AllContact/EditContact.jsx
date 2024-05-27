import React, { useState, useContext, useEffect } from "react";
import { handleFullScreen, handleToggle, Handle_convert_system_timezone } from "../components/AllCustomFuntion";
import { Form, Formik, ErrorMessage } from "formik";
import { getTokenSession } from "../utils/common";
import axios from "axios";
import config from "../services/config.json";
import { Select } from "antd";
import { Link, useParams } from "react-router-dom";
import FormControl from "../components/form/FormControl";
import { Translation } from "../components/Translation";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import File from "../components/form/File";
import useFetch from "../customHooks/useFetch";
import SubmitButton from "../components/SubmitButton";
import { toast } from "react-toastify";
import swal from "sweetalert";
import usePost from "../customHooks/usePost";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import md5 from "md5";
import gravatar from "gravatar";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { StringConvert } from "../components/StringConvert";
import { MDBTabs,MDBTabsItem,MDBTabsLink,MDBTabsContent, MDBTabsPane} from "mdb-react-ui-kit";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import Loader from "../components/common/Loading";
import img1 from "../dist/webImages/justcall-logo.webp";
const EditContact = () => {
  const { id } = useParams();
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts);

  const {data: settingData,loadingerror1} = useFetch("", "getAllViewTypeContact");
  const {data: editData, loading2, error2} = useFetch("", `getViewContact/${id}`);


  const [resDelAssign, apiMethodDelAssign] = usePost();
  const [res4, apiMethod4] = usePost();
  const [resupdateAddFollower, apiMethodupdateAddFollower] = usePost();
  const [resAddNote, apiMethodAddNote] = usePost();
  const [resAddFollower, apiMethodAddFollower] = usePost();
  const [res, apiMethod] = usePost();
  const [defaultCreateDate, setdefaultCreateDate] = useState(false);
  const [image, setImage] = useState("");
  const [img33, setimg33] = useState("");
  const [addFollower, setAddfollower] = useState([]);
  const [assetsnotes, setAssetsNotes] = useState([]);
  const [privateNote, setPrivateNote] = useState("");
  const [content, setContent] = useState("");
  const [addselectedFollower, setAddselectedFollower] = useState([]);
  const [previousFollower, setPreviousFollower] = useState([]);
  const [emails, setEmails] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [TypeName, setTypeName] = useState();
  const [emailse, setEmailse] = useState(false);
  const [editInitialData, seteditInitialData] = useState(null);
  const [admintab, setAdmintab] = useState("tab1");
  const [creatBy, setCreatBy] = useState("");
  const [initialValues, setInitialValues] = useState({
    fullname: "",
    lname: "",
  });
  const submitbutton = {
    class: "btn btn-primary update_button_lead",
    text: "Update Info",
  };
  const private_notes = ["private_note"];
  useEffect(() => {
    if (resAddNote.data) {
      if (resAddNote.data&&!resAddNote.data.message) {
        toast.success("Successfully Updated!");
        // console.log(resAddFollower.data);
          // setAssetsNotes(response.data.assets_notes)
        setAssetsNotes(resAddNote.data)
      } else if (resAddNote.data.message === "Empty Note") {
        toast.error(resAddNote.data.message);
      }
      // setAddfollower
    }
  }, [resAddNote.data]);
  const [rescreatBy, apiMethodcreatBy] = usePost();
  useEffect(() => {
    if (editData) {
      seteditInitialData(editData);
      setInitialValues({ ...initialValues, ...editData.contactData });
      setEmails(editData.contactData.email);
      setTypeName(editData.contactData.type_name)
      setTypeValue(editData.contactData.type_of_contact);
      setPreviousFollower(editData.followers);
      setimg33(
        editData.contactData.avatar === ""
          ? editData.contactData.avatar
          : editData.contactData.avatar.includes("http")
          ? editData.contactData.avatar
          : `${config.baseurl2}${editData.contactData.avatar}`
      );
      setdefaultCreateDate(editData?.contactData.created_date);
      console.log(editData.contactData.created_date);
      setImage(
        editData.contactData.avatar != "" && editData.contactData.avatar
      );

      setAssetsNotes(editData.noteData);
      if (editData?.contactData.lead_by) {
        let formViewUserName = new FormData();
        formViewUserName.append("id", `${editData?.contactData.lead_by}`);
        apiMethodcreatBy(`postViewUserName`, formViewUserName);
    }
    }
  }, [editData]);
  useEffect(() => {
    if (rescreatBy.data) {
        setCreatBy(rescreatBy.data);
    }
}, [rescreatBy.data]);
  useEffect(() => {
    if (res.data) {
      if (res.data && !res.isLoading) {
        toast.success(res.data.message);
        window.location.reload(true);
      }
    }
  }, [res.data]);
  useEffect(() => {
    if (resAddFollower.data) {
      if (!resAddFollower.data.message) {
        // console.log(resAddFollower.data);
        setAddfollower(resAddFollower.data);
      }
      // setAddfollower
    }
  }, [resAddFollower]);
  useEffect(() => {
    if (resupdateAddFollower.data) {
      console.log("hellow2");
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getViewContact/${id}`)
        .then((response) => {
          setPreviousFollower(response.data.followers);
        })
        .catch((err) => {
          // console.log('eerr', err)
        });
    }
  }, [resupdateAddFollower.data]);

  const handleEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(e)}?d=404`;

    if (emailRegex.test(e)) {
      const avatarUrl = gravatar.url(
        e,
        { s: "200", r: "pg", d: "identicon" },
        true
      );
      fetch(gravatarUrl)
        .then((response) => {
          if (response.status === 404) {
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
              .then((res) => {
                setEmailse(res.data.aleady_exist);
                setImage(permissions["system-default-avatar-image"]?.setting_value);
              })
              .catch((err) => {
                console.log("create errr", err);
              });
          } else {
            setImage(`${avatarUrl}`);
          }
        })
        .catch((error) => {
          console.error("Error checking Gravatar image:", error);
        });
    } else {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
        .then((res) => {
          setEmailse(res.data.aleady_exist);
          if (image === "") {
            setImage(permissions["system-default-avatar-image"]?.setting_value)
          }
        })
        .catch((err) => {
          console.log("create errr", err);
        });
    }

    setEmails(e);
  };
  const handleOnTypeChange = (e) => {
    setTypeValue(e.target.value);
  };
  const options = settingData?.map(({ db_id, type_name }) => ({
    value: db_id,
    label: type_name,
  }));
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  const addNote = () => {
    let formdata = new FormData();
    formdata.append("leadId", id);
    formdata.append("notes", content);
    privateNote &&
      formdata.append("private_note", "private_note");
    // privateNote.target && console.log(content, privateNote.target.value);
    apiMethodAddNote("postNotesUpdated", formdata);
    setContent("")

  };
  const handleJustifyClickAdminTab = (value) => {
    if (value == admintab) {
      return;
    }

    setAdmintab(value);
  };

  // /// Follower/////////
  const onSearchFollowerAdd = (v) => {
    const formdata = new FormData();
    formdata.append("query", v);
    formdata.append("userType", "typeSearch");
    formdata.append("uLead", id);
    apiMethodAddFollower("postLeadViewFollowers", formdata);
  };
  const updateAddFollower = () => {
    const formdata = new FormData();
    formdata.append("uLeadType", "leadFollwer");
    formdata.append("uLead", id);
    let selectedFollowerId =
    addselectedFollower.length &&
      addselectedFollower.map((item) => {
        return item.key;
      });
    addselectedFollower.length &&
      selectedFollowerId.map((v, i) => {
        formdata.append(`userLead[${i}]`, v);
      });
    apiMethodupdateAddFollower("postLeadAddFollowers", formdata);
    //
  };
  const delAddFollower = (item) => {
    const formdata = new FormData();
    formdata.append("userType", "unFollow");
    formdata.append("uLead", id);
    formdata.append("unFollow", item.id);
    swal({
      title: "Un Assigned ",
      icon: "warning",
      dangerMode: true,
    });
    apiMethod4("postLeadUnFollow", formdata);
    
    setPreviousFollower(previousFollower.filter((val) => val.id !== item.id));
  };
  const deleteLeadAssign = () => {
    let formdata = new FormData();
    formdata.append("userType", "unAssign");
    formdata.append("unAssign",
      editInitialData && editInitialData.contactData.assigned_to_role_id );
    formdata.append("uLead", id);
    let deldata = formdata;
    
    swal({
      title: "Are you sure to un-assign this user from the current lead?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethodDelAssign("postDeleteLeadAssign", deldata);
      }
    });
  };
  useEffect(() => {
    if(resDelAssign?.data) {
      resDelAssign?.data.message && toast.success(resDelAssign?.data.message);
    }
  }, [resDelAssign.data])
  const handleSubmit = (values) => {
    let reqField=["email","fullname"]
    let allValues = {
      email: emails,
      fullname:
        values.fullname != "" ? values.fullname : initialValues.fullname,
      type_of_contact: typeValue,
      id: id,
      created_date: defaultCreateDate,
      number: initialValues.number,
      submit_lead: "Update Info",
    };
    if (typeof image === "object") {
      allValues.avatar = image;
      allValues.avatarURL = "";
    } else {
      allValues.avatar = "";
      allValues.avatarURL = image;
    }
    if (!emailse) {
      if (
        allValues.email == "" ||
        allValues.fullname == "" 
       
      ) {
        swal({
          title: "Please fill required fields",
          icon: "warning",
          dangerMode: true,
        });
      } else {
        apiMethod("postUpdatedContact", allValues);
      }
    } else {
      swal({
        title: "Email is already taken",
        icon: "warning",
        dangerMode: true,
      });
    }
  };
if(!editData || loading2) return <Loader />;

  var imgVal = editData?.contactData[0]?.avatar ? editData?.contactData[0]?.avatar.includes("http") ? editData?.contactData[0]?.avatar : `${config.baseurl2}${editData.contactData[0]?.avatar}` : permissions["system-avatar-image"]?.setting_value ? `${config.baseurl2}${permissions["system-default-avatar-image"]?.setting_value}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160";
  return (
    <>
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
                                            Contact Created by: {creatBy}
                                                <br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form name="myForm">
              <div className="row clearfix">
                <div className="col-xl-12 col-lg-12">
                  <div className="card">
                    <div className="card-status bg-blue"></div>

                    <div className="card-header borderblue">
                      <h3 className="card-title">
                        {Translation(translations, " Contact Info")}
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
                      <div className="row fv-plugins-icon-container">
                        <div className="col-md-6">
                          {leadPermission?.super_admin ||
                          leadPermission?.contacts?.fields?.contact_avtar ===
                            "true" ? (
                            <>
                              <File
                                label={Translation(translations, "Avatar")}
                                value={
                                  typeof image === "string"
                                    ? image.includes("www.gravatar.com") ||
                                      image.includes("s.gravatar")
                                      ? image
                                      : `${config.baseurl2}${image}`
                                    : image
                                }
                                onUpload={setImage}
                                name={"ava"}
                              />
                              <Link
                                className="mt-2 mr-2  float-right text-underline"
                                onClick={() =>
                                  setImage(
                                    "https://www.gravatar.com/avatar/9f199d16db9e64e35e53f2b0f13ac617?s=160"
                                  )
                                }
                              >
                                Use Gravatar Picture
                              </Link>
                            </>
                          ) : (
                            ""
                          )}
                          {leadPermission?.contacts?.fields?.contact_avtar ==
                          "-1" ? (
                            <>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="form-label">
                                    {Translation(translations, "Avatar")}
                                  </label>
                                  <img src={img33}></img>
                                </div>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-12 mb-3 mt-4 d-flex flex-column justify-content-end">
                          <label className="form-label">
                            Contact Created by:
                          </label>
                          {editInitialData &&
                            editInitialData.contactData.contact_to_name}{" "}
                          {`(${
                            editInitialData &&
                            editInitialData.contactData.contact_to_role_name
                          })`}{" "}
                          {editInitialData &&
                            editInitialData.contactData
                              .assigned_to_role_name && (
                              <>
                                <label className="form-label mt-2">
                                  Assigned to:
                                </label>
                                <span className="">
                                  {" "}
                                  {editInitialData &&
                                    editInitialData.contactData
                                      .assigned_to_name}{" "}
                                  {`(${
                                    editInitialData &&
                                    editInitialData.contactData
                                      .assigned_to_role_name
                                  })`}{" "}
                                  <a
                                    onClick={deleteLeadAssign}
                                    className="text-red unassign float-right"
                                    data-assigned="13"
                                    data-toggle="tooltip"
                                    title="Un-Assign User from this lead"
                                  >
                                    {" "}
                                    <i className="fa fa-trash"></i>{" "}
                                  </a>{" "}
                                </span>{" "}
                              </>
                            )}
                        </div>

                        <div className="col-md-12">
                          {leadPermission?.super_admin ||
                          leadPermission?.contacts?.fields?.contact_email ==
                            "true" ? (
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
                          ) : (
                            ""
                          )}
                          {leadPermission?.contacts?.fields?.contact_email ==
                          "-1" ? (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "E-mail")}
                                </label>
                                {emails}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {emailse && (
                            <div id="email_err" style={{ color: "red" }}>
                              Email already stored!
                            </div>
                          )}
                          {leadPermission?.super_admin ||
                          leadPermission?.contacts?.fields?.contact_fullname ===
                            "true" ? (
                            <FormControl
                              className="form-control my-1"
                              required={true}
                              label={Translation(translations, "Contact Name")}
                              name="fullname"
                              control="input"
                              defaultValue={editData?.contactData?.fullname}
                              placeholder={Translation(
                                translations,
                                "Contact Name"
                              )}
                            />
                          ) : (
                            ""
                          )}
                          {leadPermission?.contacts?.fields?.contact_fullname ==
                          "-1" ? (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Contact Name")}
                                </label>
                                {editInitialData &&
                                  editInitialData.contactData.fname}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                          leadPermission?.contacts?.fields
                            ?.contact_phone_number === "true" ? (
                            <FormControl
                              className="form-control my-1"
                              updatess={(item) =>
                                setInitialValues({
                                  ...initialValues,
                                  number: `+${item}`,
                                })
                              }
                              datas={initialValues.number}
                              label={Translation(
                                translations,
                                `${"Phone Number"}`
                              )}
                              name="number"
                              control="intl"
                            />
                          ) : (
                            ""
                          )}
                          {leadPermission?.contacts?.fields
                            ?.contact_phone_number == "-1" ? (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Phone Number")}
                                </label>
                                {initialValues.number}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                          leadPermission?.contacts?.fields
                            ?.contacts_contact_type == "true" ? (
                            <>
                              <label className="form-label">
                                {Translation(translations, "Type of Contact")}
                              </label>
                              <FormControl
                                className="form-control my-1"
                                firstSelect={TypeName ? TypeName : "Select" }
                                selectList={
                                  settingData &&
                                  settingData.filter(
                                    (item) => item.type_module === "Contact"
                                  )
                                }
                                // value={typeValue}
                                name="contact_type"
                                control="select_custom_options"
                                custom_label_name="type_name"
                                customer_value_name="db_id"
                                onChange={handleOnTypeChange}
                              />

                              <ErrorMessage name="contact_type">
                                {(msg) => (
                                  <div
                                    style={{
                                      color: "red",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </>
                          ) : (
                            ""
                          )}
                          {leadPermission?.contacts?.fields
                            ?.contacts_contact_type == "-1" ? (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Type Of Contact")}
                                </label>
                                {editData?.contactData?.type_name}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {leadPermission?.super_admin ||
                        leadPermission?.contacts?.fields
                          ?.contact_created_date === "true" ? (
                          <div className="col-md-12">
                            <FormControl
                              type="datetime-local"
                              className="form-control my-1"
                              label={Translation(
                                translations,
                                `${"Created date"}`
                              )}
                              name="created_date"
                              control="input"
                              value={defaultCreateDate}
                              onChange={(e) => {
                                setdefaultCreateDate(e.target.value);
                              }}
                            />
                          </div>
                        ) : leadPermission?.contacts?.fields
                            ?.contact_created_date == "-1" ? (
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Created date")}
                              </label>
                              {defaultCreateDate && defaultCreateDate}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="col-md-12 my-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  {leadPermission?.super_admin ||
                  leadPermission?.contacts?.fields?.contact_note == "true" ? (
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-sticky-note text-muted"></i> Notes
                          <small>Notes About the Meeting</small>
                        </h3>

                        <div className="card-options align-item-center">
                        <button
                            type="button"
                            className="btn btn-icon btn-primary btn-success f"
                           onClick={()=>setPrivateNote(!privateNote)}
                           
                           >
                           {privateNote?<HiOutlineLockClosed/>:<HiOutlineLockOpen />}
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
                        {leadPermission?.super_admin ||
                        leadPermission?.contacts?.fields?.contact_note ==
                          "true" ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={handleEditorChange}
                          />
                        ) : (
                          " "
                        )}
                       
                        {leadPermission?.super_admin ||
                        leadPermission?.contacts?.fields?.contact_note ==
                          "true" ? (
                          <button
                            type="button"
                            className="btn  w-100 btn-primary mt-2"
                            onClick={addNote}
                          >
                            Save Note
                          </button>
                        ) : (
                          ""
                        )}

                        <hr />
                        {Array.isArray(assetsnotes) &&
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
                                  )}{" "}
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
                                        <strong>{<Handle_convert_system_timezone
                                              dateAndTime={item.note_date}
                                            />}</strong>
                                      </div>
                                      <div className="float-right">
                                        Posted By{" "}
                                        <small className="text-muted">
                                          {item.f_name +
                                            " " +
                                            item.l_name +" "+
                                            item.email}
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {/* <FormControl
                            className="form-control my-1"
                            name="notes"
                            control="textarea3"
                            placeholder={Translation(
                              translations,
                              "Please type what you want..."
                            )}
                          /> */}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {leadPermission?.contacts?.fields?.contact_note == "-1" ? (
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-sticky-note text-muted"></i> Notes
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
                        <hr />
                        {assetsnotes.length &&
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
                                  )}{" "}
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
                                        <strong>{item.note_date}</strong>
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
                              </div>
                            );
                          })}
                        {/* <FormControl
                            className="form-control my-1"
                            name="notes"
                            control="textarea3"
                            placeholder={Translation(
                              translations,
                              "Please type what you want..."
                            )}
                          /> */}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="card leadCards">
                    <div className="card-status bg-blue"></div>

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
                      <div className="mb-2">
                        <Select
                          mode="multiple"
                          filterOption={true}
                          onSearch={(v) => {
                            onSearchFollowerAdd(v);
                          }}
                          onChange={(v1, v2) => {
                            let selectedFollowerId = v2.map((item) => {
                              return item.key;
                            });
                            setAddselectedFollower(v2);
                          }}
                          style={{ width: "100%", height: 40 }}
                          placeholder={"Search follower name"}
                        >
                          {addFollower.length &&
                            addFollower.map(({ uname, id, text }) => (
                              <Select.Option value={uname} key={id}>
                                {uname}
                              </Select.Option>
                            ))}
                        </Select>
                      </div>
                      <button
                        type="button"
                        className="my-2 btn w-100 btn-primary"
                        onClick={() => {
                          updateAddFollower();
                        }}
                      >
                        Update Follower
                      </button>
                      <div className="mt-4">
                        {previousFollower &&
                          previousFollower.map((item, i) => {
                            if (item) {
                              return (
                                <div className="chip my-2" key={i}>
                                  <span
                                    className="avatar"
                                    style={{
                                      backgroundImage: `url(${item?.avatar.includes(`http`) ? item?.avatar : `${config.baseurl2}${item?.avatar}`})`,
                                    }}
                                  ></span>
                                  <div className="d-flex align-item-center">
                                    <span>{item?.uname}</span>
                                    <a
                                      className="btnunfollow"
                                      data-follow="14"
                                      onClick={() => {
                                        delAddFollower(item);
                                      }}
                                    >
                                      <i className="fe fe-x"></i>
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-6 col-sm-12">
                  {(leadPermission?.super_admin ||
                    leadPermission?.leads?.fields.leads_admininfo ===
                      "true") && (
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-user-secrect text-muted"></i>{" "}
                          Activities
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
                        {leadPermission?.super_admin ||
                        leadPermission.leads?.fields?.leads_admininfo ===
                          "true" ? (
                          <div>
                            <MDBTabs justify className="mb-2 fitContent">
                              <MDBTabsItem>
                                <MDBTabsLink
                                  onClick={() =>
                                    handleJustifyClickAdminTab("tab1")
                                  }
                                  active={admintab === "tab1"}
                                >
                                  {Translation(translations, "Activities")}
                                </MDBTabsLink>
                              </MDBTabsItem>
                            </MDBTabs>
                            <MDBTabsContent>
                              <MDBTabsPane show={admintab === "tab1"}>
                                <div className="card">
                                  <div className="card-body">
                                    {editInitialData &&
                                      Array.isArray(editInitialData.activityMessage) &&
                                      editInitialData.activityMessage.map(
                                        (val, i) => {
                                          return (
                                            <div
                                              className="timeline_item "
                                              key={i}
                                            >
                                              <img
                                                className="tl_avatar"
                                                src={ val?.avatar &&
                                                  val?.avatar.includes("http")
                                                  ? val?.avatar
                                                  : `${config.baseurl2}${val?.avatar} `}
                                                alt=""
                                              />
                                              <span>
                                                <a style={{ color: '#00A9BD' }}>
                                                  {" "}
                                                  {Translation(
                                                    translations,
                                                    `${val.f_name} ${val.l_name}`
                                                  )}
                                                </a>{" "}
                                                ({val.email}){" "}
                                                <small className="float-right text-right">
                                                  {" "}
                                                   <Handle_convert_system_timezone
                                          dateAndTime={val.activity_date_time}
                                        />{" "}
                                                </small>
                                              </span>
                                              <div className="msg" key={i}>
                                                <div>
                                                  {Translation(
                                                    translations,
                                                    StringConvert(
                                                      val.activity_value
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              </MDBTabsPane>
                            </MDBTabsContent>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right mt-5 update_button_lead">
                <SubmitButton
                  props={submitbutton}
                  buttonLoading={res.isLoading}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default EditContact;
