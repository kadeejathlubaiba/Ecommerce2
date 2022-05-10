import React, {useEffect} from 'react'
import { Card} from 'antd';
import {  Link } from "react-router-dom";
import { GetAdminDetails } from "../../Redux/Actions/authAction";
import './profile.css'
import Sidebar from "../Layout/sidebar";
import Navbar from "../Layout/navbar";
import {FaPen} from 'react-icons/fa';
import ChangePassword from "./changePassword";
import {useDispatch , useSelector} from 'react-redux'

function Profile() {
  const adminData = useSelector((state) => state.auth&&state.auth.auth&&state.auth.auth.data)
  console.log(adminData)
  const dispatch =useDispatch();
    useEffect(() => {
      dispatch(GetAdminDetails());
      //   if (localStorage.getItem("token")) {
      //     dispatch(GetAdminDetails());
      //   }
      },[]);
    
  return (
    <div className="row">
    <div className="col">
     <Sidebar/>
      <section class="home-section">
        <Navbar/>
        <div class="home-content">
          <div class="sales-boxes">
            <div class="recent-sales box">
              <div class="sales-details"></div>
              <div id='profile'>  
           <Card title=' USER PROFILE' extra={<Link to="/updateProfile">EDIT PROFILE <FaPen /></Link>}>
      <div className="details">
        <span>
        <h2>User Name: {adminData&&adminData.userName}</h2>
        <h2>Email :{adminData&&adminData.email}</h2>
        <h2>Phone Number: {adminData&&adminData.phoneNumber}</h2>
        <h2>Gender: {adminData&&adminData.gender}</h2>
         </span>
          <div className='change'> < ChangePassword /></div>
          
      </div>
    </Card>
      </div></div></div></div></section></div></div> 
  )
}
export default Profile;