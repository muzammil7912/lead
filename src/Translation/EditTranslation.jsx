import { Form, Formik, Field } from "formik";
import React, { useContext } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loading";
import FormControl from "../components/form/FormControl";
import SubmitButton from "../components/SubmitButton";
import { Translation } from "../components/Translation";
import useFetch from "../customHooks/useFetch";
import config from "../services/config.json";
import usePost from "../customHooks/usePost";
import { toast } from "react-toastify";
import { useEffect } from "react";
import SelectSearch from "../components/form/SelectCountry";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";

function EditTranslation() {
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts);
  const navigate = useNavigate();
  useEffect(() => {
    if (leadPermission) {
      addHeading(`Translation Elements`);
        if (leadPermission?.translate_module?.create === "0" || leadPermission?.translate_module?.active_module === "0") {
          navigate(`/${config.ddemoss}`);
        }
      }
    }, [leadPermission]);
  const [res, apiMethod] = usePost();
  const { id } = useParams();
  const [datas, setDatas] = useState("");
  const [iconVal, setIconVal] = useState("");
  const { data: translationData, loading, error} = useFetch({ setDatas }, `getLangObject/${id}`);
  const selectedVal = (item) => {
    setIconVal(item);
  };

  useEffect(() => {
    if(translationData) {
      setIconVal(translationData?.data?.lang_image)
    }
  }, [translationData]);

  const handleSubmit = (values) => {
    let formdata = new FormData();
    let formdata2 = new FormData();
    for (let item in values) {
      if (item.includes("page_title")) {
        formdata.append(`var_key[]`, values[item]);
      } else if (item.includes("lang_data")) {
        formdata.append(`var_value[]`, values[item]);
      } else {
        formdata2.append(item, values[item]);
      }
    }
    formdata2.append("lang_image", iconVal);
    let bodyContent = formdata;
    let bodyContent2 = formdata2;
    apiMethod(`postEditLanguage/${id}`, bodyContent2);
    apiMethod(`postEditLangObject/${id}`, bodyContent);
  };
  useEffect(() => {
    if (res.data && !res.isLoading) {
      res.data.message && toast.success(res.data.message);
    }
  }, [res.data]);
  if (loading) return <Loader />;
  let initialValues = {};
  if (translationData?.data) {
    let inval1 = {
      lang_name: translationData.data.lang_name,
      lang_message: translationData.data.lang_message,
      lang_image: iconVal,
    };
    let inval2 = {};
    let inval3 = {};
    for (const key in translationData.object) {
      inval2[`lang_data__${key.replace(/[^A-Z0-9]/gi, "_")}`] = translationData
        .object[key]
        ? translationData.object[key]
        : "";
    }
    for (const key in translationData.object) {
      inval3[`page_title_key__${key.replace(/[^A-Z0-9]/gi, "_")}`] = key
        ? key
        : "";
    }
    initialValues = { ...inval1, ...inval2, ...inval3 };
  }
  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Update Translation",
  };
  if(datas?.status == 22) {
    navigate(`/${config.ddemoss}/Translation`);
  }
  if (leadPermission?.super_admin == "1" || (leadPermission?.translate_module?.edit == "1" && leadPermission?.translate_module?.active_module == "1")) {
  return (
    <div className="editTranslation">
     {
translationData
&&
        
       <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-12">
              <div className="card">
                <div className="card-header borderblue d-lg-flex justify-content-between">
                  <div className="card-title">
                    {Translation(translations, "Translation Elements")}
                  </div>
                </div>
                <div className="card-body">
                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form name="myForm">
                      <div>
                        <label htmlFor="">
                          {" "}
                          {Translation(translations, "Icon")}
                        </label>
                        <SelectSearch
                          selectedVal={selectedVal}
                          defaultval={iconVal}
                        />
                      </div>
                      <FormControl
                        className="form-control my-1"
                        label={Translation(translations, "Name")}
                        name="lang_name"
                        control="input"
                        defaultValue={datas?.data?.lang_name}
                        placeholder={Translation(translations, "Name")}
                      />
                      <FormControl
                        className="form-control my-1"
                        label={Translation(translations, "Message")}
                        name="lang_message"
                        control="textarea"
                        placeholder={Translation(translations, "Message")}
                      />
                      <hr />
 {translationData?.data && (
                      <div className="table table-responsive page_title_table">
                        <table className="w-100">
                          <thead>
                            <tr>
                              <th>{Translation(translations, "Title")}</th>
                              <th>{Translation(translations, "Value")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datas.object &&
                              Object.keys(datas.object).map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      {datas.object &&
                                        Object.keys(datas.object)[index]}
                                    </td>
                                    <td>
                                      <div className="form-group">
                                        <input
                                          type="hidden"
                                          className="form-control"
                                          value={
                                            datas.object &&
                                            Object.keys(datas.object)[index]
                                          }
                                          name={`page_title_key__${Object.keys(
                                            datas.object
                                          )[index].replace(
                                            /[^A-Z0-9]/gi,
                                            "_"
                                          )}`}
                                          disabled
                                        />
                                        <Field
                                          type="text"
                                          className="form-control"
                                          name={`lang_data__${Object.keys(
                                            datas.object
                                          )[index].replace(
                                            /[^A-Z0-9]/gi,
                                            "_"
                                          )}`}
                                          placeholder="Page title to display for current language"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                       
                      </div>
                           )}
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
 }
    </div>
  );
  } else {
    navigate(`/${config.ddemoss}/Translation`);
  }
}

export default EditTranslation;
