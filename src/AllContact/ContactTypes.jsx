import React, { useContext, useEffect, useState } from "react";
import config from "../services/config.json";
import { Formik, Field, Form } from 'formik';
import usePost from "../customHooks/usePost";

import axios from "axios";
import Loader from "../components/common/Loading";
import useFetch from "../customHooks/useFetch";
import swal from "sweetalert";
import { Select, Space } from 'antd';
import Example from "./ContactModal";
import { getTokenSession } from "../utils/common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function ContactTypes() {
  const [selectData, setselectData] = useState();
  const [resdata, apiMethoddata] = usePost();
  const [res1, apiMethoddelete] = usePost()
  const [priorityData, setpriorityData] = useState('')
  const { data: settingData, loading, error1 } = useFetch("", "getAllViewTypeContact");


  const handleSubmit = (value, { resetForm }) => {
    console.log(value)
    const formData = new FormData();
    for (let item in value) {
      formData.append(item, value[item]);
    }
    formData.append(`type_create`, 'createT_yp_E');
    formData.append(`type_module[]`, selectData);
    apiMethoddata("postCreateTypeContact", formData)
    resetForm();
  }
  // console.log(selectData)
  let initialValues = {
    "type_name": "",
    "type_color": "",
  }
  // useEffect(() => {
  //   console.log(resdata);
  // }, [resdata])
  //-----Multiple selection-----//

  useEffect(() => {
    if (resdata.data && !resdata.isLoading) {

      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getAllViewTypeContact`)
        .then((response) => {
          setpriorityData(response.data)

        })

      resdata.data.message && toast.success(resdata.data.message);
    }
  }, [resdata.data]);


  const { Option } = Select;
  const handleChange = async (value) => {
    setselectData(value)

  };
  function editupdate() {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios
      .get(`${config.apiEndPoint}getAllViewTypeContact`)
      .then((response) => {
        setpriorityData(response.data)

      })

  }

  const getValue = () => {
    setpriorityData(settingData)
  }
  useEffect(() => {
    getValue()
  }, [settingData])

  const handleDelete = (item) => {
    let deleteData = new FormData();
    deleteData.append("general", "get_contactType_remove");
    deleteData.append("mode", item.db_id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeletedTypeContact`, deleteData);
        setpriorityData(priorityData.filter(deleteItem => deleteItem.db_id !== item.db_id))
      }
    });
  }
  if (loading) return <Loader />
  return (
    <div className="row clearfix">
      <div className="col-xl-8 col-lg-8">
        <div className="table-responsive">
          <table className="table table-hover table-vcenter text-nowrap table_custom border-style list">
            <thead>
              <tr>
                <th />
                <th>Contact Type</th>
                <th>Module Type</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {priorityData && priorityData.map((v, i) => {
                return (
                  <tr className="" key={v.db_id}>
                    <td className="width35">
                      <a style={{ color: `${v.type_color}` }}>
                        <i className="fa fa-star" />
                      </a>
                    </td>
                    <td>
                      <div>
                        <a >{v.type_name}</a>
                      </div>
                    </td>
                    <td>
                      <div>{v.type_module}</div>
                    </td>
                    <td className="text-right">
                        <Example value={v} editupdate={editupdate} />
                      &nbsp;
                      <Link className="text-red dtn"  onClick={() => handleDelete(v)}>
                        <i className="fa-solid fa-rectangle-xmark fa-lg" />
                      </Link>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
      </div>
      <div className="col-xl-4 col-lg-4">
        <div className="card">
          <div className="card-header borderblue">
            <h3 className="card-title">Add New</h3>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form

            >
              <div className="card-body mb-0">
                <div className="col-md-12 mt-1">
                  <div className="form-group">
                    <label className="form-label">Contact Type</label>
                    <Field
                      required=""
                      type="text"
                      className="form-control"
                      name="type_name"
                      placeholder="Name..."
                    />
                  </div>
                  <div className="form-group multiselect_div">
                    <label className="form-label">Module Type</label>

                    <Select
                      mode="multiple"
                      style={{
                        width: '100%',
                      }}
                      placeholder="select one country"
                      onChange={handleChange}
                      optionLabelProp="label"
                    >


                      <Option value="Contact" label="Contact">
                        <Space>

                          Contact
                        </Space>
                      </Option>
                      <Option value="Lead" label="Lead">
                        <Space>

                          Lead
                        </Space>
                      </Option>
                      <Option value="Prospect" label="Prospect">
                        <Space>

                          Prospect
                        </Space>
                      </Option>
                      <Option value="Staff Member" label="Staff Member">
                        <Space>

                          Staff Member
                        </Space>
                      </Option>
                      <Option value="Client" label="Client">
                        <Space>

                          Client
                        </Space>
                      </Option>
                    </Select>
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Color</label>
                    <Field
                      required=""
                      type="color"
                      name="type_color"
                      className="input-color"
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-0 mb-0" />
              <div className="card-body">
                <button type="submit" className="btn btn-primary btn-block">
                  Save Contact Type
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>

  )
}

export default ContactTypes