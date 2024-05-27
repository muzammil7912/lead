import { Button, Modal } from 'antd';
import { useState, useEffect } from "react";
import React from 'react'
import usePost from "../customHooks/usePost";
import { Input, Radio, Space } from 'antd';
import { Select } from 'antd';
import { toast } from "react-toastify";
import swal from 'sweetalert'
const RoleModal = ({ value, handleUpdates }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen1] = useState(false);


  const showModal = () => {
    setOpen1(true);
  };


  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

    }, 3000);
  };
  const handleCancel = () => {
    setOpen1(false)
  };
 const [profiles, setProfiles] = useState('');
  const [valueAssi, setValueAssi] = useState("all");
  const [value2, setValue2] = useState("directly");
  const [privileges, setprivileges] = useState("Administrator")

  const [resdata1, apiMethoddata12] = usePost();
  const [name1, setname1] = useState("");

  // radio button //
  const onChange = (e) => {
    setValueAssi(e.target.value);
  };
  const onChange2 = (e) => {

    setValue2(e.target.value);
  };

  // Select//
  const handleChange = (value) => {
    setprivileges(value)
  };

  const handleSubmit = () => {

    if (name1 == '') {
      swal({
        title: "Name is required:",
        text: 'Name',
        icon: "warning",
        dangerMode: true,
      })
    }
    else {
      let formData = new FormData();
      formData.append("rolename", name1)
      formData.append("reports", value.id)
      formData.append("assign_records", valueAssi)
      formData.append("submit", "Create Role")
      formData.append("privileges", value2)
      if (value2 == "copyfrom") {
        formData.append("exist_prv", privileges)
      }
      apiMethoddata12("postCreateUserRole", formData)
      setname1('')
      setValueAssi("all")
      setValue2("directly")
      setOpen1(false);
    }
  }

  useEffect(() => {
    if (resdata1.data && !resdata1.isLoading) {
      handleUpdates()
    }
  }, [resdata1.data]);


  useEffect(() => {
    if (resdata1.data && !resdata1.isLoading) {

      resdata1.data.message && toast.success(resdata1.data.message);
    }
  }, [resdata1.data]);



  return (
    <>
      <Button className='antButtton' onClick={(e) => showModal(e)}>
        <i className="fa fa-plus-circle"></i>
      </Button>
      <Modal
        open={open}
        title="Add Role"
        onOk={handleOk}
        onCancel={handleCancel}
        width={750}
      >
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-12">

              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label text-right">
                        Name &nbsp;
                      </label>
                      <div className="col-sm-5">
                        <input
                          required
                          type="text"
                          className="form-control"
                          name="rolename"
                          value={name1}
                          onChange={(e) => setname1(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row useredits">
                  <div className="col-md-12 mt-2">
                    <div className="form-group row centerr1">
                      <label className="col-md-3 col-form-label text-right">
                        Reports To &nbsp;
                      </label>
                      <div className='col-md-5'>
                      <div className="dropdown div-block">
                        <input disabled type="text" name="name" id="name2" className='form-control input12' value={value?.name} />
                      </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label text-right">
                            Can Assign Records To &nbsp;
                          </label>
                          <div className="col-sm-7 pt-2">

                            <Radio.Group onChange={onChange} value={valueAssi}>
                              <Space direction="vertical">
                                <Radio value={"all"}>All Users</Radio>
                                <Radio value={"same"}> Users having Same Role or Subordinate Role</Radio>
                                <Radio value={"subord"}>Users having Subordinate Role</Radio>

                              </Space>
                            </Radio.Group>

                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label text-right">
                            Privileges &nbsp;
                          </label>
                          <div className="col-sm-7 pt-2">

                            <Radio.Group onChange={onChange2} value={value2}>
                              <Space direction="vertical">
                                <Radio value={'directly'}> Assign privileges directly to Role</Radio>
                                <Radio value={"copyfrom"}>
                                  Assign privileges from existing profiles

                                </Radio>
                              </Space>
                            </Radio.Group>
                          </div>
                        </div>
                        {value2 === "copyfrom" ? (
                          <div id="_prv">
                            <div className="form-group row">
                              {" "}
                              <label className="col-sm-3 col-form-label text-right">
                                Copy privileges from &nbsp;
                              </label>
                              <div className="col-sm-3">

                                <Select
                                  defaultValue={privileges}
                                  style={{ width: 200 }}
                                  onChange={handleChange}
                                  options={profiles && profiles.map((item) => ({ label: item.profile_name, value: item.id }))}
                                />

                              </div>{" "}
                            </div>
                          </div>
                        ) : null}

                      </div>
                    </div>
                    <div className="text-right mt-5">
                      <Button className='cancle2' key="back" onClick={handleCancel}>
                        Close
                      </Button>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        name="submit"
                        defaultValue="Create Role"
                        onClick={handleSubmit}
                      />
                    </div>
                  </div>
                </div>
              </form>



            </div>
          </div>

        </div>
      </Modal>
    </>
  );
};
export default RoleModal;