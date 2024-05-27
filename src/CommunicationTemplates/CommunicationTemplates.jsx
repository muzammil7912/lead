import React, { useContext, useState, useRef, useEffect } from "react";
import usePost from "../customHooks/usePost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Link from "antd/es/typography/Link";
import { FaSave } from "react-icons/fa";
import swal from "sweetalert";
import Accordion from "react-bootstrap/Accordion";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainHeadingContext } from "../context/MainHeadingContext";
import Loader from "../components/common/Loading";
import useFetch from "../customHooks/useFetch";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Pagination } from 'antd';
import Button from "react-bootstrap/Button";
import { Select, Space } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Translation } from "../components/Translation";
import { FaSearch } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import config from "../services/config.json";
import { getTokenSession } from "../utils/common";
import { Drawer } from "antd";
import LoopSelect from "../components/form/LoopSelect";
import { StringConvert } from "../components/StringConvert";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { MainTranslationContext } from '../context/MainTranslationContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownLanguage from "../components/form/DropdownLanguage";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";


const API_URL = "https://77em4-8080.sse.codesandbox.io";
const UPLOAD_ENDPOINT = "upload_files";

const provinceData = ["Select", "Communities", "Cities", "Treinamento"];

const cityData = {
  Select: ["Not Selected"],
  Communities: ["Champions gate"],
  Cities: ["Ornald", "Miami"],
  Treinamento: ["Vendas"],
};
const option = ["Select", "SpecificPosition", "PositionandAbove"];
const secondoption = {
  Select: ["Not Selected"],
  SpecificPosition: [
    "Select",
    "CEO",
    "Sales Director",
    "Unit BR",
    "AR Sales",
    "Local Bussiness Unit",
    "Local Sales",
    "Team 01",
    "Local Sales Team 01",
    "Team 02",
    "Concierge Managaer",
    "SDR",
  ],
  PositionandAbove: [
    "Select",
    "CEO",
    "Sales Director",
    "Unit BR",
    "AR Sales",
    "Local Bussiness Unit",
    "Local Sales",
    "Team 01",
    "Local Sales Team 01",
    "Team 02",
    "Concierge Managaer",
    "SDR",
  ],
};

function CommunicationTemplates() {
  const { transData } = useContext(MainTranslationContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
  useEffect(() => {
    if (transData) {
      setLanguage(permissions["system-language"].setting_value ?? "31")
    }
  }, [transData])
  const navigate = useNavigate();
  const { translations } = useContext(MainTranslationContexts);
  const { leadPermission } = useContext(MainLeadPermissionContext);

  useEffect(() => {
    if (leadPermission) {
      addHeading(`Communication Templates`);
      if (leadPermission?.comm_temp_module?.active_module === "0" || leadPermission?.comm_temp_module?.view === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  const [res, apiMethod] = usePost();
  const [rescreate, apiMethodcreate] = usePost();
  const [ressubcat, apiMethodsubcat] = usePost();
  const [resViewAttribute, apiMethodViewAttribute] = usePost();
  const [resViewAttribute_edit, apiMethodViewAttribute_edit] = usePost();
  const [view_attribute_data, set_view_attribute_data] = useState(null)
  const [view_attribute_data_edit, set_view_attribute_data_edit] = useState(null)
  const [datas, setDatas] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [tagoption, setTagOption] = useState([])
  const [currentPage, setCurrentPage] = useState(1);


  // values states
  const [cities, setcities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const [firstop, setfirstop] = useState();
  const [secondop, setSecondop] = useState();
  const [firsteditop, setfirsteditop] = useState();
  const [secondeditop, setsecondeditop] = useState();
  const [firstsect_cont, setfirstsect_cont] = useState();
  const [firstsect_cont2, setfirstsect_cont2] = useState();
  const [secondsect_cont, setsecondsect_cont] = useState();
  const [firsteditsect_cont, setfirsteditsect_cont] = useState();
  const [secondeditsect_cont, setsecondeditsect_cont] = useState();
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [selectededit, setselectededit] = useState([]);
  const [templatename, settemplatename] = useState();
  const [templateid, settemplateid] = useState();
  const [moduletype, setmoduletype] = useState(null);
  const [editorvalue, seteditorvalue] = useState();
  const [language, setLanguage] = useState();
  const [status, setstatus] = useState();
  const [visibility, setvisibility] = useState();
  const [visibility2, setvisibility2] = useState();
  const [loadingg, setloadingg] = useState(false);
  let statusss = { 1: "Enable", 0: "Disable" };
  const [datas1, setDatas1] = useState()
  let cate = { Select: "0", Communities: "1", Cities: "2", Teirnamento: "3" };
  const { data: registerdata, loading2, error2, } = useFetch({ setDatas1 }, "getUserRoles");
  const { data: prof, loading3, error4, } = useFetch("", "getAllProfiles");
  let title = useRef("");
  //  editvalues states
  let edittitle = useRef("");
  const inputElement = useRef();
  const [moduletypeedit, setmoduletypeedit] = useState();
  const [editorvalueedit, seteditorvalueedit] = useState();
  const [languageedit, setlanguageedit] = useState();
  const [statusedit, setstatusedit] = useState();
  const [statusedit2, setstatusedit2] = useState();
  const [visibilityedit, setvisibilityedit] = useState();
  const [secondCityedit, setSecondCityedit] = useState(
    cityData[provinceData[0]][0]
  );
  const [Subcat, setSubcat] = useState([]);
  const [Subcat2, setSubcat2] = useState([]);
  const [adddata, setadddata] = useState(secondoption[option[0]]);
  const [adddata2, setadddata2] = useState(secondoption[option[0]]);
  const [secondaddData, setsecondaddData] = useState(
    secondoption[option[0]][0]
  );
  const [secondaddData2, setsecondaddData2] = useState(
    secondoption[option[0]][0]
  );
  const [editdata, seteditdata] = useState(secondoption[option[0]]);
  const [secondeditData, setsecondeditData] = useState(
    secondoption[option[0]][0]
  );
  const [selected_sub_cat, setSelected_sub_cat] = useState("");
  const [selected_sub_cat2, setSelected_sub_cat2] = useState("");
  const [resowner, apiMethodowner] = usePost();
  const [resdata, apiMethoddata] = usePost();
  const [resdelete, apiMethoddelete] = usePost();
  const [ownerhidden, setOwnerhidden] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [showselect, setshowselect] = useState(false);
  const [showselect1, setshowselect1] = useState(false);
  const [showselect2, setshowselect2] = useState(false);
  const [showselect12, setshowselect12] = useState(false);
  const [modaldata, setmodaldata] = useState(false);
  const [searchval, setSearchval] = useState("");
  const [addmap, setaddmap] = useState();
  const [editmap, seteditmap] = useState();
  const [Cate, setCate] = useState(null);
  const ownerRef = useRef(null);
  const [specsel, setspecsel] = useState(null)
  const [specsel1, setspecsel1] = useState(null)
  const [specsel12, setspecsel12] = useState(null)
  const { addHeading } = useContext(MainHeadingContext);
  const [selectedLanguage, setSelectedLanguage] = useState(null);


  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const [resTag, apiMethodTag] = usePost();
  const onSearchFollowerAdd = (v) => {
    const formdata = new FormData()
    formdata.append("search_term", v)
    apiMethodTag('postSearchTags', formdata)
  }
  const [profiles, setProfiles] = useState("");
  const [profiles2, setProfiles2] = useState("");
  const [limit, setlimit] = useState('');
  const [totalleads, settotalleads] = useState('');
  const [pagination, setpagination] = useState(true)
  const [profilesval, setProfilesval] = useState("");
  const [profilesval2, setProfilesval2] = useState("");
  const [roleval, setRoleval] = useState("--select--")
  const [roleval2, setRoleval2] = useState("Not Selected")
  const handlenode = (e, item) => {
    setProfilesval(item.profile)
    setProfiles(prof)
    const sellistLinks = document.querySelectorAll(".sellist a");
    sellistLinks.forEach(link => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    setRoleval(e.target.textContent);

  }
  function submit1(page, pageSize) {

    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllViewCommunicationTemplates/${page}`)
      .then((response) => {
        if (!response.data.message) {

          console.log(response.data)
          setDatas(response?.data)
          setCurrentPage(page);



        }
        else {
          setpagination(false)
        }

      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }
  const handlenode2 = (e, item) => {
    setProfilesval2(item.profile)
    setProfiles2(prof)
    const sellistLinks = document.querySelectorAll(".sellist a");
    sellistLinks.forEach(link => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    setRoleval2(e.target.textContent);

  }
  useEffect(() => {
    if (resTag.data) {
      if (resTag.data && !resTag.isLoading) {
        if (!resTag.data.message) {
          setTagOption(resTag.data.map((item) => {
            return {
              value: item,
              item,
            }
          }))
        }
      }
    }
  }, [resTag.data])
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    if (moduletype == null) {
      swal({
        title: "Oops...",
        text: "Please select module first, to view attribute list.",
      });
    } else {
      setOpen(true);
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = useState(false);
  const showDrawer1 = () => {
    setOpen1(true);
  };
  const onClose1 = () => {
    setOpen1(false);
  };
  const [buttonToggle, setbuttonToggle] = useState(false)

  const handleClick = (item) => {
    const ch = document.querySelectorAll('.ssch:checked');
    const map = [...ch].map(el => el.value);
    setOwnerhidden(...map, map);
    setaddmap(map);
    seteditmap(map);
  };
  useEffect(() => {
    if (resViewAttribute.data) {
      set_view_attribute_data(resViewAttribute.data)
    }
  }, [resViewAttribute])


  useEffect(() => {
    if (resViewAttribute_edit.data) {
      set_view_attribute_data_edit(resViewAttribute_edit.data)
    }
  }, [resViewAttribute_edit])
  useEffect(() => {
    if (resdata.data && !resdata.isLoading) {
      resdata.data.message && toast.success(resdata.data.message);
      setmodaldata(resdata.data);
    }
  }, [resdata.data]);
  const {
    data: communicationtemplates,
    loading,
    error,
  } = useFetch({ setDatas }, "getAllViewCommunicationTemplates");
  useEffect(() => {
    if (communicationtemplates) {
      console.log("communicationtemplates");
      console.log(communicationtemplates);
      setDatas(communicationtemplates);
      setlimit(communicationtemplates[0]?.pagination?.limit)
      settotalleads(communicationtemplates[0]?.pagination?.total_record)
      if (!communicationtemplates[0]?.pagination) {
        setpagination(false)
      }
    }
  }, [communicationtemplates]);
  const { data: categroires, loading1, error1, } = useFetch({ setCate }, "getCommunicationViewCategory");
  useEffect(() => {
    if (categroires) {
      setCate(categroires);
      console.log(categroires);
    }
  }, [categroires]);

  useEffect(() => {
    if (ressubcat.data) {
      setSubcat(ressubcat.data);
      console.log(ressubcat)
    }
  }, [ressubcat.data]);
  useEffect(() => {
    if (ressubcat.data) {
      setSubcat2(ressubcat.data);
      console.log(ressubcat)
    }
  }, [ressubcat.data]);
  function getvalues() {
    if (
      title == "" ||
      moduletype == undefined ||
      editorvalue == undefined ||
      language == undefined ||
      status == undefined
      // visibility == undefined
    ) {
      swal({
        icon: "error",
        title: "Oops...",
        text: "Please fill the form correctly!",
      });
    } else {
      let adddata = new FormData();
      adddata.append("temp_name", title.current.value);
      adddata.append("temp_module", moduletype);
      adddata.append("temp_code", editorvalue);
      adddata.append("language", language);
      adddata.append("temp_status", status);
      adddata.append("tags[]", selected);
      //Category
      adddata.append("temp_folder", firstop);
      //SubCategory
      adddata.append("temp_cate", selected_sub_cat);
      adddata.append("temp_saveas", visibility);
      adddata.append("urole", roleval);
      adddata.append("spec_cont", firstsect_cont);
      adddata.append("fl_follw[]", addmap);
      adddata.append("type_create", "templateCreate");
      adddata.append("files", "Demo");

      apiMethodcreate("postCreateCommunicationTemplates", adddata);

      setloadingg(true);

      swal({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }
  useEffect(() => {
    if (rescreate.data) {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getAllViewCommunicationTemplates`)
        .then((response) => {
          setDatas(response.data);
          setloadingg(false);
        })
        .catch((err) => {
          console.log("eerr", err);
        });
    }
  }, [rescreate.data]);

  function geteditvalues() {
    let updatedata = new FormData();
    updatedata.append("temp_name", edittitle.current.value);
    updatedata.append("temp_module", moduletypeedit);
    updatedata.append("temp_code", "<table><tbody><tr><td>{{avatar}}</td><td style=\"padding-left: 9px;\"><table cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td style=\"font-weight: 700; font-size: 16px; color: rgb(231, 26, 105); margin: 0px; padding-bottom: 3px; font-family: Arial, Helvetica, sans-serif;\">{{firstname}} {{lastname}}</td></tr><tr><td><p style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 12px; font-family: Arial, Helvetica, sans-serif;\">{{title}}&nbsp;<span style=\"font-weight: 600; font-size: 16px;\">The Florida Lounge</span></p><p style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 12px; font-family: Arial, Helvetica, sans-serif;\">Tranquilidade para viver, liberdade para sonhar!</p><p style=\"margin-top: 4px; margin-bottom: 4px; border: 2px solid rgb(231, 26, 105); font-size: 0px;\">�</p></td></tr><tr style=\"margin: 0px; padding: 0px;\"><td style=\"margin: 0px; padding: 0px;\"><table cellpadding=\"0\" cellspacing=\"0\" style=\"margin: 0px; padding: 0px;\"><tbody><tr><td style=\"margin: 0px; padding: 0px; font-family: Arial, Helvetica, sans-serif; color: rgb(231, 26, 105); font-size: 12px;\">m.</td><td style=\"margin: 0px; padding: 0px; font-size: 12px; font-family: Arial, Helvetica, sans-serif;\">{{mobile_number}} {{mobile_number_2}}</td></tr></tbody></table></td></tr><tr style=\"margin: 0px; padding: 0px;\"><td style=\"margin: 0px; padding: 0px;\"><table cellpadding=\"0\" cellspacing=\"0\" style=\"margin: 0px; padding: 0px;\"><tbody><tr style=\"margin: 0px; padding: 0px;\"><td style=\"margin: 0px; padding: 0px; font-family: Arial, Helvetica, sans-serif; color: rgb(231, 26, 105); font-size: 12px; width: 0px;\">t.</td><td style=\"font-size: 12px; font-family: Arial, Helvetica, sans-serif; padding-left: 2px;\">{{office_phone}}</td><td style=\"margin: 0px; padding: 0px 0px 0px 2px; font-family: Arial, Helvetica, sans-serif; color: rgb(231, 26, 105); font-size: 12px; width: 0px;\">e.</td><td style=\"font-size: 12px; font-family: Arial, Helvetica, sans-serif; padding-left: 2px;\">{{email}}</td></tr></tbody></table></td></tr><tr style=\"margin: 0px; padding: 0px;\"><td style=\"margin: 0px; padding: 0px;\"><table cellpadding=\"0\" cellspacing=\"0\" style=\"margin: 0px; padding: 0px;\"><tbody><tr><td style=\"font-family: Arial, Helvetica, sans-serif; color: rgb(231, 26, 105); font-size: 12px; width: 0px;\">w.</td><td style=\"font-size: 12px; font-family: Arial, Helvetica, sans-serif; padding-left: 2px;\">{{website}}</td><td style=\"font-family: Arial, Helvetica, sans-serif; color: rgb(231, 26, 105); font-size: 12px; width: 0px; padding-left: 2px;\">s.</td><td style=\"font-size: 12px; font-family: Arial, Helvetica, sans-serif; padding-left: 2px;\">{{street_address}}, {{city}}, {{state}}, {{country}}, {{zip_code}}</td></tr></tbody></table></td></tr><tr><td><p style=\"margin-top: 4px; font-family: Arial, Helvetica, sans-serif; font-size: 12px;\">{{system-facebook}} {{system-instagram}} {{system-twitter}}</p></td></tr></tbody></table></td></tr></tbody></table>");
    updatedata.append("language", selectedLanguage);
    updatedata.append("temp_status", statusedit);
    updatedata.append("tags[]", selected2);
    updatedata.append("temp_folder", firsteditop);;
    updatedata.append("temp_cate", selected_sub_cat2);
    updatedata.append("temp_saveas", visibilityedit);
    updatedata.append("template_id", templateid);
    updatedata.append("urole", roleval2);
    updatedata.append("spec_cont", specsel12);
    updatedata.append("fl_follw[]", editmap);
    updatedata.append("template", "update_template");

    apiMethodcreate("postUpdateCommunicationTemplates", updatedata);
    swal({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      setShow(false);
      setShow2(false);
    }, 1000);
    // }
  }

  // add new modal functions
  const handleChange = (value) => {
    setmoduletype(value);
    let formdata = new FormData()
    formdata.append("template", "view_template_attributes")
    formdata.append("temp", value.replaceAll(" ", "_"))
    apiMethodViewAttribute("postViewAttributesCommunicationTemplates", formdata)
    console.log(value, "SAdasasdfff");
  };
  const Handlestatus = (value) => {
    setstatus(value);
  };
  const Handlevisibility = (value) => {
    setvisibility(value);
    if (value == "Based On") {
      setshowselect2(true);
      setshowselect12(false);
    } else if (value == "Custom") {
      setshowselect2(false);
      setshowselect12(true);
    } else {
      setshowselect2(false);
      setshowselect12(false);
    }
  };
  const Handlevisibility2 = (defaultValue, value) => {
    setvisibilityedit(defaultValue);
    setvisibility2(value)
    if (defaultValue == "Based On") {
      setshowselect(true);
      setshowselect1(false);
    } else if (defaultValue == "Custom") {
      setshowselect(false);
      setshowselect1(true);
    } else {
      setshowselect(false);
      setshowselect1(false);
    }
  }
  useEffect(() => {
    if (visibilityedit === "Based On") {
      setshowselect(true);
      setshowselect1(false);
    } else if (visibilityedit === "Custom") {
      setshowselect(false);
      setshowselect1(true);
    } else {
      setshowselect(false);
      setshowselect1(false);
    }
  }, [Handlevisibility2])
  const handleSubCategoryChange = (value) => {
    console.log('Selected sub-category:', value);
    setSelected_sub_cat(value);
  };
  const handleSubCategoryChange2 = (value) => {
    console.log('Selected sub-category:', value);
    setSelected_sub_cat2(value);
  };
  const handleCategoryChange = (value) => {
    setfirsteditop(value)
    let catdata = new FormData();
    catdata.append("general", "get_sub_cat");
    console.log(value);
    catdata.append("query[]", value);
    apiMethodsubcat("postCommunicationViewSubCategory", catdata);
  };
  const firstchangeadd = (value) => {
    setadddata(secondoption[value]);
    setspecsel1(value)
    setsecondaddData(secondoption[value]);
    setfirstsect_cont(secondoption[value][0]);
    setfirstsect_cont(value);
  };
  const firstchangeadd2 = (value) => {
    setadddata2(secondoption[value]);
    setspecsel12(value)
    setsecondaddData2(secondoption[value]);
    setfirstsect_cont2(secondoption[value][0]);
    setfirstsect_cont2(value);
  };

  const handleChangeedit = (value) => {
    setmoduletypeedit(value);
    let formdata = new FormData()
    formdata.append("template", "view_template_attributes")
    formdata.append("temp", value.replaceAll(" ", "_"))
    apiMethodViewAttribute_edit("postViewAttributesCommunicationTemplates", formdata)

  };
  const Handlestatusedit = (value) => {
    setstatusedit(value);
  };
  function uploadhandleEditor(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();

          loader.file.then((file) => {
            body.append("template", "upload_template_image");
            body.append("template_id", templateid);
            body.append("template_image", file);
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios.post(`${config.apiEndPoint}postCommunicationTemplatesImage`, body)
              .then((response) => {
                console.log(response.data.imagr_src, response.imagr_src)
                resolve({
                  default: `${config.baseurl2}${response.data.imagr_src}`,
                });
              })
              .catch((err) => {
                reject(err);
              })
          });
        });
      },
    };
  }
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();

          loader.file.then((file) => {
            body.append("template", "upload_template_image");
            // body.append("template_id", 8);
            body.append("template_image", file);
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              authentication: `${getTokenSession()}`,
            };
            axios.post(`${config.apiEndPoint}postCommunicationTemplatesImage`, body)
              .then((response) => {
                console.log(response.data.imagr_src, response.imagr_src)
                resolve({
                  default: `${config.baseurl2}${response.data.imagr_src}`,
                });
              })
              .catch((err) => {
                reject(err);
              })
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  function handleEditor(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadhandleEditor(loader);
    };
  }
  const handleDelete = (e, item) => {
    console.log(item)
    e.preventDefault();
    let deldata = new FormData();
    deldata.append("template", "delete_template");
    deldata.append("template_id", item.template_id);
    let bodyContent = deldata;
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      showCancelButton: false,
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeleteCommunicationTemplates`, bodyContent);
        setDatas(datas.filter((ite) => ite.template_id !== item.template_id));
      }
    });
  };
  useEffect(() => {
    if (res.data && !res.isLoading) {
      toast.success(res.data.message);
    }
  }, [res.data]);
  if (loading) return <Loader />;
  return (
    <>
      <div className="tempatediv">
        <div className="Main-div">
          <div className="div-left">
            <span>
              {Translation(translations, "Communication Templates")}
            </span>
          </div>
          <div className="div-right">
            {(leadPermission?.super_admin || leadPermission?.comm_temp_module?.create === "1") ? (
              <button
                onClick={() => {
                  setShow(true);
                  setmoduletype(null);
                  setSelected_sub_cat("");
                  setSubcat([]);
                }}
                className="btn btn-sm btn-primary bsm-1 cr_temp"
              >
                <i className="fa-solid fa-square-plus"></i>&nbsp;
                {Translation(translations, "Add New")}

              </button>
            ) : null}
          </div>
        </div>
        <div className="tablediv">
          <table className="table card-table table-hover table-striped table-vcenter mb-0 text-nowrap">
            <thead className="t1">
              <tr>
                <th>{Translation(translations, "TEMPLATE NAME")}</th>
                <th>{Translation(translations, "TEMPLATE MODULE")} </th>
                <th>{Translation(translations, "CATEGORY")} </th>
                <th>{Translation(translations, "SUB CATEGORY")} </th>
                <th className="alert-secondary text-right">{Translation(translations, "Action")} </th>
              </tr>
            </thead>
            <tbody>
              {datas?.message ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                datas?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.template_name}</td>
                      <td>{item.template_module}</td>
                      <td>{item.cat_name}</td>
                      <td>{item.sub_cat_name}</td>

                      <td className="text-right">
                        <Link
                          onClick={() => {
                            setShow1(true);
                            settemplatename(item.template_name);
                            let formatdataapi = new FormData();
                            formatdataapi.append(
                              "template_id",
                              item.template_id
                            );
                            formatdataapi.append("template", "view_template");

                            apiMethoddata(
                              "postViewCommunicationTemplates",
                              formatdataapi
                            );
                          }}
                          className="btn-sm btn-dl mx-1 eyebtn"
                        >
                          <i className="fa fa-eye fa-lg communicationiconseye "></i>
                        </Link>
                        {leadPermission?.super_admin || leadPermission?.comm_temp_module?.edit === "1" ? (
                          <Link
                            onClick={() => {
                              setShow2(true);
                              settemplatename(item?.template_name);
                              settemplateid(item?.template_id);
                              handleChangeedit(item?.template_module);
                              setfirsteditop(item?.template_folder);
                              setsecondeditop(item?.template_category);
                              setSelected_sub_cat2(item?.sub_cat_name);
                              setSecondCityedit(item?.template_category);
                              setSelected_sub_cat2(item?.template_category);
                              if (item?.template_tags) {
                                setselectededit(item?.template_tags?.split(","));
                              }
                              setlanguageedit(item?.template_language);
                              setSelectedLanguage(item?.template_language);
                              setstatusedit(item?.enbale_disable);
                              setvisibilityedit(item?.template_visibility);


                              let catdata = new FormData();
                              catdata.append("general", "get_sub_cat");
                              catdata.append("query[]", item.template_folder);
                              apiMethodsubcat("postCommunicationViewSubCategory", catdata);

                              let formatdataapi = new FormData();
                              formatdataapi.append(
                                "template_id",
                                item.template_id
                              );
                              formatdataapi.append("template", "view_template");

                              apiMethoddata(
                                "postViewCommunicationTemplates",
                                formatdataapi
                              );
                              if (firsteditop === '' || firsteditop == 'undefined') {
                                setSelected_sub_cat2('')
                                setSubcat2([])
                              }
                            }}
                            className="btn-sm btn-ed mx-1 editbtn"
                          >
                            <i className="fa fa-pencil fa-lg communicationicons"></i>
                          </Link>
                        ) : null}
                        {leadPermission?.super_admin || leadPermission?.comm_temp_module?.delete === "1" ? (
                          <Link
                            onClick={(e) => handleDelete(e, item)}
                            className=" btn-sm btn-dl mx-1 trashbtn"
                          >
                            <i className="fa fa-trash fa-lg communicationicons"></i>
                          </Link>
                        ) : null}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {pagination && <Pagination
            current={currentPage}
            defaultCurrent={1}
            pageSize={Number(limit)}
            defaultPageSize={5}
            total={totalleads}
            onChange={submit1}
          />}
        </div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          // dialogClassName="modal-100w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {Translation(translations, "Add New")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={12} md={6} lg={3}>
                  <label className="modal-labels">
                    {Translation(translations, "Title")}
                  </label>
                  <input
                    className="titleinput"
                    type="text"
                    ref={title}
                    placeholder={Translation(translations, 'Name')}
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label className="modal-labels">
                    {Translation(translations, "Module Type")}
                  </label>

                  <Select
                    placeholder={Translation(translations, 'Select')}
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        "value": "Lead",
                        "label": Translation(translations, 'Lead')
                      },
                      {
                        "value": "Prospect",
                        "label": Translation(translations, 'Prospect')
                      },
                      {
                        "value": "Signature",
                        "label": Translation(translations, 'Signature')
                      },
                      {
                        "value": "Opportunity",
                        "label": Translation(translations, 'Opportunity')
                      },
                      {
                        "value": "Actions",
                        "label": Translation(translations, 'Actions')
                      },
                      {
                        "value": "Follow Up",
                        "label": Translation(translations, 'Follow Up')
                      },
                      {
                        "value": "Client",
                        "label": Translation(translations, 'Client')
                      },
                      {
                        "value": "Project",
                        "label": Translation(translations, 'Project')
                      },
                      {
                        "value": "Meeting",
                        "label": Translation(translations, 'Meeting')
                      },
                    ]}
                  />
                </Col>
                <Col xs={6} md={6} lg={3}>
                  <label className="modal-labels">
                    {Translation(translations, "Category")}
                  </label>{" "}
                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={handleCategoryChange}
                    options={categroires ? categroires.map((province) => ({
                      label: province.cat_name,
                      value: province.cat_id,
                    })) : []}
                  />
                </Col>
                <Col xs={6} md={6} lg={3}>
                  <label className="modal-labels">
                    {Translation(translations, "Sub-Category")}
                  </label>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={handleSubCategoryChange}
                    value={selected_sub_cat}
                    options={Subcat ? Subcat.map((key) => ({
                      label: key.cat_name,
                      value: key.cat_id,
                    })) : []}
                  />
                </Col>
              </Row>

              <Row>
                <label className="modal-labels">
                  {Translation(translations, "Teamplate Code")}
                </label>
                <Col xs={12} md={12} lg={12}>
                  <div className="App">
                    <CKEditor
                      config={{
                        extraPlugins: [uploadPlugin],
                      }}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();

                        seteditorvalue(data, event, editor);
                      }}
                    />
                  </div>
                </Col>
                <p className="view-attribute" onClick={showDrawer}>
                  {Translation(translations, "View Attriutes")}

                </p>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col xs={12} md={6} lg={3}>
                  <label>

                    {Translation(translations, "Language")}
                  </label>
                  <br />
                  <DropdownLanguage
                    list={transData}
                    selectedVal={setLanguage}
                    defaultval={"31"}

                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label>
                    {Translation(translations, "Status")}
                  </label>
                  <Select
                    // value={statusedit2}
                    placeholder={Translation(translations, 'Select')}
                    style={{
                      width: "100%",
                    }}
                    onChange={Handlestatus}
                    options={[
                      {
                        "value": "1",
                        "label": Translation(translations, 'Enable')
                      },
                      {
                        "value": "0",
                        "label": Translation(translations, 'Disable')
                      }
                    ]}
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label>
                    {Translation(translations, "Visibility")}
                  </label>
                  <br />
                  <Select
                    value={visibility}
                    placeholder={Translation(translations, 'Select')}
                    style={{
                      width: "100%",
                    }}
                    onChange={Handlevisibility}
                    options={[
                      {
                        "value": Translation(translations, 'Public'),
                        "label": Translation(translations, 'Public')

                      },
                      {

                        "value": Translation(translations, 'Private'),
                        "label": Translation(translations, 'Private')
                      },
                      {
                        "value": "Based On",
                        "value": Translation(translations, 'Based On'),
                        "label": Translation(translations, 'Based On')
                      },
                      {
                        "value": Translation(translations, 'Custom'),
                        "label": Translation(translations, 'Custom')
                      }
                    ]
                    }
                  />

                </Col>
                <Col id="newselect" xs={12} md={6} lg={3}>
                  {showselect2 && (
                    <div>
                      <Space wrap>
                        <Select
                          defaultValue={option[0]}
                          style={{
                            width: "100%",
                          }}
                          onChange={firstchangeadd}
                          options={option ? option.map((province) => ({
                            label: province,
                            value: province,
                          })) : []}
                        />
                      </Space>
                      <Dropdown className="w-100 useredits myclass">
                        <Dropdown.Toggle className="roleCustom my-1 w-100" type="button">
                          {Translation(translations, roleval)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <ul className="list-group">
                            <LoopSelect handleN={(e, item) => handlenode(e, item)} node={registerdata["CEO"]} />
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                  {showselect12 && (
                    <div className="spsf_user d-block">
                      <label htmlFor="contact_owner">
                        {Translation(translations, "Contact Owner")}
                        :</label>
                      <div ref={ownerRef} className="searchDropDown my-2">
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
                      {listOpen && (
                        <div className="c2_own">
                          {resowner.data &&
                            (resowner.isLoading ? (
                              ""
                            ) : !resowner.data.message ? (
                              <div className="resusers">
                                <h6>
                                  {Translation(translations, "You can select multiple users.")}
                                </h6>
                                {resowner?.data.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <label className="custom-control custom-checkbox">
                                        <input
                                          key={index}
                                          onChange={() => handleClick(item)}
                                          type="checkbox"
                                          className="custom-control-input sr-check ssch"
                                          value={item.id}
                                        />{" "}
                                        <span className="custom-control-label">
                                          {" "}
                                          {Translation(
                                            translations,
                                            `${item.uname}`
                                          )}
                                        </span>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="resusers">
                                {resowner.data.message}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <label >
                  {Translation(translations, "Tags")}
                </label>
                <Select
                  mode="tags"
                  style={{
                    width: '100%',
                  }}
                  onSearch={
                    (v) => {
                      onSearchFollowerAdd(v);
                    }
                  }
                  placeholder={Translation(translations, 'Tags')}
                  onChange={(v1, v2) => {
                    console.log(v1)

                    setSelected(v1)
                  }}
                  options={tagoption && tagoption}
                />
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={getvalues} variant="primary">
              {" "}
              <FaSave style={{ fontSize: 16 }} />
              {Translation(translations, "Save & Create Template")}

            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show1}
          onHide={() => setShow1(false)}
          size="md"
          // dialogClassName="modal-100w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <h6 className="title" id="newLabel">{templatename}</h6>

          </Modal.Header>
          <Modal.Body>
            <label className="form-label">
              {Translation(translations, "Template")}
            </label>
            {modaldata && StringConvert(modaldata.view, "dfjhdfj")}
          </Modal.Body>
        </Modal>
        <Modal
          show={show2}
          onHide={() => setShow2(false)}
          size="lg"
          // dialogClassName="modal-100w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {"Edit-" + templatename}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={12} md={6} lg={3}>
                  <label className="modal-labels">
                    {Translation(translations, "Title")}
                  </label>
                  <input
                    style={{
                      width: "100%",
                    }}
                    ref={edittitle}
                    className="titleinput"
                    type="text"
                    defaultValue={Translation(translations, templatename)}
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label className="modal-labels">
                    {Translation(translations, 'Module Type')}
                  </label>
                  <Select
                    defaultValue={moduletypeedit}
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChangeedit}
                    options={[
                      {
                        "value": Translation(translations, 'Lead'),
                        "label": Translation(translations, 'Lead')
                      },
                      {
                        "value": Translation(translations, 'Prospect'),
                        "label": Translation(translations, 'Prospect')
                      },
                      {
                        "value": Translation(translations, 'Signature'),
                        "label": Translation(translations, 'Signature')
                      },
                      {
                        "value": Translation(translations, 'Opportunity'),
                        "label": Translation(translations, 'Opportunity')
                      },
                      {
                        "value": Translation(translations, 'Actions'),
                        "label": Translation(translations, 'Actions')
                      },
                      {
                        "value": Translation(translations, 'Follow Up'),
                        "label": Translation(translations, 'Follow Up')
                      },
                      {
                        "value": Translation(translations, 'Client'),
                        "label": Translation(translations, 'Client')
                      },
                      {
                        "value": "Project",
                        "label": Translation(translations, 'Projects')
                      },
                      {
                        "value": "Meeting",
                        "label": Translation(translations, 'Meetings')
                      },
                    ]}
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label className="modal-labels">

                    {Translation(translations, 'Category')}
                  </label>{" "}
                  <Select
                    defaultValue={firsteditop == 'undefined' ? '' : firsteditop}
                    style={{
                      width: "100%",
                    }}
                    onChange={handleCategoryChange}
                    options={categroires ? categroires.map((province) => ({
                      label: province.cat_name,
                      value: province.cat_id,
                    })) : []}
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label className="modal-labels">

                    {Translation(translations, 'Sub-Category')}
                  </label>{" "}
                  <Select
                    style={{
                      width: "100%",
                    }}
                    onChange={handleSubCategoryChange2}
                    value={selected_sub_cat2 == 'undefined' ? '' : selected_sub_cat2}
                    options={Subcat ? Subcat.map((key) => ({
                      label: key.cat_name,
                      value: key.cat_id,
                    })) : []}
                  />
                </Col>
              </Row>

              <Row>
                <label className="modal-labels">
                  {Translation(translations, 'Teamplate Code')}
                </label>
                <Col xs={12} md={12} lg={12}>
                  <div className="App">
                    <CKEditor
                      config={{
                        extraPlugins: [handleEditor],
                      }}
                      editor={ClassicEditor}
                      data={(modaldata.view && modaldata.view) || "nodata"}
                      onChange={(event, editor) => {
                        const data = editor.getData();

                        seteditorvalueedit(data, event, editor);
                      }}
                    />
                  </div>
                </Col>
                <p className="view-attribute" onClick={showDrawer1}>
                  {Translation(translations, 'View Attriutes')}

                </p>
              </Row>
              <Row style={{ marginTop: 20 }}>


                <Col xs={12} md={6} lg={3}>
                  <label>

                    {Translation(translations, "Language")}
                  </label>
                  <br />
                  <DropdownLanguage
                    list={transData}
                    defaultval={languageedit == 'null' ? '' : languageedit}
                    selectedVal={setSelectedLanguage}

                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label>

                    {Translation(translations, 'Status')}
                  </label>
                  <br />
                  <Select
                    defaultValue={statusedit === 'undefined' ? '' : statusedit}
                    style={{
                      width: "100%",
                    }}
                    onChange={Handlestatusedit}
                    options={[
                      {
                        "value": "1",
                        "label": Translation(translations, 'Enable')
                      },
                      {
                        "value": "0",
                        "label": Translation(translations, 'Disable')
                      }
                    ]}
                  />
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <label>
                    {Translation(translations, "Visibility")}
                  </label>
                  <br />
                  <Select
                    value={visibility2}
                    defaultValue={visibilityedit == 'undefined' ? '' : visibilityedit}
                    placeholder={Translation(translations, 'Select')}
                    style={{
                      width: "100%",
                    }}
                    onChange={Handlevisibility2}
                    options={[
                      {
                        "value": Translation(translations, 'Public'),
                        "label": Translation(translations, 'Public')

                      },
                      {

                        "value": Translation(translations, 'Private'),
                        "label": Translation(translations, 'Private')
                      },
                      {
                        "value": "Based On",
                        "value": Translation(translations, 'Based On'),
                        "label": Translation(translations, 'Based On')
                      },
                      {
                        "value": Translation(translations, 'Custom'),
                        "label": Translation(translations, 'Custom')
                      }
                    ]
                    }
                  />

                </Col>
                <Col id="newselect" xs={12} md={6} lg={3}>
                  {showselect && (
                    <div>
                      <Space wrap>
                        <Select
                          defaultValue={option[1]}
                          style={{
                            width: "100%",
                          }}
                          onChange={firstchangeadd2}
                          options={option ? option.map((province) => ({
                            label: province,
                            value: province,
                          })) : []}
                        />
                      </Space>
                      <Dropdown className="w-100 myclass">
                        <Dropdown.Toggle className="roleCustom my-1 w-100" type="button">
                          {Translation(translations, roleval2)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <ul className="list-group">
                            <LoopSelect handleN={(e, item) => handlenode2(e, item)} node={registerdata["CEO"]} />
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>


                    </div>
                  )}
                  {showselect1 && (
                    <div className="spsf_user d-block">
                      <label htmlFor="contact_owner">
                        {Translation(translations, "Contact Owner")}
                        :</label>
                      <div ref={ownerRef} className="searchDropDown my-2">
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
                      {listOpen && (
                        <div className="c2_own">
                          {resowner.data &&
                            (resowner.isLoading ? (
                              ""
                            ) : !resowner.data.message ? (
                              <div className="resusers">
                                <h6>
                                  {Translation(translations, "You can select multiple users.")}
                                </h6>
                                {resowner?.data.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <label className="custom-control custom-checkbox">
                                        <input
                                          key={index}
                                          onChange={() => handleClick(item)}
                                          type="checkbox"
                                          className="custom-control-input sr-check ssch"
                                          value={item.id}
                                        />{" "}
                                        <span className="custom-control-label">
                                          {" "}
                                          {Translation(
                                            translations,
                                            `${item.uname}`
                                          )}
                                        </span>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="resusers">
                                {resowner.data.message}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <label >{Translation(translations, 'Tags')} </label>
                <Select
                  defaultValue={selectededit}
                  mode="tags"
                  style={{
                    width: '100%',
                  }}
                  onSearch={
                    (v) => {
                      onSearchFollowerAdd(v);
                    }
                  }
                  placeholder={Translation(translations, 'Tags')}
                  onChange={(v1, v2) => {
                    console.log(v1)

                    setSelected2(v1)
                  }}
                  options={tagoption && tagoption}
                />
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={geteditvalues} variant="primary">
              <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Save & Update Template')}
            </Button>
          </Modal.Footer>
        </Modal>
        <>
          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            open={open}
            className="modal123"
          >
            {Array.isArray(view_attribute_data) && (
              <div>
                <div className="headerdiv">
                  {" "}
                  <h4 className="card-title">
                    {Translation(translations, 'Attributes list for Signature Module')}

                  </h4>
                  <i className="fa fa-close" onClick={onClose}></i>{" "}
                </div>

                <Accordion>
                  {view_attribute_data.map((data, index) => {
                    return <Accordion.Item eventKey={index} key={index} >
                      <Accordion.Header className="main-head">
                        {" "}
                        {Translation(translations, `${data.section_name}`)}
                        {" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <table className="table card-table">
                          <tbody>
                            {data.attributes.map((item, index2) => {

                              return <tr key={index2}>
                                <td>
                                  {Translation(translations, `${item.name}`)}
                                </td>
                                <td>{Translation(translations, `${item.value}`)}</td>
                              </tr>
                            })}


                          </tbody>
                        </table>
                      </Accordion.Body>
                    </Accordion.Item>

                  })
                  }
                </Accordion>
              </div>
            )}

          </Drawer>
        </>
        <Drawer
          title="Basic Drawer"
          placement="right"
          onClose={onClose1}
          open={open1}
        >
          {Array.isArray(view_attribute_data_edit) && (
            <div>
              <div className="headerdiv">
                {" "}
                <h4 className="card-title">
                  {Translation(translations, 'Attributes list for Signature Module')}

                </h4>
                <i className="fa fa-close" onClick={onClose1}></i>{" "}
              </div>

              <Accordion>
                {view_attribute_data_edit.map((data, index) => {
                  return <Accordion.Item eventKey={index} key={index} >
                    <Accordion.Header className="main-head">
                      {" "}
                      {Translation(translations, `${data.section_name}`)}
                      {" "}
                    </Accordion.Header>
                    <Accordion.Body>
                      <table className="table card-table">
                        <tbody>
                          {data.attributes.map((item, index2) => {

                            return <tr key={index2}>
                              <td>
                                {Translation(translations, `${item.name}`)}
                              </td>
                              <td>{Translation(translations, `${item.value}`)}</td>
                            </tr>
                          })}


                        </tbody>
                      </table>
                    </Accordion.Body>
                  </Accordion.Item>

                })
                }
              </Accordion>
            </div>
          )}

        </Drawer>
      </div>
    </>
  );

}

export default CommunicationTemplates;