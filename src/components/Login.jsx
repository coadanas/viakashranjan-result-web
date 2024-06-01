import React, { useState } from 'react';
import "../assets/css/Result.css";
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../store/localStorage.jsx"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const Navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [userData, setUserData]=useState("")

  const allData = (e) => {
    const nameValue = e.target.name;
    const inputValue = e.target.value;
    const updatedFormData = { ...formData, [nameValue]: inputValue };
    setFormData(updatedFormData);
  };

  const handleSubmit = async(e) => {
  try{
      e.preventDefault();
    const response = await Axios.post("https://result-backend-v1ry.onrender.com/login", formData)
    if(!response.data){
    toast.error("Internal error")
      setUserData("")
    }else{
      setUserData(response.data)
      const auth_token = await response.data;
      console.log("auth token", auth_token)
      if(!response.ok){
        toast.error("invalid user")
      }
         Navigate("/")
  storeTokenInLS(auth_token.token);
    }
    console.log(response.data)
    console.log(response.data.user)
  }catch(err){
    toast.error("Internal error")
    console.log("unique name & roll no.")
  }
  };

  return (
    <>
      <ToastContainer />
      <form className="resultForm w-[80%] m-auto py-6" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use your name and roll no.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={allData}
                    autoComplete="given-email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="roll" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="password"
                    id="psssword"
                    value={formData.password}
                    onChange={allData}
                    autoComplete="family-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;