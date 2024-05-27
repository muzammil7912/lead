import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form } from 'formik';
import { Translation } from "../components/Translation";
import usePost from "../customHooks/usePost";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { getTokenSession } from '../utils/common';
import config from "../services/config.json"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import SubmitButton from '../components/SubmitButton'
import useFetch from "../customHooks/useFetch";
import Loader from "../components/common/Loading";
import { Link, useParams } from "react-router-dom";


export default function Severity({ translation }) {

  const [res, apiMethod] = usePost();
  const [res1, apiMethoddelete] = usePost()
  const { data: getSeverityData, loading, error } = useFetch('', 'getAllViewFollowupSeverity')
  const [severityData, setseverityData] = useState('')
  const [initialValues, setinitialValues] = useState({
    severity_label: '',
    severity_color: '#000000'
  })
  // event_followup_severities
  const handleSubmit = (value, { resetForm }) => {
    let formData = new FormData();
    if (value['severity_label'] === '') {
      swal({
        title: "Some Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    } else {
      for (let item in value) {
        formData.append(item, value[item])
      }
      formData.append('type_create', 'cReaTe_Prt_ActTiON_Pipeline');
      apiMethod('postCreateFollowupSeverity', formData);
      resetForm();
    }
  }
  useEffect(() => {
    if (res.data && !res.isLoading) {

      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getAllViewFollowupSeverity`)
        .then((response) => {
          setseverityData(response.data)

        })

      res.data.message && toast.success(res.data.message);
    }
  }, [res.data]);
  const submitbutton = {
    class: "btn btn-primary btn-block",
    text: "Save & Add Severity",
  };
  const getValue = () => {
    setseverityData(getSeverityData)
  }
  useEffect(() => {
    getValue()
  }, [getSeverityData])

  const handleDelete = (item) => {
    let deleteData = new FormData();
    deleteData.append("general", "rem_act_prio");
    deleteData.append("severity_id", item.severity_id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeletedFollowupSeverity`, deleteData);
        setseverityData(severityData.filter(deleteItem => deleteItem.severity_id !== item.severity_id))
      }
    });
  }


  if (loading) return <Loader />
  return (
    <div className="section-body mt-3">
      <div className="container-fluid">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="row clearfix">
              <div className="col-8">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Followup Severity List</h4>
                  </div>
                  <table className="table card-table table-vcenter">
                    <tbody>
                      {severityData && !severityData.message && severityData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{Translation(translation, item.severity_label)}</td>{' '}
                            <td className="ml-5" style={{ marginLeft: 200 }}>
                              <div className="tidybox" style={{ "backgroundColor": `${item.severity_color}` }}></div>
                            </td>
                            <td className="text-right">
                              <OverlayTrigger
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`}>
                                    View Stages
                                  </Tooltip>
                                }
                              >
                                <Link to={`/${config.ddemoss}followup_severity/edit/${item.severity_id}`} className="btn btn-icon vstg" style={{ backgroundColor: '#fff' }}>
                                  <i className="fa fa-pencil fa-lg" />
                                </Link>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement={"top"}
                                overlay={
                                  <Tooltip id={`tooltip-top`}>
                                    Delete Stages
                                  </Tooltip>
                                }
                              >
                                <Link onClick={() => handleDelete(item)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                                  <i className="fa fa-trash fa-lg" />
                                </Link>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-4">
                <div className="card">
                  <div className="card-header borderblue">
                    <h3 className="card-title">Add New Severity</h3>
                  </div>
                  <div className="card-body mb-0">
                    <div className="col-md-12 mt-1">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <Field
                          required=""
                          type="text"
                          className="form-control col-md-12"
                          name="severity_label"
                          placeholder="Severity Label..."
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Color</label>
                        <Field required="" type="color" className="input-color col-md-12" name="severity_color" />
                      </div>

                    </div>
                  </div>
                  <hr className="mt-0 mb-0" />
                  <input
                    type="hidden"
                    name="type_create"
                    defaultValue="3a1fce0b923a40e4648930db5aef4626"
                  />
                  <div className="card-body">
                    <SubmitButton
                      props={submitbutton}
                      buttonLoading={res.isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>

  )

}
