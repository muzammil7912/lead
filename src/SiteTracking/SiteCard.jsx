import React, { useState, useContext, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";

export default function SiteCard({ Header,data }) {
    const [Show, setShow] = useState();
    function copyToClipboard() {
        const text = document.querySelector('.text-break').innerText;
        const dummyElement = document.createElement('textarea');
        dummyElement.value = text;
        document.body.appendChild(dummyElement);
        dummyElement.select();
        document.execCommand('copy');
        document.body.removeChild(dummyElement);
        alert('Copied to clipboard!');
    }

    return (
        <div className="mx-2 row">
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
            <div className="col-md-12 mt-3">
                <div className="card">
                    <div className="card-body text-center ribbon siteTrack_card p-2">
                        <div className="card_img">
                            <img className='rounded-circle img-thumbnail w100' src="https://website-assets-fw.freshworks.com/attachments/cklt8g79t02hkfffzjk5ytmyp-what-is-website-tracking.full.jpg" alt="" />
                        </div>
                        <div className="card_heading ">
                            <h6 className=' my-2 mb-0'>
                            {data?.url}
                            </h6>
                        </div>
                        <div className='editdetabtn d-flex justify-content-center mt-2 gap-1'>
                            <div className='btn btn-default btn-sm'>
                                <span>
                                    Edit
                                </span>
                            </div>
                            <div className='btn btn-default btn-sm'>
                                <span>
                                    Delete
                                </span>
                            </div>
                            <div className='btn btn-default btn-sm'>
                                <span>
                                    View
                                </span>
                            </div>
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
                        <p className='text-break' onClick={copyToClipboard}>
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
