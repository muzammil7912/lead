import React, { useState } from "react";
import ProspectCardList from "../components/common/ProspectCardList.jsx";
import useFetch from "../customHooks/useFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ContactCardview from "../components/common/AllContactCardList";
function ContactListView() {
  const [datas, setDatas] = useState("");
  const { data, loading, error } = useFetch({ setDatas }, "getAllContact");
  return (
    <div className="row clearfix listview">
      {loading ? <Skeleton count={5} /> : <ContactCardview viewLink={"/contact/view/:id"} data={data} />}
    </div>
  );
}

export default ContactListView;
