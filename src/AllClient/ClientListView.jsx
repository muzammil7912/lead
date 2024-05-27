import React from "react";
import config from "../services/config.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardList from "../components/common/CardList";
function ClientListView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix listview">
     {  (loadingss || !data) ? <Skeleton count={5} /> : data && <CardList  deletes={(item) => deletee(item)}  viewLink={`/${config.ddemoss}client/view/`}  lists={data} />}
    </div>
  );
}

export default ClientListView;
{
}

