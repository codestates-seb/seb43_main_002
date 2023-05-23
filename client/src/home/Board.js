import { BoardWrap } from '../style/HomeStyle';
import { useState, useEffect } from 'react';
import { BiTimeFive, BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import Comment from './Comment';
import PropTypes from 'prop-types';
import EditModal from './EditModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoard } from '../store/boardSlice';
import { addComment, fetchComments } from '../store/commentSlice';
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
  UserImg,
  ButtonWrap,
  StateButton,
  CommentInputWrap,
  CommentInput,
  CommentButton,
  CommentOpenButton,
  CompleteButton,
} from '../style/BoardStyle';
import axiosInstance from '../axiosConfig';

const Board = ({ board }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [postComment, setPostComment] = useState({
    body: '',
  });
  const [isBoard, setIsBoard] = useState(null);

  const tags = board.tags;
  const now = new Date(board.mealTime);
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const amPm = hour >= 12 ? '오후' : '오전';
  const formattedDate = `${month}/${day}일 ${amPm} ${hour % 12}시`;
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);
  const userInfo = useSelector((state) => state.user.userInfo);
  // const profile = useSelector((state) => state.profile.profile);

  const navigate = useNavigate();
  const handleOpen = () => {
    setCommentOpen(!commentOpen);
  };

  const handlePlusClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (commentOpen === true) {
      dispatch(fetchComments(board.boardId)).then((res) =>
        setIsBoard(res.payload)
      );
    }
  }, [commentOpen, dispatch, board.boardId]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hanmdleComment = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPostComment({ ...postComment, body: value });
  };

  const handlePeople = (selectedComment) => {
    axiosInstance
      .patch(
        `/api/boards/${board.boardId}/comments/${selectedComment.commentId}/select`
      )
      .then((res) => res.data);
    navigate(0);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    dispatch(addComment({ boardId: board.boardId, comment: postComment }))
      .unwrap()
      .then(() => {
        console.log('댓글이 성공적으로 등록되었습니다.');
        alert(`식사매너 지켜주실 거죠??`);
        setIsBoard([...isBoard, postComment]);
        setPostComment({ body: '' });
        navigate(0);
      });
  };

  const handleDelete = () => {
    dispatch(deleteBoard(board.boardId))
      .then(() => {
        console.log('게시물이 성공적으로 삭제되었습니다.');
        navigate(0);
      })
      .catch((error) => {
        console.error('게시물 삭제 중 오류가 발생했습니다.', error);
      });
  };
  // console.log('comment', comments);

  const isAuthor = userInfo && board.memberId === userInfo.memberId;

  const genderMapping = {
    ANY: '누구나 참여가능',
    FEMALE: '여성만 참여가능',
    MALE: '남성만 참여가능',
  };
  // count 랑 total이랑 같으면 ?
  const isRecruitmentComplete = board.count === board.total;
  // post 로 리퀘스트헤더 토큰
  // board 비활성화
  // /api/boards/{:boardId}/complete
  const handleComplete = () => {
    const headers = sessionStorage.getItem('jwt');
    axiosInstance
      .post(`/api/boards/${board.boardId}/complete`, headers)
      .then(() => {
        navigate(0);
      });
  };

  // console.log('보드:', board.boardId);
  // console.log('boards', board.mealTime);
  // console.log('complete', isRecruitmentComplete);
  // console.log('profile:', profile);

  Board.propTypes = {
    board: PropTypes.array.isRequired,
  };
  return (
    <>
      <BoardWrap isRecruitmentComplete={isRecruitmentComplete}>
        <CommentOpenButton onClick={handleOpen}>+</CommentOpenButton>
        <CompleteButton
          isRecruitmentComplete={isRecruitmentComplete}
          onClick={handleComplete}
        >
          모집완료
        </CompleteButton>
        <SexInfomaitonWrap gender={board.passedGender}>
          {genderMapping[board.passedGender]}
        </SexInfomaitonWrap>
        <ContentWrap gender={board.passedGender} onClick={handleOpen}>
          <ContentHeader>{board.title}</ContentHeader>
          <BoardContentWrap>{board.body}</BoardContentWrap>
        </ContentWrap>
        <TagWrap>
          {tags.map((tag, index) => (
            <TagBlock key={index} tag={board.tag}>
              {tag}
            </TagBlock>
          ))}
        </TagWrap>
        <SubmitWrap>
          <IconWrap>
            <BiTimeFive />
            {formattedDate}
          </IconWrap>
          <IconWrap>
            <FiUsers />
            {board.count}/{board.total}
          </IconWrap>
          <UserWrap>{board.nickname}</UserWrap>
          <UserImg>{board.imagePath}</UserImg>
        </SubmitWrap>
        <ButtonWrap>
          {isAuthor && (
            <>
              <StateButton onClick={handlePlusClick}>
                <BiEdit></BiEdit>
              </StateButton>
              <StateButton onClick={handleDelete} isDelete={true}>
                <AiFillDelete></AiFillDelete>
              </StateButton>
            </>
          )}
        </ButtonWrap>
        {commentOpen && (
          <>
            {comments &&
              isBoard !== null &&
              isBoard.map((comment) => (
                <Comment
                  key={comment.commentId}
                  board={board}
                  comment={comment}
                  handlePeople={handlePeople}
                />
              ))}
            <CommentInputWrap>
              <CommentInput
                onBlur={hanmdleComment}
                placeholder="깨끗한 문화를 위해 노력해주세요."
              />
              <CommentButton onClick={handlePostComment}>답글</CommentButton>
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
