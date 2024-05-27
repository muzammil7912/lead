import React, { useState, useEffect } from 'react';
import usePost from "../customHooks/usePost.js";
import useFetch from "../customHooks/useFetch.js";
import Loader from '../components/common/Loading.jsx';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from "../services/config.json";


const StageChange = () => {

    const { data: getModules, loading, error } = useFetch('', 'getCustomeFieldsViewModules');
    const [getpipelineData, apiMethod1] = usePost();
    const [getStageData, apiMethod2] = usePost();
    const [getEditData, apiMethod3] = usePost();
    const [getUpdatePipelineData, apiMethod4] = usePost();
    const [getUpdateStageData, apiMethod5] = usePost();
    const [getUpdateTabData, apiMethod6] = usePost();
    const [getUpdateOrderNumber, apiMethod7] = usePost();
    const [UpdateCustomField, apiMethod8] = usePost();
    const [moduleValue, setModuleValue] = useState('');
    const [pipelineValue, setPipelineValue] = useState('');
    const [stageValue, setStageValue] = useState('');
    const [radioBtnValue, setRadioBtnValue] = useState('');
    const [typeValue, setTypeValue] = useState('')
    const [tabsData, setTabsData] = useState('');
    const [groupData, setGroupData] = useState('');
    const [fieldData, setFieldData] = useState('');
    const [updateModuleValue, setUpdataModuleValue] = useState('');
    const [updatepipelinevalue, setUpdatePipelineValue] = useState('');
    const [updateStageValue, setUpdateStageValue] = useState('');
    const [updateTabValue, setUpdateTabValue] = useState('');
    const [requiredField, setRequiredField] = useState('no');
    const [orderNumber, setOrderNumber] = useState('');
    const [body, setBody] = useState('');
    const [showStage, setShowStage] = useState(false);
    const navigate = useNavigate();
    // const [fieldChange, setFieldChange] = useState([]);


    const handleModule = (event) => {
        let formData = new FormData();
        setModuleValue(event.target.value);
        formData.append('current_valType', 'pipelineSelect');
        formData.append('module', event.target.value)
        apiMethod1('postCustomFiledsViewPiplines', formData);
        setPipelineValue('');
    }
    const handleUpdateModule = (event) => {
        let formData = new FormData();
        setUpdataModuleValue(event.target.value);
        formData.append('current_valType', 'pipelineSelect');
        formData.append('module', event.target.value)
        apiMethod4('postCustomFiledsViewPiplines', formData);
    }
    const handlePipeline = (event) => {
        setPipelineValue(event.target.value);
        let formData = new FormData();
        formData.append('current_valType', 'stageSelect');
        formData.append('module', moduleValue);
        formData.append('pipeline', event.target.value);
        apiMethod2('postCustomFiledsViewPiplinesStages', formData);
        setStageValue('')
    }

    const handleUpdatepipeline = (event) => {
        setUpdatePipelineValue(event.target.value);
        let formData = new FormData();
        formData.append('current_valType', 'stageSelect');
        formData.append('module', updateModuleValue);
        formData.append('pipeline', event.target.value);
        apiMethod5('postCustomFiledsViewPiplinesStages', formData);
    }

    const handleStage = (event) => {
        setStageValue(event.target.value);
        let formData = new FormData();
        formData.append('current_valType', 'fieldsSelect');
        formData.append('module_type', moduleValue);
        formData.append('pipeline', pipelineValue);
        formData.append('stage', event.target.value);
        apiMethod3('postChangestages', formData);
        setRadioBtnValue('');
    }

    const handleUpdateStage = (event) => {
        setUpdateStageValue(event.target.value);
        let formData = new FormData();
        formData.append('module', updateModuleValue);
        formData.append('pipelines', updatepipelinevalue);
        formData.append('id', event.target.value);
        formData.append('level', radioBtnValue);
        apiMethod6('postCustomFieldsGroupParent', formData);
    }

    const handleUpdateTab = (event) => {
        setUpdateTabValue(event.target.value)
        let formData = new FormData();
        formData.append('level', radioBtnValue)
        formData.append('groupId', event.target.value)
        apiMethod7('postCustomFieldsOrderNum', formData)
    }

    useEffect(() => {
        if (getUpdateOrderNumber.data && !getUpdateOrderNumber.data.message) {
            setOrderNumber(getUpdateOrderNumber?.data[getUpdateOrderNumber?.data.length - 1])
        }
    }, [getUpdateOrderNumber.data])

    useEffect(() => {
        if (getUpdateTabData.data && !getUpdateTabData.data.message) {
            setOrderNumber(getUpdateTabData?.data[getUpdateTabData?.data.length - 1])
        }
    }, [getUpdateTabData.data])

    // console.log(getUpdateOrderNumber)
    // console.log(orderNumber)

    const handleRadioButton = (event) => {
        setRadioBtnValue(event.target.value)
        setUpdataModuleValue('');
        setUpdatePipelineValue('');
        setUpdateStageValue('');
        setUpdateTabValue('');
    }

    const handleToggle = (e) => {
        e.preventDefault();
        var closestCard = e.target.closest(".card");
        if (closestCard.classList.contains("card-collapsed")) {
            closestCard.classList.remove("card-collapsed");
        } else {
            closestCard.classList.add("card-collapsed");
        }
    }


    const initialValues = {
        checkfield: ''
    }

    useEffect(() => {
        if (getEditData?.data && (!getEditData?.data?.fieldsData?.message || !getEditData?.data?.tabs?.message || !getEditData?.data?.groupData?.message)) {
            setTabsData(getEditData?.data?.tabs);
            setGroupData(getEditData?.data?.groupData);
            setFieldData(getEditData?.data?.fieldsData)
            setShowStage(true)
        }
        else if (getEditData?.data?.fieldsData?.message || getEditData?.data?.tabs?.message || getEditData?.data?.groupData?.message) {
            swal({
                title: "No Data Found",
                icon: "warning",
                dangerMode: true,
            })
                .then(response => {
                    if (response) setShowStage(false)
                })
        }
    }, [getEditData?.data]);


    const handleSubmit = (values) => {
        if (radioBtnValue === '1') {
            if (moduleValue === '' ||
                pipelineValue === '' ||
                stageValue === '' ||
                typeValue === '' ||
                updateModuleValue === '' ||
                updatepipelinevalue === '' ||
                updateStageValue === '' ||
                updateTabValue === '' ||
                requiredField === '') {
                swal({
                    title: "Some Fields are empty! Please fill and try again",
                    icon: "warning",
                    dangerMode: true,
                })
            } else {
                let formData = new FormData();
                formData.append('old_modules', moduleValue)
                formData.append('old_pipelines', pipelineValue)
                formData.append('old_stages', stageValue)
                formData.append('level', radioBtnValue)
                formData.append('type', typeValue)
                formData.append('body', body)
                formData.append('modules', updateModuleValue)
                formData.append('pipelines', updatepipelinevalue)
                formData.append('stages', updateStageValue)
                formData.append('level_two_parent', updateTabValue)
                formData.append('level_one_order', orderNumber)
                formData.append('required', requiredField)
                formData.append('submit', 'update')
                for (let i = 0; i < values.checkfield.length; i++) {
                    formData.append('move_field[]', values.checkfield[i])
                }
                apiMethod8('postChangestagesUpdated', formData)
                setModuleValue('')
                setPipelineValue('')
                setStageValue('')
            }
        }
        else if (radioBtnValue === '2') {
            if (moduleValue === '' ||
                pipelineValue === '' ||
                stageValue === '' ||
                updateModuleValue === '' ||
                updatepipelinevalue === '' ||
                updateStageValue === '' ||
                updateTabValue === '') {
                swal({
                    title: "Some Fields are empty! Please fill and try again",
                    icon: "warning",
                    dangerMode: true,
                })
            } else {
                let formData = new FormData();
                formData.append('old_modules', moduleValue)
                formData.append('old_pipelines', pipelineValue)
                formData.append('old_stages', stageValue)
                formData.append('level', radioBtnValue)
                formData.append('type', '')
                formData.append('body', '')
                formData.append('modules', updateModuleValue)
                formData.append('pipelines', updatepipelinevalue)
                formData.append('stages', updateStageValue)
                formData.append('level_three_parent', updateTabValue)
                formData.append('level_two_order', orderNumber)
                formData.append('required', '')
                formData.append('submit', 'update')
                for (let i = 0; i < values.checkfield.length; i++) {
                    formData.append('move_field[]', values.checkfield[i])
                }
                apiMethod8('postChangestagesUpdated', formData)
            }
        }
        else if (radioBtnValue === '3') {
            if (moduleValue === '' ||
                pipelineValue === '' ||
                stageValue === '' ||
                updateModuleValue === '' ||
                updatepipelinevalue === '' ||
                updateStageValue === '') {
                swal({
                    title: "Some Fields are empty! Please fill and try again",
                    icon: "warning",
                    dangerMode: true,
                })
            }
            else {
                let formData = new FormData();
                formData.append('old_modules', moduleValue)
                formData.append('old_pipelines', pipelineValue)
                formData.append('old_stages', stageValue)
                formData.append('level', radioBtnValue)
                formData.append('type', '')
                formData.append('body', '')
                formData.append('modules', updateModuleValue)
                formData.append('pipelines', updatepipelinevalue)
                formData.append('stages', updateStageValue)
                formData.append('level_three_order', orderNumber)
                formData.append('required', '')
                formData.append('submit', 'update')
                console.log(values);
                for (let i = 0; i < values.checkfield.length; i++) {
                    formData.append('move_field[]', values.checkfield[i])
                }
                apiMethod8('postChangestagesUpdated', formData)
            }
        }
    }

    useEffect(() => {
        if (UpdateCustomField.data) {
            toast.success(UpdateCustomField?.data?.message)
            navigate(`/${config.ddemoss}customfield`)
        }
    }, [UpdateCustomField.data])

    if (loading || error) return <Loader />
    return (
        <div className="section-body mt-3">
            <div className="container-fluid">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className="row clearfix">
                            <div className="col-12">
                                <div className="card box_shadow">
                                    <div className="card-header borderblue">
                                        <h3 className="card-title">Change Stage in Custom Fields</h3>
                                        <div className="card-options">
                                            <Link
                                                to={`/${config.ddemoss}customfield`}
                                                className="btn btn-sm btn-primary bsm-1 box_shadow"
                                                data-stage={2}
                                            >
                                                {" "}
                                                Go to Custom Fields
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row appending_div">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Module</label>
                                                    <select
                                                        className="form-control  custom-select"
                                                        name="old_modules"
                                                        onChange={(event) => handleModule(event)}
                                                        value={moduleValue}
                                                    >
                                                        <option hidden>--Select--</option>
                                                        {Array.isArray(getModules) && getModules.map((item, index) => {
                                                            return (
                                                                <option value={item?.module_name} key={index}>{item?.module_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Pipeline</label>
                                                    <select
                                                        className="form-control custom-select mt-2"
                                                        name="old_pipelines"
                                                        onChange={(event) => handlePipeline(event)}
                                                        value={pipelineValue}
                                                    >
                                                        <option hidden>--Select--</option>
                                                        {Array.isArray(getpipelineData.data) ? getpipelineData.data.map((item, index) => {
                                                            return (
                                                                <option key={index}>{(moduleValue === 'Lead' || moduleValue === 'Prospect' || moduleValue === 'Client') ? item?.pipeline : item?.pipeline_title}</option>
                                                            )
                                                        }) : 'No Data'}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select Stage</label>
                                                    <select
                                                        className="form-control custom-select"
                                                        data-name="sr-stg"
                                                        name="old_stages"
                                                        value={stageValue}
                                                        onChange={(event) => handleStage(event)}
                                                    >
                                                        <option hidden>--Select--</option>
                                                        {getStageData.data && !getStageData.data.message && getStageData.data.map((item, index) => {
                                                            return (
                                                                <option value={item?.id} key={index}>{item?.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {showStage &&
                                            <div className="row appending_div">
                                                <div className="col-md-12 main_heading">
                                                    <h5>Change Stage:</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group radio_main">
                                                        <div className="radio_btn">
                                                            <input
                                                                type="radio"
                                                                name="level"
                                                                className="radio_button"
                                                                id="whole_tab"
                                                                value={'3'}
                                                                checked={radioBtnValue === '3'}
                                                                onChange={(event) => handleRadioButton(event)}
                                                            />
                                                            <label htmlFor="whole_tab" className="form-label">
                                                                Move whole tab
                                                            </label>
                                                        </div>
                                                        {radioBtnValue === '3' && <div className="radio_inner">
                                                            <div className="checkbox_main">
                                                                {tabsData && !tabsData.message && tabsData.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className="checkbox_inner tabs_main">
                                                                            <div className="card _projects_ card-collapsed">
                                                                                <div className="card-header">
                                                                                    <h3 key={index} className="card-title ">
                                                                                        <Field
                                                                                            type="checkbox"
                                                                                            className="checkbox_tabs"
                                                                                            name='checkfield'
                                                                                            // id={2}
                                                                                            value={item?.tab_id}
                                                                                        />
                                                                                        <label htmlFor={2} className="checkbox_title ml-1">
                                                                                            {item?.tab_name}
                                                                                        </label>
                                                                                    </h3>
                                                                                    <div className="card-options">
                                                                                        <Link
                                                                                            onClick={(event) => handleToggle(event)}
                                                                                            className="card-options-collapse"
                                                                                            data-toggle="card-collapse"
                                                                                        >
                                                                                            <i className="fe fe-chevron-up" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-body checkbox_body">
                                                                                    <div className="row _projects_Created checkbox_row">
                                                                                        {item.groups && !item.groups.message && item.groups.map((item1, index1) => {
                                                                                            return (
                                                                                                <div key={index1} className="col-6 heading_inner">
                                                                                                    <strong>{item1?.group_name}:</strong>
                                                                                                    <ul>
                                                                                                        {item1.fields && !item1.fields.message && item1.fields.map((item2, index2) => {
                                                                                                            return (
                                                                                                                item2?.field_name &&
                                                                                                                <li key={index2}>{item2?.field_name}</li>
                                                                                                            )
                                                                                                        })}
                                                                                                    </ul>
                                                                                                </div>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                                }
                                                            </div>
                                                        </div>}
                                                    </div>
                                                    <div className="form-group radio_main">
                                                        <div className="radio_btn">
                                                            <input
                                                                type="radio"
                                                                name="level"
                                                                className="radio_button"
                                                                id="only_group"
                                                                value={'2'}
                                                                checked={radioBtnValue === '2'}
                                                                onChange={(event) => handleRadioButton(event)}
                                                            />
                                                            <label htmlFor="only_group" className="form-label">
                                                                Move only group
                                                            </label>
                                                        </div>
                                                        {radioBtnValue === '2' && <div className="radio_inner">
                                                            <div className="checkbox_main">
                                                                {groupData && !groupData.message && groupData.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className="checkbox_inner groups_main">
                                                                            <div className="card _projects_ card-collapsed">
                                                                                <div className="card-header">
                                                                                    <h3 className="card-title ">
                                                                                        <Field
                                                                                            type="checkbox"
                                                                                            className="checkbox_groups"
                                                                                            // id={9}
                                                                                            name='checkfield'
                                                                                            value={item?.id}
                                                                                        />
                                                                                        <label htmlFor={9} className="checkbox_title ml-1">
                                                                                            {item?.name}
                                                                                        </label>
                                                                                    </h3>
                                                                                    <div className="card-options">
                                                                                        <Link
                                                                                            onClick={(event) => handleToggle(event)}
                                                                                            className="card-options-collapse"
                                                                                            data-toggle="card-collapse"
                                                                                        >
                                                                                            <i className="fe fe-chevron-up" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-body checkbox_body">
                                                                                    <div className="row _projects_Created checkbox_row">
                                                                                        <div className="col-6 heading_inner">
                                                                                            <ul>{item.fields && !item.fields.message && item.fields.map((item1, index1) => {
                                                                                                return (
                                                                                                    item1?.name &&
                                                                                                    <li key={index1}> {item1?.name}</li>
                                                                                                )
                                                                                            })}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>}
                                                    </div>
                                                    <div className="form-group radio_main">
                                                        <div className="radio_btn">
                                                            <input
                                                                type="radio"
                                                                name="level"
                                                                className="radio_button"
                                                                id="only_field"
                                                                value={'1'}
                                                                checked={radioBtnValue === "1"}
                                                                onChange={(event) => handleRadioButton(event)}
                                                            />
                                                            <label htmlFor="only_field" className="form-label">
                                                                Move only field
                                                            </label>
                                                        </div>
                                                        {radioBtnValue === '1' && <div className="radio_inner">
                                                            <div className="checkbox_main">
                                                                {fieldData && !fieldData.message && fieldData.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className="checkbox_inner fields_main">
                                                                            <div className="card _projects_ card-collapsed">
                                                                                <div className="card-header">
                                                                                    <h3 className="card-title ">
                                                                                        <label className="checkbox_title">{item?.name}</label>
                                                                                    </h3>
                                                                                    <div className="card-options">
                                                                                        <Link
                                                                                            onClick={(event) => handleToggle(event)}
                                                                                            className="card-options-collapse"
                                                                                            data-toggle="card-collapse"
                                                                                        >
                                                                                            <i className="fe fe-chevron-up" />
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-body checkbox_body">
                                                                                    <div className="row _projects_Created checkbox_row">
                                                                                        {item.fields && !item.fields.message && item.fields.map((item1, index1) => {
                                                                                            console.log(item1)
                                                                                            return (
                                                                                                item1?.name &&
                                                                                                <div key={index1} className="col-12 heading_inner">
                                                                                                    <Field
                                                                                                        type="checkbox"
                                                                                                        className="checkbox_fields"
                                                                                                        name='checkfield'
                                                                                                        // id={24}
                                                                                                        value={item1?.id}
                                                                                                    />
                                                                                                    <label htmlFor={24} className="checkbox_title ml-1">
                                                                                                        {item1?.name}
                                                                                                    </label>
                                                                                                </div>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                                {radioBtnValue === '3' && <div className="row">
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field modules_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Change Module</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="modules"
                                                                onChange={(event) => handleUpdateModule(event)}
                                                                value={updateModuleValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getModules && !getModules.message && getModules.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.module_name} key={index}>{item?.module_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field pipelines_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Pipeline</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="pipelines"
                                                                onChange={(event) => handleUpdatepipeline(event)}
                                                                value={updatepipelinevalue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdatePipelineData.data && !getUpdatePipelineData.data.message && getUpdatePipelineData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.db_id} key={index}>{(updateModuleValue === 'Lead' || updateModuleValue === 'Prospect' || updateModuleValue === 'Client') ? item?.pipeline : item?.pipeline_title}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field stages_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Stages</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="stages"
                                                                onChange={(event) => handleUpdateStage(event)}
                                                                value={updateStageValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdateStageData.data && !getUpdateStageData.data.message && getUpdateStageData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.id} key={index}>{item?.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>}
                                                {radioBtnValue === '2' && <div className="row">
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field modules_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Change Module</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="modules"
                                                                onChange={(event) => handleUpdateModule(event)}
                                                                value={updateModuleValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getModules && !getModules.message && getModules.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.module_name} key={index}>{item?.module_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field pipelines_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Pipeline</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="pipelines"
                                                                onChange={(event) => handleUpdatepipeline(event)}
                                                                value={updatepipelinevalue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdatePipelineData.data && !getUpdatePipelineData.data.message && getUpdatePipelineData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.db_id} key={index}>{(updateModuleValue === 'Lead' || updateModuleValue === 'Prospect' || updateModuleValue === 'Client') ? item?.pipeline : item?.pipeline_title}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field stages_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Stages</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="stages"
                                                                onChange={(event) => handleUpdateStage(event)}
                                                                value={updateStageValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdateStageData.data && !getUpdateStageData.data.message && getUpdateStageData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.id} key={index}>{item?.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 level_one_field">
                                                        <div className="form-group">
                                                            <label className="form-label">Tab Parent</label>
                                                            <select
                                                                className="form-control custom-select level_one_select order_select"
                                                                name="level_two_parent"
                                                                onChange={(event) => handleUpdateTab(event)}
                                                                value={updateTabValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdateTabData.data && !getUpdateTabData.data.message && getUpdateTabData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.id} key={index}>{item?.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>}
                                                {radioBtnValue === '1' && <div className="row">
                                                    <div className="col-md-6 level_one_field">
                                                        <div className="form-group">
                                                            <label className="form-label">Type</label>
                                                            <select
                                                                onChange={(event) => setTypeValue(event.target.value)}
                                                                className="form-control custom-select select_option_value level_one_select"
                                                                name="type"
                                                                value={typeValue}
                                                            >
                                                                <option hidden>Select Option</option>
                                                                <option value="text">Text</option>
                                                                <option value="select">Select</option>
                                                                <option value="textarea">Textarea</option>
                                                                <option value="radio">Radio</option>
                                                                <option value="date">Date</option>
                                                                <option value="time">Time</option>
                                                                <option value="checkbox">checkbox</option>
                                                                <option value="number">Number</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {(typeValue === 'select' || typeValue === 'checkbox' || typeValue === 'radio') && <div className="col-md-6 show_select_option">
                                                        <div className="form-group">
                                                            <label className="form-label">Select Option</label>
                                                            <textarea
                                                                name="body"
                                                                rows={8}
                                                                className="form-control"
                                                                placeholder="for multiple options, saperate options by comma (,). and it will worked for select, radio and checkbox"
                                                                onChange={(event) => setBody(event.target.value)}
                                                                value={body}
                                                            />
                                                            <small className="text-primary">
                                                                for multiple options, saperate options by comma (,). and it will
                                                                worked for select, radio and checkbox
                                                            </small>
                                                        </div>
                                                    </div>}
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field modules_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Change Module</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="modules"
                                                                onChange={(event) => handleUpdateModule(event)}
                                                                value={updateModuleValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getModules && !getModules.message && getModules.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.module_name} key={index}>{item?.module_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field pipelines_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Pipeline</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="pipelines"
                                                                onChange={(event) => handleUpdatepipeline(event)}
                                                                value={updatepipelinevalue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdatePipelineData.data && !getUpdatePipelineData.data.message && getUpdatePipelineData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.db_id} key={index}>{(updateModuleValue === 'Lead' || updateModuleValue === 'Prospect' || updateModuleValue === 'Client') ? item?.pipeline : item?.pipeline_title}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-md-6 level_one_field level_two_field level_three_field stages_select"
                                                    >
                                                        <div className="form-group">
                                                            <label className="form-label">Stages</label>
                                                            <select
                                                                className="form-control custom-select all_level_select"
                                                                name="stages"
                                                                onChange={(event) => handleUpdateStage(event)}
                                                                value={updateStageValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdateStageData.data && !getUpdateStageData.data.message && getUpdateStageData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.id} key={index}>{item?.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 level_one_field">
                                                        <div className="form-group">
                                                            <label className="form-label">Group Parent</label>
                                                            <select
                                                                className="form-control custom-select level_one_select order_select"
                                                                name="level_two_parent"
                                                                onChange={(event) => handleUpdateTab(event)}
                                                                value={updateTabValue}
                                                            >
                                                                <option hidden>--Select--</option>
                                                                {getUpdateTabData.data && !getUpdateTabData.data.message && getUpdateTabData.data.map((item, index) => {
                                                                    return (
                                                                        <option value={item?.id} key={index}>{item?.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 level_one_field">
                                                        <div className="form-group">
                                                            <label className="form-label"> Field</label>
                                                            <select
                                                                className="form-control custom-select level_one_select"
                                                                name="required"
                                                                onChange={(event) => setRequiredField(event.target.value)}
                                                                value={requiredField}
                                                            >
                                                                <option value="no">No</option>
                                                                <option value="yes">Yes</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>}

                                            </div>}
                                        <div className="text-right mt-5 stageBtn">
                                            <input
                                                type="submit"
                                                className="btn btn-primary box_shadow"
                                                name="submit"
                                                value="Change Stage"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >

    )
}

export default StageChange