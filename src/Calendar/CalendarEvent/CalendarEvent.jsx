import { useContext, useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import config from "../../services/config.json";
import { MainHeadingContext } from "../../context/MainHeadingContext";
import Loader from '../../components/common/Loading';
import useFetch from '../../customHooks/useFetch';
import usePost from '../../customHooks/usePost';
import { toast } from "react-toastify";
import axios from "axios";
import { getTokenSession } from "../../utils/common";
import swal from "sweetalert";
import { Pagination } from 'antd';
import GridView from "./GridView";
import ListView from "./ListView";
import Calendar from "./Calendar";
import NavigationPill from "../../components/form/NavigationPill";
import { Link } from "react-router-dom";
import { Translation } from "../../components/Translation";
import { FaList, FaRegAddressBook, FaTh } from "react-icons/fa";
import { MainTranslationContexts } from "../../context/MainTranslationContexts";

function CalendarEvent() {
  const { translations } = useContext(MainTranslationContexts)
  const [currentItem, setCurrentItem] = useState("Grid");
  const [click, setClick] = useState(false)
  const [datas, setDatas] = useState("");
  const [limit, setlimit] = useState();
  const [pagination, setpagination] = useState()
  const [totalleads, settotalleads] = useState();
  // const { data: allCalendar, loading2,error2} = useFetch("","getAllInstance");
  const { data: calendardata, loading, error, } = useFetch({ setDatas }, "getAllEvents");
  const { data: getCalenderData, loadind1 } = useFetch("", `getAllCalendars`);
  const [resSearch, apiMethodSearch] = usePost();
  const { addHeading } = useContext(MainHeadingContext);
  const [resdelete, apiMethoddelete] = usePost();

  const handleDelete = (itemd) => {
    swal({
      title: "Are you sure, you want to delete?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        let FormDatas = new FormData();
        apiMethoddelete(`postDeleteEvent/${itemd.event_db_id}`, FormDatas);
        setDatas(datas.filter(item => item.event_db_id !== itemd.event_db_id));
      }
    })
  }
  useEffect(() => {
    if (resdelete.data && !resdelete.isLoading) {
      resdelete.data.message && toast.success(resdelete.data.message);

    }
  }, [resdelete.data])
  const practiceProfileRender = {
    ["Grid"]: <GridView dataa={datas} deletes={(item) => handleDelete(item)} />,
    ["List"]: <ListView dataa={datas} deletes={(item) => handleDelete(item)} />,
    ["Calendar"]: <Calendar dataa={datas} />,
  };
  useEffect(() => {
    addHeading("Events Management")
  }, [])
  function submit1(page, pageSize) {


    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      authentication: `${getTokenSession()}`,
    };
    axios.get(`${config.apiEndPoint}getAllEvents/${page}`)
      .then((response) => {
        console.log(response.data)
        setDatas(response.data)

      })
      .catch((err) => {
        console.log('eerr', err)
      })

  }
  const initialValues = {
    event_title: "",
    event_type: "",
    event_calendar_id: "",
    event_privacy: "",
  }
  const items = [
    {
      label: "Grid",
      icon: <FaTh />,
    },
    {
      label: "List",
      icon: <FaList />
    },
    {
      label: "Calendar",
      icon: <FaRegAddressBook />
    },
  ];
  const handleSearch = (values) => {
    console.log(values)
    let formdata = new FormData();
    for (let item in values) {
      if (item === "") {

      }
      else {
        formdata.append(item, values[item]);
      }
    }

    apiMethodSearch("postSearchEvents", formdata);

  }
  useEffect(() => {
    if (resSearch.data) {
      setDatas(resSearch.data)
      setClick(true)
    }
  }, [resSearch.data])
  const handleClick = (e) => {
    setDatas(calendardata)
    setClick(false);
  }
  useEffect(() => {
    if (calendardata) {
      if (!calendardata.message) {
        setpagination(true)
        settotalleads(calendardata[0].pagination?.total_record)
        setlimit(calendardata[0].pagination?.limit)
      }
    }
  }, [calendardata])
  if (loading || loadind1) return <Loader />

  return (
    <div className="calendarEvnet">
      <div className="container-fluid">
        <div className="card leadCard">
          <div className="card-headers p-3">
            <div className="d-md-flex justify-content-between align-item-center mb-4">
              <ul className="nav nav-tabs b-none">
                <NavigationPill
                  items={items}
                  currentItem={currentItem}
                  onCurrentItem={setCurrentItem}
                />
                <li className="nav-item">
                  <Link className="nav-link" to={`/${config.ddemoss}calendar/new_event`}>
                    <i className="fa fa-plus"></i>
                    {Translation(translations, "New Events")}
                  </Link>
                </li>
              </ul>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSearch}
            >
              <Form name="myForm">
                <div className="row">
                  <div className="col-lg-3">
                    <label htmlFor="">Title</label>
                    <Field type="text" name="event_title" className="form-control form-control-sm w-100 filter_event" />
                  </div>
                  <div className="col-lg-3">
                    <label htmlFor="">Type</label>
                    <Field as="select" name={"event_type"} className="form-control form-control-sm col-sm-12 filter_event">
                      <option value="">--Select--</option>
                      <option value="event">Event</option>
                      <option value="meeting">Meeting</option>
                      <option value="action">Action</option>
                      <option value="follow_up">Follow Up</option>
                      <option value="reminder">Reminder</option>
                      <option value="out_of_office">Out of Office</option>
                    </Field>
                  </div>
                  <div className="col-lg-3">
                    <label htmlFor="">Calendar</label>
                    <Field as="select" name="event_calendar_id" className="form-control form-control-sm col-sm-12 filter_event">
                      <option hidden>--Select--</option>
                      {Array.isArray(getCalenderData) && getCalenderData?.map(item => {
                        return (
                          <option key={item?.cl_db_did} value={item?.cl_db_did}>{item?.calendar_name}</option>
                        )
                      })}
                    </Field>
                  </div>
                  <div className="col-lg-3">
                    <label htmlFor="">PRIVACY</label>
                    <Field as="select" name={"event_privacy"} className="form-control form-control-sm col-sm-12 filter_event">
                      <option value="">--Select--</option>
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                    </Field>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-3 align-item-center">
                  <button type="submit" className="btn  btn-outline-secondary btn-sr">Search</button>
                  {
                    click && <span className="ers"><small><Link onClick={(e) => handleClick(e)} className="card-filter-sr btn btn-info btn-war-1"><i className="fa fa-times"></i> Clear search</Link></small></span>
                  }
                </div>
              </Form>
            </Formik>


          </div>
        </div>
        <div className="container-fluid px-0" id="gridcol">
          {practiceProfileRender[currentItem]}
        </div>
        {pagination && currentItem != "Calendar"? <Pagination defaultCurrent={1} pageSize={Number(limit)} defaultPageSize={5} total={totalleads} onChange={submit1} /> : null}
      </div>
    </div>
  )

}

export default CalendarEvent