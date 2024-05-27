
import React,{useState,useEffect,useRef} from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from './kanban/kanbanMain';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import swal from "sweetalert";
import ReactDOMServer from 'react-dom/server'
import usePost from '../customHooks/usePost';



function Kanban(kanbanRe) {
  const [resSearchKanban, apiMethodSearchKanban] = usePost();

  useEffect(() => {
  if(kanbanRe) {
    const formdata = new FormData();
    let all_lead_query = localStorage.getItem("all_lead_query");
    let saveit = localStorage.getItem(`saveitem`);
    const seaas = saveit ? saveit.split("___")[1] : null;
    if (all_lead_query) {
      formdata.append("all_lead_query", all_lead_query.trim());
    } else if (seaas) {
      formdata.append("all_lead_query", seaas);
    }
    
    const bodyContent = formdata;
    apiMethodSearchKanban("postLeadsKanbanView", bodyContent);
  }
  }, [kanbanRe])
  
  
  const [allStages, setAllStages] = useState([]);
const [stagesLeads, setStagesLeads] = useState();
const [resDelete, apiMethodDelete] = usePost()
const [sel, setSel] = useState("")
useEffect(() => {
if(resSearchKanban.data) {
  setAllStages(resSearchKanban.data.all_stages)
  setStagesLeads(resSearchKanban.data.stages_leads)
}
}, [resSearchKanban.data])

const handleApi = () => {
  const formdata = new FormData();
  let all_lead_query = localStorage.getItem("all_lead_query");
      let saveit = localStorage.getItem(`saveitem`);
      const seaas = saveit ? saveit.split("___")[1] : null;
      if (all_lead_query) {
        formdata.append("all_lead_query", all_lead_query.trim());
      } else if (seaas) {
        formdata.append("all_lead_query", seaas);
      }
      
      const bodyContent = formdata;
      apiMethodSearchKanban("postLeadsKanbanView", bodyContent);
}

function _getStages() {
  return(<select id="befRem" onChange={(e) => {
        setSel(e.target.value)}}>
  <option value="">--Select--</option>
 {allStages.map((item,index) => {
  return (
    <option key={index} value={item.id}>{item.name}</option>
  )
 })
}
</select>
  )
  }

let valitem;
const handeDelete = (item) => {
  valitem = item.id
  swalre();
}
function swalre() {
  const wrapper = document.createElement('div');
wrapper.innerHTML = `You will not be able to recover this stage later! <br> Convert leads into ${ReactDOMServer.renderToString(_getStages())} Stage.`;
  swal ({
    title: 'Are you sure?',
    content: wrapper,
    icon: 'warning',
    buttons: ['Cancel','OK']
}).then((willDelete) => {
  let st  =  document.querySelector('#befRem option:checked').value;
  var _i = valitem;
  if (willDelete) {
    if (st == '') {
      swal({
          title: "Please selet stage first! before removing the stage.",
          allowOutsideClick: false,
          closeOnClickOutside: false,
        })
        .then(() => {
          swalre();
        })

    }
    else {
      if (st == _i) {
        swal({
            title: "You are going to delete this stage! please select other stage.",
            allowOutsideClick: false,
            closeOnClickOutside: false,
          })
          .then(() => {
            swalre();
          })
      }
      else {
        let formData = new FormData();
        formData.append('cstage', st)
        formData.append('stage', _i)
        formData.append('mode', "Lead")
        formData.append('stageRemoval', 'delete_Stages')
        apiMethodDelete('deleteKanbanStages', formData)
      }
    }
  }
    });

  }
useEffect(() => {
  if(resDelete.data) {
    if(resDelete.data.success == "0") {
      swal({
        title: `${resDelete.data.message}`,
        icon: "error",
        allowOutsideClick: false,
        closeOnClickOutside: false,
      })
      .then(() => {
        swalre();
      })
    }
    else {
      handleApi()
      swal({
        title: "Deleted!",
        text: 'Stage has been deleted.',
        icon: "success",
        allowOutsideClick: false,
        closeOnClickOutside: false,
      })
    }
  }
}, [resDelete.data])
const handleApi2 = (item) => {
  console.log(item)
  if(item.prevstage !== item.stage) {
  let a = stagesLeads[item.prevstage].filter(ite => ite.lead_id == item.lead_id);
  let b = stagesLeads[item.prevstage].filter(ite => ite.lead_id != item.lead_id);
let  c = stagesLeads[item.stage]
c.push(a[0])
setStagesLeads(prevState => ({
     ...prevState, // keep the rest of the keys as they are
     [item.stage]: c, // empty the "20" array
     [item.prevstage]: b // set the "3" array to the new array
  }))
}
}
// if(resSearchKanban.isLoading) return <Skeleton count={5} />;
  return (
  <DndProvider backend={HTML5Backend}>
    <div className="overflowdesign" style={{"overflow": "auto"}}>
      {console.log(stagesLeads)}
    <div className='full_lead_stage full_leadnew full_lead_stage_new'>
      {allStages&&(allStages).map(
        (val, i)=>{
          return <Card key={i+val.id}  delte={(item) => handeDelete(item)}  card={val} refreshkanbanToke={(item) => handleApi2(item)} stagesLead={stagesLeads} allStages={allStages} refreshkanban={() => handleApi()}  />
        }
        )
      }
    </div>
      </div>
  </DndProvider>
  )
}

export default Kanban;