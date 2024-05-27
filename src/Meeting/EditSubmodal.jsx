import { useState, useEffect, useContext, } from "react";
import { Modal, Col, Row, ModalHeader, ModalBody, ModalFooter, Button } from "react-bootstrap";
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';
import { useParams } from "react-router-dom";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";

const Submodal = ({ item, modal, titel }) => {
    const { id } = useParams();
    const { permissions } = useContext(MainAuthPermissionsContext);
    const [showModal, setShowModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => {
        setShowModal(false)
        setModal2(true)
    };
    const handleCloseModal = () => setShowModal(false);
    const toggelClose = () => setModal2(false);
    const handleShowEditModal = () => {
        setShowModal(true)
    };
    const [openAccordion, setOpenAccordion] = useState(null);
    const handleToggle = (index) => {
        if (openAccordion === index) {
            setOpenAccordion(null);
        } else {
            setOpenAccordion(index);
        }
    };

    return (
        <>
            <button
                type="button"
                className="icon medit border-0  bg-none "
                onClick={handleShowEditModal}>
                <small>{titel}</small>
            </button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <form method="post" className="ivedet">
                                            <div className="accordion vaccordion" id="accordionExample">
                                                <div className="card mb-0">
                                                    <div className="card-header p-1" id="headingOne">
                                                        <button onClick={() => handleToggle(1)} className="togels-my_btn">
                                                            Change Stage
                                                        </button>
                                                    </div>
                                                    <div id="collapseOne" className={`collapse ${openAccordion === 1 ? 'show' : ''}`} aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div class="card-body">
                                                            <select class="form-control" name="flstage">
                                                                <option value="">--Select--</option>

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card mb-0">
                                                    <div className="card-header p-1" id="headingTwo">
                                                        <button onClick={() => handleToggle(2)} className="togels-my_btn">
                                                            Tags
                                                        </button>
                                                    </div>
                                                    <div className={`collapse ${openAccordion === 2 ? 'show' : ''}`} aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                        <div class="card-body">
                                                            <div class="bootstrap-tagsinput"></div><input type="text" class="form-control" name="fltag" id="fltag" value="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card mb-0">
                                                    <div className="card-header p-1" id="headingTwo">
                                                        <button onClick={() => handleToggle(3)} className="togels-my_btn">
                                                            Description
                                                        </button>
                                                    </div>
                                                    <div className={`collapse ${openAccordion === 3 ? 'show' : ''}`} aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                        <div class="card-body">
                                                            <textarea class="form-control" name="fldesc"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card mb-0">
                                                    <div className="card-header p-1" id="headingTwo">
                                                        <button onClick={() => handleToggle(4)} className="togels-my_btn">
                                                            Votes
                                                        </button>
                                                    </div>
                                                    <div className={`collapse ${openAccordion === 4 ? 'show' : ''}`} aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                        <div onClick={toggle2} className="card-body text-vote-arrow">
                                                            <a href="javascript:;" >
                                                                <span className="mb-3 clearfix dtagdis">
                                                                    <span className="float-left">
                                                                        <i className="fa fa-caret-up"></i> &nbsp; <span> 1 </span> &nbsp; Agreed
                                                                    </span>

                                                                    <span className="float-right">
                                                                        <i className="fa fa-caret-down"></i> &nbsp; <span> 0 </span> &nbsp; Disagreed
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-primary btn-ivedet">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Cancel</button>
                    <button type="button" class="btn btn-info">More Detail</button>
                </Modal.Footer>
            </Modal>
            <Modal show={modal2} onHide={toggelClose} toggle={toggle2}>
                <ModalHeader closeButton><Modal.Title>Manage Vote</Modal.Title></ModalHeader>
                <ModalBody>
                    <div className="name Attendees__B">
                        <h6>Votes</h6>
                        <span className="text-vote-arrow">
                            <a  className="vtup" data-event="2:7" data-flow="7">
                                <i className="fa fa-caret-up lightBlack_color"></i> <span class="vtup2 lightBlack_color"> 1 </span>
                            </a>
                        </span>
                        <span className="text-vote-arrow">
                            <a  className="vtdn" data-event="2:7" data-flow="7">
                                <i className="fa fa-caret-down lightBlack_color"></i> <span className="vtdn2 lightBlack_color"> 0 </span>
                            </a>
                        </span>
                    </div>
                    <div>
                        <ul className="right_chat list-unstyled p-0">

                            <li className="online mb-2">
                                <div className="Attendees__B">
                                    <div className="media Attendees__left">
                                        <img className="media-object " src="./media//react_lead/assets/users_images/433898df4d6f58c0b6cc20d1fc651c0a451df528.jpg" alt="" />
                                        <div className="media-body">
                                            <span className="name">Super Admin  </span>
                                            <span className="message">super_admin@mail.com</span>
                                        </div>
                                    </div>
                                    <div className="mt-2"><a  className="btn upButton_mod  btn-upv fa-lg"> <i className="fa fa-caret-up "></i> </a></div>
                                    <div className="mt-2"><a  className="btn  btn-dwv fa-lg dwnButton_mod"> <i className="fa fa-caret-down "></i> </a></div>
                                </div>
                            </li>

                        </ul>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button>Done</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Submodal;