import React, { useContext, useState, useEffect } from "react";
import useFetch from "../customHooks/useFetch";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Translation } from "../components/Translation";
import Loader from "../components/common/Loading";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import usePost from "../customHooks/usePost";
import { Pagination } from 'antd';
import { getTokenSession } from "../utils/common";

import swal from "sweetalert";
import config from "../services/config.json"
import { MainHeadingContext } from "../context/MainHeadingContext";
import SearchModal from "./SearchModal";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { toast } from "react-toastify";
export default function Allcustomfield() {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts)
  const { addHeading } = useContext(MainHeadingContext);
  const [CustomFieldData, setCustomFieldData] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [resdata, apiMethoddata] = usePost();
  const [field, setfield] = useState();
  const [pipeline, setpipeline] = useState();
  const [pagination, setpagination] = useState(true);
  const [pagination1, setpagination1] = useState(false);
  const [module, setmodule] = useState();
  const [reqfield, setreqfield] = useState();

  const [limit, setlimit] = useState();
  const [totalleads, settotalleads] = useState();
  const [limit1, setlimit1] = useState();
  const [totalleads1, settotalleads1] = useState();
  const [resdeleteMethod1, apiMethod1] = usePost();
  const [datas, setDatas] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: customData, loading, error } = useFetch({ setDatas }, 'getAllCustomFields');
  useEffect(() => {
    addHeading(`Custom Fields`);
  }, [customData]);

  const navigate = useNavigate();
  useEffect(() => {
    if (leadPermission) {
      if (leadPermission?.custom_fields?.view === "0" || leadPermission?.custom_fields?.active_module === "0") {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  useEffect(() => {
    if (customData) {
      setCustomFieldData(customData.CustomFields)
      console.log(customData.CustomFields[0]?.pagination.total_record)
      settotalleads(customData.CustomFields[0]?.pagination.total_record)
      setlimit(customData.CustomFields[0]?.pagination.limit)
      if (!customData.CustomFields[0]?.pagination) {
        setpagination(false)
      }
    }
  }, [customData])


  const handleDelete = (item) => {
    let deleteData = new FormData();
    deleteData.append("id", item.id);
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        apiMethod1(`postDeleteCustomFields`, deleteData);
        setCustomFieldData(CustomFieldData.filter(deleteItem => deleteItem.id !== item.id))
      }
    });
  }
  function submit2(page, pageSize) {

    const formdata = new FormData();

    formdata.append('page', page);
    formdata.append('cf_sr', 'sr_cf_stg');
    formdata.append('sr-lvl', field);
    formdata.append('sr-stg', pipeline);
    formdata.append('sr-mod', module);
    formdata.append('sr-req', reqfield);

    apiMethoddata('postSearchCustomFields', formdata);

  }
  useEffect(() => {
    if (resdata?.data) {
      setCustomFieldData(resdata?.data)
      if (resdata?.data.message) {
        setpagination(false)
        setpagination1(false)
      }

    }
  }, [resdata.data])
  function submit1(page, pageSize) {

    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllCustomFields/${page}`)
      .then((response) => {
        if (!response.data.CustomFields.message) {
          setCustomFieldData(response.data.CustomFields)
          setCurrentPage(page);
        }

      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }

  useEffect(() => {
    if (resdeleteMethod1.data) {
      resdeleteMethod1.data.message && toast.success(resdeleteMethod1.data.message);
    }
  }, [resdeleteMethod1.data])

  if (loading) return <Loader />

  return (
    <div className="container-fluid">
      {showModal && <SearchModal setfield={setfield} setlimit1={setlimit1} settotalleads1={settotalleads1} setpagination={setpagination} setpagination1={setpagination1} setpipeline={setpipeline} setmodule={setmodule} setreqfield={setreqfield} ModalState={setShowModal} ModalShow={showModal} setCustomFieldData={setCustomFieldData} />}

      <div className="card">
        <div className="card-header borderblue">
          <h3 className="card-title">
            {Translation(translations, "All Custom Field")}
          </h3>
          <div className="card-options">
            <Link to={`/${config.ddemoss}change/stages`} className="bg-primary p-2 rounded-2 text-white" >
              {Translation(translations, "change stage")}
            </Link>
            <Link
              onClick={() => setShowModal(true)}
              className="btn-btn-primary btn-sm btn-new"
              data-toggle="tooltip"
              data-placeme
            >
              <FaSearch />
            </Link>
            {
              (leadPermission?.super_admin == "1" || leadPermission?.custom_fields?.create == "1") &&
              <Link className="btn btn-primary btn-sm btn-new" to={`/${config.ddemoss}createcustomfield`}>
                <FaPlus />
              </Link>
            }

          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-vcenter table-striped dataTable td-align-middle">
              <thead>
                <tr>
                  <th>{Translation(translations, "Name")}</th>
                  <th>{Translation(translations, "Type")}</th>
                  <th>{Translation(translations, "Level")}</th>
                  <th>{Translation(translations, "Stage")}</th>
                  <th>{Translation(translations, "Module")}</th>
                  <th>{Translation(translations, "Pipeline")}</th>
                  <th>{Translation(translations, "Required")}</th>
                  <th>{Translation(translations, "Action")}</th>
                </tr>
              </thead>
              <tbody>
                <React.Fragment>
                  {Array.isArray(CustomFieldData) && CustomFieldData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span className="c_name">
                            {Translation(translations, item.name)}
                          </span>
                        </td>
                        <td>
                          <span>
                            {Translation(translations, item.type)}
                          </span>
                        </td>
                        {item.level == 1 ? (
                          <td>
                            <span>{Translation(translations, 'Field')}</span>
                          </td>
                        ) : item.level == 2 ? (
                          <td>
                            <span>{Translation(translations, 'Group')}</span>
                          </td>
                        ) : item.level == 3 ? (
                          <td>
                            <span>{Translation(translations, 'Tab')}</span>
                          </td>
                        ) : null}

                        <td>
                          <span>
                            {Translation(translations, item.stage_name)}
                          </span>
                        </td>
                        <td>
                          <span>
                            {Translation(translations, item.module)}
                          </span>
                        </td>

                        {
                          item.module === "Opportunity" || item.module === 'Project' || item.module === 'Follow Up' || item.module === 'Action' || item.module === 'Meeting' ?
                            <td>
                              <span>
                                {Translation(translations, item.pipeline_name)}
                              </span>
                            </td> : <td>
                              <span>
                                {Translation(translations, item.pipeline)}
                              </span>
                            </td>
                        }

                        < td >
                          <span>
                            {Translation(translations, item.field_required)}
                          </span>
                        </td>
                        <td>
                          <OverlayTrigger
                            placement={"top"}
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                View
                              </Tooltip>
                            }
                          >
                            <Link to={`/${config.ddemoss}custom_field/edit/${item.id}`} className="btn btn-icon btn-sm bsm btn-blue" style={{ backgroundColor: '#1E90FF' }}>
                              <i className="fa fa-pencil fa-lg" />
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement={"top"}
                            overlay={
                              <Tooltip id={`tooltip-top`}>
                                Delete
                              </Tooltip>
                            }
                          >
                            <Link onClick={() => handleDelete(item)} className="btn btn-icon btn-red bsm" style={{ backgroundColor: '#dc3545' }}>
                              <i className="fa fa-trash fa-lg" />
                            </Link>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    )
                  })}

                </React.Fragment>
              </tbody>
            </table>
            {pagination && <Pagination current={currentPage} defaultCurrent={1} pageSize={Number(limit)} defaultPageSize={5} total={totalleads} onChange={submit1} />}
            {pagination1 && <Pagination defaultCurrent={1} pageSize={Number(limit1)} defaultPageSize={5} total={totalleads1} onChange={submit2} />}
          </div>
        </div>
      </div >
    </div >
  );
}