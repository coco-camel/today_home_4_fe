import {configureStore} from "@reduxjs/toolkit";
import  modalReducer from '../modules/modal';


const store = configureStore({
  reducer: {
    modal:modalReducer,
  }
})

export default store;