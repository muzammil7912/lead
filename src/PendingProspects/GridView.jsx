import React from "react";
import CardGrid from "../components/common/CardGrid";
import config from "../services/config.json";
import CustomSkeleton from "../components/Skeleten/CustomSkeleton";
function GridView({respremetio,data,loadingss,deletee,validate,hanValidates}) {

  return (
    <div className="row clearfix">
      { loadingss ? <CustomSkeleton item={5} /> :  data && <CardGrid stage={"PROSPECT"} hanValidate={(item) => hanValidates(item)} validates={validate} lead={"prospects"} respremeti={respremetio} deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}prospect/view/`} editLink={`/${config.ddemoss}prospect/edit/`} lists={data} />}
    </div>
  );
}

export default GridView;
{
}
