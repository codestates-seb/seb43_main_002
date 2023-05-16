import styled from 'styled-components';

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
const CommentWrap = styled.div`
  padding: 0px;
`;
const CommentNameWrap = styled.h2`
  padding: 0px;
`;
const CommentContentWrap = styled.div`
  padding: 0px;
`;

const Comment = () => {
  return (
    <CommentsWrap>
      <CommentProfileWrap>사진</CommentProfileWrap>
      <CommentWrap>
        <CommentNameWrap>닉네임</CommentNameWrap>
        <CommentContentWrap>내용</CommentContentWrap>
      </CommentWrap>
    </CommentsWrap>
  );
};

export default Comment;
