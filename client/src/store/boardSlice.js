import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBoards = createAsyncThunk('boards/fetchBoards', () => {
  return axios
    .get('http://localhost:8080/boards')
    .then((response) => response.data);
});

const boardSlice = createSlice({
  name: 'board',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default boardSlice.reducer;
