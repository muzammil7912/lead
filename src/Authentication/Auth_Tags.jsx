import React, { useEffect, useState, useContext, useRef } from 'react'
import { Formik, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import config from "../services/config.json";
import { MainHeadingContext } from "../context/MainHeadingContext";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import { Translation } from '../components/Translation';
import usePost from '../customHooks/usePost';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { Pagination } from 'antd';


function Auth_Tags() {
  const { translations } = useContext(MainTranslationContexts)
  const { leadPermission } = useContext(MainLeadPermissionContext);
  useEffect(() => {
    if (leadPermission) {
      if ((leadPermission?.user_module?.active_module === "0" || leadPermission?.user_module?.view === "0")) {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);

  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();
  const { addHeading } = useContext(MainHeadingContext);
  const [data, setData] = useState("")
  const [inputval2, setInputval2] = useState("");
  const [resGet, apiMethodGet] = usePost();
  const [resDelete, apiMethodDelete] = usePost();
  const [paginationData, apiMethodPaginationData] = usePost()
  const isComponentMounted = useRef(true);
  const [pagination, setpagination] = useState(true)
  const [limit, setlimit] = useState('');
  const [totalleads, settotalleads] = useState('');
  const [ID, setID] = useState("")
  useEffect(() => {
    if (isComponentMounted.current) {
      addHeading(`Tags`);
      let formdata = new FormData();
      apiMethodGet("postAllViewTags", formdata)
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [])

  function submit1(page, pageSize) {

    apiMethodPaginationData('postAllViewTags', { 'page': page })

  }

  useEffect(() => {
    if (paginationData?.data) {
      setData(paginationData?.data?.Tags)
    }

  }, [paginationData?.data])

  useEffect(() => {
    if (resGet.data && !resGet.isLoading) {
      setData(resGet?.data?.Tags)
      console.log(resGet?.data?.Tags)
      settotalleads(resGet?.data?.Tags?.[0]?.pagination?.total_record)
      setlimit(resGet?.data?.Tags?.[0]?.pagination?.limit)
      setShowEdit(false)
      if(!resGet?.data?.Tags?.[0]?.pagination){
        setpagination(false)
      }
    }
    
  }, [resGet.data])

  const [res, apiMethod] = usePost();
  const initialValues = {
    "status_name": "",


  }
  const handleDelete = (e, item) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("general", "rem_usr_user_tag");
    formdata.append("mode", item.tag_id);
    apiMethodDelete("postDeletedTags", formdata)



  }
  useEffect(() => {
    if (resDelete.data && !resGet.isLoading) {
      resDelete.data.message && toast.success(resDelete.data.message);
      handleAPi()

    }
  }, [resDelete.data])
  const handleClose = () => {
    setShowEdit(false)
    setInputval2("")
    setID("")
  }
  const handleSubmit = (values, { resetForm }) => {
    let formdata = new FormData();
    if (values["status_name"] == "") {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        icon: "warning",
        dangerMode: true,
      })
    }
    else {
      for (let item in values) {
        formdata.append("mode", values[item]);
      }
      formdata.append("general", "add_usr_user_tag");
      apiMethod("postCreateTags", formdata);
      resetForm();
    }
  }

  function handleSubmit2() {
    let formdata = new FormData();
    formdata.append("general", "edt_usr_user_tag");
    formdata.append("mode", inputval2);
    formdata.append("mode2", ID);
    let bodyContent = formdata;
    apiMethod("postUpdateTags", bodyContent);
  }
  const handleAPi = () => {
    let formdata = new FormData();
    apiMethodGet("postAllViewTags", formdata)
  }
  const handleEdit = (e, item) => {
    e.preventDefault()
    if (leadPermission?.super_admin || leadPermission?.user_module?.edit === "1") {

    }
    else {
      setInputval2(item.tag_name)
      setShowEdit(true)
      setID(item.tag_id)
    }

  }
  useEffect(() => {
    if (res.data && !res.isLoading) {
      res.data.message && toast.success(res.data.message);
      handleAPi()
    }
  }, [res.data]);
  const submitbutton = {
    class: "btn btn-primary btn-block btn-tags",
    text: "Save & Add Severity",
  };
  return (
    <div className="section-body mt-3">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className={`${leadPermission?.super_admin || leadPermission?.user_module?.create === "1" ? "col-xl-8 col-lg-8" : "col-xl-12 col-lg-12"}`}>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title"> {Translation(translations, "Tags")}</h4>
              </div>
              <div className="card-body mb-0">
                <div className="chips tagschip" id="tagschip">
                  {Array.isArray(data) && data?.map((item, index) => {
                    return (
                      <div className="chip" key={index}>
                        <div className="d-flex align-item-center">
                          <Link onClick={(e) => handleEdit(e, item)} className='datatag'><span>{item.tag_name}</span></Link>
                          {
                            (leadPermission?.super_admin || leadPermission?.user_module?.delete === "1") &&
                            <Link className='datafollow' onClick={(e) => handleDelete(e, item)}><i className="fe fe-x"></i></Link>
                          }
                        </div></div>
                    )
                  })
                  }
                  {pagination && <Pagination
                    defaultCurrent={1}
                    pageSize={Number(limit)}
                    defaultPageSize={5}
                    total={totalleads}
                    onChange={submit1}
                  />}
                </div>
              </div>
            </div>
          </div>
          {leadPermission?.super_admin || leadPermission?.user_module?.create === "1" ? (
            <div className="col-4">
              <div className="card">
                <div className="card-header borderblue">
                  <h3 className="card-title"> {Translation(translations, "Add Tag")}</h3>
                </div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form name="myForm">
                    <div id="tag">
                      <div className="card-body mb-0">
                        <div className="col-md-12 mt-1">
                          <FormControl
                            label={Translation(translations, "Tag Title")}
                            className="form-control"
                            name="status_name"
                            id="status_name"
                            placeholder="Priority Label..."
                            control="input3"
                          />
                        </div>
                      </div>

                      <SubmitButton
                        props={submitbutton}
                        buttonLoading={res.isLoading}
                      />

                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Translation(translations, "Edit/Update Tags")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Correlation Title</label>
            <input type="text" value={inputval2} onChange={(e) => setInputval2(e.target.value)} className="form-control" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {Translation(translations, "Close")}
          </Button>
          <Button variant="primary" onClick={handleSubmit2}>
            {Translation(translations, " Save Changes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )

}

export default Auth_Tags