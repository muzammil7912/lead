import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardList from "../components/common/CardList";
import config from "../services/config.json";

function ListView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix listview">
     {  loadingss ? <Skeleton count={5} /> : data && <CardList  deletes={(item) => deletee(item)}  viewLink={`${config.ddemoss}prospect/view/`} lists={data} />}
    </div>
  );
}

export default ListView;
