// import "./Login.css";

// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import * as axios from 'axios';

// function Login() {
//   const navigate = useNavigate();
//   const Home = (event) => {
//     //Prevent page reload
//     event.preventDefault();

//     var { uname, pass } = document.forms[0];

//     if (uname.value && pass.value) {
//       const obj = {userName: uname.value, passwords: pass.value };
//       const authlogin = JSON.stringify(obj);
//       console.log(authlogin);
//       let config = {
//         method: 'post',
//         url: 'http://localhost/ecommerce-backend/api/login.php',
//         headers: { 'Content-Type': 'application/json' },
//         data: authlogin
//     };
//       axios(config)
//       .then((response) => {
        
//         console.log(response.data)
//         const id=response.data[0].userId;
//         const user=response.data[0].userName;
//         // UserProfile.setName(user);

//           // UserId.setId(id)

// navigate("/home");

//       })
//       .catch((error) => {
//         console.log(error); 
//         alert("Login Error");
//       });
//     } else {
//       alert("Please enter valid login credentials");
//     }
//   };

//   // JSX code for login form
//   const renderForm = (
//     <div className="form">
//       <form>
//         <div className="input-container">
//           <label>Username </label>
//           <input type="text" name="uname" required />
//         </div>
//         <div className="input-container">
//           <label>Password </label>
//           <input type="password" name="pass" required />
//         </div>
//         <div className="button-container">
//           <input type="submit" value="submit" onClick={Home} />
//         </div>
//       </form>
//     </div>
//   );

//   return (
//     <div className="app">
//       <br />
//       <div className="login-form">
//         <div className="title">Login</div>
//         {renderForm}
//       </div>
//     </div>
//   );
// }

// export default Login;


