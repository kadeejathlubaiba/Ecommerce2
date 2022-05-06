import { configureStore } from '@reduxjs/toolkit';
import reducer from './components/Redux/reducers'

const initialState = {};
const store = configureStore({reducer:reducer},initialState);

console.log(store.getState());
export default store;