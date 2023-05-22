import {
  createSlice,
  createAsyncThunk,
  // createSelector,
} from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosInstance from '../axiosConfig';

// 댓글 목록 가져오기
// export const fetchComments = createAsyncThunk(
//   'boards/fetchComments',
//   async (boardId) => {
//     const response = await axiosInstance.get(`/api/boards/${boardId}/comments`);
//     return response.data;
//   }
// );
export const fetchComments = createAsyncThunk(
  'boards/fetchComments',
  (boardId) => {
    return axiosInstance
      .get(`/api/comments/${boardId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error('데이터 가져오기 실패');
      });
  }
);

// 댓글 추가
export const addComment = createAsyncThunk(
  'boards/addComment',
  async ({ boardId, comment }) => {
    const response = await axiosInstance.post(
      `/api/boards/${boardId}/comments`,
      comment
    );
    return { boardId, comment: response.data };
  }
);

// 댓글 수정
export const updateComment = createAsyncThunk(
  'boards/updateComment',
  async ({ commentId, content }) => {
    const response = await axiosInstance.patch(
      `/api/boards/comments/${commentId}`,
      { body: content }
    );
    return response.data;
  }
);

// 댓글 삭제
export const deleteComment = createAsyncThunk(
  'boards/deleteComment',
  async ({ commentId }) => {
    await axiosInstance.delete(`/api/boards/comments/${commentId}`);
    return { commentId };
  }
);

// 슬라이스 정의
const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
