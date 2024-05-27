import React, { useContext, useState, useEffect, useRef } from "react";
import config from "../services/config.json";
import usePost from "../customHooks/usePost";
import { Pagination2 } from "../pagination";
import { useNavigate } from 'react-router-dom';
import { MainHeadingContext } from "../context/MainHeadingContext";
import Loader from "../components/common/Loading";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from '../components/Translation';
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
function Auth_History() {
    const { leadPermission } = useContext(MainLeadPermissionContext);
    const [resdata, apiMethoddata] = usePost();
    const navigate = useNavigate();
    const isComponentMounted = useRef(true);
    const [limit, setlimit] = useState(15);
    const [startFrom, setstartFrom] = useState(1);
    const [signIn, setSignin] = useState(false);
    const [login, setLogin] = useState(true);
    const [signout, setSignOut] = useState(false);
    const [length, setlength] = useState();
    const { addHeading } = useContext(MainHeadingContext);
    const { translations } = useContext(MainTranslationContexts)
    useEffect(() => {
        if (leadPermission) {
            addHeading(`Login History`);
            if (leadPermission?.user_module?.active_module === "0" || leadPermission?.user_module?.view === "0") {
              navigate(`/${config.ddemoss}`);
            }
          }
        }, [leadPermission]);
    useEffect(() => {
        if (isComponentMounted.current) {
            const formData = new FormData();
            formData.append('limit', limit);
            formData.append('startfrom', startFrom);
            apiMethoddata('postLoginHistory', formData);
        }
        return () => {
            isComponentMounted.current = false;
        };

    }, [])
    useEffect(() => {
        if(login === true){
            const formData = new FormData();
            formData.append('limit', limit);
            formData.append('startfrom', startFrom);
            apiMethoddata('postLoginHistory', formData);
        }
    }, [startFrom || limit])
    useEffect(() => {
        if(signIn === true){
            const formData = new FormData();
            formData.append('limit', limit);
            formData.append('startfrom', startFrom);
            apiMethoddata('postLoginUserSignInHistory', formData);
        }
    }, [startFrom || limit])
    useEffect(() => {
        if(signout === true){
            const formData = new FormData();
            formData.append('limit', limit);
            formData.append('startfrom', startFrom);
            apiMethoddata('postLogoutUserHistory', formData);
        }
    }, [startFrom || limit])

    useEffect(() => {
        if (resdata.data) {
            const length = resdata.data.count;
            setlength(length)
            console.log("res", length)
        }
    }, [resdata.data])

    const paginate = (pageNumber) => {
        console.log("fun", pageNumber)
        if (pageNumber > 0) {
            setstartFrom(parseInt(pageNumber) * 15 - 14);
        }
    }
    const handleViewSignin = (e) => { 
        let loginBtn = document.querySelectorAll(".loginBtn");
        for (let index = 0; index < loginBtn.length; index++) {
            loginBtn[index].classList.remove("active");
        }
        e.target.classList.add("active");
            const formData = new FormData();
            formData.append('limit', limit);
            formData.append('startfrom', startFrom);
            apiMethoddata('postLoginUserSignInHistory', formData);
            setLogin(false)
            setSignOut(false)
            setSignin(true)
    }
    const handleAllhistory = (e) => { 
        let loginBtn = document.querySelectorAll(".loginBtn");
        for (let index = 0; index < loginBtn.length; index++) {
            loginBtn[index].classList.remove("active");
        }
        e.target.classList.add("active");
            const formData = new FormData();
            formData.append('limit', limit);
            formData.append('startfrom', startFrom);
            apiMethoddata('postLoginHistory', formData);
            setSignOut(false)
            setSignin(false)
            setLogin(true)
    }
    const handleViewSignOut = (e) => { 
        let loginBtn = document.querySelectorAll(".loginBtn");
        for (let index = 0; index < loginBtn.length; index++) {
            loginBtn[index].classList.remove("active");
        }
        e.target.classList.add("active");
        const formData = new FormData();
        formData.append('limit', limit);
        formData.append('startfrom', startFrom);
        apiMethoddata('postLogoutUserHistory', formData);
        setLogin(false)
        setSignin(false)
        setSignOut(true)
}

        if (!resdata.data) return <Loader />
        return (
            <div className="section-body mt-3">
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-12">
                            <div className="card">
                                <div className="table-responsive borderblue">
                                    <table className="table table-hover table-vcenter mb-0 text-nowrap">
                                        <thead>
                                            <tr>
                                                <td colSpan={3}> {Translation(translations, "Login History")}</td>
                                               <td  colSpan={2}>
                                                <div className="d-flex justify-content-end gap-3">
                                                <button className="btn btn-outline-secondary loginBtn" onClick={handleViewSignin} >View Sign-In</button>
                                                <button className="btn btn-outline-secondary loginBtn" onClick={handleViewSignOut} >View Sign-Out</button>
                                                <button className="btn btn-outline-secondary loginBtn active" onClick={handleAllhistory} >All History</button>
                                                </div>
                                               </td>
                                            </tr>
                                            <tr>
                                                <th>{Translation(translations, "User Name")}</th>
                                                <th>{Translation(translations, "User IP Address")}</th>
                                                <th>{Translation(translations, "Sign-in Time")}</th>
                                                <th>{Translation(translations, "Sign-out Time")}</th>
                                                <th>{Translation(translations, "Status")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                resdata.data && resdata.data.data.map((value, i) => {
                                                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                                    let signDay = "";
                                                    let signMonth = "";
                                                    let signYear = "";
                                                    let signhours = "";
                                                    let signMin = "";
                                                    let signoutMonth = "";
                                                    let signoutDay = "";
                                                    let signoutYear = "";
                                                    let signouthours = "";
                                                    let signoutMin = "";
                                                    if (value?.user_sign_in_time) {
                                                        let signDate = new Date(value?.user_sign_in_time)
                                                        signMonth = months[signDate.getMonth()]
                                                        signDay = signDate.getDate()
                                                        signYear = signDate.getFullYear()
                                                        signhours = signDate.getHours()
                                                        signMin = signDate.getMinutes()
                                                    }
                                                    if (value?.user_sign_out_time) {
                                                        let signoutDate = new Date(value?.user_sign_out_time)
                                                        signoutMonth = months[signoutDate.getMonth()]
                                                        signoutDay = signoutDate.getDate()
                                                        signoutYear = signoutDate.getFullYear()
                                                        signouthours = signoutDate.getHours()
                                                        signoutMin = signoutDate.getMinutes()
                                                    }
                                                    return (
                                                        <tr key={i}>
                                                            <td>{value.user_name}</td>
                                                            <td>{value.user_ip_address}</td>
                                                            <td>{value.user_sign_in_time && `${signMonth && `${signMonth}-`}${signDay && `${signDay > 9 ? signDay : `0${signDay}`}-`}${signYear && `${signYear}`}  ${signhours > 9 ? signhours : `0${signhours}`}:${signMin > 9 ? signMin : `0${signMin}`} ${signhours > 11 ? "PM" : "AM"} `}</td>
                                                            <td>{value.user_sign_out_time && `${signoutMonth && `${signoutMonth}-`}${signoutDay && `${signoutDay > 9 ? signoutDay : `0${signoutDay}`}-`}${signoutYear && `${signoutYear}`}  ${signouthours > 9 ? signouthours : `0${signouthours}`}:${signoutMin > 9 ? signoutMin : `0${signoutMin}`} ${signouthours > 11 ? "PM" : "AM"} `}</td>
                                                            <td>{value.user_sign_out_time ? "Signed Out" : "Signed In"}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <nav aria-label="Page navigation example">

                                <ul className="pagination justify-content-start">

                                    <Pagination2 postsPerpage={(value) => setlimit(value)} totalpost={length} paginate={paginate} />



                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        );
    
}

export default Auth_History;