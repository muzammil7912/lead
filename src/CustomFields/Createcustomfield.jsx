import { Form, Formik } from "formik";
import { Translation } from "../components/Translation";
import useFetch from "../customHooks/useFetch.js";
import config from "../services/config.json";
import FormControl from "../components/form/FormControl";
import React, { useContext, useState, useRef, useEffect } from "react";
import usePost from "../customHooks/usePost.js";
import SubmitButton from "../components/SubmitButton";
import swal from "sweetalert";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import Loader from "../components/common/Loading";
export default function Createcustomfield() {
  const { translations } = useContext(MainTranslationContexts)
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const [fielddata, setFielddata] = useState(false);
  const [groupedata, setGroupedata] = useState(false);
  const [tabdata, setTabdata] = useState(false);
  const [textAreaField, settextAreaField] = useState(false);
  const [seletedvalue, setSeletedvalue] = useState("");
  const [SelectDefault, setSelectDefault] = useState("");
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
  const textAreaValue = useRef('')

  const { data: ModuleData, loading, error } = useFetch("", "getCustomeFieldsViewModules");
  console.log(ModuleData)
  const [ModuleDropDown, setModuleDropDown] = useState([]);
  const { addHeading } = useContext(MainHeadingContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.custom_fields?.active_module === "0" || leadPermission?.custom_fields?.create === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);

  useEffect(() => {
    addHeading("Add Custom Field")
    if (ModuleData) {
      setModuleDropDown(ModuleData)
    }
  }, [ModuleData]);

  const submitbutton = {
    class: "btn btn-primary",
    text: "Store Custom Field",
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
      setOrder('');
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
  }


  useEffect(() => {
    if (stageData.data && !stageData.data.message) {
      setOrder(stageData)
      setOrderNumber(stageData?.data[stageData?.data?.length - 1])
    }
  }, [stageData.data])

  useEffect(() => {
    if (Array.isArray(parentData.data)) {
      let array = parentData.data[parentData?.data?.length - 1];
      setOrderNumber(array)

    }
  }, [parentData.data])

  const handleParent = (event) => {
    setParent(event.target.value);
    let formData = new FormData();
    formData.append('level', seletedvalue)
    formData.append('groupId', event.target.value)
    apiMethod4('postCustomFieldsOrderNum', formData)
    setOrderNumber('')
  }
  const handleOrderNumber = (event) => {
    setOrderNumber(event.target.value);
  }

  const handleSubmit = (values, { resetForm }) => {
    if (seletedvalue === '1') {
      if (seletedvalue === '' || Name === '' || textareaview === '' || Field === '' || Stage === '' || Module === '' || Pipline === '' || Parent === '' || OrderNumber === '') {
        swal({
          title: "Some Fields are empty! Please fill and try again",
          icon: "warning",
          dangerMode: true,
        })
      } else {
        let formData = new FormData();
        formData.append('level', seletedvalue)
        formData.append('name', Name)
        formData.append('type', textareaview)
        formData.append('required', Field)
        formData.append('stages', Stage)
        formData.append('modules', Module)
        formData.append('pipelines', Pipline)

        if (seletedvalue === "1") {
          formData.append('level_one_order', OrderNumber)
        } else if (seletedvalue === "2") {
          formData.append('level_two_order', OrderNumber)
        } else if (seletedvalue === "3") {
          formData.append('level_three_order', OrderNumber)
        }
        if (seletedvalue === "1") {
          formData.append('level_two_parent', Parent)
        } else if (seletedvalue === "2") {
          formData.append('level_tree_parent', Parent)
        } else {
        }
        formData.append('submit', 'create_customFields')
        formData.append('body', SelectDefault ? SelectDefault : '')
        apiMethod5('postCreateCustomFields', formData)
        setSeletedvalue("")
        setName("")
        settextareaview("")
        setFielddata("")
        setStage("")
        setModule("")
        setPipline("")
        setParent("")
        setOrderNumber("")
        setSeletedvalue("Select Level")
        setSelectDefault("")
        setGroupedata(false);
        setFielddata(false);
        setTabdata(false);

        resetForm();

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
        formData.append('type', '')
        formData.append('name', Name)
        formData.append('stages', Stage)
        formData.append('modules', Module)
        formData.append('pipelines', Pipline)
        if (seletedvalue === "1") {
          formData.append('level_one_order', OrderNumber)
        } else if (seletedvalue === "2") {
          formData.append('level_two_order', OrderNumber)
        } else if (seletedvalue === "3") {
          formData.append('level_three_order', OrderNumber)
        }
        if (seletedvalue === "1") {
          formData.append('level_two_parent', Parent)
        } else if (seletedvalue === "2") {
          formData.append('level_three_parent', Parent)
        } else {
        }
        formData.append('submit', 'create_customFields')
        formData.append('body', '')
        formData.append('required', '')
        apiMethod5('postCreateCustomFields', formData)
        setSeletedvalue("")
        setName("")
        settextareaview("")
        setFielddata("")
        setStage("")
        setModule("")
        setPipline("")
        setParent("")
        setOrderNumber("")
        setSeletedvalue("Select Level")
        setGroupedata(false);
        setFielddata(false);
        setTabdata(false);
        resetForm();
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
        formData.append('type', '')
        formData.append('required', '')
        formData.append('body', '')
        formData.append('name', Name)
        formData.append('stages', Stage)
        formData.append('modules', Module)
        formData.append('pipelines', Pipline)
        if (seletedvalue === "1") {
          formData.append('level_one_order', OrderNumber)
        } else if (seletedvalue === "2") {
          formData.append('level_two_order', OrderNumber)
        } else if (seletedvalue === "3") {
          formData.append('level_three_order', OrderNumber)
        }
        if (seletedvalue === "1") {
          formData.append('level_two_parent', Parent)
        } else if (seletedvalue === "2") {
          formData.append('level_tree_parent', Parent)
        } else {
        }
        formData.append('submit', 'create_customFields')
        apiMethod5('postCreateCustomFields', formData)
        setSeletedvalue("")
        setName("")
        settextareaview("")
        setFielddata("")
        setStage("")
        setModule("")
        setPipline("")
        setParent("")
        setOrderNumber("")
        setSeletedvalue("Select Level")
        setGroupedata(false);
        setFielddata(false);
        setTabdata(false);
        resetForm();
      }
    }
  }

  useEffect(() => {

    if (res.data) {
      toast.success(res.data.message)
      navigate(`/${config.ddemoss}customfield`)
    }
  }, [res.data])
  if (loading) return <Loader />

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header borderblue">
          <h3 className="card-title">
            {Translation(translations, "New Custom Field")}
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
                      onChange={(a) => setSeletedvalue(a.target.value)}
                      value={seletedvalue}
                    >
                      <option value="0">{Translation(translations, "Select Level")}</option>
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
                          <b> {Translation(translations, "Name")}<span style={{ color: 'red' }}> *</span></b>
                        </label>
                        <input
                          type="text"
                          className="form-control all_level_input"
                          name="name"
                          placeholder="Label"
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
                          <textarea onChange={(event) => setSelectDefault(event.target.value)} className="form-control" rows="4" cols="50" name="body" placeholder="for multiple options, saperate options by comma (,). and it will worked for select, radio and checkbox" ref={textAreaValue} ></textarea>
                          <small className="text-primary">for multiple options, saperate options by comma (,). and it will worked for select, radio and checkbox</small>
                        </div>
                      </div>
                    }
                    <div className="col-md-6 level_one_field">
                      <FormControl
                        className="form-control custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Module")}
                        name="Module"
                        selectList={ModuleDropDown}
                        custom_label_name="module_name"
                        customer_value_name="module_name"
                        onChange={(event) => handleModule(event)}
                        control="select_custom_options"
                      />
                    </div>
                    <div className="col-md-6 level_one_field level_two_field level_three_field pipelines_select">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Pipeline")}
                        name="Pipeline"
                        selectList={piplinesData.data}
                        custom_label_name={(Module === 'Lead' || Module === 'Client' || Module === 'Prospect') ? 'pipeline' : 'pipeline_title'}
                        customer_value_name={"db_id"}
                        value={Pipline}
                        control="select_custom_options"
                        onChange={(event) => handlePiplines(event)}
                      />
                    </div>
                    <div className="col-md-6 level_one_field level_two_field level_three_field stages_select">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Stages")}
                        name="Stages"
                        selectList={piplinesStageData.data}
                        custom_label_name="name"
                        customer_value_name="id"
                        control="select_custom_options"
                        onChange={(event => handleStage(event))}
                        value={Stage}
                      />
                    </div>
                    <div className="col-md-6 level_one_field">
                      <FormControl
                        className="form-control my-1 custom-select"
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
                        className="form-control my-1 custom-select"
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
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Field")}
                        name="field"
                        selectList={fieldObject}
                        custom_label_name="label"
                        customer_value_name="value"
                        control="select_custom_options"
                        onChange={(event) => setField(event.target.value)}
                      />
                    </div>
                  </>
                )}
                {groupedata && (
                  <>
                    <div className="col-md-6 level_one_field level_two_field level_three_field">
                      <div className="form-group my-2">
                        <label className="form-label">
                          <b> {Translation(translations, "Name")}<span style={{ color: 'red' }}> *</span></b>
                        </label>
                        <input
                          type="text"
                          className="form-control all_level_input"
                          name="name"
                          placeholder="Label"
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 level_one_field">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Module")}
                        name="Module"
                        selectList={ModuleDropDown}
                        custom_label_name="module_name"
                        customer_value_name="module_name"
                        onChange={(event) => handleModule(event)}
                        control="select_custom_options"
                      />
                    </div>
                    <div className="col-md-6 level_one_field level_two_field level_three_field pipelines_select">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Pipeline")}
                        name="Pipeline"
                        selectList={piplinesData.data}
                        custom_label_name={(Module === 'Lead' || Module === 'Client' || Module === 'Prospect') ? 'pipeline' : 'pipeline_title'}
                        customer_value_name={"db_id"}
                        value={Pipline}
                        control="select_custom_options"
                        onChange={(event) => handlePiplines(event)}
                      />
                    </div>
                    <div className="col-md-6 level_one_field level_two_field level_three_field stages_select">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Stages")}
                        name="Stages"
                        selectList={piplinesStageData.data}
                        custom_label_name="name"
                        customer_value_name="id"
                        control="select_custom_options"
                        onChange={(event => handleStage(event))}
                        value={Stage}
                      />
                    </div>
                    <div className="col-md-6 level_one_field">
                      <FormControl
                        className="form-control my-1 custom-select"
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
                        className="form-control my-1 custom-select"
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
                          <b> {Translation(translations, "Name")}<span style={{ color: 'red' }}> *</span></b>
                        </label>
                        <input
                          type="text"
                          className="form-control all_level_input"
                          name="name"
                          placeholder="Label"
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 level_one_field">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Module")}
                        name="Module"
                        selectList={ModuleDropDown}
                        custom_label_name="module_name"
                        customer_value_name="module_name"
                        onChange={(event) => handleModule(event)}
                        control="select_custom_options"
                      />
                    </div>
                    <div className="col-md-6 level_one_field level_two_field level_three_field pipelines_select">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Pipeline")}
                        name="Pipeline"
                        selectList={piplinesData.data}
                        custom_label_name={(Module === 'Lead' || Module === 'Client' || Module === 'Prospect') ? 'pipeline' : 'pipeline_title'}
                        customer_value_name={"db_id"}
                        value={Pipline}
                        control="select_custom_options"
                        onChange={(event) => handlePiplines(event)}
                      />
                    </div>
                    <div className="col-md-6 level_one_field level_two_field level_three_field stages_select">
                      <FormControl
                        className="form-control my-1 custom-select"
                        firstSelect={"--select--"}
                        required={true}
                        label={Translation(translations, "Stages")}
                        name="Stages"
                        selectList={piplinesStageData.data}
                        custom_label_name="name"
                        customer_value_name="id"
                        control="select_custom_options"
                        onChange={(event => handleStage(event))}
                        value={Stage}
                      />
                    </div>
                    <div className="col-md-6 level_one_field">
                      <label className="my-2"><b className="my-1">Order Number<b style={{ color: 'red' }}>*</b></b></label>
                      <select
                        className="form-control my-1 custom-select"
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
                <SubmitButton
                  props={submitbutton}
                  buttonLoading={res.isLoading}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
