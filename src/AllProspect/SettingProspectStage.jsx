import React, { useContext, useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Translation } from "../components/Translation";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link,useNavigate } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/common/Loading";
import usePost from "../customHooks/usePost";
import config from "../services/config.json";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { getTokenSession } from "../utils/common";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";


const SettingProspectStage = ({ translation }) => {
  const textinput = useRef();
  const status = useRef();
  const [StagesFirst, setStagesFirst] = useState("")
  const [StagesBeforeLast, setStagesBeforeLast] = useState("")
  const [StagesLast, setStagesLast] = useState("")
  const [StagesWon, setStagesWon] = useState("")
  const [StagesLost, setStagesLost] = useState("")
  const [LeadStage, setLeadStage] = useState("")
  const [PublishStatus, setPublishStatus] = useState("")
  const [ReasonDescription, setReasonDescription] = useState("")
  const { addPermission, leadPermission } = useContext(MainLeadPermissionContext);

  const [res, apiMethod] = usePost();
  const [resreadonly, apiMethodreadonly] = usePost();
  const [datas, setDatas] = useState("");
  const [datas2, setDatas2] = useState();
  const [options, setoptions] = useState()
  const [optionslead, setoptionslead] = useState()
  const { data: stages, loading2, error2 } = useFetch('', "getAllProspectStagesPosition");
  const { data: correlationsdb, loading, error } = useFetch({ setDatas }, "getAllProspectStagesSettings");



  const { addHeading } = useContext(MainHeadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    addHeading(`Settings - Prospect Stages`);
  }, [])

  const [show, setShow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [items, setitems] = useState("")
  const [showEdit, setShowEdit] = useState(false);
  const [inputval, setInputval] = useState("");
  const [inputval2, setInputval2] = useState("");

  const [selectval2, setSelectval2] = useState("");
  const [edittext, setedittext] = useState()
  const [selectval, setselectval] = useState(1)
  const [id, setid] = useState()
  const handleEdit = (item) => {
    setedittext(item.reason_description)
    setselectval(item.reason_status)
    setid(item.reason_id)

    console.log(item);
    setReasonDescription(item.reason_description)
    setPublishStatus(item.reason_status)
    setshow1(true)
  }
  const handleDelete = (item) => {
    let formdata = new FormData();
    formdata.append("lostreason", "remove");
    formdata.append("reasonStatus", item.reason_id);

    let bodyContent = formdata;

    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethod(`postDeleteProspectStagesSettings`, bodyContent);
        setDatas(datas.filter((ite) => ite.reason_id != item.reason_id));
      }
    });
  }

  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.leads?.active_module === "0" || leadPermission?.prospect_stages?.view === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);

  function handleClose1() {
    setReasonDescription("")
    setPublishStatus("")
    setshow1(false)
  }

  const handleAPi = () => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllProspectStagesSettings`)
      .then((response) => {
        setDatas(response.data);
      })
      .catch((err) => {
        console.log('eerr', err)
      })
  }

  function handleSaveSettings() {
    if (StagesFirst != "" && StagesBeforeLast != "" && StagesLast != "" && StagesWon != "" && StagesLost != ""
      && LeadStage != "") {
      let formdata = new FormData();
      formdata.append("stages", "pos");
      formdata.append("module_stage", "prospect");
      formdata.append("pipeline_stage", "prospect");
      formdata.append("position[top]", StagesFirst);
      formdata.append("position[last_one]", StagesBeforeLast);
      formdata.append("position[last]", StagesLast);
      formdata.append("position_alert[won]", StagesWon);
      formdata.append("position_alert[lost]", StagesLost);
      let bodyContent = formdata;
      apiMethod("postUpdateLeadStagesPosition", bodyContent);

      let formdata2 = new FormData();
      formdata2.append("stages", "stread");
      formdata2.append("readonly", LeadStage);
      let bodyContent2 = formdata2;
      apiMethodreadonly("postUpdateProspectSaveReadonly", bodyContent2);
    } else {
      swal({
        text: "Please Select fields.",
      });
    }
  }
  function handleSubmit() {
    let formdata = new FormData();
    formdata.append("lostreason", "lost");
    formdata.append("reasonDetail", textinput.current.value);
    formdata.append("reasonStatus", status.current.value);
    formdata.append("mode", "prospect");
    if (textinput.current.value == "") {
      swal({

        text: "Please add some reason!.",
      });
    }
    else {
      let bodyContent = formdata;
      apiMethod("postCreateProspectStagesSettings", bodyContent);
      handleAPi()
    }
  }
  function handleSubmit2() {
    let formdata = new FormData();
    formdata.append("lostreason", "update");
    formdata.append("detail", textinput.current.value);
    formdata.append("reasonStatus", status.current.value);
    formdata.append("reason", id)
    let bodyContent = formdata;
    apiMethod("postUpdateProspectStagesSettings", bodyContent);
    handleAPi()
    setReasonDescription("");
    setPublishStatus("");
    setshow1(false)
  }

  const handleClose = () => {
    setInputval('');
    setInputval2('');
    setReasonDescription("");
    setPublishStatus("");
    setShow(false);
    setShowEdit(false)
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (res.data && !res.isLoading) {
      res.data.message && toast.success(res.data.message);
      setInputval('');
      setInputval2('');
      setReasonDescription("")
      setPublishStatus("")
      setShow(false);
      setShowEdit(false);
      handleAPi(); // or axios call to get the updated data
    }
  }, [res.data]);

  useEffect(() => {
    if (stages) {
      // console.log(stages);
      setStagesFirst(stages.top.topId);
      setStagesBeforeLast(stages.last_One.last_oneId);
      setStagesLast(stages.last.lastId);
      setStagesWon(stages.won.wonId);
      setStagesLost(stages.lost.lostId);
      setLeadStage(stages.leadStages[0].id);

      const options = stages.Stages_Name.map(stage => ({
        key: stage.id,
        value: stage.name
      }));
      setoptions(options);

      const optionslead = stages.lead_Stages.map(stage => ({
        key: stage.id,
        value: stage.name
      }));
      setoptionslead(optionslead);
    }
  }, [stages])

  function handleChangeStagesFirst(event) {
    setStagesFirst(event.target.value);
    console.log(StagesFirst)
  }
  function handleChangeStagesBeforeLast(event) {
    setStagesBeforeLast(event.target.value);
  }
  function handleChangeStagesLast(event) {
    setStagesLast(event.target.value);
  }
  function handleChangeStagesWon(event) {
    setStagesWon(event.target.value);
  }
  function handleChangeLeadStage(event) {
    setLeadStage(event.target.value);
  }
  function handleChangeStagesLost(event) {
    setStagesLost(event.target.value);
  }
  function handleChangePublishStatus(event) {
    setPublishStatus(event.target.value);
  }
  function handleChangeReasonDescription(event) {
    setReasonDescription(event.target.value);
  }

  if (loading) return <Loader />
  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div className="tab-content" id="ex1-content">
            <div
              className="tab-pane fade show active"
              id="link_1"
              role="tabpanel"
              aria-labelledby="link_1"
            >
              <Tabs
                defaultActiveKey="Lost Stage Reasons"
                id="uncontrolled-tab-example"
                className="mb-3 p1"
              >
                <Tab className="p1" eventKey="Lost Stage Reasons" title="Lost Stage Reasons">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="card mt-3">
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-hover table-striped table-vcenter mb-0 text-nowrap">
                              <thead>
                                <tr>
                                  <th>&nbsp;</th>
                                  <th>{Translation(translation, "Title")}</th>
                                  <th>{Translation(translation, "Status")}</th>
                                  <th>
                                    Actions
                                    {(leadPermission?.super_admin || leadPermission?.prospect_stages?.create === "1") &&
                                      <span className="float-right">
                                        <button
                                          onClick={handleShow}
                                          className="btn btn-primary btn-sm btn-new"
                                          title={Translation(translation, "Add New")}
                                        >
                                          <i className="fa fa-plus-circle"></i>
                                        </button>
                                      </span>
                                    }
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {!datas.message && datas?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{++index}</td>
                                      <td>{Translation(translation, item.reason_description)}</td>
                                      <td>{Translation(translation, item.reason_status == 1 ? "active" : "deactive")}</td>
                                      <td>
                                        {(leadPermission?.super_admin || leadPermission?.prospect_stages?.edit === "1") &&
                                          <Link onClick={() => handleEdit(item)}
                                            className="btn btn-primary btn-sm btn-ed mx-1"
                                            title={Translation(translation, "Edit")}
                                          >
                                            <i className="fa fa-edit"></i>
                                          </Link>
                                        }
                                        {(leadPermission?.super_admin || leadPermission?.prospect_stages?.delete === "1") &&
                                          <Link onClick={() => handleDelete(item)}
                                            className="btn btn-danger btn-sm btn-dl mx-1"
                                            title={Translation(translation, "Delete")}
                                          >
                                            <i className="fa fa-trash-o"></i>
                                          </Link>
                                        }
                                      </td>
                                    </tr>
                                  )
                                })}

                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  className="p1"
                  eventKey="Stage Positions"
                  title="Stage Positions"
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="mt-2">

                        <div className="card-body">
                          <div className="stage_pos">
                            <div className="table-responsive">
                              <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap stg">
                                <thead>
                                  <tr>
                                    <th>Positions</th>
                                    <th>Stages</th>
                                  </tr>
                                  <tr>
                                    <td>Fixed to 1st Place</td>
                                    <td className="w200">
                                      <select className="form-control" onChange={handleChangeStagesFirst} value={StagesFirst} >
                                        <option key={1} value="">-- Select --</option>
                                        {options && options.map((item, i) => (
                                          <option key={i} value={item.key}>{item.value}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Fixed to Before Last</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeStagesBeforeLast} value={StagesBeforeLast}>
                                        <option key={1} value="">-- Select --</option>
                                        {options && options.map((item, i) => (
                                          <option key={i} value={item.key}>{item.value}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Fixed to Last Stage</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeStagesLast} value={StagesLast}>
                                        <option key={1} value="">-- Select --</option>
                                        {options && options.map((item, i) => (
                                          <option key={i} value={item.key}>{item.value}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody></tbody>
                              </table>


                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 text-right savebutton"> <button type="button" className="btn btn-info btn-sm ml-2" id="stage_pos" onClick={handleSaveSettings}>Save Settings</button> </div>
                        </div>
                      </div>


                    </div>

                  </div>
                </Tab>
                <Tab className="p1" eventKey="Lost/Qualify Stages" title="Lost/Qualify Stages">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="mt-2">

                        <div className="card-body">
                          <div className="stage_pos">
                            <div className="table-responsive">
                              <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap stg">
                                <thead>
                                  <tr>
                                    <th>Positions</th>
                                    <th>Stages</th>
                                  </tr>
                                  <tr>
                                    <td>Won / Qualify</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeStagesWon} value={StagesWon}>
                                        <option key={1} value="">-- Select --</option>
                                        {options && options.map((item, i) => (
                                          <option key={i} value={item.key}>{item.value}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Lost / Unquailify</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeStagesLost} value={StagesLost}>
                                        <option key={1} value="">-- Select --</option>
                                        {options && options.map((item, i) => (
                                          <option key={i} value={item.key}>{item.value}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody></tbody>
                              </table>


                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 text-right savebutton"> <button type="button" className="btn btn-info btn-sm ml-2" id="stage_pos" onClick={handleSaveSettings}>Save Settings</button> </div>
                        </div>
                      </div>


                    </div>

                  </div>
                </Tab>
                <Tab className="p1" eventKey="Create Prospect - Lead Stage" title="Create Prospect - Lead Stage">
                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="mt-2">

                        <div className="card-body">
                          <div className="stage_pos">
                            <div className="table-responsive">
                              <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap stg">
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th>Stages</th>
                                  </tr>
                                  <tr>
                                    <td>Lead Stage at Create Prospect	</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeLeadStage} value={LeadStage}>
                                        <option key={1} value="">-- Select --</option>
                                        {optionslead && optionslead.map((item, i) => (
                                          <option key={i} value={item.key}>{item.value}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody></tbody>
                              </table>
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12 text-right savebutton"> <button type="button" className="btn btn-info btn-sm ml-2" id="stage_pos" onClick={handleSaveSettings}>Save Settings</button> </div>
                        </div>
                      </div>


                    </div>

                  </div>
                </Tab>
              </Tabs>

            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <div className="modal-content sv">
            <div className="modal-header">
              <h6 className="title" id="lostLabel">Reason for Lost Stage</h6>
              <button type="button" onClick={handleClose} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <label>Reason Description
              <textarea ref={textinput} className="form-control _t-lost textareainput" type="textarea" rows={5} onChange={handleChangeReasonDescription} value={ReasonDescription}></textarea>

            </label>
            <div className="form-group">
              <label>Publish Status</label>
              <select ref={status} className="form-control _t-status" onChange={handleChangePublishStatus} value={PublishStatus}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={handleSubmit} className="btn btn-primary btn-lost"> <i className="fa fa-save"></i> Save</button>
          </div>
        </Modal>
        <Modal show={show1} onHide={handleClose1}>

          <div className="modal-content sv">
            <div className="modal-header">
              <h6 className="title" id="lostLabel">Reason for Lost Stage</h6>
              <button type="button" onClick={handleClose1} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <label>Reason Description
              <textarea ref={textinput} onChange={handleChangeReasonDescription} value={ReasonDescription} className="form-control _t-lost textareainput" type="textarea" rows={5}  ></textarea>

            </label>
            <div className="form-group">
              <label>Publish Status</label>
              <select ref={status} className="form-control _t-status" onChange={handleChangePublishStatus} value={PublishStatus}>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={handleSubmit2} className="btn btn-primary btn-lost"> <i className="fa fa-save"></i> Save</button>
          </div>
        </Modal>
      </div>

    </>
  );
};

export default SettingProspectStage;
