import { ErrorMessage, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import File from "../components/form/File";
import { Translation } from "../components/Translation";
import { Field } from "formik";
import FormControl from "../components/form/FormControl";
import usePost from "../customHooks/usePost";
import { toast } from "react-toastify";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { useNavigate } from "react-router-dom";
import config from '../services/config.json'
import SubmitButton from "../components/SubmitButton";
import * as yup from "yup";
import { getTokenSession } from "../utils/common";
import useFetch from "../customHooks/useFetch";
import axios from "axios";
import gravatar from 'gravatar'
import md5 from "md5";
import swal from "sweetalert";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";

export default function Createcontext() {
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();
  const [emails, setEmails] = useState("");
  const [emailse, setEmailse] = useState(false);
  const [uploadImage, setUploadImage] = useState("")
  const [phoneNumber, setPhoneNumber] = useState({ "number": "" });
  const [res1, apiMethodres1] = usePost();
  const { addHeading } = useContext(MainHeadingContext);
  const { data: settingData, loading, error1 } = useFetch("", "getAllViewTypeContact");
  useEffect(() => {
    addHeading(`Create Contact`);
  }, []);

  const handleEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(e)}?d=404`;

    if (emailRegex.test(e)) {
      const avatarUrl = gravatar.url(e, { s: '200', r: 'pg', d: 'identicon' }, true);
      fetch(gravatarUrl)
        .then(response => {
          if (response.status === 404) {
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
              .then((res) => {
                setEmailse(res.data.aleady_exist);
                if (permissions["system-default-avatar-image"]?.setting_value) {
                  setUploadImage(permissions["system-default-avatar-image"]?.setting_value)
                }
                else {
                  setUploadImage("https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160")
                }
              })
              .catch((err) => {
                console.log("create errr", err);
              });
          } else {
            setUploadImage(`${avatarUrl}`)
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
          if (uploadImage === '') {
            if (permissions["system-default-avatar-image"]?.setting_value) {
              setUploadImage(permissions["system-default-avatar-image"]?.setting_value)
            }
            else {
              setUploadImage("https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160")
            }
          }
        })
        .catch((err) => {
          console.log("create errr", err);
        });
    }


    setEmails(e);
  };

  const validationSchema = yup.object({
    contact_name: yup.string().required("Must Required"),
    contact_type: yup.string().required("Must Required"),
  });
  const handleSubmit = (value) => {

    if (emailse) {
      {
        swal({
          title: "Email already used:",
          text: emails,
          icon: "warning",
          dangerMode: true,
        });
        return false;
      }
    }
    else {
      value.email = emails
      let formData = new FormData();
      console.log(value)
      if (typeof ((uploadImage)) === "object") {
        formData.append("avatar", uploadImage)
        formData.append("avatarURL", "")
      }
      else {
        formData.append("avatar", "")
        formData.append("avatarURL", uploadImage)
      }
      for (let item in value) {
        formData.append(item, value[item]);
      }
      formData.append("create_contact", "create_contact");
      formData.append("contact_phone", phoneNumber.number)
      apiMethodres1("postCreateContact", formData)
    }

  }
  useEffect(() => {
    if (res1.data) {
      if (res1.data && !res1.isLoading) {
        toast.success(res1.data.message);
        navigate(`/${config.ddemoss}contacts`);

      }
    }
  }, [res1.data])
  const filteredTypes = settingData?.filter(type => type.type_module === 'Contact');
  const options = filteredTypes?.map(({ db_id, type_name }) => ({
    value: db_id,
    label: type_name,
  }));
  let initialValues = {
    contact_name: "",
    email: "",
    contact_type: "",
    contact_note: "",
    phone_number_code: ""


  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body borderblue">
                <div className="row clearfix">
                  <Formik validationSchema={validationSchema}
                    validateOnChange initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>

                      <div className="col-lg-12 display1">
                        <div className="row clearfix fv-plugins-icon-container">
                          <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Name")}
                              </label>
                              <Field
                                required=""
                                type="text"
                                name="contact_name"
                                className="form-control"
                                placeholder={Translation(translations, "Enter Name")}
                              />
                              <ErrorMessage name="contact_name">
                                {(msg) => (
                                  <div style={{ color: "red", whiteSpace: "nowrap" }}>
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12">
                            {leadPermission?.super_admin ||
                              leadPermission?.contacts?.fields?.contact_email === "true" ? (
                              <>
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
                              </>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                              <FormControl
                                className="form-control my-1"
                                updatess={(item) =>
                                  setPhoneNumber({
                                    ...phoneNumber,
                                    number: `+${item}`,
                                  })
                                }
                                datas={initialValues.number}
                                label={Translation(
                                  translations,
                                  `${"Phone Number"}`
                                )}
                                name="contact_phone"
                                onchange={(event) => setPhoneNumber(event.target.value)}
                                control="intl"
                              />
                            </div>
                            <div className="fv-plugins-message-container invalid-feedback"></div>
                          </div>

                          <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Type of Contact")}
                              </label>
                              <FormControl
                                className="form-control my-1"
                                firstSelect={"--Select--"}
                                selectList={options}
                                name="contact_type"
                                control="select"
                              />
                              <ErrorMessage name="contact_type">
                                {(msg) => (
                                  <div style={{ color: "red", whiteSpace: "nowrap" }}>
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translations, "Note")}
                              </label>
                              <FormControl
                                className="form-control"
                                name="contact_note"
                                control="textarea"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="row clearfix">
                            <div className="col-lg-12 col-md-12">
                              <div className="form-group">
                                <File
                                  label={Translation(translations, "Avatar")}
                                  value={uploadImage ? typeof (uploadImage) !== "object" ? uploadImage.includes("http") ? uploadImage : `${config.baseurl2}${uploadImage}` : uploadImage : uploadImage}
                                  onUpload={setUploadImage}
                                  name={"upload_file"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 mt-3">
                        <SubmitButton
                          props={{
                            class: "btn btn-primary",
                            text: Translation(translations, "Create Contact"),
                          }}
                          buttonLoading={res1.isLoading}
                        />
                      </div>

                    </Form>
                  </Formik>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
