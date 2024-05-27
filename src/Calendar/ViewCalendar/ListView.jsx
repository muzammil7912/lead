import React, { useState, useEffect, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Monthss } from "../../components/Month";
import usePost from "../../customHooks/usePost";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import _ from 'lodash';
import EditEventModal from "./EditEventModal";
import { DatePicker, Space } from 'antd';
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
dayjs.extend(timezone);

export default function ListView({ id }) {
  const dateD = new Date();
  let day = dateD.getDate();
  let month = dateD.getMonth();
  let year = dateD.getFullYear();
  const [getCalendarDataByMonth, apiMethodGetCalendarDataByMonth] = usePost();
  const { permissions } = useContext(MainAuthPermissionsContext);
  const [editModal, setEditModal] = useState(false);
  const [date, setDate] = useState(dayjs().format("MMM YYYY"))
  const [sedate, setSedate] = useState(`${year}-${month}-${day}`);
  const [editName, setEditName] = useState("")
  const [editID, setEditID] = useState("")
  const [range, setRange] = useState({})
  const [rangeTime, setRangeTime] = useState({})
  const [deleteResponse, setDeleteResponse] = useState('')

  const handleDate = (e, date) => {
    console.log(date);
    setDate(dayjs(date).format("MMM YYYY"));
    let formData = new FormData();
    formData.append("month", dayjs(date).month() + 1);
    formData.append("year", dayjs(date).year());
    formData.append("event_calendar_id", id);
    formData.append('timezone', dayjs.tz.guess())
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData)
  };

  // useEffect(() => {
  //   let formData = new FormData();
  //   formData.append("month", dayjs().month() + 1);
  //   formData.append("year", dayjs().year());
  //   formData.append("event_calendar_id", id);
  //   apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData);
  // }, []);
  useEffect(() => {
    let formData = new FormData();
    formData.append("month", dayjs().month() + 1);
    formData.append("year", dayjs().year());
    formData.append("event_calendar_id", id);
    formData.append('timezone', dayjs.tz.guess())
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData);
  }, [deleteResponse]);
  const handleEventClick = (selectInfo) => {
    setEditName(selectInfo.event_title)
    setEditID(selectInfo.event_db_id)
    setRange({ start: selectInfo?.start_date, end: selectInfo?.end_date, })
    setEditModal(true);
    setRangeTime({
      start_time: selectInfo?.start_date_time,
      end_time: selectInfo?.end_date_time,
      privacy: selectInfo?.event_privacy,
      visibility: selectInfo?.event_visibility,
      notify: selectInfo?.eventNotifications,
      id2: selectInfo?.event_child_id ?? '00',
      'deleteId': selectInfo?.event_db_id,
      'all_day_recurrence_type': selectInfo?.all_day_recurrence_type,
      'calendarId': selectInfo?.event_calendar_id
    })

  }
  const removeEditModal = () => {
    setEditModal(false);
  };

  return (
    <div>
      <div className="ListView">
        <div className="dropdown">
          <div
            className="btn btn-secondary d-flex gap-1"
            style={{ width: "177px", justifyContent: "center", position: "relative", alignItems: "center" }}
          >
            <span className="calendarvaltext">{date}</span>
            <div className="datepicker-full list-date-picker">
              <DatePicker className="datepicker-input" onChange={handleDate} picker="month" />
            </div>
            {/* <b className="relative calendarvalb"> */}
            <FaChevronDown />
            {/* <input
                className="calendarval"
                onInput={(e) => handleDate(e)}
                type="month"
              /> */}
            {/* </b> */}
          </div>
        </div>
      </div>
      {
        getCalendarDataByMonth?.data?.monthly && !getCalendarDataByMonth?.data.message ? (
          Object.keys(getCalendarDataByMonth?.data?.monthly).sort((a, b) => a - b).map((item, index) => {


            return (
              <div key={index} className="listView">
                <div className="calandarlist my-2">
                  <div className="calandarlist__header card-header borderblue d-flex justify-content-between">
                    <div className="listday">{dayjs(`${item}-${date}`).format("dddd")}</div>
                    <div className="listtime"> {`${item}-${date}`}</div>
                  </div>
                  {
                    getCalendarDataByMonth?.data?.monthly[item]?.map(innerItem => {
                      return (
                        <div key={innerItem?.event_db_id} className="calandarlistBody p-3">
                          <ul className="list">
                            <li className="d-flex align-item-center my-2" onClick={() => handleEventClick(innerItem)}>
                              <span
                                className="listcolorBox"
                                style={{ background: innerItem?.color_code ?? "#000000" }}
                              >
                                {" "}
                              </span>
                              <div>
                                <b className="stime">{dayjs.tz(innerItem?.start_date_time, 'HH:mm:ss', permissions?.['system-user_timezone']?.setting_value).tz().format('HH:mm')}</b> |
                                <b> {dayjs.tz(innerItem?.end_date_time, 'HH:mm:ss', permissions?.['system-user_timezone']?.setting_value).tz().format('HH:mm')}</b>
                              </div>
                              <p className="m-0">{innerItem?.event_title}</p>
                            </li>
                          </ul>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            );
          })) : <h2>No Data</h2>}


      {editModal && (
        <EditEventModal
          editshow={editModal}
          removeEditModal={removeEditModal}
          dateall={sedate}
          range={range}
          rangeTime={rangeTime}
          name={editName}
          ID={editID}
          setDeleteResponse={setDeleteResponse}
        />
      )}
    </div>
  );
}

