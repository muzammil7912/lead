import React, { useContext, useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Translation } from "../components/Translation";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link } from "react-router-dom";
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
import { useNavigate } from 'react-router-dom';
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";

const SettingLeadStage = ({ translation }) => {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (leadPermission) {

      if (leadPermission?.lead_stages?.active_module === "0" || leadPermission?.lead_stages?.view === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  const textinput = useRef();
  const status = useRef();
  const [StagesFirst, setStagesFirst] = useState("")
  const [StagesBeforeLast, setStagesBeforeLast] = useState("")
  const [StagesLast, setStagesLast] = useState("")
  const [StagesWon, setStagesWon] = useState("")
  const [StagesLost, setStagesLost] = useState("")
  const [PublishStatus, setPublishStatus] = useState("")
  const [ReasonDescription, setReasonDescription] = useState("")

  const [res, apiMethod] = usePost();
  const [datas, setDatas] = useState("");
  const [datas2, setDatas2] = useState();
  const [options, setoptions] = useState()
  const { data: stages, loading2, error2 } = useFetch('', "getAllLeadStagesPosition");
  const { data: correlationsdb, loading, error } = useFetch({ setDatas }, "getAllLeadStagesSettings");



  const { addHeading } = useContext(MainHeadingContext);
  useEffect(() => {
    addHeading(`Settings - Lead Stages`);
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
  const [DropDownData, setDropDownData] = useState();
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
        apiMethod(`postDeleteLeadStagesSettings`, bodyContent);
        setDatas(datas.filter((ite) => ite.reason_id != item.reason_id));
      }

    });
  }

  function handleClose1() {

    setReasonDescription("")
    setPublishStatus("")
    setshow1(false)
  }
  const [saad, setSaad] = useState([]);

  const handleAPi = () => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllLeadStagesSettings`)
      .then((response) => {
        setDatas(response.data)
      })
      .catch((err) => {
        console.log('eerr', err)
      })
  }

  function handleSaveSettings() {
    if (StagesFirst != "" && StagesBeforeLast != "" && StagesLast != "" && StagesWon != "" && StagesLost != "") {
      let formdata = new FormData();
      formdata.append("stages", "pos");
      formdata.append("module_stage", "lead");
      formdata.append("pipeline_stage", "lead");
      formdata.append("position[top]", StagesFirst);
      formdata.append("position[last_one]", StagesBeforeLast);
      formdata.append("position[last]", StagesLast);
      formdata.append("position_alert[won]", StagesWon);
      formdata.append("position_alert[lost]", StagesLost);
      let bodyContent = formdata;
      apiMethod("postUpdateLeadStagesPosition", bodyContent);
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
    formdata.append("mode", "lead");
    if (textinput.current.value == "") {
      swal({

        text: "Please add some reason!.",
      });
    }
    else {
      let bodyContent = formdata;
      apiMethod("postCreateLeadStagesSettings", bodyContent);
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
    apiMethod("postUpdateLeadStagesSettings", bodyContent);
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
    console.log(datas2);
  }, [datas2]); // Add datas as a dependency


  useEffect(() => {
    if (stages) {
      console.log(stages);
      setDropDownData(stages.Stages_Name)
      setStagesFirst(stages?.top?.topId);
      setStagesBeforeLast(stages?.last_One?.last_oneId);
      setStagesLast(stages?.last?.lastId);
      setStagesWon(stages?.won?.wonId);
      setStagesLost(stages?.lost?.lostId);
      // const options = Object.keys(stages?.Stages_Name).map(key => ({
      //   key,
      //   value: stages.Stages_Name[key]
      // }));
      // setoptions(options);
    }
  }, [stages])

  function handleChangeStagesFirst(event) {
    setStagesFirst(event.target.value);
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
                                    {Translation(translation, "Actions")}
                                    {
                                      (leadPermission?.super_admin == "1" || leadPermission?.lead_stages?.create == "1")
                                      &&
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
                                        {
                                          (leadPermission?.super_admin || leadPermission?.lead_stages?.edit === "1")
                                          &&
                                          <Link onClick={() => handleEdit(item)}
                                            className="btn btn-primary btn-sm btn-ed mx-1"
                                            title={Translation(translation, "Edit")}
                                          >
                                            <i className="fa fa-edit"></i>
                                          </Link>
                                        }

                                        {
                                          (leadPermission?.super_admin || leadPermission?.lead_stages?.delete === "1")
                                          &&
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
                                        {DropDownData && DropDownData.map((item, i) => (
                                          <option key={i} value={item.id}>{item.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Fixed to Before Last</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeStagesBeforeLast} value={StagesBeforeLast}>
                                        <option key={1} value="">-- Select --</option>
                                        {DropDownData && DropDownData.map((item, i) => (
                                          <option key={i} value={item.id}>{item.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Fixed to Last Stage</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeStagesLast} value={StagesLast}>
                                        <option key={1} value="">-- Select --</option>
                                        {DropDownData && DropDownData.map((item, i) => (
                                          <option key={i} value={item.id}>{item.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody></tbody>
                              </table>


                            </div>
                          </div>
                          {
                            (leadPermission?.super_admin == "1" || leadPermission?.lead_stages?.edit == "1")
                            &&
                            <div className="col-md-12 col-sm-12 text-right savebutton"> <button type="button" className="btn btn-info btn-sm ml-2" id="stage_pos" onClick={handleSaveSettings}>Save Settings</button> </div>
                          }

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
                                        {DropDownData && DropDownData.map((item, i) => (
                                          <option key={i} value={item.id}>{item.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Lost / Unquailify</td>
                                    <td className="w200">
                                      <select className="form-control" name="position[top]" onChange={handleChangeStagesLost} value={StagesLost}>
                                        <option key={1} value="">-- Select --</option>
                                        {DropDownData && DropDownData.map((item, i) => (
                                          <option key={i} value={item.id}>{item.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody></tbody>
                              </table>


                            </div>
                          </div>
                          {
                            (leadPermission?.super_admin == "1" || leadPermission?.lead_stages?.edit == "1")
                            &&
                            <div className="col-md-12 col-sm-12 text-right savebutton"> <button type="button" className="btn btn-info btn-sm ml-2" id="stage_pos" onClick={handleSaveSettings}>Save Settings</button> </div>
                          }

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

export default SettingLeadStage;
