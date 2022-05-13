import React from "react";
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import CategoryTable from "../Components/Category/categoryTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Categories() {
  let navigate = useNavigate();
  return (
    <div className="row">
      <div className="col">
        <Sidebar />
        <section class="home-section">
          <Navbar />
          <div class="home-content">
            <div class="sales-boxes">
              <div class="recent-sales box">
                <div class="title">Categories</div>
                <div class="sales-details">
                  <Button
                    type="primary"
                    onClick={() => navigate("/addcategory")}
                  >
                    Add Category
                  </Button>
                </div>
                <CategoryTable />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Categories;
