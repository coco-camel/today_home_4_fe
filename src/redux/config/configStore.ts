import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../modules/modal';

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
});
