import React, { useState, useContext, useEffect } from "react";
import swal from 'sweetalert';
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from '../components/SubmitButton';
import axios from "axios";
import { getTokenSession } from "../utils/common";
import { Form, Formik } from "formik";
import config from "../services/config.json";
import { Translation } from "../components/Translation";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import usePost from '../customHooks/usePost';
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import EditModal from "./modal"
import SubCategory from "./SubModal";
import { toast } from "react-toastify";
import useFetch from "../customHooks/useFetch";

export default function Source() {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts)
  const { data: categorys } = useFetch("", "getViewCategory");
  const [category, setCategory] = useState([]);
    useEffect(() => {
      if (leadPermission) {
          if (leadPermission?.filesnmedia_module?.active_module === "0" || leadPermission?.filesnmedia_module?.view === "0") {
            navigate(`/${config.ddemoss}`);
          }
        }
      }, [leadPermission]);
  useEffect(() => {
    if (categorys) {
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
  const [rescategory2, apiMethod2] = usePost();
  useEffect(() => {
    if (ressubcat.data) {
      setSubcat2(ressubcat.data);
    }
  }, [ressubcat.data]);;
  const hangleApi = () => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}getViewCategory`)
      .then((response) => {
        if (response.data) {
          setCategory(response.data);
        }
      })
  }
  useEffect(() => {
    if (rescat.data) {
      setSubCatList(rescat.data);
      setSubcat(true);
    }
  }, [rescat.data]);
  let v = {}
  let initialValues = v;

  const handleCategoryName = (values) => {
    let formdata = new FormData();
    if (categoryNameValue == "") {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    }
    else {
      formdata.append("p_cate", "p_category_pagE");
      formdata.append("cate_name", categoryNameValue);
      apiMethod("postCreateCategoriesSubCategories", formdata);
     
    }
  };

  const handleDelete = (item, childId) => {
    let deleteData = new FormData();
    deleteData.append("deleted_cate_sub", "deleted_category_SubcatpagE");
    deleteData.append("cate_id", childId);
    deleteData.append("cate_parent", item);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      showCancelButton: false,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeletedCatAndSubCategory`, deleteData);
        setSubCatList(subCatList.filter((item) => item.cat_id !== childId))
        console.log(childId)
      }
    });
  }
  const handleDelete2 = (item) => {
    let deleteData = new FormData();
    deleteData.append("deleted_cate", "deleted_category_pagE");
    deleteData.append("cate_id", item);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      showCancelButton: false,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeletedCatAndSubCategory`, deleteData);
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
      formdata.append("p_cate_sub", 'p_category_SubcatpagE');
      formdata.append("cate_name", subCatNameValue);
      formdata.append("cate_parent", subCatNameParentValue);
      apiMethod2("postCreateCategoriesSubCategories", formdata);
      resetForm();
    }
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
      setCategoryNameValue("")
      toast.success(rescategory.data.message);
      hangleApi()
    }
  }, [rescategory.data])
  useEffect(() => {
    if (rescategory2.data && !rescategory2.isLoading) {
      setSubCatNameValue("")
      setSubCatNameParentValue("")
      toast.success(rescategory2.data.message);
      hangleApi()
    }
  }, [rescategory2.data])
  useEffect(() => {
    if (resdel.data && !resdel.isLoading) {
      toast.success(resdel.data.message);
      hangleApi()
    }
  }, [resdel.data])











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
      .get(`${config.apiEndPoint}getViewCategory`)
      .then((response) => {
        setCategory(response.data);
      })
  }, [rescategory.data]);

  
  function handleClickSubCategory(key) {
    if (selectedCat == key && subcat == true) {
      setSubcat(false);
      setSubCatList("");
    } else {
      let formdata = new FormData();
      formdata.append("general", "get_sub_cat");
      formdata.append("query[]", key);
      apiMethodcat("postViewSubCategory", formdata);
      setSubcat(false);
      setSelectedCat(key);
      setSubCatList("");
    }
  }

   return (
      <div className="section-body mt-3">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className={`${leadPermission?.super_admin || leadPermission?.filesnmedia_module?.create === "1" ? "col-xl-8 col-lg-8" : "col-xl-12 col-lg-12"}`}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title"> {Translation(translations, "Categories")}</div>
                </div>
                <table className="table card-table">
                  <tbody>
                    {category && category.map((item, i) => {
                      return (
                        <React.Fragment key={item.cat_id}>
                          <tr onClick={() => handleClickSubCategory(item.cat_id)}>
                            <td className="width50"><i className="fa fa-folder"></i>
                              {item.cat_count > 0 &&
                                <span className="ico" data-class="1"><i
                                  className={
                                    selectedCat == item.cat_id && subcat
                                      ? 'fa fa-caret-up'
                                      : 'fa fa-caret-down'
                                  }
                                  style={{ paddingLeft: '5px' }}
                                ></i></span>
                              }
                            </td>
                            <td className="font-weight-bold">{item.cat_name}</td>
                            <td className="text-right">{Translation(translations, "contains")}  <strong>{Translation(translations, item.cat_count)}</strong>{Translation(translations, "sub-categories")} </td>
                            <td>
                              <div className="d-flex justify-content-end gap-1">
                            {
                                    (leadPermission?.super_admin || leadPermission?.filesnmedia_module?.edit === "1") &&

                              <OverlayTrigger
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`}>
                                    Edit Category
                                  </Tooltip>
                                }
                                >
                                <Link onClick={handleShowModal} className="" style={{ backgroundColor: '#fff' }}>
                                  <EditModal
                                    name={item.cat_name}
                                    defaultValue={item.cat_id}
                                    handleAPI={hangleApi}
                                    />
                                </Link>
                              </OverlayTrigger>
                    }
                     {
                       (leadPermission?.super_admin || leadPermission?.filesnmedia_module?.delete === "1") &&
                       <OverlayTrigger
                       placement={"top"}
                       overlay={
                         <Tooltip id={`tooltip-top`}>
                                    Delete Stages
                                  </Tooltip>
                                }
                                >
                                <Link onClick={() => handleDelete2(item.cat_id, item.id)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                                  <i className="fa fa-trash fa-lg" />
                                </Link>
                              </OverlayTrigger>
                    }
                    </div>
                            </td>
                          </tr>
                          {selectedCat == item.cat_id && subcat &&
                            <tr>
                              <td></td>
                              <td colSpan="2" style={{ padding: '0' }}>
                                <table className="table card-table">
                                  <tbody>
                                    {subCatList && subCatList.map((subitem, subi) => {
                                      return (
                                        <tr key={subi}>
                                          <td className="width45"><i className="fa fa-folder"></i></td>
                                          <td className="font-weight-bold"> {Translation(translations, subitem.cat_name)}</td>
                                          <td>
                                          <div className="d-flex justify-content-end gap-1">
                                          {
                                    (leadPermission?.super_admin || leadPermission?.filesnmedia_module?.edit === "1") &&
                                            <OverlayTrigger
                                              placement={"top"}
                                              overlay={
                                                <Tooltip id={`tooltip-top`}>
                                                  Edit Sub-Category
                                                </Tooltip>
                                              }
                                            >
                                              <Link onClick={handleShowModal2} className="" style={{ backgroundColor: '#fff' }}>
                                                <SubCategory
                                                  parentId={item.cat_id}
                                                  childId={subitem?.cat_id}
                                                  setSubCatList={setSubCatList}
                                                  setSelectedCat={setSelectedCat}
                                                  handleAPI2={() => handleClickSubCategory(item.cat_id)}
                                                  name={subitem.cat_name}
                                                />
                                              </Link>
                                            </OverlayTrigger>
                                    }
                                     {
                                    (leadPermission?.super_admin || leadPermission?.filesnmedia_module?.delete === "1") &&
                                            <OverlayTrigger
                                              placement={"top"}
                                              overlay={
                                                <Tooltip id={`tooltip-top`}>
                                                  Delete Sub-Category
                                                </Tooltip>
                                              }
                                            >
                                              <Link onClick={() => handleDelete(item.cat_id, subitem?.cat_id)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                                                <i className="fa fa-trash fa-lg" />
                                              </Link>
                                            </OverlayTrigger>
                                    }
                                    </div>
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
            {leadPermission?.super_admin || leadPermission?.filesnmedia_module?.create === "1" ? (
              <div className="col-xl-4 col-lg-4">
                <div className="card">
                  <div className="card-header borderblue">
                    <h3 className="card-title"> {Translation(translations, 'Add New Category')} </h3>
                  </div>
                  <Formik initialValues={initialValues} onSubmit={handleCategoryName}>
                    <Form name="myForm">
                      <div className="card-body mb-0">
                        <div className="col-md-12 mt-1">
                          <div className="form-group">
                            <label className="form-label">{Translation(translations, 'Category Name')} </label>
                            <input required="" type="text" className="form-control" name="category_name" value={categoryNameValue} onChange={(e) => setCategoryNameValue(e.target.value)}></input>
                          </div>
                          <div className="form-group mb-0 mt-4 text-right">
                            <SubmitButton buttonLoading={rescategory.isLoading} props={submitbuttoncategory} />
                          </div>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className="card">
                  <div className="card-header borderblue">
                    <h3 className="card-title"> {Translation(translations, 'Add New Sub-Category')}</h3>
                  </div>
                  <Formik initialValues={initialValues} onSubmit={handleSubCategory}>
                    <Form name="myForm">
                      <div className="card-body mb-0">
                        <div className="col-md-12 mt-1">
                          <div className="form-group">
                            <label className="form-label">{Translation(translations, 'Sub-category Name')} </label>
                            <input required="" type="text" className="form-control" name="cate_name" value={subCatNameValue} onChange={(e) => setSubCatNameValue(e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label className="form-label"> {Translation(translations, 'Category')}</label>
                            <select required="" className="form-control" name="cate_parent" value={subCatNameParentValue} onChange={(e) => setSubCatNameParentValue(e.target.value)}>
                              <option value=""> {Translation(translations, '--Select--')}</option>
                              {category.map((data, index) => (
                                <option value={data.cat_id} key={data.cat_id}>{data.cat_name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group mb-0 mt-4 text-right">
                            <SubmitButton buttonLoading={rescategory2.isLoading} props={submitbuttonsubcat} />
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
