import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../axiosConfig';

// const decoded = jwt_decode(token);
const BASE_URL = 'http://14.72.7.98:8080';

// 게시물 목록
export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axiosInstance.get(`boards`);
  return response.data;
});

// 게시물 추가
export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (postBoard) => {
    const response = await axiosInstance.post(`/boards`, postBoard);
    return response.data;
  }
);

// 게시물 수정
export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, board }) => {
    const response = await axios.patch(`${BASE_URL}/boards/${boardId}`, board);
    return response.data;
  }
);

// 게시물 삭제
export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId) => {
    await axios.delete(`${BASE_URL}/boards/${boardId}`);
    return boardId;
  }
);

// 댓글 추가
export const addComment = createAsyncThunk(
  'boards/addComment',
  async ({ boardId, comment }) => {
    const response = await axios.post(
      `${BASE_URL}/${boardId}/comment`,
      comment
    );
    return response.data;
  }
);
// 댓글 수정
export const updateComment = createAsyncThunk(
  'boards/updateComment',
  async ({ boardId, commentId, content }) => {
    const response = await axios.put(
      `${BASE_URL}/${boardId}/comment/${commentId}`,
      { content }
    );
    return response.data;
  }
);

// 댓글 삭제
export const deleteComment = createAsyncThunk(
  'boards/deleteComment',
  async ({ boardId, commentId }) => {
    await axios.delete(`${BASE_URL}/${boardId}/comment/${commentId}`);
    return { boardId, commentId };
  }
);

const boardSlice = createSlice({
  name: 'board',

  initialState: { boards: [], loading: false, error: null, initialized: false },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.boards = action.payload;
      state.initialized = true; // 초기화 완료로 표시
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const { boardId, comment } = action.meta.arg;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        board.comment.push(comment);
      }
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteBoard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;

      const boardId = action.payload;
      state.boards = state.boards.filter((board) => board.id !== boardId);
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;

      builder.addCase(updateBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(updateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const updatedBoard = action.payload;
        state.boards = state.boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        );
      });
      builder.addCase(updateBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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

export const { actions, reducer } = boardSlice;
export default reducer;
