import React, { useState } from "react";
import useFetch from "../customHooks/useFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ContactCardview from "../components/common/AllContactCardList";

function ContactView() {
  const [datas, setDatas] = useState("");
  const { loading, error, data } = useFetch({ setDatas }, "getAllContact");
  return (
    <div className="row clearfix">
      {loading ? <Skeleton count={5} /> : <ContactCardview viewLink={"/contact/view/"} data={data} />}
    </div>
  );
}

export default ContactView;
