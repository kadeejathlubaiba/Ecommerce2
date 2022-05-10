import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/home';
import Login from './Components/Auth/login';
import Banner from './Pages/banner';
import Category from './Pages/category';
import Addcategory from './Components/Category/addCategory';
import Products from './Pages/products';
import Orders from './Pages/orders';
import Aboutus from './Pages/aboutUs';
import Adduser from './Components/User/addUser';
import User from './Pages/user';
import Customer from './Pages/customer';
import Addcustomer from './Components/Customer/addCustomer';
import { Provider } from 'react-redux';
import store from './store';
import Profile from './Components/UserProfile/profile';
import UpdateProfile from './Components/UserProfile/updateProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="banner" element={<Banner />} />
      <Route path="dashboard" element={<Home />} />
      <Route path="category" element={<Category />} />
      <Route path="product" element={<Products />} />
      <Route path="order" element={<Orders />} />
      <Route path="aboutus" element={<Aboutus />} />
      <Route path="adduser" element={<Adduser />} />
      <Route path="user" element={<User/>} />
      <Route path="customer" element={<Customer/>} />
      <Route path="addcustomer" element={<Addcustomer />} />
      <Route path="addcategory" element={<Addcategory />} />
      <Route path="profile" element={<Profile />} />
      <Route path="updateprofile" element={<UpdateProfile />} />
    </Routes>
  </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
reportWebVitals();