import React, { useState, useEffect, useContext, useRef } from 'react'
import { MainAuthPermissionsContext } from '../context/MainAuthPermissionsContext';
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Modal from "react-bootstrap/Modal";
import { MainTranslationContexts } from '../context/MainTranslationContexts';
import { Translation } from '../components/Translation';
import { FaSearch } from "react-icons/fa";
import usePost from '../customHooks/usePost';
import config from "../services/config.json";
import { DatePicker } from 'antd';
import { toast } from "react-toastify";
import swal from 'sweetalert';
dayjs.extend(utc);
dayjs.extend(timezone);
function EditLeadAction({ ...props }) {
  const { Id, datasAction, actionData, modules, WebSocketAction ,assignId} = { ...props };
  const { permissions } = useContext(MainAuthPermissionsContext)
  // console.log(,"muzzz")
  const { translations } = useContext(MainTranslationContexts);
  const [assigntoImg, setAssigntoImg] = useState(datasAction?.assigned_to_avatar);
  const date = dayjs();
  const [dateValue, setDateValue] = useState(date);
  const [ownerhidden, setOwnerhidden] = useState("");
  const [searchval, setSearchval] = useState(datasAction?.assigned_to_name);
  const [listOpen, setListOpen] = useState(false);
  const [showEdit2, setShowEdit2] = useState(false);
  const [pipelines, setPipelines] = useState(Array.isArray(actionData?.actionPipelines) && actionData?.actionPipelines[0]?.db_id);
  const [priority, setPriority] = useState(Array.isArray(actionData?.actionPriorityData) && actionData?.actionPriorityData[0]?.priority_id);
  const [title, setTitle] = useState("");
  const inputElement = useRef();
  const ownerRef = useRef(null);
  const [resowner, apiMethodowner] = usePost();
  const [createAction, apiMethodCreateAction] = usePost('')
  const [Assgns, setAssgns] = useState({})
  const handleClick = (item) => {
    if (item?.lead_follower !== "yes") {
      setSearchval(item.uname);
      setAssgns({
        "id": item.id,
        "image": item.avatar,
      })

    }
    setListOpen(false);
  };
  const handleClose = () => {
    setShowEdit2(false)
  }
  const handleSubmitAssign = () => {
    setOwnerhidden(Assgns.id);
    setAssigntoImg(Assgns.image);
    setShowEdit2(false)
  }
  const handleList = () => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", searchval);
    formdataOwner.append("uLead", Id);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
    setListOpen(!listOpen);
  };
  const handleAssignModalOpen = () => {
    setShowEdit2(true)
  }
  const handleActionSubmit = () => {
    let formdata = new FormData();
    if (title.trim() != "") {
      formdata.append("title", title);
    } else {
      swal({
        title: "Fill required field",
        icon: "error"
      });
      return
    }
    formdata.append("event_type", "action");
    formdata.append("pipeline", pipelines);
    formdata.append("priority", priority);
    assignId&&formdata.append("assigned_to", assignId);
    formdata.append("event_members", ownerhidden);
    formdata.append("module_id", Id);
    formdata.append("color_code", actionData?.actionPipelines.filter(item => item.db_id === pipelines)[0]?.pipeline_color);
    formdata.append("module", modules);
    formdata.append("create_event", "cReaTe_mOduLe_eVENt");
    formdata.append("eve_start_date", dayjs(dateValue).tz(permissions["system-user_timezone"]?.setting_value).format('DD-MM-YYYY'));
    formdata.append("eve_start_time", dayjs(dateValue).tz(permissions["system-user_timezone"]?.setting_value).format('HH:mm:ss'));
    formdata.append("eve_end_date", dayjs(dateValue).add(1, 'hour').tz(permissions["system-user_timezone"]?.setting_value).format('DD-MM-YYYY'));
    formdata.append("eve_end_time", dayjs(dateValue).add(1, 'hour').tz(permissions["system-user_timezone"]?.setting_value).format('HH:mm:ss'));
    apiMethodCreateAction('postModuleCreateEvents', formdata)
  };
  // useEffect(() => {
  //   if (priority) {
  //     console.log(priority, "asdsadsad");
  //   }
  //   console.log(priority, "asdsadsad");
  //   console.log(pipelines, "asdsadsasssdaaaaaa");
  // }, [priority]);

  useEffect(() => {
    if (Array.isArray(actionData?.actionPipelines) && Array.isArray(actionData?.actionPriorityData)) {
      setPipelines(actionData?.actionPipelines[0]?.db_id);
      setPriority(actionData?.actionPriorityData[0]?.priority_id);
    }

  }, [actionData?.actionPipelines, actionData?.actionPriorityData]);
  useEffect(() => {
    if (createAction.data) {
      if (createAction.data.success === 0) {
        toast.success(createAction.data.message);
      }
      else {
        toast.success(createAction.data.message);
        if (modules === "meeting") {
          // WebSocketAction
          let data = {
            section: "Actions",
            user_id: "1",
            meeting_id: Id,
            data: createAction.data,
          };
          WebSocketAction(data);
        } else {
          // window.location.reload(true);
        }
      }
    }
  }, [createAction.data])


  const onOk = (value) => {
    setDateValue(value)
  };

  return (
    <>
      <div className=""
        style={{
          "display": "grid",
          gridTemplateColumns: "2fr 2fr 1fr 1fr 0.5fr 0.5fr",
          gap: "0.6rem",
        }}
      >

        <div className="">
          <div className="dropdown">
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD HH:mm"
              showTime={{ format: 'HH:mm' }}
              onOk={onOk}
              value={dateValue}
            />

          </div>
        </div>

        <div className="">
          <div className="form-group">
            <input type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              name="example-text-input"
              placeholder="What do you need to get done?"
            />
          </div>
        </div>

        <div className="">
          <div className="form-group multiselect_div">
            <select
              value={pipelines}
              onChange={(e) => setPipelines(e.target.value)}
              id="single-selection"
              name="single_selection"
              className="multiselect multiselect-custom form-control"
            >
              {
                Array.isArray(actionData?.actionPipelines) ?

                  actionData?.actionPipelines.map((item) => {
                    return (
                      <option key={item.db_id} value={item.db_id}>{item?.pipeline_title}</option>
                    )
                  })

                  :
                  <option></option>

              }
            </select>
          </div>
        </div>

        <div className="">
          <div className="form-group multiselect_div">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              id="single-selection"
              name="single_selection"
              className="multiselect multiselect-custom form-control"
            >
              {
                Array.isArray(actionData?.actionPriorityData) ?
                  actionData?.actionPriorityData.map((item) => {
                    return (
                      <option key={item.priority_id} value={item.priority_id}>{item?.priority_label}</option>
                    )
                  })
                  :
                  <option></option>

              }
            </select>
          </div>
        </div>

        <div className="">
          <img
            onClick={handleAssignModalOpen}
            className="avatar"
            src={assigntoImg ? assigntoImg.includes("http") ? assigntoImg : `${config.baseurl2}${assigntoImg}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"}
          />
        </div>

        <div className="">

          <button
            type="button"
            className="btn btn-icon btn-primary btn-success"
            onClick={() => {
              handleActionSubmit();
            }}
          >
            <i className="fe fe-plus"></i>
          </button>
        </div>
      </div>
      <div className="row clearfix">
      </div>


      <Modal show={showEdit2} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 mt-3">
            <label className="form-label">
              {Translation(translations, "Lead Assign to")}
            </label>
            <div ref={ownerRef} className="searchDropDown">
              <input
                type="text"
                className="form-control"
                ref={inputElement}
                name="contact_owner"
                value={searchval}
                onChange={(e) => setSearchval(e.target.value)}
              />
              <button
                className="nav-link clickButton"
                type="button"
                id="dropdownMenuButton"
                onClick={() => handleList()}
              >
                <FaSearch />
              </button>
            </div>
            <div className={`dropDownCustom ${listOpen && "active"}`}>
              {resowner.data && (
                <ul className="list gfdgd">
                  {resowner.isLoading ? (
                    ""
                  ) : !resowner.data.message ? (
                    resowner.data.map((item, index) => {
                      return (<li key={index} onClick={() => handleClick(item)} >  {Translation(translations, `${item.uname} (${item.role_name})`)}</li>);
                    })
                  ) : (
                    <li>
                      {Translation(
                        translations,
                        `${resowner.data.message}`
                      )}
                    </li>
                  )}
                </ul>


              )}
            </div>
          </div>

          <div className="modal-footer mt-3">
            <button type="button" onClick={handleClose} className="btn btn-default not_now">Not Now</button>
            <button type="button" onClick={handleSubmitAssign} className="btn btn-primary btn-leadassignst">Assign Action</button>
          </div>
        </Modal.Body>
      </Modal>

    </>



  )
}



export default EditLeadAction