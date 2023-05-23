import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updateComment } from '../store/commentSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { StateButton } from '../style/BoardStyle';
import { useNavigate } from 'react-router-dom';

const CommentsWrap = styled.div`
  margin-top: 10px;
  padding: 10px 0px 0px 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
`;

const CommentProfileWrap = styled.img`
  padding: 10px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const ContentWrap = styled.div`
  padding-left: 20px;
`;

const ProfiletWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CommentNameWrap = styled.h2`
  width: auto;
  height: 30px;
  padding: 0px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CommentContentWrap = styled.div`
  margin-top: 10px;
  padding: 10px;
  font-size: 12px;
`;

const CommentStateWrap = styled.div`
  padding: 0px;
  display: flex;
`;

const AcceptButton = styled.button`
  border-radius: 10px;
  font-size: 10px;
  margin-top: 10px;
  width: 40px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffddac;
  border: none;
  &:hover {
    background-color: #ffb44a;
    color: white;
  }
`;

const RefuseButton = styled.button`
  border-radius: 10px;
  margin-top: 10px;
  font-size: 10px;
  width: 40px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffbebe;
  border: none;
  &:hover {
    background-color: #ff8888;
    color: white;
  }
`;

const Comment = ({ comment, handlePeople, board }) => {
  Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    handlePeople: PropTypes.string.isRequired,
    board: PropTypes.object.isRequired,
  };
  const userInfo = useSelector((state) => state.user.userInfo);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.body);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(board);
  // console.log(comment);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSelect = () => {
    handlePeople(comment);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setContent(comment.body);
  };

  const handleSave = () => {
    dispatch(
      updateComment({
        commentId: comment.commentId,
        content,
      })
    );
    setEditing(false);
    navigate(0);
  };

  const handleDelete = () => {
    dispatch(
      deleteComment({
        commentId: comment.commentId,
      })
    );
    navigate(0);
  };

  const isAuthor = userInfo && comment.memberId === userInfo.memberId;

  const Boarduser = userInfo && board.memberId === userInfo.memberId;
  const imageUrl = `/api/mypages/${comment.memberId}/image`;
  console.log(comment.memberId);

  return (
    <>
      {!!comment.body && (
        <CommentsWrap>
          <ProfiletWrap>
            <CommentProfileWrap src={imageUrl}></CommentProfileWrap>
            {Boarduser && (
              <>
                <AcceptButton onClick={handleSelect}>수락</AcceptButton>
                <RefuseButton>거절</RefuseButton>
              </>
            )}
          </ProfiletWrap>
          <ContentWrap>
            <CommentStateWrap>
              <CommentNameWrap>{comment.nickName}</CommentNameWrap>
              {isAuthor && (
                <>
                  <StateButton onClick={handleEdit}>
                    <BiEdit />
                  </StateButton>
                  <StateButton isDelete={true} onClick={handleDelete}>
                    <AiFillDelete />
                  </StateButton>
                </>
              )}
            </CommentStateWrap>
            {editing ? (
              <>
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></input>
                <div>
                  <button onClick={handleSave}>저장</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              </>
            ) : (
              <>
                <CommentContentWrap>{comment.body}</CommentContentWrap>
              </>
            )}
          </ContentWrap>
        </CommentsWrap>
      )}
    </>
  );
};

export default Comment;
