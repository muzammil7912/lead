import React, { useState,useRef,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Select } from 'antd';
import Modal from 'react-bootstrap/Modal';
import { Avatar} from 'antd'
import isoCountries from './Data/country';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getTokenSession } from './utils/common';
import config from "./services/config.json";
import { MainTranslationContext } from "./context/MainTranslationContext";
import SelectSearch from './components/form/SelectCountry';

function NewLangModal() {
  const [show, setShow] = useState(false);
  const { transData,addData } = useContext(MainTranslationContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selected, setSelected] = useState('af.svg')
  let selectedVal=(a)=>{
    setSelected(a)
  };
  const nameRef = useRef()
  const messageRef = useRef()
 
 const handleSubmit=()=>{
  if(selected&&nameRef.current.value&&messageRef.current.value){
    let obj ={
     lang_image:selected,
     lang_name:nameRef.current.value,
     lang_message:messageRef.current.value,
    }
    handleClose(true)


    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios
      .post(`${config.apiEndPoint}postCreateLanguage/`, {
      ...obj  
      })
      .then((response)=>{
        // console.log(response)
        axios
        .get(`${config.apiEndPoint}getAllLanguages/`, {
        ...obj  
        })
        .then((response)=>{
          addData(response.data)

        })
        .catch((err)=>{
          console.log('eerr',err)
        })
      })
      .catch((err)=>{
        console.log('eerr',err)
      })
     


    
   }else{
    toast.error('All fields are required')
   }
  
  }




  return (
    <>
      <span onClick={handleShow}>
     Add New Language 
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Language</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
          <div>
           <div>
            <p>Icon</p>
            <SelectSearch defaultval={selected}  selectedVal={selectedVal} />
            </div> 
            <div>
            <p className='mt-2 w-100 '>Name</p>
            <input ref={nameRef} type="text" className='form-control' />
            </div> 
            <div>
            <p className='mt-2 w-100'>Message</p>
           <textarea ref={messageRef} className='form-control'></textarea>
            </div> 




          </div>


        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={()=>{handleSubmit()}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<NewLangModal />);
export default NewLangModal;