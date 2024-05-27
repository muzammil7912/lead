import React, { useState, useRef, useContext } from "react";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NavigationPill from "../components/form/NavigationPill.jsx";
import { Translation } from "../components/Translation.js";
import config from "../services/config.json";
import Loader from "../components/common/Loading.jsx";
import Dropdown2 from "../components/form/Dropdown2.jsx";
import Dropdown3 from "../components/form/Dropdown3.jsx";
import usePost from "../customHooks/usePost.js";
import DatePickers from "../components/form/DatePickers.jsx";
import { useEffect } from "react";
import { Pagination } from 'antd';
import swal from "sweetalert";
import Dropdown4 from "../components/form/Dropdown4.jsx";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Role from "../components/Role";
import ClientListView from "./ClientListView";
import ClientGridView from "./ClientGridView";
import Kanban from "./Kanban";
import { useParams } from "react-router-dom";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { handleClick } from "../components/AllCustomFuntion";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import dayjs from "dayjs";
import { MainExportDataContext } from "../context/MainExportDataContext";

function AllClient() {
  const { active } = useParams();
  const { addExportData } = useContext(MainExportDataContext)
  const { translations } = useContext(MainTranslationContexts)
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { addHeading } = useContext(MainHeadingContext);
  const [savestate, setSavestate] = useState("");
  let saveit = localStorage.getItem(`clientsaveitem`);

  const [saveValue, setSaveValue] = useState(saveit)
  const [resowner, apiMethodowner] = usePost();
  const [resdata, apiMethoddata] = usePost();
  const [totalleads, settotalleads] = useState()
  const [limit, setlimit] = useState()
  const ownerRef = useRef(null);
  const inputElement = useRef();
  const [searchval, setSearchval] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const isComponentMounted = useRef(true);
  const [datas, setDatas] = useState("");
  const [show, setShow] = useState(false);
  let all_clients_query = localStorage.getItem("all_clients_query");
  let len = localStorage.getItem("clientslength");
  let len2 = [];
  const [resget3, apiMethodGet3] = usePost();
  const [resget, apiMethodGet] = usePost();
  const [pagination, setpagination] = useState()
  const [resgetS, apiMethodGetS] = usePost();
  const [resSaveDelete, apiMethodSaveDelete] = usePost();
  const [daveData, setdaveData] = useState("")
  const [currentItem, setCurrentItem] = useState(active);
  const [refersh, setRefersh] = useState("1")
  let dropdown_list = [
    {
      id: "1",
      value: "in_between",
      label: "In between"
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
  ]
  const convertStringToBoolean = (value) => {
    if (value?.toLowerCase() === "true") {
      return true;
    } else {
      return false;
    }
  }
  const handleAPi = () => {
    if (isComponentMounted.current) {
      if (isComponentMounted.current) {
        let formdata = new FormData();
        let seaas;
        if (saveit) {
          let sav = saveit.split("___");
          seaas = sav[1];
        }
        if (all_clients_query) {
          formdata.append("all_clients_query", all_clients_query.trim());
        }
        else if (seaas) {
          formdata.append("all_clients_query", seaas);
        }
        let bodyContent = formdata;
        apiMethodGet("postAllViewClientsUser", bodyContent);
      }
    }
  }
  useEffect(() => {
    if (currentItem == 'Kanban') {
      setpagination(false)
    }
    else {
      setpagination(true)
    }
  }, [currentItem])

  useEffect(() => {
    addHeading(` All Clients`);
    if (isComponentMounted.current) {
      handleAPi()
      setRefersh("2")
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (resget.data) {
      addExportData(resget?.data?.getClientsSearchColumnsApi)


      if (!resget.data.postAllClientsApi.message) {
        settotalleads(resget.data.postAllClientsApi[0].pagination.total_record)
        setlimit(resget.data.postAllClientsApi[0].pagination.limit)
      }
      let postAllClientsApis = resget?.data
      const { getClientsSaveSearchApi, postAllClientsApi } = postAllClientsApis
      setdaveData(getClientsSaveSearchApi)
      setDatas(postAllClientsApi);
    }
  }, [resget.data])
  function submit1(page, pageSize) {
    console.log(page)


    // console.log(calculatedPageSize)
    const formdata = new FormData();
    const seaas = saveit ? saveit.split("___")[1] : null;
    if (all_clients_query) {
      formdata.append("all_clients_query", all_clients_query.trim());
    } else if (seaas) {
      formdata.append("all_clients_query", seaas);
    }
    formdata.append('page', page);

    apiMethoddata('postAllViewClientsUser', formdata);

  }
  useEffect(() => {
    if (resdata?.data) {
      setDatas(resdata.data.postAllClientsApi)
      // setDatas(postAllLeadsApi);
    }
  }, [resdata.data])


  useEffect(() => {
    if (currentItem === "Grid" || currentItem === "List") {
      if (refersh === "2") {
        const formdata = new FormData();
        const seaas = saveit ? saveit.split("___")[1] : null;
        if (all_clients_query) {
          formdata.append("all_clients_query", all_clients_query.trim());
        } else if (seaas) {
          formdata.append("all_clients_query", seaas);
        }
        const bodyContent = formdata;
        apiMethodGet3("postAllClients", bodyContent);
      }
    }
  }, [currentItem]);

  useEffect(() => {
    if (resget3.data) {
      settotalleads(resget3.data[0]?.pagination.total_record)
      setlimit(resget3.data[0]?.pagination.limit)
      let postAllClientsApis = resget3?.data
      setDatas(postAllClientsApis);
    }
  }, [resget3.data])


  const [resSearch, apiMethodSearch] = usePost();
  const [arrays, setArrays] = useState(["birdfsthday", ""]);

  let mm = [];
  if (len) {
    len2.length = parseInt(len)
    for (let index = 0; index < len2.length; index++) {
      mm.push({
        id: `${index + 1}`,
        firstValue: localStorage.getItem(`first-filter-clients[${index}]`),
        SecondValue: localStorage.getItem(`second-filter-clients[${index}]`),
        SearchInput: localStorage.getItem(`filter-text-clients[${index}]`),
        select: localStorage.getItem(`operation-clients[${index}]`),
        between: convertStringToBoolean(localStorage.getItem(`between-clients[${index}]`)),

      })
    }

  }

  const [NotificationArr, setNotificationArr] = useState(
    len
      ? mm
      : [
        {
          id: 1,
          firstValue: null,
          SecondValue: null,
          SearchInput: "",
          select: "AND",
          between: false
        },
      ]
  );


  const [resdelete, apiMethoddelete] = usePost();
  const hanldeDelete = (item) => {
    let valdelate = new FormData();
    valdelate.append("id", item.leadid);

    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete("deleteClient ", valdelate)
        setDatas(datas.filter((ite) => ite.leadid !== item.leadid));
      }
    });

  }

  useEffect(() => {
    if (resdelete.data && !resdelete.isLoading) {
      resdelete.data.message && toast.success(resdelete.data.message);
      if (refersh === "2") {
        const formdata = new FormData();
        const seaas = saveit ? saveit.split("___")[1] : null;
        if (all_clients_query) {
          formdata.append("all_clients_query", all_clients_query.trim());
        } else if (seaas) {
          formdata.append("all_clients_query", seaas);
        }
        const bodyContent = formdata;
        apiMethodGet3("postAllClients", bodyContent);
      }
    }
  }, [resdelete.data]);


  // useEffect(() => {
  //   if (resdelete.data && !resdelete.isLoading) {
  //     
  //   }
  // }, [resdelete.data]);
  const practiceProfileRender = {
    ["Grid"]: <ClientGridView data={datas} deletee={(item) => hanldeDelete(item)} loadingss={resget3.isLoading} />,
    ["List"]: <ClientListView data={datas} deletee={(item) => hanldeDelete(item)} loadingss={resget3.isLoading} />,
    ["Kanban"]: <Kanban />,
  };
  const handleClose = () => {
    setShow(false);
  };
  const items = [
    {
      label: "Grid",
    },
    {
      label: "List",
    },
    {
      label: "Kanban",
    },
  ];
  const handleChange = (value, element, index, obj) => {
    let updatedObject;
    if (obj.type === "datetime" || obj.type === "date" || obj.type === "timestamp" || obj.type === "time") {
      updatedObject = { ...NotificationArr[index], firstValue: value, between: true, SecondValue: "in_between" }
    } else {
      updatedObject = { ...NotificationArr[index], firstValue: value, between: false, SecondValue: "" }
    };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  };
  const handleChange2 = (value, element, index) => {
    const updatedObject = { ...NotificationArr[index], SecondValue: value };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  };
  const handleChange3 = (value, element, index) => {
    let prevdate = dayjs(value[0]).format('YYYY/MM/DD')

    let newdate = dayjs(value[1]).format('YYYY/MM/DD')



    const updatedObject = {
      ...NotificationArr[index],
      SearchInput: `${prevdate} - ${newdate}`,
    };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  };
  const handleInput = (value, element, index) => {
    const updatedObject = { ...NotificationArr[index], SearchInput: value };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  };
  const handleSingleDateChange = (value, element, index) => {
    const updatedObject = { ...NotificationArr[index], SearchInput: value };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  };
  const handleIncrement = () => {
    setNotificationArr([
      ...NotificationArr,
      {
        id: NotificationArr.length + 1,
        firstValue: null,
        SecondValue: null,
        SearchInput: "",
        select: "AND",
        between: false
      },
    ]);
  };
  const handleSelect = (value, index) => {
    const updatedObject = { ...NotificationArr[index], select: value };
    const updatedListss = [...NotificationArr];
    updatedListss[index] = updatedObject;
    setNotificationArr(updatedListss);
  };
  const handleSearch = () => {
    let formdata = new FormData();
    formdata.append(`filter-records`, true);
    let a = [];
    let b = [];
    let c = [];

    NotificationArr.map((item) => {
      a.push(item.firstValue);
      b.push(item.SecondValue);
      c.push(item.SearchInput);
    });
    if (a.includes("") || b.includes("") || c.includes("") || a.includes(null) || b.includes(null) || c.includes(null)) {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      });
    } else {
      NotificationArr.map((item, index) => {
        formdata.append(`first-filter-clients[${[index]}]`, item.firstValue);
        formdata.append(`second-filter-clients[${[index]}]`, item.SecondValue);
        formdata.append(`filter-text-clients[${[index]}]`, item.SearchInput);
        formdata.append(
          `operation-clients[]`,
          `${item.select.toLowerCase() == "or" ? "OR" : "AND"}
                  `
        );
        localStorage.setItem(`first-filter-clients[${[index]}]`, item.firstValue);
        localStorage.setItem(
          `second-filter-clients[${[index]}]`,
          item.SecondValue
        );
        localStorage.setItem(`between-clients[${index}]`, item.between)
        localStorage.setItem(`filter-text-clients[${[index]}]`, item.SearchInput);
        localStorage.setItem(
          `operation-clients[${index}]`,
          `${item.select.toLowerCase() == "and" ? "AND" : "OR"}`
        );
      });
      localStorage.setItem(`clientslength`, NotificationArr.length);
      let bodyContent = formdata;
      apiMethodSearch("postClientsSearch", bodyContent);
    }
  };
  useEffect(() => {
    if (resSearch.data) {
      localStorage.setItem(`all_clients_query`, resSearch.data.all_clients_query);
      let formdata = new FormData();
      formdata.append("all_clients_query", resSearch.data.all_clients_query);
      apiMethodGet3("postAllClients", formdata);
    }
  }, [resSearch])

  const handleRemoveSearch = () => {
    let formdata = new FormData();
    localStorage.removeItem("all_clients_query");
    let le = localStorage.getItem("clientslength");
    localStorage.removeItem("clientslength");
    let len3 = [];
    len3.length = parseInt(le)
    for (let index = 0; index < len3.length; index++) {
      localStorage.removeItem(`first-filter-clients[${[index]}]`);
      localStorage.removeItem(`second-filter-clients[${[index]}]`);
      localStorage.removeItem(`filter-text-clients[${[index]}]`);
      localStorage.removeItem(`operation-clients[${[index]}]`);
      localStorage.removeItem(`between-clients[${[index]}]`);

    }

    apiMethodGet3("postAllClients", formdata);
    setNotificationArr(NotificationArr.slice(0, 1));
  };


  const handleDelete = (element, index) => {
    setNotificationArr(NotificationArr.filter((item) => item.id != element.id));
  };
  const handleSave = () => {
    if (!savestate) {
      swal({
        title: "Attention",
        text: "Please add search name first!",
        icon: "warning",
        dangerMode: true,
      })
    }
    else {
      setShow(true);
    }
  };

  const [saveValue2, setSaveValue2] = useState(false)
  const [saveValue3, setSaveValue3] = useState("")
  const handleSaveSearch = (values) => {
    let vv = values.split("___")
    let formdata = new FormData();
    formdata.append("all_clients_query", vv[1]);
    let bodyContent = formdata;
    apiMethodGet3("postAllClients", bodyContent);
    localStorage.setItem(`clientsaveitem`, values);
    setSaveValue2(true)
    setSaveValue(values)
    setSaveValue3(vv[0])
  };
  const handleSaveDelete = () => {
    let formdata = new FormData();
    formdata.append("delete-old-search-clients", "true");
    formdata.append("old-search-clients-id", saveValue3);
    apiMethodSaveDelete("deleteClientsSaveSearch", formdata)
  }
  const handleSaveDelete2 = () => {
    let formdata = new FormData();
    formdata.append("all_clients_query", "");
    let bodyContent = formdata;
    apiMethodGet3("postAllClients", bodyContent);
    localStorage.removeItem(`clientsaveitem`)
    setSaveValue()
  }
  useEffect(() => {
    if (resSaveDelete.data) {
      setdaveData(daveData.filter(item => item.search_id !== saveValue3))
      setSaveValue()
      resSaveDelete.data.message && toast.success(resSaveDelete.data.message);
    }
  }, [resSaveDelete.data])


  const radi = [
    {
      label: "Private",
      value: "private",
    },
    {
      label: "Global",
      value: "global",
    },
    {
      label: "Specific User(s)",
      value: "specific",
    },
    {
      label: "Role",
      value: "role",
    },
  ];

  const [spec, setSpec] = useState(false);
  const [roless, setRoless] = useState(false);
  const [rolesss, setRolesss] = useState("");
  const [se, setse] = useState("")
  const handleCheck = (value) => {
    setse(value.value)
    if (value.value == "specific") {
      setSpec(true);
      setRoless(false);
    } else if (value.value == "role") {
      setSpec(false);
      setRoless(true);
    } else {
      setSpec(false);
      setRoless(false);
    }
  };
  const handleRole = (e) => {
    setRolesss(e)
  }
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  let map = [];

  const handleSubmit2 = () => {
    let formdata = new FormData();
    if (se == "private") {
      formdata.append(`save-filter-records_clients`, "private:");
    }
    else if (se == "global") {
      formdata.append(`save-filter-records_clients`, "global:");
    }
    else if (se == "specific") {
      formdata.append(`save-filter-records_clients`, `${se}:${map.join(",")}`);
    }
    else if (se == "role") {
      formdata.append(`save-filter-records_clients`, `${se}:${rolesss}`);
    }
    formdata.append(`search_name_field_clients`, `${savestate}`);
    formdata.append(`all_clients_query`, `${localStorage.getItem("all_clients_query").trim()}`);
    apiMethodGetS("postClientsFilterSaved", formdata);

  };
  useEffect(() => {
    if (resgetS.data && !resgetS.isLoading) {
      axios.get(`${config.apiEndPoint}getClientsSaveSearch`)
        .then((response) => {
          setdaveData(response.data)
          setShow(false)
        })
        .catch((err) => {
          console.log('eerr', err)
        })
      resgetS.data.message && toast.success(resgetS.data.message);
    }
  }, [resgetS.data])


  if (!datas) return <Loader />;
  let postAllClientsApis = resget?.data;
  const { getClientsSearchColumnsApi, getUserRolesApi } = postAllClientsApis

  const lista = getClientsSearchColumnsApi?.fetchColumns;
  const list = Array.isArray(lista) && lista.filter((item) => !getClientsSearchColumnsApi?.global_columns.includes(item.Field));
  const redata = getUserRolesApi;



  return (
    <div className="AllClient mt-3">
      <div className="container-fluid">
        <div className="card leadCard">
          <div className="card-headers p-3">
            <div className="d-md-flex justify-content-between align-item-center mb-4">
              <ul className="nav nav-tabs b-none">
                <NavigationPill
                  items={items}
                  currentItem={currentItem}
                  onCurrentItem={setCurrentItem}
                />
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${config.ddemoss}create_client`}
                  >
                    <i className="fa fa-plus"></i>
                    {Translation(translations, "Add New")}
                  </Link>
                </li>
              </ul>
              <div>
                <div className="d-flex gap-2">
                  {daveData.length &&
                    <>
                      <Dropdown4
                        list={daveData}
                        selected={saveValue}
                        changes={(value) => handleSaveSearch(value)}
                      />
                    </>
                  }
                  {saveValue && <div className="d-flex gap-2">
                    {saveValue2 && <button onClick={() => handleSaveDelete()} className="btn btn-outline-danger" name="delete-old-search-client">Delete Saved search</button>}

                    <button onClick={() => handleSaveDelete2()} name="clear-saved-search-records" className="btn btn-outline-warning"><i className="fa fa-times" aria-hidden="true"></i>&nbsp;Clear Saved search</button>
                  </div>}
                </div>
              </div>
            </div>
            {NotificationArr.map((element, index) => {
              return (
                <div className="row my-3" key={index}>
                  <div className="col-lg-3">
                    <Dropdown2
                      list={list}
                      changes={(value, obj) => handleChange(value, element, index, obj)}
                      selected={element.firstValue}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Dropdown3
                      changes={(value) => handleChange2(value, element, index)}
                      selected={element.SecondValue}
                      dropdown_list={element.between ? dropdown_list : dropdown_list.filter(val => val.value !== "in_between")}

                    />
                  </div>
                  <div className="col-lg-3">
                    {element.between ? (element.SecondValue === "in_between" ? <DatePickers
                      changes={(value) =>
                        handleChange3(value, element, index)
                      }
                      defaultValue={element.SearchInput?.split("-")[1]?.includes("/") && [dayjs(element.SearchInput.split("-")[0], 'YYYY/MM/DD'), dayjs(element.SearchInput.split("-")[1], 'YYYY/MM/DD')]}
                    /> : <input
                      className="form-control"
                      type={"date"}
                      onChange={(e) => { handleSingleDateChange(e.target.value, element, index) }}
                      defaultValue={element.SearchInput}
                    />) :

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
                  {index !== 0 && (
                    <div className="col-lg-3">
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
              );
            })}
            <div className="d-flex gap-2 my-3">
              <Link
                onClick={handleIncrement}
                className="btn btn-outline-secondary add-col"
              >
                <i className="fa fa-plus"></i> Add
              </Link>
              <button
                type="submit"
                onClick={handleSearch}
                name="filter-records"
                className="btn btn-primary"
              >
                <i className="fa fa-search"></i> Search
              </button>

              {currentItem == "Kanban" &&
                <>

                  {(leadPermission?.super_admin || leadPermission?.client_stages?.active_module !== "0") &&
                    <>
                      {(leadPermission?.super_admin || leadPermission?.client_stages?.create === "1") &&
                        <Link to={`/${config.ddemoss}create_clientstage`} className="btn btn-outline-secondary kanbanbtn">Create Stage</Link>
                      }
                      {(leadPermission?.super_admin || leadPermission?.client_stages?.view === "1") &&
                        <Link to={`/${config.ddemoss}settings_clientstage`} className="btn btn-outline-secondary kanbanbtn">Stage Setting</Link>
                      }
                    </>
                  }
                </>
              }
              {all_clients_query && (
                <>
                  <input
                    type="text"
                    className="form-control"
                    name="search_name_field_client"
                    placeholder="Search name."
                    onInput={(e) => setSavestate(e.target.value)}
                    value={savestate}
                  ></input>
                  <button
                    type="button"
                    onClick={() => handleSave()}
                    className="btn btn-outline-success btn-fl-rec"
                  >
                    <i className="fa fa-floppy-o"></i> Save this search
                  </button>
                  <button
                    onClick={() => handleRemoveSearch()}
                    name="clear-search-records"
                    className="btn btn-outline-warning"
                  >
                    <i className="fa fa-times" aria-hidden="true"></i> Clear
                    search
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid px-0" id="gridcol">
          {practiceProfileRender[currentItem]}
        </div>
        {Array.isArray(datas) && pagination ? <Pagination defaultCurrent={1} pageSize={Number(limit)} defaultPageSize={5} total={totalleads} onChange={submit1} /> : ''}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Translation(translations, "Share Search to...")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {radi.map((item, index) => {
            return (
              <div key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={() => handleCheck(item)}
                    type="radio"
                    name="typeSearch"
                    id={item.value}
                  />
                  <label className="form-check-label" htmlFor={item.value}>
                    {item.label}
                  </label>
                </div>
                {item.value == "specific" && spec && (
                  <div className="spsf_user d-block">
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
                              <h6>You can select multiple users.</h6>
                              {resowner.data.map((item, index) => {
                                return (
                                  <div key={index}>
                                    <label className="custom-control custom-checkbox">
                                      <input
                                        key={index}
                                        onChange={() => handleClick(map)}
                                        type="checkbox"
                                        className="custom-control-input sr-check ssch"
                                        value={item.id}
                                      />{" "}
                                      <span className="custom-control-label">
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

                {item.value == "role" && roless && (
                  <>
                    <select className="form-control" onChange={(e) => handleRole(e.target.value)} >
                      <Role obj={redata?.CEO} />
                    </select>
                  </>
                )}
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit2}>
            {Translation(translations, "Save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllClient;
