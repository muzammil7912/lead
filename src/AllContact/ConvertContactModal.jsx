import axios from "axios";
import { Form, Formik } from "formik";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation ,useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useFetch from "../customHooks/useFetch";
import config from "../services/config.json";
import { getTokenSession } from "../utils/common";
import FormControl from "../components/form/FormControl";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { Select } from "antd";
import usePost from "../customHooks/usePost";
import swal from "sweetalert";
import { toast } from "react-toastify";

function ConvertContact_Modal() {
  const navigate = useNavigate();
  
  const location = useLocation().pathname.split("/");

  const { permissions } = useContext(MainAuthPermissionsContext);
  const [show, setShow] = useState(false);
  const [module_list, setmodule_list] = useState([{module_name:"Lead"},{module_name:"Prospect"},{module_name:"Client"}]);
  const [pipeline_list, setpipeline_list] = useState(false);
  const [stages_list, setstages_list] = useState(false);
  const [type_of_contact_list, settype_of_contact_list] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [module_value, setmodule_value] = useState("");
  const [pipeline_value, setpipeline_value] = useState("");
  const [stages_value, setstages_value] = useState("");
  const [assign_value, setAssign_value] = useState("");
  const [type_contact_value, settype_contact_value] = useState("");
  const [isPipeline, setisPipeline] = useState(false);
  const [res_search_assign, apiMethod_search_assign] = usePost();
  const [res_convert_submit, apiMethod_convert_submit] = usePost();

  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };

  useEffect(() => {
    if (show) {
      // axios
      //   .get(`${config.apiEndPoint}getCustomeFieldsViewModules`)
      //   .then((response) => {
      //     setmodule_list(response.data);
      //   });
        setAssign_value(permissions.id)
    }
  }, [show]);

useEffect(()=>{
if(res_convert_submit.data){
 console.log( res_convert_submit.data.redirect);
 toast.success(res_convert_submit?.data?.message);
 navigate(`/${config.ddemoss}${res_convert_submit.data.redirect}`);
handleClose()

};
},[res_convert_submit])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handle_module_change = (e) => {
    setmodule_value(e.target.value);
    setpipeline_value("");
    setstages_value("");
    settype_contact_value("");
    const formdata = new FormData();
    formdata.append("general", "get_module_stage_n_contact_type");
    formdata.append("mode", e.target.value);
    axios
      .post(`${config.apiEndPoint}postConvertContact`, formdata)
      .then((res) => {
        console.log("res", res);
        console.log("res", res);
        if (res.data.is_pipeline) {
          setisPipeline(true);
          setpipeline_list(res.data.pipeline);
          setstages_list(res.data.stages);
          settype_of_contact_list(res.data.contacts);
        } else {
          setisPipeline(false);
          setpipeline_list(res.data.pipeline);
          setstages_list(res.data.stages);
          settype_of_contact_list(res.data.contacts);
        }
      });
    console.log(e.target.value);
  };
  const handle_pipeline_change = (e) => {
    setpipeline_value(e.target.value);
    setstages_value("")
    const formdata = new FormData();
    formdata.append("general", "get_module_n_pipeline_stages");
    formdata.append("mode", module_value);
    formdata.append("pipe", e.target.value);
    axios
      .post(`${config.apiEndPoint}postConvertContactPipelineStages`, formdata)
      .then((res) => {
        setstages_list(res.data);
      });
  };
  const handle_search_assign = (v) => {
    const formdata = new FormData();
    formdata.append("query", v);
    formdata.append("userType", "typeSearch");
    formdata.append("uLead", location?.[location.length - 1]);
    apiMethod_search_assign("postSpecifiesUsers", formdata);
  };
  const handleSubmit = () => {

    // "postConvertContactOnModule"
    console.log(module_value,pipeline_value,stages_value,type_contact_value,assign_value);
if(isPipeline){
if(module_value&&pipeline_value&&stages_value&&assign_value){
  const formdata = new FormData();
    formdata.append("userLead", assign_value);
    formdata.append("uLead", location?.[location.length - 1]);
    formdata.append("mode", module_value);
    formdata.append("mLead", stages_value);
    formdata.append("cLead", pipeline_value);
    formdata.append("uLeadType", "assign_contact");
    formdata.append("assignType", "convert_contact");
    
  handleClose();

}else{
  swal({
        title: "Please Fill All Fields:",
        icon: "warning",
        dangerMode: true,
      });
}  
}else{
  if(module_value&&type_contact_value&&stages_value&&assign_value){
    const formdata = new FormData();
    formdata.append("userLead", assign_value);
    formdata.append("uLead", location?.[location.length - 1]);
    formdata.append("mode", module_value);
    formdata.append("mLead", stages_value);
    formdata.append("cLead", type_contact_value);
    formdata.append("uLeadType", "assign_contact");
    formdata.append("assignType", "convert_contact");
    
    apiMethod_convert_submit("postConvertContactOnModule",formdata)
    

  }else{
    swal({
          title: "Please Fill All Fields:",
          icon: "warning",
          dangerMode: true,
        });
  }  
}
  };

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-default btn-sm bsm headerbtn_ box_shadow"
        onClick={handleShow}
      >
        Convert Contact
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Convert Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div className="col-md-12">
                <FormControl
                  className="form-control my-1"
                  selectList={module_list && module_list}
                  required={true}
                  firstSelect={"--select--"}
                  label={"Module"}
                  onChange={handle_module_change}
                  value={module_value}
                  name="module"
                  control="select_custom_options"
                  custom_label_name="module_name"
                  customer_value_name="module_name"
                />
              </div>

              {isPipeline && (
                <div className="col-md-12">
                  <FormControl
                    className="form-control my-1"
                    selectList={pipeline_list && pipeline_list}
                    required={true}
                    firstSelect={"--select--"}
                    label={"Pipeline"}
                    name="pipeline"
                    onChange={handle_pipeline_change}
                    value={pipeline_value}
                    control="select_custom_options"
                    custom_label_name="pipeline_title"
                    customer_value_name="db_id"
                  />
                </div>
              )}
              <div className="col-md-12">
                <FormControl
                  className="form-control my-1"
                  selectList={stages_list && stages_list}
                  required={true}
                  firstSelect={"--select--"}
                  label={"Stages"}
                  name="type_of_contact"
                  onChange={(e) => {
                    setstages_value(e.target.value);
                  }}
                  value={stages_value}
                  control="select_custom_options"
                  custom_label_name="name"
                  customer_value_name="id"
                />
              </div>
              {!isPipeline && (
                <div className="col-md-12">
                  <FormControl
                    className="form-control my-1"
                    selectList={type_of_contact_list && type_of_contact_list}
                    required={true}
                    firstSelect={"--select--"}
                    label={"Type"}
                    name="type_of_contact"
                    onChange={(e) => {
                      settype_contact_value(e.target.value);
                    }}
                    value={type_contact_value}
                    control="select_custom_options"
                    custom_label_name="type_name"
                    customer_value_name="db_id"
                  />
                </div>
              )}

              <p className="text-center alert alert-warning">
                Currently Assigned to:
                <br />
                {permissions?.uname} ({permissions?.role_name})
              </p>
              <Select
                showSearch={true}
                filterOption={false}
                onSearch={(v) => {
                  handle_search_assign(v);
                }}
                onChange={(v1, v2) => {setAssign_value(v1)}}
                style={{ width: "100%", height: 40 }}
                placeholder={"Search..."}
              >
                {res_search_assign.data &&
                  !res_search_assign.data.message &&
                  res_search_assign.data.length &&
                  res_search_assign.data.map(({ uname, id, role_name }) => (
                    <Select.Option value={id} key={id}>
                      {uname} ({role_name})
                    </Select.Option>
                  ))}
              </Select>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Not Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConvertContact_Modal;
