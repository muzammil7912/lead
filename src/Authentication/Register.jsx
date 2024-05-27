import React, { useContext, useState, useRef, useEffect } from "react";
import { Form, Formik } from "formik";
import FormControl from "../components/form/FormControl";
import useFetch from "../customHooks/useFetch";
import usePost from "../customHooks/usePost";
import { Translation } from "../components/Translation";
import Loader from "../components/common/Loading";
import SubmitButton from "../components/SubmitButton";
import File from "../components/form/File";
import allData from "../Data/data";
import config from "../services/config.json";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LoopSelect from "../components/form/LoopSelect";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link } from "react-router-dom";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainTranslationContext } from "../context/MainTranslationContext";
import Dropdown from "react-bootstrap/Dropdown";
import Dropdown5 from "../components/form/Dropdown5.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import Modal from "react-bootstrap/Modal";
import DropdownLanguage from "../components/form/DropdownLanguage";
import { getTokenSession } from "../utils/common";
import swal from "sweetalert";
import gravatar from "gravatar";
import md5 from "md5";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";

function Register() {
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { addHeading } = useContext(MainHeadingContext);
  const { transData } = useContext(MainTranslationContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();
  const { data: AllRegisterData, loading } = useFetch("", "getAllRegister");
  const [TimeZone, setTimeZone] = useState();
  const [ApiTemplatesDrop, setApiTemplatesDrop] = useState();
  const [languages, setLanguages] = useState(permissions["system-language"].setting_value ?? "31");

  useEffect(() => {
    if (leadPermission) {
      if (
        leadPermission?.user_module?.create == "0" ||
        leadPermission?.user_module?.active_module == "0"
      ) {
        navigate(`/${config.ddemoss}`);
      }
    }
    addHeading(`Add User`);
    if (AllRegisterData) {
      const {getSetDefultTemplateApi, getDefultTimeZoneApi, getAllProfilesApi, getTemplateNameApi } =
        AllRegisterData;
      setTimeZone(getDefultTimeZoneApi?.timezone ?? "America/New_York");
      setProfiles(getAllProfilesApi);
      setApiTemplatesDrop(getTemplateNameApi);

      setTemplatesdata( getSetDefultTemplateApi?.signature_template?.template_code);
      setTemplateID(getSetDefultTemplateApi?.signature_template.template_id ?? "0");
      setDefTemName(getSetDefultTemplateApi?.signature_template?.template_name);
    }
  }, [AllRegisterData]);

  const [image, setImage] = useState("");
  const [emails, setEmails] = useState("");
  const [emailse, setEmailse] = useState(false);
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
            console.log("Email is not registered with Gravatar");
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
              .then((res) => {
                setEmailse(res.data.aleady_exist);
                setImage(
                  permissions[`system-default-avatar-image`]?.setting_value
                );
              })
              .catch((err) => {
                console.log("create errr", err);
              });
          } else {
            console.log("Email is registered with Gravatar");
            setImage(`${avatarUrl}`);
            console.log(avatarUrl);
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
            setImage(permissions[`system-default-avatar-image`]?.setting_value);
          }
        })
        .catch((err) => {
          console.log("create errr", err);
        });
    }

    setEmails(e);
  };

  const [res, apiMethod] = usePost();
  const [res5, apimethod_PostDefualtSig] = usePost();
  const [res3, RegistorForm] = usePost();
  const [res4, roles_report] = usePost();
  const [profiles, setProfiles] = useState("");
  const [profilesval, setProfilesval] = useState("");
  const [Templatesdata, setTemplatesdata] = useState();
  const [TemplateID, setTemplateID] = useState();
  const [Reports_to, setReports_to] = useState();
  const [DefTemName, setDefTemName] = useState();
  const [modalShow, setModalShow] = React.useState(false);

  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Store User",
  };
  const API_URL = "https://77em4-8080.sse.codesandbox.io";
  const UPLOAD_ENDPOINT = "upload_files";
  // ckeditorupload
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();

          loader.file.then((file) => {
            body.append("template", "upload_template_image");
            body.append("template_id", "templateid");
            body.append("template_image", file);
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .post(
                `${config.apiEndPoint}postCommunicationTemplatesImage`,
                body
              )
              .then((response) => {
                console.log(response.data.imagr_src, response.imagr_src);
                resolve({
                  default: `${config.baseurl2}${response.data.imagr_src}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  const handleTemplate = (selected) => {
    setTemplateID(selected.target.value);
    let formdata = new FormData();
    formdata.append("id", selected.target.value);
    apiMethod("postTemplateById", formdata);
  };
  useEffect(() => {
    if (res.data) {
      setTemplatesdata(res?.data[0]?.template_code);
    }
  }, [res.data]);

  useEffect(() => {
    if (res4?.data) {
      setReports_to(res4?.data[0].upar_role_name);
    }
  }, [res4]);

  const [initialValues, setInitialValues] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    cpassword: "",
    utype: "",
    contact_type: "",
    userstatus: 1,
    reports_to: "",
    mnumber: ``,
    number: ``,
    title: "",
    department: "",
    office_phone: ``,
    mobile_phone: ``,
    home_phone: ``,
    fax: "",
    other_email: "",
    secondary_email: "",
    secondary_phone: ``,
    street_address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    whatsapp: ``,
    telegram: "",
    website: "",
    tiktok: "",
    realtor: "",
    youtube: "",
    zillow: "",
    linkedin: "",
    pinterest: "",
    twitter: "",
    discord: "",
    snapchat: "",
    instagram: "",
    facebook: "",
  });

  const [rolevalName, setRoleName] = useState("--select--");
  const [roleID, setroleID] = useState();
  const handlenode = (e, item) => {
    let closestDropdown = e.target.closest(".dropdown-menu");
    setroleID(item.id);
    setProfilesval(item.profile);
    const elements = document.querySelectorAll(".sellist a");
    elements.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    setRoleName(e.target.textContent);
    closestDropdown.classList.remove("show");
    let formdata = new FormData();
    formdata.append("userRole", item.id);
    formdata.append("reports_to", "userReportsTo");
    roles_report("postUserRoleRelatedToName", formdata);
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  useEffect(() => {
    if (res3?.data?.message) {
      if (res3?.data?.message == "Successfully added!") {
        toast.success(`${res3?.data?.message}`);
        navigate(`/${config.ddemoss}users`);
        setInitialValues(
          Object.fromEntries(Object.keys(initialValues).map((key) => [key, ""]))
        );
      } else {
        toast.warning(`${res3?.data?.message}`);
      }
    }
  }, [res3?.data]);
  useEffect(() => {
    if (res5?.data?.message) {
      toast.success(res5?.data?.message);
    }
  }, [res5]);

  let requiredInput = [
    { name: "fname", label: "First Name" },
    { name: "lname", label: "Last Name" },
    { name: "username", label: "Username" },
    { name: "password", label: "Password" },
    { name: "cpassword", label: "Confirm Password" },
    { name: "utype", label: "User Type" },
    { name: "contact_type", label: "Contact Type" },
  ];
  if (loading) return <Loader />;
  const {
    getUserRolesApi,
    getListTimeZoneApi,
    getAllViewGeneralSystemSettingsApi,
    getAllViewSocialLinksSystemSettingsApi,
    getAllViewLocalizationSystemSettingsApi
  } = AllRegisterData;
  function handleSubmit(values) {
    let alertArr = [];
    requiredInput.map((val, i) => {
      if (values[val.name].trim() == "") {
        alertArr.push(val.label);
      }
    });

    if (alertArr.length > 0 || emails == null || roleID == null) {
      swal({
        title: "Please specify the reason:",
        text: `${alertArr.join()} ${emails?.trim() ? "" : "Email"} ${
          roleID?.trim() ? "" : "Role"
        }  `,
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    let emailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      values.password === values.cpassword &&
      values?.password?.trim().length >= 8 &&
      emailvalid.test(emails)
      ) {
        let formdata = new FormData();
      formdata.append("generalsetting[system-avatar-image]", getAllViewGeneralSystemSettingsApi["system-avatar-image"]?.setting_value);
      formdata.append("generalsetting[system-favicon-image]", getAllViewGeneralSystemSettingsApi["system-favicon-image"]?.setting_value);
      formdata.append("generalsetting[system-title-system]",  getAllViewGeneralSystemSettingsApi["system-title-system"]?.setting_value);
      formdata.append("generalsetting[system-default-street-address]",getAllViewGeneralSystemSettingsApi["system-default-street-address"]?.setting_value);
      formdata.append("generalsetting[system-state]", getAllViewGeneralSystemSettingsApi["system-state"]?.setting_value);
      formdata.append("generalsetting[system-country]", getAllViewGeneralSystemSettingsApi["system-country"]?.setting_value);
        if(!getAllViewSocialLinksSystemSettingsApi.message && getAllViewSocialLinksSystemSettingsApi) {
          for (let index2 in getAllViewSocialLinksSystemSettingsApi) {
            formdata.append(`socialsetting[${getAllViewSocialLinksSystemSettingsApi[index2]?.setting_name}]`,`${getAllViewSocialLinksSystemSettingsApi[index2]?.setting_value}`);
          }
        }
      formdata.append("localization[system-language]", getAllViewLocalizationSystemSettingsApi[`system-language`]?.setting_value);
      formdata.append("localization[system-user_timezone]", getAllViewLocalizationSystemSettingsApi[`system-user_timezone`]?.setting_value);
      formdata.append("fname", values.fname);
      formdata.append("lname", values.lname);
      formdata.append("username", values.username);
      formdata.append("email", emails);
      formdata.append("password", values.password);
      formdata.append("cpassword", values.cpassword);
      formdata.append("urole", roleID);
      formdata.append("uprofile", profilesval);
      formdata.append("utype", values.utype);
      formdata.append("mnumber", initialValues.mnumber);
      formdata.append("number", initialValues.mnumber);
      formdata.append("userstatus", values.userstatus);
      formdata.append("title", values.title);
      formdata.append("department", values.department);
      formdata.append("office_phone", initialValues.office_phone);
      formdata.append("mobile_phone", initialValues.mobile_phone);
      formdata.append("home_phone", initialValues.home_phone);
      formdata.append("fax", values.fax);
      formdata.append("other_email", values.other_email);
      formdata.append("secondary_email", values.secondary_email);
      formdata.append("reports_to", Reports_to);
      formdata.append("secondary_phone", initialValues.secondary_phone);
      formdata.append("signature", Templatesdata);
      formdata.append("street_address", values.street_address);
      formdata.append("city", values.city);
      formdata.append("state", values.state);
      formdata.append("country", values.country);
      formdata.append("postal_code", values.postal_code);
      formdata.append("language", languages);
      formdata.append("user_timezone", TimeZone ? TimeZone : "");
      formdata.append("contact_type", values.contact_type);
      if (TemplateID) {
        formdata.append("signature_id", TemplateID);
      } else {
        formdata.append("signature_id", 1);
      }
      if (typeof image === "object") {
        formdata.append("avatarURL", "");
        formdata.append("avatar", image);
      } else {
        formdata.append("avatar", "");
        formdata.append("avatarURL", image);
      }
      formdata.append("social[whatsapp]", initialValues.whatsapp);
      formdata.append("social[facebook]", values.facebook);
      formdata.append("social[instagram]", values.instagram);
      formdata.append("social[linkedin]", values.linkedin);
      formdata.append("social[twitter]", values.twitter);
      formdata.append("social[youtube]", values.youtube);
      formdata.append("social[tiktok]", values.tiktok);
      formdata.append("social[telegram]", values.telegram);
      formdata.append("social[snapchat]", values.snapchat);
      formdata.append("social[discord]", values.discord);
      formdata.append("social[pinterest]", values.pinterest);
      formdata.append("social[zillow]", values.zillow);
      formdata.append("social[realtor]", values.realtor);
      formdata.append("social[website]", values.website);
      formdata.append("submit", true);
      RegistorForm("register", formdata);
    } else if (values?.password?.trim()?.length < 8) {
      swal({
        title: "Password Should be 8 digit !",
        icon: "warning",
        dangerMode: true,
      });
    } else if (!emailvalid.test(emails)) {
      swal({
        title: "Invalid Email",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Password not Match",
        icon: "warning",
        dangerMode: true,
      });
    }
  }

  const setDefaultSignature = () => {
    let formdata = new FormData();
    formdata.append("template_id", TemplateID);
    swal({
      title: "Are you sure to replace the default template?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apimethod_PostDefualtSig("postSetDefultTemplate", formdata);
      }
    });
  };

  return (
    <div className="container-fluid useredits ">
      <div className="card">
        <div className="card-header borderblue">
          <h3 className="card-title">
            {Translation(translations, "New Registration")}
          </h3>
        </div>
        <div className="card-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form name="myForm">
              <div className="row fv-plugins-icon-container">
                <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={Translation(translations, "First Name")}
                        name="fname"
                        control="input"
                        placeholder={Translation(translations, "First Name")}
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={Translation(translations, "Last Name")}
                        name="lname"
                        control="input"
                        placeholder={Translation(translations, "Last Name")}
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={Translation(translations, "Username")}
                        name="username"
                        control="input"
                        placeholder={Translation(translations, "Username")}
                      />
                    </div>
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
                      {emailse && (
                        <div id="email_err" style={{ color: "red" }}>
                          Email already stored!
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={Translation(translations, `${"password"}`)}
                        name="password"
                        control="password"
                        placeholder={Translation(translations, "password")}
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={Translation(
                          translations,
                          `${"Confirm Password"}`
                        )}
                        name="cpassword"
                        control="password"
                        placeholder={Translation(
                          translations,
                          "Confirm Password"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-2">
                  <File
                    label={Translation(translations, "Avatar")}
                    value={
                      image
                        ? typeof image !== "object"
                          ? image.includes("http")
                            ? image
                            : `${config.baseurl2}${image}`
                          : image
                        : image
                    }
                    onUpload={setImage}
                    name={"avatar"}
                  />
                </div>
                <div className="col-md-4">
                  <div className="form-group form-group useredits  my-2">
                    <label className="">
                      {Translation(translations, "Role")}
                    </label>
                    <Dropdown>
                      <Dropdown.Toggle
                        className="roleCustom my-1"
                        type="button"
                      >
                        {Translation(translations, rolevalName)}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <ul className="list-group">
                          {getUserRolesApi && <LoopSelect
                            handleN={(e, item) => handlenode(e, item)}
                            node={getUserRolesApi["CEO"]}
                          />}
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group my-2">
                    <label htmlFor="">Profile</label>
                    <select
                      className="form-control my-1"
                      value={profilesval}
                      onChange={(e) => setProfilesval(e.target.value)}
                    >
                      <option value="">--select--</option>
                      {profiles &&
                        profiles?.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.profile_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <FormControl
                    className="form-control my-1"
                    required={true}
                    selectList={allData.registerPage.UserType}
                    firstSelect={"--select--"}
                    label={Translation(translations, `${"User Type"}`)}
                    name="utype"
                    control="select"
                  />
                </div>
                <div className="col-md-4">
                  <FormControl
                    className="form-control my-1"
                    firstSelect={"--select--"}
                    required={true}
                    selectList={allData.registerPage.ContactType}
                    label={Translation(translations, `${"Contact Type"}`)}
                    name="contact_type"
                    control="select"
                  />
                </div>
                <div className="col-md-4">
                  <FormControl
                    className="form-control my-1"
                    updatess={(item) =>
                      setInitialValues({
                        ...initialValues,
                        mnumber: `+${item}`,
                      })
                    }
                    datas={initialValues.mnumber}
                    label={Translation(translations, `${"Main Phone Number"}`)}
                    name="mnumber"
                    control="intl"
                  />
                </div>
                <div className="col-md-4">
                  <FormControl
                    className="form-control my-1"
                    updatess={(item) =>
                      setInitialValues({
                        ...initialValues,
                        number: `+${item}`,
                      })
                    }
                    datas={initialValues.number}
                    label={Translation(translations, `${"Mobile Number"}`)}
                    name="number"
                    control="intl"
                  />
                </div>
                <div className="col-md-4">
                  <FormControl
                    className="form-control my-1"
                    selectList={allData.registerPage.Status}
                    label={Translation(translations, `${"Status"}`)}
                    name="userstatus"
                    control="select"
                  />
                </div>
                <div className="mt-5 col-md-12">
                  <h6>{Translation(translations, "More Information")}</h6>
                  <hr />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Title"}`)}
                    name="title"
                    control="input2"
                  />
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Department"}`)}
                    name="department"
                    control="input2"
                  />
                  <FormControl
                    updatess={(item) =>
                      setInitialValues({
                        ...initialValues,
                        office_phone: `+${item}`,
                      })
                    }
                    datas={initialValues.office_phone}
                    label={Translation(translations, `${"Office Phone"}`)}
                    hiddenVal={"code_office_phone"}
                    name="office_phone"
                    control="intl2"
                  />
                  <FormControl
                    updatess={(item) =>
                      setInitialValues({
                        ...initialValues,
                        mobile_phone: `+${item}`,
                      })
                    }
                    datas={initialValues.mobile_phone}
                    label={Translation(translations, `${"Mobile Phone"}`)}
                    hiddenVal={"code_mobile_phone"}
                    name="mobile_phone"
                    control="intl2"
                  />
                  <FormControl
                    updatess={(item) =>
                      setInitialValues({
                        ...initialValues,
                        home_phone: `+${item}`,
                      })
                    }
                    datas={initialValues.home_phone}
                    label={Translation(translations, `${"Home Phone"}`)}
                    hiddenVal={"code_home_phone"}
                    name="home_phone"
                    control="intl2"
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Fax"}`)}
                    name="fax"
                    control="input2"
                  />
                  <FormControl
                    className="form-control"
                    type={"email"}
                    label={Translation(translations, `${"Other Email"}`)}
                    name="other_email"
                    control="input2"
                  />
                  <FormControl
                    className="form-control"
                    type={"email"}
                    label={Translation(translations, `${"Secondary Email"}`)}
                    name="secondary_email"
                    control="input2"
                  />
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Reports To"}`)}
                    name="reports_to"
                    control="input2"
                    value={Reports_to}
                    disabled={true}
                  />
                  <FormControl
                    updatess={(item) =>
                      setInitialValues({
                        ...initialValues,
                        secondary_phone: `+${item}`,
                      })
                    }
                    datas={initialValues.secondary_phone}
                    label={Translation(translations, `${"Secondary Phone"}`)}
                    hiddenVal={"code_secondary_phone"}
                    name="secondary_phone"
                    control="intl2"
                  />
                </div>
                <div className="col-md-12">
                  <div className="form-group row">
                    <div className="col-sm-2">
                      <label className="col-form-label">Signature</label>
                      <br />
                      <div className="alert-secondary alert p-1 mb-1">
                        {/* <label className="col-form-label">Templates:</label> */}
                        <FormControl
                          className="form-control my-1"
                          firstSelect={DefTemName}
                          label={Translation(translations, "Templates")}
                          name="sign_temp"
                          selectList={ApiTemplatesDrop}
                          custom_label_name="template_name"
                          customer_value_name="template_id"
                          onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="text-right">
                        <small>
                          <Link
                            to={""}
                            className="defcode"
                            onClick={setDefaultSignature}
                          >
                            Default Template
                          </Link>
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <CKEditor
                       config={{
                        toolbar: [
                          [ 'Source' ],
                          [ 'Styles', 'Format', 'Font', 'FontSize' ],
                          [ 'Bold', 'Italic' ],
                          [ 'Undo', 'Redo' ],
                          [ 'EasyImageUpload' ],
                          [ 'About' ]
                        ],
                        extraPlugins: 'easyimage',
                        removePlugins: 'image',
                      }}
                        editor={ClassicEditor}
                        data={Templatesdata ? Templatesdata : " "}
                        onReady={(editor) => {}}
                        onChange={(event, editor) => {
                          const data = editor.getData();

                          // seteditorvalue(data, event, editor);
                          setTemplatesdata(data);
                        }}
                      />
                      {/* <div className="float-right" onClick={() => setModalShow(true)}><a className="attrbs">View attributes</a></div> */}
                      <div
                        onClick={() => setModalShow(true)}
                        className="col-md-6 float-right attributemodal ViewAttri"
                      >
                        View Attributes
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-1"></div>

                <div className="mt-5 col-md-12">
                  <h6>{Translation(translations, "User Address")}</h6>
                  <hr />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Street Address"}`)}
                    name="street_address"
                    rows="3"
                    control="textarea2"
                  />
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"City"}`)}
                    name="city"
                    control="input2"
                  />
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"State"}`)}
                    name="state"
                    control="input2"
                  />
                </div>
                <div className="col-md-6">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Country"}`)}
                    name="country"
                    control="input2"
                  />
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Postal Code"}`)}
                    name="postal_code"
                    control="input2"
                  />
                </div>
                <div className="mt-5 col-md-12">
                  <h6>{Translation(translations, "Localization")}</h6>
                  <hr />
                </div>
                <div className="col-md-5">
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {Translation(translations, "Language")}
                    </label>
                    <div className="col-sm-8">
                      <DropdownLanguage
                        list={transData}
                        selectedVal={setLanguages}
                        defaultval={languages}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {Translation(translations, "Time Zone")}
                    </label>
                    <div className="col-sm-8">
                      <Dropdown5
                        list={getListTimeZoneApi}
                        changes={(value) => setTimeZone(value)}
                        selected={TimeZone}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 col-md-12">
                  <h6>{Translation(translations, "Social Profile")}</h6>
                  <hr />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Facebook"}`)}
                    name="facebook"
                    control="input2"
                    placeholder={"https://www.facebook.com/xxxx"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"SnapChat"}`)}
                    name="snapchat"
                    control="input2"
                    placeholder={"http://www.snapchat.com/add/YourUserName"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Instagram"}`)}
                    name="instagram"
                    control="input2"
                    placeholder={"https://www.instagram.com/xxxx"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Discord"}`)}
                    name="discord"
                    control="input2"
                    placeholder={"https://discordapp.com/users/xxxx"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Twitter"}`)}
                    name="twitter"
                    control="input2"
                    placeholder={"https://www.twitter.com/xxxx"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Pinterest"}`)}
                    name="pinterest"
                    control="input2"
                    placeholder={"https://pinterest.com/username"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Linkedin"}`)}
                    name="linkedin"
                    control="input2"
                    placeholder={"https://www.linkedin.com/in/xxxx"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Zillow"}`)}
                    name="zillow"
                    control="input2"
                    placeholder={"https://www.Zillow.com/in/xxxx"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Youtube"}`)}
                    name="youtube"
                    control="input2"
                    placeholder={"https://youtube.com/channel/xxxx"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Realtor"}`)}
                    name="realtor"
                    control="input2"
                    placeholder={"https://www.realtor.com/agentprofile/"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"TikTok"}`)}
                    name="tiktok"
                    control="input2"
                    placeholder={"https://www.tiktok.com/@username"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Website"}`)}
                    name="website"
                    control="input2"
                    placeholder={"https://www.yourwebsite/"}
                  />
                </div>
                <div className="col-md-5">
                  <FormControl
                    className="form-control"
                    label={Translation(translations, `${"Telegram"}`)}
                    name="telegram"
                    control="input2"
                    placeholder={"https://t.me/username"}
                  />
                </div>
                <div className="col-md-5">
                  {/* <FormControl
                      className="form-control"
                      label={Translation(translations, `${"Whatsapp"}`)}
                      name="social[whatsapp]"
                      control="input2"
                      placeholder={"https://www.realtor.com/agentprofile/"}
                    /> */}
                  <FormControl
                    updatess={(item) =>
                      setInitialValues({
                        ...initialValues,
                        whatsapp: `+${item}`,
                      })
                    }
                    datas={initialValues.whatsapp}
                    label={Translation(translations, `${"Whatsapp"}`)}
                    hiddenVal={"code_whatsapp_number"}
                    name="whatsapp"
                    control="intl2"
                  />
                </div>
              </div>
              <SubmitButton
                props={submitbutton}
                buttonLoading={res.isLoading}
              />
            </Form>
          </Formik>
        </div>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Attibutes list for signature template
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>First Name</td>
                      <td> firstname </td>
                    </tr>
                    <tr>
                      <td>Last Name</td>
                      <td> lastname </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td> email </td>
                    </tr>
                    <tr>
                      <td>Mobile Number 1</td>
                      <td> mobile_number </td>
                    </tr>
                    <tr>
                      <td>Mobile Number 2</td>
                      <td> mobile_number_2 </td>
                    </tr>
                    <tr>
                      <td>Title / Designation</td>
                      <td> title </td>
                    </tr>
                    <tr>
                      <td>Department</td>
                      <td> department </td>
                    </tr>
                    <tr>
                      <td>Fax</td>
                      <td> fax </td>
                    </tr>
                    <tr>
                      <td>Office Phone</td>
                      <td> office_phone </td>
                    </tr>
                    <tr>
                      <td>Street Address</td>
                      <td> street_address </td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td> city </td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td> state </td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td> country </td>
                    </tr>
                    <tr>
                      <td>Potal Code</td>
                      <td> zip_code </td>
                    </tr>
                    <tr>
                      <td>Avatar</td>
                      <td> avatar </td>
                    </tr>
                    <tr>
                      <th
                        colspan="2"
                        className="text-center bg-th bg-custom-more"
                      >
                        <strong>Social Profile</strong>
                      </th>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td> website </td>
                    </tr>
                    <tr>
                      <td>Facebook</td>
                      <td> facebook </td>
                    </tr>
                    <tr>
                      <td>Instagram</td>
                      <td> instagram </td>
                    </tr>
                    <tr>
                      <td>Twitter</td>
                      <td> twitter </td>
                    </tr>
                    <tr>
                      <td>Linkedin</td>
                      <td> linkedin </td>
                    </tr>
                    <tr>
                      <td>Youtube</td>
                      <td> youtube </td>
                    </tr>
                    <tr>
                      <td>TikTok</td>
                      <td> tiktok </td>
                    </tr>
                    <tr>
                      <td>Telegram</td>
                      <td> telegram </td>
                    </tr>
                    <tr>
                      <td>SnapChat</td>
                      <td> snapchat </td>
                    </tr>
                    <tr>
                      <td>Discord</td>
                      <td> discord </td>
                    </tr>
                    <tr>
                      <td>Pinterest</td>
                      <td> pinterest </td>
                    </tr>
                    <tr>
                      <td>Zillow</td>
                      <td> zillow </td>
                    </tr>
                    <tr>
                      <td>Realtor</td>
                      <td> realtor </td>
                    </tr>
                    <tr>
                      <td>Whatsapp</td>
                      <td> whatsapp </td>
                    </tr>
                    <tr>
                      <th
                        colspan="2"
                        className="text-center bg-th bg-custom-more"
                      >
                        <strong>System General Settings</strong>
                      </th>
                    </tr>
                    <tr>
                      <td>Title System</td>
                      <td> system- title - system</td>
                    </tr>
                    <tr>
                      <td>Default Street Address</td>
                      <td> system-default-street-address</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td> system- city</td>
                    </tr>
                    <tr>
                      <td>State</td>
                      <td> system- state</td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td> system- country</td>
                    </tr>
                    <tr>
                      <td>Postal Code</td>
                      <td> system- postal - code</td>
                    </tr>
                    <tr>
                      <th
                        colspan="2"
                        className="text-center bg-th bg-custom-more"
                      >
                        <strong>System Social Settings</strong>
                      </th>
                    </tr>
                    <tr>
                      <td>Facebook</td>
                      <td> system- facebook</td>
                    </tr>
                    <tr>
                      <td>Instagram</td>
                      <td> system- instagram</td>
                    </tr>
                    <tr>
                      <td>Twitter</td>
                      <td> system- twitter</td>
                    </tr>
                    <tr>
                      <td>Linkedin</td>
                      <td> system- linkedin</td>
                    </tr>
                    <tr>
                      <td>Youtube</td>
                      <td> system- youtube</td>
                    </tr>
                    <tr>
                      <td>TikTok</td>
                      <td> system- tiktok</td>
                    </tr>
                    <tr>
                      <td>Telegram</td>
                      <td> system- telegram</td>
                    </tr>
                    <tr>
                      <td>SnapChat</td>
                      <td> system- snapchat</td>
                    </tr>
                    <tr>
                      <td>Discord</td>
                      <td> system- discord</td>
                    </tr>
                    <tr>
                      <td>Pinterest</td>
                      <td> system- pinterest</td>
                    </tr>
                    <tr>
                      <td>Zillow</td>
                      <td> system- zillow</td>
                    </tr>
                    <tr>
                      <td>Realtor</td>
                      <td> realtor </td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td> system- website</td>
                    </tr>
                    <tr>
                      <td>Whatsapp</td>
                      <td> system- whatsapp</td>
                    </tr>
                    <tr>
                      <th
                        colspan="2"
                        className="text-center bg-th bg-custom-more"
                      >
                        <strong>System Localization Settings</strong>
                      </th>
                    </tr>
                    <tr>
                      <td>Language</td>
                      <td> system- language</td>
                    </tr>
                    <tr>
                      <td>Time Zone</td>
                      <td> system- user_timezone</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6"></div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default Register;