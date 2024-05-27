import { Form, Formik } from 'formik';
import React from 'react';
import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormControl from '../../components/form/FormControl';
import config from "../../services/config.json";
import allData from '../../Data/data';
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MainEditCalenderContext } from "../../context/MainEditCalenderContext";
import dayjs from 'dayjs';
import { MainAuthPermissionsContext } from '../../context/MainAuthPermissionsContext';
import { AiOutlineConsoleSql } from 'react-icons/ai';

function AddEventModal({ show, type, calenderDetails, removeAddModal, dateall, ids }) {
  const { addcalenderdetails } = useContext(MainEditCalenderContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const hexCodeDefault = Array.isArray(calenderDetails) && calenderDetails[0].calendar_color;
  let colorChangeRef = useRef(null);
  let colorChangeRef2 = useRef(null);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    "eventtitle": "",
    "type": "",
    "eve_color": Array.isArray(calenderDetails) && calenderDetails.length > 0 ? calenderDetails[0].calendar_color : "#000000",
  });
  const handleAddValue = (values) => {
    const date = dayjs().tz(permissions[`system-user_timezone`]?.setting_value ?? "America/New_York");
    const newDate = date.add(1, 'hour');
    addcalenderdetails({
      EventTitle: `${values.eventtitle}`,
      EventType: `${selected}`,
      EventCalendar: `${ids}`,
      HEXCODE: `${initialValues.eve_color}`,
      startdate: `${dateall.start ?? dayjs()}`,
      enddate: `${dateall.end ?? dayjs()}`,
      Starttime: dayjs().format('HH:mm'),
      Endtime: dayjs().add(1, 'hour').format('HH:mm'),
      view: type
    })
    navigate(`/${config.ddemoss}calendar/new_event`);

  }
  console.log(dateall, type)
  const [selected, setselected] = useState("event")
  return (
    <Modal show={show} onHide={removeAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Event</Modal.Title>

      </Modal.Header>
      <Modal.Body>

        <Formik initialValues={initialValues} onSubmit={handleAddValue} >
          <Form name="myForm">
            <FormControl className="form-control my-1" label={"Event Title"} name="eventtitle" control="input" placeholder="Calendar Name" />
            <label htmlFor=""><b>Type </b></label>
            <select name="type" className={"form-control"} onChange={(e) => setselected(e.target.value)}>

              {allData.calendar.type.map((item, index) => {
                return (
                  <option value={item.value} key={index}>{item.label}</option>
                )
              })}
            </select>
            <div className="form-group bokable">
              <label className="form-label">HEX Code</label>
              <div className="input-group">
                <input
                  ref={colorChangeRef2}
                  type="text"
                  className="form-control inputV"
                  name="eve_color"
                  value={initialValues?.eve_color}
                  onChange={(e) => setInitialValues({ ...initialValues, "eve_color": e.target.value })}
                />
                <div className="input-group-append">
                  <input
                    type="color"
                    className="inputColor"
                    name="eve_color"
                    value={initialValues?.eve_color}
                    onChange={(e) => setInitialValues({ ...initialValues, "eve_color": e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="poptime mb-2 mt-2  col-12">
              <div className="poptimeBox d-flex align-items-center mt-3 gap-2">
                <div className="poptimeBox__img">
                  <FaClock />
                </div>
                <div className="poptimeBox__txt d-flex gap-1">
                  <div className="d-flex gap-1">

                    <span className="startdate mr-3 popbefore">{dayjs(dateall.start).format('YYYY-MM-DD')}</span>
                    <span>
                      {type === 'dayGridMonth' ? dayjs().format("HH:mm:A") : dayjs(dateall.start).format('HH:mm:A')}
                    </span>
                  </div>
                  <div className="d-flex gap-1">
                    ||

                    <span className="enddate mr-3 popbefore">{dayjs(dateall.start).add(1, 'hour').format('YYYY-MM-DD')}</span>
                    <span>
                      {(type === 'dayGridMonth' || type === '') ? dayjs().add(1, 'hour').format("HH:mm:A") : dayjs(dateall.end).format('HH:mm:A')}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div className="poptime col-12">
              <div className="poptimeBox d-flex align-items-center gap-2">
                <div className="poptimeBox__img">
                  <FaCalendarAlt />
                </div>
                <div className="poptimeBox__txt pr-4">
                  <div className="d-flex">
                    <span className="mr-4 popbefore">Public</span>
                    <span className="mr-4 popbefore">Busy</span>
                    <span>Notify 10 Minutes Before</span>
                  </div>

                </div>

              </div>
            </div>
            <hr />
            <Button type='submit' variant="primary" className='d-flex justify-content-end ml-auto'>More Options</Button>
          </Form>
        </Formik>

      </Modal.Body>
    </Modal>
  )
}

export default AddEventModal