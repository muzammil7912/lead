import React from "react";
import CardGrid from "../components/common/CardGrid";
import config from "../services/config.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProsectGridView({data,loadingss,deletee}) {
  return (
    <div className="row clearfix">
      { loadingss ? <Skeleton count={5} /> :  data && <CardGrid stage={"PROSPECT"}  lead={"prospects"} deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}prospect/view/`} editLink={`/${config.ddemoss}prospect/edit/`} lists={data} />}
    </div>
  );
}

export default ProsectGridView;
