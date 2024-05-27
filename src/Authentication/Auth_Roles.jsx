
import React, { useState, useEffect, useContext } from "react";
import useFetch from "../customHooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loading";
import { Button, Popover, Space } from 'antd';
import usePost from "../customHooks/usePost";
import RoleModal from "./Roles_Modal";
import swal from "sweetalert";
import EditLoopSelect from "../components/form/EditLoopSelect";
import Modal from 'react-bootstrap/Modal';
import config from "../services/config.json"
import axios from "axios";
import { toast } from "react-toastify";
import { getTokenSession } from '../utils/common';
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from '../components/Translation';
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { Dropdown } from "react-bootstrap";
import { MainHeadingContext } from "../context/MainHeadingContext";
const TreeView = ({ data, handleDelete, handleUpdate }) => {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const [updateData, setUpdateData] = useState('');
  useEffect(() => {
    setUpdateData(data)
  }, [data])



  const renderChild = (child) => {
    if (child.childrens) {
      return <TreeView handleUpdate={handleUpdate} data={child.childrens} handleDelete={handleDelete} />;
    } else {
      return null;
    }
  };
  const content = (child) => (
    <span className="iconRight">
      {(leadPermission?.super_admin || leadPermission?.roles_module?.create === "1") ? (
        <Link>
          <RoleModal handleUpdates={handleUpdate}  value={child} />
        </Link>
      ) : null}
      {(leadPermission?.super_admin || leadPermission?.roles_module?.edit === "1") ? (
        <Link to={`EditRole/${child.id}`}><i className="fa fa-pencil"></i></Link>
      ) : null}
      {(leadPermission?.super_admin || leadPermission?.roles_module?.delete === "1") ? (
        <Link><i className="fa fa-trash" onClick={
          () => handleDelete(child)
        } ></i></Link>
      ) : null}
      <Link><i className="fa fa-close"></i></Link>
    </span>
  );

  return (
    <ul>
      {Object.values(updateData).map((child) => (
        <li key={child.id} className="parent_li"  >
          <span title="collapse" className="span_rem">
            <span className="glyphicon glyphicon-folder-open" />
            <Link className="dd" >
              <Popover placement="right" content={() => content(child)} trigger="click">
                {child.name}
              </Popover>
            </Link>
          </span>
          <ul>
            {renderChild(child)}
          </ul>
        </li>
      ))}
    </ul>
  );
};

const Auth_Roles = () => {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts)
  const { addHeading } = useContext(MainHeadingContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (leadPermission) {
        addHeading(`Roles`);
        if (leadPermission?.roles_module?.active_module === "0" || leadPermission?.roles_module?.view === "0") {
          navigate(`/${config.ddemoss}`);
        }
      }
    }, [leadPermission]);
  const [roles1, setroles1] = useState('');
  const [show, setShow] = useState(false);
  const [profiles, setProfiles] = useState("");
  const [profilesval, setProfilesval] = useState("");
  const [res, apiMethodDelete] = usePost()
  const [roleName, setRoleName] = useState('');
  const [roleid, setRoleid] = useState('');
  const [itemValue, setItemValue] = useState('');
  const [modalHeading, setModalHeading] = useState('');
  const {
    data: getroles,loading2, error2} = useFetch("", "getUserRoles");
  const { data: prof, loading, error, } = useFetch("", "getAllProfiles");

  useEffect(() => {
    setroles1(getroles)
  }, [getroles])
  const handleClose = (e) => {
    setShow(false);
  }
  const rootNode = getroles;

  const handlenode = (e, item) => {
    e.preventDefault();
    setProfilesval(item.id)
    setProfiles(prof)
    let closestDropdown = e.target.closest(".dropdown-menu");
    const elements = document.querySelectorAll(".sellist a");
    elements.forEach(element => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    setRoleName(e.target.textContent);
    setRoleid(item.id)
    closestDropdown.classList.remove("show");
  }


  const handleDeleteModal = (item) => {
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        setShow(true)
        setRoleName(rootNode['CEO']?.name)
        setRoleid(rootNode['CEO']?.id)
        setItemValue(item)
        setModalHeading(item.name)
      }
    })
  }

  const handleDelete = (item) => {
    let formData = new FormData();
    formData.append('roleRemoval', 1)
    formData.append('role', itemValue.id)
    formData.append('own', roleid)
    apiMethodDelete('postDeletedUserRole', formData)
    setShow(false)

  }

  const handleUpdate = () => {
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .get(`${config.apiEndPoint}getUserRoles`)
        .then((response) => {
          setroles1(response.data)

        })
  }

  useEffect(() => {
    if (res.data) {
      handleUpdate()
        res.data.message && toast.success(res.data.message);
    }
  }, [res.data]);




    if (!roles1 || loading) return <Loader />
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{Translation(translations, `Delete Role-${modalHeading}`)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row useredits">
              <div className="col-md-12">
                <div className="form-group row">
                  <div className="col-sm-12">
                    <Dropdown>
                      <Dropdown.Toggle className="roleCustom my-1" type="button">
                        {Translation(translations, roleName)}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <ul className="list-group">
                          <EditLoopSelect handleN={(e, item) => handlenode(e, item)} node={rootNode} />
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {Translation(translations, "Close")}
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              {Translation(translations, "Save Changes")}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="section-body rolestly mt-3">
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="text-right12">
                      {" "}
                      {leadPermission?.super_admin || leadPermission?.roles_module?.create === "1" ? (
                        <Link to={'CreateRole'} className="btn12 btn-sm btn-default">
                          <i className="fe fe-plus" /> {Translation(translations, "Create Role")}
                        </Link>
                      ) : null}
                    </div>
                    <div className="easy-tree">
                      <ul>
                        <li id={1} className="default parent_li One1">
                          <span title="collapse">
                            <span className="glyphicon glyphicon-folder-open" />
                            <a className="dd" data-id={1}>
                              {Translation(translations, "Organization")}
                            </a>{" "}
                          </span>
                          <ul>
                            {roles1 && <TreeView handleUpdate={() => handleUpdate()} data={roles1} handleDelete={handleDeleteModal} />}
                          </ul>
                        </li>
                      </ul>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
export default Auth_Roles



