import React, { useState, useEffect } from 'react'
import useFetch from '../customHooks/useFetch';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import usePost from '../customHooks/usePost';
import Loader from '../components/common/Loading';
import { message } from 'antd';
import swal from 'sweetalert';

function SearchModal(props) {
    const [res2, apiMethod2] = usePost();
    
    const [getSearchData, apiMethod] = usePost();
    const { data: getModuleData, loading, error } = useFetch('', 'getCustomeFieldsViewModules')
    const [ModuleValue, setModuleValue] = useState('')
    const [Module, setModule] = useState('');
    const [pipelineValue, setPipelineValue] = useState('');
    const [field, setField] = useState('');
    const [requiredField, setRequiredField] = useState('')

    const handleModule = (event) => {
        setModule(event.target.value);
        props.setmodule(event.target.value)
        let formData = new FormData();
        formData.append('current_valType', 'stageSelect');
        formData.append('module', event.target.value);
        formData.append('pipeline', event.target.value);
        apiMethod2('postCustomFiledsViewPiplinesStages', formData);
        setPipelineValue('')
    }

    const handlePipeline = (event) => {
        setPipelineValue(event.target.value);
        props.setpipeline(event.target.value)
    }

    useEffect(() => {
        if (getModuleData && !getModuleData.message) {
            setModuleValue(getModuleData)
        }
    }, [getModuleData])

    const handleClose = () => {
        if (field !== '' && pipelineValue !== '' && Module !== '' && requiredField !== '') {
            let formData = new FormData();
            formData.append('cf_sr', 'sr_cf_stg');
            formData.append('sr-lvl', field);
            formData.append('sr-stg', pipelineValue);
            formData.append('sr-mod', Module);
            formData.append('sr-req', requiredField);
            apiMethod('postSearchCustomFields', formData);
        }
        else{
            swal({
                title: "Please fill all fields",
                icon: "warning",
                dangerMode: true,
            })
        }
    }


    useEffect(() => {
        if (getSearchData?.data && !getSearchData?.data.message) {
            props.setpagination(false)
            props.setpagination1(true)
            props.setlimit1(getSearchData?.data[0]?.pagination?.limit)
            props.settotalleads1(getSearchData?.data[0]?.pagination?.total_record)
            props.setCustomFieldData(getSearchData?.data)
            props.ModalState(false)
        }
        else if(getSearchData?.data?.message === 'Data Not Found!'){
            swal({
                title: "No Data Found",
                icon: "warning",
                dangerMode: true,
            })
        }
    }, [getSearchData?.data])

    return (
        <>
            <Modal show={props.ModalShow} onHide={() => props.ModalState(false)}>
                <Modal.Header closeButton>
                    Search in Custom Fields...
                </Modal.Header>
                <Modal.Body>
                    <div className="stage-content">
                        <div className="my-1">
                            <label>Select Module</label>
                            <select
                                className="form-control sr-mod"
                                data-name="sr-mod"
                                onChange={(event) => handleModule(event)}
                                value={Module}
                            >
                                <option hidden>--Select--</option>
                                {ModuleValue && !ModuleValue.message && ModuleValue.map((item, index) => {
                                    return (
                                        <option value={item?.module_name} key={index}>{item?.module_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="my-1">
                            <label>Select Stage</label>
                            <select
                                className="form-control sr-stg"
                                data-name="sr-stg"
                                value={pipelineValue}
                                onChange={(event) => handlePipeline(event)}
                            >
                                <option value="">--Select--</option>
                                {res2.data && !res2.data.message && res2.data.map((item, index) => {
                                    return (
                                        <option key={index} value={item?.id}>{item?.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="my-1">
                            <label>Select Level</label>
                            <select
                                className="form-control sr-lvl"
                                data-name="sr-lvl"
                                onChange={(event) => {setField(event.target.value); props.setfield(event.target.value)}}
                                value={field}
                            >
                                <option hidden value="">--Select--</option>
                                <option value={1}>Field</option>
                                <option value={2}>Group</option>
                                <option value={3}>TAB</option>{" "}
                            </select>
                        </div>
                        <div className="my-1">
                            <label>Required</label>
                            <select
                                className="form-control sr-req"
                                data-name="sr-req"
                                onChange={(event) => {setRequiredField(event.target.value);props.setreqfield(event.target.value)}}
                                value={requiredField}
                            >
                                <option hidden value="">--Select--</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option> <option value="both">Both</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Search
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// const SearchModal1 = () => {
//     return (
//         <div className="modal-content">
//             <div className="modal-header">
//                 <h6 className="title">Search in Custom Fields...</h6>
//                 <button
//                     type="button"
//                     className="close"
//                     data-dismiss="modal"
//                     aria-label="Close"
//                 >
//                     <span aria-hidden="true">×</span>
//                 </button>
//             </div>
//             <div className="modal-body">
//                 <div className="stage-content">
//                     <div className="form-group">
//                         <label>Select Module</label>
//                         <select className="form-control sr-mod" data-name="sr-mod">
//                             <option value="">--Select--</option>
//                             <option value="Lead">Lead</option>
//                             <option value="Prospect">Prospect</option>
//                             <option value="Client">Client</option>
//                             <option value="Opportunity">Opportunity</option>
//                             <option value="Project">Project</option>
//                             <option value="Action">Action</option>
//                             <option value="Follow Up">Follow Up</option>
//                             <option value="Meeting">Meeting</option>{" "}
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Select Stage</label>
//                         <select className="form-control sr-stg" data-name="sr-stg">
//                             <option value="">--Select--</option>
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Select Level</label>
//                         <select className="form-control sr-lvl" data-name="sr-lvl">
//                             <option value="">--Select--</option>
//                             <option value={1}>Field</option>
//                             <option value={2}>Group</option>
//                             <option value={3}>TAB</option>{" "}
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Required</label>
//                         <select className="form-control sr-req" data-name="sr-req">
//                             <option value="">--Select--</option>
//                             <option value="no">No</option>
//                             <option value="yes">Yes</option> <option value="both">Both</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//             <div className="modal-footer">
//                 <button type="button" className="btn btn-primary btn-fsr">
//                     Search
//                 </button>
//             </div>
//         </div>

//     )
// }

export default SearchModal