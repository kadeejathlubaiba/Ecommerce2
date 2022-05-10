import React from 'react';
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import OrderTable from '../Components/Order/orderTable';

function Orders() {
return (
<div className="row">
<div className="col">
 <Sidebar/>
  <section class="home-section">
    <Navbar/>
    <div class="home-content">
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Orders</div>
          <div class="sales-details">
          <div>
           <OrderTable />
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</div>
);
};

export default Orders;