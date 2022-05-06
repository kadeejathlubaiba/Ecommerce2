import { useNavigate } from "react-router-dom";
import React from 'react';
import './style.css';

function Navbarsub(){
    let navigate = useNavigate();
    const user = localStorage.getItem('userName');

    const USERPROFILE = (event) => {
      //Prevent page reload
      event.preventDefault();
          navigate('/profile');
     
}
    
return(
    <nav>
      <div class="sidebar-button">
        <i class='bx bx-menu sidebarBtn'></i>
        <span class="dashboard">Dashboard</span>
      </div>
    
      <div class="profile-details">
        
        <span class="admin_name">
        {/* {localStorage.getItem('userName')} */} 
           <a onClick={USERPROFILE}>Hello {user} !!</a>
        </span>
      </div>
    </nav>
);
}
export default Navbarsub;