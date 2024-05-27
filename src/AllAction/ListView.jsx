import React from "react";
import CardList from "../components/common/CardList";
import EventList from "../components/common/EventList";
import CustomSkeleton from "../components/Skeleten/CustomSkeleton";
import config from "../services/config.json";

function ListView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix listview">
     {  loadingss ? <CustomSkeleton item={5} /> : data && <EventList link='action'  deletes={(item) => deletee(item)}   lists={data} />}
    </div>
  );
}

export default ListView;
