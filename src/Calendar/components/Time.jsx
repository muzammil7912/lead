import React from 'react'
import { TimePicker } from 'antd';
import dayjs from 'dayjs';


function Time({selected,changes}) {
  const format = 'HH:mm';

    const onChange = (value) => {
      let dat = new Date(value.$d)
      let datt = dat.getHours();
      let datm = dat.getMinutes();
      changes(`${datt > 9 ? datt : `0${datt}` }:${datm > 9 ? datm : `0${datm}`} ${datt > 11 ? "PM" : "AM"}`)
      };
  return (
    <TimePicker  value={selected && dayjs(selected , format)}  format={format} onChange={onChange}   />
  )
}

export default Time