import React, { useEffect } from "react";
import MonthlySummaryView from "./MonthlySummaryView";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import ListView from "./ListView";
import CalendarView from "./CalendarView";
import { useState } from "react";
import NavigationPill from "../../components/form/NavigationPill";
import { Link, useParams } from "react-router-dom";
import { FaTh, FaThList, FaBookReader, FaPlus } from "react-icons/fa";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import Loader from "../../components/common/Loading";
import axios from "axios";
import config from "../../services/config.json";
import { getTokenSession } from "../../utils/common";
import { useContext } from "react";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import usePost from "../../customHooks/usePost";
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
dayjs.extend(timezone);

function ViewCalendar() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { permissions } = useContext(MainAuthPermissionsContext);
  const [calenderDetails, setCalenderDetails] = useState("");
  const [datas, setDatas] = useState("");
  const [getCalendarDataByMonth, apiMethodGetCalendarDataByMonth] = usePost();
  const [range, setRange] = useState('');
  const [rangeTime, setRangeTime] = useState('');
  const [type, setType] = useState('');
  const [deleteResponse, setDeleteResponse] = useState('')
  useEffect(() => {
    setLoading(true)
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getInstanceByCalendar/${id}`)
      .then((response) => {
        // setDatas(response?.data?.instance_list);
        setCalenderDetails(response?.data?.calendars)
        setLoading(false)
      })
      .catch((err) => {
        console.log('eerr', err)
      })
    let formData = new FormData();
    formData.append("month", dayjs().month() + 1);
    formData.append("year", dayjs().year());
    formData.append("event_calendar_id", id);
    formData.append('timezone', dayjs.tz.guess())
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData);
  }, [id, deleteResponse])

  const { addHeading } = useContext(MainHeadingContext);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  const [adddModal, setAdddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState("Calendar View");
  const [sedate, setSedate] = useState(`${year}-${month}-${day}`);
  const [editName, setEditName] = useState("")
  const [Edittype, setEdittype] = useState();
  const [editID, setEditID] = useState("")

  useEffect(() => {
    addHeading(`Calendar`);
  }, []);
  const AddModal = () => {
    // console.log(sedate)
    setAdddModal(true);
  };
  const hanldeEditModal = () => {
    setEditModal(true);
  };
  const removeModal = () => {
    setAdddModal(false);
  };
  const removeEditModal = () => {
    setEditModal(false);
  };
  const handleDates = (dateInfo) => {
    let formData = new FormData();
    formData.append("month", dayjs(dateInfo.view.currentStart).month() + 1);
    formData.append("year", dayjs(dateInfo.view.currentStart).year());
    formData.append('timezone', dayjs.tz.guess())
    formData.append("event_calendar_id", id);
    // formData.append("is_calendar", true);
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData);
    // const formattedDateString = dayjs(dateInfo.view.currentStart).format('YYYY-MM');
  };
  useEffect(() => {
    if (getCalendarDataByMonth.data) {
      if (!getCalendarDataByMonth.data.message && getCalendarDataByMonth.data.monthly) {
        // setDatas(getCalendarDataByMonth.data.monthly)
        setDatas((Object.entries(getCalendarDataByMonth.data.monthly).map(([month, events]) => {
          return events.map(event => {
            return {
              month,
              ...event
            };
          });
        }).flat()))
      }
      else {
        setDatas('')
      }
    }

  }, [getCalendarDataByMonth.data])



  if (loading) return <Loader />;
  const practiceProfileRender = {
    ["Calendar View"]: (
      <CalendarView
        data={datas}
        updated={setDatas}
        calenderDetails={calenderDetails}
        handleDatesSet={handleDates}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          hour12: false
        }}
        selectdate={setSedate}
        setType={setType}
        setRange={setRange}
        setRangeTime={setRangeTime}
        show={AddModal}
        editshow={hanldeEditModal}
        editname={setEditName}
        edittype={setEdittype}
        editID={setEditID}
        id={id}
      />
    ),
    ["List View"]: <ListView id={id} />,
    ["Monthly Summary"]: <MonthlySummaryView id={id} />,
  };
  const items = [
    {
      label: "Calendar View",
      icon: <FaTh />,
    },
    {
      label: "List View",
      icon: <FaThList />,
    },
    {
      label: "Monthly Summary",
      icon: <FaBookReader />,
    },
  ];
  const handleAddModal = () => {
    setSedate(`${year}-${++month > 9 ? ++month : `0${++month}`}-${day > 9 ? ++day : `0${++day}`}`);
    AddModal();
  };


  const handleGoogleSync = () => {
    localStorage.setItem(`GoogleSync`, calenderDetails[0].cl_db_did);
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getGoogleSync/${calenderDetails[0].cl_db_did}&calendar`)
      .then((response) => {
        window.location.href = `${response.data}`;
      })
      .catch((err) => {
        console.log('eerr', err)
      })
  }
  return (
    <>
      <div className="ViewCalendar">
        <div className="container-fluid">
          <div className="card">
            <div className="card-headers py-2 px-3">
              <div className="d-flex justify-content-between align-item-center">
                <ul className="nav nav-tabs b-none">
                  <NavigationPill
                    items={items}
                    currentItem={currentItem}
                    onCurrentItem={setCurrentItem}
                  />
                  <li className="nav-item">
                    <Link className="nav-link" onClick={() => handleAddModal()}>
                      <FaPlus /> Add Event
                    </Link>
                  </li>
                </ul>
                <div>
                  <Link onClick={handleGoogleSync} className="btn btn-primary">
                    Google Sync
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid px-0" id="gridcol">
            {getCalendarDataByMonth.isLoading &&
              <span className="span_loader">
                <i className="fa fa-pulse fa-spinner"></i>
              </span>}

            {practiceProfileRender[currentItem]}
          </div>
        </div>
        {adddModal && (
          <AddEventModal
            calenderDetails={calenderDetails}
            ids={id}
            show={adddModal}
            dateall={sedate}
            type={type}
            removeAddModal={removeModal}
          />
        )}
        {editModal && (
          <EditEventModal
            editshow={editModal}
            removeEditModal={removeEditModal}
            dateall={sedate}
            range={range}
            name={editName}
            type={Edittype}
            rangeTime={rangeTime}
            ID={editID}
            setDeleteResponse={setDeleteResponse}
          />
        )}
      </div>
    </>
  );
}

export default ViewCalendar;
