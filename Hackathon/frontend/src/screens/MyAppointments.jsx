import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/appointments.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const slots = [
  { label: "10AM-12PM", value: "0" },
  { label: "3PM-6PM", value: "1" },
  { label: "9PM-11PM", value: "2" }
];
function MyAppointments() {
  const [data,setData]=useState(null)
  const [loading,setLoading]=useState(true)
const users=useSelector((state=>{return state.users}))

  const fetchData=async()=>{
      
  try{
   setLoading(true)
   const res=await axios.post('http://localhost:8000/api/appointments/getAppointmentsOfUser',{userId:users?.userdata?._id})
   if(res.data.success){
     setData(res.data.message)
     setLoading(false)
    }else{
      toast.error('something went wrong !')
      setLoading(false)
    }
  }catch(e){
    setLoading(false)
    toast.error('something went wrong !')

  }
  
  }
const navigate=useNavigate()
  useEffect(()=>{
fetchData()
  },[])

  return (
    <>
      <div className="appointments-container">
        <Navbar currentPage="my-appointments" />
      <div className='appointments-container-body'>

        <div className='appointments-container-heading'>
          <h2>My Appointments</h2>
        </div>

        <div className='appointments-container-body-doctors'>
          {!loading && data? data.length==0?<h3>No Appointments Found</h3>:data.map((elem,ind)=>{
              return (
                <div key={ind} className='appointments-container-body-doctors-item'>
            
                <div className='appointments-container-body-doctors-part-1'>
                <h3>{ users?.role=='doctor'?`${elem?.patientId?.name}`: `${elem?.doctorId?.name}`}</h3>
                <h3>{`Date : ${elem.date}`}</h3>
                <h3>{`Slot : ${slots[elem.slot].label}`}</h3>
                <button onClick={()=>{navigate(`/chat/${users?.role=='doctor'?`${elem?.patientId?._id}`: `${elem?.doctorId?._id}`}`)}}>Chat</button>
                </div>
              </div>
              )
            }):<h1>Loading...</h1>
          }
        </div>
        </div>
      </div>
    </>
  );
}

export default MyAppointments;
