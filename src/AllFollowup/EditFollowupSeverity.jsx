import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
import { MainOpportunitiesListContext } from "../context/MainOpportunitiesListContext";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from '../components/common/Loading';
import iconData from '../Data/icon';
import FormControl from '../components/form/FormControl';
import usePost from '../customHooks/usePost';
import { Translation } from '../components/Translation';
import config from "../services/config.json";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import useFetch from '../customHooks/useFetch';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import { getTokenSession } from '../utils/common';
import { MainTranslationContexts } from '../context/MainTranslationContexts';

function EditFollowupSeverity() {
    const { translations } = useContext(MainTranslationContexts)
    const { addOpportunitiesList } = useContext(MainOpportunitiesListContext);
    const { addHeading } = useContext(MainHeadingContext);
    const [res, apiMethod] = usePost();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: EditSeverity, loading, error } = useFetch("", `getEditFollowupSeverity/${id}`);

    useEffect(() => {
        if (EditSeverity) {
            addHeading(`Edit Severity`);
        }
    }, [EditSeverity]);
    useEffect(() => {
        if (res.data && !res.isLoading) {
            axios.defaults.headers = {
                "Content-Type": "multipart/form-data",
                authentication: `${getTokenSession()}`,
            };
            axios
                .get(`${config.apiEndPoint}getAllViewFollowupSeverity`)
                .then((response) => {
                    addOpportunitiesList(response.data)

                })
            res.data.message && toast.success(res.data.message);
            navigate(`/${config.ddemoss}followup_severity`);
        }
    }, [res.data]);

    if (loading) return <Loader />;
    let v = {
        "severity_label": EditSeverity.severity_label,
        "severity_color": EditSeverity.severity_color
    }
    let initialValues = v;

    const handleSubmit = (values) => {
        let formdata = new FormData();
        if (values["pipeline_name"] === "") {
            swal({
                title: "Required Fields are empty! Please fill and try again",
                icon: "warning",
                dangerMode: true,
            })
        }
        else {
            for (let item in values) {
                formdata.append(item, values[item]);
            }
            formdata.append("severity_id", id);
            formdata.append("type_create", "Update_prioRiTy_lABel");
            apiMethod("postUpdatedFollowupSeverity", formdata);
        }

    }

    const submitbutton = {
        class: "btn btn-primary btn-block",
        text: "Update & Save",
    };


    return (
        <div className="container-fluid">
            <div className="row clearfix my-4">
                <div className="col-4 offset-sm-4">
                    <div className="card">
                        <div className="card-header borderblue">
                            <div className="card-title">Edit Severity</div>
                        </div>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            <Form name="myForm">
                                <div className="card-body mb-0">
                                    <div className="col-md-12 mt-1">
                                        <div className="form-group">
                                            <label htmlFor="">{Translation(translations, "Name")}</label>
                                            <Field type="text" className="form-control my-1" name="severity_label" placeholder={Translation(translations, "Severity Name...")} />
                                        </div>
                                        <div className="">
                                            <label htmlFor="">{Translation(translations, "Color")}</label>
                                            <Field type="color" className="input-color col-12" name="severity_color" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <SubmitButton
                                        props={submitbutton}
                                        buttonLoading={res.isLoading}
                                    />
                                </div>


                            </Form>
                        </Formik>
                    </div>
                    <p className="text-center my-4"><Link to={`/${config.ddemoss}followup_severity`}> Go to Severity</Link></p>
                </div>
            </div>
        </div>
    )
}

export default EditFollowupSeverity