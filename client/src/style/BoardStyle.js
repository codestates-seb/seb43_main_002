import styled, { css } from 'styled-components';

const SexInfomaitonWrap = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: 700;
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
  margin-top: 15px;
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
  font-size: 14pt;
`;

const BoardContentWrap = styled.div`
  padding: 10px;
  letter-spacing: -0.02em;
  font-size: 10pt;
`;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagBlock = styled.div`
  margin-left: 10px;
  padding: 5px 10px;
  margin: 5px 10px 5px 0;
  font-size: 12px;
  background-color: #ffddac;
  border-radius: 50px;
`;

const SubmitWrap = styled.div`
  margin-top: 10px;
  border-bottom: ${(props) =>
    props.commentOpen ? '1px solid #cdcdcd;' : 'none'};
  padding-bottom: ${(props) => (props.commentOpen ? '15px' : '0')};
  display: flex;
`;

const IconWrap = styled.div`
  margin-left: 10px;
  padding: 0px;
  font-size: 9pt;
  display: flex;
  color: #3e3c3a;
  svg {
    margin-right: 5px;
    padding: 0px;
    opacity: 0.6;
    /* fill: #a9a9a9; */
    font-size: 18px;
  }

  div:nth-child(3) {
    margin-left: 10px;
    background-color: red;
  }
`;

const UserWrap = styled.div`
  padding: 0px;
  height: 40px;
  font-size: 12px;
  font-weight: 700;
  font-weight: bold;
  margin-left: auto;
  border-radius: 50%;
  display: flex;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;

const UserImg = styled.img`
  padding: 0px;
  width: 40px;
  margin-left: 5px;
  background-color: #cdeeff;
  border-radius: 50%;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  position: relative;
  > div {
    position: absolute;
    padding: 0;
    bottom: ${(props) => (props.commentOpen ? '15.5px' : '0')};
    display: flex;
    align-items: end;
    margin-left: 7px;

    :last-child {
      left: 25px;
    }
  }
`;
const StateButton = styled.div`
  padding: 5px;
  /* width: 40px; */
  height: 10px;
  font-size: 10px;
  /* margin-left: 10px; */
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
  border: none;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 12px;
`;

const CommentButton = styled.button`
  border-radius: 0 20px 20px 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
  height: 30px;
  font-size: 12px;
  font-weight: 700;
  padding: 10px;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  border: none;
  &:hover {
    background-color: #ff9933;
    color: white;
  }
`;

const CommentOpenButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  right: 15px;
  position: relative;
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

  ::before {
    content: '${(props) => (props.commentOpen ? '-' : '+')}';
    display: inline-block;
    width: 20px;
    text-align: center;
    position: absolute;
    top: ${(props) => (props.commentOpen ? '-5px' : '-3px')};
    font-weight: 700;
    font-size: 16px;
  }
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
