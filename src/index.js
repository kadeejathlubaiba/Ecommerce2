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
import ProtectedRoute from './Route/protected';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute />}>
      <Route exact path="/home" element={<Home />} />
      </Route>
      <Route path="/banner" element={<ProtectedRoute />}>
      <Route exact path="/banner" element={<Banner />} />
      </Route>
      <Route path="/dashboard" element={<ProtectedRoute />}>
      <Route exact path="/dashboard" element={<Home />} />
      </Route>
      <Route path="/category" element={<ProtectedRoute />}>
      <Route exact path="/category" element={<Category />} />
      </Route>
      <Route path="/product" element={<ProtectedRoute />}>
      <Route exact path="/product" element={<Products />} />
      </Route>
      <Route path="/order" element={<ProtectedRoute />}>
      <Route exact path="/order" element={<Orders />} />
      </Route>
      <Route path="/aboutus" element={<ProtectedRoute />}>
      <Route exact path="/aboutus" element={<Aboutus />} />
      </Route>
      <Route path="/adduser" element={<ProtectedRoute />}>
      <Route exact path="/adduser" element={<Adduser />} />
      </Route>
      <Route path="/user" element={<ProtectedRoute />}>
      <Route exact path="/user" element={<User />} />
      </Route>
      <Route path="/customer" element={<ProtectedRoute />}>
      <Route exact path="/customer" element={<Customer />} />
      </Route>
      <Route path="/addcustomer" element={<ProtectedRoute />}>
      <Route exact path="/addcustomer" element={<Addcustomer />} />
      </Route>
      <Route path="/addcategory" element={<ProtectedRoute />}>
      <Route exact path="/addcategory" element={<Addcategory />} />
      </Route>
      <Route path="/profile" element={<ProtectedRoute />}>
      <Route exact path="/profile" element={<Profile />} />
      </Route>
      {/* <Route path="profile" element={<Profile />} /> */}
      <Route path="/updateprofile" element={<ProtectedRoute />}>
      <Route exact path="/updateprofile" element={<UpdateProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
reportWebVitals();