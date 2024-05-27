import { Form, Formik, Feild } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import usePost from '../../customHooks/usePost';
import "react-loading-skeleton/dist/skeleton.css";
import ProfileCheckbox from '../form/ProfileCheckbox';
import SubmitButton from '../SubmitButton';
import Checkbox2 from '../form/Checkbox2';
import SwitchButton from '../form/SwitchButton';
import { toast } from "react-toastify";
import FormControl from '../form/FormControl';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { PrivilegesLead, PrivilegesUser } from '../../Data/AllData';

const EditProfileLeads = ({ data, useIDD, reCallAPI }) => {
	const [deflData, setDeflData] = useState(data)
	const isComponentMounted = useRef(true);
	const [resGet, apiMethodGet] = usePost();
	const [res, apiMethod] = usePost();
	const [datas, setDatas] = useState();
	const [firstval, setFirstval] = useState("");

	let feild = deflData?.fields;
	let feild2 = {
		'active_module': deflData?.active_module,
		'mod_view': deflData?.module_view,
		'mod_create': deflData?.module_create,
		'mod_edit': deflData?.module_edit,
		'mod_delete': deflData?.module_delete,
	};
	const allfeild = { ...feild, ...feild2 }
    PrivilegesLead.map(field => {
        if (!allfeild.hasOwnProperty(field)) {
            allfeild[field] = "false";
        }
    })
	const [initialValues, setInitialValues] = useState(allfeild)

	useEffect(() => {
		if (isComponentMounted.current) {
			handleGet();
		}
		else {
			setDatas(resGet.data)
			
		}
		return () => {
			isComponentMounted.current = false;
		};

	}, [resGet]);

	useEffect(() => {
	 if(datas?.all_fields) {
		{Object.keys(datas.all_fields).map((item, index) => {
			index === 0 &&  setFirstval(item)
		})}
	 }
	}, [datas])
	


	function handleGet() {
		let leadData = new FormData();
		leadData.append("type", "allCustomFields");
		leadData.append("module", "Lead");
		apiMethodGet("postAllStagesCustomFields", leadData);
	}
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
		let checkBox_name=["mod_view",'active_module','mod_create','mod_edit','mod_delete','leads_Qualifications','leads_Source','leads_Contact','leads_Real_Estate','leads_Persona','leads_Muzzamil','leads_admininfo','leads_admin_created_date','leads_admin_converstion_sdr','leads_admin_unqualified_owner','leads_admin_updated_date','leads_admin_contacted_date','leads_admin_unqualified_date','leads_admin_leadstage_dates','leads_admin_dealfirst_date','leads_admin_validation_date','leads_admin_converstion_date','leads_admin_firstsale_date','leads_admin_validation_owner','leads_import','leads_export','leads_merge','leads_convert_lead','leads_duplicate_handling']
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
		formdatas.append("module", "leads");
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
			{!datas ? <Skeleton count={25} /> :
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
								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_fname} name={"leads_fname"} dataprop={"First Name"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_lname} name={"leads_lname"} dataprop={"Last Name"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_avtar} name={"leads_avtar"} dataprop={"Avatar"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_upload} name={"leads_upload"} dataprop={"Upload Image"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_phone_number} name={"leads_phone_number"} dataprop={"Phone Number"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_lead_stage} name={"leads_lead_stage"} dataprop={"Lead Stage"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_lead_medium} name={"leads_lead_medium"} dataprop={"Lead Medium"} />
									</div>
								</div>
								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_email} name={"leads_email"} dataprop={"Email"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_email_status} name={"leads_email_status"} dataprop={"Email Status"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_score_number} name={"leads_score_number"} dataprop={"Score Number"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_mobile_phone} name={"leads_mobile_phone"} dataprop={"Mobile Phone"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_contact_owner} name={"leads_contact_owner"} dataprop={"Contact Owner"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_birthday} name={"leads_birthday"} dataprop={"Birthday"} />
									</div>
								</div>


								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_contact_type} name={"leads_contact_type"} dataprop={"Type"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_created_date} name={"leads_created_date"} dataprop={"Created Date"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_updated_date} name={"leads_updated_date"} dataprop={"Updated Date"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_tags} name={"leads_tags"} dataprop={"Tags"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_file_upload} name={"leads_file_upload"} dataprop={"File Upload"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_file_delete} name={"leads_file_delete"} dataprop={"File Delete"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_notes} name={"leads_notes"} dataprop={"Notes"} />
									</div>
								</div>

							</div>
							<div className="row clearfix">
								<div className="col-sm-12 col-md-12 mt-5">
									<h6>Location</h6>
									<hr className="mt-0" />
								</div>

								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_address1} name={"leads_address1"} dataprop={"Address 1"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_address2} name={"leads_address2"} dataprop={"Address 2"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_city} name={"leads_city"} dataprop={"City"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_sourcepage} name={"leads_sourcepage"} dataprop={"Source Page"} />
									</div>
								</div>

								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_postal_code} name={"leads_postal_code"} dataprop={"Postal / ZIP code"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_state} name={"leads_state"} dataprop={"State"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_country} name={"leads_country"} dataprop={"Country"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_lead_source} name={"leads_lead_source"} dataprop={"Lead Source"} />
									</div>
								</div>

								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_ipaddress} name={"leads_ipaddress"} dataprop={"IP Address"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_time_zone} name={"leads_time_zone"} dataprop={"Time Zone"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.leads_locale} name={"leads_locale"} dataprop={"Locale"} />
									</div>
								</div>
							</div>
							<div className="row clearfix">

								<div className="col-sm-12 col-md-12 mt-5">
									<h6>Custom Fields</h6>
									<hr className="mt-0" />
								</div>

								<div className="col-sm-12 col-md-12">
								{firstval  &&
								<Tab.Container  defaultActiveKey={firstval}>
									<Nav  className="nav nav-tabs page-header-tab" id="myTab" role="tablist">

										{Object.keys(datas.all_fields).map((item, index) => {
											return (
												<Nav.Item className="nav-item" key={index}>

													<FormControl
														name={`leads_${item}`}
														control="input4"
														defaultd={initialValues[`leads_${item}`]}
													/>
													<Nav.Link eventKey={item} className={`nav-link show`} >
														{item}	</Nav.Link>
												</Nav.Item>
											)
										})
										}
									</Nav>
									<Tab.Content id="myTabContent">
										{Object.keys(datas.all_fields).map((item, index) => {
											return (
												<Tab.Pane  key={index} eventKey={item}>
													{Object.keys(datas.all_fields[item]).map((item2, index2) => {
														return (
															<div key={index2}>
																<h3 className="card-title mb-2 mt-2"><strong>{item2.replaceAll("_"," ")}</strong></h3>
																<div className='row'>
																	{Object.keys(datas.all_fields[item][item2]).map(function (item3, index3) {
																		const { label, type, field_required } = datas.all_fields[item][item2][item3];
																		let itemname = Object.keys(datas.all_fields[item][item2])[index3];
																		return (
																			<div className='col-sm-12 col-md-6' key={index3}>
																				<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues[itemname] == itemname ? initialValues[itemname] : ""} name={`leads_${itemname}`} dataprop={label} />

																			</div>
																		)
																	})}
																</div>
															</div>
														)
													})}
												</Tab.Pane>
											)
										})}

									</Tab.Content>
									</Tab.Container>
									}
								</div>
							</div>
							<div className="row clearfix">
								<div className="col-sm-12 col-md-12 mt-5">
									<h6>Tabs</h6>
									<hr className="mt-0" />
								</div>

								<div className="col-sm-12 col-md-12">
									<ul className="nav nav-tabs page-header-tab" id="myTab" role="tablist">
										<li className="nav-item">
											<FormControl
												name={`leads_admininfo`}
												control="input4"
												defaultd={initialValues[`leads_admininfo`]}
											/>
											<a className="nav-link active show" data-toggle="tab" href="#admininfo">
												Admin
											</a>
										</li>
									</ul>
									<div className="tab-content" id="myTabContent">
										<div className="tab-pane fade active show" id="admininfo" role="tabpanel">
											<div className="row">
												<div className="col-sm-4 col-md-4">
													<SwitchButton checked={initialValues.leads_admin_created_date} label='Created Date' name='leads_admin_created_date' />
													<SwitchButton checked={initialValues.leads_admin_updated_date} label='Updated Date' name='leads_admin_updated_date' />
													{/* <SwitchButton checked={initialValues.leads_admin_conversion_date} label='Conversion Date' name='leads_admin_conversion_date' /> */}
												</div>

												<div className="col-sm-4 col-md-4">
													{/* <SwitchButton checked={initialValues.leads_admin_conversion_sdr} label='Conversion SDR' name='leads_admin_conversion_sdr' /> */}
													<SwitchButton checked={initialValues.leads_admin_contacted_date} label='Contacted Date' name='leads_admin_contacted_date' />
													<SwitchButton checked={initialValues.leads_admin_leadstage_dates} label='Lead Stage Dates' name='leads_admin_leadstage_dates' />
													{/* <SwitchButton checked={initialValues.leads_admin_dealfirst_date} label='Deal First Date' name='leads_admin_dealfirst_date' /> */}
													{/* <SwitchButton checked={initialValues.leads_admin_date_create_for_first_deal} label='First Sale Date' name='leads_admin_date_created_for_first_deal' /> */}

												</div>

												<div className="col-sm-4 col-md-4">
													<SwitchButton checked={initialValues.leads_admin_unqualified_owner} label='Unqualified Owner' name='leads_admin_unqualified_owner' />
													<SwitchButton checked={initialValues.leads_admin_unqualified_date} label='Unqualified Date Date' name='leads_admin_unqualified_date' />
													{/* <SwitchButton checked={initialValues.leads_admin_validation_date} label='Validation Date' name='leads_admin_validation_date' /> */}
													{/* <SwitchButton checked={initialValues.leads_admin_validation_owner} label='Validation Owner' name='leads_admin_validation_owner' /> */}
												</div>

											</div>
										</div>
									</div>
								</div>

							</div>
							<div className="row clearfix">

								<div className="col-sm-12 col-md-12 mt-5">
									<h6>Tools</h6>
									<hr className="mt-0" />
								</div>


								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Import" name="leads_import" checkedd={initialValues.leads_import} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Export" name="leads_export" checkedd={initialValues.leads_export} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Merge" name="leads_merge" checkedd={initialValues.leads_merge} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Convert Lead" name="leads_convert_lead" checkedd={initialValues.leads_convert_lead} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Duplicate Handling" name="leads_duplicate_handling" checkedd={initialValues.leads_duplicate_handling} />
								</div>


							</div>
							<SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
						</Form>
					)}
				</Formik>}
		</>

	)
}

export default EditProfileLeads