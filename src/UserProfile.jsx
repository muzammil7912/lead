import React, { useContext, useState, useEffect, useRef } from "react";
import File from "./components/form/File";
import SubmitButton from "./components/SubmitButton";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form, Formik } from "formik";
import FormControl from "./components/form/FormControl";
import { Translation } from "./components/Translation";
import { MainTranslationContexts } from './context/MainTranslationContexts';
import usePost from "./customHooks/usePost";
import useFetch from "./customHooks/useFetch";
import Loader from "./components/common/Loading";
import { MainTranslationContext } from "./context/MainTranslationContext";
import { MainAuthPermissionsContext } from "./context/MainAuthPermissionsContext";
import Dropdown6 from "./components/form/Dropdown6.jsx";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import config from "./services/config.json";
import swal from "sweetalert";
import axios from "axios";
import { getTokenSession } from "./utils/common";
import { Link } from "react-router-dom";
import { MainLeadPermissionContext } from "./context/MainLeadPermissionContext";
import { useNavigate } from "react-router-dom";
import { StringConvert } from "./components/StringConvert";
import { Button } from "react-bootstrap";
import { MainHeadingContext } from "./context/MainHeadingContext";


function UserProfile() {
    const [id, setId] = useState('');
    const { translations } = useContext(MainTranslationContexts)
    const { addHeading } = useContext(MainHeadingContext);
    const { leadPermission } = useContext(MainLeadPermissionContext);
    const { addsetPermissions, permissions } = useContext(MainAuthPermissionsContext);
    const [res, apiMethod] = usePost();
    const [userRes, apiMethodupdateUser] = usePost();
    const [res2, Apideftemplate] = usePost();
    const [res1, postDefultTimeZone] = usePost();
    const { data: getLoginUserProfileEdit, loading1, error1, } = useFetch("", "getLoginUserProfileEdit");
    const { data: getListTimeZone, loading2, error2, } = useFetch("", "getListTimeZone");
    const { data: getTemplateName, loading3, error3, } = useFetch("", "getTemplateName");
    const { data: getSetDefultTemplate, loading5, error4, } = useFetch("", "getSetDefultTemplate");
    const { transData } = useContext(MainTranslationContext);
    const [userTimeZone, setuserTimeZone] = useState();
    const [TimeZoneDrop, setTimeZoneDrop] = useState();
    const [Deftimezone, setDeftimezone] = useState();
    const [Signaturedata, setSignaturedata] = useState();
    const [Signaturedata3, setSignaturedata3] = useState();
    const [SignatureID, setSignatureID] = useState("");
    const [ApiTemplatesDrop, setApiTemplatesDrop] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [TemplatesDropDown, setTemplatesDropDown] = useState('');
    const [avatar, setAvatar] = useState("");
    const [DefTemCode, setDefTemCode] = useState();
    const [DefSigID, setDefSigID] = useState("");
    const isComponentMounted2 = useRef(true);
    const [show, setShow] = useState(false);
    const [res3, apiMethod3] = usePost();
    const [TemplatesDropDown2, setTemplatesDropDown2] = useState();
    const navigate = useNavigate();
    const [value, setvalue] = useState({
        mnumber: "",
        office_phone: ``,
        mobile_phone: ``,
        home_phone: ``,
        secondary_phone: "",
        number: "",
        whatsapp: "",
        wtcode: ""
    });
    useEffect(() => {

        if (leadPermission) {
            addHeading("Profile")
            if ((leadPermission?.profile_module?.view === '0')) {
                navigate(`/${config.ddemoss}`)
            }
        }
    }, [leadPermission])

    console.log(leadPermission.profile_module)

    useEffect(() => {
        if (getLoginUserProfileEdit) {
            setuserTimeZone(getLoginUserProfileEdit?.usertimezone)
            setSignaturedata(getLoginUserProfileEdit?.template_code)
            setSignaturedata3(getLoginUserProfileEdit?.template_code)
            setAvatar(`${getLoginUserProfileEdit?.avatar}`)
            setSignatureID(getLoginUserProfileEdit?.template_id)
            setId(getLoginUserProfileEdit?.id)
        }
    }, [getLoginUserProfileEdit]);

    useEffect(() => {
        if (getListTimeZone) {
            setTimeZoneDrop(getListTimeZone)
        }
    }, [getListTimeZone]);

    const handleClose = () => setShow(false);

    useEffect(() => {
        let formdata = new FormData();
        postDefultTimeZone("postDefultTimeZone", formdata)
    }, []);
    useEffect(() => {
        if (res1.data) {
            setDeftimezone(res1.data.timezone)
        }
    }, [res1]);


    useEffect(() => {
        if (getTemplateName) {
            setApiTemplatesDrop(getTemplateName)
        }

    }, [getTemplateName]);

    useEffect(() => {
        if (getSetDefultTemplate) {
            setDefTemCode(getSetDefultTemplate?.signature_template[0]?.template_code);
            setDefSigID(getSetDefultTemplate?.template_id)
        }
    }, [getSetDefultTemplate]);

    const handleTemplate = (selected) => {
        let formdata = new FormData();
        setSignatureID(selected.target.value)
        formdata.append("id", selected.target.value);
        apiMethod("postTemplateById", formdata);

    }

    useEffect(() => {
        if (res.data) {
            console.log(res?.data[0]?.template_code)
            setSignaturedata(res?.data[0]?.template_code)
            setSignaturedata3(res?.data[0]?.template_code)
        }
    }, [res.data]);
    useEffect(() => {
        let formdata = new FormData();
        formdata.append("template", "get_defatul_signature");
        Apideftemplate("postTemplateDefultSet", formdata);
    }, []);


    const handleShow = () => {
        ViewSignature()

    }

    const ViewSignature = () => {
        let formdata = new FormData();
        formdata.append("signature", "userEdit")
        formdata.append("userSignId", id)
        formdata.append("sign_input_type", Signaturedata3)
        apiMethod3("postTemplateSignature", formdata)
    }

    useEffect(() => {
        if (res3.data) {
            setTemplatesDropDown2(res3?.data?.signature)
            setShow(true);
        }
    }, [res3.data]);


    useEffect(() => {
        if (userRes?.data) {
            toast.success(userRes?.data?.message)
            if (isComponentMounted2.current) {
                axios.defaults.headers = {
                    "Content-Type": "multipart/form-data",
                    authentication: `${getTokenSession()}`,
                };
                axios.get(`${config.apiEndPoint}getAuthTokenInfo`)
                    .then((response) => {
                        addsetPermissions(response.data)
                    })
                    .catch((err) => {
                        console.log("eerr", err);
                    });
                return () => {
                    isComponentMounted2.current = false;
                }
            }
        }

    }, [userRes.data]);

    const API_URL = "https://77em4-8080.sse.codesandbox.io";
    const UPLOAD_ENDPOINT = "upload_files";



    const HandleSubmit = (values) => {
        console.log('hamza')
    }

    const HandleSubmit1 = (values) => {

        let formdata = new FormData();
        formdata.append("id", getLoginUserProfileEdit.id);
        formdata.append("fname", values.fname);
        formdata.append("lname", values.lname);
        formdata.append("username", getLoginUserProfileEdit.username);
        formdata.append("email", getLoginUserProfileEdit.email);
        formdata.append("password", "");
        formdata.append("cpassword", "");
        formdata.append("urole", getLoginUserProfileEdit.role_id);
        formdata.append("uprofile", getLoginUserProfileEdit.user_role_profile_id);
        formdata.append("utype", getLoginUserProfileEdit.utype);
        formdata.append("mnumber", value.mnumber ? value.mnumber : values.mnumber);
        formdata.append("number", value.number ? value.number : values.number);
        formdata.append("userstatus", getLoginUserProfileEdit.userstatus);
        formdata.append("title", values.title);
        formdata.append("department", values.department);
        formdata.append("office_phone", value.office_phone ? value.office_phone : values.office_phone);
        formdata.append("mobile_phone", value.mobile_phone ? value.mobile_phone : values.mobile_phone);
        formdata.append("home_phone", value.home_phone ? value.home_phone : values.home_phone);
        formdata.append("fax", values.fax);
        formdata.append("other_email", values.other_email);
        formdata.append("secondary_email", values.secondary_email);
        formdata.append("reports_to", getLoginUserProfileEdit.inf_reports_to);
        formdata.append("secondary_phone", value.secondary_phone ? value.secondary_phone : values.secondary_phone);
        formdata.append("signature", Signaturedata);
        console.log(Signaturedata)
        formdata.append("signature_id", SignatureID ? SignatureID : "0");
        formdata.append("street_address", values.street_address);
        formdata.append("city", values.city);
        formdata.append("state", values.state);
        formdata.append("country", values.country);
        formdata.append("postal_code", values.postal_code);
        formdata.append("language", values.language);
        formdata.append("user_timezone", userTimeZone ? userTimeZone : Deftimezone);
        formdata.append("contact_type", getLoginUserProfileEdit.type_of_contact);
        formdata.append("avatar", avatar);
        formdata.append("social[whatsapp]", value.whatsapp ? value.whatsapp : values.whatsapp);
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
        formdata.append("generalsetting", getLoginUserProfileEdit.usergeneralsettings);
        formdata.append("socialsetting", getLoginUserProfileEdit.usersocialsettings);
        formdata.append("localization", getLoginUserProfileEdit.userlocalizedsettings);
        apiMethodupdateUser("postUpdateUser", formdata);

    }
    const HandleSubmit2 = (values) => {
        if (values.password) {
            if (values.password?.trim()?.length >= 8 && values.password === values.cpassword) {
                let formdata = new FormData();
                formdata.append("id", getLoginUserProfileEdit.id);
                formdata.append("fname", values.fname);
                formdata.append("lname", values.lname);
                formdata.append("username", getLoginUserProfileEdit.username);
                formdata.append("email", getLoginUserProfileEdit.email);
                formdata.append("password", values.password);
                formdata.append("cpassword", values.cpassword);
                formdata.append("urole", getLoginUserProfileEdit.role_id);
                formdata.append("uprofile", getLoginUserProfileEdit.user_role_profile_id);
                formdata.append("utype", getLoginUserProfileEdit.utype);
                formdata.append("mnumber", value.mnumber ? value.mnumber : values.mnumber);
                formdata.append("number", value.number ? value.number : values.number);
                formdata.append("userstatus", getLoginUserProfileEdit.userstatus);
                formdata.append("title", values.title);
                formdata.append("department", values.department);
                formdata.append("office_phone", value.office_phone ? value.office_phone : values.office_phone);
                formdata.append("mobile_phone", value.mobile_phone ? value.mobile_phone : values.mobile_phone);
                formdata.append("home_phone", value.home_phone ? value.home_phone : values.home_phone);
                formdata.append("fax", values.fax);
                formdata.append("other_email", values.other_email);
                formdata.append("secondary_email", values.secondary_email);
                formdata.append("reports_to", getLoginUserProfileEdit.inf_reports_to);
                formdata.append("secondary_phone", value.secondary_phone ? value.secondary_phone : values.secondary_phone);
                formdata.append("signature", Signaturedata);
                formdata.append("signature_id", SignatureID ? SignatureID : "0");
                formdata.append("street_address", values.street_address);
                formdata.append("city", values.city);
                formdata.append("state", values.state);
                formdata.append("country", values.country);
                formdata.append("postal_code", values.postal_code);
                formdata.append("language", values.language);
                formdata.append("user_timezone", userTimeZone ? userTimeZone : Deftimezone);
                formdata.append("contact_type", getLoginUserProfileEdit.type_of_contact);
                formdata.append("avatar", avatar);
                formdata.append("social[whatsapp]", value.whatsapp ? value.whatsapp : values.whatsapp);
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
                formdata.append("generalsetting", getLoginUserProfileEdit.usergeneralsettings);
                formdata.append("socialsetting", getLoginUserProfileEdit.usersocialsettings);
                formdata.append("localization", getLoginUserProfileEdit.userlocalizedsettings);
                apiMethodupdateUser("postUpdateUser", formdata);
            }
            else if (values.password !== values.cpassword) {
                swal({
                    title: "Password & Confirm Password Not Match !",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
            else {
                swal({
                    title: "Password Should be 8 digit !",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
        }
    }


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
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    if (loading1 || !getLoginUserProfileEdit) return <Loader />;
    const initialValues = {
        fname: getLoginUserProfileEdit.f_name,
        lname: getLoginUserProfileEdit.l_name,
        city: getLoginUserProfileEdit.usr_city,
        country: getLoginUserProfileEdit.usr_country,
        state: getLoginUserProfileEdit.usr_state,
        postal_code: getLoginUserProfileEdit.usr_postal_code,
        street_address: getLoginUserProfileEdit.usr_street_address,
        number: getLoginUserProfileEdit.number,
        mnumber: getLoginUserProfileEdit.mnumber,
        password: "",
        cpassword: "",
        title: getLoginUserProfileEdit.inf_title,
        fax: getLoginUserProfileEdit.inf_fax,
        department: getLoginUserProfileEdit.inf_department,
        other_email: getLoginUserProfileEdit.inf_other_email,
        office_phone: getLoginUserProfileEdit.inf_office_phone,
        secondary_email: getLoginUserProfileEdit.inf_secondary_email,
        mobile_phone: getLoginUserProfileEdit.inf_mobile_phone,
        secondary_phone: getLoginUserProfileEdit.inf_secondary_phone,
        home_phone: getLoginUserProfileEdit.inf_home_phone,
        language: getLoginUserProfileEdit.usr_language,
        whatsapp: getLoginUserProfileEdit.usersocialprofile?.whatsapp,
        telegram: getLoginUserProfileEdit.usersocialprofile?.telegram,
        website: getLoginUserProfileEdit.usersocialprofile?.website,
        tiktok: getLoginUserProfileEdit.usersocialprofile?.tiktok,
        realtor: getLoginUserProfileEdit.usersocialprofile?.realtor,
        youtube: getLoginUserProfileEdit.usersocialprofile?.youtube,
        zillow: getLoginUserProfileEdit.usersocialprofile?.zillow,
        linkedin: getLoginUserProfileEdit.usersocialprofile?.linkedin,
        pinterest: getLoginUserProfileEdit.usersocialprofile?.pinterest,
        twitter: getLoginUserProfileEdit.usersocialprofile?.twitter,
        discord: getLoginUserProfileEdit.usersocialprofile?.discord,
        snapchat: getLoginUserProfileEdit.usersocialprofile?.snapchat,
        instagram: getLoginUserProfileEdit.usersocialprofile?.instagram,
        facebook: getLoginUserProfileEdit.usersocialprofile?.facebook,
    }



    return (

        <div className="section-body useredits profilepage mt-3 fv-plugins-bootstrap5 fv-plugins-framework">
            <div className="container-fluid">
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Signature Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {TemplatesDropDown2 && StringConvert(TemplatesDropDown2)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Formik initialValues={initialValues} onSubmit={HandleSubmit}>
                    {({ values }) => (
                        <Form name="myForm">
                            <div className="row clearfix">
                                <div className="col-lg-4 ">
                                    <div className="card soc_sty box_shadow">
                                        <div className="card-img relative">
                                            <div className="dropify-wrapper">
                                                {(leadPermission?.super_admin ||
                                                    leadPermission?.profile_module?.edit === '1') ?
                                                    <React.Fragment>
                                                        <File
                                                            onUpload={setAvatar}
                                                            label="Avatar"
                                                            value={typeof (avatar) !== "object" ?
                                                                avatar.includes("http") ? avatar : `${config.baseurl2}${avatar}` :
                                                                avatar} name={"avatar"}
                                                        />
                                                        <Link onClick={() => setAvatar('https://www.gravatar.com/avatar/9f199d16db9e64e35e53f2b0f13ac617?s=160')} className="m-4 float-left" >Use Gravatar</Link>
                                                    </React.Fragment> :
                                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
                                                        <img
                                                            src={typeof (avatar) !== "object" ?
                                                                avatar.includes("http") ? avatar : `${config.baseurl2}${avatar}` :
                                                                avatar} name={"avatar"}
                                                            alt="image"
                                                        /></div>}
                                                {leadPermission?.super_admin || leadPermission?.profile_module?.edit === '1' ?
                                                    <button type="button" onClick={(event) => { HandleSubmit1(values) }} className='btn btn-primary btn-sm m-4 float-right box_shadow'>
                                                        Update Picture
                                                    </button>
                                                    : ''}
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{getLoginUserProfileEdit?.username}</h5>
                                            <p className="card-text"></p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <i className="mr-1 fas fa-user-tag" title="" data-placement="top" data-original-title="Your Role"></i> {permissions.role_name}</li>
                                            <li className="list-group-item">
                                                <i style={{ marginRight: 16 }} className="fa fa-user" title="Username"></i>{initialValues?.fname}
                                            </li>
                                            <li className="list-group-item">
                                                <i style={{ marginRight: 12 }} className="fa-solid fa-envelope"></i>
                                                {getLoginUserProfileEdit?.email}
                                            </li>
                                            <li className="list-group-item">
                                                <i style={{ marginRight: 12 }} className="fa fa-phone" title="Phone Number"></i>
                                                {getLoginUserProfileEdit?.mnumber}
                                            </li>
                                            <li className="list-group-item">
                                                <i style={{ marginRight: 8 }} className="fas fa-user-alt-slash" title="Status"></i> {getLoginUserProfileEdit?.userstatus === "1" ? "Active" : "Inactive"}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-8 ">
                                    <div className="row">
                                        <Tabs
                                            defaultActiveKey="Profile"
                                            transition={false}
                                            id="noanim-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab eventKey="Profile" title="Profile">
                                                <div className="tab-content">
                                                    <div className="tab-pane fade active show">
                                                        <div className="card box_shadow">
                                                            <div className="card-header">
                                                                <h3 className="card-title">Edit Profile</h3>
                                                            </div>
                                                            <div className="card-body">

                                                                <div className="row clearfix fv-plugins-icon-container">
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin || (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
                                                                                    label={Translation(translations, "First Name")}
                                                                                    name="fname"
                                                                                    control="input3"
                                                                                    placeholder={Translation(translations, "First Name")}
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "First Name")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.fname}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
                                                                                    label={Translation(translations, "Last Name")}
                                                                                    name="lname"
                                                                                    control="input3"
                                                                                    placeholder={Translation(translations, "Last Name")}
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Last Name")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.lname}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
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
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Main Phone Number")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.mnumber}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
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
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Mobile Number")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.number}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
                                                                                    label={Translation(translations, `${"City"}`)}
                                                                                    name="city"
                                                                                    control="input3"
                                                                                    placeholder={Translation(translations, "City")}
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "City")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.city}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
                                                                                    label={Translation(translations, `${"Country"}`)}
                                                                                    name="country"
                                                                                    control="input3"
                                                                                    placeholder={Translation(translations, "Country")}
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Country")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.country}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
                                                                                    label={Translation(translations, `${"State"}`)}
                                                                                    name="state"
                                                                                    control="input3"
                                                                                    placeholder={Translation(translations, "State")}
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "State")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.state}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
                                                                                    label={Translation(translations, `${"Postal Code"}`)}
                                                                                    name="postal_code"
                                                                                    control="input3"
                                                                                    placeholder={Translation(translations, "Postal Code")}
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Postal Code")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.postal_code}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(
                                                                                    translations,
                                                                                    `${"Street Address"}`
                                                                                )}
                                                                                name="street_address"
                                                                                rows="3"
                                                                                control="textarea2"
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Street Address")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.street_address}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-12 text-right">
                                                                        {(leadPermission?.super_admin === true || leadPermission?.profile_module?.edit === '1') ?
                                                                            <button type="button" onClick={(event) => { HandleSubmit1(values) }} className='btn btn-primary btn-sm m-4 float-right box_shadow'>
                                                                                Update Profile
                                                                            </button> : ''}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            {(leadPermission?.super_admin === true || leadPermission?.profile_module?.edit === '1') ?
                                                <Tab eventKey="Password" title="Password">
                                                    <div className="tab-content">
                                                        <div className="tab-pane fade active show">
                                                            <div className="card box_shadow">
                                                                <div className="card-header">
                                                                    <h3 className="card-title">Password</h3>
                                                                </div>
                                                                <div className="card-body">

                                                                    <div className="row clearfix">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
                                                                                    label={Translation(translations, "Password")}
                                                                                    name="password"

                                                                                    control="password"
                                                                                    placeholder={Translation(translations, "Password")}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    required={true}
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
                                                                        <div className="col-md-12 text-right">
                                                                            {(leadPermission?.super_admin === true || leadPermission?.profile_module?.edit === '1') ?
                                                                                <button type="button" onClick={(event) => { HandleSubmit2(values) }} className='btn btn-primary btn-sm m-4 float-right box_shadow'>
                                                                                    Update Password
                                                                                </button> : ''}
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab> : ''}
                                            <Tab eventKey="More Information" title="More Information" >
                                                <div className="tab-content">
                                                    <div className="tab-pane fade active show">
                                                        <div className="card box_shadow">
                                                            <div className="card-header">
                                                                <h3 className="card-title">More Information</h3>
                                                            </div>
                                                            <div className="card-body">

                                                                <div className="row clearfix fv-plugins-icon-container">
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control"
                                                                                    label={Translation(translations, `${"Title"}`)}
                                                                                    name="title"
                                                                                    control="input3"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Title")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.title}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control"
                                                                                    label={Translation(translations, `${"Department"}`)}
                                                                                    name="department"
                                                                                    control="input3"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Department")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.department}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
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
                                                                                    control="intl"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Office Phone")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.office_phone}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
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
                                                                                    control="intl"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Mobile Phone")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.mobile_phone}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
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
                                                                                    control="intl"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Home Phone")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.home_phone}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control"
                                                                                    label={Translation(translations, `${"Fax"}`)}
                                                                                    name="fax"
                                                                                    control="input3"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Fax")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.fax}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control"
                                                                                    type={"email"}
                                                                                    label={Translation(translations, `${"Other Email"}`)}
                                                                                    name="other_email"
                                                                                    control="input3"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Other Email")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.other_email}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control"
                                                                                    type={"email"}
                                                                                    label={Translation(
                                                                                        translations,
                                                                                        `${"Secondary Email"}`
                                                                                    )}
                                                                                    name="secondary_email"
                                                                                    control="input3"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Secondary Email")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.secondary_email}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
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
                                                                                    control="intl"
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Secondary Phone")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.secondary_phone}`
                                                                                )}
                                                                            </div>}
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <div className="form-group">
                                                                                <FormControl
                                                                                    className="form-control my-1"
                                                                                    firstSelect={getLoginUserProfileEdit.usr_language}
                                                                                    label={Translation(translations, "Language")}
                                                                                    name={`language`}
                                                                                    selectList={transData}
                                                                                    custom_label_name="lang_name"
                                                                                    customer_value_name="lang_name"
                                                                                    control="select_custom_options"
                                                                                    defaultValue={getLoginUserProfileEdit.usr_language}
                                                                                />
                                                                            </div> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Language")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.language}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    {(leadPermission?.super_admin === true ||
                                                                        (leadPermission?.profile_module?.edit === '1')) ?
                                                                        <div className="col-md-6">
                                                                            <label className="col-sm-12 col-form-label">
                                                                                {Translation(translations, "Time Zone")}
                                                                            </label>
                                                                            <div className="col-sm-8">
                                                                                <Dropdown6
                                                                                    list={TimeZoneDrop && TimeZoneDrop}
                                                                                    value={userTimeZone ? userTimeZone : Deftimezone}
                                                                                    changes={(value) => setuserTimeZone(value)}
                                                                                />
                                                                            </div>
                                                                        </div> :
                                                                        <div className="form-group">
                                                                            <label className="form-label">
                                                                                {Translation(translations, "Time Zone")}
                                                                            </label>
                                                                            {Translation(
                                                                                translations,
                                                                                `${userTimeZone}`
                                                                            )}
                                                                        </div>}
                                                                    <div className="col-md-12 text-right">
                                                                        {(leadPermission?.super_admin === true || leadPermission?.profile_module?.edit === '1') ?
                                                                            <button type="button" onClick={(event) => { HandleSubmit1(values) }} className='btn btn-primary btn-sm m-4 float-right box_shadow'>
                                                                                Update Info
                                                                            </button> : ''}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="Social Profile" title="Social Profile" >
                                                <div className="tab-content">
                                                    <div className="tab-pane fade active show">
                                                        <div className="card box_shadow">
                                                            <div className="card-header">
                                                                <h3 className="card-title">Social Profile</h3>
                                                            </div>
                                                            <div className="card-body">

                                                                <div className="row clearfix">
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Facebook"}`)}
                                                                                name="facebook"
                                                                                control="input2"
                                                                                placeholder={"https://www.facebook.com/xxxx"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Facebook")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.facebook}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"SnapChat"}`)}
                                                                                name="snapchat"
                                                                                control="input2"
                                                                                placeholder={
                                                                                    "http://www.snapchat.com/add/YourUserName"
                                                                                }
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "SnapChat")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.snapchat}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Instagram"}`)}
                                                                                name="instagram"
                                                                                control="input2"
                                                                                placeholder={"https://www.instagram.com/xxxx"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "SnapChat")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.instagram}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Discord"}`)}
                                                                                name="discord"
                                                                                control="input2"
                                                                                placeholder={"https://discordapp.com/users/xxxx"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Discord")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.discord}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Twitter"}`)}
                                                                                name="twitter"
                                                                                control="input2"
                                                                                placeholder={"https://www.twitter.com/xxxx"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Twitter")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.twitter}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Pinterest"}`)}
                                                                                name="pinterest"
                                                                                control="input2"
                                                                                placeholder={"https://pinterest.com/username"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Pinterest")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.pinterest}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Linkedin"}`)}
                                                                                name="linkedin"
                                                                                control="input2"
                                                                                placeholder={"https://www.linkedin.com/in/xxxx"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Linkedin")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.linkedin}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1'))?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Zillow"}`)}
                                                                                name="zillow"
                                                                                control="input2"
                                                                                placeholder={"https://www.zillow.com/in/xxxx"}

                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Zillow")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.zillow}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Youtube"}`)}
                                                                                name="youtube"
                                                                                control="input2"
                                                                                placeholder={"https://youtube.com/channel/xxxx"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Youtube")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.youtube}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Realtor"}`)}
                                                                                name="realtor"
                                                                                control="input2"
                                                                                placeholder={"https://www.realtor.com/agentprofile/"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Realtor")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.realtor}`
                                                                                )}
                                                                            </div>}

                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"TikTok"}`)}
                                                                                name="tiktok"
                                                                                control="input2"
                                                                                placeholder={"https://www.tiktok.com/@username"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "TikTok")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.tiktok}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Website"}`)}
                                                                                name="website"
                                                                                control="input2"
                                                                                placeholder={"https://www.yourwebsite/"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Website")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.website}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                className="form-control"
                                                                                label={Translation(translations, `${"Telegram"}`)}
                                                                                name="telegram"
                                                                                control="input2"
                                                                                placeholder={"https://t.me/username"}
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Telegram")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.telegram}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        {(leadPermission?.super_admin === true ||
                                                                            (leadPermission?.profile_module?.edit === '1')) ?
                                                                            <FormControl
                                                                                updatess={(item, code) => {
                                                                                    setvalue({
                                                                                        ...value,
                                                                                        whatsapp: `+${item}`,
                                                                                        wtcode: code.dialCode
                                                                                    })
                                                                                }

                                                                                }
                                                                                datas={initialValues.whatsapp}
                                                                                label={Translation(translations, `${"Whatsapp"}`)}
                                                                                hiddenVal={"code_mobile_phone"}
                                                                                name="whatsapp"
                                                                                control="Intl2WithValue"
                                                                            /> :
                                                                            <div className="form-group">
                                                                                <label className="form-label">
                                                                                    {Translation(translations, "Whatsapp")}
                                                                                </label>
                                                                                {Translation(
                                                                                    translations,
                                                                                    `${initialValues?.whatsapp}`
                                                                                )}
                                                                            </div>}
                                                                    </div>
                                                                    <div className="col-md-6"></div>
                                                                    <div className="col-md-12 text-right">
                                                                        {(leadPermission?.super_admin === true || leadPermission?.profile_module?.edit === '1') ?
                                                                            <button type="button" onClick={(event) => { HandleSubmit1(values) }} className='btn btn-primary btn-sm m-4 float-right box_shadow'>
                                                                                Update Profile
                                                                            </button> : ''}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab>
                                            {(leadPermission?.super_admin === true || leadPermission?.profile_module?.edit === '1') ?
                                                <Tab eventKey="Signature" title="Signature" >
                                                    <div className="tab-content">
                                                        <div className="tab-pane fade active show">
                                                            <div className="card box_shadow">
                                                                <div className="card-header">
                                                                    <h3 className="card-title">Signature</h3>
                                                                </div>
                                                                <div className="card-body">

                                                                    <div className="row clearfix">
                                                                        <div className="col-md-4">
                                                                            <FormControl
                                                                                className="form-control my-1"
                                                                                firstSelect={"--select--"}
                                                                                label={Translation(translations, "Signature Templates")}
                                                                                name="sign_temp"
                                                                                selectList={ApiTemplatesDrop}
                                                                                custom_label_name="template_name"
                                                                                customer_value_name="template_id"
                                                                                onChange={(event) => handleTemplate(event)}
                                                                                control="select_custom_options"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <CKEditor
                                                                                config={{
                                                                                    extraPlugins: [uploadPlugin],
                                                                                }}
                                                                                editor={ClassicEditor}
                                                                                data={Signaturedata ? Signaturedata : DefTemCode}
                                                                                onReady={(editor) => { }}
                                                                                onChange={(event, editor) => {
                                                                                    const data = editor.getData();
                                                                                    setSignaturedata(data);
                                                                                }}
                                                                            />
                                                                            <div
                                                                                onClick={handleShow}
                                                                                className="col-md-6 float-left signmodal "
                                                                            >
                                                                                View Signature
                                                                            </div>
                                                                            <div onClick={() => setModalShow(true)} className="col-md-6 float-right attributemodal ViewAttri"  >
                                                                                View Attributes
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12 text-right mt-4">
                                                                            {(leadPermission?.super_admin === true || leadPermission?.profile_module?.edit === '1') ?
                                                                                <button type="button" onClick={(event) => { HandleSubmit1(values) }} className='btn btn-primary btn-sm m-4 float-right box_shadow'>
                                                                                    Update
                                                                                </button> : ''}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab> : ''}
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>

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
                                            <th colSpan="2" className="text-center bg-th bg-custom-more"><strong>System General Settings</strong></th>
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
            </div >
        </div >
    );
}

export default UserProfile;