import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import boardReducer from './boardSlice';
import commentReducer from './commentSlice';
// import profileReducer from './profileSlice';
// import signUpReducer from './signUpSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    comment: commentReducer,
    // profile: profileReducer,
    // newUser: signUpReducer,
  },
});

export default store;
