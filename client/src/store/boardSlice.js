import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBoards = createAsyncThunk('boards/fetchBoards', () => {
  return axios
    .get('http://localhost:8080/boards')
    .then((response) => response.data);
});

export const deleteComment = createAsyncThunk(
  'boards/deleteComment',
  async ({ boardId, commentId }) => {
    try {
      await axios.delete(
        `http://localhost:8080/boards/${boardId}/comment/${commentId}`
      );
      return { boardId, commentId };
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      throw error;
    }
  }
);

export const updateComment = createAsyncThunk(
  'boards/updateComment',
  async ({ boardId, commentId, content }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/boards/${boardId}/comment/${commentId}`,
        { content }
      );
      return { boardId, commentId, updatedComment: response.data };
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      throw error;
    }
  }
);

const boardSlice = createSlice({
  name: 'board',
  initialState: { boards: [], searchTerm: '' },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const { boardId, commentId } = action.payload;
      const boardIndex = state.findIndex((board) => board.id === boardId);
      if (boardIndex !== -1) {
        const commentIndex = state[boardIndex].comment.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
          state[boardIndex].comment.splice(commentIndex, 1);
        }
      }
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const { boardId, commentId, updatedComment } = action.payload;
      const boardIndex = state.findIndex((board) => board.id === boardId);
      if (boardIndex !== -1) {
        const commentIndex = state[boardIndex].comment.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
          state[boardIndex].comment[commentIndex] = updatedComment;
        }
      }
    });
  },
});
export const { setSearchTerm } = boardSlice.actions;

// This selector will return the boards that match the search term.
export const selectFilteredBoards = createSelector(
  (state) => state.board.boards,
  (state) => state.board.searchTerm,
  (boards, searchTerm) =>
    boards.filter((board) =>
      board.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

export default boardSlice.reducer;
