import React,{useState,useRef,useEffect} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from './components/common/Loading';
import config from "./services/config.json";
import axios from "axios";
import { getTokenSession } from "./utils/common";
import { toast } from "react-toastify";
import { Progress } from 'antd';


function CalenderTest() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  let GoogleSync = localStorage.getItem(`GoogleSync`);
  let location = useLocation();
    const isComponentMounted = useRef(true);
    console.log(location.search.replace('?', '&'))
    const { id } = useParams();
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress === 60) {
            clearInterval(interval);
            return prevProgress;
          } else {
            return prevProgress + 10; // Increase the progress by 10%
          }
        });
      }, 1000);
        if (isComponentMounted.current) {
            axios.defaults.headers = {
                "Content-Type": "multipart/form-data",
                authentication: `${getTokenSession()}`,
              };
              axios.get(`${config.apiEndPoint}getGoogleSync/${GoogleSync}${location.search  }`)
                .then((response) => {
                  setProgress(100)
                  if(response.data.redirect_url === true) {
                    localStorage.removeItem(`GoogleSync`)
                    navigate(`/${config.ddemoss}calendar`)
                    toast.success(response.data.message)

                  }
                 
                })
                .catch((err) => {
                  console.log('eerr', err)
                })
          }
          return () => {
            isComponentMounted.current = false;
          };
    }, [])  
      
  return (
    <div className='progesst'>
        <h2>{progress === 100 ? "Complete" : "Please Wait..."}</h2>
    <Progress percent={progress} />
    </div>
  )
}

export default CalenderTest