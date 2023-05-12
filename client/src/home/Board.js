import styled from 'styled-components';
import { BoardWrap } from './HomeStyle';
import { useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import Comment from './Comment';
import PropTypes from 'prop-types';
import EditModal from './EditModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const UserWrap = styled.div`
  padding: 0px;
  width: 40px;
  margin-left: auto;
  border: 1px solid black;
  border-radius: 50%;
`;

const ButtonWrap = styled.span`
  padding: 5px;
  display: flex;
  justify-content: end;
`;
const StateButton = styled.button`
  padding: 5px;
  font-size: 10px;
`;

const CommentInputWrap = styled.div`
  display: flex;
`;

const CommentInput = styled.input`
  padding: 10px;
  flex: 1;
`;

const CommentButton = styled.button`
  background-color: #ffb44a;
  padding: 10px;
`;

const Board = ({ board }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  Board.propTypes = {
    board: PropTypes.object.isRequired,
  };
  const tags = board.tag.split(',');
  const now = new Date(board.when);
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const amPm = hour >= 12 ? '오후' : '오전';
  const formattedDate = `${month}/${day}일 ${amPm} ${hour % 12}시`;
  const date = new Date();
  const [addComment, setAddcomment] = useState('');
  const handleCommentChange = (e) => {
    setAddcomment(e.target.value);
  };
  console.log(board);
  const handleComment = (e) => {
    e.preventDefault();
    const newComment = {
      member: {
        displayName: 'zeeeeee',
        avatarLink: '아직미완',
      },
      content: addComment,
      updateDate: date.toISOString(),
      id: board.comment.length + 1,
    };
    const updatedBoard = {
      comment: [...board.comment, newComment],
    };
    axios
      .post(`http://localhost:8080/boards/${board.id}/comment`, updatedBoard)
      .then((res) => {
        console.log('Comment Success');
        setAddcomment('');
      })

      .catch((error) => {
        console.error('Comment Error', error);
      });
    console.log(updatedBoard);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/boards/${board.id}`)
      .then(() => {
        console.log('게시물이 성공적으로 삭제되었습니다.');
        navigate(0);
      })
      .catch((error) => {
        console.error('게시물 삭제 중 오류가 발생했습니다.', error);
      });
  };
  return (
    <>
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
            {formattedDate}
          </TimeWrap>
          <PeopleWrap>
            <FiUsers />
            {board.people}
          </PeopleWrap>
          <UserWrap>{board.member}</UserWrap>
          <ButtonWrap>
            <StateButton onClick={handlePlusClick}>수정</StateButton>
            <StateButton onClick={handleDelete}>삭제</StateButton>
          </ButtonWrap>
        </SubmitWrap>
        {!!board.comment &&
          board.comment.map((comment) => (
            <Comment key={comment.id} board={board} comment={comment} />
          ))}
        <CommentInputWrap>
          <CommentInput
            onChange={handleCommentChange}
            placeholder="댓글 입력"
          />
          <CommentButton onClick={handleComment}>작성</CommentButton>
        </CommentInputWrap>
      </BoardWrap>
      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        board={board}
      ></EditModal>
    </>
  );
};

export default Board;
