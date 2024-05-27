import { useState, useEffect, useContext, useRef } from "react";
import { Modal, Col } from "react-bootstrap";
import { Select, Input } from "antd";
import Button from "react-bootstrap/Button";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from "../components/Translation";
import { FaSave } from "react-icons/fa";
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';


const SubCategory = ({ parentId, childId,handleAPI2,name }) => {
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
        title: "Field are empty!",
        showConfirmButton: false,
      })
    } else {
      let updatedata = new FormData();
      updatedata.append("cate_name", selectedCat2);
      updatedata.append("cate_id", childId);
      updatedata.append("cate_parent", parentId);
      updatedata.append("update_cate_sub", 'update_category_SubcatpagE');
      apiMethodcreate("postCommunicationUpdatedCatAndSubCategory", updatedata);
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
      handleAPI2()
     }
   }, [rescreate.data])
  const handleInputChange2 = (event) => {
    setSelectedCat2(event.target.value);
    console.log(event.target.value)
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
          <Modal.Title>Edit Sub-Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col xs={12} md={12} lg={12}>
            <label className="modal-labels">
              Sub-Category <br />
              <Input
                defaultValue={name}
                placeholder="Enter your Sub-Category"
                onChange={handleInputChange2} />
            </label>{" "}
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={geteditvalues} variant="primary">
            {" "}
            <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Save & Update Sub-Category')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubCategory;