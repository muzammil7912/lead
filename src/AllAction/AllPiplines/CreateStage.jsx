import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
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
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import { MainTranslationContexts } from '../../context/MainTranslationContexts';
import Loader from '../../components/common/Loading';
import FormControl from '../../components/form/FormControl';


function CreateStage() {
  const { id } = useParams();
  const { translations } = useContext(MainTranslationContexts);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const isComponentMounted = useRef(true);
  const [resView, apiMethodView] = usePost();
  const [resget, apiMethodGet] = usePost();
  const authentication = getTokenSession();
  const [res, apiMethod] = usePost();
  const [Name, setName] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [PageTitle, setPageTitle] = useState('');
  const [PipeLineID, setPipeLineID] = useState(0);
  const [Stagename, setStagename] = useState('');
  const [Background, setBackground] = useState('#000000');
  const [Fontcolor, setFontcolor] = useState('#ffffff');
  const [Columwidth, setColumwidth] = useState('');
  const [resdrop, apidropdown] = usePost();
  const [dropdown, setdropdown] = useState();
  let initialValues = {
    "name": "",
    "stage_name": "",
    "background_color": "#000000",
    "font_color": "#ffffff",
    "column_width": 300,
    "order": "",
  }
  const navigate = useNavigate();
  const handleModalStageClose = () => {
    setShowEdit(false)
  }
  const handleSubmit = (values, { resetForm }) => {
    if ((values.name != "") && (values.stage_name != "") && (values.background_color != "") && (values.font_color != "") &&
      (values.Column_Width != "") && (values.order != "")) {
      let formdata = new FormData();
      formdata.append("pipeline_id", id);
      formdata.append("general", "add_pipeline_stage");
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      formdata.append("type", "action");
      apiMethod("postCreateEventsPiplinesStages", formdata);
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
      navigate(`/${config.ddemoss}action/${id}/Kanban`)
    }
  }, [res.data])
  useEffect(() => {
    let formdata = new FormData();
    formdata.append("type_event", "action");
    formdata.append("id", id);
    apidropdown("postKanbanEventsStageOrderNumber", formdata);
  }, []);

  useEffect(() => {
    if (resdrop) {
      setdropdown(resdrop?.data)
    }
  }, [resdrop]);

  useEffect(() => {
    setShowEdit(false)
    axios.defaults.headers = {
      authentication: `${authentication}`,
    };
    axios
      .get(`${config.apiEndPoint}getEditEventsPiplines/${id}`)
      .then((response) => {
        // setPipeLineID(resget.data.piplinesData[0].db_id);
        setPageTitle(response.data[0].pipeline_title);
        // setName(resget.data.get_stages[0].name)
        // setStagename(resget.data.get_stages[0].body)
        // setBackground(resget.data.get_stages[0].bg_color)
        // setFontcolor(resget.data.get_stages[0].font_color)
        // setColumwidth(resget.data.get_stages[0].column_width)
        // setOrdernumber(resget.data.get_stages[0].order_number)
        console.log(response);
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
  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.action_stages?.active_module === "0" || leadPermission?.action_stages?.create === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);



  const submitbutton = {
    class: "btn btn-primary",
    text: "Store Stage",
  };
  const handleView = () => {
    let formdata = new FormData();
    formdata.append("event_type", "action");
    formdata.append("pipeline_id", id);
    apiMethodView("postViewEventsPiplinesStages", formdata);
  }
  const handleDeleteStage = (db_id) => {
    alert("Delete Not working");
    // let formdata = new FormData();
    // formdata.append("general", "remove_pipeline_stages");
    // formdata.append("pipeline_id", item.db_id);
    // formdata.append("stage_id", item.db_id);
    // formdata.append("new_stage", item.db_id);
    // formdata.append("layout", "list");
    // apiMethodView("postDeleteEventspiplinesStages", formdata);
  }
  return (
    <div className="CreateStage my-4">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-12">
            <div className="card">
              <div className="card-header borderblue">
                <div className="card-title">
                  {PageTitle} - {Translation(translations, "Create Stage")}
                </div>
                <div className="card-options">
                  <Link onClick={() => handleView()} className="btn btn-sm btn-primary bsm-1 vstg"><i className="fe fe-eye"></i> View Stages</Link>
                  <Link to={`/${config.ddemoss}/action_pipelines`} className="btn btn-sm btn-primary bsm-1"> Go to Pipelines</Link>
                </div>
              </div>
              <div className="card-body">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form name="myForm">
                    <div className="row">

                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, "Name")}
                          name="name"
                          control="input3"
                          placeholder={Translation(translations, "Label")}
                          required={true}
                        />
                      </div>

                      <div className="col-md-6">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, "Stage Name")}
                          name="stage_name"
                          control="input3"
                          placeholder={Translation(translations, "Stage Name")}
                          required={true}
                        />
                      </div>
                      <div className="col-md-6">
                        <FormControl
                          className="input-color color_input"
                          label={Translation(translations, " Background Color")}
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
                          label={Translation(translations, " Font Color")}
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
                          label={Translation(translations, "Column Width")}
                          name="column_width"
                          control="input5"
                          type="number"
                          placeholder={Translation(translations, "300")}
                          style={{ width: "100%" }}

                        />
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor=""><b>Order number</b></label>
                          <Field as="select" name="order" className="form-control my-1">
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
                      <td className="text-right"> <Link to={`/${config.ddemoss}action_pipelines/${item.pipeline_id}/edit_stage/${item.id}`} className="text-info">
                        <i className="fa-sharp fa-solid fa-pencil"></i>
                      </Link>
                        <Link onClick={() => handleDeleteStage(item?.db_id)} className="text-danger dlt-pstg"> <i className="fa-regular fa-trash-can"></i> </Link>
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

export default CreateStage