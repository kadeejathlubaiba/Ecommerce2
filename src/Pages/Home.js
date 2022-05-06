//import { useNavigate } from "react-router-dom";
import React, {useEffect } from 'react';
import '../components/style.css';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Subnavbar from "../components/Subnavbar";
import '../components/config/config'
import {PostWithAuthToken} from '../components/config/api';
import axios from 'axios';
import store from '../srore'

const Home = () => {
//let navigate = useNavigate();

useEffect(() => {
  console.log(store.getState());
//   if(localStorage.getItem('token')){
    
//     // PostWithAuthToken('validate_token.php',data)
//     axios.post('http://localhost/ecommerce-backend/api/validate_token.php',{
//       headers:{'Authorization': 'Bearer ' + localStorage.getItem('token')
//       }
//     })
//     .then((res)=>{
//       console.log(res);
//     } );
//   }
 }, []);

return (
<div className="row">
<div className="col">
 <Sidebar/>
  <section class="home-section">
    <Navbar/>

    <div class="home-content">
      <Subnavbar/>
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title"></div>
          <div class="sales-details">
           
          
          </div>
          
        </div>
      </div>
    </div>
  </section>

</div>
</div>

);

};

export default Home;