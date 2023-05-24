import styled, { css } from 'styled-components';
const SexInfomaitonWrap = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 12px;
  color: ${({ gender }) => {
    switch (gender) {
      case 'ANY':
        return '#FFB44A';
      case 'FEMALE':
        return '#FF5934';
      case 'MALE':
        return '#6495ED';
      default:
        return 'black';
    }
  }};
`;

const ContentWrap = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  border-left: 3px solid
    ${({ gender }) => {
      switch (gender) {
        case 'ANY':
          return '#FFB44A';
        case 'FEMALE':
          return '#FF5934';
        case 'MALE':
          return '#6495ED';
        default:
          return 'black';
      }
    }};
  cursor: pointer;
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
  padding: 10px;
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
  height: 40px;
  font-size: 12px;
  font-weight: bold;
  margin-left: auto;
  border-radius: 50%;
  display: flex;
  text-align: center;
  align-items: center;
`;

const UserImg = styled.img`
  padding: 0px;
  width: 40px;
  margin-left: 20px;
  border-radius: 50%;
`;

const ButtonWrap = styled.span`
  padding: 5px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: end;
`;
const StateButton = styled.div`
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
    ${(props) =>
      props.isDelete &&
      css`
        color: rgba(0, 0, 0, 0.15);
      `}
  }
  &:hover {
    svg {
      color: #ffb44a;
      ${(props) =>
        props.isDelete &&
        css`
          color: #cc3333;
        `}
    }
  }
`;

const CommentInputWrap = styled.div`
  margin-top: 20px;
  display: flex;
`;

const CommentInput = styled.input`
  padding: 10px;
  height: 30px;
  border-radius: 20px 0 0 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 12px;
`;

const CommentButton = styled.button`
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

const CommentOpenButton = styled.button`
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

const CompleteButton = styled.button`
  padding: 10px;
  width: 200px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: ${({ isRecruitmentComplete }) =>
    isRecruitmentComplete ? 'block' : 'none'};
  ${(isRecruitmentComplete) =>
    isRecruitmentComplete &&
    css`
      padding: 1.3em 3em;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      font-weight: 500;
      color: #000;
      background-color: #fff;
      border: none;
      border-radius: 45px;
      box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease 0s;
      cursor: pointer;
      outline: none;
      :hover {
        background-color: #ffb44a;
        box-shadow: 0px 15px 20px rgba(255, 180, 74, 0.4);
        color: #fff;
        transform: translate(-50%, -53%) translateY(-7px);
      }
      :active {
        transform: translate(-50%, -53%) translateY(-1px);
      }
    `}
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
  UserImg,
  ButtonWrap,
  StateButton,
  CommentInputWrap,
  CommentInput,
  CommentButton,
  CommentOpenButton,
  CompleteButton,
};
