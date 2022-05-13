import { Navigate } from "react-router-dom";
import { GetAdminDetails } from '../Redux/Actions/authAction'
import store from "../store";


const Protected = ({ children }) => {
GetAdminDetails();
console.log(store.getState().auth.isLoggedIn);
let loginStatus = store.getState().auth.isLoggedIn;
 if (!loginStatus) {
 return <Navigate to="/" replace />;
 }
 return children;
};
export default Protected;