import { useState, useEffect, useContext } from "react";
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import usePost from "../customHooks/usePost";
import useFetch from "../customHooks/useFetch";
import config from "../services/config.json";
import LoopSelect from "../components/form/LoopSelect";
import { Input, Radio, Space } from 'antd';
import { Select } from 'antd';
import { Formik } from "formik";
import { Field, Form } from "formik";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from "../components/Translation";


const CreateRole = () => {
  const { translations } = useContext(MainTranslationContexts)
  const navigate = useNavigate();
  const [datas, setDatas] = useState("");
  const { data: registerdata, loading, error, } = useFetch({ setDatas }, "getUserRoles");
  const { data: prof, loading2, error2, } = useFetch("", "getAllProfiles");
  const [profiles, setProfiles] = useState(false);
  const [buttonToggle, setbuttonToggle] = useState(false);
  const [profilesval, setProfilesval] = useState("");
  const [valueAssi, setValueAssi] = useState("all");
  const [value2, setValue2] = useState("directly");
  const [privileges, setprivileges] = useState("Administrator")
  const [state, setstae] = useState("");
  const [resdata, apiMethoddata] = usePost();
  const { leadPermission } = useContext(MainLeadPermissionContext);



  // console.log("profiles=>", privileges);
  var rootNode = registerdata;
  // console.log("roles", rootNode)

  useEffect(() => {
    setstae(prof)
  }, [prof])

  const handleClick = () => {
    setbuttonToggle(true)
  }
  const [roleval, setRoleval] = useState("--select--")
  const handlenode = (e, item) => {
    let closestDropdown = e.target.closest(".dropdown-menu");
    setProfilesval(item.profile)
    setProfiles(prof)
    const sellistLinks = document.querySelectorAll(".sellist a");
    sellistLinks.forEach(link => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    setRoleval(e.target.textContent);
    closestDropdown.classList.remove("show");
  }

  // radio button //
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValueAssi(e.target.value);
  };
  const onChange2 = (e) => {
    console.log('radio checked', e.target.value);
    setValue2(e.target.value);
  };

  // Select//
  const handleChange = (value) => {
    setprivileges(value)
    // console.log(`selected ${value}`);
  };

  const handleSubmit = (value, { resetForm }) => {
    let formData = new FormData();
    formData.append("rolename", value.rolename)
    formData.append("reports", profilesval)
    formData.append("assign_records", valueAssi)
    formData.append("submit", "Create Role")
    formData.append("privileges", value2)
    if (value2 == "copyfrom") {
      formData.append("exist_prv", privileges)
    }
    apiMethoddata("postCreateUserRole", formData)
    resetForm();
    setValueAssi("all")
    setValue2("directly")
  }
  let initialValues = {
    rolename: "",
  }


  useEffect(() => {
    if (resdata.data && !resdata.isLoading) {

      resdata.data.message && toast.success(resdata.data.message);
    }
  }, [resdata.data]);

  if (leadPermission?.super_admin == "1" || (leadPermission?.roles_module?.create == "1" && leadPermission?.roles_module?.active_module == "1")) {
    return (
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-12">
            <div className="card">
              <div className="card-header borderblue">
                <h3 className="card-title">Create Role</h3>
                <div className="card-options">
                  <Link to={`/demo/roles`} className="btn btn-sm btn-info">
                    <i className="fe fe-eye" /> View Roles
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label text-right">
                            Name &nbsp;
                          </label>
                          <div className="col-sm-5">
                            <Field
                              required={true}
                              type="text"
                              className="form-control"
                              name="rolename"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row useredits">
                      <div className="col-md-12 mt-2">
                        <div className="form-group row centerr1">
                          <label className="col-sm-3 col-form-label text-right">
                            Reports To &nbsp;
                          </label>
                          <div className="col-sm-5">
                          <Dropdown className="w-100">
                          <Dropdown.Toggle className="roleCustom my-1 w-100" type="button">
                          {Translation(translations, roleval)}
                          </Dropdown.Toggle>
                            <Dropdown.Menu id="organization">
                              <ul className="list-group">
                                {
                                  rootNode && <LoopSelect handleN={(e, item) => handlenode(e, item)} node={rootNode["CEO"]} />
                                }
                              </ul>
                            </Dropdown.Menu>
                          </Dropdown>
                          </div>
                       
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label text-right">
                                Can Assign Records To &nbsp;
                              </label>
                              <div className="col-sm-7 pt-2">

                                <Radio.Group onChange={onChange} value={valueAssi}>
                                  <Space direction="vertical">
                                    <Radio value={"all"}>All Users</Radio>
                                    <Radio value={"same"}> Users having Same Role or Subordinate Role</Radio>
                                    <Radio value={"subord"}>Users having Subordinate Role</Radio>

                                  </Space>
                                </Radio.Group>

                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label text-right">
                                Privileges &nbsp;
                              </label>
                              <div className="col-sm-7 pt-2">

                                <Radio.Group onChange={onChange2} value={value2}>
                                  <Space direction="vertical">
                                    <Radio value={'directly'}> Assign privileges directly to Role</Radio>
                                    <Radio value={"copyfrom"}>
                                      Assign privileges from existing profiles

                                    </Radio>
                                  </Space>
                                </Radio.Group>
                              </div>
                            </div>
                            {value2 === "copyfrom" ? (
                              <div id="_prv">
                                <div className="form-group row">
                                  {" "}
                                  <label className="col-sm-3 col-form-label text-right">
                                    Copy privileges from &nbsp;
                                  </label>
                                  <div className="col-sm-3">

                                    <Select
                                      defaultValue={privileges}
                                      style={{ width: 200 }}
                                      onChange={handleChange}
                                      options={state && state.map((item) => ({ label: item.profile_name, value: item.id }))}
                                    />

                                  </div>{" "}
                                </div>
                              </div>
                            ) : null}

                          </div>
                        </div>
                        <div className="text-right mt-5">
                          <input
                            type="submit"
                            className="btn btn-primary"
                            name="submit"
                            defaultValue="Create Role"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="section-body">
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-sm-12">The Sales Journey </div>
                <div className="col-md-6 col-sm-12 text-md-right">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <a >Privacy</a>
                    </li>{" "}
                    <li className="list-inline-item">
                      <a>About us</a>
                    </li>{" "}

                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

    )
  } else {
    navigate(`/${config.ddemoss}/roles`);
  }
}
export default CreateRole;