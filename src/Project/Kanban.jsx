import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from './kanban/kanbanMain';
import config from '../services/config.json'
import { getTokenSession } from '../utils/common';
import swal from "sweetalert";
import ReactDOMServer from 'react-dom/server'
import usePost from '../customHooks/usePost';



function Kanban({ id }) {
  const isComponentMounted = useRef(true);
  const [res, apiMethod] = usePost();
const [allStages, setAllStages] = useState([]);
const [stagesProjects, setStagesProjects] = useState();
const [resDelete, apiMethodDelete] = usePost()
const [sel, setSel] = useState("")
useEffect(() => {
  if (isComponentMounted.current) {
    let oppGet = new FormData();
    oppGet.append("projects", id);
    apiMethod("postAllViewProjectsKanban", oppGet);
   
  }
  return () => {
    isComponentMounted.current = false;
  };

}, [])
useEffect(() => {
  if(res.data) {
    setStagesProjects(res.data.stages_projects_pipline)
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
    axios.post(`${config.apiEndPoint}postAllViewProjectsKanban`,{
      projects: id
    })
    .then((res)=>{
      setStagesProjects(res.data.stages_projects_pipline)
      setAllStages(res.data.all_stages)
    })

  .catch((err)=>{
    console.log('kanban errr',err)
  })
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
wrapper.innerHTML = `You will not be able to recover this stage later! <br> Convert projects into ${ReactDOMServer.renderToString(_getStages())} Stage.`;
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
        formData.append('general', 'remove_pipeline_stages')
        apiMethodDelete('postDeleteProjectspiplinesStages', formData)
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
  let a = stagesProjects[item.prevstage].filter(ite => ite.id == item.project_id);
  let b = stagesProjects[item.prevstage].filter(ite => ite.id != item.project_id);
let  c = stagesProjects[item.stage]
c.push(a[0])
setStagesProjects(prevState => ({
     ...prevState, // keep the rest of the keys as they are
     [item.stage]: c, // empty the "20" array
     [item.prevstage]: b // set the "3" array to the new array
  }))
}
}
  return (
  <DndProvider backend={HTML5Backend}>
    <div className="overflowdesign" style={{"overflow": "auto"}}>
      {console.log(stagesProjects)}
    <div className='full_lead_stage full_leadnew full_lead_stage_new'>
      {allStages&&(allStages).map(
        (val, i)=>{
          return <Card key={i} idss={id} delte={(item) => handeDelete(item)}  card={val} refreshkanbanToke={(item) => handleApi2(item)} stagesProject={stagesProjects} allStages={allStages} refreshkanban={() => handleApi()}  />
        }
        )
      }
    </div>
      </div>
  </DndProvider>
  )
}

export default Kanban;