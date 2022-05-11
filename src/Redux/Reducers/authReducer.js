import { AUTH_SUCCESS,AUTH_FAILURE } from "../Actions/type";

const initialState = {
    auth:[],
    error:'',
    status:'PLEASE LOGIN!'
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case AUTH_SUCCESS:
        return{ 
        ...state,
        auth:action.payload.data,
        status:"success"}
      case AUTH_FAILURE:
        return {
            ...state,
            error:action.error,
            status:"failed"}
      default:
        return state
    }
  }

 