// import {
//   createSlice,
//   createAsyncThunk,
//   // createSelector,
// } from '@reduxjs/toolkit';
// // import axios from 'axios';
// import axiosInstance from '../axiosConfig';

// // 작성자 프로필 가져오기
// // export const fetchProfile = createAsyncThunk('board/profile', (boardId) => {
// //   axiosInstance.get(`/api/mypages/${boardId}/image`).then((res) => {
// //     return res.data;
// //   });
// // });

// export const fetchProfile = createAsyncThunk(
//   'boards/fetchProfile',
//   async (boardId) => {
//     const response = await axiosInstance.get(`/api/mypages/${boardId}/image`);
//     return response.data;
//   }
// );

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState: {
//     profile: [],
//   },

//   extraReducers: (builder) => {
//     builder.addCase(fetchProfile.fulfilled, (state, action) => {
//       state.profile = action.payload;
//     });
//   },
// });

// export default profileSlice.reducer;
