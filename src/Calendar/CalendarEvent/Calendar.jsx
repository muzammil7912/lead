import React, { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react';
import useFetch from '../../customHooks/useFetch';
import axios from 'axios';
import config from "../../services/config.json";
import Loader from '../../components/common/Loading';
import { getTokenSession, removeTokenSession } from '../../utils/common';
import CalendarView from '../ViewCalendar/CalendarView';
import AddEventModal from '../ViewCalendar/AddEventModal';
import EditEventModal from '../ViewCalendar/EditEventModal';
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import usePost from '../../customHooks/usePost';
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
dayjs.extend(timezone);



function Calendar({ show, dataa, editshow, selectdate, datassss }) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  const { permissions } = useContext(MainAuthPermissionsContext);
  const navigate = useNavigate();
  const [values, setValues] = useState("")
  const [datas, setDatas] = useState();
  const { data: calendarData, loading2, error2 } = useFetch({ setDatas }, "getAllCalendars");
  const [calenderDetails, setCalenderDetails] = useState(calendarData);
  const [datass, setDatass] = useState()
  const [sedate, setSedate] = useState(`${year}-${month}-${day}`);
  const [adddModal, setAdddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState("")
  const [editID, setEditID] = useState("")
  const [range, setRange] = useState('')
  const [rangeTime, setRangeTime] = useState('')
  const [type, setType] = useState('')
  const [getCalendarDataByMonth, apiMethodGetCalendarDataByMonth] = usePost();
  const [deleteResponse, setDeleteResponse] = useState('')
  useEffect(() => {
    if (calendarData) {
      setValues(calendarData?.[0]?.cl_db_did)
      handleChange(calendarData?.[0]?.cl_db_did)
    }
  }, [calendarData])

  const AddModal = () => {
    console.log(sedate)
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
  const handleChange = (e) => {
    let formData = new FormData();
    if (dateStroge) {
      formData.append("month", dayjs(dateStroge).month() + 1);
      formData.append("year", dayjs(dateStroge).year());
    }
    else {
      formData.append("month", dayjs().month() + 1);
      formData.append("year", dayjs().year());
    }
    formData.append("event_calendar_id", e);
    formData.append('timezone', dayjs.tz.guess())
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData);
    setValues(e)

    setCalenderDetails(calendarData.filter(item => item.cl_db_did === e))

  }
  const [dateStroge, setDateStroge] = useState()
  const handleDates = (dateInfo) => {
    setDateStroge(dateInfo.view.currentStart)
    let formData = new FormData();
    formData.append("month", dayjs(dateInfo.view.currentStart).month() + 1);
    formData.append("year", dayjs(dateInfo.view.currentStart).year());
    formData.append("event_calendar_id", values);
    formData.append('timezone', dayjs.tz.guess())
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData);
  }

  useEffect(() => {
    if (getCalendarDataByMonth.data) {
      if (!getCalendarDataByMonth.data.message && getCalendarDataByMonth.data.monthly) {
        // setDatass(getCalendarDataByMonth.data.monthly)
        setDatass((Object.entries(getCalendarDataByMonth.data.monthly).map(([month, events]) => {
          return events.map(event => {
            return {
              month,
              ...event
            };
          });
        }).flat()))

        // .sort(function(a, b) {
        //   var dateA = new Date(a.start_date);
        //   var dateB = new Date(b.start_date);
        //   return dateB - dateA

      }
      else {
        setDatass("")
      }
    }

  }, [getCalendarDataByMonth.data])

  if (loading2) return <Loader />
  return (
    <>
      <div className="card">
        {getCalendarDataByMonth.isLoading &&
          <span className="span_loader">
            <i className="fa fa-pulse fa-spinner"></i>
          </span>}
        <div className="card-header bline">
          <select value={values} onChange={(e) => handleChange(e.target.value)} id="" className='form-control'>
            {Array.isArray(calendarData) && calendarData?.map((item, index) => {
              return (
                <option value={item?.cl_db_did} key={index}>{item?.calendar_name}</option>
              )
            })
            }
          </select>
        </div>
        <div className="card-body">
          <CalendarView
            data={datass || ""}
            setType={setType}
            handleDatesSet={handleDates}
            calenderDetails={calenderDetails}
            setRange={setRange}
            setRangeTime={setRangeTime}
            selectdate={setSedate}
            show={AddModal}
            editshow={hanldeEditModal}
            editname={setEditName}
            editID={setEditID}
          />
          {/* <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleSelect}
            eventClick={handleEventClick}
            events={datass || ""}
          /> */}
        </div>
        {adddModal && (
          <AddEventModal
            calenderDetails={calenderDetails}
            ids={values}
            type={type}
            show={adddModal}
            dateall={sedate}
            removeAddModal={removeModal}
          />
        )}
        {editModal && (
          <EditEventModal
            editshow={editModal}
            rangeTime={rangeTime}
            range={range}
            removeEditModal={removeEditModal}
            dateall={sedate}
            name={editName}
            ID={editID}
            setDeleteResponse={setDeleteResponse}
          />
        )}
      </div>
    </>
  )
}

export default Calendar