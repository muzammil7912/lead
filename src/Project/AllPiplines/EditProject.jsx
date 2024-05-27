import React, { useState, useContext, useEffect, useRef } from "react";
import { Translation } from "../../components/Translation";
import useFetch from "../../customHooks/useFetch";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import Loader from "../../components/common/Loading";
import { Link, useParams } from "react-router-dom";
import usePost from "../../customHooks/usePost";
import img1 from "../../dist/webImages/justcall-logo.webp";
import Skeleton from "react-loading-skeleton";
import FormControl from "../../components/form/FormControl";
import Role from "../../components/Role";
import { FaSearch } from "react-icons/fa";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import config from "../../services/config.json";
import { getTokenSession } from "../../utils/common";
import { Select } from "antd";
import "react-loading-skeleton/dist/skeleton.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { GoFileSymlinkDirectory } from "react-icons/go";
import { Monthss } from "../../components/Month";
import File from "../../components/form/File";
import { toast } from "react-toastify";
import SubmitButton from "../../components/SubmitButton";
import Modal from "react-bootstrap/Modal";
// import EditLeadAssetEditModal from "../../AllOpportunity/EditLeadAssetEditModal";
import EditLeadAssetEditModal from "../../AllOpportunity/EditAllpipelinesAssetModal";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import { StringConvert } from "../../components/StringConvert";
import $ from "jquery";
import { HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import moment from 'moment';
import swal from "sweetalert";
import { FaFolder, } from "react-icons/fa";
import { MainTranslationContexts } from "../../context/MainTranslationContexts";
import Media_image_display from "../../Lead/Media_image_display";
import EditLeadCalender from "../../Lead/EditLeadCalender";
import EditLeadAction from "../../Lead/EditLeadAction";
import ActionCard from "../../components/common/ActionCard";
import EditLeadMeeting from "../../Lead/EditLeadMeeting";
import MeetingCard from "../../components/common/MeetingCard";
import Button from "react-bootstrap/Button";
import { HandleConvertTimeOnlyDate, Handle_convert_system_timezone } from "../../components/AllCustomFuntion";

const EditProject = () => {
  const { id } = useParams();
  let subCategoryIds = [];
  const { translations } = useContext(MainTranslationContexts);
  const [subCat_selectedMediaModal, setsubCat_selectedMediaModal] = useState(subCategoryIds);
  const [resPostCategoryMedia, apiMethodPostCategoryMedia] = usePost();
  const [resPostCategoryModal, apiMethodPostCategoryModal] = usePost();
  const [selectedFollowerMediaModal, setselectedFollowerMediaModal] = useState([]);
  const [selectedFollowerMediaModalRole, setselectedFollowerMediaModalRole] = useState();
  const [category_select_listMediaModal, setCategory_select_listMediaModal] = useState([]);
  const [subCategoryselectMediaModal, setsubCategoryselectMediaModal] = useState([]);
  const [dataModal, setDataModal] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [member, setMember] = useState("");
  const [resPostCategory, apiMethodPostCategory] = usePost();
  const [res1, apiMethod1] = usePost();
  const [assetFileMedia, setassetFileMedia] = useState(true);
  const [subCat_selected, setsubCat_selected] = useState([]);
  const [subCategoryselect, setsubCategoryselect] = useState([]);
  const [resLostReason, apiMethodLostReason] = usePost();
  const [category, setcategory] = useState([]);
  const [ownerhidden3, setOwnerhidden3] = useState("");
  const ownerRef3 = useRef(null);
  const [privateNote, setPrivateNote] = useState(false);
  const inputElement3 = useRef();
  const [searchval3, setSearchval3] = useState("");
  const [category_select_list, setCategory_select_list] = useState([]);
  const [addselectedFollower, setAddselectedFollower] = useState([]);
  const [addselectedMember, setAddselectedMember] = useState([]);
  const [previousContact, setPreviousContact] = useState([]);
  const [resAddNote, apiMethodAddNote] = usePost();
  const [followerSelectValueMediaModal, setfollowerSelectValueMediaModal] = useState("");
  const ownerRef = useRef(null);
  const [listOpen, setListOpen] = useState(false);
  const [datas, setDatas] = useState("");
  const inputElement = useRef();
  const [res4, apiMethod4] = usePost();
  const [previousFollower, setPreviousFollower] = useState([]);
  const [previousMember, setPreviousMember] = useState([]);
  const [listOpen3, setListOpen3] = useState(false);
  const [resowner, apiMethodowner] = usePost();
  const [selectedFollower, setselectedFollower] = useState([]);
  const [resowner2, apiMethodowner2] = usePost();
  const [resDeleteAsset, apiMethodDeleteAsset] = usePost();
  const [searchval, setSearchval] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [res, apiMethod] = usePost();
  const [resUpdateAddFollower, apiMethodupdateAddFollower] = usePost();
  const [resUpdateAddMember, apiMethodupdateAddMember] = usePost();
  const [follower, setFollower] = useState("");
  const [followerSelectValue, setfollowerSelectValue] = useState(false);
  const { addHeading } = useContext(MainHeadingContext);
  const [radiolist, setradiolist] = useState(false);
  const [projecttitle, setprojecttitle] = useState("");
  const [addFollower, setAddfollower] = useState([]);
  const [addMember, setAddMember] = useState([]);
  const [projectvalue, setprojectvalue] = useState("");
  const [assigntoname, setassigntoname] = useState("");
  const [editLeadFeild, setEditLeadFeild] = useState("");
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [justifyActive2, setJustifyActive2] = useState("tab20");
  const [justifyActive3, setJustifyActive3] = useState("tab1");
  const [justifyActive4, setJustifyActive4] = useState("tab1");
  const [assetsFile, setAssetsFile] = useState("");
  const [rescontact, apiMethodcontact] = usePost();
  const [content, setContent] = useState("");
  const [assettab, setAssettab] = useState("tab1");
  const [ownerhidden, setOwnerhidden] = useState("");
  const [resAddFollower, apiMethodAddFollower] = usePost();
  const [resAddMember, apiMethodAddMember] = usePost();
  const [showModal, setShowModal] = useState(false);
  const [pipeline_id, setpipeline_id] = useState();
  const [resowner3, apiMethodowner3] = usePost();
  const [selectTag, setselectTag] = useState([]);
  const [image2, setImage2] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { data: category_select_list1Media, loading11, error11, } = useFetch("", "getViewCategory");
  const [followerSelectValueMedia, setfollowerSelectValueMedia] = useState([])
  const [selectedFollowerMedia, setselectedFollowerMedia] = useState('')
  const [selectedFollowerMediaRole, setselectedFollowerMediaRole] = useState('')
  const [categoryMedia, setcategoryMedia] = useState([]);
  const [subCategoryselectMedia, setsubCategoryselectMedia] = useState([]);
  const [category_select_listMedia, setCategory_select_listMedia] = useState([])
  const [subCat_selectedMedia, setsubCat_selectedMedia] = useState([])
  const [imageMedia, setImageMedia] = useState(false);
  const [media_list, setmedia_list] = useState({})
  const [admin_timeline_data, setadmin_timeline_data] = useState([]);
  const [admin_overview_data, setadmin_overview_data] = useState('');
  const [actionL, setActionL] = useState('')
  const [meetingL, setMeetingL] = useState('')
  const [resupdatesMedia, apiMethodpostUpdatesMedia] = usePost();
  const [resMedia, apiMethodMedia] = usePost();
  const [resFile, apiMethodFile] = usePost();

  const handleEdit = () => {
    let form = new FormData();
    console.log(categoryIds);
    form.append("file_id", dataModal.db_file_id);
    form.append("file_follw", followerSelectValueMediaModal);
    form.append("lead_id", id);
    if (followerSelectValueMediaModal === "Custom") {
      selectedFollowerMediaModal.length &&
        selectedFollowerMediaModal.map((v, i) => {
          form.append(`file_followers[${i}]`, v);
        });
    }
    if (followerSelectValueMediaModal === "Role") {
      form.append("fl_follw", selectedFollowerMediaModalRole);
    }
    categoryIds.length &&
      categoryIds.map((v, i) => {
        form.append(`file_cat[${i}]`, v);
      });
    subCat_selectedMediaModal.length &&
      subCat_selectedMediaModal.map((v, i) => {
        form.append(`file_subcat[${i}]`, v);
      });
    console.log(subCategoryIds);
    apiMethodpostUpdatesMedia("postUpdateAssets", form);
    console.log("dataModal");
  };


  //  more file media ////

  const handleClose3 = () => {
    setShowModal(false);
  };

  const subbbMediaModal = async (v, v2) => {
    categoryIds = [...v];
    console.log(categoryIds);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));
    apiMethodPostCategoryModal("postViewSubCategory", formdata);
  };

  const handleMediaMOre = () => {
    const lendth = media_list.data.length
    const data = media_list.data[lendth - 1]
    console.log(data, "djhfjdh")
    let formData = new FormData();
    formData.append("total_num", lendth);
    formData.append("id", data?.db_file_id);
    formData.append("lead_id", id);
    formData.append("module", "Project");
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
    formData.append("module", "Project");
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

  const reRenderTimeline = () => {
    axios
      .get(`${config.apiEndPoint}getActivitiesData/${id}`)
      .then((response) => {
        console.log(response.data, "<<<<acrt");
        setadmin_timeline_data(response.data.activity);
        setadmin_overview_data(response.data.overview);
      });
  };

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
    console.log(event.target.value)
  }
  const { data: category_select_list1 } = useFetch("", "getViewCategory");
  const items = [
    { label: "None" },
    { label: "Contact" },
    { label: "Opportunity" },
    { label: "User" },
    { label: "Project" },
  ];
  let reqName = ["project_title", "project_value"];
  const submitbutton = {
    class: "btn btn-primary update_button_lead",
    text: "Update Info",
  };
  const [meetingArr, setmeetingArr] = useState([
    {
      id: 1,
      DateValue: "",
      FirstValue: "",
      secValue: "",
      thirdValue: "",
    },
  ]);
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
  const follower_select_list = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Custom", value: "Custom" },
    { label: "Role", value: "Role" },
  ];
  let reqNameObj = [
    {
      label: "Project Title",
      name: "project_title",
    },
    {
      label: "Project Value",
      name: "project_value",
    },
  ];
  const private_notes = ["private_note"];
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const timeZone2 = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timeZone3 = timeZone2.split("/")
  const { data: viewProject, loading } = useFetch(
    { setDatas },
    `getEditProjects/${id}&timezone=${timeZone3[0]}-${timeZone3[1]}`
  );
  const {
    data: Projectstatus,
    loading1,
    error1,
  } = useFetch("", `getAllViewProjectsStatus`);

  const [assetsnotes, setAssetsNotes] = useState("");
  const { data: registerdata } = useFetch("", "getUserRoles");
  const redata = registerdata;
  useEffect(() => {
    if (resAddFollower.data) {
      if (!resAddFollower.data.message) {
        // console.log(resAddFollower.data);
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
      } else if (resAddNote.data.message === "Note is Emply!!") {
        toast.error(resAddNote.data.message);
      }
      // setAddfollower
    }
  }, [resAddNote.data]);
  useEffect(() => {
    if (resAddMember.data) {
      if (!resAddMember.data.message) {
        // console.log(resAddFollower.data);
        setAddMember(resAddMember.data);
      }
      // setAddfollower
    }
  }, [resAddMember]);
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
  const handleLabelChange = (event) => {
    setSelectedLabel(event.target.value);
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
    if (viewProject) {
      let formData = new FormData();
      formData.append("general", "view_pipeline_stages");
      formData.append("layout", "list");
      formData.append("gtRs", viewProject.lead_data.pipeline);
      setOwnerhidden(viewProject?.lead_data.assigned_to)
      apiMethod("postAllViewProjectsPiplinesStages", formData);
    }
  }, [viewProject]);
  useEffect(() => {
    if (viewProject && viewProject.lead_data) {
      setActionL(viewProject?.actionEventsData)
      setMeetingL(viewProject?.meetingEventsData)
      setAssetsNotes(viewProject?.note);
      // settagValu();
      apiMethod("postAllViewProjectsPiplinesStages", {
        general: "view_pipeline_stages",
        gtRs: viewProject.lead_data.pipeline,
        layout: "list",
      });
      apiMethodLostReason("postAllProjectsStagesSettings", {
        pipeline_id: viewProject.lead_data.pipeline,
      });
      addHeading(`Edit Project `);
      setAssetsFile(viewProject?.filesData);
      setPreviousContact(viewProject?.contact);
      setEditLeadFeild(viewProject?.all_fields);
      setmedia_list(viewProject?.mediaData)
      if (!viewProject.lead_data?.tags == "") {
        setselectTag(viewProject.lead_data?.tags?.split(","));
      }
      //     setopportunityData(editLead.Opportunity);
      //     setEmails(`${editLead.opportunity_data.email}`);
      //     setcorrelationView(editLead.correlations);
      setPreviousFollower(viewProject.followersData);
      setPreviousMember(viewProject.membersData);
      //     setPracticeName(allData.timeZone.filter((item) => { return item.value == datas.opportunity_data.time_zone; })[0]);
      //     setPhoneNumber({
      //         number: editLead.opportunity_data.number,
      //         mobile_phone: editLead.opportunity_data.mobile_phone
      //     });
      //     setStage(editLead.opportunity_data.prospect_stage);
    }
  }, [viewProject]);
  console.log("21sdaad" + assetsFile);
  useEffect(() => {
    if (viewProject && !viewProject.message) {
      addHeading(`Project - ${viewProject?.lead_data?.project_title}`);
      setEditLeadFeild(viewProject?.all_fields);
      setprojecttitle(viewProject.lead_data.project_title);
      setprojectvalue(viewProject.lead_data.assigned_to);
      setassigntoname(viewProject.lead_data.assigned_to_name);
      setAssetsNotes(viewProject?.note);
      setMember(viewProject?.membersData);
      setFollower(viewProject?.followersData);
    }
  }, [viewProject]);
  const handleClick = (item) => {
    setSearchval(item.uname);
    setOwnerhidden(item.id);
    setListOpen(false);
  };
  function radiovalue() {
    console.log(selectedOption)
    setListOpen3(false)
    setradiolist(true)

    let formdata = new FormData();
    let labelValues = selectedLabel.toLowerCase()

    formdata.append("related", labelValues);
    formdata.append("ids", selectedOption);
    formdata.append("event_create", "general_event_view_query");
    apiMethodcontact("postSearchEventsViewModuleRelated", formdata);
  }
  const handleList3 = () => {
    let formdataOwner = new FormData();
    let labelValues = selectedLabel.toLowerCase();
    formdataOwner.append("related", labelValues);
    formdataOwner.append("q", searchval3);
    formdataOwner.append("event_create", "general_event_create_query");
    apiMethodowner3("postSearchEventsModuleRelated", formdataOwner);
    setListOpen3(!listOpen3);
  };
  const handleClick3 = (item) => {
    setSearchval3(item.text);
    setOwnerhidden3(item.value);

  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
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
    // let field = {
    //   general: "delete_file",
    //   fieldId: item.db_file_id,
    //   filelead: item.file_lead,
    //   filename: item.file_name,
    // };
    // setAssetsFile(
    //   {
    //     ...assetsFile,
    //     data: assetsFile.data.filter((its) => its.db_file_id != item.db_file_id)
    //   }
    // );
    // apiMethodDeleteAsset("postDeleteLeadAssets", field);
  };
  const delAddFollower = (item) => {
    const formdata = new FormData();

    formdata.append("uopp1", viewProject.lead_data.pipeline);
    formdata.append("uopp", id);
    formdata.append("mode", "prj_lead");
    formdata.append("unFollow", item.id);
    apiMethod4("postDltFollowersProjects", formdata);
    setPreviousFollower(previousFollower.filter((val) => val.id !== item.id));
  };
  const delAddMember = (item) => {
    const formdata = new FormData();

    formdata.append("uopp1", viewProject.lead_data.pipeline);
    formdata.append("uopp", id);
    formdata.append("mode", "prj_mem");
    formdata.append("unFollow", item.id);
    apiMethod4("postUnfollowMember", formdata);
    setPreviousMember(previousMember.filter((val) => val.id !== item.id));
  };
  useEffect(() => {
    if (resUpdateAddFollower.data) {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditProjects/${id}`)
        .then((response) => {
          setPreviousFollower(response.data.followersData);
        })
        .catch((err) => {
          // console.log('eerr', err);
        });
    }
  }, [resUpdateAddFollower]);
  useEffect(() => {
    if (resUpdateAddMember.data) {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getEditProjects/${id}`)
        .then((response) => {
          setPreviousMember(response.data.membersData);
        })
        .catch((err) => {
          // console.log('eerr', err);
        });
    }
  }, [resUpdateAddMember]);
  useEffect(() => {
    if (res1.data) {
      if (res1.data && !res1.isLoading) {
        toast.success(res1.data.message);
      }
    }
  }, [res1.data]);
  const subbb = async (v) => {
    setcategory(v);
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat");
    v.map((item) => formdata.append("query[]", item));
    apiMethodPostCategory("postViewSubCategory", formdata);
  };
  const onSearchFollowerAdd = (v) => {
    const formdata = new FormData();
    formdata.append("query", v);
    formdata.append("userType", "typeSearch");
    apiMethodAddFollower("postSpecifiesUsers", formdata);
  };
  const addNote = () => {
    let formdata = new FormData();
    formdata.append("prj_id", id);
    formdata.append("notes", content);
    privateNote &&
      formdata.append("private_note", "private_note");
    // privateNote.target && console.log(content, privateNote.target.value);
    apiMethodAddNote("postNotesUpdatedProject", formdata);
    setContent("")

  };
  const onSearchMemberAdd = (v) => {
    const formdata = new FormData();
    formdata.append("query", v);
    formdata.append("uLead", id);
    formdata.append("getType", "typeSearch1");
    formdata.append("mode", "Project");
    formdata.append("typeSearch1", "member");
    formdata.append("userType", "typeSearchMember");
    apiMethodAddMember("postSerchMember", formdata);
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
  const onSearchFollower = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    apiMethodowner2("postSpecifiesUsers", formdataOwner);
  };
  const [resTag, apiMethodTag] = usePost();
  const [tagoption, setTagOption] = useState([]);
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
  const handleJustifyClick3 = (value) => {
    if (value == assettab) {
      return;
    }

    setAssettab(value);
  };
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const handleJustifyClick4 = (value) => {
    if (value == justifyActive3) {
      return;
    }
    setJustifyActive3(value);
  };
  const handleJustifyClick5 = (value) => {
    if (value == justifyActive4) {
      return;
    }
    setJustifyActive4(value);
  };
  const handleToggle = (e) => {
    e.preventDefault();
    $(e.target).closest(".card").toggleClass("card-collapsed");
  };
  const updateAddFollower = () => {
    const formdata = new FormData();
    formdata.append("uLeadType", "prjFollwer");
    formdata.append("uLead", id);
    formdata.append("uLeadPipe", viewProject.lead_data.pipeline);
    let selectedFollowerId =
      addselectedFollower.length &&
      addselectedFollower.map((item) => {
        return item.key;
      });
    addselectedFollower.length &&
      selectedFollowerId.map((v, i) => {
        formdata.append(`userLead[${i}]`, v);
      });
    apiMethodupdateAddFollower("postAddFollowersProjects", formdata);
    //
  };
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


  useEffect(() => {
    if (category_select_list1Media) {
      let data = category_select_list1Media.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        }
      })
      setCategory_select_listMedia(data)
      console.log(data, 'sda');
    }
  }, [category_select_list1Media])
  const updateAddMember = () => {
    const formdata = new FormData();
    formdata.append("uLeadType", "prjMember");
    formdata.append("uLead", id);
    formdata.append("uLeadPipe", viewProject.lead_data.pipeline);
    let selectedMemberId =
      addselectedMember.length &&
      addselectedMember.map((item) => {
        return item.key;
      });
    addselectedMember.length &&
      selectedMemberId.map((v, i) => {
        formdata.append(`userLead[${i}]`, v);
      });
    apiMethodupdateAddMember("postSelectedMemberInsert", formdata);
    //
  };
  function handlesubmit2(values) {
    console.log(values);
    let formdata = new FormData();
    for (let item in values) {
      formdata.append(item, values[item]);
    }
    // formdata.append("file_follw", "public");
    formdata.append("projectid", id);

    formdata.append("submit_lead", "submit");
    formdata.append("tags[]", selectTag);

    formdata.append("s_rlto", "");
    formdata.append("notes", "");
    formdata.append("opps", id);
    formdata.append("prj_assign", ownerhidden);

    image2 && formdata.append("upload_file", image2);
    imageMedia && formdata.append("upload_media", imageMedia)

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
          formdata.append(`media_followers[${i}]`, v);
        });
    }
    if (followerSelectValueMedia == "Custom") {
      selectedFollower.length &&
        selectedFollower.map((v, i) => {
          formdata.append(`md_follw[${i}]`, v);
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
    apiMethod1("postUpdateProjects", formdata)
  }
  const handleFullScreen = (e) => {
    e.preventDefault();
    $(e.target).closest(".card").toggleClass("card-fullscreen");
  };

  if (loading) return <Loader />;

  if (viewProject && !viewProject.message) {
    var initialValues = viewProject?.lead_data;
    initialValues = {
      ...initialValues,
      projectsource: viewProject?.lead_data?.lead_projectsource,
    };
    var imgVal = viewProject?.lead_data?.avatar;
  }
  let initialValues1 = {
    prj_title: viewProject?.lead_data.project_title,
    project_value: viewProject?.lead_data.assigned_to,
    prj_status: viewProject?.lead_data.status_id,
    start_date: viewProject?.lead_data.start_date,
    end_date: viewProject?.lead_data.start_date,
    prj_stage: viewProject?.lead_data.project_stage,
    prj_desc: viewProject?.lead_data.project_description,
    prj_location: viewProject?.lead_data.project_location,
    rlto: viewProject?.lead_data.project_related_to_id
  };
  console.log(leadPermission);

  return (
    initialValues &&
    !initialValues.message &&
    viewProject &&
    !viewProject.message && (
      <div className="editLeadForm">
        <div className="container-fluid">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="media">
                    <img
                      className="avatar avatar-xxl mr-5"
                      src={imgVal}
                      alt="avatar"
                    />
                    <div className="media-body">
                      <h5 className="m-0">{initialValues?.fullname}</h5>

                      <div className=" socialBtn">
                        <a href={`mailto:${initialValues?.email}`}>
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
                        Project Owner: {viewProject?.lead_data?.owner_to_name}
                        <br />
                        Assigned to: {viewProject?.lead_data?.assigned_to_name}
                      </p>
                    </div>
                  </div>
                  <div className="score">{initialValues?.score_number}</div>
                  <div className="card-options">
                    <div>
                      <label className="form-label">
                        Stage:
                        <br />
                      </label>{" "}
                      {Translation(
                        translations,
                        viewProject?.lead_data?.stage_name
                      )}
                    </div>
                    <div className="item-action dropdown ml-2">
                      <a data-toggle="dropdown" aria-expanded="false">
                        <i className="fe fe-more-vertical"></i>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item">
                          <i className="dropdown-icon fa fa-share-alt"></i> Edit
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
          <Formik initialValues={initialValues1} onSubmit={handlesubmit2}>
            <Form>
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card">
                    <div className="card-status bg-blue"></div>
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fa fa-users text-muted"></i> Summary
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
                        <div className="section-body_">
                          <div className="container-fuild">
                            <div className="card-body justify-content-center">
                              <div className="col-md-12 mb-3">
                                <label className="form-label">
                                  <b>
                                    {Translation(translations, "Assign to:")}
                                  </b>
                                </label>
                                {Translation(translations, assigntoname)}{" "}
                              </div>
                              <div className="col-md-12 mb-3">
                                <label className="form-label">
                                  <b>
                                    {Translation(translations, "Project Owner:")}
                                  </b>
                                </label>
                                {Translation(translations, assigntoname)}{" "}
                              </div>
                              {leadPermission?.super_admin || leadPermission?.projects?.fields?.projects_prj_title === 'true' ?
                                <div className="col-md-12">
                                  <FormControl
                                    className="form-control my-1"
                                    label={Translation(
                                      translations,
                                      "Project Title"
                                    )}
                                    name="prj_title"
                                    control="input3"
                                    placeholder={Translation(
                                      translations,
                                      "Project Title"
                                    )}
                                  />
                                </div> :
                                leadPermission?.projects?.fields?.projects_prj_title === '-1' ?
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label className="form-label">
                                        {Translation(translations, "Project Title")}
                                      </label>
                                      <p className="mb-0">
                                        {Translation(translations, `${viewProject?.lead_data.project_title}`)}
                                      </p>{" "}
                                    </div>
                                  </div> :
                                  ''
                              }
                              <div className="col-md-12">


                                {leadPermission?.super_admin || leadPermission?.projects?.fields?.projects_prj_stage === 'true' ?
                                  <div className="col-md-12">
                                    <label className="form-label"> Project Stage
                                      <Field
                                        className="form-control my-1"
                                        name="prj_stage"
                                        as="select"
                                      >
                                        {res.data?.map((item, i) => {
                                          return (
                                            <option key={i} value={item.id}>
                                              {item.name}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                    </label>
                                  </div> :
                                  leadPermission?.projects?.fields?.projects_prj_stage === '-1' ?
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translations, "Project Stage")}
                                        </label>
                                        <p className="mb-0">
                                          {Translation(translations, `${viewProject?.lead_data.stage_name}`)}
                                        </p>{" "}
                                      </div>
                                    </div> :
                                    ''
                                }
                                {leadPermission?.super_admin || leadPermission?.projects?.fields?.projects_prj_status === 'true' ?
                                  <div className="col-md-12">
                                    <label className="form-label">
                                      Status
                                      <Field
                                        className="form-control my-1"
                                        name="prj_status"
                                        as="select"
                                        defaultValue={viewProject?.lead_data.status_id}
                                      >


                                        {Projectstatus?.map((item, i) => {
                                          return (
                                            <option key={i} value={item.status_id}>
                                              {item.status_name}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                    </label>
                                  </div> :
                                  leadPermission?.projects?.fields?.projects_prj_status === '-1' ?
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translations, "Status")}
                                        </label>
                                        <p className="mb-0">
                                          {Translation(translations, `${viewProject?.lead_data.status_name}`)}
                                        </p>{" "}
                                      </div>
                                    </div> :
                                    ''
                                }


                                {leadPermission?.super_admin || leadPermission?.projects?.fields?.projects_prj_startdate === 'true' ?
                                  <div className="col-md-12">
                                    <FormControl
                                      className="form-control my-1"
                                      label={Translation(translations, "Start Date")}
                                      type="date"
                                      control="input3"
                                      name="start_date"
                                      placeholder={Translation(
                                        translations,
                                        "Start Date"
                                      )}
                                    />
                                  </div> :
                                  leadPermission?.projects?.fields?.projects_prj_startdate === '-1' ?
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translations, "Start Date")}
                                        </label>
                                        <p className="mb-0">
                                          {Translation(translations, `${viewProject?.lead_data.start_date}`)}
                                        </p>{" "}
                                      </div>
                                    </div> :
                                    ''
                                }
                                {leadPermission?.super_admin || leadPermission?.projects?.fields?.projects_prj_enddate === 'true' ?
                                  <div className="col-md-12">
                                    <FormControl
                                      className="form-control my-1"
                                      label={Translation(translations, "End Date")}
                                      type="date"
                                      control="input3"
                                      name="end_date"
                                      placeholder={Translation(
                                        translations,
                                        "Start Date"
                                      )}
                                    />
                                  </div> :
                                  leadPermission?.projects?.fields?.projects_prj_enddate === '-1' ?
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translations, "End Date")}
                                        </label>
                                        <p className="mb-0">
                                          {Translation(translations, `${viewProject?.lead_data.end_date}`)}
                                        </p>{" "}
                                      </div>
                                    </div> :
                                    ''
                                }

                                {leadPermission?.super_admin || leadPermission?.projects?.fields?.projects_prj_description === 'true' ?
                                  <div className="col-md-12">
                                    <FormControl
                                      className="form-control my-1"
                                      label={Translation(
                                        translations,
                                        "Description"
                                      )}
                                      name="prj_desc"
                                      control="textarea"
                                      placeholder={Translation(
                                        translations,
                                        "Description"
                                      )}
                                    />
                                  </div> :
                                  leadPermission?.projects?.fields?.projects_prj_description === '-1' ?
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translations, "Project Description")}
                                        </label>
                                        <p className="mb-0">
                                          {Translation(translations, `${viewProject?.lead_data.project_description}`)}
                                        </p>{" "}
                                      </div>
                                    </div> :
                                    ''
                                }
                                {leadPermission?.super_admin || leadPermission?.projects?.fields?.projects_prj_location === 'true' ?
                                  <div className="col-md-12">
                                    <FormControl
                                      className="form-control my-1"
                                      label={Translation(translations, "Location")}
                                      name="prj_location"
                                      control="input3"
                                      placeholder={Translation(
                                        translations,
                                        "Location"
                                      )}
                                    />
                                  </div> :
                                  leadPermission?.projects?.fields?.projects_prj_location === '-1' ?
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          {Translation(translations, "Location")}
                                        </label>
                                        <p className="mb-0">
                                          {Translation(translations, `${viewProject?.lead_data.project_location}`)}
                                        </p>{" "}
                                      </div>
                                    </div> :
                                    ''
                                }

                                {leadPermission?.projects?.fields?.projects_prj_assignto === 'true' ?
                                  <div className="col-sm-12 mb-3">
                                    <label className="form-label">
                                      {Translation(translations, "Lead Assign to")}
                                    </label>
                                    <div
                                      ref={ownerRef}
                                      className="searchDropDown"
                                    >
                                      <input
                                        type="text"
                                        className="form-control"
                                        ref={inputElement}
                                        name="prj_assign"
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
                                                    translations,
                                                    `${item.uname}`
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
                                  : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="section-body">
                          <div className="container-fuild">
                            <div className="row clearfix">
                              <div className="col-md-12">
                                {viewProject.all_fields &&
                                  !viewProject.all_fields.message ? (
                                  <div className="innerNav">
                                    <MDBTabsContent>
                                      {Object.keys(viewProject.all_fields).map(
                                        function (item, i) {
                                          return (
                                            <MDBTabsPane
                                              key={i}
                                              show={
                                                justifyActive2 === `tab2${i}`
                                              }
                                            >
                                              <div className="card">
                                                <div className="card-body">
                                                  {Object.keys(
                                                    viewProject.all_fields[item]
                                                  ).map((item1, index) => {
                                                    return (
                                                      <div key={index}>
                                                        <h3 className="card-title mb-3">
                                                          {Translation(
                                                            translations,
                                                            item1.replace(
                                                              /_/g,
                                                              " "
                                                            )
                                                          )}
                                                        </h3>
                                                        {Object.keys(
                                                          viewProject
                                                            .all_fields[item][
                                                          item1
                                                          ]
                                                        ).map(
                                                          (item2, index2) => {
                                                            let labelName = `projects_${viewProject.all_fields[
                                                              item
                                                            ][item1][
                                                              item2
                                                            ]?.label.replaceAll(
                                                              " ",
                                                              "_"
                                                            )}`;
                                                            return (
                                                              (leadPermission?.super_admin ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                labelName
                                                                ] === "true" ||
                                                                leadPermission
                                                                  ?.projects
                                                                  ?.fields[
                                                                labelName
                                                                ] === "-1") &&
                                                              viewProject
                                                                .all_fields[
                                                                item
                                                              ][item1][item2]
                                                                .value && (
                                                                <div
                                                                  key={index2}
                                                                  className="col-md-6"
                                                                >
                                                                  <div className="form-group">
                                                                    <label className="form-label">
                                                                      {Translation(
                                                                        translations,
                                                                        viewProject
                                                                          .all_fields[
                                                                          item
                                                                        ][
                                                                          item1
                                                                        ][item2]
                                                                          ?.label
                                                                      )}
                                                                    </label>
                                                                    {Translation(
                                                                      translations,
                                                                      viewProject
                                                                        .all_fields[
                                                                        item
                                                                      ][item1][
                                                                        item2
                                                                      ]?.value
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              )
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br />
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
                      {editLeadFeild && (
                        <div className="innerNav">
                          <MDBTabs
                            justify
                            className="nav d-flex nav-tabs page-header-tab"
                          >
                            {Object.keys(editLeadFeild).map((item, index) => {
                              return (
                                <MDBTabsItem key={index}>
                                  <MDBTabsLink
                                    onClick={() =>
                                      handleJustifyClick2(`tab2${index}`)
                                    }
                                    active={justifyActive2 == `tab2${index}`}
                                  >
                                    {item.replace(/_/g, " ")}
                                  </MDBTabsLink>
                                </MDBTabsItem>
                              );
                            })}
                          </MDBTabs>
                          <MDBTabsContent>
                            {Object.keys(editLeadFeild).map(function (key, i) {
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
                                                if (field_required == "yes") {
                                                  if (
                                                    !reqName.includes(label)
                                                  ) {
                                                    if (
                                                      leadPermission?.super_admin ||
                                                      leadPermission
                                                        ?.opportunities?.fields[
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
                                                      if (type == "select") {
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
                                                                "yes" && true
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
                                                                "yes" && true
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
                                                                "yes" && true
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
                                                                "yes" && true
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
                                                                "yes" && true
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
                                                                "yes" && true
                                                              }
                                                              label={Translation(
                                                                translations,
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
                                                              // options={body.split(",")}
                                                              type="number"
                                                              className="form-control my-1"
                                                              required={
                                                                field_required ==
                                                                "yes" && true
                                                              }
                                                              label={Translation(
                                                                translations,
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
                                                              // options={body.split(",")}
                                                              type="time"
                                                              className="form-control my-1"
                                                              required={
                                                                field_required ==
                                                                "yes" && true
                                                              }
                                                              label={Translation(
                                                                translations,
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

                          {Array.isArray(assetsnotes) && assetsnotes.length && assetsnotes?.map((item, index) => {
                            return (
                              <div className="summernote" key={index}>

                                <div className="card blog_single_post">
                                  {item.note_privacy === "1" && <div className="text-left"> <span className="tag tag-danger">Private Note</span> </div>
                                  }                              <div className="card-body">

                                    <p dangerouslySetInnerHTML={{ __html: item.note_value }}></p>
                                  </div>
                                  <div className="card-footer p-2">
                                    <div className="clearfix">
                                      <div className="float-left"><strong>{<Handle_convert_system_timezone
                                        dateAndTime={item.note_date}
                                      />}</strong></div>
                                      <div className="float-right">Posted By <small className="text-muted">{item.f_name + " " + item.l_name + " " + item.email}</small></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      {leadPermission?.super_admin ||
                        leadPermission?.projects?.fields
                          ?.projects_prj_notes === "true" ||
                        (leadPermission?.projects?.fields
                          ?.projects_prj_notes === "-1" &&
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
                          }))}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-status bg-blue"></div>

                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fa fa-users text-muted"></i> Projects (#)
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

                      {Array.isArray(viewProject?.project) && viewProject?.project.map((item, i) => {
                        return (
                          <div key={i} className="col-md-12 col-lg-12 col-sm-12"> <div className="c2_own"><ul className="right_chat list-unstyled p-0 right_chat_vl">
                            <li className="online mb-2">
                              <Link
                                to={

                                  `/${config.ddemoss
                                  }view/project/${item.prj_id
                                  }`
                                }
                              >
                                <a href="#" className="cc_cls" data-row="12"><i className="fa-solid fa-xmark"></i></a>
                                <div className="media">
                                  <img className="media-object " src={item.project_feature_image} alt="" />
                                  <div className="media-body">
                                    <span className="name">{item?.project_title} </span>
                                    <div className="message">{item?.name}</div>
                                    {item.start_date && <span className="message">{item.start_date}</span>} <span className="dashsymbol"> | - | </span> {item.end_date && <span className="message">{item.end_date}</span>}
                                    <span className="badge badge-outline status"></span>

                                  </div>

                                </div>
                              </Link>
                            </li>
                          </ul></div> </div>
                        )
                      })}



                    </div>
                  </div>
                  <div className="card">
                    <div className="card-status bg-blue"></div>

                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fa fa-users text-muted"></i> Conversations
                        <small>Web hook to load content in future</small>
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

                    <div className="card-body"></div>
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
                      <div className="row tagss">

                        {/* <Select
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
                        /> */}
                        {
                          leadPermission?.super_admin ||
                            leadPermission?.projects?.fields
                              ?.projects_prj_tags === "true" ?
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
                            </div> :
                            leadPermission?.super_admin ||
                              leadPermission?.projects?.fields
                                ?.projects_prj_tags === '-1' ?
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      {viewProject?.lead_data?.tags}
                                    </div>
                                  </div>
                                </div>
                              </div> : ''
                        }
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
                        leadPermission?.projects
                          ?.fields
                          ?.projects_prj_fileupload === "true" ? (
                        <div className="row clearfix">
                          <div className="col-md-12 mb-2">
                            <File
                              onUpload={setImage2}
                              label={Translation(translations, "Upload File")}
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
                            <div className="my-2">
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
                                {resowner2.data &&
                                  !resowner2.data.message &&
                                  resowner2.data.map(({ uname, id, text }) => (
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
                      ) : (
                        ""
                      )}
                      {!assetsFile ? (
                        <Skeleton count={5} />
                      ) : assetsFile.message != "No Data Found" ? (
                        <div className="table-responsive">
                          <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0 ">
                            {assetFileMedia && (
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
                            )}
                            <tbody>
                              {Array.isArray(assetsFile.data) &&
                                assetsFile.data.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="width45">
                                        <i className="fa fa-file-excel-o text-success"></i>
                                      </td>
                                      <td>
                                        <span className="folder-name">
                                          <a
                                            href={item.file_value}
                                            download={
                                              item?.file_value?.includes(
                                                `http`
                                              )
                                                ? item?.file_value
                                                : `${config.baseurl2}${item?.file_value}`
                                            }
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
                                            follower_select_list={
                                              follower_select_list
                                            }
                                            obj={redata?.CEO}
                                            resowner={resowner}
                                            id={id}
                                            category_data={
                                              category_select_list
                                            }
                                            updated_date={setAssetsFile}
                                            updateTimeLine={reRenderTimeline}
                                            file_type={"file"}
                                            module={"Project"}

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
                              <tr>  {
                                assetsFile.data &&
                                Array.isArray(assetsFile.data) &&
                                assetsFile.has_more_data &&
                                <button type="button" className="btn btn-primary" onClick={handle_File_more}>Load More</button>
                              }</tr>
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
                        {Translation(translations, "Related To Contact")}{" "}
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
                      <div className="doubelInput">
                        {leadPermission?.super_admin ||
                          leadPermission?.projects?.fields
                            ?.projects_prj_relatedto === "true" ? (
                          <div>
                            <FormControl
                              className="form-control my-1"
                              placeholder={"None"}

                              label={Translation(translations, "Related to:")}
                              name="rlto"
                              selectList={items}
                              custom_label_name="label"
                              customer_value_name="label"
                              control="select_custom_options"
                              selectedItem={selectedLabel}
                              onChange={handleLabelChange}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {leadPermission?.super_admin ||
                          leadPermission?.projects?.fields
                            ?.projects_prj_relatedto === "true" ? (
                          <div className="mergediv">
                            <div ref={ownerRef3} className="searchDropDown">
                              <input
                                type="text"
                                className="form-control"
                                ref={inputElement3}
                                name="s_rlto"
                                value={searchval3}
                                onChange={(e) => setSearchval3(e.target.value)}
                                placeholder={Translation(
                                  translations,
                                  "Type & Search"
                                )}
                              />
                              <button
                                className="nav-link clickButton"
                                type="button"
                                id="dropdownMenuButton"
                                onClick={() => handleList3()}
                              >
                                <FaSearch />
                              </button>
                            </div>
                            <div
                              className={`dropDownCustom mylist contactlist ${listOpen3 && "active"
                                }`}
                            >
                              {resowner3.data && (
                                <ul className="list ">
                                  {resowner3.isLoading ? (
                                    ""
                                  ) : !resowner3.data.message ? (
                                    resowner3.data.map((item, index) => {
                                      return (
                                        <li
                                          key={index}
                                          onClick={() => handleClick3(item)}
                                        >

                                          {/* {Translation(translations, `${item.text }`)} */}
                                          <label>
                                            <input value={item.value} type="radio" checked={selectedOption === `${item.value}`} onChange={handleOptionChange} />    &nbsp;    &nbsp; <span>{item.text}</span>
                                          </label>
                                        </li>
                                      );
                                    })
                                  ) : (
                                    <li>
                                      {Translation(
                                        translations,
                                        `${resowner3.data.message}`
                                      )}
                                    </li>
                                  )}
                                </ul>
                              )}
                              <button type="button" onClick={radiovalue} className="btn btn-primary m-2" >Done Selection</button>
                            </div>
                            <input
                              type="hidden"
                              name={"Assignto"}
                              value={ownerhidden3}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {radiolist && rescontact.data &&

                      <div className="col-md-8 col-sm-12"> <div className="c2_own"><ul className="right_chat list-unstyled p-0 right_chat_vl">
                        <li className="online mb-2">
                          <a href="#" className="cc_cls" data-row="12"><i className="fa-solid fa-xmark"></i></a>
                          <div className="media">
                            <img className="media-object " src={rescontact?.data[0].avatar} alt="" />
                            <div className="media-body">
                              <span className="name">{rescontact?.data[0].names} </span>
                              <span className="message">{rescontact?.data[0].mail}</span>						&nbsp; {rescontact?.data[0].date && <span className="dashsymbol"> | - | </span>} {rescontact?.data[0].date && <span className="message">{rescontact?.data[0].date}</span>}
                              <span className="badge badge-outline status"></span>
                            </div>
                          </div>
                        </li>
                      </ul></div> </div>

                    }
                  </div>

                  <div className="card leadCards">
                    <div className="card-header">
                      <h3 className="card-title">
                        {Translation(translations, "Members")}
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
                        mode="multiple"
                        filterOption={true}
                        onSearch={(v) => {
                          onSearchMemberAdd(v);
                        }}
                        onChange={(v1, v2) => {
                          setAddselectedMember(v2);
                        }}
                        style={{ width: "100%", height: 40 }}
                        placeholder={"Search member name"}
                      >
                        {addMember.length &&
                          addMember.map(({ uname, id }) => (
                            <Select.Option value={uname} key={id}>
                              {uname}
                            </Select.Option>
                          ))}
                      </Select>
                      <button
                        type="button"
                        className="my-3 btn w-100 btn-primary"
                        onClick={() => {
                          updateAddMember();
                        }}
                      >
                        Update Member
                      </button>
                      <div className="">
                        {Array.isArray(previousMember) &&
                          previousMember.map((v, i) => {
                            if (v) {
                              return (
                                <div className="chip my-2" key={i}>
                                  <span
                                    className="avatar"
                                    style={{
                                      backgroundImage:
                                        "url('./media/8410448a908412cec09fc9a1b42e7c1eeaf1031c.jpg')",
                                    }}
                                  ></span>
                                  <div className="d-flex align-item-center">
                                    <span>{v.uname}</span>
                                    <a
                                      className="btnunfollow"
                                      data-follow="14"
                                      onClick={() => {
                                        delAddMember(v);
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
                  <div className="card leadCards">
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
                          addFollower.map(({ uname, id }) => (
                            <Select.Option value={uname} key={id}>
                              {uname}
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
                                      backgroundImage:
                                        "url('./media/8410448a908412cec09fc9a1b42e7c1eeaf1031c.jpg')",
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
                            onChange={(v) => { setsubCat_selectedMedia(v); console.log(v); }}
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
                      {!media_list.data ? (
                        ""
                      ) : media_list.message != "No Data Found" ? (
                        <div className="table-responsive">
                          <div className="row row-cards">
                            {media_list &&
                              Array.isArray(media_list.data) &&
                              media_list.data.map((items, i) => {

                                return (
                                  <div
                                    className="col-sm-6 col-lg-5 ml-2"
                                    key={i}
                                  >
                                    <div className="card card__media p-1 card-custom">
                                      <Media_image_display data={items}>
                                        <img
                                          className="media_image_height"
                                          src={
                                            items?.file_value &&
                                              items?.file_value.includes("http")
                                              ? items?.file_value
                                              : `${config.baseurl2}${items?.file_value} `
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
                                              updated_date={setmedia_list}
                                              category_data={category_select_list}
                                              file_type={"media"}
                                              module={"Project"}
                                            />
                                          ) : null}
                                        </div>
                                      </div>
                                      {/* <hr />
                                          <div className="d-flex align-items-center justify-content-between px-2">
                                            <div>
                                              <b>
                                                {Translation(
                                                  translations,
                                                  "File Size"
                                                )}
                                                :
                                              </b>
                                              <br /> {items?.file_size}
                                            </div>
                                          </div> */}
                                    </div>

                                  </div>
                                )
                              })}
                            {
                              media_list.data &&
                              Array.isArray(media_list.data) &&
                              media_list.has_more_data &&
                              <button type="button" className="btn btn-primary" onClick={handleMediaMOre}>Load More</button>
                            }
                          </div>
                          <Modal
                            show={showModal}
                            onHide={handleClose3}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>
                                {Translation(
                                  translations,
                                  "Edit Media Files"
                                )}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="row clearfix">
                                <div className="my-2 ">
                                  <FormControl
                                    className="form-control my-1"
                                    defaultValue={
                                      followerSelectValueMediaModal
                                    }
                                    selectList={follower_select_list}
                                    label={"Followers"}
                                    name="follower_select2"
                                    control="select"
                                    firstSelect={"--select--"}
                                    onChange={(e) =>
                                      setfollowerSelectValueMediaModal(
                                        e.target.value
                                      )
                                    }
                                  ></FormControl>
                                </div>
                                {followerSelectValueMediaModal ==
                                  "Custom" && (
                                    <div>
                                      <label>
                                        <b>Choose Follower</b>
                                      </label>
                                      <div className="margin_bottom">
                                        <Select
                                          defaultValue={
                                            selectedFollowerMediaModal
                                          }
                                          mode="multiple"
                                          filterOption={true}
                                          onSearch={(v) => {
                                            onSearchFollowerMedia(v);
                                          }}
                                          onChange={(v, v2) => {
                                            let a = v2.map((item) => {
                                              return item.key;
                                            });
                                            setselectedFollowerMediaModal(a);
                                          }}
                                          style={{ width: "100%", height: 40 }}
                                          placeholder={"type follower name"}
                                        >
                                          {resowner.data &&
                                            !resowner.data.message &&
                                            resowner.data.map(
                                              ({ uname, id, text }) => (
                                                <Select.Option
                                                  value={uname}
                                                  key={id}
                                                >
                                                  {uname}
                                                </Select.Option>
                                              )
                                            )}
                                        </Select>
                                      </div>
                                    </div>
                                  )}
                                {followerSelectValueMediaModal == "Role" && (
                                  <div>
                                    <select
                                      defaultValue="dadadad"
                                      className="form-control margin_bottom"
                                      onChange={(e) =>
                                        setselectedFollowerMediaModalRole([
                                          e.target.value,
                                        ])
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

                                  {dataModal?.categories?.map((item) => {
                                    setCategoryIds(item.cat_id);
                                  })}

                                  <Select
                                    mode="multiple"
                                    defaultValue={categoryIds}
                                    onChange={(v, v2) => {
                                      subbbMediaModal(v, v2);
                                    }}
                                    style={{ width: "100%", height: 40 }}
                                    placeholder={"type follower name"}
                                    filterOption={(input, option) =>
                                      (option?.children ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                  >
                                    {category_select_listMediaModal.length &&
                                      category_select_listMediaModal.map(
                                        ({ label, value }) => (
                                          <Select.Option
                                            value={value}
                                            key={value}
                                          >
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
                                  {dataModal?.subCategories?.map((item) => {
                                    subCategoryIds.push(item.cat_id);
                                  })}
                                  <Select
                                    defaultValue={subCategoryIds}
                                    mode="multiple"
                                    onChange={(v) => {
                                      setsubCat_selectedMediaModal(v);
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
                                    {subCategoryselectMediaModal.length &&
                                      subCategoryselectMediaModal.map(
                                        ({ label, value }) => (
                                          <Select.Option
                                            value={value}
                                            key={value}
                                          >
                                            {label}
                                          </Select.Option>
                                        )
                                      )}
                                  </Select>
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="primary" onClick={handleEdit}>
                                {Translation(translations, "Update")}
                              </Button>
                            </Modal.Footer>
                          </Modal>
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
                      module={"project"}
                      idd={id} data={datas?.clanderEventsData} dataOpportunities={datas?.opportunity} />
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-status bg-blue"></div>
                    <div className="card-header">
                      <h3 className="card-title">
                        <i className="fa fa-calendar-check-o text-muted"></i>{" "}
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
                      <EditLeadAction assignId={viewProject?.lead_data?.assigned_to_name} modules={"Project"} Id={id} actionData={datas} datasAction={initialValues} />
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
                      <EditLeadMeeting  assignId={viewProject?.lead_data?.assigned_to_name} modules={"Project"} Id={id} meetingData={datas} datasMeeting={initialValues} />
                      <div className="row">
                        {Array.isArray(meetingL) &&
                          <MeetingCard
                            lists={meetingL}
                            actionData={datas}
                          />}
                      </div>
                    </div>
                  </div>
                  {(leadPermission?.super_admin ||
                    leadPermission?.projects?.fields.projects_admininfo) && (
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
                                  <ul className="list-unstyled">
                                    <li className="mt-4">
                                      <div className="row align-items-center">
                                        <div className="col-auto">
                                          {(leadPermission?.super_admin ||
                                            leadPermission?.projects?.fields[
                                            `projects_admin_prjstage_dates`
                                            ]) && (
                                              <>
                                                {" "}
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
                                                    {viewProject?.overView &&
                                                      !viewProject.overView
                                                        .message &&
                                                      Object.keys(
                                                        viewProject?.overView
                                                          .projects_pipline_stages
                                                      ).map((item, index) => {
                                                        return (
                                                          <tr key={index}>
                                                            <td>
                                                              {
                                                                viewProject
                                                                  ?.overView
                                                                  .projects_pipline_stages[
                                                                  item
                                                                ]?.name
                                                              }
                                                            </td>
                                                            <td>
                                                              <HandleConvertTimeOnlyDate
                                                                dateAndTime={
                                                                  viewProject?.overView.projects_pipline_stages[
                                                                    item
                                                                  ]?.assign_on
                                                                }
                                                              />
                                                            </td>
                                                            <td>
                                                              {
                                                                viewProject
                                                                  ?.overView
                                                                  .projects_pipline_stages[
                                                                  item
                                                                ]?.days
                                                              }
                                                            </td>
                                                          </tr>
                                                        );
                                                      })}
                                                  </tbody>
                                                </table>
                                              </>
                                            )}
                                        </div>
                                      </div>
                                    </li>
                                    {/* {viewProject?.overView &&
                                      !viewProject?.overView.message &&
                                      Object.keys(viewProject?.overView).map(
                                        (item, index) => {
                                          console.log(
                                            `projects_admin_${item
                                              .toLowerCase()
                                              .replaceAll(" ", "_")}`
                                          );
                                          return (
                                            (leadPermission?.super_admin ||
                                              leadPermission?.projects?.fields[
                                              `projects_admin_${item
                                                .toLowerCase()
                                                .replaceAll(" ", "_")}`
                                              ]) &&
                                            item !==
                                            "projects_pipline_stages" && (
                                              <li key={index} className="mb-4">
                                                <div className="row align-items-center">
                                                  <div className="col-auto">
                                                    <div className="h5 mb-0">
                                                      {item}
                                                    </div>
                                                    <span className="small text-muted">
                                                      {
                                                        viewProject?.overView[
                                                        item
                                                        ]
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                              </li>
                                            )
                                          );
                                        }
                                      )} */}
                                    {(leadPermission?.super_admin ||
                                      leadPermission?.projects?.fields[
                                      `projects_admin_create_date`
                                      ]) &&
                                      (
                                        <li className="mb-4">
                                          <div className="row align-items-center">
                                            <div className="col-auto">
                                              <div className="h5 mb-0">
                                                Created Date
                                              </div>
                                              <span className="small text-muted">
                                                {

                                                  <Handle_convert_system_timezone
                                                    dateAndTime={viewProject?.overView[
                                                      `created_date`
                                                    ]}
                                                  />
                                                }
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                                      )}
                                    {(leadPermission?.super_admin ||
                                      leadPermission?.projects?.fields[
                                      `projects_admin_updated_date`
                                      ]) &&
                                      (
                                        <li className="mb-4">
                                          <div className="row align-items-center">
                                            <div className="col-auto">
                                              <div className="h5 mb-0">
                                                Updated Date
                                              </div>
                                              <span className="small text-muted">
                                                {
                                                  <Handle_convert_system_timezone
                                                    dateAndTime={viewProject?.overView[
                                                      `updated_date`
                                                    ]}
                                                  />
                                                }
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                                      )}
                                  </ul>
                                </div>
                              </div>
                            </MDBTabsPane>
                            <MDBTabsPane show={justifyActive3 === "tab2"}>
                              <div className="card">
                                <div className="card-body">
                                  {viewProject?.timeLine &&
                                    !viewProject?.timeLine.message &&
                                    viewProject?.timeLine.map((val, i) => {
                                      return (
                                        <div className="timeline_item " key={i}>
                                          <img
                                            className="tl_avatar"
                                            src={
                                              val?.avatar &&
                                                val?.avatar.includes("http")
                                                ? val?.avatar
                                                : `${config.baseurl2}${val?.avatar} `
                                            } alt=""
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
                                                StringConvert(val.activity_value)
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
    )
  );
};

export default EditProject;
