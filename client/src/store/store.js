import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import boardReducer from './boardSlice';
import commentReducer from './commentSlice';

// import signUpReducer from './signUpSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    comment: commentReducer,
    // newUser: signUpReducer,
  },
});

export default store;
