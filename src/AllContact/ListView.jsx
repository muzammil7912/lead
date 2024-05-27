import React from "react";
import ContactListCard from "../components/ContactListCard";
import config from "../services/config.json";

function ListView({data,deletee}) {

  return (
    <div className="row clearfix listview">
     { data && <ContactListCard  deletes={(item) => deletee(item)}  viewLink={`/${config.ddemoss}`} lists={data} />}
    </div>
  );
}

export default ListView;
  