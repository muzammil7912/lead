import React from "react";
import EventList from "../components/common/EventList";
import CustomSkeleton from "../components/Skeleten/CustomSkeleton";
import config from "../services/config.json";

function ListView({data,loadingss,deletee}) {

  return (
    <div className="row clearfix listview">
     {  loadingss ? <CustomSkeleton item={5} /> : data && <EventList  deletes={(item) => deletee(item)}  link='followup' lists={data} />}
    </div>
  );
}

export default ListView;
