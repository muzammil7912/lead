import React, { useContext, useEffect, useState } from 'react'
import { MainOpportunitiesListContext } from "../../context/MainOpportunitiesListContext";
import { Link } from 'react-router-dom';
import usePost from '../../customHooks/usePost';
import config from "../../services/config.json";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { Translation } from '../../components/Translation';
import FormControl from '../../components/form/FormControl';
import SubmitButton from '../../components/SubmitButton';
import iconData from '../../Data/icon';
import { getTokenSession } from '../../utils/common';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { MainTranslationContexts } from '../../context/MainTranslationContexts';
import { MainHeadingContext } from "../../context/MainHeadingContext";
function Pipelines() {
  const { translations } = useContext(MainTranslationContexts);
  const { addOpportunitiesList, opportunitiesList } = useContext(MainOpportunitiesListContext);
  const [res, apiMethod] = usePost();
  const [subCategory, setSubCategory] = useState()
  const [resView, apiMethodView] = usePost();
  const { addHeading } = useContext(MainHeadingContext);
  useEffect(() => {
    if (resView.data) {
      setSubCategory(resView.data)
    }
  }, [resView.data])
  useEffect(() => {
    addHeading(`Opportunity Pipelines`);
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
  }, []);

  const [resdelete, apiMethoddelete] = usePost();
  const [showEdit, setShowEdit] = useState(false);
  const [stateTitle, setStateTitle] = useState("");
  const [pipelineIcon, setPipelineIcon] = useState(`fa-solid fa-house`)
  const [selectedICon, setSelectedICon] = useState(false)
  const handleDelete = (item) => {
    let valdelate = new FormData();
    valdelate.append("general", "remove_pipeline_parent");
    valdelate.append("gtRs", `${item.db_id}`);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeleteOpportunitypiplines`, valdelate);
        addOpportunitiesList(opportunitiesList.filter((ite) => ite.db_id !== item.db_id));
      }
    });
  }
  useEffect(() => {
    if (resdelete.data && !resdelete.isLoading) {
      resdelete.data.message && toast.success(resdelete.data.message);
    }
  }, [resdelete.data]);
  const initialValues = {
    "pipeline_name": "",
    "pipeline_description": "",
    "pipeline_color": "#000000",


  }
  const handleView = (item) => {
    setStateTitle(item.pipeline_title)
    // console.log( "checking",item)
    let formdata = new FormData();
    formdata.append("general", "view_pipeline_stages");
    formdata.append("gtRs", item.db_id);
    formdata.append("gtRsLbl", item.db_id);
    formdata.append("gtRsLbl", item.db_id);
    formdata.append("layout", "list");
    apiMethodView("postAllViewOpportunityPiplinesStages", formdata);
  }
  useEffect(() => {
    if (resView.data) {
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


  const handleSubmit = (values, { resetForm }) => {
    let formdata = new FormData();
    if (values["pipeline_name"] == "") {
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
      formdata.append("pipeline_icon", pipelineIcon);
      formdata.append("type_create", "cReaTe_piPeliNe");
      apiMethod("postCreateOpportunityPiplines", formdata);
      resetForm();
    }

  }
  useEffect(() => {
    if (res.data && !res.isLoading) {

      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getAllViewOpportunityPiplines`)
        .then((response) => {
          addOpportunitiesList(response.data)

        })

      res.data.message && toast.success(res.data.message);
    }
  }, [res.data]);
  const handeIcon = (item) => {
    setPipelineIcon(item)
    setSelectedICon(false)
  }
  const handleSelectedIcon = () =>{
    if(selectedICon === false){
      setSelectedICon(true)
    }else{
      setSelectedICon(false)
    }
  }
  const submitbutton = {
    class: "btn btn-primary btn-block",
    text: "Save & Create Pipeline",
  };
  const handleModalStageClose = () => {
    setShowEdit(false)
  }
  const handleDeleteStage = (item) => {
    let formdata = new FormData();
    formdata.append("general", "remove_pipeline_stages");
    formdata.append("pipeline_id", item.pipeline_id);
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
  const handleSubmit2 = () => {
  }

  return (
    <div className="container-fluid">
      <div className='pipliness my-4'>
        <div className="row clearfix">
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Pipelines</div>
              </div>
              <table className="table card-table table-vcenter" id='table-pipeline'>
                <thead>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {opportunitiesList?.length ? opportunitiesList.map((item, index) => {
                    return (<tr key={index}>
                      <td className="width45">
                        {<i className={`${item.pipeline_icon}`}></i>}
                      </td>
                      <td>{item?.pipeline_title}
                        {item?.pipeline_desc && <div><small> {item?.pipeline_desc} </small></div>}
                      </td>
                      <td> <div className="tidybox" style={{ "backgroundColor": `${item.pipeline_color}` }}></div> </td>
                      <td className="text-right">
                        <div className='d-flex justify-content-end gap-2'>
                          <Dropdown className="  btCus">
                            <Dropdown.Toggle className="btn btn-default dropdown-toggle"></Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu">
                              <Link className="dropdown-item" to={`/${config.ddemoss}opportunity_pipelines/edit/${item.db_id}`}><i className="fa fa-pencil fa-lg"></i> Edit Pipeline</Link>
                              <Link className="dropdown-item apipeline apipeline1" onClick={() => handleDelete(item)}><i className="fa fa-pencil fa-trash"></i> Delete Pipeline</Link>
                            </Dropdown.Menu>
                          </Dropdown>
                          <OverlayTrigger
                            placement={"top"}
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                View Stages
                              </Tooltip>
                            }
                          >
                            <Link onClick={() => handleView(item)} className="btn btn-default btn-icon vstg"> <i className="fa fa-eye fa-lg"></i> </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement={"top"}
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                Create New Stage
                              </Tooltip>
                            }
                          >
                            <Link to={`/${config.ddemoss}opportunity_pipelines/${item.db_id}/create_stage`} className="btn btn-default btn-icon" data-toggle="tooltip" title="" data-original-title="Create New Stage">
                              <i className="fa fa-plus-square fa-lg"></i>
                            </Link>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement={"top"}
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                Piplines Settings
                              </Tooltip>
                            }
                          >
                            <Link to={`/${config.ddemoss}opportunity_pipelines/${item.db_id}/stage_setting`} className="btn btn-default btn-icon" data-toggle="tooltip" title="" data-original-title="Pipelinse Settings"> <i className="fa fa-cog fa-lg"></i> </Link>

                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>)
                  }) : <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-header borderblue">
                <div className="card-title">
                  Create New Pipeline
                </div>
              </div>
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form name="myForm">
                  <div className="card-body mb-0">
                    <div className="col-md-12 mt-1">
                      <div className="form-group row my-1">
                        <label htmlFor="">{Translation(translations, "Name")}</label>
                        <Field type="text" className="form-control my-1" name="pipeline_name" placeholder={Translation(translations, "Pipeline Name...")} />
                      </div>
                      <FormControl
                        className="form-control my-1"
                        label={Translation(translations, "Description")}
                        name="pipeline_description"
                        control="textarea"
                        placeholder={Translation(translations, "")}
                      />

                      <div className="row">
                        <div className="col">
                          <div className="form-group iconBox" id='iconBox'>
                            <label className="form-label">Icon</label>
                            <div className="dropdown">
                              <button  onClick={handleSelectedIcon} type="button" data-toggle="dropdown" className="btn btn-secondary flex_ align_center flex_space gap-1">
                                <span>
                                  {<i className={`${pipelineIcon}`}></i>}</span>
                              </button>
                              {selectedICon && (
                                <div className={selectedICon ? 'dropdown-menu displayBlock' : 'dropdown-menu'}>
                                  <ul className="list iconmain">
                                    {iconData.map((item, index) => (
                                      <li className="" key={index}>
                                        <Link onClick={() => handeIcon(item.icon)}>
                                          <i className={item.icon}></i>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-9 d-flex align-item-center">
                          <div className="form-group row w-100 mt-4">
                            <Field type="color" className="input-color" name="pipeline_color" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
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

      <Modal show={showEdit} size="lg" onHide={handleModalStageClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Translation(translations, stateTitle)}</Modal.Title>
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
            {Translation(translations, "Close")}
          </Button>
          <Button variant="primary" onClick={handleSubmit2}>
            {Translation(translations, " Save Changes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Pipelines