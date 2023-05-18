import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import boardReducer from './boardSlice';
// import signUpReducer from './signUpSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
});

export default store;
