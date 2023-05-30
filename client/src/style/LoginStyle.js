import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
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

  /* @media (max-height: 740px) {
    height: 20%;
  } */
`;

const LoginContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.p`
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px, 20px;
  padding: 20px;
`;

const LoginTitle = styled.h1`
  padding-bottom: 10px;
  margin-top: 30px;
  font-size: 30pt;
  color: orange;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  background-color: #f5f6f7;
  margin: 10px 0;
  padding: 12px;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 50px;
  background-color: #ffc257;
  color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(135deg, #ffd571, #ffac36);
    box-shadow: 0px 7px 20px rgba(255, 180, 74, 0.4);
  }
`;

const LoginButton = styled(Button)`
  text-decoration: none;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    text-decoration: #ffc250;
  }
`;

const ForgotPasswordButton = styled(Button)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: white;
    text-decoration: #ffc250;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 11pt;
  margin-top: 3px;
`;

const Message = styled.p`
  color: blue;
  font-size: 11pt;
  margin-top: 3px;
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

const GoogleLoginButton = styled(Button)`
  background-color: #4285f4;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #357ae8;
  }
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

const StyledLogo = styled(BackLogo)`
  width: 20%;
  height: auto;
`;

const GoogleLogo = styled(FaGoogle)`
  margin-right: 8px;
  color: white;
`;

export {
  Main,
  LoginContainer,
  LoginForm,
  LoginTitle,
  Input,
  LoginButton,
  ForgotPasswordButton,
  Error,
  Message,
  FooterText,
  StyledLink,
  GoogleLoginButton,
  StyledLogo,
  GoogleLogo,
  BackGround,
  LogoContainer,
  BackYellow,
};
