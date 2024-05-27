

import { Select } from 'antd';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormControl from '../components/form/FormControl';
import Role from '../components/Role';
import usePost from '../customHooks/usePost';
import axios from 'axios';
import { getTokenSession } from '../utils/common';
import config from "../services/config.json";
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';

function EditLeadAssetEditModal({
  obj,
  item,
  sub_category,
  file_parent_id,
  follower_select_list,
  // category_select_list,
  category_data,
  id,
  updateTimeLine,
  file_type,
  module,
  updatedData,
  WebSocket

}) {
  const [followerSelectValue, setfollowerSelectValue] = useState(false)
  const [selectedFollower, setselectedFollower] = useState([])
  const [defaultValueOfCustom_selected_Follower, setdefaultValueOfCustom_selected_Follower] = useState([])
  const [category, setcategory] = useState([])
  const [subCat_selected, setsubCat_selected] = useState([])
  const [subCategoryselect, setsubCategoryselect] = useState([])
  const [resPostCategory, apiMethodPostCategory] = usePost()
  const [showEditModal, setShowEditModal] = useState(false);
  const [resEdit, apiMethodEdit] = usePost();
  const [category_select_list, setCategory_select_list] = useState([])
  const [category_select_list1, setCategory_select_list1] = useState(null)
  const [type_multiple_follower_select, settype_multiple_follower_select] = useState(null)
  const [resowner, apiMethodowner] = usePost();
  const onSearchFollower = (v) => {
    let formdataOwner = new FormData();
    formdataOwner.append("userType", "typeSearch");
    formdataOwner.append("query", v);
    apiMethodowner("postSpecifiesUsers", formdataOwner);
  };

  useEffect(() => {
    if (resEdit.data) {
      console.log(resEdit);
      updatedData && updatedData(resEdit)
      if (file_type === "file") {
        let data = {
          section: "Meeting_Files_edit",
          user_id: "1",
          meeting_id: id,
          data: resEdit,
        }
        WebSocket && WebSocket(data);
      }
      else if (file_type === "media") {
        let data = {
          section: "Meeting_Media_edit",
          user_id: "1",
          meeting_id: id,
          data: resEdit,
        }
        WebSocket && WebSocket(data);
      }
      handleEditModalClose();
      if (resEdit.data.message === "Successfully Updated!") {
        updateTimeLine && updateTimeLine();

        toast.success(resEdit.data.message)
      }

    }

  }, [resEdit.data])
  useEffect(() => {
    if (showEditModal) {
      // console.log(item)
      setcategory(item.file_category.split(','))

      if (item.subCategoriesDropDown) {
        let subData = (item.subCategoriesDropDown).map((val, index) => {
          return {
            value: val.cat_id,
            label: val.cat_name,
          }
        })
        setsubCategoryselect(subData);
      }

      setsubCat_selected(item.file_subcategory.split(","));
      (item.file_followers_type === "Role") && setselectedFollower(item.file_followers.split(","));
      if (item.file_followers !== "" && item.file_followers_type === "Custom") {
        setdefaultValueOfCustom_selected_Follower(item.file_followers.split(","))
      }
      // ((item.file_followers !== "") && item.file_followers_type === "Custom") && setdefaultValueOfCustom_selected_Follower(item.file_followers.split(","))
      setfollowerSelectValue(item.file_followers_type);
      setCategory_select_list(category_data);
      item.followersData && settype_multiple_follower_select(item.followersData);
      // axios.defaults.headers = {
      //   "Content-Type": "multipart/form-data",
      //   authentication: `${getTokenSession()}`,
      // };
      // axios.get(`${config.apiEndPoint}getViewCategory`)
      // .then((response)=>{
      //   setCategory_select_list1(response.data)
      // })
      // .catch((err)=>{
      //   console.log('eerr',err)
      // })
    }
  }, [showEditModal])

  useEffect(() => {
    if (resowner.data) {
      settype_multiple_follower_select(resowner.data)
    }
  }, [resowner.data])
  //   useEffect(() => {
  //     if (item.file_followers != "") {
  // {console.log(item.file_followers.split(","));}
  // setdefaultValueOfCustom_selected_Follower(item.file_followers.split(","))

  //       setselectedFollower(item.file_followers.split(","))
  //       if (resowner.data && !resowner.data.message) {
  //         let a = resowner.data.filter(i => {
  //           if (item.file_followers.split(",").includes(i.id)) {
  //             return i.uname
  //           }
  //         })
  //         if (a.length) {
  //           let nameobj_of_follower = a.map(i => i.uname)
  //           // console.log(nameobj_of_follower);

  //         }
  //       }
  //       if (item.file_followers_type == "Role") {
  //         setselectedFollower(item.file_followers.split(",")[0].toString())
  //       }
  //     }
  //   }, [resowner])



  const subbb = async (v, v2) => {
    setcategory(v)
    let formdata = new FormData();
    formdata.append("general", "get_sub_cat")
    v.map(item => formdata.append(
      "query[]", item
    ))

    apiMethodPostCategory("postViewSubCategory",
      formdata)


    // setsubCategoryselect(sub_category.filter((item) => v.includes(item.type)))

  }
  useEffect(() => {
    if (category_select_list1) {
      let data = category_select_list1.map((val) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        }
      })
      setCategory_select_list(data)
      console.log(data, 'sda');
    }
  }, [category_select_list1])


  useEffect(() => {

    if (resPostCategory.data && !resPostCategory.data.message) {
      let subData = (resPostCategory.data).map((val, index) => {
        return {
          value: val.cat_id,
          label: val.cat_name,
        }
      })
      setsubCategoryselect(subData);
      console.log(subData);
    } else if (resPostCategory.data && resPostCategory.data.message) {
      setsubCategoryselect([]);
    }
  }, [resPostCategory])




  const handleEditModalClose = () => { setShowEditModal(false); }
  const handleShowEditModal = () => {
    setShowEditModal(true);
  }

  const submitEditUpdate = () => {
    const formdata = new FormData()
    formdata.append(`file_id`, item.db_file_id)
    id && formdata.append(`lead_id`, id)
    file_parent_id && formdata.append(`parent_id`, item.parent_id)
    formdata.append(`type`, file_type)
    module && formdata.append(`module`, module)
    followerSelectValue && formdata.append("file_follw", followerSelectValue);
    selectedFollower.length && selectedFollower.map((v, i) => { formdata.append(`file_followers[${i}]`, v); });
    category.length && category.map((v, i) => { formdata.append(`file_cat[${i}]`, v); });
    subCat_selected.length && subCat_selected.map((v, i) => { formdata.append(`file_subcat[${i}]`, v); });
    let regData = formdata;
    apiMethodEdit("postUpdateAssets", regData)
  }


  return (
    <>
      {/* <Formik>
          <Form name="myForm"> */}
      <button
        type="button"
        className="icon medit border-0 text-info  bg-none "
        onClick={handleShowEditModal}>
        <i className="fe fe-edit mr-1"></i>
      </button>


      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Media Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            <FormControl
              className="form-control my-1"
              selectList={follower_select_list}
              label={"Followers"}
              name="follower_select"
              control="select"
              firstSelect={'--select--'}
              defaultValue={item.file_followers_type && item.file_followers_type}
              onChange={e => setfollowerSelectValue(e.target.value)}
            >



            </FormControl>


          </div>
          {followerSelectValue == 'Custom' && <div >
            <label><b>Choose Follower</b></label>
            <Select mode="multiple"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }

              onSearch={(v) => {
                onSearchFollower(v);
              }}
              onChange={(v, v2) => {


                let a = v2.length && v2.map((item) => { return item.key })
                setdefaultValueOfCustom_selected_Follower(a)
                setselectedFollower(a)
              }
              }
              style={{ width: "100%", height: 40 }}
              placeholder={'type follower name'}
              value={defaultValueOfCustom_selected_Follower && defaultValueOfCustom_selected_Follower}
            >
              {type_multiple_follower_select && !type_multiple_follower_select.message && type_multiple_follower_select.map(({ uname, id, role_name }) => (
                <Select.Option value={id.toString()} key={id}>
                  {`${uname} (${role_name})`}
                </Select.Option>
              ))
              }
            </Select>
          </div>}
          {followerSelectValue == 'Role' &&
            <div>
              <label><b>Select User</b></label>



              <select
                className="form-control"
                value={selectedFollower.length && selectedFollower}
                // value={"4"}  
                onChange={(e) => setselectedFollower([e.target.value])} >
                <option hidden>--select--</option>
                <Role obj={obj} />
              </select>
            </div>
          }


          <div className="my-2 mt-2">
            <label><b>Category</b></label>

            <Select mode="multiple"
              onChange={(v, v2) => { subbb(v, v2) }}
              style={{ width: "100%", height: 40 }}
              placeholder={'type follower name'}
              defaultValue={() => {
                if (item.file_category != "") {
                  return item.file_category.split(',')
                }
              }}
            >

              {category_select_list?.length && category_select_list?.map(({ label, value }) => (
                <Select.Option value={value} key={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </div>


          <div className="my-2">
            <label><b>Sub Category</b></label>

            <Select mode="multiple"
              onChange={(v) => { setsubCat_selected(v); console.log(v); }}
              style={{ width: "100%", height: 40 }}
              placeholder={'sub category'}
              defaultValue={() => {
                if (item.file_subcategory != "") {
                  return item.file_subcategory.split(",")
                }
              }}
            >

              {subCategoryselect.length && subCategoryselect.map(({ label, value }) => (
                <Select.Option value={value} key={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </div>

        </Modal.Body>
        <Modal.Footer>

          <Button

            variant="primary" className='d-flex justify-content-center align-item-center' onClick={() => { submitEditUpdate(item) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
              <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
            </svg>  Update
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </Form>
      </Formik> */}
    </>
  );
}

export default EditLeadAssetEditModal;