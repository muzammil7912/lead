import { Tree, TreeNode } from "react-organizational-chart";
import Modal from "react-bootstrap/Modal";
// import ModalAutomation from './ModalAutomations';
import React, { useState, useContext, useEffect } from "react";
import { Translation } from "./components/Translation";
import { MainTranslationContexts } from "./context/MainTranslationContexts";
import FormControl from "./components/form/FormControl";
import { Form, Formik, Field, useFormikContext } from "formik";
import DropdownLanguage from "./components/form/DropdownLanguage";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Button, Table } from "react-bootstrap";
import swal from "sweetalert";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { values } from "lodash";
import usePost from "./customHooks/usePost";
import config from "./services/config.json";
import axios from "axios";
import { getTokenSession } from "./utils/common";
import { useNavigate } from "react-router-dom";
import Automation_segments from "./Automation_segments";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Select } from "antd";
import { set } from "lodash";
import Automation_addTag_module from "./Automation_addTag_module";
import Automation_removeTag_module from "./Automation_removeTag_module";
import Automation_addNote_module from "./Automation_addNote_module";
import Automation_updateField_module from "./Automation_updateField_module";
import Automation_addEvent_module from "./Automation_addEvent_module";

// let dat = {
//   actions: {
//     id: "id_d0fc235faa63535202312103197",
//     label: "Wait",
//     message: "for 5 minutes",
//     itemType: "action",
//     itemGroup: "workflow",
//     actionDetails: {
//       name: "Wait",
//       label: "Wait",
//       des: "Wait for a certain period of time, or until conditions are matched.",
//       type: "wait",
//       disabled: "false",
//       icon: "<i class='fas fa-clock'></i>",
//       bgColor: "#fff",
//       color: "#212121",
//       show: "true",
//       allowEdit: "true",
//     },
//     formData: [
//       { name: "waitingMode", value: "waitFor" },
//       { name: "waitingNumber", value: "5" },
//       { name: "waitingUnit", value: "minutes" },
//       { name: "waitingFor", value: "periodOfTime" },
//     ],
//     children: [
//       {
//         id: "id_d039a17c86fda352023122315556",
//         label: null,
//         message:
//           "Does the following conditions match? (Has Made Purchase  is  18'' x 18'' Standard Microfibersad (18) )",
//         itemType: "action",
//         itemGroup: "workflow",
//         actionDetails: {
//           name: "If/Else",
//           label: "If/Else",
//           des: "Continue the automation in a different way depending on whether the conditions are matched.",
//           type: "ifElse",
//           disabled: "false",
//           icon: "<i class='fas fa-question-circle'></i>",
//           bgColor: "#535353",
//           color: "#fff",
//           show: "true",
//           allowEdit: "true",
//         },
//         formData: [
//           { name: "condition_1", value: "and" },
//           { name: "select_option_1", value: "Has Made Purchase" },
//           { name: "hidden_select_option_1", value: "made_purchase" },
//           { name: "select_condition_1", value: "is" },
//           {
//             name: "condition_value_1",
//             value: "18'' x 18'' Standard Microfibersad (18)",
//           },
//           { name: "condition_id_1", value: "39995846819925" },
//           { name: "advancedOptionsLength", value: "1" },
//         ],
//         children: [
//           {
//             id: "path1_id_ddb2807c8964e352023122315560",
//             label: null,
//             message: "Yes",
//             itemType: "path",
//             itemGroup: null,
//             actionDetails: { type: "path1", color: null, bgColor: null },
//             formData: null,
//             children: [
//               {
//                 id: "id_7e470ebd38b2e352023122322541",
//                 label: null,
//                 message: "Add tag: Tag1",
//                 itemType: "action",
//                 itemGroup: "contact",
//                 actionDetails: {
//                   name: "Add a tag",
//                   label: "Add a tag",
//                   des: "Add a tag to a contact.",
//                   type: "TagAdd",
//                   disabled: "false",
//                   icon: "<i class='fas fa-user'></i>",
//                   bgColor: "#4A7CB7",
//                   color: "#fff",
//                   show: "true",
//                   allowEdit: "true",
//                 },
//                 formData: [{ name: "tag_id", value: "26" }],
//               },
//             ],
//           },
//           {
//             id: "path2_id_fd69c7e1c5c02352023122315560",
//             label: null,
//             message: "No",
//             itemType: "path",
//             itemGroup: null,
//             actionDetails: { type: "path2", color: null, bgColor: null },
//             formData: null,
//             children: [
//               {
//                 id: "id_372a656809db7352023122330540",
//                 label: null,
//                 message: "Add tag: Test",
//                 itemType: "action",
//                 itemGroup: "contact",
//                 actionDetails: {
//                   name: "Add a tag",
//                   label: "Add a tag",
//                   des: "Add a tag to a contact.",
//                   type: "TagAdd",
//                   disabled: "false",
//                   icon: "<i class='fas fa-user'></i>",
//                   bgColor: "#4A7CB7",
//                   color: "#fff",
//                   show: "true",
//                   allowEdit: "true",
//                 },
//                 formData: [{ name: "tag_id", value: "12" }],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   triggers: [
//     {
//       id: "id_4b8ffe4ac85c735202312944889",
//       label: "Register",
//       message: null,
//       itemType: "triggerAction",
//       itemGroup: null,
//       actionDetails: {
//         callback: "triggerWithoutFormHandle",
//         name: "Register",
//         label: "Register",
//         des: "Register",
//         type: "register",
//         disabled: "false",
//         icon: "<i class='fas fa-user-circle'></i>",
//         bgColor: null,
//         color: null,
//         show: "true",
//         allowEdit: "false",
//       },
//       formData: [{ name: "action_type", value: "register" }],
//     },
//     {
//       id: "id_cabcc4928921e2852023153736759",
//       label: "Form automation :",
//       message: '"TESTING"',
//       itemType: "triggerAction",
//       itemGroup: null,
//       actionDetails: {
//         callback: "triggerTypeFormHandle",
//         name: "Type form fill",
//         label: "Type form fill",
//         des: "Type form fill",
//         type: "typeFormFill",
//         disabled: "false",
//         icon: "<i class='fas fa-align-justify'></i>",
//         bgColor: null,
//         color: null,
//         show: "true",
//         allowEdit: "true",
//       },
//       formData: [{ name: "form_id", value: "8" }],
//     },
//   ],
// };

// {
//   "actions": {
//     "id": "0.26011213341032313Thu Aug 03 2023 18:43:47 GMT+0500 (Pakistan Standard Time)",
//     "label": "Add Tag testsing in contact",
//     "icon": "fas fa-tags",
//     "children": [
//       {
//         "id": "0.971331076044311Thu Aug 03 2023 18:45:12 GMT+0500 (Pakistan Standard Time)",
//         "label": "Add Tag this this add for testing in contact",
//         "icon": "fas fa-tags",
//         "children": [],
//         "bgColor": "#4A7CB7",
//         "color": "#00000",
//         "ifelse": false,
//         "formdata": [{ "tag_value": "this this add for testing" }],
//         "actionDetails": {
//           "tittle": " in_contact",
//           "type": "add_tag",
//           "tag_value": "this this add for testing"
//         }
//       }
//     ],
//     "bgColor": "#4A7CB7",
//     "color": "#00000",
//     "ifelse": false,
//     "formdata": [{ "tag_value": "testsing" }],
//     "actionDetails": {
//       "tittle": " in_contact",
//       "type": "add_tag",
//       "tag_value": "testsing"
//     }
//   },
//   "triggers": [
//     {
//       "tittle": "Add New Contact",
//       "sub_tittle": "",
//       "id": "0.37835220559190885Thu Aug 03 2023 18:43:33 GMT+0500 (Pakistan Standard Time)",
//       "formData": [],
//       "actionDetails": [
//         {
//           "tittle": " in_contact",
//           "type": "add_tag",
//           "tag_value": "testsing"
//         },
//         {
//           "tittle": " in_contact",
//           "type": "add_note",
//           "tag_value": "testsing"
//         },
//         {
//           "tittle": " in_contact",
//           "type": "add_event",
//           "tag_value": "testsing"
//         }
//       ],
//       "segment": []
//     }
//   ]
// }
const TreeElement = ({ node }) => {
  return <DynamicTree data={node.children} />;
};

const DynamicTree = ({ data }) => {
  return data?.map((items) => {
    return (
      <TreeNode
        label={<div className="treedataNodes">Send an Email : Select</div>}
      >
        <TreeElement key={items.id} node={items} />
      </TreeNode>
    );
  });
};
function Automation() {
  // console.log(dat);
  const [show, setshow] = useState(false);
  const [res, apimethodCreateAutomation] = usePost();

  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [MapFieldMoadalShow, setMapFieldMoadalShow] = useState(false);
  const [AutomationModal, setAutomationModal] = useState(false);
  const [ActionsTriggerModal, setActionsTriggerModal] = useState(false);
  const [WaitRadio1, setWaitRadio1] = useState(false);
  const [WaitRadio2, setWaitRadio2] = useState(false);
  const [IF_ELSEROWS, setIF_ELSEROWS] = useState();
  const [If_ELSE_Array, setIf_ELSE_Array] = useState([]);
  const [mainTree_Top, setmainTree_Top] = useState([]);
  const [nodeid, setnodeid] = useState("");
  const [HoveredIndex, setHoveredIndex] = useState(null);
  const [mapField_list, setMapField_list] = useState([
    {
      id: "1",
      name: "date",
      value: "test",
      map_to: {
        lists: [{ label: "date created", value: "1" }],
      },
    },
    {
      id: "2",
      name: "email",
      value: "checking",
      map_to: {
        lists: [{ label: "email", value: "1" }],
      },
    },
    {
      id: "1",
      name: "date",
      value: "test",
      map_to: {
        lists: [{ label: "date created", value: "1" }],
      },
    },
    {
      id: "2",
      name: "email",
      value: "checking",
      map_to: {
        lists: [{ label: "email", value: "1" }],
      },
    },
    {
      id: "1",
      name: "date",
      value: "test",
      map_to: {
        lists: [{ label: "date created", value: "1" }],
      },
    },
    {
      id: "2",
      name: "email",
      value: "checking",
      map_to: {
        lists: [{ label: "email", value: "1" }],
      },
    },
  ]);

  const { translations } = useContext(MainTranslationContexts);
  // state managemnet  //////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\ for trigger
  const [HeaderModalName, setHeaderModalName] = useState();
  const [HeaderModalActions, setHeaderModalActions] = useState();
  const [WebHookTriger, setWebHookTriger] = useState(false);
  const [FieldChangeTriger, setFieldChangeTriger] = useState(false);
  const [AddedTagTriger, setAddedTagTriger] = useState(false);
  const [RemoveTagTriger, setRemoveTagTriger] = useState(false);
  const [BookingCalenderTriger, BookingCalenderTrigerset] = useState(false);
  const [WebPageVisitedTriger, WebPageVisitedTrigerset] = useState(false);
  const [DateBasedTriger, setDateBasedTriger] = useState(false);

  // state managemnet  //////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\ for  New Action

  const [ActionWait, setActionWait] = useState(false);
  const [ActionIf_Else, setActionIf_Else] = useState(false);
  const [ActionStartAutomation, setActionStartAutomation] = useState(false);
  const [ActionEndAutomation, setActionEndAutomation] = useState(false);
  const [ActionEndAnotherAutomation, setActionEndAnotherAutomation] =
    useState(false);
  const [AtionWebhook, setAtionWebhook] = useState(false);
  const [ActionPerformMath, setActionPerformMath] = useState(false);
  const [SameAllCOPE, setSameAllCOPE] = useState(false);
  const [showCreateName, setshowCreateName] = useState(false);
  const [fieldChangeModule, setfieldChangeModule] = useState(false);
  const [fieldChangeField_list, setfieldChangeField_list] = useState([]);
  const [fieldChangeField_list_math, setfieldChangeField_list_math] = useState([]);
  const [bookingCalendar_list, setbookingCalendar_list] = useState([]);
  const [segment_field_change, setSegment_field_change] = useState([]);
  const [segment_tags_add, setSegment_tags_add] = useState([]);
  const [segment_tags_remove, setSegment_tags_remove] = useState([]);
  const [allAutomation_data, setallAutomation_data] = useState("")
let math_operation_list=[{label:"Add"},{label:"Substract"},{label:"Multiply"},{label:"Divide"},]
  const navigate = useNavigate();

  // state managemnet  //////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\ for  Tree Node data
  const [treeData, setTreeData] = useState([
    // {
    //     id: 1,
    //     label: 'parent',
    //     children: [
    //         {
    //             id: 2,
    //             label: 'Child',
    //             children: [],
    //         },
    //         {
    //             id: 3,
    //             label: 'Child1',
    //             children: [],
    //         },
    //     ],
    // },
  ]);

  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  useEffect(() => {
    if (res.data) {
      // navigate(`/${config.ddemoss}allautomation`);
    }
  }, [res]);

  useEffect(() => {
    if (BookingCalenderTriger) {
      axios.get(`${config.apiEndPoint}getAllCalendars`).then((res) => {
        setbookingCalendar_list(res.data);
      });
    }
  }, [BookingCalenderTriger]);
  useEffect(() => {
    if (ActionStartAutomation||ActionEndAnotherAutomation) {
      axios.get(`${config.apiEndPoint}getAllViewAutomationAction`).then((res) => {
        setallAutomation_data(res.data);
      });
    }
  }, [ActionStartAutomation,ActionEndAnotherAutomation]);
  const showmodal = (event) => {
    const item = event.target.closest(".item_automat").innerText;
    setHeaderModalName(item);
    setAutomationModal(true);
    setshow2(true);
    setshow(false);
    switch (item) {
      case "WEB HOOK LISTNER":
        setWebHookTriger(true);
        setFieldChangeTriger(false);
        setAddedTagTriger(false);
        setRemoveTagTriger(false);
        BookingCalenderTrigerset(false);
        WebPageVisitedTrigerset(false);
        setDateBasedTriger(false);
        break;
      case "FIELD CHANGE":
        setFieldChangeTriger(true);
        setWebHookTriger(false);
        setAddedTagTriger(false);
        setRemoveTagTriger(false);
        BookingCalenderTrigerset(false);
        WebPageVisitedTrigerset(false);
        setDateBasedTriger(false);
        break;
      case "TAG ADDED":
        setAddedTagTriger(true);
        setFieldChangeTriger(false);
        setWebHookTriger(false);
        setRemoveTagTriger(false);
        BookingCalenderTrigerset(false);
        WebPageVisitedTrigerset(false);
        setDateBasedTriger(false);
        break;
      case "TAG REMOVED":
        setRemoveTagTriger(true);
        setAddedTagTriger(false);
        setFieldChangeTriger(false);
        setWebHookTriger(false);
        BookingCalenderTrigerset(false);
        WebPageVisitedTrigerset(false);
        setDateBasedTriger(false);

        break;
      case "BOOKING CALENDAR":
        BookingCalenderTrigerset(true);
        setRemoveTagTriger(false);
        setAddedTagTriger(false);
        setFieldChangeTriger(false);
        setWebHookTriger(false);
        WebPageVisitedTrigerset(false);
        setDateBasedTriger(false);

        break;
      case "WEB PAGE VISITED":
        WebPageVisitedTrigerset(true);
        BookingCalenderTrigerset(false);
        setRemoveTagTriger(false);
        setAddedTagTriger(false);
        setFieldChangeTriger(false);
        setWebHookTriger(false);
        setDateBasedTriger(false);
        break;
      case "DATE BASED":
        setDateBasedTriger(true);
        WebPageVisitedTrigerset(false);
        BookingCalenderTrigerset(false);
        setRemoveTagTriger(false);
        setAddedTagTriger(false);
        setFieldChangeTriger(false);
        setWebHookTriger(false);
        break;
    }
    // if (item === "Field changes") {
    //     setshowdatamodal_form(true)
    //     setselctor_show(false)
    //     setshow2(true)
    //     setAutomationModal(true)
    //     setshow(false)
    // }
    // else if (item === "Tag is added" || item === "Tag is removed" || item === "Wholesale" || item === "Affiliate Account" || item === "Admin account" || item === "Type form fill") {
    //     setshow(false)
    //     setAutomationModal(true)
    //     setshow2(true)
    //     setselctor_show(true)
    //     setshowdatamodal_form(false)
    // }
    // switch(item)
  };

  // ////////// add trigger direct function ////////////
  const Add_new_conatact_trigger = () => {
    setshow(false);
    setmainTree_Top((prev_data) => [
      ...prev_data,
      {
        tittle: `Add New Contact`,
        sub_tittle: ``,
        id: Math.random() + new Date(),
        formData: [],
        actionDetails:
          prev_data.length && prev_data[0].actionDetails
            ? [...prev_data[0].actionDetails]
            : [],
        segment: [],
      },
    ]);
  };
  const Add_new_opportunity_trigger = () => {
    setshow(false);
    setmainTree_Top((prev_data) => [
      ...prev_data,
      {
        tittle: `Add New Opportunity`,
        sub_tittle: ``,
        id: Math.random() + new Date(),
        formData: [],
        actionDetails:
          prev_data.length && prev_data[0].actionDetails
            ? [...prev_data[0].actionDetails]
            : [],
        segment: [],
      },
    ]);
  };
  const Add_new_project_trigger = () => {
    setshow(false);
    setmainTree_Top((prev_data) => [
      ...prev_data,
      {
        tittle: `Add New Project`,
        sub_tittle: ``,
        id: Math.random() + new Date(),
        formData: [],
        actionDetails:
          prev_data.length && prev_data[0].actionDetails
            ? [...prev_data[0].actionDetails]
            : [],
        segment: [],
      },
    ]);
  };
  const Add_new_event_trigger = () => {
    setshow(false);
    setmainTree_Top((prev_data) => [
      ...prev_data,
      {
        tittle: `Add New Event`,
        sub_tittle: ``,
        id: Math.random() + new Date(),
        formData: [],
        actionDetails:
          prev_data.length && prev_data[0].actionDetails
            ? [...prev_data[0].actionDetails]
            : [],
        segment: [],
      },
    ]);
  };

  
  // ////////// add trigger direct function ////////////

  const closeModal = () => {
    setshow2(false);
    // setshow(true);
    setAutomationModal(false);
  };

  // useEffect(() => {
  //     setIf_ELSE_Array(prevArray => [...prevArray, Math.random()]);
  // }, [IF_ELSEROWS]);
  const AddCondition_IF_Else = () => {
    setIf_ELSE_Array((prevArray) => [...prevArray, Math.random()]);
  };
  const HandleActionName = (event) => {
    const selected = event.target.closest(
      ".addActionsMenuContent_automat_each"
    ).innerText;
    const formated = selected.replace(/\n/g, "");
    // console.log(formated);
    setActionsTriggerModal(true);
    setshow1(false);
    // condition overflow  ..........case
    switch (formated) {
      case "WaitWait for a certain period of time, or until conditions are matched.":
        setActionWait(true);
        setActionIf_Else(false);
        setActionStartAutomation(false);
        setActionEndAutomation(false);
        setActionEndAnotherAutomation(false);
        setAtionWebhook(false);
        setActionPerformMath(false);
        setHeaderModalActions("Add a wait Condition");
        break;
      case "If/ElseContinue the automation in a different way depending on whether the conditions are matched.":
        setActionIf_Else(true);
        setActionWait(false);
        setActionStartAutomation(false);
        setActionEndAutomation(false);
        setActionEndAnotherAutomation(false);
        setAtionWebhook(false);
        setActionPerformMath(false);
        setHeaderModalActions("How would you like to split this automation ? ");
        break;
      case "Start an automationchoose an automation to start as an action":
        setActionStartAutomation(true);
        setActionIf_Else(false);
        setActionWait(false);
        setActionEndAutomation(false);
        setActionEndAnotherAutomation(false);
        setAtionWebhook(false);
        setActionPerformMath(false);
        setHeaderModalActions("Select an automation to enter");

        break;
      case "End this automationThis is where this automation will end":
        // setActionEndAutomation(true)
        // setActionWait(false)
        // setActionIf_Else(false)
        // setActionStartAutomation(false)
        // setActionEndAnotherAutomation(false)
        // setAtionWebhook(false)
        // setActionPerformMath(false)
        setActionsTriggerModal(false);

        break;
      case "End another automationHave this contact end another automation if they are currently in it.":
        setActionEndAnotherAutomation(true);
        setActionWait(false);
        setActionIf_Else(false);
        setActionStartAutomation(false);
        setActionEndAutomation(false);
        setAtionWebhook(false);
        setActionPerformMath(false);
        setHeaderModalActions("Select an automation to exit");
        break;
      case "WebhookPost a contact data to a URL of your choice.":
        setAtionWebhook(true);
        setActionWait(false);
        setActionIf_Else(false);
        setActionStartAutomation(false);
        setActionEndAutomation(false);
        setActionEndAnotherAutomation(false);
        setActionPerformMath(false);
        setHeaderModalActions("Webhook");

        break;
      case "Perform mathPerform math on a contact or deal numeric or date custom field.":
        setActionPerformMath(true);
        setActionWait(false);
        setActionIf_Else(false);
        setActionStartAutomation(false);
        setActionEndAutomation(false);
        setActionEndAnotherAutomation(false);
        setAtionWebhook(false);
        setHeaderModalActions("Math operation");
        break;
    }
  };
  const SameModel = (event) => {
    const selected = event.target.closest(
      ".addActionsMenuContent_automat_each"
    ).innerText;
    const formated = selected.replace(/\n/g, "");
    setSameAllCOPE(true);
    setshow1(false);
  };
  const InitialWebHookTriger = {};
  const InitialFieldChangeTriger = {
    segment_checkbox_field: "",
    add_update: "",
    run_time: "",
    field_change_to_specific_value: "",
    field_change_to: "",
    field_change_from_specific_value: "",
    field_change_from: "",
    field: "",
    field_change_module: "",
  };
  const InitialAddedTagTriger = {
    segment_checkbox_tag_added: "true",
    tags_added: "dadas",
    tags_added_runs: "first_time",
    tags_added_module: "Lead",
  };
  const InitialRemoveTagTriger = {
    segment_checkbox_tag_removed: "",
    tags_removed: "",
    tags_removed_runs: "",
    tags_removed_module: "",
  };
  const InitialBookingCalenderTriger = {
    booking_calendar_appoinment_id: "",
    booking_calendar_appoinment_name: "",
    booking_calendar_run: "",
  };
  const InitialWebPageVisitedTriger = {
    web_page_URL: "",
    web_page_URL_sub: "",
    runs: "",
  };
  const InitialDateBasedTriger = {};
  const InitialWaitAction = {
    wait_for: "wait for",
  };
  const InitialIf_ElseAction = {};
  const InitialStartAutomationAction = {
    add_automation_select:[],
    add_automation_select_list:[]
  };
  const InitialEndAutomationAction = {
    add_automation_select:[],
    add_automation_select_list:[]
  };
  const InitialEndAnotherAutomationAction = {};
  const InitialWebhookAction = {};
  const InitialPerformMathAction = {
    math_operation:"",
    module_math:"",
    field_math:"",
    value_number:"",
  };

  // tree node functions ......................................................
  const run_time = [
    {
      label: "first time",
      value: "first_time",
    },
    {
      label: "every time",
      value: "every_time",
    },
  ];
  const add_update = [
    {
      label: "Added or Updated ",
      value: "Added_or_Updated",
    },
    {
      label: "Added",
      value: "Added",
    },
    {
      label: "Updated",
      value: "Updated",
    },
  ];
  const DropDownDatas = [
    {
      Module: "Lead",
      id: 1,
    },
    {
      Module: "Prospect",
      id: 2,
    },
    {
      Module: "Client",
      id: 3,
    },
    {
      Module: "Opportunity",
      id: 4,
    },
    {
      Module: "Project",
      id: 4,
    },
    {
      Module: "Action",
      id: 5,
    },
    {
      Module: "Follow Up",
      id: 6,
    },
  ];
  const ActionModalCanelHandle = () => {
    setActionsTriggerModal(false);
    setshow1(true);
    setWaitRadio2(false);
    setWaitRadio1(false);
  };

  const handleSubmit_Action_Modals = () => {
    setActionsTriggerModal(false);
    setshow1(false);
    setWaitRadio2(false);
    setWaitRadio1(false);
  };

  const handleFieldChangeValue = (value) => {
    setfieldChangeModule(value);
    axios
      .post(`${config.apiEndPoint}postAutomationTriggerModuleFilds`, {
        submit: "automationTrgrModuleFild",
        module: value,
      })
      .then((res) => {
        setfieldChangeField_list(
          res.data.fetchColumns.map((val) => ({
            label: val.Field ? val.Field : val.name,
          }))
        );
      });
  };

  const handleFieldChangeValue2 = (value) => {
    
    axios
      .post(`${config.apiEndPoint}postAutomationTriggerModuleFilds`, {
        submit: "automationTrgrModuleFild",
        module: value,
      })
      .then((res) => {
        let a=res.data.fetchColumns.filter((val) =>{
          let type=val.type??val.Type
         if(type==="number"||type === "datetime" || type === "date" || type === "timestamp" || type === "time")return{}
        })
        console.log(a)
        setfieldChangeField_list_math(
          a.map((val) => ({
            label: val.Field ? val.Field : val.name,
            type:val.type??val.Type
          }))
        );
      });
  };
  // const node_repeater=(data,obj)=>{
  //   data.map((val,index)=>{
  //     if(val.children.length){
  //       val.children.map((val2)=>{
  //         if(val2.children.length){
  //           node_repeater(val2.children,obj)
  //         }else{
  //           if(!obj.ifelse){val2.children.push(obj)}else{
  //             obj.children=[{
  //               id:Math.random(),
  //               label:"yes",
  //               children:[]
  //             },{
  //               id:Math.random(),
  //               label:"no",
  //               children:[]
  //             }]
  //             val2.children.push(obj)
  //           }
  //         }
  //       })
  //     }else{
  //       if(!obj.ifelse){val.children.push(obj)}else{
  //         obj.children=[{
  //           id:Math.random(),
  //           label:"yes",
  //           children:[]
  //         },{
  //           id:Math.random(),
  //           label:"no",
  //           children:[]
  //         }]
  //         val.children.push(obj)
  //       }
  //     }
  //       })

  // }
  const node_repeater = (data, obj) => {
    // Use forEach instead of map for side effects
    data.forEach((val) => {
      if (val.children.length) {
        // Recursively call the function on the children
        node_repeater(val.children, obj);
      } else {
        // Use concat instead of push to create a new array
        if (nodeid === val.id) {
          val.children = obj.ifelse
            ? val.children.concat({
                ...obj,
                children: [
                  {
                    id: Math.random() + new Date(),
                    label: "yes",
                    children: [],
                  },
                  { id: Math.random() + new Date(), label: "no", children: [] },
                ],
              })
            : val.children.concat(obj);
        }
      }
    });
  };
  const node_test = (obj) => {
    if (treeData.length) {
      let copytreedata = [...treeData];
      if (copytreedata[0].children.length) {
        node_repeater(copytreedata[0].children, obj);
      } else {
        if (!obj.ifelse) {
          copytreedata[0].children.push(obj);
        } else {
          obj.children = [
            {
              id: Math.random() + new Date(),
              label: "yes",
              children: [],
            },
            {
              id: Math.random() + new Date(),
              label: "no",
              children: [],
            },
          ];
          copytreedata[0].children.push(obj);
        }
      }
      setTreeData(copytreedata);
    }
  };

  // const childrenPush_map = (comming_data, data_to_push) => {
  //   let datas = [...comming_data];
  //   let wait_obj = {
  //     id: Math.random(),
  //     label: `sdfsscscssd`,
  //     icon: "fas fa-clock",
  //     children: [],
  //   };
  //   console.log(datas, data_to_push, "mappp");

  //   datas.map((data, index) => {
  //     if (data.children.length) {
  //       data.children.map((val, index) => {
  //         if (val.children.length) {
  //           console.log(val, "ifff");
  //           childrenPush_map(val.children, data_to_push);
  //         } else {
  //           console.log(val, "elseee");
  //           val.children.push(data_to_push);
  //         }
  //       });
  //     } else {
  //       data.children.push(data_to_push);
  //     }
  //   });
  //   return datas;
  // };
  // function addspecificnode(nodeId) {
  //     setTreeData((prevTreeData) => {
  //         // Find the node in the treeData array using the nodeId
  //         const updatedTreeData = [...prevTreeData];

  //         const findNodeAndAddChild = (data) => {
  //             for (let i = 0; i < data.length; i++) {
  //                 const node = data[i];
  //                 if (node.id === nodeId) {
  //                     // Check if the child node already exists
  //                     const childExists = node.children.some(child => child.label === `Child of ${node.label}`);
  //                     if (!childExists) {
  //                         // Add a new child node to the found node
  //                         const newChildNode = {
  //                             id: Date.now(), // Generate a unique ID for the new child node
  //                             label: `Child of ${node.label}`,
  //                             children: []
  //                         };
  //                         node.children.push(newChildNode);
  //                     }
  //                     break; // Exit the loop once the node is found and the child is added
  //                 }
  //                 if (node.children && node.children.length > 0) {
  //                     findNodeAndAddChild(node.children);
  //                 }
  //             }
  //         };

  //         findNodeAndAddChild(updatedTreeData); // Call the recursive function to find the node and add the child

  //         return updatedTreeData; // Return the updated treeData
  //     });
  // }
  const fields_according_to_module = (module) => {
    axios
      .post(`${config.apiEndPoint}postLeadDeletedCorrelations`, module)
      .then((response) => {
        return response.data;
      });
  };

  function addspecificnode(nodeId) {
    const numChildrenToAdd = parseInt(
      prompt("Enter the number of children to add:")
    );

    setTreeData((prevTreeData) => {
      // Find the node in the treeData array using the nodeId
      const updatedTreeData = [...prevTreeData];

      const findNodeAndAddChild = (data) => {
        for (let i = 0; i < data.length; i++) {
          const node = data[i];
          if (node.id === nodeId) {
            // Check if the child node already exists
            const childExists = node.children.some(
              (child) => child.label === `Child of ${node.label}`
            );

            if (!childExists) {
              // Add new child nodes to the found node
              let v = 0;
              for (let j = 0; j < numChildrenToAdd; j++) {
                const newChildNode = {
                  id: Date.now() + j,
                  label: `Child ${j + 1} of ${node.label}`,
                  icon: "fas fa-envelope",
                  children: [],
                };
                node.children.push(newChildNode);
                v++;
                console.log(v);
              }
            }
            break; // Exit the loop once the node is found and the children are added
          }

          if (node.children && node.children.length > 0) {
            findNodeAndAddChild(node.children);
          }
        }
      };

      findNodeAndAddChild(updatedTreeData); // Call the recursive function to find the node and add the children

      return updatedTreeData; // Return the updated treeData
    });
  }

  function generateTreeNodes(data) {
    return data.map((node, index) => {
      const hasChildren = node.children && node.children.length > 0;

      return (
        <TreeNode
          className="Tree-node-pr"
          key={index}
          label={
            node.type !== "add_note" ? (
              <div
                className="each-treeNode-auto "
                style={{ backgroundColor: node.bgColor, color: node.color }}
              >
                {<i className={`${node.icon} me-2`}></i>}
                {node.label}
              </div>
            ) : (
              <div
                className="each-treeNode-auto "
                style={{
                  backgroundColor: node.bgColor,
                  color: node.color,
                  display: "flex",
                }}
              >
                {<i className={`${node.icon} me-2`}></i>} Add Note "
                <span
                  dangerouslySetInnerHTML={{
                    __html: node?.actionDetails?.note_value ?? "",
                  }}
                ></span>{" "}
                " in {node?.actionDetails?.module_name ?? ""}
              </div>
            )
          }
        >
          {hasChildren ? (
            generateTreeNodes(node.children)
          ) : ((node?.type==="end_automation")?
            "":<TreeNode
              label={
                <div
                  className="nodestyling"
                  onClick={() => {
                    if(mainTree_Top.length){ setnodeid(node.id);
                     console.log(mainTree_Top)
                      setshow1(true);}else{
                      
                       swal({
                         title: "Atleast add one trigger first",
                         icon: "error",
                       });
                     }
                   }}
                >
                  {console.log(node,data[index-1]?.children[0]?.type,"ASD")}
                  +
                </div>
              }
            />
          )}
        </TreeNode>
      );
    });
  }
  // let node_obj = {
  //   id: Math.random() + new Date(),
  //   label: "if else statement",
  //   ifelse: true,
  //   bgColor: "#4287f5",
  //   children: [],
  // };
  // let node_obj2 = {
  //   id: Math.random() + new Date(),
  //   label: "single task",
  //   ifelse: false,
  //   bgColor: "#c1f7eb",
  //   children: [],
  // };

  // handle submits for actions

  const HandleActionWaitSubmit = (v) => {
    // if (v.radioOption1 && v.radioOption1 === "wait_1") {
    //   let wait_obj = {
    //     id: Math.random() + new Date(),
    //     label: `${v.wait_for} ${v.wait_time_count ? v.wait_time_count : ""
    //       } ${v.wait_time_days ? v.wait_time_days : ""}`,
    //     icon: "fas fa-clock",
    //     children: [],
    //     bgColor: "#69afff",
    //     color: "#00000",
    //     ifelse: false,
    //     formdata: [v],
    //     actionDetails: v,
    //   };
    //   treeData.length === 0
    //     ? setTreeData([wait_obj])
    //     : node_test(wait_obj);
    //   // console.log(treeData, "asdasds");
    // }
    if (v.radioOption1 && v.radioOption1 === "wait_1") {
      if (v.wait_for && v.wait_time_count && v.wait_time_days) {
        let wait_obj = {
          type: "wait_for",

          id: Math.random() + new Date(),
          label: `${v.wait_for} ${v.wait_time_count ? v.wait_time_count : ""} ${
            v.wait_time_days ? v.wait_time_days : ""
          }`,
          icon: "fas fa-clock",
          children: [],
          bgColor: "#69afff",
          color: "#00000",
          ifelse: false,
          formdata: [v],
          actionDetails: v,
        };
        treeData.length === 0 ? setTreeData([wait_obj]) : node_test(wait_obj);
        handleSubmit_Action_Modals();
        if (mainTree_Top.length) {
          let b = mainTree_Top.map((trigger) => {
            trigger.actionDetails = [...trigger.actionDetails, wait_obj];
            return trigger;
          });
          setmainTree_Top(b);
        }
        // console.log(treeData, "asdasds");
      } else {
        swal({
          title: "Fill all the required fields",
          icon: "error",
        });
      }
    } else if (v.radioOption1 && v.radioOption1 === "wait_2") {
      if (v.no_time_limit) {
        let wait_obj = {
          type: "wait_for",
          title: "wait_for",
          id: Math.random() + new Date(),
          label: v.no_time_limit,
          icon: "fas fa-clock",
          children: [],
          bgColor: "#69afff",
          color: "#00000",
          ifelse: false,
          formdata: [v],
          actionDetails: v,
        };
        treeData.length === 0 ? setTreeData([wait_obj]) : node_test(wait_obj);
        if (mainTree_Top.length) {
          let b = mainTree_Top.map((trigger) => {
            trigger.actionDetails = [...trigger.actionDetails, wait_obj];
            return trigger;
          });
          setmainTree_Top(b);
        }

        handleSubmit_Action_Modals();
      } else {
        swal({
          title: "Fill all the required fields",
          icon: "error",
        });
      }
    }
  };

  const Handle_if_elseSubmit = (value) => {
    // let ifelse_obj = {
    //   bgColor: "#535353",
    //   color: "#fffff",
    //   id: Math.random() + new Date(),
    //   label: `Does this following condition match?( ${value.select_option_1} ${value.select_condition_1} ${value.condition_value_1} ${value.and_or_1}
    //    ${value.select_option_2} ${value.select_condition_2} ${value.condition_value_2} ${value.and_or_2} ${value.select_option_3} ${value.select_condition_3} ${value.condition_value_3} )`,
    //   icon: "fas fa-question-circle",
    //   children: [],
    //   ifelse: true,
    //   formData: [value],
    //   actionDetails: value,
    // };
    let reqField = [];

    If_ELSE_Array.length &&
      If_ELSE_Array.map((obj) => {
        Object.keys(obj).map((item) => {
          if (item !== "between") {
            if (!obj[item]) {
              reqField.push("segement");
            }
          }
        });
      });

    let s = If_ELSE_Array.reduce((acc, val, index) => {
      return acc.concat(
        ` (In ${index > 0 ? val.select : ""} ${val.module_name}  ${
          val.field_name
        } ${val.condition_value} ${val.SearchInput} )`
      );
    }, "");
    let ifelse_obj = {
      type: "if_else",

      title: "if_else",
      bgColor: "#535353",
      color: "#fffff",
      id: Math.random() + new Date(),
      label: `Does this following condition match? ${s}`,
      icon: "fas fa-question-circle",
      children: [
        {
          id: Math.random() + new Date(),
          label: "yes",
          children: [],
        },
        {
          id: Math.random() + new Date(),
          label: "no",
          children: [],
        },
      ],
      ifelse: true,
      formData: If_ELSE_Array,
      actionDetails: If_ELSE_Array,
    };
    // for (let key in value) {
    //   if (key.startsWith("select_option")) {
    //     const index = key.split("_")[2];
    //     const selectCondition = value[`select_condition_${index}`];
    //     const conditionValue = value[`condition_value_${index}`];
    //     const andOr = value[`and_or_${index}`];
    //     const selectOption = value[key];

    //     ifelse_obj.label += ` ${selectOption} ${selectCondition} ${conditionValue} ${
    //       andOr ? andOr : ""
    //     }`;
    //   }
    // }
if(!reqField.length){    treeData.length === 0 ? setTreeData([ifelse_obj]) : node_test(ifelse_obj);
    if (mainTree_Top.length) {
      let b = mainTree_Top.map((trigger) => {
        trigger.actionDetails = [...trigger.actionDetails, ifelse_obj];
        return trigger;
      });
      setmainTree_Top(b);
    }
    handleSubmit_Action_Modals();
  }else{
    swal({
      title:"All Fields are Required",
      icon:"error"
    })
  }

  };
  const handleEnd_automation_submit=()=>{
    let wait_obj = {
      type: "end_automation",

      id: Math.random() + new Date(),
      label: `End this automation`,
      icon: "fas fa-cancel",
      children: [],
      bgColor: "#69afff",
      color: "#00000",
      ifelse: false,
      formdata: [],
      actionDetails: {},
    };
    treeData.length === 0 ? setTreeData([wait_obj]) : node_test(wait_obj);
    handleSubmit_Action_Modals();
    if (mainTree_Top.length) {
      let b = mainTree_Top.map((trigger) => {
        trigger.actionDetails = [...trigger.actionDetails, wait_obj];
        return trigger;
      });
      setmainTree_Top(b);
    }

  }
  const handle_add_contact_tag = (
    value,
    setAutomation_addTag_module,
    module_name,
    backgroundColor
  ) => {
    console.log("value");
    if (value.tag_to_add_contact) {
      let contact_tag_obj = {
        type: "add_tag",
        title: `add_tag_${module_name}`,
        id: Math.random() + new Date(),
        label: `Add Tag ${value.tag_to_add_contact} in ${module_name}`,
        icon: "fas fa-tags",
        children: [],
        bgColor: backgroundColor,
        color: "#00000",
        ifelse: false,
        formdata: [{ tag_value: value.tag_to_add_contact }],
        actionDetails: {
          tittle: ` in_${module_name}`,
          type: "add_tag",
          module_name: module_name,

          tag_value: value.tag_to_add_contact,
        },
      };
      treeData.length === 0
        ? setTreeData([contact_tag_obj])
        : node_test(contact_tag_obj);
      if (mainTree_Top.length) {
        let b = mainTree_Top.map((trigger) => {
          trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
          return trigger;
        });
        setmainTree_Top(b);
      }
      setSameAllCOPE(false);
      setshow1(false);
      setAutomation_addTag_module(false);
    }
  };
  const handle_remove_contact_tag = (
    value,
    setAutomation_addTag_module,
    module_name,
    backgroundColor
  ) => {
    console.log(value);
    if (value.tag_to_add_contact) {
      let contact_tag_obj = {
        type: "remove_tag",

        title: `remove_tag_${module_name}`,
        id: Math.random() + new Date(),
        label: `remove Tag ${value.tag_to_add_contact} in ${module_name}`,
        icon: "fas fa-tags",
        children: [],
        bgColor: backgroundColor,
        color: "#00000",
        ifelse: false,
        formdata: [{ tag_value: value.tag_to_add_contact }],
        actionDetails: {
          tittle: ` in_${module_name}`,
          type: "remove_tag",
          tag_value: value.tag_to_add_contact,
          module_name: module_name,
        },
      };
      treeData.length === 0
        ? setTreeData([contact_tag_obj])
        : node_test(contact_tag_obj);
      if (mainTree_Top.length) {
        let b = mainTree_Top.map((trigger) => {
          trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
          return trigger;
        });
        setmainTree_Top(b);
      }
      setSameAllCOPE(false);
      setshow1(false);
      setAutomation_addTag_module(false);
    }
  };

  const handle_addNote_module = (value, module_name, backgroundColor) => {
    console.log(value);
    if (value) {
      let contact_tag_obj = {
        type: "add_note",
        title: `add_note_${module_name}`,
        id: Math.random() + new Date(),
        label: `Add Note ${value} in ${module_name}`,
        icon: "fa fa-sticky-note ",
        children: [],
        bgColor: backgroundColor,
        color: "#00000",
        ifelse: false,
        formdata: [{ tag_value: value }],
        actionDetails: {
          tittle: ` in_${module_name}`,
          type: "add_note",
          note_value: value,
          module_name: module_name,
        },
      };
      treeData.length === 0
        ? setTreeData([contact_tag_obj])
        : node_test(contact_tag_obj);
      if (mainTree_Top.length) {
        let b = mainTree_Top.map((trigger) => {
          trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
          return trigger;
        });
        setmainTree_Top(b);
      }
      setSameAllCOPE(false);
      setshow1(false);
      // setAutomation_addTag_module(false);
    }
  };
  const handle_addEvent_module = (value, module_name, backgroundColor) => {
    console.log(value);
    if (value) {
      let contact_tag_obj = {
        type: "add_event",
        title: `add_event_${module_name}`,
        id: Math.random() + new Date(),
        label: `Add Event "${value.title}" in ${module_name}`,
        icon: "fa fa-sticky-note ",
        children: [],
        bgColor: backgroundColor,
        color: "#00000",
        ifelse: false,
        formdata: [ value],
        actionDetails: {
          tittle: ` in_${module_name}`,
          type: "add_event",
          module_name: module_name,
          ...value,

        },
      };
      treeData.length === 0
        ? setTreeData([contact_tag_obj])
        : node_test(contact_tag_obj);
      if (mainTree_Top.length) {
        let b = mainTree_Top.map((trigger) => {
          trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
          return trigger;
        });
        setmainTree_Top(b);
      }
      setSameAllCOPE(false);
      setshow1(false);
      // setAutomation_addTag_module(false);
    }
  };
  const handle_updateField_module = (values, module_name, backgroundColor) => {

    if (values.module_name === "contact") {
      if (
        values.field_module &&
        values.field_name &&
        values.updated_field_value
      ) {
        let contact_tag_obj = {
          type: "update_field",
          title: `update_field_${module_name}`,
          id: Math.random() + new Date(),
          label: `Update field ${values.field_name} in ${module_name}`,
          icon: "fa fa-sticky-note ",
          children: [],
          bgColor: backgroundColor,
          color: "#00000",
          ifelse: false,
          formdata: [
            {
              module_name: module_name,
              field_name: values.field_name,
              updated_field_value: values.updated_field_value,
            },
          ],
          actionDetails: {
            tittle: ` in_${module_name}`,
            type: "update_field",
            module_name: module_name,
            field_name: values.field_name,
            updated_field_value: values.updated_field_value,
          },
        };
        treeData.length === 0
          ? setTreeData([contact_tag_obj])
          : node_test(contact_tag_obj);
        if (mainTree_Top.length) {
          let b = mainTree_Top.map((trigger) => {
            trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
            return trigger;
          });
          setmainTree_Top(b);
        }
        setSameAllCOPE(false);
        setshow1(false);
      } else {
        swal({
          title: "Fill all the required fields",
          icon: "error",
        });
      }
    } else {
      if (values.field_name && values.updated_field_value) {
        let contact_tag_obj = {
          type: "update_field",
          title: `update_field_${module_name}`,
          id: Math.random() + new Date(),
          label: `Update field ${values.field_name} in ${module_name}`,
          icon: "fa fa-sticky-note ",
          children: [],
          bgColor: backgroundColor,
          color: "#00000",
          ifelse: false,
          formdata: [
            {
              module_name: module_name,
              field_name: values.field_name,
              updated_field_value: values.updated_field_value,
            },
          ],
          actionDetails: {
            tittle: ` in_${module_name}`,
            type: "update_field",
            module_name: module_name,
            field_name: values.field_name,
            updated_field_value: values.updated_field_value,
          },
        };
        treeData.length === 0
          ? setTreeData([contact_tag_obj])
          : node_test(contact_tag_obj);
        if (mainTree_Top.length) {
          let b = mainTree_Top.map((trigger) => {
            trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
            return trigger;
          });
          setmainTree_Top(b);
        }
        setSameAllCOPE(false);
        setshow1(false);
      } else {
        swal({
          title: "Fill all the required fields",
          icon: "error",
        });
      }
    }

    
  };
  const handle_add_other_automation=(values,add_or_end)=>{
    if(values.add_automation_select.length){

      let s = values?.add_automation_select_list.reduce((acc, val) => {
        return acc.concat(
          ` "${val.children}" ,`
        );
      }, "");

      let contact_tag_obj = {
        type: `${add_or_end}_automation`,
        title: `${add_or_end} automation `,
        id: Math.random() + new Date(),
        label: `${add_or_end} automation ${s} `,
        icon: "fa fa-sticky-note ",
        children: [],
        bgColor: "#535353",
        color: "#00000",
        ifelse: false,
        formdata: [
          {
            automation_select: values.add_automation_select,
           
          },
        ],
        actionDetails: {
          automation_select: values.add_automation_select,

          
        },
      };
      treeData.length === 0
        ? setTreeData([contact_tag_obj])
        : node_test(contact_tag_obj);
      if (mainTree_Top.length) {
        let b = mainTree_Top.map((trigger) => {
          trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
          return trigger;
        });
        setmainTree_Top(b);
      }
    handleSubmit_Action_Modals();

      setSameAllCOPE(false);
      setshow1(false);

      console.log(values.add_automation_select);
    }else{
      swal({
        title: "Select atleast one automation",
        icon: "error",
      });
    }
    
  }
  const handle_PerfomMath=(values)=>{
if(values.field_math&&values.math_operation&&values.value_number&&values.module_math){
  let contact_tag_obj = {
    type: `math_operation_automation`,
    title: `MATH OPERATION ${values.module_math}  ${values.field_math} ${values.math_operation} ${values.value_number}`,
    id: Math.random() + new Date(),
    label: `MATH OPERATION ${values.module_math}  ${values.field_math} ${values.math_operation} ${values.value_number}`,
    icon: "fa fa-sticky-note ",
    children: [],
    bgColor: "#eb7a7a",
    color: "#00000",
    ifelse: false,
    formdata: [
      values
    ],
    actionDetails: values,
  };
  treeData.length === 0
    ? setTreeData([contact_tag_obj])
    : node_test(contact_tag_obj);
  if (mainTree_Top.length) {
    let b = mainTree_Top.map((trigger) => {
      trigger.actionDetails = [...trigger.actionDetails, contact_tag_obj];
      return trigger;
    });
    setmainTree_Top(b);
  }
handleSubmit_Action_Modals();

  setSameAllCOPE(false);
  setshow1(false);



}else{
  swal({
    title:"All Fields are Required",
    icon:"error"
  })
}
  }
  // ................................./                ////////////////////////////////////////////////////////// for handle submit for triggers
  const HandleSubmitTagAdded = (values) => {
    let reqArray = [];
    let isEmptyField = false;

    for (let key in values) {
      if (values[key] === "" && key !== "segment_checkbox_tag_added") {
        reqArray.push(key);
        isEmptyField = true;
      }
    }
    if (values.segment_checkbox_tag_added) {
      segment_tags_add.length &&
        segment_tags_add.map((obj) => {
          Object.keys(obj).map((item) => {
            if (item !== "between") {
              if (!obj[item]) {
                reqArray.push("segement");
                isEmptyField = true;
              }
            }
          });
        });
    }
    let s = segment_tags_add.reduce((acc, val) => {
      return acc.concat(
        ` ${val.select} (In ${val.module_name}  ${val.field_name} ${val.condition_value} ${val.SearchInput})`
      );
    }, "");
    console.log(segment_tags_add, s);

    if (!isEmptyField) {
      setmainTree_Top((prev_data) => [
        ...prev_data,
        {
          tittle: "TAG ADDED",
          sub_tittle: `${values?.tags_added?.replaceAll(
            "_",
            " "
          )} ${values?.tags_added_runs?.replaceAll("_", " ")}  ${
            values.segment_checkbox_tag_added ? s : ""
          }`,
          id: Math.random() + new Date(),
          formData: [values],
          actionDetails:
            prev_data.length && prev_data[0].actionDetails
              ? [...prev_data[0].actionDetails]
              : [],
          segment: values.segment_checkbox_tag_added ? segment_tags_add : [],
        },
      ]);
      setshow2(false);
    } else {
      swal({
        title: "Fill all the required fields",
        icon: "error",
      });
    }
  };

  const HandleSubmitTagRemoved = (values) => {
    let reqArray = [];
    let isEmptyField = false;

    for (let key in values) {
      if (values[key] === "" && key !== "segment_checkbox_tag_removed") {
        reqArray.push(key);
        isEmptyField = true;
      }
    }
    if (values.segment_checkbox_tag_removed) {
      segment_tags_remove.length &&
        segment_tags_remove.map((obj) => {
          Object.keys(obj).map((item) => {
            if (item !== "between") {
              if (!obj[item]) {
                reqArray.push("segement");
                isEmptyField = true;
              }
            }
          });
        });
    }
    let s = segment_tags_remove.reduce((acc, val) => {
      return acc.concat(
        ` ${val.select} (In ${val.module_name}  ${val.field_name} ${val.condition_value} ${val.SearchInput})`
      );
    }, "");
    console.log(segment_tags_remove, s);

    if (!isEmptyField) {
      setmainTree_Top((prev_data) => [
        ...prev_data,
        {
          tittle: "TAG Removed",
          sub_tittle: `${values?.tags_removed?.replaceAll(
            "_",
            " "
          )} ${values?.tags_removed_runs?.replaceAll("_", " ")}  ${
            values.segment_checkbox_tag_removed ? s : ""
          }`,
          id: Math.random() + new Date(),
          formData: [values],
          actionDetails:
            prev_data.length && prev_data[0].actionDetails
              ? [...prev_data[0].actionDetails]
              : [],
          segment: values.segment_checkbox_tag_removed
            ? segment_tags_remove
            : [],
        },
      ]);
      setshow2(false);
    } else {
      swal({
        title: "Fill all the required fields",
        icon: "error",
      });
    }
  };
  const HandleSubmitBooking = (values) => {
    console.log(values);
    let reqArray = [];
    let isEmptyField = false;

    for (let key in values) {
      if (values[key] === "") {
        reqArray.push(key);
        isEmptyField = true;
      }
    }

    if (!isEmptyField) {
      setmainTree_Top((prev_data) => [
        ...prev_data,
        {
          tittle: "Booking Calender",
          sub_tittle: `${values?.booking_calendar_appoinment_name?.replaceAll(
            "_",
            " "
          )} ${values?.booking_calendar_run?.replaceAll("_", " ")}`,
          id: Math.random() + new Date(),
          formData: [values],
          actionDetails:
            prev_data.length && prev_data[0].actionDetails
              ? [...prev_data[0].actionDetails]
              : [],
        },
      ]);
      closeModal();
    } else {
      swal({
        title: "Fill all the required fields",
        icon: "error",
      });
    }
  };
  const HandleSubmitWebPage = (values) => {
    let reqArray = [];
    let isEmptyField = false;

    for (let key in values) {
      if (values[key] === "") {
        reqArray.push(key);
        isEmptyField = true;
      }
    }

    if (!isEmptyField) {
      setmainTree_Top((prev_data) => [
        ...prev_data,
        {
          tittle: "WEB PAGE VISITED",
          sub_tittle: `${values?.web_page_URL?.replaceAll(
            "_",
            " "
          )} ${values?.web_page_URL_sub?.replaceAll(
            "_",
            " "
          )} ${values?.runs?.replaceAll("_", " ")}`,
          id: Math.random() + new Date(),
          formData: [values],
          actionDetails:
            prev_data.length && prev_data[0].actionDetails
              ? [...prev_data[0].actionDetails]
              : [],
        },
      ]);
      closeModal();
    } else {
      swal({
        title: "Fill all the required fields",
        icon: "error",
      });
    }
  };

  const HandleDelete_Trigger = (trigger) => {
    swal({
      text: "Are you sure to delete the trigger?",
      icon: "warning",
      buttons: ["Close", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedMainTree = mainTree_Top.filter(
          (fieldName) => fieldName.id !== trigger.id
        );
        // console.log(mainTree_Top);
        setmainTree_Top(updatedMainTree);
      }
    });
  };
  const HandleEdit_Trigger = (trigger) => {

   console.log(trigger);
  };
  return (
    <>
      <div className="Autmation_section row">
        <div className="col-md-12 mt-3 automationbtn_header">
          <button
            onClick={() => {
              if (mainTree_Top.length && treeData.length) {
                setshowCreateName(true);
              } else {
                swal({
                  title: "Please select atleast one trigger and action",
                  icon: "warning",
                });
              }
            }}
          >
            Save This Automation
          </button>
        </div>
        <Tree
          lineWidth={"4px"}
          lineColor={"#000"}
          lineBorderRadius={"10px"}
          label={
            <div className="d-flex flex-column gap-1">
              <div className="d-flex gap-1 tittle_list  justify-content-center w-100 flex-wrap">
                {mainTree_Top.length > 0 &&
                  mainTree_Top.map((fieldName, index) => (
                    <div
                      className={`treedataheader border m-0`}
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      // onClick={() => HandleDelete_Trigger(fieldName)}>
                    >
                      {" "}
                      {HoveredIndex === index && (
                        <div className="hover-delete">
                          <div className="delete-icon d-flex gap-2 py-2">
                            <FaEdit
                              onClick={() => HandleEdit_Trigger(fieldName)}
                            />
                            <FaTrash
                              onClick={() => HandleDelete_Trigger(fieldName)}
                            />
                          </div>
                        </div>
                      )}
                      <b> {fieldName.tittle}</b>
                      {fieldName.sub_tittle ? `"${fieldName.sub_tittle}"` : ""}
                    </div>
                  ))}
              </div>
              <div className="mx-auto">
                {" "}
                <div
                  className={`treedataheader`}
                  onClick={() => {
                    setshow(true);
                  }}
                >
                  {" "}
                  Add a Start Trigger
                </div>
              </div>
            </div>
          }
        >
          {treeData && treeData.length > 0 ? (
            <Tree
              lineWidth={"2px"}
              lineColor={"#000"}
              lineBorderRadius={"10px"}
            >
              {generateTreeNodes(treeData)}
            </Tree>
          ) : (
            <TreeNode
              label={
                <div
                  className="treedata bg-primary"
                  onClick={() => {if(mainTree_Top.length){setshow1(true)}else{
                    
                    swal({
                      title: "Atleast add one trigger first",
                      icon: "error",
                    });
                  }}}
                >
                  <button>
                    <i className="fas fa-plus"></i>
                  </button>{" "}
                </div>
              }
            />
          )}
        </Tree>
      </div>
      {/* Select a trigger modal Start*/}

      <Modal
        show={showCreateName}
        onHide={() => setshowCreateName(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Formik
          initialValues={{ create_name: "" }}
          onSubmit={(values) => {
            if (values.create_name && values.create_name.trim()) {
              let data_to_send = {
                actions: { ...treeData[0] },
                triggers: mainTree_Top,
              };
              const formdata = new FormData();
              formdata.append("name", values.create_name);
              formdata.append("submit", "createAutomation");
              formdata.append("data", JSON.stringify(data_to_send));
              formdata.append("created_at", new Date().toLocaleDateString());
              apimethodCreateAutomation(
                "postCreateAutomationAction///////",
                formdata
              );
              swal({
                title: "Automation created successfully",
                icon: "success",
              });
              setshowCreateName(false);
            } else {
              swal({
                title: "Automation name is required",
                icon: "error",
              });
            }
          }}
        >
          <Form>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <h5 className="modal-title">Automation Name</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-12 row">
                <FormControl
                  className="form-control my-1"
                  required={true}
                  label={Translation(translations, "Automation Name")}
                  name="create_name"
                  control="input3"
                  placeholder={Translation(translations, "Name")}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="col-md-12 mt-3 automationbtn_header">
                <button type="submit">Save</button>
              </div>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
      <Modal
        show={show}
        onHide={() => setshow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5 className="modal-title">Select a Trigger</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 triggerRightSide">
              <div className="blockWrapper_automat">
                <div className="item_automat" onClick={showmodal}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-tags"></i>
                    </div>
                  </div>
                  <div className="heading">WEB HOOK LISTNER</div>
                </div>
                <div className="item_automat" onClick={showmodal}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-retweet "></i>
                    </div>
                  </div>
                  <div className="heading">FIELD CHANGE</div>
                </div>
                <div
                  className="item_automat"
                  onClick={Add_new_conatact_trigger}
                >
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-user-circle "></i>
                    </div>
                  </div>
                  <div className="heading">NEW CONTACT</div>
                </div>
                <div
                  className="item_automat"
                  onClick={Add_new_opportunity_trigger}
                >
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-capsules "></i>
                    </div>
                  </div>
                  <div className="heading">NEW OPPORTUNITY</div>
                </div>
                <div className="item_automat" onClick={Add_new_project_trigger}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-transgender "></i>
                    </div>
                  </div>
                  <div className="heading">NEW PROJECT</div>
                </div>
                <div className="item_automat" onClick={Add_new_event_trigger}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-search-dollar "></i>
                    </div>
                  </div>
                  <div className="heading"> NEW EVENT</div>
                </div>
                <div className="item_automat" onClick={showmodal}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-search-dollar "></i>
                    </div>
                  </div>
                  <div className="heading">TAG ADDED</div>
                </div>
                <div className="item_automat" onClick={showmodal}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-user-shield "></i>
                    </div>
                  </div>
                  <div className="heading">TAG REMOVED</div>
                </div>
                <div className="item_automat" onClick={showmodal}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-minus-square "></i>
                    </div>
                  </div>
                  <div className="heading">BOOKING CALENDAR</div>
                </div>
                <div className="item_automat">
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-minus-square "></i>
                    </div>
                  </div>
                  <div className="heading">EMAIL OPENED</div>
                </div>
                <div className="item_automat">
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-graduation-cap "></i>
                    </div>
                  </div>
                  <div className="heading">CLICK IN AN EMAIL LINK</div>
                </div>
                <div className="item_automat">
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-shopping-bag "></i>
                    </div>
                  </div>
                  <div className="heading">FORWARD AN EMAIL</div>
                </div>
                <div className="item_automat">
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-times "></i>
                    </div>
                  </div>
                  <div className="heading">REPLIES AN EMAIL</div>
                </div>
                <div className="item_automat" onClick={showmodal}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-percent "></i>
                    </div>
                  </div>
                  <div className="heading">WEB PAGE VISITED</div>
                </div>
                <div className="item_automat">
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-fill-drip "></i>
                    </div>
                  </div>
                  <div className="heading">CLICK IN A SUPERLINK</div>
                </div>
                <div className="item_automat">
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-star-half-alt "></i>
                    </div>
                  </div>
                  <div className="heading">EVENT TRACKING</div>
                </div>
                <div className="item_automat" onClick={showmodal}>
                  <div className="iconWrapper_automat">
                    <div className="icon_automat">
                      <i className="fas fa-star-half-alt "></i>
                    </div>
                  </div>
                  <div className="heading">DATE BASED</div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="col-md-12 mt-3 automationbtn_header">
            <button>Start Without a Trigger</button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Select a trigger modal END*/}
      {/* ADD NEW ACTION MODAL start */}
      <Modal
        show={show1}
        onHide={() => setshow1(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5 className="modal-title">Add a New Action</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav
                  variant="pills"
                  className="flex-column addActionsMenu_automat"
                >
                  <Nav.Item className="automation_navitems">
                    <Nav.Link eventKey="first">Sending Options </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="automation_navitems">
                    <Nav.Link eventKey="second">
                      Conditions and Workflow
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="automation_navitems">
                    <Nav.Link eventKey="three">Contacts</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="automation_navitems">
                    <Nav.Link eventKey="four">OPPORTUNITIES</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="automation_navitems">
                    <Nav.Link eventKey="five">PROJECTS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="automation_navitems">
                    <Nav.Link eventKey="six">EVENTS</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first" className="pane_inner">
                    <div className="addActionsMenuContent_automat">
                      {/* <div className='addActionsMenuContent_automat_each' style={{ background: "#65758A" }}>
                                                <div className='ActionsMenuContent_icons'>
                                                    <i className="fas fa-envelope"></i>
                                                </div>
                                                <div>
                                                    <p>Send an email</p>
                                                    <p>Send an email campaign to a contact.</p>
                                                </div>
                                            </div>
                                            <div className='addActionsMenuContent_automat_each' style={{ background: "#71C5ED" }}>
                                                <div className='ActionsMenuContent_icons'>
                                                    <i className="fas fa-bell"></i>
                                                </div>
                                                <div>
                                                    <p>Send a notification email</p>
                                                    <p>Send a notification email to up to 5 email addresses at once that the contact has reached this point in an automation.</p>
                                                </div>
                                            </div>
                                            <div className='addActionsMenuContent_automat_each' style={{ background: "#EB7A7A" }}>
                                                <div className='ActionsMenuContent_icons'>
                                                    <i className="fas fa-mobile-alt"></i>
                                                </div>
                                                <div>
                                                    <p>Send an SMS</p>
                                                    <p>Send an SMS to the contact or admin user.</p>
                                                </div>
                                            </div>
                                            <div className='addActionsMenuContent_automat_each' style={{ background: "#EB7A7A" }}>
                                                <div className='ActionsMenuContent_icons'>
                                                    <i className="fas fa-mobile-alt"></i>
                                                </div>
                                                <div>
                                                    <p>Notification SMS</p>
                                                    <p>Send notification SMS to the contact or admin user.</p>
                                                </div>
                                            </div> */}
                      future development
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second" className="pane_inner">
                    <div className="addActionsMenuContent_automat">
                      <div
                        className="addActionsMenuContent_automat_each"
                        onClick={HandleActionName}
                        style={{ background: "#fff", color: "#000000" }}
                      >
                        <div className="ActionsMenuContent_icons">
                          <i className="fas fa-clock"></i>
                        </div>
                        <div>
                          <p>Wait</p>
                          <p>
                            Wait for a certain period of time, or until
                            conditions are matched.
                          </p>
                        </div>
                      </div>
                      <div
                        className="addActionsMenuContent_automat_each"
                        onClick={HandleActionName}
                        style={{ background: "#535353" }}
                      >
                        <div className="ActionsMenuContent_icons">
                          <i className="fas fa-question-circle"></i>
                        </div>
                        <div>
                          <p>If/Else</p>
                          <p>
                            Continue the automation in a different way depending
                            on whether the conditions are matched.
                          </p>
                        </div>
                      </div>
                      <div
                        className="addActionsMenuContent_automat_each"
                        onClick={HandleActionName}
                        style={{ background: "#535353" }}
                      >
                        <div className="ActionsMenuContent_icons">
                          <i className="fas fa-question-circle"></i>
                        </div>
                        <div>
                          <p>Start an automation</p>
                          <p>choose an automation to start as an action</p>
                        </div>
                      </div>
                      <div
                        className="addActionsMenuContent_automat_each"
                        onClick={handleEnd_automation_submit}
                        style={{ background: "#535353" }}
                      >
                        <div className="ActionsMenuContent_icons">
                          <i className="fas fa-question-circle"></i>
                        </div>
                        <div>
                          <p>End this automation</p>
                          <p>This is where this automation will end</p>
                        </div>
                      </div>
                      <div
                        className="addActionsMenuContent_automat_each"
                        onClick={HandleActionName}
                        style={{ background: "#535353" }}
                      >
                        <div className="ActionsMenuContent_icons">
                          <i className="fas fa-question-circle"></i>
                        </div>
                        <div>
                          <p>End another automation</p>
                          <p>
                            Have this contact end another automation if they are
                            currently in it.
                          </p>
                        </div>
                      </div>
                      <div
                        className="addActionsMenuContent_automat_each"
                        onClick={HandleActionName}
                        style={{ background: "#8C7EB3" }}
                      >
                        <div className="ActionsMenuContent_icons">
                          <i className="fas fa-crosshairs"></i>
                        </div>
                        <div>
                          <p>Webhook</p>
                          <p>Post a contact data to a URL of your choice.</p>
                        </div>
                      </div>
                      <div
                        className="addActionsMenuContent_automat_each"
                        onClick={HandleActionName}
                        style={{ background: "#EB7A7A" }}
                      >
                        <div className="ActionsMenuContent_icons">
                          <i className="fas fa-calculator"></i>
                        </div>
                        <div>
                          <p>Perform math</p>
                          <p>
                            Perform math on a contact or deal numeric or date
                            custom field.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="three" className="pane_inner">
                    <div className="addActionsMenuContent_automat">
                      <Automation_addTag_module
                        setshow1={setshow1}
                        module_name={"contact"}
                        handle_add_contact_tag={handle_add_contact_tag}
                        backgroundColor={"#4A7CB7"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#4A7CB7" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Tag</p>
                          </div>
                        </div>
                      </Automation_addTag_module>
                      <Automation_removeTag_module
                        setshow1={setshow1}
                        module_name={"contact"}
                        handle_add_contact_tag={handle_remove_contact_tag}
                        backgroundColor={"#4A7CB7"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#4A7CB7" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Remove Tag</p>
                          </div>
                        </div>
                      </Automation_removeTag_module>

                      <Automation_addNote_module
                        setshow1={setshow1}
                        module_name={"contact"}
                        handle_addNote_module={handle_addNote_module}
                        backgroundColor={"#4A7CB7"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#4A7CB7" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Note</p>
                          </div>
                        </div>
                      </Automation_addNote_module>
                      <Automation_addEvent_module
                        setshow1={setshow1}
                        module_name={"contact"}
                        handle_addEvent_module={handle_addEvent_module}
                        backgroundColor={"#4A7CB7"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#4A7CB7" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Event</p>
                          </div>
                        </div>
                      </Automation_addEvent_module>
                      <Automation_updateField_module
                        setshow1={setshow1}
                        module_name={"contact"}
                        handle_updateField_module={handle_updateField_module}
                        backgroundColor={"#4A7CB7"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#4A7CB7" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Update a field</p>
                          </div>
                        </div>
                      </Automation_updateField_module>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="four" className="pane_inner">
                    <div className="addActionsMenuContent_automat">
                      <Automation_addTag_module
                        setshow1={setshow1}
                        module_name={"oppotunities"}
                        handle_add_contact_tag={handle_add_contact_tag}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Tag</p>
                          </div>
                        </div>
                      </Automation_addTag_module>
                      <Automation_removeTag_module
                        setshow1={setshow1}
                        module_name={"opportunities"}
                        handle_add_contact_tag={handle_remove_contact_tag}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Remove Tag</p>
                          </div>
                        </div>
                      </Automation_removeTag_module>
                      <Automation_addNote_module
                        setshow1={setshow1}
                        module_name={"opportunities"}
                        handle_addNote_module={handle_addNote_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Note</p>
                          </div>
                        </div>
                      </Automation_addNote_module>
                      <Automation_addEvent_module
                        setshow1={setshow1}
                        module_name={"opportunities"}
                        handle_addEvent_module={handle_addEvent_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add an Event</p>
                          </div>
                        </div>
                      </Automation_addEvent_module>
                      <Automation_updateField_module
                        setshow1={setshow1}
                        module_name={"Opportunity"}
                        handle_updateField_module={handle_updateField_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Update a field</p>
                          </div>
                        </div>
                      </Automation_updateField_module>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="five" className="pane_inner">
                    <div className="addActionsMenuContent_automat">
                      <Automation_addTag_module
                        setshow1={setshow1}
                        module_name={"projects"}
                        handle_add_contact_tag={handle_add_contact_tag}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Tag</p>
                          </div>
                        </div>
                      </Automation_addTag_module>
                      <Automation_removeTag_module
                        setshow1={setshow1}
                        module_name={"projects"}
                        handle_add_contact_tag={handle_remove_contact_tag}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Remove Tag</p>
                          </div>
                        </div>
                      </Automation_removeTag_module>
                      <Automation_addNote_module
                        setshow1={setshow1}
                        module_name={"projects"}
                        handle_addNote_module={handle_addNote_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Note</p>
                          </div>
                        </div>
                      </Automation_addNote_module>
                      <Automation_addEvent_module
                        setshow1={setshow1}
                        module_name={"projects"}
                        handle_addEvent_module={handle_addEvent_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add an Event</p>
                          </div>
                        </div>
                      </Automation_addEvent_module>
                      <Automation_updateField_module
                        setshow1={setshow1}
                        module_name={"Project"}
                        handle_updateField_module={handle_updateField_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Update a field</p>
                          </div>
                        </div>
                      </Automation_updateField_module>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="six" className="pane_inner">
                    <div className="addActionsMenuContent_automat">
                      <Automation_addTag_module
                        setshow1={setshow1}
                        module_name={"events"}
                        handle_add_contact_tag={handle_add_contact_tag}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Tag</p>
                          </div>
                        </div>
                      </Automation_addTag_module>
                      <Automation_removeTag_module
                        setshow1={setshow1}
                        module_name={"events"}
                        handle_add_contact_tag={handle_remove_contact_tag}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Remove Tag</p>
                          </div>
                        </div>
                      </Automation_removeTag_module>
                      <Automation_addNote_module
                        setshow1={setshow1}
                        module_name={"events"}
                        handle_addNote_module={handle_addNote_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add Note</p>
                          </div>
                        </div>
                      </Automation_addNote_module>
                      <Automation_addEvent_module
                        setshow1={setshow1}
                        module_name={"events"}
                        handle_addEvent_module={handle_addEvent_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Add an Event</p>
                          </div>
                        </div>
                      </Automation_addEvent_module>
                      <Automation_updateField_module
                        setshow1={setshow1}
                        module_name={"events"}
                        handle_updateField_module={handle_updateField_module}
                        backgroundColor={"#60CB98"}
                      >
                        <div
                          className="addActionsMenuContent_automat_each"
                          // onClick={SameModel}
                          style={{ background: "#60CB98" }}
                        >
                          <div className="ActionsMenuContent_icons">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p>Update a field</p>
                          </div>
                        </div>
                      </Automation_updateField_module>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* ADD NEW ACTION MODAL End */}

      {AutomationModal && (
        <Modal
          show={show2}
          onHide={closeModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h5 className="modal-title">{HeaderModalName}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Formik
                        // initialValues={}
                        // onSubmit={}
                        >
                            <Form name="myForm">
                                <div className="row">
                                    {selctor_show &&
                                        <FormControl
                                            className="form-control my-1"
                                            required={true}
                                            label={"Select Tag"}
                                            name="fname"
                                            control="input"
                                            placeholder={Translation(translations, "First Name")}
                                        />
                                    }
                                    {
                                        showdatamodal_form &&
                                        <div className="row">
                                            <div>
                                                <FormControl
                                                    className="form-control my-1"
                                                    required={true}
                                                    label={"Select Tag"}
                                                    name="fname"
                                                    control="input"
                                                    placeholder={Translation(translations, "First Name")}
                                                />
                                            </div>
                                            <div>
                                                <div>
                                                    <p className="m-0">From</p>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value="option1"
                                                            checked={selectedOption === "option1"}
                                                            onChange={handleOptionChange}
                                                        />

                                                        Any value
                                                    </label>

                                                </div>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value="option2"
                                                            checked={selectedOption === "option2"}
                                                            onChange={handleOptionChange}
                                                        />

                                                        A specific value
                                                    </label>
                                                    {selectedOption === "option2" ?
                                                        <FormControl
                                                            className="form-control my-1"
                                                            name="fname"
                                                            control="input"
                                                            placeholder={Translation(translations, "Enter Specific Input ")}
                                                        /> : null}
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <p className="m-0">To</p>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value="option1"
                                                            checked={selectedOption2 === "option1"}
                                                            onChange={handleOptionChange2}
                                                        />

                                                        Any value
                                                    </label>

                                                </div>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value="option2"
                                                            checked={selectedOption2 === "option2"}
                                                            onChange={handleOptionChange2}
                                                        />

                                                        A specific value
                                                    </label>
                                                    {selectedOption2 === "option2" ?
                                                        <FormControl
                                                            className="form-control my-1"
                                                            name="fname"
                                                            control="input"
                                                            placeholder={Translation(translations, "Enter Specific Input ")}
                                                        /> : null}
                                                </div>
                                                <div>
                                                    <FormControl
                                                        label={Translation(translations, "The contact is")}
                                                        className="form-control my-1"
                                                        name="fname"
                                                        control="input"
                                                        placeholder={Translation(translations, "The contact is ")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </Form>
                        </Formik> */}
            {WebHookTriger && (
              <Formik
                initialValues={InitialWebHookTriger}
                // onSubmit={ }
              >
                <Form name="myForm">
                  <div className="row">
                    <div className="col-md-12">
                      <FormControl
                        className="form-control"
                        label={Translation(
                          translations,
                          `${"Copy This Link:"}`
                        )}
                        name="facebook"
                        control="input2"
                        placeholder={"https://www.facebook.com/xxxx"}
                      />
                    </div>
                    <div className="col-md-12">
                      <FormControl
                        className="form-control"
                        label={Translation(translations, `${"Last Request"}`)}
                        name="street_address"
                        rows="3"
                        control="textarea2"
                      />
                    </div>
                    <div className="col-md-12">
                      <span>Map Fields :</span>{" "}
                      <button
                        className="mapbtn_automation"
                        onClick={() => {
                          setMapFieldMoadalShow(true);
                          setAutomationModal(false);
                          // setmainTree_Top((prev_data) => [
                          //   ...prev_data,
                          //   {
                          //     tittle: "MAP Fields",
                          //     sub_tittle: "maps",
                          //     id: "1",
                          //   },
                          // ]);
                        }}
                      >
                        Map Fields
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            )}
            {FieldChangeTriger && (
              <Formik
                initialValues={InitialFieldChangeTriger}
                onSubmit={(value) => {
                  let reqField = [];
                  value.field_change_module = fieldChangeModule;
                  for (const key in value) {
                    if (value[key]) {
                      const element = value[key];
                    } else {
                      if (key === "field_change_from_specific_value") {
                        if (value?.field_change_from === "A Specific Value") {
                          reqField.push(key);
                        }
                      } else if (key === "field_change_to_specific_value") {
                        if (value?.field_change_to === "A Specific Value") {
                          reqField.push(key);
                        }
                      } else if (key === "segment_checkbox_field") {
                      } else {
                        reqField.push(key.replaceAll("_", " "));
                      }
                    }
                  }
                  if (value.segment_checkbox_field) {
                    segment_field_change.length &&
                      segment_field_change.map((obj) => {
                        Object.keys(obj).map((item) => {
                          if (item !== "between") {
                            if (!obj[item]) {
                              reqField.push("segement");
                            }
                          }
                        });
                      });
                  }
                  let s = segment_field_change.reduce((acc, val) => {
                    return acc.concat(
                      ` ${val.select} (In ${val.module_name}  ${val.field_name} ${val.condition_value} ${val.SearchInput})`
                    );
                  }, "");
                  console.log(segment_field_change, s);
                  if (!reqField.length) {
                    setmainTree_Top((prev_data) => [
                      ...prev_data,
                      {
                        tittle: `Field change ${value?.field}`,
                        sub_tittle: ` run ${value?.run_time?.replaceAll(
                          "_",
                          " "
                        )} ${value?.add_update?.replaceAll("_", " ")} ${
                          value.segment_checkbox_field ? s : ""
                        }`,
                        id: Math.random() + new Date(),
                        formData: [value],
                        actionDetails:
                          prev_data.length && prev_data[0].actionDetails
                            ? [...prev_data[0].actionDetails]
                            : [],
                        segment: value.segment_checkbox_field
                          ? segment_field_change
                          : [],
                      },
                    ]);
                    closeModal();
                  } else {
                    swal({
                      title: "Fill all the required field",
                      icon: "error",
                    });
                  }
                }}
              >
                {({ values }) => (
                  <Form name="myForm">
                    <div className="row">
                      <div className="col-md-6">
                        <p className="m-0 fw-bold">Module</p>
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Field")}
                          name="field_change_module"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="Module"
                          onChange={(event) =>
                            handleFieldChangeValue(event.target.value)
                          }
                          value={fieldChangeModule}
                          control="select_custom_options"
                        />
                        <p className="m-0 fw-bold">Field</p>
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Field")}
                          name="field"
                          selectList={fieldChangeField_list}
                          custom_label_name="label"
                          customer_value_name="label"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-md-12">
                        <FormControl
                          options={["Any Value", "A Specific Value"]}
                          required={true}
                          label={Translation(translations, `From`)}
                          name={"field_change_from"}
                          control="radio3"
                        />
                        {values.field_change_from === "A Specific Value" && (
                          <FormControl
                            className="form-control my-1"
                            required={true}
                            label={Translation(translations, "Specific Value")}
                            name="field_change_from_specific_value"
                            control="input3"
                            placeholder={Translation(
                              translations,
                              "Specific Value"
                            )}
                          />
                        )}
                      </div>
                      <div className="col-md-12">
                        <FormControl
                          options={["Any Value", "A Specific Value"]}
                          required={true}
                          label={Translation(translations, `To`)}
                          name={"field_change_to"}
                          control="radio3"
                        />
                        {values.field_change_to === "A Specific Value" && (
                          <FormControl
                            className="form-control my-1"
                            required={true}
                            label={Translation(translations, "Specific Value")}
                            name="field_change_to_specific_value"
                            control="input3"
                            placeholder={Translation(
                              translations,
                              "Specific Value"
                            )}
                          />
                        )}
                      </div>
                      <div className="col-md-12">
                        <p className="m-0 fw-bold">Runs</p>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-md-5">
                          <FormControl
                            className="form-control my-1"
                            firstSelect={"--select--"}
                            // label={Translation(translations, "Runs")}
                            name="run_time"
                            selectList={run_time}
                            custom_label_name="label"
                            customer_value_name="value"
                            // onChange={(event) => handleTemplate(event)}
                            control="select_custom_options"
                          />
                        </div>
                        <div className="col-md-2 fieldtop">
                          <span>the contact is</span>
                        </div>
                        <div className="col-md-5">
                          <FormControl
                            className="form-control my-1"
                            firstSelect={"--select--"}
                            // label={Translation(translations, "")}
                            name="add_update"
                            selectList={add_update}
                            custom_label_name="label"
                            customer_value_name="value"
                            // onChange={(event) => handleTemplate(event)}
                            control="select_custom_options"
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <p>ADVANCED</p>
                      </div>
                      <div className="col-md-10">
                        <hr className="my-hr" />
                      </div>
                      <div className="col-md-12">
                        <label>
                          <Field
                            type="checkbox"
                            name="segment_checkbox_field"
                            className="mr-2"
                          />
                          Segment the contact is entering this automation
                        </label>
                        <div>
                          {values.segment_checkbox_field && (
                            <div>
                              <Automation_segments
                                DropDownDatas={DropDownDatas}
                                setSegment_field_change={
                                  setSegment_field_change
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button className="triggerbtn-back" type="button">
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            )}
            {AddedTagTriger && (
              <Formik
                initialValues={InitialAddedTagTriger}
                onSubmit={HandleSubmitTagAdded}
              >
                {({ values }) => (
                  <Form name="myForm">
                    <div className="row">
                      <div className=" row justify-content-between ">
                        <div className="col-md-6 ">
                          <FormControl
                            className="form-control tag-added-run"
                            firstSelect={"--select--"}
                            label={Translation(translations, `${"Module"}`)}
                            selectList={DropDownDatas}
                            custom_label_name="Module"
                            customer_value_name="Module"
                            defaultValue={values.tags_added_module}
                            name="tags_added_module"
                            // onChange={(event) => handleTemplate(event)}
                            control="select_custom_options"
                          />
                        </div>
                        <div className="col-md-6 p-0 m-0">
                          <FormControl
                            className="form-control tag-added-run"
                            firstSelect={"--select--"}
                            label={Translation(translations, "Runs")}
                            name="tags_added_runs"
                            selectList={run_time}
                            custom_label_name="label"
                            customer_value_name="value"
                            defaultValue={values.tags_added_runs}

                            // onChange={(event) => handleTemplate(event)}
                            control="select_custom_options"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mt-3   ">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, "Tags")}
                          name="tags_added"
                          control="input3"
                          placeholder={Translation(translations, "Tags")}
                        />
                      </div>
                      <div className="col-md-2 mt-2">
                        <p>ADVANCED</p>
                      </div>
                      <div className="col-md-10 mt-2">
                        <hr className="my-hr" />
                      </div>
                      <div className="col-md-12">
                        <label>
                          <Field
                            type="checkbox"
                            name="segment_checkbox_tag_added"
                            className="mr-2"
                            defaultValue={values.segment_checkbox_tag_added}
                          />
                          Segment the contacts entering this automation
                        </label>
                        <div>
                          {values.segment_checkbox_tag_added && (
                            <div>
                              <Automation_segments
                                DropDownDatas={DropDownDatas}
                                setSegment_field_change={setSegment_tags_add}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button className="triggerbtn-back" type="button">
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                            // onClick={() => {
                            //   setmainTree_Top((prev_data) => [
                            //     ...prev_data,
                            //     {
                            //       tittle: "Add trigger",
                            //       sub_tittle: "testing tags",
                            //       id: "3",
                            //     },
                            //   ]);
                            // }}
                          >
                            Add Start
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            )}
            {RemoveTagTriger && (
              <Formik
                initialValues={InitialRemoveTagTriger}
                onSubmit={HandleSubmitTagRemoved}
              >
                {({ values }) => (
                  <Form name="myForm">
                    <div className="row">
                      <div className=" row justify-content-between ">
                        <div className="col-md-6 ">
                          <FormControl
                            className="form-control tag-added-run"
                            firstSelect={"--select--"}
                            label={Translation(translations, `${"Module"}`)}
                            selectList={DropDownDatas}
                            custom_label_name="Module"
                            customer_value_name="Module"
                            name="tags_removed_module"
                            // onChange={(event) => handleTemplate(event)}
                            control="select_custom_options"
                          />
                        </div>
                        <div className="col-md-6 p-0 m-0">
                          <FormControl
                            className="form-control tag-added-run"
                            firstSelect={"--select--"}
                            label={Translation(translations, "Runs")}
                            name="tags_removed_runs"
                            selectList={run_time}
                            custom_label_name="label"
                            customer_value_name="value"
                            // onChange={(event) => handleTemplate(event)}
                            control="select_custom_options"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 mt-3   ">
                        <FormControl
                          className="form-control my-1"
                          label={Translation(translations, "Tags")}
                          name="tags_removed"
                          control="input3"
                          placeholder={Translation(translations, "Tags")}
                        />
                      </div>
                      <div className="col-md-2 mt-2">
                        <p>ADVANCED</p>
                      </div>
                      <div className="col-md-10 mt-2">
                        <hr className="my-hr" />
                      </div>
                      <div className="col-md-12">
                        <label>
                          <Field
                            type="checkbox"
                            name="segment_checkbox_tag_removed"
                            className="mr-2"
                          />
                          Segment the contacts entering this automation
                        </label>
                        <div>
                          {values.segment_checkbox_tag_removed && (
                            <div>
                              <Automation_segments
                                DropDownDatas={DropDownDatas}
                                setSegment_field_change={setSegment_tags_remove}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button className="triggerbtn-back" type="button">
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                            // onClick={() => {
                            //   setmainTree_Top((prev_data) => [
                            //     ...prev_data,
                            //     {
                            //       tittle: "Add trigger",
                            //       sub_tittle: "testing tags",
                            //       id: "3",
                            //     },
                            //   ]);
                            // }}
                          >
                            Add Start
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            )}
            {BookingCalenderTriger && (
              <Formik
                initialValues={InitialBookingCalenderTriger}
                onSubmit={HandleSubmitBooking}
              >
                {({ values }) => (
                  <Form name="myForm">
                    <div className="row">
                      <div className="col-md-12">
                        <Select
                          showSearch
                          onSearch={(v) => {}}
                          onChange={(v1, v2) => {
                            console.log(v1, v2);
                            values.booking_calendar_appoinment_id = v1;
                            values.booking_calendar_appoinment_name =
                              v2.children;
                            // handleFieldNameChange(v1,index,v2)
                          }}
                          style={{ width: "100%", height: 40 }}
                          placeholder={"Search calendar name"}
                        >
                          {/* Array.isArray(addFollower) && datas.lead_data && 
                        addFollower.filter(ite => (datas?.parent_ids?.includes(ite?.id) === false)) */}
                          {bookingCalendar_list.length &&
                            bookingCalendar_list.map(
                              ({ calendar_name, calendar_id }) => (
                                <Select.Option
                                  value={calendar_id}
                                  key={calendar_id}
                                  type={calendar_name}
                                >
                                  {calendar_name}
                                </Select.Option>
                              )
                            )}
                        </Select>
                        {/* <FormControl
                        className="form-control my-1"
                        firstSelect={"--select--"}
                        label={Translation(
                          translations,
                          "Run when appointment status changed for this calander :"
                        )}
                        name="booking_calendar_appoinment"
                        selectList={bookingCalendar_list}
                        custom_label_name="calendar_name"
                        customer_value_name="calendar_id"
                        onChange={(event) =>{values.booking_calendar_appoinment="tttt"}}
                        control="select_custom_options2"
                      /> */}
                      </div>
                      <div className="col-md-12">
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--select--"}
                          label={Translation(
                            translations,
                            "For which status should this run:"
                          )}
                          name="booking_calendar_run"
                          selectList={[
                            { label: "Scheduled" },
                            { label: "Rescheduled" },
                            { label: "Cancelled" },
                          ]}
                          custom_label_name="label"
                          customer_value_name="label"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options2"
                        />
                      </div>
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button className="triggerbtn-back" type="button">
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            Add Start
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            )}
            {WebPageVisitedTriger && (
              <Formik
                initialValues={InitialWebPageVisitedTriger}
                onSubmit={HandleSubmitWebPage}
              >
                <Form name="myForm">
                  <div className="row">
                    <div className="col-md-6">
                      <FormControl
                        className="form-control "
                        firstSelect={"--select--"}
                        label={Translation(translations, "Web page URL")}
                        name="web_page_URL"
                        selectList={DropDownDatas}
                        custom_label_name="Module"
                        customer_value_name="Module"
                        // onChange={(event) => handleTemplate(event)}
                        control="select_custom_options2"
                      />
                    </div>
                    <div className="col-md-1  mt-2 ">
                      <span>/</span>
                    </div>
                    <div className="col-md-5 ">
                      <FormControl
                        className="form-control"
                        // label={Translation(translations, `${"Facebook"}`)}
                        name="web_page_URL_sub"
                        control="input2"
                        placeholder={"https://www.facebook.com/xxxx"}
                      />
                    </div>
                    <div className="col-md-12 ">
                      <div className="col-md-6  p-0 m-0">
                        <FormControl
                          className="form-control "
                          firstSelect={"--select--"}
                          label={Translation(translations, "Runs")}
                          name="runs"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="Module"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options2"
                        />
                      </div>
                    </div>
                    <div className="col-md-2 mt-2">
                      <p>ADVANCED</p>
                    </div>
                    <div className="col-md-10 mt-2">
                      <hr className="my-hr" />
                    </div>
                    <div className="col-md-12">
                      <label>
                        <Field type="checkbox" name="isChecked" />
                        Segment the contacts entering this automation
                      </label>
                    </div>
                  </div>
                  <Modal.Footer>
                    <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                      <div>
                        <button className="triggerbtn-back" type="button">
                          Back
                        </button>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-success px-4">
                          Add Start
                        </button>
                      </div>
                    </div>
                  </Modal.Footer>
                </Form>
              </Formik>
            )}
            {DateBasedTriger && (
              <Formik
                initialValues={InitialDateBasedTriger}
                // onSubmit={"" }
              >
                <Form name="myForm">
                  <div className="row">
                    <div className="row">
                      <div className="col-md-2 p-0">
                        <span>Starts</span>
                      </div>
                      <div className="col-md-1">
                        <FormControl
                          className="form-control "
                          name="facebook"
                          control="input2"
                          // placeholder={"https://www.facebook.com/xxxx"}
                        />
                      </div>
                      <div className="col-md-2">
                        <FormControl
                          className="form-control "
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Runs")}
                          name="sign_temp"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="id"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-md-2">
                        <FormControl
                          className="form-control "
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Runs")}
                          name="sign_temp"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="id"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-md-1 d-flex align-items-center">
                        <span className="mx-1">the</span>
                      </div>
                      <div className="col-md-2">
                        <FormControl
                          className="form-control "
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Runs")}
                          name="sign_temp"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="id"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-2 p-0 ">
                        <span>Check</span>
                      </div>
                      <div className="col-md-2">
                        <FormControl
                          className="form-control "
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Runs")}
                          name="sign_temp"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="id"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-md-1 d-flex align-items-center">
                        <span className="mx-1">around</span>
                      </div>
                      <div className="col-md-2">
                        <FormControl
                          className="form-control "
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Runs")}
                          name="sign_temp"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="id"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-md-2">
                        <FormControl
                          className="form-control "
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Runs")}
                          name="sign_temp"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="id"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <span>Runs</span>
                    </div>
                    <div className="col-md-10">
                      <label className="custom-control custom-radio custom-control-inline">
                        <Field
                          className="custom-control-input"
                          name="gender"
                          type="radio"
                          value="Any Value"
                          // onClick={hanldeMarrow}
                          // placeholder=" First Name"
                        />
                        <span className="custom-control-label">
                          {" "}
                          <b> when month and day match conditions</b>
                          <p>
                            Examples: Birthdays, annual contracts ,and other
                            dates that recur yearly .
                          </p>
                        </span>
                      </label>
                      <label className="custom-control custom-radio custom-control-inline">
                        <Field
                          className="custom-control-input"
                          name="gender"
                          type="radio"
                          value="Any`1 Value"
                          // onClick={hanldeMarrow}
                          // placeholder=" First Name"
                        />
                        <span className="custom-control-label">
                          {" "}
                          <b> when year,month and day match conditions</b>
                          <p>
                            Examples: Events,Contract expirations,and other
                            datesthat do not recur yearly. Hint: if you have a
                            field that you update over time (such as a contract
                            experiration) the automationwill trigger each time
                            we find a match .
                          </p>
                        </span>
                      </label>
                    </div>
                    <div className="col-md-2 mt-2">
                      <p>ADVANCED</p>
                    </div>
                    <div className="col-md-10 mt-2">
                      <hr className="my-hr" />
                    </div>
                    <div className="col-md-12">
                      <label className="custom-control custom-checkbox">
                        <Field
                          type="checkbox"
                          name="isChecked"
                          className="custom-control-input"
                        />
                        Segment the contacts entering this automation
                      </label>
                    </div>
                  </div>
                  <Modal.Footer>
                    <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                      <div>
                        <button className="triggerbtn-back">Back</button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-success px-4"
                          onClick={() => {
                            setmainTree_Top((prev_data) => [
                              ...prev_data,
                              {
                                tittle: "Database ",
                                sub_tittle: "any field test",
                                id: Math.random() + new Date(),
                                formData: [],
                                actionDetails:
                                  prev_data.length && prev_data[0].actionDetails
                                    ? [...prev_data[0].actionDetails]
                                    : [],
                                segment: [],
                              },
                            ]);
                          }}
                        >
                          Add Start
                        </button>
                      </div>
                    </div>
                  </Modal.Footer>
                </Form>
              </Formik>
            )}
          </Modal.Body>
        </Modal>
      )}
      {/* // Map Field modal   */}
      <Modal
        show={MapFieldMoadalShow}
        onHide={() => {
          setMapFieldMoadalShow(false);
          setAutomationModal(true);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5 className="modal-title">Map Fields</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead className="">
              <tr>
                <th className="text-start">Field Id</th>
                <th className="text-start">Value</th>
                <th className="text-start">Map To</th>
              </tr>
            </thead>
            <tbody>
              {mapField_list.map((list, index) => {
                return (
                  <tr key={index}>
                    <td className="">{list.name}</td>
                    <td className="">{list.value}</td>
                    <td>
                      <select className="form-control" name="map_select" id="">
                        {list.map_to.lists.map((value, key) => {
                          return <option>{value.label}</option>;
                        })}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      {/* // Map Field modal end  */}

      {ActionsTriggerModal && (
        <Modal
          show={ActionsTriggerModal}
          // onHide={() => {
          //     setActionsTriggerModal(false)
          //     setshow1(true)
          //     setWaitRadio2(false)
          //     setWaitRadio1(false)
          // }}
          onHide={ActionModalCanelHandle}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h5 className="modal-title">{HeaderModalActions}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {ActionWait && (
              <Formik
                initialValues={InitialWaitAction}
                onSubmit={HandleActionWaitSubmit}
              >
                <Form name="myForm">
                  <div className="row">
                    <div className="col-sm-12">
                      <label className="custom-control custom-radio custom-control-inline">
                        <Field
                          className="custom-control-input"
                          name="radioOption1"
                          type="radio"
                          required={true}
                          value="wait_1"
                          onClick={() => {
                            setWaitRadio1(true);
                            setWaitRadio2(false);
                          }}
                        />
                        <span className="custom-control-label">
                          Wait for a specified period of time
                        </span>
                      </label>
                    </div>
                    <div className="col-sm-12">
                      <label className="custom-control custom-radio custom-control-inline">
                        <Field
                          className="custom-control-input"
                          name="radioOption1"
                          type="radio"
                          value="wait_2"
                          required={true}
                          onClick={() => {
                            setWaitRadio2(true);
                            setWaitRadio1(false);
                          }}
                        />
                        <span className="custom-control-label">
                          Wait unit specific conditions are met
                        </span>
                      </label>
                    </div>
                    {WaitRadio1 && (
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="row w-100 justify-content-evenly">
                            <div className="col-md-4">
                              <FormControl
                                className="form-control "
                                // label={Translation(translations, "Runs")}
                                name="wait_for"
                                selectList={[
                                  { label: "wait for", value: "wait for" },
                                ]}
                                required={true}
                                value={"wait_for"}
                                custom_label_name="label"
                                customer_value_name="value"
                                // onChange={(event) => handleTemplate(event)}
                                control="select_custom_options"
                              />
                            </div>
                            <div className="col-md-6 p-0 m-0 d-flex align-items-center">
                              <FormControl
                                className="form-control "
                                name="wait_time_count"
                                type="number"
                                control="input"
                                placeholder={"Value"}
                                required={true}
                              />
                            </div>
                            <div className="col-md-2">
                              <FormControl
                                className="form-control "
                                firstSelect={"--Day(s)--"}
                                required={true}
                                // label={Translation(translations, "Runs")}
                                name="wait_time_days"
                                selectList={[
                                  { label: "days", value: "days" },
                                  { label: "hour", value: "hour" },
                                  { label: "minutes", value: "minutes" },
                                ]}
                                custom_label_name="label"
                                customer_value_name="value"
                                // onChange={(event) => handleTemplate(event)}
                                control="select_custom_options"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {WaitRadio2 && (
                      <div className="row">
                        <div>
                          <p className="p-0 m-0">
                            <b>Wait Until</b>
                          </p>
                          <p>first name is Example</p>
                        </div>
                        <FormControl
                          className="form-control "
                          firstSelect={"--No time limit--"}
                          label={Translation(translations, "The Limit")}
                          name="no_time_limit"
                          selectList={[
                            { label: "No time limit", value: "No time limit" },
                          ]}
                          custom_label_name="label"
                          customer_value_name="value"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                    )}
                  </div>
                  <Modal.Footer>
                    <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                      <div>
                        <button
                          className="triggerbtn-back"
                          onClick={ActionModalCanelHandle}
                        >
                          Back
                        </button>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-success px-4">
                          Add Start
                        </button>
                      </div>
                    </div>
                  </Modal.Footer>
                </Form>
              </Formik>
            )}
            {ActionIf_Else && (
              <Formik
                initialValues={InitialIf_ElseAction}
                onSubmit={Handle_if_elseSubmit}
              >
                <Form>
                  <div className="row">
                    <Automation_segments
                      DropDownDatas={DropDownDatas}
                      setSegment_field_change={setIf_ELSE_Array}
                    />
                    {/* <div className="row mt-2">
                      <div className="col-sm-2">
                        <label className="custom-control custom-radio custom-control-inline">
                          <Field
                            className="custom-control-input"
                            name="and_or_1"
                            type="radio"
                            value="and"
                            // onClick={hanldeMarrow}
                            // placeholder=" First Name"
                          />
                          <span className="custom-control-label">And</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <Field
                            className="custom-control-input"
                            name="and_or_1"
                            type="radio"
                            value="or"
                          />
                          <span className="custom-control-label">Or</span>
                        </label>
                      </div>
                      <div className="col-sm-3">
                        <FormControl
                          className="form-control "
                          firstSelect={"--Select Option--"}
                          // label={Translation(translations, "Runs")}
                          name="select_option_2"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="Module"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-sm-3">
                        <FormControl
                          className="form-control "
                          firstSelect={"--Select Condition--"}
                          // label={Translation(translations, "Runs")}
                          name="select_condition_2"
                          selectList={[
                            { label: "Is" },
                            { label: "Is not" },
                            { label: "Contains" },
                            { label: "Does not contains" },
                          ]}
                          custom_label_name="label"
                          customer_value_name="label"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-sm-3">
                        <FormControl
                          className="form-control"
                          // label={Translation(translations, `${"Facebook"}`)}
                          name="condition_value_2"
                          control="input2"
                          placeholder={"Enter Condition Value"}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-sm-2">
                        <label className="custom-control custom-radio custom-control-inline">
                          <Field
                            className="custom-control-input"
                            name="and_or_2"
                            type="radio"
                            value="and"
                            // onClick={hanldeMarrow}
                            // placeholder=" First Name"
                          />
                          <span className="custom-control-label">And</span>
                        </label>
                        <label className="custom-control custom-radio custom-control-inline">
                          <Field
                            className="custom-control-input"
                            name="and_or_2"
                            type="radio"
                            value="or"
                            // onClick={hanldeMarrow}
                            // placeholder=" First Name"
                          />
                          <span className="custom-control-label">Or</span>
                        </label>
                      </div>
                      <div className="col-sm-3">
                        <FormControl
                          className="form-control "
                          firstSelect={"--Select Option--"}
                          // label={Translation(translations, "Runs")}
                          name="select_option_3"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="Module"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-sm-3">
                        <FormControl
                          className="form-control "
                          firstSelect={"--Select Condition--"}
                          // label={Translation(translations, "Runs")}
                          name="select_condition_3"
                          selectList={[
                            { label: "Is" },
                            { label: "Is not" },
                            { label: "Contains" },
                            { label: "Does not contains" },
                          ]}
                          custom_label_name="label"
                          customer_value_name="label"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-sm-3">
                        <FormControl
                          className="form-control"
                          // label={Translation(translations, `${"Facebook"}`)}
                          name="condition_value_3"
                          control="input2"
                          placeholder={"Enter Condition Value"}
                        />
                      </div>
                    </div>

                    {If_ELSE_Array?.map((i, index) => {
                      const uniquevalue = index + 4;
                      // console.log(uniquevalue);
                      return (
                        <div className="row mt-2" key={index}>
                          <div className="col-sm-2">
                            <label className="custom-control custom-radio custom-control-inline">
                              <Field
                                className="custom-control-input"
                                name={`and_or_${uniquevalue}`}
                                type="radio"
                                value="and"
                                // onClick={hanldeMarrow}
                                // placeholder=" First Name"
                              />
                              <span className="custom-control-label">And</span>
                            </label>
                            <label className="custom-control custom-radio custom-control-inline">
                              <Field
                                className="custom-control-input"
                                name={`and_or_${uniquevalue}`}
                                type="radio"
                                value="or"
                                // onClick={hanldeMarrow}
                                // placeholder=" First Name"
                              />
                              <span className="custom-control-label">Or</span>
                            </label>
                          </div>
                          <div className="col-sm-3">
                            <FormControl
                              className="form-control "
                              firstSelect={"--Select Option--"}
                              // label={Translation(translations, "Runs")}
                              name={`select_option_${uniquevalue}`}
                              selectList={DropDownDatas}
                              custom_label_name="Module"
                              customer_value_name="Module"
                              // onChange={(event) => handleTemplate(event)}
                              control="select_custom_options"
                            />
                          </div>
                          <div className="col-sm-3">
                            <FormControl
                              className="form-control "
                              firstSelect={"--Select Condition--"}
                              // label={Translation(translations, "Runs")}
                              name={`select_condition_${uniquevalue}`}
                              selectList={[
                                { label: "Is" },
                                { label: "Is not" },
                                { label: "Contains" },
                                { label: "Does not contains" },
                              ]}
                              custom_label_name="label"
                              customer_value_name="label"
                              // onChange={(event) => handleTemplate(event)}
                              control="select_custom_options"
                            />
                          </div>
                          <div className="col-sm-3">
                            <FormControl
                              className="form-control"
                              // label={Translation(translations, `${"Facebook"}`)}
                              name={`condition_value_${uniquevalue}`}
                              control="input2"
                              placeholder={"Enter Condition Value"}
                            />
                          </div>
                        </div>
                      );
                    })} */}
                  </div>
                  <Modal.Footer>
                    <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                      <div>
                        <button
                          className="triggerbtn-back"
                          onClick={ActionModalCanelHandle}
                        >
                          Back
                        </button>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-success px-4">
                          Add Start
                        </button>
                      </div>
                    </div>
                  </Modal.Footer>
                </Form>
              </Formik>
            )}
            {ActionStartAutomation && (
              <Formik
                initialValues={InitialStartAutomationAction}
                onSubmit={(values)=>{handle_add_other_automation(values,"add")} }
              >
             { ({values,setFieldValue})=>(  <Form>
                  <div className="row">
                    {/* <div className="col-sm-12">
                      <FormControl
                        className="form-control "
                        firstSelect={"Enter all other automations"}
                        label={Translation(
                          translations,
                          "Start an automation to enter"
                        )}
                        name="sign_temp"
                        // selectList={""}
                        custom_label_name="template_name"
                        customer_value_name="template_id"
                        // onChange={(event) => handleTemplate(event)}
                        control="select_custom_options"
                      />
                    </div> */}
                    <div className="col-sm-12">
                      <div className="form-group row">
                      <b className="col-sm-4 col-form-label">
                        {Translation(translations, "Search automation to add")}
                      </b>
                        <div className="col-sm-12">
                        <Select
                          showSearch
                          mode="multiple"
                          // fieldNames={"add_automation_select"}
                          onSearch={(v) => {}}
                          onChange={(v1, v2) => {
                            values.add_automation_select=v1
                            values.add_automation_select_list=v2
                            setFieldValue(values)

                            console.log(v1, v2);
                            // values.booking_calendar_appoinment_id = v1;
                            // values.booking_calendar_appoinment_name =
                            //   v2.children;
                            // handleFieldNameChange(v1,index,v2)
                          }}
                          defaultValue={InitialStartAutomationAction.add_automation_select}
                          style={{ width: "100%", height: 40 }}
                          placeholder={"Search calendar name"}
                        >
                          {/* Array.isArray(addFollower) && datas.lead_data && 
                        addFollower.filter(ite => (datas?.parent_ids?.includes(ite?.id) === false)) */}
                          {allAutomation_data.length &&
                            allAutomation_data.map(
                              ({ name, id }) => (
                                <Select.Option
                                  value={id}
                                  key={id}
                                  type={name}
                                >
                                  {name}
                                </Select.Option>
                              )
                            )}
                        </Select>
                        </div>
                      </div>
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button
                            className="triggerbtn-back"
                            onClick={ActionModalCanelHandle}
                          >
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            Add Start
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </div>
                </Form>)}
              </Formik>
            )}
            {ActionEndAnotherAutomation && (
                <Formik
                initialValues={InitialEndAutomationAction}
                onSubmit={(values)=>{handle_add_other_automation(values,"end_another")} }
              >
             { ({values,setFieldValue})=>(  <Form>
                  <div className="row">
                    {/* <div className="col-sm-12">
                      <FormControl
                        className="form-control "
                        firstSelect={"Enter all other automations"}
                        label={Translation(
                          translations,
                          "Start an automation to enter"
                        )}
                        name="sign_temp"
                        // selectList={""}
                        custom_label_name="template_name"
                        customer_value_name="template_id"
                        // onChange={(event) => handleTemplate(event)}
                        control="select_custom_options"
                      />
                    </div> */}
                    <div className="col-sm-12">
                      <div className="form-group row">
                      <b className="col-sm-4 col-form-label">
                        {Translation(translations, "Search automation to End")}
                      </b>
                        <div className="col-sm-12">
                        <Select
                          showSearch
                          mode="multiple"
                          // fieldNames={"add_automation_select"}
                          onSearch={(v) => {}}
                          onChange={(v1, v2) => {
                            values.add_automation_select=v1
                            values.add_automation_select_list=v2
                            setFieldValue(values)

                            console.log(v1, v2);
                            // values.booking_calendar_appoinment_id = v1;
                            // values.booking_calendar_appoinment_name =
                            //   v2.children;
                            // handleFieldNameChange(v1,index,v2)
                          }}
                          defaultValue={InitialStartAutomationAction.add_automation_select}
                          style={{ width: "100%", height: 40 }}
                          placeholder={"Search calendar name"}
                        >
                          {/* Array.isArray(addFollower) && datas.lead_data && 
                        addFollower.filter(ite => (datas?.parent_ids?.includes(ite?.id) === false)) */}
                          {allAutomation_data.length &&
                            allAutomation_data.map(
                              ({ name, id }) => (
                                <Select.Option
                                  value={id}
                                  key={id}
                                  type={name}
                                >
                                  {name}
                                </Select.Option>
                              )
                            )}
                        </Select>
                        </div>
                      </div>
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button
                            className="triggerbtn-back"
                            onClick={ActionModalCanelHandle}
                          >
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            Add Start
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </div>
                </Form>)}
              </Formik>
            )}
            {AtionWebhook && (
              <Formik
                initialValues={InitialEndAnotherAutomationAction}
                // onSubmit={"" }
              >
                <Form>
                  <div className="row">
                    <div className="row p-0 m-0">
                      <div className="col-sm-4">
                        <FormControl
                          className=" form-control border rounded-left"
                          style={{ height: "35px", width: "100%" }}
                          firstSelect={"POST"}
                          label={Translation(translations, "Target URL:")}
                          name="sign_temp"
                          selectList={[
                            { value: "Post" },
                            { value: "Get" },
                            { value: "Update" },
                            { value: "Delete" },
                            { value: "Put" },
                          ]}
                          custom_label_name="value"
                          customer_value_name="value"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options3"
                        />
                      </div>
                      <div className="col-sm-5 p-0 m-0 ">
                        <FormControl
                          className="form-control rounded-0"
                          // label={Translation(translations, `${"Tag"}`)}
                          name="facebook"
                          control="input6"
                          placeholder={"https://www.facebook.com/xxxx"}
                        />
                      </div>
                      <div className="col-sm-2  p-0 m-0">
                        <button className="EndAnothebtn">Send Test</button>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <FormControl
                        className="form-control "
                        firstSelect={""}
                        label={Translation(translations, "Content-Type")}
                        name="sign_temp"
                        selectList={[
                          { value: "text/plain" },
                          { value: "application/json" },
                          { value: "application/xml" },
                          { value: "multipart/form-data" },
                        ]}
                        custom_label_name="value"
                        customer_value_name="value"
                        // onChange={(event) => handleTemplate(event)}
                        control="select_custom_options2"
                      />
                    </div>
                    <div className="col-sm-12">
                      <p>
                        <b>Headers</b>
                      </p>
                    </div>
                    <div className="col-sm-12">
                      <div className="row p-0 border-left border-right border-bottom">
                        <div className="col-sm-5 p-0">
                          <div className="WebhookFormHeaders rounded-left">
                            <p className="p-0 m-0">Key</p>
                          </div>
                        </div>
                        <div className="col-sm-5 p-0">
                          <div className="WebhookFormHeaders">
                            <p className="p-0 m-0">Value</p>
                          </div>
                        </div>
                        <div className="col-sm-2 p-0">
                          <div className="WebhookFormHeaders rounded-right">
                            <p className="p-0 m-0">Action</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5">
                            <div className="mt-2">
                              <FormControl
                                className="form-control "
                                // label={Translation(translations, `${"Tag"}`)}
                                name="facebook"
                                control="input"
                                placeholder={"https://www.facebook.com/xxxx"}
                              />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <div className="mt-2">
                              <FormControl
                                className="form-control "
                                // label={Translation(translations, `${"Tag"}`)}
                                name="facebook"
                                control="input"
                                placeholder={"https://www.facebook.com/xxxx"}
                              />
                            </div>
                          </div>
                          <div className="col-sm-2"></div>
                        </div>
                      </div>
                      <div>
                        <p className="webhooktext">
                          Headers are optional,but may be required to
                          authenticate the request
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <p>
                        <b>Params</b>
                      </p>
                    </div>
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="col-sm-5 p-0">
                          <div className="WebhookFormHeaders rounded-left">
                            <p className="p-0 m-0">Key</p>
                          </div>
                        </div>
                        <div className="col-sm-5 p-0">
                          <div className="WebhookFormHeaders">
                            <p className="p-0 m-0">Value</p>
                          </div>
                        </div>
                        <div className="col-sm-2 p-0">
                          <div className="WebhookFormHeaders rounded-right">
                            <p className="p-0 m-0">Action</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 border-left border-right border-bottom">
                      <div className="row mt-2">
                        <div className="col-sm-5">
                          <div className="mt-2">
                            <FormControl
                              className="form-control "
                              // label={Translation(translations, `${"Tag"}`)}
                              name="facebook"
                              control="input"
                              placeholder={"https://www.facebook.com/xxxx"}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="mt-2">
                            <FormControl
                              className="form-control "
                              // label={Translation(translations, `${"Tag"}`)}
                              name="facebook"
                              control="input"
                              placeholder={"https://www.facebook.com/xxxx"}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                          <div className="mt-2">
                            <FormControl
                              className="form-control "
                              // label={Translation(translations, `${"Tag"}`)}
                              name="facebook"
                              control="input"
                              placeholder={"https://www.facebook.com/xxxx"}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="mt-2">
                            <FormControl
                              className="form-control "
                              // label={Translation(translations, `${"Tag"}`)}
                              name="facebook"
                              control="input"
                              placeholder={"https://www.facebook.com/xxxx"}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-5">
                          <div className="mt-2">
                            <FormControl
                              className="form-control "
                              // label={Translation(translations, `${"Tag"}`)}
                              name="facebook"
                              control="input"
                              placeholder={"https://www.facebook.com/xxxx"}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="mt-2">
                            <FormControl
                              className="form-control "
                              // label={Translation(translations, `${"Tag"}`)}
                              name="facebook"
                              control="input"
                              placeholder={"https://www.facebook.com/xxxx"}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <span className="webhooktext">
                        params are the body of the request which will be read by
                        the receiver.The key is definition of the data while the
                        Value is the value.Use replacement codes to populate the
                        values fields
                      </span>
                    </div>
                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button
                            className="triggerbtn-back"
                            onClick={ActionModalCanelHandle}
                          >
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-success px-4"
                          >
                            Add Start
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </div>
                </Form>
              </Formik>
            )}
            {ActionPerformMath && (
              <Formik
                initialValues={InitialPerformMathAction}
                onSubmit={(values)=>{handle_PerfomMath(values)} }
              >
               {({values,setFieldValue})=>( <Form>
                  <div className="row">
                  <div className="col-12 row">
                      <div className="col-6">
                      <p className="m-0 fw-bold">Module</p>
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Field")}
                          name="module_math"
                          selectList={DropDownDatas}
                          custom_label_name="Module"
                          customer_value_name="Module"
                          onChange={(event) =>
                           {  values.module_math=event.target.value
                              setFieldValue(values)
                             handleFieldChangeValue2(event.target.value)}
                          }
                          // value={fieldChangeModule}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-6">
                      <p className="m-0 fw-bold">Field</p>
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Field")}
                          name="field_math"
                          selectList={fieldChangeField_list_math}
                          custom_label_name="label"
                          customer_value_name="label"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                         
                      </div>
                      <div className="row">
                      <div className="col-6">
                      <p className="m-0 fw-bold">Operation</p>
                        <FormControl
                          className="form-control my-1"
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Field")}
                          name="math_operation"
                          selectList={math_operation_list}
                          custom_label_name="label"
                          customer_value_name="label"
                          // onChange={(event) => handleTemplate(event)}
                          control="select_custom_options"
                        />
                      </div>
                      <div className="col-6">
                      <p className="m-0 fw-bold">Value</p>
                        <FormControl
                          className="form-control my-1"
                          type={"number"}
                          firstSelect={"--select--"}
                          // label={Translation(translations, "Field")}
                          name="value_number"
                         
                          // onChange={(event) => handleTemplate(event)}
                          control="input"
                        />
                      </div>
                      </div>
                    
                    
                    <Modal.Footer>
                      <div className="d-flex justify-content-between w-100 mt-3 align-items-baseline">
                        <div>
                          <button
                            className="triggerbtn-back"
                            onClick={ActionModalCanelHandle}
                          >
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-success px-4"
                          >
                            Add Start
                          </button>
                        </div>
                      </div>
                    </Modal.Footer>
                  </div>
                </Form>)
              }</Formik>
            )}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default Automation;
