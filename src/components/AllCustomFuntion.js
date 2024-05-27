import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React, { useContext } from "react";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import axios from "axios";
import { getTokenSession } from "../utils/common";
import config from "../services/config.json";


dayjs.extend(localizedFormat);
dayjs.extend(timezone);



const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const handleFullScreen = (e) => {
  e.preventDefault();
  let closestCard = e.target.closest(".card");
  let closestCard2 = e.target.closest(".card__");
  let closestCard3 = e.target.closest(".modal-dialog.modal-xl");
  if (closestCard) {

    if (closestCard.classList.contains("card-fullscreen")) {
      closestCard.classList.remove("card-fullscreen");
    } else {
      closestCard.classList.add("card-fullscreen");
    }
  }
  else if (closestCard3) {
    if (closestCard3.classList.contains("card-fullscreen")) {
      closestCard3.classList.remove("card-fullscreen");
    } else {
      closestCard3.classList.add("card-fullscreen");
    }
  }
  else {

    if (closestCard2.classList.contains("card-fullscreen")) {
      closestCard2.classList.remove("card-fullscreen");
    } else {
      closestCard2.classList.add("card-fullscreen");
    }
  }
};
const handleToggle = (e) => {
  e.preventDefault();
  let closestCard = e.target.closest(".card");
  if (closestCard.classList.contains("card-collapsed")) {
    closestCard.classList.remove("card-collapsed");
  } else {
    closestCard.classList.add("card-collapsed");
  }
};
const handleClick = (map) => {
  let ch = document.querySelectorAll(".ssch:checked");
  for (let index = 0; index < ch.length; index++) {
    map.push(ch[index].getAttribute("value"));
  }
};
const handleDateTime = (item) => {
  const date = new Date(item);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  if (item) {

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${amPm}`;
  }
  else {
    return ""
  }
}
const handleNormalDate = (item) => {
  const date = new Date(item);
  if (item) {

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
  else {
    return ""
  }
}
const handleSpitTitle = (item) => {
  if (item.length > 10) {
    item = `${item.slice(0, 10)}...`
  }
  return item
}
const Handle_convert_system_timezone = ({ dateAndTime }) => {
  const { permissions } = useContext(MainAuthPermissionsContext);
  // 2023-06-15 01:22:41 date should be in this format

  // console.log(permissions?.['system-user_timezone']?.setting_value)

  let finalDate = ""
  if (dayjs(dateAndTime).format("DD-MMM-YYYY hh:mm A") !== "Invalid Date") {
    if (permissions?.['system-user_timezone']?.setting_value) {
      finalDate = dayjs.tz(dateAndTime, permissions?.['system-user_timezone']?.setting_value)
        .tz().format("DD-MMM-YYYY hh:mm A")
    } else {
      finalDate = dayjs(dateAndTime, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY hh:mm A")
    }
  } else {
    finalDate = "----"
  }
  return finalDate;
}
const HandleConvertTimeOnlyDate = ({ dateAndTime }) => {
  const { permissions } = useContext(MainAuthPermissionsContext);
  // 2023-06-15 01:22:41 date should be in this format


  let finalDate = ""
  if (dayjs(dateAndTime).format("DD-MMM-YYYY hh:mm A") !== "Invalid Date") {
    if (permissions?.['system-user_timezone']?.setting_value) {
      finalDate = dayjs.tz(dateAndTime, permissions?.['system-user_timezone']?.setting_value)
        .tz().format("DD-MMM-YYYY")
    } else {
      finalDate = dayjs(dateAndTime, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY")
    }
  } else {
    finalDate = "----"
  }
  return finalDate;
}
const handle_update_statistics = (updateStatisticsData) => {
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  axios
    .get(`${config.apiEndPoint}timelineHistoryUser`)
    .then((response) => {
      updateStatisticsData(response.data)
    })
}
export { handle_update_statistics, Handle_convert_system_timezone, HandleConvertTimeOnlyDate, handleFullScreen, handleToggle, handleClick, handleDateTime, handleNormalDate, handleSpitTitle }