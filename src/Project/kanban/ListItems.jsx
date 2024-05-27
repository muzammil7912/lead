import * as React from "react";
import config from "../../services/config.json";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

export default function List({ id,handleAssignProject, name,project_array,stageid,stagewon,handleConvert }) {
  let project_arrayid = project_array?.id
  
  const [{ isDragging }, dragRef] = useDrag({
    type: "pet",
    item: { id, name,stageid, project_arrayid},
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
           <span>#{project_array.id}</span>
           </div>
           <div className="sortable1__haeader--right">
          <ul className="list d-flex align-items-center">
          <li className="box"><a className="agn-ac" data-toggle="tooltip" title="Assign To.." data-placement="top" onClick={() => handleAssignProject(id,project_array.fullName)} ><i className="fas fa-thumbtack"></i></a></li>
           <li className="boxicon"><Link to={`/${config.ddemoss}edit/project/${project_array.id}`}><i className="fa fa-pencil"></i></Link></li>                                                                                                                                                                                       
          <li className="boxicon"><Link to={`/${config.ddemoss}view/project/${project_array.id}`}  ><i className="fa fa-eye"></i></Link></li>
           </ul>
           </div>
          </div>
          <div className="sortable1__bottom ">
          <ul className="list">
          <li className="h7"><i className="fa-sharp fa-solid fa-tag"></i> <a>{project_array.fullName}</a></li>
          <li><i className="fa-solid fa-clock"></i> {project_array.date}</li>
         </ul>
          <Link to={`/${config.ddemoss}view/project/${project_array.id}`} className="btn btn-sortlist"><span>More Info</span></Link>
{
  stagewon == "won" &&
  <div>
  <button type="button" className="btn btn-sm justify-content-center bsm btn-default btn-conv" onClick={() => handleConvert(id,project_array.fullName)}>Convert  Assign</button>
   </div>
}
         
</div>
                                                                            
        {isDragging && ""}
      </div>
  );
}
