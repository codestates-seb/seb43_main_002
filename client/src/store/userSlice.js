import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAthenticated: false,
    userInfo: null,
  },

  reducers: {
    login: (state, action) => {
      state.isAthenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isAthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
