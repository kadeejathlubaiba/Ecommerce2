import "../Components/Layout/style.css";
import React from "react";
import { Card } from "antd";
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import "../Components/User/users.css";
import AdduserForm from "../Components/User/addUserForm";

function Adduser() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Sidebar />
          <section class="home-section">
            <Navbar />
            <div class="home-content">
              <div class="sales-boxes">
                <div class="recent-sales box">
                  <div class="sales-details"></div>
                  <Card
                    title=" Add User"
                    style={{ width: "100%", margin: "auto", gap: 10 }}
                  >
                    <AdduserForm />
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Adduser;
