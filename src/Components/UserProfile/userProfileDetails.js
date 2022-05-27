import React, { useEffect } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { GetAdminDetails } from "../../Redux/Actions/authAction";
import "./profile.css";
import { FaPen } from "react-icons/fa";
import ChangePassword from "./changePassword";
import { useDispatch, useSelector } from "react-redux";

function UserProfileDetails() {
  //useSelector Hook takes a selector function as an argument. The selector function will receive the state of your store as an argument that you will use to return the field you want
  const adminData = useSelector((state) => state.auth && state.auth.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAdminDetails());
    //   if (localStorage.getItem("token")) {
    //     dispatch(GetAdminDetails());
    //   }
  });

  return (
    <Card
      title=" USER PROFILE"
      extra={
        <Link to="/updateProfile">
          {" "}
          EDIT PROFILE <FaPen />
        </Link>
      }
    >
      <div className="details">
        <span>
          <img
            width={110}
            alt={adminData.profilePicture}
            src={`../../Assets/Images/${adminData.profilePicture}`}
          />
          <h2>User Name: {adminData && adminData.userName}</h2>
          <h2>Email :{adminData && adminData.email}</h2>
          <h2>Phone Number: {adminData && adminData.phoneNumber}</h2>
          <h2>Gender: {adminData && adminData.gender}</h2>
        </span>
        <div className="change">
          <ChangePassword />
        </div>
      </div>
    </Card>
  );
}
export default UserProfileDetails;
