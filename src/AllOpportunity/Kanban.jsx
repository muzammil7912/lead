import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from './kanban/kanbanMain';
import config from '../services/config.json'
import { getTokenSession } from '../utils/common';
import "react-loading-skeleton/dist/skeleton.css";
import swal from "sweetalert";
import $ from "jquery";
import ReactDOMServer from 'react-dom/server'
import usePost from '../customHooks/usePost';



function Kanban({ id }) {
const [allStages, setAllStages] = useState([]);
const [stagesLeads, setStagesLeads] = useState();
const [resDelete, apiMethodDelete] = usePost()
const [sel, setSel] = useState("")
const isComponentMounted = useRef(true);
const [res, apiMethod] = usePost();

useEffect(() => {
// if(stagess) {
  if (isComponentMounted.current) {
    let oppGet = new FormData();
    oppGet.append("opportunity", id);
    apiMethod("postAllViewOpportunitiesKanban", oppGet);
   
  }
  return () => {
    isComponentMounted.current = false;
  };
 
// }
}, [])
useEffect(() => {
if(res.data) {
  setStagesLeads(res.data.stages_opportunities_pipline)
  setAllStages(res.data.all_stages)
}
}, [res.data])
useEffect(() => {
if(resDelete.data) {
  handleApi()
}
}, [resDelete.data])

const handleApi = () => {
  axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${getTokenSession()}`}
    axios.post(`${config.apiEndPoint}postAllViewOpportunitiesKanban`,{
      opportunity: id
    })
    .then((res)=>{
      setStagesLeads(res.data.stages_opportunities_pipline)
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
        formData.append('pipeline_id', id)
        formData.append('stage_id', _i)
        formData.append('new_stage', st)
        formData.append('general', 'remove_pipeline_stages')
        apiMethodDelete('postDeleteOpportunitypiplinesStages', formData)
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
    let a = stagesLeads[item.prevstage].filter(ite => ite.opportunity_id == item.opportunity_id);
    let b = stagesLeads[item.prevstage].filter(ite => ite.opportunity_id != item.opportunity_id);
    let  c = stagesLeads[item.stage]
    c.push(a[0])
    setStagesLeads(prevState => ({
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
          return <Card idss={id} key={i} delte={(item) => handeDelete(item)}  card={val} refreshkanbanToke={(item) => handleApi2(item)} stagesOpportunity={stagesLeads} allStages={allStages} refreshkanban={() => handleApi()}  />
        }
        )
      }
    </div>
      </div>
  </DndProvider>
  )
}

export default Kanban;