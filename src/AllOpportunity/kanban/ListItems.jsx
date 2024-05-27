import React,{useContext} from "react";
import config from "../../services/config.json";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { MainLeadPermissionContext } from "../../context/MainLeadPermissionContext";
import { MainAuthPermissionsContext } from "../../context/MainAuthPermissionsContext";

export default function List({ id,handleAssignOpportunity, name,opportunity_array,stageid,stagewon,handleConvert }) {
  const { leadPermission } = useContext(MainLeadPermissionContext);
  const { permissions } = useContext(MainAuthPermissionsContext);
 
  const [{ isDragging }, dragRef] = useDrag({
    type: "pet",
    item: { id, name,stageid,opportunity_array },
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
      <div className="lead-item my-4 list-group-item " ref={dragRef}>
         <div className="sortable1__haeader d-flex justify-content-between align-items-center">
          <div className="sortable1__haeader--left">
           <span>#{opportunity_array.opportunity_id}</span>
           </div>
           <div className="sortable1__haeader--right">
          <ul className="list d-flex align-items-center">
           {
             ((opportunity_array?.kanban_do_follow === false) ||  leadPermission?.super_admin) &&
             <>
            {
              (opportunity_array?.assign_op || opportunity_array?.lead_by === permissions.opportunity_id || leadPermission?.super_admin) &&
              <li className="box"><Link className="agn-ac" data-toggle="tooltip" title="Assign To.." data-placement="top" onClick={() => handleAssignOpportunity(id,opportunity_array.fullName)} ><i className="fas fa-thumbtack"></i></Link></li>
}
            {
              (leadPermission["opportunities"]?.edit === "1" || leadPermission?.super_admin) &&
<li className="boxicon"><Link to={`/${config.ddemoss}opp_pipelines/edit/${opportunity_array.opportunity_id}`} data-toggle="tooltip" title="" data-placement="top" data-original-title="Edit"><i className="fa fa-pencil"></i></Link></li>                                                                                                                                                                                       
               
              }
            
            </>
           }
           <li className="boxicon"><Link to={`/${config.ddemoss}opp_pipelines/view/${opportunity_array.opportunity_id}`}  ><i className="fa fa-eye"></i></Link></li>
           
           </ul>
           </div>
          </div>
          <div className="sortable1__bottom ">
          <ul className="list">
         
  <li className="h7"><i className="fa-sharp fa-solid fa-tag"></i> <a>{opportunity_array.fullName}</a></li>
               <li><i className="fa-solid fa-clock"></i> <span>{opportunity_array.date}</span></li>
             
          {/* <li><i className="fa fa-phone"></i> <span>{opportunity_array.number}</span></li> */}
          </ul>
          <Link to={`/${config.ddemoss}opp_pipelines/view/${opportunity_array.opportunity_id}`} className="btn btn-sortlist"><span>More Info</span></Link>
          {
 ( (stagewon === "won") && (opportunity_array.prospectOwner === true)) &&
  <div>
  <button type="button" className="btn btn-sm justify-content-center bsm btn-default btn-conv" onClick={() => handleConvert(id, name,stageid,opportunity_array)}>Convert  To Client</button>
   </div>
}
         
</div>
                            
      </div>
  );
}
