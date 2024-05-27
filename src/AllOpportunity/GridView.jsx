import React from "react";
import config from "../services/config.json";
import PiplineGridCard from "../components/PiplineGridCard";
import Skeleton from "react-loading-skeleton";
function GridView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix">
      { loadingss ? <Skeleton item={data.length ?? 5} /> :  data && <PiplineGridCard deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}opp_pipelines/view/`} editLink={`/${config.ddemoss}opp_pipelines/edit/`} lists={data} />}
    </div>
  );
}

export default GridView;
{
}
