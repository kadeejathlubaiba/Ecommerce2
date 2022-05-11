import React from 'react';
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import { Button,} from "antd";
import { useNavigate } from "react-router-dom";
import CustomerTable from '../Components/Customer/customerTable';

function Customers() {
  let navigate = useNavigate();
return (
<div className="row">
<div className="col">
 <Sidebar/>
  <section class="home-section">
    <Navbar/>
    <div class="home-content">
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Customers</div>
          <div class="sales-details">
          <Button type="primary" onClick={() => navigate("/addcustomer", {
                  state: { name: "Add Customer", customerId: "" },})}>Add Customers</Button>
          <div>
           <CustomerTable />
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

export default Customers;