
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import swal from 'sweetalert';
import { getTokenSession } from "../../utils/common";
import usePost from '../../customHooks/usePost';
import SubmitButton from '../../components/SubmitButton';
import { Translation } from '../../components/Translation';
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import config from "../../services/config.json";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Loader from '../../components/common/Loading';
import FormControl from '../../components/form/FormControl';
import useFetch from '../../customHooks/useFetch';
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";

function CreateStage({ translation }) {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState();
  const { data: stageData, loading, error } = useFetch("", `getKanbanOpportunityStageOrderNumber/${id}`);
  const [dropdown, setDropdown] = useState();
  const [resdelete, apiMethoddelete] = usePost();
  const isComponentMounted = useRef(true);
  const [resView, apiMethodView] = usePost();
  const [resget, apiMethodGet] = usePost();
  const authentication = getTokenSession();
  const [res, apiMethod] = usePost();
  const [Name, setName] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [PageTitle, setPageTitle] = useState('');
  const [PipeLineID, setPipeLineID] = useState(0);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();

  let initialValues = {
    "name": "",
    "stage_name": "",
    "background_color": "#000000",
    "font_color": "#ffffff",
    "column_width": 300,
    "order": "",
  }

  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.opportunity_stages?.active_module === "0" || leadPermission?.opportunity_stages?.create === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);

  useEffect(() => {
    if (stageData) {
      // console.log(stageData)
      setDropdown(stageData)
    }
  }, [stageData])
  useEffect(() => {
    if (resView.data) {
      setSubCategory(resView.data)
    }
  }, [resView.data])
  const handleModalStageClose = () => {
    setShowEdit(false)
  }
  const handleSubmit = (values, { resetForm }) => {
    if ((values.name != "") && (values.stage_name != "") && (values.background_color != "") && (values.font_color != "") &&
      (values.Column_Width != "") && (values.order != "")) {
      let formdata = new FormData();
      formdata.append("piplineid", id);
      formdata.append("general", "add_pipeline_stage");
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      apiMethod("postCreateOpportunityPiplinesStages", formdata);
      const newInitialValues = {
        name: "",
        stage_name: "",
        background_color: "#ffffff",
        font_color: "#000000",
        column_width: 300,
        order: "",
      };

      resetForm({ values: newInitialValues });
    }
    else {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    }
  }
  useEffect(() => {
    if (res.data) {
      res.data.message &&
        toast.success(res.data.message);
        navigate(`/${config.ddemoss}opportunities/${id}/Kanban`)
    }
  }, [res.data])

  useEffect(() => {
    setShowEdit(false)
    axios.defaults.headers = {
      authentication: `${authentication}`,
    };
    axios
      .get(`${config.apiEndPoint}getEditOpportunityPiplines/${id}`)
      .then((response) => {
        console.log(response)
        setPageTitle(response.data[0].pipeline_title);

      })
      .catch((error) => {
        if (error.response.status === 401)
          toast.error(error.response.data.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  }, [id]);

  useEffect(() => {
    if (resView.data) {
      console.log(resView);
      if (resView.data.length) {
        console.log("checking", resView.data)
        setShowEdit(true)
      }
      else {
        swal({
          title: "Stage List is empty!",
        })
      }
    }
  }, [resView.data])


  const handleView = (e) => {
    e.preventDefault()
    let formdata = new FormData();
    formdata.append("general", "view_pipeline_stages");
    formdata.append("gtRs", id);
    formdata.append("gtRsLbl", id);
    formdata.append("gtRsLbl", id);
    formdata.append("layout", "list");
    apiMethodView("postAllViewOpportunityPiplinesStages", formdata);
  }
  const handleDeleteStage = (item) => {
    let formdata = new FormData();
    formdata.append("general", "remove_pipeline_stages");
    formdata.append("pipeline_id", id);
    formdata.append("stage_id", item.id);
    formdata.append("new_stage", item.id);
    formdata.append("layout", "list");
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete("postDeleteOpportunitypiplinesStages", formdata);
        setSubCategory(subCategory.filter((ite) => ite.id !== item.id))
      }
    });
  }
  useEffect(() => {
    if (resdelete.data && !resdelete.isLoading) {
      resdelete.data.message && toast.success(resdelete.data.message);
    }
  }, [resdelete.data]);

  if (loading || !dropdown) return <Loader />;
  const submitbutton = {
    class: "btn btn-primary",
    text: "Store Stage",
  };

  return (
    <div className="CreateStage my-4">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-12">
            <div className="card">
              <div className="card-header borderblue">
                <div className="card-title">
                  {PageTitle} - {Translation(translation, "Create Stage")}
                </div>
                <div className="card-options">
                  <Link to={`opportunities/${id}`} className="btn btn-sm btn-primary bsm-1 vstg box_shadow" data-stage="1"><i className="fa-solid fa-house"></i></Link>
                  <Link onClick={(e) => handleView(e)} className="btn btn-sm btn-primary bsm-1 vstg"><i className="fe fe-eye"></i> View Stages</Link>
                  <Link to={`/${config.ddemoss}pipelines`} className="btn btn-sm btn-primary bsm-1"> Go to Pipelines</Link>
                </div>
              </div>
              <div className="card-body">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form name="myForm">
                    <div className="row">

                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translation, "Name")}
                          name="name"
                          control="input3"
                          placeholder={Translation(translation, "Label")}
                          required={true}
                        />
                      </div>

                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translation, "Stage Name")}
                          name="stage_name"
                          control="input3"
                          placeholder={Translation(translation, "Stage Name")}
                          required={true}
                        />
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          className="input-color color_input"
                          label={Translation(translation, " Background Color")}
                          name="background_color"
                          control="input3"
                          type="color"
                          required={true}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          className="input-color color_input"
                          label={Translation(translation, " Font Color")}
                          name="font_color"
                          control="input3"
                          type="color"
                          required={true}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translation, "Column Width")}
                          name="column_width"
                          control="input5"
                          type="number"
                          placeholder={Translation(translation, "300")}
                          style={{ width: "100%" }}

                        />
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor=""><b>Order number</b></label>
                          <Field  as="select" name="order" className="form-control my-1">
                            <option hidden>select</option>
                            {Array.isArray(dropdown) && dropdown?.map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="text-right mt-5">
                      <span className="res"></span>
                      <SubmitButton
                        props={submitbutton}
                        buttonLoading={res.isLoading}
                      />

                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showEdit} size="lg" onHide={handleModalStageClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Translation(translation, PageTitle)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="stage-content">
            <table className="table table-hover table-vcenter text-nowrap table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Label</th>
                  <th className="text-center">Colors</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {!subCategory?.message ? subCategory?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.body}</td>
                      <td>{item?.body}</td>
                      <td className="text-center">
                        <div className="tidybox" style={{ "backgroundColor": `${item?.bg_color}` }}></div>
                        <div className="tidybox" style={{ "backgroundColor": `${item?.font_color}` }}></div> </td>
                      <td className="text-right"> <Link to={`/${config.ddemoss}opportunity_pipelines/${item.pipeline_id}/edit_stage/${item.id}`} className="text-info">
                        <i className="fa-sharp fa-solid fa-pencil"></i>
                      </Link>
                        <Link onClick={() => handleDeleteStage(item)} className="text-danger dlt-pstg"> <i className="fa-regular fa-trash-can"></i> </Link>
                      </td>
                    </tr>
                  )
                }) : <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalStageClose}>
            {Translation(translation, "Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default CreateStage