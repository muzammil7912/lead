// import Modal from "react-bootstrap/Modal";
// import React, { useState, useContext,useEffect } from 'react';
// import { Translation } from "./components/Translation";
// import { MainTranslationContexts } from './context/MainTranslationContexts';
// import FormControl from "./components/form/FormControl";
// import { Form, Formik } from "formik";
// function ModalAutomation({ dropdata, selective, showing }) {
//     const { translations } = useContext(MainTranslationContexts)
//     const [show, setshow] = useState(showing);
//     const [selectedOption, setSelectedOption] = useState('');
//     const [selectedOption2, setSelectedOption2] = useState('');
//     const handleOptionChange = (event) => {
//         setSelectedOption(event.target.value);
//     };
//     const handleOptionChange2 = (event) => {
//         setSelectedOption2(event.target.value);
//     };
//     console.log(showing,"phela show dekh raha ");
//     console.log(show,"dusra  ");

//     useEffect(()=>{
//         setshow(showing)
//     },[showing])
//     return (
//         <Modal
//             show={show}
//             onHide={()=>setshow(false)}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     <h5 className='modal-title'>
//                         Add a New Action
//                     </h5>
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Formik
//                 // initialValues={}
//                 // onSubmit={}
//                 >
//                     <Form name="myForm">
//                         <div className="row">
//                             {dropdata &&
//                                 <FormControl
//                                     className="form-control my-1"
//                                     required={true}
//                                     label={"Select Tag"}
//                                     name="fname"
//                                     control="input"
//                                     placeholder={Translation(translations, "First Name")}
//                                 />
//                             }
//                             {
//                                 selective &&
//                                 <div className="row">
//                                     <div>
//                                         <FormControl
//                                             className="form-control my-1"
//                                             required={true}
//                                             label={"Select Tag"}
//                                             name="fname"
//                                             control="input"
//                                             placeholder={Translation(translations, "First Name")}
//                                         />
//                                     </div>
//                                     <div>
//                                         <div>
//                                             <p className="m-0">From</p>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     value="option1"
//                                                     checked={selectedOption === "option1"}
//                                                     onChange={handleOptionChange}
//                                                 />

//                                                 Any value
//                                             </label>

//                                         </div>
//                                         <div>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     value="option2"
//                                                     checked={selectedOption === "option2"}
//                                                     onChange={handleOptionChange}
//                                                 />

//                                                 A specific value
//                                             </label>
//                                             {selectedOption === "option2" ?
//                                                 <FormControl
//                                                     className="form-control my-1"
//                                                     name="fname"
//                                                     control="input"
//                                                     placeholder={Translation(translations, "Enter Specific Input ")}
//                                                 /> : null}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div>
//                                             <p className="m-0">To</p>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     value="option1"
//                                                     checked={selectedOption2 === "option1"}
//                                                     onChange={handleOptionChange2}
//                                                 />

//                                                 Any value
//                                             </label>

//                                         </div>
//                                         <div>
//                                             <label>
//                                                 <input
//                                                     type="radio"
//                                                     value="option2"
//                                                     checked={selectedOption2 === "option2"}
//                                                     onChange={handleOptionChange2}
//                                                 />

//                                                 A specific value
//                                             </label>
//                                             {selectedOption2 === "option2" ?
//                                                 <FormControl
//                                                     className="form-control my-1"
//                                                     name="fname"
//                                                     control="input"
//                                                     placeholder={Translation(translations, "Enter Specific Input ")}
//                                                 /> : null}
//                                         </div>
//                                         <div>
//                                             <FormControl
//                                                 label={Translation(translations, "The contact is")}
//                                                 className="form-control my-1"
//                                                 name="fname"
//                                                 control="input"
//                                                 placeholder={Translation(translations, "The contact is ")}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                     </Form>
//                 </Formik>
//             </Modal.Body>
//             <Modal.Footer></Modal.Footer>
//         </Modal >
//     );
// }

// export default ModalAutomation;