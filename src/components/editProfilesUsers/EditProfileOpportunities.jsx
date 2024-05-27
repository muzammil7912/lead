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
import { PrivilegesOpportunities } from '../../Data/AllData';

function EditProfileOpportunities({ data, useIDD, reCallAPI }) {
    const [firstval, setFirstval] = useState("");
    const [firstval2, setFirstval2] = useState([]);
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
    PrivilegesOpportunities.map(field => {
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
    useEffect(() => {
        if (datas) {
            let mapw = [];
            {
                Object.keys(datas).map((item, index) => {
                    index === 0 && setFirstval(item)
                    datas[item] &&
                        Object.keys(datas[item]).map((item2, index2) => {
                            mapw.push(item2)
                            index2 === 0 && setFirstval2(mapw)
                        })
                })
            }
        }
    }, [datas])
    const submitbutton = {
        "class": "btn btn-primary mt-3 ml-auto d-block",
        "text": "Store User"
    }
    function handleGet() {
        let OpportunitiesData = new FormData();
        OpportunitiesData.append("type", "allCustomFields");
        OpportunitiesData.append("table_name", "opportunity_pipelines");
        OpportunitiesData.append("module", "Opportunity");
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
        let checkBox_name = ["mod_view", 'active_module', 'mod_create', 'mod_edit', 'mod_delete', 'opportunity_Real_Estate__Buyer', 'opportunity_Tab_Buyer', 'opportunity_Muzammil_Tab', 'opportunity_admininfo', 'opportunity_admin_created_date', 'opportunity_admin_updated_date', 'opportunity_admin_oppstage_dates', 'opportunity_stage_create', 'opportunity_stage_view', 'opportunity_stage_edit', 'opportunity_stage_delete', 'opportunity_stage_setting', 'opportunity_pipeline_create', 'opportunity_pipeline_view', 'opportunity_pipeline_edit', 'opportunity_Muzzamil_Shah', 'opportunity_EB5', 'opportunity_Muzzamil_2', 'opportunity_Immigration', 'opportunity_Furniture/Interior_Design', 'opportunity_Property_Management', 'opportunity_Golden_Visa', 'opportunity_Mortgage', 'opportunity_Money_Remittance', 'opportunity_new_ahsan']
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
            if(item.includes("opportunity_pip_")) {
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
        formdatas.append("module", "opportunities");
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
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_title} name={"opportunity_opp_title"} dataprop={"Opportunity Title"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_value} name={"opportunity_opp_value"} dataprop={"Opportunity Value"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_assignto} name={"opportunity_assignto"} dataprop={"Assign to"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_pipeline} name={"opportunity_pipeline"} dataprop={"Pipeline"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_notes} name={"opportunity_notes"} dataprop={"Notes"} />
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <div>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_stage} name={"opportunity_opp_stage"} dataprop={"Opportunity Stage"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_owner} name={"opportunity_opp_owner"} dataprop={"Opportunity Owner"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_description} name={"opportunity_opp_description"} dataprop={"Description"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_status} name={"opportunity_opp_status"} dataprop={"Status"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_file_delete} name={"opportunity_opp_file_delete"} dataprop={"File Delete"} />
                                </div>
                            </div>


                            <div className="col-sm-4 col-md-4">
                                <div>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_contact} name={"opportunity_opp_contact"} dataprop={"Contact"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_forcastedate} name={"opportunity_opp_forcastedate"} dataprop={"Forecast Close Date"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_tags} name={"opportunity_opp_tags"} dataprop={"Tags"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.opportunity_opp_fileupload} name={"opportunity_opp_fileupload"} dataprop={"File Upload"} />
                                </div>
                            </div>

                        </div>
                        <div className="row clearfix">
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
                                                                    <SwitchButton label={`${item.replaceAll('_', ' ')}`} name={`opportunity_pip_${itemu}`} checked={initialValues[`opportunity_pip_${itemu}`] ? initialValues[`opportunity_pip_${itemu}`] : ""} />
                                                                </div>
                                                                <div className="col-sm-12 col-md-12 mt-1">
                                                                    <h6>Custom Fields</h6>
                                                                    <hr className="mt-0" />
                                                                </div>
                                                                {
                                                                    <Tab.Container defaultActiveKey={"0"}>
                                                                        <Nav className="nav nav-tabs page-header-tab" id="myTab" role="tablist">
                                                                            {datas[item] && Object.keys(datas[item]).map(function (item2, index2) {
                                                                                const objname = Object.keys(datas[item])[index2];
                                                                                return (
                                                                                    <li className="nav-item" key={index2}>
                                                                                        <FormControl
                                                                                            name={`opportunity_${item2}`}
                                                                                            control="input4"
                                                                                            defaultd={initialValues[`opportunity_${item2}`]}
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
                                                                                                                        <ProfileCheckbox updateClick={(ite) => handlevalUpdate(ite)} datas={initialValues[`opportunity_${label}`] ? initialValues[`opportunity_${label}`] : ""} name={`opportunity_${item4}`} dataprop={label} />
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
                                                                }


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
                                            name={`opportunity_admininfo`}
                                            control="input4"
                                            defaultd={initialValues[`opportunity_admininfo`]}
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
                                                <SwitchButton checked={initialValues.opportunity_admin_created_date} label='Created Date' name='opportunity_admin_created_date' />
                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.opportunity_admin_updated_date} label='Update Date' name='opportunity_admin_updated_date' />

                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.opportunity_admin_oppstage_dates} label='Opportunity Stage Dates' name='opportunity_admin_oppstage_dates' />
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
                                                <SwitchButton checked={initialValues.opportunity_stage_create} label='Created ' name='opportunity_stage_create' />
                                                <SwitchButton checked={initialValues.opportunity_stage_delete} label='Delete' name='opportunity_stage_delete' />
                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.opportunity_stage_view} label='View' name='opportunity_stage_view' />
                                                <SwitchButton checked={initialValues.opportunity_stage_setting} label='Settings' name='opportunity_stage_setting' />

                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.opportunity_stage_edit} label='Edit' name='opportunity_stage_edit' />
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
                                                <SwitchButton checked={initialValues.opportunity_pipeline_create} label='Created' name='opportunity_pipeline_create' />
                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.opportunity_pipeline_view} label='View' name='opportunity_pipeline_view' />

                                            </div>

                                            <div className="col-sm-4 col-md-4">
                                                <SwitchButton checked={initialValues.opportunity_pipeline_edit} label='Edit' name='opportunity_pipeline_edit' />
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

export default EditProfileOpportunities