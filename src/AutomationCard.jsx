import { Link, } from 'react-router-dom';
import React,{useEffect} from 'react'
import config from "./services/config.json";

import swal from 'sweetalert';
import usePost from './customHooks/usePost';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';
function AutomationCard({ allautomation, setallAutomation_data }) {
    const [resDel, apiMethodDel] = usePost();
    const [resStatus, apiMethodStatus] = usePost();



useEffect(() => {
 if(resStatus.data){
setallAutomation_data(resStatus.data)
 }
}, [resStatus.data])












const handle_status_switch=(value,id)=>{
    const formdata = new FormData()
    formdata.append("submit", "updateStatusAutomation")
    formdata.append("status",value?"on":"off")
    formdata.append("auto_id",id)
    apiMethodStatus("postUpdateStatusAutomation", formdata)

}
    const handleAutomationDelete = (value) => {
        const formdata = new FormData()
        formdata.append("submit", "deleteAutomation")
        formdata.append("automation_id", value.id)
        swal({
            title: "Are you sure, you want to delete?",
            icon: "warning",
            dangerMode: true,
            buttons: ["Cancel", "OK"],
        }).then((willDelete) => {
            if (willDelete) {
                apiMethodDel("postDeleteAutomationAction", formdata)
                setallAutomation_data(
                    allautomation.filter((val) => val.id !== value.id)
                );
            }
        });
    }

    return (
        <div className="row">
            {(allautomation&&Array.isArray(allautomation)) ? allautomation.map((value, index) => {
                return <div className="col-md-4 my-2" key={index}>
                  
                    <div className="card_automation ">
                    
                        <div className="automation_card_header">
                            <h4>
                                {value?.name}
                            </h4>
                        </div>
                        <div className="editdetabtn d-flex justify-content-center gap-1 mt-3">
                            <div className="btn btn-default btn-sm">
                                <Link to={`/${config.ddemoss}editautomation/edit/${value.id}`} >
                                    <i className="fa fa-edit"></i>
                                    Edit
                                </Link>
                            </div>
                            <div className="btn btn-default btn-sm" onClick={() => { handleAutomationDelete(value) }}>
                                <Link to="#" >
                                    <i className="fa fa-trash-o"></i>
                                    Delete
                                </Link>
                            </div>
                        </div>
                        <div className="row text-center mt-4 leadbot">
                            <div className="col-6 border-right">
                                <label className="mb-0">Status</label><br />
                                <Space direction="vertical">
   
   <Switch
   className={`automation_switch ${( (value.status ==="on")&& `automation_switch1`)}`}
     checkedChildren={"ON"}
     unCheckedChildren={"OFF"}
     onChange={(val)=>{handle_status_switch(val,value.id)}}
     defaultChecked={value.status ==="on"}
   />
 </Space>
                            </div>
                            <div className="col-6 ">
                                <label className="mb-0">Created at</label>
                                <h4 className="font-16">{new Date(value.created_at).toDateString()}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            }):"No Automation Found"
            }
        </div>
    );
}

export default AutomationCard;