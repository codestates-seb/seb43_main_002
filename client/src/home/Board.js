import { BoardWrap, CompleteBoard, CompletedBack } from '../style/HomeStyle';
import { useState, useEffect } from 'react';
import { BiTimeFive, BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import Comment from './Comment';
import PropTypes from 'prop-types';
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

// eslint-disable-next-line react/prop-types
const Board = ({ board, setIsModalOpenNew, handlePopup }) => {
  Board.propTypes = {
    board: PropTypes.array.isRequired,
    setIsModalOpenNew: PropTypes.func.isRequired,
    handlePopup: PropTypes.func.isRequired,
  };
  const comments = useSelector((state) => state.comment.comments);
  const userInfo = useSelector((state) => state.user.userInfo);
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
  // const profile = useSelector((state) => state.profile.profile);

  const navigate = useNavigate();
  const handleOpen = () => {
    setCommentOpen(!commentOpen);
  };

  const handlePlusClick = () => {
    setIsModalOpenNew(true);
  };

  useEffect(() => {
    if (commentOpen === true) {
      dispatch(fetchComments(board.boardId)).then((res) =>
        setIsBoard(res.payload)
      );
    }
  }, [board.boardId, commentOpen, dispatch]);

  const handleComment = (e) => {
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
    if (e.key === 'Enter') {
      e.preventDefault();
      if (postComment.body === '') {
        alert('댓글을 입력해주세요');
        return;
      }
      dispatch(addComment({ boardId: board.boardId, comment: postComment }))
        .unwrap()
        .then(() => {
          alert(`식사매너 지켜주실 거죠??`);
          dispatch(fetchComments(board.boardId)).then((res) => {
            setIsBoard(res.payload);
          });
          setPostComment({ ...postComment, body: '' });
          // navigate(0);
        });
    }
  };

  const handleDelete = () => {
    dispatch(deleteBoard(board.boardId))
      .then(() => {
        navigate(0);
      })
      .catch((error) => {});
  };

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

  // console.log('value', postComment);
  // console.log('complete', isRecruitmentComplete);

  const imageUrl = `https://api.sik-gu.com/api/mypages/${board.memberId}/image`;

  const handleUser = () => {
    navigate(`/userpage/${board.memberId}`);
  };

  // console.log('profile:', board);

  return (
    <>
      <CompleteBoard isRecruitmentComplete={isRecruitmentComplete}>
        <CompletedBack
          isRecruitmentComplete={isRecruitmentComplete}
        ></CompletedBack>
        <CompleteButton
          isRecruitmentComplete={isRecruitmentComplete}
          onClick={handleComplete}
        >
          모집완료
        </CompleteButton>
        <BoardWrap>
          <CommentOpenButton onClick={handleOpen} commentOpen={commentOpen} />
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
          <SubmitWrap commentOpen={commentOpen}>
            <IconWrap>
              <BiTimeFive />
              {formattedDate}
            </IconWrap>
            <IconWrap>
              <FiUsers />
              {board.count}/{board.total} 명
            </IconWrap>
            <UserWrap onClick={handleUser}>{board.nickname}</UserWrap>
            <UserImg onClick={handleUser} src={imageUrl}></UserImg>
          </SubmitWrap>
          <ButtonWrap commentOpen={commentOpen}>
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
                    handlePopup={handlePopup}
                    comment={comment}
                    handlePeople={handlePeople}
                  />
                ))}
              <CommentInputWrap>
                <CommentInput
                  value={postComment.body}
                  onChange={handleComment}
                  onKeyDown={handlePostComment}
                  placeholder="깨끗한 문화를 위해 노력해주세요."
                />
                <CommentButton onClick={handlePostComment}>답글</CommentButton>
              </CommentInputWrap>
            </>
          )}
        </BoardWrap>
      </CompleteBoard>
    </>
  );
};

export default Board;
