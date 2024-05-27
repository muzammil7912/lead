import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import CardGrid from "../components/common/CardGrid";
import config from "../services/config.json";
function GridView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix">
      { loadingss ? <Skeleton count={data.length ?? 5} /> :  data && <CardGrid stage={"LEAD"}  lead={"leads"} deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}lead/view/`} editLink={`/${config.ddemoss}lead/edit/`} lists={data} />}
    </div>
  );
}

export default GridView;
{
}
