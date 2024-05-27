import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { handleFullScreen } from '../../components/AllCustomFuntion';
import { MainAuthPermissionsContext } from '../../context/MainAuthPermissionsContext';
import dayjs from "dayjs";


function CalendarView({ data2, setType, handleDatesSet, setRangeTime, setRange, show, editshow, selectdate, data, editname, editID, calenderDetails, edittype }) {
  const { permissions } = useContext(MainAuthPermissionsContext)
  const timezone = permissions["system-user_timezone"]?.setting_value
  const datas = Array.isArray(data) ? data.map((item, index) => {
    const start = item?.start_date_time ? dayjs(`${item?.start_date} ${item?.start_date_time}`).format('YYYY-MM-DDTHH:mm:ss') : item?.start_date;
    const end = item?.end_date_time ? dayjs(`${item?.end_date} ${item?.end_date_time}`).format('YYYY-MM-DDTHH:mm:ss') : item?.end_date;
    const startTime = item.start_date_time && dayjs(`${item.start_date_time}`, 'HH:mm:ss').format('HH:mm:ss')
    const endTime = item.end_date_time && dayjs(`${item.end_date_time}`, 'HH:mm:ss').format('HH:mm:ss')
    const startDate = item.start_date_time && dayjs(`${item.start_date} ${startTime}`)
    const endDate = item.end_date_time && dayjs(`${item.end_date} ${endTime}`)
    return {
      "title": item.event_title,
      "id": `${item.event_db_id}+${index}`,
      'start': start,
      'end': end,
      // "start": item.start_date_time ? startDate.format('YYYY-MM-DD') !== endDate.format('YYYY-MM-DD') ? startDate.format('YYYY-MM-DD') : startDate.format('YYYY-MM-DDTHH:mm:ss') : (dayjs(item.start_date).format('YYYY-MM-DD')),
      // "end": item.end_date_time ? startDate.format('YYYY-MM-DD') !== endDate.format('YYYY-MM-DD') ? endDate.add(1, 'day').format('YYYY-MM-DD') : endDate.format('YYYY-MM-DDTHH:mm:ss') : dayjs(item.end_date).add(1, 'day').format('YYYY-MM-DD'),
      // "start": dayjs.tz(`${item.start_date} ${item.start_date_time}`).format('YYYY-MM-DDTHH:mm:ss'),
      // "end": dayjs.tz(`${item.end_date} ${item.end_date_time}`).format('YYYY-MM-DDTHH:mm:ss'),
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
      'event_recurrence_text': item?.event_recurrence_text,
      'event_type': item?.event_type,
    };
  }) : "";
  const events = datas;
  const handleSelect = (selectInfo) => {
    selectdate({ start: selectInfo.startStr, end: selectInfo.endStr });
    setType(selectInfo.view.type);
    show()
    console.log({ start: selectInfo.startStr, end: selectInfo.endStr })
  }
  const handleEventClick = (selectInfo) => {
    editname(selectInfo.event._def.title)
    edittype(selectInfo.event._def.extendedProps.event_type)
    let s = selectInfo?.event?.start
    let e = dayjs(selectInfo?.event?.start).format('YYYY-MM-DD') === dayjs(selectInfo?.event?.end).format('YYYY-MM-DD') ? selectInfo?.event?.end : new Date(dayjs(selectInfo?.event?.end).subtract(1, 'day'))
    setRange({
      start: s,
      end: e
    })
    setRangeTime(selectInfo.event._def?.extendedProps)
    editID(selectInfo.event._def.publicId.split("+")[0])
    editshow()

  }
  return (
    <div className="card">
      <div className="card-header bline">
        <div className="card-title">{Array.isArray(calenderDetails) && calenderDetails[0]?.calendar_name}</div>
        <div className="card-options">
          <Link onClick={(e) => handleFullScreen(e)} className="card-options-fullscreen"><i className="fe fe-maximize"></i></Link>
        </div>
      </div>
      <div className="card-body">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          // timeZone={timezone}
          headerToolbar={{
            left: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,prev,next'
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={3}
          select={handleSelect}
          eventClick={handleEventClick}
          events={events}
          datesSet={handleDatesSet}
        // nextDayThreshold='00:00:00' // Adjusted the nextDayThreshold value
        />
      </div>
    </div>
  )
}

export default CalendarView