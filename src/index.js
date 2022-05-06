import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './components/auth/Login';
import Banner from './Pages/Banner';
import Category from './Pages/Categories/Category';
import Addcategory from './Pages/Categories/Addcategory';
import Products from './Pages/Products';
import Orders from './Pages/orders/Orders';
import Aboutus from './Pages/Aboutus';
import Adduser from './Pages/user/Adduser';
import User from './Pages/user/User';
import Customer from './Pages/customer/Customer';
import Addcustomer from './Pages/customer/Addcustomer';
import { Provider } from 'react-redux';
import store from './srore';
import Profile from './components/Userprofile/Profile'

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
    </Routes>
  </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
reportWebVitals();