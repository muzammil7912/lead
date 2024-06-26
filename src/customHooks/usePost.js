import { getTokenSession } from "../utils/common";
import http from "../services/httpServices";
import config from "../services/config.json";
import { useState } from "react";

const usePost = () => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });
  const authentication = getTokenSession();
  let headers = {
    "Content-Type": "multipart/form-data",
  }
  if(authentication) {
   headers = {
    "Content-Type": "multipart/form-data",
    authentication: `${authentication}`,
  };
} 

  const callAPI  = async (url, payload) => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    http.post(`${config.apiEndPoint}${url}`, payload, {
        headers,
      })
      .then((res) => {
        setRes({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        setRes({ data: null, isLoading: false, error });
      });
  };
  return [res, callAPI];
};
export default usePost;
