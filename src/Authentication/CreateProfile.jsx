import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import FormControl from "../components/form/FormControl";
import { FaList } from "react-icons/fa";
import { Link } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import * as yup from "yup";
import usePost from "../customHooks/usePost";
import config from "../services/config.json";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Translation } from "../components/Translation";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";

function CreateProfile() {
  const { translations } = useContext(MainTranslationContexts);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  useEffect(() => {
    if (leadPermission) {
        if (leadPermission?.user_module?.active_module == "0" || leadPermission?.user_module?.create == "0") {
          navigate(`/${config.ddemoss}`);
        }
      }
    }, [leadPermission]);
  const [res, apiMethod] = usePost();
  const navigate = useNavigate();
  const initialValues = {
    profilename: "",
    description: "",
  };
  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Create Profile",
  };
  const { addHeading } = useContext(MainHeadingContext);
  useEffect(() => {
    addHeading(`Create Profile`);
  }, []);
  const validationSchema = yup.object({
    profilename: yup.string().required("Must Required"),
  });
  function handleSubmit(values) {
    let formdata = new FormData();
    for (let item in values) {
      formdata.append(item, values[item]);
    }
    formdata.append("submit", "true");
    let bodyContent = formdata;
    apiMethod("postCreateProfile", bodyContent);
  }
  useEffect(() => {
    if (res.data && !res.isLoading) {
      toast.success(res.data.message);
      navigate(`/${config.ddemoss}list_profiles`);
    }
  }, [res.data]);
    return (
      <div className="section-body mt-3">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-12">
              <div className="card">
                <div className="card-header borderblue">
                  <div className="card-title">
                    {" "}
                    {Translation(translations, " Create Profile")}
                  </div>
                  <div className="card-options">
                    <Link
                      to={`/${config.ddemoss}list_profiles`}
                      className="btn btn-sm btn-primary bsm-1"
                    >
                      {" "}
                      <FaList /> {Translation(translations, "List Profile")}
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange
                  >
                    <Form name="myForm">
                      <div className="row">
                        <div className="col-md-4">
                          <FormControl
                            className="form-control my-1"
                            required={true}
                            label={Translation(translations, `${"Profile Name"}`)}
                            name="profilename"
                            control="input"
                            placeholder=" First Name"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, `${"Description"}`)}
                            name="description"
                            rows="3"
                            control="textarea3"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}

export default CreateProfile;
