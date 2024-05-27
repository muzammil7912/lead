import React from "react";
import CardGrid from "../components/common/EventCardGrid";
import config from "../services/config.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EventCardGrid from "../components/common/EventCardGrid";
function GridView({respremetio,data,loadingss,deletee}) {

  return (
    <div className="row clearfix">
      { loadingss ? <Skeleton count={5} /> :  data && <EventCardGrid width={"col-xl-4 col-lg-4 col-md-6 col-sm-6"}  type='follow_up' event='Follow Up' link='follow_up' respremeti={respremetio} deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}followup/view/`} editLink={`/${config.ddemoss}followup/edit/`} lists={data} />}
    </div>
  );
}

export default GridView;
{
}
