import React from "react";
import "../Components/UserProfile/profile.css";
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import UserProfileDetails from "../Components/UserProfile/userProfileDetails";

function UserProfile() {
  return (
    <div className="row">
      <div className="col">
        <Sidebar />
        <section class="home-section">
          <Navbar />
          <div class="home-content">
            <div class="sales-boxes">
              <div class="recent-sales box">
                <div class="sales-details"></div>
                <div id="profile">
                  <UserProfileDetails />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default UserProfile;
