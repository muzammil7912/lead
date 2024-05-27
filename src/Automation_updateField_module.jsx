import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Formik, Field, useFormikContext } from "formik";
import FormControl from "./components/form/FormControl";
import usePost from "./customHooks/usePost";
import config from "./services/config.json";
import axios from "axios";
import { getTokenSession } from "./utils/common";
import { Translation } from "./components/Translation";
import { MainTranslationContexts } from "./context/MainTranslationContexts";
import { Select } from "antd";
function Automation_updateField_module({
  children,
  setshow1,
  module_name,
  handle_updateField_module,
  backgroundColor,
}) {
  const { translations } = useContext(MainTranslationContexts);

  const [automation_addTag_module, setAutomation_addTag_module] =
    useState(false);
  const [fieldChangeField_list, setfieldChangeField_list] = useState([]);
  const InitialSameModal = {

    module_name:module_name,
    updated_field_value: "",
    field_type:"",
    field_module:"",
    field_name:"",
  };

  const handleFieldChangeValue = (value) => {
    axios
      .post(`${config.apiEndPoint}postAutomationTriggerModuleFilds`, {
        submit: "automationTrgrModuleFild",
        module: value,
      })
      .then((res) => {
        setfieldChangeField_list(
          res.data.fetchColumns.map((val) => ({
            label: val.Field ? val.Field : val.name,
            type:val.type?val.type:val.Type
          }))
        );
      });
  };

  useEffect(() => {
    if (module_name && module_name !== "contact") {
     if(module_name==="events"){

         handleFieldChangeValue("Action");
     }else{
        handleFieldChangeValue(module_name);
     }

    }
  }, []);

  return (
    <>
      <span
        onClick={() => {
          setAutomation_addTag_module(true);
        }}
      >
        {children}
      </span>
      <Modal
        show={automation_addTag_module}
        onHide={() => {
          setAutomation_addTag_module(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Formik
          initialValues={InitialSameModal}
          onSubmit={(value) => {
            handle_updateField_module(value,module_name,backgroundColor)
            //   setshow1(false);
          }}
        >
        {
            ({values,setFieldValue})=>(
                <Form name="myForm">
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className="modal-title">{module_name} update field</h5>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                   <div className="row">
                   { (module_name==="contact")&&<div className="col-6">
                      <FormControl
                        className="form-control my-1"
                        firstSelect={"--select--"}
                        label={Translation(translations, "Module")}
                        name="field_change_module"
                        selectList={[
                          { Module: "Lead" },
                          { Module: "Prospect" },
                          { Module: "Client" },
                        ]}
                        custom_label_name="Module"
                        customer_value_name="Module"
                        onChange={(event) =>
                        {  values.field_module=event.target.value
                            setFieldValue(values)
                            handleFieldChangeValue(event.target.value)}
                        }
                        //   value={fieldChangeModule}
                        control="select_custom_options"
                      />
                    </div>}
                    <div className="col-6 py-2">
                        <b className="mb-2">Fields</b>
                   <div className="mt-3">
                   <Select
                              showSearch
                              onSearch={(v) => {}}
                              onChange={(v1, v2) => {
                                console.log(v1, v2);
                                values.field_name = v1;
                               if(v2.type === "datetime" || v2.type === "date" || v2.type === "timestamp" || v2.type === "time"){
                                 values.field_type ="date"
                                }else{
                                values.field_type =v2.type
                               }
                               
                               //   v2.children;
                               // handleFieldNameChange(v1,index,v2)
                               setFieldValue(values)
                            }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={"Search calendar name"}
                            >
                              {/* Array.isArray(addFollower) && datas.lead_data && 
                            addFollower.filter(ite => (datas?.parent_ids?.includes(ite?.id) === false)) */}
                              {fieldChangeField_list.length &&
                                fieldChangeField_list.map(
                                  ({ label,type }) => (
                                    <Select.Option
                                      value={label}
                                      key={label}
                                      type={type}
                                    >
                                      {label}
                                    </Select.Option>
                                  )
                                )}
                            </Select>
                   </div>
    
                    </div>
                   </div>
    
                     
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
                    <div className="col-sm-12 mt-2">
                    {values.field_type==="date"?
                    

                      <div><b>New Date</b>
                          <input name="updated_field_value" type={"date"} className="form-control col-6 mt-2"/>
                      </div>
                   
                     :
                     <FormControl
                     className="form-control"
                     // required={true}
                     label={"New Content"}
                     name="updated_field_value"
                     control="input"
                     // placeholder={Translation(translations, "First Name")}
                   />}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="d-flex justify-content-end g-2  w-100 mt-3">
                    <div>
                      <button
                        onClick={() => {
                          setAutomation_addTag_module(false);
                        }}
                        className="triggerbtn-back"
                        type="button"
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
            )
        }
        </Formik>
      </Modal>
    </>
  );
}

export default Automation_updateField_module;
