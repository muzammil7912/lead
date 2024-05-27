import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from "../../services/config.json";
import dayjs from 'dayjs';
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
import usePost from '../../customHooks/usePost';
import { Form, Formik, Field } from 'formik';
import { MainCalenderIdContext } from '../../context/MainCalenderIdContext';

function EditEventModal({ name, setDeleteResponse, range, editshow, removeEditModal, rangeTime, dateall, ID, type }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const { addCalendarID } = useContext(MainCalenderIdContext);
  const { id2 } = rangeTime || { id2: '00' };
  const [show, setShow] = useState(false);
  const [deleteEvent, apiMethodDeleteEvent] = usePost();


  const handleDeleteEvent = () => {
    console.log(rangeTime)

    if (rangeTime.all_day_recurrence_type === 'do_not_repeat') {
      let formData = new FormData();
      formData.append('id', rangeTime.deleteId)
      formData.append('child_id', rangeTime.id2)
      formData.append('event_calendar_id', rangeTime.calendarId)
      formData.append('option', 'all_event')
      apiMethodDeleteEvent('postDeleteInstance', formData)
    }
    else {
      handleShow()
    }
  }
  const handleDelete = (values) => {
    let formData = new FormData();
    formData.append('id', rangeTime.deleteId)
    formData.append('child_id', rangeTime.id2)
    formData.append('event_calendar_id', rangeTime.calendarId)
    formData.append('option', values.option)
    apiMethodDeleteEvent('postDeleteInstance', formData)
  }

  useEffect(() => {
    if (deleteEvent?.data) {
      setDeleteResponse(deleteEvent?.data)
      console.log(deleteEvent?.data?.message)
      handleClose()
      removeEditModal()
    }
  }, [deleteEvent.data])

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow(true)
  };

  const initialValues = {
    option: 'this_event'
  }
  useEffect(() => {
    if (rangeTime) {
      localStorage.setItem("parentId", rangeTime.parent_id ?? "00")
      localStorage.setItem("ChildId", rangeTime.id2 ?? "00")
      addCalendarID({
        parentId: rangeTime.parent_id ?? "00",
        ChildId: id2 ?? "00"
      })
    }
  }, [rangeTime])

  return (
    <Formik initialValues={initialValues}>
      {({ values }) => (
        <Form>
          <Modal
            show={show}
            onHide={handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <div className="modal-header d-flex justify-content-between">
              <div className="left">
                <h5 className="modal-title" id="askmodalTitle">
                  Edit recurring event
                </h5>
              </div>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12" id="this_only_rdBtn">
                  <label className="custom-control custom-radio mgtf">
                    <Field
                      type="radio"
                      name="option"
                      value="this_event"
                    />
                    <div className="custom-control-label">This event</div>
                  </label>
                </div>
                <div className="col-lg-12" id="this_and_following_rdBtn">
                  <label className="custom-control custom-radio mgtf">
                    <Field
                      type="radio"
                      name="option"
                      value="this_and_following"
                    />
                    <div className="custom-control-label">This and following events</div>
                  </label>
                </div>
                <div className="col-lg-12" id="all_event_rdBtn">
                  <label className="custom-control custom-radio mgtf">
                    <Field type="radio" name="option" value="all_event" />
                    <div className="custom-control-label">All events</div>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleClose} type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" onClick={() => handleDelete(values)} className="btn btn-info askRadio_okay">
                Okay
              </button>
            </div>
          </Modal>
          <Modal show={editshow} onHide={removeEditModal}>

            <Modal.Header>
              <Modal.Title>{name}</Modal.Title>
              <div className="right">
                <Link to={`/${config.ddemoss}calendar/editevent/${ID}`} className="mbtn editmodal">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button onClick={handleDeleteEvent} type="button" className="mbtn editdelete" id="editdelete">
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button type="button" onClick={removeEditModal} className="close" data-dismiss="modal" aria-label="Close">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </Modal.Header>
            {
              range &&
              <Modal.Body>

                <div className="row">

                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="">Event Title</label>
                      <input className="form-control etit" readOnly={true} value={name} placeholder="Calendar Name" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="">Event Type</label>
                      <input className="form-control etit" readOnly={true} value={type} placeholder="Event Type" type="text" />
                    </div>
                  </div>
                </div>
                <div className="poptime mb-2 mt-2  col-12">
                  <div className="poptimeBox d-flex align-items-center mt-3 gap-2">
                    <div className="poptimeBox__img">
                      <FaClock />
                    </div>
                    <div>
                      <div className="poptimeBox__txt d-flex gap-1">
                        <div className="d-flex gap-1">

                          <span className="startdate mr-3 popbefore">
                            {dayjs(range.start).format('DD-MM-YYYY')}

                            {/* {dayjs(range.start).format('DD-MM-YYYY')} */}
                          </span>
                          <span>

                            {rangeTime.start_time && dayjs(
                              rangeTime.start_time, "HH:mm:ss").format('HH:mm:A')}
                          </span>
                        </div>
                        <div className="d-flex gap-1">
                          ||

                          {
                            rangeTime?.all_day_recurrence_type !== "daily" &&
                            <span className="enddate mr-3 popbefore">
                              {console.log((range.end != "Invalid Date"))}
                              {(range.end != "Invalid Date") && dayjs(range.end).format('DD-MM-YYYY')}
                            </span>
                          }
                          <span>
                            {rangeTime.end_time && dayjs(
                              rangeTime.end_time, "HH:mm:ss").format('HH:mm:A')}
                          </span>
                        </div>

                      </div>
                      <div className='poptime_recurence_text ml-1' >{rangeTime?.event_recurrence_text?`(${rangeTime?.event_recurrence_text ?? ""})`:""}</div>

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
                        <span className="mr-4 popbefore" style={{ textTransform: 'capitalize' }}>{rangeTime?.privacy}</span>
                        <span className="mr-4 popbefore" style={{ textTransform: 'capitalize' }}>{rangeTime?.visibility}</span>
                        <div style={{ width: '100%' }}>
                          {Array.isArray(rangeTime?.notify) && rangeTime?.notify?.map(item => {
                            return (
                              <div style={{ textTransform: 'capitalize' }} key={item?.notify_db_id}>
                                {`Notify ${item?.event_notification_interval}  ${item?.event_notification_period} Before ${item?.event_notification_type !== "notification" ? ` as ${item?.event_notification_type}` : ""}`}
                              </div>
                            )
                          })}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
                <hr />
              </Modal.Body>
            }
            <Modal.Footer>

              <Button variant="primary" onClick={removeEditModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      )}
    </Formik>
  )
}

export default EditEventModal