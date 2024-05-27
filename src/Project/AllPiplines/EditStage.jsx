import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import swal from 'sweetalert';
import usePost from '../../customHooks/usePost';
import SubmitButton from '../../components/SubmitButton';
import { Translation } from '../../components/Translation';
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import config from "../../services/config.json";
import Modal from "react-bootstrap/Modal";
import useFetch from '../../customHooks/useFetch';
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import FormControl from "../../components/form/FormControl";
import Loader from '../../components/common/Loading';
import { MainTranslationContexts } from '../../context/MainTranslationContexts';


function EditStage() {
  const { id, pipeline_id } = useParams();
  const { translations } = useContext(MainTranslationContexts);
  const isComponentMounted = useRef(true);
  const [resView, apiMethodView] = usePost();
  const [resget, apiMethodGet] = usePost();
  const [res, apiMethod] = usePost();
  const [Name, setName] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [PageTitle, setPageTitle] = useState('');
  const [PipeLineID, setPipeLineID] = useState(0);
  const { data: stageData, loading, error } = useFetch("", `getKanbanProjectStageOrderNumber/${pipeline_id}`);
  const [dropdown, setdropdown] = useState();

  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();
  const handleModalStageClose = () => {
    setShowEdit(false)
  }
  const handleSubmit = (values) => {
    if (initialValues.bg_color && initialValues.name && initialValues.body && initialValues.font_color && initialValues.column_width && initialValues.order_number != '') {
      let formdata = new FormData();
      formdata.append("general", "update_pipeline_stage");
      formdata.append("name", initialValues.name);
      formdata.append("stage_name", initialValues.body);
      formdata.append("background_color", initialValues.bg_color);
      formdata.append("font_color", initialValues.font_color);
      formdata.append("column_width", initialValues.column_width);
      formdata.append("order", initialValues.order_number);
      formdata.append("pipeline_id", resget?.data?.stage[0].pipeline_id);
      formdata.append("stage_id", resget?.data?.stage[0].id);
      formdata.append("basename", "edit_stage");
      apiMethod("postUpdateProjectsPiplinesStages", formdata);
    }
    else {
      toast.warning(`Please fill required fields`);
    }

  }

  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.project_stages?.active_module === "0" || leadPermission?.project_stages?.edit === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  useEffect(() => {
    if (stageData) {
      // console.log(stageData)
      setdropdown(stageData)
    }
  }, [stageData]);

  useEffect(() => {
    if (res?.data?.message) {
      toast.success(res?.data?.message && res?.data?.message)
      navigate(`/${config.ddemoss}project/${pipeline_id}/Kanban`)
    }
  }, [res.data]);

  useEffect(() => {
    setShowEdit(false)
    let formdata = new FormData();
    formdata.append("stage_id", id);
    formdata.append("pipeline_id", pipeline_id);
    apiMethodGet("postEditProjectsPiplinesStages", formdata);
  }, [id, pipeline_id]);

  useEffect(() => {
    if (resView.data) {
      if (resView.data.length) {
        // console.log("checking", resView.data)
        // setShowEdit(true)
      }
      // else {
      //   swal({
      //     title: "Stage List is empty!",
      //   })
      // }
    }
  }, [resView.data])
  useEffect(() => {
    if (resget.data) {
      setPipeLineID(resget.data?.Piplines[0]?.db_id);
      setPageTitle(resget.data?.Piplines[0]?.pipeline_title);
    }
  }, [resget.data]);
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    if (resget.data && !resget.data.message) {
      setInitialValues(resget.data.stage[0])
    }
  }, [resget.data])
  const submitbutton = {
    class: "btn btn-primary",
    text: "Save & Update Pipeline",
  };
  if (loading) return <Loader />;
  const handleView = () => {
    setShowEdit(true)
    let formdata = new FormData();
    formdata.append("general", "view_pipeline_stages");
    formdata.append("gtRs", PipeLineID);
    formdata.append("gtRsLbl", PipeLineID);
    formdata.append("gtRsLbl", PipeLineID);
    formdata.append("layout", "list");
    apiMethodView("postAllViewProjectsPiplinesStages", formdata);
  }

  const handleDeleteStage = (item) => {
    console.log(item)
    console.log(id)
    // alert("Delete Not working");
    let formdata = new FormData();
    formdata.append("general", "remove_pipeline_stages");
    formdata.append("pipeline_id", item.pipeline_id);
    formdata.append("stage_id", item.id);
    formdata.append("new_stage", item.id);
    apiMethodView("postDeleteProjectspiplinesStages", formdata);
  }
  if (resget.isLoading || !resget.data) return <Loader />;
  return (
    <div className="EditStage my-4">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-12">
            <div className="card">
              <div className="card-header borderblue">
                <div className="card-title">
                  {PageTitle} - {Translation(translations, "Edit Stage")}
                </div>
                <div className="card-options">
                  <Link onClick={handleView} className="btn btn-sm btn-primary bsm-1 vstg"><i className="fe fe-eye"></i> View Stages</Link>
                  <Link to={`/${config.ddemoss}project_pipelines`} className="btn btn-sm btn-primary bsm-1"> Go to Pipelines</Link>
                </div>
              </div>
              <div className="card-body">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form name="myForm">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, "Name")}
                            name="name"
                            control="input"
                            placeholder={Translation(translations, "Label")}
                            required={true}
                            value={initialValues.name}
                            onChange={(e) => setInitialValues({ ...initialValues, ["name"]: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, "Stage Name")}
                            name="body"
                            control="input"
                            placeholder={Translation(translations, "Stage Name")}
                            required={true}
                            value={initialValues.body}
                            onChange={(e) => setInitialValues({ ...initialValues, ["body"]: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="input-color color_input"
                            label={Translation(translations, " Background Color")}
                            name="bg_color"
                            control="input"
                            type="color"
                            required={true}
                            style={{ width: "100%" }}
                            value={initialValues.bg_color}
                            onChange={(e) => setInitialValues({ ...initialValues, ["bg_color"]: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="input-color color_input"
                            label={Translation(translations, " Font Color")}
                            name="font_color"
                            control="input" type="color"
                            required={true}
                            style={{ width: "100%" }}
                            value={initialValues.font_color}
                            onChange={(e) => setInitialValues({ ...initialValues, ["font_color"]: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control form-control-edited my-1"
                            label={Translation(translations, "Column Width")}
                            name="column_width"
                            control="input"
                            type="number"
                            placeholder={Translation(translations, "300")}
                            style={{ width: "100%" }}
                            value={initialValues.column_width}
                            onChange={(e) => setInitialValues({ ...initialValues, ["column_width"]: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor=""><b>Order number</b></label>
                          {  resget.data?.stage[0]?.fixed_order_number === "1" ?
                             <Field type="text" name="order"  value={initialValues.order_number} className="form-control my-1" disabled={true} />
                            :
                            <Field required={true} as="select" value={initialValues.order_number} name="order_number" className="form-control my-1"
                            onChange={(e) => setInitialValues({ ...initialValues, ["order_number"]: e.target.value })}
                          >
                            {dropdown && dropdown.map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </Field>


  }
                        
                        </div>
                      </div>
                    </div>
                    <div className='text-right mt-5'>
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
          <Modal.Title>{Translation(translations, PageTitle)}</Modal.Title>
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
                {!resView?.data?.message ? resView?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.body}</td>
                      <td>{item?.body}</td>
                      <td className="text-center">
                        <div className="tidybox" style={{ "backgroundColor": `${item?.bg_color}` }}></div>
                        <div className="tidybox" style={{ "backgroundColor": `${item?.font_color}` }}></div> </td>
                      <td className="text-right">
                        {id != item.id &&
                          <Link to={`/${config.ddemoss}project_pipelines/${item.pipeline_id}/edit_stage/${item.id}`} className="text-info">
                            <i className="fa-sharp fa-solid fa-pencil"></i>
                          </Link>
                        }
                        {id != item.id &&
                          <span onClick={() => handleDeleteStage(item)} className="margin_gap"> <i className="fa-regular fa-trash-can pointer"></i> </span>
                        }

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
            {Translation(translations, "Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default EditStage