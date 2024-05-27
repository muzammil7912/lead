import React, { useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormControl from '../components/form/FormControl';
import { Formik, Form } from 'formik';

const EditNotificationModal = ({ ...props }) => {

    const { setnotificationarr, notificationarr } = props

    const list = [
        { label: "System Notification", value: "system_notification" },
        { label: "SMS", value: "sms" },
        { label: "eMail", value: "email" },
    ];

    const timeList = [
        { label: "Minute", value: "minute" },
        { label: "Hour", value: "hour" },
        { label: "Day", value: "day" },
        { label: "Week", value: "week" },
    ];


    const handleNotificationAdd = useCallback((item) => {
        let adjusteds = notificationarr.length;
        let adjustedss = parseInt(notificationarr[adjusteds - 1].id);
        setnotificationarr([
            ...notificationarr,
            {
                id: `${++adjustedss}`,
                notify_type: "notification",
                notify_interval: "10",
                notify_period: "minutes",
            },
        ]);
    });

    const handleNotificationRemove = useCallback((item) => {
        setnotificationarr();
        setnotificationarr(notificationarr.filter((ite) => ite.id != item.id));
    });


    const handleNotificationNumber = useCallback((item, index, e) => {
        const updatedObject = { ...notificationarr[index], notify_interval: e };
        const updatedListss = [...notificationarr];
        updatedListss[index] = updatedObject;
        setnotificationarr(updatedListss);
    });


    const handleNotificationPeriod = useCallback((item, index, e) => {
        const updatedObject = { ...notificationarr[index], notify_period: e };
        const updatedListss = [...notificationarr];
        updatedListss[index] = updatedObject;
        setnotificationarr(updatedListss);
    });

    const handleNotificationType = useCallback((item, index, e) => {
        const updatedObject = { ...notificationarr[index], notify_type: e };
        const updatedListss = [...notificationarr];
        updatedListss[index] = updatedObject;
        setnotificationarr(updatedListss);
    });



    return (
        <Formik >
            <Form>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Notification
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-12">
                        {notificationarr &&
                            notificationarr.map((item, index) => {
                                return (
                                    <div
                                        className="row align-items-center m-0 mt-2 notiBox"
                                        key={index}
                                    >
                                        <div className="col-md-6 row align-items-center">
                                            <div className="col-8">
                                                <FormControl
                                                    className="form-control my-1"
                                                    selectList={list}
                                                    name={`notify_type[]`}
                                                    control="select"
                                                    value={item.notify_type}
                                                    onChange={(e) =>
                                                        handleNotificationType(
                                                            item,
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group my-2">
                                                    <input
                                                        value={item.notify_interval}
                                                        onChange={(e) =>
                                                            handleNotificationNumber(
                                                                item,
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="form-control my-1"
                                                        name={`notify_interval[]`}
                                                        placeholder="10"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-5">
                                            <FormControl
                                                className="form-control my-1"
                                                selectList={timeList}
                                                value={item.notify_period}
                                                name={`notify_period[]`}
                                                control="select"
                                                onChange={(e) =>
                                                    handleNotificationPeriod(
                                                        item,
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            {index == 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleNotificationAdd(item)
                                                    }
                                                    className="btn btn-primary py-2"
                                                >
                                                    <i className="fe fe-plus" />{" "}
                                                </button>
                                            )}
                                            {index != 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleNotificationRemove(item)
                                                    }
                                                    className="btn btn-danger py-2 removenoti"
                                                >
                                                    {" "}
                                                    <i className="fa fa-times"></i>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </Formik>
    )
}

export default EditNotificationModal