import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import usePost from '../customHooks/usePost';
import { FaUsers, FaSearch } from "react-icons/fa";
import Dropdown from '../components/form/Dropdown';
import Dropdown2 from 'react-bootstrap/Dropdown';
import swal from 'sweetalert';
import axios from 'axios';
import config from '../services/config.json'
import { useParams } from "react-router-dom";
import { handleFullScreen } from "../components/AllCustomFuntion";
import { getTokenSession } from '../utils/common';
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { set } from 'lodash';

function Attendees({ users, setAttendence, setShowState, meetingCreateiD, pipeline_id }) {
  const { id } = useParams();
  const [userList, setUserList] = useState(users)
  useEffect(() => {
    if (users) {
      setUserList(users)
    }
  }, [users])

  const { permissions } = useContext(MainAuthPermissionsContext);
  const [resSearch, apiMethodSearch] = usePost();
  const [serchData, setSearchData] = useState('')
  const [resSearch2, apiMethodSearch2] = usePost();
  const [presentAbsent, apiMethodpresentAbsent] = usePost();
  const [attendenceDelete, apiMethoddelete] = usePost();
  const [postSendInvites, apiMethodpostSendInvites] = usePost();
  const [listOpen, setListOpen] = useState(false)
  const [showtagModal, setShowtagModal] = useState("")
  const [searchval, setSearchval] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [invitesModal, setInvitesModal] = useState(false)
  const [viewSendinvites, setViewSendinvites] = useState('')
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  const handleModalInvites = () => {
    setInvitesModal(true)
  }
  const handleModalInvitesclose = () => {
    setInvitesModal(false)
  }

  useEffect(() => {
    if (presentAbsent.data) {
      setShowState(presentAbsent.data)
    }
  }, [presentAbsent.data])

  useEffect(() => {
    if (postSendInvites.data) {
      setViewSendinvites(postSendInvites?.data)
      handleModalInvites()
    }
  }, [postSendInvites.data])
  useEffect(() => {
    if (attendenceDelete.data) {
      setShowState(attendenceDelete.data)
    }
  }, [attendenceDelete.data])
  useEffect(() => {
    if (resSearch2.data) {
      if (resSearch2.data.message == "Attendee is already added in the meeting room!") {
        swal({
          text: resSearch2.data.message,
          icon: "error",
          buttons: ["Close", true],
          dangerMode: true,
        })
      } else {
        setShowState(resSearch2.data)
        swal({
          text: resSearch2.data.message,
          icon: "success",
          buttons: ["Close", true],
          dangerMode: true,
        })
        setListOpen(false)
      }
    }
  }, [resSearch2])

  const handleList = () => {
    let tagdata = new FormData();
    tagdata.append("userType", "typeSearch");
    tagdata.append("query", searchval);
    tagdata.append("getType", "typeSearch1");
    apiMethodSearch("postSpecifiesUsers", tagdata);
    axios.get(`${config.apiEndPoint}getAttendeesRole`)
      .then(response => {
        setRoles(response.data);
        setListOpen(true)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleModalShow = () => {
    setShowtagModal(true);
  }
  const handleModalClose = () => {
    setShowtagModal(false);
  }
  const hanleAdd = (item) => {
    swal({
      text: "Are you sure to add an attendee in the Meeting?",
      icon: "warning",
      buttons: ["Close", true],
      dangerMode: true,
    }).then(async (Added) => {
      let added = new FormData();
      added.append("role_id", selectedRole.value);
      added.append("user_id", item.id);
      added.append("pipeline_id", pipeline_id);
      apiMethodSearch2(`postAddAttendee/${id}`, added);
      setListOpen(false)
    });

  }
  const handleSelect = (index, value) => {
    setSelectedRole(value);
  };
  const options = roles.map(role => ({
    label: role.attendee_role,
    value: role.db_id
  }));
  const handleToggle = (e) => {
    e.preventDefault();
    let closestCard = e.target.closest(".card");
    if (closestCard.classList.contains("card-collapsed")) {
      closestCard.classList.remove("card-collapsed");
    } else {
      closestCard.classList.add("card-collapsed");
    }
  };
  const toggleStatus = (e, item, index) => {
    const updatedData = [...userList]; // Create a copy of the array

    if (updatedData.length > 0) {
      updatedData[index] = { ...updatedData[index], meeting_presence: item.meeting_presence === "0" ? "1" : "0" }; // Update the name property
      setUserList(updatedData); // Update the state with the updated array
    }
    let tagdata = new FormData();
    tagdata.append("user_attendee", item.contact_id || item.id);
    tagdata.append("meeting_id", id);
    tagdata.append("pipeline_id", pipeline_id);
    tagdata.append("presence", e.target.checked.toString());
    tagdata.append("uMeet6", "typeSrAttSetPr");
    tagdata.append("typeSrAttSetPr", 'q1typetypeSrAttSetPrMeetq2');
    apiMethodpresentAbsent("postTypeAttendeesSetPresent", tagdata);
  };
  const handleDelete = (item) => {
    swal({
      text: "Are you sure want to delete?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deletedata = new FormData();
        deletedata.append("user_id", item.contact_id || item.id);
        deletedata.append("meeting_id", id);
        deletedata.append("pipeline_id", pipeline_id);
        apiMethoddelete(`postRemoveAttendeesByuserId/${id}`, deletedata);
      }
    });
  }
  const sendInvites = () => {


    let formdata = new FormData();
    formdata.append("meeting_id", id);
    users && users.map((item, i) => {
      formdata.append(`user_id[${i}]`, item?.user_id ? item?.contact_id : item?.id)
    })
    apiMethodpostSendInvites(`postSendInvites`, formdata);


    // axios.get(`${ config.apiEndPoint }getSendInvites / ${ id }`)
    //   .then(response => {
    //     console.log(response, "send mes");
    //     setViewSendinvites(response.data)
    //     handleModalInvites()
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  }

  useEffect(() => {
    if (resSearch.data) {
      setSearchData(resSearch.data)
    }
  }, [resSearch.data])
  return (
    <div>
      <div className="card">
        <div className="card-status bg-blue"></div>
        <div className="card-header">
          <h3 className="card-title">
            <FaUsers />  Attendees (#)
            <small>Who is in the meeting</small>
          </h3>
          <div className="card-options">
            <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
              <i className="fe fe-chevron-down"></i>
            </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i className="fe fe-maximize"></i></a>
          </div>
        </div>
        <div className="card-body justify-content-center meetingmain">
          <div className="relative my-3">
            <div className="meetingBox">
              <div id="prmeet">
                <div>
                  <div>
                    {users && Array.isArray(users) && users?.map((item, index) => (
                      <span key={index} className={`avatar attendee attendee-${index} ${item.meeting_presence === '1' ? 'online' : 'offline'}`
                      }>
                        <img
                          className="avatar"
                          src={`${item.avatar ? item.avatar.includes("http") ? item.avatar : `${config.baseurl2}${item.avatar}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"}`}
                          alt=""
                          data-toggle="tooltip"
                        />
                        <span className={`avatar-status ${item.meeting_presence === '1' ? 'bg-green' : 'bg-red1'}`}></span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {meetingCreateiD == permissions?.id ? <div className="text-center d-flex gap-2 justify-content-center">
            <button type="button" onClick={() => handleModalShow()} className="btn btn-primary managebtn">
              <i className="fe fe-user mr-2"></i>Manage
            </button>
            <button onClick={sendInvites} type="button" className="btn btn-primary">
              <i className="fe fe-mail mr-2"></i>Send Invites
            </button>
          </div> : ""}
        </div>
      </div>
      {showtagModal && <Modal show={showtagModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Attendees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="searchDropDown">
            <input type="text" className="form-control" value={searchval} onChange={(e) => setSearchval(e.target.value)} />
            <button
              className="nav-link clickButton"
              type="button"
              id="dropdownMenuButton"
              onClick={() => handleList()}
            >
              <FaSearch />
            </button>

            <div className={`dropDownCustom ${listOpen && "active"}`}>
              {serchData &&
                <ul className="list">
                  {serchData ? Array.isArray(serchData) && serchData.map((item, index) => {
                    return (
                      <li className='attenMian' key={index}>
                        <div className='atten'>
                          <div className="attenimg">
                            <img className="avatar avatarpro avatar-md w-50 h-50" src={`${item.avatar ? item.avatar.includes("http") ? item.avatar : `${config.baseurl2}${item.avatar}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"} `} alt="" />
                          </div>
                          <div className='atteendetails'>
                            <strong>{item.uname}</strong>
                            <small className="d-block text-muted">{item.role_name}</small>
                          </div>
                          <div className="attenright input-group loat-right">
                            <Dropdown
                              list={options}
                              onChange={value => handleSelect(index, value)}
                            />
                          </div>
                          <div className="input-group-append">
                            <button className="btn btn-outline-secondary add_att" type="button" onClick={() => hanleAdd(item)}><span className="fe fe-plus"></span></button>
                          </div>

                        </div>
                      </li>
                    )
                  }) : <li> {resSearch.data.message}</li>}
                </ul>
              }
            </div>
          </div>

          <hr />
          <h6>Attendees</h6>
          {userList && Array.isArray(userList) && userList.map((item, index) => {
            return <div key={index} id="slatt">
              <ul className="right_chat list-unstyled p-0">
                <li className="online mb-2">
                  <div className="d-flex justify-content-between align-content-center">
                    <div className="media Attendees__left">
                      <img className="media-object " src={`${item.avatar ? item.avatar.includes("http") ? item.avatar : `${config.baseurl2}${item.avatar}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"} `} alt="" />
                      <div className="media-body">
                        <span className="name">
                          {item.username}
                          <span className="font-11 px-2 py-1 badgecus">
                            {item.att_label}
                          </span>
                        </span>
                        <span className="message">
                          {item.email}
                        </span>
                      </div>
                    </div>
                    <div className="Attendees__right">
                      <ul className="list d-flex align-item-center">
                        <li><p className="m-0">Present</p></li>
                        <li>
                          <div className="form-group m-0">
                            <label className="custom-switch">
                              <input onChange={(e) => toggleStatus(e, item, index)} checked={item.meeting_presence === "1" ? true : false} type="checkbox" className="custom-switch-input" value={"1"}
                                id={`checkbox`} />
                              <span className="custom-switch-indicator custom-switch-indicator_new"></span>
                            </label>
                          </div>
                        </li>
                        <li>
                          <Dropdown2 className="item-action dropdown ml-2">
                            <div className='none'>
                              <Dropdown2.Toggle className="">
                                <i style={{ "color": '#000' }} className="fe fe-more-vertical"></i>
                              </Dropdown2.Toggle>
                            </div>
                            <Dropdown2.Menu>
                              <button onClick={() => handleDelete(item)} className="dropdown-item myIcon">
                                <i className="dropdown-icon fa fa-trash myicon"></i> Delete
                              </button>
                            </Dropdown2.Menu>
                          </Dropdown2>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleModalClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}
      {Array.isArray(viewSendinvites.attendees_emails) && <Modal show={invitesModal} onHide={handleModalInvitesclose}>
        <Modal.Header closeButton>
          <h3>Send Invites</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              {viewSendinvites.attendees_emails && viewSendinvites?.attendees_emails.map((item, index) => {
                const messageWithBrTags = item;
                const messageWithoutBrTags = messageWithBrTags.replace(/<br>/g, '');
                return <h6 key={index} dangerouslySetInnerHTML={{ __html: messageWithoutBrTags }}></h6>
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      }
    </div>
  )
}

export default Attendees