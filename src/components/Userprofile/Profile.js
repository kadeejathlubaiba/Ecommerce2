import React, { useState } from 'react';
import '../../components/style.css';
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";


function Profile(){
  
 
  
    return(
        <div className="row">
        <div className="col">
         <Sidebar/>
          <section class="home-section">
            <Navbar/>
        
            <div class="home-content">
              
              <div class="sales-boxes">
                <div class="recent-sales box">
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

 export default Profile;