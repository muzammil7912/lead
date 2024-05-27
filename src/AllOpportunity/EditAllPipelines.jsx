import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { getTokenSession } from "../utils/common";
import config from "../services/config.json";
import { Link, useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/common/Loading";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Form, Formik } from "formik";
import FormControl from "../components/form/FormControl";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import SubmitButton from "../components/SubmitButton";
import usePost from "../customHooks/usePost";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BsFillBookmarkFill } from "react-icons/bs";
import $ from "jquery";
import { GoFileSymlinkDirectory } from "react-icons/go";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { FaHandshake } from "react-icons/fa";
import File from "../components/form/File";
import { Monthss } from "../components/Month";
import { FaSearch } from "react-icons/fa";
import { Translation } from "../components/Translation";
import swal from "sweetalert";
import { Select } from "antd";
import { StringConvert } from "../components/StringConvert";
import EditLeadAssetEditModal from "../Lead/EditLeadAssetEditModal";
import Role from "../components/Role";
import { toast } from "react-toastify";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import dayjs from "dayjs";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import moment from "moment";
import { FaFolder } from "react-icons/fa";
import Media_image_display from "../Lead/Media_image_display";
import EditLeadCalender from "../Lead/EditLeadCalender";
import EditLeadAction from "../Lead/EditLeadAction";
import ActionCard from "../components/common/ActionCard";
import MeetingCard from "../components/common/MeetingCard";
import EditLeadMeeting from "../Lead/EditLeadMeeting";
import { HandleConvertTimeOnlyDate, Handle_convert_system_timezone } from "../components/AllCustomFuntion";
function EditAllPipelines() {
  const { id } = useParams();
  const [media_list, setmedia_list] = useState({})
  const [descriptionContent, setDescriptionContent] = useState("");
  const { translations } = useContext(MainTranslationContexts);
  const [res4, apiMethod4] = usePost();
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
  const [resUpdateAddContact, apiMethodupdateAddContact] = usePost();
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
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [image2, setImage2] = useState(false);
  const inputElement = useRef();
  const ownerRef = useRef(null);
  const [searchval, setSearchval] = useState("");
  const [searchval2, setSearchval2] = useState("");
  const [followerSelectValue, setfollowerSelectValue] = useState(false);
  const [selectedFollower, setselectedFollower] = useState([]);
  const [category, setcategory] = useState([]);
  const [addFollower, setAddfollower] = useState([]);
  const [addContact, setAddContact] = useState([]);
  const [addselectedFollower, setAddselectedFollower] = useState([]);
  const [addselectedContact, setAddselectedContact] = useState([]);
  const [previousFollower, setPreviousFollower] = useState([]);
  const [previousContact, setPreviousContact] = useState([]);
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
  const [lostStage, setLostStage] = useState(false);
  const [stageValue, setStageValue] = useState("");
  const [lostStageValue, setLostStageValue] = useState("");
  const follower_select_list = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Custom", value: "Custom" },
    { label: "Role", value: "Role" },
  ];
  ////////////////////////////////////////////Media //////////////////////////////////////
  const {
    data: category_select_list1Media,
    loading11,
    error11,
  } = useFetch("", "getViewCategory");
  const [followerSelectValueMedia, setfollowerSelectValueMedia] = useState([]);
  const [selectedFollowerMedia, setselectedFollowerMedia] = useState("");
  const [selectedFollowerMediaRole, setselectedFollowerMediaRole] =
    useState("");
  const [categoryMedia, setcategoryMedia] = useState([]);
  const [resPostCategoryMedia, apiMethodPostCategoryMedia] = usePost();
  const [subCategoryselectMedia, setsubCategoryselectMedia] = useState([]);
  const [category_select_listMedia, setCategory_select_listMedia] = useState(
    []
  );
  const [subCat_selectedMedia, setsubCat_selectedMedia] = useState([]);
  const [imageMedia, setImageMedia] = useState(false);
  const [admin_timeline_data, setadmin_timeline_data] = useState([]);
  const [admin_overview_data, setadmin_overview_data] = useState(null)
  const [actionArr, setactionArr] = useState([
    {
      id: 1,
      DateValue: "",
      FirstValue: "",
      secValue: "",
      thirdValue: "",
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
  const [meetingArr, setmeetingArr] = useState([
    {
      id: 1,
      DateValue: "",
      FirstValue: "",
      secValue: "",
      thirdValue: "",
    },
  ]);
  const [modalStates, setModalStates] = useState(
    correlArr.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };

  const reRenderTimeline = () => {
    axios
      .get(`${config.apiEndPoint}getActivitiesOpportunityData/${id}`)
      .then((response) => {
        setadmin_timeline_data(response.data.timeLine);
        setadmin_overview_data(response.data.adminOverview);
        // console.log(response.data);
      });
  };
  useEffect(() => {
    if (resAddFollower.data) {
      if (!resAddFollower.data.message) {
        // console.log(resAddFollower.data);
        setAddfollower(resAddFollower.data);
        reRenderTimeline()
      }
      // setAddfollower
    }


  }, [resAddFollower]);
  useEffect(() => {
    if (resAddContact.data) {
      if (!resAddContact.data.message) {
        // console.log(resAddContact.data);
        setAddContact(resAddContact.data);
        reRenderTimeline()

      }
      // setAddfollower
    }
  }, [resAddContact]);

  const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZone3 = timeZone2.split("/")
  const { data: editLead, loading } = useFetch(
    { setDatas },
    `getEditOpportunity/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`
  );
  const [resMedia, apiMethodMedia] = usePost();
  const [resFile, apiMethodFile] = usePost();
  const [actionL, setActionL] = useState('')
  const [meetingL, setMeetingL] = useState('')
  const { data: statusData } = useFetch("", "getAllViewOpportunityStatus");
  const { data: category_select_list1 } = useFetch("", "getViewCategory");
  const { data: registerdata } = useFetch("", "getUserRoles");
  const { loading5 } = useFetch("", "getAllCorrelationsLead");

  useEffect(() => {
    if (editLead && editLead.opportunity_data) {
      setAssetsFile(editLead?.filesData);
      setmedia_list(editLead?.mediaData);
      setActionL(editLead?.actionEventsData)
      setMeetingL(editLead?.meetingEventsData)
      setAssetsNotes(editLead?.notes);
      setLostStage(editLead?.opportunity_data?.wonlost === "lost" && true);
      addHeading(
        `Edit Opportunity - ${editLead?.opportunity_data?.opportunity_title}`
      );
      setDescriptionContent(
        editLead?.opportunity_data?.opportunity_description
      );
      setadmin_timeline_data(editLead?.timeLine);
      setadmin_overview_data(editLead?.adminOverview);
      setPreviousContact(editLead?.contact);
      setEditLeadFeild(editLead?.all_fields);
      setPreviousFollower(editLead.opportunity_followers);
      setLostStageValue(editLead?.opportunity_data?.opportunity_lost_reason);
      if (!editLead.opportunity_data?.tags === "") {
        setselectTag(editLead.opportunity_data?.tags?.split(","));
      }
      let stageFormData = new FormData();
      stageFormData.append("general", "view_pipeline_stages");
      stageFormData.append("gtRs", editLead.opportunity_data.pipeline);
      stageFormData.append("layout", "list");
      apiMethodStage("postAllViewOpportunityPiplinesStages", stageFormData);
      setStageValue(editLead?.opportunity_data?.opportunity_stage);
      apiMethodLostReason("postAllOpportunityStagesSettings", {
        pipeline_id: editLead.opportunity_data.pipeline,
      });
    }
  }, [editLead]);
  const handleMediaMOre = () => {
    const lendth = media_list.data.length
    const data = media_list.data[lendth - 1]
    console.log(data, "djhfjdh")
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Opportunity");
    apiMethodMedia("postPaginationMediaDataView", formData);
  }
  const handle_File_more = () => {
    const lendth = assetsFile.data.length
    const data = assetsFile.data[lendth - 1]
    console.log(data, "djhfjdh")
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Opportunity");
    apiMethodFile("postPaginationFilesDataView", formData);
  }
  useEffect(() => {
    if (resMedia.data) {
      let media_arr = resMedia.data.data
      media_arr.shift()
      setmedia_list(
        {
          ...resMedia.data,
          data: [...media_list.data, ...media_arr],

        }
      )
      // setAssetsFile()
    }
  }, [resMedia]);
  useEffect(() => {
    if (resFile.data) {
      let file_arr = resFile.data.data
      file_arr.shift()
      setAssetsFile(
        {
          ...resFile.data,
          data: [...assetsFile.data, ...file_arr],

        }
      )
      // setAssetsFile()
    }
  }, [resFile]);

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
      // console.log(data, 'sda');
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
      // console.log(subData);
    } else if (resPostCategory.data && resPostCategory.data.message) {
      setsubCategoryselect([]);
    }
  }, [resPostCategory]);

  useEffect(() => {
    if (resUpdateAddContact.data) {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditOpportunity/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`)
        .then((response) => {
          setPreviousContact(response.data.contact);
        })
        .catch((err) => {
          // console.log('eerr', err);
        });
    }
  }, [resUpdateAddContact]);
  useEffect(() => {
    if (resUpdateAddFollower.data) {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditOpportunity/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`)
        .then((response) => {
          setPreviousFollower(response.data.opportunity_followers);
          setadmin_timeline_data(response.data.timeLine);
          setadmin_overview_data(response.data.adminOverview);
        })
        .catch((err) => {
          // console.log('eerr', err);
        });
    }
  }, [resUpdateAddFollower]);

  const deleteLeadAssign = (v) => {
    let formdata = new FormData();
    formdata.append("userType", "unAssign");
    formdata.append("unAssign", v);
    formdata.append("uLead", id);
    let deldata = formdata;
    apiMethodDelAssign("postDeleteLeadAssign", deldata);
    setassignLeadName(false);
  };
  useEffect(() => {
    if (res4.data) {
      reRenderTimeline()
    }
  }, [res4.data])
  const delAddFollower = (item) => {
    const formdata = new FormData();
    formdata.append("uopp1", editLead.opportunity_data.pipeline);
    formdata.append("uopp", id);
    formdata.append("mode", "Opp_lead");
    formdata.append("unFollow", item.id);
    apiMethod4("postDltFollowersOpp", formdata);
    setPreviousFollower(previousFollower.filter((val) => val.id !== item.id));
  };
  const delAddContact = (item) => {
    const formdata = new FormData();
    formdata.append("userType", "updateOpptContacts");
    formdata.append("set", id);
    formdata.append("setP", editLead.opportunity_data.pipeline);
    formdata.append("query", item.id);
    apiMethod4("postContactSearchDeleted", formdata);
    setPreviousContact(previousContact.filter((val) => val.id !== item.id));
  };
  const updateAddFollower = () => {
    const formdata = new FormData();
    formdata.append("uLeadType", "oppFollwer");
    formdata.append("uLead", id);
    formdata.append("uLeadPipe", editLead.opportunity_data.pipeline);
    let selectedFollowerId =
      addselectedFollower.length &&
      addselectedFollower.map((item) => {
        return item.key;
      });
    addselectedFollower.length &&
      selectedFollowerId.map((v, i) => {
        formdata.append(`userLead[${i}]`, v);
      });
    apiMethodupdateAddFollower("postAddFollowersOpp", formdata);
    //
  };
  const updateAddContact = () => {
    const formdata = new FormData();
    formdata.append("userType", "updateOpptContacts");
    formdata.append("set", id);
    formdata.append("setP", editLead.opportunity_data.pipeline);
    let selectedContactId =
      addselectedContact.length &&
      addselectedContact.map((item) => {
        return item.key;
      });
    // console.log(selectedContactId);
    formdata.append("query", selectedContactId.join());
    // addselectedContact.length && selectedContactId.map((v, i) => {
    //     formdata.append(`userLead[${i}]`, v);
    // });
    apiMethodupdateAddContact("postContactSearchUpdate", formdata);
    // //
  };
  const deleteAssetFile = (item) => {
    swal({
      text: 'Are you sure to delete the File?',
      icon: "warning",
      buttons: ["Close", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let field = {
          general: "delete_file",
          fieldId: item.db_file_id,
          filelead: item.file_lead,
          filename: item.file_name,
        };
        apiMethodDeleteAsset("postDeleteLeadAssets", field);
        setAssetsFile({
          ...assetsFile,
          data: assetsFile.data.filter((its) => its.db_file_id != item.db_file_id),
        });
      }
    })
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
    // formdata.append("uLead", id);
    apiMethodAddFollower("postSpecifiesUsers", formdata);
  };
  const onSearchFollowerAdd2 = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearchPros");
    formdataOwner.append("query", v);
    apiMethodAddContact("postContactSearch", formdataOwner);
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

  const handleRemoveActionRow = (item) => {
    setactionArr(actionArr.filter((val) => val.id !== item.id));
  };

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

  ///////////////////////////////////Media//////////////////////////////
  const subbbMedia = async (v, v2) => {
    setcategoryMedia(v);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));
    apiMethodPostCategoryMedia("postViewSubCategory", formdata);
  };
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

  useEffect(() => {
    if (category_select_list1Media) {
      let data = category_select_list1Media.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setCategory_select_listMedia(data);
      console.log(data, "sda");
    }
  }, [category_select_list1Media]);

  const submitbutton = {
    class: "btn btn-primary update_button_lead",
    text: "Update Info",
  };
  let reqName = ["opportunity_title", "opportunity_value"];
  let reqNameObj = [
    {
      label: "Opportunity Title",
      name: "opportunity_title",
    },
    {
      label: "Opportunity Value",
      name: "opportunity_value",
    },
  ];
  function handleSubmit(values) {
    let opp_valuestring = values.opportunity_value.toString();
    values.opportunity_value = opp_valuestring;
    values.opportunity_lost_reason = lostStageValue;
    let allValues = { ...initialValues, ...values, ...phoneNumber };

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
        } else if (item === "opportunity_stage") {
          formdata.append("opportunity_stage", stageValue);
        } else if (item === "opportunity_description") {
          formdata.append("opportunity_description", descriptionContent);
        } else {
          formdata.append(item, allValues[item]);
        }
      }
      imageMedia && formdata.append("upload_media", imageMedia);
      image2 && formdata.append("upload_file", image2);
      selectTag && formdata.append("tags[]", selectTag);
      followerSelectValue && formdata.append("file_follw", followerSelectValue);
      followerSelectValueMedia &&
        formdata.append("media_follw", followerSelectValueMedia);
      if (followerSelectValueMedia == "Role") {
        selectedFollowerMediaRole.map((v, i) => {
          formdata.append(`media_followers[${i}]`, v);
        });
      }
      if (followerSelectValueMedia == "Custom") {
        console.log(selectedFollowerMedia);
        selectedFollowerMedia.length &&
          selectedFollowerMedia.map((v, i) => {
            formdata.append(`md_follw[${i}]`, v);
          });
      }
      if (followerSelectValue == "Role") {
        selectedFollower.length &&
          selectedFollower.map((v, i) => {
            formdata.append(`fl_follw[${i}]`, v);
          });
      }
      if (followerSelectValue == "Custom") {
        selectedFollower.length &&
          selectedFollower.map((v, i) => {
            formdata.append(`file_followers[${i}]`, v);
          });
        console.log(followerSelectValue);
      }
      category.length &&
        category.map((v, i) => {
          formdata.append(`file_cat[${i}]`, v);
        });
      categoryMedia.length &&
        categoryMedia.map((v, i) => {
          formdata.append(`media_cat[${i}]`, v);
        });
      subCat_selected.length &&
        subCat_selected.map((v, i) => {
          formdata.append(`file_subcat[${i}]`, v);
        });
      subCat_selectedMedia.length &&
        subCat_selectedMedia.map((v, i) => {
          formdata.append(`media_subcat[${i}]`, v);
        });
      // image2 && formdata.append("upload_file", image2);
      // followerSelectValue && formdata.append("file_follw", followerSelectValue);
      // selectedFollower.length && selectedFollower.map((v, i) => { formdata.append(`file_followers[${i}]`, v); });
      // category.length && category.map((v, i) => { formdata.append(`file_cat[${i}]`, v); });
      // subCat_selected.length && subCat_selected.map((v, i) => { formdata.append(`file_subcat[${i}]`, v); });
      formdata.append("submit_lead", "submit_lead_");
      let bodyContent = formdata;
      apiMethod("postUpdateOpportunity", bodyContent);
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
        window.location.reload(true)
        // window.location.reload(true);
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
    if (Array.isArray(resStage?.data)) {
      setOpportunityStageList(resStage?.data);
    }
  }, [resStage?.data]);
  useEffect(() => {
    if (
      resLostReason.data &&
      !resLostReason.data.message &&
      editLead &&
      !editLead.message
    ) {
      // console.log(resLostReason.data);
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
  //         // setEditLeadFeild(res2.data.all_fields);
  //     }
  // }, [res2.data]);

  if (datas && !datas.message) {
    var initialValues = datas.opportunity_data;
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
    // console.log(e);
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
  const handleEditorChange1 = (event, editor) => {
    const data = editor.getData();
    setDescriptionContent(data);
  };

  const addNote = () => {
    let formdata = new FormData();
    formdata.append("op_id", id);
    formdata.append("submit_lead", "submit_lead");
    formdata.append("opportunity_notes", "true");
    formdata.append("notes", content);
    privateNote && formdata.append("private_note", "private_note");
    // privateNote.target && console.log(content, privateNote.target.value);
    apiMethodAddNote("postNotesUpdatedOpportunity", formdata);
    setContent("");
  };

  useEffect(() => {
    if (resAddNote.data) {
      if (resAddNote.data && !resAddNote.data.message) {
        toast.success("Successfully Updated!");
        // console.log(resAddFollower.data);
        reRenderTimeline()
        // setAssetsNotes(response.data.assets_notes)
        setAssetsNotes(resAddNote.data);
      } else if (resAddNote.data.message === "Empty Note") {
        toast.error(resAddNote.data.message);
      }
      // setAddfollower
    }
  }, [resAddNote.data]);

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
  const handleCorrValue = (id, value, type) => {
    // console.log(type);
    let updateValue = [...correlArr];
    updateValue[id].firsValue = value;
    updateValue[id].type = type;
    setcorrelArr(updateValue);
  };

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

  const handleStageChange = (value) => {
    let formData = new FormData();
    setStageValue(value);
    formData.append("query", value);
    formData.append("queryP", resStage?.data?.[0]?.pipeline_id);
    formData.append("type", "getCustomFields");
    formData.append("mode", "opportunities");
    formData.append("mdType", "Opportunity");
    formData.append("queryType", "add");
    apiMethod2("postCustomFieldsOpportunity", formData);
    setLostStage(
      opportunityStageList.filter((item) => item.id === value)[0].wonlost ===
      "lost" && true
    );
  };
  useEffect(() => {
    if (res2.data) {
      setEditLeadFeild(res2?.data?.all_fields);
      console.log(res2?.data, "ggg");
    }
  }, [res2.data]);

  if (loading || loading5 || respremetion.isLoading) return <Loader />;

  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunities_fname == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("fname"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunities_lead_source == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("lead_leadsource"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.opportunities?.fields?.opportunities_contact_type == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("type_of_contact"), 1);
  }
  return (
    editLead &&
    !editLead.message && (
      <>
        <div className="editLeadForm">
          <div className="container-fluid">
            <div className="row row-cards">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="media">
                      <div className="media-body">
                        <h5 className="m-0">{initialValues.fullname}</h5>
                        <p>
                          Assigned to:{" "}
                          {`${datas?.opportunity_data?.assigned_to} (${datas?.opportunity_data?.assigned_to_role_name})`}
                          <br />
                          Opportunity Owner:{" "}
                          {`${datas?.opportunity_data?.owner_to_name} (${datas?.opportunity_data?.assigned_to_role_name})`}
                        </p>
                      </div>
                    </div>
                    <div className="score">
                      {datas?.opportunity_data?.opportunity_value}
                    </div>
                    <div className="card-options">
                      <div className="columndd">
                        <div>
                          <label className="form-label">
                            Stage:{" "}
                            {Translation(
                              translations,
                              datas?.opportunity_data?.stage_name
                            )}
                            <br />
                          </label>
                        </div>

                        {datas?.opportunity_data?.wonlost === "lost" && (
                          <div>
                            <label className="form-label">
                              {datas?.opportunity_data?.stage_name} Reason:
                              <br />
                              {Array.isArray(datas?.lost_stage) &&
                                datas?.lost_stage?.[0]?.reason_description}
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
                            <i className="dropdown-icon fa fa-copy"></i>Create
                            Action
                          </Link>
                          <Link className="dropdown-item">
                            <i className="dropdown-icon fa fa-folder"></i>Create
                            Opportunity
                          </Link>
                          <Link className="dropdown-item">
                            <i className="dropdown-icon fa fa-edit"></i>Create
                            Meeting
                          </Link>
                          <Link className="dropdown-item">
                            <i className="dropdown-icon fa fa-trash"></i>Create
                            Project
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                              <b>{Translation(translations, "Assign to:")}</b>
                            </label>
                            {Translation(
                              translations,
                              `${editLead.opportunity_data.assigned_to_name} (${editLead.opportunity_data.assigned_to_role_name})`
                            )}{" "}
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">
                              <b>
                                {" "}
                                {Translation(
                                  translations,
                                  "Opportunity Owner:"
                                )}
                              </b>{" "}
                            </label>
                            {Translation(
                              translations,
                              `${editLead.opportunity_data.owner_to_name} (${editLead.opportunity_data.assigned_to_role_name})`
                            )}{" "}
                          </div>
                          <hr />

                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_title === "true" ? (
                            <div className="col-md-12">
                              <FormControl
                                className="form-control my-1"
                                name="opportunity_title"
                                label={Translation(
                                  translations,
                                  `Opportunity Title`
                                )}
                                placeholder={Translation(
                                  translations,
                                  `Opportunity Title`
                                )}
                                control="input"
                                defaultValue={initialValues.opportunity_title}
                              />
                            </div>
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_opp_title === "-1" ? (
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(
                                    translations,
                                    "Opportunity Title"
                                  )}
                                </label>
                                <p className="mb-0">
                                  {Translation(
                                    translations,
                                    `${initialValues.opportunity_title}`
                                  )}
                                </p>{" "}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_value === "true" ? (
                            <div className="col-md-12">
                              <FormControl
                                className="form-control my-1"
                                name="opportunity_value"
                                min={0}
                                step="any"
                                type={"number"}
                                label={Translation(
                                  translations,
                                  `Opportunity Value`
                                )}
                                placeholder={Translation(
                                  translations,
                                  `Opportunity Value`
                                )}
                                control="input"
                                defaultValue={initialValues.opportunity_value}
                              />
                            </div>
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_opp_value === "-1" ? (
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(
                                    translations,
                                    "Opportunity Value"
                                  )}
                                </label>
                                <p className="mb-0">
                                  {Translation(
                                    translations,
                                    `${initialValues.opportunity_value}`
                                  )}
                                </p>{" "}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_stage === "true" ? (
                            <div className="col-md-12">
                              {/* {console.log(initialValues.opportunity_stage)} */}
                              <FormControl
                                className="form-control my-1"
                                selectList={opportunityStageList}
                                label={"Opportunity Stage"}
                                name="opportunity_stage"
                                value={stageValue}
                                control="select_custom_options"
                                custom_label_name="name"
                                customer_value_name="id"
                                onChange={(event) =>
                                  handleStageChange(event.target.value)
                                }
                              />
                            </div>
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_opp_stage === "-1" ? (
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(
                                    translations,
                                    "Opportunity Stage"
                                  )}
                                </label>
                                <p className="mb-0">
                                  {Translation(
                                    translations,
                                    `${initialValues.opportunity_stage}`
                                  )}
                                </p>{" "}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin && lostStage ? (
                            <div className="col-md-12">
                              <FormControl
                                className="form-control my-1"
                                selectList={lostReason}
                                value={lostStageValue}
                                label={"Lost Reason"}
                                name="opportunity_lost_reason"
                                control="select_custom_options"
                                custom_label_name="reason_description"
                                customer_value_name="reason_id"
                                onChange={(event) =>
                                  setLostStageValue(event.target.value)
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          {leadPermission?.super_admin ? (
                            <div className="col-md-12">
                              <FormControl
                                className="form-control my-1"
                                selectList={
                                  Array.isArray(statusData) && statusData
                                }
                                defaultValue={initialValues.status_id}
                                label={"Status"}
                                name="opportunity_status"
                                control="select_custom_options"
                                custom_label_name="status_name"
                                customer_value_name="status_id"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_forcastedate === "true" ? (
                            <div className="col-md-12">
                              <FormControl
                                // options={body.split(",")}
                                type="date"
                                className="form-control my-1"
                                name="forecasted_close_date"
                                label={Translation(
                                  translations,
                                  `Forcast Close Date`
                                )}
                                defaultValue={
                                  new Date(initialValues.forecasted_close_date)
                                    .toISOString()
                                    .split("T")[0]
                                }
                                control="input"
                              />
                            </div>
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_opp_forcastedate === "-1" ? (
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(
                                    translations,
                                    "Forcast Close Date"
                                  )}
                                </label>
                                <p className="mb-0">
                                  {Translation(
                                    translations,
                                    `${initialValues.forecasted_close_date}`
                                  )}
                                </p>{" "}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_description === "true" ? (
                            <div className="col-md-12">
                              {/* <FormControl
                                                                className={"form-control my-1"}
                                                                name='opportunity_description'
                                                                label={Translation(translations, `Description`)}

                                                                control="textarea"
                                                            /> */}
                              <label className="form-label">Description</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={handleEditorChange1}
                              />
                            </div>
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_opp_description === "-1" ? (
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="form-label">
                                  {Translation(translations, "Description")}
                                </label>
                                <p className="mb-0">
                                  {Translation(
                                    translations,
                                    `${initialValues.opportunity_description}`
                                  )}
                                </p>{" "}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <hr />

                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_assignto === "true" ? (
                            <div className="col-sm-12 mb-3">
                              <label className="form-label">
                                {Translation(translations, "Lead Assign to")}
                              </label>
                              <div ref={ownerRef} className="searchDropDown">
                                <input
                                  type="text"
                                  className="form-control"
                                  ref={inputElement}
                                  name="contact_owner"
                                  value={searchval}
                                  onChange={(e) => setSearchval(e.target.value)}
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
                                            onClick={() => handleClick(item)}
                                          >
                                            {Translation(
                                              translations,
                                              `${item.uname} (${item?.role_name})`
                                            )}
                                          </li>
                                        );
                                      })
                                    ) : (
                                      <li>
                                        {Translation(
                                          translations,
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
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_assignto === "-1" ? (
                            <label className="form-label">
                              {Translation(translations, "Lead Assign to")}
                            </label>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_owner === "true" ? (
                            <div className="col-sm-12 mb-3">
                              <label className="form-label">
                                {Translation(translations, "Oppotunity Owner")}
                              </label>
                              <div ref={ownerRef} className="searchDropDown">
                                <input
                                  type="text"
                                  className="form-control"
                                  ref={inputElement}
                                  name="contact_owner"
                                  value={searchval2}
                                  onChange={(e) =>
                                    setSearchval2(e.target.value)
                                  }
                                />
                                <button
                                  className="nav-link clickButton"
                                  type="button"
                                  id="dropdownMenuButton"
                                  onClick={() => handleList2()}
                                >
                                  <FaSearch />
                                </button>
                              </div>
                              <div
                                className={`dropDownCustom ${listOpen2 && "active"
                                  }`}
                              >
                                {resowner2.data && (
                                  <ul className="list">
                                    {resowner2.isLoading ? (
                                      ""
                                    ) : !resowner2.data.message ? (
                                      resowner2.data.map((item, index) => {
                                        return (
                                          <li
                                            key={index}
                                            onClick={() => handleClick2(item)}
                                          >
                                            {Translation(
                                              translations,
                                              `${item.uname} (${item?.role_name})`
                                            )}
                                          </li>
                                        );
                                      })
                                    ) : (
                                      <li>
                                        {Translation(
                                          translations,
                                          `${resowner2.data.message}`
                                        )}
                                      </li>
                                    )}
                                  </ul>
                                )}
                              </div>
                              <input
                                type="hidden"
                                name={"owner2"}
                                value={ownerhidden2}
                              />
                            </div>
                          ) : leadPermission?.opportunities?.fields
                            ?.opportunity_opp_owner === "-1" ? (
                            <label className="form-label">
                              {Translation(translations, "Oppotunity Owner")}
                            </label>
                          ) : (
                            ""
                          )}
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
                        {/* {console.log(editLeadFeild, 'fdssdf>>>>>>>>>>>>>>>>>>>')} */}
                        <div className="card-body">
                          {editLeadFeild && (
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
                                          {item.replace(/_/g, " ")}
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
                                                    let labelName = `opportunity_${label.replaceAll(
                                                      " ",
                                                      "_"
                                                    )}`;
                                                    if (
                                                      field_required === "yes"
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
                                                      initialValues[
                                                        label.replaceAll(
                                                          " ",
                                                          "_"
                                                        )
                                                      ] =
                                                        type === "checkbox"
                                                          ? value.split(",")
                                                          : value;
                                                    }
                                                    return (
                                                      <div key={j}>
                                                        {(() => {
                                                          if (
                                                            type === "select"
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
                                                                    field_required ===
                                                                    "yes" &&
                                                                    true
                                                                  }
                                                                  label={Translation(
                                                                    translations,
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
                                                                        translations,
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
                                                                    translations,
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
                                                                        translations,
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
                                                                    translations,
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
                                                                        translations,
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
                                                                    translations,
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
                                                                        translations,
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
                                                                    translations,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
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
                                                                        translations,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          }



                                                          else if (
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
                                                                    translations,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  placeholder={Translation(
                                                                    translations,
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
                                                                        translations,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          }
                                                          else if (
                                                            type == "number"
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
                                                                    translations,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  placeholder={Translation(
                                                                    translations,
                                                                    `${label}`
                                                                  )}
                                                                  control="input"
                                                                  type={"number"}
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
                                                                        translations,
                                                                        `${label}`
                                                                      )}
                                                                    </b>
                                                                  </label>
                                                                  <p>{value}</p>
                                                                </div>
                                                              );
                                                            }
                                                          }
                                                          else if (
                                                            type == "time"
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
                                                                    translations,
                                                                    `${label}`
                                                                  )}
                                                                  name={objname}
                                                                  placeholder={Translation(
                                                                    translations,
                                                                    `${label}`
                                                                  )}
                                                                  control="input"
                                                                  type={"time"}
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
                                                                        translations,
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
                            className="btn btn-icon btn-primary btn-success f"
                            onClick={() => setPrivateNote(!privateNote)}
                          >
                            {privateNote ? (
                              <HiOutlineLockClosed />
                            ) : (
                              <HiOutlineLockOpen />
                            )}
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
                              data={descriptionContent}
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
                        {Array.isArray(assetsnotes) &&
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
                                        <strong>{<Handle_convert_system_timezone
                                          dateAndTime={item.note_date}
                                        />}</strong>
                                      </div>
                                      <div className="float-right">
                                        Posted By{" "}
                                        <small className="text-muted">
                                          {item.f_name +
                                            " " +
                                            item.l_name +
                                            " " +
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
                          <i className="fa fa-users text-muted"></i> Projects
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

                      <div className="card-body">
                        {Array.isArray(editLead?.project) &&
                          editLead?.project.map((item, i) => {
                            return (
                              <div key={i} className="col-md-12 col-sm-12">
                                {" "}
                                <div className="c2_own">
                                  <ul className="right_chat list-unstyled p-0 right_chat_vl">
                                    <li className="online mb-2">
                                      <Link
                                        to={`/${config.ddemoss}view/project/${item.prj_id}`}
                                      >
                                        <a
                                          href="#"
                                          className="cc_cls"
                                          data-row="12"
                                        >
                                          <i className="fa-solid fa-xmark"></i>
                                        </a>
                                        <div
                                          className="media"
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <i
                                            style={{ marginRight: 8 }}
                                            className={item?.pipeline_icon}
                                          ></i>
                                          <div className="media-body">
                                            <span className="name">
                                              {item?.project_title}{" "}
                                            </span>
                                            <div className="message">
                                              {item?.name}
                                            </div>
                                            {item.start_date && (
                                              <span className="message">
                                                {item.start_date}
                                              </span>
                                            )}
                                            <span className="dashsymbol">
                                              {" "}
                                              | - |{" "}
                                            </span>
                                            {item.end_date && (
                                              <span className="message">
                                                {item.end_date}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>{" "}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-users text-muted"></i>{" "}
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
                                leadPermission?.opportunities?.fields
                                  ?.opportunity_opp_tags === "true" ? (
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
                              ) : leadPermission?.opportunities?.fields
                                ?.opportunity_opp_tags === "-1" ? (
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        {datas?.opportunity_data?.tags}
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
                        {leadPermission?.super_admin ||
                          leadPermission?.opportunities?.fields
                            ?.opportunity_opp_fileupload === "true" ? (
                          <div className="row clearfix">
                            <div className="col-md-12 mb-2">
                              <File
                                onUpload={setImage2}
                                label={Translation(translations, "Upload File")}
                                name={"upload_file"}
                                imageObj={image2}
                                typeFile_name={"typeFile"}
                                typeFile=".txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.csv,.json,.xml,.html,.htm,.js,.css,.php,.cpp,.c,.java,.py,.rb,.sql,.log"
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
                              <div className="my-2">
                                <div className="col-12">
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
                                    style={{ width: "100%", height: 40 }}
                                    placeholder={"type follower name"}
                                  >
                                    {resowner.data &&
                                      !resowner.data.message &&
                                      resowner.data.map(
                                        ({ uname, id, text }) => (
                                          <Select.Option value={uname} key={id}>
                                            {uname}
                                          </Select.Option>
                                        )
                                      )}
                                  </Select>
                                </div>
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
                        ) : (
                          ""
                        )}
                        {!assetsFile ? (
                          <Skeleton count={5} />
                        ) : assetsFile.message != "No Data Found" ? (
                          <div className="table-responsive">
                            {leadPermission?.super_admin ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_fileupload === "true" ||
                              leadPermission?.opportunities?.fields
                                ?.opportunity_opp_fileupload === "-1" ? (
                              <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0 ">
                                {assetFileMedia && (
                                  <thead>
                                    <tr>
                                      <th> </th>
                                      <th>
                                        {Translation(translations, "Name")}
                                      </th>
                                      <th>
                                        {Translation(
                                          translations,
                                          "Share With"
                                        )}
                                      </th>
                                      <th>
                                        {Translation(translations, "Owner")}
                                      </th>
                                      <th>
                                        {Translation(
                                          translations,
                                          "Last Update"
                                        )}
                                      </th>
                                      <th>
                                        {Translation(translations, "File Size")}
                                      </th>
                                      <th>
                                        {Translation(translations, "Action")}
                                      </th>
                                    </tr>
                                  </thead>
                                )}
                                <tbody>
                                  {Array.isArray(assetsFile.data) &&
                                    assetsFile.data.map((item, index) => {
                                      return item.file_type === "Document" ? (
                                        assetFileMedia ? (
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
                                                    translations,
                                                    `${item.file_name}`
                                                  )}
                                                </a>
                                              </span>
                                            </td>
                                            <td>
                                              {Translation(
                                                translations,
                                                `${item.file_name}`
                                              )}
                                            </td>
                                            <td className="width100">
                                              <span>
                                                {" "}
                                                {Translation(
                                                  translations,
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
                                                  translations,
                                                  "23, 2023"
                                                )}{" "}
                                              </span>
                                            </td>
                                            <td className="width100 text-center">
                                              <span className="size">
                                                {Translation(
                                                  translations,
                                                  `${item.file_size}`
                                                )}{" "}
                                              </span>
                                            </td>
                                            <td className="width100">
                                              <span>
                                                <EditLeadAssetEditModal
                                                  item={item}
                                                  id={id}
                                                  follower_select_list={follower_select_list}
                                                  category_data={
                                                    category_select_list
                                                  }
                                                  obj={redata?.CEO}
                                                  resowner={resowner}
                                                  updatedData={setAssetsFile}
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
                                        )
                                      ) : (
                                        <></>
                                      );
                                    })}
                                  <tr>  {
                                    assetsFile.data &&
                                    Array.isArray(assetsFile.data) &&
                                    assetsFile.has_more_data &&
                                    <button type="button" className="btn btn-primary" onClick={handle_File_more}>Load More</button>
                                  }</tr>
                                </tbody>
                              </table>
                            ) : (
                              ""
                            )}
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
                            {Translation(translations, "Contacts")}
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
                                  (option?.children ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                onSearch={(v) => {
                                  onSearchFollowerAdd2(v);
                                }}
                                onChange={(v1, v2) => {
                                  setAddselectedContact(v2);
                                }}
                                style={{ width: "100%", height: 40 }}
                                placeholder={"Search follower name"}
                              >
                                {addContact.length &&
                                  addContact.map(({ fname, id, lname, email }) => (
                                    <Select.Option value={id} key={id}>
                                      {fname + " " + lname}
                                    </Select.Option>
                                  ))}
                              </Select>
                              <button
                                type="button"
                                className="my-3 btn w-100 btn-primary"
                                onClick={() => {
                                  updateAddContact();
                                }}
                              >
                                Update Contact
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                          {leadPermission?.super_admin ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_contact === "true" ||
                            leadPermission?.opportunities?.fields
                              ?.opportunity_opp_contact === "-1" ? (
                            <ul className="right_chat list-unstyled p-0 right_chat_vl">
                              {Array.isArray(previousContact) &&
                                previousContact.map((v, i) => {
                                  if (v) {
                                    return (
                                      <li
                                        className="online mb-2 d-flex justify-between w-100 overflow-auto text-wrap"
                                        key={i}
                                      >
                                        <Link
                                          to={
                                            v.module &&
                                            `/${config.ddemoss
                                            }${v.module.toLowerCase()}/view/${v.id
                                            }`
                                          }
                                        >
                                          <div className="media">
                                            <img
                                              className="media-object "
                                              src={
                                                v.avatar &&
                                                  v.avatar.includes("http")
                                                  ? v.avatar
                                                  : `${config.baseurl2}${v.avatar} `
                                              }
                                              alt=""
                                            />
                                            <div className="media-body">
                                              <span className="name">
                                                {v.fname}
                                              </span>
                                              <span className="name">
                                                {v.email}
                                              </span>
                                              <span className="badge badge-outline status"></span>
                                            </div>
                                          </div>
                                        </Link>
                                        <a
                                          onClick={() => {
                                            delAddContact(v);
                                          }}
                                          className="cc_cls"
                                          data-row="184"
                                        >
                                          <i className="fa-solid fa-xmark"></i>
                                        </a>
                                      </li>
                                    );
                                  }
                                  // console.log(previousFollower[v]);
                                })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="follower">
                      <div className="card leadCards">
                        <div className="card-header d-flex align-center">
                          <h3 className="card-title">
                            {Translation(translations, "Followers")}
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
                            filterOption={true}
                            onSearch={(v) => {
                              onSearchFollowerAdd(v);
                            }}
                            onChange={(v1, v2) => {
                              setAddselectedFollower(v2);
                            }}
                            style={{ width: "100%", height: 40 }}
                            placeholder={"Search follower name"}
                          >
                            {addFollower.length &&
                              addFollower.map(({ uname, id, role_name }) => (
                                <Select.Option value={uname} key={id}>
                                  {uname + " (" + role_name + ")"}
                                </Select.Option>
                              ))}
                          </Select>
                          <button
                            type="button"
                            className="my-3 btn w-100 btn-primary"
                            onClick={() => {
                              updateAddFollower();
                            }}
                          >
                            Update Follower
                          </button>
                          <div className="">
                            {Array.isArray(previousFollower) &&
                              previousFollower.map((v, i) => {
                                if (v) {
                                  return (
                                    <div className="chip my-2" key={i}>
                                      <span
                                        className="avatar"
                                        style={{
                                          backgroundImage: `url(${v.avatar.includes(`http`)
                                            ? v.avatar
                                            : `${config.baseurl2}${v.avatar}`
                                            })`,
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
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-users text-muted"></i> Calendar
                          <small>Detail Over Time { (Array.isArray(datas.clanderEventsName)&&(datas.clanderEventsName).length>0)? (datas.clanderEventsName.filter(eve=>eve.calendar_default==="1")[0])?`( ${( datas.clanderEventsName.filter(eve=>eve.calendar_default==="1"))[0].calendar_name} )`:"":""}</small>
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
                        <EditLeadCalender
                           Forecast={datas?.opportunity_data?.forecasted_close_date}
                          module="opportunity"
                          dataOpportunities={datas?.opportunity} idd={id} data={datas?.clanderEventsData} />
                        <br />
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <BsFillBookmarkFill /> Actions <small> </small>
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
                        <EditLeadAction assignId={datas?.opportunity_data?.assigned_to} modules={"Opportunity"} Id={id} actionData={datas} datasAction={initialValues} />
                        <div className="row">
                          {Array.isArray(actionL) &&
                            <ActionCard
                              lists={actionL}
                              actionData={datas}
                            />
                          }
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <FaHandshake />
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
                        <EditLeadMeeting assignId={datas?.opportunity_data?.assigned_to} modules={"Opportunity"} Id={id} meetingData={datas} datasMeeting={initialValues} />
                        <div className="row">
                          {Array.isArray(meetingL) &&
                            <MeetingCard
                              lists={meetingL}
                              actionData={datas}
                            />}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <FaFolder /> Media <small> </small>
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
                              label={Translation(translations, "Upload Media")}
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
                              firstSelect={"--select--"}
                              onChange={(e) =>
                                setfollowerSelectValueMedia(e.target.value)
                              }
                            ></FormControl>
                          </div>
                          {followerSelectValueMedia == "Custom" && (
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
                                    let a = v2.map((item) => {
                                      return item.key;
                                    });
                                    setselectedFollowerMedia(a);
                                  }}
                                  style={{ width: "100%", height: 40 }}
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
                          )}
                          {followerSelectValueMedia == "Role" && (
                            <div>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setselectedFollowerMediaRole([e.target.value])
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
                                subbbMedia(v, v2);
                              }}
                              style={{ width: "100%", height: 40 }}
                              placeholder={"type follower name"}
                              filterOption={(input, option) =>
                                (option?.children ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {category_select_listMedia.length &&
                                category_select_listMedia.map(
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
                                setsubCat_selectedMedia(v);
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
                              {subCategoryselectMedia.length &&
                                subCategoryselectMedia.map(
                                  ({ label, value }) => (
                                    <Select.Option value={value} key={value}>
                                      {label}
                                    </Select.Option>
                                  )
                                )}
                            </Select>
                          </div>
                        </div>
                        {!media_list.data ? (
                          ""
                        ) : media_list.message != "No Data Found" ? (
                          <div className="table-responsive">
                            <div className="row row-cards">
                              {media_list &&
                                Array.isArray(media_list.data) &&
                                media_list.data.map((items, i) => {
                                  const noteDate = moment(
                                    items.file_created_date
                                  );
                                  const currentDate = moment();
                                  const diffInMinutes = currentDate.diff(
                                    noteDate,
                                    "minutes"
                                  );
                                  const diffInHours = currentDate.diff(
                                    noteDate,
                                    "hours"
                                  );
                                  const diffInDays = currentDate.diff(
                                    noteDate,
                                    "days"
                                  );
                                  const diffInMonths = currentDate.diff(
                                    noteDate,
                                    "months"
                                  );
                                  const diffInYears = currentDate.diff(
                                    noteDate,
                                    "years"
                                  );
                                  let relativeDate = "";
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
                                  return items.file_type === "Media" ? (
                                    <div
                                      className="col-sm-6 col-lg-5 card_margin_left"
                                      key={i}
                                    >
                                      <div className="card card__media p-1 card-custom">
                                        <Media_image_display data={items}>
                                          <img
                                            className="media_image_height"
                                            src={
                                              items.file_value &&
                                                items.file_value.includes("http")
                                                ? items.file_value
                                                : `${config.baseurl2}${items.file_value} `
                                            }
                                            alt=""
                                          />
                                        </Media_image_display>
                                        {/* <img src={errorImage} alt="" /> */}
                                        <div className="d-flex align-items-center px-2 mt-3">
                                          <img
                                            style={{
                                              width: 50,
                                              height: 50,
                                              borderRadius: 25,
                                              marginRight: "10px",
                                            }}
                                            src={
                                              items?.fileOwnerData[0]?.avatar &&
                                                items?.fileOwnerData[0]?.avatar.includes(
                                                  "http"
                                                )
                                                ? items?.fileOwnerData[0]
                                                  ?.avatar
                                                : `${config.baseurl2}${items?.fileOwnerData[0]?.avatar} `
                                            }
                                            alt=""
                                          />
                                          <div>
                                            <div>
                                              {" "}
                                              {Translation(
                                                translations,
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
                                                translations,
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
                                                category_data={
                                                  category_select_list
                                                }
                                                updatedData={setmedia_list}
                                                file_type={"media"}
                                                module={"Opportunity"}
                                              />
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  );
                                })}
                            </div>
                          </div>
                        ) : (
                          " No Data"
                        )}
                      </div>
                      {
                        media_list.data &&
                        Array.isArray(media_list.data) &&
                        media_list.has_more_data &&
                        <button type="button" className="btn btn-primary w-100" onClick={handleMediaMOre}>Load More</button>
                      }
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
                          leadPermission?.opportunities?.fields?.opportunity_admininfo ==
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
                                  {Translation(translations, "Overview")}
                                </MDBTabsLink>
                              </MDBTabsItem>
                              <MDBTabsItem>
                                <MDBTabsLink
                                  onClick={() =>
                                    handleJustifyClickAdminTab("tab2")
                                  }
                                  active={admintab === "tab2"}
                                >
                                  {Translation(translations, "Timeline")}
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
                                                  Opportunity Stage Dates
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
                                                    {admin_overview_data && admin_overview_data
                                                      .opportunityStageDates &&
                                                      !admin_overview_data
                                                        .opportunityStageDates
                                                        .message &&
                                                      Object.keys(
                                                        admin_overview_data
                                                          .opportunityStageDates
                                                      ).map((item, index) => {
                                                        return (
                                                          <tr key={index}>
                                                            <td>
                                                              {
                                                                admin_overview_data
                                                                  ?.opportunityStageDates[
                                                                  item
                                                                ]?.name
                                                              }
                                                            </td>
                                                            <td>
                                                              <HandleConvertTimeOnlyDate
                                                                dateAndTime={admin_overview_data
                                                                  ?.opportunityStageDates[
                                                                  item
                                                                ]?.assign_on
                                                                }
                                                              />
                                                            </td>
                                                            <td>
                                                              {
                                                                admin_overview_data
                                                                  ?.opportunityStageDates[
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
                                        {/* {datas.adminOverview.adminOverview &&
                                          Object.keys(
                                            datas.adminOverview.adminOverview
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
                                                    <div
                                                      style={{
                                                        textTransform:
                                                          "capitalize",
                                                      }}
                                                      className="h5 mb-0"
                                                    >
                                                      {item.replaceAll(
                                                        "_",
                                                        " "
                                                      )}
                                                    </div>
                                                    <span className="small text-muted">
                                                      {
                                                        datas.adminOverview
                                                          .adminOverview[item]
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                              </li>
                                            ) : (
                                              ""
                                            );
                                          })} */}
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.opportunities
                                              ?.fields[
                                            `opportunity_admin_created_date`
                                            ] === "on") && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Created Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data?.adminOverview?.created_date != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data?.adminOverview?.created_date
                                                        }
                                                      />
                                                      : "----"}
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.opportunities
                                              ?.fields[
                                            `opportunity_admin_updated_date`
                                            ] === "on") && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Updated Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data?.adminOverview?.updated_date != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data?.adminOverview?.updated_date
                                                        }
                                                      />
                                                      : "----"}
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.opportunities
                                              ?.fields[
                                            `opportunity_admin_${admin_overview_data?.adminOverview?.unqualified_date
                                              ?.replaceAll(
                                                " ",
                                                "_"
                                              )}`
                                            ] === "on") && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Unqualified Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data?.adminOverview?.unqualified_date
                                                      != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data?.adminOverview?.unqualified_date

                                                        }
                                                      />
                                                      : "----"}
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.opportunities
                                              ?.fields[
                                            `opportunity_admin_${admin_overview_data?.adminOverview?.unqualified_owner?.replaceAll(
                                              " ",
                                              "_"
                                            )}`
                                            ] === "on") && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Unqualified Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data?.adminOverview?.unqualified_owner != "----"
                                                      ?
                                                      admin_overview_data?.adminOverview?.unqualified_owner

                                                      : "----"}
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}

                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </MDBTabsPane>
                              <MDBTabsPane show={admintab === "tab2"}>
                                <div className="card">
                                  <div className="card-body">
                                    {!admin_timeline_data.message &&
                                      admin_timeline_data.length &&

                                      admin_timeline_data.map((val, i) => {
                                        return (
                                          <div
                                            className="timeline_item "
                                            key={i}
                                          >
                                            <img
                                              className="tl_avatar"
                                              src={
                                                val?.avatar &&
                                                  val?.avatar.includes("http")
                                                  ? val?.avatar
                                                  : `${config.baseurl2}${val?.avatar} `
                                              }
                                              alt=""
                                            />
                                            <span>
                                              <a style={{ color: '#00A9BD' }}>
                                                {" "}
                                                {Translation(
                                                  translations,
                                                  `${val.f_name} ${val.l_name}`
                                                )}
                                              </a>{" "}
                                              ({val.email}){" "}
                                              <small className="float-right text-right">
                                                {" "}
                                                {<Handle_convert_system_timezone
                                                  dateAndTime={val.activity_date_time}
                                                />}{" "}
                                              </small>
                                            </span>
                                            <div className="msg" key={i}>
                                              <div>
                                                {Translation(
                                                  translations,
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
export default EditAllPipelines;

{
  /* <div className="row clearfix">
    <div className="col-lg-4 col-md-12">
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label className="form-label">
                            <b>
                                {Translation(translations, "Assign to:")}

                            </b>
                        </label>
                        {Translation(
                            translations,
                            `${editLead.opportunity_data.assigned_to_name}`)}
                        {" "}
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label">
                            <b>  {Translation(translations, "Opportunity Owner:")}
                            </b>   </label>
                        {Translation(
                            translations,
                            `${editLead.opportunity_data.owner_to_name}`)}
                        {" "}
                    </div>
                    <hr />

                    {leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_contact_type === 'true' ?
                        <div className="col-md-12">
                            <FormControl className="form-control my-1"
                                name="opportunity_title"
                                label={Translation(translations, `Opportunity Title`)}
                                placeholder={Translation(translations, `Opportunity Title`)}
                                control="input"
                                defaultValue={initialValues.opportunity_title}
                            />
                        </div> :
                        leadPermission?.opportunities?.fields?.opportunities_contact_type === '-1' ?
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        {Translation(translations, "Opportunity Title")}
                                    </label>
                                    <p className="mb-0">
                                        {Translation(translations, `${initialValues.opportunity_title}`)}
                                    </p>{" "}
                                </div>
                            </div> :
                            ''

                    }
                    {leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_contact_type === 'true' ?
                        <div className="col-md-12">
                            <FormControl className="form-control my-1"
                                name="opportunity_value"
                                label={Translation(translations, `Opportunity Value`)}
                                placeholder={Translation(translations, `Opportunity Value`)}
                                control="input"
                                defaultValue={initialValues.opportunity_value}
                            />
                        </div> :
                        leadPermission?.opportunities?.fields?.opportunities_contact_type === '-1' ?
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">
                                        {Translation(translations, "Opportunity Value")}
                                    </label>
                                    <p className="mb-0">
                                        {Translation(translations, `${initialValues.opportunity_value}`)}
                                    </p>{" "}
                                </div>
                            </div> :
                            ''

                    }
                    {
                        leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_contact_type === 'true' ?
                            <div className="col-md-12">
                                {console.log(initialValues.opportunity_stage)}
                                <FormControl
                                    className="form-control my-1"
                                    selectList={opportunityStageList && opportunityStageList}

                                    label={"Opportunity Stage"}
                                    name="opportunity_stage"
                                    defaultValue={initialValues.opportunity_stage}
                                    control="select_custom_options"
                                    custom_label_name="name"
                                    customer_value_name="id" />
                            </div> :
                            leadPermission?.opportunities?.fields?.opportunities_contact_type === '-1' ?
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">
                                            {Translation(translations, "Opportunity Stage")}
                                        </label>
                                        <p className="mb-0">
                                            {Translation(translations, `${initialValues.opportunity_stage}`)}
                                        </p>{" "}
                                    </div>
                                </div> :
                                ''}
                    {
                        leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_contact_type === 'true' ?
                            <div className="col-md-12">
                                <FormControl
                                    className="form-control my-1"
                                    selectList={Array.isArray(lostReason) && lostReason}
                                    defaultValue={initialValues.opportunity_lost_reason}
                                    label={"Lost Reason"}
                                    name="opportunity_lost_reason"
                                    control="select_custom_options"
                                    custom_label_name="reason_description"
                                    customer_value_name="reason_description" />
                            </div> :
                            leadPermission?.opportunities?.fields?.opportunities_contact_type === '-1' ?
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">
                                            {Translation(translations, "Lost Reason")}
                                        </label>
                                        <p className="mb-0">
                                            {Translation(translations, `${initialValues.opportunity_lost_reason}`)}
                                        </p>{" "}
                                    </div>
                                </div> :
                                ''}
                    {
                        leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_contact_type === 'true' ?
                            <div className="col-md-12">
                                <FormControl
                                    className="form-control my-1"
                                    selectList={Array.isArray(statusData) && statusData}

                                    defaultValue={initialValues.opportunity_status}
                                    label={"Status"}
                                    name="opportunity_status"
                                    control="select_custom_options"
                                    custom_label_name="status_name"
                                    customer_value_name="status_id" />
                            </div> :
                            leadPermission?.opportunities?.fields?.opportunities_contact_type === '-1' ?
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">
                                            {Translation(translations, "Status")}
                                        </label>
                                        <p className="mb-0">
                                            {Translation(translations, `${initialValues.opportunity_status}`)}
                                        </p>{" "}
                                    </div>
                                </div> :
                                ''}
                    {
                        leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_contact_type === 'true' ?
                            <div className="col-md-12">

                                <FormControl
                                    options={body.split(",")}
                                    type="date"
                                    className="form-control my-1"
                                    name="forecasted_close_date"
                                    label={Translation(translations, `Forcast Close Date`)}
                                    defaultValue={new Date(initialValues.forecasted_close_date).toISOString().split("T")[0]}

                                    control="input"
                                />
                            </div> :
                            leadPermission?.opportunities?.fields?.opportunities_contact_type === '-1' ?
                                <div className="col-md-6">
                                    <div className="form-group">

                                        <label className="form-label">
                                            {Translation(translations, "Forcast Close Date")}
                                        </label>
                                        <p className="mb-0">
                                            {Translation(translations, `${initialValues.forecasted_close_date}`)}
                                        </p>{" "}
                                    </div>
                                </div> :
                                ''}
                    {
                        leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_contact_type === 'true' ?
                            <div className="col-md-12">
                                <FormControl
                                    className={"form-control my-1"}
                                    name='opportunity_description'
                                    label={Translation(translations, `Description`)}

                                    control="textarea"
                                />
                            </div> :
                            leadPermission?.opportunities?.fields?.opportunities_contact_type === '-1' ?
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">
                                            {Translation(translations, "Description")}
                                        </label>
                                        <p className="mb-0">
                                            {Translation(translations, `${initialValues.opportunity_description}`)}
                                        </p>{" "}
                                    </div>
                                </div> :
                                ''}

                    <hr />

                    <div className="col-sm-12 mb-3">
                        <label className="form-label">
                            {Translation(translations, "Lead Assign to")}
                        </label>
                        <div ref={ownerRef} className="searchDropDown">
                            <input
                                type="text"
                                className="form-control"
                                ref={inputElement}
                                name="contact_owner"
                                value={searchval}
                                onChange={(e) => setSearchval(e.target.value)} />
                            <button
                                className="nav-link clickButton"
                                type="button"
                                id="dropdownMenuButton"
                                onClick={() => handleList()}>
                                <FaSearch />
                            </button>
                        </div>
                        <div
                            className={`dropDownCustom ${listOpen && "active"}`}>
                            {resowner.data &&
                                <ul className="list">
                                    {resowner.isLoading ?
                                        "" :
                                        !resowner.data.message ?
                                            resowner.data.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleClick(item)}>
                                                        {Translation(
                                                            translations,
                                                            `${item.uname}`)}
                                                    </li>);
                                            }) :
                                            <li>
                                                {Translation(
                                                    translations,
                                                    `${resowner.data.message}`)}
                                            </li>}
                                </ul>}
                        </div>
                        <input
                            type="hidden"
                            name={"owner"}
                            value={ownerhidden} />
                    </div>
                    <div className="col-sm-12 mb-3">
                        <label className="form-label">
                            {Translation(translations, "Oppotunity Owner")}
                        </label>
                        <div ref={ownerRef} className="searchDropDown">
                            <input
                                type="text"
                                className="form-control"
                                ref={inputElement}
                                name="contact_owner"
                                value={searchval2}
                                onChange={(e) => setSearchval2(e.target.value)} />
                            <button
                                className="nav-link clickButton"
                                type="button"
                                id="dropdownMenuButton"
                                onClick={() => handleList2()}>
                                <FaSearch />
                            </button>
                        </div>
                        <div
                            className={`dropDownCustom ${listOpen2 && "active"}`}>
                            {resowner2.data &&
                                <ul className="list">
                                    {resowner2.isLoading ?
                                        "" :
                                        !resowner2.data.message ?
                                            resowner2.data.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleClick2(item)}>
                                                        {Translation(
                                                            translations,
                                                            `${item.uname}`)}
                                                    </li>);
                                            }) :
                                            <li>
                                                {Translation(
                                                    translations,
                                                    `${resowner2.data.message}`)}
                                            </li>}
                                </ul>}
                        </div>
                        <input
                            type="hidden"
                            name={"owner2"}
                            value={ownerhidden2} />
                    </div>

                </div>
            </div>
        </div>
        <div className="card leadCards">
            <div className="card-header">
                <h3 className="card-title">
                    {Translation(translations, "Tags")}
                </h3>
                <div className="card-options">
                    <Link
                        onClick={(e) => handleToggle(e)}
                        className="card-options-collapse">
                        <i className={`fe fe-chevron-down`} />
                    </Link>
                </div>
            </div>
            {
                leadPermission?.super_admin || leadPermission?.opportunities?.fields?.opportunities_tags === "true" ?
                    <div className="card-body">
                        <div className="row tagss">
                            <Select
                                mode="tags"
                                style={{
                                    width: '100%',
                                    height: '100px'
                                }}
                                onSearch={
                                    (v) => {
                                        onSearchTag(v);
                                    }}
                                value={selectTag}
                                placeholder="Tags"
                                onChange={(v1) => {
                                    setselectTag(v1);
                                }}
                                options={tagoption && tagoption} />
                        </div>
                    </div> :
                    leadPermission?.opportunities?.fields?.opportunities_tags === "-1" ?
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        {datas.opportunity_data.tags}
                                    </div>
                                </div>
                            </div>
                        </div> : ''}
        </div>
        <div className="follower">
            <div className="card leadCards">
                <div className="card-header d-flex align-center">
                    <h3 className="card-title">
                        {Translation(translations, "Contacts")}
                    </h3>
                    <div className="card-options">
                        <Link
                            onClick={(e) => handleToggle(e)}
                            className="card-options-collapse">
                            <i className={`fe fe-chevron-down`} />
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <Select mode="multiple"
                        filterOption={(input, option) =>
                            (option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
                        onSearch={
                            (v) => {
                                onSearchFollowerAdd2(v);
                            }}
                        onChange={(v1, v2) => {
                            setAddselectedContact(v2);
                        }}
                        style={{ width: "100%", height: 40 }}
                        placeholder={'Search follower name'}>
                        {addContact.length && addContact.map(({ fname, id }) =>
                            <Select.Option value={id} key={id}>
                                {fname}
                            </Select.Option>)}
                    </Select>
                    <button type="button" className="my-2 btn w-100 btn-primary" onClick={() => { updateAddContact(); }}>Update Contact</button>
                    <ul className="right_chat list-unstyled p-0 right_chat_vl">
                        {console.log(previousContact, "dassa", editLead.opportunity_data)}
                        {Array.isArray(previousContact) && previousContact.map((v, i) => {
                            if (v) {
                                return <li className="online mb-2 d-flex justify-between w-100 overflow-auto text-wrap" key={i}>
                                    <a href="#">
                                        <div className="media">
                                            <img className="media-object " src="./media/avatar1.jpg" alt="" />
                                            <div className="media-body">
                                                <span className="name">{v.fname}</span>
                                                <span className="name">{v.email}</span>
                                                <span className="badge badge-outline status"></span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="javascript:;" onClick={() => { delAddContact(v); }} className="cc_cls" data-row="184"><i className="fa-solid fa-xmark"></i></a>
                                </li>
                            }
                            console.log(previousFollower[v]);
                        })}
                    </ul>
                </div>
            </div>
        </div>
        <div className="follower">
            <div className="card leadCards">
                <div className="card-header d-flex align-center">
                    <h3 className="card-title">
                        {Translation(translations, "Followers")}
                    </h3>
                    <div className="card-options">
                        <Link
                            onClick={(e) => handleToggle(e)}
                            className="card-options-collapse">
                            <i className={`fe fe-chevron-down`} />
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <Select mode="multiple"
                        filterOption={true}
                        onSearch={
                            (v) => {
                                onSearchFollowerAdd(v);
                            }}
                        onChange={(v1, v2) => {
                            setAddselectedFollower(v2);
                        }}
                        style={{ width: "100%", height: 40 }}
                        placeholder={'Search follower name'}>
                        {addFollower.length && addFollower.map(({ uname, id }) =>
                            <Select.Option value={uname} key={id}>
                                {uname}
                            </Select.Option>)}
                    </Select>
                    <button type="button" className="my-2 btn w-100 btn-primary" onClick={() => { updateAddFollower(); }}>Update Follower</button>
                    <div className="">
                        {Array.isArray(previousFollower) && previousFollower.map((v, i) => {
                            if (v) {
                                return <div className="chip my-2" key={i}>
                                    <span className="avatar" style={{ backgroundImage: "url('./media/8410448a908412cec09fc9a1b42e7c1eeaf1031c.jpg')" }}></span>
                                    <div className="d-flex align-item-center">
                                        <span>{v.uname}</span>
                                        <a className="btnunfollow" data-follow="14" onClick={() => { delAddFollower(v); }}>
                                            <i className="fe fe-x"></i></a></div>
                                </div>;
                            }
                            console.log(previousFollower[v]);
                        })}
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div className="col-xl-8 col-lg-8">
        <MDBTabs justify className="mb-2" id="pills-tab">
            <MDBTabsItem>
                <MDBTabsLink
                    onClick={() => handleJustifyClick("tab1")}
                    active={justifyActive === "tab1"}>
                    {Translation(translations, "OverView")}
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink
                    onClick={() => handleJustifyClick("tab7")}
                    active={justifyActive === "tab7"}>
                    {Translation(translations, "Opportunity")}
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}>
                    {Translation(translations, "Follow Ups")}
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink
                    onClick={() => handleJustifyClick("tab3")}
                    active={justifyActive === "tab3"}>
                    {Translation(translations, "Conversation")}
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink
                    onClick={() => handleJustifyClick("tab4")}
                    active={justifyActive === "tab4"}>
                    {Translation(translations, "Assets")}
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink
                    onClick={() => handleJustifyClick("tab5")}
                    active={justifyActive === "tab5"}>
                    {Translation(translations, "Dashboard")}
                </MDBTabsLink>
            </MDBTabsItem>
            {leadPermission?.super_admin || leadPermission.opportunities?.fields?.opportunities_admininfo == "true" ? <MDBTabsItem>
                <MDBTabsLink
                    onClick={() => handleJustifyClick("tab6")}
                    active={justifyActive === "tab6"}>
                    {Translation(translations, "Admin")}
                </MDBTabsLink>
            </MDBTabsItem> : <></>}
        </MDBTabs>
        <MDBTabsContent>
            <MDBTabsPane show={justifyActive === "tab1"}>
                {console.log(editLeadFeild)}

                {editLeadFeild ?
                    <div className="innerNav">
                        <MDBTabs
                            justify
                            className="nav d-flex nav-tabs page-header-tab">
                            {Object.keys(editLeadFeild).map((item, index) => {
                                return (
                                    <MDBTabsItem key={index}>
                                        <MDBTabsLink
                                            onClick={() =>
                                                handleJustifyClick2(`tab2${index}`)}
                                            active={justifyActive2 == `tab2${index}`}>
                                            {item}
                                        </MDBTabsLink>
                                    </MDBTabsItem>);
                            })}
                        </MDBTabs>
                        <MDBTabsContent>
                            {Object.keys(editLeadFeild).map(function (key, i) {
                                return (
                                    <MDBTabsPane
                                        key={i}
                                        show={justifyActive2 == `tab2${i}`}>
                                        <div className="card p-3">
                                            <div className="card-body">
                                                {Object.keys(editLeadFeild[key]).map(
                                                    function (key2, ii) {
                                                        return (
                                                            <div
                                                                key={ii}
                                                                className={"col-md-6"}>
                                                                {" "}
                                                                <h4 className="mb-4">
                                                                    {key2.replaceAll("_", " ")}
                                                                </h4>
                                                                {Object.keys(
                                                                    editLeadFeild[key][key2]).
                                                                    map(function (key3, j) {
                                                                        const { type, body, field_required, label, value } = editLeadFeild[key][key2][key3];
                                                                        const objname = Object.keys(
                                                                            editLeadFeild[key][key2])[
                                                                            j];
                                                                        let labelName = `opportunities_${label.replaceAll(' ', '_')}`;
                                                                        if (field_required == 'yes') {
                                                                            if (!reqName.includes(label)) {
                                                                                if (leadPermission?.super_admin || leadPermission?.opportunities?.fields[labelName] === 'true') {
                                                                                    reqName.push(label.replaceAll(' ', '_'));
                                                                                    reqNameObj.push({
                                                                                        label: label,
                                                                                        name: label.replaceAll(' ', '_')
                                                                                    });
                                                                                }
                                                                            }
                                                                        };
                                                                        if (value) {
                                                                            initialValues[label.replaceAll(' ', '_')] = value;
                                                                        }
                                                                        return (
                                                                            <div key={j}>
                                                                                {(() => {
                                                                                    if (type == "select") {
                                                                                        if (leadPermission?.super_admin || leadPermission?.opportunities?.fields[labelName] === 'true') {
                                                                                            return (
                                                                                                <FormControl
                                                                                                    className="form-control my-1"
                                                                                                    selectList={body.split(",")}
                                                                                                    required={field_required == "yes" && true}
                                                                                                    label={Translation(translations, `${label}`)}
                                                                                                    name={objname}
                                                                                                    control="select3"
                                                                                                    firstSelect={"--select--"}
                                                                                                    defaultValue={value} />);
                                                                                        } else if (leadPermission?.opportunities?.fields[labelName] === '-1') {
                                                                                            return (
                                                                                                <div>
                                                                                                    <label className="form-label">
                                                                                                        <b>  {Translation(translations, `${label}`)}</b>
                                                                                                    </label>
                                                                                                    <p>{value}</p>
                                                                                                </div>);
                                                                                        }
                                                                                    } else if (
                                                                                        type == "radio") {
                                                                                        if (leadPermission?.super_admin || leadPermission?.opportunities?.fields[labelName] === 'true') {
                                                                                            return (
                                                                                                <FormControl
                                                                                                    options={body.split(",")}
                                                                                                    required={field_required == "yes" && true}
                                                                                                    label={Translation(translations, `${label}`)}
                                                                                                    name={objname}
                                                                                                    control="radio3"
                                                                                                    values={value} />);
                                                                                        } else if (leadPermission?.opportunities?.fields[labelName] === '-1') {
                                                                                            return (
                                                                                                <div>
                                                                                                    <label className="form-label">
                                                                                                        <b> {Translation(translations, `${label}`)}</b>
                                                                                                    </label>
                                                                                                    <p>{value}</p>
                                                                                                </div>);
                                                                                        }
                                                                                    } else if (type == "textarea") {
                                                                                        if (leadPermission?.super_admin || leadPermission?.opportunities?.fields[labelName] === 'true') {
                                                                                            return (
                                                                                                <FormControl
                                                                                                    className={"form-control my-1"}
                                                                                                    required={field_required == "yes" && true}
                                                                                                    label={Translation(translations, `${label}`)}
                                                                                                    name={objname}
                                                                                                    control="textarea3"
                                                                                                    values={value} />);
                                                                                        } else if (leadPermission?.opportunities?.fields[labelName] === '-1') {
                                                                                            return (
                                                                                                <div>
                                                                                                    <label className="form-label">
                                                                                                        <b> {Translation(translations, `${label}`)}</b>
                                                                                                    </label>
                                                                                                    <p>{value}</p>
                                                                                                </div>);
                                                                                        }
                                                                                    } else if (
                                                                                        type == "checkbox") {
                                                                                        if (leadPermission?.super_admin || leadPermission?.opportunities?.fields[labelName] === 'true') {
                                                                                            return (
                                                                                                <FormControl
                                                                                                    options={body.split(",")}
                                                                                                    required={field_required == "yes" && true}
                                                                                                    label={Translation(translations, `${label}`)}
                                                                                                    name={objname}
                                                                                                    control="checkbox"
                                                                                                    values={value.split(",")} />);
                                                                                        } else if (leadPermission?.opportunities?.fields[labelName] === '-1') {
                                                                                            return (
                                                                                                <div>
                                                                                                    <label className="form-label">
                                                                                                        <b> {Translation(translations, `${label}`)}</b>
                                                                                                    </label>
                                                                                                    <p>{value}</p>
                                                                                                </div>);
                                                                                        }
                                                                                    }
                                                                                    else if (
                                                                                        type == "date") {
                                                                                        if (leadPermission?.super_admin || leadPermission?.opportunities?.fields[labelName] === 'true') {
                                                                                            return (
                                                                                                <FormControl
                                                                                                    // options={body.split(",")}
                                                                                                    type="date"
                                                                                                    className="form-control my-1"
                                                                                                    required={field_required == "yes" && true}
                                                                                                    label={Translation(translations, `${label}`)}
                                                                                                    name={objname}
                                                                                                    control="input"
                                                                                                />);
                                                                                        } else if (leadPermission?.opportunities?.fields[labelName] === '-1') {
                                                                                            return (
                                                                                                <div>
                                                                                                    <label className="form-label">
                                                                                                        <b> {Translation(translations, `${label}`)}</b>
                                                                                                    </label>
                                                                                                    <p>{value}</p>
                                                                                                </div>);
                                                                                        }
                                                                                    }
                                                                                    else if (type == "text") {
                                                                                        if (leadPermission?.super_admin || leadPermission?.opportunities?.fields[labelName] === 'true') {
                                                                                            return (
                                                                                                <FormControl className="form-control my-1"
                                                                                                    required={field_required == "yes" && true}
                                                                                                    label={Translation(translations, `${label}`)}
                                                                                                    name={objname}
                                                                                                    placeholder={Translation(translations, `${label}`)}
                                                                                                    control="input"
                                                                                                    defaultValue={value} />);
                                                                                        } else if (leadPermission?.opportunities?.fields[labelName] === '-1') {
                                                                                            return (
                                                                                                <div>
                                                                                                    <label className="form-label">
                                                                                                        <b> {Translation(translations, `${label}`)}</b>
                                                                                                    </label>
                                                                                                    <p>{value}</p>
                                                                                                </div>);
                                                                                        }
                                                                                    }
                                                                                })()}
                                                                            </div>);
                                                                    })}
                                                            </div>);
                                                    })}
                                            </div>
                                        </div>
                                    </MDBTabsPane>);
                            })}
                        </MDBTabsContent>
                    </div> :
                    <Skeleton count={5} />}
            </MDBTabsPane>
            <MDBTabsPane show={justifyActive === "tab2"}>
                <MDBTabs justify className="mb-2 fitContent">
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClickFollowTab("tab1")}
                            active={followUptab === "tab1"}>
                            {Translation(translations, "FollowUp")}
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClickFollowTab("tab2")}
                            active={followUptab === "tab2"}>
                            {Translation(translations, "Meetings")}
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClickFollowTab("tab3")}
                            active={followUptab === "tab3"}>
                            {Translation(translations, "Projects")}
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane show={followUptab === 'tab1'}>
                        <div>
                            <div className="card leadCards  card-collapsed">
                                <div className="card-header border-top-0">
                                    <h3 className="card-title">
                                        {Translation(translations, "Calendar")}
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
                            <div className="card leadCards  card-collapsed">
                                <div className="card-header border-top-0">
                                    <h3 className="card-title">
                                        {Translation(translations, "Actions")}
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
                                        {Translation(translations, "Risks")}
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
                                        {Translation(translations, "Decisions")}
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
                                        {Translation(translations, "Issues")}
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
                {Translation(translations, "Conversation")}
            </MDBTabsPane>
            <MDBTabsPane show={justifyActive === "tab4"}>
                <MDBTabs justify className="mb-2 fitContent">
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClick3("tab1")}
                            active={assettab === "tab1"}>
                            {Translation(translations, "File")}
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClick3("tab2")}
                            active={assettab === "tab2"}>
                            {Translation(translations, "Note")}
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane show={assettab === "tab1"}>
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    {Translation(translations, "Files")}
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
                                                    translations,
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
                                            {Translation(translations, "Files")}
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
                                                    {Translation(translations, "All File")}
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
                                                                    {Translation(translations, "Name")}
                                                                </th>
                                                                <th>
                                                                    {Translation(translations, "Share With")}
                                                                </th>
                                                                <th>
                                                                    {Translation(
                                                                        translations,
                                                                        "Owner")}
                                                                </th>
                                                                <th>
                                                                    {Translation(
                                                                        translations,
                                                                        "Last Update")}
                                                                </th>
                                                                <th>
                                                                    {Translation(
                                                                        translations,
                                                                        "File Size")}
                                                                </th>
                                                                <th>
                                                                    {Translation(
                                                                        translations,
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
                                                                                        translations,
                                                                                        `${item.file_name}`)}
                                                                                </a>
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            {Translation(
                                                                                translations,
                                                                                `${item.file_name}`)}
                                                                        </td>
                                                                        <td className="width100">
                                                                            <span>
                                                                                {" "}
                                                                                {Translation(
                                                                                    translations,
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
                                                                                    translations,
                                                                                    "23, 2023")}
                                                                                {" "}
                                                                            </span>
                                                                        </td>
                                                                        <td className="width100 text-center">
                                                                            <span className="size">
                                                                                {Translation(
                                                                                    translations,
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
                                translations,
                                "Please type what you want...")} />
                        <FormControl
                            options={private_notes}
                            name={"private_note"}
                            control="radio3" />
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBTabsPane>
            <MDBTabsPane show={justifyActive === "tab5"}>
                {Translation(translations, "Dashboard")}
            </MDBTabsPane>
            {leadPermission?.super_admin || leadPermission.opportunities?.fields?.opportunities_admininfo == "true" ?
                <MDBTabsPane show={justifyActive === "tab6"}>
                    <MDBTabs justify className="mb-2 fitContent">
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleJustifyClickAdminTab("tab1")}
                                active={admintab === "tab1"}>
                                {Translation(translations, "overview")}
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink
                                onClick={() => handleJustifyClickAdminTab("tab2")}
                                active={admintab === "tab2"}>
                                {Translation(translations, "Timeline")}
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
                                                    {leadPermission?.super_admin || leadPermission.opportunities?.fields?.opportunities_admin_leadstage_dates == "on" ? <div className="col-auto">
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
                                                    (leadPermission?.super_admin || leadPermission?.opportunities?.fields[`opportunities_admin_${item.toLowerCase().replaceAll(" ", "_")}`]) &&
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
                                                            translations,
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
                                                            translations,
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
            </MDBTabsPane>
        </MDBTabsContent>
    </div>
</div> */
}
