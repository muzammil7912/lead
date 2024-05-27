import React, { useContext, useEffect, useRef, useCallback } from 'react'
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import { Translation } from '../components/Translation';
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import Dropdown from './components/Dropdown';
import SwitchCheck from './components/SwitchCheck';
import useFetch from '../customHooks/useFetch';
import Loader from '../components/common/Loading';
import { FaChevronDown, FaRegClock } from 'react-icons/fa';
import Time from './components/Time';
import DateRange from './components/DateRange';
import SubmitButton from '../components/SubmitButton';
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';
import { MainHeadingContext } from '../context/MainHeadingContext';
import dayjs from 'dayjs';
import swal from "sweetalert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DatePicker } from 'antd';


function BookableSchedule() {
    const { addHeading } = useContext(MainHeadingContext);
    const [res, apiMethod] = usePost();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    const [sedate, setSedate] = useState(`${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`);
    const { translations } = useContext(MainTranslationContexts);
    const [data, setData] = useState("")
    const { data: bookable, loading, error } = useFetch("", "getAllViewCalendarSettings");
    const [getAvailabilty, setgetAvailabilty] = useState("")
    const [scheduleInterval2, setScheduleInterval2] = useState("Minutes")
    const [scheduleInterval, setScheduleInterval] = useState("Minutes")
    const [adjusted, setAdjusted] = useState("")
    const [RangesStart, setRangesStart] = useState("");
    const [Rangesend, setRangesEnd] = useState("");
    // const [Status, setStatus] = useState(false);
    // const [MaximumTime, setMaximumTime] = useState(false);
    // const [MinimumTime, setMinimumTime] = useState(false);
    // const [BufferTime, setBufferTime] = useState(false);
    // const [MaximumBooking, setMaximumBooking] = useState(false);
    // const [ScheduleAvailability, setScheduleAvailability] = useState(false);
    const [content, setContent] = useState("");


    let colorChangeRef = useRef(null)
    let colorChangeRef2 = useRef(null)

    useEffect(() => {
        if (bookable) {
            addHeading(`Bookable Schedule`);
            setData(bookable)
            bookable?.Booking?.instructions && setContent(bookable?.Booking?.instructions)
            setRangesStart(bookable?.Booking?.availabilty_from)
            setRangesEnd(bookable?.Booking?.availabilty_to)
            colorChangeRef.current.value = bookable?.Booking?.color_code ? bookable?.Booking?.color_code : '#000000'
            colorChangeRef2.current.value = bookable?.Booking?.color_code ? bookable?.Booking?.color_code : '#000000'
            if (bookable?.Booking?.duration_per) {
                setScheduleInterval(bookable?.Booking?.duration_per)
            }
            if (bookable?.getAvailabilty?.length > 0) {
                setgetAvailabilty(bookable?.getAvailabilty)
            }
            else {
                setgetAvailabilty([{
                    "appointment_id": bookable?.Booking?.db_id,
                    "available_day": "Sun",
                    "day_end_time": "",
                    "day_start_time": "",
                    "db_id": `200`,
                    "user_id": bookable?.Booking?.user_id
                }
                ])
            }
            if (bookable?.getAdjusted?.length > 0) {
                setAdjusted(bookable.getAdjusted)
            }
            else {
                setAdjusted([
                    {
                        "appointment_id": bookable?.Booking?.db_id,
                        "available_dates": sedate,
                        "date_end_time": "",
                        "date_start_time": "",
                        "db_id": "300",
                        "user_id": bookable?.Booking?.user_id
                    }])
            }
        }
    }, [bookable])
    let colow = "";
    let requiredInputStatus = [
        { name: "schedule_title", label: "Schedule Title" },
        { name: "schedule_iteration", label: "Appointment duration" },
    ];
    let StatusChecked = false
    let MaximumtimeChecked = false
    let MinimumtimeChecked = false
    let buffer_time = false
    let max_bookingChecked = false
    let Schedule_AvailabilityChecked = false
    const handleSubmit = (values) => {
        let alertArr = [];
        console.log(values, "values");
        let formdata = new FormData();
        let vl = ["schedule_status", "schedule_availability", "max_booking", "buffer_time", "min_time", "max_time"]
        requiredInputStatus.map((val, i) => {
            if (values[val.name] == "" || values[val.name] == undefined) {
                alertArr.push(val.label);
            }
        });
        if (((Array.isArray(values["schedule_status"]) && values["schedule_status"]?.includes("1")) || values["schedule_status"] === "1")) {
            StatusChecked = true
            formdata.append("schedule_status", "1");
        }
        else {
            formdata.append("schedule_status", "0");
            StatusChecked = false
        }
        if (((Array.isArray(values["schedule_availability"]) && values["schedule_availability"]?.includes("1")) || values["schedule_availability"] == "1")) {
            formdata.append("schedule_availability", "1");
            Schedule_AvailabilityChecked = true
        }
        else {

            formdata.append("schedule_availability", "0");
            Schedule_AvailabilityChecked = false
        }
        if (((Array.isArray(values["max_booking"]) && values["max_booking"]?.includes("1")) || values["max_booking"] == "1")) {
            formdata.append("max_booking", "1");
            max_bookingChecked = true
        }
        else {
            formdata.append("max_booking", "0");
            max_bookingChecked = false
        }
        if ((values["max_time"] === "" || values["max_time"] === false || values["max_time"] === "0")) {
            formdata.append("max_time", "0");
            MaximumtimeChecked = false
        }
        else {
            formdata.append("max_time", "1");
            MaximumtimeChecked = true
        }
        if ((values["min_time"] === "" || values["min_time"] === false || values["min_time"] === "0")) {
            formdata.append("min_time", "0");
            MinimumtimeChecked = false
        }
        else {
            formdata.append("min_time", "1");
            MinimumtimeChecked = true
        }
        if ((values["buffer_time"]?.includes("1") || values["buffer_time"] === "1")) {
            formdata.append("buffer_time", "1");
            buffer_time = true
        }
        else {
            formdata.append("buffer_time", "0");
            buffer_time = false
        }
        if (StatusChecked) {
            if (alertArr.length > 0) {
                swal({
                    title: "Fill required field ",
                    text: `${alertArr.join()}`,
                    icon: "warning",
                    dangerMode: true,
                });
                return;
            } else {
                // for (let item in values) {
                //     formdata.append(item, values[item]);
                // }
                formdata.append("schedule_title", values.schedule_title);
                formdata.append("schedule_iteration", values.schedule_iteration);
                getAvailabilty.map((item) => {
                    if (item.available_day != " " && item.day_start_time != "" && item.day_end_time != "") {
                        formdata.append("availability_day[]", item.available_day);
                        formdata.append("availability_start_time[]", item.day_start_time);
                        formdata.append("availability_end_time[]", item.day_end_time);
                    }
                    else {
                        swal({
                            title: "Fill required field  ",
                            // text: `Availability Day "Start , Time , End Time"`,
                            text: `Availability Day : "${item.available_day ? "" : "Day"} ${item.day_start_time ? "" : "Start Time"} ${item.day_end_time ? "" : "End Time"}"`,
                            icon: "warning",
                            dangerMode: true,
                        });
                        return;
                    }
                });
                adjusted.map((item) => {
                    formdata.append("adjusted_date[]", item.available_dates);
                    formdata.append("adjusted_start_time[]", item.date_start_time);
                    formdata.append("adjusted_end_time[]", item.date_end_time);
                    // if (item.available_dates != " " && item.date_start_time != "" && item.date_end_time != "") {
                    //     formdata.append("adjusted_date[]", item.available_dates);
                    //     formdata.append("adjusted_start_time[]", item.date_start_time);
                    //     formdata.append("adjusted_end_time[]", item.date_end_time);
                    // } else {
                    //     swal({
                    //         title: "Fill required field  ",
                    //         text: `Adjusted Availability : "${item.available_dates ? "" : "Day"} ${item.date_start_time ? "" : "Start Time"} ${item.date_end_time ? "" : "End Time"}"`,
                    //         icon: "warning",
                    //         dangerMode: true,
                    //     });
                    //     return;
                    // }
                });
            }
        } else {
            formdata.append("schedule_title", values.schedule_title);
            formdata.append("schedule_iteration", values.schedule_iteration);
            getAvailabilty.map((item) => {
                formdata.append("availability_day[]", item.available_day);
                formdata.append("availability_start_time[]", item.day_start_time);
                formdata.append("availability_end_time[]", item.day_end_time);
            });
            adjusted.map((item) => {
                formdata.append("adjusted_date[]", item.available_dates);
                formdata.append("adjusted_start_time[]", item.date_start_time);
                formdata.append("adjusted_end_time[]", item.date_end_time);
            });
        }
        // for (let item in values) {
        //     if (vl.includes(item)) {

        //     }
        //     else {
        //         formdata.append(item, values[item]);
        //     }
        // }
        if (MaximumtimeChecked) {
            if (values.max_time_per !== "" && values.max_time_per !== undefined) {
                formdata.append("max_time_per", values.max_time_per);
                formdata.append("max_time_type", values.max_time_per);
            }
            else {
                swal({
                    title: "Fill required field ",
                    text: "Maximum time",
                    icon: "warning",
                    dangerMode: true,
                });
                return;
            }
        } else {
            formdata.append("max_time_per", values.max_time_per);
            formdata.append("max_time_type", values.max_time_per);
        }
        if (MinimumtimeChecked) {
            if (values.min_time_per !== "" && values.min_time_per !== undefined) {
                formdata.append("min_time_per", values.min_time_per);
                formdata.append("min_time_type", values.min_time_type);
            }
            else {
                swal({
                    title: "Fill required field ",
                    text: "Minimum time",
                    icon: "warning",
                    dangerMode: true,
                });
                return;
            }
        } else {
            formdata.append("min_time_per", values.min_time_per);
            formdata.append("min_time_type", values.min_time_type);
        }
        if (buffer_time) {
            if (values.buffer_time_interval !== "" && values.buffer_time_interval !== undefined) {
                formdata.append("buffer_time_interval", values.buffer_time_interval);
            }
            else {
                swal({
                    title: "Fill required field ",
                    text: "Buffer Time",
                    icon: "warning",
                    dangerMode: true,
                });
                return;
            }
        } else {
            formdata.append("buffer_time_interval", values.buffer_time_interval);
        }
        if (max_bookingChecked) {
            if (values.booking_per_day !== "" && values.booking_per_day !== undefined) {
                formdata.append("booking_per_day", values.booking_per_day);
            }
            else {
                swal({
                    title: "Fill required field ",
                    text: "Booking per day",
                    icon: "warning",
                    dangerMode: true,
                });
                return;
            }
        } else {
            formdata.append("booking_per_day", values.booking_per_day);
        }
        if (Schedule_AvailabilityChecked) {
            if ((RangesStart !== "" && RangesStart !== undefined) && (Rangesend !== "" && Rangesend !== undefined)) {
                formdata.append("schedule_availability_start", RangesStart);
                formdata.append("schedule_availability_end", Rangesend);
            }
            else {
                swal({
                    title: "Fill required field ",
                    text: `Availability Schedule :  ${RangesStart ? "" : "Start ,"} ${Rangesend ? '' : "End"} `,
                    icon: "warning",
                    dangerMode: true,
                });
                return;
            }
        } else {
            formdata.append("schedule_availability_start", RangesStart);
            formdata.append("schedule_availability_end", Rangesend);
        }

        formdata.append("create_schedule", "sChed_CreaTe");
        // formdata.append("schedule_availability_start", RangesStart);
        // formdata.append("schedule_availability_end", Rangesend);
        if (bookable?.Booking?.db_id) {
            formdata.append("_get_booking", bookable?.Booking?.db_id);
            formdata.append("booking", bookable?.Booking?.db_id);
        }
        formdata.append("schedule_interval", scheduleInterval);
        formdata.append("buffer_time_iteration", scheduleInterval2);
        formdata.append("color_code", colorChangeRef.current.value);
        formdata.append('instructions', content)
        let bodyContent = formdata;
        apiMethod("postUpdatedCalendarSettings", bodyContent);
    }
    useEffect(() => {
        if (res.data) {
            toast.success(res.data.message);
        }
    }, [res.data])


    let Minutes = [
        {
            value: "Minutes",
            label: "Minutes",
        },
        {
            value: "Hours",
            label: "Hours",
        }

    ]
    const datass = {
        "Status":
            [{
                "label": "Enable",
                "value": "1",
            }],
        "buffer_time":
            [{
                "label": "Buffer Time (Add time between appointment slots)",
                "value": "1",
            }],
        "schedule_availability": [{
            "label": "Schedule Availability (Select a range of dates where this schedule will be available)",
            "value": "1",
        }],
        "maxBooking": [
            {
                "label": "Maximum bookings per day (Limit how many booked appointments to accept in a single day)",
                "value": "1",
            }
        ],
        "day": [
            {
                "label": "Sun",
                "value": "Sun",
            },
            {
                "label": "Mon",
                "value": "Mon",
            },
            {
                "label": "Tue",
                "value": "Tue",
            },
            {
                "label": "Wed",
                "value": "Wed",
            },
            {
                "label": "Thu",
                "value": "Thu",
            },
            {
                "label": "Fri",
                "value": "Fri",
            },
            {
                "label": "Sat",
                "value": "Sat",
            },
        ]
    }

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    const handleChange = useCallback((item) => {
        console.log((item))
    })
    const handleRangeChange = useCallback((item) => {
        setRangesStart(item[0]);
        setRangesEnd(item[1]);
    })
    const handleAppointment = useCallback((item) => {
        setScheduleInterval(item)
    })
    const handleAvailabilityAdd = useCallback((item) => {
        let getAvailabiltys = getAvailabilty.length;
        let getAvailabiltyss = parseInt(getAvailabilty[getAvailabiltys - 1].db_id);
        setgetAvailabilty([...getAvailabilty, {
            "appointment_id": `${item.appointment_id}`,
            "available_day": "Sun",
            "day_end_time": "",
            "day_start_time": "",
            "db_id": `${++getAvailabiltyss}`,
            "user_id": item.user_id
        }
        ])
    })
    const handleAdjustedAdd = useCallback((item) => {
        let adjusteds = adjusted.length;
        let adjustedss = parseInt(adjusted[adjusteds - 1].db_id);
        setAdjusted([...adjusted, {
            "appointment_id": `${item.appointment_id}`,
            "available_dates": sedate,
            "date_end_time": "",
            "date_start_time": "",
            "db_id": `${++adjustedss}`,
            "user_id": item.user_id
        }
        ])
    })
    const handleAvailabilityRemove = useCallback((item) => {
        setgetAvailabilty(getAvailabilty.filter(ite => ite.db_id != item.db_id))
    })
    const handleAdjustedRemove = useCallback((item) => {
        console.log(item)
        setAdjusted(adjusted.filter(ite => ite.db_id != item.db_id))
    })
    const handleAvailabilityChange = useCallback((item, index) => {
        const updatedObject = { ...getAvailabilty[index], available_day: item };
        const updatedListss = [...getAvailabilty];
        updatedListss[index] = updatedObject;
        setgetAvailabilty(updatedListss);
    })
    const handleAvailabilityStartChange = useCallback((item, index) => {
        const updatedObject = { ...getAvailabilty[index], day_start_time: item };
        const updatedListss = [...getAvailabilty];
        updatedListss[index] = updatedObject;
        setgetAvailabilty(updatedListss);
    })
    const handleAvailabilityEndChange = useCallback((item, index) => {
        const updatedObject = { ...getAvailabilty[index], day_end_time: item };
        const updatedListss = [...getAvailabilty];
        updatedListss[index] = updatedObject;
        setgetAvailabilty(updatedListss);
    })
    const handleadjustedStartChange = useCallback((item, index) => {
        const updatedObject = { ...adjusted[index], date_start_time: item };
        const updatedListss = [...adjusted];
        updatedListss[index] = updatedObject;
        setAdjusted(updatedListss);
    })
    const handleadjustedEndChange = useCallback((item, index) => {
        const updatedObject = { ...adjusted[index], date_end_time: item };
        const updatedListss = [...adjusted];
        updatedListss[index] = updatedObject;
        setAdjusted(updatedListss);
    })
    const handleAvailabilityDate = useCallback((item, index, e) => {
        const updatedObject = { ...adjusted[index], available_dates: e };
        const updatedListss = [...adjusted];
        updatedListss[index] = updatedObject;
        setAdjusted(updatedListss);
    })

    const handleColorChange = (event) => {
        colorChangeRef2.current.value = colorChangeRef.current.value
    };
    // let availabiltyfrom = bookable?.Booking?.availabilty_from ? bookable?.Booking?.availabilty_from : dayjs()
    // let availabiltyto = bookable?.Booking?.availabilty_to ? bookable?.Booking?.availabilty_to : dayjs().add(1, 'day')
    let availabiltyfrom = bookable?.Booking?.availabilty_from ? dayjs(bookable.Booking.availabilty_from) : dayjs();
    let availabiltyto = bookable?.Booking?.availabilty_to ? dayjs(bookable.Booking.availabilty_to) : dayjs().add(1, 'day');

    if (availabiltyfrom && typeof availabiltyfrom === 'object') {
        availabiltyfrom = availabiltyfrom.add(1, 'month'); // Add one month
    }

    if (availabiltyto && typeof availabiltyto === 'object') {
        availabiltyto = availabiltyto.add(1, 'month'); // Add one month
    }
    // if (availabiltyfrom && typeof availabiltyfrom === 'object') {
    //     availabiltyfrom = availabiltyfrom.add(1, 'day'); // Add one day
    // }

    // if (availabiltyto && typeof availabiltyto === 'object') {
    //     availabiltyto = availabiltyto.add(1, 'day'); // Add one day
    // }

    useEffect(() => {
        if (bookable?.Booking?.availabilty_from == "" || bookable?.Booking?.availabilty_to == "") {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            setRangesStart(`${year}-${month}-${day}`);
            const nextDay = new Date(currentDate);
            nextDay.setDate(currentDate.getDate() + 1);
            const nextYear = nextDay.getFullYear();
            const nextMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
            const nextDayFormatted = String(nextDay.getDate()).padStart(2, '0');
            setRangesEnd(`${nextYear}-${nextMonth}-${nextDayFormatted}`);
        }
    }, [bookable?.Booking?.availabilty_from]);

    if (loading) return <Loader />;
    const submitbutton = {
        class: "btn btn-primary",
        text: "Save Bookable Schedule Time",
    };
    let initialValues = {
        schedule_title: bookable?.Booking?.schedule_title,
        schedule_status: bookable?.Booking?.appointment_status,
        schedule_iteration: bookable?.Booking?.appointment_interval,
        // schedule_slug: bookable?.Booking?.appointment_slug_url,
        buffer_time_interval: bookable?.Booking?.buffer_time_interval,
        buffer_time: bookable?.Booking?.is_buffer_time,
        max_time: bookable?.Booking?.is_max_time === "1" ? "1" : "0",
        min_time: bookable?.Booking?.is_min_time === "1" ? "1" : "0",
        min_time_per: bookable?.Booking?.min_time,
        max_time_per: bookable?.Booking?.max_time,
        booking_per_day: bookable?.Booking?.max_booking,
        max_booking: bookable?.Booking?.is_max_booking,
        schedule_availability: bookable?.Booking?.is_sechedule_availabilty,
        max_time_type: bookable?.Booking?.max_time_type ?? "days",
        min_time_type: bookable?.Booking?.min_time_type ?? "hours",
    }


    return (
        <div className="container-fluid">
            <div className='card'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                    {({ values, setFieldValue }) => (
                        <Form name="myForm">
                            <div className="card-header">
                                <h3 className="card-title">Bookable Appointment Schedule</h3>
                            </div>
                            <div className="row mx-2 my-3" >
                                <div className="col-md-5">
                                    <FormControl
                                        className="form-control my-1"
                                        label={Translation(translations, "Schedule Title")}
                                        name="schedule_title"
                                        control="input3"
                                        placeholder={Translation(translations, "Schedule Title")}
                                    />
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <div className="form-group my-2">
                                        <label className="form-label mb-3">Appointment duration</label>
                                        <div className="row">
                                            <div className="col-sm-3 col-md-4">
                                                <Field
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Period"
                                                    name="schedule_iteration"
                                                />
                                            </div>
                                            <div className="col-sm-6 col-md-8">
                                                <Dropdown
                                                    changes={(value) => handleAppointment(value)}
                                                    selected={scheduleInterval}
                                                    data={Minutes}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-2">
                                    {/* 
                                    <FormControl
                                        className="form-control my-1"
                                        label={Translation(translations, "URL Slug")}
                                        name="schedule_slug"
                                        control="input3"
                                        placeholder={Translation(translations, "URL Slug")}
                                    /> */}
                                </div>
                                <div className="col-sm-6 col-md-2">
                                    <SwitchCheck options={datass.Status} label='Enable' MainLabel={"Status"} name={"schedule_status"} />
                                </div>
                            </div>
                            <b className='mx-3'>Availability</b>
                            <br />
                            <div className='row mx-1 clearfix mb-4'>
                                <div className='col-sm-12 col-md-12 col-lg-1g row'>
                                    <div className='col-lg-2 col-md-5 mb-3 schedule-margin'>
                                        <b>Day</b>

                                    </div>
                                    <div className='col-lg-2 col-md-5 mb-3'>
                                        <b>Start Time</b>
                                    </div>
                                    <div className='col-lg-2 col-md-5 mb-3'>
                                        <b>End Time</b>
                                    </div>
                                    {
                                        getAvailabilty && !getAvailabilty?.message && getAvailabilty?.map((item, index) => {
                                            let selecstart = item.day_start_time.split(" ")
                                            let selecend = item.day_end_time.split(" ")
                                            return (
                                                <div className='row' key={index}>
                                                    <div className="col-lg-2 col-md-5">
                                                        <Dropdown
                                                            changes={(value) => handleAvailabilityChange(value, index)}
                                                            selected={item.available_day}
                                                            data={datass.day}
                                                        />
                                                    </div>
                                                    <div className="col-lg-2 col-md-6">
                                                        <div className="d-flex">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><FaRegClock /></span>
                                                            </div>
                                                            <div className='timesz'>  <Time changes={(value) => handleAvailabilityStartChange(value, index)} selected={selecstart[0] ? selecstart[0] : ""} /></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-6">
                                                        <div className="d-flex">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><FaRegClock /></span>
                                                            </div>
                                                            <div className='timesz'>  <Time changes={(value) => handleAvailabilityEndChange(value, index)} selected={selecend[0] ? selecend[0] : ""} /></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-1 col-md-2">
                                                        {
                                                            index == 0 &&
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAvailabilityAdd(item)}
                                                                className="btn btn-icon btn-primary btn-success Availabilityaddbtn"
                                                            >
                                                                <i className="fe fe-plus" />
                                                            </button>

                                                        }
                                                        {
                                                            index != 0 &&
                                                            <button type="button" onClick={() => handleAvailabilityRemove(item)} className="btn btn-danger Availabilityrebtn"> <i className="fa fa-times"></i></button>
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className='px-3 py-2'>
                                <b>Adjusted Availability</b>
                                <br />
                                Indicate times you're available for specific dates

                                <div className="row clearfix">
                                    <div className="col-lg-2 col-md-5">
                                        <b className="d-block">Date</b>
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <b>Start Time</b>
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <b>End Time</b>
                                    </div>
                                    <div className="col-lg-1 col-md-2">

                                    </div>
                                </div>
                                <br />
                                {
                                    adjusted && !adjusted?.message && adjusted?.map((item, index) => {
                                        let selecstart = item?.date_start_time ? item.date_start_time.split(" ") : ""
                                        let selecend = item?.date_end_time ? item.date_end_time.split(" ") : ""
                                        return (
                                            <div className="row clearfix my-2" key={index}>
                                                <div className="col-lg-2 col-md-5">
                                                    {/* <DatePicker
                                                        allowClear={false}
                                                        onChange={(value) => handleAvailabilityDate(item, index, value)}
                                                        value={item?.available_dates ? item?.available_dates : sedate}
                                                    /> */}
                                                    <div className="dropdown w-100">
                                                        <input onChange={(e) => handleAvailabilityDate(item, index, e.target.value)} className="dateHidden" type="date" value={item?.available_dates ? item?.available_dates : sedate} />
                                                        <button type='button' className="btn btn-secondary w-100 d-flex justify-content-between align-item-center">
                                                            <i className="fe fe-calendar"></i>
                                                            <span className="aspanval">{item?.available_dates ? item?.available_dates : sedate}</span>
                                                            <FaChevronDown />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-md-6">
                                                    <div className="d-flex">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><FaRegClock /></span>
                                                        </div>
                                                        <div className='timesz'>  <Time changes={(value) => handleadjustedStartChange(value, index)} selected={selecstart[0] ? selecstart[0] : ""} /></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2 col-md-6">
                                                    <div className="d-flex">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><FaRegClock /></span>
                                                        </div>
                                                        <div className='timesz'>  <Time changes={(value) => handleadjustedEndChange(value, index)} selected={selecend[0] ? selecend[0] : ""} /></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-1 col-md-2">
                                                    {
                                                        index == 0 &&
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAdjustedAdd(item)}
                                                            className="btn btn-icon btn-primary btn-success Availabilityaddbtn"
                                                        >
                                                            <i className="fe fe-plus" />
                                                        </button>

                                                    }
                                                    {
                                                        index != 0 &&
                                                        <button type="button" onClick={() => handleAdjustedRemove(item)} className="btn btn-danger Availabilityrebtn"> <i className="fa fa-times"></i></button>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }


                                <br />
                                <b>Maximum time in advance that an appointment can be booked</b>
                                <br />

                                <div className="row clearfix">
                                    <div className="col-sm-4 col-md-3">
                                        <div className="form-group edonrange d-flex">
                                            <label className="custom-control custom-checkbox custom-control-inline m-0">
                                                <Field type="checkbox" value={"1"} checked={values.max_time === "1"} onChange={() => setFieldValue("max_time", values.max_time === "0" ? "1" : "0")} className="custom-control-input" name="max_time" />
                                                <span className="custom-control-label"></span>
                                                <div className="d-flex input-daterange align-item-center gap-0">
                                                    <Field type="number" className="form-control w-100" name="max_time_per" />

                                                </div>
                                            </label>
                                            <Field as="select" name="max_time_type" id="" className='form-control ml-2'>
                                                <option value="days">Days</option>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <b>Minimum time before the appointment start that it can be booked</b>
                                <div className="row clearfix">
                                    <div className="col-sm-4 col-md-3">
                                        <div className="form-group edonrange d-flex">
                                            <label className="custom-control custom-checkbox custom-control-inline m-0">
                                                <Field type="checkbox" value={"1"} checked={values.min_time === "1"} onChange={() => setFieldValue("min_time", values.min_time === "0" ? "1" : "0")} className="custom-control-input" name="min_time" />            <span className="custom-control-label"></span>
                                                <div className="d-flex input-daterange align-item-center gap-0">
                                                    <Field type="number" className="form-control w-100" name="min_time_per" />
                                                </div>
                                            </label>
                                            <Field as="select" name="min_time_type" id="" className='ml-2 form-control'>
                                                <option value="hours">Hours</option>
                                                <option value="days">Days</option>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row clearfix">
                                    <SwitchCheck options={datass.buffer_time} MainLabel={"Appointment Settings"} name={"buffer_time"} />
                                </div>
                                <div className="row clearfix">
                                    <div className="row col-md-6" style={{ display: 'flex', height: 40, alignItems: 'center' }}>
                                        <div className="col-sm-2 col-md-3" style={{ marginTop: -12 }}>
                                            <FormControl
                                                className="form-control my-1"
                                                name="buffer_time_interval"
                                                control="input3"
                                                type={"number"} />
                                        </div>
                                        <div className="col-sm-2 col-md-4">
                                            <div className='mt-2 calenderselected'>
                                                <Dropdown
                                                    changes={(value) => handleChange(value)}
                                                    selected={scheduleInterval2}
                                                    data={Minutes} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="row clearfix">
                                    <SwitchCheck options={datass.maxBooking} MainLabel={""} name={"max_booking"} />
                                </div>
                                <div className="row">
                                    <div className="col-sm-2 col-md-4">
                                        <div className="form-group">
                                            <Field type="number" className="form-control" placeholder="Period" name="booking_per_day" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <SwitchCheck options={datass.schedule_availability} MainLabel={""} name={"schedule_availability"} />
                                </div>
                                <div className="row" style={{ marginLeft: -4 }}>
                                    <div className="col-sm-2 col-md-4 custom-width-ant-range">
                                        <DateRange
                                            changes={(value) => handleRangeChange(value)}
                                            selected={{ "start": availabiltyfrom, "end": availabiltyto }}
                                            data={Minutes}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sm-2 col-md-4 bokable">
                                        <div className="form-group">
                                            <label className='form-label'>Color</label>
                                            <div className='input-group'>
                                                <input ref={colorChangeRef2} type="text" className="form-control inputV" name="color_code" />
                                                <div className="input-group-append">
                                                    <input type="color" className="inputColor"
                                                        ref={colorChangeRef}
                                                        onChange={handleColorChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-14 bokable">
                                        <label className='form-label'>Instruction</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={content}
                                            onChange={handleEditorChange}
                                        />
                                    </div>
                                </div>

                            </div>



                            <div className="text-right col-md-12 mt-4 mb-2">
                                <SubmitButton
                                    props={submitbutton}
                                    buttonLoading={res.isLoading}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default BookableSchedule


