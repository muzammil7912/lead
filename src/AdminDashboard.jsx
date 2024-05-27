import React, { useContext, useEffect, useState } from "react";
import { MainAuthPermissionsContext } from "./context/MainAuthPermissionsContext";
import useFetch from "./customHooks/useFetch";
import dayjs from "dayjs";
import { MainHeadingContext } from "./context/MainHeadingContext";
import { BsFillBookmarkFill } from "react-icons/bs";

function AdminDashboard() {
	const { addHeading } = useContext(MainHeadingContext);
	useEffect(() => {
		addHeading(`Dashboard`);
	}, [])
	const { data: adminchecking, loading33, error33, } = useFetch("", "getAllViewImportTemplate/1");

	const { permissions } = useContext(MainAuthPermissionsContext);
	const { data: leadTotalCountData, loading } = useFetch("", "leadTotalCountData");
	const { data: actionAccordingToWeek, loading1 } = useFetch("", "actionAccordingToWeek");
	const [StatisticsCounts, setStatisticsCounts] = useState({
		leads: 0,
		Prospects: 0,
		Opportunities: 0,
		Clientes: 0
	});
	const [actionAccordingCounts, setactionAccordingCounts] = useState({
		ActionsThisweek: 0,
		ActionsOverdue: 0,
	});
	useEffect(() => {
		if (leadTotalCountData) {
			// console.log(leadTotalCountData, "dataa");
			setStatisticsCounts({
				leads: leadTotalCountData.lead,
				Prospects: leadTotalCountData.prospect,
				Opportunities: leadTotalCountData.opportunity,
				Clientes: leadTotalCountData.client,
			})
		}
	}, [leadTotalCountData]);
	useEffect(() => {
		if (actionAccordingToWeek) {
			setactionAccordingCounts({
				ActionsThisweek: actionAccordingToWeek.count,
				ActionsOverdue: actionAccordingToWeek.dueDatecount,
			})
		}
	}, [actionAccordingToWeek]);

	useEffect(() => {
		if (adminchecking) {
			console.log("UZAIR TESING API ", adminchecking);
		}
	}, [adminchecking]);
	return (
		<div className="AdminMain">
			<div className="container-fluid">
				<div className="row clearfix">
					<div className="col-lg-12">
						<div className="mb-4">
							<h4>Welcome User {permissions?.uname}</h4>
							<small>The Sales Journey Score Board.</small></div>
					</div>
				</div>

				<div className="row clearfix">
					<div className="col-lg-2 col-md-6 col-sm-12">
						<div className="card">
							<div className="card-body">
								<div className="widgets2">
									<div className="state">
										<h6>Leads</h6>
										<h2>{StatisticsCounts?.leads && StatisticsCounts?.leads?.current_count}</h2>
									</div>

									<div className="icon"><i className="fa fa-user-secret"></i></div>
								</div>

								<div className="progress progress-sm">
									<div className="progress-bar bg-red" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style={{ "width": `${(Math.round(StatisticsCounts?.leads?.percentage_change))}%` }}></div>
								</div>
								<span className="text-small">{StatisticsCounts?.leads && (Math.abs(Math.round(StatisticsCounts?.leads?.percentage_change)) + " % " + (StatisticsCounts?.leads?.status))} than last month </span></div>
						</div>
					</div>

					<div className="col-lg-2 col-md-6 col-sm-12">
						<div className="card">
							<div className="card-body">
								<div className="widgets2">
									<div className="state">
										<h6>Prospects</h6>

										<h2>{StatisticsCounts?.Prospects && StatisticsCounts?.Prospects?.current_count}</h2>
									</div>

									<div className="icon"><i className="fa fa-user"></i></div>
								</div>

								<div className="progress progress-sm">
									<div className="progress-bar bg-green" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" style={{ "width": `${(Math.round(StatisticsCounts?.Prospects?.percentage_change))}%` }}></div>
								</div>
								<span className="text-small">{StatisticsCounts?.Prospects && (Math.abs(Math.round(StatisticsCounts?.Prospects?.percentage_change)) + " % " + (StatisticsCounts?.Prospects?.status))} than last month</span>
							</div>
						</div>
					</div>

					<div className="col-lg-2 col-md-6 col-sm-12">
						<div className="card">
							<div className="card-body">
								<div className="widgets2">
									<div className="state">
										<h6>Clients</h6>

										<h2>{StatisticsCounts?.Clientes && StatisticsCounts?.Clientes?.current_count}</h2>
									</div>

									<div className="icon"><i className="fa fa-user-circle-o"></i></div>
								</div>

								<div className="progress progress-sm">
									<div className="progress-bar bg-orange" role="progressbar" aria-valuenow="31" aria-valuemin="0" aria-valuemax="100" style={{ "width": `${(Math.round(StatisticsCounts?.Clientes?.percentage_change))}%` }}></div>
								</div>
								<span className="text-small">{StatisticsCounts?.Clientes && (Math.abs(Math.round(StatisticsCounts?.Clientes?.percentage_change)) + " % " + (StatisticsCounts?.Clientes?.status))} than last month</span>
							</div>
						</div>
					</div>

					<div className="col-lg-2 col-md-6 col-sm-12">
						<div className="card">
							<div className="card-body">
								<div className="widgets2">
									<div className="state">
										<h6>Opp</h6>

										<h2>{StatisticsCounts?.Opportunities && StatisticsCounts?.Opportunities?.current_count}</h2>
									</div>

									<div className="icon"><i className="fa fa-money"></i></div>
								</div>

								<div className="progress progress-sm">
									<div className="progress-bar bg-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ "width": `${(Math.round(StatisticsCounts.Opportunities?.percentage_change))}%` }}></div>
								</div>
								<span className="text-small">{StatisticsCounts?.Opportunities && (Math.abs(Math.round(StatisticsCounts.Opportunities?.percentage_change)) + " % " + (StatisticsCounts.Opportunities?.status))} than last month</span>
							</div>
						</div>
					</div>

					<div className="col-lg-2 col-md-6 col-sm-12">
						<div className="card">
							<div className="card-body">
								<div className="widgets2">
									<div className="state">
										<h6>week Actions</h6>

										<h2>{actionAccordingCounts?.ActionsThisweek}</h2>
									</div>

									<div className="icon"><BsFillBookmarkFill /></div>
								</div>

								<div className="progress progress-sm">
									<div className="progress-bar bg-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ "width": "20%" }}></div>
								</div>
								<span className="text-small">
									{actionAccordingToWeek?.thisWeek && (Math.abs(Math.round(actionAccordingToWeek?.thisWeek)) + " % " + (actionAccordingToWeek?.thisWeekMax_mini))} than last month
								</span>
							</div>
						</div>
					</div>

					<div className="col-lg-2 col-md-6 col-sm-12">
						<div className="card">
							<div className="card-body">
								<div className="widgets2">
									<div className="state">
										<h6>Actions Overdue</h6>

										<h2>{actionAccordingCounts.ActionsOverdue}</h2>
									</div>

									<div className="icon"><BsFillBookmarkFill /></div>
								</div>

								<div className="progress progress-sm">
									<div className="progress-bar bg-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ "width": "20%" }}></div>
								</div>
								<span className="text-small">
									{actionAccordingToWeek?.lastDayRes && (Math.abs(Math.round(actionAccordingToWeek?.lastDayRes)) + " % " + (actionAccordingToWeek?.lastDayMax_mini))} than last month
								</span>
							</div>
						</div>
					</div>
				</div>


				<div className="row clearfix dashboardPAge">
					<div className="col-xl-6 col-lg-12 col-md-12">
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Actions, Follow Ups & Meeting This Week</h3>
							</div>

							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-vcenter text-nowrap mb-0 " >
										<thead>
											<tr>
												<th>Type</th>

												<th>Related To</th>

												{/* <th className="text-center">Name</th> */}

												<th>Due Date</th>

												<th>Module</th>
											</tr>
										</thead>

										<tbody >
											{actionAccordingToWeek?.startDate && actionAccordingToWeek?.startDate.map((items, i) => {
												return (
													<tr key={i}>
														<td>{items.event_type}</td>
														<td style={{ whiteSpace: "break-spaces" }} >
															{items.related_to_id && items?.related_to_id_data?.message != "Data not found!" ? Array.isArray(items.related_to_id_data) && items.related_to_id_data[0]?.name : items.module_id && items.module_id != "0" && items.module_name?.message != "Data not found!" ? Array.isArray(items.module_name) && items.module_name[0]?.name || "---------------" : <span>-------------</span>}
														</td>
														<td>{items.end_date && dayjs(items.start_date).locale('en').format('DD MMM YYYY')}</td>
														<td>
															<label className="tag tag-success w-100 text-center d-flex justify-content-center">
																{items.related_to_id && !items?.related_to_id_data?.message ? Array.isArray(items.related_to_id_data) && items.related_to_id_data[0]?.module || (items?.related_to === "none" ? "-----------" : items?.related_to) : items?.related_to === "none" ? "--------" : items?.related_to || (items?.module_id && items?.module_id !== "0" ? items?.module : "---------")}
															</label>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-12 col-md-12">
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Actions, Follow Ups & Meeting Overdue</h3>
							</div>
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-vcenter text-nowrap mb-0">
										<thead>
											<tr>
												<th>Type</th>

												<th>Related To:</th>

												{/* <th className="text-center">Name</th> */}

												<th>Due Date</th>

												<th>Module</th>
											</tr>
										</thead>
										<tbody>
											{actionAccordingToWeek?.dueDate && actionAccordingToWeek?.dueDate.map((items, i) => {
												return (
													<tr key={i}>
														<td>{items.event_type}</td>
														<td style={{ whiteSpace: "break-spaces" }}>
															{items.related_to_id && items?.related_to_id_data?.message != "Data not found!" ? Array.isArray(items?.related_to_id_data) && items?.related_to_id_data[0]?.name : items?.module_id && items.module_id != "0" && items.module_name?.message != "Data not found!" ? Array.isArray(items?.module_name) && items.module_name[0]?.name || "---------------" : <span>-------------</span>}
														</td>
														<td>{items.end_date && dayjs(items.end_date).locale('en').format('DD MMM YYYY')}</td>
														<td>
															<label className="tag tag-success w-100 text-center d-flex justify-content-center">
																{items.related_to_id && !items?.related_to_id_data?.message ? items.related_to_id_data && items.related_to_id_data.length > 0 ? items.related_to_id_data[0]?.module || (items?.related_to === "none" ? "-----------" : items?.related_to) : "---------------" : items?.related_to === "none" ? "--------" : items?.related_to || (items?.module_id && items?.module_id !== "0" ? items?.module : "---------")}
															</label>
														</td>
													</tr>
												)
											})}
											{/* 
											<tr>
												<td>eMail</td>

												<td>Lead: Lead Name</td>

												<td>12 Jan 2018</td>

												<td>
													<label className="tag tag-warning">Stage Name</label>
												</td>
											</tr> */}
											{/* 
											<tr>
												<td>eMail</td>

												<td>Lead: Lead Name</td>

												<td>12 Jan 2018</td>

												<td>
													<label className="tag tag-danger">Stage Name</label>
												</td>
											</tr> */}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div >
	);
}

export default AdminDashboard;
