
import React, { useState, useEffect, useContext, useRef } from 'react';
import { FaHome } from "react-icons/fa";
import { Form, Formik, Field } from "formik";
import FormControl from "../components/form/FormControl";
import SubmitButton from '../components/SubmitButton';
import { toast } from "react-toastify";
import usePost from '../customHooks/usePost';
import swal from 'sweetalert';
import config from "../services/config.json";
import { MainHeadingContext } from "../context/MainHeadingContext";
import Loader from '../components/common/Loading';
import useFetch from '../customHooks/useFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { getTokenSession } from "../utils/common";
import { Translation } from '../components/Translation';
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";


function EditClientStage() {
  const { translations } = useContext(MainTranslationContexts);
  const { id } = useParams();
  const { data: stageData2, loading2, error2 } = useFetch("", `getEditClientsKanbanStages/${id}`);
  const { data: stageData, loading, error } = useFetch("", "getKanbanClientsStageOrderNumber");
  const [dropdown, setDropdown] = useState();
  const [res, apiMethod] = usePost();
  const { addHeading } = useContext(MainHeadingContext);
  useEffect(() => {
    addHeading(`Edit Stage`);
  }, [])

  const { leadPermission } = useContext(MainLeadPermissionContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.client_stages?.active_module === "0" || leadPermission?.client_stages?.edit === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);

  useEffect(() => {
    if (stageData) {
      setDropdown(stageData)
    }

  }, [stageData]);



  const handleSubmit = (values, actions) => {
    if (values.name && values.stage_name && values.background_color && values.font_color && values.column_width && values.order) {
      let formdata = new FormData();
      formdata.append("id", id);
      formdata.append("submit", "update_stage");
      for (let item in values) {
        formdata.append(item, values[item]);
      }
      formdata.append("basename", "edit_clientstage");
      apiMethod("postUpdateKanbanStages", formdata);
    }
    else {
      toast.warning(`Please fill required fields`);
    }

  }



  useEffect(() => {
    if (stageData2) {
      console.log(stageData2)
    }

  }, [stageData2]);

  useEffect(() => {
    if (res.data) {
      res?.data?.message && toast.success(res?.data?.message);
      navigate(`/${config.ddemoss}clients/Kanban`)
    }

  }, [res.data]);

  const submitbutton = {
    class: "btn btn-primary",
    text: "Update Stage",
  };
  if (loading || loading2 || !stageData2) return <Loader />;
  // let ss = stageData2[0].column_width.split("p")
  let initialValues = {
    "name": stageData2[0]?.name,
    "stage_name": stageData2[0]?.body,
    "background_color": stageData2[0]?.bg_color,
    "font_color": stageData2[0]?.font_color,
    "column_width": stageData2[0]?.column_width,
    "order": stageData2[0]?.order_number,
  }

  return (
    <div className='section-body mt-3'>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-12">
            <div className="card">
              <div className="card-header borderblue">
                <h3 className="card-title">Modify Stage</h3>
                <div className="card-options">
                  <Link to={`/${config.ddemoss}prospects`} className='btn btn-sm btn-primary bsm'>
                    <FaHome style={{ fontSize: 18 }} />
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form name="myForm">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, "Name")}
                            name="name"
                            control="input3"
                            placeholder={Translation(translations, "Label")}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, "Stage Name")}
                            name="stage_name"
                            control="input3"
                            placeholder={Translation(translations, "Stage Name")}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="input-color color_input"
                            label={Translation(translations, "Background Color")}
                            name="background_color"
                            control="input3" type="color"
                            required={true}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="input-color color_input"
                            label={Translation(translations, " Font Color")}
                            name="font_color"
                            control="input3" type="color"
                            required={true}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <FormControl
                            className="form-control my-1"
                            label={Translation(translations, "Column Width")}
                            name="column_width"
                            control="input5" type="number"
                            placeholder={Translation(translations, "300")}
                            style={{ width: "100%" }}

                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Order number</label>
                          {
                             stageData2[0]?.fixed_order_number === "1" ?
                             <Field type="text" name="order" className="form-control my-1" disabled={true} />
                             :
                             <Field as="select" name="order" className="form-control my-1">
                             {dropdown && dropdown.map((key) => (
                               <option key={key} value={key}>
                                 {key}
                               </option>
                             ))}
                           </Field>
                          }
                         
                        </div>
                      </div>
                    </div>
                    <div className='text-right mt-5'>
                      <SubmitButton
                        props={submitbutton}
                        buttonLoading={res.isLoading}
                      />
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default EditClientStage