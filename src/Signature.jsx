import React, { useEffect, useState,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './components/common/Loading';
import useFetch from './customHooks/useFetch';
import { StringConvert } from './components/StringConvert';
import usePost from './customHooks/usePost';
import config from "./services/config.json";
import { Helmet } from 'react-helmet-async';

const Signature = () => {
    const { id } = useParams();
    const [res, apiMethod] = usePost();
    const [datas2, setDatas2] = useState("");
    const navigate = useNavigate();
    const { data: allusersedit2, loading2 } = useFetch("", `getAllViewGeneralSystemSettings`);
    const { data: allusersedit, loading } = useFetch("", `getEditUser/${id}`);
    useEffect(() => {
      if (id === "1") {
        navigate(`/${config.ddemoss}`);
      }
  }, [allusersedit]);
    useEffect(() => {
      if (allusersedit) {
        let formdata = new FormData();
        formdata.append("signature", "userEdit")
        formdata.append("userSignId", id)
        formdata.append("sign_input_type", (allusersedit.signature))
        apiMethod("postTemplateSignature", formdata)
      }
    }, [allusersedit]);
    useEffect(() => {
      if (res.data) {
        setDatas2(res.data.signature)
      }
    }, [res.data]);
    if (loading || !datas2 || loading2 || !allusersedit2) return <Loader />;
    document.querySelector(`[rel=icon]`) && document.querySelector(`[rel=icon]`).setAttribute("href", `${config.baseurl2}${allusersedit2["system-favicon-image"]?.setting_value}`)
    document.querySelector(`[rel=apple-touch-icon]`) && document.querySelector(`[rel=apple-touch-icon]`).setAttribute("href", `${config.baseurl2}${allusersedit2["system-favicon-image"]?.setting_value}`)
   
    return (

        <>
         {/* <Helmet>
          <link rel="icon" href={`${config.baseurl2}${allusersedit2["system-favicon-image"]?.setting_value}`} />
          <link rel="apple-touch-icon" href={`${config.baseurl2}${allusersedit2["system-favicon-image"]?.setting_value}`} />
        </Helmet> */}
<div>
{StringConvert(datas2)}
</div>
        </>
    )


}


export { Signature };