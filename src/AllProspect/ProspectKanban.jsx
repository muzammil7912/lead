import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from './kanban/kanbanMain';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import swal from "sweetalert";
import $ from "jquery";
import ReactDOMServer from 'react-dom/server'
import usePost from '../customHooks/usePost';



function Kanban(kanbanRe) {
  const [resSearchKanban, apiMethodSearchKanban] = usePost();
  const isComponentMounted = useRef(true);
 const [allStages, setAllStages] = useState([]);
const [stagesProspects, setStagesProspects] = useState();
const [resDelete, apiMethodDelete] = usePost()
const [sel, setSel] = useState("")


useEffect(() => {
  if(kanbanRe) {
    const formdata = new FormData();
    let all_prospect_query = localStorage.getItem("all_prospect_query");
    let saveit = localStorage.getItem(`propspectsaveitem`);
    const seaas = saveit ? saveit.split("___")[1] : null;
    if (all_prospect_query) {
      formdata.append("all_prospect_query", all_prospect_query.trim());
    } else if (seaas) {
      formdata.append("all_prospect_query", seaas);
    }
    
    const bodyContent = formdata;
    apiMethodSearchKanban("postProspectsKanbanView", bodyContent);
  }
  }, [kanbanRe])
  useEffect(() => {
    if(resSearchKanban.data) {
      setAllStages(resSearchKanban.data.all_stages)
      setStagesProspects(resSearchKanban.data.stages_Prospects)
    }
    }, [resSearchKanban.data])
    

const handleApi = () => {
  const formdata = new FormData();
  let all_prospect_query = localStorage.getItem("all_prospect_query");
      let saveit = localStorage.getItem(`propspectsaveitem`);
      const seaas = saveit ? saveit.split("___")[1] : null;
      if (all_prospect_query) {
        formdata.append("all_prospect_query", all_prospect_query.trim());
      } else if (seaas) {
        formdata.append("all_prospect_query", seaas);
      }
      
      const bodyContent = formdata;
      apiMethodSearchKanban("postProspectsKanbanView", bodyContent);
}

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
wrapper.innerHTML = `You will not be able to recover this stage later! <br> Convert prospects into ${ReactDOMServer.renderToString(_getStages())} Stage.`;
  swal ({
    title: 'Are you sure?',
    content: wrapper,
    icon: 'warning',
    buttons: ['Cancel','OK']
}).then((willDelete) => {
  let st  =  $('#befRem').find(":selected").val();
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
        formData.append('mode', "Prospect")
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
  if(item.prevstage !== item.stage) {
    console.log("muisdfhuidhi",item.prevstage,item.stage,item)
  let a = stagesProspects[item.prevstage].filter(ite => ite.prospect_id == item.prospect_id);
  let b = stagesProspects[item.prevstage].filter(ite => ite.prospect_id != item.prospect_id);
let  c = stagesProspects[item.stage]
c.push(a[0])
setStagesProspects(prevState => ({
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
    <div className='full_lead_stage full_prospectnew full_lead_stage_new'>
      {allStages&&(allStages).map(
        (val, i)=>{
          return <Card key={i} delte={(item) => handeDelete(item)}  card={val} refreshkanbanToke={(item) => handleApi2(item)} stagesProspect={stagesProspects} allStages={allStages} refreshkanban={() => handleApi()}  />
        }
        )
      }
    </div>
      </div>
  </DndProvider>
  )
}

export default Kanban;