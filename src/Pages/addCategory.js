import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import "../Components/Layout/style.css";
import React from "react";
import { Card } from "antd";
import AddCategoryForm from "../Components/Category/addCategoryForm";

function AddCategory() {
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
                  <Card title=" Add Category">
                    <AddCategoryForm />
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

export default AddCategory;
