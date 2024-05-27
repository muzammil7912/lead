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
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import FormControl from "../../components/form/FormControl";
import Loader from '../../components/common/Loading';
import ReactDOMServer from 'react-dom/server'
import $ from "jquery";
import { MainTranslationContexts } from '../../context/MainTranslationContexts';

function EditStage() {
  const { translations } = useContext(MainTranslationContexts);
  const { id, pipeline_id } = useParams();
  const [resView, apiMethodView] = usePost();
  const [resget, apiMethodGet] = usePost();
  const [resdrop, apidropdown] = usePost();
  const [res, apiMethod] = usePost();
  const [showEdit, setShowEdit] = useState(false);
  const [PageTitle, setPageTitle] = useState('');
  const [dropdown, setdropdown] = useState();
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();
  const [sel, setSel] = useState("")
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
      formdata.append("pipeline_id", pipeline_id);
      formdata.append("stage_id", id);
      formdata.append("type", "action");
      apiMethod("postUpdateEventsPiplinesStages", formdata);
    }
    else {
      toast.warning(`Please fill required fields`);
    }

  }
  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.action_stages?.active_module === "0" || leadPermission?.action_stages?.edit === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);

  useEffect(() => {
    if (res.data) {
      res.data.message &&
        toast.success(res.data.message);
      console.log(pipeline_id)
      navigate(`/${config.ddemoss}action/${pipeline_id}/Kanban`)
    }
  }, [res.data])


  useEffect(() => {
    let formdata = new FormData();
    formdata.append("type_event", "action");
    formdata.append("id", pipeline_id);
    apidropdown("postKanbanEventsStageOrderNumber", formdata);

  }, []);
  useEffect(() => {
    if (resdrop) {
      setdropdown(resdrop?.data)
      console.log(resdrop?.data)
    }
  }, [resdrop]);


  useEffect(() => {
    setShowEdit(false)
    let formdata = new FormData();
    formdata.append("stage_id", id);
    formdata.append("pipeline_id", pipeline_id);
    formdata.append("event_type", "action");
    apiMethodGet("postEditEventsPipelinesStages", formdata);
  }, [id, pipeline_id]);

  useEffect(() => {
    if (resView.data) {
      if (resView?.data?.length) {
        console.log("checking", resView.data)
        setShowEdit(true)
      }
      else {
        swal({
          title: "Deleted!",
          text: "Stage has been deleted.",
          icon: 'success'
        })
      }
    }
  }, [resView.data])
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    if (resget.data && !resget.data.message) {
      setInitialValues(resget.data.stagesDataa[0])
    }
  }, [resget.data])
  if (!resget.data) return <Loader />

  const submitbutton = {
    class: "btn btn-primary",
    text: "Save & Update Pipeline",
  };
  const handleView = () => {
    let formdata = new FormData();
    formdata.append("event_type", "action");
    formdata.append("pipeline_id", pipeline_id);
    apiMethodView("postViewEventsPiplinesStages", formdata);
  }
  function _getStages() {
    return (
      <select id="befRem" onChange={(e) => {
        setSel(e.target.value)
      }}>
        <option>--Select--</option>
        {resView?.data.map((item, index) => {
          return (
            <option className='ppp' key={index} value={item.id}>{item.name}</option>
          )
        })
        }
      </select>
    )
  }
  let valitem;

  const handleDeleteStage = (item) => {
    setShowEdit(false)
    valitem = item.id
    swalre();
  }
  const swalre = () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `You will not be able to recover this stage later! <br> Convert opportunities into ${ReactDOMServer.renderToString(_getStages())} Stage.`;
    swal({
      title: 'Are you sure?',
      content: wrapper,
      icon: 'warning',
      buttons: ['Cancel', 'OK']
    }).then((willDelete) => {
      let st = $('#befRem').find(":selected").val();
      var _i = valitem;
      if (willDelete) {
        if (st == '') {
          swal({
            title: "Please selet stage first! before removing the stage.",
            allowOutsideClick: false,
            closeOnClickOutside: false,
          })
            .then(() => {
              swalre();
            })

        }
        else {
          if (st == _i) {
            swal({
              title: "You are going to delete this stage! please select other stage.",
              allowOutsideClick: false,
              closeOnClickOutside: false,
            })
              .then(() => {
                swalre();
              })
          }
          else {
            let formData = new FormData();
            formData.append("pipeline_id", pipeline_id);
            formData.append("stage_id", id);
            formData.append("type", "action");
            formData.append('new_stage', st)
            formData.append('stage_id', _i)
            formData.append('type', 'action')
            formData.append('general', 'remove_pipeline_stages')
            apiMethodView("postDeleteEventsPiplinesStages", formData);
          }
        }
      }
    })
  }
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
                  <Link onClick={() => handleView()} className="btn btn-sm btn-primary bsm-1 vstg"><i className="fe fe-eye"></i> View Stages</Link>
                  <Link to={`/${config.ddemoss}action_pipelines`} className="btn btn-sm btn-primary bsm-1"> Go to Pipelines</Link>
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
                          {  resget.data?.stagesDataa[0]?.fixed_order_number === "1" ?
                             <Field type="text" name="order"  value={initialValues.order_number} className="form-control my-1" disabled={true} />
              :

              <Field required={true} as="select" value={initialValues.order_number} name="order" className="form-control my-1"
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
                      <td>{item?.name}</td>
                      <td>{item?.body}</td>
                      <td className="text-center">
                        <div className="tidybox" style={{ "backgroundColor": `${item?.bg_color}` }}></div>
                        <div className="tidybox" style={{ "backgroundColor": `${item?.font_color}` }}></div> </td>
                      <td className="text-right">
                        <Link to={`/${config.ddemoss}action_pipelines/${item.pipeline_id}/edit_stage/${item.id}`} className="text-info">
                          <i className="fa-sharp fa-solid fa-pencil"></i>
                        </Link>
                        <span className='margin_gap'>  <i onClick={() => handleDeleteStage(item)} className="fa-regular fa-trash-can pointer"></i></span>
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