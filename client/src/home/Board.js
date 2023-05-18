import { BoardWrap } from './HomeStyle';
import { useState } from 'react';
import { BiTimeFive, BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
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
  // TagWrap,
  // TagBlock,
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

  // const tags = board.tag.split(',');
  const now = new Date(board.mealTime);
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

  console.log('boards', board.mealTime);

  Board.propTypes = {
    board: PropTypes.array.isRequired,
  };
  return (
    <>
      <BoardWrap>
        <CommentOpenButton onClick={handleOpen}>+</CommentOpenButton>
        <SexInfomaitonWrap gender={board.passedGender}>
          {board.passedGender}
        </SexInfomaitonWrap>
        <ContentWrap gender={board.passedGender} onClick={handleOpen}>
          <ContentHeader>{board.title}</ContentHeader>
          <BoardContentWrap>{board.body}</BoardContentWrap>
        </ContentWrap>
        {/* <TagWrap>
          {tags.map((tag, index) => (
            <TagBlock key={index} tag={board.tag}>
              {tag}
            </TagBlock>
          ))}
        </TagWrap> */}
        <SubmitWrap>
          <IconWrap>
            <BiTimeFive />
            {formattedDate}
          </IconWrap>
          <IconWrap>
            <FiUsers />
            {people}/{board.total}
          </IconWrap>
          <ButtonWrap>
            <StateButton onClick={handlePlusClick}>
              <BiEdit></BiEdit>
            </StateButton>
            <StateButton onClick={handleDelete}>
              <AiFillDelete></AiFillDelete>
            </StateButton>
            <UserWrap>{board.nickname}</UserWrap>
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
              <CommentInput placeholder="깨끗한 문화를 위해 노력해주세요." />
              <CommentButton>답글</CommentButton>
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
