import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { getTokenSession } from "../utils/common";
import config from "../services/config.json";
import { Link, useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/common/Loading";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Form, Formik } from "formik";
import allData from "../Data/data";
import FormControl from "../components/form/FormControl";
import SubmitButton from "../components/SubmitButton";
import Dropdown from "../components/form/Dropdown";
import usePost from "../customHooks/usePost";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import gravatar from 'gravatar';
import md5 from "md5";
import { GoFileSymlinkDirectory } from "react-icons/go";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import img1 from "../dist/webImages/justcall-logo.webp";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import File from "../components/form/File";
import { Monthss } from "../components/Month";
import { FaFolder, FaHandshake, FaListOl, FaMoneyBillAlt, FaRegCalendarAlt, FaSearch } from "react-icons/fa";
import { Translation } from "../components/Translation";
import swal from "sweetalert";
import { Select } from "antd";
import { StringConvert } from "../components/StringConvert";
import EditLeadAssetEditModal from "../AllProspect/EditProspectAssetEditModal";
import Role from "../components/Role";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { isConvertAssignProspect } from "../context/convertAssignContextProspect";
import { HandleConvertTimeOnlyDate, handleFullScreen, handleToggle } from "../components/AllCustomFuntion";
import dayjs from "dayjs";
import { BiConversation } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { BsFillBookmarkFill } from "react-icons/bs";
import { MdSummarize } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";

function EditPendingProspect({ translation }) {
  const { permissions } = useContext(MainAuthPermissionsContext);
  const {
    convertAssignProspect,
    setconvertAssignProspect,
    convertAssignProspectDefault,
    setconvertAssignProspectDefault,
  } = useContext(isConvertAssignProspect);
  const { id } = useParams();
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [settagValu] = useState("");
  const [res4, apiMethod4] = usePost();
  const [resAddNote, apiMethodAddNote] = usePost();
  const [res5, apiMethod5] = usePost();
  const [resPostCategory, apiMethodPostCategory] = usePost();
  const [selectedLostStage, setselectedLostStage] = useState(false);
  const [stage, setStage] = useState(false);
  const [assetsnotes, setAssetsNotes] = useState([]);
  const [resowner, apiMethodowner] = usePost();
  const [resowner1, apiMethodowner1] = usePost();
  const [resAddFollower, apiMethodAddFollower] = usePost();
  const [resupdateAddFollower, apiMethodupdateAddFollower] = usePost();
  const [apiMethodDeleteAsset] = usePost();
  const [ownerhidden, setOwnerhidden] = useState("");
  const [ownerhidden1] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [creatBy, setCreatBy] = useState("");
  const [assigned, setAssigned] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedSource2, setSelectedSource2] = useState("");
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [resDelAssign, apiMethodDelAssign] = usePost();
  const [resLeadAssign, apiMethodpostLeadAssign] = usePost();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [assettab, setAssettab] = useState("tab1");
  const [followUptab, setfollowUptab] = useState("tab1");
  const [admintab, setAdmintab] = useState("tab1");
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [image2, setImage2] = useState(false);
  const inputElement = useRef();
  const inputElement1 = useRef();
  const ownerRef = useRef(null);
  const ownerRef1 = useRef(null);
  const [searchval, setSearchval] = useState("");
  const [followers, setfollowers] = useState([]);
  const [OppStageList, setOppStageList] = useState([]);
  const [lostStage, setlostStage] = useState(false);
  const [lostStageName, setlostStageName] = useState("Lost");
  const [followerSelectValue, setfollowerSelectValue] = useState(false);
  const [selectedFollower, setselectedFollower] = useState([]);
  const [category, setcategory] = useState([]);
  const [addFollower, setAddfollower] = useState([]);
  const [addselectedFollower, setAddselectedFollower] = useState([]);
  const [previousFollower, setPreviousFollower] = useState([]);
  const [subCat_selected, setsubCat_selected] = useState([]);
  const [subCategoryselect, setsubCategoryselect] = useState([]);
  const [assetFileMedia, setassetFileMedia] = useState(true);
  const [assignLeadName, setassignLeadName] = useState(false);
  const [selectTag, setselectTag] = useState([]);
  const [correlationView, setcorrelationView] = useState([]);
  const [category_select_list, setCategory_select_list] = useState([]);
  const [res_type_of_contact_list, apiMethod_type_of_contact_list] = usePost();
  const [respremetion] = usePost();
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const [opportunityData, setopportunityData] = useState(false);
  const [rescreatBy, apiMethodcreatBy] = usePost();
  const [resAssigned, apiMethodAssigned] = usePost();
  const [selectedType, setSelectedType] = useState({});
  const [privateNote, setPrivateNote] = useState(false);
  const [content, setContent] = useState("");
  const [practiceName, setPracticeName] = useState({});
  const [defaultCreateDate, setdefaultCreateDate] = useState(false)
  const [admin_timeline_data, setadmin_timeline_data] = useState([])
  const [admin_overview_data, setadmin_overview_data] = useState(null)
  const [corrval, setcorrval] = useState([
    {
      id: 1,
      value: "",
    },
  ]);

  const [correlArr, setcorrelArr] = useState([
    {
      id: 1,
      firsValue: "15",
      secValue: "",
      value: "",
      type: "Co-Worker",
    },
  ]);
  const [actionArr, setactionArr] = useState([
    {
      id: 1,
      DateValue: "",
      FirstValue: "",
      secValue: "",
      thirdValue: "",
    },
  ]);
  const [meetingArr, setmeetingArr] = useState([
    {
      id: 1,
      DateValue: "",
      FirstValue: "",
      secValue: "",
      thirdValue: "",
    },
  ]);
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };

  const reRenderTimeline = () => {

    axios
      .get(`${config.apiEndPoint}getActivitiesProspectsData/${id}`)
      .then((response) => {
        console.log(response.data, "<<<<acrt");
        setadmin_timeline_data(response.data.activity)
        setadmin_overview_data(response.data.overview)
      });

  }
  useEffect(() => {
    apiMethod5("postMediumByID", { id: selectedSource });
    // setSelectedSource(event.target.value);
  }, [selectedSource]);
  useEffect(() => {
    if (res4.data && !res4.isLoading) {
      res4.data.message && toast.success(res4.data.message);
      reRenderTimeline()

    }
  }, [res4.data]);
  const handleJustifyClick4 = (value) => {
    if (value == justifyActive3) {
      return;
    }
    setJustifyActive3(value);
  };
  const handleSourceChange = (event) => {
    // apiMethod5("postMediumByID", { id: event.target.value });
    setSelectedSource(event.target.value);
    setSelectedSource2("");
  };
  const handleSourceChange2 = (event) => {
    setSelectedSource2(event.target.value);
  };
  // const handleSourceChange2 = (event) => {
  //   setSelectedSource2(event.target.value);
  //   console.log(event.target.value)

  // };
  const handleTypeChange = (event) => {
    const selectedOption = res_type_of_contact_list.data.find(
      (option) => option.db_id === event.target.value
    );
    setSelectedType(selectedOption);
  };
  useEffect(() => {
    if (res5.data) {
      setOppStageList(res5.data);
      Array.isArray && setSelectedSource2(res5.data[0]?.source_id);
    }
  }, [res5]);
  // const handleAddFollower = () => {
  //   let leaduserId = correlationView.map((item) => item.correlation_lead_user);
  //   correlArr.length &&
  //     correlArr.map((item) => {
  //       if (
  //         !leaduserId.includes(item.secValue.toString()) &&
  //         item.secValue.trim() !== ""
  //       ) {
  //         // setcorrelationView([
  //         //   ...correlationView,
  //         //   {
  //         //     corr_title: item.type,
  //         //     leaduser: item.value,
  //         //     correlation_lead_user: item.secValue,
  //         //   },
  //         // ]);
  //       } else {
  //         swal("Correlation Already exist");
  //       }
  //     });
  //   //  }}
  // };

  const handle_delete_corr = async (value) => {
    const formdata = new FormData()
    formdata.append("lead_id", id)
    formdata.append("correlations_relation_id", value.correlation_lead_user)



    axios.post(`${config.apiEndPoint}postLeadDeletedCorrelations`, formdata).then((response) => {
      if (response.data && response.data.message === "The CorrRelation has been Deleted!!") {
        swal({
          title: response.data.message,
          icon: "success",
          dangerMode: true,
        });
        axios.get(`${config.apiEndPoint}getEditProspect/${id}`).then((response) => {
          setcorrelationView([...response.data.correlations, ...response.data.correlation_lead_user]);
          setadmin_timeline_data(editLead.timeline)
          setadmin_overview_data(editLead.overview)
        });
      } else {

        swal({
          title: "You can't delete this Correlation",
          icon: "error",
          dangerMode: true,
        });
      }
    });
  }


  useEffect(() => {
    if (rescreatBy.data) {
      setCreatBy(rescreatBy.data);
      console.log(rescreatBy.data);
    }
  }, [rescreatBy.data]);
  useEffect(() => {
    if (resAddFollower.data) {
      if (!resAddFollower.data.message) {
        console.log(resAddFollower.data);
        setAddfollower(resAddFollower.data);
      }
      // setAddfollower
    }
  }, [resAddFollower]);
  useEffect(() => {
    if (resAddNote.data) {
      if (resAddNote.data && !resAddNote.data.message) {
        toast.success("Successfully Updated!");
        // console.log(resAddFollower.data);


        // setAssetsNotes(response.data.assets_notes)

        setAssetsNotes(resAddNote.data)
      } else if (resAddNote.data.message === "Empty Note") {
        toast.error(resAddNote.data.message);
      }
      // setAddfollower
    }
  }, [resAddNote.data]);
  useEffect(() => {
    if (stageData) {
      let lostObj = stageData.filter((stageName) => stageName.id == stage)[0];
      if (lostObj?.wonlost === "lost") {
        setlostStage(true);
        setlostStageName(lostObj?.name);
      } else {
        setlostStage(false);
      }
    } else {
      setlostStage(false);
    }
  }, [stage]);

  const [modalStates, setModalStates] = useState(
    correlArr.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );

  const {
    data: loststageData,
    loading9,
    error9,
  } = useFetch("", "getAllProspectStagesSettings");
  const { data: stageData } = useFetch("", "getViewProspectKanbanStages");
  const { data: registerdata } = useFetch("", "getUserRoles");
  const { data: sourceList } = useFetch("", "getAllSources");
  const { data: getAllCorrelationsLead2, loading5 } = useFetch(
    "",
    "getAllCorrelationsLead"
  );
  const { data: category_select_list1 } = useFetch("", "getViewCategory");
  const follower_select_list = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Custom", value: "Custom" },
    { label: "Role", value: "Role" },
  ];
  const redata = registerdata;

  const subbb = async (v) => {
    setcategory(v);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));

    apiMethodPostCategory("postViewSubCategory", formdata);
  };
  useEffect(() => {
    if (category_select_list1) {
      let data = category_select_list1.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setCategory_select_list(data);
      console.log(data, "sda");
    }
  }, [category_select_list1]);

  useEffect(() => {
    if (resPostCategory.data && !resPostCategory.data.message) {
      let subData = resPostCategory.data.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setsubCategoryselect(subData);
      console.log(subData);
    } else if (resPostCategory.data && resPostCategory.data.message) {
      setsubCategoryselect([]);
    }
  }, [resPostCategory]);
  useEffect(() => {

    if (resupdateAddFollower.data) {
      if (Array.isArray(resupdateAddFollower.data.is_follower)) {
        setPreviousFollower(resupdateAddFollower.data.is_follower);
        reRenderTimeline()
        let wrapper = document.createElement("div")
        wrapper.innerHTML = `${resupdateAddFollower?.data?.new_followers?.length > 0 ?
          "<h4> New Followers: </h4>" + resupdateAddFollower?.data?.new_followers.join() + " added successfully. <br/>" : ""} 
    ${(resupdateAddFollower?.data?.old_followers?.length > 0) ?
            "<h4>Followers Already Exists:</h4>" + resupdateAddFollower?.data?.old_followers.join() + ". " : ""}
    `
        swal({
          title: resupdateAddFollower.data.message,
          content: wrapper,
          icon: "success",
          dangerMode: true,
        });
      } else if (resupdateAddFollower.data.message) {
        swal({
          title: resupdateAddFollower.data.message,
          icon: "warning",
        });
      }
    }
  }, [resupdateAddFollower.data]);
  const deleteLeadAssign = (v) => {
    let formdata = new FormData();
    formdata.append("userType", "unAssign");
    formdata.append("unAssign", v);
    formdata.append("uLead", id);
    let deldata = formdata;
    apiMethodDelAssign("postDeleteLeadAssign", deldata);
    setassignLeadName(false);
  };
  // ///////// Notes Start/////////
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  const addNote = () => {
    let formdata = new FormData();
    formdata.append("leadId", id);
    formdata.append("notes", content);
    privateNote &&
      formdata.append("private_note", "private_note");
    // privateNote.target && console.log(content, privateNote.target.value);
    apiMethodAddNote("postNotesUpdated", formdata);
    setContent("")

  };

  // ///////// Notes  End /////////
  /////////////////  Action Card Start////////////////////
  const handleAddActionRow = () => {
    setactionArr([
      ...actionArr,
      {
        id: actionArr.length + 1,
        DateValue: "",
        FirstValue: "",
        secValue: "",
        thirdValue: "",
        deleteBtn: "delete",
      },
    ]);
  };

  const handleRemoveActionRow = (item) => {
    setactionArr(actionArr.filter((val) => val.id !== item.id));
  };

  /////////////////  Action Card End ////////////////////

  ////////////////  Meeting Card Start////////////////////
  const handleAddMeetingRow = () => {
    setmeetingArr([
      ...meetingArr,
      {
        id: meetingArr.length + 1,
        DateValue: "",
        FirstValue: "",
        secValue: "",
        thirdValue: "",
        deleteBtn: "delete",
      },
    ]);
  };

  const handleRemoveMeetingRow = (item) => {
    setmeetingArr(meetingArr.filter((val) => val.id !== item.id));
  };

  /////////////////  Meeting Card End ////////////////////

  const delAddFollower = (item) => {
    const formdata = new FormData();
    formdata.append("userType", "unFollow");
    formdata.append("uLead", id);
    formdata.append("unFollow", item.id);

    apiMethod4("postLeadUnFollow", formdata);

    setPreviousFollower(previousFollower.filter((val) => val.id !== item.id));
  };
  const updateAddFollower = () => {
    const formdata = new FormData();
    formdata.append("uLeadType", "leadFollwer");
    formdata.append("uLead", id);
    let selectedFollowerId =
      addselectedFollower.length &&
      addselectedFollower.map((item) => {
        return item.key;
      });
    addselectedFollower.length &&
      selectedFollowerId.map((v, i) => {
        formdata.append(`userLead[${i}]`, v);
      });
    apiMethodupdateAddFollower("postLeadAddFollowers", formdata);
    //
  };
  const handleCorrValue = (id, value, type) => {
    console.log(type);
    let updateValue = [...correlArr];
    updateValue[id].firsValue = value;
    updateValue[id].type = type;
    setcorrelArr(updateValue);
  };

  const handleCorrValue2 = (id, value) => {
    let updateValue = [...correlArr];
    setcorrelArr(updateValue);
    setcorrval(value);
    let update = [...correlArr];
    update[id].value = value;
    setcorrelArr(update);
  };

  const deleteAssetFile = (item) => {
    let field = {
      general: "delete_file",
      fieldId: item.db_file_id,
      filelead: item.file_lead,
      filename: item.file_name,
    };

    setAssetsFile(
      assetsFile.filter((its) => its.db_file_id != item.db_file_id)
    );
    apiMethodDeleteAsset("postDeleteLeadAssets", field);
  };
  const delCorrelation = (element) => {
    setcorrelArr(correlArr.filter((item) => item.id !== element.id));
  };

  const onSearchFollower = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };
  const onSearchFollowerAdd = (v) => {
    const formdata = new FormData();
    formdata.append("query", v);
    formdata.append("userType", "typeSearch");

    apiMethodAddFollower("postLeadViewFollowers", formdata);
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const handleJustifyClick2 = (value) => {
    if (value == justifyActive2) {
      return;
    }
    setJustifyActive2(value);
  };
  const handleJustifyClick3 = (value) => {
    if (value == assettab) {
      return;
    }

    setAssettab(value);
  };
  const handleJustifyClickFollowTab = (value) => {
    if (value == followUptab) {
      return;
    }

    setfollowUptab(value);
  };
  const handleJustifyClickAdminTab = (value) => {
    if (value == admintab) {
      return;
    }

    setAdmintab(value);
  };

  const [phoneNumber, setPhoneNumber] = useState({});
  const { addHeading } = useContext(MainHeadingContext);
  const [datas, setDatas] = useState("");
  const [image, setImage] = useState();
  const [assetsFile, setAssetsFile] = useState("");
  const [imgVal, setImgVal] = useState("");
  const [emails, setEmails] = useState("");
  const [emailse, setEmailse] = useState(false);
  const { data: editLead, loading } = useFetch(
    { setDatas },
    `getEditPendingProspect/${id}`
  );
  useEffect(() => {
    if (editLead && editLead.prospects_data) {
      setImgVal(editLead.prospects_data[0].avatar);
      setImage(editLead.prospects_data[0].avatar)
      console.log(editLead.prospects_data[0].avatar)
      setAssetsNotes(editLead.Assets_Notes);
      setSelectedSource(editLead.prospects_data[0].lead_leadsource);
      setSelectedSource2(editLead.prospects_data[0].lead_leadmedium);
      let formdataOwner = new FormData();
      formdataOwner.append("userType", "typeSearch");
      formdataOwner.append("query", " ");
      apiMethodowner("postSpecifiesUsers", formdataOwner);
      // apiMethodowner2("postSpecifiesUsers", formdataOwner);
      setassignLeadName({
        uname: editLead.prospects_data[0].assigned_to_name,
        role_name: editLead.prospects_data[0].assigned_to_role_name,

      })
      addHeading(`Edit Prospect - ${editLead.prospects_data[0].fullname}`);
      setAssetsFile(editLead.assetsFile);
      setEditLeadFeild(editLead.all_fields);
      setadmin_timeline_data(editLead.timeline)
      setadmin_overview_data(editLead.overview)
      if (!editLead.prospects_data[0]?.tags == "") {
        setselectTag(editLead.prospects_data[0]?.tags?.split(","));
      }
      setdefaultCreateDate(editLead.prospects_data[0].created_date)

      setopportunityData(editLead.Opportunity);
      setEmails(`${editLead.prospects_data[0].email}`);
      setcorrelationView([...editLead.correlations, ...editLead.correlation_lead_user]);
      setPreviousFollower(editLead.prospects_followers);
      setPracticeName(
        allData.timeZone.filter((item) => {
          return item.value == datas.prospects_data[0].time_zone;
        })[0]
      );
      setPhoneNumber({
        number: editLead.prospects_data[0].number,
        mobile_phone: editLead.prospects_data[0].mobile_phone,
      });

      setselectedLostStage(editLead.prospects_data[0].lost_prospect_reason);
      setStage(editLead.prospects_data[0].prospect_stage);
      setconvertAssignProspect(false);
      if (editLead.prospects_data[0].prospect_wonlost === "won") {
        setconvertAssignProspect(true);

        setconvertAssignProspectDefault({
          assignTo: {
            assignName: editLead.prospects_data[0].assigned_to_name,
            assignId: editLead.prospects_data[0].lead_assigned_to,
          },
          stageData: {
            list: editLead.prospects_stages,
            previousStage: editLead.prospects_data[0].prospect_stage,
          },
          type: editLead.prospects_data[0].type_of_contact,
          editId: id,
        });
      }
    }
  }, [editLead]);

  const handlePractice = (item) => {
    setPracticeName(item);
  };
  const handleEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(e)}?d=404`;

    if (emailRegex.test(e)) {
      const avatarUrl = gravatar.url(e, { s: '200', r: 'pg', d: 'identicon' }, true);
      fetch(gravatarUrl)
        .then(response => {
          if (response.status === 404) {
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
              .then((res) => {
                setEmailse(res.data.aleady_exist);
                setImage(permissions["system-default-avatar-image"]?.setting_value)

              })
              .catch((err) => {
                console.log("create errr", err);
              });
          } else {
            setImage(`${avatarUrl}`)
          }
        })
        .catch(error => {
          console.error('Error checking Gravatar image:', error);
        });
    }
    else {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
        .then((res) => {
          setEmailse(res.data.aleady_exist);
          if (image === '') {
            setImage(permissions[`system-default-avatar-image`]?.setting_value)
          }
        })
        .catch((err) => {
          console.log("create errr", err);
        });
    }


    setEmails(e);
  };
  const [tagoption, setTagOption] = useState([]);
  const [resTag, apiMethodTag] = usePost();
  const onSearchTag = (v) => {
    const formdata = new FormData();
    formdata.append("search_term", v);
    apiMethodTag("postSearchTags", formdata);
  };

  useEffect(() => {
    if (resTag.data) {
      if (resTag.data && !resTag.isLoading) {
        if (!resTag.data.message) {
          setTagOption(
            resTag.data.map((item) => {
              return {
                value: item,
                item,
              };
            })
          );
        }
      }
    }
  }, [resTag.data]);

  const handledault = (e) => {
    e.preventDefault();
    setImgVal(
      "https://phpstack-896782-3112616.cloudwaysapps.com/assets/images/system/55a45eb1a93bc957e4ff54e0d9ca3774735875ec.png"
    );
  };

  const submitbutton = {
    class: "btn btn-primary update_button_lead",
    text: "Update Info",
  };

  let reqName = [
    "fname",
    "lead_leadsource",
    "type_of_contact",
    "lead_leadmedium",
  ];
  let reqNameObj = [
    {
      label: "First Name",
      name: "fname",
    },

    {
      label: "Email",
      name: "email",
    },
    {
      label: "Lead Source",
      name: "lead_leadsource",
    },
    {
      label: "Lead Medium",
      name: "lead_leadmedium",
    },
    {
      label: "Type",
      name: "type_of_contact",
    },
  ];

  function handleSubmit(values) {
    values.lead_leadmedium = selectedSource2;
    values.lead_leadsource = selectedSource;
    values.lost_prospect_reason = lostStage ? selectedLostStage : "";
    values.created_date = defaultCreateDate

    console.log(values);

    delete values.email;
    delete initialValues.email;
    console.log(emails, "muzz", initialValues, values);
    let time_zone = { time_zone: practiceName?.value };
    values.prospect_stage = stage;
    let allValues = {
      ...initialValues,
      ...values,
      ...phoneNumber,
      ...time_zone,
    };
    let emptyReq_field_name = [];
    let req = reqName.filter((val) => {
      return allValues[val]?.trim() == "" || allValues[val] == undefined;
    });
    if (emails == "") {
      if (
        leadPermission?.super_admin == true ||
        leadPermission?.prospects?.fields?.prospects_email == "true"
      ) {
        req.push("email");
      }
    }
    reqNameObj.map((val) => {
      if (req.includes(val.name)) {
        console.log(val.label);
        emptyReq_field_name.push(val.label);
      }
    });

    if (lostStage) {
      if (!selectedLostStage) {
        swal({
          title: "Please specify the reason:",
          text: lostStageName,
          icon: "warning",
          dangerMode: true,
        });
        return false;
      }
    }
    if (emailse) {
      {
        swal({
          title: "Email already used:",
          text: emails,
          icon: "warning",
          dangerMode: true,
        });
      }
    } else if (req.length == 0) {
      let formdata = new FormData();
      for (let item in allValues) {
        if (item === "avatar") {
          formdata.append("avatar", image);
        } else {
          formdata.append(item, allValues[item]);
        }
      }
      selectTag && formdata.append("tags", selectTag);
      image2 && formdata.append("upload_file", image2);
      formdata.append("email", emails);
      formdata.append("lead_stage", editLead.prospects_data[0].lead_stage);
      followerSelectValue && formdata.append("file_follw", followerSelectValue);
      selectedFollower.length &&
        selectedFollower.map((v, i) => {
          formdata.append(`file_followers[${i}]`, v);
        });
      category.length &&
        category.map((v, i) => {
          formdata.append(`file_cat[${i}]`, v);
        });
      subCat_selected.length &&
        subCat_selected.map((v, i) => {
          formdata.append(`file_subcat[${i}]`, v);
        });

      formdata.append("submit", "update_prospect");

      let bodyContent = formdata;
      apiMethod("postUpdateProspect", bodyContent);
    } else {
      let a = emptyReq_field_name.join(", ");
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: a,
        icon: "error",
        dangerMode: true,
      });
    }
  }
  useEffect(() => {
    if (res.data) {
      if (res.data && !res.isLoading) {
        toast.success(res.data.message);
        window.location.reload(true);
      }
    }
  }, [res.data]);

  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const handleList1 = (e, id) => {
    let formdataOwner = new FormData();
    formdataOwner.append("uLeadType", "leadUsr");
    formdataOwner.append("mode", "prospect");
    formdataOwner.append("query", corrval);
    apiMethodowner1("postCorrelationSearch", formdataOwner);
    setModalStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    apiMethod_type_of_contact_list("postAllViewTypeContact", {
      type: "Lead,Prospect,Client",
    });
  }, []);
  useEffect(() => {
    if (res2.data) {
      setJustifyActive2("tab20");
      setEditLeadFeild(res2.data.all_fields);
    }
  }, [res2.data]);



  if (loading || loading5 || respremetion.isLoading) return <Loader />;

  if (datas && !datas.message) {
    var initialValues = datas.prospects_data[0];

    Object.keys(initialValues).map(function (key, index) {
      if (initialValues[key] == null) {
        initialValues[key] = "";
      }
    });
  }
  const private_notes = ["private_note"];

  const handleClick = (item) => {
    setSearchval(item.uname);
    setOwnerhidden(item.id);
    setListOpen(false);
  };
  const handleClick1 = (id, item, newid) => {
    let updateValue = [...correlArr];
    updateValue[id].secValue = item.id;
    updateValue[id].value = item.uname;
    setcorrelArr(updateValue);
    setModalStates((prevState) => ({
      ...prevState,
      [newid]: false,
    }));
  };
  const handleStage2 = (e) => {
    let leads = new FormData();
    setStage(e.target.value);
    leads.append("type", "getCustomFields");
    leads.append("mode", "prospects");
    leads.append("mdType", "Prospect");
    leads.append("lead_stage", e.target.value);
    apiMethod2("postProspectStageCustomFields", leads);
  };
  const UpdateCorrelation = () => {
    let correlation = new FormData();
    correlation.append("corrAd", "corrAd");
    if (correlArr.length) {
      correlArr.map((item, i) => {
        correlation.append(`corr[${i}]`, item.firsValue);
        correlation.append(`lead[${i}]`, item.secValue);
        correlation.append("corrAdd", id);
        console.log(correlArr);
      });

      axios.post(`${config.apiEndPoint}postLeadSearchAddCorrelations`, correlation)
        .then((response) => {
          if (response.data) {


            if (response.data.message) {

              swal({
                title: response.data.message,

                icon: "success",
                dangerMode: true,
              });
            }

            setcorrelationView([...response.data.correlations, ...response.data.correlation_lead_user]);
            reRenderTimeline()

            // axios
            //   .get(`${config.apiEndPoint}getEditProspect/${id}`)
            //   .then((response) => {

            //   });

          }
        })

    }
  };

  // const UpdateCorrelation = () => {
  //   let correlation = new FormData();
  //   correlation.append("corrAd", "corrAd");
  //   if (correlArr.length) {
  //     correlArr.map((item, i) => {
  //       correlation.append(`corr[${i}]`, item.firsValue);
  //       correlation.append(`lead[${i}]`, item.secValue);
  //       correlation.append("corrAdd", id);
  //       console.log(correlArr);
  //     });

  //     axios.post(`${config.apiEndPoint}postLeadSearchAddCorrelations`,correlation)
  //     .then((response)=>{if(response.data){


  //       if(response.data.message){

  //       swal({
  //       title: response.data.message,

  //       icon: "success",
  //       dangerMode: true,
  //     });
  //     }


  //       axios
  //         .get(`${config.apiEndPoint}getEditPendingProspect/${id}`)
  //         .then((response) => {setcorrelationView(response.data.correlations);});

  //     }})

  //   }
  // };

  const assignLeadIdToName = (v) => {
    if (resowner.data && v && !resowner.data.message) {
      let leadname = resowner.data.filter((vals) => vals.id == v)[0];
      setassignLeadName({
        uname: leadname.uname,
        role_name: leadname.role_name,

      })
    }
  };

  const assignLead = () => {
    let regData = {
      uLeadType: "assign",
      userLead: ownerhidden,
      uLead: id,
    };

    apiMethodpostLeadAssign("postLeadAssign", regData);
    assignLeadIdToName(ownerhidden);
  };
  const avatarDefualtURL = (s, d) => {
    setImgVal(
      "https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"
    );
  };
  const addCorrelation = () => {
    let newid = correlArr.length + 1;
    setModalStates((prevState) => ({
      ...prevState,
      [newid]: false,
    }));

    setcorrelArr([
      ...correlArr,
      {
        id: newid,
        firsValue: "",
        secValue: "",
        value: "",
        type: "Co-Worker",
      },
    ]);
  };
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.prospects?.fields?.prospects_fname == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("fname"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.prospects?.fields?.prospects_lead_source == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("lead_leadsource"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.prospects?.fields?.prospects_lead_medium == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("lead_leadmedium"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.prospects?.fields?.prospects_contact_type == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("type_of_contact"), 1);
  }
  let Created_Date = ""
  let Updated_Date = ""
  let Contacted_Date = ""
  let Validation_Date = ""
  let Qualification_Date = ""
  let Prospect_Lost_Date = ""
  let Unqualified_Date = ""
  let Date_Created_for_First_Deal = ""
  if (admin_overview_data?.OverView[`Created Date`]) {
    const inputDateString = admin_overview_data?.OverView[`Created Date`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    let outputDateString = ""
    if (permissions['system-user_timezone']?.setting_value) {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    else {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    Created_Date = outputDateString === "Invalid Date" ? "----" : outputDateString; // "03-Jan-2023 04:30 AM"
  }
  if (admin_overview_data?.OverView[`Updated Date`]) {
    const inputDateString = admin_overview_data?.OverView[`Updated Date`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    let outputDateString = ""
    if (permissions['system-user_timezone']?.setting_value) {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    else {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    Updated_Date = outputDateString === "Invalid Date" ? "----" : outputDateString // "03-Jan-2023 04:30 AM"
  }
  if (admin_overview_data?.OverView[`Contacted Date`]) {
    const inputDateString = admin_overview_data?.OverView[`Contacted Date`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    let outputDateString = ""
    if (permissions['system-user_timezone']?.setting_value) {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    else {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    Contacted_Date = outputDateString === "Invalid Date" ? "----" : outputDateString // "03-Jan-2023 04:30 AM"
  }
  if (admin_overview_data?.OverView[`Date Created for First Deal`]) {
    const inputDateString = admin_overview_data?.OverView[`Date Created for First Deal`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    let outputDateString = ""
    if (permissions['system-user_timezone']?.setting_value) {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    else {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    Date_Created_for_First_Deal = outputDateString === "Invalid Date" ? "----" : outputDateString // "03-Jan-2023 04:30 AM"
  }
  if (admin_overview_data?.OverView[`Validation Date`]) {
    const inputDateString = admin_overview_data?.OverView[`Validation Date`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    let outputDateString = ""
    if (permissions['system-user_timezone']?.setting_value) {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    else {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    Validation_Date = outputDateString === "Invalid Date" ? "----" : outputDateString // "03-Jan-2023 04:30 AM"
  }
  if (admin_overview_data?.OverView[`Qualification Date`]) {
    const inputDateString = admin_overview_data?.OverView[`Qualification Date`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    let outputDateString = ""
    if (permissions['system-user_timezone']?.setting_value) {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    else {
      outputDateString = inputDate.format("DD-MMM-YYYY hh:mm A");
    }
    Qualification_Date = outputDateString === "Invalid Date" ? "----" : outputDateString // "03-Jan-2023 04:30 AM"
  }
  if (admin_overview_data?.OverView[`Prospect Lost Date`]) {
    const inputDateString = admin_overview_data?.OverView[`Prospect Lost Date`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    Prospect_Lost_Date = inputDate.format("DD-MMM-YYYY") === "Invalid Date" ? "----" : inputDate.format("DD-MMM-YYYY")
  }
  if (admin_overview_data?.OverView[`Unqualified Date`]) {
    const inputDateString = admin_overview_data?.OverView[`Unqualified Date`];
    const inputDate = dayjs(inputDateString, "YYYY-MM-DD HH:mm:ss");
    Unqualified_Date = inputDate.format("DD-MMM-YYYY") === "Invalid Date" ? "----" : inputDate.format("DD-MMM-YYYY")
  }

  return (
    editLead &&
    !editLead.message && (
      <>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form name="myForm">
            <div className="editLeadForm">
              <div className="container-fluid">
                <div className="row row-cards">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <div className="media">
                          {imgVal && (
                            <img
                              className="avatar avatar-xxl mr-5"
                              onError={() => {
                                avatarDefualtURL();
                              }}
                              src={imgVal}
                              alt="avatar"
                            />
                          )}
                          <div className="media-body">
                            <h5 className="m-0">{initialValues.fullname}</h5>

                            <div className="mb-1 socialBtn">
                              <a href={`mailto:${initialValues.email}`}>
                                <i className="fa fa-envelope"></i>
                              </a>{" "}
                              &nbsp;
                              <a href={`tel:${initialValues?.number}`}>
                                <i className="fa fa-phone"></i>
                              </a>{" "}
                              &nbsp;
                              <a href={`sms:${initialValues?.number}`}>
                                <i className="fa fa-mobile"></i>
                              </a>{" "}
                              &nbsp;
                              <a
                                href={`https://api.whatsapp.com/send?phone=${initialValues?.number}`}
                              >
                                <i className="fa fa-whatsapp"></i>
                              </a>{" "}
                              &nbsp;
                              <a
                                href={`https://justcall.io/app/macapp/dialpad_app.php?numbers=${initialValues?.number}`}
                              >
                                <img src={`${img1}`} width={15} />{" "}
                              </a>
                            </div>

                            <p> Created by:{" "}
                              {Translation(
                                translation,
                                `${editLead.prospects_data[0]?.lead_by_name} (${editLead.prospects_data[0]?.lead_by_role_name})`
                              )}{" "}
                              <br />
                              Assigned to: {" "}
                              {Translation(
                                translation,
                                `${(assignLeadName && assignLeadName.uname && assignLeadName.uname + " " + "(" + assignLeadName.role_name + ")") || ""}`
                              )}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="card-options">
                          <div className="columndd">
                            <div>
                              <label className="form-label">
                                Stage:{" "}
                                {Translation(
                                  translation,
                                  `${datas.prospects_stages &&
                                  !datas.prospects_stages.message &&
                                  editLead.prospects_data[0]
                                    .prospect_stage_name
                                  }`
                                )}
                                <br />
                              </label>
                            </div>

                            {editLead &&
                              `${datas.prospects_stages &&
                              !datas.prospects_stages.message &&
                              editLead.prospects_data[0].prospect_wonlost
                              }` === "lost" && (
                                <div>
                                  <label className="form-label">
                                    {
                                      editLead.prospects_data[0]?.prospect_stage_name
                                    }{" "}
                                    Reason:
                                    <br />
                                    {!editLead.prospectsLostStages.message &&
                                      Array.isArray(editLead.prospectsLostStages) && editLead.prospectsLostStages[0]?.reason_description}
                                  </label>
                                </div>
                              )}
                          </div>
                          <div className="item-action dropdown ml-2">
                            <a data-toggle="dropdown" aria-expanded="false">
                              <i className="fe fe-more-vertical"></i>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item">
                                <i className="dropdown-icon fa fa-share-alt"></i>{" "}
                                Edit
                              </a>
                              <Link className="dropdown-item">
                                <i className="dropdown-icon fa fa-cloud-download"></i>{" "}
                                Assign To
                              </Link>
                              <div className="dropdown-divider"></div>
                              <Link className="dropdown-item">
                                <i className="dropdown-icon fa fa-copy"></i>
                                Create Action
                              </Link>
                              <Link className="dropdown-item">
                                <i className="dropdown-icon fa fa-folder"></i>
                                Create Opportunity
                              </Link>
                              <Link className="dropdown-item">
                                <i className="dropdown-icon fa fa-edit"></i>
                                Create Meeting
                              </Link>
                              <Link className="dropdown-item">
                                <i className="dropdown-icon fa fa-trash"></i>
                                Create Project
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card card-collapsed">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <div className="card-title">
                          <MdSummarize />
                          Summary
                          <small>Lead Details</small>
                        </div>
                        <div className="card-options">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            data-toggle="card-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body justify-content-center">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="card">
                              <div className="card-status bg-blue"></div>
                              <div className="card-header">
                                <h3 className="card-title">
                                  Basic Information
                                </h3>
                                <div className="card-options">
                                  <Link
                                    className="card-options-collapse"
                                    onClick={(e) => handleToggle(e)}
                                    data-toggle="card-collapse"
                                  >
                                    <i className="fe fe-chevron-down"></i>
                                  </Link>
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-12 mb-3">
                                    <File
                                      value={typeof (image) === 'string' ? (image.includes("www.gravatar.com") || image.includes("s.gravatar") ? image : `${config.baseurl2}${image}`) : image}
                                      onUpload={setImage}
                                      label={Translation(translation, "Avatar")}
                                      name={"avatcdo"}
                                    />

                                    <Link onClick={() => setImage('https://www.gravatar.com/avatar/9f199d16db9e64e35e53f2b0f13ac617?s=160')} className="float-left" >Use Gravatar</Link>
                                  </div>
                                  <div className="col-sm-12 mb-3">
                                    <label className="form-label">
                                      {Translation(
                                        translation,
                                        "Lead Assign to"
                                      )}
                                    </label>
                                    <div
                                      ref={ownerRef}
                                      className="searchDropDown"
                                    >
                                      <input
                                        type="text"
                                        className="form-control"
                                        ref={inputElement}
                                        name="contact_owner"
                                        value={searchval}
                                        onChange={(e) =>
                                          setSearchval(e.target.value)
                                        }
                                      />

                                      <button
                                        className="nav-link clickButton"
                                        type="button"
                                        id="dropdownMenuButton"
                                        onClick={() => handleList()}
                                      >
                                        <FaSearch />
                                      </button>
                                    </div>
                                    <div
                                      className={`dropDownCustom ${listOpen && "active"
                                        }`}
                                    >
                                      {resowner.data && (
                                        <ul className="list">
                                          {resowner.isLoading ? (
                                            ""
                                          ) : !resowner.data.message ? (
                                            resowner.data.map((item, index) => {
                                              return (
                                                <li
                                                  key={index}
                                                  onClick={() =>
                                                    handleClick(item)
                                                  }
                                                >
                                                  {Translation(
                                                    translation,
                                                    `${item.uname} (${item.role_name})`
                                                  )}
                                                </li>
                                              );
                                            })
                                          ) : (
                                            <li>
                                              {Translation(
                                                translation,
                                                `${resowner.data.message}`
                                              )}
                                            </li>
                                          )}
                                        </ul>
                                      )}
                                    </div>
                                    <input
                                      type="hidden"
                                      name={"owner"}
                                      value={ownerhidden}
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary btn-block btn-leadassign"
                                    onClick={() => {
                                      assignLead();
                                    }}
                                  >
                                    {Translation(translation, "Assign Lead")}
                                  </button>
                                  <hr />
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="row fv-plugins-icon-container">
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_fname === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        required={true}
                                        label={Translation(
                                          translation,
                                          "First Name"
                                        )}
                                        name="fname"
                                        control="input3"
                                        placeholder={Translation(
                                          translation,
                                          "First Name"
                                        )}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_fname === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group my-2">
                                        <label className="form-label mb-3">
                                          {Translation(
                                            translation,
                                            "First Name"
                                          )}
                                        </label>
                                        {Translation(
                                          translation,
                                          `${initialValues.fname || ""}`
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_lname === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        defaultValue={initialValues.lname}
                                        label={Translation(
                                          translation,
                                          `${"Last Name"}`
                                        )}
                                        name="lname"
                                        control="input"
                                        placeholder={Translation(
                                          translation,
                                          "Last Name"
                                        )}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_lname === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group my-2">
                                        <label className="form-label mb-3">
                                          {Translation(
                                            translation,
                                            "Last Name"
                                          )}
                                        </label>
                                        {Translation(
                                          translation,
                                          `${initialValues.lname || ""}`
                                        )}{" "}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_contact_type === "true" ? (
                                    <div className="col-md-12">
                                      {/* 
                                      <FormControl
                                        className="form-control my-1"
                                        selectList={res_type_of_contact_list.data && res_type_of_contact_list.data}
                                        required={true}
                                        label={"Type"}
                                        name="type_of_contact"
                                        control="select_custom_options"
                                        custom_label_name="type_name"
                                        customer_value_name="db_id"
                                        onChange={handleSourceChange2}
                                        value={selectedSource2}
                                        /> */}
                                      <FormControl
                                        className="form-control my-1"
                                        selectList={
                                          res_type_of_contact_list.data &&
                                          res_type_of_contact_list.data
                                        }
                                        required={true}
                                        label={"Type"}
                                        name="type_of_contact"
                                        defaultValue={
                                          res_type_of_contact_list.data &&
                                          initialValues.type_of_contact
                                        }
                                        control="select_custom_options"
                                        custom_label_name="type_name"
                                        customer_value_name="db_id"
                                      // onChange={handleTypeChange}
                                      // value={selectedType.db_id}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_contact_type === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Type of Contact"
                                          )}
                                        </label>
                                        <p className="mb-0">
                                          {Translation(
                                            translation,
                                            `${initialValues.type_name}`
                                          )}
                                        </p>{" "}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_mobile_phone === "true" ? (
                                    <div className="col-md-12">
                                      <FormControl
                                        className="form-control my-1"
                                        updatess={(item) =>
                                          setPhoneNumber({
                                            ...phoneNumber,
                                            number: `+${item}`,
                                          })
                                        }
                                        datas={initialValues.number}
                                        label={Translation(
                                          translation,
                                          `${"Mobile Phone"}`
                                        )}
                                        name="number"
                                        control="intl"
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_mobile_phone === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Mobile Phone"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].number}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_lead_stage === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        id={"prospect_stage"}
                                        className="form-control my-1"
                                        selectList={stageData && stageData}
                                        label={Translation(
                                          translation,
                                          `${"Prospect Stage"}`
                                        )}
                                        name={"prospect_stage"}
                                        selectedd={initialValues.prospect_stage}
                                        required={true}
                                        value={
                                          stage || initialValues.prospect_stage
                                        }
                                        control="select_custom_options"
                                        custom_label_name="name"
                                        customer_value_name="id"
                                        onChange={(e) => handleStage2(e)}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_lead_stage === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Prospect Stage"
                                          )}
                                        </label>
                                        {Translation(
                                          translation,
                                          `${initialValues &&
                                          initialValues.prospect_stage_name
                                          }`
                                        )}{" "}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {(leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_lead_stage === "true") &&
                                    lostStage ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        id={"lost_prospect_reason"}
                                        className="form-control my-1"
                                        selectList={
                                          loststageData && loststageData
                                        }
                                        label={Translation(
                                          translation,
                                          `${lostStageName + " reason"}`
                                        )}
                                        name={"lost_prospect_reason"}
                                        firstSelect={"--select--"}
                                        selectedd={
                                          initialValues.lost_prospect_reason
                                        }
                                        required={true}
                                        value={
                                          selectedLostStage ||
                                          initialValues.lost_prospect_reason
                                        }
                                        control="select_custom_options"
                                        custom_label_name="reason_description"
                                        customer_value_name="reason_id"
                                        onChange={(e) =>
                                          setselectedLostStage(e.target.value)
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_lead_stage === "-1" &&
                                    lostStage ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            `${lostStageName + " reason"}`
                                          )}
                                        </label>
                                        {Translation(
                                          translation,
                                          `${datas.prospectsLostStages &&
                                          !datas.prospectsLostStages
                                            .message &&
                                          datas.prospectsLostStages[0]
                                            .reason_description
                                          }`
                                        )}{" "}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_email === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        required={true}
                                        label={Translation(
                                          translation,
                                          `${"E-mail"}`
                                        )}
                                        name="email"
                                        control="input"
                                        defaultValue={emails}
                                        onChange={(e) =>
                                          handleEmail(e.target.value)
                                        }
                                        placeholder={Translation(
                                          translation,
                                          `${"E-mail"}`
                                        )}
                                      />

                                      {emailse && (
                                        <div
                                          id="email_err"
                                          style={{ color: "red" }}
                                        >
                                          Email already stored!
                                        </div>
                                      )}
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_email === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translation, "E-mail")}
                                        </label>
                                        {datas.prospects_data[0].email}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_email_status === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        selectList={
                                          allData.createleadPage.EmailStatus
                                        }
                                        selectedd={initialValues.email_status}
                                        label={Translation(
                                          translation,
                                          `${"Email status"}`
                                        )}
                                        name="email_status"
                                        control="select"
                                        placeholder={Translation(
                                          translation,
                                          "E-mail"
                                        )}
                                        required={true}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_email_status === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Email status"
                                          )}
                                        </label>
                                        {Translation(
                                          translation,
                                          `${datas.prospects_data[0].email_status}`
                                        )}{" "}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_score_number === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        type={"number"}
                                        label={Translation(
                                          translation,
                                          `${"Score Number"}`
                                        )}
                                        name="score_number"
                                        control="input"
                                        defaultValue={
                                          datas.prospects_data[0].score_number
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_score_number === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Score Number"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].score_number}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_phone_number === "true" ? (
                                    <div className="col-md-12">
                                      <FormControl
                                        className="form-control my-1"
                                        updatess={(item) =>
                                          setPhoneNumber({
                                            ...phoneNumber,
                                            mobile_phone: `+${item}`,
                                          })
                                        }
                                        datas={initialValues.mobile_phone}
                                        label={Translation(
                                          translation,
                                          `${"Mobile Number"}`
                                        )}
                                        name="mobile_phone"
                                        control="intl"
                                        defaultValue={
                                          datas.prospects_data[0].number
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_phone_number === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Phone Number"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].number}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_birthday === "true" ? (
                                    <div className="col-md-12 mt-2">
                                      <FormControl
                                        type="date"
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Birthday"}`
                                        )}
                                        name="birthday"
                                        control="input"
                                        defaultValue={
                                          datas.prospects_data[0].birthday
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_birthday === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translation, "Birthday")}
                                        </label>
                                        {datas.prospects_data[0].birthday}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_created_date === "true" ? (
                                    <div className="col-md-12">
                                      <FormControl
                                        type="datetime-local"
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Created date"}`
                                        )}
                                        name="created_date"
                                        control="input"
                                        value={defaultCreateDate && defaultCreateDate}
                                        onChange={(e) => { setdefaultCreateDate(e.target.value) }}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_created_date === "-1" ? (
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Created date"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].created_date}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}

                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_updated_date === "true" ? (
                                    <div className="col-md-12">
                                      <FormControl
                                        type="text"
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Updated date"}`
                                        )}
                                        name="updated_date"
                                        control="input"
                                        disabled
                                        value={
                                          datas.prospects_data[0].updated_date
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_updated_date === "-1" ? (
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Updated date"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].updated_date}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="card leadCards">
                              <div className="card-status bg-blue"></div>
                              <div className="card-header">
                                <h3 className="card-title">
                                  {Translation(translation, "Location")}
                                </h3>
                                <div className="card-options">
                                  <Link
                                    className="card-options-collapse"
                                    onClick={(e) => handleToggle(e)}
                                    data-toggle="card-collapse"
                                  >
                                    <i className="fe fe-chevron-down"></i>
                                  </Link>
                                </div>
                              </div>

                              <div className="card-body">
                                <div className="row">
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_address1 === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Address 1"}`
                                        )}
                                        name="address_one"
                                        control="input"
                                        defaultValue={
                                          datas.prospects_data[0].address_one
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_address1 === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Address 1"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].address_one}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_address2 === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Address 2"}`
                                        )}
                                        defaultValue={
                                          datas.prospects_data[0].address_two
                                        }
                                        name="address_two"
                                        control="input"
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_address2 === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Address 2"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].address_two}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_city === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"City"}`
                                        )}
                                        name="city"
                                        control="input"
                                        defaultValue={
                                          datas.prospects_data[0].city
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_city === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translation, "City")}
                                        </label>
                                        {datas.prospects_data[0].city}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_postal_code === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Postal/ZIP Code"}`
                                        )}
                                        name="zip"
                                        control="input"
                                        defaultValue={
                                          datas.prospects_data[0].zip
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_postal_code === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Postal/ZIP Code"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].zip}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_state === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"State"}`
                                        )}
                                        name="state"
                                        control="input"
                                        defaultValue={
                                          datas.prospects_data[0].state
                                        }
                                        placeholder={Translation(
                                          translation,
                                          "State"
                                        )}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_state === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translation, "State")}
                                        </label>
                                        {datas.prospects_data[0].state}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_country === "true" ? (
                                    <div className="col-md-6">
                                      {console.log(
                                        datas.prospects_data[0].country
                                      )}
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Country"}`
                                        )}
                                        name="country"
                                        control="input"
                                        defaultValue={
                                          datas.prospects_data[0].country
                                        }
                                        placeholder={Translation(
                                          translation,
                                          "Country"
                                        )}
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_country === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translation, "Country")}
                                        </label>
                                        {datas.prospects_data[0].country}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_ipaddress === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"IP Address"}`
                                        )}
                                        name="ip_address"
                                        control="input"
                                        placeholder={Translation(
                                          translation,
                                          "IP Address"
                                        )}
                                        defaultValue={
                                          datas.prospects_data[0].ip_address
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_ipaddress === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "IP Address"
                                          )}
                                        </label>
                                        {datas.prospects_data[0].ip_address}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_time_zone === "true" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="">Time Zone</label>
                                        <Dropdown
                                          list={allData.timeZone}
                                          onChange={handlePractice}
                                          value={practiceName}
                                        />
                                      </div>
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_time_zone === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Time Zone"
                                          )}
                                        </label>
                                        {Translation(
                                          translation,
                                          `${datas.prospects_data[0].time_zone}`
                                        )}{" "}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_locale === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Locale"}`
                                        )}
                                        name="locale"
                                        control="input"
                                        placeholder={Translation(
                                          translation,
                                          "Locale"
                                        )}
                                        defaultValue={
                                          datas.prospects_data[0].locale
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_locale === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translation, "Locale")}
                                        </label>
                                        {datas.prospects_data[0].locale}
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_sourcepage === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        label={Translation(
                                          translation,
                                          `${"Source Page"}`
                                        )}
                                        name="lead_sourcepage"
                                        control="input"
                                        placeholder={Translation(
                                          translation,
                                          "Source Page"
                                        )}
                                        defaultValue={
                                          datas.prospects_data[0]
                                            .lead_sourcepage
                                        }
                                      />
                                    </div>
                                  ) : leadPermission?.prospects?.fields
                                    ?.prospects_sourcepage === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Source Page"
                                          )}
                                        </label>
                                        {
                                          datas.prospects_data[0]
                                            .lead_sourcepage
                                        }
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  {leadPermission?.prospects?.fields
                                    ?.prospects_lead_source === "-1" ? (
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(
                                            translation,
                                            "Lead Source"
                                          )}
                                        </label>
                                        {
                                          datas.prospects_data[0]
                                            .leadsource_name
                                        }
                                      </div>
                                    </div>
                                  ) : leadPermission?.super_admin ||
                                    leadPermission?.prospects?.fields
                                      ?.prospects_lead_source === "true" ? (
                                    <div className="col-md-6">
                                      <FormControl
                                        className="form-control my-1"
                                        selectList={sourceList && sourceList}
                                        firstSelect={"--select--"}
                                        label={Translation(
                                          translation,
                                          `${"Lead Source"}`
                                        )}
                                        name="lead_leadsource"
                                        control="select_custom_options"
                                        custom_label_name="source_name"
                                        customer_value_name="source_id"
                                        value={selectedSource}
                                        onChange={handleSourceChange}
                                        // defaultValue={initialValues.lead_leadsource}
                                        required={true}
                                      />
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {/* {
                                  leadPermission?.super_admin || leadPermission?.prospects?.fields?.prospects_lead_source === "true" ?
                                    <div className="col-md-12">
                                      {console.log(initialValues.lead_leadsource)}

                                      <FormControl
                                        className="form-control my-1"
                                        selectList={sourceList && sourceList}
                                        firstSelect={"--select--"}
                                        label={Translation(
                                          translation,
                                          `${"Lead Source"}`)}

                                        name="lead_leadsource"
                                        control="select_custom_options"
                                        custom_label_name="source_name"
                                        customer_value_name="source_id"
                                        value={selectedSource}
                                        onChange={handleSourceChange}
                                        defaultValue={initialValues.lead_leadsource}
                                        required={true} />


                                    </div>
                                     : 
 
                                    leadPermission?.prospects?.fields?.prospects_lead_source === "-1" ?
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label className="form-label">
                                            {Translation(translation, "Lead Source")}
                                          </label>
                                          {datas.prospects_data[0].lead_leadsource}
                                        </div>
                                      </div> : ''} */}
                                  <div className="col-md-6">
                                    {leadPermission?.super_admin ||
                                      leadPermission?.prospects?.fields
                                        ?.prospects_lead_source === "true" ||
                                      leadPermission?.prospects?.fields
                                        ?.prospects_lead_source === "-1" ? (
                                      leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields
                                          ?.prospects_lead_medium === "true" ? (
                                        <div>
                                          <FormControl
                                            className="form-control my-1"
                                            selectList={OppStageList}
                                            label={Translation(
                                              translation,
                                              `${"Lead Medium"}`
                                            )}
                                            required={true}
                                            name="lead_leadmedium"
                                            custom_label_name="source_name"
                                            customer_value_name="source_id"
                                            control="select_custom_options"
                                            value={selectedSource2}
                                            onChange={handleSourceChange2}
                                          />
                                        </div>
                                      ) : (
                                        <></>
                                      )
                                    ) : (
                                      <></>
                                    )}
                                    {leadPermission?.prospects?.fields
                                      ?.prospects_lead_source === "true" ||
                                      leadPermission?.prospects?.fields
                                        ?.prospects_lead_source === "-1" ? (
                                      leadPermission?.prospects?.fields
                                        ?.prospects_lead_medium === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translation,
                                                "Lead Medium"
                                              )}
                                            </label>
                                            {
                                              datas.prospects_data[0]
                                                .leadmedium_name
                                            }
                                          </div>
                                        </div>
                                      ) : (
                                        <></>
                                      )
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-users text-muted"></i> Overview
                          <small>More Details</small>
                        </h3>
                        <div className="card-options">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <MDBTabsContent>
                        <MDBTabsPane show={justifyActive === "tab1"}>
                          {editLeadFeild ? (
                            <div className="innerNav">
                              <MDBTabs
                                justify
                                className="nav d-flex nav-tabs page-header-tab"
                              >
                                {Object.keys(editLeadFeild).map(
                                  (item, index) => {
                                    return (
                                      <MDBTabsItem key={index}>
                                        <MDBTabsLink
                                          onClick={() =>
                                            handleJustifyClick2(`tab2${index}`)
                                          }
                                          active={
                                            justifyActive2 == `tab2${index}`
                                          }
                                        >
                                          {item.replaceAll("_", " ")}
                                        </MDBTabsLink>
                                      </MDBTabsItem>
                                    );
                                  }
                                )}
                              </MDBTabs>
                              <MDBTabsContent>
                                {Object.keys(editLeadFeild).map(function (
                                  key,
                                  i
                                ) {
                                  return (
                                    <MDBTabsPane
                                      key={i}
                                      show={justifyActive2 == `tab2${i}`}
                                    >
                                      <div className="card p-3">
                                        <div className="card-body">
                                          {Object.keys(editLeadFeild[key]).map(
                                            function (key2, ii) {
                                              return (
                                                <div
                                                  key={ii}
                                                  className={"col-md-6"}
                                                >
                                                  {" "}
                                                  <h4 className="mb-4">
                                                    {key2.replaceAll("_", " ")}
                                                  </h4>
                                                  {Object.keys(
                                                    editLeadFeild[key][key2]
                                                  ).map(function (key3, j) {
                                                    const {
                                                      type,
                                                      body,
                                                      field_required,
                                                      label,
                                                      value,
                                                    } =
                                                      editLeadFeild[key][key2][
                                                      key3
                                                      ];
                                                    const objname = Object.keys(
                                                      editLeadFeild[key][key2]
                                                    )[j];
                                                    let labelName = `prospects_${label.replaceAll(
                                                      " ",
                                                      "_"
                                                    )}`;
                                                    if (
                                                      field_required == "yes"
                                                    ) {
                                                      if (
                                                        !reqName.includes(label)
                                                      ) {
                                                        if (
                                                          leadPermission?.super_admin ||
                                                          leadPermission
                                                            ?.prospects?.fields[
                                                          labelName
                                                          ] === "true"
                                                        ) {
                                                          reqName.push(
                                                            label.replaceAll(
                                                              " ",
                                                              "_"
                                                            )
                                                          );
                                                          reqNameObj.push({
                                                            label: label,
                                                            name: label.replaceAll(
                                                              " ",
                                                              "_"
                                                            ),
                                                          });
                                                        }
                                                      }
                                                    }
                                                    if (value) {
                                                      initialValues[label.replaceAll(" ", "_")] = type === "checkbox" ? value.split(",") : value;
                                                    }

                                                    return (
                                                      <div key={j}>
                                                        {(() => {
                                                          if (
                                                            type == "select"
                                                          ) {
                                                            if (
                                                              leadPermission?.super_admin ||
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "true"
                                                            ) {
                                                              return (
                                                                <FormControl
                                                                  className="form-control my-1"
                                                                  selectList={body.split(
                                                                    ","
                                                                  )}
                                                                  required={
                                                                    field_required ==
                                                                    "yes" &&
                                                                    true
                                                                  }
                                                                  label={Translation(
                                                                    translation,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  control="select3"
                                                                  firstSelect={
                                                                    "--select--"
                                                                  }
                                                                  defaultValue={
                                                                    value
                                                                  }
                                                                />
                                                              );
                                                            } else if (
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "-1"
                                                            ) {
                                                              return (
                                                                <div>
                                                                  <label className="form-label">
                                                                    <b>
                                                                      {" "}
                                                                      {Translation(
                                                                        translation,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          } else if (
                                                            type == "radio"
                                                          ) {
                                                            if (
                                                              leadPermission?.super_admin ||
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "true"
                                                            ) {
                                                              return (
                                                                <FormControl
                                                                  options={body.split(
                                                                    ","
                                                                  )}
                                                                  required={
                                                                    field_required ==
                                                                    "yes" &&
                                                                    true
                                                                  }
                                                                  label={Translation(
                                                                    translation,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  control="radio3"
                                                                  values={value}
                                                                />
                                                              );
                                                            } else if (
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "-1"
                                                            ) {
                                                              return (
                                                                <div>
                                                                  <label className="form-label">
                                                                    <b>
                                                                      {" "}
                                                                      {Translation(
                                                                        translation,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          } else if (
                                                            type == "textarea"
                                                          ) {
                                                            if (
                                                              leadPermission?.super_admin ||
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "true"
                                                            ) {
                                                              return (
                                                                <FormControl
                                                                  className={
                                                                    "form-control my-1"
                                                                  }
                                                                  required={
                                                                    field_required ==
                                                                    "yes" &&
                                                                    true
                                                                  }
                                                                  label={Translation(
                                                                    translation,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  control="textarea3"
                                                                  values={value}
                                                                />
                                                              );
                                                            } else if (
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "-1"
                                                            ) {
                                                              return (
                                                                <div>
                                                                  <label className="form-label">
                                                                    <b>
                                                                      {" "}
                                                                      {Translation(
                                                                        translation,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          } else if (
                                                            type == "checkbox"
                                                          ) {
                                                            if (
                                                              leadPermission?.super_admin ||
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "true"
                                                            ) {
                                                              return (
                                                                <FormControl
                                                                  options={body.split(
                                                                    ","
                                                                  )}
                                                                  required={
                                                                    field_required ==
                                                                    "yes" &&
                                                                    true
                                                                  }
                                                                  label={Translation(
                                                                    translation,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  control="checkbox"
                                                                  values={value.split(
                                                                    ","
                                                                  )}
                                                                />
                                                              );
                                                            } else if (
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "-1"
                                                            ) {
                                                              return (
                                                                <div>
                                                                  <label className="form-label">
                                                                    <b>
                                                                      {" "}
                                                                      {Translation(
                                                                        translation,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          } else if (
                                                            type == "text"
                                                          ) {
                                                            if (
                                                              leadPermission?.super_admin ||
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "true"
                                                            ) {
                                                              return (
                                                                <FormControl
                                                                  className="form-control my-1"
                                                                  required={
                                                                    field_required ==
                                                                    "yes" &&
                                                                    true
                                                                  }
                                                                  label={Translation(
                                                                    translation,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  placeholder={Translation(
                                                                    translation,
                                                                    `${label}`
                                                                  )}
                                                                  control="input"
                                                                  defaultValue={
                                                                    value
                                                                  }
                                                                />
                                                              );
                                                            } else if (
                                                              leadPermission
                                                                ?.prospects
                                                                ?.fields[
                                                              labelName
                                                              ] === "-1"
                                                            ) {
                                                              return (
                                                                <div>
                                                                  <label className="form-label">
                                                                    <b>
                                                                      {" "}
                                                                      {Translation(
                                                                        translation,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          }
                                                        })()}
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </MDBTabsPane>
                                  );
                                })}
                              </MDBTabsContent>
                            </div>
                          ) : (
                            <Skeleton count={5} />
                          )}
                        </MDBTabsPane>
                        {/* <MDBTabsPane show={justifyActive === "tab2"}>
                      <MDBTabs justify className="mb-2 fitContent">
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClickFollowTab("tab1")}
                            active={followUptab === "tab1"}>

                            {Translation(translation, "FollowUp")}
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClickFollowTab("tab2")}
                            active={followUptab === "tab2"}>

                            {Translation(translation, "Meetings")}
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClickFollowTab("tab3")}
                            active={followUptab === "tab3"}>

                            {Translation(translation, "Projects")}
                          </MDBTabsLink>
                        </MDBTabsItem>
                      </MDBTabs>
                      <MDBTabsContent>
                        <MDBTabsPane show={followUptab === 'tab1'}>

                          <div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Calendar")}
                                </h3>
                                <div className="card-options align-item-center">
                                  <Link onClick={(e) => handleFullScreen(e)}
                                    className="card-options-fullscreen">
                                    <i className="fe fe-maximize"></i>
                                  </Link>
                                  <Link
                                    onClick={(e) => handleToggle(e)}
                                    className="card-options-collapse">
                                    <i className={`fe fe-chevron-down`} />
                                  </Link>
                                </div>
                              </div>
                              <div className="card-body">
                                <p>Calendar</p>
                              </div>
                            </div>
                            <div className="card leadCards  card-collapsed ">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Actions")}
                                </h3>
                                <div className="card-options align-item-center">
                                  <Link onClick={(e) => handleFullScreen(e)}
                                    className="card-options-fullscreen">
                                    <i className="fe fe-maximize"></i>
                                  </Link>
                                  <Link
                                    onClick={(e) => handleToggle(e)}
                                    className="card-options-collapse">
                                    <i className={`fe fe-chevron-down`} />
                                  </Link>
                                </div>
                              </div>
                              <div className="card-body">
                                <p>Actions</p>
                              </div>
                            </div>

                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Risks")}
                                </h3>
                                <div className="card-options align-item-center">
                                  <Link onClick={(e) => handleFullScreen(e)}
                                    className="card-options-fullscreen">
                                    <i className="fe fe-maximize"></i>
                                  </Link>
                                  <Link
                                    onClick={(e) => handleToggle(e)}
                                    className="card-options-collapse">
                                    <i className={`fe fe-chevron-down`} />
                                  </Link>
                                </div>
                              </div>
                              <div className="card-body">
                                <p>Risks</p>
                              </div>
                            </div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Decisions")}
                                </h3>
                                <div className="card-options align-item-center">
                                  <Link onClick={(e) => handleFullScreen(e)}
                                    className="card-options-fullscreen">
                                    <i className="fe fe-maximize"></i>
                                  </Link>
                                  <Link
                                    onClick={(e) => handleToggle(e)}
                                    className="card-options-collapse">
                                    <i className={`fe fe-chevron-down`} />
                                  </Link>
                                </div>
                              </div>
                              <div className="card-body">
                                <p>Decisions</p>
                              </div>
                            </div>
                            <div className="card leadCards  card-collapsed">
                              <div className="card-header border-top-0">
                                <h3 className="card-title">
                                  {Translation(translation, "Issues")}
                                </h3>
                                <div className="card-options align-item-center">
                                  <Link onClick={(e) => handleFullScreen(e)}
                                    className="card-options-fullscreen">
                                    <i className="fe fe-maximize"></i>
                                  </Link>
                                  <Link
                                    onClick={(e) => handleToggle(e)}
                                    className="card-options-collapse">
                                    <i className={`fe fe-chevron-down`} />
                                  </Link>
                                </div>
                              </div>
                              <div className="card-body">
                                <p>Issues</p>
                              </div>
                            </div>


                          </div>


                        </MDBTabsPane>
                        <MDBTabsPane show={followUptab === 'tab2'}>

                          <h1>Meetings</h1>


                        </MDBTabsPane>
                        <MDBTabsPane show={followUptab === 'tab3'}>

                          <h1>Projects</h1>


                        </MDBTabsPane>

                      </MDBTabsContent>
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab3"}>
                      {Translation(translation, "Conversation")}
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab4"}>
                      <MDBTabs justify className="mb-2 fitContent">
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClick3("tab1")}
                            active={assettab === "tab1"}>

                            {Translation(translation, "File")}
                          </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <MDBTabsLink
                            onClick={() => handleJustifyClick3("tab2")}
                            active={assettab === "tab2"}>

                            {Translation(translation, "Note")}
                          </MDBTabsLink>
                        </MDBTabsItem>
                      </MDBTabs>
                      <MDBTabsContent>
                        <MDBTabsPane show={assettab === "tab1"}>
                          <div className="card">
                            <div className="card-header">
                              <div className="card-title">
                                {Translation(translation, "Files")}
                              </div>

                              <div className="card-options align-item-center">
                                <Link onClick={(e) => handleFullScreen(e)}
                                  className="card-options-fullscreen">
                                  <i className="fe fe-maximize"></i>
                                </Link>
                                <Link
                                  onClick={(e) => handleToggle(e)}
                                  className="card-options-collapse">
                                  <i className={`fe fe-chevron-down`} />
                                </Link>

                              </div>
                            </div>
                            <div className="row clearfix">
                              <div className="card-body col-sm-4">
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <File
                                      onUpload={setImage2}
                                      label={Translation(
                                        translation,
                                        "Upload File")}

                                      name={"upload_file"} />


                                  </div>
                                  <div className="my-2">
                                    <FormControl
                                      className="form-control my-1"
                                      selectList={follower_select_list}
                                      label={"Followers"}
                                      name="follower_select"
                                      control="select"
                                      firstSelect={'--select--'}
                                      onChange={(e) => setfollowerSelectValue(e.target.value)}>




                                    </FormControl>


                                  </div>
                                  {followerSelectValue == 'Custom' && <div>
                                    <label><b>Choose Follower</b></label>
                                    <Select mode="multiple"
                                      filterOption={true}

                                      onSearch={
                                        (v) => {
                                          onSearchFollower(v);
                                        }}

                                      onChange={(v, v2) => {


                                        let a = v2.map((item) => { return item.key; });
                                        setselectedFollower(a);
                                      }}

                                      style={{ width: 170, height: 40 }}
                                      placeholder={'type follower name'}>


                                      {resowner.data && !resowner.data.message && resowner.data.map(({ uname, id }) =>
                                        <Select.Option value={uname} key={id}>
                                          {uname}
                                        </Select.Option>)}


                                    </Select>
                                  </div>}
                                  {followerSelectValue == 'Role' &&
                                    <div>


                                      <select className="form-control" onChange={(e) => setselectedFollower([e.target.value])}>
                                        <option hidden> --select--</option>
                                        <Role obj={redata?.CEO} />
                                      </select>
                                    </div>}



                                  <div className="my-2">
                                    <label><b>Category</b></label>

                                    <Select mode="multiple"
                                      onChange={(v, v2) => { subbb(v, v2); }}
                                      style={{ width: 170, height: 40 }}
                                      placeholder={'type follower name'}
                                      filterOption={(input, option) =>
                                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}>



                                      {category_select_list.length && category_select_list.map(({ label, value }) =>
                                        <Select.Option value={value} key={value}>
                                          {label}
                                        </Select.Option>)}

                                    </Select>
                                  </div>


                                  <div className="my-2">
                                    <label><b>Sub Category</b></label>

                                    <Select mode="multiple"
                                      onChange={(v) => { setsubCat_selected(v); console.log(v); }}
                                      style={{ width: 170, height: 40 }}
                                      placeholder={'sub category'}
                                      filterOption={(input, option) =>
                                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}>



                                      {subCategoryselect.length && subCategoryselect.map(({ label, value }) =>
                                        <Select.Option value={value} key={value}>
                                          {label}
                                        </Select.Option>)}

                                    </Select>
                                  </div>

                                </div>
                              </div>
                              <div className="col-sm-8 bg-rs">
                                <div className="card-header mt-3">
                                  <div className="card-title">
                                    {Translation(translation, "Files")}
                                  </div>
                                  <div className="card-options"></div>
                                </div>
                                <div className="mt-1">
                                  <ul className="nav nav-tabs b-none p-2 m-0 gap-1">
                                    <li className="">
                                      <button
                                        type="button"
                                        onClick={() => { setassetFileMedia(true); }}

                                        className="btn btn-outline-secondary alfollow active"
                                        id="allfile-tab">

                                        {Translation(translation, "All File")}
                                      </button>
                                    </li>
                                    <li className="">
                                      <button
                                        onClick={() => { setassetFileMedia(false); }}
                                        type="button"
                                        className="btn btn-outline-secondary alfollow"
                                        id="media-tab">

                                        Media
                                      </button>

                                    </li>
                                  </ul>
                                  {!assetsFile ?
                                    <Skeleton count={5} /> :
                                    assetsFile.message != "No Data Found" ?
                                      <div className="table-responsive">
                                        <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0 ">
                                          {assetFileMedia && <thead>
                                            <tr>
                                              <th> </th>
                                              <th>
                                                {Translation(translation, "Name")}
                                              </th>
                                              <th>
                                                {Translation(translation, "Share With")}

                                              </th>
                                              <th>
                                                {Translation(
                                                  translation,
                                                  "Owner")}

                                              </th>
                                              <th>
                                                {Translation(
                                                  translation,
                                                  "Last Update")}

                                              </th>
                                              <th>
                                                {Translation(
                                                  translation,
                                                  "File Size")}

                                              </th>
                                              <th>
                                                {Translation(
                                                  translation,
                                                  "Action")}

                                              </th>
                                            </tr>
                                          </thead>}
                                          <tbody>
                                            {!assetsFile.message && assetsFile.map((item, index) => {
                                              return (

                                                assetFileMedia ? <tr key={index}>
                                                  <td className="width45">
                                                    <i className="fa fa-file-excel-o text-success"></i>
                                                  </td>
                                                  <td>
                                                    <span className="folder-name">
                                                      <a
                                                        href={item.file_value}
                                                        download={item.file_name}>

                                                        {Translation(
                                                          translation,
                                                          `${item.file_name}`)}

                                                      </a>
                                                    </span>
                                                  </td>
                                                  <td>
                                                    {Translation(
                                                      translation,
                                                      `${item.file_name}`)}

                                                  </td>
                                                  <td className="width100">
                                                    <span>
                                                      {" "}
                                                      {Translation(
                                                        translation,
                                                        `${item.file_owner}`)}
                                                      {" "}
                                                    </span>
                                                  </td>
                                                  <td className="width100">
                                                    <span>
                                                      {" "}
                                                      {Monthss(
                                                        item.file_updated_date)}
                                                      {" "}
                                                      {Translation(
                                                        translation,
                                                        "23, 2023")}
                                                      {" "}
                                                    </span>
                                                  </td>
                                                  <td className="width100 text-center">
                                                    <span className="size">
                                                      {Translation(
                                                        translation,
                                                        `${item.file_size}`)}
                                                      {" "}
                                                    </span>
                                                  </td>
                                                  <td className="width100">
                                                    <span>
                                                      <EditLeadAssetEditModal
                                                        item={item}

                                                        follower_select_list={follower_select_list}

                                                        obj={redata?.CEO}
                                                        resowner={resowner} />



                                                      |
                                                      <button
                                                        type="button"
                                                        onClick={() => deleteAssetFile(item)}
                                                        className="text-red filedelete border-0 bg-none">
                                                        {" "}
                                                        <i className="fa fa-trash"></i>{" "}
                                                      </button>
                                                    </span>
                                                  </td>
                                                </tr> :
                                                  <tr key={index}>
                                                    <td className="card card__media p-3 mx-auto col-lg-9 my-3 border" key={index}>
                                                      <a href='#media' className="mb-0">
                                                        <img
                                                          src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                                          alt=""
                                                          className="rounded lazy"
                                                          loading="lazy" />

                                                      </a>
                                                      <div className="d-flex align-items-center px-2 mt-3">
                                                        <img
                                                          className="avatar avatar-md mr-3"
                                                          src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                                          alt="" />

                                                        <div className="mt-2">
                                                          <div>Super Admin</div>
                                                          <small className="d-block text-muted">2 day(s) ago ago</small>
                                                        </div>
                                                      </div>
                                                      <hr />
                                                      <div className="d-flex align-items-center justify-content-between px-2">
                                                        <b>Latitude:0</b>
                                                        <b>Longitude:0</b>
                                                      </div>
                                                    </td>
                                                  </tr>);




                                            })}
                                          </tbody>
                                        </table>
                                      </div> :

                                      " No Data"}

                                </div>
                              </div>
                            </div>
                          </div>
                        </MDBTabsPane>
                        <MDBTabsPane show={assettab === "tab2"}>
                          {assetsnotes.length && assetsnotes?.map((item, index) => {
                            return (
                              <div className="summernote" key={index}>
                                <div className="card blog_single_post">
                                  <div className="card-body">
                                    <p>{item.note_value}</p>
                                  </div>
                                  <div className="card-footer p-2">
                                    <div className="clearfix">
                                      <div className="float-left"><strong>{item.created_time}</strong></div>
                                      <div className="float-right">Posted By <small className="text-muted">{item.f_name + "" + item.l_name + item.email}</small></div>
                                    </div>
                                  </div>
                                </div>
                              </div>);

                          })}
                          <FormControl
                            className="form-control my-1"
                            name="notes"
                            control="textarea3"
                            placeholder={Translation(
                              translation,
                              "Please type what you want...")} />


                          <FormControl
                            options={private_notes}
                            name={"private_note"}
                            control="radio3" />

                        </MDBTabsPane>
                      </MDBTabsContent>
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab5"}>
                      {Translation(translation, "Dashboard")}
                    </MDBTabsPane>
                    {leadPermission?.super_admin || leadPermission.prospects?.fields?.prospects_admininfo == "true" ?
                      <MDBTabsPane show={justifyActive === "tab6"}>
                        <MDBTabs justify className="mb-2 fitContent">
                          <MDBTabsItem>
                            <MDBTabsLink
                              onClick={() => handleJustifyClickAdminTab("tab1")}
                              active={admintab === "tab1"}>

                              {Translation(translation, "overview")}
                            </MDBTabsLink>
                          </MDBTabsItem>
                          <MDBTabsItem>
                            <MDBTabsLink
                              onClick={() => handleJustifyClickAdminTab("tab2")}
                              active={admintab === "tab2"}>

                              {Translation(translation, "Timeline")}

                            </MDBTabsLink>
                          </MDBTabsItem>

                        </MDBTabs>
                        <MDBTabsContent>
                          <MDBTabsPane show={admintab === 'tab1'}>

                            <div>
                              <div className="card">
                                <div className="card-body">
                                  <ul className="list-unstyled">
                                    <li className="mt-4">
                                      <div className="row align-items-center">
                                        {leadPermission?.super_admin || leadPermission.prospects?.fields?.prospects_admin_leadstage_dates == "on" ? <div className="col-auto">
                                          <div className="h5 mb-0">Lead Stage Dates</div>
                                          <table className="table table-bordered mt-2">
                                            <thead>
                                              <tr>
                                                <th>Stage Name</th>
                                                <th>Assigned On</th>
                                                <th>No of Days</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {datas && console.log(datas.overview, "fsd")}
                                              {datas.overview && Object.keys(datas.overview.ProspectStageDates).map((item, index) => {

                                                return (
                                                  <tr key={index}>
                                                    <td>{datas.overview.ProspectStageDates[item].name}</td>
                                                    <td>{datas.overview.ProspectStageDates[item].assign_on}</td>
                                                    <td>{datas.overview.ProspectStageDates[item].days}</td>
                                                  </tr>);

                                              })}
                                            </tbody>
                                          </table>
                                        </div> : <></>}
                                      </div>
                                    </li>
                                    {datas.overview && Object.keys(datas.overview.overView_data).map((item, index) => {
                                      return (
                                        (leadPermission?.super_admin || leadPermission?.prospects?.fields[`prospects_admin_${item.toLowerCase().replaceAll(" ", "_")}`]) &&
                                        <li key={index} className='mb-4'>
                                          <div className="row align-items-center">
                                            <div className="col-auto">
                                              <div className="h5 mb-0">{item}</div>
                                              <span className="small text-muted">{datas.overview.overView_data[item]}</span>
                                            </div>
                                          </div>
                                        </li>);

                                    })}
                                  </ul>
                                </div>
                              </div>

                            </div>


                          </MDBTabsPane>
                          <MDBTabsPane show={admintab === 'tab2'}>


                            <div className="card">
                              <div className="card-body">
                                {datas.timeline.length && datas.timeline.map((val, i) => {
                                  return (
                                    <div className="timeline_item " key={i}>
                                      <img
                                        className="tl_avatar"
                                        src={`https://phpstack-896782-3112616.cloudwaysapps.com/assets/images/system/55a45eb1a93bc957e4ff54e0d9ca3774735875ec.png`}
                                        alt="" />

                                      <span>
                                        <a>
                                          {" "}
                                          {Translation(
                                            translation,
                                            `${val.f_name} ${val.l_name}`)}

                                        </a>{" "}
                                        (`${val.email}`){" "}
                                        <small className="float-right text-right">
                                          {" "}
                                          {val.activity_date_time}{" "}
                                        </small>
                                      </span>
                                      <div className="msg" key={i}>
                                        <div>
                                          {Translation(
                                            translation,
                                            StringConvert(val.activity_value))}


                                        </div>
                                      </div>
                                    </div>);

                                })}

                              </div>
                            </div>

                          </MDBTabsPane>


                        </MDBTabsContent>

                      </MDBTabsPane> : <></>}
                    <MDBTabsPane show={justifyActive === "tab7"}>
                      <div className="card">
                        <div className="card-status bg-blue"></div>
                        <div className="card-header">
                          <h3 className="card-title">
                            <i className="fa fa-users text-muted"></i> Opportunities
                            <small>Let's do business</small>
                          </h3>

                          <div className="card-options">
                            <Link
                              className="card-options-collapse"
                              onClick={(e) => handleToggle(e)}
                              data-toggle="card-collapse">

                              <i className="fe fe-chevron-down"></i>
                            </Link>
                            <Link
                              className="card-options-fullscreen"
                              onClick={(e) => handleFullScreen(e)}
                              data-toggle="card-fullscreen">

                              <i className="fe fe-maximize"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="card-body justify-content-center">
                          <ul className="right_chat list-unstyled p-0">
                            {Array.isArray(opportunityData) && opportunityData.map((v, i) => {
                              return <li className="online mb-2" key={i}>
                                <Link>
                                  <div className="media">
                                    <div className="media-object cust-media-object">
                                      <i className="fa-solid fa-house fa-lg"></i>
                                    </div>

                                    <div className="media-body">
                                      <span className="name">{v.opportunity_title && v.opportunity_title}</span>
                                      <span className="message">{v.opportunity_value && v.opportunity_value}</span>
                                      <span className="message"> &nbsp; | &nbsp;</span>
                                      <span className="message">{v.name && v.name}</span>
                                      <span className="message"> &nbsp; | &nbsp;</span>
                                      <span className="message">{v.forecasted_close_date && v.forecasted_close_date}</span>
                                    </div>
                                  </div>
                                </Link>
                              </li>;
                            })}
                          </ul>
                        </div>
                      </div>

                    </MDBTabsPane> */}
                      </MDBTabsContent>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-sticky-note text-muted"></i> Notes{" "}
                          <small>Notes About the Meeting</small>
                        </h3>

                        <div className="card-options align-item-center">
                          <button
                            type="button"
                            className="btn btn-icon btn-primary btn-success"
                            onClick={() => setPrivateNote(!privateNote)}
                          >
                            {privateNote ? <HiOutlineLockClosed /> : <HiOutlineLockOpen />}
                          </button>
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>

                      <div className="card-body">
                        <CKEditor
                          editor={ClassicEditor}
                          data={content}
                          onChange={handleEditorChange}
                        />

                        <button
                          type="button"
                          className="btn w-100 btn-primary mt-2"
                          onClick={addNote}
                        >
                          Save Note
                        </button>
                        <hr />
                        {Array.isArray(assetsnotes) &&
                          assetsnotes.length &&
                          assetsnotes?.map((item, index) => {
                            return (
                              <div className="summernote" key={index}>
                                <div className="card blog_single_post">
                                  {item.note_privacy === "1" && (
                                    <div className="text-left">
                                      {" "}
                                      <span className="tag tag-danger">
                                        Private Note
                                      </span>{" "}
                                    </div>
                                  )}{" "}
                                  <div className="card-body">
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: item.note_value,
                                      }}
                                    ></p>
                                  </div>
                                  <div className="card-footer p-2">
                                    <div className="clearfix">
                                      <div className="float-left">
                                        <strong>{item.note_date}</strong>
                                      </div>
                                      <div className="float-right">
                                        Posted By{" "}
                                        <small className="text-muted">
                                          {item.f_name +
                                            " " +
                                            item.l_name + " " +
                                            item.email}
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <FaListOl />Projects
                          (#)
                          <small>Working For Them</small>
                        </h3>

                        <div className="card-options align-item-center">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>

                      <div className="card-body">Projects List</div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <BiConversation />{" "}
                          Conversations
                        </h3>

                        <div className="card-options align-item-center">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>

                      <div className="card-body">
                        Web hook to load content in future
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <GoFileSymlinkDirectory /> Files
                          <small>Try to upload file larger than 1 GB</small>
                        </h3>

                        <div className="card-options align-item-center">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="row clearfix">
                          <div className="col-md-12 mb-2">
                            <File
                              onUpload={setImage2}
                              label={Translation(translation, "Upload File")}
                              name={"upload_file"}
                            />
                          </div>
                          <div className="my-2 ">
                            <FormControl
                              className="form-control my-1"
                              selectList={follower_select_list}
                              label={"Followers"}
                              name="follower_select"
                              control="select"
                              firstSelect={"--select--"}
                              onChange={(e) =>
                                setfollowerSelectValue(e.target.value)
                              }
                            ></FormControl>
                          </div>
                          {followerSelectValue == "Custom" && (
                            <div>
                              <label>
                                <b>Choose Follower</b>
                              </label>
                              <Select
                                mode="multiple"
                                filterOption={true}
                                onSearch={(v) => {
                                  onSearchFollower(v);
                                }}
                                onChange={(v, v2) => {
                                  let a = v2.map((item) => {
                                    return item.key;
                                  });
                                  setselectedFollower(a);
                                }}
                                style={{ width: 170, height: 40 }}
                                placeholder={"type follower name"}
                              >
                                {resowner.data &&
                                  !resowner.data.message &&
                                  resowner.data.map(({ uname, id, text }) => (
                                    <Select.Option value={uname} key={id}>
                                      {uname}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </div>
                          )}
                          {followerSelectValue == "Role" && (
                            <div>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setselectedFollower([e.target.value])
                                }
                              >
                                <option hidden> --select--</option>
                                <Role obj={redata?.CEO} />
                              </select>
                            </div>
                          )}

                          <div className="my-2">
                            <label>
                              <b>Category</b>
                            </label>

                            <Select
                              mode="multiple"
                              onChange={(v, v2) => {
                                subbb(v, v2);
                              }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={"type follower name"}
                              filterOption={(input, option) =>
                                (option?.children ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {category_select_list.length &&
                                category_select_list.map(({ label, value }) => (
                                  <Select.Option value={value} key={value}>
                                    {label}
                                  </Select.Option>
                                ))}
                            </Select>
                          </div>

                          <div className="my-2">
                            <label>
                              <b>Sub Category</b>
                            </label>

                            <Select
                              mode="multiple"
                              onChange={(v) => {
                                setsubCat_selected(v);
                                console.log(v);
                              }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={"sub category"}
                              filterOption={(input, option) =>
                                (option?.children ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {subCategoryselect.length &&
                                subCategoryselect.map(({ label, value }) => (
                                  <Select.Option value={value} key={value}>
                                    {label}
                                  </Select.Option>
                                ))}
                            </Select>
                          </div>
                        </div>
                        {!assetsFile ? (
                          <Skeleton count={5} />
                        ) : assetsFile.message != "No Data Found" ? (
                          <div className="table-responsive">
                            <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0 ">
                              {assetFileMedia && (
                                <thead>
                                  <tr>
                                    <th> </th>
                                    <th>{Translation(translation, "Name")}</th>
                                    <th>
                                      {Translation(translation, "Share With")}
                                    </th>
                                    <th>{Translation(translation, "Owner")}</th>
                                    <th>
                                      {Translation(translation, "Last Update")}
                                    </th>
                                    <th>
                                      {Translation(translation, "File Size")}
                                    </th>
                                    <th>
                                      {Translation(translation, "Action")}
                                    </th>
                                  </tr>
                                </thead>
                              )}
                              <tbody>
                                {!assetsFile.message &&
                                  assetsFile.map((item, index) => {
                                    return assetFileMedia ? (
                                      <tr key={index}>
                                        <td className="width45">
                                          <i className="fa fa-file-excel-o text-success"></i>
                                        </td>
                                        <td>
                                          <span className="folder-name">
                                            <a
                                              href={item.file_value}
                                              download={item.file_name}
                                            >
                                              {Translation(
                                                translation,
                                                `${item.file_name}`
                                              )}
                                            </a>
                                          </span>
                                        </td>
                                        <td>
                                          {Translation(
                                            translation,
                                            `${item.file_name}`
                                          )}
                                        </td>
                                        <td className="width100">
                                          <span>
                                            {" "}
                                            {Translation(
                                              translation,
                                              `${item.file_owner}`
                                            )}{" "}
                                          </span>
                                        </td>
                                        <td className="width100">
                                          <span>
                                            {" "}
                                            {Monthss(
                                              item.file_updated_date
                                            )}{" "}
                                            {Translation(
                                              translation,
                                              "23, 2023"
                                            )}{" "}
                                          </span>
                                        </td>
                                        <td className="width100 text-center">
                                          <span className="size">
                                            {Translation(
                                              translation,
                                              `${item.file_size}`
                                            )}{" "}
                                          </span>
                                        </td>
                                        <td className="width100">
                                          <span>
                                            <EditLeadAssetEditModal
                                              item={item}
                                              follower_select_list={
                                                follower_select_list
                                              }
                                              obj={redata?.CEO}
                                              resowner={resowner}
                                            />
                                            |
                                            <button
                                              type="button"
                                              onClick={() =>
                                                deleteAssetFile(item)
                                              }
                                              className="text-red filedelete border-0 bg-none"
                                            >
                                              {" "}
                                              <i className="fa fa-trash"></i>{" "}
                                            </button>
                                          </span>
                                        </td>
                                      </tr>
                                    ) : (
                                      <tr key={index}>
                                        <td
                                          className="card card__media p-3 mx-auto col-lg-9 my-3 border"
                                          key={index}
                                        >
                                          <a href="#media" className="mb-0">
                                            <img
                                              src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                              alt=""
                                              className="rounded lazy"
                                              loading="lazy"
                                            />
                                          </a>
                                          <div className="d-flex align-items-center px-2 mt-3">
                                            <img
                                              className="avatar avatar-md mr-3"
                                              src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                              alt=""
                                            />
                                            <div className="mt-2">
                                              <div>Super Admin</div>
                                              <small className="d-block text-muted">
                                                2 day(s) ago ago
                                              </small>
                                            </div>
                                          </div>
                                          <hr />
                                          <div className="d-flex align-items-center justify-content-between px-2">
                                            <b>Latitude:0</b>
                                            <b>Longitude:0</b>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          " No Data"
                        )}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          {" "}
                          {Translation(translation, "Correlations")}{" "}
                        </h3>

                        <div className="card-options align-item-center">
                          <Link
                            onClick={() => {
                              addCorrelation();
                            }}
                            className="p-1 py-0 fs-3"
                          >
                            +
                          </Link>
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>

                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        {correlArr &&
                          correlArr.map((val, i) => {
                            return (
                              <div
                                className="row  my-2 border bg-light p-2 rounded"
                                key={i}
                              >
                                <select
                                  onChange={(event) =>
                                    handleCorrValue(
                                      i,
                                      event.target.value,
                                      event.target.options[
                                        event.target.selectedIndex
                                      ].text
                                    )
                                  }
                                  name="correlations[]"
                                  className="form-control mb-2"
                                >
                                  {getAllCorrelationsLead2 &&
                                    !getAllCorrelationsLead2.message &&
                                    getAllCorrelationsLead2.corelations.map(
                                      (item, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={item.corr_id}
                                          >
                                            {item.corr_title}
                                          </option>
                                        );
                                      }
                                    )}
                                </select>
                                <div className="col-md-12 my-3">
                                  <div
                                    ref={ownerRef1}
                                    className="searchDropDown"
                                  >
                                    <input
                                      type="text"
                                      className="form-control"
                                      ref={inputElement1}
                                      name="contact_owner"
                                      value={val.value}
                                      onChange={(e) =>
                                        handleCorrValue2(
                                          i,
                                          e.target.value,
                                          val.id
                                        )
                                      }
                                    />
                                    <button
                                      className="nav-link clickButton"
                                      type="button"
                                      id="dropdownMenuButton"
                                      onClick={(e) => handleList1(e, val.id)}
                                    >
                                      <FaSearch />
                                    </button>
                                  </div>
                                  <div
                                    className={`dropDownCustom ${modalStates[val.id] && "active"
                                      }`}
                                  >
                                    {resowner1.data && (
                                      <ul className="list">
                                        {resowner1.isLoading ? (
                                          ""
                                        ) : !resowner1.data.message ? (
                                          resowner1.data !==
                                          "No match found!" &&
                                          resowner1.filter((v) => v.id != id)
                                            .data.map((item, index) => {
                                              // console.log(i)
                                              return (
                                                <li
                                                  key={index}
                                                  onClick={(e) =>
                                                    handleClick1(i, item, val.id)
                                                  }
                                                >
                                                  <small>
                                                    <p className="p-0 m-0">
                                                      {Translation(
                                                        translation,
                                                        `${item.fullname}`
                                                      )}
                                                    </p>
                                                    <p className="p-0 m-0">
                                                      {" "}
                                                      {Translation(
                                                        translation,
                                                        `(${item.email})`
                                                      )}
                                                    </p>
                                                  </small>
                                                </li>
                                              );
                                            })
                                        ) : (
                                          <li>
                                            {Translation(
                                              translation,
                                              `${resowner1.data.message}`
                                            )}
                                          </li>
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                  <input
                                    type="hidden"
                                    name={"owner"}
                                    value={ownerhidden1}
                                  />
                                </div>

                                {correlArr.length > 1 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      delCorrelation(val, i);
                                    }}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        {
                          <button
                            onClick={() => UpdateCorrelation()}
                            type="button"
                            className="btn w-100 btn-primary"
                          >
                            Add Correlation
                          </button>
                        }
                        <div className="card-body p-1 mt-2">
                          <ul className="right_chat list-unstyled p-0">
                            {correlationView &&
                              correlationView.map((item, index) => {
                                return (
                                  <li key={index} className="online mb-2">
                                    <Link
                                      to={
                                        item.module &&
                                        `/${config.ddemoss
                                        }${item.module.toLowerCase()}/view/${item.correlation_lead_user
                                        }`
                                      }
                                    >
                                      <div className="media">
                                        <img
                                          className="media-object "
                                          src={item?.avatar.includes(`http`) ? item?.avatar : `${config.baseurl2}${item?.avatar}`}
                                          alt=""
                                        />
                                        <div className="media-body">
                                          <span className="name">
                                            {Translation(
                                              translation,
                                              item.corr_title
                                            )}
                                          </span>
                                          <span className="message">
                                            {Translation(
                                              translation,
                                              item.leaduser
                                            )}
                                          </span>
                                          <span className="badge badge-outline status" />
                                        </div>
                                      </div>
                                    </Link>
                                    <span className="correl_cross" onClick={() => { handle_delete_corr(item) }}> <RxCross2 /></span>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="card leadCards">
                      <div className="card-header">
                        <h3 className="card-title">
                          {Translation(translation, "Followers")}
                        </h3>
                        <div className="card-options align-item-center">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body p-2">
                        <div className="mb-2">
                          <Select
                            mode="multiple"
                            filterOption={true}
                            onSearch={(v) => {
                              onSearchFollowerAdd(v);
                            }}
                            onChange={(v1, v2) => {
                              let selectedFollowerId = v2.map((item) => {
                                return item.key;
                              });
                              setAddselectedFollower(v2);
                            }}
                            style={{ width: "100%", height: 40 }}
                            placeholder={"Search follower name"}
                          >
                            {addFollower.length &&
                              addFollower.map(({ uname, id, text }) => (
                                <Select.Option value={uname} key={id}>
                                  {uname}
                                </Select.Option>
                              ))}
                          </Select>
                        </div>
                        <button
                          type="button"
                          className="my-2 btn w-100 btn-primary"
                          onClick={() => {
                            updateAddFollower();
                          }}
                        >
                          Update Follower
                        </button>
                        <div className="">
                          {previousFollower &&
                            previousFollower.map((v, i) => {
                              if (v) {
                                return (
                                  <div className="chip my-2" key={i}>
                                    <span
                                      className="avatar"
                                      style={{
                                        backgroundImage: `url(${v.avatar})`,
                                      }}
                                    ></span>

                                    <div className="d-flex align-item-center">
                                      <span>{v.uname}</span>
                                      <a
                                        className="btnunfollow"
                                        data-follow="14"
                                        onClick={() => {
                                          delAddFollower(v);
                                        }}
                                      >
                                        <i className="fe fe-x"></i>
                                      </a>
                                    </div>
                                  </div>
                                );
                              }
                              // console.log(previousFollower[v]);
                            })}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-tag text-muted"></i> Tags
                          <small> </small>
                        </h3>

                        <div className="card-options align-item-center">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              {leadPermission?.super_admin ||
                                leadPermission?.leads?.fields?.leads_tags ===
                                "true" ? (
                                <div className="card-body">
                                  <div className="row tagss">
                                    <Select
                                      mode="tags"
                                      style={{
                                        width: "100%",
                                        height: "100px",
                                      }}
                                      onSearch={(v) => {
                                        onSearchTag(v);
                                      }}
                                      value={selectTag}
                                      placeholder="Tags"
                                      onChange={(v1, v2) => {
                                        setselectTag(v1);
                                      }}
                                      options={tagoption && tagoption}
                                    />
                                  </div>
                                </div>
                              ) : leadPermission?.leads?.fields?.leads_tags ===
                                "-1" ? (
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        {datas.prospects_data[0].tags}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <FaRegCalendarAlt /> Calendar
                          <small>Detail Over Time</small>
                        </h3>

                        <div className="card-options">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        Here we will have a calendar showing:
                        <br />
                        Created Date
                        <br />
                        Actives
                        <br />
                        Follow Ups
                        <br />
                        Meeting
                        <br />
                        Projects Dates
                        <br />
                        Date of Opportunity Creation
                        <br />
                        Date of Stage Changes
                        <br />
                        Date of Forecast Closed Date (opportunities)
                        <br />
                      </div>
                    </div>
                    {editLead.prospects_data[0] && (
                      <div className="card">
                        <div className="card-status bg-blue"></div>
                        <div className="card-header">
                          <h3 className="card-title">
                            <FaMoneyBillAlt />{" "}
                            Opportunities
                            <small>Let's do business</small>
                          </h3>

                          <div className="card-options">
                            <Link
                              className="card-options-collapse"
                              onClick={(e) => handleToggle(e)}
                              data-toggle="card-collapse"
                            >
                              <i className="fe fe-chevron-down"></i>
                            </Link>
                            <Link
                              className="card-options-fullscreen"
                              onClick={(e) => handleFullScreen(e)}
                              data-toggle="card-fullscreen"
                            >
                              <i className="fe fe-maximize"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="card-body justify-content-center">
                          <ul className="right_chat list-unstyled p-0">
                            {Array.isArray(opportunityData) ? (
                              opportunityData.map((v, i) => {
                                return (
                                  <li className="online mb-2" key={i}>
                                    <Link
                                      to={`/${config.ddemoss}opp_pipelines/edit/${v.op_id}`}
                                    >
                                      <div className="media">
                                        <div className="media-object cust-media-object">
                                          <i className="fa-solid fa-house fa-lg"></i>
                                        </div>

                                        <div className="media-body">
                                          <span className="name">
                                            {v.opportunity_title &&
                                              v.opportunity_title}
                                          </span>
                                          <span className="message">
                                            {v.opportunity_value &&
                                              v.opportunity_value}
                                          </span>
                                          <span className="message">
                                            {" "}
                                            &nbsp; | &nbsp;
                                          </span>
                                          <span className="message">
                                            {v.name && v.name}
                                          </span>
                                          <span className="message">
                                            {" "}
                                            &nbsp; | &nbsp;
                                          </span>
                                          <span className="message">
                                            {v.forecasted_close_date &&
                                              v.forecasted_close_date}
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })
                            ) : (
                              <>no data</>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <BsFillBookmarkFill />{" "}
                          Actions <small> </small>
                        </h3>

                        <div className="card-options">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        {Array.isArray(actionArr) &&
                          actionArr.map((val, i) => {
                            return (
                              <div className="row clearfix" key={i}>
                                <div className="col-lg-1 col-md-2">
                                  <div className="dropdown">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <b className="relative calendarvalb">
                                        <i className="fe fe-calendar"></i>
                                        <input
                                          className="calendarval"
                                          type="date"
                                        />
                                      </b>
                                    </button>

                                    <div className="dropdown-menu">
                                      <div className="inline-datepicker"></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-5 col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="example-text-input"
                                      placeholder="What do you need to get done?"
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-2 col-md-2">
                                  <div className="form-group multiselect_div">
                                    <select
                                      id="single-selection"
                                      name="single_selection"
                                      className="multiselect multiselect-custom form-control"
                                    >
                                      <option value="Call">Call</option>

                                      <option value="Follow Up">
                                        Follow Up
                                      </option>

                                      <option value="Meeting">Meeting</option>

                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-2 col-md-2">
                                  <div className="form-group multiselect_div">
                                    <select
                                      id="single-selection"
                                      name="single_selection"
                                      className="multiselect multiselect-custom form-control"
                                    >
                                      <option value="Low">Low</option>

                                      <option value="Medium">Medium</option>

                                      <option value="High">High</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-1 col-md-2">
                                  <img
                                    className="avatar"
                                    src="https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"
                                  />
                                </div>

                                <div className="col-lg-1 col-md-2">
                                  {val.deleteBtn ? (
                                    <button
                                      type="button"
                                      className="btn btn-icon btn-primary btn-success"
                                      onClick={() => {
                                        handleRemoveActionRow(val);
                                      }}
                                    >
                                      <i className="fe fe-minus"></i>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-icon btn-primary btn-success"
                                      onClick={() => {
                                        handleAddActionRow(val);
                                      }}
                                    >
                                      <i className="fe fe-plus"></i>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <FaHandshake />{" "}
                          Meetings <small> </small>
                        </h3>

                        <div className="card-options">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        {Array.isArray(meetingArr) &&
                          meetingArr.map((val, i) => {
                            return (
                              <div className="row clearfix" key={i}>
                                <div className="col-lg-1 col-md-2">
                                  <div className="dropdown">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <b className="relative calendarvalb">
                                        <i className="fe fe-calendar"></i>
                                        <input
                                          className="calendarval"
                                          type="date"
                                        />
                                      </b>
                                    </button>

                                    <div className="dropdown-menu">
                                      <div className="inline-datepicker"></div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-lg-5 col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="example-text-input"
                                      placeholder="What do you need to get done?"
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-2 col-md-2">
                                  <div className="form-group multiselect_div">
                                    <select
                                      id="single-selection"
                                      name="single_selection"
                                      className="multiselect multiselect-custom form-control"
                                    >
                                      <option value="Call">Call</option>

                                      <option value="Follow Up">
                                        Follow Up
                                      </option>

                                      <option value="Meeting">Meeting</option>

                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-2 col-md-2">
                                  <div className="form-group multiselect_div">
                                    <select
                                      id="single-selection"
                                      name="single_selection"
                                      className="multiselect multiselect-custom form-control"
                                    >
                                      <option value="Low">Low</option>

                                      <option value="Medium">Medium</option>

                                      <option value="High">High</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-1 col-md-2">
                                  <img
                                    className="avatar"
                                    src="https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"
                                  />
                                </div>

                                <div className="col-lg-1 col-md-2">
                                  {val.deleteBtn ? (
                                    <button
                                      type="button"
                                      className="btn btn-icon btn-primary btn-success"
                                      onClick={() => {
                                        handleRemoveMeetingRow(val);
                                      }}
                                    >
                                      <i className="fe fe-minus"></i>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-icon btn-primary btn-success"
                                      onClick={() => {
                                        handleAddMeetingRow(val);
                                      }}
                                    >
                                      <i className="fe fe-plus"></i>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <FaFolder />{" "}
                          Media <small> </small>
                        </h3>

                        <div className="card-options">
                          <Link
                            className="card-options-collapse"
                            onClick={(e) => handleToggle(e)}
                            data-toggle="card-collapse"
                          >
                            <i className="fe fe-chevron-down"></i>
                          </Link>
                          <Link
                            className="card-options-fullscreen"
                            onClick={(e) => handleFullScreen(e)}
                            data-toggle="card-fullscreen"
                          >
                            <i className="fe fe-maximize"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row clearfix">
                          <div className="col-md-12 mb-2">
                            <File
                              // onUpload={setImage2}
                              label={Translation(translation, "Upload File")}
                              name={"upload_file2"}
                            />
                          </div>
                          <div className="my-2 ">
                            <FormControl
                              className="form-control my-1"
                              selectList={follower_select_list}
                              label={"Followers"}
                              name="follower_select2"
                              control="select"
                              firstSelect={"--select--"}
                            // onChange={(e) =>
                            //   setfollowerSelectValue(e.target.value)
                            // }
                            ></FormControl>
                          </div>
                          {followerSelectValue == "Custom" && (
                            <div>
                              <label>
                                <b>Choose Follower</b>
                              </label>
                              <Select
                                mode="multiple"
                                filterOption={true}
                                onSearch={(v) => {
                                  onSearchFollower(v);
                                }}
                                // onChange={(v, v2) => {
                                //   let a = v2.map((item) => {
                                //     return item.key;
                                //   });
                                //   setselectedFollower(a);
                                // }}
                                style={{ width: 170, height: 40 }}
                                placeholder={"type follower name"}
                              >
                                {resowner.data &&
                                  !resowner.data.message &&
                                  resowner.data.map(({ uname, id, text }) => (
                                    <Select.Option value={uname} key={id}>
                                      {uname}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </div>
                          )}
                          {followerSelectValue == "Role" && (
                            <div>
                              <select
                                className="form-control"
                              // onChange={(e) =>
                              //   setselectedFollower([e.target.value])
                              // }
                              >
                                <option hidden> --select--</option>
                                <Role obj={redata?.CEO} />
                              </select>
                            </div>
                          )}

                          <div className="my-2">
                            <label>
                              <b>Category</b>
                            </label>

                            <Select
                              mode="multiple"
                              // onChange={(v, v2) => {
                              //   subbb(v, v2);
                              // }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={"type follower name"}
                              filterOption={(input, option) =>
                                (option?.children ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {category_select_list.length &&
                                category_select_list.map(({ label, value }) => (
                                  <Select.Option value={value} key={value}>
                                    {label}
                                  </Select.Option>
                                ))}
                            </Select>
                          </div>

                          <div className="my-2">
                            <label>
                              <b>Sub Category</b>
                            </label>

                            <Select
                              mode="multiple"
                              onChange={(v) => {
                                setsubCat_selected(v);
                                console.log(v);
                              }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={"sub category"}
                              filterOption={(input, option) =>
                                (option?.children ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {subCategoryselect.length &&
                                subCategoryselect.map(({ label, value }) => (
                                  <Select.Option value={value} key={value}>
                                    {label}
                                  </Select.Option>
                                ))}
                            </Select>
                          </div>
                        </div>
                        {!assetsFile ? (
                          <Skeleton count={5} />
                        ) : assetsFile.message != "No Data Found" ? (
                          <div className="table-responsive">
                            <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0 ">
                              {assetFileMedia && (
                                <thead>
                                  <tr>
                                    <th> </th>
                                    <th>{Translation(translation, "Name")}</th>
                                    <th>
                                      {Translation(translation, "Share With")}
                                    </th>
                                    <th>{Translation(translation, "Owner")}</th>
                                    <th>
                                      {Translation(translation, "Last Update")}
                                    </th>
                                    <th>
                                      {Translation(translation, "File Size")}
                                    </th>
                                    <th>
                                      {Translation(translation, "Action")}
                                    </th>
                                  </tr>
                                </thead>
                              )}
                              <tbody>
                                {!assetsFile.message &&
                                  assetsFile.map((item, index) => {
                                    return assetFileMedia ? (
                                      <tr key={index}>
                                        <td className="width45">
                                          <i className="fa fa-file-excel-o text-success"></i>
                                        </td>
                                        <td>
                                          <span className="folder-name">
                                            <a
                                              href={item.file_value}
                                              download={item.file_name}
                                            >
                                              {Translation(
                                                translation,
                                                `${item.file_name}`
                                              )}
                                            </a>
                                          </span>
                                        </td>
                                        <td>
                                          {Translation(
                                            translation,
                                            `${item.file_name}`
                                          )}
                                        </td>
                                        <td className="width100">
                                          <span>
                                            {" "}
                                            {Translation(
                                              translation,
                                              `${item.file_owner}`
                                            )}{" "}
                                          </span>
                                        </td>
                                        <td className="width100">
                                          <span>
                                            {" "}
                                            {Monthss(
                                              item.file_updated_date
                                            )}{" "}
                                            {Translation(
                                              translation,
                                              "23, 2023"
                                            )}{" "}
                                          </span>
                                        </td>
                                        <td className="width100 text-center">
                                          <span className="size">
                                            {Translation(
                                              translation,
                                              `${item.file_size}`
                                            )}{" "}
                                          </span>
                                        </td>
                                        <td className="width100">
                                          <span>
                                            <EditLeadAssetEditModal
                                              item={item}
                                              follower_select_list={
                                                follower_select_list
                                              }
                                              obj={redata?.CEO}
                                              resowner={resowner}
                                            />
                                            |
                                            <button
                                              type="button"
                                              onClick={() =>
                                                deleteAssetFile(item)
                                              }
                                              className="text-red filedelete border-0 bg-none"
                                            >
                                              {" "}
                                              <i className="fa fa-trash"></i>{" "}
                                            </button>
                                          </span>
                                        </td>
                                      </tr>
                                    ) : (
                                      <tr key={index}>
                                        <td
                                          className="card card__media p-3 mx-auto col-lg-9 my-3 border"
                                          key={index}
                                        >
                                          <a href="#media" className="mb-0">
                                            <img
                                              src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                              alt=""
                                              className="rounded lazy"
                                              loading="lazy"
                                            />
                                          </a>
                                          <div className="d-flex align-items-center px-2 mt-3">
                                            <img
                                              className="avatar avatar-md mr-3"
                                              src="https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg"
                                              alt=""
                                            />
                                            <div className="mt-2">
                                              <div>Super Admin</div>
                                              <small className="d-block text-muted">
                                                2 day(s) ago ago
                                              </small>
                                            </div>
                                          </div>
                                          <hr />
                                          <div className="d-flex align-items-center justify-content-between px-2">
                                            <b>Latitude:0</b>
                                            <b>Longitude:0</b>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          " No Data"
                        )}
                      </div>
                    </div>
                    {(leadPermission?.super_admin ||
                      leadPermission?.prospects?.fields?.prospects_admininfo ===
                      "true") && (
                        <div className="card">
                          <div className="card-status bg-blue"></div>
                          <div className="card-header">
                            <h3 className="card-title">
                              <CiLock />{" "}
                              Admin <small>Admin &amp; Timeline</small>
                            </h3>

                            <div className="card-options">
                              <Link
                                className="card-options-collapse"
                                onClick={(e) => handleToggle(e)}
                                data-toggle="card-collapse"
                              >
                                <i className="fe fe-chevron-down"></i>
                              </Link>
                              <Link
                                className="card-options-fullscreen"
                                onClick={(e) => handleFullScreen(e)}
                                data-toggle="card-fullscreen"
                              >
                                <i className="fe fe-maximize"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="card-body">
                            <MDBTabs className="page-header-tab">
                              <MDBTabsItem>
                                <MDBTabsLink
                                  onClick={() => handleJustifyClick4(`tab1`)}
                                  active={justifyActive3 === "tab1"}
                                >
                                  Overview
                                </MDBTabsLink>
                              </MDBTabsItem>
                              <MDBTabsItem>
                                <MDBTabsLink
                                  onClick={() => handleJustifyClick4(`tab2`)}
                                  active={justifyActive3 === `tab2`}
                                >
                                  Timeline
                                </MDBTabsLink>
                              </MDBTabsItem>
                            </MDBTabs>
                            <MDBTabsContent>
                              <MDBTabsPane show={justifyActive3 === "tab1"}>
                                <div className="card">
                                  <div className="card-body">

                                    {(admin_overview_data) && <ul className="list-unstyled">
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields?.prospects_admin_created_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Created Date`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Created_Date
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields?.prospects_admin_updated_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Updated Date`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Updated_Date
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }

                                      <li className="mt-4">
                                        <div className="row align-items-center">
                                          {(leadPermission?.super_admin ||
                                            leadPermission?.prospects?.fields[
                                            `prospects_admin_leadstage_dates`
                                            ]) && (
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  Prospect Stage Dates
                                                </div>
                                                <table className="table table-bordered mt-2">
                                                  <thead>
                                                    <tr>
                                                      <th>Stage Name</th>
                                                      <th>Assigned On</th>
                                                      <th>No of Days</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {Array.isArray(admin_overview_data?.LeadStageDates) &&
                                                      (
                                                        admin_overview_data
                                                          ?.LeadStageDates
                                                      ).map((item, index) => {
                                                        return (
                                                          <tr key={index}>
                                                            <td>
                                                              {

                                                                item
                                                                  .name
                                                              }
                                                            </td>
                                                            <td>
                                                              <HandleConvertTimeOnlyDate
                                                                dateAndTime={item?.assign_on}
                                                              />
                                                            </td>
                                                            <td>
                                                              {

                                                                item
                                                                  .days
                                                              }
                                                            </td>
                                                          </tr>
                                                        );
                                                      })}
                                                  </tbody>
                                                </table>
                                              </div>
                                            )}
                                        </div>
                                      </li>

                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_qualification_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Qualification Date`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Qualification_Date
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_qualification_owner) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Qualification Owner`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    admin_overview_data
                                                      ?.OverView[`Qualification User`]
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_contacted_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Contacted Date`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Contacted_Date
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_dealfirst_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Date Created for First Deal`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Date_Created_for_First_Deal
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_prospect_lost_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Prospect Lost Date`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Prospect_Lost_Date
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_prospect_lost_owner) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Prospect Lost Owner`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    admin_overview_data
                                                      ?.OverView[`Prospect Lost Owner`
                                                    ]
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }

                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_unqualified_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Unqualified Date`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Unqualified_Date
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_unqualified_owner) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Unqualified Owner`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    admin_overview_data
                                                      ?.OverView[`Unqualified Owner`
                                                    ]
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_validation_date) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Validation Date`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    Validation_Date
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }
                                      {admin_overview_data && ((leadPermission?.super_admin ||
                                        leadPermission?.prospects?.fields.prospects_admin_validation_owner) && (
                                          <li
                                            className="mb-4"
                                          >
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  {`Validation Owner`}
                                                </div>
                                                <span className="small text-muted">
                                                  {
                                                    admin_overview_data
                                                      ?.OverView[`Validation Owner`
                                                    ]
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                          </li>
                                        ))

                                      }

                                      {/* {datas.overview.OverView &&
                                      Object.keys(
                                        datas.overview.OverView
                                      ).map((item, index) => {
                                        return (
                                          (leadPermission?.super_admin ||
                                            leadPermission?.prospects?.fields[
                                              `prospects_admin_${item
                                                .toLowerCase()
                                                .replaceAll(" ", "_")}`
                                            ]==="on") && (
                                            <li key={index} className="mb-4">
                                            
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {item}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {
                                                      datas.overview
                                                        .OverView[item]
                                                    }
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )
                                        );
                                      })} */}
                                    </ul>}
                                  </div>
                                </div>
                              </MDBTabsPane>
                              <MDBTabsPane show={justifyActive3 === "tab2"}>
                                <div className="card">
                                  <div className="card-body">
                                    {admin_timeline_data &&
                                      !admin_timeline_data.message &&
                                      admin_timeline_data.map((item, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="timeline_item "
                                          >
                                            <img
                                              className="tl_avatar"
                                              src={item.avatar}
                                              alt=""
                                            />
                                            <span>
                                              <a>
                                                {Translation(
                                                  translation,
                                                  `${item.f_name} ${item.l_name} `
                                                )}
                                              </a>
                                              {`(${item.email})`}
                                              <small className="float-right text-right">
                                                {item.activity_date_time}
                                              </small>
                                            </span>
                                            <div className="msg">
                                              <div>
                                                {Translation(
                                                  translation,
                                                  StringConvert(
                                                    item.activity_value
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </MDBTabsPane>
                            </MDBTabsContent>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="text-right mt-5 update_button_lead">
                <SubmitButton
                  props={submitbutton}
                  buttonLoading={res.isLoading}
                />
              </div>
            </div>
          </Form>
        </Formik>
      </>
    )
  );
}

export default EditPendingProspect;
