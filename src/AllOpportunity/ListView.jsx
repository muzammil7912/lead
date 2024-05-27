import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PiplineListCard from "../components/PiplineListCard";
import config from "../services/config.json";

function ListView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix listview">
     {  loadingss ? <Skeleton count={5} /> : data && <PiplineListCard  deletes={(item) => deletee(item)}  viewLink={`${config.ddemoss}opp_pipelines/view/`} lists={data} />}
    </div>
  );
}

export default ListView;
