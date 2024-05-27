import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import config from "../services/config.json";
import ListCard from "./ListCard";

function ListView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix listview">
     {  loadingss ? <Skeleton count={5} /> : data && <ListCard  deletes={(item) => deletee(item)}  viewLink={`${config.ddemoss}lead/view/`} lists={data} />}
    </div>
  );
}

export default ListView;
