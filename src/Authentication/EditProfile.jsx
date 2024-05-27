import { Form, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/common/Loading";
import config from "../services/config.json";
import usePost from "../customHooks/usePost";
import EditUserss from "../components/editProfilesUsers/EditUserss";
import { FaEye } from "react-icons/fa";
import { Translation } from "../components/Translation";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainTranslationContexts } from '../context/MainTranslationContexts';
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";

function EditProfile() {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts)
  const { addHeading } = useContext(MainHeadingContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (leadPermission) {
      addHeading(`Edit Profiles`);
      if (!leadPermission?.super_admin) {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);

  let md5 = require("md5");
  const isComponentMounted = useRef(true);
  const { id } = useParams();
  const [res, apiMethod] = usePost();
  const [ressubmit, apiMethodsubmit] = usePost();
  const [ressubmit2, apiMethodsubmit2] = usePost();
  const [showModal, setShowModal] = useState(false);
  const modalDiv = useRef(null);
  const [first, setFirst] = useState(false);
  const initialValues = {
    profilename: "",
    description: "",
  };


  useEffect(() => {
    if (isComponentMounted.current) {
      handleGet();
    } else {
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [res]);

  const handleModal = (event) => {
    if (
      modalDiv &&
      modalDiv.current &&
      modalDiv.current.contains(event.target)
    ) {
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleModal);
    return () => document.removeEventListener("click", handleModal);
  }, []);



  const handleGet = () => {
    setFirst(true)
    let subData = new FormData();
    subData.append("profile_id", id);
    let aaa = md5("q1typeGtProfile");
    subData.append("typeGtProfile", aaa);
    apiMethod("postEditProfile", subData);
  };
  if (!res.data) return <Loader />;
  function handleSubmit(values, name) {
    let formdatas = new FormData();
    formdatas.append("profile_id", id);
    formdatas.append(name, values);
    apiMethodsubmit("postUpdateProfile", formdatas);
  }
  function handleSubmit2(values, name) {
    let formdatas = new FormData();
    formdatas.append("profile_id", id);
    formdatas.append(name, values);
    apiMethodsubmit2("postUpdateProfile", formdatas);
  }



  return (
    <div className="EditProfile">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-12">
            <div className="card">
              <div className="card-header borderblue">
                <div className="card-title">
                  {Translation(translations, "Edit Profile")}
                </div>
                <div className="card-options">
                  <Link
                    to={`/${config.ddemoss}list_profiles`}
                    className="btn btn-sm btn-primary bsm-1"
                  >
                    {" "}
                    <AiOutlineUnorderedList />
                    {Translation(translations, "List Profile")}
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <Formik initialValues={initialValues}>
                  <Form name="myForm">
                    <div className="col-md-4">
                      <div className="form-group my-2">
                        <label htmlFor={"profilename"}>
                          {" "}
                          <b>{Translation(translations, "Profile Name")}</b>
                          {ressubmit.data ? (
                            ressubmit.isLoading ? (
                              <span>
                                {" "}
                                <span className="text-success">
                                  {" "}
                                  <i className="fa fa-loader"></i>{" "}
                                </span>
                              </span>
                            ) : ressubmit.data.status == 422 ? (
                              <span>
                                {" "}
                                &nbsp;
                                <span className="text-danger">
                                  {" "}
                                  <i className="fa fa-times"></i>
                                  {Translation(
                                    translations,
                                    " Name already exist!"
                                  )}
                                </span>
                              </span>
                            ) : (
                              first &&
                              <span>
                                <span className="text-success">
                                  <i className="fa fa-check"></i>{" "}
                                  {Translation(translations, " Saved!")}
                                </span>
                              </span>
                            )
                          ) : (
                            ""
                          )}
                        </label>
                        <input
                          id={"profile_name"}
                          onInput={(e) =>
                            handleSubmit(
                              e.target.value,
                              e.target.getAttribute("name")
                            )
                          }
                          name={"profile_name"}
                          className="form-control my-1"
                          defaultValue={res.data.profileData[0].profile_name}
                          placeholder=" First Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor={"profilename"}>
                        {" "}
                        <b>{Translation(translations, " Description")}</b>
                        {ressubmit2.data ? (
                          ressubmit2.isLoading ? (
                            <span>
                              {" "}
                              <span className="text-success">
                                {" "}
                                <i className="fa fa-loader"></i>{" "}
                              </span>
                            </span>
                          ) : (
                            <span>
                              <span className="text-success">
                                <i className="fa fa-check"></i>{" "}
                                {Translation(translations, " Saved!")}
                              </span>
                            </span>
                          )
                        ) : (
                          ""
                        )}{" "}
                      </label>
                      <input
                        id={"description"}
                        name={"description"}
                        className="form-control my-1"
                        defaultValue={
                          res.data.profileData[0].profile_description
                        }
                        onInput={(e) =>
                          handleSubmit2(
                            e.target.value,
                            e.target.getAttribute("name")
                          )
                        }
                        placeholder=" Description"
                      />
                    </div>
                  </Form>
                </Formik>
                <div className="mt-5">
                  <div ref={modalDiv} className="clearfix">
                    <h6 className="float-left">
                      {Translation(translations, "Privileges")}
                    </h6>
                    <div
                      onClick={() => setShowModal(!showModal)}
                      className="float-right"
                    >
                      <div
                        className="edit_profile_modal"
                        style={{ position: "absolute" }}
                      >
                        {res.data &&
                          showModal &&
                          Object.keys(res.data.privileges_menus).map(
                            (key, i) => {
                              return (
                                <div key={i}>
                                  {" "}
                                  {Translation(
                                    translations,
                                    `${res.data.privileges_menus[key].name}`
                                  )}
                                </div>
                              );
                            }
                          )}
                      </div>
                      <button className="btn md">
                        {" "}
                        <FaEye /> {Translation(translations, "Active Modules")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row editProfile">
                  <div className="p-0">
                    <div style={{ display: "flex" }}>
                      <div className="col-md-3 col-sm-12">
                        <div className="nav flex-column nav-pills profile-pills"></div>
                      </div>
                    </div>
                    <EditUserss reCallAP={handleGet} useID={id} itemss={res.data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
