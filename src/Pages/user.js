import React from 'react';
import Sidebar from "../Components/Layout/sidebar";
import Navbar from "../Components/Layout/navbar";
import { Button,} from "antd";
import { useNavigate } from "react-router-dom";
import UserTable from '../Components/User/userTable';

function Users() {
  let navigate=useNavigate();
return (
<div className="row">
<div className="col">
 <Sidebar/>
  <section class="home-section">
    <Navbar/>
    <div class="home-content">
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Users</div>
          <div class="sales-details">
          <Button type="primary" onClick={() => navigate("/adduser")}>Add Users </Button>
      <div>
        <UserTable />
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

export default Users;