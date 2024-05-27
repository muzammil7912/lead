import React, { useState, useEffect, useContext } from "react";
import { Form, Formik } from "formik";
import { Translation } from "../components/Translation";
import useFetch from "../customHooks/useFetch.js";
import config from "../services/config.json";
import FormControl from "../components/form/FormControl";
import usePost from "../customHooks/usePost.js";
import SubmitButton from "../components/SubmitButton";
import swal from "sweetalert";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../components/common/Loading";
import { toast } from "react-toastify";
import { MainTranslationContexts } from "../context/MainTranslationContexts";



function EditCustomField() {
    const { id } = useParams();
    const { translations } = useContext(MainTranslationContexts)
    const [fielddata, setFielddata] = useState(false);
    const [groupedata, setGroupedata] = useState(false);
    const [tabdata, setTabdata] = useState(false);
    const [seletedvalue, setSeletedvalue] = useState("");
    const [textAreaField, settextAreaField] = useState(false);
    const [textareaview, settextareaview] = useState("");
    const [Name, setName] = useState('')
    const [Module, setModule] = useState('');
    const [res, apiMethod5] = usePost();
    const [piplinesData, apiMethod] = usePost();
    const [Pipline, setPipline] = useState('');
    const [piplinesStageData, apiMethod2] = usePost();
    const [Stage, setStage] = useState('');
    const [stageData, apiMethod3] = usePost();
    const [Parent, setParent] = useState('');
    const [parentData, apiMethod4] = usePost();
    const [OrderNumber, setOrderNumber] = useState('');
    const [Field, setField] = useState('');
    const [order, setOrder] = useState('');
    const { data: EditData, loading1, error1 } = useFetch('', `getEditCustomFields/${id}`);
    const [ModuleDropDown, setModuleDropDown] = useState();
    const [body, setBody] = useState('');
    const [manageOrderValue, setManageOrderValue] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (EditData && !EditData.message) {
            setSeletedvalue(EditData.listModulesData.custom_field.level)

            setName(EditData.listModulesData.custom_field.name)
            setModuleDropDown(EditData.modulesData.modules)
            setModule(EditData.listModulesData.custom_field.module)
            setPipline(EditData.listModulesData.custom_field.pipeline)
            setStage(EditData.listModulesData.custom_field.stage)
            setOrderNumber(EditData.listModulesData.custom_field.order_number)
            setField(EditData.listModulesData.custom_field.field_required)
            settextareaview(EditData.listModulesData.custom_field.type)
            console.log(EditData?.listModulesData?.custom_field?.body, "fdjhgfdjsjh")
            setBody(EditData?.listModulesData?.custom_field?.body)
            if (EditData.listModulesData.custom_field.level === '1') {
                setParent(EditData.listModulesData.custom_field.level_two_parent)
                console.log(EditData.listModulesData.custom_field.level_two_parent)
            }
            else if (EditData.listModulesData.custom_field.level === '2') {
                setParent(EditData.listModulesData.custom_field.level_three_parent)
                console.log(EditData.listModulesData.custom_field.level_three_parent)
            }
            let formData = new FormData();
            formData.append('current_valType', 'pipelineSelect');
            formData.append('module', EditData.listModulesData.custom_field.module)
            apiMethod('postCustomFiledsViewPiplines', formData)
            let formData1 = new FormData();
            formData1.append('current_valType', 'stageSelect');
            formData1.append('module', EditData.listModulesData.custom_field.module);
            formData1.append('pipeline', EditData.listModulesData.custom_field.pipeline);
            apiMethod2('postCustomFiledsViewPiplinesStages', formData1);
            let formData2 = new FormData();
            formData2.append('level', EditData.listModulesData.custom_field.level);
            formData2.append('module', EditData.listModulesData.custom_field.module);
            formData2.append('pipelines', EditData.listModulesData.custom_field.pipeline);
            formData2.append('id', EditData.listModulesData.custom_field.stage);
            apiMethod3('postCustomFieldsGroupParent', formData2);
            let formData3 = new FormData();
            formData3.append('level', EditData.listModulesData.custom_field.level)
            if (EditData.listModulesData.custom_field.level === '1') {
                formData3.append('groupId', EditData.listModulesData.custom_field.level_two_parent)
                apiMethod4('postCustomFieldsOrderNum', formData3)
            }
            else if (EditData.listModulesData.custom_field.level === '2') {
                formData3.append('groupId', EditData.listModulesData.custom_field.level_three_parent)
                apiMethod4('postCustomFieldsOrderNum', formData3)
            }
        }
    }, [EditData])


    const submitbutton = {
        class: "btn btn-primary",
        text: "Update Custom Field",
    };

    const fieldObject = [
        {
            value: 'no',
            label: 'No'
        },
        {
            value: 'yes',
            label: 'Yes'
        }
    ]

    useEffect(() => {
        if (seletedvalue === '1') {
            setOrder('')
            setFielddata(true);
            setGroupedata(false);
            setTabdata(false);
        } else if (seletedvalue === '2') {
            setOrder('')
            setGroupedata(true);
            setFielddata(false);
            setTabdata(false);
        } else if (seletedvalue === '3') {
            setOrder('')
            setTabdata(true);
            setGroupedata(false);
            setFielddata(false);
        } else {
            setFielddata(false);
            setGroupedata(false);
            setTabdata(false);
        }
    }, [seletedvalue]);


    useEffect(() => {
        if (textareaview === "select") {
            settextAreaField(true)
        }
        else if (textareaview === "radio") {
            settextAreaField(true)
        }
        else if (textareaview === "checkbox") {
            settextAreaField(true)
        }
        else {
            settextAreaField(false)
        }
    }, [textareaview]);

    const [Initialvalues, setInitialvalues] = useState({
        level: "",
        name: "",
        Assignto: "",
    });

    const handleModule = (event) => {
        setModule(event.target.value);
        let formData = new FormData();
        formData.append('current_valType', 'pipelineSelect');
        formData.append('module', event.target.value)
        apiMethod('postCustomFiledsViewPiplines', formData)
        setPipline('')
    }
    const handlePiplines = (event) => {
        setPipline(event.target.value);
        let formData = new FormData();
        formData.append('current_valType', 'stageSelect');
        formData.append('module', Module);
        formData.append('pipeline', event.target.value);
        apiMethod2('postCustomFiledsViewPiplinesStages', formData);
        setStage('')
    }
    const handleStage = (event) => {
        setStage(event.target.value);
        let formData = new FormData();
        formData.append('level', seletedvalue);
        formData.append('module', Module);
        formData.append('pipelines', Pipline);
        formData.append('id', event.target.value);
        apiMethod3('postCustomFieldsGroupParent', formData);
        setParent('')
        setOrderNumber('')
        setManageOrderValue(true)
    }
    const handleParent = (event) => {
        setParent(event.target.value);
        let formData = new FormData();
        formData.append('level', seletedvalue)
        formData.append('groupId', event.target.value)
        apiMethod4('postCustomFieldsOrderNum', formData)
        setManageOrderValue(true)
    }
    useEffect(() => {
        if (parentData?.data) {
            if (manageOrderValue) setOrderNumber(parentData?.data?.[parentData?.data.length - 1])
        }
    }, [parentData?.data])

    const handleOrderNumber = (event) => {
        setOrderNumber(event.target.value);
    }

    useEffect(() => {
        if (stageData.data && !stageData.data.message) {
            setOrder(stageData)
            if (manageOrderValue) setOrderNumber(stageData?.data[stageData?.data?.length - 1])
        }
    }, [stageData.data])

    const handleSubmit = (values) => {
        if (seletedvalue === '1') {
            if (seletedvalue === '' || textareaview === '' || Name === '' || Field === '' || Stage === '' || Module === '' || Pipline === '' || Parent === '' || OrderNumber === '') {
                swal({
                    title: "Some Fields are empty! Please fill and try again",
                    icon: "warning",
                    dangerMode: true,
                })
            } else {
                let formData = new FormData();
                formData.append('level', seletedvalue)
                formData.append('name', Name)
                if (EditData.listModulesData.custom_field.name) {
                    formData.append('old_name', EditData.listModulesData.custom_field.name)
                }
                formData.append('update_id', id)
                formData.append('body', body)
                formData.append('type', textareaview)
                formData.append('required', Field)
                formData.append('stages', Stage)
                formData.append('modules', Module)
                formData.append('pipelines', Pipline)
                formData.append('level_two_parent', Parent)
                formData.append('level_one_order', OrderNumber)
                formData.append('submit', 'update_customFields')
                // formData.append('body', '')
                apiMethod5('postUpdateCustomFields', formData)
                setSeletedvalue("")
                setName("")
                settextareaview("")
                setField("")
                setStage("")
                setModule("")
                setPipline("")
                setParent("")
                setOrderNumber("")
                setSeletedvalue("Select Level")
                setGroupedata(false);
                setFielddata(false);
                setTabdata(false);
            }
        }
        else if (seletedvalue === '2') {
            if (seletedvalue === '' || Name === '' || Parent === '' || Stage === '' || Module === '' || Pipline === '' || OrderNumber === '') {
                swal({
                    title: "Some Fields are empty! Please fill and try again",
                    icon: "warning",
                    dangerMode: true,
                })
            } else {
                let formData = new FormData();
                formData.append('level', seletedvalue)
                formData.append('name', Name)
                formData.append('old_name', EditData.listModulesData.custom_field.name)
                formData.append('update_id', id)
                formData.append('stages', Stage)
                formData.append('modules', Module)
                formData.append('pipelines', Pipline)
                formData.append('level_three_parent', Parent)
                formData.append('level_two_order', OrderNumber)
                formData.append('submit', 'update_customFields')
                apiMethod5('postUpdateCustomFields', formData)
                setSeletedvalue("")
                setName("")
                settextareaview("")
                setField("")
                setStage("")
                setModule("")
                setPipline("")
                setParent("")
                setOrderNumber("")
                setSeletedvalue("Select Level")
                setGroupedata(false);
                setFielddata(false);
                setTabdata(false);


            }
        }
        else if (seletedvalue === '3') {
            if (seletedvalue === '' || Name === '' || Stage === '' || Module === '' || Pipline === '' || OrderNumber === '') {
                swal({
                    title: "Some Fields are empty! Please fill and try again",
                    icon: "warning",
                    dangerMode: true,
                })
            } else {
                let formData = new FormData();
                formData.append('level', seletedvalue)
                formData.append('old_name', EditData.listModulesData.custom_field.name)
                formData.append('name', Name)
                formData.append('stages', Stage)
                formData.append('modules', Module)
                formData.append('pipelines', Pipline)
                formData.append('level_three_order', OrderNumber)
                formData.append('update_id', id)
                formData.append('submit', 'update_customFields')
                // formData.append('body', '')
                apiMethod5('postUpdateCustomFields', formData)
                setSeletedvalue("")
                setName("")
                settextareaview("")
                setField("")
                setStage("")
                setModule("")
                setPipline("")
                setParent("")
                setOrderNumber("")
                setSeletedvalue("Select Level")
                setGroupedata(false);
                setFielddata(false);
                setTabdata(false);

            }
        }
    }
    useEffect(() => {
        if (res.data) {
            res.data.message && toast.success(res.data.message)
            navigate(`/${config.ddemoss}customfield`);
        }
    }, [res.data])

    if (loading1) return <Loader />



    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header borderblue">
                    <h3 className="card-title">
                        {Translation(translations, "Edit Custom Field")}
                    </h3>
                    <div className="card-options">
                        <Link className="btn btn-sm btn-primary bsm-1" to={`/${config.ddemoss}customfield`}> {Translation(translations, " Go to Custom Fields")}</Link>
                    </div>
                </div>
                <div className="card-body">
                    <Formik initialValues={Initialvalues} onSubmit={handleSubmit}>
                        <Form name="myForm">

                            <div className="row appending_div">
                                <div className="col-md-6">
                                    <div className="form-group my-2">
                                        <label className="form-label">
                                            {Translation(translations, "Level")}
                                        </label>
                                        <select
                                            required=""
                                            className="form-control custom-select custom_level_select"
                                            name="level"
                                            value={seletedvalue}
                                            onChange={(e) => { setSeletedvalue(e.target.value); setStage(''); setParent('') }}
                                        >
                                            <option>{Translation(translations, "Select Level")}</option>
                                            <option value='1'>
                                                {Translation(translations, "Field")}
                                            </option>
                                            <option value='2'>
                                                {Translation(translations, "Group")}
                                            </option>
                                            <option value='3'>
                                                {Translation(translations, "TAB")}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {fielddata && (
                                    <>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field">
                                            <div className="form-group my-2">
                                                <label className="form-label">
                                                    {Translation(translations, "Name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control all_level_input"
                                                    name="name"
                                                    placeholder="Label"
                                                    value={Name}
                                                    onChange={(event) => setName(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <div className="form-group my-2">
                                                <label className="form-label">
                                                    {Translation(translations, "Type")}
                                                </label>
                                                <select
                                                    className="form-control custom-select select_option_value level_one_select"
                                                    name="type"
                                                    onChange={(e) => settextareaview(e.target.value)}
                                                    value={textareaview}
                                                >
                                                    <option>
                                                        {Translation(translations, "Select Option")}
                                                    </option>
                                                    <option value="text">
                                                        {Translation(translations, "Text")}
                                                    </option>
                                                    <option value="select">
                                                        {Translation(translations, "Select")}
                                                    </option>
                                                    <option value="textarea">
                                                        {Translation(translations, "Textarea")}
                                                    </option>
                                                    <option value="radio">
                                                        {Translation(translations, "Radio")}
                                                    </option>
                                                    <option value="date">
                                                        {Translation(translations, "Date")}
                                                    </option>
                                                    <option value="time">
                                                        {Translation(translations, "Time")}
                                                    </option>
                                                    <option value="checkbox">
                                                        {Translation(translations, "checkbox")}
                                                    </option>
                                                    <option value="number">
                                                        {Translation(translations, "Number")}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        {textAreaField &&
                                            <div className="col-md-6 level_one_field level_two_field level_three_field">
                                                <div className="form-group my-2">
                                                    <label className="form-label">
                                                        {Translation(translations, "Select Option")}
                                                    </label>
                                                    <textarea value={body} onChange={(event) => setBody(event.target.value)} className="form-control" rows="4" cols="50" placeholder="for multiple options, saperate options by comma (,). and it will worked for select, radio and checkbox"></textarea>
                                                    <small className="text-primary">for multiple options, saperate options by comma (,). and it will worked for select, radio and checkbox</small>
                                                </div>
                                            </div>
                                        }
                                        <div className="col-md-6 level_one_field">
                                            <FormControl
                                                className="form-control"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Module")}
                                                name="Module"
                                                selectList={ModuleDropDown}
                                                custom_label_name="module_name"
                                                customer_value_name="module_name"
                                                onChange={(event) => handleModule(event)}
                                                control="select_custom_options"
                                                value={Module}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field pipelines_select">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Pipeline")}
                                                name="Pipeline"
                                                selectList={piplinesData.data}
                                                custom_label_name={(Module === 'Lead' || Module === 'Client' || Module === 'Prospect') ? 'pipeline' : 'pipeline_title'}
                                                customer_value_name={'db_id'}
                                                value={Pipline}
                                                control="select_custom_options"
                                                onChange={(event) => handlePiplines(event)}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field stages_select">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Stages")}
                                                name="Stages"
                                                selectList={piplinesStageData.data}
                                                custom_label_name="name"
                                                customer_value_name="id"
                                                control="select_custom_options"
                                                onChange={event => handleStage(event)}
                                                value={Stage}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Group Parent")}
                                                name="group_parent"
                                                selectList={stageData.data}
                                                custom_label_name="name"
                                                customer_value_name="id"
                                                control="select_custom_options"
                                                value={Parent}
                                                onChange={(event) => handleParent(event)}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <label className="my-2"><b className="my-1">Order Number<b style={{ color: 'red' }}>*</b></b></label>
                                            <select
                                                className="form-control my-1"
                                                onChange={(event) => handleOrderNumber(event)}
                                                value={OrderNumber}
                                            >
                                                <option hidden>--Select--</option>
                                                {parentData.data && !parentData.data.message && parentData.data.map((item, index) => {
                                                    return (
                                                        <option value={item} key={index}>{item}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-6 level_two_field">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Field")}
                                                name="field"
                                                selectList={fieldObject}
                                                custom_label_name="label"
                                                customer_value_name="value"
                                                control="select_custom_options"
                                                onChange={(event) => setField(event.target.value)}
                                                value={Field}
                                            />
                                        </div>
                                    </>
                                )}
                                {groupedata && (
                                    <>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field">
                                            <div className="form-group my-2">
                                                <label className="form-label">
                                                    {Translation(translations, "Name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control all_level_input"
                                                    name="name"
                                                    placeholder="Label"
                                                    value={Name}
                                                    onChange={(event) => setName(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Module")}
                                                name="Module"
                                                selectList={ModuleDropDown}
                                                custom_label_name="module_name"
                                                customer_value_name="module_name"
                                                onChange={(event) => handleModule(event)}
                                                value={Module}
                                                control="select_custom_options"
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field pipelines_select">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Pipeline")}
                                                name="Pipeline"
                                                selectList={piplinesData.data}
                                                custom_label_name={(Module === 'Lead' || Module === 'Client' || Module === 'Prospect') ? 'pipeline' : 'pipeline_title'}
                                                customer_value_name={'db_id'}
                                                value={Pipline}
                                                control="select_custom_options"
                                                onChange={(event) => handlePiplines(event)}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field stages_select">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Stages")}
                                                name="Stages"
                                                selectList={piplinesStageData.data}
                                                custom_label_name="name"
                                                customer_value_name="id"
                                                control="select_custom_options"
                                                onChange={event => handleStage(event)}
                                                value={Stage}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Tab Parent")}
                                                name="group_parent"
                                                selectList={stageData.data}
                                                custom_label_name="name"
                                                customer_value_name="id"
                                                control="select_custom_options"
                                                value={Parent}
                                                onChange={(event) => handleParent(event)}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <label className="my-2"><b className="my-1">Order Number<b style={{ color: 'red' }}>*</b></b></label>
                                            <select
                                                className="form-control my-1"
                                                onChange={(event) => handleOrderNumber(event)}
                                                value={OrderNumber}
                                            >
                                                <option hidden>--Select--</option>
                                                {parentData.data && !parentData.data.message && parentData.data.map((item, index) => {
                                                    return (
                                                        <option value={item} key={index}>{item}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </>
                                )}
                                {tabdata && (
                                    <>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field">
                                            <div className="form-group my-2">
                                                <label className="form-label">
                                                    {Translation(translations, "Name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control all_level_input"
                                                    name="name"
                                                    placeholder="Label"
                                                    value={Name}
                                                    onChange={(event) => setName(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "Module")}
                                                name="Module"
                                                selectList={ModuleDropDown}
                                                custom_label_name="module_name"
                                                customer_value_name="module_name"
                                                onChange={(event) => handleModule(event)}
                                                control="select_custom_options"
                                                value={Module}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field pipelines_select">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "pipeline")}
                                                name="Pipeline"
                                                selectList={piplinesData.data}
                                                custom_label_name={(Module === 'Lead' || Module === 'Client' || Module === 'Prospect') ? 'pipeline' : 'pipeline_title'}
                                                customer_value_name={'db_id'}
                                                value={Pipline}
                                                control="select_custom_options"
                                                onChange={(event) => handlePiplines(event)}
                                            />
                                            {console.log()}
                                        </div>
                                        <div className="col-md-6 level_one_field level_two_field level_three_field stages_select">
                                            <FormControl
                                                className="form-control my-1"
                                                firstSelect={"--select--"}
                                                required={true}
                                                label={Translation(translations, "stages")}
                                                name="Stages"
                                                selectList={piplinesStageData.data}
                                                custom_label_name="name"
                                                customer_value_name="id"
                                                control="select_custom_options"
                                                onChange={event => handleStage(event)}
                                                value={Stage}
                                            />
                                        </div>
                                        <div className="col-md-6 level_one_field">
                                            <label className="my-2"><b className="my-1">Order Number<b style={{ color: 'red' }}>*</b></b></label>
                                            <select
                                                className="form-control my-1"
                                                onChange={(event) => handleOrderNumber(event)}
                                                value={OrderNumber}
                                            >
                                                <option hidden>--Select--</option>
                                                {order.data && !order.data.message && order.data.map((item, index) => {
                                                    return (
                                                        <option value={item} key={index}>{item}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="text-right mt-5">
                                <div className="text-right mt-5">
                                    <SubmitButton
                                        props={submitbutton}
                                        buttonLoading={res.isLoading}
                                    />
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

        </div>
    );
}

export default EditCustomField