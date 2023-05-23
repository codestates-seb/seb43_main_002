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
      const { title, body, tag } = board;
      const validTag = tag ? tag : ''; // tag가 정의되지 않은 경우 빈 문자열로 설정
      return (
        title.toLowerCase().includes(lowerCaseSearchTerm) ||
        body.toLowerCase().includes(lowerCaseSearchTerm) ||
        validTag.toLowerCase().includes(lowerCaseSearchTerm) // 수정된 부분
      );
    });
  }
);

export default boardSlice.reducer;
