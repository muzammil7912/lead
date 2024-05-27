import { Form, Formik, Feild } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import usePost from '../../customHooks/usePost';
import Loader from '../common/Loading';
import "react-loading-skeleton/dist/skeleton.css";
import ProfileCheckbox from '../form/ProfileCheckbox';
import SubmitButton from '../SubmitButton';
import Checkbox2 from '../form/Checkbox2';
import SwitchButton from '../form/SwitchButton';
import { toast } from "react-toastify";
import { PrivilegesContact } from '../../Data/AllData';

const EditProfileContact = ({ data, useIDD, reCallAPI }) => {
	let md5 = require('md5');
	const [deflData, setDeflData] = useState(data)
	const isComponentMounted = useRef(true);
	const [resGet, apiMethodGet] = usePost();
	const [res, apiMethod] = usePost();
	const [datas, setDatas] = useState();

	let feild = deflData?.fields;
	let feild2 = {
		'active_module': deflData?.active_module,
		'mod_view': deflData?.module_view,
		'mod_create': deflData?.module_create,
		'mod_edit': deflData?.module_edit,
		'mod_delete': deflData?.module_delete,
	};
	const allfeild = { ...feild, ...feild2 }
	PrivilegesContact.map(field => {
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
	const submitbutton = {
		"class": "btn btn-primary mt-3 ml-auto d-block",
		"text": "Store User"
	}
	let obj = initialValues;
	const handleFunction = (e, setFieldValue) => {
        let targetid = e.target.getAttribute('data-id');
		let checkBox_name=["mod_view",'active_module','mod_create','mod_edit','mod_delete',]
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
	function handleSubmit(values) {
		let formdatas = new FormData();

		for (let item in values) {
			formdatas.append(item, values[item]);
		}
		formdatas.append("profile_id", useIDD);
		formdatas.append("module", "contacts");
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
				{({ setFieldValue }) => (
					<Form name="myForm">
						<h3 className="card-title">
							<Checkbox2 label={"Enable/Disable Module "} name="active_module" checkedd={initialValues.active_module} />
						</h3>
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
						<div className="row">
							<div className="col-sm-6 col-md-6">
								<div>
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contact_fullname} name={"contact_fullname"} dataprop={"Contact Name"} />
								</div>
								<div className="mt-2">
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contact_avtar} name={"contact_avtar"} dataprop={"Avatar"} />
								</div>
								<div className="mt-2">
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contact_phone_number} name={"contact_phone_number"} dataprop={"Phone Number"} />
								</div>
								<div className="mt-2">
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contact_email} name={"contact_email"} dataprop={"Email"} />
								</div>
							</div>
							<div className="col-sm-6 col-md-6">
								<div>
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contact_created_date} name={"contact_created_date"} dataprop={"Created Date"} />
								</div>

								<div className="mt-2">
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contact_note} name={"contact_note"} dataprop={"Note"} />
								</div>
								<div className="mt-2">
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contact_convert_contact} name={"contact_convert_contact"} dataprop={"Convert Contact Number"} />
								</div>

								<div className="mt-2">
									<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.contacts_contact_type} name={"contacts_contact_type"} dataprop={"Type of Contact"} />
								</div>
							</div>

						</div>
						<SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
					</Form>
				)}
			</Formik>
		</>

	)
}

export default EditProfileContact