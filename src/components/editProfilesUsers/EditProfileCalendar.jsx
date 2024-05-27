import React, { useState, useEffect } from 'react'
import usePost from '../../customHooks/usePost';
import "react-loading-skeleton/dist/skeleton.css";
import { Form, Formik } from 'formik';
import SwitchButton from '../form/SwitchButton';
import ProfileCheckbox from '../form/ProfileCheckbox';
import SubmitButton from '../SubmitButton';
import Checkbox2 from '../form/Checkbox2';
import { toast } from "react-toastify";
import FormControl from '../form/FormControl';
import { PrivilegesCalander } from '../../Data/AllData';


function EditProfileCalendar({ data, useIDD, reCallAPI }) {
  let md5 = require('md5');
  const [deflData, setDeflData] = useState(data);
  let feild = data?.fields;
  let feild2 = {
    "active_module": data?.active_module,
    "mod_create": data?.module_create,
    "mod_delete": data?.module_delete,
    "mod_edit": data?.module_edit,
    "mod_view": data?.module_view
  };
  const allfeild = { ...feild, ...feild2 }
  PrivilegesCalander.map(field => {
    if (!allfeild.hasOwnProperty(field)) {
      allfeild[field] = "false";
    }
  })
  const [initialValues, setInitialValues] = useState(allfeild)

  const [res, apiMethod] = usePost();
  const [datas, setDatas] = useState();
  const submitbutton = {
    "class": "btn btn-primary mt-3 ml-auto d-block",
    "text": "Store User"
  }
  const handlevalUpdate = (item) => {
    let itemval = item.target.getAttribute("value");
    let itemname = item.target.getAttribute("name");
    setInitialValues({ ...initialValues, [itemname]: itemval })
  }
  let obj = initialValues;
  const handleFunction = (e, setFieldValue) => {
    let targetid = e.target.getAttribute('data-id');
    let checkBox_name = ["mod_view", 'active_module', 'mod_create', 'mod_edit', 'mod_delete', 'calendar_events','calendar_event_create','calendar_event_view','calendar_event_edit','calendar_event_delete']
    for (let index in initialValues) {
      if (!checkBox_name.includes(index)) {
        setFieldValue(index, targetid);
      }
    }
    for (let index in initialValues) {
      obj = { ...obj, [index]: targetid }
    }
    setInitialValues(obj)
  }
  function handleSubmit(values) {
    let formdatas = new FormData();

    for (let item in values) {
      formdatas.append(item, values[item]);
    }
    formdatas.append("profile_id", useIDD);
    formdatas.append("module", "calendar");
    // let aaa = md5('q1typeGtProfileUpd')
    formdatas.append("modules_name", 'user_module');
    formdatas.append("typeGtProfileUpd", 'typeGtProfileUpd');
    formdatas.append("general", 'typeGtProfileUpd');
    apiMethod("postUpdateProfilePrivileges", formdatas);
  }

  useEffect(() => {
    if (res.data && !res.isLoading) {
      toast.success(res.data.message);
      reCallAPI()
    }

  }, [res.data])





  return (<>
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form name="myForm">
          <h3 className="card-title">
            <Checkbox2 label={"Enable/Disable Module "} name="active_module" checkedd={initialValues.active_module} />
          </h3>
          <div className="row clearfix">
            <div className="col-sm-6 col-md-3">
              <Checkbox2 label="View" name="mod_view" checkedd={initialValues.mod_view} />
            </div>
            <div className="col-sm-6 col-md-3">
              <Checkbox2 label="Create" name="mod_create" checkedd={initialValues.mod_create} />
            </div>
            <div className="col-sm-6 col-md-3">
              <Checkbox2 label="Edit" name="mod_edit" checkedd={initialValues.mod_edit} />
            </div>
            <div className="col-sm-6 col-md-3">
              <Checkbox2 label="Delete" name="mod_delete" checkedd={initialValues.mod_delete} />
            </div>
          </div>
          <hr />
          <div className="row mb-4 adet">
            <div className="col-md-6"> Standard Fields </div>
            <div className="col-md-6 text-right">
              <i className="fa fa-circle fa-false" data-id="false" onClick={(e) => handleFunction(e, setFieldValue)}></i> Invisible &nbsp;
              <i className="fa fa-circle fa-1" data-id="-1" onClick={(e) => handleFunction(e, setFieldValue)}></i> Read-only
              &nbsp;
              <i className="fa fa-circle fa-true" data-id="true" onClick={(e) => handleFunction(e, setFieldValue)}></i> Write

            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <div>
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_name} name={"calendar_name"} dataprop={"Calendar Name"} />
              </div>
              <div className="mt-2">
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_email} name={"calendar_email"} dataprop={"Email"} />
              </div>
              <div className="mt-2">
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_slug} name={"calendar_slug"} dataprop={"URL Slug"} />
              </div>
              <div className="mt-2">
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_privacy} name={"calendar_privacy"} dataprop={"Privacy"} />
              </div>
              <div className='mt-2'>
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_system_status} name={"calendar_system_status"} dataprop={"System Status"} />
              </div>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="mt-2">
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_google_meet} name={"calendar_google_meet"} dataprop={"Google Meet"} />
              </div>
              <div className="mt-2">
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_location} name={"calendar_location"} dataprop={"Location"} />
              </div>
              <div className="mt-2">
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_description} name={"calendar_description"} dataprop={"Description"} />
              </div>
              <div className='mt-2'>
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_color} name={"calendar_color"} dataprop={"Calendar Color"} />
              </div>
              <div className="mt-2">
                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.calendar_settings} name={"calendar_settings"} dataprop={"Calendar Settings"} />
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-sm-12 col-md-12 mt-5">
              <h6>Others</h6>
              <hr className="mt-0" />
            </div>
            <div className="col-sm-12 col-md-12">
              <ul className="nav nav-tabs page-header-tab" id="myTab" role="tablist">
                <li className="nav-item">
                  <FormControl
                    name={`calendar_events`}
                    control="input4"
                    defaultd={initialValues[`calendar_events`]}
                  />
                  <a className="nav-link active show" data-toggle="tab" href="#admininfo">
                    Events
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade active show" id="admininfo" role="tabpanel">
                  <div className="row">
                    <div className="col-sm-4 col-md-4">
                      <SwitchButton checked={initialValues.calendar_event_create} label='Created' name='calendar_event_create' />
                      <SwitchButton checked={initialValues.calendar_event_delete} label='Delete' name='calendar_event_delete' />
                    </div>
                    <div className="col-sm-4 col-md-4">
                      <SwitchButton checked={initialValues.calendar_event_view} label='View' name='calendar_event_view' />
                    </div>
                    <div className="col-sm-4 col-md-4">
                      <SwitchButton checked={initialValues.calendar_event_edit} label='Edit' name='calendar_event_edit' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
        </Form>
      )}
    </Formik>
  </>
  )
}

export default EditProfileCalendar