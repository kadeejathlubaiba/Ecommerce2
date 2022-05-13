import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';
import Category from './Pages/category';
import Addcategory from './Pages/addCategory';
import Products from './Pages/products';
import Orders from './Pages/orders';
import Aboutus from './Pages/aboutUs';
import Adduser from './Pages/addUser';
import User from './Pages/user';
import Customer from './Pages/customer';
import Addcustomer from './Pages/addCustomer';
import { Provider } from 'react-redux';
import store from './store';
import Profile from './Pages/userProfile';
import UpdateProfile from './Pages/updateProfile';
import Protected from './Utils/protected';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Login />} />
     <Route path="/dashboard" element={<Home />} />
     <Route path="/category" element={<Protected><Category /></Protected>} />
     <Route path="/product" element={<Protected><Products /></Protected>} />
     <Route path="/order" element={<Protected><Orders /></Protected>} />
     <Route path="/aboutus" element={<Protected><Aboutus /></Protected>} />
     <Route path="/adduser" element={<Protected><Adduser /></Protected>} />
     <Route path="/user" element={<Protected><User /></Protected>} />
     <Route path="/customer" element={<Protected><Customer /></Protected>} />
     <Route path="/addcustomer" element={<Protected><Addcustomer /></Protected>} />
     <Route path="/addcategory" element={<Protected><Addcategory /></Protected>} />
     <Route path="/profile" element={<Protected><Profile /></Protected>} />
     <Route path="/updateprofile" element={<Protected><UpdateProfile /></Protected>} />
    </Routes>
 </BrowserRouter>
      </Provider>
</React.StrictMode>
);
reportWebVitals();