import { AUTH_SUCCESS, AUTH_FAILURE } from "./type";
import { useDispatch } from "react-redux";
import { PostWithAuthToken } from "../../config/api";

export const  GetAdminDetails = ()  => {
    const dispatch = useDispatch();
      
    PostWithAuthToken('/api/validate_token.php')
        .then((res)=>{
          dispatch( {
              type: AUTH_SUCCESS,
              payload: res.data
          })
        } )
        .catch((e)=>{
          dispatch( {
              type: AUTH_FAILURE,
              payload: console.log(e),
          })
  })
  
  }