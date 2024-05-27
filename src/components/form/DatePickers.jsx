import React from 'react'
import { DatePicker, Space } from 'antd';

function DatePickers({changes,defaultValue}) {
  const onChange = (value) => {
    changes(value)
  };
  return (
    <Space direction="vertical" size={12}>
    <DatePicker.RangePicker
     onChange={onChange}
     defaultValue={defaultValue}
      />
    
  </Space>
  )
}

export default DatePickers;