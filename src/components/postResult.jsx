import React, { useState } from 'react';
import "../assets/css/Result.css";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const PostResult = () => {
  const [cancel, setCancel] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    subject: "",
    marks: ""
  });
    const [userData, setUserData]=useState("")

  const allData = (e) => {
    const nameValue = e.target.name;
    const inputValue = e.target.value;
    const updatedFormData = { ...formData, [nameValue]: inputValue };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
  try{
      e.preventDefault();
    
     setCancel(!cancel)
    
    const response = await Axios.post("https://result-backend-v1ry.onrender.com/add/result", formData)
     if(!response.data.data){
    toast.error("Internal error")
      setUserData("")
    }else{
      setUserData(response.data.data)
     toast.success('Result upload successfuly!');
    }
    console.log(userData)
  }catch(err){
    setUserData("")
     toast.error("Internal error ! use unique name & roll no.")
  console.log("use unique name & roll no.")
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
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={allData}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="roll" className="block text-sm font-medium leading-6 text-gray-900">
                  Roll no.
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="roll"
                    id="roll"
                    value={formData.roll}
                    onChange={allData}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="roll" className="block text-sm font-medium leading-6 text-gray-900">
                  Subject
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={allData}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="roll" className="block text-sm font-medium leading-6 text-gray-900">
                  Marks
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="marks"
                    id="marks"
                    value={formData.marks}
                    onChange={allData}
                    autoComplete="family-name"
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

{userData &&
<div className={`${cancel?"block" : "hidden"}`}>
         <div className="resultCard w-full border bg-slate-100">
            <button className="reCancelBtn rounded-lg border border-slate-900" onClick={() => setCancel(false)}>X</button>
            <div className="cardRe max-w-sm rounded overflow-hidden  w-[75%] m-auto bg-white">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Your Result</div>
                <div className="mb-2 shadow-md">
                <p className="text-slate-700 text-base  p-2 bg-green-300">
                  <strong>Name </strong>
                </p>
                <p className="text-slate-700 text-base  p-2 bg-gray-100 capitalize">
                 {userData.name}
                </p>
                </div>
                
                <div className="mb-2">
                <p className="text-slate-700 text-base  p-2 bg-green-300">
                  <strong>Roll No. </strong>
                </p>
                <p className="text-slate-700 text-base  p-2 bg-gray-100 capitalize">
                 {userData.roll}
                </p>
                </div>
                <div className="mb-2">
                <p className="text-slate-700 text-base  p-2 bg-green-300">
                  <strong>Subject</strong>
                </p>
                <p className="text-slate-700 text-base  p-2 bg-gray-100 capitalize">
                 {userData.subject}
                </p>
                </div>
                <div className="mb-2">
                <p className="text-slate-700 text-base  p-2 bg-green-300">
                  <strong>Marks</strong>
                </p>
                <p className="text-slate-700 text-base  p-2 bg-gray-100 capitalize">
                 {userData.marks}
                </p>
                </div>
   
   
              </div>
            </div>
          </div>
          </div>
}

    </>
  );
};

export default PostResult;
