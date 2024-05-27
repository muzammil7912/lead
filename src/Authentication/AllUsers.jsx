import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/common/Loading";
import useFetch from "../customHooks/useFetch";
import allData from "../Data/data";
import { Translation } from "../components/Translation";
import { getTokenSession, removeTokenSession } from "../utils/common";
import swal from "sweetalert";
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import config from "../services/config.json";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";


function AllUsers() {
  const [limit, setlimit] = useState();
  const [totalleads, settotalleads] = useState();
  const navigate = useNavigate();
  const { translations } = useContext(MainTranslationContexts);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { addHeading } = useContext(MainHeadingContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (leadPermission) {
      addHeading(`All Users`);
      if ((leadPermission?.user_module?.view === "0" || leadPermission?.user_module?.active_module === "0")) {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  const [datas, setDatas] = useState("");
  const { data: allusers, loading } = useFetch({ setDatas }, "getAllUsers");
  useEffect(() => {
    if (datas) {
      console.log(datas)
      settotalleads(datas[0]?.pagination?.total_record)
      setlimit(datas[0]?.pagination?.limit)
    }

  }, [datas]);
  function submit1(page, pageSize) {
    console.log(page);
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllUsers/${page}`)
      .then((response) => {
        setDatas(response.data)
        setCurrentPage(page);
      })
      .catch((err) => {
        console.log('eerr', err)
      })
  }
  if (loading) return <Loader />;

  const handleDelete = (item) => {
    const targetid = parseInt(item.id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        axios.defaults.headers = {
          "Content-Type": "multipart/form-data",
          authentication: `${getTokenSession()}`,
        };
        axios
          .post(`${config.apiEndPoint}deleteUser/`, {
            userId: parseInt(targetid),
          })
          .then((response) => {
            swal(response.data.message);
            // setDatas(datas.filter((item) => item.id != targetid));
            const filteruser = datas.filter((item) => item.id != targetid);
            if (filteruser.length === 0) {
              console.log("empty");
              if (currentPage > 0) {
                if (currentPage == 1) {
                  submit1(currentPage)
                }
                submit1(currentPage - 1)
              }
            } else {
              console.log(filteruser, "filter");
              setDatas(filteruser)
            }
          })
          .catch((error) => {
            if (error?.response?.status === 500) {
              removeTokenSession("token");
            } else if (error?.response?.status === 401) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Something went wrong. Please try again later.");
            }
          });
      }
    });

  };

  return (
    <div className="allUsers">
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-12">
            <div className="card">
              <div className="card-header borderblue">
                <h3 className="card-title">
                  {Translation(translations, "All Users")}
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover js-basic-example dataTable table_custom border-style spacing5 td-align-middle">
                    <thead>
                      <tr>
                        {allData.AllUsersPage.tableHead.map((item, index) => {
                          return <td key={index}>{item.label}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(datas) && datas.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <img
                                src={item?.avatar ? item?.avatar.includes("http") ? item?.avatar : `${config.baseurl2}${item?.avatar}` : "https://www.gravatar.com/avatar/b39d3037b9a666e9944ac081e76e3e28?s=160"}
                                className="rounded img-fluid"
                                width="45"
                              />
                              <span className="c_name">
                                {Translation(translations, `${item?.f_name} ${item?.l_name}`)}
                              </span>
                            </td>
                            <td>
                              <span>{item?.email}</span>
                            </td>
                            <td>
                              <span>
                                {item?.role}
                              </span>
                              <div>
                                <small>
                                  {item?.role_name}
                                </small>
                              </div>
                            </td>
                            <td>
                              <span>
                                {Translation(
                                  translations,
                                  `${item?.utype.toLowerCase().replace(/(^|_|\s)\S/g, (letter) => letter.toUpperCase()).replace(/_/g, ' ')}`
                                )}
                              </span>
                            </td>
                            <td>
                              <span>
                                <i className="fa fa-map-envelope"></i>
                                {item.userstatus && item.userstatus == 1
                                  ? "Active"
                                  : "NonActive"}
                              </span>
                            </td>
                            <td>
                              {item.id !== "1" && (
                                <div className="d-flex gap-1 align-item-center">
                                  {leadPermission?.super_admin || leadPermission?.user_module?.edit === "1" ? (
                                    <>
                                      <Link
                                        to={`edit/${item.id}`}
                                        className="btn btn-primary btn-sm"
                                        title="Edit"
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Link>
                                    </>
                                  ) : null}
                                  <a
                                    href={`/${config.ddemoss}signature/${item.id}`}
                                    className="btn btn-outline-secondary btn-sm"
                                    title="View Signature"
                                    target={"_blank"}
                                  >
                                    <i className="fa fa-vcard"></i>
                                  </a>

                                  {leadPermission?.super_admin || leadPermission?.user_module?.delete === "1" ? (
                                    <button
                                      onClick={() => handleDelete(item)}
                                      className="btn btn-danger btn-sm btn-smd"
                                      title="Delete"

                                    >
                                      <i className="fa fa-trash-o"></i>
                                    </button>
                                  ) : null}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination current={currentPage} defaultCurrent={1} pageSize={Number(limit)} defaultPageSize={5} total={totalleads} onChange={submit1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default AllUsers;
