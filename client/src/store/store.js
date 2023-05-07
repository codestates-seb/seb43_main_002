import { configureStore } from '@reduxjs/toolkit';
import userRducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userRducer,
  },
});

export default store;
