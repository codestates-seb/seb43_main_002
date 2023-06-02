import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteComment,
  updateComment,
  fetchComments,
} from '../store/commentSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { StateButton, SubmitWrap } from '../style/BoardStyle';
import { useNavigate } from 'react-router-dom';

const CommentsWrap = styled.div`
  width: 100%;
  margin-top: 15px;
  padding-bottom: 15px;
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  overflow: hidden;
`;

const CommentProfileWrap = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #cdeeff;
  cursor: pointer;
`;

const ContentWrap = styled.div`
  padding-left: 10px;
  width: auto;
  white-space: pre-wrap;
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
  margin: 0;
  font-size: 10pt;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CommentContentWrap = styled.div`
  font-size: 12px;
  color: #505050;
  width: 270px;
  white-space: pre-wrap;
  word-break: break-all;
  height: auto;
`;

const CommentStateWrap = styled.div`
  padding: 0px;
  display: flex;
  width: 270px;
`;

const AcceptButton = styled.button`
  border-radius: 10px;
  font-size: 10px;
  margin-top: 5px;
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
  margin-top: 5px;
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

const EditComment = styled.input`
  padding: 10px;
  height: 30px;
  width: 250px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 13px;
`;

const EditButton = styled.button`
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  height: 30px;
  font-size: 12px;
  padding: 10px;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffb44a;
  border: none;
  &:hover {
    background-color: #ff9933;
    color: white;
  }
`;

const CancelButton = styled(EditButton)`
  background-color: lightgrey;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const Comment = ({ comment, handlePeople, board, setIsBoard }) => {
  Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    handlePeople: PropTypes.string.isRequired,
    board: PropTypes.object.isRequired,
    setIsBoard: PropTypes.func.isRequired,
  };
  const userInfo = useSelector((state) => state.user.userInfo);

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.body);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleSave = () => {
    if (content === '') {
      alert('댓글을 입력해주세요');
      return;
    }
    dispatch(
      updateComment({
        commentId: comment.commentId,
        content,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchComments(board.boardId)).then((res) =>
          setIsBoard(res.payload)
        );
      });
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(
      deleteComment({
        commentId: comment.commentId,
      })
    );
    dispatch(fetchComments(board.boardId)).then(() => {
      navigate(0);
    });
  };

  useEffect(() => {
    if (editing) {
      setContent(comment.body);
    }
  }, [editing, comment.body]);

  const isAuthor = userInfo && comment.memberId === userInfo.memberId;

  const Boarduser = userInfo && board.memberId === userInfo.memberId;
  const imageUrl = `https://api.sik-gu.com/api/mypages/${comment.memberId}/image`;
  const handleUser = () => {
    navigate(`/userpage/${comment.memberId}`);
  };

  // console.log(comment);

  return (
    <>
      {!!comment.body && (
        <CommentsWrap>
          <ProfiletWrap>
            <CommentProfileWrap
              onClick={handleUser}
              src={imageUrl}
            ></CommentProfileWrap>
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
                <EditComment
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyPress}
                ></EditComment>
                <SubmitWrap>
                  <EditButton onClick={handleSave}>저장</EditButton>
                  <CancelButton onClick={handleCancelEdit}>취소</CancelButton>
                </SubmitWrap>
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
