import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Translation } from "../components/Translation";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/common/Loading";
import usePost from "../customHooks/usePost";
import config from "../services/config.json";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { getTokenSession } from "../utils/common";

const Correlations = ({ translation }) => {
  const [res, apiMethod] = usePost();
  const navigate = useNavigate();
  const { permissions } = useContext(MainAuthPermissionsContext);
  const [datas, setDatas] = useState("");
  const { data: correlationsdb, loading,  error} = useFetch({ setDatas }, "getAllCorrelations");
  const { addHeading } = useContext(MainHeadingContext);
  useEffect(() => {
    addHeading(`Correlations`);
    
  }, [])
  
  useEffect(() => {
    if(permissions?.role_id) {
      permissions?.role_id !== "1" && 
      navigate(`/${config.ddemoss}`);
    }
    
  }, [permissions])
  
  const [show, setShow] = useState(false);
  const [items, setitems] = useState("")
  const [showEdit, setShowEdit] = useState(false);
  const [inputval, setInputval] = useState("");
  const [inputval2, setInputval2] = useState("");
  const [selectval, setSelectval] = useState("1");
  const [selectval2, setSelectval2] = useState("");
const handleEdit = (item) => {
  setInputval2(item.corr_title)
  setitems(item.corr_id)
  setSelectval2(item.corr_status)
  setShowEdit(true)
}
const handleDelete = (item) => {
  let formdata = new FormData();
  formdata.append("correlation", "remove");
  formdata.append("corr_id", item.corr_id);
  let bodyContent = formdata;
  swal({
    title: "Are you sure, you want to delete?",
    icon: "warning",
    dangerMode: true,
    buttons: ["Cancel", "OK"],
  }).then((willDelete) => {
    if (willDelete) {
      apiMethod(`postDeleteCorrelations`, bodyContent);
      let fi = datas.corelations.filter((ite) => ite.corr_id != item.corr_id)
      setDatas({"corelations": fi});
    } else {
    }
  });
}
const handleAPi = () => {
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };
  axios.get(`${config.apiEndPoint}getAllCorrelations`)
  .then((response)=>{
    setDatas(response.data)
  })
  .catch((err)=>{
    console.log('eerr',err)
  })
}
function handleSubmit() {
  let formdata = new FormData();
  formdata.append("corr_title", inputval);
  formdata.append("corr_Status", selectval);
  let bodyContent = formdata;
  apiMethod("postCreateCorrelations", bodyContent);
}
function handleSubmit2() { 
  let formdata = new FormData();
  formdata.append("corr_title", inputval2);
  formdata.append("corrStatus", selectval2);
  formdata.append("corr_id", items);
  let bodyContent = formdata;
  apiMethod("postUpdateCorrelations", bodyContent);
}
useEffect(() => {
  if(res?.data) {
    handleAPi()
    setShowEdit(false)
  }
}, [res.data])


  const handleClose = () => {
    setInputval('');
    setInputval2('');
    setShow(false);
    setShowEdit(false)
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (res.data && !res.isLoading) {
      res.data.message && toast.success(res.data.message);
      setInputval('');
      setInputval2('');
      setShow(false);
      setShowEdit(false);
    }
  }, [res.data]);

  if(loading) return <Loader />
  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div className="tab-content" id="ex1-content">
            <div
              className="tab-pane fade show active"
              id="link_1"
              role="tabpanel"
              aria-labelledby="link_1"
            >
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div className="card mt-3">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover table-striped table-vcenter mb-0 text-nowrap">
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              <th>{Translation(translation, "Title")}</th>
                              <th>{Translation(translation, "Status")}</th>
                              <th>
                                Actions
                                <span className="float-right">
                                  <button
                                    onClick={handleShow}
                                    className="btn btn-primary btn-sm btn-new"
                                    title={Translation(translation, "Add New")}
                                  >
                                    <i className="fa fa-plus-circle"></i>
                                  </button>
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {datas?.corelations && datas.corelations.map((item,index) => {
                              return (
                                <tr key={index}>
                                <td>{++index}</td>
                                <td>{Translation(translation, item.corr_title)}</td>
                                <td>{Translation(translation, item.corr_status == 1 ? "active" : "inactive")}</td>
                                <td>
                                  <Link onClick={() => handleEdit(item)}
                                    className="btn btn-primary btn-sm btn-ed mx-1"
                                    title={Translation(translation, "Edit")}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                  <Link onClick={() => handleDelete(item)}
                                    className="btn btn-danger btn-sm btn-dl mx-1"
                                    title={Translation(translation, "Delete")}
                                  >
                                    <i className="fa fa-trash-o"></i>
                                  </Link>
                                </td>
                              </tr>
                              )
                            }) }
                           
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Translation(translation, "Add New Correlation")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
									<label>Correlation Title</label>
									<input type="text" value={inputval} onChange={(e) => setInputval(e.target.value)} className="form-control" />
								</div>
               <div className="form-group">
									<label>Correlation Status</label>
									<select value={selectval} onChange={(e) => setSelectval(e.target.value)} className="form-control" name="" id="">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
								</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {Translation(translation, "Close")}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {Translation(translation, " Save Changes")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Translation(translation, "Add New Correlation")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
									<label>Correlation Title</label>
									<input type="text" value={inputval2} onChange={(e) => setInputval2(e.target.value)} className="form-control" />
								</div>
               <div className="form-group">
									<label>Correlation Status</label>
									<select value={selectval2} onChange={(e) => setSelectval2(e.target.value)} className="form-control" name="" id="">
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
								</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {Translation(translation, "Close")}
          </Button>
          <Button variant="primary" onClick={handleSubmit2}>
            {Translation(translation, " Save Changes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Correlations;
