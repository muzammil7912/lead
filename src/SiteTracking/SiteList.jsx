import React, { useState, useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
export default function SiteList({ Header,data }) {
    const [Show, setShow] = useState();

    return (
        <div className='row clearfix listview'>
            {/* <div className="col-md-12">
                <h6 className='mb-0'>
                    Add Website URL
                </h6>
                <div className="row p-0 mt-2 mb-3">
                    <div className="col-md-4 p-0 m-0">
                        <div className='d-flex '>
                            <input type="text" className='form-control mr-2' />
                            <button className='btn btn-primary' onClick={() => setShow(true)}>Add</button>
                        </div>
                    </div>
                </div>
                <div className='col ms-3'>
                    <input type="checkbox" className="form-check-input" id="exampleCheckbox" />
                    <label className="form-check-label" htmlFor="exampleCheckbox">Include all Website pages</label>
                </div>
                <div className='col'>
                    <p className='p-0 m-0'>
                        To Whitelist a page a subdomain, paste in the specific URL and Uncheck "Include all website pages."You can use * for a walidcard Learn more about Whitelist .
                    </p>
                </div>
            </div> */}
            {/* <Header /> */}
            <div className="card ms-1 col mt-2">
                <div className='card-body text-center ribbon'>
                    <div className="starBox">
                        <span className='mail-star'>
                            <i className="fa fa-star"></i>
                        </span>
                    </div>
                    <div className="card_heading">
                        <span>
                            {data?.url}
                        </span>
                    </div>
                    <div className="dateBox">
                        <span>
                           {data?.Include_all=== 
"true"?" All website pages":"Specific pages"}
                        </span>
                    </div>
                    <div className='mb-1 socialBtn sitetracksocial'>
                        <div>
                            <span>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </span>
                        </div>
                        <div>
                            <span>
                                <i className="fa-solid fa-trash"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={Show}
                onHide={() => setShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className='modal-title'>
                            Publishable Key
                        </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>
                            eyJpdiI6IlpSNkl1WTN1cmRpTDB6ZmxyYWpDakE9PSIsInZhbHVlIjo
                            iYXNMYUpBOUc4alFoem56bC8vUkpsM2hGY0hRV21RUEhXeXpnQzN3SFJ
                            naE8rOURmSG1ZOGtxZWRJVkswSGZnd0pYNGV4UXJI
                            bUpNdFVUQklBd1hvTlE9PSIsIm1hYyI6ImRjNThhYzY5YTUwNzlmYzI0
                            MWQ1NTUzMDBiNGRkZDMxMTlmNDNhZmU2ZGZjMGNmZWVlN
                            2IxNjJlYjBkYjM1ZDMiLCJ0YWciOiIifQ==
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
