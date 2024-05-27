import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import img1 from "../dist/webImages/justcall-logo.webp";
import { getTokenSession } from "../utils/common";
import config from "../services/config.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/common/Loading";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Form, Formik } from "formik";
import allData from "../Data/data";
import FormControl from "../components/form/FormControl";
import gravatar from "gravatar";
import md5 from "md5";
import SubmitButton from "../components/SubmitButton";
import Dropdown from "../components/form/Dropdown";
import usePost from "../customHooks/usePost";
import Skeleton from "react-loading-skeleton";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "react-loading-skeleton/dist/skeleton.css";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import File from "../components/form/File";
import { Monthss } from "../components/Month";
import {
  FaFolder,
  FaHandshake,
  FaMoneyBillAlt,
  FaRegCalendarAlt,
  FaSearch,
  FaListOl,
} from "react-icons/fa";
import { Translation } from "../components/Translation";
import swal from "sweetalert";
import { Collapse, Select, Space } from "antd";
import { StringConvert } from "../components/StringConvert";
import EditLeadAssetEditModal from "../Lead/EditLeadAssetEditModal";
import Role from "../components/Role";
import { toast } from "react-toastify";
import { GoFileSymlinkDirectory } from "react-icons/go";
import dayjs from "dayjs";
import { MdSummarize } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import Media_image_display from "../Lead/Media_image_display";
import EditLeadCalender from "../Lead/EditLeadCalender";
import MeetingCard from "../components/common/MeetingCard";
import EditLeadMeeting from "../Lead/EditLeadMeeting";
import ActionCard from "../components/common/ActionCard";
import EditLeadAction from "../Lead/EditLeadAction";
import { DatePicker } from "antd";
import { HandleConvertTimeOnlyDate, Handle_convert_system_timezone } from "../components/AllCustomFuntion";


function EditLead() {
  const { translations } = useContext(MainTranslationContexts);
  const navigate = useNavigate();
  const { permissions } = useContext(MainAuthPermissionsContext);
  const [res5, apiMethod5] = usePost();
  const [OppStageList, setOppStageList] = useState([]);
  const { id } = useParams();
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedSource2, setSelectedSource2] = useState("");
  const [followers, setfollowers] = useState([]);
  const isComponentMounted = useRef(true);
  const [tagValu, settagValu] = useState("");
  const [res4, apiMethod4] = usePost();
  const [resPostCategory, apiMethodPostCategory] = usePost();
  const [resPostCategoryMedia, apiMethodPostCategoryMedia] = usePost();
  const [stage, setStage] = useState(false);
  const [assetsnotes, setAssetsNotes] = useState("");
  const [resowner, apiMethodowner] = usePost();
  const [resAddNote, apiMethodAddNote] = usePost();
  const [resowner1, apiMethodowner1] = usePost();
  const [resAddFollower, apiMethodAddFollower] = usePost();
  const [resupdateAddFollower, apiMethodupdateAddFollower] = usePost();
  const [resDeleteAsset, apiMethodDeleteAsset] = usePost();
  const [resStage, apiMethodStage] = usePost();
  const [ownerhidden, setOwnerhidden] = useState("");
  const [ownerhidden1, setOwnerhidden1] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [listOpen1, setListOpen1] = useState(false);
  const [res, apiMethod] = usePost();
  const [res2, apiMethod2] = usePost();
  const [resDelAssign, apiMethodDelAssign] = usePost();
  const [respostLeadAssign, apiMethodpostLeadAssign] = usePost();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [assettab, setAssettab] = useState("tab1");
  const [followUptab, setfollowUptab] = useState("tab1");
  const [admintab, setAdmintab] = useState("tab1");
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [image2, setImage2] = useState("");
  const [imageMedia, setImageMedia] = useState("");

  const inputElement = useRef();
  const inputElement1 = useRef();
  const ownerRef = useRef(null);
  const ownerRef1 = useRef(null);
  const [searchval, setSearchval] = useState("");

  const [followerSelectValue, setfollowerSelectValue] = useState([]);
  const [followerSelectValueMedia, setfollowerSelectValueMedia] = useState([]);
  const [selectedFollower, setselectedFollower] = useState([]);
  const [selectedFollowerRole, setselectedFollowerRole] = useState([]);
  const [selectedFollowerMedia, setselectedFollowerMedia] = useState("");
  const [selectedFollowerMediaRole, setselectedFollowerMediaRole] =
    useState("");
  const [category, setcategory] = useState([]);
  const [categoryMedia, setcategoryMedia] = useState([]);
  const [addFollower, setAddfollower] = useState([]);
  const [addselectedFollower, setAddselectedFollower] = useState([]);
  const [previousFollower, setPreviousFollower] = useState([]);
  const [subCat_selected, setsubCat_selected] = useState([]);
  const [subCat_selectedMedia, setsubCat_selectedMedia] = useState([]);
  const [subCategoryselect, setsubCategoryselect] = useState([]);
  const [subCategoryselectMedia, setsubCategoryselectMedia] = useState([]);
  const [assetFileMedia, setassetFileMedia] = useState(true);
  const [assignLeadName, setassignLeadName] = useState(false);
  const [selectTag, setselectTag] = useState([]);
  const [correlationView, setcorrelationView] = useState([]);
  const [category_select_list, setCategory_select_list] = useState([]);
  const [category_select_listMedia, setCategory_select_listMedia] = useState(
    []
  );
  const [res_type_of_contact_list, apiMethod_type_of_contact_list] = usePost();
  const [opportunityData, setopportunityData] = useState(false);
  const [respremetion, apiMethodPremetion] = usePost();
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [creatBy, setCreatBy] = useState("");
  const [assigned, setAssigned] = useState("");
  const [privateNote, setPrivateNote] = useState(false);
  const [content, setContent] = useState("");
  const [lostStage, setlostStage] = useState(false);
  const [selectedLostStage, setselectedLostStage] = useState(false);
  const [lostStageName, setlostStageName] = useState("Lost");
  const [defaultCreateDate, setdefaultCreateDate] = useState('');
  const [updateTime, setUpdateTime] = useState('')
  const [createDate, setCreateDate] = useState('')
  const [practiceName, setPracticeName] = useState({});
  const [admin_timeline_data, setadmin_timeline_data] = useState([]);
  const [admin_overview_data, setadmin_overview_data] = useState(null);
  const [resMedia, apiMethodMedia] = usePost();
  const [resFile, apiMethodFile] = usePost();
  const [mediaData, setMediaData] = useState('');
  const [stageData, setStageData] = useState(false)
  const [corrval, setcorrval] = useState([
    {
      id: 1,
      value: "",
    },
  ]);
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  const [correlArr, setcorrelArr] = useState([
    {
      id: 1,
      firsValue: "16",
      secValue: "",
      value: "",
      type: "Co-Worker",
    },
  ]);

  const {
    data: getAllCorrelationsLead2,
    loading5,
    error5,
  } = useFetch("", "getAllCorrelationsLead");

  console.log(getAllCorrelationsLead2?.corelations)

  useEffect(() => {
    if (getAllCorrelationsLead2) {
      setcorrelArr([{ ...correlArr, firsValue: getAllCorrelationsLead2?.corelations?.[0]?.corr_id }])
    }
  }, [getAllCorrelationsLead2])


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



  const [modalStates, setModalStates] = useState(
    correlArr.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );
  const [actionL, setActionL] = useState('')
  const [meetingL, setMeetingL] = useState('')
  const reRenderTimeline = () => {
    axios
      .get(`${config.apiEndPoint}getActivitiesClientsData/${id}`)
      .then((response) => {
        console.log(response.data, "<<<<acrt");
        setadmin_timeline_data(response.data.activity);
        setadmin_overview_data(response.data.overview);
      });
  };
  useEffect(() => {
    if (res5.data) {
      setOppStageList(res5.data);
    }
  }, [res5]);


  const handle_File_more = () => {
    const lendth = assetsFile.data.length
    const data = assetsFile.data[lendth - 1]
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Client");
    apiMethodFile("postPaginationFilesDataView", formData);
  }


  const handleMoreMediaData = () => {
    const lendth = mediaData.data.length
    const data = mediaData.data[lendth - 1]
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Client");
    apiMethodMedia("postPaginationMediaDataView", formData);
  }
  useEffect(() => {
    if (isComponentMounted.current) {
      let formdata = new FormData();
      apiMethodStage("postClientsKanbanView", formdata)
    }
    return () => {
      isComponentMounted.current = false;
    };

  }, [])
  useEffect(() => {
    if (resStage.data) {

      setStageData(resStage.data)
    }
  }, [resStage.data])
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
  }, [resFile.data]);

  useEffect(() => {
    if (resMedia.data) {
      let mediaMoreData = resMedia?.data?.data
      mediaMoreData.shift()
      setMediaData({ ...resMedia.data, data: [...mediaData?.data, ...mediaMoreData] })
    }
  }, [resMedia.data])


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
    if (res4.data && !res4.isLoading) {
      res4.data.message && toast.success(res4.data.message);
      reRenderTimeline();
    }
  }, [res4.data]);
  const handleJustifyClick4 = (value) => {
    if (value == justifyActive3) {
      return;
    }
    setJustifyActive3(value);
  };
  const handleSourceChange2 = (event) => {
    console.log(event.target.value);
    setSelectedSource2(event.target.value);
  };
  const handleSourceChange = (event) => {
    // apiMethod5("postMediumByID", { id: event.target.value });
    console.log(event.target.value);
    setSelectedSource(event.target.value);
    setSelectedSource2("");
  };
  useEffect(() => {
    if (res5.data) {
      setOppStageList(res5.data);
      // Array.isArray && setSelectedSource2(res5.data[0]?.source_id);
    }
  }, [res5]);
  useEffect(() => {
    if (resAddNote.data) {
      if (resAddNote.data && !resAddNote.data.message) {
        toast.success("Successfully Updated!");
        // console.log(resAddFollower.data);

        reRenderTimeline();
        // setAssetsNotes(response.data.assets_notes)

        setAssetsNotes(resAddNote.data);
      } else if (resAddNote.data.message === "Empty Note") {
        toast.error(resAddNote.data.message);
      }
      // setAddfollower
    }
  }, [resAddNote.data]);
  useEffect(() => {
    if (resupdateAddFollower.data) {
      if (Array.isArray(resupdateAddFollower.data.is_follower)) {
        setPreviousFollower(resupdateAddFollower.data.is_follower);
        reRenderTimeline();
        let wrapper = document.createElement("div");
        wrapper.innerHTML = `${resupdateAddFollower?.data?.new_followers?.length > 0
          ? "<h4> New Followers: </h4>" +
          resupdateAddFollower?.data?.new_followers.join() +
          " added successfully. <br/>"
          : ""
          } 
    ${resupdateAddFollower?.data?.old_followers?.length > 0
            ? "<h4>Followers Already Exists:</h4>" +
            resupdateAddFollower?.data?.old_followers.join() +
            ". "
            : ""
          }
    `;
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
  useEffect(() => {
    if (respostLeadAssign.data) {
      navigate(`/${config.ddemoss}clients/Grid`);
    }
  }, [respostLeadAssign]);

  const { data: registerdata, loading4, error4 } = useFetch("", "getUserRoles");
  const { data: sourceList, loading7, error7 } = useFetch("", "getAllSources");
  // const {
  //   data: stageData,
  //   loading8,
  //   error8,
  // } = useFetch("", "getClientsKanbanView");
  const {
    data: loststageData,
    loading9,
    error9,
  } = useFetch("", "getAllClientsStagesSettings");

  const {
    data: category_select_list1,
    loading6,
    error6,
  } = useFetch("", "getViewCategory");
  const {
    data: category_select_list1Media,
    loading11,
    error11,
  } = useFetch("", "getViewCategory");
  const follower_select_list = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Custom", value: "Custom" },
    { label: "Role", value: "Role" },
  ];
  const redata = registerdata;

  const subbb = async (v, v2) => {
    setcategory(v);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));

    apiMethodPostCategory("postViewSubCategory", formdata);
  };
  const subbbMedia = async (v, v2) => {
    setcategoryMedia(v);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));
    apiMethodPostCategoryMedia("postViewSubCategory", formdata);
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

  useEffect(() => {
    if (resPostCategory.data && !resPostCategory.data.message) {
      let subData = resPostCategory.data.map((val, index) => {
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
    if (resPostCategoryMedia.data && !resPostCategoryMedia.data.message) {
      let subData = resPostCategoryMedia.data.map((val, index) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        };
      });
      setsubCategoryselectMedia(subData);
      console.log(subData);
    } else if (resPostCategoryMedia.data && resPostCategoryMedia.data.message) {
      setsubCategoryselectMedia([]);
    }
  }, [resPostCategoryMedia]);
  useEffect(() => {
    if (stageData) {
      let lostObj = stageData.all_stages.filter(
        (stageName) => stageName.id == stage
      )[0];
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

  const deleteLeadAssign = (v) => {
    let formdata = new FormData();
    formdata.append("userType", "unAssign");
    formdata.append("unAssign", v);
    formdata.append("uLead", id);
    let deldata = formdata;
    apiMethodDelAssign("postDeleteLeadAssign", deldata);
    setassignLeadName(false);
  };

  const delAddFollower = (item) => {
    const formdata = new FormData();
    formdata.append("userType", "unFollow");
    formdata.append("uLead", id);
    formdata.append("unFollow", item.id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethod4("postLeadUnFollow", formdata);
        setPreviousFollower(
          previousFollower.filter((val) => val.id !== item.id)
        );
      }
    });
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

  const deleteAssetFile = (item) => {
    swal({
      text: "Are you sure to delete this File?",
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
        setAssetsFile(
          {
            ...assetsFile,
            data: assetsFile.data.filter((its) => its.db_file_id != item.db_file_id)
          }
        );
        apiMethodDeleteAsset("postDeleteLeadAssets", field);
      }
    });
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
  const delCorrelation = (element) => {
    setcorrelArr(correlArr.filter((item) => item.id !== element.id));
  };
  const handle_delete_corr = async (value) => {
    const formdata = new FormData();
    formdata.append("lead_id", id);
    formdata.append("correlations_relation_id", value.correlation_lead_user);

    axios
      .post(`${config.apiEndPoint}postLeadDeletedCorrelations`, formdata)
      .then((response) => {
        if (
          response.data &&
          response.data.message === "The CorrRelation has been Deleted!!"
        ) {
          swal({
            title: response.data.message,
            icon: "success",
            dangerMode: true,
          });
          axios
            .get(`${config.apiEndPoint}getEditClient/${id}`)
            .then((response) => {
              setcorrelationView([
                ...response.data.correlations,
                ...response.data.correlation_lead_user,
              ]);
              setadmin_timeline_data(response.data.TimeLine);
              setadmin_overview_data(response.data.overview);
            });
        } else {
          swal({
            title: "You can't delete this Correlation",

            icon: "error",
            dangerMode: true,
          });
        }
      });
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

      axios
        .post(`${config.apiEndPoint}postLeadSearchAddCorrelations`, correlation)
        .then((response) => {
          if (response.data) {
            setcorrelationView([
              ...response.data.correlations,
              ...response.data.correlation_lead_user,
            ]);
            reRenderTimeline();
            if (response.data.message) {
              swal({
                title: response.data.message,
                dangerMode: true,
              });
            }

            // axios
            //   .get(`${config.apiEndPoint}getEditClient/${id}`)
            //   .then((response) => {
            //   });
          }
        });
    }
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
        firsValue: getAllCorrelationsLead2?.corelations?.[0]?.corr_id,
        secValue: "",
        value: "",
        type: "Co-Worker",
      },
    ]);
  };
  const handleClick1 = (id, item, newid) => {
    let updateValue = [...correlArr];
    updateValue[id].secValue = item.id;
    updateValue[id].value = item.fullname;
    setcorrelArr(updateValue);
    setModalStates((prevState) => ({
      ...prevState,
      [newid]: false,
    }));
  };
  const onSearchFollower = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    formdataOwner.append("uLead", id);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };
  const onSearchFollowerMedia = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    formdataOwner.append("uLead", id);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };
  const onSearchFollowerAdd = (v) => {
    const formdata = new FormData();
    formdata.append("query", v);
    formdata.append("userType", "typeSearch");
    formdata.append("uLead", id);
    apiMethodAddFollower("postLeadViewFollowers", formdata);
  };
  // const onSearchFollowerAddMedia = (v) => {
  //   const formdata = new FormData()
  //   formdata.append("query", v)
  //   formdata.append("userType", "typeSearch")
  //   apiMethodAddFollower('postLeadViewFollowers', formdata)
  // }

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
  // ///////// Notes Start/////////
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  const addNote = () => {
    let formdata = new FormData();
    formdata.append("leadId", id);
    formdata.append("notes", content);
    privateNote && formdata.append("private_note", "private_note");
    // privateNote.target && console.log(content, privateNote.target.value);
    apiMethodAddNote("postNotesUpdatedclients", formdata);
    setContent("");
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

  const [phoneNumber, setPhoneNumber] = useState({});
  const { addHeading } = useContext(MainHeadingContext);
  const [datas, setDatas] = useState("");
  const [image, setImage] = useState();
  const [assetsFile, setAssetsFile] = useState("");
  const [imgVal, setImgVal] = useState("");
  const [emails, setEmails] = useState("");
  const [projects, setprojects] = useState();
  const [emailse, setEmailse] = useState(false);
  const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZone3 = timeZone2.split("/")
  const {
    data: editLead,
    loading,
    error,
  } = useFetch({ setDatas }, `getEditClient/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`);
  useEffect(() => {
    if (editLead && editLead.Client_data) {
      setActionL(editLead?.actionEventsData)
      setMeetingL(editLead?.meetingEventsData)
      setImgVal(
        editLead?.Client_data[0]?.avatar
          ? editLead.Client_data[0].avatar?.includes("http")
            ? editLead.Client_data[0].avatar
            : `${config.baseurl2}${editLead.Client_data[0].avatar}`
          : permissions["system-avatar-image"]?.setting_value
            ? `${config.baseurl2}${permissions["system-default-avatar-image"]?.setting_value}`
            : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"
      );
      setAssetsNotes(editLead.assetsNotes);
      setSelectedSource(datas.Client_data[0].lead_leadsource);
      setSelectedSource2(datas.Client_data[0].lead_leadmedium);
      setImage(editLead?.Client_data[0]?.avatar);
      setprojects(editLead?.project);
      setUpdateTime(dayjs.tz(editLead?.Client_data?.[0]?.updated_date,
        permissions?.['system-user_timezone']?.setting_value
      ).tz())
      setdefaultCreateDate(dayjs.tz(editLead?.Client_data?.[0]?.created_date,
        permissions?.['system-user_timezone']?.setting_value
      ).tz())
      setCreateDate(dayjs(editLead?.Client_data?.[0]?.created_date))

      settagValu();
      let formdataOwner = new FormData();
      formdataOwner.append("userType", "typeSearch");
      formdataOwner.append("query", " ");
      formdataOwner.append("uLead", id);
      apiMethodowner("postSpecifiesUsers", formdataOwner);
      setassignLeadName({
        uname: editLead.Client_data[0].assigned_to_name,
        role_name: editLead.Client_data[0].assigned_to_role_name,
      });
      addHeading(`Edit Client - ${editLead.Client_data[0].fullname}`);
      setAssetsFile(editLead?.filesData);
      setMediaData(editLead?.mediaData)
      setcorrelationView([
        ...editLead.correlations,
        ...editLead.correlation_lead_user,
      ]);
      setEditLeadFeild(editLead.all_fields);
      if (!editLead.Client_data[0]?.tags == "") {
        setselectTag(editLead.Client_data[0]?.tags?.split(","));
      }
      setadmin_timeline_data(editLead.TimeLine);
      setadmin_overview_data(editLead.overview);
      setopportunityData(editLead.Opportunity);
      setEmails(`${editLead.Client_data[0].email}`);
      setselectedLostStage(editLead.Client_data[0].lost_client_reason);
      setPreviousFollower(editLead.lead_followers);
      setPracticeName(
        allData.timeZone.filter((item) => {
          return item.value == datas.Client_data[0].time_zone;
        })[0]
      );
      setPhoneNumber({
        number: editLead.Client_data[0].number,
        mobile_phone: editLead.Client_data[0].mobile_phone,
      });
      setStage(editLead.Client_data[0].client_stage);
    }
  }, [editLead]);

  useEffect(() => {
    apiMethod5("postMediumByID", { id: selectedSource });
  }, [selectedSource]);
  const handlePractice = (item) => {
    setPracticeName(item);
  };


  const handleCreatedDate = (value) => {
    setdefaultCreateDate(value)
    let initialTime = defaultCreateDate
    let minDiff = value.diff(initialTime, 'minute')
    let updateTime = createDate.add(minDiff ? minDiff : 0, 'minute')
    setCreateDate(updateTime)
  }


  const onChange = (value) => {
    setdefaultCreateDate(value)
    let initialTime = defaultCreateDate
    let minDiff = value.diff(initialTime, 'minute')
    let updateTime = createDate.add(minDiff ? minDiff : 0, 'minute')
    setCreateDate(updateTime)
  };



  const handleEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(e)}?d=404`;

    if (emailRegex.test(e)) {
      const avatarUrl = gravatar.url(
        e,
        { s: "200", r: "pg", d: "identicon" },
        true
      );
      fetch(gravatarUrl)
        .then((response) => {
          if (response.status === 404) {
            console.log("Email is not registered with Gravatar");
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios
              .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
              .then((res) => {
                setEmailse(res.data.aleady_exist);
                setImage(
                  permissions["system-default-avatar-image"]?.setting_value
                );
              })
              .catch((err) => {
                console.log("create errr", err);
              });
          } else {
            console.log("Email is registered with Gravatar");
            setImage(`${avatarUrl}`);
            console.log(avatarUrl);
          }
        })
        .catch((error) => {
          console.error("Error checking Gravatar image:", error);
        });
    } else {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getCheckEmailExistLead/${e}`)
        .then((res) => {
          setEmailse(res.data.aleady_exist);
          if (image === "") {
            setImage(permissions["system-default-avatar-image"]?.setting_value);
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
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  function handleSubmit(values) {
    values.lead_leadmedium = selectedSource2;
    values.lead_leadsource = selectedSource;
    values.lost_client_reason = lostStage ? selectedLostStage : "";
    values.created_date = createDate.format('YYYY-MM-DD HH:mm:ss');

    console.log(values);
    delete values.email;
    delete initialValues.email;
    console.log(emails, "muzz", initialValues, values);
    let time_zone = { time_zone: practiceName?.value };
    values.client_stage = stage;
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
        leadPermission?.clients?.fields?.clients_email == "true"
      ) {
        req.push("email");
      }
    }
    reqNameObj.map((val, i) => {
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
          if (typeof image === "object") {
            formdata.append("avatar", image);
            formdata.append("avatarURL", "");
          } else if (typeof image === "string") {
            formdata.append("avatarURL", image);
            formdata.append("avatar", "");
          }
        } else {
          formdata.append(item, allValues[item]);
        }
      }
      selectTag && formdata.append("tags", selectTag);
      image2 && formdata.append("upload_file", image2);
      imageMedia && formdata.append("upload_media", imageMedia);

      categoryMedia.length &&
        categoryMedia.map((v, i) => {
          formdata.append(`media_cat[${i}]`, v);
        });
      subCat_selectedMedia.length &&
        subCat_selectedMedia.map((v, i) => {
          formdata.append(`media_subcat[${i}]`, v);
        });
      formdata.append("email", emails);
      followerSelectValue && formdata.append("file_follw", followerSelectValue);
      console.log(followerSelectValueMedia);
      followerSelectValueMedia &&
        formdata.append("media_follw", followerSelectValueMedia);
      if (followerSelectValue === "Custom") {
        selectedFollower.length &&
          selectedFollower.map((v, i) => {
            formdata.append(`file_followers[${i}]`, v);
          });
      }
      if (followerSelectValue === "Role") {
        selectedFollowerRole &&
          formdata.append(`fl_follw[0]`, selectedFollowerRole);
      }
      if (followerSelectValueMedia === "Custom") {
        selectedFollowerMedia.length &&
          selectedFollowerMedia.map((v, i) => {
            formdata.append(`media_followers[${i}]`, v);
          });
      }
      if (followerSelectValueMedia === "Role") {
        console.log(selectedFollowerMediaRole);
        selectedFollowerMediaRole &&
          formdata.append(`md_follw[0]`, selectedFollowerMediaRole);
        // selectedFollowerMediaRole &&formdata.append(`fl_follw`, selectedFollowerMediaRole);
      }
      category.length &&
        category.map((v, i) => {
          formdata.append(`file_cat[${i}]`, v);
        });
      subCat_selected.length &&
        subCat_selected.map((v, i) => {
          formdata.append(`file_subcat[${i}]`, v);
        });

      formdata.append("submit", "update_client");

      let bodyContent = formdata;
      apiMethod("postUpdateClient", bodyContent);
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
      }
    }
  }, [res.data]);

  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("uLead", id);
    formdataOwner.append("query", searchval);

    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const handleList1 = (e, id) => {
    let formdataOwner = new FormData();
    formdataOwner.append("uLeadType", "leadUsr");
    formdataOwner.append("mode", "client");
    formdataOwner.append("query", corrval);
    formdataOwner.append("uLead", id);
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
    var initialValues = datas.Client_data[0];

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

  const handleStage2 = (e) => {
    let leads = new FormData();
    setStage(e.target.value);
    leads.append("type", "getCustomFields");
    leads.append("mode", "clients");
    leads.append("mdType", "Client");
    leads.append("lead_stage", e.target.value);
    apiMethod2("postClientsStageCustomFields", leads);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    var closestCard = e.target.closest(".card");
    if (closestCard.classList.contains("card-collapsed")) {
      closestCard.classList.remove("card-collapsed");
    } else {
      closestCard.classList.add("card-collapsed");
    }
  };
  const handleFullScreen = (e) => {
    e.preventDefault();
    var closestCard = e.target.closest(".card");
    if (closestCard.classList.contains("card-fullscreen")) {
      closestCard.classList.remove("card-fullscreen");
    } else {
      closestCard.classList.add("card-fullscreen");
    }
  };

  const assignLeadIdToName = (v) => {
    if (resowner.data && v && !resowner.data.message) {
      let leadname = resowner.data.filter((vals) => vals.id == v)[0];
      setassignLeadName({
        uname: leadname.uname,
        role_name: leadname.role_name,
      });
    }
  };
  const avatarDefualtURL = (s, d) => {
    setImgVal(
      "https://phpstack-896782-3163986.cloudwaysapps.com/react_lead/assets/leads/images/b99836c9d3aaf35493f469af46e1e88e78e463d4.png"
    );
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

  if (
    leadPermission?.super_admin == true ||
    leadPermission?.clients?.fields?.clients_fname == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("fname"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.clients?.fields?.clients_lead_source == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("lead_leadsource"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.clients?.fields?.clients_lead_medium == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("lead_leadmedium"), 1);
  }
  if (
    leadPermission?.super_admin == true ||
    leadPermission?.clients?.fields?.clients_contact_type == "true"
  ) {
  } else {
    reqName.splice(reqName.indexOf("type_of_contact"), 1);
  }
  const editMedia = () => {
    console.log(
      imageMedia,
      followerSelectValueMedia,
      categoryMedia,
      subCat_selectedMedia,
      selectedFollowerMedia
    );
  };
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

                            <p>
                              Created by:{" "}
                              {Translation(
                                translations,
                                `${editLead.Client_data[0]?.lead_by_name} (${editLead.Client_data[0]?.lead_by_role_name})`
                              )}{" "}
                              <br />
                              Assigned to:{" "}
                              {Translation(
                                translations,
                                `${(assignLeadName &&
                                  assignLeadName.uname &&
                                  assignLeadName.uname +
                                  " " +
                                  "(" +
                                  assignLeadName.role_name +
                                  ")") ||
                                ""
                                }`
                              )}{" "}
                            </p>
                          </div>
                        </div>

                        <div className="card-options">
                          <div className="columndd">
                            <div>
                              <label className="form-label ">
                                Stage:{" "}
                                {Translation(
                                  translations,
                                  `${datas.lead_stages &&
                                  !datas.lead_stages.message &&
                                  datas.Client_data[0].client_stage_name
                                  }`
                                )}
                              </label>{" "}
                            </div>

                            {editLead &&
                              `${datas.lead_stages &&
                              !datas.lead_stages.message &&
                              editLead.Client_data[0].client_stage_wonlost
                              }` === "lost" && (
                                <div>
                                  <label className="form-label">
                                    {datas.Client_data[0]?.client_stage_name}{" "}
                                    Reason:
                                    <br />
                                    {Array.isArray(
                                      editLead.clientsLostStages
                                    ) &&
                                      editLead.clientsLostStages[0]
                                        ?.reason_description}
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
                                      value={
                                        typeof image === "string"
                                          ? image.includes(
                                            "www.gravatar.com"
                                          ) || image.includes("s.gravatar")
                                            ? image
                                            : `${config.baseurl2}${image}`
                                          : image
                                      }
                                      onUpload={setImage}
                                      label={Translation(
                                        translations,
                                        "Avatar"
                                      )}
                                      name={"avatcdo"}
                                    />

                                    <Link
                                      onClick={() =>
                                        setImage(
                                          "https://www.gravatar.com/avatar/9f199d16db9e64e35e53f2b0f13ac617?s=160"
                                        )
                                      }
                                      className="float-left"
                                    >
                                      Use Gravatar
                                    </Link>
                                  </div>
                                  <div className="col-sm-12 mb-3">
                                    <label className="form-label">
                                      {Translation(
                                        translations,
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
                                              return item?.lead_follower ===
                                                "yes" ? (
                                                <li
                                                  key={index}
                                                  onClick={() =>
                                                    handleClick(item)
                                                  }
                                                >
                                                  <span className="text-red">
                                                    {Translation(
                                                      translations,
                                                      `${item.uname} (${item.role_name})`
                                                    )}{" "}
                                                    &nbsp;
                                                  </span>
                                                  - Lead Follower
                                                </li>
                                              ) : (
                                                <li
                                                  key={index}
                                                  onClick={() =>
                                                    handleClick(item)
                                                  }
                                                >
                                                  {" "}
                                                  {Translation(
                                                    translations,
                                                    `${item.uname} (${item.role_name})`
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

                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary btn-block btn-leadassign"
                                    onClick={() => {
                                      assignLead();
                                    }}
                                  >
                                    {Translation(translations, "Assign Lead")}
                                  </button>
                                  <hr />
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="row fv-plugins-icon-container">
                                  <div className="card leadCards col-md-6">
                                    <div className="card-header">
                                      <h3 className="card-title">
                                        {Translation(translations, "Lead Info")}
                                      </h3>
                                      <div className="card-options">
                                        <Link
                                          onClick={(e) => handleToggle(e)}
                                          className="card-options-collapse"
                                        >
                                          <i className={`fe fe-chevron-down`} />
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="card-body">
                                      <div className="row fv-plugins-icon-container">
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_fname === "true" ? (
                                          <div className="col-md-6">
                                            <FormControl
                                              className="form-control my-1"
                                              required={true}
                                              label={Translation(
                                                translations,
                                                "First Name"
                                              )}
                                              name="fname"
                                              control="input3"
                                              placeholder={Translation(
                                                translations,
                                                "First Name"
                                              )}
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_fname === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group my-2">
                                              <label className="form-label mb-3">
                                                {Translation(
                                                  translations,
                                                  "First Name"
                                                )}
                                              </label>
                                              {Translation(
                                                translations,
                                                `${initialValues.fname || ""}`
                                              )}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_lname === "true" ? (
                                          <div className="col-md-6">
                                            <FormControl
                                              className="form-control my-1"
                                              defaultValue={initialValues.lname}
                                              label={Translation(
                                                translations,
                                                `${"Last Name"}`
                                              )}
                                              name="lname"
                                              control="input"
                                              placeholder={Translation(
                                                translations,
                                                "Last Name"
                                              )}
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_lname === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group my-2">
                                              <label className="form-label mb-3">
                                                {Translation(
                                                  translations,
                                                  "Last Name"
                                                )}
                                              </label>
                                              {Translation(
                                                translations,
                                                `${initialValues.lname || ""}`
                                              )}{" "}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_contact_type === "true" ? (
                                          <div className="col-md-12">
                                            <FormControl
                                              className="form-control my-1"
                                              selectList={
                                                res_type_of_contact_list.data &&
                                                res_type_of_contact_list.data
                                              }
                                              required={true}
                                              label={"Type"}
                                              name="type_of_contact"
                                              control="select_custom_options"
                                              custom_label_name="type_name"
                                              customer_value_name="db_id"
                                              defaultValue={
                                                res_type_of_contact_list.data &&
                                                initialValues.type_of_contact
                                              }
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_contact_type === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Type of Contact"
                                                )}
                                              </label>
                                              <p className="mb-0">
                                                {Translation(
                                                  translations,
                                                  `${initialValues.type_name}`
                                                )}
                                              </p>{" "}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_mobile_phone === "true" ? (
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
                                                translations,
                                                `${"Mobile Phone"}`
                                              )}
                                              name="number"
                                              control="intl"
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_mobile_phone === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Mobile Phone"
                                                )}
                                              </label>
                                              {datas.Client_data[0].number}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_lead_stage === "true" ? (
                                          <div className="col-md-6">
                                            <FormControl
                                              id={"lead_stage"}
                                              className="form-control my-1"
                                              selectList={
                                                stageData &&
                                                stageData.all_stages
                                              }
                                              label={Translation(
                                                translations,
                                                `${"Client Stage"}`
                                              )}
                                              name={"client_stage"}
                                              // selectedd={initialValues.client_stage}
                                              required={true}
                                              value={
                                                stage ||
                                                initialValues.client_stage
                                              }
                                              control="select_custom_options"
                                              custom_label_name="name"
                                              customer_value_name="id"
                                              onChange={(e) => handleStage2(e)}
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_lead_stage === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Lead Stage"
                                                )}
                                              </label>
                                              {Translation(
                                                translations,
                                                `${initialValues &&
                                                initialValues.client_stage_name
                                                }`
                                              )}{" "}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {(leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_lead_stage === "true") &&
                                          lostStage ? (
                                          <div className="col-md-6">
                                            <FormControl
                                              id={"lost_prospect_reason"}
                                              className="form-control my-1"
                                              selectList={
                                                loststageData && loststageData
                                              }
                                              label={Translation(
                                                translations,
                                                `${lostStageName + " reason"}`
                                              )}
                                              name={"lost_prospect_reason"}
                                              firstSelect={"--select--"}
                                              selectedd={
                                                initialValues.lost_client_reason
                                              }
                                              required={true}
                                              value={
                                                selectedLostStage ||
                                                initialValues.lost_client_reason
                                              }
                                              control="select_custom_options"
                                              custom_label_name="reason_description"
                                              customer_value_name="reason_id"
                                              onChange={(e) =>
                                                setselectedLostStage(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_lead_stage === "-1" &&
                                          lostStage ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  `${lostStageName + " reason"}`
                                                )}
                                              </label>
                                              {Translation(
                                                translations,
                                                `${datas.clientsLostStages &&
                                                !datas.clientsLostStages
                                                  .message &&
                                                datas.clientsLostStages[0]
                                                  .reason_description
                                                }`
                                              )}{" "}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_email === "true" ? (
                                          <div className="col-md-6">
                                            <FormControl
                                              className="form-control my-1"
                                              required={true}
                                              label={Translation(
                                                translations,
                                                `${"E-mail"}`
                                              )}
                                              name="email"
                                              control="input"
                                              defaultValue={emails}
                                              onChange={(e) =>
                                                handleEmail(e.target.value)
                                              }
                                              placeholder={Translation(
                                                translations,
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
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_email === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "E-mail"
                                                )}
                                              </label>
                                              {datas.Client_data[0].email}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_email_status === "true" ? (
                                          <div className="col-md-6">
                                            <FormControl
                                              className="form-control my-1"
                                              selectList={
                                                allData.createleadPage
                                                  .EmailStatus
                                              }
                                              defaultValue={
                                                initialValues.email_status
                                              }
                                              label={Translation(
                                                translations,
                                                `${"Email status"}`
                                              )}
                                              name="email_status"
                                              control="select"
                                              placeholder={Translation(
                                                translations,
                                                "E-mail"
                                              )}
                                              required={true}
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_email_status === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Email status"
                                                )}
                                              </label>
                                              {Translation(
                                                translations,
                                                `${datas.Client_data[0].email_status}`
                                              )}{" "}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_score_number === "true" ? (
                                          <div className="col-md-6">
                                            <FormControl
                                              className="form-control my-1"
                                              type={"number"}
                                              label={Translation(
                                                translations,
                                                `${"Score Number"}`
                                              )}
                                              name="score_number"
                                              control="input"
                                              defaultValue={
                                                datas.Client_data[0]
                                                  .score_number
                                              }
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_score_number === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Score Number"
                                                )}
                                              </label>
                                              {
                                                datas.Client_data[0]
                                                  .score_number
                                              }
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_phone_number === "true" ? (
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
                                                translations,
                                                `${"Mobile Number"}`
                                              )}
                                              name="mobile_phone"
                                              control="intl"
                                              defaultValue={
                                                datas.Client_data[0].number
                                              }
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_phone_number === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Phone Number"
                                                )}
                                              </label>
                                              {datas.Client_data[0].number}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}

                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_birthday === "true" ? (
                                          <div className="col-md-12 mt-2">
                                            <FormControl
                                              type="date"
                                              className="form-control my-1"
                                              label={Translation(
                                                translations,
                                                `${"Birthday"}`
                                              )}
                                              name="birthday"
                                              control="input"
                                              defaultValue={
                                                datas.Client_data[0].birthday
                                              }
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_birthday === "-1" ? (
                                          <div className="col-md-6">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Birthday"
                                                )}
                                              </label>
                                              {datas.Client_data[0].birthday}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_created_date === "true" ? (
                                          <div className="col-md-12 time-picker">
                                            <label><b>Created Date</b></label>
                                            <DatePicker
                                              showTime={{ format: 'hh:mm:A', use12Hours: true }}
                                              value={defaultCreateDate}
                                              format={'MM/DD/YYYY hh:mm:A'}
                                              allowClear={false}
                                              use12Hours={true}
                                              showNow={dayjs()}
                                              onOk={handleCreatedDate}
                                              onChange={onChange}
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_created_date === "-1" ? (
                                          <div className="col-md-12">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Created date"
                                                )}
                                              </label>
                                              {defaultCreateDate && dayjs(defaultCreateDate).format("DD-MMM-YYYY hh:mm A")}
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_updated_date === "true" ? (
                                          <div className="col-md-12 time-picker my-3">
                                            <label><b> {Translation(translations, "Updated Date")}</b></label>
                                            <DatePicker
                                              showTime={{ format: 'hh:mm:A', use12Hours: true }}
                                              value={updateTime}
                                              format={'MM/DD/YYYY hh:mm:A'}
                                              allowClear={false}
                                              use12Hours={true}
                                              disabled={true}
                                            />
                                          </div>
                                        ) : leadPermission?.clients?.fields
                                          ?.clients_updated_date === "-1" ? (
                                          <div className="col-md-12">
                                            <div className="form-group">
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Updated Date"
                                                )}
                                              </label>
                                              {updateTime && dayjs(updateTime).format("DD-MMM-YYYY hh:mm A")}
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
                          </div>
                          <div className="col-md-6">
                            <div className="card">
                              <div className="card-status bg-blue"></div>
                              <div className="card-header">
                                <h3 className="card-title">
                                  {Translation(translations, "Location")}
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
                                  <div className="card-body">
                                    <div className="row">
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_address1 === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"Address 1"}`
                                            )}
                                            name="address_one"
                                            control="input"
                                            defaultValue={
                                              datas.Client_data[0].address_one
                                            }
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_address1 === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Address 1"
                                              )}
                                            </label>
                                            {datas.Client_data[0].address_one}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_address2 === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"Address 2"}`
                                            )}
                                            defaultValue={
                                              datas.Client_data[0].address_two
                                            }
                                            name="address_two"
                                            control="input"
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_address2 === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Address 2"
                                              )}
                                            </label>
                                            {datas.Client_data[0].address_two}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_city === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"City"}`
                                            )}
                                            name="city"
                                            control="input"
                                            defaultValue={
                                              datas.Client_data[0].city
                                            }
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_city === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "City"
                                              )}
                                            </label>
                                            {datas.Client_data[0].city}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_postal_code === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"Postal/ZIP Code"}`
                                            )}
                                            name="zip"
                                            control="input"
                                            defaultValue={
                                              datas.Client_data[0].zip
                                            }
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_postal_code === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Postal/ZIP Code"
                                              )}
                                            </label>
                                            {datas.Client_data[0].zip}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_state === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"State"}`
                                            )}
                                            name="state"
                                            control="input"
                                            defaultValue={
                                              datas.Client_data[0].state
                                            }
                                            placeholder={Translation(
                                              translations,
                                              "State"
                                            )}
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_state === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "State"
                                              )}
                                            </label>
                                            {datas.Client_data[0].state}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_country === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"Country"}`
                                            )}
                                            name="country"
                                            control="input"
                                            defaultValue={
                                              datas.Client_data[0].country
                                            }
                                            placeholder={Translation(
                                              translations,
                                              "Country"
                                            )}
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_country === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Country"
                                              )}
                                            </label>
                                            {datas.Client_data[0].country}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_ipaddress === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"IP Address"}`
                                            )}
                                            name="ip_address"
                                            control="input"
                                            placeholder={Translation(
                                              translations,
                                              "IP Address"
                                            )}
                                            defaultValue={
                                              datas.Client_data[0].ip_address
                                            }
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_ipaddress === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "IP Address"
                                              )}
                                            </label>
                                            {datas.Client_data[0].ip_address}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_time_zone === "true" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="">
                                              Time Zone
                                            </label>
                                            <Dropdown
                                              list={allData.timeZone}
                                              onChange={handlePractice}
                                              value={practiceName}
                                            />
                                          </div>
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_time_zone === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Time Zone"
                                              )}
                                            </label>
                                            {Translation(
                                              translations,
                                              `${datas.Client_data[0].time_zone}`
                                            )}{" "}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_locale === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"Locale"}`
                                            )}
                                            name="locale"
                                            control="input"
                                            placeholder={Translation(
                                              translations,
                                              "Locale"
                                            )}
                                            defaultValue={
                                              datas.Client_data[0].locale
                                            }
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_locale === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Locale"
                                              )}
                                            </label>
                                            {datas.Client_data[0].locale}
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_sourcepage === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            label={Translation(
                                              translations,
                                              `${"Source Page"}`
                                            )}
                                            name="lead_sourcepage"
                                            control="input"
                                            placeholder={Translation(
                                              translations,
                                              "Source Page"
                                            )}
                                            defaultValue={
                                              datas.Client_data[0]
                                                .lead_sourcepage
                                            }
                                          />
                                        </div>
                                      ) : leadPermission?.clients?.fields
                                        ?.clients_sourcepage === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Source Page"
                                              )}
                                            </label>
                                            {
                                              datas.Client_data[0]
                                                .lead_sourcepage
                                            }
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                      {leadPermission?.clients?.fields
                                        ?.clients_lead_source === "-1" ? (
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="form-label">
                                              {Translation(
                                                translations,
                                                "Lead Source"
                                              )}
                                            </label>
                                            {
                                              datas.Client_data[0]
                                                ?.leadsource_name
                                            }
                                          </div>
                                        </div>
                                      ) : leadPermission?.super_admin ||
                                        leadPermission?.clients?.fields
                                          ?.clients_lead_source === "true" ? (
                                        <div className="col-md-6">
                                          <FormControl
                                            className="form-control my-1"
                                            selectList={
                                              sourceList && sourceList
                                            }
                                            firstSelect={"--select--"}
                                            label={Translation(
                                              translations,
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
                                      <div className="col-md-6">
                                        {leadPermission?.super_admin ||
                                          leadPermission?.clients?.fields
                                            ?.clients_lead_source === "true" ||
                                          leadPermission?.clients?.fields
                                            ?.clients_lead_source === "-1" ? (
                                          leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              ?.clients_lead_medium === "true" ? (
                                            <div>
                                              <FormControl
                                                className="form-control my-1"
                                                selectList={OppStageList}
                                                required={true}
                                                label={Translation(
                                                  translations,
                                                  `${"Lead Medium"}`
                                                )}
                                                name="lead_leadmedium"
                                                custom_label_name="source_name"
                                                customer_value_name="source_id"
                                                control="select_custom_options"
                                                value={selectedSource2}
                                                onChange={handleSourceChange2}
                                              // defaultValue={initialValues.lead_leadmedium}
                                              />
                                            </div>
                                          ) : (
                                            <></>
                                          )
                                        ) : (
                                          <></>
                                        )}
                                        {leadPermission?.clients?.fields
                                          ?.clients_lead_source === "-1" ||
                                          leadPermission?.clients?.fields
                                            ?.clients_lead_source === "true" ? (
                                          leadPermission?.clients?.fields
                                            ?.clients_lead_medium === "-1" ? (
                                            <div>
                                              {" "}
                                              <label className="form-label">
                                                {Translation(
                                                  translations,
                                                  "Lead Medium"
                                                )}
                                              </label>
                                              {
                                                datas.Client_data[0]
                                                  ?.leadmedium_name
                                              }
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
                      <div className="card-body">
                        <div className="card_">
                          <div className="section-body">
                            <div className="container-fuild">
                              <div className="row clearfix">
                                <div className="col-md-12">
                                  {datas.all_fields &&
                                    !datas.all_fields.message ? (
                                    <div className="innerNav">
                                      <MDBTabsContent>
                                        <MDBTabsPane
                                          show={justifyActive === "tab1"}
                                        >
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
                                                            handleJustifyClick2(
                                                              `tab2${index}`
                                                            )
                                                          }
                                                          active={
                                                            justifyActive2 ==
                                                            `tab2${index}`
                                                          }
                                                        >
                                                          {item.replace(
                                                            /_/g,
                                                            " "
                                                          )}
                                                        </MDBTabsLink>
                                                      </MDBTabsItem>
                                                    );
                                                  }
                                                )}
                                              </MDBTabs>
                                              <MDBTabsContent>
                                                {Object.keys(editLeadFeild).map(
                                                  function (key, i) {
                                                    return (
                                                      <MDBTabsPane
                                                        key={i}
                                                        show={
                                                          justifyActive2 ==
                                                          `tab2${i}`
                                                        }
                                                      >
                                                        <div className="card p-3">
                                                          <div className="card-body">
                                                            {Object.keys(
                                                              editLeadFeild[key]
                                                            ).map(function (
                                                              key2,
                                                              ii
                                                            ) {
                                                              return (
                                                                <div
                                                                  key={ii}
                                                                  className={
                                                                    "col-md-6"
                                                                  }
                                                                >
                                                                  {" "}
                                                                  <h4 className="mb-4">
                                                                    {key2.replaceAll(
                                                                      "_",
                                                                      " "
                                                                    )}
                                                                  </h4>
                                                                  {Object.keys(
                                                                    editLeadFeild[
                                                                    key
                                                                    ][key2]
                                                                  ).map(
                                                                    function (
                                                                      key3,
                                                                      j
                                                                    ) {
                                                                      const {
                                                                        type,
                                                                        body,
                                                                        field_required,
                                                                        label,
                                                                        value,
                                                                      } =
                                                                        editLeadFeild[
                                                                        key
                                                                        ][key2][
                                                                        key3
                                                                        ];
                                                                      const objname =
                                                                        Object.keys(
                                                                          editLeadFeild[
                                                                          key
                                                                          ][
                                                                          key2
                                                                          ]
                                                                        )[j];
                                                                      let labelName = `clients_${label.replaceAll(
                                                                        " ",
                                                                        "_"
                                                                      )}`;
                                                                      if (
                                                                        field_required ==
                                                                        "yes"
                                                                      ) {
                                                                        if (
                                                                          !reqName.includes(
                                                                            label
                                                                          )
                                                                        ) {
                                                                          if (
                                                                            leadPermission?.super_admin ||
                                                                            leadPermission
                                                                              ?.clients
                                                                              ?.fields[
                                                                            labelName
                                                                            ] ===
                                                                            "true"
                                                                          ) {
                                                                            reqName.push(
                                                                              label.replaceAll(
                                                                                " ",
                                                                                "_"
                                                                              )
                                                                            );
                                                                            reqNameObj.push(
                                                                              {
                                                                                label:
                                                                                  label,
                                                                                name: label.replaceAll(
                                                                                  " ",
                                                                                  "_"
                                                                                ),
                                                                              }
                                                                            );
                                                                          }
                                                                        }
                                                                      }
                                                                      if (
                                                                        value
                                                                      ) {
                                                                        initialValues[
                                                                          label.replaceAll(
                                                                            " ",
                                                                            "_"
                                                                          )
                                                                        ] =
                                                                          type ===
                                                                            "checkbox"
                                                                            ? value.split(
                                                                              ","
                                                                            )
                                                                            : value;
                                                                      }

                                                                      return (
                                                                        <div
                                                                          key={
                                                                            j
                                                                          }
                                                                        >
                                                                          {(() => {
                                                                            if (
                                                                              type ==
                                                                              "select"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                      translations,
                                                                                      `${label}`
                                                                                    )}
                                                                                    name={
                                                                                      objname
                                                                                    }
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
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
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
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            } else if (
                                                                              type ==
                                                                              "radio"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                    name={
                                                                                      objname
                                                                                    }
                                                                                    control="radio3"
                                                                                    values={
                                                                                      value
                                                                                    }
                                                                                  />
                                                                                );
                                                                              } else if (
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
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
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            } else if (
                                                                              type ==
                                                                              "textarea"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                    name={
                                                                                      objname
                                                                                    }
                                                                                    control="textarea3"
                                                                                    defaultValue={
                                                                                      value
                                                                                    }
                                                                                  />
                                                                                );
                                                                              } else if (
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
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
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            } else if (
                                                                              type ==
                                                                              "checkbox"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                    name={
                                                                                      objname
                                                                                    }
                                                                                    control="checkbox"
                                                                                    values={value.split(
                                                                                      ","
                                                                                    )}
                                                                                  />
                                                                                );
                                                                              } else if (
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
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
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            } else if (
                                                                              type ==
                                                                              "text"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                    name={
                                                                                      objname
                                                                                    }
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
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
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
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            } else if (
                                                                              type ==
                                                                              "date"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                    name={
                                                                                      objname
                                                                                    }
                                                                                    placeholder={Translation(
                                                                                      translations,
                                                                                      `${label}`
                                                                                    )}
                                                                                    control="input"
                                                                                    type={
                                                                                      "date"
                                                                                    }
                                                                                    defaultValue={
                                                                                      value
                                                                                    }
                                                                                  />
                                                                                );
                                                                              } else if (
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
                                                                              ) {
                                                                                return (
                                                                                  <div>
                                                                                    <label className="form-label">
                                                                                      <b>
                                                                                        {Translation(
                                                                                          translations,
                                                                                          `${label}`
                                                                                        )}
                                                                                      </b>
                                                                                    </label>
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            } else if (
                                                                              type ==
                                                                              "number"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                    name={
                                                                                      objname
                                                                                    }
                                                                                    placeholder={Translation(
                                                                                      translations,
                                                                                      `${label}`
                                                                                    )}
                                                                                    control="input"
                                                                                    type={
                                                                                      "number"
                                                                                    }
                                                                                    defaultValue={
                                                                                      value
                                                                                    }
                                                                                  />
                                                                                );
                                                                              } else if (
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
                                                                              ) {
                                                                                return (
                                                                                  <div>
                                                                                    <label className="form-label">
                                                                                      <b>
                                                                                        {Translation(
                                                                                          translations,
                                                                                          `${label}`
                                                                                        )}
                                                                                      </b>
                                                                                    </label>
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            } else if (
                                                                              type ==
                                                                              "time"
                                                                            ) {
                                                                              if (
                                                                                leadPermission?.super_admin ||
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "true"
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
                                                                                    name={
                                                                                      objname
                                                                                    }
                                                                                    placeholder={Translation(
                                                                                      translations,
                                                                                      `${label}`
                                                                                    )}
                                                                                    control="input"
                                                                                    type={
                                                                                      "time"
                                                                                    }
                                                                                    defaultValue={
                                                                                      value
                                                                                    }
                                                                                  />
                                                                                );
                                                                              } else if (
                                                                                leadPermission
                                                                                  ?.clients
                                                                                  ?.fields[
                                                                                labelName
                                                                                ] ===
                                                                                "-1"
                                                                              ) {
                                                                                return (
                                                                                  <div>
                                                                                    <label className="form-label">
                                                                                      <b>
                                                                                        {Translation(
                                                                                          translations,
                                                                                          `${label}`
                                                                                        )}
                                                                                      </b>
                                                                                    </label>
                                                                                    <p>
                                                                                      {
                                                                                        value
                                                                                      }
                                                                                    </p>
                                                                                  </div>
                                                                                );
                                                                              }
                                                                            }
                                                                          })()}
                                                                        </div>
                                                                      );
                                                                    }
                                                                  )}
                                                                </div>
                                                              );
                                                            })}
                                                          </div>
                                                        </div>
                                                      </MDBTabsPane>
                                                    );
                                                  }
                                                )}
                                              </MDBTabsContent>
                                            </div>
                                          ) : (
                                            <Skeleton count={5} />
                                          )}
                                        </MDBTabsPane>
                                      </MDBTabsContent>
                                    </div>
                                  ) : (
                                    <Skeleton count={5} />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="card leadCards ">
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
                        {/* <FormControl
                            className="form-control my-1"
                            name="notes"
                            control="textarea3"
                            placeholder={Translation(
                              translations,
                              "Please type what you want..."
                            )}
                          /> */}
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <FaListOl /> Projects (#)
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
                              <div
                                key={i}
                                className="col-md-12 col-lg-12 col-sm-12"
                              >
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
                                        <div className="media">
                                          <img
                                            className="media-object "
                                            src={
                                              item?.project_feature_image &&
                                                item?.project_feature_image.includes(
                                                  "http"
                                                )
                                                ? item?.project_feature_image
                                                : `${config.baseurl2}${item?.project_feature_image} `
                                            }
                                            alt=""
                                          />
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
                                            )}{" "}
                                            <span className="dashsymbol">
                                              {" "}
                                              | - |{" "}
                                            </span>{" "}
                                            {item.end_date && (
                                              <span className="message">
                                                {item.end_date}
                                              </span>
                                            )}
                                            <span className="badge badge-outline status"></span>
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

                    <div className="card leadCards ">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <GoFileSymlinkDirectory />{" "}
                          {Translation(translations, "Files")}
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
                      <div className="card-body p-2">
                        <div className="row clearfix">
                          <div className="col-md-12 mb-2">
                            <File
                              onUpload={setImage2}
                              label={Translation(translations, "Upload File")}
                              typeFile=".txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.csv,.json,.xml,.html,.htm,.js,.css,.php,.cpp,.c,.java,.py,.rb,.sql,.log"
                              name={"upload_file"}
                              imageObj={image2}
                              typeFile_name={"typeFile"}
                            />
                          </div>
                          <div className="my-2">
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
                                style={{ width: "100%", height: 40 }}
                                placeholder={"type follower name"}
                              >
                                {resowner.data &&
                                  !resowner.data.message &&
                                  resowner.data.map(
                                    ({ uname, id, role_name }) => (
                                      <Select.Option value={uname} key={id}>
                                        {`${uname} (${role_name})`}
                                      </Select.Option>
                                    )
                                  )}
                              </Select>
                            </div>
                          )}
                          {followerSelectValue == "Role" && (
                            <div>
                              <select
                                className="form-control"
                                onChange={(e) =>
                                  setselectedFollowerRole(e.target.value)
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
                              <thead>
                                <tr>
                                  <th> </th>
                                  <th>{Translation(translations, "Name")}</th>
                                  <th>
                                    {Translation(translations, "Share With")}
                                  </th>
                                  <th>
                                    {Translation(translations, "Owner")}
                                  </th>
                                  <th>
                                    {Translation(translations, "Last Update")}
                                  </th>
                                  <th>
                                    {Translation(translations, "File Size")}
                                  </th>
                                  <th>
                                    {Translation(translations, "Action")}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.isArray(assetsFile?.data) && assetsFile?.data?.map((item, index) => {
                                  return (
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
                                            `${item.fileOwnerData[0].f_name} ${item.fileOwnerData[0].l_name}`
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
                                            follower_select_list={
                                              follower_select_list
                                            }
                                            updatedData={setAssetsFile}
                                            obj={redata?.CEO}
                                            resowner={resowner}
                                            id={id}
                                            category_data={
                                              category_select_list
                                            }
                                            updateTimeLine={reRenderTimeline}
                                            file_type={"file"}
                                            module={"Client"}

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
                                  );
                                })}
                                {
                                  <tr>
                                    {(Array.isArray(assetsFile?.data) && assetsFile?.has_more_data) &&
                                      <button type="button" className="btn btn-primary" onClick={handle_File_more}>Load More</button>}
                                  </tr>
                                }
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
                          {Translation(translations, "Correlations")}{" "}
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
                                          Array.isArray(resowner1.data) &&
                                          resowner1.data
                                            .filter((v) => v.id != id)
                                            .map((item, index) => {
                                              // console.log(i)
                                              return (
                                                <li
                                                  key={index}
                                                  onClick={(e) =>
                                                    handleClick1(
                                                      i,
                                                      item,
                                                      val.id
                                                    )
                                                  }
                                                >
                                                  <small>
                                                    <p className="p-0 m-0">
                                                      {Translation(
                                                        translations,
                                                        `${item.fullname}`
                                                      )}
                                                    </p>
                                                    <p className="p-0 m-0">
                                                      {" "}
                                                      {Translation(
                                                        translations,
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
                                              translations,
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
                                          src={
                                            item?.avatar?.includes(`http`)
                                              ? item?.avatar
                                              : `${config.baseurl2}${item?.avatar}`
                                          }
                                          alt=""
                                        />
                                        <div className="media-body">
                                          <span className="name">
                                            {Translation(
                                              translations,
                                              item.corr_title
                                            )}
                                          </span>
                                          <span className="message">
                                            {Translation(
                                              translations,
                                              item.leaduser
                                            )}
                                          </span>
                                          <span className="badge badge-outline status" />
                                        </div>
                                      </div>
                                    </Link>
                                    <span
                                      className="correl_cross"
                                      onClick={() => {
                                        handle_delete_corr(item);
                                      }}
                                    >
                                      {" "}
                                      <RxCross2 />
                                    </span>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card leadCards ">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          <i className="fa fa-tag text-muted"></i>
                          {Translation(translations, "Tags")}
                        </h3>
                        <div className="card-options">
                          <Link
                            onClick={(e) => handleToggle(e)}
                            className="card-options-collapse"
                          >
                            <i className={`fe fe-chevron-down`} />
                          </Link>
                        </div>
                      </div>
                      {leadPermission?.super_admin ||
                        leadPermission?.clients?.fields?.clients_tags ===
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
                      ) : leadPermission?.clients?.fields?.clients_tags ===
                        "-1" ? (
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                {datas.Client_data[0].tags}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="card leadCards ">
                      <div className="card-status bg-blue"></div>

                      <div className="card-header">
                        <h3 className="card-title">
                          {Translation(translations, "Followers")}
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
                              addFollower.map(
                                ({ uname, id, role_name, text }) => (
                                  <Select.Option
                                    value={uname}
                                    key={id}
                                    disabled={
                                      id ===
                                      datas.Client_data[0]?.lead_assigned_to
                                    }
                                  >
                                    {id ===
                                      datas.Client_data[0]?.lead_assigned_to ? (
                                      <>
                                        <span className="text-red">
                                          {`${uname} (${role_name})`}
                                        </span>
                                        - User already assigned to this client.
                                      </>
                                    ) : (
                                      `${uname} (${role_name})`
                                    )}
                                  </Select.Option>
                                )
                              )}
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
                                        backgroundImage: `url(${v?.avatar.includes(`http`)
                                          ? v?.avatar
                                          : `${config.baseurl2}${v?.avatar}`
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

                  <div className="col-lg-8 col-md-6 col-sm-12">
                    <div className="card">
                      <div className="card-status bg-blue"></div>
                      <div className="card-header">
                        <h3 className="card-title">
                          <FaRegCalendarAlt /> Calendar
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
                        <EditLeadCalender  module={"client"} idd={id} data={datas?.clanderEventsData} dataOpportunities={datas?.Opportunity} />
                      </div>
                    </div>
                    {editLead.Opportunity && (
                      <div className="card">
                        <div className="card-status bg-blue"></div>
                        <div className="card-header">
                          <h3 className="card-title">
                            <FaMoneyBillAlt /> Opportunities
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
                                      to={`/${config.ddemoss}opp_pipelines/view/${v.op_id}`}
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
                        <EditLeadAction assignId={datas.Client_data[0]?.lead_assigned_to} modules={"Client"} Id={id} actionData={datas} datasAction={initialValues} />
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
                          <FaHandshake /> Meetings <small> </small>
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
                        <EditLeadMeeting assignId={datas.Client_data[0]?.lead_assigned_to} modules={"Client"} Id={id} meetingData={datas} datasMeeting={initialValues} />
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
                            <div>
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
                                    resowner.data.map(
                                      ({ uname, id, role_name }) => (
                                        <Select.Option value={uname} key={id}>
                                          {`${uname} (${role_name})`}
                                        </Select.Option>
                                      )
                                    )}
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
                        {!assetsFile ? (
                          <Skeleton count={5} />
                        ) : assetsFile.message != "No Data Found" ? (
                          <div className="table-responsive">
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                              {Array.isArray(mediaData?.data) && mediaData?.data?.map(items => {
                                return (
                                  <div
                                    style={{ width: 250, margin: 12 }}
                                    className=""
                                    key={items?.db_file_id}
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
                                      <div className="d-flex align-items-center px-2 mt-3">
                                        <img style={{ width: 50, height: 50, borderRadius: 25, marginRight: "10px" }}
                                          src={
                                            items?.fileOwnerData[0]?.avatar &&
                                              items?.fileOwnerData[0]?.avatar.includes("http")
                                              ? items?.fileOwnerData[0]?.avatar
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
                                              updateTimeLine={
                                                reRenderTimeline
                                              }
                                              updatedData={setMediaData}
                                              category_data={
                                                category_select_list
                                              }
                                              file_type={"media"}
                                              module={"Client"}
                                            />
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}

                            </div>
                            {
                              (Array.isArray(mediaData?.data) && mediaData?.has_more_data) &&
                              <button type="button" className="btn btn-primary w-100" onClick={handleMoreMediaData}>Load More</button>
                            }
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
                          <CiLock /> Admin <small>Admin &amp; Timeline</small>
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
                          leadPermission?.clients?.fields?.clients_admininfo ? (
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
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              .clients_admin_created_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Created Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Created Date`
                                                    ] != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Created Date`
                                                          ]
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
                                            leadPermission?.clients?.fields
                                              .clients_admin_updated_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Updated Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Updated Date`
                                                    ] != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Updated Date`
                                                          ]
                                                        }
                                                      />
                                                      : "----"}
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}
                                        <li className="mt-4">
                                          <div className="row align-items-center">
                                            <div className="col-auto">
                                              <div className="h5 mb-0">
                                                Client Stage Dates
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
                                                  {datas &&
                                                    admin_overview_data &&
                                                    Object.keys(
                                                      admin_overview_data.LeadStageDates
                                                    ).map((item, index) => {
                                                      return (
                                                        <tr key={index}>
                                                          <td>
                                                            {
                                                              admin_overview_data
                                                                .LeadStageDates[
                                                                item
                                                              ].name
                                                            }
                                                          </td>
                                                          <td>
                                                            <HandleConvertTimeOnlyDate
                                                              dateAndTime={
                                                                admin_overview_data
                                                                  .LeadStageDates[
                                                                  item
                                                                ].assign_on
                                                              }
                                                            />

                                                          </td>
                                                          <td>
                                                            {
                                                              admin_overview_data
                                                                .LeadStageDates[
                                                                item
                                                              ].days
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

                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              .clients_admin_conversion_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Conversion Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Conversion Date`
                                                    ] != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Conversion Date`
                                                          ]
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
                                            leadPermission?.clients?.fields
                                              .clients_admin_conversion_sdr) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Conversion SDR`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {
                                                      admin_overview_data
                                                        .OverView[
                                                      `Conversion SDR`
                                                      ]
                                                    }
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              .clients_admin_contacted_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Contacted Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Contacted Date`
                                                    ] != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Contacted Date`
                                                          ]
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
                                            leadPermission?.clients?.fields
                                              .clients_admin_date_created_for_first_sale) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Date Created for First Deal`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Date Created for First Deal`
                                                    ] != "-----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Date Created for First Deal`
                                                          ]
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
                                            leadPermission?.clients?.fields
                                              .clients_admin_unqualified_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Client Lost Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Unqualified Date`
                                                    ] != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Unqualified Date`
                                                          ]
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
                                            leadPermission?.clients?.fields
                                              .clients_admin_unqualified_owner) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Client Lost Owner`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {
                                                      admin_overview_data
                                                        .OverView[
                                                      `Unqualified Owner`
                                                      ]
                                                    }
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              .clients_admin_validation_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Validation Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Validation Date`
                                                    ] != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Validation Date`
                                                          ]
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
                                            leadPermission?.clients?.fields
                                              .clients_admin_validation_owner) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Validation Owner`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {
                                                      admin_overview_data
                                                        .OverView[
                                                      `Validation Owner`
                                                      ]
                                                    }
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )}
                                        {/* {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              .clients_admin_prospect_lost_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Prospect Lost Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Prospect Lost Date`
                                                    ] != "----"
                                                      ? dayjs(
                                                          admin_overview_data
                                                            .OverView[
                                                            `Prospect Lost Date`
                                                          ],
                                                          "YYYY-MM-DD HH:mm:ss"
                                                        ).format(
                                                          "DD-MMM-YYYY hh:mm A"
                                                        )
                                                      : "----"}
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )} */}
                                        {/* {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              .clients_admin_prospect_lost_owner) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Prospect Lost Owner`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {
                                                      admin_overview_data
                                                        .OverView[
                                                        `Prospect Lost Owner`
                                                      ]
                                                    }
                                                  </span>
                                                </div>
                                              </div>
                                            </li>
                                          )} */}
                                        {admin_overview_data &&
                                          (leadPermission?.super_admin ||
                                            leadPermission?.clients?.fields
                                              .clients_admin_client_conversion_date) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Client Conversion Date`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {admin_overview_data
                                                      .OverView[
                                                      `Client Conversion Date`
                                                    ] != "----"
                                                      ? <Handle_convert_system_timezone
                                                        dateAndTime={
                                                          admin_overview_data
                                                            .OverView[
                                                          `Client Conversion Date`
                                                          ]
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
                                            leadPermission?.clients?.fields
                                              .clients_admin_client_conversion_owner) && (
                                            <li className="mb-4">
                                              <div className="row align-items-center">
                                                <div className="col-auto">
                                                  <div className="h5 mb-0">
                                                    {`Client Conversion Owner`}
                                                  </div>
                                                  <span className="small text-muted">
                                                    {
                                                      admin_overview_data
                                                        .OverView[
                                                      `Client Conversion Owner`
                                                      ]
                                                    }
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
                                    {Array.isArray(admin_timeline_data) &&
                                      admin_timeline_data.map((item, i) => {
                                        return (
                                          <div
                                            className="timeline_item "
                                            key={i}
                                          >
                                            <img
                                              className="tl_avatar"
                                              src={
                                                item?.avatar &&
                                                  item?.avatar.includes("http")
                                                  ? item?.avatar
                                                  : `${config.baseurl2}${item?.avatar} `
                                              }
                                              alt=""
                                            />
                                            <span>
                                              <a style={{ color: '#00A9BD' }}>
                                                {" "}
                                                {Translation(
                                                  translations,
                                                  `${item.f_name} ${item.l_name}`
                                                )}
                                              </a>{" "}
                                              ({item.email}){" "}
                                              <small className="float-right text-right">
                                                {" "}
                                                <Handle_convert_system_timezone
                                                  dateAndTime={
                                                    item.activity_date_time
                                                  }
                                                />{" "}
                                              </small>
                                            </span>
                                            <div className="msg" key={i}>
                                              <div>
                                                {Translation(
                                                  translations,
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
              </div>
            </div>
          </Form>
        </Formik>
      </>
    )
  );
}

export default EditLead;