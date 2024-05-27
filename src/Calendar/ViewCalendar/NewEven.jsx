import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import Loader from '../../components/common/Loading';
import FormControl from '../../components/form/FormControl'
import {CreateCalendar} from '../../Data/AllData'

function Create() {
    const [loading, setloading] = useState(true)
    let EventTitle =      localStorage.getItem("EventTitle");
	let EventType = 	localStorage.getItem("EventType");
	let EventCalendar =	localStorage.getItem("EventCalendar");
	let HEXCODE =	    localStorage.getItem("HEXCODE");
	let startdate = 	localStorage.getItem("startdate");
	let enddate = 	    localStorage.getItem("enddate");
    const [initialValues, setInitialValues] = useState({
        "eve_name" : EventTitle,
      } )
    function handleSubmit(values) {
    
    }
  return (
    <div className="CreateAction">
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card borderblue">
            <div className="card-header">
              <h3 className="card-title">New Event</h3>
            </div>
            <div className="card-body">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form name="myForm">
                    <div className="row">
                        <div className="col-md-5 col-sm-12">
                        <FormControl className="form-control my-1"  label={"Event Title"} name="eve_name" control="input" placeholder=" Event Title"  />
                        </div>
                        <div className="col-md-2">
                        <FormControl className="form-control my-1"   label={"Type"} name="eve_type" selectList={CreateCalendar.type}control="select"   />
                        </div>
                    </div>
            </Form>
            </Formik>
            </div>
        </div>
        </div>
    </div>
</div>
</div>
  )
}

export default Create