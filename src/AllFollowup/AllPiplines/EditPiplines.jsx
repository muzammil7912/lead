import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import { MainFollowupListContext } from "../../context/MainFollowupListContext";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from '../../components/common/Loading';
import iconData from '../../Data/icon';
import FormControl from '../../components/form/FormControl';
import usePost from '../../customHooks/usePost';
import { Translation } from '../../components/Translation';
import config from "../../services/config.json";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import useFetch from '../../customHooks/useFetch';
import SubmitButton from '../../components/SubmitButton';
import axios from 'axios';
import { getTokenSession } from '../../utils/common';

function EditPiplines({ translation }) {
  const { addFollowupList } = useContext(MainFollowupListContext);
  const { addHeading } = useContext(MainHeadingContext);
  const [res, apiMethod] = usePost();
  const [datas, setDatas] = useState("");
  const navigate = useNavigate();
  const [pipelineIcon, setPipelineIcon] = useState("")
  const { id } = useParams();
  const { data: EditPipelines, loading, error } = useFetch({ setDatas }, `getEditEventsPipelines/${id}&event_type=follow_up`);
  const [isChecked, setIsChecked] = useState(false);
  const [vote, setVote] = useState(0);
  const [selectedICon, setSelectedICon] = useState(false)

  useEffect(() => {
    if (EditPipelines) {
      addHeading(`Pipelines`);
      setPipelineIcon(EditPipelines[0].pipeline_icon)
    }
  }, [EditPipelines]);
  useEffect(() => {
    if (res.data && !res.isLoading) {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .post(`${config.apiEndPoint}postAllViewEventsPiplines`, {
          event_type: 'follow_up',
        })
        .then((response) => {
          addFollowupList(response.data)

        })
      res.data.message && toast.success(res.data.message);
      navigate(`/${config.ddemoss}followup_pipelines`);
    }
  }, [res.data]);

  const handeIcon = (item) => {
    setPipelineIcon(item)
    setSelectedICon(false)
  }
  const handleSelectedIcon = () => {
    if (selectedICon === false) {
      setSelectedICon(true)
    } else {
      setSelectedICon(false)
    }
  }
  if (loading) return <Loader />;
  let v = {
    "pipeline_description": EditPipelines[0].pipeline_desc,
    "pipeline_name": EditPipelines[0].pipeline_title,
    "pipeline_color": EditPipelines[0].pipeline_color,
  }
  let initialValues = v;

  const handleSubmit = (values) => {
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
      console.log(values)
      formdata.append("pipeline_name", values.pipeline_name);
      formdata.append("pipeline_description", values.pipeline_description);
      formdata.append("pipeline_icon", pipelineIcon);
      formdata.append("pipeline_color", values.pipeline_color);
      formdata.append("pipeline_id", id);
      formdata.append("can_be_voted", vote);
      formdata.append("type_create", "sAveUpde_eVenTpiPeliNe");
      formdata.append("type", "follow_up");
      apiMethod("postUpdateEventsPiplines", formdata);
    }

  }

  const submitbutton = {
    class: "btn btn-primary btn-block",
    text: "Save & Update Pipeline",
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!isChecked == true) {
      setVote(1)
    } else {
      setVote(0)
    }
  };

  return (
    <div className="container-fluid">
      <div className="row clearfix my-4">
        <div className="col-4 offset-sm-4">
          <div className="card">
            <div className="card-header borderblue">
              <div className="card-title">Edit Pipeline</div>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form name="myForm">
                <div className="card-body mb-0">
                  <div className="col-md-12 mt-1">
                    <div className="form-group row my-1">
                      <label htmlFor="">{Translation(translation, "Name")}</label>
                      <Field type="text" className="form-control my-1" name="pipeline_name" placeholder={Translation(translation, "Pipeline Name...")} />
                    </div>
                    <FormControl
                      className="form-control my-1"
                      label={Translation(translation, "Description")}
                      name="pipeline_description"
                      control="textarea"
                      placeholder={Translation(translation, "")}
                    />

                    <div className="row">
                      <div className="col">
                        <div className="form-group iconBox" id='iconBox'>
                          <label className="form-label">Icon</label>
                          <div className="dropdown">
                            <button onClick={handleSelectedIcon} type="button" data-toggle="dropdown" className="btn btn-secondary flex_ align_center flex_space gap-1">
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
                    <div className="form-group mb-0 mt-2">
                      <label className="custom-control custom-checkbox">
                        <input checked={isChecked}
                          onChange={handleCheckboxChange} type="checkbox" className="custom-control-input" name="can_be_voted" />
                        <span className="custom-control-label">Can be Voted<br /></span>
                      </label>
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
          <p className="text-center my-4"><Link to={`/${config.ddemoss}followup_pipelines`}> Go to Pipelines</Link></p>
        </div>
      </div>
    </div>
  )
}

export default EditPiplines