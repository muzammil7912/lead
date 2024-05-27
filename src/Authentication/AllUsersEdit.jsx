import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import usePost from "../customHooks/usePost";
import Loader from "../components/common/Loading";
import useFetch from "../customHooks/useFetch";
import { Form, Formik } from "formik";
import { MainHeadingContext } from "../context/MainHeadingContext";
import FormControl from "../components/form/FormControl";
import { Translation } from "../components/Translation";
import File from "../components/form/File";
import LoopSelect from "../components/form/LoopSelect";
import allData from "../Data/data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SubmitButton from "../components/SubmitButton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Dropdown5 from "../components/form/Dropdown5.jsx";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { StringConvert } from "../components/StringConvert";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { MainTranslationContext } from "../context/MainTranslationContext";
import DropdownLanguage from "../components/form/DropdownLanguage";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import config from "../services/config.json";
import { getTokenSession } from "../utils/common";
import gravatar from 'gravatar';
import md5 from "md5";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
function AllUsersEdit() {
  const { id } = useParams();
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { transData } = useContext(MainTranslationContext);
  const { addHeading } = useContext(MainHeadingContext);
  const { data: AllEditUserData, loading6 } = useFetch("", `getAllEditUser/${id}`);
  const navigate = useNavigate();
  const [languages, setLanguages] = useState(permissions["system-language"].setting_value ?? "31");

  const [emails, setEmails] = useState("");
  const [emailse, setEmailse] = useState(false);
  const [userTimeZone, setuserTimeZone] = useState();
  const [image, setImage] = useState('');
  const [TemplatesDropDown, setTemplatesDropDown] = useState();
  const [SignatureID, setSignatureID] = useState();
  const [Selected_User_Profile, setSelected_User_Profile] = useState();
  const [SelectedRoleVAl, setSelectedRoleVAl] = useState();
  const [Reports_to, setReports_to] = useState("");
  const [SelectedRoletext, setSelectedRoletext] = useState();
  const [Templatename, setTemplatename] = useState();
  const [TemplatesDropDown2, setTemplatesDropDown2] = useState();
  const [UserProfile_dropdown, setUserProfile_dropdown] = useState();

  useEffect(() => {
    addHeading("Edit User");
    if ((leadPermission?.user_module?.view === "0" || leadPermission?.user_module?.active_module === "0" || leadPermission?.user_module?.edit === "0" || id === "1")) {
      navigate(`/${config.ddemoss}`);
    }
    if (AllEditUserData) {
      const { getEditUserApi, getTemplateNameApi, getAllProfilesApi, getSetDefultTemplateApi } = AllEditUserData;
      setEmails(getEditUserApi?.email)
      setuserTimeZone(getEditUserApi?.usertimezone)
      setImage(getEditUserApi?.avatar)
      setTemplatesDropDown(getEditUserApi?.signature)
      setSignatureID(getEditUserApi?.signature_id)
      setSelected_User_Profile(getEditUserApi?.user_role_profile_id)
      setSelectedRoleVAl(getEditUserApi?.user_role_id)
      setReports_to(getEditUserApi?.inf_reports_to)
      setSelectedRoletext(getEditUserApi?.role_name)
      setTemplatename(getEditUserApi?.template_name)
      if (getEditUserApi?.usr_language) {
        setLanguages(getEditUserApi?.usr_language)
      }
      setApiTemplatesDrop(getTemplateNameApi)
      setUserProfile_dropdown(getAllProfilesApi)

      if (getSetDefultTemplateApi) {
        setsignatureDefualt(getSetDefultTemplateApi?.signature_template?.template_code)
        setDefSignatureID(getSetDefultTemplateApi?.signature_template?.template_id)
        setDefTemplatename(getSetDefultTemplateApi?.signature_template?.template_name)
      }
    }
  }, [AllEditUserData]);


  const [res, apiMethod] = usePost();
  const [resForm, apiMethodForm] = usePost();
  const [res4, roles_report] = usePost();
  const [res3, apiMethod3] = usePost();
  const [res5, apimethod_PostDefualtSig] = usePost();
  const [editorvalue, seteditorvalue] = useState();
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [ApiTemplatesDrop, setApiTemplatesDrop] = useState();
  const [signatureDefualt, setsignatureDefualt] = useState();
  const [DefSignatureID, setDefSignatureID] = useState();
  const [DefTemplatename, setDefTemplatename] = useState();


  const handleClose = () => setShow(false);
  const handleShow = () => {
    ViewSignature()
    setShow(true);
  }


  const handlenode = (e, item) => {
    let closestDropdown = e.target.closest(".dropdown-menu");
    setSelectedRoleVAl(item.id)
    const elements = document.querySelectorAll(".sellist a");
    elements.forEach(element => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    setSelectedRoletext(e.target.textContent)
    closestDropdown.classList.remove("show");
    let formdata = new FormData();
    formdata.append("userRole", item.id)
    formdata.append("reports_to", "userReportsTo")
    roles_report("postUserRoleRelatedToName", formdata)
  }

  useEffect(() => {
    if (res4?.data) {
      setReports_to(res4?.data[0].upar_role_name)
    }

  }, [res4.data]);

  const [value, setvalue] = useState({
    mnumber: "",
    office_phone: ``,
    mobile_phone: ``,
    home_phone: ``,
    secondary_phone: "",
    number: "",
    whatsapp: ""
  });

  const handleTemplate = (selected) => {
    let formdata = new FormData();
    formdata.append("id", selected.target.value);
    setSignatureID(selected.target.value)
    apiMethod("postTemplateById", formdata);
  }



  useEffect(() => {
    if (res.data) {
      setTemplatesDropDown(res?.data[0]?.template_code)
    }
  }, [res.data]);

  const ViewSignature = () => {
    let formdata = new FormData();
    formdata.append("signature", "userEdit")
    formdata.append("userSignId", id)
    formdata.append("sign_input_type", TemplatesDropDown ? TemplatesDropDown : signatureDefualt)
    apiMethod3("postTemplateSignature", formdata)
  }


  useEffect(() => {
    if (res3.data) {
      setTemplatesDropDown2(res3?.data?.signature)
    }
  }, [res3.data]);


  // ------------...................................------------------------

  const setDefaultSignature = () => {
    let formdata = new FormData();
    formdata.append("template_id", SignatureID);
    swal({
      title: "Are you sure to replace the default template?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apimethod_PostDefualtSig("postSetDefultTemplate", formdata)
      }
    });
  }

  useEffect(() => {
    if (res5?.data?.message) {
      toast.success(res5?.data?.message)
    }
  }, [res5.data]);
  useEffect(() => {
    if (resForm) {
      toast.success(resForm?.data?.message);
      if (resForm?.data?.message === "Successfully Updated!") {
        navigate(`/${config.ddemoss}users`)
      }

    }
  }, [resForm.data]);

  const handleEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(e)}?d=404`;
    if (emailRegex.test(e)) {
      const avatarUrl = gravatar.url(e, { s: '200', r: 'pg', d: 'identicon' }, true);
      fetch(gravatarUrl)
        .then(response => {
          if (response.status === 404) {
            console.log('Email is not registered with Gravatar');
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
              .then((res) => {
                setEmailse(res.data.aleady_exist);
                setImage(permissions[`system-default-avatar-image`]?.setting_value)

              })
              .catch((err) => {
                console.log("create errr", err);
              });
          } else {
            console.log('Email is registered with Gravatar');
            setImage(`${avatarUrl}`)
            console.log(avatarUrl)
          }
        })
        .catch(error => {
          console.error('Error checking Gravatar image:', error);
        });
    }
    else {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
        .then((res) => {
          setEmailse(res.data.aleady_exist);
          if (image === '') {
            setImage(permissions[`system-default-avatar-image`]?.setting_value)
          }
        })
        .catch((err) => {
          console.log("create errr", err);
        });
    }


    setEmails(e);
  }
  if (loading6 || !AllEditUserData) return <Loader />;


  const {
    getUserRolesApi,
    getEditUserApi,
    getListTimeZoneApi,
    getAllViewGeneralSystemSettingsApi,
    getAllViewSocialLinksSystemSettingsApi,
    getAllViewLocalizationSystemSettingsApi
  } = AllEditUserData;



  const initialValues = {
    fname: getEditUserApi?.f_name ?? "",
    lname: getEditUserApi?.l_name ?? "",
    username: getEditUserApi?.username ?? "",
    password: "",
    cpassword: "",
    utype: getEditUserApi?.utype ?? "",
    contact_type: getEditUserApi?.type_of_contact ?? "",
    userstatus: getEditUserApi?.userstatus ?? "",
    user_timezone: getEditUserApi?.usertimezone ?? "",
    mnumber: getEditUserApi?.mnumber ?? "",
    number: getEditUserApi?.number ?? "",
    title: getEditUserApi?.inf_title ?? "",
    department: getEditUserApi?.inf_department ?? "",
    office_phone: getEditUserApi?.inf_office_phone ?? "",
    mobile_phone: getEditUserApi?.inf_mobile_phone ?? "",
    home_phone: getEditUserApi?.inf_home_phone ?? "",
    fax: getEditUserApi?.inf_fax ?? "",
    other_email: getEditUserApi?.inf_other_email ?? "",
    secondary_email: getEditUserApi?.inf_secondary_email ?? "",
    secondary_phone: getEditUserApi?.inf_secondary_phone ?? "",
    street_address: getEditUserApi?.usr_street_address ?? "",
    city: getEditUserApi?.usr_city ?? "",
    state: getEditUserApi?.usr_state ?? "",
    country: getEditUserApi?.usr_country ?? "",
    postal_code: getEditUserApi?.usr_postal_code ?? "",
    language: getEditUserApi?.usr_language ?? "",
    whatsapp: getEditUserApi?.usersocialprofile?.whatsapp ?? "",
    telegram: getEditUserApi?.usersocialprofile?.telegram ?? "",
    website: getEditUserApi?.usersocialprofile?.website ?? "",
    tiktok: getEditUserApi?.usersocialprofile?.tiktok ?? "",
    realtor: getEditUserApi?.usersocialprofile?.realtor ?? "",
    youtube: getEditUserApi?.usersocialprofile?.youtube ?? "",
    zillow: getEditUserApi?.usersocialprofile?.zillow ?? "",
    linkedin: getEditUserApi?.usersocialprofile?.linkedin ?? "",
    pinterest: getEditUserApi?.usersocialprofile?.pinterest ?? "",
    twitter: getEditUserApi?.usersocialprofile?.twitter ?? "",
    discord: getEditUserApi?.usersocialprofile?.discord ?? "",
    snapchat: getEditUserApi?.usersocialprofile?.snapchat ?? "",
    instagram: getEditUserApi?.usersocialprofile?.instagram ?? "",
    facebook: getEditUserApi?.usersocialprofile?.facebook ?? "",
    usergeneralsettings: getEditUserApi.usergeneralsettings ?? "",
    usersocialsettings: getEditUserApi.usersocialsettings ?? "",
    userlocalizedsettings: getEditUserApi.userlocalizedsettings ?? "",
  }





  function handleSubmit(values) {
    let passwordtest = /^[a-zA-Z0-9]{8,30}$/;
    let emailvalid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let formdata = new FormData();
    if (values.fname && values.lname && values.username && emails && values.utype && values.contact_type && values.userstatus && values.password === values.cpassword && emailvalid.test(emails)) {
      formdata.append("id", id);
      formdata.append("fname", values.fname);
      formdata.append("lname", values.lname);
      formdata.append("username", values.username);
      formdata.append("email", emails);
      formdata.append("password", values.password);
      formdata.append("cpassword", values.cpassword);
      formdata.append("urole", SelectedRoleVAl);
      formdata.append("uprofile", Selected_User_Profile);
      formdata.append("utype", values.utype);
      formdata.append("mnumber", value.mnumber ? value.mnumber : values.mnumber);
      formdata.append("number", value.number ? value.number : values.number);
      formdata.append("userstatus", values.userstatus);
      formdata.append("title", values.title);
      formdata.append("department", values.department);
      formdata.append("office_phone", value.office_phone ? value.office_phone : values.office_phone);
      formdata.append("mobile_phone", value.mobile_phone ? value.mobile_phone : values.mobile_phone);
      formdata.append("home_phone", value.home_phone ? value.home_phone : values.home_phone);
      formdata.append("fax", values.fax);
      formdata.append("other_email", values.other_email);
      formdata.append("secondary_email", values.secondary_email);
      formdata.append("reports_to", Reports_to);
      formdata.append("secondary_phone", value.secondary_phone ? value.secondary_phone : values.secondary_phone);
      formdata.append("signature", TemplatesDropDown ? TemplatesDropDown : signatureDefualt);
      formdata.append("signature_id", SignatureID ? SignatureID : "0");
      formdata.append("street_address", values.street_address);
      formdata.append("city", values.city);
      formdata.append("state", values.state);
      formdata.append("country", values.country);
      formdata.append("postal_code", values.postal_code);
      formdata.append("language", values.language);
      formdata.append("user_timezone", userTimeZone);
      formdata.append("contact_type", values.contact_type);
      if ((typeof image) === "object") {
        formdata.append("avatar", image);
        formdata.append("avatarURL", "");
      }
      else {
        formdata.append("avatar", "");
        formdata.append("avatarURL", image);
      }
      formdata.append("generalsetting[system-avatar-image]", getAllViewGeneralSystemSettingsApi["system-avatar-image"]?.setting_value);
      formdata.append("generalsetting[system-favicon-image]", getAllViewGeneralSystemSettingsApi["system-favicon-image"]?.setting_value);
      formdata.append("generalsetting[system-title-system]", getAllViewGeneralSystemSettingsApi["system-title-system"]?.setting_value);
      formdata.append("generalsetting[system-default-street-address]", getAllViewGeneralSystemSettingsApi["system-default-street-address"]?.setting_value);
      formdata.append("generalsetting[system-state]", getAllViewGeneralSystemSettingsApi["system-state"]?.setting_value);
      formdata.append("generalsetting[system-country]", getAllViewGeneralSystemSettingsApi["system-country"]?.setting_value);
      if (!getAllViewSocialLinksSystemSettingsApi.message && getAllViewSocialLinksSystemSettingsApi) {
        for (let index2 in getAllViewSocialLinksSystemSettingsApi) {
          formdata.append(`socialsetting[${getAllViewSocialLinksSystemSettingsApi[index2]?.setting_name}]`, `${getAllViewSocialLinksSystemSettingsApi[index2]?.setting_value}`);
        }
      }
      formdata.append("localization[system-language]", getAllViewLocalizationSystemSettingsApi[`system-language`]?.setting_value);
      formdata.append("localization[system-user_timezone]", getAllViewLocalizationSystemSettingsApi[`system-user_timezone`]?.setting_value);
      formdata.append("social[whatsapp]", value.whatsapp ? value.whatsapp : values.whatsapp);;
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
      apiMethodForm("postUpdateUser", formdata);
    }
    else if (values.password != values.cpassword) {
      toast.warning("password didn't match !")
    }
    else if (!emailvalid.test(values.email)) {
      toast.warning("Email Invalid !")
    }
    else if (!passwordtest.test(values.password)) {
      toast.warning("Password should be atleast 8 characters !")
    }
    else {
      swal({
        title: "Some Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    }
  }

  const API_URL = "https://77em4-8080.sse.codesandbox.io";
  const UPLOAD_ENDPOINT = "upload_files";

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  // ckeditorupload
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body,
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${API_URL}/${res.filename}`,
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


  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Update User",
  };
  return (
    <div className="EditUsers">
      <div className="container-fluid">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form name="myForm">
            <div className="row clearfix">
              <div className="col-12">
                <div className="card">
                  <div className="card-header borderblue">
                    <h3 className="card-title">Edit User Information</h3>
                  </div>
                  <div className="card-body">
                    <div className="row fv-plugins-icon-container">
                      <div className="col-md-9 col-lg-10">
                        <div className="row">
                          <div className="col-md-6">
                            <FormControl
                              className="form-control my-1"
                              required={true}
                              label={Translation(translations, "First Name")}
                              name="fname"
                              control="input3"
                              placeholder={Translation(
                                translations,
                                "First Name"
                              )}
                            />
                          </div>
                          <div className="col-md-6">
                            <FormControl
                              className="form-control my-1"
                              required={true}
                              label={Translation(translations, "Last Name")}
                              name="lname"
                              control="input3"
                              placeholder={Translation(
                                translations,
                                "Last Name"
                              )}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <FormControl
                              className="form-control my-1"
                              required={true}
                              label={Translation(translations, "Username")}
                              name="username"
                              control="input3"

                              placeholder={Translation(translations, "Username")}
                            />
                          </div>
                          <div className="col-md-6">
                            <FormControl
                              className="form-control my-1"
                              required={true}
                              label={Translation(translations, "Email")}
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
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <FormControl
                              className="form-control my-1"
                              label={Translation(translations, "Password")}
                              name="password"
                              control="password"
                              placeholder={Translation(translations, "Password")}
                            />
                          </div>
                          <div className="col-md-6">
                            <FormControl
                              className="form-control my-1"
                              label={Translation(
                                translations,
                                "Confirm Password"
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
                          name={"avatar"}
                          value={image ? typeof (image) !== "object" ? image.includes("http") ? image : `${config.baseurl2}${image}` : image : image}
                          onUpload={setImage}
                        ></File>
                        <Link onClick={() => setImage('https://www.gravatar.com/avatar/9f199d16db9e64e35e53f2b0f13ac617?s=160')} className="float-left" >Use Gravatar</Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group form-group useredits">
                          <label className="labelfor_custom">Role</label>
                          <Dropdown className="dropdown div-block">
                            <Dropdown.Toggle className="roleCustom my-1" type="button">
                              {SelectedRoletext ? SelectedRoletext : "--select--"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={`dropdown-menu`} id="organization">
                              <ul className="list-group">
                                {
                                  getUserRolesApi &&
                                  <LoopSelect handleN={(e, item) => handlenode(e, item)} node={getUserRolesApi["CEO"]} />
                                }
                              </ul>
                            </Dropdown.Menu>
                          </Dropdown>

                        </div>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="" className="labelfor_custom" >Profile</label>
                        <select className="form-control my-1" value={Selected_User_Profile} onChange={(e) => { setSelected_User_Profile(e.target.value) }}>
                          {Array.isArray(UserProfile_dropdown) && UserProfile_dropdown?.map((item) => {
                            return (
                              <option value={item.id} key={item.id}>{item.profile_name}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <FormControl
                          className="form-control my-1"
                          selectList={allData.registerPage.UserType}
                          required={true}
                          label={Translation(translations, `${"User Type"}`)}
                          name="utype"
                          control="select"
                          defaultValue={initialValues.utype}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <FormControl
                          className="form-control my-1"
                          selectList={allData.registerPage.ContactType}
                          label={Translation(translations, `${"Contact Type"}`)}
                          name="contact_type"
                          control="select"
                          required={true}
                          defaultValue={initialValues.contact_type}
                        />
                      </div>
                      <div className="col-md-4">
                        <FormControl
                          className="form-control my-1 Custom_edit"
                          updatess={(item) =>
                            setvalue({
                              ...value,
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
                            setvalue({
                              ...value,
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
                          required={true}
                          defaultValue={initialValues.userstatus}
                        />
                      </div>
                      <div className="mt-5 col-md-12">
                        <h6>More Information</h6>
                        <hr />
                      </div>
                      <div className="col-md-5">
                        <FormControl
                          className="form-control"
                          label={Translation(translations, `${"Title"}`)}
                          name="title"
                          control="input2"
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
                      </div>
                      <div className="col-md-5">
                        <FormControl
                          className="form-control"
                          label={Translation(translations, `${"Department"}`)}
                          name="department"
                          control="input2"
                        />
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-6">
                        <FormControl
                          className="form-control"
                          type={"email"}
                          label={Translation(translations, `${"Other Email"}`)}
                          name="other_email"
                          control="input2"
                        />
                      </div>
                      <div className="col-md-5">
                        <FormControl
                          updatess={(item, code) =>
                            setvalue({
                              ...value,
                              office_phone: `+${item}`,
                            })
                          }
                          datas={initialValues.office_phone}
                          label={Translation(translations, `${"Office Phone"}`)}
                          hiddenVal={"code_office_phone"}
                          name="office_phone"
                          control="Intl2WithValue"
                        />
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-6">
                        <FormControl
                          className="form-control"
                          type={"email"}
                          label={Translation(
                            translations,
                            `${"Secondary Email"}`
                          )}
                          name="secondary_email"
                          control="input2"
                        />
                      </div>
                      <div className="col-md-5">
                        {" "}
                        <FormControl
                          updatess={(item) =>
                            setvalue({
                              ...value,
                              mobile_phone: `+${item}`,
                            })
                          }
                          datas={initialValues.mobile_phone}
                          label={Translation(translations, `${"Mobile Phone"}`)}
                          hiddenVal={"code_mobile_phone"}
                          name="mobile_phone"
                          control="Intl2WithValue"
                        />
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-6">
                        {" "}
                        <FormControl
                          className="form-control"
                          label={Translation(translations, `${"Reports To"}`)}
                          name="reports_to"
                          control="input2"
                          disabled={true}
                          value={Reports_to}
                        />
                      </div>
                      <div className="col-md-5">
                        {" "}
                        <FormControl
                          updatess={(item) =>
                            setvalue({
                              ...value,
                              home_phone: `+${item}`,
                            })
                          }
                          datas={initialValues.home_phone}
                          label={Translation(translations, `${"Home Phone"}`)}
                          hiddenVal={"code_home_phone"}
                          name="home_phone"
                          control="Intl2WithValue"
                        />
                      </div>
                      <div className="col-md-1"></div>
                      <div className="col-md-6">
                        {" "}
                        <FormControl
                          updatess={(item) =>
                            setvalue({
                              ...value,
                              secondary_phone: `+${item}`,
                            })
                          }
                          datas={initialValues.secondary_phone}
                          label={Translation(
                            translations,
                            `${"Secondary Phone"}`
                          )}
                          hiddenVal={"code_secondary_phone"}
                          name="secondary_phone"
                          control="Intl2WithValue"
                        />
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="">Signature</label>
                        <FormControl
                          className="form-control my-1"
                          // defaultValue={SignatureID}
                          firstSelect={Templatename ? Templatename : DefTemplatename}
                          label={Translation(translations, "Templates")}
                          name="sign_temp"
                          selectList={ApiTemplatesDrop}
                          custom_label_name="template_name"
                          customer_value_name="template_id"
                          onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                        <div className="text-right"><small><Link to={""} className="defcode" onClick={setDefaultSignature}>Default Template</Link></small></div>
                      </div>
                      <div className="col-md-10">
                        <CKEditor
                          config={{
                            extraPlugins: [uploadPlugin],
                          }}
                          editor={ClassicEditor}
                          data={TemplatesDropDown ? TemplatesDropDown : signatureDefualt}
                          onReady={(editor) => { }}
                          onChange={(event, editor) => {
                            const data = editor.getData();

                            seteditorvalue(data, event, editor);
                          }}
                        />
                        <div
                          onClick={handleShow}
                          className="col-md-6 float-left signmodal "
                        >
                          Signature Attributes
                        </div>
                        <div
                          onClick={() => setModalShow(true)}
                          className="col-md-6 float-right attributemodal ViewAttri"
                        >
                          View Attributes
                        </div>
                      </div>
                      <div className="mt-5 col-md-12">
                        <h6>User Address</h6>
                        <hr />
                      </div>
                      <div className="col-md-5">
                        <FormControl
                          className="form-control"
                          label={Translation(
                            translations,
                            `${"Street Address"}`
                          )}
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
                        <h6>Localization</h6>
                        <hr />
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            {Translation(translations, "Location")}
                          </label>
                          <div className="col-sm-8">

                            <DropdownLanguage
                              list={transData}
                              selectedVal={setLanguages}
                              defaultval={languages}
                            />
                          </div>
                        </div>
                        <label className="col-sm-4 col-form-label">
                          {Translation(translations, "Time Zone")}
                        </label>
                        <div className="col-sm-8">
                          <Dropdown5
                            list={getListTimeZoneApi}
                            selected={userTimeZone}
                            changes={(value) => setuserTimeZone(value)}
                          />
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
                          placeholder={
                            "http://www.snapchat.com/add/YourUserName"
                          }
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
                          name="whatsapp"
                          control="input2"
                          placeholder={"https://www.realtor.com/agentprofile/"}
                        /> */}
                        <FormControl
                          updatess={(item) => {
                            setvalue({
                              ...value,
                              whatsapp: `+${item}`,
                            })
                          }

                          }
                          datas={initialValues.whatsapp}
                          label={Translation(translations, `${"Whatsapp"}`)}
                          hiddenVal={"code_mobile_phone"}
                          name="whatsapp"
                          control="Intl2WithValue"
                        />
                      </div>
                    </div>
                    <SubmitButton props={submitbutton} buttonLoading={resForm.isLoading} />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        {/* signature modal */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Signature Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {!res3.isLoading && StringConvert(TemplatesDropDown2)} */}
            {TemplatesDropDown2 && StringConvert(TemplatesDropDown2)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

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
                      <th colSpan="2" className="text-center bg-th bg-custom-more"><strong>Social Profile</strong></th>
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
                      <th colspan="2" className="text-center bg-th bg-custom-more"><strong>System General Settings</strong></th>
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
                      <th colspan="2" className="text-center bg-th bg-custom-more"><strong>System Social Settings</strong></th>
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
                      <th colspan="2" className="text-center bg-th bg-custom-more"><strong>System Localization Settings</strong></th>
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
              <div className="col-md-6">

              </div>
            </div>

          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div >
  );
}

export default AllUsersEdit;