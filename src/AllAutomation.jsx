import Tab from "react-bootstrap/Tab";
import React, { useContext, useEffect, useState, useRef } from "react";
import Tabs from "react-bootstrap/Tabs";
import AutomationCard from "./AutomationCard";
import AutomationList from "./AutomationList";
import { Link } from 'react-router-dom';
import config from "./services/config.json";
import useFetch from "./customHooks/useFetch";
function AllAutomation() {
    const { data: fetchAllAutomation, loading } = useFetch("", `getAllViewAutomationAction`);
    const [allAutomation_data, setallAutomation_data] = useState("")
    useEffect(() => {
        if (fetchAllAutomation) {
            setallAutomation_data(fetchAllAutomation)
        }
    }, [fetchAllAutomation])


    return (
        <div className="section-body mt-3">
            <div className="container-fluid">
                <div className='row clearfix'>
                    <div className='col-md-12 p-0'>
                        <div className="card">
                            <div className='card-header borderblue'>
                                <h3 className='card-title'>
                                    All Automation
                                </h3>
                            </div>
                            <div className='card-body'>
                                <div className="col-md-12 mt-3 automationbtn_header">
                                    <button>
                                        <Link to={`/${config.ddemoss}automation`} className="text-white"><i className="fas fa-plus me-1"></i>
                                            Create an automation
                                        </Link>
                                    </button>
                                </div>
                                <Tabs
                                    defaultActiveKey="Grid"
                                    id="uncontrolled-tab-example"
                                    className="mb-2 p-2 mt-1 rounded AutomationTabs"
                                >
                                    <Tab className="p1 " eventKey="Grid" title="Grid">
                                        {<AutomationCard allautomation={allAutomation_data} setallAutomation_data={setallAutomation_data} />}
                                    </Tab>

                                    <Tab
                                        className="p1 "
                                        eventKey="Stage Positions"
                                        title="List"
                                    >
                                        <AutomationList allautomation={allAutomation_data} setallAutomation_data={setallAutomation_data} />
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllAutomation;