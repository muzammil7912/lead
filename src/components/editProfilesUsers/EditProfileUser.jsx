import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import usePost from '../../customHooks/usePost';
import Checkbox2 from '../form/Checkbox2';
import ProfileCheckbox from '../form/ProfileCheckbox';
import SubmitButton from '../SubmitButton';
import SwitchButton from '../form/SwitchButton';
import { toast } from "react-toastify";
import { PrivilegesUser } from '../../Data/AllData';


function EditProfileUser({ data, useIDD, reCallAPI }) {
    const [resSubmit, apiMethodSubmit] = usePost();
    const [deflData, setDeflData] = useState(data)
    let feild = deflData?.fields;
    let feild2 = {
        'active_module': deflData?.active_module,
        'mod_view': deflData?.module_view,
        'mod_create': deflData?.module_create,
        'mod_edit': deflData?.module_edit,
        'mod_delete': deflData?.module_delete,
    };
    
    
    const allfeild = { ...feild, ...feild2 }
    PrivilegesUser.map(field => {
        if (!allfeild.hasOwnProperty(field)) {
            allfeild[field] = "false";
        }
    })
    const [initialValues, setInitialValues] = useState(allfeild)


    
      

    const handlevalUpdate = (item) => {
        let itemval = item.target.getAttribute("value");
        let itemname = item.target.getAttribute("name");
        setInitialValues({ ...initialValues, [itemname]: itemval })
    }
    let obj = initialValues;
	const handleFunction = (e, setFieldValue) => {
        let targetid = e.target.getAttribute('data-id');
		let checkBox_name=["mod_view",'active_module','mod_create','mod_edit','mod_delete','usrs_system_settings']
        for (let index in initialValues) {
          if(!checkBox_name.includes(index)){  
			setFieldValue(index, targetid);
		}
        }
        for (let index in initialValues) {
            obj = { ...obj, [index]: targetid }
        }
        setInitialValues(obj)
    }

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
        formdatas.append("module", "user_module");
        // let aaa = md5('q1typeGtProfileUpd')
        formdatas.append("modules_name", 'user_module');
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
                        <h3 className="card-title">
                            <Checkbox2 label={"Enable/Disable Module "} name="active_module" checkedd={initialValues.active_module} />
                        </h3>
                        <input type="hidden" name="modules_name" value="user_module"></input>
                        <div className="row clearfix">
                            <div className="col-sm-6 col-md-3">
                                <Checkbox2 label="View" name="mod_view" checkedd={initialValues.mod_view} />
                            </div>

                            <div className="col-sm-6 col-md-3">
                                <Checkbox2 label="Create" name="mod_create" checkedd={initialValues.mod_create} />
                            </div>

                            <div className="col-sm-6 col-md-3">
                                <Checkbox2 label="Edit" name="mod_edit" checkedd={initialValues.mod_edit} />
                            </div>

                            <div className="col-sm-6 col-md-3">
                                <Checkbox2 label="Delete" name="mod_delete" checkedd={initialValues.mod_delete} />
                            </div>
                        </div>
                        <hr />
                        <div className="row mb-4 adet">
                            <div className="col-md-6"> Standard Fields </div>
                            <div className="col-md-6 text-right">
                                <i className="fa fa-circle fa-false" data-id="false" onClick={(e) => handleFunction(e, setFieldValue)}></i> Invisible &nbsp;
                                <i className="fa fa-circle fa-1" data-id="-1" onClick={(e) => handleFunction(e, setFieldValue)}></i> Read-only
                                &nbsp;
                                <i className="fa fa-circle fa-true" data-id="true" onClick={(e) => handleFunction(e, setFieldValue)}></i> Write
                            </div>
                        </div>
                        <div className="row new123">
                            <div className="col-sm-4 col-md-4">
                                <div>

                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_fname} name={"usrs_fname"} dataprop={"First Name"} />
                                </div>
                                <div className='mt-2'>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_lname} name={"usrs_lname"} dataprop={"Last name"} />
                                </div>
                                <div className='mt-2'>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_avatar} name={"usrs_avatar"} dataprop={"Avatar"} />

                                </div>
                                <div className='mt-2'>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_username} name={"usrs_username"} dataprop={"Username"} />
                                </div>
                                <div className='mt-2'>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_main_phone_number} name={"usrs_main_phone_number"} dataprop={"Main Phone Number"} />
                                </div>
                            </div>



                            <div className="col-sm-4 col-md-4">
                                <div className='d-flex gap-1 align-items-center'>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_email} name={"usrs_email"} dataprop={"Email"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_password} name={"usrs_password"} dataprop={"Password"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_cpassword} name={"usrs_cpassword"} dataprop={"Confirm Password"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_type} name={"usrs_type"} dataprop={"Type"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_mobile_number} name={"usrs_mobile_number"} dataprop={"Mobile Number"} />
                                </div>
                            </div>



                            <div className="col-sm-4 col-md-4">
                                <div>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_role} name={"usrs_role"} dataprop={"Role"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_profile} name={"usrs_profile"} dataprop={"Profile"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_status} name={"usrs_status"} dataprop={"Status"} />
                                </div>
                            </div>

                        </div>



                        <div className="row clearfix">
                            <div className="col-sm-12 col-md-12 mt-5">
                                <h6>More Information</h6>
                                <hr className="mt-0" />
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <div className='d-flex gap-1 align-items-center'>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_title} name={"usrs_title"} dataprop={"Title"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_fax} name={"usrs_fax"} dataprop={"Fax"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_department} name={"usrs_department"} dataprop={"Department"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_other_email} name={"usrs_other_email"} dataprop={"Other Email"} />
                                </div>
                            </div>


                            <div className="col-sm-4 col-md-4">
                                <div className='d-flex gap-1 align-items-center'>
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_secondary_email} name={"usrs_secondary_email"} dataprop={"Secondary Email"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_office_phone} name={"usrs_office_phone"} dataprop={"Office Phone"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_mobile_phone} name={"usrs_mobile_phone"} dataprop={"Mobile Phone"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_home_phone} name={"usrs_home_phone"} dataprop={"Home Phone"} />
                                </div>
                            </div>


                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_secondary_phone} name={"usrs_secondary_phone"} dataprop={"Secondary Phone"} />
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_signature} name={"usrs_signature"} dataprop={"Signature"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_reports_to} name={"usrs_reports_to"} dataprop={"Report To"} />
                                </div>
                            </div>
                        </div>

                        {/* end of second row */}


                        <div className="row clearfix">
                            <div className="col-sm-12 col-md-12 mt-5">
                                <h6>User Address</h6>
                                <hr className="mt-0" />
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_street_address} name={"usrs_street_address"} dataprop={"Street Address"} />
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_city} name={"usrs_city"} dataprop={"City"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_state} name={"usrs_state"} dataprop={"State"} />
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_country} name={"usrs_country"} dataprop={"Country"} />
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_postal_code} name={"usrs_postal_code"} dataprop={"Postal Code"} />
                                </div>
                            </div>


                        </div>
                        <div className="row clearfix">
                            <div className="col-sm-12 col-md-12 mt-5">
                                <h6>Localization</h6>
                                <hr className="mt-0" />
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_language} name={"usrs_language"} dataprop={"Language"} />
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_timezone} name={"usrs_timezone"} dataprop={"Time Zone"} />
                            </div>

                        </div>
                        <div className="row clearfix">
                            <div className="col-sm-12 col-md-12 mt-5">
                                <h6>Social Profile</h6>
                                <hr className="mt-0" />
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_facebook} name={"usrs_facebook"} dataprop={"Facebook"} />
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_instagram} name={"usrs_instagram"} dataprop={"Instagram"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_twitter} name={"usrs_twitter"} dataprop={"Twitter"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_linkedin} name={"usrs_linkedin"} dataprop={"Linkedin"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_youtube} name={"usrs_youtube"} dataprop={"Youtube"} />
                                </div>
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_tiktok} name={"usrs_tiktok"} dataprop={"TikTok"} />
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_telegram} name={"usrs_telegram"} dataprop={"Telegram"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_snapchat} name={"usrs_snapchat"} dataprop={"SnapChat"} />
                                </div>

                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_discord} name={"usrs_discord"} dataprop={"Discord"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_pinterest} name={"usrs_pinterest"} dataprop={"Pinterest"} />
                                </div>
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_zillow} name={"usrs_zillow"} dataprop={"Zillow"} />
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_realtor} name={"usrs_realtor"} dataprop={"Realtor"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_website} name={"usrs_website"} dataprop={"Website"} />
                                </div>
                                <div className="mt-2">
                                    <ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.usrs_whatsapp} name={"usrs_whatsapp"} dataprop={"Whatsapp"} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 mt-5">
                            <h6> Others </h6>
                            <hr className="mt-0" />
                        </div>
                        <div className='row'>
                        <div className="col-sm-4 col-md-4">
                            <SwitchButton label={"System Settings"} name={"usrs_system_settings"} checked={initialValues.usrs_system_settings} />
                         </div>
                        <div className="col-sm-4 col-md-4">
                              <SwitchButton label={"Login History"} name={"usrs_Login_Historys"} checked={initialValues.usrs_Login_Historys} />
                        </div>
                        <div className="col-sm-4 col-md-4">
                              <SwitchButton label={"Tags"} name={"usrs_tags"} checked={initialValues.usrs_tags} />
                        </div>
                        </div>
                        <SubmitButton props={submitbutton} buttonLoading={resSubmit.isLoading} />
                    </Form>
                )}
            </Formik>
        }
        </>
    )
}

export default EditProfileUser