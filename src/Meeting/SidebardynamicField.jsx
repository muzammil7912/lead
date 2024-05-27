import React, { useState, useEffect } from "react";
import swal from 'sweetalert';
import usePost from "../customHooks/usePost";
import { useParams } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Submodal from "./EditSubmodal";
import axios from "axios";
import config from "../services/config.json";
import { handleFullScreen } from "../components/AllCustomFuntion";

function Decisions({ item, icon, title, setMeeting, count, notvoted, voted }) {
    const [inputValue, setInputvalue] = useState('')
    const [inputValueInvote, setInputvalueInvote] = useState('')
    const [resCreate, apiMethodCreate] = usePost();
    const { id } = useParams()
    const [resDel, apiMethodDelete] = usePost();
    const [itemId, setItemId] = useState(item)
    const [showModal, setShowModal] = useState(false)
    const [resMove, apiMethodDown] = usePost();
    const [resMove2, apiMethodDown2] = usePost();
    const handleShowModal = () => setShowModal(true);
    useEffect(() => {
        if (resCreate) {
            setMeeting(resCreate.data)
        }
    }, [resCreate.data])
    useEffect(() => {
        if (resDel) {
            setMeeting(resDel.data)
        }
    }, [resDel])
    useEffect(() => {
        if (resMove) {
            setMeeting(resMove.data)
        }
    }, [resMove])
    const handleToggle = (e) => {
        e.preventDefault();
        let closestCard = e.target.closest(".card");
        if (closestCard.classList.contains("card-collapsed")) {
            closestCard.classList.remove("card-collapsed");
        } else {
            closestCard.classList.add("card-collapsed");
        }
    };
    const handleCreate = () => {
        if (inputValue === '') {
            swal({
                position: "center",
                icon: "error",
                title: "Fields are empty!",
                showConfirmButton: false
            });
        } else {
            let form = new FormData()
            console.log(item)
            form.append('meeting_id', id)
            form.append('item_title', inputValue)
            form.append('followup_id', item.pipline_id)
            form.append('uMeet9', 'typeFollowupVote')
            form.append('typeFollowupVote', 'typeFollowupVoteTag')
            apiMethodCreate('postCreateDecisions', form)
            swal({
                position: "center",
                icon: "success",
                title: "Create Successful!",
                showConfirmButton: false
            });
        }
    }
    const handleCreateInvote = () => {
        if (inputValueInvote === '') {
            swal({
                position: "center",
                icon: "error",
                title: "Fields are empty!",
                showConfirmButton: false
            });
        } else {
            let form = new FormData()
            form.append('meeting_id', id)
            form.append('item_title', inputValueInvote)
            form.append('followup_id', item.pipline_id)
            form.append('uMeet13', 'typeFollowupidVoted')
            form.append('typeFollowupidVoted', 'typeFollowupidVoted')
            apiMethodCreate('postCreateVotedDecisions', form)
            swal({
                position: "center",
                icon: "success",
                title: "Create Successful!",
                showConfirmButton: false
            });
        }
    }
    const handleDelete = (item) => {
        swal({
            position: "center",
            icon: "error",
            title: "Are you sure do you want to delete!",
            showConfirmButton: false,
            buttons: ["Close", true],
        }).then((willDelete) => {
            if (willDelete) {
                let form = new FormData()
                form.append('meeting_id', id)
                form.append('vote_id', `${item.item_id}:${itemId.pipline_id}`)
                form.append('uMeet11', 'typeFollowupVoteDlt')
                form.append('typeFollowupVoteDlt', 'typeFollowupVoteDlt')
                apiMethodDelete('postDeletedDecisions', form)
                swal({
                    position: "center",
                    icon: "success",
                    title: "Delete Successful!",
                    showConfirmButton: false
                });
            }
        })
    }
    const handleDeleteInvote = (item) => {
        swal({
            position: "center",
            icon: "error",
            title: "Are you sure do you want to delete!",
            showConfirmButton: false,
            buttons: ["Close", true],
        }).then((willDelete) => {
            if (willDelete) {
                let form = new FormData()
                form.append('meeting_id', id)
                form.append('vote_id', `${item.item_id}:${itemId.pipline_id}`)
                form.append('uMeet11', 'typeFollowupVoteDlt')
                form.append('typeFollowupVoteDlt', 'typeFollowupVoteDlt')
                apiMethodDelete('postDeletedDecisions', form)
                swal({
                    position: "center",
                    icon: "success",
                    title: "Delete Successful!",
                    showConfirmButton: false
                });
            }
        })
    }
    const handleDown = (item) => {
        let form = new FormData()
        console.log(item)
        form.append('meeting_id', id)
        form.append('vote_id', `${item.item_id}:${itemId.pipline_id}`)
        form.append('uMeet12', 'typeFollowupDownVote')
        form.append('typeFollowupDownVote', 'typeFollowupDownVote')
        apiMethodDown('postMoveDwnDecisions', form)
    }
    const handelVotedDown = (item) => {
        let form = new FormData()
        console.log(item)
        form.append('meeting_id', id)
        form.append('ids', `${item.item_id}:${itemId.pipline_id}`)
        form.append('uMeet15', 'typeFollowupDwnVoteCast')
        form.append('typeFollowupDwnVoteCast', 'typeFollowupDwnVoteCast')
        axios.post(`${config.apiEndPoint}postVotedDwnDecisions`, form
        ).then(response => {
            setMeeting(response.data)
            if (response.data.message === "Already Voted") {
                swal({
                    text: response.data.message,
                    icon: "error",
                    buttons: ["OK", false],
                    dangerMode: true,
                })
            }
        })
            .catch(error => {
                console.log(error);
            });
    }
    const handelVotedUp = (item) => {
        let form = new FormData()
        console.log(item)
        form.append('meeting_id', id)
        form.append('ids', `${item.item_id}:${itemId.pipline_id}`)
        form.append('uMeet14', 'typeFollowupUpVoteCast')
        form.append('typeFollowupUpVoteCast', 'typeFollowupUpVoteCast')
        axios.post(`${config.apiEndPoint}postVotedUpDecisions`, form
        ).then(response => {
            setMeeting(response.data)
            if (response.data.message === "Already Voted") {
                swal({
                    text: response.data.message,
                    icon: "error",
                    buttons: ["OK", false],
                    dangerMode: true,
                })
            }
        })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="card">
            <div className="card-status bg-blue"></div>
            <div className="card-header">
                <h3 className="card-title">
                    <i className={icon}></i> {title} {count}
                    <small>Follow Ups</small>
                </h3>
                <div className="card-options align-item-center">
                    <div className="card-options">
                        <a onClick={handleToggle} className="card-options-collapse nxs" data-toggle="card-collapse" >
                            <i className="fe fe-chevron-down"></i>
                        </a><a onClick={handleFullScreen} className="card-options-fullscreen nxs" data-toggle="card-fullscreen" ><i className="fe fe-maximize"></i></a>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row clearfix">
                    <div className="col-lg-10 col-md-8">
                        <div className="form-group">
                            <input
                                onChange={(e) => setInputvalue(e.target.value)}
                                type="text"
                                className="form-control agenda1appendinputtxt"
                                name="example-text-input"
                                placeholder="What will you decide on?"
                            />
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-2">
                        <button
                            onClick={handleCreate}
                            type="button"
                            className="btn btn-icon btn-primary btn-success agenda1appendbtnadd"
                        >
                            <i className="fe fe-plus"></i>
                        </button>
                    </div>
                    <div className="col-lg-12 col-md-12 mfollowups">
                        <div className="table-responsive">
                            <ul className="right_chat list-unstyled mfollowups14">
                                {notvoted && Object.keys(notvoted).map((itemKey, index) => {
                                    const item = notvoted[itemKey];
                                    return (
                                        <li key={itemKey}>
                                            <div className="media">
                                                <div className="media-body"> <span className="name"><small><i className="fa fa-circle text-green"></i> &nbsp; </small>{item.item_title}</span>
                                                    <span className="message float-right hoverable"><i onClick={() => handleDown(item)} className="fa fa-level-down javascript"></i> &nbsp; <i onClick={() => handleDelete(item)} className="fa fa-trash"></i></span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                In Vote
                <hr className="hrBorder bg-blue" />

                <div className="row clearfix">
                    <div className="col-lg-10 col-md-8">
                        <div className="form-group">
                            <input
                                onChange={(e) => setInputvalueInvote(e.target.value)}
                                type="text"
                                className="form-control agenda1appendinputtxt"
                                name="example-text-input"
                                placeholder="What will you decide on?"
                            />
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-2">
                        <button
                            onClick={handleCreateInvote}
                            type="button"
                            className="btn btn-icon btn-primary btn-success agenda1appendbtnadd"
                        >
                            <i className="fe fe-plus"></i>
                        </button>
                    </div>
                    <div className="col-lg-12 col-md-12 mvotefollowups">
                        <ul className="right_chat list-unstyled mvotefollowups14">
                            {voted && Object.keys(voted).map((itemKey, index) => {
                                const item = voted[itemKey];
                                return (
                                    <li key={index} className="dropdownstyle" >
                                        <div className="media">
                                            <div className="media-body">
                                                <span className="name"><small><i className="fa fa-circle text-blue"></i></small> <span className="item-text">{item.item_title}</span>
                                                    <small className="float-right vtmore">
                                                        <div className="item-action dropdown ml-2">
                                                            <li>
                                                                <Dropdown className="item-action dropdown ml-2">
                                                                    <Dropdown.Toggle className="">
                                                                        <i style={{ "color": '#000' }} className="fe fe-more-vertical"></i>
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={handleShowModal}><Submodal titel={'Manage Vote'} modal={showModal} /></Dropdown.Item>
                                                                        <Dropdown.Item onClick={handleShowModal}><Submodal titel={'Edit'} modal={showModal} /></Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => handleDeleteInvote(item)} > <small className="mag_lef">Delete</small></Dropdown.Item>
                                                                        <Dropdown.Divider />
                                                                        <Dropdown>
                                                                            <Dropdown.Toggle className="dropdown-item myIcon nxs subNested" id="nested-dropdown">
                                                                                <small className="mag_lef">End Vote</small>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item onClick={handleShowModal} ><Submodal titel={'Agree'} modal={showModal} /></Dropdown.Item>
                                                                                <Dropdown.Item onClick={handleShowModal} ><Submodal titel={'Disagree'} modal={showModal} /></Dropdown.Item>
                                                                                <Dropdown.Divider />
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                </div>
                                                            </li>
                                                        </div>
                                                    </small>
                                                </span>
                                                <span className="name mt-2">
                                                    <span onClick={() => handelVotedUp(item)} className="text-vote-arrow vtup">
                                                        <i className="fa fa-caret-up lightBlack_color"></i> <span className="vtup20 lightBlack_color"> {item.voted_number} </span>
                                                    </span>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <span onClick={() => handelVotedDown(item)} className="text-vote-arrow">
                                                        <i className="fa fa-caret-down vtdn lightBlack_color"></i> <span className="vtdn20 lightBlack_color"> {item.unvoted_number} </span>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Decisions;