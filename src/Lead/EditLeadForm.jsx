import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import FormControl from "../components/form/FormControl";
import useFetch from "../customHooks/useFetch";
import * as yup from "yup";
import usePost from "../customHooks/usePost";
import allData from "../Data/data";
import File from "../components/form/File";
import Dropdown from "../components/form/Dropdown";
import New from "../createlead/New";
import SubmitButton from "../components/SubmitButton";
import PhoneInput from "react-phone-input-2";
function EditLeadForm() {
  const [res, apiMethod] = usePost();
  const [fieldValue, setFieldValue] = useState("");
  const [numbers, setNumbers] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [image, setImage] = useState();
  const validationSchema = yup.object({
    fname: yup.string().required("Must Required"),
  });
  const [initialValues, setInitialValues] = useState({
    fname: "",
    lname: "",
    contact_type: "",
    email: "",
    avatar: "",
    contact_type: "",
    email_status: "",
    lead_stage: "",
    mobile_phone: "",
    birthday: "",
    tags: "",
    score_number: "",
    address_one: "",
    address_two: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    ip_address: "",
    user_timezone: "",
    locale: "",
    sourcepage: "",
    leadsource: "",
    Business_Unit: "",
    Radio: "",
    TesteDec11: "",
    Medium: "",
    Campaign: "",
    Keyword: "",
    UTM_Source: "",
    UTM_Medium: "",
    UTM_Campaign: "",
    UTM_Term: "",
  });
  const handlePractice = (item) => {
    setPracticeName(item);
  };
  function handleSubmit(values) {
    let formdata = new FormData();
    for (let item in values) {
      formdata.append(item, values[item]);
    }
    formdata.append("avatarURL", "");
    formdata.append("number", initialValues.number);
    formdata.append("avatar", image);
    formdata.append("submit", "create_lead");
    let bodyContent = formdata;
    apiMethod("postCreateLead", bodyContent);
  }
  const submitbutton = {
    className: "btn btn-primary",
    text: "Store Lead",
  };
  const handleChangeNumber = (item) => {
    console.log(item);
    setNumbers(item);
  };
  return (
    <div className="container-fluid">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        <Form name="myForm">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Lead Created by:</label>
                      Simone Sales Team1 (Local Sales Team 01){" "}
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Assigned to:</label>
                      Simone Sales Team1 (Local Sales Team 01){" "}
                      <span className="float-right">
                        {" "}
                        <a
                          href="javascript:;"
                          className="text-red unassign"
                          data-assigned="18"
                          data-toggle="tooltip"
                          title="Un-Assign User from this lead"
                        >
                          {" "}
                          <i className="fa fa-trash"></i>{" "}
                        </a>{" "}
                      </span>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Lead Assign to</label>

                      <div className="input-group mb-1">
                        <input
                          type="text"
                          className="form-control leadassign"
                          placeholder="Type to Search"
                          fdprocessedid="ioe2gi"
                        />
                        <div className="c1_own"></div>
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-secondary sr-leadassign"
                            type="button"
                            fdprocessedid="fgp9v9"
                          >
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                      <input
                        type="hidden"
                        name="leadassign"
                        id="n_leadassign"
                      />

                      <button
                        type="button"
                        className="btn btn-sm btn-primary btn-block btn-leadassign"
                        fdprocessedid="qq57go"
                      >
                        Assign Lead
                      </button>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">Lead Info</h3>
                  <div className="card-options">
                    <a
                      href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row fv-plugins-icon-container">
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={"First Name"}
                        name="fname"
                        control="input"
                        placeholder=" First Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={"Last Name"}
                        name="lname"
                        control="input"
                        placeholder="Last name"
                      />
                    </div>
                    <div className="col-md-12">
                      <FormControl
                        className="form-control my-1"
                        firstSelect={"--Select--"}
                        selectList={allData.createleadPage.Type}
                        required={true}
                        label={"Type"}
                        name="contact_type"
                        control="select"
                        placeholder=" Last Name"
                      />
                    </div>
                    <div className="col-md-12">
                      <FormControl
                        className="form-control my-1"
                        updatess={(item) =>
                          setInitialValues({
                            ...initialValues,
                            phone_number: `+${item}`,
                          })
                        }
                        datas={initialValues.number}
                        label={"Mobile Phone"}
                        name="number"
                        control="intl"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        selectList={allData.createleadPage.LeadStage}
                        label={"Lead Stage"}
                        name="lead_stage"
                        control="select"
                        required={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        required={true}
                        label={"E-mail"}
                        name="email"
                        control="input"
                        placeholder="E-mail"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        selectList={allData.createleadPage.EmailStatus}
                        label={"Email status"}
                        name="email_status"
                        control="select"
                        placeholder="E-mail"
                        required={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        type={"number"}
                        label={"Score Number"}
                        name="score_number"
                        control="input"
                      />
                    </div>
                    <div className="col-md-12">
                      <FormControl
                        className="form-control my-1"
                        updatess={(item) =>
                          setInitialValues({
                            ...initialValues,
                            mobile_phone: `+${item}`,
                          })
                        }
                        datas={initialValues.mobile_phone}
                        label={"Mobile Phone"}
                        name="number"
                        control="intl"
                      />
                    </div>
                    <div className="col-md-12 mt-2">
                      <div className="form-group">
                        <label className="form-label">
                          Birthday{" "}
                          <strong>
                            <span className="text-red">*</span>
                          </strong>
                        </label>
                        <input
                          required=""
                          type="date"
                          className="form-control"
                          name="opp_forcast"
                          data-name="Forecast Close Date"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Created date</label>
                        <input
                          value="2023-01-02 22:47:39"
                          type="datetime-local"
                          className="form-control"
                          name="created_date"
                          placeholder="Created Date"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Updated date</label>
                        <input
                          readonly=""
                          value="2023-01-02 22:47:39"
                          type="text"
                          className="form-control"
                          placeholder="Updated Date"
                          fdprocessedid="19w5fo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">Tags</h3>
                  <div className="card-options">
                    <a
                      href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-md-12">
                    <div className="form-group"></div>
                  </div>
                </div>
              </div>
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">Tags</h3>
                  <div className="card-options">
                    <a
                      href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="col-md-12">
                    <div className="form-group"></div>
                  </div>
                </div>
              </div>
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">Location</h3>
                  <div className="card-options">
                    <a
                      href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"Address 1"}
                        name="address_one"
                        control="input"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"Address 2"}
                        name="address_two"
                        control="input"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"City"}
                        name="city"
                        control="input"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"Postal/ZIP Code"}
                        name="zip"
                        control="input"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"State"}
                        name="state"
                        control="input"
                        placeholder="State"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"Country"}
                        name="country"
                        control="input"
                        placeholder="Country"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"IP Address"}
                        name="ip_address"
                        control="input"
                        placeholder="IP Address"
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
                          Time Zone
                        </label>
                        <Dropdown
                          list={allData.timeZone}
                          onChange={handlePractice}
                          value={practiceName}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"Locale"}
                        name="locale"
                        control="input"
                        placeholder="Locale"
                      />
                    </div>
                    <div className="col-md-6">
                      <FormControl
                        className="form-control my-1"
                        label={"Source Page"}
                        name="sourcepage"
                        control="input"
                        placeholder="Source Page"
                      />
                    </div>
                    <div className="col-md-12">
                      <FormControl
                        className="form-control my-1"
                        selectList={allData.createleadPage.LeadSource}
                        firstSelect={"--select--"}
                        label={"Lead Source"}
                        name="leadsource"
                        control="select"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">Correlations</h3>
                  <div className="card-options">
                    <a  href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                    <a href="#" className=" add_more_relations">
                      <i className="fe fe-plus"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body form-group p-2">
                  <div className="lead_manage_list">
                    <div className="lead_manage card">
                      <div className="card-body pb-0">
                        <input type="hidden" name="corr" value="170" />
                        <select
                          name="correlations[]"
                          className="form-control mb-2"
                          fdprocessedid="bkn3ph"
                        >
                          <option value="15">Co-worker</option>
                          <option value="16">Spouse</option>
                          <option value="17">Sibling</option>
                          <option value="18">Partner</option>
                          <option value="19">Friend</option>
                          <option value="20">Parent</option>
                          <option value="24">Descendants</option>
                          <option value="32">Co-Owner in a Property</option>
                          <option value="34">sheefq</option>
                        </select>
                        <div className="relative">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control coinputfeild"
                              placeholder="Type to Search by email"
                              id="sr-corr170"
                              fdprocessedid="qul60i"
                            />
                            <input
                              type="hidden"
                              name="correlations_lead[]"
                              className="form-control"
                              placeholder="Type to Search"
                              id="srs-corr"
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary sr-corr"
                                type="button"
                                fdprocessedid="8rbu08"
                              >
                                {" "}
                                <i className="fa fa-search"></i>{" "}
                              </button>
                            </div>
                          </div>
                          <div className="form-group  text-right mb-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-primary corlbtn btn-block"
                              fdprocessedid="4o1wzy"
                            >
                              Add Correlations
                            </button>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card leadCards">
                <div className="card-header">
                  <h3 className="card-title">Followers</h3>
                  <div className="card-options">
                    <a
                      href="#"
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body p-2">
                  <div className="multiselect_div">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type to Search"
                        id="sr-follower"
                        fdprocessedid="1aldwr"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary sr-follower"
                          type="button"
                          fdprocessedid="2x4qhc"
                        >
                          {" "}
                          <i className="fa fa-search"></i>{" "}
                        </button>
                      </div>
                    </div>
                    <div className="form-group mt-2 text-right mb-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary flvbtn btn-block"
                        fdprocessedid="j6d7jk"
                      >
                        Update Followers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-lg-8">
              <div className="card">
                <div className="card-header borderblue">
                  <h3 className="card-title">Overview</h3>
                </div>
                <div className="card-body"></div>
                <div className="text-right col-md-12 mt-4 mb-2">
                  <SubmitButton
                    props={submitbutton}
                    buttonLoading={res.isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default EditLeadForm;
