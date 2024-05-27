import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import usePost from "./customHooks/usePost";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StringConvert } from "./components/StringConvert";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Formik } from "formik";
import FormControl from "./components/form/FormControl";
import { Translation } from "./components/Translation";
import { MainTranslationContexts } from "./context/MainTranslationContexts";
import calendarImage from "./dist/webImages/calender-default.png";
import swal from "sweetalert";
import config from "./services/config.json";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { getTokenSession } from "./utils/common";
function AppoinmentCalender() {
  const { name } = useParams();
  const [show, setShow] = useState(false);
  const [uname, setuname] = useState();
  const [date, setdate] = useState();
  const [time, settime] = useState();

  const handleShow = () => setShow(true);
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [res3, apiMethod3] = usePost();
  const [restime3, apiMethodtime] = usePost();
  const [allData, setallData] = useState(false);
  const [clickedDate, setclickedDate] = useState("");
  const [showCalender_time, setshowCalender_time] = useState("date_picker");
  const [timeData, settimeData] = useState([]);
  const [highlightDatesArr, sethighlightDatesArr] = useState(false);
  const [selectedDates, setSelectedDates] = useState(false);
  const [emails, setEmails] = useState("");
  const [emailse, setEmailse] = useState(false);
  const { translations } = useContext(MainTranslationContexts);
  const [CalenderCredential, setCalenderCredential] = useState({
    posted_date: "",
    posted_calendar_id: "",
    calendar_user_id: "",
    posted_time: "",
  });
  const [Number, setNumber] = useState();
  const [CountryCode, setCountryCode] = useState();
  const handleClose = () => {
    setshowCalender_time("date_picker");
    setShow(false);
  };
  const [initialValues, setInitialValues] = useState({
    fname: "",
    lname: "",
    email: "",
    description: "",
  });
  useEffect(() => {
    let formdata = new FormData();
    formdata.append("url", name);
    apiMethod("postAppointmentSedule", formdata);
  }, [name]);

  useEffect(() => {
    if (res.data) {
      setallData(res.data);
    }
  }, [res]);

  useEffect(() => {
    if (res3.data) {
      setuname(res3.data.user_name);

      const [time1, date1] = res3.data.booked_time.split(", ");
      setdate(date1);
      settime(time1);
      setShow(true);
    }
  }, [res3]);

  useEffect(() => {
    if (res2.data) {
      settimeData(res2.data);
      setCalenderCredential((prevState) => ({
        ...prevState,
        posted_date: res2.data.posted_date,
        posted_calendar_id: res2.data.posted_calendar_id,
        calendar_user_id: res2.data.calendar_user_id,
      }));
    }
  }, [res2.data]);

  useEffect(() => {
    if (allData) {
      if (!allData?.message) {
        console.log(allData.availableDates
          
          .map((v) => new Date(v?.date)));
        sethighlightDatesArr(
          allData.availableDates
          
            .map((v) => new Date(v?.date))
            .sort((a, b) => {
              const dateA = new Date(a);
              const dateB = new Date(b);
              return dateA - dateB;
            })
        );
        setSelectedDates(
          allData.availableDates
            .map((v) => ({date:new Date(v?.date),is_available:v?.is_available}))
            .sort((a, b) => {
              const dateA = new Date(a?.date);
              const dateB = new Date(b?.date);
              return dateA - dateB;
            })
        );
      }
    }
  }, [allData]);
  useEffect(() => {
    if (restime3.data) {
      if (restime3.data.message == "Time Slot Available") {
        setshowCalender_time("appointment_form");
      } else {
        swal({
          title: restime3.data.message,
          icon: "warning",
          dangerMode: true,
        });
      }
    }
  }, [restime3.data]);
  useEffect(() => {
    if (highlightDatesArr) {
      let classdiv = document.querySelector(".calender_white_card_left");
      highlightDatesArr.map((v) => {
        if (v.toDateString() === new Date().toDateString()) {
          classdiv.classList.add("current_date_class");
        }
      });
    }
  }, [highlightDatesArr]);
  // Set up state for selected dates

  // Handle date changes
  const handleDateChange = (date) => {
    selectedDates &&
      selectedDates.map((v) => {
       if(v.is_available==="true"){ if (v?.date?.toDateString() === date.toDateString()) {
          if (new Date(date) >= new Date(new Date().toLocaleDateString())) {
            setshowCalender_time("time_picker");
            setclickedDate(date);
            let sendObj = {
              query:
                date.getFullYear() +
                "-" +
                ("0" + (date.getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + date.getDate()).slice(-2),
              cltype: "clbooking",
              clbooking: "bookable_shcedule_date",
              clbook: allData.calendar_id,
              clbookpt: allData.booking.db_id,
              url: name,
            };

            apiMethod2("postAppointmentSeduleTime", sendObj);
          }
        }}
      });
  };
  const handleOnTimeClick = (time) => {
    const clickedDate1 =
      clickedDate.getFullYear() +
      "-" +
      ("0" + (clickedDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + clickedDate.getDate()).slice(-2);

    setCalenderCredential((prevState) => ({
      ...prevState,
      posted_time: time,
    }));

    // setshowCalender_time("appointment_form");
    let formdata = new FormData();
    formdata.append("query", time);
    formdata.append("clbooking", "bookable_shcedule_date_time");
    formdata.append("clbook", allData.calendar_id);
    formdata.append("clbookpt", allData.booking.db_id);
    formdata.append("posted_date", clickedDate1);
    formdata.append("calendar_user_id", res2.data.calendar_user_id);
    formdata.append("url", name);

    apiMethodtime("postAppointmentSeduleForm", formdata);
  };

  const handleSubmit = (values) => {

    let reqNameObj = [
      { name: "fname", label: "First Name" },
      { name: "lname", label: "Last Name" },
      { name: "description", label: "Description" },
    ]
    let reqName = []
    let formdata = new FormData();
    reqNameObj.map(val => {
      if (values[val.name] === "") {
        reqName.push(val.label)
      }

    })
    if (!Number || Number === "1") {
      reqName.push("Phone Number")
    }
    if (!emails) {
      reqName.push("Email")
    }

    console.log(Number, "Phone Number");
    if (
      !reqName.length
    ) {
      if (emailse) {
        swal({
          title: "Email already used:",
          text: emails,
          icon: "warning",
          dangerMode: true,
        });
        return false;
      }
      formdata.append("clbooking", "bookable_shcedule_date_time");
      formdata.append("fname", values.fname);
      formdata.append("lname", values.lname);
      formdata.append("email", emails);
      // formdata.append("phone_number_code", CountryCode);
      formdata.append("phone", Number);
      formdata.append("comments", values.description);
      formdata.append("posted_date", CalenderCredential.posted_date);
      formdata.append("posted_time", CalenderCredential.posted_time);
      formdata.append(
        "posted_calendar_id",
        CalenderCredential.posted_calendar_id
      );
      formdata.append("calendar_user_id", CalenderCredential.calendar_user_id);
      formdata.append("url", name);
      apiMethod3("postAppointmentSeduleSubmitForm", formdata);
    } else {
      swal({
        title: "Please fill all the fields!",
        text: `${reqName.join(", ")} ${reqName.length === 1 ? "is" : "are"} empty`,
        icon: "warning",
        dangerMode: true,
      });
    }
  };
  const handleEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(e)) {


      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };

      axios
        .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
        .then((res) => {
          setEmailse(res.data.aleady_exist);

        })
        .catch((err) => {
          console.log("create errr", err);
        });




    }

    setEmails(e);
  };
  const currentDate = new Date();
  if (allData?.message) return "No Data";
  document.querySelector(`[rel=icon]`).setAttribute("href", `${config.baseurl2}${allData["system_favicon"]}`)
  document.querySelector(`[rel=apple-touch-icon]`).setAttribute("href", `${config.baseurl2}${allData["system_favicon"]}`)
  return (
    <div className="appointment_calender_main w-100 ">
      {/* <Helmet>
        <link
          rel="icon"
          href={`${config.baseurl2}${allData?.system_favicon}`}
        />
        <link
          rel="apple-touch-icon"
          href={`${config.baseurl2}${allData?.system_favicon}`}
        />
      </Helmet> */}
      {allData.user && (
        <div className="calender_white_card">
          <div className="container-fluid p-0">
            <div className="row clearfix m-0" id="flowBooking">
              <div className="col-lg-5 col-md-12 p-0">
                <div className="flowBooking__left">
                  <div className="flowBooking__left-top">
                    <img
                      src={
                        allData?.system_avatar &&
                          allData?.system_avatar.includes("http")
                          ? allData?.system_avatar
                          : `${config.baseurl2}${allData?.system_avatar} `
                      }
                      alt=""
                      className=""
                    />
                  </div>
                  <div className="flowBooking__left_user_image p-1 ">
                    <img
                      src={
                        allData?.user?.avatar &&
                          allData?.user?.avatar.includes("http")
                          ? allData?.user?.avatar
                          : `${config.baseurl2}${allData?.user?.avatar} `
                      }
                      alt=""
                      className="w-100 h-100 rounded-circle"
                    />
                  </div>
                  <div className="flowBooking__left-bottom">
                    <div className="mt-3">
                      <p className="lead mb-1">{allData.user.name}</p>
                      <h3>{allData.booking.schedule_title}</h3>
                    </div>
                    <div className="">
                      <p className="text-muted m-b-0">
                        <small></small>
                      </p>
                      <ul className="p-0 list">
                        <li>
                          <small className="d-flex gap-1 align-items-center">
                            <i className="fa-solid fa-clock"></i>
                            <span>
                              {allData.booking.buffer_time_interval}
                              {allData.booking.buffer_time_duration}
                            </span>
                          </small>
                        </li>
                        <li>
                          <small className="d-flex gap-1 align-items-center">
                            <i className="fa-solid fa-globe"></i>
                            <span>{allData.time_zone}</span>
                          </small>
                        </li>
                      </ul>
                      <div></div>

                      <p></p>

                      {/* <p className="text-muted m-b-0">Instructions HTML Area</p> */}
                      <p className="text-muted m-b-0">{StringConvert(allData?.booking?.instructions)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 p-0 flowBooking__right">
                {res2.isLoading || restime3.isLoading ? (
                  <span className="span_loader">
                    <i className="fa fa-pulse fa-spinner"></i>
                  </span>
                ) : (
                  <div className="calender_white_card_left">
                    {showCalender_time === "date_picker" ? (
                      <DatePicker
                        minDate={new Date()}
                        maxDate={
                          highlightDatesArr &&
                          new Date(
                            highlightDatesArr[highlightDatesArr.length - 1]
                          )
                        }
                        selected={null}
                        onChange={handleDateChange}
                        highlightDates={
                          highlightDatesArr &&
                          highlightDatesArr.map(
                            (v) => new Date(v) >= new Date() && new Date(v)
                          )
                        }
                        inline
                        shouldCloseOnSelect={false}
                        monthsShown={1}
                        showPreviousMonths={false}
                        isClearable={true}
                      />
                    ) : showCalender_time === "time_picker" ? (
                      <div>
                        <div>
                          <button
                            className="rounded-circle border appprebutton"
                            type="button"
                            onClick={() => {
                              setshowCalender_time("date_picker");
                            }}
                          >
                            <i className="fa-solid fa-chevron-left"></i>
                          </button>
                          <br />
                          <br />
                          <p>{clickedDate.toDateString()}</p>
                        </div>
                        <div
                          className="selectgroup selectgroup-pills"
                          style={{ width: "100%" }}
                        >
                          {timeData.time_array &&
                            timeData.time_array.length &&
                            timeData.time_array.map((v, i) => {
                              return (
                                <React.Fragment key={i}>
                                  {timeData?.bookTime[i] === "true" ?

                                    <div
                                      className="appointment_time_box border selectgroup-button  cursor-pointer w-100 m-2 mt-0 py-2 text-center"
                                      key={i}
                                      style={{ background: "#26405c" }}
                                    >
                                      <span className=" ">{v}</span>
                                    </div>
                                    :
                                    <div
                                      onClick={() => {
                                        handleOnTimeClick(v);
                                      }}
                                      className="appointment_time_box border selectgroup-button  cursor-pointer w-100 m-2 mt-0 py-2 text-center"
                                      key={i}
                                    >
                                      <span className=" ">{v}</span>
                                    </div>

                                  }

                                </React.Fragment>
                              );
                            })}
                        </div>
                      </div>
                    ) : showCalender_time === "appointment_form" ? (
                      <div>
                        <button
                          className="appprebutton rounded-circle border"
                          type="button"
                          onClick={() => {
                            setshowCalender_time("time_picker");
                          }}
                        >
                          <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className="">
                          <div className="card-body">
                            <Formik
                              initialValues={initialValues}
                              onSubmit={handleSubmit}
                            >
                              <Form name="myForm">
                                <h3 className="">Enter Details</h3>
                                <div className="row clearfix fv-plugins-icon-container">
                                  <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                      <FormControl
                                        label={Translation(
                                          translations,
                                          `${"First Name"}`
                                        )}
                                        type="text"
                                        className="form-control"
                                        name="fname"
                                        placeholder="First Name"
                                        control="input"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-6 col-md-12">
                                    <div className="form-group">
                                      <FormControl
                                        label={Translation(
                                          translations,
                                          `${"Last Name"}`
                                        )}
                                        type="text"
                                        className="form-control"
                                        name="lname"
                                        control="input"
                                        placeholder="Last Name"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      {/* <label>Email</label> */}
                                      {/* <FormControl
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        control="input"
                                        placeholder="Enter Email"
                                      /> */}
                                      <FormControl
                                        type="email"
                                        className="form-control my-1"
                                        required={true}
                                        label={Translation(
                                          translations,
                                          `${"E-mail"}`
                                        )}
                                        name="email"
                                        control="input"
                                        defaultValue={emails}
                                        onChange={(e) =>
                                          handleEmail(e.target.value)
                                        }
                                        placeholder={Translation(
                                          translations,
                                          `${"E-mail"}`
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-12 col-md-12">
                                    <FormControl
                                      className="form-control my-1"
                                      updatess={(item, code) => {
                                        setNumber(item);
                                        setCountryCode(`+${code.dialCode}`);
                                      }}
                                      label={Translation(
                                        translations,
                                        `${"Phone"}`
                                      )}
                                      control="Intl2WithValue"
                                    />
                                    <div className="fv-plugins-message-container invalid-feedback"></div>
                                  </div>

                                  <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                      <label>
                                        Please share anything that will help
                                        prepare for our meeting.
                                      </label>
                                      <FormControl
                                        type="textarea"
                                        className="form-control"
                                        name="description"
                                        control="textarea3"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row clearfix">
                                  <div className="col-lg-12 mt-3">
                                    <button
                                      type="submit"
                                      className="btn btn-primary Appointmentbtn"
                                    >
                                      Book Appointment
                                    </button>
                                  </div>
                                </div>
                              </Form>
                            </Formik>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bookingmobileheading">
          <Modal.Title>Appointment Booked</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Name:{uname}</h5>
          <h5>Date:{date}</h5>

          <h5>Time:{time}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AppoinmentCalender;
