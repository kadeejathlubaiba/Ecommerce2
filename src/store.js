import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Redux/Reducers";

const initialState = {};
const store = configureStore({ reducer: reducer }, initialState);

store.subscribe(() => console.log(store.getState()));
export default store;
