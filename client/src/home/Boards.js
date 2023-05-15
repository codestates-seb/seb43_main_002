// Boards.js
// import { BoardsWrap } from './HomeStyle';
import Board from './Board';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards, selectFilteredBoards } from '../store/boardSlice';

const Boards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const filteredBoards = useSelector(selectFilteredBoards);

  return (
    <div>
      {filteredBoards.map((board) => (
        <Board key={board.id} board={board} />
      ))}
    </div>
  );
};

export default Boards;
