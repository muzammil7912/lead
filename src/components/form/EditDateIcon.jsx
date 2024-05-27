import { useState, useRef } from 'react';

function EditDateIcon({onChange}) {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  function handleDateChange(event) {
    setDate(event.target.value);
    onChange(event.target.value);
  }

  function handleCalendarClick() {
    dateInputRef.current.click();
    document.getElementById("da").click()
  }

  return (
    <div>
      <input type="date" id="da" onChange={handleDateChange} clicked style={{opacity: 0.6}} ref={dateInputRef} />
      <i className="fe fe-calendar" onClick={handleCalendarClick}></i>
      <span>{date}</span>
    </div>
  );
}

export default EditDateIcon;