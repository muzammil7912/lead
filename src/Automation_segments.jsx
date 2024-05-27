import { Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import React, { useState,useEffect } from "react";
import DatePickers from "./components/form/DatePickers";
import Dropdown2 from "./components/form/Dropdown2";
import FormControl from "./components/form/FormControl";
import config from "./services/config.json";
import { getTokenSession } from "./utils/common";

function Automation_segments({ DropDownDatas ,setSegment_field_change}) {
  const [fieldChangeModule, setfieldChangeModule] = useState(false);
  const [fieldChangeField_list, setfieldChangeField_list] = useState([]);

  const [SegmentArr, setSegmentArr] = useState([
    {
      id: 1,
      module_name: "",
      field_name: null,
      condition_value: null,
      SearchInput: "",
      select: "AND",
      between: false,
    },
   
  ]);

  let dropdown_list = [
    {
      id: "1",
      value: "in_between",
      label: "In between",
    },
    {
      id: "2",
      value: "equals",
      label: "Equals",
    },
    {
      id: "3",
      value: "not_equals",
      label: "Not equals",
    },
    {
      id: "4",
      value: "contains",
      label: "Contains",
    },
    {
      id: "5",
      value: "does_not_contain",
      label: "Does not contain",
    },
    {
      id: "6",
      value: "starts_with",
      label: "Starts with",
    },
    {
      id: "7",
      value: "ends_with",
      label: "Ends with",
    },
    {
      id: "8",
      value: "does_not_start_with",
      label: "Does not start with",
    },
    {
      id: "9",
      value: "does_not_end_with",
      label: "Does not ends with",
    },
    {
      id: "10",
      value: "is_empty",
      label: "Is empty",
    },
    {
      id: "11",
      value: "is_not_empty",
      label: "Is not empty",
    },
  ];
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };


  useEffect(() => {
    setSegment_field_change(SegmentArr)
  }, [SegmentArr])
  
const Add_new_segment=()=>{

  setSegmentArr([
    ...SegmentArr,
    {
      id: SegmentArr.length + 1,
      module_name: SegmentArr[0].module_name,
      field_name: null,
      condition_value: null,
      SearchInput: "",
      select: "AND",
      between: false,

    },
  ]);
}

  const handleModuleChangeValue = (value,index) => {
    setfieldChangeModule(value);
    const updatedObject = { ...SegmentArr[index], module_name: value };
    const updatedListss = [...SegmentArr];
    updatedListss[index] = updatedObject;
    setSegmentArr(updatedListss);
    axios
      .post(`${config.apiEndPoint}postAutomationTriggerModuleFilds`, {
        submit: "automationTrgrModuleFild",
        module: value,
      })
      .then((res) => {
        setfieldChangeField_list(
          res.data.fetchColumns.map((val) => ({
            label: val.Field ? val.Field : val.name,
            type:val.type?val.type:val.Type
          }))
        );
      });
  };
const handleFieldNameChange=(value,index,obj)=>{
  let updatedObject;
  if (obj.type === "datetime" || obj.type === "date" || obj.type === "timestamp" || obj.type === "time") {
    updatedObject = { ...SegmentArr[index], field_name: value, between: true, condition_value: "in_between" }
  } else {
    updatedObject = { ...SegmentArr[index], field_name: value, between: false, condition_value: "" }
  };
  const updatedListss = [...SegmentArr];
  updatedListss[index] = updatedObject;
  setSegmentArr(updatedListss);
}
const handleConditionChange=(value,index)=>{
  console.log(value);
  const updatedObject = { ...SegmentArr[index], condition_value: value };
  const updatedListss = [...SegmentArr];
  updatedListss[index] = updatedObject;
  setSegmentArr(updatedListss);
}
const handleChange3 = (value, element, index) => {
  // console.log(dayjs(value[0]).format('YYYY/MM/DD'));
  let prevdate = dayjs(value[0]).format('YYYY/MM/DD')

  let newdate = dayjs(value[1]).format('YYYY/MM/DD')



  const updatedObject = {
    ...SegmentArr[index],
    SearchInput: `${prevdate} - ${newdate}`,
  };
  const updatedListss = [...SegmentArr];
  updatedListss[index] = updatedObject;
  setSegmentArr(updatedListss);
};
const handleInput = (value, element, index) => {
  const updatedObject = { ...SegmentArr[index], SearchInput: value };
  const updatedListss = [...SegmentArr];
  updatedListss[index] = updatedObject;
  setSegmentArr(updatedListss);
};
const handleSingleDateChange = (value, element, index) => {
  const updatedObject = { ...SegmentArr[index], SearchInput: value };
  const updatedListss = [...SegmentArr];
  updatedListss[index] = updatedObject;
  setSegmentArr(updatedListss);
};
  const handleSelect = (value, index) => {
    console.log(value);
    const updatedObject = { ...SegmentArr[index], select: value };
    const updatedListss = [...SegmentArr];
    updatedListss[index] = updatedObject;
    setSegmentArr(updatedListss);
  };
  const handleDelete = (element, index) => {
    setSegmentArr(SegmentArr.filter((item) => item.id != element.id));
  };

  return (
    <div>
      <div className="row ">
        {SegmentArr.map((element, index) => {
          return (
            <div className="" key={index}>
              <div className="row my-3" key={index}>
                {index === 0 && (
                  <div className="col-lg-3">
                    <FormControl
                      className="form-control my-1"
                      firstSelect={"--select Module--"}
                      // label={Translation(translations, "Field")}
                      name="field_change_module"
                      selectList={DropDownDatas}
                      custom_label_name="Module"
                      customer_value_name="Module"
                      onChange={(event) =>
                        handleModuleChangeValue(event.target.value,index)
                      }
                      value={element.module_name}
                      control="select_custom_options"
                    />
                  </div>
                )}
                <div className="col-lg-9 row segement-antd">
                  <div className="col-4 mt-2 antd-segment-select">
                    <Select
                      showSearch
                      onSearch={(v) => {}}
                      onChange={(v1, v2) => {
                        console.log(v2)
                        handleFieldNameChange(v1,index,v2)}}
                      style={{ width: "100%", height: 40 }}
                      placeholder={"Search field name"}
                    >
                      {/* Array.isArray(addFollower) && datas.lead_data && 
                        addFollower.filter(ite => (datas?.parent_ids?.includes(ite?.id) === false)) */}
                      {Array.isArray(fieldChangeField_list) &&
                        fieldChangeField_list.map(({ label,type }) => (
                          <Select.Option value={label} key={label} type={type}>
                            {label}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>
                  <div className="col-4">
                    <FormControl
                      className="form-control my-1"
                      firstSelect={"--select--"}
                      // label={Translation(translations, "Field")}
                      name="field"
                      selectList={element.between ? dropdown_list : dropdown_list.filter(val => val.value !== "in_between")}
                      custom_label_name="label"
                      customer_value_name="value"
                      onChange={(event) => handleConditionChange(event.target.value,index)}
                      control="select_custom_options"
                      value={element.condition_value}
                    />
                  </div>

                  <div className=" col-4 mt-2 antd-segment-select">
                  {element.between ? (element.condition_value === "in_between" ? <DatePickers
                      changes={(value) =>
                        handleChange3(value, element, index)
                      }
                      defaultValue={element.SearchInput?.split("-")[1]?.includes("/") && [dayjs(element.SearchInput.split("-")[0], 'YYYY/MM/DD'), dayjs(element.SearchInput.split("-")[1], 'YYYY/MM/DD')]}
                    /> : <input
                      className="form-control"
                      type={"date"}
                      onChange={(e) => { handleSingleDateChange(e.target.value, element, index) }}
                      defaultValue={element.SearchInput}
                    />)
                      :

                      (
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={element.SearchInput}
                          onInput={(e) =>
                            handleInput(e.target.value, element, index)
                          }
                          placeholder="Text For Search..."
                        />


                      )}
                  </div>
                </div>
                {index !== 0 && (
                  <div className="col-lg-3 mt-2">
                    <div className="input-group fl1">
                      <select
                        className="form-control"
                        onChange={(e) => handleSelect(e.target.value, index)}
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                      <span className="input-group-append">
                        <button
                          className="btn btn-info flb"
                          type="button"
                          onClick={() => handleDelete(element, index)}
                        >
                          <i className="fa fa-trash"></i>{" "}
                        </button>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{cursor:"pointer"}} onClick={Add_new_segment}>
        <p>
          <i className="fas fa-plus"></i> Add another condition
        </p>
      </div>
    </div>
  );
}

export default Automation_segments;
