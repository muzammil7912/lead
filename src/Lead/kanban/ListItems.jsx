import React,{useContext} from "react";
import config from "../../services/config.json";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";

export default function List({ id,demo, handleAssignLead, name,lead_array,stageid,stagewon,handleConvert }) {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
  
  const [{ isDragging }, dragRef] = useDrag({
    type: "pet",
    item: { id, name,stageid,lead_array },
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
      <div id={demo}  className="lead-item my-3 list-group-item " ref={dragRef}>
         <div className="sortable1__haeader d-flex justify-content-between align-items-center">
          <div className="sortable1__haeader--left">
           <span>#{lead_array.lead_id}</span>
           </div>
           <div className="sortable1__haeader--right">
          <ul className="list d-flex align-items-center">
            {
              ((lead_array?.kanban_do_follow === false) ||  leadPermission?.super_admin) &&
              <>
              {
                (lead_array?.assign_op || lead_array?.lead_by === permissions.id || leadPermission?.super_admin) &&
                <li className="box"><a className="agn-ac" data-toggle="tooltip" title="Assign To.." data-placement="top" onClick={() => handleAssignLead(id,lead_array.fullName,lead_array)} ><i className="fas fa-thumbtack"></i></a></li>
              }
              {
                (leadPermission["leads"]?.edit === "1" || leadPermission?.super_admin) &&
                <li className="boxicon"><Link to={`/${config.ddemoss}lead/edit/${lead_array.lead_id}`}><i className="fa fa-pencil"></i></Link></li>                                                                                                                                                                                       
              }
              
              </>
            }
          <li className="boxicon"><Link to={`/${config.ddemoss}lead/view/${lead_array.lead_id}`}  ><i className="fa fa-eye"></i></Link></li>
           </ul>
           </div>
          </div>
          <div className="sortable1__bottom ">
          <ul className="list">
          <li className="h7"><i className="fa fa-user"></i> <a>{lead_array.fullName}</a></li>
          <li><i className="fa fa-envelope"></i> <span>{lead_array.email}</span></li>
          <li><i className="fa fa-phone"></i> <span>{lead_array.mobile_phone}</span></li>
          </ul>
          <Link to={`/${config.ddemoss}lead/view/${lead_array.lead_id}`} className="btn btn-sortlist"><span>More Info</span></Link>
{
  stagewon === "won" &&
  <div>
  <button type="button" className="btn btn-sm justify-content-center bsm btn-default btn-conv" onClick={() => handleConvert(id,lead_array.fullName,lead_array)}>Convert  Assign</button>
   </div>
}
         
</div>
                                                                            
        {isDragging && ""}
      </div>
  );
}
