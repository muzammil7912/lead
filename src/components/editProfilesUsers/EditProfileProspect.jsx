import { Form, Formik } from 'formik'
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
import { PrivilegesProspect } from '../../Data/AllData';

const EditProfileProspect = ({ data, useIDD, reCallAPI }) => {
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
	PrivilegesProspect.map(field => {
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
		let prospectsData = new FormData();
		prospectsData.append("type", "allCustomFields");
		prospectsData.append("module", "Lead,Prospects");
		apiMethodGet("postAllStagesCustomFields", prospectsData);
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
		let checkBox_name = ["mod_view", 'active_module', 'prospects_admin_unqualified_date', 'mod_create', 'mod_edit', 'mod_delete', 'prospects_Qualifications', 'prospects_Source', 'prospects_Contact', 'prospects_Real_Estate', 'prospects_Persona', 'prospects_Muzzamil', 'prospects_admininfo', 'prospects_admin_create_date', 'prospects_admin_converstion_sdr', 'prospects_admin_unqualified_owner', 'prospects_admin_updated_date', 'prospects_admin_contacted_date', 'prospects_admin_leadstage_dates', 'prospects_admin_dealfirst_date', 'prospects_admin_validation_date', 'prospects_admin_converstion_date', 'prospects_admin_firstsale_date', 'prospects_admin_validation_owner', 'prospects_admin_lost_date', 'prospects_admin_lost_owner', 'prospects_import', 'prospects_convert_lead', 'prospects_export', 'prospects_duplicate_handling', 'prospects_merge']
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
		formdatas.append("module", "prospects");
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
							{console.log(initialValues)}
							<h3 className="card-title">
								<Checkbox2 label={"Enable/Disable Module "} value="user_module" name="active_module" checkedd={initialValues.active_module} />

							</h3>
							{/* <input type="hidden" name="modules_name" value="user_module"></input> */}
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
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_fname} name={"prospects_fname"} dataprop={"First Name"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_lname} name={"prospects_lname"} dataprop={"Last Name"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_avtar} name={"prospects_avtar"} dataprop={"Avatar"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_upload} name={"prospects_upload"} dataprop={"Upload Image"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_phone_number} name={"prospects_phone_number"} dataprop={"Phone Number"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_lead_stage} name={"prospects_lead_stage"} dataprop={"Prospect Stage"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_lead_medium} name={"prospects_lead_medium"} dataprop={"Prospects Medium"} />
									</div>
								</div>
								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_email} name={"prospects_email"} dataprop={"Email"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_email_status} name={"prospects_email_status"} dataprop={"Email Status"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_score_number} name={"prospects_score_number"} dataprop={"Score Number"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_mobile_phone} name={"prospects_mobile_phone"} dataprop={"Mobile Phone"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_contact_owner} name={"prospects_contact_owner"} dataprop={"Contact Owner"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_birthday} name={"prospects_birthday"} dataprop={"Birthday"} />
									</div>
								</div>


								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_contact_type} name={"prospects_contact_type"} dataprop={"Type"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_created_date} name={"prospects_created_date"} dataprop={"Created Date"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_updated_date} name={"prospects_updated_date"} dataprop={"Updated Date"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_tags} name={"prospects_tags"} dataprop={"Tags"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_file_upload} name={"prospects_file_upload"} dataprop={"File Upload"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_file_delete} name={"prospects_file_delete"} dataprop={"File Delete"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_notes} name={"prospects_notes"} dataprop={"Notes"} />
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
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_address1} name={"prospects_address1"} dataprop={"Address 1"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_address2} name={"prospects_address2"} dataprop={"Address 2"} />
									</div>


									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_sourcepage} name={"prospects_sourcepage"} dataprop={"Source Page"} />
									</div>
								</div>

								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_postal_code} name={"prospects_postal_code"} dataprop={"Postal / ZIP code"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_state} name={"prospects_state"} dataprop={"State"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_country} name={"prospects_country"} dataprop={"Country"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_city} name={"prospects_city"} dataprop={"City"} />
									</div>
									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_lead_source} name={"prospects_lead_source"} dataprop={"Lead Source"} />
									</div>
								</div>

								<div className="col-sm-4 col-md-4">
									<div>
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_ipaddress} name={"prospects_ipaddress"} dataprop={"IP Address"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_time_zone} name={"prospects_time_zone"} dataprop={"Time Zone"} />
									</div>

									<div className="mt-2">
										<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues.prospects_locale} name={"prospects_locale"} dataprop={"Locale"} />
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

												{Object.keys(datas.all_fields).map((item, index) => {
													return (
														<li className="nav-item" key={index}>
															<FormControl
																name={`prospects_${item}`}
																control="input4"
																defaultd={initialValues[`prospects_${item}`]}
															/>
															<Nav.Link eventKey={item}> &nbsp; {item.replaceAll("_", " ")}
															</Nav.Link>
														</li>
													)
												})
												}
											</Nav>
											<Tab.Content id="myTabContent">
												{Object.keys(datas.all_fields).map((item, index) => {
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

																						<ProfileCheckbox updateClick={(item) => handlevalUpdate(item)} datas={initialValues[`prospects_${itemname}`] ? initialValues[`prospects_${itemname}`] : ""} name={`prospects_${itemname}`} dataprop={label} />

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
												name={`prospects_admininfo`}
												control="input4"
												defaultd={initialValues[`prospects_admininfo`]}
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
													<SwitchButton checked={initialValues.prospects_admin_create_date} label='Created Date' name='prospects_admin_created_date' />
													<SwitchButton checked={initialValues.prospects_admin_updated_date} label='Updated Date' name='prospects_admin_updated_date' />
													<SwitchButton checked={initialValues.prospects_admin_leadstage_dates} label='Lead Stage Dates' name='prospects_admin_leadstage_dates' />
													<SwitchButton checked={initialValues.prospects_admin_converstion_date} label='Qualification Date' name='prospects_admin_qualification_date' />
												</div>

												<div className="col-sm-4 col-md-4">
													<SwitchButton checked={initialValues.prospects_admin_converstion_sdr} label='Qualification Owner' name='prospects_admin_qualification_owner' />
													<SwitchButton checked={initialValues.prospects_admin_contacted_date} label='Contacted Date' name='prospects_admin_contacted_date' />
													<SwitchButton checked={initialValues.prospects_admin_dealfirst_date} label='Deal First Date' name='prospects_admin_dealfirst_date' />
													<SwitchButton checked={initialValues.prospects_admin_firstsale_date} label='First Sale Date' name='prospects_admin_date_created_for_first_deal' />

												</div>

												<div className="col-sm-4 col-md-4">
													<SwitchButton checked={initialValues.prospects_admin_lost_date} label='Prospect Lost Date' name='prospects_admin_lost_date' />
													<SwitchButton checked={initialValues.prospects_admin_lost_owner} label='Prospect Lost Owner' name='prospects_admin_lost_owner' />
													{/* <SwitchButton checked={initialValues.prospects_admin_unqualified_owner} label='Unqualified Owner' name='prospects_admin_unqualified_owner' /> */}
													{/* <SwitchButton checked={initialValues.prospects_admin_unqualified_date} label='Unqualified Date Date' name='prospects_admin_unqualified_date' /> */}
													<SwitchButton checked={initialValues.prospects_admin_validation_date} label='Validation Date' name='prospects_admin_validation_date' />
													<SwitchButton checked={initialValues.prospects_admin_validation_owner} label='Validation Owner' name='prospects_admin_validation_owner' />
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
									<Checkbox2 label="Import" name="prospects_import" checkedd={initialValues.prospects_import} />
								</div>

								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Export" name="prospects_export" checkedd={initialValues.prospects_export} />
								</div>
								<div className="col-sm-4 col-md-4">
									<Checkbox2 label="Validate Prospect" name="prospects_validate" checkedd={initialValues.prospects_validate} />
								</div>
							</div>
							<SubmitButton props={submitbutton} buttonLoading={res.isLoading} />
						</Form>
					)}
				</Formik>}
		</>

	)
}

export default EditProfileProspect