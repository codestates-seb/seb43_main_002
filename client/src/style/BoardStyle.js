import styled from 'styled-components';
const SexInfomaitonWrap = styled.div`
  padding: 10px;
  border-bottom: 1px solid #000000;
  font-size: 12px;
`;

const ContentWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  border-left: 3px solid #ffddac;
`;

const ContentHeader = styled.h2`
  padding: 0px 0px 0px 10px;
  font-size: 16px;
`;

const BoardContentWrap = styled.div`
  padding: 10px;
  font-size: 12px;
`;

const TagWrap = styled.div`
  padding: 0px;
  font-size: 12px;
  display: flex;
`;

const TagBlock = styled.div`
  margin-left: 10px;
  padding: 5px;
  font-size: 10px;
  background-color: #ffddac;
  border-radius: 10px;
`;

const SubmitWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  display: flex;
`;

const IconWrap = styled.div`
  margin-left: 10px;
  padding: 0px;
  font-size: 10px;
  display: flex;
  color: #3e3c3a;
  svg {
    margin-right: 10px;
    padding: 0px;
    font-size: 15px;
  }
`;

const UserWrap = styled.div`
  padding: 0px;
  width: 40px;
  margin-left: auto;
  border: 1px solid black;
  border-radius: 50%;
`;

const ButtonWrap = styled.span`
  padding: 5px;
  display: flex;
  justify-content: end;
`;
const StateButton = styled.button`
  padding: 5px;
  font-size: 10px;
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

const CommentOpenButton = styled.button`
  padding: 5px;
  margin-left: auto;
`;

export {
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
};
