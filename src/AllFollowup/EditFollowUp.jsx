import React, { useContext, useEffect, useState, useRef } from "react";
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
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import SubmitButton from "../components/SubmitButton";
import usePost from "../customHooks/usePost";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import $ from "jquery";
import { GoFileSymlinkDirectory } from "react-icons/go";
import dayjs from "dayjs";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import File from "../components/form/File";
import { Monthss } from "../components/Month";
import { FaSearch } from "react-icons/fa";
import { Translation } from "../components/Translation";
import swal from "sweetalert";
import { Select } from "antd";
import { StringConvert } from "../components/StringConvert";
// import datasAssetEditModal from "./EditAllpipelinesAssetModal";
import Role from "../components/Role";
import { toast } from "react-toastify";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import moment from 'moment';
import { FaFolder, } from "react-icons/fa";
import EditLeadAssetEditModal from "../Lead/EditLeadAssetEditModal";
import CreateCustomEvent from "../Calendar/CreateCustomEvent";
import EditNotificationModal from "./EditNotificationModal";
import Media_image_display from "../Lead/Media_image_display";

function EditFollowUp({ translation }) {
  const { id } = useParams();
  const [settagValu] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [actioned, setActioned] = useState('');
  const [res4, apiMethod4] = usePost();
  const [resTypeValue, apiMethodTypeValue] = usePost();
  const [resPipelineValue, apiMethodPipelineValue] = usePost();
  const [ActionVal, setActionVal] = useState("");
  const [resPostCategory, apiMethodPostCategory] = usePost();
  const [resAddNote, apiMethodAddNote] = usePost();
  const [opportunityStageList, setOpportunityStageList] = useState("");
  const [assetsnotes, setAssetsNotes] = useState("");
  const [resowner, apiMethodowner] = usePost();
  const [resowner2, apiMethodowner2] = usePost();
  const [resStage, apiMethodStage] = usePost();
  const [resLostReason, apiMethodLostReason] = usePost();
  const [resAddFollower, apiMethodAddFollower] = usePost();
  const [resAddContact, apiMethodAddContact] = usePost();
  const [resUpdateAddFollower, apiMethodupdateAddFollower] = usePost();
  const [resAction, apiMethodAction] = usePost();
  const [addMemberList, apiMethodAddMemberList] = usePost();
  const [resDeleteAsset, apiMethodDeleteAsset] = usePost();
  const [ownerhidden, setOwnerhidden] = useState("");
  const [ownerhidden2, setOwnerhidden2] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [listOpen2, setListOpen2] = useState(false);
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [apiMethodDelAssign] = usePost();
  const [apiMethodpostLeadAssign] = usePost();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [assettab, setAssettab] = useState("tab1");
  const [followUptab, setfollowUptab] = useState("tab1");
  const [admintab, setAdmintab] = useState("tab1");
  const [datasFeild, setdatasFeild] = useState("");
  const [image2, setImage2] = useState(false);
  const inputElement = useRef();
  const ownerRef = useRef(null);
  const [defaultValue, setDefaultValue] = useState('')
  const [searchval, setSearchval] = useState("");
  const [searchval2, setSearchval2] = useState("");
  const [followerSelectValue, setfollowerSelectValue] = useState(false);
  const [selectedFollower, setselectedFollower] = useState([]);
  const [category, setcategory] = useState([]);
  const [addFollower, setAddfollower] = useState([]);
  const [addContact, setAddContact] = useState([]);
  const [selectFollower, setSelectFollower] = useState([]);
  const [selectMember, setSelectMember] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [subCat_selected, setsubCat_selected] = useState([]);
  const [subCategoryselect, setsubCategoryselect] = useState([]);
  const [assetFileMedia, setassetFileMedia] = useState(true);
  const [assignLeadName, setassignLeadName] = useState(false);
  const [selectTag, setselectTag] = useState([]);
  const [lostReason, setlostReason] = useState(false);
  const [category_select_list, setCategory_select_list] = useState([]);
  const [res_type_of_contact_list, apiMethod_type_of_contact_list] = usePost();
  const [respremetion] = usePost();
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const [opportunityData, setopportunityData] = useState(false);
  const [content, setContent] = useState("");
  const [content1, setContent1] = useState("");
  const [privateNote, setPrivateNote] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({});
  const [practiceName, setPracticeName] = useState({});
  const { addHeading } = useContext(MainHeadingContext);
  const [datas, setDatas] = useState("");
  const [image] = useState();
  const [assetsFile, setAssetsFile] = useState("");
  const [setImgVal] = useState("");
  const [emails, setEmails] = useState("");
  const [emailse] = useState(false);
  const [pipelineList, setPipelineList] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [pipelineValue, setPipelineValue] = useState('');
  const [stageValue, setStageValue] = useState('');
  const [stageList, setStageList] = useState('');
  const [priorityList, setPriorityList] = useState('')
  const [priorityValue, setPriorityValue] = useState('')
  const [getFollowerData, apiMethodFollower] = usePost();
  const [getMemberData, apiMethodGetMemberData] = usePost();
  const [addFollowerList, apiMethodAddFollowerList] = usePost();
  const [deleteFollower, apiMethodDeleteFollower] = usePost();
  const [deleteGuest, apiMethodDeleteGuest] = usePost();
  const [deleteMember, apiMethodDeleteMember] = usePost();
  const [getGuestData, apiMethodGetGuestData] = usePost();
  const [addGuestList, apiMethodAddGuestList] = usePost();
  const [selectGuest, setSelectGuest] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const { data: category_select_list1Media, loading11, error11, } = useFetch("", "getViewCategory");
  const [followerSelectValueMedia, setfollowerSelectValueMedia] = useState([])
  const [selectedFollowerMedia, setselectedFollowerMedia] = useState('')
  const [selectedFollowerMediaRole, setselectedFollowerMediaRole] = useState('')
  const [categoryMedia, setcategoryMedia] = useState([]);
  const [resPostCategoryMedia, apiMethodPostCategoryMedia] = usePost();
  const [subCategoryselectMedia, setsubCategoryselectMedia] = useState([]);
  const [category_select_listMedia, setCategory_select_listMedia] = useState([])
  const [subCat_selectedMedia, setsubCat_selectedMedia] = useState([])
  const [imageMedia, setImageMedia] = useState(false);
  const [admin_timeline_data, setadmin_timeline_data] = useState([]);
  const [admin_overview_data, setadmin_overview_data] = useState(null);
  const [repeat, setRepeat] = useState("");
  const [period, setPeriod] = useState("");
  const [checked, setChecked] = useState("never");
  const [customEventDate, setCustomEventDate] = useState('');
  const managePriority = useRef(false)
  const [apiCustomValue, setApiCustomValue] = useState({ first: '', second: '' })
  const [CustomEvent, setCustomEvent] = useState({
    firstValue: "",
    secondValue: "",
    label: "",
  });
  const [correlArr, setcorrelArr] = useState([
    {
      id: 1,
      firsValue: "15",
      secValue: "",
      value: "",
      type: "Co-Worker",
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
  const [NotificationArr, setNotificationArr] = useState([
    {
      id: "1",
      notify_type: "notification",
      notify_interval: "10",
      notify_period: "minutes",
    },
  ]);

  const {
    data: getdatas,
    loading,
    error,
  } = useFetch({ setDatas }, `getEditPiplineEvent/${id}`);

  const { data: registerdata } = useFetch("", "getUserRoles");
  const { data: statusData } = useFetch("", "getAllViewOpportunityStatus");
  const { loading5 } = useFetch("", "getAllCorrelationsLead");
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
    if (resAddFollower.data) {
      if (!resAddFollower.data.message) {
        setAddfollower(resAddFollower.data);
      }
    }
  }, [resAddFollower]);
  useEffect(() => {
    if (resAddContact.data) {
      if (!resAddContact.data.message) {
        setAddContact(resAddContact.data);
      }
    }
  }, [resAddContact]);
  useEffect(() => {
    if (category_select_list1) {
      let data = category_select_list1.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setCategory_select_list(data);
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
    } else if (resPostCategory.data && resPostCategory.data.message) {
      setsubCategoryselect([]);
    }
  }, [resPostCategory]);


  const deleteLeadAssign = (v) => {
    let formdata = new FormData();
    formdata.append("userType", "unAssign");
    formdata.append("unAssign", v);
    formdata.append("uLead", id);
    let deldata = formdata;
    apiMethodDelAssign("postDeleteLeadAssign", deldata);
    setassignLeadName(false);
  };
  const reRenderTimeline = () => {
    axios
      .get(`${config.apiEndPoint}getActivitiesData/${id}`)
      .then((response) => {
        setadmin_timeline_data(response.data.activity);
        setadmin_overview_data(response.data.overview);
      });
  };
  const deleteAssetFile = (item) => {
    let field = {
      general: "delete_file",
      fieldId: item.db_file_id,
      filelead: item.file_lead,
      filename: item.file_name,
    };
    apiMethodDeleteAsset("postDeleteLeadAssets", field);
    setAssetsFile(
      assetsFile.filter((its) => its.db_file_id !== item.db_file_id)
    );
  };


  //       <-------------    WORKING START FOR MEMBER   --------------> 


  const searchMemberData = (searchValue) => {
    let formData = new FormData();
    formData.append('userType', 'typeSearch')
    formData.append('getType', 'typeSearch1')
    formData.append('typeSearch1', 'member')
    formData.append('query', searchValue)
    apiMethodGetMemberData('PostSearchEventsFollMemGus', formData)
  };

  const updateMember = () => {
    const formdata = new FormData();
    formdata.append("uLeadType", "leadMember");
    formdata.append("uLead", id);
    selectMember.map(item => formdata.append('userLead[]', item))
    apiMethodAddMemberList("postEventsAddMembers", formdata);
  };

  useEffect(() => {
    if (addMemberList?.data) {
      toast.success(addMemberList?.data?.message)
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditPiplineEvent/${id}`)
        .then((response) => {
          setMemberList(response?.data?.members);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [addMemberList.data])

  const deleteMemberList = (item) => {
    let formData = new FormData();
    formData.append('unflw', item.id)
    formData.append('event_id', id)
    formData.append('pipeline', datas?.event_data?.event_pipeline)
    formData.append('mode', 'event_unflw')
    apiMethodDeleteMember('postEventsUnFollowMember', formData)
    setMemberList(memberList.filter(existItem => existItem.id !== item.id))
  }

  useEffect(() => {
    if (deleteMember) {
      toast.success(deleteMember?.data?.message)
    }
  }, [deleteMember?.data])

  //       <-------------     WORKING END FOR MEMBER    --------------> 

  //       <-------------   WORKING START FOR FOLLOWER   --------------> 



  const searchFollowerData = (searchValue) => {
    let formData = new FormData();
    formData.append('userType', 'typeSearch')
    formData.append('getType', 'typeSearch1')
    formData.append('typeSearch1', 'follower')
    formData.append('query', searchValue)
    apiMethodFollower('PostSearchEventsFollMemGus', formData)
  }


  const updateFollowerList = () => {
    let formData = new FormData();
    formData.append('uLead', id);
    formData.append('uLeadType', 'leadFollwer');
    selectFollower.map(item => formData.append('userLead[]', item));
    apiMethodAddFollowerList('postEventsAddFollowUp', formData)

  }

  useEffect(() => {
    if (addFollowerList?.data) {
      toast.success(addFollowerList?.data?.message)
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditPiplineEvent/${id}`)
        .then((response) => {
          setFollowerList(response?.data?.followers);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [addFollowerList?.data])

  const deleteFollowerList = (item) => {
    let formData = new FormData();
    formData.append('unflw', item.id)
    formData.append('event_id', id)
    formData.append('pipeline', datas?.event_data?.event_pipeline)
    formData.append('mode', 'event_unflw')
    apiMethodDeleteFollower('postEventsUnFollow', formData)
    setFollowerList(followerList.filter(existItem => existItem.id !== item.id))
  }

  useEffect(() => {
    if (deleteFollower) {
      toast.success(deleteFollower?.data?.message)
    }
  }, [deleteFollower?.data])

  //       <-------------   WORKING END FOR FOLLOWER   --------------> 


  //       <-------------   WORKING START FOR GUEST   -------------->

  const searchGuestData = (searchValue) => {
    let formData = new FormData();
    formData.append('userType', 'typeSearch')
    formData.append('getType', 'typeSearch1')
    formData.append('typeSearch1', 'guest')
    formData.append('query', searchValue)
    apiMethodGetGuestData('PostSearchEventsFollMemGus', formData)
  };

  const updateGuest = () => {
    const formdata = new FormData();
    formdata.append("uLeadType", "leadGuest");
    formdata.append("uLead", id);
    selectGuest.map(item => formdata.append('userLead[]', item))
    apiMethodAddGuestList("postEventsAddGuests", formdata);
  };

  useEffect(() => {
    if (addGuestList?.data) {
      toast.success(addGuestList?.data?.message)
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditPiplineEvent/${id}`)
        .then((response) => {
          setGuestList(response?.data?.guests);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [addGuestList.data])

  const deleteGuestList = (item) => {
    let formData = new FormData();
    formData.append('unflw', item.id)
    formData.append('event_id', id)
    formData.append('pipeline', datas?.event_data?.event_pipeline)
    formData.append('mode', 'event_unflw')
    apiMethodDeleteGuest('postEventsUnFollowGuest', formData)
    setGuestList(guestList.filter(existItem => existItem.id !== item.id))
  }

  useEffect(() => {
    if (deleteGuest) {
      toast.success(deleteGuest?.data?.message)
    }
  }, [deleteGuest?.data])

  //       <-------------   WORKING END FOR GUEST   -------------->

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

  useEffect(() => {
    if (datas && datas.event_data) {
      setAssetsNotes(datas?.assets_notes);
      setContent1(datas?.event_data?.event_description)
      addHeading(`Edit Event `);
      setPriorityValue(datas?.event_data?.event_type === 'follow_up' ? datas?.event_data?.event_severity : datas?.event_data?.priority)
      setAssetsFile(datas?.assets_files);
      setMemberList(datas?.members);
      setdatasFeild(datas?.all_fields);
      setPipelineValue(datas?.event_data?.event_pipeline)
      setTypeValue(datas?.event_data?.event_type)
      setStageValue(datas?.event_data?.event_pipeline_stage)
      setCustomEventDate(dayjs(datas?.event_data?.start_date))
      setActionVal(datas?.event_data?.has_dependency_actions)
      setDefaultValue(datas?.event_data?.event_recurrence_text)
      setCustomEvent({
        firstValue: datas?.event_data?.all_day_recurrence_type ? datas?.event_data?.all_day_recurrence_type : '',
        secondValue: datas?.event_data?.custom_rrule,
        label: datas?.event_data?.event_recurrence_text,
      })
      setApiCustomValue({
        first: datas?.event_data?.custom_rrule,
        second: datas?.event_data?.all_day_recurrence_type ? datas?.event_data?.all_day_recurrence_type : datas?.event_data?.all_day_recurrence_type,
        third: datas?.event_data?.event_recurrence_text
      })
      handleSearchAction(' ')
      if (datas.event_data?.event_tags) {
        setselectTag(datas?.event_data?.event_tags?.split(","));
      }
      setNotificationArr(Array.isArray(datas?.notifactionEvent) ? datas?.notifactionEvent.map((item, index) => ({
        id: item?.notify_db_id,
        notify_type: item?.event_notification_type,
        notify_interval: item?.event_notification_interval,
        notify_period: item?.event_notification_period
      })) : [{
        id: "1",
        notify_type: "notification",
        notify_interval: "10",
        notify_period: "minutes",
      }])
      let formData = new FormData();
      formData.append('pipeline_id', datas?.event_data?.event_pipeline)
      formData.append('event_type', datas?.event_data?.event_type)
      apiMethodPipelineValue('postPiplineEventStatus', formData)
      //     setopportunityData(datas.Opportunity);
      //     setEmails(`${datas.event_data.email}`);
      //     setcorrelationView(datas.correlations);
      setFollowerList(datas?.followers);
      setGuestList(datas?.guests)
      setMemberList(datas?.members)
      //     setPracticeName(allData.timeZone.filter((item) => { return item.value == datas.event_data.time_zone; })[0]);
      //     setPhoneNumber({
      //         number: datas.event_data.number,
      //         mobile_phone: datas.event_data.mobile_phone
      //     });
      //     setStage(datas.event_data.prospect_stage);
    }
  }, [datas]);
  const [tagoption, setTagOption] = useState([]);
  const [resTag, apiMethodTag] = usePost();
  const onSearchTag = (v) => {
    const formdata = new FormData();
    formdata.append("search_term", v);
    apiMethodTag("postSearchTags", formdata);
  };

  const handleEditorChange1 = (event, editor) => {
    const data = editor.getData();
    setContent1(data);
  };

  console.log(priorityValue)

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
  const subbbMedia = async (v, v2) => {
    setcategoryMedia(v)
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat")
    v.map(item => formdata.append(
      "query[]", item
    ))
    apiMethodPostCategoryMedia("postViewSubCategory",
      formdata)
  }
  useEffect(() => {
    if (resPostCategoryMedia.data && !resPostCategoryMedia.data.message) {
      let subData = resPostCategoryMedia.data.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setsubCategoryselectMedia(subData);
    } else if (resPostCategoryMedia.data && resPostCategoryMedia.data.message) {
      setsubCategoryselectMedia([]);
    }
  }, [resPostCategoryMedia]);


  const onSearchFollowerMedia = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };
  const onSearchFollower = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };


  useEffect(() => {
    if (category_select_list1Media) {
      let data = category_select_list1Media.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        }
      })
      setCategory_select_listMedia(data)
    }
  }, [category_select_list1Media])
  const submitbutton = {
    class: "btn btn-primary update_button_lead",
    text: "Update Info",
  };
  let reqName = ["event_title"];
  let reqNameObj = [
    {
      label: "Event Title",
      name: "event_title",
    }
  ];
  function handleSubmit(values) {

    let allValues = { ...values };
    let emptyReq_field_name = [];
    let req = reqName.filter((val) => {
      return allValues[val]?.trim() == "" || allValues[val] == undefined;
    });
    reqNameObj.map((val) => {
      if (req.includes(val.name)) {
        emptyReq_field_name.push(val.label);
      }
    });
    if (req.length === 0) {
      let formdata = new FormData();
      for (let item in allValues) {
        if (item === "avatar") {
          formdata.append("avatar", image);
        }
        else if (item === 'event_description') {
          formdata.append("event_description", content1);
        }
        else if (item === 'has_dependency_actions') {
          formdata.append("has_dependency_actions", ActionVal);
        }
        else if (item === 'event_pipeline') {
          formdata.append("event_pipeline", pipelineValue);
        }
        else if (item === 'event_pipeline_stage') {
          formdata.append("event_pipeline_stage", stageValue);
        }
        else if (item === 'event_type') {
          formdata.append("event_type", typeValue);
        }
        else if (item === 'all_day_recurrence_type') {
          formdata.append('all_day_recurrence_type', CustomEvent.firstValue);
        }
        else if (item === 'event_recurrence_text') {
          formdata.append("event_recurrence_text", CustomEvent.label);
        }
        else if (item === 'custom_rrule') {
          formdata.append("custom_rrule", CustomEvent.secondValue);
        }
        else if (item === 'event_severity') {
          if (typeValue == 'follow_up') {
            formdata.append("severity", priorityValue);
          }
          else {
            formdata.append("priority", priorityValue);
          }
        }
        else {
          formdata.append(item, allValues[item]);
        }
      }

      selectTag && formdata.append("tags[]", selectTag);
      image2 && formdata.append("upload_file", image2);
      imageMedia && formdata.append("upload_media", imageMedia)
      formdata.append("eve_name", 'Action')

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
      followerSelectValueMedia && formdata.append("media_follw", followerSelectValueMedia);
      if (followerSelectValueMedia == "Role") {
        selectedFollowerMedia.length &&
          selectedFollowerMedia.map((v, i) => {
            formdata.append(`md_follw[${i}]`, v);
          });
      }
      if (followerSelectValueMedia == "Custom") {
        selectedFollowerMediaRole.map((v, i) => {
          formdata.append(`media_followers[${i}]`, v);
        });
      }
      categoryMedia.length &&
        categoryMedia.map((v, i) => {
          formdata.append(`media_cat[${i}]`, v);
        });
      subCat_selectedMedia.length &&
        subCat_selectedMedia.map((v, i) => {
          formdata.append(`media_subcat[${i}]`, v);
        });

      formdata.append("update_event", "uPdate_eVENt");
      formdata.append("event_id", id);
      NotificationArr.map((item, index) => {
        formdata.append(`notify_type[]`, item.notify_type);
        formdata.append(`notify_interval[]`, item.notify_interval);
        formdata.append(`notify_period[]`, item.notify_period);
        formdata.append(`notify_id[]`, item.id);
      });


      let bodyContent = formdata;
      apiMethod("postUpdatePiplineEvent", bodyContent);
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
      toast.success(res.data.message);
      if (res.data.message && !res.isLoading) {
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
  const handleList2 = () => {
    let formdataOwner2 = new FormData();
    formdataOwner2.append("userType", "typeSearch");
    formdataOwner2.append("query", searchval2);
    apiMethodowner2("postSpecifiesUsers", formdataOwner2);
    setListOpen2(!listOpen2);
  };

  useEffect(() => {
    if (resStage.data && !resStage.data.message && datas && !datas.message) {
      setOpportunityStageList(resStage.data);
    }
  }, [resStage]);
  useEffect(() => {
    if (
      resLostReason.data &&
      !resLostReason.data.message &&
      datas &&
      !datas.message
    ) {
      setlostReason(resLostReason.data);
    }
  }, [resLostReason]);
  useEffect(() => {
    apiMethod_type_of_contact_list("postAllViewTypeContact", {
      type: "Lead,Prospect,Client",
    });
  }, []);
  // useEffect(() => {
  //     if (res2.data) {
  //         setJustifyActive2("tab20");
  //         // setdatasFeild(res2.data.all_fields);
  //     }
  // }, [res2.data]);

  if (datas && !datas.message) {
    var initialValues = datas?.event_data;
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
  const handleClick2 = (item) => {
    setSearchval2(item.uname);
    setOwnerhidden2(item.id);
    setListOpen2(false);
  };
  const handleToggle = (e) => {
    e.preventDefault();
    $(e.target).closest(".card").toggleClass("card-collapsed");
  };
  const handleFullScreen = (e) => {
    e.preventDefault();
    $(e.target).closest(".card").toggleClass("card-fullscreen");
  };
  const assignLeadIdToName = (v) => {
    if (resowner.data && v && !resowner.data.message) {
      let leadname = resowner.data.filter((vals) => vals.id == v)[0]?.uname;
      setassignLeadName(leadname);
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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const addNote = () => {
    let formdata = new FormData();
    formdata.append("event_id", id);
    formdata.append("notes", content);
    formdata.append("module", typeValue);
    formdata.append("pipeline", pipelineValue);
    privateNote &&
      formdata.append("private_note", privateNote);
    apiMethodAddNote("postNotesUpdatedEvents", formdata);
    setContent("")

  };

  useEffect(() => {
    if (resAddNote.data) {
      if (resAddNote.data.message === "Successfully Updated!") {
        toast.success(resAddNote.data.message);
        axios.defaults.headers = {
          "Content-Type": "multipart/form-data",
          authentication: `${getTokenSession()}`,
        };
        axios
          .get(`${config.apiEndPoint}getEditPiplineEvent/${id}`)
          .then((response) => {
            setAssetsNotes(response.data?.assets_notes);
          });
      } else if (resAddNote.data.message === "Empty Note") {
        toast.error(resAddNote.data.message);
      }
    }
  }, [resAddNote.data]);


  const handleRemoveMeetingRow = (item) => {
    setmeetingArr(meetingArr.filter((val) => val.id !== item.id));
  };

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

  const handleStageChange = (event, opportunityStageList) => {
    let formData = new FormData();
    formData.append("query", event.target.value);
    formData.append("queryP", resStage?.data[0]?.pipeline_id);
    formData.append("type", "getCustomFields");
    formData.append("mode", "opportunities");
    formData.append("mdType", "Opportunity");
    formData.append("queryType", "add");
    apiMethod2("postCustomFieldsOpportunity", formData);
  };

  const handleSearchAction = (v) => {
    const formdata = new FormData();
    formdata.append("q", v);
    formdata.append("event_action_sr", "general_event_srAction_query");
    apiMethodAction("postSearchEventsActionsRelated", formdata);
  };

  useEffect(() => {
    if (resAction.data) {
      if (resAction.data && !resAction.isLoading) {
        if (Array.isArray(resAction.data)) {
          setActioned(
            resAction.data.map((item) => {
              return {
                value: item.value,
                label: item.text,
              };
            })
          );
        }
      }
    }
  }, [resAction.data]);

  const typess = [
    {
      label: "Event",
      value: "event",
    },
    {
      label: "Meeting",
      value: "meeting",
    },
    {
      label: "Action",
      value: "action",
    },
    {
      label: "Follow Up",
      value: "follow_up",
    },
    {
      label: "Reminder",
      value: "reminder",
    },
    {
      label: "Out of Office",
      value: "out_of_office",
    },
  ];

  const handleTypeValue = (event) => {
    setTypeValue(event.target.value)
    let formData = new FormData();
    formData.append('event_type', event.target.value)
    apiMethodTypeValue('postPiplineEventStatus', formData)
    return () => managePriority.current = true
  }
  const handlePipelineValue = (event) => {
    setPipelineValue(event.target.value)
    let formData = new FormData();
    formData.append('pipeline_id', event.target.value)
    formData.append('event_type', typeValue)
    apiMethodPipelineValue('postViewEventsPiplinesStages', formData)
  }

  useEffect(() => {
    if (Array.isArray(resPipelineValue?.data?.pipelines)) {
      setPipelineList(resPipelineValue?.data?.pipelines)
      setStageList(resPipelineValue?.data?.stages)
      setPriorityList(typeValue === 'follow_up' ? resPipelineValue?.data?.severities : resPipelineValue?.data?.priorities)
      if (managePriority.current) {
        setPriorityValue(typeValue === 'follow_up' ? resPipelineValue?.data?.severities[0]?.severity_id : resPipelineValue?.data?.priorities[0]?.priority_id)
      }
    }
  }, [resPipelineValue.data])


  useEffect(() => {
    if (Array.isArray(resTypeValue?.data?.pipelines)) {
      setPipelineList(resTypeValue?.data?.pipelines)
      setPipelineValue(resTypeValue?.data?.pipelines[0]?.db_id)
      let formData = new FormData();
      formData.append('pipeline_id', resTypeValue?.data?.pipelines[0]?.db_id)
      formData.append('event_type', typeValue)
      apiMethodPipelineValue('postViewEventsPiplinesStages', formData)
    }
    if (Array.isArray(resTypeValue?.data?.priorities) || Array.isArray(resTypeValue?.data?.severities)) {
      setPriorityList(typeValue === 'follow_up' ? resTypeValue?.data?.severities : resTypeValue?.data?.priorities)
      setPriorityValue(typeValue === 'follow_up' ? resTypeValue?.data?.severities[0]?.severity_id : resTypeValue?.data?.priorities[0]?.priority_id)
    }
  }, [resTypeValue.data])

  useEffect(() => {
    if (Array.isArray(resPipelineValue?.data)) {
      setStageList(resPipelineValue?.data)
      setStageValue(resPipelineValue?.data[0]?.id)
    }
    else if (resPipelineValue?.data?.message) {
      setStageList('')
    }
  }, [resPipelineValue?.data])

  useEffect(() => {
    if (res2.data) {
      setdatasFeild(res2?.data?.all_fields);
    }
  }, [res2.data]);
  if (loading || loading5 || respremetion.isLoading) return <Loader />;


  return (
    datas &&
    !datas.message && (
      <>
        <EditNotificationModal
          notificationarr={NotificationArr}
          setnotificationarr={setNotificationArr}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <div className="datasForm">
          <div className="container-fluid">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form name="myForm">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card card-collapsed">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <div className="card-title">
                          <i className="fa fa-users text-muted"></i>
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
                          <div className="col-md-12 mb-3">
                            <label className="form-label">
                              <b>{Translation(translation, "Assign to:")}</b>
                            </label>
                            {Translation(
                              translation,
                              `${datas?.created_by_actual[0]?.f_name}  ${datas?.created_by_actual[0]?.l_name}`
                            )}{" "}
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">
                              <b>
                                {" "}
                                {Translation(translation, "Opportunity Owner:")}
                              </b>{" "}
                            </label>
                            {Translation(
                              translation,
                              `${datas?.created_by_actual[0]?.f_name}  ${datas?.created_by_actual[0]?.l_name}`
                            )}{" "}
                          </div>
                          <div className="col-md-12">
                            <label className="form-label">
                              <b>{Translation(translation, "Type of Entry:")}</b>
                            </label>
                            <p style={{ textTransform: 'capitalize', margin: 0 }}>
                              {Translation(
                                translation,
                                `${datas?.event_data?.event_type}`
                              )}{" "}
                            </p>
                          </div>

                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_title === "true" ? (
                            <div className="col-md-12">
                              <FormControl
                                className="form-control my-1"
                                name="event_title"
                                label={Translation(translation, `Event Title:`)}
                                placeholder={Translation(
                                  translation,
                                  `Event Title`
                                )}
                                control="input"
                                defaultValue={initialValues?.event_title}
                              />
                            </div>
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_opp_title === "-1" ? (
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translation, "Event Title:")}
                                </label>
                                <p className="mb-0">
                                  {Translation(
                                    translation,
                                    `${initialValues.event_title}`
                                  )}
                                </p>{" "}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="col-md-12 form-group my-2">
                            Description
                            <CKEditor
                              editor={ClassicEditor}
                              data={content1}
                              onChange={handleEditorChange1}
                            />
                          </div>
                          <hr />
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translation, "Start Date:")}
                              </label>
                              <p className="mb-0">
                                {Translation(
                                  translation,
                                  `${initialValues?.start_date}`
                                )}
                              </p>
                              <p className="mb-0">
                                {Translation(
                                  translation,
                                  `${initialValues?.start_date_time}`
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translation, "End Date:")}
                              </label>
                              <p className="mb-0">
                                {Translation(
                                  translation,
                                  `${initialValues?.end_date}`
                                )}
                              </p>
                              <p className="mb-0">
                                {Translation(
                                  translation,
                                  `${initialValues?.end_date_time}`
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <FormControl
                              className="form-control my-1"
                              name="location"
                              label={Translation(translation, `Location:`)}
                              placeholder={Translation(
                                translation,
                                `Location`
                              )}
                              control="input"
                              defaultValue={initialValues?.location}
                            />
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translation, "Created:")}
                              </label>
                              <p className="mb-0">
                                {Translation(
                                  translation,
                                  `${initialValues?.date_created}`
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translation, "Updated:")}
                              </label>
                              <p className="mb-0">
                                {Translation(
                                  translation,
                                  `${initialValues?.last_updated}`
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="form-label">
                                {Translation(translation, "Creator:")}
                              </label>
                              <p className="mb-0">
                                {Translation(
                                  translation,
                                  `${datas?.created_by_actual[0]?.f_name}  ${datas?.created_by_actual[0]?.l_name}`
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {datasFeild?.length ? <div className="col-lg-12 col-md-12 col-sm-12">
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
                        <div className="card-body">
                          {datasFeild && (
                            <div className="innerNav">
                              <MDBTabs
                                justify
                                className="nav d-flex nav-tabs page-header-tab"
                              >
                                {Object.keys(datasFeild).map((item, index) => {
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
                                        {item.replace(/_/g, " ")}
                                      </MDBTabsLink>
                                    </MDBTabsItem>
                                  );
                                })}
                              </MDBTabs>
                              <MDBTabsContent>
                                {Object.keys(datasFeild).map(function (key, i) {
                                  return (
                                    <MDBTabsPane
                                      key={i}
                                      show={justifyActive2 == `tab2${i}`}
                                    >
                                      <div className="card p-3">
                                        <div className="card-body">
                                          {Object.keys(datasFeild[key]).map(
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
                                                    datasFeild[key][key2]
                                                  ).map(function (key3, j) {
                                                    const {
                                                      type,
                                                      body,
                                                      field_required,
                                                      label,
                                                      value,
                                                    } =
                                                      datasFeild[key][key2][
                                                      key3
                                                      ];
                                                    const objname = Object.keys(
                                                      datasFeild[key][key2]
                                                    )[j];
                                                    let labelName = `opportunity_${label.replaceAll(
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
                                                            ?.opportunities
                                                            ?.fields[
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                            type == "date"
                                                          ) {
                                                            if (
                                                              leadPermission?.super_admin ||
                                                              leadPermission
                                                                ?.opportunities
                                                                ?.fields[
                                                              labelName
                                                              ] === "true"
                                                            ) {
                                                              return (
                                                                <FormControl
                                                                  // options={body.split(",")}
                                                                  type="date"
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
                                                                  control="input"
                                                                />
                                                              );
                                                            } else if (
                                                              leadPermission
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                                                                ?.opportunities
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
                          )}

                          <br />
                        </div>
                      </div>
                    </div> : ''}
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-sticky-note text-muted"></i> Event Status{" "}
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
                        <div className="row align-items-center mb-3">
                          <div className="col-5">
                            <strong>Type</strong>
                          </div>
                          <div className="col-7 mt-">
                            <FormControl
                              className="form-control mt-3"
                              placeholder={Translation(
                                translation,
                                `Location`
                              )}
                              control="select"
                              defaultValue={initialValues?.event_type}
                              // value={'--Select--'}
                              // firstSelect='--Select--'
                              selectList={typess}
                              name='type'
                              customer_value_name='value'
                              custom_label_name='label'
                              onChange={(event) => handleTypeValue(event)}
                            />
                          </div>
                        </div>
                        {(typeValue === 'meeting' || typeValue === 'follow_up' || typeValue === 'action') ? <div className="fluid">
                          <div className="row align-items-center mb-3">
                            <div className="col-5">
                              <strong>Pipeline</strong>
                            </div>
                            <div className="col-7 mt-">
                              <FormControl
                                className="form-control mt-3"
                                placeholder={Translation(
                                  translation,
                                  `Location`
                                )}
                                // firstSelect='--Select--'
                                name='Pipeline'
                                control="select_custom_options"
                                selectList={pipelineList}
                                value={pipelineValue}
                                customer_value_name='db_id'
                                custom_label_name='pipeline_title'
                                onChange={event => handlePipelineValue(event)}
                              />
                            </div>
                          </div>
                          <div className="row align-items-center mb-3">
                            <div className="col-5">
                              <strong>Stage</strong>
                            </div>
                            <div className="col-7 mt-">
                              <FormControl
                                className="form-control mt-3"
                                placeholder={Translation(
                                  translation,
                                  `Location`
                                )}
                                name='stage'
                                control="select_custom_options"
                                selectList={stageList}
                                value={stageValue}
                                customer_value_name='id'
                                custom_label_name='name'
                                onChange={(event) => setStageValue(event.target.value)}
                              />
                            </div>
                          </div>
                          <div className="row align-items-center mb-3">
                            <div className="col-5">
                              <strong>{typeValue === 'follow_up' ? 'Severity' : 'Priority'}</strong>
                            </div>
                            <div className="col-7 mt-">
                              <FormControl
                                className="form-control mt-3"
                                placeholder={Translation(
                                  translation,
                                  `Location`
                                )}
                                name={typeValue === 'follow_up' ? "severity" : 'priority'}
                                control="select_custom_options"
                                selectList={priorityList}
                                custom_label_name={typeValue === 'follow_up' ? 'severity_label' : 'priority_label'}
                                customer_value_name={typeValue === 'follow_up' ? 'severity_id' : 'priority_id'}
                                value={priorityValue}
                                onChange={event => setPriorityValue(event.target.value)}
                              />
                            </div>
                          </div>
                        </div> : ''}
                      </div>
                    </div>
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
                            className="btn btn-icon btn-primary btn-success f"
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
                        {leadPermission?.super_admin ||
                          leadPermission?.opportunities?.fields
                            ?.opportunity_opp_owner === "true" ? (
                          <>
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
                          </>
                        ) : (
                          ""
                        )}
                        {
                          assetsnotes &&
                          !assetsnotes.message &&
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
                                        <strong>{item.created_time}</strong>
                                      </div>
                                      <div className="float-right">
                                        Posted By{" "}
                                        <small className="text-muted">
                                          {item.f_name +
                                            "" +
                                            item.l_name +
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
                          <i className="fa fa-sticky-note text-muted"></i> Dependency{" "}
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
                        <Select
                          showSearch={true}
                          // disabled={values.eve_depenency != "1"}
                          filterOption={false}
                          style={{ width: "100%" }}
                          onSearch={value => handleSearchAction(value)}
                          placeholder="Search for --Actions Related to --"
                          onChange={(v1, v2) => { setActionVal(v1) }}
                          options={actioned && actioned}
                          value={ActionVal}
                        />
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-sticky-note text-muted"></i> Frequency{" "}
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
                        <CreateCustomEvent
                          setCustomEvent={setCustomEvent}
                          setRepeat={setRepeat}
                          setPeriod={setPeriod}
                          setChecked={setChecked}
                          dateData={customEventDate}
                          defaultCustomValue={defaultValue}
                          apiValue={apiCustomValue}
                        />
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-sticky-note text-muted"></i> Notifications{" "}
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
                        <thead>
                          {Array.isArray(datas?.notifactionEvent) ? <tr>
                            <th style={{ width: 100, textTransform: 'capitalize' }}>Type</th>
                            <th style={{ width: 70, textTransform: 'capitalize' }}>Interval</th>
                            <th style={{ width: 80, textTransform: 'capitalize' }}>Period</th>
                            <th style={{ width: 50, textTransform: 'capitalize' }}>Action</th>
                          </tr> : ''}
                        </thead>
                        <tbody className="tbody">
                          {Array.isArray(datas?.notifactionEvent) ?
                            datas?.notifactionEvent.map((item, index) => {
                              return (<tr key={item?.notify_db_id}>
                                <td style={{ width: 100, textTransform: 'capitalize' }}>
                                  {item?.event_notification_type}
                                </td>
                                <td style={{ width: 70, textTransform: 'capitalize', textAlign: 'center' }}>
                                  {item?.event_notification_interval}
                                </td>
                                <td style={{ width: 80, textTransform: 'capitalize' }}>
                                  {item?.event_notification_period}
                                </td>
                                <td style={{ width: 50, textTransform: 'capitalize', textAlign: 'center' }}>
                                  <i onClick={() => setModalShow(true)} className="fa fa-pencil"></i>
                                </td>
                              </tr>)
                            }) : <tr>
                              <td><button
                                type="button"
                                className="btn w-100 btn-primary mt-2"
                                onClick={() => setModalShow(true)}
                              >
                                Open Edit Modal
                              </button></td>
                            </tr>}
                        </tbody>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card card-collapsed">
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
                              typeFile=".txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.csv,.json,.xml,.html,.htm,.js,.css,.php,.cpp,.c,.java,.py,.rb,.sql,.log"
                              imageObj={image2}
                              typeFile_name={"typeFile"}
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
                                style={{ width: '100%', height: 40 }}
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
                                category_select_list.map(
                                  ({ label, value }) => (
                                    <Select.Option value={value} key={value}>
                                      {label}
                                    </Select.Option>
                                  )
                                )}
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
                        ) : assetsFile.message !== "Data Not Found!" ? (
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
                                    return item.file_type === 'Document' ? (
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
                                            {/* <EditLeadAssetEditModal
                                                item={item}
                                                follower_select_list={
                                                  follower_select_list
                                                }
                                                obj={redata?.CEO}
                                                resowner={resowner}
                                              /> */}

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
                                      <></>
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
                    <div className="follower">
                      <div className="card leadCards">
                        <div className="card-header d-flex align-center">
                          <h3 className="card-title">
                            {Translation(translation, "Members")}
                          </h3>
                          <div className="card-options">
                            <Link
                              onClick={(e) => handleToggle(e)}
                              className="card-options-collapse"
                            >
                              <i className={`fe fe-chevron-down`} />
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
                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_contact === "true" ? (
                            <>
                              <Select
                                mode="multiple"
                                filterOption={(input, option) =>
                                  (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                onSearch={(searchValue) => {
                                  searchMemberData(searchValue);
                                }}
                                onChange={(value) => {
                                  setSelectMember(value);
                                }}
                                style={{ width: "100%", height: 40 }}
                                placeholder={"Search follower name"}
                              >
                                {Array.isArray(getMemberData?.data?.users) &&
                                  getMemberData?.data?.users.map(item => {
                                    return (
                                      <Select.Option value={item?.id} key={item?.id}>
                                        {item?.uname}
                                      </Select.Option>
                                    )
                                  })}
                              </Select>
                              <button
                                type="button"
                                className="my-3 btn w-100 btn-primary"
                                onClick={updateMember}
                              >
                                Update Member
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                          {<ul className="right_chat list-unstyled p-0 right_chat_vl">
                            {Array.isArray(memberList) &&
                              memberList.map(item => {
                                return (
                                  <li
                                    className="online mb-2 d-flex justify-between w-100 overflow-auto text-wrap"
                                    key={item?.id}
                                  >
                                    <a href="#">
                                      <div className="media">
                                        <img
                                          className="media-object "
                                          src={item?.avatar}
                                          alt="Image Not Show"
                                        />
                                        <div className="media-body">
                                          <span className="name">
                                            {item?.uname}
                                          </span>
                                          <span className="name">
                                            {item?.role_name}
                                          </span>
                                          <span className="badge badge-outline status"></span>
                                        </div>
                                      </div>
                                    </a>
                                    <Link
                                      onClick={() => deleteMemberList(item)}
                                      className="cc_cls"
                                      data-row="184"
                                    >
                                      <i className="fa-solid fa-xmark"></i>
                                    </Link>
                                  </li>
                                );
                              })}
                          </ul>}
                        </div>
                      </div>
                    </div>
                    <div className="follower">
                      <div className="card leadCards">
                        <div className="card-header d-flex align-center">
                          <h3 className="card-title">
                            {Translation(translation, "Followers")}
                          </h3>
                          <div className="card-options">
                            <Link
                              onClick={(e) => handleToggle(e)}
                              className="card-options-collapse"
                            >
                              <i className={`fe fe-chevron-down`} />
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
                          <Select
                            mode="multiple"
                            filterOption={(inputValue, option) => (option?.children ?? '').toLowerCase().includes(inputValue.toLowerCase())}
                            onSearch={(searchValue) => {
                              searchFollowerData(searchValue);
                            }}
                            onChange={value => setSelectFollower(value)}
                            style={{ width: "100%", height: 40 }}
                            placeholder={"Search follower name"}
                          >
                            {Array.isArray(getFollowerData?.data?.users) &&
                              getFollowerData?.data?.users.map(item => {
                                return (
                                  <Select.Option value={item?.id} key={item?.id}>
                                    {item?.uname}
                                  </Select.Option>
                                )
                              })}
                          </Select>
                          <button
                            type="button"
                            className="my-3 btn w-100 btn-primary"
                            onClick={updateFollowerList}
                          >
                            Update Follower
                          </button>
                          <div className="">
                            {Array.isArray(followerList) &&
                              followerList.map((item, index) => {
                                return (
                                  <div className="chip my-2" key={index}>
                                    <span
                                      className="avatar"
                                      style={{
                                        backgroundImage:
                                          "url('./media/8410448a908412cec09fc9a1b42e7c1eeaf1031c.jpg')",
                                      }}
                                    ></span>
                                    <div className="d-flex align-item-center">
                                      <span>{item.uname}</span>
                                      <a
                                        className="btnunfollow"
                                        data-follow="14"
                                        onClick={() => deleteFollowerList(item)}
                                      >
                                        <i className="fe fe-x"></i>
                                      </a>
                                    </div>
                                  </div>
                                );

                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="follower">
                      <div className="card leadCards">
                        <div className="card-header d-flex align-center">
                          <h3 className="card-title">
                            {Translation(translation, "Guests")}
                          </h3>
                          <div className="card-options">
                            <Link
                              onClick={(e) => handleToggle(e)}
                              className="card-options-collapse"
                            >
                              <i className={`fe fe-chevron-down`} />
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
                          <Select
                            mode="multiple"
                            filterOption={(inputValue, option) => (option?.children ?? '').toLowerCase().includes(inputValue.toLowerCase())}
                            onSearch={searchValue => searchGuestData(searchValue)}
                            onChange={value => setSelectGuest(value)}
                            style={{ width: "100%", height: 40 }}
                            placeholder={"Search follower name"}
                          >
                            {Array.isArray(getGuestData?.data?.users) &&
                              getGuestData?.data?.users.map(item => {
                                return (
                                  <Select.Option value={item?.id} key={item?.id}>
                                    {item?.uname}
                                  </Select.Option>
                                )
                              })}
                          </Select>
                          <button
                            type="button"
                            className="my-3 btn w-100 btn-primary"
                            onClick={updateGuest}
                          >
                            Update Guest List
                          </button>
                          <div className="">
                            {Array.isArray(guestList) &&
                              guestList.map(item => {
                                return (
                                  <div className="chip my-2" key={item?.id}>
                                    <span
                                      className="avatar"
                                      style={{
                                        backgroundImage:
                                          "url('./media/8410448a908412cec09fc9a1b42e7c1eeaf1031c.jpg')",
                                      }}
                                    ></span>
                                    <div className="d-flex align-item-center">
                                      <span>{item?.uname}</span>
                                      <a
                                        className="btnunfollow"
                                        data-follow="14"
                                        onClick={() => deleteGuestList(item)}
                                      >
                                        <i className="fe fe-x"></i>
                                      </a>
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12">
                    {/* <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-users text-muted"></i> Calendar
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
                    </div> */}
                    {/* <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-calendar-check-o text-muted"></i>{" "}
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
                    </div> */}
                    <div className="card card-collapsed">
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
                      <div className="card-body p-2">
                        <div className="row clearfix">
                          <div className="col-md-12  mb-2">
                            <File
                              onUpload={setImageMedia}
                              label={Translation(translation, "Upload Media")}
                              name={"upload_media"}
                              typeFile=".jpg,.jpeg,.png,.gif,.bmp,.tif,.tiff,.mp4,.avi,.mov,.wmv,.flv,.mkv,.webm,.mpeg,.mpg,.3gp"

                            />

                          </div>
                          <div className="my-2">
                            <FormControl
                              className="form-control my-1"
                              selectList={follower_select_list}
                              label={"Followers"}
                              name="follower_select2"
                              control="select"
                              firstSelect={'--select--'}
                              onChange={e => setfollowerSelectValueMedia(e.target.value)}
                            >



                            </FormControl>


                          </div>
                          {followerSelectValueMedia == 'Custom' &&
                            <div className="my-2">
                              <label>
                                <b>Choose Follower</b>
                              </label>
                              <div className="margin_bottom">
                                <Select
                                  mode="multiple"
                                  filterOption={true}
                                  onSearch={(v) => {
                                    onSearchFollowerMedia(v);
                                  }}
                                  onChange={(v, v2) => {

                                    let a = v2.map((item) => { return item.key })
                                    setselectedFollowerMedia(a)
                                  }
                                  }
                                  style={{ width: '100%', height: 40 }}
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
                            </div>
                          }
                          {followerSelectValueMedia == 'Role' &&
                            <div>


                              <select className="form-control"
                                onChange={(e) => setselectedFollowerMediaRole([e.target.value])}
                              >
                                <option hidden> --select--</option>
                                <Role obj={redata?.CEO} />
                              </select>
                            </div>
                          }


                          <div className="my-2">
                            <label><b>Category</b></label>

                            <Select mode="multiple"
                              onChange={(v, v2) => { subbbMedia(v, v2) }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={'type follower name'}
                              filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                            >

                              {category_select_listMedia.length && category_select_listMedia.map(({ label, value }) => (
                                <Select.Option value={value} key={value}>
                                  {label}
                                </Select.Option>
                              ))}
                            </Select>
                          </div>


                          <div className="my-2">
                            <label><b>Sub Category</b></label>

                            <Select mode="multiple"
                              onChange={(v) => { setsubCat_selectedMedia(v); }}
                              style={{ width: "100%", height: 40 }}

                              placeholder={'sub category'}
                              filterOption={(input, option) =>
                                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                              }
                            >

                              {subCategoryselectMedia.length && subCategoryselectMedia.map(({ label, value }) => (
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
                            <div className="row row-cards">
                              {assetsFile && Array.isArray(assetsFile) && assetsFile?.map((items, i) => {
                                const noteDate = moment(items.file_created_date);
                                const currentDate = moment();
                                const diffInMinutes = currentDate.diff(noteDate, 'minutes');
                                const diffInHours = currentDate.diff(noteDate, 'hours');
                                const diffInDays = currentDate.diff(noteDate, 'days');
                                const diffInMonths = currentDate.diff(noteDate, 'months');
                                const diffInYears = currentDate.diff(noteDate, 'years');
                                let relativeDate = '';
                                if (diffInMinutes < 60) {
                                  relativeDate = `${diffInMinutes} min ago`;
                                } else if (diffInHours < 24) {
                                  relativeDate = `${diffInHours} hour ago`;
                                } else if (diffInDays < 30) {
                                  relativeDate = `${diffInDays} day ago`;
                                } else if (diffInMonths < 12) {
                                  relativeDate = `${diffInMonths} month ago`;
                                } else {
                                  relativeDate = `${diffInYears} year ago`;
                                }
                                return items.file_type === 'Media' ? (
                                  <div className="col-sm-6 col-lg-5 card_margin_left" key={i}>
                                    <div className="card card__media p-1 card-custom">
                                      <Media_image_display data={items}>
                                        <img className="media_image_height" src={items.file_value && items.file_value.includes("http") ? items.file_value : `${config.baseurl2}${items.file_value} `} alt="" /></Media_image_display>
                                      {/* <img src={errorImage} alt="" /> */}
                                      <div className="d-flex align-items-center px-2 mt-3">
                                        <img
                                          style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            marginRight: "10px",
                                          }}
                                          alt=""
                                          src={
                                            items?.fileOwnerData[0]
                                              ?.avatar &&
                                              items?.fileOwnerData[0]?.avatar.includes(
                                                "http"
                                              )
                                              ? items?.fileOwnerData[0]
                                                ?.avatar
                                              : `${config.baseurl2}${items?.fileOwnerData[0]?.avatar} `
                                          }
                                        />
                                        <div>
                                          <div>
                                            {" "}
                                            {Translation(
                                              translation,
                                              `${items?.fileOwnerData[0]
                                                ?.f_name +
                                              " " +
                                              items?.fileOwnerData[0]
                                                ?.l_name
                                              }`
                                            )}
                                          </div>
                                          <small className="d-block text-muted">
                                            {Translation(
                                              translation,
                                              `${items?.fileCreatedDate}`
                                            )}
                                          </small>
                                        </div>
                                        <div className="ml-auto text-muted ">
                                          {leadPermission?.super_admin ==
                                            "1" ||
                                            leadPermission?.filesnmedia_module
                                              ?.edit == "1" ? (
                                            <EditLeadAssetEditModal
                                              item={items}
                                              follower_select_list={
                                                follower_select_list
                                              }
                                              obj={redata?.CEO}
                                              resowner={resowner}
                                              id={id}
                                              updateTimeLine={
                                                reRenderTimeline
                                              }
                                              category_data={
                                                category_select_list
                                              }
                                              file_type={"media"}
                                              module={datas.event_data?.event_type === 'follow_up' ? "eventfollow_up" : "eventaction"}
                                            />
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                ) : ""
                              })
                              }
                            </div>
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
                          <i className="fa fa-user-secrect text-muted"></i>{" "}
                          Admin
                          <small>Admin &amp; Timeline</small>
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
                        {leadPermission?.super_admin ||
                          leadPermission.leads?.fields?.leads_admininfo ==
                          "true" ? (
                          <div>
                            <MDBTabs justify className="mb-2 fitContent">
                              <MDBTabsItem>
                                <MDBTabsLink
                                  onClick={() =>
                                    handleJustifyClickAdminTab("tab1")
                                  }
                                  active={admintab === "tab1"}
                                >
                                  {Translation(translation, "Overview")}
                                </MDBTabsLink>
                              </MDBTabsItem>
                              <MDBTabsItem>
                                <MDBTabsLink
                                  onClick={() =>
                                    handleJustifyClickAdminTab("tab2")
                                  }
                                  active={admintab === "tab2"}
                                >
                                  {Translation(translation, "Timeline")}
                                </MDBTabsLink>
                              </MDBTabsItem>
                            </MDBTabs>
                            <MDBTabsContent>
                              <MDBTabsPane show={admintab === "tab1"}>
                                <div>
                                  <div className="card">
                                    <div className="card-body">
                                      <ul className="list-unstyled">
                                        {leadPermission?.super_admin ||
                                          leadPermission?.opportunities?.fields[
                                          "opportunity_admin_oppstage_dates"
                                          ] === "on" ? (
                                          <li className="mt-4">
                                            <div className="row align-items-center">
                                              <div className="col-auto">
                                                <div className="h5 mb-0">
                                                  Lead Stage Dates
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
                                                    {datas.overView
                                                      .LeadStageDates &&
                                                      !datas.overView
                                                        .LeadStageDates
                                                        .message &&
                                                      Object.keys(
                                                        datas?.overView
                                                          ?.LeadStageDates
                                                      ).map((item, index) => {
                                                        return (
                                                          <tr key={index}>
                                                            <td>
                                                              {
                                                                datas?.overView
                                                                  ?.LeadStageDates[
                                                                  item
                                                                ]?.name
                                                              }
                                                            </td>
                                                            <td>
                                                              {
                                                                datas?.overView
                                                                  ?.LeadStageDates[
                                                                  item
                                                                ]?.assign_on
                                                              }
                                                            </td>
                                                            <td>
                                                              {
                                                                datas?.overView
                                                                  ?.LeadStageDates[
                                                                  item
                                                                ]?.days
                                                              }
                                                            </td>
                                                          </tr>
                                                        );
                                                      })}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </li>
                                        ) : (
                                          ""
                                        )}
                                        {datas.overView.OverView &&
                                          !datas.overView.OverView.message &&
                                          Object.keys(
                                            datas?.overView?.OverView
                                          ).map((item, index) => {
                                            return leadPermission?.super_admin ||
                                              leadPermission?.opportunities
                                                ?.fields[
                                              `opportunity_admin_${item.replaceAll(
                                                " ",
                                                "_"
                                              )}`
                                              ] === "on" ? (
                                              <li key={index} className="mb-4">
                                                <div className="row align-items-center">
                                                  <div className="col-auto">
                                                    <div className="h5 mb-0">
                                                      {item.replaceAll(
                                                        "_",
                                                        " "
                                                      )}
                                                    </div>
                                                    <span className="small text-muted">
                                                      {
                                                        datas?.overView
                                                          ?.OverView[item]
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                              </li>
                                            ) : (
                                              ""
                                            );
                                          })}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </MDBTabsPane>
                              <MDBTabsPane show={admintab === "tab2"}>
                                <div className="card">
                                  <div className="card-body">
                                    {datas.timeLine &&
                                      !datas.timeLine.message &&
                                      datas.timeLine.map((val, i) => {
                                        return (
                                          <div
                                            className="timeline_item "
                                            key={i}
                                          >
                                            <img
                                              className="tl_avatar"
                                              src={`https://www.gravatar.com/avatar/9f199d16db9e64e35e53f2b0f13ac617?s=160`}
                                              alt=""
                                            />
                                            <span>
                                              <a>
                                                {" "}
                                                {Translation(
                                                  translation,
                                                  `${val.f_name} ${val.l_name}`
                                                )}
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
                                                  StringConvert(
                                                    val.activity_value
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
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right mt-5 update_button_lead">
                  <SubmitButton
                    props={submitbutton}
                    buttonLoading={res.isLoading}
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </>
    )
  );
}

export default EditFollowUp;
