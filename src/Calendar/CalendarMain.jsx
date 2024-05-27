import React, { useEffect, useState, useContext } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import config from "../services/config.json";
import { FaLink, FaPlus, FaRegEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loading";
import useFetch from "../customHooks/useFetch";
import usePost from "../customHooks/usePost";
import EditModal from "./EditModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { getTokenSession } from "../utils/common";
import axios from "axios";
import { Tooltip } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { handleFullScreen, handleToggle } from "../components/AllCustomFuntion";
import { MainCalendarListContext } from "../context/MainCalendarListContext";
import { MainHeadingContext } from "../context/MainHeadingContext";

function CalendarMain() {
  const { addCalendarList } = useContext(MainCalendarListContext);
  const { addHeading } = useContext(MainHeadingContext);
  useEffect(() => {
  addHeading("Calander");
  }, [])
  const [datas, setDatas] = useState("");
  const [oneData, setOneData] = useState("")
  const [editModal, setEditModal] = useState(false)
  const { data: calendarData, loading, error } = useFetch({ setDatas }, "getAllCalendars");
  const [resDelate, apiMethodDelate] = usePost();
  const handleGet = () => {
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllCalendars`)
      .then((response) => {
        setDatas(response.data)
        addCalendarList(response.data)

      })
      .catch((err) => {
        console.log('eerr', err)
      })
      setEditModal(false)
  }

  const handleEditModal = (item) => {
    setOneData(item)
    setEditModal(true)
  }
  const removeEditModal = () => {

    setEditModal(false)
  }
  const handleDelete = (item) => {
    let formdata = new FormData();
    let itemid = item.cl_db_did;

    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethodDelate(`postDeleteCalendar/${itemid}`, formdata);
        setDatas(datas.filter(item => item.cl_db_did !== itemid));


      }
    })

  }
  useEffect(() => {
    if (resDelate.data && !resDelate.isLoading) {
      resDelate.data.message && toast.success(resDelate.data.message);
      handleGet()
    }

  }, [resDelate.data]);

const handleGoogleSync = (item) => {
  localStorage.setItem(`GoogleSync`, item.cl_db_did);
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  axios.get(`${config.apiEndPoint}getGoogleSync/${item.cl_db_did}&calendar`)
    .then((response) => {
        window.location.href = `${response.data}`;
    })
    .catch((err) => {
      console.log('eerr', err)
    })
}

  if (loading) return <Loader />;
  return (
    <div className="calendarmain">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header borderblue">
                <h3 className="card-title">Calendars</h3>
                <div className="card-options">
                  <Link
                    onClick={(e) => handleToggle(e)}
                    className="card-options-collapse"
                  ><i className={`fe fe-chevron-down`} />
                  </Link>
                  <Link onClick={(e) => handleFullScreen(e)}
                    className="card-options-fullscreen">
                    <i className="fe fe-maximize"></i>
                  </Link>
                  <Link to={`/${config.ddemoss}calendar/create`}>
                    <FaPlus />
                  </Link>
                  <Link to={`/${config.ddemoss}bookable_schedule`}>
                    <AiOutlineSetting />
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table text-nowrap mb-0 cl-li">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Public</th>
                        <th>Default</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {!datas.message
                        ? datas?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <span
                                  className="avatar avatar-sm"
                                  style={{ background: `${item?.calendar_color ? item?.calendar_color : "#000"}` }}
                                ></span>
                              </td>
                              <td>
                                <span>{item?.calendar_name}</span>
                              </td>
                              <td>
                                {item?.calendar_privacy === "public" && <BiCheck />}
                              </td>
                              <td>
                                {item?.calendar_default === "1" && <BiCheck />}
                              </td>
                              <td>{item?.active_status !== "1" && <BiCheck />}  </td>
                              <td>
                                <button className="btn btn-success btn-sm" onClick={() => handleGoogleSync(item)}>
                                  Google Syns
                                </button>
                              </td>
                              <td className="text-right">
                                <OverlayTrigger
                                  placement={"top"}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Clik to copy calender URL
                                    </Tooltip>
                                  }
                                >
                                  <Link className="btn btn-sm btn-link hidden-xs js-sweetalert clurl" onClick={

                                    async function getClipboardContents() {
                                      try {
                                        toast.success("URL Copied")
                                        const text = await navigator.clipboard.writeText(`${config.baseurl2}/${config.ddemoss}appointment/${item.calendar_slug_url}`);
                                        console.log('Pasted content: ', text);
                                      } catch (err) {
                                        console.error('Failed to read clipboard contents: ', err);
                                      }
                                    }

                                  }>
                                    <FaLink />
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement={"top"}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Edit
                                    </Tooltip>
                                  }
                                >

                                  <Link className="btn btn-sm btn-link btn-ecal" onClick={() => handleEditModal(item)}>
                                    <FaRegEdit />
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement={"top"}
                                  overlay={
                                    <Tooltip id={`tooltip-top`}>
                                      Delete
                                    </Tooltip>
                                  }
                                >


                                  <Link
                                    className="btn btn-sm btn-link"
                                    title="Delete"
                                    onClick={() => handleDelete(item)}
                                  >
                                    <FaTrash />
                                  </Link>
                                </OverlayTrigger>
                              </td>
                            </tr>
                          );
                        })
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editModal && <EditModal setDatas={setDatas} setEditModal={setEditModal} submit={handleGet} data={oneData} editshow={editModal} removeEditModal={removeEditModal} />}
    </div>
  );
}

export default CalendarMain;