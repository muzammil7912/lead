import React from "react";
import config from "../../services/config.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PiplineGridCard from "../../components/PiplineGridCard";
function AllPiplineGridView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix">
      { loadingss ? <Skeleton count={5} /> :  data && <PiplineGridCard deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}opp_pipelines/view/`} editLink={`/${config.ddemoss}opp_pipelines/edit/`} lists={data} />}
    </div>
  );
}

export default AllPiplineGridView;
{
}
