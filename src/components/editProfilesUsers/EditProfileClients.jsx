import { Form, Formik, Feild } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import usePost from '../../customHooks/usePost';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import "react-loading-skeleton/dist/skeleton.css";
import ProfileCheckbox from '../form/ProfileCheckbox';
import SubmitButton from '../SubmitButton';
import Checkbox2 from '../form/Checkbox2';
import SwitchButton from '../form/SwitchButton';
import { toast } from "react-toastify";
import FormControl from '../form/FormControl';
import { PrivilegesClient } from '../../Data/AllData';

const EditProfileClients = ({ data, useIDD, reCallAPI }) => {
	const [firstval, setFirstval] = useState("");
	const [deflData, setDeflData] = useState(data)
	const isComponentMounted = useRef(true);
	const [resGet, apiMethodGet] = usePost();
	const [res, apiMethod] = usePost();
	const [datas, setDatas] = useState();
	let feild = data?.fields;
	let feild2 = {
		"active_module": data?.active_module,
		"mod_create": data?.module_create,
		"mod_delete": data?.module_delete,
		"mod_edit": data?.module_edit,
		"mod_view": data?.module_view
	};
	const allfeild = { ...feild, ...feild2 }
	PrivilegesClient.map(field => {
		if (!allfeild.hasOwnProperty(field)) {
			allfeild[field] = "false";
		}
	})
	const [initialValues, setInitialValues] = useState(allfeild)

	useEffect(() => {
		if (datas?.all_fields) {
			{
				Object.keys(datas.all_fields).map((item, index) => {
					index === 0 && setFirstval(item)
				})
			}
		}
	}, [datas])

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


	function handleGet() {
		let clientData = new FormData();
		clientData.append("type", "allCustomFields");
		clientData.append("module", "lead,prospect,client");
		apiMethodGet("postAllStagesCustomFields", clientData);
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
		let checkBox_name = ["mod_view", 'active_module', 'mod_create', 'mod_edit', 'mod_delete', 'clients_Qualifications', 'clients_Source', 'clients_Contact', 'clients_Real_Estate', 'clients_Persona', 'clients_Prospect', 'clients_Sales_Journey', 'clients_Testimony', 'clients_Uzair420', 'clients_Hammad', 'clients_Muzzamil', 'clients_admininfo', 'clients_admin_create_date', 'clients_admin_converstion_sdr', 'clients_admin_unqualified_owner', 'clients_admin_updated_date', 'clients_admin_contacted_date', 'clients_admin_unqualified_date', 'clients_admin_leadstage_dates', 'clients_admin_dealfirst_date', 'clients_admin_validation_date', 'clients_admin_converstion_date', 'clients_admin_firstsale_date', 'clients_admin_validation_owner', 'clients_admin_prospect_lost_date', 'clients_admin_prospect_lost_owner', 'clients_admin_client_conversion_date', 'clients_admin_client_conversion_owner']
		for (let index in initialValues) {
			if (!checkBox_name.includes(index)) {
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
		formdatas.append("module", "clients");
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
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_fname} name={"clients_fname"} dataprop={"First Name"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_lname} name={"clients_lname"} dataprop={"Last Name"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_avtar} name={"clients_avtar"} dataprop={"Avatar"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_upload} name={"clients_upload"} dataprop={"Upload Image"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_phone_number} name={"clients_phone_number"} dataprop={"Phone Number"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_lead_stage} name={"clients_lead_stage"} dataprop={"Client Stage"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_lead_medium} name={"clients_lead_medium"} dataprop={"Client Medium"} />
									</div>
								</div>
								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_email} name={"clients_email"} dataprop={"Email"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_email_status} name={"clients_email_status"} dataprop={"Email Status"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_score_number} name={"clients_score_number"} dataprop={"Score Number"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_mobile_phone} name={"clients_mobile_phone"} dataprop={"Mobile Phone"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_contact_owner} name={"clients_contact_owner"} dataprop={"Contact Owner"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_birthday} name={"clients_birthday"} dataprop={"Birthday"} />
									</div>
								</div>


								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_contact_type} name={"clients_contact_type"} dataprop={"Type"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_created_date} name={"clients_created_date"} dataprop={"Created Date"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_updated_date} name={"clients_updated_date"} dataprop={"Updated Date"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_tags} name={"clients_tags"} dataprop={"Tags"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_file_upload} name={"clients_file_upload"} dataprop={"File Upload"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_file_delete} name={"clients_file_delete"} dataprop={"File Delete"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_notes} name={"clients_notes"} dataprop={"Notes"} />
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
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_address1} name={"clients_address1"} dataprop={"Address 1"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_address2} name={"clients_address2"} dataprop={"Address 2"} />
									</div>


									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_sourcepage} name={"clients_sourcepage"} dataprop={"Source Page"} />
									</div>
								</div>

								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_postal_code} name={"clients_postal_code"} dataprop={"Postal / ZIP code"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_state} name={"clients_state"} dataprop={"State"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_country} name={"clients_country"} dataprop={"Country"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_lead_source} name={"clients_lead_source"} dataprop={"Lead Source"} />
									</div>
								</div>

								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_ipaddress} name={"clients_ipaddress"} dataprop={"IP Address"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_time_zone} name={"clients_time_zone"} dataprop={"Time Zone"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.clients_locale} name={"clients_locale"} dataprop={"Locale"} />
									</div>
								</div>
							</div>
							<div className="row clearfix">

								<div className="col-sm-12 col-md-12 mt-5">
									<h6>Custom Fields</h6>
									<hr className="mt-0" />
								</div>

								<div className="col-sm-12 col-md-12">
									{firstval &&
										<Tab.Container defaultActiveKey={firstval}>
											<Nav className="nav nav-tabs page-header-tab" id="myTab" role="tablist">

												{datas.all_fields && Object.keys(datas.all_fields).map((item, index) => {
													return (
														<li className="nav-item" key={index}>
															<FormControl
																name={`clients_${item}`}
																control="input4"
																defaultd={initialValues[`clients_${item}`]}
															/>
															<Nav.Link eventKey={item}> &nbsp; {item.replaceAll("_", " ")}
															</Nav.Link>
														</li>
													)
												})
												}
											</Nav>
											<Tab.Content id="myTabContent">
												{datas.all_fields && Object.keys(datas.all_fields).map((item, index) => {
													return (
														<Tab.Pane key={index} eventKey={item}>
															{Object.keys(datas.all_fields[item]).map((item2, index2) => {
																return (
																	<div key={index2}>
																		<h3 className="card-title mb-2 mt-2"><strong>{item2.replaceAll("_", " ")}</strong></h3>
																		<div className='row'>
																			{Object.keys(datas.all_fields[item][item2]).map(function (item3, index3) {
																				const { label, type, field_required } = datas.all_fields[item][item2][item3];
																				let itemname = Object.keys(datas.all_fields[item][item2])[index3];
																				return (
																					<div className='col-sm-12 col-md-6' key={index3}>

																						<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues[`clients_${itemname}`] ? initialValues[`clients_${itemname}`] : ""} name={`clients_${itemname}`} dataprop={label} />

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
												name={`clients_admininfo`}
												control="input4"
												defaultd={initialValues[`clients_admininfo`]}
											/>
											<a className="nav-link active show" data-toggle="tab" href="#admininfo">
												&nbsp;
												Admin
											</a>
										</li>
									</ul>
									<div className="tab-content" id="myTabContent">
										<div className="tab-pane fade active show" id="admininfo" role="tabpanel">
											<div className="row">
												<div className="col-sm-4 col-md-4">
													<SwitchButton checked={initialValues.clients_admin_created_date} label='Created Date' name='clients_admin_created_date' />
													<SwitchButton checked={initialValues.clients_admin_updated_date} label='Updated Date' name='clients_admin_updated_date' />
													<SwitchButton checked={initialValues.clients_admin_leadstage_dates} label='Lead Stage Dates' name='clients_admin_leadstage_dates' />
													<SwitchButton checked={initialValues.clients_admin_conversion_date} label='Conversion Date' name='clients_admin_conversion_date' />
													<SwitchButton checked={initialValues.clients_admin_unqualified_owner} label='Client Lost Owner' name='clients_admin_unqualified_owner' />
													{/* <SwitchButton checked={initialValues.clients_admin_prospect_lost_date} label='Prospect Lost Date' name='clients_admin_prospect_lost_date' /> */}
												</div>

												<div className="col-sm-4 col-md-4">
													<SwitchButton checked={initialValues.clients_admin_conversion_sdr} label='Conversion SDR' name='clients_admin_conversion_sdr' />
													<SwitchButton checked={initialValues.clients_admin_contacted_date} label='Contacted Date' name='clients_admin_contacted_date' />
													<SwitchButton checked={initialValues.clients_admin_date_created_for_first_sale} label='Deal First Date' name='clients_admin_date_created_for_first_sale' />
													<SwitchButton checked={initialValues.clients_admin_firstsale_date} label='First Sale Date' name='clients_admin_firstsale_date' />
													<SwitchButton checked={initialValues.clients_admin_unqualified_date} label='Client Lost Date' name='clients_admin_unqualified_date' />
													{/* <SwitchButton checked={initialValues.clients_admin_prospect_lost_owner} label='Prospect Lost Owner' name='clients_admin_prospect_lost_owner' /> */}

												</div>

												<div className="col-sm-4 col-md-4">
													<SwitchButton checked={initialValues.clients_admin_validation_date} label='Validation Date' name='clients_admin_validation_date' />
													<SwitchButton checked={initialValues.clients_admin_validation_owner} label='Validation Owner' name='clients_admin_validation_owner' />
													<SwitchButton checked={initialValues.clients_admin_client_conversion_date} label='Client Conversion Date' name='clients_admin_client_conversion_date' />
													<SwitchButton checked={initialValues.clients_admin_client_conversion_owner} label='Client Conversion Owner' name='clients_admin_client_conversion_owner' />
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
									<Checkbox2 label="Import" name="clients_import" checkedd={initialValues.clients_import} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Export" name="clients_export" checkedd={initialValues.clients_export} />
								</div>

								{/* <div className="col-sm-4 col-md-4">
									<Checkbox2 label="Merge" name="clients_merge" checkedd={initialValues.clients_merge} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Convert Lead" name="clients_convert_lead" checkedd={initialValues.clients_convert_lead} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Duplicate Handling" name="clients_duplicate_handling" checkedd={initialValues.clients_duplicate_handling} />
								</div> */}


							</div>
							<SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
						</Form>
					)}
				</Formik>}
		</>

	)
}

export default EditProfileClients