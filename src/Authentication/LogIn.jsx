import React, { useEffect, useState } from 'react';
import axios from "axios";
import config from "../services/config.json";
import { toast } from "react-toastify";
import { Form, Formik,ErrorMessage } from "formik";
import { FaBasketballBall } from 'react-icons/fa';
import FormControl from '../components/form/FormControl';
import * as yup from "yup";
import slider1 from '../dist/webImages/slider1.svg'
import slider2 from '../dist/webImages/slider2.svg'
import slider3 from '../dist/webImages/slider3.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { getTokenSession, removeTokenSession, setTokenSession } from '../utils/common';
import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';

function LogIn() {
  const [loading, setloading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    getTokenSession() && navigate(`/${config.ddemoss}`);
  }, []);
    const initialValues = {
        email: "",
        password: "",
      };
      const validationSchema = yup.object({
        email: yup.string().email("Invaild Email").required("Must Required"),
        password: yup
          .string()
          .min(8, "Mininum 8 length")
          .max(20, "Maximum 20 length")
          .required("Must Required")
      });
      const handleSubmit = async (values) => {
        setloading(true)
        axios.defaults.headers = {
          "Content-Type": "multipart/form-data",
        };
        axios.post(`${config.apiEndPoint}login`, values)
          .then((response) => {
            if (!response.data.token) {
              removeTokenSession(response.data.token);
              toast.error(response.data.message);
              setloading(false)
            } else {
              setTokenSession(response.data.token);
              toast.success(response.data.message);
              navigate(`/${config.ddemoss}`);
            }
          })
          .catch((error) => {
            if (error.response.status === 401)
              toast.error(error.response.data.message);
            else toast.error(error.response.data.errorMessage);
          });
      };
      const submitbutton = {
        "class":"w-100 btn btn-primary",
        "text":"Sign In"
      }
  return (
<div className="auth">
    <div className="auth_left">
      <div className="card">
      <Formik initialValues={initialValues}  
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange>
       
      <Form name="myForm">
          <div className="text-center mb-2">
            <a className="header-brand" href="#"
              ><FaBasketballBall /></a>
          </div>
          <div className="card-body">
            <div className="card-title">Login to your account</div>
            <FormControl className="form-control my-1" label={"Email"} name="email" control="input" placeholder=" Email"  />
            <div className='my-1'>
            <ErrorMessage name="email">
                        {(msg) => (
                          <div style={{ color: "red", whiteSpace: "nowrap" }}>
                            {msg}
                          </div>
                        )}
              </ErrorMessage>
            </div>
            <FormControl className="form-control my-1" label={"Password"} name="password" control="password" placeholder=" Password"  />
            <div className='my-1'>
            <ErrorMessage name="password">
                        {(msg) => (
                          <div style={{ color: "red", whiteSpace: "nowrap" }}>
                            {msg}
                          </div>
                        )}
              </ErrorMessage>
            </div>
            <div className="form-footer">
             <SubmitButton props={submitbutton} buttonLoading={loading} />
            </div>
          </div>
          </Form>
      </Formik>
      {/* <div className='overflow-hidden mt-3'>
      <h4>Test Credentials</h4>
      <table className='table p-2'>
        <thead><tr><th>Role</th>
        <th>Email</th>
        <th>Password</th></tr></thead>
        <tbody>
          <tr>
            <td>Admin</td>
          <td>super_admin@mail.com</td>
          <td>Saad1230@</td>
          </tr>
          <tr>
            <td>User</td>
          <td>simone@email.com</td>
          <td>12345678</td>
          </tr>
        
         
        </tbody>
      </table>
      </div> */}
      </div>
    </div>
    <div className="auth_right">
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>  
        <img src={slider1}  className="img-fluid" alt="login page" />
            <div className="px-4 mt-4">
              <h4>Fully Responsive</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
      </SwiperSlide>
      <SwiperSlide>  
        <img src={slider2}  className="img-fluid" alt="login page" />
        <div className="px-4 mt-4">
              <h4>Quality Code and Easy Customizability</h4>
              <p>
                There are many variations of passages of Lorem Ipsum
                available.
              </p>
            </div>
      </SwiperSlide>
      <SwiperSlide>  
        <img src={slider3}  className="img-fluid" alt="login page" />
        <div className="px-4 mt-4">
              <h4>Cross Browser Compatibility</h4>
              <p>
                Overview We're a group of women who want to learn JavaScript.
              </p>
            </div>
      </SwiperSlide>
    </Swiper>

    <ul className='list loginterm'>
      <li>
        <Link to={`/${config.ddemoss}privacy`}>Privacy Policy</Link>
      </li>
      |
      <li>
        <Link to={`/${config.ddemoss}terms`}>Terms and Conditions</Link>
      </li>
    </ul>
    </div>
  </div>
  )
}

export default LogIn