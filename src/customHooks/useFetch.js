import { useEffect, useState, useRef } from "react";
import http from "../services/httpServices";
import config from "../services/config.json";
import { useNavigate } from "react-router-dom";
import { getTokenSession, removeTokenSession } from "../utils/common";
const useFetch = ({ setDatas,setDatatrans }, url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authentication = getTokenSession();
  const isComponentMounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isComponentMounted.current) {
      getData();
    }
    return () => {
      isComponentMounted.current = false;
      setData(null);
      setLoading(true);
      setError("");
    };
  }, []);

  const getData = async () => {
    try {
      const { data } = await http.get(`${config.apiEndPoint}${url}`, {
        headers: {
          authentication: `${authentication}`,
        },
      });
      if (
        data.success === 0 &&
        data.status === 401 &&
        data.message === "Unauthorized Token" || data.message === "Invalid Password!"
      ) {
        removeTokenSession();
        navigate(`/${config.ddemoss}login`);
      }
      setDatatrans ? setDatatrans(data) : setDatas &&  setDatas(data);
      setData(data);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      setError(e);
    }
  };

  return {
    loading,
    data,
    setData,
    error,
  };
};
export default useFetch;
