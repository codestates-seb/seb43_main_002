import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosInstance from '../axiosConfig';

// 게시물 목록 가져오기
export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axiosInstance.get(`/api/boards`);
  return response.data;
});

// 게시물 추가
export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (postBoard) => {
    const response = await axiosInstance.post(`/api/boards`, postBoard);
    return response.data;
  }
);

// 게시물 수정
export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, board }) => {
    const response = await axiosInstance.patch(`/api/boards/${boardId}`, board);
    return response.data;
  }
);

// 게시물 삭제
export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId) => {
    await axiosInstance.delete(`/api/boards/${boardId}`);
    return boardId;
  }
);

// 댓글 목록 가져오기
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

// // 댓글 추가
// export const addComment = createAsyncThunk(
//   'boards/addComment',
//   async ({ boardId, comment }) => {
//     const response = await axiosInstance.post(
//       `/api/boards/${boardId}/comments`,
//       comment
//     );
//     return { boardId, comment: response.data };
//   }
// );

// // 댓글 수정
// export const updateComment = createAsyncThunk(
//   'boards/updateComment',
//   async ({ boardId, commentId, content }) => {
//     const response = await axiosInstance.put(
//       `${BASE_URL}/${boardId}/comments/${commentId}`,
//       { content }
//     );
//     return response.data;
//   }
// );

// // 댓글 삭제
// export const deleteComment = createAsyncThunk(
//   'boards/deleteComment',
//   async ({ boardId, commentId }) => {
//     await axiosInstance.delete(`${BASE_URL}/${boardId}/comments/${commentId}`);
//     return { boardId, commentId };
//   }
// );

// 게시물 필터링 기능
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
    }, //  state의 검색어 상태 변화 = action값;
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      }) // 로딩중이면 로딩값은 true, error는 false
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.boards = action.payload;
      }) // 로딩이 완료되면 loading은 false, error는 false, boards의 상태는 action 값이다.
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }); // 연결에 실패하면 loading은 false가 되고 error를 발생시킨다.
  },
});

export const { setSearchTerm } = boardSlice.actions;

export const selectFilteredBoards = createSelector(
  (state) => state.board.boards,
  (state) => state.board.searchTerm,
  (boards, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return boards.filter((board) => {
      const { title, body, total, tag } = board;
      return (
        title.toLowerCase().includes(lowerCaseSearchTerm) ||
        body.toLowerCase().includes(lowerCaseSearchTerm) ||
        total.toLowerCase().includes(lowerCaseSearchTerm) ||
        tag.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }
);

export default boardSlice.reducer;
