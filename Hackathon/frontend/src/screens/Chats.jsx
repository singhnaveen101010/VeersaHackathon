import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Navbar from '../components/Navbar';
import '../styles/chats.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';

const slots = [
  { label: "10AM-12PM", value: "0" },
  { label: "3PM-6PM", value: "1" },
  { label: "9PM-11PM", value: "2" }
];
const doctors=[
  {
    name:"Dr. John Doe",
    specialization:"Cardiology"
  },
  {
    name:"Dr. John Doe",
    specialization:"Cardiology"
  },
  {
    name:"Dr. John Doe",
    specialization:"Cardiology"
  },
  {
    name:"Dr. John Doe",
    specialization:"Cardiology"
  },
  {
    name:"Dr. John Doe",
    specialization:"Cardiology"
  },

]
function Chats() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const users = useSelector(state => state.users);
  const navigate = useNavigate();
  
  const fetchData = async () => {
    try {
      let url;
      if (users?.userdata?.role === "doctor") {
        url = 'http://localhost:8000/api/users/getAllPatients';
      } else {
        url = 'http://localhost:8000/api/users/getAllDoctors';
      }
      const res = await axios.get(url);
      setData(res.data.message);
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const chatHandler=async(e)=>{
    e.preventDefault();
    console.log("Appointment Booked");
  }
  return (
    <>
      <div className="chats-container">
        <Navbar currentPage="chats" />
      <div className='chats-container-body'>

        <div className='chats-container-heading'>
          <h2>Chat With Our Doctors</h2>
          <h3>( You can only chat to a doctor if you already have an appointment )</h3>
        </div>

        <div className='chats-container-body-doctors'>
        {loading ? (
              <h1>Loading...</h1>
            ) : data.length === 0 ? (
              <h3>{`No ${users?.userdata?.role=='doctor' ? 'Patients' :'Doctors'} Available`}</h3>
            ) : 
            data.map((elem,ind)=>{
              return (
                <div key={ind} className='chats-container-body-doctors-item'>
            
                <div className='chats-container-body-doctors-part-1'>
                <h3>{`${elem.name}`}</h3>
                {elem.role=='doctor'?<h3>{`Specialized in: ${elem.specialisation}`}</h3>:null}
                </div>
                <div className='chats-container-body-doctors-part-2'>
                <button onClick={()=>{navigate(`/chat/${elem._id}`)}}>Chat Now</button>
                </div>
              </div>
              )
            })
          }
        
        </div>
        </div>

      </div>
    </>
  );
}

export default Chats;
