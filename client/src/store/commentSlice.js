import {
  createSlice,
  createAsyncThunk,
  // createSelector,
} from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosInstance from '../axiosConfig';

// 댓글 목록 가져오기
export const fetchComments = createAsyncThunk(
  'boards/fetchComments',
  async (boardId) => {
    const response = await axiosInstance.get(`/api/boards/${boardId}/comments`);
    return response.data;
  }
);
// export const fetchComments = createAsyncThunk(
//   'boards/fetchComments',
//   (boardId) => {
//     return axiosInstance
//       .get(`/api/comments/${boardId}`)
//       .then((response) => response.data)
//       .catch((error) => {
//         throw new Error('데이터 가져오기 실패');
//       });
//   }
// );

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
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      const { boardId, comment } = action.payload;
      const boardIndex = state.comments.findIndex(
        (board) => board.id === boardId
      );
      if (boardIndex !== -1) {
        state.comments[boardIndex].comments.push(comment);
      }
    },
    updateComment: (state, action) => {
      const updatedComment = action.payload;
      const { commentId, boardId } = updatedComment;
      const boardIndex = state.comments.findIndex(
        (board) => board.id === boardId
      );
      if (boardIndex !== -1) {
        const commentIndex = state.comments[boardIndex].comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
          state.comments[boardIndex].comments[commentIndex] = updatedComment;
        }
      }
    },
    deleteComment: (state, action) => {
      const { commentId } = action.payload;
      state.comments = state.comments.map((board) => ({
        ...board,
        comments: board.comments.filter((comment) => comment.id !== commentId),
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
