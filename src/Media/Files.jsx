import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import usePost from "../customHooks/usePost";
import Role from "../components/Role";
import Loader from "../components/common/Loading";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import { Radio, Select, Space } from "antd";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import { MainTranslationContexts } from "../context/MainTranslationContexts";
import { Translation } from "../components/Translation";
import config from "../services/config.json";
import useFetch from "../customHooks/useFetch";
import { useNavigate, Link } from "react-router-dom";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";
import { MainHeadingContext } from "../context/MainHeadingContext";
import EditLeadAssetEditModal from "../Lead/EditLeadAssetEditModal";
import { MainAuthPermissionsContext } from "../context/MainAuthPermissionsContext";
import { Formik, Form } from "formik";
import { getTokenSession } from "../utils/common";
import { Pagination } from 'antd';
import axios from "axios";

function Files() {
  const navigate = useNavigate();
  const { addHeading } = useContext(MainHeadingContext);
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { translations } = useContext(MainTranslationContexts);
  const { permissions } = useContext(MainAuthPermissionsContext);
  useEffect(() => {
    if (leadPermission) {
      addHeading(`Files`);
      if (
        leadPermission?.filesnmedia_module?.active_module === "0" ||
        leadPermission?.filesnmedia_module?.view === "0"
      ) {
        navigate(`/${config.ddemoss}`);
      }
    }
  }, [leadPermission]);
  const [resp2, GetSubcatories] = usePost();
  const [show, setShow] = useState(false);
  const { data: getUserRoles, loading2, error3 } = useFetch("", "getUserRoles");
  const [datas, setDatas] = useState();
  const {
    data: getAllViewFilesAndMedia,
    loading1,
    error2,
  } = useFetch({ setDatas }, "getAllViewFilesAndMedia");
  const [FilesData, setFilesData] = useState([]);
  const [CustomSubCatigory, setCustomSubCatigory] = useState();
  const {
    data: getViewCategory,
    loading,
    error,
  } = useFetch("", "getViewCategory");
  const [Filesmedia, setFilesmedia] = useState([]);
  const [respN1, apiMethodGetSubcat] = usePost();
  const [FollowersSelected, setFollowersSelected] = useState("Public");
  const [SabCAtSelected, setSabCAtSelected] = useState([]);
  const [respN2, FileDelete] = usePost();
  const [CustomSubSelected, setCustomSubSelected] = useState([]);
  const [CustomDropDown, setCustomDropDown] = useState(false);
  const [RoleDropDown, setRoleDropDown] = useState(false);
  const [SubCatorigoies, setSubCatorigoies] = useState();
  const [SelectedFirst, setSelectedFirst] = useState();
  const [SelectedRoleSub, setSelectedRoleSub] = useState();
  const [resp6, FileEditMedia] = usePost();
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [Selecteditem, setSelecteditem] = useState();
  const [nestedSubCategories, setNestedSubCategories] = useState({});
  const [SubCategories, setSubCategories] = useState([]);
  const [ViewCati, setViewCati] = useState([]);
  const [res, apiMethodDelete] = usePost();
  const [limit, setlimit] = useState('');
  const [totalleads, settotalleads] = useState('');
  const [Recall, setRecall] = useState(false);
  const [pagination, setpagination] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);


  const follower_select_list = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Custom", value: "Custom" },
    { label: "Role", value: "Role" },
  ];

  const redata = getUserRoles;

  useEffect(() => {
    if (res.data) {
      const obj = res.data.file_followers_types;
      for (const key in obj) {
        if (obj[key].selection === "selected") {
          setSelectedFirst(obj[key].name);
          break;
        } else {
          setSelectedFirst();
        }
      }
    }
  }, [res.data]);

  useEffect(() => {
    console.log("call hua ");
    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllViewFilesAndMedia`)
      .then((response) => {
        if (response.data) {


          setFilesData(response.data?.GetFiles);
          setlimit(response.data?.GetFiles[0]?.pagination?.limit)
          settotalleads(response.data?.GetFiles[0]?.pagination?.total_record)
          setFilesmedia(response.data?.OnlyFiles);
        }
      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }, [Recall])
  // useEffect(() => {
  //   if (getAllViewFilesAndMedia?.GetFiles) {
  //     setFilesData(getAllViewFilesAndMedia?.GetFiles);
  //     setFilesmedia(getAllViewFilesAndMedia?.OnlyFiles);
  //   }
  // }, [getAllViewFilesAndMedia]);
  function submit1(page, pageSize) {

    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllViewFilesAndMedia/${page}`)
      .then((response) => {
        if (!response.data.message) {

          if (!response.data?.GetFiles?.message) {
            setFilesData(response.data?.GetFiles)
          }
          else if (response.data?.GetFiles?.message) {
            setFilesData([])
          }
          if (!response.data?.OnlyFiles?.message) {
            setFilesmedia(response.data?.OnlyFiles)
          }
          else if (response.data?.OnlyFiles?.message) {
            setFilesmedia([])
          }
          if (response.data?.OnlyFiles?.message && response.data?.GetFiles?.message) {
            setpagination(false)
          }

          setCurrentPage(page);


        }

      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }

  useEffect(() => {
    if (resp2.data && !resp2.data.message) {
      setSubCategories(
        resp2.data.map((item) => {
          return {
            value: item.cat_id,
            label: item.cat_name,
          };
        })
      );
    } else {
      setSubCategories([
        {
          value: "",
          label: "",
        },
      ]);
    }
  }, [resp2.data]);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (respN1.data) {
      setNestedSubCategories((prevState) => {
        const newState = { ...prevState };
        const parentId = respN1?.data?.parent_id;
        if (respN1.data.get_cat) {
          newState[parentId] = respN1?.data?.get_cat?.map((subCat) => ({
            ...subCat,
            files: respN1?.data?.get_file?.filter(
              (file) => file.parent_id === subCat.parent_id
            ),
          }));
        } else {
          // Handle the case where only 'get_file' is present in the response
          newState[parentId] = respN1.data.get_file;
        }

        return newState;
      });
    }
  }, [respN1.data]);
  useEffect(() => {
    if (resp2.data && !resp2.data.message) {
      setSubCatorigoies(
        resp2.data.map((item) => {
          return {
            value: item.cat_id,
            label: item.cat_name,
          };
        })
      );
    } else {
      setSubCatorigoies([{}]);
    }
  }, [resp2.data]);

  const handleClickCategory = (item) => {
    if (item > 0) {
      if (expandedCategories.includes(item)) {
        setExpandedCategories(expandedCategories.filter((id) => id !== item));
        return;
      }
      setExpandedCategories([...expandedCategories, item]);

      let subcat = new FormData();
      subcat.append("general", "get_sub_cate_cat");
      subcat.append("filelead", item);
      subcat.append("mode", item);
      apiMethodGetSubcat("postViewFilesSubCategory", subcat);
    }
  };
  useEffect(() => {
    setViewCati(getViewCategory);
    // setSelectedFirst(getViewCategory && getViewCategory.map(function (obj) {
    //     return obj.cat_name;
    // }))
  }, [getViewCategory]);

  if (!ViewCati) return <Loader />;
  const options1 = [];
  ViewCati.map((item) => {
    options1.push({
      value: item?.cat_id,
      label: item?.cat_name,
    });
  });

  // handlechange  1 .........................
  const handleChange1 = (values) => {
    setSelectedFirst(values);
    if (values) {
      let subcat = new FormData();
      subcat.append("general", "get_sub_cat");
      for (let item in values) {
        subcat.append("query[]", values[item]);
      }
      GetSubcatories("postViewSubCategory", subcat);
    }
  };
  const handleChange2 = (values) => {
    setSabCAtSelected(values);
  };
  const handleChange3 = (values) => {
    setCustomSubSelected(values);
  };
  const FollowerHandle = (selectValue) => {
    const selected = selectValue.target.value;
    setFollowersSelected(selected);
    if (selected == "Custom") {
      setCustomDropDown(true);
      setRoleDropDown(false);
    } else if (selected == "Role") {
      setRoleDropDown(true);
      setCustomDropDown(false);
    } else {
      setCustomDropDown(false);
      setRoleDropDown(false);
    }
  };

  const handleEdit = () => {
    if (
      Selecteditem &&
      SelectedFirst?.length > 0 &&
      SabCAtSelected?.length > 0 &&
      FollowersSelected
    ) {
      let FileSubmitdata = new FormData();
      FileSubmitdata.append("file_id", Selecteditem);
      SelectedFirst.map((items, i) => {
        FileSubmitdata.append(`file_cat[${[i]}]`, items);
      });
      SabCAtSelected.map((items, i) => {
        FileSubmitdata.append(`file_subcat[${[i]}]`, items);
      });
      FileSubmitdata.append("file_follw", FollowersSelected);
      if (FollowersSelected == "Custom") {
        if (CustomSubSelected?.length > 0) {
          CustomSubSelected.map((items, i) => {
            FileSubmitdata.append(`file_followers[${[i]}]`, items);
          });
          swal({
            title: "Done",
            text: " File has been uploaded successfully",
            icon: "success",
            dangerMode: false,
          });
          setShow(false);
        } else {
          swal({
            title: "Please fill Category Field are empty!",
            // text: a,
            icon: "error",
            dangerMode: true,
          });
          return;
        }
      }
      if (FollowersSelected == "Role") {
        if (SelectedRoleSub) {
          FileSubmitdata.append("file_followers", SelectedRoleSub);
          swal({
            title: "Done",
            text: " File has been uploaded successfully",
            icon: "success",
            dangerMode: false,
          });
          setShow(false);
        } else {
          swal({
            title: "Please fill Select User Field are empty!",
            // text: a,
            icon: "error",
            dangerMode: true,
          });
          return;
        }
      }
      FileEditMedia("postUpdateAssets", FileSubmitdata);
      setSelectedFirst([]);
      setSabCAtSelected([]);
      setCustomSubSelected([]);
      setShow(false);
      swal({
        title: "Done",
        text: "File has been uploaded successfully",
        icon: "success",
        dangerMode: false,
      });
    } else {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        // text: a,
        icon: "error",
        dangerMode: true,
      });
    }
  };
  const renderFiles = (files, paddingLeft) => {
    if (respN1.isLoading)
      return (
        <span className="span_loader">
          <i className="fa fa-pulse fa-spinner"></i>
        </span>
      );
    return (
      <>
        {files?.map((file, fileIndex) => (
          <tr
            key={`file-${fileIndex}`}
            className={`file_class_${file?.db_file_id}`}
          >
            <td style={{ paddingLeft }}>
              <i className="fa fa-file-excel-o"></i>
            </td>
            <td>
              <span className="folder-name">
                {/* <Link className="file-cat">{Translation(translations, file.file_name)}</Link> */}
                <a
                  href={file.file_value}
                  download={file.file_name}
                  className="file-cat"
                >
                  {Translation(translations, file.file_name)}
                </a>
              </span>
            </td>
            <td>
              {file.file_followers_type === "Private" ? (
                <React.Fragment>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={file.file_owner_details[0]?.uname}>
                        {`${file.file_owner_details[0]?.uname}  (${file.file_owner_details[0]?.role_name})`}
                      </Tooltip>
                    }
                  >
                    <img
                      className="avatar avatar-sm"
                      src={
                        file.file_owner_details[0]?.avatar?.includes("http")
                          ? file.file_owner_details[0]?.avatar
                          : `${config.baseurl2}${file.file_owner_details[0]?.avatar}`
                      }
                      alt=""
                      srcSet=""
                    />
                    {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                  </OverlayTrigger>

                </React.Fragment>
              ) : (
                <></>
              )}
              {(file.file_followers_type === "Role" && file?.followersData?.role_name) ? (
                <React.Fragment>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={file?.followersData?.role_id}>
                        {`${file?.followersData?.role_name} `}
                      </Tooltip>
                    }
                  >
                    <img
                      className="avatar avatar-sm"
                      src={
                        permissions?.avatar?.includes("http")
                          ? permissions?.avatar
                          : `${config.baseurl2}${permissions[`system-avatar-image`]
                            .setting_value
                          }`
                      }
                      alt=""
                      srcSet=""
                    />
                    {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                  </OverlayTrigger>

                </React.Fragment>
              ) : (
                <></>
              )}
              {Array.isArray(file?.followersData) &&
                file?.followersData.map((img, index) => {
                  return (
                    <React.Fragment key={index}>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`${index}`}>
                            {`${img?.uname} (${img?.role_name})`}
                          </Tooltip>
                        }
                      >
                        <img
                          className="avatar avatar-sm"
                          src={
                            img?.avatar?.includes("http")
                              ? img?.avatar
                              : `${config.baseurl2}${img?.avatar}`
                          }
                          alt=""
                          srcSet=""
                        />
                        {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                      </OverlayTrigger>
                    </React.Fragment>
                  );
                })}
            </td>
            <td>
              <div className="ml-auto d-flex text-muted ">
                {leadPermission?.super_admin == "1" ||
                  leadPermission?.filesnmedia_module?.edit == "1" ? (
                  <EditLeadAssetEditModal
                    item={file}
                    follower_select_list={follower_select_list}
                    category_data={options1}
                    obj={redata?.CEO}
                    file_type={"file"}
                    module={"Files"}
                    updatedData={setRecall}
                  />
                ) : null}
                {leadPermission?.super_admin == "1" ||
                  leadPermission?.filesnmedia_module?.delete == "1" ? (
                  <Link
                    className="text-red filedelete"
                    onClick={() => HandleDelete(file)}
                  >
                    <i className="fa fa-trash"></i>{" "}
                  </Link>
                ) : null}
              </div>
            </td>
            <td className="width100">
              <span>
                {Translation(
                  translations,
                  `${file?.file_owner_details[0]?.uname}  `
                )}
              </span>
            </td>
            <td className="width100">
              <span>{Translation(translations, file.file_date)}</span>
            </td>
            <td className="width100 text-center">
              <span className="size">
                {Translation(translations, file.file_size)}{" "}
              </span>
            </td>
          </tr>
        ))}
      </>
    );
  };
  const HandleModel = (selcteditem) => {
    console.log(selcteditem);
    if (selcteditem.parent_id) {
      console.log(selcteditem.file_id);
      let formData = new FormData();
      formData.append("file_id", selcteditem.file_id);
      apiMethodDelete("postEditAssets", formData);
    } else {
      console.log(selcteditem.db_file_id);
      let formData = new FormData();
      formData.append("file_id", selcteditem.db_file_id);
      apiMethodDelete("postEditAssets", formData);
    }
    console.log("selcteditem");
    setSelecteditem(selcteditem.db_file_id);
    setShow(true);
  };
  const HandleDelete = (item) => {
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        const DeleteForm = new FormData();
        DeleteForm.append("general", "delete_file");
        DeleteForm.append("fieldId", item.db_file_id);
        DeleteForm.append("file_lead", item.file_lead);
        DeleteForm.append("filename", item.file_name);
        FileDelete("postDeleteLeadAssets", DeleteForm);
        const element = document.querySelector(
          `.file_class_${item.db_file_id}`
        );
        if (element) {
          element.remove();
        }
        toast.success("Deleted Successfully");
      }
    });
  };

  const renderSubCategories = (parentId, paddingLeft) => {
    const subCategories = nestedSubCategories[parentId];

    if (!subCategories) {
      return null;
    }
    if (respN1.isLoading)
      return (
        <span className="span_loader">
          <i className="fa fa-pulse fa-spinner"></i>
        </span>
      );
    // Check if the subCategories are files
    if (Array.isArray(subCategories) && subCategories[0]?.file_id) {
      return subCategories.map((file, fileIndex) => (
        <tr
          key={`file-${fileIndex}`}
          className={`file_class_${file.db_file_id}`}
        >
          <td style={{ paddingLeft: `${paddingLeft}px` }}>
            <i className="fa fa-file-excel-o"></i>
          </td>
          <td>
            <span className="folder-name">
              {/* <Link className="file-cat">{Translation(translations, file.file_name)}</Link> */}
              <a
                href={file.file_value}
                download={file.file_name}
                className="file-cat"
              >
                {Translation(translations, file.file_name)}
              </a>
            </span>
          </td>
          <td>

            {file.file_followers_type === "Private" ? (
              <React.Fragment>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={file.file_owner_details[0]?.uname}>
                      {`${file.file_owner_details[0]?.uname}  (${file.file_owner_details[0]?.role_name})`}
                    </Tooltip>
                  }
                >
                  <img
                    className="avatar avatar-sm"
                    src={
                      file.file_owner_details[0]?.avatar?.includes("http")
                        ? file.file_owner_details[0]?.avatar
                        : `${config.baseurl2}${file.file_owner_details[0]?.avatar}`
                    }
                    alt=""
                    srcSet=""
                  />
                  {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                </OverlayTrigger>

              </React.Fragment>
            ) : (
              <></>
            )}
            {(file.file_followers_type === "Role" && file?.followersData?.role_name) ? (
              <React.Fragment>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={file?.followersData?.role_id}>
                      {`${file?.followersData?.role_name} `}
                    </Tooltip>
                  }
                >
                  <img
                    className="avatar avatar-sm"
                    src={
                      permissions?.avatar?.includes("http")
                        ? permissions?.avatar
                        : `${config.baseurl2}${permissions[`system-avatar-image`]
                          .setting_value
                        }`
                    }
                    alt=""
                    srcSet=""
                  />
                  {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                </OverlayTrigger>

              </React.Fragment>
            ) : (
              <></>
            )}
            {Array.isArray(file?.followersData) &&
              file?.followersData?.map((img, index) => {
                return (
                  <React.Fragment key={index}>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`${index}`}>
                          {`${img?.uname} (${img?.role_name})`}
                        </Tooltip>
                      }
                    >
                      <img
                        className="avatar avatar-sm"
                        src={
                          img?.avatar?.includes("http")
                            ? img?.avatar
                            : `${config.baseurl2}${img?.avatar}`
                        }
                        alt=""
                        srcSet=""
                      />
                      {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                    </OverlayTrigger>
                  </React.Fragment>
                );
              })}
          </td>
          <td>
            <div className="ml-auto d-flex text-muted ">
              {leadPermission?.super_admin == "1" ||
                leadPermission?.filesnmedia_module?.edit == "1" ? (
                <EditLeadAssetEditModal
                  item={file}
                  follower_select_list={follower_select_list}
                  category_data={options1}
                  obj={redata?.CEO}
                  file_type={"file"}
                  module={"Files"}
                  file_parent_id={true}
                  updatedData={setRecall}
                />
              ) : null}
              {leadPermission?.super_admin == "1" ||
                leadPermission?.filesnmedia_module?.delete == "1" ? (
                <Link
                  className="text-red filedelete"
                  onClick={() => HandleDelete(file)}
                >
                  <i className="fa fa-trash"></i>{" "}
                </Link>
              ) : null}
            </div>
          </td>
          <td className="width100">
            <span>{`${file?.file_owner_details[0]?.uname} `}</span>
          </td>
          <td className="width100">
            <span>{file?.file_date}</span>
          </td>
          <td className="width100 text-center">
            <span className="size">
              {Translation(translations, file.file_size)}{" "}
            </span>
          </td>
        </tr>
      ));
    }

    return (
      <>
        {subCategories.map((subItem, subIndex) => (
          <React.Fragment key={`${parentId}-${subIndex}`}>
            <tr>
              <td style={{ paddingLeft: `${paddingLeft}px` }}>
                <i className="fa fa-folder"></i>
              </td>
              <td>
                <span className="folder-name">
                  <a
                    onClick={() => handleClickCategory(subItem.cat_id)}
                    className="file-cat"
                  >
                    {subItem.cat_name}
                  </a>
                </span>
              </td>
              <td></td>
              <td></td>
              <td className="width100">
                <span> </span>
              </td>
              <td className="width100">
                <span>
                  {Translation(translations, subItem.last_updated_date)}
                </span>
              </td>
              <td className="width100 text-center">
                <span className="size">{subItem.sum_cat}</span>
              </td>
            </tr>
            {expandedCategories.includes(subItem.cat_id) && (
              <>{renderSubCategories(subItem.cat_id, paddingLeft + 30)}</>
            )}
            {/* Render files associated with the subcategory */}
            {subItem.files && renderFiles(subItem.files, paddingLeft)}
          </React.Fragment>
        ))}
      </>
    );
  };
  return (
    <Formik >
      <Form name="myForm">
        <div className="section-body mt-2">
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                {leadPermission?.super_admin == "1" ||
                  leadPermission?.filesnmedia_module?.create == "1" ? (
                  <div className="text-right file_section mb-1">
                    <Link
                      to={`/${config.ddemoss}upload_media`}
                      className="btn btn-sm btn-primary bsm-1 cr_temp"
                    >
                      <i className="fa-solid fa-file-arrow-up"></i> Add File
                    </Link>
                  </div>
                ) : null}
                <div className="table-responsive_ table-responsive">
                  <table className="table table-hover table-vcenter table_custom text-nowrap spacing5 text-nowrap mb-0">
                    <thead>
                      <tr>
                        <th></th>
                        <th>{Translation(translations, "Name")}</th>
                        <th>{Translation(translations, "Share With")}</th>
                        <th>{Translation(translations, "Action")}</th>
                        <th>{Translation(translations, "Owner")}</th>
                        <th>{Translation(translations, "Last Update")}</th>
                        <th>{Translation(translations, "File Size")}</th>
                      </tr>
                    </thead>
                    <tbody className="repeatedbody">
                      {Array.isArray(FilesData) &&
                        FilesData.map((items, i) => {
                          return (
                            <React.Fragment key={i}>
                              <tr>
                                <td className="width45">
                                  <i className="fa fa-folder"></i>
                                </td>
                                <td>
                                  <span className="folder-name">
                                    <a
                                      onClick={() =>
                                        handleClickCategory(items.cat_id)
                                      }
                                      className="file-cat"
                                      data-filelead="1"
                                      data-file="1"
                                    >
                                      {Translation(translations, items.cat_name)}
                                    </a>
                                  </span>
                                </td>
                                <td></td>
                                <td></td>
                                <td className="width100">
                                  <span> </span>
                                </td>
                                <td className="width100">
                                  <span>
                                    {Translation(
                                      translations,
                                      items.last_updated_date
                                    )}
                                  </span>
                                </td>
                                <td className="width100 text-center">
                                  <span className="size">{items.sum_cat}</span>
                                </td>
                              </tr>
                              {expandedCategories.includes(items.cat_id) && (
                                <>
                                  {/* {console.log(items.files)} */}
                                  {renderFiles(items.files, 30)}
                                  {renderSubCategories(items.cat_id, 30)}
                                </>
                              )}
                            </React.Fragment>
                          );
                        })}
                      {Array.isArray(Filesmedia) &&
                        Filesmedia.map((file, i) => {
                          return (
                            <tr
                              key={i}
                              className={`file_class_${file?.db_file_id}`}
                            >
                              <td className="width45">
                                <i className="fa fa-file-excel-o"></i>
                              </td>
                              <td>
                                <span className="folder-name">
                                  <a
                                    href={`${file.file_value}`}
                                    download={`${config.baseurl2}${file.file_value}`}
                                    className="file-cat"
                                  >
                                    {Translation(translations, file.file_name)}
                                  </a>
                                </span>
                              </td>
                              <td>
                                {file.file_followers_type === "Private" ? (
                                  <React.Fragment>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id={file.file_owner_details[0]?.uname}>
                                          {`${file.file_owner_details[0]?.uname}  (${file.file_owner_details[0]?.role_name})`}
                                        </Tooltip>
                                      }
                                    >
                                      <img
                                        className="avatar avatar-sm"
                                        src={
                                          file.file_owner_details[0]?.avatar?.includes("http")
                                            ? file.file_owner_details[0]?.avatar
                                            : `${config.baseurl2}${file.file_owner_details[0]?.avatar}`
                                        }
                                        alt=""
                                        srcSet=""
                                      />
                                      {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                                    </OverlayTrigger>

                                  </React.Fragment>
                                ) : (
                                  <></>
                                )}
                                {(file.file_followers_type === "Role" && file?.followersData?.role_name) ? (
                                  <React.Fragment>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id={file?.followersData?.role_id}>
                                          {`${file?.followersData?.role_name} `}
                                        </Tooltip>
                                      }
                                    >
                                      <img
                                        className="avatar avatar-sm"
                                        src={
                                          permissions?.avatar?.includes("http")
                                            ? permissions?.avatar
                                            : `${config.baseurl2}${permissions[`system-avatar-image`]
                                              .setting_value
                                            }`
                                        }
                                        alt=""
                                        srcSet=""
                                      />
                                      {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                                    </OverlayTrigger>

                                  </React.Fragment>
                                ) : (
                                  <></>
                                )}
                                {Array.isArray(file?.followersData) &&
                                  file?.followersData.map((img, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip id={`${index}`}>
                                              {`${img?.uname} (${img?.role_name})`}
                                            </Tooltip>
                                          }
                                        >
                                          <img
                                            className="avatar avatar-sm"
                                            src={
                                              img?.avatar?.includes("http")
                                                ? img?.avatar
                                                : `${config.baseurl2}${img?.avatar}`
                                            }
                                            alt=""
                                            srcSet=""
                                          />
                                          {/* <span dangerouslySetInnerHTML={{ __html: img?.f_name }} /> */}
                                        </OverlayTrigger>
                                      </React.Fragment>
                                    );
                                  })}
                              </td>
                              <td>
                                <div className="ml-auto d-flex text-muted ">
                                  {leadPermission?.super_admin == "1" ||
                                    leadPermission?.filesnmedia_module?.edit ==
                                    "1" ? (
                                    <EditLeadAssetEditModal
                                      item={file}
                                      follower_select_list={follower_select_list}
                                      category_data={options1}
                                      obj={redata?.CEO}
                                      file_type={"file"}
                                      module={"Files"}
                                      updatedData={setRecall}
                                    />
                                  ) : null}
                                  {leadPermission?.super_admin == "1" ||
                                    leadPermission?.filesnmedia_module?.delete ==
                                    "1" ? (
                                    <Link
                                      className="text-red filedelete"
                                      onClick={() => HandleDelete(file)}
                                    >
                                      <i className="fa fa-trash"></i>{" "}
                                    </Link>
                                  ) : null}
                                </div>
                              </td>
                              <td className="width100">
                                <span>
                                  {Translation(
                                    translations,
                                    `${file?.file_owner_details[0]?.uname} `
                                  )}
                                </span>
                              </td>
                              <td className="width100">
                                <span>
                                  {Translation(
                                    translations,
                                    file.file_updated_date
                                  )}
                                </span>
                              </td>
                              <td className="width100 text-center">
                                <span className="size">
                                  {Translation(translations, file.file_size)}{" "}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {pagination && <Pagination
                    current={currentPage}
                    defaultCurrent={1}
                    pageSize={Number(limit)}
                    defaultPageSize={5}
                    total={totalleads}
                    onChange={submit1}
                  />}
                </div>
              </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  {Translation(translations, "Edit Files")}
                </Modal.Title>
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
                                <label className="form-label">
                                  {Translation(translations, "Category")}
                                </label>
                                <Space
                                  direction="vertical"
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <Select
                                    filterOption={(input, options) =>
                                      (options?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    mode="multiple"
                                    placeholder="Please select"
                                    onChange={handleChange1}
                                    style={{
                                      width: "100%",
                                    }}
                                    options={options1}
                                    value={SelectedFirst}
                                  />
                                </Space>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group multiselect_div">
                                <label className="form-label">
                                  {Translation(translations, "Sub-Category")}
                                </label>
                                <Space
                                  direction="vertical"
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <Select
                                    filterOption={(input, options) =>
                                      (options?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    mode="multiple"
                                    placeholder={Translation(
                                      translations,
                                      "Please select"
                                    )}
                                    onChange={handleChange2}
                                    value={SabCAtSelected}
                                    style={{
                                      width: "100%",
                                    }}
                                    options={SubCatorigoies && SubCatorigoies}
                                  />
                                </Space>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group multiselect_div">
                                <label className="form-label">
                                  {Translation(translations, "Followers")}
                                </label>
                                <select
                                  name=""
                                  id=""
                                  className="form-control custom-select"
                                  onChange={FollowerHandle}
                                  value={FollowersSelected}
                                >
                                  <option value="Public">
                                    {Translation(translations, "Public")}
                                  </option>
                                  <option value="Private">
                                    {Translation(translations, "Private")}
                                  </option>
                                  <option value="Custom">
                                    {Translation(translations, "Custom")}
                                  </option>
                                  <option value="Role">
                                    {Translation(translations, "Role")}
                                  </option>
                                </select>
                              </div>
                            </div>
                            {CustomDropDown && (
                              <div className="col-md-6">
                                <div className="form-group multiselect_div">
                                  <label className="form-label">
                                    {Translation(translations, "Category")}{" "}
                                  </label>
                                  <Space
                                    direction="vertical"
                                    style={{
                                      width: "100%",
                                    }}
                                  >
                                    <Select
                                      filterOption={(input, options) =>
                                        (options?.label ?? "")
                                          .toLowerCase()
                                          .includes(input.toLowerCase())
                                      }
                                      mode="multiple"
                                      placeholder={Translation(
                                        translations,
                                        "Please select"
                                      )}
                                      onChange={handleChange3}
                                      style={{
                                        width: "100%",
                                      }}
                                      value={CustomSubSelected}
                                      options={Translation(
                                        translations,
                                        CustomSubCatigory ? CustomSubCatigory : ""
                                      )}
                                    />
                                  </Space>
                                </div>
                              </div>
                            )}
                            {RoleDropDown && (
                              <div className="col-md-6">
                                <div className="form-group multiselect_div">
                                  <label className="form-label">
                                    {Translation(translations, "Select User")}
                                  </label>
                                  <select
                                    className="form-control"
                                    onChange={(e) =>
                                      setSelectedRoleSub(e.target.value)
                                    }
                                  // value={SelectedRoleSub}
                                  >
                                    <Role obj={redata?.CEO} />
                                  </select>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleEdit}>
                  {Translation(translations, "Update")}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

        </div>
      </Form>

    </Formik>
  );
}

export default Files;
