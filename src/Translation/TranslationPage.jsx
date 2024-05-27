import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import config from "../services/config.json";
import useFetch from "../customHooks/useFetch";
import NewLangModal from "../NewLangModal";
import NewLangVarModal from "../NewLangVarModal";
import swal from "sweetalert";
import axios from "axios";
import { Pagination } from 'antd';
import { getTokenSession } from "../utils/common";
import { toast } from "react-toastify";
import usePost from "../customHooks/usePost";
import { MainHeadingContext } from "../context/MainHeadingContext";
import { MainTranslationContext } from "../context/MainTranslationContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { Translation } from "../components/Translation";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";

function TranslationPage() {
  const navigate = useNavigate();
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { transData, addData } = useContext(MainTranslationContext);
  const { translations } = useContext(MainTranslationContexts);
  const [pagination, setpagination] = useState(true);
  const [limit, setlimit] = useState();
  const [totalleads, settotalleads] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (leadPermission) {
      addHeading(`Translation`);
      if (leadPermission?.translate_module?.view === "0" || leadPermission?.translate_module?.active_module === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  const [resdelete, apiMethoddelete] = usePost();
  useEffect(() => {
    if (transData) {
      console.log(transData)
      setlimit(transData[0]?.pagination?.limit)
      settotalleads(transData[0]?.pagination?.total_record)

    }
  }, [transData]);

  function handleDelete(values) {
    let valdelate = new FormData();
    valdelate.append("submit", "delete");
    let bodyContent = valdelate;
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethoddelete(`postDeleteLanguage/${values.lang_id}`, bodyContent);
        addData(transData.filter((item) => item.lang_id !== values.lang_id));
      }
    });
  }
  useEffect(() => {
    if (resdelete.data && !resdelete.isLoading) {
      resdelete.data.message && toast.success(resdelete.data.message);
    }
  }, [resdelete.data]);
  function submit1(page, pageSize) {


    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllLanguages/${page}`)
      .then((response) => {
        if (!response.data.message) {
          addData(response.data)
          setCurrentPage(page);

        }
        else {
          setpagination(false)
        }

      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }


  return (
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-12">
          <div className="card">
            <div className="card-header borderblue d-lg-flex justify-content-between ">
              <h3 className="card-title">{`${Translation(translations, "Translation")}`}</h3>
              <div className="card-options">
                {leadPermission?.super_admin || leadPermission?.translate_module?.create === "1" ? (
                  <Dropdown className="item-action dropdown ml-2">
                    <Dropdown.Toggle
                      className="btn btn-primary btn-sm p-2"
                    >
                      <i className="fa fa-plus"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className=" dropdown-menu-right">
                      <button className="dropdown-item btn-new w-100 m-0">
                        <i className="dropdown-icon fa fa-plus"></i>{" "}
                        <NewLangModal />
                      </button>

                      <button className="dropdown-item btn-var-new w-100 m-0">
                        <i className="dropdown-icon fa fa-plus"></i>{" "}
                        <NewLangVarModal />
                      </button>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : null}
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-vcenter table-striped dataTable td-align-middle">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transData ? (
                      transData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <img
                                className="avatar"
                                src={`${config.baseurl}assets/flags/${item?.lang_image}`}
                                alt={`${item?.lang_name}`}
                                data-toggle="tooltip"
                                data-placement="right"
                              />
                            </td>
                            <td>{item?.lang_name} </td>
                            <td>
                              {leadPermission?.super_admin || leadPermission?.translate_module?.edit === "1" ? (
                                <Link
                                  to={`/${config.ddemoss}translation/edit/${item.lang_id}`}
                                  className="btn btn-primary btn-sm"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>
                              ) : null}
                              {leadPermission?.super_admin && item.lang_id !== "31" || leadPermission?.translate_module?.delete === "1" && item.lang_id !== "31" ? (
                                <button
                                  onClick={() => handleDelete(item)}
                                  className="btn btn-danger btn-sm delete_lang mx-1"
                                  title="Delete"
                                >
                                  <i className="fa fa-trash-o"></i>
                                </button>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {pagination && <Pagination current={currentPage} defaultCurrent={1} pageSize={Number(limit)} defaultPageSize={5} total={totalleads} onChange={submit1} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranslationPage;
