import React, { useState } from 'react';
import "../styles/navbar.css";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/icons/logo.png';

import { CiMedicalCase } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { BsChatLeftDots } from "react-icons/bs";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setdata, setisLoggedin } from '../../redux/reducers/userSlice';
function Navbar({ currentPage }) {
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()


  const logouthandler = async () => {
    try {
     const res=await axios.post('http://localhost:8000/api/users/logout')
     if(res.data.success){
      toast.success("Logout Successfully")
      dispatch(setisLoggedin(false))
      dispatch(setdata(null))

      navigate("/login");

    } else{
toast.error('something went wrong !')
    }}catch (e) {
      toast.error("Something went wrong");
    }
  };

  const hamburgerHandler = () => {
    setShowList(!showList);
  };

  return (
    <div style={showList ? { backgroundColor: "white" } : null} className="containerNavbar">
      <div className="heading">
        <img
          src="/icons/hanburger.png"
          width={30}
          height={30}
          onClick={hamburgerHandler}
          className="hamburger"
          alt="logo"
        />
        <img
          onClick={() => { navigate("/") }}
          src={logo}
          width={65}
          height={65}
          className="logo"
          alt="logo"
        />
        <h1 onClick={() => { navigate("/") }} className="name">MediConnect</h1>
      </div>
      <div
        style={showList ? { display: "flex" } : null}
        className="Side_bar_items"
      >
        <p className="menu">Main Menu</p>
        <div className="item">
          <CiMedicalCase className="logo_item" />
          <a
            href="/"
            style={currentPage === "home" ? { color: "#240f6a" } : { color: "#8c6df7" }}
              className='item_name'
          >
            Home
          </a>
        </div>
        <div className="item">
          <SlCalender className="logo_item" />
          <a
            href="/my-appointments"
            style={currentPage === "my-appointments" ? { color: "#240f6a" } : { color: "#8c6df7" }}
            className='item_name'
          >
            My Appointments
          </a>
        </div>
        <div className="item">
          <BsChatLeftDots className="logo_item" />
          <a
            href="/chats"
            style={currentPage === "chats" ? { color: "#240f6a" } : { color: "#8c6df7" }}
            className='item_name'
          >
            My Chats
          </a>
        </div>
        <div className="item">
          <CiUser  className="logo_item" />
          <a
            href="/profile"
            style={currentPage === "profile" ? { color: "#240f6a" } : { color: "#8c6df7" }}
              className='item_name'
          >
            My Profile
          </a>
        </div>
        <div className="item">
        <CiLogout className="logo_item" />
          <h3 style={{color:"#8c6df7"}} onClick={logouthandler} className="item_name">Logout</h3>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Navbar;
