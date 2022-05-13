import { useNavigate } from "react-router-dom";
import React from 'react';
import './style.css';

function Sidebar(){
const handleClick = (e) => {
  localStorage.clear();
    navigate("/");
}
const navigate = useNavigate();
const DASHBOARD = (event) => {
            //Prevent page reload
            event.preventDefault();
                navigate('/home');
 }
 const ORDERS = (event) => {
    //Prevent page reload
    event.preventDefault();
        navigate('/order');
}
const CUSTOMERS = (event) => {
    //Prevent page reload
    event.preventDefault();
        navigate('/customer');
}
const USER = (event) => {
    //Prevent page reload
    event.preventDefault();
        navigate('/user');
}
const CATEGORIES = (event) => {
    //Prevent page reload
    event.preventDefault();
        navigate('/category');
}
const PRODUCTS = (event) => {
    //Prevent page reload
    event.preventDefault();
        navigate('/product');
}
// const ABOUTUS = (event) => {
//     //Prevent page reload
//     event.preventDefault();
//         navigate('/aboutus');
   
// }
return (
  <div class="sidebar">
    <div class="logo-details">
      <span class="logo_name">Ecommerce</span>
    </div>
      <ul class="nav-links">
        <li>
          <a onClick={DASHBOARD} class="active">
            <span class="links_name">DASHBOARD</span>
          </a>
        </li>
        <li>
          <a onClick={CUSTOMERS} class="active">
            <span class="links_name">MANAGE CUSTOMERS</span>
          </a>
        </li>
        <li>
        <a onClick={USER} class="active">
            {/* <i class='bx bx-list-ul' ></i> */}
            <span class="links_name">MANAGE USER</span>
          </a>
        </li>
        <li>
        <a onClick={ORDERS} class="active">
            {/* <i class='bx bx-pie-chart-alt-2' ></i> */}
            <span class="links_name">ORDERS</span>
          </a>
        </li>
        <li>
        <a onClick={CATEGORIES} class="active">
            {/* <i class='bx bx-coin-stack' ></i> */}
            <span class="links_name">CATEGORIES</span>
          </a>
        </li>
        <li>
        <a onClick={PRODUCTS} class="active">
            {/* <i class='bx bx-book-alt' ></i> */}
            <span class="links_name">PRODUCTS</span>
          </a>
        </li>
       
        {/* <li>
        <a onClick={BANNERS} class="active">
            
            <span class="links_name">BANNERS</span>
        </a>
        </li>
        <li>
        <a  class="active">
           
            <span class="links_name">REVIEWS</span>
          </a>
        </li>
        <li>
        <a  class="active">
           
            <span class="links_name">ENQUERIES</span>
          </a>
        </li> */}
       <li>
       <a onClick={handleClick} class="active">
            {/* <i class='bx bx-log-out'></i> */}
            <span class="links_name">LOGOUT</span>
          </a>
       </li>
      </ul>
  </div>


);

}

export default Sidebar;