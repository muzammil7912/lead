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
import { PrivilegesOut_of_Office } from '../../Data/AllData';

function EditProfileOutofOffice({ data, useIDD, reCallAPI }) {
    const [firstval, setFirstval] = useState("");
    const isComponentMounted = useRef(true);
    let feild = data?.fields;
    let feild2 = {
        "active_module": data?.active_module,
        "mod_create": data?.module_create,
        "mod_delete": data?.module_delete,
        "mod_edit": data?.module_edit,
        "mod_view": data?.module_view
    };
    const allfeild = { ...feild, ...feild2 }
    PrivilegesOut_of_Office.map(field => {
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
        "text": "Update Profile"
    }
    useEffect(() => {
        if (datas) {
            {
                Object.keys(datas).map((item, index) => {
                    index === 0 && setFirstval(item)

                })
            }
        }
    }, [datas])
    function handleGet() {
        let OpportunitiesData = new FormData();
        OpportunitiesData.append("type", "allCustomFields");
        OpportunitiesData.append("table_name", "event_pipelines");
        OpportunitiesData.append("module", "out_of_office");
        OpportunitiesData.append("event_type", "out_of_office");
        apiMethodGet("postAllPipelinesCustomFields", OpportunitiesData);
    }
    const handlevalUpdate = (item) => {
        let itemval = item.target.getAttribute("value");
        let itemname = item.target.getAttribute("name");
        setInitialValues({ ...initialValues, [itemname]: itemval })
    }
    let obj = initialValues;
    const handleFunction = (e, setFieldValue) => {
        let targetid = e.target.getAttribute('data-id');
        let checkBox_name = ["mod_view", 'active_module', 'mod_create', 'mod_edit', 'mod_delete', 'out_of_office_pip_Inbound_Call', 'out_of_office_pip_Whatsapp', 'out_of_office_pip_eMail', 'out_of_office_pip_Standard_Meetings', 'out_of_office_pip_Risks', 'out_of_office_pip_Issues', 'out_of_office_pip_Decisions', 'out_of_office_pip_Outbound_Call', 'out_of_office_pip_General', 'out_of_office_pip_new_test', 'out_of_office_pip_To_Do_List', 'out_of_office_pip_Concierge', 'out_of_office_pip_Follow_Up', 'out_of_office_pip_Tickets', 'out_of_office_pip_New_Public', 'out_of_office_admininfo', 'out_of_office_admin_create_date', 'out_of_office_admin_updated_date', 'out_of_office_admin_prjstage_dates', 'out_of_office_stage_create', 'out_of_office_stage_view', 'out_of_office_stage_edit', 'out_of_office_stage_delete', 'out_of_office_stage_setting', 'out_of_office_pipeline_create', 'out_of_office_pipeline_view', 'out_of_office_pipeline_edit', 'out_of_office_pipeline_delete']
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
            if (item.includes("actions_pip_")) {
                if (`${values[item]}` === "") {

                }
                // formdatas.append(item, values[item]);
                else {
                    formdatas.append(item, values[item]);
                }
            }
            else {
                formdatas.append(item, values[item]);
            }
            // formdatas.append(item, values[item]);
        }
        formdatas.append("profile_id", useIDD);
        formdatas.append("module", "out_of_office");
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
                            out_of_office
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
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_title} name={"out_of_office_title"} dataprop={"Title"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_priority} name={"out_of_office_priority"} dataprop={"Priority"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_calendar} name={"out_of_office_calendar"} dataprop={"Calendar"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_color} name={"out_of_office_color"} dataprop={"Action Color"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_pipeline} name={"out_of_office_pipeline"} dataprop={"Pipeline"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_stage} name={"out_of_office_stage"} dataprop={"Stage"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_location} name={"out_of_office_location"} dataprop={"Location"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_start_date} name={"out_of_office_start_date"} dataprop={"Start Date"} />
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <div>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_start_date_time} name={"out_of_office_start_date_time"} dataprop={"Start Time"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_end_date} name={"out_of_office_end_date"} dataprop={"End Date"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_end_date_time} name={"out_of_office_end_date_time"} dataprop={"End Time"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_time_zone} name={"out_of_office_time_zone"} dataprop={"Time Zone"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_related_to} name={"out_of_office_related_to"} dataprop={"Related To"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_has_dependency} name={"out_of_office_has_dependency"} dataprop={"Dependency"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_all_day} name={"out_of_office_all_day"} dataprop={"All Day Event"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_recursive_event} name={"out_of_office_recursive_event"} dataprop={"Recursive Options"} />
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <div>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_privacy} name={"out_of_office_privacy"} dataprop={"Privacy"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_visibility} name={"out_of_office_visibility"} dataprop={"Visibility"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_google_meet} name={"out_of_office_google_meet"} dataprop={"Google Meet"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_meeting_platform} name={"out_of_office_meeting_platform"} dataprop={"Meeting Platform"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_description} name={"out_of_office_description"} dataprop={"Description"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_notification} name={"out_of_office_notification"} dataprop={"Notification"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_feature_image} name={"out_of_office_feature_image"} dataprop={"Feature Image"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.out_of_office_members} name={"out_of_office_members"} dataprop={"Members"} />
                                </div>
                            </div>

                        </div>
                        {/* <div className="row clearfix">
                            <div className="col-sm-12 col-md-12 mt-5">
                                <h6>Pipelines</h6>
                                <hr className="mt-0" />
                            </div>
                            <div className="col-sm-12 col-md-12">
                                {firstval &&
                                    <Tab.Container defaultActiveKey={firstval}>
                                        <div className="row">
                                            <div className="col-sm-3 col-md-3">
                                                <Nav className="nav flex-column nav-pills">
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
                                                            <Tab.Pane key={index1} eventKey={item}>
                                                                <div className="col-sm-12 col-md-12">
                                                                    <SwitchButton label={`${item.replaceAll('_', ' ')}`} name={`actions_pip_${itemu}`} checked={initialValues[`actions_pip_${itemu}`] ? initialValues[`actions_pip_${itemu}`] : ""} />
                                                                </div>
                                                                <div className="col-sm-12 col-md-12 mt-1">
                                                                    <h6>Custom Fields</h6>
                                                                    <hr className="mt-0" />
                                                                </div>
                                                                <Tab.Container defaultActiveKey={"0"}>
                                                                    <Nav className="nav nav-tabs page-header-tab" id="myTab" role="tablist">
                                                                        {datas[item] && Object.keys(datas[item]).map(function (item2, index2) {
                                                                            const objname = Object.keys(datas[item])[index2];
                                                                            return (
                                                                                <li className="nav-item" key={index2}>
                                                                                    <FormControl
                                                                                        name={`actions_pip_${item2}`}
                                                                                        control="input4"
                                                                                        defaultd={initialValues[`actions_pip_${item2}`]}
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
                                                                                <Tab.Pane key={index2} eventKey={index2}>
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
                                                                                                                    <ProfileCheckbox updateClick={(ite) => handlevalUpdate(ite)} datas={initialValues[`actions_${label}`] ? initialValues[`actions_${label}`] : ""} name={`actions_${item4}`} dataprop={label} />
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
                                            name={`actions_admininfo`}
                                            control="input4"
                                            defaultd={initialValues[`actions_admininfo`]}
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
                                                <SwitchButton checked={initialValues.actions_admin_create_date} label='Created Date' name='actions_admin_create_date' />
                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.actions_admin_updated_date} label='Update Date' name='actions_admin_updated_date' />

                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.actions_admin_prjstage_dates} label='Action Stage Dates' name='actions_admin_prjstage_dates' />
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
                                                <SwitchButton checked={initialValues.actions_stage_create} label='Created ' name='actions_stage_create' />
                                                <SwitchButton checked={initialValues.actions_stage_delete} label='Delete' name='actions_stage_delete' />
                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.actions_stage_view} label='View' name='actions_stage_view' />
                                                <SwitchButton checked={initialValues.actions_stage_setting} label='Settings' name='actions_stage_setting' />

                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.actions_stage_edit} label='Edit' name='actions_stage_edit' />
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
                                                <SwitchButton checked={initialValues.actions_pipeline_create} label='Created' name='actions_pipeline_create' />
                                                <SwitchButton checked={initialValues.actions_pipeline_delete} label='Delete' name='actions_pipeline_delete' />
                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.actions_pipeline_view} label='View' name='actions_pipeline_view' />

                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.actions_pipeline_edit} label='Edit' name='actions_pipeline_edit' />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
                    </Form>
                )}
            </Formik>}
    </>
    )
}

export default EditProfileOutofOffice