import * as React from "react";
import config from "../../services/config.json";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

export default function List({ id,handleAssignEvent, name,event_array,stageid,stagewon,handleConvert }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "pet",
    item: { id, name,stageid,event_array },
    end(item, monitor) {
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    dragPreview: () => (
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        Dragging {name}
      </div>
    ),
  });
  return (
      <div className="lead-item my-2 list-group-item " ref={dragRef}>
         <div className="sortable1__haeader d-flex justify-content-between align-items-center">
          <div className="sortable1__haeader--left">
           <span>#{event_array.event_id}</span>
           </div>
           <div className="sortable1__haeader--right">
          <ul className="list d-flex align-items-center">
          <li className="box"><a className="agn-ac" data-toggle="tooltip" title="Assign To.." data-placement="top" onClick={() => handleAssignEvent(id,event_array.fullName)} ><i className="fas fa-thumbtack"></i></a></li>
           <li className="boxicon"><a to={`/${config.ddemoss}all_event/edit/${event_array.event_id}`} data-toggle="tooltip" title="" data-placement="top" data-original-title="Edit"><i className="fa fa-pencil"></i></a></li>                                                                                                                                                                                       
          <li className="boxicon"><Link to={`/${config.ddemoss}event/view/${event_array.event_id}`}  ><i className="fa fa-eye"></i></Link></li>
           </ul>
           </div>
          </div>
          <div className="sortable1__bottom ">
          <ul className="list">
          <li className="h7"><i className="fa fa-user"></i> <a>{event_array.fullName}</a></li>
          <li><i className="fa fa-envelope"></i> <span>{event_array.email}</span></li>
          <li><i className="fa fa-phone"></i> <span>{event_array.number}</span></li>
          </ul>
          <Link to={`/${config.ddemoss}event/view/${event_array.event_id}`} className="btn btn-sortlist"><span>More Info</span></Link>
{/* {
  stagewon == "won" &&
  <div>
  <button type="button" className="btn btn-sm justify-content-center bsm btn-default btn-conv" onClick={() => handleConvert(id,event_array.fullName)}>Convert  Assign</button>
   </div>
} */}
         
</div>
                                                                            
        {isDragging && ""}
      </div>
  );
}
