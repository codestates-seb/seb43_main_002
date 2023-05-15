// Boards.js
import { BoardsWrap } from './HomeStyle';
import Board from './Board';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, selectFilteredBoards } from '../store/boardSlice';

const Boards = () => {
  const dispatch = useDispatch();
  const filteredBoards = useSelector(selectFilteredBoards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  return (
    <BoardsWrap>
      {filteredBoards.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </BoardsWrap>
  );
};

export default Boards;
