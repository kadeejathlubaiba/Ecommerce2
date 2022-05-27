import { AUTH_SUCCESS, AUTH_FAILURE } from "./type";
import setAuthToken from "../../Utils/Config/config";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import serverData from "../../Utils/Config/constant";

const baseUrl = serverData.BASEURL;

export const GetAdminDetails = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  try {
    const res = await trackPromise(axios.post(baseUrl + "validate_token.php"));
    //console.log(res);
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
    return res;
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_FAILURE,
      error: error,
    });
  }
};
