import React, { useContext } from "react";
import { Link } from "react-router-dom";
import config from "../../services/config.json";
import Dropdown from 'react-bootstrap/Dropdown';
import { handleFullScreen, handleSpitTitle, handleToggle } from "../AllCustomFuntion";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";

dayjs.extend(localizedFormat);
function ActionCard({ actionData, datasAction, lists, deletes }) {
  const { permissions } = useContext(MainAuthPermissionsContext)
  return (
    <div className="col-12">
      <div className="card _projects_ box_shadow p-2">
        <table>
          <thead>
            <tr>
              <th className="height-40">Start Date & Time</th>
              <th className="height-40">Title</th>
              <th className="height-40">Pipeline</th>
              <th className="height-40">Priority</th>
              <th className="height-40">Calender Name</th>
              <th className="height-40"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(lists) ? lists.map((item, index) => {
              const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              // console.log(systemTimeZone,"fdjkfhdj",dayjs.tz(item?.start_date + "T" + item?.start_date_time).tz(systemTimeZone).format("DD-MMM-YYYY hh:mm A"))
              const formattedDateTime = item?.start_date && dayjs.tz(item?.start_date + " " + item?.start_date_time).format("DD-MMM-YYYY hh:mm A");
              return (
                <tr key={index}>
                  <td style={{ width: "125px" }}>{formattedDateTime}</td>
                  <td>{item.event_title}</td>
                  <td>{Array.isArray(item?.eventpipelines) && item?.eventpipelines[0]?.pipeline_title}</td>
                  <td>{Array.isArray(item?.priority) && item?.priority[0]?.priority_label}</td>
                  <td>{Array.isArray(item?.eventClanderData) && item?.eventClanderData[0]?.calendar_name}</td>
                  <td>
                    <img
                      className="avatar"
                      src={
                        item?.ownerData[0]?.avatar
                          ? `${config.baseurl2}${item?.ownerData[0]?.avatar}`
                          : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"
                      }
                      alt="Avatar"
                    />
                  </td>
                </tr>
              );
            }) : <tr><td></td></tr>}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ActionCard 