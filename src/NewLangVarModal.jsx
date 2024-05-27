import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Space } from 'antd';
import { Button as AButton } from 'antd'
import { toast } from 'react-toastify';
import config from "./services/config.json";
import axios from 'axios';
import { getTokenSession } from './utils/common';
function NewLangVarModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ///////////////////////////////////////////////

  const onFinish = (values) => {
    if(values.users){
      axios.defaults.headers = {
        "Content-Type": "multipart/form-data",
        authentication: `${getTokenSession()}`,
      };
      axios
        .post(`${config.apiEndPoint}postCreateVariable/`, {
        lang_variable_name:values.users[0].first,
        lang_variable_value:values.users[0].last
        })
        .then((res)=>{

          // console.log(res)
        })
        .catch((err)=>{
console.log(err);
        })

    }else{
      toast.error('Add Atleast on Variable name')
    }
  };
  const CustomFields = () => (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
    >
      <Form.List name="users">
        {(fields, { add, remove }) => (

          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 18,
                  justifyContent:'space-between',
                  alignItems:'center'
                }}
                // align="baseline"
              >

                <Form.Item
                style={
                  {height:'30px'}
                }
                  {...restField}
                  name={[name, 'first']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing Tittle',
                    },
                  ]}
                >
                  <Input placeholder="Tittle" />
                </Form.Item>
                <Form.Item
                style={
                  {height:'30px'}
                }
                  {...restField}
                  name={[name, 'last']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing Value',
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(name)}
                  />
                ) : null}            </Space>
            ))}
            <Form.Item>
           {  fields.length<=0? <AButton type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </AButton>:<span></span>}
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <AButton type="primary" htmlType="submit" >
          Submit
        </AButton>
      </Form.Item>
    </Form>
  );


  ////////////////////////////////////////////// // 
  return (
    <>
      <span onClick={handleShow}>
        New Lang Variable      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add New Language Variable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <CustomFields />

          </div>

        </Modal.Body>

      </Modal>
    </>
  );
}

// render(<NewLangModal />);
export default NewLangVarModal;