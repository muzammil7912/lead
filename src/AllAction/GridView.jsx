import React from "react";
import config from "../services/config.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EventCardGrid from "../components/common/EventCardGrid";
function GridView({ respremetio, data, loadingss, deletee }) {

  return (
    <div className="row clearfix">
      {loadingss ? <Skeleton count={5} /> : data && <EventCardGrid width={"col-xl-4 col-lg-4 col-md-6 col-sm-6"} link='action' event='Action' respremeti={respremetio} deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}action/view/`} editLink={`/${config.ddemoss}action/edit/`} lists={data} />}
    </div>
  );
}

export default GridView;
{
}
