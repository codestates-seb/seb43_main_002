import styled from 'styled-components';
import { BoardWrap } from './HomeStyle';
// import { useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import Comment from './Comment';
import PropTypes from 'prop-types';

const SexInfomaitonWrap = styled.div`
  padding: 10px;
  border-bottom: 1px solid #000000;
  font-size: 12px;
`;

const ContentWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  border-left: 3px solid #ffddac;
`;

const ContentHeader = styled.h2`
  padding: 0px 0px 0px 10px;
  font-size: 16px;
`;

const BoardContentWrap = styled.div`
  padding: 10px;
  font-size: 12px;
`;

const TagWrap = styled.div`
  padding: 0px;
  font-size: 12px;
  display: flex;
`;

const TagBlock = styled.div`
  margin-left: 10px;
  padding: 5px;
  font-size: 10px;
  background-color: #ffddac;
  border-radius: 10px;
`;

const SubmitWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  display: flex;
`;

const TimeWrap = styled.div`
  margin-left: 10px;
  padding: 0px;
  font-size: 10px;
  display: flex;
  color: #3e3c3a;
  svg {
    margin-right: 10px;
    padding: 0px;
    font-size: 15px;
  }
`;

const PeopleWrap = styled.div`
  margin-left: 30px;
  padding: 0px;
  font-size: 10px;
  display: flex;
  color: #3e3c3a;
  svg {
    margin-right: 10px;
    padding: 0px;
    font-size: 15px;
  }
`;

const UserWrap = styled.span`
  padding: 0px;
  margin-left: auto;
  border: 1px solid black;
  border-radius: 50%;
`;

const Board = ({ board }) => {
  Board.propTypes = {
    board: PropTypes.object.isRequired,
  };
  const tags = board.tag.split(',');
  console.log(board);

  return (
    <BoardWrap>
      <SexInfomaitonWrap>{board.who}</SexInfomaitonWrap>
      <ContentWrap>
        <ContentHeader>{board.food}</ContentHeader>
        <BoardContentWrap>{board.content}</BoardContentWrap>
      </ContentWrap>
      <TagWrap>
        {tags.map((tag, index) => (
          <TagBlock key={index}>{tag}</TagBlock>
        ))}
      </TagWrap>
      <SubmitWrap>
        <TimeWrap>
          <BiTimeFive />
          {board.when}
        </TimeWrap>
        <PeopleWrap>
          <FiUsers />
          3/6명
        </PeopleWrap>
        <UserWrap>{board.member}</UserWrap>
      </SubmitWrap>
      <Comment></Comment>
    </BoardWrap>
  );
};

export default Board;
