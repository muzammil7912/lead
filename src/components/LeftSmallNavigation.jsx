import React, { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { toggleSidebar } from "./SidebarToggle";
import { BiLogOut } from "react-icons/bi";
import { Drawer } from "antd";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import usePost from "../customHooks/usePost";
import { toast } from "react-toastify";
import { Form, Formik, Field } from "formik";
import { useEffect } from "react";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { MaintSettingsByUserContext } from "../context/MaintSettingsByUserContext";
import { MainStatisticsContextProvider } from "../context/MainStatisticsContext";
import { removeTokenSession } from "../utils/common";
import config from "../services/config.json";
import SwitchButton2 from "./form/SwitchButton2";
import { handleToggle } from "./AllCustomFuntion";
import { MainCalendarListContext } from "../context/MainCalendarListContext";
import useFetch from "../customHooks/useFetch";
import dayjs from "dayjs";
import { StringConvert } from "../components/StringConvert";


const CustomStyles = ({ settingsData }) => {
  const customColorStyles = `
    #main_content #left-sidebar{background-color:${settingsData.sidebg};}
    #left-sidebar .ant-menu,#left-sidebar .ant-menu-submenu-inline,#left-sidebar .ant-menu-item {
      background-color:${settingsData.sidebg};
    } 
    #left-sidebar,
.has-arrow,
.g_heading,
.ant-menu-submenu-title,
.ant-menu-light {
  color:${settingsData.sidetext};
}
#left-sidebar .ant-menu-submenu-title path {
  stroke: ${settingsData.sidetext};

}
.ant-menu-item-selected,
.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title{
    color: ${settingsData.sideactive} !important;
}
.metismenu.grid .ant-menu-sub.ant-menu-inline,
.metismenu.grid .ant-menu-submenu .ant-menu-sub.ant-menu-inline li {
  background-color:${settingsData.sidegridbg} !important;
}

.metismenu.grid  .ant-menu-submenu-title,
.metismenu.grid .ant-menu-light {
  color:${settingsData.sidegridlist} !important;
}
.metismenu.grid .ant-menu-item-selected,
.metismenu.grid .ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title{
    color: ${settingsData.sidegridlistactive} !important;
}
.metismenu.grid .ant-menu-sub .ant-menu-sub {
  color:${settingsData.thirdsidegridlist};
  background-color:${settingsData.thirdsidegridbg} !important;
}
.metismenu.grid .ant-menu-sub .ant-menu-sub .ant-menu-item-selected {
  color :${settingsData.thirdsidegridlistactive} !important;
}
 
#header_top {
  background-color: ${settingsData.minsidebarbg} !important;
}
.settingbar,
.menu_toggle,
.hleft i {
  color: ${settingsData.minsidebaractive} !important;
}
#page_top {
  background-color: ${settingsData.headerbd}; 
}
#page_top .page-title {
  color: ${settingsData.headeractive}; 
}

#page_top .menu_toggle svg,
.custoncol i,.custoncol svg {
  color: ${settingsData.headericon}; 
}
#page_top .left  a.btn,
#page_top .left  button.btn {
  background-color: ${settingsData.headerbuttonbg} !important; 
  background: ${settingsData.headerbuttonbg} !important; 
  color: ${settingsData.headerbuttontext}; 
}
  `;

  return <style dangerouslySetInnerHTML={{ __html: customColorStyles }} />;
};

function LeftSmallNavigation() {
  const { calendarlist } = useContext(MainCalendarListContext);
  const { statisticsData, updateStatisticsData } = useContext(MainStatisticsContextProvider);
  let lastObjectId;
  if (Array.isArray(calendarlist)) {
    lastObjectId = calendarlist[calendarlist.length - 1].cl_db_did;
  }
  const { systemSetting } = useContext(MaintSettingsByUserContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const [changeColor, setChangeColor] = useState({
    sidebg: "#000",
    sidetext: "#fff",
    sideactive: "blue",
    sidegridbg: "#fff",
    sidegridlist: "#000",
    sidegridlistactive: "#fff",
    thirdsidegridbg: "#fff",
    thirdsidegridlist: "#000",
    thirdsidegridlistactive: "#fff",
    minsidebarbg: "#000",
    minsidebaractive: "#000",
    headerbd: "#000",
    headeractive: "#000",
    headericon: "#000",
    headerbuttonbg: "#000",
    headerbuttontext: "#000",
  });
  const [customDropDown, setCustomDropDown] = useState("no");
  const [rtl, setRtl] = useState("");
  const [boxlayout, setBoxlayout] = useState("");
  const [iconcolor, setIconcolor] = useState("");
  const [gradient, setGradient] = useState("");
  const [boxshadow, setBoxshadow] = useState("");
  const [darkmode, setDarkmode] = useState("");
  const [fixnavbar, setFixnavbar] = useState("");
  const [min_sidebar, setMin_sidebar] = useState("");
  const [pageheader, setPageheader] = useState("");
  const [sidebar, setSidebar] = useState("");
  const navigate = useNavigate();
  const [deep, show] = useState(false);
  const [sidebg, setsidebg] = useState("");
  const [sideactive, setsideactive] = useState("");
  const [sidetext, setsidetext] = useState("");
  const [sidegridbg, setsidegridbg] = useState("");
  const [sidegridlist, setsidegridlist] = useState("");
  const [sidegridlistactive, setsidegridlistactive] = useState("");
  const [thirdsidegridbg, setthirdsidegridbg] = useState("");
  const [thirdsidegridlist, setthirdsidegridlist] = useState("");
  const [thirdsidegridlistactive, setthirdsidegridlistactive] = useState("");
  const [minsidebarbg, setminsidebarbg] = useState("");
  const [minsidebaractive, setminsidebaractive] = useState("");
  const [headerbd, setheaderbd] = useState("");
  const [headeractive, setheaderactive] = useState("");
  const [headericon, setheadericon] = useState("");
  const [headerbuttonbg, setheaderbuttonbg] = useState("");
  const [headerbuttontext, setheaderbuttontext] = useState("");
  const [res, apiMethod] = usePost();
  const [Apisetting, setApisetting] = useState("");
  const { data: leadTotalCountData, loading } = useFetch("", "leadTotalCountData");
  const { data: timelineHistoryUser, loading1 } = useFetch("", "timelineHistoryUser");
  const { data: actionAccordingToWeek, loading2 } = useFetch("", "actionAccordingToWeek");
  const [StatisticsCounts, setStatisticsCounts] = useState({
    leads: 0,
    Prospects: 0,
    Opportunities: 0,
    Clientes: 0,
    newProspect: 0,
    newOpportunity: 0,
    weeklyEvents: 0
  });
  const [UpdatedChecking, setUpdatedChecking] = useState(false);

  let sidebgvalue = useRef(null);
  let sidetextvalue = useRef(null);
  let sideactivevalue = useRef(null);
  let sidegridbgvalue = useRef("");
  let sidegridlistvalue = useRef("");
  let sidegridlistactivevalue = useRef("");
  let thirdsidegridbgvalue = useRef("");
  let thirdsidegridlistvalue = useRef("");
  let thirdsidegridlistactivevalue = useRef("");
  let minsidebarbgvalue = useRef("");
  let minsidebaractivevalue = useRef("");
  let headerbdvalue = useRef("");
  let headeractivevalue = useRef("");
  let headericonvalue = useRef("");
  let headerbuttonbgvalue = useRef("");
  let headerbuttontextvalue = useRef("");


  useEffect(() => {
    if (systemSetting) {
      setApisetting(systemSetting.user_settings);
      let body = document.body;
      let header = document.querySelector(".page #page_top");
      let minSidebar = document.querySelector(".small_Bar");
      let leftSidebar = document.querySelector("#left-sidebar");
      let resData = systemSetting?.user_settings;
      setRtl(resData?.rtl ? resData?.rtl : "off");
      setBoxlayout(resData?.boxlayout ? resData?.boxlayout : "off");
      setIconcolor(resData?.iconcolor ? resData?.iconcolor : "off");
      setGradient(resData?.gradient ? resData?.gradient : "off");
      setBoxshadow(resData?.boxshadow ? resData?.boxshadow : "off");
      setDarkmode(resData?.darkmode ? resData?.darkmode : "off");
      setFixnavbar(resData?.fixnavbar ? resData?.fixnavbar : "off");
      setMin_sidebar(resData?.min_sidebar ? resData?.min_sidebar : "off");
      setPageheader(resData?.pageheader ? resData?.pageheader : "off");
      setSidebar(resData?.sidebar ? resData?.sidebar : "off");
      if (resData?.rtl === "on") {
        body.classList.add("rtl");
      }
      if (resData?.boxlayout === "on") {
        body.classList.add("boxlayout");
      }
      if (resData?.iconcolor === "on") {
        body.classList.add("iconcolor");
      }
      if (resData?.gradient === "on") {
        body.classList.add("gradient");
      }
      if (resData?.boxshadow === "on") {
        body.classList.add("boxshadow");
      }
      if (resData?.darkmode === "on") {
        body.classList.add("dark-mode");
      }
      if (resData?.fixnavbar === "on") {
        header.classList.add("sticky-top");
      }
      if (resData?.min_sidebar === "on") {
        if (minSidebar) {
          minSidebar.classList.add("dark");
        }
      }
      if (resData?.header === "on") {
        header.classList.add("top_dark");
      }
      if (resData?.sidebar === "on") {
        body.classList.add("sidebar_dark");
      }
      if (resData?.font) {
      } else {
        body.classList.add("font-montserrat");
      }
      if (resData?.marrow) {
        leftSidebar?.classList?.add(`Marrow${resData?.marrow}`);
      } else {
        leftSidebar?.classList?.add(`MarrowC`);
      }
      if (resData?.listicon) {
        leftSidebar?.classList?.add(`listicon${resData?.listicon}`);
      } else {
        leftSidebar?.classList?.add(`listiconlist-a`);
      }
      if (resData?.subfromsublisticon) {
        leftSidebar?.classList?.add(`listicon${resData?.subfromsublisticon}`);
      } else {
        leftSidebar?.classList?.add(`subfromsublisticon-a`);
      }

      setCustomDropDown(resData?.custom_color);
      setChangeColor({
        ...changeColor,
        sidetext: resData?.sidetext ? resData?.sidetext : "#000000",
        sidebg: resData?.sidebg ? resData?.sidebg : "#000000",
        sideactive: resData?.sideactive ? resData?.sideactive : "blue",
        sidegridbg: resData?.sidegridbg ? resData?.sidegridbg : "#000000",
        sidegridlist: resData?.sidegridbg ? resData?.sidegridbg : "#000000",
        sidegridlistactive: resData?.sidegridbg
          ? resData?.sidegridbg
          : "#000000",
        thirdsidegridbg: resData?.sidegridbg
          ? resData?.sidegridbg
          : "#000000",
        thirdsidegridlist: resData?.sidegridbg
          ? resData?.sidegridbg
          : "#000000",
        thirdsidegridlistactive: resData?.sidegridbg
          ? resData?.sidegridbg
          : "#000000",
        minsidebarbg: resData?.minsidebarbg
          ? resData?.minsidebarbg
          : "#000000",
        minsidebaractive: resData?.minsidebaractive
          ? resData?.minsidebaractive
          : "#000000",
        headerbd: resData?.headerbd ? resData?.headerbd : "#000000",
        headeractive: resData?.headeractive
          ? resData?.headeractive
          : "#000000",
        headericon: resData?.headericon ? resData?.headericon : "#000000",
        headerbuttonbg: resData?.headerbuttonbg
          ? resData?.headerbuttonbg
          : "#000000",
        headerbuttontext: resData?.headerbuttontext
          ? resData?.headerbuttontext
          : "#000000",
      });
      if (resData?.custom_color === "yes") {
        show(true);
      } else {
        setCustomDropDown("no");
      }
    }
  }, [systemSetting]);


  const handleRTL = (item) => {
    let body = document.body;
    if (item === "on") {
      body.classList.add("rtl");
    } else {
      body.classList.remove("rtl");
    }
    setRtl(item);
  };
  const handleIconcolor = (item) => {
    let body = document.body;
    if (item === "on") {
      body.classList.add("iconcolor");
    } else {
      body.classList.remove("iconcolor");
    }
    setIconcolor(item);
  };
  const handleBoxlayout = (item) => {
    let body = document.body;
    if (item === "on") {
      body.classList.add("boxlayout");
    } else {
      body.classList.remove("boxlayout");
    }
    setBoxlayout(item);
  };
  const handleBoxshadow = (item) => {
    let body = document.body;
    if (item === "on") {
      body.classList.add("boxshadow");
    } else {
      body.classList.remove("boxshadow");
    }
    setBoxshadow(item);
  };
  const handleGradient = (item) => {
    let body = document.body;
    if (item === "on") {
      body.classList.add("gradient");
    } else {
      body.classList.remove("gradient");
    }
    setGradient(item);
  };
  const handleDarkmode = (item) => {
    let body = document.body;
    if (item === "on") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
    setDarkmode(item);
  };
  const handleFixnavbar = (item) => {
    let header = document.querySelector(".page #page_top");
    if (item === "on") {
      header.classList.add("sticky-top");
    } else {
      header.classList.remove("sticky-top");
    }
    setFixnavbar(item);
  };
  const handleMinSidebar = (item) => {
    let minSidebar = document.querySelector(".small_Bar");
    if (item === "on") {
      minSidebar.classList.add("dark");
    } else {
      minSidebar.classList.remove("dark");
    }
    setMin_sidebar(item);
  };
  const handlePageheader = (item) => {
    let header = document.querySelector(".page #page_top");
    if (item === "on") {
      header.classList.add("top_dark");
    } else {
      header.classList.remove("top_dark");
    }
    setPageheader(item);
  };
  const handleSidebar = (item) => {
    let body = document.body;
    if (item === "on") {
      body.classList.add("sidebar_dark");
    } else {
      body.classList.remove("sidebar_dark");
    }
    setSidebar(item);
  };

  function Fontstyle(e) {
    let body = document.body;
    let array = ["font-opensans", "font-montserrat", "font-roboto"];
    array.map((item) => {
      body.classList.remove(item);
    });
    body.classList.add(e.target.value);
  }
  const hanldeMarrow = (e) => {
    let leftSidebar = document.querySelector("#left-sidebar");
    let array = ["A", "B", "C"];
    array.map((item) => {
      leftSidebar.classList.remove(`Marrow${item}`);
    });
    leftSidebar.classList.add(`Marrow${e.target.value}`);
  };
  const hanldeList = (e) => {
    let leftSidebar = document.querySelector("#left-sidebar");
    let array = ["list-a", "list-b", "list-c"];
    array.map((item) => {
      leftSidebar.classList.remove(`listicon${item}`);
    });
    leftSidebar.classList.add(`listicon${e.target.value}`);
  };
  const hanldeSubList = (e) => {
    let leftSidebar = document.querySelector("#left-sidebar");
    let array = ["list-a", "list-b", "list-c"];
    array.map((item) => {
      leftSidebar.classList.remove(`subfromsublisticon${item}`);
    });
    leftSidebar.classList.add(`subfromsublisticon${e.target.value}`);
  };

  const checkbox1 = (e) => {
    if (customDropDown == "yes") {
      setCustomDropDown("no");
      show(false);
    } else {
      setCustomDropDown("yes");
      show(true);
    }
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = useState(false);
  const showDrawer1 = () => {
    setOpen1(!open1);
  };
  const onClose1 = () => {
    setOpen1(false);
  };

  const signOut = () => {
    removeTokenSession();
    navigate(`/${config.ddemoss}login`);
  };

  function handleSubmit(values) {
    let formdata = new FormData();

    for (let item in values) {
      if (values[item] == "" || values[item] == undefined) {
      } else {
        formdata.append(item, values[item]);
      }
    }
    if (rtl === "on") {
      formdata.append("rtl", rtl);
    }
    formdata.append("custom_color", customDropDown);
    formdata.append("boxlayout", boxlayout);
    formdata.append("iconcolor", iconcolor);
    formdata.append("gradient", gradient);
    formdata.append("boxshadow", boxshadow);
    formdata.append("darkmode", darkmode);
    if (customDropDown === "yes") {
      formdata.append("sidebg", sidebgvalue.current.value);
      formdata.append("sidetext", sidetextvalue.current.value);
      formdata.append("sideactive", sideactivevalue.current.value);
      formdata.append("sidegridbg", sidegridbgvalue.current.value);
      formdata.append("sidegridlist", sidegridlistvalue.current.value);
      formdata.append(
        "sidegridlistactive",
        sidegridlistactivevalue.current.value
      );
      formdata.append("thirdsidegridbg", thirdsidegridbgvalue.current.value);
      formdata.append(
        "thirdsidegridlist",
        thirdsidegridlistvalue.current.value
      );
      formdata.append(
        "thirdsidegridlistactive",
        thirdsidegridlistactivevalue.current.value
      );
      formdata.append("minsidebarbg", minsidebarbgvalue.current.value);
      formdata.append("minsidebaractive", minsidebaractivevalue.current.value);
      formdata.append("headerbd", headerbdvalue.current.value);
      formdata.append("headeractive", headeractivevalue.current.value);
      formdata.append("headericon", headericonvalue.current.value);
      formdata.append("headerbuttonbg", headerbuttonbgvalue.current.value);
      formdata.append("headerbuttontext", headerbuttontextvalue.current.value);
    }
    let Drawerdata = formdata;
    apiMethod(`PostEditSettingsByUser/${permissions.id}`, Drawerdata);
  }

  useEffect(() => {
    if (res.data && !res.isLoading) {
      setOpen(false);
      res.data.message && toast.success(res.data.message);
    }
  }, [res.data]);

  function SidebarColor(e) {
    setChangeColor({ ...changeColor, sidebg: e.target.value });
  }
  function MinSidebar(e) {
    setChangeColor({ ...changeColor, minsidebarbg: e.target.value });
  }
  function handleHeader(e) {
    setChangeColor({ ...changeColor, headerbd: e.target.value });
  }
  function Textcolor(e) {
    setChangeColor({ ...changeColor, sidetext: e.target.value });
  }
  function MinSidebarebarIcons(e) {
    setChangeColor({ ...changeColor, minsidebaractive: e.target.value });
  }
  const handleActionList = (e) => {
    setChangeColor({ ...changeColor, sideactive: e.target.value });
  };
  const handleGridBackground = (e) => {
    setChangeColor({ ...changeColor, sidegridbg: e.target.value });
  };
  const handleGridList = (e) => {
    setChangeColor({ ...changeColor, sidegridlist: e.target.value });
  };
  const handleGridActive = (e) => {
    setChangeColor({ ...changeColor, sidegridlistactive: e.target.value });
  };
  const handlethirdsGrid = (e) => {
    setChangeColor({ ...changeColor, thirdsidegridbg: e.target.value });
  };
  const handlethirdsGridList = (e) => {
    setChangeColor({ ...changeColor, thirdsidegridlist: e.target.value });
  };
  const handlethirdsGridActive = (e) => {
    setChangeColor({ ...changeColor, thirdsidegridlistactive: e.target.value });
  };
  function HeaderIcons(e) {
    setChangeColor({ ...changeColor, headericon: e.target.value });
  }
  const handleheaderButtonBg = (e) => {
    setChangeColor({ ...changeColor, headerbuttonbg: e.target.value });
  };
  const handleheaderButtontext = (e) => {
    setChangeColor({ ...changeColor, headerbuttontext: e.target.value });
  };
  function Headertitle(e) {
    setChangeColor({ ...changeColor, headeractive: e.target.value });
  }

  useEffect(() => {
    if (Apisetting) {
      let drawerdata = Apisetting;
      setsidebg(drawerdata.sidebg);
      setsideactive(drawerdata.sideactive);
      setsidetext(drawerdata.sidetext);
      setsidegridbg(drawerdata.sidegridbg);
      setsidegridlist(drawerdata.sidegridlist);
      setsidegridlistactive(drawerdata.sidegridlistactive);
      setthirdsidegridbg(drawerdata.thirdsidegridbg);
      setthirdsidegridlist(drawerdata.thirdsidegridlist);
      setthirdsidegridlistactive(drawerdata.thirdsidegridlistactive);
      setminsidebarbg(drawerdata.minsidebarbg);
      setminsidebaractive(drawerdata.minsidebaractive);
      setheaderbd(drawerdata.headerbd);
      setheaderactive(drawerdata.headeractive);
      setheadericon(drawerdata.headericon);
      setheaderbuttonbg(drawerdata.headerbuttonbg);
      setheaderbuttontext(drawerdata.headerbuttontext);
    }
  }, [Apisetting]);

  useEffect(() => {
    if (leadTotalCountData) {
      setStatisticsCounts({
        leads: leadTotalCountData.lead,
        Prospects: leadTotalCountData.prospect,
        Opportunities: leadTotalCountData.opportunity,
        Clientes: leadTotalCountData.client,
        newOpportunity: leadTotalCountData.new_opportunity,
        newProspect: leadTotalCountData.new_prospect,
        weeklyEvents: leadTotalCountData.event,
      })
    }
  }, [leadTotalCountData]);
  useEffect(() => {
    updateStatisticsData(timelineHistoryUser)
  }, [timelineHistoryUser])

  let initialValues = {
    font: Apisetting?.font || "font-montserrat",
    marrow: Apisetting?.marrow || "C",
    listicon: Apisetting?.listicon || "list-a",
    subfromsublisticon: Apisetting?.subfromsublisticon || "list-a",
    leads_per_page: Apisetting?.leads_per_page,
    prospects_per_page: Apisetting?.prospects_per_page
      ? Apisetting?.prospects_per_page
      : "",
    clients_per_page: Apisetting?.clients_per_page
      ? Apisetting?.clients_per_page
      : "",
    contact_per_page: Apisetting?.contact_per_page
      ? Apisetting?.contact_per_page
      : "",
    opportunity_per_page: Apisetting?.opportunity_per_page
      ? Apisetting?.opportunity_per_page
      : "",
    project_per_page: Apisetting?.project_per_page
      ? Apisetting?.project_per_page
      : "",
    action_per_page: Apisetting?.action_per_page
      ? Apisetting?.action_per_page
      : "",
    followup_per_page: Apisetting?.followup_per_page
      ? Apisetting?.followup_per_page
      : "",
    meeting_per_page: Apisetting?.meeting_per_page
      ? Apisetting?.meeting_per_page
      : "",
    login_history_per_page: Apisetting?.login_history_per_page,
    communication_template_per_page: Apisetting?.communication_template_per_page,
    media_per_page: Apisetting?.media_per_page,
    file_per_page: Apisetting?.file_per_page,
    translation_per_page: Apisetting?.translation_per_page,
    profile_per_page: Apisetting?.profile_per_page,
    tags_per_page: Apisetting?.tags_per_page,
    users_per_page: Apisetting?.users_per_page,
    calendar_event_per_page: Apisetting?.calendar_event_per_page,
    sources_per_page: Apisetting?.sources_per_page,
    custom_field_per_page: Apisetting?.custom_field_per_page
  };
  return (
    <div id="header_top" className="header_top small_Bar">
      {customDropDown === "yes" && <CustomStyles settingsData={changeColor} />}

      <div className="container">
        <div className="hleft">
          <div className="header-brand mt-0">
            <Link to={`/${config.ddemoss}`}>
              <img className="avatar" src={`${config.baseurl2}${permissions["system-avatar-image"]?.setting_value}`} />
            </Link>
          </div>
          <div className="dropdown">
            <Link to={`/${config.ddemoss}leads/Grid`} className="nav-link icon">
              <i className="fa fa-user-secret"></i>
            </Link>
            <Link to={`/${config.ddemoss}all_prospects/Grid`} className="nav-link icon">
              <i className="fa fa-user"></i>
            </Link>
            <Link to={`/${config.ddemoss}clients/Grid`} className="nav-link icon">
              <i className="fa fa-user-circle-o"></i>
            </Link>
            <Link to={`/${config.ddemoss}contacts`} className="nav-link icon">
              <i className="fa fa-vcard"></i>
            </Link>
            <Link to={`/${config.ddemoss}calendar/view/${lastObjectId}`} className="nav-link icon app_inbox">
              <i className="fa fa-calendar"></i>
            </Link>
            <Link to={`/${config.ddemoss}`} className="nav-link icon app_inbox">
              <i className="fa fa-envelope"></i>
            </Link>
            <Link to={`/${config.ddemoss}`} className="nav-link icon xs-hide">
              <i className="fa fa-comments-o"></i>
            </Link>
          </div>
        </div>
        <div className="hright">
          <Link
            onClick={() => showDrawer()}
            className="nav-link icon settingbar"
          >
            <AiOutlineSetting />
          </Link>

          <Link className="nav-link user_btn" onClick={() => showDrawer1()}>
            <img
              className="avatar"
              src={permissions?.avatar ? permissions?.avatar.includes("http") ? permissions?.avatar : `${config.baseurl2}${permissions?.avatar}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"}
              alt=""
            />
          </Link>

          <Link className="nav-link icon menu_toggle" onClick={toggleSidebar}>
            <FaAlignLeft />
          </Link>
        </div>
      </div>

      <Drawer mask={true} placement="right" onClose={onClose} open={open}>
        <div className="close-button mb-3" onClick={onClose}>
          <GrClose></GrClose>
        </div>
        <div className="right_setting_container">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form name="myForm">
              <h5 className="Drawer-headings p1">Font Style</h5>
              <div className="custom-controls-stacked font_setting">
                <label
                  className="custom-control custom-radio custom-control-inline"
                  htmlFor={"font1"}
                >
                  <Field
                    className="custom-control-input"
                    name="font"
                    type="radio"
                    value="font-opensans"
                    onClick={Fontstyle}
                    id="font1"
                  />
                  <span className="custom-control-label">Open Sans Font</span>
                </label>
              </div>
              <label
                className="custom-control custom-radio custom-control-inline"
                htmlFor={"font2"}
              >
                <Field
                  className="custom-control-input"
                  name="font"
                  type="radio"
                  onClick={Fontstyle}
                  id="font2"
                  value="font-montserrat"
                />
                <span className="custom-control-label">
                  Montserrate Google Font
                </span>
              </label>
              <br></br>
              <label
                className="custom-control custom-radio custom-control-inline"
                htmlFor={"font3"}
              >
                <Field
                  className="custom-control-input"
                  name="font"
                  type="radio"
                  onClick={Fontstyle}
                  id="font3"
                  value="font-roboto"
                />
                <span className="custom-control-label">Roboto Google Font</span>
              </label>
              <br></br>

              <hr className="drawer-hr-line"></hr>

              <h5 className="Drawer-headings p1">Dropdown Menu Icon</h5>
              <div className="custom-controls-stacked arrow_option">
                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="marrow"
                    type="radio"
                    value="A"
                    onClick={hanldeMarrow}
                    placeholder=" First Name"
                  />{" "}
                  <span className="custom-control-label">A</span>
                </label>

                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="marrow"
                    type="radio"
                    value="B"
                    onClick={hanldeMarrow}
                    placeholder=" First Name"
                  />
                  <span className="custom-control-label">B</span>
                </label>

                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="marrow"
                    type="radio"
                    value="C"
                    onClick={hanldeMarrow}
                    placeholder=" First Name"
                  />
                  <span className="custom-control-label">C</span>
                </label>
              </div>

              <h5 className="Drawer-headings p1">SubMenu List Icon</h5>
              <div className="custom-controls-stacked arrow_option">
                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="listicon"
                    type="radio"
                    value="list-a"
                    onClick={hanldeList}
                  />
                  <span className="custom-control-label">A</span>
                </label>

                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="listicon"
                    type="radio"
                    value="list-b"
                    onClick={hanldeList}
                  />
                  <span className="custom-control-label">B</span>
                </label>

                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="listicon"
                    type="radio"
                    value="list-c"
                    onClick={hanldeList}
                  />
                  <span className="custom-control-label">C</span>
                </label>
              </div>
              <h5 className="Drawer-headings p1">Third List Icon</h5>
              <div className="custom-controls-stacked list_option">
                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="subfromsublisticon"
                    type="radio"
                    value="list-a"
                    onClick={hanldeSubList}
                  />
                  <span className="custom-control-label">A</span>
                </label>

                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="subfromsublisticon"
                    type="radio"
                    value="list-b"
                    onClick={hanldeSubList}
                  />
                  <span className="custom-control-label">B</span>
                </label>

                <label className="custom-control custom-radio custom-control-inline">
                  <Field
                    className="custom-control-input"
                    name="subfromsublisticon"
                    type="radio"
                    value="list-c"
                    onClick={hanldeSubList}
                  />
                  <span className="custom-control-label">C</span>
                </label>
              </div>

              <hr className="drawer-hr-line"></hr>
              <div>
                <h5 className="Drawer-headings p1">General Settings</h5>

                <div className="toggleoptions radio-text p1">
                  Night Mode{" "}
                  <div>
                    <SwitchButton2
                      checkedd={darkmode}
                      checkeddupdate={(item) => handleDarkmode(item)}
                      name="darkmode"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  Fix Navbar Top
                  <div>
                    <SwitchButton2
                      checkedd={fixnavbar}
                      checkeddupdate={(item) => handleFixnavbar(item)}
                      name="fixnavbar"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  Header Dark
                  <div>
                    <SwitchButton2
                      checkedd={pageheader}
                      checkeddupdate={(item) => handlePageheader(item)}
                      name="pageheader"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  Min Sidebar Dark
                  <div>
                    <SwitchButton2
                      checkedd={min_sidebar}
                      checkeddupdate={(item) => handleMinSidebar(item)}
                      name="min_sidebar"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  Sidebar Dark
                  <div>
                    <SwitchButton2
                      checkedd={sidebar}
                      checkeddupdate={(item) => handleSidebar(item)}
                      name="sidebar"
                    />
                  </div>
                </div>

                <hr className="drawer-hr-line"></hr>
                <label htmlFor="customColor">
                  <input
                    onChange={checkbox1}
                    type="checkbox"
                    value={"yes"}
                    name={"custom_color"}
                    checked={customDropDown === "yes"}
                    id="customColor"
                  />
                  Use Custom Color
                </label>
                {deep && (
                  <div id="p1">
                    <Tabs
                      defaultActiveKey="Sidebar"
                      id="uncontrolled-tab-example"
                      className="mb-3 p1"
                    >
                      <Tab className="p1" eventKey="Sidebar" title="Sidebar">
                        <div className="color-input-div p1">
                          <div>Background Color</div>
                          <div>
                            <input
                              onChange={SidebarColor}
                              className="color-input p1"
                              type="color"
                              defaultValue={sidebg || "#000000"}
                              ref={sidebgvalue}
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Text Color</div>
                          <div>
                            <input
                              onChange={Textcolor}
                              ref={sidetextvalue}
                              defaultValue={sidetext || "#000000"}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Active Text Color</div>
                          <div>
                            <input
                              onChange={handleActionList}
                              ref={sideactivevalue}
                              defaultValue={sideactive || "#000000"}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Grid Background</div>
                          <div>
                            <input
                              onChange={handleGridBackground}
                              ref={sidegridbgvalue}
                              defaultValue={sidegridbg || "#000000"}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Grid List</div>
                          <div>
                            <input
                              ref={sidegridlistvalue}
                              onChange={handleGridList}
                              defaultValue={sidegridlist || "#000000"}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Grid List Active</div>
                          <div>
                            <input
                              ref={sidegridlistactivevalue}
                              defaultValue={sidegridlistactive}
                              onChange={handleGridActive}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Third Grid Background</div>
                          <div>
                            <input
                              ref={thirdsidegridbgvalue}
                              onChange={handlethirdsGrid}
                              defaultValue={thirdsidegridbg}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Third Grid List</div>
                          <div>
                            <input
                              ref={thirdsidegridlistvalue}
                              defaultValue={thirdsidegridlist}
                              className="color-input"
                              onChange={handlethirdsGridList}
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Third Grid List Active</div>
                          <div>
                            <input
                              ref={thirdsidegridlistactivevalue}
                              defaultValue={thirdsidegridlistactive}
                              className="color-input p1"
                              type="color"
                              onChange={handlethirdsGridActive}
                            ></input>
                          </div>
                        </div>
                      </Tab>
                      <Tab
                        className="p1"
                        eventKey="Min Sidebar"
                        title="Min Sidebar"
                      >
                        <div className="color-input-div p1">
                          <div>Background Color</div>
                          <div>
                            <input
                              onChange={MinSidebar}
                              ref={minsidebarbgvalue}
                              defaultValue={minsidebarbg}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Text/Icon Color</div>
                          <div>
                            <input
                              onChange={MinSidebarebarIcons}
                              ref={minsidebaractivevalue}
                              defaultValue={minsidebaractive}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                      </Tab>
                      <Tab className="p1" eventKey="header" title="Header">
                        <div className="color-input-div p1">
                          <div>Background Color</div>
                          <div>
                            <input
                              onChange={handleHeader}
                              ref={headerbdvalue}
                              defaultValue={headerbd}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Title Color</div>
                          <div>
                            <input
                              onChange={Headertitle}
                              ref={headeractivevalue}
                              defaultValue={headeractive}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Icon</div>
                          <div>
                            <input
                              onChange={HeaderIcons}
                              ref={headericonvalue}
                              defaultValue={headericon}
                              className="color-input p1"
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Button Background Color</div>
                          <div>
                            <input
                              ref={headerbuttonbgvalue}
                              defaultValue={headerbuttonbg}
                              className="color-input p1"
                              onChange={handleheaderButtonBg}
                              type="color"
                            ></input>
                          </div>
                        </div>
                        <div className="color-input-div p1">
                          <div>Button Text Color</div>
                          <div>
                            <input
                              ref={headerbuttontextvalue}
                              defaultValue={headerbuttontext}
                              className="color-input p1"
                              onChange={handleheaderButtontext}
                              type="color"
                            ></input>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                )}
                <hr className="drawer-hr-line"></hr>

                <div className="toggleoptions radio-text p1">
                  {" "}
                  IconColor{" "}
                  <div>
                    {" "}
                    <SwitchButton2
                      checkedd={iconcolor}
                      checkeddupdate={(item) => handleIconcolor(item)}
                      name="iconcolor"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  {" "}
                  Gradient Color{" "}
                  <div>
                    {" "}
                    <SwitchButton2
                      checkedd={gradient}
                      checkeddupdate={(item) => handleGradient(item)}
                      name="gradient"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  {" "}
                  Box Shadow{" "}
                  <div>
                    <SwitchButton2
                      checkedd={boxshadow}
                      checkeddupdate={(item) => handleBoxshadow(item)}
                      name="boxshadow"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  {" "}
                  RTL Support{" "}
                  <div>
                    {" "}
                    <SwitchButton2
                      checkedd={rtl}
                      checkeddupdate={(item) => handleRTL(item)}
                      name="rtl"
                    />
                  </div>
                </div>
                <div className="toggleoptions radio-text p1">
                  {" "}
                  Box Layout{" "}
                  <div>
                    {" "}
                    <SwitchButton2
                      checkedd={boxlayout}
                      checkeddupdate={(item) => handleBoxlayout(item)}
                      name="boxlayout"
                    />
                  </div>
                </div>

                <hr className="drawer-hr-line"></hr>
                <h5 className="Drawer-headings p1">Paggination</h5>
                <div className="p1 numberinput">
                  Leads Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="leads_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Prospect Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="prospects_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Client Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="clients_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Contact Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="contact_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Opportunity Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="opportunity_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Project Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="project_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Action Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="action_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Follow Up Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="followup_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Meeting Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="meeting_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Login History Per Page
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="login_history_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Custom fields
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="custom_field_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Sources
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="sources_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Calendar Event
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="calendar_event_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Users
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="users_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Tags
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="tags_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Profile
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="profile_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Translation
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="translation_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  File
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="file_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Media
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="media_per_page"
                    type="number"
                  />
                </div>
                <div className="p1 numberinput">
                  Communication Template
                  <Field
                    className="radio-text num-input p1"
                    min="0"
                    name="communication_template_per_page"
                    type="number"
                  />
                </div>

              </div>
              <div className="setting-button-div p1">
                <button type="submit" className="save-setting-btn p1">
                  {" "}
                  Save Settings{" "}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Drawer>
      {/* Drawer */}
      {/* drawerleft */}
      <Drawer
        mask={true}
        title="Basic Drawer"
        placement="left"
        onClose={onClose1}
        open={open1}
      >
        <div className="modalleft">
          <div className="modal-left-leftdiv">
            <p className="drawertitle">Sales Journey</p>
          </div>
          <div className="modal-left-leftdiv">
            <BiLogOut className="logoutfont" onClick={onClose1}></BiLogOut>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="media">
              <img
                className="avatar avatar-xl mr-3"
                src={`${config.baseurl2}${permissions?.avatar}`}
                alt=""
              />
              <div className="media-body">
                <h5 className="m-0"> {permissions?.uname}</h5>
                <p className="text-muted mb-0">{permissions?.role_name}</p>
              </div>
            </div>
            <div className="d-flex align-items-baseline mt-3">
              <h3 className="mb-0 mr-2">9.8</h3>

              <p className="mb-0"><span className="text-success">1.6% <i className="fa fa-arrow-up"></i></span></p>
            </div>

            <div className="progress progress-xs">
              <div className="progress-bar" role="progressbar" style={{ "width": "15%" }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>

              <div className="progress-bar bg-info" role="progressbar" style={{ "width": "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>

              <div className="progress-bar bg-success" role="progressbar" style={{ "width": "30%" }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
              <div className="progress-bar bg-orange" role="progressbar" style={{ "width": "5%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>

              <div className="progress-bar bg-indigo" role="progressbar" style={{ "width": "13%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h6 className="text-uppercase font-10 mt-1">Performance Score</h6>
          </div>
          <div></div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Statistics & Goals</h3>

            <div className="card-options">
              <Link className="card-options-collapse" onClick={(e) => handleToggle(e)}><i className="fe fe-chevron-up"></i></Link>
              <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
          </div>

          <div className="card-body">
            <div className="text-center">
              <div className="row">
                <div className="col-6 pb-3">
                  <label className="mb-0">Leads</label>

                  <h4 className="font-30 font-weight-bold">{StatisticsCounts?.leads && StatisticsCounts?.leads?.current_count}</h4>
                </div>

                <div className="col-6 pb-3">
                  <label className="mb-0">Prospects</label>

                  <h4 className="font-30 font-weight-bold">{StatisticsCounts?.Prospects && StatisticsCounts.Prospects?.current_count}</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-6 pb-3">
                  <label className="mb-0">Opportunities</label>

                  <h4 className="font-30 font-weight-bold">{StatisticsCounts?.Opportunities && StatisticsCounts.Opportunities?.current_count}</h4>
                </div>

                <div className="col-6 pb-3">
                  <label className="mb-0">Clients</label>

                  <h4 className="font-30 font-weight-bold">{StatisticsCounts?.Clientes && StatisticsCounts.Clientes?.current_count}</h4>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="d-block">New Prospects<span className="float-right">{StatisticsCounts?.newProspect && StatisticsCounts?.newProspect}</span></label>

              <div className="progress progress-xs">
                <div className="progress-bar bg-blue" role="progressbar" aria-valuenow="77" aria-valuemin="0" aria-valuemax="100" style={{ "width": "77%" }}></div>
              </div>
            </div>

            <div className="form-group">
              <label className="d-block">Weekly Events <span className="float-right">{StatisticsCounts?.weeklyEvents && StatisticsCounts.weeklyEvents?.current_count}</span></label>

              <div className="progress progress-xs">
                <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ "width": "50%" }}></div>
              </div>
            </div>

            <div className="form-group mb-0">
              <label className="d-block">New Oppotunities <span className="float-right">{StatisticsCounts?.newOpportunity && StatisticsCounts?.newOpportunity}</span></label>

              <div className="progress progress-xs">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="23" aria-valuemin="0" aria-valuemax="100" style={{ "width": "23%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Weekly Agenda</h3>

            <div className="card-options">
              <Link className="card-options-collapse" onClick={(e) => handleToggle(e)}><i className="fe fe-chevron-up"></i></Link>
              <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
          </div>

          <div className="card-body">
            <ul className="new_timeline">
              {actionAccordingToWeek && Array.isArray(actionAccordingToWeek?.startDate) && actionAccordingToWeek.startDate.length > 0 ? (
                actionAccordingToWeek.startDate.map((items, i) => {
                  return (
                    <li key={i}>
                      <div className="bullet pink"></div>

                      <div className="time">
                        <h5>{items.start_date && dayjs(items.start_date).format('ddd - MMM D, YYYY')}</h5>
                      </div>

                      <div className="desc">
                        <h3>{items.start_date_time && dayjs(items.start_date_time, 'HH:mm:ss').format('h:mm A')}</h3>

                        <h4>{items.event_title}</h4>
                      </div>
                    </li>
                  );
                })
              ) : (
                <h3 className="text-center">No Events</h3>
              )}
              {/* <li>
                <div className="bullet pink"></div>

                <div className="time">
                  <h5>Mon - Nov 7,2022</h5>
                </div>

                <div className="desc">
                  <h3>10:30:12:30</h3>

                  <h4>Musiq SoulChild - Grown & Sexy 16</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Lucha Libra</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Roger Hodgson</h4>
                </div>
              </li>
              <li>
                <div className="bullet pink"></div>

                <div className="time">
                  <h5>Tue - Nov 8,2022</h5>
                </div>

                <div className="desc">
                  <h3>10:30:12:30</h3>

                  <h4>Musiq SoulChild - Grown & Sexy 16</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Lucha Libra</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Roger Hodgson</h4>
                </div>
              </li>
              <li>
                <div className="bullet pink"></div>

                <div className="time">
                  <h5>Wed - Nov 9,2022</h5>
                </div>

                <div className="desc">
                  <h3>10:30:12:30</h3>

                  <h4>Musiq SoulChild - Grown & Sexy 16</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Lucha Libra</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Roger Hodgson</h4>
                </div>
              </li>
              <li>
                <div className="bullet pink"></div>

                <div className="time">
                  <h5>Thu - Nov 10,2022</h5>
                </div>

                <div className="desc">
                  <h3>10:30:12:30</h3>

                  <h4>Musiq SoulChild - Grown & Sexy 16</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Lucha Libra</h4>

                  <h3>10:30:12:30</h3>

                  <h4>Roger Hodgson</h4>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Timeline</h3>

            <div className="card-options">
              <Link className="card-options-collapse" onClick={(e) => handleToggle(e)}><i className="fe fe-chevron-up"></i></Link>
              <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
          </div>

          <div className="card-body timeline-data">
            <ul className="new_timeline">
              {
                Array.isArray(statisticsData) && statisticsData.map((items, i) => {
                  return (
                    < li key={i}>
                      {
                        items?.user_sign_in_time ? <div className="bullet green"></div> : <div className="bullet orange"></div>
                      }
                      <div className="time">
                        {
                          items?.user_sign_in_time ? dayjs(items?.user_sign_in_time, 'YYYY-MM-DD HH:mm:ss', permissions["system-user_timezone"]?.setting_value).tz().format("DD-MMM-YYYY hh:mm A") :
                            // (items?.message? dayjs(items?.activity_date_time, 'YYYY-MM-DD HH:mm:ss').locale('en').format("DD-MMM-YYYY hh:mm A") : <></>)
                            dayjs.tz(items?.updated_date, 'YYYY-MM-DD HH:mm:ss', permissions["system-user_timezone"]?.setting_value).tz().format("DD-MMM-YYYY hh:mm A")
                        }
                      </div>
                      <div className="desc">
                        {/* {items?.user_sign_in_time ? <h3>Login</h3> : (items?.message ? <h3>{StringConvert(items?.message)}</h3>:<></>)} */}
                        {items?.user_sign_in_time ? items?.log_status === "1" ? <h3>Login</h3> : <h3>Logout</h3> : <h3>{`${items?.message} ${items?.title}`}</h3>}
                      </div>
                    </li>
                  )
                })
              }
              {/* <li>
                <div className="bullet blue"></div>

                <div className="time">11:30am</div>

                <div className="desc">
                  <h3>Update Lead</h3>
                  <a href="#">“Name of the Lead”</a></div>
              </li>
              <li>
                <div className="bullet green"></div>

                <div className="time">12:00pm</div>

                <div className="desc">
                  <h3>New Prospect</h3>
                  <a href="#">Name of the prospect</a></div>
              </li>
              <li>
                <div className="bullet green"></div>

                <div className="time">2:00pm</div>

                <div className="desc">
                  <h3>Create Meeting</h3>
                  <a href="#">“Title of the meeting”</a></div>
              </li>
              <li>
                <div className="bullet orange"></div>

                <div className="time">1:30pm</div>

                <div className="desc">
                  <h3>Update Opportunity</h3>
                  <a href="#">Name of the opportunity</a></div>
              </li>
              <li>
                <div className="bullet red"></div>

                <div className="time">2:38pm</div>

                <div className="desc">
                  <h3>Logout</h3>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </Drawer >
    </div >
  );
}

export default LeftSmallNavigation;
