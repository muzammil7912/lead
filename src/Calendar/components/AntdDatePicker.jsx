import React from 'react'
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

function AntdDatePicker({ defaultVal, onChange, disabled }) {

  return (
    <Space direction="vertical" size={20}>
      <DatePicker
        style={{ width: 160, height: 32, marginTop: 6 }}
        allowClear={false} onChange={onChange}
        value={dayjs(defaultVal, dateFormat)}
        format={dateFormat}
        showToday={false}
        disabled={disabled}
      />
    </Space>
  )
}

export default AntdDatePicker;