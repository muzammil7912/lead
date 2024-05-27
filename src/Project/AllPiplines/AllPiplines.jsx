import React, { useState, useRef,useContext } from "react";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NavigationPill from "../../components/form/NavigationPill.jsx";
import { Translation } from "../../components/Translation.js";
import config from "../../services/config.json";
import useFetch from "../../customHooks/useFetch.js";
import Loader from "../../components/common/Loading.jsx";
import Dropdown2 from "../../components/form/Dropdown2.jsx";
import Dropdown3 from "../../components/form/Dropdown3.jsx";
import usePost from "../../customHooks/usePost.js";
import DatePickers from "../../components/form/DatePickers.jsx";
import { useEffect } from "react";
import swal from "sweetalert";
import Dropdown4 from "../../components/form/Dropdown4.jsx";
import { FaSearch } from "react-icons/fa";
import $ from "jquery";
import { toast } from "react-toastify";
import axios from "axios";
import Role from "../../components/Role";
import AllPiplineGridView from "./AllPiplineGridView";
import AllPiplineListView from "./AllPiplineListView";

function AllPiplines({ translation }) {
  const { addHeading } = useContext(MainHeadingContext);
  const [savestate, setSavestate] = useState("");
  let saveit =  localStorage.getItem(`opportunitiespipsaveitem`);

  const [saveValue, setSaveValue] = useState(saveit)
  const [resowner, apiMethodowner] = usePost();
  const ownerRef = useRef(null);
  const inputElement = useRef();
  const [searchval, setSearchval] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const isComponentMounted = useRef(true);
  const [loading2, setLoading2] = useState(true);
  const [datas, setDatas] = useState("");
  const [show, setShow] = useState(false);
  let all_piplines_query = localStorage.getItem("all_piplines_query");
  let len = localStorage.getItem("piplineslength");
  let len2 = [];
  const [resget, apiMethodGet] = usePost();
  const [resgetS, apiMethodGetS] = usePost();
  const [resSaveDelete, apiMethodSaveDelete] = usePost();
  const [daveData, setdaveData] = useState("")
  const { data: SearchData,  loading, error} = useFetch("", "getOpportunitySearchColumns");
  const { data: SaveData,loading3,  error3} = useFetch("", "getOpportunitySaveSearch");
  const { data: registerdata, loading4,  error4,} = useFetch("", "getUserRoles");
  useEffect(() => {
if(SaveData) {
  setdaveData(SaveData)
}
  }, [SaveData])
  
  const [resSearch, apiMethodSearch] = usePost();
  const [currentItem, setCurrentItem] = useState("Grid");
  const [arrays, setArrays] = useState(["birdfsthday", ""]);

  let mm = [];
  if(len) {
    len2.length = parseInt(len)
    for (let index = 0; index < len2.length; index++) {
      mm.push({
        id: `${index + 1}`,
  firstValue: localStorage.getItem(`first-filter-opportunitiespip[${index}]`),
  SecondValue: localStorage.getItem(`second-filter-opportunitiespip[${index}]`),
  SearchInput: localStorage.getItem(`filter-text-opportunitiespip[${index}]`),
  select: localStorage.getItem(`operation-opportunitiespip[${index}]`),
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
          },
        ]
  );
  useEffect(() => {
    addHeading(`Opportunities`);
    if (isComponentMounted.current) {
      let formdata = new FormData();
        let seaas;
      if(saveit) {
        let sav = saveit.split("___");
        seaas = sav[1];
      }
      if (all_piplines_query) {
        formdata.append("all_opportunities_query", all_piplines_query.trim());
      }
      else if(seaas) {
        formdata.append("all_opportunities_query", seaas);
      }
      let bodyContent = formdata;
      apiMethodGet("postAllViewOpportunity", bodyContent);
    } else {
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (resget.data) {
      setDatas(resget.data);
    }
    setLoading2(false);
  }, [resget.data]);

  const [resdelete, apiMethoddelete] = usePost();
  const hanldeDelete = (item) => {
    let valdelate = new FormData();
    valdelate.append("id", item.id);
  
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
    buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete("deleteContacts",valdelate)
        setDatas(datas.filter((ite) => ite.id !== item.id));
      }
    });

  }
  useEffect(() => {
    if (resdelete.data && !resdelete.isLoading) {
      resdelete.data.message && toast.success(resdelete.data.message);
    }
  }, [resdelete.data]);
  const practiceProfileRender = {
    ["Grid"]: <AllPiplineGridView data={datas} deletee={(item) =>hanldeDelete(item)} loadingss={resget.isLoading} />,
    ["List"]: <AllPiplineListView data={datas} deletee={(item) =>hanldeDelete(item)} loadingss={resget.isLoading} />,
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
  ];
  const handleChange = (value, element, index) => {
    const updatedObject = { ...NotificationArr[index], firstValue: value };
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
    let prevdate = value[0].$D;
    let prevmonth = value[0].$M + 1;
    let prevyear = value[0].$y;
    let newdate = value[1].$D;
    let newmonth = value[1].$M + 1;
    let newyeat = value[1].$y;
    const updatedObject = {
      ...NotificationArr[index],
      SearchInput: `${prevdate}/${prevmonth}/${prevyear} - ${newdate}/${newmonth}/${newyeat}`,
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
  const handleIncrement = () => {
    setNotificationArr([
      ...NotificationArr,
      {
        id: NotificationArr.length + 1,
        firstValue: null,
        SecondValue: null,
        SearchInput: "",
        select: "AND",
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
        formdata.append(`first-filter-opportunities[${[index]}]`, item.firstValue);
        formdata.append(`second-filter-opportunities[${[index]}]`, item.SecondValue);
        formdata.append(`filter-text-opportunities[${[index]}]`, item.SearchInput);
        formdata.append( `operation-opportunities[]`,  `${item.select.toLowerCase() == "or" ? "OR" : "AND"}`
        );
        localStorage.setItem(`first-filter-opportunitiespip[${[index]}]`, item.firstValue);
        localStorage.setItem(
          `second-filter-opportunitiespip[${[index]}]`,
          item.SecondValue
        );
        localStorage.setItem(`filter-text-opportunitiespip[${[index]}]`, item.SearchInput);
        localStorage.setItem(
          `operation-opportunitiespip[${index}]`,
          `${item.select.toLowerCase() == "and" ? "AND" : "OR"}`
        );
      });
      localStorage.setItem(`piplineslength`, NotificationArr.length);
      let bodyContent = formdata;
      apiMethodSearch("postOpportunitysSearch", bodyContent);
    }
  };
  useEffect(() => {
    
    if(resSearch.data) {
      localStorage.setItem(`all_piplines_query`, resSearch.data.all_opportunities_query);
      let formdata = new FormData();
      formdata.append("all_opportunities_query", resSearch.data.all_opportunities_query);
      apiMethodGet("postAllViewOpportunity", formdata);
    }
  }, [resSearch])
  
  const handleRemoveSearch = () => {
    let formdata = new FormData();
    localStorage.removeItem("all_piplines_query");
    let le = localStorage.getItem("piplineslength");
    localStorage.removeItem("piplineslength");
    let len3 = [];
    len3.length = parseInt(le)
    for (let index = 0; index < len3.length; index++) {
      localStorage.removeItem(`first-filter-opportunitiespip[${[index]}]`);
      localStorage.removeItem(`second-filter-opportunitiespip[${[index]}]`);
      localStorage.removeItem(`filter-text-opportunitiespip[${[index]}]`);
      localStorage.removeItem(`operation-opportunitiespip[${[index]}]`);
}

    apiMethodGet("postAllViewOpportunity", formdata);
    setNotificationArr(NotificationArr.slice(0, 1));
  };


  const handleDelete = (element, index) => {
    setNotificationArr(NotificationArr.filter((item) => item.id != element.id));
  };
  const handleSave = () => {
    if(!savestate) {
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
    formdata.append("all_opportunities_query", vv[1]);
    let bodyContent = formdata;
    apiMethodGet("postAllViewOpportunity", bodyContent);
    localStorage.setItem(`opportunitiespipsaveitem`,values);
    setSaveValue2(true)
    setSaveValue(values)
    setSaveValue3(vv[0])
  };
  const handleSaveDelete = () => {
    let formdata = new FormData();
    formdata.append("delete-old-search", "true");
    formdata.append("old-search-id", saveValue3);
    apiMethodSaveDelete("deleteOpportunitySaveSearch",formdata)
  }
  const handleSaveDelete2 = () => {
    let formdata = new FormData();
    formdata.append("all_opportunities_query", "");
    let bodyContent = formdata;
    apiMethodGet("postAllViewOpportunity", bodyContent);
    localStorage.removeItem(`opportunitiespipsaveitem`)
    setSaveValue()
  }
  useEffect(() => {
  if(resSaveDelete.data) {
    setdaveData(daveData.filter(item => item.search_id  !== saveValue3))
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
  const handleClick = () => {
    let ch = $(".ssch:checked");
    for (let index = 0; index < ch.length; index++) {
     map.push($(ch[index]).attr("value"));
    }
  };
  const handleSubmit2 = () => {
    let formdata = new FormData();
    if(se == "private") {
      formdata.append(`save-filter-records_opportunities`, "private:");
    }
    else if (se == "global") {
      formdata.append(`save-filter-records_opportunities`, "global:");
    }
    else if (se == "specific") {
      formdata.append(`save-filter-records_opportunities`, `${se}:${map.join(",")}`);
    }
    else if (se == "role") {
      formdata.append(`save-filter-records_opportunities`, `${se}:${rolesss}`);
    }
    formdata.append(`search_name_field_opportunities`, `${savestate}`);
    formdata.append(`all_opportunities_query`, `${localStorage.getItem("all_piplines_query").trim()}`);
    apiMethodGetS("postOpportunitysFilterSaved", formdata);
   
  };
  useEffect(() => {
    if (resgetS.data && !resgetS.isLoading) {
      axios.get(`${config.apiEndPoint}getOpportunitySaveSearch`)
      .then((response)=>{
        setdaveData(response.data)
        setShow(false)
      })
      .catch((err)=>{
        console.log('eerr',err)
      })
      resgetS.data.message && toast.success(resgetS.data.message);
    }
  }, [resgetS.data])


  if (loading || loading2 || loading3 || loading4) return <Loader />;
  const lista = SearchData.fetchColumns;
  const list = lista.filter(
    (item) => !SearchData.global_columns.includes(item.Field)
  );
  const redata = registerdata;


  return (
    <div className="AllLeads mt-3">
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
                    to={`/${config.ddemoss}createopportunity`}
                  >
                    <i className="fa fa-plus"></i>
                    {Translation(translation, "Add New")}
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
                {saveValue &&  <div className="d-flex gap-2">
                  {saveValue2 &&   <button onClick={() => handleSaveDelete()} className="btn btn-outline-danger" name="delete-old-search-lead">Delete Saved search</button>}
                
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
                      changes={(value) => handleChange(value, element, index)}
                      selected={ element.firstValue}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Dropdown3
                      changes={(value) => handleChange2(value, element, index)}
                      selected={ element.SecondValue}
                    />
                  </div>
                  <div className="col-lg-3">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={element.SearchInput}
                        onInput={(e) =>
                          handleInput(e.target.value, element, index)
                        }
                        placeholder="Text For Search..."
                      />

                    {arrays.includes(element.firstValue) && !element.firstValue == "" &&  (
                      <DatePickers
                        changes={(value) =>
                          handleChange3(value, element, index)
                        }
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
              {all_piplines_query && (
                <>
                  <input
                    type="text"
                    className="form-control"
                    name="search_name_field_lead"
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
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {Translation(translation, "Share Search to...")}
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
                                        onChange={() => handleClick(item)}
                                        type="checkbox"
                                        className="custom-control-input sr-check ssch"
                                        value={item.id}
                                        defaultChecked={index == 0 && true}
                                      />{" "}
                                      <span className="custom-control-label">
                                        {" "}
                                        {Translation(
                                          translation,
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
                   <select className="form-control"  onChange={(e) => handleRole(e.target.value)} >
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
            {Translation(translation, "Save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllPiplines;
