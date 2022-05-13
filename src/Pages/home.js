import React, { useEffect } from "react";
import "../Components/Layout/style.css";
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import Subnavbar from "../Components/Layout/subNavbar";
import store from "../store";
import { GetAdminDetails } from "../Redux/Actions/authAction";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAdminDetails());
    console.log(store.getState());
  }, []);

  return (
    <div className="row">
      <div className="col">
        <Sidebar />
        <section class="home-section">
          <Navbar />

          <div class="home-content">
            <Subnavbar />
            <div class="sales-boxes">
              <div class="recent-sales box">
                <div class="title"></div>
                <div class="sales-details"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
