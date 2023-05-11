import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
// import signUpReducer from './signUpSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // newUser: signUpReducer,
  },
});

export default store;
