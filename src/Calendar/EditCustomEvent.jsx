import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../dist/css/style.css";
import $ from "jquery";
import dayjs from "dayjs";
import { DatePicker } from 'antd';
import { RRule, rrulestr } from 'rrule'


const CreateCustomEvent = (props) => {

  const { dateData } = props
  const [weekValuesArr, setWeekValuesArr] = useState('')
  const [endsItemValue, setEndsItemValue] = useState({ date: true, Occurrence: true })
  const [endsValue, setEndsValue] = useState({ never: true, on: false, after: false })
  const [periodItem, setPeriodItem] = useState({ week: false, month: false })
  const [prevValues, setPrevValues] = useState({ label: '', value: '', hidden: '' })
  const [showModal, setShowModal] = useState(false);
  const [label, setLabel] = useState("");
  const [monthValue, setMonthValue] = useState(1);
  const [s, setS] = useState(false);
  const [repeatValue, setRepeatValue] = useState(1);
  const [periodValue, setPeriodValue] = useState(3);
  const [dateValue, setDateValue] = useState('');
  const [occValue, setOccValue] = useState(10);
  const [today, setToday] = useState(dayjs().day());
  const [selectedd, setselectedd] = useState("");
  const [hidden, setHidden] = useState("");
  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wesnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dd = dayjs(props.dateData);
  const show = true;
  let daycount = Math.ceil(dd.date() / 7);
  const weekArr = ["", "First", "Second", "Third", "Forth", 'last'];
  const monthDaysValue = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const [render, setRender] = useState([
    {
      label: "Daily",
      value: "daily",
      value1: "RRULE:FREQ=DAILY",
    },
    {
      label: "Do not repeat",
      value: "do_not_repeat",
      value1: "",
    },
    {
      label: `Weekly on ${daysArr[today]}`,
      value: `weekly_on`,
      value1: `RRULE:FREQ=WEEKLY;BYDAY=${monthDaysValue[today]}`,
    },
    {
      label: `Monthly on the ${weekArr[daycount]} ${daysArr[today]}`,
      value: `monthly_on`,
      value1: `RRULE:FREQ=MONTHLY;BYDAY=${daycount}${monthDaysValue[today]}`,
    },
    {
      label: `Annually on month ${monthArr[dayjs(props.dateData).month()]} ${dayjs(props.dateData).date()}`,
      value: `annually_on`,
      value1: `RRULE:FREQ=YEARLY`,
    },
    {
      label: "Every weekday (Monday to Friday)",
      value: "every_weekday",
      value1: `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR`,
    },
    {
      label: "Custom...",
      value: "custom",
      value1: `custom`,
    },
  ]);


  useEffect(() => {
    if (props.dataa) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      setDateValue(dateRegex.test(props.dataa?.custom_recurrence_ends_type_value) ? dayjs(props.dataa?.custom_recurrence_ends_type_value + "07:04:36") : dateData)
      props?.setOnDate(dateRegex.test(props.dataa?.custom_recurrence_ends_type_value) ? dayjs(props.dataa?.custom_recurrence_ends_type_value + "07:04:36") : dateData)
      setRepeatValue(props?.dataa?.custom_recurrence_repeat_interval ? Number(props?.dataa?.custom_recurrence_repeat_interval) : 1)
      props.setRepeat(props?.dataa?.custom_recurrence_repeat_interval ? Number(props?.dataa?.custom_recurrence_repeat_interval) : 1)
      setselectedd(props?.dataa?.all_day_recurrence_type)
      setLabel(props?.dataa?.event_recurrence_text)
      setHidden(props?.dataa?.custom_rrule)
      props.setChecked(props?.dataa?.custom_recurrence_ends_type)
      if (props?.dataa?.custom_recurrence_ends_type === "on") {
        setEndsValue({ never: false, on: true, after: false })
        setEndsItemValue({ date: false, Occurrence: true })
      }
      else if (props?.dataa?.custom_recurrence_ends_type === "after") {
        setEndsValue({ never: false, on: false, after: true })
        setEndsItemValue({ date: true, Occurrence: false })
        setOccValue(Number(props?.dataa?.custom_recurrence_ends_type_value))
        props.setOccurrences(Number(props?.dataa?.custom_recurrence_ends_type_value))
      }
      if (props?.dataa?.all_day_recurrence_type === "cust") {
        const rrule = rrulestr(props.dataa?.custom_rrule)
        if (props.dataa?.custom_recurrence_repeat_period === 'week') {
          setPeriodItem({ week: true, month: false })
          setPeriodValue(2)
          props.setPeriod(2)
          let currentArray = rrule.origOptions?.byweekday;
          let weekArray = [];
          for (let i = 0; i < currentArray.length; i++) {
            weekArray.push(currentArray[i].weekday);
          }
          let updateWeekDays = weekdayy.map(item => {
            if (weekArray.includes(item.value)) {
              return { ...item, selected: true }
            }
            else {
              return { ...item, selected: false };
            }
          })
          setWeekValuesArr(weekArray);
          setWeekdayy(updateWeekDays)
        }
        else if (props.dataa?.custom_recurrence_repeat_period === 'month') {
          setPeriodItem({ week: false, month: true })
          setPeriodValue(1)
          props.setPeriod(1)
          if (rrule?.origOptions?.byweekday?.[0]?.n !== undefined) {
            setMonthValue(2)
          }
        }
        else if (props.dataa?.custom_recurrence_repeat_period === 'day') {
          setPeriodItem({ week: false, month: false })
          setPeriodValue(3)
          props.setPeriod(3)
        }
        else if (props.dataa?.custom_recurrence_repeat_period === 'year') {
          setPeriodItem({ week: false, month: false })
          setPeriodValue(0)
          props.setPeriod(0)
        }
        if (Number(props?.dataa?.custom_recurrence_repeat_interval) > 1) {
          setS(true);
        } else {
          setS(false);
        }
      }
    }
  }, [props.dataa])



  const handleChange = (event) => {
    let value = event.target.value;
    if (value === 'never') {
      setEndsValue({ never: true, on: false, after: false })
      setEndsItemValue({ date: true, Occurrence: true })
    } else if (value === 'on') {
      setEndsValue({ never: false, on: true, after: false })
      setEndsItemValue({ date: false, Occurrence: true })
    } else if (value === 'after') {
      setEndsValue({ never: false, on: false, after: true })
      setEndsItemValue({ date: true, Occurrence: false })
    }
    props.setChecked(value);
  };

  const handleMonth = (event) => {
    setMonthValue(Number(event.target.value));
  };


  const handleCustomValue = () => {
    const rrule = hidden.includes('+') ? hidden.split('+').join('') : hidden;
    const updateRrule = rrule.includes('BYMONTHDAY') ? rrule.split('BYMONTHDAY')[0] : rrule;
    props.setCustomEvent({
      firstValue: selectedd,
      secondValue: rrule,
      label: label,
    });
  };

  useEffect(() => handleCustomValue(), [selectedd, hidden, label]);
  const [weekdayy, setWeekdayy] = useState([
    {
      "value": 0,
      "label": "M",
      "selected": false
    },
    {
      "value": 1,
      "label": "T",
      "selected": false
    },
    {
      "value": 2,
      "label": "W",
      "selected": false
    },
    {
      "value": 3,
      "label": "T",
      "selected": false
    },
    {
      "value": 4,
      "label": "F",
      "selected": false
    },
    {
      "value": 5,
      "label": "S",
      "selected": false
    },
    {
      "value": 6,
      "label": "S",
      "selected": false
    },
  ])

  useEffect(() => {
    if (dateData && props.dataa?.all_day_recurrence_type === 'cust') {
      const today = dateData.day();
      const daycount = Math.ceil(dateData.date() / 7);
      const rrule = rrulestr(props.dataa?.custom_rrule)
      console.log(props.dataa?.custom_rrule,"muzzz")
      const rule = new RRule(rrule.origOptions)
      const index = rule.toString().lastIndexOf('T');
      console.log(rule.toString())
      const ruleString = rule.toString().includes('UNTIL') ? rule.toString().slice(0, index) : rule.toString()
      const ruleText = rule.toText()
      const customOption = {
        label: ruleText,
        // value1: ruleString,
        value1:rule.toString(),
        value: 'cust'
      }
      const renderItem = [
        {
          label: "Daily",
          value: "daily",
          value1: "RRULE:FREQ=DAILY",
        },
        {
          label: "Do not repeat",
          value: "do_not_repeat",
          value1: "",
        },
        {
          label: `Weekly on ${daysArr[today]}`,
          value: `weekly_on`,
          value1: `RRULE:FREQ=WEEKLY;BYDAY=${monthDaysValue[today]}`,
        },
        {
          label: `Monthly on the ${weekArr[daycount]} ${daysArr[today]}`,
          value: `monthly_on`,
          value1: `RRULE:FREQ=MONTHLY;BYDAY=${daycount}${monthDaysValue[today]}`,
        },
        {
          label: `Annually on month ${monthArr[dayjs(props.dateData).month()]} ${dayjs(props.dateData).date()}`,
          value: `annually_on`,
          value1: `RRULE:FREQ=YEARLY`,
        },
        {
          label: "Every weekday (Monday to Friday)",
          value: "every_weekday",
          value1: `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR`,
        },
        {
          label: "Custom...",
          value: "custom",
          value1: `custom`,
        },
      ];
      renderItem.splice(renderItem.length - 1, 0, customOption);
      setRender(renderItem)
    }
    else if (dateData) {
      const today = dateData.day();
      const daycount = Math.ceil(dateData.date() / 7);
      const renderItem = [
        {
          label: "Daily",
          value: "daily",
          value1: "RRULE:FREQ=DAILY",
        },
        {
          label: "Do not repeat",
          value: "do_not_repeat",
          value1: "",
        },
        {
          label: `Weekly on ${daysArr[today]}`,
          value: `weekly_on`,
          value1: `RRULE:FREQ=WEEKLY;BYDAY=${monthDaysValue[today]}`,
        },
        {
          label: `Monthly on the ${weekArr[daycount]} ${daysArr[today]}`,
          value: `monthly_on`,
          value1: `RRULE:FREQ=MONTHLY;BYDAY=${daycount}${monthDaysValue[today]}`,
        },
        {
          label: `Annually on month ${monthArr[dayjs(props.dateData).month()]} ${dayjs(props.dateData).date()}`,
          value: `annually_on`,
          value1: `RRULE:FREQ=YEARLY`,
        },
        {
          label: "Every weekday (Monday to Friday)",
          value: "every_weekday",
          value1: `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR`,
        },
        {
          label: "Custom...",
          value: "custom",
          value1: `custom`,
        },
      ];
      setRender(renderItem)
    }
  }, [dateData])


  const handleClick = (event) => {
    const value = Number(event.target.getAttribute("data-value"));
    const valueIndex = weekValuesArr.indexOf(value);
    if (valueIndex === -1) {
      setWeekValuesArr([...weekValuesArr, value]);
      weekdayy[value].selected = true
    }
    else {
      if (weekValuesArr.length === 1) {
        const today = dateData.add(-1, 'day').day()
        setWeekValuesArr([today])
        weekdayy[today].selected = true
        if (value !== today) {
          weekdayy[value].selected = false
        }
      }
      else {
        setWeekValuesArr(weekValuesArr.filter(item => item !== value))
        weekdayy[value].selected = false
      }
    }
  };

  const handlePeriod = (event) => {
    setPeriodValue(Number(event.target.value));
    props.setPeriod(Number(event.target.value))
    if (event.target.value === "3") {
      setPeriodItem({ week: false, month: false })
    } else if (event.target.value === "2") {
      setPeriodItem({ week: true, month: false })
      const today = dateData.add(-1, 'day').day();
      setWeekValuesArr([weekdayy[today].value])
      let updateWeek = weekdayy.map(item => {
        if (item.value === today) {
          return { ...item, selected: true }
        }
        else {
          return { ...item, selected: false }
        }
      })
      setWeekdayy(updateWeek)
    } else if (event.target.value === "1") {
      setPeriodItem({ week: false, month: true })
    } else if (event.target.value === "0") {
      setPeriodItem({ week: false, month: false })
    }
  };


  const onChange = (date) => {
    setDateValue(date);
    props?.setOnDate(date)
  };

  const handleRepeat = (event) => {
    setRepeatValue(Number(event.target.value));
    props.setRepeat(Number(event.target.value))
    if (event.target.value > 1) {
      setS(true);
    } else {
      setS(false);
    }
  };

  const handleOcc = (event) => {
    setOccValue(Number(event.target.value));
    props.setOccurrences(Number(event.target.value))
  };


  const handleValue = (value) => {
    const today = dateData.date()
    const month = dateData.month() + 1
    const ruleOption =
    {
      freq: periodValue,
      interval: repeatValue > 1 ? repeatValue : '',
    }
    if (periodValue === 2) {
      ruleOption.byweekday = weekValuesArr.sort((a, b) => a - b)
    }
    else if (periodValue === 1) {
      if (monthValue === 1) {
        ruleOption.bymonthday = today
      }
      else if (monthValue === 2) {
        const weekDay = dateData.day()
        const monthDaysValue = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
        ruleOption.byweekday = [RRule[monthDaysValue[weekDay]].nth(daycount)]
      }
    }
    else if (periodValue === 0) {
      ruleOption.bymonth = month
      ruleOption.bymonthday = today
    }
    if (endsValue.on) {

    //   var dateObj = new Date(dateValue);
    //  dateObj.setHours(11);
    //  var currentDate = new Date();
    //   dateObj.setDate(currentDate.getDate());
    //   dateObj.setMonth((currentDate.getMonth() + 1));
    //   dateObj.setFullYear(currentDate.getFullYear());
    //   var updatedDateStr = dateObj.toDateString() + " " + dateObj.toTimeString();
    //   console.log("Updated date and time: " + updatedDateStr);
      // console.log(new Date(`${dgetMonth}-${dgetDate}-${dgetYear} 11:30`),"muzzzz")
      
      
      ruleOption.until = new Date(dateValue)
    }
    else if (endsValue.after) {
      ruleOption.count = occValue
    }
    
    
    const rule = new RRule(ruleOption)
    console.log(rule,rule.toText(),"mu")
    setShowModal(false)
    let index = rule.toString().lastIndexOf('T')
    let updateRrule = rule.toString().slice(0, index)
    const customOption = {
      label: rule.toText(),
      value: 'cust',
      // value1: rule.toString().includes('UNTIL') ? updateRrule : rule.toString()
      value1:rule.toString()
    }
    let renderOption = [...render];
    if (renderOption.length < 8) {
      renderOption.splice(renderOption.length - 1, 0, customOption)
    }
    else {
      renderOption.splice(renderOption.length - 2, 1, customOption)
    }
    setRender(renderOption)
    if (value === 'custom') {
      if (weekValuesArr.length === 7) {
        setselectedd(customOption.value)
        setLabel('Weekly on all days')
        setHidden(customOption.value1)
      }
      else {
        setselectedd(customOption.value)
        setLabel(customOption.label)
        setHidden(customOption.value1)
      }

    }
    else {
      setselectedd(selectedd)
      render.map(item => {
        if (item.value === selectedd) {
          setLabel(item.label);
          setHidden(item.value1);
        }
      })
    }
  }

  useEffect(() => {
    if (props.childfunc) {
      const currentDay = dateData.day()
      const currentDayForLibrary = dateData.add(-1, 'day').day()
      const currentWeek = Math.ceil(dateData.date() / 7);
      const currentMonth = dateData.month() + 1;
      const currentMonthDay = dateData.date()
      let renderItem = [
        {
          label: "Daily",
          value: "daily",
          value1: "RRULE:FREQ=DAILY",
        },
        {
          label: "Do not repeat",
          value: "do_not_repeat",
          value1: "",
        },
        {
          label: `Weekly on ${daysArr[currentDay]}`,
          value: `weekly_on`,
          value1: `RRULE:FREQ=WEEKLY;BYDAY=${monthDaysValue[currentDay]}`,
        },
        {
          label: `Monthly on the ${weekArr[currentWeek]} ${daysArr[currentDay]}`,
          value: `monthly_on`,
          value1: `RRULE:FREQ=MONTHLY;BYDAY=${currentWeek}${monthDaysValue[currentDay]}`,
        },
        {
          label: `Annually on month ${monthArr[dayjs(props.dateData).month()]} ${dayjs(props.dateData).date()}`,
          value: `annually_on`,
          value1: `RRULE:FREQ=YEARLY`,
        },
        {
          label: "Every weekday (Monday to Friday)",
          value: "every_weekday",
          value1: `RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR`,
        },
        {
          label: "Custom...",
          value: "custom",
          value1: `custom`,
        },
      ]
      let previousRender = [...render];
      if (previousRender.length < 8) {
        setselectedd(selectedd)
        renderItem.map(item => {
          if (item.value === selectedd) {
            setLabel(item.label)
            setHidden(item.value1)
          }
        })
        setRender(renderItem)

      }
      else if (previousRender.length > 7) {
        const customOption = { label: '', value: 'cust', value1: '' }
        const rrule = rrulestr(render[6].value1)
        if (periodValue === 0) {
          const rule = new RRule({ ...rrule.origOptions, bymonth: currentMonth, bymonthday: currentMonthDay })
          customOption.label = rule.toText()
          customOption.value1 = rule.toString()
        }
        else if (periodValue === 1) {
          if (monthValue === 2) {
            const rule = new RRule({ ...rrule.origOptions, byweekday: [RRule[monthDaysValue[currentDay]].nth(currentWeek)] })
            customOption.label = rule.toText()
            customOption.value1 = rule.toString()

          }
          else if (monthValue === 1) {
            const rule = new RRule({ ...rrule.origOptions, bymonthday: currentMonthDay })
            customOption.label = rule.toText()
            customOption.value1 = rule.toString()
          }
          console.log(customOption)
        }
        else if (periodValue === 3) {
          const rule = new RRule(rrule.origOptions)
          customOption.label = rule.toText();
          customOption.value1 = rule.toString();
        }
        else if (periodValue === 2) {
          if (rrule.origOptions.byweekday.length === 1) {
            const rule = new RRule({ ...rrule.origOptions, byweekday: currentDayForLibrary })
            customOption.label = rule.toText();
            customOption.value1 = rule.toString();
          }
          else if (rrule.origOptions.byweekday.length > 1) {
            const rule = new RRule(rrule.origOptions)
            customOption.label = rule.toText();
            customOption.value1 = rule.toString();
          }
        }
        renderItem.splice(6, 0, customOption)
        setselectedd(selectedd)
        renderItem.map(item => {
          if (item.value === selectedd) {
            const index = item.value1.lastIndexOf('T');
            const rrule = item.value1.includes('UNTIL') ? item.value1.slice(0, index) : item.value1
            console.log(rrule)
            setLabel(item.label)
            setHidden(rrule)
          }
        })
        setRender(renderItem)
      }
    }
  }, [dateData])


  const handleCancel = () => {
    setShowModal(false);
    setselectedd(prevValues.value);
    setLabel(prevValues.label);
    setHidden(prevValues.hidden)
  };

  const handleModal = (event, index) => {
    const value = event.target.selectedOptions[0].getAttribute('second-value');
    setselectedd(event.target.value);
    setHidden(value)
    const selectedOption = render.find(item => item.value === event.target.value)
    setLabel(selectedOption.label)
    let prevValue =
    {
      label: label,
      value: selectedd,
      hidden: hidden
    }
    setPrevValues(prevValue)
  };


  const modal = () => {
    if (selectedd === "custom") {
      //   setPeriodValue("day");
      //   setWeek(false);
      //   setMonth(false);
      //   setValues([dd2]);
      setShowModal(true);
    }
  };
  useEffect(() => modal(), [selectedd]);


  return (
    <div>
      <select
        className="form-control custom-select"
        name="eve_all_day_repeat"
        id="eve_all_day_repeat"
        onChange={(event) => handleModal(event, event.target.selectedIndex)}
        value={selectedd}
      >
        {render.map((item, index) => {
          return (
            <option style={{ textTransform: 'capitalize' }} second-value={item.value1} value={item.value} key={index}>
              {item.label}
            </option>
          );
        })}
      </select>
      <input type="hidden" name="custom_test" id="custom_test" value={hidden} />
      {showModal && (
        <Modal show={show} backdrop="static" keyboard={false} size="sm">
          <Modal.Header>Custom recurrence</Modal.Header>
          <Modal.Body>
            <div className="form-inline">
              <label className="my-1 mr-2">Repeat every</label>
              <input
                type="number"
                name="c_interval"
                className="form-control countday col-sm-3 my-1 mr-sm-2"
                min={1}
                onChange={handleRepeat}
                value={repeatValue}
              />
              <select
                className="custom-select col-sm-3 my-1 mr-sm-2"
                name="c_period"
                id="occ_day"
                onChange={handlePeriod}
                value={periodValue}
              >
                <option value={3}>{s ? "days" : "day"}</option>
                <option value={2}>{s ? "weeks" : "week"}</option>
                <option value={1}>{s ? "months" : "month"}</option>
                <option value={0}>{s ? "years" : "year"}</option>
              </select>
            </div>
            {
              periodItem.week &&
              <div>
                <label className="my-1 mr-2">Repeat on</label>
                <div>
                  <div>
                    {
                      weekdayy.map((item, index) => {
                        return (
                          <span
                            key={index}
                            data-value={item.value}
                            onClick={(event) => {
                              handleClick(event);
                            }}
                            className={`day_con action_days ${item.selected && 'active_action_day'}`}
                          >
                            {item.label}
                          </span>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            }
            {periodItem.month && (
              <div
                className="form-group month_cons mt-2"
                style={{ display: "block" }}
              >
                <select
                  className="dropdown-toggle col-sm-8 form-control dropdown c_dropdown_ed show "
                  role="button"
                  data-toggle="dropdown"
                  onChange={handleMonth}
                  value={monthValue}
                >
                  <option className="" value={1}>
                    {`Monthly on day ${props.dateData.date()}`}
                  </option>
                  <option value={2}>
                    {`Monthly on the ${weekArr[daycount]} ${daysArr[props.dateData.day()]
                      }`}
                  </option>
                </select>
              </div>
            )}

            <div className="mt-2 mb-1">
              <label>Ends</label>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12">
                <label className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input enspop"
                    name="ends"
                    value="never"
                    onChange={event => handleChange(event)}
                    checked={endsValue.never}
                  />
                  <div className="custom-control-label">Never</div>
                </label>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-4">
                <label className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input enspop"
                    name="ends"
                    value="on"
                    onChange={(event) => handleChange(event)}
                    checked={endsValue.on}
                  />
                  <div className="custom-control-label">On</div>
                </label>
              </div>
              <div className="col-sm-6">
                <DatePicker
                  value={dateValue}
                  onChange={onChange}
                  format={'DD-MM-YYYY'}
                  allowClear={false}
                  disabled={endsItemValue.date}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input enspop"
                    name="ends"
                    value="after"
                    onChange={(event) => handleChange(event)}
                    checked={endsValue.after}
                  />
                  <div className="custom-control-label">After</div>
                </label>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control col-sm-3 emsdate"
                    name="c_times"
                    min={1}
                    value={occValue}
                    onChange={handleOcc}
                    disabled={endsItemValue.Occurrence}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text occurrencestext">
                      occurrences
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleCancel}
              type="button"
              className="btn btn-default cancelbtn_"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={() => handleValue('custom')}
              type="button"
              className="btn btn-primary neweventbutton"
              data-dismiss="modal"
            >
              Done
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CreateCustomEvent;
