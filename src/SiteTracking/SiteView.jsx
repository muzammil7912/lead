import React, { useState, useEffect, useRef, useContext } from "react";
import { Form, Formik, Field } from "formik";
import { MainHeadingContext } from "../context/MainHeadingContext";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SiteCard from "./SiteCard";
import config from "../services/config.json";
import SiteList from "./SiteList";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { Translation } from "../components/Translation";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import FormControl from "../components/form/FormControl";
import axios from "axios";
import { getTokenSession } from "../utils/common";
import useFetch from "../customHooks/useFetch";
import isUrl from 'is-url';
function SiteView() {
  const { translations } = useContext(MainTranslationContexts);
  const { addHeading } = useContext(MainHeadingContext);
  const { data: siteTrackingList, loading } = useFetch("", `getAllViewSiteTracking`);

  const [Show, setShow] = useState();
  const [siteTrack_list_data, setsiteTrack_list_data] = useState([])
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`,
  };


  useEffect(() => {
    if(siteTrackingList){
      setsiteTrack_list_data(siteTrackingList)
    }
    addHeading(`Site Tracking`);
  }, [siteTrackingList]);

  function copyToClipboard() {
    const text = document.querySelector(".text-break").innerText;
    const dummyElement = document.createElement("textarea");
    dummyElement.value = text;
    document.body.appendChild(dummyElement);
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    swal({
      // title: "Copied to clipboard!",
      text: "Copied to clipboard!",
      icon: "success",
      position: "center",
      buttons: false,
      timer: 1000, // 5 seconds
    });
    // alert('Copied to clipboard!');
  }

  let InitialPerformMathAction = {
    include_all_pages: [],
    web_page_URL: "",
  };
  const handleAdd_URL = (values) => {
    const firstCheck = isUrl(values.web_page_URL);
    if(firstCheck){
      let url_obj=new URL(values.web_page_URL)
      setShow(true)
      const formData=new FormData()
      formData.append("url",url_obj.origin)
      formData.append("submit","createSiteTracking")
      formData.append("include_all",(values.include_all_pages)[0]==="Include all Website pages")
     
      axios.post(`${config.apiEndPoint}postCreateSiteTracking`,formData).then((res) => {
        setsiteTrack_list_data(res.data);
      });
      console.log(url_obj.origin);

    }else{
      swal({
        // title: "Copied to clipboard!",
        text: "URL is not valid",
        icon: "error",
        position: "center", 
        buttons: false,
      });
    }

  };

  return (
    <div className="section-body mt-3">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-md-12 p-0">
            <div className="card ">
              <div className="card-header borderblue">
                <h3 className="card-title">Whitelist and Install Code </h3>
              </div>
              <div className="card-body">
                <div className=" websiteSearching px-3 mb-4">
                  <Formik
                    initialValues={InitialPerformMathAction}
                    onSubmit={handleAdd_URL}
                  >
                    <Form>
                      <div className="row p-0 mt-1">
                        <div className="d-flex gap-2 align-items-end">
                          <FormControl
                            className="form-control my-1"
                            required={true}
                            label={Translation(translations, "Add Website URL")}
                            name="web_page_URL"
                            control="input3"
                            placeholder={Translation(translations, "url")}
                          />
                          <div className="my-3">
                            <button className="btn btn-primary" type="submit">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="ml-2">
                      <FormControl
                                                                  options={["Include all Website pages"]}
                                                                 
                                                                  label={Translation(
                                                                    translations,
                                                                    ``
                                                                  )}
                                                                  name={"include_all_pages"}
                                                                  control="checkbox"
                                                                  
                                                                />
                       
                      </div>
                      {/* <div className='col'>
                                    <p className='p-0 m-0'>
                                        To Whitelist a page a subdomain, paste in the specific URL and Uncheck "Include all website pages."You can use * for a walidcard Learn more about Whitelist .
                                    </p>
                                </div> */}
                    </Form>
                  </Formik>
                </div>
               <div className="mt-4 site_tracking_tabs">
               <Tabs
                  defaultActiveKey="Grid"
                  id="uncontrolled-tab-example"
                  className="mb-2 p-2  "
                >
                  <Tab className="p1 d-flex flex-wrap site_tracking_tabs1"  eventKey="Grid" title="Grid">
                    {siteTrack_list_data&&siteTrack_list_data.length&&
                    siteTrack_list_data.map((item,index)=>{

                      return <SiteCard  data={item} />
                    })
                    }
                   
                  
                  </Tab>

                  <Tab className="p1 site_tracking_tabs2" eventKey="Stage Positions" title="List">
                  {siteTrack_list_data&&siteTrack_list_data.length&&
                    siteTrack_list_data.map((item,index)=>{

                      return <SiteList data={item} />
                    })
                    }
                  </Tab>
                </Tabs>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={Show}
        onHide={() => setShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5 className="modal-title">Publishable Key</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <span className="text-success">
              <i className="fas fa-key"></i>
              <b> Your key :</b>
            </span>
          </div>
          <div>
            <p className="text-break" onClick={copyToClipboard}>
              eyJpdiI6IlpSNkl1WTN1cmRpTDB6ZmxyYWpDakE9PSIsInZhbHVlIjo
              iYXNMYUpBOUc4alFoem56bC8vUkpsM2hGY0hRV21RUEhXeXpnQzN3SFJ
              naE8rOURmSG1ZOGtxZWRJVkswSGZnd0pYNGV4UXJI
              bUpNdFVUQklBd1hvTlE9PSIsIm1hYyI6ImRjNThhYzY5YTUwNzlmYzI0
              MWQ1NTUzMDBiNGRkZDMxMTlmNDNhZmU2ZGZjMGNmZWVlN
              2IxNjJlYjBkYjM1ZDMiLCJ0YWciOiIifQ==
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex">
            <div>
              <button
                className="btn btn-success btn-sm generate-embedded-code"
                onClick={copyToClipboard}
              >
                Get Embedded Code
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default SiteView;
// import React, { useState, useEffect, useContext } from 'react';
// import { Formik, Field } from "formik";
// import { MainHeadingContext } from "../context/MainHeadingContext";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import SiteCard from './SiteCard';
// import SiteList from './SiteList';

// const SeachingWeb = ({ website, setWebsite }) => {
//   return (
//     <div className="col-md-12">
//       <h6 className='mb-0'>
//         Add Website URL
//       </h6>
//       <div className="row p-0 mt-2 mb-3">
//         <div className="col-md-4 p-0 m-0">
//           <div className='d-flex '>
//             <input
//               value={website}
//               type="text"
//               className='form-control mr-2'
//               onChange={(e) => setWebsite(e.target.value)}
//             />
//             <button className='btn btn-primary'>Add</button>
//           </div>
//         </div>
//       </div>
//       <div className='col ms-3'>
//         <input type="checkbox" className="form-check-input" id="exampleCheckbox" />
//         <label className="form-check-label" htmlFor="exampleCheckbox">Include all Website pages</label>
//       </div>
//       <div className='col'>
//         <p className='p-0 m-0'>
//           To Whitelist a page or subdomain, paste in the specific URL and uncheck "Include all website pages." You can use * for a wildcard. Learn more about Whitelist.
//         </p>
//       </div>
//     </div>
//   );
// }

// function SiteView() {
//   const [website, setWebsite] = useState('');
//   const { addHeading } = useContext(MainHeadingContext);

//   useEffect(() => {
//     addHeading(`Site Tracking`);
//   }, [])

//   return (
//     <div className='section-body mt-3'>
//       <div className="container-fluid">
//         <div className="row clearfix">
//           <div className="col-12">
//             <div className="card">
//               <div className="card-header borderblue">
//                 <h3 className="card-title">Whitelist and Install Code</h3>
//                 <div className="card-options">
//                   {/* <Link to={`/${config.ddemoss}clients/Grid`} className='btn btn-sm btn-primary bsm'>
//                       <FaHome style={{ fontSize: 18 }} />
//                   </Link> */}
//                 </div>
//               </div>
//               <div className="card-body">
//                 <Tabs
//                   defaultActiveKey="Grid"
//                   id="uncontrolled-tab-example"
//                   className="mb-2 p-2 mt-1"
//                 >
//                   <Tab className="p1" eventKey="Grid" title="Grid">
//                     <SiteCard website={website} setWebsite={setWebsite} />
//                   </Tab>
//                   <Tab
//                     className="p1"
//                     eventKey="Stage Positions"
//                     title="List"
//                   >
//                     <SiteList website={website} setWebsite={setWebsite} />
//                   </Tab>
//                 </Tabs>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SiteView;
