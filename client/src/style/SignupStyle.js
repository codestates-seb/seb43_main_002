import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as BackLogo } from '../svg/main-logo.svg';

const BackGround = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const BackYellow = styled.div`
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  height: 25%;
  border-radius: 0 0 50% 50%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  height: 75%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;
const Mobile = styled.div`
  position: relative;
  z-index: -1;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  height: 100%;
  padding: 0px;
  box-sizing: border-box;
  .active {
    background-image: linear-gradient(135deg, #ffd571, #ffac36) !important;
  }
`;

const SignupForm = styled.form`
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;

    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const SignupTitle = styled.h1`
  font-size: 35px;
  color: orange;
  text-align: center;
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
  margin: 15px 0;
  padding: 10px;
  height: 45px;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);

  border-radius: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 12pt;

  cursor: pointer;

  &:hover {
    background-color: #f5b94a;
  }
`;

const SignupButton = styled(Button)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12pt;
  border-radius: 20px;
  background-image: linear-gradient(135deg, #ffd571, #ffac36);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f5b94a;
    box-shadow: 0px 10 px 20px rgba(255, 180, 74, 0.4);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const CheckDuplicateButton = styled(Button)`
  border: none;
  width: 100%;
  padding: 10px;
  height: 40px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  background-image: linear-gradient(
    135deg,
    rgb(217, 217, 217),
    rgb(201, 201, 201)
  );
`;

const CheckPasswordButton = styled(Button)`
  border: none;
  width: 100%;
  padding: 10px;
  height: 40px;
  background-image: linear-gradient(
    135deg,
    rgb(217, 217, 217),
    rgb(201, 201, 201)
  );
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
`;

const Error = styled.p`
  color: red;
  font-size: 11pt;
  margin-top: 3px;
  padding: 10px;
`;

const GenderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const GenderButton = styled.button`
  margin: 10px 0;
  border: none;
  width: 100%;
  height: 40px;
  border-radius: 50px;
  background-color: #d4d4d4;
  color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-left: 20px;
  }

  ${(props) =>
    props.active &&
    css`
      background-image: linear-gradient(135deg, #ffd571, #ffac36);
    `}
`;

const Text = styled.p`
  display: flex;
  margin-top: 5px;
  align-items: center;

  label {
    font-size: 13pt !important;
    font-weight: 500;
    color: rgb(57, 57, 57);
  }
`;

const FooterText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #979797;
  padding: 7px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffc257;
`;
const StyledLogo = styled(BackLogo)`
  width: 20%;
  height: auto;
  cursor: pointer;
`;
const LogoContainer = styled.div`
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  width: 100%;
  height: 77%;
`;

export {
  SignupContainer,
  BackGround,
  BackYellow,
  SignupForm,
  Input,
  SignupTitle,
  SignupButton,
  CheckboxContainer,
  CheckDuplicateButton,
  CheckPasswordButton,
  GenderButton,
  Error,
  Text,
  FooterText,
  StyledLink,
  // CheckboxLabel,
  GenderBox,
  StyledLogo,
  LogoContainer,
  Mobile,
};
