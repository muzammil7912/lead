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
import FormControl from "../../components/form/FormControl";


function CreateStage({ translation }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isComponentMounted = useRef(true);
  const [resView, apiMethodView] = usePost();
  const [resget, apiMethodGet] = usePost();
  const [DropRes, DropFetct] = usePost();
  const authentication = getTokenSession();
  const [res, apiMethod] = usePost();
  const [Name, setName] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [PageTitle, setPageTitle] = useState('');
  const [Ordernumber, setOrdernumber] = useState('');
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const [HandleData, setHandleData] = useState({
    name: "",
    Stage_Name: "",
    Backgroun_Color: "#000000",
    Font_Color: "#ffffff",
    Column_Width: 300,
    Order_number: ""
  });

  const handleModalStageClose = () => {
    setShowEdit(false)
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   let formdata = new FormData();
  //   if ((Name != "") && (Stagename != "") && (Background != "") && (Fontcolor != "") && (Columwidth != "") && (OrdernumberVal != "")) {
  //     formdata.append("general", "add_pipeline_stage");
  //     formdata.append("name", Name);
  //     formdata.append("stage_name", Stagename);
  //     formdata.append("background_color", Background);
  //     formdata.append("font_color", Fontcolor);
  //     formdata.append("column_width", Columwidth);
  //     formdata.append("order", Ordernumber);
  //     formdata.append("pipeline_id", id);
  //     formdata.append("type", "meeting");
  //     apiMethod("postCreateEventsPiplinesStages", formdata);
  //     toast.success("Add stage successfully");
  //     // window.location.href = `/${config.ddemoss}/meeting_pipelines`;
  //     setName('');
  //     setStagename('');
  //     setBackground('#000000');
  //     setFontcolor("#ffffff");
  //     setColumwidth('');
  //     setOrdernumberVal('');
  //   }
  //   else {
  //     swal({
  //       title: "Required Fields are empty! Please fill and try again",
  //       icon: "warning",
  //       dangerMode: true,
  //     })
  //   }
  // }
  const handleSubmit = (values, actions) => {
    let formdata = new FormData();
    if ((values.name != "") && (values.Stage_Name != "") && (values.Backgroun_Color != "") && (values.Font_Color != "") &&
      (values.Column_Width != "") && (values.Order_number != "")) {
      formdata.append("general", "add_pipeline_stage");
      formdata.append("name", values.name);
      formdata.append("stage_name", values.Stage_Name);
      formdata.append("background_color", values.Backgroun_Color);
      formdata.append("font_color", values.Font_Color);
      formdata.append("column_width", values.Column_Width);
      formdata.append("order", values.Order_number);
      formdata.append("pipeline_id", id);
      formdata.append("type", "meeting");
      formdata.append("basename", "create_leadstage");
      apiMethod("postCreateEventsPiplinesStages", formdata);
      actions.resetForm({ values: HandleData });
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
    if (leadPermission) {
      if (leadPermission?.meeting_stages?.active_module === "0" || leadPermission?.meeting_stages?.create === "0") {
        navigate(`/${config.ddemoss}meeting/${id}`);
      }
    }
  }, [leadPermission]);
  useEffect(() => {
    setShowEdit(false)
    axios.defaults.headers = {
      authentication: `${authentication}`,
    };
    axios
      .get(`${config.apiEndPoint}getEditEventsPiplines/${id}`)
      .then((response) => {
        // setPipeLineID(resget.data.piplinesData[0].db_id);
        setPageTitle(response?.data[0]?.pipeline_title);
        // setName(resget.data.get_stages[0].name)
        // setStagename(resget.data.get_stages[0].body)
        // setBackground(resget.data.get_stages[0].bg_color)
        // setFontcolor(resget.data.get_stages[0].font_color)
        // setColumwidth(resget.data.get_stages[0].column_width)
        // setOrdernumber(resget.data.get_stages[0].order_number)
      })
      .catch((error) => {
        if (error?.response?.status === 401)
          toast.error(error?.response?.data?.message);
        else toast.error("Something went wrong. Please try again later.");
      });
  }, [id]);

  useEffect(() => {
    let formdata = new FormData();
    formdata.append("id", id);
    formdata.append("type_event", "meeting");
    DropFetct("postKanbanEventsStageOrderNumber", formdata);
  }, []);

  useEffect(() => {
    if (!DropRes?.message) {
      setOrdernumber(DropRes?.data)
    }
  }, [DropRes])

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
    if (res.data) {
      // console.log(res.data)
      res.data.message && toast.success(res.data.message);
      navigate(`/${config.ddemoss}meeting/${id}/Kanban`)
    }

  }, [res.data]);

  const submitbutton = {
    class: "btn btn-primary",
    text: "Save & Update Pipeline",
  };
  const handleView = () => {
    let formdata = new FormData();
    formdata.append("event_type", "meeting");
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
                  {PageTitle} - {Translation(translation, "Create Stage")}
                </div>
                <div className="card-options">
                  <Link onClick={() => handleView()} className="btn btn-sm btn-primary bsm-1 vstg"><i className="fe fe-eye"></i> View Stages</Link>
                  <Link to={`/${config.ddemoss}meeting_pipelines`} className="btn btn-sm btn-primary bsm-1"> Go to Pipelines</Link>
                </div>
              </div>
              <div className="card-body">
                <Formik initialValues={HandleData} onSubmit={handleSubmit}>
                  <Form name="myForm">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translation, "Name")}
                            name="name"
                            control="input3"
                            placeholder={Translation(translation, "Label")}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translation, "Stage Name")}

                            name="Stage_Name"
                            control="input3"
                            placeholder={Translation(translation, "Stage Name")}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="input-color color_input"
                            label={Translation(translation, "Background Color")}
                            name="Backgroun_Color"
                            control="input3" type="color"
                            required={true}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="input-color color_input"
                            label={Translation(translation, " Font Color")}
                            name="Font_Color"
                            control="input3" type="color"
                            required={true}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translation, "Column Width")}
                            name="Column_Width"
                            defaultValue="300"
                            control="input5" type="number"
                            placeholder={Translation(translation, "")}
                            style={{ width: "100%" }}

                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Order number</label>
                          <Field as="select" name="Order_number" className="form-control my-1">
                            <option hidden>select</option>
                            {Ordernumber && Object.keys(Ordernumber).map((key) => (
                              <option key={key} value={Ordernumber[key]}>
                                {Ordernumber[key]}
                              </option>
                            ))}
                          </Field>
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
                {!resView?.data?.message ? resView?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.body}</td>
                      <td>{item?.body}</td>
                      <td className="text-center">
                        <div className="tidybox" style={{ "backgroundColor": `${item?.bg_color}` }}></div>
                        <div className="tidybox" style={{ "backgroundColor": `${item?.font_color}` }}></div> </td>
                      <td className="text-right"> <Link to={`/${config.ddemoss}meeting_pipelines/${item.pipeline_id}/edit_stage/${item.id}`} className="text-info">
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
            {Translation(translation, "Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
}

export default CreateStage