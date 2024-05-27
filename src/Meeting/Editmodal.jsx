import { useState, useEffect, useContext, } from "react";
import { Modal, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from "../components/Translation";
import { FaSave } from "react-icons/fa";
import swal from 'sweetalert';
import usePost from '../customHooks/usePost';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const ExampleModal = ({ item, setStates, agenda, seTsuggested }) => {
    const [titelinput, setTitelinput] = useState("");
    const [subinput, setSubinput] = useState("");
    const [subsubinput, setsubSubinput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rescreate, apiMethodcreate] = usePost();
    const [resUpdate, apiMethodUpdate] = usePost();
    const { translations } = useContext(MainTranslationContexts)
    const [timelineShow, setTimelineShow] = useState('1')
    const { id } = useParams();
    const { permissions } = useContext(MainAuthPermissionsContext);
    const [editorvalue, seteditorvalue] = useState('')
    const [file, setFile] = useState(null);
    const [resDeleteagenda, apiMethodDeleteAgenda] = usePost();
    const API_URL = "https://77em4-8080.sse.codesandbox.io";
    const UPLOAD_ENDPOINT = "upload_files";

    useEffect(() => {
        if (rescreate.data) {
            if (agenda === 'agenda') {
                setStates(rescreate.data)
            }
        }
    }, [rescreate.data])
    useEffect(() => {
        if (rescreate.data) {
            if (agenda === 'suggested') {
                seTsuggested(rescreate.data)
            }
        }
    }, [rescreate.data])
    useEffect(() => {
        if (resDeleteagenda.data) {
            setStates(resDeleteagenda.data)
        }
    }, [resDeleteagenda.data])
    const handleCloseModal = () => setShowModal(false);
    const handleShowEditModal = () => {
        console.log('sss')
        setShowModal(true)
    };
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    function geteditvalues(e) {
        let updatedata = new FormData()
        updatedata.append("item_id", item.db_id);
        updatedata.append("meeting_id", id);
        updatedata.append("item_user", permissions?.id);
        updatedata.append("item_title", e);
        updatedata.append("uMeet29", 'typeAgendaItemTitle');
        updatedata.append("typeAgendaItemTitle", 'typeAgendaItemTitle');
        apiMethodcreate("postUpdateTitleAgenda", updatedata);
        setTitelinput(e)
    }
    function geteditvalues3(item) {
        if (subinput === '') {
            swal({
                position: "center",
                icon: "error",
                title: "Fields are empty!",
                showConfirmButton: false
            });
        } else {
            let updatedata = new FormData()
            updatedata.append("item_id", item.db_id);
            updatedata.append("meeting_id", id);
            updatedata.append("item_user", permissions?.id);
            updatedata.append("sub_item_title", subinput);
            updatedata.append("uMeet27", 'typeAgendaEditSbItemTitle');
            updatedata.append("typeAgendaEditSbItemTitle", 'typeAgendaEditSbItemTitle');
            apiMethodcreate("postUpdateSubTitleAgenda", updatedata);
            swal({
                position: "center",
                icon: "success",
                title: "Edit Successful",
                showConfirmButton: false
            })
        }
    }
    const handleInputChange2 = (event) => {
        setSubinput(event.target.value);
    }
    const handleInputChange3 = (event) => {
        setsubSubinput(event.target.value);
    }
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("files", file);
                        // let headers = new Headers();
                        // headers.append("Origin", "http://localhost:3000");
                        fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                            method: "post",
                            body: body,
                            // mode: "no-cors"
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({
                                    default: `${API_URL}/${res.filename}`,
                                });
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            },
        };
    }
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }
    const decUpdate = () => {
        let updatedata = new FormData()
        updatedata.append("item_id", item.db_id);
        updatedata.append("meeting_id", id);
        updatedata.append("item_user", permissions?.id);
        updatedata.append("uMeet26", 'typeAgendaEditDesc');
        updatedata.append("typeAgendaEditDesc", 'typeAgendaEditDesc');
        updatedata.append("item_description", editorvalue);
        apiMethodUpdate("postUpdateDescriptionAgenda", updatedata);
    }
    const deleteAgenda = (item) => {
        swal({
            text: 'Are you sure to delete the Agenda?',
            icon: "warning",
            buttons: ["Close", true],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let delData = new FormData();
                delData.append('item_id', item.db_id)
                delData.append('meeting_id', id)
                delData.append('item_user', permissions?.id)
                delData.append('uMeet23', 'typeAgendaRem')
                delData.append('typeAgendaRem', 'typeAgendaRem')
                apiMethodDeleteAgenda("postDeletedAgenda", delData);
            }
        })

    }
    return (
        <>
            <button
                type="button"
                className="icon medit border-0  bg-none "
                onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-pen"></i>
            </button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <label className="modal-labels my_labels">
                                <label>Agenda Title</label>
                                <input
                                    defaultValue={item.item_title}
                                    type="text"
                                    className="form-control agenda1appendinputmin"
                                    name="example-text-input"
                                    placeholder="What do you wand to discuss?"
                                    onChange={(event) => {

                                        geteditvalues(event.target.value);
                                    }}
                                />
                                <div className="my_tabs">
                                    <ul className="nav nav-tabs page-header-tab">
                                        <li className="nav-item">
                                            <Link onClick={() => setTimelineShow('1')} className={`nav-link ${timelineShow === '1' ? 'active' : ''}`} data-toggle="tab">Description</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link onClick={() => setTimelineShow('2')} className={`nav-link ${timelineShow === '2' ? 'active' : ''}`} data-toggle="tab">Sub Items</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link onClick={() => setTimelineShow('3')} className={`nav-link ${timelineShow === '3' ? 'active' : ''}`} data-toggle="tab">Files</Link>
                                        </li>
                                    </ul>

                                </div>
                            </label>{" "}
                        </Col>
                    </Row>
                    <Row>
                        {timelineShow === '1' &&
                            <Col xs={12} md={12} lg={12}>
                                <div>
                                    <h6>Description</h6>
                                    <CKEditor
                                        config={{
                                            extraPlugins: [uploadPlugin],
                                        }}
                                        editor={ClassicEditor}
                                        onReady={(editor) => { }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            seteditorvalue(data, event, editor);
                                        }}
                                    />
                                </div>
                            </Col>}
                        {timelineShow === '2' &&
                            <Col>
                                <h6>Sub-items (Agenda)</h6>
                                {item.sub_items && Array.isArray(item.sub_items) && item.sub_items.map((item, index) => {
                                    return (
                                        <div key={index} className="tab-pane fadeIn active" id="agenda_sub_items" aria-expanded="false">
                                            <div className="input-group mb-1 _sub_item_agenda_">
                                                <input
                                                    onChange={handleInputChange2}
                                                    type="text"
                                                    className="form-control agenda1appendinputtxt"
                                                    name="example-text-input"
                                                    defaultValue={item.item_title}
                                                />
                                                <div className="input-group-append">
                                                    <button onClick={() => geteditvalues3(item)} type="button" className="btn btn-default sub_item_agenda" data-row="261"><i className="fa fa-save"></i></button>
                                                    <button onClick={() => deleteAgenda(item)} type="button" className="btn btn-red rsub_item_aganda" data-row="261"><i className="fa fa-trash"></i></button>
                                                </div>
                                            </div>
                                            {item.sub_items && Array.isArray(item.sub_items) && item.sub_items.map((item, index) => {
                                                return (
                                                    <div key={index} className="input-group mb-1 _sub_item_agenda_">
                                                        <input
                                                            onChange={handleInputChange3}
                                                            type="text"
                                                            className="form-control agenda1appendinputtxt sub_item_agenda_ sub_sub_item_agenda_"
                                                            name="example-text-input"
                                                            defaultValue={item.item_title}
                                                        />
                                                        <div className="input-group-append">
                                                            <button onClick={() => geteditvalues3(item)} type="button" className="btn btn-default sub_item_agenda" data-row="267"><i className="fa fa-save"></i></button>
                                                            <button onClick={() => deleteAgenda(item)} type="button" className="btn btn-red rsub_item_aganda" data-row="267"><i className="fa fa-trash"></i></button>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    )
                                })}

                            </Col>
                        }

                        {timelineShow === '3' &&
                            <Col>
                                <div>
                                    <label htmlFor="file-input">Choose file </label>  <input id="file-input" type="file" onChange={handleFileChange} />
                                    {file && <p>Selected file: {file.name}</p>}
                                </div>
                            </Col>}
                    </Row>
                </Modal.Body>

                {timelineShow === '1' &&
                    <Modal.Footer>
                        <Button onClick={decUpdate} variant="primary">
                            {" "}
                            <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Update Description')}
                        </Button>
                    </Modal.Footer>}
                {timelineShow === '3' &&
                    <Modal.Footer>
                        <Button onClick={geteditvalues} variant="primary">
                            {" "}
                            <FaSave style={{ fontSize: 16 }} /> {Translation(translations, 'Upload Media ')}
                        </Button>
                    </Modal.Footer>
                }

            </Modal>
        </>
    );
};

export default ExampleModal;