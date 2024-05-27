import { Radio, Select, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import File from "../components/form/File";
import { Translation } from "../components/Translation";
import { Form, Formik } from "formik";
import useFetch from "../customHooks/useFetch";
import React, { useState, useEffect, useContext } from "react";
import Loader from "../components/common/Loading";
import usePost from "../customHooks/usePost";
import Role from "../components/Role";
import config from "../services/config.json";
import swal from "sweetalert";
import { MainLeadPermissionContext } from "../context/MainLeadPermissionContext";

function Upload_new() {
     const navigate = useNavigate();
     const { leadPermission } = useContext(MainLeadPermissionContext);
     useEffect(() => {
          if (leadPermission) {
               if (leadPermission?.filesnmedia_module?.active_module === "0" || leadPermission?.filesnmedia_module?.create === "0" || leadPermission?.filesnmedia_module?.view === "0") {
                    navigate(`/${config.ddemoss}`);
               }
          }
     }, [leadPermission]);
     const { data: getViewCategory, loading, error } = useFetch("", "getViewCategory");
     const { data: getUserRoles, loading1, error2 } = useFetch("", "getUserRoles");
     const [resp2, GetSubcatories] = usePost();
     const [resp4, GetCustomDrop] = usePost();
     const [resp6, apiMethodSubmit] = usePost();
     const [ViewCati, setViewCati] = useState([]);
     const [SelectedFirst, setSelectedFirst] = useState();
     const [SubCatorigoies, setSubCatorigoies] = useState();
     const [SabCAtSelected, setSabCAtSelected] = useState();
     const [FollowersSelected, setFollowersSelected] = useState("Public");
     const [CustomDropDown, setCustomDropDown] = useState(false);
     const [CustomSubCatigory, setCustomSubCatigory] = useState();
     const [CustomSubSelected, setCustomSubSelected] = useState();
     const [RoleDropDown, setRoleDropDown] = useState(false);
     const [SelectedRoleSub, setSelectedRoleSub] = useState();
     const [Uploadimg, setUploadimg] = useState();
     const [latitude, setLatitude] = useState('')
     const [longitude, setLongitude] = useState('')


     useEffect(() => {
          setViewCati(getViewCategory)
     }, [getViewCategory]);
     useEffect(() => {
          let customdata = new FormData();
          customdata.append("userType", "typeSearch")
          customdata.append("query", "")
          GetCustomDrop("postSpecifiesUsers", customdata);
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
               setCustomSubCatigory(resp4.data.map((items) => {
                    return {
                         value: items.id,
                         label: items.uname,
                    }
               }))
               console.log(resp4)
          } else {
               setSubCatorigoies([{

               }])
          }
     }, [resp4.data])

     const redata = getUserRoles;
     useEffect(() => {
          if (resp6.data) {
               navigate(`/${config.ddemoss}media`);
          }
     }, [resp6.data])


     if (!ViewCati || loading) return <Loader />
     const options1 = [];
     ViewCati.map(item => {
          options1.push({
               value: item?.cat_id,
               label: item?.cat_name,
          });
     })
     const handleChange1 = (values) => {

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
          console.log(values)
          setSabCAtSelected(values)
     }
     const handleChange3 = (values) => {
          console.log(values)
          setCustomSubSelected(values)
     }

     const FollowerHandle = (selectValue) => {
          console.log(selectValue.target.value)
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

     const handleSubmit = () => {
          if ((Uploadimg) && (FollowersSelected)) {

               let FileSubmitdata = new FormData();
               FileSubmitdata.append("submit_file", "submit_file")
               FileSubmitdata.append("upload_file", Uploadimg)
               FileSubmitdata.append("longitude", longitude)
               FileSubmitdata.append("latitude", latitude)
               if (Array.isArray(SelectedFirst)) {
                    SelectedFirst.map((items, i) => {
                         FileSubmitdata.append(`file_cat[${[i]}]`, items)
                    })
               }
               else {
                    FileSubmitdata.append(`file_cat[]`, '')
               }
               if (Array.isArray(SabCAtSelected)) {
                    SabCAtSelected.map((items, i) => {
                         FileSubmitdata.append(`file_subcat[${[i]}]`, items)
                    })
               }
               else {
                    FileSubmitdata.append(`file_subcat[]`, '')
               }
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
                         console.log(SelectedRoleSub)
                         FileSubmitdata.append("file_followers", SelectedRoleSub)
                         swal({
                              title: "Done",
                              text: " File has been uploaded successfully",
                              icon: "success",
                              dangerMode: false,
                         })
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
               apiMethodSubmit("postCreateFilesAndMedia", FileSubmitdata);
               setSelectedFirst([])
               setSabCAtSelected([])
               setCustomSubSelected([])



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

     const inital = {}
     return (
          <div className="section-body mt-4">
               <div className="container-fluid">
                    <Formik initialValues={inital} onSubmit={handleSubmit}

                    >
                         <Form action="">
                              <div className="row clearfix">
                                   <div className="col-md-4 offset-sm-4">
                                        <div className="form-group">
                                             <label className="form-label">Upload File</label>
                                             <div className='dropify-wrapper'>
                                                  <File
                                                       value={Uploadimg}
                                                       onUpload={setUploadimg}
                                                       name={"uploadImg"}
                                                       typeFile="image/*, video/*"
                                                       setLatitude={setLatitude}
                                                       setLongitude={setLongitude}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-md-8 offset-sm-2">
                                        <div className="row clearfix">
                                             <div className="col-md-6">
                                                  <div className="form-group multiselect_div">
                                                       <label className="form-label">Category</label>
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
                                                       <label className="form-label">Sub-Category</label>
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
                                                       <label className="form-label">Followers</label>
                                                       <select name="" id="" className="form-control custom-select" onChange={FollowerHandle}
                                                            value={FollowersSelected}
                                                       >
                                                            <option value="Public">
                                                                 Public
                                                            </option>
                                                            <option value="Private">
                                                                 Private
                                                            </option>
                                                            <option value="Custom" >
                                                                 Custom
                                                            </option>
                                                            <option value="Role">
                                                                 Role
                                                            </option>
                                                       </select>

                                                  </div>
                                             </div>
                                             {CustomDropDown &&
                                                  <div className="col-md-6">
                                                       <div className="form-group multiselect_div">
                                                            <label className="form-label">Category</label>
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
                                                            <label className="form-label">Select User</label>
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
                                   <div className='col-md-12 text-center'>
                                        <button className="btn btn-primary" type='submit'>
                                             Upload files
                                        </button>
                                   </div>
                              </div>
                         </Form>
                    </Formik>
               </div>
          </div>
     );
}

export default Upload_new;