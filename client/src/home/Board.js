import { BoardWrap } from './HomeStyle';
import { useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import Comment from './Comment';
import PropTypes from 'prop-types';
import EditModal from './EditModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBoard } from '../store/boardSlice';
import {
  SexInfomaitonWrap,
  ContentWrap,
  ContentHeader,
  BoardContentWrap,
  TagWrap,
  TagBlock,
  SubmitWrap,
  IconWrap,
  UserWrap,
  ButtonWrap,
  StateButton,
  CommentInputWrap,
  CommentInput,
  CommentButton,
  CommentOpenButton,
} from './BoardStyle';

const Board = ({ board }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [people, setPeople] = useState(1);

  const tags = board.tag.split(',');
  const now = new Date(board.when);
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const amPm = hour >= 12 ? '오후' : '오전';
  const formattedDate = `${month}/${day}일 ${amPm} ${hour % 12}시`;
  const dispatch = useDispatch();

  const handlePeople = () => {
    setPeople(people + 1);
  };

  const navigate = useNavigate();
  const handleOpen = () => {
    setCommentOpen(!commentOpen);
  };
  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteBoard(board.id))
      .unwrap()
      .then(() => {
        console.log('게시물이 성공적으로 삭제되었습니다.');
        navigate(0);
      })
      .catch((error) => {
        console.error('게시물 삭제 중 오류가 발생했습니다.', error);
      });
  };

  Board.propTypes = {
    board: PropTypes.object.isRequired,
  };
  return (
    <>
      <BoardWrap>
        <CommentOpenButton onClick={handleOpen}>+</CommentOpenButton>
        <SexInfomaitonWrap gender={board.who}>{board.who}</SexInfomaitonWrap>
        <ContentWrap gender={board.who} onClick={handleOpen}>
          <ContentHeader>{board.food}</ContentHeader>
          <BoardContentWrap>{board.content}</BoardContentWrap>
        </ContentWrap>
        <TagWrap>
          {tags.map((tag, index) => (
            <TagBlock key={index}>{tag}</TagBlock>
          ))}
        </TagWrap>
        <SubmitWrap>
          <IconWrap>
            <BiTimeFive />
            {formattedDate}
          </IconWrap>
          <IconWrap>
            <FiUsers />
            {people}/{board.people}
          </IconWrap>
          <UserWrap>{board.member}</UserWrap>
          <ButtonWrap>
            <StateButton onClick={handlePlusClick}>수정</StateButton>
            <StateButton onClick={handleDelete}>삭제</StateButton>
          </ButtonWrap>
        </SubmitWrap>
        {commentOpen && (
          <>
            {board.comment &&
              board.comment.map((comment) => (
                <Comment
                  key={comment.id}
                  board={board}
                  comment={comment}
                  setPeople={setPeople}
                  handlePeople={handlePeople}
                />
              ))}
            <CommentInputWrap>
              <CommentInput placeholder="댓글 입력" />
              <CommentButton>작성</CommentButton>
            </CommentInputWrap>
          </>
        )}
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
