import { useNavigate } from "react-router-dom";
import React from "react";
import "./style.css";
import { FaUserEdit } from "react-icons/fa";

function Navbarsub() {
  let navigate = useNavigate();
  const user = localStorage.getItem("userName");
  const USERPROFILE = (event) => {
    //Prevent page reload
    event.preventDefault();
    navigate("/profile");
  };

  return (
    <nav>
      <div class="sidebar-button">
        <i class="bx bx-menu sidebarBtn"></i>
        <span class="dashboard">Dashboard</span>
      </div>
      <div class="profile-details">
        <span className="admin_name">
          <a onClick={USERPROFILE} className="a">
            <h1 className="h1">
              <FaUserEdit /> {user}{" "}
            </h1>
          </a>
        </span>
      </div>
    </nav>
  );
}
export default Navbarsub;
