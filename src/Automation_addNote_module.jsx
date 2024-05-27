import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field, useFormikContext } from "formik";
import FormControl from "./components/form/FormControl";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function Automation_addNote_module({
  children,
  setshow1,
  module_name,
  backgroundColor,
  handle_addNote_module,
}) {

  const [content, setContent] = useState("");
  const [automation_addNote_module, setAutomation_addNote_module] = useState(false);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  return (
    <>
      <span
        onClick={() => {
          setAutomation_addNote_module(true);
        }}
      >
        {children}
      </span>
      <Modal
        show={automation_addNote_module}
        onHide={() => {
          setAutomation_addNote_module(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5 className="modal-title">{module_name} add note</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={handleEditorChange}
            />
        </Modal.Body>
        <Modal.Footer>
              <div className="d-flex justify-content-end g-2  w-100 mt-3">
                <div>
                  <button
                    onClick={() => {
                      setAutomation_addNote_module(false);
                    }}
                    className="triggerbtn-back"
                    type='button'
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="ms-2">
                  <button type="button" onClick={()=>{handle_addNote_module(content,module_name,backgroundColor)}} className="btn btn-success px-4">
                    Save
                  </button>
                </div>
               
              </div>
            </Modal.Footer>
      </Modal>
    </>
  );
}

export default Automation_addNote_module;
