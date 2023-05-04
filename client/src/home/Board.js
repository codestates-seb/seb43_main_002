import styled from 'styled-components';

const BoardWrap = styled.article`
  margin-top: 30px;
  width: 100%;
  height: 30%;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  z-index: 0;
  position: relative;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
`;

const Board = () => {
  return <BoardWrap>사람구함</BoardWrap>;
};

export default Board;
