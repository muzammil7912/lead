import React, { useState, useContext, useEffect } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import EditEventModal from '../Calendar/ViewCalendar/EditEventModal';
import { useNavigate } from 'react-router-dom';
import config from "../services/config.json";
import { MainAuthPermissionsContext } from '../context/MainAuthPermissionsContext';
import dayjs from "dayjs";
import { isArray } from 'lodash';
import usePost from '../customHooks/usePost';
function EditLeadCalender({ ...props }) {
  const slotLabelFormat = {
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: false,
    meridiem: 'short',
  };
  const { permissions } = useContext(MainAuthPermissionsContext)
  const [deleteResponse, setDeleteResponse] = useState('')
  const navigate = useNavigate();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  const [eventName, seteventName] = useState()
  // const [eventID, seteventID] = useState()
  const [editModal, setEditModal] = useState(false);
  const [sedate, setSedate] = useState(`${year}-${month}-${day}`);
  const [CALDatas, setCALDatas] = useState();
  const [range, setRange] = useState('');
  const [rangeTime, setRangeTime] = useState('');
  const [editID, setEditID] = useState("")
  const { data, idd, Forecast, view, module, dataOpportunities } = { ...props }
  const [calenderData, setCalenderData] = useState(data)
  const [getCalendarDataByMonth, apiMethodGetCalendarDataByMonth] = usePost();
  const [Edittype, setEdittype] = useState();


  const handleDatesSet = (dateInfo) => {
    let formData = new FormData();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    formData.append("month", dayjs(dateInfo.view.currentStart).month() + 1);
    formData.append("year", dayjs(dateInfo.view.currentStart).year());
    formData.append("module", module);
    formData.append("module_id", idd);
    formData.append("timezone", timeZone);
    // formData.append("is_calendar", true);  
    apiMethodGetCalendarDataByMonth("postInstanceByCalendarListOFModule", formData);
    // const formattedDateString = dayjs(dateInfo.view.currentStart).format('YYYY-MM');
  }
  useEffect(() => {
    if (getCalendarDataByMonth.data) {
      setCalenderData(getCalendarDataByMonth.data)
    }
  }, [getCalendarDataByMonth.data])

  let datas = Array.isArray(dataOpportunities) && dataOpportunities.map((item) => {
    return ({
      "title": item.opportunity_title,
      "type": "opportunity",
      "id": item.op_id,
      "start": item.forecasted_close_date,
      display: 'block',
      borderColor: item?.status_color,
      backgroundColor: item?.status_color
    })
  })

  // ............................................................/////////////////////////....................................................................
  useEffect(() => {
    if (calenderData?.monthly) {
      setCALDatas((Object.entries(calenderData?.monthly).map(([month, events]) => {
        return events.map(event => {
          return {
            month,
            ...event
          };
        });
      }).flat()))
    } else {
      setCALDatas("")
    }
  }, [data, calenderData]);
  const datas3 = Array.isArray(CALDatas) ? CALDatas.map((item, index) => {
    const startTime = item.start_date_time && dayjs(`${item.start_date_time}`, 'HH:mm:ss').format('HH:mm:ss')
    const endTime = item.end_date_time && dayjs(`${item.end_date_time}`, 'HH:mm:ss').format('HH:mm:ss')
    const startDate = item.start_date_time && dayjs(`${item.start_date} ${startTime}`)
    const endDate = item.end_date_time && dayjs(`${item.end_date} ${endTime}`)

    return {
      "title": item.event_title,
      "id": `${item.event_db_id}+${index}`,
      "start": item.start_date_time ? startDate.format('YYYY-MM-DD') !== endDate.format('YYYY-MM-DD') ? startDate.format('YYYY-MM-DD') : startDate.format('YYYY-MM-DDTHH:mm:ss') : dayjs(item.start_date).format('YYYY-MM-DD'),
      "end": item.end_date_time ? startDate.format('YYYY-MM-DD') !== endDate.format('YYYY-MM-DD') ? endDate.format('YYYY-MM-DD') : endDate.format('YYYY-MM-DDTHH:mm:ss') : dayjs(item.end_date).format('YYYY-MM-DD'),
      // "start": dayjs(`${item.start_date} ${item.start_date_time}`).format('YYYY-MM-DDTHH:mm:ss'),
      // "end": dayjs(`${item.end_date} ${item.end_date_time}`).format('YYYY-MM-DDTHH:mm:ss'),
      'start_time': item.start_date_time && item?.start_date_time,
      'end_time': item.end_date_time && item?.end_date_time,
      'privacy': item?.event_privacy,
      'visibility': item?.event_visibility,
      'notify': item?.eventNotifications,
      'display': 'block',
      'borderColor': item.color_code,
      'backgroundColor': item.color_code,
      'id2': item?.event_child_id ?? '00',
      'deleteId': item?.event_db_id,
      'all_day_recurrence_type': item?.all_day_recurrence_type,
      'calendarId': item?.event_calendar_id,
      'parent_id': item?.event_parent_id,
      'event_type': item?.event_type,
      'event_recurrence_text': item?.event_recurrence_text,
    };
  }) : "";
  // const events3 = datas3;
  let events = []
  if (datas && datas3) {
    events = [...datas, ...datas3];
  }
  else if (datas) {
    events = [...datas];
  }
  else if (datas3) {
    events = [...datas3];
  }

  // console.log(datas, "fjdghfjhf")


  // let datas2 = dataOpportunities ? Array.isArray(dataOpportunities) && dataOpportunities.map((item) => {
  //   return ({
  //     "title": item.opportunity_title,
  //     "type": "opportunity",
  //     "id": item.op_id,
  //     "start": item.forecasted_close_date,
  //     display: 'block',
  //     borderColor: item?.status_color,
  //     backgroundColor: item?.status_color
  //   })
  // })
  //   : [];
  // let events = []
  // if (datas && datas2) {
  //   events = [...datas, ...datas2];

  // }
  // else if (datas) {
  //   events = [...datas];
  // }
  // else if (datas2) {
  //   events = [...datas2];
  // }

  const handleEventClick = (selectInfo) => {
    // if (!view) {
    //   if (selectInfo, selectInfo?.event?._def?.extendedProps?.type === "opportunity") {
    //     navigate(`/${config.ddemoss}opp_pipelines/view/${selectInfo.event._def.publicId}`)

    //   }
    //   else {
    //     navigate(`/${config.ddemoss}edit/event/${selectInfo.event._def.publicId}`)

    //   }
    // }

    seteventName(selectInfo.event._def.title)
    let s = selectInfo?.event?.start
    let e = dayjs(selectInfo?.event?.start).format('YYYY-MM-DD') === dayjs(selectInfo?.event?.end).format('YYYY-MM-DD') ? selectInfo?.event?.end : new Date(dayjs(selectInfo?.event?.end).subtract(1, 'day'))
    setRange({
      start: s,
      end: e
    })
    console.log(selectInfo.event._def?.extendedProps, "fdbjfdhgjh")
    setRangeTime(selectInfo.event._def?.extendedProps)
    setEditID(selectInfo.event._def.publicId.split("+")[0])
    setEdittype(selectInfo.event._def.extendedProps.event_type)
    selectInfo.event._def.extendedProps.type === "opportunity" ? navigate(`/${config.ddemoss}opp_pipelines/view/${selectInfo.event._def.publicId}`) :
      hanldeEditModal()
  }
  const removeEditModal = () => {
    setEditModal(false);
  };
  const hanldeEditModal = () => {
    setEditModal(true);
  };

  return (
    <>
      {getCalendarDataByMonth.isLoading &&
        <span className="span_loader">
          <i className="fa fa-pulse fa-spinner"></i>
        </span>}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        // initialDate={Forecast && Forecast}
        headerToolbar={{
          left: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,prev,next'
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={3}
        // select={handleSelect}
        eventClick={handleEventClick}
        // events={events3}   //events old
        events={events}
        slotLabelFormat={slotLabelFormat}
        datesSet={handleDatesSet}
      />
      {/* <EditEventModal
        name={eventName}
        editshow={editModal}
        removeEditModal={removeEditModal}
        setDeleteResponse={setDeleteResponse}
        dateall={sedate} ID={eventID}
      /> */}
      <EditEventModal
        name={eventName}
        editshow={editModal}
        removeEditModal={removeEditModal}
        setDeleteResponse={setDeleteResponse}
        dateall={sedate}
        ID={editID}
        range={range}
        rangeTime={rangeTime}
        type={Edittype}
      />
    </>
  )
}

export default EditLeadCalender