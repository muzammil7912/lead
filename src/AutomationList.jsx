import React from 'react'
import { Link, } from 'react-router-dom';
import swal from 'sweetalert';
import usePost from './customHooks/usePost';
import config from "./services/config.json";




export default function AutomationList({ allautomation, setallAutomation_data }) {
    const [resDel, apiMethodDel] = usePost();

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
        <>
            {(allautomation&&Array.isArray(allautomation)) 
            ? allautomation.map((value, index) => {
                return (
                    <div className='row clearfix listview' key={index}>
                        <div className="card">
                            
                            <div className='card-body text-center ribbon'>
                                <div className="card_heading">
                                    <span>
                                        {value?.name}
                                    </span>
                                </div>
                                
                                <div className="dateBox">
                                    <span>
                                        Status: Active
                                    </span>
                                </div>
                                <div className="contactBox">
                                    <span>
                                        Created at: {new Date(value.created_at).toDateString()}
                                    </span>
                                </div>
                                <div className='mb-1 socialBtn'>
                                    <span >
                                        <Link to="#" className='mx-1' onClick={() => { handleAutomationDelete(value) }} >
                                            <i className="fa fa-trash-o"></i>
                                            Delete
                                        </Link>
                                        <Link to={`/${config.ddemoss}editautomation/edit/${value.id}`} >
                                            <i className="fa fa-edit"></i>
                                            Edit
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }):"No Automation Found"
            }
        </>
    )
}
