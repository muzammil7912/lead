import React from 'react'
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const AntdTimePicker = ({ value, onChange, disabled }) => {

    const format = 'HH:mm';

    return (
        <TimePicker
            style={{ height: 32, marginTop: 6, outerWidth: 160 }}
            value={dayjs(value, format)}
            format={format}
            allowClear={false}
            onChange={onChange}
            showNow={false}
            disabled={disabled}
        />
    )
}

export default AntdTimePicker