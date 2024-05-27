import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import config from "../services/config.json";

function Media_image_display({ children, data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>{children}</div>

      <Modal className="media_modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
     
        </Modal.Header>
        <Modal.Body>
          <img
            className="media_image_height myimg"
            src={
              data?.file_value && data?.file_value.includes("http")
                ? data?.file_value
                : `${config.baseurl2}${data?.file_value} `
            }
            alt=""
            
          />{" "}
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Media_image_display;
