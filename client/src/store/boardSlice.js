import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

// 게시물 목록 가져오기
export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axios.get('http://localhost:8080/boards');
  return response.data;
});

// 게시물 수정
export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, board }) => {
    const response = await axios.patch(
      `http://localhost:8080/boards/${boardId}`,
      board
    );
    return response.data;
  }
);

// 게시물 삭제
export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId) => {
    await axios.delete(`http://localhost:8080/boards/${boardId}`);
    return boardId;
  }
);

// 댓글 추가
export const addComment = createAsyncThunk(
  'boards/addComment',
  async ({ boardId, comment }) => {
    const response = await axios.post(
      `http://localhost:8080/boards/${boardId}/comment`,
      comment
    );
    return { boardId, comment: response.data };
  }
);

// 댓글 수정
export const updateComment = createAsyncThunk(
  'boards/updateComment',
  async ({ boardId, commentId, content }) => {
    const response = await axios.put(
      `http://localhost:8080/boards/${boardId}/comment/${commentId}`,
      { content }
    );
    return response.data;
  }
);

// 댓글 삭제
export const deleteComment = createAsyncThunk(
  'boards/deleteComment',
  async ({ boardId, commentId }) => {
    await axios.delete(
      `http://localhost:8080/boards/${boardId}/comment/${commentId}`
    );
    return { boardId, commentId };
  }
);

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: [],
    searchTerm: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { boardId, comment } = action.payload;
        const updatedBoards = state.boards.map((board) => {
          if (board.id === boardId) {
            return {
              ...board,
              comment: [...board.comment, comment],
            };
          }
          return board;
        });

        state.boards = updatedBoards;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { boardId, commentId, content } = action.payload;
        const updatedBoards = state.boards.map((board) => {
          if (board.id === boardId) {
            const updatedComments = board.comment.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  content,
                };
              }
              return comment;
            });

            return {
              ...board,
              comment: updatedComments,
            };
          }
          return board;
        });

        state.boards = updatedBoards;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { boardId, commentId } = action.payload;
        const updatedBoards = state.boards.map((board) => {
          if (board.id === boardId) {
            const updatedComments = board.comment.filter(
              (comment) => comment.id !== commentId
            );

            return {
              ...board,
              comment: updatedComments,
            };
          }
          return board;
        });

        state.boards = updatedBoards;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const boardId = action.payload;
        state.boards = state.boards.filter((board) => board.id !== boardId);
      });
  },
});

export const { setSearchTerm } = boardSlice.actions;

export const selectFilteredBoards = createSelector(
  (state) => state.board.boards,
  (state) => state.board.searchTerm,
  (boards, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return boards.filter((board) => {
      const { food, content, who, tag, comment } = board;
      const comments = comment.map((c) => c.content.toLowerCase());
      return (
        food.toLowerCase().includes(lowerCaseSearchTerm) ||
        content.toLowerCase().includes(lowerCaseSearchTerm) ||
        who.toLowerCase().includes(lowerCaseSearchTerm) ||
        tag.toLowerCase().includes(lowerCaseSearchTerm) ||
        comments.some((c) => c.includes(lowerCaseSearchTerm))
      );
    });
  }
);

export default boardSlice.reducer;
