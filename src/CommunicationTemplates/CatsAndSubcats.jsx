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
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from "../components/Translation";
import useFetch from "../customHooks/useFetch";
import { toast } from "react-toastify";
import EditModal from "./modal";
import SubCategory from "./SubCategorymodal";
import Loader from "../components/common/Loading";

export default function Source() {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts)
  useEffect(() => {
    if (leadPermission) {
        if (leadPermission?.comm_temp_module?.active_module === "0" || leadPermission?.comm_temp_module?.view === "0") {
          navigate(`/${config.ddemoss}`);
        }
      }
    }, [leadPermission]);
  const { data: categorys, loading } = useFetch("", "getCommunicationAllViewCategoriesSubCategories");
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if(categorys) {
      setCategory(categorys);
    }
   }, [categorys]);
  const handleShowModal = () => setShowModal(true);
  const handleShowModal2 = () => setShowModal2(true);
  const navigate = useNavigate();
  
  const [ressubcat, apiMethodsubcat] = usePost();
  const [firstop, setfirstop] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const submitbuttoncategory = {
    class: "btn btn-primary",
    text: "Add Category",
  };
  const submitbuttonsubcat = {
    class: "btn btn-primary",
    text: "Add Sub Category",
  };

  const [rescat, apiMethodcat] = usePost();
  const [resdel, apiMethoddelete] = usePost();
  const [categoryNameValue, setCategoryNameValue] = useState("")
  const [subCatNameValue, setSubCatNameValue] = useState("")
  const [subCatNameParentValue, setSubCatNameParentValue] = useState("")
  const [subcat, setSubcat] = useState(false)
  const [Subcat2, setSubcat2] = useState(false)
  const [selectedCat, setSelectedCat] = useState(false);
  const [subCatList, setSubCatList] = useState("");
  const [rescategory, apiMethod] = usePost();

  useEffect(() => {
    if (ressubcat.data) {
      setSubcat2(ressubcat.data);
      console.log(ressubcat)
    }
  }, [ressubcat.data]);;
const hangleApi = () => {
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  axios
    .get(`${config.apiEndPoint}getCommunicationAllViewCategoriesSubCategories`)
    .then((response) => {
      if (response.data) {
        console.log(response.data)
        console.log("response.data")
        setCategory(response.data);
      }
    })
}
  useEffect(() => {
   if(rescat.data){
    setSubCatList(rescat.data);
    setSubcat(true);
   }
  }, [rescat.data]);
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

  const handleDelete = (childId, parentId) => {
    console.log('parentId',parentId)
    console.log('childId',childId)
    let deleteData = new FormData();
    deleteData.append("deleted_cate_sub", "deleted_category_SubcatpagE");
    deleteData.append("cate_id", childId);
    deleteData.append("cate_parent", parentId);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      showCancelButton: false,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postCommunicationDeletedCatAndSubCategory`, deleteData);
        setSubCatList(subCatList.filter((item) => item.cat_id !== childId))
        console.log(childId)
      }
    });
  }
  const handleDelete2 = (item) => {
    console.log('parentId',item)
    let deleteData = new FormData();
    deleteData.append("deleted_cate", "deleted_category_pagE");
    deleteData.append("cate_id", item.id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      showCancelButton: false,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postCommunicationDeletedCatAndSubCategory`, deleteData);
        setCategory(category.map((item) => {
          const { id, ...rest } = item;
          return rest;
        }));
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
      console.log(subCatNameValue)
      console.log(subCatNameParentValue)
      formdata.append("p_cate_sub", 'p_category_SubcatpagE');
      formdata.append("cate_name", subCatNameValue);
      formdata.append("cate_parent", subCatNameParentValue);
      apiMethod("postCommunicationCreateCategoriesSubCategories", formdata);
      resetForm();
    }
  };
  const handleCategoryChange = (value) => {
    setfirstop(value);
    let catdata = new FormData();
    catdata.append("general", "get_sub_cat");
    console.log(value);
    catdata.append("query[]", value);
    apiMethodsubcat("postCommunicationViewSubCategory", catdata);
  };

  function handleClickSubCategory(key) {
    if (selectedCat == key && subcat == true) {
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
  useEffect(() => {
   if (rescategory.data && !rescategory.isLoading) { 
      toast.success(rescategory.data.message);
      hangleApi()
    }
  }, [rescategory.data])
  useEffect(() => {
   if (resdel.data && !resdel.isLoading) { 
      toast.success(resdel.data.message);
      hangleApi()
    }
  }, [resdel.data])
  if(loading) return <Loader />
    return (
      <div className="section-body mt-3">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className={`${leadPermission?.super_admin || leadPermission?.comm_temp_module?.create === "1" ? "col-xl-8 col-lg-8" : "col-xl-12 col-lg-12"}`}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">{Translation(translations, "Categories")}</div>
                </div>
                <table className="table card-table">
                  <tbody>
                    {category && !category.message && category.map((item, i) => {
                      return (
                        <React.Fragment key={item.id}>
                          <tr
                            onClick={() => handleClickSubCategory(item.id)}
                          >
                            <td className="width50"><i className="fa fa-folder"></i>
                              {item?.children.length > 0 &&
                                <span className="ico" data-class="1"><i
                                  className={
                                    selectedCat == item?.id && subcat
                                      ? 'fa fa-caret-up'
                                      : 'fa fa-caret-down'
                                  }
                                  style={{ paddingLeft: '5px' }}
                                ></i></span>
                              }
                            </td>

                            <td className="font-weight-bold">{item?.name}</td>
                            <td className="text-right">{Translation(translations, "contains")} <strong>{item?.children.length}</strong>{Translation(translations, "sub-categories")}  </td>
                            <td>
                            {
                                    (leadPermission?.super_admin || leadPermission?.comm_temp_module?.edit === "1") &&
                              <OverlayTrigger
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`}>
                                    {Translation(translations, "Edit Category")}
                                  </Tooltip>
                                }
                              >
                                <Link onClick={handleShowModal} className="" style={{ backgroundColor: '#fff' }}>
                                  <EditModal
                                    defaultValue={item.id}
                                    setCategory={setCategory}
                                    handleAPI={hangleApi}
                                    name={item?.name}
                                  />
                                </Link>
                              </OverlayTrigger>
                    }
                              {
                                    (leadPermission?.super_admin || leadPermission?.comm_temp_module?.delete === "1") &&
                              <OverlayTrigger
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`}>
                                    {Translation(translations, "Delete Category")}
                                  </Tooltip>
                                }
                              >

                                <Link onClick={() => handleDelete2(item)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                                  <i className="fa fa-trash fa-lg" />
                                </Link>
                              </OverlayTrigger>
                    }
                            </td>
                          </tr>
                          {selectedCat == item?.id && subcat &&
                            <tr>
                              <td></td>
                              <td colSpan="2" style={{ padding: '0' }}>
                                <table className="table card-table">
                                  <tbody>
                                    {subCatList && subCatList.map((subitem, subi) => {
                                      return (
                                        <tr key={subi}>
                                          <td className="width45"><i className="fa fa-folder"></i></td>
                                          <td className="font-weight-bold"> {subitem?.cat_name}</td>
                                          <td>
                                          {
                                    (leadPermission?.super_admin || leadPermission?.comm_temp_module?.edit === "1") &&
                                <OverlayTrigger
                                  placement={"top"}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      {Translation(translations, "Edit Sub-Category")}
                                    </Tooltip>
                                  }
                                >
                                  <Link onClick={handleShowModal2} className="" style={{ backgroundColor: '#fff' }}>
                                    <SubCategory
                                      parentId={item.id}
                                      name={subitem?.cat_name}
                                      childId={subitem?.cat_id} 
                                      setSubCatList={setSubCatList} 
                                      setSelectedCat={setSelectedCat}
                                      handleAPI2={() => handleClickSubCategory(item.id)}                   
                                    />
                                  </Link>
                                </OverlayTrigger>
                                    }
                                {
                                  (leadPermission?.super_admin || leadPermission?.comm_temp_module?.delete === "1") &&
                                <OverlayTrigger
                                  placement={"top"}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      {Translation(translations, "Delete Stages")}
                                    </Tooltip>
                                  }
                                >
                                    <Link onClick={() => handleDelete(subitem?.cat_id,item.id)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                                    <i className="fa fa-trash fa-lg" />
                                  </Link>
                                </OverlayTrigger>
                                  }
                              </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </table>
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
            {(leadPermission?.super_admin || leadPermission?.comm_temp_module?.create === "1") ? (
              <div className="col-xl-4 col-lg-4">
                <div className="card">
                  <div className="card-header borderblue">
                    <h3 className="card-title">{Translation(translations, "Add New Category")} </h3>
                  </div>
                  <Formik initialValues={initialValues} onSubmit={handleCategoryName}>
                    <Form name="myForm">
                      <div className="card-body mb-0">
                        <div className="col-md-12 mt-1">
                          <div className="form-group">
                            <label className="form-label">{Translation(translations, "Category Name")}</label>
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
                    <h3 className="card-title">{Translation(translations, "Add New Sub-Category")}</h3>
                  </div>
                  <Formik initialValues={initialValues} onSubmit={handleSubCategory}>
                    <Form name="myForm">
                      <div className="card-body mb-0">
                        <div className="col-md-12 mt-1">
                          <div className="form-group">
                            <label className="form-label">{Translation(translations, "Sub-category Name")}</label>
                            <input required="" type="text" className="form-control" name="cate_name" onChange={(e) => setSubCatNameValue(e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label">{Translation(translations, "Category")}</label>
                            <select required="" className="form-control" name="cate_parent" onChange={(e) => setSubCatNameParentValue(e.target.value)}>
                              <option value="">--{Translation(translations, "Select")}--</option>
                              {category && !category.message && category.map((data, index) => (
                                <option value={data.id} key={data.id}>{data.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group mb-0 mt-4 text-right">
                            <SubmitButton props={submitbuttonsubcat} />
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
}
