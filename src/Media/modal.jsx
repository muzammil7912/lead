import { useState, useEffect, useContext,useRef } from "react";
import { Modal, Col } from "react-bootstrap";
import { Select,Input } from "antd";
import useFetch from "../customHooks/useFetch";
import Button from "react-bootstrap/Button";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from "../components/Translation";
import { FaSave } from "react-icons/fa";
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';


const ExampleModal = ({defaultValue,handleAPI,name}) => {
  const [selectedCat2, setSelectedCat2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [rescreate, apiMethodcreate] = usePost();
  const { translations } = useContext(MainTranslationContexts)


  const handleCloseModal = () => setShowModal(false);
  const handleShowEditModal = () => setShowModal(true);

  function geteditvalues() {
    if (selectedCat2 === '') {
      swal({
        position: "center",
        icon: "error",
        title: "Fields are empty!",
        showConfirmButton: false
      });
    } else {
      let updatedata = new FormData();
      console.log(selectedCat2);
      console.log(defaultValue);
      updatedata.append("update_cate", 'update_category_pagE');
      updatedata.append("cate_name", selectedCat2);
      updatedata.append("cate_id", defaultValue);
      apiMethodcreate("postUpdatedCatAndSubCategory", updatedata);
    }
  }
  useEffect(() => {
    if (rescreate.data && !rescreate.isLoading) { 
      setShowModal(false)
      swal({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
      });
       handleAPI()
     }
   }, [rescreate.data])
    const handleInputChange = (event) => {
      setSelectedCat2(event.target.value);
    }
  
  return (
    <>
      <button
        type="button"
        className="icon medit border-0 text-info  bg-none "
        onClick={handleShowEditModal}>
        <i className="fe fe-edit mr-1"></i>
      </button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col xs={12} md={12} lg={12}>
            <label className="modal-labels">
              Category <br />
              <Input
              defaultValue={name}
              placeholder="Enter your Category" 
               onChange={handleInputChange} />
            </label>{" "}
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={geteditvalues} variant="primary">
            {" "}
            <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Save & Update Category')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExampleModal;