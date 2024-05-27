import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from './kanban/kanbanMain';
import config from '../services/config.json'
import { getTokenSession } from '../utils/common';
import "react-loading-skeleton/dist/skeleton.css";
import swal from "sweetalert";
import ReactDOMServer from 'react-dom/server'
import usePost from '../customHooks/usePost';



function Kanban({ id }) {
const [stagess, setStagess] = useState([]);
const [allStages, setAllStages] = useState([]);
const [stagesOpportunities, setStagesOpportunities] = useState();
const [resDelete, apiMethodDelete] = usePost()
const [sel, setSel] = useState("")
const [Piplineid, setPiplineid] = useState();
useEffect(() => {
// if(stagess) {
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`}
    axios.post(`${config.apiEndPoint}postAllViewEventsKanban`,{
      id: id,
      type_event: "meeting"
    })
    .then((res)=>{
      console.log(res.data);
      setPiplineid(res?.data?.all_stages[0]?.pipeline_id)
      setStagesOpportunities(res.data.stages_opportunities_pipline)
      setAllStages(res.data.all_stages)
    })

  .catch((err)=>{
    console.log('kanban errr',err)
  })
// }
}, [])
useEffect(() => {
if(resDelete.data) {
  handleApi()
}
}, [resDelete.data])

const handleApi = () => {
  console.log(id);
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`}
    axios.post(`${config.apiEndPoint}postAllViewEventsKanban`,{
      id: id,
      type_event: "meeting"
    })
    .then((res)=>{
      setStagesOpportunities(res.data.stages_opportunities)
      setAllStages(res.data.all_stages)
    })

  .catch((err)=>{
    console.log('kanban errr',err)
  })
}

function _getStages() {
  return(

<select id="befRem" onChange={(e) => {
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
wrapper.innerHTML = `You will not be able to recover this stage later! <br> Convert opportunities into ${ReactDOMServer.renderToString(_getStages())} Stage.`;
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
        formData.append('new_stage', st)
        formData.append('stage_id', _i)
        formData.append('pipeline_id', id)

        formData.append('type','meeting')
     
        
        formData.append('general', 'remove_pipeline_stages')
            apiMethodDelete('postDeleteEventsPiplinesStages', formData)
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
  let a = stagesOpportunities[item.prevstage].filter(ite => ite.event_id == item.event_id);
  let b = stagesOpportunities[item.prevstage].filter(ite => ite.event_id != item.event_id);
let  c = stagesOpportunities[item.stage]
c.push(a[0])
setStagesOpportunities(prevState => ({
     ...prevState, // keep the rest of the keys as they are
     [item.stage]: c, // empty the "20" array
     [item.prevstage]: b // set the "3" array to the new array
  }))
}
}
// if(loading) return <Skeleton count={5} />;
  return (
  <DndProvider backend={HTML5Backend}>
    <div className="overflowdesign" style={{"overflow": "auto"}}>
    <div className='full_lead_stage full_leadnew full_lead_stage_new'>
      {allStages&&(allStages).map(
        (val, i)=>{
          return <Card idss={id} Piplineid={Piplineid} key={i} delte={(item) => handeDelete(item)}  card={val} refreshkanbanToke={(item) => handleApi2(item)} stagesEvent={stagesOpportunities} allStages={allStages} refreshkanban={() => handleApi()}  />
        }
        )
      }
    </div>
      </div>
  </DndProvider>
  )
}

export default Kanban;