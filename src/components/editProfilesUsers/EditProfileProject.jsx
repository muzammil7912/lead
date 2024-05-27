import React, { useEffect, useRef, useState } from 'react'
import usePost from '../../customHooks/usePost';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { Form, Formik } from 'formik';
import SwitchButton from '../form/SwitchButton';
import ProfileCheckbox from '../form/ProfileCheckbox';
import { toast } from "react-toastify";
import SubmitButton from '../SubmitButton';
import Checkbox2 from '../form/Checkbox2';
import FormControl from '../form/FormControl';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { PrivilegesProjects } from '../../Data/AllData';


function EditProfileProject({ data, useIDD, reCallAPI }) {
  const [firstval, setFirstval] = useState("");
  const isComponentMounted = useRef(true);
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
  PrivilegesProjects.map(field => {
      if (!allfeild.hasOwnProperty(field)) {
          allfeild[field] = "false";
      }
  })
const [initialValues, setInitialValues] = useState(allfeild)
  const [resGet, apiMethodGet] = usePost();
  const [res, apiMethod] = usePost();
  const [datas, setDatas] = useState();
  useEffect(() => {
    if (isComponentMounted.current) {
      handleGet();
    }
    else {
      setDatas(resGet.data)
    }
    return () => {
      isComponentMounted.current = false;
    };

  }, [resGet]);
  const submitbutton = {
    "class": "btn btn-primary mt-3 ml-auto d-block",
    "text": "Store User"
  }
  useEffect(() => {
		if(datas) {
		   {Object.keys(datas).map((item, index) => {
			   index === 0 &&  setFirstval(item)
             
		   })}
		}
	   }, [datas])
  function handleGet() {
    let OpportunitiesData = new FormData();
    OpportunitiesData.append("type", "allCustomFields");
    OpportunitiesData.append("table_name", "projects_pipelines");
    OpportunitiesData.append("module", "Opportunity");
    apiMethodGet("postAllPipelinesCustomFields", OpportunitiesData);
  }
  const handlevalUpdate = (item) => {
    let itemval = item.target.getAttribute("value");
    let itemname = item.target.getAttribute("name");
    setInitialValues({ ...initialValues, [itemname]: itemval })
  }
  function handleSubmit(values) {
    let formdatas = new FormData();

    for (let item in values) {
        if(item.includes("projects_pip_")) {
            if(`${values[item]}` === "") {

            }
            // formdatas.append(item, values[item]);
            else {
                formdatas.append(item, values[item]);       
            }
        }
        else {
            formdatas.append(item, values[item]);       
        }
      }
    formdatas.append("profile_id", useIDD);
    formdatas.append("module", "projects");
    // let aaa = md5('q1typeGtProfileUpd')
    formdatas.append("modules_name", 'user_module');
    formdatas.append("typeGtProfileUpd", 'typeGtProfileUpd');
    formdatas.append("general", 'typeGtProfileUpd');
    apiMethod("postUpdateProfilePrivileges", formdatas);
  }
  let obj = initialValues;
	const handleFunction = (e, setFieldValue) => {
    let targetid = e.target.getAttribute('data-id');
let checkBox_name=["mod_view",'active_module','mod_create','mod_edit','mod_delete','projects_pip_Financing','projects_pip_Tab_Buyer','projects_pip_Muzammil_Tab','projects_pip_Design','projects_pip_Standard','projects_pip_Muzzamil_Shah','projects_admin_create_date','projects_admin_updated_date','projects_admin_prjstage_dates','projects_stage_create','projects_stage_view','projects_stage_edit','projects_stage_delete','projects_stage_setting','projects_pipeline_create','projects_pipeline_view','projects_pipeline_edit']
    for (let index in initialValues) {
      if(!checkBox_name.includes(index)){  
  setFieldValue(index, targetid);
}
    }
    for (let index in initialValues) {
        obj = { ...obj, [index]: targetid }
    }
    setInitialValues(obj)
}
  useEffect(() => {
    if (res.data && !res.isLoading) {
      toast.success(res.data.message);
      reCallAPI()
    }

  }, [res.data])
  return (<>
    {!datas ? <Skeleton count={25} /> :
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
              <div className="col-sm-4 col-md-4">
                <div>
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_title} name={"projects_prj_title"} dataprop={"Project  Title"} />
                </div>
                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_assignto} name={"projects_prj_assignto"} dataprop={"Assign to"} />
                </div>
                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_pipeline} name={"projects_prj_pipeline"} dataprop={"Pipeline"} />
                </div>

                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_notes} name={"projects_prj_notes"} dataprop={"Notes"} />
                </div>
                <div className='mt-2'>
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_stage} name={"projects_prj_stage"} dataprop={"Project  Stage"} />
                </div>
              </div>
              <div className="col-sm-4 col-md-4">
                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_description} name={"projects_prj_description"} dataprop={"Description"} />
                </div>

                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_status} name={"projects_prj_status"} dataprop={"Status"} />
                </div>

                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_startdate} name={"projects_prj_startdate"} dataprop={"Start Date"} />
                </div>
                <div className='mt-2'>
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_enddate} name={"projects_prj_enddate"} dataprop={"End Date"} />
                </div>
                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_location} name={"projects_prj_location"} dataprop={"Location"} />
                </div>
              </div>


              <div className="col-sm-4 col-md-4">

                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_tags} name={"projects_prj_tags"} dataprop={"Tags"} />
                </div>

                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_fileupload} name={"projects_prj_fileupload"} dataprop={"File Upload"} />
                </div>
                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_file_delete} name={"projects_prj_file_delete"} dataprop={"File Delete"} />
                </div>
                <div className="mt-2">
                  <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.projects_prj_relatedto} name={"projects_prj_relatedto"} dataprop={"Related To"} />
                </div>
              </div>

            </div>
            <div className="row clearfix">
              <div className="col-sm-12 col-md-12 mt-5">
                <h6>Pipelines</h6>
                <hr className="mt-0" />
              </div>
              <div className="col-sm-12 col-md-12">
              {firstval  &&
                <Tab.Container  defaultActiveKey={firstval}>
                <div className="row">
                  <div className="col-sm-3 col-md-3">
                  <Nav  className="nav flex-column nav-pills">
                      {Object.keys(datas).map((item, index) => {
                        return (
                          <Nav.Link eventKey={item} key={index}> {item.replaceAll('_', ' ')}</Nav.Link>)
                      })}
                  </Nav>
                  </div>
                  <div className="col-sm-12 col-md-9">
                  <Tab.Content id="v-pills-tabContent">
                      {Object.keys(datas).map((item, index1) => {
                        let itemu = item.replaceAll('-', '');
                        return (
                          <Tab.Pane key={index1}  eventKey={item}>
                            <div className="col-sm-12 col-md-12">
                              <SwitchButton label={`${item.replaceAll('_', ' ')}`} name={`projects_pip_${itemu}`} checked={initialValues[`projects_pip_${itemu}`] ? initialValues[`projects_pip_${itemu}`] : ""} />
                            </div>
                            <div className="col-sm-12 col-md-12 mt-1">
                              <h6>Custom Fields</h6>
                              <hr className="mt-0" />
                            </div>
                            <Tab.Container  defaultActiveKey={"0"}>
                            <Nav  className="nav nav-tabs page-header-tab" id="myTab" role="tablist">
                              {datas[item] && Object.keys(datas[item]).map(function (item2, index2) {
                                const objname = Object.keys(datas[item])[index2];
                                return (
                                  <li className="nav-item" key={index2}>
                                    <FormControl
                                      name={`projects_pip_${item2}`}
                                      control="input4"
                                      defaultd={initialValues[`projects_pip_${item2}`]}
                                    />
                                    <Nav.Link eventKey={index2} >
                                                                          &nbsp; {objname.replaceAll('_', ' ')}
                                                                      </Nav.Link>
                                  </li>)
                              })}
                          </Nav>
                          <Tab.Content id="myTabContent">
                              {datas[item] && Object.keys(datas[item]).map(function (item2, index2) {
                                return (
                                  <Tab.Pane  key={index2} eventKey={index2}>
                                    <div className="row">
                                      {datas[item][item2] && datas[item][item2] && Object.keys(datas[item][item2]).map((item3, index3) => {
                                        return (
                                          <div key={index3}>
                                            {item3}
                                            <div className='row'>
                                              {datas[item][item2] && datas[item][item2][item3] && Object.keys(datas[item][item2][item3]).map((item4, index4) => {
                                                const { label } = datas[item][item2][item3][item4]
                                                return (
                                                  <div className="col-md-6" key={index4}>
                                                    <ProfileCheckbox updateClick={(ite) => handlevalUpdate(ite)} datas={initialValues[`projects_${label}`] ? initialValues[`projects_${label}`] : ""} name={`projects_${item4}`} dataprop={label} />
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          </div>

                                        )
                                      })}
                                    </div>
                                  </Tab.Pane>
                                )
                              })}
                            </Tab.Content>
                            </Tab.Container>


                          </Tab.Pane>
                        )
                      })}
                    </Tab.Content>
                  </div>
                </div>
                </Tab.Container>
                    }
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-12 col-md-12 mt-5">
                <h6>Tabs</h6>
                <hr className="mt-0" />
              </div>

              <div className="col-sm-12 col-md-12">
                <ul className="nav nav-tabs page-header-tab" id="myTab" role="tablist">
                  <li className="nav-item">
                    <FormControl
                      name={`projects_admininfo`}
                      control="input4"
                      defaultd={initialValues[`projects_admininfo`]}
                    />
                    <a className="nav-link active show" data-toggle="tab" href="#admininfo">
                      Admin
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade active show" id="admininfo" role="tabpanel">
                    <div className="row">
                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_admin_create_date} label='Created Date' name='projects_admin_create_date' />
                      </div>

                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_admin_updated_date} label='Update Date' name='projects_admin_updated_date' />

                      </div>

                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_admin_prjstage_dates} label='Opportunity Stage Dates' name='projects_admin_prjstage_dates' />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-12 col-md-12">
                <div className="col-sm-12 col-md-12 mt-5">
                  <h6>Stages</h6>
                  <hr className="mt-0" />
                </div>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade active show" id="admininfo" role="tabpanel">
                    <div className="row">
                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_stage_create} label='Created ' name='projects_stage_create' />
                        <SwitchButton checked={initialValues.projects_stage_delete} label='Delete' name='projects_stage_delete' />
                      </div>

                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_stage_view} label='View' name='projects_stage_view' />
                        <SwitchButton checked={initialValues.projects_stage_setting} label='Settings' name='projects_stage_setting' />

                      </div>

                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_stage_edit} label='Edit' name='projects_stage_edit' />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row clearfix">
              <div className="col-sm-12 col-md-12 mt-5">
                <h6>Pipelines</h6>
                <hr className="mt-0" />
              </div>
              <div className="col-sm-12 col-md-12">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade active show" id="admininfo" role="tabpanel">
                    <div className="row">
                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_pipeline_create} label='Created' name='projects_pipeline_create' />
                      </div>

                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_pipeline_view} label='View' name='projects_pipeline_view' />

                      </div>

                      <div className="col-sm-4 col-md-4">
                        <SwitchButton checked={initialValues.projects_pipeline_edit} label='Edit' name='projects_pipeline_edit' />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
          </Form>
        )}
      </Formik>}
  </>
  )
}

export default EditProfileProject