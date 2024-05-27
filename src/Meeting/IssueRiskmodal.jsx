import { useState, useEffect, useContext } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import { Select, Input } from "antd";
import useFetch from "../customHooks/useFetch";
import Button from "react-bootstrap/Button";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from "../components/Translation";
import { FaSave } from "react-icons/fa";
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';

const RiskModal = (item) => {
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
    const [titelinput, setTitelinput] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rescreate, apiMethodcreate] = usePost();
    const { translations } = useContext(MainTranslationContexts)
    useEffect(() => {
        item.setStates(rescreate.data)
    }, [rescreate.data])

    const handleCloseModal = () => setShowModal(false);
    const handleShowEditModal = () => {
        setShowModal(true)
        console.log('ssssssssssssss', item.item.item_title)
        setTitelinput(item.item.item_title)
        // setTime(item.item.item_timer)
    };
    function geteditvalues() {
        if (titelinput === '') {
            swal({
                position: "center",
                icon: "error",
                title: "Fields are empty!",
                showConfirmButton: false
            });
        } else {
            let updatedata = new FormData()
            updatedata.append("item_id", item.item.db_id);
            updatedata.append("meeting_id", item.item.meeting_id);
            updatedata.append("item_user", item.item.item_user);
            updatedata.append("item_title", titelinput);
            updatedata.append("uMeet29", 'typeAgendaItemTitle');
            updatedata.append("typeAgendaItemTitle", 'typeAgendaItemTitle');
            apiMethodcreate("postUpdateTitleAgenda", updatedata);
            swal({
                position: "center",
                icon: "success",
                title: "Edit Successful",
                showConfirmButton: false
            })
        }
    }
    const handleInputChange = (event) => {
        setTitelinput(event.target.value);
    }

    const handleOptionChange = (selectedOption) => {
        setSelectedOption(selectedOption);

    };

    return (
        <>
            <button
                type="button"
                className="icon medit border-0  bg-none "
                onClick={handleShowEditModal}>
                <i className="fa-solid fa-pen"></i>
            </button>
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
                                    placeholder="What do you wand to discuss?"
                                    defaultValue={titelinput}
                                />
                                <Select
                                    placeholder='Select'
                                    style={{
                                        width: "100%",
                                    }}
                                    value={selectedOption}
                                    onChange={handleOptionChange}
                                    options={options}
                                />

                            </label>{" "}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={geteditvalues} variant="primary">
                        {" "}
                        <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Save & Update ')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RiskModal;