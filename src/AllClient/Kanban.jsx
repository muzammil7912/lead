
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
  const isComponentMounted = useRef(true);
  const [allStages, setAllStages] = useState([]);
const [stagesClients, setStagesClients] = useState();
const [resDelete, apiMethodDelete] = usePost()
const [sel, setSel] = useState("")

useEffect(() => {
  if(kanbanRe) {
    console.log("m")
    const formdata = new FormData();
    let all_clients_query = localStorage.getItem("all_clients_query");
    let saveit = localStorage.getItem(`clientsaveitem`);
    const seaas = saveit ? saveit.split("___")[1] : null;
    if (all_clients_query) {
      formdata.append("all_clients_query", all_clients_query.trim());
    } else if (seaas) {
      formdata.append("all_clients_query", seaas);
    }
    
    const bodyContent = formdata;
    apiMethodSearchKanban("postClientsKanbanView", bodyContent);
  }
  }, [kanbanRe])

const handleApi = () => {
  const formdata = new FormData();
  let all_clients_query = localStorage.getItem("all_clients_query");
      let saveit = localStorage.getItem(`clientsaveitem`);
      const seaas = saveit ? saveit.split("___")[1] : null;
      if (all_clients_query) {
        formdata.append("all_clients_query", all_clients_query.trim());
      } else if (seaas) {
        formdata.append("all_clients_query", seaas);
      }
      
      const bodyContent = formdata;
      apiMethodSearchKanban("postClientsKanbanView", bodyContent);

}
useEffect(() => {
  if(resSearchKanban.data) {
    setAllStages(resSearchKanban.data.all_stages)
    setStagesClients(resSearchKanban.data.stages_clients)
  }
  }, [resSearchKanban.data])
  
function _getStages() {
  return(

<select id="befRem" onChange={(e) => {
        console.log(e.target.value)
        setSel(e.target.value)
      }}>
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
wrapper.innerHTML = `You will not be able to recover this stage later! <br> Convert clients into ${ReactDOMServer.renderToString(_getStages())} Stage.`;
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
        formData.append('mode', "Client")
        formData.append('stageRemoval', 'delete_Stages')
        apiMethodDelete('deleteClientsKanbanStages', formData)
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
  if(item.prevstage !== item.stage) {
  let a = stagesClients[item.prevstage].filter(ite => ite.client_id == item.client_id);
  let b = stagesClients[item.prevstage].filter(ite => ite.client_id != item.client_id);
let  c = stagesClients[item.stage]
c.push(a[0])
setStagesClients(prevState => ({
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
    <div className='full_client_stage full_leadnew full_lead_stage_new'>
      {allStages&&(allStages).map(
        (val, i)=>{
          return <Card key={i} delte={(item) => handeDelete(item)}  card={val} refreshkanbanToke={(item) => handleApi2(item)} stagesClient={stagesClients} allStages={allStages} refreshkanban={() => handleApi()}  />
        }
        )
      }
    </div>
      </div>
  </DndProvider>
  )
}

export default Kanban;