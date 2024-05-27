import React, { useEffect, useState,useContext,useRef } from 'react'
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';
import { toast } from "react-toastify";
import SubmitButton from '../components/SubmitButton';
import SwitchCheck from './components/SwitchCheck';
import { Form, Formik } from 'formik';
import SwitchButton from './components/SwitchButton';
import Checkbox from './components/Checkbox';
import FormControl from '../components/form/FormControl';
import config from "../services/config.json";
import { MainCalendarListContext } from "../context/MainCalendarListContext";
import { getTokenSession, removeTokenSession } from '../utils/common';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCalendar() {
  const { addCalendarList } = useContext(MainCalendarListContext);
  const hexCodeDefault = "#00aabb";
  let colorChangeRef = useRef(null);
  let colorChangeRef2 = useRef(null);
    const [res, apiMethod] = usePost();
    const [namess, setNamess] = useState({
        "calendar_name": "",
        "calendar_slug_url": "",
    })
    const initialValues = {
            "calendar_email_address": "",
            "calendar_privacy": "public",
            "calendar_default": "",
            "meet_room_creation": "",
            "calendar_location": "",
            "calendar_description": "",
    }
    const handleColorChange = (event) => {
      colorChangeRef2.current.value = colorChangeRef.current.value;
    };
    const handleSubmit = (values) => {  
        let formdata = new FormData();
        let bodyContent = formdata;
        for (let item in values) {
          if(item === "meet_room_creation" && !values[item]) {
            formdata.append(item, "0");
          }
          else if(item === "meet_room_creation" && values[item]) {
            formdata.append(item, "1");
          }
          else if(item === "calendar_default" && !values[item]) {
            formdata.append(item, "0");
          }
          else {
            formdata.append(item, values[item]);
              }
        }
        formdata.append("calendar_name", namess.calendar_name);
        formdata.append("calendar_slug_url", namess.calendar_slug_url);
        formdata.append("calendar_color", colorChangeRef2.current.value);
if(namess.calendar_name === "" ||  values.calendar_email_address === "") {
    swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
}
else {
    apiMethod(`postCreateCalendar`, bodyContent);
}                 
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (res.data && !res.isLoading) {
            res.data.message && toast.success(res.data.message); 
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios.get(`${config.apiEndPoint}getAllCalendars/`)
              .then((response) => {
                addCalendarList(response.data);
              })
              .catch((error) => {
                if (error?.response?.status === 500) {
                  removeTokenSession("token");
                } else if (error?.response?.status === 401) {
                  toast.error(error.response.data.message);
                } else {
                  toast.error("Something went wrong. Please try again later.");
                }
              });
              navigate(`/${config.ddemoss}calendar`);
        }
    }, [res.data])
    const datass = {
        "priv" : [
            {
                "label": "Public",
                "value": "public",
            },
            {
                "label": "Private",
                "value": "private",
            },
        ],
        "system" : [
            {
                "label": "Default",
                "value": "1", 
            }
        ],
        "Meet": ["Enable"]
    }
    const submitbutton = {
        class: "btn btn-primary mt-3 ml-auto d-block",
        text: "Save Calendar",
      };
      
  return (
    <div className="container-fluid">
        <div className="row clearfix">
            <div className="col-lg-12">
                <div className="card borderblue">
                    <div className="card-header">
                        <div className="card-title">New Calendar</div>
                    </div>
                    <div className="card-body">
                        <div className="row clearfix">
        
       <Formik initialValues={initialValues}  onSubmit={handleSubmit} >
      <Form name="myForm">
      <div className="row clearfix">
                    <div className="col-md-4 col-sm-12">
                    <div className="form-group my-2">
                     <label><b>Calendar Name<span style={{"color": "red"}}> *</span></b></label>
                    <input className="form-control" placeholder="Public URL of this calendar" type="text" name="calendar_name" value={namess.calendar_name || ""} onChange={(e) => setNamess({...namess,"calendar_name": e.target.value,"calendar_slug_url": e.target.value})} />
                    </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                    <FormControl className="form-control" required={true} label={"Email address"} name="calendar_email_address" control="input" placeholder="Email address"  />
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="form-group my-2">
                            <label><b>URL Slug</b></label>
                            <input className="form-control" placeholder="Public URL of this calendar" type="text" name="calendar_slug_url" value={(namess.calendar_slug_url).replaceAll(" ", "_") || ""} onChange={(e) => setNamess({...namess,"calendar_slug_url": e.target.value})} />
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
                    <FormControl className="form-control"  label={"Location"} name="calendar_location" control="input" placeholder="Location address"  />
                    </div>
                    <div className="col-md-12">
                    <FormControl className="form-control"  label={"Description"} name="calendar_description" control="input" placeholder="Description"  />
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateCalendar