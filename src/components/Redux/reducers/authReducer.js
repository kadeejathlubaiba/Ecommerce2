import { AUTH_SUCCESS,AUTH_FAILURE } from "../actions/type";

const initialState = {
    auth:[],
    status:'PLEASE LOGIN!'
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'AUTH_SUCCESS':
        return{ 
        ...state,
        auth:action.payload,
        status:AUTH_SUCCESS}
      case 'AUTH_FAILURE':
        return {
            ...state,
            auth:action.payload,
            status:AUTH_FAILURE}
      default:
        return state
    }
  }

 