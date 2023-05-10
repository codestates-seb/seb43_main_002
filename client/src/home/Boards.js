import { BoardsWrap } from './HomeStyle';
import Board from './Board';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Boards = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/boards');
        setBoards(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBoards();
  }, []);

  console.log(boards);

  return (
    <BoardsWrap>
      <Board />
    </BoardsWrap>
  );
};

export default Boards;
