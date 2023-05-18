import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../store/boardSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { StateButton } from './BoardStyle';

const CommentsWrap = styled.div`
  margin-top: 10px;
  padding: 10px 0px 0px 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
`;

const CommentProfileWrap = styled.div`
  padding: 10px;
  height: 40px;
  width: 40px;
  border: 1px solid black;
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
  padding: 0px;
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

const Comment = ({ board, comment, handlePeople }) => {
  Comment.propTypes = {
    board: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    handlePeople: PropTypes.string.isRequired,
  };

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setContent(comment.content);
  };

  const handleSave = () => {
    dispatch(
      updateComment({ boardId: board.id, commentId: comment.id, content })
    );
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment({ boardId: board.id, commentId: comment.id }));
  };

  return (
    <>
      {!!comment.content && (
        <CommentsWrap>
          <ProfiletWrap>
            <CommentProfileWrap>
              {comment.member?.avatarLink}
            </CommentProfileWrap>
            <AcceptButton onClick={handlePeople}>수락</AcceptButton>
            <RefuseButton>거절</RefuseButton>
          </ProfiletWrap>
          <ContentWrap>
            <CommentStateWrap>
              <CommentNameWrap>{comment.member?.displayName}</CommentNameWrap>
              <StateButton onClick={handleEdit}>
                <BiEdit />
              </StateButton>
              <StateButton onClick={handleDelete}>
                <AiFillDelete />
              </StateButton>
            </CommentStateWrap>
            {editing ? (
              <>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div>
                  <button onClick={handleSave}>저장</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              </>
            ) : (
              <>
                <CommentContentWrap>{comment.content}</CommentContentWrap>
              </>
            )}
          </ContentWrap>
        </CommentsWrap>
      )}
    </>
  );
};

export default Comment;
