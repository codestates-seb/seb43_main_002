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
  width: 30px;
  height: 30px;
  margin-left: 15px;
  border: 1px solid black;
  border-radius: 50%;
`;

export const ButtonWrap = styled.span`
  padding: 5px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: end;
`;

export const StateButton = styled.div`
  padding: 5px;
  width: 40px;
  height: 10px;
  font-size: 10px;
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  svg {
    color: #ffddac;
  }
  &:hover {
    svg {
      color: #ffb44a;
    }
  }
`;

export const CommentInputWrap = styled.div`
  margin-top: 20px;
  display: flex;
`;

export const CommentInput = styled.input`
  padding: 10px;
  height: 30px;
  border-radius: 20px 0 0 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 12px;
`;

export const CommentButton = styled.button`
  border-radius: 0 20px 20px 0;
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

export const CommentOpenButton = styled.button`
  width: 20px;
  height: 20px;
  /* padding: 5px; */
  margin-left: 320px;
  border-radius: 50%;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffddac;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffac36;
  }
  position: absolute;
  cursor: pointer;
`;
