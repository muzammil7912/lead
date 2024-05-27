import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';


function DateRange({ changes, selected }) {
  let dat = new Date(selected.start)
  let oday = dat.getDate();
  let omonth = dat.getMonth();
  let oyear = dat.getFullYear();
  let ndat = new Date(selected.end)
  let nday = ndat.getDate();
  let nmonth = ndat.getMonth();
  let nyear = ndat.getFullYear();
  let odate = `${oyear}/${omonth > 9 ? omonth : `0${omonth}`}/${oday > 9 ? oday : `0${oday}`}`
  let ndate = `${nyear}/${nmonth > 9 ? nmonth : `0${nmonth}`}/${nday > 9 ? nday : `0${nday}`}`
  const { RangePicker } = DatePicker;
  const onChange = (value, dateString) => {
    changes(dateString)
  };

  return (
        <Space>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={onChange}
            defaultValue={selected && [dayjs(odate, "YYYY-MM-DD"), dayjs(ndate, "YYYY-MM-DD")]}

          />
        </Space>
  )
}

export default DateRange;