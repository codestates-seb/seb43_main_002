import styled from 'styled-components';

export const SexInfomaitonWrap = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 12px;
  color: ${({ gender }) => {
    switch (gender) {
      case '누구나 참여가능':
        return '#FFB44A';
      case '여성만 참여가능':
        return '#FF5934';
      case '남성만 참여가능':
        return '#6495ED';
      default:
        return 'black';
    }
  }};
`;

export const ContentWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  border-left: 3px solid
    ${({ gender }) => {
      switch (gender) {
        case '누구나 참여가능':
          return '#FFB44A';
        case '여성만 참여가능':
          return '#FF5934';
        case '남성만 참여가능':
          return '#6495ED';
        default:
          return 'black';
      }
    }};
  cursor: pointer;
`;

export const ContentHeader = styled.h2`
  padding: 0px 0px 0px 10px;
  font-size: 16px;
`;

export const BoardContentWrap = styled.div`
  padding: 10px;
  font-size: 12px;
`;

export const TagWrap = styled.div`
  padding: 0px;
  font-size: 12px;
  display: flex;
`;

export const TagBlock = styled.div`
  margin-left: 10px;
  padding: 5px;
  font-size: 10px;
  background-color: #ffddac;
  border-radius: 10px;
`;

export const SubmitWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  display: flex;
`;

export const IconWrap = styled.div`
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

export const UserWrap = styled.div`
  padding: 0px;
  width: 40px;
  margin-left: auto;
  border: 1px solid black;
  border-radius: 50%;
`;

export const ButtonWrap = styled.span`
  padding: 5px;
  display: flex;
  justify-content: end;
`;
export const StateButton = styled.button`
  padding: 5px;
  font-size: 10px;
`;

export const CommentInputWrap = styled.div`
  display: flex;
`;

export const CommentInput = styled.input`
  padding: 10px;
  flex: 1;
`;

export const CommentButton = styled.button`
  background-color: #ffb44a;
  padding: 10px;
`;

export const CommentOpenButton = styled.button`
  width: 20px;
  height: 20px;
  /* padding: 5px; */
  margin-left: 320px;
  border-radius: 50%;
  color: #ffddac;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffddac;
  }
  position: absolute;
`;
