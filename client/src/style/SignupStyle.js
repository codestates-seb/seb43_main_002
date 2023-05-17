import styled from 'styled-components';
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
  height: 220px;
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
  height: 630px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;
const Mobile = styled.div`
  position: relative;
  z-index: -1;
  font-family: 'Noto Sans KR', sans-serif;
  width: 400px;
  height: 850px;
  padding: 0px;
  box-sizing: border-box;
`;

const SignupForm = styled.form`
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
`;

const SignupTitle = styled.h1`
  font-size: 35px;
  color: orange;
  text-align: center;
  padding: 10px;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffc257;
  margin-bottom: 10px;
  color: white;
  border: none;
  border-radius: 20px;
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
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const GenderCheckbox = styled.input`
  margin: 10px 0;
`;

const CheckDuplicateButton = styled(Button)`
  width: auto;
  margin-left: 10px;
`;

const CheckPasswordButton = styled(Button)`
  width: auto;
  margin-left: 10px;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 3px;
`;
const CheckboxLabel = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin: 10px;
  cursor: pointer;
  font-size: 15px;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #ccc;
    border-radius: 50%;
  }

  &:hover input ~ span {
    background-color: #9c9c9c;
  }

  input:checked ~ span {
    background-color: #ffc257;
  }

  span:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }
`;
const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
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
  GenderCheckbox,
  CheckDuplicateButton,
  CheckPasswordButton,
  Error,
  Text,
  FooterText,
  StyledLink,
  CheckboxLabel,
  StyledLogo,
  LogoContainer,
  Mobile,
};
