import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import usePost from '../../customHooks/usePost';
import Checkbox2 from '../form/Checkbox2';
import ProfileCheckbox from '../form/ProfileCheckbox';
import SubmitButton from '../SubmitButton';
import SwitchButton from '../form/SwitchButton';
import { toast } from "react-toastify";
import { PrivilegesUser } from '../../Data/AllData';


function EditProfileProfile({ data, useIDD, reCallAPI }) {
    const [resSubmit, apiMethodSubmit] = usePost();
    const [deflData, setDeflData] = useState(data)
    let feild2 = {
        // 'active_module': deflData?.active_module,
        'mod_view': deflData?.module_view,
        'mod_edit': deflData?.module_edit,
    };
    
    

    const [initialValues, setInitialValues] = useState(feild2)


    



    const submitbutton = {
        "class": "btn btn-primary mt-3 ml-auto d-block",
        "text": "Save Setting"
    }
    function handleSubmit(values) {
        let formdatas = new FormData();
        for (let item in values) {
            formdatas.append(item, values[item]);
        }
        formdatas.append("profile_id", useIDD);
        formdatas.append("module", "profile_module");
        // let aaa = md5('q1typeGtProfileUpd')
        formdatas.append("modules_name", 'profile_module');
        formdatas.append("typeGtProfileUpd", 'typeGtProfileUpd');
        formdatas.append("general", 'typeGtProfileUpd');
        apiMethodSubmit("postUpdateProfilePrivileges", formdatas);

    }
    useEffect(() => {
        if (resSubmit.data && !resSubmit.isLoading) {
            toast.success(resSubmit.data.message);
            reCallAPI()
        }

    }, [resSubmit.data])

    return (
        <> {
            <Formik initialValues={initialValues} onSubmit={handleSubmit}   >
                {({ setFieldValue }) => (
                    <Form name="myForm">
                     
                         <div className="row clearfix">
                         <div className="col-sm-6 col-md-3">
                                <Checkbox2 label="View" name="mod_view" checkedd={initialValues.mod_view} />
                            </div>
                            <div className="col-sm-6 col-md-3">
                                <Checkbox2 label="Edit" name="mod_edit" checkedd={initialValues.mod_edit} />
                            </div>

                           
                        </div>
                        <hr />
                        <SubmitButton props={submitbutton} buttonLoading={resSubmit.isLoading} />
                    </Form>
                )}
            </Formik>
        }
        </>
    )
}

export default EditProfileProfile