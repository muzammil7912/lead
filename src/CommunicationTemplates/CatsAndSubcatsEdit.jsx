import React, { useState, useContext, useEffect } from "react";
import swal from 'sweetalert';
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from '../components/SubmitButton';
import axios from "axios";
import { getTokenSession } from "../utils/common";
import { Form, Formik } from "formik";
import config from "../services/config.json";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import usePost from '../customHooks/usePost';
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";

export default function Source({ translation }) {
  const navigate = useNavigate();
  const submitbuttoncategory = {
    class: "btn btn-primary",
    text: "Add Category",
  };
  const submitbuttonsubcat = {
    class: "btn btn-primary",
    text: "Add Sub Category",
  };
  function CustomToggle({ children, eventKey }) {

    const handleClick = () => {
      // Update the active accordion item
    };
  
    return (
      <button
        type="button"
        style={{ backgroundColor: 'pink' }}
        onClick={handleClick}
      >
        {children}
      </button>
    );

  }
  const [rescat, apiMethodcat] = usePost();
  const [categoryNameValue, setCategoryNameValue] = useState("")
  const [subCatNameValue, setSubCatNameValue] = useState("")
  const [subCatNameParentValue, setSubCatNameParentValue] = useState("")
  const [subcat, setSubcat] = useState(false)
  const { leadPermission } = useContext(MainLeadPermissionContext);

  const [selectedCat, setSelectedCat] = useState(false);
  const [subCatList, setSubCatList] = useState("");
  const [rescategory, apiMethod] = usePost();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (rescat.data && rescat.data.length > 0) {
      setSubCatList(rescat.data);
      setSubcat(true);
    }
  }, [rescat.data]);

  useEffect(() => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}getCommunicationViewCategory`)
      .then((response) => {
        if(response.data) {
          setCategory(response.data);
        }
      })
  }, [rescategory.data]);

  let v = {}
  let initialValues = v;

  const handleCategoryName = (values, { resetForm }) => {
    let formdata = new FormData();
    if (categoryNameValue == "") {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    }
    else {
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      formdata.append("p_cate", "p_category_pagE");
      formdata.append("cate_name", categoryNameValue);
      apiMethod("postCommunicationCreateCategoriesSubCategories", formdata);
      resetForm();
    }
  };

  const handleDelete = (item) => {
    let deleteData = new FormData();
    deleteData.append("general", "rem_act_prio");
    deleteData.append("priority_id", item.priority_id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // apiMethoddelete(`postDeletedMeetingPriority`, deleteData);
        // setpriorityData(priorityData.filter(deleteItem => deleteItem.priority_id !== item.priority_id))
      }
    });
  }

  const handleSubCategory = ({ resetForm }) => {
    let formdata = new FormData();
    if (subCatNameValue == "" || subCatNameParentValue == '') {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    }
    else {
      formdata.append("p_cate_sub", 'p_category_SubcatpagE');
      formdata.append("cate_name", subCatNameValue);
      formdata.append("cate_parent", subCatNameParentValue);
      apiMethod("postCommunicationCreateCategoriesSubCategories", formdata);
      resetForm();
    }
  };
  function handleClickSubCategory(key){
    if(selectedCat == key && subcat == true) {
      setSubcat(false);
      setSubCatList("");
    } else {
      let formdata = new FormData();
      formdata.append("general", "get_sub_cat");
      formdata.append("query[]", key);
      apiMethodcat("postCommunicationViewSubCategory", formdata);
      setSubcat(false);
      setSelectedCat(key);
      setSubCatList("");
    }
  }
  if (leadPermission?.super_admin == "1" || (leadPermission?.comm_temp_module?.view == "1" && leadPermission?.comm_temp_module?.active_module == "1")) {
    return (
      <div className="section-body mt-3">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className={`${leadPermission?.super_admin == "1" || leadPermission?.comm_temp_module?.create == "1" ? "col-xl-8 col-lg-8" : "col-xl-12 col-lg-12"}`}>
                <div className="card">
                  <div className="card-header">
                      <div className="card-title">Categories</div>
                  </div>
                  <table className="table card-table">
                    <tbody>
                      {category && !category.message && category.map((item,i) => {
                        return (
                          <React.Fragment key={item.cat_id}>
                            <tr onClick={() => handleClickSubCategory(item?.cat_id)}>
                              <td className="width50"><i className="fa fa-folder"></i> 
                              {item?.cat_count > 0 &&
                                <span className="ico" data-class="1"><i
                                  className={
                                    selectedCat == item?.cat_id && subcat
                                      ? 'fa fa-caret-up'
                                      : 'fa fa-caret-down'
                                  }
                                  style={{ paddingLeft: '5px' }}
                                ></i></span>
                              }
                              </td>
                              <td className="font-weight-bold">{item?.cat_name}</td>
                              <td className="text-right">contains <strong>{item?.cat_count}</strong> sub-categories</td>
                              <td>
                                <OverlayTrigger
                                  placement={"top"}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Edit Category
                                    </Tooltip>
                                  }
                                >
                                  <Link to={`/${config.ddemoss}cat_edit/edit/${item.cat_id}`} className="btn btn-icon vstg" style={{ backgroundColor: '#fff' }}>
                                    <i className="fa fa-pencil fa-lg" />
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement={"top"}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Delete Category
                                    </Tooltip>
                                  }
                                >
                                  <Link onClick={() => handleDelete(item)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                                    <i className="fa fa-trash fa-lg" />
                                  </Link>
                                </OverlayTrigger>
                              </td>
                            </tr>
                            {selectedCat == item?.cat_id && subcat &&
                              <tr>
                                <td></td>
                                <td colSpan="2" style={{padding: '0'}}>
                                  <table className="table card-table">
                                    <tbody>
                                      {subCatList && subCatList.map((subitem, subi) => {
                                        return (
                                          <tr key={subi}>
                                            <td className="width45"><i className="fa fa-folder"></i></td>
                                            <td className="font-weight-bold"> {subitem?.cat_name}</td>
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>
                                </td>
                                <td>
                                  <OverlayTrigger
                                    placement={"top"}
                                    overlay={
                                      <Tooltip id={`tooltip-top`}>
                                        Edit Category
                                      </Tooltip>
                                    }
                                  >
                                    <Link to={`/${config.ddemoss}communication_cats_edit/edit/${item.cat_id}`} className="btn btn-icon vstg" style={{ backgroundColor: '#fff' }}>
                                      <i className="fa fa-pencil fa-lg" />
                                    </Link>
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                    placement={"top"}
                                    overlay={
                                      <Tooltip id={`tooltip-top`}>
                                        Delete Stages
                                      </Tooltip>
                                    }
                                  >
                                    <Link onClick={() => handleDelete(item)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                                      <i className="fa fa-trash fa-lg" />
                                    </Link>
                                  </OverlayTrigger>
                                </td>
                              </tr>
                            }
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            {leadPermission?.super_admin == "1" || leadPermission?.comm_temp_module?.create == "1" ? (
              <div className="col-xl-4 col-lg-4">
                  <div className="card">
                    <div className="card-header borderblue">
                      <h3 className="card-title">Add New Category</h3>
                    </div>
                    <Formik initialValues={initialValues} onSubmit={handleCategoryName}>
                      <Form name="myForm">
                        <div className="card-body mb-0">
                          <div className="col-md-12 mt-1">
                            <div className="form-group">
                              <label className="form-label">Category Name</label>
                              <input required="" type="text" className="form-control" name="category_name" onChange={(e) => setCategoryNameValue(e.target.value)}></input>
                            </div>
                            <div className="form-group mb-0 mt-4 text-right">
                              <SubmitButton props={submitbuttoncategory} />
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                  <div className="card">
                    <div className="card-header borderblue">
                      <h3 className="card-title">Add New Sub-Category</h3>
                    </div>
                    <Formik initialValues={initialValues} onSubmit={handleSubCategory}>
                      <Form name="myForm">
                        <div className="card-body mb-0">
                          <div className="col-md-12 mt-1">
                            <div className="form-group">
                              <label className="form-label">Sub-category Name</label>
                              <input required="" type="text" className="form-control" name="cate_name" onChange={(e) => setSubCatNameValue(e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Category</label>
                              <select required="" className="form-control" name="cate_parent" onChange={(e) => setSubCatNameParentValue(e.target.value)}>
                                <option value="">--Select--</option>
                                {category && !category.message && category.map((data, index) => (
                                  <option value={data.cat_id} key={data.cat_id}>{data.cat_name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group mb-0 mt-4 text-right">
                              <SubmitButton props={submitbuttonsubcat} />|
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              ) : null}
          </div>
        </div>
      </div >
    );
  } else {
    navigate(`/${config.ddemoss}`);
  }
}
