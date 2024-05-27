import React, { useState, useEffect, useRef } from 'react'
import usePost from '../../customHooks/usePost';
import { Formik, Form } from 'formik'
import Checkbox2 from '../form/Checkbox2'
import SubmitButton from '../SubmitButton'
import { toast } from "react-toastify";



function EditProfileMeetingsStages({ data, useIDD, reCallAPI }) {

    let md5 = require('md5');
    const [deflData, setDeflData] = useState(data)
    const isComponentMounted = useRef(true);
    const [resGet, apiMethodGet] = usePost();
    const [res, apiMethod] = usePost();
    const [datas, setDatas] = useState();
    const [initialValues, setInitialValues] = useState({
        'active_module': deflData?.active_module,
        'mod_view': deflData?.module_view,
        'mod_create': deflData?.module_create,
        'mod_edit': deflData?.module_edit,
        'mod_delete': deflData?.module_delete,
    })


    const submitbutton = {
        "class": "btn btn-primary mt-3 ml-auto d-block",
        "text": "Store User"
    }
    function handleSubmit(values) {
        let formdatas = new FormData();

        for (let item in values) {
            formdatas.append(item, values[item]);
        }
        formdatas.append("profile_id", useIDD);
        formdatas.append("module", "meeting_stages");
        // let aaa = md5('q1typeGtProfileUpd')
        formdatas.append("modules_name", 'user_module');
        formdatas.append("typeGtProfileUpd", 'typeGtProfileUpd');
        formdatas.append("general", 'typeGtProfileUpd');
        apiMethod("postUpdateProfilePrivileges", formdatas);
    }

    useEffect(() => {
        if (res.data && !res.isLoading) {
            toast.success(res.data.message);
            reCallAPI()
        }

    }, [res.data])

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>

                <Form name="myForm">
                    <h3 className="card-title">
                        <Checkbox2 label={"Enable/Disable Module "} name="active_module" checkedd={initialValues?.active_module} />

                    </h3>
                    <input type="hidden" name="modules_name" value="user_module"></input>
                    <div className="row clearfix">
                        <div className="col-sm-6 col-md-3">
                            <Checkbox2 label="View" name="mod_view" checkedd={initialValues?.mod_view} />
                        </div>

                        <div className="col-sm-6 col-md-3">
                            <Checkbox2 label="Create" name="mod_create" checkedd={initialValues?.mod_create} />
                        </div>

                        <div className="col-sm-6 col-md-3">
                            <Checkbox2 label="Edit" name="mod_edit" checkedd={initialValues?.mod_edit} />
                        </div>

                        <div className="col-sm-6 col-md-3">
                            <Checkbox2 label="Delete" name="mod_delete" checkedd={initialValues?.mod_delete} />
                        </div>
                    </div>
                    <hr />
                    <SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
                </Form>
            </Formik>
        </>
    )
}


export default EditProfileMeetingsStages