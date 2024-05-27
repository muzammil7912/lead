import React, { useContext, useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Translation } from "../../components/Translation";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import { Link } from "react-router-dom";
import usePost from "../../customHooks/usePost";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { getTokenSession } from "../../utils/common";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from '../../customHooks/useFetch';
import config from "../../services/config.json";
import axios from "axios";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";

const FollowupPipelineStageSetting = ({ translation }) => {

    const { pipeline_id } = useParams();
    const [StagesFirst, setStagesFirst] = useState("")
    const [StagesBeforeLast, setStagesBeforeLast] = useState("")
    const [StagesLast, setStagesLast] = useState("")
    const [StagesWon, setStagesWon] = useState("")
    const [StagesLost, setStagesLost] = useState("")
    const [res, apiMethod] = usePost();
    const [listopportunity, setlistopportunity] = useState();
    const { data: stageData, loading, error } = useFetch("", `getAllViewEventsStagesSettings/${pipeline_id}&event_type=follow_up`);
    const authentication = getTokenSession();

    // my work .....................................................................
    const [show, setShow] = useState(false);
    const [show1, setshow1] = useState(false);
    const [res3, apiMethod3] = usePost();
    const [res4, apiMethod4] = usePost();
    const [res5, apiMethod5] = usePost();
    const [edittextdes, setedittextdes] = useState()
    const [reason_statusupdated, setreason_statusupdated] = useState();
    const [reason_id, setreason_id] = useState();
    const [DescriptionNew, setDescriptionNew] = useState();
    const [publishNew, setpublishNew] = useState(1);
    const [oppOptions, setoppOptions] = useState();

    const { addHeading } = useContext(MainHeadingContext);
    useEffect(() => {
        addHeading(`Settings - Pipelines`);
    }, [])

    const { leadPermission } = useContext(MainLeadPermissionContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (leadPermission) {
            if (leadPermission?.follow_up_stages?.active_module === "0" || leadPermission?.follow_up_stages?.view === "0") {
                navigate(`/${config.ddemoss}followup/${pipeline_id}`);
            }
        }
    }, [leadPermission]);

    useEffect(() => {
        axios.defaults.headers = {
            authentication: `${authentication}`,
        };
        axios
            .get(`${config.apiEndPoint}getAllViewEventsStagesSettings/${pipeline_id}&event_type=follow_up`)
            .then((response) => {
                if (!response.data.message) {
                    setlistopportunity(response.data)
                }
            })
            .catch((error) => {
                if (error.response.status === 401)
                    toast.error(error.response.data.message);
                else toast.error("Something went wrong. Please try again later.");
            });
    }, [res4]);

    const handleEdit = (item) => {
        setedittextdes(item.reason_description)
        setreason_statusupdated(item.reason_status)
        setreason_id(item.reason_id)
        setshow1(true)
    }
    const handleDelete = (item) => {
        let formdata = new FormData();
        formdata.append("general", "remvoe_lost_reson");
        formdata.append("reason_id", item.reason_id);
        formdata.append("pipeline_id", pipeline_id);
        formdata.append("type", "follow_up");
        let bodyContent = formdata;
        swal({
            title: "Are you sure, you want to delete?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "OK"],
        }).then((willDelete) => {
            if (willDelete) {
                apiMethod4(`postDeleteEventsStagesSettings`, bodyContent);
            }

        });
    }


    useEffect(() => {
        if (!stageData?.message) {
            console.log(stageData)
            setlistopportunity(stageData)
        }
    }, [stageData]);

    useEffect(() => {
        if (res4?.data?.message) {
            res4.data.message && toast.success(res4?.data?.message);
        }
    }, [res4.data]);

    useEffect(() => {
        let formdata = new FormData();
        formdata.append("pipeline_id", pipeline_id);
        formdata.append("event_type", "follow_up");
        apiMethod5(`postAllEventsStagesPosition`, formdata);
    }, []);
    useEffect(() => {
        if (res?.data?.message) {
            swal({
                text: `${res?.data?.message}`,
            })
        }
    }, [res.data]);

    useEffect(() => {
        if (res5.data) {
            // console.log(res5.data)
            // console.log(res5.data?.lost?.lostId)
            setoppOptions(res5?.data?.Stages_Name)
            setStagesFirst(res5?.data?.top?.topId)
            setStagesBeforeLast(res5?.data?.last_One?.last_oneId)
            setStagesLast(res5?.data?.last?.lastId)
            setStagesWon(res5?.data?.won?.wonId)
            setStagesLost(res5?.data?.lost?.lostId)
        }
    }, [res5.data]);

    function handleClose1() {
        setshow1(false)
    }

    function handleSaveSettings() {
        if (StagesFirst != "" && StagesBeforeLast != "" && StagesLast != "" && StagesWon != "" && StagesLost != "") {
            let formdata = new FormData();
            formdata.append("general", "pipeline_stage_positions");
            formdata.append("pipeline_id", pipeline_id);
            formdata.append("position[top]", StagesFirst);
            formdata.append("position[last_one]", StagesBeforeLast);
            formdata.append("position[last]", StagesLast);
            formdata.append("position_alert[won]", StagesWon);
            formdata.append("position_alert[lost]", StagesLost);
            formdata.append("type", "follow_up");
            let bodyContent = formdata;
            apiMethod("postUpdateEventsStagesPosition", bodyContent);
        } else {
            swal({
                text: "Please Select fields.",
            });

        }

    }
    // function handleSaveSettingsSecond() {
    //     if (StagesWon != "" && StagesLost != "") {
    //         let formdata = new FormData();
    //         formdata.append("general", "pipeline_stage_wonlost");
    //         formdata.append("pipeline_id", pipeline_id);
    //         formdata.append("alerts[won]", StagesWon);
    //         formdata.append("alerts[lost]", StagesLost);
    //         formdata.append("type", "follow_up");
    //         let bodyContent = formdata;
    //         apiMethod("postUpdateEventsStagesConditions", bodyContent);

    //     } else {
    //         swal({
    //             text: "Please Select fields.",
    //         });

    //     }

    // }
    function handleSubmit() {
        if (DescriptionNew && publishNew) {
            let formdata = new FormData();
            formdata.append("reasonDetail", DescriptionNew);
            formdata.append("reasonStatus", publishNew);
            formdata.append("create_lost_reson", "save_lost_reson");
            formdata.append("pipeline_id", pipeline_id);
            formdata.append("type", "follow_up")
            apiMethod4("postCreateEventsStagesSettings", formdata);
            setDescriptionNew("")
            setpublishNew(1)
            setShow(false)
        }
        else {
            swal({
                text: "Please add some reason!",
            });
        }
    }
    function handleSubmit2() {
        if (edittextdes && reason_statusupdated) {
            let formdata = new FormData();
            formdata.append("detail", edittextdes);
            formdata.append("reasonStatus", reason_statusupdated);
            formdata.append("general", "update_lost_reson");
            formdata.append("reason", reason_id);
            formdata.append("pipeline_id", pipeline_id);
            formdata.append("type", "follow_up");
            apiMethod4("postUpdateEventsStagesSettings", formdata);
            setshow1(false)
        } else {
            swal({
                text: "Please add Reason Description.",
            });
        }

    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);



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
    return (
        <>
            <div className="container-fluid">
                <div className="">
                    <div className="tab-content" id="ex1-content">
                        <div className="card-body">
                            <div className="card-body-title">
                                <h4 className="card-title mb-0">Pipeline Settings</h4>
                                <div className="card-options pipeline-settings">
                                    <Link className="btn btn-sm btn-primary bsm-1 box_shadow" to={`/${config.ddemoss}followup_pipelines`} > Go to Pipelines</Link>
                                    <Link to={`/${config.ddemoss}`} className="btn btn-sm btn-primary bsm-1 bsm-icon box_shadow">
                                        <i className="fa-solid fa-house"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
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
                                                                        {/* <span className="float-right">
                                                                            <button
                                                                                onClick={handleShow}
                                                                                className="btn btn-primary btn-sm btn-new"
                                                                                title={Translation(translation, "Add New")}
                                                                            >
                                                                                <i className="fa fa-plus-circle" onClick={() => setShow(true)}></i>
                                                                            </button>
                                                                        </span> */}
                                                                        {(leadPermission?.super_admin || leadPermission?.follow_up_stages?.create === "1") &&
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
                                                                {Array.isArray(listopportunity) ? listopportunity?.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{++index}</td>
                                                                            <td>{Translation(translation, item.reason_description)}</td>
                                                                            <td>{Translation(translation, item.reason_status == 1 ? "active" : "deactive")}</td>
                                                                            <td>
                                                                                {
                                                                                    (leadPermission?.super_admin || leadPermission?.follow_up_stages?.edit === "1")
                                                                                    &&
                                                                                    <Link onClick={() => handleEdit(item)}
                                                                                        className="btn btn-primary btn-sm btn-ed mx-1"
                                                                                        title={Translation(translation, "Edit")}
                                                                                    >
                                                                                        <i className="fa fa-edit"></i>
                                                                                    </Link>
                                                                                }
                                                                                {
                                                                                    (leadPermission?.super_admin || leadPermission?.follow_up_stages?.delete === "1")
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
                                                                }) :
                                                                    <tr >
                                                                        <td></td>
                                                                        <td></td>
                                                                        <td>No Data Yet!</td>
                                                                    </tr>
                                                                }

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
                                                                                {oppOptions && oppOptions.map((item, i) => (
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
                                                                                {oppOptions && oppOptions.map((item, i) => (
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
                                                                                {oppOptions && oppOptions.map((item, i) => (
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
                                                                                {oppOptions && oppOptions.map((item, i) => (
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
                                                                                {oppOptions && oppOptions.map((item, i) => (
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
                            <textarea className="form-control _t-lost textareainput" type="textarea" rows={5} onChange={(e) => setDescriptionNew(e.target.value)} value={DescriptionNew}></textarea>

                        </label>
                        <div className="form-group">
                            <label>Publish Status</label>
                            <select className="form-control _t-status" onChange={(e) => setpublishNew(e.target.value)} value={publishNew}>
                                <option value={1}>Active</option>
                                <option value={0}>Inactive</option>
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
                            <textarea onChange={(e) => setedittextdes(e.target.value)} value={edittextdes} className="form-control _t-lost textareainput" type="textarea" rows={5}></textarea>
                        </label>
                        <div className="form-group">
                            <label>Publish Status</label>
                            <select className="form-control _t-status" onChange={(e) => setreason_statusupdated(e.target.value)} value={reason_statusupdated}>
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

export default FollowupPipelineStageSetting;
