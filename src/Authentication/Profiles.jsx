
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../services/config.json";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import allData from "../Data/data";
import useFetch from "../customHooks/useFetch";
import { useNavigate } from 'react-router-dom';
import Loader from "../components/common/Loading";
import { Pagination } from 'antd';
import { getTokenSession } from "../utils/common";
import { FaCopy } from "react-icons/fa";
import { Translation } from "../components/Translation";
import { AiOutlineMore } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown';
import { MainHeadingContext } from "../context/MainHeadingContext";
import {MainTranslationContexts} from '../context/MainTranslationContexts';
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";

export default function Profiles() {
  const [limit, setlimit] = useState();
  const [totalleads, settotalleads] = useState();
  const [datas, setDatas] = useState("");
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { data: getAllProfiles, loading } = useFetch({ setDatas }, "getAllProfiles");
  const navigate = useNavigate();
  const { addHeading } = useContext(MainHeadingContext);
  const { translations } = useContext(MainTranslationContexts)
  useEffect(() => {
    if (leadPermission) {
      addHeading(`Profiles`);
        if (!leadPermission?.super_admin) {
          navigate(`/${config.ddemoss}`);
        }
      }
    }, [leadPermission]);
    useEffect(() => {
      if(datas){
        console.log(datas)
        settotalleads(datas[0].pagination.total_record)
        setlimit(datas[0].pagination.limit)
      }
     
      }, [datas]);
      function submit1(page,pageSize){
   
 
        axios.defaults.headers = {
          "Content-Type": "multipart/form-data",
          authentication: `${getTokenSession()}`,
        };
        axios.get(`${config.apiEndPoint}getAllProfiles/${page}`)
          .then((response) => {
          console.log(response.data)
            setDatas(response.data)
           
          })
          .catch((err) => {
            console.log('eerr', err)
          })
      
      }
    if (loading) return <Loader />;
    return (
      <div className="profile">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-12">
              <div className="card">
                <div className="card-header borderblue">
                  <div className="card-title">
                    {Translation(translations, "List of Profile")}
                  </div>
                  <div className="card-options">
                      {(leadPermission?.super_admin || leadPermission?.user_module?.create === "1") ? (
                        <Link
                          to={`/${config.ddemoss}create_profile`}
                          className="btn btn-sm btn-primary bsm-1"
                        >
                          {" "}
                          <FaPlus /> {Translation(translations, "Add Profile")}
                        </Link>
                      ) : null}
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-vcenter mb-0 text-nowrap">
                      <thead>
                        <tr>
                          {allData.ProfilePage.tHead.map((item, index) => {
                            return <td key={index}>{item.label}</td>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {datas && !datas.message && datas.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="card-options">
                                  <Dropdown className="item-action dropdown ml-2">
                                    <Dropdown.Toggle className="btn-c">
                                    <a > <FaCopy /> </a>
                                    {leadPermission?.super_admin || leadPermission?.user_module?.edit === "1" ? (
                                      <a > <AiOutlineMore /> </a>
                                    ) : null}
                                    </Dropdown.Toggle>
                                    {leadPermission?.super_admin || leadPermission?.user_module?.edit === "1" ? (
                                      <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                        <Link
                                          to={`/${config.ddemoss}list_profiles/edit/${item.id}`}
                                          className="dropdown-item"
                                        >
                                          <i className="dropdown-icon fa fa-edit"></i>{" "}
                                          {Translation(translations, "Edit")}{" "}
                                        </Link>
                                      </Dropdown.Menu>
                                    ) : null}
                                  </Dropdown>
                                </div>
                              </td>
                              <td>
                                {" "}
                                {Translation(translations, `${item.profile_name}`)}
                              </td>
                              <td>
                                {" "}
                                {Translation(
                                  translations,
                                  `${item.profile_description}`
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <Pagination defaultCurrent={1} pageSize={Number(limit)} defaultPageSize={5} total={totalleads} onChange={submit1} />  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
