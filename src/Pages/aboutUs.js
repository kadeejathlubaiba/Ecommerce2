import React from 'react';
import '../Components/Layout/style.css';
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import Subnavbar from "../Components/Layout/subNavbar";

const Aboutus = () => {


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
          <div class="title">Manage Aboutus</div>
          <div class="sales-details">
            <ul class="details">
              {/* <li class="topic">Date</li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li>
              <li><a href="#">02 Jan 2021</a></li> */}
            </ul>
            <ul class="details">
            {/* <li class="topic">Customer</li>
            <li><a href="#">Alex Doe</a></li>
            <li><a href="#">David Mart</a></li>
            <li><a href="#">Roe Parter</a></li>
            <li><a href="#">Diana Penty</a></li>
            <li><a href="#">Martin Paw</a></li>
            <li><a href="#">Doe Alex</a></li>
            <li><a href="#">Aiana Lexa</a></li>
            <li><a href="#">Rexel Mags</a></li>
             <li><a href="#">Tiana Loths</a></li> */}
          </ul>
          
          </div>
          
        </div>
      </div>
    </div>
  </section>

</div>
</div>

);

};

export default Aboutus;