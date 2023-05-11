import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from '../store/boardSlice';

const CommentsWrap = styled.div`
  margin-top: 10px;
  padding: 10px 0px 0px 10px;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const CommentProfileWrap = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 50%;
`;
const CommentWrap = styled.div`
  padding: 0px;
  display: flex;
`;
const CommentNameWrap = styled.h2`
  padding: 0px;
`;
const CommentContentWrap = styled.div`
  padding: 0px;
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

const Comment = () => {
  const date = new Date();
  const [addComment, setAddcomment] = useState('');
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCommentChange = (e) => {
    setAddcomment(e.target.value);
  };
  const handleComment = (e) => {
    e.preventDefault();
    const newCommnent = {
      memeber: {
        displyName: 'zeeeeee',
        avatarLing: '아직미완',
      },
      content: addComment,
      updateDate: date,
    };
    axios
      .post('http://localhost:8080/boards', newCommnent)
      .then((res) => {
        console.log('Comment Success');
        setAddcomment([...addComment, res.data]);
        // navigate(0);
      })
      .catch((error) => {
        console.error('Comment Error', error);
      });
  };
  // const commentExample = boards.comment;

  console.log(boards);

  return (
    <CommentsWrap>
      <CommentWrap>
        <CommentProfileWrap></CommentProfileWrap>
        <div>
          <CommentNameWrap>닉네임</CommentNameWrap>
          <CommentContentWrap>내용</CommentContentWrap>
        </div>
      </CommentWrap>
      <CommentInputWrap>
        <CommentInput onChange={handleCommentChange} placeholder="댓글 입력" />
        <CommentButton onClick={handleComment}>작성</CommentButton>
      </CommentInputWrap>
    </CommentsWrap>
  );
};

export default Comment;
