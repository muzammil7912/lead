import React from "react";
import CardGrid from "../components/common/CardGrid";
import config from "../services/config.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ClientGridView({data,loadingss,deletee}) {
  return (
    <div className="row clearfix">
      { (loadingss || !data)  ? <Skeleton  count={data.length ?? 5} /> :  data && <CardGrid stage={"CLIENT"}  lead={"clients"} deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}client/view/`} editLink={`/${config.ddemoss}client/edit/`} lists={data} />}
    </div>
  );
}

export default ClientGridView;

