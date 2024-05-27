import React, { useContext, useState, useEffect } from "react";
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
import { MainHeadingContext } from "../context/MainHeadingContext";


export default function Status({ translation }) {

  const [res, apiMethod] = usePost();
  const [res1, apiMethoddelete] = usePost()
  const { data: getStatusData, loading, error } = useFetch('', 'getAllViewOpportunityStatus')
  const [statusData, setstatusData] = useState('')
  const [initialValues, setinitialValues] = useState({
    status_name: '',
    status_color: '#000000'
  })
  const { addHeading } = useContext(MainHeadingContext);
  useEffect(() => {
    addHeading(`Opportunity Status`);
  }, []);
  // event_projects_status
  const handleSubmit = (value, { resetForm }) => {
    let formData = new FormData();
    if (value['status_name'] === '') {
      swal({
        title: "Some Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    } else {
      for (let item in value) {
        formData.append(item, value[item])
      }
      formData.append('type_create', 'cReaTe_sts_Pipeline');
      apiMethod('postCreateOpportunityStatus', formData);
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
        .get(`${config.apiEndPoint}getAllViewOpportunityStatus`)
        .then((response) => {
          setstatusData(response.data)

        })

      res.data.message && toast.success(res.data.message);
    }
  }, [res.data]);
  useEffect(() => {
    if (res1.data && !res1.isLoading) {
      res1.data.message && toast.success(res1.data.message);
    }
  }, [res1.data]);
  const submitbutton = {
    class: "btn btn-primary btn-block",
    text: "Save & Add Status",
  };
  const getValue = () => {
    setstatusData(getStatusData)
  }
  useEffect(() => {
    getValue()
  }, [getStatusData])

  const handleDelete = (item) => {
    let deleteData = new FormData();
    deleteData.append("general", "remove_opportunity");
    deleteData.append("status_id", item.status_id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeleteOpportunityStatus`, deleteData);
        setstatusData(statusData.filter(deleteItem => deleteItem.status_id !== item.status_id))
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
                    <h4 className="card-title">Opportunity Status List</h4>
                  </div>
                  <table className="table card-table table-vcenter">
                    <tbody>
                      {statusData && !statusData.message && statusData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{Translation(translation, item.status_name)}</td>
                            <td className="ml-5" style={{ marginLeft: 200 }}>
                              <div className="tidybox" style={{ "backgroundColor": `${item.status_color}` }}></div>
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
                                <Link to={`/${config.ddemoss}opportunity_status/edit/${item.status_id}`} className="btn btn-icon vstg" style={{ backgroundColor: '#fff' }}>
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
                    <h3 className="card-title">Add New Status</h3>
                  </div>
                  <div className="card-body mb-0">
                    <div className="col-md-12 mt-1">
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <Field
                          required=""
                          type="text"
                          className="form-control col-md-12"
                          name="status_name"
                          placeholder="Status Label..."
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Color</label>
                        <Field required="" type="color" className="input-color col-md-12" name="status_color" />
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
