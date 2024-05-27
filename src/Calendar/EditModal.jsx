import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FormControl from '../components/form/FormControl';
import usePost from '../customHooks/usePost';
import Checkbox from './components/Checkbox';
import SwitchButton from './components/SwitchButton';
import swal from "sweetalert";
import { toast } from "react-toastify";
import SubmitButton from '../components/SubmitButton';
import SwitchCheck from './components/SwitchCheck';

function EditModal({ editshow, removeEditModal, submit, data, setEditModal, setDatas }) {
  const [hexCodeDefault, sethexCodeDefault] = useState(`${data?.calendar_color ? data?.calendar_color : "#000000"}`);
  let colorChangeRef = useRef(null);
  let colorChangeRef2 = useRef(null);
  const [res, apiMethod] = usePost();
  const [namess, setNamess] = useState({
    "calendar_name": data.calendar_name,
    "calendar_slug_url": data.calendar_slug_url,
    'calendar_email_address': data.calendar_email_address
  })
  const handleColorChange = (event) => {
    colorChangeRef2.current.value = colorChangeRef.current.value;
    sethexCodeDefault(event.target.value);
  };

  const handleSubmit = (values) => {
    console.log(values)
    let formdata = new FormData();
    let bodyContent = formdata;
    for (let item in values) {
      if (item === "meet_room_creation" && ((values[item].length === 0) || values[item] === "0" || values[item] === "")) {
        formdata.append(item, "0");
      }
      else if(item === "meet_room_creation" && (values[item].length === 1 || values[item] === "1")) {
        formdata.append(item, "1");
      }
      else if (item === "calendar_default" && ((values[item].length === 0) || values[item] === "0" || values[item] === "")) {
        formdata.append(item, "0");
      }
      else {
        formdata.append(item, values[item]);
      }
    }
    formdata.append("calendar_name", namess.calendar_name);
    formdata.append("calendar_slug_url", namess.calendar_slug_url);
    formdata.append("calendar_color", colorChangeRef2.current.value);
    formdata.append("calendar_email_address", namess?.calendar_email_address);
    if (namess.calendar_name === "" || namess.calendar_email_address === "") {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    }
    else {
      apiMethod(`postUpdateCalendar/${data.cl_db_did}`, bodyContent);
      // submit();
      // setEditModal(false)
    }
    
  }
  useEffect(() => {
    if (res.data && !res.isLoading) {
      res.data.message && toast.success(res.data.message);
      submit()
      // setEditModal(false)
    }
  }, [res.data])
  const datass = {
    "priv": [
      {
        "label": "Public",
        "value": "public",
      },
      {
        "label": "Private",
        "value": "private",
      },
    ],
    "system": [
      {
        "label": "Default",
        "value": "1",
      }
    ],
    "Meet": ["Enable"]

  }
  const initialValues = {
    // "calendar_email_address": data.calendar_email_address,
    "calendar_privacy": data.calendar_privacy,
    "calendar_default": data.calendar_default,
    "meet_room_creation": data.meet_room_creation,
    "calendar_location": data.calendar_location,
    "calendar_description": data.calendar_description,
  }

  const submitbutton = {
    class: "btn btn-primary mt-3 ml-auto d-block",
    text: "Save Calendar",
  };

  return (
    <Modal show={editshow} size="lg" aria-labelledby="contained-modal-title-vcenter"
      centered onHide={removeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>{data.calendar_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik initialValues={initialValues}
          onSubmit={handleSubmit} >
          <Form name="myForm">
            <div className="row clearfix">
              <div className="col-md-4 col-sm-12">
                <div className="form-group my-2">
                  <label><b>Calendar Name<span style={{ "color": "red" }}> *</span></b></label>
                  <input className="form-control" placeholder="Public URL of this calendar" type="text" name="calendar_name" value={namess.calendar_name || ""} onChange={(e) => setNamess({ ...namess, "calendar_name": e.target.value, "calendar_slug_url": e.target.value })} />
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <FormControl className="form-control" required={true} label={"Email address"} name="calendar_email_address" value={namess?.calendar_email_address} onChange={event => setNamess({...namess, 'calendar_email_address' : event.target.value})} control="input" placeholder="Email address" />
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group my-2">
                  <label><b>URL Slug</b></label>
                  <input className="form-control" placeholder="Public URL of this calendar" type="text" name="calendar_slug_url" value={(namess.calendar_slug_url).replaceAll(" ", "_") || ""} onChange={(e) => setNamess({ ...namess, "calendar_slug_url": e.target.value })} />
                </div>
              </div>
              <div className="col-md-2 col-sm-12">
                <SwitchButton options={datass.priv} label='Public' MainLabel={"Privacy"} name={"calendar_privacy"} />
              </div>
              <div className="col-md-2 col-sm-12">
                <SwitchCheck options={datass.system} label='Public' MainLabel={"System Status"} name={"calendar_default"} />
              </div>
              <div className="col-md-8 col-sm-12">
                <b className="label">Create a Google Meet room</b>
                <Checkbox
                  options={datass.Meet}
                  name={"meet_room_creation"}
                  control="checkbox"
                  values={initialValues.meet_room_creation} />
                <p className='m-0'>Enabling this setting will create Google Meet meeting when appointment is booked.</p>
              </div>

              <div className="col-md-12">
                <FormControl defaultValue={initialValues.calendar_location} className="form-control" label={"Location"} name="calendar_location" control="input" placeholder="Location address" />
              </div>
              <div className="col-md-12">
                <FormControl defaultValue={initialValues.calendar_description} className="form-control" label={"Description"} name="calendar_description" control="input" placeholder="Description" />
              </div>

            </div>
            <div className="col-md-3">
              <div className="form-group bokable">
                <label className="form-label">Calendar Color</label>
                <div className="input-group">
                  <input
                    ref={colorChangeRef2}
                    defaultValue={hexCodeDefault}
                    type="text"
                    className="form-control inputV"
                    name="eve_color"
                  />
                  <div className="input-group-append">
                    <input
                      type="color"
                      className="inputColor"
                      defaultValue={hexCodeDefault}
                      ref={colorChangeRef}
                      onChange={handleColorChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <SubmitButton
              props={submitbutton}
              buttonLoading={res.isLoading}
            />
          </Form>

        </Formik>

      </Modal.Body>
    </Modal>
  )
}

export default EditModal