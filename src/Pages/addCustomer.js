import "../Components/Layout/style.css";
import { useLocation } from "react-router-dom";
import React from "react";
import { Card } from "antd";
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import AddCustomerForm from "../Components/Customer/addCustomerForm";

function Addcustomer() {
  const location = useLocation();
  return (
    <div className="row">
      <div className="col">
        <Sidebar />
        <section class="home-section">
          <Navbar />
          <div class="home-content">
            <div class="sales-boxes">
              <div class="recent-sales box">
                <div class="title"></div>
                <div class="sales-details">
                  <Card title={location.state.name}>
                    <AddCustomerForm />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Addcustomer;
