import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import usePost from "../customHooks/usePost";
import swal from 'sweetalert';
import { Row, Col, Modal } from 'react-bootstrap';
import { FaSave } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { Select } from 'antd';
import { handleFullScreen } from "../components/AllCustomFuntion";

function Card({ item, inputClassName, selectClassName, setRiskData, setRiskId }) {
    const [titelinput, setTitelinput] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const { permissions } = useContext(MainAuthPermissionsContext);
    const { id } = useParams()
    const [resCreate, apiMethodCreate] = usePost();
    const [resDel, apiMethodDelete] = usePost();
    const [resUpdate, apiMethodUpdate] = usePost();
    const [showModal, setShowModal] = useState(false);
    const [createInput, setCreateInput] = useState('')
    const [createOption, setCreateOption] = useState()
    const [ItmeId, setItmeId] = useState();
    useEffect(() => {
        setRiskId(item.pipline_id)
        if (resCreate.data) {
            setRiskData(resCreate.data)
            setCreateInput("")
            setCreateOption("")
        }
    }, [resCreate])
    useEffect(() => {
        if (resDel) {
            setRiskData(resDel.data)
        }
    }, [resDel])
    useEffect(() => {
        if (resUpdate) {
            setRiskData(resUpdate.data)
            handleCloseModal()
            setSelectedOption("")
            setTitelinput("")
        }
    }, [resUpdate])
    const handleToggle = (e) => {
        e.preventDefault();
        let closestCard = e.target.closest(".card");
        if (closestCard.classList.contains("card-collapsed")) {
            closestCard.classList.remove("card-collapsed");
        } else {
            closestCard.classList.add("card-collapsed");
        }
    };
    const handleCreate = () => {
        let form = new FormData()
        if (createOption && createInput) {
            form.append('ids', `${item.pipline_id}:${id}`)
            form.append('meeting_id', id)
            form.append('item_user', permissions?.id)
            form.append('title', createInput)
            form.append('status', createOption)
            form.append('uMeet33', 'typefollowOtherAd')
            form.append('typefollowOtherAd', 'typefollowOtherAd')
            apiMethodCreate('postcreateRisksIssues', form)
        } else {
            swal({
                text: 'Please select Medium & Fill Title',
                icon: "warning",
                dangerMode: true,
                timer: 1000
            })
        }
    };

    const handleOptionChange1 = (selectedOption) => {
        setCreateOption(selectedOption);
    };
    const handleOptionChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    const options = [
        {
            "value": "Low",
            "label": 'Low'
        },
        {
            "value": "Medium",
            "label": 'Medium'
        },
        {
            "value": "High",
            "label": 'High'
        },
    ];
    const handleDellete = (db_id) => {
        swal({
            text: 'Are you sure want to delete?',
            icon: "warning",
            buttons: ["Close", true],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let form = new FormData()
                form.append('ids', `${db_id}:${item.pipline_id}:${id}`)
                form.append('meeting_id', id)
                form.append('user_id', permissions?.id)
                form.append('uMeet34', 'typefollowOtheriRem')
                form.append('typefollowOtheriRem', 'typefollowOtheriRem')
                apiMethodDelete('postDeletedRisksIssues', form)
            }
        })
    }
    const handleInputChange = (event) => {
        setTitelinput(event.target.value);
    }
    function geteditvalues() {
        if (titelinput != "" && selectedOption != "") {
            let updatedata = new FormData()
            updatedata.append("meeting_id", id);
            updatedata.append("followup_id", item.pipline_id);
            updatedata.append("db_id", ItmeId);
            updatedata.append("tittle", titelinput);
            updatedata.append("piorty", selectedOption);
            updatedata.append("uMeet33", 'typefollowOtherUpdatekn');
            updatedata.append("typefollowOtherUpdatekn", 'typefollowOtherUpdatekn');
            apiMethodUpdate("postUpdateRisksIssues", updatedata);
            swal({
                position: "center",
                icon: "success",
                title: "Edit Successful",
                showConfirmButton: false,
                timer: 1200
            })
        } else {
            swal({
                position: "center",
                icon: "error",
                title: "Fields are empty!",
                showConfirmButton: false
            });
        }
    }
    const handleCloseModal = () => setShowModal(false);
    return (
        <div className="card">
            <div className="card-status bg-blue"></div>
            <div className="card-header">
                <h3 className="card-title">
                    <i className={item.pipeline_icon}></i> {item.pipeline_title}
                    <small>Follow Ups</small>
                </h3>
                <div className="card-options">
                    <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
                        <i className="fe fe-chevron-down"></i>
                    </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i className="fe fe-maximize"></i></a>
                </div>
            </div>
            <div className="card-body">
                <div className="row clearfix agenda1append">
                    <div className={`${inputClassName}`}>
                        <div className="form-group">
                            <input
                                onChange={(e) => setCreateInput(e.target.value)}
                                type="text"
                                className="form-control agenda1appendinputtxt"
                                name="example-text-input"
                                placeholder="What do you need to mitigate?"
                                value={createInput}
                            />
                        </div>
                    </div>
                    <div className={`${selectClassName}`} >
                        <div className="form-group">

                            <Select
                                placeholder='Select'
                                style={{
                                    width: "100%",
                                }}
                                value={createOption}
                                onChange={handleOptionChange1}
                                options={options}
                            />
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-2">
                        <button
                            type="button"
                            className="btn btn-icon btn-primary btn-success agenda1appendbtnadd"
                            onClick={handleCreate}
                        >
                            <i className="fe fe-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="agenda4appendBox" id="agenda4appendBox6">
                    <table className="card-table table mb-1 table-hover mt-tab">
                        <tbody>
                            {item.not_voted_followup_items && Array.isArray(item.not_voted_followup_items) && item.not_voted_followup_items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.item_title}</td>
                                        <td className="text-right">{item.item_status}</td>
                                        <td className="text-right w100">
                                            <small>
                                                <i onClick={() => {
                                                    setShowModal(true);
                                                    setTitelinput(item.item_title);
                                                    setSelectedOption(item.item_status);
                                                    setItmeId(item?.db_id)
                                                }} className="fa-solid fa-pencil text-secondary flnvedt nxs"></i>
                                                &nbsp;
                                                &nbsp;   <i onClick={() => handleDellete(item.db_id)} className="fa-solid fa-trash text-danger flnvrem nxs"></i>
                                            </small>
                                        </td>
                                    </tr>

                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={12} lg={6}>
                            <label className="modal-labels">
                                <label>Title</label>
                                <input
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control agenda1appendinputmin"
                                    name="example-text-input"
                                    defaultValue={titelinput}
                                />
                                <br />
                                <label>Select</label>
                                <Select
                                    placeholder='Select'
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={handleOptionChange}
                                    options={options}
                                    defaultValue={selectedOption}
                                />
                            </label>{" "}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={geteditvalues} variant="primary">
                        {" "}
                        <FaSave style={{ fontSize: 16 }} /> Save & Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >

    );
}

export default Card;