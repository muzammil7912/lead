import React, { useState, useEffect, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import usePost from "../../customHooks/usePost";
import Skeleton from "react-loading-skeleton";
import MonthPickerInput from 'react-month-picker-input';
import { DatePicker, Space } from 'antd';
import 'react-month-picker-input/dist/react-month-picker-input.css';
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";
dayjs.extend(timezone);


function MonthlySummaryView({ id }) {
  const [getCalendarDataByMonth, apiMethodGetCalendarDataByMonth] = usePost();
  const [date, setDate] = useState(dayjs().format("MMM YYYY"))
  const { permissions } = useContext(MainAuthPermissionsContext);


  const handleDate = (e, date) => {
    setDate(dayjs(date).format("MMM YYYY"));
    let formData = new FormData();
    formData.append("month", dayjs(date).month() + 1);
    formData.append("year", dayjs(date).year());
    formData.append("event_calendar_id", id);
    formData.append('timezone', dayjs.tz.guess())
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData)
  };

  useEffect(() => {
    let formData = new FormData();
    formData.append("month", dayjs().month() + 1);
    formData.append("year", dayjs().year());
    formData.append("event_calendar_id", id);
    formData.append('timezone', dayjs.tz.guess())
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarList", formData);
  }, []);

  // if (getCalendarDataByMonth.data?.weeklyEventData) {
  //   Object.keys(getCalendarDataByMonth.data?.weeklyEventData).map(item => {
  //     console.log(getCalendarDataByMonth.data?.weeklyEventData[item])
  //   })
  // }

  return (
    <>
      <div className="calandarmonhly row m-0">
        <div className="calandarmonhly__left p-4 col-md-4">
          <h3 className="calandarmonhly__lefth">Weekly Events</h3>
          <br />
          <div className="wkevnts">
            <div className="calandarmonhlyList">
              <ul className="list">
                {getCalendarDataByMonth?.data?.weeklyEventData && !getCalendarDataByMonth?.data.message ? (
                  Object.keys(getCalendarDataByMonth.data.weeklyEventData)
                    .sort((a, b) => a - b)
                    .map((item, index) => {
                      return (
                        <li className="d-flex" key={index}>
                          <span className="calandarmonhlyListm">{item}</span>
                          <div className="calandarmonhlyListMain">
                            <div className="calandarmonhlyListMainBox">
                              <b className="weekly-views">
                                {Object.values(getCalendarDataByMonth?.data?.weeklyEventData[item])?.map((value, i) => {
                                  return (
                                    <>
                                      <div key={i} className="borderf">
                                        <span>{value.event_title}</span> <br />
                                        <i className="fas fa-clock"></i>
                                        <span style={{ marginLeft: 6, fontSize: 14 }}>{dayjs(value?.start_date).format('YYYY-MM-DD')}</span><br />
                                        <span style={{ marginLeft: 6, fontSize: 14 }}>{dayjs(value?.start_date_time, 'HH:mm:ss').format('HH:mm:A')}</span><br />
                                      </div>
                                      <hr />
                                    </>
                                  )
                                })}
                              </b>
                            </div>
                          </div>
                        </li>
                      );
                    })
                ) :
                  <div>
                    <h3 className="text-white text-center">
                      No upcoming event
                    </h3>
                  </div>}
              </ul>
            </div>
          </div>
        </div>
        <div className="calandarmonhly__right col-md-8 p-4">
          <div className="btn  d-flex gap-1 align-items-center custom_click_date" >
            <div className="datepicker-full">
              <DatePicker className="datepicker-input" onChange={handleDate} picker="month" />
            </div>
            <h3 className="m-0 calendarvaltext2" >{date}</h3>
            <FaChevronDown style={{ cursor: "default" }} />
          </div>
          {/* <input type="month" onInput={(e) => handleDate(e)}  /> */}
          <br />
          <br />
          <br />
          <div className="calandarmonhlyList">
            <ul className="list otherwks">
              {
                getCalendarDataByMonth?.data?.monthEventData && !getCalendarDataByMonth?.data.message ? (
                  Object.keys(getCalendarDataByMonth?.data?.monthEventData).sort((a, b) => a - b).map((item, index) => {
                    return (
                      <li className="d-flex" key={index} >
                        <span style={{ marginTop: 2 }} className="calandarmonhlyListm">{item}</span>
                        <div style={{ paddingLeft: 20 }} className="calandarmonhlyListMain">
                          {getCalendarDataByMonth?.data?.monthEventData[item]?.map((innerItem, index) => {
                            return (
                              <div style={{ marginBottom: 12 }} key={index} className="calandarlistBody">
                                <ul className="list">
                                  <li style={{ margin: 0 }} className="d-flex align-item-center">
                                    <span className="listcolorBox" style={{ marginTop: 4, backgroundColor: innerItem?.color_code }}></span>{innerItem?.event_title}
                                  </li>
                                </ul>
                                <div className="d-flex align-item-center">
                                  <div className="mtime">
                                    <i className="fas fa-clock"></i>
                                    <span style={{ marginLeft: 6, fontSize: 14 }}>{dayjs(innerItem?.start_date_time, 'HH:mm:ss').format('HH:mm:A')}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </li>
                    )
                  })) : <h2>No Data</h2>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MonthlySummaryView;
