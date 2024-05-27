import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaHome } from "react-icons/fa";
import { Form, Formik, Field } from "formik";
import FormControl from "../components/form/FormControl";
import { Translation } from "../components/Translation";
import SubmitButton from '../components/SubmitButton';
import { toast } from "react-toastify";
import usePost from '../customHooks/usePost';
import swal from 'sweetalert';
import config from "../services/config.json";
import axios from "axios";
import { getTokenSession } from '../utils/common';
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { Link, useParams, useNavigate } from 'react-router-dom';

function CreateClientKanban({ translation }) {
    const [HandleData, setHandleData] = useState({
        name: "",
        Stage_Name: "",
        Backgroun_Color: "#000000",
        Font_Color: "#ffffff",
        Column_Width: 300,
        Order_number: ""
    });
    const [CheckResponse, setCheckResponse] = useState(false);
    const [dropdown, setdropdown] = useState();
    const [res, apiMethod] = usePost();
    const { addHeading } = useContext(MainHeadingContext);
    useEffect(() => {
        addHeading(`Create Client Stage`);
    }, [])

    useEffect(() => {
        axios.defaults.headers = {
            "Content-Type": "multipart/form-data",
            authentication: `${getTokenSession()}`,
        };
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.apiEndPoint}getKanbanClientsStageOrderNumber`);
                setdropdown(response.data);
                console.log(response.data)
            } catch (err) {
                console.log('error', err);
            }
        };
        fetchData();
    }, [res]);
    const { active } = useParams();
    const { leadPermission } = useContext(MainLeadPermissionContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (leadPermission) {
            if (leadPermission?.client_stages?.active_module === "0" || leadPermission?.client_stages?.edit === "0") {
                navigate(`/${config.ddemoss}`);
            }
        }
    }, [leadPermission]);

    const handleSubmit = (values, actions) => {
        console.log(values)
        let formdata = new FormData();
        if ((values.name != "") && (values.Stage_Name != "") && (values.Backgroun_Color != "") && (values.Font_Color != "") &&
            (values.Column_Width != "") && (values.Order_number != "") && (values.Order_number != "select")) {
            formdata.append("submit", "create_stage");
            formdata.append("name", values.name);
            formdata.append("stage_name", values.Stage_Name);
            formdata.append("background_color", values.Backgroun_Color);
            formdata.append("font_color", values.Font_Color);
            formdata.append("column_width", values.Column_Width);
            formdata.append("order", values.Order_number);
            formdata.append("basename", "create_clientstage");
            apiMethod("postCreateClientsKanbanStages", formdata);
            actions.resetForm({ values: HandleData });
        }
        else {
            swal({
                title: "Required Fields are empty! Please fill and try again",
                icon: "warning",
                dangerMode: true,
            })
        }
    }
    useEffect(() => {
        if (res.data) {
            console.log(res.data)
            toast.success("Create Stages successfully");
            navigate(`/${config.ddemoss}clients/Kanban`)
            // setHandleData({ name: "", Stage_Name: "", Backgroun_Color: "#ffffff", Font_Color: "", Column_Width: 300, Order_number: "" })
        }

    }, [res.data]);

    const submitbutton = {
        class: "btn btn-primary",
        text: "Store Stage",
    };


    return (
        <div className='section-body mt-3'>
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header borderblue">
                                <h3 className="card-title">Create Stages</h3>
                                <div className="card-options">
                                <Link to={`/${config.ddemoss}clients/Grid`} className='btn btn-sm btn-primary bsm'>
                    <FaHome style={{ fontSize: 18 }} />
                  </Link>
                                </div>
                            </div>
                            <div className="card-body">
                                <Formik initialValues={HandleData} onSubmit={handleSubmit}>
                                    <Form name="myForm">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <FormControl
                                                        className="form-control my-1"
                                                        label={Translation(translation, "Name")}
                                                        name="name"
                                                        control="input3"
                                                        placeholder={Translation(translation, "Label")}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <FormControl
                                                        className="form-control my-1"
                                                        label={Translation(translation, "Stage Name")}

                                                        name="Stage_Name"
                                                        control="input3"
                                                        placeholder={Translation(translation, "Stage Name")}
                                                        required={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <FormControl
                                                        className="input-color color_input"
                                                        label={Translation(translation, "Background Color")}
                                                        name="Backgroun_Color"
                                                        control="input3" type="color"
                                                        required={true}
                                                        style={{ width: "100%" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <FormControl
                                                        className="input-color color_input"
                                                        label={Translation(translation, " Font Color")}
                                                        name="Font_Color"
                                                        control="input3" type="color"
                                                        required={true}
                                                        style={{ width: "100%" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <FormControl
                                                        className="form-control my-1"
                                                        label={Translation(translation, "Column Width")}
                                                        name="Column_Width"
                                                        defaultValue="300"
                                                        control="input5" type="number"
                                                        placeholder={Translation(translation, "")}
                                                        style={{ width: "100%" }}

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="">Order number</label>
                                                    <Field as="select" name="Order_number" className="form-control my-1">
                                                        <option hidden >select</option>
                                                        {dropdown && dropdown?.map((key) => (
                                                            <option key={key} value={key}>
                                                                {key}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-right mt-5'>
                                            <SubmitButton
                                                props={submitbutton}
                                                buttonLoading={res.isLoading}
                                            />
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default CreateClientKanban