import React, { useState, useEffect, useContext } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Pagination, Radio, Select, Space } from 'antd';
import config from "../services/config.json";
import usePost from "../customHooks/usePost";
import Loader from "../components/common/Loading";
import Role from "../components/Role";
import swal from "sweetalert";
import { MainTranslationContexts } from '../context/MainTranslationContexts'
import { Translation } from "../components/Translation";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainHeadingContext } from "../context/MainHeadingContext";
import ReactPaginate from 'react-paginate';
import EditLeadAssetEditModal from "../Lead/EditLeadAssetEditModal";
import { Form, Formik } from "formik";
import { getTokenSession } from "../utils/common";
import axios from "axios";

export default function Media({ currentItems, setupdatedData }) {
  console.log("check kara ra",currentItems);
  // console.log("check kara raaaaaa66a",setupdatedData);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { addHeading } = useContext(MainHeadingContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [mediaImage, setMediaImage] = useState("");
  const { data: getViewCategory, loading, error } = useFetch("", "getViewCategory");
  const { data: getUserRoles, loading2, error3 } = useFetch("", "getUserRoles");
  const { data: allMedia, loading1, error2 } = useFetch("", "getAllViewMedia");
  const [resp2, GetSubcatories] = usePost();
  const [resp4, GetCustomDrop] = usePost();
  const [resp6, FileEditMedia] = usePost();
  const [resget, apiMethodGet] = usePost();
  const [ViewCati, setViewCati] = useState([]);
  const [SelectedFirst, setSelectedFirst] = useState([]);
  const [SubCatorigoies, setSubCatorigoies] = useState();
  const [SabCAtSelected, setSabCAtSelected] = useState();
  const [FollowersSelected, setFollowersSelected] = useState("Public");
  const [CustomDropDown, setCustomDropDown] = useState(false);
  const [CustomSubCatigory, setCustomSubCatigory] = useState();
  const [CustomSubSelected, setCustomSubSelected] = useState();
  const [RoleDropDown, setRoleDropDown] = useState(false);
  const [SelectedRoleSub, setSelectedRoleSub] = useState();
  const [Selecteditem, setSelecteditem] = useState();
  const [data, setData] = useState('')
  const [limit, setlimit] = useState('');
  const [pagination, setpagination] = useState('');
  const [totalleads, settotalleads] = useState('');
  const { translations } = useContext(MainTranslationContexts)

  const follower_select_list = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Custom", value: "Custom" },
    { label: "Role", value: "Role" },
  ];

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const HandleModel = (item) => {
    setShow(true)
    setSelectedFirst(Array.isArray(item.categories) && item?.categories.map(ite => { return ite.cat_id }))
    if (Array.isArray(item.categories)) {
      let a = item?.categories.map(ite => { return ite.cat_id })
      let subcat = new FormData();
      subcat.append("general", "get_sub_cat");
      for (let item in a) {
        subcat.append("query[]", a[item])
      }
      GetSubcatories("postViewSubCategory", subcat);
    }

  };

  useEffect(() => {
    if(Array.isArray(allMedia)){
      setData(allMedia)
      setlimit(allMedia?.[0]?.pagination?.limit)
      settotalleads(allMedia?.[0]?.pagination?.total_record)
      if(!allMedia?.[0]?.pagination){
        setpagination(false)
      }
    }
  }, [allMedia])

  function submit1(page, pageSize) {

    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllViewMedia/${page}`)
      .then((response) => {
        if(!response.data.message){
          setData(response.data)

        }

      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }


  useEffect(() => {
    if (resget.data) {

    }
  }, [resget.data])

  const HandleModel2 = (item) => {
    setMediaImage(item)
    setShow2(true)
  };

  useEffect(() => {
    setViewCati(getViewCategory)
  }, [getViewCategory]);
  useEffect(() => {
    let customdata = new FormData();
    customdata.append("userType", "typeSearch")
    customdata.append("query", "")
    GetCustomDrop("postSpecifiesUsers", customdata);
    addHeading('Media')
  }, []);

  useEffect(() => {
    if (resp2.data && !resp2.data.message) {
      setSubCatorigoies(resp2.data.map((item) => {
        return {
          value: item.cat_id,
          label: item.cat_name,
        }
      }))
    } else {
      setSubCatorigoies([{

      }])
    }
  }, [resp2.data])

  useEffect(() => {
    if (resp4.data && !resp4.data.message) {
      setCustomSubCatigory(resp4?.data.map((items) => {
        return {
          value: items.id,
          label: items.uname,
        }
      }))
    } else {
      setSubCatorigoies([{

      }])
    }
  }, [resp4.data])

  const redata = getUserRoles;


  if (!ViewCati || loading) return <Loader />
  const options1 = [];
  ViewCati.map(item => {
    options1.push({
      value: item?.cat_id,
      label: item?.cat_name,
    });
  })

  // handlechange  1 .........................
  const handleChange1 = (values) => {
    console.log(values)

    setSelectedFirst(values)
    if (values) {
      let subcat = new FormData();
      subcat.append("general", "get_sub_cat");
      for (let item in values) {
        subcat.append("query[]", values[item])
      }
      GetSubcatories("postViewSubCategory", subcat);
    }

  }

  const handleChange2 = (values) => {
    setSabCAtSelected(values)
  }
  const handleChange3 = (values) => {
    // console.log(values)
    setCustomSubSelected(values)
  }

  const FollowerHandle = (selectValue) => {
    const selected = selectValue.target.value
    setFollowersSelected(selected)
    if (selected == "Custom") {
      setCustomDropDown(true)
      setRoleDropDown(false)

    } else if (selected == "Role") {
      setRoleDropDown(true)
      setCustomDropDown(false)
    } else {
      setCustomDropDown(false)
      setRoleDropDown(false)
    }
  }

  // edit response handle ......................................../
  const handleEdit = () => {
    if ((Selecteditem) && (SelectedFirst?.length > 0) && (SabCAtSelected?.length > 0) && (FollowersSelected)) {
      let FileSubmitdata = new FormData();
      FileSubmitdata.append("file_id", Selecteditem)
      SelectedFirst.map((items, i) => {
        FileSubmitdata.append(`file_cat[${[i]}]`, items)
      })
      SabCAtSelected.map((items, i) => {
        FileSubmitdata.append(`file_subcat[${[i]}]`, items)
      })
      FileSubmitdata.append("file_follw", FollowersSelected)
      if (FollowersSelected == "Custom") {
        if (CustomSubSelected?.length > 0) {
          CustomSubSelected.map((items, i) => {
            FileSubmitdata.append(`file_followers[${[i]}]`, items)
          })
          swal({
            title: "Done",
            text: " File has been uploaded successfully",
            icon: "success",
            dangerMode: false,
          })
          setShow(false)
        } else {
          swal({
            title: "Please fill Category Field are empty!",
            // text: a,
            icon: "error",
            dangerMode: true,
          })
          return
        }
      }
      if (FollowersSelected == "Role") {
        if (SelectedRoleSub) {
          // console.log(SelectedRoleSub)
          FileSubmitdata.append("file_followers", SelectedRoleSub)
          swal({
            title: "Done",
            text: " File has been uploaded successfully",
            icon: "success",
            dangerMode: false,
          })
          setShow(false)
        }
        else {
          swal({
            title: "Please fill Select User Field are empty!",
            // text: a,
            icon: "error",
            dangerMode: true,
          })
          return
        }

      }
      FileEditMedia("postUpdateAssets", FileSubmitdata);
      setSelectedFirst([])
      setSabCAtSelected([])
      setCustomSubSelected([])
      setShow(false)
      swal({
        title: "Done",
        text: "File has been uploaded successfully",
        icon: "success",
        dangerMode: false,
      })
    } else {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        // text: a,
        icon: "error",
        dangerMode: true,
      })
    }

  }
  return (
    <> <Formik >
      <Form name="myForm">
        <div className="section-body mt-4">
          <div className="container-fluid">
            <div className="row clearfix">
              {leadPermission?.super_admin == "1" || leadPermission?.filesnmedia_module?.create == "1" ? (
                <div className="col-lg-12 col-md-12">
                  <div className="text-right file_section mb-1">
                    <Link to={`/${config.ddemoss}upload_media`} className="btn btn-sm btn-primary bsm-1 cr_temp"><i className="fa-solid fa-file-arrow-up"></i> Add File</Link>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="row row-cards">
              {data && data?.map((items, i) => {
                return (
                  <div className="col-sm-6 col-lg-4" key={i}>
                    <div className="card card__media p-1 card-custom">
                      <img onClick={() => HandleModel2(items)} style={{ width: "100%", height: 244, objectFit: "cover" }} src={items?.file_value.includes('http') ? items?.file_value : `${config.baseurl2}${items?.file_value}`} alt="img error" />
                      <div className="d-flex align-items-center px-2 mt-3">
                        <img style={{ width: 40, height: 40, borderRadius: '100%', margin: 8 }}
                          src={items?.fileOwnerData?.[0]?.avatar?.includes('http') ? items?.fileOwnerData?.[0]?.avatar : `${config.baseurl2}${items?.fileOwnerData?.[0]?.avatar}`}
                          alt="Profile Image"
                        />
                        <div>
                          <div> {Translation(translations, `${items?.fileOwnerData?.[0]?.f_name}  ${items?.fileOwnerData?.[0]?.l_name}`)}</div>
                          <small className="d-block text-muted">{Translation(translations, items?.fileCreatedDate)}</small>
                        </div>
                        <div className="ml-auto text-muted ">
                          {leadPermission?.super_admin || leadPermission?.filesnmedia_module?.edit === "1" ? (
                            // <FiEdit className="editcustom_view" onClick={() => HandleModel(items)} />

                            <EditLeadAssetEditModal
                              item={items}
                              follower_select_list={
                                follower_select_list
                              }
                              category_data={
                                options1
                              }
                              obj={redata?.CEO}
                              file_type={"media"}
                              module={"Media"}
                              updatedData={setupdatedData}

                            />
                          ) : null}
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex align-items-center justify-content-between px-2">
                        <div><b>{Translation(translations, 'Latitude')}:</b><br />{items?.m_latitude ? items?.m_latitude.replace('_', '° ').replace('_', '` ').replace('_', '`` ') : '-'}</div>
                        <div><b>{Translation(translations, 'Longitude')}:</b><br />{items?.m_longitude ? items?.m_longitude.replace('_', '° ').replace('_', '` ').replace('_', '`` ') : '-'}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
               <Pagination
                  defaultCurrent={1}
                  pageSize={Number(limit)}
                  defaultPageSize={5}
                  total={totalleads}
                  onChange={submit1}
               />
              <Modal show={show} onHide={handleClose}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>{Translation(translations, 'Edit Media')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="frow">
                    <form action="">
                      <div className="postForm">
                        <div className="row">
                          <div className="col-md-12 emed">
                            <div className="row multipleSection">
                              <div className="col-md-6">
                                <div className="form-group multiselect_div">
                                  <label className="form-label">{Translation(translations, 'Category')}</label>
                                  <Space
                                    direction="vertical"
                                    style={{
                                      width: '100%',
                                    }}>
                                    <Select
                                      filterOption={(input, options) =>
                                        (options?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                      }
                                      mode="multiple"
                                      placeholder="Please select"
                                      onChange={handleChange1}
                                      style={{
                                        width: '100%',
                                      }}
                                      options={options1}
                                      value={SelectedFirst}
                                    />
                                  </Space>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group multiselect_div">
                                  <label className="form-label">{Translation(translations, 'Sub-Category')}</label>
                                  <Space
                                    direction="vertical"
                                    style={{
                                      width: '100%',
                                    }}>
                                    <Select
                                      filterOption={(input, options) =>
                                        (options?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                      }
                                      mode="multiple"
                                      placeholder="Please select"
                                      onChange={handleChange2}
                                      value={SabCAtSelected}
                                      style={{
                                        width: '100%',
                                      }}

                                      options={SubCatorigoies && SubCatorigoies}
                                    />
                                  </Space>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group multiselect_div">
                                  <label className="form-label">{Translation(translations, 'Followers')}</label>
                                  <select name="" id="" className="form-control custom-select" onChange={FollowerHandle}
                                    value={FollowersSelected}>
                                    <option value="Public">
                                      {Translation(translations, 'Public')}
                                    </option>
                                    <option value="Private">
                                      {Translation(translations, 'Private')}
                                    </option>
                                    <option value="Custom" >
                                      {Translation(translations, 'Custom')}
                                    </option>
                                    <option value="Role">
                                      {Translation(translations, 'Role')}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              {CustomDropDown &&
                                <div className="col-md-6">
                                  <div className="form-group multiselect_div">
                                    <label className="form-label">{Translation(translations, 'Category')}  </label>
                                    <Space
                                      direction="vertical"
                                      style={{
                                        width: '100%',
                                      }}>
                                      <Select
                                        filterOption={(input, options) =>
                                          (options?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        mode="multiple"
                                        placeholder="Please select"
                                        onChange={handleChange3}
                                        style={{
                                          width: '100%',
                                        }}
                                        value={CustomSubSelected}
                                        options={CustomSubCatigory ? CustomSubCatigory : ""}
                                      />
                                    </Space>
                                  </div>
                                </div>
                              }
                              {
                                RoleDropDown &&
                                <div className="col-md-6">
                                  <div className="form-group multiselect_div">
                                    <label className="form-label">{Translation(translations, 'Select User')}</label>
                                    <select className="form-control" onChange={(e) => setSelectedRoleSub(e.target.value)}
                                    // value={SelectedRoleSub}
                                    >
                                      <Role obj={redata?.CEO} />
                                    </select>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleEdit} >
                    {Translation(translations, 'Update')}
                  </Button>
                </Modal.Footer>
              </Modal>


              {show2 && <Modal show={show2} onHide={handleClose2}
                centered
              >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <img
                      style={{
                        width: "100%",
                        height: "30rem",
                        objectFit: "contain"
                      }}
                      src={mediaImage?.file_value.includes('http') ? mediaImage?.file_value : `${config.baseurl2}${mediaImage?.file_value}`}
                      alt="" />
                  </div>
                </Modal.Body>
              </Modal>}
            </div>
          </div >
        </div >
      </Form>
    </Formik>
    </>
  );

}



// export default function Media() {
//   const navigate = useNavigate();
//   const { leadPermission } = useContext(MainLeadPermissionContext);
//   useEffect(() => {
//     if (leadPermission) {
//       if ((leadPermission?.filesnmedia_module?.view === "0" && leadPermission?.filesnmedia_module?.active_module === "0")) {
//         navigate(`/${config.ddemoss}`);
//       }
//     }
//   }, [leadPermission]);
//   const [itemOffset, setItemOffset] = useState(0);
//   const { data: allMedia, loading1, error2 } = useFetch("", "getAllViewMedia");
//   const [getAllViewFilesAndMedia, setgetAllViewFilesAndMedia] = useState('');
//   const [updatedData, setupdatedData] = useState(false)
//   useEffect(() => {
//     setgetAllViewFilesAndMedia(allMedia)
//   }, [allMedia]);

//   useEffect(() => {
//     if (updatedData) {


//       axios.defaults.headers = {
//         "Content-Type": "multipart/form-data",
//         authentication: `${getTokenSession()}`,
//       };
//       axios.get(`${config.apiEndPoint}getAllViewMedia`)
//       .then((response)=>{
//         setgetAllViewFilesAndMedia(response.data)
//       })
//       .catch((err)=>{
//         console.log('eerr',err)
//       })
//     }
    
//   }, [updatedData])

//   const [CurrentItems, setCurrentItems] = useState()
  
//   useEffect(() => {
//     setCurrentItems("")
//     setCurrentItems(Array.isArray(getAllViewFilesAndMedia) && getAllViewFilesAndMedia.slice(itemOffset, endOffset))
//   }, [itemOffset,getAllViewFilesAndMedia])
//   if (loading1 || !getAllViewFilesAndMedia) return <Loader />


//   const endOffset = itemOffset + 9;
//    const setPageCount = Math.ceil(Array.isArray(getAllViewFilesAndMedia) && (getAllViewFilesAndMedia.length / 9));

//   // Invoke when user click to request another page.



//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * 9) % getAllViewFilesAndMedia?.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//     // setCurrentItems(newOffset)
//   };

//   return (
//     <>
//       <Items currentItems={CurrentItems} setupdatedData={setupdatedData} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={setPageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//         breakClassName={'page-item'}
//         breakLinkClassName={'page-link'}
//         containerClassName={'pagination'}
//         pageClassName={'page-item'}
//         pageLinkClassName={'page-link'}
//         previousClassName={'page-item'}
//         previousLinkClassName={'page-link'}
//         nextClassName={'page-item'}
//         nextLinkClassName={'page-link'}
//         activeClassName={'active'} />
//     </>
//   );
// }