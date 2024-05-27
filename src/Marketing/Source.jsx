import React from "react";
import { useState, useEffect } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import SubmitButton from "../components/SubmitButton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Pagination } from "antd";

import Loader from "../components/common/Loading";
import { getTokenSession } from "../utils/common";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Form, Formik } from "formik";
import useFetch from "../customHooks/useFetch";
import FormControl from "../components/form/FormControl";
import { Translation } from "../components/Translation";
import config from "../services/config.json";
import usePost from "../customHooks/usePost";
export default function Source({ translation }) {
  const submitbuttonsource = {
    class: "btn btn-primary",
    text: "Add Source",
  };
  const submitbuttonmedium = {
    class: "btn btn-primary",
    text: "Add Medium",
  };

  const { id } = useParams();
  const [res, apiMethodtest] = usePost();
  const [res2, apimethod_Source] = usePost();
  const [res3, apimethod_Medium] = usePost();
  const [sourceNameValue, setSourceNameValue] = useState("");
  const [mediumNameValue, setMediumNameValue] = useState("");
  const [mediumNameParentValue, setMediumNameParentValue] = useState("");
  const [show, setShow] = useState(false);
  const [ressource, apiMethod] = usePost();
  const [limit, setlimit] = useState();
  const [totalleads, settotalleads] = useState();
  const [sources, setSources] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [Rerender, setRerender] = useState(false);
  const [EditSource, setEditSource] = useState();
  const [EditMedium, setEditMedium] = useState();
  const [EditSource_id, setEditSource_id] = useState();
  const [EditMedium_id, setEditMedium_id] = useState();
  const [onlySourceEdit, setonlySourceEdit] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);


  let v = {
    pipeline_description: "1",
  };
  let initialValues = v;
  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllSources`).then((response) => {
      setSources(response.data);
    });
  }, [ressource.data]);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllMediums`).then((response) => {
      setMediums(response.data);
      settotalleads(response.data[0].pagination.total_record);
      setlimit(response.data[0].pagination.limit);
      console.log(response.data, "sadasdasdasd");
    });
  }, [ressource.data]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSourceName = (values, { resetForm }) => {
    let formdata = new FormData();
    if (sourceNameValue == "") {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      formdata.append("source_name", sourceNameValue);
      apiMethod("PostCreateSource", formdata);
      setSourceNameValue("");
      swal({
        title: "Add Source Successfully ",
        icon: "success",
        timer: 1500,
      });
      resetForm();
    }
  };

  const handleMediumName = ({ resetForm }) => {
    let formdata = new FormData();
    console.log(formdata);
    if (mediumNameValue == "" || mediumNameParentValue == "") {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      formdata.append("source_parent", mediumNameParentValue);
      formdata.append("source_name", mediumNameValue);
      apiMethod("PostCreateMedium", formdata);
      setMediumNameParentValue("");
      setMediumNameValue("");
      swal({
        title: "Add Medium Successfully ",
        icon: "success",
        timer: 1500,
      });
      resetForm();
    }
  };

  const handleSource = (selected) => {
    swal({
      title: "Are you sure to remove the Source from the system?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        let formData = new FormData();
        apiMethod(`PostDeleteSource/${selected}`);
      } else {
      }
    });
  };
  function submit1(page, pageSize) {
    // console.log(page, "fghf");
    // // const calculatedPageSize = page === 1 ? 6 : page * 6 - 5;

    // // console.log(calculatedPageSize)
    // const formdata = new FormData();

    // formdata.append('page', page);

    // apiMethoddata('postAllViewLeadUser', formdata);
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}getAllMediums/${page}`)
      .then((response) => {
        console.log(response.data.CustomFields);
        setMediums(response.data);
        setCurrentPage(page);
      })
      .catch((err) => {
        console.log("eerr", err);
      });
  }

  const handleMedium = (selected) => {
    swal({
      title: "Are you sure to remove the Medium from the system?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        let formData = new FormData();
        apiMethod(`PostDeleteMedium/${selected}`);
      } else {
      }
    });
  };

  const HandleEdit_items = (EditItems) => {
    console.log(EditItems, "selected items");
    setEditSource(EditItems.source_name_tab);
    setEditMedium(EditItems.source_name);
    setEditSource_id(EditItems.source_parent);
    setEditMedium_id(EditItems.source_id);
  };
  const HandleEdit_onlySource = (EditItems) => {
    console.log(EditItems, "selected items");
    setEditSource(EditItems.source_name);
    setEditSource_id(EditItems.source_id);
  };
  const Handle_Submit_Edit_Source = () => {
    if (EditSource.trim() !== "") {
      let formData = new FormData();
      formData.append("source_name", EditSource);
      apiMethod(`PostEditSource/${EditSource_id}`, formData);
      setShow(false);
      swal({
        title: "Updated Successfully!",
        icon: "success",
        timer: 1500,
      });
    } else {
      swal({
        title: "Required Field are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      });
    }
  };
  const Handle_Submit_Edit_Source_2 = () => {
    if (EditSource) {
      let formData = new FormData();
      formData.append("source_name", EditSource);
      apiMethod(`PostEditSource/${EditSource_id}`, formData);
      swal({
        title: "Updated Successfully!",
        icon: "success",
        timer: 1500,
      });
    } else {
      swal({
        title: "Required Field are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  const Handle_submit_edit_medium = () => {
    if (EditMedium && mediumNameParentValue) {
      let formData = new FormData();
      formData.append("source_name", EditMedium);
      formData.append("source_parent", mediumNameParentValue);
      apiMethod(`PostEditMedium/${EditMedium_id}`, formData);
      swal({
        title: "Updated Successfully!",
        icon: "success",
        timer: 1000,
      });
    } else {
      swal({
        title: "Required Field are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      });
    }
  };
  const Handle_submit_edit_medium_2 = () => {
    if (EditMedium && mediumNameParentValue) {
      let formData = new FormData();
      formData.append("source_name", EditMedium);
      formData.append("source_parent", mediumNameParentValue);
      apiMethod(`PostEditMedium/${EditMedium_id}`, formData);
      setShow(false);
      swal({
        title: "Updated Successfully!",
        icon: "success",
        timer: 1000,
      });
    } else {
      swal({
        title: "Required Field are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      });
    }
  };

  return (
    <div className="section-body mt-3">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-xl-8 col-lg-8">
            <div className="">
              <table className="table sourceTable table-hover table-vcenter text-nowrap table_custom border-style list gtab">
                <thead>
                  <tr>
                    <th>Medium</th>
                    <th>Source</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mediums.map((data, index) => (
                    <tr key={data.source_id}>
                      <td>{data.source_name}</td>
                      <td>{data.source_name_tab}</td>
                      <td
                        className="tex t-right"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <div className="d-flex align-items">
                          <span className="mx-1" onClick={() => { handleShow(); setonlySourceEdit(false) }}>
                            <FaPencilAlt
                              className="editpencil"
                              onClick={() => HandleEdit_items(data)}
                            />
                          </span>
                          <span className="mx-1">
                            <i
                              className="fa-solid fa-rectangle-xmark"
                              style={{ color: "#DB2828" }}
                            ></i>
                          </span>
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                            <Dropdown.Menu className="custom-menu">
                              <Dropdown.Item
                                onClick={() => handleSource(data.source_parent)}
                              >

                                Source ({data?.source_name_tab})
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleMedium(data.source_id)}
                              >

                                Medium ({data?.source_name})
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                pageSize={Number(limit)}
                defaultPageSize={5}
                total={totalleads}
                onChange={submit1}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4">
            <div className="card">
              <div className="card-header borderblue">
                <h3 className="card-title">Add New Source</h3>
              </div>
              <Formik initialValues={initialValues} onSubmit={handleSourceName}>
                <Form name="myForm">
                  <div className="card-body mb-0">
                    <div className="col-md-12 mt-1">
                      <div className="form-group">
                        <label className="form-label">Source Name</label>
                        <input
                          required=""
                          type="text"
                          className="form-control"
                          name="source_name"
                          value={sourceNameValue}
                          onChange={(e) => setSourceNameValue(e.target.value)}
                        ></input>
                      </div>
                      <div className="form-group mb-0 mt-4 text-right">
                        <SubmitButton
                          props={submitbuttonsource}
                          buttonLoading={res.isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="table border-0 source-only sourceTable  table-vcenter text-nowrap table_custom border-style list gtab">
                    <div>
                      {Array.isArray(sources) &&
                        sources.map((data, index) => (
                          <tr
                            key={index}
                            className="px-2"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <td className="w-100 d-flex justify-content-between rounded my-1">
                              <span style={{ cursor: "pointer" }}>
                                {data.source_name}
                              </span>
                              <span>
                                <span style={{ cursor: "pointer" }} onClick={() => { handleShow(); setonlySourceEdit(true) }}>
                                  <FaPencilAlt
                                    onClick={() => HandleEdit_onlySource(data)}
                                  />
                                </span>
                                <i
                                  onClick={() => handleSource(data.source_id)}
                                  className="fa-solid fa-rectangle-xmark mx-2"
                                  style={{ color: "rgb(219, 40, 40)", cursor: "pointer" }}
                                ></i>
                              </span>
                            </td>
                          </tr>
                        ))}
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="card">
              <div className="card-header borderblue">
                <h3 className="card-title">Add Medium</h3>
              </div>
              <Formik initialValues={initialValues} onSubmit={handleMediumName}>
                <Form name="myForm">
                  <div className="card-body mb-0">
                    <div className="col-md-12 mt-1">
                      <div className="form-group">
                        <label className="form-label">Medium Name</label>
                        <input
                          required=""
                          type="text"
                          className="form-control"
                          name="medium_name"
                          value={mediumNameValue}
                          onChange={(e) => setMediumNameValue(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Source</label>
                        <select
                          required=""
                          value={mediumNameParentValue}
                          className="form-control"
                          name="source_parent"
                          onChange={(e) =>
                            setMediumNameParentValue(e.target.value)
                          }
                        >
                          <option value="">--Select--</option>
                          {sources.map((data, index) => (
                            <option value={data.source_id} key={data.source_id}>
                              {data.source_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group mb-0 mt-4 text-right">
                        <SubmitButton
                          props={submitbuttonmedium}
                          buttonLoading={res.isLoading}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onlySourceEdit ? "Edit Source" : "Edit Source & Medium"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {onlySourceEdit ? <div className="tab-content">
            <div className="tab-pane show active">
              <div className="form-group">
                <label className="form-label">Source Name</label>
                <input
                  required=""
                  type="text"
                  className="form-control"
                  defaultValue={EditSource}
                  value={EditSource}
                  onChange={(e) => setEditSource(e.target.value)}
                />
              </div>
              <div className="form-group mb-0 mt-1">
                <div className="d-grid">
                  <div className="d-flex mb-1 gap1">
                    <div
                      className="btn btn-success flex-fill mr-1 supd"
                      onClick={Handle_Submit_Edit_Source}
                    >
                      Update
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div> : <Tabs
            defaultActiveKey="Source"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="Source" title="Source">
              <div className="tab-content">
                <div className="tab-pane show active">
                  <div className="form-group">
                    <label className="form-label">Source Name</label>
                    <input
                      required=""
                      type="text"
                      className="form-control"
                      defaultValue={EditSource}
                      value={EditSource}
                      onChange={(e) => setEditSource(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-0 mt-1">
                    <div className="d-grid">
                      <div className="d-flex mb-1 gap1">
                        <div
                          className="btn btn-success flex-fill mr-1 supd"
                          onClick={Handle_Submit_Edit_Source}
                        >
                          Save & Close
                        </div>
                        <div
                          className="btn btn-success flex-fill mr-1 supd"
                          onClick={Handle_Submit_Edit_Source_2}
                        >
                          Save Only
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="Medium" title="Medium ">
              <div className="tab-content">
                <div className="tab-pane show active">
                  <div className="form-group">
                    <label className="form-label">Medium Name</label>
                    <input
                      required=""
                      type="text"
                      className="form-control"
                      defaultValue={EditMedium}
                      value={EditMedium}
                      onChange={(e) => setEditMedium(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Source</label>
                    <select
                      required=""
                      value={mediumNameParentValue}
                      className="form-control"
                      name="source_parent"
                      onChange={(e) => setMediumNameParentValue(e.target.value)}
                    >
                      <option value="">--Select--</option>
                      {sources.map((data, index) => (
                        <option value={data.source_id} key={data.source_id}>
                          {data.source_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-0 mt-1">
                    <div className="d-grid">
                      <div className="d-flex mb-1 gap1">
                        <div
                          className="btn btn-success flex-fill mr-1 supd"
                          onClick={Handle_submit_edit_medium_2}
                        >
                          Save & Close
                        </div>
                        <div
                          className="btn btn-success flex-fill mr-1 supd"
                          onClick={Handle_submit_edit_medium}
                        >
                          Save Only
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>}
        </Modal.Body>
      </Modal>
    </div>
  );
}
