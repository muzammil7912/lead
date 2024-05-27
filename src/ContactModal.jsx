import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Select, Space } from 'antd';
import Button from 'react-bootstrap/Button';
import { Formik, Field, Form } from 'formik';
import usePost from "./customHooks/usePost";
import useFetch from "./customHooks/useFetch";


function Example({ id1 }) {
    const { data: getdata2, loading, error1 } = useFetch("", `postEditTypeContact/${id1}`);
    const [show, setShow] = useState(false);
    const [name, setname] = useState();
    const [color, setcolor] = useState();
    const [select, setselect] = useState([])
    const [id, setid] = useState()
    const handleClose = () => setShow(false);
    const { Option } = Select;
    const [update, setUpdate] = usePost();
    const handleShow = () => setShow(true);
    //  const [update1, setUpdate2] = usePost();
    // const handleShow = ({ id1 }) => {
    //     setShow(true)
    //     const formData3 = new FormData();
    //     formData3.append(`general`, 'save_contactType_edit');
    //     formData3.append("mode", id1)
    //     setUpdate2("postEditTypeContact",formData3)
    //     console
    // };

    const handleSubmit1 = () => {
        const formData2 = new FormData();
        formData2.append("type_name_ed", name)
        formData2.append("type_color_ed", color)
        formData2.append("smode[]", id)
        formData2.append(`general`, 'save_contactType_edit');
        formData2.append(`type_module_ed[]`, select);
        setUpdate("postUpdateTypeContact", formData2)
    }
    // console.log(select || value.type_module);
    const handleChange = (value) => {
        setselect(value)
    };
    console.log("api res", getdata2)
    // useEffect(() => {
    //     setid(value.db_id)
    // }, [])

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ backgroundColor: "transparent", color: "black" }}>
                <i className="fa-solid fa-pencil" />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Edity Contact Type
                </Modal.Header>
                <Modal.Body>

                    <form className="ctn-form" id="form-ctn4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label">Contact Type</label>
                                    <input
                                        required=""
                                        type="text"
                                        className="form-control"
                                        name="type_name_ed"
                                        // defaultValue={value.type_name}
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group multiselect_div">
                                    <label className="form-label">Module Type</label>
                                    <Select
                                        mode="multiple"
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="select one country"
                                        onChange={handleChange}
                                        optionLabelProp="label"
                                    // defaultValue={value.type_module}
                                    >
                                        <Option value="Contact" label="Contact">
                                            <Space>

                                                Contact
                                            </Space>
                                        </Option>
                                        <Option value="Lead" label="Lead">
                                            <Space>

                                                Lead
                                            </Space>
                                        </Option>
                                        <Option value="Prospect" label="Prospect">
                                            <Space>

                                                Prospect
                                            </Space>
                                        </Option>
                                        <Option value="User" label="Staff Member">
                                            <Space>

                                                Staff Member
                                            </Space>
                                        </Option>
                                        <Option value="Client" label="Client">
                                            <Space>

                                                Client
                                            </Space>
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-0">
                                    <label className="form-label">Color</label>
                                    <input
                                        required=""
                                        type="color"
                                        name="type_color_ed"
                                        className="input-color"
                                        // defaultValue={value.type_color}
                                        onChange={(e) => setcolor(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>{" "}
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit1}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Example;