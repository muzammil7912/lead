import React, { useState } from 'react';
import {MDBTabs, MDBTabsItem,MDBTabsLink,  MDBTabsContent,MDBTabsPane} from "mdb-react-ui-kit";
import allData from '../Data/data'
import FormControl from '../components/form/FormControl';

function New() {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const [justifyActive2, setJustifyActive2] = useState("tab20");
    const [assettab, setAssettab] = useState("tab1");
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
      setJustifyActive(value);
    };
    const handleJustifyClick2 = (value) => {
      if (value == justifyActive2) {
        return;
      }
      setJustifyActive2(value);
    };
    const handleJustifyClick3 = (value) => {
      if (value == assettab) {
        return;
      }
  
      setAssettab(value);
    };
  return (
    <div className='crateLead'>
        <div className="section-body">
            <div className="container-fluid">
    <MDBTabs justify>
      <MDBTabsItem>
        <MDBTabsLink
          onClick={() => handleJustifyClick("tab1")}
          active={justifyActive === "tab1"}
        >
          Source
        </MDBTabsLink>
      </MDBTabsItem>
    </MDBTabs>
    </div>
    </div>
    <div className="card">
        <div className="card-body">
    <MDBTabsContent>
      <MDBTabsPane show={justifyActive === "tab1"}>
        <h3 className='card-title mb-3'>Business Unit</h3>
        <FormControl className="form-control my-1" selectList={allData.createleadPage.LeadSource}  firstSelect={"select one"} label={"Business Unit"} name="Business_Unit" control="select" required={true}   />
        <FormControl  options={allData.createleadPage.Radios}   label={"Radio "} name="Radio" control="radio"  />
        <FormControl className="form-control textarea my-1"  label={"TesteDec11"} name="TesteDec11" control="textarea" rows="10"   />
        <br />
        <h3 className="card-title mb-3">Campaign &amp; Source</h3>
        <FormControl className="form-control my-1"  label={"Medium"} name="Medium" control="input"    />
        <FormControl className="form-control my-1"  label={"Campaign"} name="Campaign" control="input"    />
        <FormControl className="form-control my-1"  label={"Keyword"} name="Keyword" control="input" required={true}    />
        <FormControl className="form-control my-1"  label={"UTM Source"} name="UTM_Source" control="input" />
        <FormControl className="form-control my-1"  label={"UTM Medium"} name="UTM_Medium" control="input" />
        <FormControl className="form-control my-1"  label={"UTM Campaign"} name="UTM_Campaign" control="input" />
        <FormControl className="form-control my-1"  label={"UTM Term"} name="UTM_Term" control="input" />

      </MDBTabsPane>
    </MDBTabsContent>
    </div>
    </div>
  </div>
  )
}

export default New