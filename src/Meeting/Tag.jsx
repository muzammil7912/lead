import React, { useState } from "react";
import { FaTag, FaChevronUp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { handleFullScreen, handleToggle } from "../components/AllCustomFuntion";

function Tag({del, tagVal, savMess, tagvl, tagvlUpd }) {
  const [showtagModal, setShowtagModal] = useState(false);
  const handleShow = () => {
    setShowtagModal(true);
  }
  const handleClose = () => {
    setShowtagModal(false);
  }
  const handleCloses = () => {
    savMess()
    setShowtagModal(false);
  }
  return (
    <div className="card">
      <div className="card-status bg-blue"></div>
      <div className="card-header">
        <h3 className="card-title">
          <FaTag />
          Tags
        </h3>
        <div className="card-options align-item-center">
          <button
            type="button"
            onClick={handleShow}
            className="btn managetag btn-icon btn-primary btn-success"
          >
            <i className="fe fe-plus"></i>
          </button>
          <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
            <i className="fe fe-chevron-down"></i>
          </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i className="fe fe-maximize"></i></a>
        </div>
      </div>
      <div className="card-body">
        <div className="chips tagschip">
          {tagvl && Array.isArray(tagvl)
            ? tagvl.map((item, index) => {
              return (
                <div className="chip" key={index}>
                  <div className="d-flex align-item-center">
                    <span>{item}</span>
                    <button 
                    type="button"
                    onClick={() => del(item)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              );
            })
            : ""}
        </div>
      </div>
      {showtagModal && <Modal show={showtagModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="">Tags</label>
          <input type="text" className="form-control" onChange={(e) => tagvlUpd(e.target.value)} placeholder={"tag"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleCloses()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>}
    </div>
  );
}

export default Tag;
