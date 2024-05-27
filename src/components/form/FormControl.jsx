import React from "react";
import Checkbox from "./Checkbox";
import File from "./File";
import Input from "./Input";
import Input2 from "./Input2";
import Intl from "./Intl";
import Intl2 from "./Intl2";
import Intl2WithValue from "./Intl2WithValue";
import Password from "./Password";
import Radio3 from "./Radio3";
import RadioButton from "./RadioButton";
import Select_Custom_Options from "./Select_Custom_Options";
import Select_Custom_Options2 from "./Select_custom2";
import Select_Custom_Options3 from "./Select_custom3";
import Select from "./Select";
import MultiSelect from "./MultiSelect";
import Select2 from "./Select2";
import Select3 from "./Select3";
import Textarea from "./Textarea";
import Textarea2 from "./Textarea2";
import Textarea3 from "./Textarea3";
import Input3 from "./Input3";
import Input4 from "./Input4";
import Input5 from "./Input5";
import Input6 from "./Input6";
import Input7 from "./Input7";

function FormControl(props) {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "input4":
      return <Input4 {...props} />;
    case "input2":
      return <Input2 {...props} />;
    case "input3":
      return <Input3 {...props} />;
    case "input5":
      return <Input5 {...props} />;
    case "input6":
      return <Input6 {...props} />;
    case "input7":
      return <Input7 {...props} />;
    case "password":
      return <Password {...props} />;
    case "file":
      return <File {...props} />;
    case "select":
      return <Select {...props} />;
    case "multiselect":
      return <MultiSelect {...props} />;
    case "select_custom_options":
      return <Select_Custom_Options {...props} />;
    case "select_custom_options2":
      return <Select_Custom_Options2 {...props} />;
    case "select_custom_options3":
      return <Select_Custom_Options3 {...props} />;
    case "intl":
      return <Intl {...props} />;
    case "intl2":
      return <Intl2 {...props} />;
    case "Intl2WithValue":
      return <Intl2WithValue {...props} />;
    case "textarea2":
      return <Textarea2 {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    case "textarea3":
      return <Textarea3 {...props} />;
    case "select2":
      return <Select2 {...props} />;
    case "select3":
      return <Select3 {...props} />;
    case "radio":
      return <RadioButton {...props} />;
    case "radio3":
      return <Radio3 {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    default:
      return null;
  }
}

export default FormControl;
