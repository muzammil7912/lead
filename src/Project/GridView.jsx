import React from "react";
import CardGrid from "../components/common/ProjectCardGrid";
import config from "../services/config.json";
import CustomSkeleton from "../components/Skeleten/CustomSkeleton";
function GridView({respremetio,data,loadingss,deletee}) {

  return (
    <div className="row clearfix">
     
      { loadingss ? <CustomSkeleton item={5} /> :  data && <CardGrid  lead={"leads"} respremeti={respremetio} deletes={(item) => deletee(item)} viewLink={`/${config.ddemoss}lead/view/`} editLink={`/${config.ddemoss}lead/edit/`} lists={data} />}
    </div>
  );
}

export default GridView;
{
}
