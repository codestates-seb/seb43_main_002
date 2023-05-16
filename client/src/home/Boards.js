import { BoardsWrap } from './HomeStyle';
import Board from './Board';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from '../store/boardSlice';

const Boards = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  // console.log(boards);

  return (
    <BoardsWrap>
      {boards.map((board, idx) => (
        <Board key={idx} board={board}></Board>
      ))}
    </BoardsWrap>
  );
};

export default Boards;
