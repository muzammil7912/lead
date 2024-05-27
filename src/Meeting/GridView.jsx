import React from "react";
import CardGrid from "../components/common/EventCardGrid";
import config from "../services/config.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EventCardGrid from "../components/common/EventCardGrid";
function GridView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix">
      { loadingss ? <Skeleton count={5} /> :  data && <EventCardGrid width={"col-xl-4 col-lg-4 col-md-6 col-sm-6"}  link='meeting' event='Meeting'  deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}meeting/view/`} editLink={`/${config.ddemoss}meeting/edit/`} lists={data} />}
    </div>
  );
}

export default GridView;
{
}
