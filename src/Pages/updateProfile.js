import React from "react";
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import UpdateProfileForm from "../Components/UserProfile/updateProfileForm";

function UpdateProfile() {
  return (
    <div className="row">
      <div className="col">
        <Sidebar />
        <section class="home-section">
          <Navbar />
          <div class="home-content">
            <div class="sales-boxes">
              <div class="recent-sales box">
                <div class="sales-details">
                  <UpdateProfileForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UpdateProfile;
