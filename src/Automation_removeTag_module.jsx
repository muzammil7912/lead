import React,{useState} from 'react'
import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field, useFormikContext } from "formik";
import FormControl from "./components/form/FormControl";

function Automation_removeTag_module({children,setshow1 ,module_name,handle_add_contact_tag,backgroundColor}) {
    const InitialSameModal = {
        tag_to_add_contact: "",
      };
    const [automation_removeTag_module, setAutomation_removeTag_module] = useState(false)

  return (
   <>
   <span onClick={()=>{setAutomation_removeTag_module(true)}}>
   {children}
   </span>
    <Modal
        show={automation_removeTag_module}
        onHide={() => {
          setAutomation_removeTag_module(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Formik
          initialValues={InitialSameModal}
          onSubmit={(value)=>{
              handle_add_contact_tag(value,setAutomation_removeTag_module,module_name,backgroundColor)
            //   setshow1(false);
            }}

        >
          <Form name="myForm">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <h5 className="modal-title">{module_name} remove tag</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-sm-4">
                  {/* <FormControl
                    className="form-control "
                    firstSelect={"--Select--"}
                    // label={Translation(translations, "Runs")}
                    name="sign_temp"
                    selectList={DropDownDatas}
                    custom_label_name="Module"
                    customer_value_name="id"
                    // onChange={(event) => handleTemplate(event)}
                    control="select_custom_options"
                  /> */}
                </div>
                <div className="col-sm-12 mt-2">
                  <FormControl
                    className="form-control"
                    // required={true}
                    label={"Tag to be Removed"}
                    name="tag_to_add_contact"
                    control="input"
                    // placeholder={Translation(translations, "First Name")}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-end g-2  w-100 mt-3">
                <div>
                  <button
                    onClick={() => {
                      setAutomation_removeTag_module(false);
                    }}
                    className="triggerbtn-back"
                    type='button'
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="ms-2">
                  <button type="submit" className="btn btn-success px-4">
                    Save
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
   </>
  )
}

export default Automation_removeTag_module