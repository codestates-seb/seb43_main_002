import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../store/boardSlice';

const CommentsWrap = styled.div`
  margin-top: 10px;
  padding: 10px 0px 0px 10px;
  border-top: 1px solid black;
  display: flex;
`;

const CommentProfileWrap = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 50%;
`;

const CommentNameWrap = styled.h2`
  padding: 0px;
`;

const CommentContentWrap = styled.div`
  padding: 0px;
`;

const CommentStateWrap = styled.div`
  padding: 0px;
`;

const CommentButton = styled.button`
  background-color: pink;
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
          <div>
            <CommentProfileWrap>
              {comment.member?.avatarLink}
            </CommentProfileWrap>
            <CommentButton>수락</CommentButton>
            <CommentButton>거절</CommentButton>
          </div>
          <div>
            <CommentNameWrap>{comment.member?.displayName}</CommentNameWrap>
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
                <CommentStateWrap>
                  <CommentButton onClick={handleEdit}>수정</CommentButton>
                  <CommentButton onClick={handleDelete}>삭제</CommentButton>
                </CommentStateWrap>
              </>
            )}
          </div>
        </CommentsWrap>
      )}
    </>
  );
};

export default Comment;
